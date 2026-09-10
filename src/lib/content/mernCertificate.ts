import type { CourseOverride } from "@/lib/content/overrides";
import type { ProgrammeTrack } from "@/lib/certificateTracks";

/**
 * The Certificate Programs menu's MERN Stack page, at
 * `/courses/certificate-programs/mern-full-stack`.
 *
 * The same catalogue course the Courses, AI and After 12th menus list, written
 * to a different brief: a Mohali-first, live-client-work brief with three
 * named tracks, a stage-based syllabus and a documented internship letter as
 * the headline credential.
 *
 * Everything below is that supplied copy, reproduced as written and split by
 * the section it belongs to. Nothing is merged into a neighbouring section and
 * nothing is paraphrased — where the brief has copy the credential design had
 * no section for (certification, future scope, projects, the comparison table,
 * learning modes, the closing call), the design gained the section rather than
 * the copy losing its home. Those extra sections render only for a course that
 * has written content here; every other certificate programme keeps the eight
 * numbered sections it always had.
 *
 * It reaches the page through `certificateOverrides` in
 * `@/lib/content/certificatePrograms`, which sets the `contentKey` below on
 * this menu's record only — so the other three menus keep the catalogue copy
 * at their own URLs, and there is still exactly one MERN course at one slug.
 *
 * Types are imported with `import type` on purpose: `@/lib/certificateTracks`
 * imports the tracks below, so a value import here would close the cycle.
 */

/* -------------------------------------------------------------------------- *
 *                                    Hero                                     *
 * -------------------------------------------------------------------------- */

export type WrittenCertificateHero = {
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  points: string[];
  highlights: { icon: string; label: string; value: string }[];
};

/** The brief's own headline, lead, proof points, particulars and two CTAs. */
export const mernCertificateHero: WrittenCertificateHero = {
  title: "Best MERN Stack Training in Mohali",
  lead: "Learn the MongoDB, Express, React and Node stack that Mohali's IT Park companies and Chandigarh Tricity startups build on — taught through live client work, not slide decks.",
  primaryCta: "Book a free demo class",
  secondaryCta: "Talk to a counsellor",
  points: [
    "Live client projects",
    "Practitioner trainers, not full-time lecturers",
    "Placement support across Mohali, Chandigarh & Panchkula",
    "Certificate + documented internship letter",
  ],
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
export const mernCertificateOverride: CourseOverride = {
  contentKey: "mern-full-stack--certificate",
  // Three named tracks at 3, 6 and 9 months, not the catalogue's 4–6.
  duration: "3 – 9 Months",
  blurb:
    "Learn the MongoDB, Express, React and Node stack that Mohali's IT Park companies and Chandigarh Tricity startups build on — taught through live client work, not slide decks.",
  overview:
    "This MERN Stack training in Mohali takes you from JavaScript ES6+ and asynchronous programming to production deployment, environment configuration and CI — built around MongoDB, Express, React and Node.js. You work on live client briefs under trainer supervision from the middle of the course onward, and every stage ends in a portfolio-ready deliverable. You leave with a documented internship letter, not just a certificate.",
  // "What You Will Actually Build" — the syllabus organised by real build
  // stage rather than as a generic module list. The four projects are their
  // own section of the brief and stay there rather than being folded in here.
  modules: [
    {
      title: "Stage 1 — Foundations",
      blurb: "Where the course starts, at zero.",
      points: [
        "JavaScript ES6+ and async patterns",
        "React components, hooks and routing",
        "State management and context",
      ],
    },
    {
      title: "Stage 2 — Backend & Data",
      blurb: "The server side, and the database behind it.",
      points: ["Node.js and Express API design", "MongoDB schemas with Mongoose"],
    },
    {
      title: "Stage 3 — Production",
      blurb: "What separates a working build from a shipped one.",
      points: [
        "File uploads, payments and third-party API integration",
        "Deployment, environment configuration and CI",
      ],
    },
  ],
  tools: ["MongoDB", "Express", "React", "Node.js", "Mongoose", "JWT", "Git", "Vercel"],
  outcomes: [
    "Build React interfaces with components, hooks, routing, state management and context",
    "Design Node.js and Express APIs backed by MongoDB schemas written with Mongoose",
    "Integrate file uploads, payments and third-party APIs into a working application",
    "Deploy to production with environment configuration and CI, and defend the design choices to a trainer",
  ],
  roles: ["MERN Developer", "Full-Stack Developer", "React Developer", "Node.js Developer"],
};

/* -------------------------------------------------------------------------- *
 *                              Section headings                               *
 * -------------------------------------------------------------------------- */

export type WrittenHeading = {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
};

/**
 * The brief's own section titles, in page order.
 *
 * The credential design derives a heading per section; a course written to its
 * own brief states its headings instead, so the page reads as the document it
 * was written as rather than as the template it renders through.
 */
export const mernCertificateHeadings: Record<string, WrittenHeading> = {
  tracks: {
    index: "—",
    eyebrow: "Programme lengths",
    title: "Choose Your MERN Stack Track",
    intro:
      "The same subject, three depths. Every track continues from where the shorter one ends, so choosing a shorter programme costs you scope — not depth — and you can always extend later.",
  },
  overview: { index: "01", eyebrow: "Programme brief", title: "Course Overview" },
  modules: {
    index: "02",
    eyebrow: "Syllabus of record",
    title: "What You Will Actually Build",
    intro: "The syllabus is organised by real build stages, not a generic module list.",
  },
  learn: {
    index: "03",
    eyebrow: "Competencies certified",
    title: "What you learn in this programme",
    intro:
      "Every competency below is taught hands-on and assessed before the certificate is issued.",
  },
  why: { index: "04", eyebrow: "Standing", title: "Why This Programme Is Worth Your Year" },
  who: { index: "05", eyebrow: "Eligibility & admission", title: "Who This Course Is For" },
  tools: {
    index: "06",
    eyebrow: "Instruments & software",
    title: "The Toolchain You'll Actually Use",
    intro:
      "Installed on every lab machine and used on live client work: MongoDB, Express, React, Node.js, Mongoose, JWT, Git, Vercel.",
  },
  certification: {
    index: "07",
    eyebrow: "The award",
    title: "Certification",
    intro: "Finish with a portfolio of live projects and receive:",
  },
  scope: { index: "08", eyebrow: "Future scope", title: "Where This Course Takes You" },
  projects: { index: "09", eyebrow: "Deliverables", title: "Hands-On Projects You Will Ship" },
  institute: {
    index: "10",
    eyebrow: "The comparison",
    title: "Why Students Choose This Institute Over Others in Mohali",
    intro:
      "Every institute in the Tricity region shows a similar syllabus on a brochure. What differs is who actually teaches, whether you touch real client work, and whether anyone answers the phone after you've paid.",
  },
  modes: { index: "11", eyebrow: "How it is taught", title: "Learning Modes" },
  reviews: {
    index: "12",
    eyebrow: "Alumni record",
    title: "What holders of this certificate say",
    intro: "Graduates of this programme, on what made the difference once they were in interviews.",
  },
  faqs: { index: "13", eyebrow: "Notes & conditions", title: "Frequently Asked Questions" },
};

/** The rail entries for this page, in DOM order. */
export const mernCertificateSections = [
  { id: "overview", label: "Overview" },
  { id: "modules", label: "What you build" },
  { id: "learn", label: "What you learn" },
  { id: "why", label: "Worth your year" },
  { id: "who", label: "Who it's for" },
  { id: "tools", label: "Toolchain" },
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
 *                       "Choose Your MERN Stack Track"                        *
 * -------------------------------------------------------------------------- */

/**
 * The three lengths as this brief names them — Foundation, Certificate,
 * Diploma — replacing the generic set every other certificate programme
 * derives. Each track continues from where the shorter one ends, which is why
 * the longer two open on what they inherit rather than repeating it.
 */
export const mernCertificateTracks: ProgrammeTrack[] = [
  {
    key: "certificate",
    months: "3 Months",
    title: "Foundation Program",
    blurb: "Core JavaScript, React and API basics.",
    award: "Industry-recognised certificate",
    includes: [
      "JavaScript ES6+ and async patterns",
      "React components, hooks and routing",
      "State management and context",
      "Weekday, evening or weekend batch",
    ],
    stats: [
      { label: "Projects", value: "1" },
      { label: "Stage", value: "1 of 3" },
    ],
  },
  {
    key: "internship",
    months: "6 Months",
    tag: "Most chosen",
    title: "Certificate Program",
    blurb: "Full stack build with live projects.",
    award: "Certificate + documented internship letter",
    includes: [
      "Everything in the Foundation track",
      "Node.js and Express API design",
      "MongoDB schemas with Mongoose",
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
    blurb: "Advanced deployment, DevOps basics and a capstone portfolio.",
    award: "Diploma + documented internship letter",
    includes: [
      "Everything in the Certificate track",
      "File uploads, payments and third-party APIs",
      "Deployment, environment configuration and CI",
      "A self-specified capstone portfolio project",
    ],
    stats: [
      { label: "Projects", value: "4" },
      { label: "Capstone", value: "Yes" },
    ],
  },
];

/* -------------------------------------------------------------------------- *
 *                   "Why This Programme Is Worth Your Year"                   *
 * -------------------------------------------------------------------------- */

/** The brief's five arguments for spending a year on this, as written. */
export const mernCertificateWhyChoose = [
  {
    icon: "pin",
    title: "Demand",
    body: "MERN is among the most requested stacks in job listings across Mohali's IT Park, Chandigarh and remote Indian startups — strong local demand, real budgets, and very few trained developers to fill the gap.",
  },
  {
    icon: "terminal",
    title: "Method",
    body: "From the second half of the course, you build on live client projects with a trainer beside you — making decisions that have real consequences, then correcting them the following week. That loop, not the syllabus alone, is the actual skill employers are hiring for.",
  },
  {
    icon: "chart",
    title: "Earnings",
    body: "Be realistic: a fresher who finishes with a working portfolio typically starts around ₹20,000–₹35,000/month in the Mohali–Chandigarh market, in roles like MERN Developer, Full-Stack Developer, React Developer and Node.js Developer, and moves up quickly with delivery experience. A certificate alone doesn't pay; demonstrated work does.",
  },
  {
    icon: "target",
    title: "The alternative",
    body: "Free videos and a scattered six months of self-study leave you with knowledge you can't demonstrate. A structured programme with live projects, a mentor who actually corrects your work, an internship letter and a placement cell that calls employers is the difference between knowing the subject and being hired to do it.",
  },
  {
    icon: "clock",
    title: "Access",
    body: "Students commute in from Phase 1 to Phase 11, Sector 70, Sector 74, Sohana, Kharar, Zirakpur and Landran, with weekend learners travelling from Chandigarh and Panchkula. Weekday, evening, weekend and 1-on-1 timings all exist so the course starts at zero regardless of where you're coming from.",
  },
];

/* -------------------------------------------------------------------------- *
 *                         "Who This Course Is For"                            *
 * -------------------------------------------------------------------------- */

/** The six starting points the brief writes for. */
export const mernCertificateAudience = [
  {
    icon: "users",
    title: "Students after 12th",
    body: "Join from any stream with no assumed background. Weekday, evening or weekend batches run alongside your college schedule.",
  },
  {
    icon: "certificate",
    title: "Graduates & final-year students",
    body: "Finishing a BCA, B.Tech, BBA or B.Com? This is the fastest route from a degree to a job offer, entering placement season with real project work instead of a blank CV.",
  },
  {
    icon: "briefcase",
    title: "Working professionals",
    body: "Mohali's IT Park and Chandigarh's tech corridor are full of people switching into development. The weekend batch is built for exactly that, without leaving your current job.",
  },
  {
    icon: "building",
    title: "Business owners & freelancers",
    body: "Learn enough to stop outsourcing blind, or start billing clients beyond Punjab — remote work isn't limited by a Mohali address.",
  },
  {
    icon: "rocket",
    title: "Career restarters",
    body: "A gap on your CV matters less than a portfolio you can point to. The course starts at zero and finishes with shipped work and a documented internship.",
  },
  {
    icon: "monitor",
    title: "Self-taught learners",
    body: "If tutorials left you with notes but nothing finished, what changes here is a trainer reviewing your actual output every week, against a real deadline.",
  },
];

/**
 * "Conditions of admission" — who the programme admits.
 *
 * The brief states its admissions rule in the FAQ that asks who can join; this
 * is that answer as a list. The four learning modes are their own section of
 * the brief and are kept there rather than folded in here.
 */
export const mernCertificateEligibility = [
  "Students after 12th, from any stream",
  "Graduates and final-year students",
  "Working professionals switching careers",
  "Business owners, freelancers and career restarters",
  "The course starts from fundamentals, so a technical background helps but isn't required",
];

/* -------------------------------------------------------------------------- *
 *                              "Certification"                                *
 * -------------------------------------------------------------------------- */

/** The four documents the brief lists, in its order. */
export const mernCertificateCertification = [
  {
    icon: "certificate",
    title: "Industry Certificate",
    body: "recognised by employers across the Tricity region",
  },
  {
    icon: "briefcase",
    title: "Internship Letter",
    body: "based on real client work, not a simulation, accepted for university industrial training requirements",
  },
  {
    icon: "layers",
    title: "Portfolio of Projects",
    body: "work you can show in any interview",
  },
  {
    icon: "users",
    title: "Placement Support",
    body: "CV review, mock interviews and hiring drives",
  },
];

/* -------------------------------------------------------------------------- *
 *                       "Where This Course Takes You"                         *
 * -------------------------------------------------------------------------- */

/** The brief writes its future-scope section as five questions. */
export const mernCertificateScope = [
  {
    q: "What roles open up?",
    a: "MERN Developer, Full-Stack Developer, React Developer, Node.js Developer, and similar roles across Mohali's IT Park, Chandigarh and remote-first startups.",
  },
  {
    q: "What can I earn?",
    a: "A fresher with a working portfolio starts around ₹20,000–₹35,000/month; with two years of delivery experience that typically doubles.",
  },
  {
    q: "Can I freelance remotely from Mohali?",
    a: "Yes — a Mohali address costs nothing on a remote brief. The course covers client handling, proposals and reporting so you can price and defend your own work.",
  },
  {
    q: "Who hires for this in the Tricity region?",
    a: "IT Park companies, Chandigarh-based product startups, export and manufacturing firms with in-house software teams, ed-tech and healthtech companies, and real estate and consultancy firms building their own platforms.",
  },
  {
    q: "Can I go further afterward?",
    a: "Yes — the certificate and portfolio stack toward adjacent tracks (cloud, DevOps, advanced AI-integrated development) faster than starting from zero.",
  },
];

/* -------------------------------------------------------------------------- *
 *                     "Hands-On Projects You Will Ship"                       *
 * -------------------------------------------------------------------------- */

/** The four deliverables, each one portfolio-ready. */
export const mernCertificateProjects = [
  {
    label: "Project 1",
    title: "MERN Stack Fundamentals Build",
    body: "Your first working build, applying JavaScript ES6+ and React fundamentals end-to-end.",
  },
  {
    label: "Project 2",
    title: "Real-World Data Challenge",
    body: "Work with messy, realistic inputs using Express APIs and MongoDB/Mongoose schemas, and defend your design choices to a trainer.",
  },
  {
    label: "Project 3",
    title: "Live Client Brief",
    body: "A genuine requirement from real delivery work, scoped, built and shipped under supervision — the project interviewers ask about.",
  },
  {
    label: "Project 4",
    title: "Portfolio Capstone",
    body: "A self-specified MERN project covering file uploads, payments and deployment, presented as your final piece.",
  },
];

/* -------------------------------------------------------------------------- *
 *        "Why Students Choose This Institute Over Others in Mohali"           *
 * -------------------------------------------------------------------------- */

/** The five differences the brief draws, as written. */
export const mernCertificateInstitute = [
  {
    icon: "users",
    title: "Trainers who still do the work",
    body: "practitioners delivering live client projects, not full-time lecturers teaching from a five-year-old case study.",
  },
  {
    icon: "rocket",
    title: "Live projects, real consequences",
    body: "genuine client requirements under supervision, which is the first thing interviewers ask to see.",
  },
  {
    icon: "layers",
    title: "Small batches, open lab hours",
    body: "a trainer sees your screen daily, and doubt sessions continue until the concept actually lands.",
  },
  {
    icon: "certificate",
    title: "Internship letter and certificate",
    body: "documented internship on real work, accepted for university industrial training requirements.",
  },
  {
    icon: "briefcase",
    title: "A placement cell that persists",
    body: "mock interviews, CV reviews and repeated drives with hiring partners across Mohali and Chandigarh, not abandoned after one attempt.",
  },
];

/** "How It Compares" — the brief's table, kept as a table. */
export const mernCertificateComparison = {
  title: "How It Compares",
  ours: "This Institute",
  theirs: "Typical Mohali Institutes",
  rows: [
    {
      feature: "Training style",
      ours: "100% practical, hands-on from day one",
      theirs: "Mostly theory with occasional demos",
    },
    {
      feature: "Projects",
      ours: "Live client work under trainer supervision",
      theirs: "Pre-built demo projects, or none",
    },
    {
      feature: "Batch size",
      ours: "Small, trainer sees your screen daily",
      theirs: "30–50 students per batch",
    },
    {
      feature: "Trainers",
      ours: "Working professionals delivering live projects",
      theirs: "Full-time lecturers, textbook examples",
    },
    {
      feature: "Internship",
      ours: "Documented internship on real client work",
      theirs: "Certificate only, no real exposure",
    },
    {
      feature: "Placement support",
      ours: "Dedicated cell, drives repeated until placed",
      theirs: "Job portal links or a single drive",
    },
    {
      feature: "Doubt clearing",
      ours: "Open lab hours, unlimited sessions",
      theirs: "Fixed class hours only",
    },
    {
      feature: "Certificate",
      ours: "Industry-recognised certificate + internship letter",
      theirs: "Institute certificate only",
    },
  ],
};

/* -------------------------------------------------------------------------- *
 *                             "Learning Modes"                                *
 * -------------------------------------------------------------------------- */

/** The four ways the same syllabus is delivered. */
export const mernCertificateModes = [
  {
    icon: "building",
    title: "Classroom Training",
    body: "Air-conditioned labs, licensed software, weekday batches Monday–Friday, 2 hours per session.",
  },
  {
    icon: "monitor",
    title: "Online Live Classes",
    body: "Live instructor-led sessions from anywhere, real-time doubt clearing, recordings available for 7 days.",
  },
  {
    icon: "calendar",
    title: "Weekend Batches",
    body: "Saturday–Sunday, same syllabus and placement support, built for working professionals.",
  },
  {
    icon: "users",
    title: "1-on-1 Personal Training",
    body: "Your own schedule with a dedicated trainer, ideal for shifting rosters or faster-than-batch pacing.",
  },
];

/* -------------------------------------------------------------------------- *
 *                       "Frequently Asked Questions"                          *
 * -------------------------------------------------------------------------- */

/** The brief's ten FAQs, as written. */
export const mernCertificateFaqs = [
  {
    q: "What is the duration of the MERN Stack course in Mohali?",
    a: "Weekday, evening and weekend batches all cover the same syllabus in one fixed duration, with each class running 2 hours. 1-on-1 training is available if you prefer to set your own pace.",
  },
  {
    q: "What is the fee for the MERN Stack course in Mohali?",
    a: "Shorter 2–3 month tracks typically run ₹8,000–₹15,000; comprehensive 4–6 month programmes with live projects, an internship and placement support run roughly ₹18,000–₹40,000. A counsellor shares the current fee sheet and EMI options on request, and the demo class is free.",
  },
  {
    q: "Who can join the MERN Stack course?",
    a: "Students after 12th, graduates, final-year students, working professionals switching careers, and business owners. The course starts from fundamentals, so a technical background helps but isn't required.",
  },
  {
    q: "What jobs can I get after this course?",
    a: "MERN Developer, Full-Stack Developer, React Developer and Node.js Developer roles across Mohali's IT Park, Chandigarh and remote Indian startups.",
  },
  {
    q: "What salary can a fresher expect in Mohali?",
    a: "Typically ₹20,000–₹35,000/month with a working portfolio, rising substantially within two years of experience. Freelancers billing multiple clients often earn more.",
  },
  {
    q: "Is placement guaranteed?",
    a: "No honest training provider can guarantee a job, and you should be cautious of anyone in Mohali who claims one. What's guaranteed is placement support — CV reviews, mock interviews, portfolio preparation and repeated hiring drives across the Tricity region.",
  },
  {
    q: "Which tools and software will I learn?",
    a: "MongoDB, Express, React, Node.js, Mongoose, JWT and the supporting toolchain used on live projects, all on licensed lab software.",
  },
  {
    q: "Will I get a certificate and internship letter?",
    a: "Yes — an industry-recognised certificate plus a documented internship letter based on live client work, accepted for university industrial training requirements.",
  },
  {
    q: "Do you work on real projects or only theory?",
    a: "Every module ends in something built. The course finishes with a live project drawn from real client delivery work, which becomes your interview portfolio.",
  },
  {
    q: "Are weekend and evening batches available?",
    a: "Yes — weekday, evening and weekend batches run in parallel, plus 1-on-1 training for a fully personal schedule. Book a free demo class to see the lab before enrolling.",
  },
];

/* -------------------------------------------------------------------------- *
 *                  "Ready to Start Your Career in Tech?"                      *
 * -------------------------------------------------------------------------- */

/** The closing call, after the enquiry form. */
export const mernCertificateClosing = {
  title: "Ready to Start Your Career in Tech?",
  body: "One call with a counsellor is usually enough to know if MERN Stack is the right fit. Book a free demo class and see the lab before you decide.",
  primaryCta: "Book a Free Demo Class",
  secondaryCta: "Talk to a Counsellor",
};
