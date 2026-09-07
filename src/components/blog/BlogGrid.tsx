"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { blogPosts, blogCategories, categoryArt, type BlogCategory } from "@/lib/blog";
import Icon from "@/components/ui/Icon";

type Filter = BlogCategory | "All";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogGrid() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? blogPosts : blogPosts.filter((p) => p.category === filter)),
    [filter],
  );

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "All", label: "All", count: blogPosts.length },
    ...blogCategories.map((c) => ({
      key: c,
      label: c,
      count: blogPosts.filter((p) => p.category === c).length,
    })),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-muted">Latest posts</p>
        <p className="text-xs text-up-muted">{blogPosts.length} articles</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`relative flex items-center gap-1.5 pb-4 text-sm font-semibold transition-colors ${
              filter === t.key ? "text-up-accent" : "text-up-muted hover:text-up-ink"
            }`}
          >
            {t.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold ${
                filter === t.key ? "bg-brand-100 text-up-accent" : "bg-subtle text-up-muted"
              }`}
            >
              {t.count}
            </span>
            <span
              className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-up-accent transition-opacity ${
                filter === t.key ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        ))}
      </div>

      <div data-anim="up" data-anim-stagger className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col">
            <span
              className={`relative block h-40 overflow-hidden rounded-2xl bg-gradient-to-br ${categoryArt[post.category]}`}
            >
              <span className="absolute inset-0 grid-lines opacity-70" />
              <span className="absolute inset-0 bg-gradient-to-t from-hero-950/45 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-up-ink">
                {post.category}
              </span>
            </span>

            <h3 className="mt-4 font-display text-lg font-bold leading-snug text-up-ink transition-colors group-hover:text-up-accent">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-up-muted">{post.excerpt}</p>

            <div className="mt-4 flex items-center gap-3 text-xs text-up-muted">
              <span>{post.author}</span>
              <span className="h-1 w-1 rounded-full bg-up-line" />
              <span>{formatDate(post.date)}</span>
              <span className="h-1 w-1 rounded-full bg-up-line" />
              <span>{post.readTime}</span>
            </div>

            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-up-accent">
              Read more
              <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-sm text-up-muted">No posts in this category yet.</p>
      )}
    </div>
  );
}
