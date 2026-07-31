process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const https = require("https");
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJBQ0NFU1NfVE9LRU4iLCJpc3MiOiJjb2RlX2F1dGhfc2VydmljZSIsInN1YiI6IjMxMzI5MzQ1MzQ1Mzg4OSIsImp0aSI6IjkxMzRmOTcwLTExNWUtNGE4My05ODMzLThhNTQyMTcyZWRmMyIsImlhdCI6MTc4NTI4OTEwMiwiY2lkIjoxLCJhaHQiOjY0LCJ1c2giOiI3M2MyZTIxYzBmYzQ3Zjg4NDFhYTYwMDBhZjFlNjRjNyIsImlzaCI6IjEyMC4yMjYuMTU5LjIwOCJ9.DqeXdJ-q5Y-25Ze_SFHbu1fkE-rHMz5UvjHHEH7ZtpY";
const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";

function fetchUrl(path, method = "GET", body = null) {
  return new Promise((resolve) => {
    const opts = {
      hostname: "code-api-pc.dao3.fun",
      path, method,
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
  // 从 dao3-maps.json.gz 中提取作者信息
  const fs = require("fs");
  const zlib = require("zlib");
  const maps = JSON.parse(zlib.gunzipSync(fs.readFileSync("public/data/dao3-details.json.gz")));
  
  // 找 userId=2994821 的地图，看 author 对象的完整字段
  const byAuthor = maps.filter(m => m.author?.authorId === 2994821 || m.author?.authorId === "2994821");
  if (byAuthor.length > 0) {
    console.log("=== Author object from dao3-details ===");
    console.log(JSON.stringify(byAuthor[0].author, null, 2));
    // 看 coAuthors
    if (byAuthor[0].coAuthors) {
      console.log("\n=== coAuthors sample ===");
      console.log(JSON.stringify(byAuthor[0].coAuthors[0], null, 2));
    }
  }

  // 尝试更多 API 端点
  const tests = [
    // 尝试 PUT /user/profile
    ["PUT", "/user/profile", { userId: 2994821 }],
    // 尝试 PATCH
    ["PATCH", "/user/profile", { userId: 2994821 }],
    // 尝试 /user/profile/:id
    ["GET", "/user/profile/2994821", null],
    // 尝试 experience 加上 type=profile
    ["GET", "/user/experience?limit=1&offset=0&userId=2994821&type=profile", null],
    // 尝试 content/detail 获取单个地图详情（看返回的 author 字段）
    ["GET", "/content/detail?contentId=100520889", null],
    ["GET", "/map/detail?contentId=100520889", null],
    ["GET", "/experience/detail?contentId=100520889", null],
    // 尝试 user/experience 加 extra
    ["GET", "/user/experience?limit=1&offset=0&userId=2994821&extra=1", null],
    // 尝试搜索
    ["GET", "/search?keyword=孤僻的血翼蝠bawa&type=user", null],
    ["GET", "/search/user?keyword=孤僻的血翼蝠bawa", null],
    ["GET", "/user/search?keyword=孤僻的血翼蝠bawa", null],
  ];

  for (const [method, ep, body] of tests) {
    const r = await fetchUrl(ep, method, body);
    console.log(`\n=== ${method} ${ep} ===`);
    console.log(`Status: ${r.status}`);
    try {
      const j = JSON.parse(r.body);
      console.log(JSON.stringify(j, null, 2).slice(0, 1500));
    } catch {
      console.log(r.body.slice(0, 500));
    }
  }
})();
