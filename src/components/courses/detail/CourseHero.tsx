"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { Course } from "@/lib/courses";
import { courseHighlights } from "@/lib/coursePage";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import { EASE } from "@/components/courses/detail/Motion";
import SectionLink from "@/components/courses/detail/SectionLink";
import CircuitRibbon from "@/components/courses/detail/CircuitRibbon";

/**
 * The dark hero at the top of a course page.
 *
 * Two scroll-linked layers give it depth without a library of its own: the copy
 * drifts up and fades as you leave, while the glow blobs and grid move at a
 * different rate behind it. Both collapse to static when reduced motion is on.
 */
export default function CourseHero({
  course,
  categoryLabel,
  rating,
}: {
  course: Course;
  categoryLabel: string;
  rating: { average: string; reviewCount: number };
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const copyY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 90]), {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const highlights = courseHighlights(course);
  const words = `${course.title} course in Mohali`.split(" ");

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-hero-950 pb-24 pt-[7.5rem] text-white lg:pb-32 lg:pt-[12rem]"
    >
      {/* ---- Backdrop ---------------------------------------------------- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_15%_0%,#123285_0%,transparent_60%),radial-gradient(ellipse_60%_60%_at_90%_35%,#1c53d1_0%,transparent_55%)] opacity-90" />

      <motion.div
        className="absolute inset-0 grid-lines"
        style={reduce ? undefined : { y: gridY }}
      />

      {/* Depth only — the glows drift with the scroll rather than pulsing on a
          loop, which keeps the hero calm while you are reading it. */}
      <motion.div
        aria-hidden
        className="glow-blob right-[4%] top-[6%] h-[420px] w-[420px] bg-accent-glow/15"
        style={reduce ? undefined : { y: orbY }}
      />
      <motion.div
        aria-hidden
        className="glow-blob bottom-[-10%] left-[-6%] h-[380px] w-[380px] bg-hero-glow/20"
      />

      {/* Circuit bus running along the bottom edge, into the admissions bar. */}
      <CircuitRibbon />

      {/* ---- Copy -------------------------------------------------------- */}
      <motion.div
        className="container-x relative"
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6 flex flex-wrap items-center gap-2 text-xs text-up-soft/60"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Icon name="arrowRight" size={11} className="opacity-50" />
          <Link href="/courses" className="transition-colors hover:text-white">
            Courses
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
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-up-soft backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow" />
            {categoryLabel}
          </span>
          {course.badge && (
            <span className="rounded-full bg-gradient-to-r from-accent-glow to-hero-glow px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-hero-950">
              {course.badge}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-xs text-up-soft/70">
            <Icon name="star" size={13} className="fill-accent-yellow text-accent-yellow" />
            <strong className="font-bold text-white">{rating.average}</strong>
            <span className="opacity-70">({rating.reviewCount} reviews)</span>
          </span>
        </motion.div>

        {/* Word-by-word mask reveal. */}
        <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.6rem]">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden align-top">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "115%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.15 + i * 0.05, ease: EASE }}
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
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-up-soft/80 sm:text-lg"
        >
          {course.blurb}
        </motion.p>

        {/* ---- Highlight tiles ------------------------------------------- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } } }}
          className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {highlights.map((h) => (
            <motion.div
              key={h.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              whileHover={reduce ? undefined : { y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.045] p-4 backdrop-blur-sm transition-colors hover:border-accent-glow/40"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-glow/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <Icon name={h.icon} size={17} className="text-accent-glow" />
              <p className="mt-3 font-display text-base font-extrabold leading-tight text-white">
                {h.value}
              </p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-wider text-up-soft/55">
                {h.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ---- Calls to action -------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <SectionLink
            to="enquire"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-hero-950 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Enquire about this course
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
            <Icon name="phone" size={16} /> {site.phone}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
