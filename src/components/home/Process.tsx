"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { process } from "@/lib/courses";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 75%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        ".process-step",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: { trigger: ".process-grid", start: "top 82%", once: true },
        },
      );

      gsap.to(".process-node", {
        keyframes: [{ scale: 1.15 }, { scale: 1 }],
        duration: 0.6,
        ease: "back.out(3)",
        stagger: 0.18,
        scrollTrigger: { trigger: ".process-grid", start: "top 80%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title="From first phone call to first offer letter"
          subtitle="A deliberately simple path. No hidden steps, no upsells halfway through — you always know what the next four weeks look like."
        />

        <div className="process-grid relative mt-16">
          {/* Connecting rail */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-line lg:block">
            <div className="process-line h-full w-full origin-left bg-gradient-to-r from-hero-600 via-hero-glow to-accent-glow" />
          </div>

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {process.map((p) => (
              <div key={p.step} className="process-step relative">
                <div className="process-node relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-[0_10px_30px_-10px_rgba(11,26,77,0.35)] ring-1 ring-line">
                  <span className="font-display text-lg font-extrabold text-up-accent">{p.step}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-up-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-up-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
