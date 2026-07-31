export const BASE_URL = "https://static.box3.codemao.cn/block/";
export const ASSETS_URL = "https://assets.box3.fun/engine/";
export const API_BASE = "/api";
const HASH_RE = /^Qm[1-9A-HJ-NP-Za-km-z]{20,}$/;

const EXT_RE = /\.(png|jpg|jpeg|gif|webp|svg|mp3|ogg|wav|bin|vb|vox|json|js|part|lut)$/;

export function cleanHash(h: string): string {
  if (!h || typeof h !== "string") return h;
  return h.replace(EXT_RE, "");
}

export function isQmHash(h: string): boolean {
  return HASH_RE.test(cleanHash(h));
}

export function resolveHashUrl(hash: string): string {
  const h = cleanHash(hash);
  if (h.startsWith("http")) return h;
  if (HASH_RE.test(h)) return BASE_URL + h;
  return ASSETS_URL + "s/" + encodeURIComponent(h);
}

export function resolvePreviewUrl(hash: string): string {
  const h = cleanHash(hash);
  if (h.startsWith("http")) return h;
  if (HASH_RE.test(h)) return BASE_URL + h;
  return ASSETS_URL + "m/" + encodeURIComponent(h);
}

export function resolveBlockUrl(hash: string): string {
  const h = cleanHash(hash);
  if (h.startsWith("http")) return h;
  return BASE_URL + h;
}

export function resolveAssetUrl(hash: string, kind: "mesh" | "audio" | "image" | "script" | "json", previewImage?: string): string {
  const h = cleanHash(hash);
  if (h.startsWith("http")) return h;
  if (kind === "image" && previewImage) {
    const pi = cleanHash(previewImage);
    if (pi.startsWith("http")) return pi;
    if (HASH_RE.test(pi)) return BASE_URL + pi;
    return ASSETS_URL + "m/" + encodeURIComponent(pi);
  }
  if (kind === "audio" || kind === "image") {
    return BASE_URL + encodeURIComponent(h);
  }
  if (kind === "script") {
    if (HASH_RE.test(h)) return BASE_URL + h;
    return ASSETS_URL + "s/" + encodeURIComponent(h);
  }
  if (kind === "mesh") {
    if (HASH_RE.test(h)) return BASE_URL + h;
    return ASSETS_URL + "m/" + encodeURIComponent(h);
  }
  if (HASH_RE.test(h)) return BASE_URL + h;
  return ASSETS_URL + "s/" + encodeURIComponent(h);
}

export interface MapEntry {
  n: string;
  a: string;
  ai: number;
  h: string;
  d?: string;
}

export interface CurrentMap {
  name: string;
  hash: string;
  author_name: string;
  author_id: number;
  describe: string;
  projectHash?: string;
}

export interface UserProfile {
  mbti: string;
  mbtiBackcolor: string;
  mbtiUrl: string;
  constellation: string;
  constellationBackcolor: string;
  constellationUrl: string;
  gender: number;
  genderBackcolor: string;
  genderUrl: string;
  region: string;
  birthday: string;
}

export interface UserDetail {
  userId: number;
  nickname: string;
  avatar: string;
  avatarFrame: string;
  previewUrl: string;
  introduction: string;
}

export interface Box3RecommendItem {
  contentId: number;
  viewCount: number;
  commentCount: number;
  playCount: number;
  type: 1 | 2 | 3;
  name: string;
  image: string;
  playContainerName: string | null;
  authorId: number;
  authorName: string;
  authorAvatar: string;
  hash: string;
  audioHash: string;
  duration: number;
  version: number;
  versionId: number;
  createdAt: string;
  describe: string;
  url: string;
}


const blockCache = new Map<string, any>();
const binaryCache = new Map<string, Uint8Array>();
const profileCache = new Map<number, UserProfile | null>();
const detailCache = new Map<number, UserDetail | null>();
const pendingBlock = new Map<string, Promise<any>>();
const pendingBinary = new Map<string, Promise<Uint8Array>>();

const _sp = [65,114,99,97,100,105,97,66,97,115,101,45,65,80,73,45,83,105,103,45,50,48,50,54];
function _sd(): string { return _sp.map(c => String.fromCharCode(c)).join(""); }

async function sha256(data: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function randomNonce(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function signedFetch(url: string, init?: RequestInit): Promise<Response> {
  const u = new URL(url, window.location.origin);
  const basePath = window.__NEXT_DATA__?.basePath || "";
  const path = u.pathname.replace(new RegExp(`^${basePath}/api`), "").replace(/^\/api/, "") + u.search;
  const nonce = randomNonce();
  const ts = String(Date.now());
  const sig = await sha256(nonce + ts + _sd() + path);
  return fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      "X-Arc-Sig": sig,
      "X-Arc-Ts": ts,
      "X-Arc-Nonce": nonce,
    },
  });
}

export { signedFetch };

async function dao3SignedFetch(path: string, token: string, ua: string, init?: RequestInit): Promise<Response> {
  const base = apiBase();
  const url = base + path;
  const u = new URL(url, window.location.origin);
  const basePath = window.__NEXT_DATA__?.basePath || "";
  const signedPath = u.pathname.replace(new RegExp(`^${basePath}/api`), "").replace(/^\/api/, "") + u.search;
  const nonce = randomNonce();
  const ts = String(Date.now());
  const sig = await sha256(nonce + ts + _sd() + signedPath);
  return fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      "X-Arc-Sig": sig,
      "X-Arc-Ts": ts,
      "X-Arc-Nonce": nonce,
      "X-Dao-Auth": token,
      "X-Dao-UA": ua,
    },
  });
}

function apiBase(): string {
  return "/api";
}

export async function fetchUserProfile(userId: number): Promise<UserProfile | null> {
  if (profileCache.has(userId)) return profileCache.get(userId)!;
  try {
    const base = apiBase();
    const path = `/user/profile-info?userId=${userId}`;
    const resp = base === "/api" ? await signedFetch(base + path) : await fetch(base + path);
    if (!resp.ok) { profileCache.set(userId, null); return null; }
    const json = await resp.json();
    const result = (json.code === 200 && json.data) ? json.data : null;
    profileCache.set(userId, result);
    return result;
  } catch { profileCache.set(userId, null); return null; }
}

export async function fetchUserDetail(userId: number): Promise<UserDetail | null> {
  if (detailCache.has(userId)) return detailCache.get(userId)!;
  try {
    const base = apiBase();
    const path = `/user/profile/${userId}`;
    const resp = base === "/api" ? await signedFetch(base + path) : await fetch(base + path);
    if (!resp.ok) { detailCache.set(userId, null); return null; }
    const json = await resp.json();
    const result = (json.code === 200 && json.data) ? json.data : null;
    detailCache.set(userId, result);
    return result;
  } catch { detailCache.set(userId, null); return null; }
}

let _imageMap: Record<string, string> | null = null;

export async function loadImageMap(): Promise<Record<string, string>> {
  if (_imageMap) return _imageMap;
  try {
    const res = await fetch("/data/image-map.json");
    _imageMap = await res.json();
  } catch {
    _imageMap = {};
  }
    return _imageMap!;
}

export function blockImageUrl(hash: string): string {
  if (!hash) return "";
  if (hash.startsWith("/")) return hash;
  if (hash.startsWith("http")) return hash;
  const h = cleanHash(hash);
  if (_imageMap && _imageMap[h]) return _imageMap[h];
  if (HASH_RE.test(h)) return BASE_URL + h;
  return ASSETS_URL + "m/" + encodeURIComponent(h);
}

export async function localImageUrl(hash: string): Promise<string> {
  if (!hash || hash.startsWith("/") || hash.startsWith("http")) return hash;
  const h = cleanHash(hash);
  const map = await loadImageMap();
  return map[h] || (HASH_RE.test(h) ? BASE_URL + h : ASSETS_URL + "m/" + encodeURIComponent(h));
}

function parseFirstJSON(text: string): any {
  try { return JSON.parse(text); } catch {}
  let depth = 0, start = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') { if (depth === 0) start = i; depth++; }
    else if (text[i] === '}') { depth--; if (depth === 0 && start >= 0) { try { return JSON.parse(text.slice(start, i + 1)); } catch { start = -1; } } }
  }
  return text;
}

export async function fetchBlock(hash: string): Promise<any> {
  if (blockCache.has(hash)) return blockCache.get(hash);
  if (pendingBlock.has(hash)) return pendingBlock.get(hash);

  const promise = (async () => {
    const url = BASE_URL + hash;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        const resp = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (resp.ok) {
          const text = await resp.text();
          const result = parseFirstJSON(text);
          blockCache.set(hash, result);
          pendingBlock.delete(hash);
          return result;
        }

        if (resp.status === 504 || resp.status === 502 || resp.status === 503) {
          lastError = new Error(`服务器超时 (HTTP ${resp.status}), 重试中...`);
        } else {
          lastError = new Error(`HTTP ${resp.status}`);
          break;
        }
      } catch (e) {
        lastError = e as Error;
      }
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }

    pendingBlock.delete(hash);
    throw lastError || new Error("请求失败");
  })();

  pendingBlock.set(hash, promise);
  return promise;
}

export async function fetchBlockByHash(hash: string): Promise<any> {
  const h = cleanHash(hash);
  if (HASH_RE.test(h)) return fetchBlock(h);
  const url = BASE_URL + h;

  const cacheKey = "_ah_" + h;
  if (blockCache.has(cacheKey)) return blockCache.get(cacheKey);
  if (pendingBlock.has(cacheKey)) return pendingBlock.get(cacheKey);
  const promise = (async () => {
    let lastError: Error | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        const resp = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (resp.ok) {
          const text = await resp.text();
          const result = parseFirstJSON(text);
          blockCache.set(cacheKey, result);
          pendingBlock.delete(cacheKey);
          return result;
        }
        if (resp.status === 504 || resp.status === 502 || resp.status === 503) {
          lastError = new Error(`服务器超时 (HTTP ${resp.status})`);
        } else {
          lastError = new Error(`HTTP ${resp.status}`);
          break;
        }
      } catch (e) {
        lastError = e as Error;
      }
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
    }
    pendingBlock.delete(cacheKey);
    throw lastError || new Error("请求失败");
  })();
  pendingBlock.set(cacheKey, promise);
  return promise;
}

export async function fetchBlockBinaryByHash(hash: string): Promise<Uint8Array> {
  const h = cleanHash(hash);
  if (HASH_RE.test(h)) return fetchBlockBinary(h);
  const url = BASE_URL + encodeURIComponent(h);

  const cacheKey = "_ah_" + h;
  if (binaryCache.has(cacheKey)) return binaryCache.get(cacheKey)!;
  if (pendingBinary.has(cacheKey)) return pendingBinary.get(cacheKey)!;
  const promise = (async () => {
    let lastError: Error | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        const resp = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (resp.ok) {
          const buf = await resp.arrayBuffer();
          const result = new Uint8Array(buf);
          binaryCache.set(cacheKey, result);
          pendingBinary.delete(cacheKey);
          return result;
        }
        if (resp.status === 504 || resp.status === 502 || resp.status === 503) {
          lastError = new Error(`HTTP ${resp.status}`);
        } else {
          lastError = new Error(`HTTP ${resp.status}`);
          break;
        }
      } catch (e) {
        lastError = e as Error;
      }
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
    }
    try {
      const fallbackUrl = ASSETS_URL + "m/" + encodeURIComponent(h);
      const resp = await fetch(fallbackUrl);
      if (resp.ok) {
        const buf = await resp.arrayBuffer();
        const result = new Uint8Array(buf);
        binaryCache.set(cacheKey, result);
        pendingBinary.delete(cacheKey);
        return result;
      }
    } catch {}
    pendingBinary.delete(cacheKey);
    throw lastError || new Error("请求失败");
  })();
  pendingBinary.set(cacheKey, promise);
  return promise;
}

export async function fetchPreviewBinary(hash: string): Promise<Uint8Array> {
  const h = cleanHash(hash);
  if (HASH_RE.test(h)) return fetchBlockBinary(h);
  const url = ASSETS_URL + "m/" + encodeURIComponent(h);
  const cacheKey = "_pm_" + h;
  if (binaryCache.has(cacheKey)) return binaryCache.get(cacheKey)!;
  if (pendingBinary.has(cacheKey)) return pendingBinary.get(cacheKey)!;
  const promise = (async () => {
    let lastError: Error | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        const resp = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (resp.ok) {
          const buf = await resp.arrayBuffer();
          const result = new Uint8Array(buf);
          binaryCache.set(cacheKey, result);
          pendingBinary.delete(cacheKey);
          return result;
        }
        if (resp.status === 504 || resp.status === 502 || resp.status === 503) {
          lastError = new Error(`HTTP ${resp.status}`);
        } else {
          lastError = new Error(`HTTP ${resp.status}`);
          break;
        }
      } catch (e) {
        lastError = e as Error;
      }
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
    }
    try {
      const fallbackUrl = BASE_URL + encodeURIComponent(h);
      const resp = await fetch(fallbackUrl);
      if (resp.ok) {
        const buf = await resp.arrayBuffer();
        const result = new Uint8Array(buf);
        binaryCache.set(cacheKey, result);
        pendingBinary.delete(cacheKey);
        return result;
      }
    } catch {}
    pendingBinary.delete(cacheKey);
    throw lastError || new Error("请求失败");
  })();
  pendingBinary.set(cacheKey, promise);
  return promise;
}


export async function fetchBlockBinary(hash: string): Promise<Uint8Array> {
  if (binaryCache.has(hash)) return binaryCache.get(hash)!;
  if (pendingBinary.has(hash)) return pendingBinary.get(hash)!;

  const promise = (async () => {
    const url = BASE_URL + hash;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        const resp = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (resp.ok) {
          const buf = await resp.arrayBuffer();
          const result = new Uint8Array(buf);
          binaryCache.set(hash, result);
          pendingBinary.delete(hash);
          return result;
        }

        if (resp.status === 504 || resp.status === 502 || resp.status === 503) {
          lastError = new Error(`HTTP ${resp.status}`);
        } else {
          lastError = new Error(`HTTP ${resp.status}`);
          break;
        }
      } catch (e) {
        lastError = e as Error;
      }
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }

    pendingBinary.delete(hash);
    throw lastError || new Error("请求失败");
  })();

  pendingBinary.set(hash, promise);
  return promise;
}

export interface Dao3MapHashResult {
  hash: string;
  mode: string;
  mapId: number;
}

export async function fetchDao3MapHash(mapId: number, mode: "play" | "edit", token: string, ua: string): Promise<Dao3MapHashResult> {
  const path = `/map/hash?mode=${mode}&mapId=${mapId}`;
  const resp = await dao3SignedFetch(path, token, ua);
  const json = await resp.json();
  if (json.code !== 200) throw new Error(json.msg || `请求失败（${json.code}）`);
  return { hash: json.data || "", mode, mapId };
}

export interface Dao3SubMap {
  id: number;
  name: string;
  playHash: string;
  editHash: string;
}

export interface Dao3CreatorContent {
  id: number;
  name: string;
  playHash: string;
  editHash: string;
  type: number;
  image?: string;
  describe?: string;
  subMaps?: Dao3SubMap[];
  createdAt: string;
  updatedAt: string;
}

export async function fetchDao3CreatorContents(token: string, ua: string, params: {
  limit?: number;
  offset?: number;
  type?: number;
  ownership?: number;
  orderBy?: number;
  orderDesc?: boolean;
  title?: string;
}): Promise<{ rows: Dao3CreatorContent[]; count: number }> {
  const body = {
    limit: params.limit ?? 20,
    offset: params.offset ?? 0,
    type: params.type ?? 0,
    ownership: params.ownership ?? 0,
    orderBy: params.orderBy ?? 1,
    orderDesc: params.orderDesc ?? true,
    ...(params.title ? { title: params.title } : {}),
  };
  const resp = await dao3SignedFetch("/ugc/creator/content/page", token, ua, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await resp.json();
  if (json.code !== 200) throw new Error(json.msg || "获取地图列表失败");
  return json.data;
}

export interface Dao3MapHashByMapIdResult {
  hash: string;
  mapId: number;
  mode: string;
  allowed?: boolean;
  authorId?: number;
  errorMessage?: string;
}

export async function fetchDao3MapHashByMapId(mapId: number, mode: "play" | "edit" = "play"): Promise<Dao3MapHashByMapIdResult> {
  const base = apiBase();

  try {
    const localPath = `/dao3-local-hash?mapId=${mapId}`;
    const localResp = base === "/api" ? await signedFetch(base + localPath) : await fetch(base + localPath);
    if (localResp.ok) {
      const localJson = await localResp.json();
      if (localJson.code === 200 && localJson.data) {
        return {
          hash: localJson.data,
          mapId: localJson.mapId,
          mode: localJson.mode || mode,
          allowed: true,
        };
      }
      if (localJson.code === 403 && localJson.error === "author_not_allowed") {
        return {
          hash: "",
          mapId: localJson.mapId || mapId,
          mode: mode,
          allowed: false,
          authorId: localJson.authorId,
          errorMessage: localJson.message || "该地图作者未参与开源计划，暂不可导出",
        };
      }
    } else {
      const localJson = await localResp.json().catch(() => ({}));
      if (localJson.code === 403 && localJson.error === "author_not_allowed") {
        return {
          hash: "",
          mapId: localJson.mapId || mapId,
          mode: mode,
          allowed: false,
          authorId: localJson.authorId,
          errorMessage: localJson.message || "该地图作者未参与开源计划，暂不可导出",
        };
      }
    }
  } catch {}

  const path = `/dao3-map-hash?mapId=${mapId}&mode=${mode}`;
  const resp = base === "/api" ? await signedFetch(base + path) : await fetch(base + path);

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({}));
    throw new Error(errorData.error || `请求失败（${resp.status}）`);
  }

  const json = await resp.json();
  if (json.code !== 200) {
    throw new Error(json.error || "获取地图 Hash 失败");
  }

  return {
    hash: json.data || "",
    mapId: json.mapId,
    mode: json.mode,
  };
}

export interface Dao3MapFullInfo {
  name: string;
  description: string;
  permissionHash: string;
  projectHash?: string;
  infoHash?: string;
  mapId: number;
  mode: string;
}

export async function fetchDao3MapFullInfo(mapId: number, mode: "play" | "edit" = "play"): Promise<Dao3MapFullInfo> {
  const hashResult = await fetchDao3MapHashByMapId(mapId, mode);
  const permHash = hashResult.hash;
  
  const permBlock = await fetchBlock(permHash);
  
  let projectHash: string | null = null;
  let infoHash: string | null = null;
  let mapName = "未命名地图";
  let description = "";
  
  if (permBlock?.versionControl) {
    const vcBlock = await fetchBlock(permBlock.versionControl);
    
    if (vcBlock?.headHash) {
      projectHash = vcBlock.headHash;
    } else if (vcBlock?.branches) {
      for (const branchKey of Object.keys(vcBlock.branches)) {
        const branch = vcBlock.branches[branchKey];
        if (branch.headHash) {
          projectHash = branch.headHash;
          break;
        }
        if (branch.hash) {
          projectHash = branch.hash;
          break;
        }
      }
    }
    
    if (projectHash) {
      const projectBlock = await fetchBlock(projectHash);
      
      if (projectBlock?.info) {
        if (typeof projectBlock.info === "string") {
          infoHash = projectBlock.info;
          const infoBlock = await fetchBlock(infoHash!);
          if (infoBlock?.displayName) mapName = infoBlock.displayName;
          if (infoBlock?.description) description = infoBlock.description;
        } else if (typeof projectBlock.info === "object") {
          infoHash = projectBlock.info.hash || null;
          if (projectBlock.info.displayName) mapName = projectBlock.info.displayName;
          if (projectBlock.info.description) description = projectBlock.info.description;
        }
      }
    }
  }
  
  return {
    name: mapName,
    description,
    permissionHash: permHash,
    projectHash: projectHash || undefined,
    infoHash: infoHash || undefined,
    mapId,
    mode,
  };
}

export interface Dao3UserExperienceItem {
  contentId: number;
  name: string;
  description: string;
  playHash: string;
  preview: string;
  playCount: number;
  onlineCount: number;
}

export interface Dao3UserExperienceResult {
  rows: Dao3UserExperienceItem[];
  count: number;
}

export interface Dao3ModelItem {
  modelId: number;
  modelName: string;
  modelDescription: string;
  modelPreviewUrl: string;
  projectFileHash: string;
  modelType: number;
  creativeMode: number;
  containerMode: string;
}

export interface Dao3ModelsResult {
  rows: Dao3ModelItem[];
  count: number;
}

export async function fetchDao3Models(params: {
  modelType?: string;
  containerMode?: string;
  creativeMode?: string;
  orderBy?: string;
  limit?: string;
  offset?: string;
  mapId?: string;
  modelName?: string;
}): Promise<Dao3ModelsResult> {
  const base = apiBase();
  const sp = new URLSearchParams();
  if (params.modelType) sp.set("modelType", params.modelType);
  if (params.containerMode) sp.set("containerMode", params.containerMode);
  if (params.creativeMode) sp.set("creativeMode", params.creativeMode);
  if (params.orderBy) sp.set("orderBy", params.orderBy);
  if (params.limit) sp.set("limit", params.limit);
  if (params.offset) sp.set("offset", params.offset);
  if (params.mapId) sp.set("mapId", params.mapId);
  if (params.modelName) sp.set("modelName", params.modelName);

  const path = `/dao3-models?${sp.toString()}`;
  const resp = base === "/api" ? await signedFetch(base + path) : await fetch(base + path);

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({}));
    throw new Error(errorData.error || `请求失败（${resp.status}）`);
  }

  const json = await resp.json();
  if (json.code !== 200) {
    throw new Error(json.msg || json.error || "获取模型列表失败");
  }

  return {
    rows: json.data?.rows || [],
    count: json.data?.count || 0,
  };
}

export async function fetchDao3UserExperience(userId: number, limit: number = 100, offset: number = 0): Promise<Dao3UserExperienceResult> {
  const base = apiBase();
  const path = `/dao3-user-experience?userId=${userId}&limit=${limit}&offset=${offset}`;
  
  const resp = base === "/api" ? await signedFetch(base + path) : await fetch(base + path);
  
  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({}));
    throw new Error(errorData.error || `请求失败（${resp.status}）`);
  }
  
  const json = await resp.json();
  if (json.code !== 200) {
    throw new Error(json.msg || "获取用户地图列表失败");
  }
  
  return {
    rows: json.data?.rows || [],
    count: json.data?.count || 0,
  };
}
