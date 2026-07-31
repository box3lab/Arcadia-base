import { NextRequest } from "next/server";
import { handleOptions, verifySignature, jsonResp, ARC_MASTER_KEY } from "@/lib/api-utils";
import { query } from "@/lib/db-conn";
import idHashMap from "@/data/dao3-id-hash";
import mapAuthorMap from "@/data/dao3-map-author";
import fallbackAuthors from "@/data/allowed-authors.json";

let allowedSet: Set<string> | null = null;
let allowedAt = 0;
const CACHE_TTL = 60_000;

async function loadAllowedSet(): Promise<Set<string>> {
  if (allowedSet && Date.now() - allowedAt < CACHE_TTL) return allowedSet;
  try {
    const rows = await query("SELECT userId FROM allowed_authors");
    allowedSet = new Set((rows as any[]).map(r => String(r.userId)));
  } catch {
    allowedSet = new Set(Object.keys(fallbackAuthors.authors));
  }
  allowedAt = Date.now();
  return allowedSet!;
}

export async function OPTIONS() { return handleOptions(); }

export async function GET(req: NextRequest) {
  const sigErr = await verifySignature(req);
  if (sigErr) return sigErr;

  const url = new URL(req.url);
  const mapId = url.searchParams.get("mapId");
  if (!mapId) return jsonResp({ error: "missing_mapId" }, 400);

  const hash = (idHashMap as any)[mapId];
  if (!hash) return jsonResp({ code: 404, error: "not_found", mapId: Number(mapId) }, 404);

  const mk = req.headers.get("X-Master-Key");
  if (mk !== ARC_MASTER_KEY) {
    const authorId = (mapAuthorMap as any)[mapId];
    if (authorId) {
      const set = await loadAllowedSet();
      if (!set.has(String(authorId))) {
        return jsonResp({
          code: 403, error: "author_not_allowed",
          message: "该地图作者未参与开源计划，暂不可导出",
          mapId: Number(mapId), authorId,
        }, 403);
      }
    }
  }

  return jsonResp({ code: 200, data: hash, mapId: Number(mapId), mode: "play" });
}
