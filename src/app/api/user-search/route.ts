import { NextRequest } from "next/server";
import { handleOptions, verifySignature, jsonResp } from "@/lib/api-utils";
import { readFile } from "fs/promises";
import { join } from "path";

const PUBLIC_DIR = join(process.cwd(), "public");

interface IdMapEntry { file: number; minId: number; maxId: number; count: number; }
interface UserEntry { id: number; n: string; a: string; g: string | null; intro: string; }
interface NameIdxEntry { n: string; i: number; }

let idMap: IdMapEntry[] | null = null;
let nameCatalog: Record<string, { char: string; count: number }> | null = null;

async function fetchJson<T>(path: string): Promise<T> {
  const buf = await readFile(join(PUBLIC_DIR, path));
  return JSON.parse(new TextDecoder("utf-8").decode(buf)) as T;
}

async function ensureIdMap() {
  if (idMap) return;
  idMap = await fetchJson<IdMapEntry[]>("/data/user-id-map.json");
}

async function ensureNameCatalog() {
  if (nameCatalog) return;
  nameCatalog = await fetchJson<Record<string, { char: string; count: number }>>("/data/user-name-catalog.json");
}

async function searchById(userId: number): Promise<UserEntry[]> {
  await ensureIdMap();
  if (!idMap) return [];
  let lo = 0, hi = idMap.length - 1, found = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (userId >= idMap[mid].minId && userId <= idMap[mid].maxId) { found = mid; break; }
    if (userId < idMap[mid].minId) hi = mid - 1; else lo = mid + 1;
  }
  if (found === -1) return [];
  const shard = idMap[found];
  const users = await fetchJson<UserEntry[]>(`/data/users/${shard.file}.json`);
  const user = users.find(u => u.id === userId);
  return user ? [user] : [];
}

async function searchByName(query: string, limit: number): Promise<UserEntry[]> {
  await ensureNameCatalog();
  if (!nameCatalog) return [];
  const results: UserEntry[] = [];
  const lowerQuery = query.toLowerCase();
  const loadedShards = new Set<number>();
  const firstChar = query.charAt(0);
  const encoder = new TextEncoder();
  const firstCharKey = Array.from(encoder.encode(firstChar), b => b.toString(16).padStart(2, "0")).join("") || "_";

  if (nameCatalog[firstCharKey]) {
    const entries = await fetchJson<NameIdxEntry[]>(`/data/user-name-idx/${firstCharKey}.json`);
    const matched = entries.filter(e => e.n.toLowerCase().includes(lowerQuery));
    const userIds = matched.slice(0, limit * 2).map(e => e.i);
    await ensureIdMap();
    if (idMap) {
      for (const uid of userIds) {
        const shard = idMap.find(s => uid >= s.minId && uid <= s.maxId);
        if (shard && !loadedShards.has(shard.file)) {
          loadedShards.add(shard.file);
          const users = await fetchJson<UserEntry[]>(`/data/users/${shard.file}.json`);
          for (const u of users) {
            if (u.n.toLowerCase().includes(lowerQuery)) results.push(u);
          }
        }
      }
    }
  }

  if (results.length < limit) {
    for (const [key, info] of Object.entries(nameCatalog)) {
      if (key === firstCharKey) continue;
      const charLower = info.char.toLowerCase();
      const queryLower = query.charAt(0).toLowerCase();
      if (charLower !== queryLower) continue;
      try {
        const entries = await fetchJson<NameIdxEntry[]>(`/data/user-name-idx/${key}.json`);
        const matched = entries.filter(e => e.n.toLowerCase().includes(lowerQuery));
        const userIds = matched.slice(0, limit).map(e => e.i);
        await ensureIdMap();
        if (idMap) {
          for (const uid of userIds) {
            const shard = idMap.find(s => uid >= s.minId && uid <= s.maxId);
            if (shard && !loadedShards.has(shard.file)) {
              loadedShards.add(shard.file);
              const users = await fetchJson<UserEntry[]>(`/data/users/${shard.file}.json`);
              for (const u of users) {
                if (u.n.toLowerCase().includes(lowerQuery) && !results.find(r => r.id === u.id)) results.push(u);
              }
            }
          }
        }
      } catch {}
      if (results.length >= limit * 2) break;
    }
  }

  return results.slice(0, limit);
}

export async function OPTIONS() { return handleOptions(); }

export async function GET(req: NextRequest) {
  const sigErr = await verifySignature(req);
  if (sigErr) return sigErr;

  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").trim();
  const type = url.searchParams.get("type") || "auto";
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);

  if (!q) return jsonResp({ code: 400, msg: "缺少搜索参数 q" }, 400);

  try {
    const isIdSearch = type === "id" || (type === "auto" && /^\d+$/.test(q));
    let results: UserEntry[];
    if (isIdSearch) {
      const userId = parseInt(q);
      if (isNaN(userId) || userId <= 0) return jsonResp({ code: 400, msg: "无效的用户ID" }, 400);
      results = await searchById(userId);
    } else {
      results = await searchByName(q, limit);
    }
    return jsonResp({ code: 200, msg: "success", data: { query, type: isIdSearch ? "id" : "name", count: results.length, results } });
  } catch (e: any) {
    return jsonResp({ code: 500, msg: e.message }, 500);
  }
}
