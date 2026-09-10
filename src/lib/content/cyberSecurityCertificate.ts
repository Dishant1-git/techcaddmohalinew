import type { CourseOverride } from "@/lib/content/overrides";
import type { ProgrammeTrack } from "@/lib/certificateTracks";
import type { WrittenCertificateHero, WrittenHeading } from "@/lib/content/mernCertificate";

/**
 * The Certificate Programs menu's Cyber Security page, at
 * `/courses/certificate-programs/cyber-security`.
 *
 * The same catalogue course the Courses and After 12th menus list, written to a
 * different brief: a Mohali-first brief about the infrastructure the IT parks
 * and BPO campuses actually run on, with three named tracks, a phase-based
 * syllabus and a documented internship letter alongside the certificate.
 *
 * Everything below is that supplied copy, reproduced as written and split by
 * the section it belongs to — the same arrangement as the other written
 * certificate briefs in this directory, rendering through the same page. Where
 * the brief writes nothing for a slot the design has (the hero's particulars
 * row, each track's contents, the closing buttons), the entry is built from
 * the brief's own facts rather than invented: the phases supply the track
 * contents, the learning-modes section supplies the mode particular, the
 * certification section supplies the rest.
 *
 * Like the Data Science and Agentic AI briefs and unlike the MERN one, this
 * brief argues its "why this institute" case in prose only, so `comparison` is
 * omitted and that section renders the four differences alone.
 *
 * Types are imported with `import type` on purpose: `@/lib/certificateTracks`
 * imports the tracks below, so a value import here would close the cycle.
 */

/* -------------------------------------------------------------------------- *
 *                                    Hero                                     *
 * -------------------------------------------------------------------------- */

/** The brief's headline, opening paragraph, "What you get" list and two CTAs. */
export const cyberSecurityCertificateHero: WrittenCertificateHero = {
  title: "Cyber Security Training in Mohali — Learn to Defend Systems Attackers Actually Target",
  lead: "Mohali's IT parks and BPO campuses run on networks, applications, and customer data that need active defending, not a firewall bought once and forgotten. As more of that infrastructure gets built here, the demand for people who can actually find and fix vulnerabilities — not just talk about them — keeps growing. This programme is built around that reality: live systems, live tools, and a trainer correcting your work, not a slide deck.",
  primaryCta: "Book a Free Demo Class",
  secondaryCta: "Talk to a Course Advisor",
  points: [
    "100% hands-on, project-based learning from day one",
    "Real attack and defence tools used across every module, not demoed once",
    "Live client work under trainer supervision",
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
export const cyberSecurityCertificateOverride: CourseOverride = {
  contentKey: "cyber-security--certificate",
  // Three named tracks at 3, 6 and 9 months, not the catalogue's flat 6.
  duration: "3 – 9 Months",
  blurb:
    "Learn to defend the systems attackers actually target — networking, Linux hardening, vulnerability assessment and incident response, taught on live systems in Mohali.",
  overview:
    "This Cyber Security training in Mohali takes you from networking and protocols through to full security tooling and incident reporting, taught hands-on with Kali Linux, Wireshark, and Nmap. You'll work on live client briefs under trainer supervision, not simulated exercises. Every stage ends in a portfolio deliverable, and the course closes with a documented internship letter based on genuine security work.",
  // "What You'll Actually Build" — the three phases the brief names, in place
  // of a generic module list. The four projects are their own section and stay
  // there rather than being folded in here.
  modules: [
    {
      title: "Phase 1 — Foundations",
      blurb: "Where the course starts, at zero.",
      points: [
        "Networking and protocols for security",
        "Linux fundamentals and hardening",
        "An introduction to threats, vulnerabilities, and risk",
      ],
    },
    {
      title: "Phase 2 — Core Security Skills",
      blurb: "Finding the holes, on systems that have them.",
      points: [
        "Vulnerability assessment and scanning",
        "Web application security and the OWASP Top 10",
        "Network attack analysis through packet inspection",
      ],
    },
    {
      title: "Phase 3 — Delivery",
      blurb: "What happens after the finding, and who reads it.",
      points: [
        "Incident response and forensics basics",
        "Security tooling and reporting",
        "Live client work leading into your internship letter and placement preparation",
      ],
    },
  ],
  tools: [
    "Kali Linux",
    "Wireshark",
    "Nmap",
    "Burp Suite",
    "Metasploit",
    "OWASP ZAP",
    "Linux",
  ],
  outcomes: [
    "Read a network at the protocol level and harden a Linux system against the threats it faces",
    "Run a vulnerability assessment and test a web application against the OWASP Top 10",
    "Analyse a network attack through packet inspection and reconstruct what happened",
    "Respond to an incident and write the report a client or employer will actually act on",
  ],
  roles: [
    "Security Analyst",
    "SOC Analyst",
    "Penetration Tester",
    "IT Security Executive",
  ],
};

/* -------------------------------------------------------------------------- *
 *                              Section headings                               *
 * -------------------------------------------------------------------------- */

/** The brief's own section titles, in page order. */
export const cyberSecurityCertificateHeadings: Record<string, WrittenHeading> = {
  tracks: {
    index: "—",
    eyebrow: "Programme lengths",
    title: "Choose Your Cyber Security Track in Mohali",
    intro:
      "One subject, three depths. Each track builds on the last, so a shorter option costs you scope, not foundation — you can always extend later without repeating a module.",
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
      "Mohali's mix of IT companies, BPOs, and a large student population from nearby colleges means this course draws people from very different starting points — and it's built to work for all of them.",
  },
  tools: {
    index: "06",
    eyebrow: "Instruments & software",
    title: "Tools You'll Work With",
    intro:
      "Every tool below is installed on the lab machines and used on real project work, not shown once and forgotten:",
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
      "Mohali has no shortage of institutes offering a “Cyber Security course,” and most brochures look similar. What actually differs is who's teaching, whether you ever touch a real system, and whether anyone follows up after you've enrolled.",
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
export const cyberSecurityCertificateSections = [
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
 *                  "Choose Your Cyber Security Track in Mohali"               *
 * -------------------------------------------------------------------------- */

/**
 * The three lengths as this brief names them — Foundation, Certificate,
 * Diploma — with the "Best for" line it writes for each as the blurb.
 *
 * The contents of each track are the brief's own phases, assigned in order, so
 * a longer track opens on what it inherits rather than repeating it: you can
 * extend later without repeating a module.
 */
export const cyberSecurityCertificateTracks: ProgrammeTrack[] = [
  {
    key: "certificate",
    months: "3 Months",
    title: "Foundation Program",
    blurb: "Core security fundamentals and a fast entry point.",
    award: "Industry-recognised certificate",
    includes: [
      "Networking and protocols for security",
      "Linux fundamentals and hardening",
      "Threats, vulnerabilities, and risk",
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
    blurb: "A complete, job-ready security skill set with live projects.",
    award: "Certificate + documented internship letter",
    includes: [
      "Everything in the Foundation track",
      "Vulnerability assessment and scanning",
      "Web application security and the OWASP Top 10",
      "Network attack analysis through packet inspection",
    ],
    stats: [
      { label: "Projects", value: "3" },
      { label: "Tools", value: "7" },
    ],
  },
  {
    key: "expert",
    months: "9 Months",
    title: "Diploma Program",
    blurb: "Deep specialisation for analyst, pentesting, or SOC-track roles.",
    award: "Diploma + documented internship letter",
    includes: [
      "Everything in the Certificate track",
      "Incident response and forensics basics",
      "Security tooling and reporting",
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
export const cyberSecurityCertificateWhyChoose = [
  {
    icon: "pin",
    title: "Growing Faster Than the Talent Supply",
    body: "Security roles are expanding across Mohali's IT and ITES sector faster than trained professionals are entering the workforce, which keeps entry-level pay competitive. That gap is the whole case for this course.",
  },
  {
    icon: "terminal",
    title: "Learning on Real Systems",
    body: "From the midpoint of the course, you work on live client briefs under a trainer's supervision — making security decisions with real consequences, then correcting them the following week. That feedback loop, not theory, is what actually builds the skill. No employer will take your word for it without work they can inspect.",
  },
  {
    icon: "chart",
    title: "Realistic Earnings",
    body: "A fresher who completes the course with a working portfolio can typically expect an entry-level salary broadly in line with the Tricity (Mohali–Chandigarh–Panchkula) market for Security Analyst, SOC Analyst, or Penetration Tester roles, growing steadily with experience. No course can promise a number — the portfolio you build is what actually opens the door.",
  },
  {
    icon: "target",
    title: "The Alternative Costs You Too",
    body: "Free videos and disconnected online courses often leave learners with fragments they can't demonstrate to an interviewer. A structured programme — live projects, a mentor correcting your work, an internship letter, and an active placement cell — is what turns knowledge into a hire.",
  },
];

/* -------------------------------------------------------------------------- *
 *                       "Who Should Join This Course?"                        *
 * -------------------------------------------------------------------------- */

/** The six starting points the brief writes for, in its numbered order. */
export const cyberSecurityCertificateAudience = [
  {
    icon: "users",
    title: "Students After 12th",
    body: "No prior background needed. Start from fundamentals and run the course alongside your degree using weekday or weekend batches.",
  },
  {
    icon: "certificate",
    title: "Final-Year Students & Graduates",
    body: "Finishing a BCA, B.Tech, or similar degree? This is the fastest route from campus to a paying security role — walk into placement season with real project work, not a blank CV.",
  },
  {
    icon: "briefcase",
    title: "Working Professionals",
    body: "The weekend batch is built for people already employed in Mohali's IT/ITES sector. Career switchers typically become interview-ready for Security Analyst roles within five to six months, without leaving their current job.",
  },
  {
    icon: "building",
    title: "Business Owners & Freelancers",
    body: "Owners take this course to stop outsourcing security decisions they can't evaluate themselves. Freelancers use it to bill security clients well beyond Punjab, since this kind of work isn't location-limited.",
  },
  {
    icon: "rocket",
    title: "Career Restarters",
    body: "A gap in your CV matters less than a portfolio of real work. This course starts from zero and finishes with documented, demonstrable projects and an internship letter.",
  },
  {
    icon: "monitor",
    title: "Self-Taught Learners",
    body: "If YouTube tutorials left you with notes but no working exploit report or hardened system to show, what's missing is usually structured feedback and a deadline on every module — exactly what this format adds.",
  },
];

/**
 * "Conditions of admission" — who the programme admits.
 *
 * The brief states its admissions rule across the two FAQs that ask who can
 * join and whether a technical background is needed; this is those answers as
 * a list. The four learning modes are their own section of the brief and are
 * kept there rather than folded in here.
 */
export const cyberSecurityCertificateEligibility = [
  "Students after 12th, from any stream",
  "Graduates and final-year students",
  "Working professionals reskilling alongside a job",
  "Business owners, freelancers and career restarters",
  "No prior technical background is required — training starts from the fundamentals",
  "The course opens on networking and Linux, so a technical background helps but isn't required",
];

/* -------------------------------------------------------------------------- *
 *                        "Certification & Internship"                         *
 * -------------------------------------------------------------------------- */

/** The four things the brief says you finish with. */
export const cyberSecurityCertificateCertification = [
  {
    icon: "certificate",
    title: "Industry-recognised certificate",
    body: "on course completion",
  },
  {
    icon: "briefcase",
    title: "Documented internship letter",
    body: "based on genuine security work — accepted for industrial training requirements at most Punjab universities",
  },
  {
    icon: "layers",
    title: "Portfolio of live projects",
    body: "including vulnerability assessments and incident response exercises, ready to walk an interviewer through",
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
export const cyberSecurityCertificateScope = [
  {
    q: "Job roles",
    a: "Security Analyst, SOC Analyst, Penetration Tester, IT Security Executive, and adjacent roles across IT, ITES, and any business running infrastructure out of Mohali's IT parks.",
  },
  {
    q: "Freelance and remote work",
    a: "Security assessment and consulting work travels well — many graduates take on remote audits or freelance penetration testing for clients outside Punjab entirely, since this field isn't limited by geography.",
  },
  {
    q: "Career growth",
    a: "The certificate and portfolio built here often become the base for deeper specialisation — many students go on to advanced penetration testing, cloud security, or GRC (governance, risk, compliance) tracks once fundamentals are solid.",
  },
];

/* -------------------------------------------------------------------------- *
 *                     "Hands-On Projects You Will Ship"                       *
 * -------------------------------------------------------------------------- */

/** The four deliverables, each one portfolio-ready. */
export const cyberSecurityCertificateProjects = [
  {
    label: "Project 1",
    title: "Cyber Security Fundamentals Build",
    body: "Apply networking security and Linux hardening together on a real environment, end to end.",
  },
  {
    label: "Project 2",
    title: "Real-World Security Challenge",
    body: "Work through vulnerability assessment and OWASP Top 10 web application testing, and defend your findings to a trainer.",
  },
  {
    label: "Project 3",
    title: "Live Client Brief",
    body: "A genuine security requirement from real delivery work, scoped and shipped under supervision — the project interviewers ask about first.",
  },
  {
    label: "Project 4",
    title: "Portfolio Capstone",
    body: "A self-directed cyber security project covering incident response and forensics basics, presented as your final piece.",
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
export const cyberSecurityCertificateInstitute = [
  {
    icon: "users",
    title: "Trainers who still do security work professionally",
    body: "so what's taught in class reflects current attack techniques, not a five-year-old case study.",
  },
  {
    icon: "layers",
    title: "Small batches",
    body: "close enough attention that a trainer reviews your actual findings and reports.",
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
export const cyberSecurityCertificateModes = [
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
export const cyberSecurityCertificateFaqs = [
  {
    q: "What is the duration of the Cyber Security course in Mohali?",
    a: "The course is available as a 3-month foundation track, a 6-month certificate track, or a 9-month diploma track, across weekday, evening, and weekend batches — plus 1-on-1 training for a fully custom schedule.",
  },
  {
    q: "What is the fee for the Cyber Security course in Mohali?",
    a: "Fees vary by track length and depth. Shorter foundation courses are generally more affordable, while comprehensive programmes with live projects, internship, and placement support cost more but deliver a complete, job-ready skill set. Contact the admissions team for current fees and EMI options.",
  },
  {
    q: "Who can join this course?",
    a: "Students after 12th, graduates, working professionals, business owners, and career restarters all join — no prior technical background is required, since training starts from the fundamentals.",
  },
  {
    q: "What jobs can I get after completing this course?",
    a: "Common outcomes include Security Analyst, SOC Analyst, Penetration Tester, and IT Security Executive roles across Mohali's IT and ITES sector.",
  },
  {
    q: "Is placement guaranteed?",
    a: "No genuine training provider can honestly guarantee a job. What's provided is placement support — resume reviews, mock interviews, portfolio preparation, and ongoing hiring drives with partner companies.",
  },
  {
    q: "Which tools will I learn?",
    a: "Kali Linux, Wireshark, Nmap, Burp Suite, Metasploit, and OWASP ZAP, all used hands-on across live security projects.",
  },
  {
    q: "Will I receive a certificate and internship letter?",
    a: "Yes — an industry-recognised certificate on completion, along with a documented internship letter based on genuine security project work.",
  },
  {
    q: "Are weekend and evening batches available in Mohali?",
    a: "Yes, weekday, evening, and weekend batches all run in parallel, along with 1-on-1 training for a fully personalised schedule.",
  },
  {
    q: "Do I need a technical background to start this course?",
    a: "No. The course starts from networking and Linux fundamentals, so a technical background helps but isn't required.",
  },
];

/* -------------------------------------------------------------------------- *
 *           "Ready to Start Your Cyber Security Career in Mohali?"            *
 * -------------------------------------------------------------------------- */

/**
 * The closing call, after the enquiry form.
 *
 * The brief names no buttons here, so it reuses the two the hero opens with —
 * the same call, at the other end of the page.
 */
export const cyberSecurityCertificateClosing = {
  title: "Ready to Start Your Cyber Security Career in Mohali?",
  body: "A single conversation with a course advisor is usually enough to know if this is the right fit. Book a free demo class, see the lab, and meet a trainer before you decide.",
  primaryCta: "Book a Free Demo Class",
  secondaryCta: "Talk to a Course Advisor",
};
