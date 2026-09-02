import { NextResponse } from "next/server";
import { issueCaptcha } from "@/lib/captcha";

/**
 * Issues a fresh captcha challenge for the course enquiry form.
 *
 * A new random challenge per request, so it must never be prerendered or
 * cached anywhere between the server and the browser.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const { svg, token } = issueCaptcha();

  return NextResponse.json(
    { svg, token },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } },
  );
}
