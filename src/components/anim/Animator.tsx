"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

/**
 * A single global animation driver.
 *
 * Sections stay server components and simply declare intent with data attributes:
 *
 *   data-anim="up | fade | left | right | scale | blur | words | mask"
 *   data-anim-delay="0.15"
 *   data-anim-stagger   -> animate this element's direct children in sequence
 *   data-parallax="-80" -> translate Y by this many px across the scroll range
 *   data-count="12450"  -> count up to this number when scrolled into view
 *
 * Everything is wrapped in a gsap.context so React strict-mode double mounts and
 * route changes clean up after themselves.
 */

const FROM: Record<string, gsap.TweenVars> = {
  up: { y: 48, opacity: 0 },
  fade: { opacity: 0 },
  left: { x: -56, opacity: 0 },
  right: { x: 56, opacity: 0 },
  scale: { scale: 0.9, opacity: 0 },
  blur: { opacity: 0, filter: "blur(14px)", y: 24 },
  mask: { yPercent: 110, opacity: 0 },
};

const EASE = "power3.out";

/**
 * Wrap each word in an overflow-hidden mask so it can slide up into place.
 * Element children (e.g. a coloured <span> inside a heading) are kept intact
 * and treated as a single unit, so inline styling survives the split.
 */
function splitToWords(el: HTMLElement) {
  if (el.dataset.split === "done") {
    return Array.from(el.querySelectorAll<HTMLElement>(".word-inner"));
  }

  const source = Array.from(el.childNodes);
  const frag = document.createDocumentFragment();
  const inners: HTMLElement[] = [];

  const wrap = (node: Node) => {
    const outer = document.createElement("span");
    outer.style.display = "inline-block";
    outer.style.overflow = "hidden";
    outer.style.verticalAlign = "top";
    const inner = document.createElement("span");
    inner.className = "word-inner";
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.appendChild(node);
    outer.appendChild(inner);
    frag.appendChild(outer);
    inners.push(inner);
  };

  for (const node of source) {
    if (node.nodeType === Node.TEXT_NODE) {
      for (const part of (node.textContent ?? "").split(/(\s+)/)) {
        if (!part) continue;
        if (!part.trim()) frag.appendChild(document.createTextNode(part));
        else wrap(document.createTextNode(part));
      }
    } else {
      wrap(node);
    }
  }

  el.textContent = "";
  el.appendChild(frag);
  el.dataset.split = "done";
  return inners;
}

function formatNumber(n: number) {
  return Math.round(n).toLocaleString("en-IN");
}

export default function Animator() {
  const pathname = usePathname();

  // Smooth scroll — mounted once, kept across route changes.
  useEffect(() => {
    // Reduced motion: no smooth scroll, and the styles were never armed, so
    // every section renders in its final state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Published so page-level components can scroll through this instance
    // instead of running a second, competing animation. See `@/lib/lenis`.
    setLenis(lenis);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links routed through Lenis so in-page jumps stay smooth.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -96 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      setLenis(undefined);
      lenis.destroy();
    };
  }, []);

  // Scroll-triggered reveals — rebuilt on every route change.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // We booted, so the layout watchdog does not need to disarm the styles.
    const w = window as Window & { __animWatchdog?: ReturnType<typeof setTimeout> };
    if (w.__animWatchdog) {
      clearTimeout(w.__animWatchdog);
      w.__animWatchdog = undefined;
    }
    document.documentElement.classList.add("anim-armed");

    const ctx = gsap.context(() => {
      // ---- Reveals -------------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-anim]").forEach((el) => {
        const kind = el.dataset.anim || "up";
        const delay = parseFloat(el.dataset.animDelay || "0");
        const trigger = { trigger: el, start: "top 88%", once: true } as const;

        // fromTo, never from: explicit end values survive an effect that is
        // re-run while a previous tween on the same element is mid-flight.
        const TO: gsap.TweenVars = {
          x: 0,
          y: 0,
          yPercent: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        };

        if (kind === "words") {
          const words = splitToWords(el);
          gsap.set(el, { opacity: 1 });
          gsap.fromTo(
            words,
            { yPercent: 115, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              ease: EASE,
              stagger: 0.045,
              delay,
              scrollTrigger: trigger,
            },
          );
          return;
        }

        if (el.hasAttribute("data-anim-stagger")) {
          const kids = Array.from(el.children) as HTMLElement[];
          gsap.set(el, { opacity: 1 });
          gsap.fromTo(
            kids,
            { ...FROM[kind] },
            {
              ...TO,
              duration: 0.85,
              ease: EASE,
              stagger: 0.1,
              delay,
              scrollTrigger: trigger,
              clearProps: "filter",
            },
          );
          return;
        }

        gsap.fromTo(
          el,
          { ...FROM[kind] },
          {
            ...TO,
            duration: 0.95,
            ease: EASE,
            delay,
            scrollTrigger: trigger,
            clearProps: "filter",
          },
        );
      });

      // ---- Parallax ------------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const distance = parseFloat(el.dataset.parallax || "-60");
        gsap.to(el, {
          y: distance,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ---- Counters ------------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = formatNumber(obj.v);
          },
        });
      });

      // ---- Section header underlines --------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-underline]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });

      // ---- Progress bars ---------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((el) => {
        gsap.fromTo(
          el,
          { width: "0%" },
          {
            width: el.dataset.progress + "%",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          },
        );
      });
    });

    ScrollTrigger.refresh();

    /**
     * Safety net. A ScrollTrigger can miss if the page height shifts after its
     * start position was measured (late fonts, images, an embedded map). Any
     * element that is already past the trigger line but still transparent is
     * revealed directly, so a section on screen is never blank.
     */
    const sweep = () => {
      const line = window.innerHeight * 0.8;
      document.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top > line || rect.bottom < 0) return;
        if (parseFloat(getComputedStyle(el).opacity) > 0.05) return;
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          yPercent: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: EASE,
          overwrite: "auto",
        });
        el.querySelectorAll<HTMLElement>(".word-inner").forEach((word) => {
          gsap.to(word, { yPercent: 0, opacity: 1, duration: 0.4, ease: EASE, overwrite: "auto" });
        });
      });
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        sweep();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Late layout shifts move every trigger; re-measure once things settle.
    const onLoad = () => {
      ScrollTrigger.refresh();
      sweep();
    };
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(onLoad).catch(() => {});
    const settle = setTimeout(onLoad, 1500);

    return () => {
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
