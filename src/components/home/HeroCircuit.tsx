import Icon from "@/components/ui/Icon";
import TechMark from "@/components/ui/TechMark";

/* -------------------------------------------------------------------------- *
 * The scene is authored in a 1000×300 viewBox and the wrapper is locked to the
 * same 10:3 aspect ratio. That does two things: SVG shapes never distort, and
 * HTML overlays can be placed with plain percentages that map straight onto
 * viewBox coordinates (`x/10 %` across, `y/3 %` down).
 * -------------------------------------------------------------------------- */

const at = (x: number, y: number) => ({ left: `${x / 10}%`, top: `${y / 3}%` });

/** Pointy-top regular hexagon: width is flat-to-flat, height is point-to-point. */
function hexPath(cx: number, cy: number, w: number) {
  const rx = w / 2;
  const ry = w / Math.sqrt(3);
  return [
    `M${cx} ${cy - ry}`,
    `L${cx + rx} ${cy - ry / 2}`,
    `L${cx + rx} ${cy + ry / 2}`,
    `L${cx} ${cy + ry}`,
    `L${cx - rx} ${cy + ry / 2}`,
    `L${cx - rx} ${cy - ry / 2}`,
    "Z",
  ].join(" ");
}

const HUB = { x: 500, y: 150, w: 112 };

const NODES = [
  { mark: "python", x: 292, y: 60 },
  { mark: "tensorflow", x: 708, y: 60 },
  { mark: "react", x: 330, y: 240 },
  { mark: "docker", x: 670, y: 240 },
];
const NODE_W = 64;

/**
 * Traces run horizontally then take a 45° elbow, the way a board is actually
 * routed. `pulse` marks the ones that carry a travelling light.
 */
const TRACES: { d: string; pulse?: number }[] = [
  // Left card → hub. The bundle spans y 110–190 so it stays inside the card's
  // own height, and fans into the hub's left face between y 134 and 166.
  { d: "M244 110 H356 L380 134 H444", pulse: 3.8 },
  { d: "M244 130 H380 L392 142 H444" },
  { d: "M244 150 H444", pulse: 2.9 },
  { d: "M244 170 H380 L392 158 H444" },
  { d: "M244 190 H356 L380 166 H444", pulse: 4.4 },

  // Right card → hub
  { d: "M756 110 H644 L620 134 H556", pulse: 4.1 },
  { d: "M756 130 H620 L608 142 H556" },
  { d: "M756 150 H556", pulse: 3.2 },
  { d: "M756 170 H620 L608 158 H556" },
  { d: "M756 190 H644 L620 166 H556", pulse: 3.6 },

  // Outer nodes → hub, offset off the centre line so they read as their own
  // runs rather than merging into the card bus.
  { d: "M292 97 V123 L315 146 H444", pulse: 2.6 },
  { d: "M708 97 V123 L685 146 H556", pulse: 3.4 },
  { d: "M330 203 V177 L353 154 H444", pulse: 3.0 },
  { d: "M670 203 V177 L647 154 H556", pulse: 4.0 },

  // Rails linking the outer nodes over and under the hub
  { d: "M292 23 V10 H708 V23" },
  { d: "M330 277 V290 H670 V277" },
];

/** Little square solder pads where traces meet the cards. */
const PADS = [110, 130, 150, 170, 190].flatMap((y) => [
  { x: 244, y },
  { x: 756, y },
]);

const TRACE = "rgba(0,212,255,0.20)";
const PULSE = "#00d4ff";

/* --------------------------------- cards ---------------------------------- */

const DEMAND = [
  { value: "128", label: "AI & Data", delta: "2.92", bar: "solid-cyan" },
  { value: "96", label: "Full Stack", delta: "1.38", bar: "solid-blue" },
  { value: "74", label: "Cyber", delta: "2.56", bar: "stripes" },
];

/** Monthly placements, already mapped into the chart's 160×60 viewBox. */
const CHART = "M0 46 C 14 45, 22 42, 34 40 S 54 37, 66 33 S 86 24, 98 22 S 118 27, 130 25 S 150 13, 160 9";

function CardShell({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl ${className ?? ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[0.82rem] font-semibold text-white">{title}</p>
        <Icon name="arrowUpRight" size={13} className="mt-0.5 shrink-0 text-up-soft/50" />
      </div>
      {children}
    </div>
  );
}

function Delta({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 font-semibold text-accent-glow">
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
        <path d="M12 4 20 16H4Z" />
      </svg>
      {value}%
    </span>
  );
}

function DemandCard() {
  return (
    <CardShell title="Course demand">
      <p className="mt-0.5 text-[0.68rem] text-up-soft/55">
        Enrolments are up <Delta value="2.39" />
      </p>

      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
        {DEMAND.map((d) => (
          <div key={d.label}>
            <p className="text-[0.82rem] font-bold text-white">{d.value}</p>
            <p className="mt-0.5 truncate text-[0.58rem] text-up-soft/50">{d.label}</p>

            <div className="mt-2 h-7 overflow-hidden rounded-[0.3rem]">
              {d.bar === "solid-cyan" && (
                <div className="h-full w-full bg-gradient-to-b from-accent-glow to-accent-500" />
              )}
              {d.bar === "solid-blue" && (
                <div className="h-full w-full bg-gradient-to-b from-hero-glow to-hero-600" />
              )}
              {d.bar === "stripes" && (
                <div className="flex h-full items-end gap-[1.5px]">
                  {[40, 62, 48, 78, 55, 88, 68, 96, 74, 100].map((hgt, i) => (
                    <span
                      key={i}
                      style={{ height: `${hgt}%` }}
                      className="flex-1 rounded-[1px] bg-up-soft/60"
                    />
                  ))}
                </div>
              )}
            </div>

            <p className="mt-1.5 text-[0.58rem]">
              <Delta value={d.delta} />
            </p>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function PlacementsCard() {
  return (
    <CardShell title="Students placed">
      <p className="mt-1 flex items-baseline gap-1.5">
        <span className="font-display text-[1.15rem] font-extrabold text-white">1,240</span>
        <span className="text-[0.62rem]">
          <Delta value="8.6" />
        </span>
      </p>

      <div className="mt-2.5 flex gap-2">
        <div className="flex flex-col justify-between py-0.5 text-[0.5rem] text-up-soft/40">
          {["400", "300", "200", "100"].map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>

        <div className="relative flex-1">
          <svg viewBox="0 0 160 60" className="h-[3.6rem] w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="placedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${CHART} L160 60 L0 60 Z`} fill="url(#placedFill)" />
            <path
              d={CHART}
              fill="none"
              stroke="#00d4ff"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
            />
          </svg>

          {/* Highlighted month — 130/160 across, 25/60 down on the chart */}
          <span className="absolute left-[81.25%] top-[41.6%] block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_3px_rgba(0,212,255,0.35),0_0_14px_4px_rgba(0,212,255,0.55)]" />
          <span className="absolute left-[81.25%] top-[41.6%] -translate-x-1/2 -translate-y-[190%] whitespace-nowrap rounded-md bg-white px-1.5 py-0.5 text-[0.55rem] font-bold text-hero-950 shadow-lg">
            312
          </span>
        </div>
      </div>

      <div className="mt-1.5 flex justify-between pl-6 text-[0.5rem] text-up-soft/40">
        {["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </CardShell>
  );
}

/* ---------------------------------- hub ----------------------------------- */

function HubGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m7 8-4 4 4 4M17 8l4 4-4 4M14 5l-4 14" />
    </svg>
  );
}

/* --------------------------------- scene ---------------------------------- */

export default function HeroCircuit() {
  return (
    <div className="hero-circuit relative w-full">
      {/* ----------------------------- Full diagram ---------------------------- */}
      <div className="relative mx-auto hidden aspect-[10/3] w-full max-w-[86rem] lg:block">
        <svg
          viewBox="0 0 1000 300"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="hubGlow">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#2f7dff" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#2f7dff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hubFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#123285" />
              <stop offset="100%" stopColor="#060e2b" />
            </linearGradient>
            <linearGradient id="nodeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b1a4d" />
              <stop offset="100%" stopColor="#060e2b" />
            </linearGradient>
          </defs>

          <circle cx={HUB.x} cy={HUB.y} r="150" fill="url(#hubGlow)" />

          {/* Static traces */}
          <g fill="none" stroke={TRACE} strokeWidth="1.1">
            {TRACES.map((t) => (
              <path key={t.d} d={t.d} />
            ))}
          </g>

          {/* Travelling light: a soft halo under a bright core, both on the same
              dash cycle. Two thin strokes cost far less than an SVG blur filter
              re-running on every animated frame. */}
          <g fill="none" strokeLinecap="round">
            {TRACES.filter((t) => t.pulse).map((t, i) => (
              <g key={t.d}>
                <path
                  d={t.d}
                  pathLength={1}
                  stroke={PULSE}
                  strokeOpacity="0.22"
                  strokeWidth="5"
                  className="circuit-pulse"
                  style={{ animationDuration: `${t.pulse}s`, animationDelay: `${i * -0.55}s` }}
                />
                <path
                  d={t.d}
                  pathLength={1}
                  stroke={PULSE}
                  strokeWidth="1.6"
                  className="circuit-pulse"
                  style={{ animationDuration: `${t.pulse}s`, animationDelay: `${i * -0.55}s` }}
                />
              </g>
            ))}
          </g>

          {/* Solder pads */}
          <g fill="#00d4ff" fillOpacity="0.5">
            {PADS.map((p) => (
              <rect key={`${p.x}-${p.y}`} x={p.x - 2.5} y={p.y - 2.5} width="5" height="5" rx="1" />
            ))}
          </g>

          {/* Outer nodes */}
          <g strokeLinejoin="round">
            {NODES.map((n) => (
              <path
                key={n.mark}
                d={hexPath(n.x, n.y, NODE_W)}
                fill="url(#nodeFill)"
                stroke="rgba(0,212,255,0.35)"
                strokeWidth="1.4"
              />
            ))}
          </g>

          {/* Hub: dotted ring, then the badge itself */}
          <path
            d={hexPath(HUB.x, HUB.y, HUB.w + 26)}
            fill="none"
            stroke="rgba(0,212,255,0.4)"
            strokeWidth="1.2"
            strokeDasharray="2 5"
            strokeLinejoin="round"
          />
          <path
            d={hexPath(HUB.x, HUB.y, HUB.w)}
            fill="url(#hubFill)"
            stroke="#00d4ff"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>

        {/* Logos sit on top of their hexagons as real elements, so they keep the
            brand colours instead of being inlined into the scene SVG. */}
        {NODES.map((n) => (
          <span
            key={n.mark}
            style={at(n.x, n.y)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <TechMark name={n.mark} size={26} />
          </span>
        ))}

        <span
          style={at(HUB.x, HUB.y)}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
        >
          <HubGlyph />
          <span className="font-display text-[0.8rem] font-extrabold tracking-tight text-white">
            techcadd
          </span>
        </span>

        <div className="absolute left-[2%] top-[30%] w-[22%]">
          <DemandCard />
        </div>
        <div className="absolute right-[2%] top-[30%] w-[22%]">
          <PlacementsCard />
        </div>
      </div>

      {/* --------------------- Compact stack below the diagram -------------------- */}
      <div className="lg:hidden">
        <div className="mb-8 flex items-center justify-center gap-4">
          {NODES.map((n) => (
            <span
              key={n.mark}
              className="grid h-14 w-14 place-items-center border border-white/10 bg-white/[0.06] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]"
            >
              <TechMark name={n.mark} size={24} />
            </span>
          ))}
        </div>
        <div className="mx-auto grid max-w-xl gap-4 sm:grid-cols-2">
          <DemandCard />
          <PlacementsCard />
        </div>
      </div>
    </div>
  );
}
