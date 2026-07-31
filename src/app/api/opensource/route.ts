import { NextRequest } from "next/server";
import { handleOptions, verifySignature, jsonResp, ARC_ADMIN_KEY } from "@/lib/api-utils";
import { query } from "@/lib/db-conn";
import fallbackAuthors from "@/data/allowed-authors.json";

interface CacheEntry { authors: any[]; participants: Record<string, any>; allowedSet: Set<string>; }
let cache: CacheEntry | null = null;
let cacheAt = 0;
const CACHE_TTL = 60_000;

async function loadCache(): Promise<CacheEntry> {
  if (cache && Date.now() - cacheAt < CACHE_TTL) return cache;
  try {
    const [aRows, pRows] = await Promise.all([
      query("SELECT userId, nickname, joinedAt FROM allowed_authors ORDER BY joinedAt ASC"),
      query("SELECT userId, nickname, joinedAt FROM opensource_participants ORDER BY joinedAt ASC"),
    ]);
    const participants: Record<string, any> = {};
    const allowedSet = new Set<string>();
    for (const r of aRows as any[]) allowedSet.add(r.userId);
    for (const r of pRows as any[]) participants[r.userId] = { nickname: r.nickname, joinedAt: r.joinedAt };
    cache = { authors: aRows as any[], participants, allowedSet };
    cacheAt = Date.now();
    return cache;
  } catch {
    const authors = Object.entries(fallbackAuthors.authors).map(([userId, info]: [string, any]) => ({
      userId, nickname: info.nickname, joinedAt: info.joinedAt,
    }));
    const allowedSet = new Set(Object.keys(fallbackAuthors.authors));
    cache = { authors, participants: {}, allowedSet };
    cacheAt = Date.now();
    return cache;
  }
}

function invalidateCache() { cache = null; cacheAt = 0; }

export async function OPTIONS() { return handleOptions(); }

export async function GET(req: NextRequest) {
  const sigErr = await verifySignature(req);
  if (sigErr) return sigErr;

  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "list";
  const c = await loadCache();

  if (action === "list") {
    return jsonResp({ code: 200, authors: c.authors });
  }

  if (action === "participants") {
    const adminKey = req.headers.get("X-Admin-Key");
    if (adminKey !== ARC_ADMIN_KEY) return jsonResp({ error: "unauthorized" }, 403);
    return jsonResp({ code: 200, participants: c.participants });
  }

  if (action === "check") {
    const userId = url.searchParams.get("userId");
    if (!userId) return jsonResp({ error: "missing_userId" }, 400);
    return jsonResp({ code: 200, allowed: c.allowedSet.has(userId) });
  }

  return jsonResp({ error: "unknown_action" }, 400);
}

export async function POST(req: NextRequest) {
  const sigErr = await verifySignature(req);
  if (sigErr) return sigErr;

  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "join";

  if (action === "join") {
    let body: any;
    try { body = await req.json(); } catch { return jsonResp({ error: "invalid_body" }, 400); }
    const userId = String(body.userId || "");
    const nickname = String(body.nickname || "");
    if (!userId) return jsonResp({ error: "missing_userId" }, 400);
    try {
      await query(
        "INSERT IGNORE INTO opensource_participants (userId, nickname, joinedAt) VALUES (?, ?, NOW())",
        [userId, nickname || "用户"]
      );
      await query(
        "INSERT IGNORE INTO allowed_authors (userId, nickname, joinedAt) VALUES (?, ?, NOW())",
        [userId, nickname || "用户"]
      );
      invalidateCache();
    } catch {
      return jsonResp({ code: 200, message: "joined_fallback", _fallback: true });
    }
    return jsonResp({ code: 200, message: "joined" });
  }

  if (action === "remove") {
    const adminKey = req.headers.get("X-Admin-Key");
    if (adminKey !== ARC_ADMIN_KEY) return jsonResp({ error: "unauthorized" }, 403);
    let body: any;
    try { body = await req.json(); } catch { return jsonResp({ error: "invalid_body" }, 400); }
    const userId = String(body.userId || "");
    if (!userId) return jsonResp({ error: "missing_userId" }, 400);
    try {
      await query("DELETE FROM opensource_participants WHERE userId = ?", [userId]);
      await query("DELETE FROM allowed_authors WHERE userId = ?", [userId]);
      invalidateCache();
    } catch {
      return jsonResp({ code: 200, message: "removed_fallback", _fallback: true });
    }
    return jsonResp({ code: 200, message: "removed" });
  }

  return jsonResp({ error: "unknown_action" }, 400);
}
