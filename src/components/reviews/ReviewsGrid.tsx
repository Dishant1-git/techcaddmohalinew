"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import GoogleIcon from "@/components/reviews/GoogleIcon";
import { googleReviews, googleReviewsUrl, avatarArt } from "@/lib/reviews";

function Card({ review, index }: { review: (typeof googleReviews)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(11,26,77,0.4)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br font-display text-sm font-bold text-white ${avatarArt[index % avatarArt.length]}`}
          >
            {initials}
          </span>
          <span>
            <span className="block text-sm font-bold text-up-ink">{review.name}</span>
            <span className="mt-0.5 flex items-center gap-1 text-xs text-up-muted">
              <GoogleIcon size={12} /> Google
            </span>
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1 text-accent-yellow">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon
            key={i}
            name="star"
            size={14}
            className={i < review.rating ? "fill-accent-yellow" : "text-up-line"}
            strokeWidth={0}
          />
        ))}
      </div>

      <blockquote
        className={`mt-3 flex-1 text-sm leading-relaxed text-up-ink/80 ${expanded ? "" : "line-clamp-4"}`}
      >
        {review.quote}
      </blockquote>

      {review.quote.length > 140 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 self-start text-xs font-semibold text-up-accent hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-up-accent">
          {review.tag}
        </span>
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-up-muted transition-colors hover:text-up-accent"
        >
          Read on Google
          <Icon name="arrowUpRight" size={12} />
        </a>
      </div>
    </figure>
  );
}

export default function ReviewsGrid() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-muted">Recent reviews</p>
        <p className="text-xs text-up-muted">{googleReviews.length} reviews shown</p>
      </div>

      <div data-anim="up" data-anim-stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {googleReviews.map((review, i) => (
          <Card key={`${review.name}-${i}`} review={review} index={i} />
        ))}
      </div>
    </div>
  );
}
