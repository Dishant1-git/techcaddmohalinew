"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
 *                     Key highlights, straight under the hero                 *
 * -------------------------------------------------------------------------- */

export function WrittenProgram({ program }: { program: After12Page["program"] }) {
  const reduce = useReducedMotion();

  return (
    <section id="program" className="relative scroll-mt-36 bg-white py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-3xl font-extrabold leading-[1.1] text-up-ink sm:text-4xl"
          >
            {program.title}
          </motion.h2>

          {program.paragraphs.map((p, i) => (
            <motion.p
              key={p}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE }}
              className="mt-5 text-base leading-[1.85] text-up-muted"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div>
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-up-accent">
            {program.highlightsTitle}
          </p>

          <dl className="mt-6 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-subtle">
            {program.highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={reduce ? false : { opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-6 py-4 transition-colors hover:bg-white"
              >
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-up-muted">
                  {h.label}
                </dt>
                <dd className="text-sm font-bold text-up-ink sm:text-right">{h.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

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

  return (
    <section id="learn" className="relative scroll-mt-36 bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative">
        <StageHeading
          step={step}
          tone="light"
          kicker="Skills you collect"
          title={learn.title}
          intro={learn.intro}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learn.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? false : { opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 220, damping: 24, delay: (i % 3) * 0.06 }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-subtle p-6 transition-colors hover:border-up-accent/40 hover:bg-white"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-yellow to-accent-glow font-display text-[0.7rem] font-extrabold text-hero-950">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug text-up-ink">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{item.body}</p>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
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

  return (
    <section id="tools" className="relative scroll-mt-36 bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative">
        <StageHeading step={step} tone="light" kicker="Your toolkit" title={tools.title} />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.items.map((t, i) => {
            const mark = techMarkFor(t.name);
            return (
              <motion.div
                key={t.name}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: EASE }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-line bg-subtle p-6 transition-colors hover:border-up-accent/40 hover:bg-white"
              >
                <span className="flex items-center gap-2.5">
                  {mark ? (
                    <TechMark name={mark} size={20} className="shrink-0" />
                  ) : (
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-accent-yellow to-accent-glow" />
                  )}
                  <span className="font-display text-base font-extrabold text-up-ink">
                    {t.name}
                  </span>
                </span>
                <p className="mt-3 text-sm leading-relaxed text-up-muted">{t.body}</p>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </div>
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
      <div className="container-x">
        <StageHeading step={step} tone="light" kicker="Is this you?" title={who.title} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {who.items.map((a, i) => (
            <motion.div
              key={a.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 transition-colors hover:border-up-accent/40"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-hero-600 to-hero-glow text-white">
                <Icon name={a.icon ?? "users"} size={21} />
              </span>
              <h3 className="mt-5 text-base font-bold text-up-ink">{a.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{a.body}</p>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
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
  return (
    <section
      id="worth"
      className="relative scroll-mt-36 overflow-hidden bg-hero-950 py-20 text-white lg:py-28"
    >
      <GradientMesh className="opacity-70" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <StageHeading step={step} kicker="Why this one" title={worth.title} />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {worth.items.map((r, i) => (
            <TiltCard
              key={r.title}
              className="group h-full rounded-3xl border border-white/12 bg-white/[0.05] p-7 backdrop-blur-sm transition-colors hover:border-accent-glow/45"
            >
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
            </TiltCard>
          ))}
        </div>
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

        <p className="mt-12 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-accent-yellow">
          {takesYou.listTitle}
        </p>

        <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {takesYou.steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
              className="relative rounded-3xl border border-white/12 bg-white/[0.05] p-7 backdrop-blur-sm"
            >
              <span className="font-display text-[0.7rem] font-extrabold tabular-nums text-accent-yellow">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-extrabold leading-tight text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-up-soft/70">{s.body}</p>

              {i < takesYou.steps.length - 1 && (
                <Icon
                  name="arrowRight"
                  size={18}
                  aria-hidden
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-accent-glow/60 lg:block"
                />
              )}
            </motion.li>
          ))}
        </ol>
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
}: {
  step: number;
  approach: After12Page["approach"];
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
            </motion.div>
          ))}
        </div>
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
