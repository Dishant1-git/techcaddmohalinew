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
};

const TOOLS: ToolCard[] = [
  {
    title: "Find My Career Track",
    href: "/tools/career-track",
    kicker: "Free tool",
    caption: "4 questions",
    art: "from-hero-800 via-hero-600 to-hero-glow",
    icon: "target",
  },
  {
    title: "Training Matcher",
    href: "/tools/training-matcher",
    kicker: "Free tool",
    caption: "Instant match",
    art: "from-hero-900 via-brand-700 to-accent-500",
    icon: "search",
  },
  {
    title: "Salary Estimator",
    href: "/tools/salary-estimator",
    kicker: "Free tool",
    caption: "Punjab & NCR",
    art: "from-brand-900 via-hero-600 to-accent-400",
    icon: "chart",
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
                className={`relative block h-[9.5rem] overflow-hidden rounded-2xl bg-gradient-to-br ${t.art}`}
              >
                <span className="absolute inset-0 grid-lines opacity-70" />
                <span className="absolute inset-0 grid place-items-center text-white/25">
                  <Icon name={t.icon} size={44} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-t from-hero-950/45 to-transparent" />
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
