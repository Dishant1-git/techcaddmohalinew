"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Course } from "@/lib/courses";
import { whyChoose } from "@/lib/coursePage";
import { stats } from "@/lib/site";
import { Stagger, StaggerItem } from "@/components/courses/detail/Motion";
import ScrollZoom from "@/components/courses/detail/ScrollZoom";
import CountUp from "@/components/courses/detail/CountUp";

/**
 * Why choose techcadd for this course — the dark section that breaks up the
 * run of light ones.
 *
 * The whole section is the scroll-driven expansion in <ScrollZoom/>: a gradient
 * card set inline in the headline grows until it is the screen, and the six
 * reasons for this track arrive frosted on top of it. The institute-wide
 * numbers count up beneath, once the stage releases.
 */
export default function WhyChoose({ course }: { course: Course }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const reasons = whyChoose(course);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobA = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const blobB = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section
      ref={ref}
      id="why"
      className="relative scroll-mt-36 bg-hero-950 pb-20 text-white lg:pb-28"
    >
      {/* The decoration is clipped here, not on the section: `overflow-hidden`
          on the section itself would make it a scroll container and the sticky
          stage inside <ScrollZoom/> would stop sticking to the viewport. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_0%,#123285_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_85%_80%,#1c53d1_0%,transparent_55%)]" />
        <div className="absolute inset-0 grid-lines opacity-60" />
        <motion.div
          className="glow-blob left-[-5%] top-[10%] h-[340px] w-[340px] bg-accent-glow/20"
          style={reduce ? undefined : { y: blobA }}
        />
        <motion.div
          className="glow-blob bottom-[-10%] right-[2%] h-[320px] w-[320px] bg-hero-glow/25"
          style={reduce ? undefined : { y: blobB }}
        />
      </div>

      <ScrollZoom
        items={reasons}
        note={`Six reasons the ${course.title} track produces people who get hired, rather than people who finished a syllabus.`}
      />

      {/* ---- Institute numbers ------------------------------------------ */}
      <div className="container-x relative pt-16 lg:pt-20">
        <Stagger
          className="grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
          amount={0.3}
        >
          {stats.map((s) => (
            <StaggerItem
              key={s.label}
              className="bg-hero-950/80 px-6 py-8 text-center backdrop-blur-sm"
            >
              <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                <CountUp to={s.value} />
                <span className="text-accent-glow">{s.suffix}</span>
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-up-soft/55">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
