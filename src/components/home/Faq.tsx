"use client";

import { useState } from "react";
import { faqs as builtInFaqs } from "@/lib/courses";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/site";

/** `items` are the questions to list — pages pass the CMS-merged set. */
export default function Faq({ items = builtInFaqs }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faqs"
      className="relative scroll-mt-32 overflow-hidden bg-hero-950 py-24 text-white lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_25%_20%,rgba(28,83,209,0.32),transparent_68%)]" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              tone="dark"
              eyebrow="FAQs"
              title="Questions we get every week"
              subtitle="Still unsure? A ten-minute call with a counsellor usually settles it faster than any brochure."
            />

            <div
              data-anim="up"
              data-anim-delay="0.15"
              className="glass-dark relative mt-8 rounded-2xl p-6"
            >
              <p className="text-sm font-semibold text-white">Ask us directly</p>
              <div className="mt-4 space-y-2.5 text-sm">
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2.5 text-up-soft/70 transition-colors hover:text-white"
                >
                  <Icon name="phone" size={15} className="text-up-accent" /> {site.phone}
                </a>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-up-soft/70 transition-colors hover:text-white"
                >
                  <Icon name="whatsapp" size={15} className="text-up-accent" /> WhatsApp {site.whatsapp}
                </a>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-2.5 text-up-soft/70 transition-colors hover:text-white"
                >
                  <Icon name="mail" size={15} className="text-up-accent" /> {site.email}
                </a>
              </div>
            </div>
          </div>

          <div data-anim="up" data-anim-stagger className="space-y-3">
            {items.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={`glass-dark relative overflow-hidden rounded-2xl transition-colors duration-300 ${
                    isOpen ? "!border-accent-glow/35 !bg-white/[0.11]" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span
                      className={`text-base font-semibold transition-colors ${
                        isOpen ? "text-accent-glow" : "text-white"
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 bg-accent-glow text-hero-950"
                          : "bg-white/10 text-up-soft/70"
                      }`}
                    >
                      <Icon name="plus" size={16} strokeWidth={2.4} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-400 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-up-soft/70">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
