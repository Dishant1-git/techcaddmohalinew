"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Course } from "@/lib/courses";
import { whyChoose } from "@/lib/coursePage";
import { stats } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import { Stagger, StaggerItem } from "@/components/courses/detail/Motion";
import CountUp from "@/components/courses/detail/CountUp";
import SpotlightCard from "@/components/courses/detail/SpotlightCard";
import HudCorners from "@/components/courses/detail/HudCorners";

/**
 * Why choose techcadd for this course — the dark section that breaks up the
 * run of light ones. Reasons stagger in as cards; the institute-wide numbers
 * count up beneath them.
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
      className="relative scroll-mt-36 overflow-hidden bg-hero-950 py-20 text-white lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_0%,#123285_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_85%_80%,#1c53d1_0%,transparent_55%)]" />
      <div className="absolute inset-0 grid-lines opacity-60" />
      <motion.div
        aria-hidden
        className="glow-blob left-[-5%] top-[10%] h-[340px] w-[340px] bg-accent-glow/20"
        style={reduce ? undefined : { y: blobA }}
      />
      <motion.div
        aria-hidden
        className="glow-blob bottom-[-10%] right-[2%] h-[320px] w-[320px] bg-hero-glow/25"
        style={reduce ? undefined : { y: blobB }}
      />

      <div className="container-x relative">
        <SectionTitle
          tone="dark"
          align="center"
          eyebrow="Why choose us"
          title="Why students pick techcadd Mohali"
          subtitle={`Six reasons the ${course.title} track produces people who get hired, rather than people who finished a syllabus.`}
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" amount={0.08}>
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <SpotlightCard
                tone="dark"
                lift={8}
                className="group h-full rounded-3xl border border-white/12 bg-white/[0.04] p-7 text-accent-glow backdrop-blur-sm transition-colors hover:border-accent-glow/40"
              >
                <HudCorners onGroupHover className="text-accent-glow/50" inset="0.65rem" />

                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-hero-600 to-hero-glow text-white shadow-lg shadow-hero-600/30 transition-transform duration-500 group-hover:scale-110">
                  <Icon name={r.icon} size={21} />
                </span>

                <h3 className="mt-6 text-lg font-bold text-white">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-up-soft/70">{r.body}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>

        {/* ---- Institute numbers ------------------------------------------ */}
        <Stagger
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
          amount={0.3}
        >
          {stats.map((s) => (
            <StaggerItem key={s.label} className="bg-hero-950/80 px-6 py-8 text-center backdrop-blur-sm">
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
