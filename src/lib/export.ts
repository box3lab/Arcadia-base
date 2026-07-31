﻿﻿﻿import { fetchBlock, fetchBlockBinary, fetchBlockByHash, fetchBlockBinaryByHash, fetchPreviewBinary, cleanHash, isQmHash, resolveAssetUrl, resolveBlockUrl, ASSETS_URL, type CurrentMap } from "./api";
import { buildSparseVoxels, compressSparseVoxels } from "./voxel";
import { parseVBProject, vbToVox } from "./vbConvert";

function parseFirstJSON(text: string): any {
  try { return JSON.parse(text); } catch {}
  let depth = 0, start = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') { if (depth === 0) start = i; depth++; }
    else if (text[i] === '}') { depth--; if (depth === 0 && start >= 0) { try { return JSON.parse(text.slice(start, i + 1)); } catch { start = -1; } } }
  }
  return text;
}

const OBJ_MARKER = "obj";

const CONCURRENCY = 6;

async function parallelBatch<T>(items: T[], fn: (item: T) => Promise<void>): Promise<void> {
  let idx = 0;
  const workers = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (idx < items.length) {
      const i = idx++;
      await fn(items[i]);
    }
  });
  await Promise.all(workers);
}

function safeName(n: string) { return n.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").trim() || "unnamed"; }
function zipName(map: CurrentMap) { return safeName(map.name); }

async function resolveProject(hash: string, log: (m: string, t?: string) => void) {
  const h = cleanHash(hash);
  log("解析哈希: " + h.slice(0, 16) + "...", "info");

  const d = isQmHash(h) ? await fetchBlock(h) : await fetchBlockByHash(h);
  if (d?.type === "project") { log("项目块", "ok"); return { hash: h, data: d }; }
  if (d?.type === "permission") {
    log("权限块", "info");
    if (!d.versionControl) throw new Error("无版本控制");
    const vc = await fetchBlock(d.versionControl);
    if (!vc) throw new Error("版本控制获取失败");
    let ph: string | null = null;
    if (vc.headHash) { ph = vc.headHash; log("headHash: " + ph, "ok"); }
    if (!ph && vc.currentBranch && vc.branches?.[vc.currentBranch]) { const b = vc.branches[vc.currentBranch]; if (b?.headHash) ph = b.headHash; else if (b?.hash) ph = b.hash; }
    if (!ph && vc.branches) {
      for (const n of ["master", "main", ""]) { const b = vc.branches[n]; if (b?.headHash) { ph = b.headHash; break; } if (b?.hash) { ph = b.hash; break; } }
      if (!ph) for (const k of Object.keys(vc.branches)) { const b = vc.branches[k]; if (b?.headHash) { ph = b.headHash; break; } if (b?.hash) { ph = b.hash; break; } }
    }
    if (ph) {
      const pd = await fetchBlock(ph);
      if (pd?.type === "project") return { hash: ph, data: pd };
      let c = pd;
      for (let i = 0; i < 30 && c; i++) { if (c.type === "project") return { hash: ph, data: c }; if (c.prevHash) c = await fetchBlock(c.prevHash); else break; }
      if (pd) return { hash: ph, data: pd };
    }
    throw new Error("无法解析到项目块");
  }
  return { hash: h, data: d };
}

export interface ExportOptions {
  optBlockJson: boolean; optTerrain: boolean; optSparseVoxels: boolean; optTerrainRaw: boolean;
  optMeshes: boolean; optVoxRename: boolean; optModelProject: boolean;
  optModelPreview: boolean; optImages: boolean; optAudio: boolean; optScripts: boolean;
  optJsonEnv: boolean; optJsonPhysics: boolean; optJsonPlayer: boolean; optJsonSeeds: boolean; optJsonOther: boolean;
  optJsonFormat: boolean; optCompressLevel: number;
}

interface AssetEntry {
  name: string;
  hash: string;
  previewImage: string;
  type: number;
  kind: "mesh" | "audio" | "image" | "lut" | "other";
}

function parseAssetsIndex(obj: any): AssetEntry[] {
  const entries: AssetEntry[] = [];
  if (!obj || typeof obj !== "object") return entries;
  for (const key of Object.keys(obj)) {
    const v = obj[key];
    if (!v || typeof v !== "object" || typeof v.hash !== "string") continue;
    let kind: AssetEntry["kind"] = "other";
    if (key.startsWith("mesh/") || v.type === 2) kind = "mesh";
    else if (key.startsWith("audio/") || v.type === 6) kind = "audio";
    else if (key.startsWith("lut/") || v.type === 3) kind = "lut";
    else if (key.startsWith("image/") || v.type === 1 || v.type === 4) kind = "image";
    else if (v.previewImage && (v.type === 1 || v.type === 4)) kind = "image";
    entries.push({ name: key, hash: cleanHash(v.hash), previewImage: v.previewImage ? cleanHash(v.previewImage) : "", type: v.type || 0, kind });
  }
  return entries;
}

interface SeedEntry {
  name: string;
  VBProjectHash: string;
  meshHash: string;
}

function parseSeeds(obj: any): SeedEntry[] {
  const entries: SeedEntry[] = [];
  if (!obj || typeof obj !== "object") return entries;
  for (const uuid of Object.keys(obj)) {
    const s = obj[uuid];
    if (!s || typeof s !== "object") continue;
    entries.push({
      name: (s.name || uuid).replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").trim() || "unnamed",
      VBProjectHash: s.VBProjectHash || "",
      meshHash: s.meshHash || "",
    });
  }
  return entries;
}

function decodeB64(uri: string): { bytes: Uint8Array; ext: string } | null {
  const m = uri.match(/^data:([a-zA-Z0-9/+.-]+\/[a-zA-Z0-9/+.-]+);base64,(.+)$/);
  if (!m) return null;
  const s = atob(m[2]); const b = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
  const x: Record<string, string> = { "image/jpeg": ".jpg", "image/png": ".png", "image/gif": ".gif", "image/webp": ".webp", "image/svg+xml": ".svg", "audio/mpeg": ".mp3", "audio/ogg": ".ogg" };
  return { bytes: b, ext: x[m[1]] || ".bin" };
}

function nameExt(n: string): string {
  if (n.endsWith(".js")) return ".js";
  if (n.endsWith(".mp3")) return ".mp3";
  if (n.endsWith(".ogg")) return ".ogg";
  if (n.endsWith(".wav")) return ".wav";
  if (n.endsWith(".png")) return ".png";
  if (n.endsWith(".jpg") || n.endsWith(".jpeg")) return ".jpg";
  if (n.endsWith(".vb")) return ".vb";
  if (n.endsWith(".vox")) return ".vox";
  return "";
}

function stripAssetPrefix(name: string): string {
  return name.replace(/^(mesh|audio|image|lut)\//, "");
}

function imageFileName(name: string): string {
  const base = stripAssetPrefix(name).replace(/\.(lut|part|vb|vox)$/, ".png");
  if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(base)) return base;
  return base + ".png";
}

async function resolveField(bd: any, field: string, log: (m: string, t?: string) => void): Promise<any> {
  const v = bd[field];
  if (!v) return null;
  if (typeof v === "object") return v;
  if (typeof v === "string" && v.length > 0) {
    if (v === OBJ_MARKER) {
      const inlineKey = field + "Data";
      if (bd[inlineKey] && typeof bd[inlineKey] === "object") return bd[inlineKey];
      return null;
    }
    const h = cleanHash(v);
    log("解析: " + field + " → " + h.slice(0, 16) + "...", "info");

    try {
      const url = resolveBlockUrl(v);
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const text = await resp.text();
      return parseFirstJSON(text);
    } catch { log(field + " 解析失败", "err"); return null; }
  }
  return null;
}

async function saveFile(zd: any, name: string, hash: string, kind: "mesh" | "audio" | "image" | "script" | "json", ind: number, optVoxRename?: boolean, isPreview?: boolean, previewImage?: string) {
  const h = cleanHash(hash);
  const qm = isQmHash(h);

  const ne = nameExt(name);
  const base = name.replace(/\.(vb|vox|mp3|ogg|wav|png|jpg|jpeg|js|json|lut|part)$/, "");
  const meshExt = optVoxRename ? ".vox" : ".vb";

  if (kind === "audio" || kind === "image") {
    const url = resolveAssetUrl(hash, kind, previewImage);
    const resp = await fetch(url);
    if (resp.ok) {
      const bin = new Uint8Array(await resp.arrayBuffer());
      zd.file(kind === "image" ? imageFileName(name) : name, bin);
      return;
    }
    if (!qm) {
      const fallbackUrl = ASSETS_URL + "m/" + encodeURIComponent(h);
      const fbResp = await fetch(fallbackUrl);
      if (fbResp.ok) {
        const bin = new Uint8Array(await fbResp.arrayBuffer());
        zd.file(kind === "image" ? imageFileName(name) : name, bin);
        return;
      }
    }
  }

  if (kind === "script") {
    const url = resolveAssetUrl(hash, kind);
    const resp = await fetch(url);
    if (resp.ok) {
      const bin = new Uint8Array(await resp.arrayBuffer());
      zd.file(name, bin);
      return;
    }
  }

  if (kind === "mesh") {
    const url = resolveAssetUrl(hash, kind);
    const resp = await fetch(url);
    if (resp.ok) {
      const bin = new Uint8Array(await resp.arrayBuffer());
      if (optVoxRename) {
        try {
          const t = new TextDecoder("utf-8").decode(bin);
          const parsed = JSON.parse(t);
          const vb = parseVBProject(parsed);
          if (vb) { zd.file(base + ".vox", vbToVox(vb)); return; }
        } catch {}
      }
      try { const t = new TextDecoder("utf-8").decode(bin); zd.file(base + meshExt, JSON.stringify(JSON.parse(t), null, ind)); }
      catch { zd.file(base + meshExt, bin); }
      return;
    }
  }

  let br: any;
  if (qm) {
    try { br = await fetchBlock(h); } catch {}
  }
  const isObj = typeof br === "object" && br !== null;
  const isDu = typeof br === "string" && br.startsWith("data:");

  if (kind === "mesh" && optVoxRename && isObj && br.ENCODEVOXELS) {
    const vb = parseVBProject(br);
    if (vb) { zd.file(base + ".vox", vbToVox(vb)); return; }
  }

  if (isObj) {
    if (kind === "mesh") {
      zd.file(base + meshExt, JSON.stringify(br, null, ind));
    } else {
      zd.file(base + ".json", JSON.stringify(br, null, ind));
    }
  } else if (isDu) {
    const dec = decodeB64(br);
    if (dec) zd.file(base + dec.ext, dec.bytes);
    else zd.file(base + ".txt", br);
  } else {
    let bin: Uint8Array;
    if (qm) {
      bin = await fetchBlockBinary(h);
    } else if (isPreview) {
      bin = await fetchPreviewBinary(hash);
    } else {
      bin = await fetchBlockBinaryByHash(hash);
    }
    if (kind === "audio") {
      zd.file(name, bin);
    } else if (kind === "script" || ne === ".js") {
      zd.file(name, bin);
    } else if (kind === "image") {
      zd.file(imageFileName(name), bin);
    } else {
      zd.file(name, bin);
    }
  }
}

async function saveScriptAssets(zd: any, bd: any, log: (m: string, t?: string) => void, ind: number) {
  const sa = await resolveField(bd, "scriptAssetEntries", log);
  if (!sa || typeof sa !== "object") return;
  for (const key of Object.keys(sa)) {
    const v = sa[key];
    if (v && typeof v === "object" && typeof v.hash === "string" && v.hash.length > 0) {
      try { await saveFile(zd, key, v.hash, "script", ind); } catch { log("脚本 " + key + " 失败", "err"); }
    }
  }
}

export async function exportMap(map: CurrentMap, options: ExportOptions, onLog: (m: string, t?: string) => void, onProgress: (c: number, t: number) => void): Promise<{ blob: Blob; fileName: string; total: number }> {
  const log = onLog;
  log("开始导出...", "info");
  const res = await resolveProject(map.hash, log);
  map.projectHash = res.hash;
  const bd = res.data;
  log("项目: " + res.hash.slice(0, 16) + "...", "ok");
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  const zf = zip.folder(zipName(map))!;
  let done = 0;
  const ind = options.optJsonFormat ? 2 : 0;

  if (options.optBlockJson) { zf.file("block.json", JSON.stringify(bd, null, ind)); done++; }

  const [assetsData, audioAssetsData, pictureAssetsData, scriptAssetEntriesData, seedsData, envData, physicsData, playerData, entitiesData, zonesData, infoData] = await Promise.all([
    resolveField(bd, "assets", log),
    resolveField(bd, "audioAssets", log),
    resolveField(bd, "pictureAssets", log),
    resolveField(bd, "scriptAssetEntries", log),
    resolveField(bd, "seeds", log),
    resolveField(bd, "environment", log),
    resolveField(bd, "physics", log),
    resolveField(bd, "player", log),
    resolveField(bd, "entities", log),
    resolveField(bd, "zones", log),
    resolveField(bd, "info", log),
  ]);

  const unifiedAssets = parseAssetsIndex(assetsData);
  const audioIndex = parseAssetsIndex(audioAssetsData);
  const pictureIndex = parseAssetsIndex(pictureAssetsData);
  const scriptIndex = parseAssetsIndex(scriptAssetEntriesData);

  const allAssetEntries = [
    ...unifiedAssets,
    ...audioIndex.map(e => ({ ...e, kind: "audio" as AssetEntry["kind"] })),
    ...pictureIndex.map(e => ({ ...e, kind: (e.kind === "lut" ? "lut" : "image") as AssetEntry["kind"] })),
  ];

  const seedEntries = parseSeeds(seedsData);

  const meshAssets = allAssetEntries.filter(e => e.kind === "mesh");
  const audioAssets = allAssetEntries.filter(e => e.kind === "audio");
  const imageAssets = allAssetEntries.filter(e => e.kind === "image");
  const lutAssets = allAssetEntries.filter(e => e.kind === "lut");
  const otherAssets = allAssetEntries.filter(e => e.kind === "other");
  const scriptAssetEntries = scriptIndex.length > 0 ? scriptIndex : allAssetEntries.filter(e => e.name.startsWith("script/"));

  const meshSeeds = seedEntries.filter(s => s.meshHash || s.VBProjectHash);

  const previewHashes = new Set<string>();
  for (const a of allAssetEntries) { if (a.previewImage && a.previewImage.length > 0) previewHashes.add(a.previewImage); }

  let voxObj: any = null;
  if (bd.voxels && typeof bd.voxels === "object") voxObj = bd.voxels;
  else if (typeof bd.voxels === "string" && bd.voxels.length > 0) {
    const vd = await resolveField(bd, "voxels", log);
    if (vd && typeof vd === "object") voxObj = vd;
  }

  let total = done;
  if (options.optTerrain && voxObj) { if (options.optSparseVoxels) total++; if (options.optTerrainRaw) total += (voxObj.chunks?.length || 0); }

  if (options.optMeshes) total += meshAssets.length + meshSeeds.length;
  if (options.optModelPreview) total += previewHashes.size;
  if (options.optImages) total += imageAssets.length + lutAssets.length;
  if (options.optAudio) total += audioAssets.length;
  if (options.optScripts) total += Math.max(scriptAssetEntries.length, 10);
  if (options.optJsonEnv && envData) total++;
  if (options.optJsonPhysics && physicsData) total++;
  if (options.optJsonPlayer && playerData) total++;
  if (options.optJsonSeeds && seedsData) total++;
  if (options.optJsonOther) total += 5;
  onProgress(done, total);

  if (options.optTerrain && voxObj) {
    const chunks = voxObj.chunks || [];
    if (options.optSparseVoxels) {
      log("稀疏体素 (" + chunks.length + " 区块)...", "info");
      try {
        const sv = await buildSparseVoxels(voxObj, fetchBlockBinary, (p, t) => log(p + "/" + t, "info"));
        const gz = compressSparseVoxels(sv);
        zf.file("terrain/voxel-sparse.gz", gz, { compression: "STORE" });
        done++; onProgress(done, total);
        log(sv.indices.length + " 体素, " + (gz.length / 1024).toFixed(1) + "KB", "ok");
      } catch (e: any) { log("体素失败: " + e.message, "err"); done++; onProgress(done, total); }
    }
    if (options.optTerrainRaw) {
      const seen = new Set<string>();
      const uniqueChunks = chunks.filter((h: string, i: number) => { if (seen.has(h)) return false; seen.add(h); return true; });
      const chunkMap = new Map<string, number[]>();
      chunks.forEach((h: string, i: number) => { if (!chunkMap.has(h)) chunkMap.set(h, []); chunkMap.get(h)!.push(i); });
      await parallelBatch(uniqueChunks, async (h: string) => {
        try {
          const bin = await fetchBlockBinary(h);
          const indices = chunkMap.get(h) || [0];
          for (const i of indices) {
            zf.file("terrain/raw/chunk_" + i + "_" + h.slice(0, 16) + ".bin", bin);
          }
          done += indices.length; onProgress(done, total);
        } catch { done += (chunkMap.get(h)?.length || 1); onProgress(done, total); }
      });
    }
  }

  if (options.optMeshes) {
    const zd = zf.folder("meshes")!;
    const allMeshItems = [
      ...meshAssets.map(a => ({ name: stripAssetPrefix(a.name), hash: a.hash, kind: "asset" as const })),
      ...meshSeeds.filter(s => s.meshHash || s.VBProjectHash).map(s => ({ name: s.name, hash: s.meshHash || s.VBProjectHash!, kind: "seed" as const })),
    ];
    if (allMeshItems.length > 0) {
      log("meshes/ (" + allMeshItems.length + ")", "info");
      await parallelBatch(allMeshItems, async (item) => {
        try { await saveFile(zd, item.name, item.hash, "mesh", ind, options.optVoxRename); done++; onProgress(done, total); }
        catch { done++; onProgress(done, total); }
      });
      log("meshes/ 完成", "ok");
    }
  }

  if (options.optImages) {
    const zd = zf.folder("images")!;
    const allImageItems = [
      ...imageAssets.map(a => ({ name: imageFileName(a.name), hash: a.hash, previewImage: a.previewImage })),
      ...lutAssets.map(a => ({ name: imageFileName(a.name), hash: a.hash, previewImage: a.previewImage })),
    ];
    const count = allImageItems.length + (options.optModelPreview ? previewHashes.size : 0);
    if (count > 0) {
      log("images/ (" + count + ")", "info");
      await parallelBatch(allImageItems, async (item) => {
        try { await saveFile(zd, item.name, item.hash, "image", ind, undefined, undefined, item.previewImage); done++; onProgress(done, total); }
        catch { done++; onProgress(done, total); }
      });
      if (options.optModelPreview) {
        let pi = 0;
        const previewItems = Array.from(previewHashes);
        await parallelBatch(previewItems, async (ph) => {
          const idx = pi++;
          try { await saveFile(zd, "preview_" + idx, ph, "image", ind, undefined, true); done++; onProgress(done, total); }
          catch { done++; onProgress(done, total); }
        });
      }
      log("images/ 完成", "ok");
    }
  }

  if (options.optAudio) {
    const zd = zf.folder("audio")!;
    if (audioAssets.length > 0) {
      log("audio/ (" + audioAssets.length + ")", "info");
      await parallelBatch(audioAssets, async (a) => {
        try { await saveFile(zd, stripAssetPrefix(a.name), a.hash, "audio", ind); done++; onProgress(done, total); }
        catch { done++; onProgress(done, total); }
      });
      log("audio/ 完成", "ok");
    }
  }

  if (options.optScripts) {
    const zd = zf.folder("scripts")!;
    if (scriptAssetEntries.length > 0) {
      log("scripts/ (" + scriptAssetEntries.length + ")", "info");
      await parallelBatch(scriptAssetEntries, async (a) => {
        try { await saveFile(zd, stripAssetPrefix(a.name), a.hash, "script", ind); done++; onProgress(done, total); }
        catch { done++; onProgress(done, total); }
      });
      log("scripts/ 完成", "ok");
    } else {
      log("scripts/", "info");
      try { await saveScriptAssets(zd, bd, log, ind); } catch {}
      log("scripts/ 完成", "ok");
      done++; onProgress(done, total);
    }
  }

  if (options.optJsonEnv && envData) {
    zf.file("json/environment.json", JSON.stringify(envData, null, ind));
    done++; onProgress(done, total);
  }
  if (options.optJsonPhysics && physicsData) {
    zf.file("json/physics.json", JSON.stringify(physicsData, null, ind));
    done++; onProgress(done, total);
  }
  if (options.optJsonPlayer && playerData) {
    zf.file("json/player.json", JSON.stringify(playerData, null, ind));
    done++; onProgress(done, total);
  }
  if (options.optJsonSeeds && seedsData) {
    zf.file("json/seeds.json", JSON.stringify(seedsData, null, ind));
    done++; onProgress(done, total);
  }
  if (options.optJsonOther) {
    if (entitiesData) { zf.file("json/entities.json", JSON.stringify(entitiesData, null, ind)); done++; onProgress(done, total); }
    if (zonesData) { zf.file("json/zones.json", JSON.stringify(zonesData, null, ind)); done++; onProgress(done, total); }
    if (infoData) { zf.file("json/info.json", JSON.stringify(infoData, null, ind)); done++; onProgress(done, total); }
  }

  log("共 " + done + " 文件, 打包中...", "info");
  let lastPct = -1;
  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: options.optCompressLevel } }, (m) => { const p = Math.round(m.percent); if (p !== lastPct) { lastPct = p; log("打包: " + p + "%", "info"); } });
  log("导出完成!", "ok");
  onProgress(total, total);
  return { blob, fileName: map.name + ".zip", total };
}
