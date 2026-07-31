"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import PageLayout from "../../../components/PageLayout";
import { fetchBlock, fetchBlockByHash, isQmHash, cleanHash, type CurrentMap } from "../../../lib/api";
import { exportBox3Map, type Box3ExportOptions, DEFAULT_BOX3_OPTIONS } from "../../../lib/box3Export";

export default function Box3ExportPage() {
  const [hash, setHash] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [currentMap, setCurrentMap] = useState<CurrentMap | null>(null);
  const [options, setOptions] = useState<Box3ExportOptions>({ ...DEFAULT_BOX3_OPTIONS });
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [logs, setLogs] = useState<{ msg: string; type: string; time: string }[]>([]);
  const [done, setDone] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs.length]);

  const addLog = useCallback((msg: string, type: string = "") => {
    const time = new Date().toLocaleTimeString();
    setLogs((p) => [...p, { msg, type, time }]);
  }, []);

  const handleSearch = useCallback(async () => {
    const q = hash.trim();
    if (!q) { setError("请输入 Hash 或地图链接"); return; }
    setSearching(true);
    setError("");
    setCurrentMap(null);
    setLogs([]);
    setDone(false);

    try {
      let mapHash = q;
      // Try to extract hash from URL
      const urlMatch = q.match(/\/map\/([A-Za-z0-9]+)/);
      if (urlMatch) mapHash = urlMatch[1];

      addLog("正在解析: " + mapHash, "info");

      const h = cleanHash(mapHash);
      let blockData = isQmHash(h) ? await fetchBlock(h) : await fetchBlockByHash(h);

      if (!blockData) throw new Error("无法获取数据块");

      let mapName = "未命名地图";
      let authorName = "";
      let authorId = 0;
      let description = "";
      let projectHash: string | undefined;

      if (blockData.type === "permission" && blockData.versionControl) {
        addLog("数据类型: 权限块, 正在解析...", "info");
        const vcData = await fetchBlock(blockData.versionControl);
        let ph: string | null = null;

        if (vcData?.headHash) ph = vcData.headHash;
        if (!ph && vcData?.branches) {
          for (const bk of Object.keys(vcData.branches)) {
            const b = vcData.branches[bk];
            if (b.headHash) { ph = b.headHash; break; }
            if (b.hash) { ph = b.hash; break; }
          }
        }

        if (ph) {
          const pd = await fetchBlock(ph);
          if (pd?.type === "project") {
            blockData = pd;
            projectHash = ph;
          }
        }
      }

      if (blockData.type === "project") {
        projectHash = projectHash || mapHash;
        if (blockData.info) {
          let info = blockData.info;
          if (typeof info === "string") {
            try { info = await fetchBlock(cleanHash(info)); } catch {}
          }
          if (info) {
            mapName = info.displayName || info.name || info.title || mapName;
            description = info.description || info.describe || "";
          }
        }
      }

      addLog("解析成功: " + mapName, "ok");
      setCurrentMap({
        name: mapName,
        hash: mapHash,
        projectHash,
        author_name: authorName,
        author_id: authorId,
        describe: description,
      });
    } catch (e: any) {
      setError(e.message || "解析失败");
      addLog("解析失败: " + e.message, "err");
    } finally {
      setSearching(false);
    }
  }, [hash, addLog]);

  const handleExport = useCallback(async () => {
    if (!currentMap) return;
    setExporting(true);
    setDone(false);
    setLogs([]);
    setProgress({ completed: 0, total: 0 });

    try {
      const r = await exportBox3Map({ ...currentMap }, options, addLog, (c, t) => setProgress({ completed: c, total: t }));
      setProgress({ completed: r.total || 1, total: r.total || 1 });
      const u = URL.createObjectURL(r.blob);
      const a = document.createElement("a");
      a.href = u;
      a.download = r.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(u), 5000);
      addLog("下载: " + r.fileName, "ok");
      setDone(true);
    } catch (e: any) {
      addLog("导出失败: " + e.message, "err");
    } finally {
      setExporting(false);
    }
  }, [currentMap, options, addLog]);

  const handleReset = useCallback(() => {
    setCurrentMap(null);
    setLogs([]);
    setDone(false);
    setProgress({ completed: 0, total: 0 });
    setError("");
  }, []);

  const toggle = useCallback((key: keyof Box3ExportOptions) => setOptions((p) => ({ ...p, [key]: !p[key] })), []);
  const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

  return (
    <PageLayout breadcrumb="Box3 导出" navActions={
      currentMap ? (
        <button onClick={handleReset} className="back-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          返回
        </button>
      ) : undefined
    }>
      <main style={{ flex: "1 1 0%", paddingTop: 24, paddingBottom: 40 }}>
        <div style={{ width: "100%", maxWidth: 672, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24 }}>

          {/* Header */}
          <div className="animate-slide-up" style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: "var(--radius-lg)", background: "var(--color-accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.02em" }}>Box3 地图导出</h2>
            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 6, lineHeight: 1.6 }}>
              输入地图 Hash 或链接，一键导出所有文件
            </p>
          </div>

          {/* Search Input */}
          <div className="panel-card animate-slide-up" style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                placeholder="输入地图 Hash 或链接..."
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                disabled={exporting}
                style={{ flex: 1, padding: "9px 12px", fontSize: 12, background: "var(--color-base)", border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-md)", color: "var(--color-text)", outline: "none" }}
              />
              <button
                onClick={handleSearch}
                disabled={searching || !hash.trim()}
                className="export-btn"
                style={{ background: "var(--color-accent)", cursor: searching || !hash.trim() ? "not-allowed" : "pointer", opacity: !hash.trim() ? 0.5 : 1, width: "auto", padding: "9px 18px", whiteSpace: "nowrap" }}
              >
                {searching ? "解析中..." : "搜索"}
              </button>
            </div>
          </div>

          {error && <p style={{ fontSize: 12, color: "var(--color-error)", marginBottom: 12, textAlign: "center" }}>{error}</p>}

          {/* Map Info Card */}
          {currentMap && (
            <div className="panel-card animate-slide-up" style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text)" }}>{currentMap.name}</div>
              {currentMap.describe && (
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{currentMap.describe}</div>
              )}
              <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 6, fontFamily: "ui-monospace, monospace", wordBreak: "break-all" }}>
                Hash: {currentMap.hash}
              </div>
              {currentMap.projectHash && currentMap.projectHash !== currentMap.hash && (
                <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 2, fontFamily: "ui-monospace, monospace", wordBreak: "break-all" }}>
                  Project: {currentMap.projectHash}
                </div>
              )}
            </div>
          )}

          {/* Export Options */}
          {currentMap && (
            <div className="panel-card animate-slide-up" style={{ marginTop: 12 }}>
              <h3 style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>导出选项</h3>

              {/* Resource Options */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 3 }}>资源文件</div>
                <label className="option-label">
                  <div style={{ position: "relative", width: 14, height: 14, borderRadius: "var(--radius-sm)", border: options.optAssets ? "none" : "1.5px solid var(--color-border)", background: options.optAssets ? "var(--color-accent)" : "var(--color-surface-elevated)", flexShrink: 0, transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {options.optAssets && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    <input type="checkbox" checked={options.optAssets} onChange={() => toggle("optAssets")} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 12, color: "var(--color-text)", lineHeight: 1.3 }}>下载资源文件</span>
                    <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginLeft: 6 }}>模型.vox + 音频.mp3 + 粒子 + 滤镜</span>
                  </div>
                </label>
              </div>

              {/* Script Options */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 3 }}>脚本代码</div>
                <label className="option-label">
                  <div style={{ position: "relative", width: 14, height: 14, borderRadius: "var(--radius-sm)", border: options.optScripts ? "none" : "1.5px solid var(--color-border)", background: options.optScripts ? "var(--color-accent)" : "var(--color-surface-elevated)", flexShrink: 0, transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {options.optScripts && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    <input type="checkbox" checked={options.optScripts} onChange={() => toggle("optScripts")} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 12, color: "var(--color-text)", lineHeight: 1.3 }}>下载脚本代码</span>
                    <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginLeft: 6 }}>.js 脚本文件</span>
                  </div>
                </label>
              </div>

              {/* JSON Options */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 3 }}>JSON 配置</div>
                <label className="option-label">
                  <div style={{ position: "relative", width: 14, height: 14, borderRadius: "var(--radius-sm)", border: options.optAllJson ? "none" : "1.5px solid var(--color-border)", background: options.optAllJson ? "var(--color-accent)" : "var(--color-surface-elevated)", flexShrink: 0, transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {options.optAllJson && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    <input type="checkbox" checked={options.optAllJson} onChange={() => toggle("optAllJson")} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 12, color: "var(--color-text)", lineHeight: 1.3 }}>下载所有 JSON 配置</span>
                    <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginLeft: 6 }}>实体/环境/地形/物理等</span>
                  </div>
                </label>
              </div>

              {/* Voxel Rename */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 3 }}>模型格式</div>
                <label className="option-label">
                  <div style={{ position: "relative", width: 14, height: 14, borderRadius: "var(--radius-sm)", border: options.optVoxRename ? "none" : "1.5px solid var(--color-border)", background: options.optVoxRename ? "var(--color-accent)" : "var(--color-surface-elevated)", flexShrink: 0, transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {options.optVoxRename && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    <input type="checkbox" checked={options.optVoxRename} onChange={() => toggle("optVoxRename")} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 12, color: "var(--color-text)", lineHeight: 1.3 }}>模型 .vb 保存为 .vox 格式</span>
                  </div>
                </label>
              </div>

              {/* Voxel Merge */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 3 }}>地形数据</div>
                <label className="option-label">
                  <div style={{ position: "relative", width: 14, height: 14, borderRadius: "var(--radius-sm)", border: options.optVoxelsMerge ? "none" : "1.5px solid var(--color-border)", background: options.optVoxelsMerge ? "var(--color-accent)" : "var(--color-surface-elevated)", flexShrink: 0, transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {options.optVoxelsMerge && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    <input type="checkbox" checked={options.optVoxelsMerge} onChange={() => toggle("optVoxelsMerge")} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 12, color: "var(--color-text)", lineHeight: 1.3 }}>合并建筑.gz</span>
                    <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginLeft: 6 }}>合并 voxels 区块为 voxel-sparse.gz</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Export Button */}
          {currentMap && (
            <div style={{ marginTop: 16 }} className="animate-slide-up">
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleExport}
                  disabled={exporting}
                  className="export-btn"
                  style={{ flex: 1, background: done ? "var(--color-success)" : exporting ? "color-mix(in srgb, var(--color-accent) 70%, white)" : "var(--color-accent)", cursor: exporting ? "wait" : "pointer" }}
                >
                  {done ? "导出完成" : exporting ? "正在导出..." : "开始导出"}
                </button>
                <button
                  onClick={handleReset}
                  className="export-btn"
                  style={{ background: "var(--color-surface-elevated)", color: "var(--color-text-secondary)", cursor: "pointer", width: "auto", padding: "9px 18px" }}
                >
                  重置
                </button>
              </div>
            </div>
          )}

          {/* Progress */}
          {(exporting || logs.length > 0) && (
            <div style={{ marginTop: 16 }} className="animate-slide-up">
              <div style={{ marginBottom: 12 }}>
                <div style={{ height: 3, background: "var(--color-base)", borderRadius: 2, overflow: "hidden" }}>
                  <div
                    style={{ height: "100%", borderRadius: 2, transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)", width: pct + "%", background: done ? "var(--color-success)" : undefined }}
                    className={!done && pct > 0 ? "progress-bar-active" : undefined}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>{progress.completed} / {progress.total}</span>
                  <span style={{ fontSize: 11, color: done ? "var(--color-success)" : "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>{pct}%</span>
                </div>
              </div>

              {/* Logs */}
              <div
                ref={logRef}
                style={{ background: "var(--color-base)", border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-md)", padding: 12, maxHeight: 176, overflowY: "auto", fontSize: 11, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", lineHeight: 1.7 }}
              >
                {logs.map((l, i) => (
                  <div key={i} style={{ color: l.type === "ok" ? "var(--color-success)" : l.type === "err" ? "var(--color-error)" : l.type === "info" ? "var(--color-info)" : "var(--color-text-tertiary)" }}>
                    <span style={{ color: "var(--color-text-tertiary)", opacity: 0.5 }}>[{l.time}]</span> {l.msg}
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
