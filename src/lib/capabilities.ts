/**
 * The six tracks behind the Capabilities section.
 *
 * A tool renders its logo one of three ways, in order of preference:
 *   mark  — a hand-drawn brand path in TechMark
 *   emoji — the vendor's own glyph, when that IS the logo (Hugging Face)
 *   short — a monogram in the vendor's colour, for marks that do not survive
 *           being redrawn at 22px (wordmark-only logos, mascots)
 */
export type Tool = {
  name: string;
  role: string;
  mark?: string;
  emoji?: string;
  short?: string;
  color?: string;
};

export type Capability = {
  key: string;
  label: string;
  blurb: string;
  href: string;
  tools: Tool[];
};

export const capabilities: Capability[] = [
  {
    key: "ai",
    label: "AI & Machine Learning",
    blurb: "Models trained, tuned and shipped — not notebooks that only run once.",
    href: "/courses/course/artificial-intelligence",
    tools: [
      { name: "TensorFlow", role: "Model training", mark: "tensorflow" },
      { name: "PyTorch", role: "Deep learning", mark: "pytorch" },
      { name: "OpenAI", role: "LLM APIs", mark: "openai" },
      { name: "Hugging Face", role: "Open models", emoji: "🤗" },
      { name: "scikit-learn", role: "Classical ML", short: "sk", color: "#F7931E" },
      { name: "Keras", role: "Neural nets", mark: "keras" },
      { name: "pandas", role: "Data wrangling", mark: "pandas" },
      { name: "Jupyter", role: "Experiments", mark: "jupyter" },
    ],
  },
  {
    key: "fullstack",
    label: "Full-Stack Engineering",
    blurb: "One codebase from database to deployed URL, reviewed like production work.",
    href: "/courses/course/mern-full-stack",
    tools: [
      { name: "React", role: "Interfaces", mark: "react" },
      { name: "Next.js", role: "App framework", mark: "nextjs" },
      { name: "Node.js", role: "Server runtime", mark: "node" },
      { name: "MongoDB", role: "Database", mark: "mongodb" },
      { name: "TypeScript", role: "Type safety", mark: "typescript" },
      { name: "Tailwind CSS", role: "Styling", mark: "tailwind" },
      { name: "Figma", role: "Design handoff", mark: "figma" },
      { name: "Git", role: "Version control", mark: "git" },
    ],
  },
  {
    key: "data",
    label: "Data & Analytics",
    blurb: "Questions turned into queries, dashboards and decisions leadership acts on.",
    href: "/courses/course/data-analytics",
    tools: [
      { name: "Python", role: "Analysis", mark: "python" },
      { name: "pandas", role: "Dataframes", mark: "pandas" },
      { name: "PostgreSQL", role: "SQL engine", short: "Pg", color: "#4169E1" },
      { name: "Power BI", role: "Dashboards", mark: "powerbi" },
      { name: "Tableau", role: "Visual analysis", mark: "tableau" },
      { name: "Excel", role: "Modelling", mark: "excel" },
      { name: "Jupyter", role: "Notebooks", mark: "jupyter" },
      { name: "Looker Studio", role: "Reporting", short: "LS", color: "#4285F4" },
    ],
  },
  {
    key: "cloud",
    label: "Cloud & DevOps",
    blurb: "Pipelines, containers and infrastructure that survive a Monday deploy.",
    href: "/courses/course/cloud-computing",
    tools: [
      { name: "AWS", role: "Cloud platform", mark: "aws" },
      { name: "Docker", role: "Containers", mark: "docker" },
      { name: "Kubernetes", role: "Orchestration", mark: "kubernetes" },
      { name: "Linux", role: "Administration", mark: "linux" },
      { name: "Terraform", role: "Infrastructure", mark: "terraform" },
      { name: "Jenkins", role: "CI/CD", short: "J", color: "#D33833" },
      { name: "Git", role: "Workflows", mark: "git" },
      { name: "Nginx", role: "Serving", mark: "nginx" },
    ],
  },
  {
    key: "cyber",
    label: "Cyber Security",
    blurb: "Attack and defence in an isolated lab, with reports a client would accept.",
    href: "/courses/course/cyber-security",
    tools: [
      { name: "Kali Linux", role: "Testing distro", short: "K", color: "#557C94" },
      { name: "Wireshark", role: "Packet analysis", short: "W", color: "#1679A7" },
      { name: "Burp Suite", role: "Web app testing", short: "B", color: "#FF6633" },
      { name: "Nmap", role: "Reconnaissance", short: "N", color: "#4C8EDA" },
      { name: "Metasploit", role: "Exploitation", short: "M", color: "#2596CD" },
      { name: "OWASP", role: "Top 10", short: "O", color: "#000000" },
      { name: "Splunk", role: "SIEM", mark: "splunk" },
      { name: "Linux", role: "Hardening", mark: "linux" },
    ],
  },
  {
    key: "marketing",
    label: "Digital Marketing",
    blurb: "Real budgets on real ad accounts, measured against real revenue.",
    href: "/courses/course/digital-marketing",
    tools: [
      { name: "Google Ads", role: "Paid search", mark: "googleads" },
      { name: "Meta Ads", role: "Paid social", mark: "meta" },
      { name: "GA4", role: "Analytics", mark: "analytics" },
      { name: "Search Console", role: "Technical SEO", mark: "searchconsole" },
      { name: "Semrush", role: "Keyword research", short: "S", color: "#FF642D" },
      { name: "WordPress", role: "Websites", mark: "wordpress" },
      { name: "Shopify", role: "Commerce", mark: "shopify" },
      { name: "Canva", role: "Creative", mark: "canva" },
    ],
  },
];
