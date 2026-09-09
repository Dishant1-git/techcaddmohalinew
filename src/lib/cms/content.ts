import { cmsGet, cmsList, cmsMediaUrl, isCmsConfigured } from "@/lib/cms/client";
import type {
  CmsBlog,
  CmsCourse,
  CmsEvent,
  CmsFaqCategoryNode,
  CmsGalleryAlbum,
  CmsReview,
  CmsSite,
  CmsTestimonial,
} from "@/lib/cms/types";

import {
  courses as builtInCourses,
  categories,
  testimonials as builtInTestimonials,
  type CategoryKey,
  type Course,
} from "@/lib/courses";
import { blogPosts as builtInPosts, type BlogCategory, type BlogPost } from "@/lib/blog";
import { events as builtInEvents, type EventItem } from "@/lib/events";
import { galleryTiles as builtInTiles, type GalleryTile } from "@/lib/gallery";
import { googleReviews as builtInReviews, type GoogleReview } from "@/lib/reviews";
import {
  faqCategories as builtInFaqCategories,
  GENERAL_KEY,
  type FaqCategory,
  type FaqItem,
} from "@/lib/faq";

/**
 * CMS content, mapped onto the types this website already renders.
 *
 * The rule every function here follows: merge, never replace. A record the CMS
 * knows about overrides the matching built-in one field by field; a field the
 * editor left blank keeps the copy that is on the site today; a record the CMS
 * has never heard of is left exactly as it is. Nothing here can empty a page —
 * if the CMS is unreachable or has no rows, each function returns the built-in
 * array unchanged and the page renders as it did before any of this existed.
 *
 * That is what lets the integration ship without a content migration: the site
 * looks identical on the day the CMS is switched on, and each record starts
 * being CMS-driven the moment someone edits it.
 */

/* -------------------------------------------------------------------------- *
 *                                   Helpers                                   *
 * -------------------------------------------------------------------------- */

/** An edited value, or the one already on the site. Blank counts as unedited. */
function pick<T>(fromCms: T | undefined | null, fallback: T): T {
  if (fromCms === undefined || fromCms === null) return fallback;
  if (typeof fromCms === "string" && fromCms.trim() === "") return fallback;
  if (Array.isArray(fromCms) && fromCms.length === 0) return fallback;
  return fromCms;
}

/** Strips the HTML the CMS rich-text editor stores, for plain-text slots. */
function toText(html: string | undefined): string {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Rich text split into the paragraph array the blog and detail pages render. */
function toParagraphs(html: string | undefined): string[] {
  const text = toText(html);
  if (!text) return [];
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Merges CMS records over built-in ones, keyed by slug, preserving order.
 *
 * The built-in order is the designed order — the courses grid, the blog index
 * and the events list were all arranged deliberately — so edited records stay
 * where they are and anything genuinely new is appended.
 */
function mergeBySlug<Built extends { slug: string }, Incoming extends { slug: string }>(
  built: readonly Built[],
  incoming: readonly Incoming[],
  merge: (item: Incoming, existing: Built | undefined) => Built | null,
): Built[] {
  const bySlug = new Map(built.map((item) => [item.slug, item]));
  const added = new Set<string>();

  for (const item of incoming) {
    const mapped = merge(item, bySlug.get(item.slug));
    if (!mapped) continue;
    if (!bySlug.has(mapped.slug)) added.add(mapped.slug);
    bySlug.set(mapped.slug, mapped);
  }

  // Built-in order first — edited in place, untouched ones as they were —
  // then whatever the CMS added that the site did not already know about.
  const merged = built.map((item) => bySlug.get(item.slug) ?? item);
  for (const slug of added) {
    const item = bySlug.get(slug);
    if (item) merged.push(item);
  }
  return merged;
}

/* -------------------------------------------------------------------------- *
 *                                   Courses                                   *
 * -------------------------------------------------------------------------- */

const CATEGORY_KEYS = new Set<string>(categories.map((c) => c.key));

/**
 * Which of the site's six category groups a CMS course belongs to.
 *
 * The CMS categories are free-form rows an editor creates, so they cannot be
 * trusted to be one of the six keys the design is built around — and an
 * unrecognised key would drop the course out of every filter and leave a tab
 * rendering nothing. Matched on the slug first, then on words in the name, and
 * failing both the course keeps whatever group it is already filed under.
 */
function categoryKeyFor(course: CmsCourse, existing: Course | undefined): CategoryKey {
  const slug = (course.categorySlug || "").toLowerCase();
  if (CATEGORY_KEYS.has(slug)) return slug as CategoryKey;

  const name = `${course.categoryName || ""} ${course.title}`.toLowerCase();
  const rules: [RegExp, CategoryKey][] = [
    [/(cyber|security|hacking|cloud|aws|azure|linux|network)/, "cyber-cloud"],
    [/(digital marketing|seo|social media|marketing|ads)/, "digital-marketing"],
    [/(cad|cam|autocad|solidworks|revit|3ds|architect)/, "cad-design"],
    [/(ai|artificial|machine learning|data|analytic)/, "ai-data"],
    [/(full.?stack|web|mern|mean|php|react|node|development)/, "development"],
    [/(c\+\+|java|python|programming|dsa|algorithm)/, "programming"],
  ];
  for (const [pattern, key] of rules) if (pattern.test(name)) return key;

  return existing?.category ?? "development";
}

/**
 * The CMS stores level as a three-value lowercase enum, and the site renders
 * one of four phrasings. Anything the CMS cannot express — "Beginner →
 * Advanced" is a range, and the enum has no range — arrives unset, which reads
 * as "not edited" and keeps whatever the course page says today.
 */
const LEVELS: Record<string, Course["level"]> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const BADGES = new Set(["Hot", "New", "Trending"]);

/** One CMS course, expressed as the `Course` this site's components render. */
function toCourse(item: CmsCourse, existing: Course | undefined): Course | null {
  // Only the main catalogue: /courses is one segment of the CMS, and the
  // internship and after-12th segments have their own pages and their own
  // registries on this site.
  if (item.segment !== "courses") return null;

  const base: Course = existing ?? {
    slug: item.slug,
    title: item.title,
    category: "development",
    duration: "",
    level: "Beginner → Advanced",
    blurb: "",
    overview: "",
    modules: [],
    tools: [],
    outcomes: [],
    roles: [],
  };

  const level = (item.level && LEVELS[item.level.toLowerCase()]) || base.level;
  const badge = item.badge && BADGES.has(item.badge) ? (item.badge as Course["badge"]) : base.badge;

  const modules = item.syllabus?.length
    ? item.syllabus.map((module) => ({
        title: module.title,
        // Topics are the module's bullet list; a module written as prose
        // instead falls back to its body so the section is never empty.
        points: module.topics?.length ? module.topics : toParagraphs(module.body),
      }))
    : base.modules;

  const tools = item.toolItems?.length
    ? item.toolItems.map((tool) => tool.name)
    : pick(item.tools, base.tools);

  const roles = item.careerRoles?.length
    ? item.careerRoles.map((role) => role.role)
    : pick(item.careers, base.roles);

  return {
    ...base,
    slug: item.slug,
    title: pick(item.title, base.title),
    category: categoryKeyFor(item, existing),
    duration: pick(item.duration, base.duration),
    level,
    badge,
    blurb: pick(toText(item.shortDescription) || item.tagline, base.blurb),
    overview: pick(
      toText(item.overview) || toText(item.description) || toText(item.intro),
      base.overview,
    ),
    modules,
    tools,
    outcomes: pick(item.highlights, base.outcomes),
    roles,
  };
}

/** The course catalogue, with anything edited in the CMS folded in. */
export async function getCourses(): Promise<Course[]> {
  if (!isCmsConfigured()) return builtInCourses;
  const items = await cmsList<CmsCourse>("/courses", 100);
  if (!items?.length) return builtInCourses;
  return mergeBySlug(builtInCourses, items, toCourse);
}

/** One course by slug, or `undefined` if neither the CMS nor the site has it. */
export async function getCourse(slug: string): Promise<Course | undefined> {
  const all = await getCourses();
  return all.find((course) => course.slug === slug);
}

/* -------------------------------------------------------------------------- *
 *                                    Blog                                     *
 * -------------------------------------------------------------------------- */

const BLOG_CATEGORIES = new Set<string>(builtInPosts.map((post) => post.category as string));

/** ~200 words a minute, which is what the built-in posts were labelled at. */
function readTime(body: string[]): string {
  const words = body.join(" ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function toPost(item: CmsBlog, existing: BlogPost | undefined): BlogPost | null {
  const body = pick(toParagraphs(item.body), existing?.body ?? []);
  if (!body.length && !existing) return null;

  const name = item.categoryName || "";
  const category: BlogCategory = BLOG_CATEGORIES.has(name)
    ? (name as BlogCategory)
    : (existing?.category ?? "Career Advice");

  const date = (item.publishDate || item.createdAt || existing?.date || "").slice(0, 10);
  const unchanged = existing ? body === existing.body : false;

  return {
    slug: item.slug,
    title: pick(item.title, existing?.title ?? item.title),
    category,
    excerpt: pick(toText(item.excerpt), existing?.excerpt ?? ""),
    author: existing?.author ?? "techcadd Team",
    date: date || new Date().toISOString().slice(0, 10),
    readTime: unchanged ? existing!.readTime : readTime(body),
    body,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isCmsConfigured()) return builtInPosts;
  const items = await cmsList<CmsBlog>("/blogs", 100);
  if (!items?.length) return builtInPosts;

  const merged = mergeBySlug(builtInPosts, items, toPost);
  // Newest first, which is the order the blog index was designed around.
  return merged.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

/* -------------------------------------------------------------------------- *
 *                                   Events                                    *
 * -------------------------------------------------------------------------- */

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "23-27 Jun 2026" for a range, "17 Mar 2026" for a single day. */
function dateLabel(startsOn: string, endsOn?: string): string {
  const start = new Date(startsOn);
  if (Number.isNaN(start.getTime())) return "";
  if (!endsOn) return DATE_FMT.format(start);

  const end = new Date(endsOn);
  if (Number.isNaN(end.getTime()) || end.getTime() === start.getTime()) {
    return DATE_FMT.format(start);
  }

  // Same month and year reads better as one label than as two full dates.
  const sameMonth =
    start.getUTCFullYear() === end.getUTCFullYear() && start.getUTCMonth() === end.getUTCMonth();
  return sameMonth
    ? `${start.getUTCDate()}–${DATE_FMT.format(end)}`
    : `${DATE_FMT.format(start)} – ${DATE_FMT.format(end)}`;
}

function toEvent(item: CmsEvent, existing: EventItem | undefined): EventItem | null {
  const date = (item.startsOn || "").slice(0, 10);
  if (!date && !existing) return null;

  // Workshop or Seminar: the design has two pills and no third.
  const category: EventItem["category"] = /seminar|talk|session/i.test(item.eventType || "")
    ? "Seminar"
    : (existing?.category ?? "Workshop");

  const ends = (item.endsOn || item.startsOn || "").slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);
  const location = [item.venueName, item.city].filter(Boolean).join(", ");

  /** Children come back ordered by `position`; sorting again is cheap insurance. */
  const ordered = <T extends { order: number }>(rows: T[] | undefined): T[] =>
    (rows ?? []).slice().sort((a, b) => a.order - b.order);

  return {
    ...existing,
    slug: item.slug,
    title: pick(item.title, existing?.title ?? item.title),
    category,
    status: ends >= today ? "Upcoming" : "Past",
    dateLabel: pick(dateLabel(item.startsOn, item.endsOn), existing?.dateLabel ?? ""),
    date: date || existing?.date || today,
    location: pick(location, existing?.location ?? ""),
    excerpt: pick(toText(item.summary), existing?.excerpt ?? ""),

    /* ---- The detail page's sections ------------------------------------ *
     * Each left undefined when the CMS has nothing, so the page can test for
     * presence rather than for an empty array it would have to render around.
     */
    body: toParagraphs(item.body).length ? toParagraphs(item.body) : existing?.body,
    cover: item.coverImage?.url
      ? { src: cmsMediaUrl(item.coverImage.url), alt: item.coverImage.alt || item.title }
      : existing?.cover,
    mode: item.mode || existing?.mode,
    startTime: item.startTime || existing?.startTime,
    endTime: item.endTime || existing?.endTime,
    endDate: (item.endsOn || "").slice(0, 10) || existing?.endDate,
    venueName: item.venueName || existing?.venueName,
    venueAddress: item.venueAddress || existing?.venueAddress,
    city: item.city || existing?.city,
    mapUrl: item.mapUrl || existing?.mapUrl,
    hostName: item.hostName || existing?.hostName,
    registrationUrl: item.registrationUrl || existing?.registrationUrl,
    seats: item.seats ?? existing?.seats,
    tags: item.tags?.length ? item.tags : existing?.tags,
    highlights: item.highlights?.length
      ? ordered(item.highlights).map((h) => h.text).filter(Boolean)
      : existing?.highlights,
    agenda: item.agenda?.length
      ? ordered(item.agenda).map((a) => ({
          timeLabel: a.timeLabel || undefined,
          title: a.title,
          detail: a.detail || undefined,
        }))
      : existing?.agenda,
    speakers: item.speakers?.length
      ? ordered(item.speakers).map((sp) => ({
          name: sp.name,
          role: sp.role || undefined,
          org: sp.org || undefined,
          bio: sp.bio || undefined,
          photo: sp.photo?.url
            ? { src: cmsMediaUrl(sp.photo.url), alt: sp.photo.alt || sp.name }
            : undefined,
        }))
      : existing?.speakers,
    images: item.images?.length
      ? ordered(item.images)
          .filter((img) => img.media?.url)
          .map((img) => ({
            src: cmsMediaUrl(img.media.url),
            alt: img.media.alt || img.caption || item.title,
            caption: img.caption || undefined,
          }))
      : existing?.images,
  };
}

/** One event by slug, or `undefined` if neither the CMS nor the site has it. */
export async function getEvent(slug: string): Promise<EventItem | undefined> {
  const all = await getEvents();
  return all.find((event) => event.slug === slug);
}

export async function getEvents(): Promise<EventItem[]> {
  if (!isCmsConfigured()) return builtInEvents;
  const items = await cmsList<CmsEvent>("/events", 100);
  if (!items?.length) return builtInEvents;

  const merged = mergeBySlug(builtInEvents, items, toEvent);
  // Upcoming first, then the most recent past ones — the page's own ordering.
  return merged.sort((a, b) => {
    if (a.status !== b.status) return a.status === "Upcoming" ? -1 : 1;
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  });
}

/* -------------------------------------------------------------------------- *
 *                                   Gallery                                   *
 * -------------------------------------------------------------------------- */

/**
 * The masonry spans, reused for CMS photos.
 *
 * The wall's rhythm comes from a repeating pattern of tile sizes, so a photo
 * uploaded in the CMS is given the span its position calls for rather than a
 * uniform box that would flatten the layout.
 */
const SPANS = builtInTiles.map((tile) => tile.span);

export async function getGalleryTiles(): Promise<GalleryTile[]> {
  if (!isCmsConfigured()) return builtInTiles;
  const albums = await cmsList<CmsGalleryAlbum>("/gallery", 50);
  if (!albums?.length) return builtInTiles;

  const tiles: GalleryTile[] = [];
  for (const album of albums) {
    for (const image of album.images ?? []) {
      const src = cmsMediaUrl(image.media?.url ?? image.url);
      if (!src) continue;
      tiles.push({
        id: `cms-${image.id}`,
        src,
        alt: image.media?.alt || image.caption || album.title,
        span: SPANS[tiles.length % SPANS.length],
        caption: image.caption || undefined,
        href: image.linkUrl || undefined,
        album: album.title,
      });
    }
  }

  // An album with no images yet must not blank the wall.
  return tiles.length ? tiles : builtInTiles;
}

/* -------------------------------------------------------------------------- *
 *                              Gallery albums                                 *
 * -------------------------------------------------------------------------- */

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  /** The editor's caption, shown under the photo when it is floated. */
  caption?: string;
  /** Makes the photo link somewhere instead of opening the viewer. */
  href?: string;
  /** Intrinsic size, so the viewer can size the frame before the file loads. */
  width?: number;
  height?: number;
  /** Masonry span, so the wall keeps its rhythm. */
  span: string;
};

export type GalleryAlbum = {
  slug: string;
  title: string;
  description?: string;
  /** When the photographs were taken, as `YYYY-MM-DD`. */
  date?: string;
  cover?: { src: string; alt: string };
  photos: GalleryPhoto[];
};

/**
 * The album the site falls back to.
 *
 * The built-in photographs are one undifferentiated wall — the design has no
 * grouping — so they become a single album rather than being split into
 * invented ones. It keeps the slug the imported CMS album uses, so
 * `/gallery/campus-life` is a working address whether the CMS is up or not.
 */
function builtInAlbum(): GalleryAlbum {
  return {
    slug: "campus-life",
    title: "Campus & classrooms",
    description:
      "Photographs from the Mohali centre — classrooms, labs, workshops and ceremonies.",
    cover: { src: builtInTiles[0]?.src ?? "", alt: builtInTiles[0]?.alt ?? "" },
    photos: builtInTiles.map((tile) => ({
      id: tile.id,
      src: tile.src,
      alt: tile.alt,
      caption: tile.caption,
      href: tile.href,
      span: tile.span,
    })),
  };
}

/**
 * Every published album, with its photographs.
 *
 * Albums with no photographs are dropped: an album card that opens onto an
 * empty page is worse than one that was never offered, and a half-built album
 * in the CMS is a normal thing to find.
 */
export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  if (!isCmsConfigured()) return [builtInAlbum()];

  const albums = await cmsList<CmsGalleryAlbum>("/gallery", 50);
  if (!albums?.length) return [builtInAlbum()];

  const mapped: GalleryAlbum[] = albums
    .map((album) => {
      const photos: GalleryPhoto[] = (album.images ?? [])
        .map((image, index): GalleryPhoto | null => {
          const src = cmsMediaUrl(image.media?.url ?? image.url);
          if (!src) return null;
          return {
            id: `cms-${image.id}`,
            src,
            alt: image.media?.alt || image.caption || album.title,
            caption: image.caption || undefined,
            href: image.linkUrl || undefined,
            width: image.media?.width,
            height: image.media?.height,
            span: SPANS[index % SPANS.length],
          };
        })
        .filter((photo): photo is GalleryPhoto => photo !== null);

      const cover = album.cover?.url
        ? { src: cmsMediaUrl(album.cover.url), alt: album.cover.alt || album.title }
        : photos[0]
          ? { src: photos[0].src, alt: photos[0].alt }
          : undefined;

      return {
        slug: album.slug,
        title: album.title,
        description: album.description || undefined,
        date: (album.eventDate || "").slice(0, 10) || undefined,
        cover,
        photos,
      };
    })
    .filter((album) => album.photos.length > 0);

  return mapped.length ? mapped : [builtInAlbum()];
}

/** One album by slug, or `undefined` when there is no such album. */
export async function getGalleryAlbum(slug: string): Promise<GalleryAlbum | undefined> {
  const albums = await getGalleryAlbums();
  return albums.find((album) => album.slug === slug);
}

/* -------------------------------------------------------------------------- *
 *                              Reviews and quotes                             *
 * -------------------------------------------------------------------------- */

export async function getGoogleReviews(): Promise<GoogleReview[]> {
  if (!isCmsConfigured()) return builtInReviews;
  const items = await cmsList<CmsReview>("/reviews", 60);
  if (!items?.length) return builtInReviews;

  const mapped = items
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((review) => ({
      name: review.authorName,
      rating: Math.min(5, Math.max(1, Math.round(review.rating || 5))),
      tag: review.courseName || "techcadd",
      quote: toText(review.quote),
      // The card falls back to the site-wide listing URL when this is unset.
      url: review.googleUrl || undefined,
    }))
    .filter((review) => review.name && review.quote);

  return mapped.length ? mapped : builtInReviews;
}

export type Testimonial = (typeof builtInTestimonials)[number];

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isCmsConfigured()) return builtInTestimonials;
  const items = await cmsList<CmsTestimonial>("/testimonials", 30);
  if (!items?.length) return builtInTestimonials;

  const mapped = items
    .map((item) => ({
      name: item.studentName,
      role: item.batch || "techcadd student",
      company: item.googleReviewUrl ? "Verified Google review" : "techcadd Mohali",
      quote: toText(item.quote),
    }))
    .filter((item) => item.name && item.quote);

  return mapped.length ? mapped : builtInTestimonials;
}

/**
 * A student testimonial with the links the CMS records against it.
 *
 * Kept separate from the plain `Testimonial` above, which is the home page's
 * marquee shape and has no room for media. A testimonial with a video is a
 * different thing to render — it gets a thumbnail and a play control — so it
 * gets its own type rather than four optional fields most callers would ignore.
 */
export type StudentStory = {
  id: string;
  name: string;
  /** The batch or course, shown under the name. */
  role: string;
  quote: string;
  rating: number;
  photo?: { src: string; alt: string };
  /** The review on Google, when the student left one. */
  googleUrl?: string;
  /** A video testimonial, normalised to something embeddable. */
  video?: {
    /** Embed URL, for the in-page dialog. */
    embedUrl: string;
    /** The original link, for opening in a new tab. */
    watchUrl: string;
    /** YouTube's own still, when the id could be read from the URL. */
    posterUrl?: string;
  };
};

/**
 * Turns whatever an editor pasted into something an iframe can load.
 *
 * Editors paste what the browser gave them — a watch URL, a share link, a
 * Shorts URL, occasionally an embed URL already. Only the last of those works
 * in an iframe, so the rest are converted rather than ignored: dropping a
 * perfectly good YouTube link because of its shape is the kind of thing that
 * makes a CMS feel broken.
 *
 * Returns `undefined` for anything unrecognised, which is how the card knows
 * not to draw a play button.
 */
function toVideo(url: string | undefined): StudentStory["video"] | undefined {
  const raw = (url || "").trim();
  if (!raw) return undefined;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return undefined;
  }

  const host = parsed.hostname.replace(/^www\./, "");

  /*
    youtu.be/<id>            the share button's format
    youtube.com/watch?v=<id> the address bar's
    youtube.com/embed/<id>   already an embed
    youtube.com/shorts/<id>  a short
  */
  if (host === "youtu.be" || host.endsWith("youtube.com") || host === "youtube-nocookie.com") {
    const id =
      host === "youtu.be"
        ? parsed.pathname.slice(1).split("/")[0]
        : parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop() || "";

    if (!/^[\w-]{6,}$/.test(id)) return undefined;

    return {
      // `rel=0` stops the end screen advertising other channels; nocookie is
      // the privacy-preserving host YouTube provides for embeds.
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`,
      watchUrl: `https://www.youtube.com/watch?v=${id}`,
      posterUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }

  // Vimeo, for the occasional one that is not on YouTube.
  if (host.endsWith("vimeo.com")) {
    const id = parsed.pathname.split("/").filter(Boolean).pop() || "";
    if (!/^\d+$/.test(id)) return undefined;
    return { embedUrl: `https://player.vimeo.com/video/${id}`, watchUrl: raw };
  }

  return undefined;
}

/**
 * Student stories, for the reviews page.
 *
 * Unlike every other reader here this one has no built-in fallback: the site
 * ships no testimonials with photos or videos, so an empty CMS means an empty
 * list and the page omits the section rather than inventing one.
 */
export async function getStudentStories(): Promise<StudentStory[]> {
  if (!isCmsConfigured()) return [];
  const items = await cmsList<CmsTestimonial>("/testimonials", 60);
  if (!items?.length) return [];

  return (
    items
      .map((item) => ({
        id: item.id,
        name: item.studentName,
        role: item.batch || "techcadd student",
        quote: toText(item.quote),
        rating: Math.min(5, Math.max(1, Math.round(item.rating || 5))),
        photo: item.photo?.url
          ? { src: cmsMediaUrl(item.photo.url), alt: item.photo.alt || item.studentName }
          : undefined,
        googleUrl: item.googleReviewUrl || undefined,
        video: toVideo(item.videoUrl),
      }))
      // A story needs something to say — a quote, or a video that says it.
      .filter((item) => item.name && (item.quote || item.video))
      // Videos lead: they are the ones worth scrolling for.
      .sort((a, b) => Number(Boolean(b.video)) - Number(Boolean(a.video)))
  );
}

/* -------------------------------------------------------------------------- *
 *                                    FAQs                                     *
 * -------------------------------------------------------------------------- */

/**
 * FAQ tabs: the six course categories, then General.
 *
 * A CMS question is filed into exactly one of them and never repeated. Its
 * category is matched against the six course tabs by slug or by name; anything
 * that matches none — "General", "Fees", "Placements" — goes to the General
 * tab rather than being copied into all of them.
 *
 * That copying is what this replaces. Every tab used to open with the same
 * handful of general answers, so switching tabs appeared to do nothing and the
 * categories in the CMS looked like they had no effect.
 */
export async function getFaqCategories(): Promise<FaqCategory[]> {
  if (!isCmsConfigured()) return builtInFaqCategories;
  const tree = await cmsList<CmsFaqCategoryNode>("/faq-categories");
  if (!tree?.length) return builtInFaqCategories;

  /** Questions to add, keyed by the tab that will hold them. */
  const additions = new Map<string, FaqItem[]>();

  const add = (key: string, items: FaqItem[]) => {
    additions.set(key, [...(additions.get(key) ?? []), ...items]);
  };

  for (const node of tree) {
    const items: FaqItem[] = (node.faqs ?? [])
      .map((faq) => ({ q: faq.question, a: toText(faq.answer) }))
      .filter((item) => item.q && item.a);
    if (!items.length) continue;

    const name = (node.name || "").toLowerCase();
    const match = categories.find(
      (category) => category.key === node.slug || category.title.toLowerCase() === name,
    );

    // One tab, or General. Never both, and never all of them.
    add(match ? match.key : GENERAL_KEY, items);
  }

  if (!additions.size) return builtInFaqCategories;

  return builtInFaqCategories.map((tab) => {
    const extra = additions.get(tab.key);
    if (!extra?.length) return tab;

    // CMS questions lead — they are the ones someone thought to write down.
    const seen = new Set<string>();
    const items = [...extra, ...tab.items].filter((item) => {
      if (seen.has(item.q)) return false;
      seen.add(item.q);
      return true;
    });
    return { ...tab, items };
  });
}

/* -------------------------------------------------------------------------- *
 *                               Site settings                                 *
 * -------------------------------------------------------------------------- */

/** The handful of site-wide facts an editor may change. `null` when unset. */
export async function getSiteSettings(): Promise<CmsSite | null> {
  if (!isCmsConfigured()) return null;
  return cmsGet<CmsSite>("/site");
}
