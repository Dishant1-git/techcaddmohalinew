"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Course } from "@/lib/courses";
import { courseReviews, ratingBreakdown } from "@/lib/coursePage";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/courses/detail/Motion";

/** Five stars, `value` of them filled. */
function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name="star"
          size={size}
          className={i < value ? "fill-accent-yellow text-accent-yellow" : "text-up-line"}
        />
      ))}
    </span>
  );
}

/**
 * Student reviews for this course. The rating summary and the selected quotes
 * are derived deterministically from the slug in `coursePage.ts`, so they never
 * shift between server render and hydration.
 */
export default function Reviews({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const reviews = courseReviews(course);
  const { average, reviewCount, buckets: distribution } = ratingBreakdown(course);

  return (
    <section id="reviews" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Reviews"
            title="What our students say"
            subtitle="Batch alumni from this track, on what actually made the difference once they were in interviews."
          />

          <Reveal direction="left" delay={0.12}>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-5 rounded-3xl border border-line bg-white px-7 py-6">
              <div>
                <p className="font-display text-4xl font-extrabold leading-none text-up-ink">
                  {average}
                </p>
                <div className="mt-2">
                  <Stars value={5} size={15} />
                </div>
                <p className="mt-2 text-xs text-up-muted">{reviewCount} reviews</p>
              </div>

              <div className="h-20 w-px bg-line max-sm:hidden" />

              {/* Score distribution. Bars grow from the left as the block
                  arrives, which turns a static number into evidence. */}
              <div className="min-w-[11rem] flex-1 space-y-1.5">
                {distribution.map((d, i) => (
                  <div key={d.stars} className="flex items-center gap-2.5">
                    <span className="w-3 text-right text-[0.68rem] font-semibold tabular-nums text-up-muted">
                      {d.stars}
                    </span>
                    <Icon name="star" size={10} className="fill-accent-yellow text-accent-yellow" />
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-subtle">
                      <motion.span
                        className="block h-full rounded-full bg-gradient-to-r from-up-accent to-hero-glow"
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${d.percent}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.09, ease: EASE }}
                      />
                    </span>
                    <span className="w-8 text-right text-[0.68rem] tabular-nums text-up-muted/80">
                      {d.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2" amount={0.1}>
          {reviews.map((r) => (
            <StaggerItem key={`${r.name}-${r.role}`}>
              <motion.figure
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-8 transition-colors hover:border-up-accent/35"
              >
                <span className="pointer-events-none absolute right-6 top-4 font-display text-[5rem] leading-none text-brand-50 transition-colors duration-500 group-hover:text-brand-100">
                  &rdquo;
                </span>

                <Stars value={r.rating} />

                <blockquote className="relative mt-5 flex-1 text-sm leading-relaxed text-up-ink/80">
                  {r.quote}
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-hero-600 to-hero-glow font-display text-sm font-extrabold text-white">
                    {r.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-up-ink">{r.name}</span>
                    <span className="mt-0.5 block text-xs text-up-muted">
                      {r.role} · {r.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
