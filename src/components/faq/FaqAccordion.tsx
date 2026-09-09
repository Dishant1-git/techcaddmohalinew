"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { faqCategories as builtInFaqCategories, type FaqCategory } from "@/lib/faq";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";

const EASE = [0.22, 1, 0.36, 1] as const;

/** `groups` are the tabs to render — the page passes the CMS-merged set. */
export default function FaqAccordion({ groups = builtInFaqCategories }: { groups?: FaqCategory[] }) {
  /*
    The first tab, whatever it is.

    It used to be the hard-coded `defaultFaqCategory`, which is one of the six
    built-in keys — so when the CMS supplies the tabs instead, that key matched
    nothing and the page opened with no tab highlighted.
  */
  const [active, setActive] = useState<string>(groups[0]?.key ?? "");
  const [open, setOpen] = useState<number | null>(0);

  const activeCategory = useMemo(
    () => groups.find((c) => c.key === active) ?? groups[0],
    [active, groups],
  );

  function selectTab(key: string) {
    setActive(key);
    setOpen(0);
  }

  return (
    <div>
      {/*
        One line that scrolls, rather than wrapping.

        With the general tab there are seven of these and the last one wrapped
        onto a row of its own, which reads as a mistake rather than a second
        row. The count is not fixed either — it grows with the categories in
        the CMS — so a layout that only works up to six was going to break
        again. `no-scrollbar` hides the bar (the page styles a thick one) while
        leaving the strip swipeable, which is also how it already behaves on a
        phone.
      */}
      <div className="no-scrollbar flex gap-x-7 overflow-x-auto border-b border-line">
        {groups.map((c) => (
          <button
            key={c.key}
            onClick={() => selectTab(c.key)}
            className={`relative flex shrink-0 items-center gap-1.5 whitespace-nowrap pb-4 text-sm font-semibold transition-colors ${
              active === c.key ? "text-up-accent" : "text-up-muted hover:text-up-ink"
            }`}
          >
            {c.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold ${
                active === c.key ? "bg-brand-100 text-up-accent" : "bg-subtle text-up-muted"
              }`}
            >
              {c.items.length}
            </span>
            <span
              className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-up-accent transition-opacity ${
                active === c.key ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-3">
        {activeCategory.items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
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
            </div>
          );
        })}
      </div>

      <div className="mt-14 rounded-[2rem] border border-line bg-subtle px-8 py-12 text-center lg:px-16">
        <p className="font-display text-2xl font-extrabold text-up-ink sm:text-3xl">Still not sure?</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-up-muted">
          Compare tracks, timings and fees on a quick call with a counsellor — usually faster than
          reading the rest of this list.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-hero-950 px-8 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Talk to a counsellor
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-up-line px-7 py-3.5 text-sm font-semibold text-up-ink transition-all hover:-translate-y-0.5 hover:border-up-accent/40"
          >
            <Icon name="phone" size={15} className="text-up-accent" /> {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
