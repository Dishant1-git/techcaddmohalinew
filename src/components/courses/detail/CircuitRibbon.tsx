"use client";

/**
 * A shallow circuit bus that runs along the bottom edge of the course hero.
 *
 * Pure CSS animation on the shared `.circuit-pulse` keyframes — no JS ticker,
 * and the global `prefers-reduced-motion` rule in `globals.css` already
 * flattens it, so there is nothing to gate here.
 *
 * Authored in a 1440×120 viewBox and stretched with `preserveAspectRatio="none"`:
 * these are straight runs and elbows, so the horizontal scaling reads as a
 * wider board rather than a distorted drawing.
 */

const TRACES: { d: string; pulse?: number }[] = [
  { d: "M0 24 H300 L340 64 H700 L740 24 H1440", pulse: 7.5 },
  { d: "M0 62 H180 L220 22 H620 L660 62 H1440", pulse: 9.0 },
  { d: "M0 96 H420 L470 46 H980 L1030 96 H1440", pulse: 6.4 },
  { d: "M0 118 H1440" },
];

/** Solder pads dotted along the bus. */
const PADS = [180, 340, 470, 660, 740, 1030, 1240];

export default function CircuitRibbon() {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full lg:h-32"
    >
      <defs>
        {/* Fades the board out toward the top, so it emerges from the hero
            rather than sitting on it as a band. */}
        <linearGradient id="ribbon-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="ribbon-mask">
          <rect width="1440" height="120" fill="url(#ribbon-fade)" />
        </mask>
      </defs>

      <g mask="url(#ribbon-mask)">
        <g fill="none" stroke="rgba(0,212,255,0.18)" strokeWidth="1.1">
          {TRACES.map((t) => (
            <path key={t.d} d={t.d} />
          ))}
        </g>

        <g fill="none" strokeLinecap="round">
          {TRACES.filter((t) => t.pulse).map((t, i) => (
            <g key={t.d}>
              <path
                d={t.d}
                pathLength={1}
                stroke="#00d4ff"
                strokeOpacity="0.2"
                strokeWidth="5"
                className="circuit-pulse"
                style={{ animationDuration: `${t.pulse}s`, animationDelay: `${i * -1.9}s` }}
              />
              <path
                d={t.d}
                pathLength={1}
                stroke="#00d4ff"
                strokeWidth="1.5"
                className="circuit-pulse"
                style={{ animationDuration: `${t.pulse}s`, animationDelay: `${i * -1.9}s` }}
              />
            </g>
          ))}
        </g>

        <g fill="#00d4ff" fillOpacity="0.45">
          {PADS.map((x) => (
            <rect key={x} x={x - 2.5} y={115.5} width="5" height="5" rx="1" />
          ))}
        </g>
      </g>
    </svg>
  );
}
