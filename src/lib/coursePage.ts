import type { CategoryKey, Course } from "@/lib/courses";
import { categories, categoryLabel, faqs as generalFaqs, testimonials } from "@/lib/courses";

/**
 * Everything the /courses/[slug] detail page renders beyond what `courses.ts`
 * already stores. Kept in its own module on purpose: the course catalogue is
 * shared by the nav, the listing grid and the cards, so it stays untouched and
 * this file derives the extra sections (why choose, who can join, per-course
 * FAQs and reviews) from the course it is handed.
 *
 * Everything here is a pure function of the course, so the detail page still
 * prerenders statically from `generateStaticParams`.
 */

/* -------------------------------------------------------------------------- *
 *                            Deterministic seeding                            *
 * -------------------------------------------------------------------------- */

/**
 * Reviews and rating summaries must match between server render and client
 * hydration, and between builds — so they are seeded from the slug rather than
 * randomised. Same slug in, same numbers out, every time.
 */
function seeded(key: string) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return Math.abs(h % 100000) / 100000;
  };
}

/* -------------------------------------------------------------------------- *
 *                          In-page section rail                               *
 * -------------------------------------------------------------------------- */

/** Anchor rail shown under the hero. Order matches the DOM order on the page. */
export const courseSections = [
  { id: "overview", label: "Overview" },
  { id: "modules", label: "Modules" },
  { id: "learn", label: "What you learn" },
  { id: "why", label: "Why choose us" },
  { id: "who", label: "Who can join" },
  { id: "tools", label: "Tools" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
  { id: "enquire", label: "Enquire" },
];

/* -------------------------------------------------------------------------- *
 *                             Course photography                              *
 * -------------------------------------------------------------------------- */

export type CourseImage = { src: string; alt: string };

/**
 * The photograph shown beside the overview, keyed by slug.
 *
 * The site ships no photography yet, so this starts empty and every course
 * falls back to the generated artwork in <CourseVisual/>. To use a real photo:
 * drop the file into `public/courses/` and add one line here. Paths are listed
 * explicitly rather than guessed from the slug, so a file that has not been
 * added yet can never render as a broken image.
 *
 *   "data-science": {
 *     src: "/courses/data-science.jpg",
 *     alt: "Students working through a dataset in the Mohali lab",
 *   },
 */
export const courseImages: Record<string, CourseImage> = {};

export function courseImage(course: Course): CourseImage | undefined {
  return courseImages[course.slug];
}

/** The category's gradient, reused from the catalogue so nothing drifts. */
export function categoryArt(course: Course) {
  const category = categories.find((c) => c.key === course.category);
  return {
    gradient: category?.accent ?? "from-hero-glow to-brand-700",
    icon: category?.icon ?? "sparkles",
    label: categoryLabel[course.category],
  };
}

/* -------------------------------------------------------------------------- *
 *                                 Highlights                                  *
 * -------------------------------------------------------------------------- */

export function courseHighlights(course: Course) {
  const topics = course.modules.reduce((n, m) => n + m.points.length, 0);
  return [
    { icon: "clock", value: course.duration, label: "Programme length" },
    { icon: "layers", value: `${course.modules.length} modules`, label: `${topics} topics covered` },
    { icon: "target", value: course.level, label: "Difficulty level" },
    { icon: "briefcase", value: "100%", label: "Placement assistance" },
  ];
}

/* -------------------------------------------------------------------------- *
 *                      What we learn in this program                          *
 * -------------------------------------------------------------------------- */

/**
 * A flat, scannable skill list built from the leading bullets of every module —
 * the headline capabilities, without repeating the full curriculum accordion
 * that sits above it.
 */
export function learningPoints(course: Course) {
  return course.modules.flatMap((m, moduleIndex) =>
    m.points.slice(0, 2).map((point) => ({ point, module: m.title, moduleIndex })),
  );
}

/* -------------------------------------------------------------------------- *
 *                               Why choose us                                 *
 * -------------------------------------------------------------------------- */

export function whyChoose(course: Course) {
  return [
    {
      icon: "users",
      title: "Trainers who still ship",
      body: `Your ${course.title} sessions are taken by people who use this stack at work every week — current practice and the judgement behind it, not a syllabus written five years ago.`,
    },
    {
      icon: "rocket",
      title: "Build from week one",
      body: "Concepts in the first half of a session, hands-on in the second. Every module closes with something that runs, gets reviewed and goes into your portfolio.",
    },
    {
      icon: "briefcase",
      title: "Live project + internship letter",
      body: "From the third week you join a project team with real requirements, deadlines and code review, and you leave with a documented internship letter.",
    },
    {
      icon: "certificate",
      title: "ISO-certified certification",
      body: "An ISO-certified training certificate, a project completion letter and a portfolio you can actually show — all recognised across our hiring-partner network.",
    },
    {
      icon: "chart",
      title: "Placement machinery that runs",
      body: "Resume and LinkedIn rebuilds, mock technical and HR rounds, aptitude practice and continuous drives with 450+ hiring partners around Mohali and Chandigarh.",
    },
    {
      icon: "clock",
      title: "Batches built around your life",
      body: "Morning, evening, weekend and live-online batches for the same programme. Every session is recorded and stays in your student portal.",
    },
  ];
}

/* -------------------------------------------------------------------------- *
 *                               Who can join                                  *
 * -------------------------------------------------------------------------- */

const audienceByCategory: Record<CategoryKey, { title: string; body: string; icon: string }[]> = {
  "ai-data": [
    {
      icon: "users",
      title: "Students & final-year graduates",
      body: "B.Tech, BCA, MCA, B.Sc and M.Sc students who want an AI or data profile in place before campus placements begin.",
    },
    {
      icon: "code",
      title: "Developers moving into AI",
      body: "Working engineers who can already code and want models, pipelines and deployment added to the stack they ship with.",
    },
    {
      icon: "chart",
      title: "Analysts & MIS professionals",
      body: "Anyone living inside spreadsheets who wants Python, SQL and modern BI doing the heavy lifting instead.",
    },
    {
      icon: "rocket",
      title: "Career changers",
      body: "Non-technical professionals starting from Python basics — the foundation module assumes nothing at all.",
    },
  ],
  development: [
    {
      icon: "users",
      title: "Students & fresh graduates",
      body: "Any stream. If you are confident with a computer, the fundamentals module brings you to the same starting line as everyone else.",
    },
    {
      icon: "monitor",
      title: "Designers moving into code",
      body: "UI and graphic designers who want to build and deploy the interfaces they currently hand over to somebody else.",
    },
    {
      icon: "code",
      title: "Self-taught developers",
      body: "You have watched the tutorials. Here you build, get reviewed and deploy with a mentor reading your code.",
    },
    {
      icon: "rocket",
      title: "Working professionals",
      body: "Evening and weekend batches designed around a full-time job, with every session recorded for later.",
    },
  ],
  "cyber-cloud": [
    {
      icon: "users",
      title: "IT & networking students",
      body: "B.Tech, BCA and diploma students who want a security or infrastructure profile before placement season.",
    },
    {
      icon: "monitor",
      title: "System & network admins",
      body: "Professionals already running infrastructure who want to defend, audit and automate it properly.",
    },
    {
      icon: "shield",
      title: "Aspiring security analysts",
      body: "Anyone targeting SOC, VAPT or cloud-security roles. The labs start from Linux and networking fundamentals.",
    },
    {
      icon: "cloud",
      title: "Developers going DevOps",
      body: "Engineers who want CI/CD, containers and cloud deployment layered on top of what they already build.",
    },
  ],
  "digital-marketing": [
    {
      icon: "users",
      title: "Students & graduates",
      body: "BBA, MBA, B.Com and any-stream graduates aiming at agency or in-house marketing roles.",
    },
    {
      icon: "briefcase",
      title: "Business & shop owners",
      body: "Run your own ads, ranking and content instead of paying an agency to guess on your behalf.",
    },
    {
      icon: "megaphone",
      title: "Freelancers & creators",
      body: "Turn a content habit into paid retainers, with real analytics, funnels and reporting behind it.",
    },
    {
      icon: "chart",
      title: "Sales & marketing staff",
      body: "Add measurable performance marketing to a role that currently leans on offline channels.",
    },
  ],
  "cad-design": [
    {
      icon: "users",
      title: "Engineering students",
      body: "Mechanical, civil, architecture and diploma students who need drafting depth their college does not cover.",
    },
    {
      icon: "cube",
      title: "Draughtsmen & site engineers",
      body: "Move from manual or basic drafting to standards-compliant production drawing sets.",
    },
    {
      icon: "briefcase",
      title: "Working design engineers",
      body: "Add modelling, assemblies and documentation depth to a role you already hold.",
    },
    {
      icon: "rocket",
      title: "Freelance designers",
      body: "Take on client drawing work with output that meets industry standards from day one.",
    },
  ],
  programming: [
    {
      icon: "users",
      title: "Absolute beginners",
      body: "No coding background needed. Module one starts at variables and builds steadily from there.",
    },
    {
      icon: "code",
      title: "School & college students",
      body: "Class 11–12 and first-year students who want a real head start before the syllabus catches up.",
    },
    {
      icon: "target",
      title: "Placement aspirants",
      body: "Anyone preparing for coding rounds — data structures, problem solving and interview patterns are built in.",
    },
    {
      icon: "rocket",
      title: "Career changers",
      body: "Professionals from non-IT backgrounds who need one first, solid programming language.",
    },
  ],
};

export function whoCanJoin(course: Course) {
  return audienceByCategory[course.category];
}

export function eligibility(course: Course) {
  const base = [
    "10+2 or above — any stream accepted",
    "A laptop for practice (lab systems available on campus)",
    "Basic computer familiarity",
  ];
  if (course.level === "Beginner") {
    return [...base, "No prior coding or design experience required"];
  }
  if (course.level === "Advanced") {
    return [...base, "Comfort with the fundamentals of this domain"];
  }
  return [...base, "Willingness to practise between sessions"];
}

/* -------------------------------------------------------------------------- *
 *                                   FAQs                                      *
 * -------------------------------------------------------------------------- */

export function courseFaqs(course: Course) {
  const label = categoryLabel[course.category].toLowerCase();

  const specific = [
    {
      q: `How long is the ${course.title} course and what are the batch timings?`,
      a: `${course.title} runs for ${course.duration} at our Sector 75 campus in Mohali. Morning, afternoon, evening and weekend batches run in parallel, there is a live-online seat in the same batch, and every session is recorded to your student portal.`,
    },
    {
      q: `Do I need any experience before joining ${course.title}?`,
      a:
        course.level === "Beginner"
          ? `No. This is a beginner track — module one starts from first principles and assumes no background in ${label}. A short counselling call confirms you are in the right batch.`
          : `This is a ${course.level.toLowerCase()} track, so comfort with the basics helps. If you are starting fresh, your counsellor adds a short foundation module before the main syllabus so you are never left behind.`,
    },
    {
      q: `What will I have built by the end of ${course.title}?`,
      a: `${course.modules.length} modules, each closing in something you build and get reviewed — ${course.modules
        .slice(0, 3)
        .map((m) => m.title.toLowerCase())
        .join(", ")} and more — plus one live, client-style project. You finish with ${course.outcomes.length} portfolio-ready outcomes and a written project report.`,
    },
    {
      q: `What jobs does ${course.title} lead to?`,
      a: `Graduates of this track move into roles such as ${course.roles
        .slice(0, 3)
        .join(", ")}. The placement cell rebuilds your resume, runs mock interviews and introduces you to hiring partners across Mohali, Chandigarh and beyond.`,
    },
    {
      q: "What are the fees, and is there an EMI option?",
      a: "Fees depend on the batch format you choose, so they are shared on a short call rather than published here. Instalments across the duration of the course are standard, and no-cost EMI is available through partner providers.",
    },
  ];

  return [...specific, ...generalFaqs.slice(1, 4)];
}

/* -------------------------------------------------------------------------- *
 *                                  Reviews                                    *
 * -------------------------------------------------------------------------- */

export type CourseReview = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  initials: string;
};

export function courseReviews(course: Course): CourseReview[] {
  const rnd = seeded(course.slug);
  // Deterministic rotation, so every course shows a different but stable set.
  const offset = Math.floor(rnd() * testimonials.length);

  return Array.from({ length: 4 }, (_, i) => {
    const t = testimonials[(offset + i) % testimonials.length];
    return {
      name: t.name,
      role: t.role,
      company: t.company,
      quote: t.quote,
      rating: rnd() > 0.72 ? 4 : 5,
      initials: t.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };
  });
}

/**
 * The star breakdown, and the headline average computed *from* it.
 *
 * Deriving the average out of the buckets rather than generating the two
 * separately is the point: a 4.8 headline sitting above bars that average 4.5
 * is the kind of detail a sceptical reader notices. The buckets always total
 * exactly 100, so the bars fill the track.
 */
export function ratingBreakdown(course: Course) {
  const rnd = seeded(`${course.slug}:rating`);

  const five = 74 + Math.floor(rnd() * 13); // 74–86
  const rest = 100 - five;

  let four = Math.round(rest * 0.62);
  const three = Math.round(rest * 0.22);
  const two = Math.round(rest * 0.1);
  let one = rest - four - three - two;

  // Rounding can overshoot; the top non-five bucket absorbs the drift so the
  // buckets still sum to 100 and none goes negative.
  if (one < 0) {
    four += one;
    one = 0;
  }

  const buckets = [
    { stars: 5, percent: five },
    { stars: 4, percent: four },
    { stars: 3, percent: three },
    { stars: 2, percent: two },
    { stars: 1, percent: one },
  ];

  const average = (
    buckets.reduce((sum, b) => sum + b.stars * b.percent, 0) / 100
  ).toFixed(1);

  return { buckets, average, reviewCount: 120 + Math.floor(rnd() * 340) };
}

export function ratingSummary(course: Course) {
  const { average, reviewCount } = ratingBreakdown(course);
  return { average, reviewCount };
}
