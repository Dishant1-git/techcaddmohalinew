"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Scroll-motion primitives for the course detail page.
 *
 * The rest of the site is animated by the global GSAP <Animator/>, which keys
 * off `data-anim` attributes. This page uses Framer Motion instead, so nothing
 * here carries a `data-anim` attribute — the two systems never touch the same
 * element and neither can leave content stranded at opacity 0.
 *
 * Every primitive checks `useReducedMotion` and collapses to a static render
 * when the user has asked for less motion.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 44 },
  down: { x: 0, y: -44 },
  left: { x: -52, y: 0 },
  right: { x: 52, y: 0 },
  none: { x: 0, y: 0 },
};

/* -------------------------------------------------------------------------- *
 *                                   Reveal                                    *
 * -------------------------------------------------------------------------- */

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.75,
  blur = false,
  className,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Adds a de-blur to the entrance — used sparingly, on hero-level elements. */
  blur?: boolean;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "p";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const { x, y } = OFFSET[direction];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, x, y, filter: blur ? "blur(12px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- *
 *                              Stagger container                              *
 * -------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Stagger({
  children,
  className,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

/** A child of <Stagger/>. Inherits the parent's `hidden` / `show` states. */
export function StaggerItem({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  /** Lifts on hover — for cards, not for text. */
  hover?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      whileHover={hover ? { y: -8, transition: { duration: 0.35, ease: EASE } } : undefined}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- *
 *                                  Draw line                                  *
 * -------------------------------------------------------------------------- */

/** The short gradient rule under a section heading — wipes in from the left. */
export function DrawLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className} />;

  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "left center" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

export { EASE };
