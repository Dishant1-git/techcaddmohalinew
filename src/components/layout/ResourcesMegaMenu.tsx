import Link from "next/link";
import type { NavChild } from "@/lib/site";
import { PANEL } from "@/components/layout/Navbar";
import Icon from "@/components/ui/Icon";

type ToolCard = {
  title: string;
  href: string;
  kicker: string;
  caption: string;
  art: string;
  icon: string;
  headline: string;
  tone: "dark" | "light";
  features: string[];
};

const TOOLS: ToolCard[] = [
  {
    title: "Find My Career Track",
    href: "/tools/career-track",
    kicker: "Free tool",
    caption: "4 questions",
    art: "from-hero-900 via-hero-800 to-hero-600",
    icon: "target",
    headline: "Find my IT / CAD career track",
    tone: "dark",
    features: ["target", "rocket", "briefcase"],
  },
  {
    title: "Training Matcher",
    href: "/tools/training-matcher",
    kicker: "Free tool",
    caption: "Instant match",
    art: "from-hero-950 via-brand-800 to-brand-600",
    icon: "search",
    headline: "6 Weeks & 6 Months",
    tone: "dark",
    features: ["clock", "calendar", "check"],
  },
  {
    title: "Salary Estimator",
    href: "/tools/salary-estimator",
    kicker: "Free tool",
    caption: "Punjab & NCR",
    art: "from-brand-50 via-white to-brand-50",
    icon: "chart",
    headline: "Salary & career growth estimator",
    tone: "light",
    features: [],
  },
];

/** The wide "Resources" dropdown: a link rail beside three free-tool cards. */
export default function ResourcesMegaMenu({ links }: { links: NavChild[] }) {
  return (
    <div className={`${PANEL} overflow-hidden`}>
      <div className="grid grid-cols-[14rem_1fr] gap-10 px-8 py-9">
        {/* Link rail */}
        <div className="border-r border-up-line/60 pr-8">
          <ul className="space-y-1">
            {links.map((child) => (
              <li key={child.href + child.label}>
                <Link
                  href={child.href}
                  className="flex items-center gap-2 py-1.5 text-[1.02rem] font-semibold text-up-ink transition-colors hover:text-up-accent"
                >
                  {child.label}
                  {child.badge && (
                    <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[0.6rem] font-bold uppercase leading-none text-up-accent">
                      {child.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-up-accent"
          >
            Ask us a question
            <Icon
              name="arrowRight"
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Free-tool cards */}
        <div className="grid grid-cols-3 gap-5">
          {TOOLS.map((t) => (
            <Link key={t.title} href={t.href} className="group/f block">
              <span
                className={`relative flex h-[11rem] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-4 ${t.art}`}
              >
                <span className={`absolute inset-0 ${t.tone === "dark" ? "grid-lines opacity-60" : "grid-lines-light opacity-60"}`} />
                <span
                  aria-hidden
                  className={`absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl ${
                    t.tone === "dark" ? "bg-accent-glow/25" : "bg-up-accent/10"
                  }`}
                />

                <span
                  className={`relative font-display text-[1.05rem] font-extrabold leading-tight ${
                    t.tone === "dark" ? "text-white" : "text-up-ink"
                  }`}
                >
                  {t.headline}
                </span>

                <span className="relative flex items-end justify-between">
                  <Icon
                    name={t.icon}
                    size={30}
                    className={t.tone === "dark" ? "text-white/30" : "text-up-accent/25"}
                  />
                  {t.features.length > 0 ? (
                    <span className="flex gap-1.5">
                      {t.features.map((f) => (
                        <span
                          key={f}
                          className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/10 text-white/80"
                        >
                          <Icon name={f} size={13} />
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className="rounded-full bg-up-accent/10 px-2.5 py-1 text-[0.65rem] font-bold text-up-accent">
                      ₹12.8 LPA
                    </span>
                  )}
                </span>
              </span>
              <span className="mt-3 block font-display text-[1.02rem] font-bold leading-snug text-up-ink transition-colors group-hover/f:text-up-accent">
                {t.title}
              </span>
              <span className="mt-2 flex items-center gap-2.5">
                <span className="rounded-md bg-brand-100 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-up-accent">
                  {t.kicker}
                </span>
                <span className="text-[0.68rem] uppercase tracking-[0.12em] text-up-muted">
                  {t.caption}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
