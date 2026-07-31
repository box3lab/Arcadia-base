import { NextRequest } from "next/server";
import { jsonResp, handleOptions } from "@/lib/api-utils";

const DAO3_TOKEN_URL = "https://dao3.fun/oauth2.0/token";
const CLIENT_ID = "box3lab";
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET || "";

export async function OPTIONS() { return handleOptions(); }

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return jsonResp({ error: "invalid_body" }, 400); }

  const code = body.code;
  const redirectUri = body.redirect_uri;
  if (!code) return jsonResp({ error: "missing_code" }, 400);

  const params = new URLSearchParams();
  params.set("grant_type", "authorization_code");
  params.set("client_id", CLIENT_ID);
  params.set("client_secret", CLIENT_SECRET);
  params.set("code", code);
  params.set("redirect_uri", redirectUri || "");

  const headers = new Headers();
  headers.set("Content-Type", "application/x-www-form-urlencoded");

  try {
    const resp = await fetch(DAO3_TOKEN_URL, { method: "POST", headers, body: params.toString() });
    const text = await resp.text();
    let data: any;
    try { data = JSON.parse(text); } catch { return jsonResp({ error: "invalid_token_response", raw: text }, 502); }

    if (data.access_token) {
      return jsonResp({ code: 200, access_token: data.access_token, token_type: data.token_type, expires_in: data.expires_in });
    }
    return jsonResp({ error: "token_exchange_failed", detail: data }, 502);
  } catch (e: any) {
    return jsonResp({ error: "token_request_failed", message: e.message }, 502);
  }
}