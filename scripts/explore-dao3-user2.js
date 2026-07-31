process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const https = require("https");
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJBQ0NFU1NfVE9LRU4iLCJpc3MiOiJjb2RlX2F1dGhfc2VydmljZSIsInN1YiI6IjMxMzI5MzQ1MzQ1Mzg4OSIsImp0aSI6IjkxMzRmOTcwLTExNWUtNGE4My05ODMzLThhNTQyMTcyZWRmMyIsImlhdCI6MTc4NTI4OTEwMiwiY2lkIjoxLCJhaHQiOjY0LCJ1c2giOiI3M2MyZTIxYzBmYzQ3Zjg4NDFhYTYwMDBhZjFlNjRjNyIsImlzaCI6IjEyMC4yMjYuMTU5LjIwOCJ9.DqeXdJ-q5Y-25Ze_SFHbu1fkE-rHMz5UvjHHEH7ZtpY";
const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";

function fetchUrl(path, method = "GET", body = null) {
  return new Promise((resolve) => {
    const opts = {
      hostname: "code-api-pc.dao3.fun",
      path: path,
      method: method,
      headers: { Authorization: token, "User-Agent": ua, "Content-Type": "application/json" },
      timeout: 10000,
    };
    const req = https.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve({ status: res.statusCode, body: data.slice(0, 3000) }));
    });
    req.on("error", (e) => resolve({ status: 0, body: e.message }));
    req.on("timeout", () => { req.destroy(); resolve({ status: 0, body: "timeout" }); });
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

(async () => {
  const tests = [
    // user/profile POST
    ["POST", "/user/profile", { userId: "2994821" }],
    ["POST", "/user/profile", { userId: 2994821 }],
    ["GET", "/user/profile?userId=2994821&selfId=313293453453889", null],
    // 尝试其他路径
    ["GET", "/user/experience?limit=1&offset=0&userId=2994821&withUser=1", null],
    ["GET", "/user/experience?limit=1&offset=0&userId=2994821&includeUser=1", null],
    // 尝试 community 相关
    ["GET", "/community/user?userId=2994821", null],
    ["POST", "/community/user/info", { userId: "2994821" }],
    ["POST", "/community/user/profile", { userId: "2994821" }],
    // 尝试 social
    ["GET", "/social/user?userId=2994821", null],
    ["GET", "/social/follow/count?userId=2994821", null],
    ["GET", "/social/friend/count?userId=2994821", null],
    // 尝试 auth
    ["GET", "/auth/user?userId=2994821", null],
    ["GET", "/auth/user/info?userId=2994821", null],
    // 尝试 map 相关
    ["GET", "/map/author?userId=2994821", null],
    // 尝试 content
    ["GET", "/content/author?userId=2994821", null],
    ["GET", "/content/user?userId=2994821", null],
    // 尝试 v2
    ["GET", "/v2/user/profile?userId=2994821", null],
    ["GET", "/v2/user/info?userId=2994821", null],
  ];

  for (const [method, ep, body] of tests) {
    const r = await fetchUrl(ep, method, body);
    console.log(`\n=== ${method} ${ep} ===`);
    console.log(`Status: ${r.status}`);
    try {
      const j = JSON.parse(r.body);
      console.log(JSON.stringify(j, null, 2).slice(0, 1000));
    } catch {
      console.log(r.body.slice(0, 300));
    }
  }
})();