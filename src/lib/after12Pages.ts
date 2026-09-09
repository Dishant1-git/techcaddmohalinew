/**
 * Written page content for the After-12th route.
 *
 * `/after-12th/<slug>` normally renders the shared course record through the
 * pathway design. A slug listed here instead renders its own written page —
 * the copy below is the page, not a summary of it — so the After-12th door can
 * carry a brief the catalogue and certificate designs do not share.
 *
 * Everything is plain data: `<PathwayWritten/>` lays it out, and the ordinary
 * pathway sections cover anything a written page leaves out (reviews).
 */

export type WrittenItem = { title: string; body: string; icon?: string };
export type WrittenModule = { title: string; points: string[] };
export type WrittenLink = { title: string; body: string; href: string };

export type After12Page = {
  /** Rail entries, in the order the sections appear on the page. */
  sections: { id: string; label: string }[];

  hero: {
    badge: string;
    title: string;
    paragraphs: string[];
  };

  program: {
    title: string;
    paragraphs: string[];
    highlightsTitle: string;
    highlights: { label: string; value: string }[];
  };

  overview: { title: string; paragraphs: string[] };

  learn: { title: string; intro: string; items: WrittenItem[] };

  curriculum: {
    title: string;
    intro: string;
    modules: WrittenModule[];
    practical: { title: string; body: string };
    outcome: { label: string; body: string };
  };

  tools: { title: string; items: { name: string; body: string }[] };

  who: { title: string; items: WrittenItem[] };

  worth: { title: string; items: WrittenItem[] };

  whyNow: {
    kicker: string;
    title: string;
    paragraphs: string[];
    listTitle: string;
    items: WrittenItem[];
  };

  takesYou: {
    title: string;
    intro: string;
    listTitle: string;
    steps: WrittenItem[];
  };

  projects: { title: string; items: WrittenItem[] };

  approach: { title: string; paragraphs: string[]; items: WrittenItem[] };

  whyUs: { kicker: string; title: string; intro: string; items: WrittenItem[] };

  popular: { title: string; intro: string; items: WrittenLink[] };

  faqs: { q: string; a: string }[];

  enquiry: { title: string; paragraphs: string[] };

  fit: {
    title: string;
    paragraphs: string[];
    ctaTitle: string;
    points: string[];
  };
};

const cloudComputing: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "scope", label: "Where it takes you" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "Best After 12th 3-Month Cloud Computing Program in Mohali",
    paragraphs: [
      "Start your IT career with a practical 3-month Cloud Computing Program in Mohali designed especially for students after 12th. Begin with the fundamentals of Linux, networking, Bash, and Git, then progress into hands-on AWS cloud services and real-world deployments.",
      "No prior programming experience is required. You’ll learn through practical labs and projects covering cloud infrastructure, AWS, storage, networking, security, deployment, and basic DevOps concepts—giving you the foundation to confidently pursue entry-level cloud and IT infrastructure roles.",
    ],
  },

  program: {
    title: "Cloud Computing Program Course in Mohali",
    paragraphs: [
      "Build job-ready cloud computing skills with a 3-Month Cloud Computing Program Course in Mohali designed for students, freshers, and beginners. Learn essential technologies including Linux, Bash, Networking, Git, and AWS through practical training and real-world projects.",
      "The program covers core AWS services such as IAM, VPC, EC2, S3, RDS, and Auto Scaling, helping you understand how modern cloud infrastructure is built, managed, and deployed.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "3 Months" },
      { label: "Mode", value: "Practical + Theory" },
      { label: "Eligibility", value: "12th Pass, Any Stream" },
      { label: "Level", value: "Beginner-Friendly" },
      { label: "Technologies", value: "Linux, Bash, Git, Networking & AWS" },
      { label: "Project", value: "Hands-on Cloud Computing Capstone Project" },
      { label: "Includes", value: "Certificate + Placement Support" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "The Cloud Computing Program Course in Mohali is a practical 3-month training program designed for students after 12th, freshers, and beginners who want to start a career in cloud technology. The course takes you from fundamental concepts to hands-on experience with Linux, networking, Bash, Git, and AWS cloud services.",
      "You’ll learn how cloud infrastructure works and gain practical exposure to essential AWS services such as IAM, VPC, EC2, S3, RDS, and Auto Scaling. Through guided labs and a hands-on capstone project, you’ll practice setting up, managing, securing, and deploying resources in a cloud environment.",
      "No prior programming experience is required. The program focuses on building a strong technical foundation through practical + theory-based learning, helping you develop skills relevant to entry-level cloud, infrastructure, and IT support roles.",
    ],
  },

  learn: {
    title: "What You’ll Learn",
    intro:
      "The Cloud Computing Program Course in Mohali focuses on practical skills that help beginners understand, manage, and deploy cloud-based infrastructure. Starting with the basics, you’ll gradually progress toward hands-on AWS implementation and real-world cloud projects.",
    items: [
      {
        title: "Cloud Computing Fundamentals",
        body: "Understand what cloud computing is, how it works, and how businesses use cloud platforms for storage, applications, infrastructure, scalability, and cost management.",
      },
      {
        title: "Linux Fundamentals",
        body: "Learn essential Linux commands, file management, permissions, processes, users, packages, and basic server administration used in cloud environments.",
      },
      {
        title: "Networking Fundamentals",
        body: "Build a strong foundation in IP addresses, DNS, ports, protocols, routing, subnets, firewalls, and other networking concepts required for working with cloud infrastructure.",
      },
      {
        title: "Bash & Shell Scripting",
        body: "Learn basic Bash commands and shell scripting to automate repetitive tasks and manage Linux-based cloud servers more efficiently.",
      },
      {
        title: "Git & Version Control",
        body: "Understand Git fundamentals, repositories, branches, commits, merging, and GitHub workflows for managing and tracking project code.",
      },
      {
        title: "AWS Fundamentals",
        body: "Get introduced to Amazon Web Services and understand how cloud resources are created, configured, monitored, and managed.",
      },
      {
        title: "AWS IAM",
        body: "Learn Identity and Access Management, including users, groups, roles, policies, permissions, and basic cloud security practices.",
      },
      {
        title: "Amazon VPC",
        body: "Understand cloud networking through VPCs, subnets, route tables, internet gateways, security groups, and network access control.",
      },
      {
        title: "Amazon EC2",
        body: "Learn how to launch and manage virtual servers, configure instances, connect through SSH, install software, and deploy applications.",
      },
      {
        title: "Amazon S3",
        body: "Work with cloud storage by creating buckets, uploading and managing objects, configuring permissions, and understanding storage use cases.",
      },
      {
        title: "Amazon RDS",
        body: "Learn the fundamentals of managed cloud databases, database instances, connectivity, backups, and basic database management.",
      },
      {
        title: "Auto Scaling",
        body: "Understand how cloud infrastructure can automatically scale resources according to application demand, improving availability and performance.",
      },
      {
        title: "Cloud Deployment Project",
        body: "Apply your learning to a practical capstone project involving cloud infrastructure and AWS deployment. This gives you hands-on experience that can be showcased in your portfolio and discussed during interviews.",
      },
      {
        title: "Practical Cloud Skills",
        body: "Develop the ability to work with Linux servers, AWS services, networking, access management, storage, databases, and deployment workflows through guided practical exercises.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The Cloud Computing Program Course in Mohali follows a practical, beginner-friendly curriculum that starts with IT and cloud fundamentals and gradually moves into AWS infrastructure, security, networking, and deployment.",
    modules: [
      {
        title: "Cloud Computing Fundamentals",
        points: [
          "Introduction to Cloud Computing",
          "Cloud service models: IaaS, PaaS, SaaS",
          "Public, Private & Hybrid Cloud",
          "Benefits and challenges of cloud computing",
          "Cloud computing architecture",
          "Introduction to AWS",
        ],
      },
      {
        title: "Linux Fundamentals",
        points: [
          "Introduction to Linux",
          "Linux distributions",
          "File and directory management",
          "Essential Linux commands",
          "Users and groups",
          "File permissions",
          "Processes and services",
          "Package management",
          "Basic server administration",
        ],
      },
      {
        title: "Networking Fundamentals",
        points: [
          "Networking basics",
          "IP addresses and subnetting",
          "DNS and DHCP",
          "TCP/IP fundamentals",
          "Ports and protocols",
          "Routing basics",
          "Firewalls",
          "Public vs private networks",
          "Networking for cloud environments",
        ],
      },
      {
        title: "Bash & Shell Scripting",
        points: [
          "Introduction to Bash",
          "Variables and operators",
          "Conditional statements",
          "Loops",
          "Functions",
          "File handling",
          "Basic automation scripts",
          "Shell scripting for server management",
        ],
      },
      {
        title: "Git & GitHub",
        points: [
          "Introduction to version control",
          "Installing and configuring Git",
          "Repositories",
          "Commits and branches",
          "Merge and conflict handling",
          "Remote repositories",
          "GitHub basics",
          "Practical Git workflow",
        ],
      },
      {
        title: "AWS Fundamentals",
        points: [
          "Introduction to AWS",
          "AWS Management Console",
          "AWS Regions & Availability Zones",
          "AWS global infrastructure",
          "AWS account and resource management",
          "Understanding core AWS services",
          "AWS pricing fundamentals",
        ],
      },
      {
        title: "AWS IAM",
        points: [
          "Introduction to Identity and Access Management",
          "Users and groups",
          "Roles and policies",
          "Permissions",
          "Access control",
          "Security best practices",
          "Practical IAM configuration",
        ],
      },
      {
        title: "Amazon VPC & Cloud Networking",
        points: [
          "Introduction to Amazon VPC",
          "VPC architecture",
          "Subnets",
          "Route tables",
          "Internet Gateway",
          "Security Groups",
          "Network ACLs",
          "Public and private subnets",
          "Building a basic cloud network",
        ],
      },
      {
        title: "Amazon EC2",
        points: [
          "Introduction to EC2",
          "Launching EC2 instances",
          "AMIs and instance types",
          "Key pairs",
          "Connecting to Linux servers",
          "Security group configuration",
          "Installing applications on EC2",
          "Managing and monitoring instances",
        ],
      },
      {
        title: "Amazon S3",
        points: [
          "Introduction to cloud storage",
          "S3 buckets and objects",
          "Uploading and managing files",
          "Bucket permissions",
          "Storage classes",
          "Versioning",
          "Static website hosting basics",
          "Practical S3 exercises",
        ],
      },
      {
        title: "Amazon RDS",
        points: [
          "Introduction to managed databases",
          "RDS database engines",
          "Creating an RDS instance",
          "Database connectivity",
          "Security configuration",
          "Backups and maintenance",
          "Basic database management",
        ],
      },
      {
        title: "Auto Scaling & High Availability",
        points: [
          "Introduction to scalability",
          "Vertical vs horizontal scaling",
          "Auto Scaling concepts",
          "Launch templates",
          "Scaling policies",
          "Availability and reliability",
          "Basic load balancing concepts",
        ],
      },
      {
        title: "Cloud Security & Monitoring",
        points: [
          "AWS security fundamentals",
          "IAM security practices",
          "Securing EC2 and VPC resources",
          "Cloud monitoring concepts",
          "Introduction to Amazon CloudWatch",
          "Logs, metrics, and alerts",
          "Basic troubleshooting",
        ],
      },
      {
        title: "Capstone Project",
        points: [
          "Project planning and architecture",
          "Creating AWS infrastructure",
          "Configuring networking and security",
          "Deploying resources on AWS",
          "Connecting cloud services",
          "Testing and troubleshooting",
          "Project documentation",
          "Portfolio and interview preparation",
        ],
      },
    ],
    practical: {
      title: "Practical Training",
      body: "Throughout the program, learners complete hands-on AWS labs, Linux exercises, networking tasks, Git activities, and deployment practices to reinforce every major concept.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have a strong foundation in Cloud Computing, Linux, Networking, Git, Bash, and AWS, along with practical project experience to support their entry-level IT and cloud career goals.",
    },
  },

  tools: {
    title: "Tools",
    items: [
      { name: "AWS", body: "Work with EC2, S3, IAM, VPC, RDS, Auto Scaling, and CloudWatch." },
      {
        name: "AWS Management Console",
        body: "Create, configure, monitor, and manage AWS resources.",
      },
      {
        name: "Linux",
        body: "Manage cloud servers, files, users, permissions, processes, and services.",
      },
      { name: "Bash", body: "Write basic shell scripts for automation and server administration." },
      { name: "Git", body: "Track changes, manage branches, and maintain project versions." },
      { name: "GitHub", body: "Store repositories and collaborate using Git workflows." },
      { name: "SSH", body: "Securely connect to and manage Linux-based cloud servers." },
      { name: "CloudWatch", body: "Monitor AWS resources, metrics, logs, and basic alerts." },
    ],
  },

  who: {
    title: "Who Can Do This Course",
    items: [
      {
        title: "12th Pass Students",
        body: "Students from any stream can start learning Cloud Computing.",
        icon: "users",
      },
      {
        title: "College Students",
        body: "Build practical cloud skills alongside your regular studies.",
        icon: "certificate",
      },
      {
        title: "Freshers",
        body: "Develop job-oriented skills before entering the IT industry.",
        icon: "rocket",
      },
      {
        title: "Non-Programming Students",
        body: "No advanced coding knowledge is required to begin.",
        icon: "sparkles",
      },
      {
        title: "IT Beginners",
        body: "Learn Linux, networking, Git, AWS, and cloud infrastructure from the basics.",
        icon: "terminal",
      },
      {
        title: "Career Switchers",
        body: "Professionals looking to move toward Cloud Computing or IT infrastructure.",
        icon: "briefcase",
      },
      {
        title: "Aspiring Cloud & DevOps Professionals",
        body: "Build the foundation needed for further learning in AWS and DevOps.",
        icon: "cloud",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Year",
    items: [
      {
        title: "Start With the Fundamentals",
        body: "You don’t need a programming background to begin. The programme takes you step by step through Linux, networking, Bash, Git, and cloud fundamentals before moving into AWS.",
        icon: "layers",
      },
      {
        title: "Learn Skills You Can Actually Use",
        body: "Instead of simply watching demonstrations, you’ll work with AWS, Linux, Git, Bash, SSH, and cloud networking tools through practical exercises and labs.",
        icon: "terminal",
      },
      {
        title: "Build Real Cloud Experience",
        body: "You’ll configure AWS resources, work with virtual servers, storage, databases, networking, access management, and monitoring. A hands-on capstone project gives you something practical to discuss in interviews and add to your portfolio.",
        icon: "cloud",
      },
      {
        title: "Build a Strong IT Foundation",
        body: "Cloud Computing connects with several areas of modern IT, including system administration, infrastructure, networking, DevOps, and cloud security. Learning these fundamentals gives you a foundation for continuing into more advanced technologies.",
        icon: "shield",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Build Tomorrow. Scale Without Limits.",
    paragraphs: [
      "Cloud technology is changing how modern businesses build, run, and scale their digital infrastructure. Learning cloud skills today can give you a strong foundation for the IT jobs and technologies of tomorrow.",
      "With the Cloud Computing Program Course in Mohali, you start with the fundamentals and move toward practical AWS experience—learning how servers, storage, networking, security, and applications work in the cloud.",
    ],
    listTitle: "Start Before the Industry Moves Further",
    items: [
      {
        title: "Cloud is everywhere",
        body: "Businesses of all sizes rely on cloud platforms for modern IT infrastructure.",
      },
      {
        title: "Skills matter more than theory",
        body: "Practical AWS, Linux, networking, and Git experience can strengthen your technical profile.",
      },
      {
        title: "Build a future-ready foundation",
        body: "Cloud skills can lead into areas such as DevOps, cloud security, automation, and infrastructure.",
      },
      {
        title: "Learn by doing",
        body: "Work with real cloud services and build projects instead of only studying concepts.",
      },
      {
        title: "Scale your possibilities",
        body: "Develop skills that can grow with you as you progress from beginner to advanced cloud technologies.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Takes You",
    intro:
      "The Cloud Computing Program Course in Mohali gives you the practical foundation to move from a complete beginner toward entry-level opportunities in cloud and IT infrastructure.",
    listTitle: "From Beginner to Cloud-Ready",
    steps: [
      {
        title: "Start with the basics",
        body: "Build your foundation in Linux, networking, Bash, Git, and cloud computing.",
      },
      {
        title: "Move into AWS",
        body: "Get hands-on with AWS services such as IAM, VPC, EC2, S3, RDS, Auto Scaling, and CloudWatch.",
      },
      {
        title: "Build and deploy",
        body: "Apply your skills by configuring cloud infrastructure and completing a practical capstone project.",
      },
      {
        title: "Create your portfolio",
        body: "Document your project work and build practical evidence of your skills for interviews and future opportunities.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Ship",
    items: [
      {
        title: "Linux Cloud Server Setup",
        body: "Launch and configure a Linux-based cloud server, connect through SSH, manage users and permissions, install packages, and perform basic server administration.",
      },
      {
        title: "Secure AWS VPC Network",
        body: "Build a basic AWS network with a VPC, public and private subnets, route tables, Internet Gateway, and security controls to understand how cloud networking works.",
      },
      {
        title: "Static Website on Amazon S3",
        body: "Create an S3 bucket, configure storage and permissions, upload website files, and deploy a simple static website using AWS cloud storage.",
      },
      {
        title: "Application Deployment on EC2",
        body: "Launch an EC2 instance, configure the server environment, install the required software, and deploy a working application on a cloud server.",
      },
      {
        title: "Cloud Database with Amazon RDS",
        body: "Create and configure an RDS database, establish connectivity, manage access, and understand how managed databases are used in cloud applications.",
      },
      {
        title: "AWS IAM Security Setup",
        body: "Create IAM users, groups, roles, and policies while applying the principle of least privilege to control access to AWS resources.",
      },
      {
        title: "Auto Scaling & Monitoring",
        body: "Configure basic Auto Scaling concepts and use CloudWatch to monitor resources, understand metrics, and identify common infrastructure issues.",
      },
      {
        title: "Final Cloud Computing Capstone",
        body: "Bring everything together in a real-world cloud deployment project involving networking, security, compute, storage, database services, and monitoring.",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Make It Yours.",
    paragraphs: [
      "Learning Cloud Computing is more than completing lessons—it’s about turning knowledge into skills you can actually use.",
      "Start with the fundamentals, practise with real cloud tools, build working projects, and gradually develop the confidence to solve technical problems on your own.",
    ],
    items: [
      {
        title: "Learn It",
        body: "Understand Linux, networking, Bash, Git, AWS, cloud security, storage, databases, and infrastructure from the ground up.",
        icon: "layers",
      },
      {
        title: "Build It",
        body: "Put your knowledge into practice through AWS labs, server configuration, cloud networking exercises, deployments, and hands-on projects.",
        icon: "cube",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Students Choose TechCADD",
    intro:
      "Choosing the right training institute matters when you’re starting your IT career. TechCADD focuses on practical learning, industry-relevant tools, and project-based training so students can build skills they can actually apply.",
    items: [
      {
        title: "Practical, Not Just Theoretical",
        body: "Learn by working with Linux, AWS, networking, Git, Bash, and cloud infrastructure through practical exercises and guided labs.",
        icon: "terminal",
      },
      {
        title: "Beginner-Friendly Learning",
        body: "The programme starts from the fundamentals, making it suitable for 12th-pass students, freshers, and learners without a programming background.",
        icon: "sparkles",
      },
      {
        title: "Learn With Real Tools",
        body: "Get hands-on exposure to technologies used in modern cloud environments, including AWS EC2, S3, IAM, VPC, RDS, Auto Scaling, Git, and Linux.",
        icon: "cloud",
      },
      {
        title: "Build Projects",
        body: "Apply your knowledge through practical assignments and a hands-on capstone project that gives you experience you can discuss and showcase.",
        icon: "cube",
      },
      {
        title: "Career-Focused Training",
        body: "Develop technical foundations that can help you work toward opportunities in Cloud Computing, IT Infrastructure, System Administration, AWS, and DevOps.",
        icon: "briefcase",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro:
      "Explore other career-focused programmes at TechCADD and build practical skills for today’s technology-driven industry.",
    items: [
      {
        title: "Digital Marketing Course",
        body: "Learn SEO, Google Ads, social media marketing, content marketing, analytics, and AI-powered digital marketing strategies.",
        href: "/after-12th/digital-marketing",
      },
      {
        title: "Web Development Course",
        body: "Build modern websites and web applications while learning frontend and backend development fundamentals.",
        href: "/after-12th/web-development",
      },
      {
        title: "Artificial Intelligence Course",
        body: "Understand AI concepts and work with practical tools and technologies used to build intelligent applications.",
        href: "/after-12th/artificial-intelligence",
      },
      {
        title: "MERN Stack Course",
        body: "Learn MongoDB, Express.js, React.js, and Node.js while building full-stack web applications and real-world projects.",
        href: "/after-12th/mern-full-stack",
      },
      {
        title: "Basic Computer Course",
        body: "Build essential computer skills including operating systems, MS Office, internet usage, and everyday digital tools.",
        href: "/courses",
      },
      {
        title: "Graphic Design Course",
        body: "Develop practical skills in graphic design, branding, visual communication, Photoshop, Illustrator, and creative design workflows.",
        href: "/courses",
      },
    ],
  },

  faqs: [
    {
      q: "Who can join the Cloud Computing Program in Mohali?",
      a: "The programme is suitable for 12th-pass students from any stream, college students, freshers, and beginners who want to build a career in Cloud Computing. No previous cloud experience is required.",
    },
    {
      q: "Is programming knowledge required for this course?",
      a: "No. You do not need a programming background to start. The programme begins with fundamentals such as Linux, networking, Bash, Git, and Cloud Computing before progressing to AWS.",
    },
    {
      q: "How long is the Cloud Computing course?",
      a: "The programme has a 3-month duration, combining theoretical concepts with practical labs, exercises, and project work.",
    },
    {
      q: "What will I learn in this programme?",
      a: "You’ll learn Linux, Bash, Networking, Git, AWS, IAM, VPC, EC2, S3, RDS, Auto Scaling, CloudWatch, and essential cloud infrastructure concepts.",
    },
    {
      q: "Will I get hands-on AWS experience?",
      a: "Yes. The programme is focused on practical learning. You’ll work with AWS services through guided labs, exercises, deployments, and a hands-on capstone project.",
    },
    {
      q: "Will I work on a real project?",
      a: "Yes. You’ll complete a Cloud Computing capstone project where you apply concepts such as cloud networking, security, compute, storage, databases, and monitoring.",
    },
    {
      q: "Is this course suitable for beginners?",
      a: "Absolutely. The curriculum starts from the basics and gradually progresses toward AWS and cloud deployment, making it suitable for learners with little or no technical experience.",
    },
    {
      q: "Which tools will I use during the course?",
      a: "You’ll work with tools and platforms including AWS, Linux, Bash, Git, GitHub, SSH, and AWS CloudWatch, along with core AWS services.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Yes. Students who successfully complete the programme receive a course completion certificate.",
    },
    {
      q: "Does TechCADD provide placement support?",
      a: "Yes. The programme includes placement support to help eligible students prepare for opportunities and take the next step toward their IT career.",
    },
    {
      q: "What career opportunities can I pursue after this course?",
      a: "The programme can help you build a foundation for roles such as Cloud Support Associate, Junior Cloud Engineer, Cloud Support Engineer, System Administrator, Infrastructure Support Engineer, and Junior DevOps Associate.",
    },
    {
      q: "Is Cloud Computing a good career option after 12th?",
      a: "Cloud Computing can be a strong technology career path for students interested in AWS, IT infrastructure, networking, system administration, and DevOps. Starting with foundational skills and practical projects can help you build toward more advanced cloud roles.",
    },
  ],

  enquiry: {
    title: "Ask About Cloud Computing Program",
    paragraphs: [
      "Thinking about starting a career in Cloud Computing? Get answers to your questions about the 3-Month Cloud Computing Program Course in Mohali, including eligibility, course duration, AWS training, practical projects, certification, and placement support.",
      "Whether you’re a 12th-pass student, fresher, or complete beginner, our team can help you understand the programme and choose the right learning path.",
    ],
  },

  fit: {
    title: "Not Sure If Cloud Computing Program Is the Right Fit?",
    paragraphs: [
      "Choosing a technology career after 12th can feel confusing. If you’re interested in AWS, cloud infrastructure, Linux, networking, or DevOps, this programme can give you the practical foundation to get started.",
      "You don’t need previous cloud experience or a programming background. The 3-Month Cloud Computing Program Course in Mohali starts with the basics and gradually takes you into hands-on AWS training, practical labs, and real-world projects.",
    ],
    ctaTitle: "Take the Next Step",
    points: [
      "12th pass? You can start.",
      "No programming background? No problem.",
      "Want practical AWS skills? Build them through hands-on training.",
      "Want career guidance? Get course and placement support.",
    ],
  },
};

/** Slugs whose After-12th page is written rather than derived. */
export const after12Pages: Record<string, After12Page> = {
  "cloud-computing": cloudComputing,
};

export function after12Page(slug: string): After12Page | undefined {
  return after12Pages[slug];
}
