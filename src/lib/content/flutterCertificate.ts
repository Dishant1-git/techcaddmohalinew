import type { CourseOverride } from "@/lib/content/overrides";
import type { WrittenCertificateHero, WrittenHeading } from "@/lib/content/mernCertificate";

/**
 * The Certificate Programs menu's Flutter App Development page, at
 * `/courses/certificate-programs/flutter`.
 *
 * The same catalogue course the Courses menu lists under Development,
 * written to its own brief: a structured path from Dart and programming
 * fundamentals through Flutter UI development, navigation, state management,
 * APIs, databases, Firebase, authentication and real-world mobile app
 * projects.
 *
 * No `comparison`: this brief makes its case in prose only. No `tracks`
 * export either — the brief names no specific 3/6/9-month breakdown, so
 * `@/lib/certificateTracks` derives the three lengths from this record's own
 * module and tool counts rather than from an invented one.
 */

/* -------------------------------------------------------------------------- *
 *                                    Hero                                     *
 * -------------------------------------------------------------------------- */

export const flutterCertificateHero: WrittenCertificateHero = {
  title: "Flutter App Development Diploma Program in Mohali — Build Real Mobile Apps",
  lead: "A structured learning path from Dart and programming fundamentals to Flutter UI development, navigation, state management, APIs, databases, Firebase, authentication and real-world mobile app development — for students, graduates, beginners, job seekers, working professionals, freelancers and aspiring mobile app developers.",
  primaryCta: "Book My Free Counselling Call",
  secondaryCta: "Request a Callback",
  points: [
    "A complete learning path — Dart → Flutter Fundamentals → UI → Navigation → State Management → APIs → Database → Authentication → Projects → Deployment",
    "Practical, project-based learning: coding exercises, UI development, API integration, database connectivity and debugging",
    "No prior Flutter experience required — the program starts with Dart and programming fundamentals",
    "Career-focused learning with resume preparation, portfolio development and interview preparation",
  ],
  highlights: [
    { icon: "monitor", label: "Mode", value: "Classroom & Online" },
    { icon: "code", label: "Language", value: "Dart & Flutter" },
    { icon: "terminal", label: "Training", value: "Practical & Project-Based" },
    { icon: "briefcase", label: "Level", value: "Beginner to Advanced" },
  ],
};

/* -------------------------------------------------------------------------- *
 *                            The catalogue record                             *
 * -------------------------------------------------------------------------- */

export const flutterCertificateOverride: CourseOverride = {
  contentKey: "flutter--certificate",
  duration: "3 – 9 Months",
  level: "Beginner",
  blurb:
    "Dart, Flutter UI, navigation, state management, REST APIs, databases, Firebase and authentication — a structured, project-based path to shipping real cross-platform apps, taught in Mohali.",
  overview:
    "The Flutter App Development Diploma Program in Mohali provides a structured learning path from programming fundamentals to Flutter development, Dart programming, UI design, responsive layouts, APIs, databases, authentication, state management, testing, debugging and real-world mobile app development. Flutter allows developers to build applications for multiple platforms using a single codebase. Students learn how to create user interfaces, implement app functionality, connect applications with backend services, manage data, integrate APIs and prepare applications for deployment. The program focuses on practical learning rather than theory alone — students work on coding exercises, UI development, practical assignments, API integration, database connectivity, debugging tasks and real-world mobile app projects.",
  modules: [
    {
      title: "Dart & Flutter Fundamentals",
      blurb: "The language Flutter runs on, and the framework's core building blocks.",
      points: [
        "Dart programming — variables, control flow, functions, classes, OOP and exception handling; null safety, futures, async/await and streams",
        "Flutter architecture, widgets, StatelessWidget vs StatefulWidget, the widget tree and hot reload",
        "Flutter UI development — text, buttons, images, containers, rows, columns, cards, lists, forms and app bars",
      ],
    },
    {
      title: "Layout, Navigation & Forms",
      blurb: "Screens that adapt, and the paths users take between them.",
      points: [
        "Responsive layouts — Row, Column, Stack, Expanded, Flexible, ListView, GridView and MediaQuery",
        "Navigation — routes, named routes, passing data between screens and navigation stacks",
        "Forms and user input — text fields, validation, dropdowns, checkboxes and radio buttons",
      ],
    },
    {
      title: "State, APIs & Data",
      blurb: "Keeping an app's data consistent, and talking to a backend.",
      points: [
        "State management — local and shared state, and a state-management approach such as Provider or Riverpod",
        "REST API integration — HTTP GET/POST/PUT/DELETE, JSON parsing and serialization, and error handling",
        "Database integration and local storage — CRUD operations, data models and cloud database concepts",
      ],
    },
    {
      title: "Firebase, Deployment & Projects",
      blurb: "Authentication, shipping, and putting it all together.",
      points: [
        "Firebase integration — authentication, Cloud Firestore, storage and push notifications",
        "Debugging, testing, Git/GitHub version control and app deployment concepts — build and release processes",
        "Real-world Flutter projects — e-commerce, booking, expense-tracker or chat-style applications, and portfolio development",
      ],
    },
  ],
  tools: [
    "Flutter & Dart",
    "Android Studio / VS Code",
    "Firebase",
    "REST APIs & Postman",
    "Git & GitHub",
    "SQLite / local storage",
    "Android SDK",
  ],
  outcomes: [
    "Build a responsive Flutter UI with navigation, forms and validated user input",
    "Manage application state and integrate REST APIs with JSON data end to end",
    "Wire up Firebase authentication and a database for a working data-driven app",
    "Debug, test, version-control and prepare a Flutter application for deployment",
  ],
  roles: [
    "Flutter Developer",
    "Mobile App Developer",
    "Dart Developer",
    "Cross-Platform App Developer",
    "Android App Developer",
    "Freelance App Developer",
  ],
};

/* -------------------------------------------------------------------------- *
 *                              Section headings                               *
 * -------------------------------------------------------------------------- */

export const flutterCertificateHeadings: Record<string, WrittenHeading> = {
  tracks: {
    index: "—",
    eyebrow: "Programme lengths",
    title: "Choose Your Flutter App Development Track in Mohali",
    intro:
      "One subject, three depths. Each track builds on the last, so a shorter option costs you scope, not foundation.",
  },
  overview: { index: "01", eyebrow: "Programme brief", title: "Course Overview" },
  modules: { index: "02", eyebrow: "Syllabus of record", title: "What You'll Actually Build" },
  learn: {
    index: "03",
    eyebrow: "Competencies covered",
    title: "What You'll Learn in the Flutter App Development Diploma Program",
  },
  why: { index: "04", eyebrow: "Standing", title: "Why Choose the Flutter App Development Diploma Program?" },
  who: {
    index: "05",
    eyebrow: "Eligibility & admission",
    title: "Who Can Do This Course?",
    intro:
      "Previous professional Flutter experience is not required — the program can start with Dart and programming fundamentals and gradually progress toward complete Flutter application development.",
  },
  tools: {
    index: "06",
    eyebrow: "Tools & technologies",
    title: "Tools & Technologies Students May Work With",
    intro:
      "Depending on the current Flutter curriculum, students may work with the following — the exact tools should be confirmed with the current Techcadd Mohali batch before treating them as fixed curriculum details:",
  },
  certification: { index: "07", eyebrow: "The award", title: "Certification & Support" },
  scope: { index: "08", eyebrow: "Career opportunities", title: "Career Opportunities After Flutter App Development Training" },
  projects: { index: "09", eyebrow: "Deliverables", title: "Real-World Flutter Projects You Will Ship" },
  institute: {
    index: "10",
    eyebrow: "The comparison",
    title: "Why Choose Techcadd for Flutter App Development Training in Mohali",
  },
  modes: { index: "11", eyebrow: "How it is taught", title: "Classroom & Online Learning" },
  reviews: {
    index: "12",
    eyebrow: "Alumni record",
    title: "What students say",
    intro: "Graduates of this programme, on what the practical approach gave them.",
  },
  faqs: { index: "13", eyebrow: "Notes & conditions", title: "Frequently Asked Questions" },
};

export const flutterCertificateSections = [
  { id: "overview", label: "Overview" },
  { id: "modules", label: "What you build" },
  { id: "learn", label: "What you learn" },
  { id: "why", label: "Worth your time" },
  { id: "who", label: "Who should join" },
  { id: "tools", label: "Tools" },
  { id: "certification", label: "Certification" },
  { id: "scope", label: "Career areas" },
  { id: "projects", label: "Projects" },
  { id: "institute", label: "Why us" },
  { id: "modes", label: "Learning modes" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
  { id: "enquire", label: "Enquire" },
];

/* -------------------------------------------------------------------------- *
 *          "Why Choose the Flutter App Development Diploma Program?"          *
 * -------------------------------------------------------------------------- */

export const flutterCertificateWhyChoose = [
  {
    icon: "layers",
    title: "A Complete App Development Workflow",
    body: "Dart → Flutter Fundamentals → UI Development → Navigation → State Management → APIs → Database → Authentication → Projects → Deployment — the full path a real app needs, not UI design alone.",
  },
  {
    icon: "terminal",
    title: "Practical, Project-Based Learning",
    body: "Students practice writing Dart programs, creating Flutter interfaces, connecting APIs, working with databases, implementing authentication and managing application state — not theory alone.",
  },
  {
    icon: "code",
    title: "One Codebase, Multiple Platforms",
    body: "Flutter lets developers build applications for multiple platforms from a shared codebase — students learn to build, debug and prepare that codebase for deployment.",
  },
  {
    icon: "briefcase",
    title: "Career-Focused, End to End",
    body: "Resume preparation, portfolio development, interview preparation and project presentation sit alongside the technical curriculum.",
  },
];

/* -------------------------------------------------------------------------- *
 *                          "Who Can Do This Course?"                          *
 * -------------------------------------------------------------------------- */

export const flutterCertificateAudience = [
  {
    icon: "users",
    title: "12th-Pass & College Students",
    body: "12th-pass students can begin with programming fundamentals and Dart; BCA, B.Tech, MCA, BSc-IT and BSc students can learn Flutter alongside their academic education.",
  },
  {
    icon: "certificate",
    title: "Graduates & Job Seekers",
    body: "Graduates from technical and non-technical backgrounds can explore mobile and application development; job seekers can build a portfolio of practical mobile applications.",
  },
  {
    icon: "briefcase",
    title: "Working Professionals & Career Switchers",
    body: "Professionals can upgrade their development skills, explore mobile app development, or use Flutter training as a starting point for a career move into app development.",
  },
  {
    icon: "code",
    title: "Web Developers",
    body: "Developers who already understand programming can learn Flutter to expand their skills into mobile application development.",
  },
  {
    icon: "rocket",
    title: "Freelancers & Entrepreneurs",
    body: "Freelancers can learn Flutter to build applications for clients; entrepreneurs can learn app-development fundamentals to better understand how mobile products and MVPs are built.",
  },
  {
    icon: "target",
    title: "Beginners Interested in App Development",
    body: "Anyone curious how Android and iOS applications are built, with no previous app-development experience, can use Flutter as a structured starting point.",
  },
];

export const flutterCertificateEligibility = [
  "12th-pass students, college students (BCA/B.Tech/MCA/BSc-IT/BSc) and graduates from technical or non-technical backgrounds",
  "Job seekers, working professionals and career switchers moving toward mobile application development",
  "Web developers expanding into mobile application development",
  "Freelancers and entrepreneurs building or commissioning mobile applications",
  "Complete beginners with no previous app-development experience",
  "No prior professional Flutter experience required — the program starts with Dart and programming fundamentals",
];

/* -------------------------------------------------------------------------- *
 *                        "Certification & Support"                            *
 * -------------------------------------------------------------------------- */

export const flutterCertificateCertification = [
  {
    icon: "certificate",
    title: "Course completion certificate",
    body: "issued on completing the programme, subject to the institute's certification requirements",
  },
  {
    icon: "layers",
    title: "Portfolio of mobile apps",
    body: "complete applications covering UI development, API integration, database connectivity, authentication and state management — ready to show in an interview",
  },
  {
    icon: "users",
    title: "Trainer guidance & doubt-clearing",
    body: "mobile app development involves UI issues, programming errors, API problems, database connectivity and debugging — trainer guidance helps students work through these step by step",
  },
  {
    icon: "briefcase",
    title: "Resume & interview preparation",
    body: "resume preparation, portfolio building, project presentation and technical interview preparation alongside the technical curriculum",
  },
];

/* -------------------------------------------------------------------------- *
 *        "Career Opportunities After Flutter App Development Training"       *
 * -------------------------------------------------------------------------- */

export const flutterCertificateScope = [
  {
    q: "Job roles",
    a: "After developing the required technical skills, practical applications and portfolio, students can explore roles such as Flutter Developer, Mobile App Developer, Flutter App Developer, Dart Developer, Cross-Platform App Developer, Junior Mobile App Developer, Application Developer, Android App Developer, Software Developer and Freelance App Developer.",
  },
  {
    q: "Where the skills apply",
    a: "Mobile applications are used across almost every industry — education, healthcare, e-commerce, finance, entertainment, travel and business services — so Flutter skills apply well beyond any single sector.",
  },
  {
    q: "Becoming job-ready",
    a: "Career opportunities depend on the learner's technical knowledge, project portfolio, experience, communication skills, specialization and interview performance — this program provides the foundation, not a guarantee.",
  },
];

/* -------------------------------------------------------------------------- *
 *                 "Real-World Flutter Projects You Will Ship"                 *
 * -------------------------------------------------------------------------- */

export const flutterCertificateProjects = [
  {
    label: "Project 1",
    title: "UI-Driven Application",
    body: "Build a responsive, multi-screen Flutter interface with navigation, forms and validated user input.",
  },
  {
    label: "Project 2",
    title: "API-Connected App",
    body: "Integrate a REST API, parse JSON data and display it inside a working Flutter application.",
  },
  {
    label: "Project 3",
    title: "Database & Authentication App",
    body: "Add database connectivity and user authentication — registration, login and protected screens.",
  },
  {
    label: "Project 4",
    title: "Complete Application (e.g. Booking / E-commerce / Expense Tracker)",
    body: "Combine UI, state management, APIs, database and Firebase into one complete, deployable application for your portfolio.",
  },
];

/* -------------------------------------------------------------------------- *
 *      "Why Choose Techcadd for Flutter App Development Training in Mohali"   *
 * -------------------------------------------------------------------------- */

export const flutterCertificateInstitute = [
  {
    icon: "terminal",
    title: "Practical Flutter training",
    body: "focused on practical coding and mobile application development rather than theory alone.",
  },
  {
    icon: "rocket",
    title: "Beginner-friendly learning",
    body: "students can start from Dart and basic programming before progressing toward Flutter and advanced application development.",
  },
  {
    icon: "layers",
    title: "Project-based training",
    body: "opportunities to develop practical mobile applications throughout the learning journey.",
  },
  {
    icon: "briefcase",
    title: "Career-focused approach",
    body: "guidance on resume preparation, portfolio building, interview preparation, technical interview questions, project presentation and career planning.",
  },
];

/* -------------------------------------------------------------------------- *
 *                      "Classroom & Online Learning"                          *
 * -------------------------------------------------------------------------- */

export const flutterCertificateModes = [
  {
    icon: "building",
    title: "Classroom Training",
    body: "In-person sessions with hands-on practice, depending on current batch availability.",
  },
  {
    icon: "monitor",
    title: "Online Learning",
    body: "Classroom and online learning options may be available depending on current batches and schedules — enquire for current availability.",
  },
];

/* -------------------------------------------------------------------------- *
 *                       "Frequently Asked Questions"                          *
 * -------------------------------------------------------------------------- */

export const flutterCertificateFaqs = [
  {
    q: "What is a Flutter App Development Diploma Program?",
    a: "A Flutter App Development Diploma Program teaches students how to build cross-platform mobile applications using Dart and Flutter, along with APIs, databases, authentication, state management, testing, debugging and deployment concepts.",
  },
  {
    q: "Is prior coding experience required?",
    a: "No. Beginners can start with Dart and programming fundamentals before progressing into Flutter application development.",
  },
  {
    q: "Who can join the Flutter App Development Diploma Program?",
    a: "12th-pass students, college students, graduates, BCA/B.Tech/MCA students, job seekers, working professionals, freelancers and beginners interested in mobile app development can join.",
  },
  {
    q: "Can I learn Flutter after 12th?",
    a: "Yes. Students who have completed 12th can start learning Flutter through a structured program beginning with programming fundamentals.",
  },
  {
    q: "What is Flutter?",
    a: "Flutter is a UI toolkit used to build applications for multiple platforms from a shared codebase.",
  },
  {
    q: "What programming language is used in Flutter?",
    a: "Flutter applications are developed using the Dart programming language.",
  },
  {
    q: "Is Flutter difficult for beginners?",
    a: "Flutter includes programming, UI development, state management, APIs and other concepts, so it can be challenging initially. A structured learning path and regular project practice can make the process easier.",
  },
  {
    q: "Does the course include Dart?",
    a: "Yes. Dart programming fundamentals can be taught as the foundation for Flutter development.",
  },
  {
    q: "Does the course include API integration?",
    a: "Yes. Students can learn REST APIs, HTTP requests, JSON, API integration and displaying backend data inside Flutter applications.",
  },
  {
    q: "Does the course include Firebase and databases?",
    a: "Firebase can be included depending on the current curriculum, covering services such as authentication, Firestore, storage and notifications, alongside general database and data-storage concepts.",
  },
  {
    q: "Does the course include state management?",
    a: "Yes. State-management concepts can be included, with the exact framework or approach depending on the current curriculum.",
  },
  {
    q: "Does the program include practical projects?",
    a: "Yes. Students can develop applications such as e-commerce apps, booking apps, expense trackers, management apps, chat applications and business applications.",
  },
  {
    q: "Can I become a Flutter Developer after this course?",
    a: "The program can provide a foundation for Flutter development. Becoming job-ready also requires regular coding practice, strong projects, problem-solving skills and continued learning.",
  },
  {
    q: "Can I freelance as a Flutter Developer?",
    a: "Yes. Flutter skills can be useful for freelance mobile application projects. Successful freelancing also requires a strong portfolio, client communication, project management and practical experience.",
  },
  {
    q: "Does Techcadd provide placement assistance?",
    a: "Placement and career-support services should be confirmed with the current Techcadd Mohali centre before relying on specific placement claims.",
  },
  {
    q: "Is Flutter App Development training available online?",
    a: "Training availability can depend on the current batch and schedule. Students can enquire about available classroom and online learning options.",
  },
];

/* -------------------------------------------------------------------------- *
 *              "Start Your Flutter App Development Career in Mohali"          *
 * -------------------------------------------------------------------------- */

export const flutterCertificateClosing = {
  title: "Start Your Flutter App Development Career in Mohali",
  body: "Don't just use mobile applications — learn how to build them. Learn Dart, Flutter, UI Development, Responsive Design, Navigation, State Management, REST APIs, Databases, Firebase, Authentication, Git, Testing, Deployment and real-world mobile app projects with Techcadd, Mohali.",
  primaryCta: "Book My Free Counselling Call",
  secondaryCta: "Request a Callback",
};
