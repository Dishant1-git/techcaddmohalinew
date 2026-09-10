import { courses, getCourse, type Course } from "@/lib/courses";
import { withOverride, withOverrides, type CourseOverrides } from "@/lib/content/overrides";

/**
 * Content for the After 12th menu, behind `/courses/after12th/[slug]`.
 *
 * The route is the route-map presentation of the same catalogue records the
 * other menus use, so this module names the slugs the menu lists and fetches
 * the records by slug. Nothing is copied.
 *
 * The menu's third column, the 9-month programmes, points at `/training` and
 * names no course, so it contributes no slugs here.
 */

/** The 3-month column, in menu order. */
export const after12ThreeMonthSlugs = [
  "web-designing",
  "python-programming",
  "generative-ai",
  "digital-marketing",
  "autocad",
  "data-analytics",
  // The written page in `@/lib/after12Pages` is a 3-month programme — its
  // headline, Key Highlights, overview and closing all say so — so it belongs
  // in this column, not the 6-month one it used to sit in.
  "cloud-computing",
];

/** The 6-month column, in menu order. */
export const after12SixMonthSlugs = [
  "artificial-intelligence",
  "mern-full-stack",
  "data-science",
  "cyber-security",
  "machine-learning",
];

/** Every slug the After 12th menu links to, in menu order. */
export const after12Slugs = [...after12ThreeMonthSlugs, ...after12SixMonthSlugs];

/**
 * What this menu says differently about a course the other menus also list.
 *
 * Every slug above is a catalogue course the Courses menu lists too, and this
 * menu speaks to a different reader — someone who has just finished school and
 * is choosing a first programme, not a working professional adding a skill. An
 * entry here is where that difference goes: the fields it names are merged
 * over the catalogue record for this route only, and the other menus are
 * untouched.
 *
 * See `@/lib/content/overrides` for the merge and for what `contentKey` does —
 * in short, add one when this menu's version of a course should also get its
 * own FAQs, reviews, why-choose cards and SEO rather than inherit the ones
 * written for the catalogue slug in `@/lib/coursePage`. The written pathway
 * pages in `@/lib/after12Pages` stay keyed by slug and are unaffected either
 * way.
 */
export const after12Overrides: CourseOverrides = {
  /**
   * The catalogue sells Cloud Computing as a 5-month intermediate course, which
   * is right for the Courses and Certificate menus. This menu's version is the
   * written 3-month programme in `@/lib/after12Pages` — "12th Pass, Any Stream",
   * "Beginner-Friendly", "Duration: 3 Months" — so the card on the After 12th
   * index would otherwise advertise a length and a level its own page then
   * contradicts. No `contentKey`: the written pathway page is keyed by slug and
   * already supplies every section this route renders.
   */
  "cloud-computing": {
    duration: "3 Months",
    level: "Beginner",
  },
};

/** The records behind those links, fetched from the catalogue by slug. */
export const after12Courses: Course[] = after12Slugs
  .map((slug) => after12Course(slug))
  .filter((c): c is Course => Boolean(c));

/** True when a course is one the After 12th menu lists. */
export const isAfter12Course = (slug: string) => after12Slugs.includes(slug);

/**
 * The record a page renders, by slug.
 *
 * Falls back to the full catalogue on purpose. The route prerenders every
 * course, not only the twelve the menu features, so an After 12th URL that
 * resolves today keeps resolving.
 */
export function after12Course(slug: string): Course | undefined {
  return withOverride(getCourse(slug), after12Overrides[slug]);
}

/** Every course `/courses/after12th/[slug]` serves, unchanged — for generateStaticParams. */
export const after12RouteCourses = withOverrides(courses, after12Overrides);
