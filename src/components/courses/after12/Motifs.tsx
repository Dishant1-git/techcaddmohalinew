"use client";

import { type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * The route-map vocabulary of the After-12th design.
 *
 * Its signature is scroll-scrubbed drawing: the path does not animate on a
 * timer, it is drawn exactly as far as you have scrolled, so moving the wheel
 * back un-draws it. That direct coupling is what makes the page feel like a
 * journey you are travelling rather than a page you are watching.
 */

/* -------------------------------------------------------------------------- *
 *                                Journey path                                 *
 * -------------------------------------------------------------------------- */

/**
 * A serpentine route drawn down the page as `target` scrolls through.
 *
 * `stops` is how many milestone dots to place; they are positioned along the
 * same curve and light up once the drawn head passes them.
 */
export function JourneyPath({
  target,
  stops = 4,
  className = "",
}: {
  target: RefObject<HTMLElement | null>;
  stops?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 0.75", "end 0.35"],
  });

  // Springing the progress keeps the head from jittering on a trackpad.
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  // A curve that weaves left and right down a 200×1000 column.
  const d =
    "M100 0 C 20 120, 180 200, 100 320 S 20 500, 100 620 S 180 800, 100 1000";

  return (
    <svg
      viewBox="0 0 200 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="jp-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd23f" />
          <stop offset="50%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#2f7dff" />
        </linearGradient>
      </defs>

      {/* The column is tall and narrow, so the viewBox is stretched to fill it
          (`preserveAspectRatio="none"`). Without a non-scaling stroke that
          squashes every line and turns the round milestone caps into ovals. */}

      {/* The unwalked route */}
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* The walked route, drawn to the scroll position */}
      <motion.path
        d={d}
        fill="none"
        stroke="url(#jp-stroke)"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={reduce ? { pathLength: 1 } : { pathLength: drawn }}
      />

      {/* Milestone dots, evenly spaced down the column */}
      {Array.from({ length: stops }, (_, i) => {
        const at = (i + 0.5) / stops;
        return <Stop key={i} progress={drawn} at={at} d={d} reduce={!!reduce} />;
      })}
    </svg>
  );
}

/** One milestone on the route: dim until the drawn head reaches it. */
function Stop({
  progress,
  at,
  d,
  reduce,
}: {
  progress: ReturnType<typeof useSpring>;
  at: number;
  d: string;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, [at - 0.06, at], [0.25, 1]);
  const scale = useTransform(progress, [at - 0.06, at], [0.6, 1]);

  return (
    <motion.g style={reduce ? undefined : { opacity, scale }} className="origin-center">
      {/* offset-path is not available on SVG elements, so the dot is placed by
          re-walking the same curve with a zero-length dash at `at`. */}
      <path
        d={d}
        fill="none"
        stroke="#ffd23f"
        strokeWidth="14"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray="0.001 1"
        strokeDashoffset={-at}
      />
      <path
        d={d}
        fill="none"
        stroke="#060e2b"
        strokeWidth="6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray="0.001 1"
        strokeDashoffset={-at}
      />
    </motion.g>
  );
}

/* -------------------------------------------------------------------------- *
 *                               Gradient mesh                                 *
 * -------------------------------------------------------------------------- */

/** Slow-drifting colour field behind the dark sections. */
export function GradientMesh({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="glow-blob left-[8%] top-[-8%] h-[30rem] w-[30rem] bg-accent-yellow/20"
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-blob right-[4%] top-[20%] h-[28rem] w-[28rem] bg-accent-glow/20"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-blob bottom-[-10%] left-[35%] h-[26rem] w-[26rem] bg-hero-glow/25"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 29, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- *
 *                              Milestone badge                                *
 * -------------------------------------------------------------------------- */

/** The big gradient step numeral used to head each milestone. */
export function StepBadge({ n, label }: { n: number; label?: string }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent-yellow to-accent-glow font-display text-lg font-extrabold text-hero-950 shadow-[0_0_30px_-6px_rgba(0,212,255,0.7)]">
        {String(n).padStart(2, "0")}
      </span>
      {label && (
        <span className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-up-soft/70">
          {label}
        </span>
      )}
    </span>
  );
}
