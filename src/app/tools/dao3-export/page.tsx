"use client";

import { useState, useCallback, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageLayout from "../../../components/PageLayout";
import { fetchDao3MapHashByMapId, fetchDao3UserExperience, fetchDao3Models, API_BASE, signedFetch, type Dao3UserExperienceItem, type Dao3ModelItem } from "../../../lib/api";
import {
  exportDao3Map,
  exportModels,
  loadBranches,
  type Dao3ExportType,
  type Dao3ExportOptions,
  type BranchInfo,
  type ModelItem,
} from "../../../lib/dao3Export";

const EXPORT_TYPES: { key: Dao3ExportType; label: string; icon: string; desc: string; usage?: string }[] = [
  {
    key: "all", label: "全部导出", icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
    desc: "构建完整数据树，导出所有资源",
    usage: "导出地图完整工程数据，包含建筑、代码、音频、图片、模型及世界配置。",
  },
  {
    key: "build", label: "建筑", icon: "M3 21h18M3 21V8l9-5 9 5v13M9 21v-6h6v6",
    desc: "导出 voxel-sparse.gz 稀疏体素文件",
    usage: "可导入到《我的世界》Java版，配合 Box3Blocks 模组实现建筑 1:1 还原；也可导入其他游戏引擎进行二次开发。",
  },
  {
    key: "code", label: "代码", icon: "M16 18l6-6-6-6M8 6l-6 6 6 6",
    desc: "导出所有脚本文件为 zip",
  },
  {
    key: "models", label: "模型", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    desc: "导出地图项目中的模型文件为 glTF",
    usage: "导出模型为 glTF 格式（.gltf），可在 Blender、Unity 等工具中导入使用。",
  },
  {
    key: "audio", label: "音频", icon: "M9 18V5l12-2v13M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zM21 16c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z",
    desc: "导出音频资源为 zip",
  },
  {
    key: "image", label: "图片", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    desc: "导出图片资源为 zip",
  },
  {
    key: "worldconfig", label: "世界配置", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
    desc: "导出世界配置数据（权限、版本控制、项目信息等）",
  },
];

type IndexMode = "user" | "map";

function Dao3ExportPageContent() {
  const [gateAccepted, setGateAccepted] = useState(false);
  const [indexMode, setIndexMode] = useState<IndexMode | null>(null);
  const [userId, setUserId] = useState("");
  const [userMaps, setUserMaps] = useState<Dao3UserExperienceItem[]>([]);
  const [userMapsLoading, setUserMapsLoading] = useState(false);
  const [userMapsError, setUserMapsError] = useState("");
  const [selectedMapId, setSelectedMapId] = useState<number | null>(null);
  const [selectedMapMode, setSelectedMapMode] = useState<"play" | "edit">("play");
  const [mapIdInput, setMapIdInput] = useState("");
  const [mapIdMode, setMapIdMode] = useState<"play" | "edit">("play");
  const [mapIdResolving, setMapIdResolving] = useState(false);
  const [mapIdError, setMapIdError] = useState("");
  const [mapHash, setMapHash] = useState("");
  const [mapName, setMapName] = useState("");
  const [mapDescription, setMapDescription] = useState("");
  const [mapPreview, setMapPreview] = useState("");
  const [mapAuthor, setMapAuthor] = useState("");
  const [mapAuthorAvatar, setMapAuthorAvatar] = useState("");
  const [branches, setBranches] = useState<BranchInfo[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [defaultBranch, setDefaultBranch] = useState("");
  const [branchesLoading, setBranchesLoading] = useState(false);
  const [modelType, setModelType] = useState<"0" | "1" | "2">("2");
  const [modelContainerMode, setModelContainerMode] = useState<"edit" | "play">("edit");
  const [modelCreativeMode, setModelCreativeMode] = useState<string>("");
  const [modelOrderBy, setModelOrderBy] = useState<string>("0");
  const [modelLimit, setModelLimit] = useState("100");
  const [modelOffset, setModelOffset] = useState("0");
  const [modelName, setModelName] = useState("");
  const [modelMapId, setModelMapId] = useState("");
  const [modelItems, setModelItems] = useState<Dao3ModelItem[]>([]);
  const [modelCount, setModelCount] = useState(0);
  const [modelLoading, setModelLoading] = useState(false);
  const [modelError, setModelError] = useState("");
  const [selectedModels, setSelectedModels] = useState<Set<number>>(new Set());
  const [exportType, setExportType] = useState<Dao3ExportType>("all");
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [logs, setLogs] = useState<{ msg: string; type: string; time: string }[]>([]);
  const [done, setDone] = useState(false);
  const [filterDefaultAudio, setFilterDefaultAudio] = useState(false);
  const [onlyOpenSource, setOnlyOpenSource] = useState(true);
  const [openSourceAuthors, setOpenSourceAuthors] = useState<Set<string>>(new Set());
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs.length]);

  useEffect(() => {
    signedFetch(API_BASE + "/opensource?action=list")
      .then(r => r.json())
      .then(d => {
        if (d.code === 200 && d.authors) {
          setOpenSourceAuthors(new Set(d.authors.map((a: any) => String(a.userId))));
        }
      })
      .catch(() => {});
  }, []);

  const addLog = useCallback((msg: string, type: string = "") => {
    const time = new Date().toLocaleTimeString();
    setLogs((p) => [...p, { msg, type, time }]);
  }, []);

  const resolveMap = useCallback(async (mapId: number, mode: "play" | "edit") => {
    setMapIdResolving(true);
    setMapIdError("");
    setMapHash("");
    setMapName("");
    setMapDescription("");
    setMapPreview("");
    setMapAuthor("");
    setMapAuthorAvatar("");
    setBranches([]);
    setSelectedBranch("");
    setDefaultBranch("");
    setLogs([]);
    setDone(false);
    try {
      const hashResult = await fetchDao3MapHashByMapId(mapId, mode);
      if (hashResult.allowed === false) {
        setMapIdError(hashResult.errorMessage || "该地图作者未参与开源计划，暂不可导出");
        return;
      }
      if (!hashResult.hash) { setMapIdError("获取到的 Hash 为空"); return; }
      setMapHash(hashResult.hash);
      setBranchesLoading(true);
      try {
        const branchResult = await loadBranches(hashResult.hash);
        setBranches(branchResult.branches);
        setDefaultBranch(branchResult.currentBranch);
        setSelectedBranch("");
      } catch { setBranches([]); setDefaultBranch(""); } finally { setBranchesLoading(false); }
      try {
        const { fetchDao3MapFullInfo } = await import("../../../lib/api");
        const info = await fetchDao3MapFullInfo(mapId, mode);
        setMapName(info.name);
        setMapDescription(info.description);
      } catch { setMapName("地图 #" + mapId); }
      // Try to fetch preview/author from search API
      try {
        const { clientSearch } = await import("../../../lib/db");
        const results = await clientSearch({ q: String(mapId), sources: ["dao3"] });
        const match = results.find((r: any) => r.dao3Entry?.contentId === mapId);
        const entry = match?.dao3Entry;
        if (entry) {
          if (entry.preview) setMapPreview(entry.preview);
          if (entry.author?.nickname) setMapAuthor(entry.author.nickname);
          if (entry.author?.avatar) setMapAuthorAvatar(entry.author.avatar);
          if (entry.name && mapName === "地图 #" + mapId) setMapName(entry.name);
          if (entry.description && !mapDescription) setMapDescription(entry.description);
        }
      } catch { /* search API not available, ignore */ }
      setModelMapId(String(mapId));
      setModelType("2");
      setModelContainerMode(mode === "edit" ? "edit" : "play");
    } catch (e: any) { setMapIdError(e.message || "获取 Hash 失败"); } finally { setMapIdResolving(false); }
  }, []);

  // URL parameter support: ?mapId=xxx&mode=play/edit&preview=xxx&author=xxx&authorAvatar=xxx&name=xxx&desc=xxx
  const searchParams = useSearchParams();
  const urlMapId = searchParams.get("mapId");
  const urlMode = (searchParams.get("mode") as "play" | "edit") || "play";
  const urlPreview = searchParams.get("preview");
  const urlAuthor = searchParams.get("author");
  const urlAuthorAvatar = searchParams.get("authorAvatar");
  const urlName = searchParams.get("name");
  const urlDesc = searchParams.get("desc");
  const hasAutoResolved = useRef(false);

  useEffect(() => {
    if (gateAccepted && !hasAutoResolved.current && urlMapId && /^\d+$/.test(urlMapId)) {
      hasAutoResolved.current = true;
      setIndexMode("map");
      setMapIdInput(urlMapId);
      setMapIdMode(urlMode);
      // Pre-populate from URL params (from search results)
      if (urlName) setMapName(decodeURIComponent(urlName));
      if (urlDesc) setMapDescription(decodeURIComponent(urlDesc));
      if (urlPreview) setMapPreview(decodeURIComponent(urlPreview));
      if (urlAuthor) setMapAuthor(decodeURIComponent(urlAuthor));
      if (urlAuthorAvatar) setMapAuthorAvatar(decodeURIComponent(urlAuthorAvatar));
      resolveMap(parseInt(urlMapId), urlMode);
    }
  }, [gateAccepted, urlMapId, urlMode, urlPreview, urlAuthor, urlAuthorAvatar, urlName, urlDesc, resolveMap]);

  const handleLoadUserMaps = useCallback(async () => {
    const uid = parseInt(userId.trim());
    if (!uid || isNaN(uid)) { setUserMapsError("用户 ID 必须为数字"); return; }
    setUserMapsLoading(true); setUserMapsError("");
    try {
      const result = await fetchDao3UserExperience(uid, 100, 0);
      setUserMaps(result.rows);
      if (result.rows.length === 0) setUserMapsError("该用户没有公开地图");
    } catch (e: any) { setUserMapsError(e.message || "获取地图列表失败"); } finally { setUserMapsLoading(false); }
  }, [userId]);

  const handleSelectUserMap = useCallback(async (item: Dao3UserExperienceItem, mode: "play" | "edit") => {
    setSelectedMapId(item.contentId); setSelectedMapMode(mode);
    // Pre-populate preview from user map list
    if (item.preview) setMapPreview(item.preview);
    if (item.name) setMapName(item.name);
    if (item.description) setMapDescription(item.description);
    await resolveMap(item.contentId, mode);
  }, [resolveMap]);

  const handleMapIdResolve = useCallback(async () => {
    const id = mapIdInput.trim();
    if (!/^\d+$/.test(id)) { setMapIdError("地图 ID 必须为数字"); return; }
    await resolveMap(parseInt(id), mapIdMode);
  }, [mapIdInput, mapIdMode, resolveMap]);

  const handleFetchModels = useCallback(async () => {
    setModelLoading(true); setModelError(""); setModelItems([]); setSelectedModels(new Set());
    try {
      const result = await fetchDao3Models({
        modelType, containerMode: modelContainerMode, creativeMode: modelCreativeMode,
        orderBy: modelOrderBy, limit: modelLimit, offset: modelOffset, mapId: modelMapId, modelName,
      });
      setModelItems(result.rows); setModelCount(result.count);
    } catch (e: any) { setModelError(e.message || "获取模型数据失败"); } finally { setModelLoading(false); }
  }, [modelType, modelContainerMode, modelCreativeMode, modelOrderBy, modelLimit, modelOffset, modelMapId, modelName]);

  const toggleModelSelect = useCallback((id: number) => {
    setSelectedModels((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedModels.size === modelItems.length) setSelectedModels(new Set());
    else setSelectedModels(new Set(modelItems.map((m) => m.modelId)));
  }, [selectedModels.size, modelItems]);

  const handleExport = useCallback(async () => {
    if (exportType === "models") {
      if (!modelItems.length) { addLog("没有可导出的模型", "err"); return; }
      const items = selectedModels.size > 0 ? modelItems.filter((r) => selectedModels.has(r.modelId)) : modelItems;
      if (!items.length) { addLog("没有选中的模型", "err"); return; }
      setExporting(true); setDone(false); setLogs([]);
      try {
        const modelItemsList: ModelItem[] = items.map((r) => ({
          modelId: r.modelId, modelName: r.modelName || "", modelDescription: r.modelDescription || "",
          modelPreviewUrl: r.modelPreviewUrl || "", projectFileHash: r.projectFileHash || "",
        }));
        const r = await exportModels(modelItemsList, addLog, (c, t) => setProgress({ completed: c, total: t }));
        const u = URL.createObjectURL(r.blob);
        const a = document.createElement("a"); a.href = u; a.download = r.fileName;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(u), 5000);
        addLog("下载: " + r.fileName, "ok"); setDone(true);
      } catch (e: any) { addLog("导出失败: " + e.message, "err"); } finally { setExporting(false); }
      return;
    }
    if (!mapHash) { addLog("请先选择或输入地图", "err"); return; }
    setExporting(true); setDone(false); setLogs([]); setProgress({ completed: 0, total: 0 });
    try {
      const currentMapId = indexMode === "user" ? selectedMapId : (mapIdInput.trim() ? parseInt(mapIdInput.trim()) : undefined);
      const options: Dao3ExportOptions = {
        exportType, hash: mapHash, branchKey: selectedBranch || undefined,
        filterDefaultAudio, mapId: currentMapId && !isNaN(currentMapId) ? currentMapId : undefined,
      };
      const r = await exportDao3Map(options, addLog, (c, t) => setProgress({ completed: c, total: t }));
      const u = URL.createObjectURL(r.blob);
      const a = document.createElement("a"); a.href = u; a.download = r.fileName;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(u), 5000);
      addLog("下载: " + r.fileName, "ok"); setDone(true);
    } catch (e: any) { addLog("导出失败: " + e.message, "err"); } finally { setExporting(false); }
  }, [exportType, mapHash, selectedBranch, filterDefaultAudio, modelItems, selectedModels, addLog, indexMode, selectedMapId, mapIdInput]);

  const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
  const currentType = EXPORT_TYPES.find((t) => t.key === exportType);
  const canExport = exportType === "models" ? modelItems.length > 0 : !!mapHash;

  // ===== Shared styles =====
  const R = "var(--radius-md)"; // 4px - primary radius for new elements
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "8px 10px", fontSize: 12,
    background: "var(--color-base)", border: "1px solid var(--color-border-light)",
    borderRadius: R, color: "var(--color-text)", outline: "none",
  };
  const selectStyle: React.CSSProperties = { ...inputStyle, cursor: "pointer" };
  const smallBtn: React.CSSProperties = {
    padding: "8px 14px", fontSize: 11, background: "var(--color-accent)", color: "white",
    border: "none", borderRadius: R, cursor: "pointer", whiteSpace: "nowrap", fontWeight: 500,
  };
  const fieldLabel: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: 4,
  };
  const sectionTitle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)",
    textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8,
  };

  // ======================================================
  // GATE: Copyright Warning
  // ======================================================
  if (!gateAccepted) {
    return (
      <PageLayout breadcrumb="Dao3 导出">
        <main style={{ flex: "1 1 0%", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ width: "100%", maxWidth: 480, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24 }}>
            <div className="animate-slide-up">
              {/* Warning container - matches width of content below */}
              <div style={{
                background: "var(--glass-bg)", padding: "20px 18px",
                borderRadius: R, border: "1px solid var(--glass-border)",
                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                marginBottom: 12,
              }}>
                {/* Warning icon */}
                <div style={{
                  width: 40, height: 40, borderRadius: "var(--radius-md)",
                  background: "var(--color-error-bg)", display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 12px",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", textAlign: "center", marginBottom: 12, letterSpacing: "-0.01em" }}>权限声明</h2>
                <div style={{ fontSize: 12, color: "var(--color-text)", lineHeight: 1.8 }}>
                  <p style={{ marginBottom: 12 }}>本功能仅限在您拥有对应账号合法访问权限，或为该地图知识产权权利人的前提下使用。</p>
                  <p style={{ marginBottom: 12 }}>未经授权导出他人受保护的地图作品可能侵犯其知识产权，相关法律责任由使用者自行承担。</p>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: 11 }}>点击下方按钮即表示您已阅读并同意上述条款。</p>
                </div>
              </div>
              <button
                onClick={() => setGateAccepted(true)}
                style={{
                  width: "100%", padding: "12px 0", fontSize: 13, fontWeight: 600,
                  background: "rgba(0, 0, 0, 0.6)", color: "white", border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: R, cursor: "pointer", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                  transition: "background 0.2s, border-color 0.2s, transform 0.1s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0, 0, 0, 0.75)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)"; }}
              >
                我已了解，继续
              </button>
            </div>
          </div>
        </main>
      </PageLayout>
    );
  }

  // ======================================================
  // INDEX MODE SELECTION
  // ======================================================
  if (!indexMode) {
    return (
      <PageLayout breadcrumb="Dao3 导出">
        <main style={{ flex: "1 1 0%", paddingTop: 24, paddingBottom: 40 }}>
          <div style={{ width: "100%", maxWidth: 560, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24 }}>
            <div className="animate-slide-up" style={{ textAlign: "center", marginBottom: 24, marginTop: 48 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "var(--radius-md)",
                background: "var(--color-accent-bg)", display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 10px",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.01em" }}>神岛地图工程导出</h2>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4, lineHeight: 1.6 }}>选择索引方式来定位要导出的地图</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {([["user", "用户索引", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0", "输入用户 ID，浏览并选择该用户的地图列表"],
                ["map", "地图索引", "M1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6", "M8 2v16M16 6v16", "直接输入地图 ID，自动获取并解析地图数据"]] as const).map(([mode, label, icon1, icon2, desc]) => (
                <button
                  key={mode}
                  onClick={() => setIndexMode(mode as IndexMode)}
                  className="panel-card animate-slide-up"
                  style={{ cursor: "pointer", textAlign: "center", border: "1px solid var(--color-border-light)", padding: "24px 16px" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 10px" }}>
                    <path d={icon1} />{icon2 && <path d={icon2} />}
                  </svg>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{desc}</div>
                </button>
              ))}
            </div>
          </div>
        </main>
      </PageLayout>
    );
  }

  // ======================================================
  // MAIN EXPORT PAGE
  // ======================================================
  return (
    <PageLayout breadcrumb="Dao3 导出">
      <main style={{ flex: "1 1 0%", paddingTop: 24, paddingBottom: 40 }}>
        <div style={{ width: "100%", maxWidth: 640, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24 }}>

          {/* Header */}
          <div className="animate-slide-up" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <button
              onClick={() => { setIndexMode(null); setMapHash(""); setMapName(""); setMapDescription(""); setSelectedMapId(null); setUserMaps([]); }}
              className="back-btn"
            >
              ← 返回
            </button>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)" }}>
              {indexMode === "user" ? "用户索引" : "地图索引"}
            </span>
          </div>

          {/* ===== USER INDEX ===== */}
          {indexMode === "user" && (
            <div className="panel-card animate-slide-up" style={{ marginBottom: 10 }}>
              <h3 style={sectionTitle}>输入用户 ID</h3>
              <div style={{ display: "flex", gap: 6 }}>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}
                  placeholder="用户 ID（纯数字）" onKeyDown={(e) => { if (e.key === "Enter") handleLoadUserMaps(); }}
                  style={{ ...inputStyle, flex: 1 }} />
                <button onClick={handleLoadUserMaps} disabled={userMapsLoading} style={smallBtn}>
                  {userMapsLoading ? "加载中..." : "获取"}
                </button>
              </div>
              {userMapsError && <p style={{ fontSize: 11, color: "var(--color-error)", marginTop: 6 }}>{userMapsError}</p>}
              {userMaps.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--color-text-secondary)", cursor: "pointer" }}>
                      <input type="checkbox" checked={onlyOpenSource} onChange={e => setOnlyOpenSource(e.target.checked)} style={{ accentColor: "var(--color-accent)" }} />
                      仅展示开源计划作品
                    </label>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {userMaps
                      .filter(item => !onlyOpenSource || openSourceAuthors.has(String(item.authorId)))
                      .map((item) => (
                    <button key={item.contentId} onClick={() => handleSelectUserMap(item, selectedMapMode)} style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                      background: selectedMapId === item.contentId ? "var(--color-accent-bg)" : "var(--color-surface-elevated)",
                      border: "1px solid", borderColor: selectedMapId === item.contentId ? "var(--color-accent)" : "var(--color-border-light)",
                      borderRadius: R, cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.15s",
                    }}>
                      {item.preview ? (
                        <img src={item.preview} alt="" style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", objectFit: "cover", flexShrink: 0 }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      ) : (
                        <div style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "var(--color-base)", flexShrink: 0 }} />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                        <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 1 }}>ID: {item.contentId}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              )}
            </div>
          )}

          {/* ===== MAP INDEX ===== */}
          {indexMode === "map" && (
            <div className="panel-card animate-slide-up" style={{ marginBottom: 10 }}>
              <h3 style={sectionTitle}>输入地图 ID</h3>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <input type="text" value={mapIdInput} onChange={(e) => setMapIdInput(e.target.value)}
                  placeholder="地图 ID（纯数字）" onKeyDown={(e) => { if (e.key === "Enter") handleMapIdResolve(); }}
                  style={{ ...inputStyle, flex: 1 }} />
                <select value={mapIdMode} onChange={(e) => setMapIdMode(e.target.value as "play" | "edit")} style={{ ...selectStyle, width: "auto" }}>
                  <option value="play">游玩端</option>
                  <option value="edit">编辑端</option>
                </select>
                <button onClick={handleMapIdResolve} disabled={mapIdResolving || !mapIdInput.trim()}
                  style={{ ...smallBtn, opacity: !mapIdInput.trim() ? 0.5 : 1, cursor: mapIdResolving ? "wait" : "pointer" }}>
                  {mapIdResolving ? "..." : "解析"}
                </button>
              </div>
              {mapIdError && <p style={{ fontSize: 11, color: "var(--color-error)", marginTop: 6 }}>{mapIdError}</p>}
            </div>
          )}

          {/* ===== MAP INFO ===== */}
          {mapHash && (
            <div className="panel-card animate-slide-up" style={{ marginBottom: 10 }}>
              <h3 style={sectionTitle}>地图信息</h3>
              {/* Preview card */}
              <div style={{ display: "flex", gap: 12, marginBottom: mapPreview || mapAuthor ? 10 : 0 }}>
                {mapPreview && (
                  <div style={{
                    width: 120, minWidth: 120, height: 68, borderRadius: R,
                    overflow: "hidden", background: "var(--color-base)",
                    border: "1px solid var(--color-border-light)",
                  }}>
                    <img src={mapPreview} alt={mapName} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)", marginBottom: 2 }}>{mapName || "未知"}</div>
                  {mapDescription && (
                    <div style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{mapDescription}</div>
                  )}
                  {mapAuthor && (
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
                      {mapAuthorAvatar && (
                        <img src={mapAuthorAvatar} alt="" style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid var(--color-border-light)" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      )}
                      <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{mapAuthor}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Detail grid */}
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 10px", fontSize: 12 }}>
                <span style={{ color: "var(--color-text-tertiary)", fontWeight: 600 }}>Hash</span>
                <span style={{ fontFamily: "ui-monospace, monospace", color: "var(--color-accent)", fontSize: 11, wordBreak: "break-all" }}>{mapHash}</span>
                {branchesLoading && (
                  <>
                    <span style={{ color: "var(--color-text-tertiary)", fontWeight: 600 }}>分支</span>
                    <span style={{ color: "var(--color-text-tertiary)" }}>加载中...</span>
                  </>
                )}
              </div>
              {branches.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 6 }}>
                    分支（默认：<span style={{ color: "var(--color-accent)", fontWeight: 600 }}>{defaultBranch}</span>）
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    <button onClick={() => setSelectedBranch("")} style={{
                      padding: "3px 8px", fontSize: 11, borderRadius: R, border: "1px solid",
                      borderColor: !selectedBranch ? "var(--color-accent)" : "var(--color-border-light)",
                      background: !selectedBranch ? "var(--color-accent-bg)" : "var(--color-surface-elevated)",
                      color: !selectedBranch ? "var(--color-accent)" : "var(--color-text-secondary)",
                      cursor: "pointer", fontWeight: !selectedBranch ? 600 : 400,
                    }}>自动</button>
                    {branches.map((b) => (
                      <button key={b.key} onClick={() => setSelectedBranch(b.key)} style={{
                        padding: "3px 8px", fontSize: 11, borderRadius: R, border: "1px solid",
                        borderColor: selectedBranch === b.key ? "var(--color-accent)" : "var(--color-border-light)",
                        background: selectedBranch === b.key ? "var(--color-accent-bg)" : "var(--color-surface-elevated)",
                        color: selectedBranch === b.key ? "var(--color-accent)" : "var(--color-text-secondary)",
                        cursor: "pointer", fontWeight: selectedBranch === b.key ? 600 : 400,
                      }}>{b.label}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== EXPORT TYPE ===== */}
          {mapHash && (
            <div className="panel-card animate-slide-up" style={{ marginBottom: 10 }}>
              <h3 style={sectionTitle}>导出类型</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
                {EXPORT_TYPES.map((t) => (
                  <button key={t.key} onClick={() => setExportType(t.key)} disabled={exporting} style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                    padding: "8px 4px", borderRadius: R, border: "1px solid",
                    borderColor: exportType === t.key ? "var(--color-accent)" : "var(--color-border-light)",
                    background: exportType === t.key ? "var(--color-accent-bg)" : "var(--color-surface-elevated)",
                    cursor: exporting ? "not-allowed" : "pointer", textAlign: "center",
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={exportType === t.key ? "var(--color-accent)" : "var(--color-text-secondary)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={t.icon} />
                    </svg>
                    <span style={{ fontSize: 10, fontWeight: exportType === t.key ? 600 : 400, color: exportType === t.key ? "var(--color-accent)" : "var(--color-text-secondary)" }}>{t.label}</span>
                  </button>
                ))}
              </div>
              {currentType?.usage && (
                <div style={{ marginTop: 6, padding: "6px 8px", background: "var(--color-base)", borderRadius: R, fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  {currentType.usage}
                </div>
              )}
            </div>
          )}

          {/* ===== AUDIO OPTIONS ===== */}
          {mapHash && exportType === "audio" && (
            <div className="panel-card animate-slide-up" style={{ marginBottom: 10 }}>
              <label className="option-label">
                <div style={{
                  position: "relative", width: 14, height: 14, borderRadius: "var(--radius-sm)",
                  border: filterDefaultAudio ? "none" : "1.5px solid var(--color-border)",
                  background: filterDefaultAudio ? "var(--color-accent)" : "var(--color-surface-elevated)",
                  flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {filterDefaultAudio && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  <input type="checkbox" checked={filterDefaultAudio} onChange={() => setFilterDefaultAudio((v) => !v)} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                </div>
                <span style={{ fontSize: 12, color: "var(--color-text)" }}>包含预设音频</span>
              </label>
            </div>
          )}

          {/* ===== MODELS PANEL ===== */}
          {mapHash && exportType === "models" && (
            <div className="panel-card animate-slide-up" style={{ marginBottom: 10 }}>
              <h3 style={sectionTitle}>模型参数</h3>

              <div style={{ marginBottom: 8 }}>
                <label style={fieldLabel}><span style={{ color: "var(--color-error)" }}>*</span> 模型类型</label>
                <select value={modelType} onChange={(e) => setModelType(e.target.value as any)} style={selectStyle}>
                  <option value="0">个人模型</option>
                  <option value="1">公共库模型</option>
                  <option value="2">地图项目模型</option>
                </select>
              </div>

              {modelType === "2" && (
                <div style={{ marginBottom: 8 }}>
                  <label style={fieldLabel}>容器模式</label>
                  <select value={modelContainerMode} onChange={(e) => setModelContainerMode(e.target.value as any)} style={selectStyle}>
                    <option value="edit">编辑端</option>
                    <option value="play">游玩端</option>
                  </select>
                </div>
              )}

              <div style={{ marginBottom: 8 }}>
                <label style={fieldLabel}>创作模式</label>
                <select value={modelCreativeMode} onChange={(e) => setModelCreativeMode(e.target.value)} style={selectStyle}>
                  <option value="">不限</option>
                  <option value="1">自由模式</option>
                  <option value="2">换服模式</option>
                </select>
              </div>

              <div style={{ marginBottom: 8 }}>
                <label style={fieldLabel}>排序方式</label>
                <select value={modelOrderBy} onChange={(e) => setModelOrderBy(e.target.value)} style={selectStyle}>
                  <option value="0">创建时间倒序</option>
                  <option value="1">按名称排序</option>
                  <option value="2">修改时间倒序</option>
                </select>
              </div>

              {modelType === "1" && (
                <div style={{ marginBottom: 8 }}>
                  <label style={fieldLabel}>模型名称搜索</label>
                  <input type="text" value={modelName} onChange={(e) => setModelName(e.target.value)} placeholder="输入模型名称..." style={inputStyle} />
                </div>
              )}

              {modelType === "2" && !mapHash && (
                <div style={{ marginBottom: 8 }}>
                  <label style={fieldLabel}><span style={{ color: "var(--color-error)" }}>*</span> 地图 ID</label>
                  <input type="text" value={modelMapId} onChange={(e) => setModelMapId(e.target.value)} placeholder="输入地图 ID" style={inputStyle} />
                </div>
              )}
              {modelType === "2" && mapHash && (
                <div style={{ marginBottom: 8, padding: "6px 8px", background: "var(--color-accent-bg)", borderRadius: R, fontSize: 11, color: "var(--color-accent)", display: "flex", alignItems: "center", gap: 5 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  已关联当前地图 ID: {modelMapId}
                </div>
              )}

              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <label style={fieldLabel}>每页数量</label>
                  <input type="number" value={modelLimit} onChange={(e) => setModelLimit(e.target.value)} min="1" max="100" style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={fieldLabel}>偏移量</label>
                  <input type="number" value={modelOffset} onChange={(e) => setModelOffset(e.target.value)} min="0" style={inputStyle} />
                </div>
              </div>

              <button onClick={handleFetchModels} disabled={modelLoading || (modelType === "2" && !modelMapId && !mapHash)}
                className="export-btn"
                style={{ opacity: (modelType === "2" && !modelMapId && !mapHash) ? 0.5 : 1 }}>
                {modelLoading ? "获取中..." : "获取模型数据"}
              </button>
              {modelError && <p style={{ fontSize: 11, color: "var(--color-error)", marginTop: 6 }}>{modelError}</p>}

              {modelItems.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>
                      共 {modelCount} 个，已选 <span style={{ color: "var(--color-accent)" }}>{selectedModels.size || modelItems.length}</span> 个
                    </span>
                    <button onClick={toggleSelectAll} style={{ padding: "2px 8px", fontSize: 10, background: "var(--color-surface-elevated)", border: "1px solid var(--color-border-light)", borderRadius: R, color: "var(--color-text-secondary)", cursor: "pointer" }}>
                      {selectedModels.size === modelItems.length ? "取消全选" : "全选"}
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 240, overflowY: "auto" }}>
                    {modelItems.map((model) => (
                      <div key={model.modelId} onClick={() => toggleModelSelect(model.modelId)} style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                        background: selectedModels.has(model.modelId) ? "var(--color-accent-bg)" : "var(--color-surface-elevated)",
                        border: "1px solid", borderColor: selectedModels.has(model.modelId) ? "var(--color-accent)" : "var(--color-border-light)",
                        borderRadius: R, cursor: "pointer", transition: "all 0.15s",
                      }}>
                        {model.modelPreviewUrl ? (
                          <img src={model.modelPreviewUrl} alt="" style={{ width: 28, height: 28, borderRadius: "var(--radius-sm)", objectFit: "cover", flexShrink: 0 }}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        ) : (
                          <div style={{ width: 28, height: 28, borderRadius: "var(--radius-sm)", background: "var(--color-base)", flexShrink: 0 }} />
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{model.modelName || "未命名模型"}</div>
                          {model.projectFileHash && (
                            <div style={{ fontSize: 9, color: "var(--color-text-tertiary)", marginTop: 1, fontFamily: "ui-monospace, monospace" }}>
                              {model.projectFileHash.slice(0, 16)}...
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== EXPORT BUTTON ===== */}
          {mapHash && (
            <div style={{ marginTop: 12 }} className="animate-slide-up">
              <button onClick={handleExport} disabled={exporting || !canExport} className="export-btn" style={{
                background: done ? "var(--color-success)" : "var(--color-accent)",
                opacity: !canExport ? 0.5 : 1,
              }}>
                {done ? "导出完成" : exporting ? "导出中..." : exportType === "all" ? "开始导出" : `导出${currentType?.label || ""}`}
              </button>
            </div>
          )}

          {/* ===== PROGRESS & LOGS ===== */}
          {(exporting || logs.length > 0) && (
            <div style={{ marginTop: 12 }} className="animate-slide-up">
              {/* Progress bar */}
              <div style={{ marginBottom: 8 }}>
                <div style={{ height: 2, background: "var(--color-base)", borderRadius: 1, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 1, transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    width: pct + "%", background: done ? "var(--color-success)" : undefined,
                  }} className={!done && pct > 0 ? "progress-bar-active" : undefined} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
                    {progress.completed}/{progress.total}
                  </span>
                  <span style={{ fontSize: 10, color: done ? "var(--color-success)" : "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
                    {pct}%
                  </span>
                </div>
              </div>

              {/* Log panel */}
              <div ref={logRef} style={{
                background: "var(--color-base)", border: "1px solid var(--color-border-light)",
                borderRadius: R, padding: 8, maxHeight: 140, overflowY: "auto",
                fontSize: 10, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", lineHeight: 1.7,
              }}>
                {logs.map((l, i) => (
                  <div key={i} style={{
                    color: l.type === "ok" ? "var(--color-success)" : l.type === "err" ? "var(--color-error)" : l.type === "info" ? "var(--color-info)" : "var(--color-text-tertiary)",
                  }}>
                    <span style={{ color: "var(--color-text-tertiary)", opacity: 0.4 }}>{l.time}</span> {l.msg}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
}

export default function Dao3ExportPage() {
  return (
    <Suspense fallback={
      <PageLayout breadcrumb="Dao3 导出">
        <main style={{ flex: "1 1 0%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "var(--color-text-tertiary)", fontSize: 12 }}>加载中...</div>
        </main>
      </PageLayout>
    }>
      <Dao3ExportPageContent />
    </Suspense>
  );
}
