"use client";

import React, { useState, useCallback, useRef, useMemo, useImperativeHandle, forwardRef } from "react";
import { DEFAULT_SEARCH_CONFIG, getVisibleFieldsForSources, normalizeSearchConfig, SEARCH_FIELD_LABELS, DAO3_TABS, BOX3_CONTENT_TYPES, type SearchConfig, type SearchField, type SearchFilter, type UnifiedSearchResult, type Dao3MapEntry, type Box3SearchEntry, clientSearch } from "../lib/db";
import type { MapEntry } from "../lib/api";
import { API_BASE, signedFetch } from "../lib/api";

export type SourceCounts = { box3: number; dao3: number; "box3-search": number };

interface SearchBarProps {
  onResults: (results: UnifiedSearchResult[], query: string, total: number, counts: SourceCounts, page: number) => void;
  onHashSearch: (hash: string) => void;
  config: SearchConfig;
  onConfigChange: (config: SearchConfig) => void;
  onLoadingChange: (loading: boolean) => void;
  page?: number;
  pageSize?: number;
}

export interface SearchBarHandle {
  focus: () => void;
  searchPage: (page: number) => void;
}

const CONTENT_TABS = [
  { key: "all", label: "全部" },
  { key: "map", label: "地图" },
  { key: "model", label: "模型" },
  { key: "music", label: "音乐" },
] as const;

function TrapezoidTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "5px 18px 4px",
      fontSize: 11,
      fontWeight: active ? 600 : 400,
      color: active ? "var(--color-text)" : "var(--color-text-tertiary)",
      background: active ? "var(--color-surface-elevated)" : "transparent",
      border: "none",
      cursor: "pointer",
      transition: "all 0.15s",
      clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 100%, 0% 100%)",
    }}>
      {label}
    </button>
  );
}

let _apiAvailable: boolean | null = null;

async function apiSearch(params: { q: string; sources: string; contentType?: string; tab?: string; page?: number; limit?: number }): Promise<{ results: UnifiedSearchResult[]; total: number; counts: SourceCounts }> {
  if (_apiAvailable === false) throw new Error("API unavailable");
  const sp = new URLSearchParams();
  sp.set("q", String(params.q || ""));
  sp.set("sources", String(params.sources || ""));
  if (params.contentType) sp.set("contentType", String(params.contentType));
  if (params.tab && typeof params.tab === "string") sp.set("tab", params.tab);
  if (params.page) sp.set("page", String(Number(params.page) || 1));
  if (params.limit) sp.set("limit", String(Number(params.limit) || 20));
  const resp = await signedFetch(API_BASE + "/search?" + sp.toString());
  if (!resp.ok) {
    _apiAvailable = false;
    throw new Error("Search API failed: " + resp.status);
  }
  _apiAvailable = true;
  const data = await resp.json();
  return {
    results: data.results.map((r: any) => ({
      source: r.source,
      box3Entry: r.source === "box3" ? r.data as MapEntry : undefined,
      dao3Entry: r.source === "dao3" ? r.data as Dao3MapEntry : undefined,
      box3SearchEntry: r.source === "box3-search" ? r.data as Box3SearchEntry : undefined,
      relevance: 0,
    })),
    total: data.total,
    counts: data.counts || { box3: 0, dao3: 0, "box3-search": 0 },
  };
}

async function fallbackSearch(params: { q: string; sources: string[]; contentType?: number; tab?: string }): Promise<UnifiedSearchResult[]> {
  return clientSearch(params);
}

const SearchBarInner = forwardRef<SearchBarHandle, SearchBarProps>(function SearchBarInner({ onResults, onHashSearch, config, onConfigChange, onLoadingChange, page = 1, pageSize = 20 }, ref) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const normalizedConfig = useMemo(() => normalizeSearchConfig(config), [config]);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    searchPage: (p: number) => doSearch(p),
  }));

  const visibleFields = useMemo(() => {
    return getVisibleFieldsForSources(normalizedConfig.sources).map((field) => [field, SEARCH_FIELD_LABELS[field]] as [SearchField, string]);
  }, [normalizedConfig.sources]);

  const buildApiParams = useCallback((q: string, cfg: SearchConfig, pageNum: number) => {
    const nc = normalizeSearchConfig(cfg);
    const ctFilter = nc.filters.find((f) => f.key === "contentType");
    const tabFilter = nc.filters.find((f) => f.key === "tab");
    return {
      q,
      sources: nc.sources.join(","),
      contentType: ctFilter ? String(ctFilter.value) : undefined,
      tab: tabFilter && typeof tabFilter.value === "string" ? tabFilter.value : undefined,
      page: Number(pageNum) || 1,
      limit: Number(pageSize) || 20,
    };
  }, [pageSize]);

  const doSearch = useCallback(async (pageNum?: number) => {
    const q = query.trim();

    if (q.startsWith("Qm") && q.length > 20) {
      onHashSearch(q);
      return;
    }
    onLoadingChange(true);
    const p = pageNum ?? 1;
    const emptyCounts: SourceCounts = { box3: 0, dao3: 0, "box3-search": 0 };
    try {
      const apiParams = buildApiParams(q, normalizedConfig, p);
      const { results, total, counts } = await apiSearch(apiParams);
      onResults(results, q, total, counts, p);
    } catch {
      try {
        const nc = normalizeSearchConfig(normalizedConfig);
        const ctFilter = nc.filters.find((f) => f.key === "contentType");
        const tabFilter = nc.filters.find((f) => f.key === "tab");
        const allResults = await fallbackSearch({
          q,
          sources: nc.sources,
          contentType: ctFilter ? (ctFilter.value as number) : undefined,
          tab: tabFilter ? (tabFilter.value as string) : undefined,
        });
        const start = (p - 1) * pageSize;
        const paged = allResults.slice(start, start + pageSize);
        const fc: SourceCounts = { box3: 0, dao3: 0, "box3-search": 0 };
        for (const r of allResults) fc[r.source as keyof SourceCounts]++;
        onResults(paged, q, allResults.length, fc, p);
      } catch {
        onResults([], q, 0, emptyCounts, p);
      }
    }
    onLoadingChange(false);
  }, [query, onResults, onHashSearch, normalizedConfig, onLoadingChange, buildApiParams]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) doSearch();
  }, [doSearch, query]);

  const toggleField = useCallback((field: SearchField) => {
    const next = normalizedConfig.fields.includes(field)
      ? normalizedConfig.fields.filter((f) => f !== field)
      : [...normalizedConfig.fields, field];
    if (next.length > 0) onConfigChange(normalizeSearchConfig({ ...normalizedConfig, fields: next }));
  }, [normalizedConfig, onConfigChange]);

  const toggleSource = useCallback((source: "box3" | "dao3" | "box3-search") => {
    const next = normalizedConfig.sources.includes(source)
      ? normalizedConfig.sources.filter((s) => s !== source)
      : [...normalizedConfig.sources, source];
    if (next.length > 0) onConfigChange(normalizeSearchConfig({ ...normalizedConfig, sources: next }));
  }, [normalizedConfig, onConfigChange]);

  const toggleFilter = useCallback((filter: SearchFilter) => {
    const existing = normalizedConfig.filters.find((f) => f.key === filter.key && f.value === filter.value);
    const next = existing
      ? normalizedConfig.filters.filter((f) => !(f.key === filter.key && f.value === filter.value))
      : [...normalizedConfig.filters, filter];
    onConfigChange(normalizeSearchConfig({ ...normalizedConfig, filters: next }));
  }, [normalizedConfig, onConfigChange]);

  const applyPreset = useCallback((fields: SearchField[]) => {
    const nextFields = fields.filter((field) => visibleFields.some(([f]) => f === field));
    if (nextFields.length > 0) {
      onConfigChange(normalizeSearchConfig({ ...normalizedConfig, fields: nextFields }));
      inputRef.current?.focus();
    }
  }, [normalizedConfig, onConfigChange, visibleFields]);

  const handleContentTab = useCallback(async (tabKey: string) => {
    let nextFilters: SearchFilter[] = [];
    let nextSources: ("box3" | "dao3" | "box3-search")[] = ["box3", "dao3", "box3-search"];
    
    if (tabKey === "map") {
      nextFilters = [{ key: "contentType", value: 1 }];
    } else if (tabKey === "model") {
      nextFilters = [{ key: "contentType", value: 2 }];
    } else if (tabKey === "music") {
      nextFilters = [{ key: "contentType", value: 3 }];
    }
    
    const newConfig = normalizeSearchConfig({ ...normalizedConfig, filters: nextFilters, sources: nextSources });
    onConfigChange(newConfig);
    onLoadingChange(true);
    const emptyCounts: SourceCounts = { box3: 0, dao3: 0, "box3-search": 0 };
    try {
      const { results, total, counts } = await apiSearch(buildApiParams("", newConfig, 1));
      onResults(results, "", total, counts, 1);
    } catch {
      try {
        const ctFilter = newConfig.filters.find((f) => f.key === "contentType");
        const tabFilter = newConfig.filters.find((f) => f.key === "tab");
        const allResults = await fallbackSearch({
          q: "",
          sources: newConfig.sources,
          contentType: ctFilter ? (ctFilter.value as number) : undefined,
          tab: tabFilter ? (tabFilter.value as string) : undefined,
        });
        const fc: SourceCounts = { box3: 0, dao3: 0, "box3-search": 0 };
        for (const r of allResults) fc[r.source as keyof SourceCounts]++;
        onResults(allResults.slice(0, pageSize), "", allResults.length, fc, 1);
      } catch {
        onResults([], "", 0, emptyCounts, 1);
      }
    }
    onLoadingChange(false);
  }, [normalizedConfig, onConfigChange, onLoadingChange, onResults, buildApiParams, pageSize]);

  const activeContentTab = useMemo(() => {
    const ctFilter = normalizedConfig.filters.find((f) => f.key === "contentType");
    if (!ctFilter) return "all";
    if (ctFilter.value === 1) return "map";
    if (ctFilter.value === 2) return "model";
    if (ctFilter.value === 3) return "music";
    return "all";
  }, [normalizedConfig.filters]);

  const activeTabFilter = normalizedConfig.filters.find((f) => f.key === "tab")?.value;

  return (
    <div style={{ maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
      <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 4, gap: 0, paddingLeft: 6, paddingRight: 6 }}>
        {CONTENT_TABS.map((tab) => (
          <TrapezoidTab key={tab.key} label={tab.label} active={activeContentTab === tab.key} onClick={() => handleContentTab(tab.key)} />
        ))}
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        background: "var(--color-surface-elevated)",
        border: `1px solid ${focused ? "var(--color-accent)" : "var(--color-border-light)"}`,
        borderRadius: "var(--radius-lg)",
        transition: "border-color 0.25s var(--ease-out), box-shadow 0.3s var(--ease-out), background 0.3s var(--ease-out)",
        boxShadow: focused ? "0 0 0 3px var(--color-accent-bg)" : "none",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="搜索..."
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13, color: "var(--color-text)", minWidth: 0 }}
          autoComplete="off"
        />
        {query && (
          <button onMouseDown={(e) => e.preventDefault()} onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, background: "transparent", border: "none", cursor: "pointer", color: "var(--color-text-tertiary)", flexShrink: 0 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        )}
        <button
          onClick={() => setShowConfig(!showConfig)}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, background: "transparent", border: "none", cursor: "pointer", color: showConfig ? "var(--color-accent)" : "var(--color-text-tertiary)", flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
        <button onClick={() => doSearch()}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, background: "var(--color-accent)", border: "none", cursor: "pointer", color: "#fff", borderRadius: "var(--radius-sm)", flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateRows: showConfig ? "1fr" : "0fr",
        transition: "grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{
            padding: "10px 14px",
            marginTop: 6,
            background: "var(--color-surface-elevated)",
            border: "1px solid var(--color-border-light)",
            borderRadius: "var(--radius-md)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-tertiary)" }}>数据源</span>
              {(["box3", "dao3", "box3-search"] as const).map((s) => {
                const label = s === "box3" ? "Box3" : s === "dao3" ? "Dao3" : "搜索";
                const active = normalizedConfig.sources.includes(s);
                return (
                  <button key={s} onClick={() => toggleSource(s)} style={{
                    padding: "2px 8px", fontSize: 10, fontWeight: active ? 600 : 400,
                    borderRadius: "var(--radius-sm)", border: "none",
                    background: active ? "var(--color-accent-bg)" : "transparent",
                    color: active ? "var(--color-accent)" : "var(--color-text-tertiary)",
                    cursor: "pointer",
                  }}>{label}</button>
                );
              })}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-tertiary)" }}>字段</span>
              {visibleFields.map(([field, label]) => {
                const active = normalizedConfig.fields.includes(field);
                return (
                  <button key={field} onClick={() => toggleField(field)} style={{
                    padding: "2px 8px", fontSize: 10, fontWeight: active ? 600 : 400,
                    borderRadius: "var(--radius-sm)", border: "none",
                    background: active ? "var(--color-accent-bg)" : "transparent",
                    color: active ? "var(--color-accent)" : "var(--color-text-tertiary)",
                    cursor: "pointer",
                  }}>{label}</button>
                );
              })}
            </div>
            {normalizedConfig.sources.includes("dao3") && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-tertiary)" }}>分类</span>
                {DAO3_TABS.map((tab) => (
                  <button key={tab.tabKey} onClick={() => toggleFilter({ key: "tab", value: tab.tabKey })} style={{
                    padding: "2px 8px", fontSize: 10, fontWeight: activeTabFilter === tab.tabKey ? 600 : 400,
                    borderRadius: "var(--radius-sm)", border: "none",
                    background: activeTabFilter === tab.tabKey ? "var(--color-accent-bg)" : "transparent",
                    color: activeTabFilter === tab.tabKey ? "var(--color-accent)" : "var(--color-text-tertiary)",
                    cursor: "pointer",
                  }}>{tab.tabName}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

const SearchBar = SearchBarInner;
export default SearchBar;
