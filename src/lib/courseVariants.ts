import type { Course } from "@/lib/courses";

/**
 * The four course-page designs.
 *
 * The same catalogue is reached from four different menus, and each menu gets
 * its own page at its own URL under `/courses` — a course that appears in more
 * than one menu therefore has more than one page. They deliberately share one
 * section contract (`courseSections` in `coursePage.ts`), so the reader gets
 * the same nine answers whichever door they came through; only the design
 * changes.
 *
 *   /courses/course/<slug>                the catalogue design  — dark, circuit-board
 *   /courses/ai/<slug>                    the AI menu's pages   — catalogue design
 *   /courses/certificate-programs/<slug>  the credential design — light, document
 *   /courses/after12th/<slug>             the pathway design    — vivid, route map
 *
 * Every menu now lives one segment below `/courses`, so the URL says which
 * menu a page belongs to. The paths each menu used before — `/courses/<slug>`,
 * `/certificate-programs/<slug>` and `/after-12th/<slug>` — are kept alive as
 * permanent redirects in `next.config.ts`.
 */

export type VariantKey = "catalogue" | "ai" | "certificate" | "pathway";

export type CourseVariant = {
  key: VariantKey;
  /** URL prefix, no trailing slash. */
  basePath: string;
  /** Breadcrumb label and the page it links back to. */
  crumb: { label: string; href: string };
  /** Prefix used on the `source` field of an enquiry, so leads are traceable. */
  source: string;
  /** How the page titles itself, for <title> and the H1. */
  headline: (course: Course) => string;
  metaTitle: (course: Course) => string;
};

export const variants: Record<VariantKey, CourseVariant> = {
  catalogue: {
    key: "catalogue",
    basePath: "/courses/course",
    crumb: { label: "Courses", href: "/courses" },
    source: "course",
    headline: (c) => `${c.title} course in Mohali`,
    metaTitle: (c) => `${c.title} Course in Mohali`,
  },
  ai: {
    key: "ai",
    basePath: "/courses/ai",
    crumb: { label: "AI", href: "/courses" },
    source: "ai",
    headline: (c) => `${c.title} course in Mohali`,
    metaTitle: (c) => `${c.title} Course in Mohali`,
  },
  certificate: {
    key: "certificate",
    basePath: "/courses/certificate-programs",
    crumb: { label: "Certificate Programs", href: "/training" },
    source: "certificate",
    headline: (c) => `${c.title} certificate programme`,
    metaTitle: (c) => `${c.title} Certificate Program in Mohali`,
  },
  pathway: {
    key: "pathway",
    basePath: "/courses/after12th",
    crumb: { label: "After 12th", href: "/courses" },
    source: "after-12th",
    headline: (c) => `${c.title} after 12th`,
    metaTitle: (c) => `${c.title} Course After 12th in Mohali`,
  },
};

/** Cross-links shown at the foot of each design, pointing at the others. */
export function otherVariants(current: VariantKey) {
  return (Object.keys(variants) as VariantKey[])
    .filter((k) => k !== current)
    .map((k) => variants[k]);
}
