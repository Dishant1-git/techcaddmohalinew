import type { NextConfig } from "next";

/**
 * Where CMS-hosted images may be loaded from.
 *
 * `next/image` refuses any remote host that is not listed here, and the
 * failure is a 400 from the optimiser rather than a broken tag — so without
 * this every gallery photo, event cover and testimonial portrait uploaded in
 * the CMS renders as nothing at all.
 *
 * Derived from `CMS_MEDIA_URL` rather than hard-coded, so moving the CMS to
 * another port or host is still a one-line change in `.env.local`. Only the
 * `/uploads/` path is opened up: that is the only place the CMS serves files
 * from, and allowing the whole origin would let any path on it through the
 * optimiser.
 */
function cmsImagePatterns(): NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]> {
  const configured = process.env.CMS_MEDIA_URL || process.env.CMS_API_URL;
  if (!configured) return [];

  try {
    const url = new URL(configured);
    return [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port || undefined,
        pathname: "/uploads/**",
      },
    ];
  } catch {
    // A malformed value should not stop the build; the site simply falls back
    // to its own images, which is what it does when the CMS is unset anyway.
    console.warn(`[next.config] CMS_MEDIA_URL is not a valid URL: ${configured}`);
    return [];
  }
}

/**
 * Is the configured CMS on this machine or a private network?
 *
 * Hostname only — resolving a name to check its address at build time would be
 * a DNS lookup in the config file, and the optimiser does its own check at
 * request time anyway. This decides whether to permit that check to pass.
 */
function cmsIsLocal(): boolean {
  const configured = process.env.CMS_MEDIA_URL || process.env.CMS_API_URL;
  if (!configured) return false;

  try {
    const { hostname } = new URL(configured);
    return (
      hostname === "localhost" ||
      hostname === "::1" ||
      /^127\./.test(hostname) ||
      /^10\./.test(hostname) ||
      /^192\.168\./.test(hostname) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)
    );
  } catch {
    return false;
  }
}

const nextConfig: NextConfig = {
  // mysql2 loads its dialect/auth plugins at runtime; leaving it unbundled
  // keeps those dynamic requires working inside the route handlers.
  serverExternalPackages: ["mysql2"],

  images: {
    remotePatterns: cmsImagePatterns(),

    /**
     * Next 16 refuses to optimise an image whose host resolves to a private
     * IP — an SSRF defence — and in development the CMS is exactly that:
     * `localhost:4000`. Without this every CMS-hosted photo comes back 400.
     *
     * Turned on only when the configured CMS is itself on a local address, so
     * it follows the deployment rather than the build mode. Two reasons for
     * that over `NODE_ENV === "development"`: `next start` against a local CMS
     * runs as production and would break, and a real deployment points at a
     * real host, where this stays off without anyone remembering to turn it.
     *
     * The exposure it opens is bounded by `remotePatterns` above, which admits
     * exactly one host — the CMS the operator configured — rather than any
     * address an attacker could put in a URL.
     */
    dangerouslyAllowLocalIP: cmsIsLocal(),
  },

  /**
   * Every menu's course pages now live one segment below `/courses`, so the
   * URL says which menu a page belongs to — `/courses/course/<slug>`,
   * `/courses/ai/<slug>`, `/courses/certificate-programs/<slug>` and
   * `/courses/after12th/<slug>`. The paths they used before are kept alive as
   * 308s so no existing link, bookmark or indexed URL breaks.
   *
   * Order matters: the first match wins, so the AI menu's own page is claimed
   * before the catalogue catch-all sees it.
   */
  async redirects() {
    return [
      {
        source: "/courses/chatgpt-ai-tools",
        destination: "/courses/ai/chatgpt-ai-tools",
        permanent: true,
      },
      {
        source: "/courses/ai-powered-marketing",
        destination: "/courses/ai/ai-powered-marketing",
        permanent: true,
      },
      {
        source: "/courses/agentic-ai",
        destination: "/courses/ai/agentic-ai",
        permanent: true,
      },
      // Prompt Engineering is the AI menu's course and is listed in no other
      // panel, so `/courses/course/[slug]` no longer builds it. Both paths it
      // could have been reached by land on the one page that exists.
      {
        source: "/courses/prompt-engineering",
        destination: "/courses/ai/prompt-engineering",
        permanent: true,
      },
      {
        source: "/courses/course/prompt-engineering",
        destination: "/courses/ai/prompt-engineering",
        permanent: true,
      },
      // Everything else that used to sit directly under /courses is a
      // catalogue page. The lookahead keeps the four new menu segments out of
      // it, so /courses/ai/<slug> is never rewritten to /courses/course/ai.
      {
        source:
          "/courses/:slug((?!course$|ai$|certificate-programs$|after12th$)[a-z0-9-]+)",
        destination: "/courses/course/:slug",
        permanent: true,
      },
      {
        source: "/certificate-programs/:slug",
        destination: "/courses/certificate-programs/:slug",
        permanent: true,
      },
      {
        source: "/after-12th/:slug",
        destination: "/courses/after12th/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
