import { NextRequest } from "next/server";
import { handleOptions, verifySignature, jsonResp, ARC_MASTER_KEY } from "@/lib/api-utils";
import { queryOne } from "@/lib/db-conn";
import idHashMap from "@/data/dao3-id-hash";
import mapAuthorMap from "@/data/dao3-map-author";
import fallbackAuthors from "@/data/allowed-authors.json";

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
      let allowed = false;
      try {
        const row = await queryOne("SELECT userId FROM allowed_authors WHERE userId = ?", [String(authorId)]);
        allowed = !!row;
      } catch {
        allowed = !!(fallbackAuthors.authors as any)[String(authorId)];
      }
      if (!allowed) {
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
