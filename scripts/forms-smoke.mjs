/**
 * End-to-end check that every form on the site still reaches the database.
 *
 *   npm run dev            (in one terminal)
 *   npm run forms:test     (in another)
 *
 * It posts the exact payload each form sends — same fields, same endpoint —
 * then reads the rows back out of MySQL to prove they landed. Rows are tagged
 * with a run id in `message` and deleted again at the end, so a smoke run
 * leaves the enquiries table as it found it.
 *
 * Pass a different origin as the first argument to test a deployed build:
 *   node scripts/forms-smoke.mjs https://www.techcaddmohali.com
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import mysql from "mysql2/promise";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

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

if (!loadEnv(".env.local")) loadEnv(".env");

// First non-flag argument is the origin, so `-- --keep` is not mistaken for it.
const origin = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
const base = (origin || "http://localhost:3000").replace(/\/$/, "");
const runId = `smoke-${Date.now()}`;

/** Every form on the site, with the payload its component actually sends. */
const forms = [
  {
    form: "Contact page form",
    endpoint: "/api/enquiry",
    body: {
      name: "Smoke Test — contact page",
      phone: "9888122255",
      email: "smoke@example.com",
      course: "Data Science & Analytics",
      mode: "Evening",
      message: runId,
      source: "Contact page form",
    },
  },
  {
    form: "Enquiry modal (site-wide)",
    endpoint: "/api/enquiry",
    body: {
      name: "Smoke Test — modal",
      phone: "9888122442",
      course: "Full-Stack Web Development",
      message: runId,
      source: "Enquiry modal",
    },
  },
  {
    form: "Home CTA callback",
    endpoint: "/api/enquiry",
    body: {
      phone: "9876543210",
      message: runId,
      source: "Home CTA — callback request",
    },
  },
  {
    form: "Career Track tool bar",
    endpoint: "/api/enquiry",
    body: {
      name: "Career Track tool visitor",
      phone: "9876543211",
      message: runId,
      source: "Career Track tool — callback bar",
    },
  },
  {
    form: "Training Matcher modal",
    endpoint: "/api/enquiry",
    body: {
      name: "Smoke Test — matcher",
      phone: "9876543212",
      course: "Artificial Intelligence & Machine Learning",
      message: `Training Matcher: syllabus request / ${runId}`,
      source: "Training Matcher tool",
    },
  },
  {
    form: "Course page enquiry",
    endpoint: "/api/course-enquiry",
    captcha: true,
    body: {
      name: "Smoke Test — course page",
      email: "smoke.course@example.com",
      phone: "9876543213",
      course: "Python Programming",
      message: runId,
      source: "course-page",
    },
  },
];

/** The captcha answer is drawn into the SVG, one character per <text> node. */
async function solveCaptcha() {
  const res = await fetch(`${base}/api/captcha`, { cache: "no-store" });
  if (!res.ok) throw new Error(`captcha endpoint returned ${res.status}`);
  const { svg, token } = await res.json();
  const answer = [...svg.matchAll(/<text[^>]*>(.)<\/text>/g)].map((m) => m[1]).join("");
  return { answer, token };
}

async function post(endpoint, body) {
  const res = await fetch(`${base}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await res.json().catch(() => ({}));
  return { status: res.status, payload };
}

console.log(`\n  Posting one enquiry per form to ${base}\n`);

let failures = 0;
const ids = [];

for (const entry of forms) {
  const body = { ...entry.body };

  try {
    if (entry.captcha) {
      const { answer, token } = await solveCaptcha();
      body.captcha = answer;
      body.captchaToken = token;
    }

    const { status, payload } = await post(entry.endpoint, body);

    if (status === 200 && payload.ok && payload.id) {
      ids.push(payload.id);
      console.log(`  PASS  ${entry.form.padEnd(28)} -> ${entry.endpoint}  row #${payload.id}`);
    } else {
      failures += 1;
      console.log(
        `  FAIL  ${entry.form.padEnd(28)} -> ${entry.endpoint}  ${status} ${
          payload.error || JSON.stringify(payload)
        }`,
      );
    }
  } catch (err) {
    failures += 1;
    console.log(`  FAIL  ${entry.form.padEnd(28)} -> ${entry.endpoint}  ${err.message}`);
  }
}

/* --- Read the rows back, then clean up after ourselves -------------------- */

if (ids.length) {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "techcadd_mohali",
  });

  const placeholders = ids.map(() => "?").join(",");
  const [rows] = await connection.query(
    `SELECT id, form_type, source, name, phone, course, status, created_at
       FROM enquiries WHERE id IN (${placeholders}) ORDER BY id`,
    ids,
  );

  console.log(`\n  Read back ${rows.length} of ${ids.length} rows from MySQL:\n`);
  console.table(
    rows.map((r) => ({
      id: r.id,
      form: r.form_type,
      source: r.source,
      name: r.name,
      phone: r.phone,
      course: r.course,
      status: r.status,
    })),
  );

  if (process.argv.includes("--keep")) {
    console.log("  --keep given: the test rows were left in the table.\n");
  } else {
    const [del] = await connection.query(
      `DELETE FROM enquiries WHERE id IN (${placeholders})`,
      ids,
    );
    console.log(`  Cleaned up ${del.affectedRows} test rows. Pass --keep to leave them in.\n`);
  }

  await connection.end();
}

if (failures) {
  console.error(`  ${failures} form(s) failed.\n`);
  process.exit(1);
}

console.log("  All forms reached the database.\n");
