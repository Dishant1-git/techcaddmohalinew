import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { CMS_TAG } from "@/lib/cms/client";

/**
 * The website's half of the CMS revalidation webhook.
 *
 * `cms-techcadd/backend/src/http/revalidate.ts` has been calling this address
 * after every successful save since it was written — the endpoint simply did
 * not exist on this site, so every one of those calls got a 404 and each edit
 * waited out the cache window instead of appearing.
 *
 * Dropping the `cms` tag is all this needs to do: every read in
 * `src/lib/cms/client.ts` is tagged with it, so one call invalidates the whole
 * of the CMS-sourced content at once. Per-resource tags would be tidier in
 * principle and worse in practice — the CMS sends one debounced ping without
 * saying what changed, and a course edit can move the courses list, the home
 * page's featured strip, the nav and the related-links rail.
 *
 * Nothing here reads the request body. The CMS sends none.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function respond(secret: string | null) {
  const expected = process.env.REVALIDATE_SECRET;

  // Unset on this side means the webhook is not in use. Say so plainly rather
  // than 200-ing, so a misconfigured deployment is visible in the CMS log
  // instead of looking like it is working.
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET is not set on the website." },
      { status: 503 },
    );
  }

  if (secret !== expected) {
    return NextResponse.json({ ok: false, error: "Bad secret." }, { status: 401 });
  }

  /*
    `{ expire: 0 }` rather than the recommended "max" profile.

    "max" serves stale content while it refreshes, so the first load after a
    save still shows the old copy — which to the editor who just pressed Save
    reads as the save not having worked, and is the exact complaint this
    webhook exists to prevent. Blocking that one request is worth it.
  */
  revalidateTag(CMS_TAG, { expire: 0 });
  return NextResponse.json({ ok: true, revalidated: CMS_TAG, at: Date.now() });
}

export async function POST(request: Request) {
  return respond(request.headers.get("x-revalidate-secret"));
}

/**
 * The same thing over GET.
 *
 * Not for the CMS, which posts — for a person checking the wiring from a
 * browser or curl without having to construct a POST.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  return respond(request.headers.get("x-revalidate-secret") ?? url.searchParams.get("secret"));
}
