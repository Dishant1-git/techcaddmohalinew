"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * A two-layer pointer follower: a crisp ring that trails just behind the
 * cursor and a soft glow that lags further back.
 *
 * The native cursor is left visible on purpose. Replacing it would mean
 * re-implementing the text caret, the resize handles and the link hand, and
 * anything missed there costs real usability on a site whose main job is to get
 * people into a form.
 *
 * The ring is drawn in white with `mix-blend-mode: difference` so it inverts
 * against whatever is under it — legible on the dark navy hero and on the white
 * page body without needing to know which one it is over.
 */

/** Anything the ring should swell over. `data-cursor` opts a section in by hand. */
const INTERACTIVE =
  'a, button, summary, label, input, select, textarea, [role="button"], [data-cursor]';

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // No pointer to follow on a touch screen, and a follower is exactly the
    // kind of decorative motion reduced-motion users are asking us to drop.
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!ring || !glow) return;

    // xPercent/yPercent centre the layers on the pointer and are held apart
    // from x/y by GSAP's transform system, so the tweens below never fight it.
    gsap.set([ring, glow], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    // quickTo keeps one tween per property alive and retargets it. A 120Hz
    // mouse would otherwise allocate a fresh tween on every event.
    const ringX = gsap.quickTo(ring, "x", { duration: 0.36, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.36, ease: "power3.out" });
    const glowX = gsap.quickTo(glow, "x", { duration: 0.95, ease: "power3.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 0.95, ease: "power3.out" });

    let visible = false;
    let hot = false;
    let down = false;

    /** One tween per state change rather than one per mousemove. */
    const scaleRing = () => {
      gsap.to(ring, {
        scale: down ? 0.82 : hot ? 1.9 : 1,
        borderColor: hot ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)",
        duration: 0.32,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        // Land on the first known position instead of flying in from 0,0.
        gsap.set([ring, glow], { x: e.clientX, y: e.clientY });
        gsap.to([ring, glow], { autoAlpha: 1, duration: 0.35 });
      }

      ringX(e.clientX);
      ringY(e.clientY);
      glowX(e.clientX);
      glowY(e.clientY);

      const target = e.target as Element | null;
      const next = !!target?.closest?.(INTERACTIVE);
      if (next !== hot) {
        hot = next;
        scaleRing();
      }
    };

    const onDown = () => {
      down = true;
      scaleRing();
    };

    const onUp = () => {
      down = false;
      scaleRing();
    };

    /**
     * Fade out when the pointer leaves the window. `relatedTarget` is null only
     * when it left the document entirely — moving between two elements also
     * fires mouseout, and that must not hide the ring.
     */
    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      visible = false;
      gsap.to([ring, glow], { autoAlpha: 0, duration: 0.25 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseout", onOut);
      gsap.killTweensOf([ring, glow]);
    };
  }, []);

  return (
    <>
      {/* Both layers start at opacity 0 in the markup, so on a touch device or
          under reduced motion — where the effect above returns early and never
          touches them — they simply stay invisible. */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-[22rem] w-[22rem] rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.16) 0%, rgba(28,83,209,0.08) 40%, transparent 68%)",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border-[1.5px] opacity-0 mix-blend-difference"
        style={{ borderColor: "rgba(255,255,255,0.65)" }}
      />
    </>
  );
}
