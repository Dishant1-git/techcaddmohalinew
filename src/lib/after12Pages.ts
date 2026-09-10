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

  /**
   * The mid-page call to talk to someone, sitting between "why now" and the
   * credential. A band rather than a numbered stage: it interrupts the read,
   * it does not add to it.
   *
   * Optional: a page that leaves it out simply does not break for a phone call.
   */
  advisor?: { title: string; body: string; cta: string };

  /**
   * What the student actually leaves with on paper.
   *
   * Optional, like `advisor`. A brief that omits this also omits `certificate`
   * from `sections` above, and the route renumbers the remaining stages so the
   * page counts 1..n without a gap where this one would have been.
   */
  certificate?: { title: string; intro: string; items: WrittenItem[] };

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
    { id: "certificate", label: "Certification" },
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

  advisor: {
    title: "Talk to a course advisor",
    body: "Ten minutes on the phone settles more than an hour of reading — eligibility, batch timings, fees, and whether this programme fits the degree or the job you already have.",
    cta: "Book a free demo class",
  },

  certificate: {
    title: "Get certified in the Cloud Computing Program",
    intro:
      "Complete the course with a portfolio of live projects and receive an industry-recognised certificate, plus a documented internship letter accepted by Punjab universities.",
    items: [
      {
        icon: "certificate",
        title: "Industry Certificate",
        body: "Recognised by employers across Punjab and beyond.",
      },
      {
        icon: "briefcase",
        title: "Internship Letter",
        body: "Based on real client work, not a simulation.",
      },
      {
        icon: "layers",
        title: "Portfolio of Projects",
        body: "Live work you can show in any interview.",
      },
      {
        icon: "target",
        title: "Placement Support",
        body: "CV reviews, mock interviews and hiring drives once you finish.",
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
        href: "/courses/after12th/digital-marketing",
      },
      {
        title: "Web Development Course",
        body: "Build modern websites and web applications while learning frontend and backend development fundamentals.",
        href: "/courses/after12th/web-development",
      },
      {
        title: "Artificial Intelligence Course",
        body: "Understand AI concepts and work with practical tools and technologies used to build intelligent applications.",
        href: "/courses/after12th/artificial-intelligence",
      },
      {
        title: "MERN Stack Course",
        body: "Learn MongoDB, Express.js, React.js, and Node.js while building full-stack web applications and real-world projects.",
        href: "/courses/after12th/mern-full-stack",
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

const cloudComputingDiploma: After12Page = {
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
    badge: "9-Month Job-Oriented Diploma",
    title: "Best After 12th 9-Month Cloud Computing Diploma Program in Mohali",
    paragraphs: [
      "Looking for the best Cloud Computing Diploma Program in Mohali? Techcadd offers a job-oriented, 9-month Cloud Computing Diploma designed for students, graduates, IT professionals and job seekers across Mohali, Chandigarh and nearby areas.",
      "The diploma covers essential cloud computing concepts, cloud infrastructure, virtualization, networking, storage, security, cloud deployment models and popular cloud platforms — structured to build industry-relevant, job-ready knowledge whether you're a complete beginner or an IT student sharpening practical cloud skills.",
    ],
  },

  program: {
    title: "Cloud Computing Diploma Program Course in Mohali",
    paragraphs: [
      "Training at techcadd goes beyond theory. Students get hands-on practice with cloud environments, practical assignments, real-world scenarios, doubt-clearing support and placement assistance to help them prepare for roles such as Cloud Support Engineer, Cloud Administrator, Cloud Engineer, DevOps Associate and Cloud Operations Executive.",
      "If you're searching for a trusted Cloud Computing Institute in Mohali that combines practical learning with career support, this 9-month diploma is built for you.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "9 Months" },
      { label: "Mode", value: "Classroom & Online" },
      { label: "Eligibility", value: "12th Pass / Graduate, Any Stream" },
      { label: "Level", value: "Beginner-Friendly" },
      { label: "Covers", value: "Infrastructure, Virtualization, Networking, Storage & Security" },
      { label: "Training", value: "Practical & Job-Oriented" },
      { label: "Includes", value: "Certificate + Placement Assistance" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "This Cloud Computing Diploma in Mohali covers essential cloud computing concepts, cloud infrastructure, virtualization, networking, storage, security, cloud deployment models and popular cloud platforms. Whether you're a complete beginner or an IT student looking to build practical cloud skills, the program is structured to develop industry-relevant and job-ready knowledge over nine months.",
      "Training goes beyond theory. Students get hands-on practice with cloud environments, practical assignments, real-world scenarios, doubt-clearing support and placement assistance to help them prepare for roles such as Cloud Support Engineer, Cloud Administrator, Cloud Engineer, DevOps Associate and Cloud Operations Executive.",
      "If you're searching for a trusted Cloud Computing Institute in Mohali that combines practical learning with career support, this diploma program is built for you.",
    ],
  },

  learn: {
    title: "What You’ll Learn",
    intro:
      "This program is structured to take learners from cloud computing fundamentals to a practical understanding of modern cloud environments.",
    items: [
      {
        title: "Cloud Computing Fundamentals",
        body: "Understand what cloud computing is, how it works, its benefits, its limitations, and why organisations use cloud technology.",
      },
      {
        title: "Cloud Service Models",
        body: "Learn about IaaS, PaaS and SaaS, and understand how different cloud services are used by businesses.",
      },
      {
        title: "Cloud Deployment Models",
        body: "Understand public cloud, private cloud, hybrid cloud, and their practical use cases.",
      },
      {
        title: "Virtualization",
        body: "Learn the fundamentals of virtualization, virtual machines, hypervisors and virtual infrastructure.",
      },
      {
        title: "Cloud Networking",
        body: "Understand networking concepts required for cloud environments, including virtual networks, IP addressing, connectivity and network security.",
      },
      {
        title: "Cloud Storage",
        body: "Learn different cloud storage concepts and how organisations manage data in cloud environments.",
      },
      {
        title: "Cloud Compute Services",
        body: "Understand cloud-based computing resources and how virtual computing environments are created and managed.",
      },
      {
        title: "Cloud Security",
        body: "Learn fundamental cloud security concepts including access control, authentication, permissions, data protection and security best practices.",
      },
      {
        title: "Cloud Administration",
        body: "Understand the basics of managing cloud resources, users, services and infrastructure.",
      },
      {
        title: "Cloud Deployment",
        body: "Learn the fundamentals of deploying applications and services in cloud environments.",
      },
      {
        title: "Monitoring & Troubleshooting",
        body: "Understand how cloud resources are monitored, and how common infrastructure and connectivity issues can be identified.",
      },
      {
        title: "Practical Projects",
        body: "Apply your learning through practical cloud-based assignments and real-world scenarios to build confidence and strengthen your portfolio.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The 9-month Cloud Computing Diploma follows a structured, beginner-friendly progression — from cloud fundamentals through infrastructure, security and administration, to deployment and a portfolio project.",
    modules: [
      {
        title: "Cloud Computing Fundamentals",
        points: [
          "What cloud computing is and how it works",
          "Benefits, limitations and business drivers",
          "How organisations use cloud technology",
        ],
      },
      {
        title: "Cloud Service Models",
        points: ["IaaS", "PaaS", "SaaS", "Choosing a model for a given use case"],
      },
      {
        title: "Cloud Deployment Models",
        points: ["Public cloud", "Private cloud", "Hybrid cloud", "Practical use cases"],
      },
      {
        title: "Virtualization",
        points: ["Virtual machines", "Hypervisors", "Virtual infrastructure", "Running multiple workloads on shared hardware"],
      },
      {
        title: "Cloud Networking",
        points: ["Virtual networks", "IP addressing and connectivity", "Network security fundamentals"],
      },
      {
        title: "Cloud Storage",
        points: ["Cloud storage concepts", "Data management in the cloud", "Backup and recovery basics"],
      },
      {
        title: "Cloud Compute Services",
        points: ["Cloud-based computing resources", "Creating virtual computing environments", "Managing compute resources"],
      },
      {
        title: "Cloud Security",
        points: ["Access control and authentication", "Permissions and data protection", "Security best practices"],
      },
      {
        title: "Cloud Administration",
        points: ["Managing cloud resources and users", "Managing services and infrastructure", "Day-to-day administration tasks"],
      },
      {
        title: "Cloud Deployment",
        points: ["Deploying applications to the cloud", "Deploying services in cloud environments", "Deployment fundamentals"],
      },
      {
        title: "Monitoring & Troubleshooting",
        points: ["Monitoring cloud resources", "Identifying common infrastructure issues", "Identifying common connectivity issues"],
      },
      {
        title: "Practical Capstone Project",
        points: [
          "Applying cloud fundamentals to a real scenario",
          "Practical cloud-based assignments",
          "Building portfolio-ready project work",
        ],
      },
    ],
    practical: {
      title: "Practical Training",
      body: "Throughout the 9 months, learners apply every major concept through practical assignments, real-world scenarios and cloud-based project work rather than theory alone.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the diploma, students will have a solid, practical foundation in cloud infrastructure, virtualization, networking, storage, security, administration and deployment — along with project experience to support entry into cloud and IT infrastructure roles.",
    },
  },

  tools: {
    title: "Tools",
    items: [
      { name: "Cloud Consoles", body: "Work with popular cloud platforms and their management consoles." },
      { name: "Virtualization Software", body: "Practice with virtual machines and hypervisors used in cloud infrastructure." },
      { name: "Networking Utilities", body: "Configure virtual networks, IP addressing and connectivity." },
      { name: "Cloud Storage Tools", body: "Manage cloud-based data, backups and recovery." },
      { name: "Monitoring Dashboards", body: "Track cloud resource usage and troubleshoot common issues." },
      { name: "Git & GitHub", body: "Track changes and manage project work through version control." },
    ],
  },

  who: {
    title: "Who Can Do This Course",
    items: [
      {
        title: "12th Pass Students",
        body: "Students from Science, Commerce or Arts backgrounds can explore cloud computing as a career-oriented technology skill, starting from computer networks and cloud fundamentals.",
        icon: "users",
      },
      {
        title: "College Students — BCA, B.Tech, BSc-IT, MCA",
        body: "Supplement your academic knowledge with practical cloud computing skills, strengthen your resume, and prepare for IT careers.",
        icon: "certificate",
      },
      {
        title: "Graduates Starting a Career in IT",
        body: "Learn the fundamentals of cloud technology and explore opportunities in cloud support, cloud administration and IT infrastructure.",
        icon: "rocket",
      },
      {
        title: "Job Seekers",
        body: "Build a stronger technical profile with an in-demand skill and prepare for entry-level cloud and infrastructure positions.",
        icon: "briefcase",
      },
      {
        title: "Working IT Professionals",
        body: "IT support executives, system administrators and networking professionals can upgrade their skill set and move toward cloud-focused roles.",
        icon: "terminal",
      },
      {
        title: "Aspiring Cloud & DevOps Professionals",
        body: "Use this diploma as a practical foundation for a career as a Cloud Engineer, Cloud Administrator, DevOps Associate or Cloud Support Engineer.",
        icon: "cloud",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Year",
    items: [
      {
        title: "Practical, Hands-On Cloud Learning",
        body: "Students don't just learn cloud terminology — they get practical exposure to cloud concepts, infrastructure, storage, networking, virtualization and security.",
        icon: "layers",
      },
      {
        title: "Beginner-to-Job-Ready Curriculum",
        body: "A structured progression, beginning with cloud fundamentals and gradually moving toward infrastructure, deployment, security, administration and practical operations.",
        icon: "terminal",
      },
      {
        title: "Industry-Relevant Cloud Skills",
        body: "The program focuses on skills relevant to modern IT environments — how organisations use cloud platforms for computing, storage, applications, networking and business operations.",
        icon: "cloud",
      },
      {
        title: "Interview & Placement Support",
        body: "Resume-building guidance, interview preparation, mock interviews and placement assistance to improve job readiness — not just a completed diploma.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Cloud Skills for a Cloud-First IT Industry.",
    paragraphs: [
      "Cloud computing is a core part of modern IT infrastructure. Learning cloud technologies can help you build a stronger technical profile and prepare for entry-level cloud and infrastructure positions.",
      "This 9-month diploma starts from fundamentals and moves gradually toward practical understanding of infrastructure, deployment-related topics and real cloud environments — no advanced cloud experience needed to begin.",
    ],
    listTitle: "Start Before the Industry Moves Further",
    items: [
      {
        title: "Cloud is core infrastructure now",
        body: "Modern IT environments run on cloud platforms for computing, storage, applications and networking.",
      },
      {
        title: "Practical skills stand out",
        body: "Hands-on exposure to cloud concepts and infrastructure builds a stronger technical profile than tutorials alone.",
      },
      {
        title: "A foundation for specialisation",
        body: "Cloud fundamentals lead naturally into DevOps, cloud security and infrastructure-focused careers.",
      },
      {
        title: "Learn locally in Mohali",
        body: "Accessible to learners from Mohali, Chandigarh, Kharar, Zirakpur and nearby areas without needing to relocate.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Takes You",
    intro:
      "The 9-Month Cloud Computing Diploma gives you a practical foundation to move from a beginner toward entry-level opportunities in cloud and IT infrastructure.",
    listTitle: "From Beginner to Cloud-Ready",
    steps: [
      {
        title: "Start with the fundamentals",
        body: "Build your foundation in cloud concepts, service models, deployment models and virtualization.",
      },
      {
        title: "Move into infrastructure",
        body: "Get hands-on with cloud networking, storage, compute services, security and administration.",
      },
      {
        title: "Deploy and troubleshoot",
        body: "Apply your skills by deploying applications, monitoring resources and troubleshooting real scenarios.",
      },
      {
        title: "Build your portfolio",
        body: "Complete a practical capstone project you can showcase to employers and discuss in interviews.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Ship",
    items: [
      {
        title: "Cloud Infrastructure Setup",
        body: "Provision and configure basic cloud infrastructure, covering compute, storage and networking components.",
      },
      {
        title: "Virtualization Lab",
        body: "Set up and manage virtual machines to understand hypervisors and virtual infrastructure in practice.",
      },
      {
        title: "Cloud Networking Project",
        body: "Configure a virtual network with IP addressing, connectivity and basic network security controls.",
      },
      {
        title: "Cloud Storage & Backup",
        body: "Set up cloud storage, manage data and configure a backup and recovery workflow.",
      },
      {
        title: "Cloud Security Configuration",
        body: "Apply access control, authentication and data-protection practices to a cloud environment.",
      },
      {
        title: "Final Capstone Deployment",
        body: "Deploy and monitor a real-world cloud scenario end to end, then document it for your portfolio and interviews.",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Get Job-Ready.",
    paragraphs: [
      "Cloud computing is best learned by doing. Over nine months, you move from concepts to hands-on practice with real cloud environments, assignments and scenarios.",
      "Every topic is paired with practical exercises, so what you understand in class becomes something you can actually configure, deploy and troubleshoot.",
    ],
    items: [
      {
        title: "Learn It",
        body: "Understand cloud fundamentals, service models, deployment models, virtualization, networking, storage, security and administration.",
        icon: "layers",
      },
      {
        title: "Build It",
        body: "Apply your knowledge through practical assignments, real-world scenarios and a portfolio-ready capstone project.",
        icon: "cube",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Learn Cloud Computing at Techcadd, Mohali",
    intro:
      "Choosing the right institute makes a real difference when learning technical skills. Here's what makes Techcadd a practical choice for Cloud Computing training in Mohali.",
    items: [
      {
        title: "Experienced, Industry-Aware Trainers",
        body: "Trainers focus on practical understanding through demonstrations, assignments and troubleshooting, not just completing theoretical topics.",
        icon: "terminal",
      },
      {
        title: "Small-Batch Personal Attention",
        body: "Manageable batches let students ask questions and get individual guidance when they hit technical difficulties.",
        icon: "users",
      },
      {
        title: "Hands-On, Project-Oriented Teaching",
        body: "Practical tasks involving cloud infrastructure, networking, storage, security and deployment concepts, not memorised definitions.",
        icon: "cube",
      },
      {
        title: "Flexible for Students & Professionals",
        body: "Batch timings accommodate college students as well as working professionals upgrading their IT skills.",
        icon: "clock",
      },
      {
        title: "Placement Support",
        body: "Resume guidance, interview preparation, mock interviews and placement assistance to help you prepare for the job market.",
        icon: "briefcase",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore other career-focused programmes at techcadd and build practical skills for today's technology-driven industry.",
    items: [
      {
        title: "Digital Marketing Course",
        body: "Learn SEO, Google Ads, social media marketing, content marketing, analytics and AI-powered digital marketing strategies.",
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
        body: "Learn MongoDB, Express.js, React.js and Node.js while building full-stack web applications and real-world projects.",
        href: "/after-12th/mern-full-stack",
      },
      {
        title: "3-Month Cloud Computing Program",
        body: "A shorter, AWS-focused cloud computing track for learners who want a faster entry point.",
        href: "/after-12th/cloud-computing",
      },
    ],
  },

  faqs: [
    {
      q: "Is prior cloud computing experience required to join the Cloud Computing Diploma in Mohali?",
      a: "No. The program is designed for beginners as well as learners with basic IT knowledge. The course starts with cloud computing fundamentals before progressing toward infrastructure, networking, storage, security and administration.",
    },
    {
      q: "Who can enroll in the Cloud Computing Diploma Program?",
      a: "12th pass students, BCA/B.Tech/BSc-IT/MCA students, graduates, job seekers, working professionals, IT support professionals and learners interested in cloud careers can enroll.",
    },
    {
      q: "What will I learn in a Cloud Computing Diploma?",
      a: "You can learn cloud fundamentals, service models, deployment models, virtualization, cloud networking, storage, compute resources, security, administration, monitoring, troubleshooting and practical cloud concepts.",
    },
    {
      q: "Is this Cloud Computing Diploma suitable for beginners?",
      a: "Yes. The program starts with fundamental concepts and gradually introduces more advanced cloud topics, making it suitable for learners who are new to cloud computing.",
    },
    {
      q: "Does Techcadd provide practical cloud training in Mohali?",
      a: "Yes. The program focuses on practical learning through assignments, demonstrations, hands-on exercises, troubleshooting activities and real-world cloud scenarios.",
    },
    {
      q: "Will I get a certificate after completing the course?",
      a: "Yes, students completing the program receive a course completion certificate from Techcadd, subject to the institute's certification requirements.",
    },
    {
      q: "Does Techcadd provide placement assistance?",
      a: "Yes. Techcadd provides placement-oriented support including resume guidance, interview preparation, mock interviews and placement assistance.",
    },
    {
      q: "What jobs can I pursue after learning Cloud Computing?",
      a: "Depending on your skills and further specialisation, career paths can include Cloud Support Engineer, Cloud Administrator, Cloud Engineer, Cloud Operations Executive, DevOps Associate and IT Infrastructure roles.",
    },
    {
      q: "Are flexible batch timings available?",
      a: "Yes. Techcadd offers flexible learning schedules designed to accommodate college students and working professionals.",
    },
    {
      q: "Is Cloud Computing a good career option after graduation?",
      a: "Cloud computing can be a strong technical career path for learners interested in IT infrastructure, networking, servers, applications and modern technology environments. Additional specialisation and practical experience can further improve career opportunities.",
    },
    {
      q: "Can BCA and B.Tech students join this program?",
      a: "Yes. BCA, B.Tech, BSc-IT, MCA and other students interested in cloud technologies can join the program to gain practical skills alongside their academic education.",
    },
    {
      q: "Where can I learn Cloud Computing in Mohali?",
      a: "Techcadd provides Cloud Computing Diploma training in Mohali, with practical learning, mentor support, flexible batches and placement-oriented guidance.",
    },
  ],

  enquiry: {
    title: "Start Your Cloud Computing Career Journey in Mohali",
    paragraphs: [
      "Stop relying only on theoretical tutorials. Learn cloud computing through structured training, practical exercises, mentor guidance and career-focused preparation at Techcadd, Mohali.",
      "Not ready to fill a form yet? Leave your number and a Techcadd counsellor will call you back to answer your questions — no pressure, no obligation.",
    ],
  },

  fit: {
    title: "Not Sure If the Cloud Computing Diploma Is the Right Fit?",
    paragraphs: [
      "Choosing a technology career after 12th — or a career switch later on — can feel confusing. If you're interested in cloud infrastructure, virtualization, networking or security, this diploma can give you the practical foundation to get started.",
      "You don't need previous cloud experience. The 9-Month Cloud Computing Diploma Program in Mohali starts with the basics and gradually takes you into infrastructure, deployment and real-world practical projects.",
    ],
    ctaTitle: "Take the Next Step",
    points: [
      "12th pass, graduate or working professional? You can start.",
      "No advanced cloud experience? No problem.",
      "Want practical, job-oriented skills? Build them through hands-on training.",
      "Want career guidance? Get resume, interview and placement support.",
    ],
  },
};

const flutterAppDevelopmentDiploma: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Where it takes you" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "9-Month Job-Oriented Diploma",
    title: "Best After 12th 9-Month Flutter App Development Diploma Program in Mohali",
    paragraphs: [
      "Looking for the best Flutter App Development Diploma Program in Mohali? Techcadd offers a career-focused, 9-month Flutter program designed for students, graduates, beginners and aspiring mobile app developers who want to build practical skills for the IT industry.",
      "The program focuses on learning how to create modern mobile applications using Flutter and Dart — from designing user interfaces and writing Dart code to connecting applications with APIs, databases, Firebase and other backend services.",
    ],
  },

  program: {
    title: "Flutter App Development Diploma Program Course in Mohali",
    paragraphs: [
      "At Techcadd, training goes beyond classroom theory. Students work on practical assignments and real-world application projects while receiving mentor guidance, doubt-clearing support, interview preparation and career guidance.",
      "The curriculum follows a progressive path — Dart and programming fundamentals first, then Flutter UI development, widgets, layouts, navigation, forms, APIs, databases, Firebase and application projects.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "9 Months" },
      { label: "Mode", value: "Classroom & Online" },
      { label: "Eligibility", value: "12th Pass / Graduate, Any Stream" },
      { label: "Level", value: "Beginner to Advanced" },
      { label: "Stack", value: "Dart + Flutter" },
      { label: "Focus", value: "UI, APIs, Firebase & Real Projects" },
      { label: "Includes", value: "Practical Training + Placement Support" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "The Flutter App Development Diploma Program in Mohali focuses on learning how to create modern mobile applications using Flutter and Dart. Students learn the complete app development process, from designing user interfaces and writing Dart code to connecting applications with APIs, databases, Firebase and other backend services.",
      "Training goes beyond classroom theory. Students work on practical assignments and real-world application projects while receiving mentor guidance, doubt-clearing support, interview preparation and career guidance.",
      "If you're searching for a Flutter App Development course in Mohali that combines practical learning with career-focused training, this program is designed to help you build the skills required to start your mobile app development journey.",
    ],
  },

  learn: {
    title: "What You’ll Learn",
    intro: "The curriculum is designed to take students from programming fundamentals to practical Flutter application development.",
    items: [
      {
        title: "Introduction to Mobile App Development",
        body: "Understand mobile application basics, the development lifecycle, Android and iOS concepts, cross-platform development, and the Flutter development workflow.",
      },
      {
        title: "Dart Programming Fundamentals",
        body: "Learn variables, data types, operators, conditional statements, loops, functions, collections, lists, maps, sets, exception handling and object-oriented programming concepts.",
      },
      {
        title: "Introduction to Flutter",
        body: "Learn the Flutter SDK, project structure, stateless and stateful widgets, the build method, the widget tree and hot reload.",
      },
      {
        title: "Flutter UI Development",
        body: "Create modern application interfaces with text, images, buttons, containers, rows, columns, cards, icons, forms, input fields, lists, grids and custom layouts.",
      },
      {
        title: "Responsive UI Design",
        body: "Build interfaces that work across different screen sizes using responsive layouts, flexible and expanded widgets, and mobile UI principles.",
      },
      {
        title: "Navigation and Routing",
        body: "Learn how users move between screens — routes, named routes, passing data between screens and navigation stacks.",
      },
      {
        title: "Forms and User Input",
        body: "Collect and validate user information with text fields, forms, form validation, input controllers, and login/registration interfaces.",
      },
      {
        title: "State Management Concepts",
        body: "Understand how application data and UI states are managed, including stateful widgets, application state and reusable state logic.",
      },
      {
        title: "API Integration",
        body: "Work with REST APIs, HTTP GET and POST requests, JSON, parsing API responses and displaying API data inside a Flutter application.",
      },
      {
        title: "Firebase Integration",
        body: "Set up Firebase, implement authentication and user registration/login, and work with Firebase database and cloud data services.",
      },
      {
        title: "Database Concepts",
        body: "Understand local and cloud databases, CRUD operations, and how applications store and retrieve information.",
      },
      {
        title: "Authentication",
        body: "Implement common authentication flows — registration, login, logout, session handling and authentication validation.",
      },
      {
        title: "Debugging and Error Handling",
        body: "Identify and fix runtime and logical errors, read error messages, and test application functionality.",
      },
      {
        title: "Git and Version Control Basics",
        body: "Learn repositories, commits, branches, version management and project collaboration with Git.",
      },
      {
        title: "Real-World Flutter Projects",
        body: "Apply everything you've learned to practical application projects you can show in a portfolio and discuss in interviews.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The 9-month Flutter App Development Diploma follows a progressive learning path — programming fundamentals first, then Flutter UI, navigation, backend integration and real application projects.",
    modules: [
      {
        title: "Introduction to Mobile App Development",
        points: ["Mobile application basics", "Application development lifecycle", "Android and iOS concepts", "Cross-platform development", "Flutter introduction"],
      },
      {
        title: "Dart Programming Fundamentals",
        points: ["Variables, data types and operators", "Conditional statements and loops", "Functions", "Collections — lists, maps and sets", "Exception handling", "OOP concepts"],
      },
      {
        title: "Introduction to Flutter",
        points: ["Flutter SDK and project structure", "Widgets — stateless and stateful", "The build method and widget tree", "Hot reload", "Flutter development workflow"],
      },
      {
        title: "Flutter UI Development",
        points: ["Text, images, buttons and containers", "Rows, columns and cards", "Icons, forms and input fields", "Lists, grids and custom layouts"],
      },
      {
        title: "Responsive UI Design",
        points: ["Responsive layouts", "Screen dimensions", "Flexible and Expanded widgets", "Mobile UI principles"],
      },
      {
        title: "Navigation and Routing",
        points: ["Screen navigation and routes", "Named routes", "Passing data between screens", "Navigation stacks"],
      },
      {
        title: "Forms and User Input",
        points: ["Text fields and forms", "Form validation", "Input controllers", "Login and registration interfaces"],
      },
      {
        title: "State Management Concepts",
        points: ["State concepts", "Stateful widgets", "Application state", "Reusable state logic and approaches"],
      },
      {
        title: "API Integration",
        points: ["REST APIs and HTTP requests", "GET and POST requests", "JSON and parsing API responses", "Displaying API data in Flutter"],
      },
      {
        title: "Firebase Integration",
        points: ["Firebase setup", "Authentication, registration and login", "Firebase database concepts", "Cloud data and Firebase services"],
      },
      {
        title: "Database Concepts & Authentication",
        points: ["Local and cloud databases", "CRUD operations", "Registration, login, logout and sessions", "Authentication validation"],
      },
      {
        title: "Debugging, Git & Real-World Projects",
        points: ["Debugging and error handling", "Git basics — repositories, commits, branches", "Portfolio application projects", "Interview and project-explanation preparation"],
      },
    ],
    practical: {
      title: "Practical Training",
      body: "Throughout the 9 months, students write code, build UI screens, implement functionality, debug errors, connect applications to backend services, and develop complete application projects.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the diploma, students will have practical experience across Dart, Flutter UI, navigation, state management, APIs, Firebase, databases and authentication — with a portfolio of application projects to support their mobile app development journey.",
    },
  },

  tools: {
    title: "Tools",
    items: [
      { name: "Dart", body: "The programming language Flutter applications are built with." },
      { name: "Flutter SDK", body: "Build, test and hot-reload cross-platform application UI." },
      { name: "Android Studio / VS Code", body: "Write, run and debug Flutter projects." },
      { name: "Firebase", body: "Authentication, database and cloud services for your applications." },
      { name: "REST APIs / Postman", body: "Connect applications to backend services and test API responses." },
      { name: "Git & GitHub", body: "Track changes and manage project versions." },
    ],
  },

  who: {
    title: "Who Can Do This Course",
    items: [
      {
        title: "12th Pass Students",
        body: "Students from Science, Commerce or Arts backgrounds can start learning Flutter app development, step by step, without needing an advanced computer science background.",
        icon: "users",
      },
      {
        title: "College Students",
        body: "BCA, B.Tech, BSc-IT, MCA and other computer-related students can supplement academic theory with practical UI, API, database and project development skills.",
        icon: "certificate",
      },
      {
        title: "Graduates Building an IT Career",
        body: "Learn Dart, Flutter widgets, UI development, navigation, APIs, Firebase, databases and projects through a structured learning path.",
        icon: "rocket",
      },
      {
        title: "Job Seekers",
        body: "Add mobile development skills to your resume and build applications you can demonstrate during interviews and portfolio discussions.",
        icon: "briefcase",
      },
      {
        title: "Working Professionals",
        body: "Move toward software or mobile app development with flexible batch timings that fit around professional commitments.",
        icon: "terminal",
      },
      {
        title: "Freelancers & Aspiring App Entrepreneurs",
        body: "Build a foundation for developing applications for clients or your own app ideas — UI, application logic, APIs, databases and Firebase.",
        icon: "sparkles",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Year",
    items: [
      {
        title: "Practical, Project-Based Learning",
        body: "Students write code, create interfaces, implement functionality, debug errors, connect applications with services and develop complete projects — not just watch presentations.",
        icon: "layers",
      },
      {
        title: "Beginner-to-Developer Structure",
        body: "A progressive learning path — Dart and programming fundamentals first, then Flutter UI, widgets, navigation, forms, APIs, databases, Firebase and application projects.",
        icon: "terminal",
      },
      {
        title: "Industry-Relevant Mobile Skills",
        body: "Practical concepts in modern application development — responsive interfaces, reusable widgets, API integration, Firebase services, architecture, debugging and project development.",
        icon: "cube",
      },
      {
        title: "Interview & Career Support",
        body: "Resume preparation, interview practice, project explanation and career guidance — learning development skills is only one part of starting a career.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Build for Android and iOS, from One Codebase.",
    paragraphs: [
      "Flutter is used for building cross-platform applications, and modern development teams increasingly reach for a single codebase that ships to both Android and iOS.",
      "This 9-month diploma starts from Dart and programming fundamentals and moves gradually into UI development, backend integration and complete application projects — no prior app development experience required.",
    ],
    listTitle: "Start Before the Industry Moves Further",
    items: [
      {
        title: "Cross-platform is in demand",
        body: "One Flutter codebase can target both Android and iOS, which is attractive to teams and clients alike.",
      },
      {
        title: "Practical skills stand out",
        body: "Hands-on UI, API and Firebase experience builds a stronger technical profile than tutorials alone.",
      },
      {
        title: "Build a real portfolio",
        body: "Ship application projects you can walk an interviewer through, screen by screen.",
      },
      {
        title: "Learn locally in Mohali",
        body: "Accessible to learners from Mohali, Chandigarh and nearby areas without needing to relocate.",
      },
    ],
  },

  advisor: {
    title: "Talk to a course advisor",
    body: "Ten minutes on the phone settles more than an hour of reading — eligibility, batch timings, fees, and whether this programme fits your degree or the job you already have.",
    cta: "Book a free demo class",
  },

  certificate: {
    title: "What You Leave the Diploma With",
    intro:
      "Complete the course with a portfolio of real Flutter application projects and course-completion certification — exact certification and placement details should be confirmed with the Techcadd Mohali centre at the time of enrolment.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "Confirm current certification details with the Techcadd Mohali centre.",
      },
      {
        icon: "layers",
        title: "Portfolio of Projects",
        body: "Real application projects you can show in any interview.",
      },
      {
        icon: "briefcase",
        title: "Interview Preparation",
        body: "Resume guidance, mock interviews and project-explanation practice.",
      },
      {
        icon: "target",
        title: "Placement Support",
        body: "Career guidance and placement assistance — confirm exact services with the Mohali centre.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Takes You",
    intro:
      "The 9-Month Flutter App Development Diploma gives you a practical foundation to move from a beginner toward entry-level opportunities in mobile application development.",
    listTitle: "From Beginner to App-Ready",
    steps: [
      {
        title: "Start with Dart",
        body: "Build your foundation in programming fundamentals before touching Flutter itself.",
      },
      {
        title: "Learn Flutter UI",
        body: "Get hands-on with widgets, layouts, responsive design and navigation.",
      },
      {
        title: "Connect to the backend",
        body: "Integrate REST APIs, Firebase authentication and databases into working screens.",
      },
      {
        title: "Ship real projects",
        body: "Build a portfolio of application projects to show employers and discuss in interviews.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Ship",
    items: [
      {
        title: "Login & Registration App",
        body: "Build authentication screens with form validation, Firebase auth and session handling.",
      },
      {
        title: "To-Do Application",
        body: "Practice state management and local data with a fully working task-tracking app.",
      },
      {
        title: "Weather Application",
        body: "Fetch and display live data from a REST API with a clean, responsive UI.",
      },
      {
        title: "E-Commerce Application",
        body: "Build product listings, cart logic and navigation across multiple screens.",
      },
      {
        title: "Chat Application",
        body: "Connect a Flutter UI to Firebase for real-time data and user authentication.",
      },
      {
        title: "Student Management Application",
        body: "Implement CRUD operations against a database from inside a Flutter app.",
      },
      {
        title: "Final API & Firebase Capstone",
        body: "Bring APIs, Firebase, navigation, forms and state management together in one complete application.",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Ship It.",
    paragraphs: [
      "Flutter is best learned by building. Over nine months, you move from Dart fundamentals to complete, working applications.",
      "Every concept is paired with a screen or feature you actually build, so what you understand in class becomes something you can ship, debug and explain in an interview.",
    ],
    items: [
      {
        title: "Learn It",
        body: "Understand Dart, Flutter widgets, UI development, navigation, state management, APIs, Firebase and databases.",
        icon: "layers",
      },
      {
        title: "Build It",
        body: "Apply your knowledge through UI screens, API integrations, Firebase-backed features and real application projects.",
        icon: "cube",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Choose Techcadd, Mohali",
    intro:
      "Choosing the right training institute makes a real difference when learning application development. Here's what makes Techcadd a practical choice for Flutter training in Mohali.",
    items: [
      {
        title: "Experienced Trainers",
        body: "Practical teaching and structured learning — programming concepts, development workflows, debugging and project implementation.",
        icon: "terminal",
      },
      {
        title: "Project-Driven Teaching",
        body: "Students work toward building functional application projects, not just completing theoretical exercises.",
        icon: "cube",
      },
      {
        title: "Small-Batch Personal Attention",
        body: "Smaller learning groups make it easier to ask questions and get guidance when you hit a wall.",
        icon: "users",
      },
      {
        title: "Career-Focused Training",
        body: "Skills you can present through a resume and project portfolio, plus guidance on explaining your work in interviews.",
        icon: "briefcase",
      },
      {
        title: "Flexible Learning Options",
        body: "Batch timings designed to accommodate students, graduates and working professionals with different schedules.",
        icon: "clock",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore other career-focused programmes at Techcadd and build practical skills for today's technology-driven industry.",
    items: [
      {
        title: "MERN Full Stack Course",
        body: "Learn MongoDB, Express.js, React.js and Node.js while building full-stack web applications and real-world projects.",
        href: "/courses/after12th/mern-full-stack",
      },
      {
        title: "Python Programming Course",
        body: "Build a strong programming foundation with Python — the language behind automation, data and backend development.",
        href: "/courses/after12th/python-programming",
      },
      {
        title: "Artificial Intelligence Course",
        body: "Understand AI concepts and work with practical tools and technologies used to build intelligent applications.",
        href: "/courses/after12th/artificial-intelligence",
      },
      {
        title: "Data Science Course",
        body: "Learn to work with data, build models and turn raw numbers into decisions employers care about.",
        href: "/courses/after12th/data-science",
      },
      {
        title: "9-Month Cloud Computing Diploma",
        body: "Cloud infrastructure, virtualization, networking, storage, security and deployment — another 9-month, job-oriented diploma.",
        href: "/courses/after12th/cloud-computing-diploma",
      },
    ],
  },

  faqs: [
    {
      q: "Is prior coding experience required for the Flutter App Development Diploma Program in Mohali?",
      a: "No. The program can be started by beginners. Programming fundamentals and Dart are introduced before students move into Flutter application development.",
    },
    {
      q: "Who can join the Flutter App Development Diploma Program?",
      a: "12th pass students, college students, BCA/B.Tech/BSc-IT/MCA students, graduates, job seekers, working professionals, freelancers and beginners interested in mobile application development can join.",
    },
    {
      q: "What programming language is used in Flutter?",
      a: "Flutter applications are primarily developed using Dart. Students learn Dart programming fundamentals as part of the program before progressing into Flutter development.",
    },
    {
      q: "What will I learn in the Flutter course?",
      a: "Students learn Dart, Flutter widgets, UI development, responsive layouts, navigation, forms, state concepts, API integration, Firebase, databases, authentication, debugging, Git basics and practical projects.",
    },
    {
      q: "Can beginners learn Flutter?",
      a: "Yes. Beginners can learn Flutter when the course follows a structured learning path. The program starts with programming fundamentals and gradually moves toward application development.",
    },
    {
      q: "Does the program include practical projects?",
      a: "Yes. Practical application development is an important part of the training. Students can work on projects that apply UI development, APIs, databases, Firebase, authentication and other concepts.",
    },
    {
      q: "Can I learn Flutter after 12th?",
      a: "Yes. 12th pass students interested in software and mobile application development can start learning Flutter. Basic programming concepts are introduced as part of the learning process.",
    },
    {
      q: "Is Flutter useful for mobile app development?",
      a: "Flutter is a framework used for developing applications, and learning it can provide a foundation for cross-platform mobile application development.",
    },
    {
      q: "Does the course include API integration?",
      a: "Yes. API integration concepts are included, covering REST APIs, HTTP requests, JSON data, API responses and displaying backend data inside applications.",
    },
    {
      q: "Does the Flutter course include Firebase?",
      a: "Yes. Firebase integration is covered, including authentication and database-related concepts used in application development.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Course completion certification should be confirmed with the Techcadd Mohali centre at the time of enrolment.",
    },
    {
      q: "Does Techcadd provide placement assistance?",
      a: "The program is designed with career support in mind, including resume guidance, interview preparation and placement assistance. Exact placement services should be confirmed with the Mohali centre.",
    },
    {
      q: "Are flexible batch timings available?",
      a: "Flexible batch options may be available for students and working professionals. Exact timings should be confirmed with the Techcadd Mohali centre.",
    },
    {
      q: "Can Flutter help me become a mobile app developer?",
      a: "Learning Flutter can provide practical skills for application development. Students should also continue building projects, strengthening programming fundamentals and developing their portfolios.",
    },
    {
      q: "Where is the Flutter App Development training available?",
      a: "The program is focused on Flutter App Development Diploma training in Mohali, Punjab. Exact centre address and directions should be confirmed with Techcadd.",
    },
  ],

  enquiry: {
    title: "Start Your Mobile App Development Career in Mohali",
    paragraphs: [
      "Stop watching random tutorials without completing a project. Learn Flutter step by step with structured training, practical application development, mentor guidance, projects and career-focused support at Techcadd, Mohali.",
      "Not ready to fill a form yet? Leave your contact details and connect with a Techcadd counsellor to discuss the course, batches, curriculum and career options.",
    ],
  },

  fit: {
    title: "Not Sure If the Flutter Diploma Is the Right Fit?",
    paragraphs: [
      "Choosing a technology career after 12th — or a career switch later on — can feel confusing. If you're interested in mobile app development, UI design or backend integration, this diploma can give you the practical foundation to get started.",
      "You don't need prior app development experience. The 9-Month Flutter App Development Diploma Program in Mohali starts with Dart fundamentals and gradually takes you into Flutter UI, APIs, Firebase and real-world application projects.",
    ],
    ctaTitle: "Take the Next Step",
    points: [
      "12th pass, graduate or working professional? You can start.",
      "No prior app development experience? No problem.",
      "Want practical, job-oriented skills? Build them through hands-on projects.",
      "Want career guidance? Get resume, interview and placement support.",
    ],
  },
};

const mernStackDiploma: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Where it takes you" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "9-Month Job-Oriented Diploma",
    title: "Best After 12th 9-Month MERN Stack Diploma Program in Mohali",
    paragraphs: [
      "Looking for the best MERN Stack Diploma Program in Mohali? Techcadd offers a job-oriented, 9-month MERN Stack Diploma designed for students, graduates, aspiring developers and job seekers across Mohali, Chandigarh and nearby areas.",
      "This diploma covers the complete web development journey — from HTML, CSS and JavaScript fundamentals to React.js, Node.js, Express.js and MongoDB — building responsive websites, dynamic web applications, REST APIs, database-driven applications and full-stack projects.",
    ],
  },

  program: {
    title: "MERN Stack Diploma Program Course in Mohali",
    paragraphs: [
      "At Techcadd, training goes beyond theory. Students work on practical assignments and real-world projects, receive doubt-clearing support, and get placement assistance to help prepare for roles such as MERN Stack Developer, Full Stack Developer, React Developer, Node.js Developer and Web Developer.",
      "The program follows a logical progression — starting with HTML, CSS and JavaScript, then moving toward React.js, Node.js, Express.js, MongoDB, APIs, authentication and full-stack projects.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "9 Months" },
      { label: "Mode", value: "Classroom & Online" },
      { label: "Eligibility", value: "12th Pass / Graduate, Any Stream" },
      { label: "Level", value: "Beginner-Friendly" },
      { label: "Stack", value: "HTML, CSS, JS, React, Node, Express & MongoDB" },
      { label: "Project", value: "Full-Stack Capstone Application" },
      { label: "Includes", value: "Practical Training + Placement Support" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "This MERN Stack Diploma in Mohali covers the complete web development journey — from HTML, CSS and JavaScript fundamentals to React.js, Node.js, Express.js and MongoDB. Students learn how to build responsive websites, dynamic web applications, REST APIs, database-driven applications and full-stack projects.",
      "Training goes beyond theory. Students work on practical assignments and real-world projects, receive doubt-clearing support, and get placement assistance to help prepare for roles such as MERN Stack Developer, Full Stack Developer, React Developer, Node.js Developer and Web Developer.",
      "If you're searching for a trusted MERN Stack Institute in Mohali that combines hands-on learning with career support, this diploma program is built for you.",
    ],
  },

  learn: {
    title: "What You’ll Learn",
    intro: "This program is structured to take learners from basic web development concepts to full-stack application development.",
    items: [
      {
        title: "HTML Fundamentals",
        body: "Learn HTML structure, semantic elements, forms, tables, links, images and other core concepts required to create web pages.",
      },
      {
        title: "CSS & Responsive Web Design",
        body: "Learn styling, layouts, Flexbox, Grid, responsive design, media queries and techniques for websites that work across different screen sizes.",
      },
      {
        title: "JavaScript Fundamentals",
        body: "Understand variables, data types, operators, conditions, loops, functions, arrays, objects and modern JavaScript concepts.",
      },
      {
        title: "DOM & JavaScript Interaction",
        body: "Learn how JavaScript interacts with web pages through the DOM and how to create interactive user experiences.",
      },
      {
        title: "Modern JavaScript / ES6+",
        body: "Understand arrow functions, destructuring, modules, promises, async/await and other concepts used in modern development.",
      },
      {
        title: "React.js",
        body: "Learn React components, props, state, events, hooks, forms, routing and application structure for building modern frontend applications.",
      },
      {
        title: "Node.js",
        body: "Understand server-side JavaScript and learn how Node.js is used to create backend applications and services.",
      },
      {
        title: "Express.js",
        body: "Learn how to create backend applications and REST APIs using Express.js, including routes, middleware, requests and responses.",
      },
      {
        title: "MongoDB",
        body: "Learn database fundamentals and how MongoDB is used to store and manage application data.",
      },
      {
        title: "REST APIs",
        body: "Understand how frontend and backend applications communicate through APIs, and learn how to create and consume RESTful services.",
      },
      {
        title: "Authentication & Application Security",
        body: "Learn user authentication, authorization, protected routes and basic security practices for web applications.",
      },
      {
        title: "Full-Stack Projects",
        body: "Apply your skills by building practical full-stack applications that combine frontend, backend, APIs and database technologies.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The 9-month MERN Stack Diploma follows a structured, beginner-friendly progression — from HTML, CSS and JavaScript through React, Node, Express and MongoDB, to full-stack capstone projects.",
    modules: [
      {
        title: "HTML Fundamentals",
        points: ["HTML structure and semantic elements", "Forms and tables", "Links and images"],
      },
      {
        title: "CSS & Responsive Web Design",
        points: ["Styling and layouts", "Flexbox and Grid", "Media queries and responsive design"],
      },
      {
        title: "JavaScript Fundamentals",
        points: ["Variables, data types and operators", "Conditions, loops and functions", "Arrays and objects"],
      },
      {
        title: "DOM & Modern JavaScript (ES6+)",
        points: ["The DOM and interactive UI", "Arrow functions and destructuring", "Modules, promises and async/await"],
      },
      {
        title: "React.js",
        points: ["Components, props and state", "Events and hooks", "Forms, routing and application structure"],
      },
      {
        title: "Node.js & Express.js",
        points: ["Server-side JavaScript fundamentals", "REST APIs, routes and middleware", "Requests and responses"],
      },
      {
        title: "MongoDB & REST APIs",
        points: ["Database fundamentals", "Storing and managing application data", "Creating and consuming RESTful services"],
      },
      {
        title: "Authentication & Application Security",
        points: ["User authentication and authorization", "Protected routes", "Basic security practices"],
      },
      {
        title: "Full-Stack Capstone Projects",
        points: ["Combining frontend, backend, APIs and database", "Building a complete application end to end", "Portfolio and interview preparation"],
      },
    ],
    practical: {
      title: "Practical Training",
      body: "Throughout the 9 months, students write code, debug applications, create components, connect databases, develop APIs and build complete web applications rather than only studying theory.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the diploma, students will have a solid, practical foundation across HTML, CSS, JavaScript, React, Node.js, Express.js and MongoDB — along with full-stack project experience to support entry into web and software development roles.",
    },
  },

  tools: {
    title: "Tools",
    items: [
      { name: "HTML5, CSS3 & JavaScript", body: "The core building blocks of every web page and interface." },
      { name: "React.js", body: "Build components, manage state and route between screens." },
      { name: "Node.js & Express.js", body: "Create backend applications, routes and REST APIs." },
      { name: "MongoDB", body: "Store and manage application data with a NoSQL database." },
      { name: "REST APIs / Postman", body: "Connect frontend and backend, and test API responses." },
      { name: "Git & GitHub", body: "Track changes and manage project versions." },
    ],
  },

  who: {
    title: "Who Can Do This Course",
    items: [
      {
        title: "12th Pass Students",
        body: "Students from Science, Commerce or Arts backgrounds can start learning web development and build a strong technical foundation.",
        icon: "users",
      },
      {
        title: "College Students — BCA, B.Tech, BSc-IT, MCA",
        body: "Supplement academic education with practical full-stack development skills, build projects, and prepare for internships and IT jobs.",
        icon: "certificate",
      },
      {
        title: "Graduates Starting a Career in IT",
        body: "Learn frontend and backend technologies through a structured learning path and practical project work.",
        icon: "rocket",
      },
      {
        title: "Job Seekers",
        body: "Build a stronger technical portfolio and prepare for entry-level web development and software development opportunities.",
        icon: "briefcase",
      },
      {
        title: "Working Professionals",
        body: "IT support, web design, testing and other technical professionals can learn modern JavaScript-based technologies to expand their career options.",
        icon: "terminal",
      },
      {
        title: "Aspiring Full Stack & Web Developers",
        body: "Build a structured foundation in frontend development, backend development, databases, APIs and application development.",
        icon: "code",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Year",
    items: [
      {
        title: "Practical, Project-Based Learning",
        body: "Students write code, debug applications, create components, connect databases, develop APIs and build complete web applications — not just watch coding demonstrations.",
        icon: "layers",
      },
      {
        title: "Structured Beginner-to-Job-Ready Curriculum",
        body: "A logical progression — HTML, CSS and JavaScript first, then React.js, Node.js, Express.js, MongoDB, APIs, authentication and full-stack projects.",
        icon: "terminal",
      },
      {
        title: "Industry-Relevant Development Skills",
        body: "Learn technologies used for modern web application development, and understand how frontend, backend, databases and APIs work together.",
        icon: "code",
      },
      {
        title: "Interview & Placement Support",
        body: "Resume-building guidance, mock interviews, interview preparation and placement assistance to improve career readiness.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "One Language, Front to Back.",
    paragraphs: [
      "MERN — MongoDB, Express.js, React.js and Node.js — lets you build an entire application, frontend to backend, in one language: JavaScript.",
      "This 9-month diploma starts from HTML, CSS and JavaScript fundamentals and moves gradually into React, Node, Express, MongoDB and full-stack project work — no advanced programming experience needed to begin.",
    ],
    listTitle: "Start Before the Industry Moves Further",
    items: [
      {
        title: "Full-stack is in demand",
        body: "Teams value developers who can move between frontend, backend and database work.",
      },
      {
        title: "Practical skills stand out",
        body: "Hands-on React, Node and MongoDB experience builds a stronger technical profile than tutorials alone.",
      },
      {
        title: "Build a real portfolio",
        body: "Ship full-stack projects you can walk an interviewer through, screen by screen and API by API.",
      },
      {
        title: "Learn locally in Mohali",
        body: "Accessible to learners from Mohali, Chandigarh, Kharar, Zirakpur and nearby areas without needing to relocate.",
      },
    ],
  },

  advisor: {
    title: "Talk to a course advisor",
    body: "Ten minutes on the phone settles more than an hour of reading — eligibility, batch timings, fees, and whether this programme fits your degree or the job you already have.",
    cta: "Book a free demo class",
  },

  certificate: {
    title: "What You Leave the Diploma With",
    intro:
      "Complete the course with a portfolio of full-stack projects and course-completion certification — exact certification and placement details should be confirmed with the Techcadd Mohali centre at the time of enrolment.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "Confirm current certification details with the Techcadd Mohali centre.",
      },
      {
        icon: "layers",
        title: "Portfolio of Projects",
        body: "Full-stack applications you can show in any interview.",
      },
      {
        icon: "briefcase",
        title: "Interview Preparation",
        body: "Resume guidance, mock interviews and project-explanation practice.",
      },
      {
        icon: "target",
        title: "Placement Support",
        body: "Career guidance and placement assistance — confirm exact services with the Mohali centre.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Takes You",
    intro:
      "The 9-Month MERN Stack Diploma gives you a practical foundation to move from a beginner toward entry-level opportunities in web and full-stack development.",
    listTitle: "From Beginner to Full-Stack Ready",
    steps: [
      {
        title: "Start with the fundamentals",
        body: "Build your foundation in HTML, CSS and JavaScript.",
      },
      {
        title: "Move into React",
        body: "Get hands-on with components, hooks, state and routing.",
      },
      {
        title: "Build the backend",
        body: "Create REST APIs with Node.js and Express.js, backed by MongoDB.",
      },
      {
        title: "Ship a full-stack project",
        body: "Combine frontend, backend, APIs and database into one complete application for your portfolio.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Ship",
    items: [
      {
        title: "Responsive Landing Page",
        body: "Build a fully responsive web page with HTML, CSS, Flexbox and Grid.",
      },
      {
        title: "Interactive JavaScript App",
        body: "Practice DOM manipulation and modern JavaScript with an interactive UI project.",
      },
      {
        title: "React Frontend Application",
        body: "Build a multi-component React app with state, hooks, forms and routing.",
      },
      {
        title: "REST API with Node & Express",
        body: "Design and build backend routes, middleware and a working REST API.",
      },
      {
        title: "Database-Driven Application",
        body: "Connect an API to MongoDB and implement full CRUD operations.",
      },
      {
        title: "Authentication System",
        body: "Implement user registration, login and protected routes.",
      },
      {
        title: "Final Full-Stack Capstone",
        body: "Bring frontend, backend, APIs, database and authentication together in one complete, deployable application.",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Ship It.",
    paragraphs: [
      "Full-stack development is best learned by building. Over nine months, you move from HTML and CSS to complete, working applications.",
      "Every concept is paired with something you build, so what you understand in class becomes something you can code, debug and explain in an interview.",
    ],
    items: [
      {
        title: "Learn It",
        body: "Understand HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB and REST APIs.",
        icon: "layers",
      },
      {
        title: "Build It",
        body: "Apply your knowledge through components, APIs, database integration and full-stack capstone projects.",
        icon: "cube",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Learn MERN Stack at Techcadd, Mohali",
    intro:
      "Choosing the right institute matters when learning a technical skill like full-stack development. Here's what makes Techcadd a practical choice for MERN Stack training in Mohali.",
    items: [
      {
        title: "Experienced, Industry-Aware Trainers",
        body: "Trainers explain how frontend, backend, databases and APIs work together in real applications, not just in isolated examples.",
        icon: "terminal",
      },
      {
        title: "Hands-On, Project-Driven Teaching",
        body: "The focus is on building applications rather than learning concepts only through theory.",
        icon: "cube",
      },
      {
        title: "Small-Batch Personal Attention",
        body: "Manageable batches let students ask questions and get individual guidance when they hit coding or project difficulties.",
        icon: "users",
      },
      {
        title: "Placement Support",
        body: "Resume guidance, interview preparation, mock interviews and placement assistance to help you prepare for the job market.",
        icon: "briefcase",
      },
      {
        title: "Flexible for Students & Professionals",
        body: "Batch timings accommodate college students and working professionals learning full-stack development alongside existing commitments.",
        icon: "clock",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore other career-focused programmes at Techcadd and build practical skills for today's technology-driven industry.",
    items: [
      {
        title: "9-Month Flutter App Development Diploma",
        body: "Build cross-platform mobile apps with Dart, Flutter, APIs and Firebase — another 9-month, job-oriented diploma.",
        href: "/courses/after12th/flutter-app-development-diploma-program",
      },
      {
        title: "Python Programming Course",
        body: "Build a strong programming foundation with Python — the language behind automation, data and backend development.",
        href: "/courses/after12th/python-programming",
      },
      {
        title: "Artificial Intelligence Course",
        body: "Understand AI concepts and work with practical tools and technologies used to build intelligent applications.",
        href: "/courses/after12th/artificial-intelligence",
      },
      {
        title: "Data Science Course",
        body: "Learn to work with data, build models and turn raw numbers into decisions employers care about.",
        href: "/courses/after12th/data-science",
      },
      {
        title: "9-Month Cloud Computing Diploma",
        body: "Cloud infrastructure, virtualization, networking, storage, security and deployment — another 9-month, job-oriented diploma.",
        href: "/courses/after12th/cloud-computing-diploma",
      },
    ],
  },

  faqs: [
    {
      q: "Is prior coding experience required to join the MERN Stack Diploma in Mohali?",
      a: "No. The program is suitable for beginners and starts with basic web development concepts before moving toward JavaScript, React.js, Node.js, Express.js, MongoDB, APIs and full-stack development.",
    },
    {
      q: "Who can enroll in the MERN Stack Diploma Program?",
      a: "12th pass students, BCA/B.Tech/BSc-IT/MCA students, graduates, job seekers, working professionals and anyone interested in web development can enroll.",
    },
    {
      q: "What will I learn in a MERN Stack Diploma?",
      a: "You can learn HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, REST APIs, authentication concepts, responsive design and full-stack application development.",
    },
    {
      q: "Is the MERN Stack course suitable for beginners?",
      a: "Yes. The course begins with fundamental web technologies and gradually progresses toward frontend, backend, database and full-stack development.",
    },
    {
      q: "Does Techcadd provide practical MERN Stack training in Mohali?",
      a: "Yes. The program focuses on practical coding, assignments, application development, troubleshooting and project-based learning.",
    },
    {
      q: "Will I get a certificate after completing the course?",
      a: "Yes, students who successfully complete the program receive a course completion certificate from Techcadd, subject to the institute's certification requirements.",
    },
    {
      q: "Does Techcadd provide placement assistance?",
      a: "Yes. Techcadd provides placement-oriented support including resume guidance, interview preparation, mock interviews and placement assistance.",
    },
    {
      q: "What jobs can I pursue after learning MERN Stack?",
      a: "Depending on your skills and experience, career paths can include MERN Stack Developer, Full Stack Developer, React Developer, Node.js Developer, Backend Developer, Frontend Developer and Web Developer.",
    },
    {
      q: "Are flexible batch timings available?",
      a: "Yes. Flexible batch options are designed to accommodate college students and working professionals.",
    },
    {
      q: "Is MERN Stack a good career option after graduation?",
      a: "MERN Stack can be a useful technology path for learners interested in web and software development. Building strong projects and gaining practical experience can help improve your readiness for development roles.",
    },
    {
      q: "Can BCA and B.Tech students join this program?",
      a: "Yes. BCA, B.Tech, BSc-IT, MCA and students from other relevant backgrounds can join the program to develop practical full-stack development skills.",
    },
    {
      q: "Where can I learn MERN Stack in Mohali?",
      a: "Techcadd provides MERN Stack Diploma training in Mohali, with practical learning, mentor support, flexible batches and placement-oriented guidance.",
    },
  ],

  enquiry: {
    title: "Start Your Full Stack Development Career in Mohali",
    paragraphs: [
      "Stop watching coding tutorials without finishing projects. Learn MERN Stack through structured training, practical coding, real-world projects, mentor guidance and career-focused preparation at Techcadd, Mohali.",
      "Not ready to fill a form yet? Leave your number and a Techcadd counsellor will call you back to answer your questions — no pressure, no obligation.",
    ],
  },

  fit: {
    title: "Not Sure If the MERN Stack Diploma Is the Right Fit?",
    paragraphs: [
      "Choosing a technology career after 12th — or a career switch later on — can feel confusing. If you're interested in web development, frontend design or backend logic, this diploma can give you the practical foundation to get started.",
      "You don't need advanced programming experience. The 9-Month MERN Stack Diploma Program in Mohali starts with the basics and gradually takes you into React, Node.js, Express.js, MongoDB and full-stack projects.",
    ],
    ctaTitle: "Take the Next Step",
    points: [
      "12th pass, graduate or working professional? You can start.",
      "No advanced programming experience? No problem.",
      "Want practical, job-oriented skills? Build them through hands-on projects.",
      "Want career guidance? Get resume, interview and placement support.",
    ],
  },
};

const agenticAiDiploma: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Where it takes you" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "9-Month Job-Oriented Diploma",
    title: "Best After 12th 9-Month Agentic AI Diploma Program in Mohali",
    paragraphs: [
      "Looking for the best Agentic AI Diploma Program in Mohali? Techcadd offers a job-oriented, 9-month Agentic AI Diploma designed for students, graduates, developers, AI enthusiasts and working professionals who want to learn how modern AI agents are designed, developed and deployed.",
      "This diploma covers the fundamentals of Generative AI and Large Language Models, prompt engineering, AI agents, agent workflows, tool calling, APIs, automation, RAG, vector databases, memory, multi-agent systems and practical AI application development.",
    ],
  },

  program: {
    title: "Agentic AI Diploma Program Course in Mohali",
    paragraphs: [
      "At Techcadd, training goes beyond theory. Students work on practical assignments and AI projects, learn how to connect AI models with tools and APIs, receive doubt-clearing support, and get placement assistance to help prepare for emerging AI-focused roles.",
      "Agentic AI is moving beyond simple chatbot interactions toward AI systems that can reason through tasks, use tools, access information and execute multi-step workflows — this program builds that understanding through structured, practical learning.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "9 Months" },
      { label: "Mode", value: "Classroom & Online" },
      { label: "Eligibility", value: "12th Pass / Graduate, Any Stream" },
      { label: "Level", value: "Beginner-Friendly" },
      { label: "Focus", value: "AI Agents, LLMs, RAG & Automation" },
      { label: "Project", value: "AI Agent & Automation Capstone" },
      { label: "Includes", value: "Practical Training + Placement Support" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "This Agentic AI Diploma in Mohali covers the fundamentals of Generative AI and Large Language Models (LLMs), prompt engineering, AI agents, agent workflows, tool calling, APIs, automation, RAG, vector databases, memory, multi-agent systems and practical AI application development.",
      "Training goes beyond theory. Students work on practical assignments and AI projects, learn how to connect AI models with tools and APIs, receive doubt-clearing support, and get placement assistance to help prepare for emerging AI-focused roles.",
      "If you're searching for a trusted Agentic AI Institute in Mohali that combines practical learning with career support, this diploma program is built for you.",
    ],
  },

  learn: {
    title: "What You’ll Learn",
    intro: "This program is structured to take learners from Artificial Intelligence fundamentals to practical AI agent and application development.",
    items: [
      {
        title: "Artificial Intelligence Fundamentals",
        body: "Understand the basic concepts of Artificial Intelligence, machine intelligence, AI applications and how modern AI systems are used.",
      },
      {
        title: "Generative AI Fundamentals",
        body: "Learn how Generative AI works and understand its applications in text generation, content creation, automation and AI-powered software.",
      },
      {
        title: "Large Language Models (LLMs)",
        body: "Understand the fundamentals of LLMs and how they can be used to build intelligent applications and AI-powered workflows.",
      },
      {
        title: "Prompt Engineering",
        body: "Learn how to create effective prompts, structure instructions, control AI outputs and design prompts for different use cases.",
      },
      {
        title: "AI Agents",
        body: "Understand what AI agents are, how they differ from basic chatbots, and how agents can perform multi-step tasks using tools and external information.",
      },
      {
        title: "Agent Workflows",
        body: "Learn how to design structured AI workflows where different steps, tools and AI capabilities work together to complete tasks.",
      },
      {
        title: "Tool Calling & Function Calling",
        body: "Understand how AI models can interact with external tools, functions, APIs, databases and services to perform useful actions.",
      },
      {
        title: "API Integration",
        body: "Learn the fundamentals of connecting AI applications with external APIs and services to expand their capabilities.",
      },
      {
        title: "Retrieval-Augmented Generation (RAG)",
        body: "Understand RAG concepts and how AI applications can retrieve relevant information from external knowledge sources before generating responses.",
      },
      {
        title: "Vector Databases & Embeddings",
        body: "Learn the fundamentals of embeddings, semantic search and vector databases used for retrieving relevant information in AI applications.",
      },
      {
        title: "AI Memory",
        body: "Understand how memory can be incorporated into AI applications to maintain relevant information across interactions and workflows.",
      },
      {
        title: "Multi-Agent Systems",
        body: "Explore the fundamentals of multi-agent systems where multiple AI agents can collaborate or perform different tasks within a larger workflow.",
      },
      {
        title: "AI Automation",
        body: "Learn how AI agents can be combined with automation workflows to streamline repetitive business and productivity tasks.",
      },
      {
        title: "Practical AI Projects",
        body: "Apply your knowledge through practical projects involving AI assistants, agent workflows, RAG applications, automation systems and AI-powered solutions.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The 9-month Agentic AI Diploma follows a structured, beginner-friendly progression — from AI and Generative AI fundamentals through prompt engineering, agents, RAG and multi-agent systems, to practical AI projects.",
    modules: [
      {
        title: "AI & Generative AI Fundamentals",
        points: ["Artificial Intelligence basics", "Machine intelligence and AI applications", "How Generative AI works"],
      },
      {
        title: "Large Language Models & Prompt Engineering",
        points: ["LLM fundamentals", "Structuring effective prompts", "Controlling AI outputs for different use cases"],
      },
      {
        title: "AI Agents & Agent Workflows",
        points: ["What AI agents are and how they differ from chatbots", "Multi-step tasks using tools and information", "Designing structured agent workflows"],
      },
      {
        title: "Tool Calling & API Integration",
        points: ["Function and tool calling", "Connecting AI applications to external APIs", "Databases and services"],
      },
      {
        title: "RAG, Vector Databases & Embeddings",
        points: ["Retrieval-Augmented Generation concepts", "Embeddings and semantic search", "Vector databases for relevant information retrieval"],
      },
      {
        title: "AI Memory & Multi-Agent Systems",
        points: ["Incorporating memory across interactions", "Multi-agent collaboration", "Agents performing different tasks in a workflow"],
      },
      {
        title: "AI Automation & Practical Projects",
        points: ["Combining agents with automation workflows", "Streamlining repetitive tasks", "Practical AI assistant and automation projects"],
      },
    ],
    practical: {
      title: "Practical Training",
      body: "Throughout the 9 months, students work on prompts, LLMs, APIs, AI agents, tools, workflows and automation rather than only studying AI terminology.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the diploma, students will have a practical foundation across Generative AI, LLMs, prompt engineering, AI agents, RAG, vector databases and automation — with project experience to support entry into AI-focused roles.",
    },
  },

  tools: {
    title: "Tools",
    items: [
      { name: "Generative AI Platforms", body: "Work with modern AI models for text generation and application development." },
      { name: "LLM APIs", body: "Connect applications to large language models and process their responses." },
      { name: "Prompt Engineering Tools", body: "Design, test and refine prompts for different use cases." },
      { name: "Vector Databases", body: "Store and retrieve embeddings for RAG-based applications." },
      { name: "REST APIs / Postman", body: "Connect AI applications with external tools and services." },
      { name: "Automation & Workflow Tools", body: "Combine AI agents with automation workflows for practical tasks." },
    ],
  },

  who: {
    title: "Who Can Do This Course",
    items: [
      {
        title: "12th Pass Students",
        body: "Students from Science, Commerce or Arts backgrounds can begin exploring Artificial Intelligence and AI-powered technologies step by step.",
        icon: "users",
      },
      {
        title: "College Students — BCA, B.Tech, BSc-IT, MCA",
        body: "Supplement academic education with practical AI skills, build AI projects, and strengthen your portfolio.",
        icon: "certificate",
      },
      {
        title: "Graduates Starting a Career in AI",
        body: "Learn how modern AI applications and intelligent agents are built, and move into AI, automation or technology roles.",
        icon: "rocket",
      },
      {
        title: "Job Seekers",
        body: "Add modern AI capabilities to your technical profile as AI becomes more important across software, marketing, business and automation.",
        icon: "briefcase",
      },
      {
        title: "Working Professionals",
        body: "Developers, marketers, analysts and IT professionals can learn how AI agents and automation integrate into existing workflows.",
        icon: "terminal",
      },
      {
        title: "Aspiring AI Developers & Automation Enthusiasts",
        body: "Build a structured foundation for AI-powered applications, intelligent assistants and autonomous workflows.",
        icon: "sparkles",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Year",
    items: [
      {
        title: "Practical, Project-Based AI Learning",
        body: "Students work on practical activities involving prompts, LLMs, APIs, AI agents, tools, workflows, automation and AI-powered applications — not just AI terminology.",
        icon: "layers",
      },
      {
        title: "Structured Beginner-to-Advanced Curriculum",
        body: "A logical progression — AI and Generative AI fundamentals first, then prompt engineering, LLMs, RAG, agent workflows, tool calling, memory and multi-agent systems.",
        icon: "terminal",
      },
      {
        title: "Industry-Relevant AI Skills",
        body: "Concepts increasingly used in modern AI application development, automation, productivity systems and intelligent software solutions.",
        icon: "sparkles",
      },
      {
        title: "Interview & Placement Support",
        body: "Resume-building guidance, interview preparation, mock interviews and placement assistance to help students become more career-ready.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Beyond Chatbots — AI That Gets Things Done.",
    paragraphs: [
      "Agentic AI is moving beyond simple chatbot interactions toward AI systems that can reason through tasks, use tools, access information and execute multi-step workflows.",
      "This 9-month diploma starts from AI and Generative AI fundamentals and moves gradually into prompt engineering, agents, RAG and automation — no advanced AI experience needed to begin.",
    ],
    listTitle: "Start Before the Industry Moves Further",
    items: [
      {
        title: "AI is now agentic",
        body: "Modern AI systems increasingly plan, use tools and complete multi-step tasks, not just answer single prompts.",
      },
      {
        title: "Practical skills stand out",
        body: "Hands-on experience with agents, APIs and RAG builds a stronger technical profile than tutorials alone.",
      },
      {
        title: "Build a real portfolio",
        body: "Ship AI assistant and automation projects you can walk an interviewer through end to end.",
      },
      {
        title: "Learn locally in Mohali",
        body: "Accessible to learners from Mohali, Chandigarh, Kharar, Zirakpur and nearby areas without needing to relocate.",
      },
    ],
  },

  advisor: {
    title: "Talk to a course advisor",
    body: "Ten minutes on the phone settles more than an hour of reading — eligibility, batch timings, fees, and whether this programme fits your degree or the job you already have.",
    cta: "Book a free demo class",
  },

  certificate: {
    title: "What You Leave the Diploma With",
    intro:
      "Complete the course with a portfolio of practical AI projects and course-completion certification — exact certification and placement details should be confirmed with the Techcadd Mohali centre at the time of enrolment.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "Confirm current certification details with the Techcadd Mohali centre.",
      },
      {
        icon: "layers",
        title: "Portfolio of AI Projects",
        body: "AI assistants, agent workflows and automation projects you can show in any interview.",
      },
      {
        icon: "briefcase",
        title: "Interview Preparation",
        body: "Resume guidance, mock interviews and project-explanation practice.",
      },
      {
        icon: "target",
        title: "Placement Support",
        body: "Career guidance and placement assistance — confirm exact services with the Mohali centre.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Takes You",
    intro:
      "The 9-Month Agentic AI Diploma gives you a practical foundation to move from a beginner toward entry-level opportunities in AI-focused roles.",
    listTitle: "From Beginner to Agent-Ready",
    steps: [
      {
        title: "Start with AI fundamentals",
        body: "Build your foundation in Generative AI, LLMs and prompt engineering.",
      },
      {
        title: "Build your first agent",
        body: "Get hands-on with agent workflows, tool calling and API integration.",
      },
      {
        title: "Add retrieval and memory",
        body: "Work with RAG, vector databases and memory to make agents context-aware.",
      },
      {
        title: "Ship a real AI project",
        body: "Combine agents, tools and automation into one complete, portfolio-ready AI application.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Ship",
    items: [
      {
        title: "Prompt-Engineered AI Assistant",
        body: "Design effective prompts and build a basic AI assistant for a specific use case.",
      },
      {
        title: "Tool-Calling AI Agent",
        body: "Build an agent that calls external tools and APIs to complete a multi-step task.",
      },
      {
        title: "RAG-Based Knowledge Assistant",
        body: "Connect an AI application to a vector database to answer questions from a knowledge source.",
      },
      {
        title: "AI Automation Workflow",
        body: "Combine an AI agent with an automation workflow to streamline a repetitive task.",
      },
      {
        title: "Multi-Agent Collaboration Project",
        body: "Design a simple system where multiple agents perform different parts of a larger task.",
      },
      {
        title: "Final Agentic AI Capstone",
        body: "Bring prompts, tools, RAG, memory and automation together in one complete AI-powered application.",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Ship It.",
    paragraphs: [
      "Agentic AI is best learned by building. Over nine months, you move from AI fundamentals to working agents and automation systems.",
      "Every concept is paired with something you build, so what you understand in class becomes something you can demo, debug and explain in an interview.",
    ],
    items: [
      {
        title: "Learn It",
        body: "Understand Generative AI, LLMs, prompt engineering, AI agents, tool calling, RAG, memory and multi-agent systems.",
        icon: "layers",
      },
      {
        title: "Build It",
        body: "Apply your knowledge through AI assistants, tool-calling agents, RAG pipelines and automation projects.",
        icon: "cube",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Learn Agentic AI at Techcadd, Mohali",
    intro:
      "Choosing the right institute matters when learning an emerging technology such as Agentic AI. Here's what makes Techcadd a practical choice for Agentic AI training in Mohali.",
    items: [
      {
        title: "Practical, Industry-Aware Training",
        body: "Trainers demonstrate how AI technologies can be used to create useful applications and automated workflows, not just explain terminology.",
        icon: "terminal",
      },
      {
        title: "Project-Driven Teaching Style",
        body: "The emphasis is on creating practical AI solutions rather than learning concepts only through theory.",
        icon: "cube",
      },
      {
        title: "Personal Attention",
        body: "Manageable batches let students ask questions and get guidance when they hit difficulties with AI tools, coding, APIs or project implementation.",
        icon: "users",
      },
      {
        title: "Placement Support",
        body: "Resume guidance, interview preparation, mock interviews and placement assistance to help students become more career-ready.",
        icon: "briefcase",
      },
      {
        title: "Flexible for Students & Professionals",
        body: "Batch options accommodate college students and working professionals learning AI alongside existing responsibilities.",
        icon: "clock",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore other career-focused programmes at Techcadd and build practical skills for today's technology-driven industry.",
    items: [
      {
        title: "9-Month MERN Stack Diploma",
        body: "HTML, CSS and JavaScript through to React, Node, Express and MongoDB — another 9-month, job-oriented diploma.",
        href: "/courses/after12th/mern-stack-diploma-program",
      },
      {
        title: "9-Month Flutter App Development Diploma",
        body: "Build cross-platform mobile apps with Dart, Flutter, APIs and Firebase — another 9-month, job-oriented diploma.",
        href: "/courses/after12th/flutter-app-development-diploma-program",
      },
      {
        title: "Data Science Course",
        body: "Learn to work with data, build models and turn raw numbers into decisions employers care about.",
        href: "/courses/after12th/data-science",
      },
      {
        title: "9-Month Cloud Computing Diploma",
        body: "Cloud infrastructure, virtualization, networking, storage, security and deployment — another 9-month, job-oriented diploma.",
        href: "/courses/after12th/cloud-computing-diploma",
      },
      {
        title: "Cyber Security Course",
        body: "Ethical hacking, network defence and security fundamentals for a career protecting modern systems.",
        href: "/courses/after12th/cyber-security",
      },
    ],
  },

  faqs: [
    {
      q: "Is prior AI experience required to join the Agentic AI Diploma in Mohali?",
      a: "No. The program is designed for beginners as well as learners with basic programming or AI knowledge. It starts with AI and Generative AI fundamentals before progressing toward AI agents and advanced workflows.",
    },
    {
      q: "Who can enroll in the Agentic AI Diploma Program?",
      a: "12th pass students, BCA/B.Tech/BSc-IT/MCA students, graduates, developers, job seekers, working professionals and AI enthusiasts can enroll.",
    },
    {
      q: "What will I learn in an Agentic AI Diploma?",
      a: "You can learn AI fundamentals, Generative AI, LLMs, prompt engineering, AI agents, agent workflows, tool calling, APIs, RAG, vector databases, memory, multi-agent systems and AI automation.",
    },
    {
      q: "Is the Agentic AI course suitable for beginners?",
      a: "Yes. The program begins with fundamental AI concepts and gradually introduces Generative AI, LLMs, AI agents, workflows, APIs, RAG and practical AI application development.",
    },
    {
      q: "Does Techcadd provide practical Agentic AI training in Mohali?",
      a: "Yes. The program focuses on practical assignments, AI workflows, application development, automation activities and project-based learning.",
    },
    {
      q: "Will I get a certificate after completing the course?",
      a: "Yes, students who successfully complete the program receive a course completion certificate from Techcadd, subject to the institute's certification requirements.",
    },
    {
      q: "Does Techcadd provide placement assistance?",
      a: "Yes. Techcadd provides placement-oriented support including resume guidance, interview preparation, mock interviews and placement assistance.",
    },
    {
      q: "What jobs can I pursue after learning Agentic AI?",
      a: "Depending on your existing skills, practical experience and specialisation, possible career paths can include AI Application Developer, Generative AI Developer, AI Automation Specialist, AI Engineer, AI Developer and AI Solutions roles.",
    },
    {
      q: "Are flexible batch timings available?",
      a: "Yes. Flexible batch options are designed to accommodate college students and working professionals.",
    },
    {
      q: "What is the difference between Generative AI and Agentic AI?",
      a: "Generative AI primarily focuses on creating content such as text, images or code, while Agentic AI focuses on systems that can use AI models, tools, information and workflows to perform multi-step tasks toward a goal.",
    },
    {
      q: "Can BCA and B.Tech students join this program?",
      a: "Yes. BCA, B.Tech, BSc-IT, MCA and students from other relevant backgrounds can join the program to develop practical AI and automation skills.",
    },
    {
      q: "Where can I learn Agentic AI in Mohali?",
      a: "Techcadd provides Agentic AI Diploma training in Mohali, with practical learning, mentor support, flexible batches, project-based training and placement-oriented guidance.",
    },
  ],

  enquiry: {
    title: "Start Your Agentic AI Career Journey in Mohali",
    paragraphs: [
      "Don't just use AI tools — learn how to build intelligent AI-powered systems and agents. Learn Agentic AI through structured training, practical projects, AI workflows, mentor guidance and career-focused preparation at Techcadd, Mohali.",
      "Not ready to fill a form yet? Leave your number and a Techcadd counsellor will call you back to answer your questions — no pressure, no obligation.",
    ],
  },

  fit: {
    title: "Not Sure If the Agentic AI Diploma Is the Right Fit?",
    paragraphs: [
      "Choosing a technology career after 12th — or a career switch later on — can feel confusing. If you're interested in Artificial Intelligence, automation or emerging technologies, this diploma can give you the practical foundation to get started.",
      "You don't need advanced AI experience. The 9-Month Agentic AI Diploma Program in Mohali starts with the basics and gradually takes you into AI agents, RAG, automation and real-world AI projects.",
    ],
    ctaTitle: "Take the Next Step",
    points: [
      "12th pass, graduate or working professional? You can start.",
      "No advanced AI experience? No problem.",
      "Want practical, job-oriented skills? Build them through hands-on projects.",
      "Want career guidance? Get resume, interview and placement support.",
    ],
  },
};

const digitalMarketingDiploma: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Where it takes you" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "9-Month Job-Oriented Diploma",
    title: "Best After 12th 9-Month Digital Marketing Diploma Program in Mohali",
    paragraphs: [
      "Looking for the best Digital Marketing Diploma Program in Mohali? Techcadd offers a practical, career-focused, 9-month digital marketing diploma designed for students, graduates, job seekers, working professionals, business owners, freelancers and beginners.",
      "The diploma covers the major areas of online marketing — SEO, social media marketing, Google Ads, pay-per-click advertising, content marketing, email marketing, Google Analytics, online reputation, lead generation and digital marketing strategy.",
    ],
  },

  program: {
    title: "Digital Marketing Diploma Program Course in Mohali",
    paragraphs: [
      "At Techcadd, training goes beyond theory. Students learn through practical assignments, campaign planning, keyword research, website optimization, social media activities, advertising exercises and real-world marketing projects.",
      "Whether you're a complete beginner, a college student, a business owner, or someone planning to switch careers, the program is structured to help you develop practical digital marketing skills.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "9 Months" },
      { label: "Mode", value: "Classroom & Online" },
      { label: "Eligibility", value: "12th Pass / Graduate, Any Stream" },
      { label: "Level", value: "Beginner to Advanced" },
      { label: "Focus", value: "SEO, Google Ads, Social Media, Content & Analytics" },
      { label: "Project", value: "Digital Marketing Strategy Capstone" },
      { label: "Includes", value: "Practical Training + Placement Support" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "The Digital Marketing Diploma Program in Mohali covers the major areas of online marketing, including Search Engine Optimization (SEO), Social Media Marketing, Google Ads, Pay-Per-Click advertising, content marketing, email marketing, Google Analytics, online reputation, lead generation and digital marketing strategy.",
      "Training goes beyond theory. Students learn through practical assignments, campaign planning, keyword research, website optimization, social media activities, advertising exercises and real-world marketing projects.",
      "If you're searching for a Digital Marketing course in Mohali that combines practical learning with career-focused training, this diploma program is designed for you.",
    ],
  },

  learn: {
    title: "What You’ll Learn",
    intro: "The program covers the major areas required to understand modern digital marketing.",
    items: [
      {
        title: "Introduction to Digital Marketing",
        body: "Understand what digital marketing is, traditional vs digital marketing, digital channels, the customer journey and the marketing funnel.",
      },
      {
        title: "Website Fundamentals",
        body: "Learn website structure, landing pages, user experience basics, conversion-focused pages and website optimization.",
      },
      {
        title: "Search Engine Optimization (SEO)",
        body: "Keyword research, on-page SEO, title tags, meta descriptions, internal linking, off-page SEO, backlinks, technical SEO basics and SEO audits.",
      },
      {
        title: "Local SEO",
        body: "Local search, Google Business Profile, local keywords, business information consistency, local citations and customer reviews.",
      },
      {
        title: "Google Search Console",
        body: "Search queries, website indexing, clicks, impressions, CTR, indexing issues and search visibility.",
      },
      {
        title: "Google Analytics",
        body: "Traffic sources, users, sessions, engagement, conversions, reports and performance analysis.",
      },
      {
        title: "Social Media Marketing",
        body: "Platform research, content strategy, content calendars, organic social media, engagement and social media analytics.",
      },
      {
        title: "Facebook & Instagram Marketing",
        body: "Page setup, business profiles, content planning, reels and posts, Meta advertising basics and audience targeting.",
      },
      {
        title: "Google Ads / PPC",
        body: "Search campaigns, keywords, match types, ad groups, ad copy, landing pages, bidding concepts, Quality Score and performance analysis.",
      },
      {
        title: "Display Advertising",
        body: "Display campaigns, banner advertising, audience targeting, remarketing concepts and ad creatives.",
      },
      {
        title: "Content Marketing & Keyword Research",
        body: "Content strategy, blog and website content, content calendars, and identifying short-tail and long-tail keywords by search intent.",
      },
      {
        title: "Email Marketing & Lead Generation",
        body: "Email campaigns, subscriber lists, subject lines, basic automation, lead generation funnels, landing pages and lead forms.",
      },
      {
        title: "Online Reputation & Digital Marketing Analytics",
        body: "Reviews, brand mentions, reputation monitoring, and measuring performance through CTR, conversion rate, CPC, CPL and ROAS.",
      },
      {
        title: "Competitor Analysis & Strategy",
        body: "Competitor research, keyword and content comparison, and combining SEO, social, paid, email and content into one strategy.",
      },
      {
        title: "Freelancing & Real-World Projects",
        body: "Finding clients, proposals, reporting and client management, applied through complete SEO, Google Ads, social media and strategy projects.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The 9-month Digital Marketing Diploma follows a structured, beginner-friendly progression — from digital marketing and website fundamentals through SEO, social media, paid advertising and analytics, to a complete strategy capstone.",
    modules: [
      {
        title: "Digital Marketing & Website Fundamentals",
        points: ["Digital marketing channels and customer journey", "Marketing funnel and strategy basics", "Website structure and conversion-focused pages"],
      },
      {
        title: "SEO & Local SEO",
        points: ["Keyword research and on-page SEO", "Off-page SEO and backlinks", "Technical SEO, local SEO and Google Business Profile"],
      },
      {
        title: "Google Search Console & Analytics",
        points: ["Search queries, indexing and CTR", "Traffic sources, sessions and engagement", "Reports and performance analysis"],
      },
      {
        title: "Social Media & Meta Marketing",
        points: ["Content strategy and calendars", "Facebook and Instagram page setup", "Meta advertising basics and audience targeting"],
      },
      {
        title: "Google Ads, PPC & Display Advertising",
        points: ["Search campaigns and keywords", "Ad copy, bidding and Quality Score", "Display and remarketing basics"],
      },
      {
        title: "Content, Email Marketing & Lead Generation",
        points: ["Content calendars and search-focused content", "Email campaigns and subscriber lists", "Lead generation funnels and landing pages"],
      },
      {
        title: "Reputation, Competitor Analysis & Strategy",
        points: ["Online reputation and review response", "Competitor and keyword analysis", "Combining channels into one strategy"],
      },
      {
        title: "Freelancing Basics & Capstone Project",
        points: ["Finding clients and creating proposals", "Reporting and client communication", "A complete digital marketing strategy project"],
      },
    ],
    practical: {
      title: "Practical Training",
      body: "Throughout the 9 months, students practice keyword research, website optimization, SEO audits, content planning, social media strategy, ad campaign planning, analytics reporting and lead generation.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the diploma, students will have a solid, practical foundation across SEO, social media, Google Ads, content, email marketing and analytics — along with project experience to support entry into digital marketing roles.",
    },
  },

  tools: {
    title: "Tools",
    items: [
      { name: "Google Search Console", body: "Monitor website search performance, indexing and visibility." },
      { name: "Google Analytics", body: "Measure website traffic, engagement and conversions." },
      { name: "Google Ads", body: "Plan and run search, display and remarketing campaigns." },
      { name: "Google Business Profile", body: "Manage local search presence and customer reviews." },
      { name: "Meta Business Suite", body: "Plan and publish Facebook and Instagram content and ads." },
      { name: "Canva", body: "Design social media creatives and campaign visuals." },
      { name: "Email Marketing Platforms", body: "Build and send email campaigns to subscriber lists." },
    ],
  },

  who: {
    title: "Who Can Do This Course",
    items: [
      {
        title: "12th Pass Students",
        body: "Students from Science, Commerce or Arts backgrounds can start learning digital marketing step by step, without an advanced technical background.",
        icon: "users",
      },
      {
        title: "College Students — BCA, BBA, B.Com, MBA, MCA",
        body: "Supplement academic marketing theory with practical SEO, social media, paid advertising, analytics and lead generation skills.",
        icon: "certificate",
      },
      {
        title: "Graduates Building a Career",
        body: "Explore career paths such as SEO Executive, Digital Marketing Executive, Social Media Executive and PPC Executive.",
        icon: "rocket",
      },
      {
        title: "Job Seekers",
        body: "Add a career-oriented, in-demand skill to your resume through campaign-based, practical assignments.",
        icon: "briefcase",
      },
      {
        title: "Working Professionals",
        body: "Upgrade your existing skills or explore marketing and online business opportunities with flexible batch timings.",
        icon: "terminal",
      },
      {
        title: "Business Owners & Freelancers",
        body: "Understand SEO, Google Business Profile, social media, paid advertising and lead generation — and build freelance-ready skills.",
        icon: "sparkles",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Year",
    items: [
      {
        title: "Practical, Project-Based Learning",
        body: "Keyword research, website optimization, SEO audits, content planning, social media strategy, ad campaign planning and analytics reporting — not just definitions.",
        icon: "layers",
      },
      {
        title: "Beginner-to-Professional Structure",
        body: "A logical progression — digital marketing fundamentals first, then SEO, social media, paid advertising, content, analytics and strategy.",
        icon: "terminal",
      },
      {
        title: "Industry-Relevant Skills",
        body: "Practical areas of online marketing used by businesses to attract visitors, generate leads, build brand awareness and reach customers.",
        icon: "chart",
      },
      {
        title: "Interview & Career Support",
        body: "Resume guidance, project discussions, interview preparation and career guidance to help students prepare for digital marketing roles.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Marketing Runs on Data and Channels Now.",
    paragraphs: [
      "Digital marketing is much more than posting content on social media — it needs an understanding of search engines, websites, content, advertising, analytics, customer behaviour, lead generation and campaign performance.",
      "This 9-month diploma starts from digital marketing fundamentals and moves gradually into SEO, social media, paid advertising, content, email marketing and strategy — no prior marketing experience needed to begin.",
    ],
    listTitle: "Start Before the Industry Moves Further",
    items: [
      {
        title: "Channels work together now",
        body: "Modern marketing combines SEO, social, paid ads, content and email into one strategy, not isolated tactics.",
      },
      {
        title: "Practical skills stand out",
        body: "Hands-on campaign planning and reporting builds a stronger profile than watching tutorials alone.",
      },
      {
        title: "Build a real portfolio",
        body: "Ship SEO audits, ad campaign plans and a complete strategy project you can walk an interviewer through.",
      },
      {
        title: "Learn locally in Mohali",
        body: "Accessible to learners from Mohali, Chandigarh, Kharar, Zirakpur and nearby areas without needing to relocate.",
      },
    ],
  },

  advisor: {
    title: "Talk to a course advisor",
    body: "Ten minutes on the phone settles more than an hour of reading — eligibility, batch timings, fees, and whether this programme fits your degree, your business or the job you already have.",
    cta: "Book a free demo class",
  },

  certificate: {
    title: "What You Leave the Diploma With",
    intro:
      "Complete the course with a portfolio of real marketing campaigns and course-completion certification — exact certification and placement details should be confirmed with the Techcadd Mohali centre at the time of enrolment.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "Confirm current certification details with the Techcadd Mohali centre.",
      },
      {
        icon: "layers",
        title: "Portfolio of Campaigns",
        body: "SEO audits, ad campaigns and a strategy project you can show in any interview.",
      },
      {
        icon: "briefcase",
        title: "Interview Preparation",
        body: "Resume guidance, project discussions and interview preparation.",
      },
      {
        icon: "target",
        title: "Placement Support",
        body: "Career guidance and placement assistance — confirm exact services with the Mohali centre.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Takes You",
    intro:
      "The 9-Month Digital Marketing Diploma gives you a practical foundation to move from a beginner toward entry-level opportunities in digital marketing.",
    listTitle: "From Beginner to Campaign-Ready",
    steps: [
      {
        title: "Start with the fundamentals",
        body: "Build your foundation in digital marketing channels, websites and the marketing funnel.",
      },
      {
        title: "Learn SEO and content",
        body: "Get hands-on with keyword research, on-page and off-page SEO, and content strategy.",
      },
      {
        title: "Run paid and social campaigns",
        body: "Plan Google Ads, social media and email campaigns with real targeting and budgets.",
      },
      {
        title: "Ship a strategy project",
        body: "Combine SEO, social, paid, content and email into one complete, portfolio-ready strategy.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Ship",
    items: [
      {
        title: "Complete SEO Project",
        body: "Run keyword research, on-page optimization and an SEO audit for a real or sample website.",
      },
      {
        title: "Local SEO Project",
        body: "Optimize a Google Business Profile and build local citations for a location-based business.",
      },
      {
        title: "Google Ads Campaign Plan",
        body: "Plan a search campaign — keywords, ad groups, ad copy, targeting and a budget.",
      },
      {
        title: "Social Media Marketing Plan",
        body: "Build a content calendar and campaign plan for Facebook and Instagram.",
      },
      {
        title: "Content Marketing Plan",
        body: "Plan search-focused, audience-focused content with a clear call-to-action strategy.",
      },
      {
        title: "Lead Generation Campaign",
        body: "Design a landing page and lead form flow for a paid or organic lead-generation campaign.",
      },
      {
        title: "Final Digital Marketing Strategy",
        body: "Combine SEO, content, social, paid advertising, email and analytics into one complete strategy project.",
      },
    ],
  },

  approach: {
    title: "Learn It. Plan It. Launch It.",
    paragraphs: [
      "Digital marketing is best learned by running real campaigns. Over nine months, you move from fundamentals to complete, launch-ready marketing plans.",
      "Every channel is paired with a practical exercise, so what you understand in class becomes a campaign you can plan, execute and report on.",
    ],
    items: [
      {
        title: "Learn It",
        body: "Understand SEO, social media, Google Ads, content marketing, email marketing, analytics and lead generation.",
        icon: "layers",
      },
      {
        title: "Build It",
        body: "Apply your knowledge through keyword research, campaign plans, content calendars and a full strategy project.",
        icon: "chart",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Learn Digital Marketing at Techcadd, Mohali",
    intro:
      "Choosing the right institute matters when learning a skill like digital marketing. Here's what makes Techcadd a practical choice for Digital Marketing training in Mohali.",
    items: [
      {
        title: "Practical Digital Marketing Training",
        body: "Learning through practical activities — marketing tasks, assignments, optimization exercises and campaign planning — rather than theory alone.",
        icon: "terminal",
      },
      {
        title: "Project-Based Learning",
        body: "Projects across SEO, social media, content, advertising, analytics and lead generation help you apply your knowledge.",
        icon: "chart",
      },
      {
        title: "Small-Batch Personal Attention",
        body: "A manageable batch environment makes it easier to ask questions, discuss campaigns and get individual guidance.",
        icon: "users",
      },
      {
        title: "Career-Focused Training",
        body: "Help understanding how to present your digital marketing skills professionally, not just complete a course.",
        icon: "briefcase",
      },
      {
        title: "Flexible Learning",
        body: "The course structure accommodates students, graduates, freelancers, business owners and working professionals.",
        icon: "clock",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore other career-focused programmes at Techcadd and build practical skills for today's technology-driven industry.",
    items: [
      {
        title: "9-Month MERN Stack Diploma",
        body: "HTML, CSS and JavaScript through to React, Node, Express and MongoDB — another 9-month, job-oriented diploma.",
        href: "/courses/after12th/mern-stack-diploma-program",
      },
      {
        title: "9-Month Agentic AI Diploma",
        body: "Generative AI, LLMs, AI agents, RAG and automation — another 9-month, job-oriented diploma.",
        href: "/courses/after12th/agentic-ai-diploma-program",
      },
      {
        title: "9-Month Cloud Computing Diploma",
        body: "Cloud infrastructure, virtualization, networking, storage, security and deployment.",
        href: "/courses/after12th/cloud-computing-diploma",
      },
      {
        title: "9-Month Flutter App Development Diploma",
        body: "Build cross-platform mobile apps with Dart, Flutter, APIs and Firebase.",
        href: "/courses/after12th/flutter-app-development-diploma-program",
      },
      {
        title: "Web Designing Course",
        body: "Build modern, responsive websites and learn the fundamentals every marketer and developer needs.",
        href: "/courses/after12th/web-designing",
      },
    ],
  },

  faqs: [
    {
      q: "Is prior marketing experience required to join the Digital Marketing Diploma Program in Mohali?",
      a: "No. Beginners can join the program. Digital marketing fundamentals are introduced first, followed by practical modules such as SEO, social media, paid advertising, content marketing and analytics.",
    },
    {
      q: "Who can join the Digital Marketing Diploma Program?",
      a: "12th pass students, college students, graduates, job seekers, working professionals, freelancers, business owners and beginners interested in online marketing can join.",
    },
    {
      q: "Can I learn digital marketing after 12th?",
      a: "Yes. Students who have completed 12th can start learning digital marketing. The program begins with basic concepts and gradually introduces practical marketing skills.",
    },
    {
      q: "Is coding required for digital marketing?",
      a: "Advanced programming knowledge is generally not required for most digital marketing activities. The program focuses primarily on marketing, SEO, advertising, content, social media, analytics and lead generation.",
    },
    {
      q: "What will I learn in the Digital Marketing Diploma Program?",
      a: "The program covers SEO, local SEO, Google Business Profile, Google Ads, social media marketing, content marketing, email marketing, analytics, lead generation, competitor research, online reputation and digital marketing strategy.",
    },
    {
      q: "Does the course include SEO?",
      a: "Yes. SEO is a major part of the program and can include keyword research, on-page SEO, off-page SEO, technical SEO basics, local SEO, content optimization, competitor analysis and SEO audits.",
    },
    {
      q: "Does the program include Google Ads?",
      a: "Yes. The program covers the fundamentals of Google Ads and PPC advertising, including keywords, ad groups, campaign structure, ad copy, targeting, bidding concepts and performance analysis.",
    },
    {
      q: "Does the course include social media marketing?",
      a: "Yes. Students learn social media strategy, content planning, audience engagement, page optimization, social media campaigns and advertising fundamentals.",
    },
    {
      q: "Will I learn Google Analytics?",
      a: "Yes. Students are introduced to website analytics and marketing performance measurement, including traffic sources, engagement, conversions and important marketing metrics.",
    },
    {
      q: "Does the course include practical projects?",
      a: "Yes. Practical assignments and projects can include SEO audits, local SEO, content planning, social media strategy, advertising campaign planning, lead generation and a complete digital marketing strategy project.",
    },
    {
      q: "Can I become a digital marketing freelancer after completing the course?",
      a: "The course can provide foundational skills for freelancing, but successful freelancing also requires practical experience, a strong portfolio, client communication and continuous learning.",
    },
    {
      q: "Can business owners join this course?",
      a: "Yes. Business owners can learn how SEO, social media, Google Business Profile, paid advertising, content marketing and lead generation can support their online presence.",
    },
    {
      q: "Does Techcadd provide placement assistance?",
      a: "The program is designed with career support in mind, including resume guidance, interview preparation and career guidance. Exact placement services should be confirmed with the Techcadd Mohali centre.",
    },
    {
      q: "Are flexible batch timings available?",
      a: "Flexible batch options may be available for students and working professionals. Exact batch timings should be confirmed with the Techcadd Mohali centre.",
    },
    {
      q: "Where is the Digital Marketing Diploma Program available?",
      a: "The program is focused on Digital Marketing Diploma training in Mohali, Punjab. The exact Techcadd centre address and current batch details should be confirmed directly with the institute.",
    },
  ],

  enquiry: {
    title: "Start Your Digital Marketing Career in Mohali",
    paragraphs: [
      "Stop relying on random tutorials and learn digital marketing through a structured, practical approach — SEO, Google Ads, social media marketing, content marketing, analytics, lead generation and digital marketing strategy at Techcadd, Mohali.",
      "Not ready to fill a form yet? Leave your contact details and a Techcadd counsellor will call you back to discuss the course, curriculum, batches and career options.",
    ],
  },

  fit: {
    title: "Not Sure If the Digital Marketing Diploma Is the Right Fit?",
    paragraphs: [
      "Choosing a career after 12th — or a career switch, or a way to grow your own business online — can feel confusing. If you're interested in SEO, social media, advertising or content, this diploma can give you the practical foundation to get started.",
      "You don't need prior marketing experience. The 9-Month Digital Marketing Diploma Program in Mohali starts with the basics and gradually takes you into SEO, Google Ads, social media, content and a full strategy project.",
    ],
    ctaTitle: "Take the Next Step",
    points: [
      "12th pass, graduate, business owner or working professional? You can start.",
      "No prior marketing experience? No problem.",
      "Want practical, job-oriented skills? Build them through real campaign work.",
      "Want career guidance? Get resume, interview and placement support.",
    ],
  },
};

const cyberSecurityDiploma: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Where it takes you" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "9-Month Job-Oriented Diploma",
    title: "Best After 12th 9-Month Cyber Security Diploma Program in Mohali",
    paragraphs: [
      "The Cyber Security Diploma Program in Mohali is designed to help students and professionals build practical skills to protect computers, networks, applications, websites and digital data from cyber threats.",
      "The program covers essential cybersecurity concepts along with hands-on learning in network security, ethical hacking, vulnerability assessment, penetration testing, security monitoring and incident response.",
    ],
  },

  program: {
    title: "Cyber Security Diploma Program Course in Mohali",
    paragraphs: [
      "At Techcadd, Mohali, students learn through practical exercises, real-world scenarios, cybersecurity tools and project-based training. The course is suitable for beginners as well as learners who want to build a professional career in the growing field of Cyber Security.",
      "From understanding common cyber attacks to identifying vulnerabilities and implementing security measures, this diploma program helps learners develop industry-relevant cybersecurity knowledge and practical capabilities.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "9 Months" },
      { label: "Mode", value: "Classroom & Online" },
      { label: "Eligibility", value: "12th Pass / Graduate, Any Stream" },
      { label: "Level", value: "Beginner-Friendly" },
      { label: "Focus", value: "Networking, Ethical Hacking, VAPT & Incident Response" },
      { label: "Project", value: "Security Assessment & Incident Response Capstone" },
      { label: "Includes", value: "Practical Training + Placement Support" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "The Cyber Security Diploma Program in Mohali is designed to help students and professionals build practical skills to protect computers, networks, applications, websites and digital data from cyber threats. The program covers essential concepts of cybersecurity along with hands-on learning in network security, ethical hacking, vulnerability assessment, penetration testing, security monitoring and incident response.",
      "At Techcadd, Mohali, students learn through practical exercises, real-world scenarios, cybersecurity tools and project-based training. The course is suitable for beginners as well as learners who want to build a professional career in the growing field of Cyber Security.",
      "No advanced cybersecurity background is required to start. Basic computer and networking knowledge can be helpful but is not mandatory for beginners.",
    ],
  },

  learn: {
    title: "What You’ll Learn",
    intro: "The program is structured to take learners from cybersecurity fundamentals to practical, hands-on security skills.",
    items: [
      {
        title: "Cyber Security Fundamentals",
        body: "Introduction to cyber security, cyber threats and vulnerabilities, the CIA triad, types of cyber attacks, and security best practices.",
      },
      {
        title: "Networking Fundamentals",
        body: "Networking concepts, IP addressing, TCP/IP, DNS, HTTP/HTTPS, ports and protocols, routers, switches, and network security concepts.",
      },
      {
        title: "Linux & System Security",
        body: "Linux fundamentals, command-line operations, users and permissions, file systems, processes and services, and system hardening.",
      },
      {
        title: "Ethical Hacking",
        body: "Reconnaissance, information gathering, scanning concepts, enumeration, vulnerability identification and ethical hacking methodology.",
      },
      {
        title: "Vulnerability Assessment & Penetration Testing",
        body: "Vulnerability assessment concepts, security scanning, penetration testing methodology, risk assessment and reporting vulnerabilities.",
      },
      {
        title: "Web Application Security",
        body: "Web security fundamentals, authentication security, session management, common web vulnerabilities and OWASP concepts.",
      },
      {
        title: "Network Security",
        body: "Firewalls, VPN concepts, network monitoring, intrusion detection and prevention concepts, and secure network architecture.",
      },
      {
        title: "Security Tools",
        body: "Practical exposure to commonly used cybersecurity and security-testing tools such as Kali Linux, Nmap, Wireshark, Burp Suite, Metasploit and OWASP ZAP.",
      },
      {
        title: "Incident Response",
        body: "Understanding security incidents, incident detection and analysis, response procedures, containment, recovery and reporting.",
      },
      {
        title: "Digital Forensics Fundamentals",
        body: "Introduction to digital forensics, evidence concepts, file and system analysis, and the forensic investigation process.",
      },
      {
        title: "Cybersecurity Projects",
        body: "Apply your learning through practical projects involving network security analysis, vulnerability assessment, web security testing and incident response scenarios.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The 9-month Cyber Security Diploma follows a structured, beginner-friendly progression — from cybersecurity and networking fundamentals through Linux, ethical hacking, VAPT and web/network security, to incident response and digital forensics.",
    modules: [
      {
        title: "Cyber Security & Networking Fundamentals",
        points: ["CIA triad and types of cyber attacks", "IP addressing, TCP/IP and DNS", "Ports, protocols and network security concepts"],
      },
      {
        title: "Linux & System Security",
        points: ["Linux command-line, users and permissions", "File systems, processes and services", "System hardening and Linux security basics"],
      },
      {
        title: "Ethical Hacking",
        points: ["Reconnaissance and information gathering", "Scanning and enumeration", "Vulnerability identification and hacking methodology"],
      },
      {
        title: "Vulnerability Assessment & Penetration Testing",
        points: ["Security scanning and identifying weaknesses", "Penetration testing methodology and risk assessment", "Reporting vulnerabilities and remediation concepts"],
      },
      {
        title: "Web Application Security",
        points: ["Authentication security and session management", "Common web vulnerabilities", "OWASP concepts and secure practices"],
      },
      {
        title: "Network Security",
        points: ["Firewalls and VPN concepts", "Network monitoring", "Intrusion detection and prevention concepts"],
      },
      {
        title: "Incident Response & Digital Forensics",
        points: ["Incident detection and analysis", "Containment, recovery and reporting", "Digital forensics and investigation fundamentals"],
      },
      {
        title: "Cybersecurity Capstone Projects",
        points: ["Network security analysis", "Vulnerability assessment and web security testing", "Incident response scenarios"],
      },
    ],
    practical: {
      title: "Practical Training",
      body: "Throughout the 9 months, students work on practical exercises, real-world scenarios, security tools and project-based training rather than theory alone.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the diploma, students will have a practical foundation across networking, Linux, ethical hacking, vulnerability assessment, web and network security, and incident response — along with project experience to support entry into cybersecurity roles.",
    },
  },

  tools: {
    title: "Tools",
    items: [
      { name: "Kali Linux", body: "A security-focused Linux distribution used for testing and analysis." },
      { name: "Nmap", body: "Scan networks and identify hosts, ports and services." },
      { name: "Wireshark", body: "Capture and analyse network traffic." },
      { name: "Burp Suite", body: "Test and analyse web application security." },
      { name: "Metasploit", body: "Practice exploitation and penetration testing concepts in a controlled lab." },
      { name: "OWASP ZAP", body: "Scan web applications for common security vulnerabilities." },
    ],
  },

  who: {
    title: "Who Can Do This Course",
    items: [
      {
        title: "12th Pass Students",
        body: "Students interested in Cyber Security can begin without an advanced technical background — basic computer knowledge helps but isn't mandatory.",
        icon: "users",
      },
      {
        title: "College Students & Graduates",
        body: "BCA, B.Tech, BSc-IT, BSc Computer Science, MCA and other computer-related students and graduates can build practical security skills.",
        icon: "certificate",
      },
      {
        title: "IT & Networking Professionals",
        body: "IT professionals, networking students and system/network administrators can move into cybersecurity or deepen their security knowledge.",
        icon: "terminal",
      },
      {
        title: "Freshers & Job Seekers",
        body: "Build a career-focused, in-demand skill set for cybersecurity opportunities as a fresher.",
        icon: "briefcase",
      },
      {
        title: "Web Developers",
        body: "Understand application security concepts and common vulnerabilities from a security-first perspective.",
        icon: "code",
      },
      {
        title: "Aspiring Ethical Hackers",
        body: "Learn reconnaissance, scanning, vulnerability identification and ethical hacking methodology, step by step.",
        icon: "shield",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Year",
    items: [
      {
        title: "Practical, Scenario-Based Learning",
        body: "Cybersecurity fundamentals, networking, ethical hacking, vulnerability assessment, web and network security through hands-on exercises and real-world scenarios.",
        icon: "layers",
      },
      {
        title: "Industry-Relevant Security Skills",
        body: "Skills in areas companies actively hire for — identifying vulnerabilities, securing networks, protecting applications and responding to security incidents.",
        icon: "shield",
      },
      {
        title: "Hands-On Tools & Techniques",
        body: "Practical exposure to Kali Linux, Nmap, Wireshark, Burp Suite, Metasploit and OWASP ZAP, not just their names on a slide.",
        icon: "terminal",
      },
      {
        title: "Interview & Career Support",
        body: "Interview-oriented preparation, technical discussions, resume guidance and career support alongside the technical curriculum.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Every Business Is a Target Now.",
    paragraphs: [
      "Cyber threats are increasing as businesses, organizations and individuals depend more on digital systems. Companies need professionals who understand how to identify vulnerabilities, secure networks, protect applications and respond to security incidents.",
      "This 9-month diploma starts from cybersecurity and networking fundamentals and moves gradually into ethical hacking, VAPT, web/network security and incident response — no advanced cybersecurity background needed to begin.",
    ],
    listTitle: "Start Before the Industry Moves Further",
    items: [
      {
        title: "Threats keep growing",
        body: "More systems, more data and more attack surface means more demand for people who can secure them.",
      },
      {
        title: "Practical skills stand out",
        body: "Hands-on lab work with real security tools builds a stronger profile than reading about attacks alone.",
      },
      {
        title: "Build a real portfolio",
        body: "Ship vulnerability assessments and incident-response scenarios you can walk an interviewer through.",
      },
      {
        title: "Learn locally in Mohali",
        body: "Accessible to learners from Mohali, Chandigarh, Kharar, Zirakpur and nearby areas without needing to relocate.",
      },
    ],
  },

  advisor: {
    title: "Talk to a course advisor",
    body: "Ten minutes on the phone settles more than an hour of reading — eligibility, batch timings, fees, and whether this programme fits your degree or the job you already have.",
    cta: "Book a free demo class",
  },

  certificate: {
    title: "What You Leave the Diploma With",
    intro:
      "Complete the course with a portfolio of practical security work and course-completion certification — exact certification and placement details should be confirmed with the Techcadd Mohali centre at the time of enrolment.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "Confirm current certification details with the Techcadd Mohali centre.",
      },
      {
        icon: "layers",
        title: "Portfolio of Security Work",
        body: "Vulnerability assessments and incident-response scenarios you can show in any interview.",
      },
      {
        icon: "briefcase",
        title: "Interview Preparation",
        body: "Technical discussions, resume guidance and interview-oriented preparation.",
      },
      {
        icon: "target",
        title: "Placement Support",
        body: "Career guidance and placement assistance — confirm exact services with the Mohali centre.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Takes You",
    intro:
      "The 9-Month Cyber Security Diploma gives you a practical foundation to move from a beginner toward entry-level opportunities in cybersecurity.",
    listTitle: "From Beginner to Security-Ready",
    steps: [
      {
        title: "Start with the fundamentals",
        body: "Build your foundation in cybersecurity concepts, networking and Linux.",
      },
      {
        title: "Learn ethical hacking",
        body: "Get hands-on with reconnaissance, scanning, enumeration and vulnerability identification.",
      },
      {
        title: "Assess and secure",
        body: "Run vulnerability assessments, penetration tests and secure web and network environments.",
      },
      {
        title: "Respond to incidents",
        body: "Practice incident detection, containment, recovery and digital forensics fundamentals.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Ship",
    items: [
      {
        title: "Network Security Analysis",
        body: "Map a network, identify hosts and services, and assess configuration weaknesses.",
      },
      {
        title: "Vulnerability Assessment",
        body: "Run a security scan against a lab environment and document findings with remediation steps.",
      },
      {
        title: "Web Security Testing",
        body: "Test a web application for common OWASP vulnerabilities using Burp Suite and OWASP ZAP.",
      },
      {
        title: "Security Monitoring Exercise",
        body: "Set up basic monitoring and review logs and traffic for suspicious activity.",
      },
      {
        title: "Cyber Attack Analysis",
        body: "Analyse a simulated attack scenario and trace how it unfolded step by step.",
      },
      {
        title: "Final Incident Response Capstone",
        body: "Bring detection, analysis, containment, recovery and reporting together in one complete incident-response scenario.",
      },
    ],
  },

  approach: {
    title: "Learn It. Test It. Defend It.",
    paragraphs: [
      "Cybersecurity is best learned in a lab, not from a slide. Over nine months, you move from fundamentals to hands-on testing and defence.",
      "Every concept is paired with a practical exercise, so what you understand in class becomes something you can demonstrate, document and explain in an interview.",
    ],
    items: [
      {
        title: "Learn It",
        body: "Understand cybersecurity fundamentals, networking, Linux, ethical hacking, VAPT, web/network security and incident response.",
        icon: "layers",
      },
      {
        title: "Build It",
        body: "Apply your knowledge through lab exercises, vulnerability assessments, security testing and incident-response scenarios.",
        icon: "shield",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Choose Techcadd for Cyber Security Training in Mohali",
    intro:
      "Techcadd, Mohali provides a practical and career-focused learning environment for students who want to build skills in Cyber Security.",
    items: [
      {
        title: "Practical & Job-Oriented Training",
        body: "Students work on practical exercises and cybersecurity scenarios instead of relying only on theoretical concepts.",
        icon: "terminal",
      },
      {
        title: "Experienced Trainers",
        body: "Learn cybersecurity concepts with trainer guidance, demonstrations, practical sessions and doubt-clearing support.",
        icon: "users",
      },
      {
        title: "Hands-On Learning",
        body: "Practice networking, security testing, vulnerability identification, ethical hacking concepts and security tools.",
        icon: "shield",
      },
      {
        title: "Project-Based Training",
        body: "Practical projects help students understand how cybersecurity concepts can be applied to real-world situations.",
        icon: "layers",
      },
      {
        title: "Interview Preparation",
        body: "Interview-oriented preparation, technical discussions, resume guidance and career support.",
        icon: "briefcase",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore other career-focused programmes at Techcadd and build practical skills for today's technology-driven industry.",
    items: [
      {
        title: "9-Month Agentic AI Diploma",
        body: "Generative AI, LLMs, AI agents, RAG and automation — another 9-month, job-oriented diploma.",
        href: "/courses/after12th/agentic-ai-diploma-program",
      },
      {
        title: "9-Month Cloud Computing Diploma",
        body: "Cloud infrastructure, virtualization, networking, storage, security and deployment.",
        href: "/courses/after12th/cloud-computing-diploma",
      },
      {
        title: "9-Month MERN Stack Diploma",
        body: "HTML, CSS and JavaScript through to React, Node, Express and MongoDB.",
        href: "/courses/after12th/mern-stack-diploma-program",
      },
      {
        title: "Digital Marketing Diploma",
        body: "SEO, social media, Google Ads, content, email marketing, analytics and lead generation.",
        href: "/courses/after12th/digital-marketing-diploma-program",
      },
      {
        title: "Python Programming Course",
        body: "Build a strong programming foundation with Python — useful for security scripting and automation.",
        href: "/courses/after12th/python-programming",
      },
    ],
  },

  faqs: [
    {
      q: "What is a Cyber Security Diploma Program?",
      a: "A Cyber Security Diploma Program is a career-focused training program that teaches learners how to understand cyber threats, identify vulnerabilities, secure systems and networks, and respond to security incidents.",
    },
    {
      q: "Who can join the Cyber Security Diploma Program in Mohali?",
      a: "Students after 12th, graduates, IT learners, networking professionals, freshers and working professionals interested in cybersecurity can join the program.",
    },
    {
      q: "Do I need coding knowledge for Cyber Security?",
      a: "Basic programming knowledge can be useful, but beginners can start learning cybersecurity without advanced coding skills.",
    },
    {
      q: "Is Cyber Security suitable for beginners?",
      a: "Yes. A structured cybersecurity program can introduce beginners to networking, Linux, security concepts, ethical hacking and practical security tools step by step.",
    },
    {
      q: "What tools are taught in Cyber Security training?",
      a: "Depending on the training module, students may get practical exposure to tools such as Kali Linux, Nmap, Wireshark, Burp Suite, Metasploit and OWASP ZAP.",
    },
    {
      q: "Will I learn Ethical Hacking?",
      a: "Yes. Ethical hacking concepts can be included as an important part of the Cyber Security Diploma Program, including reconnaissance, scanning, vulnerability identification and security testing.",
    },
    {
      q: "Will the course include practical training?",
      a: "Yes. The program is designed around practical exercises, demonstrations, assignments, security scenarios and projects.",
    },
    {
      q: "Can I pursue Cyber Security after 12th?",
      a: "Yes. Students who have completed 12th can start cybersecurity training and gradually build their technical knowledge.",
    },
    {
      q: "Is Cyber Security a good career option?",
      a: "Cybersecurity is an important technology field because organizations need to protect digital systems, networks, applications and data from security threats.",
    },
    {
      q: "What career areas can I explore after Cyber Security training?",
      a: "Depending on your skills and qualifications, you can explore areas such as Cyber Security, Ethical Hacking, Security Testing, Vulnerability Assessment, Network Security, Security Operations, Incident Response and Digital Forensics.",
    },
    {
      q: "Does Techcadd provide Cyber Security training in Mohali?",
      a: "Yes, Techcadd offers career-focused IT training in Mohali, including cybersecurity-oriented training with practical learning.",
    },
    {
      q: "Is Cyber Security training available online?",
      a: "Training availability can depend on the current batch and schedule. Students can enquire about available classroom and online learning options.",
    },
  ],

  enquiry: {
    title: "Start Your Cyber Security Career with Practical Training",
    paragraphs: [
      "Want to build a career in Cyber Security? Join the Cyber Security Diploma Program in Mohali at Techcadd and develop practical knowledge of cybersecurity, networking, ethical hacking, vulnerability assessment, web security and security tools.",
      "Not ready to fill a form yet? Leave your number and a Techcadd counsellor will call you back to answer your questions — no pressure, no obligation.",
    ],
  },

  fit: {
    title: "Not Sure If the Cyber Security Diploma Is the Right Fit?",
    paragraphs: [
      "Choosing a technology career after 12th — or a career switch later on — can feel confusing. If you're interested in networking, ethical hacking or protecting systems and data, this diploma can give you the practical foundation to get started.",
      "You don't need an advanced cybersecurity background. The 9-Month Cyber Security Diploma Program in Mohali starts with the basics and gradually takes you into ethical hacking, vulnerability assessment, web/network security and incident response.",
    ],
    ctaTitle: "Take the Next Step",
    points: [
      "12th pass, graduate or working professional? You can start.",
      "No advanced cybersecurity background? No problem.",
      "Want practical, job-oriented skills? Build them through hands-on lab work.",
      "Want career guidance? Get resume, interview and placement support.",
    ],
  },
};

const artificialIntelligenceDiploma: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Where it takes you" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "9-Month Job-Oriented Diploma",
    title: "Best After 12th 9-Month Artificial Intelligence Diploma Program in Mohali",
    paragraphs: [
      "The Artificial Intelligence Diploma Program in Mohali is designed to help students and professionals build practical skills in Artificial Intelligence, Machine Learning, Python programming, data handling, AI algorithms, deep learning, natural language processing, computer vision and AI application development.",
      "At Techcadd, Mohali, students learn through practical exercises, coding assignments, real-world AI use cases, projects and hands-on training — suitable for beginners as well as learners who want to build a professional career in the rapidly growing field of Artificial Intelligence.",
    ],
  },

  program: {
    title: "Artificial Intelligence Diploma Program Course in Mohali",
    paragraphs: [
      "From understanding the fundamentals of Artificial Intelligence to developing machine learning models and AI-powered applications, this diploma program helps learners develop practical and industry-relevant AI knowledge.",
      "Basic computer knowledge can be helpful. Beginners can learn Python and AI concepts step by step as part of a structured learning path.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "9 Months" },
      { label: "Mode", value: "Classroom & Online" },
      { label: "Eligibility", value: "12th Pass / Graduate, Any Stream" },
      { label: "Level", value: "Beginner-Friendly" },
      { label: "Focus", value: "Python, ML, Deep Learning, NLP & Computer Vision" },
      { label: "Project", value: "AI Application Capstone" },
      { label: "Includes", value: "Practical Training + Placement Support" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "The Artificial Intelligence Diploma Program in Mohali is designed to help students and professionals build practical skills in Artificial Intelligence, Machine Learning, Python programming, data handling, AI algorithms, deep learning, natural language processing, computer vision and AI application development.",
      "At Techcadd, Mohali, students learn through practical exercises, coding assignments, real-world AI use cases, projects and hands-on training. The course is suitable for beginners as well as learners who want to build a professional career in the rapidly growing field of Artificial Intelligence.",
      "From understanding the fundamentals of Artificial Intelligence to developing machine learning models and AI-powered applications, this diploma program helps learners develop practical and industry-relevant AI knowledge.",
    ],
  },

  learn: {
    title: "What You’ll Learn",
    intro: "The program is structured to take learners from Artificial Intelligence fundamentals to practical, hands-on AI development.",
    items: [
      {
        title: "Artificial Intelligence Fundamentals",
        body: "Introduction to AI, history and evolution, AI applications, AI vs Machine Learning vs Deep Learning, and the AI development lifecycle.",
      },
      {
        title: "Python Programming for AI",
        body: "Variables, data types, operators, conditionals, loops, functions, lists/tuples/dictionaries, OOP fundamentals, file and exception handling.",
      },
      {
        title: "Data Handling & Preprocessing",
        body: "Data collection, cleaning, missing values, transformation, normalization, feature selection/engineering and data visualization.",
      },
      {
        title: "Machine Learning",
        body: "The machine learning workflow, supervised and unsupervised learning, regression, classification, clustering, and model evaluation.",
      },
      {
        title: "Machine Learning Algorithms",
        body: "Linear and Logistic Regression, Decision Trees, Random Forest, K-Nearest Neighbors, Support Vector Machines, Naive Bayes and K-Means Clustering.",
      },
      {
        title: "Deep Learning",
        body: "Neural networks, artificial neurons, activation functions, forward propagation, backpropagation concepts and training neural networks.",
      },
      {
        title: "Natural Language Processing",
        body: "Text preprocessing, tokenization, stop words, stemming/lemmatization, text classification, sentiment analysis and chatbot concepts.",
      },
      {
        title: "Computer Vision",
        body: "Image processing fundamentals, image classification and recognition, feature extraction and object detection concepts.",
      },
      {
        title: "Generative AI Fundamentals",
        body: "Introduction to Generative AI, Large Language Model fundamentals, prompt engineering basics, and AI-powered content generation.",
      },
      {
        title: "AI Tools & Frameworks",
        body: "Practical exposure to Python, NumPy, Pandas, Matplotlib, Scikit-learn, TensorFlow, PyTorch, Jupyter Notebook, Google Colab and OpenCV.",
      },
      {
        title: "AI Model Development & Deployment",
        body: "Model training, evaluation and optimization fundamentals, saving trained models, API concepts and deployment fundamentals.",
      },
      {
        title: "Artificial Intelligence Projects",
        body: "Apply your learning through practical projects involving prediction systems, customer segmentation, sentiment analysis, recommendation systems and image classification.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The 9-month Artificial Intelligence Diploma follows a structured, beginner-friendly progression — from AI and Python fundamentals through machine learning, deep learning, NLP and computer vision, to Generative AI and capstone projects.",
    modules: [
      {
        title: "AI Fundamentals & Python Programming",
        points: ["AI vs Machine Learning vs Deep Learning", "Python variables, functions and OOP basics", "Python libraries for AI"],
      },
      {
        title: "Data Handling & Preprocessing",
        points: ["Data cleaning and handling missing values", "Data transformation, normalization and feature engineering", "NumPy, Pandas and Matplotlib"],
      },
      {
        title: "Machine Learning & Algorithms",
        points: ["Supervised and unsupervised learning", "Regression, classification and clustering", "Linear/Logistic Regression, Decision Trees, KNN, SVM and K-Means"],
      },
      {
        title: "Deep Learning & Neural Networks",
        points: ["Artificial neurons and activation functions", "Forward propagation and backpropagation concepts", "TensorFlow and PyTorch basics"],
      },
      {
        title: "Natural Language Processing",
        points: ["Text preprocessing and tokenization", "Stemming, lemmatization and text classification", "Sentiment analysis and chatbot concepts"],
      },
      {
        title: "Computer Vision",
        points: ["Image processing fundamentals", "Image classification and recognition", "Feature extraction and object detection concepts"],
      },
      {
        title: "Generative AI Fundamentals",
        points: ["LLM fundamentals and prompt engineering basics", "AI-powered content, text and image generation", "Responsible use of AI"],
      },
      {
        title: "AI Model Development & Capstone Projects",
        points: ["Model training, evaluation and optimization", "Deployment fundamentals and API concepts", "Practical AI capstone project"],
      },
    ],
    practical: {
      title: "Practical Training",
      body: "Throughout the 9 months, students work on coding exercises, AI assignments, machine learning tasks, data projects and practical application-building activities.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the diploma, students will have a practical foundation across Python, data preprocessing, machine learning, deep learning, NLP, computer vision and Generative AI — along with project experience to support entry into AI-focused roles.",
    },
  },

  tools: {
    title: "Tools",
    items: [
      { name: "Python", body: "The core programming language used across AI and machine learning." },
      { name: "NumPy, Pandas & Matplotlib", body: "Prepare, clean and visualize datasets before training a model." },
      { name: "Scikit-learn", body: "Train and evaluate classic machine learning algorithms." },
      { name: "TensorFlow / PyTorch", body: "Build and train neural networks for deep learning." },
      { name: "Jupyter Notebook / Google Colab", body: "Write, run and document AI code interactively." },
      { name: "OpenCV", body: "Work with image processing and computer vision tasks." },
    ],
  },

  who: {
    title: "Who Can Do This Course",
    items: [
      {
        title: "12th Pass Students",
        body: "Students interested in Artificial Intelligence can begin without prior AI experience — basic computer knowledge helps but isn't mandatory.",
        icon: "users",
      },
      {
        title: "College Students & Graduates",
        body: "BCA, B.Tech, BSc-IT, BSc Computer Science, MCA, engineering and Data Science students can build practical AI skills.",
        icon: "certificate",
      },
      {
        title: "Python Learners & Developers",
        body: "Python learners and software developers can extend their skills into machine learning and AI application development.",
        icon: "code",
      },
      {
        title: "Freshers & Job Seekers",
        body: "Build a career-focused, in-demand skill set for AI opportunities as a fresher.",
        icon: "briefcase",
      },
      {
        title: "Working Professionals",
        body: "IT professionals interested in automation and AI technologies can upgrade their existing skills.",
        icon: "terminal",
      },
      {
        title: "Entrepreneurs & AI Enthusiasts",
        body: "Learn how AI applications can be built and applied to real business problems.",
        icon: "sparkles",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Year",
    items: [
      {
        title: "Practical, Coding-First Learning",
        body: "Coding exercises, AI assignments, machine learning tasks, data projects and practical application-building activities — not just concepts.",
        icon: "layers",
      },
      {
        title: "Industry-Relevant AI Skills",
        body: "Skills used across industries for automation, data analysis, recommendation systems, computer vision, NLP and intelligent applications.",
        icon: "sparkles",
      },
      {
        title: "Hands-On Tools & Frameworks",
        body: "Practical exposure to Python, NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch and OpenCV, not just their names on a slide.",
        icon: "terminal",
      },
      {
        title: "Interview & Career Support",
        body: "Interview-oriented preparation, technical discussions, coding practice, resume guidance and career support.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "AI Is Now Core to How Software Gets Built.",
    paragraphs: [
      "Artificial Intelligence is being used across industries for automation, data analysis, recommendation systems, computer vision, natural language processing, intelligent applications and decision-support systems.",
      "This 9-month diploma starts from AI and Python fundamentals and moves gradually into machine learning, deep learning, NLP, computer vision and Generative AI — no advanced AI background needed to begin.",
    ],
    listTitle: "Start Before the Industry Moves Further",
    items: [
      {
        title: "AI is everywhere now",
        body: "From recommendations to automation, AI is part of how modern software is built and used.",
      },
      {
        title: "Practical skills stand out",
        body: "Hands-on model training and AI projects build a stronger profile than reading about AI alone.",
      },
      {
        title: "Build a real portfolio",
        body: "Ship prediction systems, classifiers and AI applications you can walk an interviewer through.",
      },
      {
        title: "Learn locally in Mohali",
        body: "Accessible to learners from Mohali, Chandigarh, Kharar, Zirakpur and nearby areas without needing to relocate.",
      },
    ],
  },

  advisor: {
    title: "Talk to a course advisor",
    body: "Ten minutes on the phone settles more than an hour of reading — eligibility, batch timings, fees, and whether this programme fits your degree or the job you already have.",
    cta: "Book a free demo class",
  },

  certificate: {
    title: "What You Leave the Diploma With",
    intro:
      "Complete the course with a portfolio of AI and machine learning projects and course-completion certification — exact certification and placement details should be confirmed with the Techcadd Mohali centre at the time of enrolment.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "Confirm current certification details with the Techcadd Mohali centre.",
      },
      {
        icon: "layers",
        title: "Portfolio of AI Projects",
        body: "Machine learning models and AI applications you can show in any interview.",
      },
      {
        icon: "briefcase",
        title: "Interview Preparation",
        body: "Coding practice, technical discussions and resume guidance.",
      },
      {
        icon: "target",
        title: "Placement Support",
        body: "Career guidance and placement assistance — confirm exact services with the Mohali centre.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Takes You",
    intro:
      "The 9-Month Artificial Intelligence Diploma gives you a practical foundation to move from a beginner toward entry-level opportunities in AI and machine learning.",
    listTitle: "From Beginner to AI-Ready",
    steps: [
      {
        title: "Start with Python & AI basics",
        body: "Build your foundation in Python programming and core AI concepts.",
      },
      {
        title: "Learn machine learning",
        body: "Get hands-on with data preprocessing, ML algorithms and model evaluation.",
      },
      {
        title: "Go deeper with deep learning, NLP & vision",
        body: "Build neural networks and work with text and image data.",
      },
      {
        title: "Ship an AI application",
        body: "Combine your skills into one complete, portfolio-ready AI project.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Ship",
    items: [
      {
        title: "Sales / House Price Prediction",
        body: "Train a regression model to predict a numeric outcome from a real dataset.",
      },
      {
        title: "Customer Segmentation",
        body: "Use clustering to group customers by behaviour or purchasing patterns.",
      },
      {
        title: "Sentiment Analysis",
        body: "Preprocess text data and classify sentiment using an NLP pipeline.",
      },
      {
        title: "Recommendation System",
        body: "Build a basic recommendation engine using collaborative or content-based filtering.",
      },
      {
        title: "Image Classification",
        body: "Train a model to classify images into categories using computer vision techniques.",
      },
      {
        title: "Final AI Application Capstone",
        body: "Bring data preprocessing, model training, evaluation and deployment fundamentals together in one complete AI-powered application.",
      },
    ],
  },

  approach: {
    title: "Learn It. Train It. Ship It.",
    paragraphs: [
      "Artificial Intelligence is best learned by building models, not just reading about them. Over nine months, you move from Python fundamentals to complete, working AI projects.",
      "Every concept is paired with a coding exercise, so what you understand in class becomes something you can train, evaluate and explain in an interview.",
    ],
    items: [
      {
        title: "Learn It",
        body: "Understand Python, data preprocessing, machine learning, deep learning, NLP, computer vision and Generative AI fundamentals.",
        icon: "layers",
      },
      {
        title: "Build It",
        body: "Apply your knowledge through datasets, ML models, neural networks and a full AI application capstone.",
        icon: "cube",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Choose Techcadd for Artificial Intelligence Training in Mohali",
    intro:
      "Techcadd, Mohali provides a practical and career-focused learning environment for students who want to build skills in Artificial Intelligence.",
    items: [
      {
        title: "Practical & Job-Oriented Training",
        body: "Students work on coding exercises, AI assignments, machine learning tasks, data projects and practical application-building activities.",
        icon: "terminal",
      },
      {
        title: "Experienced Trainers",
        body: "Learn Artificial Intelligence concepts with trainer guidance, coding demonstrations, practical sessions and doubt-clearing support.",
        icon: "users",
      },
      {
        title: "Hands-On Learning",
        body: "Practice Python programming, data preprocessing, machine learning algorithms, model development and AI tools.",
        icon: "code",
      },
      {
        title: "Project-Based Training",
        body: "Practical projects help students understand how AI and machine learning concepts can be applied to real-world problems.",
        icon: "layers",
      },
      {
        title: "Interview Preparation",
        body: "Interview-oriented preparation, technical discussions, coding practice, resume guidance and career support.",
        icon: "briefcase",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore other career-focused programmes at Techcadd and build practical skills for today's technology-driven industry.",
    items: [
      {
        title: "9-Month Agentic AI Diploma",
        body: "Generative AI, LLMs, AI agents, RAG and automation — another 9-month, job-oriented diploma.",
        href: "/courses/after12th/agentic-ai-diploma-program",
      },
      {
        title: "9-Month Cyber Security Diploma",
        body: "Networking, ethical hacking, vulnerability assessment and incident response.",
        href: "/courses/after12th/cyber-security-diploma-program",
      },
      {
        title: "9-Month Cloud Computing Diploma",
        body: "Cloud infrastructure, virtualization, networking, storage, security and deployment.",
        href: "/courses/after12th/cloud-computing-diploma",
      },
      {
        title: "9-Month MERN Stack Diploma",
        body: "HTML, CSS and JavaScript through to React, Node, Express and MongoDB.",
        href: "/courses/after12th/mern-stack-diploma-program",
      },
      {
        title: "Data Science Course",
        body: "Learn to work with data, build models and turn raw numbers into decisions employers care about.",
        href: "/courses/after12th/data-science",
      },
    ],
  },

  faqs: [
    {
      q: "What is an Artificial Intelligence Diploma Program?",
      a: "An Artificial Intelligence Diploma Program is a career-focused training program that teaches learners about AI concepts, Python programming, Machine Learning, Deep Learning, NLP, Computer Vision and AI application development.",
    },
    {
      q: "Who can join the Artificial Intelligence Diploma Program in Mohali?",
      a: "Students after 12th, graduates, engineering students, IT learners, freshers, software developers and working professionals interested in Artificial Intelligence can join the program.",
    },
    {
      q: "Do I need programming knowledge for Artificial Intelligence?",
      a: "Programming knowledge is useful for AI development. Beginners can start with Python fundamentals and gradually progress toward Machine Learning and Artificial Intelligence.",
    },
    {
      q: "Is Artificial Intelligence suitable for beginners?",
      a: "Yes. A structured AI program can introduce beginners to Python, data handling, machine learning and AI concepts step by step.",
    },
    {
      q: "What programming language is used in Artificial Intelligence?",
      a: "Python is widely used in AI and Machine Learning. Depending on the curriculum, students can learn Python along with commonly used AI and machine learning libraries.",
    },
    {
      q: "Will I learn Machine Learning?",
      a: "Yes. Machine Learning can be an important part of the Artificial Intelligence Diploma Program, including supervised learning, unsupervised learning, algorithms, model training and evaluation.",
    },
    {
      q: "Will the course include practical training?",
      a: "Yes. The program is designed around coding exercises, datasets, assignments, machine learning models, AI applications and practical projects.",
    },
    {
      q: "Can I pursue Artificial Intelligence after 12th?",
      a: "Yes. Students who have completed 12th can begin learning Python and AI fundamentals and gradually develop advanced technical skills.",
    },
    {
      q: "Is Artificial Intelligence a good career option?",
      a: "Artificial Intelligence is an important technology field with applications across software, finance, healthcare, manufacturing, education, marketing, automation and many other industries.",
    },
    {
      q: "What career areas can I explore after Artificial Intelligence training?",
      a: "Depending on your skills, qualifications and experience, you can explore areas such as Artificial Intelligence, Machine Learning, Data Science, AI Application Development, Machine Learning Engineering, NLP, Computer Vision, Generative AI, AI Research and Data Analytics.",
    },
    {
      q: "Does Techcadd provide Artificial Intelligence training in Mohali?",
      a: "Yes, Techcadd offers career-focused technology training in Mohali, including Artificial Intelligence-oriented training with practical learning and projects.",
    },
    {
      q: "Is Artificial Intelligence training available online?",
      a: "Training availability can depend on the current batch and schedule. Students can enquire about available classroom and online learning options.",
    },
  ],

  enquiry: {
    title: "Start Your Artificial Intelligence Career with Practical Training",
    paragraphs: [
      "Want to build a career in Artificial Intelligence? Join the Artificial Intelligence Diploma Program in Mohali at Techcadd and develop practical knowledge of Python, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Generative AI and AI application development.",
      "Not ready to fill a form yet? Leave your number and a Techcadd counsellor will call you back to answer your questions — no pressure, no obligation.",
    ],
  },

  fit: {
    title: "Not Sure If the Artificial Intelligence Diploma Is the Right Fit?",
    paragraphs: [
      "Choosing a technology career after 12th — or a career switch later on — can feel confusing. If you're interested in Python, machine learning or building intelligent applications, this diploma can give you the practical foundation to get started.",
      "You don't need prior AI experience. The 9-Month Artificial Intelligence Diploma Program in Mohali starts with the basics and gradually takes you into machine learning, deep learning, NLP, computer vision and Generative AI.",
    ],
    ctaTitle: "Take the Next Step",
    points: [
      "12th pass, graduate or working professional? You can start.",
      "No prior AI experience? No problem.",
      "Want practical, job-oriented skills? Build them through hands-on coding projects.",
      "Want career guidance? Get resume, interview and placement support.",
    ],
  },
};

const fullStackDevelopmentDiploma: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Where it takes you" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "9-Month Job-Oriented Diploma",
    title: "Best After 12th 9-Month Full Stack Development Diploma Program in Mohali",
    paragraphs: [
      "Looking for the best Full Stack Development Diploma Program in Mohali? Techcadd offers a practical, career-focused, 9-month Full Stack Development program for students, graduates, beginners, job seekers, working professionals, freelancers and aspiring software developers who want to build complete web applications from frontend to backend.",
      "The program provides a structured learning path covering frontend development, backend development, databases, APIs, authentication, version control, deployment and real-world project development.",
    ],
  },

  program: {
    title: "Full Stack Development Diploma Program Course in Mohali",
    paragraphs: [
      "Students learn how the complete application works — from designing a user interface in the browser to writing backend logic, managing databases, connecting APIs, handling users and deploying applications.",
      "The program focuses on practical coding and project-based learning instead of theory alone: assignments, coding exercises, debugging tasks, database operations, API integration and full-stack projects.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "9 Months" },
      { label: "Mode", value: "Classroom & Online" },
      { label: "Eligibility", value: "12th Pass / Graduate, Any Stream" },
      { label: "Level", value: "Beginner to Advanced" },
      { label: "Stack", value: "HTML, CSS, JS, React, Node, Express & MongoDB" },
      { label: "Focus", value: "Frontend + Backend + Database + API + Deployment" },
      { label: "Includes", value: "Practical Training + Placement Support" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "The Full Stack Development Diploma Program in Mohali provides a structured learning path covering frontend development, backend development, databases, APIs, authentication, version control, deployment and real-world project development.",
      "Whether you are a complete beginner, a 12th-pass student, college student, graduate, job seeker or working professional, this program can provide a structured path toward learning modern full-stack development.",
      "If you're searching for a Full Stack Development course in Mohali that focuses on practical learning, modern technologies and real-world projects, this diploma program is designed for you.",
    ],
  },

  learn: {
    title: "What You’ll Learn",
    intro: "The curriculum is designed to take students from basic web development to complete full-stack application development.",
    items: [
      {
        title: "Introduction to Full Stack Development",
        body: "What Full Stack Development is, frontend vs backend, client-server architecture, and how frontend, backend, database and APIs communicate.",
      },
      {
        title: "HTML & CSS",
        body: "HTML structure, elements, forms and semantic markup, plus CSS selectors, the box model, Flexbox, Grid and responsive layouts.",
      },
      {
        title: "Responsive Web Design",
        body: "Building interfaces that work across desktop, laptop, tablet and mobile using mobile-first layouts and media queries.",
      },
      {
        title: "JavaScript & Modern JavaScript",
        body: "Variables, functions, the DOM, events and JSON, plus ES6+ concepts — arrow functions, destructuring, modules, async/await and array methods.",
      },
      {
        title: "Frontend Development & React.js",
        body: "Components, UI development, forms, navigation and state concepts, plus React fundamentals — props, state, hooks, routing and API integration.",
      },
      {
        title: "Backend Development, Node.js & Express.js",
        body: "Server concepts, routing, middleware and REST APIs, plus Node.js fundamentals, npm and Express routes, controllers and error handling.",
      },
      {
        title: "Database Management, MongoDB & SQL",
        body: "Database concepts, CRUD operations and relationships, MongoDB collections and documents, and an introduction to SQL and relational databases.",
      },
      {
        title: "REST API Development",
        body: "How applications communicate using APIs — REST fundamentals, HTTP, and GET/POST/PUT/PATCH requests.",
      },
      {
        title: "Authentication & Authorization",
        body: "Registration, login, logout, password handling, authentication and authorization for protected application features.",
      },
      {
        title: "Git, GitHub & npm",
        body: "Version control fundamentals, managing project code, and working with npm packages, dependencies and scripts.",
      },
      {
        title: "Real-World Project Development",
        body: "Combine frontend, backend, database, API and authentication skills to build complete, portfolio-ready projects.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The 9-month Full Stack Development Diploma follows the progression HTML → CSS → JavaScript → Frontend → Backend → Database → APIs → Authentication → Projects → Deployment.",
    modules: [
      {
        title: "HTML, CSS & Responsive Design",
        points: ["Semantic HTML, forms and tables", "CSS box model, Flexbox and Grid", "Responsive, mobile-first layouts"],
      },
      {
        title: "JavaScript & Modern JavaScript (ES6+)",
        points: ["Variables, functions, arrays and objects", "The DOM, events and form handling", "Arrow functions, destructuring, async/await and API requests"],
      },
      {
        title: "Frontend Development & React.js",
        points: ["Components, props and state", "Hooks, forms and events", "Routing and API integration"],
      },
      {
        title: "Backend Development, Node.js & Express.js",
        points: ["Server concepts, routing and middleware", "REST API development", "Request/response handling and error handling"],
      },
      {
        title: "Database Management, MongoDB & SQL",
        points: ["Database concepts and CRUD operations", "MongoDB collections, documents and queries", "Relational database and SQL fundamentals"],
      },
      {
        title: "Authentication, Git & npm",
        points: ["Registration, login and authentication", "Git, GitHub and version control", "npm packages, dependencies and project setup"],
      },
      {
        title: "Deployment & Full-Stack Capstone",
        points: ["Production builds and hosting basics", "Environment variables and database connections", "A complete, deployed full-stack project"],
      },
    ],
    practical: {
      title: "Practical Training",
      body: "Throughout the 9 months, students write code, build interfaces, create backend APIs, connect databases, implement authentication, test applications, debug errors and deploy projects.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the diploma, students will have a practical foundation across HTML, CSS, JavaScript, React, Node.js, Express.js, databases, APIs and authentication — along with full-stack project experience to support entry into web and software development roles.",
    },
  },

  tools: {
    title: "Tools",
    items: [
      { name: "HTML5, CSS3 & JavaScript", body: "The core building blocks of every web page and interface." },
      { name: "React.js", body: "Build components, manage state and route between screens." },
      { name: "Node.js & Express.js", body: "Create backend applications, routes and REST APIs." },
      { name: "MongoDB / SQL", body: "Store and manage application data with a NoSQL or relational database." },
      { name: "Git & GitHub", body: "Track changes and manage project versions." },
      { name: "Postman", body: "Test and debug API requests and responses." },
    ],
  },

  who: {
    title: "Who Can Do This Course",
    items: [
      {
        title: "12th Pass Students",
        body: "Students who have completed 12th grade can begin learning Full Stack Development, starting with programming and web fundamentals.",
        icon: "users",
      },
      {
        title: "College Students & Graduates",
        body: "BCA, B.Tech, MCA, BSc-IT and other students, and graduates from technical or non-technical backgrounds, can build practical coding and project experience.",
        icon: "certificate",
      },
      {
        title: "Job Seekers",
        body: "Build practical projects and a portfolio that demonstrates your technical skills and helps you prepare for technical interviews.",
        icon: "briefcase",
      },
      {
        title: "Working Professionals",
        body: "Upgrade your development skills or transition into software development through structured training.",
        icon: "terminal",
      },
      {
        title: "Freelancers & Entrepreneurs",
        body: "Build complete solutions for clients, or understand how web applications are developed for your own business.",
        icon: "sparkles",
      },
      {
        title: "Beginners in Programming",
        body: "Start with HTML, CSS, JavaScript and programming fundamentals before moving toward modern frontend and backend technologies.",
        icon: "code",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Year",
    items: [
      {
        title: "Complete Full Stack Learning",
        body: "Frontend + Backend + Database + API + Deployment — learners understand how a complete web application works, not just one layer of it.",
        icon: "layers",
      },
      {
        title: "Practical, Project-Based Learning",
        body: "Writing code, building interfaces, creating backend APIs, connecting databases, implementing authentication, testing, debugging and deploying — not concepts alone.",
        icon: "terminal",
      },
      {
        title: "Modern Web Development Skills",
        body: "A Full Stack/MERN-style curriculum covering MongoDB, Express.js, React.js, Node.js, REST APIs, Git and GitHub.",
        icon: "code",
      },
      {
        title: "Career-Oriented Learning",
        body: "Practical skills, project development, resume preparation, interview preparation and career guidance.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "One Path, Every Layer of the Application.",
    paragraphs: [
      "Full Stack Development requires understanding how the frontend communicates with the backend, how backend services communicate with databases, how APIs transfer information, and how applications are tested and deployed.",
      "This 9-month diploma starts from HTML, CSS and JavaScript fundamentals and moves gradually into React, Node.js, Express.js, databases, APIs, authentication and deployment — no prior full-stack experience needed to begin.",
    ],
    listTitle: "Start Before the Industry Moves Further",
    items: [
      {
        title: "Full-stack is in demand",
        body: "Teams value developers who can move between frontend, backend and database work.",
      },
      {
        title: "Practical skills stand out",
        body: "Hands-on React, Node.js and database experience builds a stronger technical profile than tutorials alone.",
      },
      {
        title: "Build a real portfolio",
        body: "Ship complete, deployed projects you can walk an interviewer through, layer by layer.",
      },
      {
        title: "Learn locally in Mohali",
        body: "Accessible to learners from Mohali, Chandigarh and nearby areas without needing to relocate.",
      },
    ],
  },

  advisor: {
    title: "Talk to a course advisor",
    body: "Ten minutes on the phone settles more than an hour of reading — eligibility, batch timings, fees, and whether this programme fits your degree or the job you already have.",
    cta: "Book a free demo class",
  },

  certificate: {
    title: "What You Leave the Diploma With",
    intro:
      "Complete the course with a portfolio of full-stack projects and course-completion certification — exact certification and placement details should be confirmed with the Techcadd Mohali centre at the time of enrolment.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "Confirm current certification details with the Techcadd Mohali centre.",
      },
      {
        icon: "layers",
        title: "Portfolio of Projects",
        body: "Complete full-stack applications you can show in any interview.",
      },
      {
        icon: "briefcase",
        title: "Interview Preparation",
        body: "Resume preparation, project presentation and interview preparation.",
      },
      {
        icon: "target",
        title: "Placement Support",
        body: "Career guidance and placement assistance — confirm exact services with the Mohali centre.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Takes You",
    intro:
      "The 9-Month Full Stack Development Diploma gives you a practical foundation to move from a beginner toward entry-level opportunities in web and software development.",
    listTitle: "From Beginner to Full-Stack Ready",
    steps: [
      {
        title: "Start with the fundamentals",
        body: "Build your foundation in HTML, CSS and JavaScript.",
      },
      {
        title: "Move into React",
        body: "Get hands-on with components, hooks, state and routing.",
      },
      {
        title: "Build the backend",
        body: "Create REST APIs with Node.js and Express.js, backed by a database.",
      },
      {
        title: "Ship a deployed project",
        body: "Combine frontend, backend, APIs, database and authentication into one complete, deployed application for your portfolio.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Ship",
    items: [
      {
        title: "Responsive Landing Page",
        body: "Build a fully responsive web page with HTML, CSS, Flexbox and Grid.",
      },
      {
        title: "React Frontend Application",
        body: "Build a multi-component React app with state, hooks, forms and routing.",
      },
      {
        title: "REST API with Node & Express",
        body: "Design and build backend routes, middleware and a working REST API.",
      },
      {
        title: "Database-Driven Application",
        body: "Connect an API to a database and implement full CRUD operations.",
      },
      {
        title: "Authentication System",
        body: "Implement user registration, login and protected routes.",
      },
      {
        title: "E-Commerce / Booking / Management App",
        body: "Build a complete, real-world application combining products or bookings, users and data.",
      },
      {
        title: "Final Full-Stack Capstone",
        body: "Bring frontend, backend, APIs, database, authentication and deployment together in one complete, deployed application.",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Deploy It.",
    paragraphs: [
      "Full-stack development is best learned by building complete applications. Over nine months, you move from HTML and CSS to deployed, working projects.",
      "Every concept is paired with something you build, so what you understand in class becomes something you can code, debug, deploy and explain in an interview.",
    ],
    items: [
      {
        title: "Learn It",
        body: "Understand HTML, CSS, JavaScript, React, Node.js, Express.js, databases, REST APIs and authentication.",
        icon: "layers",
      },
      {
        title: "Build It",
        body: "Apply your knowledge through components, APIs, database integration and full-stack capstone projects.",
        icon: "cube",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Choose Techcadd, Mohali",
    intro:
      "Choosing the right training institute matters when learning a skill like full-stack development. Here's what makes Techcadd a practical choice for Full Stack Development training in Mohali.",
    items: [
      {
        title: "Practical Full Stack Training",
        body: "Students get opportunities to write code, debug errors, connect databases, develop APIs and build complete projects — not theory alone.",
        icon: "terminal",
      },
      {
        title: "Industry-Focused Curriculum",
        body: "A curriculum designed around modern development technologies, workflows and live project work.",
        icon: "code",
      },
      {
        title: "Project-Based Learning",
        body: "Practical projects bring frontend, backend, databases, APIs and other technologies together.",
        icon: "layers",
      },
      {
        title: "Trainer Guidance",
        body: "Development involves debugging and problem solving — trainer guidance helps you understand errors and improve your coding logic.",
        icon: "users",
      },
      {
        title: "Career-Focused Approach",
        body: "Resume preparation, portfolio development, interview preparation and career direction alongside the technical curriculum.",
        icon: "briefcase",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore other career-focused programmes at Techcadd and build practical skills for today's technology-driven industry.",
    items: [
      {
        title: "9-Month MERN Stack Diploma",
        body: "HTML, CSS and JavaScript through to React, Node, Express and MongoDB — a more MERN-focused 9-month diploma.",
        href: "/courses/after12th/mern-stack-diploma-program",
      },
      {
        title: "9-Month Artificial Intelligence Diploma",
        body: "Python, machine learning, deep learning, NLP, computer vision and Generative AI fundamentals.",
        href: "/courses/after12th/artificial-intelligence-diploma-program",
      },
      {
        title: "9-Month Cyber Security Diploma",
        body: "Networking, ethical hacking, vulnerability assessment and incident response.",
        href: "/courses/after12th/cyber-security-diploma-program",
      },
      {
        title: "9-Month Cloud Computing Diploma",
        body: "Cloud infrastructure, virtualization, networking, storage, security and deployment.",
        href: "/courses/after12th/cloud-computing-diploma",
      },
      {
        title: "Digital Marketing Diploma",
        body: "SEO, social media, Google Ads, content, email marketing, analytics and lead generation.",
        href: "/courses/after12th/digital-marketing-diploma-program",
      },
    ],
  },

  faqs: [
    {
      q: "What is a Full Stack Development Diploma Program?",
      a: "A Full Stack Development program teaches students how to build complete web applications, including frontend interfaces, backend services, databases, APIs, authentication and deployment.",
    },
    {
      q: "Is prior coding experience required?",
      a: "No. Beginners can start with HTML, CSS, JavaScript and programming fundamentals before progressing toward frontend and backend development.",
    },
    {
      q: "Who can join the Full Stack Development Diploma Program?",
      a: "12th-pass students, college students, graduates, BCA/B.Tech/MCA students, job seekers, working professionals, freelancers and beginners interested in software development can join.",
    },
    {
      q: "Can I learn Full Stack Development after 12th?",
      a: "Yes. Students who have completed 12th can start learning full-stack development from the basics.",
    },
    {
      q: "Is Full Stack Development difficult for beginners?",
      a: "It can seem challenging because it involves multiple technologies, but learning them step by step through practical projects can make the process easier.",
    },
    {
      q: "What technologies are taught in Full Stack Development?",
      a: "Depending on the selected track, technologies can include HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, SQL, REST APIs, Git, GitHub, npm and development tools.",
    },
    {
      q: "What is MERN Stack?",
      a: "MERN stands for MongoDB + Express.js + React.js + Node.js — a popular JavaScript-based technology stack used for developing full-stack web applications.",
    },
    {
      q: "Does the course include React.js, Node.js and MongoDB?",
      a: "Yes. React.js, Node.js and MongoDB can be part of a MERN-oriented Full Stack Development curriculum. Confirm the exact current syllabus with the Mohali centre.",
    },
    {
      q: "Does the course include API development?",
      a: "Yes. Students learn how frontend and backend applications communicate using REST APIs and HTTP requests.",
    },
    {
      q: "Does the course include Git and GitHub?",
      a: "Yes. Git and GitHub fundamentals can be included to help students manage and share development projects.",
    },
    {
      q: "Does the program include practical projects?",
      a: "Yes. Students can work on complete projects such as e-commerce applications, management systems, booking applications, blogs, dashboards and other full-stack applications.",
    },
    {
      q: "Can I become a Full Stack Developer after this course?",
      a: "The program can provide a foundation for full-stack development. Becoming job-ready also requires regular coding practice, problem-solving, project experience and continued learning.",
    },
    {
      q: "Can I freelance after learning Full Stack Development?",
      a: "Yes, full-stack skills can be useful for freelance website and application projects. Successful freelancing also requires a strong portfolio, communication skills, client management and practical experience.",
    },
    {
      q: "Does the program include deployment?",
      a: "Deployment basics can be included, covering concepts such as production builds, hosting, environment variables, database connections and application deployment.",
    },
    {
      q: "Does Techcadd provide placement assistance?",
      a: "Techcadd's published information states that its training programs include placement support, including resume reviews, mock interviews and placement-related support. Exact services for the Mohali Full Stack batch should be confirmed with the centre.",
    },
    {
      q: "Are flexible batch timings available?",
      a: "Batch options depend on the current schedule. Techcadd publishes classroom and online learning options for its development programs.",
    },
    {
      q: "Where is the Full Stack Development Diploma Program available?",
      a: "The program is focused on Full Stack Development training in Mohali, Punjab. Confirm the current centre address, batch timing, duration, fees and exact syllabus before relying on these details.",
    },
  ],

  enquiry: {
    title: "Start Your Full Stack Development Career in Mohali",
    paragraphs: [
      "Don't just learn individual programming languages — learn how to build complete web applications from frontend to backend. Learn HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, APIs, Git, GitHub, authentication, deployment and real-world projects with Techcadd, Mohali.",
      "Not ready to fill a form yet? Leave your contact details and connect with a Techcadd counsellor to discuss the course, curriculum, batches, projects and career options.",
    ],
  },

  fit: {
    title: "Not Sure If the Full Stack Development Diploma Is the Right Fit?",
    paragraphs: [
      "Choosing a technology career after 12th — or a career switch later on — can feel confusing. If you're interested in building complete web applications, not just one layer of them, this diploma can give you the practical foundation to get started.",
      "You don't need prior full-stack experience. The 9-Month Full Stack Development Diploma Program in Mohali starts with the basics and gradually takes you into React, Node.js, Express.js, databases and a full-stack capstone project.",
    ],
    ctaTitle: "Take the Next Step",
    points: [
      "12th pass, graduate or working professional? You can start.",
      "No prior full-stack experience? No problem.",
      "Want practical, job-oriented skills? Build them through hands-on projects.",
      "Want career guidance? Get resume, interview and placement support.",
    ],
  },
};

/** Slugs whose After-12th page is written rather than derived. */
export const after12Pages: Record<string, After12Page> = {
  "cloud-computing": cloudComputing,
  "cloud-computing-diploma": cloudComputingDiploma,
  "flutter-app-development-diploma-program": flutterAppDevelopmentDiploma,
  "mern-stack-diploma-program": mernStackDiploma,
  "agentic-ai-diploma-program": agenticAiDiploma,
  "digital-marketing-diploma-program": digitalMarketingDiploma,
  "cyber-security-diploma-program": cyberSecurityDiploma,
  "artificial-intelligence-diploma-program": artificialIntelligenceDiploma,
  "full-stack-development-diploma-program": fullStackDevelopmentDiploma,
};

export function after12Page(slug: string): After12Page | undefined {
  return after12Pages[slug];
}
