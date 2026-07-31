import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (pool) return pool;
  pool = mysql.createPool({
    host: process.env.DB_HOST || "43.154.99.73",
    port: Number(process.env.DB_PORT) || 2000,
    database: process.env.DB_NAME || "arcadiabase",
    user: process.env.DB_USER || "arcadia",
    password: process.env.DB_PASSWORD || "",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: "utf8mb4",
  });
  return pool;
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const p = getPool();
  const [rows] = await p.execute(sql, params);
  return rows as T[];
}

export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

export interface OpenSourceParticipant {
  userId: string;
  nickname: string;
  joinedAt: string;
}

export interface AllowedAuthor {
  userId: string;
  nickname: string;
  joinedAt: string;
}