import { NextRequest, NextResponse } from "next/server";

const ARC_SECRET = process.env.ARC_SECRET || "ArcadiaBase-API-Sig-2026";
export const ARC_MASTER_KEY = process.env.ARC_MASTER_KEY || "Arcadia-Master-Key-2026";
export const ARC_ADMIN_KEY = process.env.ARC_ADMIN_KEY || "Arcadia-Open-Key-2026";
const DAO3_UPSTREAM = "https://code-api-pc.dao3.fun";
const DAO3_TOKEN = process.env.DAO3_TOKEN || "";
const DAO3_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36 Edg/150.0.0.0";
export const DAO3_HASH_KEY = process.env.DAO3_HASH_KEY || "3c324d6e-2814-4d46-ba3a-b6e112bdab81";

export function jsonResp(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

export function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Arc-Sig, X-Arc-Ts, X-Arc-Nonce, X-Master-Key, X-Admin-Key, Authorization",
    },
  });
}

export async function verifySignature(req: NextRequest) {
  const sig = req.headers.get("X-Arc-Sig");
  const ts = req.headers.get("X-Arc-Ts");
  const nonce = req.headers.get("X-Arc-Nonce");
  if (!sig || !ts || !nonce) return jsonResp({ error: "missing_signature" }, 403);
  const now = Date.now();
  const tsNum = Number(ts);
  if (isNaN(tsNum) || Math.abs(now - tsNum) > 60000) return jsonResp({ error: "expired" }, 403);
  if (nonce.length < 8 || nonce.length > 64) return jsonResp({ error: "invalid_nonce" }, 403);
  const url = new URL(req.url);
  const basePath = process.env.NEXT_BASE_PATH || "";
  const path = url.pathname.replace(new RegExp(`^${basePath.replace(/\//g, "\\/")}`), "").replace(/^\/api/, "") + url.search;
  const expected = await sha256(nonce + ts + ARC_SECRET + path);
  if (sig !== expected) return jsonResp({ error: "invalid_signature" }, 403);
  return null;
}

async function sha256(data: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function dao3Fetch(path: string, method = "GET", body?: string) {
  const url = DAO3_UPSTREAM + path;
  const headers = new Headers();
  headers.set("Authorization", DAO3_TOKEN);
  headers.set("User-Agent", DAO3_UA);
  headers.set("Content-Type", "application/json");
  const resp = await fetch(url, {
    method,
    headers,
    body: method !== "GET" && method !== "HEAD" ? body : undefined,
  });
  const text = await resp.text();
  return { body: text, code: resp.status };
}