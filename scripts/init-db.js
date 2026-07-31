const mysql = require("mysql2/promise");
(async () => {
  const c = await mysql.createConnection({
    host: process.env.DB_HOST || "43.154.99.73",
    port: Number(process.env.DB_PORT) || 2000,
    database: process.env.DB_NAME || "arcadiabase",
    user: process.env.DB_USER || "arcadia",
    password: process.env.DB_PASSWORD || "",
  });
  await c.execute(
    `CREATE TABLE IF NOT EXISTS opensource_participants (userId VARCHAR(32) PRIMARY KEY, nickname VARCHAR(128) NOT NULL, joinedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
  );
  await c.execute(
    `CREATE TABLE IF NOT EXISTS allowed_authors (userId VARCHAR(32) PRIMARY KEY, nickname VARCHAR(128) NOT NULL, joinedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
  );
  await c.execute(
    `INSERT IGNORE INTO allowed_authors (userId, nickname, joinedAt) VALUES ('2994821', '孤僻的血翼蝠bawa', '2026-07-30'), ('302445821485895', '灵境', '2026-07-30')`
  );
  const [r1] = await c.execute("SELECT COUNT(*) as c FROM allowed_authors");
  const [r2] = await c.execute("SELECT COUNT(*) as c FROM opensource_participants");
  console.log("allowed_authors:", r1[0].c, "participants:", r2[0].c);
  await c.end();
})();
