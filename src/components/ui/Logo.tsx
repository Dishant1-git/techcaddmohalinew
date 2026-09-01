import Link from "next/link";
import { site } from "@/lib/site";

const sizes = {
  sm: { word: "text-[1.45rem]", tag: "text-[0.44rem] tracking-[0.13em]" },
  md: { word: "text-[1.6rem]", tag: "text-[0.47rem] tracking-[0.13em]" },
  lg: { word: "text-[1.75rem]", tag: "text-[0.5rem] tracking-[0.14em]" },
} as const;

/**
 * Wordmark logo — "techcadd." over the tagline, matching the group's branding.
 * `light` is for the transparent header sitting on a dark hero.
 */
export default function Logo({
  variant = "dark",
  size = "md",
}: {
  variant?: "dark" | "light";
  size?: keyof typeof sizes;
}) {
  const s = sizes[size];

  return (
    <Link
      href="/"
      className="group flex shrink-0 flex-col leading-none"
      aria-label={`${site.name} ${site.city} — home`}
    >
      <span
        className={`font-display font-extrabold tracking-tight transition-all duration-500 ${s.word} ${
          variant === "light" ? "text-white" : "text-logo"
        }`}
      >
        techcadd
        <span className={variant === "light" ? "text-accent-glow" : "text-up-bright"}>.</span>
      </span>
      <span
        className={`mt-1 font-semibold uppercase transition-all duration-500 ${s.tag} ${
          variant === "light" ? "text-white/55" : "text-up-muted/80"
        }`}
      >
        {site.tagline}
      </span>
    </Link>
  );
}
