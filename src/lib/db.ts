import mysql from "mysql2/promise";
import type { Pool, RowDataPacket, ResultSetHeader, ExecuteValues } from "mysql2/promise";

/** What a prepared statement accepts in a positional placeholder. */
export type SqlParam = ExecuteValues;

/**
 * MySQL connection pool.
 *
 * One pool per Node process, cached on `globalThis` so the dev server's hot
 * reload does not open a new pool (and leak the old one's sockets) on every
 * edit. Nothing here runs at import time — the pool is created on the first
 * query, which keeps `next build` from needing a reachable database.
 *
 * Configure with a `.env.local` at the repo root:
 *
 *   MYSQL_HOST=localhost
 *   MYSQL_PORT=3306
 *   MYSQL_USER=techcadd
 *   MYSQL_PASSWORD=...
 *   MYSQL_DATABASE=techcadd_mohali
 */

declare global {
  var __techcaddPool: Pool | undefined;
  var __techcaddSchemaReady: Promise<void> | undefined;
}

/** True when the app has been given database credentials. */
export function isDbConfigured() {
  return Boolean(process.env.MYSQL_DATABASE && process.env.MYSQL_USER);
}

export function getPool(): Pool {
  if (!globalThis.__techcaddPool) {
    globalThis.__techcaddPool = mysql.createPool({
      host: process.env.MYSQL_HOST || "localhost",
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "techcadd_mohali",
      waitForConnections: true,
      connectionLimit: Number(process.env.MYSQL_POOL_SIZE || 10),
      queueLimit: 0,
      charset: "utf8mb4_unicode_ci",
      enableKeepAlive: true,
    });
  }
  return globalThis.__techcaddPool;
}

/** SELECT helper — typed rows out, positional params in. */
export async function query<T extends RowDataPacket>(sql: string, params: SqlParam[] = []) {
  const [rows] = await getPool().execute<T[]>(sql, params);
  return rows;
}

/** INSERT / UPDATE / DELETE helper — returns insertId and affectedRows. */
export async function execute(sql: string, params: SqlParam[] = []) {
  const [result] = await getPool().execute<ResultSetHeader>(sql, params);
  return result;
}

export const CREATE_ENQUIRIES_TABLE = `
CREATE TABLE IF NOT EXISTS enquiries (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  form_type     VARCHAR(32)  NOT NULL DEFAULT 'enquiry',
  source        VARCHAR(120) NOT NULL DEFAULT 'Website',
  name          VARCHAR(120) NOT NULL DEFAULT '',
  phone         VARCHAR(24)  NOT NULL DEFAULT '',
  email         VARCHAR(160) NOT NULL DEFAULT '',
  course        VARCHAR(160) NOT NULL DEFAULT '',
  mode          VARCHAR(48)  NOT NULL DEFAULT '',
  message       TEXT         NULL,
  branch        VARCHAR(60)  NOT NULL DEFAULT 'Mohali',
  page_url      VARCHAR(255) NOT NULL DEFAULT '',
  referrer      VARCHAR(255) NOT NULL DEFAULT '',
  ip_address    VARCHAR(45)  NOT NULL DEFAULT '',
  user_agent    VARCHAR(255) NOT NULL DEFAULT '',
  status        ENUM('new','contacted','enrolled','closed') NOT NULL DEFAULT 'new',
  notes         TEXT         NULL,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_created_at (created_at),
  KEY idx_status (status),
  KEY idx_phone (phone),
  KEY idx_form_type (form_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

/**
 * The enquiries table, created on demand.
 *
 * `db/schema.sql` holds the same statement for anyone who would rather create
 * it by hand in MySQL Workbench; keep the two in step. Running it is
 * idempotent, and the promise is cached so concurrent requests on a cold start
 * do not race each other into six identical CREATE TABLE statements.
 */
export function ensureSchema() {
  if (!globalThis.__techcaddSchemaReady) {
    globalThis.__techcaddSchemaReady = getPool()
      .query(CREATE_ENQUIRIES_TABLE)
      .then(() => undefined)
      .catch((err) => {
        // Let the next request try again rather than caching the failure.
        globalThis.__techcaddSchemaReady = undefined;
        throw err;
      });
  }
  return globalThis.__techcaddSchemaReady;
}
