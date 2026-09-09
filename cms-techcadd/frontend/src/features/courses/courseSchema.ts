import { z } from 'zod'

import { CONTENT_BLOCK_TYPES, contentBlockFields } from '../shared/contentBlockSchema'

const mediaRefSchema = z.object({
  id: z.string(),
  url: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
})

const seoSchema = z.object({
  ogTitle: z.string().max(120, 'Keep social titles under 120 characters.'),
  ogDescription: z.string().max(300),
  twitterTitle: z.string().max(120),
  twitterDescription: z.string().max(300),
  robotsIndex: z.boolean(),
  inSitemap: z.boolean(),
  faqSchema: z.boolean(),
  metaTitle: z.string().max(60, 'Keep meta titles under 60 characters.').optional(),
  metaDescription: z.string().max(160, 'Keep meta descriptions under 160 characters.').optional(),
  keywords: z.array(z.string()),
  ogImage: mediaRefSchema.nullish(),
  canonicalUrl: z.string().optional(),
})

/** Mirrors ctaSchema in the API — see the note there on why url is conditional. */
const ctaFormSchema = z.object({
  text: z.string().max(60, 'Keep button labels short.'),
  type: z.enum(['enquiry', 'contact', 'internal', 'external']),
  url: z
    .string()
    .max(500, 'That link is too long to store.')
    .refine(
      (v) => v === '' || v.startsWith('/') || /^https?:\/\//i.test(v),
      'Enter a path beginning with "/" for a page on this site, or a full https:// address.',
    ),
})

/* ---- Repeatable sections. `id` is client-side only, for list keys. ---- */

const rowLink = z
  .string()
  .max(500, 'That link is too long to store.')
  .refine(
    (v) => v === '' || v.startsWith('/') || /^https?:\/\//i.test(v),
    'Enter a path beginning with "/" or a full https:// address.',
  )

const audienceForm = z.object({
  id: z.string(),
  title: z.string().max(120),
  body: z.string(),
})

const benefitForm = z.object({
  id: z.string(),
  placement: z.enum(['hero', 'what-you-get']),
  title: z.string().max(120),
  body: z.string(),
})

const careerRoleForm = z.object({
  id: z.string(),
  role: z.string().max(120),
  body: z.string(),
  salaryStart: z.string().max(60),
  salarySenior: z.string().max(60),
  market: z.string().max(80),
})

/**
 * The picture on one repeating item, as the form carries it.
 *
 * `mediaId` is what the API has always stored and is what gets saved;
 * `media` is the file itself, sent by the API so a preview can be drawn and
 * dropped again on the way back — the server keeps the id, not the address.
 * Both optional: media on any of these items is, and stays, entirely optional.
 */
const itemMedia = {
  mediaId: z.string().optional(),
  media: mediaRefSchema.nullish(),
}

const projectForm = z.object({
  id: z.string(),
  title: z.string().max(160),
  body: z.string(),
  tags: z.array(z.string()),
  demoUrl: rowLink,
  ...itemMedia,
  /* The project's own walkthrough. Same link rule as demoUrl. */
  videoUrl: rowLink,
})

const pointForm = z.object({
  id: z.string(),
  title: z.string().max(160),
  body: z.string(),
})

const comparisonRowForm = z.object({
  id: z.string(),
  feature: z.string().max(160),
  ours: z.string().max(200),
  theirs: z.string().max(200),
})

const toolItemForm = z.object({
  id: z.string(),
  name: z.string().max(80),
  category: z.string().max(60),
  url: rowLink,
  ...itemMedia,
})

const planForm = z.object({
  id: z.string(),
  label: z.string().max(80),
  months: z.string().max(4),
  summary: z.string(),
  badge: z.string().max(24),
  popular: z.boolean(),
})

const factFormSchema = z.object({
  // Client-side only, for list keys and drag ordering — the API's own schema
  // has no id and zod strips it, the same as syllabus modules.
  id: z.string(),
  label: z.string().max(60),
  value: z.string().max(120),
  icon: z.string().max(40),
  suffix: z.string().max(24),
})

const syllabusModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  topics: z.array(z.string()),
  hours: z.number().min(0).optional(),
  // Optional below: a freshly added module (SyllabusEditor's `add()`) only
  // sets id/title/topics, and outcomes/tools have no field in this editor at
  // all — requiring them here made every new module unsaveable until an
  // editor happened to touch fields the UI never asks for.
  body: z.string().optional(),
  outcomes: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  project: z.string().max(300).optional(),
  ...itemMedia,
  /**
   * The shortest plan that reaches this module, 1-based, as a string because
   * it comes from a <select>. Blank means every plan reaches it.
   */
  fromPlan: z.string().optional(),
})

/**
 * Block kinds a course page offers.
 *
 * The shared list minus 'blogs': a course page already closes with its own
 * related-courses strip, and a second list of unrelated posts in the middle of
 * a syllabus is not something an editor should be offered.
 */
export const SECTION_TYPES = CONTENT_BLOCK_TYPES.filter((t) => t.value !== 'blogs')

/**
 * The generated sections of the course page, in the order they render.
 *
 * `hideable` is false for the three that are structural — the hero carries the
 * title and the facts, and the CTA and enquiry form are how the page converts.
 * A block can still be anchored to them.
 */
export const PAGE_SECTIONS = [
  { id: 'hero', label: 'Hero', hideable: false },
  { id: 'overview', label: 'Overview & video', hideable: true },
  { id: 'who-can-do', label: 'Who can do this', hideable: true },
  { id: 'why-this-program', label: 'The case for it', hideable: true },
  { id: 'modules', label: 'Modules by duration', hideable: true },
  { id: 'what-you-will-learn', label: 'What you will learn', hideable: true },
  { id: 'tools', label: 'Tools', hideable: true },
  { id: 'outcomes', label: 'Future scope', hideable: true },
  { id: 'projects', label: 'Hands-on projects', hideable: true },
  { id: 'why-techcadd', label: 'Why techcadd', hideable: true },
  { id: 'reviews', label: 'Reviews', hideable: true },
  { id: 'faqs', label: 'FAQs', hideable: true },
  { id: 'cta', label: 'Call to action', hideable: false },
  { id: 'enquiry', label: 'Enquiry form', hideable: false },
] as const

const SECTION_ANCHORS = PAGE_SECTIONS.map((s) => s.id)

/**
 * A course block: the shared block, plus where on the page it sits.
 *
 * The fields and the per-kind rules come from features/shared, so a block on
 * a course and a block on a page validate identically — same link rule, same
 * "this kind needs that field" messages. Only the anchoring is particular to
 * courses, because only a course positions a block against a generated
 * section.
 */
export const courseSectionSchema = z.object({
  ...contentBlockFields,
  type: z.enum(['rich-text', 'image', 'video', 'cta']),
  anchor: z.enum(SECTION_ANCHORS as unknown as [string, ...string[]]),
  placement: z.enum(['before', 'after']),
})

export type CourseSectionValues = z.infer<typeof courseSectionSchema>

export const courseSchema = z
  .object({
    title: z.string().max(120, 'Keep titles under 120 characters.'),
    slug: z
      .string()
      .regex(/^[a-z0-9-]*$/, 'Use lowercase letters, numbers and hyphens only.'),
    categoryId: z.string().optional(),
    segment: z.enum(['courses', 'internship-training', 'after-12th-courses']),
    tagline: z.string().max(300).optional(),
    eyebrow: z.string().max(80, 'Keep the label short.'),
    badge: z.string().max(24, 'A badge is a word, not a sentence.'),
    h1: z.string().max(200, 'Keep the heading under 200 characters.'),
    intro: z.string().max(2000, 'Keep the hero paragraph under 2000 characters.'),
    ctaPrimary: ctaFormSchema,
    ctaSecondary: ctaFormSchema,
    facts: z.array(factFormSchema),
    plans: z.array(planForm),
    faqIds: z.array(z.string()),
    reviewIds: z.array(z.string()),
    relatedIds: z.array(z.string()),
    syllabusIntro: z.string(),
    syllabusNote: z.string().max(300),
    audience: z.array(audienceForm),
    audienceIntro: z.string(),
    benefits: z.array(benefitForm),
    careerRoles: z.array(careerRoleForm),
    projects: z.array(projectForm),
    workflow: z.array(pointForm),
    whyPoints: z.array(pointForm),
    whyIntro: z.string(),
    comparisonRows: z.array(comparisonRowForm),
    comparisonIntro: z.string(),
    comparisonOthers: z.string().max(80),
    comparisonNote: z.string().max(300),
    toolItems: z.array(toolItemForm),
    demand: z.string().optional(),
    careers: z.array(z.string()),
    tools: z.array(z.string()),
    salary: z.string().max(120).optional(),
    shortDescription: z.string().max(200, 'Keep this under 200 characters.'),
    description: z.string(),
    duration: z.string().max(80, 'Keep the duration short.'),
    // '' means "not stated". A course nobody has graded should say nothing on
    // its page rather than claim a level, so the facts strip keeps the
    // segment's generic wording until someone decides.
    level: z.union([z.enum(['beginner', 'intermediate', 'advanced']), z.literal('')]),
    mode: z.union([z.enum(['online', 'offline', 'hybrid']), z.literal('')]),
    thumbnail: mediaRefSchema.nullish(),
    /* Optional media on three sections — stored the way `thumbnail` is. */
    whyImage: mediaRefSchema.nullish(),
    whyVideoUrl: z.string().max(500),
    syllabusImage: mediaRefSchema.nullish(),
    syllabusVideoUrl: z.string().max(500),
    learningImage: mediaRefSchema.nullish(),
    learningVideoUrl: z.string().max(500),
    highlightsImage: mediaRefSchema.nullish(),
    highlightsVideoUrl: z.string().max(500),
    caseImage: mediaRefSchema.nullish(),
    caseVideoUrl: z.string().max(500),
    certImage: mediaRefSchema.nullish(),
    certProjectImage: mediaRefSchema.nullish(),
    certVideoUrl: z.string().max(500),
    careerImage: mediaRefSchema.nullish(),
    careerVideoUrl: z.string().max(500),
    reviewsImage: mediaRefSchema.nullish(),
    reviewsVideoUrl: z.string().max(500),
    syllabus: z.array(syllabusModuleSchema),
    highlights: z.array(z.string()),
    eligibility: z.string().optional(),
    certification: z.string().optional(),
    /** Overrides the generated overview. One paragraph per line. */
    overview: z.string().optional(),
    videoUrl: z.string().max(500).optional(),
    videoTitle: z.string().max(200).optional(),
    hiddenSections: z.array(z.string()),
    sectionOrder: z.array(z.string()),
    sections: z.array(courseSectionSchema),
    featured: z.boolean(),
    seo: seoSchema,
    status: z.enum(['published', 'draft', 'review', 'scheduled']),
    /** Local date-time from the form; sent as ISO. */
    scheduledFor: z.string(),
  })

export type CourseFormValues = z.infer<typeof courseSchema>

export function emptyCourse(): CourseFormValues {
  return {
    title: '',
    slug: '',
    categoryId: undefined,
    segment: 'courses',
    tagline: '',
    eyebrow: '',
    badge: '',
    h1: '',
    intro: '',
    ctaPrimary: { text: '', type: 'enquiry', url: '' },
    ctaSecondary: { text: '', type: 'contact', url: '' },
    facts: [],
    plans: [],
    faqIds: [],
    reviewIds: [],
    relatedIds: [],
    syllabusIntro: '',
    syllabusNote: '',
    audience: [],
    audienceIntro: '',
    benefits: [],
    careerRoles: [],
    projects: [],
    workflow: [],
    whyPoints: [],
    whyIntro: '',
    comparisonRows: [],
    comparisonIntro: '',
    comparisonOthers: '',
    comparisonNote: '',
    toolItems: [],
    demand: '',
    careers: [],
    tools: [],
    salary: '',
    shortDescription: '',
    description: '',
    duration: '',
    level: '',
    mode: '',
    thumbnail: undefined,
    whyImage: undefined,
    whyVideoUrl: '',
    syllabusImage: undefined,
    syllabusVideoUrl: '',
    learningImage: undefined,
    learningVideoUrl: '',
    highlightsImage: undefined,
    highlightsVideoUrl: '',
    caseImage: undefined,
    caseVideoUrl: '',
    certImage: undefined,
    certProjectImage: undefined,
    certVideoUrl: '',
    careerImage: undefined,
    careerVideoUrl: '',
    reviewsImage: undefined,
    reviewsVideoUrl: '',
    syllabus: [],
    highlights: [],
    eligibility: '',
    certification: '',
    overview: '',
    videoUrl: '',
    videoTitle: '',
    hiddenSections: [],
    sectionOrder: [],
    sections: [],
    featured: false,
    seo: {
      keywords: [],
      ogTitle: '',
      ogDescription: '',
      twitterTitle: '',
      twitterDescription: '',
      robotsIndex: true,
      inSitemap: true,
      faqSchema: true,
    },
    status: 'draft',
    scheduledFor: '',
  }
}

export const LEVEL_OPTIONS = [
  { value: '', label: 'Not stated' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

export const MODE_OPTIONS = [
  { value: '', label: 'Not stated' },
  { value: 'offline', label: 'Offline' },
  { value: 'online', label: 'Online' },
  { value: 'hybrid', label: 'Hybrid' },
]

export const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'In Review' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'published', label: 'Published' },
]
