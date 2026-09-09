import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { events as builtInEvents, eventArt, type EventItem } from "@/lib/events";

/**
 * The events listing.
 *
 * A card links through to `/events/<slug>` only when the event has something
 * more to show than the card already does — a description, an agenda, speakers
 * or photos. The built-in events are a one-line summary each, so linking every
 * card would send readers to a page that repeats what they just read; an event
 * written up properly in the CMS earns its detail page.
 */

/** Does this event have anything a detail page would add? */
export function hasDetail(event: EventItem): boolean {
  return Boolean(
    event.body?.length ||
      event.agenda?.length ||
      event.speakers?.length ||
      event.highlights?.length ||
      event.images?.length ||
      event.registrationUrl ||
      event.venueAddress,
  );
}

/** `items` is the list to render — the page passes the CMS-merged one. */
export default function EventsGrid({ items = builtInEvents }: { items?: EventItem[] }) {
  const upcoming = items.filter((event) => event.status === "Upcoming").length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-muted">Events</p>
        <p className="text-xs text-up-muted">
          {items.length} events
          {upcoming > 0 && ` · ${upcoming} upcoming`}
        </p>
      </div>

      <div data-anim="up" data-anim-stagger className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((event, i) => {
          const detailed = hasDetail(event);

          const card = (
            <>
              <span
                className={`relative block h-40 overflow-hidden rounded-2xl bg-gradient-to-br ${eventArt[i % eventArt.length]}`}
              >
                {/* A CMS cover replaces the gradient; without one the gradient
                    is the design, not a placeholder. */}
                {event.cover ? (
                  <Image
                    src={event.cover.src}
                    alt={event.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 grid-lines opacity-70" />
                )}
                <span className="absolute inset-0 bg-gradient-to-t from-hero-950/45 to-transparent" />
                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-up-ink">
                  {event.status}
                </span>
                <span className="absolute bottom-4 left-4 rounded-full bg-hero-950/70 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white">
                  {event.category}
                </span>
              </span>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-up-accent">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="calendar" size={13} />
                  {event.dateLabel}
                </span>
                {event.startTime && (
                  <span className="inline-flex items-center gap-1.5 text-up-muted">
                    <Icon name="clock" size={13} />
                    {event.startTime}
                    {event.endTime && ` – ${event.endTime}`}
                  </span>
                )}
              </div>

              <h3 className="mt-2 break-words font-display text-lg font-bold leading-snug text-up-ink group-hover:text-up-accent">
                {event.title}
              </h3>
              <p className="mt-2 line-clamp-2 break-words text-sm leading-relaxed text-up-muted">
                {event.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3 text-xs text-up-muted">
                <span className="inline-flex min-w-0 items-center gap-1.5">
                  <Icon name="pin" size={13} className="shrink-0" />
                  <span className="truncate">{event.location}</span>
                </span>
                {detailed && (
                  <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-up-accent">
                    Details
                    <Icon
                      name="arrowRight"
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                )}
              </div>
            </>
          );

          return detailed ? (
            <Link key={event.slug} href={`/events/${event.slug}`} className="group flex flex-col">
              {card}
            </Link>
          ) : (
            <article key={event.slug} className="group flex flex-col">
              {card}
            </article>
          );
        })}
      </div>
    </div>
  );
}
