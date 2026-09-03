export const universities = [
  "IKG Punjab Technical University (PTU)",
  "Guru Nanak Dev University (GNDU)",
  "Punjabi University, Patiala",
  "PSBTE (Diploma)",
  "Chandigarh University",
  "Lovely Professional University (LPU)",
  "DAV University, Jalandhar",
  "CT University, Ludhiana",
  "RIMT University, Mandi Gobindgarh",
  "SGGS / SLIET / NIT",
  "Kurukshetra University",
  "HP University / HP Technical",
  "Other University or Board",
];

export type Branch = { label: string; icon: string };

export const branches: Branch[] = [
  { label: "CSE / IT / Computer Applications", icon: "code" },
  { label: "BCA / BCA-AI / B.Sc IT", icon: "terminal" },
  { label: "MCA / M.Sc IT / M.Tech CS", icon: "layers" },
  { label: "Mechanical & Automobile Engg.", icon: "cube" },
  { label: "Civil & Architectural Engg.", icon: "building" },
  { label: "ECE / EE / Electronics", icon: "bolt" },
  { label: "AI & Data Science / ML", icon: "sparkles" },
  { label: "MBA / BBA / Commerce", icon: "briefcase" },
];

export const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

type SemesterMatch = { tag: string; title: string; blurb: string; seats: number };

/** Sem 1–2: exploratory. Sem 3–4: mandated summer training. Sem 5–6: minor project. Sem 7–8: major/internship. */
const YEAR_MATCH: Record<1 | 2 | 3 | 4, SemesterMatch> = {
  1: {
    tag: "FIRST YEAR TRACK",
    title: "2-Week Foundation Workshop",
    blurb:
      "An early, low-pressure introduction to programming and tools. Most universities do not mandate training this early — this is optional groundwork.",
    seats: 9,
  },
  2: {
    tag: "SECOND YEAR TRACK",
    title: "6 Weeks / 45 Days Summer Training",
    blurb:
      "Meets your university's second-year industrial training requirement with a guided project and a verified certificate.",
    seats: 5,
  },
  3: {
    tag: "PRE-FINAL YEAR TRACK",
    title: "6 Weeks / 2 Months Minor Project Training",
    blurb:
      "Builds a production-grade live project to strengthen your resume before campus recruitment and fulfil university pre-final year training credits.",
    seats: 4,
  },
  4: {
    tag: "FINAL YEAR TRACK",
    title: "6 Months Industrial Training with Internship",
    blurb:
      "A full technology stack, a client-style live project and an internship letter — built for placement season.",
    seats: 6,
  },
};

export function matchForSemester(sem: number): SemesterMatch {
  const year = Math.min(4, Math.ceil(sem / 2)) as 1 | 2 | 3 | 4;
  return YEAR_MATCH[year];
}

export type LiveProjectTrack = {
  tag: string;
  title: string;
  weeks: string;
  blurb: string;
  stack: string[];
  includes: string[];
};

export const liveProjectTracks: LiveProjectTrack[] = [
  {
    tag: "MOST POPULAR",
    title: "MERN Stack Live Project",
    weeks: "6 Weeks",
    blurb:
      "Full-stack application development from scratch with authentication, REST APIs, database architecture, and cloud deployment.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Vercel / Render"],
    includes: [
      "1 Production-Grade Web App",
      "Complete GitHub Repository",
      "PTU/GNDU Approved Project Report & Synopsis",
    ],
  },
  {
    tag: "HIGH DEMAND",
    title: "Python, AI & Machine Learning Track",
    weeks: "6 Weeks",
    blurb:
      "Core Python algorithms, data analysis, and real-world predictive ML models with REST API building.",
    stack: ["Python 3", "Pandas", "NumPy", "Scikit-Learn", "FastAPI", "Streamlit"],
    includes: [
      "1 Live Predictive AI Project",
      "Model Evaluation Documentation",
      "University Training Certificate",
    ],
  },
  {
    tag: "CORE CORPORATE",
    title: "Java Full Stack Enterprise Development",
    weeks: "6 Weeks",
    blurb:
      "Enterprise backend architecture using Spring Boot, Hibernate, microservices concepts, and SQL database optimization.",
    stack: ["Core Java", "Spring Boot", "Hibernate", "MySQL", "REST APIs", "Postman"],
    includes: ["1 Enterprise CRUD Application", "Database Schema Docs", "Viva & Interview Prep Kit"],
  },
  {
    tag: "TRENDING",
    title: "Cloud Computing & DevOps",
    weeks: "6 Weeks",
    blurb:
      "Deploy and manage applications on AWS and Azure with Docker containers, CI/CD pipelines, and infrastructure automation.",
    stack: ["AWS EC2/S3", "Azure", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"],
    includes: ["1 Deployed Cloud Application", "CI/CD Pipeline Documentation", "Training Certificate"],
  },
  {
    tag: "HIGH DEMAND",
    title: "Cybersecurity & Ethical Hacking",
    weeks: "6 Weeks",
    blurb:
      "Penetration testing, vulnerability assessment, network security, and web application security on a live lab.",
    stack: ["Kali Linux", "Wireshark", "Nmap", "Burp Suite", "Metasploit", "OWASP ZAP"],
    includes: ["Security Audit Report", "Vulnerability Assessment Documentation", "Approved Project Report"],
  },
  {
    tag: "WEB DEVELOPMENT",
    title: "PHP / Laravel Full Stack",
    weeks: "6 Weeks",
    blurb:
      "Server-side web development with PHP and Laravel, database design, REST APIs, and WordPress customisation.",
    stack: ["PHP 8", "Laravel", "MySQL", "REST APIs", "WordPress", "Composer", "cPanel"],
    includes: ["1 Dynamic Web Application", "Database Design Document", "Training Certificate"],
  },
];

export const deliverables = [
  {
    title: "College Synopsis & Approval Letter",
    body: "Formal project synopsis drafted within the first two weeks for department guide sign-off and HOD approval.",
  },
  {
    title: "Daily Training Diary & Logbook",
    body: "Standardised documentation of daily learning modules, lab milestones, and weekly progress summaries.",
  },
  {
    title: "Final University Project Report",
    body: "Hard-copy and soft-copy report formatted to university guidelines with architecture diagrams, code, and references.",
  },
  {
    title: "Live Deployment & Viva Prep",
    body: "Live web application deployment or a certified CAD portfolio review, with mock viva sessions for external examiners.",
  },
];

export const partnerColleges = [
  "GNDEC Ludhiana",
  "SVIET Banur",
  "BBSBEC Fatehgarh Sahib",
  "CGC Landran",
  "CGC Jhanjeri",
  "DAVIET Jalandhar",
  "Rayat Bahra",
  "CT Group",
  "GIMET Amritsar",
  "RIMT University",
  "Guizar Group",
  "PCTE Ludhiana",
  "BCET Gurdaspur",
  "GZSCCET Bathinda",
  "DIET Kharar",
  "BIT Bhaddal",
  "ACET Nawanshahr",
  "ACET Amritsar",
  "Govt. Polytechnic Jalandhar",
  "Govt. Polytechnic Amritsar",
  "SBBSIET Padhiana",
  "LLRIET Moga",
  "CTIEMT Jalandhar",
];
