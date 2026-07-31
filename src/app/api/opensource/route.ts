import { NextRequest } from "next/server";
import { handleOptions, verifySignature, jsonResp, ARC_ADMIN_KEY } from "@/lib/api-utils";
import { query } from "@/lib/db-conn";
import fallbackAuthors from "@/data/allowed-authors.json";

export async function OPTIONS() { return handleOptions(); }

export async function GET(req: NextRequest) {
  const sigErr = await verifySignature(req);
  if (sigErr) return sigErr;

  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "list";

  if (action === "list") {
    try {
      const rows = await query("SELECT userId, nickname, joinedAt FROM allowed_authors ORDER BY joinedAt ASC");
      return jsonResp({ code: 200, authors: rows });
    } catch {
      const authors = Object.entries(fallbackAuthors.authors).map(([userId, info]: [string, any]) => ({
        userId, nickname: info.nickname, joinedAt: info.joinedAt,
      }));
      return jsonResp({ code: 200, authors, _fallback: true });
    }
  }

  if (action === "participants") {
    const adminKey = req.headers.get("X-Admin-Key");
    if (adminKey !== ARC_ADMIN_KEY) return jsonResp({ error: "unauthorized" }, 403);
    try {
      const rows = await query("SELECT userId, nickname, joinedAt FROM opensource_participants ORDER BY joinedAt ASC");
      const map: Record<string, any> = {};
      for (const r of rows as any[]) {
        map[r.userId] = { nickname: r.nickname, joinedAt: r.joinedAt };
      }
      return jsonResp({ code: 200, participants: map });
    } catch {
      return jsonResp({ code: 200, participants: {}, _fallback: true });
    }
  }

  if (action === "check") {
    const userId = url.searchParams.get("userId");
    if (!userId) return jsonResp({ error: "missing_userId" }, 400);
    try {
      const row = await query("SELECT userId FROM allowed_authors WHERE userId = ?", [userId]);
      return jsonResp({ code: 200, allowed: row.length > 0 });
    } catch {
      const allowed = !!(fallbackAuthors.authors as any)[userId];
      return jsonResp({ code: 200, allowed, _fallback: true });
    }
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
    } catch {
      return jsonResp({ code: 200, message: "removed_fallback", _fallback: true });
    }
    return jsonResp({ code: 200, message: "removed" });
  }

  return jsonResp({ error: "unknown_action" }, 400);
}
