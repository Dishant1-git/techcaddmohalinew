"use client";

import { type ReactNode, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { Course } from "@/lib/courses";
import {
  courseReviews,
  eligibility,
  learningPoints,
  ratingBreakdown,
  whoCanJoin,
  whyChoose,
} from "@/lib/coursePage";
import { techMarkFor } from "@/lib/techMarks";
import Icon from "@/components/ui/Icon";
import TechMark from "@/components/ui/TechMark";
import SectionLink from "@/components/courses/detail/SectionLink";
import { EASE } from "@/components/courses/detail/Motion";
import CountUp from "@/components/courses/detail/CountUp";
import { GradientMesh, JourneyPath, StepBadge } from "@/components/courses/after12/Motifs";

/**
 * The After-12th design's sections.
 *
 * Same nine sections as the other two designs, told as a route: numbered
 * stages, a spine that draws as you scroll, and achievement-style tiles. The
 * palette runs dark with yellow-to-cyan energy, against the certificate
 * design's paper and the catalogue design's navy circuitry.
 */

/* -------------------------------------------------------------------------- *
 *                              Shared furniture                               *
 * -------------------------------------------------------------------------- */

function StageHeading({
  step,
  kicker,
  title,
  intro,
  tone = "dark",
}: {
  step: number;
  kicker: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
}) {
  const reduce = useReducedMotion();
  const dark = tone === "dark";

  return (
    <div className="max-w-3xl">
      <motion.div
        initial={reduce ? false : { opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <StepBadge n={step} label={kicker} />
      </motion.div>

      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
        className={`mt-6 font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.9rem] ${
          dark ? "text-white" : "text-up-ink"
        }`}
      >
        {title}
      </motion.h2>

      {intro && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            dark ? "text-up-soft/70" : "text-up-muted"
          }`}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}

/**
 * A card that tips toward the pointer — this design's hover signature.
 *
 * The rotation lives in springed motion values rather than state: pointer
 * moves fire continuously, and re-rendering React on each one would make a
 * grid of these cards stutter. Motion values drive the transform directly and
 * never re-render.
 */
function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const spring = { stiffness: 220, damping: 22 };
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
        rotateY.set(((e.clientX - r.left) / r.width - 0.5) * 7);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- *
 *                            1 · Where this starts                            *
 * -------------------------------------------------------------------------- */

export function PathOverview({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const topics = course.modules.reduce((n, m) => n + m.points.length, 0);

  return (
    <section
      id="overview"
      className="relative scroll-mt-36 overflow-hidden bg-hero-950 py-20 text-white lg:py-28"
    >
      <GradientMesh className="opacity-60" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <StageHeading
          step={1}
          kicker="Where this starts"
          title="Straight from school into the work"
          intro={`A ${course.duration.toLowerCase()} programme built for students who have just finished 12th and want a job-ready skill rather than three more years of theory.`}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="text-base leading-[1.85] text-up-soft/75 sm:text-lg">{course.overview}</p>

            <div className="mt-10 grid gap-6 border-t border-white/12 pt-8 sm:grid-cols-3">
              {[
                { value: course.modules.length, suffix: "", label: "Stages on the route" },
                { value: topics, suffix: "", label: "Topics you cover" },
                { value: course.outcomes.length, suffix: "", label: "Things you can do after" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl font-extrabold text-white">
                    <CountUp to={s.value} />
                    <span className="text-accent-yellow">{s.suffix}</span>
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-up-soft/50">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <TiltCard className="rounded-3xl border border-white/12 bg-white/[0.05] p-8 backdrop-blur-sm">
            <h3 className="flex items-center gap-3 text-lg font-bold text-white">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950">
                <Icon name="briefcase" size={18} />
              </span>
              Where it takes you
            </h3>
            <ul className="mt-6 space-y-3.5">
              {course.roles.map((r, i) => (
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
 *                                2 · The route                                *
 * -------------------------------------------------------------------------- */

export function PathModules({ course }: { course: Course }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      id="modules"
      className="relative scroll-mt-36 overflow-hidden bg-hero-900 py-20 text-white lg:py-28"
    >
      <div className="absolute inset-0 grid-lines opacity-30" />

      <div className="container-x relative">
        <StageHeading
          step={2}
          kicker="The route"
          title="Your stages, in order"
          intro="Each stage ends in something you have built. The route below fills in as you scroll it."
        />

        <div className="relative mt-14 lg:grid lg:grid-cols-[6rem_1fr] lg:gap-10">
          {/* The drawn route, beside the stages on desktop. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 lg:block">
            <JourneyPath
              target={ref}
              stops={course.modules.length}
              className="h-full w-full"
            />
          </div>

          <div className="hidden lg:block" aria-hidden />

          <div className="space-y-4">
            {course.modules.map((m, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={m.title}
                  initial={reduce ? false : { opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, delay: i * 0.06, ease: EASE }}
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
                        {m.title}
                      </span>
                      <span className="mt-1 block text-xs text-up-soft/50">
                        Stage {i + 1} of {course.modules.length} · {m.points.length} topics
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
                              transition={{ duration: 0.35, delay: j * 0.04 }}
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
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                            3 · Skills you collect                           *
 * -------------------------------------------------------------------------- */

export function PathLearn({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const points = learningPoints(course);

  return (
    <section id="learn" className="relative scroll-mt-36 bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative">
        <StageHeading
          step={3}
          tone="light"
          kicker="Skills you collect"
          title="What you learn in this programme"
          intro="Every one of these is something you will have done yourself, not just watched."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <motion.div
              key={`${p.point}-${i}`}
              initial={reduce ? false : { opacity: 0, scale: 0.94, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 220, damping: 24, delay: (i % 3) * 0.07 }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-subtle p-6 transition-colors hover:border-up-accent/40 hover:bg-white"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-yellow to-accent-glow font-display text-[0.7rem] font-extrabold text-hero-950">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-up-ink">{p.point}</p>
              <p className="mt-2 text-[0.66rem] uppercase tracking-wider text-up-muted/80">
                {p.module}
              </p>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                          4 · Why students pick this                         *
 * -------------------------------------------------------------------------- */

export function PathWhy({ course }: { course: Course }) {
  const reasons = whyChoose(course);

  return (
    <section
      id="why"
      className="relative scroll-mt-36 overflow-hidden bg-hero-950 py-20 text-white lg:py-28"
    >
      <GradientMesh className="opacity-70" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <StageHeading
          step={4}
          kicker="Why this one"
          title="Why school-leavers choose techcadd"
          intro={`Six reasons the ${course.title} route gets people hired rather than merely certified.`}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <TiltCard
              key={r.title}
              className="group h-full rounded-3xl border border-white/12 bg-white/[0.05] p-7 backdrop-blur-sm transition-colors hover:border-accent-glow/45"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950 transition-transform duration-500 group-hover:scale-110">
                  <Icon name={r.icon} size={21} />
                </span>
                <span className="font-display text-2xl font-extrabold tabular-nums text-white/12">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold text-white">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-up-soft/70">{r.body}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                               5 · Is this you?                              *
 * -------------------------------------------------------------------------- */

export function PathWho({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const audience = whoCanJoin(course);
  const criteria = eligibility(course);

  return (
    <section id="who" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="container-x">
        <StageHeading
          step={5}
          tone="light"
          kicker="Is this you?"
          title="Who this route is built for"
          intro={`${course.title} is a ${course.level.toLowerCase()} route. If you recognise yourself below, you are in the right place.`}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <div className="grid gap-5 sm:grid-cols-2">
            {audience.map((a, i) => (
              <motion.div
                key={a.title}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 transition-colors hover:border-up-accent/40"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-hero-600 to-hero-glow text-white">
                  <Icon name={a.icon} size={21} />
                </span>
                <h3 className="mt-5 text-base font-bold text-up-ink">{a.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{a.body}</p>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="relative h-full overflow-hidden rounded-3xl bg-hero-950 p-8 text-white"
          >
            <GradientMesh className="opacity-60" />
            <div className="relative">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-accent-yellow">
                What you need
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold">To get started</h3>

              <ul className="mt-7 space-y-4">
                {criteria.map((c, i) => (
                  <motion.li
                    key={c}
                    initial={reduce ? false : { opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                    className="flex items-start gap-3 text-sm text-up-soft/85"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-yellow text-hero-950">
                      <Icon name="check" size={11} strokeWidth={3.4} />
                    </span>
                    {c}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.06] p-5">
                <p className="text-sm leading-relaxed text-up-soft/75">
                  Not sure your marks or stream fit? A ten-minute call maps them to the right batch
                  — no obligation.
                </p>
                <SectionLink
                  to="enquire"
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent-yellow"
                >
                  Check my eligibility
                  <Icon
                    name="arrowRight"
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </SectionLink>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                               6 · Your toolkit                              *
 * -------------------------------------------------------------------------- */

export function PathTools({ course }: { course: Course }) {
  const reduce = useReducedMotion();

  return (
    <section id="tools" className="relative scroll-mt-36 bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative">
        <StageHeading
          step={6}
          tone="light"
          kicker="Your toolkit"
          title="The tools you will actually use"
          intro="Industry software, taught on licensed installations in the lab — the same stack the jobs ask for."
        />

        <div className="mt-14 flex flex-wrap gap-3">
          {course.tools.map((t, i) => {
            const mark = techMarkFor(t);
            return (
              <motion.span
                key={t}
                initial={reduce ? false : { opacity: 0, scale: 0.85, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 250, damping: 20, delay: i * 0.04 }}
                whileHover={reduce ? undefined : { y: -6, scale: 1.05 }}
                className="group inline-flex cursor-default items-center gap-2.5 rounded-full border border-line bg-subtle px-5 py-3 text-sm font-bold text-up-ink/85 transition-colors hover:border-transparent hover:bg-gradient-to-r hover:from-accent-yellow hover:to-accent-glow hover:text-hero-950"
              >
                {mark ? (
                  <TechMark name={mark} size={18} className="shrink-0" />
                ) : (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-accent-yellow to-accent-glow" />
                )}
                {t}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                            7 · Who has walked it                            *
 * -------------------------------------------------------------------------- */

export function PathReviews({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const reviews = courseReviews(course);
  const { average, reviewCount, buckets } = ratingBreakdown(course);

  return (
    <section
      id="reviews"
      className="relative scroll-mt-36 overflow-hidden bg-hero-950 py-20 text-white lg:py-28"
    >
      <GradientMesh className="opacity-55" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <StageHeading
          step={7}
          kicker="Who has walked it"
          title="Students who started where you are"
          intro="Alumni of this route, on what changed once they were sitting in interviews."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-3xl border border-white/12 bg-white/[0.05] p-8 backdrop-blur-sm"
          >
            <p className="font-display text-6xl font-extrabold leading-none text-white">{average}</p>
            <div className="mt-3 flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Icon
                  key={i}
                  name="star"
                  size={15}
                  className="fill-accent-yellow text-accent-yellow"
                />
              ))}
            </div>
            <p className="mt-2 text-xs uppercase tracking-wider text-up-soft/50">
              {reviewCount} reviews
            </p>

            <div className="mt-7 space-y-2 border-t border-white/12 pt-6">
              {buckets.map((b, i) => (
                <div key={b.stars} className="flex items-center gap-2.5">
                  <span className="w-2 text-[0.68rem] tabular-nums text-up-soft/60">{b.stars}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.span
                      className="block h-full rounded-full bg-gradient-to-r from-accent-yellow to-accent-glow"
                      initial={reduce ? false : { width: 0 }}
                      whileInView={{ width: `${b.percent}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: EASE }}
                    />
                  </span>
                  <span className="w-8 text-right text-[0.68rem] tabular-nums text-up-soft/50">
                    {b.percent}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {reviews.map((r, i) => (
              <motion.figure
                key={`${r.name}-${r.role}`}
                initial={reduce ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="flex h-full flex-col rounded-3xl border border-white/12 bg-white/[0.04] p-7 backdrop-blur-sm"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Icon
                      key={j}
                      name="star"
                      size={12}
                      className={
                        j < r.rating ? "fill-accent-yellow text-accent-yellow" : "text-white/20"
                      }
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-up-soft/80">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-yellow to-accent-glow font-display text-xs font-extrabold text-hero-950">
                    {r.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-white">{r.name}</span>
                    <span className="mt-0.5 block text-[0.68rem] text-up-soft/50">
                      {r.role} · {r.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                              8 · Before you go                              *
 * -------------------------------------------------------------------------- */

export function PathFaqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faqs" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="container-x">
        <StageHeading
          step={8}
          tone="light"
          kicker="Before you go"
          title="Questions students ask us"
          intro="Still unsure? A ten-minute call with a counsellor usually settles it faster than any brochure."
        />

        <div className="mt-14 grid gap-3 lg:grid-cols-2 lg:gap-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: EASE }}
                className={`h-fit overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-up-accent/40 bg-white" : "border-line bg-white/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                >
                  <span
                    className={`text-base font-bold transition-colors ${
                      isOpen ? "text-up-accent" : "text-up-ink"
                    }`}
                  >
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
                      isOpen
                        ? "bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950"
                        : "bg-subtle text-up-muted"
                    }`}
                  >
                    <Icon name="plus" size={15} strokeWidth={2.6} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-up-muted">{f.a}</p>
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
