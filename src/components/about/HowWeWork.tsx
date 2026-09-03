"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Icon from "@/components/ui/Icon";
import {
  Bars,
  Chain,
  Chips,
  Donut,
  FlatCard,
  IsoBox,
  Logos,
  Seats,
  TileGrid,
} from "@/components/about/WorkDiagrams";

/**
 * "How we work" — the four rules, told as a scroll deck.
 *
 * On lg and up the section pins and the scroll position is the playhead: the
 * frame and its four corner markers stay put while each rule takes its turn —
 * its diagrams rise onto the canvas, its panel slides in from the right, its
 * corner marker lights up, then it clears out for the next one. Because it is
 * one scrubbed timeline rather than four independent reveals, scrolling back up
 * runs the whole thing in reverse.
 *
 * Below lg there is nothing to pin against, so the same steps stack and each
 * one plays as it scrolls into view. Under reduced motion or with no JS nothing
 * is hidden at all — GSAP is the only thing that ever sets a "from" state.
 */

/** Scroll distance per beat of the timeline, in viewports. */
const VH_PER_BEAT = 0.46;

/** Beats per step: ~0.7 to arrive, held, then it clears as the next arrives. */
const STEP_BEATS = 1.2;

/**
 * The pin must be torn down in the commit's mutation phase, before React
 * detaches any DOM — a passive effect cleanup runs too late.
 */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Step = {
  key: string;
  num: string;
  marker: string;
  accent: string;
  title: string;
  body: string;
  rows: { label: string; href: string }[];
};

const steps: Step[] = [
  {
    key: "outcome",
    num: "01",
    marker: "Outcome first",
    accent: "#a9c4ff",
    title: "Outcome over syllabus",
    body: "A course is only finished when you can build the thing, explain it, and pass the interview about it.",
    rows: [
      { label: "Live project work", href: "/courses" },
      { label: "Weekly code review", href: "/training" },
      { label: "Mock interviews", href: "/placements" },
    ],
  },
  {
    key: "batch",
    num: "02",
    marker: "Small batches",
    accent: "#6ee7c0",
    title: "Small batches, real attention",
    body: "12–18 students per batch so a trainer notices when someone is stuck instead of moving on.",
    rows: [
      { label: "12–18 seats per batch", href: "/courses" },
      { label: "Open practice hours", href: "/about#campus" },
      { label: "One-to-one doubt time", href: "/contact" },
    ],
  },
  {
    key: "current",
    num: "03",
    marker: "Always current",
    accent: "#e9b6b6",
    title: "Current, not archived",
    body: "Curriculum is reviewed every quarter against live job descriptions from our hiring partners.",
    rows: [
      { label: "Reviewed every quarter", href: "/courses" },
      { label: "Built with hiring partners", href: "/placements" },
      { label: "AI folded into every track", href: "/courses" },
    ],
  },
  {
    key: "honest",
    num: "04",
    marker: "Honest guidance",
    accent: "#ffd98a",
    title: "Honest guidance",
    body: "If a track is wrong for you, our counsellors say so. We would rather lose an admission than a reputation.",
    rows: [
      { label: "Free counselling call", href: "/contact" },
      { label: "Track fit before fees", href: "/courses" },
      { label: "No pressure to enrol", href: "/contact" },
    ],
  },
];

const LINE = "rgba(169,196,255,0.22)";

/** The little glyph that opens each row in the panel. */
function RowMark({ accent }: { accent: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true" className="shrink-0">
      <rect x="0" y="1.5" width="4.5" height="8" fill={accent} />
      <path d="M6.5 1.5 11 5.5 6.5 9.5Z" fill={accent} opacity="0.55" />
    </svg>
  );
}

/** One corner of the frame: marker square plus its label, inside or out. */
function Corner({
  step,
  at,
  registerMarker,
  registerLabel,
}: {
  step: Step;
  at: "tl" | "tr" | "bl" | "br";
  registerMarker: (el: HTMLSpanElement | null) => void;
  registerLabel: (el: HTMLSpanElement | null) => void;
}) {
  const pos = {
    tl: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex-row-reverse",
    tr: "right-0 top-0 translate-x-1/2 -translate-y-1/2",
    bl: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 flex-row-reverse",
    br: "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
  }[at];

  return (
    <div className={`absolute flex items-center gap-3 ${pos}`}>
      <span
        ref={registerMarker}
        className="hww-marker block h-4 w-4 shrink-0"
        style={{ background: step.accent, opacity: 0.45 }}
      />
      <span
        ref={registerLabel}
        className="whitespace-nowrap text-[0.85rem] font-semibold text-up-soft/55"
      >
        {step.marker}
      </span>
    </div>
  );
}

/** Each step nests one more rectangle inside the frame, offset differently so
 *  the canvas reads as a set of stacked planes rather than a single box. */
const NEST: React.CSSProperties[] = [
  { top: "7%", left: "6%", right: "24%", bottom: "9%" },
  { top: "13%", left: "16%", right: "9%", bottom: "17%" },
  { top: "8%", left: "10%", right: "18%", bottom: "7%" },
  { top: "15%", left: "6%", right: "21%", bottom: "13%" },
];

/** The diagram cluster for one step. Flow layout on small screens, composed
 *  across the canvas on lg — the reference's card-above, boxes-below cluster. */
function Cluster({ step }: { step: Step }) {
  if (step.key === "outcome") {
    return (
      <>
        <FlatCard
          label="Course outcome"
          className="lg:absolute lg:left-[30%] lg:top-[2%] lg:w-[25%]"
        >
          <Donut accent={step.accent} segments={[0.42, 0.31, 0.27]} centre="Job-ready" />
        </FlatCard>
        <IsoBox
          label="Project pipeline"
          className="lg:absolute lg:left-[2%] lg:top-[52%] lg:w-[26%]"
        >
          <Chips
            accent={step.accent}
            items={[
              { label: "Brief", icon: "target" },
              { label: "Build", icon: "code" },
              { label: "Review", icon: "check" },
              { label: "Ship", icon: "rocket" },
            ]}
          />
        </IsoBox>
        <IsoBox
          label="Interview rounds"
          className="lg:absolute lg:left-[33%] lg:top-[44%] lg:w-[24%]"
        >
          <TileGrid accent={step.accent} />
        </IsoBox>
      </>
    );
  }

  if (step.key === "batch") {
    return (
      <>
        <FlatCard label="One batch" className="lg:absolute lg:left-[30%] lg:top-[2%] lg:w-[26%]">
          <Seats accent={step.accent} />
          <p className="mt-3 text-[0.66rem] text-up-soft/55">12–18 seats · 1 trainer</p>
        </FlatCard>
        <IsoBox label="In the room" className="lg:absolute lg:left-[2%] lg:top-[52%] lg:w-[26%]">
          <Chips
            accent={step.accent}
            items={[
              { label: "Trainer", icon: "users" },
              { label: "Lab machine", icon: "monitor" },
              { label: "Doubt time", icon: "clock" },
            ]}
          />
        </IsoBox>
        <IsoBox
          label="Attention per seat"
          className="lg:absolute lg:left-[33%] lg:top-[44%] lg:w-[24%]"
        >
          <TileGrid accent={step.accent} />
        </IsoBox>
      </>
    );
  }

  if (step.key === "current") {
    return (
      <>
        <FlatCard
          label="Syllabus vs live job posts"
          className="lg:absolute lg:left-[28%] lg:top-[2%] lg:w-[29%]"
        >
          <Bars
            accent={step.accent}
            rows={[
              { label: "Q1", value: 62, note: "62%" },
              { label: "Q2", value: 78, note: "78%" },
              { label: "Q3", value: 71, note: "71%" },
              { label: "Q4", value: 94, note: "94%" },
            ]}
          />
        </FlatCard>
        <IsoBox label="Tools we teach" className="lg:absolute lg:left-[2%] lg:top-[52%] lg:w-[26%]">
          <Logos marks={["react", "python", "docker", "tensorflow", "powerbi", "figma"]} />
        </IsoBox>
        <IsoBox
          label="Quarterly review"
          className="lg:absolute lg:left-[34%] lg:top-[46%] lg:w-[24%]"
        >
          <Chain accent={step.accent} labels={["Job posts", "Rewrite", "Live"]} />
        </IsoBox>
      </>
    );
  }

  return (
    <>
      <FlatCard
        label="Counselling call"
        className="lg:absolute lg:left-[30%] lg:top-[2%] lg:w-[26%]"
      >
        <Chips
          accent={step.accent}
          items={[
            { label: "Right track for you", icon: "check" },
            { label: "Wrong track — we say so", icon: "close" },
            { label: "No pressure to enrol", icon: "shield" },
          ]}
        />
      </FlatCard>
      <IsoBox label="Before you enrol" className="lg:absolute lg:left-[2%] lg:top-[52%] lg:w-[26%]">
        <Chain accent={step.accent} labels={["Free demo", "Fee clarity", "Enrol"]} />
      </IsoBox>
      <IsoBox label="What we protect" className="lg:absolute lg:left-[33%] lg:top-[44%] lg:w-[24%]">
        <TileGrid accent={step.accent} />
      </IsoBox>
    </>
  );
}

export default function HowWeWork() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const stepEls = useRef<(HTMLDivElement | null)[]>([]);
  const markers = useRef<(HTMLSpanElement | null)[]>([]);
  const labels = useRef<(HTMLSpanElement | null)[]>([]);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    /** The pieces inside one step, in the order they should arrive. */
    const parts = (step: HTMLElement) => {
      const q = gsap.utils.selector(step);
      return {
        panel: q(".hww-panel"),
        frame: q(".hww-frame"),
        rises: q(".hww-rise"),
        pops: q(".hww-pop"),
        bars: q(".hww-bar"),
        draws: q(".hww-draw") as unknown as (SVGCircleElement & { dataset: DOMStringMap })[],
      };
    };

    /** Plays a step's contents in. `at` is a timeline position, in beats. */
    const playIn = (tl: gsap.core.Timeline, step: HTMLElement, at: number) => {
      const { panel, frame, rises, pops, bars, draws } = parts(step);

      if (frame.length) {
        tl.fromTo(
          frame,
          { opacity: 0, scale: 0.985 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
          at,
        );
      }
      tl.fromTo(
        rises,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.09 },
        at,
      );
      tl.fromTo(
        panel,
        { x: 70, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        at + 0.12,
      );
      if (pops.length) {
        tl.fromTo(
          pops,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out", stagger: 0.02 },
          at + 0.3,
        );
      }
      if (bars.length) {
        tl.fromTo(
          bars,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: "power3.out", stagger: 0.06 },
          at + 0.32,
        );
      }
      draws.forEach((el) => {
        // The dash *is* the arc, so growing the dash from zero draws the arc
        // from where it starts on the ring. The offset stays put.
        const dash = el.dataset.dash;
        if (!dash) return;
        tl.fromTo(
          el,
          { strokeDasharray: "0 1" },
          { strokeDasharray: dash, duration: 0.65, ease: "power2.out" },
          at + 0.28,
        );
      });
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ---- Desktop: pin the canvas, scrub the four steps through it ---- */
      mm.add("(min-width: 1024px)", () => {
        const list = stepEls.current.filter(Boolean) as HTMLElement[];
        // Built paused, then handed to ScrollTrigger below: with the scroll
        // range derived from the finished duration, one beat of the timeline is
        // always the same distance of scroll.
        const tl = gsap.timeline({ paused: true });

        // The intro holds the first beat, then clears the canvas.
        tl.to(intro.current, { opacity: 0, y: -30, duration: 0.35, ease: "power2.in" }, 0.65);

        list.forEach((step, i) => {
          const at = 1 + i * STEP_BEATS;
          playIn(tl, step, at);

          // The corner that owns this step lights up while it is on screen.
          const marker = markers.current[i];
          const label = labels.current[i];
          if (marker) tl.to(marker, { opacity: 1, scale: 1.35, duration: 0.3 }, at);
          if (label) tl.to(label, { color: "rgba(255,255,255,0.95)", duration: 0.3 }, at);

          // Everything but the last step clears out for its successor.
          if (i < list.length - 1) {
            const { panel, frame, rises } = parts(step);
            tl.to(frame, { opacity: 0, duration: 0.35, ease: "power2.in" }, at + 0.95);
            // It leaves as its successor arrives — the canvas is never empty.
            tl.to(
              [...rises, ...panel],
              { y: -55, opacity: 0, duration: 0.4, ease: "power2.in", stagger: 0.04 },
              at + 0.95,
            );
            if (marker) tl.to(marker, { opacity: 0.45, scale: 1, duration: 0.3 }, at + 1.0);
            if (label) {
              tl.to(label, { color: "rgba(169,196,255,0.55)", duration: 0.3 }, at + 1.0);
            }
          }
        });

        // A beat of hold on the last step before the pin lets go.
        tl.to({}, { duration: 0.4 });

        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: `+=${tl.duration() * VH_PER_BEAT * 100}%`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: tl,
          // The playhead chases the scroll instead of snapping to it, which is
          // what makes a scrubbed deck feel driven rather than dragged.
          scrub: 0.7,
        });
      });

      /* ---- Below lg: no pin — each step plays as it scrolls into view ---- */
      mm.add("(max-width: 1023.98px)", () => {
        (stepEls.current.filter(Boolean) as HTMLElement[]).forEach((step) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: step, start: "top 82%", once: true },
          });
          playIn(tl, step, 0);
        });
      });

      return () => mm.revert();
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    // ScrollTrigger's pin moves the <section> into an injected .pin-spacer, so
    // React must only ever remove this wrapper — the section goes with it.
    <div>
      <section
        ref={root}
        id="values"
        className="relative scroll-mt-32 overflow-hidden bg-hero-950 py-20 text-white lg:flex lg:min-h-screen lg:items-center lg:py-0"
      >
        {/* The same glow the other dark sections sit in. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_-5%,rgba(28,83,209,0.28),transparent_70%)]" />

        <div className="container-x relative w-full">
          {/* The frame: one rectangle, a marker at each corner. On small
              screens it is just a header — there is no canvas to draw on. */}
          <div
            ref={stage}
            className="relative lg:mx-28 lg:h-[74vh] lg:border xl:mx-36"
            style={{ borderColor: LINE }}
          >
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              {steps.map((s, i) => (
                <Corner
                  key={s.key}
                  step={s}
                  at={(["tl", "tr", "bl", "br"] as const)[i]}
                  registerMarker={(el) => {
                    markers.current[i] = el;
                  }}
                  registerLabel={(el) => {
                    labels.current[i] = el;
                  }}
                />
              ))}
            </div>

            {/* Intro — the section's heading, and the deck's title card. */}
            <div
              ref={intro}
              className="lg:absolute lg:inset-0 lg:grid lg:place-items-center lg:text-center"
            >
              <div className="max-w-2xl">
                <span
                  className="inline-flex items-center gap-2.5 border px-5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-white"
                  style={{ borderColor: LINE }}
                >
                  <span className="h-1.5 w-1.5 bg-up-soft" />
                  How we work
                </span>
                <h2 className="mt-7 font-display text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]">
                  Four rules we do not bend
                </h2>
                <p className="mt-6 text-[0.95rem] font-medium leading-relaxed text-up-soft/70 sm:text-lg">
                  They sound obvious. Keeping them when a batch is full and a deadline is close is
                  the actual work.
                </p>
              </div>
            </div>

            {/* The steps. Stacked on the canvas at lg, in flow below it. */}
            <div className="mt-14 space-y-20 lg:mt-0 lg:space-y-0">
              {steps.map((step, i) => (
                <div
                  key={step.key}
                  ref={(el) => {
                    stepEls.current[i] = el;
                  }}
                  className="relative lg:absolute lg:inset-0"
                >
                  <div
                    aria-hidden="true"
                    className="hww-frame pointer-events-none absolute hidden border lg:block"
                    style={{ ...NEST[i], borderColor: "rgba(169,196,255,0.12)" }}
                  />

                  <Cluster step={step} />

                  <div
                    className="hww-panel mt-10 border bg-panel/92 p-6 sm:p-8 lg:absolute lg:right-[-3%] lg:top-[22%] lg:mt-0 lg:w-[42%] lg:backdrop-blur-sm xl:w-[38%]"
                    style={{ borderColor: LINE }}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <h3 className="font-display text-[1.7rem] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[2.15rem]">
                        {step.title}
                      </h3>
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center text-[0.78rem] font-extrabold text-hero-950"
                        style={{ background: step.accent }}
                      >
                        {step.num}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-up-soft/70 sm:text-[0.95rem]">
                      {step.body}
                    </p>

                    <ul className="mt-6">
                      {step.rows.map((row) => (
                        <li key={row.label} className="border-t" style={{ borderColor: LINE }}>
                          <Link
                            href={row.href}
                            className="group flex items-center gap-3 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:text-white sm:text-[0.97rem]"
                          >
                            <RowMark accent={step.accent} />
                            {row.label}
                            <Icon
                              name="arrowRight"
                              size={15}
                              className="text-up-soft/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white/80"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
