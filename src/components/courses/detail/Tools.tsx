"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Course } from "@/lib/courses";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import { EASE } from "@/components/courses/detail/Motion";

/**
 * Tools & technologies.
 *
 * The chips fan in on a spring, and the whole cluster drifts slightly against
 * the scroll so it reads as a layer rather than a static list.
 */
export default function Tools({ course }: { course: Course }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="tools" className="relative scroll-mt-36 overflow-hidden py-20 lg:py-28" ref={ref}>
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

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
          {course.tools.map((t, i) => (
            <motion.span
              key={t}
              initial={reduce ? false : { opacity: 0, scale: 0.82, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
                delay: i * 0.045,
              }}
              whileHover={reduce ? undefined : { y: -5, scale: 1.04 }}
              className="group relative cursor-default overflow-hidden rounded-2xl border border-line bg-white px-5 py-3 text-sm font-semibold text-up-ink/85 transition-colors hover:border-up-accent hover:text-up-accent"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{t}</span>
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-line bg-subtle px-6 py-5 text-xs text-up-muted"
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
