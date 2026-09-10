"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { After12Page } from "@/lib/after12Pages";
import { techMarkFor } from "@/lib/techMarks";
import Icon from "@/components/ui/Icon";
import TechMark from "@/components/ui/TechMark";
import SectionLink from "@/components/courses/detail/SectionLink";
import { EASE } from "@/components/courses/detail/Motion";
import { GradientMesh } from "@/components/courses/after12/Motifs";
import { StageHeading, TiltCard } from "@/components/courses/after12/PathwaySections";

/**
 * The sections of a written After-12th page.
 *
 * `PathwaySections` renders the nine sections every course gets from its
 * record; these render the sections a written page adds on top — the ones the
 * shared record has nowhere to keep (key highlights, why now, the project
 * list, the closing "is this for me" band). Same route-map register: numbered
 * stages, yellow-to-cyan energy, alternating dark and light bands.
 *
 * Copy lives in `@/lib/after12Pages`; nothing here invents text.
 */

/* -------------------------------------------------------------------------- *
 *                             1 · Course overview                             *
 * -------------------------------------------------------------------------- */

export function WrittenOverview({
  step,
  overview,
  roles,
}: {
  step: number;
  overview: After12Page["overview"];
  roles: string[];
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id="overview"
      className="relative scroll-mt-36 overflow-hidden bg-hero-950 py-20 text-white lg:py-28"
    >
      <GradientMesh className="opacity-60" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <StageHeading step={step} kicker="Where this starts" title={overview.title} />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="space-y-5"
          >
            {overview.paragraphs.map((p) => (
              <p key={p} className="text-base leading-[1.85] text-up-soft/75 sm:text-lg">
                {p}
              </p>
            ))}
          </motion.div>

          <TiltCard className="h-fit rounded-3xl border border-white/12 bg-white/[0.05] p-8 backdrop-blur-sm">
            <h3 className="flex items-center gap-3 text-lg font-bold text-white">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950">
                <Icon name="briefcase" size={18} />
              </span>
              Where it takes you
            </h3>
            <ul className="mt-6 space-y-3.5">
              {roles.map((r, i) => (
                <motion.li
                  key={r}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  className="flex items-start gap-3 text-sm leading-relaxed text-up-soft/80"
                >
                  <Icon
                    name="arrowRight"
                    size={15}
                    strokeWidth={2.4}
                    className="mt-0.5 shrink-0 text-accent-yellow"
                  />
                  {r}
                </motion.li>
              ))}
            </ul>

            <SectionLink
              to="enquire"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent-glow"
            >
              Ask about eligibility
              <Icon
                name="arrowRight"
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </SectionLink>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                            2 · What you'll learn                            *
 * -------------------------------------------------------------------------- */

export function WrittenLearn({ step, learn }: { step: number; learn: After12Page["learn"] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // The spine draws itself as the list scrolls past, so the reader can see how
  // far through the skills they are without counting cards.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });

  return (
    <section id="learn" className="relative scroll-mt-36 overflow-hidden bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative">
        <StageHeading
          step={step}
          tone="light"
          kicker="Skills you collect"
          title={learn.title}
          intro={learn.intro}
        />

        <div ref={ref} className="relative mt-16">
          {/* ---- The spine ------------------------------------------------ */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-[1.4rem] w-px bg-up-line lg:left-1/2 lg:-translate-x-1/2"
          />
          <motion.div
            aria-hidden
            style={reduce ? undefined : { scaleY: draw }}
            className="absolute inset-y-0 left-[1.4rem] w-px origin-top bg-gradient-to-b from-accent-yellow via-accent-glow to-transparent lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="relative space-y-10 lg:space-y-16">
            {learn.items.map((item, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={item.title}
                  className={`relative pl-14 lg:w-1/2 lg:pl-0 ${
                    right ? "lg:ml-auto lg:pl-14" : "lg:pr-14 lg:text-right"
                  }`}
                >
                  {/* ---- Node on the spine --------------------------------- */}
                  <motion.span
                    aria-hidden
                    initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className={`absolute top-7 grid h-11 w-11 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-accent-yellow to-accent-glow font-display text-[0.7rem] font-extrabold text-hero-950 shadow-[0_10px_26px_-12px_rgba(11,26,77,0.7)] left-0 lg:left-auto ${
                      right ? "lg:-left-[1.375rem]" : "lg:-right-[1.375rem]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>

                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 34, x: right ? 26 : -26 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    whileHover={reduce ? undefined : { y: -6 }}
                    className="group relative overflow-hidden rounded-3xl border border-line bg-subtle p-7 transition-colors hover:border-up-accent/40 hover:bg-white"
                  >
                    <span
                      className={`inline-grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-hero-600 to-hero-glow text-white ${
                        right ? "" : "lg:ml-auto"
                      }`}
                    >
                      <Icon name={item.icon ?? "sparkles"} size={19} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-extrabold leading-snug text-up-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-up-muted">{item.body}</p>
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                            3 · Course curriculum                            *
 * -------------------------------------------------------------------------- */

export function WrittenCurriculum({
  step,
  curriculum,
}: {
  step: number;
  curriculum: After12Page["curriculum"];
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="modules"
      className="relative scroll-mt-36 overflow-hidden bg-hero-900 py-20 text-white lg:py-28"
    >
      <div className="absolute inset-0 grid-lines opacity-30" />

      <div className="container-x relative">
        <StageHeading
          step={step}
          kicker="The route"
          title={curriculum.title}
          intro={curriculum.intro}
        />

        <div className="mt-14 space-y-4">
          {curriculum.modules.map((m, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={m.title}
                initial={reduce ? false : { opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: EASE }}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-accent-glow/45 bg-white/[0.07]"
                    : "border-white/12 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 px-6 py-6 text-left"
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display text-base font-extrabold transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950 shadow-[0_0_26px_-6px_rgba(0,212,255,0.8)]"
                        : "border border-white/15 text-up-soft/70"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="flex-1">
                    <span className="block font-display text-lg font-extrabold text-white sm:text-xl">
                      Module {i + 1}: {m.title}
                    </span>
                    <span className="mt-1 block text-xs text-up-soft/50">
                      {m.points.length} topics
                    </span>
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${
                      isOpen ? "bg-accent-glow text-hero-950" : "bg-white/8 text-up-soft/70"
                    }`}
                  >
                    <Icon name="plus" size={16} strokeWidth={2.4} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <ul className="grid gap-2.5 border-t border-white/10 px-6 py-6 sm:grid-cols-2">
                        {m.points.map((p, j) => (
                          <motion.li
                            key={p}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: j * 0.03 }}
                            className="flex items-start gap-2.5 text-sm text-up-soft/75"
                          >
                            <Icon
                              name="check"
                              size={14}
                              strokeWidth={3}
                              className="mt-1 shrink-0 text-accent-yellow"
                            />
                            {p}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/12 bg-white/[0.05] p-7 backdrop-blur-sm">
            <h3 className="flex items-center gap-3 text-base font-bold text-white">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950">
                <Icon name="terminal" size={17} />
              </span>
              {curriculum.practical.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-up-soft/75">
              {curriculum.practical.body}
            </p>
          </div>

          <div className="rounded-3xl border border-accent-glow/30 bg-white/[0.05] p-7 backdrop-blur-sm">
            <h3 className="flex items-center gap-3 text-base font-bold text-white">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950">
                <Icon name="target" size={17} />
              </span>
              {curriculum.outcome.label}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-up-soft/75">
              {curriculum.outcome.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                                 4 · Tools                                   *
 * -------------------------------------------------------------------------- */

export function WrittenTools({ step, tools }: { step: number; tools: After12Page["tools"] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // The rail drifts against the scroll, so the toolchain reads as a moving belt
  // rather than a static logo wall. Doubled contents make the loop seamless.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const driftA = useTransform(scrollYProgress, [0, 1], ["2%", "-14%"]);
  const driftB = useTransform(scrollYProgress, [0, 1], ["-14%", "2%"]);

  const half = Math.ceil(tools.items.length / 2);
  const rows = [tools.items.slice(0, half), tools.items.slice(half)];

  return (
    <section
      id="tools"
      ref={ref}
      className="relative scroll-mt-36 overflow-hidden bg-hero-950 py-20 text-white lg:py-28"
    >
      <GradientMesh className="opacity-55" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <StageHeading step={step} kicker="Your toolkit" title={tools.title} intro={tools.intro} />
      </div>

      {/* ---- Drifting belts --------------------------------------------- */}
      <div className="relative mt-14 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]">
        {rows.map((row, r) => (
          <motion.div
            key={r}
            style={reduce ? undefined : { x: r === 0 ? driftA : driftB }}
            className="flex w-max gap-4"
          >
            {[...row, ...row, ...row].map((t, i) => {
              const mark = techMarkFor(t.name);
              return (
                <span
                  key={`${t.name}-${i}`}
                  className="inline-flex shrink-0 items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.05] px-6 py-4 backdrop-blur-sm"
                >
                  {mark ? (
                    <TechMark name={mark} size={22} className="shrink-0" />
                  ) : (
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-accent-yellow to-accent-glow" />
                  )}
                  <span className="font-display text-base font-extrabold whitespace-nowrap text-white">
                    {t.name}
                  </span>
                </span>
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* ---- What each one is for ---------------------------------------- *
          The belt shows the stack; this says why each tool is in it, which is
          the part a parent reading over a shoulder actually wants. */}
      <div className="container-x relative mt-14">
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {tools.items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: EASE }}
              className="border-t border-white/10 pt-4"
            >
              <dt className="font-display text-sm font-extrabold text-accent-yellow">{t.name}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-up-soft/70">{t.body}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                        5 · Who can do this course                           *
 * -------------------------------------------------------------------------- */

export function WrittenWho({ step, who }: { step: number; who: After12Page["who"] }) {
  const reduce = useReducedMotion();

  return (
    <section id="who" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-50" />

      <div className="container-x relative">
        <StageHeading step={step} tone="light" kicker="Is this you?" title={who.title} />

        {/* ---- Stacking deck --------------------------------------------- *
            Each card pins a little lower than the one before it, so they gather
            into a deck as you scroll instead of scrolling away. The reader ends
            the section looking at every profile at once. */}
        <div className="mt-14">
          {who.items.map((a, i) => (
            <div
              key={a.title}
              className="sticky"
              style={{ top: `calc(7rem + ${i * 1.15}rem)` }}
            >
              <motion.article
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: EASE }}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 shadow-[0_28px_60px_-42px_rgba(11,26,77,0.55)] sm:p-9 ${
                  i === who.items.length - 1 ? "mb-0" : "mb-5"
                }`}
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
                  <div className="order-last min-w-0 flex-1 sm:order-first">
                    <span className="font-display text-[0.7rem] font-extrabold tabular-nums tracking-[0.16em] text-up-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-extrabold leading-tight text-up-ink lg:text-2xl">
                      {a.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-up-muted lg:text-[0.95rem]">
                      {a.body}
                    </p>
                  </div>

                  <span className="order-first grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-hero-600 to-hero-glow text-white transition-transform duration-500 group-hover:scale-105 sm:order-last sm:h-20 sm:w-20">
                    <Icon name={a.icon ?? "users"} size={28} />
                  </span>
                </div>

                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                    6 · Why this programme is worth it                       *
 * -------------------------------------------------------------------------- */

export function WrittenWorth({ step, worth }: { step: number; worth: After12Page["worth"] }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="worth"
      className="relative scroll-mt-36 overflow-hidden bg-hero-950 py-20 text-white lg:py-28"
    >
      <GradientMesh className="opacity-70" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <StageHeading step={step} kicker="Why this one" title={worth.title} />

        {/* The cards deal in from alternating sides as the section arrives,
            so the pair reads as one argument rather than four loose claims. */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {worth.items.map((r, i) => (
            <motion.div
              key={r.title}
              variants={{
                hidden: { opacity: 0, y: 30, x: reduce ? 0 : i % 2 === 0 ? -20 : 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  transition: { duration: 0.65, ease: EASE },
                },
              }}
            >
              <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-white/12 bg-white/[0.05] p-7 backdrop-blur-sm transition-colors hover:border-accent-glow/45">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950 transition-transform duration-500 group-hover:scale-110">
                    <Icon name={r.icon ?? "sparkles"} size={21} />
                  </span>
                  <span className="font-display text-2xl font-extrabold tabular-nums text-white/12">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-white">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-up-soft/70">{r.body}</p>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                                 7 · Why now                                 *
 * -------------------------------------------------------------------------- */

export function WrittenWhyNow({ step, whyNow }: { step: number; whyNow: After12Page["whyNow"] }) {
  const reduce = useReducedMotion();

  return (
    <section id="why-now" className="relative scroll-mt-36 bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <StageHeading step={step} tone="light" kicker={whyNow.kicker} title={whyNow.title} />

          {whyNow.paragraphs.map((p, i) => (
            <motion.p
              key={p}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE }}
              className="mt-5 max-w-3xl text-base leading-[1.85] text-up-muted"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="lg:pt-4">
          <p className="font-display text-xl font-extrabold text-up-ink">{whyNow.listTitle}</p>

          <ul className="mt-6 space-y-3">
            {whyNow.items.map((item, i) => (
              <motion.li
                key={item.title}
                initial={reduce ? false : { opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                className="group flex items-start gap-4 rounded-2xl border border-line bg-subtle p-5 transition-colors hover:border-up-accent/40 hover:bg-white"
              >
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950">
                  <Icon name="bolt" size={14} strokeWidth={2.4} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-up-ink">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-up-muted">
                    {item.body}
                  </span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                        8 · Where this course takes you                      *
 * -------------------------------------------------------------------------- */

export function WrittenScope({
  step,
  takesYou,
}: {
  step: number;
  takesYou: After12Page["takesYou"];
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);

  return (
    <section
      id="scope"
      className="relative scroll-mt-36 overflow-hidden bg-hero-900 py-20 text-white lg:py-28"
    >
      <div className="absolute inset-0 grid-lines opacity-30" />

      <div className="container-x relative">
        <StageHeading
          step={step}
          kicker="Where it leads"
          title={takesYou.title}
          intro={takesYou.intro}
        />

        <p className="mt-12 text-[0.66rem] font-bold tracking-[0.22em] text-accent-yellow uppercase">
          {takesYou.listTitle}
        </p>

        {/* ---- One role at a time ---------------------------------------- *
            Four roles side by side reduce to four headlines nobody reads. Open
            one and it is the only thing on screen, which is how somebody
            choosing a career actually reads them. */}
        <div className="mt-6 space-y-3">
          {takesYou.steps.map((s2, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={s2.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                className={`overflow-hidden rounded-3xl border backdrop-blur-sm transition-colors duration-500 ${
                  isOpen
                    ? "border-accent-glow/40 bg-white/[0.08]"
                    : "border-white/12 bg-white/[0.04] hover:border-white/25"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-5 px-6 py-5 text-left lg:px-8"
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-[0.72rem] font-extrabold tabular-nums transition-colors duration-500 ${
                        isOpen
                          ? "bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950"
                          : "border border-white/15 text-accent-yellow"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-lg font-extrabold leading-snug text-white">
                      {s2.title}
                    </span>
                    <motion.span
                      aria-hidden
                      animate={reduce ? undefined : { rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-accent-glow"
                    >
                      <Icon name="plus" size={15} strokeWidth={2.6} />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pl-[4.75rem] text-sm leading-relaxed text-up-soft/75 lg:px-8 lg:pl-[5.5rem] lg:text-[0.95rem]">
                        {s2.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                         9 · Projects you will ship                          *
 * -------------------------------------------------------------------------- */

export function WrittenProjects({
  step,
  projects,
}: {
  step: number;
  projects: After12Page["projects"];
}) {
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="relative scroll-mt-36 bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative">
        <StageHeading step={step} tone="light" kicker="What you build" title={projects.title} />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.items.map((p, i) => (
            <motion.div
              key={p.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: EASE }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-subtle p-7 transition-colors hover:border-up-accent/40 hover:bg-white"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent-yellow to-accent-glow font-display text-sm font-extrabold text-hero-950">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1.5 font-display text-lg font-extrabold leading-tight text-up-ink">
                  {p.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-up-muted">{p.body}</p>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                       10 · Learn it. Build it. Own it.                      *
 * -------------------------------------------------------------------------- */

export function WrittenApproach({
  step,
  approach,
  projects,
}: {
  step: number;
  approach: After12Page["approach"];
  /** Paired one-to-one with the steps, so each stage names its own output. */
  projects?: After12Page["projects"]["items"];
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id="approach"
      className="relative scroll-mt-36 overflow-hidden bg-hero-950 py-20 text-white lg:py-28"
    >
      <GradientMesh className="opacity-60" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <StageHeading step={step} kicker="How it works" title={approach.title} />

        <div className="mt-8 max-w-3xl space-y-4">
          {approach.paragraphs.map((p) => (
            <p key={p} className="text-base leading-[1.85] text-up-soft/75 sm:text-lg">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {approach.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="rounded-3xl border border-white/12 bg-white/[0.05] p-8 backdrop-blur-sm"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950">
                <Icon name={item.icon ?? "sparkles"} size={21} />
              </span>
              <h3 className="mt-6 font-display text-xl font-extrabold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-up-soft/70">{item.body}</p>

              {projects?.[i] && (
                <span className="mt-6 block border-t border-white/12 pt-4 text-[0.8rem] leading-snug font-bold text-accent-yellow">
                  {projects[i].title}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                        8 · What you leave with                              *
 * -------------------------------------------------------------------------- */

/**
 * One of the two documents, drawn rather than photographed.
 *
 * A photo would need a real scan with a real student's name on it; a rendering
 * can say "Student Name" honestly and still show the shape of what arrives.
 * Kept in the pathway palette — navy ink and a yellow-to-cyan seal — rather
 * than the cream-and-serif diploma every institute page uses.
 */
function CertificateFace({ kind, tone }: { kind: string; tone: "gold" | "cyan" }) {
  const accent = tone === "gold" ? "#f4c145" : "#2fd8ff";

  return (
    <div className="overflow-hidden rounded-xl bg-[#fbfcff] p-1 shadow-[0_30px_60px_-24px_rgba(3,10,35,0.7)] ring-1 ring-hero-950/10">
      <div
        className="relative overflow-hidden rounded-lg px-6 py-5"
        style={{ border: `1px solid ${accent}66` }}
      >
        {[
          "top-1.5 left-1.5 border-t border-l",
          "top-1.5 right-1.5 border-t border-r",
          "bottom-1.5 left-1.5 border-b border-l",
          "bottom-1.5 right-1.5 border-b border-r",
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={`pointer-events-none absolute h-4 w-4 ${pos}`}
            style={{ borderColor: accent }}
          />
        ))}

        <div className="relative text-center text-hero-950">
          <span className="block font-display text-[0.6rem] font-extrabold tracking-[0.3em] text-hero-950/45 uppercase">
            techcadd · Mohali
          </span>
          <span
            aria-hidden
            className="mx-auto mt-2 block h-px w-20"
            style={{ backgroundImage: `linear-gradient(90deg,transparent,${accent},transparent)` }}
          />
          <span className="mt-2 block font-display text-[0.95rem] leading-none font-extrabold tracking-[0.2em] uppercase">
            Certificate
          </span>
          <span
            className="mt-1.5 block font-display text-[0.55rem] font-bold tracking-[0.18em] uppercase"
            style={{ color: accent }}
          >
            {kind}
          </span>

          <span className="mt-4 block text-[0.5rem] tracking-[0.2em] text-hero-950/40 uppercase">
            Awarded to
          </span>
          <span className="mt-1 block font-display text-[0.9rem] leading-tight font-extrabold text-hero-950/85">
            Student Name
          </span>
          <span aria-hidden className="mx-auto mt-1.5 block h-px w-32 bg-hero-950/15" />

          <div className="mt-5 flex items-end justify-center gap-4">
            <span className="w-16">
              <span aria-hidden className="block h-px w-full bg-hero-950/20" />
              <span className="mt-1 block text-[0.45rem] tracking-[0.14em] text-hero-950/45 uppercase">
                Course Director
              </span>
            </span>
            <span
              aria-hidden
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-hero-950 shadow-[0_3px_8px_rgba(3,10,35,0.25)]"
              style={{ backgroundImage: "linear-gradient(135deg,#ffd36e,#2fd8ff)" }}
            >
              <Icon name="star" size={13} />
            </span>
            <span className="w-16">
              <span aria-hidden className="block h-px w-full bg-hero-950/20" />
              <span className="mt-1 block text-[0.45rem] tracking-[0.14em] text-hero-950/45 uppercase">
                Centre Head
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WrittenCertificate({
  step,
  certificate,
}: {
  step: number;
  // Optional on the page type — a brief may write no certificate stage — but
  // required here: the route renders this section only when there is one.
  certificate: NonNullable<After12Page["certificate"]>;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // The pair rights itself as it enters the viewport, so the documents settle
  // into place rather than sitting pre-arranged.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const settle = useSpring(scrollYProgress, { stiffness: 70, damping: 24 });
  const tiltA = useTransform(settle, [0, 1], [-16, -7]);
  const tiltB = useTransform(settle, [0, 1], [12, 5]);

  return (
    <section
      id="certificate"
      ref={ref}
      className="relative scroll-mt-36 overflow-hidden bg-subtle py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-16">
        <div>
          <StageHeading
            step={step}
            tone="light"
            kicker="Certification"
            title={certificate.title}
            intro={certificate.intro}
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {certificate.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                className="group flex gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-up-accent/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950">
                  <Icon name={item.icon ?? "certificate"} size={18} />
                </span>
                <span>
                  <span className="block font-display text-[0.95rem] font-extrabold text-up-ink">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[0.83rem] leading-relaxed text-up-muted">
                    {item.body}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>

          {/* The brochure is sent by a counsellor rather than served as a
              file, so the button opens the enquiry instead of a download. */}
          <SectionLink
            to="enquire"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-yellow to-accent-glow px-7 py-3.5 text-sm font-extrabold text-hero-950 transition-transform hover:-translate-y-0.5"
          >
            Download the brochure
            <Icon
              name="download"
              size={16}
              className="transition-transform group-hover:translate-y-0.5"
            />
          </SectionLink>
        </div>

        {/* ---- The pair ---------------------------------------------------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="group relative mx-auto w-full max-w-sm"
        >
          <motion.div
            style={reduce ? undefined : { rotate: tiltA }}
            className="w-[88%] transition-transform duration-500 ease-out group-hover:-translate-x-3"
          >
            <CertificateFace kind="of Project Excellence" tone="cyan" />
          </motion.div>

          <motion.div
            style={reduce ? undefined : { rotate: tiltB }}
            className="relative z-10 -mt-[26%] ml-auto w-[88%] transition-transform duration-500 ease-out group-hover:translate-x-3"
          >
            <CertificateFace kind="of Course Completion" tone="gold" />
          </motion.div>

          <p className="mt-8 text-center text-[0.83rem] leading-relaxed text-up-muted">
            Two documents on completion — the course certificate, and a separate
            certificate for the capstone you build and defend.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                            11 · Why techcadd                                *
 * -------------------------------------------------------------------------- */

export function WrittenWhyUs({ step, whyUs }: { step: number; whyUs: After12Page["whyUs"] }) {
  const reduce = useReducedMotion();

  return (
    <section id="why" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="container-x">
        <StageHeading
          step={step}
          tone="light"
          kicker={whyUs.kicker}
          title={whyUs.title}
          intro={whyUs.intro}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.items.map((r, i) => (
            <motion.div
              key={r.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 transition-colors hover:border-up-accent/40"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950 transition-transform duration-500 group-hover:scale-110">
                  <Icon name={r.icon ?? "sparkles"} size={21} />
                </span>
                <span className="font-display text-2xl font-extrabold tabular-nums text-up-ink/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-base font-bold text-up-ink">{r.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{r.body}</p>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                             Popular courses                                 *
 * -------------------------------------------------------------------------- */

export function WrittenPopular({ popular }: { popular: After12Page["popular"] }) {
  const reduce = useReducedMotion();

  return (
    <section id="popular" className="relative overflow-hidden bg-white py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative">
        <span className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-up-accent">
          Other routes
        </span>
        <h2 className="mt-3 font-display text-2xl font-extrabold text-up-ink sm:text-3xl">
          {popular.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-up-muted">{popular.intro}</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.items.map((c, i) => (
            <motion.div
              key={c.title}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: EASE }}
            >
              <Link
                href={c.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-subtle p-7 transition-all hover:-translate-y-1 hover:border-up-accent/40 hover:bg-white"
              >
                <span className="font-display text-lg font-extrabold leading-tight text-up-ink">
                  {c.title}
                </span>
                <span className="mt-3 flex-1 text-sm leading-relaxed text-up-muted">{c.body}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-up-accent">
                  See the route
                  <Icon
                    name="arrowRight"
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                          Not sure it is the right fit?                      *
 * -------------------------------------------------------------------------- */

export function WrittenFit({ fit }: { fit: After12Page["fit"] }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="fit"
      className="relative scroll-mt-36 overflow-hidden bg-hero-950 py-20 text-white lg:py-24"
    >
      <GradientMesh className="opacity-70" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <span className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-accent-yellow">
            Still deciding
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl">
            {fit.title}
          </h2>
          {fit.paragraphs.map((p) => (
            <p key={p} className="mt-5 text-base leading-[1.85] text-up-soft/75">
              {p}
            </p>
          ))}
        </div>

        <div className="rounded-3xl border border-white/12 bg-white/[0.05] p-8 backdrop-blur-sm">
          <h3 className="font-display text-xl font-extrabold text-white">{fit.ctaTitle}</h3>

          <ul className="mt-6 space-y-4">
            {fit.points.map((p, i) => (
              <motion.li
                key={p}
                initial={reduce ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="flex items-start gap-3 text-sm leading-relaxed text-up-soft/85"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-yellow text-hero-950">
                  <Icon name="check" size={11} strokeWidth={3.4} />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>

          <SectionLink
            to="enquire"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-yellow to-accent-glow px-7 py-3.5 text-sm font-extrabold text-hero-950 transition-transform hover:-translate-y-0.5"
          >
            Talk to a counsellor
            <Icon
              name="arrowRight"
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </SectionLink>
        </div>
      </div>
    </section>
  );
}
