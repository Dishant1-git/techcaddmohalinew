"use client";

import type { Course } from "@/lib/courses";
import { certification, certificationNotes } from "@/lib/coursePage";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import SectionLink from "@/components/courses/detail/SectionLink";
import { Reveal, Stagger, StaggerItem } from "@/components/courses/detail/Motion";
import SpotlightCard from "@/components/courses/detail/SpotlightCard";
import HudCorners from "@/components/courses/detail/HudCorners";

/**
 * What you leave with on paper.
 *
 * Three documents, given equal weight: the course certificate, the project
 * certificate and the internship letter. The panel beside them is a plain
 * mock-up of the certificate itself rather than a photograph — the site ships
 * no certificate scan, and a rendered one can never go stale or be mistaken
 * for someone's real document.
 */
export default function Certification({ course }: { course: Course }) {
  const documents = certification(course);
  const notes = certificationNotes(course);

  return (
    <section id="certificate" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="container-x">
        <SectionTitle
          eyebrow="Certification"
          title="What you leave with"
          subtitle={`Finishing ${course.title} puts three separate documents in your file — one for the syllabus, one for the project you built, and one for the weeks you spent on a project team.`}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1" amount={0.1}>
            {documents.map((d) => (
              <StaggerItem key={d.title}>
                <SpotlightCard className="group h-full rounded-3xl border border-line bg-white p-7 text-up-accent transition-colors hover:border-up-accent/40">
                  <HudCorners onGroupHover className="text-up-accent/35" inset="0.65rem" />

                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-up-accent transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-hero-600 group-hover:to-hero-glow group-hover:text-white">
                      <Icon name={d.icon} size={21} />
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-base font-bold text-up-ink">{d.title}</h3>
                        <span className="rounded-full border border-up-line bg-brand-50 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-up-accent">
                          {d.meta}
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{d.body}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>

          {/* ---- The certificate itself, drawn rather than photographed ----- */}
          <Reveal direction="right" delay={0.1}>
            <div className="h-full rounded-3xl border border-line bg-white p-7">
              <div
                aria-hidden
                className="relative overflow-hidden rounded-2xl border border-up-line bg-gradient-to-br from-white to-brand-50 p-6 text-center shadow-[0_24px_60px_-45px_rgba(11,26,77,0.6)]"
              >
                <div className="pointer-events-none absolute inset-3 rounded-xl border border-up-accent/15" />

                <div className="relative">
                  <p className="font-display text-[0.62rem] font-bold uppercase tracking-[0.3em] text-up-accent">
                    {site.legalName}
                  </p>
                  <p className="mt-4 font-display text-lg font-extrabold text-up-ink">
                    Certificate of Completion
                  </p>
                  <div className="mx-auto mt-3 h-px w-16 bg-up-accent/30" />
                  <p className="mt-4 text-[0.7rem] uppercase tracking-[0.18em] text-up-muted">
                    awarded for
                  </p>
                  <p className="mt-2 font-display text-base font-bold text-up-accent">
                    {course.title}
                  </p>
                  <p className="mt-1 text-[0.7rem] text-up-muted">
                    {course.duration} · {course.level}
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-4 text-left">
                    <div>
                      <div className="h-px w-20 bg-up-line" />
                      <p className="mt-1.5 text-[0.58rem] uppercase tracking-[0.14em] text-up-muted">
                        Director
                      </p>
                    </div>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-up-accent/25 bg-white text-up-accent">
                      <Icon name="certificate" size={18} />
                    </span>
                    <div className="text-right">
                      <div className="ml-auto h-px w-20 bg-up-line" />
                      <p className="mt-1.5 text-[0.58rem] uppercase tracking-[0.14em] text-up-muted">
                        Roll number
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-up-accent">
                How the paper is used
              </p>
              <ul className="mt-3.5 space-y-3">
                {notes.map((n) => (
                  <li key={n} className="flex gap-2.5 text-sm leading-relaxed text-up-muted">
                    <Icon
                      name="check"
                      size={15}
                      strokeWidth={2.6}
                      className="mt-0.5 shrink-0 text-up-accent"
                    />
                    {n}
                  </li>
                ))}
              </ul>

              <SectionLink
                to="enquire"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-up-accent"
              >
                Ask about certification
                <Icon
                  name="arrowRight"
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </SectionLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
