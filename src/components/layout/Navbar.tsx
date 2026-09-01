"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems, site } from "@/lib/site";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${pct}%`;
    };
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
    setOpenMega(null);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMega(label);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMega(null), 140);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility strip */}
      <div
        className={`hidden overflow-hidden border-b border-white/10 bg-hero-950 text-white transition-all duration-500 lg:block ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="container-x flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6 text-up-soft">
            <a href={site.phoneHref} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Icon name="phone" size={13} /> {site.phone}
            </a>
            <a href={site.emailHref} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Icon name="mail" size={13} /> {site.email}
            </a>
            <span className="flex items-center gap-1.5">
              <Icon name="clock" size={13} /> {site.hours}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-accent-yellow">
              <Icon name="star" size={13} className="fill-accent-yellow" /> 4.9 on Google
            </span>
            <span className="hidden items-center gap-1.5 text-up-soft xl:flex">
              <Icon name="pin" size={13} /> Sector 75, Mohali
            </span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-white/85 shadow-[0_10px_40px_-20px_rgba(11,26,77,0.35)] backdrop-blur-xl"
            : "border-b border-transparent bg-white"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={hoverClose}>
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => (item.groups ? hoverOpen(item.label) : hoverClose())}
              >
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-[0.9rem] font-semibold transition-colors ${
                    isActive(item.href) ? "text-up-accent" : "text-up-ink/80 hover:text-up-accent"
                  }`}
                >
                  {item.label}
                  {item.groups && (
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-3 w-3 transition-transform duration-300 ${
                        openMega === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-up-accent transition-transform duration-300 ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-up-line text-up-accent transition-all hover:-translate-y-0.5 hover:border-up-accent hover:bg-brand-50"
              aria-label="Chat on WhatsApp"
            >
              <Icon name="whatsapp" size={18} />
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-hero-600 to-hero-glow px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-hero-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hero-glow/35"
            >
              Book a free demo
              <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-up-line text-up-ink lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <Icon name={mobileOpen ? "close" : "menu"} size={22} />
          </button>
        </div>

        {/* Scroll progress */}
        <div className="h-[2px] w-full bg-transparent">
          <div
            ref={progressRef}
            className="h-full w-0 bg-gradient-to-r from-hero-600 via-hero-glow to-accent-glow"
          />
        </div>
      </div>

      {/* Mega menu */}
      {navItems
        .filter((i) => i.groups)
        .map((item) => (
          <div
            key={item.label}
            onMouseEnter={() => hoverOpen(item.label)}
            onMouseLeave={hoverClose}
            className={`absolute inset-x-0 top-full hidden origin-top lg:block ${
              openMega === item.label
                ? "pointer-events-auto opacity-100 [transform:translateY(0)_scaleY(1)]"
                : "pointer-events-none opacity-0 [transform:translateY(-8px)_scaleY(0.97)]"
            } transition-all duration-300 ease-out`}
          >
            <div className="container-x pt-2">
              <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_40px_100px_-40px_rgba(11,26,77,0.45)]">
                <div className="grid grid-cols-4 gap-2 p-6">
                  {item.groups!.map((group) => (
                    <div key={group.heading}>
                      <p className="mb-3 px-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-up-accent">
                        {group.heading}
                      </p>
                      <ul className="space-y-0.5">
                        {group.items.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-up-ink/80 transition-all hover:bg-brand-50 hover:text-up-accent"
                            >
                              <span>{child.label}</span>
                              {child.badge ? (
                                <span className="rounded-full bg-accent-yellow px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wide text-hero-950">
                                  {child.badge}
                                </span>
                              ) : (
                                <Icon
                                  name="arrowUpRight"
                                  size={13}
                                  className="opacity-0 transition-opacity group-hover:opacity-100"
                                />
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-line bg-subtle px-6 py-4">
                  <p className="text-sm text-up-muted">
                    Not sure which track fits? Our counsellors map it to your background in 10 minutes.
                  </p>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-up-accent hover:underline"
                  >
                    View all courses <Icon name="arrowRight" size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-0 z-40 lg:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-hero-950/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-white shadow-2xl transition-transform duration-400 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
            <Logo />
            <button
              onClick={() => setMobileOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-up-line text-up-ink"
              aria-label="Close menu"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <nav className="p-4">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-line/70 last:border-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={`flex-1 py-3.5 text-base font-semibold ${
                      isActive(item.href) ? "text-up-accent" : "text-up-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.groups && (
                    <button
                      onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                      className="grid h-9 w-9 place-items-center rounded-lg text-up-muted"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <Icon
                        name="plus"
                        size={18}
                        className={`transition-transform duration-300 ${
                          mobileSub === item.label ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {item.groups && (
                  <div
                    className={`grid transition-all duration-400 ease-out ${
                      mobileSub === item.label ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {item.groups.map((group) => (
                        <div key={group.heading} className="mb-3">
                          <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-up-accent">
                            {group.heading}
                          </p>
                          <ul>
                            {group.items.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block py-1.5 pl-3 text-sm text-up-muted hover:text-up-accent"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="space-y-3 px-5 pb-8">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-hero-600 to-hero-glow py-3.5 text-sm font-semibold text-white"
            >
              Book a free demo <Icon name="arrowRight" size={16} />
            </Link>
            <a
              href={site.phoneHref}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-up-line py-3.5 text-sm font-semibold text-up-ink"
            >
              <Icon name="phone" size={16} /> {site.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
