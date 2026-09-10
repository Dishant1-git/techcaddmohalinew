import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";

/**
 * `align` centres the hero over a centred reading column.
 *
 * Left by default, which is what every listing and landing page on the site
 * uses. An article — a CMS page, a blog post — is a narrow centred column, and
 * a left-aligned hero above one reads as though the two were laid out by
 * different people: the title starts at the page edge and the prose begins a
 * couple of hundred pixels further in.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  crumbs?: { label: string; href?: string }[];
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const centred = align === "center";
  return (
    <section className="relative overflow-hidden bg-hero-950 pb-20 pt-[7.5rem] text-white lg:pb-24 lg:pt-[12rem]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_20%_0%,#123285_0%,transparent_60%),radial-gradient(ellipse_60%_60%_at_90%_40%,#1c53d1_0%,transparent_55%)] opacity-85" />
      <div className="absolute inset-0 grid-lines" />
      <div data-parallax="60" className="glow-blob right-[5%] top-[10%] h-[380px] w-[380px] bg-accent-glow/20" />

      <div className={`container-x relative ${centred ? "text-center" : ""}`}>
        {crumbs.length > 0 && (
          <nav
            data-anim="fade"
            className={`mb-6 flex flex-wrap items-center gap-2 text-xs text-up-soft/60 ${
              centred ? "justify-center" : ""
            }`}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <Icon name="arrowRight" size={11} className="opacity-50" />
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-up-soft">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <p
            data-anim="fade"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-up-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow" />
            {eyebrow}
          </p>
        )}

        <h1
          data-anim="words"
          className={`max-w-4xl font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.6rem] ${
            centred ? "mx-auto" : ""
          }`}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            data-anim="up"
            data-anim-delay="0.15"
            className={`mt-6 max-w-2xl text-base leading-relaxed text-up-soft/80 sm:text-lg ${
              centred ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
