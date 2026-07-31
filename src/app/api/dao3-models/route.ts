import { NextRequest } from "next/server";
import { handleOptions, verifySignature, jsonResp, dao3Fetch } from "@/lib/api-utils";

export async function OPTIONS() { return handleOptions(); }

export async function GET(req: NextRequest) {
  const sigErr = await verifySignature(req);
  if (sigErr) return sigErr;

  const url = new URL(req.url);
  const params = url.searchParams;
  const upstreamParams = new URLSearchParams();
  for (const k of ["modelType", "containerMode", "creativeMode", "orderBy", "limit", "offset", "mapId", "modelName"]) {
    const v = params.get(k);
    if (v) upstreamParams.set(k, v);
  }
  if (!upstreamParams.has("modelType")) upstreamParams.set("modelType", "2");
  if (!upstreamParams.has("containerMode")) upstreamParams.set("containerMode", "edit");
  if (!upstreamParams.has("orderBy")) upstreamParams.set("orderBy", "0");
  if (!upstreamParams.has("limit")) upstreamParams.set("limit", "100");
  if (!upstreamParams.has("offset")) upstreamParams.set("offset", "0");

  const result = await dao3Fetch(`/models/v2?${upstreamParams.toString()}`);
  if (result.code !== 200) return jsonResp({ error: `upstream_error_${result.code}` }, result.code);

  return new Response(result.body, {
    status: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}