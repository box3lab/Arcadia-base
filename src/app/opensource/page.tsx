"use client";

import React, { useState, useEffect, useCallback } from "react";
import PageLayout from "../../components/PageLayout";
import { API_BASE, signedFetch } from "../../lib/api";

interface AuthorInfo {
  userId: string;
  nickname: string;
  joinedAt: string;
}

export default function OpenSourcePage() {
  const [authors, setAuthors] = useState<AuthorInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [optedIn, setOptedIn] = useState(false);
  const [masterKey, setMasterKey] = useState("");
  const [activeTab, setActiveTab] = useState<"about" | "login" | "admin">("about");
  const [autoLoginTried, setAutoLoginTried] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      try {
        const localToken = localStorage.getItem("AUTHORIZATION");
        if (localToken && !loggedIn) {
          setToken(localToken);
          setLoggedIn(true);
          setActiveTab("login");
        }
      } catch {}
    };
    checkToken();
    setAutoLoginTried(true);
    const interval = setInterval(checkToken, 1000);
    return () => clearInterval(interval);
  }, [loggedIn]);

  useEffect(() => {
    signedFetch(API_BASE + "/opensource?action=list")
      .then(r => r.json())
      .then(d => { if (d.code === 200) setAuthors(d.authors || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const verifyToken = useCallback(async () => {
    if (!token) return;
    let userId = "";
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.sub || payload.userId || payload.uid || "";
    } catch {}
    if (!userId) { setUserInfo({ nickname: "令牌无效", id: "" }); return; }
    try {
      const resp = await signedFetch(API_BASE + `/dao3-user-experience?userId=${userId}&type=id`, {
        headers: { Authorization: token },
      });
      const data = await resp.json();
      if (data.code === 200 && data.data?.results?.[0]) {
        setUserInfo({ ...data.data.results[0], id: userId });
      } else {
        setUserInfo({ nickname: "用户 #" + userId, id: userId });
      }
    } catch {
      setUserInfo({ nickname: "用户 #" + userId, id: userId });
    }
  }, [token]);

  useEffect(() => {
    if (loggedIn && token) verifyToken();
  }, [loggedIn, token, verifyToken]);

  const handleOptIn = useCallback(async () => {
    if (!userInfo?.id) { setOptedIn(true); return; }
    try {
      await signedFetch(API_BASE + "/opensource?action=join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: String(userInfo.id), nickname: userInfo.nickname || "用户" }),
      });
    } catch {}
    setOptedIn(true);
  }, [userInfo]);

  const labelStyle = { fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 10 };

  return (
    <PageLayout breadcrumb="开源参与计划">
      <main style={{ flex: "1 1 0%", paddingTop: 24, paddingBottom: 40 }}>
        <div style={{ width: "100%", maxWidth: 600, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24 }}>

          <div className="animate-slide-up" style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 40, borderRadius: "var(--radius-lg)",
              background: "var(--color-accent-bg)", marginBottom: 10,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.02em" }}>地图开源参与计划</h2>
            <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 3, lineHeight: 1.5 }}>创作者自愿公开地图资源，共建开放生态</p>
          </div>

          <div style={{ display: "flex", gap: 2, marginBottom: 16, background: "var(--color-base)", borderRadius: "var(--radius-sm)", padding: 2 }} className="animate-slide-up">
            {([["about", "计划说明"], ["login", "参与登录"], ["admin", "管理"]] as const).map(([val, label]) => (
              <button key={val} onClick={() => setActiveTab(val)} style={{
                flex: 1, padding: "6px 0", fontSize: 11, borderRadius: 2, border: "none", cursor: "pointer",
                background: activeTab === val ? "var(--color-surface-elevated)" : "transparent",
                color: activeTab === val ? "var(--color-text)" : "var(--color-text-tertiary)",
                fontWeight: activeTab === val ? 600 : 400,
                boxShadow: activeTab === val ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.15s",
              }}>{label}</button>
            ))}
          </div>

          {activeTab === "about" && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="panel-card">
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                  地图开源参与计划旨在让 Dao3 创作者<strong style={{ color: "var(--color-text)" }}>自愿</strong>将其地图资源向公众开放导出。参与后，您的所有地图将可通过本平台导出建筑、脚本、音频、图片等完整数据。
                </p>
                <div style={{ height: 1, background: "var(--divider-color)", margin: "10px 0" }} />
                <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", lineHeight: 1.6 }}>
                  参与完全自愿，可随时联系管理员退出。导出内容仅供学习与研究。
                </p>
              </div>

              <div className="panel-card">
                <div style={labelStyle}>已参与创作者</div>
                {loading ? (
                  <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>加载中...</div>
                ) : authors.length === 0 ? (
                  <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>暂无</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {authors.map(a => (
                      <div key={a.userId} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "8px 10px", borderRadius: "var(--radius-md)", background: "var(--color-base)",
                      }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: "50%",
                          background: "var(--color-accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-accent)" }}>{a.nickname.charAt(0)}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text)" }}>{a.nickname}</div>
                          <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 1 }}>ID: {a.userId}</div>
                        </div>
                        <div style={{
                          padding: "2px 6px", borderRadius: "var(--radius-sm)",
                          background: "var(--color-success-bg)", fontSize: 9, fontWeight: 500,
                          color: "var(--color-success)",
                        }}>已开源</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="panel-card">
                <div style={labelStyle}>如何参与</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { step: 1, text: "在 dao3.fun 登录您的账户" },
                    { step: 2, text: "访问本页面，系统将自动识别登录状态" },
                    { step: 3, text: "确认参与开源计划" },
                  ].map(s => (
                    <div key={s.step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        background: "var(--color-accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: "var(--color-accent)" }}>{s.step}</span>
                      </div>
                      <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "login" && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {!loggedIn ? (
                <div className="panel-card" style={{ textAlign: "center", padding: 24 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 10px", opacity: 0.5 }}>
                    <circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
                  </svg>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)", marginBottom: 4 }}>未检测到登录状态</div>
                  <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", lineHeight: 1.5, marginBottom: 12 }}>
                    请先在 dao3.fun 登录，然后刷新本页面。系统将自动识别您的登录状态。
                  </p>
                  <button
                    onClick={() => { window.location.href = "/auth/login?redirect=/opensource"; }}
                    style={{
                      padding: "8px 20px", fontSize: 12, fontWeight: 500,
                      borderRadius: "var(--radius-md)", border: "none", cursor: "pointer",
                      background: "var(--color-accent)", color: "white",
                    }}
                  >前往神岛授权</button>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <div className="panel-card" style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: "var(--color-accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: "var(--color-accent)" }}>
                          {(userInfo?.nickname || "?").charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)" }}>
                          {userInfo?.nickname || "已登录用户"}
                        </div>
                        <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 1 }}>
                          {userInfo?.id ? `ID: ${userInfo.id}` : "令牌已验证"}
                        </div>
                      </div>
                    </div>

                    {!optedIn ? (
                      <>
                        <div style={{
                          padding: "10px 12px", borderRadius: "var(--radius-md)",
                          background: "var(--color-accent-bg)", border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)",
                          marginBottom: 12,
                        }}>
                          <p style={{ fontSize: 12, color: "var(--color-text)", lineHeight: 1.6 }}>
                            确认参与后，您的所有 Dao3 地图将允许被导出。此操作不可自行撤销，如需退出请联系管理员。
                          </p>
                        </div>
                        <button
                          onClick={handleOptIn}
                          style={{
                            width: "100%", padding: "10px 0", fontSize: 13, fontWeight: 600,
                            borderRadius: "var(--radius-lg)", border: "none", cursor: "pointer",
                            background: "var(--color-accent)", color: "white",
                          }}
                        >确认参与开源计划</button>
                      </>
                    ) : (
                      <div style={{
                        padding: "16px 12px", borderRadius: "var(--radius-md)",
                        background: "var(--color-success-bg)", border: "1px solid color-mix(in srgb, var(--color-success) 30%, transparent)",
                        textAlign: "center",
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 6px" }}>
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-success)", marginBottom: 4 }}>感谢您参与开源计划!</div>
                        <p style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                          您的地图资源现已开放导出。感谢您为社区做出的贡献。
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => { setLoggedIn(false); setToken(""); setUserInfo(null); setOptedIn(false); try { localStorage.removeItem("AUTHORIZATION"); } catch {} }}
                    style={{
                      width: "100%", padding: "7px 0", fontSize: 11,
                      borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)",
                      background: "var(--color-surface-elevated)", color: "var(--color-text-tertiary)", cursor: "pointer",
                    }}
                  >退出登录</button>
                </div>
              )}
            </div>
          )}

          {activeTab === "admin" && (
            <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="panel-card">
                <div style={labelStyle}>管理面板</div>
                <input
                  type="password"
                  value={masterKey}
                  onChange={e => setMasterKey(e.target.value)}
                  placeholder="输入管理密钥..."
                  style={{
                    width: "100%", padding: "7px 10px", fontSize: 12,
                    borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)",
                    background: "var(--color-base)", color: "var(--color-text)", outline: "none",
                  }}
                />
              </div>
              {masterKey && <ParticipantList adminKey={masterKey} />}
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
}

function ParticipantList({ adminKey }: { adminKey: string }) {
  const [participants, setParticipants] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    signedFetch(API_BASE + "/opensource?action=participants", { headers: { "X-Admin-Key": adminKey } })

      .then(r => r.json())
      .then(d => { if (d.code === 200) setParticipants(d.participants || {}); else setError(d.error || "加载失败"); })
      .catch(() => setError("网络错误"))
      .finally(() => setLoading(false));
  }, [adminKey]);

  if (loading) return <div className="panel-card" style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>加载中...</div>;
  if (error) return <div className="panel-card" style={{ fontSize: 11, color: "var(--color-error)" }}>{error}</div>;

  const entries = Object.entries(participants);
  if (!entries.length) return <div className="panel-card" style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>暂无参与者</div>;

  return (
    <div className="panel-card">
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
        参与者列表 ({entries.length})
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {entries.map(([userId, info]: [string, any]) => (
          <div key={userId} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 8px", borderRadius: "var(--radius-md)", background: "var(--color-base)", fontSize: 11,
          }}>
            <span style={{ fontWeight: 500, color: "var(--color-text)" }}>{info.nickname || userId}</span>
            <span style={{ color: "var(--color-text-tertiary)" }}>ID: {userId}</span>
            <span style={{ marginLeft: "auto", color: "var(--color-text-tertiary)", fontSize: 9 }}>
              {info.joinedAt ? new Date(info.joinedAt).toLocaleDateString() : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
