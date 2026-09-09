import { courses, categories, faqs as generalFaqs, type CategoryKey } from "@/lib/courses";
import { courseFaqs } from "@/lib/coursePage";

export type FaqItem = { q: string; a: string };
/**
 * `key` is a plain string, not a `CategoryKey`.
 *
 * The built-in tabs are the six course categories, but the CMS lets an editor
 * name their own — "Fees", "Placements" — and those slugs are not course keys.
 * Nothing styles a tab by its key (they all share one accent), so widening it
 * costs nothing and lets the CMS supply the tabs outright.
 */
export type FaqCategory = { key: string; label: string; items: FaqItem[] };

const order: CategoryKey[] = [
  "digital-marketing",
  "ai-data",
  "development",
  "cyber-cloud",
  "cad-design",
  "programming",
];

function dedupe(items: FaqItem[]): FaqItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.q)) return false;
    seen.add(item.q);
    return true;
  });
}

/** The tab that holds anything not specific to one field of study. */
export const GENERAL_KEY = "general";

/**
 * Six tabs for the course categories, then one for everything else.
 *
 * The general questions used to be appended to all six, so every tab opened
 * with the same four answers and the tabs looked broken — switching between
 * them appeared to change nothing. They now live in a tab of their own and are
 * shown once, which is also where the CMS files a question whose category
 * matches no course.
 */
export const faqCategories: FaqCategory[] = [
  ...order.map((key) => {
    const category = categories.find((c) => c.key === key)!;
    const coursesInCategory = courses.filter((c) => c.category === key);
    return {
      key: key as string,
      label: category.title,
      items: dedupe(coursesInCategory.flatMap((c) => courseFaqs(c))),
    };
  }),
  { key: GENERAL_KEY, label: "General", items: dedupe([...generalFaqs]) },
];

export const defaultFaqCategory: string = "digital-marketing";
