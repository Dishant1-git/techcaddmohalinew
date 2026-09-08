/**
 * One-shot database bootstrap.
 *
 *   npm run db:setup
 *
 * Reads MYSQL_* from .env.local, connects to the server, creates the database
 * and the `enquiries` table if they are missing, and prints what it found. Safe
 * to run again — every statement is `IF NOT EXISTS`.
 *
 * The same table definition lives in `db/schema.sql` for MySQL Workbench, and
 * in `src/lib/db.ts` for the running app. Keep the three in step.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import mysql from "mysql2/promise";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Minimal .env reader — enough for KEY=value lines and # comments. */
function loadEnv(file) {
  let text;
  try {
    text = readFileSync(join(root, file), "utf8");
  } catch {
    return false;
  }
  for (const line of text.split(/\r?\n/)) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/i.exec(line);
    if (!match) continue;
    const value = match[2].trim().replace(/^["'](.*)["']$/, "$1");
    if (process.env[match[1]] === undefined) process.env[match[1]] = value;
  }
  return true;
}

const found = loadEnv(".env.local") || loadEnv(".env");

if (!found) {
  console.error(
    "\n  No .env.local found.\n" +
      "  Copy .env.example to .env.local and fill in your MySQL details first.\n",
  );
  process.exit(1);
}

const config = {
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
};

const database = process.env.MYSQL_DATABASE || "techcadd_mohali";

const CREATE_TABLE = `
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

let connection;

try {
  connection = await mysql.createConnection(config);
  console.log(`  Connected to MySQL at ${config.host}:${config.port} as ${config.user}`);
} catch (err) {
  console.error(`\n  Could not connect to MySQL at ${config.host}:${config.port}.`);
  console.error(`  ${err.code || ""} ${err.message}`);
  console.error("\n  Check that the MySQL service is running and that the");
  console.error("  MYSQL_USER / MYSQL_PASSWORD in .env.local are the same ones");
  console.error("  you use to log in from MySQL Workbench.\n");
  process.exit(1);
}

try {
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  );
  console.log(`  Database ready: ${database}`);

  await connection.changeUser({ database });
  await connection.query(CREATE_TABLE);
  console.log("  Table ready: enquiries");

  const [columns] = await connection.query("SHOW COLUMNS FROM enquiries");
  const [[counts]] = await connection.query("SELECT COUNT(*) AS total FROM enquiries");

  console.log(`  Columns: ${columns.length}   Rows already stored: ${counts.total}`);
  console.log("\n  Done. Start the site with `npm run dev` and submit any form.");
  console.log("  Then in MySQL Workbench:  SELECT * FROM techcadd_mohali.enquiries ORDER BY id DESC;\n");
} catch (err) {
  console.error(`\n  Setup failed: ${err.code || ""} ${err.message}\n`);
  process.exitCode = 1;
} finally {
  await connection.end();
}
