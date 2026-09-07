"use client";

import type { Course } from "@/lib/courses";
import { comparison } from "@/lib/coursePage";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import { Stagger, StaggerItem } from "@/components/courses/detail/Motion";

/**
 * techcadd against the institute down the road.
 *
 * Written as "most institutes", never as a named competitor, and every claim
 * on our side is one the batch actually has to deliver — the same promises the
 * why-choose and certification sections make.
 *
 * The layout is a three-column row from `lg` (aspect · us · them) and stacks
 * into a card per row below that, where a real table would either overflow or
 * shrink the copy past reading size.
 */
export default function Compare({ course }: { course: Course }) {
  return (
    <section id="compare" className="relative scroll-mt-36 py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-lines-light opacity-60" />
      </div>

      <div className="container-x relative">
        <SectionTitle
          eyebrow="Compare"
          title="How we differ"
          subtitle={`Most ${course.title} courses in the region cover a similar syllabus. What separates them is who teaches it, what you build while you are there, and what happens after the last session.`}
        />

        <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-white">
          {/* Column headers — only meaningful once the row is three columns. */}
          <div className="hidden items-center gap-6 border-b border-line bg-subtle px-8 py-4 lg:grid lg:grid-cols-[0.7fr_1.15fr_1.15fr]">
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-up-muted">
              What to compare
            </span>
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-up-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-up-accent" />
              At techcadd
            </span>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-up-muted/70">
              At most institutes
            </span>
          </div>

          <Stagger className="divide-y divide-line" amount={0.05}>
            {comparison.map((row) => (
              <StaggerItem key={row.aspect}>
                <div className="grid gap-4 px-6 py-6 sm:px-8 lg:grid-cols-[0.7fr_1.15fr_1.15fr] lg:items-center lg:gap-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-up-accent">
                      <Icon name={row.icon} size={17} />
                    </span>
                    <p className="text-sm font-bold text-up-ink">{row.aspect}</p>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-up-accent/20 bg-brand-50/60 p-4 lg:border-transparent lg:bg-transparent lg:p-0">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-up-accent text-white">
                      <Icon name="check" size={11} strokeWidth={3.4} />
                    </span>
                    <p className="text-sm leading-relaxed text-up-ink">{row.us}</p>
                  </div>

                  <div className="flex items-start gap-3 lg:pl-0">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-subtle text-up-muted/70">
                      <Icon name="close" size={11} strokeWidth={3} />
                    </span>
                    <p className="text-sm leading-relaxed text-up-muted/85">{row.them}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-up-muted/80">
          Compare us on the same points before you enrol anywhere — ask for the trainer&rsquo;s
          current work, the last batch&rsquo;s project files and the placement record in writing.
        </p>
      </div>
    </section>
  );
}
