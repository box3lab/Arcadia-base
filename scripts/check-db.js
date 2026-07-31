process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const mysql = require("mysql2/promise");
(async () => {
  const c = await mysql.createConnection({
    host: "43.154.99.73", port: 2000,
    database: "arcadiabase", user: "arcadia", password: "fRWi52DBJj4JDi8P",
  });
  const [tables] = await c.execute("SHOW TABLES");
  console.log("Tables:", JSON.stringify(tables));
  const [a] = await c.execute("SELECT * FROM allowed_authors ORDER BY joinedAt ASC");
  console.log("\nallowed_authors (" + a.length + "):", JSON.stringify(a, null, 2));
  const [p] = await c.execute("SELECT * FROM opensource_participants ORDER BY joinedAt ASC");
  console.log("\nopensource_participants (" + p.length + "):", JSON.stringify(p, null, 2));
  await c.end();
})();