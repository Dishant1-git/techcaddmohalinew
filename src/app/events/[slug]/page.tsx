import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Icon from "@/components/ui/Icon";
import CtaBanner from "@/components/home/CtaBanner";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import RelatedLinks from "@/components/ui/RelatedLinks";
import { hasDetail } from "@/components/events/EventsGrid";
import { getEvent, getEvents } from "@/lib/cms/content";
import { site } from "@/lib/site";
import type { EventItem } from "@/lib/events";

/**
 * Slug-driven event page.
 *
 * Every section is optional and renders only when the CMS has been given
 * something for it, so an event with a description and nothing else produces a
 * complete short page rather than a run of empty headings. That is what lets
 * the same template serve a one-paragraph seminar and a three-day workshop
 * with speakers, an agenda and a gallery.
 *
 * Only events that pass `hasDetail` get a page — the same test the listing
 * uses to decide whether to link — so a card can never point at a page that
 * would just repeat the card.
 */

export async function generateStaticParams() {
  const events = await getEvents();
  return events.filter(hasDetail).map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Event not found" };

  const description = event.excerpt || `${event.title} at ${event.location}.`;

  return {
    title: `${event.title} — ${event.dateLabel}`,
    description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: `${event.title} | techcadd Mohali`,
      description,
      url: `${site.url}/events/${event.slug}`,
      type: "article",
      images: event.cover ? [event.cover.src] : undefined,
    },
  };
}

/** A labelled fact in the sidebar. Renders nothing without a value. */
function Fact({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!children) return null;
  return (
    <div className="flex gap-3 border-b border-line py-3.5 last:border-0">
      <Icon name={icon} size={16} className="mt-0.5 shrink-0 text-up-accent" />
      <div className="min-w-0">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-up-muted">
          {label}
        </p>
        <div className="mt-1 text-sm text-up-ink">{children}</div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 data-anim="words" className="font-display text-2xl font-extrabold text-up-ink">
        {children}
      </h2>
      <div
        data-underline
        className="mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-up-accent to-transparent"
      />
    </>
  );
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const events = await getEvents();
  const event = events.find((item) => item.slug === slug);

  if (!event || !hasDetail(event)) notFound();

  const others = events
    .filter((item) => item.slug !== event.slug && item.category === event.category)
    .slice(0, 3);

  /* ---- Structured data ---------------------------------------------------
   * An Event entity, so the date, venue and registration link are eligible
   * for a rich result rather than being invisible markup.
   */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.excerpt,
    startDate: event.startTime ? `${event.date}T${event.startTime}` : event.date,
    endDate: event.endDate || event.date,
    eventAttendanceMode:
      event.mode === "online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.venueName || event.location,
      address: event.venueAddress || event.location,
    },
    organizer: { "@type": "Organization", name: site.legalName, url: site.url },
    ...(event.cover ? { image: [event.cover.src] } : {}),
    ...(event.registrationUrl ? { url: event.registrationUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ---- Hero ---------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-hero-950 pb-16 pt-[7.5rem] text-white lg:pb-20 lg:pt-[12rem]">
        {event.cover ? (
          <>
            <Image
              src={event.cover.src}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hero-950 via-hero-950/80 to-hero-950/60" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_20%_0%,#123285_0%,transparent_60%),radial-gradient(ellipse_60%_60%_at_90%_40%,#1c53d1_0%,transparent_55%)] opacity-85" />
        )}
        <div className="absolute inset-0 grid-lines" />

        <div className="container-x relative max-w-4xl">
          <nav
            data-anim="fade"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs text-up-soft/60"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Icon name="arrowRight" size={11} className="opacity-50" />
            <Link href="/events" className="transition-colors hover:text-white">
              Events
            </Link>
            <Icon name="arrowRight" size={11} className="opacity-50" />
            <span className="text-up-soft">{event.category}</span>
          </nav>

          <div data-anim="fade" className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-up-soft">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  event.status === "Upcoming" ? "bg-accent-yellow" : "bg-white/40"
                }`}
              />
              {event.status}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-up-soft">
              {event.category}
            </span>
            {event.mode && (
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-up-soft">
                {event.mode}
              </span>
            )}
          </div>

          <h1
            data-anim="words"
            className="break-words font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl"
          >
            {event.title}
          </h1>

          {event.excerpt && (
            <p data-anim="up" className="mt-5 max-w-2xl break-words text-base leading-relaxed text-up-soft/80">
              {event.excerpt}
            </p>
          )}

          <div
            data-anim="up"
            data-anim-delay="0.15"
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-up-soft/80"
          >
            <span className="inline-flex items-center gap-2">
              <Icon name="calendar" size={15} className="text-accent-yellow" />
              {event.dateLabel}
            </span>
            {event.startTime && (
              <span className="inline-flex items-center gap-2">
                <Icon name="clock" size={15} className="text-accent-yellow" />
                {event.startTime}
                {event.endTime && ` – ${event.endTime}`}
              </span>
            )}
            {event.location && (
              <span className="inline-flex items-center gap-2">
                <Icon name="pin" size={15} className="text-accent-yellow" />
                {event.location}
              </span>
            )}
          </div>

          {event.registrationUrl && event.status === "Upcoming" && (
            <a
              data-anim="up"
              data-anim-delay="0.2"
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-hero-950 transition-transform hover:-translate-y-0.5"
            >
              Register for this event
              <Icon name="arrowUpRight" size={15} />
            </a>
          )}
        </div>
      </section>

      {/* ---- Body + sidebar ------------------------------------------------ */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div className="min-w-0">
              {event.body?.length ? (
                <div data-anim="up" className="space-y-5">
                  {event.body.map((paragraph, i) => (
                    <p key={i} className="break-words text-base leading-relaxed text-up-ink/85">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {event.highlights?.length ? (
                <div className="mt-14">
                  <SectionTitle>What it covered</SectionTitle>
                  <ul data-anim="up" data-anim-stagger className="mt-6 grid gap-3 sm:grid-cols-2">
                    {event.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 rounded-2xl border border-line bg-subtle p-4"
                      >
                        <Icon
                          name="checkCircle"
                          size={16}
                          className="mt-0.5 shrink-0 text-up-accent"
                        />
                        <span className="break-words text-sm leading-relaxed text-up-ink/85">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {event.agenda?.length ? (
                <div className="mt-14">
                  <SectionTitle>Agenda</SectionTitle>
                  <ol data-anim="up" data-anim-stagger className="mt-6 space-y-0">
                    {event.agenda.map((slot, i) => (
                      <li
                        key={i}
                        className="relative flex gap-5 border-l-2 border-line pb-6 pl-6 last:pb-0"
                      >
                        <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-up-accent" />
                        <div className="min-w-0">
                          {slot.timeLabel && (
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-up-accent">
                              {slot.timeLabel}
                            </p>
                          )}
                          <p className="mt-1 break-words font-display text-base font-bold text-up-ink">
                            {slot.title}
                          </p>
                          {slot.detail && (
                            <p className="mt-1.5 break-words text-sm leading-relaxed text-up-muted">
                              {slot.detail}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {event.speakers?.length ? (
                <div className="mt-14">
                  <SectionTitle>Speakers</SectionTitle>
                  <div
                    data-anim="up"
                    data-anim-stagger
                    className="mt-6 grid gap-5 sm:grid-cols-2"
                  >
                    {event.speakers.map((speaker, i) => (
                      <div
                        key={i}
                        className="flex gap-4 rounded-2xl border border-line bg-white p-5"
                      >
                        {speaker.photo ? (
                          <Image
                            src={speaker.photo.src}
                            alt={speaker.photo.alt}
                            width={56}
                            height={56}
                            className="h-14 w-14 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-hero-600 to-hero-glow font-display text-base font-bold text-white">
                            {speaker.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="break-words font-display text-base font-bold text-up-ink">
                            {speaker.name}
                          </p>
                          {(speaker.role || speaker.org) && (
                            <p className="mt-0.5 text-xs text-up-accent">
                              {[speaker.role, speaker.org].filter(Boolean).join(" · ")}
                            </p>
                          )}
                          {speaker.bio && (
                            <p className="mt-2 break-words text-sm leading-relaxed text-up-muted">
                              {speaker.bio}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {event.images?.length ? (
                <div className="mt-14">
                  <SectionTitle>From the day</SectionTitle>
                  <div
                    data-anim="up"
                    data-anim-stagger
                    className="mt-6 grid gap-4 sm:grid-cols-2"
                  >
                    {event.images.map((image, i) => (
                      <figure key={i} className="overflow-hidden rounded-2xl bg-hero-950">
                        <span className="relative block aspect-[4/3]">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(min-width: 640px) 45vw, 100vw"
                            className="object-cover"
                          />
                        </span>
                        {image.caption && (
                          <figcaption className="break-words bg-white px-4 py-3 text-xs text-up-muted">
                            {image.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* ---- Sidebar --------------------------------------------------- */}
            {/*
              Deliberately not sticky.

              It was, and the card tracked the reader down the page — which
              reads as the box drifting rather than the page moving, and is
              distracting beside a column of prose. `self-start` keeps it at
              its natural height at the top of the column instead of
              stretching to match the article beside it.
            */}
            <aside className="min-w-0 lg:self-start">
              <div data-anim="up" className="rounded-3xl border border-line bg-subtle p-6">
                <p className="font-display text-lg font-bold text-up-ink">Event details</p>

                <div className="mt-4">
                  <Fact icon="calendar" label="Date">
                    {event.dateLabel}
                  </Fact>
                  <Fact icon="clock" label="Time">
                    {event.startTime
                      ? `${event.startTime}${event.endTime ? ` – ${event.endTime}` : ""}`
                      : null}
                  </Fact>
                  <Fact icon="pin" label="Venue">
                    {event.venueName || event.location ? (
                      <>
                        <span className="block">{event.venueName || event.location}</span>
                        {event.venueAddress && (
                          <span className="mt-0.5 block break-words text-up-muted">{event.venueAddress}</span>
                        )}
                        {event.mapUrl && (
                          <a
                            href={event.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-up-accent hover:underline"
                          >
                            Open in Maps
                            <Icon name="arrowUpRight" size={11} />
                          </a>
                        )}
                      </>
                    ) : null}
                  </Fact>
                  <Fact icon="monitor" label="Mode">
                    {event.mode ?? null}
                  </Fact>
                  <Fact icon="users" label="Host">
                    {event.hostName ?? null}
                  </Fact>
                  <Fact icon="users" label="Seats">
                    {event.seats ? `${event.seats} places` : null}
                  </Fact>
                </div>

                {event.tags?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand-50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-up-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                {event.registrationUrl && event.status === "Upcoming" && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-up-accent px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                  >
                    Register now
                    <Icon name="arrowUpRight" size={14} />
                  </a>
                )}

                <Link
                  href="/contact"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-bold text-up-ink transition-colors hover:border-up-accent hover:text-up-accent"
                >
                  Ask us about this
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ---- More events ---------------------------------------------------- */}
      {others.length > 0 && (
        <section className="bg-subtle py-20 lg:py-24">
          <div className="container-x">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <h2
                data-anim="words"
                className="font-display text-2xl font-extrabold text-up-ink sm:text-3xl"
              >
                More {event.category.toLowerCase()}s
              </h2>
              <Link
                data-anim="fade"
                href="/events"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-up-accent"
              >
                All events
                <Icon
                  name="arrowRight"
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div
              data-anim="up"
              data-anim-stagger
              className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {others.map((other: EventItem) => {
                const body = (
                  <>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-up-accent">
                      <Icon name="calendar" size={13} />
                      {other.dateLabel}
                    </div>
                    <h3 className="mt-2 break-words font-display text-base font-bold leading-snug text-up-ink">
                      {other.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 break-words text-sm leading-relaxed text-up-muted">
                      {other.excerpt}
                    </p>
                  </>
                );

                return hasDetail(other) ? (
                  <Link
                    key={other.slug}
                    href={`/events/${other.slug}`}
                    className="rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(11,26,77,0.45)]"
                  >
                    {body}
                  </Link>
                ) : (
                  <article
                    key={other.slug}
                    className="rounded-2xl border border-line bg-white p-5"
                  >
                    {body}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <RelatedLinks route="/events" />
      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
