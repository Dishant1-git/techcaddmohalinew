import type { CourseOverride } from "@/lib/content/overrides";
import type { WrittenCertificateHero, WrittenHeading } from "@/lib/content/mernCertificate";

/**
 * The Certificate Programs menu's Full Stack Development page, at
 * `/courses/certificate-programs/full-stack-development`.
 *
 * The same catalogue course the Courses menu lists under Development,
 * written to its own brief: both front-end and back-end web development —
 * HTML, CSS, JavaScript, responsive design, a back-end stack, databases,
 * REST APIs, Git, authentication and deployment fundamentals.
 *
 * A separate record from `mernCertificate.ts` — that page is the MERN-named
 * track this menu has written its own three-tier brief for; this one is the
 * generic "Full Stack Development" catalogue course, written to its own
 * broader-stack brief instead.
 *
 * No `comparison`: this brief makes its case in prose only. No `tracks`
 * export either — the brief names no specific 3/6/9-month breakdown, so
 * `@/lib/certificateTracks` derives the three lengths from this record's own
 * module and tool counts rather than from an invented one.
 */

/* -------------------------------------------------------------------------- *
 *                                    Hero                                     *
 * -------------------------------------------------------------------------- */

export const fullStackDevelopmentCertificateHero: WrittenCertificateHero = {
  title: "Full Stack Development Diploma Program in Mohali — Front-End to Back-End, One Path",
  lead: "Essential web development concepts with hands-on learning in HTML, CSS, JavaScript, responsive web design, databases, server-side programming, APIs, Git and modern full stack development technologies — for students, graduates, beginners, job seekers and working professionals who want a genuine full stack career, not front-end or back-end alone.",
  primaryCta: "Book My Free Counselling Call",
  secondaryCta: "Request a Callback",
  points: [
    "Both front-end and back-end development — HTML, CSS, JavaScript through to server-side programming, databases and APIs",
    "Practical, project-based learning: coding exercises, real-world development scenarios and complete web application projects",
    "No advanced programming background required — beginners can learn web development step by step",
    "Career-focused learning with resume guidance, interview preparation and coding practice",
  ],
  highlights: [
    { icon: "monitor", label: "Mode", value: "Classroom & Online" },
    { icon: "code", label: "Stack", value: "Front-End + Back-End" },
    { icon: "terminal", label: "Training", value: "Practical & Job-Oriented" },
    { icon: "briefcase", label: "Includes", value: "Placement Assistance" },
  ],
};

/* -------------------------------------------------------------------------- *
 *                            The catalogue record                             *
 * -------------------------------------------------------------------------- */

export const fullStackDevelopmentCertificateOverride: CourseOverride = {
  contentKey: "full-stack-development--certificate",
  duration: "3 – 9 Months",
  level: "Beginner",
  blurb:
    "HTML, CSS, JavaScript, responsive design, a back-end stack, databases, REST APIs, Git and deployment fundamentals — the complete front-end-to-back-end path, taught in Mohali.",
  overview:
    "The Full Stack Development Diploma Program in Mohali is designed to help students and professionals build practical skills in both front-end and back-end web development. The program covers essential web development concepts along with hands-on learning in HTML, CSS, JavaScript, responsive web design, databases, server-side programming, APIs, Git and modern full stack development technologies. At Techcadd, Mohali, students learn through practical exercises, real-world development scenarios, coding assignments, projects and industry-oriented training. From designing attractive and responsive websites to developing complete web applications and connecting them with databases and APIs, this diploma program helps learners develop practical full stack development knowledge and project-building capabilities.",
  modules: [
    {
      title: "Web Fundamentals, HTML & CSS",
      blurb: "How the web works, and the markup and styling every page is built from.",
      points: [
        "Web development fundamentals — client-side vs server-side, front-end vs back-end, domains and hosting",
        "HTML — document structure, semantic HTML, forms, lists, tables and HTML5 concepts",
        "CSS & responsive design — box model, Flexbox, CSS Grid, media queries and mobile-friendly layouts",
      ],
    },
    {
      title: "JavaScript & Front-End Development",
      blurb: "Making a page interactive, then building it into an application.",
      points: [
        "JavaScript fundamentals — variables, functions, loops, arrays/objects, DOM manipulation and events",
        "Front-end development — component-based UI, API integration, form handling and client-side validation",
        "Exposure to a modern front-end library such as React.js, depending on the training module",
      ],
    },
    {
      title: "Back-End Development & Databases",
      blurb: "The server side of an application, and where its data lives.",
      points: [
        "Back-end development — routing, request/response handling, authentication concepts and API development, on a stack such as Node.js/Express.js, Python or PHP",
        "Database management — tables, relationships, CRUD operations and SQL fundamentals, with exposure to MySQL, MongoDB or similar",
        "REST API development & integration — HTTP methods, JSON, connecting a front-end to a back-end, and API testing fundamentals",
      ],
    },
    {
      title: "Git, Security, Deployment & Projects",
      blurb: "Version control, keeping an app secure, and shipping it.",
      points: [
        "Git & version control — repositories, commits, branches, merging and GitHub fundamentals",
        "Authentication & web application security — registration, login, sessions/cookies, input validation and secure development practices",
        "Deployment & hosting fundamentals, and full stack projects — business sites, e-commerce, booking systems and database-driven applications",
      ],
    },
  ],
  tools: [
    "HTML5, CSS3 & JavaScript (ES6+)",
    "React.js (exposure)",
    "Node.js / Express.js or Python / PHP",
    "MySQL / MongoDB",
    "Git & GitHub",
    "REST APIs & JSON",
    "VS Code",
  ],
  outcomes: [
    "Build a responsive, multi-page front-end interface with HTML, CSS and JavaScript",
    "Develop a back-end application with routing, authentication concepts and REST API endpoints",
    "Design and query a relational or document database, and connect it to a working application",
    "Version-control a project with Git/GitHub and understand the basics of deploying it to a host",
  ],
  roles: [
    "Full Stack Developer",
    "Web Developer",
    "Front-End Developer",
    "Back-End Developer",
    "Software Developer",
    "API Developer",
  ],
};

/* -------------------------------------------------------------------------- *
 *                              Section headings                               *
 * -------------------------------------------------------------------------- */

export const fullStackDevelopmentCertificateHeadings: Record<string, WrittenHeading> = {
  tracks: {
    index: "—",
    eyebrow: "Programme lengths",
    title: "Choose Your Full Stack Development Track in Mohali",
    intro:
      "One subject, three depths. Each track builds on the last, so a shorter option costs you scope, not foundation.",
  },
  overview: { index: "01", eyebrow: "Programme brief", title: "Course Overview" },
  modules: { index: "02", eyebrow: "Syllabus of record", title: "What You'll Actually Build" },
  learn: {
    index: "03",
    eyebrow: "Competencies covered",
    title: "What You'll Learn in Full Stack Development Diploma Program",
  },
  why: { index: "04", eyebrow: "Standing", title: "Why Choose a Full Stack Development Diploma Program?" },
  who: {
    index: "05",
    eyebrow: "Eligibility & admission",
    title: "Who Can Do This Full Stack Development Diploma Program?",
    intro:
      "No advanced programming background is required to start. Basic computer knowledge can be helpful, but beginners can learn web development step by step.",
  },
  tools: {
    index: "06",
    eyebrow: "Tools & technologies",
    title: "Technologies You'll Work With",
    intro: "Depending on the course curriculum, students may get practical exposure to:",
  },
  certification: { index: "07", eyebrow: "The award", title: "Certification & Support" },
  scope: { index: "08", eyebrow: "Career areas", title: "Where This Course Can Take You" },
  projects: { index: "09", eyebrow: "Deliverables", title: "Hands-On Projects You Will Ship" },
  institute: {
    index: "10",
    eyebrow: "The comparison",
    title: "Why Choose Techcadd for Full Stack Development Training in Mohali",
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

export const fullStackDevelopmentCertificateSections = [
  { id: "overview", label: "Overview" },
  { id: "modules", label: "What you build" },
  { id: "learn", label: "What you learn" },
  { id: "why", label: "Worth your time" },
  { id: "who", label: "Who should join" },
  { id: "tools", label: "Technologies" },
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
 *              "Why Choose a Full Stack Development Diploma Program?"         *
 * -------------------------------------------------------------------------- */

export const fullStackDevelopmentCertificateWhyChoose = [
  {
    icon: "layers",
    title: "Both Sides of the Stack, Not Just One",
    body: "Companies need developers who can build responsive user interfaces, develop server-side applications, manage databases, create APIs and maintain complete web applications — this program covers all of it, not front-end or back-end alone.",
  },
  {
    icon: "terminal",
    title: "Learn How the Pieces Connect",
    body: "The program focuses on practical learning so students can understand how different technologies work together to build complete web applications, not isolated topics taught separately.",
  },
  {
    icon: "code",
    title: "Real Stack Choices, Not Just Theory",
    body: "Exposure to real back-end technologies (Node.js/Express.js, Python or PHP) and real databases (MySQL or MongoDB), depending on the course curriculum, so the skills map to what teams actually hire for.",
  },
  {
    icon: "briefcase",
    title: "Support From Fundamentals to Career",
    body: "Interview-oriented preparation, coding discussions, resume guidance, technical practice and career support alongside the technical curriculum.",
  },
];

/* -------------------------------------------------------------------------- *
 *          "Who Can Do This Full Stack Development Diploma Program?"          *
 * -------------------------------------------------------------------------- */

export const fullStackDevelopmentCertificateAudience = [
  {
    icon: "users",
    title: "12th-Pass Students & Graduates",
    body: "Students interested in Web Development, and BCA, B.Tech, B.Sc. IT, B.Sc. Computer Science, MCA and other computer-related graduates.",
  },
  {
    icon: "rocket",
    title: "Freshers & Coding Beginners",
    body: "Freshers looking for web development career opportunities, and beginners who want to learn coding from the ground up.",
  },
  {
    icon: "code",
    title: "Front-End Developers & Web Designers",
    body: "Front-end developers who want to learn back-end development, and web designers who want to become full stack developers.",
  },
  {
    icon: "briefcase",
    title: "IT Professionals & Freelancers",
    body: "IT professionals looking to upgrade their development skills, and freelancers interested in website and web application development.",
  },
  {
    icon: "target",
    title: "Entrepreneurs",
    body: "Entrepreneurs who want to understand web technologies well enough to brief, evaluate or build their own products.",
  },
  {
    icon: "certificate",
    title: "Anyone Building Full Stack Skills",
    body: "No advanced programming background is required — basic computer knowledge helps, but beginners can learn web development step by step.",
  },
];

export const fullStackDevelopmentCertificateEligibility = [
  "12th-pass students interested in Web Development, and BCA/B.Tech/B.Sc. IT/B.Sc. Computer Science/MCA graduates",
  "Freshers, coding beginners, and anyone looking for web development career opportunities",
  "Front-end developers moving into back-end, and web designers becoming full stack developers",
  "IT professionals, freelancers and entrepreneurs building practical web development skills",
  "No advanced programming background required — basic computer knowledge helps but is not mandatory",
  "Beginners can learn web development step by step, starting from HTML and CSS fundamentals",
];

/* -------------------------------------------------------------------------- *
 *                        "Certification & Support"                            *
 * -------------------------------------------------------------------------- */

export const fullStackDevelopmentCertificateCertification = [
  {
    icon: "certificate",
    title: "Course completion certificate",
    body: "issued on completing the programme, subject to the institute's certification requirements",
  },
  {
    icon: "layers",
    title: "Portfolio of full stack projects",
    body: "responsive front-ends, a back-end API, and at least one complete database-driven web application you can show in an interview",
  },
  {
    icon: "users",
    title: "Doubt-clearing & interview preparation",
    body: "trainer-led doubt-clearing sessions and interview-oriented, coding-focused preparation alongside the technical curriculum",
  },
  {
    icon: "briefcase",
    title: "Placement assistance",
    body: "career guidance and placement-related support — exact services should be confirmed with the Techcadd Mohali centre",
  },
];

/* -------------------------------------------------------------------------- *
 *                    "Where This Course Can Take You"                         *
 * -------------------------------------------------------------------------- */

export const fullStackDevelopmentCertificateScope = [
  {
    q: "Job roles",
    a: "Depending on your skills, qualifications and experience, career areas can include Full Stack Development, Web Development, Front-End Development, Back-End Development, Software Development, UI Development, API Development and Application Development.",
  },
  {
    q: "Where the skills apply",
    a: "Businesses across almost every industry need websites, web applications, dashboards, e-commerce platforms and other digital solutions, so full stack skills are rarely confined to a single sector.",
  },
  {
    q: "Career growth",
    a: "A genuine front-end-and-back-end foundation is often the starting point for deeper specialisation — a particular framework, cloud deployment, or a specific back-end stack — once the fundamentals are in place.",
  },
];

/* -------------------------------------------------------------------------- *
 *                   "Hands-On Projects You Will Ship"                         *
 * -------------------------------------------------------------------------- */

export const fullStackDevelopmentCertificateProjects = [
  {
    label: "Project 1",
    title: "Responsive Business or Portfolio Website",
    body: "A fully responsive multi-page site built with HTML, CSS and JavaScript, using Flexbox/Grid layouts.",
  },
  {
    label: "Project 2",
    title: "REST API & Back-End Service",
    body: "A back-end application with routing, authentication concepts and CRUD API endpoints on your chosen stack.",
  },
  {
    label: "Project 3",
    title: "Database-Driven Web Application",
    body: "A complete application — e.g. a blog, booking system or student management system — connecting a front-end to a database through APIs.",
  },
  {
    label: "Project 4",
    title: "Deployment-Ready Full Stack Project",
    body: "Version-control a complete project with Git/GitHub and prepare it for deployment, covering environment variables and production basics.",
  },
];

/* -------------------------------------------------------------------------- *
 *      "Why Choose Techcadd for Full Stack Development Training in Mohali"    *
 * -------------------------------------------------------------------------- */

export const fullStackDevelopmentCertificateInstitute = [
  {
    icon: "terminal",
    title: "Practical & job-oriented training",
    body: "students work on coding exercises, web development assignments, application-building tasks and practical projects instead of relying only on theoretical concepts.",
  },
  {
    icon: "users",
    title: "Experienced trainers",
    body: "development concepts taught with trainer guidance, coding demonstrations, practical sessions and doubt-clearing support.",
  },
  {
    icon: "layers",
    title: "Project-based training",
    body: "practical projects that help students understand how different technologies are combined to create real-world websites and web applications.",
  },
  {
    icon: "briefcase",
    title: "Career guidance",
    body: "interview-oriented preparation, coding discussions, resume guidance, technical practice and career support.",
  },
];

/* -------------------------------------------------------------------------- *
 *                      "Classroom & Online Learning"                          *
 * -------------------------------------------------------------------------- */

export const fullStackDevelopmentCertificateModes = [
  {
    icon: "building",
    title: "Classroom Training",
    body: "In-person sessions with hands-on practice, depending on current batch availability.",
  },
  {
    icon: "monitor",
    title: "Online Learning",
    body: "Students can enquire about available classroom and online learning options based on their requirements.",
  },
];

/* -------------------------------------------------------------------------- *
 *                       "Frequently Asked Questions"                          *
 * -------------------------------------------------------------------------- */

export const fullStackDevelopmentCertificateFaqs = [
  {
    q: "What is a Full Stack Development Diploma Program?",
    a: "A Full Stack Development Diploma Program is a career-focused training program that teaches learners how to develop both the front-end and back-end parts of websites and web applications.",
  },
  {
    q: "Who can join the Full Stack Development Diploma Program in Mohali?",
    a: "Students after 12th, graduates, IT learners, freshers, working professionals, web designers and anyone interested in software and web development can join the program.",
  },
  {
    q: "Do I need coding knowledge for Full Stack Development?",
    a: "No advanced coding knowledge is required for beginners. The fundamentals of programming and web development can be learned step by step.",
  },
  {
    q: "Is Full Stack Development suitable for beginners?",
    a: "Yes. A structured Full Stack Development program can introduce beginners to HTML, CSS, JavaScript, databases, back-end development, APIs and project development gradually.",
  },
  {
    q: "What technologies are taught in Full Stack Development?",
    a: "Depending on the course curriculum, students may get practical exposure to HTML, CSS, JavaScript, React.js, Node.js, Express.js, databases, APIs, Git, GitHub and other development technologies.",
  },
  {
    q: "Will I learn front-end and back-end development?",
    a: "Yes. Full Stack Development focuses on both front-end and back-end development, along with database connectivity and API integration.",
  },
  {
    q: "Will the course include practical training?",
    a: "Yes. The program is designed around coding exercises, assignments, demonstrations, application development tasks and practical projects.",
  },
  {
    q: "Can I pursue Full Stack Development after 12th?",
    a: "Yes. Students who have completed 12th can start learning web development and gradually build programming and application development skills.",
  },
  {
    q: "Is Full Stack Development a good career option?",
    a: "Full Stack Development is an important area of software development because businesses require websites, web applications, dashboards, e-commerce platforms and other digital solutions.",
  },
  {
    q: "What career areas can I explore after Full Stack Development training?",
    a: "Depending on your skills, qualifications and experience, you can explore areas such as Full Stack Development, Web Development, Front-End Development, Back-End Development, Software Development, UI Development, API Development and Application Development.",
  },
  {
    q: "Does Techcadd provide Full Stack Development training in Mohali?",
    a: "Yes, Techcadd offers career-focused IT training in Mohali, including Full Stack Development-oriented training with practical learning and project work.",
  },
  {
    q: "Is Full Stack Development training available online?",
    a: "Training availability can depend on the current batch and schedule. Students can enquire about available classroom and online learning options.",
  },
];

/* -------------------------------------------------------------------------- *
 *       "Start Your Full Stack Development Career with Practical Training"    *
 * -------------------------------------------------------------------------- */

export const fullStackDevelopmentCertificateClosing = {
  title: "Start Your Full Stack Development Career with Practical Training",
  body: "Want to build a career in Full Stack Development? Join the Full Stack Development Diploma Program in Mohali at Techcadd and develop practical knowledge of front-end development, back-end development, databases, APIs, Git, web application development and modern development tools.",
  primaryCta: "Book My Free Counselling Call",
  secondaryCta: "Request a Callback",
};
