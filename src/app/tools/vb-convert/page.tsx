"use client";

import { useCallback, useMemo, useState } from "react";
import PageLayout from "../../../components/PageLayout";
import { parseVBProject, vbGetSize, vbNonZeroCount, vbToGlb, vbToObj, vbToStl, vbToVox, type VBProject } from "../../../lib/vbConvert";

type OutputFormat = "vox" | "obj" | "stl" | "glb";

const FORMAT_OPTIONS: { key: OutputFormat; label: string; ext: string; desc: string; icon: string }[] = [
  { key: "vox", label: "MagicaVoxel", ext: ".vox", desc: "体素编辑器原生格式", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { key: "obj", label: "Wavefront", ext: ".obj", desc: "通用3D模型格式", icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
  { key: "stl", label: "ASCII STL", ext: ".stl", desc: "3D打印标准格式", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" },
  { key: "glb", label: "glTF Binary", ext: ".glb", desc: "网页3D渲染格式", icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" },
];

export default function VbConvertPage() {
  const [format, setFormat] = useState<OutputFormat>("vox");
  const [fileName, setFileName] = useState("");
  const [vbProject, setVbProject] = useState<VBProject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const stats = useMemo(() => {
    if (!vbProject) return null;
    const [x, y, z] = vbGetSize(vbProject);
    return {
      size: `${x} × ${y} × ${z}`,
      voxels: vbNonZeroCount(vbProject),
      palettes: vbProject.HEXCOLORS.length,
    };
  }, [vbProject]);

  const handleFile = useCallback(async (file: File | null) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const vb = parseVBProject(parsed);
      if (!vb) {
        setVbProject(null);
        setFileName("");
        setError("无法识别这个 .vb 文件");
        return;
      }
      setVbProject(vb);
      setFileName(file.name.replace(/\.vb$/i, ""));
    } catch {
      setVbProject(null);
      setFileName("");
      setError("文件读取失败，请确认上传的是有效的 .vb JSON 文件");
    } finally {
      setBusy(false);
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (!vbProject || !fileName) return;

    let blob: Blob;
    if (format === "vox") {
      const arr = vbToVox(vbProject);
      blob = new Blob([new Uint8Array(arr)], { type: "application/octet-stream" });
    } else if (format === "obj") {
      blob = new Blob([vbToObj(vbProject)], { type: "text/plain;charset=utf-8" });
    } else if (format === "stl") {
      blob = new Blob([vbToStl(vbProject)], { type: "text/plain;charset=utf-8" });
    } else {
      const arr = vbToGlb(vbProject);
      blob = new Blob([new Uint8Array(arr)], { type: "model/gltf-binary" });
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  }, [fileName, format, vbProject]);

  return (
    <PageLayout breadcrumb="工具 / VB 格式转换">
      <main
        style={{
          flex: "1 1 0%",
          display: "flex",
          justifyContent: "center",
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 28,
          paddingBottom: 32,
        }}
      >
        <div style={{ width: "100%", maxWidth: 680, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="animate-slide-up" style={{ textAlign: "center", paddingTop: 12, paddingBottom: 8 }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "var(--radius-lg)", background: "var(--color-accent-bg)", marginBottom: 12 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.03em" }}>VB 格式转换</h1>
            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 6, lineHeight: 1.6 }}>
              上传 Box3 的 .vb 项目文件，转换为其他 3D 格式
            </p>
          </div>

          <section
            className="panel-card animate-slide-up"
            style={{ animationDelay: "0.04s" }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); void handleFile(e.dataTransfer.files[0] ?? null); }}
          >
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "28px 20px",
                border: dragOver ? "2px solid var(--color-accent)" : "1.5px dashed var(--color-border)",
                borderRadius: "var(--radius-lg)",
                background: dragOver ? "var(--color-accent-bg)" : "var(--color-base)",
                cursor: "pointer",
                transition: "border-color 0.25s var(--ease-out), background 0.25s var(--ease-out)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={dragOver ? "var(--color-accent)" : "var(--color-text-tertiary)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: dragOver ? "var(--color-accent)" : "var(--color-text)" }}>
                {busy ? "正在读取..." : "拖拽或点击上传 .vb 文件"}
              </span>
              <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>
                VBProject JSON 格式
              </span>
              <input type="file" accept=".vb,application/json" style={{ display: "none" }} onChange={(e) => void handleFile(e.target.files?.[0] ?? null)} />
            </label>

            {error && (
              <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: "var(--radius-md)", background: "var(--color-error-bg)", color: "var(--color-error)", fontSize: 12, lineHeight: 1.6 }}>
                {error}
              </div>
            )}

            {stats && (
              <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
                {[
                  { label: "尺寸", value: stats.size },
                  { label: "体素数", value: stats.voxels.toLocaleString() },
                  { label: "调色板", value: String(stats.palettes) },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--color-base)",
                      border: "1px solid var(--color-border-light)",
                    }}
                  >
                    <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", letterSpacing: "0.04em" }}>{item.label}</div>
                    <div style={{ marginTop: 4, fontSize: 14, fontWeight: 700, color: "var(--color-text)" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="panel-card animate-slide-up" style={{ animationDelay: "0.08s" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-tertiary)", letterSpacing: "0.06em", marginBottom: 10 }}>输出格式</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8 }}>
              {FORMAT_OPTIONS.map((option) => {
                const active = option.key === format;
                return (
                  <button
                    key={option.key}
                    onClick={() => setFormat(option.key)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      padding: "14px 8px",
                      background: active ? "var(--color-accent-bg)" : "var(--color-base)",
                      border: active ? "1.5px solid var(--color-accent)" : "1.5px solid var(--color-border-light)",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      transition: "border-color 0.25s var(--ease-out), background 0.25s var(--ease-out), transform 0.15s var(--ease-out)",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--color-accent)" : "var(--color-text-secondary)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={option.icon} />
                    </svg>
                    <div style={{ fontSize: 12, fontWeight: 700, color: active ? "var(--color-accent)" : "var(--color-text)", textAlign: "center" }}>
                      {option.ext}
                    </div>
                    <div style={{ fontSize: 9, color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.4 }}>
                      {option.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="panel-card animate-slide-up" style={{ animationDelay: "0.12s" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>输出文件</div>
                <div style={{ marginTop: 4, fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em", color: vbProject ? "var(--color-text)" : "var(--color-text-tertiary)" }}>
                  {fileName ? `${fileName}.${format}` : `untitled.${format}`}
                </div>
              </div>
              {vbProject && (
                <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", textAlign: "right", lineHeight: 1.6 }}>
                  {FORMAT_OPTIONS.find((o) => o.key === format)?.label}
                </div>
              )}
            </div>

            <button
              onClick={handleDownload}
              disabled={!vbProject || !fileName}
              className="export-btn"
              style={{
                background: !vbProject || !fileName ? "var(--color-border)" : "var(--color-accent)",
                cursor: !vbProject || !fileName ? "not-allowed" : "pointer",
              }}
            >
              {vbProject ? `下载 ${FORMAT_OPTIONS.find((o) => o.key === format)?.ext}` : "请先上传文件"}
            </button>
          </section>
        </div>
      </main>
    </PageLayout>
  );
}