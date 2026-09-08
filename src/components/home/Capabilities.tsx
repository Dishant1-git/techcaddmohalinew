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

const two = (n: number) => String(n + 1).padStart(2, "0");

/** White or near-black on a brand colour, whichever actually reads. */
function inkOn(hex: string) {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((v) =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45 ? "#0b1a4d" : "#ffffff";
}

function ToolLogo({ tool }: { tool: Tool }) {
  if (tool.mark) return <TechMark name={tool.mark} size={24} />;
  if (tool.emoji) return <span className="text-[1.25rem] leading-none">{tool.emoji}</span>;

  // A handful of vendors are a wordmark or a mascot — Jenkins' butler, Kali's
  // dragon, the Postgres elephant — and redrawing those at 24px produces a
  // smudge that reads worse than no logo. They get a solid tile in the brand
  // colour instead, which carries the same visual weight as a real mark rather
  // than looking like one failed to load.
  return (
    <span
      style={{ backgroundColor: tool.color, color: inkOn(tool.color ?? "#1c53d1") }}
      className="grid h-7 w-7 place-items-center rounded-[0.5rem] font-display text-[0.62rem] font-extrabold leading-none tracking-tight"
    >
      {tool.short}
    </span>
  );
}

/**
 * One tool. Every card is identical in weight — a capability grid exists to be
 * read, so nothing here is faded back for decoration.
 */
function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="cap-tool glass group/tool relative flex items-center gap-3.5 rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:!border-up-accent/40">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white shadow-[0_6px_16px_-8px_rgba(11,26,77,0.45)]">
        <ToolLogo tool={tool} />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-[0.85rem] font-bold text-up-ink">{tool.name}</span>
        <span className="truncate text-[0.7rem] text-up-muted">{tool.role}</span>
      </span>
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
   * under a synthetic pin-spacer div. React must unwrap that before its
   * mutation phase removes `root` from the tree, or it calls removeChild on a
   * node that is no longer where React thinks it is. Passive-effect cleanup
   * runs too late; layout-effect cleanup runs in the same synchronous pass. */
  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    // Pinning only makes sense where the rail and grid sit side by side. Below
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

  /* ---- Swap the grid's contents whenever the track changes ---- */
  useEffect(() => {
    if (prefersReducedMotion() || !board.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cap-head",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
      );
      gsap.fromTo(
        ".cap-tool",
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: { each: 0.04, from: "start" },
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
        className="relative isolate flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-white via-subtle to-white py-20 lg:py-0"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob left-[4%] top-[12%] h-[24rem] w-[24rem] bg-brand-300/45" />
          <div className="glow-blob right-[6%] bottom-[8%] h-[22rem] w-[22rem] bg-accent-400/35" />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

        <div className="container-x relative w-full">
          {/* ------------------------------- Header ------------------------------ */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-up-bright">
                Capabilities
              </p>
              <h2 className="mt-4 max-w-xl font-display text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-up-ink sm:text-4xl lg:text-[2.5rem]">
                Best-in-class technology,{" "}
                <span className="text-up-accent">taught the way it is built</span>
              </h2>
            </div>
            <p className="max-w-sm text-[0.92rem] leading-relaxed text-up-muted lg:pb-1.5">
              Six tracks, one campus — the tools we train you on are the ones the industry
              actually ships with.
            </p>
          </div>

          {/* ------------------------------ Two panels ---------------------------- */}
          <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[minmax(0,19rem)_1fr]">
            {/* Track rail — numbered, so the six read as a sequence */}
            <div className="flex flex-col gap-1.5">
              {capabilities.map((cap, i) => {
                const on = i === active;
                return (
                  <button
                    key={cap.key}
                    onClick={() => goTo(i)}
                    aria-current={on || undefined}
                    className={`group/rail relative block w-full overflow-hidden rounded-2xl px-5 py-4 text-left transition-all duration-300 ${
                      on
                        ? "bg-gradient-to-r from-hero-600 to-hero-glow shadow-[0_18px_40px_-20px_rgba(47,125,255,0.85)]"
                        : "hover:bg-white/70"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`font-mono text-[0.72rem] font-bold tabular-nums transition-colors ${
                          on ? "text-white/60" : "text-up-muted/45"
                        }`}
                      >
                        {two(i)}
                      </span>
                      <span
                        className={`flex-1 text-[0.95rem] font-bold transition-colors ${
                          on ? "text-white" : "text-up-ink/60 group-hover/rail:text-up-ink"
                        }`}
                      >
                        {cap.label}
                      </span>
                      <Icon
                        name="arrowRight"
                        size={16}
                        className={`shrink-0 transition-all duration-300 ${
                          on
                            ? "text-white opacity-100"
                            : "-translate-x-2 text-up-accent opacity-0 group-hover/rail:translate-x-0 group-hover/rail:opacity-60"
                        }`}
                      />
                    </span>

                    {/* Fills as you scroll through this track's slice */}
                    {on && (
                      <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/25">
                        <span
                          ref={progress}
                          className="block h-full origin-left scale-x-0 bg-white/90"
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tool grid */}
            <div ref={board} className="glass relative rounded-[1.75rem] p-6 lg:p-8">
              <div className="cap-head flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.72rem] font-bold tabular-nums text-up-muted/60">
                    {two(active)} / {two(capabilities.length - 1)}
                  </p>
                  <h3 className="mt-2 font-display text-[1.45rem] font-extrabold tracking-tight text-up-ink lg:text-[1.7rem]">
                    {current.label}
                  </h3>
                  <p className="mt-2 max-w-lg text-[0.9rem] leading-relaxed text-up-muted">
                    {current.blurb}
                  </p>
                </div>
                <span className="rounded-full border border-up-line bg-white/70 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-up-accent">
                  {current.tools.length} tools
                </span>
              </div>

              <div className="my-6 h-px bg-up-line/70" />

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {current.tools.map((tool) => (
                  <ToolCard key={`${current.key}-${tool.name}`} tool={tool} />
                ))}
              </div>

              <Link
                href={current.href}
                className="accent-fill group mt-7 inline-flex items-center gap-2 rounded-full py-2 pl-6 pr-2 text-[0.85rem] font-bold transition-all hover:-translate-y-0.5"
              >
                Explore {current.label}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-hero-950/12">
                  <Icon
                    name="arrowUpRight"
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
