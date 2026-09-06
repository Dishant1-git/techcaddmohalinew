import { courses, categories, faqs as generalFaqs, type CategoryKey } from "@/lib/courses";
import { courseFaqs } from "@/lib/coursePage";

export type FaqItem = { q: string; a: string };
export type FaqCategory = { key: CategoryKey; label: string; items: FaqItem[] };

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

export const faqCategories: FaqCategory[] = order.map((key) => {
  const category = categories.find((c) => c.key === key)!;
  const coursesInCategory = courses.filter((c) => c.category === key);
  const items = dedupe([...coursesInCategory.flatMap((c) => courseFaqs(c)), ...generalFaqs]);
  return { key, label: category.title, items };
});

export const defaultFaqCategory: CategoryKey = "digital-marketing";
