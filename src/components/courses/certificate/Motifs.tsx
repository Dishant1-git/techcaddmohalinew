"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * The engraving vocabulary of the certificate design.
 *
 * Everything here is generated rather than drawn by hand, so the pattern is
 * exact and costs no asset request: guilloché rosettes are a polar curve, and
 * the seal's legend is real text on a circular path so it stays selectable and
 * scales without blurring.
 */

/* -------------------------------------------------------------------------- *
 *                                  Guilloché                                  *
 * -------------------------------------------------------------------------- */

/**
 * One rosette of an engine-turned pattern: r(θ) = R + a·cos(kθ), sampled into
 * a polyline. `k` sets the number of petals, `a` how deep they cut.
 */
function rosette(R: number, a: number, k: number, phase = 0, steps = 400) {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = R + a * Math.cos(k * t + phase);
    pts.push(`${(200 + r * Math.cos(t)).toFixed(1)},${(200 + r * Math.sin(t)).toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}

const LAYERS = [
  { R: 150, a: 26, k: 18, phase: 0, opacity: 0.5 },
  { R: 150, a: 26, k: 18, phase: Math.PI / 18, opacity: 0.32 },
  { R: 116, a: 20, k: 24, phase: 0, opacity: 0.42 },
  { R: 84, a: 14, k: 12, phase: Math.PI / 12, opacity: 0.5 },
];

/**
 * Sampled once at module load, not per render — these are a few hundred
 * trigonometric points each, and the curve never changes.
 */
const LAYER_PATHS = LAYERS.map((l, i) => ({
  id: `guilloche-layer-${i}`,
  d: rosette(l.R, l.a, l.k, l.phase),
  opacity: l.opacity,
}));

/**
 * Emits the rosette geometry once for the whole document.
 *
 * **A page using <Guilloche/> must render this exactly once**, or the pattern
 * comes out blank. The certificate design shows the watermark in five places,
 * and inlining the path data each time cost ~264KB of markup — over half the
 * page. Defining it once and referencing it with <use> costs it once.
 */
export function GuillocheDefs() {
  return (
    <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden" focusable="false">
      <defs>
        {LAYER_PATHS.map((l) => (
          <path key={l.id} id={l.id} d={l.d} />
        ))}
      </defs>
    </svg>
  );
}

/**
 * The engraved watermark. Counter-rotating rings make the interference pattern
 * shift as it turns, which is what sells it as engraving rather than a static
 * flourish. Requires <GuillocheDefs/> somewhere on the page.
 */
export function Guilloche({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        {LAYER_PATHS.map((l, i) => (
          <motion.g
            key={l.id}
            style={{ transformOrigin: "200px 200px" }}
            animate={reduce ? undefined : { rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 150 + i * 40, repeat: Infinity, ease: "linear" }}
          >
            <use href={`#${l.id}`} strokeOpacity={l.opacity} />
          </motion.g>
        ))}
        <circle cx="200" cy="200" r="168" strokeOpacity="0.35" />
        <circle cx="200" cy="200" r="172" strokeOpacity="0.2" strokeDasharray="1 5" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- *
 *                                    Seal                                     *
 * -------------------------------------------------------------------------- */

/**
 * The embossed seal. Stamps down on first view — a quick overshoot and settle,
 * the way a real stamp lands — then the legend rotates slowly and forever.
 */
export function Seal({
  label = "ISO CERTIFIED",
  sub = "TECHCADD MOHALI",
  size = 132,
}: {
  label?: string;
  sub?: string;
  size?: number;
}) {
  const reduce = useReducedMotion();
  const legend = `${label} · ${sub} · `.repeat(2);

  // The certificate page renders this seal three times — on the hero document,
  // in the particulars panel and on the submitted form. SVG ids are
  // document-global, so without a unique suffix every `textPath` on the page
  // would resolve to the first seal's arc and the gradients would collide.
  const uid = useId().replace(/:/g, "");
  const legendId = `seal-legend-${uid}`;
  const embossId = `seal-emboss-${uid}`;

  return (
    <motion.div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      initial={reduce ? false : { scale: 1.7, opacity: 0, rotate: -14 }}
      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 190, damping: 13, delay: 0.35 }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <path
            id={legendId}
            fill="none"
            d="M100 100 m -74 0 a 74 74 0 1 1 148 0 a 74 74 0 1 1 -148 0"
          />
          <radialGradient id={embossId}>
            <stop offset="60%" stopColor="#ffd23f" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffd23f" stopOpacity="0.35" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="92" fill={`url(#${embossId})`} />
        <circle cx="100" cy="100" r="88" fill="none" stroke="#0b1a4d" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="82" fill="none" stroke="#0b1a4d" strokeWidth="0.8" />
        <circle
          cx="100"
          cy="100"
          r="58"
          fill="none"
          stroke="#0b1a4d"
          strokeWidth="0.8"
          strokeDasharray="1 4"
        />

        {/* Rotating legend around the rim */}
        <motion.g
          style={{ transformOrigin: "100px 100px" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
        >
          <text className="fill-up-ink" fontSize="11.5" fontWeight="700" letterSpacing="2.4">
            <textPath href={`#${legendId}`} startOffset="0%">
              {legend}
            </textPath>
          </text>
        </motion.g>

        {/* Centre mark */}
        <g className="fill-up-ink">
          <text x="100" y="94" textAnchor="middle" fontSize="30" fontWeight="800" letterSpacing="-0.5">
            ISO
          </text>
          <text x="100" y="116" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="3">
            9001
          </text>
        </g>
        <path
          d="M78 130 h44"
          stroke="#0b1a4d"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- *
 *                                  Signature                                  *
 * -------------------------------------------------------------------------- */

/** A signature that writes itself in when the certificate scrolls into view. */
export function Signature({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 220 60" aria-hidden="true" className={className}>
      <motion.path
        d="M6 44 C 26 10, 38 8, 42 26 S 40 52, 52 50 S 66 22, 74 26 S 76 46, 88 44 C 104 41, 108 16, 122 18 C 134 20, 128 44, 142 44 C 158 44, 160 18, 176 20 C 188 21, 186 40, 214 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.5 }}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- *
 *                              Security border                                *
 * -------------------------------------------------------------------------- */

/** The fine repeating border that runs inside the certificate's edge. */
export function SecurityBorder({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <rect
        x="1.4"
        y="1.4"
        width="97.2"
        height="97.2"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="0.35"
      />
      <rect
        x="2.6"
        y="2.6"
        width="94.8"
        height="94.8"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="0.18"
        strokeDasharray="0.6 0.9"
      />
    </svg>
  );
}
