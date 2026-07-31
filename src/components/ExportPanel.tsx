"use client";

import { useState, useCallback, useRef, useEffect, useMemo, memo } from "react";
import { type CurrentMap, fetchUserProfile, fetchUserDetail, type UserProfile, type UserDetail, fetchBlock, fetchBlockBinary, fetchBlockByHash, fetchBlockBinaryByHash, fetchPreviewBinary, isQmHash, cleanHash } from "../lib/api";
import { exportMap, type ExportOptions } from "../lib/export";

interface ExportPanelProps { map: CurrentMap; onBack: () => void; }

const OPTION_GROUPS = [
  { title: "地形", items: [
    { key: "optTerrain" as const, label: "地形数据", desc: "地图体素区块" },
    { key: "optSparseVoxels" as const, label: "稀疏体素压缩", desc: "合并为 voxel-sparse.gz" },
    { key: "optTerrainRaw" as const, label: "原始区块文件", desc: "保留每个 chunk .bin" },
  ]},
  { title: "网格", items: [
    { key: "optMeshes" as const, label: "网格数据", desc: "mesh/VBProject → meshes/" },
    { key: "optVoxRename" as const, label: "转换为 .vox", desc: "VBProject → MagicaVoxel 二进制" },
  ]},
  { title: "3D 模型", items: [
    { key: "optModelProject" as const, label: "模型项目", desc: "modelProjectHash → models/projects/" },
    { key: "optModelPreview" as const, label: "模型预览图", desc: "previewHash → models/previews/" },
  ]},
  { title: "媒体与脚本", items: [
    { key: "optImages" as const, label: "图片资源", desc: "预览图/横幅 → images/" },
    { key: "optAudio" as const, label: "音频资源", desc: "ambientSound → audio/" },
    { key: "optScripts" as const, label: "脚本代码", desc: "JS 脚本 → scripts/" },
  ]},
  { title: "JSON 配置", items: [
    { key: "optBlockJson" as const, label: "项目根数据", desc: "block.json" },
    { key: "optJsonEnv" as const, label: "环境配置", desc: "雾/雨/雪/天空 → json/environment/" },
    { key: "optJsonPhysics" as const, label: "物理配置", desc: "重力/阻尼 → json/physics/" },
    { key: "optJsonPlayer" as const, label: "玩家配置", desc: "移速/飞行 → json/player/" },
    { key: "optJsonSeeds" as const, label: "实体配置", desc: "位置/属性 → json/seeds/" },
    { key: "optJsonOther" as const, label: "其他配置", desc: "未分类 → json/" },
  ]},
  { title: "输出设置", items: [
    { key: "optJsonFormat" as const, label: "JSON 格式化", desc: "美化缩进" },
  ]},
];

const DEFAULT_OPTIONS: ExportOptions = {
  optBlockJson: true, optTerrain: true, optSparseVoxels: true, optTerrainRaw: false,
  optMeshes: true, optVoxRename: false, optModelProject: false,
  optModelPreview: false, optImages: true, optAudio: true, optScripts: true,
  optJsonEnv: true, optJsonPhysics: true, optJsonPlayer: true, optJsonSeeds: true, optJsonOther: true,
  optJsonFormat: true, optCompressLevel: 6,
};

const GENDER_MAP: Record<number, string> = { 0: "未设置", 1: "男", 2: "女" };

const LOG_COLORS: Record<string, string> = {
  ok: "var(--color-success)", err: "var(--color-error)", info: "var(--color-info)",
};

const LogPanel = memo(function LogPanel({ logs }: { logs: { msg: string; type: string; time: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [logs.length]);
  return (
    <div ref={ref} style={{ background: "var(--color-base)", border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-md)", padding: 12, maxHeight: 176, overflowY: "auto", fontSize: 11, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", lineHeight: 1.7, contain: "layout style" }}>
      {logs.map((l, i) => (
        <div key={i} style={{ color: LOG_COLORS[l.type] || "var(--color-text-tertiary)" }}>
          <span style={{ color: "var(--color-text-tertiary)", opacity: 0.5 }}>[{l.time}]</span> {l.msg}
        </div>
      ))}
    </div>
  );
});

function Tag({ value, color, iconUrl }: { value: string; color: string; iconUrl?: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: "var(--radius-sm)", background: color + "18", border: "1px solid " + color + "30" }}>
      {iconUrl && <img src={iconUrl} alt="" style={{ width: 12, height: 12, borderRadius: 2 }} />}
      <span style={{ fontSize: 10, fontWeight: 500, color, lineHeight: 1.3 }}>{value}</span>
    </div>
  );
}

async function loadBannerImages(mapHash: string, projectHash?: string): Promise<string[]> {
  const hash = cleanHash(projectHash || mapHash);

  let bd = isQmHash(hash) ? await fetchBlock(hash) : await fetchBlockByHash(hash);
  if (!bd) return [];
  if (bd.type === "permission" && bd.versionControl) {
    try {
      const vc = await fetchBlock(bd.versionControl);
      let ph = vc?.headHash;
      if (!ph && vc?.branches?.master?.headHash) ph = vc.branches.master.headHash;
      if (!ph && vc?.branches) { for (const k of Object.keys(vc.branches)) { if (vc.branches[k]?.headHash) { ph = vc.branches[k].headHash; break; } } }
      if (ph) { const pd = await fetchBlock(ph); if (pd?.type === "project") bd = pd; }
    } catch {}
  }
  if (bd.type !== "project") return [];
  let info = bd.info;
  if (typeof info === "string" && info.length > 0) {
    const ih = cleanHash(info);
    try { info = isQmHash(ih) ? await fetchBlock(ih) : await fetchBlockByHash(info); } catch { return []; }
  }
  if (!info) return [];
  const hashes: string[] = [];
  if (info.bannerImages && Array.isArray(info.bannerImages)) {
    for (const h of info.bannerImages) { if (typeof h === "string" && h.length > 0) hashes.push(cleanHash(h)); }
  }
  if (info.previewImage && typeof info.previewImage === "string" && info.previewImage.length > 0) hashes.push(cleanHash(info.previewImage));
  if (hashes.length === 0) return [];
  const results = await Promise.all(hashes.map(async (h) => {
    try {
      const bin = isQmHash(h) ? await fetchBlockBinary(h) : await fetchPreviewBinary(h);
      const mime = h.endsWith(".jpg") || h.endsWith(".jpeg") ? "image/jpeg" : "image/png";
      const blob = new Blob([new Uint8Array(bin) as any], { type: mime });
      return URL.createObjectURL(blob);
    } catch { return null; }
  }));
  return results.filter((u): u is string => u !== null);
}

export default function ExportPanel({ map, onBack }: ExportPanelProps) {
  const [options, setOptions] = useState<ExportOptions>({ ...DEFAULT_OPTIONS });
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [logs, setLogs] = useState<{ msg: string; type: string; time: string }[]>([]);
  const [done, setDone] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [bannerIdx, setBannerIdx] = useState(0);
  const blobUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    if (!map.author_id) return;
    let c = false;
    fetchUserProfile(map.author_id).then(r => { if (!c) setProfile(r); }).catch(() => {});
    fetchUserDetail(map.author_id).then(r => { if (!c) setUserDetail(r); }).catch(() => {});
    return () => { c = true; };
  }, [map.author_id]);

  useEffect(() => {
    let cancelled = false;
    setBannerLoading(true);
    setBannerUrls([]);
    blobUrlsRef.current.forEach(u => URL.revokeObjectURL(u));
    blobUrlsRef.current = [];
    loadBannerImages(map.hash, map.projectHash).then(urls => {
      if (cancelled) { urls.forEach(u => { if (u.startsWith("blob:")) URL.revokeObjectURL(u); }); return; }
      blobUrlsRef.current = urls.filter(u => u.startsWith("blob:"));
      setBannerUrls(urls);
      setBannerLoading(false);
    }).catch(() => { if (!cancelled) setBannerLoading(false); });
    return () => {
      cancelled = true;
      blobUrlsRef.current.forEach(u => URL.revokeObjectURL(u));
      blobUrlsRef.current = [];
    };
  }, [map.hash, map.projectHash]);

  useEffect(() => {
    if (map.name && map.name !== "Dao3 地图" && !map.name.startsWith("Dao3 地图 #")) return;
    if (!map.hash) return;
    let c = false;
    (async () => {
      try {
        const HASH_RE = /^Qm[1-9A-HJ-NP-Za-km-z]{20,}$/;
        const bd = HASH_RE.test(map.hash) ? await fetchBlock(map.hash) : await fetchBlockByHash(map.hash);
        if (c) return;
        let projectData = bd;
        if (bd?.type === "permission" && bd.versionControl) {
          const vc = await fetchBlock(bd.versionControl);
          let ph = vc?.headHash;
          if (!ph && vc?.branches) { for (const k of Object.keys(vc.branches)) { if (vc.branches[k]?.headHash) { ph = vc.branches[k].headHash; break; } } }
          if (ph) { const pd = await fetchBlock(ph); if (pd?.type === "project") projectData = pd; }
        }
        if (projectData?.type === "project" && projectData.info) {
          let info = projectData.info;
          if (typeof info === "string") { try { info = HASH_RE.test(info) ? await fetchBlock(info) : await fetchBlockByHash(info); } catch {} }
          if (info && !c) {
            const newName = info.name || info.title;
            const newDesc = info.describe || info.description;
            if (newName) map.name = newName;
            if (newDesc) map.describe = newDesc;
          }
        }
      } catch {}
    })();
    return () => { c = true; };
  }, [map.hash]);

  const addLog = useCallback((msg: string, type: string = "") => {
    const time = new Date().toLocaleTimeString();
    setLogs((p) => [...p, { msg, type, time }]);
  }, []);

  const handleExport = useCallback(async () => {
    setExporting(true); setDone(false); setLogs([]); setProgress({ completed: 0, total: 0 });
    try {
      const r = await exportMap({ ...map }, options, addLog, (c, t) => setProgress({ completed: c, total: t }));
      setProgress({ completed: r.total || 1, total: r.total || 1 });
      const u = URL.createObjectURL(r.blob); const a = document.createElement("a");
      a.href = u; a.download = r.fileName; document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(u), 5000); addLog("下载: " + r.fileName, "ok"); setDone(true);
    } catch (e: any) { addLog("失败: " + e.message, "err"); setDone(false); } finally { setExporting(false); }
  }, [map, options, addLog]);

  const toggle = useCallback((key: keyof ExportOptions) => setOptions((p) => ({ ...p, [key]: !p[key] })), []);
  const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
  const avatarUrl = userDetail?.avatar || userDetail?.previewUrl;
  const frameUrl = userDetail?.avatarFrame;

  const optionItems = useMemo(() =>
    OPTION_GROUPS.map(g => g.items.map(({ key, label, desc }) => ({ key, label, desc }))).flat(),
  []);

  return (
    <div style={{ width: "100%", maxWidth: 672, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 }}>
      {bannerLoading && (
        <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 12 }} className="animate-slide-up">
          <div className="skeleton" style={{ width: "100%", height: 240 }} />
        </div>
      )}
      {!bannerLoading && bannerUrls.length > 0 && (
        <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 12, position: "relative" }} className="animate-slide-up">
          <div style={{ position: "relative", width: "100%", height: 240, overflow: "hidden" }}>
            <img key={bannerIdx} src={bannerUrls[bannerIdx]} alt={"banner " + (bannerIdx + 1)} className="banner-fade" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            {bannerUrls.length > 1 && (
              <>
                <button onClick={() => setBannerIdx(i => (i - 1 + bannerUrls.length) % bannerUrls.length)}
                  className="banner-btn"
                  style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button onClick={() => setBannerIdx(i => (i + 1) % bannerUrls.length)}
                  className="banner-btn"
                  style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
                  {bannerUrls.map((_, i) => (
                    <div key={i} onClick={() => setBannerIdx(i)} style={{ width: i === bannerIdx ? 18 : 6, height: 6, borderRadius: 3, background: i === bannerIdx ? "white" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)", boxShadow: i === bannerIdx ? "0 0 6px rgba(255,255,255,0.3)" : "none" }} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="panel-card animate-slide-up">
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", lineHeight: 1.4, marginBottom: 8 }}>{map.name}</h2>
        {map.describe && <p style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.6, whiteSpace: "pre-wrap", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 12 }}>{map.describe}</p>}

        {(map.author_id || map.author_name || userDetail) && (
          <>
            <div className="section-divider" />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 15, fontWeight: 600 }}>
                    {(userDetail?.nickname || map.author_name).charAt(0).toUpperCase()}
                  </div>
                )}
                {frameUrl && (
                  <img src={frameUrl} alt="" style={{ position: "absolute", top: 0, left: 0, width: 52, height: 52, pointerEvents: "none" }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)", lineHeight: 1.3 }}>{userDetail?.nickname || map.author_name}</div>
                {userDetail?.introduction && (
                  <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", lineHeight: 1.4, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userDetail.introduction}</div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                  {profile?.mbti && <Tag value={profile.mbti} color={profile.mbtiBackcolor} iconUrl={profile.mbtiUrl} />}
                  {profile?.constellation && <Tag value={profile.constellation} color={profile.constellationBackcolor} iconUrl={profile.constellationUrl} />}
                  {profile?.gender && profile.gender > 0 && <Tag value={GENDER_MAP[profile.gender] || ""} color={profile.genderBackcolor} iconUrl={profile.genderUrl} />}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="panel-card animate-slide-up" style={{ marginTop: 12 }}>
        <h3 style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>导出选项</h3>
        {OPTION_GROUPS.map((g, gi) => (
          <div key={g.title} style={{ marginBottom: gi < OPTION_GROUPS.length - 1 ? 12 : 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 3 }}>{g.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {g.items.map(({ key, label, desc }) => (
                <label key={key} className="option-label">
                  <div style={{ position: "relative", width: 14, height: 14, borderRadius: "var(--radius-sm)", border: options[key] ? "none" : "1.5px solid var(--color-border)", background: options[key] ? "var(--color-accent)" : "var(--color-surface-elevated)", flexShrink: 0, transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {options[key] && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    <input type="checkbox" checked={!!options[key]} onChange={() => toggle(key)} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 12, color: "var(--color-text)", lineHeight: 1.3 }}>{label}</span>
                    <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginLeft: 6 }}>{desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="panel-card animate-slide-up" style={{ marginTop: 10, padding: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>输出结构</div>
        <pre style={{ fontSize: 10, color: "var(--color-text-secondary)", lineHeight: 1.7, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", margin: 0 }}>{`├── block.json        项目根数据
├── terrain/          地形体素
│   ├── voxel-sparse.gz
│   └── raw/          原始区块
├── meshes/           网格 (.vb)
├── models/           3D模型
│   ├── projects/     模型项目
│   └── previews/     模型预览
├── images/           图片
├── audio/            音频
├── scripts/          脚本
└── json/             配置
    ├── environment/
    ├── physics/
    ├── player/
    └── seeds/`}</pre>
      </div>

      <div style={{ marginTop: 16 }} className="animate-slide-up">
        <button onClick={handleExport} disabled={exporting}
          className="export-btn"
          style={{ background: done ? "var(--color-success)" : exporting ? "color-mix(in srgb, var(--color-accent) 70%, white)" : "var(--color-accent)", cursor: exporting ? "wait" : "pointer" }}
        >
          {done ? "导出完成" : exporting ? "正在导出..." : "开始导出"}
        </button>
      </div>

      {(exporting || logs.length > 0) && (
        <div style={{ marginTop: 16 }} className="animate-slide-up">
          <div style={{ marginBottom: 12 }}>
            <div style={{ height: 3, background: "var(--color-base)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 2, transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)", width: pct + "%", background: done ? "var(--color-success)" : undefined }} className={!done && pct > 0 ? "progress-bar-active" : undefined} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
              <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>{progress.completed} / {progress.total}</span>
              <span style={{ fontSize: 11, fontWeight: 500, fontVariantNumeric: "tabular-nums", color: done ? "var(--color-success)" : "var(--color-accent)" }}>{pct}%</span>
            </div>
          </div>
          <LogPanel logs={logs} />
        </div>
      )}
    </div>
  );
}
