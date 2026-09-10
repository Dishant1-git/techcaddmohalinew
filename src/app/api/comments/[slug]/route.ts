import { NextResponse } from "next/server";
import { cmsBaseUrl } from "@/lib/cms/client";

/**
 * Takes a comment from the page and hands it to the CMS.
 *
 * A proxy rather than posting from the browser, for three reasons: the CMS's
 * address stays a server-side detail instead of being compiled into the
 * bundle; there is no CORS to keep in step when the CMS moves host; and the
 * visitor's IP reaches the CMS from a request it can actually see, which is
 * what its per-address rate limit counts.
 *
 * Nothing is published by this. The CMS answers 202 — accepted, awaiting a
 * moderator — and the page says so.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Long enough for a cold CMS, short enough not to hold a form hostage. */
const TIMEOUT_MS = Number(process.env.CMS_TIMEOUT_MS || 10000);

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const base = cmsBaseUrl();
  if (!base) {
    return NextResponse.json(
      { ok: false, error: "Comments are not available just now." },
      { status: 503 },
    );
  }

  const { slug } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(
      `${base}/api/public/blogs/${encodeURIComponent(slug)}/comments`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          // The visitor's address, not this server's — the CMS hashes it to
          // rate-limit per person rather than per website.
          "x-forwarded-for":
            request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "",
        },
        signal: controller.signal,
        cache: "no-store",
        body: JSON.stringify(body),
      },
    );

    if (response.ok) {
      return NextResponse.json({ ok: true, status: "pending" }, { status: 202 });
    }

    /*
      The CMS's own message, when it has one.

      Its validation messages are written for a reader ("Please give a name."),
      so passing them through says something more useful than a generic
      failure would.
    */
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    return NextResponse.json(
      { ok: false, error: payload?.message ?? "That comment could not be posted." },
      { status: response.status === 400 || response.status === 422 ? 422 : 502 },
    );
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.warn(`[comments] could not reach the CMS (${reason})`);
    return NextResponse.json(
      { ok: false, error: "We could not post that just now. Please try again shortly." },
      { status: 503 },
    );
  } finally {
    clearTimeout(timer);
  }
}
