"use client";

import type { ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { EASE } from "@/components/courses/detail/Motion";

/**
 * A card whose surface lights up under the pointer.
 *
 * The cursor position is held in motion values and piped straight into a CSS
 * radial-gradient through `useMotionTemplate`, so tracking the pointer never
 * re-renders React — the browser only recomputes one background. That is what
 * makes it safe to put on a grid of a dozen cards at once.
 *
 * The glow fades rather than snapping, and the whole effect is skipped under
 * `prefers-reduced-motion`, where the card renders as a plain bordered panel.
 */
export default function SpotlightCard({
  children,
  className = "",
  tone = "light",
  lift = 6,
  radius = 18,
}: {
  children: ReactNode;
  className?: string;
  /** Picks the glow tint: brand blue on light panels, cyan on dark ones. */
  tone?: "light" | "dark";
  /** Pixels the card rises on hover. 0 disables the lift. */
  lift?: number;
  /** Glow radius, in rem. */
  radius?: number;
}) {
  const reduce = useReducedMotion();

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  // Spring the opacity so the glow eases in and out instead of popping.
  const glow = useSpring(useMotionValue(0), { stiffness: 220, damping: 30 });

  const tint = tone === "dark" ? "rgba(0,212,255,0.15)" : "rgba(28,83,209,0.09)";
  const background = useMotionTemplate`radial-gradient(${radius}rem circle at ${x}px ${y}px, ${tint}, transparent 70%)`;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerEnter={() => glow.set(1)}
      onPointerLeave={() => glow.set(0)}
      whileHover={lift ? { y: -lift } : undefined}
      transition={{ duration: 0.35, ease: EASE }}
      className={`relative ${className}`}
    >
      {/* The glow itself, and a hairline that brightens with it — together they
          read as the card's edge catching the light. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background, opacity: glow }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -top-px h-px rounded-full bg-gradient-to-r from-transparent via-current to-transparent"
        style={{ opacity: glow }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
