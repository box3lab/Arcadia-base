"use client";

import { memo } from "react";
import type { MapEntry } from "../lib/api";
import { truncateText } from "../lib/utils";

interface MapCardProps {
  entry: MapEntry;
  onSelect: (entry: MapEntry) => void;
}

export const MapCard = memo(function MapCard({ entry, onSelect }: MapCardProps) {
  return (
    <div
      className="map-card"
      onClick={() => onSelect(entry)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text)", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {entry.n}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 5px", fontSize: 9, fontWeight: 600, borderRadius: "var(--radius-sm)", background: "var(--color-accent-bg)", color: "var(--color-accent)", letterSpacing: "0.02em" }}>BOX3</span>
            <span style={{ fontSize: 12, color: "var(--color-accent)", fontWeight: 500 }}>{entry.a}</span>
            <span style={{ width: 1, height: 12, background: "var(--color-border)" }} />
            <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
              ID {entry.ai}
            </span>
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

      {entry.d && (
        <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 8, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {truncateText(entry.d, 120)}
        </p>
      )}
    </div>
  );
});
