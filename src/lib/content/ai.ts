import { getCourse, type Course } from "@/lib/courses";
import { aiPoweredMarketingCourse } from "@/lib/content/aiPoweredMarketing";
import { chatgptAiToolsCourse } from "@/lib/content/chatgptAiTools";
import { ragCourse } from "@/lib/content/rag";
import { aiPoweredCoursesCourse } from "@/lib/content/aiPoweredCourses";
import { allAiCoursesCourse } from "@/lib/content/allAiCourses";
import { withOverride, type CourseOverrides } from "@/lib/content/overrides";

/**
 * Content for the AI menu, behind `/courses/ai/[slug]`.
 *
 * The catalogue in `@/lib/courses` stays the single source of every course
 * record; this module only says which of them the AI menu is about, and hands
 * back the records fetched by slug. Nothing is copied, so a course edited in
 * the catalogue is edited here too, and the menu can never drift out of sync
 * with the pages it links to.
 *
 * Slugs are listed in menu order, matching the AI panel in `@/lib/site`.
 */
export const aiSlugs = [
  // The menu's umbrella programme, a page this menu alone carries.
  "ai-powered-courses",
  // The menu's map of every AI pathway, behind its "All AI courses" link.
  "all-ai-courses",
  "artificial-intelligence",
  "generative-ai",
  "agentic-ai",
  "prompt-engineering",
  "machine-learning",
  "deep-learning",
  "python-programming",
  "data-science",
  "data-analytics",
  "power-bi",
  "tableau",
  // The menu's "AI-Powered Marketing" link. It has its own page and its own
  // copy; the Courses menu keeps "Digital Marketing" at
  // /courses/course/digital-marketing.
  "ai-powered-marketing",
  // The menu's "ChatGPT & AI Tools" link, the AI menu's other page of its own.
  "chatgpt-ai-tools",
  // The menu's "RAG (Retrieval-Augmented Generation)" link, likewise a page
  // this menu alone carries.
  "rag",
  "mern-full-stack",
];

/**
 * Courses that belong to the AI menu alone and are not in the catalogue.
 *
 * `/courses/ai/[slug]` serves these in addition to the catalogue records the
 * menu lists, so the AI menu can carry a page the other three menus never
 * show.
 */
export const aiExclusiveCourses: Course[] = [
  aiPoweredMarketingCourse,
  chatgptAiToolsCourse,
  ragCourse,
  aiPoweredCoursesCourse,
  allAiCoursesCourse,
];

/**
 * What this menu says differently about a course the other menus also list.
 *
 * Eleven of the slugs above are catalogue courses that the Courses menu lists
 * too, so by default `/courses/ai/machine-learning` and
 * `/courses/course/machine-learning` are the same page at two URLs. An entry
 * here changes that for one course: the fields it names are merged over the
 * catalogue record for this route only, and the other menus are untouched.
 *
 * See `@/lib/content/overrides` for the merge and for what `contentKey` does —
 * in short, add one when the AI menu's version of a course should also get its
 * own FAQs, reviews, why-choose cards and SEO rather than inherit the ones
 * written for the catalogue slug in `@/lib/coursePage`.
 *
 * The two courses above need nothing here: they are the AI menu's alone, so
 * their records already say exactly what this menu wants.
 */
export const aiOverrides: CourseOverrides = {};

/**
 * The records behind those links, fetched from the catalogue by slug.
 *
 * A slug with no matching course is dropped rather than left as a hole, so a
 * typo in the list above costs one menu entry instead of crashing the render.
 */
export const aiCourses: Course[] = aiSlugs
  .map((slug) => aiCourse(slug))
  .filter((c): c is Course => Boolean(c));

/** True when a course is one the AI menu lists. */
export const isAiCourse = (slug: string) => aiSlugs.includes(slug);

/**
 * The record a page renders, by slug.
 *
 * The menu's own pages first, then the catalogue: `/courses/ai/<slug>` is a
 * route of its own, so any course slug that reaches it resolves, not only the
 * thirteen listed above.
 */
export function aiCourse(slug: string): Course | undefined {
  const base = aiExclusiveCourses.find((c) => c.slug === slug) ?? getCourse(slug);
  return withOverride(base, aiOverrides[slug]);
}

/** Every course `/courses/ai/[slug]` builds — the AI menu's own fourteen. */
export const aiRouteCourses: Course[] = aiCourses;
