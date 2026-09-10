import type { CourseOverride } from "@/lib/content/overrides";
import type { ProgrammeTrack } from "@/lib/certificateTracks";
import type { WrittenCertificateHero, WrittenHeading } from "@/lib/content/mernCertificate";

/**
 * The Certificate Programs menu's Data Science page, at
 * `/courses/certificate-programs/data-science`.
 *
 * The same catalogue course the Courses, AI and After 12th menus list, written
 * to a different brief: a Mohali-first brief built around the gap between how
 * much data the IT Park and BPO corridor collects and how few people can read
 * it, with three named tracks, a phase-based syllabus and a documented
 * internship letter alongside the certificate.
 *
 * Everything below is that supplied copy, reproduced as written and split by
 * the section it belongs to — the same arrangement as
 * `@/lib/content/mernCertificate`, and it renders through the same written
 * certificate page. Where the brief writes nothing for a slot the design has
 * (the hero's particulars row, each track's contents, the closing buttons),
 * the entry is built from the brief's own facts rather than invented: the
 * phases supply the track contents, the learning-modes section supplies the
 * mode particular, the certification section supplies the rest.
 *
 * This brief argues its "why this institute" case in prose only — it has no
 * comparison table — so `comparison` is omitted and that section renders the
 * four differences alone. See `@/lib/certificateWritten`.
 *
 * Types are imported with `import type` on purpose: `@/lib/certificateTracks`
 * imports the tracks below, so a value import here would close the cycle.
 */

/* -------------------------------------------------------------------------- *
 *                                    Hero                                     *
 * -------------------------------------------------------------------------- */

/** The brief's headline, opening paragraph, "What you get" list and two CTAs. */
export const dataScienceCertificateHero: WrittenCertificateHero = {
  title: "Data Science Training in Mohali — Turn Raw Data Into Decisions Companies Actually Use",
  lead: "Mohali has grown into one of North India's busiest IT and BPO corridors, and that growth has created a real shortage: companies collecting more data than they know what to do with, and very few people trained to make sense of it. This programme is built to close exactly that gap — not with slide decks, but with live project work, experienced trainers, and a certification plus internship letter you can put in front of a hiring manager.",
  primaryCta: "Book a Free Demo Class",
  secondaryCta: "Talk to a Course Advisor",
  points: [
    "Hands-on training on live/real-world data, not recorded demos",
    "Trainers who work in the industry, not full-time lecturers reading from a manual",
    "Placement support: resume building, mock interviews, and hiring drives",
    "A recognised certificate plus a documented internship letter",
  ],
  // The brief writes no particulars row. These four are its own facts, one
  // from each of the sections that states them — the learning modes, the live
  // client brief, and the two documents in "Certification & Internship".
  highlights: [
    { icon: "monitor", label: "Mode", value: "Classroom & 1-on-1" },
    { icon: "rocket", label: "Project", value: "Live Client Work" },
    { icon: "certificate", label: "Certificate", value: "Industry Recognised" },
    { icon: "briefcase", label: "Includes", value: "Internship Letter" },
  ],
};

/* -------------------------------------------------------------------------- *
 *                            The catalogue record                             *
 * -------------------------------------------------------------------------- */

/** The catalogue record as this menu states it. */
export const dataScienceCertificateOverride: CourseOverride = {
  contentKey: "data-science--certificate",
  // Three named tracks at 3, 6 and 9 months, not the catalogue's flat 6.
  duration: "3 – 9 Months",
  blurb:
    "Turn raw data into decisions companies actually use — Python, SQL, statistics, machine learning and dashboards, taught through live project work in Mohali's IT and BPO corridor.",
  overview:
    "This Data Science training in Mohali takes you from Python and SQL fundamentals through data cleaning with Pandas, statistics and hypothesis testing, machine learning, and finally dashboarding and stakeholder storytelling with Power BI and Tableau. Every stage of the course closes with something you actually built — not a quiz, a deliverable you can show. By the end, you'll have a portfolio of real work and a documented internship on your record.",
  // "What You'll Actually Build" — the three phases the brief names, in place
  // of a generic module list. The four projects are their own section and stay
  // there rather than being folded in here.
  modules: [
    {
      title: "Phase 1 — Foundations",
      blurb: "Where the course starts, at zero.",
      points: [
        "Python and SQL for data work",
        "Data cleaning and wrangling in Pandas",
        "Exploratory data analysis and visualisation",
      ],
    },
    {
      title: "Phase 2 — Core Analytics",
      blurb: "The reasoning under the numbers, and the models built on it.",
      points: [
        "Statistics, sampling, and hypothesis testing",
        "Machine learning models from data prep to evaluation",
      ],
    },
    {
      title: "Phase 3 — Delivery",
      blurb: "What turns an analysis into a decision somebody acts on.",
      points: [
        "Dashboards in Power BI and Tableau",
        "Stakeholder storytelling",
        "Live client work leading into your internship letter and placement preparation",
      ],
    },
  ],
  tools: [
    "Python",
    "SQL",
    "Pandas",
    "scikit-learn",
    "Power BI",
    "Tableau",
    "Jupyter Notebook",
    "Excel",
  ],
  outcomes: [
    "Work with data in Python and SQL, cleaning and wrangling it in Pandas",
    "Run exploratory analysis, sampling and hypothesis testing, and say what the numbers support",
    "Build and evaluate machine learning models from data prep through to evaluation",
    "Deliver findings as Power BI and Tableau dashboards a stakeholder can act on",
  ],
  roles: ["Data Analyst", "Data Scientist", "Business Analyst", "Analytics Engineer"],
};

/* -------------------------------------------------------------------------- *
 *                              Section headings                               *
 * -------------------------------------------------------------------------- */

/** The brief's own section titles, in page order. */
export const dataScienceCertificateHeadings: Record<string, WrittenHeading> = {
  tracks: {
    index: "—",
    eyebrow: "Programme lengths",
    title: "Choose Your Data Science Track in Mohali",
    intro:
      "One subject, three depths — pick based on how much time you can commit, and step up later without repeating what you've already learned.",
  },
  overview: { index: "01", eyebrow: "Programme brief", title: "Course Overview" },
  modules: {
    index: "02",
    eyebrow: "Syllabus of record",
    title: "What You'll Actually Build",
    intro:
      "Rather than a generic list of “modules,” here's how your time is actually spent:",
  },
  learn: {
    index: "03",
    eyebrow: "Competencies certified",
    title: "What you learn in this programme",
    intro:
      "Every competency below is taught hands-on and assessed before the certificate is issued.",
  },
  why: {
    index: "04",
    eyebrow: "Standing",
    title: "Why This Course Is Worth Your Time in Mohali",
  },
  who: {
    index: "05",
    eyebrow: "Eligibility & admission",
    title: "Who Should Join This Course?",
    intro:
      "Mohali's student and professional base is diverse — from IT Park employees to fresh graduates from nearby colleges — and this course is designed to meet each of them where they are.",
  },
  tools: {
    index: "06",
    eyebrow: "Instruments & software",
    title: "Tools You'll Work With",
    intro:
      "Every tool below is used on real project work during the course, not shown once and forgotten:",
  },
  certification: {
    index: "07",
    eyebrow: "The award",
    title: "Certification & Internship",
  },
  scope: { index: "08", eyebrow: "Future scope", title: "Where This Course Can Take You" },
  projects: { index: "09", eyebrow: "Deliverables", title: "Hands-On Projects You Will Ship" },
  institute: {
    index: "10",
    eyebrow: "The comparison",
    title: "Why Choose This Institute in Mohali",
    intro:
      "Mohali has no shortage of institutes offering a “Data Science course,” and most syllabi look similar on paper. What actually differs is who's teaching, whether you touch real data, and whether anyone follows up after you've enrolled.",
  },
  modes: {
    index: "11",
    eyebrow: "How it is taught",
    title: "Learning Modes Available in Mohali",
  },
  reviews: {
    index: "12",
    eyebrow: "Alumni record",
    title: "What holders of this certificate say",
    intro: "Graduates of this programme, on what made the difference once they were in interviews.",
  },
  faqs: { index: "13", eyebrow: "Notes & conditions", title: "Frequently Asked Questions" },
};

/** The rail entries for this page, in DOM order. */
export const dataScienceCertificateSections = [
  { id: "overview", label: "Overview" },
  { id: "modules", label: "What you build" },
  { id: "learn", label: "What you learn" },
  { id: "why", label: "Worth your time" },
  { id: "who", label: "Who should join" },
  { id: "tools", label: "Tools" },
  { id: "certification", label: "Certification" },
  { id: "scope", label: "Future scope" },
  { id: "projects", label: "Projects" },
  { id: "institute", label: "Why us" },
  { id: "modes", label: "Learning modes" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
  { id: "enquire", label: "Enquire" },
];

/* -------------------------------------------------------------------------- *
 *                   "Choose Your Data Science Track in Mohali"                *
 * -------------------------------------------------------------------------- */

/**
 * The three lengths as this brief names them — Foundation, Certificate,
 * Diploma — with the "Best for" line it writes for each as the blurb.
 *
 * The contents of each track are the brief's own phases, assigned in order, so
 * a longer track opens on what it inherits rather than repeating it: you can
 * step up later without repeating what you have already learned.
 */
export const dataScienceCertificateTracks: ProgrammeTrack[] = [
  {
    key: "certificate",
    months: "3 Months",
    title: "Foundation Program",
    blurb: "Quick, focused entry into core data skills.",
    award: "Industry-recognised certificate",
    includes: [
      "Python and SQL for data work",
      "Data cleaning and wrangling in Pandas",
      "Exploratory data analysis and visualisation",
      "Weekday, evening or weekend batch",
    ],
    stats: [
      { label: "Projects", value: "1" },
      { label: "Phase", value: "1 of 3" },
    ],
  },
  {
    key: "internship",
    months: "6 Months",
    tag: "Most chosen",
    title: "Certificate Program",
    blurb: "A full, job-ready skill set with live projects.",
    award: "Certificate + documented internship letter",
    includes: [
      "Everything in the Foundation track",
      "Statistics, sampling, and hypothesis testing",
      "Machine learning from data prep to evaluation",
      "Live client brief under trainer supervision",
    ],
    stats: [
      { label: "Projects", value: "3" },
      { label: "Tools", value: "8" },
    ],
  },
  {
    key: "expert",
    months: "9 Months",
    title: "Diploma Program",
    blurb: "Deep specialisation for those aiming at senior analyst/scientist roles.",
    award: "Diploma + documented internship letter",
    includes: [
      "Everything in the Certificate track",
      "Dashboards in Power BI and Tableau",
      "Stakeholder storytelling and live client work",
      "A self-directed portfolio capstone",
    ],
    stats: [
      { label: "Projects", value: "4" },
      { label: "Capstone", value: "Yes" },
    ],
  },
];

/* -------------------------------------------------------------------------- *
 *              "Why This Course Is Worth Your Time in Mohali"                 *
 * -------------------------------------------------------------------------- */

/** The brief's four arguments, as written. */
export const dataScienceCertificateWhyChoose = [
  {
    icon: "pin",
    title: "Local Demand",
    body: "Mohali's IT parks, BPOs, and a growing base of startups all generate data faster than they can interpret it. That imbalance is the opportunity this course prepares you for.",
  },
  {
    icon: "terminal",
    title: "Learning by Doing",
    body: "From the midpoint of the course onward, you work on live briefs under trainer supervision — making real decisions, getting them corrected, and improving the following week. That feedback loop, not theory, is what builds genuine skill.",
  },
  {
    icon: "chart",
    title: "Realistic Earning Expectations",
    body: "A fresher who completes the course with a working portfolio can typically expect an entry-level salary in the same broad range seen across Tricity (Mohali–Chandigarh–Panchkula), with steady growth as experience builds. Roles commonly include Data Analyst, Data Scientist, Business Analyst, and Analytics Engineer. No course guarantees a number — the portfolio you build during training is what actually gets you there.",
  },
  {
    icon: "target",
    title: "The Alternative Is Expensive Too",
    body: "Free videos and unstructured online courses often leave learners with knowledge they can't demonstrate. A structured programme with live projects, a mentor, and an active placement cell is the difference between understanding a subject and being hired to apply it.",
  },
];

/* -------------------------------------------------------------------------- *
 *                       "Who Should Join This Course?"                        *
 * -------------------------------------------------------------------------- */

/** The six starting points the brief writes for, in its numbered order. */
export const dataScienceCertificateAudience = [
  {
    icon: "users",
    title: "Students After 12th",
    body: "No prior coding background required. Start from the fundamentals and run the course alongside your degree using weekday, weekend, or evening batches.",
  },
  {
    icon: "certificate",
    title: "Final-Year Students & Graduates",
    body: "If you're finishing a BCA, B.Tech, B.Com, or similar degree, this is the fastest route from campus to a data role — you enter placement season with a project portfolio instead of an empty resume.",
  },
  {
    icon: "briefcase",
    title: "Working Professionals",
    body: "With Mohali's large base of IT and BPO employees, the weekend batch is built specifically for people holding down a job while they reskill. Most career switchers become interview-ready within five to six months.",
  },
  {
    icon: "building",
    title: "Business Owners & Freelancers",
    body: "Stop outsourcing analysis you can't verify yourself, or start billing international clients — remote data work isn't limited by geography.",
  },
  {
    icon: "rocket",
    title: "Career Restarters",
    body: "A break in your career matters less than what you can show afterward. This course starts from zero and ends with a portfolio and internship letter.",
  },
  {
    icon: "monitor",
    title: "Self-Taught Learners",
    body: "If free tutorials left you with notes but nothing built, the missing piece is usually a mentor reviewing your actual output and a deadline attached to every module — which is exactly what this course adds.",
  },
];

/**
 * "Conditions of admission" — who the programme admits.
 *
 * The brief states its admissions rule in the FAQ that asks who can join; this
 * is that answer as a list. The four learning modes are their own section of
 * the brief and are kept there rather than folded in here.
 */
export const dataScienceCertificateEligibility = [
  "Students after 12th, from any stream",
  "Graduates and final-year students",
  "Working professionals reskilling alongside a job",
  "Business owners, freelancers and career restarters",
  "No prior technical background is required — training starts from the fundamentals",
];

/* -------------------------------------------------------------------------- *
 *                        "Certification & Internship"                         *
 * -------------------------------------------------------------------------- */

/** The four things the brief says you finish with. */
export const dataScienceCertificateCertification = [
  {
    icon: "certificate",
    title: "Industry-recognised certificate",
    body: "on course completion",
  },
  {
    icon: "briefcase",
    title: "Documented internship letter",
    body: "based on genuine project work — accepted for industrial training requirements at most Punjab universities",
  },
  {
    icon: "layers",
    title: "Portfolio of live projects",
    body: "you can walk an interviewer through",
  },
  {
    icon: "users",
    title: "Placement support",
    body: "including resume reviews, mock interviews, and hiring drives with employers across the Mohali–Chandigarh region",
  },
];

/* -------------------------------------------------------------------------- *
 *                      "Where This Course Can Take You"                       *
 * -------------------------------------------------------------------------- */

/** The three directions the brief names, each under its own label. */
export const dataScienceCertificateScope = [
  {
    q: "Job roles",
    a: "Data Analyst, Data Scientist, Business Analyst, Analytics Engineer, and adjacent roles across IT, ITES, and analytics-driven businesses in Mohali and the wider Tricity area.",
  },
  {
    q: "Freelance and remote work",
    a: "Data skills travel well — many graduates take on remote or freelance projects for clients well beyond Punjab, since this kind of work isn't location-dependent.",
  },
  {
    q: "Career growth",
    a: "The certificate and portfolio you build here often become the foundation for further specialisation — many students go on to advanced analytics or machine learning tracks once the fundamentals are solid.",
  },
];

/* -------------------------------------------------------------------------- *
 *                     "Hands-On Projects You Will Ship"                       *
 * -------------------------------------------------------------------------- */

/** The four deliverables, each one portfolio-ready. */
export const dataScienceCertificateProjects = [
  {
    label: "Project 1",
    title: "Data Fundamentals Build",
    body: "Apply Python, SQL, and Pandas together on a real dataset, end to end.",
  },
  {
    label: "Project 2",
    title: "Real-World Data Challenge",
    body: "Work through messy, imperfect data using statistics and machine learning, and defend your choices to a trainer.",
  },
  {
    label: "Project 3",
    title: "Live Client Brief",
    body: "A genuine project scoped and delivered under supervision — the one interviewers ask about first.",
  },
  {
    label: "Project 4",
    title: "Portfolio Capstone",
    body: "A self-directed project covering dashboarding and presentation, built to be your strongest interview talking point.",
  },
];

/* -------------------------------------------------------------------------- *
 *                     "Why Choose This Institute in Mohali"                   *
 * -------------------------------------------------------------------------- */

/**
 * The four differences the brief draws, as written.
 *
 * No comparison table here — this brief makes the case in prose only, so the
 * page carries no table rather than one written to fill the slot.
 */
export const dataScienceCertificateInstitute = [
  {
    icon: "users",
    title: "Trainers who still work in the field",
    body: "so what's taught in class reflects current practice, not a five-year-old case study.",
  },
  {
    icon: "layers",
    title: "Small batches",
    body: "enough attention that a trainer actually reviews your work regularly.",
  },
  {
    icon: "terminal",
    title: "Open lab access",
    body: "and continued doubt-clearing outside class hours.",
  },
  {
    icon: "briefcase",
    title: "A placement cell that keeps working",
    body: "mock interviews and hiring drives that continue even after a setback, not a one-time job portal link.",
  },
];

/* -------------------------------------------------------------------------- *
 *                   "Learning Modes Available in Mohali"                      *
 * -------------------------------------------------------------------------- */

/** The four modes, each with the "Best For" line the brief gives it. */
export const dataScienceCertificateModes = [
  {
    icon: "building",
    title: "Classroom Training",
    body: "Learners who want structured, in-person sessions with hands-on lab access.",
  },
  {
    icon: "monitor",
    title: "Online Live Classes",
    body: "Anyone who wants live instruction with flexibility on location.",
  },
  {
    icon: "calendar",
    title: "Weekend Batches",
    body: "Working professionals and students balancing other commitments.",
  },
  {
    icon: "users",
    title: "1-on-1 Personal Training",
    body: "Learners who want a fully custom pace and schedule.",
  },
];

/* -------------------------------------------------------------------------- *
 *                       "Frequently Asked Questions"                          *
 * -------------------------------------------------------------------------- */

/** The brief's eight FAQs, as written. */
export const dataScienceCertificateFaqs = [
  {
    q: "What is the duration of the Data Science course in Mohali?",
    a: "The course is available as a 3-month foundation track, a 6-month certificate track, or a 9-month diploma track, across weekday, evening, and weekend batches — plus 1-on-1 training for a fully custom schedule.",
  },
  {
    q: "What is the fee for the Data Science course in Mohali?",
    a: "Fees vary by track length and format. Shorter foundation courses are generally more affordable, while comprehensive programmes with live projects, internship, and placement support cost more but deliver a complete, job-ready skill set. Contact the admissions team for the current fee structure and any EMI options.",
  },
  {
    q: "Who can join this course?",
    a: "Students after 12th, graduates, working professionals, business owners, and career restarters all join this course — no prior technical background is required, since training starts from the fundamentals.",
  },
  {
    q: "What jobs can I get after completing this course?",
    a: "Common outcomes include Data Analyst, Data Scientist, Business Analyst, and Analytics Engineer roles across Mohali's IT and analytics sector.",
  },
  {
    q: "Is placement guaranteed?",
    a: "No genuine training provider can guarantee a job. What's provided is placement support — resume reviews, mock interviews, portfolio preparation, and ongoing hiring drives with partner companies.",
  },
  {
    q: "Which tools will I learn?",
    a: "Python, SQL, Pandas, scikit-learn, Power BI, and Tableau, all used hands-on across live project work.",
  },
  {
    q: "Will I receive a certificate and internship letter?",
    a: "Yes — an industry-recognised certificate on completion, along with a documented internship letter based on genuine project work.",
  },
  {
    q: "Are weekend and evening batches available in Mohali?",
    a: "Yes, weekday, evening, and weekend batches all run in parallel, along with 1-on-1 training for a fully personalised schedule.",
  },
];

/* -------------------------------------------------------------------------- *
 *            "Ready to Start Your Data Science Career in Mohali?"             *
 * -------------------------------------------------------------------------- */

/**
 * The closing call, after the enquiry form.
 *
 * The brief names no buttons here, so it reuses the two the hero opens with —
 * the same call, at the other end of the page.
 */
export const dataScienceCertificateClosing = {
  title: "Ready to Start Your Data Science Career in Mohali?",
  body: "A single conversation with a course advisor is usually enough to know if this is the right fit. Book a free demo class, see the training setup, and meet a trainer before you decide.",
  primaryCta: "Book a Free Demo Class",
  secondaryCta: "Talk to a Course Advisor",
};
