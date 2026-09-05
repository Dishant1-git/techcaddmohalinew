"use client";

import Link from "next/link";
import type { Course } from "@/lib/courses";
import { futureScope } from "@/lib/coursePage";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import SectionLink from "@/components/courses/detail/SectionLink";
import { Reveal, Stagger, StaggerItem } from "@/components/courses/detail/Motion";

/**
 * Future scope — the roles this course opens, what they pay, and who hires.
 *
 * The pay bands are per category and stated as ranges, because that is what
 * they are: what alumni report back from three different markets, not a
 * guarantee. The caveat sits under the table rather than in a tooltip, so it
 * is read at the same time as the numbers.
 *
 * Dark, like <WhyChoose/>: the numbers are the loudest thing on the page and
 * this is where the reader is asked to picture the job.
 */
export default function FutureScope({ course }: { course: Course }) {
  const { roles, demand, salary, industries } = futureScope(course);

  return (
    <section id="scope" className="relative scroll-mt-36 bg-hero-950 py-20 text-white lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_15%_0%,#123285_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_90%_100%,#1c53d1_0%,transparent_55%)]" />
        <div className="absolute inset-0 grid-lines opacity-50" />
      </div>

      <div className="container-x relative">
        <SectionTitle
          eyebrow="Future scope"
          title="Where this course takes you"
          tone="dark"
          subtitle={demand}
        />

        {/* ---- Roles ------------------------------------------------------- */}
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.15}>
          {roles.map((role, i) => (
            <StaggerItem key={role}>
              <div className="h-full rounded-2xl border border-white/12 bg-white/[0.05] p-5 backdrop-blur-sm transition-colors hover:border-accent-glow/40">
                <span className="font-display text-[0.7rem] font-bold tabular-nums tracking-[0.14em] text-accent-glow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2.5 text-sm font-bold leading-snug text-white">{role}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          {/* ---- Pay bands ------------------------------------------------- */}
          <Reveal direction="up" delay={0.05}>
            <div className="h-full rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-extrabold text-white">
                  What the roles pay
                </h3>
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-accent-glow">
                  Indicative ranges
                </span>
              </div>

              {/* A table on `sm` and up; stacked cards below it, because three
                  money columns on a phone shrink the numbers to nothing. */}
              <div className="mt-6 hidden overflow-x-auto sm:block">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="text-[0.62rem] uppercase tracking-[0.14em] text-up-soft/55">
                      <th className="pb-3 font-semibold">Market</th>
                      <th className="pb-3 font-semibold">Fresher</th>
                      <th className="pb-3 font-semibold">2 – 3 years in</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salary.map((band) => (
                      <tr key={band.market} className="border-t border-white/10">
                        <td className="py-4 pr-4 text-sm text-up-soft/80">{band.market}</td>
                        <td className="py-4 pr-4 font-display text-base font-extrabold text-white">
                          {band.fresher}
                        </td>
                        <td className="py-4 font-display text-base font-extrabold text-accent-glow">
                          {band.experienced}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-3 sm:hidden">
                {salary.map((band) => (
                  <div key={band.market} className="rounded-2xl border border-white/10 p-4">
                    <p className="text-xs font-semibold text-up-soft/70">{band.market}</p>
                    <div className="mt-3 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[0.58rem] uppercase tracking-[0.14em] text-up-soft/50">
                          Fresher
                        </p>
                        <p className="mt-1 font-display text-sm font-extrabold text-white">
                          {band.fresher}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[0.58rem] uppercase tracking-[0.14em] text-up-soft/50">
                          2 – 3 years in
                        </p>
                        <p className="mt-1 font-display text-sm font-extrabold text-accent-glow">
                          {band.experienced}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-relaxed text-up-soft/55">
                Ranges reported by our own alumni across the last two placement years. What you are
                offered depends on your interview, your portfolio and the company — we prepare you
                for all three, we do not promise a number.{" "}
                <Link
                  href="/tools/salary-estimator"
                  className="font-semibold text-accent-glow underline-offset-4 hover:underline"
                >
                  Check a role in the salary estimator
                </Link>
                .
              </p>
            </div>
          </Reveal>

          {/* ---- Who hires --------------------------------------------------- */}
          <Reveal direction="right" delay={0.12}>
            <div className="h-full rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
              <h3 className="font-display text-xl font-extrabold text-white">Who is hiring</h3>

              <ul className="mt-6 space-y-3.5">
                {industries.map((industry) => (
                  <li key={industry} className="flex items-start gap-3 text-sm text-up-soft/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-glow/15 text-accent-glow">
                      <Icon name="check" size={11} strokeWidth={3.4} />
                    </span>
                    {industry}
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl border border-white/12 bg-white/5 p-5">
                <p className="text-sm leading-relaxed text-up-soft/75">
                  Our placement cell runs drives with hiring partners across Mohali, Chandigarh and
                  Panchkula, and keeps calling them until you are placed.
                </p>
                <SectionLink
                  to="enquire"
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent-glow"
                >
                  Talk about placements
                  <Icon
                    name="arrowRight"
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </SectionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
