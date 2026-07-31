import { NextRequest } from "next/server";
import { handleOptions, verifySignature, jsonResp } from "@/lib/api-utils";
import { ungzip } from "pako";
import { readFile } from "fs/promises";
import { join } from "path";

const PUBLIC_DIR = join(process.cwd(), "public");

let box3Db: any[] | null = null;
let dao3Db: any[] | null = null;
let box3SearchDb: any[] | null = null;
let loadingPromise: Promise<void> | null = null;

async function loadGzJson(path: string): Promise<any> {
  const compressed = await readFile(join(PUBLIC_DIR, path));
  const decompressed = ungzip(new Uint8Array(compressed.buffer, compressed.byteOffset, compressed.byteLength));
  return JSON.parse(new TextDecoder("utf-8").decode(decompressed));
}

async function ensureDatabases() {
  if (box3Db && dao3Db && box3SearchDb) return;
  if (loadingPromise) { await loadingPromise; return; }
  loadingPromise = (async () => {
    try {
      const [box3, dao3, bs] = await Promise.all([
        loadGzJson("/data/db.json.gz"),
        loadGzJson("/data/dao3-details.json.gz"),
        loadGzJson("/data/box3-search.json.gz"),
      ]);
      box3Db = box3;
      dao3Db = dao3;
      const maps = (bs["1"] || []).map((e: any) => ({ ...e, contentType: 1 }));
      const models = (bs["2"] || []).map((e: any) => ({ ...e, contentType: 2 }));
      const music = (bs["3"] || []).map((e: any) => ({ ...e, contentType: 3 }));
      box3SearchDb = [...maps, ...models, ...music];
    } catch (e) {
      loadingPromise = null;
      throw e;
    }
  })();
  await loadingPromise;
}

export async function OPTIONS() { return handleOptions(); }

export async function GET(req: NextRequest) {
  const sigErr = await verifySignature(req);
  if (sigErr) return sigErr;

  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").toLowerCase();
  const sources = (url.searchParams.get("sources") || "box3,dao3,box3-search").split(",");
  const contentType = url.searchParams.get("contentType");
  const tab = url.searchParams.get("tab");
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(10000, Math.max(1, parseInt(url.searchParams.get("limit") || "20")));

  try {
    await ensureDatabases();
  } catch (e: any) {
    return jsonResp({ error: "database_load_failed", message: e.message }, 500);
  }

  const results: any[] = [];
  const ctNum = contentType ? parseInt(contentType) : null;

  if (sources.includes("box3") && box3Db && (!ctNum || ctNum === 1)) {
    for (const e of box3Db) {
      if (q && !e.n?.toLowerCase().includes(q) && !e.a?.toLowerCase().includes(q) && !e.h?.toLowerCase().includes(q) && String(e.ai) !== q) continue;
      results.push({ source: "box3", data: e });
    }
  }

  if (sources.includes("dao3") && dao3Db && (!ctNum || ctNum === 1)) {
    for (const e of dao3Db) {
      if (tab && e.tab?.tabKey !== tab) continue;
      if (q && !e.name?.toLowerCase().includes(q) && !e.author?.nickname?.toLowerCase().includes(q) && String(e.contentId) !== q && !(e.coAuthors?.some((c: any) => c.nickname?.toLowerCase().includes(q)))) continue;
      results.push({ source: "dao3", data: e });
    }
  }

  if (sources.includes("box3-search") && box3SearchDb) {
    for (const e of box3SearchDb) {
      if (ctNum && e.contentType !== ctNum) continue;
      if (q && !e.name?.toLowerCase().includes(q) && !e.author?.displayname?.toLowerCase().includes(q) && String(e.contentId) !== q) continue;
      results.push({ source: "box3-search", data: e });
    }
  }

  const total = results.length;
  const counts = { box3: 0, dao3: 0, "box3-search": 0 };
  for (const r of results) counts[r.source as keyof typeof counts]++;
  const start = (page - 1) * limit;
  const paged = results.slice(start, start + limit);

  return jsonResp({ results: paged, total, counts, page, limit });
}
