"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { techCategories, orbitRings, type TechItem } from "@/lib/courses";
import TechMark from "@/components/ui/TechMark";

/**
 * Concentric half-rings with the stack riding on them. The rings are a layout
 * shell, not a taxonomy: whatever the category filter leaves on screen is
 * spread across all four, so a category of seven tools fills the board just as
 * evenly as the full set does.
 *
 * Geometry is plain trigonometry rather than a layout engine. The board is 2:1
 * and the centre is its bottom-middle point, so a radius given as a fraction of
 * board height maps to `50 * r` horizontally and `100 * r` vertically in
 * percentages.
 */
const RINGS = 4;

/**
 * Ring radii for a given number of rings in use, always anchored to the same
 * outer edge. Four tools spread over four rings leaves the board looking empty,
 * so a small category collapses onto fewer, wider-spaced rings instead — and
 * the arcs move with them, so what is drawn always matches what is on it.
 */
const RADII_FOR: Record<number, number[]> = {
  1: [0.75],
  2: [0.55, 0.93],
  3: [0.42, 0.68, 0.93],
  4: [0.3, 0.53, 0.74, 0.93],
};

/** Roughly four nodes to a ring before another ring is worth opening. */
const ringCount = (n: number) => Math.min(RINGS, Math.max(1, Math.ceil(n / 4)));

const radiiFor = (n: number) => RADII_FOR[ringCount(n)];

const arcPath = (r: number) =>
  `M ${100 - r * 100} 100 A ${r * 100} ${r * 100} 0 0 1 ${100 + r * 100} 100`;

/**
 * Where each of the four drawn arcs should sit for a given radii set. Arcs are
 * matched to rings from the outside in; any left over collapse inward and fade,
 * rather than unmounting, so they can be tweened between filters.
 */
function arcTargets(radii: number[]) {
  const pad = RINGS - radii.length;
  return Array.from({ length: RINGS }, (_, i) => {
    const idx = i - pad;
    return idx >= 0
      ? { r: radii[idx], opacity: 1 }
      : { r: radii[0] * (0.45 + 0.15 * i), opacity: 0 };
  });
}

/** Nodes travel inside this arc, so none of them straddle the baseline. */
const ARC_START = 18;
const ARC_END = 162;
const SPAN = ARC_END - ARC_START;

/** Seconds for one full lap of the arc, per ring. Direction alternates. */
const PERIOD = [64, 78, 92, 108];

/** Degrees of travel over which a node fades in and out at the arc ends. */
const FADE = 16;

/** How many per category the unfiltered board shows. All of them at once is a
 *  crowd; the first few of each are the ones every track actually starts on. */
const PER_CATEGORY = 5;

type Node = { key: string; item: TechItem; cat: string; label: string };
type Slot = { ring: number; base: number };

/** Round-robin across categories, so the board mixes rather than clusters. */
function interleave(cats: typeof techCategories, perCat: number): Node[] {
  const out: Node[] = [];
  for (let i = 0; i < perCat; i++) {
    for (const cat of cats) {
      const item = cat.items[i];
      if (item)
        out.push({
          key: `${cat.key}:${item.name}`,
          item,
          cat: cat.key,
          label: cat.label,
        });
    }
  }
  return out;
}

/**
 * Split `n` nodes across the rings in proportion to their circumference, by
 * largest remainder — so the counts always add back up to `n` exactly, and
 * every ring ends up at the same spacing.
 */
function share(n: number, radii: number[]) {
  const sum = radii.reduce((a, b) => a + b, 0);
  const raw = radii.map((r) => (r / sum) * n);
  const counts = raw.map(Math.floor);
  const left = n - counts.reduce((a, b) => a + b, 0);
  raw
    .map((v, i) => ({ rem: v - counts[i], i }))
    .sort((a, b) => b.rem - a.rem)
    .slice(0, left)
    .forEach(({ i }) => counts[i]++);
  return counts;
}

function layoutFor(nodes: Node[]) {
  const radii = radiiFor(nodes.length);
  const counts = share(nodes.length, radii);
  const slots = new Map<string, Slot>();
  let at = 0;
  counts.forEach((count, ring) => {
    for (let j = 0; j < count; j++) {
      const node = nodes[at++];
      if (node) slots.set(node.key, { ring, base: j / count });
    }
  });
  return { slots, radii };
}

/** Static placement for SSR and for reduced motion, in percentages. */
function place(slot: Slot | undefined, radii: number[]) {
  if (!slot) return { display: "none" };
  const deg = ARC_START + slot.base * SPAN;
  const rad = (deg * Math.PI) / 180;
  const r = radii[slot.ring];
  return {
    left: `${50 + 50 * r * Math.cos(rad)}%`,
    top: `${100 - 100 * r * Math.sin(rad)}%`,
  };
}

export default function TechOrbit() {
  const root = useRef<HTMLElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  // Read every frame by the ticker, rewritten whenever the filter changes.
  const fade = useRef({ v: 1 });

  // Every node stays mounted; the filter only changes which ones have a slot.
  const all = useMemo(
    () =>
      interleave(
        techCategories,
        Math.max(...techCategories.map((c) => c.items.length)),
      ),
    [],
  );
  const visible = useMemo(
    () =>
      active
        ? all.filter((n) => n.cat === active)
        : interleave(techCategories, PER_CATEGORY),
    [active, all],
  );

  // What the server rendered, and what the ticker starts from.
  const initial = useMemo(
    () => layoutFor(interleave(techCategories, PER_CATEGORY)),
    [],
  );
  const slots = useRef(initial.slots);
  const radii = useRef(initial.radii);
  const mounted = useRef(false);

  /* ---- The rings turn ---------------------------------------------------- */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const boardEl = board.current;
    if (!boardEl) return;

    const ctx = gsap.context(() => {
      const arcs = gsap.utils.toArray<SVGPathElement>(".orbit-arc");
      arcs.forEach((arc) => {
        const len = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.to(arcs, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.12,
        // The dash pattern was measured off the path it drew. Filters re-path
        // these arcs, so it has to go once the draw is done or the new, longer
        // arc would render as a dashed one.
        onComplete: () =>
          gsap.set(arcs, { clearProps: "strokeDasharray,strokeDashoffset" }),
        scrollTrigger: { trigger: boardEl, start: "top 80%", once: true },
      });

      const nodes = Array.from(
        boardEl.querySelectorAll<HTMLElement>("[data-node]"),
      );

      // Positions come from transforms, so the percentage placement the server
      // rendered is handed back to the centre point first.
      gsap.set(nodes, {
        left: "50%",
        top: "100%",
        xPercent: -50,
        yPercent: -50,
        display: "block",
      });

      let height = boardEl.clientHeight;
      const onResize = () => {
        height = boardEl.clientHeight;
      };
      window.addEventListener("resize", onResize);

      // Hovering parks the board so a logo can be read or clicked.
      let paused = false;
      const enter = () => (paused = true);
      const leave = () => (paused = false);
      boardEl.addEventListener("pointerenter", enter);
      boardEl.addEventListener("pointerleave", leave);

      // Off-screen the board costs nothing: the clock stops with it, so it
      // resumes where it left off rather than jumping when scrolled back to.
      let onScreen = true;
      ScrollTrigger.create({
        trigger: boardEl,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (onScreen = self.isActive),
      });

      // One ticker writes every position: the whole board is a single transform
      // pass per frame, however many nodes are riding on it. A node running off
      // one end of the arc reappears at the other, fading across the last few
      // degrees so the wrap is never a pop.
      let clock = 0;
      const update = (_t: number, delta: number) => {
        if (!onScreen) return;
        if (!paused) clock += delta / 1000;

        for (const el of nodes) {
          const slot = slots.current.get(el.dataset.node ?? "");
          if (!slot) {
            gsap.set(el, { opacity: 0, pointerEvents: "none" });
            continue;
          }

          const radius = radii.current[slot.ring] * height;
          const dir = slot.ring % 2 ? -1 : 1;
          const lap = (clock / PERIOD[slot.ring]) * dir;
          const t = (((slot.base + lap) % 1) + 1) % 1;
          const deg = ARC_START + t * SPAN;
          const rad = (deg * Math.PI) / 180;
          const edge = Math.min(deg - ARC_START, ARC_END - deg);

          gsap.set(el, {
            x: radius * Math.cos(rad),
            y: -radius * Math.sin(rad),
            opacity: gsap.utils.clamp(0, 1, edge / FADE) * fade.current.v,
            pointerEvents: "auto",
          });
        }
      };

      gsap.ticker.add(update);

      return () => {
        gsap.ticker.remove(update);
        window.removeEventListener("resize", onResize);
        boardEl.removeEventListener("pointerenter", enter);
        boardEl.removeEventListener("pointerleave", leave);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  /* ---- Filtering rebuilds the layout behind a cross-fade ------------------ */
  useEffect(() => {
    const next = layoutFor(visible);

    // The first pass is already on screen from the server; only a real filter
    // change is worth a cross-fade.
    if (!mounted.current || prefersReducedMotion()) {
      mounted.current = true;
      slots.current = next.slots;
      radii.current = next.radii;
      return;
    }

    // Swapped at the trough, so nodes that survive the filter are never seen
    // teleporting from their old ring to their new one. The arcs travel to
    // their new radii across the same beat, so rings and nodes stay together.
    const dimmer = fade.current;
    const arcs = gsap.utils.toArray<SVGPathElement>(".orbit-arc");
    const targets = arcTargets(next.radii);

    const tl = gsap
      .timeline()
      .to(dimmer, { v: 0, duration: 0.22, ease: "power2.in" })
      .add(() => {
        slots.current = next.slots;
        radii.current = next.radii;
      })
      .to(dimmer, { v: 1, duration: 0.4, ease: "power2.out" });

    arcs.forEach((arc) => {
      // Paths are painted outermost first, so DOM order is the reverse of the
      // ring order — each arc carries its own index rather than relying on it.
      const target = targets[Number(arc.dataset.arc)];
      if (!target) return;
      gsap.to(arc, {
        attr: { d: arcPath(target.r) },
        opacity: target.opacity,
        duration: 0.55,
        ease: "power2.inOut",
      });
    });

    return () => {
      tl.kill();
      dimmer.v = 1;
    };
  }, [visible]);

  const count = visible.length;
  const activeLabel = techCategories.find((c) => c.key === active)?.label;

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-hero-950 py-20 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,#123285_0%,transparent_70%)] opacity-60" />

      <div className="container-x relative text-center">
        <p
          data-anim="fade"
          className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent-yellow"
        >
          The stack you will actually touch
        </p>
        <h2
          data-anim="words"
          className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl"
        >
          100+ technologies taught across our tracks
        </h2>

        {/* Categories double as the legend: pick one and the board keeps only
            that category's software. */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-pressed={active === null}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              active === null
                ? "border-white bg-white text-hero-950"
                : "border-white/15 text-up-soft/80 hover:border-white/40 hover:text-white"
            }`}
          >
            All
          </button>
          {techCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(active === cat.key ? null : cat.key)}
              aria-pressed={active === cat.key}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active === cat.key
                  ? "border-white bg-white text-hero-950"
                  : "border-white/15 text-up-soft/80 hover:border-white/40 hover:text-white"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${cat.dot}`} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ---- The board, from lg up. Narrower than that, the inner ring is
             too short for its nodes to clear each other. ------------------ */}
      <div className="container-x relative mt-12 hidden lg:block">
        <div
          ref={board}
          className="relative mx-auto aspect-[2/1] w-full max-w-5xl"
        >
          <svg
            viewBox="0 0 200 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            {/* Four arcs, always mounted: filters tween their radius rather
                than adding and removing paths. Painted outermost first so the
                inner tints stack up. */}
            {arcTargets(initial.radii)
              .map((target, i) => ({ target, i }))
              .reverse()
              .map(({ target, i }) => (
                <path
                  key={i}
                  data-arc={i}
                  className="orbit-arc"
                  d={arcPath(target.r)}
                  fill="rgba(255,255,255,0.028)"
                  stroke={orbitRings[i].stroke}
                  strokeOpacity={0.3}
                  strokeWidth={0.4}
                  opacity={target.opacity}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
          </svg>

          {all.map((node) => (
            <span
              key={node.key}
              data-node={node.key}
              style={place(initial.slots.get(node.key), initial.radii)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <span
                title={`${node.item.name} — ${node.label}`}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-center shadow-[0_10px_30px_-8px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:scale-110"
              >
                {node.item.mark ? (
                  <TechMark name={node.item.mark} size={26} />
                ) : (
                  <span
                    style={{ color: node.item.color }}
                    className="px-1 font-display text-[0.55rem] font-extrabold leading-[1.15] tracking-tight"
                  >
                    {node.item.short ?? node.item.name}
                  </span>
                )}
              </span>
            </span>
          ))}

          {/* Centre of the orbit. */}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-white px-6 py-4 shadow-[0_18px_50px_-10px_rgba(0,0,0,0.6)]">
            <span className="font-display text-lg font-extrabold leading-none tracking-tight text-logo">
              techcadd<span className="text-up-bright">.</span>
            </span>
          </span>
        </div>
      </div>

      {/* ---- Below lg, the same grouping as a plain chip list ------------ */}
      <div className="container-x relative mt-10 space-y-6 lg:hidden">
        {techCategories
          .filter((cat) => !active || cat.key === active)
          .map((cat) => (
            <div key={cat.key}>
              <p className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-up-soft/70">
                <span className={`h-1.5 w-1.5 rounded-full ${cat.dot}`} />
                {cat.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item.name}
                    className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-2 text-xs font-medium text-white/85"
                  >
                    {item.mark ? (
                      <TechMark name={item.mark} size={16} />
                    ) : (
                      <span
                        style={{ color: item.color }}
                        className="grid h-4 w-4 place-items-center rounded-[0.3rem] bg-white text-[0.5rem] font-extrabold leading-none"
                      >
                        {(item.short ?? item.name).slice(0, 2)}
                      </span>
                    )}
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>

      <p className="container-x relative mt-14 text-center text-sm text-up-soft/60 lg:mt-20">
        {activeLabel
          ? `${count} tools in ${activeLabel} — hover the board to hold it still.`
          : `A few from each category — pick one above to see the rest.`}
      </p>
    </section>
  );
}
