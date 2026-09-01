export type Course = {
  slug: string;
  title: string;
  category: CategoryKey;
  duration: string;
  level: "Beginner" | "Beginner → Advanced" | "Intermediate" | "Advanced";
  badge?: "Hot" | "New" | "Trending";
  blurb: string;
  overview: string;
  modules: { title: string; points: string[] }[];
  tools: string[];
  outcomes: string[];
  roles: string[];
};

export type CategoryKey =
  | "ai-data"
  | "development"
  | "cyber-cloud"
  | "digital-marketing"
  | "cad-design"
  | "programming";

export const categories: {
  key: CategoryKey;
  title: string;
  blurb: string;
  icon: string;
  accent: string;
}[] = [
  {
    key: "ai-data",
    title: "Artificial Intelligence & Data",
    blurb: "Generative AI, machine learning, analytics and the tooling that ships models to production.",
    icon: "sparkles",
    accent: "from-accent-glow to-hero-glow",
  },
  {
    key: "development",
    title: "Full-Stack Development",
    blurb: "MERN, MEAN and PHP stacks — build, test and deploy real applications end to end.",
    icon: "code",
    accent: "from-hero-glow to-brand-700",
  },
  {
    key: "cyber-cloud",
    title: "Cyber Security & Cloud",
    blurb: "Ethical hacking, network defence, Linux and cloud infrastructure on AWS and Azure.",
    icon: "shield",
    accent: "from-up-soft to-hero-600",
  },
  {
    key: "digital-marketing",
    title: "Digital Marketing",
    blurb: "SEO, paid ads, social, analytics and AI-assisted campaigns that actually convert.",
    icon: "megaphone",
    accent: "from-accent-yellow to-hero-glow",
  },
  {
    key: "cad-design",
    title: "CAD / CAM & Design",
    blurb: "AutoCAD, SolidWorks, Revit and 3ds Max for mechanical, civil and architectural work.",
    icon: "cube",
    accent: "from-accent-400 to-hero-800",
  },
  {
    key: "programming",
    title: "Core Programming",
    blurb: "C, C++, Java, Python and DSA — the fundamentals every interview is built on.",
    icon: "terminal",
    accent: "from-brand-400 to-hero-900",
  },
];

export const categoryLabel: Record<CategoryKey, string> = {
  "ai-data": "AI & Data",
  development: "Development",
  "cyber-cloud": "Cyber & Cloud",
  "digital-marketing": "Digital Marketing",
  "cad-design": "CAD & Design",
  programming: "Programming",
};

export const courses: Course[] = [
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    category: "ai-data",
    duration: "6 Months",
    level: "Beginner → Advanced",
    badge: "Hot",
    blurb:
      "From Python foundations to neural networks, LLMs and deployment — the complete AI engineer track.",
    overview:
      "A project-first AI programme that takes you from Python and mathematics through classical machine learning, deep learning and large language models. You finish with three portfolio projects and a deployed model, plus interview preparation with our placement cell.",
    modules: [
      {
        title: "Foundations",
        points: ["Python for AI", "NumPy, Pandas, Matplotlib", "Statistics & linear algebra", "Data wrangling"],
      },
      {
        title: "Machine Learning",
        points: ["Regression & classification", "Trees, ensembles, boosting", "Feature engineering", "Model evaluation"],
      },
      {
        title: "Deep Learning",
        points: ["Neural networks from scratch", "CNNs for vision", "RNNs & transformers", "TensorFlow / PyTorch"],
      },
      {
        title: "Generative AI & Deployment",
        points: ["LLM fundamentals", "Prompt engineering & RAG", "FastAPI model serving", "Docker & cloud deploy"],
      },
    ],
    tools: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "Hugging Face", "FastAPI", "Docker", "AWS"],
    outcomes: [
      "Build and train models on real datasets",
      "Ship an LLM-powered application end to end",
      "Explain model choices in a technical interview",
    ],
    roles: ["AI Engineer", "ML Engineer", "Data Scientist", "AI Product Analyst"],
  },
  {
    slug: "generative-ai",
    title: "Generative AI",
    category: "ai-data",
    duration: "3 Months",
    level: "Intermediate",
    badge: "New",
    blurb:
      "LLMs, prompt engineering, RAG pipelines and agentic workflows — build products on top of modern models.",
    overview:
      "Designed for developers and analysts who want to build with large language models rather than train them from scratch. You will build a retrieval-augmented assistant, a multi-step agent and an evaluation harness.",
    modules: [
      { title: "LLM Fundamentals", points: ["Tokens & embeddings", "Context windows", "Model families", "Cost & latency"] },
      { title: "Prompt Engineering", points: ["Structured prompting", "Few-shot patterns", "Guardrails", "Evaluation"] },
      { title: "RAG Systems", points: ["Chunking strategies", "Vector databases", "Hybrid retrieval", "Citations"] },
      { title: "Agents", points: ["Tool calling", "Multi-step planning", "Memory", "Production monitoring"] },
    ],
    tools: ["Python", "LangChain", "Pinecone", "Chroma", "Streamlit", "Next.js", "Vercel"],
    outcomes: [
      "Ship a production RAG assistant over your own documents",
      "Design and evaluate agentic workflows",
      "Control model cost, latency and hallucination",
    ],
    roles: ["Generative AI Developer", "AI Application Engineer", "Prompt Engineer"],
  },
  {
    slug: "data-science",
    title: "Data Science",
    category: "ai-data",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb: "Statistics, Python, machine learning and storytelling with data for business decisions.",
    overview:
      "A rigorous data science track covering the full analysis lifecycle — collection, cleaning, modelling, and communicating results to non-technical stakeholders through dashboards and reports.",
    modules: [
      { title: "Data Foundations", points: ["Python & SQL", "Excel for analysts", "Data cleaning", "EDA"] },
      { title: "Statistics", points: ["Descriptive stats", "Probability", "Hypothesis testing", "A/B testing"] },
      { title: "Machine Learning", points: ["Supervised learning", "Unsupervised learning", "Time series", "Model tuning"] },
      { title: "Communication", points: ["Power BI dashboards", "Tableau", "Storytelling", "Capstone project"] },
    ],
    tools: ["Python", "SQL", "Power BI", "Tableau", "scikit-learn", "Jupyter", "Excel"],
    outcomes: [
      "Run an end-to-end analysis on messy real data",
      "Build executive dashboards that drive decisions",
      "Defend statistical conclusions confidently",
    ],
    roles: ["Data Scientist", "Data Analyst", "Business Analyst", "BI Developer"],
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    category: "ai-data",
    duration: "4 Months",
    level: "Beginner",
    blurb: "SQL, Excel, Power BI and Tableau — the fastest route into an analytics role.",
    overview:
      "A practical analytics programme built around the tools hiring managers actually list. Every module ends with a dataset you analyse and present, so your portfolio grows week by week.",
    modules: [
      { title: "Excel & Spreadsheets", points: ["Advanced formulas", "Pivot tables", "Power Query", "Dashboards"] },
      { title: "SQL", points: ["Joins & subqueries", "Window functions", "Query optimisation", "Data modelling"] },
      { title: "Power BI", points: ["Data modelling", "DAX", "Interactive reports", "Publishing"] },
      { title: "Tableau & Reporting", points: ["Visual grammar", "Calculated fields", "Story points", "Capstone"] },
    ],
    tools: ["Excel", "SQL", "Power BI", "Tableau", "Python basics"],
    outcomes: [
      "Query and shape data confidently in SQL",
      "Build stakeholder-ready dashboards",
      "Present insights with a clear narrative",
    ],
    roles: ["Data Analyst", "MIS Executive", "Reporting Analyst"],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    category: "ai-data",
    duration: "4 Months",
    level: "Intermediate",
    blurb: "Algorithms, feature engineering and model deployment with Python and scikit-learn.",
    overview:
      "A focused machine learning course for people who already code. You will implement core algorithms, tune them properly, and deploy a model behind an API.",
    modules: [
      { title: "Math for ML", points: ["Linear algebra", "Calculus intuition", "Probability", "Optimisation"] },
      { title: "Core Algorithms", points: ["Linear & logistic models", "SVM & kNN", "Decision trees", "Ensembles"] },
      { title: "Practical ML", points: ["Pipelines", "Cross validation", "Imbalanced data", "Explainability"] },
      { title: "Deployment", points: ["Model packaging", "REST APIs", "Monitoring", "MLOps basics"] },
    ],
    tools: ["Python", "scikit-learn", "XGBoost", "MLflow", "FastAPI", "Docker"],
    outcomes: [
      "Choose the right algorithm for a problem",
      "Diagnose overfitting and data leakage",
      "Serve a trained model in production",
    ],
    roles: ["ML Engineer", "Applied Scientist", "Data Scientist"],
  },
  {
    slug: "mern-full-stack",
    title: "MERN Full Stack Development",
    category: "development",
    duration: "6 Months",
    level: "Beginner → Advanced",
    badge: "Hot",
    blurb: "MongoDB, Express, React and Node — build, test and deploy production web applications.",
    overview:
      "The flagship development track. You build four applications of increasing complexity, ending with a deployed, authenticated, payment-enabled product backed by a real database and CI pipeline.",
    modules: [
      { title: "Frontend Core", points: ["HTML5 & CSS3", "Modern JavaScript", "Tailwind CSS", "Responsive design"] },
      { title: "React", points: ["Components & hooks", "State management", "Routing", "Next.js app router"] },
      { title: "Backend", points: ["Node & Express", "REST & auth (JWT)", "MongoDB & Mongoose", "File uploads"] },
      { title: "Ship It", points: ["Testing", "Git & GitHub", "CI/CD", "Deploy to Vercel & Render"] },
    ],
    tools: ["JavaScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "Tailwind", "Git", "Vercel"],
    outcomes: [
      "Build a full-stack app from empty folder to live URL",
      "Implement secure authentication and payments",
      "Work confidently with Git in a team workflow",
    ],
    roles: ["Full Stack Developer", "Frontend Developer", "Backend Developer", "React Developer"],
  },
  {
    slug: "python-programming",
    title: "Python Programming",
    category: "programming",
    duration: "3 Months",
    level: "Beginner",
    blurb: "Syntax to OOP to real projects — the language behind AI, automation and backend work.",
    overview:
      "A thorough Python course that goes well past syntax: object-oriented design, file and database handling, APIs, automation scripts and a capstone application.",
    modules: [
      { title: "Fundamentals", points: ["Data types", "Control flow", "Functions", "Error handling"] },
      { title: "OOP & Modules", points: ["Classes & inheritance", "Magic methods", "Packages", "Virtual envs"] },
      { title: "Working with Data", points: ["Files & JSON", "SQLite & MySQL", "APIs with requests", "Pandas intro"] },
      { title: "Projects", points: ["Automation scripts", "Flask web app", "Data dashboard", "Capstone"] },
    ],
    tools: ["Python", "Flask", "SQLite", "MySQL", "Pandas", "Git"],
    outcomes: ["Write clean, idiomatic Python", "Automate repetitive real-world tasks", "Build and query databases"],
    roles: ["Python Developer", "Automation Engineer", "Backend Developer"],
  },
  {
    slug: "java-programming",
    title: "Java Programming",
    category: "programming",
    duration: "4 Months",
    level: "Beginner → Advanced",
    blurb: "Core Java, OOP, collections, JDBC and Spring Boot fundamentals.",
    overview:
      "Java from first principles through to enterprise patterns. Strong emphasis on OOP design, collections and the JVM behaviour that interviewers probe.",
    modules: [
      { title: "Core Java", points: ["Syntax & OOP", "Exceptions", "Collections framework", "Generics"] },
      { title: "Advanced Java", points: ["Multithreading", "Streams & lambdas", "File I/O", "JDBC"] },
      { title: "Spring Boot", points: ["Dependency injection", "REST controllers", "Spring Data JPA", "Validation"] },
      { title: "Project", points: ["Layered architecture", "MySQL integration", "Testing", "Deployment"] },
    ],
    tools: ["Java", "Spring Boot", "Maven", "MySQL", "IntelliJ", "Git"],
    outcomes: ["Design clean object-oriented systems", "Build REST APIs with Spring Boot", "Clear core-Java interviews"],
    roles: ["Java Developer", "Backend Engineer", "Software Engineer"],
  },
  {
    slug: "web-designing",
    title: "Web Designing",
    category: "development",
    duration: "45 Days",
    level: "Beginner",
    blurb: "HTML, CSS, Tailwind, Figma and responsive UI — your first step into the web.",
    overview:
      "A fast, hands-on introduction to building beautiful, responsive interfaces. Perfect as a summer training programme or a foundation before full-stack development.",
    modules: [
      { title: "Markup & Styling", points: ["Semantic HTML5", "CSS3 & flexbox", "CSS grid", "Animations"] },
      { title: "Frameworks", points: ["Tailwind CSS", "Bootstrap", "Component patterns", "Accessibility"] },
      { title: "Design", points: ["Figma basics", "Type & colour", "Layout systems", "Design handoff"] },
      { title: "Publish", points: ["Responsive testing", "Performance basics", "Domain & hosting", "Portfolio site"] },
    ],
    tools: ["HTML5", "CSS3", "Tailwind", "Bootstrap", "Figma", "GitHub Pages"],
    outcomes: ["Convert any design into a responsive page", "Build a personal portfolio site", "Understand accessibility basics"],
    roles: ["Web Designer", "UI Developer", "Frontend Intern"],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    category: "cyber-cloud",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb: "Network defence, threat analysis, and the certifications employers ask for.",
    overview:
      "A defensive security programme covering networking, operating system hardening, threat detection and incident response, taught in a lab environment you can break safely.",
    modules: [
      { title: "Networking", points: ["TCP/IP & OSI", "Routing & switching", "Firewalls", "VPNs"] },
      { title: "System Security", points: ["Linux hardening", "Windows security", "Access control", "Cryptography"] },
      { title: "Threats & Defence", points: ["Malware analysis", "SIEM basics", "Vulnerability scanning", "Incident response"] },
      { title: "Governance", points: ["ISO 27001 overview", "Risk assessment", "Compliance", "Reporting"] },
    ],
    tools: ["Kali Linux", "Wireshark", "Nmap", "Metasploit", "Splunk", "Burp Suite"],
    outcomes: ["Analyse and respond to real incidents", "Harden Linux and Windows systems", "Prepare for CEH / Security+"],
    roles: ["Security Analyst", "SOC Analyst", "Network Security Engineer"],
  },
  {
    slug: "ethical-hacking",
    title: "Ethical Hacking",
    category: "cyber-cloud",
    duration: "3 Months",
    level: "Intermediate",
    blurb: "Penetration testing methodology on a legal, isolated lab network.",
    overview:
      "Learn offensive security the right way — reconnaissance, exploitation and reporting, performed only inside our isolated lab, with a strong grounding in scope, consent and legal boundaries.",
    modules: [
      { title: "Recon", points: ["Footprinting", "Scanning & enumeration", "OSINT", "Scoping & consent"] },
      { title: "Exploitation", points: ["System hacking", "Web app attacks (OWASP Top 10)", "Wireless", "Social engineering awareness"] },
      { title: "Post-Exploitation", points: ["Privilege escalation", "Persistence concepts", "Covering the basics of detection", "Cleanup"] },
      { title: "Reporting", points: ["Evidence collection", "Risk rating", "Remediation advice", "Client-ready reports"] },
    ],
    tools: ["Kali Linux", "Nmap", "Burp Suite", "Metasploit", "OWASP ZAP", "John the Ripper"],
    outcomes: ["Run a structured penetration test", "Write a professional pentest report", "Understand legal & ethical scope"],
    roles: ["Penetration Tester", "Security Consultant", "Bug Bounty Hunter"],
  },
  {
    slug: "cloud-computing",
    title: "Cloud Computing & DevOps",
    category: "cyber-cloud",
    duration: "5 Months",
    level: "Intermediate",
    blurb: "AWS, Linux, Docker, Kubernetes and CI/CD pipelines that ship code safely.",
    overview:
      "Everything between a developer's laptop and a running production service — Linux administration, containers, orchestration, infrastructure as code and automated delivery.",
    modules: [
      { title: "Linux & Networking", points: ["Shell & scripting", "Users & permissions", "Systemd", "DNS & load balancing"] },
      { title: "AWS", points: ["EC2, S3, VPC", "IAM & security", "RDS", "Cost management"] },
      { title: "Containers", points: ["Docker images", "Compose", "Kubernetes basics", "Helm"] },
      { title: "Automation", points: ["Git workflows", "Jenkins / GitHub Actions", "Terraform", "Monitoring"] },
    ],
    tools: ["AWS", "Linux", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions"],
    outcomes: ["Deploy and scale an app on AWS", "Containerise any application", "Build a CI/CD pipeline from scratch"],
    roles: ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "digital-marketing",
    duration: "4 Months",
    level: "Beginner → Advanced",
    badge: "Trending",
    blurb: "SEO, Google Ads, social media, analytics and AI-assisted content that performs.",
    overview:
      "A campaign-driven marketing course. You run real budgets on real ad accounts, rank a live site, and finish with a documented case study you can show any employer or client.",
    modules: [
      { title: "Foundations", points: ["Marketing funnels", "Audience research", "Website & WordPress", "Landing pages"] },
      { title: "SEO", points: ["Keyword research", "On-page & technical SEO", "Link building", "Local SEO"] },
      { title: "Paid & Social", points: ["Google Ads", "Meta Ads", "Creative testing", "Budget management"] },
      { title: "Analytics & AI", points: ["GA4", "Search Console", "AI content workflows", "Reporting"] },
    ],
    tools: ["WordPress", "Google Ads", "Meta Ads", "GA4", "Semrush", "Canva", "ChatGPT"],
    outcomes: ["Rank a website on page one for local terms", "Run profitable paid campaigns", "Report performance credibly"],
    roles: ["Digital Marketing Executive", "SEO Specialist", "Performance Marketer", "Freelancer"],
  },
  {
    slug: "autocad",
    title: "AutoCAD",
    category: "cad-design",
    duration: "2 Months",
    level: "Beginner",
    blurb: "2D drafting and 3D modelling for mechanical, civil and architectural drawings.",
    overview:
      "Industry-standard drafting taught by practising engineers. You produce a complete drawing set — plans, sections, details — to professional standards.",
    modules: [
      { title: "2D Drafting", points: ["Draw & modify tools", "Layers & properties", "Dimensioning", "Blocks"] },
      { title: "Drawing Standards", points: ["Title blocks", "Annotation scales", "Plotting & layouts", "Sheet sets"] },
      { title: "3D Modelling", points: ["Solids & surfaces", "Visual styles", "Rendering", "Sections"] },
      { title: "Project", points: ["Floor plan", "Machine part set", "Site layout", "Portfolio drawings"] },
    ],
    tools: ["AutoCAD", "DWG TrueView", "Design Center"],
    outcomes: ["Produce accurate, standards-compliant drawings", "Model parts in 3D", "Plot professional drawing sets"],
    roles: ["CAD Draftsman", "Design Engineer", "Civil Draftsman"],
  },
  {
    slug: "solidworks",
    title: "SolidWorks",
    category: "cad-design",
    duration: "2 Months",
    level: "Beginner → Advanced",
    blurb: "Parametric part modelling, assemblies, drawings and simulation.",
    overview:
      "Mechanical design in SolidWorks — from sketch-based features to large assemblies, motion studies and manufacturing drawings.",
    modules: [
      { title: "Part Design", points: ["Sketching & relations", "Features", "Patterns", "Configurations"] },
      { title: "Assemblies", points: ["Mates", "Sub-assemblies", "Interference detection", "Exploded views"] },
      { title: "Drawings", points: ["Views & sections", "GD&T", "BOM", "Detailing standards"] },
      { title: "Analysis", points: ["Motion study", "SimulationXpress", "Sheet metal", "Weldments"] },
    ],
    tools: ["SolidWorks", "eDrawings", "SimulationXpress"],
    outcomes: ["Model complex parametric parts", "Manage multi-part assemblies", "Produce manufacturing-ready drawings"],
    roles: ["Mechanical Design Engineer", "Product Designer", "CAD Engineer"],
  },
  {
    slug: "cpp-dsa",
    title: "C, C++ & Data Structures",
    category: "programming",
    duration: "4 Months",
    level: "Beginner → Advanced",
    blurb: "Pointers, memory, OOP and the DSA that placement tests are built on.",
    overview:
      "The classic foundation course. Deep coverage of memory and pointers in C, object orientation in C++, and a full data structures and algorithms track with weekly coding contests.",
    modules: [
      { title: "C Programming", points: ["Pointers & memory", "Arrays & strings", "Structures", "File handling"] },
      { title: "C++ & OOP", points: ["Classes & objects", "Inheritance & polymorphism", "Templates", "STL"] },
      { title: "Data Structures", points: ["Linked lists", "Stacks & queues", "Trees & heaps", "Graphs & hashing"] },
      { title: "Algorithms", points: ["Sorting & searching", "Recursion", "Greedy & DP", "Complexity analysis"] },
    ],
    tools: ["C", "C++", "STL", "VS Code", "GDB", "LeetCode"],
    outcomes: ["Reason about time and space complexity", "Solve medium-level DSA problems", "Clear campus placement rounds"],
    roles: ["Software Engineer", "SDE Intern", "Backend Developer"],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const featuredCourses = () =>
  courses.filter((c) =>
    [
      "artificial-intelligence",
      "mern-full-stack",
      "data-science",
      "digital-marketing",
      "cyber-security",
      "cloud-computing",
    ].includes(c.slug),
  );

export const trainingPrograms = [
  {
    duration: "45 Days",
    title: "Summer & Winter Industrial Training",
    blurb: "A fast, focused sprint on one technology with a working project and a certificate.",
    points: ["One core technology", "Guided mini project", "Training certificate", "Weekday or weekend batches"],
  },
  {
    duration: "6 Weeks",
    title: "University-Mandated Training",
    blurb: "Meets AICTE / university requirements with documentation your college accepts.",
    points: ["Syllabus-aligned modules", "Project report & viva prep", "Attendance records", "Verified certificate"],
  },
  {
    duration: "6 Months",
    title: "Industrial Training with Internship",
    blurb: "Full technology stack plus a live client-style project and placement drives.",
    points: ["Complete stack coverage", "Live project experience", "Internship letter", "Placement assistance"],
  },
  {
    duration: "9 Months",
    title: "Expert Track",
    blurb: "Our deepest programme — client-level projects, advanced modules and dedicated mentoring.",
    points: ["Two specialisations", "Client-level projects", "Dedicated mentor", "Priority placement support"],
  },
];

export const technologies = [
  "Python", "React", "Next.js", "Node.js", "MongoDB", "TensorFlow", "PyTorch", "AWS", "Docker",
  "Kubernetes", "Java", "Spring Boot", "MySQL", "PostgreSQL", "Power BI", "Tableau", "Figma",
  "Tailwind CSS", "Git", "Linux", "Kali", "Wireshark", "Burp Suite", "Google Ads", "GA4",
  "WordPress", "Shopify", "AutoCAD", "SolidWorks", "Revit", "3ds Max", "LangChain", "Hugging Face",
  "FastAPI", "Express", "TypeScript", "C++", "Terraform", "Jenkins", "Excel",
];

export const faqs = [
  {
    q: "Do I need a technical background to join?",
    a: "No. Most of our beginner tracks — Python, Web Designing, Data Analytics, Digital Marketing — assume nothing. Your counsellor will place you in the right batch after a short conversation about your goals and current level.",
  },
  {
    q: "What does placement assistance actually include?",
    a: "Resume and LinkedIn rebuilds, mock technical and HR interviews, DSA and aptitude practice, and introductions to our hiring-partner network. Drives run continuously through the year, and support continues after your course ends until you are placed.",
  },
  {
    q: "Are classes online or at the Mohali centre?",
    a: "Both. You can attend at our Sector 75 campus in Mohali, join the same batch live online, or mix the two. Every session is recorded and stays available in your student portal.",
  },
  {
    q: "Can I do this alongside college or a job?",
    a: "Yes. We run early-morning, evening and weekend batches specifically for working professionals and students with college schedules. Batch timing is fixed when you enrol.",
  },
  {
    q: "Will I get a certificate that employers recognise?",
    a: "You receive an ISO-certified training certificate along with a project completion letter and, on the 6-month and 9-month tracks, an internship letter documenting your live project work.",
  },
  {
    q: "Is there an EMI or instalment option?",
    a: "Yes. Fees can be split across instalments over the duration of the course, and we have no-cost EMI options with partner providers. Talk to the admissions desk for the current plans.",
  },
];

export const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Full Stack Developer",
    company: "Placed at an IT firm in Mohali",
    quote:
      "I joined the 6-month MERN track straight after B.Tech with almost no practical experience. The live project work is what changed things — I had real code to talk about in interviews instead of just a syllabus.",
  },
  {
    name: "Simran Kaur",
    role: "Data Analyst",
    company: "Placed in Chandigarh IT Park",
    quote:
      "The trainers actually work in the field, so every session had context from real projects. The Power BI and SQL modules were exactly what my interview rounds tested.",
  },
  {
    name: "Arjun Mehta",
    role: "AI Engineer",
    company: "Product startup, Bengaluru",
    quote:
      "The Generative AI course was current in a way online tutorials are not. Building a full RAG pipeline and deploying it gave me something genuinely impressive for my portfolio.",
  },
  {
    name: "Neha Gupta",
    role: "Digital Marketing Executive",
    company: "Agency, Mohali",
    quote:
      "Running real ad budgets during the course was the difference. I walked into my first job already knowing how to read a campaign report and fix what was underperforming.",
  },
  {
    name: "Karan Singh",
    role: "Security Analyst",
    company: "Placed via campus drive",
    quote:
      "The cyber security lab setup let me break things safely and learn how attacks really work. Placement cell arranged three interviews within a month of finishing.",
  },
  {
    name: "Priya Verma",
    role: "Mechanical Design Engineer",
    company: "Manufacturing firm, Punjab",
    quote:
      "AutoCAD and SolidWorks were taught with actual production drawings, not textbook exercises. My employer noticed that my drawing sets followed proper standards from day one.",
  },
];

export const whyUs = [
  {
    title: "Trainers who still build",
    body: "Every instructor is a practising engineer or marketer. You learn current tooling and the judgement calls that come with it — not a syllabus written five years ago.",
    stat: "15+ yrs",
    statLabel: "average centre experience",
  },
  {
    title: "Live projects, not exercises",
    body: "From week three you work on project code with requirements, reviews and deadlines. That is what fills a portfolio and what interviewers ask about.",
    stat: "4+",
    statLabel: "portfolio projects per track",
  },
  {
    title: "Placement machinery that runs",
    body: "A dedicated cell handles resumes, mock interviews and a hiring-partner network across Mohali, Chandigarh and beyond. Support continues until you are placed.",
    stat: "450+",
    statLabel: "hiring partners",
  },
  {
    title: "Batches built around your life",
    body: "Morning, evening, weekend and online batches, all recorded. Students, working professionals and career-changers train in the same programme on their own schedule.",
    stat: "98%",
    statLabel: "course completion rate",
  },
];

export const process = [
  {
    step: "01",
    title: "Free counselling",
    body: "Tell us your background and where you want to be. We map that to a specific track, batch and timeline — no generic brochure.",
  },
  {
    step: "02",
    title: "Learn by building",
    body: "Concepts in the morning, code in the afternoon. Each module ends in something that runs, gets reviewed and goes into your portfolio.",
  },
  {
    step: "03",
    title: "Live project & internship",
    body: "Join a project team with real requirements and deadlines, mentored by a working engineer, and earn an internship letter.",
  },
  {
    step: "04",
    title: "Interview & placement",
    body: "Resume rebuild, mock interviews, aptitude practice, then introductions to hiring partners and continuous placement drives.",
  },
];
