export const site = {
  name: "techcadd",
  city: "Mohali",
  legalName: "techcadd Computer Education",
  tagline: "Your Skill & Technology Partner",
  description:
    "techcadd Mohali is a leading IT training institute in Mohali & Chandigarh offering job-oriented courses in AI, full-stack development, data science, cyber security, digital marketing and CAD — with live projects and 100% placement assistance.",
  url: "https://www.techcaddmohali.com",
  phone: "+91 98881 22255",
  phoneHref: "tel:+919888122255",
  whatsapp: "+91 98881 22442",
  whatsappHref: "https://wa.me/919888122442",
  email: "info@techcadd.com",
  emailHref: "mailto:info@techcadd.com",
  address: {
    line1: "Plot No. F-547, 3rd Floor, Industrial Area 8A",
    line2: "Sector 75, Sahibzada Ajit Singh Nagar (Mohali)",
    line3: "Punjab 160055",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Plot+F-547+Industrial+Area+8A+Sector+75+Mohali+Punjab+160055",
  hours: "Mon – Sat, 9 AM – 7 PM",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "WhatsApp", href: "https://wa.me/919888122442" },
  ],
} as const;

export const stats = [
  { value: 12450, suffix: "+", label: "Students trained" },
  { value: 450, suffix: "+", label: "Hiring partners" },
  { value: 98, suffix: "%", label: "Placement success" },
  { value: 15, suffix: "+", label: "Years of excellence" },
];

export type NavChild = { label: string; href: string; badge?: string };
export type NavGroup = { heading: string; items: NavChild[] };
export type NavItem = {
  label: string;
  href: string;
  groups?: NavGroup[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Courses",
    href: "/courses",
    groups: [
      {
        heading: "AI & Data",
        items: [
          { label: "Artificial Intelligence", href: "/courses/artificial-intelligence", badge: "Hot" },
          { label: "Generative AI", href: "/courses/generative-ai", badge: "New" },
          { label: "Data Science", href: "/courses/data-science" },
          { label: "Data Analytics", href: "/courses/data-analytics" },
          { label: "Machine Learning", href: "/courses/machine-learning" },
        ],
      },
      {
        heading: "Development",
        items: [
          { label: "Full Stack (MERN)", href: "/courses/mern-full-stack" },
          { label: "Python Programming", href: "/courses/python-programming" },
          { label: "Java Programming", href: "/courses/java-programming" },
          { label: "Web Designing", href: "/courses/web-designing" },
        ],
      },
      {
        heading: "Cyber & Cloud",
        items: [
          { label: "Cyber Security", href: "/courses/cyber-security" },
          { label: "Ethical Hacking", href: "/courses/ethical-hacking" },
          { label: "Cloud Computing", href: "/courses/cloud-computing" },
        ],
      },
      {
        heading: "Marketing & CAD",
        items: [
          { label: "Digital Marketing", href: "/courses/digital-marketing", badge: "Trending" },
          { label: "AutoCAD", href: "/courses/autocad" },
          { label: "SolidWorks", href: "/courses/solidworks" },
        ],
      },
    ],
  },
  { label: "Training", href: "/training" },
  { label: "Placements", href: "/placements" },
  { label: "Contact", href: "/contact" },
];
