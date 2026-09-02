import type Lenis from "lenis";

/**
 * A small handle on the app-wide Lenis instance created by <Animator/>.
 *
 * Smooth scrolling is owned by a single instance for the whole app. Anything
 * that needs to move the page — the course page's section rail, for one — has
 * to go through that instance: a native `window.scrollTo` runs its own
 * animation alongside Lenis's and the two visibly fight each other.
 *
 * Nothing here assumes the instance exists. Under `prefers-reduced-motion`
 * <Animator/> never creates one, so callers fall back to a native scroll.
 */

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function setLenis(instance: Lenis | undefined) {
  if (typeof window === "undefined") return;
  if (instance) window.__lenis = instance;
  else delete window.__lenis;
}

export function getLenis(): Lenis | undefined {
  return typeof window === "undefined" ? undefined : window.__lenis;
}

/**
 * Scrolls `target` to just below whatever is pinned at the top of the viewport.
 *
 * `offset` is the number of pixels of fixed chrome to clear, measured by the
 * caller rather than hard-coded, so it stays correct when the navbar or the
 * rail changes height.
 */
export function scrollToElement(target: HTMLElement, offset: number) {
  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(target, { offset: -offset, duration: 1.1 });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "auto" });
}
