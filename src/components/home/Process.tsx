"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { process } from "@/lib/courses";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

/**
 * Vertical offset per column, so the row steps down as it reads across. Kept
 * shallow on purpose: a deeper staircase drops the last card most of a screen
 * below the first, which reads as a broken grid rather than a rhythm.
 */
const DROP = ["lg:mt-0", "lg:mt-8", "lg:mt-16", "lg:mt-24"];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");

      // Collapsed from JS, never from CSS: with scripting off or reduced motion
      // on, the cards render fully open instead of showing only their headers.
      //
      // The open state is a grid row of 1fr rather than a measured pixel
      // height, so a card always resolves to its own content — nothing to clear
      // on completion, and nothing to re-measure on resize.
      steps.forEach((step) => {
        gsap.set(step.querySelector(".process-body"), {
          gridTemplateRows: "0fr",
        });
        gsap.set(step.querySelector(".process-head"), { y: 24, opacity: 0 });
        gsap.set(step.querySelectorAll(".process-reveal"), {
          y: 16,
          opacity: 0,
        });
      });

      // One scrubbed timeline for the whole block: scroll position *is* the
      // playhead, so the cards unfold one after another on the way down and
      // wrap themselves back up on the way up, at whatever speed you scroll.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 85%",
          // Viewport-relative, not "bottom …": the cards grow the grid as they
          // open, which would drag an element-relative end line along with it
          // and make the sequence feel like it is chasing itself.
          //
          // Kept well under one viewport. The section scrolls up by exactly
          // this distance while the sequence plays, so a longer range would
          // have the last card opening after the block had left the screen.
          end: "+=55%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      steps.forEach((step, i) => {
        const head = step.querySelector<HTMLElement>(".process-head");
        const body = step.querySelector<HTMLElement>(".process-body");
        const inner = step.querySelectorAll<HTMLElement>(".process-reveal");

        // One slot per card, overlapping the one before it: the next header
        // starts lifting while the current body is still opening, which keeps
        // the chain reading as a sequence without stretching it out.
        const at = i * 0.6;

        tl.to(head, { y: 0, opacity: 1, duration: 0.3 }, at)
          .to(
            body,
            { gridTemplateRows: "1fr", duration: 0.45, ease: "power2.inOut" },
            at + 0.15,
          )
          .to(
            inner,
            { y: 0, opacity: 1, duration: 0.3, stagger: 0.05 },
            at + 0.3,
          );
      });

      // The dividers draw down as the block scrolls through.
      gsap.fromTo(
        ".process-divider",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 78%",
            end: "bottom 65%",
            scrub: 0.8,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const total = String(process.length).padStart(2, "0");

  return (
    <section ref={root} className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title="From first phone call to first offer letter"
          subtitle="A deliberately simple path. No hidden steps, no upsells halfway through — you always know what the next four weeks look like."
        />

        <div className="process-grid relative mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {process.map((p, i) => (
            <div key={p.step} className={`relative ${DROP[i] ?? "lg:mt-0"}`}>
              {i > 0 && (
                <span
                  aria-hidden
                  className="process-divider absolute -left-4 top-0 hidden h-full w-px bg-line lg:block"
                />
              )}

              <article className="process-step overflow-hidden rounded-3xl bg-white ring-1 ring-line shadow-[0_18px_50px_-30px_rgba(11,26,77,0.45)]">
                <header className="process-head flex items-center justify-between gap-4 rounded-3xl bg-white px-6 py-5 shadow-[0_10px_20px_-16px_rgba(11,26,77,0.5)]">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-up-muted">
                    Step {p.step}
                  </span>
                  <h3 className="text-right text-base font-bold leading-tight text-up-ink">
                    {p.title}
                  </h3>
                </header>

                <div className="process-body grid [grid-template-rows:1fr]">
                  <div className="flex min-h-0 flex-col gap-6 overflow-hidden px-6 pb-6 pt-7">
                    <span className="process-reveal grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-hero-glow to-accent-glow text-hero-950 shadow-lg">
                      <Icon name={p.icon} size={22} strokeWidth={1.9} />
                    </span>

                    <p className="process-reveal text-sm leading-relaxed text-up-muted">
                      {p.body}
                    </p>

                    <div className="process-reveal flex items-end justify-between gap-3 pt-2">
                      <span className="rounded-full border border-up-line px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-up-ink">
                        {p.when}
                      </span>
                      <span className="font-display text-3xl font-extrabold leading-none text-line">
                        {p.step} / {total}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
