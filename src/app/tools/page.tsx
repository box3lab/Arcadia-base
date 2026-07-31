"use client";

import PageLayout from "../../components/PageLayout";

const TOOLS = [
  {
    href: "/tools/box3-export",
    icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3",
    title: "Box3 地图导出",
    desc: "输入 Hash 一键导出 Box3 地图，支持体素/资源/脚本/JSON",
  },
  {
    href: "/tools/dao3-export",
    icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    title: "Dao3 地图导出",
    desc: "通过用户 ID 导出 Dao3 地图，支持建筑/代码/音频/图片/数据空间",
  },
  {
    href: "/tools/vb-convert",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    title: "VB 格式转换",
    desc: "VBProject 体素模型转换为 .vox / .obj / .stl / .glb",
  },
];

export default function ToolsPage() {
  return (
    <PageLayout breadcrumb="工具">
      <main style={{ flex: "1 1 0%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingLeft: 24, paddingRight: 24, paddingBottom: 40 }}>
        <div className="animate-slide-up" style={{ textAlign: "center", maxWidth: 480, width: "100%" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.03em" }}>工具箱</h1>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 8, lineHeight: 1.6 }}>格式转换与数据处理工具</p>
        </div>

        <div className="animate-slide-up" style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10, maxWidth: 480, width: "100%", animationDelay: "0.05s" }}>
          {TOOLS.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="glass-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 20px",
                borderRadius: "var(--radius-lg)",
                textDecoration: "none",
                transition: "border-color 0.15s, box-shadow 0.15s, transform 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--glass-border-hover)";
                e.currentTarget.style.boxShadow = "var(--shadow-card-hover), 0 0 16px var(--glow-accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "var(--glass-bg-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--glass-border)";
                e.currentTarget.style.boxShadow = "var(--shadow-card)";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.background = "var(--glass-bg)";
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "var(--color-accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={t.icon} />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)" }}>{t.title}</span>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 3, lineHeight: 1.5 }}>{t.desc}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          ))}
        </div>
      </main>
    </PageLayout>
  );
}
