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

  if (!name || !/^[0-9+\s-]{10,15}$/.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "A name and a valid phone number are required." },
      { status: 422 },
    );
  }

  const enquiry = {
    name,
    phone,
    email: String(body.email ?? "").trim(),
    course: String(body.course ?? "").trim() || "Undecided",
    mode: String(body.mode ?? "").trim(),
    message: String(body.message ?? "").trim(),
    receivedAt: new Date().toISOString(),
  };

  // TODO: forward to email / CRM here.
  console.log("[enquiry]", enquiry);

  return NextResponse.json({ ok: true });
}
