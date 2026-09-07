import Icon from "@/components/ui/Icon";
import { events, eventArt } from "@/lib/events";

export default function EventsGrid() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-muted">Events</p>
        <p className="text-xs text-up-muted">{events.length} events</p>
      </div>

      <div data-anim="up" data-anim-stagger className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, i) => (
          <article key={event.slug} className="flex flex-col">
            <span
              className={`relative block h-40 overflow-hidden rounded-2xl bg-gradient-to-br ${eventArt[i % eventArt.length]}`}
            >
              <span className="absolute inset-0 grid-lines opacity-70" />
              <span className="absolute inset-0 bg-gradient-to-t from-hero-950/45 to-transparent" />
              <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-up-ink">
                {event.status}
              </span>
              <span className="absolute bottom-4 left-4 rounded-full bg-hero-950/70 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white">
                {event.category}
              </span>
            </span>

            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-up-accent">
              <Icon name="calendar" size={13} />
              {event.dateLabel}
            </div>

            <h3 className="mt-2 font-display text-lg font-bold leading-snug text-up-ink">{event.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-up-muted">{event.excerpt}</p>

            <div className="mt-4 flex items-center gap-1.5 border-t border-line pt-3 text-xs text-up-muted">
              <Icon name="pin" size={13} />
              {event.location}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
