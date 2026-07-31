"use client";

import { useState } from "react";
import type { Dao3MapEntry } from "../lib/db";
import { blockImageUrl } from "../lib/api";

interface Dao3DetailPanelProps {
  entry: Dao3MapEntry;
  onBack: () => void;
}

export default function Dao3DetailPanel({ entry, onBack }: Dao3DetailPanelProps) {
  const [bannerIdx, setBannerIdx] = useState(0);
  const banners = entry.banner || [];
  const coAuthors = entry.coAuthors || [];

  return (
    <div style={{ width: "100%", maxWidth: 672, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 }}>
      {banners.length > 0 && (
        <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 12, position: "relative" }} className="animate-slide-up">
          <div style={{ position: "relative", width: "100%", height: 200, overflow: "hidden" }}>
            <img key={bannerIdx} src={banners[bannerIdx]} alt={"banner " + (bannerIdx + 1)} className="banner-fade" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            {banners.length > 1 && (
              <>
                <button onClick={() => setBannerIdx(i => (i - 1 + banners.length) % banners.length)}
                  className="banner-btn"
                  style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button onClick={() => setBannerIdx(i => (i + 1) % banners.length)}
                  className="banner-btn"
                  style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
                  {banners.map((_, i) => (
                    <div key={i} onClick={() => setBannerIdx(i)} style={{ width: i === bannerIdx ? 18 : 6, height: 6, borderRadius: 3, background: i === bannerIdx ? "white" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)", boxShadow: i === bannerIdx ? "0 0 6px rgba(255,255,255,0.3)" : "none" }} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {!banners.length && entry.preview && (
        <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 12 }} className="animate-slide-up">
          <img src={entry.preview} alt="" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
        </div>
      )}

      <div className="panel-card animate-slide-up">
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6, flexWrap: "wrap" }}>

          {entry.tab?.tabName && (
            <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 5px", fontSize: 9, fontWeight: 500, borderRadius: "var(--radius-sm)", background: "var(--color-base)", color: "var(--color-text-tertiary)" }}>{entry.tab.tabName}</span>
          )}
          {entry.labels?.map((l) => (
            <span key={l.labelId} style={{ display: "inline-flex", alignItems: "center", padding: "1px 5px", fontSize: 9, fontWeight: 500, borderRadius: "var(--radius-sm)", background: "var(--color-accent-bg)", color: "var(--color-accent)" }}>{l.labelName}</span>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", lineHeight: 1.4, marginBottom: 8 }}>{entry.name}</h2>
        {entry.description && (
          <p style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.6, whiteSpace: "pre-wrap", display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 8 }}>{entry.description}</p>
        )}
        {entry.notice && (
          <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", lineHeight: 1.5, marginBottom: 8 }}>{entry.notice}</p>
        )}

        <div className="section-divider" />

        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {entry.author?.avatar ? (
              <img src={blockImageUrl(entry.author.avatar)} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 15, fontWeight: 600 }}>
                {(entry.author?.nickname || "?").charAt(0).toUpperCase()}
              </div>
            )}
            {entry.author?.avatarFrame && (
              <img src={blockImageUrl(entry.author.avatarFrame)} alt="" style={{ position: "absolute", top: 0, left: 0, width: 52, height: 52, pointerEvents: "none" }} />
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)", lineHeight: 1.3 }}>{entry.author?.nickname}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>
              ID {entry.author?.authorId}
              {entry.author?.followerNum > 0 && <span style={{ marginLeft: 8 }}>粉丝 {(entry.author.followerNum).toLocaleString()}</span>}
            </div>
          </div>
        </div>

        {coAuthors.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>合作者 ({coAuthors.length})</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {coAuthors.map((c) => (
                <div key={c.userId} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 6px", background: "var(--color-base)", borderRadius: "var(--radius-sm)" }}>
                  {c.avatar && <img src={blockImageUrl(c.avatar)} alt="" style={{ width: 14, height: 14, borderRadius: "50%", objectFit: "cover" }} loading="lazy" />}
                  <span style={{ fontSize: 10, color: "var(--color-text-secondary)" }}>{c.nickname}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="panel-card animate-slide-up" style={{ marginTop: 12 }}>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {[
            { label: "播放", value: entry.playCount, icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> },
            { label: "点赞", value: entry.likeCount, icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
            { label: "浏览", value: entry.viewCount, icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
            { label: "收藏", value: entry.favoritesCount, icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
            { label: "评论", value: entry.commentCount, icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
            { label: "版本", value: entry.publishedVersion, icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg> },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, fontSize: 9, color: "var(--color-text-tertiary)", marginBottom: 2 }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)", fontVariantNumeric: "tabular-nums" }}>
                {(s.value || 0).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        {entry.publishedAt && (
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "var(--color-text-tertiary)" }}>
            {entry.publishedAt.slice(0, 10)}
          </div>
        )}
      </div>
    </div>
  );
}
