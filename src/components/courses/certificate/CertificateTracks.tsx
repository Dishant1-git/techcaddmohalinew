"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Course } from "@/lib/courses";
import { tracksFor } from "@/lib/certificateTracks";
import type { WrittenHeading } from "@/lib/content/mernCertificate";
import Icon from "@/components/ui/Icon";
import { EASE } from "@/components/courses/detail/Motion";
import { Guilloche, Seal } from "@/components/courses/certificate/Motifs";
import { RuledHeading, Wipe } from "@/components/courses/certificate/CertificateSections";

/**
 * The three lengths this programme can be taken at.
 *
 * Sits between the hero and the numbered sections: the reader picks a duration
 * before reading the syllabus, which is the order the question actually comes
 * up in. Deliberately *not* one of the nine numbered sections — those are a
 * contract shared with the catalogue and pathway designs (see
 * `@/lib/courseVariants`), and adding a tenth here would break that parity and
 * shift every roman numeral after it.
 *
 * Reuses `RuledHeading` and `Wipe` from the sections file so this reads as part
 * of the same document rather than a lookalike built alongside it.
 */
export default function CertificateTracks({
  course,
  heading,
}: {
  course: Course;
  heading?: WrittenHeading;
}) {
  const reduce = useReducedMotion();
  const tracks = tracksFor(course);

  return (
    <section
      id="durations"
      className="relative scroll-mt-36 overflow-hidden border-y border-up-line bg-subtle py-20 lg:py-28"
    >
      <Guilloche className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] text-up-accent/[0.07]" />

      <div className="container-x relative">
        <RuledHeading
          index={heading?.index ?? "—"}
          eyebrow={heading?.eyebrow ?? "Programme lengths"}
          title={heading?.title ?? "Take it over three, six or nine months"}
          intro={
            heading?.intro ??
            `The same ${course.title} syllabus at three depths. The subject does not change; how far you take it, and the paperwork you leave with, does.`
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-7">
          {tracks.map((track, i) => {
            const featured = Boolean(track.tag);

            return (
              <motion.article
                key={track.key}
                initial={reduce ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className={`relative flex flex-col overflow-hidden rounded-[1.5rem] p-8 transition-transform duration-500 hover:-translate-y-1 ${
                  featured
                    ? "bg-hero-950 text-white shadow-[0_36px_80px_-36px_rgba(11,26,77,0.85)]"
                    : "border border-up-line bg-white"
                }`}
              >
                {featured && (
                  <>
                    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(28,83,209,0.5),transparent_65%)]" />
                    <span className="absolute right-7 top-7 rounded-full bg-accent-yellow px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-hero-950">
                      {track.tag}
                    </span>
                  </>
                )}

                {/* Duration is the thing being chosen, so it leads. */}
                <p
                  className={`relative font-display text-[2.4rem] font-extrabold leading-none tracking-tight ${
                    featured ? "text-white" : "text-up-accent"
                  }`}
                >
                  {track.months}
                </p>
                <p
                  className={`relative mt-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] ${
                    featured ? "text-up-gold" : "text-up-muted"
                  }`}
                >
                  {track.title}
                </p>

                <p
                  className={`relative mt-4 text-sm leading-relaxed ${
                    featured ? "text-up-soft/75" : "text-up-muted"
                  }`}
                >
                  {track.blurb}
                </p>

                {/* Two figures, set like a table entry rather than a badge. */}
                <div
                  className={`relative mt-7 grid grid-cols-2 gap-4 border-y py-5 ${
                    featured ? "border-white/15" : "border-up-line"
                  }`}
                >
                  {track.stats.map((s) => (
                    <div key={s.label}>
                      <p
                        className={`font-display text-xl font-extrabold leading-none ${
                          featured ? "text-white" : "text-up-ink"
                        }`}
                      >
                        {s.value}
                      </p>
                      <p
                        className={`mt-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] ${
                          featured ? "text-up-soft/60" : "text-up-muted"
                        }`}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                <ul className="relative mt-6 space-y-2.5">
                  {track.includes.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2.5 text-sm ${
                        featured ? "text-up-soft/85" : "text-up-ink/80"
                      }`}
                    >
                      <Icon
                        name="check"
                        size={15}
                        strokeWidth={2.6}
                        className={`mt-0.5 shrink-0 ${
                          featured ? "text-accent-glow" : "text-up-accent"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto pt-8">
                  <p
                    className={`flex items-center gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] ${
                      featured ? "text-up-gold" : "text-up-accent"
                    }`}
                  >
                    <Icon name="certificate" size={15} className="shrink-0" />
                    {track.award}
                  </p>

                  <a
                    href="#enquire"
                    className={`group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                      featured ? "accent-fill" : "bg-up-ink text-white hover:bg-hero-900"
                    }`}
                  >
                    Apply for {track.months}
                    <Icon
                      name="arrowRight"
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* A closing note, set as a document footer rather than a banner. */}
        <Wipe delay={0.2}>
          <div className="mt-12 flex flex-col items-start gap-6 border-t border-up-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-up-muted">
              Not sure which length fits? A counsellor maps it to your semester, your
              placement season and the time you actually have — usually in one call.
            </p>
            {/* Seal takes no className — the opacity lives on a wrapper. */}
            <span className="hidden shrink-0 opacity-70 sm:block">
              <Seal size={72} />
            </span>
          </div>
        </Wipe>
      </div>
    </section>
  );
}
