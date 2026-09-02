"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { categories } from "@/lib/courses";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

/**
 * The pin is built against a measured layout, so the effect runs in the commit
 * phase. On the server there is nothing to measure.
 */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Categories() {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    // Pinning a horizontal rail only works where there is width and height to
    // spend on it. Below lg — or in a short window, where the section would be
    // taller than the viewport — the rail stays a plain swipeable row.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (min-height: 720px)", () => {
      const trackEl = track.current;
      const viewEl = viewport.current;
      if (!trackEl || !viewEl) return;

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
      className="relative flex flex-col overflow-hidden py-24 lg:h-screen lg:min-h-[44rem] lg:justify-center lg:py-0"
    >
      <div className="absolute inset-0 grid-lines-light opacity-70" />

      <div className="container-x relative shrink-0">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What you can learn"
            title={
              <>
                Six fields, one campus in{" "}
                <span className="text-up-accent">Mohali</span>
              </>
            }
            subtitle="Every track is taught by working professionals, built around live projects, and backed by the same placement cell."
          />
          <Link
            data-anim="fade"
            href="/courses"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-up-line px-6 py-3 text-sm font-semibold text-up-ink transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
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

      {/* Full-bleed rail: the cards run past both edges of the container. */}
      <div
        ref={viewport}
        className="rail-scroll relative mt-12 snap-x snap-mandatory overflow-x-auto overflow-y-hidden lg:mt-10 lg:snap-none lg:overflow-x-hidden"
      >
        <div
          ref={track}
          className="flex w-max items-stretch gap-6 px-[max(1.25rem,calc((100vw-80rem)/2))] py-8 lg:gap-10 lg:py-16"
        >
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/courses?category=${cat.key}`}
              className="rail-card group relative flex w-[17rem] shrink-0 snap-center sm:w-[20rem] lg:w-[clamp(18rem,25vw,23rem)]"
            >
              {/* Three transform layers, one owner each: .rail-card is the
                  entrance (slide in from the right), .rail-tilt is the
                  scroll-scrubbed lean, and .card-hover is the CSS hover lift —
                  an inline GSAP transform on any of them would otherwise win
                  over the others. */}
              <div className="rail-tilt flex w-full">
                <div className="card-hover relative flex w-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-8">
                  <div
                    className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${cat.accent} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-25`}
                  />

                  <span
                    className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${cat.accent} text-hero-950 shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}
                  >
                    <Icon name={cat.icon} size={26} strokeWidth={1.9} />
                  </span>

                  <h3 className="relative mt-6 text-xl font-bold text-up-ink transition-colors group-hover:text-up-accent">
                    {cat.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-up-muted">
                    {cat.blurb}
                  </p>

                  <span className="relative mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-up-accent">
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
