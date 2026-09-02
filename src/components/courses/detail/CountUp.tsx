"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Counts from 0 to `to` the first time it scrolls into view.
 *
 * The final value is rendered on the server and left in the DOM until the
 * animation actually starts, so the number is correct with JS disabled, for
 * crawlers, and under reduced motion.
 */
export default function CountUp({
  to,
  duration = 1.8,
  locale = "en-IN",
}: {
  to: number;
  duration?: number;
  locale?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce) return;
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString(locale);
      },
    });

    return () => controls.stop();
  }, [inView, reduce, to, duration, locale]);

  return <span ref={ref}>{to.toLocaleString(locale)}</span>;
}
