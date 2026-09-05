"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Course } from "@/lib/courses";
import { courseFaqs } from "@/lib/coursePage";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import SectionLink from "@/components/courses/detail/SectionLink";
import { EASE, itemVariants, Stagger } from "@/components/courses/detail/Motion";

/**
 * What the counsellor call actually settles — the three things people write in
 * asking about, so the offer is concrete rather than "get in touch".
 */
const CALL_COVERS = [
  "Which batch timing — morning, evening, weekend or live-online — fits around your college or job.",
  "Fees, instalment options and any scholarship you qualify for.",
  "Whether this track or a neighbouring one suits the background you are coming from.",
];

/**
 * FAQs for this specific course. The first five questions are generated from
 * the course itself (duration, level, modules, roles), so the answers are never
 * generic filler; the rest come from the shared institute-wide list.
 */
export default function CourseFaqs({ course }: { course: Course }) {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = courseFaqs(course);

  return (
    <section id="faqs" className="relative scroll-mt-36 py-20 lg:py-28">
      {/* The grid is clipped here, not on the section: `overflow-hidden` on the
          section would make it a scroll container and the sticky left column
          below would stop pinning to the viewport. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-lines-light opacity-60" />
      </div>

      <div className="container-x relative">
        {/* The answer list is far taller than the heading block, so from `lg`
            the left column pins beside it — `items-start` keeps the grid item
            its own height, which is what sticky needs. `top-44` clears the
            navbar and the section rail stacked above it. */}
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-44">
            <SectionTitle
              eyebrow="FAQs"
              title="Common questions"
              subtitle="Still unsure? A ten-minute call with a counsellor usually settles it faster than any brochure."
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="mt-8 rounded-2xl border border-line bg-white p-6"
            >
              <p className="text-sm font-semibold text-up-ink">Ask us directly</p>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2.5 text-up-muted transition-colors hover:text-up-accent"
                >
                  <Icon name="phone" size={15} className="text-up-accent" /> {site.phone}
                </a>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-up-muted transition-colors hover:text-up-accent"
                >
                  <Icon name="whatsapp" size={15} className="text-up-accent" /> WhatsApp{" "}
                  {site.whatsapp}
                </a>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-2.5 text-up-muted transition-colors hover:text-up-accent"
                >
                  <Icon name="mail" size={15} className="text-up-accent" /> {site.email}
                </a>
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-sm font-semibold text-up-ink">What the call covers</p>
                <ul className="mt-3 space-y-2.5">
                  {CALL_COVERS.map((t) => (
                    <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-up-muted">
                      <Icon
                        name="check"
                        size={15}
                        className="mt-0.5 shrink-0 text-up-accent"
                        strokeWidth={2.4}
                      />
                      {t}
                    </li>
                  ))}
                </ul>

                <SectionLink
                  to="enquire"
                  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-hero-600 to-hero-glow px-5 py-3 text-sm font-bold text-white shadow-lg shadow-hero-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Book a free demo class
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </SectionLink>

                <p className="mt-3.5 text-xs leading-relaxed text-up-muted/80">
                  Counsellors reply within a working day. No fee is collected until you have sat
                  through a demo session.
                </p>
              </div>
            </motion.div>
          </div>

          <Stagger className="space-y-3" amount={0.05}>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={f.q}
                  variants={itemVariants}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen
                      ? "border-up-accent/35 bg-white shadow-[0_24px_60px_-45px_rgba(11,26,77,0.5)]"
                      : "border-line bg-white/70 hover:border-up-accent/25"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span
                      className={`text-base font-semibold transition-colors ${
                        isOpen ? "text-up-accent" : "text-up-ink"
                      }`}
                    >
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-up-accent text-white" : "bg-subtle text-up-muted"
                      }`}
                    >
                      <Icon name="plus" size={16} strokeWidth={2.4} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-up-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
