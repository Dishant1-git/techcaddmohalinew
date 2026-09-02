"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Course } from "@/lib/courses";
import { techMarkFor } from "@/lib/techMarks";
import Icon from "@/components/ui/Icon";
import TechMark from "@/components/ui/TechMark";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import { EASE } from "@/components/courses/detail/Motion";

/**
 * Tools & technologies.
 *
 * Chips carry the real brand mark where one has been drawn (see
 * `@/lib/techMarks` — coverage is partial by design, and a tool without a mark
 * simply renders as text). Behind them runs a data bus on the same
 * `.circuit-pulse` keyframes as the home page circuit, so the cluster sits on a
 * live board rather than empty white.
 */

/** Horizontal bus lines, authored in a 1200×260 viewBox. */
const BUS: { d: string; pulse: number }[] = [
  { d: "M0 40 H420 L460 80 H1200", pulse: 5.5 },
  { d: "M0 96 H300 L340 56 H1200", pulse: 7.0 },
  { d: "M0 168 H520 L560 208 H1200", pulse: 6.2 },
  { d: "M0 222 H760 L800 182 H1200", pulse: 8.0 },
];

export default function Tools({ course }: { course: Course }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [26, -26]);

  return (
    <section id="tools" className="relative scroll-mt-36 overflow-hidden py-20 lg:py-28" ref={ref}>
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      {/* ---- Circuit bus backdrop ---------------------------------------- */}
      <svg
        viewBox="0 0 1200 260"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[16rem] w-full -translate-y-1/2 opacity-70"
      >
        <g fill="none" stroke="rgba(28,83,209,0.16)" strokeWidth="1.2">
          {BUS.map((b) => (
            <path key={b.d} d={b.d} />
          ))}
        </g>
        <g fill="none" strokeLinecap="round">
          {BUS.map((b, i) => (
            <g key={b.d}>
              <path
                d={b.d}
                pathLength={1}
                stroke="#2f7dff"
                strokeOpacity="0.16"
                strokeWidth="6"
                className="circuit-pulse"
                style={{ animationDuration: `${b.pulse}s`, animationDelay: `${i * -1.3}s` }}
              />
              <path
                d={b.d}
                pathLength={1}
                stroke="#1c53d1"
                strokeWidth="1.6"
                className="circuit-pulse"
                style={{ animationDuration: `${b.pulse}s`, animationDelay: `${i * -1.3}s` }}
              />
            </g>
          ))}
        </g>
      </svg>

      <div className="container-x relative">
        <SectionTitle
          align="center"
          eyebrow="Tools"
          title="Tools & technologies you will use"
          subtitle="The exact stack used in the labs, the live project and — more to the point — in the jobs this course leads to."
        />

        <motion.div
          style={reduce ? undefined : { y: drift }}
          className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-3"
        >
          {course.tools.map((t, i) => {
            const mark = techMarkFor(t);
            return (
              <motion.span
                key={t}
                initial={reduce ? false : { opacity: 0, scale: 0.82, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 260, damping: 22, delay: i * 0.04 }}
                whileHover={reduce ? undefined : { y: -5, scale: 1.04 }}
                className="group inline-flex cursor-default items-center gap-2.5 rounded-2xl border border-line bg-white/90 px-4 py-3 text-sm font-semibold text-up-ink/85 shadow-[0_10px_30px_-24px_rgba(11,26,77,0.6)] backdrop-blur-sm transition-colors hover:border-up-accent hover:text-up-accent"
              >
                {mark ? (
                  <TechMark
                    name={mark}
                    size={18}
                    className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-up-accent/40 transition-colors group-hover:bg-up-accent" />
                )}
                {t}
              </motion.span>
            );
          })}
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-line bg-subtle/90 px-6 py-5 text-xs text-up-muted backdrop-blur-sm"
        >
          {[
            "Licensed software in every lab",
            "Practice systems on campus",
            "Setup help for your own laptop",
          ].map((f) => (
            <span key={f} className="inline-flex items-center gap-2">
              <Icon name="check" size={13} strokeWidth={3} className="text-up-accent" />
              {f}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
