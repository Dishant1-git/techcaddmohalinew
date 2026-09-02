import { NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/captcha";

/**
 * Course-page enquiry endpoint.
 *
 * Separate from `/api/enquiry` (which the contact page posts to and which
 * requires a phone number) because this form is deliberately shorter: name,
 * email and the course the visitor is already reading about.
 *
 * Like its sibling, it validates and logs — drop an email/CRM provider in at
 * the TODO and the front end needs no changes.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[0-9+\s-]{10,15}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: a field hidden from people, irresistible to form-filling bots.
  if (String(body.website ?? "").trim()) {
    // Answer as if it worked — a bot that knows it failed just tries again.
    return NextResponse.json({ ok: true });
  }

  const captcha = verifyCaptcha(body.captcha, body.captchaToken);
  if (captcha !== "ok") {
    const message =
      captcha === "expired"
        ? "That security code expired. Please refresh it and try once more."
        : "The security code does not match. Please try again.";
    return NextResponse.json({ ok: false, field: "captcha", error: message }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const course = String(body.course ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, field: "name", error: "Please enter your full name." },
      { status: 422 },
    );
  }

  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { ok: false, field: "email", error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  if (phone && !PHONE.test(phone)) {
    return NextResponse.json(
      { ok: false, field: "phone", error: "Please enter a valid phone number." },
      { status: 422 },
    );
  }

  const enquiry = {
    name,
    email,
    phone: phone || "Not provided",
    course: course || "Undecided",
    source: String(body.source ?? "").trim() || "course-page",
    receivedAt: new Date().toISOString(),
  };

  // TODO: forward to email / CRM here.
  console.log("[course-enquiry]", enquiry);

  return NextResponse.json({ ok: true });
}
