"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";

const headline = ["Build the skills", "that turn you into a", "job-ready engineer"];

const floatCards = [
  { depth: 26, className: "left-0 top-0 z-20 w-[15.5rem]" },
  { depth: -34, className: "right-0 top-[8.5rem] z-10 w-[15.5rem]" },
  { depth: 18, className: "bottom-0 left-0 z-20 w-[18.5rem]" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // fromTo (not from) everywhere: explicit end values stay correct even if
      // the effect is re-run while a previous timeline is mid-flight.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-badge", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(
          ".hero-line span",
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.09 },
          "-=0.35",
        )
        .fromTo(".hero-sub", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.55")
        .fromTo(
          ".hero-cta > *",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          "-=0.5",
        )
        .fromTo(
          ".hero-stat",
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          "-=0.45",
        )
        // yPercent here, so the idle float below can own `y` without a fight.
        .fromTo(
          ".hero-card",
          { yPercent: 14, opacity: 0, scale: 0.94 },
          { yPercent: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.14 },
          "-=0.9",
        )
        .fromTo(".hero-cue", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3");

      // Idle float on the visual cluster
      gsap.utils.toArray<HTMLElement>(".hero-card").forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -14 : 12,
          duration: 3.4 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.25,
        });
      });

      // Pointer parallax
      const cards = gsap.utils.toArray<HTMLElement>("[data-depth]");
      const onMove = (e: PointerEvent) => {
        const cx = (e.clientX / window.innerWidth - 0.5) * 2;
        const cy = (e.clientY / window.innerHeight - 0.5) * 2;
        cards.forEach((c) => {
          const d = parseFloat(c.dataset.depth || "20");
          gsap.to(c, { x: cx * d, rotateY: cx * 4, rotateX: -cy * 3, duration: 1, ease: "power2.out" });
        });
        gsap.to(".hero-orb", { x: cx * -40, y: cy * -30, duration: 1.6, ease: "power2.out" });
      };
      window.addEventListener("pointermove", onMove);

      // Scroll-away
      gsap.to(".hero-inner", {
        y: -70,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      return () => window.removeEventListener("pointermove", onMove);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-hero-950 pb-24 pt-[7.5rem] lg:pb-32 lg:pt-[11rem]"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_15%_0%,#123285_0%,transparent_60%),radial-gradient(ellipse_70%_60%_at_85%_20%,#1c53d1_0%,transparent_55%)] opacity-80" />
      <div className="absolute inset-0 grid-lines" />
      <div className="hero-orb glow-blob left-[8%] top-[10%] h-[480px] w-[480px] bg-hero-glow/25" />
      <div className="hero-orb glow-blob right-[4%] top-[35%] h-[420px] w-[420px] bg-accent-glow/20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-hero-950" />

      <div className="container-x hero-inner relative grid items-center gap-16 lg:grid-cols-[1.08fr_1fr]">
        {/* Copy */}
        <div>
          <div className="hero-badge inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-up-soft backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-yellow opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-yellow" />
            </span>
            Admissions open · New batches at Sector 75, Mohali
          </div>

          <h1 className="mt-7 font-display text-[2.6rem] font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-[4.1rem]">
            {headline.map((line, i) => (
              <span key={line} className="hero-line block overflow-hidden pb-1">
                <span className="inline-block">
                  {i === 2 ? (
                    <>
                      job-ready <span className="text-gradient">engineer</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-6 max-w-xl text-base leading-relaxed text-up-soft/80 sm:text-lg">
            Learn the AI, cloud and full-stack systems companies in Mohali and Chandigarh
            actually run on. We handle the curriculum, the live projects and the placement
            drives — you show up and build.
          </p>

          <div className="hero-cta mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-hero-glow to-accent-glow px-7 py-3.5 text-sm font-bold text-hero-950 shadow-xl shadow-accent-glow/25 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-accent-glow/40"
            >
              Start your career
              <Icon name="arrowRight" size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/courses"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
            >
              Explore courses
              <Icon name="arrowUpRight" size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-up-soft transition-colors hover:text-white"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20">
                <Icon name="phone" size={15} />
              </span>
              {site.phone}
            </a>
          </div>

          <dl className="mt-12 flex max-w-xl flex-wrap gap-x-8 gap-y-6 border-t border-white/10 pt-8">
            {[
              { v: "Since 2007", l: "Training students across Punjab" },
              { v: "4.9★", l: "556+ verified Google reviews" },
              { v: "ISO", l: "Certified training programmes" },
            ].map((s) => (
              <div key={s.l} className="hero-stat max-w-[10rem]">
                <dt className="font-display text-xl font-extrabold text-white sm:text-2xl">{s.v}</dt>
                <dd className="mt-1.5 text-xs leading-snug text-up-soft/70">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual cluster */}
        <div className="relative mx-auto hidden h-[34rem] w-full max-w-lg [perspective:1200px] lg:block">
          <div
            data-depth={floatCards[0].depth}
            className={`hero-card absolute ${floatCards[0].className} rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl`}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-glow to-hero-600 text-hero-950">
                <Icon name="sparkles" size={20} />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Artificial Intelligence</p>
                <p className="text-[0.7rem] text-up-soft/70">6 months · Live projects</p>
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-accent-glow to-hero-glow" />
            </div>
            <p className="mt-2 text-[0.68rem] text-up-soft/60">Batch filling · 78%</p>
          </div>

          <div
            data-depth={floatCards[1].depth}
            className={`hero-card absolute ${floatCards[1].className} rounded-2xl border border-white/15 bg-hero-900/70 p-5 backdrop-blur-xl`}
          >
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-accent-yellow">
              Placement update
            </p>
            <p className="mt-3 font-display text-3xl font-extrabold text-white">98%</p>
            <p className="mt-1 text-xs text-up-soft/70">
              of eligible students placed through our hiring-partner network
            </p>
            <div className="mt-4 flex -space-x-2">
              {["R", "S", "A", "N", "K"].map((c, i) => (
                <span
                  key={c}
                  className="grid h-7 w-7 place-items-center rounded-full border border-hero-900 bg-gradient-to-br from-hero-glow to-hero-600 text-[0.65rem] font-bold text-white"
                  style={{ zIndex: 5 - i }}
                >
                  {c}
                </span>
              ))}
              <span className="grid h-7 w-7 place-items-center rounded-full border border-hero-900 bg-white/15 text-[0.6rem] font-bold text-white">
                +
              </span>
            </div>
          </div>

          <div
            data-depth={floatCards[2].depth}
            className={`hero-card absolute ${floatCards[2].className} overflow-hidden rounded-2xl border border-white/15 bg-hero-950/80 backdrop-blur-xl`}
          >
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[0.62rem] text-up-soft/50">career.js</span>
            </div>
            <pre className="px-4 py-3.5 font-mono text-[0.66rem] leading-relaxed text-up-soft/80">
              <code>
                <span className="text-accent-glow">const</span> you = <span className="text-accent-yellow">await</span> techcadd
                {"\n"}
                {"  "}.train(<span className="text-[#7ee787]">&apos;full-stack&apos;</span>)
                {"\n"}
                {"  "}.build(liveProjects)
                {"\n"}
                {"  "}.placeAt(hiringPartners);
                {"\n\n"}
                <span className="text-up-soft/40">{"// → offer letter ✓"}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-cue container-x relative mt-16 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-up-soft/50 lg:flex">
        <span className="relative h-10 w-6 rounded-full border border-white/20">
          <span className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 animate-bounce rounded-full bg-accent-glow" />
        </span>
        Scroll to explore
      </div>
    </section>
  );
}
