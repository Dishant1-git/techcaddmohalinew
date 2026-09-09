/**
 * The shapes the CMS's public API actually returns.
 *
 * Hand-written rather than generated: the CMS lives in `cms-techcadd/` with
 * its own module graph and its own build, so nothing can import its types
 * across the boundary. These mirror the repositories in
 * `cms-techcadd/backend/src/modules/*\/*.repo.ts`.
 *
 * Everything an editor can leave blank is optional here, because the API
 * genuinely omits it — and the mappers in `content.ts` are written to expect
 * that rather than to trust it.
 */

export type CmsMedia = {
  id: string;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type CmsCategory = {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  accentColor?: string;
  description?: string;
  order: number;
};

export type CmsSyllabusModule = {
  id?: string;
  title: string;
  topics: string[];
  hours?: number;
  body?: string;
  outcomes: string[];
  tools: string[];
  project?: string;
};

export type CmsCourseTool = {
  name: string;
  category?: string;
  body?: string;
  url?: string;
};

export type CmsCareerRole = {
  role: string;
  body?: string;
  salaryStart?: string;
  salarySenior?: string;
};

export type CmsCourse = {
  id: string;
  title: string;
  slug: string;
  segment: "courses" | "internship-training" | "after-12th-courses";
  categoryId?: string;
  categoryName?: string;
  categorySlug?: string;
  shortDescription: string;
  description: string;
  tagline?: string;
  overview?: string;
  intro?: string;
  duration?: string;
  level?: string;
  badge?: string;
  featured: boolean;
  tools: string[];
  careers: string[];
  highlights: string[];
  syllabus: CmsSyllabusModule[];
  toolItems: CmsCourseTool[];
  careerRoles: CmsCareerRole[];
  thumbnail?: CmsMedia;
  status: string;
};

export type CmsBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  categoryId?: string;
  categoryName?: string;
  coverImage?: CmsMedia;
  publishDate?: string;
  tags?: { id: string; name: string; slug: string }[];
  createdAt?: string;
};

export type CmsEventAgendaItem = {
  id: string;
  timeLabel?: string;
  title: string;
  detail?: string;
  order: number;
};

export type CmsEventSpeaker = {
  id: string;
  name: string;
  role?: string;
  org?: string;
  bio?: string;
  photo?: CmsMedia;
  order: number;
};

export type CmsEventImage = {
  id: string;
  media: CmsMedia;
  caption?: string;
  order: number;
};

export type CmsEventHighlight = {
  id: string;
  text: string;
  order: number;
};

export type CmsEvent = {
  id: string;
  title: string;
  slug: string;
  eventType: string;
  mode?: string;
  summary: string;
  body?: string;
  coverImage?: CmsMedia;
  startsOn: string;
  endsOn?: string;
  startTime?: string;
  endTime?: string;
  venueName?: string;
  venueAddress?: string;
  city?: string;
  mapUrl?: string;
  hostName?: string;
  registrationUrl?: string;
  seats?: number;
  featured?: boolean;
  tags?: string[];
  highlights?: CmsEventHighlight[];
  agenda?: CmsEventAgendaItem[];
  speakers?: CmsEventSpeaker[];
  images?: CmsEventImage[];
};

export type CmsGalleryImage = {
  id: string;
  url?: string;
  alt?: string;
  caption?: string;
  linkUrl?: string;
  order?: number;
  media?: CmsMedia;
};

export type CmsGalleryAlbum = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  /** When the photographs were taken, as the CMS records it. */
  eventDate?: string;
  cover?: CmsMedia;
  images: CmsGalleryImage[];
};

export type CmsReview = {
  id: string;
  authorName: string;
  rating: number;
  quote: string;
  courseName?: string;
  source: string;
  googleUrl?: string;
  order: number;
};

export type CmsTestimonial = {
  id: string;
  studentName: string;
  photo?: CmsMedia;
  batch?: string;
  rating: number;
  quote: string;
  /** A YouTube or Vimeo link, in whatever shape the editor pasted. */
  videoUrl?: string;
  googleReviewUrl?: string;
  featured: boolean;
};

export type CmsFaq = {
  id: string;
  question: string;
  answer: string;
  categoryId?: string;
  category?: string;
  order: number;
  featured: boolean;
};

export type CmsFaqCategoryNode = {
  id: string;
  name: string;
  slug: string;
  faqs?: CmsFaq[];
  children?: CmsFaqCategoryNode[];
};

export type CmsSite = {
  siteName: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  stats: { value: string; label: string }[];
  social: Record<string, string>;
};
