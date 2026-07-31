"use client";

import PageLayout from "../../components/PageLayout";

const BASE = "https://arcadia-base.pages.dev";

interface ParamDef {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  desc: string;
}

interface FieldDef {
  name: string;
  type: string;
  desc: string;
}

interface EndpointDef {
  method: string;
  path: string;
  desc: string;
  params: ParamDef[];
  responseFields: FieldDef[];
  response: string;
  curlExample: string;
  urlExample: string;
  errors: { code: string; status: number; desc: string }[];
}

const ENDPOINTS: EndpointDef[] = [
  {
    method: "GET",
    path: "/api/search",
    desc: "跨数据源统一检索。支持 Box3、Dao3、Box3 搜索三个数据源，返回分页结果及各数据源命中数。搜索为大小写不敏感的子串匹配。",
    params: [
      { name: "q", type: "string", desc: "搜索关键词，为空时返回全部条目。匹配名称、作者、Hash、内容ID等字段" },
      { name: "sources", type: "string", default: "box3,dao3,box3-search", desc: "数据源，逗号分隔。可选值：box3 / dao3 / box3-search" },
      { name: "contentType", type: "integer", desc: "内容类型筛选。1 = 地图，2 = 模型，3 = 音乐。不传则不过滤" },
      { name: "tab", type: "string", desc: "Dao3 分类筛选键，如 mapParkour、mapSurvival。仅对 dao3 数据源生效" },
      { name: "page", type: "integer", default: "1", desc: "页码，从 1 开始" },
      { name: "limit", type: "integer", default: "20", desc: "每页返回条数，范围 1 ~ 10000" },
    ],
    responseFields: [
      { name: "results", type: "array", desc: "当前页结果列表，每项包含 source 和 data 字段" },
      { name: "results[].source", type: "string", desc: '数据源标识："box3" | "dao3" | "box3-search"' },
      { name: "results[].data", type: "object", desc: "该条目的完整数据对象，结构因 source 不同而异（见数据模型）" },
      { name: "total", type: "integer", desc: "符合条件的结果总数（跨所有页）" },
      { name: "counts", type: "object", desc: '各数据源命中数，如 { "box3": 212, "dao3": 6729, "box3-search": 18015 }' },
      { name: "page", type: "integer", desc: "当前页码" },
      { name: "limit", type: "integer", desc: "每页条数" },
    ],
    response: `{
  "results": [
    {
      "source": "box3",
      "data": {
        "n": "ParkourAdventure",
        "a": "User001",
        "h": "QmX1Y2Z3W4R5T6...",
        "ai": 12345,
        "d": "A parkour map with 10 stages"
      }
    },
    {
      "source": "dao3",
      "data": {
        "contentId": 67890,
        "name": "SurvivalIsland",
        "author": { "nickname": "BuilderX", "userId": 111 },
        "tab": { "tabKey": "mapSurvival", "tabName": "生存" },
        "playCount": 5000
      }
    }
  ],
  "total": 42,
  "counts": { "box3": 10, "dao3": 12, "box3-search": 20 },
  "page": 1,
  "limit": 20
}`,
    curlExample: `curl "${BASE}/api/search?q=Parkour&sources=box3,dao3&contentType=1&limit=5"`,
    urlExample: `${BASE}/api/search?q=Parkour&sources=box3,dao3&contentType=1&limit=5`,
    errors: [
      { code: "database_load_failed", status: 500, desc: "服务端数据库加载失败，请稍后重试" },
    ],
  },
  {
    method: "GET",
    path: "/api/recommend",
    desc: "获取 Box3 历史推荐内容。数据来源于 Box3 停运前的官方推荐列表，按内容类型分组返回。",
    params: [
      { name: "type", type: "integer", default: "1", desc: "内容类型：1 = 地图，2 = 模型，3 = 音乐" },
    ],
    responseFields: [
      { name: "items", type: "array", desc: "推荐内容列表" },
      { name: "items[].contentId", type: "integer", desc: "内容 ID" },
      { name: "items[].name", type: "string", desc: "内容名称" },
      { name: "items[].authorName", type: "string", desc: "作者昵称" },
      { name: "items[].authorAvatar", type: "string", desc: "作者头像 IPFS Hash" },
      { name: "items[].type", type: "integer", desc: "内容类型：1=地图 2=模型 3=音乐" },
      { name: "items[].image", type: "string", desc: "封面图 IPFS Hash" },
      { name: "items[].hash", type: "string", desc: "内容数据 Hash" },
      { name: "items[].audioHash", type: "string", desc: "音频 Hash（音乐类型）" },
      { name: "items[].duration", type: "integer", desc: "时长（毫秒，音乐类型）" },
      { name: "items[].viewCount", type: "integer", desc: "浏览数" },
      { name: "items[].playCount", type: "integer", desc: "游玩数（地图类型）" },
      { name: "items[].commentCount", type: "integer", desc: "评论数" },
      { name: "items[].describe", type: "string", desc: "描述" },
      { name: "items[].createdAt", type: "string", desc: "创建时间 ISO 字符串" },
    ],
    response: `{
  "items": [
    {
      "contentId": 12345,
      "name": "StarExplorer",
      "authorName": "BuilderX",
      "authorAvatar": "QmAvatarHash...",
      "type": 1,
      "image": "QmImageHash...",
      "hash": "QmDataHash...",
      "audioHash": "",
      "duration": 0,
      "viewCount": 12000,
      "playCount": 3500,
      "commentCount": 89,
      "describe": "Explore the mysteries of the universe",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}`,
    curlExample: `curl "${BASE}/api/recommend?type=3"`,
    urlExample: `${BASE}/api/recommend?type=3`,
    errors: [
      { code: "load_failed", status: 500, desc: "推荐数据加载失败，请稍后重试" },
    ],
  },
];

const DATA_MODELS = [
  {
    source: "box3",
    name: "Box3 地图",
    desc: "神奇代码岛（Box3）地图索引，包含基础检索信息",
    fields: [
      { name: "n", type: "string", desc: "地图名称" },
      { name: "a", type: "string", desc: "作者昵称" },
      { name: "ai", type: "integer", desc: "作者 ID" },
      { name: "h", type: "string", desc: "地图数据 IPFS Hash（Qm 开头）" },
      { name: "d", type: "string", desc: "地图描述，可能为空" },
    ],
  },
  {
    source: "dao3",
    name: "Dao3 地图",
    desc: "Dao3 神岛地图详情，包含作者、分类、统计等完整信息",
    fields: [
      { name: "contentId", type: "integer", desc: "内容 ID" },
      { name: "name", type: "string", desc: "地图名称" },
      { name: "description", type: "string", desc: "地图描述" },
      { name: "playHash", type: "string", desc: "游玩入口 Hash" },
      { name: "preview", type: "string", desc: "预览图 Hash" },
      { name: "author", type: "object", desc: "作者信息：nickname, userId, avatar, avatarFrame" },
      { name: "coAuthors", type: "array", desc: "合作者列表" },
      { name: "tab", type: "object", desc: "分类：{ tabKey, tabName }" },
      { name: "labels", type: "array", desc: "标签列表：{ labelId, labelName, labelKey }" },
      { name: "banner", type: "array", desc: "Banner 图 Hash 列表" },
      { name: "playCount", type: "integer", desc: "游玩数" },
      { name: "likeCount", type: "integer", desc: "点赞数" },
      { name: "viewCount", type: "integer", desc: "浏览数" },
      { name: "favoritesCount", type: "integer", desc: "收藏数" },
      { name: "commentCount", type: "integer", desc: "评论数" },
      { name: "publishedAt", type: "string", desc: "发布时间" },
    ],
  },
  {
    source: "box3-search",
    name: "Box3 搜索",
    desc: "Box3 搜索索引，涵盖地图、模型、音乐三类内容",
    fields: [
      { name: "contentId", type: "integer", desc: "内容 ID" },
      { name: "name", type: "string", desc: "内容名称" },
      { name: "describe", type: "string", desc: "描述" },
      { name: "contentType", type: "integer", desc: "内容类型：1=地图 2=模型 3=音乐" },
      { name: "hash", type: "string", desc: "内容数据 Hash" },
      { name: "audioHash", type: "string", desc: "音频 Hash" },
      { name: "duration", type: "integer", desc: "时长（毫秒）" },
      { name: "image", type: "string", desc: "封面图 Hash" },
      { name: "author", type: "object", desc: "作者信息：userId, avatar, displayname" },
      { name: "playCount", type: "integer", desc: "游玩数" },
      { name: "viewCount", type: "integer", desc: "浏览数" },
      { name: "createdAt", type: "string", desc: "创建时间" },
      { name: "url", type: "string", desc: "Box3 原始链接" },
    ],
  },
];

const DAO3_TABS_LIST = [
  { key: "mapRolePlaying", name: "RPG" },
  { key: "mapSports", name: "竞技" },
  { key: "mapCasual", name: "休闲" },
  { key: "mapSimulator", name: "创造" },
  { key: "mapParkour", name: "跑酷" },
  { key: "mapSurvival", name: "生存" },
  { key: "mapRacing", name: "竞速" },
  { key: "mapPuzzle", name: "解密" },
  { key: "mapTycoon", name: "模拟" },
  { key: "mapOther", name: "其他" },
];

const STATUS_CODES = [
  { status: 200, desc: "请求成功" },
  { status: 400, desc: "参数错误（如 page / limit 非数字）" },
  { status: 404, desc: "请求的端点不存在" },
  { status: 429, desc: "速率限制触发，请降低请求频率后重试（Retry-After 头标明冷却秒数）" },
  { status: 500, desc: "服务端内部错误" },
];

function MethodBadge({ method }: { method: string }) {
  const bg = method === "GET" ? "var(--color-info-bg)" : "var(--color-accent-bg)";
  const color = method === "GET" ? "var(--color-info)" : "var(--color-accent)";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", fontSize: 10, fontWeight: 700, borderRadius: "var(--radius-sm)", background: bg, color, letterSpacing: "0.05em" }}>{method}</span>
  );
}

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div style={{ position: "relative" }}>
      {label && <div style={{ position: "absolute", top: 6, right: 8, fontSize: 9, color: "#6b7b8d", fontWeight: 600, letterSpacing: "0.05em", zIndex: 1 }}>{label}</div>}
      <pre style={{ margin: 0, padding: "12px 16px", background: "var(--color-code-bg, #1a1a2e)", borderRadius: "var(--radius-md)", fontSize: 11, lineHeight: 1.7, color: "#c8d6e5", overflowX: "auto", whiteSpace: "pre", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}>{children}</pre>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", marginBottom: 12 }}>{children}</h2>;
}

function EndpointSection({ ep }: { ep: EndpointDef }) {
  return (
    <div style={{ background: "var(--color-surface-elevated)", border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border-light)", display: "flex", alignItems: "center", gap: 10 }}>
        <MethodBadge method={ep.method} />
        <code style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}>{ep.path}</code>
      </div>

      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, margin: 0 }}>{ep.desc}</p>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 8, letterSpacing: "0.05em" }}>请求参数</div>
          <div style={{ border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "var(--color-base)" }}>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)", width: 90 }}>名称</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)", width: 60 }}>类型</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)", width: 40 }}>必填</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)", width: 100 }}>默认值</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)" }}>说明</th>
                </tr>
              </thead>
              <tbody>
                {ep.params.map((p) => (
                  <tr key={p.name}>
                    <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>{p.name}</td>
                    <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text-secondary)" }}>{p.type}</td>
                    <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: p.required ? "var(--color-accent)" : "var(--color-text-tertiary)" }}>{p.required ? "是" : "否"}</td>
                    <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text-secondary)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>{p.default || "\u2014"}</td>
                    <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 8, letterSpacing: "0.05em" }}>响应字段</div>
          <div style={{ border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "var(--color-base)" }}>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)", width: 160 }}>字段</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)", width: 60 }}>类型</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)" }}>说明</th>
                </tr>
              </thead>
              <tbody>
                {ep.responseFields.map((f) => (
                  <tr key={f.name}>
                    <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>{f.name}</td>
                    <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text-secondary)" }}>{f.type}</td>
                    <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{f.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 8, letterSpacing: "0.05em" }}>响应示例</div>
          <CodeBlock label="JSON">{ep.response}</CodeBlock>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 8, letterSpacing: "0.05em" }}>请求示例</div>
          <CodeBlock label="cURL">{ep.curlExample}</CodeBlock>
          <div style={{ marginTop: 6 }}>
            <CodeBlock label="URL">{ep.urlExample}</CodeBlock>
          </div>
        </div>

        {ep.errors.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 8, letterSpacing: "0.05em" }}>错误响应</div>
            <div style={{ border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: "var(--color-base)" }}>
                    <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)", width: 60 }}>状态码</th>
                    <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)", width: 180 }}>错误码</th>
                    <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)" }}>说明</th>
                  </tr>
                </thead>
                <tbody>
                  {ep.errors.map((e) => (
                    <tr key={e.code}>
                      <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-error, #e74c3c)", fontWeight: 600 }}>{e.status}</td>
                      <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>{e.code}</td>
                      <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{e.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DataModelSection({ model }: { model: typeof DATA_MODELS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "var(--color-surface-elevated)", border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)" }}>{model.name}</span>
            <code style={{ fontSize: 10, padding: "1px 6px", background: "var(--color-base)", borderRadius: "var(--radius-sm)", color: "var(--color-text-tertiary)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}>{model.source}</code>
          </div>
          <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2, lineHeight: 1.4 }}>{model.desc}</p>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s", flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div style={{ borderTop: "1px solid var(--color-border-light)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "var(--color-base)" }}>
                <th style={{ padding: "6px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)" }}>字段</th>
                <th style={{ padding: "6px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)", width: 60 }}>类型</th>
                <th style={{ padding: "6px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)" }}>说明</th>
              </tr>
            </thead>
            <tbody>
              {model.fields.map((f) => (
                <tr key={f.name}>
                  <td style={{ padding: "5px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>{f.name}</td>
                  <td style={{ padding: "5px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text-secondary)" }}>{f.type}</td>
                  <td style={{ padding: "5px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{f.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";

export default function ApiDocsPage() {
  return (
    <PageLayout breadcrumb="开放平台">
      <main style={{ flex: "1 1 0%", maxWidth: 720, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24, paddingTop: 28, paddingBottom: 40 }}>
        <div className="animate-slide-up">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.02em" }}>开放平台</h1>
          </div>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
            ArcadiaBase 开放 RESTful API，提供 Box3 与 Dao3 资源检索与推荐数据访问。所有接口基于 Cloudflare Pages Functions 部署，无需鉴权，直接通过 HTTPS GET 请求调用。
          </p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.03s" }}>
          <div style={{ background: "var(--color-accent-bg)", border: "1px solid var(--color-accent)", borderRadius: "var(--radius-md)", padding: "12px 16px", marginBottom: 24, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div style={{ fontSize: 12, color: "var(--color-accent)", lineHeight: 1.6 }}>
              <strong>Base URL</strong>：<code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>{BASE}</code>
              <br />所有接口返回 <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>Content-Type: application/json</code>，字符编码 UTF-8。
            </div>
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.04s", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {ENDPOINTS.map((ep) => (
              <a key={ep.path} href={`#${ep.path.slice(1)}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "var(--color-surface-elevated)", border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-md)", textDecoration: "none", fontSize: 12, transition: "border-color 0.15s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-light)"; }}>
                <MethodBadge method={ep.method} />
                <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, color: "var(--color-text)" }}>{ep.path}</code>
              </a>
            ))}
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.05s", display: "flex", flexDirection: "column", gap: 20 }}>
          {ENDPOINTS.map((ep) => (
            <div key={ep.path} id={ep.path.slice(1)}>
              <EndpointSection ep={ep} />
            </div>
          ))}
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.07s", marginTop: 32 }}>
          <SectionTitle>数据模型</SectionTitle>
          <p style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 10 }}>各数据源返回的 <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>results[].data</code> 对象结构如下，点击展开查看完整字段定义：</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {DATA_MODELS.map((m) => (
              <DataModelSection key={m.source} model={m} />
            ))}
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.09s", marginTop: 28 }}>
          <SectionTitle>Dao3 分类值</SectionTitle>
          <p style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 10 }}>使用 <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>tab</code> 参数筛选 Dao3 数据时，可传入以下值：</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {DAO3_TABS_LIST.map((t) => (
              <span key={t.key} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", background: "var(--color-surface-elevated)", border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-sm)", fontSize: 11 }}>
                <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, color: "var(--color-accent)" }}>{t.key}</code>
                <span style={{ color: "var(--color-text-secondary)" }}>{t.name}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.11s", marginTop: 28 }}>
          <SectionTitle>HTTP 状态码</SectionTitle>
          <div style={{ border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "var(--color-base)" }}>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)", width: 70 }}>状态码</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)" }}>含义</th>
                </tr>
              </thead>
              <tbody>
                {STATUS_CODES.map((s) => (
                  <tr key={s.status}>
                    <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: s.status < 300 ? "var(--color-info)" : s.status < 500 ? "var(--color-accent)" : "var(--color-error, #e74c3c)", fontWeight: 600 }}>{s.status}</td>
                    <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--color-border-light)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{s.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.13s", marginTop: 28 }}>
          <SectionTitle>限制与配额</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { label: "每页上限", value: "10,000 条", desc: "limit 参数最大值，超出自动截断" },
              { label: "速率限制", value: "50 req/min", desc: "单 IP 每分钟最多 50 次请求，超出返回 429；建议客户端限流 30 req/min" },
              { label: "日请求配额", value: "80,000 req/day", desc: "单 IP 每日累计上限，Cloudflare Free 计划 100K/day，预留安全余量" },
              { label: "CPU 时限", value: "8 ms/req", desc: "Cloudflare Workers 单次调用上限 10ms，含数据库解压与检索耗时" },
              { label: "响应体积", value: "≤ 5 MB", desc: "单次响应 JSON 体积上限，大结果集请使用分页" },
              { label: "鉴权方式", value: "无需 API Key", desc: "公开只读接口，直接 HTTPS GET 调用" },
              { label: "CORS", value: "已开放", desc: "Access-Control-Allow-Origin: *，支持浏览器端直接调用" },
              { label: "运行时", value: "Cloudflare Workers", desc: "边缘计算，全球 300+ 节点低延迟响应" },
              { label: "数据时效", value: "定期更新", desc: "非实时同步，通常每日更新一次" },
            ].map((r) => (
              <div key={r.label} style={{ padding: "10px 14px", background: "var(--color-surface-elevated)", border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-sm)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text)", minWidth: 80 }}>{r.label}</span>
                  <span style={{ fontSize: 12, color: "var(--color-accent)", fontWeight: 500 }}>{r.value}</span>
                </div>
                <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2, lineHeight: 1.4 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.15s", marginTop: 28 }}>
          <SectionTitle>快速上手</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 6, letterSpacing: "0.05em" }}>JavaScript (fetch)</div>
              <CodeBlock label="JS">{`const resp = await fetch(
  "${BASE}/api/search?q=Parkour&limit=5"
);
const { results, total, counts } = await resp.json();
console.log(\`Total: \${total}\`, counts);`}</CodeBlock>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 6, letterSpacing: "0.05em" }}>Python (requests)</div>
              <CodeBlock label="Python">{`import requests

r = requests.get("${BASE}/api/recommend", params={"type": 3})
data = r.json()
for item in data["items"]:
    print(item["name"], item.get("duration", 0))`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.17s", marginTop: 28, padding: "16px 20px", background: "var(--color-surface-elevated)", border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-lg)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text)" }}>注意事项</span>
          </div>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
            <li>IPFS Hash（Qm 开头）可通过 <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10 }}>https://static.box3.codemao.cn/block/&#123;hash&#125;</code> 获取原始数据</li>
            <li>图片资源同理，拼接上述 CDN 前缀即可访问缩略图</li>
            <li>Box3 CDN 服务已停运，部分 Hash 可能无法访问</li>
            <li>请勿高频轮询，建议在应用层实现结果缓存</li>
            <li>API 可能随数据更新发生不兼容变更，建议关注变更日志</li>
          </ul>
        </div>
      </main>
    </PageLayout>
  );
}
