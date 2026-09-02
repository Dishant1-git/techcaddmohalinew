"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Icon from "@/components/ui/Icon";
import HeroCircuit from "@/components/home/HeroCircuit";

/** The hexagon badge that sits inline inside the headline. */
function InlineHex() {
  return (
    <span className="mx-[0.22em] inline-grid h-[0.82em] w-[0.72em] translate-y-[0.08em] place-items-center bg-gradient-to-br from-accent-glow to-hero-600 align-baseline [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]">
      <svg
        viewBox="0 0 24 24"
        className="h-[0.4em] w-[0.4em] text-hero-950"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m7 8-4 4 4 4M17 8l4 4-4 4M14 5l-4 14" />
      </svg>
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // fromTo (not from) everywhere: explicit end values stay correct even if
      // the effect is re-run while a previous timeline is mid-flight.
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".hero-line > span",
          { yPercent: 112, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.11 },
        )
        .fromTo(".hero-sub", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.55")
        .fromTo(
          ".hero-cta > *",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.1 },
          "-=0.5",
        )
        .fromTo(
          ".hero-circuit",
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          "-=0.45",
        );

      // Copy drifts up and dims as the hero scrolls away; the diagram stays put
      // so the traces do not slide out from under their cards.
      gsap.to(".hero-copy", {
        y: -50,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate overflow-hidden bg-hero-950 text-white">
      {/* Glow rising from the diagram, plus a cooler bloom behind the headline */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_92%,rgba(0,212,255,0.22),transparent_66%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(28,83,209,0.32),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

      <div className="relative z-10 pb-20 pt-[7.5rem] lg:pb-24 lg:pt-[11rem]">
        <div className="container-x hero-copy text-center">
          <h1 className="mx-auto max-w-5xl font-display text-[2rem] font-extrabold uppercase leading-[1.05] tracking-[-0.025em] sm:text-5xl lg:text-[3.9rem]">
            <span className="hero-line block overflow-hidden pb-[0.1em]">
              <span className="inline-block bg-gradient-to-r from-up-soft/60 via-white to-up-soft/60 bg-clip-text text-transparent">
                Engineer
                <InlineHex />
                your future in
              </span>
            </span>
            <span className="hero-line block overflow-hidden pb-[0.1em]">
              <span className="inline-block bg-gradient-to-r from-up-soft/60 via-white to-up-soft/60 bg-clip-text text-transparent">
                AI and software
              </span>
            </span>
          </h1>

          <p className="hero-sub mx-auto mt-6 max-w-xl text-[0.9rem] leading-relaxed text-up-soft/60 sm:text-[0.95rem]">
            We teach the AI, cloud and full-stack systems companies in Mohali and Chandigarh
            actually run on — with live projects, practising trainers and placement support
            until you are hired.
          </p>

          <div className="hero-cta mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-hero-glow to-accent-glow px-6 py-3 text-[0.88rem] font-bold text-hero-950 shadow-[0_18px_45px_-16px_rgba(0,212,255,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-14px_rgba(0,212,255,0.9)]"
            >
              Book a free demo
              <Icon
                name="arrowRight"
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[0.88rem] font-semibold text-white/85 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/45 hover:text-white"
            >
              Explore courses
            </Link>
          </div>
        </div>

        {/* Outside container-x: the diagram runs wider than the text column so
            the two cards sit near the edges, as in the reference. */}
        <div className="mt-12 px-5 lg:mt-4 lg:px-8">
          <HeroCircuit />
        </div>
      </div>
    </section>
  );
}
