"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { categories as builtInCategories } from "@/lib/courses";
import type { CourseCategory } from "@/lib/cms/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

/**
 * The pin is built against a measured layout, so the effect runs in the commit
 * phase. On the server there is nothing to measure.
 */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** `items` is the list to render — the page passes the CMS-merged one. */
export default function Categories({ items = builtInCategories }: { items?: CourseCategory[] }) {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    // Every width gets the drift — page scroll moves the cards sideways, which
    // is what makes this work on a phone: there is no horizontal swipe to
    // compete with the vertical one. Height is still gated, because a window
    // too short to hold the section cannot pin it without clipping; below that
    // the rail falls back to the plain swipeable row it renders as by default.
    const mm = gsap.matchMedia();

    mm.add("(min-height: 640px)", () => {
      const trackEl = track.current;
      const viewEl = viewport.current;
      if (!trackEl || !viewEl) return;

      // The rail ships as a natively scrollable row so it still works with no
      // JS, under reduced motion, or in a window too short to pin. Once the
      // drift takes over, that native scroll would fight it — so hand the axis
      // to GSAP and give it back on cleanup.
      viewEl.style.overflowX = "hidden";

      // All measured through functions so a refresh (fonts, resize) re-reads
      // them instead of pinning against stale numbers.

      // The rail opens with the whole row parked off the right edge — the first
      // card's left edge sits on the viewport's right edge — so every card
      // enters from the right instead of some already standing in place.
      const from = () => {
        const first = trackEl.firstElementChild as HTMLElement | null;
        return viewEl.clientWidth - (first?.offsetLeft ?? 0);
      };
      const to = () => Math.min(0, viewEl.clientWidth - trackEl.scrollWidth);
      const distance = () => from() - to();

      const drift = gsap.fromTo(
        trackEl,
        { x: from },
        {
          x: to,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );

      // Each card animates against the horizontal drift rather than the page
      // scroll, so they arrive one by one as they cross in from the right.
      const cards = gsap.utils.toArray<HTMLElement>(".rail-card", trackEl);
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { xPercent: 30, opacity: 0, scale: 0.94 },
          {
            xPercent: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            duration: 0.9,
            scrollTrigger: {
              trigger: card,
              containerAnimation: drift,
              start: "left 96%",
              once: true,
            },
          },
        );
      });

      // The "moveable" part: while a card travels, its own tilt is scrubbed
      // from leaning one way to leaning the other, with a little vertical
      // drift. Neighbours counter-rotate, so the row reads as loose panels
      // being pushed past rather than a rigid strip.
      const tilts = gsap.utils.toArray<HTMLElement>(".rail-tilt", trackEl);
      tilts.forEach((tilt, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.fromTo(
          tilt,
          { rotate: 6.5 * dir, yPercent: 3.5 * dir },
          {
            rotate: -6.5 * dir,
            yPercent: -3.5 * dir,
            ease: "none",
            scrollTrigger: {
              trigger: tilt,
              containerAnimation: drift,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      return () => {
        viewEl.style.overflowX = "";
        gsap.set(trackEl, { clearProps: "transform" });
        cards.forEach((card) =>
          gsap.set(card, { clearProps: "opacity,transform" }),
        );
        tilts.forEach((tilt) => gsap.set(tilt, { clearProps: "transform" }));
      };
    });

    return () => mm.revert();
  }, []);

  return (
    // Pinned, the section holds the viewport, so on lg it is sized to exactly
    // one screen and the heading + rail are laid out inside that budget.
    <section
      ref={root}
      // Sized to exactly one viewport wherever it will be pinned, so the
      // heading and rail are laid out inside that budget. The media query
      // matches the one gating the pin in JS — if it is too short to pin, it is
      // too short to lock to the viewport either.
      className="relative flex flex-col overflow-hidden bg-hero-950 py-20 text-white [@media(min-height:640px)]:h-[100svh] [@media(min-height:640px)]:min-h-[36rem] [@media(min-height:640px)]:justify-center [@media(min-height:640px)]:py-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_15%,rgba(28,83,209,0.35),transparent_68%)]" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative shrink-0">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <SectionHeading
            tone="dark"
            eyebrow="What you can learn"
            title={
              <>
                Six fields, one campus in{" "}
                <span className="text-accent-glow">Mohali</span>
              </>
            }
            subtitle="Every track is taught by working professionals, built around live projects, and backed by the same placement cell."
          />
          <Link
            data-anim="fade"
            href="/courses"
            // Hidden on small screens: the section is pinned to one viewport
            // there, and every card already links into its own category.
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/5 lg:inline-flex"
          >
            Browse all courses
            <Icon
              name="arrowRight"
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* Full-bleed rail: the cards run past both edges of the container. Both
          overflow axes are stated — `overflow-x` alone would make the y-axis
          compute to `auto`, clipping the cards' tilt and adding a stray
          vertical scroller. */}
      <div
        ref={viewport}
        className="rail-scroll relative mt-8 overflow-x-auto overflow-y-hidden lg:mt-10"
      >
        <div
          ref={track}
          className="flex w-max items-stretch gap-5 px-[max(1.25rem,calc((100vw-80rem)/2))] py-6 sm:gap-6 lg:gap-10 lg:py-14"
        >
          {items.map((cat) => (
            <Link
              key={cat.key}
              href={`/courses?category=${cat.key}`}
              className="rail-card group relative flex w-[15.5rem] shrink-0 sm:w-[19rem] lg:w-[clamp(18rem,25vw,23rem)]"
            >
              {/* Three transform layers, one owner each: .rail-card is the
                  entrance (slide in from the right), .rail-tilt is the
                  scroll-scrubbed lean, and .card-hover is the CSS hover lift —
                  an inline GSAP transform on any of them would otherwise win
                  over the others. */}
              <div className="rail-tilt flex w-full">
                {/* glass-dark, not glass: the rail sits on the dark ground, and
                    its translucent fill carries the frost on its own — the
                    ancestor transforms above would otherwise leave a
                    backdrop-filter with nothing to sample. */}
                <div className="card-hover glass-dark glass-sheen relative flex w-full flex-col overflow-hidden rounded-3xl p-6 lg:p-8">
                  <div
                    className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${cat.accent} opacity-30 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-55`}
                  />

                  <span
                    className={`relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${cat.accent} text-hero-950 shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 lg:h-14 lg:w-14`}
                  >
                    <Icon name={cat.icon} size={24} strokeWidth={1.9} />
                  </span>

                  <h3 className="relative mt-5 text-lg font-bold text-white transition-colors group-hover:text-accent-glow lg:mt-6 lg:text-xl">
                    {cat.title}
                  </h3>
                  {/* Clamped on small screens: the whole section is pinned to
                      one viewport there, and a four-line blurb is what pushes
                      the card past it. */}
                  <p className="relative mt-2.5 line-clamp-3 text-sm leading-relaxed text-up-soft/70 lg:mt-3 lg:line-clamp-none">
                    {cat.blurb}
                  </p>

                  <span className="relative mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent-glow lg:pt-6">
                    Explore track
                    <Icon
                      name="arrowRight"
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
