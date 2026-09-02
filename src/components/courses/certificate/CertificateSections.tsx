"use client";

import { type ReactNode, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
import { Guilloche, Seal } from "@/components/courses/certificate/Motifs";

/**
 * The credential design's nine sections.
 *
 * Same section contract as the catalogue page — overview, modules, what you
 * learn, why, who, tools, reviews, FAQs, enquire — presented as a formal
 * document: ruled headings, articles rather than cards, roman numerals, and an
 * ink-wipe as the motion signature instead of the catalogue page's fades.
 */

/* -------------------------------------------------------------------------- *
 *                              Shared furniture                               *
 * -------------------------------------------------------------------------- */

/** An ink wipe, left to right — the motion signature of this design. */
function Wipe({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.95, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** A ruled section heading, set like a clause title in a formal document. */
function RuledHeading({
  index,
  eyebrow,
  title,
  intro,
  tone = "light",
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const reduce = useReducedMotion();

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4">
        <span
          className={`font-display text-[0.7rem] font-bold tabular-nums tracking-[0.2em] ${
            dark ? "text-up-gold" : "text-up-accent"
          }`}
        >
          {index}
        </span>
        <span
          className={`text-[0.66rem] font-bold uppercase tracking-[0.26em] ${
            dark ? "text-up-soft/70" : "text-up-muted"
          }`}
        >
          {eyebrow}
        </span>
        <motion.span
          className={`h-px flex-1 origin-left ${dark ? "bg-white/20" : "bg-up-line"}`}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>

      <Wipe delay={0.1}>
        <h2
          className={`mt-5 font-display text-3xl font-extrabold leading-[1.14] sm:text-4xl ${
            dark ? "text-white" : "text-up-ink"
          }`}
        >
          {title}
        </h2>
      </Wipe>

      {intro && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className={`mt-4 text-base leading-relaxed ${dark ? "text-up-soft/75" : "text-up-muted"}`}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/* -------------------------------------------------------------------------- *
 *                              1 · Programme brief                            *
 * -------------------------------------------------------------------------- */

export function CertOverview({ course }: { course: Course }) {
  const reduce = useReducedMotion();

  const particulars: [string, string][] = [
    ["Programme", course.title],
    ["Duration", course.duration],
    ["Level", course.level],
    ["Modules", `${course.modules.length}`],
    ["Mode", "Classroom / Live online"],
    ["Award", "ISO-certified certificate"],
    ["Centre", "Sector 75, Mohali"],
  ];

  return (
    <section id="overview" className="relative scroll-mt-36 overflow-hidden bg-white py-20 lg:py-28">
      <div className="container-x">
        <RuledHeading
          index="01"
          eyebrow="Programme brief"
          title="What this certificate covers"
          intro={`A ${course.duration.toLowerCase()} ${course.level.toLowerCase()} programme, assessed on project work and closed with a verifiable credential.`}
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          {/* Body copy, opened with a drop cap. */}
          <Wipe delay={0.15}>
            <p className="text-base leading-[1.9] text-up-ink/80 [&::first-letter]:float-left [&::first-letter]:mr-3 [&::first-letter]:mt-1 [&::first-letter]:font-display [&::first-letter]:text-[3.4rem] [&::first-letter]:font-extrabold [&::first-letter]:leading-[0.8] [&::first-letter]:text-up-accent">
              {course.overview}
            </p>

            <div className="mt-10 border-t border-up-line pt-8">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-up-muted">
                On completion, the holder can
              </p>
              <ul className="mt-5 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {course.outcomes.map((o, i) => (
                  <motion.li
                    key={o}
                    initial={reduce ? false : { opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                    className="flex items-start gap-3 text-sm leading-relaxed text-up-ink/80"
                  >
                    <Icon
                      name="check"
                      size={14}
                      strokeWidth={3}
                      className="mt-1 shrink-0 text-up-gold"
                    />
                    {o}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Wipe>

          {/* Particulars, set as a formal record rather than a card. */}
          <div className="relative">
            <Guilloche className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 text-up-accent/10" />
            <div className="relative border border-up-line bg-subtle p-7">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-up-muted">
                Particulars
              </p>
              <dl className="mt-5">
                {particulars.map(([k, v], i) => (
                  <motion.div
                    key={k}
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="flex items-baseline justify-between gap-4 border-b border-dotted border-up-line py-2.5 last:border-0"
                  >
                    <dt className="shrink-0 text-[0.7rem] uppercase tracking-wider text-up-muted">
                      {k}
                    </dt>
                    <dd className="text-right text-sm font-semibold text-up-ink">{v}</dd>
                  </motion.div>
                ))}
              </dl>

              <div className="mt-7 flex items-center justify-between gap-4 border-t border-up-line pt-6">
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-up-muted">
                    Awarded by
                  </p>
                  <p className="mt-1 text-sm font-bold text-up-ink">techcadd Mohali</p>
                </div>
                <Seal size={78} />
              </div>
            </div>

            <SectionLink
              to="enquire"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-up-accent"
            >
              Register for this programme
              <Icon
                name="arrowRight"
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </SectionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                            2 · Syllabus of record                           *
 * -------------------------------------------------------------------------- */

export function CertModules({ course }: { course: Course }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const topics = course.modules.reduce((n, m) => n + m.points.length, 0);

  return (
    <section id="modules" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="container-x">
        <RuledHeading
          index="02"
          eyebrow="Syllabus of record"
          title="The articles of this programme"
          intro={`${course.modules.length} modules and ${topics} topics. Each one is assessed, and each closes in work that goes into the portfolio submitted with the certificate.`}
        />

        <div className="mt-14 border-t border-up-line">
          {course.modules.map((m, i) => {
            const isOpen = open === i;
            return (
              <motion.article
                key={m.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                className={`border-b border-up-line transition-colors ${
                  isOpen ? "bg-white" : "hover:bg-white/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-6 px-2 py-6 text-left sm:px-6"
                >
                  <span
                    className={`w-10 shrink-0 font-display text-lg font-extrabold tabular-nums transition-colors ${
                      isOpen ? "text-up-gold" : "text-up-line"
                    }`}
                  >
                    {ROMAN[i] ?? i + 1}
                  </span>

                  <span className="flex-1">
                    <span className="block font-display text-lg font-extrabold text-up-ink sm:text-xl">
                      {m.title}
                    </span>
                    <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.14em] text-up-muted">
                      Article {ROMAN[i] ?? i + 1} · {m.points.length} topics
                    </span>
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="shrink-0 text-up-muted"
                  >
                    <Icon name="chevronDown" size={18} />
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
                      <ul className="grid gap-x-10 gap-y-2.5 px-2 pb-8 sm:grid-cols-2 sm:px-6 sm:pl-[4rem]">
                        {m.points.map((p, j) => (
                          <motion.li
                            key={p}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: j * 0.04 }}
                            className="flex items-start gap-3 border-b border-dotted border-up-line/70 pb-2.5 text-sm text-up-ink/75"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-up-gold" />
                            {p}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                           3 · Competencies certified                        *
 * -------------------------------------------------------------------------- */

export function CertLearn({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const points = learningPoints(course);

  return (
    <section id="learn" className="relative scroll-mt-36 bg-white py-20 lg:py-28">
      <div className="container-x">
        <RuledHeading
          index="03"
          eyebrow="Competencies certified"
          title="What you learn in this programme"
          intro="Every competency below is taught hands-on and assessed before the certificate is issued."
        />

        <div className="mt-14 grid gap-x-12 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <motion.div
              key={`${p.point}-${i}`}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
              className="group flex items-start gap-4 border-b border-up-line py-5"
            >
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-up-line text-up-accent transition-colors group-hover:border-up-gold group-hover:bg-up-gold group-hover:text-up-ink">
                <Icon name="check" size={11} strokeWidth={3.4} />
              </span>
              <div>
                <p className="text-sm font-semibold leading-snug text-up-ink">{p.point}</p>
                <p className="mt-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-up-muted/80">
                  {p.module}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                         4 · Why this credential holds                       *
 * -------------------------------------------------------------------------- */

export function CertWhy({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const reasons = whyChoose(course);

  return (
    <section
      id="why"
      className="relative scroll-mt-36 overflow-hidden bg-up-ink py-20 text-white lg:py-28"
    >
      <Guilloche className="pointer-events-none absolute -right-32 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 text-white/[0.07]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_0%,rgba(255,210,63,0.10),transparent_60%)]" />

      <div className="container-x relative">
        <RuledHeading
          index="04"
          tone="dark"
          eyebrow="Standing"
          title="Why this certificate carries weight"
          intro="A credential is only worth the work behind it. This is the work behind this one."
        />

        <div className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: (i % 2) * 0.1, ease: EASE }}
              className="group flex gap-6 border-t border-white/15 pt-7"
            >
              <span className="font-display text-2xl font-extrabold tabular-nums text-up-gold/70 transition-colors group-hover:text-up-gold">
                {ROMAN[i] ?? i + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">{r.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-up-soft/70">{r.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                          5 · Eligibility & admission                        *
 * -------------------------------------------------------------------------- */

export function CertWho({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const audience = whoCanJoin(course);
  const criteria = eligibility(course);

  return (
    <section id="who" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="container-x">
        <RuledHeading
          index="05"
          eyebrow="Eligibility & admission"
          title="Who this programme admits"
          intro={`${course.title} is a ${course.level.toLowerCase()} programme. These are the candidates it is written for.`}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="grid gap-px bg-up-line sm:grid-cols-2">
            {audience.map((a, i) => (
              <motion.div
                key={a.title}
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.09 }}
                className="group bg-white p-7 transition-colors hover:bg-brand-50/40"
              >
                <div className="flex items-center gap-3">
                  <Icon name={a.icon} size={19} className="text-up-accent" />
                  <span className="h-px flex-1 bg-up-line" />
                  <span className="font-display text-[0.7rem] font-bold tabular-nums text-up-muted/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold text-up-ink">{a.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{a.body}</p>
              </motion.div>
            ))}
          </div>

          <Wipe delay={0.15}>
            <div className="border border-up-line bg-white p-8">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-up-muted">
                Conditions of admission
              </p>
              <ul className="mt-6 space-y-4">
                {criteria.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-up-ink/80">
                    <Icon
                      name="check"
                      size={13}
                      strokeWidth={3.2}
                      className="mt-1 shrink-0 text-up-gold"
                    />
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-up-line pt-6">
                <p className="text-sm leading-relaxed text-up-muted">
                  Unsure whether your background qualifies? A ten-minute counselling call settles
                  it — no obligation.
                </p>
                <SectionLink
                  to="enquire"
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-up-accent"
                >
                  Speak to admissions
                  <Icon
                    name="arrowRight"
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </SectionLink>
              </div>
            </div>
          </Wipe>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                          6 · Instruments & software                         *
 * -------------------------------------------------------------------------- */

export function CertTools({ course }: { course: Course }) {
  const reduce = useReducedMotion();

  return (
    <section id="tools" className="relative scroll-mt-36 bg-white py-20 lg:py-28">
      <div className="container-x">
        <RuledHeading
          index="06"
          eyebrow="Instruments & software"
          title="The stack examined in this programme"
          intro="Licensed in every lab, and named on the syllabus record issued with your certificate."
        />

        <div className="mt-14 border border-up-line bg-subtle p-8 sm:p-10">
          <div className="flex flex-wrap gap-x-3 gap-y-3">
            {course.tools.map((t, i) => {
              const mark = techMarkFor(t);
              return (
                <motion.span
                  key={t}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.035, ease: EASE }}
                  className="group inline-flex cursor-default items-center gap-2.5 border border-up-line bg-white px-4 py-2.5 text-sm font-medium text-up-ink/85 transition-colors hover:border-up-ink"
                >
                  {mark ? (
                    <TechMark name={mark} size={17} className="shrink-0" />
                  ) : (
                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-up-gold" />
                  )}
                  {t}
                </motion.span>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-up-line pt-6 text-[0.7rem] uppercase tracking-[0.12em] text-up-muted">
            {["Licensed lab software", "Campus practice systems", "Setup help for your laptop"].map(
              (f) => (
                <span key={f} className="inline-flex items-center gap-2">
                  <Icon name="check" size={12} strokeWidth={3} className="text-up-accent" />
                  {f}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                               7 · Alumni record                             *
 * -------------------------------------------------------------------------- */

export function CertReviews({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const reviews = courseReviews(course);
  const { average, reviewCount, buckets } = ratingBreakdown(course);

  return (
    <section id="reviews" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="container-x">
        <RuledHeading
          index="07"
          eyebrow="Alumni record"
          title="What holders of this certificate say"
          intro="Graduates of this programme, on what made the difference once they were in interviews."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Wipe>
            <div className="border border-up-line bg-white p-7">
              <p className="font-display text-5xl font-extrabold leading-none text-up-ink">
                {average}
              </p>
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    size={14}
                    className="fill-accent-yellow text-accent-yellow"
                  />
                ))}
              </div>
              <p className="mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-up-muted">
                {reviewCount} recorded reviews
              </p>

              <div className="mt-6 space-y-2 border-t border-up-line pt-5">
                {buckets.map((b, i) => (
                  <div key={b.stars} className="flex items-center gap-2.5">
                    <span className="w-2 text-[0.66rem] tabular-nums text-up-muted">{b.stars}</span>
                    <span className="h-1 flex-1 overflow-hidden bg-up-line/60">
                      <motion.span
                        className="block h-full bg-up-ink"
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${b.percent}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: EASE }}
                      />
                    </span>
                    <span className="w-8 text-right text-[0.66rem] tabular-nums text-up-muted/80">
                      {b.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Wipe>

          <div>
            {reviews.map((r, i) => (
              <motion.figure
                key={`${r.name}-${r.role}`}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="border-t border-up-line py-7 first:border-t-0 first:pt-0"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Icon
                      key={j}
                      name="star"
                      size={12}
                      className={
                        j < r.rating ? "fill-accent-yellow text-accent-yellow" : "text-up-line"
                      }
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-relaxed text-up-ink/80">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.12em] text-up-muted">
                  <span className="font-bold text-up-ink">{r.name}</span>
                  <span className="h-px w-6 bg-up-line" />
                  <span>
                    {r.role} · {r.company}
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
 *                            8 · Notes & conditions                           *
 * -------------------------------------------------------------------------- */

export function CertFaqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faqs" className="relative scroll-mt-36 bg-white py-20 lg:py-28">
      <div className="container-x">
        <RuledHeading
          index="08"
          eyebrow="Notes & conditions"
          title="Questions about this certificate"
          intro="Still unsure? A ten-minute call with a counsellor usually settles it faster than any brochure."
        />

        <div className="mt-14 border-t border-up-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-b border-up-line"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-6 py-6 text-left"
                >
                  <span className="mt-0.5 w-8 shrink-0 font-display text-[0.7rem] font-bold tabular-nums text-up-muted/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 text-base font-semibold transition-colors ${
                      isOpen ? "text-up-accent" : "text-up-ink"
                    }`}
                  >
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="shrink-0 text-up-muted"
                  >
                    <Icon name="chevronDown" size={17} />
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
                      <p className="max-w-3xl pb-7 pl-14 text-sm leading-relaxed text-up-muted">
                        {f.a}
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
