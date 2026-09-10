import type { CourseOverride } from "@/lib/content/overrides";
import type { ProgrammeTrack } from "@/lib/certificateTracks";
import type { WrittenCertificateHero, WrittenHeading } from "@/lib/content/mernCertificate";

/**
 * The Certificate Programs menu's Agentic AI page, at
 * `/courses/certificate-programs/agentic-ai`.
 *
 * The same catalogue course the AI menu lists, written to a different brief: a
 * Mohali-first brief about the shift from AI that answers to AI that finishes
 * the job, with three named tracks, a stage-based syllabus and a documented
 * internship letter alongside the certificate.
 *
 * Everything below is that supplied copy, reproduced as written and split by
 * the section it belongs to — the same arrangement as
 * `@/lib/content/mernCertificate` and `@/lib/content/dataScienceCertificate`,
 * rendering through the same written certificate page. Where the brief writes
 * nothing for a slot the design has (the hero's particulars row, each track's
 * contents, the closing buttons), the entry is built from the brief's own
 * facts rather than invented: the stages supply the track contents, the
 * learning-modes section supplies the mode particular, the certification
 * section supplies the rest.
 *
 * Like the Data Science brief and unlike the MERN one, this brief argues its
 * "why this institute" case in prose only, so `comparison` is omitted and that
 * section renders the four differences alone.
 *
 * The `contentKey` matters more here than on the other two: `agentic-ai` has
 * written why-choose, audience, eligibility and FAQ blocks in
 * `@/lib/coursePage` keyed by its bare slug, which the AI menu's page at
 * `/courses/ai/agentic-ai` renders. Keying this menu's record
 * `agentic-ai--certificate` is what keeps the two apart — the AI page is
 * untouched by everything below.
 *
 * Types are imported with `import type` on purpose: `@/lib/certificateTracks`
 * imports the tracks below, so a value import here would close the cycle.
 */

/* -------------------------------------------------------------------------- *
 *                                    Hero                                     *
 * -------------------------------------------------------------------------- */

/** The brief's headline, opening paragraph, "What you get" list and two CTAs. */
export const agenticAiCertificateHero: WrittenCertificateHero = {
  title: "Agentic AI Training in Mohali — Build AI Systems That Actually Do the Work",
  lead: "“Agentic AI” is the shift from AI that answers questions to AI that completes tasks — planning steps, calling tools, checking its own output, and finishing multi-step work with minimal hand-holding. It's also one of the fastest-moving hiring categories in tech right now, and genuinely trained practitioners are still rare, even in a hub like Mohali. This programme is built to make you one of them — through live client work, not recorded lectures.",
  primaryCta: "Book a Free Demo Class",
  secondaryCta: "Talk to a Course Advisor",
  points: [
    "Practical, project-based learning from day one — every module ends in something you built",
    "AI tools and frameworks used in every stage of training, not shown once and forgotten",
    "Live client projects under trainer supervision",
    "Certificate plus a documented internship letter, and ongoing placement support",
  ],
  // The brief writes no particulars row. These four are its own facts, one
  // from each of the sections that states them — the learning modes, the live
  // client briefs, and the two documents in "Certification & Internship".
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
export const agenticAiCertificateOverride: CourseOverride = {
  contentKey: "agentic-ai--certificate",
  duration: "3 – 9 Months",
  blurb:
    "Build AI systems that actually do the work — agents that plan, call tools, check their own output and finish multi-step jobs, taught through live client work in Mohali.",
  overview:
    "This Agentic AI training in Mohali takes you from agent architecture and planning loops through tool use, memory, and multi-agent coordination, all the way to deployment, cost control, and observability — built on Python, LangChain, and LangGraph. You'll work on live briefs under trainer supervision rather than pre-built demos, with every stage ending in a real deliverable. By completion, you'll have a portfolio of deployed agent work and a documented internship on record.",
  // "What You'll Actually Build" — the three stages the brief names, in place
  // of a generic module list. The four projects are their own section and stay
  // there rather than being folded in here.
  modules: [
    {
      title: "Stage 1 — Agentic AI Practitioner (3 Months)",
      blurb: "Where the course starts, at absolute zero.",
      points: [
        "Python, Git, HTTP, and SQL from zero — no programming background required",
        "Prompting and structured output, tool calling, and building your own MCP server",
        "Retrieval-augmented generation with clause-level citations, agent memory, and LangGraph with an approval gate",
        "Ends with a deployed agent, complete with an evaluation report and a cost-per-conversation figure",
      ],
    },
    {
      title: "Stage 2 — Agentic AI Engineer (6 Months)",
      blurb: "What separates a working agent from a production one.",
      points: [
        "Async pipelines, model routing, and self-hosted serving",
        "Prompt optimisation with DSPy",
        "Production-grade MCP gateways, GraphRAG, durable execution, and full multi-agent systems",
      ],
    },
    {
      title: "Stage 3 — Agentic AI Architect (9 Months)",
      blurb: "The same systems, at enterprise scale.",
      points: [
        "Change-data-capture ingestion with access-control propagation and retrieval at scale across millions of documents",
        "Agent-to-agent interoperability, a shared evaluation service, and an enterprise-grade security package",
      ],
    },
  ],
  tools: [
    "Python",
    "LangChain",
    "LangGraph",
    "Claude",
    "OpenAI API",
    "Vector Databases",
    "FastAPI",
  ],
  outcomes: [
    "Build and deploy a working agent from zero — planning loops, tool calling and your own MCP server",
    "Ground an agent in retrieval with clause-level citations, agent memory and an approval gate in LangGraph",
    "Take a build to production with async pipelines, model routing, durable execution and multi-agent coordination",
    "Report on a deployed agent with an evaluation report and a cost-per-conversation figure",
  ],
  roles: ["AI Engineer", "Agent Developer", "Automation Architect", "AI Consultant"],
};

/* -------------------------------------------------------------------------- *
 *                              Section headings                               *
 * -------------------------------------------------------------------------- */

/** The brief's own section titles, in page order. */
export const agenticAiCertificateHeadings: Record<string, WrittenHeading> = {
  tracks: {
    index: "—",
    eyebrow: "Programme lengths",
    title: "Choose Your Agentic AI Track in Mohali",
    intro:
      "The same subject, three depths. Each stage builds directly on the last, so choosing a shorter track costs you scope, not foundation — and you can always extend later.",
  },
  overview: { index: "01", eyebrow: "Programme brief", title: "Course Overview" },
  modules: {
    index: "02",
    eyebrow: "Syllabus of record",
    title: "What You'll Actually Build",
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
      "Mohali's tech ecosystem — IT Park companies, startups, and a large working professional base — draws learners from very different starting points. This course is deliberately built to serve all of them.",
  },
  tools: {
    index: "06",
    eyebrow: "Instruments & software",
    title: "Tools You'll Work With",
    intro:
      "Every tool below is used on real project work throughout the course, not shown once in a slide:",
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
      "Mohali has plenty of institutes now listing “Agentic AI” on their syllabus, and most brochures read similarly. What actually differs is who's teaching, whether you ever touch a real deployment, and whether anyone follows up after enrolment.",
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
export const agenticAiCertificateSections = [
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
 *                    "Choose Your Agentic AI Track in Mohali"                 *
 * -------------------------------------------------------------------------- */

/**
 * The three lengths as this brief names them — Practitioner, Engineer,
 * Architect — with the "What it gets you" line it writes for each as the blurb.
 *
 * The contents of each track are the brief's own stages, assigned in order, so
 * a longer track opens on what it inherits rather than repeating it: each
 * stage builds directly on the last.
 */
export const agenticAiCertificateTracks: ProgrammeTrack[] = [
  {
    key: "certificate",
    months: "3 Months",
    title: "Practitioner Track",
    blurb: "Build and deploy your first working AI agent from zero coding background.",
    award: "Industry-recognised certificate",
    includes: [
      "Python, Git, HTTP and SQL from zero",
      "Prompting, structured output, tool calling and your own MCP server",
      "Retrieval with citations, agent memory and LangGraph approval gates",
      "A deployed agent with an evaluation report and cost per conversation",
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
    title: "Engineer Track",
    blurb:
      "Production-grade agent systems — routing, async pipelines, multi-agent coordination.",
    award: "Certificate + documented internship letter",
    includes: [
      "Everything in the Practitioner track",
      "Async pipelines, model routing and self-hosted serving",
      "Prompt optimisation with DSPy",
      "MCP gateways, GraphRAG, durable execution and multi-agent systems",
    ],
    stats: [
      { label: "Projects", value: "3" },
      { label: "Tools", value: "7" },
    ],
  },
  {
    key: "expert",
    months: "9 Months",
    title: "Architect Track",
    blurb: "Enterprise-scale agent architecture, security, and cross-system interoperability.",
    award: "Diploma + documented internship letter",
    includes: [
      "Everything in the Engineer track",
      "Change-data-capture ingestion with access-control propagation",
      "Retrieval at scale across millions of documents",
      "Agent-to-agent interoperability and an enterprise security package",
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
export const agenticAiCertificateWhyChoose = [
  {
    icon: "pin",
    title: "Where the Budgets Are Moving",
    body: "Agentic systems are one of the fastest-growing categories of AI investment right now, and trained practitioners remain genuinely scarce across North India — including in Mohali's IT corridor. That imbalance is the opportunity.",
  },
  {
    icon: "terminal",
    title: "Learning Through Real Consequences",
    body: "From the midpoint of the course, you work on live client briefs with a trainer beside you — making decisions that have consequences, then correcting them the following week. That loop, not theory, is what actually builds the skill. No employer will take your word for it without work they can inspect.",
  },
  {
    icon: "chart",
    title: "Realistic Earnings",
    body: "A fresher who completes the course with a deployed, working portfolio can expect an entry-level salary broadly in line with what's seen across the Tricity market for AI Engineer, Agent Developer, and Automation Architect roles, growing meaningfully with experience. No course can promise a number — what gets you there is the portfolio you build.",
  },
  {
    icon: "target",
    title: "The Alternative Costs You Time",
    body: "Free tutorials and unstructured online courses often leave learners with fragments of knowledge they can't demonstrate. A structured programme — live projects, a mentor correcting your work, an internship letter, and an active placement cell — is what turns understanding into employability.",
  },
];

/* -------------------------------------------------------------------------- *
 *                       "Who Should Join This Course?"                        *
 * -------------------------------------------------------------------------- */

/** The six starting points the brief writes for, in its numbered order. */
export const agenticAiCertificateAudience = [
  {
    icon: "users",
    title: "Students After 12th",
    body: "No assumed background. Start from zero and run this alongside your degree using weekday or weekend batches.",
  },
  {
    icon: "certificate",
    title: "Final-Year Students & Graduates",
    body: "Whether you're finishing a BCA, B.Tech, or another degree, this is the fastest path from campus to an AI-adjacent role — walk into placement season with a deployed agent project, not a blank CV.",
  },
  {
    icon: "briefcase",
    title: "Working Professionals",
    body: "The weekend batch is built for people already employed. Career switchers in tech-adjacent roles typically become interview-ready for AI Engineer positions within five to six months, without stepping away from their current job.",
  },
  {
    icon: "building",
    title: "Business Owners & Freelancers",
    body: "Understand and evaluate AI automation work instead of outsourcing it blindly — or start building and billing agent-based solutions for clients well beyond Punjab.",
  },
  {
    icon: "rocket",
    title: "Career Restarters",
    body: "What matters after a break isn't the gap — it's what you can demonstrate afterward. This course starts at zero and finishes with a real portfolio and internship letter.",
  },
  {
    icon: "monitor",
    title: "Self-Taught Learners",
    body: "If tutorials and YouTube left you with fragments but nothing deployed, the missing piece is usually structured feedback and a deadline on every module — which is exactly the format here.",
  },
];

/**
 * "Conditions of admission" — who the programme admits.
 *
 * The brief states its admissions rule across the two FAQs that ask who can
 * join and whether programming is needed; this is those answers as a list. The
 * four learning modes are their own section of the brief and are kept there
 * rather than folded in here.
 */
export const agenticAiCertificateEligibility = [
  "Students after 12th, from any stream",
  "Graduates and final-year students",
  "Working professionals reskilling alongside a job",
  "Business owners, freelancers and career restarters",
  "No prior technical background is required — training starts from absolute zero",
  "The Practitioner track covers Python, Git, HTTP and SQL basics before any agent-specific work",
];

/* -------------------------------------------------------------------------- *
 *                        "Certification & Internship"                         *
 * -------------------------------------------------------------------------- */

/** The four things the brief says you finish with. */
export const agenticAiCertificateCertification = [
  {
    icon: "certificate",
    title: "Industry-recognised certificate",
    body: "on completion",
  },
  {
    icon: "briefcase",
    title: "Documented internship letter",
    body: "based on genuine agent-building work — accepted for industrial training requirements at most Punjab universities",
  },
  {
    icon: "layers",
    title: "Portfolio of deployed agents",
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
export const agenticAiCertificateScope = [
  {
    q: "Job roles",
    a: "AI Engineer, Agent Developer, Automation Architect, AI Consultant, and adjacent roles across IT, product, and automation-focused businesses in Mohali and the wider Tricity area.",
  },
  {
    q: "Freelance and remote work",
    a: "Agent-building skills travel extremely well — many graduates take on remote or freelance builds for clients outside Punjab entirely, since this work isn't tied to location.",
  },
  {
    q: "Career growth",
    a: "The certificate and deployed-agent portfolio you build here form a strong base for further specialisation in multi-agent systems, retrieval architecture, or applied ML — many students continue into advanced tracks once the fundamentals are solid.",
  },
];

/* -------------------------------------------------------------------------- *
 *                     "Hands-On Projects You Will Ship"                       *
 * -------------------------------------------------------------------------- */

/** The four deliverables, each one portfolio-ready. */
export const agenticAiCertificateProjects = [
  {
    label: "Project 1",
    title: "Agentic AI Fundamentals Build",
    body: "Apply agent architecture, planning loops, and tool/function calling together on a real use case, end to end.",
  },
  {
    label: "Project 2",
    title: "Real-World Agent Challenge",
    body: "Work through multi-agent coordination and retrieval-grounded knowledge, then defend your design choices to a trainer.",
  },
  {
    label: "Project 3",
    title: "Live Client Brief",
    body: "A genuine automation or agent requirement, scoped and shipped under supervision — the one interviewers ask about first.",
  },
  {
    label: "Project 4",
    title: "Portfolio Capstone",
    body: "A self-directed agentic AI project covering build, deployment, and presentation — your strongest interview talking point.",
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
export const agenticAiCertificateInstitute = [
  {
    icon: "users",
    title: "Trainers who still build agent systems professionally",
    body: "so what's taught reflects current practice, not a case study from two AI generations ago.",
  },
  {
    icon: "layers",
    title: "Small batches",
    body: "close enough attention that a trainer reviews your actual builds, not just attendance.",
  },
  {
    icon: "terminal",
    title: "Open lab access",
    body: "and continued doubt-clearing outside class hours.",
  },
  {
    icon: "briefcase",
    title: "A placement cell that keeps working",
    body: "mock interviews and hiring drives that continue after a rejection, not a one-time job portal link.",
  },
];

/* -------------------------------------------------------------------------- *
 *                   "Learning Modes Available in Mohali"                      *
 * -------------------------------------------------------------------------- */

/** The four modes, each with the "Best For" line the brief gives it. */
export const agenticAiCertificateModes = [
  {
    icon: "building",
    title: "Classroom Training",
    body: "Learners who want structured, in-person sessions with hands-on lab access.",
  },
  {
    icon: "monitor",
    title: "Online Live Classes",
    body: "Anyone who wants live instruction with location flexibility.",
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

/** The brief's nine FAQs, as written. */
export const agenticAiCertificateFaqs = [
  {
    q: "What is the duration of the Agentic AI course in Mohali?",
    a: "The course runs as a 3-month Practitioner track, a 6-month Engineer track, or a 9-month Architect track, across weekday, evening, and weekend batches — plus 1-on-1 training for a fully custom schedule.",
  },
  {
    q: "What is the fee for the Agentic AI course in Mohali?",
    a: "Fees scale with track length and depth. Shorter Practitioner-level courses are generally more affordable, while the full Engineer and Architect tracks — with live projects, internship, and placement support — cost more but deliver a complete, production-ready skill set. Contact the admissions team for current fees and EMI options.",
  },
  {
    q: "Who can join this course?",
    a: "Students after 12th, graduates, working professionals, business owners, and career restarters all join — no prior technical background is required, since training starts from absolute zero.",
  },
  {
    q: "What jobs can I get after completing this course?",
    a: "Common outcomes include AI Engineer, Agent Developer, Automation Architect, and AI Consultant roles across Mohali's growing AI and automation sector.",
  },
  {
    q: "Is placement guaranteed?",
    a: "No genuine training provider can honestly guarantee a job. What's provided is placement support — resume reviews, mock interviews, portfolio preparation, and ongoing hiring drives with partner companies.",
  },
  {
    q: "Which tools will I learn?",
    a: "Python, LangChain, LangGraph, Claude, OpenAI API, and vector databases, all used hands-on across live agent-building projects.",
  },
  {
    q: "Will I receive a certificate and internship letter?",
    a: "Yes — an industry-recognised certificate on completion, along with a documented internship letter based on genuine agent-development work.",
  },
  {
    q: "Are weekend and evening batches available in Mohali?",
    a: "Yes, weekday, evening, and weekend batches all run in parallel, along with 1-on-1 training for a fully personalised schedule.",
  },
  {
    q: "Do I need prior programming experience to start?",
    a: "No. The Practitioner track is designed to take you from zero — including Python, Git, HTTP, and SQL basics — before moving into agent-specific skills.",
  },
];

/* -------------------------------------------------------------------------- *
 *             "Ready to Start Your Agentic AI Career in Mohali?"              *
 * -------------------------------------------------------------------------- */

/**
 * The closing call, after the enquiry form.
 *
 * The brief names no buttons here, so it reuses the two the hero opens with —
 * the same call, at the other end of the page.
 */
export const agenticAiCertificateClosing = {
  title: "Ready to Start Your Agentic AI Career in Mohali?",
  body: "A single conversation with a course advisor is usually enough to know if this is the right fit. Book a free demo class, see the training setup, and meet a trainer before you decide.",
  primaryCta: "Book a Free Demo Class",
  secondaryCta: "Talk to a Course Advisor",
};
