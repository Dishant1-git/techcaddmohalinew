import type { CourseOverride } from "@/lib/content/overrides";
import type { WrittenCertificateHero, WrittenHeading } from "@/lib/content/mernCertificate";

/**
 * The Certificate Programs menu's Data Analytics page, at
 * `/courses/certificate-programs/data-analytics`.
 *
 * The same catalogue course the Courses menu lists, written to its own
 * brief: a structured path from Excel and data fundamentals through SQL,
 * statistics, Python, data visualization and Power BI dashboards, taught
 * through datasets, queries and real-world analytics projects.
 *
 * No `comparison`: this brief makes its case in prose only. No `tracks`
 * export either — the brief names no specific 3/6/9-month breakdown, so
 * `@/lib/certificateTracks` derives the three lengths from this record's own
 * module and tool counts rather than from an invented one.
 */

/* -------------------------------------------------------------------------- *
 *                                    Hero                                     *
 * -------------------------------------------------------------------------- */

export const dataAnalyticsCertificateHero: WrittenCertificateHero = {
  title: "Data Analytics Diploma Program in Mohali — From Excel to Power BI Dashboards",
  lead: "A structured learning path from Excel and data fundamentals to SQL, Python, statistics, data cleaning, data visualization, dashboards and practical data analytics projects — for students, graduates, beginners, job seekers and working professionals who want to turn raw data into real business decisions.",
  primaryCta: "Book My Free Counselling Call",
  secondaryCta: "Request a Callback",
  points: [
    "A complete analytics learning path — Excel → Data Cleaning → SQL → Statistics → Python → Visualization → Power BI → Dashboards → Projects",
    "Practical, project-based learning: spreadsheets, SQL queries, Python analysis, charts, dashboards and real business datasets",
    "No prior Data Analytics experience required — the program starts with Excel and basic data concepts",
    "Career-focused learning with resume preparation, dashboard-portfolio building and interview preparation",
  ],
  highlights: [
    { icon: "monitor", label: "Mode", value: "Classroom & Online" },
    { icon: "target", label: "Focus", value: "Excel, SQL, Python & Power BI" },
    { icon: "terminal", label: "Training", value: "Practical & Project-Based" },
    { icon: "briefcase", label: "Level", value: "Beginner to Advanced" },
  ],
};

/* -------------------------------------------------------------------------- *
 *                            The catalogue record                             *
 * -------------------------------------------------------------------------- */

export const dataAnalyticsCertificateOverride: CourseOverride = {
  contentKey: "data-analytics--certificate",
  duration: "3 – 9 Months",
  level: "Beginner",
  blurb:
    "Excel, SQL, Python, statistics, data visualization and Power BI dashboards — a structured, practical path to real-world data analytics, taught in Mohali.",
  overview:
    "The Data Analytics Diploma Program in Mohali provides a structured learning path from Excel and data fundamentals to SQL, Python, statistics, data cleaning, data visualization, dashboards and practical data analytics projects. Data Analytics helps organizations turn raw data into useful information. Students learn how to work with datasets, identify patterns and trends, create reports and dashboards, and communicate meaningful insights from data. The program focuses on practical learning rather than theory alone — students work with datasets, analytical exercises, SQL queries, Excel reports, Python programming, dashboards, data visualization, assignments and real-world projects.",
  modules: [
    {
      title: "Excel & Data Fundamentals",
      blurb: "The spreadsheet skills every analyst starts with.",
      points: [
        "Data types, structured vs unstructured data, and data quality fundamentals",
        "Excel formulas and functions — IF, SUMIF, COUNTIF, XLOOKUP, VLOOKUP, INDEX/MATCH",
        "Data cleaning, Pivot Tables, Pivot Charts and interactive reporting",
      ],
    },
    {
      title: "SQL for Data Analysis",
      blurb: "Pulling and shaping data straight from a database.",
      points: [
        "SQL fundamentals — tables, keys, SELECT, WHERE, ORDER BY, GROUP BY, HAVING, aggregate functions",
        "Joins — INNER, LEFT, RIGHT and combining data across multiple tables",
        "Advanced SQL — subqueries, CASE statements, common table expressions and window functions",
      ],
    },
    {
      title: "Statistics & Python for Analytics",
      blurb: "The numbers behind the data, and the code to work it at scale.",
      points: [
        "Statistics for analytics — mean, median, mode, variance, standard deviation, correlation",
        "Python, NumPy and Pandas — data cleaning, filtering, grouping, merging and transformation",
        "Exploratory data analysis — summary statistics, trends, patterns, outliers and correlation analysis",
      ],
    },
    {
      title: "Visualization, Power BI & Projects",
      blurb: "Turning cleaned data into a dashboard someone can act on.",
      points: [
        "Data visualization — charts, graphs, KPI visualizations and interactive dashboards",
        "Power BI — data import, transformation, modelling, DAX, filters, slicers and dashboard design",
        "Real-world data analytics projects — sales, customer, HR, marketing and financial dashboards",
      ],
    },
  ],
  tools: [
    "Microsoft Excel & Advanced Excel",
    "SQL / MySQL",
    "Python (NumPy & Pandas)",
    "Power BI & DAX",
    "Jupyter Notebook / Google Colab",
    "Git & GitHub",
    "Business & CSV datasets",
  ],
  outcomes: [
    "Clean and analyse a dataset in Excel and SQL, including Pivot Tables, joins and aggregate queries",
    "Apply core statistics and Python/Pandas to explore a dataset and identify trends and outliers",
    "Build an interactive Power BI dashboard from raw data — import, transform, model and visualize",
    "Present analytics findings and a dashboard portfolio credibly in a business or technical interview",
  ],
  roles: [
    "Data Analyst",
    "Junior Data Analyst",
    "Business Data Analyst",
    "Reporting Analyst",
    "Business Intelligence Analyst",
    "MIS Analyst",
  ],
};

/* -------------------------------------------------------------------------- *
 *                              Section headings                               *
 * -------------------------------------------------------------------------- */

export const dataAnalyticsCertificateHeadings: Record<string, WrittenHeading> = {
  tracks: {
    index: "—",
    eyebrow: "Programme lengths",
    title: "Choose Your Data Analytics Track in Mohali",
    intro:
      "One subject, three depths. Each track builds on the last, so a shorter option costs you scope, not foundation.",
  },
  overview: { index: "01", eyebrow: "Programme brief", title: "Course Overview" },
  modules: { index: "02", eyebrow: "Syllabus of record", title: "What You'll Actually Build" },
  learn: {
    index: "03",
    eyebrow: "Competencies covered",
    title: "What You'll Learn in the Data Analytics Diploma Program",
  },
  why: { index: "04", eyebrow: "Standing", title: "Why Choose the Data Analytics Diploma Program?" },
  who: {
    index: "05",
    eyebrow: "Eligibility & admission",
    title: "Who Can Do This Course?",
    intro:
      "Anyone interested in data, business analysis, technology, numbers, reporting and problem-solving can start learning Data Analytics with a structured learning path — no prior experience required.",
  },
  tools: {
    index: "06",
    eyebrow: "Tools & technologies",
    title: "Tools & Technologies Students May Work With",
    intro:
      "Depending on the current Data Analytics curriculum, students may work with the following — the exact software, database systems and technologies should be confirmed with the current Techcadd Mohali batch before treating them as fixed curriculum details:",
  },
  certification: { index: "07", eyebrow: "The award", title: "Certification & Support" },
  scope: { index: "08", eyebrow: "Career opportunities", title: "Career Opportunities After Data Analytics Training" },
  projects: { index: "09", eyebrow: "Deliverables", title: "Real-World Data Analytics Projects You Will Ship" },
  institute: {
    index: "10",
    eyebrow: "The comparison",
    title: "Why Choose Techcadd for Data Analytics Training in Mohali",
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

export const dataAnalyticsCertificateSections = [
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
 *              "Why Choose the Data Analytics Diploma Program?"               *
 * -------------------------------------------------------------------------- */

export const dataAnalyticsCertificateWhyChoose = [
  {
    icon: "layers",
    title: "A Complete Analytics Workflow",
    body: "Excel → Data Cleaning → SQL → Statistics → Python → Data Analysis → Visualization → Power BI → Dashboards → Projects — the full pipeline raw data actually goes through, not tools taught in isolation.",
  },
  {
    icon: "terminal",
    title: "Practical, Project-Based Learning",
    body: "Students practice working with spreadsheets, cleaning datasets, writing SQL queries, analysing data with Python, building dashboards and presenting insights — not theory alone.",
  },
  {
    icon: "target",
    title: "Every Layer of the Stack, One Story",
    body: "Excel, SQL, Python and Power BI are taught as one connected analytics workflow rather than separate courses, so a report built in one tool can be explained and defended end to end.",
  },
  {
    icon: "briefcase",
    title: "Career-Focused, End to End",
    body: "Resume preparation, dashboard-portfolio development, interview preparation and SQL/Excel/Python interview questions sit alongside the technical curriculum.",
  },
];

/* -------------------------------------------------------------------------- *
 *                          "Who Can Do This Course?"                          *
 * -------------------------------------------------------------------------- */

export const dataAnalyticsCertificateAudience = [
  {
    icon: "users",
    title: "12th-Pass & College Students",
    body: "12th-pass students can start with Excel and data fundamentals; BCA, B.Tech, BBA, B.Com, MCA, MBA, BSc-IT and BSc students can learn analytics alongside their academic education.",
  },
  {
    icon: "certificate",
    title: "Graduates & Job Seekers",
    body: "Graduates can develop analytical and technical skills toward Data Analytics and Business Intelligence roles; job seekers can build a dashboard-driven portfolio.",
  },
  {
    icon: "briefcase",
    title: "Working Professionals & Excel Users",
    body: "Professionals already using Excel can develop advanced analysis skills and learn SQL, Python, visualization and dashboards; working professionals can improve reporting and automate data tasks.",
  },
  {
    icon: "target",
    title: "Business Professionals",
    body: "People working in sales, marketing, finance, operations, HR, administration or management can use analytics skills to understand and interpret business data.",
  },
  {
    icon: "rocket",
    title: "Entrepreneurs & Career Switchers",
    body: "Business owners can learn how data monitors sales, customers, expenses and performance; professionals from other fields can use this as a starting point into data careers.",
  },
  {
    icon: "code",
    title: "Beginners Interested in Data",
    body: "Anyone interested in numbers, reports, charts or business insights, with no previous Data Analytics experience, can use this program as a structured starting point.",
  },
];

export const dataAnalyticsCertificateEligibility = [
  "12th-pass students, college students (BCA/B.Tech/BBA/B.Com/MCA/MBA/BSc-IT/BSc) and graduates",
  "Job seekers, working professionals and career switchers moving toward Data Analytics or Business Intelligence roles",
  "Excel users looking to build advanced analysis, SQL, Python and dashboard skills",
  "Business professionals in sales, marketing, finance, operations, HR or management",
  "Entrepreneurs interested in monitoring business performance through data",
  "No prior Data Analytics experience required — the program starts with Excel and basic data concepts",
];

/* -------------------------------------------------------------------------- *
 *                        "Certification & Support"                            *
 * -------------------------------------------------------------------------- */

export const dataAnalyticsCertificateCertification = [
  {
    icon: "certificate",
    title: "Course completion certificate",
    body: "issued on completing the programme, subject to the institute's certification requirements",
  },
  {
    icon: "layers",
    title: "Portfolio of dashboards & reports",
    body: "Excel reports, SQL queries, Python analysis and Power BI dashboards you can show in an interview",
  },
  {
    icon: "users",
    title: "Trainer guidance & doubt-clearing",
    body: "data-cleaning issues, SQL errors, formula problems and visualization decisions — trainer guidance helps students work through these step by step",
  },
  {
    icon: "briefcase",
    title: "Resume & interview preparation",
    body: "resume preparation, dashboard presentation, and SQL/Excel/Python interview-question preparation alongside the technical curriculum",
  },
];

/* -------------------------------------------------------------------------- *
 *          "Career Opportunities After Data Analytics Training"              *
 * -------------------------------------------------------------------------- */

export const dataAnalyticsCertificateScope = [
  {
    q: "Job roles",
    a: "After developing the required technical skills, practical projects and portfolio, students can explore roles such as Data Analyst, Junior Data Analyst, Business Data Analyst, Reporting Analyst, Business Intelligence Analyst, MIS Analyst, Data Visualization Analyst, Operations Analyst, Marketing Analyst, Sales Analyst and Financial Data Analyst.",
  },
  {
    q: "Where the skills apply",
    a: "Sales, customer, marketing, financial, website, employee and operational data all get analysed across almost every business function, so these skills apply well beyond roles with \"data\" in the title.",
  },
  {
    q: "Becoming job-ready",
    a: "Career opportunities depend on the learner's technical knowledge, analytical ability, project portfolio, experience, communication skills and interview performance — this program provides the foundation, not a guarantee.",
  },
];

/* -------------------------------------------------------------------------- *
 *          "Real-World Data Analytics Projects You Will Ship"                 *
 * -------------------------------------------------------------------------- */

export const dataAnalyticsCertificateProjects = [
  {
    label: "Project 1",
    title: "Excel Reporting & Pivot Dashboard",
    body: "Clean a raw dataset in Excel and build a Pivot Table / Pivot Chart report for a business scenario.",
  },
  {
    label: "Project 2",
    title: "SQL Business Analysis",
    body: "Write SQL queries — joins, grouping, aggregates — against a business database to answer real analytical questions.",
  },
  {
    label: "Project 3",
    title: "Python Exploratory Data Analysis",
    body: "Use Python, NumPy and Pandas to clean a dataset and explore trends, patterns and outliers.",
  },
  {
    label: "Project 4",
    title: "Power BI Dashboard",
    body: "Import, transform and model data into an interactive Power BI dashboard with KPIs, filters and slicers.",
  },
];

/* -------------------------------------------------------------------------- *
 *        "Why Choose Techcadd for Data Analytics Training in Mohali"          *
 * -------------------------------------------------------------------------- */

export const dataAnalyticsCertificateInstitute = [
  {
    icon: "terminal",
    title: "Practical Data Analytics training",
    body: "using datasets, Excel, SQL, Python, visualization tools, dashboards and projects, not theory alone.",
  },
  {
    icon: "rocket",
    title: "Beginner-friendly learning",
    body: "students can start with basic data concepts and Excel before progressing toward SQL, Python, statistics and business intelligence.",
  },
  {
    icon: "layers",
    title: "Project-based training",
    body: "opportunities to work on practical datasets and build real analytics projects and dashboards.",
  },
  {
    icon: "briefcase",
    title: "Career-focused approach",
    body: "guidance on resume preparation, Data Analytics portfolio, dashboard presentation, and SQL/Excel/Python interview preparation.",
  },
];

/* -------------------------------------------------------------------------- *
 *                      "Classroom & Online Learning"                          *
 * -------------------------------------------------------------------------- */

export const dataAnalyticsCertificateModes = [
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

export const dataAnalyticsCertificateFaqs = [
  {
    q: "What is a Data Analytics Diploma Program?",
    a: "A Data Analytics Diploma Program teaches students how to collect, clean, analyse, visualize and interpret data using tools such as Excel, SQL, Python and Power BI.",
  },
  {
    q: "Is prior Data Analytics experience required?",
    a: "No. Beginners can start with basic data concepts and Excel before progressing toward SQL, Python, statistics, visualization and dashboards.",
  },
  {
    q: "Who can join the Data Analytics Diploma Program?",
    a: "12th-pass students, college students, graduates, BCA/B.Tech/BBA/B.Com/MCA/MBA students, job seekers, working professionals and beginners interested in data can join.",
  },
  {
    q: "Can I learn Data Analytics after 12th?",
    a: "Yes. Students who have completed 12th can start learning Data Analytics through a structured program beginning with Excel and fundamental data concepts.",
  },
  {
    q: "Is Excel important for Data Analytics?",
    a: "Yes. Excel is widely used for spreadsheet-based analysis, reporting, data cleaning, calculations, Pivot Tables and business reports.",
  },
  {
    q: "Is SQL required for Data Analytics?",
    a: "SQL is an important skill for working with data stored in relational databases and is commonly used to retrieve, filter, join and analyse data.",
  },
  {
    q: "Is Python required for Data Analytics?",
    a: "Python is not the only way to perform Data Analytics, but it is widely used for data cleaning, analysis, automation and visualization.",
  },
  {
    q: "Is Data Analytics difficult for beginners?",
    a: "Data Analytics involves tools, logical thinking, statistics and problem-solving. A structured learning path and regular practical practice can make the learning process easier.",
  },
  {
    q: "Does the course include Power BI?",
    a: "Yes. Power BI concepts can include data import, transformation, data modelling, visualizations, filters, KPIs, DAX and dashboard development.",
  },
  {
    q: "Does the course include SQL and Python?",
    a: "Yes. Students can learn SQL fundamentals, queries, joins and analytical queries, along with Python, NumPy and Pandas for practical data analysis.",
  },
  {
    q: "Does the course include statistics?",
    a: "Yes. Basic statistics such as mean, median, mode, variance, standard deviation, probability concepts and correlation can be included.",
  },
  {
    q: "Does the course include real-world projects?",
    a: "Yes. Projects can include sales dashboards, customer analysis, HR analytics, marketing analysis, financial dashboards, retail analytics and business performance dashboards.",
  },
  {
    q: "Can I become a Data Analyst after this course?",
    a: "The program can provide a foundation for Data Analyst roles. Becoming job-ready also requires regular practice, strong projects, analytical thinking, communication skills and interview preparation.",
  },
  {
    q: "Can I freelance with Data Analytics skills?",
    a: "Yes. Data Analytics skills can be useful for freelance reporting, dashboard development, data cleaning, business analysis and data visualization projects.",
  },
  {
    q: "Is Data Analytics training available online?",
    a: "Training availability can depend on the current batch and schedule. Students can enquire about available classroom and online learning options.",
  },
];

/* -------------------------------------------------------------------------- *
 *                  "Start Your Data Analytics Career in Mohali"               *
 * -------------------------------------------------------------------------- */

export const dataAnalyticsCertificateClosing = {
  title: "Start Your Data Analytics Career in Mohali",
  body: "Don't just look at data — learn how to understand it and turn it into meaningful insights. Learn Excel, Advanced Excel, SQL, Statistics, Python, NumPy, Pandas, Data Cleaning, Data Visualization, Power BI, Power Query, DAX, Dashboards, Business Analytics and practical Data Analytics projects with Techcadd, Mohali.",
  primaryCta: "Book My Free Counselling Call",
  secondaryCta: "Request a Callback",
};
