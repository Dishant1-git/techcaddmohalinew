"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { Course } from "@/lib/courses";
import { courseReviews, ratingBreakdown } from "@/lib/coursePage";
import Icon from "@/components/ui/Icon";
import SectionLink from "@/components/courses/detail/SectionLink";
import { EASE } from "@/components/courses/detail/Motion";
import { GradientMesh, StepBadge } from "@/components/courses/after12/Motifs";

/**
 * The After-12th design's shared furniture and its two record-driven sections.
 *
 * The stages themselves live in `PathwayWritten` — every slug on this route
 * now renders the same written shape, hand-written where one exists and
 * derived from the catalogue record otherwise. What stays here is what those
 * stages are built out of (the heading, the tilt card, the step badge) plus
 * reviews, FAQs and the mid-page call to an advisor, which read the course
 * record rather than the page copy.
 */

/* -------------------------------------------------------------------------- *
 *                              Shared furniture                               *
 * -------------------------------------------------------------------------- */

export function StageHeading({
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
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
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
 *                        The mid-page call to an advisor                      *
 * -------------------------------------------------------------------------- */

/**
 * The mid-page interruption.
 *
 * It carries no step badge on purpose: the rail counts the stages of the
 * programme, and this is not one of them — it is the moment the reader is
 * offered a phone call instead of more reading. It lives here with the rest of
 * the shared furniture, so `PathwayWritten` can use it the same way it uses
 * <StageHeading/> rather than the two files reaching into each other.
 */
export function PathAdvisor({
  advisor,
}: {
  advisor: { title: string; body: string; cta: string };
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-hero-950 py-16 text-white lg:py-20">
      <GradientMesh className="opacity-70" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="container-x relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl lg:text-[2.1rem]">
            {advisor.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-up-soft/75 sm:text-base">
            {advisor.body}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-4">
          <SectionLink
            to="enquire"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-yellow to-accent-glow px-7 py-3.5 text-sm font-bold text-hero-950 shadow-lg shadow-accent-glow/20 transition-transform duration-300 hover:-translate-y-0.5"
          >
            {advisor.cta}
            <Icon
              name="arrowRight"
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </SectionLink>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/5"
          >
            <Icon name="phone" size={15} />
            Call the centre
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                            7 · Who has walked it                            *
 * -------------------------------------------------------------------------- */

export function PathReviews({ course, step = 7 }: { course: Course; step?: number }) {
  const reduce = useReducedMotion();
  const reviews = courseReviews(course);
  const { average, reviewCount, buckets } = ratingBreakdown(course);

  return (
    <section
      id="reviews"
      /* `overflow-clip`, not `overflow-hidden`: hidden would make this section
         the nearest scrollport and the summary card below would never stick.
         Clip bounds the motifs the same way without creating one — and the
         mesh clips itself anyway. */
      className="relative scroll-mt-36 overflow-clip bg-hero-950 py-20 text-white lg:py-28"
    >
      <GradientMesh className="opacity-55" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <StageHeading
          step={step}
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
            /* `self-start` so the card is as tall as its own content rather
               than stretched to the height of the review grid beside it, and
               sticky from that height so it holds the score in view while the
               quotes scroll past. Below lg the two stack, so neither applies. */
            className="rounded-3xl border border-white/12 bg-white/[0.05] p-8 backdrop-blur-sm lg:sticky lg:top-28 lg:self-start"
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

export function PathFaqs({
  faqs,
  step = 8,
  title = "Questions students ask us",
}: {
  faqs: { q: string; a: string }[];
  step?: number;
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faqs" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="container-x">
        <StageHeading
          step={step}
          tone="light"
          kicker="Before you go"
          title={title}
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
