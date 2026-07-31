"use client";

import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { DEFAULT_SEARCH_CONFIG, normalizeSearchConfig, type Dao3MapEntry, type Box3SearchEntry, type UnifiedSearchResult, type SearchConfig } from "../../lib/db";
import type { MapEntry } from "../../lib/api";
import { fetchBlock, fetchBlockByHash, isQmHash, fetchDao3MapHashByMapId, type CurrentMap } from "../../lib/api";
import SearchBar, { type SearchBarHandle, type SourceCounts } from "../../components/SearchBar";
import { MapCard } from "../../components/MapCard";
import { Dao3Card } from "../../components/Dao3Card";
import { Box3SearchCard } from "../../components/Box3SearchCard";
import ExportPanel from "../../components/ExportPanel";
import LoadingCube from "../../components/LoadingCube";
import { encodePayload } from "../../lib/utils";

import PageLayout from "../../components/PageLayout";

const PAGE_SIZE = 20;

export default function SearchPage() {
  const [results, setResults] = useState<UnifiedSearchResult[]>([]);
  const [query, setQuery] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [sourceCounts, setSourceCounts] = useState<SourceCounts>({ box3: 0, dao3: 0, "box3-search": 0 });
  const [currentMap, setCurrentMap] = useState<CurrentMap | null>(null);

  const [mode, setMode] = useState<"search" | "export">("search");
  const [searched, setSearched] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchConfig, setSearchConfig] = useState<SearchConfig>(normalizeSearchConfig({ ...DEFAULT_SEARCH_CONFIG }));
  const searchBarRef = useRef<SearchBarHandle>(null);

  const handleResults = useCallback((r: UnifiedSearchResult[], q: string, total: number, counts: SourceCounts, resultPage: number) => {
    setResults(r);
    setQuery(q);
    setTotalResults(total);
    setSourceCounts(counts);
    setMode("search");
    setSearched(true);
    setPage(resultPage);
  }, []);

  const handleSelectMap = useCallback((entry: MapEntry) => {
    const map: CurrentMap = {
      name: entry.n,
      hash: entry.h,
      author_name: entry.a,
      author_id: entry.ai,
      describe: entry.d || "",
    };
    setCurrentMap(map);
    setMode("export");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelectDao3 = useCallback((entry: Dao3MapEntry) => {
    const mapId = entry.contentId;
    const m = "play";
    const params = new URLSearchParams({ mapId: String(mapId), mode: m });
    if (entry.name) params.set("name", encodeURIComponent(entry.name));
    if (entry.description) params.set("desc", encodeURIComponent(entry.description));
    if (entry.preview) params.set("preview", encodeURIComponent(entry.preview));
    if (entry.author?.nickname) params.set("author", encodeURIComponent(entry.author.nickname));
    if (entry.author?.avatar) params.set("authorAvatar", encodeURIComponent(entry.author.avatar));
    window.location.href = `/tools/dao3-export?${params.toString()}`;
  }, []);

  const handleSelectBox3Search = useCallback((entry: Box3SearchEntry) => {
    window.location.href = "/map?d=" + encodeURIComponent(encodePayload({ source: "box3-search", data: entry }));
  }, []);

  const handleHashSearch = useCallback(async (hash: string) => {
    const mapIdMatch = hash.trim().match(/^(\d{6,})$/);
    if (mapIdMatch) {
      const mapId = parseInt(mapIdMatch[1]);
      try {
        const result = await fetchDao3MapHashByMapId(mapId, "play");
        if (result.hash) {
          hash = result.hash;
        }
      } catch {}
    }

    const map: CurrentMap = {
      name: "未命名地图",
      hash,
      author_name: "未知",
      author_id: 0,
      describe: "",
    };
    setCurrentMap(map);

    setMode("export");
    try {
      const blockData = isQmHash(hash) ? await fetchBlock(hash) : await fetchBlockByHash(hash);
      if (blockData?.type === "permission" && blockData.versionControl) {
        const vcData = await fetchBlock(blockData.versionControl);
        let projectHash: string | null = null;
        if (vcData?.headHash) projectHash = vcData.headHash;
        if (!projectHash && vcData?.branches) {
          for (const bkey of Object.keys(vcData.branches)) {
            const b = vcData.branches[bkey];
            if (b.headHash) { projectHash = b.headHash; break; }
            if (b.hash) { projectHash = b.hash; break; }
          }
        }
        if (projectHash) {
          const projectData = await fetchBlock(projectHash);
            map.projectHash = projectHash;
          if (projectData.info) {
            const infoData = typeof projectData.info === "object"
              ? projectData.info
              : await fetchBlock(projectData.info);
            if (infoData.displayName) map.name = infoData.displayName;
            if (infoData.description) map.describe = infoData.description;
          }
          setCurrentMap({ ...map });
        }
      } else if (blockData?.type === "project") {
        if (blockData.info) {
          const infoData = typeof blockData.info === "object"
            ? blockData.info
            : await fetchBlock(blockData.info);
          if (infoData.displayName) map.name = infoData.displayName;
          if (infoData.description) map.describe = infoData.description;
        }
        setCurrentMap({ ...map });
      }
    } catch {}
  }, []);

  const handleBack = useCallback(() => {
    setMode("search");
    setCurrentMap(null);
  }, []);

  const heroCentered = !searched;
  const normalizedSearchConfig = useMemo(() => normalizeSearchConfig(searchConfig), [searchConfig]);

  const totalPages = Math.ceil(totalResults / PAGE_SIZE);
  const box3Count = sourceCounts.box3;
  const dao3Count = sourceCounts.dao3;
  const bsCount = sourceCounts["box3-search"];

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    setSearchLoading(true);
    searchBarRef.current?.searchPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <PageLayout
      breadcrumb={mode === "search" ? "搜索" : undefined}
      navActions={mode !== "search" ? (
        <button onClick={handleBack} className="back-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          返回
        </button>
      ) : undefined}
    >
      <main style={{ flex: "1 1 0%", position: "relative" }}>
        {mode === "search" && (
          <div className="animate-fade-in">
            <section style={{
              width: "100%",
              maxWidth: 672,
              marginLeft: "auto",
              marginRight: "auto",
              paddingLeft: 24,
              paddingRight: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: heroCentered ? "center" : "flex-start",
              alignItems: heroCentered ? "center" : "stretch",
              minHeight: heroCentered ? "calc(100dvh - 48px - 40px)" : "auto",
              paddingTop: heroCentered ? 0 : 24,
              paddingBottom: heroCentered ? 0 : 24,
              transition: "min-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), padding-top 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>
              <div style={{ textAlign: "center", marginBottom: 16, width: "100%", marginTop: heroCentered ? -32 : 0 }} className="animate-slide-up">
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.02em" }}>资源搜索</h2>
              </div>


              {/* 搜索栏 */}
              <div style={{ width: "100%" }} className="animate-slide-up">
                <SearchBar ref={searchBarRef} onResults={handleResults} onHashSearch={handleHashSearch} config={searchConfig} onConfigChange={setSearchConfig} onLoadingChange={setSearchLoading} page={page} pageSize={PAGE_SIZE} />
              </div>

              {!searched && (
                <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12, maxWidth: 480, marginLeft: "auto", marginRight: "auto", width: "100%" }} className="animate-slide-up">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {[
                      { icon: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z", label: "名称", fields: ["name" as const] },
                      { icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", label: "作者", fields: ["author" as const, "coAuthor" as const] },
                      { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", label: "Hash", fields: ["hash" as const] },
                    ].map((item) => (
                      <button key={item.label} onClick={() => { setSearchConfig(normalizeSearchConfig({ ...normalizedSearchConfig, fields: item.fields })); searchBarRef.current?.focus(); }}
                        className="glass-card"
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 8px", borderRadius: "var(--radius-md)", cursor: "pointer", transition: "border-color 0.25s var(--ease-out), box-shadow 0.3s var(--ease-out), transform 0.2s var(--ease-out), background 0.25s var(--ease-out)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--glass-border-hover)"; e.currentTarget.style.boxShadow = "var(--shadow-card-hover), 0 0 16px var(--glow-accent)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "var(--glass-bg-hover)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--glass-border)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.background = "var(--glass-bg)"; }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d={item.icon}/>
                        </svg>
                        <span style={{ fontSize: 12, color: "var(--color-text)", fontWeight: 500 }}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8, marginTop: 8 }}>
                    <button onClick={() => { searchBarRef.current?.focus(); }}
                      className="glass-card"
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 8px", borderRadius: "var(--radius-md)", cursor: "pointer", transition: "border-color 0.25s var(--ease-out), box-shadow 0.3s var(--ease-out), transform 0.2s var(--ease-out), background 0.25s var(--ease-out)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--glass-border-hover)"; e.currentTarget.style.boxShadow = "var(--shadow-card-hover), 0 0 16px var(--glow-accent)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "var(--glass-bg-hover)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--glass-border)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.background = "var(--glass-bg)"; }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h4"/>
                      </svg>
                      <span style={{ fontSize: 12, color: "var(--color-text)", fontWeight: 500 }}>地图 ID</span>
                      <span style={{ fontSize: 9, color: "var(--color-text-tertiary)", fontWeight: 400 }}>输入数字 ID 直接导出</span>
                    </button>
                  </div>
                </div>
              )}

              {searched && totalResults === 0 && query !== "" && (
                <div style={{ textAlign: "center", padding: "48px 0 0", width: "100%" }} className="animate-fade-in">
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: "50%", background: "var(--color-base)", marginBottom: 12 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 500 }}>没有找到匹配的结果</p>
                </div>
              )}
            </section>

            {searchLoading && searched && (
              <section style={{ width: "100%", maxWidth: 672, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24, paddingTop: 48, paddingBottom: 48, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <LoadingCube size={24} />
              </section>
            )}

            {!searchLoading && searched && results.length > 0 && (
              <section style={{ width: "100%", maxWidth: 672, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>
                    找到 <span style={{ color: "var(--color-text-secondary)" }}>{totalResults}</span> 个结果
                    {(box3Count + dao3Count + bsCount) > 0 && (
                      <span style={{ marginLeft: 6 }}>
                        {box3Count > 0 && <span>Box3 {box3Count}</span>}
                        {box3Count > 0 && (dao3Count > 0 || bsCount > 0) && " / "}
                        {dao3Count > 0 && <span>Dao3 {dao3Count}</span>}
                        {dao3Count > 0 && bsCount > 0 && " / "}
                        {bsCount > 0 && <span>Box3搜索 {bsCount}</span>}
                      </span>
                    )}
                  </span>
                  {totalPages > 1 && (
                    <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>第 {page} / {totalPages} 页</span>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {results.map((r, i) => {
                    const key = r.source === "box3" ? `box3-${r.box3Entry!.h}-${i}`
                      : r.source === "box3-search" ? `bs-${r.box3SearchEntry!.contentId}-${i}`
                      : `dao3-${r.dao3Entry!.contentId}-${i}`;
                    return (
                      <div key={key} className="animate-slide-up" style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s` }}>
                        {r.source === "box3" ? (
                          <MapCard entry={r.box3Entry!} onSelect={handleSelectMap} />
                        ) : r.source === "box3-search" ? (
                          <Box3SearchCard entry={r.box3SearchEntry!} onSelect={handleSelectBox3Search} />
                        ) : (
                          <Dao3Card entry={r.dao3Entry!} onSelect={handleSelectDao3} />
                        )}
                      </div>
                    );
                  })}
                </div>
                {totalPages > 1 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 20 }}>
                    <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface-elevated)", color: page <= 1 ? "var(--color-text-tertiary)" : "var(--color-text)", cursor: page <= 1 ? "not-allowed" : "pointer", opacity: page <= 1 ? 0.4 : 1 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                      .reduce<(number | string)[]>((acc, p, idx, arr) => {
                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((item, idx) =>
                        typeof item === "string" ? (
                          <span key={`e${idx}`} style={{ fontSize: 11, color: "var(--color-text-tertiary)", padding: "0 4px" }}>...</span>
                        ) : (
                          <button key={item} onClick={() => handlePageChange(item)}
                            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "var(--radius-md)", border: page === item ? "1px solid var(--color-accent)" : "1px solid var(--color-border)", background: page === item ? "var(--color-accent-bg)" : "var(--color-surface-elevated)", color: page === item ? "var(--color-accent)" : "var(--color-text)", cursor: "pointer", fontSize: 12, fontWeight: page === item ? 600 : 400 }}>{item}</button>
                        )
                      )}
                    <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface-elevated)", color: page >= totalPages ? "var(--color-text-tertiary)" : "var(--color-text)", cursor: page >= totalPages ? "not-allowed" : "pointer", opacity: page >= totalPages ? 0.4 : 1 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                )}
              </section>
            )}
          </div>
        )}

        {mode === "export" && currentMap && (
          <div className="animate-slide-in-right">
            <ExportPanel map={currentMap} onBack={handleBack} />
          </div>
        )}
      </main>
    </PageLayout>
  );
}
