import { fetchBlock, fetchBlockBinary, cleanHash, isQmHash, type CurrentMap } from "./api";
import { buildSparseVoxels, compressSparseVoxels } from "./voxel";
import { gzip } from "pako";

export interface Box3ExportOptions {
  optAssets: boolean;
  optScripts: boolean;
  optAllJson: boolean;
  optVoxRename: boolean;
  optVoxelsMerge: boolean;
}

export const DEFAULT_BOX3_OPTIONS: Box3ExportOptions = {
  optAssets: true,
  optScripts: true,
  optAllJson: true,
  optVoxRename: true,
  optVoxelsMerge: true,
};

function sanitizeName(name: string) {
  return name.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").trim() || "unnamed";
}

function getFolderName(map: CurrentMap) {
  const h = map.projectHash || map.hash;
  return "[" + sanitizeName(map.name) + "]" + h;
}

async function resolveProjectHash(hash: string, log: (m: string, t?: string) => void) {
  log("正在解析哈希: " + hash, "info");
  const blockData = await fetchBlock(hash);

  if (blockData && blockData.type === "project") {
    log("数据类型: 项目块 (可直接导出)", "ok");
    return { hash, data: blockData };
  }

  if (blockData && blockData.type === "permission") {
    log("数据类型: 权限块, 正在解析到项目块...", "info");
    if (blockData.versionControl) {
      const vcData = await fetchBlock(blockData.versionControl);
      if (!vcData) throw new Error("无法获取版本控制数据");

      let projectHash: string | null = null;

      if (vcData.headHash) {
        projectHash = vcData.headHash;
        log("找到项目哈希 (headHash): " + projectHash, "ok");
      }

      if (!projectHash && vcData.branches && vcData.currentBranch) {
        const branch = vcData.branches[vcData.currentBranch];
        if (branch) {
          if (branch.headHash) projectHash = branch.headHash;
          else if (branch.hash) projectHash = branch.hash;
          if (projectHash) log("找到项目哈希 (currentBranch): " + projectHash, "ok");
        }
      }

      if (!projectHash && vcData.branches) {
        for (const bname of ["master", "main", ""]) {
          if ((vcData.branches as Record<string, any>)[bname]) {
            const b = (vcData.branches as Record<string, any>)[bname];
            if (b.headHash) { projectHash = b.headHash; break; }
            if (b.hash) { projectHash = b.hash; break; }
          }
        }
        if (!projectHash) {
          for (const bkey of Object.keys(vcData.branches)) {
            const b2 = (vcData.branches as Record<string, any>)[bkey];
            if (b2.headHash) { projectHash = b2.headHash; break; }
            if (b2.hash) { projectHash = b2.hash; break; }
          }
        }
        if (projectHash) log("找到项目哈希 (分支遍历): " + projectHash, "ok");
      }

      if (projectHash) {
        const projectData = await fetchBlock(projectHash);
        if (projectData && projectData.type === "project") {
          return { hash: projectHash, data: projectData };
        }
        log("头部哈希不是项目类型, 尝试历史版本链...", "info");
        let current = projectData;
        for (let attempt = 0; attempt < 30 && current; attempt++) {
          if (current.type === "project") return { hash: projectHash, data: current };
          if (current.prevHash) current = await fetchBlock(current.prevHash);
          else break;
        }
        if (projectData) {
          log("未找到项目块, 使用最新版本数据", "info");
          return { hash: projectHash, data: projectData };
        }
      }
    }
    throw new Error("无法从权限块解析到项目块");
  }

  log("未知数据类型: " + (blockData?.type || "未知") + ", 尝试直接使用", "info");
  return { hash, data: blockData };
}

const HASH_FIELDS = [
  "ambientSound", "assets", "entities", "environment", "editRoot",
  "folders", "info", "physics", "player", "voxels", "zones",
  "deleteAssets", "scriptAssets",
];

export async function exportBox3Map(
  map: CurrentMap,
  options: Box3ExportOptions,
  onLog: (m: string, t?: string) => void,
  onProgress: (c: number, t: number) => void,
): Promise<{ blob: Blob; fileName: string; total: number }> {
  const log = onLog;
  log("开始导出...", "info");

  const resolved = await resolveProjectHash(map.hash, log);
  map.projectHash = resolved.hash;
  const blockData = resolved.data;
  log("项目哈希: " + resolved.hash, "ok");

  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  const folderName = getFolderName(map);
  const zipFolder = zip.folder(folderName)!;
  let fileCount = 0;
  let completedFiles = 0;
  let totalFiles = 0;

  function updateProgress() {
    onProgress(completedFiles, totalFiles);
  }

  zipFolder.file("block.json", JSON.stringify(blockData, null, 2));
  fileCount++;
  completedFiles++;
  totalFiles = 1;

  const subHashes: Record<string, string> = {};
  const subDataObjects: Record<string, any> = {};

  for (const field of HASH_FIELDS) {
    if (blockData[field]) {
      if (typeof blockData[field] === "string" && blockData[field].length > 10) {
        if (field === "scriptAssets" && !options.optScripts && !options.optAllJson) continue;
        subHashes[field] = blockData[field];
        totalFiles++;
      } else if (typeof blockData[field] === "object") {
        subDataObjects[field] = blockData[field];
        totalFiles++;
      }
    }
  }

  let assetsData: any = null;
  let assetsCount = 0;
  if (subDataObjects.assets) {
    assetsData = subDataObjects.assets;
    if (typeof assetsData === "object") {
      for (const ak in assetsData) {
        if (assetsData[ak]?.hash) assetsCount++;
      }
      totalFiles += assetsCount;
    }
  } else if (subHashes.assets && options.optAssets) {
    try {
      assetsData = await fetchBlock(subHashes.assets);
      if (assetsData && typeof assetsData === "object") {
        for (const ak in assetsData) {
          if (assetsData[ak]?.hash) assetsCount++;
        }
        totalFiles += assetsCount;
      }
    } catch (e: any) {
      log("获取资源列表失败: " + e.message, "err");
    }
  }
  log("待下载资源文件: " + assetsCount + " 个", "info");

  let scriptAssetsData: any = null;
  let scriptsCount = 0;
  if (subDataObjects.scriptAssets) {
    scriptAssetsData = subDataObjects.scriptAssets;
    if (typeof scriptAssetsData === "object") {
      for (const sk in scriptAssetsData) {
        if (scriptAssetsData[sk]?.hash) scriptsCount++;
      }
      totalFiles += scriptsCount;
    }
  } else if (subHashes.scriptAssets && options.optScripts) {
    try {
      scriptAssetsData = await fetchBlock(subHashes.scriptAssets);
      if (scriptAssetsData && typeof scriptAssetsData === "object") {
        for (const sk in scriptAssetsData) {
          if (scriptAssetsData[sk]?.hash) scriptsCount++;
        }
        totalFiles += scriptsCount;
      }
    } catch (e: any) {
      log("获取脚本列表失败: " + e.message, "err");
    }
  }

  let infoData: any = null;
  if (subDataObjects.info) {
    infoData = subDataObjects.info;
    if (options.optAssets) {
      if (infoData.bannerImages) totalFiles += infoData.bannerImages.length;
      if (infoData.previewImage) totalFiles += 1;
    }
  } else if (subHashes.info) {
    try {
      infoData = await fetchBlock(subHashes.info);
      if (infoData && options.optAssets) {
        if (infoData.bannerImages) totalFiles += infoData.bannerImages.length;
        if (infoData.previewImage) totalFiles += 1;
      }
    } catch (e: any) {
      log("获取地图信息失败: " + e.message, "err");
    }
  }

  let voxelsData: any = null;
  if (subDataObjects.voxels) {
    voxelsData = subDataObjects.voxels;
    if (voxelsData?.chunks) {
      if (options.optVoxelsMerge) totalFiles += 1;
      else totalFiles += voxelsData.chunks.length;
    }
  } else if (subHashes.voxels && (options.optAllJson || options.optVoxelsMerge)) {
    try {
      voxelsData = await fetchBlock(subHashes.voxels);
      if (voxelsData?.chunks) {
        if (options.optVoxelsMerge) totalFiles += 1;
        else totalFiles += voxelsData.chunks.length;
      }
    } catch (e: any) {
      log("获取体素数据失败: " + e.message, "err");
    }
  }

  updateProgress();

  // 下载所有 JSON 配置文件
  if (options.optAllJson) {
    for (const field in subHashes) {
      if (field === "assets" && assetsData) {
        zipFolder.file("assets.json", JSON.stringify(assetsData, null, 2));
        fileCount++; completedFiles++; updateProgress();
        continue;
      }
      if (field === "scriptAssets" && scriptAssetsData) {
        zipFolder.file("scriptAssets.json", JSON.stringify(scriptAssetsData, null, 2));
        fileCount++; completedFiles++; updateProgress();
        continue;
      }
      if (field === "info" && infoData) {
        zipFolder.file("info.json", JSON.stringify(infoData, null, 2));
        fileCount++; completedFiles++; updateProgress();
        continue;
      }
      if (field === "voxels" && voxelsData) {
        if (!options.optVoxelsMerge) {
          zipFolder.file("voxels.json", JSON.stringify(voxelsData, null, 2));
          fileCount++; completedFiles++; updateProgress();
        }
        continue;
      }
      try {
        const subData = await fetchBlock(subHashes[field]);
        zipFolder.file(field + ".json", JSON.stringify(subData, null, 2));
        fileCount++; completedFiles++; updateProgress();
        log("已下载: " + field + ".json", "ok");
      } catch (e: any) {
        log("下载 " + field + " 失败: " + e.message, "err");
        completedFiles++; updateProgress();
      }
    }
    for (const objField in subDataObjects) {
      if (objField === "assets" || objField === "scriptAssets" || objField === "info" || objField === "voxels") continue;
      zipFolder.file(objField + ".json", JSON.stringify(subDataObjects[objField], null, 2));
      fileCount++; completedFiles++; updateProgress();
      log("已保存: " + objField + ".json", "ok");
    }
  }

  // 体素处理
  if (options.optVoxelsMerge && voxelsData?.chunks) {
    log("开始构建稀疏体素数据 (" + voxelsData.chunks.length + " 个区块)...", "info");
    try {
      const sparseVoxels = await buildSparseVoxels(voxelsData, fetchBlockBinary, (processed, total) => {
        log("解码区块 " + processed + "/" + total, "info");
      });
      log("稀疏体素构建完成, 共 " + sparseVoxels.indices.length + " 个体素", "ok");

      const jsonStr = JSON.stringify(sparseVoxels);
      const gzipData = gzip(jsonStr, { level: 9 } as any);
      zipFolder.file("voxel-sparse.gz", gzipData, { compression: "STORE" });
      fileCount++; completedFiles++; updateProgress();
      log("压缩完成: " + (gzipData.length / 1024).toFixed(1) + "KB", "ok");
    } catch (e: any) {
      log("构建体素数据失败: " + e.message, "err");
      completedFiles++; updateProgress();
    }
  } else if (options.optAllJson && voxelsData?.chunks) {
    log("开始下载体素区块数据 (" + voxelsData.chunks.length + " 个区块)...", "info");
    const downloadedChunks: Record<string, boolean> = {};
    let chunkCount = 0;
    for (let ci = 0; ci < voxelsData.chunks.length; ci++) {
      const chunkHash = voxelsData.chunks[ci];
      try {
        if (downloadedChunks[chunkHash]) {
          completedFiles++; updateProgress();
          continue;
        }
        const chunkData = await fetchBlockBinary(chunkHash);
        zipFolder.file("voxels/chunk_" + ci + "_" + chunkHash + ".bin", chunkData);
        downloadedChunks[chunkHash] = true;
        chunkCount++;
        fileCount++; completedFiles++; updateProgress();
      } catch (e: any) {
        log("下载区块 " + ci + " 失败: " + e.message, "err");
        completedFiles++; updateProgress();
      }
    }
    log("体素区块下载完成: " + chunkCount + " 个唯一区块", "ok");
  }

  // 下载资源文件
  if (options.optAssets && assetsData) {
    let meshCount = 0, audioCount = 0, otherCount = 0, skippedCount = 0;
    log("开始下载资源文件 (模型/音频/粒子/滤镜)...", "info");
    for (const assetPath in assetsData) {
      const assetInfo = assetsData[assetPath];
      if (assetInfo?.hash) {
        try {
          const assetData = await fetchBlockBinary(assetInfo.hash);
          let savePath = "assets/" + assetPath;
          const isMesh = assetPath.indexOf("mesh/") === 0;

          if (isMesh && options.optVoxRename && savePath.endsWith(".vb")) {
            savePath = savePath.replace(/\.vb$/, ".vox");
          }

          if (isMesh) {
            try {
              const text = new TextDecoder("utf-8").decode(assetData);
              const jsonObj = JSON.parse(text);
              zipFolder.file(savePath, JSON.stringify(jsonObj, null, 2));
              meshCount++;
            } catch {
              zipFolder.file(savePath, assetData);
              meshCount++;
            }
          } else {
            zipFolder.file(savePath, assetData);
            if (assetPath.indexOf("audio/") === 0) audioCount++;
            else otherCount++;
          }
          fileCount++; completedFiles++; updateProgress();
        } catch (e: any) {
          log("下载资源 " + assetPath + " 失败: " + e.message, "err");
          completedFiles++; updateProgress();
        }
      } else {
        skippedCount++;
      }
    }
    if (skippedCount > 0) log("跳过 " + skippedCount + " 个内联资源(滤镜/特效等)", "info");
    log("资源文件下载完成: 模型" + meshCount + " 音频" + audioCount + " 其他" + otherCount, "ok");
  }

  // 下载脚本文件
  if (options.optScripts && scriptAssetsData) {
    let scriptSkippedCount = 0;
    log("开始下载脚本文件...", "info");
    for (const scriptPath in scriptAssetsData) {
      const scriptInfo = scriptAssetsData[scriptPath];
      if (scriptInfo?.hash) {
        try {
          const scriptData = await fetchBlockBinary(scriptInfo.hash);
          zipFolder.file("scripts/" + scriptPath, scriptData);
          fileCount++; completedFiles++; updateProgress();
        } catch (e: any) {
          log("下载脚本 " + scriptPath + " 失败: " + e.message, "err");
          completedFiles++; updateProgress();
        }
      } else {
        scriptSkippedCount++;
      }
    }
    if (scriptSkippedCount > 0) log("跳过 " + scriptSkippedCount + " 个内联脚本", "info");
    log("脚本文件下载完成", "ok");
  }

  // 下载信息图片
  if (options.optAssets && infoData) {
    if (infoData.bannerImages?.length > 0) {
      log("开始下载横幅图片...", "info");
      for (let bi = 0; bi < infoData.bannerImages.length; bi++) {
        const imgHash = infoData.bannerImages[bi];
        try {
          const imgData = await fetchBlockBinary(imgHash);
          const ext = imgHash.endsWith(".jpeg") || imgHash.endsWith(".jpg") ? ".jpg" : ".png";
          zipFolder.file("images/banner_" + bi + ext, imgData);
          fileCount++; completedFiles++; updateProgress();
        } catch (e: any) {
          log("下载横幅图片失败: " + e.message, "err");
          completedFiles++; updateProgress();
        }
      }
    }
    if (infoData.previewImage) {
      try {
        const previewData = await fetchBlockBinary(infoData.previewImage);
        zipFolder.file("images/preview.png", previewData);
        fileCount++; completedFiles++; updateProgress();
      } catch (e: any) {
        log("下载预览图失败: " + e.message, "err");
        completedFiles++; updateProgress();
      }
    }
  }

  // 生成 ZIP
  log("总共 " + fileCount + " 个文件, 正在打包...", "info");
  let lastPct = -1;
  const blob = await zip.generateAsync(
    { type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } },
    (m) => {
      const p = Math.round(m.percent);
      if (p !== lastPct) { lastPct = p; log("打包: " + p + "%", "info"); }
    },
  );
  log("导出完成!", "ok");
  onProgress(totalFiles, totalFiles);
  return { blob, fileName: map.name + ".zip", total: fileCount };
}
