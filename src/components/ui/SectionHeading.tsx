import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <div
          data-anim="fade"
          className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${
            dark
              ? "border-white/15 bg-white/5 text-up-soft"
              : "border-up-line bg-brand-50 text-up-accent"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-accent-glow" : "bg-up-accent"}`} />
          {eyebrow}
        </div>
      )}

      <h2
        data-anim="words"
        className={`text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.9rem] ${
          dark ? "text-white" : "text-up-ink"
        }`}
      >
        {title}
      </h2>

      <div
        data-underline
        className={`mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r ${
          dark ? "from-accent-glow to-transparent" : "from-up-accent to-transparent"
        } ${align === "center" ? "mx-auto" : ""}`}
      />

      {subtitle && (
        <p
          data-anim="up"
          data-anim-delay="0.1"
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            dark ? "text-up-soft/80" : "text-up-muted"
          }`}
        >
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
}
