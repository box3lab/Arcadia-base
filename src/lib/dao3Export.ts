import {
  fetchBlock,
  fetchBlockBinary,
  fetchBlockByHash,
  fetchBlockBinaryByHash,
  cleanHash,
  isQmHash,
  BASE_URL,
  ASSETS_URL,
} from "./api";
import { buildSparseVoxels } from "./voxel";
import { gzip } from "pako";

export type Dao3ExportType = "all" | "build" | "code" | "models" | "audio" | "image" | "worldconfig";

export interface Dao3ExportOptions {
  exportType: Dao3ExportType;
  /** Permission hash (from map ID or direct input) */
  hash: string;
  /** Selected branch key */
  branchKey?: string;
  /** Filter default audio */
  filterDefaultAudio?: boolean;
  /** Map ID (numeric), used for model fetching in "all" export */
  mapId?: number;
}

// ====== resolveProjectFromPermission (Box3Lab style) ======
// Matches Box3Lab's fetchSparseVoxelFromPermission exactly:
//   1) versionControl is string → fetch VC → get branch → fetch project head
//   2) type === "permissions" && versionControl.headHash exists → use headHash directly
//   3) otherwise → resolveMetaFromProject directly

export async function resolveProjectFromPermission(
  hash: string,
  branchKey?: string,
): Promise<any> {
  const h = cleanHash(hash);
  const blockData = isQmHash(h) ? await fetchBlock(h) : await fetchBlockByHash(h);

  if (!blockData || typeof blockData !== "object") {
    throw new Error("无法解析地图数据");
  }

  // Case 1: versionControl is a string hash → fetch VC block, then branch, then project
  if (typeof blockData.versionControl === "string") {
    const vcBlock = await fetchBlock(blockData.versionControl);
    const branch = branchKey || vcBlock.currentBranch;
    const branchData = vcBlock.branches?.[branch];
    if (!branchData) throw new Error("分支 " + branch + " 不存在");
    if (!branchData.headHash) throw new Error("分支 " + branch + " 没有 headHash");
    return await fetchBlock(branchData.headHash);
  }

  // Case 2: type === "permissions" && versionControl.headHash exists (inline VC)
  if (
    blockData.type === "permissions" &&
    blockData.versionControl &&
    typeof blockData.versionControl.headHash === "string"
  ) {
    return await fetchBlock(blockData.versionControl.headHash);
  }

  // Case 3: directly a project block or other block
  return blockData;
}

// ====== Export: Build (voxel-sparse.gz) ======

export async function exportBuild(
  options: Dao3ExportOptions,
  onLog: (m: string, t?: string) => void,
  onProgress: (current: number, total: number) => void,
): Promise<{ blob: Blob; fileName: string }> {
  onLog("正在解析项目数据...", "info");

  const projectData = await resolveProjectFromPermission(options.hash, options.branchKey);
  if (!projectData?.voxels) throw new Error("项目缺少 voxels 字段");

  // Resolve voxels if it's a hash
  let voxelsObj = projectData.voxels;
  if (typeof voxelsObj === "string") {
    onLog("正在获取体素数据...", "info");
    voxelsObj = await fetchBlock(voxelsObj);
  }
  if (!voxelsObj?.chunks || !voxelsObj.shape) throw new Error("无效的体素数据格式");

  onLog("正在拉取建筑体素稀疏数据...", "info");

  const sparse = await buildSparseVoxels(voxelsObj, fetchBlockBinary, (p, t) => {
    onProgress(p, t);
    onLog(`正在拉取建筑数据（${p}/${t}）...`, "info");
  });

  onLog("数据拉取完成，正在生成地形压缩文件...", "info");
  const jsonStr = JSON.stringify(sparse);
  const gz = gzip(jsonStr, { level: 9 } as any);
  const blob = new Blob([gz], { type: "application/gzip" });

  onLog("转换完成，已导出 voxel-sparse.gz（文件名可任意修改，内容请勿修改。）", "ok");
  return { blob, fileName: "voxel-sparse.gz" };
}

// ====== Export: Code (scripts zip) ======

export async function exportCode(
  options: Dao3ExportOptions,
  onLog: (m: string, t?: string) => void,
  onProgress: (current: number, total: number) => void,
): Promise<{ blob: Blob; fileName: string }> {
  onLog("正在获取版本控制信息...", "info");

  const projectData = await resolveProjectFromPermission(options.hash, options.branchKey);
  if (!projectData.scriptAssets) throw new Error("该地图没有脚本资源");

  onLog("正在加载脚本文件列表...", "info");
  let scriptIndex: any;
  if (typeof projectData.scriptAssets === "string") {
    scriptIndex = await fetchBlock(projectData.scriptAssets);
  } else {
    scriptIndex = projectData.scriptAssets;
  }

  const entries = Object.entries(scriptIndex);
  if (!entries.length) throw new Error("脚本资源索引为空");

  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  const folder = zip.folder("scripts")!;

  const safeName = (n: string) => n.replace(/[\\/:*?"<>|]+/g, "_").slice(0, 180);

  for (let i = 0; i < entries.length; i++) {
    const [key, info] = entries[i] as [string, any];
    onProgress(i + 1, entries.length);
    onLog(`下载脚本文件（${i + 1}/${entries.length}）...`, "info");

    // Box3Lab: Qm hash → BASE_URL + hash, else → ASSETS_URL + "s/" + hash
    const h = cleanHash(info.hash);
    let url: string;
    if (isQmHash(h)) {
      url = BASE_URL + h;
    } else {
      url = ASSETS_URL + "s/" + encodeURIComponent(h);
    }

    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const blob = await resp.blob();
        folder.file(safeName(key), blob);
      } else {
        onLog("下载脚本 " + key + " 失败: HTTP " + resp.status, "err");
      }
    } catch (e: any) {
      onLog("下载脚本 " + key + " 失败: " + e.message, "err");
    }
  }

  onLog("正在打包 zip...", "info");
  const blob = await zip.generateAsync({ type: "blob" });
  const branchSuffix = options.branchKey || "master";
  onLog("脚本导出完成!", "ok");
  return { blob, fileName: `map-scripts-${branchSuffix}.zip` };
}

// ====== Export: Audio ======

const DEFAULT_AUDIO_LIST = [
  "audio/airhorn.mp3", "audio/boo.mp3", "audio/boost.mp3", "audio/break_block.mp3",
  "audio/chat.mp3", "audio/checkpoint.mp3", "audio/die.mp3", "audio/door_close.mp3",
  "audio/door_open.mp3", "audio/double_jump.mp3", "audio/drama.mp3", "audio/electric.mp3",
  "audio/elephant.mp3", "audio/explode.mp3", "audio/goal.mp3", "audio/gunshot.mp3",
  "audio/hit.mp3", "audio/hurt.mp3", "audio/jump.mp3", "audio/land.mp3", "audio/laugh.mp3",
  "audio/place_block.mp3", "audio/punch.mp3", "audio/rain.mp3", "audio/rooster.mp3",
  "audio/sad_trombone.mp3", "audio/scream.mp3", "audio/spawn.mp3", "audio/step.mp3",
  "audio/swim.mp3", "audio/sword1.mp3", "audio/sword2.mp3", "audio/whistle.mp3",
  "audio/wolf.mp3",
];

export async function exportAudio(
  options: Dao3ExportOptions,
  onLog: (m: string, t?: string) => void,
  onProgress: (current: number, total: number) => void,
): Promise<{ blob: Blob; fileName: string }> {
  onLog("正在获取项目数据...", "info");

  const projectData = await resolveProjectFromPermission(options.hash, options.branchKey);
  const audioAssetsHash = projectData.audioAssets;
  if (!audioAssetsHash) throw new Error("该地图没有音频资源");

  onLog("正在加载音频资源索引...", "info");
  let audioIndex: any;
  if (typeof audioAssetsHash === "string") {
    audioIndex = await fetchBlock(audioAssetsHash);
  } else {
    audioIndex = audioAssetsHash;
  }

  let entries = Object.entries(audioIndex) as [string, any][];
  if (options.filterDefaultAudio) {
    entries = entries.filter(([k]) => !DEFAULT_AUDIO_LIST.includes(k));
  }
  if (!entries.length) throw new Error("音频资源索引为空");

  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  const folder = zip.folder("audios")!;

  const safeName = (n: string) => n.replace(/[\\/:*?"<>|]+/g, "_").slice(0, 180);
  const fileExt = (url: string) => { const m = url.split("?")[0].split("#")[0]; const i = m.lastIndexOf("."); return i < 0 ? "" : m.slice(i + 1).toLowerCase(); };
  const baseName = (url: string) => { const p = url.split("?")[0].split("#")[0].split("/"); return p[p.length - 1] || "file"; };

  // Deduplicate names (Box3Lab style)
  const nameMap = new Map<string, number>();
  const uniqueNames: string[] = [];
  for (const [key] of entries) {
    const raw = safeName(baseName(key));
    const ext = fileExt(key);
    const fullName = raw + (ext ? "." + ext : "");
    const count = nameMap.get(fullName) ?? 0;
    nameMap.set(fullName, count + 1);
    if (count === 0) {
      uniqueNames.push(fullName);
    } else {
      const nameBase = ext ? raw.slice(0, -(ext.length + 1)) : raw;
      uniqueNames.push(`${nameBase}_${count + 1}${ext ? "." + ext : ""}`);
    }
  }

  for (let i = 0; i < entries.length; i++) {
    const [key, info] = entries[i];
    onProgress(i + 1, entries.length);
    onLog(`下载资源（${i + 1}/${entries.length}）...`, "info");

    // Box3Lab: audio URL is always BASE_URL + encodeURIComponent(hash)
    const url = BASE_URL + encodeURIComponent(info.hash);

    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const blob = await resp.blob();
        folder.file(uniqueNames[i] || safeName(baseName(key)), blob);
      } else {
        onLog("下载 " + key + " 失败: HTTP " + resp.status, "err");
      }
    } catch (e: any) {
      onLog("下载 " + key + " 失败: " + e.message, "err");
    }
  }

  onLog("正在打包 zip...", "info");
  const blob = await zip.generateAsync({ type: "blob" });
  const branchSuffix = options.branchKey || "master";
  onLog("音频导出完成!", "ok");
  return { blob, fileName: `map-${branchSuffix}-audios.zip` };
}

// ====== Export: Image ======

export async function exportImage(
  options: Dao3ExportOptions,
  onLog: (m: string, t?: string) => void,
  onProgress: (current: number, total: number) => void,
): Promise<{ blob: Blob; fileName: string }> {
  onLog("正在获取项目数据...", "info");

  const projectData = await resolveProjectFromPermission(options.hash, options.branchKey);
  const pictureAssetsHash = projectData.pictureAssets;
  if (!pictureAssetsHash) throw new Error("该地图没有图片资源");

  onLog("正在加载图片资源索引...", "info");
  let picIndex: any;
  if (typeof pictureAssetsHash === "string") {
    picIndex = await fetchBlock(pictureAssetsHash);
  } else {
    picIndex = pictureAssetsHash;
  }

  const entries = Object.entries(picIndex) as [string, any][];
  if (!entries.length) throw new Error("图片资源索引为空");

  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  const folder = zip.folder("images")!;

  const safeName = (n: string) => n.replace(/[\\/:*?"<>|]+/g, "_").slice(0, 180);
  const fileExt = (url: string) => { const m = url.split("?")[0].split("#")[0]; const i = m.lastIndexOf("."); return i < 0 ? "" : m.slice(i + 1).toLowerCase(); };
  const baseName = (url: string) => { const p = url.split("?")[0].split("#")[0].split("/"); return p[p.length - 1] || "file"; };

  // Deduplicate names
  const nameMap = new Map<string, number>();
  const uniqueNames: string[] = [];
  for (const [key] of entries) {
    const raw = safeName(baseName(key));
    const ext = fileExt(key);
    const fullName = raw + (ext ? "." + ext : "");
    const count = nameMap.get(fullName) ?? 0;
    nameMap.set(fullName, count + 1);
    if (count === 0) {
      uniqueNames.push(fullName);
    } else {
      const nameBase = ext ? raw.slice(0, -(ext.length + 1)) : raw;
      uniqueNames.push(`${nameBase}_${count + 1}${ext ? "." + ext : ""}`);
    }
  }

  for (let i = 0; i < entries.length; i++) {
    const [key, info] = entries[i];
    onProgress(i + 1, entries.length);
    onLog(`下载资源（${i + 1}/${entries.length}）...`, "info");

    // Box3Lab: image uses previewImage if available, else BASE_URL + hash
    let url: string;
    if (info.previewImage) {
      url = ASSETS_URL + "m/" + encodeURIComponent(info.previewImage);
    } else {
      url = BASE_URL + encodeURIComponent(info.hash);
    }

    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const blob = await resp.blob();
        folder.file(uniqueNames[i] || safeName(baseName(key)), blob);
      } else {
        onLog("下载 " + key + " 失败: HTTP " + resp.status, "err");
      }
    } catch (e: any) {
      onLog("下载 " + key + " 失败: " + e.message, "err");
    }
  }

  onLog("正在打包 zip...", "info");
  const blob = await zip.generateAsync({ type: "blob" });
  const branchSuffix = options.branchKey || "master";
  onLog("图片导出完成!", "ok");
  return { blob, fileName: `map-${branchSuffix}-images.zip` };
}

// ====== Export: Models (glTF) ======

export interface ModelItem {
  modelId: number;
  modelName: string;
  modelDescription: string;
  modelPreviewUrl: string;
  projectFileHash: string;
}

// Type for the vcode-gltf-standalone vendor module
declare global {
  interface Window {
    exportVCodeToGltf?: (hash: string) => Promise<{
      hash: string;
      fileName: string;
      gltfText: string;
      summary: {
        paletteCount: number;
        emissiveCount: number;
        nodeCount: number;
        meshCount: number;
        voxelCount: number;
      };
    }>;
  }
}

let vcodeGltfLoaded = false;

/** Ensure the vcode-gltf-standalone vendor script is loaded */
async function ensureVcodeGltfLoader(): Promise<NonNullable<typeof window.exportVCodeToGltf>> {
  if (window.exportVCodeToGltf) return window.exportVCodeToGltf;

  if (!vcodeGltfLoaded) {
    vcodeGltfLoaded = true;
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "/vendor/vcode-gltf-standalone.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("加载模型转换模块失败"));
      document.head.appendChild(script);
    });
  }

  // Wait for the function to be available
  for (let i = 0; i < 50; i++) {
    if (window.exportVCodeToGltf) return window.exportVCodeToGltf;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error("模型转换模块加载超时");
}

export async function exportModels(
  modelItems: ModelItem[],
  onLog: (m: string, t?: string) => void,
  onProgress: (current: number, total: number) => void,
): Promise<{ blob: Blob; fileName: string }> {
  if (!modelItems.length) throw new Error("没有可导出的模型");

  onLog("正在加载模型转换模块...", "info");
  const exportVCodeToGltf = await ensureVcodeGltfLoader();
  onLog("模型转换模块加载完成", "info");

  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  const errors: { hash: string; message: string }[] = [];

  for (let i = 0; i < modelItems.length; i++) {
    const item = modelItems[i];
    onProgress(i + 1, modelItems.length);
    onLog(`正在导出：${item.modelName || item.projectFileHash}`, "info");

    if (!item.projectFileHash) {
      errors.push({ hash: "", message: "该模型没有V口令，无法导出" });
      onLog("该模型没有V口令，无法导出: " + (item.modelName || "未命名"), "err");
      continue;
    }

    try {
      // Use Box3Lab's VoXa → glTF conversion pipeline
      const result = await exportVCodeToGltf(item.projectFileHash);
      const safeFileName = (item.modelName || item.projectFileHash).replace(/[\\/:*?"<>|]+/g, "_").slice(0, 180);
      const gltfBlob = new Blob([result.gltfText], { type: "model/gltf+json;charset=utf-8" });
      zip.file(`${safeFileName}.gltf`, gltfBlob);
      onLog(`  → ${result.summary.meshCount} 个 mesh，${result.summary.voxelCount} 个体素`, "info");
    } catch (e: any) {
      errors.push({ hash: item.projectFileHash, message: e.message });
      onLog("导出失败 " + (item.modelName || item.projectFileHash) + ": " + e.message, "err");
    }
  }

  onLog("正在打包 zip...", "info");
  const blob = await zip.generateAsync({ type: "blob" });

  if (errors.length) {
    onLog(`导出完成（${errors.length} 个模型跳过）`, "ok");
  } else {
    onLog("模型导出完成!", "ok");
  }

  return { blob, fileName: `models-gltf-batch-${Date.now()}.zip` };
}

// ====== Export: World Config (世界配置) ======
// Exports the full project configuration as JSON, including all metadata,
// settings, and asset references. Equivalent to Box3Lab's dataspace export.

export async function exportWorldConfig(
  options: Dao3ExportOptions,
  onLog: (m: string, t?: string) => void,
  onProgress: (current: number, total: number) => void,
): Promise<{ blob: Blob; fileName: string }> {
  onLog("正在解析项目数据...", "info");

  const h = cleanHash(options.hash);
  const blockData = isQmHash(h) ? await fetchBlock(h) : await fetchBlockByHash(h);

  if (!blockData || typeof blockData !== "object") {
    throw new Error("无法解析地图数据");
  }

  onProgress(1, 3);

  // Collect all related blocks: permission → versionControl → project → info
  const collected: Record<string, any> = {};
  collected.permission = blockData;

  // Resolve version control
  let vcBlock: any = null;
  if (typeof blockData.versionControl === "string") {
    onLog("正在获取版本控制信息...", "info");
    vcBlock = await fetchBlock(blockData.versionControl);
    collected.versionControl = vcBlock;
  } else if (blockData.versionControl && typeof blockData.versionControl === "object") {
    collected.versionControl = blockData.versionControl;
  }

  onProgress(2, 3);

  // Resolve project
  const projectData = await resolveProjectFromPermission(options.hash, options.branchKey);
  collected.project = projectData;

  // Resolve info block if available
  if (projectData?.info) {
    onLog("正在获取地图信息...", "info");
    try {
      const infoHash = typeof projectData.info === "string" ? projectData.info : projectData.info.hash;
      if (infoHash) {
        const infoBlock = await fetchBlock(infoHash);
        collected.info = infoBlock;
      }
    } catch {}
  }

  onProgress(3, 3);

  const jsonStr = JSON.stringify(collected, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });

  const branchSuffix = options.branchKey || "master";
  onLog("世界配置导出完成!", "ok");
  return { blob, fileName: `world-config-${branchSuffix}.json` };
}

// ====== Export: All (complete tree) ======
// Builds the full project data tree, matching the structure:
// block.json, deleteAssets.json, entities.json, environment.json,
// gamepad.json, info.json, mapName.txt, permission.json, physics.json,
// pictureAssets.json, player.json, scriptAssets.json, uiTree.json,
// versionControl.json, voxel-sparse.gz, zones.json
// Plus all downloadable assets (scripts, audio, images, models).

async function fetchBlockToJSON(hash: string): Promise<any> {
  if (!hash) return null;
  try {
    const h = cleanHash(hash);
    return isQmHash(h) ? await fetchBlock(h) : await fetchBlockByHash(h);
  } catch { return null; }
}

/** Helper: export a single project's data tree into a zip folder */
async function exportProjectTree(
  zip: InstanceType<typeof import("jszip").default>,
  projectData: any,
  onLog: (m: string, t?: string) => void,
  onProgress: (current: number, total: number) => void,
  progressBase: number,
  progressSpan: number,
  mapId?: number,
): Promise<void> {
  const configFolder = zip.folder("config")!;
  const assetsFolder = zip.folder("assets")!;

  // Config files
  if (projectData?.info) {
    onLog("正在获取地图信息...", "info");
    const infoBlock = await fetchBlockToJSON(
      typeof projectData.info === "string" ? projectData.info : projectData.info.hash
    );
    if (infoBlock) configFolder.file("info.json", JSON.stringify(infoBlock, null, 2));
    const displayName = typeof projectData.info === "object" ? projectData.info.displayName : null;
    if (displayName) configFolder.file("mapName.txt", displayName);
  }

  if (projectData?.environment) {
    const envBlock = await fetchBlockToJSON(
      typeof projectData.environment === "string" ? projectData.environment : projectData.environment.hash
    );
    if (envBlock) configFolder.file("environment.json", JSON.stringify(envBlock, null, 2));
  }

  if (projectData?.physics) {
    const physBlock = await fetchBlockToJSON(
      typeof projectData.physics === "string" ? projectData.physics : projectData.physics.hash
    );
    if (physBlock) configFolder.file("physics.json", JSON.stringify(physBlock, null, 2));
  }

  if (projectData?.player) {
    const playerBlock = await fetchBlockToJSON(
      typeof projectData.player === "string" ? projectData.player : projectData.player.hash
    );
    if (playerBlock) configFolder.file("player.json", JSON.stringify(playerBlock, null, 2));
  }

  if (projectData?.gamepad) {
    const gpBlock = await fetchBlockToJSON(
      typeof projectData.gamepad === "string" ? projectData.gamepad : projectData.gamepad.hash
    );
    if (gpBlock) configFolder.file("gamepad.json", JSON.stringify(gpBlock, null, 2));
  }

  if (projectData?.uiTree) {
    const uiBlock = await fetchBlockToJSON(
      typeof projectData.uiTree === "string" ? projectData.uiTree : projectData.uiTree.hash
    );
    if (uiBlock) configFolder.file("uiTree.json", JSON.stringify(uiBlock, null, 2));
  }

  if (projectData?.entities) {
    const entBlock = await fetchBlockToJSON(
      typeof projectData.entities === "string" ? projectData.entities : projectData.entities.hash
    );
    if (entBlock) configFolder.file("entities.json", JSON.stringify(entBlock, null, 2));
  }

  if (projectData?.zones) {
    const zoneBlock = await fetchBlockToJSON(
      typeof projectData.zones === "string" ? projectData.zones : projectData.zones.hash
    );
    if (zoneBlock) configFolder.file("zones.json", JSON.stringify(zoneBlock, null, 2));
  }

  if (projectData?.deleteAssets) {
    const daBlock = await fetchBlockToJSON(
      typeof projectData.deleteAssets === "string" ? projectData.deleteAssets : projectData.deleteAssets.hash
    );
    if (daBlock) configFolder.file("deleteAssets.json", JSON.stringify(daBlock, null, 2));
  } else {
    configFolder.file("deleteAssets.json", "[]");
  }

  onProgress(progressBase + Math.floor(progressSpan * 0.2), 100);

  // Scripts
  if (projectData?.scriptAssets) {
    onLog("正在获取脚本资源索引...", "info");
    const scriptIndex = typeof projectData.scriptAssets === "string"
      ? await fetchBlock(projectData.scriptAssets)
      : projectData.scriptAssets;
    configFolder.file("scriptAssets.json", JSON.stringify(scriptIndex, null, 2));

    const scriptEntries = Object.entries(scriptIndex) as [string, any][];
    if (scriptEntries.length > 0) {
      onLog(`正在下载 ${scriptEntries.length} 个脚本文件...`, "info");
      const scriptsFolder = assetsFolder.folder("scripts")!;
      const safeName = (n: string) => n.replace(/[\\/:*?"<>|]+/g, "_").slice(0, 180);
      for (let i = 0; i < scriptEntries.length; i++) {
        const [key, info] = scriptEntries[i];
        const sh = cleanHash(info.hash);
        const url = isQmHash(sh) ? BASE_URL + sh : ASSETS_URL + "s/" + encodeURIComponent(sh);
        try {
          const resp = await fetch(url);
          if (resp.ok) {
            const blob = await resp.blob();
            scriptsFolder.file(safeName(key), blob);
          }
        } catch {}
      }
    }
  }

  onProgress(progressBase + Math.floor(progressSpan * 0.35), 100);

  // Images
  if (projectData?.pictureAssets) {
    onLog("正在获取图片资源索引...", "info");
    const picIndex = typeof projectData.pictureAssets === "string"
      ? await fetchBlock(projectData.pictureAssets)
      : projectData.pictureAssets;
    configFolder.file("pictureAssets.json", JSON.stringify(picIndex, null, 2));

    const picEntries = Object.entries(picIndex) as [string, any][];
    if (picEntries.length > 0) {
      onLog(`正在下载 ${picEntries.length} 个图片文件...`, "info");
      const imgFolder = assetsFolder.folder("images")!;
      const safeName = (n: string) => n.replace(/[\\/:*?"<>|]+/g, "_").slice(0, 180);
      const baseName = (url: string) => { const p = url.split("?")[0].split("#")[0].split("/"); return p[p.length - 1] || "file"; };
      const nameMap = new Map<string, number>();
      for (let i = 0; i < picEntries.length; i++) {
        const [key, info] = picEntries[i];
        const raw = safeName(baseName(key));
        const count = nameMap.get(raw) ?? 0;
        nameMap.set(raw, count + 1);
        const fileName = count === 0 ? raw : `${raw}_${count + 1}`;
        const url = info.previewImage
          ? ASSETS_URL + "m/" + encodeURIComponent(info.previewImage)
          : BASE_URL + encodeURIComponent(info.hash);
        try {
          const resp = await fetch(url);
          if (resp.ok) {
            const blob = await resp.blob();
            imgFolder.file(fileName, blob);
          }
        } catch {}
      }
    }
  }

  onProgress(progressBase + Math.floor(progressSpan * 0.5), 100);

  // Audio
  if (projectData?.audioAssets) {
    onLog("正在获取音频资源索引...", "info");
    const audioIndex = typeof projectData.audioAssets === "string"
      ? await fetchBlock(projectData.audioAssets)
      : projectData.audioAssets;
    configFolder.file("audioAssets.json", JSON.stringify(audioIndex, null, 2));

    const audioEntries = Object.entries(audioIndex) as [string, any][];
    if (audioEntries.length > 0) {
      onLog(`正在下载 ${audioEntries.length} 个音频文件...`, "info");
      const audioFolder = assetsFolder.folder("audios")!;
      const safeName = (n: string) => n.replace(/[\\/:*?"<>|]+/g, "_").slice(0, 180);
      const baseName = (url: string) => { const p = url.split("?")[0].split("#")[0].split("/"); return p[p.length - 1] || "file"; };
      const nameMap = new Map<string, number>();
      for (let i = 0; i < audioEntries.length; i++) {
        const [key, info] = audioEntries[i];
        const raw = safeName(baseName(key));
        const count = nameMap.get(raw) ?? 0;
        nameMap.set(raw, count + 1);
        const fileName = count === 0 ? raw : `${raw}_${count + 1}`;
        const url = BASE_URL + encodeURIComponent(info.hash);
        try {
          const resp = await fetch(url);
          if (resp.ok) {
            const blob = await resp.blob();
            audioFolder.file(fileName, blob);
          }
        } catch {}
      }
    }
  }

  onProgress(progressBase + Math.floor(progressSpan * 0.65), 100);

  // Voxel
  if (projectData?.voxels) {
    onLog("正在构建建筑体素数据...", "info");
    let voxelsObj = projectData.voxels;
    if (typeof voxelsObj === "string") {
      voxelsObj = await fetchBlock(voxelsObj);
    }
    if (voxelsObj?.chunks && voxelsObj.shape) {
      const sparse = await buildSparseVoxels(voxelsObj, fetchBlockBinary, () => {});
      const jsonStr = JSON.stringify(sparse);
      const gz = gzip(jsonStr, { level: 9 } as any);
      zip.file("voxel-sparse.gz", gz);
    }
  }

  onProgress(progressBase + Math.floor(progressSpan * 0.75), 100);

  // Models — paginated fetch to get ALL models
  onLog("正在获取模型数据...", "info");
  try {
    const { fetchDao3Models } = await import("./api");
    if (mapId) {
      const firstResult = await fetchDao3Models({ modelType: "2", containerMode: "edit", mapId: String(mapId), limit: "100", offset: "0" });
      const totalCount = firstResult.count;
      const allModels = [...firstResult.rows];

      if (totalCount > 100) {
        const pages = Math.ceil(totalCount / 100);
        for (let p = 1; p < pages; p++) {
          onLog(`正在获取模型列表 (${p + 1}/${pages})...`, "info");
          try {
            const result = await fetchDao3Models({ modelType: "2", containerMode: "edit", mapId: String(mapId), limit: "100", offset: String(p * 100) });
            allModels.push(...result.rows);
          } catch (e: any) {
            onLog(`模型分页获取失败 (offset=${p * 100}): ${e.message}`, "err");
          }
        }
      }

      if (allModels.length > 0) {
        onLog(`共 ${totalCount} 个模型，正在导出为 glTF...`, "info");
        const modelsFolder = assetsFolder.folder("models")!;
        try {
          const exportVCodeToGltf = await ensureVcodeGltfLoader();
          for (let i = 0; i < allModels.length; i++) {
            const model = allModels[i];
            if (!model.projectFileHash) continue;
            try {
              const result = await exportVCodeToGltf(model.projectFileHash);
              const safeName = (model.modelName || model.projectFileHash).replace(/[\\/:*?"<>|]+/g, "_").slice(0, 180);
              const gltfBlob = new Blob([result.gltfText], { type: "model/gltf+json;charset=utf-8" });
              modelsFolder.file(`${safeName}.gltf`, gltfBlob);
            } catch (e: any) {
              onLog("模型导出失败 " + (model.modelName || model.projectFileHash) + ": " + e.message, "err");
            }
          }
        } catch (e: any) {
          onLog("glTF 转换模块不可用，保存原始项目文件: " + e.message, "err");
          for (const model of allModels) {
            if (!model.projectFileHash) continue;
            try {
              const modelUrl = ASSETS_URL + "m/" + encodeURIComponent(model.projectFileHash);
              const resp = await fetch(modelUrl);
              if (resp.ok) {
                const arrayBuf = await resp.arrayBuffer();
                const safeName = (model.modelName || model.projectFileHash).replace(/[\\/:*?"<>|]+/g, "_").slice(0, 180);
                modelsFolder.file(`${safeName}.json`, new Uint8Array(arrayBuf));
              }
            } catch {}
          }
        }
      }
    }
  } catch (e: any) {
    onLog("模型数据获取失败: " + e.message, "err");
  }
}

export async function exportAll(
  options: Dao3ExportOptions,
  onLog: (m: string, t?: string) => void,
  onProgress: (current: number, total: number) => void,
): Promise<{ blob: Blob; fileName: string }> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  const h = cleanHash(options.hash);
  const blockData = isQmHash(h) ? await fetchBlock(h) : await fetchBlockByHash(h);
  if (!blockData || typeof blockData !== "object") throw new Error("无法解析地图数据");

  onLog("正在构建完整数据树...", "info");
  onProgress(5, 100);

  // Root config folder — permission and version control
  const configFolder = zip.folder("config")!;
  configFolder.file("block.json", JSON.stringify(blockData, null, 2));
  if (blockData.type === "permissions") {
    configFolder.file("permission.json", JSON.stringify(blockData, null, 2));
  }

  let vcBlock: any = null;
  if (typeof blockData.versionControl === "string") {
    onLog("正在获取版本控制信息...", "info");
    vcBlock = await fetchBlock(blockData.versionControl);
    configFolder.file("versionControl.json", JSON.stringify(vcBlock, null, 2));
  } else if (blockData.versionControl && typeof blockData.versionControl === "object") {
    vcBlock = blockData.versionControl;
    configFolder.file("versionControl.json", JSON.stringify(vcBlock, null, 2));
  }

  onProgress(10, 100);

  // Resolve project
  onLog("正在解析项目数据...", "info");
  const projectData = await resolveProjectFromPermission(options.hash, options.branchKey);

  // Export main project tree (progress 10-70)
  await exportProjectTree(zip, projectData, onLog, onProgress, 10, 60, options.mapId);

  onProgress(75, 100);

  // Zones (sub-maps) — recursive export
  if (projectData?.zones) {
    onLog("正在处理扩展地图（附图）...", "info");
    let zoneData: any;
    if (typeof projectData.zones === "string") {
      zoneData = await fetchBlock(projectData.zones);
    } else {
      zoneData = projectData.zones;
    }

    if (zoneData && typeof zoneData === "object") {
      // Debug: log the raw zone data structure
      const zoneKeys = Object.keys(zoneData);
      onLog(`附图数据: 共 ${zoneKeys.length} 个条目, 键: ${zoneKeys.slice(0, 5).join(", ")}${zoneKeys.length > 5 ? "..." : ""}`, "info");

      const zoneEntries = Array.isArray(zoneData)
        ? zoneData
        : Object.entries(zoneData).map(([k, v]) => {
            // Handle nested zone data: v might be a string (hash) or an object
            if (typeof v === "string") return { key: k, editHash: v };
            return { key: k, name: (v as any)?.name, ...(v as any) };
          });

      onLog(`解析出 ${zoneEntries.length} 个附图条目`, "info");

      for (let i = 0; i < zoneEntries.length; i++) {
        const zone = zoneEntries[i];
        const zoneName = zone.name || zone.key || `zone-${i}`;

        // Try all possible hash field names
        // Dao3 zones structure: { key: { editHash, playHash, hash, ... } }
        // or { key: "hashString" }
        const zoneHash = zone.editHash || zone.playHash || zone.hash
          || zone.edit || zone.play || zone.permissionHash
          || (typeof zone.versionControl === "string" ? zone.versionControl : null);

        if (!zoneHash) {
          // Log the zone structure for debugging
          onLog(`附图 ${zoneName} 无法找到权限哈希，跳过 (字段: ${Object.keys(zone).join(", ")})`, "warn");
          continue;
        }

        onLog(`正在导出附图: ${zoneName} (${i + 1}/${zoneEntries.length})...`, "info");
        try {
          const zoneProjectData = await resolveProjectFromPermission(zoneHash, options.branchKey);
          const zoneFolder = zip.folder("zones")!.folder(zoneName.replace(/[\\/:*?"<>|]+/g, "_"))!;
          await exportProjectTree(zoneFolder, zoneProjectData, onLog, onProgress,
            75 + Math.floor((i / zoneEntries.length) * 20), 20 / zoneEntries.length,
            undefined);
          onLog(`附图 ${zoneName} 导出完成`, "info");
        } catch (e: any) {
          onLog(`附图 ${zoneName} 导出失败: ${e.message}`, "err");
        }
      }
    } else {
      onLog(`附图数据为空或格式不符: ${typeof zoneData}`, "warn");
    }
  } else {
    onLog("此地图没有扩展地图（附图）", "info");
  }

  onProgress(95, 100);

  // Package
  onLog("正在打包完整数据...", "info");
  const blob = await zip.generateAsync({ type: "blob" });
  const branchSuffix = options.branchKey || "master";
  onLog("全部导出完成!", "ok");
  return { blob, fileName: `map-${branchSuffix}-full.zip` };
}

// ====== Branch loading ======

export interface BranchInfo {
  key: string;
  label: string;
}

export async function loadBranches(hash: string): Promise<{ branches: BranchInfo[]; currentBranch: string }> {
  const h = cleanHash(hash);
  const blockData = isQmHash(h) ? await fetchBlock(h) : await fetchBlockByHash(h);

  let vc: any = null;

  if (typeof blockData?.versionControl === "string") {
    // versionControl is a hash → fetch the VC block
    vc = await fetchBlock(blockData.versionControl);
  } else if (blockData?.versionControl && typeof blockData.versionControl === "object") {
    // Inline VC object — may contain branches
    vc = blockData.versionControl;
  }

  if (!vc) throw new Error("该地图没有版本控制信息");

  // If VC has branches, enumerate them
  if (!vc.branches || typeof vc.branches !== "object") {
    // No branches available (e.g. inline VC with only headHash)
    return { branches: [], currentBranch: vc.currentBranch || "" };
  }

  const branches: BranchInfo[] = [];
  for (const [key, val] of Object.entries(vc.branches as Record<string, any>)) {
    let label = val.name ?? key;
    // Timestamp branch names → readable date
    if (/^\d{10,13}$/.test(label)) {
      const ts = Number(label);
      const ms = label.length === 13 ? ts : ts * 1000;
      const d = new Date(ms);
      if (!isNaN(d.getTime())) {
        const pad = (n: number) => String(n).padStart(2, "0");
        label = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      }
    }
    branches.push({ key, label });
  }

  branches.sort((a, b) => {
    if (a.key === vc.currentBranch) return -1;
    if (b.key === vc.currentBranch) return 1;
    return a.key.localeCompare(b.key);
  });

  return { branches, currentBranch: vc.currentBranch || "" };
}

// ====== Main export dispatcher ======

export async function exportDao3Map(
  options: Dao3ExportOptions,
  onLog: (m: string, t?: string) => void,
  onProgress: (current: number, total: number) => void,
): Promise<{ blob: Blob; fileName: string }> {
  switch (options.exportType) {
    case "all":
      return exportAll(options, onLog, onProgress);
    case "build":
      return exportBuild(options, onLog, onProgress);
    case "code":
      return exportCode(options, onLog, onProgress);
    case "audio":
      return exportAudio(options, onLog, onProgress);
    case "image":
      return exportImage(options, onLog, onProgress);
    case "worldconfig":
      return exportWorldConfig(options, onLog, onProgress);
    default:
      throw new Error("不支持的导出类型: " + options.exportType);
  }
}
