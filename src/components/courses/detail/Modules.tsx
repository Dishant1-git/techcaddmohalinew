"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Course } from "@/lib/courses";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import { EASE, itemVariants, Stagger } from "@/components/courses/detail/Motion";
import { courseChromeOffset } from "@/components/courses/detail/SectionLink";
import { scrollToElement } from "@/lib/lenis";

/**
 * Curriculum modules, as a scroll-driven stack.
 *
 * Each module is a sticky card. Module 1 pins under the chrome, module 2 rides
 * up and covers it leaving a sliver above, and so on — the programme builds
 * into a pile in the order you would study it. Whichever card is on top is the
 * open one: its topics sharpen and slide in one after another, while the
 * module you have not reached yet holds its topics blurred behind the header.
 *
 * Three things make the stack read as a stack. The cards are siblings of one
 * containing block, so an early card stays pinned rather than being carried
 * off by a wrapper of its own; they are tall and set close together, so the
 * incoming card is always on screen with the pinned one it is about to cover;
 * and each card's height is fixed by `min-h`, so opening one changes what is
 * inside it and never the layout around it.
 *
 * Under reduced motion the stack is dropped entirely for a plain list with
 * every module already open.
 */

/** Height of the pinned counter bar above the stack. */
const HEADER = 52;

/** How far each card rests below the one before it, so the stack peeks. */
const STEP = 10;

export default function Modules({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const totalTopics = course.modules.reduce((n, m) => n + m.points.length, 0);
  const count = course.modules.length;

  const stack = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Starts at the same constant `courseChromeOffset` returns on the server, so
  // the first client render matches the HTML it is hydrating; the real
  // measurement lands in the effect below.
  const [chrome, setChrome] = useState(132);

  /** Where card `i` comes to rest under the chrome and the counter bar. */
  const stickyTop = useCallback((i: number) => chrome + HEADER + i * STEP, [chrome]);

  /* ---- Which card is on top of the stack -------------------------------- */

  useEffect(() => {
    if (reduce) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      // Measured once per frame and reused: the rail's height is the same for
      // every card, and `setChrome` with an unchanged value costs nothing.
      const gap = courseChromeOffset();
      setChrome(gap);

      const cards = stack.current?.querySelectorAll<HTMLElement>("[data-module]");
      if (!cards?.length) return;

      // The open card is the last one that has reached its resting place: any
      // card still below that has not been scrolled to yet.
      let current = 0;
      cards.forEach((card, i) => {
        if (card.getBoundingClientRect().top <= gap + HEADER + i * STEP + 4) current = i;
      });

      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  /** Clicking a card or a segment scrolls to it rather than toggling it: the
   *  scroll position is the single source of truth for what is open. */
  function goTo(i: number) {
    const card = stack.current?.querySelectorAll<HTMLElement>("[data-module]")[i];
    if (card) scrollToElement(card, chrome + HEADER + i * STEP);
  }

  return (
    <section id="modules" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="container-x">
        <SectionTitle
          eyebrow="Modules"
          title="The curriculum, module by module"
          subtitle={`${count} modules and ${totalTopics} topics across ${course.duration}. Each one closes in something you build, review and keep in your portfolio.`}
        />

        {/* ---- Reduced motion: one plain, fully open list ------------------ */}
        {reduce ? (
          <Stagger className="mt-14 space-y-4" amount={0.05}>
            {course.modules.map((m, i) => (
              <motion.div key={m.title} variants={itemVariants}>
                <ModuleCard course={course} module={m} index={i} total={count} state="active" />
              </motion.div>
            ))}
          </Stagger>
        ) : (
          <div className="mt-12">
            {/* Counter bar. It pins above the stack, so the reader always has
                the position in the programme even mid-card. */}
            <div
              className="sticky z-20 flex items-center gap-4 rounded-full border border-line bg-white/85 px-5 py-2.5 backdrop-blur-xl"
              style={{ top: chrome, height: HEADER - 8 }}
            >
              <span className="font-display text-[0.72rem] font-bold tabular-nums tracking-[0.14em] text-up-ink">
                <span className="text-up-accent">{String(active + 1).padStart(2, "0")}</span>
                <span className="mx-1.5 text-up-line">/</span>
                {String(count).padStart(2, "0")}
              </span>

              <div className="flex flex-1 items-center gap-1.5">
                {course.modules.map((m, i) => (
                  <button
                    key={m.title}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to module ${i + 1}: ${m.title}`}
                    aria-current={i === active ? "true" : undefined}
                    className="group h-4 flex-1"
                  >
                    <span
                      className={`block h-1 w-full rounded-full transition-colors duration-300 ${
                        i <= active
                          ? "bg-gradient-to-r from-up-accent to-hero-glow"
                          : "bg-up-line group-hover:bg-up-accent/40"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <span className="hidden text-xs font-semibold text-up-muted sm:block">
                {course.modules[active]?.title}
              </span>
            </div>

            {/* The stack. Every card is a sticky sibling of the same parent —
                that is what lets an early card stay pinned while a later one
                rides up over it — and the gap between them is small enough
                that the incoming card is always on screen with the one it is
                covering.

                The last card's runway is padding on this container, not a
                margin on the card: a trailing margin collapses out through the
                parent's bottom edge, which would end the containing block at
                the card itself and leave the final module nothing to stay
                pinned through. */}
            <div ref={stack} className="relative mt-6 pb-[34vh]">
              {course.modules.map((m, i) => (
                <motion.div
                  key={m.title}
                  data-module={i}
                  className="sticky mb-[13vh] last:mb-0"
                  style={{ top: stickyTop(i), zIndex: 10 + i }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <ModuleCard
                    course={course}
                    module={m}
                    index={i}
                    total={count}
                    state={i === active ? "active" : i < active ? "covered" : "upcoming"}
                    onSelect={() => goTo(i)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                                  The card                                   *
 * -------------------------------------------------------------------------- */

type CardState = "covered" | "active" | "upcoming";

/**
 * One module.
 *
 * `min-h` rather than content height: the card must occupy the same box in
 * every state, so the stack above and below it never moves as a module opens.
 * The height also keeps the incoming card large enough to read while it is
 * still sliding up over the pinned one.
 */
function ModuleCard({
  course,
  module: m,
  index,
  total,
  state,
  onSelect,
}: {
  course: Course;
  module: Course["modules"][number];
  index: number;
  total: number;
  state: CardState;
  onSelect?: () => void;
}) {
  const active = state === "active";
  const previous = course.modules[index - 1];

  // A line of orientation per module, from the shape of the programme rather
  // than from copy we do not have: where it sits, and what it follows.
  const stage =
    index === 0
      ? "Where the programme starts — no prior experience assumed."
      : index === total - 1
        ? "The final stretch: the live project, the review and the portfolio hand-off."
        : `Picks up from ${previous?.title.toLowerCase()} and adds the working skills on top.`;

  const label = active ? "Open now" : state === "covered" ? "Covered" : "Up next";

  return (
    <article
      className={`relative flex min-h-[21rem] flex-col rounded-3xl border bg-white p-6 transition-all duration-500 sm:min-h-[23rem] sm:p-8 lg:min-h-[24rem] ${
        active
          ? "border-up-accent/35 shadow-[0_34px_80px_-50px_rgba(11,26,77,0.6)]"
          : "border-line shadow-[0_18px_44px_-42px_rgba(11,26,77,0.5)]"
      }`}
    >
      {/* The whole card is a jump target, but the click surface is one button
          laid over it rather than a <button> wrapped around the heading and
          the list — a button may only contain phrasing content, and wrapping
          the card in one would also read the entire module aloud as its
          label. */}
      {onSelect && (
        <button
          type="button"
          onClick={onSelect}
          aria-expanded={active}
          className="absolute inset-0 z-10 rounded-3xl"
        >
          <span className="sr-only">
            Open module {index + 1}: {m.title}
          </span>
        </button>
      )}

      <div className="grid flex-1 gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
        {/* ---- Identity ------------------------------------------------- */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-display text-sm font-extrabold transition-colors duration-500 sm:h-14 sm:w-14 sm:text-base ${
                  active
                    ? "bg-gradient-to-br from-hero-600 to-hero-glow text-white shadow-lg shadow-hero-600/30"
                    : "border border-line bg-subtle text-up-accent"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className={`rounded-full border px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] transition-colors duration-500 ${
                  active
                    ? "border-up-accent/30 bg-brand-50 text-up-accent"
                    : "border-line bg-subtle text-up-muted"
                }`}
              >
                {label}
              </span>
            </div>

            <h3 className="mt-5 font-display text-xl font-extrabold leading-tight text-up-ink sm:text-2xl">
              {m.title}
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-up-muted">{stage}</p>
          </div>

          <p className="flex items-center gap-3 text-xs text-up-muted">
            <span className="font-semibold text-up-ink">{m.points.length} topics</span>
            <span className="h-1 w-1 rounded-full bg-up-line" />
            <span>
              Module {index + 1} of {total}
            </span>
          </p>
        </div>

        {/* ---- Topics ----------------------------------------------------
            Full-width ruled rows rather than a two-column grid: a topic is
            two or three words, and in a wide track a grid of them leaves most
            of the card empty on the right. The rule, the index and the state
            icon carry the row out to the edge. */}
        <div className="flex flex-col border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-up-accent">
              What this module covers
            </p>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-up-muted/70">
              {m.points.length} topics
            </p>
          </div>

          <motion.ul
            initial={false}
            animate={active ? "show" : "idle"}
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
            className={`mt-2 flex flex-1 flex-col justify-center transition-all duration-500 ${
              active ? "blur-0" : "blur-[2.5px]"
            }`}
          >
            {m.points.map((p, pointIndex) => (
              <motion.li
                key={p}
                variants={{
                  idle: { opacity: 0.55, x: -6 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
                }}
                className="flex items-center gap-4 border-b border-line/70 py-3.5 last:border-b-0"
              >
                <span
                  className={`font-display text-[0.68rem] font-bold tabular-nums tracking-[0.1em] transition-colors duration-500 ${
                    active ? "text-up-accent" : "text-up-muted/50"
                  }`}
                >
                  {String(pointIndex + 1).padStart(2, "0")}
                </span>

                <span className="flex-1 text-sm font-medium text-up-ink/85">{p}</span>

                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                    active ? "bg-brand-50 text-up-accent" : "bg-subtle text-up-muted/45"
                  }`}
                >
                  <Icon name="check" size={12} strokeWidth={3} />
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </article>
  );
}
