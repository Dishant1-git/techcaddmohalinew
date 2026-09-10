import { courses, getCourse, type Course } from "@/lib/courses";
import { withOverride, withOverrides, type CourseOverrides } from "@/lib/content/overrides";

/**
 * Content for the After 12th menu, behind `/courses/after12th/[slug]`.
 *
 * The route is the route-map presentation of the same catalogue records the
 * other menus use, so this module names the slugs the menu lists and fetches
 * the records by slug. Nothing is copied.
 *
 * The menu's third column, the 9-month programmes, points at `/training` and
 * names no course, so it contributes no slugs here.
 */

/** The 3-month column, in menu order. */
export const after12ThreeMonthSlugs = [
  "web-designing",
  "python-programming",
  "generative-ai",
  "digital-marketing",
  "autocad",
  "data-analytics",
  // The written page in `@/lib/after12Pages` is a 3-month programme — its
  // headline, Key Highlights, overview and closing all say so — so it belongs
  // in this column, not the 6-month one it used to sit in.
  "cloud-computing",
];

/** The 6-month column, in menu order. */
export const after12SixMonthSlugs = [
  "artificial-intelligence",
  "mern-full-stack",
  "data-science",
  "cyber-security",
  "machine-learning",
];

/** Every slug the After 12th menu links to, in menu order. */
export const after12Slugs = [...after12ThreeMonthSlugs, ...after12SixMonthSlugs];

/**
 * What this menu says differently about a course the other menus also list.
 *
 * Every slug above is a catalogue course the Courses menu lists too, and this
 * menu speaks to a different reader — someone who has just finished school and
 * is choosing a first programme, not a working professional adding a skill. An
 * entry here is where that difference goes: the fields it names are merged
 * over the catalogue record for this route only, and the other menus are
 * untouched.
 *
 * See `@/lib/content/overrides` for the merge and for what `contentKey` does —
 * in short, add one when this menu's version of a course should also get its
 * own FAQs, reviews, why-choose cards and SEO rather than inherit the ones
 * written for the catalogue slug in `@/lib/coursePage`. The written pathway
 * pages in `@/lib/after12Pages` stay keyed by slug and are unaffected either
 * way.
 */
export const after12Overrides: CourseOverrides = {
  /**
   * The catalogue sells Cloud Computing as a 5-month intermediate course, which
   * is right for the Courses and Certificate menus. This menu's version is the
   * written 3-month programme in `@/lib/after12Pages` — "12th Pass, Any Stream",
   * "Beginner-Friendly", "Duration: 3 Months" — so the card on the After 12th
   * index would otherwise advertise a length and a level its own page then
   * contradicts. No `contentKey`: the written pathway page is keyed by slug and
   * already supplies every section this route renders.
   */
  "cloud-computing": {
    duration: "3 Months",
    level: "Beginner",
  },

  /**
   * Same reason as Cloud Computing above: the catalogue sells Flutter as a
   * 6-month "Beginner → Advanced" course, while this menu's written page is the
   * 3-month programme — "Duration: 3 Months", "12th Pass, Any Stream",
   * "Beginners & Aspiring App Developers". Without this the index card would
   * advertise a length and a level its own page then contradicts.
   */
  flutter: {
    duration: "3 Months",
    level: "Beginner",
  },

  /**
   * Same reason again: the catalogue sells MERN as a "4 – 6 Months",
   * "Beginner → Advanced" course, while this menu's written page is the 3-month
   * programme — "Duration: 3 Months", "12th Pass, Any Stream", "No Prior Coding
   * Experience".
   */
  "mern-full-stack": {
    duration: "3 Months",
    level: "Beginner",
  },

  /**
   * The catalogue spans "3 – 9 Months" at "Beginner → Advanced"; this menu's
   * written page is the 3-month one — "Duration: 3 Months", "Level: Beginner to
   * Job-Ready".
   */
  "agentic-ai": {
    duration: "3 Months",
    level: "Beginner",
  },

  /**
   * The catalogue sells Digital Marketing as 4 months at "Beginner → Advanced";
   * this menu's written page is the 3-month one — "Duration: 3 Months",
   * "Experience: Beginner Friendly". The menu also lists a separate 4-month
   * item, which is why the two lengths are not interchangeable here.
   */
  "digital-marketing": {
    duration: "3 Months",
    level: "Beginner",
  },

  /**
   * The catalogue sells Data Science as a 6-month "Beginner → Advanced" course;
   * this menu's written page is the 4-month fast track — "Duration: 4 Months",
   * "Eligibility: 12th Pass".
   */
  "data-science": {
    duration: "4 Months",
    level: "Beginner",
  },

  /** The written page is the 3-month one — "Duration: 3 Months", "12th Pass". */
  "cyber-security": {
    duration: "3 Months",
    level: "Beginner",
  },

  /** The written page is the 3-month one — "Duration: 3 Months", "12th Pass". */
  "full-stack-development": {
    duration: "3 Months",
    level: "Beginner",
  },

  /**
   * The catalogue sells Data Analytics as a 6-month "Beginner → Advanced"
   * course; this menu's written page is the 4-month Data Analytics & Business
   * Analysis programme — "Duration: 4 Months", "Eligibility: 12th Pass Onward".
   * The menu lists the 6-month curriculum separately as its own certificate
   * programme, which is why the two lengths are not interchangeable here.
   */
  "data-analytics": {
    duration: "4 Months",
    level: "Beginner",
  },
};

/**
 * Courses that belong to the After 12th menu alone and are not in the catalogue.
 *
 * The menu lists Digital Marketing at two lengths, and only the shorter one is
 * a catalogue course. The 4-month route is this menu's own programme — SEO +
 * Performance Marketing — so its record lives here and no other menu grows a
 * page for it. Its slug is the one the menu reserves in `@/lib/site`.
 */
export const after12ExclusiveCourses: Course[] = [
  {
    slug: "digital-marketing-program-4-months",
    title: "SEO + Performance Marketing",
    category: "digital-marketing",
    duration: "4 Months",
    level: "Beginner",
    blurb:
      "SEO, Google Ads, Meta retargeting and GA4 taught as one customer-acquisition system, closing on a live 30-day growth campaign.",
    overview:
      "techcadd's 4-month SEO + Performance Marketing Program in Mohali is designed for students who want more than theoretical digital marketing knowledge. Across classroom sessions and supervised practical work, you learn how to research keywords, optimise websites, launch paid campaigns, track conversions and turn campaign data into clear marketing decisions.\n\nThe programme combines organic search, paid acquisition, social retargeting and analytics so you understand the complete customer acquisition journey.",
    modules: [
      {
        title: "Month 1 — Marketing Strategy, Keywords & SEO Foundations",
        points: [
          "Digital marketing and the customer journey",
          "Keyword research and search intent",
          "On-page SEO",
          "Technical SEO fundamentals",
        ],
      },
      {
        title: "Month 2 — Technical, Local, Off-Page SEO & Content",
        points: [
          "Advanced technical SEO",
          "Off-page SEO and link building",
          "Local SEO and Google Business Profile",
          "SEO content strategy",
        ],
      },
      {
        title: "Month 3 — Google Ads & Paid Search",
        points: [
          "Google Ads search campaigns",
          "Campaign optimisation",
          "Display, Shopping and Performance Max",
          "YouTube and video advertising",
        ],
      },
      {
        title: "Month 4 — Meta Ads, Analytics & Growth Project",
        points: [
          "Meta Ads setup and retargeting",
          "Creative testing",
          "GA4 and Google Tag Manager",
          "Looker Studio reporting and the 30-day growth project",
        ],
      },
    ],
    tools: [
      "Google Ads",
      "Google Analytics 4",
      "Google Search Console",
      "Google Tag Manager",
      "Looker Studio",
      "Google Business Profile",
      "Meta Ads Manager",
      "WordPress",
      "Canva",
      "Merchant Center",
      "YouTube Ads",
    ],
    outcomes: [
      "Research a business and build a keyword-led SEO roadmap across content, technical work and priority pages",
      "Audit a website and deliver a prioritised on-page and technical optimisation plan",
      "Build and optimise Google Ads search campaigns with conversion tracking",
      "Design Meta retargeting audiences and campaigns around the customer journey",
      "Configure GA4 and Tag Manager tracking and report it through Looker Studio",
      "Present an integrated organic-plus-paid growth case study",
    ],
    roles: [
      "SEO Executive",
      "SEO Analyst",
      "PPC Executive",
      "Performance Marketing Executive",
      "Digital Marketing Executive",
      "Search Marketing Specialist",
      "Digital Marketing Freelancer",
    ],
  },
  {
    slug: "cloud-computing-certificate-program",
    title: "Cloud Computing Certificate",
    category: "cyber-cloud",
    duration: "6 Months",
    level: "Beginner",
    blurb:
      "Linux, networking and Bash through to AWS, Docker, Kubernetes, Jenkins, Terraform and monitoring — six months from first command to an automated deployment pipeline.",
    overview:
      "Join a structured 6-month Cloud Computing course after 12th and learn how modern cloud infrastructure works through practical labs and projects.\n\nYou will begin with Linux administration, networking and scripting before moving into AWS services such as IAM, VPC, EC2, S3, RDS, Lambda, CloudWatch and more. Later modules introduce Docker, Kubernetes, Jenkins, Terraform, Prometheus, Grafana and CI/CD automation.",
    modules: [
      {
        title: "Month 1 — Linux, Basic Scripting, Networking & Git",
        points: ["Linux administration", "Bash scripting", "Networking fundamentals", "Git & GitHub"],
      },
      {
        title: "Month 2 — Cloud Basics & Core AWS",
        points: ["Cloud computing fundamentals", "AWS fundamentals", "IAM", "VPC and EC2"],
      },
      {
        title: "Month 3 — Storage, Databases, Scaling & Monitoring",
        points: ["S3, RDS and DynamoDB", "Load balancing", "Auto Scaling", "Route 53 and CloudWatch"],
      },
      {
        title: "Month 4 — Serverless AWS, AI Services & Cloud Security",
        points: ["Lambda and API Gateway", "Event-driven architecture", "AWS AI services", "Cloud security"],
      },
      {
        title: "Month 5 — Docker & Kubernetes",
        points: ["Docker fundamentals", "Docker Compose and registries", "Kubernetes fundamentals", "Amazon EKS"],
      },
      {
        title: "Month 6 — CI/CD, Terraform, Monitoring & Final Project",
        points: ["Jenkins and GitHub Actions", "Terraform", "Prometheus and Grafana", "Final project"],
      },
    ],
    tools: [
      "AWS",
      "Linux",
      "Bash",
      "Git",
      "Docker",
      "Kubernetes",
      "Helm",
      "Jenkins",
      "Terraform",
      "Prometheus",
      "Grafana",
      "Python",
    ],
    outcomes: [
      "Administer a Linux server and automate routine work with Bash",
      "Design an AWS network with IAM, VPC, EC2 and appropriate access controls",
      "Deploy a scalable multi-tier application with storage, databases, load balancing and monitoring",
      "Build event-driven serverless workflows and secure them",
      "Containerise an application and run it on Kubernetes with Helm",
      "Automate provisioning with Terraform and deployment with a CI/CD pipeline",
    ],
    roles: [
      "Cloud Engineer",
      "AWS Cloud Engineer",
      "Junior DevOps Engineer",
      "Cloud Support Associate",
      "Cloud Operations Associate",
      "Infrastructure / System Administrator",
    ],
  },
  {
    slug: "flutter-app-development-diploma-certificate-program",
    title: "Flutter App Development Diploma Certificate",
    category: "development",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Dart and Flutter through to Riverpod, Clean Architecture, native channels, ML Kit and store deployment — six months from first widget to a published package.",
    overview:
      "The Flutter App Development Certificate Program in Mohali follows a gradual learning path. You first develop a strong understanding of Dart and Flutter, then move into data handling, state management, backend services, testing, architecture, native integrations, AI and publishing.\n\nBy the end of the program, you will have worked on multiple Flutter applications and gained experience with technologies used across the mobile development workflow.",
    modules: [
      {
        title: "Month 1 — Dart, Flutter Fundamentals & Interface Design",
        points: ["Dart programming", "Flutter basics", "UI development", "Navigation and animations"],
      },
      {
        title: "Month 2 — State, APIs, Storage & Firebase",
        points: ["State management", "Asynchronous programming", "API integration", "Local data and Firebase"],
      },
      {
        title: "Month 3 — Testing, Advanced UI & Release Preparation",
        points: ["Testing", "Debugging", "Advanced UI", "Release fundamentals"],
      },
      {
        title: "Month 4 — Native Integration, Riverpod, GetX & Advanced Dart",
        points: ["Native platform integration", "Riverpod and GetX", "Flutter Hooks", "Advanced Dart"],
      },
      {
        title: "Month 5 — Clean Architecture, Optimization & AI",
        points: ["Application architecture", "Dependency injection", "Performance optimization", "AI integration"],
      },
      {
        title: "Month 6 — ML Kit, App Deployment & pub.dev",
        points: ["Google ML Kit", "Android & iOS deployment", "Flutter packages", "Publishing on pub.dev"],
      },
    ],
    tools: [
      "Dart",
      "Flutter",
      "Provider",
      "Bloc",
      "Riverpod",
      "GetX",
      "Firebase",
      "SQLite",
      "get_it",
      "Google ML Kit",
      "Flutter DevTools",
      "pub.dev",
    ],
    outcomes: [
      "Build responsive, interactive, data-driven Flutter applications from individual widgets up",
      "Connect applications to HTTP, REST APIs, JSON and Firebase services",
      "Manage application state across Provider, Bloc, Riverpod and GetX",
      "Structure large projects with MVVM, Repository Pattern and Clean Architecture",
      "Reach native device capabilities through MethodChannel",
      "Add AI features with text-generation APIs and on-device ML through Google ML Kit",
      "Test and profile applications, then prepare signed Android and iOS release builds",
    ],
    roles: [
      "Flutter Developer",
      "Mobile Application Developer",
      "Cross-Platform Developer",
      "Junior Software Developer",
      "AI-Integrated App Developer",
      "Freelance Flutter Developer",
    ],
  },
  {
    slug: "mern-stack-certificate-program",
    title: "MERN Stack Certificate",
    category: "development",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "HTML, CSS and JavaScript through to React, Node, Express and MongoDB — six months from first webpage to a deployed, presented full-stack application.",
    overview:
      "Learn the technologies that form the MERN Stack — MongoDB, Express.js, React.js and Node.js through a connected, project-oriented curriculum.\n\nThe programme begins with web development fundamentals and gradually introduces programming, frontend development, backend engineering, databases, authentication, APIs and deployment.\n\nDuring the six months, you will work on several smaller applications before moving to a major MERN project. You will also learn Git and GitHub, API testing, responsive UI development, database integration and deployment fundamentals.",
    modules: [
      {
        title: "Month 1 — Web Development Fundamentals",
        points: ["Web fundamentals", "HTML5", "CSS3", "Git & GitHub"],
      },
      {
        title: "Month 2 — JavaScript Development",
        points: ["JavaScript fundamentals", "Arrays and objects", "DOM manipulation", "Asynchronous JavaScript"],
      },
      {
        title: "Month 3 — React.js Development",
        points: ["React fundamentals", "Hooks and routing", "API integration", "Tailwind CSS and auth"],
      },
      {
        title: "Month 4 — Node.js, Express.js & MongoDB",
        points: ["Node.js", "Express.js", "Authentication", "MongoDB and Mongoose"],
      },
      {
        title: "Month 5 — Industry Project Development",
        points: ["Planning and architecture", "Frontend implementation", "Backend implementation", "Testing and review"],
      },
      {
        title: "Month 6 — Deployment & Placement Preparation",
        points: ["Deployment and hosting", "Final project", "Career portfolio", "Interview preparation"],
      },
    ],
    tools: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
      "Git",
      "GitHub",
      "Vercel",
    ],
    outcomes: [
      "Build and maintain a responsive portfolio website with Git and GitHub",
      "Write modern JavaScript, including async, Fetch and browser storage",
      "Create React interfaces with hooks, routing, Context API and Axios",
      "Build REST APIs on Node and Express and connect them to MongoDB",
      "Implement authentication, authorisation, hashing, JWT and protected routes",
      "Take a full-stack application through planning, testing and deployment",
    ],
    roles: [
      "Junior MERN Developer",
      "React.js Developer",
      "Frontend Developer",
      "Node.js Developer",
      "Backend Developer",
      "Full Stack Developer",
      "JavaScript Developer",
      "Web Application Developer",
      "Junior Software Developer",
      "Freelance Web Developer",
    ],
  },
  {
    slug: "agentic-ai-certificate-program",
    title: "Agentic AI Certificate",
    category: "ai-data",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Python and LLM fundamentals through to RAG, LangGraph, MCP, multi-agent systems, AI security and Kubernetes — six months of agent engineering, not prompting.",
    overview:
      "The 6-Month Agentic AI Program in Mohali takes you beyond basic prompting and introduces the engineering practices required to design, build, test and operate AI-powered agents.\n\nThe programme progresses from beginner-level Python to advanced areas including MCP, RAG, LangGraph, model routing, DSPy, GraphRAG, durable execution, multi-agent systems, browser agents, AI security and Kubernetes.",
    modules: [
      {
        title: "Month 1 — Python, LLM Prompting & Tool Calling",
        points: ["Python and developer workflows", "APIs, SQL and Docker", "Prompting and structured outputs", "Tool calling and MCP"],
      },
      {
        title: "Month 2 — RAG, Memory & Agent Frameworks",
        points: ["Retrieval-Augmented Generation", "Vector databases", "Memory and state", "LangGraph and multi-agent patterns"],
      },
      {
        title: "Month 3 — Evaluation, Guardrails & Deployed Agents",
        points: ["Evaluation datasets and metrics", "Guardrails and PII", "Deployment and streaming", "Logging and monitoring"],
      },
      {
        title: "Month 4 — Production Python, Model Routing & Prompt Optimisation",
        points: ["Async Python and concurrency", "Retries and circuit breakers", "Model routing and self-hosting", "DSPy prompt optimisation"],
      },
      {
        title: "Month 5 — Production Tools, Advanced Retrieval & Multi-Agent Systems",
        points: ["Production MCP and OAuth", "Advanced retrieval and GraphRAG", "Durable execution", "Multi-agent architectures"],
      },
      {
        title: "Month 6 — Browser Agents, Evaluation, Security, Deployment & Capstone",
        points: ["Browser and coding agents", "Evaluation and tracing", "AI security and red teaming", "Kubernetes and the capstone"],
      },
    ],
    tools: [
      "Python",
      "FastAPI",
      "Docker",
      "LangChain",
      "LangGraph",
      "Qdrant",
      "MCP",
      "DSPy",
      "Neo4j",
      "Temporal",
      "Playwright",
      "Kubernetes",
    ],
    outcomes: [
      "Engineer reliable agents with concurrency controls, retries, circuit breakers and checkpoints",
      "Evaluate AI applications and find prompt-injection and unsafe-tool vulnerabilities",
      "Design durable workflows that recover from interruption without losing progress",
      "Route models and manage context, caching and cost per successful task",
      "Build advanced retrieval with reranking, GraphRAG and multi-hop queries",
      "Deploy and monitor AI services on containers and Kubernetes",
    ],
    roles: [
      "AI Engineer / LLM Application Engineer",
      "Agent Platform Engineer",
      "AI Automation / Integration Engineer",
      "MLOps / AI Reliability Engineer",
      "Generative AI Developer",
    ],
  },
  {
    slug: "digital-marketing-certificate-program",
    title: "Digital Marketing Certificate",
    category: "digital-marketing",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Strategy, design and video through SEO, Google and Meta Ads, e-commerce, CRO, email and GA4 — six months across every channel, closing on a portfolio.",
    overview:
      "The After 12th 6-Month Digital Marketing Certificate Program in Mohali is designed to take learners from marketing fundamentals to practical campaign execution.\n\nYou will learn how digital marketing channels work together, how businesses attract and convert customers online, how campaigns are measured and how marketing performance can be improved using data.",
    modules: [
      {
        title: "Month 1 — Digital Marketing Strategy & Creative Production",
        points: ["Digital marketing and funnel fundamentals", "Graphic design for marketers", "Campaign planning and KPIs", "Strategy document and creative portfolio"],
      },
      {
        title: "Month 2 — Video Marketing & Website Development",
        points: ["Video editing and short-form content", "WordPress and hosting", "Elementor and landing pages", "Tracking and marketing pixels"],
      },
      {
        title: "Month 3 — Complete SEO Training",
        points: ["Keyword research and search intent", "On-page SEO", "Technical SEO", "Off-page SEO and digital PR"],
      },
      {
        title: "Month 4 — Local SEO, Content & Social Media",
        points: ["Local SEO and Google Business Profile", "Content marketing and copywriting", "Social media marketing", "30-day content plan"],
      },
      {
        title: "Month 5 — Google Ads & Meta Ads",
        points: ["Search and Display", "Shopping, Performance Max and YouTube", "Meta Pixel and Conversions API", "Audiences, testing and scaling"],
      },
      {
        title: "Month 6 — E-Commerce, Analytics, CRM & Career Preparation",
        points: ["E-commerce store development", "CRO and cart recovery", "Email marketing and CRM", "GA4, GTM and Looker Studio"],
      },
    ],
    tools: [
      "Google Ads",
      "Meta Ads Manager",
      "Google Analytics 4",
      "Google Tag Manager",
      "Search Console",
      "WordPress",
      "Elementor",
      "WooCommerce",
      "Shopify",
      "Photoshop",
      "Canva",
      "Looker Studio",
    ],
    outcomes: [
      "Plan a campaign from personas and funnels through to channel selection and KPIs",
      "Produce marketing creatives, short-form video and a conversion-focused WordPress site",
      "Run the complete SEO workflow — keywords, on-page, technical, local and off-page",
      "Build and optimise Google Ads and Meta Ads campaigns with conversion tracking",
      "Support an e-commerce store through CRO, cart recovery and lifecycle email",
      "Measure and report performance through GA4, Tag Manager and Looker Studio",
    ],
    roles: [
      "Digital Marketing Executive",
      "SEO Executive",
      "Social Media Executive",
      "PPC / Google Ads Executive",
      "Performance Marketing Executive",
      "Content Marketing Executive",
      "E-Commerce Marketing Executive",
      "Freelance Digital Marketer",
    ],
  },
  {
    slug: "data-analytics-certificate-program",
    title: "Data Analytics & Business Analysis Certificate",
    category: "ai-data",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Excel and SQL through Python, Power BI, Tableau, business analysis, modern data platforms and AI — six months across both the technical and business sides of analytics.",
    overview:
      "Data is now part of almost every business decision — from sales forecasting and inventory planning to customer behaviour, finance and operations. Our six-month Data Analytics & Business Analysis programme in Mohali is designed for students who want to learn how to transform raw information into useful business insights.\n\nThe programme combines Excel, SQL, Python, Power BI, Tableau and statistics with a dedicated business analysis track covering requirements, BRD, FRD, SRS, Agile, Scrum, Jira and BPMN.\n\nYou will also explore modern data technologies such as Microsoft Fabric, Snowflake, DuckDB, dbt and Apache Airflow, followed by machine learning, generative AI and AI-assisted reporting.",
    modules: [
      {
        title: "Month 1 — Data Analytics & Programming Foundations",
        points: ["Introduction to data analytics", "Advanced Excel", "SQL fundamentals", "Python fundamentals"],
      },
      {
        title: "Month 2 — Advanced SQL, Excel & Business Statistics",
        points: ["Advanced SQL", "Advanced Excel", "Business statistics", "Reporting assignments"],
      },
      {
        title: "Month 3 — Python for Data Analytics",
        points: ["NumPy and Pandas", "Exploratory data analysis", "APIs and web scraping", "Streamlit"],
      },
      {
        title: "Month 4 — Business Intelligence & Data Visualisation",
        points: ["Power BI", "Power Query and data modelling", "DAX and KPIs", "Tableau"],
      },
      {
        title: "Month 5 — Business Analysis & Modern Data Engineering",
        points: ["Requirement gathering", "BRD, FRD, SRS and Agile", "BPMN and process mapping", "Fabric, Snowflake, dbt and Airflow"],
      },
      {
        title: "Month 6 — AI-Powered Analytics & Career Readiness",
        points: ["AI for data analysts", "Machine learning for analysts", "AI automation and portfolio", "Interview preparation and capstone"],
      },
    ],
    tools: [
      "Microsoft Excel",
      "Power Query",
      "SQL",
      "MySQL",
      "Python",
      "Pandas",
      "Power BI",
      "Tableau",
      "Jira",
      "Microsoft Fabric",
      "Snowflake",
      "Streamlit",
    ],
    outcomes: [
      "Build Sales, HR, Inventory and Finance dashboards in Excel and Power BI",
      "Write professional SQL with joins, CTEs, window functions and views",
      "Clean, transform and analyse datasets with Python, NumPy and Pandas",
      "Turn business conversations into BRD, FRD, SRS, user stories and process maps",
      "Explain data warehouses, lakehouses, ETL/ELT, dbt and orchestration",
      "Apply practical machine learning and AI-assisted reporting to an analytics workflow",
    ],
    roles: [
      "Data Analyst",
      "Junior Data Analyst",
      "MIS Executive",
      "Reporting Analyst",
      "Business Analyst",
      "Junior Business Analyst",
      "BI Executive",
      "BI Analyst",
      "Data Reporting Executive",
      "Analytics Executive",
      "Operations Analyst",
      "Junior BI Developer",
      "Freelance Data Analyst",
    ],
  },
  {
    slug: "data-science-certificate-program",
    title: "Data Science Certificate",
    category: "ai-data",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Excel and Python through machine learning, deep learning, LLMs, RAG, AI agents and cloud deployment — six months from first dashboard to a deployed AI application.",
    overview:
      "This six-month Data Science programme is designed for students entering the technology field after 12th as well as learners who want a practical route into data and AI.\n\nThe programme begins with Excel, Power BI, Python and SQL, then moves into data preparation, statistics, machine learning, deep learning and computer vision. The second half introduces LLMs, prompt engineering, vector databases, RAG, AI agents and modern AI application development, followed by deployment, security and a complete capstone.",
    modules: [
      { title: "Month 1 — Data & Programming Foundations", points: ["Excel, Power BI & data literacy", "Python fundamentals", "Git, GitHub & AI coding tools", "SQL, database design & APIs"] },
      { title: "Month 2 — Data Engineering & Machine Learning", points: ["Pandas, Polars, DuckDB", "EDA, visualisation & statistics", "scikit-learn pipelines", "Gradient boosting"] },
      { title: "Month 3 — Deep Learning & Computer Vision", points: ["PyTorch fundamentals", "CNNs & transfer learning", "YOLO, object detection & OCR", "Transformers & Hugging Face"] },
      { title: "Month 4 — LLM Fundamentals & Vector Search", points: ["LLM fundamentals", "Prompt engineering", "LLM APIs & model access", "Embeddings & vector databases"] },
      { title: "Month 5 — RAG, AI Agents & App Development", points: ["RAG architecture", "LangChain, MCP & tool calling", "AI agents & multi-agent systems", "AI application development"] },
      { title: "Month 6 — Deployment & Industry Capstone", points: ["Containerisation & cloud", "AI security & CI/CD", "Industry capstone build", "Capstone delivery"] },
    ],
    tools: ["Python", "Power BI", "PostgreSQL", "Pandas", "scikit-learn", "PyTorch", "OpenCV", "LangChain", "FAISS", "FastAPI", "Docker", "AWS"],
    outcomes: [
      "Build a Power BI dashboard with Power Query and DAX",
      "Design a PostgreSQL database and expose it through an authenticated FastAPI service",
      "Take a dataset through cleaning, EDA, feature engineering and a compared model set",
      "Build computer-vision solutions with PyTorch, OpenCV and YOLO",
      "Create RAG assistants with embeddings, vector search and guardrails",
      "Deploy an end-to-end AI application with Docker, cloud and CI/CD",
    ],
    roles: [
      "Data Analyst",
      "Junior Data Analyst",
      "Business Intelligence Analyst",
      "Python Developer",
      "Junior Machine Learning Engineer",
      "Machine Learning Developer",
      "Data Science Trainee",
      "AI Developer",
      "Generative AI Developer",
      "RAG Application Developer",
      "AI Automation Developer",
      "Junior AI Engineer",
      "Data & AI Intern",
      "Freelance Data/AI Developer",
    ],
  },
  {
    slug: "cyber-security-certificate-program",
    title: "Cyber Security Certificate",
    category: "cyber-cloud",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Linux and networking through ethical hacking, SOC and SIEM, cloud security, forensics, malware analysis, DevSecOps and AI security — six months to a documented capstone.",
    overview:
      "The After 12th 6-Month Cyber Security Certificate Program in Mohali is designed for students and beginners who want to understand how modern systems are protected, monitored and investigated.\n\nThe programme takes you from foundational concepts to hands-on security labs. You will work with Linux, networking environments, vulnerability-testing tools, web security platforms, SIEM solutions, cloud services, Python automation and AI APIs.",
    modules: [
      { title: "Month 1 — Cybersecurity Foundations & Networking", points: ["Cybersecurity fundamentals", "Computer fundamentals", "Networking fundamentals", "Virtualisation, Git & AI"] },
      { title: "Month 2 — Ethical Hacking & Web Security", points: ["Information gathering", "Vulnerability assessment", "Web application security", "Burp Suite"] },
      { title: "Month 3 — Advanced Ethical Hacking & SOC", points: ["Security testing", "Windows security", "SOC and SIEM", "Threat hunting"] },
      { title: "Month 4 — Cloud Security & Security Automation", points: ["AWS and Azure security", "Container security", "DevSecOps", "Python and AI automation"] },
      { title: "Month 5 — Digital Forensics, Malware Analysis & IR", points: ["Digital forensics", "Malware analysis", "Incident response", "Threat intelligence"] },
      { title: "Month 6 — Capstone Project & Placement Preparation", points: ["Capstone development", "Project documentation", "Deployment", "Interview preparation"] },
    ],
    tools: ["Kali Linux", "Nmap", "Wireshark", "Burp Suite", "Nuclei", "Metasploit", "Wazuh", "Splunk", "AWS", "Docker", "Python", "Git"],
    outcomes: [
      "Build a controlled virtual security lab with Linux and Windows systems",
      "Test authorised web applications against the OWASP Top 10",
      "Operate a SIEM environment and investigate security events",
      "Investigate incidents through evidence handling, forensics and malware analysis",
      "Secure cloud identity, permissions, storage and monitoring across AWS and Azure",
      "Build an AI-assisted security application and document it as a capstone",
    ],
    roles: [
      "Cybersecurity Analyst",
      "SOC Analyst",
      "Security Testing Trainee",
      "Network Security Trainee",
      "Cloud Security Trainee",
      "Incident Response Trainee",
      "Digital Forensics Trainee",
      "Security Automation Developer",
      "AI Security / GenAI Security Trainee",
    ],
  },
  {
    slug: "artificial-intelligence-certificate-program",
    title: "Artificial Intelligence Certificate",
    category: "ai-data",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Python and machine learning through deep learning, NLP, LLMs, RAG, AI agents, multimodal AI and cloud deployment — six months from first program to a deployed AI application.",
    overview:
      "The After 12th 6-Month Artificial Intelligence Program in Mohali introduces learners to the technologies behind modern AI applications.\n\nYou will begin with Python, statistics, machine learning and software-development practices. The programme then progresses through PyTorch, computer vision, NLP and Transformers before moving into LLM APIs, embeddings, vector databases, RAG architectures, AI agents and multimodal AI.\n\nThe final phase focuses on FastAPI, Docker, cloud deployment, AI security and an end-to-end capstone project.",
    modules: [
      { title: "Month 1 — Python & AI/ML Foundations", points: ["Python & development", "Data & mathematics", "Machine learning", "AI development tools"] },
      { title: "Month 2 — Deep Learning & NLP", points: ["Deep learning", "Computer vision", "Natural language processing", "Transformers"] },
      { title: "Month 3 — LLM Fundamentals & Prompt Engineering", points: ["LLM fundamentals", "Prompt engineering", "Model APIs", "Local & multi-provider AI"] },
      { title: "Month 4 — RAG & AI Agents", points: ["Retrieval & vector search", "RAG", "AI frameworks", "Agent development"] },
      { title: "Month 5 — AI Application Development", points: ["Backend development", "AI interfaces", "Conversational AI", "Multimodal AI"] },
      { title: "Month 6 — Deployment, Security & Capstone", points: ["Deployment", "AI security", "Capstone", "Career preparation"] },
    ],
    tools: ["Python", "PyTorch", "scikit-learn", "OpenCV", "Hugging Face", "OpenAI", "LangChain", "LangGraph", "FAISS", "FastAPI", "Docker", "AWS"],
    outcomes: [
      "Build machine-learning and deep-learning models with scikit-learn and PyTorch",
      "Understand NLP and Transformer-based language architectures",
      "Work with LLM tokens, embeddings, context windows and multiple providers",
      "Create RAG applications with vector databases, retrieval and evaluation",
      "Develop AI agents with LangChain, LangGraph, CrewAI and tool calling",
      "Deploy AI applications with FastAPI, Docker, cloud platforms and AI security",
    ],
    roles: ["AI Engineer", "Machine Learning Engineer", "Deep Learning Engineer", "LLM Application Developer", "AI Agent Developer", "AI Application Developer", "Generative AI Developer", "Python AI Developer"],
  },
  {
    slug: "full-stack-development-certificate-program",
    title: "Full Stack Development Certificate",
    category: "development",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "HTML, CSS and JavaScript through Python, Django, SQL, REST APIs, AI-assisted development, payments and deployment — six months to portfolio-ready applications.",
    overview:
      "The After 12th 6-Month Full Stack Development Certificate Program in Mohali at techcadd is designed around progressive skill building rather than isolated programming topics.\n\nYou begin with web development fundamentals and JavaScript, move into Python and object-oriented programming, then learn databases and Django before progressing to REST APIs, JWT authentication, AI-assisted development, payment integration, background jobs, CI/CD concepts, and system design.\n\nThe final stage focuses on bringing these skills together through substantial application development and portfolio preparation.",
    modules: [
      { title: "Months 1–2 — Web Fundamentals, JavaScript & Python", points: ["Web fundamentals", "JavaScript & DOM", "Python programming", "Object-oriented programming"] },
      { title: "Months 3–4 — Databases, Django & AI-Assisted Development", points: ["Databases & SQL", "Django framework", "Django ORM and authentication", "AI-assisted development"] },
      { title: "Months 5–6 — REST APIs, AI Integration & Production", points: ["Django REST Framework", "LLM APIs & AI integration", "Celery, payments and CI/CD", "System design fundamentals"] },
    ],
    tools: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Python", "Django", "Django REST Framework", "SQL", "JWT", "Celery", "Git", "GitHub"],
    outcomes: [
      "Create responsive web interfaces with HTML5, CSS3, Bootstrap and JavaScript",
      "Write a strong Python foundation including OOP, collections and error handling",
      "Design relational schemas and query them with SQL and the Django ORM",
      "Build Django applications with models, views, forms, templates and authentication",
      "Create REST APIs with DRF, JWT authentication, permissions and documentation",
      "Integrate LLM APIs, background jobs and payments, and understand CI/CD and system design",
    ],
    roles: ["Full-Stack Developer", "Backend Developer", "Python Developer", "Django Developer", "API Developer", "AI Integration Developer", "Freelance Web Developer", "Junior Software Developer"],
  },
];

/** The records behind those links, fetched from the catalogue by slug. */
export const after12Courses: Course[] = after12Slugs
  .map((slug) => after12Course(slug))
  .filter((c): c is Course => Boolean(c));

/** True when a course is one the After 12th menu lists. */
export const isAfter12Course = (slug: string) => after12Slugs.includes(slug);

/**
 * The record a page renders, by slug.
 *
 * Falls back to the full catalogue on purpose. The route prerenders every
 * course, not only the twelve the menu features, so an After 12th URL that
 * resolves today keeps resolving.
 */
export function after12Course(slug: string): Course | undefined {
  const base = after12ExclusiveCourses.find((c) => c.slug === slug) ?? getCourse(slug);
  return withOverride(base, after12Overrides[slug]);
}

/** Every course `/courses/after12th/[slug]` serves, unchanged — for generateStaticParams. */
export const after12RouteCourses = [
  ...withOverrides(courses, after12Overrides),
  ...after12ExclusiveCourses,
];
