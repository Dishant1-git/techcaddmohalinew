"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import type { WrittenCard, WrittenCertificatePage } from "@/lib/certificateWritten";
import type { WrittenHeading } from "@/lib/content/mernCertificate";
import Icon from "@/components/ui/Icon";
import SectionLink from "@/components/courses/detail/SectionLink";
import { EASE } from "@/components/courses/detail/Motion";
import { Guilloche, Seal } from "@/components/courses/certificate/Motifs";
import { RuledHeading, Wipe } from "@/components/courses/certificate/CertificateSections";

/**
 * The sections only a written certificate programme has.
 *
 * The eight numbered sections in `CertificateSections.tsx` are derived from the
 * course record, so every programme in the catalogue can render them. A
 * programme handed a written brief has more to say than those eight sections
 * ask for — the award it hands over, where the course leads, the projects that
 * get shipped, how it compares to the other institutes in town, the ways it is
 * taught, and a closing call — and this file is where that copy lives rather
 * than being folded into a neighbouring section and paraphrased to fit.
 *
 * Each one renders only when `certificateWritten()` returned content for it, so
 * a programme without a written brief is unchanged: it renders the eight it
 * always did, and none of these.
 *
 * Same register as the sections file — ruled headings, roman numerals, articles
 * rather than cards, and the ink wipe as the motion signature — reusing
 * `RuledHeading` and `Wipe` so the page reads as one document.
 */

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/* -------------------------------------------------------------------------- *
 *                               Certification                                 *
 * -------------------------------------------------------------------------- */

/**
 * What the holder walks away with.
 *
 * Dark ground and a seal: this is the ceremonial section of the page, and the
 * one the reader came to the Certificate Programs menu for.
 */
export function CertCertification({
  items,
  heading,
}: {
  items: WrittenCard[];
  heading?: WrittenHeading;
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id="certification"
      className="relative scroll-mt-36 overflow-hidden bg-up-ink py-20 text-white lg:py-28"
    >
      <Guilloche className="pointer-events-none absolute -left-40 top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 text-white/[0.06]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_85%_0%,rgba(255,210,63,0.12),transparent_62%)]" />

      <div className="container-x relative">
        <RuledHeading
          index={heading?.index ?? "07"}
          tone="dark"
          eyebrow={heading?.eyebrow ?? "The award"}
          title={heading?.title ?? "Certification"}
          intro={heading?.intro}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          <div className="grid gap-x-14 gap-y-9 sm:grid-cols-2">
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: (i % 2) * 0.1, ease: EASE }}
                className="group border-t border-white/15 pt-7"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-up-gold/50 text-up-gold transition-colors group-hover:bg-up-gold group-hover:text-hero-950">
                    <Icon name={item.icon} size={16} />
                  </span>
                  <span className="font-display text-sm font-extrabold tabular-nums text-up-gold/60">
                    {ROMAN[i] ?? i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-up-soft/70">{item.body}</p>
              </motion.div>
            ))}
          </div>

          {/* The seal, set as the counter-signature on the section. */}
          <Wipe delay={0.2}>
            <div className="flex h-full flex-col justify-between gap-8 border border-white/15 bg-white/[0.04] p-8">
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-up-soft/60">
                  Issued by
                </p>
                <p className="mt-2 font-display text-xl font-extrabold text-white">
                  {site.legalName}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-up-soft/70">
                  Verifiable by roll number, so a recruiter can confirm your record with the
                  institute — soft copy in your student portal, hard copy at the campus.
                </p>
              </div>
              <div className="flex items-end justify-between gap-6">
                <SectionLink
                  to="enquire"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-up-gold"
                >
                  Ask about the paperwork
                  <Icon
                    name="arrowRight"
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </SectionLink>
                <Seal size={92} />
              </div>
            </div>
          </Wipe>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                        Where this course takes you                          *
 * -------------------------------------------------------------------------- */

/**
 * The brief writes its future-scope section as questions, so it renders as
 * questions — a ruled register of answers rather than a grid of role cards.
 */
export function CertScope({
  items,
  heading,
}: {
  items: { q: string; a: string }[];
  heading?: WrittenHeading;
}) {
  const reduce = useReducedMotion();

  return (
    <section id="scope" className="relative scroll-mt-36 bg-white py-20 lg:py-28">
      <div className="container-x">
        <RuledHeading
          index={heading?.index ?? "08"}
          eyebrow={heading?.eyebrow ?? "Future scope"}
          title={heading?.title ?? "Where this course takes you"}
          intro={heading?.intro}
        />

        <div className="mt-14 border-t border-up-line">
          {items.map((item, i) => (
            <motion.div
              key={item.q}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              className="grid gap-3 border-b border-up-line py-7 lg:grid-cols-[0.9fr_1.6fr] lg:gap-12"
            >
              <div className="flex items-start gap-4">
                <span className="font-display text-sm font-extrabold tabular-nums text-up-gold">
                  {ROMAN[i] ?? i + 1}
                </span>
                <h3 className="font-display text-lg font-extrabold leading-snug text-up-ink">
                  {item.q}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-up-ink/75 lg:text-base">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                      Hands-on projects you will ship                        *
 * -------------------------------------------------------------------------- */

export function CertProjects({
  items,
  heading,
}: {
  items: { label: string; title: string; body: string }[];
  heading?: WrittenHeading;
}) {
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="relative scroll-mt-36 overflow-hidden bg-subtle py-20 lg:py-28">
      <Guilloche className="pointer-events-none absolute -right-32 -bottom-24 h-[30rem] w-[30rem] text-up-accent/[0.06]" />

      <div className="container-x relative">
        <RuledHeading
          index={heading?.index ?? "09"}
          eyebrow={heading?.eyebrow ?? "Deliverables"}
          title={heading?.title ?? "Hands-on projects you will ship"}
          intro={heading?.intro}
        />

        <div className="mt-14 grid gap-px bg-up-line sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: (i % 2) * 0.09, ease: EASE }}
              className="group relative overflow-hidden bg-white p-8 transition-colors hover:bg-brand-50/40 sm:p-9"
            >
              {/* A gold rule that draws in as the card is hovered — the sheet
                  being signed off. */}
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-up-gold transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex items-center gap-4">
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-up-accent">
                  {item.label}
                </span>
                <span className="h-px flex-1 bg-up-line" />
                <span className="font-display text-sm font-extrabold tabular-nums text-up-muted/60">
                  {ROMAN[i] ?? i + 1}
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-extrabold leading-tight text-up-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-up-muted">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *             Why students choose this institute, and how it compares         *
 * -------------------------------------------------------------------------- */

/**
 * The five differences, then the comparison table they summarise.
 *
 * The table is a table: it is a row-by-row comparison and every other shape —
 * cards, a list, prose — loses the thing that makes it readable, which is that
 * the two columns line up.
 */
export function CertInstitute({
  items,
  comparison,
  heading,
}: {
  items: WrittenCard[];
  comparison: WrittenCertificatePage["comparison"];
  heading?: WrittenHeading;
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id="institute"
      className="relative scroll-mt-36 overflow-hidden bg-up-ink py-20 text-white lg:py-28"
    >
      <Guilloche className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] text-white/[0.06]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_12%_10%,rgba(28,83,209,0.35),transparent_62%)]" />

      <div className="container-x relative">
        <RuledHeading
          index={heading?.index ?? "10"}
          tone="dark"
          eyebrow={heading?.eyebrow ?? "The comparison"}
          title={heading?.title ?? "Why students choose this institute"}
          intro={heading?.intro}
        />

        <div className="mt-14 grid gap-x-14 gap-y-9 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: (i % 2) * 0.1, ease: EASE }}
              className="group flex gap-5 border-t border-white/15 pt-7"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-up-gold transition-colors group-hover:border-up-gold group-hover:bg-up-gold group-hover:text-hero-950">
                <Icon name={item.icon} size={17} />
              </span>
              <div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-up-soft/70">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ---- How it compares ------------------------------------------- */}
        {comparison && (
        <div className="mt-16">
          <div className="flex items-center gap-4">
            <span className="text-[0.66rem] font-bold uppercase tracking-[0.26em] text-up-soft/70">
              {comparison.title}
            </span>
            <motion.span
              className="h-px flex-1 origin-left bg-white/20"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>

          {/* The table scrolls sideways on a phone rather than wrapping into
              something that no longer lines up. */}
          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="w-[22%] py-4 pr-6 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-up-soft/60">
                    Feature
                  </th>
                  <th className="w-[42%] py-4 pr-6 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-up-gold">
                    {comparison.ours}
                  </th>
                  <th className="py-4 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-up-soft/60">
                    {comparison.theirs}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, i) => (
                  <motion.tr
                    key={row.feature}
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="border-b border-white/10 align-top transition-colors hover:bg-white/[0.04]"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-6 text-sm font-semibold text-white/90"
                    >
                      {row.feature}
                    </th>
                    <td className="py-4 pr-6 text-sm text-up-soft/85">
                      <span className="flex items-start gap-2.5">
                        <Icon
                          name="check"
                          size={13}
                          strokeWidth={3.2}
                          className="mt-0.5 shrink-0 text-up-gold"
                        />
                        {row.ours}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-up-soft/50">{row.theirs}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *                               Learning modes                                *
 * -------------------------------------------------------------------------- */

/**
 * The four ways the same syllabus is delivered.
 *
 * One is open at a time: they are alternatives, and a reader picking between
 * them is better served by reading one at a time than by four equal blocks.
 */
export function CertModes({
  items,
  heading,
}: {
  items: WrittenCard[];
  heading?: WrittenHeading;
}) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="modes" className="relative scroll-mt-36 bg-white py-20 lg:py-28">
      <div className="container-x">
        <RuledHeading
          index={heading?.index ?? "11"}
          eyebrow={heading?.eyebrow ?? "How it is taught"}
          title={heading?.title ?? "Learning modes"}
          intro={heading?.intro}
        />

        <div className="mt-14 border-t border-up-line">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.article
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                className={`border-b border-up-line transition-colors ${
                  isOpen ? "bg-subtle" : "hover:bg-subtle/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 px-2 py-6 text-left sm:px-6"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors ${
                      isOpen
                        ? "border-up-gold bg-up-gold text-up-ink"
                        : "border-up-line text-up-accent"
                    }`}
                  >
                    <Icon name={item.icon} size={17} />
                  </span>

                  <span className="flex-1">
                    <span className="block font-display text-lg font-extrabold text-up-ink sm:text-xl">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.14em] text-up-muted">
                      Mode {ROMAN[i] ?? i + 1} of {items.length}
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
                      <p className="max-w-2xl px-2 pb-8 text-sm leading-relaxed text-up-ink/75 sm:px-6 sm:pl-[4rem]">
                        {item.body}
                      </p>
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
 *                             The closing call                                *
 * -------------------------------------------------------------------------- */

/** The brief's last word, after the enquiry form. */
export function CertClosing({
  closing,
}: {
  closing: WrittenCertificatePage["closing"];
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-hero-950 py-20 text-white lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(255,210,63,0.14),transparent_62%)]" />
      <Guilloche className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 text-white/[0.05]" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: EASE }}
        className="container-x relative text-center"
      >
        <span className="mx-auto flex max-w-xs items-center gap-4">
          <span className="h-px flex-1 bg-white/20" />
          <Seal size={64} />
          <span className="h-px flex-1 bg-white/20" />
        </span>

        <h2 className="mt-8 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
          {closing.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-up-soft/75">
          {closing.body}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <SectionLink
            to="enquire"
            className="group inline-flex items-center gap-2 border-2 border-up-gold bg-up-gold px-8 py-4 text-sm font-bold tracking-wide text-hero-950 transition-all hover:-translate-y-0.5 hover:bg-transparent hover:text-up-gold"
          >
            {closing.primaryCta}
            <Icon
              name="arrowRight"
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </SectionLink>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 border-2 border-white/25 px-8 py-4 text-sm font-bold tracking-wide text-white transition-colors hover:border-up-gold hover:text-up-gold"
          >
            <Icon name="phone" size={15} /> {closing.secondaryCta}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
