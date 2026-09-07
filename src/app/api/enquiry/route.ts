import { NextResponse } from "next/server";

/**
 * Enquiry endpoint.
 *
 * Right now it validates the payload and logs it on the server — there is no
 * email/CRM integration wired up yet. Drop in a provider (Resend, SendGrid,
 * Zoho, a Google Sheet webhook, …) where the TODO is and the front end needs
 * no changes.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  // The phone number is the only thing an enquiry genuinely needs to be
  // actionable — the quick callback form on the home page asks for nothing else.
  // The full contact form still sends a name, and `source` records which one it
  // came from so the desk knows how much context to expect.
  if (!/^[0-9+\s-]{10,15}$/.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "A valid phone number is required." },
      { status: 422 },
    );
  }

  const enquiry = {
    name: name || "Not given",
    phone,
    email: String(body.email ?? "").trim(),
    course: String(body.course ?? "").trim() || "Undecided",
    mode: String(body.mode ?? "").trim(),
    message: String(body.message ?? "").trim(),
    source: String(body.source ?? "").trim() || "Contact form",
    receivedAt: new Date().toISOString(),
  };

  // TODO: forward to email / CRM here.
  console.log("[enquiry]", enquiry);

  return NextResponse.json({ ok: true });
}
