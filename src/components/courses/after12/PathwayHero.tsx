"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Course } from "@/lib/courses";
import type { After12Page } from "@/lib/after12Pages";
import { categoryArt, ratingSummary } from "@/lib/coursePage";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import SectionLink from "@/components/courses/detail/SectionLink";
import { EASE } from "@/components/courses/detail/Motion";
import { GradientMesh } from "@/components/courses/after12/Motifs";

/**
 * Hero for the After-12th design.
 *
 * Opens on the reader's own situation rather than the syllabus: a huge "12th"
 * numeral behind the headline, and the programme framed as the next step from
 * it. Loud where the certificate design is formal, and deliberately the most
 * energetic of the three.
 *
 * It also carries the programme panel — title, standfirst, key highlights and
 * the two calls to action. That used to be a white band directly beneath the
 * hero, which made the reader scroll past the fold to reach the two facts they
 * came for (how long, who can join) and repeated the headline on the way.
 */

/**
 * The headline with the course name picked out in yellow.
 *
 * The title is written around the course — "Best After 12th 3-Month Cloud
 * Computing Course in Mohali" — so the words worth colouring are the ones the
 * reader searched for. Falls back to a plain headline where the record's title
 * does not appear verbatim.
 */
function splitOnCourse(title: string, courseTitle: string) {
  const at = title.toLowerCase().indexOf(courseTitle.toLowerCase());
  if (at < 0) return [{ text: title, accent: false }];
  return [
    { text: title.slice(0, at), accent: false },
    { text: title.slice(at, at + courseTitle.length), accent: true },
    { text: title.slice(at + courseTitle.length), accent: false },
  ].filter((part) => part.text.length > 0);
}

export default function PathwayHero({ course, page }: { course: Course; page: After12Page }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const art = categoryArt(course);
  const rating = ratingSummary(course);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const numeralY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const numeralOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Words carry the reveal, so the accented run is flattened to words that
  // remember whether they were part of the course name.
  const words = splitOnCourse(page.hero.title, course.title).flatMap((part) =>
    part.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, accent: part.accent })),
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-hero-950 pb-20 pt-[7.5rem] text-white lg:pb-28 lg:pt-[11.5rem]"
    >
      <GradientMesh />
      <div className="absolute inset-0 grid-lines opacity-50" />

      {/* The oversized numeral the whole page hangs off. */}
      <motion.span
        aria-hidden
        style={reduce ? undefined : { y: numeralY, opacity: numeralOpacity }}
        className="pointer-events-none absolute -right-6 top-[14%] select-none font-display text-[13rem] font-extrabold leading-none text-white/[0.04] sm:text-[20rem] lg:-right-10 lg:text-[26rem]"
      >
        12
      </motion.span>

      <motion.div className="container-x relative" style={reduce ? undefined : { y: copyY }}>
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-7 flex flex-wrap items-center gap-2 text-xs text-up-soft/55"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Icon name="arrowRight" size={11} className="opacity-50" />
          <Link href="/courses" className="transition-colors hover:text-white">
            After 12th
          </Link>
          <Icon name="arrowRight" size={11} className="opacity-50" />
          <span className="text-up-soft">{course.title}</span>
        </motion.nav>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-yellow to-accent-glow px-4 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-hero-950"
            >
              <Icon name={art.icon} size={13} />
              {page.hero.badge}
            </motion.div>

            <h1 className="max-w-4xl font-display text-[2.4rem] font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.9rem]">
              {words.map(({ word, accent }, i) => (
                <span key={`${word}-${i}`} className="inline-block overflow-hidden align-top">
                  <motion.span
                    className={`relative inline-block ${accent ? "text-accent-yellow" : ""}`}
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, delay: 0.14 + i * 0.045, ease: EASE }}
                  >
                    {word}
                    {i < words.length - 1 ? " " : ""}
                    {/* The underline draws itself once the word has landed. */}
                    {accent && (
                      <motion.span
                        aria-hidden
                        className="absolute -bottom-1 left-0 right-1.5 h-[3px] origin-left rounded-full bg-gradient-to-r from-accent-yellow to-accent-glow"
                        initial={reduce ? false : { scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.7 + i * 0.045, ease: EASE }}
                      />
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            {page.hero.paragraphs.map((p, i) => (
              <motion.p
                key={p}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: EASE }}
                className="mt-6 max-w-2xl text-base leading-relaxed text-up-soft/75 sm:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* What the reader checks before reading a word of the syllabus. */}
          <motion.aside
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-9 inline-flex flex-col items-start rounded-3xl border border-white/12 bg-white/[0.06] px-6 py-5 backdrop-blur-sm lg:mt-2"
          >
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-up-soft/60">
              Rated on Google
            </span>
            <span className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-4xl font-extrabold leading-none text-white">
                {rating.average}
              </span>
              <Icon name="star" size={20} className="fill-accent-yellow text-accent-yellow" />
            </span>
            <span className="mt-2 text-xs text-up-soft/60">{rating.reviewCount}+ reviews</span>
          </motion.aside>
        </div>

        {/* ---- The programme panel ------------------------------------------
            Everything a reader needs before deciding to scroll: what the
            course is called here, what it covers in a sentence, the facts as
            a scannable list, and the two ways to act on it. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
          className="group relative mt-12 overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-7 backdrop-blur-sm sm:p-9"
        >
          {/* A slow sheen across the panel, so the block reads as live rather
              than as a static box of facts. */}
          {!reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/[0.055] to-transparent"
              animate={{ x: ["0%", "400%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
            />
          )}

          <h2 className="relative font-display text-2xl font-extrabold leading-snug text-white sm:text-3xl">
            {page.program.title}
          </h2>
          <p className="relative mt-4 max-w-3xl text-sm leading-relaxed text-up-soft/70 sm:text-base">
            {page.program.paragraphs[0]}
          </p>

          <p className="relative mt-8 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-accent-yellow">
            {page.program.highlightsTitle}
          </p>

          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.75 } } }}
            className="relative mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2"
          >
            {page.program.highlights.map((h) => (
              <motion.div
                key={h.label}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
                }}
                className="flex items-start gap-2.5 text-sm"
              >
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-yellow" />
                <dt className="font-bold text-white">{h.label}:</dt>
                <dd className="text-up-soft/70">{h.value}</dd>
              </motion.div>
            ))}
          </motion.dl>

          <div className="relative mt-9 flex flex-wrap items-center gap-4">
            <SectionLink
              to="enquire"
              className="group/cta inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-yellow to-accent-glow px-8 py-3.5 text-sm font-extrabold text-hero-950 shadow-[0_0_36px_-8px_rgba(0,212,255,0.8)] transition-transform hover:-translate-y-0.5"
            >
              Enrol now
              <Icon
                name="arrowRight"
                size={16}
                className="transition-transform group-hover/cta:translate-x-1"
              />
            </SectionLink>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5"
            >
              Book a free demo
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-up-soft/70 transition-colors hover:text-white"
            >
              <Icon name="phone" size={15} /> Talk to a counsellor
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
