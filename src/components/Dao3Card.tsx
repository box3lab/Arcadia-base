"use client";

import { memo } from "react";
import type { Dao3MapEntry } from "../lib/db";
import { blockImageUrl } from "../lib/api";

interface Dao3CardProps {
  entry: Dao3MapEntry;
  onSelect: (entry: Dao3MapEntry) => void;
}

export const Dao3Card = memo(function Dao3Card({ entry, onSelect }: Dao3CardProps) {
  const coAuthorNames = entry.coAuthors?.slice(0, 3).map((c) => c.nickname) || [];
  const hasMoreCoAuthors = (entry.coAuthors?.length || 0) > 3;

  return (
    <div className="map-card" onClick={() => onSelect(entry)}>

      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4, flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 5px", fontSize: 9, fontWeight: 600, borderRadius: "var(--radius-sm)", background: "var(--color-info-bg)", color: "var(--color-info)", letterSpacing: "0.02em" }}>DAO3</span>
        {entry.tab?.tabName && (
          <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 5px", fontSize: 9, fontWeight: 500, borderRadius: "var(--radius-sm)", background: "var(--color-base)", color: "var(--color-text-tertiary)" }}>{entry.tab.tabName}</span>
        )}
        {entry.labels?.map((l) => (
          <span key={l.labelId} style={{ display: "inline-flex", alignItems: "center", padding: "1px 5px", fontSize: 9, fontWeight: 500, borderRadius: "var(--radius-sm)", background: "var(--color-accent-bg)", color: "var(--color-accent)" }}>{l.labelName}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text)", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {entry.name}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            {entry.author?.avatar && (
              <img src={blockImageUrl(entry.author.avatar)} alt="" style={{ width: 16, height: 16, borderRadius: "50%", objectFit: "cover" }} loading="lazy" />
            )}
            <span style={{ fontSize: 12, color: "var(--color-accent)", fontWeight: 500 }}>{entry.author?.nickname}</span>
            <span style={{ width: 1, height: 12, background: "var(--color-border)" }} />
            <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
              ID {entry.contentId}
            </span>
          </div>
        </div>
        <div className="card-arrow" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28, borderRadius: "var(--radius-md)",
          background: "var(--color-info-bg)", color: "var(--color-info)",
          flexShrink: 0, opacity: 0, transition: "opacity 0.2s",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
      </div>

      {coAuthorNames.length > 0 && (
        <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          合作: {coAuthorNames.join("、")}{hasMoreCoAuthors ? ` 等${entry.coAuthors.length}人` : ""}
        </div>
      )}

      {entry.description && (
        <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 8, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {entry.description}
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>{(entry.playCount || 0).toLocaleString()}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>{(entry.likeCount || 0).toLocaleString()}
        </span>
        {entry.viewCount > 0 && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>{(entry.viewCount || 0).toLocaleString()}
          </span>
        )}
        {entry.favoritesCount > 0 && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>{(entry.favoritesCount || 0).toLocaleString()}
          </span>
        )}
        {entry.publishedAt && (
          <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginLeft: "auto" }}>
            {entry.publishedAt.slice(0, 10)}
          </span>
        )}
      </div>
    </div>
  );
});
