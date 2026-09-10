import type { CourseOverride } from "@/lib/content/overrides";
import type { WrittenCertificateHero, WrittenHeading } from "@/lib/content/mernCertificate";

/**
 * The Certificate Programs menu's Cloud Computing page, at
 * `/courses/certificate-programs/cloud-computing`.
 *
 * The same catalogue course the Courses and After 12th menus list, written to
 * its own brief: cloud infrastructure, networking, storage, virtualization,
 * security and deployment, taught hands-on with exposure to AWS, Azure and
 * Google Cloud Platform.
 *
 * No `comparison`: this brief makes its case in prose only, so the "why this
 * institute" section renders the four differences alone. No `tracks` export
 * either — the brief names no specific 3/6/9-month breakdown, so
 * `@/lib/certificateTracks` derives the three lengths from this record's own
 * module and tool counts rather than from an invented one.
 */

/* -------------------------------------------------------------------------- *
 *                                    Hero                                     *
 * -------------------------------------------------------------------------- */

export const cloudComputingCertificateHero: WrittenCertificateHero = {
  title: "Cloud Computing Training in Mohali — Practical Skills for Modern Cloud Infrastructure",
  lead: "Cloud computing has become an important part of modern IT infrastructure. Businesses use cloud platforms for computing, storage, databases, applications, networking, backup, security and scalable digital services. This programme is built around practical training, hands-on exercises, real-world scenarios and project-based learning — for beginners, IT students, graduates, freshers and working professionals who want to build or upgrade their cloud computing skills.",
  primaryCta: "Book My Free Counselling Call",
  secondaryCta: "Request a Callback",
  points: [
    "Practical training through hands-on exercises, demonstrations and real-world scenarios",
    "Exposure to core cloud platforms and services — AWS, Microsoft Azure and Google Cloud Platform",
    "Project-based learning applied to practical IT requirements",
    "Career guidance, interview preparation and placement assistance",
  ],
  // The brief writes no particulars row. These four are drawn from its own
  // stated facts — the learning modes, the platforms covered, and the
  // training/support lines from the enquiry section.
  highlights: [
    { icon: "monitor", label: "Mode", value: "Classroom & Online" },
    { icon: "cloud", label: "Platforms", value: "AWS, Azure & GCP" },
    { icon: "terminal", label: "Training", value: "Practical & Job-Oriented" },
    { icon: "briefcase", label: "Includes", value: "Placement Assistance" },
  ],
};

/* -------------------------------------------------------------------------- *
 *                            The catalogue record                             *
 * -------------------------------------------------------------------------- */

export const cloudComputingCertificateOverride: CourseOverride = {
  contentKey: "cloud-computing--certificate",
  duration: "3 – 9 Months",
  level: "Beginner",
  blurb:
    "Cloud infrastructure, networking, storage, virtualization, security and deployment — practical training across AWS, Azure and Google Cloud Platform, taught hands-on in Mohali.",
  overview:
    "The Cloud Computing Diploma Program in Mohali is designed to help students and professionals develop practical skills in cloud technologies, cloud infrastructure, networking, storage, virtualization, security and cloud-based application deployment. At Techcadd, Mohali, students learn cloud computing concepts through practical training, hands-on exercises, real-world scenarios and project-based learning. The course introduces learners to cloud concepts and infrastructure while providing practical exposure to commonly used cloud platforms and technologies — how cloud services work, how resources are deployed and managed, and how organizations use cloud computing for scalable and flexible IT infrastructure.",
  modules: [
    {
      title: "Cloud Fundamentals & Service Models",
      blurb: "What cloud computing is, and the shapes it comes in.",
      points: [
        "Cloud computing fundamentals, characteristics and architecture",
        "Service models — IaaS, PaaS, SaaS and serverless computing fundamentals",
        "Deployment models — public, private, hybrid and multi-cloud concepts",
      ],
    },
    {
      title: "Virtualization, Networking & Storage",
      blurb: "The infrastructure a cloud platform is built from.",
      points: [
        "Virtualization fundamentals, virtual machines and hypervisors",
        "Cloud networking — IP addressing, subnets, routing, DNS and load balancing",
        "Cloud storage — object, block and file storage, backup and data availability",
      ],
    },
    {
      title: "Cloud Platforms, Security & Databases",
      blurb: "Where it runs, how it's protected, and where the data lives.",
      points: [
        "Practical exposure to AWS, Microsoft Azure and Google Cloud Platform",
        "Cloud security — identity and access management, authentication and data protection",
        "Cloud databases — relational and NoSQL, deployment, backup and recovery",
      ],
    },
    {
      title: "Deployment, DevOps & Projects",
      blurb: "Getting an application live, and keeping it running.",
      points: [
        "Application deployment, resource and performance monitoring, scaling",
        "DevOps and automation fundamentals — CI/CD concepts, containers and Docker basics",
        "Practical cloud computing projects, from server deployment to basic automation",
      ],
    },
  ],
  tools: [
    "Amazon Web Services (AWS)",
    "Microsoft Azure",
    "Google Cloud Platform (GCP)",
    "Virtualization tools",
    "Docker (basics)",
    "Cloud monitoring consoles",
  ],
  outcomes: [
    "Explain cloud service and deployment models, and how organizations use them for scalable IT infrastructure",
    "Set up virtual machines, cloud networking and cloud storage across a major cloud platform",
    "Apply core cloud security practices — identity and access management, authentication and data protection",
    "Deploy, monitor and manage a cloud-based application or resource end to end",
  ],
  roles: [
    "Cloud Support",
    "Cloud Administration",
    "Cloud Infrastructure",
    "Cloud Operations",
    "Cloud Security",
    "System Administration",
  ],
};

/* -------------------------------------------------------------------------- *
 *                              Section headings                               *
 * -------------------------------------------------------------------------- */

export const cloudComputingCertificateHeadings: Record<string, WrittenHeading> = {
  tracks: {
    index: "—",
    eyebrow: "Programme lengths",
    title: "Choose Your Cloud Computing Track in Mohali",
    intro:
      "One subject, three depths. Each track builds on the last, so a shorter option costs you scope, not foundation.",
  },
  overview: { index: "01", eyebrow: "Programme brief", title: "Course Overview" },
  modules: { index: "02", eyebrow: "Syllabus of record", title: "What You'll Actually Build" },
  learn: {
    index: "03",
    eyebrow: "Competencies covered",
    title: "What You'll Learn in Cloud Computing Diploma Program",
  },
  why: { index: "04", eyebrow: "Standing", title: "Why Choose a Cloud Computing Diploma Program?" },
  who: {
    index: "05",
    eyebrow: "Eligibility & admission",
    title: "Who Can Do This Cloud Computing Diploma Program?",
    intro:
      "Basic computer and networking knowledge can be helpful, but beginners can also start with fundamental cloud concepts.",
  },
  tools: {
    index: "06",
    eyebrow: "Platforms & tools",
    title: "Cloud Platforms You'll Work With",
    intro: "Students can get practical exposure to major cloud platforms and their core services, depending on the training environment:",
  },
  certification: { index: "07", eyebrow: "The award", title: "Certification & Support" },
  scope: { index: "08", eyebrow: "Career areas", title: "Where This Course Can Take You" },
  projects: { index: "09", eyebrow: "Deliverables", title: "Hands-On Projects You Will Ship" },
  institute: {
    index: "10",
    eyebrow: "The comparison",
    title: "Why Choose Techcadd for Cloud Computing Training in Mohali",
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

export const cloudComputingCertificateSections = [
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
 *                "Why Choose a Cloud Computing Diploma Program?"              *
 * -------------------------------------------------------------------------- */

export const cloudComputingCertificateWhyChoose = [
  {
    icon: "cloud",
    title: "Cloud Is Core IT Infrastructure Now",
    body: "Businesses use cloud platforms for computing, storage, databases, applications, networking, backup, security and scalable digital services — understanding how that infrastructure works is increasingly part of everyday IT work.",
  },
  {
    icon: "terminal",
    title: "Learn by Doing, Not Just Reading",
    body: "The programme focuses on practical learning so students can understand how cloud technologies are used in real-world IT environments — hands-on exercises and project-based training, not concepts alone.",
  },
  {
    icon: "layers",
    title: "One Foundation, Multiple Platforms",
    body: "Depending on the training environment, students get practical exposure to AWS, Microsoft Azure and Google Cloud Platform — a foundation that transfers across whichever platform an employer runs.",
  },
  {
    icon: "briefcase",
    title: "Support From Fundamentals to Career",
    body: "Career guidance related to technical skills, interview preparation, resume development and career opportunities, alongside the technical curriculum.",
  },
];

/* -------------------------------------------------------------------------- *
 *              "Who Can Do This Cloud Computing Diploma Program?"             *
 * -------------------------------------------------------------------------- */

export const cloudComputingCertificateAudience = [
  {
    icon: "users",
    title: "12th-Pass Students",
    body: "Interested in IT and cloud technologies. Basic computer and networking knowledge helps but isn't required to start with fundamental cloud concepts.",
  },
  {
    icon: "certificate",
    title: "College Students & Graduates",
    body: "BCA, B.Tech, BSc-IT, Computer Science, MCA and other computer-related students and graduates can build practical cloud skills alongside their studies.",
  },
  {
    icon: "terminal",
    title: "IT Freshers & Networking Professionals",
    body: "Networking students and professionals, system administrators, and IT freshers looking to build or formalise cloud infrastructure skills.",
  },
  {
    icon: "code",
    title: "Software & Web Developers",
    body: "Developers who want to understand how the infrastructure their applications run on is deployed, managed and secured.",
  },
  {
    icon: "briefcase",
    title: "IT Support & Working Professionals",
    body: "IT support professionals and working professionals looking to upgrade their technical skills toward cloud infrastructure and DevOps.",
  },
  {
    icon: "rocket",
    title: "Anyone Building a Cloud Computing Career",
    body: "No advanced background is required — the course starts with fundamental cloud concepts and builds from there.",
  },
];

export const cloudComputingCertificateEligibility = [
  "12th-pass students, college students and graduates from IT and computer-related backgrounds",
  "IT freshers, networking students and professionals, and system administrators",
  "Software and web developers, and IT support professionals",
  "Working professionals looking to upgrade their technical skills",
  "Basic computer and networking knowledge can be helpful, but is not required to begin",
  "No advanced programming skills are required to understand cloud computing fundamentals",
];

/* -------------------------------------------------------------------------- *
 *                        "Certification & Support"                            *
 * -------------------------------------------------------------------------- */

export const cloudComputingCertificateCertification = [
  {
    icon: "certificate",
    title: "Course completion certificate",
    body: "issued on completing the programme, subject to the institute's certification requirements",
  },
  {
    icon: "layers",
    title: "Portfolio of cloud projects",
    body: "server deployment, storage configuration, virtual network setup and application deployment work you can show in an interview",
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

export const cloudComputingCertificateScope = [
  {
    q: "Job roles",
    a: "Depending on your qualifications and practical skills, career areas can include Cloud Computing, Cloud Support, Cloud Administration, Cloud Infrastructure, Cloud Operations, DevOps, Cloud Security and System Administration.",
  },
  {
    q: "Where the skills apply",
    a: "Organisations across most industries increasingly run applications, data and IT operations on cloud infrastructure, so these skills are relevant beyond any single sector.",
  },
  {
    q: "Career growth",
    a: "A solid cloud computing foundation is often the starting point for deeper specialisation — including DevOps, cloud security and infrastructure automation — once the fundamentals are in place.",
  },
];

/* -------------------------------------------------------------------------- *
 *                   "Hands-On Projects You Will Ship"                         *
 * -------------------------------------------------------------------------- */

export const cloudComputingCertificateProjects = [
  {
    label: "Project 1",
    title: "Cloud Server Deployment",
    body: "Deploy and configure a cloud server, and manage it through a cloud platform's console.",
  },
  {
    label: "Project 2",
    title: "Virtual Network & Storage Setup",
    body: "Configure a virtual network alongside cloud storage — object, block or file storage — for a practical use case.",
  },
  {
    label: "Project 3",
    title: "Website / Application Deployment",
    body: "Deploy a website or application to the cloud, covering resource configuration and basic monitoring.",
  },
  {
    label: "Project 4",
    title: "Cloud Security & Backup Configuration",
    body: "Apply identity and access management, and configure a backup and monitoring routine for a cloud resource.",
  },
];

/* -------------------------------------------------------------------------- *
 *          "Why Choose Techcadd for Cloud Computing Training in Mohali"       *
 * -------------------------------------------------------------------------- */

export const cloudComputingCertificateInstitute = [
  {
    icon: "terminal",
    title: "Practical & job-oriented training",
    body: "students learn cloud concepts through practical exercises, demonstrations, assignments and real-world scenarios, not theory alone.",
  },
  {
    icon: "users",
    title: "Experienced trainers",
    body: "trainer guidance, practical demonstrations and doubt-clearing sessions throughout the programme.",
  },
  {
    icon: "layers",
    title: "Project-based training",
    body: "projects that help learners understand how cloud concepts apply to practical IT requirements.",
  },
  {
    icon: "briefcase",
    title: "Career guidance",
    body: "support related to technical skills, interview preparation, resume development and career opportunities.",
  },
];

/* -------------------------------------------------------------------------- *
 *                      "Classroom & Online Learning"                          *
 * -------------------------------------------------------------------------- */

export const cloudComputingCertificateModes = [
  {
    icon: "building",
    title: "Classroom Training",
    body: "In-person sessions with hands-on practice, depending on current batch availability.",
  },
  {
    icon: "monitor",
    title: "Online Learning",
    body: "Live or remote training options can be available depending on the batch and schedule — enquire for current availability.",
  },
];

/* -------------------------------------------------------------------------- *
 *                       "Frequently Asked Questions"                          *
 * -------------------------------------------------------------------------- */

export const cloudComputingCertificateFaqs = [
  {
    q: "What is a Cloud Computing Diploma Program?",
    a: "A Cloud Computing Diploma Program is a career-focused training program that teaches learners about cloud infrastructure, networking, storage, virtualization, security, deployment and cloud management.",
  },
  {
    q: "Who can join the Cloud Computing Diploma Program in Mohali?",
    a: "12th-pass students, graduates, IT students, freshers, networking professionals, developers and working professionals can join the program.",
  },
  {
    q: "Is Cloud Computing suitable for beginners?",
    a: "Yes. Beginners can start with fundamental concepts and gradually move toward practical cloud infrastructure and deployment topics.",
  },
  {
    q: "Do I need programming knowledge for Cloud Computing?",
    a: "Programming knowledge can be helpful, especially for automation and application deployment, but advanced programming skills are not required to understand the fundamentals of cloud computing.",
  },
  {
    q: "Which cloud platforms are covered?",
    a: "Depending on the training module, students may get exposure to AWS, Microsoft Azure and Google Cloud Platform.",
  },
  {
    q: "Will I learn AWS?",
    a: "AWS fundamentals and core cloud services can be included depending on the course curriculum and training batch.",
  },
  {
    q: "Will the course include practical training?",
    a: "Yes. The program focuses on practical exercises, demonstrations, assignments, cloud configurations and projects.",
  },
  {
    q: "Can I learn Cloud Computing after 12th?",
    a: "Yes. Students who have completed 12th can begin learning cloud computing fundamentals and gradually develop advanced technical skills.",
  },
  {
    q: "Is Cloud Computing a good career option?",
    a: "Cloud computing is an important technology area because organizations increasingly use cloud infrastructure and services for applications, data, storage, networking and IT operations.",
  },
  {
    q: "What career areas can I explore after Cloud Computing training?",
    a: "Depending on your qualifications and practical skills, you can explore areas such as Cloud Computing, Cloud Support, Cloud Administration, Cloud Infrastructure, Cloud Operations, DevOps, Cloud Security and System Administration.",
  },
  {
    q: "Does Techcadd provide Cloud Computing training in Mohali?",
    a: "Yes, Techcadd provides career-focused IT training in Mohali, including Cloud Computing-oriented training.",
  },
  {
    q: "Is Cloud Computing training available online?",
    a: "Online training availability can depend on the current batch and schedule. Students can enquire about classroom and online learning options.",
  },
];

/* -------------------------------------------------------------------------- *
 *          "Build Your Cloud Computing Skills with Practical Training"        *
 * -------------------------------------------------------------------------- */

export const cloudComputingCertificateClosing = {
  title: "Build Your Cloud Computing Skills with Practical Training",
  body: "Want to build a career in Cloud Computing? Join the Cloud Computing Diploma Program in Mohali at Techcadd and develop practical knowledge of cloud infrastructure, networking, virtualization, storage, cloud security, deployment and modern cloud technologies.",
  primaryCta: "Book My Free Counselling Call",
  secondaryCta: "Request a Callback",
};
