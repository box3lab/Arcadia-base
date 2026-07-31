import { NextRequest } from "next/server";
import { handleOptions, verifySignature, jsonResp, dao3Fetch } from "@/lib/api-utils";

export async function OPTIONS() { return handleOptions(); }

export async function GET(req: NextRequest) {
  const sigErr = await verifySignature(req);
  if (sigErr) return sigErr;

  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  if (!userId) return jsonResp({ error: "missing_userId" }, 400);

  const result = await dao3Fetch(`/user/profile/${userId}`);
  if (result.code !== 200) return jsonResp({ error: `upstream_error_${result.code}` }, result.code >= 400 ? result.code : 502);

  return new Response(result.body, {
    status: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}