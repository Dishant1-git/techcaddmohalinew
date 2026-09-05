"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { DrawLine, EASE } from "@/components/courses/detail/Motion";

/** The heading's words rise out of their masks one after the other. */
const wordsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const wordVariants: Variants = {
  hidden: { y: "112%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

/**
 * Section heading for the course detail page — the Framer Motion counterpart of
 * the site-wide <SectionHeading/>, which is driven by GSAP `data-anim`
 * attributes this page deliberately does not use.
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const dark = tone === "dark";
  const words = title.split(" ");

  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${
            dark ? "border-white/15 bg-white/5 text-up-soft" : "border-up-line bg-brand-50 text-up-accent"
          }`}
        >
          <motion.span
            className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-accent-glow" : "bg-up-accent"}`}
            animate={reduce ? undefined : { opacity: [1, 0.25, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {eyebrow}
        </motion.div>
      )}

      {/* The trigger lives on the <h2>, not on the words.
          Each word starts a full line-height *below* its own mask, and
          IntersectionObserver clips a target by its ancestors' overflow — so a
          word observed on its own reports a zero intersection ratio, never
          crosses `amount`, and stays hidden for good. The heading itself is
          unclipped, so it enters view normally and hands the words their state
          down through variants. */}
      <motion.h2
        className={`font-display text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.7rem] ${
          dark ? "text-white" : "text-up-ink"
        }`}
        variants={wordsContainer}
        initial={reduce ? undefined : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.35 }}
      >
        {words.map((word, i) => (
          // The gap between words is margin on the mask, not a space inside it:
          // `overflow-hidden` clips trailing whitespace, which ran every word
          // into the next one.
          <span
            key={`${word}-${i}`}
            className={`inline-block overflow-hidden align-top ${
              i < words.length - 1 ? "mr-[0.26em]" : ""
            }`}
          >
            <motion.span className="inline-block" variants={reduce ? undefined : wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      <DrawLine
        className={`mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r ${
          dark ? "from-accent-glow to-transparent" : "from-up-accent to-transparent"
        } ${align === "center" ? "mx-auto" : ""}`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            dark ? "text-up-soft/80" : "text-up-muted"
          }`}
        >
          {subtitle}
        </motion.p>
      )}

      {children}
    </div>
  );
}
