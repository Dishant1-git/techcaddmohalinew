"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { courseSections } from "@/lib/coursePage";
import { scrollToElement } from "@/lib/lenis";
import { courseChromeOffset } from "@/components/courses/detail/SectionLink";

/**
 * Sticky in-page navigation for the course detail page.
 *
 * Three things have to line up for this to feel right, and each is measured at
 * runtime rather than hard-coded:
 *
 *  1. Where a clicked section lands. The navbar is fixed and this rail is
 *     sticky beneath it, so a section scrolled to y=0 would sit behind both.
 *     `chromeHeight()` reads the rail's own pinned offset and height, so the
 *     landing position stays correct if either changes.
 *  2. Which pill is lit. A single scroll pass picks the last section whose top
 *     has passed under the rail — always exactly one answer, unlike an
 *     intersection band that can match none between two sections.
 *  3. That clicking does not fight the smooth scroller. The click is kept from
 *     reaching <Animator/>'s global anchor handler and routed through the same
 *     Lenis instance with the offset this page actually needs.
 */
export type RailSkin = "catalogue" | "certificate" | "pathway";

/**
 * Appearance only — the behaviour above is identical across the three course
 * page designs, and duplicating that scroll/offset logic per design is exactly
 * how the three would drift apart.
 *
 * `catalogue` is the default and reproduces the original rail exactly.
 */
const SKINS: Record<
  RailSkin,
  {
    shell: string;
    progress: string;
    readout: string;
    readoutIndex: string;
    readoutRule: string;
    fade: string;
    item: string;
    itemIdle: string;
    itemActive: string;
    indicator: string;
    indicatorInner?: string;
  }
> = {
  catalogue: {
    shell: "border-b border-line bg-white/90 backdrop-blur-xl",
    progress: "bg-gradient-to-r from-up-accent via-hero-glow to-accent-glow",
    readout: "text-up-muted/70",
    readoutIndex: "text-up-accent",
    readoutRule: "bg-line",
    fade: "from-white to-transparent",
    item: "rounded-full px-4 py-2 text-[0.8rem] font-semibold tracking-tight",
    itemIdle: "text-up-muted hover:text-up-ink",
    itemActive: "text-white",
    indicator: "inset-0 rounded-full bg-up-ink shadow-[0_6px_20px_-8px_rgba(11,26,77,0.9)]",
    indicatorInner:
      "absolute inset-x-3 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-accent-glow/70 to-transparent",
  },

  /* Document register: no pill, a ruled gold underline like a tabbed file. */
  certificate: {
    shell: "border-b border-up-line bg-subtle/95 backdrop-blur-xl",
    progress: "bg-gradient-to-r from-up-gold via-up-accent to-up-ink",
    readout: "text-up-muted/70",
    readoutIndex: "text-up-ink",
    readoutRule: "bg-up-line",
    fade: "from-subtle to-transparent",
    item: "px-3.5 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.12em]",
    itemIdle: "text-up-muted hover:text-up-ink",
    itemActive: "text-up-ink",
    indicator: "inset-x-1 bottom-0 h-[3px] rounded-full bg-up-gold",
  },

  /* Route-map register: a bright capsule that glows, on a dark bar. */
  pathway: {
    shell: "border-b border-white/10 bg-hero-950/85 backdrop-blur-xl",
    progress: "bg-gradient-to-r from-accent-yellow via-accent-glow to-hero-glow",
    readout: "text-up-soft/50",
    readoutIndex: "text-accent-yellow",
    readoutRule: "bg-white/20",
    fade: "from-hero-950 to-transparent",
    item: "rounded-full px-4 py-2 text-[0.8rem] font-bold tracking-tight",
    itemIdle: "text-up-soft/60 hover:text-white",
    itemActive: "text-hero-950",
    indicator:
      "inset-0 rounded-full bg-gradient-to-r from-accent-yellow to-accent-glow shadow-[0_0_22px_-4px_rgba(0,212,255,0.9)]",
  },
};

export default function SectionRail({ skin = "catalogue" }: { skin?: RailSkin } = {}) {
  const [active, setActive] = useState(courseSections[0].id);
  const railRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /** Set while a click-scroll is in flight, so it wins over scroll tracking. */
  const lockedTo = useRef<string | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  /** Pixels of fixed chrome above the content: the rail's pinned top + height. */
  const chromeHeight = useCallback(() => courseChromeOffset(), []);

  /* ---- Active tracking -------------------------------------------------- */

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      // A click owns the highlight until the page arrives at that section.
      if (lockedTo.current) {
        const target = document.getElementById(lockedTo.current);
        const settled =
          target && Math.abs(target.getBoundingClientRect().top - chromeHeight()) < 8;
        if (settled) lockedTo.current = null;
        return;
      }

      const line = chromeHeight() + 24;
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;

      let current = courseSections[0].id;
      for (const section of courseSections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= line) current = section.id;
      }

      // The last section is usually too short to reach the line on its own.
      if (atBottom) current = courseSections[courseSections.length - 1].id;

      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chromeHeight]);

  /* ---- Keep the lit pill in view on narrow screens ---------------------- */

  useEffect(() => {
    const list = listRef.current;
    const pill = list?.querySelector<HTMLElement>(`[data-section="${active}"]`);
    if (!list || !pill) return;

    // Deliberately not scrollIntoView: that also scrolls ancestor containers,
    // which on this page means yanking the whole document sideways or down.
    const target = pill.offsetLeft - (list.clientWidth - pill.offsetWidth) / 2;
    const max = list.scrollWidth - list.clientWidth;
    list.scrollTo({ left: Math.max(0, Math.min(target, max)), behavior: "smooth" });
  }, [active]);

  /* ---- Click ------------------------------------------------------------ */

  function onSelect(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return; // Fall through to the browser's own hash navigation.

    e.preventDefault();

    // <Animator/> listens for `a[href^="#"]` clicks on `document` and scrolls
    // to its own offset, which is wrong for this page — the rail is pinned
    // below the navbar, so it needs more clearance. The App Router hydrates
    // the whole document, so React's delegated listener is on `document` too:
    // both handlers sit on the same node, and stopPropagation would not stop a
    // sibling listener there. stopImmediatePropagation is what actually does.
    e.nativeEvent.stopImmediatePropagation();

    lockedTo.current = id;
    setActive(id);
    scrollToElement(target, chromeHeight());
  }

  const s = SKINS[skin];

  return (
    /* Pinned under the scrolled navbar, which floats as a 4.25rem pill inside
       0.75rem (lg: 1rem) of padding. z-40 keeps it below the navbar itself. */
    <div
      ref={railRef}
      data-course-rail
      className={`sticky top-[5.15rem] z-40 lg:top-[5.4rem] ${s.shell}`}
    >
      <motion.div
        className={`absolute inset-x-0 top-0 h-[2px] origin-left ${s.progress}`}
        style={{ scaleX: progress }}
      />

      <div className="container-x">
        <div className="relative flex items-center gap-4">
          {/* Position readout — which of the nine sections you are reading. */}
          <span
            className={`hidden shrink-0 items-center gap-2 font-display text-[0.7rem] font-bold tabular-nums tracking-[0.14em] lg:flex ${s.readout}`}
          >
            <span className={s.readoutIndex}>
              {String(courseSections.findIndex((x) => x.id === active) + 1).padStart(2, "0")}
            </span>
            <span className={`h-3 w-px ${s.readoutRule}`} />
            <span>{String(courseSections.length).padStart(2, "0")}</span>
          </span>

          {/* Edge fades, so a cut-off pill reads as "more this way". */}
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r sm:hidden ${s.fade}`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l sm:hidden ${s.fade}`}
          />

          <nav
            ref={listRef}
            aria-label="Course sections"
            className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {courseSections.map((section) => {
              const isActive = active === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  data-section={section.id}
                  onClick={(e) => onSelect(e, section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative shrink-0 transition-colors duration-200 ${s.item} ${
                    isActive ? s.itemActive : s.itemIdle
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="course-rail-pill"
                      className={`absolute ${s.indicator}`}
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    >
                      {s.indicatorInner && <span className={s.indicatorInner} />}
                    </motion.span>
                  )}
                  <span className="relative">{section.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
