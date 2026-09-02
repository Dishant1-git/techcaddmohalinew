"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Course } from "@/lib/courses";
import { categoryArt, courseHighlights, ratingSummary } from "@/lib/coursePage";
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
 */
export default function PathwayHero({ course }: { course: Course }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const art = categoryArt(course);
  const rating = ratingSummary(course);
  const highlights = courseHighlights(course);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const numeralY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const numeralOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = `${course.title} after 12th`.split(" ");

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-hero-950 pb-24 pt-[7.5rem] text-white lg:pb-32 lg:pt-[11.5rem]"
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

      <motion.div
        className="container-x relative"
        style={reduce ? undefined : { y: copyY }}
      >
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

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-yellow to-accent-glow px-4 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-hero-950">
            <Icon name={art.icon} size={13} />
            Start right after school
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-up-soft/70">
            <Icon name="star" size={13} className="fill-accent-yellow text-accent-yellow" />
            <strong className="font-bold text-white">{rating.average}</strong>
            <span className="opacity-70">({rating.reviewCount} reviews)</span>
          </span>
        </motion.div>

        <h1 className="max-w-4xl font-display text-[2.6rem] font-extrabold leading-[1.03] sm:text-6xl lg:text-[4.4rem]">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden align-top">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.14 + i * 0.055, ease: EASE }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-up-soft/75 sm:text-lg"
        >
          {course.blurb} No degree required to begin — this programme takes you from school-leaver
          to hireable.
        </motion.p>

        {/* Route preview: the four stages, as a horizontal run. */}
        <motion.ol
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.5 } } }}
          className="mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {highlights.map((h, i) => (
            <motion.li
              key={h.label}
              variants={{
                hidden: { opacity: 0, y: 26 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] p-5 backdrop-blur-sm transition-colors hover:border-accent-glow/50"
            >
              <span className="font-display text-[0.7rem] font-extrabold tabular-nums text-accent-yellow">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-display text-base font-extrabold leading-tight text-white">
                {h.value}
              </p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-wider text-up-soft/50">
                {h.label}
              </p>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="mt-11 flex flex-wrap items-center gap-4"
        >
          <SectionLink
            to="enquire"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-yellow to-accent-glow px-8 py-4 text-sm font-extrabold text-hero-950 shadow-[0_0_36px_-8px_rgba(0,212,255,0.8)] transition-transform hover:-translate-y-0.5"
          >
            Start my journey
            <Icon
              name="arrowRight"
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </SectionLink>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5"
          >
            <Icon name="phone" size={16} /> Talk to a counsellor
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
