"use client";

import type { Course } from "@/lib/courses";
import { learningPoints } from "@/lib/coursePage";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import { Reveal, Stagger, StaggerItem } from "@/components/courses/detail/Motion";
import SpotlightCard from "@/components/courses/detail/SpotlightCard";

/**
 * "What we learn in this program" — the flat skill list.
 *
 * Deliberately not another accordion: this is the scannable answer for someone
 * who does not want to open four modules to find out whether the course covers
 * the one thing they came for.
 */
export default function LearnPoints({ course }: { course: Course }) {
  const points = learningPoints(course);

  return (
    <section id="learn" className="relative scroll-mt-36 overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Skills covered"
            title="What you learn in this programme"
            subtitle="Every skill below is taught hands-on, in a session where you build with it rather than watch a slide about it."
          />

          <Reveal direction="left" delay={0.15}>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-white px-6 py-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-hero-600 to-hero-glow text-white">
                <Icon name="bolt" size={19} />
              </span>
              <div>
                <p className="font-display text-2xl font-extrabold leading-none text-up-ink">
                  {points.length}+
                </p>
                <p className="mt-1 text-xs text-up-muted">core skills covered</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
          {points.map((p, i) => (
            <StaggerItem key={`${p.point}-${i}`}>
              <SpotlightCard
                lift={4}
                radius={14}
                className="group h-full rounded-2xl border border-line bg-white p-6 text-up-accent transition-all duration-300 hover:border-up-accent/40 hover:shadow-[0_20px_45px_-30px_rgba(11,26,77,0.45)]"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 font-display text-[0.7rem] font-extrabold text-up-accent transition-colors group-hover:bg-up-accent group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-relaxed text-up-ink">{p.point}</p>
                    <p className="mt-2 text-[0.68rem] uppercase tracking-wider text-up-muted/80">
                      {p.module}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
