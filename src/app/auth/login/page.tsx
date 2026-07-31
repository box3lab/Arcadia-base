"use client";

import { useEffect, useState } from "react";
import PageLayout from "../../../components/PageLayout";

export default function AuthLoginPage() {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scope = params.get("scope") || "user:all";
    const redirectTo = params.get("redirect") || "/opensource";
    const uuid = crypto.randomUUID();
    const state = encodeURIComponent(JSON.stringify({ uuid, redirect: redirectTo }));
    const redirectUri = `${window.location.origin}/auth/callback`;
    const authUrl = `https://dao3.fun/oauth2.0?response_type=code&client_id=box3lab&scope=${encodeURIComponent(scope)}&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    setRedirecting(true);
    window.location.href = authUrl;
  }, []);

  return (
    <PageLayout breadcrumb="登录">
      <main style={{ flex: "1 1 0%", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
        <div style={{ textAlign: "center" }}>
          {redirecting ? (
            <>
              <div style={{ width: 32, height: 32, border: "3px solid var(--color-border-light)", borderTopColor: "var(--color-accent)", borderRadius: "50%", animation: "spin 0.6s linear infinite", margin: "0 auto 16px" }} />
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>正在跳转到神岛授权...</p>
            </>
          ) : (
            <p style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>准备登录...</p>
          )}
        </div>
      </main>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </PageLayout>
  );
}