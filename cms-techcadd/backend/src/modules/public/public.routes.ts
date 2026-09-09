import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'

import { asyncHandler, notFound } from '../../http/errors.js'
import { execute, query, queryOne, type Row } from '../../db/pool.js'
import * as aiKnowledgeRepo from '../ai_knowledge/ai_knowledge.repo.js'
import * as blogsRepo from '../blogs/blogs.repo.js'
import * as categoriesRepo from '../categories/categories.repo.js'
import * as coursesRepo from '../courses/courses.repo.js'
import * as enquiriesRepo from '../enquiries/enquiries.repo.js'
import * as eventsRepo from '../events/events.repo.js'
import { registerPublicComments } from '../comments/comments.routes.js'
import * as faqCategoriesRepo from '../faq_categories/faq_categories.repo.js'
import * as faqsRepo from '../faqs/faqs.repo.js'
import * as galleryRepo from '../gallery/gallery.repo.js'
import * as pagesRepo from '../pages/pages.repo.js'
import * as reviewsRepo from '../reviews/reviews.repo.js'
import * as testimonialsRepo from '../testimonials/testimonials.repo.js'

/**
 * What the public website may read and write.
 *
 * Deliberately a separate router with no `requireAuth`: every other module is
 * behind a session, and mounting public access on those would be one forgotten
 * middleware away from exposing drafts and enquiry records.
 *
 * Two rules hold everywhere below:
 *   - `status: 'published'` is forced, never taken from the query string, so a
 *     crafted request cannot read a draft.
 *   - Nothing here accepts an id from the caller for anything but a lookup.
 */
export const publicRouter = Router()

/** Only what a marketing page renders — no internal notes or audit fields. */
const PUBLISHED = { status: 'published' } as const
const MAX_PAGE_SIZE = 100

function listParams(limit: number) {
  return {
    page: 1,
    pageSize: Math.min(limit, MAX_PAGE_SIZE),
    filters: { ...PUBLISHED },
    sort: undefined,
    search: undefined,
  }
}

const limitFrom = (value: unknown, fallback: number) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, MAX_PAGE_SIZE) : fallback
}

/* ------------------------------------------------------------------ */
/* Content                                                              */
/* ------------------------------------------------------------------ */

/**
 * Publishes anything whose scheduled time has passed.
 *
 * No cron and no worker: a scheduled course becomes published the first time
 * the website asks for courses after its moment, which for a site being
 * crawled and visited is within seconds of it. The alternative — a job — is a
 * second thing to deploy, monitor and forget to restart, to solve a problem
 * one indexed UPDATE already solves.
 *
 * A write on a read path is unusual and worth being deliberate about: it is
 * idempotent, it touches only rows that are already due, and idx_courses_due
 * makes the no-op case an index lookup that matches nothing. `published_at` is
 * coalesced rather than set, so a course scheduled, published, unpublished and
 * scheduled again keeps the date it first went live.
 */
async function releaseDueCourses(): Promise<void> {
  await execute(
    `UPDATE courses
        SET status = 'published',
            published_at = COALESCE(published_at, NOW(3)),
            scheduled_for = NULL
      WHERE status = 'scheduled' AND scheduled_for <= NOW(3)`,
  )
}

publicRouter.get(
  '/ai-knowledge',
  asyncHandler(async (req, res) => {
    const result = await aiKnowledgeRepo.list(listParams(limitFrom(req.query.limit, 100)))
    res.json({ items: result.items, total: result.total })
  }),
)

/**
 * FAQs grouped by category, as the page renders them.
 *
 * Assembled here rather than left to the site to stitch together: the website
 * would otherwise fetch categories, then fetch questions, then join them in
 * the browser — three steps to produce something the database can hand over
 * in one.
 */
/**
 * Tags that have at least one published post, with their counts.
 *
 * Only published: a tag whose every post is a draft would render a page with
 * nothing on it, reachable from a tag cloud that promised otherwise.
 */
publicRouter.get(
  '/tags',
  asyncHandler(async (_req, res) => {
    const rows = await query<Row>(
      `SELECT t.id, t.name, t.slug, COUNT(b.id) AS uses
         FROM tags t
         JOIN blog_tags bt ON bt.tag_id = t.id
         JOIN blogs b ON b.id = bt.blog_id AND b.status = 'published'
        GROUP BY t.id, t.name, t.slug
        ORDER BY uses DESC, t.name ASC`,
    )
    res.json({
      items: rows.map((row) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        uses: Number(row.uses ?? 0),
      })),
      total: rows.length,
    })
  }),
)

publicRouter.get(
  '/faq-categories',
  asyncHandler(async (_req, res) => {
    const items = await faqCategoriesRepo.publicTree()
    res.json({ items, total: items.length })
  }),
)

publicRouter.get(
  '/courses',
  asyncHandler(async (req, res) => {
    await releaseDueCourses()
    const result = await coursesRepo.list(listParams(limitFrom(req.query.limit, 50)))
    res.json({ items: result.items, total: result.total })
  }),
)

publicRouter.get(
  '/courses/:slug',
  asyncHandler(async (req, res) => {
    await releaseDueCourses()
    const row = await queryOne<Row>(
      "SELECT id FROM courses WHERE slug = ? AND status = 'published' LIMIT 1",
      [req.params.slug],
    )
    if (!row) throw notFound('Course')
    res.json(await coursesRepo.get(row.id as string))
  }),
)

publicRouter.get(
  '/blogs',
  asyncHandler(async (req, res) => {
    const result = await blogsRepo.list(listParams(limitFrom(req.query.limit, 50)))
    res.json({ items: result.items, total: result.total })
  }),
)

publicRouter.get(
  '/blogs/:slug',
  asyncHandler(async (req, res) => {
    const row = await queryOne<Row>(
      "SELECT id FROM blogs WHERE slug = ? AND status = 'published' LIMIT 1",
      [req.params.slug],
    )
    if (!row) throw notFound('Post')
    res.json(await blogsRepo.get(row.id as string))
  }),
)

publicRouter.get(
  '/testimonials',
  asyncHandler(async (req, res) => {
    const result = await testimonialsRepo.list(listParams(limitFrom(req.query.limit, 50)))
    res.json({ items: result.items, total: result.total })
  }),
)

publicRouter.get(
  '/gallery',
  asyncHandler(async (req, res) => {
    const result = await galleryRepo.list(listParams(limitFrom(req.query.limit, 50)))
    res.json({ items: result.items, total: result.total })
  }),
)

publicRouter.get(
  '/faqs',
  asyncHandler(async (req, res) => {
    const result = await faqsRepo.list(listParams(limitFrom(req.query.limit, 100)))
    res.json({ items: result.items, total: result.total })
  }),
)

/**
 * Seminars and workshops, newest date first.
 *
 * The whole published set in one response rather than an /upcoming and a /past
 * pair: the website decides which side of today an event falls on, and two
 * endpoints would put that judgement in two places that have to agree. There
 * are tens of these, not thousands.
 */
publicRouter.get(
  '/events',
  asyncHandler(async (req, res) => {
    const result = await eventsRepo.list({
      ...listParams(limitFrom(req.query.limit, 100)),
      sort: { field: 'startsOn', dir: 'desc' },
    })
    res.json({ items: result.items, total: result.total })
  }),
)

publicRouter.get(
  '/events/:slug',
  asyncHandler(async (req, res) => {
    res.json(await eventsRepo.getPublishedBySlug(String(req.params.slug)))
  }),
)

publicRouter.get(
  '/reviews',
  asyncHandler(async (req, res) => {
    const result = await reviewsRepo.list(listParams(limitFrom(req.query.limit, 50)))
    res.json({ items: result.items, total: result.total })
  }),
)

publicRouter.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const result = await categoriesRepo.list(listParams(limitFrom(req.query.limit, 50)))
    res.json({ items: result.items, total: result.total })
  }),
)

/**
 * Site-wide facts the marketing pages print.
 *
 * A hand-picked subset of the settings row, not the row itself: it also holds
 * the reCAPTCHA secret and the notification preferences, and this endpoint has
 * no session behind it.
 */
publicRouter.get(
  '/site',
  asyncHandler(async (_req, res) => {
    const row = await queryOne<Row>(
      'SELECT site_name, tagline, contact_email, contact_phone, address, stats, social FROM settings WHERE id = 1 LIMIT 1',
    )

    const json = <T,>(value: unknown, fallback: T): T => {
      if (value === null || value === undefined) return fallback
      if (typeof value !== 'string') return value as T
      try {
        return JSON.parse(value) as T
      } catch {
        return fallback
      }
    }

    res.json({
      siteName: row?.site_name ?? '',
      tagline: row?.tagline ?? undefined,
      contactEmail: row?.contact_email ?? undefined,
      contactPhone: row?.contact_phone ?? undefined,
      address: row?.address ?? undefined,
      stats: json<{ value: string; label: string }[]>(row?.stats, []),
      social: json<Record<string, string>>(row?.social, {}),
    })
  }),
)

/**
 * Pages an editor asked to be linked from the site's own navigation.
 *
 * Without this a published page was reachable only by typing its address,
 * which no visitor does — so every page written in the CMS was, in practice,
 * invisible. Returns just enough to draw a menu item.
 *
 * Deliberately not the whole page: a menu needs a label and a href, and
 * shipping each page's body to render a link would be wasteful and would put
 * unpublished-adjacent content on a public endpoint for no reason.
 */
publicRouter.get(
  '/nav-pages',
  asyncHandler(async (_req, res) => {
    const rows = await query<Row>(
      `SELECT slug, title, nav_label, nav_placement
         FROM pages
        WHERE status = 'published' AND nav_placement <> 'none'
        ORDER BY nav_order ASC, title ASC`,
    )

    res.json({
      items: rows.map((row) => ({
        slug: row.slug,
        // The menu wording when there is one; the page title otherwise.
        label: (row.nav_label as string | null) || row.title,
        placement: row.nav_placement,
      })),
    })
  }),
)

publicRouter.get(
  '/pages/:slug',
  asyncHandler(async (req, res) => {
    const row = await queryOne<Row>(
      "SELECT id FROM pages WHERE slug = ? AND status = 'published' LIMIT 1",
      [req.params.slug],
    )
    if (!row) throw notFound('Page')
    res.json(await pagesRepo.get(row.id as string))
  }),
)

/** Enabled redirects, so the site can apply them in middleware. */
publicRouter.get(
  '/redirects',
  asyncHandler(async (_req, res) => {
    const rows = await query<Row>(
      'SELECT from_path, to_path, type FROM redirects WHERE enabled = 1',
    )
    res.json({
      items: rows.map((row) => ({
        from: row.from_path,
        to: row.to_path,
        type: Number(row.type),
      })),
    })
  }),
)

/* ------------------------------------------------------------------ */
/* Enquiries                                                            */
/* ------------------------------------------------------------------ */

/**
 * Anyone on the internet can reach this, so it carries its own limit.
 *
 * The website in front of it already rate-limits and verifies a captcha, but
 * this endpoint must stand on its own — it is reachable directly.
 */
const enquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many enquiries from this address. Try again shortly.' },
})

/**
 * What a public form may set.
 *
 * A narrow schema on purpose: `status`, `assigneeId` and `notes` belong to the
 * staff workflow, and letting a form set them would let anyone file an enquiry
 * as already-converted or assign work to a colleague.
 */
const publicEnquirySchema = z.object({
  studentName: z.string().min(1, 'Name is required.').max(120),
  phone: z.string().min(6, 'A contact number is required.').max(30),
  email: z.union([z.email('Enter a valid email address.'), z.literal('')]).optional(),
  courseName: z.string().max(200).default(''),
  message: z.string().max(2000).optional(),
  source: z.enum(['website', 'walk-in', 'phone', 'referral', 'social']).default('website'),
  // Recorded by the site: which form, which page, and who submitted it.
  formType: z.string().max(32).optional(),
  sourceUrl: z.string().max(500).optional(),
  ip: z.string().max(45).optional(),
  userAgent: z.string().max(255).optional(),
})

const MAX_PER_PHONE_PER_DAY = 3
const MAX_PER_IP_PER_HOUR = 8

/**
 * Refuses a repeat submission.
 *
 * This check used to live on the website, against its own table. It has to run
 * wherever the enquiries actually are — otherwise the same number could be
 * submitted all day and every one would be recorded.
 */
async function isDuplicate(phone: string, ip?: string): Promise<boolean> {
  const byPhone = await queryOne<{ n: number }>(
    `SELECT COUNT(*) AS n FROM enquiries
      WHERE phone = ? AND created_at > NOW() - INTERVAL 1 DAY`,
    [phone],
  )
  if (Number(byPhone?.n ?? 0) >= MAX_PER_PHONE_PER_DAY) return true

  if (!ip) return false

  const byIp = await queryOne<{ n: number }>(
    `SELECT COUNT(*) AS n FROM enquiries
      WHERE ip = ? AND created_at > NOW() - INTERVAL 1 HOUR`,
    [ip],
  )
  return Number(byIp?.n ?? 0) >= MAX_PER_IP_PER_HOUR
}

publicRouter.post(
  '/enquiries',
  enquiryLimiter,
  asyncHandler(async (req, res) => {
    const input = publicEnquirySchema.parse(req.body)

    if (await isDuplicate(input.phone, input.ip)) {
      // 429 rather than an error: the enquiry did reach us, we are simply not
      // recording it again. The site shows a reassuring message.
      res.status(429).json({
        message: 'We already have your enquiry. A counsellor will call you shortly.',
      })
      return
    }

    await enquiriesRepo.create({
      ...input,
      // Every public submission starts at the beginning of the pipeline.
      status: 'new',
      notes: [],
      courseId: undefined,
      assigneeId: undefined,
      followUpDate: undefined,
    })

    // Deliberately not the created record: an enquiry is not the submitter's to
    // read back, and the id is of no use to them.
    res.status(201).json({ ok: true })
  }),
)

/*
  Comments: reading a thread, leaving one, and reporting one.

  Registered from the comments module rather than written out here, so the
  validation and the moderation rules live beside the repository that enforces
  them — this file decides only that they are public.
*/
registerPublicComments(publicRouter)
