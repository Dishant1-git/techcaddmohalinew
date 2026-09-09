/**
 * Puts the Mohali website's built-in content into the CMS.
 *
 * Why this exists
 * ---------------
 * This CMS was ported from the Jalandhar project, so `import-site-courses.ts`
 * beside it reads `lib/course-pages.ts` — a registry the Mohali site does not
 * have. Mohali keeps its content in `src/lib/*.ts` in a different shape, and
 * without an importer the CMS starts empty: an editor opens Courses, sees no
 * rows, and has no way to change any of the pages that are live.
 *
 * After this runs the CMS is the editing surface for the catalogue, the blog,
 * the events list, the reviews wall and the FAQs. The website's mapping layer
 * (`src/lib/cms/content.ts`) merges each record over the built-in one by slug,
 * so importing changes nothing a visitor sees — it only makes the copy that is
 * already on the page reachable from the CMS.
 *
 * Idempotent. Matched on slug (and on the question text for FAQs). An existing
 * row is left exactly as it is: this seeds what is missing, it never overwrites
 * work an editor has already done.
 *
 * Usage
 * -----
 *   cd cms-techcadd/backend
 *   npm run db:import-mohali
 *
 *   DRY_RUN=1 npm run db:import-mohali    # report only, write nothing
 */

import { randomUUID } from 'node:crypto'

import { execute, query, queryOne, pool, type Row } from '../src/db/pool.js'

/*
  The website's own modules, read directly so there is one source of truth for
  what the site currently says.

  Imported from the site's `src/lib` across the directory boundary. They are
  plain data with no runtime dependencies and no `@/` imports, which is what
  makes reading them from here possible at all — `courses.ts` and the rest
  export arrays and nothing else.
*/
import { courses, categories, faqs as generalFaqs, testimonials } from '../../../src/lib/courses.js'
import { blogPosts } from '../../../src/lib/blog.js'
import { events } from '../../../src/lib/events.js'
import { googleReviews } from '../../../src/lib/reviews.js'

const DRY_RUN = process.env.DRY_RUN === '1'

const now = () => new Date()

/** Trims to a column's width rather than letting MySQL truncate silently. */
function cut(value: string | undefined | null, max: number): string {
  const text = String(value ?? '').trim()
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

/** Paragraph array to the HTML the CMS's rich-text editor round-trips. */
function toHtml(paragraphs: readonly string[]): string {
  return paragraphs
    .map((p) => `<p>${p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
    .join('\n')
}

/**
 * The site's level wording, as the CMS's three-value enum.
 *
 * "Beginner → Advanced" has no equivalent — the enum cannot express a range —
 * so it imports as NULL rather than being flattened to "beginner", which would
 * change what those course pages say. The website's mapper treats an unset
 * level as "not edited" and keeps the range it already renders.
 */
const LEVEL: Record<string, 'beginner' | 'intermediate' | 'advanced' | null> = {
  Beginner: 'beginner',
  Intermediate: 'intermediate',
  Advanced: 'advanced',
  'Beginner → Advanced': null,
}

const tally = { created: 0, skipped: 0 }

function note(what: string, slug: string, created: boolean) {
  if (created) tally.created++
  else tally.skipped++
  if (created) console.log(`  + ${what}  ${slug}`)
}

/* ------------------------------------------------------------------ */
/* Categories                                                           */
/* ------------------------------------------------------------------ */

/**
 * The site's six course groups, as CMS categories.
 *
 * Slugs are the site's own `CategoryKey` values, which is what lets
 * `categoryKeyFor` in the website's mapping layer recognise a category
 * exactly rather than guessing from its name.
 */
async function importCategories(): Promise<Map<string, string>> {
  const byKey = new Map<string, string>()

  for (const [index, category] of categories.entries()) {
    const existing = await queryOne<Row>('SELECT id FROM categories WHERE slug = ? LIMIT 1', [
      category.key,
    ])

    if (existing) {
      byKey.set(category.key, existing.id as string)
      note('category', category.key, false)
      continue
    }

    const id = randomUUID()
    byKey.set(category.key, id)
    note('category', category.key, true)
    if (DRY_RUN) continue

    await execute(
      `INSERT INTO categories (id, name, slug, icon, description, sort_order, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'published', ?, ?)`,
      [id, cut(category.title, 120), category.key, cut(category.icon, 40), category.blurb, index, now(), now()],
    )
  }

  return byKey
}

/* ------------------------------------------------------------------ */
/* Courses                                                              */
/* ------------------------------------------------------------------ */

async function importCourses(categoryIds: Map<string, string>): Promise<void> {
  for (const course of courses) {
    const existing = await queryOne<Row>(
      "SELECT id FROM courses WHERE segment = 'courses' AND slug = ? LIMIT 1",
      [course.slug],
    )

    if (existing) {
      note('course', course.slug, false)
      continue
    }

    note('course', course.slug, true)
    if (DRY_RUN) continue

    const id = randomUUID()

    await execute(
      `INSERT INTO courses
         (id, title, slug, segment, category_id, short_description, description, overview,
          duration, level, badge, tools, careers, status, published_at, created_at, updated_at)
       VALUES (?, ?, ?, 'courses', ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?, ?)`,
      [
        id,
        cut(course.title, 200),
        course.slug,
        categoryIds.get(course.category) ?? null,
        cut(course.blurb, 255),
        toHtml([course.overview]),
        toHtml([course.overview]),
        cut(course.duration, 60),
        LEVEL[course.level] ?? null,
        course.badge ?? null,
        JSON.stringify(course.tools),
        JSON.stringify(course.roles),
        now(),
        now(),
        now(),
      ],
    )

    // Modules become the syllabus; their bullet points become the topics.
    for (const [position, module] of course.modules.entries()) {
      await execute(
        `INSERT INTO course_syllabus (id, course_id, title, topics, outcomes, tools, position)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          randomUUID(),
          id,
          cut(module.title, 200),
          JSON.stringify(module.points),
          JSON.stringify([]),
          JSON.stringify([]),
          position,
        ],
      )
    }

    // The site's "outcomes" are the course highlights in the CMS.
    for (const [position, outcome] of course.outcomes.entries()) {
      await execute(
        'INSERT INTO course_highlights (course_id, value, position) VALUES (?, ?, ?)',
        [id, cut(outcome, 160), position],
      )
    }
  }
}

/* ------------------------------------------------------------------ */
/* Blog                                                                 */
/* ------------------------------------------------------------------ */

/**
 * Blog categories live in the same `categories` table as course categories.
 *
 * The website matches a post's category by name, not by slug, so the name is
 * what has to survive the round trip — "Career Advice" in, "Career Advice"
 * back out, and the post keeps the tab it is filed under today.
 */
async function importBlogs(): Promise<void> {
  const categoryIds = new Map<string, string>()

  for (const post of blogPosts) {
    if (!categoryIds.has(post.category)) {
      const slug = post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      const existing = await queryOne<Row>('SELECT id FROM categories WHERE slug = ? LIMIT 1', [slug])

      if (existing) {
        categoryIds.set(post.category, existing.id as string)
      } else {
        const id = randomUUID()
        categoryIds.set(post.category, id)
        if (!DRY_RUN) {
          await execute(
            `INSERT INTO categories (id, name, slug, sort_order, status, created_at, updated_at)
             VALUES (?, ?, ?, 100, 'published', ?, ?)`,
            [id, cut(post.category, 120), slug, now(), now()],
          )
        }
      }
    }

    const existing = await queryOne<Row>('SELECT id FROM blogs WHERE slug = ? LIMIT 1', [post.slug])
    if (existing) {
      note('post', post.slug, false)
      continue
    }

    note('post', post.slug, true)
    if (DRY_RUN) continue

    await execute(
      `INSERT INTO blogs (id, title, slug, category_id, excerpt, body, publish_date, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'published', ?, ?)`,
      [
        randomUUID(),
        cut(post.title, 200),
        post.slug,
        categoryIds.get(post.category) ?? null,
        cut(post.excerpt, 300),
        toHtml(post.body),
        post.date,
        now(),
        now(),
      ],
    )
  }
}

/* ------------------------------------------------------------------ */
/* Events                                                               */
/* ------------------------------------------------------------------ */

async function importEvents(): Promise<void> {
  for (const event of events) {
    const existing = await queryOne<Row>('SELECT id FROM events WHERE slug = ? LIMIT 1', [event.slug])
    if (existing) {
      note('event', event.slug, false)
      continue
    }

    note('event', event.slug, true)
    if (DRY_RUN) continue

    await execute(
      `INSERT INTO events
         (id, title, slug, event_type, summary, body, starts_on, venue_name, city, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?)`,
      [
        randomUUID(),
        cut(event.title, 160),
        event.slug,
        event.category.toLowerCase(),
        cut(event.excerpt, 300),
        toHtml([event.excerpt]),
        event.date,
        cut(event.location, 160),
        // The site stores one location string; its tail is usually the city.
        cut(event.location.split(',').pop() ?? '', 80),
        now(),
        now(),
      ],
    )
  }
}

/* ------------------------------------------------------------------ */
/* Reviews and testimonials                                             */
/* ------------------------------------------------------------------ */

async function importReviews(): Promise<void> {
  // Both the reviews wall and the home-page quotes land here: the CMS keeps
  // testimonials for students with a photo and a batch, and these are neither.
  const incoming = [
    ...googleReviews.map((review, i) => ({
      name: review.name,
      rating: review.rating,
      quote: review.quote,
      courseName: review.tag,
      order: i,
    })),
    ...testimonials.map((quote, i) => ({
      name: quote.name,
      rating: 5,
      quote: quote.quote,
      courseName: quote.role,
      order: googleReviews.length + i,
    })),
  ]

  for (const review of incoming) {
    const existing = await queryOne<Row>(
      'SELECT id FROM reviews WHERE author_name = ? AND LEFT(quote, 80) = ? LIMIT 1',
      [review.name, review.quote.slice(0, 80)],
    )
    if (existing) {
      note('review', review.name, false)
      continue
    }

    note('review', review.name, true)
    if (DRY_RUN) continue

    await execute(
      `INSERT INTO reviews
         (id, author_name, rating, quote, course_name, source, sort_order, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'google', ?, 'published', ?, ?)`,
      [
        randomUUID(),
        cut(review.name, 120),
        review.rating,
        review.quote,
        cut(review.courseName, 160),
        review.order,
        now(),
        now(),
      ],
    )
  }
}

/* ------------------------------------------------------------------ */
/* FAQs                                                                 */
/* ------------------------------------------------------------------ */

/**
 * The general questions, in one category.
 *
 * Only the general set, not the per-course ones: those are generated from each
 * course by `src/lib/coursePage.ts` and would import as hundreds of near
 * duplicates that no one would ever want to edit one by one.
 */
async function importFaqs(): Promise<void> {
  const slug = 'general'
  let categoryId = (await queryOne<Row>('SELECT id FROM faq_categories WHERE slug = ? LIMIT 1', [slug]))
    ?.id as string | undefined

  if (!categoryId) {
    categoryId = randomUUID()
    if (!DRY_RUN) {
      await execute(
        `INSERT INTO faq_categories (id, name, slug, description, sort_order, active, created_at, updated_at)
         VALUES (?, 'General', ?, 'Questions asked on every course page.', 0, 1, ?, ?)`,
        [categoryId, slug, now(), now()],
      )
    }
  }

  for (const [position, faq] of generalFaqs.entries()) {
    const existing = await queryOne<Row>('SELECT id FROM faqs WHERE question = ? LIMIT 1', [faq.q])
    if (existing) {
      note('faq', faq.q.slice(0, 40), false)
      continue
    }

    note('faq', faq.q.slice(0, 40), true)
    if (DRY_RUN) continue

    await execute(
      `INSERT INTO faqs (id, question, answer, category_id, sort_order, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'published', ?, ?)`,
      [randomUUID(), cut(faq.q, 300), faq.a, categoryId, position, now(), now()],
    )
  }
}

/* ------------------------------------------------------------------ */

async function main(): Promise<void> {
  if (DRY_RUN) console.log('DRY RUN — nothing will be written.\n')

  const categoryIds = await importCategories()
  await importCourses(categoryIds)
  await importBlogs()
  await importEvents()
  await importReviews()
  await importFaqs()

  console.log(`\nCreated ${tally.created}, left alone ${tally.skipped}.`)
}

main()
  .catch((error: unknown) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => pool.end())
