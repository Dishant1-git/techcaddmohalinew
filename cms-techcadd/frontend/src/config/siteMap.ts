/**
 * Where each kind of content ends up on the public website.
 *
 * An editor filling in a form cannot tell, from the form alone, whether they
 * are writing something that appears on the homepage, on a page of its own, or
 * nowhere at all until a developer wires it up. That gap is where "I saved it
 * and nothing happened" comes from, so it is answered here in one place and
 * shown on every form.
 *
 * Keeping it as data rather than prose in each form means a module that is not
 * yet connected has to say so explicitly, instead of quietly omitting the note.
 */

/** The public site. Set VITE_SITE_URL when it is not on the usual dev port. */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'http://localhost:3000'
).replace(/\/$/, '')

export interface Placement {
  /** Where this content shows up, in a sentence an editor can act on. */
  where: string
  /**
   * The public URL of one record, when it has a page of its own.
   *
   * Undefined means the content appears inside other pages rather than at its
   * own address — a testimonial has no URL, a blog post does.
   */
  url?: (record: Record<string, unknown>) => string | undefined
  /**
   * Set when nothing on the website reads this yet.
   *
   * The honest alternative to leaving the module out of this map, which would
   * read as "no note needed" rather than "this goes nowhere".
   */
  notLive?: string
}

const slugUrl = (prefix: string) => (record: Record<string, unknown>) => {
  const slug = record.slug
  return typeof slug === 'string' && slug ? `${SITE_URL}${prefix}${slug}` : undefined
}

export const SITE_MAP: Record<string, Placement> = {
  blogs: {
    where: 'The blog index at /blog, and a page of its own.',
    // /blog, not /blogs. The plural is the Jalandhar site's address and it
    // 404s here, which sent editors to a missing page from their own post.
    url: slugUrl('/blog/'),
  },
  courses: {
    where:
      'Its own course page, the listing for its section, the course dropdown in the menus and the sitemap. The category you choose is the heading it is filed under.',
    /*
      The segment is not the address.

      It used to be dropped straight into the path, so an after-12th course
      linked to /after-12th-courses/<slug> — which this site does not have.
      A segment with no page here returns no link at all, which is honester
      than one that 404s.
    */
    url: (record) => {
      const { slug, segment } = record
      if (typeof slug !== 'string' || !slug) return undefined

      const paths: Record<string, string> = {
        courses: '/courses/',
        'after-12th-courses': '/after-12th/',
      }
      const prefix = paths[typeof segment === 'string' ? segment : 'courses']
      return prefix ? `${SITE_URL}${prefix}${slug}` : undefined
    },
  },
  categories: {
    where: 'The category cards on the homepage. The slug decides which course page the card opens.',
  },
  pages: {
    where: 'A page of its own at the address below.',
    url: slugUrl('/'),
  },
  faqs: {
    where:
      'The /faq page, under the tab matching the category you choose. A category with no tab of its own is shown under General.',
  },
  reviews: {
    where:
      'The /reviews page. Only reviews with source "Google" are shown there, because the card carries the Google mark.',
  },
  testimonials: {
    where:
      'The quotes marquee on the homepage, and the student stories on /reviews — where a Google link or a video link on the testimonial becomes a button.',
  },
  events: {
    where:
      'The events listing at /events, reached from Resources in the main menu, and a page of its own. Upcoming events are shown first; once the end date has passed it moves to the archive below them.',
    url: slugUrl('/events/'),
  },
  gallery: {
    where:
      'The /gallery index as an album card, and a page of its own where the photographs are shown as a wall. Clicking one opens it full size.',
    url: slugUrl('/gallery/'),
  },
  settings: {
    where:
      'Site-wide. The headline figures appear on the about page; the rest is used for contact details and metadata.',
  },
  redirects: {
    where: 'Applied to every visitor request, so an old address sends people to the new one.',
  },
  enquiries: {
    where: 'Received from the website forms. Nothing here is published back to it.',
  },
  media: {
    where: 'Used by whatever content references it — a cover photo, a blog image, a gallery photograph.',
  },
  seo: {
    where: 'Meta titles and descriptions are used on the pages they belong to.',
  },
  'ai-knowledge': {
    where:
      'Nowhere directly. These notes are handed to Gini, the assistant on the website, as facts it is allowed to state — so a published entry changes what Gini answers rather than what any page shows.',
  },
}

/**
 * The public address of one record, or undefined when it has none.
 *
 * Wraps the per-module `url` above so a caller does not have to know which
 * modules have their own page — a list page can offer "View on site" wherever
 * this returns something and omit it everywhere else, without carrying its own
 * copy of the site's URL shapes.
 */
export function publicUrlFor(module: string, record: object | undefined): string | undefined {
  if (!record) return undefined
  // Callers pass their own entity types (Course, Blog, Page); the map's own
  // url() reads a couple of named fields off it and checks them, so an
  // index-signature cast here is safe and saves every caller a cast.
  return SITE_MAP[module]?.url?.(record as Record<string, unknown>)
}
