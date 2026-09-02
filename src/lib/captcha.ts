import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

/**
 * A stateless captcha.
 *
 * `GET /api/captcha` issues a drawn SVG plus a token of the form
 * `<expiry>.<hmac>`, where the HMAC covers the normalised answer and the
 * expiry. Verification recomputes the HMAC from what the user typed — so the
 * answer never travels to the browser and the server needs no session, cache
 * or database to check it. Nothing here is guessable from the token alone
 * without the secret.
 *
 * Set CAPTCHA_SECRET in the environment for production. The development
 * fallback keeps `next dev` working out of the box and is intentionally
 * obvious, so a missing variable is visible in the logs rather than silent.
 */

const TTL_MS = 10 * 60 * 1000; // 10 minutes to fill in a short form.

/** Ambiguous glyphs (0/O, 1/I/L, 5/S, 2/Z) are left out on purpose. */
const ALPHABET = "ABCDEFGHJKMNPQRTUVWXY346789";
const LENGTH = 5;

function secret() {
  const fromEnv = process.env.CAPTCHA_SECRET;
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") {
    console.warn("[captcha] CAPTCHA_SECRET is not set — using an insecure fallback.");
  }
  return "techcadd-mohali-dev-captcha-secret";
}

function sign(answer: string, expiry: number) {
  return createHmac("sha256", secret())
    .update(`${answer.toUpperCase()}.${expiry}`)
    .digest("hex");
}

export function issueCaptcha() {
  const code = Array.from({ length: LENGTH }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  const expiry = Date.now() + TTL_MS;
  return { svg: renderSvg(code), token: `${expiry}.${sign(code, expiry)}` };
}

export type CaptchaResult = "ok" | "invalid" | "expired" | "malformed";

export function verifyCaptcha(input: unknown, token: unknown): CaptchaResult {
  const answer = String(input ?? "").trim();
  const raw = String(token ?? "");
  const [expiryPart, mac] = raw.split(".");

  if (!answer || !expiryPart || !mac) return "malformed";

  const expiry = Number(expiryPart);
  if (!Number.isFinite(expiry)) return "malformed";
  if (Date.now() > expiry) return "expired";

  const expected = Buffer.from(sign(answer, expiry), "utf8");
  const provided = Buffer.from(mac, "utf8");

  // timingSafeEqual throws on a length mismatch, so guard it first.
  if (expected.length !== provided.length) return "invalid";
  return timingSafeEqual(expected, provided) ? "ok" : "invalid";
}

/* -------------------------------------------------------------------------- *
 *                                  Rendering                                  *
 * -------------------------------------------------------------------------- */

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Draws the code as an SVG: each glyph gets its own rotation, offset and
 * baseline shift, over a field of noise strokes and dots. Enough distortion to
 * stop a naive scraper, still comfortably readable — and it inherits the site's
 * blue ramp rather than looking like a bolted-on widget.
 */
function renderSvg(code: string) {
  const W = 190;
  const H = 64;

  const glyphs = [...code]
    .map((char, i) => {
      const x = 22 + i * 32 + rand(-3, 3);
      const y = 42 + rand(-5, 5);
      const rotate = rand(-22, 22);
      const size = rand(28, 34);
      const fill = ["#0b1a4d", "#1c53d1", "#123285", "#2f7dff"][Math.floor(rand(0, 4))];
      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="Verdana,Geneva,sans-serif" font-size="${size.toFixed(
        1,
      )}" font-weight="700" fill="${fill}" transform="rotate(${rotate.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(
        1,
      )})">${char}</text>`;
    })
    .join("");

  const lines = Array.from({ length: 5 }, () => {
    const pts = Array.from(
      { length: 4 },
      () => `${rand(0, W).toFixed(1)},${rand(0, H).toFixed(1)}`,
    ).join(" ");
    return `<polyline points="${pts}" fill="none" stroke="#1c53d1" stroke-opacity="${rand(
      0.15,
      0.35,
    ).toFixed(2)}" stroke-width="${rand(1, 2).toFixed(1)}" />`;
  }).join("");

  const dots = Array.from({ length: 34 }, () => {
    return `<circle cx="${rand(0, W).toFixed(1)}" cy="${rand(0, H).toFixed(1)}" r="${rand(
      0.6,
      1.8,
    ).toFixed(1)}" fill="#1c53d1" fill-opacity="${rand(0.12, 0.35).toFixed(2)}" />`;
  }).join("");

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Captcha image">`,
    `<rect width="${W}" height="${H}" rx="12" fill="#f8fafc" />`,
    dots,
    glyphs,
    lines,
    "</svg>",
  ].join("");
}
