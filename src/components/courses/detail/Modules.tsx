"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Course } from "@/lib/courses";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import { EASE, itemVariants, Stagger } from "@/components/courses/detail/Motion";

/**
 * Curriculum modules, as an animated accordion.
 *
 * Rows open with a height/opacity transition through <AnimatePresence/> rather
 * than the CSS grid-rows trick used elsewhere on the site, so the topics can
 * also stagger in behind the panel as it expands.
 *
 * A vertical timeline runs down the left of the list and fills as you scroll,
 * which gives the section a sense of progression through the programme.
 */
export default function Modules({ course }: { course: Course }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const totalTopics = course.modules.reduce((n, m) => n + m.points.length, 0);

  return (
    <section id="modules" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="container-x">
        <SectionTitle
          eyebrow="Modules"
          title="The curriculum, module by module"
          subtitle={`${course.modules.length} modules and ${totalTopics} topics across ${course.duration}. Each one closes in something you build, review and keep in your portfolio.`}
        />

        <div className="relative mt-14">
          {/* Timeline spine — fills as the list scrolls past, then carries a
              travelling light down it, on the same circuit language as the
              hero ribbon and the course diagram. */}
          <div className="absolute left-[1.55rem] top-4 hidden h-[calc(100%-2rem)] w-px bg-line sm:block">
            <motion.div
              className="relative h-full w-full origin-top bg-gradient-to-b from-up-accent via-hero-glow to-accent-glow"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
            <svg
              aria-hidden="true"
              preserveAspectRatio="none"
              viewBox="0 0 2 100"
              className="absolute inset-0 h-full w-[3px] -translate-x-[1px] overflow-visible"
            >
              <path
                d="M1 0 V100"
                pathLength={1}
                fill="none"
                stroke="#00d4ff"
                strokeOpacity="0.35"
                strokeWidth="5"
                strokeLinecap="round"
                className="circuit-pulse"
                style={{ animationDuration: "4.5s" }}
              />
              <path
                d="M1 0 V100"
                pathLength={1}
                fill="none"
                stroke="#00d4ff"
                strokeWidth="2"
                strokeLinecap="round"
                className="circuit-pulse"
                style={{ animationDuration: "4.5s" }}
              />
            </svg>
          </div>

          <Stagger className="space-y-3.5" amount={0.05}>
            {course.modules.map((m, i) => {
              const isOpen = open === i;
              return (
                <motion.div key={m.title} variants={itemVariants} className="relative sm:pl-16">
                  {/* Timeline node */}
                  <motion.span
                    className={`absolute left-0 top-5 hidden h-[3.1rem] w-[3.1rem] place-items-center rounded-2xl font-display text-sm font-extrabold transition-colors duration-300 sm:grid ${
                      isOpen
                        ? "bg-gradient-to-br from-hero-600 to-hero-glow text-white shadow-lg shadow-hero-600/30"
                        : "border border-line bg-white text-up-accent"
                    }`}
                    animate={
                      reduce || !isOpen ? undefined : { scale: [1, 1.06, 1] }
                    }
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>

                  <div
                    className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                      isOpen
                        ? "border-up-accent/35 bg-white shadow-[0_24px_60px_-40px_rgba(11,26,77,0.45)]"
                        : "border-line bg-white/70 hover:border-up-accent/25"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-5 px-6 py-5 text-left"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-subtle font-display text-sm font-extrabold text-up-accent sm:hidden">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="flex-1">
                        <span className="block text-base font-bold text-up-ink sm:text-lg">
                          {m.title}
                        </span>
                        <span className="mt-1 flex items-center gap-3 text-xs text-up-muted">
                          <span>{m.points.length} topics</span>
                          <span className="h-1 w-1 rounded-full bg-up-line" />
                          <span>Module {i + 1} of {course.modules.length}</span>
                        </span>
                      </span>

                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                          isOpen ? "bg-up-accent text-white" : "bg-subtle text-up-muted"
                        }`}
                      >
                        <Icon name="plus" size={16} strokeWidth={2.4} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <motion.ul
                            initial="hidden"
                            animate="show"
                            variants={{ show: { transition: { staggerChildren: 0.045 } } }}
                            className="grid gap-2.5 border-t border-line px-6 py-6 sm:grid-cols-2"
                          >
                            {m.points.map((p) => (
                              <motion.li
                                key={p}
                                variants={{
                                  hidden: { opacity: 0, x: -12 },
                                  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
                                }}
                                className="flex items-start gap-2.5 text-sm text-up-ink/80"
                              >
                                <Icon
                                  name="check"
                                  size={14}
                                  strokeWidth={3}
                                  className="mt-1 shrink-0 text-up-accent"
                                />
                                {p}
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
