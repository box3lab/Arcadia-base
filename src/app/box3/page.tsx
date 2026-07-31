"use client";

import { useState, useEffect, useCallback } from "react";
import { blockImageUrl, loadImageMap, API_BASE, signedFetch, type Box3RecommendItem } from "../../lib/api";
import { ungzip } from "pako";

import PageLayout from "../../components/PageLayout";
import { encodePayload } from "../../lib/utils";
import LoadingCube from "../../components/LoadingCube";

type TabType = 1 | 2 | 3;


const TABS: { key: TabType; label: string; icon: string }[] = [
  { key: 1, label: "地图", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { key: 2, label: "模型", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { key: 3, label: "音乐", icon: "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" },
];

const TYPE_LABELS: Record<number, string> = { 1: "地图", 2: "模型", 3: "音乐" };

const TIMELINE = [
  { id: "latest", label: "最后的推荐", subtitle: "Box3停运前" },
];

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

export default function Box3Page() {
  const [activeTimeline, setActiveTimeline] = useState("latest");
  const [activeTab, setActiveTab] = useState<TabType>(1);
  const [items, setItems] = useState<Box3RecommendItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());


  useEffect(() => {
    loadImageMap().catch(() => {});
  }, []);

  let _recDb: Record<string, Box3RecommendItem[]> | null = null;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setImgErrors(new Set());
    signedFetch(API_BASE + `/recommend?type=${activeTab}`)
      .then((resp) => {
        if (!resp.ok) throw new Error("API unavailable");
        return resp.json();
      })
      .then((data) => {
        if (!cancelled) { setItems(data.items || []); setLoading(false); }
      })
      .catch(async () => {
        try {
          if (!_recDb) {
            const resp = await fetch("/data/box3-recommend.json.gz");
            const compressed = new Uint8Array(await resp.arrayBuffer());
            const decompressed = ungzip(compressed);
            _recDb = JSON.parse(new TextDecoder("utf-8").decode(decompressed));
          }
          if (!cancelled) { setItems(_recDb![String(activeTab)] || []); setLoading(false); }
        } catch {
          if (!cancelled) { setItems([]); setLoading(false); }
        }
      });
    return () => { cancelled = true; };
  }, [activeTab]);

  const handleImgError = useCallback((contentId: number) => {
    setImgErrors((prev) => new Set(prev).add(contentId));
  }, []);

  const handleSelectItem = useCallback((item: Box3RecommendItem) => {
    window.location.href = "/map?d=" + encodeURIComponent(encodePayload({ source: "bs-recommend", data: item }));
  }, []);

  return (
    <PageLayout
      breadcrumb="Box3 历史推荐"
    >
      <main className="box3-main" style={{ flex: "1 1 0%", position: "relative" }}>
        <aside className="box3-timeline" style={{ position: "fixed", left: 0, top: 56, bottom: 0, width: 220, paddingLeft: 28, paddingRight: 20, paddingTop: 28, zIndex: 10, background: "var(--color-base)", borderRight: "1px solid var(--color-border-light)", overflowY: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-tertiary)", letterSpacing: "0.1em", marginBottom: 24, paddingLeft: 6 }}>时间线</div>
          <div style={{ position: "relative" }}>
            {TIMELINE.map((t, idx) => {
              const isActive = activeTimeline === t.id;
              const isLast = idx === TIMELINE.length - 1;
              return (
                <div key={t.id} style={{ position: "relative", paddingLeft: 28, paddingBottom: isLast ? 0 : 28 }}>
                  <div style={{ position: "absolute", left: 5, top: 0, bottom: isLast ? -16 : -4, width: 1, background: isActive ? "var(--color-accent)" : "var(--color-border-light)", opacity: isLast ? 0.35 : 1, transition: "background 0.2s" }} />
                  <div style={{
                    position: "absolute", left: 0, top: 2,
                    width: 11, height: 11, borderRadius: "50%",
                    background: isActive ? "var(--color-accent)" : "var(--color-border)",
                    boxShadow: isActive ? "0 0 0 4px var(--color-accent-bg)" : "none",
                    transition: "all 0.25s",
                  }} />
                  <button
                    onClick={() => setActiveTimeline(t.id)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "0 6px",
                      background: "transparent", border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: isActive ? 600 : 400, color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)", transition: "color 0.15s", lineHeight: 1.5 }}>
                      {t.label}
                    </div>
                    {t.subtitle ? (
                      <div style={{ marginTop: 3, fontSize: 10, color: "var(--color-text-tertiary)", lineHeight: 1.4 }}>
                        {t.subtitle}
                      </div>
                    ) : null}
                  </button>
                </div>
              );
            })}
          </div>
        </aside>

        <div className="box3-content" style={{ maxWidth: 672, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 32 }}>
          <div className="animate-slide-up">
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", marginBottom: 16 }}>Box3 历史推荐</h2>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.03s" }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 12, background: "var(--color-base)", borderRadius: "var(--radius-md)", padding: 2 }}>
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                    padding: "6px 0", fontSize: 11, fontWeight: activeTab === tab.key ? 600 : 400,
                    color: activeTab === tab.key ? "var(--color-accent)" : "var(--color-text-secondary)",
                    background: activeTab === tab.key ? "var(--color-surface-elevated)" : "transparent",
                    border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer",
                    transition: "all 0.25s var(--ease-out)", boxShadow: activeTab === tab.key ? "var(--shadow-sm)" : "none",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={tab.icon} /></svg>
                  {tab.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "48px 0" }}>
                <LoadingCube size={24} />
              </div>
            ) : items.length === 0 ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>暂无内容</span>
              </div>
            ) : activeTab === 3 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {items.map((item) => {
                  const imgSrc = item.image ? blockImageUrl(item.image) : "";
                  const hasError = imgErrors.has(item.contentId);
                  return (
                    <div key={item.contentId} className="map-card" style={{ padding: "10px 14px" }} onClick={() => handleSelectItem(item)}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", overflow: "hidden", flexShrink: 0, background: "var(--color-base)" }}>
                          {imgSrc && !hasError ? (
                            <img src={imgSrc} alt="" loading="lazy" onError={() => handleImgError(item.contentId)} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="img-sharpen" />
                          ) : (
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>
                            </div>
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</h4>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                            {item.authorAvatar && <img src={blockImageUrl(item.authorAvatar)} alt="" loading="lazy" style={{ width: 12, height: 12, borderRadius: "50%", objectFit: "cover" }} />}
                            <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{item.authorName}</span>
                            <span style={{ width: 1, height: 10, background: "var(--color-border)" }} />
                            <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>{formatCount(item.viewCount)} 播放</span>
                            {item.duration > 0 && (
                              <>
                                <span style={{ width: 1, height: 10, background: "var(--color-border)" }} />
                                <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>{formatDuration(item.duration)}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.4 }}><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                {items.map((item) => {
                  const imgSrc = item.image ? blockImageUrl(item.image) : "";
                  const hasError = imgErrors.has(item.contentId);
                  return (
                    <div key={item.contentId} className="map-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", cursor: "pointer" }} onClick={() => handleSelectItem(item)}>
                      <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "var(--color-base)", overflow: "hidden" }}>
                        {imgSrc && !hasError ? (
                          <img src={imgSrc} alt={item.name} loading="lazy" onError={() => handleImgError(item.contentId)} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} className="img-sharpen" />
                        ) : (
                          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          </div>
                        )}
                        <span style={{ position: "absolute", top: 6, left: 6, display: "inline-flex", alignItems: "center", padding: "1px 5px", fontSize: 9, fontWeight: 600, borderRadius: "var(--radius-sm)", background: "rgba(0,0,0,0.65)", color: "#fff" }}>
                          {TYPE_LABELS[item.type]}
                        </span>
                      </div>
                      <div style={{ padding: "8px 10px 10px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <h4 style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text)", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</h4>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                          {item.authorAvatar && <img src={blockImageUrl(item.authorAvatar)} alt="" loading="lazy" style={{ width: 12, height: 12, borderRadius: "50%", objectFit: "cover" }} />}
                          <span style={{ fontSize: 10, color: "var(--color-text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.authorName}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto", paddingTop: 4 }}>
                          {item.type === 1 && item.playCount > 0 && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 9, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>{formatCount(item.playCount)}
                            </span>
                          )}
                          {item.viewCount > 0 && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 9, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>{formatCount(item.viewCount)}
                            </span>
                          )}
                          {item.commentCount > 0 && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 9, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>{formatCount(item.commentCount)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
