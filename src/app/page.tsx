"use client";

import PageLayout from "../components/PageLayout";

const SECTIONS = [
  { href: "/search", icon: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z", title: "资源搜索", desc: "Box3 与 Dao3 地图、模型、音乐资源检索" },
  { href: "/search/users", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0", title: "用户搜索", desc: "搜索 Dao3 用户，查看资料与地图" },
  { href: "/opensource", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "开源参与计划", desc: "创作者自愿公开地图资源，共建开放生态" },
  { href: "/box3", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", title: "Box3 历史推荐", desc: "神奇代码岛官方推荐内容存档" },
  { href: "/tools", icon: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z", title: "工具箱", desc: "地图导出、VB 格式转换与数据处理" },
  { href: "/api-docs", icon: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", title: "开放平台", desc: "RESTful API 接入文档" },
  { href: "https://dao4.fun", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", title: "涅亚计划", desc: "NEA-Project" },
];

export default function HomePage() {
  return (
    <PageLayout>
      <main style={{ flex: "1 1 0%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingLeft: 24, paddingRight: 24, paddingBottom: 40 }}>
        <div className="animate-slide-up" style={{ textAlign: "center", maxWidth: 440, width: "100%" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.03em", lineHeight: 1.2 }}>神岛数据库</h1>
          <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 5, lineHeight: 1.5, letterSpacing: "0.02em" }}>Box3 &amp; Dao3 资源检索与导出平台</p>
        </div>

        <div className="animate-slide-up" style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 4, maxWidth: 440, width: "100%", animationDelay: "0.05s" }}>
          {SECTIONS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="glass-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: "var(--radius-lg)",
                textDecoration: "none",
                transition: "border-color 0.2s var(--ease-out), box-shadow 0.25s var(--ease-out), transform 0.15s var(--ease-out), background 0.2s var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--glass-border-hover)";
                e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.background = "var(--glass-bg-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--glass-border)";
                e.currentTarget.style.boxShadow = "var(--shadow-card)";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.background = "var(--glass-bg)";
              }}
            >
              <div style={{ width: 30, height: 30, borderRadius: "var(--radius-md)", background: "var(--color-accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)" }}>{s.title}</span>
                <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 1, lineHeight: 1.4 }}>{s.desc}</p>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.35 }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          ))}
        </div>
      </main>
    </PageLayout>
  );
}
