"use client";

import { memo } from "react";
import type { Box3SearchEntry } from "../lib/db";
import { blockImageUrl } from "../lib/api";

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

interface Box3SearchCardProps {
  entry: Box3SearchEntry;
  onSelect: (entry: Box3SearchEntry) => void;
}

export const Box3SearchCard = memo(function Box3SearchCard({ entry, onSelect }: Box3SearchCardProps) {
  const imgSrc = entry.image ? blockImageUrl(entry.image) : "";

  return (
    <div className="map-card" onClick={() => onSelect(entry)}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        {imgSrc && (
          <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", overflow: "hidden", flexShrink: 0, background: "var(--color-base)" }}>
            <img src={imgSrc} alt="" loading="lazy" className="img-sharpen" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text)", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {entry.name}
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>

            <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 5px", fontSize: 9, fontWeight: 600, borderRadius: "var(--radius-sm)", background: "var(--color-info-bg)", color: "var(--color-info)" }}>{TYPE_LABELS[entry.contentType]}</span>
            {entry.author?.avatar && (
              <img src={blockImageUrl(entry.author.avatar)} alt="" loading="lazy" style={{ width: 14, height: 14, borderRadius: "50%", objectFit: "cover" }} />
            )}
            <span style={{ fontSize: 12, color: "var(--color-accent)", fontWeight: 500 }}>{entry.author?.displayname}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            {entry.contentType === 1 && entry.playCount > 0 && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, color: "var(--color-text-tertiary)" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                {formatCount(entry.playCount)}
              </span>
            )}
            {entry.viewCount > 0 && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, color: "var(--color-text-tertiary)" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                {formatCount(entry.viewCount)}
              </span>
            )}
            {entry.publicInfo?.commentCount > 0 && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, color: "var(--color-text-tertiary)" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                {formatCount(entry.publicInfo.commentCount)}
              </span>
            )}
            {entry.contentType === 3 && entry.duration > 0 && (
              <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>{formatDuration(entry.duration)}</span>
            )}
          </div>
        </div>
        <div className="card-arrow" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28, borderRadius: "var(--radius-md)",
          background: "var(--color-accent-bg)", color: "var(--color-accent)",
          flexShrink: 0, opacity: 0, transition: "opacity 0.2s",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
      </div>
    </div>
  );
});