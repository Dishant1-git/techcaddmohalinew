import type { Course } from "@/lib/courses";

/**
 * How one course carries different content in different menus.
 *
 * The catalogue in `@/lib/courses` stays the single source of every course
 * record, and each menu's module under this directory names the slugs it
 * lists. A course listed by two menus therefore renders the same record twice,
 * at two URLs — which is the right default, and what most courses want.
 *
 * When a menu needs to say something different about a course it shares, it
 * puts the difference in its own override map and this module merges it over
 * the catalogue record. The slug never changes, so the URL, the cards and the
 * cross-links all keep working; only what the page says changes.
 *
 *   `@/lib/content/ai.ts`                  →  /courses/ai/<slug>
 *   `@/lib/content/courses.ts`             →  /courses/course/<slug>
 *   `@/lib/content/certificatePrograms.ts` →  /courses/certificate-programs/<slug>
 *   `@/lib/content/after12.ts`             →  /courses/after12th/<slug>
 */

/**
 * The fields a menu may rewrite for a course.
 *
 * Everything on the record except the slug, which identifies the course and is
 * shared by every menu that lists it.
 *
 * `contentKey` is the switch for the rest of the page. The written blocks in
 * `@/lib/coursePage` — the SEO pair, the learn detail, the section copy, the
 * why-choose cards, the audience, the eligibility, the FAQs, the reviews and
 * the comparison — are keyed by a record's `contentKey` when it has one, and
 * by its slug when it does not. So:
 *
 *   - Reword the record only, and the catalogue's written blocks still apply.
 *     That is what a changed blurb, duration or level usually wants.
 *   - Set a `contentKey` as well, and none of them do: every section falls
 *     back to copy derived from the overridden record until something is
 *     written under the new key in `coursePage.ts`. That is what a menu wants
 *     when its version of a course is a different programme in all but name.
 *
 *     export const aiOverrides: CourseOverrides = {
 *       "data-science": {
 *         contentKey: "data-science--ai",
 *         title: "Data Science with AI",
 *         overview: "…the AI menu's version of the same programme…",
 *       },
 *     };
 */
export type CourseOverride = Partial<Omit<Course, "slug">>;

/** A menu's overrides, keyed by course slug. */
export type CourseOverrides = Record<string, CourseOverride>;

/**
 * The catalogue record with one menu's changes applied.
 *
 * A shallow merge, deliberately: an override that sets `modules` replaces the
 * whole list rather than merging module by module, because a menu rewriting a
 * syllabus is rewriting all of it, and a half-merged list would be nobody's.
 * `undefined` passes through untouched, so a caller can hand this the result
 * of a catalogue lookup without checking it first.
 *
 * The catalogue record is never mutated — the merge builds a new object, so
 * the same course read from another menu is unaffected.
 */
export function withOverride(
  course: Course | undefined,
  override: CourseOverride | undefined,
): Course | undefined {
  if (!course) return undefined;
  if (!override) return course;
  return { ...course, ...override };
}

/**
 * Every record a menu serves, with that menu's overrides applied.
 *
 * Used for `generateStaticParams` and for the "students also consider" grid,
 * so the cards under one menu carry that menu's titles rather than the
 * catalogue's.
 */
export function withOverrides(courses: Course[], overrides: CourseOverrides): Course[] {
  return courses.map((c) => withOverride(c, overrides[c.slug]) as Course);
}
