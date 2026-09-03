"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { capabilities, type Tool } from "@/lib/capabilities";
import Icon from "@/components/ui/Icon";
import TechMark from "@/components/ui/TechMark";

/** How much scroll each track gets while the section is pinned, in viewports. */
const VH_PER_TRACK = 0.5;

/**
 * The pin has to be torn down in the commit's mutation phase, before React
 * detaches any DOM — a passive `useEffect` cleanup runs too late. On the server
 * there is no layout to measure, so fall back and avoid React's warning.
 */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------------- *
 * Flow canvas
 *
 * Eight fixed slots on a 16:10 board. Slots never move — only their contents
 * swap as the scroll advances the track, so the logos and names change in place
 * rather than the whole arrangement reshuffling. Pills are placed by their
 * centre, which makes the connector anchors exact.
 * -------------------------------------------------------------------------- */

const VB_W = 320;
const VB_H = 200;
const vx = (x: number) => (x / 100) * VB_W;
const vy = (y: number) => (y / 100) * VB_H;

/** Pill footprint. Half-extents are what connectors anchor to. */
const PILL_W = 28;
const HALF_W = vx(PILL_W / 2);
const HALF_H = 13;

type Tier = "bright" | "mid" | "faint";

/**
 * Three loose columns at 15/48/83% with the rows jittered. At 28% pill width
 * that leaves a real gap between neighbours, which the connectors need — pack
 * them any tighter and the stub between two pills collapses to a few pixels.
 */
const SLOTS: { x: number; y: number; tier: Tier; mirror?: boolean }[] = [
  { x: 50, y: 50, tier: "bright" }, // 0 — the focused pill, dead centre
  { x: 17, y: 50, tier: "mid", mirror: true }, // 1 — logo on the right
  { x: 83, y: 30, tier: "mid" }, // 2
  { x: 46, y: 14, tier: "mid" }, // 3
  { x: 15, y: 14, tier: "faint" }, // 4
  { x: 48, y: 86, tier: "faint" }, // 5
  { x: 80, y: 72, tier: "faint" }, // 6
  { x: 88, y: -6, tier: "faint" }, // 7 — clipped by the board's top edge
];

/** [from, to, shape] — "line" is the one solid segment, the rest are dashed. */
const LINKS: [number, number, "line" | "h" | "v"][] = [
  [1, 0, "line"],
  [4, 0, "h"],
  [0, 3, "v"],
  [0, 5, "v"],
  [0, 2, "h"],
  [2, 7, "v"],
  [2, 6, "v"],
];

function linkPath([a, b, shape]: [number, number, "line" | "h" | "v"]) {
  const A = SLOTS[a];
  const B = SLOTS[b];
  const ax = vx(A.x);
  const ay = vy(A.y);
  const bx = vx(B.x);
  const by = vy(B.y);

  if (shape === "h" || shape === "line") {
    const dir = bx > ax ? 1 : -1;
    const x1 = ax + dir * HALF_W;
    const x2 = bx - dir * HALF_W;
    if (shape === "line") return `M${x1} ${ay} H${x2}`;
    // A floor on the control offset: neighbouring columns sit close, and a
    // midpoint-based control would squash the S into a near-vertical kink.
    const bow = Math.max(30, Math.abs(x2 - x1) * 0.6);
    return `M${x1} ${ay} C ${x1 + dir * bow} ${ay}, ${x2 - dir * bow} ${by}, ${x2} ${by}`;
  }

  const dir = by > ay ? 1 : -1;
  const y1 = ay + dir * HALF_H;
  const y2 = by - dir * HALF_H;
  const bow = Math.max(24, Math.abs(y2 - y1) * 0.6);
  return `M${ax} ${y1} C ${ax} ${y1 + dir * bow}, ${bx} ${y2 - dir * bow}, ${bx} ${y2}`;
}

const TIER: Record<Tier, string> = {
  bright:
    "bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.7),0_22px_55px_-18px_rgba(0,212,255,0.75)]",
  mid: "bg-white/[0.13] border border-white/20 backdrop-blur-md",
  faint: "bg-white/[0.06] border border-white/10 backdrop-blur-sm",
};

const TIER_TITLE: Record<Tier, string> = {
  bright: "text-up-ink",
  mid: "text-white/90",
  faint: "text-white/45",
};

const TIER_ROLE: Record<Tier, string> = {
  bright: "text-up-muted",
  mid: "text-up-soft/60",
  faint: "text-up-soft/30",
};

function ToolLogo({ tool }: { tool: Tool }) {
  if (tool.mark) return <TechMark name={tool.mark} size={22} />;
  if (tool.emoji) return <span className="text-[1.15rem] leading-none">{tool.emoji}</span>;
  return (
    <span
      style={{ color: tool.color }}
      className="font-display text-[0.72rem] font-extrabold leading-none tracking-tight"
    >
      {tool.short}
    </span>
  );
}

function Pill({
  tool,
  tier = "bright",
  mirror,
}: {
  tool: Tool;
  tier?: Tier;
  mirror?: boolean;
}) {
  const chip = (
    <span
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
        tier === "bright" ? "bg-subtle" : "bg-white/90"
      } ${tier === "faint" ? "opacity-45" : ""}`}
    >
      <ToolLogo tool={tool} />
    </span>
  );

  const text = (
    <span className={`flex min-w-0 flex-col leading-tight ${mirror ? "text-right" : ""}`}>
      <span className={`truncate text-[0.82rem] font-bold ${TIER_TITLE[tier]}`}>{tool.name}</span>
      <span className={`truncate text-[0.68rem] ${TIER_ROLE[tier]}`}>{tool.role}</span>
    </span>
  );

  return (
    <div
      className={`cap-tool flex items-center gap-3 rounded-full px-3 py-2.5 transition-transform duration-300 hover:-translate-y-0.5 ${TIER[tier]}`}
    >
      {mirror ? (
        <>
          {text}
          {chip}
        </>
      ) : (
        <>
          {chip}
          {text}
        </>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export default function Capabilities() {
  const root = useRef<HTMLElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  /* ---- Scroll drives the track: pin the section, step through the six ----
   * useIsoLayoutEffect, not useEffect: ScrollTrigger's `pin` re-parents `root`
   * under a synthetic pin-spacer div. React must unwrap that (via st.kill()
   * in cleanup) before its mutation phase removes `root` from the tree, or
   * it calls removeChild on a node that is no longer where React thinks it
   * is. Passive-effect cleanup runs too late for that; layout-effect cleanup
   * runs in the same synchronous pass as the removal. */
  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    // Pinning only makes sense where the rail and board sit side by side. Below
    // lg the section scrolls normally and the rail works as plain tabs.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: `+=${capabilities.length * VH_PER_TRACK * 100}%`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const raw = self.progress * capabilities.length;
          const i = Math.min(capabilities.length - 1, Math.floor(raw));
          // Sub-progress is written straight to the DOM. Putting it in state
          // would re-render the whole section on every scroll frame.
          if (progress.current) {
            progress.current.style.transform = `scaleX(${Math.min(1, raw - i)})`;
          }
          setActive(i);
        },
      });
      trigger.current = st;
      // Only drop the handle here. Killing the trigger outright would leave the
      // pin-spacer in the DOM; mm.revert() below tears the pin down properly.
      return () => {
        trigger.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  /* ---- Swap the board's contents whenever the track changes ---- */
  useEffect(() => {
    if (prefersReducedMotion() || !board.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cap-desc",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      );
      gsap.fromTo(
        ".cap-tool",
        { y: 12, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: { each: 0.045, from: "center" },
        },
      );
    }, board);
    return () => ctx.revert();
  }, [active]);

  /** Clicking a track scrolls to the middle of its slice of the pinned range. */
  const goTo = (i: number) => {
    const st = trigger.current;
    if (!st) {
      setActive(i);
      return;
    }
    const top = st.start + ((i + 0.5) / capabilities.length) * (st.end - st.start);
    // Route through Lenis when it is driving the page; a native smooth scroll
    // would run its own animation alongside Lenis's and the two visibly fight.
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top, behavior: "smooth" });
  };

  const current = capabilities[active];

  return (
    // The wrapper is deliberate. ScrollTrigger's pin injects a .pin-spacer and
    // moves the <section> inside it, so the section's real parent stops matching
    // the one React recorded. Keeping a plain div as the outermost node means
    // React only ever removes the wrapper on unmount — the relocated section
    // goes with it, instead of throwing NotFoundError from removeChild.
    <div>
      <section
        ref={root}
        id="capabilities"
        className="relative isolate flex min-h-screen items-center overflow-hidden bg-hero-950 py-20 text-white lg:py-0"
      >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,rgba(28,83,209,0.35),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" />

      <div className="container-x relative w-full">
        {/* ------------------------------- Header ------------------------------ */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-up-soft/80 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-glow shadow-[0_0_10px_2px_rgba(0,212,255,0.7)]" />
            Capabilities
          </span>

          <h2 className="mx-auto mt-5 max-w-3xl font-display text-[1.8rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.6rem]">
            Best-in-class technology,
            <br />
            <span className="text-gradient">taught the way it is built</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[0.88rem] text-up-soft/60">
            Six tracks, one campus — the tools we train you on are the ones the industry
            actually ships with.
          </p>
        </div>

        {/* ------------------------------ Two panels ---------------------------- */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,20rem)_1fr]">
          {/* Track rail */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
            {capabilities.map((cap, i) => {
              const on = i === active;
              return (
                <button
                  key={cap.key}
                  onClick={() => goTo(i)}
                  aria-current={on || undefined}
                  className={`relative block w-full overflow-hidden rounded-2xl px-5 py-[0.9rem] text-left transition-all duration-400 ${
                    on
                      ? "bg-gradient-to-r from-hero-600 to-hero-glow shadow-[0_18px_40px_-20px_rgba(47,125,255,0.9)]"
                      : "hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span
                      className={`text-[0.95rem] font-bold transition-colors ${
                        on ? "text-white" : "text-up-soft/55"
                      }`}
                    >
                      {cap.label}
                    </span>
                    <Icon
                      name="arrowRight"
                      size={16}
                      className={`shrink-0 transition-all duration-300 ${
                        on ? "text-white opacity-100" : "-translate-x-2 opacity-0"
                      }`}
                    />
                  </span>

                  {/* Fills as you scroll through this track's slice */}
                  {on && (
                    <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/20">
                      <span
                        ref={progress}
                        className="block h-full origin-left scale-x-0 bg-white/85"
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Flow board */}
          <div
            ref={board}
            className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm lg:p-6"
          >
            <p className="cap-desc text-[0.9rem] text-up-soft/65">{current.blurb}</p>

            {/* Full canvas — needs the width to breathe, so lg and up only */}
            <div className="relative mt-4 hidden aspect-[16/10] w-full overflow-hidden lg:block">
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {LINKS.map(([a, b, shape]) => (
                  <path
                    key={`${a}-${b}`}
                    d={linkPath([a, b, shape])}
                    fill="none"
                    stroke={shape === "line" ? "rgba(0,212,255,0.75)" : "rgba(169,196,255,0.32)"}
                    strokeWidth={shape === "line" ? 1.4 : 1}
                    strokeLinecap="round"
                    className={shape === "line" ? undefined : "flow-dash"}
                  />
                ))}
              </svg>

              {SLOTS.map((slot, i) => {
                const tool = current.tools[i];
                if (!tool) return null;
                return (
                  <div
                    key={`${current.key}-${i}`}
                    style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: `${PILL_W}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                  >
                    <Pill tool={tool} tier={slot.tier} mirror={slot.mirror} />
                  </div>
                );
              })}

              {/* Floating action, bottom-left — that corner of the board is free */}
              <Link
                href={current.href}
                className="group absolute bottom-0 left-0 inline-flex items-center gap-2 rounded-full bg-white/95 py-2 pl-4 pr-2 text-[0.82rem] font-bold text-up-ink transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                Explore track
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-r from-hero-600 to-hero-glow text-white">
                  <Icon
                    name="arrowUpRight"
                    size={14}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </div>

            {/* Compact stack below lg — the scatter needs width the phone lacks */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:hidden">
              {current.tools.map((tool) => (
                <Pill key={`${current.key}-${tool.name}`} tool={tool} />
              ))}
            </div>
            <Link
              href={current.href}
              className="group mt-5 inline-flex items-center gap-2 rounded-full bg-white/95 py-2 pl-5 pr-2 text-[0.85rem] font-bold text-up-ink lg:hidden"
            >
              Explore {current.label}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-r from-hero-600 to-hero-glow text-white">
                <Icon name="arrowRight" size={15} />
              </span>
            </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
