"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import PageLayout from "../../../components/PageLayout";
import LoadingCube from "../../../components/LoadingCube";
import { API_BASE, signedFetch, blockImageUrl } from "../../../lib/api";

interface UserResult {
  id: number;
  n: string;
  a: string;
  g: string | null;
  intro: string;
}

function UserDetailModal({ user, onClose }: { user: UserResult; onClose: () => void }) {
  const [profile, setProfile] = useState<any>(null);
  const [maps, setMaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      signedFetch(API_BASE + `/dao3-user-profile?userId=${user.id}`)
        .then(r => r.json()).then(d => d.code === 200 ? d.data : null).catch(() => null),
      signedFetch(API_BASE + `/dao3-user-experience?userId=${user.id}&limit=50`)
        .then(r => r.json()).then(d => d.data?.rows || []).catch(() => []),
    ]).then(([p, m]) => {
      setProfile(p);
      setMaps(m);
      setLoading(false);
    });
  }, [user.id]);

  const genderLabel = (g: string | null) => {
    if (g === "male" || g === "1") return "男";
    if (g === "female" || g === "2") return "女";
    return "未知";
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 400, borderRadius: "var(--radius-lg)",
        padding: 24, position: "relative",
        background: "var(--color-surface-elevated)", border: "1px solid var(--color-border-light)",
        animation: "slideUp 0.25s ease-out",
        boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 12, right: 12,
          background: "none", border: "none", cursor: "pointer",
          color: "var(--color-text-tertiary)", padding: 4,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          {(profile?.avatar || user.a) ? (
            <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
              <img src={blockImageUrl(profile?.avatar || user.a)} alt="" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", background: "var(--color-border-light)", position: "absolute", top: 2, left: 2 }} />
              {profile?.avatarFrame && <img src={blockImageUrl(profile.avatarFrame)} alt="" style={{ position: "absolute", top: 0, left: 0, width: 52, height: 52, pointerEvents: "none" }} />}
            </div>
          ) : (
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--color-accent-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: "var(--color-accent)" }}>{(profile?.nickname || user.n || "?").charAt(0)}</span>
            </div>
          )}
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)" }}>{profile?.nickname || user.n || "未命名"}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>ID: {profile?.userId || user.id}</div>
            {profile?.followerNum != null && (
              <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2, verticalAlign: -1 }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {profile.followerNum} 粉丝
              </div>
            )}
          </div>
        </div>

        {profile?.introduction && (
          <div style={{ padding: "8px 12px", borderRadius: "var(--radius-md)", background: "var(--color-base)", marginBottom: 10, fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
            {profile.introduction}
          </div>
        )}

        {maps.length > 0 && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
              地图 ({maps.length})
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, maxHeight: 200, overflowY: "auto" }}>
              {maps.slice(0, 20).map((m: any) => (
                <div key={m.contentId} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", borderRadius: "var(--radius-sm)", background: "var(--color-base)", fontSize: 11 }}>
                  {m.preview && <img src={m.preview} alt="" style={{ width: 24, height: 14, borderRadius: 2, objectFit: "cover", flexShrink: 0 }} />}
                  <span style={{ flex: 1, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name}</span>
                  <span style={{ color: "var(--color-text-tertiary)", fontSize: 9, flexShrink: 0 }}>{(m.playCount || 0).toLocaleString()} 播放</span>
                </div>
              ))}
              {maps.length > 20 && <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", padding: "4px 8px" }}>...还有 {maps.length - 20} 个</div>}
            </div>
          </div>
        )}

        {loading && (
          <div style={{ padding: 12, textAlign: "center" }}>
            <LoadingCube size={14} />
          </div>
        )}

        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
          <a href={`https://dao3.fun/profile/${user.id}`} target="_blank" rel="noopener noreferrer" style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "8px 0", borderRadius: "var(--radius-md)", fontSize: 12, fontWeight: 500,
            background: "var(--color-accent-bg)", color: "var(--color-accent)",
            textDecoration: "none", transition: "background 0.15s",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Dao3 主页
          </a>
        </div>

        <style>{`
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    </div>
  );
}

export default function UserSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [searchType, setSearchType] = useState<"auto" | "id" | "name">("auto");
  const [selectedUser, setSelectedUser] = useState<UserResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    fetch("/data/user-id-map.json")
      .then(r => r.json())
      .then(data => {
        const total = data.reduce((sum: number, s: { count: number }) => sum + s.count, 0);
        setTotalUsers(total);
      })
      .catch(() => {});
  }, []);

  const doSearch = useCallback(async (q: string, type: string) => {
    if (!q.trim()) { setResults([]); setError(""); return; }
    setLoading(true); setError("");
    try {
      const resp = await signedFetch(API_BASE + `/user-search?q=${encodeURIComponent(q.trim())}&type=${type}&limit=30`);
      const data = await resp.json();
      if (data.code === 200) {
        setResults(data.data.results || []);
        if (!data.data.results?.length) setError("未找到匹配的用户");
      } else { setError(data.msg || "搜索失败"); }
    } catch { setError("网络错误"); }
    finally { setLoading(false); }
  }, []);

  const handleInput = useCallback((val: string) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val, searchType), 300);
  }, [doSearch, searchType]);

  const handleTypeChange = useCallback((type: "auto" | "id" | "name") => {
    setSearchType(type);
    if (query.trim()) doSearch(query, type);
  }, [query, doSearch]);

  return (
    <PageLayout breadcrumb="用户搜索">
      <main style={{ flex: "1 1 0%", paddingTop: 24, paddingBottom: 40 }}>
        <div style={{ width: "100%", maxWidth: 672, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24 }}>

          <div className="animate-slide-up" style={{ textAlign: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.02em" }}>用户搜索</h2>
            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4, lineHeight: 1.6 }}>搜索 Dao3 用户，查看资料与地图</p>
          </div>

          <div className="panel-card animate-slide-up" style={{ marginBottom: 12, padding: 14 }}>
            <div style={{ position: "relative" }}>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => handleInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") doSearch(query, searchType); }}
                placeholder="输入昵称或用户 ID..."
                style={{
                  width: "100%", padding: "10px 14px 10px 36px", fontSize: 13,
                  borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)",
                  background: "var(--color-base)", color: "var(--color-text)",
                  outline: "none", transition: "border-color 0.15s, box-shadow 0.15s",
                }}
                onFocus={e => { e.target.style.borderColor = "var(--color-accent)"; e.target.style.boxShadow = "0 0 0 3px var(--color-accent-bg)"; }}
                onBlur={e => { e.target.style.borderColor = "var(--color-border-light)"; e.target.style.boxShadow = "none"; }}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              {loading && (
                <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
                  <div style={{ width: 14, height: 14, border: "2px solid var(--color-border-light)", borderTopColor: "var(--color-accent)", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 2, marginTop: 10, background: "var(--color-base)", borderRadius: "var(--radius-sm)", padding: 2 }}>
              {([["auto", "自动"], ["id", "ID"], ["name", "昵称"]] as const).map(([val, label]) => (
                <button key={val} onClick={() => handleTypeChange(val)} style={{
                  flex: 1, padding: "5px 0", fontSize: 11, borderRadius: 2, border: "none", cursor: "pointer",
                  background: searchType === val ? "var(--color-surface-elevated)" : "transparent",
                  color: searchType === val ? "var(--color-text)" : "var(--color-text-tertiary)",
                  fontWeight: searchType === val ? 600 : 400,
                  boxShadow: searchType === val ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.15s",
                }}>{label}</button>
              ))}
            </div>

            {totalUsers !== null && (
              <div style={{ marginTop: 8, fontSize: 10, color: "var(--color-text-tertiary)", textAlign: "center" }}>
                共 {totalUsers.toLocaleString()} 个用户
              </div>
            )}
          </div>

          {error && (
            <div style={{ padding: "10px 14px", borderRadius: "var(--radius-md)", background: "var(--color-error-bg)", color: "var(--color-error)", fontSize: 12, textAlign: "center" }}>
              {error}
            </div>
          )}

          {results.length > 0 && (
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginBottom: 2, paddingLeft: 2 }}>
                找到 {results.length} 个结果
              </div>
              {results.map(user => {
                const genderColor = user.g === "male" || user.g === "1" ? "#60a5fa" : user.g === "female" || user.g === "2" ? "#f472b6" : null;
                return (
                  <div key={user.id} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 14px", borderRadius: "var(--radius-md)",
                    background: "var(--color-surface-elevated)", border: "1px solid var(--color-border-light)",
                    cursor: "pointer", transition: "border-color 0.15s, box-shadow 0.15s",
                  }}
                    onClick={() => setSelectedUser(user)}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-border-light)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {user.a ? (
                      <img src={blockImageUrl(user.a)} alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0, background: "var(--color-border-light)" }} />
                    ) : (
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--color-accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-accent)" }}>{(user.n || "?").charAt(0)}</span>
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {user.n || "未命名"}
                        </span>
                        {genderColor && <span style={{ fontSize: 11, color: genderColor }}>{user.g === "male" || user.g === "1" ? "♂" : "♀"}</span>}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 1 }}>ID: {user.id}</div>
                      {user.intro && (
                        <div style={{ fontSize: 10, color: "var(--color-text-secondary)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {user.intro}
                        </div>
                      )}
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                );
              })}
            </div>
          )}

          {selectedUser && <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
      </main>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </PageLayout>
  );
}
