import { courses, getCourse, type Course } from "@/lib/courses";
import { withOverride, withOverrides, type CourseOverrides } from "@/lib/content/overrides";
import { variants } from "@/lib/courseVariants";

/**
 * Content for the Courses menu, behind `/courses/course/[slug]`.
 *
 * As with the other three menus, the catalogue in `@/lib/courses` stays the
 * single source of every course record and this module only names the slugs
 * the menu lists, fetching the records by slug. Nothing is copied.
 *
 * Slugs are listed in menu order, matching the Courses panel in `@/lib/site`:
 * Programming, then AI & Data, then Marketing & Design, then Cyber & Cloud.
 */
export const coursesMenuSlugs = [
  "python-programming",
  "java-programming",
  "cpp-dsa",
  "web-designing",
  "wordpress",
  "shopify",
  "kotlin",
  "flutter",
  "web-development",
  "full-stack-development",
  "mern-full-stack",
  "mean-stack",
  "php-full-stack",
  "artificial-intelligence",
  "generative-ai",
  "machine-learning",
  "deep-learning",
  "data-science",
  "data-analytics",
  "power-bi",
  "tableau",
  "digital-marketing",
  "social-media-marketing",
  "google-ads",
  "seo",
  "autocad",
  "solidworks",
  "cyber-security",
  "ethical-hacking",
  "cloud-computing",
  "linux",
];

/**
 * What this menu says differently about a course the other menus also list.
 *
 * Most of the slugs above are listed by the AI, Certificate Programs or After
 * 12th menus as well, so by default the same record renders at each of those
 * URLs. An entry here changes that for the Courses route only: the fields it
 * names are merged over the catalogue record, and the other menus are
 * untouched.
 *
 * See `@/lib/content/overrides` for the merge and for what `contentKey` does —
 * in short, add one when this menu's version of a course should also get its
 * own FAQs, reviews, why-choose cards and SEO rather than inherit the ones
 * written for the catalogue slug in `@/lib/coursePage`.
 */
export const coursesMenuOverrides: CourseOverrides = {};

/**
 * Slugs this route does not serve.
 *
 * Prompt Engineering belongs to the AI menu: it is listed in the AI panel, it
 * is served at `/courses/ai/prompt-engineering`, and the Courses panel never
 * linked to it. Building it here as well would put two pages on the same
 * course, competing for the same search, so the route drops it and
 * `next.config.ts` sends the old URL to the AI menu's page.
 */
export const coursesMenuExcludedSlugs = ["prompt-engineering"];

/**
 * Where a catalogue card should link.
 *
 * The Courses route for everything it serves, and the AI menu's route for the
 * slugs it excludes — so the all-courses explorer on `/courses` can keep
 * listing every course without pointing a card at a page this route no longer
 * builds.
 */
export function catalogueBasePath(slug: string) {
  return coursesMenuExcludedSlugs.includes(slug)
    ? variants.ai.basePath
    : variants.catalogue.basePath;
}

/** The records behind those links, fetched from the catalogue by slug. */
export const coursesMenuCourses: Course[] = coursesMenuSlugs
  .map((slug) => coursesMenuCourse(slug))
  .filter((c): c is Course => Boolean(c));

/** True when a course is one the Courses menu lists. */
export const isCoursesMenuCourse = (slug: string) => coursesMenuSlugs.includes(slug);

/**
 * The record a page renders, by slug.
 *
 * The catalogue, minus the excluded slugs, plus this menu's own changes. The
 * menu lists thirty-one courses and the route serves every other catalogue
 * record too, so a course reached from another menu — `agentic-ai` comes from
 * the AI menu — still resolves here. The AI menu's own pages are not catalogue
 * records and are served by `/courses/ai/[slug]` instead, so they never appear
 * under this menu.
 */
export function coursesMenuCourse(slug: string): Course | undefined {
  if (coursesMenuExcludedSlugs.includes(slug)) return undefined;
  return withOverride(getCourse(slug), coursesMenuOverrides[slug]);
}

/**
 * Every course `/courses/course/[slug]` serves — the catalogue, less the
 * excluded slugs and with this menu's overrides applied.
 *
 * The AI menu's own pages, `/courses/ai/ai-powered-marketing` among them, are
 * built by `/courses/ai/[slug]`. The Certificate Programs and After 12th
 * routes deliberately do not include them either, so those menus never grow a
 * page.
 */
export const coursesRouteCourses: Course[] = withOverrides(
  courses.filter((c) => !coursesMenuExcludedSlugs.includes(c.slug)),
  coursesMenuOverrides,
);
