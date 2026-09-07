import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/** Intrinsic size of the source file, so next/image never has to guess. */
export const LOGO_SRC = "/images/logo/tce.webp";
export const LOGO_W = 952;
export const LOGO_H = 262;

const widths = {
  sm: "8.75rem",
  md: "9.75rem",
  lg: "11rem",
  xl: "13rem",
} as const;

/**
 * The techcadd wordmark.
 *
 * `light` is for the header while it sits transparent on the dark hero. The
 * source art is navy on a transparent background, so `brightness(0)` crushes the
 * colour to black and `invert(1)` lifts it to white — alpha survives both, which
 * is why this gives a clean white wordmark rather than a white box. Scrolled,
 * the header drops to `dark` and the logo shows in its own colour.
 */
export default function Logo({
  variant = "dark",
  size = "md",
  priority = false,
}: {
  variant?: "dark" | "light";
  size?: keyof typeof widths;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className="block shrink-0"
      aria-label={`${site.name} ${site.city} — home`}
    >
      <Image
        src={LOGO_SRC}
        alt={`${site.name} ${site.city}`}
        width={LOGO_W}
        height={LOGO_H}
        priority={priority}
        style={{ width: widths[size] }}
        className={`h-auto transition-all duration-500 ${
          variant === "light" ? "[filter:brightness(0)_invert(1)]" : ""
        }`}
      />
    </Link>
  );
}
