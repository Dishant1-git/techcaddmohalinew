import type { Course } from "@/lib/courses";
import type { CourseReview } from "@/lib/coursePage";
import type { ProgrammeTrack } from "@/lib/certificateTracks";
import type { WrittenCertificateHero, WrittenHeading } from "@/lib/content/mernCertificate";

/**
 * The Certificate Programs menu's Basic Computer & Office Skills page, at
 * `/courses/certificate-programs/basic-computer-office-skills`.
 *
 * Unlike the twelve programmes the menu shares with the catalogue, this one
 * belongs to the Certificate Programs menu alone — its record lives here
 * rather than in `@/lib/courses`, so no other menu grows a page for it.
 *
 * It is also not a single subject taken at three depths. The brief is a track
 * of five short courses — Basic Computer, MS Office, Tally with GST, DTP and
 * Typing — so the "syllabus" section lists the five courses and the three
 * programme lengths become how many of them you take.
 *
 * Everything below is that supplied copy, reproduced as written and split by
 * the section it belongs to. Where the brief writes nothing for a slot the
 * design has — the hero's particulars row, the tools list, the future-scope
 * answers, the practicals, the institute case, the learning modes — the entry
 * is built from the brief's own facts rather than invented elsewhere.
 *
 * Like the Data Science, Agentic AI and Cyber Security briefs and unlike the
 * MERN one, this brief argues its "why this institute" case in prose only, so
 * `comparison` is omitted and that section renders the four differences alone.
 *
 * Types are imported with `import type` on purpose: `@/lib/certificateTracks`
 * imports the tracks below, so a value import here would close the cycle.
 */

/* -------------------------------------------------------------------------- *
 *                                    Hero                                     *
 * -------------------------------------------------------------------------- */

/** The brief's headline, opening paragraph, "What you get" list and two CTAs. */
export const basicComputerOfficeSkillsHero: WrittenCertificateHero = {
  title: "Basic Computer & Office Skill Courses in Mohali",
  lead: "Before you get to advanced tech skills, there's a baseline every office job in Mohali now assumes you already have — comfortable with a keyboard, confident in Excel, able to run basic bookkeeping software, and able to type at a usable speed. These are the short, practical courses that build that baseline fast, taught to the same standard local employers and government skill tests actually check.",
  primaryCta: "Book a Free Demo Class",
  secondaryCta: "Talk to a Course Advisor",
  points: [
    "Short, focused courses you can complete quickly and start applying immediately",
    "Training aligned with what Mohali employers and government exams actually test",
    "Certificate on completion",
    "Placement guidance for entry-level office and admin roles",
  ],
  // The brief writes no particulars row. These four are its own facts — the
  // length it states, the five courses it lists, and the two things the
  // completion section says you leave with.
  highlights: [
    { icon: "clock", label: "Length", value: "A Few Weeks" },
    { icon: "layers", label: "Track", value: "5 Courses" },
    { icon: "certificate", label: "Certificate", value: "On Completion" },
    { icon: "briefcase", label: "Includes", value: "Placement Guidance" },
  ],
};

/* -------------------------------------------------------------------------- *
 *                                 The record                                  *
 * -------------------------------------------------------------------------- */

/**
 * The course record, carried by this menu alone.
 *
 * `overview` is the brief's "Why These Courses Matter in Mohali" section, both
 * paragraphs, blank-line separated and rendered as two by <CertOverview/>.
 * `modules` is the brief's "5 Courses in This Track" — one module per course,
 * its paragraph kept as the module's blurb and its topics drawn from that same
 * paragraph rather than from a generic syllabus.
 */
export const basicComputerOfficeSkillsCourse: Course = {
  slug: "basic-computer-office-skills",
  contentKey: "basic-computer-office-skills--certificate",
  title: "Basic Computer & Office Skills",
  category: "office-skills",
  duration: "A Few Weeks",
  level: "Beginner",
  blurb:
    "The office baseline Mohali employers assume you already have — computer literacy, MS Office, Tally with GST, DTP and English & Punjabi typing, in five short courses.",
  overview:
    "Mohali's job market isn't just IT parks and tech companies — it's also a large base of retail, trading, real estate, healthcare, and government-adjacent employers who all hire for basic office competence first. A candidate who can run Excel confidently, keep books in Tally, or type at government-test speed is often chosen over one who can't, regardless of the actual job title. These courses exist to close that gap quickly, without requiring months of commitment.\n\nThey're also a common first step: many students complete one of these short programmes before moving into a longer, more technical track — the fundamentals here (keyboard fluency, file handling, basic computer literacy) make every course afterward faster to learn.",
  modules: [
    {
      title: "Basic Computer Course",
      blurb:
        "The computer literacy that nearly every office role in and around Mohali now assumes you already have — operating systems, file management, internet and email basics, and everyday troubleshooting. Built for absolute beginners with no prior computer experience.",
      points: [
        "Operating systems and everyday computer use",
        "File management, folders and storage",
        "Internet and email basics",
        "Everyday troubleshooting",
      ],
    },
    {
      title: "MS Office Course",
      blurb:
        "Word, Excel, and PowerPoint at the level employers actually mean when a job listing says “proficient in MS Office” — document formatting, spreadsheet formulas and data tables, and presentation building, all through hands-on practice rather than theory.",
      points: [
        "Document formatting in Word",
        "Spreadsheet formulas and data tables in Excel",
        "Presentation building in PowerPoint",
        "Hands-on practice rather than theory",
      ],
    },
    {
      title: "Tally Course (with GST)",
      blurb:
        "Computerised bookkeeping and GST-compliant billing on the accounting software most traders, shopkeepers, and small businesses across the Mohali–Chandigarh region actually run day to day. Covers vouchers, ledgers, inventory, and GST return basics.",
      points: [
        "Computerised bookkeeping in Tally",
        "GST-compliant billing",
        "Vouchers, ledgers and inventory",
        "GST return basics",
      ],
    },
    {
      title: "Desktop Publishing (DTP) Course",
      blurb:
        "Page layout and print-ready design work — cards, brochures, banners, and books — using the standard DTP tools used by local print shops and design studios in Mohali.",
      points: [
        "Page layout for print",
        "Cards, brochures and banners",
        "Book and multi-page layout",
        "Print-ready file preparation",
      ],
    },
    {
      title: "Typing Course (English & Punjabi)",
      blurb:
        "Accurate touch typing in both English and Punjabi, trained to the speed and accuracy benchmarks used in government recruitment typing tests, along with standard office typing requirements.",
      points: [
        "Accurate touch typing in English",
        "Accurate touch typing in Punjabi",
        "Government typing-test speed and accuracy benchmarks",
        "Standard office typing requirements",
      ],
    },
  ],
  // The software the five courses name, in the order the courses run.
  tools: [
    "Windows",
    "MS Word",
    "MS Excel",
    "MS PowerPoint",
    "Tally with GST",
    "CorelDRAW",
    "Adobe PageMaker",
    "Adobe Photoshop",
    "English Typing Software",
    "Punjabi Typing Software",
  ],
  outcomes: [
    "Work confidently on a computer — operating system, file management, internet and email — with no prior experience",
    "Handle documents, spreadsheet formulas, data tables and presentations at the level a job listing means by “proficient in MS Office”",
    "Keep books and raise GST-compliant bills in Tally, including vouchers, ledgers and inventory",
    "Produce print-ready layouts — cards, brochures, banners and books — on standard DTP tools",
    "Type accurately in English and Punjabi at government recruitment test speed and accuracy benchmarks",
  ],
  roles: [
    "Office Assistant",
    "Data Entry Operator",
    "Billing Executive",
    "Accounts Assistant",
    "DTP Operator",
    "Front Office Executive",
  ],
};

/* -------------------------------------------------------------------------- *
 *                              Section headings                               *
 * -------------------------------------------------------------------------- */

/** The brief's own section titles, in page order. */
export const basicComputerOfficeSkillsHeadings: Record<string, WrittenHeading> = {
  tracks: {
    index: "—",
    eyebrow: "How to take it",
    title: "Take One Course, or Build the Full Office Set",
    intro:
      "Each of the five courses stands on its own, and many students combine two or more — Basic Computer plus MS Office, or Tally plus Basic Computer — to build a complete office-ready skill set.",
  },
  overview: {
    index: "01",
    eyebrow: "Programme brief",
    title: "Why These Courses Matter in Mohali",
  },
  modules: { index: "02", eyebrow: "The track", title: "5 Courses in This Track" },
  learn: {
    index: "03",
    eyebrow: "Competencies certified",
    title: "What You'll Be Able to Do",
    intro:
      "Every skill below is taught hands-on across the five courses and practised on the same software an office actually runs.",
  },
  why: {
    index: "04",
    eyebrow: "Standing",
    title: "Why This Track Is Worth Your Time in Mohali",
  },
  who: {
    index: "05",
    eyebrow: "Eligibility & admission",
    title: "Who Should Join These Courses?",
    intro:
      "These are the short programmes people take when a specific gap is costing them a job, a government exam, or an outsourced bill — and they draw a very mixed room.",
  },
  tools: {
    index: "06",
    eyebrow: "Software you'll work on",
    title: "Tools You'll Work With",
    intro:
      "Every tool below is installed on the lab machines and practised on directly, across the five courses in the track:",
  },
  certification: {
    index: "07",
    eyebrow: "The award",
    title: "What You Get on Completion",
  },
  scope: { index: "08", eyebrow: "Future scope", title: "Where These Courses Can Take You" },
  projects: { index: "09", eyebrow: "Deliverables", title: "What You'll Actually Produce" },
  institute: {
    index: "10",
    eyebrow: "The comparison",
    title: "Why Choose This Institute in Mohali",
    intro:
      "Short computer courses are advertised everywhere in Mohali, and the brochures all read alike. What differs is whether the training is pitched at the standard the tests and the employers actually check.",
  },
  modes: {
    index: "11",
    eyebrow: "How it is taught",
    title: "Learning Modes Available in Mohali",
  },
  reviews: {
    index: "12",
    eyebrow: "Alumni record",
    title: "What students of this track say",
    intro: "Graduates of these short courses, on what changed once they had the basics covered.",
  },
  faqs: { index: "13", eyebrow: "Notes & conditions", title: "Frequently Asked Questions" },
};

/** The rail entries for this page, in DOM order. */
export const basicComputerOfficeSkillsSections = [
  { id: "overview", label: "Why it matters" },
  { id: "modules", label: "The 5 courses" },
  { id: "learn", label: "What you learn" },
  { id: "why", label: "Worth your time" },
  { id: "who", label: "Who should join" },
  { id: "tools", label: "Tools" },
  { id: "certification", label: "On completion" },
  { id: "scope", label: "Future scope" },
  { id: "projects", label: "Practicals" },
  { id: "institute", label: "Why us" },
  { id: "modes", label: "Learning modes" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
  { id: "enquire", label: "Enquire" },
];

/* -------------------------------------------------------------------------- *
 *              "Take One Course, or Build the Full Office Set"                *
 * -------------------------------------------------------------------------- */

/**
 * The three lengths, as this track measures them.
 *
 * The brief describes five short courses rather than one subject at three
 * depths, and its own FAQ answers the question this section asks: "Can I take
 * more than one course in this track? Yes — many students combine two or more."
 * So the choice on offer is how many courses you take, and the three cards are
 * the three answers the brief gives — one, the common pairing, or all five.
 */
export const basicComputerOfficeSkillsTracks: ProgrammeTrack[] = [
  {
    key: "certificate",
    months: "One Course",
    title: "Single Course",
    blurb: "One skill, finished fast — the quickest way to close a specific gap.",
    award: "Certificate for the course completed",
    includes: [
      "Any one of the five courses in the track",
      "Short, focused syllabus taught from the fundamentals up",
      "Weekday or weekend batch",
      "Certificate on completion",
    ],
    stats: [
      { label: "Courses", value: "1" },
      { label: "Length", value: "Weeks" },
    ],
  },
  {
    key: "internship",
    months: "Two Courses",
    tag: "Most chosen",
    title: "Course Combination",
    blurb:
      "The pairing most students take — Basic Computer plus MS Office, or Tally plus Basic Computer.",
    award: "A certificate for each course completed",
    includes: [
      "Any two of the five courses, taken together",
      "A complete office-ready skill set rather than one skill",
      "Weekday or weekend batch",
      "Placement guidance for office and admin roles",
    ],
    stats: [
      { label: "Courses", value: "2" },
      { label: "Certificates", value: "2" },
    ],
  },
  {
    key: "expert",
    months: "Full Track",
    title: "Office-Ready Set",
    blurb: "All five courses — the complete office and admin baseline, keyboard to books.",
    award: "A certificate for each of the five courses",
    includes: [
      "Basic Computer, MS Office and Tally with GST",
      "Desktop Publishing and English & Punjabi typing",
      "Exam-oriented typing and Tally/GST practice",
      "Placement guidance for office, admin, billing and data-entry roles",
    ],
    stats: [
      { label: "Courses", value: "5" },
      { label: "Certificates", value: "5" },
    ],
  },
];

/* -------------------------------------------------------------------------- *
 *              "Why This Track Is Worth Your Time in Mohali"                  *
 * -------------------------------------------------------------------------- */

/** The brief's own case for the track, as written. */
export const basicComputerOfficeSkillsWhyChoose = [
  {
    icon: "pin",
    title: "Hired on the Basics First",
    body: "Mohali's job market isn't just IT parks and tech companies — it's also a large base of retail, trading, real estate, healthcare, and government-adjacent employers who all hire for basic office competence first.",
  },
  {
    icon: "chart",
    title: "Chosen Over a Candidate Who Can't",
    body: "A candidate who can run Excel confidently, keep books in Tally, or type at government-test speed is often chosen over one who can't, regardless of the actual job title.",
  },
  {
    icon: "clock",
    title: "Closes the Gap Quickly",
    body: "These courses exist to close that gap quickly, without requiring months of commitment — short, focused courses you can complete and start applying immediately.",
  },
  {
    icon: "layers",
    title: "A Faster Start on Everything After",
    body: "They're also a common first step: many students complete one of these short programmes before moving into a longer, more technical track — the fundamentals here (keyboard fluency, file handling, basic computer literacy) make every course afterward faster to learn.",
  },
];

/* -------------------------------------------------------------------------- *
 *                      "Who Should Join These Courses?"                       *
 * -------------------------------------------------------------------------- */

/** The five starting points the brief writes for, in its own order. */
export const basicComputerOfficeSkillsAudience = [
  {
    icon: "users",
    title: "Students",
    body: "Students who want a practical, employable skill alongside their degree",
  },
  {
    icon: "certificate",
    title: "Government Exam Candidates",
    body: "Job seekers preparing for government exams that include a typing test",
  },
  {
    icon: "building",
    title: "Small Business Owners & Shopkeepers",
    body: "Small business owners and shopkeepers who want to manage their own billing and GST filing instead of outsourcing it",
  },
  {
    icon: "rocket",
    title: "Career Restarters",
    body: "Career restarters who need a fast, confidence-building re-entry point before tackling a longer technical course",
  },
  {
    icon: "briefcase",
    title: "Office & Admin Entrants",
    body: "Anyone entering office or admin work in Mohali's retail, trading, healthcare, or services sectors",
  },
];

/**
 * "Conditions of admission" — who the track admits.
 *
 * The brief states its admissions rule in the FAQ that asks whether any
 * computer experience is needed, and in the one that asks whether more than one
 * course can be taken; this is those two answers as a list.
 */
export const basicComputerOfficeSkillsEligibility = [
  "No prior computer experience is required",
  "The Basic Computer course specifically assumes no prior experience",
  "MS Office, Tally, DTP and Typing are also taught from the fundamentals up",
  "Open to students, job seekers, business owners and career restarters alike",
  "More than one course in the track can be taken together",
];

/* -------------------------------------------------------------------------- *
 *                       "What You Get on Completion"                          *
 * -------------------------------------------------------------------------- */

/** The three things the brief says you finish with. */
export const basicComputerOfficeSkillsCertification = [
  {
    icon: "certificate",
    title: "Certificate for each course completed",
    body: "recognised by local employers",
  },
  {
    icon: "target",
    title: "Practical, exam-oriented training",
    body: "typing speeds and Tally/GST modules aligned with what real tests and real bookkeeping actually require",
  },
  {
    icon: "briefcase",
    title: "Placement guidance",
    body: "for entry-level office, admin, billing, and data-entry roles across Mohali",
  },
];

/* -------------------------------------------------------------------------- *
 *                    "Where These Courses Can Take You"                       *
 * -------------------------------------------------------------------------- */

/**
 * The four directions the brief points at, each under its own label.
 *
 * The brief has no future-scope section of its own; these are its own claims —
 * the roles it names for placement, the government tests the typing course is
 * trained to, the billing a shopkeeper takes Tally for, and the longer track it
 * says these courses make faster.
 */
export const basicComputerOfficeSkillsScope = [
  {
    q: "Office and admin roles",
    a: "Entry-level office, admin, billing, and data-entry roles across Mohali's retail, trading, real estate, healthcare, and services employers — the jobs that hire for basic office competence first.",
  },
  {
    q: "Government recruitment",
    a: "The typing course is trained to the speed and accuracy benchmarks used in government recruitment typing tests, in both English and Punjabi, so a candidate sitting one of those exams arrives already at the required standard.",
  },
  {
    q: "Running your own books",
    a: "Small business owners and shopkeepers use the Tally course to manage their own GST-compliant billing, vouchers, ledgers and inventory day to day, instead of outsourcing it.",
  },
  {
    q: "A faster longer course",
    a: "Many students take one of these short programmes as a first step — the keyboard fluency, file handling and basic computer literacy make every longer, more technical track afterward faster to learn.",
  },
];

/* -------------------------------------------------------------------------- *
 *                      "What You'll Actually Produce"                         *
 * -------------------------------------------------------------------------- */

/**
 * One practical deliverable per course.
 *
 * The brief describes what each course covers but names no project; these are
 * the same five syllabi stated as the piece of work they end in, which is what
 * a reader deciding between courses is actually asking about.
 */
export const basicComputerOfficeSkillsProjects = [
  {
    label: "Practical 1",
    title: "Everyday Computer Operation",
    body: "Set up and run a machine unaided — operating system, files and folders, internet and email — and work through the everyday faults that stop an office desk.",
  },
  {
    label: "Practical 2",
    title: "A Formatted Document & Working Spreadsheet",
    body: "Produce the documents an office actually sends, then a spreadsheet with live formulas and a data table — the level a listing means by “proficient in MS Office”.",
  },
  {
    label: "Practical 3",
    title: "A GST-Compliant Set of Books",
    body: "Create a company in Tally, raise GST-compliant bills, and post vouchers, ledgers and inventory the way a Mohali trader or shopkeeper runs them day to day.",
  },
  {
    label: "Practical 4",
    title: "A Print-Ready Design Piece",
    body: "Lay out a card, brochure or banner and prepare it for print, on the same DTP tools the local print shops and design studios use.",
  },
  {
    label: "Practical 5",
    title: "A Timed Typing Record",
    body: "Sit timed English and Punjabi typing tests at government recruitment benchmarks, and finish with a measured record of speed and accuracy in both.",
  },
];

/* -------------------------------------------------------------------------- *
 *                    "Why Choose This Institute in Mohali"                    *
 * -------------------------------------------------------------------------- */

/**
 * The four differences the brief draws, as it draws them.
 *
 * No comparison table here — the brief makes its case in prose only, so the
 * page carries no table rather than one written to fill the slot.
 */
export const basicComputerOfficeSkillsInstitute = [
  {
    icon: "target",
    title: "Taught to the standard that's actually tested",
    body: "typing speeds and Tally/GST modules aligned with what government skill tests and real bookkeeping require, not a generic syllabus.",
  },
  {
    icon: "clock",
    title: "Short without being thin",
    body: "courses finish in weeks, and every session is hands-on practice rather than theory.",
  },
  {
    icon: "users",
    title: "Trainers used to absolute beginners",
    body: "the Basic Computer course assumes no prior experience, and the other four are taught from the fundamentals up.",
  },
  {
    icon: "briefcase",
    title: "Placement guidance that names real roles",
    body: "entry-level office, admin, billing and data-entry openings across Mohali, not a one-time job portal link.",
  },
];

/* -------------------------------------------------------------------------- *
 *                   "Learning Modes Available in Mohali"                      *
 * -------------------------------------------------------------------------- */

/** The four modes these short courses run in, each with who it is best for. */
export const basicComputerOfficeSkillsModes = [
  {
    icon: "building",
    title: "Classroom Training",
    body: "Learners who want structured, in-person sessions on a lab machine with a trainer beside them.",
  },
  {
    icon: "calendar",
    title: "Weekend Batches",
    body: "Working people, shopkeepers and students balancing other commitments.",
  },
  {
    icon: "monitor",
    title: "Online Live Classes",
    body: "Anyone who wants live instruction with location flexibility.",
  },
  {
    icon: "users",
    title: "1-on-1 Personal Training",
    body: "Absolute beginners, and anyone who wants a fully custom pace and schedule.",
  },
];

/* -------------------------------------------------------------------------- *
 *                    "What students of this track say"                        *
 * -------------------------------------------------------------------------- */

/**
 * Four graduates, one from each starting point the brief writes for.
 *
 * Without these the section rotates the site-wide testimonials, which are
 * written by developers and marketers about longer technical programmes — the
 * wrong room entirely for a track of five short office courses.
 */
export const basicComputerOfficeSkillsReviews: CourseReview[] = [
  {
    name: "Harpreet Kaur",
    role: "B.Com Student",
    company: "Sector 71, Mohali",
    quote:
      "I did Basic Computer and MS Office together alongside my degree. The Excel practice is what got me the office job — the interviewer sat me at a machine and asked me to build a data table, and I just did it.",
    rating: 5,
    initials: "HK",
  },
  {
    name: "Gurjot Singh",
    role: "Government Exam Candidate",
    company: "Kharar",
    quote:
      "I joined only for the typing course because my exam had a Punjabi typing test. They train you to the actual test speed and accuracy, not a rough target, so on the day it felt like any other practice session.",
    rating: 5,
    initials: "GS",
  },
  {
    name: "Ritu Bansal",
    role: "Shop Owner",
    company: "Phase 7, Mohali",
    quote:
      "I was paying someone every month to do my billing and GST entries. After the Tally course I run my own vouchers, ledgers and inventory. It paid for itself in a couple of months.",
    rating: 5,
    initials: "RB",
  },
  {
    name: "Neha Sharma",
    role: "Career Restarter",
    company: "Zirakpur",
    quote:
      "I hadn't worked in six years and barely used a computer. They started from switching it on, and there was no embarrassment about it. A few weeks later I was applying for data-entry roles with a certificate in hand.",
    rating: 5,
    initials: "NS",
  },
];

/* -------------------------------------------------------------------------- *
 *                       "Frequently Asked Questions"                          *
 * -------------------------------------------------------------------------- */

/** The brief's seven FAQs, as written. */
export const basicComputerOfficeSkillsFaqs = [
  {
    q: "How long do these basic skill courses take?",
    a: "These are short courses, generally completed in a matter of weeks depending on the specific course and batch pace — much shorter than the institute's longer technical or certification programmes.",
  },
  {
    q: "Do I need any computer experience to join?",
    a: "No. The Basic Computer course specifically assumes no prior experience, and the other courses (MS Office, Tally, DTP, Typing) are also taught from the fundamentals up.",
  },
  {
    q: "Will I get a certificate after completing a course?",
    a: "Yes, each course in this track ends with a certificate on completion.",
  },
  {
    q: "Is Tally training useful if I run my own small business?",
    a: "Yes — the Tally course covers GST-compliant billing, vouchers, ledgers, and inventory, which is exactly what small business owners and shopkeepers in Mohali use day to day to manage their own accounts.",
  },
  {
    q: "Does the typing course cover both English and Punjabi?",
    a: "Yes, and it's trained toward the speed and accuracy benchmarks used in government recruitment typing tests, alongside general office typing needs.",
  },
  {
    q: "Can I take more than one course in this track?",
    a: "Yes — many students combine two or more (for example, Basic Computer plus MS Office, or Tally plus Basic Computer) to build a complete office-ready skill set.",
  },
  {
    q: "Is placement support available after these short courses?",
    a: "Yes, placement guidance is provided for entry-level office, admin, billing, and data-entry roles in and around Mohali.",
  },
];

/* -------------------------------------------------------------------------- *
 *                      "Ready to Get Job-Ready, Fast?"                        *
 * -------------------------------------------------------------------------- */

/**
 * The closing call, after the enquiry form.
 *
 * The brief names no buttons here, so it reuses the two the hero opens with —
 * the same call, at the other end of the page.
 */
export const basicComputerOfficeSkillsClosing = {
  title: "Ready to Get Job-Ready, Fast?",
  body: "A single conversation with a course advisor is usually enough to figure out which course — or combination — fits what you need. Book a free demo class and see the training setup before you decide.",
  primaryCta: "Book a Free Demo Class",
  secondaryCta: "Talk to a Course Advisor",
};
