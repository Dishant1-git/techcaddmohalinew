"use client";

import type { Course } from "@/lib/courses";
import { learnDetail, learningPoints, sectionCopy } from "@/lib/coursePage";
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
 *
 * A course whose page has been written to its own brief carries the section as
 * prose instead — numbered stages, each with a heading and a paragraph or two.
 * That version is rendered by <WrittenSyllabus/> below.
 */
export default function LearnPoints({ course }: { course: Course }) {
  const points = learningPoints(course);
  const written = learnDetail(course);

  if (written) return <WrittenSyllabus course={course} detail={written} />;

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

/* -------------------------------------------------------------------------- *
 *                          The written syllabus                               *
 * -------------------------------------------------------------------------- */

/**
 * The prose form of the same section: an intro, then one card per stage with
 * its number, heading and paragraphs, and the tool-stack note underneath.
 *
 * Two columns on desktop rather than three, because these cards carry
 * paragraphs rather than one-line skills and a three-up grid would set them in
 * a column too narrow to read comfortably.
 */
function WrittenSyllabus({
  course,
  detail,
}: {
  course: Course;
  detail: NonNullable<ReturnType<typeof learnDetail>>;
}) {
  const copy = sectionCopy(course, "learn");

  return (
    <section id="learn" className="relative scroll-mt-36 overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Skills covered"
            title={copy?.title ?? "What you learn in this programme"}
            subtitle={detail.intro}
          />

          <Reveal direction="left" delay={0.15}>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-white px-6 py-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-hero-600 to-hero-glow text-white">
                <Icon name="bolt" size={19} />
              </span>
              <div>
                <p className="font-display text-2xl font-extrabold leading-none text-up-ink">
                  {detail.count?.value ?? detail.topics.length}
                </p>
                <p className="mt-1 text-xs text-up-muted">
                  {detail.count?.label ?? "stages, start to finish"}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 lg:grid-cols-2" amount={0.05}>
          {detail.topics.map((topic, i) => (
            <StaggerItem key={topic.title}>
              <SpotlightCard
                lift={4}
                radius={14}
                className="group h-full rounded-2xl border border-line bg-white p-7 text-up-accent transition-all duration-300 hover:border-up-accent/40 hover:shadow-[0_20px_45px_-30px_rgba(11,26,77,0.45)]"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 font-display text-[0.75rem] font-extrabold text-up-accent transition-colors group-hover:bg-up-accent group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold leading-snug text-up-ink">{topic.title}</h3>
                    <div className="mt-3 space-y-3">
                      {topic.body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 48)}
                          className="text-sm leading-relaxed text-up-muted"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {topic.points && (
                      <ul className="mt-4 space-y-2.5">
                        {topic.points.map((point) => (
                          <li
                            key={point.slice(0, 48)}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-up-ink/80"
                          >
                            <Icon
                              name="check"
                              size={14}
                              strokeWidth={3}
                              className="mt-1 shrink-0 text-up-accent"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>

        {detail.outro && (
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-3xl border border-line bg-subtle p-8 lg:p-9">
              <div className="space-y-4">
                {detail.outro.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-sm leading-relaxed text-up-ink/75 sm:text-[0.95rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
