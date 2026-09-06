export type EventCategory = "Workshop" | "Seminar";

export type EventItem = {
  slug: string;
  title: string;
  category: EventCategory;
  status: "Past" | "Upcoming";
  dateLabel: string;
  date: string;
  location: string;
  excerpt: string;
};

export const eventArt = [
  "from-brand-400 to-hero-900",
  "from-accent-yellow to-hero-glow",
  "from-accent-glow to-hero-glow",
  "from-hero-glow to-brand-700",
  "from-accent-yellow to-accent-500",
  "from-up-soft to-hero-600",
  "from-accent-400 to-hero-800",
];

export const events: EventItem[] = [
  {
    slug: "4-day-app-development-workshop-ggi-amritsar",
    title: "4-Day App Development Workshop",
    category: "Workshop",
    status: "Past",
    dateLabel: "23–27 Jun 2026",
    date: "2026-06-23",
    location: "Global Group of Institutions, Amritsar",
    excerpt:
      "4 days. Hands-on learning. Real app development. The techcadd team successfully conducted a 4-Day App Development Workshop at Global Group of Institutions, Amritsar.",
  },
  {
    slug: "techcadd-robo-dog-chichi-ai-summit-cii-chandigarh",
    title: "techcadd's Robo Dog Chi Chi in AI Summit",
    category: "Seminar",
    status: "Past",
    dateLabel: "17–18 Apr 2026",
    date: "2026-04-17",
    location: "CII, Chandigarh",
    excerpt:
      "Chi-Chi stole the spotlight at the AI Summit! From students to parents, the interactive experience sparked curiosity, excitement, and meaningful conversations about robotics and AI.",
  },
  {
    slug: "seminar-on-future-with-ai-ggi-amritsar",
    title: "Seminar on Future with AI",
    category: "Seminar",
    status: "Past",
    dateLabel: "17 Mar 2026",
    date: "2026-03-17",
    location: "Global Group of Institutes, Amritsar",
    excerpt:
      "An insightful seminar at Global Group of Institutes, Amritsar, led by Gourav Gupta, Founder & CEO of techcadd, featuring engaging discussions on the future of artificial intelligence.",
  },
  {
    slug: "engaging-interactive-technology-session-doaba-college",
    title: "An Engaging and Interactive Technology Session",
    category: "Seminar",
    status: "Past",
    dateLabel: "13 Mar 2026",
    date: "2026-03-13",
    location: "Doaba College, Chandigarh",
    excerpt:
      "Techcadd conducted an engaging technology session at Doaba College, Chandigarh, connecting with enthusiastic students and helping them explore emerging tech careers.",
  },
  {
    slug: "evolving-technology-career-opportunities-hmv-jalandhar",
    title: "Seminar on Evolving Technology Landscape and Emerging Career Opportunities",
    category: "Seminar",
    status: "Past",
    dateLabel: "13 Mar 2026",
    date: "2026-03-13",
    location: "H.M.V, Jalandhar",
    excerpt:
      "Techcadd engaged with students at Hans Raj Mahila Maha Vidyalaya, Jalandhar, offering insights into technology, emerging career opportunities, and industry-ready skills.",
  },
  {
    slug: "ai-emerging-technology-seminar-bbsbec-fatehgarh",
    title: "Artificial Intelligence and Emerging Technology Seminar",
    category: "Seminar",
    status: "Past",
    dateLabel: "12 Mar 2026",
    date: "2026-03-12",
    location: "Baba Banda Singh Bahadur Engineering College, Fatehgarh",
    excerpt:
      "Techcadd conducted an AI and emerging technology seminar at Baba Banda Singh Bahadur Engineering College, engaging students through live demos and interactive discussions.",
  },
  {
    slug: "generative-ai-session-pyramid-college-phagwara",
    title: "techcadd Conducts Generative AI Session at Pyramid College",
    category: "Seminar",
    status: "Past",
    dateLabel: "11–12 Mar 2026",
    date: "2026-03-11",
    location: "Pyramid College, Phagwara",
    excerpt:
      "Techcadd conducted an engaging Generative AI session at Pyramid College, where experts Eakumpreet Singh and Nandini Ma'am shared insights on real-world AI applications.",
  },
  {
    slug: "generative-ai-artificial-intelligence-seminar-pyramid-college",
    title: "Generative AI and Artificial Intelligence Seminar",
    category: "Seminar",
    status: "Past",
    dateLabel: "11–12 Mar 2026",
    date: "2026-03-11",
    location: "Pyramid College, Phagwara",
    excerpt:
      "Techcadd conducted a Generative AI seminar led by AI expert Eakumpreet Singh, introducing students to Artificial Intelligence concepts and hands-on use cases.",
  },
  {
    slug: "insightful-technology-session-chandigarh-university",
    title: "techcadd Conducts Insightful Technology Session at Chandigarh University",
    category: "Seminar",
    status: "Past",
    dateLabel: "26 Feb 2026",
    date: "2026-02-26",
    location: "Chandigarh University, Chandigarh",
    excerpt:
      "Techcadd conducted an insightful technology session at Chandigarh University, led by Founder Gourav Gupta, helping students explore the evolving tech landscape.",
  },
  {
    slug: "ai-chichi-robot-akal-university",
    title: "techcadd Introduces Artificial Intelligence & Chi Chi Robot at Akal University",
    category: "Seminar",
    status: "Past",
    dateLabel: "11 Feb 2026",
    date: "2026-02-11",
    location: "Akal University, Talwandi Sabo",
    excerpt:
      "Techcadd conducted an interactive seminar at Akal University, introducing students to the Chi Chi Robot and the possibilities of Artificial Intelligence in everyday life.",
  },
  {
    slug: "ai-industry-4-0-workshop-dav-college-jalandhar",
    title: "techcadd Conducts AI & Industry 4.0 Workshop at DAV College, Jalandhar",
    category: "Seminar",
    status: "Past",
    dateLabel: "29 Jan 2026",
    date: "2026-01-29",
    location: "DAV College, Jalandhar",
    excerpt:
      "Techcadd conducted an AI and Industry 4.0 workshop at DAV College, Jalandhar, introducing students to emerging technologies and real-world industrial applications.",
  },
];
