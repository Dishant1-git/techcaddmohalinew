/**
 * The website's half of the CMS integration.
 *
 * Every read goes through here so there is exactly one place that knows the
 * API's address, how long a response may be cached, and — most importantly —
 * what to do when the CMS is not answering.
 *
 * That last part is the whole design. This site shipped with its content in
 * `src/lib/*.ts` and every page renders from it today. The CMS is layered on
 * top of that, never underneath it: a fetch that fails, times out or returns
 * nothing leaves the page rendering exactly the copy it rendered before. A
 * marketing site going blank because an editor's API restarted is a far worse
 * outcome than one showing yesterday's wording.
 *
 * Configure with `.env.local` at the repo root:
 *
 *   CMS_API_URL=http://localhost:4000
 *   CMS_MEDIA_URL=http://localhost:4000     # usually the same host
 *   REVALIDATE_SECRET=...                   # must match the CMS's .env
 */

/** Cache tag every CMS read carries, so one webhook can drop all of it. */
export const CMS_TAG = "cms";

/**
 * How long a CMS response may be reused, in seconds.
 *
 * Ten minutes is a backstop, not the mechanism: the CMS calls
 * `/api/revalidate` after every save, so an edit normally appears at once.
 * This only matters if that webhook is unset or the call was lost.
 */
const TTL = Number(process.env.CMS_REVALIDATE_SECONDS || 600);

/**
 * Long enough for a cold CMS to answer, short enough that a dead one does not
 * hold a page render open. Exceeding it is not an error — it falls through to
 * the built-in content like any other failure.
 *
 * Ten seconds rather than the six this started at. A page asks for several
 * resources at once (the reviews page wants reviews and testimonials; the home
 * page wants courses and testimonials), the CMS answers each in one to three
 * seconds when it is running under `tsx` in development, and the budget is
 * spent from the moment the request is created rather than when it reaches the
 * socket. At six seconds the later ones in a burst aborted and the page
 * silently rendered built-in content — a fallback firing on a CMS that was
 * working perfectly well is worse than a page that waits a moment longer.
 */
const TIMEOUT_MS = Number(process.env.CMS_TIMEOUT_MS || 10000);

export function cmsBaseUrl(): string {
  return (process.env.CMS_API_URL || "").replace(/\/+$/, "");
}

/** True when the site has been told where the CMS is. */
export function isCmsConfigured(): boolean {
  return Boolean(cmsBaseUrl());
}

/**
 * Absolute URL for a file the CMS serves.
 *
 * Uploads come back as root-relative paths (`/uploads/ab12.png`), which would
 * resolve against the website and 404. Anything already absolute, or already
 * ours (`/gallery/...` from `public/`), is handed back untouched.
 */
export function cmsMediaUrl(url: string | undefined | null): string {
  if (!url) return "";
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  if (!url.startsWith("/uploads")) return url;
  const base = (process.env.CMS_MEDIA_URL || cmsBaseUrl()).replace(/\/+$/, "");
  return base ? `${base}${url}` : url;
}

/**
 * One GET against the CMS's public API.
 *
 * Returns `null` for every failure mode rather than throwing — not to hide
 * problems, but because the only sensible response at every call site is the
 * same one (use the built-in content), and making thirty callers each write
 * their own try/catch to reach that conclusion is how one of them ends up
 * missing it. Failures are logged once with the path that failed.
 */
export async function cmsGet<T>(path: string): Promise<T | null> {
  const base = cmsBaseUrl();
  if (!base) return null;

  const url = `${base}/api/public${path.startsWith("/") ? path : `/${path}`}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { accept: "application/json" },
      next: { revalidate: TTL, tags: [CMS_TAG] },
    });

    // A 404 is ordinary here — it means "no such slug in the CMS", which is
    // the answer for every page the CMS does not manage yet.
    if (response.status === 404) return null;

    if (!response.ok) {
      console.warn(`[cms] ${url} responded ${response.status}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.warn(`[cms] could not read ${url} (${reason}) — using built-in content.`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** A list endpoint, unwrapped to its items. `null` stays `null`. */
export async function cmsList<T>(path: string, limit?: number): Promise<T[] | null> {
  const query = limit ? `${path.includes("?") ? "&" : "?"}limit=${limit}` : "";
  const body = await cmsGet<{ items?: T[] }>(`${path}${query}`);
  if (!body || !Array.isArray(body.items)) return null;
  return body.items;
}
