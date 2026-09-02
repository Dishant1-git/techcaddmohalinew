export const site = {
  name: "techcadd",
  city: "Mohali",
  legalName: "techcadd Computer Education",
  tagline: "Your Skill & Technology Partner",
  description:
    "techcadd Mohali is a leading IT training institute in Mohali & Chandigarh offering job-oriented courses in AI, full-stack development, data science, cyber security, digital marketing and CAD — with live projects and 100% placement assistance.",
  url: "https://www.techcaddmohali.com",
  phone: "+91 98881 22255",
  phoneHref: "tel:+919888122255",
  whatsapp: "+91 98881 22442",
  whatsappHref: "https://wa.me/919888122442",
  email: "info@techcadd.com",
  emailHref: "mailto:info@techcadd.com",
  address: {
    line1: "Plot No. F-547, 3rd Floor, Industrial Area 8A",
    line2: "Sector 75, Sahibzada Ajit Singh Nagar (Mohali)",
    line3: "Punjab 160055",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Plot+F-547+Industrial+Area+8A+Sector+75+Mohali+Punjab+160055",
  hours: "Mon – Sat, 9 AM – 7 PM",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "WhatsApp", href: "https://wa.me/919888122442" },
  ],
} as const;

export const stats = [
  { value: 12450, suffix: "+", label: "Students trained" },
  { value: 450, suffix: "+", label: "Hiring partners" },
  { value: 98, suffix: "%", label: "Placement success" },
  { value: 15, suffix: "+", label: "Years of excellence" },
];

/* -------------------------------------------------------------------------- *
 *                                 NAVIGATION                                  *
 * -------------------------------------------------------------------------- */

/** Colour treatment for the little pills beside a link. */
export type NavBadge = "New" | "Hot" | "Trending";

export type NavChild = {
  label: string;
  href: string;
  badge?: NavBadge;
  /** Explainer line — used by the `list` panel and the mobile drawer. */
  desc?: string;
  /** Icon name for the `cards` panel. */
  icon?: string;
  /** Opens in a new tab — the other branch websites. */
  external?: boolean;
};

export type NavGroup = {
  heading: string;
  /** Sub-line under the column heading in a `columns` panel. */
  blurb?: string;
  /** Icon chip beside the heading in the `ai` panel. */
  icon?: string;
  items: NavChild[];
};

/** A picture-card in the `feature` panel (About) or the `ai` panel. */
export type NavFeature = {
  title: string;
  href: string;
  /** Small uppercase pill on the caption line. */
  kicker?: string;
  /** Muted text beside the kicker. */
  caption?: string;
  /** Gradient used for the card's image area. */
  art?: string;
};

/**
 * Which layout the dropdown uses:
 *  list    — narrow anchored column of plain links (Branches, Resources)
 *  columns — wide panel of numbered columns with headings (Courses, After 12th)
 *  cards   — wide grid of icon cards (Certificate Programs)
 *  feature — link rail beside picture cards (About)
 *  ai      — dark panel with icon columns, a featured card and a CTA card
 */
export type NavPanel = "list" | "columns" | "cards" | "feature" | "ai";

export type NavItem = {
  label: string;
  href: string;
  badge?: NavBadge;
  /** Renders as a filled gradient pill instead of a plain link (the AI item). */
  pill?: boolean;
  panel?: NavPanel;
  /** Column count for `columns` and `cards` panels. */
  cols?: 2 | 3 | 4;
  /** Links for `list` and `feature` panels. */
  links?: NavChild[];
  /** Columns for `columns`, `cards` and `ai` panels. */
  columns?: NavGroup[];
  /** Picture cards on the right of a `feature` panel. */
  features?: NavFeature[];
  /** Headline block at the top-left of the `ai` panel. */
  lead?: { title: string; blurb: string };
  /** The gradient call-to-action card on the right of the `ai` panel. */
  promo?: { text: string; label: string; href: string };
  /** Strip along the bottom of a wide panel. */
  foot?: { text: string; by?: string; label: string; href: string };
  /**
   * Opt out of the "current page" highlight. Set on menus that only borrow
   * another page's URL (Branches points at /contact) so they cannot steal the
   * highlight from the item that page really belongs to.
   */
  neverActive?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },

  {
    label: "About",
    href: "/about",
    panel: "feature",
    links: [
      { label: "About techcadd Mohali", href: "/about" },
      { label: "Why choose us", href: "/about#why" },
      { label: "How we work", href: "/about#values" },
      { label: "The Mohali campus", href: "/about#campus" },
      { label: "Founder", href: "/about#founder" },
    ],
    features: [
      {
        title: "About techcadd Mohali",
        href: "/about",
        kicker: "Story",
        caption: "Since 2016",
        art: "from-hero-800 via-hero-600 to-hero-glow",
      },
      {
        title: "How we work",
        href: "/about#values",
        kicker: "Purpose",
        caption: "Four rules",
        art: "from-hero-900 via-brand-700 to-accent-500",
      },
      {
        title: "Our Founder",
        href: "/about#founder",
        kicker: "Profile",
        caption: "Gourav Gupta",
        art: "from-brand-900 via-hero-600 to-accent-400",
      },
    ],
    foot: {
      text: "Fifteen years of training, four hundred and fifty hiring partners, one method.",
      label: "Talk to a counsellor",
      href: "/contact",
    },
  },

  { label: "Founder", href: "/about#founder" },

  {
    label: "AI",
    href: "/courses/artificial-intelligence",
    pill: true,
    panel: "ai",
    lead: {
      title: "Learn AI Skills.",
      blurb:
        "Build projects with machine learning, data science, automation and generative AI.",
    },
    columns: [
      {
        heading: "AI Fundamentals",
        icon: "sparkles",
        items: [
          { label: "Artificial Intelligence", href: "/courses/artificial-intelligence", badge: "Hot" },
          { label: "Generative AI", href: "/courses/generative-ai", badge: "New" },
          { label: "Machine Learning", href: "/courses/machine-learning" },
          { label: "Python for AI", href: "/courses/python-programming" },
        ],
      },
      {
        heading: "AI Development",
        icon: "rocket",
        items: [
          { label: "Data Science", href: "/courses/data-science" },
          { label: "Data Analytics", href: "/courses/data-analytics" },
          { label: "AI-Powered Marketing", href: "/courses/digital-marketing", badge: "Trending" },
          { label: "AI + Full Stack", href: "/courses/mern-full-stack" },
          { label: "All AI courses in Mohali", href: "/courses" },
        ],
      },
    ],
    features: [
      {
        title: "Artificial Intelligence Training in Mohali",
        href: "/courses/artificial-intelligence",
        kicker: "Featured AI course",
        art: "from-hero-800 via-hero-600 to-accent-glow",
      },
    ],
    promo: {
      text: "Start with AI fundamentals, then move into real projects and career-ready tools.",
      label: "Explore AI",
      href: "/courses/artificial-intelligence",
    },
  },

  {
    label: "Courses",
    href: "/courses",
    panel: "columns",
    cols: 4,
    columns: [
      {
        heading: "Programming",
        blurb: "Core languages and full-stack engineering",
        items: [
          { label: "Python Programming", href: "/courses/python-programming" },
          { label: "Java Programming", href: "/courses/java-programming" },
          { label: "C, C++ & Data Structures", href: "/courses/cpp-dsa" },
          { label: "Web Designing", href: "/courses/web-designing" },
          { label: "MERN Full Stack", href: "/courses/mern-full-stack", badge: "Hot" },
        ],
      },
      {
        heading: "AI & Data",
        blurb: "Models, analytics and decision intelligence",
        items: [
          { label: "Artificial Intelligence", href: "/courses/artificial-intelligence" },
          { label: "Generative AI", href: "/courses/generative-ai", badge: "New" },
          { label: "Machine Learning", href: "/courses/machine-learning" },
          { label: "Data Science", href: "/courses/data-science" },
          { label: "Data Analytics", href: "/courses/data-analytics" },
        ],
      },
      {
        heading: "Marketing & Design",
        blurb: "Growth, performance and drafting",
        items: [
          { label: "Digital Marketing", href: "/courses/digital-marketing", badge: "Trending" },
          { label: "AutoCAD", href: "/courses/autocad" },
          { label: "SolidWorks", href: "/courses/solidworks" },
        ],
      },
      {
        heading: "Cyber & Cloud",
        blurb: "Secure, resilient infrastructure",
        items: [
          { label: "Cyber Security", href: "/courses/cyber-security" },
          { label: "Ethical Hacking", href: "/courses/ethical-hacking" },
          { label: "Cloud Computing & DevOps", href: "/courses/cloud-computing" },
        ],
      },
    ],
    foot: {
      text: "Everybody should learn to program a computer, because it teaches you how to think.",
      by: "Steve Jobs",
      label: "Browse all courses",
      href: "/courses",
    },
  },

  {
    label: "Certificate Programs",
    href: "/training",
    panel: "cards",
    cols: 4,
    links: [
      { label: "Cloud Computing", href: "/courses/cloud-computing", icon: "cloud" },
      { label: "MERN Full Stack", href: "/courses/mern-full-stack", icon: "code" },
      { label: "Artificial Intelligence", href: "/courses/artificial-intelligence", icon: "sparkles", badge: "Hot" },
      { label: "Generative AI", href: "/courses/generative-ai", icon: "rocket", badge: "New" },
      { label: "Digital Marketing", href: "/courses/digital-marketing", icon: "megaphone", badge: "Trending" },
      { label: "Data Analytics", href: "/courses/data-analytics", icon: "chart" },
      { label: "Data Science", href: "/courses/data-science", icon: "layers" },
      { label: "Cyber Security", href: "/courses/cyber-security", icon: "shield" },
      { label: "Python Programming", href: "/courses/python-programming", icon: "terminal" },
      { label: "Web Designing", href: "/courses/web-designing", icon: "monitor" },
      { label: "Ethical Hacking", href: "/courses/ethical-hacking", icon: "target" },
      { label: "AutoCAD & SolidWorks", href: "/courses/autocad", icon: "cube" },
    ],
    foot: {
      text: "Every programme ends with a certificate, a project report and an internship letter.",
      label: "See all training formats",
      href: "/training#durations",
    },
  },

  {
    label: "After 12th",
    href: "/courses",
    panel: "columns",
    cols: 3,
    columns: [
      {
        heading: "After 12th 3-Month Program",
        blurb: "One subject, one term, one live project",
        items: [
          { label: "Web Designing Program", href: "/courses/web-designing" },
          { label: "Python Programming Program", href: "/courses/python-programming" },
          { label: "Generative AI Program", href: "/courses/generative-ai" },
          { label: "Digital Marketing Program", href: "/courses/digital-marketing" },
          { label: "AutoCAD Program", href: "/courses/autocad" },
          { label: "Data Analytics Program", href: "/courses/data-analytics" },
        ],
      },
      {
        heading: "After 12th 6-Month Program",
        blurb: "Half a year, finishing with a portfolio",
        items: [
          { label: "Artificial Intelligence Certificate", href: "/courses/artificial-intelligence" },
          { label: "MERN Full Stack Certificate", href: "/courses/mern-full-stack" },
          { label: "Data Science Certificate", href: "/courses/data-science" },
          { label: "Cyber Security Certificate", href: "/courses/cyber-security" },
          { label: "Cloud Computing Certificate", href: "/courses/cloud-computing" },
          { label: "Machine Learning Certificate", href: "/courses/machine-learning" },
        ],
      },
      {
        heading: "After 12th 9-Month Program",
        blurb: "The longest track, with placement preparation",
        items: [
          { label: "AI + Full Stack Diploma", href: "/training#durations" },
          { label: "Data Science Diploma", href: "/training#durations" },
          { label: "Cyber Security Diploma", href: "/training#durations" },
          { label: "Digital Marketing Diploma", href: "/training#durations" },
          { label: "Two specialisations & a mentor", href: "/training#durations" },
        ],
      },
    ],
    foot: {
      text: "Not sure where to start? A counsellor maps your stream and marks to a track in ten minutes.",
      label: "Browse After 12th courses",
      href: "/courses",
    },
  },

  {
    label: "Resources",
    href: "/courses",
    panel: "list",
    links: [
      { label: "Course catalogue", href: "/courses", desc: "All 16 tracks with syllabus and duration" },
      { label: "Industrial training", href: "/training", desc: "45 days to 9 months" },
      { label: "Placement record", href: "/placements", desc: "Roles, recruiters and outcomes" },
      { label: "Student FAQs", href: "/courses#faqs", desc: "Fees, batches, EMI and certificates" },
      { label: "Talk to a counsellor", href: "/contact", desc: "Free 10-minute career mapping call" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of use", href: "/terms" },
    ],
  },

  {
    label: "Branches",
    href: "/contact",
    panel: "list",
    neverActive: true,
    links: [
      { label: "Mohali", href: "/", desc: "Sector 75 — this centre" },
      { label: "Jalandhar", href: "/branches/jalandhar", desc: "Head office & flagship campus" },
      { label: "Ludhiana", href: "/branches/ludhiana" },
      { label: "Phagwara", href: "/branches/phagwara" },
      { label: "Maqsudan", href: "/branches/maqsudan" },
      { label: "Hoshiarpur", href: "/branches/hoshiarpur" },
      { label: "Amritsar", href: "/branches/amritsar" },
    ],
  },

  { label: "Contact", href: "/contact" },
];
