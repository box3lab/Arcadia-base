import { NextRequest } from "next/server";
import { handleOptions, verifySignature, jsonResp } from "@/lib/api-utils";
import { ungzip } from "pako";

let recommendDb: Record<string, any[]> | null = null;

async function loadGzJson(path: string): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const resp = await fetch(baseUrl + path);
  if (!resp.ok) throw new Error(`Failed to fetch ${path}: ${resp.status}`);
  const compressed = new Uint8Array(await resp.arrayBuffer());
  const decompressed = ungzip(compressed);
  return JSON.parse(new TextDecoder("utf-8").decode(decompressed));
}

export async function OPTIONS() { return handleOptions(); }

export async function GET(req: NextRequest) {
  const sigErr = await verifySignature(req);
  if (sigErr) return sigErr;

  const url = new URL(req.url);
  const type = url.searchParams.get("type") || "1";

  if (!recommendDb) {
    try {
      recommendDb = await loadGzJson("/data/box3-recommend.json.gz");
    } catch (e: any) {
      return jsonResp({ error: "load_failed", message: e.message }, 500);
    }
  }

  const items = recommendDb[type] || [];
  return jsonResp({ items });
}