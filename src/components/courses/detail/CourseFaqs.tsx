"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Course } from "@/lib/courses";
import { courseFaqs } from "@/lib/coursePage";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import { EASE, itemVariants, Stagger } from "@/components/courses/detail/Motion";

/**
 * FAQs for this specific course. The first five questions are generated from
 * the course itself (duration, level, modules, roles), so the answers are never
 * generic filler; the rest come from the shared institute-wide list.
 */
export default function CourseFaqs({ course }: { course: Course }) {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = courseFaqs(course);

  return (
    <section id="faqs" className="relative scroll-mt-36 overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative">
        {/* `items-start`, and no sticky on the left column: the heading block
            sits at the top of the section and scrolls away with it, rather
            than pinning and floating alongside the list. */}
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionTitle
              eyebrow="FAQs"
              title="Questions about this course"
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
