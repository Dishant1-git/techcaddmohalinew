"use client";

import type { Course } from "@/lib/courses";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import CourseVisual from "@/components/courses/detail/CourseVisual";
import SectionLink from "@/components/courses/detail/SectionLink";
import { Reveal, Stagger, StaggerItem } from "@/components/courses/detail/Motion";

/**
 * Overview — what the programme is, in prose, with the course visual beside it.
 *
 * Structured as an editorial spread: the argument runs down the left column
 * and the image anchors the right, then the two outcome panels sit full width
 * beneath so neither column has to squeeze a list into half a page.
 */
export default function Overview({ course }: { course: Course }) {
  const assurances = [
    { icon: "certificate", label: "ISO-certified certificate", sub: "Plus a project completion letter" },
    { icon: "briefcase", label: "Internship letter", sub: "Earned on live project work" },
    { icon: "monitor", label: "Every session recorded", sub: "Kept in your student portal" },
    { icon: "users", label: "Small, mentored batches", sub: "Code reviewed by a working engineer" },
  ];

  return (
    <section id="overview" className="relative scroll-mt-36 overflow-hidden bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative">
        {/* ---- Editorial spread ------------------------------------------ */}
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <SectionTitle
              eyebrow="Overview"
              title="About this programme"
              subtitle={`A ${course.duration} ${course.level.toLowerCase()} track taught at our Sector 75 campus in Mohali and live online, built around what employers in this field are hiring for right now.`}
            />

            <Reveal delay={0.1}>
              <p className="mt-8 text-base leading-[1.85] text-up-ink/75 sm:text-[1.05rem]">
                {course.overview}
              </p>
            </Reveal>

            <Stagger className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2" amount={0.2}>
              {assurances.map((a) => (
                <StaggerItem key={a.label}>
                  <div className="flex items-start gap-3.5 border-t border-line pt-5">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-up-accent">
                      <Icon name={a.icon} size={17} />
                    </span>
                    <div>
                      <p className="text-sm font-bold leading-snug text-up-ink">{a.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-up-muted">{a.sub}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.15}>
              <SectionLink
                to="modules"
                className="group mt-10 inline-flex items-center gap-2 text-sm font-bold text-up-accent"
              >
                See the full curriculum
                <Icon
                  name="arrowRight"
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </SectionLink>
            </Reveal>
          </div>

          {/* The image column. Sticky on desktop so it stays with the prose. */}
          <div className="lg:sticky lg:top-44">
            <CourseVisual course={course} />
          </div>
        </div>

        {/* ---- Outcomes & roles ------------------------------------------- */}
        <div className="mt-20 grid gap-6 lg:mt-24 lg:grid-cols-2">
          <Stagger className="rounded-3xl border border-line bg-subtle p-8 lg:p-9">
            <StaggerItem>
              <h3 className="flex items-center gap-3 text-lg font-bold text-up-ink">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-up-accent shadow-sm">
                  <Icon name="check" size={17} strokeWidth={3} />
                </span>
                What you walk away with
              </h3>
            </StaggerItem>
            <ul className="mt-6 space-y-3.5">
              {course.outcomes.map((o) => (
                <StaggerItem key={o}>
                  <li className="flex items-start gap-3 text-sm leading-relaxed text-up-ink/80">
                    <Icon
                      name="check"
                      size={15}
                      strokeWidth={3}
                      className="mt-0.5 shrink-0 text-up-accent"
                    />
                    {o}
                  </li>
                </StaggerItem>
              ))}
            </ul>
          </Stagger>

          <Stagger className="relative overflow-hidden rounded-3xl border border-line bg-hero-950 p-8 text-white lg:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1c53d1_0%,transparent_65%)]" />
            <div className="absolute inset-0 grid-lines opacity-40" />
            <div className="relative">
              <StaggerItem>
                <h3 className="flex items-center gap-3 text-lg font-bold">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-accent-glow">
                    <Icon name="briefcase" size={17} />
                  </span>
                  Roles this leads to
                </h3>
              </StaggerItem>
              <ul className="mt-6 space-y-3.5">
                {course.roles.map((r) => (
                  <StaggerItem key={r}>
                    <li className="flex items-start gap-3 text-sm leading-relaxed text-up-soft/85">
                      <Icon
                        name="arrowRight"
                        size={15}
                        strokeWidth={2.4}
                        className="mt-0.5 shrink-0 text-accent-glow"
                      />
                      {r}
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </div>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
