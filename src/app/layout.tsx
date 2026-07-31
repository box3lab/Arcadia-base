import type { Metadata, Viewport } from "next";
import "./globals.css";
import AntiAutomationProvider from "../components/AntiAutomationProvider";

export const metadata: Metadata = {
  title: "神岛数据库 - ArcadiaBase",
  description: "Box3 地图检索与导出工具，纯前端运行，数据不经过任何服务器",
  icons: { icon: "/MainIcon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f5f5f7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("arcadia-theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(){}})()` }} />
      </head>
      <body>
        <AntiAutomationProvider>{children}</AntiAutomationProvider>
      </body>
    </html>
  );
}
