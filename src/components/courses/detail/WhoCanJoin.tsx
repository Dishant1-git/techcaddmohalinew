"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Course } from "@/lib/courses";
import { eligibility, sectionCopy, whoCanJoin } from "@/lib/coursePage";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/courses/detail/Motion";
import SectionLink from "@/components/courses/detail/SectionLink";
import SpotlightCard from "@/components/courses/detail/SpotlightCard";
import HudCorners from "@/components/courses/detail/HudCorners";

/**
 * Who can join — audience cards on the left, eligibility checklist on the
 * right. The audience list is chosen by the course's category, so a CAD track
 * talks to draughtsmen and an AI track talks to analysts.
 */
export default function WhoCanJoin({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const audience = whoCanJoin(course);
  const criteria = eligibility(course);
  const copy = sectionCopy(course, "who");

  return (
    <section id="who" className="relative scroll-mt-36 bg-subtle py-20 lg:py-28">
      <div className="container-x">
        <SectionTitle
          eyebrow="Who can join"
          title={copy?.title ?? "Is this course for you?"}
          subtitle={
            copy?.intro ??
            `${course.title} is a ${course.level.toLowerCase()} track. These are the four kinds of people who typically sit in the batch — if you recognise yourself in any of them, you are in the right place.`
          }
        />

        {/* `items-start`, deliberately: it stops the eligibility panel being
            stretched to the height of the audience column, which is what both
            sizes the panel to its own content and leaves the sticky column
            below room to travel. */}
        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <Stagger className="grid gap-5 sm:grid-cols-2" amount={0.1}>
            {audience.map((a) => (
              <StaggerItem key={a.title}>
                <SpotlightCard
                  className="group h-full rounded-3xl border border-line bg-white p-7 text-up-accent transition-colors hover:border-up-accent/40"
                >
                  <HudCorners onGroupHover className="text-up-accent/35" inset="0.65rem" />

                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-up-accent transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-hero-600 group-hover:to-hero-glow group-hover:text-white">
                    <Icon name={a.icon} size={21} />
                  </span>

                  <h3 className="mt-5 text-base font-bold text-up-ink">{a.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{a.body}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>

          {/* ---- Eligibility panel ------------------------------------------ *
              Pins under the chrome and rides down beside the audience cards,
              which run long on a course whose page has been written out in
              full. The sticky sits on a plain wrapper rather than on <Reveal/>
              so the entrance transform and the pinning never fight. */}
          <div className="lg:sticky lg:top-44">
            <Reveal direction="right" delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-line bg-hero-950 p-8 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#1c53d1_0%,transparent_65%)]" />
                <div className="absolute inset-0 grid-lines opacity-50" />

                <div className="relative">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent-yellow">
                    Eligibility
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-extrabold">
                    What you need to start
                  </h3>

                  <ul className="mt-7 space-y-4">
                    {criteria.map((c, i) => (
                      <motion.li
                        key={c}
                        initial={reduce ? false : { opacity: 0, x: 18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                        className="flex items-start gap-3 text-sm text-up-soft/85"
                      >
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-glow/15 text-accent-glow">
                          <Icon name="check" size={11} strokeWidth={3.4} />
                        </span>
                        {c}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 rounded-2xl border border-white/12 bg-white/5 p-5">
                    <p className="text-sm leading-relaxed text-up-soft/75">
                      Not sure whether your background fits? A ten-minute counselling call maps your
                      stream, marks and goal to the right batch — no obligation.
                    </p>
                    <SectionLink
                      to="enquire"
                      className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent-glow"
                    >
                      Ask a counsellor
                      <Icon
                        name="arrowRight"
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </SectionLink>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* The closing line of a written audience section — what actually
            matters before you join, once the cards have listed who joins. */}
        {copy?.note && (
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-4xl text-sm leading-relaxed text-up-ink/75 sm:text-[0.95rem]">
              {copy.note}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
