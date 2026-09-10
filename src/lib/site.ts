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
  /**
   * Stable React key, unique within its column — used instead of the array
   * index so reordering a menu does not re-key every item after the change.
   */
  id?: string;
  /** Course slug this item points at. `href` is derived from it, not typed twice. */
  slug?: string;
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
  /** Gradient used for the card's image area when there is no photograph. */
  art?: string;
  /**
   * Drop a file in `public/about/` and register it here to use a real photo.
   * Listed explicitly rather than guessed from the title, so a photo that has
   * not been added yet can never render as a broken image — the same convention
   * `public/courses/README.md` sets out for course photography.
   */
  photo?: { src: string; alt: string };
};

/**
 * Which layout the dropdown uses:
 *  list    — narrow anchored column of plain links (Branches)
 *  columns — wide panel of numbered columns with headings (Courses, After 12th)
 *  cards   — wide grid of icon cards (Certificate Programs)
 *  feature — link rail beside picture cards (About)
 *  ai      — dark panel with icon columns, a featured card and a CTA card
 *  mega    — link rail beside free-tool cards (Resources)
 */
export type NavPanel = "list" | "columns" | "cards" | "feature" | "ai" | "mega";

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

/**
 * One After 12th menu item.
 *
 * `href` is derived from `slug` so the path is written once — change the prefix
 * here and all three columns follow. `/after-12th/<slug>` is a permanent
 * redirect to `/courses/after12th/<slug>` (see `next.config.ts`), so these
 * resolve for every slug that has a page.
 *
 * A slug is the course's own where that course has a page, and the kebab-cased
 * item name where it does not — those are reserved for pages not yet written.
 */
const after12 = (id: string, label: string, slug: string): NavChild => ({
  id,
  label,
  slug,
  href: `/after-12th/${slug}`,
});

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },

  {
    label: "About",
    href: "/about",
    panel: "feature",
    // The rail lists every About page; the cards highlight a subset of them,
    // so the two lists are deliberately allowed to differ in length.
    links: [
      { label: "About techcadd", href: "/about" },
      { label: "Mission and Vision", href: "/about/mission-vision" },
      { label: "Accreditations & Awards", href: "/about/accreditations" },
      { label: "Founder", href: "/about/founder" },
    ],
    features: [
      {
        title: "About techcadd",
        href: "/about",
        kicker: "Story",
        caption: "Since 2016",
        photo: {
          src: "/gallery/certification-ceremony.png",
          alt: "Students receiving their certificates at a techcadd ceremony",
        },
        art: "from-hero-800 via-hero-600 to-hero-glow",
      },
      {
        title: "Mission and Vision",
        href: "/about/mission-vision",
        kicker: "Purpose",
        caption: "Our direction",
        photo: {
          src: "/gallery/workshop-seminars-01.png",
          alt: "A techcadd workshop session in progress",
        },
        art: "from-hero-900 via-brand-700 to-accent-500",
      },
      {
        title: "Accreditations",
        href: "/about/accreditations",
        kicker: "Proof",
        caption: "ISO certified",
        art: "from-hero-800 via-brand-600 to-accent-glow",
      },
      {
        title: "Our Founder",
        href: "/about/founder",
        kicker: "Profile",
        caption: "Gourav Gupta",
        photo: {
          src: "/founder/gouravsir.jpg",
          alt: "Gourav Gupta, founder of techcadd",
        },
        art: "from-brand-900 via-hero-600 to-accent-400",
      },
    ],
    foot: {
      text: "Fifteen years of training, four hundred and fifty hiring partners, one method.",
      label: "Talk to a counsellor",
      href: "/contact",
    },
  },

  { label: "Founder", href: "/about/founder" },

  {
    label: "AI",
    href: "/courses/ai/artificial-intelligence",
    pill: true,
    panel: "ai",
    lead: {
      title: "Learn AI Skills.",
      blurb:
        "Build projects with machine learning, data science, automation and generative AI.",
    },
    columns: [
      // Four and five. The panel is a shortlist, not the catalogue — the
      // machine-learning, data and BI tracks that used to sit here are all
      // reachable from the AI category page the "All AI courses" link ends on.
      {
        heading: "AI Fundamentals",
        icon: "sparkles",
        items: [
          { label: "Generative AI", href: "/courses/ai/generative-ai" },
          { label: "Artificial Intelligence (AI)", href: "/courses/ai/artificial-intelligence" },
          { label: "Prompt Engineering", href: "/courses/ai/prompt-engineering" },
          { label: "ChatGPT & AI Tools", href: "/courses/ai/chatgpt-ai-tools", badge: "Hot" },
        ],
      },
      {
        heading: "AI Development",
        icon: "rocket",
        items: [
          { label: "Agentic AI", href: "/courses/ai/agentic-ai", badge: "New" },
          { label: "AI-Powered Marketing", href: "/courses/ai/ai-powered-marketing", badge: "Trending" },
          { label: "RAG (Retrieval-Augmented Generation)", href: "/courses/ai/rag" },
          { label: "AI-Powered Courses", href: "/courses/ai/ai-powered-courses" },
          { label: "All AI courses in Mohali", href: "/courses/ai/all-ai-courses" },
        ],
      },
    ],
    features: [
      {
        title: "Artificial Intelligence Training in Mohali",
        href: "/courses/ai/artificial-intelligence",
        kicker: "Featured AI course",
        art: "from-hero-800 via-hero-600 to-accent-glow",
      },
    ],
    promo: {
      text: "Start with AI fundamentals, then move into real projects and career-ready tools.",
      label: "Explore AI",
      href: "/courses/ai/artificial-intelligence",
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
          { label: "Python Programming", href: "/courses/course/python-programming" },
          { label: "Java Programming", href: "/courses/course/java-programming" },
          { label: "C, C++ & Data Structures", href: "/courses/course/cpp-dsa" },
          { label: "Web Designing", href: "/courses/course/web-designing" },
          { label: "WordPress", href: "/courses/course/wordpress" },
          { label: "Shopify", href: "/courses/course/shopify" },
          { label: "Kotlin", href: "/courses/course/kotlin" },
          { label: "Flutter", href: "/courses/course/flutter" },
          { label: "Web Development", href: "/courses/course/web-development" },
          { label: "Full Stack Development", href: "/courses/course/full-stack-development" },
          { label: "MERN Full Stack", href: "/courses/course/mern-full-stack", badge: "Hot" },
          { label: "MEAN Stack", href: "/courses/course/mean-stack" },
          { label: "PHP Full Stack", href: "/courses/course/php-full-stack" },
        ],
      },
      {
        heading: "AI & Data",
        blurb: "Models, analytics and decision intelligence",
        items: [
          { label: "Artificial Intelligence", href: "/courses/course/artificial-intelligence" },
          { label: "Generative AI", href: "/courses/course/generative-ai", badge: "New" },
          { label: "Machine Learning", href: "/courses/course/machine-learning" },
          { label: "Deep Learning", href: "/courses/course/deep-learning" },
          { label: "Data Science", href: "/courses/course/data-science" },
          { label: "Data Analytics", href: "/courses/course/data-analytics" },
          { label: "Power BI", href: "/courses/course/power-bi" },
          { label: "Tableau", href: "/courses/course/tableau" },
        ],
      },
      {
        heading: "Marketing & Design",
        blurb: "Growth, performance and drafting",
        items: [
          { label: "Digital Marketing", href: "/courses/course/digital-marketing", badge: "Trending" },
          { label: "Social Media Marketing", href: "/courses/course/social-media-marketing" },
          { label: "Google Ads", href: "/courses/course/google-ads" },
          { label: "SEO", href: "/courses/course/seo" },
          { label: "AutoCAD", href: "/courses/course/autocad" },
          { label: "SolidWorks", href: "/courses/course/solidworks" },
        ],
      },
      {
        heading: "Cyber & Cloud",
        blurb: "Secure, resilient infrastructure",
        items: [
          { label: "Cyber Security", href: "/courses/course/cyber-security" },
          { label: "Ethical Hacking", href: "/courses/course/ethical-hacking" },
          { label: "Cloud Computing", href: "/courses/course/cloud-computing" },
          { label: "Linux", href: "/courses/course/linux" },
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
      { label: "Cloud Computing", href: "/courses/certificate-programs/cloud-computing", icon: "cloud" },
      { label: "MERN Full Stack", href: "/courses/certificate-programs/mern-full-stack", icon: "code" },
      { label: "Artificial Intelligence", href: "/courses/certificate-programs/artificial-intelligence", icon: "sparkles", badge: "Hot" },
      { label: "Generative AI", href: "/courses/certificate-programs/generative-ai", icon: "rocket", badge: "New" },
      { label: "Digital Marketing", href: "/courses/certificate-programs/digital-marketing", icon: "megaphone", badge: "Trending" },
      { label: "Data Analytics", href: "/courses/certificate-programs/data-analytics", icon: "chart" },
      { label: "Data Science", href: "/courses/certificate-programs/data-science", icon: "layers" },
      { label: "Cyber Security", href: "/courses/certificate-programs/cyber-security", icon: "shield" },
      { label: "Python Programming", href: "/courses/certificate-programs/python-programming", icon: "terminal" },
      { label: "Web Designing", href: "/courses/certificate-programs/web-designing", icon: "monitor" },
      { label: "Ethical Hacking", href: "/courses/certificate-programs/ethical-hacking", icon: "target" },
      { label: "AutoCAD & SolidWorks", href: "/courses/certificate-programs/autocad", icon: "cube" },
      {
        label: "Basic Computer & Office Skills",
        href: "/courses/certificate-programs/basic-computer-office-skills",
        icon: "monitor",
      },
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
          after12("a12-3m-cloud", "Cloud Computing Program", "cloud-computing"),
          after12("a12-3m-flutter", "Flutter App Development Program", "flutter"),
          after12("a12-3m-mern", "MERN Stack Program", "mern-full-stack"),
          after12("a12-3m-agentic", "Agentic AI Program", "agentic-ai"),
          after12("a12-3m-dm3", "Digital Marketing Program (3 Months)", "digital-marketing"),
          after12(
            "a12-3m-dm4",
            "Digital Marketing Program (4 Months)",
            "digital-marketing-program-4-months",
          ),
          after12("a12-3m-analytics", "Data Analytics Program", "data-analytics"),
          after12("a12-3m-datascience", "Data Science Program", "data-science"),
          after12("a12-3m-cyber", "Cyber Security Program", "cyber-security"),
          after12("a12-3m-ai", "Artificial Intelligence Program", "artificial-intelligence"),
          after12("a12-3m-fullstack", "Full Stack Development Program", "full-stack-development"),
        ],
      },
      {
        heading: "After 12th 6-Month Program",
        blurb: "Half a year, finishing with a portfolio",
        items: [
          after12(
            "a12-6m-cloud",
            "Cloud Computing Certificate Program",
            "cloud-computing-certificate-program",
          ),
          after12(
            "a12-6m-flutter",
            "Flutter App Development Diploma Certificate Program",
            "flutter-app-development-diploma-certificate-program",
          ),
          after12("a12-6m-mern", "MERN Stack Certificate Program", "mern-stack-certificate-program"),
          after12("a12-6m-agentic", "Agentic AI Certificate Program", "agentic-ai-certificate-program"),
          after12(
            "a12-6m-dm",
            "Digital Marketing Certificate Program",
            "digital-marketing-certificate-program",
          ),
          after12(
            "a12-6m-analytics",
            "Data Analytics Certificate Program",
            "data-analytics-certificate-program",
          ),
          after12(
            "a12-6m-datascience",
            "Data Science Certificate Program",
            "data-science-certificate-program",
          ),
          after12(
            "a12-6m-cyber",
            "Cyber Security Certificate Program",
            "cyber-security-certificate-program",
          ),
          after12(
            "a12-6m-ai",
            "Artificial Intelligence Certificate Program",
            "artificial-intelligence-certificate-program",
          ),
          after12(
            "a12-6m-fullstack",
            "Full Stack Development Certificate Program",
            "full-stack-development-certificate-program",
          ),
        ],
      },
      {
        heading: "After 12th 9-Month Program",
        blurb: "The longest track, with placement preparation",
        items: [
          after12("a12-9m-cloud", "Cloud Computing Diploma Program", "cloud-computing-diploma"),
          after12(
            "a12-9m-flutter",
            "Flutter App Development Diploma Program",
            "flutter-app-development-diploma-program",
          ),
          after12("a12-9m-mern", "MERN Stack Diploma Program", "mern-stack-diploma-program"),
          after12("a12-9m-agentic", "Agentic AI Diploma Program", "agentic-ai-diploma-program"),
          after12(
            "a12-9m-dm",
            "Digital Marketing Diploma Program",
            "digital-marketing-diploma-program",
          ),
          after12(
            "a12-9m-cyber",
            "Cyber Security Diploma Program",
            "cyber-security-diploma-program",
          ),
          after12(
            "a12-9m-ai",
            "Artificial Intelligence Diploma Program",
            "artificial-intelligence-diploma-program",
          ),
          after12(
            "a12-9m-fullstack",
            "Full Stack Development Diploma Program",
            "full-stack-development-diploma-program",
          ),
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
    panel: "mega",
    links: [
      { label: "Find My Career Track", href: "/tools/career-track", badge: "New" },
      { label: "Training Matcher", href: "/tools/training-matcher", badge: "New" },
      { label: "Salary Estimator", href: "/tools/salary-estimator", badge: "New" },
      { label: "Blogs", href: "/blog" },
      { label: "Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
      { label: "FAQ", href: "/faq" },
      { label: "Reviews", href: "/reviews" },
      { label: "College Partnerships", href: "/college-partnerships" },
      // Everything the office publishes from the CMS, in one place.
      { label: "Pages", href: "/pages" },
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
