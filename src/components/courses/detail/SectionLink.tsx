"use client";

import type { ReactNode } from "react";
import { scrollToElement } from "@/lib/lenis";

/**
 * Height of the fixed chrome above the content: the section rail's pinned
 * offset plus its own height.
 *
 * Measured from the rail rather than hard-coded, so it stays correct if the
 * navbar or the rail changes height, and it degrades to a sane constant on the
 * server or before the rail has mounted.
 */
export function courseChromeOffset() {
  if (typeof document === "undefined") return 132;

  const rail = document.querySelector<HTMLElement>("[data-course-rail]");
  if (!rail) return 132;

  const top = parseFloat(getComputedStyle(rail).top);
  return (Number.isFinite(top) ? top : 82) + rail.offsetHeight;
}

/**
 * An in-page link on the course detail page.
 *
 * Every anchor here has to scroll to the same place, so they all go through
 * this rather than relying on <Animator/>'s global handler — that one uses a
 * fixed 96px offset, which is right for the rest of the site but too little
 * for a page that also has the section rail pinned under the navbar.
 */
export default function SectionLink({
  to,
  className,
  children,
  ariaLabel,
}: {
  /** Target section id, without the `#`. */
  to: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(to);
    if (!target) return; // Let the browser fall back to normal hash navigation.

    e.preventDefault();

    // The App Router hydrates the whole document, so React's delegated
    // listener and <Animator/>'s anchor handler are both bound to `document`.
    // Listeners on the same node are not stopped by stopPropagation — only
    // stopImmediatePropagation keeps the global handler from also scrolling.
    e.nativeEvent.stopImmediatePropagation();

    scrollToElement(target, courseChromeOffset());
  }

  return (
    <a href={`#${to}`} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
