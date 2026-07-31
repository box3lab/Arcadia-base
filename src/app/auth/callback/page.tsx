"use client";

import { useEffect, useState } from "react";
import PageLayout from "../../../components/PageLayout";

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [errorMsg, setErrorMsg] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");
    const stateStr = params.get("state");

    if (error) {
      sessionStorage.setItem("oauth_error", error);
      setStatus("error");
      setErrorMsg(error === "access_denied" ? "用户取消了授权" : `授权失败: ${error}`);
      return;
    }

    if (!code) {
      setStatus("error");
      setErrorMsg("未收到授权码");
      return;
    }

    let redirect = "/opensource";
    try {
      const state = JSON.parse(decodeURIComponent(stateStr || "{}"));
      if (state.redirect) redirect = state.redirect;
    } catch {}

    const redirectUri = `${window.location.origin}/auth/callback`;

    fetch("/api/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, redirect_uri: redirectUri }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.code === 200 && data.access_token) {
          localStorage.setItem("AUTHORIZATION", data.access_token);
          setStatus("success");
          try {
            const payload = JSON.parse(atob(data.access_token.split(".")[1]));
            setNickname(payload.nickname || "");
          } catch {}
          setTimeout(() => { window.location.href = redirect; }, 1500);
        } else {
          setStatus("error");
          setErrorMsg(data.error || "Token 交换失败");
        }
      })
      .catch(e => {
        setStatus("error");
        setErrorMsg("网络错误: " + e.message);
      });
  }, []);

  return (
    <PageLayout breadcrumb="授权回调">
      <main style={{ flex: "1 1 0%", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          {status === "processing" && (
            <>
              <div style={{ width: 32, height: 32, border: "3px solid var(--color-border-light)", borderTopColor: "var(--color-accent)", borderRadius: "50%", animation: "spin 0.6s linear infinite", margin: "0 auto 16px" }} />
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>正在完成授权...</p>
            </>
          )}
          {status === "success" && (
            <>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 12px" }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 &lt;11.01"/>
              </svg>
              <p style={{ fontSize: 15, fontWeight: 600, color: "var(--color-success)", marginBottom: 4 }}>授权成功!</p>
              {nickname && <p style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>欢迎, {nickname}</p>}
              <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 8 }}>正在跳转...</p>
            </>
          )}
          {status === "error" && (
            <>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 12px" }}>
                <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              <p style={{ fontSize: 15, fontWeight: 600, color: "var(--color-error)", marginBottom: 4 }}>授权失败</p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{errorMsg}</p>
              <a href="/auth/login" style={{ display: "inline-block", marginTop: 16, padding: "8px 20px", fontSize: 12, borderRadius: "var(--radius-md)", background: "var(--color-accent)", color: "white", textDecoration: "none" }}>重新登录</a>
            </>
          )}
        </div>
      </main>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </PageLayout>
  );
}