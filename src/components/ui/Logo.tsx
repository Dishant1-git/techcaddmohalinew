import Link from "next/link";

export default function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const word = variant === "light" ? "text-white" : "text-logo";
  const sub = variant === "light" ? "text-up-soft" : "text-muted";

  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="techcadd Mohali — home">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-hero-glow via-hero-600 to-hero-900 shadow-lg shadow-hero-600/30">
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="m7 8-4 4 4 4M17 8l4 4-4 4M14 5l-4 14" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[1.3rem] font-extrabold tracking-tight ${word}`}>
          techcadd
        </span>
        <span className={`mt-0.5 block text-[0.62rem] font-semibold uppercase tracking-[0.22em] ${sub}`}>
          Mohali
        </span>
      </span>
    </Link>
  );
}
