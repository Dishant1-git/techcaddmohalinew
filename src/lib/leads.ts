import { execute, ensureSchema, isDbConfigured, query } from "@/lib/db";
import type { RowDataPacket } from "mysql2/promise";
import { forwardEnquiryToCms } from "@/lib/cms/enquiries";

/**
 * Every website form lands in one `enquiries` table.
 *
 * The forms differ in how much they ask for — the home-page CTA asks for a
 * phone number and nothing else, the course pages ask for name and email — so
 * every column except the timestamps has a default. `form_type` and `source`
 * are what tell the front desk which form a row came from and how much context
 * to expect with it.
 */

export type LeadInput = {
  /** Which endpoint took it: `enquiry` or `course-enquiry`. */
  formType: string;
  /** Which form on which page, in words: "Contact page form", "Enquiry modal". */
  source: string;
  name?: string;
  phone?: string;
  email?: string;
  course?: string;
  mode?: string;
  message?: string;
  branch?: string;
  pageUrl?: string;
  referrer?: string;
  ipAddress?: string;
  userAgent?: string;
};

export type LeadRow = RowDataPacket & {
  id: number;
  form_type: string;
  source: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  mode: string;
  message: string | null;
  branch: string;
  page_url: string;
  referrer: string;
  ip_address: string;
  user_agent: string;
  status: "new" | "contacted" | "enrolled" | "closed";
  notes: string | null;
  created_at: Date;
  updated_at: Date;
};

/** MySQL truncates silently in non-strict mode; trim to the column width first. */
const cut = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);

const INSERT_SQL = `
INSERT INTO enquiries
  (form_type, source, name, phone, email, course, mode, message,
   branch, page_url, referrer, ip_address, user_agent)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

/**
 * Persists one enquiry and returns its row id.
 *
 * Throws if the database is unreachable — the route handlers catch that and
 * answer with a "call us instead" message rather than pretending it landed.
 */
export async function saveLead(lead: LeadInput) {
  if (!isDbConfigured()) {
    throw new Error(
      "MySQL is not configured. Copy .env.example to .env.local and fill in MYSQL_* values.",
    );
  }

  await ensureSchema();

  const result = await execute(INSERT_SQL, [
    cut(lead.formType || "enquiry", 32),
    cut(lead.source || "Website", 120),
    cut(lead.name, 120),
    cut(lead.phone, 24),
    cut(lead.email, 160),
    cut(lead.course, 160),
    cut(lead.mode, 48),
    String(lead.message ?? "").trim().slice(0, 5000) || null,
    cut(lead.branch || "Mohali", 60),
    cut(lead.pageUrl, 255),
    cut(lead.referrer, 255),
    cut(lead.ipAddress, 45),
    cut(lead.userAgent, 255),
  ]);

  /*
    Also deliver it to the CMS inbox, where the counselling team works.

    Not awaited: the row above is the record of truth and is already committed,
    so the visitor's "thank you" must not wait on a second system — and
    `forwardEnquiryToCms` never rejects, so there is no unhandled rejection to
    leak from here.
  */
  void forwardEnquiryToCms(lead);

  return result.insertId;
}

/** Most recent enquiries first — used by the admin listing. */
export async function recentLeads(limit = 100) {
  await ensureSchema();
  const capped = Math.min(Math.max(Math.trunc(limit) || 100, 1), 500);
  // LIMIT does not accept a placeholder in a prepared statement; the value is
  // clamped to an integer above, so interpolating it here is safe.
  return query<LeadRow>(`SELECT * FROM enquiries ORDER BY created_at DESC LIMIT ${capped}`);
}

/**
 * Request metadata worth keeping beside a lead: which page it was sent from,
 * what referred that visit, and enough of the client for spam triage.
 */
export function requestMeta(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  return {
    pageUrl: request.headers.get("referer") ?? "",
    referrer: request.headers.get("x-page-referrer") ?? "",
    ipAddress: (forwarded.split(",")[0] || request.headers.get("x-real-ip") || "").trim(),
    userAgent: request.headers.get("user-agent") ?? "",
  };
}
