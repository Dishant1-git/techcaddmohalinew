"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import type { Course } from "@/lib/courses";
import { categoryLabel } from "@/lib/courses";
import Icon from "@/components/ui/Icon";
import { EASE } from "@/components/courses/detail/Motion";

/**
 * The landing page for one course menu.
 *
 * Every menu under `/courses` serves its pages from a `[slug]` segment, and
 * until now the segment above them — `/courses/after12th`, `/courses/ai` and
 * the rest — resolved to nothing. This is that page: the menu's own courses,
 * in the menu's own groups, linking into the design that menu uses.
 *
 * One component serves all four so the four routes stay in step; what changes
 * between them is the groups passed in and the base path the cards link to.
 */

export type RouteGroup = {
  /** Column heading, e.g. "3-month programmes". Omitted for a single run. */
  label?: string;
  note?: string;
  courses: Course[];
};

export default function RouteIndex({
  groups,
  basePath,
  cta,
}: {
  groups: RouteGroup[];
  /** Which menu's pages the cards link into, e.g. `/courses/after12th`. */
  basePath: string;
  cta?: { label: string; href: string };
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // The spine draws itself down the page as the groups pass, so a reader
  // scrolling a long menu can see how much of it is left.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div ref={ref} className="container-x relative">
        {/* The drawn spine, left of the groups on desktop. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-up-line lg:block"
        />
        <motion.div
          aria-hidden
          style={reduce ? undefined : { scaleY: draw }}
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-px origin-top bg-gradient-to-b from-accent-yellow via-accent-glow to-transparent lg:block"
        />

        <div className="space-y-20">
          {groups.map((group, gi) => (
            <div key={group.label ?? gi}>
              {group.label && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="mb-9 flex flex-wrap items-end justify-between gap-4"
                >
                  <div>
                    <span className="font-display text-[0.7rem] font-extrabold tabular-nums text-up-accent">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-extrabold text-up-ink sm:text-3xl">
                      {group.label}
                    </h2>
                    {group.note && (
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-up-muted">
                        {group.note}
                      </p>
                    )}
                  </div>
                  <span className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-up-muted">
                    {group.courses.length} {group.courses.length === 1 ? "course" : "courses"}
                  </span>
                </motion.div>
              )}

              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={{ show: { transition: { staggerChildren: 0.07 } } }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {group.courses.map((course) => (
                  <motion.li
                    key={course.slug}
                    variants={{
                      hidden: { opacity: 0, y: 28 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                    whileHover={reduce ? undefined : { y: -6 }}
                  >
                    <Link
                      href={`${basePath}/${course.slug}`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-subtle p-7 transition-colors hover:border-up-accent/40 hover:bg-white"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-up-muted">
                          {categoryLabel[course.category]}
                        </span>
                        {course.badge && (
                          <span className="rounded-full bg-accent-yellow px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-wider text-hero-950">
                            {course.badge}
                          </span>
                        )}
                      </span>

                      <span className="mt-4 font-display text-lg font-extrabold leading-tight text-up-ink">
                        {course.title}
                      </span>
                      <span className="mt-1 text-xs text-up-muted">
                        {course.duration ? `${course.duration} · ` : ""}
                        {course.level}
                      </span>

                      <span className="mt-4 flex-1 text-sm leading-relaxed text-up-muted">
                        {course.blurb}
                      </span>

                      <span className="mt-6 flex flex-wrap gap-1.5">
                        {course.tools.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-line bg-white px-2.5 py-1 text-[0.62rem] font-semibold text-up-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </span>

                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-up-accent">
                        See the course
                        <Icon
                          name="arrowRight"
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>

                      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>

        {cta && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-16 flex justify-center"
          >
            <Link
              href={cta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-hero-950 px-8 py-4 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5"
            >
              {cta.label}
              <Icon
                name="arrowRight"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
