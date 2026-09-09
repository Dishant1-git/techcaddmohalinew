import { cmsBaseUrl } from "@/lib/cms/client";
import type { LeadInput } from "@/lib/leads";

/**
 * Copies a website enquiry into the CMS inbox.
 *
 * The site has always written its own `enquiries` table and still does — that
 * row is the record of truth and the one `recentLeads` reads. This is a second
 * delivery, to the place the counselling team actually sits: the CMS's
 * Enquiries screen, with its statuses, assignees and follow-up notes.
 *
 * Deliberately fire-and-forget and deliberately never thrown from. A lead that
 * reached the site's database is captured; failing the visitor's submission
 * because a second system was slow would lose a real enquiry to protect a
 * convenience. Failures are logged with the phone number so anything missed
 * can be reconciled by hand.
 *
 * The CMS applies its own duplicate rules and answers 429 for a repeat
 * submission. That is a normal outcome, not an error — it means the enquiry is
 * already in the inbox — so it is not logged as a failure.
 */

const TIMEOUT_MS = Number(process.env.CMS_TIMEOUT_MS || 6000);

export async function forwardEnquiryToCms(lead: LeadInput): Promise<void> {
  const base = cmsBaseUrl();
  if (!base) return;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${base}/api/public/enquiries`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: controller.signal,
      // A lead must never be served from a cache.
      cache: "no-store",
      body: JSON.stringify({
        studentName: (lead.name || "Not given").slice(0, 120),
        phone: (lead.phone || "").slice(0, 30),
        email: (lead.email || "").slice(0, 160),
        courseName: (lead.course || "").slice(0, 200),
        // The CMS keeps one message field, so the form's own wording is
        // prefixed to it — otherwise a counsellor opening a lead cannot tell a
        // course-page enquiry from the home-page callback bar.
        message: [lead.source, lead.mode && `Preferred batch: ${lead.mode}`, lead.message]
          .filter(Boolean)
          .join(" — ")
          .slice(0, 2000),
        // Always "website": walk-in, phone, referral and social are values a
        // staff member picks when logging an enquiry by hand, never a form.
        source: "website",
        formType: (lead.formType || "enquiry").slice(0, 32),
        sourceUrl: (lead.pageUrl || "").slice(0, 500),
        ip: (lead.ipAddress || "").slice(0, 45),
        userAgent: (lead.userAgent || "").slice(0, 255),
      }),
    });

    // 429 is the CMS saying it already has this one — nothing to report.
    if (!response.ok && response.status !== 429) {
      console.warn(`[cms] enquiry forward responded ${response.status} for ${lead.phone}`);
    }
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.warn(`[cms] could not forward enquiry ${lead.phone} to the CMS (${reason}).`);
  } finally {
    clearTimeout(timer);
  }
}
