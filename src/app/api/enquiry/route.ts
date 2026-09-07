import { NextResponse } from "next/server";
import { requestMeta, saveLead } from "@/lib/leads";

/**
 * Enquiry endpoint.
 *
 * Takes every short form on the site — the contact page form, the enquiry
 * modal, the home-page callback bar, the tools pages — validates the payload
 * and writes one row into the `enquiries` MySQL table.
 *
 * The phone number is the only thing an enquiry genuinely needs to be
 * actionable; the home-page CTA asks for nothing else. `source` records which
 * form it came from so the desk knows how much context to expect.
 */

// The handler opens a MySQL connection, so it must run on the Node runtime and
// must never be prerendered.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PHONE = /^[0-9+\s-]{10,15}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot: a field hidden from people, irresistible to form-filling bots.
  // Answer as if it worked — a bot that knows it failed just tries again.
  if (String(body.website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const phone = String(body.phone ?? "").trim();

  if (!PHONE.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "A valid phone number is required." },
      { status: 422 },
    );
  }

  try {
    const id = await saveLead({
      formType: "enquiry",
      source: String(body.source ?? "").trim() || "Contact form",
      name: String(body.name ?? "").trim() || "Not given",
      phone,
      email: String(body.email ?? "").trim(),
      course: String(body.course ?? "").trim() || "Undecided",
      mode: String(body.mode ?? "").trim(),
      message: String(body.message ?? "").trim(),
      branch: String(body.branch ?? "").trim() || "Mohali",
      ...requestMeta(request),
    });

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    // The lead is worth more than the response: log the whole payload so it can
    // be recovered from the server log if the database was down.
    console.error("[enquiry] could not save", err, body);
    return NextResponse.json(
      {
        ok: false,
        error: "We could not record that just now. Please call or WhatsApp us instead.",
      },
      { status: 503 },
    );
  }
}
