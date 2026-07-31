"use client";

import { useState } from "react";
import type { Box3SearchEntry } from "../lib/db";
import { blockImageUrl } from "../lib/api";
import AudioPlayer from "./AudioPlayer";

const TYPE_LABELS: Record<number, string> = { 1: "地图", 2: "模型", 3: "音乐" };

function formatCount(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + "万";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

function formatDuration(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

interface Box3SearchDetailPanelProps {
  entry: Box3SearchEntry;
  onBack: () => void;
}

export default function Box3SearchDetailPanel({ entry, onBack }: Box3SearchDetailPanelProps) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = entry.image ? blockImageUrl(entry.image) : "";

  return (
    <div style={{ width: "100%", maxWidth: 672, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 }}>
      {imgSrc && !imgError && (
        <div style={{ width: "100%", height: 240, borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--color-base)", marginBottom: 16, position: "relative" }}>
          <img src={imgSrc} alt="" className="img-sharpen" style={{ width: "100%", height: "auto", position: "absolute", top: "50%", transform: "translateY(-50%)", display: "block" }} onError={() => setImgError(true)} />
        </div>
      )}

      <div className="panel-card animate-slide-up">
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>

          <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 5px", fontSize: 9, fontWeight: 600, borderRadius: "var(--radius-sm)", background: "var(--color-info-bg)", color: "var(--color-info)" }}>{TYPE_LABELS[entry.contentType]}</span>
          {entry.createdAt && (
            <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>{entry.createdAt.slice(0, 10)}</span>
          )}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text)", lineHeight: 1.3, marginBottom: 8 }}>{entry.name}</h2>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          {entry.author?.avatar && (
            <img src={blockImageUrl(entry.author.avatar)} alt="" loading="lazy" style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} />
          )}
          <span style={{ fontSize: 14, color: "var(--color-accent)", fontWeight: 500 }}>{entry.author?.displayname}</span>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          {entry.contentType === 1 && entry.playCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--color-text-secondary)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              {formatCount(entry.playCount)} 游玩
            </div>
          )}
          {entry.viewCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--color-text-secondary)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              {formatCount(entry.viewCount)} 浏览
            </div>
          )}
          {entry.publicInfo?.commentCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--color-text-secondary)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              {formatCount(entry.publicInfo.commentCount)} 评论
            </div>
          )}
          {entry.contentType === 3 && entry.duration > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--color-text-secondary)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {formatDuration(entry.duration)}
            </div>
          )}
        </div>

        {entry.describe && (
          <div style={{ marginBottom: 16 }}>

            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{entry.describe}</p>
          </div>
        )}

        {entry.contentType === 3 && entry.audioHash && (
          <div style={{ marginTop: 16 }}>
            <AudioPlayer audioHash={entry.audioHash} duration={entry.duration} name={entry.name} />
          </div>
        )}
      </div>

    </div>
  );
}