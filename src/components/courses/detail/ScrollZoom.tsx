"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import Icon from "@/components/ui/Icon";
import { courseChromeOffset } from "@/components/courses/detail/SectionLink";

/**
 * The scroll-driven expansion that opens "Why choose us".
 *
 * A small gradient card is set inline in the headline. As the reader scrolls,
 * the stage sticks to the viewport, the headline fades, and that card grows
 * from its inline footprint until it fills the screen — then the reasons for
 * this track surface on top of it, frosted over the gradient.
 *
 * The growth is a single `transform` (translate + scale) on one element, so it
 * stays on the compositor: nothing is re-laid out while it plays. The card's
 * travel and its final scale are measured from the layout rather than guessed,
 * which is what keeps it landing exactly on the viewport at every size.
 *
 * Under reduced motion the whole mechanic is skipped — the headline and the
 * cards render as two ordinary blocks.
 */

export type ZoomCard = { icon: string; title: string; body: string };

/** The gradient itself — the inline card and the full-screen field are one element. */
const FIELD =
  "bg-[linear-gradient(135deg,#123285_0%,#1c53d1_38%,#2f7dff_70%,#00d4ff_100%)]";

/**
 * What the expanded field carries: the section's own cards, frosted over the
 * gradient.
 *
 * The stage holds the screen for the length of the scroll, so anything the
 * reader has to reach sideways for is simply missed. On phones the cards turn
 * into six compact rows — icon beside a title, the body clamped to two lines —
 * so all of them are on the screen at once; from `sm` up they stack back into
 * the full grid.
 */
function Cards({ items, note }: { items: ZoomCard[]; note: string }) {
  return (
    <div className="container-x">
      <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3">
        {items.map((c) => (
          <article
            key={c.title}
            className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white p-3 text-left shadow-[0_20px_45px_-26px_rgba(6,14,43,0.75)] sm:block sm:p-5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-up-accent sm:h-11 sm:w-11">
              <Icon name={c.icon} size={18} />
            </span>
            <div className="min-w-0">
              <h3 className="text-[0.88rem] font-bold leading-snug text-up-ink sm:mt-4 sm:text-base">
                {c.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-[0.72rem] leading-relaxed text-up-muted sm:mt-2 sm:line-clamp-none sm:text-[0.82rem]">
                {c.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-center gap-3.5 text-center sm:mt-7 sm:gap-4">
        <p className="max-w-2xl text-[0.75rem] leading-relaxed text-white/70">{note}</p>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-hero-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-hero-950/35 transition-transform hover:-translate-y-0.5 sm:px-7 sm:py-3.5"
        >
          Book a free demo class
          <Icon
            name="arrowRight"
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}

/** The stage-one typography. `inline` is the slot the card grows out of. */
function Headline({ inline }: { inline: React.ReactNode }) {
  return (
    <>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-up-soft/80">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
        Why choose us
      </span>
      <h2 className="mt-7 font-display text-[1.9rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.12]">
        Finish with a portfolio, {inline} an internship letter and interviews —
        <span className="text-up-soft/60"> not just a certificate.</span>
      </h2>
    </>
  );
}

export default function ScrollZoom({ items, note }: { items: ZoomCard[]; note: string }) {
  // Read after mount, not during render: the server has no media query, so
  // branching on it in the first render would hand React a tree that does not
  // match the HTML it is hydrating.
  const [reduce, setReduce] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLSpanElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  // The navbar and the sticky section rail cover the top of the viewport. The
  // gradient still fills the screen behind them, but nothing readable may sit
  // under them, so the stage's content is inset by whatever they measure. The
  // headline gets that inset imperatively inside `measure` instead of from
  // this state — see there for why; this drives the reveal panel only.
  const [chrome, setChrome] = useState(0);
  // Six cards, a line of copy and a button do not always fit between the rail
  // and the bottom of a short laptop window. Rather than let the button fall
  // off the fold, the panel is scaled to whatever room is left — a transform,
  // so nothing reflows and the text stays sharp.
  const [fit, setFit] = useState(1);

  /** Where the inline card starts, and what it takes to fill the stage. */
  const [geo, setGeo] = useState({ left: 0, top: 0, w: 0, h: 0, dx: 0, dy: 0, scale: 1 });

  const measure = useCallback(() => {
    const gap = courseChromeOffset();
    setChrome(gap);

    const s = stage.current;
    const p = slot.current;
    if (!s || !p) return;

    // The headline's own inset is written to the DOM here rather than rendered
    // from `chrome`: React would only apply it on a later commit, and the slot
    // read below would then be measuring the layout as it was *before* the
    // inset — leaving the card parked half a chrome height above the gap it is
    // supposed to grow out of.
    if (head.current) head.current.style.paddingTop = `${gap}px`;

    // 32px of air under the rail, 24px above the fold — the panel is scaled
    // into whatever is left between them.
    //
    // The room is measured against the smaller of the stage and the window: on
    // a phone the stage is 100vh, which stays the *large* viewport even while
    // the browser's own toolbars are showing, so fitting to it would post the
    // button behind them. The gradient still spans the full 100vh, so shrinking
    // only the readable part leaves no seam.
    const content = panel.current?.offsetHeight ?? 0;
    const room = Math.min(s.getBoundingClientRect().height, window.innerHeight) - gap - 56;
    setFit(content > 0 && room > 0 ? Math.min(1, room / content) : 1);

    const S = s.getBoundingClientRect();
    const P = p.getBoundingClientRect();
    if (!P.width || !S.width) return;
    setGeo({
      left: P.left - S.left,
      top: P.top - S.top,
      w: P.width,
      h: P.height,
      // Travel from the card's own centre to the centre of the stage.
      dx: S.width / 2 - (P.left - S.left + P.width / 2),
      dy: S.height / 2 - (P.top - S.top + P.height / 2),
      // A hair over, so no seam shows at the edges mid-flight.
      scale: Math.max(S.width / P.width, S.height / P.height) * 1.04,
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce) return;
    // After paint, so the headline has its final layout to measure.
    const first = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);
    if (panel.current) ro.observe(panel.current);
    // Late web fonts reflow the headline, which moves the inline card.
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(first);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, reduce]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });

  // One eased driver for the growth, so scale and travel cannot drift apart.
  const drive = useTransform(scrollYProgress, [0.06, 0.62], [0, 1], { clamp: true });
  const grow = useSpring(drive, { stiffness: 150, damping: 28, mass: 0.35 });

  const scale = useTransform(grow, [0, 1], [1, geo.scale || 1]);
  const x = useTransform(grow, [0, 1], [0, geo.dx]);
  const y = useTransform(grow, [0, 1], [0, geo.dy]);
  // Scale multiplies the corner radius, so divide it back out to hold a
  // constant visual radius, then run it to a square full-bleed edge.
  const radius = useTransform(
    grow,
    (v) => `${(22 * (1 - v)) / (1 + ((geo.scale || 1) - 1) * v)}px`,
  );

  // Everything hangs off `grow`, not off the raw scroll progress. Two reasons:
  // the fade and the growth can never drift apart, and a value read straight
  // from scroll gets handed to a native ViewTimeline — which tracks the sticky
  // element's own visibility, not this wrapper's travel, and plays the fade
  // back in reverse halfway through.
  // The little card carries a mark. It is counter-scaled so it keeps its own
  // size while the card grows around it, and clears out early — what fills the
  // screen is the plain gradient field, not a magnified detail.
  const detail = useTransform(grow, [0, 0.16], [1, 0]);
  const detailScale = useTransform(scale, (v) => 1 / v);

  const headline = useTransform(grow, [0, 0.36], [1, 0]);
  const headlineY = useTransform(grow, [0, 0.36], [0, -44]);
  const revealOpacity = useTransform(grow, [0.78, 0.97], [0, 1]);
  const revealY = useTransform(grow, [0.78, 1], [44, 0]);

  useMotionValueEvent(grow, "change", (v) => setRevealed(v > 0.9));

  /* ---- Reduced motion: two plain blocks, no stage, no growth ------------- */
  if (reduce) {
    return (
      <div className="container-x relative">
        <div className="mx-auto max-w-4xl text-center">
          <Headline
            inline={
              <span
                className={`mx-1.5 inline-block h-[1.05em] w-[1.95em] translate-y-[0.1em] rounded-xl align-middle ${FIELD}`}
              />
            }
          />
        </div>
        <div
          className={`mt-12 grid place-items-center rounded-[2rem] px-5 py-12 lg:px-10 ${FIELD}`}
        >
          <Cards items={items} note={note} />
        </div>
      </div>
    );
  }

  return (
    // The stage sticks for the length of this wrapper: that scroll distance is
    // the whole animation, so it is stated here rather than hidden in a pin.
    <div ref={wrap} className="relative h-[260vh] lg:h-[300vh]">
      <div
        ref={stage}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
      >
        {/* The headline. It clears out as the card passes through it. */}
        <motion.div
          ref={head}
          style={{ opacity: headline, y: headlineY }}
          className="container-x relative z-10 text-center"
        >
          <div className="mx-auto max-w-4xl">
            <Headline
              inline={
                // A placeholder that only reserves the space: the card itself is
                // absolutely positioned so growing it never reflows the text.
                <span
                  ref={slot}
                  aria-hidden="true"
                  className="mx-1.5 inline-block h-[1.05em] w-[1.95em] translate-y-[0.1em] align-middle"
                />
              }
            />
          </div>
        </motion.div>

        {/* The card. One transform: translate to the centre, scale to fill. */}
        <motion.div
          aria-hidden="true"
          style={{
            left: geo.left,
            top: geo.top,
            width: geo.w || undefined,
            height: geo.h || undefined,
            x,
            y,
            scale,
            borderRadius: radius,
            willChange: "transform",
          }}
          className={`absolute z-0 origin-center shadow-[0_20px_60px_-20px_rgba(0,212,255,0.55)] ${FIELD}`}
        >
          <span className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_20%,rgba(255,255,255,0.35),transparent_60%)]" />

          <motion.span
            style={{ opacity: detail, scale: detailScale }}
            className="absolute inset-0 flex origin-center flex-col justify-center gap-[8%] px-[16%]"
          >
            <span className="h-[9%] w-[72%] rounded-full bg-white/75" />
            <span className="h-[9%] w-[44%] rounded-full bg-white/50" />
            <span className="h-[9%] w-[58%] rounded-full bg-white/35" />
          </motion.span>
        </motion.div>

        {/* The cards, once the field is the whole screen. */}
        <motion.div
          style={{ opacity: revealOpacity, y: revealY, paddingTop: chrome + 32 }}
          // `fit < 1` means the panel was scaled to fill the room exactly, so
          // it is aligned to the top of it: grid centring works off the panel's
          // unscaled height and would lift the whole thing under the rail.
          className={`absolute inset-0 z-10 grid justify-items-center pb-6 sm:pb-10 ${
            fit < 1 ? "items-start" : "items-center"
          } ${revealed ? "" : "pointer-events-none"}`}
          aria-hidden={!revealed}
        >
          <div
            ref={panel}
            // A top origin to match that alignment: scaling from the centre
            // would carry the bottom of the panel back under the fold.
            style={{ transform: `scale(${fit})`, transformOrigin: "center top" }}
            className="w-full"
          >
            <Cards items={items} note={note} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
