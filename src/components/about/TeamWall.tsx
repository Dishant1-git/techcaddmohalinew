"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { teamPhotos } from "@/lib/team";

/**
 * The team portrait panel: a contained card holding two rows of oval portraits
 * on a checkerboard of heights, over a soft pastel wash.
 *
 * The loop is: both rows slide one card to the left, hold two seconds, then
 * every card trades height with its neighbours — short grows, tall shrinks —
 * and round again.
 *
 * Two things hold the layout still while that runs:
 *
 *  • Neighbouring cards are always in antiphase, so a row contains both sizes
 *    at every instant. Its height never changes, and the gap between the two
 *    rows cannot open up.
 *
 *  • Only `height` is animated. Width belongs to the grid column and is never
 *    touched, so growth is strictly vertical. Height rather than `scaleY`
 *    because scaling stretches faces, while a height change lets `object-cover`
 *    re-crop.
 */

/** Card geometry per breakpoint, in px. Heights must match `.team-cell` in
 *  globals.css, which is what renders before this timeline builds. */
const SIZES = {
  desktop: { tall: 288, short: 208, width: 200, gap: 20 },
  mobile: { tall: 224, short: 160, width: 150, gap: 12 },
};

/** Enough copies that a row stays wider than its frame all the way round. */
const PASSES = 4;

const ROW_A = teamPhotos.slice(0, 6);
const ROW_B = teamPhotos.slice(6);

function Row({
  photos,
  rowRef,
  /** Offsets the checkerboard so the second row opens on the opposite size. */
  offset = 0,
}: {
  photos: string[];
  rowRef: React.RefObject<HTMLDivElement | null>;
  offset?: number;
}) {
  return (
    <div className="h-[14rem] overflow-hidden sm:h-[18rem]">
      {/* One grid row flowing in columns: `auto-cols` is the single source of
          card width, so the only space between two portraits is the gap. */}
      <div
        ref={rowRef}
        className="grid h-full w-max grid-flow-col auto-cols-[150px] items-center gap-x-3 sm:auto-cols-[200px] sm:gap-x-5"
      >
        {Array.from({ length: PASSES }).flatMap((_, pass) =>
          photos.map((src, i) => (
            <figure
              key={`${pass}-${i}`}
              // Only the first pass is announced — the rest are the same people
              // repeated to keep the row wide enough to travel.
              aria-hidden={pass > 0 || undefined}
              className={`team-cell relative overflow-hidden rounded-full bg-subtle ${
                (i + offset) % 2 === 1 ? "team-cell-short" : ""
              }`}
            >
              <Image
                src={src}
                alt={pass > 0 ? "" : "A member of the techcadd team"}
                fill
                sizes="(min-width: 640px) 200px, 150px"
                className="object-cover object-top"
              />
            </figure>
          )),
        )}
      </div>
    </div>
  );
}

export default function TeamWall() {
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const a = rowA.current;
    const b = rowB.current;
    if (!a || !b) return;

    const mm = gsap.matchMedia();

    const build = (size: (typeof SIZES)[keyof typeof SIZES]) => () => {
      const cards = [
        ...gsap.utils.toArray<HTMLElement>(".team-cell", a),
        ...gsap.utils.toArray<HTMLElement>(".team-cell", b),
      ];
      if (!cards.length) return;

      const short = cards.filter((c) => c.classList.contains("team-cell-short"));
      const tall = cards.filter((c) => !c.classList.contains("team-cell-short"));

      const step = size.width + size.gap;

      gsap.set(tall, { height: size.tall });
      gsap.set(short, { height: size.short });

      /**
       * Wraps x back into one pass width, so the row travels left forever
       * without the transform growing without bound. The content repeats every
       * pass, so the wrap lands on an identical frame and is invisible.
       *
       * JavaScript's `%` keeps the sign of the dividend, so a negative x stays
       * negative — which is exactly the range wanted here.
       */
      const wrap = (photoCount: number) => {
        const pass = photoCount * step;
        return { x: gsap.utils.unitize((x: number) => x % pass) };
      };

      // The two rows hold different numbers of photographs, so each wraps at
      // its own pass width — hence one tween per row rather than one for both.
      const slide = (tl: gsap.core.Timeline, label: string) => {
        tl.to(a, { x: `-=${step}`, duration: 1.1, modifiers: wrap(ROW_A.length) }, label).to(
          b,
          { x: `-=${step}`, duration: 1.1, modifiers: wrap(ROW_B.length) },
          label,
        );
      };

      /**
       * Two slides per loop, not one. The heights have to be back where they
       * started for the timeline to repeat cleanly, and two swaps is what
       * returns them — so the loop is slide-hold-swap twice over.
       *
       * `repeatRefresh` re-reads the relative `-=` on each repeat; without it
       * GSAP replays the absolute values it recorded the first time and the row
       * snaps back to where it began instead of carrying on left.
       */
      const tl = gsap.timeline({
        repeat: -1,
        repeatRefresh: true,
        defaults: { ease: "power2.inOut" },
      });

      slide(tl, "slideA");
      tl.to({}, { duration: 2 })
        .addLabel("swapA")
        .to(tall, { height: size.short, duration: 0.8 }, "swapA")
        .to(short, { height: size.tall, duration: 0.8 }, "swapA");

      slide(tl, "slideB");
      tl.to({}, { duration: 2 })
        .addLabel("swapB")
        .to(tall, { height: size.tall, duration: 0.8 }, "swapB")
        .to(short, { height: size.short, duration: 0.8 }, "swapB");

      return () => {
        tl.kill();
        gsap.set([a, b, ...cards], { clearProps: "height,transform" });
      };
    };

    mm.add("(min-width: 640px)", build(SIZES.desktop));
    mm.add("(max-width: 639px)", build(SIZES.mobile));

    return () => mm.revert();
  }, []);

  return (
    <section className="py-20 lg:py-28" aria-labelledby="team-heading">
      <div className="container-x">
        <h2 id="team-heading" className="sr-only">
          Our team
        </h2>

        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white px-5 py-12 sm:px-10 sm:py-16 lg:px-14">
          {/* The pastel wash, in this site's own hues rather than the
              reference's. Kept behind a white ground so the ovals stay the
              brightest thing in the panel. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="glow-blob -left-20 top-0 h-72 w-72 bg-brand-300/45" />
            <div className="glow-blob -right-16 top-10 h-64 w-64 bg-accent-400/35" />
            <div className="glow-blob -bottom-24 left-1/3 h-72 w-72 bg-accent-yellow/25" />
            <div className="glow-blob -bottom-16 -right-10 h-56 w-56 bg-hero-glow/20" />
          </div>

          <p className="relative mx-auto max-w-2xl text-center text-[0.82rem] leading-relaxed text-up-muted sm:text-sm">
            A diverse team of passionate professionals with unique skills driving innovation and
            excellence in every project.
          </p>

          {/* Each row clips its own travel; the fades sit over both so the pair
              reads as one panel rather than two strips. */}
          <div className="relative mt-10 sm:mt-14">
            <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-20" />
            <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-20" />

            <Row photos={ROW_A} rowRef={rowA} />
            <Row photos={ROW_B} rowRef={rowB} offset={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
