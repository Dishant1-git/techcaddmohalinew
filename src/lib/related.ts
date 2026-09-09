import { blogPosts, type BlogCategory, type BlogPost } from "@/lib/blog";
import { categoryLabel, type CategoryKey, type Course } from "@/lib/courses";

/**
 * The internal link graph.
 *
 * Every page in the site already links *down* — the catalogue to its courses,
 * the blog index to its posts — and the dynamic routes already link sideways to
 * their own siblings ("Students also consider", "More on Career Advice", "Other
 * techcadd centres"). What none of them did was link *across*: a course page
 * never reached the blog post written about it, a tool never reached the
 * catalogue it feeds, and the standalone pages — FAQ, gallery, events, reviews
 * — were dead ends that only the navbar and footer pointed into.
 *
 * This module is that missing layer. Destinations are declared once in `DEST`
 * so a page's description is written in one place and stays consistent wherever
 * it is linked from, and `RELATED` maps each route to the handful of
 * destinations worth offering from it.
 *
 * Two rules the map follows:
 *
 *  1. Only canonical URLs. `/founder`, `/mission-vision` and
 *     `/accreditations-awards` duplicate the `/about/*` pages, and the navbar
 *     and footer both point at `/about/*`. Linking to both halves of a pair
 *     splits the ranking signal between them, so nothing here links to a flat
 *     route.
 *
 *  2. No repeats of a link the page already makes in its body. Several pages
 *     carry a hand-placed cross-link already (`/about/mission-vision` offers
 *     the accreditations, `/about/founder` offers the institute story); the
 *     sets below deliberately reach elsewhere rather than restate those.
 */

export type RelatedLink = {
  label: string;
  href: string;
  blurb: string;
  icon: string;
  cta: string;
};

/** Blurbs are trimmed from each page's own meta description, so a link never
 *  promises something the destination does not open with. */
export const DEST = {
  courses: {
    label: "All courses",
    href: "/courses",
    blurb:
      "Sixteen job-oriented tracks — AI, full stack, data, cyber security, cloud, digital marketing and CAD, each with live projects and placement support.",
    icon: "layers",
    cta: "Browse the catalogue",
  },
  training: {
    label: "Industrial training",
    href: "/training",
    blurb:
      "45 days, 6 weeks, 6 months and 9 months, aligned to university requirements and closed with an internship letter.",
    icon: "certificate",
    cta: "See the tracks",
  },
  placements: {
    label: "Placements & career support",
    href: "/placements",
    blurb:
      "Resume building, mock interviews, aptitude and DSA practice, and hiring drives with 450+ partner companies.",
    icon: "briefcase",
    cta: "See how placement works",
  },
  about: {
    label: "About the institute",
    href: "/about",
    blurb:
      "Fifteen years of training in Mohali and Chandigarh, working-engineer trainers, live projects and a placement cell behind them.",
    icon: "building",
    cta: "Read the story",
  },
  mission: {
    label: "Mission & vision",
    href: "/about/mission-vision",
    blurb:
      "The two statements that decide everything else — what gets taught, how large a batch gets, and when a student counts as finished.",
    icon: "target",
    cta: "What we are aiming at",
  },
  accreditations: {
    label: "Accreditations & awards",
    href: "/about/accreditations",
    blurb:
      "ISO-certified training, documented internship letters, university-compliant programmes and the recognitions behind them.",
    icon: "verified",
    cta: "See the paperwork",
  },
  founder: {
    label: "Our founder",
    href: "/about/founder",
    blurb:
      "Mr. Gourav Gupta started techcadd in 2016 on one principle: a student should leave with work an employer can open and inspect.",
    icon: "users",
    cta: "Meet the founder",
  },
  contact: {
    label: "Visit or book a demo",
    href: "/contact",
    blurb:
      "The Sector 75 campus, batch timings, fees and EMI options — or a free demo class before you commit to anything.",
    icon: "pin",
    cta: "Get directions",
  },
  faq: {
    label: "Questions & answers",
    href: "/faq",
    blurb:
      "Straight answers on admissions, batches, fees, certification and placement, organised by track so you can find yours fast.",
    icon: "checkCircle",
    cta: "Read the FAQs",
  },
  gallery: {
    label: "Life at techcadd",
    href: "/gallery",
    blurb:
      "Inside the classrooms, labs and live projects — seminars, workshops, placement drives and the everyday work of training.",
    icon: "monitor",
    cta: "See the campus",
  },
  events: {
    label: "Events & workshops",
    href: "/events",
    blurb:
      "Seminars and hands-on sessions at our campus and at colleges across Punjab — most of them free, all taught by our own trainers.",
    icon: "calendar",
    cta: "See what is on",
  },
  reviews: {
    label: "Student reviews",
    href: "/reviews",
    blurb:
      "Google reviews from techcadd students on the trainers, the live projects and the placement support, across every track.",
    icon: "star",
    cta: "Read the reviews",
  },
  blog: {
    label: "Guides & career advice",
    href: "/blog",
    blurb:
      "Course guides, hiring trends and career advice from the trainers and the placement team — what employers actually ask for.",
    icon: "megaphone",
    cta: "Read the blog",
  },
  colleges: {
    label: "College partnerships",
    href: "/college-partnerships",
    blurb:
      "Workshops, mandated industrial training, faculty development and joint placement drives, run on your department's timetable.",
    icon: "globe",
    cta: "Partner with us",
  },
  careerTrack: {
    label: "Find my career track",
    href: "/tools/career-track",
    blurb:
      "Four questions, then a matching course and a 90-day roadmap — development, AI, cyber, marketing, CAD or core programming.",
    icon: "target",
    cta: "Take the quiz",
  },
  trainingMatcher: {
    label: "Training matcher",
    href: "/tools/training-matcher",
    blurb:
      "Pick your university, branch and semester to find the approved industrial training track and check live seat availability.",
    icon: "search",
    cta: "Match my semester",
  },
  salary: {
    label: "Salary estimator",
    href: "/tools/salary-estimator",
    blurb:
      "Fresher and two-year salary ranges by role across Punjab, Delhi NCR and remote work — and where graduates actually get hired.",
    icon: "chart",
    cta: "Check the ranges",
  },
} satisfies Record<string, RelatedLink>;

/** A filtered view of the catalogue. `/courses` reads `?category` and seeds the
 *  explorer's tab from it, so these land on a pre-filtered grid. */
export function categoryHub(key: CategoryKey): RelatedLink {
  return {
    label: `${categoryLabel[key]} courses`,
    href: `/courses?category=${key}`,
    blurb: `Every ${categoryLabel[key].toLowerCase()} track in the catalogue, with durations, tools and outcomes side by side.`,
    icon: "layers",
    cta: "See the tracks",
  };
}

/**
 * Blog categories and course categories are two separate vocabularies written
 * for two different readers. This is the join between them, and it is
 * deliberately partial — "Career Advice" and "Placements" are about the
 * institute rather than about a subject, so they have no course to point at.
 */
const BLOG_TO_COURSE: Partial<Record<BlogCategory, CategoryKey>> = {
  "AI & Data": "ai-data",
  "Web Development": "development",
  "Cyber Security": "cyber-cloud",
  "Digital Marketing": "digital-marketing",
  "CAD & Design": "cad-design",
};

const COURSE_TO_BLOG: Partial<Record<CategoryKey, BlogCategory>> = {
  "ai-data": "AI & Data",
  development: "Web Development",
  "cyber-cloud": "Cyber Security",
  "digital-marketing": "Digital Marketing",
  "cad-design": "CAD & Design",
};

function postLink(post: BlogPost): RelatedLink {
  return {
    label: post.title,
    href: `/blog/${post.slug}`,
    blurb: post.excerpt,
    icon: "megaphone",
    cta: `${post.readTime} · read`,
  };
}

/**
 * A course page's cross-links: the writing we have published on its subject,
 * then the two routes a reader who is still deciding actually needs — how the
 * same subject is taken as industrial training, and how placement works after.
 * The blog post is dropped in only when one exists for the subject, so a course
 * with no coverage yet offers the quiz instead of an empty slot.
 */
export function relatedForCourse(course: Course): RelatedLink[] {
  const blogCategory = COURSE_TO_BLOG[course.category];
  const post = blogCategory
    ? blogPosts.find((p) => p.category === blogCategory)
    : undefined;

  return [
    post ? postLink(post) : DEST.careerTrack,
    DEST.training,
    DEST.placements,
  ];
}

/**
 * A post's cross-links point at the thing it is really about. Subject posts
 * reach the matching slice of the catalogue; the institute-facing categories
 * ("Career Advice", "Placements") have no single subject, so they reach the
 * quiz that works one out instead.
 */
export function relatedForPost(post: BlogPost): RelatedLink[] {
  // Keyed by the built-in headings; a category created in the CMS is not one
  // of them and simply has no subject hub to point at.
  const courseCategory = BLOG_TO_COURSE[post.category as BlogCategory];

  return [
    courseCategory ? categoryHub(courseCategory) : DEST.careerTrack,
    post.category === "Placements" ? DEST.salary : DEST.placements,
    DEST.courses,
  ];
}

/** Branch pages already list the other centres; what they lack is a route into
 *  what is actually taught at one. */
export function relatedForBranch(): RelatedLink[] {
  return [DEST.courses, DEST.training, DEST.contact];
}

/** Route → the destinations worth offering from it. Keys are pathnames. */
export const RELATED: Record<string, RelatedLink[]> = {
  "/about": [DEST.accreditations, DEST.reviews, DEST.gallery],
  "/about/mission-vision": [DEST.about, DEST.founder, DEST.training],
  "/about/accreditations": [DEST.about, DEST.mission, DEST.placements],
  "/about/founder": [DEST.mission, DEST.accreditations, DEST.colleges],

  "/courses": [DEST.careerTrack, DEST.training, DEST.faq],
  "/training": [DEST.trainingMatcher, DEST.colleges, DEST.placements],
  "/placements": [DEST.reviews, DEST.salary, DEST.courses],

  "/faq": [DEST.contact, DEST.courses, DEST.training],
  "/gallery": [DEST.events, DEST.reviews, DEST.about],
  "/events": [DEST.gallery, DEST.colleges, DEST.blog],
  "/reviews": [DEST.placements, DEST.gallery, DEST.courses],
  "/blog": [DEST.courses, DEST.careerTrack, DEST.faq],
  "/college-partnerships": [DEST.training, DEST.events, DEST.contact],
  "/contact": [DEST.faq, DEST.courses, DEST.gallery],

  "/tools/career-track": [DEST.courses, DEST.trainingMatcher, DEST.salary],
  "/tools/training-matcher": [DEST.training, DEST.careerTrack, DEST.colleges],
  "/tools/salary-estimator": [DEST.placements, DEST.careerTrack, DEST.courses],
};
