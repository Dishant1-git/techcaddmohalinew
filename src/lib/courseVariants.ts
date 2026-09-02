import type { Course } from "@/lib/courses";

/**
 * The three course-page designs.
 *
 * The same catalogue is reached from three different menus, and each menu gets
 * its own page design at its own URL — a course that appears in more than one
 * menu therefore has more than one page. They deliberately share one section
 * contract (`courseSections` in `coursePage.ts`), so the reader gets the same
 * nine answers whichever door they came through; only the design changes.
 *
 *   /courses/<slug>               the catalogue design  — dark, circuit-board
 *   /certificate-programs/<slug>  the credential design — light, document
 *   /after-12th/<slug>            the pathway design    — vivid, route map
 */

export type VariantKey = "catalogue" | "certificate" | "pathway";

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
    basePath: "/courses",
    crumb: { label: "Courses", href: "/courses" },
    source: "course",
    headline: (c) => `${c.title} course in Mohali`,
    metaTitle: (c) => `${c.title} Course in Mohali`,
  },
  certificate: {
    key: "certificate",
    basePath: "/certificate-programs",
    crumb: { label: "Certificate Programs", href: "/training" },
    source: "certificate",
    headline: (c) => `${c.title} certificate programme`,
    metaTitle: (c) => `${c.title} Certificate Program in Mohali`,
  },
  pathway: {
    key: "pathway",
    basePath: "/after-12th",
    crumb: { label: "After 12th", href: "/courses" },
    source: "after-12th",
    headline: (c) => `${c.title} after 12th`,
    metaTitle: (c) => `${c.title} Course After 12th in Mohali`,
  },
};

/** Cross-links shown at the foot of each design, pointing at the other two. */
export function otherVariants(current: VariantKey) {
  return (Object.keys(variants) as VariantKey[])
    .filter((k) => k !== current)
    .map((k) => variants[k]);
}
