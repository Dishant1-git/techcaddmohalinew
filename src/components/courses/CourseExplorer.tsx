"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { categories, categoryLabel, courses, type CategoryKey } from "@/lib/courses";
import CourseCard from "@/components/ui/CourseCard";
import Icon from "@/components/ui/Icon";

type Filter = CategoryKey | "all";

export default function CourseExplorer({ initialCategory = "all" }: { initialCategory?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialCategory);
  const [query, setQuery] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesCat = filter === "all" || c.category === filter;
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.blurb.toLowerCase().includes(q) ||
        c.tools.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [filter, query]);

  // Re-animate the grid whenever the result set changes.
  useEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current!.children,
        { y: 26, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out", stagger: 0.055 },
      );
    }, gridRef);
    return () => ctx.revert();
  }, [visible]);

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "All courses" },
    ...categories.map((c) => ({ key: c.key as Filter, label: categoryLabel[c.key] })),
  ];

  return (
    <section className="relative bg-subtle py-16 lg:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  filter === t.key
                    ? "border-transparent bg-up-ink text-white shadow-lg shadow-up-ink/20"
                    : "border-up-line bg-white text-up-ink/75 hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Icon
              name="target"
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-up-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a course or tool…"
              className="w-full rounded-full border border-up-line bg-white py-3 pl-11 pr-4 text-sm text-up-ink outline-none transition-colors placeholder:text-up-muted/70 focus:border-up-accent"
              aria-label="Search courses"
            />
          </div>
        </div>

        <p className="mt-6 text-sm text-up-muted">
          Showing <span className="font-semibold text-up-ink">{visible.length}</span>{" "}
          {visible.length === 1 ? "course" : "courses"}
          {filter !== "all" && <> in {categoryLabel[filter as CategoryKey]}</>}
        </p>

        {visible.length > 0 ? (
          <div ref={gridRef} className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-up-line bg-white p-14 text-center">
            <p className="font-display text-xl font-bold text-up-ink">No course matches that yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-up-muted">
              Try a different keyword, or call a counsellor — we run custom corporate and
              college batches for technologies not listed here.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="mt-6 rounded-full bg-up-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
