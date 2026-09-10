import type { CourseOverride } from "@/lib/content/overrides";
import type { WrittenCertificateHero, WrittenHeading } from "@/lib/content/mernCertificate";

/**
 * The Certificate Programs menu's Digital Marketing page, at
 * `/courses/certificate-programs/digital-marketing`.
 *
 * The same catalogue course the Courses menu lists, written to its own brief:
 * SEO, social media marketing, paid advertising, content marketing, email
 * marketing, website analytics and digital branding, taught through practical
 * exercises, campaign concepts and project-based training.
 *
 * No `comparison`: this brief makes its case in prose only. No `tracks`
 * export either — the brief names no specific 3/6/9-month breakdown, so
 * `@/lib/certificateTracks` derives the three lengths from this record's own
 * module and tool counts rather than from an invented one.
 */

/* -------------------------------------------------------------------------- *
 *                                    Hero                                     *
 * -------------------------------------------------------------------------- */

export const digitalMarketingCertificateHero: WrittenCertificateHero = {
  title: "Digital Marketing Training in Mohali — Practical Skills for Online Marketing",
  lead: "Businesses increasingly depend on digital channels to reach customers, promote products and services, generate leads and build their online presence. This programme is built around practical exercises, live campaign concepts, marketing tools, assignments, case studies and project-based training — for beginners and learners who want to build a professional career in Digital Marketing.",
  primaryCta: "Book My Free Counselling Call",
  secondaryCta: "Request a Callback",
  points: [
    "Practical exercises, SEO activities, social media tasks and campaign-based assignments",
    "Hands-on practice across SEO, keyword research, social media marketing, content planning and analytics",
    "Project-based training applied to websites, businesses, products and online brands",
    "Interview preparation, resume guidance and career support alongside the technical curriculum",
  ],
  highlights: [
    { icon: "monitor", label: "Mode", value: "Classroom & Online" },
    { icon: "target", label: "Focus", value: "SEO, Social & Ads" },
    { icon: "terminal", label: "Training", value: "Practical & Job-Oriented" },
    { icon: "briefcase", label: "Includes", value: "Placement Assistance" },
  ],
};

/* -------------------------------------------------------------------------- *
 *                            The catalogue record                             *
 * -------------------------------------------------------------------------- */

export const digitalMarketingCertificateOverride: CourseOverride = {
  contentKey: "digital-marketing--certificate",
  duration: "3 – 9 Months",
  level: "Beginner",
  blurb:
    "SEO, social media marketing, Google Ads, content marketing, email marketing and analytics — practical, campaign-based digital marketing training in Mohali.",
  overview:
    "The Digital Marketing Diploma Program in Mohali is designed to help students and professionals build practical skills in online marketing, search engine optimization, social media marketing, paid advertising, content marketing, email marketing, website analytics and digital branding. At Techcadd, Mohali, students learn through practical exercises, live campaign concepts, marketing tools, assignments, case studies and project-based training. From understanding how search engines work to creating social media campaigns, optimizing websites, running online advertisements, analyzing marketing data and developing digital strategies, this diploma program helps learners build practical and industry-relevant digital marketing knowledge.",
  modules: [
    {
      title: "Digital Marketing Fundamentals & SEO",
      blurb: "How digital channels work, and how search engines rank a page.",
      points: [
        "Digital marketing channels, customer journey, funnel and lead generation concepts",
        "Search Engine Optimization — keyword research, on-page, off-page and technical SEO",
        "Local SEO — Google Business Profile, NAP consistency, local citations and reviews",
      ],
    },
    {
      title: "Social Media & Paid Advertising",
      blurb: "Building an audience, and paying to reach one.",
      points: [
        "Social media strategy across Facebook, Instagram, LinkedIn and YouTube",
        "Content planning, calendars, engagement and social media analytics",
        "Google Ads and paid advertising — keyword targeting, ad copy, budgets and optimization",
      ],
    },
    {
      title: "Content, Email & Website Optimization",
      blurb: "What you publish, what you send, and where it lands.",
      points: [
        "Content marketing — strategy, SEO content, copywriting and content distribution",
        "Email marketing — list building, lead nurturing, campaigns and marketing automation concepts",
        "Landing pages, calls-to-action, conversion optimization and lead generation forms",
      ],
    },
    {
      title: "Analytics, Branding & Projects",
      blurb: "Measuring what worked, and putting a campaign together end to end.",
      points: [
        "Google Analytics and marketing analytics — traffic, campaign tracking and KPIs",
        "Online reputation and brand building, affiliate marketing fundamentals",
        "Practical digital marketing projects — SEO, social campaigns, ads and strategy",
      ],
    },
  ],
  tools: [
    "Google Search Console",
    "Google Analytics",
    "Google Ads",
    "Google Business Profile",
    "Social media platforms (Meta, LinkedIn, YouTube)",
    "SEO & keyword research tools",
    "Email marketing platforms",
  ],
  outcomes: [
    "Plan and execute an SEO strategy — keyword research, on-page, off-page and local SEO",
    "Build and run a social media marketing and paid advertising campaign",
    "Write and distribute content and email campaigns aligned to a marketing strategy",
    "Read campaign analytics and optimize a digital marketing campaign using the data",
  ],
  roles: [
    "Digital Marketing",
    "SEO",
    "Social Media Marketing",
    "Search Engine Marketing",
    "Content Marketing",
    "Marketing Analytics",
  ],
};

/* -------------------------------------------------------------------------- *
 *                              Section headings                               *
 * -------------------------------------------------------------------------- */

export const digitalMarketingCertificateHeadings: Record<string, WrittenHeading> = {
  tracks: {
    index: "—",
    eyebrow: "Programme lengths",
    title: "Choose Your Digital Marketing Track in Mohali",
    intro:
      "One subject, three depths. Each track builds on the last, so a shorter option costs you scope, not foundation.",
  },
  overview: { index: "01", eyebrow: "Programme brief", title: "Course Overview" },
  modules: { index: "02", eyebrow: "Syllabus of record", title: "What You'll Actually Build" },
  learn: {
    index: "03",
    eyebrow: "Competencies covered",
    title: "What You'll Learn in Digital Marketing Diploma Program",
  },
  why: { index: "04", eyebrow: "Standing", title: "Why Choose a Digital Marketing Diploma Program?" },
  who: {
    index: "05",
    eyebrow: "Eligibility & admission",
    title: "Who Can Do This Digital Marketing Diploma Program?",
    intro:
      "No advanced digital marketing background is required to start. Basic computer and internet knowledge can be helpful but is not mandatory for beginners.",
  },
  tools: {
    index: "06",
    eyebrow: "Platforms & tools",
    title: "Platforms & Tools You'll Work With",
    intro: "Depending on the training module, students may get practical exposure to:",
  },
  certification: { index: "07", eyebrow: "The award", title: "Certification & Support" },
  scope: { index: "08", eyebrow: "Career areas", title: "Where This Course Can Take You" },
  projects: { index: "09", eyebrow: "Deliverables", title: "Hands-On Projects You Will Ship" },
  institute: {
    index: "10",
    eyebrow: "The comparison",
    title: "Why Choose Techcadd for Digital Marketing Training in Mohali",
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

export const digitalMarketingCertificateSections = [
  { id: "overview", label: "Overview" },
  { id: "modules", label: "What you build" },
  { id: "learn", label: "What you learn" },
  { id: "why", label: "Worth your time" },
  { id: "who", label: "Who should join" },
  { id: "tools", label: "Platforms" },
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
 *               "Why Choose a Digital Marketing Diploma Program?"             *
 * -------------------------------------------------------------------------- */

export const digitalMarketingCertificateWhyChoose = [
  {
    icon: "target",
    title: "Digital Channels Are How Business Finds Customers Now",
    body: "Businesses increasingly depend on digital channels to reach customers, promote products and services, generate leads and build their online presence — a skill set that spans well beyond marketing job titles.",
  },
  {
    icon: "terminal",
    title: "Learn by Doing, Not Just Reading",
    body: "The programme focuses on practical learning so students can understand how digital marketing strategies are planned, implemented, monitored and optimized — not concepts alone.",
  },
  {
    icon: "layers",
    title: "One Foundation, Every Channel",
    body: "SEO, social media, paid advertising, content, email and analytics are taught as one connected strategy, not isolated tools — the way a real campaign is actually run.",
  },
  {
    icon: "briefcase",
    title: "Support From Fundamentals to Career",
    body: "Interview-oriented preparation, digital marketing discussions, resume guidance, practical assignments and career support alongside the technical curriculum.",
  },
];

/* -------------------------------------------------------------------------- *
 *              "Who Can Do This Digital Marketing Diploma Program?"           *
 * -------------------------------------------------------------------------- */

export const digitalMarketingCertificateAudience = [
  {
    icon: "users",
    title: "12th-Pass Students & Graduates",
    body: "Students interested in Digital Marketing, and BCA, BBA, B.Com, B.A. and other graduates, including MBA and management students.",
  },
  {
    icon: "rocket",
    title: "Freshers & Career Changers",
    body: "Freshers looking for digital marketing career opportunities, and traditional marketing, sales and business development professionals adding digital skills.",
  },
  {
    icon: "briefcase",
    title: "Business Owners & Entrepreneurs",
    body: "Business owners, entrepreneurs and freelancers who want to run their own marketing rather than outsource it entirely.",
  },
  {
    icon: "code",
    title: "Content Creators & Social Media Enthusiasts",
    body: "Content creators, social media enthusiasts and website owners looking to grow an audience with a structured approach.",
  },
  {
    icon: "terminal",
    title: "IT Professionals",
    body: "IT professionals looking to add marketing skills alongside their technical background.",
  },
  {
    icon: "certificate",
    title: "Anyone Building a Digital Marketing Career",
    body: "No advanced digital marketing background is required — basic computer and internet knowledge helps but isn't mandatory for beginners.",
  },
];

export const digitalMarketingCertificateEligibility = [
  "12th-pass students interested in Digital Marketing, and graduates across BCA, BBA, B.Com, B.A. and management streams",
  "Freshers looking for digital marketing career opportunities",
  "Business owners, entrepreneurs and freelancers interested in digital marketing",
  "Social media enthusiasts, content creators and website owners",
  "Traditional marketing, sales, business development and IT professionals adding marketing skills",
  "No advanced digital marketing background required — basic computer and internet knowledge helps but is not mandatory",
];

/* -------------------------------------------------------------------------- *
 *                        "Certification & Support"                            *
 * -------------------------------------------------------------------------- */

export const digitalMarketingCertificateCertification = [
  {
    icon: "certificate",
    title: "Course completion certificate",
    body: "issued on completing the programme, subject to the institute's certification requirements",
  },
  {
    icon: "layers",
    title: "Portfolio of marketing work",
    body: "SEO audits, keyword research, social campaigns, ad plans and analytics reports you can show in an interview",
  },
  {
    icon: "users",
    title: "Doubt-clearing & interview preparation",
    body: "trainer-led doubt-clearing sessions and interview-oriented preparation alongside the technical curriculum",
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

export const digitalMarketingCertificateScope = [
  {
    q: "Job roles",
    a: "Depending on your skills, qualifications and experience, career areas can include Digital Marketing, SEO, Social Media Marketing, Search Engine Marketing, Content Marketing, Email Marketing, Digital Advertising, Local SEO, Marketing Analytics and Online Branding.",
  },
  {
    q: "Where the skills apply",
    a: "Organisations across almost every industry use digital channels to build awareness, reach customers, generate leads and promote products and services, so these skills are not confined to marketing-titled roles.",
  },
  {
    q: "Career growth",
    a: "A solid digital marketing foundation is often the starting point for deeper specialisation — including SEO, paid advertising and marketing analytics — once the fundamentals are in place.",
  },
];

/* -------------------------------------------------------------------------- *
 *                   "Hands-On Projects You Will Ship"                         *
 * -------------------------------------------------------------------------- */

export const digitalMarketingCertificateProjects = [
  {
    label: "Project 1",
    title: "SEO Website Optimization",
    body: "Keyword research and an on-page, off-page and local SEO plan for a real or sample website.",
  },
  {
    label: "Project 2",
    title: "Social Media Campaign",
    body: "Plan and build a social media campaign, including content calendar and engagement strategy.",
  },
  {
    label: "Project 3",
    title: "Google Ads Campaign Plan",
    body: "Structure a paid advertising campaign — keyword targeting, ad copy, budget and conversion tracking concepts.",
  },
  {
    label: "Project 4",
    title: "Digital Marketing Strategy Project",
    body: "A complete digital marketing project bringing together SEO, content, social, ads and analytics for one brand.",
  },
];

/* -------------------------------------------------------------------------- *
 *        "Why Choose Techcadd for Digital Marketing Training in Mohali"       *
 * -------------------------------------------------------------------------- */

export const digitalMarketingCertificateInstitute = [
  {
    icon: "terminal",
    title: "Practical & job-oriented training",
    body: "students work on practical marketing exercises, SEO activities, social media tasks, advertising concepts, content strategies and campaign-based assignments.",
  },
  {
    icon: "users",
    title: "Experienced trainers",
    body: "trainer guidance, practical demonstrations, assignments and doubt-clearing support throughout the programme.",
  },
  {
    icon: "layers",
    title: "Project-based training",
    body: "practical projects that help students understand how digital marketing strategies apply to websites, businesses, products and online brands.",
  },
  {
    icon: "briefcase",
    title: "Career guidance",
    body: "interview-oriented preparation, digital marketing discussions, resume guidance and career support.",
  },
];

/* -------------------------------------------------------------------------- *
 *                      "Classroom & Online Learning"                          *
 * -------------------------------------------------------------------------- */

export const digitalMarketingCertificateModes = [
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

export const digitalMarketingCertificateFaqs = [
  {
    q: "What is a Digital Marketing Diploma Program?",
    a: "A Digital Marketing Diploma Program is a career-focused training program that teaches learners how to promote businesses, products and services through online marketing channels such as SEO, social media, search advertising, content marketing and email marketing.",
  },
  {
    q: "Who can join the Digital Marketing Diploma Program in Mohali?",
    a: "Students after 12th, graduates, freshers, entrepreneurs, freelancers, marketing professionals, business owners and anyone interested in digital marketing can join the program.",
  },
  {
    q: "Do I need coding knowledge for Digital Marketing?",
    a: "No advanced coding knowledge is required. Basic computer and internet knowledge can be helpful, while technical concepts can be learned gradually.",
  },
  {
    q: "Is Digital Marketing suitable for beginners?",
    a: "Yes. A structured Digital Marketing program can introduce beginners to SEO, social media marketing, content marketing, paid advertising, analytics and other digital marketing concepts step by step.",
  },
  {
    q: "What tools are used in Digital Marketing?",
    a: "Depending on the training module, students may get practical exposure to tools and platforms used for SEO, analytics, keyword research, social media, advertising, content creation and website optimization.",
  },
  {
    q: "Will I learn SEO?",
    a: "Yes. SEO can be an important part of the Digital Marketing Diploma Program, including keyword research, on-page SEO, off-page SEO, technical SEO fundamentals, local SEO and SEO reporting.",
  },
  {
    q: "Will the course include practical training?",
    a: "Yes. The program is designed around practical exercises, assignments, campaign concepts, case studies, analytics activities and projects.",
  },
  {
    q: "Can I pursue Digital Marketing after 12th?",
    a: "Yes. Students who have completed 12th can start learning Digital Marketing and gradually develop professional marketing skills.",
  },
  {
    q: "Is Digital Marketing a good career option?",
    a: "Digital Marketing is an important business function because organizations use digital channels to build awareness, reach customers, generate leads and promote products and services.",
  },
  {
    q: "What career areas can I explore after Digital Marketing training?",
    a: "Depending on your skills, qualifications and experience, you can explore areas such as Digital Marketing, SEO, Social Media Marketing, Search Engine Marketing, Content Marketing, Email Marketing, Digital Advertising, Local SEO, Marketing Analytics and Online Branding.",
  },
  {
    q: "Does Techcadd provide Digital Marketing training in Mohali?",
    a: "Yes, Techcadd offers career-focused IT and professional training in Mohali, including Digital Marketing-oriented training with practical learning.",
  },
  {
    q: "Is Digital Marketing training available online?",
    a: "Training availability can depend on the current batch and schedule. Students can enquire about available classroom and online learning options.",
  },
];

/* -------------------------------------------------------------------------- *
 *         "Start Your Digital Marketing Career with Practical Training"       *
 * -------------------------------------------------------------------------- */

export const digitalMarketingCertificateClosing = {
  title: "Start Your Digital Marketing Career with Practical Training",
  body: "Want to build a career in Digital Marketing? Join the Digital Marketing Diploma Program in Mohali at Techcadd and develop practical knowledge of SEO, Social Media Marketing, Google Ads, Content Marketing, Email Marketing, Local SEO, Analytics, Online Branding and digital marketing strategies.",
  primaryCta: "Book My Free Counselling Call",
  secondaryCta: "Request a Callback",
};
