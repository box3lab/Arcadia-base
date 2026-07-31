import { NextRequest } from "next/server";
import { handleOptions, verifySignature, jsonResp, dao3Fetch, DAO3_HASH_KEY } from "@/lib/api-utils";

export async function OPTIONS() { return handleOptions(); }

export async function GET(req: NextRequest) {
  const sigErr = await verifySignature(req);
  if (sigErr) return sigErr;

  const url = new URL(req.url);
  const mapId = url.searchParams.get("mapId");
  const mode = url.searchParams.get("mode") || "play";
  if (!mapId) return jsonResp({ error: "missing_mapId" }, 400);

  const result = await dao3Fetch(`/engine/map/hash?mapId=${mapId}&mode=${mode}&key=${DAO3_HASH_KEY}`);
  if (result.code !== 200) return jsonResp({ error: `upstream_error_${result.code}` }, result.code);

  const json = JSON.parse(result.body);
  return jsonResp({ code: 200, data: json.data || json, mapId: Number(mapId), mode });
}