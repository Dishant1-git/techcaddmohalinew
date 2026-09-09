"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import GoogleIcon from "@/components/reviews/GoogleIcon";
import { avatarArt } from "@/lib/reviews";
import type { StudentStory } from "@/lib/cms/content";

/**
 * Student testimonials from the CMS, with their Google review and video links.
 *
 * The video opens in a dialog over the page rather than navigating away: a
 * visitor watching a testimonial is mid-consideration, and sending them to
 * YouTube hands them a sidebar of other people's videos to leave through. The
 * "Watch on YouTube" link beside it is for the people who would rather do
 * exactly that, so neither preference is forced.
 *
 * Nothing renders when the CMS has no testimonials — see `getStudentStories`,
 * which deliberately has no built-in fallback.
 */

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-accent-yellow">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          size={13}
          className={i < rating ? "fill-accent-yellow" : "text-up-line"}
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

/** The video overlay. Rendered only while something is playing. */
function VideoDialog({ story, onClose }: { story: StudentStory; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Escape closes, and the page behind must not scroll while it is open.
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus moves into the dialog so a keyboard user is not left behind it.
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  if (!story.video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Video testimonial from ${story.name}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-hero-950/85 p-4 backdrop-blur-sm"
      // A click on the backdrop closes; clicks inside the panel must not.
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-display text-base font-bold text-white">{story.name}</p>
            <p className="truncate text-xs text-up-soft/70">{story.role}</p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close video"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
          {/* 16:9, so the frame never letterboxes or clips on a phone. */}
          <div className="relative aspect-video">
            <iframe
              src={`${story.video.embedUrl}&autoplay=1`}
              title={`Video testimonial from ${story.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>

        <a
          href={story.video.watchUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-up-soft/80 transition-colors hover:text-white"
        >
          Watch on YouTube
          <Icon name="arrowUpRight" size={12} />
        </a>
      </div>
    </div>
  );
}

function StoryCard({
  story,
  index,
  onPlay,
}: {
  story: StudentStory;
  index: number;
  onPlay: (story: StudentStory) => void;
}) {
  const initials = story.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(11,26,77,0.4)]">
      {story.video && (
        <button
          type="button"
          onClick={() => onPlay(story)}
          aria-label={`Play video testimonial from ${story.name}`}
          className="group relative block aspect-video w-full overflow-hidden bg-hero-950"
        >
          {story.video.posterUrl ? (
            <Image
              src={story.video.posterUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              // YouTube stills are a third-party host and are not worth
              // failing a page over if one 404s.
              unoptimized
            />
          ) : (
            <span className="absolute inset-0 bg-gradient-to-br from-hero-800 to-hero-950" />
          )}
          <span className="absolute inset-0 bg-hero-950/25 transition-colors group-hover:bg-hero-950/10" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Icon name="play" size={20} className="ml-0.5 fill-up-accent text-up-accent" />
            </span>
          </span>
        </button>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          {story.photo ? (
            <Image
              src={story.photo.src}
              alt={story.photo.alt}
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br font-display text-sm font-bold text-white ${avatarArt[index % avatarArt.length]}`}
            >
              {initials}
            </span>
          )}
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-up-ink">{story.name}</span>
            <span className="block truncate text-xs text-up-muted">{story.role}</span>
          </span>
        </div>

        <div className="mt-4">
          <Stars rating={story.rating} />
        </div>

        {story.quote && (
          <blockquote className="mt-3 flex-1 break-words text-sm leading-relaxed text-up-ink/80">
            “{story.quote}”
          </blockquote>
        )}

        {(story.googleUrl || story.video) && (
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
            {story.googleUrl && (
              <a
                href={story.googleUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-up-muted transition-colors hover:text-up-accent"
              >
                <GoogleIcon size={12} />
                Read on Google
                <Icon name="arrowUpRight" size={11} />
              </a>
            )}
            {story.video && (
              <a
                href={story.video.watchUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-up-muted transition-colors hover:text-up-accent"
              >
                <Icon name="youtube" size={12} />
                Watch on YouTube
                <Icon name="arrowUpRight" size={11} />
              </a>
            )}
          </div>
        )}
      </div>
    </figure>
  );
}

export default function StudentStories({ items }: { items: StudentStory[] }) {
  const [playing, setPlaying] = useState<StudentStory | null>(null);
  const close = useCallback(() => setPlaying(null), []);

  if (!items.length) return null;

  const videoCount = items.filter((item) => item.video).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-muted">
          Student stories
        </p>
        <p className="text-xs text-up-muted">
          {items.length} {items.length === 1 ? "story" : "stories"}
          {videoCount > 0 && ` · ${videoCount} on video`}
        </p>
      </div>

      <div data-anim="up" data-anim-stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((story, i) => (
          <StoryCard key={story.id} story={story} index={i} onPlay={setPlaying} />
        ))}
      </div>

      {playing && <VideoDialog story={playing} onClose={close} />}
    </div>
  );
}
