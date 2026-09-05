export const locations = ["Punjab / Tricity", "Delhi NCR", "Remote / Freelance"] as const;
export type Location = (typeof locations)[number];

/** Applied to the Punjab / Tricity base range to derive the other two markets. */
const LOCATION_MULTIPLIER: Record<Location, { fresher: number; after2: number }> = {
  "Punjab / Tricity": { fresher: 1, after2: 1 },
  "Delhi NCR": { fresher: 1.25, after2: 1.25 },
  "Remote / Freelance": { fresher: 1.05, after2: 1.35 },
};

/** Bar fill is relative to this ceiling — comfortably above the highest role's after-2-years band. */
const SCALE_MAX_LPA = 15;

export type SalaryRole = {
  title: string;
  /** For "Talk through {article} {title} career" — only roles starting with a vowel sound need "an". */
  article: "a" | "an";
  icon: string;
  blurb: string;
  hiredAt: string[];
  courseHref: string;
  courseLabel: string;
  /** [low, high] in LPA, Punjab / Tricity, fresher and after 2 years. */
  fresher: [number, number];
  after2: [number, number];
};

export const salaryRoles: SalaryRole[] = [
  {
    title: "Full-Stack Developer",
    article: "a",
    icon: "code",
    blurb: "Builds and ships complete web applications, front to back.",
    hiredAt: [
      "Product & SaaS startups (Mohali IT Park, Chandigarh)",
      "IT services & staffing companies across Tricity and NCR",
      "Remote-first teams and freelance marketplaces",
      "MNC captive development centres",
    ],
    courseHref: "/courses/mern-full-stack",
    courseLabel: "Explore MERN Stack",
    fresher: [2.4, 4.5],
    after2: [5, 9],
  },
  {
    title: "SEO Specialist",
    article: "an",
    icon: "search",
    blurb: "Ranks websites organically and drives qualified traffic through content and technical SEO.",
    hiredAt: [
      "Digital marketing agencies across Tricity and NCR",
      "E-commerce & D2C brands",
      "SaaS and IT companies' in-house marketing teams",
      "Freelance & consulting for local businesses",
    ],
    courseHref: "/courses/digital-marketing",
    courseLabel: "Explore Digital Marketing",
    fresher: [2.2, 3.6],
    after2: [4, 7],
  },
  {
    title: "Data Analyst",
    article: "a",
    icon: "chart",
    blurb: "Turns raw business data into dashboards and decisions using SQL, Excel and BI tools.",
    hiredAt: [
      "IT & analytics captive units (Mohali, Chandigarh)",
      "BPO / KPO and shared-services centres",
      "E-commerce and fintech companies",
      "Remote analytics teams for global clients",
    ],
    courseHref: "/courses/data-analytics",
    courseLabel: "Explore Data Analytics",
    fresher: [2.6, 4.2],
    after2: [5, 8.5],
  },
  {
    title: "CAD Designer",
    article: "a",
    icon: "cube",
    blurb: "Produces 2D drafts and 3D models for mechanical, civil and architectural projects.",
    hiredAt: [
      "Manufacturing & auto-ancillary units in Punjab",
      "Architecture & interior design studios",
      "Civil & infrastructure consultancies",
      "Freelance drafting for design firms",
    ],
    courseHref: "/courses/autocad",
    courseLabel: "Explore AutoCAD",
    fresher: [2, 3.5],
    after2: [4, 6.5],
  },
  {
    title: "Python Developer",
    article: "a",
    icon: "terminal",
    blurb: "Writes backend services, automation scripts and data pipelines in Python.",
    hiredAt: [
      "Product & SaaS startups",
      "IT services companies across Tricity and NCR",
      "Fintech & automation teams",
      "Remote backend roles for global clients",
    ],
    courseHref: "/courses/python-programming",
    courseLabel: "Explore Python",
    fresher: [2.5, 4.2],
    after2: [5, 8.5],
  },
  {
    title: "Java Developer",
    article: "a",
    icon: "layers",
    blurb: "Builds enterprise backend systems and APIs with Java and Spring Boot.",
    hiredAt: [
      "Enterprise IT & product companies",
      "Banking & fintech captive units",
      "IT services companies across Tricity and NCR",
      "MNC captive development centres",
    ],
    courseHref: "/courses/java-programming",
    courseLabel: "Explore Java",
    fresher: [2.6, 4.4],
    after2: [5.5, 9],
  },
  {
    title: "Digital Marketing Executive",
    article: "a",
    icon: "megaphone",
    blurb: "Runs paid, social and content campaigns end to end and reports on performance.",
    hiredAt: [
      "Digital marketing & ad agencies",
      "D2C and e-commerce brands",
      "IT companies' in-house growth teams",
      "Freelance & client-side consulting",
    ],
    courseHref: "/courses/digital-marketing",
    courseLabel: "Explore Digital Marketing",
    fresher: [2.2, 3.6],
    after2: [4.5, 7.5],
  },
  {
    title: "AI / ML Engineer",
    article: "an",
    icon: "sparkles",
    blurb: "Trains, evaluates and deploys machine learning models into production systems.",
    hiredAt: [
      "AI-first product startups",
      "IT services companies' AI practices",
      "Fintech & healthtech companies",
      "Remote ML roles for global clients",
    ],
    courseHref: "/courses/machine-learning",
    courseLabel: "Explore Machine Learning",
    fresher: [3.5, 6],
    after2: [7, 13],
  },
  {
    title: "Cloud / DevOps Engineer",
    article: "a",
    icon: "cloud",
    blurb: "Deploys, automates and scales infrastructure on AWS and Azure with CI/CD.",
    hiredAt: [
      "SaaS & product companies",
      "IT services & MNC captive units",
      "Fintech & e-commerce platforms",
      "Remote DevOps roles for global teams",
    ],
    courseHref: "/courses/cloud-computing",
    courseLabel: "Explore Cloud & DevOps",
    fresher: [3, 5],
    after2: [6.5, 11],
  },
  {
    title: "Cybersecurity Analyst",
    article: "a",
    icon: "shield",
    blurb: "Monitors, investigates and responds to security threats across networks and systems.",
    hiredAt: [
      "SOC teams at IT services companies",
      "Banking & fintech security desks",
      "MNC captive security operations",
      "Freelance security audits & consulting",
    ],
    courseHref: "/courses/cyber-security",
    courseLabel: "Explore Cyber Security",
    fresher: [2.8, 4.8],
    after2: [5.5, 10],
  },
  {
    title: "Android Developer",
    article: "an",
    icon: "monitor",
    blurb: "Builds and ships native and cross-platform Android applications.",
    hiredAt: [
      "Product & app startups",
      "IT services companies across Tricity and NCR",
      "Consumer app & gaming studios",
      "Freelance app development",
    ],
    courseHref: "/courses?category=development",
    courseLabel: "Explore Development Courses",
    fresher: [2.4, 4],
    after2: [5, 8.5],
  },
  {
    title: "UI/UX & Web Designer",
    article: "a",
    icon: "target",
    blurb: "Designs interfaces and user flows for web and mobile products.",
    hiredAt: [
      "Product & SaaS startups",
      "Design & branding studios",
      "IT services companies' design teams",
      "Freelance & client-side design work",
    ],
    courseHref: "/courses/web-designing",
    courseLabel: "Explore Web Designing",
    fresher: [2.2, 3.8],
    after2: [4.5, 8],
  },
];

const round1 = (n: number) => Math.round(n * 10) / 10;
const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

export function scaledRange(range: [number, number], location: Location, stage: "fresher" | "after2") {
  const m = LOCATION_MULTIPLIER[location][stage];
  const low = round1(range[0] * m);
  const high = round1(range[1] * m);
  return { low, high, label: `₹${fmt(low)}–${fmt(high)} LPA` };
}

export function barPercent(range: [number, number], location: Location, stage: "fresher" | "after2") {
  const { low, high } = scaledRange(range, location, stage);
  const mid = (low + high) / 2;
  return Math.min(100, Math.round((mid / SCALE_MAX_LPA) * 100));
}
