process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const https = require("https");
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJBQ0NFU1NfVE9LRU4iLCJpc3MiOiJjb2RlX2F1dGhfc2VydmljZSIsInN1YiI6IjMxMzI5MzQ1MzQ1Mzg4OSIsImp0aSI6IjkxMzRmOTcwLTExNWUtNGE4My05ODMzLThhNTQyMTcyZWRmMyIsImlhdCI6MTc4NTI4OTEwMiwiY2lkIjoxLCJhaHQiOjY0LCJ1c2giOiI3M2MyZTIxYzBmYzQ3Zjg4NDFhYTYwMDBhZjFlNjRjNyIsImlzaCI6IjEyMC4yMjYuMTU5LjIwOCJ9.DqeXdJ-q5Y-25Ze_SFHbu1fkE-rHMz5UvjHHEH7ZtpY";
const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";

function fetchUrl(path) {
  return new Promise((resolve) => {
    const url = "https://code-api-pc.dao3.fun" + path;
    const headers = new (require("http").IncomingMessage.prototype.constructor.headers ? Map : Map)();
    const opts = {
      hostname: "code-api-pc.dao3.fun",
      path: path,
      method: "GET",
      headers: { Authorization: token, "User-Agent": ua, "Content-Type": "application/json" },
      timeout: 10000,
    };
    const req = https.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve({ status: res.statusCode, body: data.slice(0, 2000) }));
    });
    req.on("error", (e) => resolve({ status: 0, body: e.message }));
    req.on("timeout", () => { req.destroy(); resolve({ status: 0, body: "timeout" }); });
    req.end();
  });
}

(async () => {
  const endpoints = [
    "/user/experience?limit=5&offset=0&userId=2994821",
    "/user/info?userId=2994821",
    "/user/profile?userId=2994821",
    "/user/detail?userId=2994821",
    "/user?userId=2994821",
    "/user/2994821",
    "/user/experience?limit=1&offset=0&userId=2994821&type=id",
    "/user/follow?userId=2994821",
    "/user/follower?userId=2994821",
    "/user/following?userId=2994821",
    "/community/user/info?userId=2994821",
    "/community/user/profile?userId=2994821",
  ];

  for (const ep of endpoints) {
    const r = await fetchUrl(ep);
    console.log(`\n=== ${ep} ===`);
    console.log(`Status: ${r.status}`);
    try {
      const j = JSON.parse(r.body);
      console.log(JSON.stringify(j, null, 2).slice(0, 1500));
    } catch {
      console.log(r.body.slice(0, 500));
    }
  }
})();