"use client";

import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

const THEME_KEY = "arcadia-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  return "light";
}

type PageLayoutProps = {
  children: ReactNode;
  breadcrumb?: string;
  navActions?: ReactNode;
};

export default function PageLayout({ children, breadcrumb, navActions }: PageLayoutProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem(THEME_KEY, next); } catch {}
      return next;
    });
  }, []);

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", position: "relative" }}>

      <nav className="glass-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div style={{ paddingLeft: 20, paddingRight: 20, height: 48, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none" }}>
              <img src="/MainIcon.svg" alt="" style={{ width: 22, height: 22 }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.01em" }}>神岛数据库</span>
              <span style={{ fontSize: 9, color: "var(--color-text-tertiary)", marginLeft: 1, fontWeight: 500 }}>ArcadiaBase</span>
            </a>
            {breadcrumb && (
              <>
                <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", opacity: 0.5 }}>/</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text)" }}>{breadcrumb}</span>
              </>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {navActions}
            <button
              onClick={toggleTheme}
              aria-label={theme === "light" ? "切换到暗色模式" : "切换到亮色模式"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--glass-border)",
                background: "var(--glass-bg)",
                color: "var(--color-text-secondary)",
                cursor: "pointer",
                transition: "background 0.25s var(--ease-out), border-color 0.25s var(--ease-out), transform 0.2s var(--ease-out)",
                padding: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--glass-border-hover)";
                e.currentTarget.style.background = "var(--glass-bg-hover)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--glass-border)";
                e.currentTarget.style.background = "var(--glass-bg)";
                e.currentTarget.style.transform = "none";
              }}
            >
              {theme === "light" ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1, flex: "1 1 0%", display: "flex", flexDirection: "column", paddingTop: 48 }}>
        {children}
      </div>

      <footer className="glass-footer" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ paddingTop: 8, paddingBottom: 8, textAlign: "center" }}>
          <span style={{ fontSize: 9, color: "var(--color-text-tertiary)", opacity: 0.6 }}>ArcadiaBase &copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
