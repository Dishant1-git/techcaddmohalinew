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
import { Guilloche, Seal, SecurityBorder, Signature } from "@/components/courses/certificate/Motifs";

/**
 * Hero for the credential design.
 *
 * Dark ground, like every other hero on the site — the navbar renders white
 * links and a light logo until you scroll, so a light hero would leave the
 * whole menu invisible against it.
 *
 * The credential language survives the dark ground and is stronger for it: the
 * certificate is real paper, lit against the navy rather than sitting flat on
 * more paper. It tilts back as you scroll away from it.
 */
export default function CertificateHero({
  course,
  serial,
}: {
  course: Course;
  serial: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const art = categoryArt(course);
  const rating = ratingSummary(course);
  const highlights = courseHighlights(course);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const docRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const docY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const words = `${course.title} certificate programme`.split(" ");

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-hero-950 pb-24 pt-[7.5rem] text-white lg:pb-32 lg:pt-[11rem]"
    >
      {/* Navy ground with a warm gold wash — the credential accent, kept faint
          so the paper is the brightest thing on the page. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_18%_0%,#123285_0%,transparent_62%),radial-gradient(ellipse_55%_55%_at_88%_30%,rgba(255,210,63,0.14)_0%,transparent_58%)]" />
      <div className="absolute inset-0 grid-lines opacity-45" />

      <motion.div
        style={reduce ? undefined : { y: watermarkY }}
        className="pointer-events-none absolute -left-48 top-4 h-[38rem] w-[38rem]"
      >
        <Guilloche className="h-full w-full text-up-gold/[0.09]" />
      </motion.div>

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          {/* ---- Copy --------------------------------------------------- */}
          <motion.div style={reduce ? undefined : { y: copyY }}>
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
              <Link href="/training" className="transition-colors hover:text-white">
                Certificate Programs
              </Link>
              <Icon name="arrowRight" size={11} className="opacity-50" />
              <span className="text-up-soft">{course.title}</span>
            </motion.nav>

            {/* Ruled kicker — the formal register of this design. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 flex items-center gap-4"
            >
              <span className="h-px w-10 bg-up-gold" />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-up-gold">
                Certificate Programme
              </span>
              <span className="h-px flex-1 bg-white/15" />
            </motion.div>

            <h1 className="font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              {words.map((w, i) => (
                <span key={`${w}-${i}`} className="inline-block overflow-hidden align-top">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.85, delay: 0.12 + i * 0.05, ease: EASE }}
                  >
                    {w}
                    {i < words.length - 1 ? " " : ""}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="mt-6 max-w-xl text-base leading-relaxed text-up-soft/75 sm:text-lg"
            >
              {course.blurb}
            </motion.p>

            {/* Credential particulars, set as a formal record. */}
            <motion.dl
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } } }}
              className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-y border-white/15 py-7 sm:grid-cols-4"
            >
              {highlights.map((h) => (
                <motion.div
                  key={h.label}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
                  }}
                >
                  <dt className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-up-soft/50">
                    {h.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-sm font-extrabold leading-tight text-white">
                    {h.value}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <SectionLink
                to="enquire"
                className="group inline-flex items-center gap-2 border-2 border-up-gold bg-up-gold px-8 py-4 text-sm font-bold tracking-wide text-hero-950 transition-all hover:-translate-y-0.5 hover:bg-transparent hover:text-up-gold"
              >
                Register for this programme
                <Icon
                  name="arrowRight"
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </SectionLink>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 border-b border-white/25 px-1 py-2 text-sm font-semibold text-white transition-colors hover:border-up-gold hover:text-up-gold"
              >
                <Icon name="phone" size={15} /> {site.phone}
              </a>
            </motion.div>
          </motion.div>

          {/* ---- The certificate ---------------------------------------- */}
          <motion.div
            style={reduce ? undefined : { rotate: docRotate, y: docY }}
            initial={reduce ? false : { opacity: 0, y: 50, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-sm bg-white p-7 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.75)] ring-1 ring-white/10 sm:p-10">
              <SecurityBorder className="text-up-accent" />
              <Guilloche className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 text-up-accent/12" />

              <div className="relative text-center">
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.34em] text-up-muted">
                  {site.legalName}
                </p>
                <div className="mx-auto mt-4 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-up-gold" />
                  <Icon name={art.icon} size={18} className="text-up-accent" />
                  <span className="h-px w-8 bg-up-gold" />
                </div>

                <p className="mt-6 font-display text-[0.7rem] font-bold uppercase tracking-[0.24em] text-up-muted">
                  Certificate of Completion
                </p>
                <p className="mt-5 text-[0.7rem] uppercase tracking-[0.18em] text-up-muted/70">
                  is hereby awarded for
                </p>

                <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-up-ink sm:text-[1.75rem]">
                  {course.title}
                </h2>

                <p className="mx-auto mt-4 max-w-xs text-[0.72rem] leading-relaxed text-up-muted">
                  A {course.duration.toLowerCase()} {course.level.toLowerCase()} programme completed
                  with a live project, at the Mohali centre.
                </p>

                <div className="mt-8 flex items-end justify-between gap-6">
                  <div className="text-left">
                    <Signature className="h-10 w-28 text-up-ink" />
                    <span className="mt-1 block h-px w-28 bg-up-ink/30" />
                    <p className="mt-2 text-[0.58rem] uppercase tracking-[0.14em] text-up-muted">
                      Centre Director
                    </p>
                  </div>

                  <Seal size={104} />
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-up-line pt-4 text-[0.56rem] uppercase tracking-[0.16em] text-up-muted/70">
                  <span>Serial {serial}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="star" size={9} className="fill-accent-yellow text-accent-yellow" />
                    {rating.average} · {rating.reviewCount} reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Verification chip, pinned off the document's corner. */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
              className="absolute -bottom-4 -left-4 flex items-center gap-2.5 rounded-full border border-white/15 bg-hero-900 px-4 py-2.5 shadow-xl sm:-left-6"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-up-gold text-hero-950">
                <Icon name="check" size={12} strokeWidth={3.4} />
              </span>
              <span className="text-[0.68rem] font-bold text-white">Verifiable credential</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
