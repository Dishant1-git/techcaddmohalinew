/**
 * Content for the vision & mission section on `/about`.
 *
 * The collage carries no photography yet. Each tile falls back to artwork built
 * from a palette gradient, the same treatment `CourseVisual` uses, so the panel
 * looks finished rather than empty. Paths are listed explicitly rather than
 * guessed, so a photo that has not been added can never render broken —
 * see `public/courses/README.md` for the same convention on course pages.
 */

export type CollageTile = {
  key: string;
  label: string;
  icon: string;
  /** Placement in the collage box, as percentages. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Tailwind gradient stops used when there is no photograph. */
  art: string;
  /** Drop a file in `public/about/` and register it here to use a real photo. */
  photo?: { src: string; alt: string };
};

export const collage: CollageTile[] = [
  {
    key: "campus",
    label: "Sector 75 campus",
    icon: "pin",
    x: 24,
    y: 0,
    w: 54,
    h: 74,
    art: "from-hero-800 via-hero-600 to-accent-glow",
  },
  {
    key: "projects",
    label: "Live projects",
    icon: "code",
    x: 0,
    y: 16,
    w: 26,
    h: 22,
    art: "from-hero-900 to-hero-600",
  },
  {
    key: "mentoring",
    label: "Small batches",
    icon: "users",
    x: 2,
    y: 56,
    w: 28,
    h: 24,
    art: "from-brand-700 to-accent-500",
  },
  {
    key: "placements",
    label: "Hiring drives",
    icon: "briefcase",
    x: 80,
    y: 10,
    w: 18,
    h: 16,
    art: "from-hero-600 to-accent-glow",
  },
  {
    key: "certified",
    label: "ISO certified",
    icon: "certificate",
    x: 62,
    y: 76,
    w: 30,
    h: 22,
    art: "from-hero-950 to-hero-800",
  },
];

export const founder = {
  name: "Mr. Gourav Gupta",
  initials: "GG",
  role: "Founder & CEO, techcadd",
  quote: "The future belongs to learners who continuously adapt, innovate and build.",
  bio: "He started techcadd in 2016 to give young people in Punjab technology skills and the confidence to use them. The method has not changed since that first classroom: practising engineers as trainers, project work instead of slide decks, and a curriculum rewritten whenever the industry moves — which is how AI, cloud and cyber security joined the syllabus.",
  principles: [
    { title: "Practitioner-led", body: "Every trainer still builds for a living." },
    { title: "Industry-aligned", body: "Curriculum reviewed against live hiring briefs." },
    {
      title: "Career-integrated",
      body: "Placement support is part of the course, not an add-on.",
    },
  ],
};

/**
 * Accreditations and recognitions.
 *
 * Only claims the site already makes elsewhere (ISO-certified training, the
 * certificate and internship letter every course ends with). Anything with a
 * registration number, an awarding body or a year belongs here too — but those
 * have to come from the institute's own records rather than be written for it,
 * so this list stays at what can be stated honestly today.
 */
export const credentials = [
  {
    icon: "certificate",
    title: "ISO-certified training",
    body: "Programmes are delivered under an ISO-certified quality process, and every completion certificate is issued against it.",
  },
  {
    icon: "briefcase",
    title: "Internship letters",
    body: "The six- and nine-month tracks issue a documented internship letter covering the live project work you did, not just attendance.",
  },
  {
    icon: "building",
    title: "University-compliant training",
    body: "Six-week and summer programmes come with the syllabus mapping, attendance record and project report colleges ask for.",
  },
  {
    icon: "users",
    title: "450+ hiring partners",
    body: "A placement network across Mohali, Chandigarh and Panchkula that runs drives through the year, not once a season.",
  },
  {
    icon: "star",
    title: "4.9 on Google",
    body: "Rated 4.9 out of 5 across 556+ verified reviews on our Google Business Profile.",
  },
  {
    icon: "shield",
    title: "Practising-engineer faculty",
    body: "Every trainer works in the field they teach, and the curriculum is reviewed each quarter against live job descriptions.",
  },
];

export const pillars = [
  {
    eyebrow: "Where we are going",
    title: "Our Vision",
    body: "To be the centre Punjab's employers name first — where someone can walk in without a line of code to their name and walk out an engineer a company is glad to have hired. Not a certificate mill; a place a career actually starts.",
  },
  {
    eyebrow: "What we do daily",
    title: "Our Mission",
    body: "To teach what the industry genuinely runs on, in batches small enough that a trainer notices when you are stuck, on projects with real requirements and real deadlines — and to stay with every student until the offer letter arrives.",
  },
];
