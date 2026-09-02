"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Course } from "@/lib/courses";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import { EASE } from "@/components/courses/detail/Motion";
import SectionLink from "@/components/courses/detail/SectionLink";

/**
 * Admissions bar, directly under the hero.
 *
 * Deliberately does not repeat the duration / level / module count already on
 * the hero tiles — it answers the next question instead: when does it start,
 * which slots exist, and how do I get on it.
 */
export default function BatchStrip({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const batches = ["Morning", "Afternoon", "Evening", "Weekend", "Live online"];

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="border-b border-line bg-white"
      aria-label={`Admissions for ${course.title}`}
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 py-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-8">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            <div>
              <p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-up-accent">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-up-accent"
                  animate={reduce ? undefined : { opacity: [1, 0.25, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                Admissions open
              </p>
              <p className="mt-1.5 font-display text-lg font-extrabold text-up-ink">
                Next batch starts in 2 weeks
              </p>
            </div>

            <div className="border-l border-line pl-10 max-sm:border-l-0 max-sm:pl-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-up-muted/70">
                Batch slots
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {batches.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-line bg-subtle px-3 py-1 text-xs font-medium text-up-ink/75"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <SectionLink
              to="enquire"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-hero-600 to-hero-glow px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-hero-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Book a free demo
              <Icon
                name="arrowRight"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </SectionLink>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-up-line px-6 py-3.5 text-sm font-semibold text-up-ink transition-colors hover:border-up-accent hover:text-up-accent"
            >
              <Icon name="phone" size={15} /> Talk to a counsellor
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
