"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  navItems,
  site,
  type NavBadge,
  type NavChild,
  type NavGroup,
  type NavItem,
} from "@/lib/site";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";

const socialIcon: Record<string, string> = {
  Instagram: "instagram",
  YouTube: "youtube",
  LinkedIn: "linkedin",
  WhatsApp: "whatsapp",
};

const hasMenu = (item: NavItem) => Boolean(item.panel);
const isWide = (item: NavItem) => Boolean(item.panel) && item.panel !== "list";

/** Every child link of an item, flattened — used by the mobile drawer. */
const childrenOf = (item: NavItem): NavChild[] => [
  ...(item.links ?? []),
  ...(item.columns ?? []).flatMap((g) => g.items),
];

/* -------------------------------------------------------------------------- *
 * Everything below lives at module scope on purpose. Declared inside Navbar
 * they would be a fresh component type on every render, so React would remount
 * them and the open/close transitions would never play.
 * -------------------------------------------------------------------------- */

const PANEL =
  "rounded-[1.75rem] border border-line bg-white/95 shadow-[0_45px_110px_-45px_rgba(6,14,43,0.85)] backdrop-blur-xl";
const FOOT = "flex items-center justify-between gap-8 border-t border-line bg-subtle px-8 py-4";

/** All four tones come from the theme ramp in globals.css. */
const badgeTone: Record<NavBadge, string> = {
  New: "bg-brand-100 text-up-accent",
  Hot: "bg-accent-yellow text-hero-950",
  Trending: "bg-accent-400/25 text-hero-800",
};

const badgeToneDark: Record<NavBadge, string> = {
  New: "bg-accent-glow text-hero-950",
  Hot: "bg-accent-yellow text-hero-950",
  Trending: "bg-up-soft text-hero-950",
};

function Badge({ tone, dark }: { tone: NavBadge; dark?: boolean }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-bold leading-none ${
        (dark ? badgeToneDark : badgeTone)[tone]
      }`}
    >
      {tone}
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3 w-3 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** The four-pointed sparkle riding inside the AI pill. */
function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5c.5 4.4 2.6 6.6 7 7-4.4.5-6.5 2.6-7 7-.5-4.4-2.6-6.5-7-7 4.4-.4 6.5-2.6 7-7Z" />
    </svg>
  );
}

/** A plain menu row. `<a>` for the branch sites, `<Link>` for everything else. */
function Row({
  child,
  className,
  children,
}: {
  child: NavChild;
  className: string;
  children: React.ReactNode;
}) {
  return child.external ? (
    <a href={child.href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={child.href} className={className}>
      {children}
    </Link>
  );
}

/** Link inside a `columns` / `feature` panel. */
function PanelLink({ child, dark }: { child: NavChild; dark?: boolean }) {
  return (
    <Row
      child={child}
      className={`group/link flex items-center gap-2 py-[0.3rem] text-[0.92rem] transition-colors ${
        dark ? "text-white/80 hover:text-white" : "text-up-ink/75 hover:text-up-accent"
      }`}
    >
      <span>{child.label}</span>
      {child.badge && <Badge tone={child.badge} dark={dark} />}
      {child.external && <Icon name="arrowUpRight" size={12} className="opacity-50" />}
    </Row>
  );
}

/** Bottom strip: a line of copy (optionally a quote) and one link out. */
function PanelFoot({ foot }: { foot: NonNullable<NavItem["foot"]> }) {
  return (
    <div className={FOOT}>
      <p className="text-sm text-up-muted">
        {foot.by ? (
          <>
            <span className="mr-1 text-lg leading-none text-up-line">&ldquo;</span>
            <em>{foot.text}</em>
            <span className="ml-1.5 font-semibold not-italic text-up-ink">— {foot.by}</span>
          </>
        ) : (
          foot.text
        )}
      </p>
      <Link
        href={foot.href}
        className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-up-accent hover:underline"
      >
        {foot.label}
        <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/** Numbered column with a heading, a blurb and a rule — Courses, After 12th. */
function NumberedColumn({ group, index }: { group: NavGroup; index: number }) {
  return (
    <div>
      <p className="text-[0.8rem] font-medium text-up-muted/60">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-1 font-display text-[1.3rem] font-bold text-up-ink">{group.heading}</h3>
      {group.blurb && <p className="mt-1.5 text-[0.82rem] text-up-muted">{group.blurb}</p>}
      <div className="mb-3 mt-4 h-px bg-up-line/70" />
      <ul>
        {group.items.map((child) => (
          <li key={child.href + child.label}>
            <PanelLink child={child} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The body of one dropdown, switched on `item.panel`. */
function PanelBody({ item }: { item: NavItem }) {
  switch (item.panel) {
    /* ------------------------------- list ------------------------------- */
    case "list":
      return (
        <div className={`${PANEL} p-3`}>
          {item.links!.map((child) => (
            <Row
              key={child.href + child.label}
              child={child}
              className="group/link flex items-center justify-between gap-3 rounded-2xl px-5 py-3 transition-colors hover:bg-brand-50"
            >
              <span className="flex flex-col">
                <span className="text-[0.95rem] font-medium text-up-ink/85 transition-colors group-hover/link:text-up-accent">
                  {child.label}
                </span>
                {child.desc && (
                  <span className="mt-0.5 text-[0.72rem] text-up-muted">{child.desc}</span>
                )}
              </span>
              <Icon
                name={child.external ? "arrowUpRight" : "arrowRight"}
                size={14}
                className="shrink-0 text-up-accent opacity-0 transition-opacity group-hover/link:opacity-100"
              />
            </Row>
          ))}
        </div>
      );

    /* ------------------------------ columns ----------------------------- */
    case "columns":
      return (
        <div className={`${PANEL} overflow-hidden`}>
          <div
            className={`grid gap-x-10 gap-y-10 px-8 py-9 ${
              item.cols === 3 ? "grid-cols-3" : "grid-cols-4"
            }`}
          >
            {item.columns!.map((group, i) => (
              <NumberedColumn key={group.heading} group={group} index={i} />
            ))}
          </div>
          {item.foot && <PanelFoot foot={item.foot} />}
        </div>
      );

    /* ------------------------------- cards ------------------------------ */
    case "cards":
      return (
        <div className={`${PANEL} overflow-hidden`}>
          <div className="grid grid-cols-4 gap-4 px-8 py-8">
            {item.links!.map((child) => (
              <Row
                key={child.href + child.label}
                child={child}
                className="group/card flex items-center gap-3.5 rounded-2xl border border-line bg-subtle px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-up-accent/40 hover:bg-white hover:shadow-[0_16px_34px_-18px_rgba(11,26,77,0.5)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-up-accent transition-colors group-hover/card:bg-up-accent group-hover/card:text-white">
                  <Icon name={child.icon ?? "sparkles"} size={19} />
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="truncate text-[0.92rem] font-medium text-up-ink">
                    {child.label}
                  </span>
                  {child.badge && <Badge tone={child.badge} />}
                </span>
              </Row>
            ))}
          </div>
          {item.foot && <PanelFoot foot={item.foot} />}
        </div>
      );

    /* ------------------------------ feature ----------------------------- */
    case "feature":
      return (
        <div className={`${PANEL} overflow-hidden`}>
          <div className="grid grid-cols-[minmax(0,15rem)_1fr] gap-10 px-8 py-9">
            <div className="border-r border-up-line/60 pr-8">
              <ul className="space-y-1">
                {item.links!.map((child) => (
                  <li key={child.href + child.label}>
                    <Link
                      href={child.href}
                      className="block py-1.5 text-[1.02rem] font-semibold text-up-ink transition-colors hover:text-up-accent"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-up-accent"
              >
                Talk to a counsellor
                <Icon
                  name="arrowRight"
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {item.features!.map((f) => (
                <Link key={f.title} href={f.href} className="group/f block">
                  <span
                    className={`relative block h-[8.5rem] overflow-hidden rounded-2xl bg-gradient-to-br ${f.art}`}
                  >
                    <span className="absolute inset-0 grid-lines opacity-70" />
                    <span className="absolute inset-0 bg-gradient-to-t from-hero-950/45 to-transparent" />
                  </span>
                  <span className="mt-3 block font-display text-[1.05rem] font-bold text-up-ink transition-colors group-hover/f:text-up-accent">
                    {f.title}
                  </span>
                  <span className="mt-2 flex items-center gap-2.5">
                    {f.kicker && (
                      <span className="rounded-md bg-brand-100 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-up-accent">
                        {f.kicker}
                      </span>
                    )}
                    {f.caption && (
                      <span className="text-[0.68rem] uppercase tracking-[0.12em] text-up-muted">
                        {f.caption}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {item.foot && <PanelFoot foot={item.foot} />}
        </div>
      );

    /* -------------------------------- ai -------------------------------- */
    case "ai": {
      const featured = item.features![0];
      return (
        <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-hero-950 via-hero-900 to-hero-800 shadow-[0_45px_110px_-45px_rgba(6,14,43,0.95)]">
          <div className="grid grid-cols-[1fr_minmax(0,17rem)_minmax(0,15rem)] gap-8 p-9">
            <div>
              <h3 className="font-display text-[1.9rem] font-extrabold text-white">
                {item.lead!.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-up-soft/80">
                {item.lead!.blurb}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-8">
                {item.columns!.map((group) => (
                  <div key={group.heading}>
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-hero-glow to-hero-600 text-white">
                        <Icon name={group.icon ?? "sparkles"} size={16} />
                      </span>
                      <p className="font-display text-[1.05rem] font-bold text-white">
                        {group.heading}
                      </p>
                    </div>
                    <ul className="mt-4 space-y-0.5">
                      {group.items.map((child) => (
                        <li key={child.href + child.label}>
                          <PanelLink child={child} dark />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured course card */}
            <Link
              href={featured.href}
              className="group/f flex flex-col overflow-hidden rounded-2xl bg-white transition-transform hover:-translate-y-0.5"
            >
              <span
                className={`relative block h-[9.5rem] shrink-0 bg-gradient-to-br ${featured.art}`}
              >
                <span className="absolute inset-0 grid-lines opacity-70" />
              </span>
              <span className="flex flex-1 flex-col gap-3 p-5">
                {featured.kicker && (
                  <span className="w-fit rounded-md bg-accent-yellow px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wide text-hero-950">
                    {featured.kicker}
                  </span>
                )}
                <span className="font-display text-[1.05rem] font-bold leading-snug text-up-ink transition-colors group-hover/f:text-up-accent">
                  {featured.title}
                </span>
              </span>
            </Link>

            {/* Gradient CTA card */}
            <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-hero-600 via-hero-glow to-accent-500 p-6">
              <p className="font-display text-[1.15rem] font-bold leading-snug text-white">
                {item.promo!.text}
              </p>
              <Link
                href={item.promo!.href}
                className="group/p mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-up-accent shadow-lg"
              >
                {item.promo!.label}
                <Icon
                  name="arrowRight"
                  size={15}
                  className="transition-transform group-hover/p:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */

/**
 * The header floats over the hero, so it has two looks:
 *
 *  • at the top of the page — full-bleed, transparent, white text on the dark hero
 *  • once scrolled — a frosted pill inset from the edges, dark text
 *
 * Ten items, one of them 19 characters, only fit beside the logo and CTA from
 * 1280px up, so below xl the bar collapses to the drawer.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Hysteresis: expand again only well above the collapse point, so a page
    // that reflows around the trigger cannot flip the header back and forth.
    const onScroll = () =>
      setScrolled((was) => (was ? window.scrollY > 24 : window.scrollY > 72));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open menu when the route changes — adjusted during render rather
  // than in an effect so it never causes a cascading re-render.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  /**
   * Several items share a route (Courses / After 12th / Resources all open
   * /courses), so exactly one wins the highlight: the deepest path that matches,
   * and on a tie the one declared first.
   */
  const activeLabel = (() => {
    let best: { label: string; depth: number } | null = null;
    for (const item of navItems) {
      if (item.neverActive) continue;
      const path = item.href.split("#")[0];
      const hit =
        path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
      if (hit && (!best || path.length > best.depth)) {
        best = { label: item.label, depth: path.length };
      }
    }
    return best?.label ?? null;
  })();

  const linkTone = scrolled
    ? "text-up-ink/85 hover:text-up-accent"
    : "text-white/85 hover:text-white";
  const activeTone = scrolled ? "text-up-accent" : "text-white";
  // Metrics are set by the worst case: ten items including "Certificate
  // Programs" beside the logo and CTA at exactly 1280px. They relax at 2xl.
  const linkSize = "px-1.5 text-[0.8rem] 2xl:px-3 2xl:text-[0.9rem]";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Shell: flush and full-bleed at the top, inset once scrolled. */}
      <div
        className={`transition-all duration-500 ease-out ${
          scrolled ? "px-3 pt-3 lg:px-6 lg:pt-4" : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ease-out ${
            scrolled
              ? "max-w-[92rem] rounded-full border border-line bg-white/85 shadow-[0_20px_60px_-25px_rgba(6,14,43,0.55)] backdrop-blur-xl"
              : "max-w-full rounded-none border border-transparent bg-transparent"
          }`}
        >
          <div
            className={`mx-auto flex w-full max-w-[86rem] items-center justify-between gap-5 transition-all duration-500 ease-out ${
              scrolled
                ? "h-[4.25rem] px-4 lg:px-5 2xl:px-7"
                : "h-[4.5rem] px-5 lg:h-[5.5rem] lg:px-6 2xl:px-10"
            }`}
          >
            <Logo variant={scrolled ? "dark" : "light"} size={scrolled ? "sm" : "lg"} />

            {/* ------------------------------ Desktop nav ----------------------------- */}
            <nav
              className="hidden items-center gap-0 xl:flex 2xl:gap-1"
              onMouseLeave={hoverClose}
              aria-label="Primary"
            >
              {navItems.map((item, i) => {
                const isOpen = openMenu === item.label;
                const isCurrent = activeLabel === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => (hasMenu(item) ? hoverOpen(item.label) : hoverClose())}
                    onFocus={() => (hasMenu(item) ? hoverOpen(item.label) : hoverClose())}
                  >
                    <Link
                      href={item.href}
                      aria-haspopup={hasMenu(item) || undefined}
                      aria-expanded={hasMenu(item) ? isOpen : undefined}
                      className={
                        item.pill
                          ? "relative mx-1 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-hero-glow to-hero-600 px-3.5 py-2 text-[0.82rem] font-semibold text-white shadow-lg shadow-hero-glow/35 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hero-glow/45 2xl:mx-1.5 2xl:px-5 2xl:text-[0.9rem]"
                          : `relative flex items-center gap-1 whitespace-nowrap py-2 font-medium transition-colors ${linkSize} ${
                              isCurrent || isOpen ? activeTone : linkTone
                            }`
                      }
                    >
                      {/* Soft ring behind an open item, as on the reference site. */}
                      {hasMenu(item) && (
                        <span
                          aria-hidden
                          className={`pointer-events-none absolute right-0 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border transition-opacity duration-300 ${
                            scrolled ? "border-up-accent/35" : "border-white/40"
                          } ${isOpen ? "opacity-100" : "opacity-0"}`}
                        />
                      )}

                      {item.label}
                      {item.pill && <Sparkle />}
                      {item.badge && <Badge tone={item.badge} />}
                      {hasMenu(item) && !item.pill && <Chevron open={isOpen} />}

                      {!item.pill && (
                        <span
                          className={`absolute inset-x-1.5 -bottom-1 h-0.5 origin-left rounded-full transition-transform duration-300 ${
                            scrolled ? "bg-up-accent" : "bg-white"
                          } ${isCurrent || isOpen ? "scale-x-100" : "scale-x-0"}`}
                        />
                      )}
                    </Link>

                    {/* Narrow panels anchor to their item; wide ones span the bar. */}
                    {item.panel === "list" && (
                      <div
                        className={`absolute top-full z-10 w-[19rem] pt-5 transition-all duration-200 ease-out ${
                          i >= navItems.length - 4 ? "right-0" : "left-0"
                        } ${
                          isOpen
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-2 opacity-0"
                        }`}
                      >
                        <PanelBody item={item} />
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* -------------------------------- Actions ------------------------------- */}
            <div className="flex shrink-0 items-center gap-2.5">
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className={`hidden h-10 w-10 place-items-center rounded-full border transition-all hover:-translate-y-0.5 2xl:grid ${
                  scrolled
                    ? "border-up-line text-up-accent hover:border-up-accent hover:bg-white"
                    : "border-white/25 text-white hover:border-white/60 hover:bg-white/10"
                }`}
              >
                <Icon name="whatsapp" size={18} />
              </a>

              <Link
                href="/contact"
                className={`hidden items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-hero-glow to-hero-600 font-bold text-white shadow-lg shadow-hero-600/35 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hero-glow/45 sm:inline-flex ${
                  scrolled
                    ? "px-5 py-2.5 text-[0.82rem] 2xl:px-6 2xl:text-[0.85rem]"
                    : "px-5 py-3 text-[0.85rem] 2xl:px-7 2xl:text-[0.9rem]"
                }`}
              >
                Book Demo
              </Link>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className={`grid h-11 w-11 place-items-center rounded-full border transition-colors xl:hidden ${
                  scrolled
                    ? "border-up-line text-up-ink hover:bg-white"
                    : "border-white/25 text-white hover:bg-white/10"
                }`}
              >
                <Icon name={mobileOpen ? "close" : "menu"} size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------- Wide panels (span the bar) ------------------------ */}
      {navItems.filter(isWide).map((item) => (
        <div
          key={item.label}
          onMouseEnter={() => hoverOpen(item.label)}
          onMouseLeave={hoverClose}
          className={`absolute inset-x-0 top-full hidden origin-top xl:block ${
            openMenu === item.label
              ? "pointer-events-auto opacity-100 [transform:translateY(0)_scaleY(1)]"
              : "pointer-events-none opacity-0 [transform:translateY(-10px)_scaleY(0.97)]"
          } transition-all duration-300 ease-out`}
        >
          <div className="mx-auto w-full max-w-[86rem] px-5 pt-4 lg:px-6 2xl:px-10">
            <PanelBody item={item} />
          </div>
        </div>
      ))}

      {/* ----------------------------- Mobile drawer ---------------------------- */}
      <div
        className={`fixed inset-0 top-0 z-40 xl:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-hero-950/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-400 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line px-5">
            <Logo size="sm" />
            <button
              onClick={() => setMobileOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-up-line text-up-ink"
              aria-label="Close menu"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile">
            {navItems.map((item) => {
              const open = mobileSub === item.label;
              const flat = childrenOf(item);
              return (
                <div key={item.label} className="border-b border-line/70 last:border-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className={`flex flex-1 items-center gap-2 py-3.5 text-base font-semibold ${
                        activeLabel === item.label ? "text-up-accent" : "text-up-ink"
                      }`}
                    >
                      {item.label}
                      {item.pill && <Sparkle />}
                      {item.badge && <Badge tone={item.badge} />}
                    </Link>
                    {flat.length > 0 && (
                      <button
                        onClick={() => setMobileSub(open ? null : item.label)}
                        className="grid h-9 w-9 place-items-center rounded-lg text-up-muted"
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={open}
                      >
                        <Icon
                          name="plus"
                          size={18}
                          className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                        />
                      </button>
                    )}
                  </div>

                  {flat.length > 0 && (
                    <div
                      className={`grid transition-all duration-400 ease-out ${
                        open ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        {item.columns?.map((group) => (
                          <div key={group.heading} className="mb-3">
                            <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-up-accent">
                              {group.heading}
                            </p>
                            <ul className="pl-3">
                              {group.items.map((child) => (
                                <li key={child.href + child.label}>
                                  <PanelLink child={child} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {item.links && (
                          <ul className="mb-2 pl-3">
                            {item.links.map((child) => (
                              <li key={child.href + child.label}>
                                <PanelLink child={child} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="shrink-0 space-y-3 border-t border-line px-5 py-5">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-hero-glow to-hero-600 py-3.5 text-sm font-bold text-white"
            >
              Book Demo <Icon name="arrowRight" size={16} />
            </Link>
            <a
              href={site.phoneHref}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-up-line py-3.5 text-sm font-semibold text-up-ink"
            >
              <Icon name="phone" size={16} /> {site.phone}
            </a>
            <div className="flex items-center justify-center gap-5 pt-1">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-up-muted transition-colors hover:text-up-accent"
                >
                  <Icon name={socialIcon[s.label] ?? "sparkles"} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
