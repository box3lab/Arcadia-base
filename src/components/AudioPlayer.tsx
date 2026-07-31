"use client";

import LoadingCube from "./LoadingCube";

import { useState, useRef, useEffect, useCallback } from "react";
import { BASE_URL } from "../lib/api";

interface AudioPlayerProps {
  audioHash: string;
  duration: number;
  name: string;
}

export default function AudioPlayer({ audioHash, duration, name }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState(false);
  const tickRef = useRef<() => void>(() => {});

  const audioUrl = audioHash ? BASE_URL + audioHash : "";

  const formatTime = useCallback((ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const updateLoadProgress = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.buffered.length > 0) {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        const total = audio.duration || (duration / 1000);
        if (total > 0) {
          const pct = (bufferedEnd / total) * 100;
          setLoadProgress(Math.min(Math.round(pct), 100));
        }
      }
    } catch {}
  }, [duration]);

  useEffect(() => {
    tickRef.current = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        setCurrentTime(audio.currentTime * 1000);
        requestAnimationFrame(tickRef.current);
      }
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      setLoading(true);
      audio.play().then(() => {
        setLoading(false);
        setPlaying(true);
        requestAnimationFrame(tickRef.current);
      }).catch(() => { setLoading(false); setError(true); });
    }
  }, [playing]);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * (duration / 1000);
    setCurrentTime(pct * duration);
  }, [duration]);

  if (!audioHash) return null;

  return (
    <div
      onClick={!error ? togglePlay : undefined}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px",
        background: "var(--color-surface-elevated)",
        border: `1px solid ${playing ? "var(--color-accent)" : "var(--color-border-light)"}`,
        borderRadius: "var(--radius-md)",
        cursor: error ? "not-allowed" : "pointer",
        transition: "border-color 0.2s, background 0.2s",
        opacity: error ? 0.5 : 1,
      }}
      onMouseEnter={(e) => { if (!error) { e.currentTarget.style.background = "var(--color-accent-bg)"; } }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-surface-elevated)"; }}
    >
      <audio
        ref={audioRef}
        src={audioUrl}

        preload="metadata"
        onProgress={updateLoadProgress}
        onLoadedMetadata={updateLoadProgress}
        onCanPlay={() => { setLoading(false); updateLoadProgress(); }}
        onPlaying={() => { setLoading(false); }}
        onError={() => { setLoading(false); setError(true); }}
        onEnded={() => { setPlaying(false); setCurrentTime(0); }}
      />

      <div style={{
        width: 32, height: 32, borderRadius: "var(--radius-md)",
        background: playing ? "var(--color-accent)" : "var(--color-base)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, transition: "background 0.2s",
      }}>
        {loading ? (
          <LoadingCube size={14} />
        ) : playing ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--color-surface-elevated)"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--color-accent)"><polygon points="6 3 20 12 6 21 6 3"/></svg>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
          <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums", flexShrink: 0, marginLeft: 8 }}>
            {loading ? (loadProgress > 0 ? `加载中 ${loadProgress}%` : "待处理...") : `${formatTime(currentTime)} / ${formatTime(duration)}`}
          </span>
        </div>
        <div
          onClick={handleSeek}
          style={{ height: 3, background: "var(--color-border-light)", borderRadius: 2, cursor: "pointer", position: "relative", overflow: "hidden" }}
        >
          {loadProgress > 0 && (
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${loadProgress}%`, background: "var(--color-border)", borderRadius: 2 }} />
          )}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${progress}%`, background: "var(--color-accent)", borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}
