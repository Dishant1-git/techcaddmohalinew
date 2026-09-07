"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Course } from "@/lib/courses";
import { categoryArt } from "@/lib/coursePage";
import { courseMarks } from "@/lib/techMarks";
import Icon from "@/components/ui/Icon";
import TechMark from "@/components/ui/TechMark";

/**
 * The course rendered as a circuit board.
 *
 * Same visual language as the home page's <HeroCircuit/> — hexagon nodes,
 * 45° elbow traces, a travelling light on the `.circuit-pulse` keyframes — so
 * the course page reads as part of the same site rather than a separate style.
 *
 * The diagram is not decoration: the hub is the qualification, the four
 * satellites are this course's first four curriculum modules, and the pulses
 * run from the modules into the hub. Where the course teaches tools we have
 * brand marks for, they orbit the hub; the five courses that match none (CAD,
 * cyber, marketing) simply render without the ring.
 *
 * Authored in a 400×400 square and mounted in a square container, so the HTML
 * overlays can be positioned with percentages that map straight onto viewBox
 * coordinates — the frame around it is 4:5 or 5:4 depending on breakpoint, and
 * a square layer keeps one coordinate system across both.
 */

/** Pointy-top regular hexagon: `w` is flat-to-flat, height is point-to-point. */
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

const HUB = { x: 200, y: 200, w: 124 };
const NODE_W = 68;

/** The four module nodes, and where their label sits. */
const NODES = [
  { x: 86, y: 96 },
  { x: 314, y: 96 },
  { x: 86, y: 304 },
  { x: 314, y: 304 },
];

/**
 * Traces run straight, then take a 45° elbow into the hub's left or right
 * face — the way a board is actually routed. `pulse` is the cycle length in
 * seconds for the traces that carry a travelling light.
 */
const TRACES: { d: string; pulse?: number }[] = [
  { d: "M86 135 V160 L112 186 H138", pulse: 3.2 },
  { d: "M314 135 V160 L288 186 H262", pulse: 3.8 },
  { d: "M86 265 V240 L112 214 H138", pulse: 4.3 },
  { d: "M314 265 V240 L288 214 H262", pulse: 2.9 },

  // Rails linking the nodes over and under the hub.
  { d: "M86 57 V30 H314 V57" },
  { d: "M86 343 V370 H314 V343" },
  { d: "M52 96 H86" },
  { d: "M348 96 H314" },
  { d: "M52 304 H86" },
  { d: "M348 304 H314" },
];

/** Solder pads where the traces meet the hub. */
const PADS = [
  { x: 138, y: 186 },
  { x: 138, y: 214 },
  { x: 262, y: 186 },
  { x: 262, y: 214 },
];

const TRACE = "rgba(0,212,255,0.22)";
const PULSE = "#00d4ff";

export default function CourseCircuit({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const art = categoryArt(course);
  const marks = courseMarks(course, 6);
  const modules = course.modules.slice(0, 4);
  // Roughly the rendered width of the label at 14/800 with 2.2 tracking, plus
  // padding — SVG cannot measure text at render, and the plate is centred, so
  // an estimate a little wide is harmless.
  const durationPlate = course.duration.length * 10.4 + 34;

  return (
    <div className="absolute inset-0 grid place-items-center">
      {/* Square stage, sized off whichever edge is shorter so it fits without
          cropping: the frame is 5:4 on mobile (height-limited) and 4:5 from lg
          up (width-limited). */}
      <div className="relative aspect-square h-[88%] w-auto lg:h-auto lg:w-[88%]">
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id="cc-hub-glow">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.42" />
              <stop offset="55%" stopColor="#2f7dff" stopOpacity="0.13" />
              <stop offset="100%" stopColor="#2f7dff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cc-hub-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#123285" />
              <stop offset="100%" stopColor="#060e2b" />
            </linearGradient>
            <linearGradient id="cc-node-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b1a4d" />
              <stop offset="100%" stopColor="#060e2b" />
            </linearGradient>
          </defs>

          <circle cx={HUB.x} cy={HUB.y} r="150" fill="url(#cc-hub-glow)" />

          {/* Static traces */}
          <g fill="none" stroke={TRACE} strokeWidth="1.1">
            {TRACES.map((t) => (
              <path key={t.d} d={t.d} />
            ))}
          </g>

          {/* Travelling light: a soft halo under a bright core, both on the same
              dash cycle. Two thin strokes cost far less than an SVG blur filter
              re-running every animated frame. */}
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
                  style={{ animationDuration: `${t.pulse}s`, animationDelay: `${i * -0.7}s` }}
                />
                <path
                  d={t.d}
                  pathLength={1}
                  stroke={PULSE}
                  strokeWidth="1.6"
                  className="circuit-pulse"
                  style={{ animationDuration: `${t.pulse}s`, animationDelay: `${i * -0.7}s` }}
                />
              </g>
            ))}
          </g>

          <g fill={PULSE} fillOpacity="0.55">
            {PADS.map((p) => (
              <rect key={`${p.x}-${p.y}`} x={p.x - 2.5} y={p.y - 2.5} width="5" height="5" rx="1" />
            ))}
          </g>

          {/* Module nodes */}
          <g strokeLinejoin="round">
            {NODES.map((n, i) => (
              <g key={i}>
                <path
                  d={hexPath(n.x, n.y, NODE_W)}
                  fill="url(#cc-node-fill)"
                  stroke="rgba(0,212,255,0.35)"
                  strokeWidth="1.4"
                />
                <text
                  x={n.x}
                  y={n.y + 7}
                  textAnchor="middle"
                  className="fill-white font-display"
                  fontSize="20"
                  fontWeight="800"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            ))}
          </g>

          {/* Hub: a slowly rotating dotted ring, then the badge itself */}
          <motion.path
            d={hexPath(HUB.x, HUB.y, HUB.w + 30)}
            fill="none"
            stroke="rgba(0,212,255,0.4)"
            strokeWidth="1.2"
            strokeDasharray="2 6"
            strokeLinejoin="round"
            style={{ transformOrigin: "200px 200px" }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          />
          <path
            d={hexPath(HUB.x, HUB.y, HUB.w)}
            fill="url(#cc-hub-fill)"
            stroke="#00d4ff"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Nested <svg>: Icon spreads props last, so x/y/width/height win over
              its own defaults and it positions in viewBox coordinates. At 104
              square, even an icon whose art runs edge to edge stays inside the
              hexagon's tapered corners, and it is centred on the hub rather
              than sharing the space with the label. */}
          <Icon
            name={art.icon}
            x={148}
            y={148}
            width={104}
            height={104}
            strokeWidth={1}
            className="text-accent-glow"
          />

          {/* The duration sits below the hub, clear of the rotating ring: inside
              the hexagon it ran wider than the taper allows at that height. The
              plate is sized off the string so it stays centred on any duration. */}
          <g>
            <rect
              x={200 - durationPlate / 2}
              y={294}
              width={durationPlate}
              height={26}
              rx={13}
              fill="#060e2b"
              stroke="rgba(0,212,255,0.4)"
              strokeWidth="1.2"
            />
            <text
              x={200}
              y={312}
              textAnchor="middle"
              className="fill-white"
              fontSize="14"
              fontWeight="800"
              letterSpacing="2.2"
            >
              {course.duration.toUpperCase()}
            </text>
          </g>
        </svg>

        {/* ---- Module labels ------------------------------------------------ */}
        {modules.map((m, i) => {
          const n = NODES[i];
          if (!n) return null;
          const below = n.y < 200;
          return (
            <motion.span
              key={m.title}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="pointer-events-none absolute w-[26%] -translate-x-1/2 text-center text-[0.58rem] font-semibold uppercase leading-tight tracking-wider text-up-soft/70"
              style={{
                left: `${(n.x / 400) * 100}%`,
                top: `${((n.y + (below ? -62 : 52)) / 400) * 100}%`,
              }}
            >
              {m.title}
            </motion.span>
          );
        })}

        {/* ---- Orbiting brand marks ----------------------------------------- */}
        {marks.length >= 3 && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
          >
            {marks.map((mark, i) => {
              const angle = (i / marks.length) * Math.PI * 2 - Math.PI / 2;
              const r = 34; // percent of the stage, from its centre
              return (
                <motion.span
                  key={mark}
                  /* Sized as a share of the stage rather than in px, so the
                     marks keep the same weight on the board at every
                     breakpoint — the square stage shrinks with the frame. */
                  className="absolute grid h-[14.5%] w-[14.5%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/20 bg-hero-950/85 shadow-lg backdrop-blur-sm"
                  style={{
                    left: `${50 + Math.cos(angle) * r}%`,
                    top: `${50 + Math.sin(angle) * r}%`,
                  }}
                  /* Counter-rotation, so the logos stay upright while the ring turns. */
                  animate={reduce ? undefined : { rotate: -360 }}
                  transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
                >
                  <TechMark name={mark} size={24} className="h-[60%] w-[60%]" />
                </motion.span>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
