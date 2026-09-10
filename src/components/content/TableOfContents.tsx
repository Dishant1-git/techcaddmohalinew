"use client";

import { useEffect, useState } from "react";
import { MIN_HEADINGS_FOR_TOC, type Heading } from "@/lib/cms/headings";

/**
 * The contents rail beside an article.
 *
 * Long CMS articles had no way in other than scrolling: the headings existed
 * but nothing listed them. This mirrors the in-page section rail the course
 * pages already use, so a reader meets the same pattern in both places.
 *
 * Renders nothing for content with fewer than two headings — a list with one
 * entry is a label, not an index, and takes a column's width to say what the
 * title already said.
 */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length < MIN_HEADINGS_FOR_TOC) return;

    const targets = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    /*
      The topmost heading currently on screen wins.

      Reading `isIntersecting` alone marks whichever heading fired last, which
      on a fast scroll is often one further down the page. Sorting the visible
      set by position gives the same answer whichever way the reader moves.
    */
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A band near the top: a heading counts as current once it reaches the
      // upper third, not when it first appears at the bottom of the window.
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < MIN_HEADINGS_FOR_TOC) return null;

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-muted">On this page</p>

      <ul className="mt-4 space-y-1 border-l border-line">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={() => setActive(heading.id)}
              className={`-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors ${
                heading.level === 3 ? "pl-7" : "pl-4"
              } ${
                active === heading.id
                  ? "border-up-accent font-semibold text-up-accent"
                  : "border-transparent text-up-muted hover:border-line hover:text-up-ink"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
