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

  /**
   * `intro` is optional: most briefs name the toolchain and go straight to the
   * belt, and an empty lead-in would render as a gap under the heading.
   */
  tools: { title: string; intro?: string; items: { name: string; body: string }[] };

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

const flutter: After12Page = {
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
    // The brief writes no badge; this is the one the After 12th route already
    // uses, kept so both written pathway pages open the same way.
    badge: "Start right after school",
    title: "Best After 12th 3-Month Flutter App Development Program in Mohali",
    paragraphs: [
      "Build your foundation in mobile application development with a focused 3-month Flutter program in Mohali. Start with Dart programming, understand how Flutter apps are structured, and progress toward developing complete applications with APIs, databases, Firebase and modern user interfaces.",
      "Designed for students after 12th as well as beginners, the program emphasizes learning by doing. You will work through coding exercises, interface-building tasks and application projects so that your learning results in demonstrable development work.",
    ],
  },

  program: {
    title: "Flutter App Development Program Course in Mohali",
    paragraphs: [
      "Take your first step toward mobile development with a structured Flutter App Development Course in Mohali. The program introduces you to Dart and gradually moves into Flutter widgets, layouts, navigation, state handling, API connectivity, local storage, Firebase and application testing.",
      "You don't need an existing programming background to begin. The curriculum is arranged from foundational concepts to practical application development, allowing students to understand each stage before moving to more advanced topics.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "3 Months" },
      { label: "Learning Format", value: "Practical + Theory" },
      { label: "Eligibility", value: "12th Pass, Any Stream" },
      { label: "Suitable For", value: "Beginners & Aspiring App Developers" },
      { label: "Technology", value: "Dart + Flutter" },
      { label: "Projects", value: "Practical Application-Based Projects" },
      { label: "Includes", value: "Certificate + Placement Assistance" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "This program gives students a complete introduction to cross-platform mobile application development using Flutter. The learning journey begins with Dart, where you develop an understanding of programming logic, functions, collections, object-oriented concepts and asynchronous operations.",
      "Once the programming foundation is established, you'll move into Flutter and learn how individual widgets combine to create complete application screens. From there, the course progresses into navigation, forms, responsive interfaces, state management and data integration.",
      "Practical development forms a major part of the program. Students work with external APIs, local databases and Firebase services while learning how to troubleshoot and improve their applications.",
      "The final stage focuses on testing, project refinement and preparing applications for release. This gives you experience across the development lifecycle rather than limiting your learning to individual coding examples.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    // The brief numbers its ten topics but writes no lead-in; this is its own
    // arrangement stated in a sentence.
    intro:
      "The ten topics below run in order, from programming fundamentals through to preparing a finished application for release — each one building on the stage before it.",
    items: [
      {
        title: "Programming with Dart",
        body: "Build your programming foundation with Dart syntax, variables, functions, collections, classes, objects, null safety and exception handling.",
      },
      {
        title: "Flutter Application Basics",
        body: "Understand Flutter's widget-based approach, project structure, application lifecycle and the difference between stateless and stateful components.",
      },
      {
        title: "Modern App Interfaces",
        body: "Create responsive screens using layouts, lists, grids, forms, themes, icons, images, reusable widgets and interactive components.",
      },
      {
        title: "Navigation & Application Flow",
        body: "Learn how to connect multiple screens, pass information between pages, manage routes and create smooth application flows.",
      },
      {
        title: "State & Data Handling",
        body: "Understand how application data changes and learn practical approaches for maintaining and updating state across different screens.",
      },
      {
        title: "APIs & Online Data",
        body: "Connect Flutter applications with REST APIs, process JSON responses, handle asynchronous requests and display live information inside your app.",
      },
      {
        title: "Local Storage & Databases",
        body: "Work with local persistence and structured data using SQLite while learning how applications store and retrieve information.",
      },
      {
        title: "Firebase Services",
        body: "Implement authentication, cloud database functionality and other Firebase-powered features to create connected applications.",
      },
      {
        title: "Testing & Debugging",
        body: "Learn how to identify coding problems, inspect application behaviour, test important functionality and improve app reliability.",
      },
      {
        title: "Release Preparation",
        body: "Understand application builds, versioning, signing, release preparation and the basic workflow involved in getting an application ready for users.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The curriculum is organized into three progressive stages, allowing students to move from programming fundamentals to complete application development.",
    modules: [
      {
        title: "Month 1 — Dart, Flutter Foundations & Interface Development",
        points: [
          "Dart programming fundamentals",
          "Variables, constants and data types",
          "Operators and expressions",
          "Conditions and loops",
          "Functions and parameters",
          "Lists, Sets and Maps",
          "Object-oriented programming",
          "Classes, objects and constructors",
          "Inheritance and abstraction",
          "Null safety",
          "Exception handling",
          "Flutter installation and project creation",
          "Understanding widgets and widget trees",
          "Stateless and Stateful Widgets",
          "Basic Flutter layouts",
          "Text, images, icons and buttons",
          "Forms and user input",
          "Themes and reusable components",
          "Responsive interface design",
          "Screen navigation",
          "Practical UI development projects",
        ],
      },
      {
        title: "Month 2 — State, APIs, Storage & Firebase",
        points: [
          "Application state concepts",
          "State updates and shared state",
          "Provider fundamentals",
          "Introduction to Bloc architecture",
          "Futures and async/await",
          "Streams and real-time data",
          "HTTP requests",
          "REST API consumption",
          "JSON data processing",
          "Error and loading-state handling",
          "SQLite database integration",
          "CRUD functionality",
          "Local data persistence",
          "Firebase project configuration",
          "Firebase Authentication",
          "Cloud Firestore",
          "Push notification concepts",
          "Building connected Flutter applications",
          "API and Firebase-based projects",
        ],
      },
      {
        title: "Month 3 — Advanced Development, Testing & Deployment",
        points: [
          "Application architecture",
          "Code organization and reusable components",
          "Advanced UI implementation",
          "Animations and gestures",
          "Unit testing",
          "Widget testing",
          "Integration testing",
          "Debugging with Flutter development tools",
          "Performance checks",
          "Application configuration",
          "Build and release preparation",
          "App signing fundamentals",
          "Version management",
          "Store listing preparation",
          "Final Flutter application",
          "Project documentation",
          "Portfolio preparation",
        ],
      },
    ],
    // The brief writes no practical/outcome pair for the curriculum; both are
    // stated from its own facts — the hero's "learning by doing" line and the
    // three stages above.
    practical: {
      title: "Practical Training",
      body: "Every stage is reinforced through coding exercises, interface-building tasks and application projects, so each concept is practised in a running app before the next one is introduced.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have worked across the whole development lifecycle — Dart, Flutter interfaces, navigation, state, APIs, SQLite, Firebase, testing and release preparation — with finished applications to show for it.",
    },
  },

  tools: {
    title: "Tools & Technologies",
    // The brief lists the thirteen names under "students can gain practical
    // exposure to" but writes no line for each; every line below is that tool's
    // own job in the curriculum above.
    items: [
      { name: "Dart", body: "The language the course opens on — logic, collections, classes and async." },
      { name: "Flutter SDK", body: "The framework itself: widgets, layouts, navigation and builds." },
      { name: "Visual Studio Code", body: "Write, run and debug Flutter projects day to day." },
      { name: "Android Studio", body: "Emulators, device management and the Android build toolchain." },
      { name: "Flutter DevTools", body: "Inspect widget trees, check performance and trace problems." },
      { name: "Git & GitHub", body: "Track changes and keep every project version recoverable." },
      { name: "REST APIs", body: "Pull live information into an app and handle the responses." },
      { name: "HTTP/Dio", body: "Make requests and manage errors and loading states." },
      { name: "SQLite", body: "Store structured data on the device with full CRUD." },
      { name: "Firebase Authentication", body: "Sign users in and manage their sessions." },
      { name: "Cloud Firestore", body: "Read and write cloud data from a running application." },
      { name: "Firebase services", body: "Push notification concepts and the wider Firebase toolset." },
      { name: "Testing tools", body: "Unit, widget and integration tests before a release build." },
    ],
  },

  who: {
    title: "Who Can Join This Program?",
    items: [
      {
        title: "Students After 12th",
        body: "Students from any stream can begin with the fundamentals and gradually develop programming and application-development skills.",
        icon: "users",
      },
      {
        title: "College Students",
        body: "Students pursuing BCA, B.Sc, B.Tech, BBA or other degrees can use the program to add practical mobile-development skills to their academic background.",
        icon: "certificate",
      },
      {
        title: "Beginners",
        body: "No previous professional development experience is required. The curriculum begins with programming fundamentals before introducing Flutter.",
        icon: "sparkles",
      },
      {
        title: "Aspiring Freelancers",
        body: "Learn how to turn application requirements into functional mobile interfaces and projects that can contribute to a development portfolio.",
        icon: "briefcase",
      },
    ],
  },

  worth: {
    title: "Why Choose This Flutter Program?",
    items: [
      {
        title: "Start From the Basics",
        body: "You don't have to arrive knowing how to code. The program builds your Dart foundation before moving into application development.",
        icon: "layers",
      },
      {
        title: "Learn Through Projects",
        body: "Instead of relying entirely on theory, concepts are reinforced through assignments and application-building exercises.",
        icon: "cube",
      },
      {
        title: "Work With Real Data",
        body: "APIs, databases and Firebase introduce you to the type of data-handling functionality found in modern applications.",
        icon: "cloud",
      },
      {
        title: "Build a Portfolio",
        body: "Completed projects give you practical work that can be organized into a portfolio and discussed during interviews.",
        icon: "briefcase",
      },
      {
        title: "Understand the Complete Workflow",
        body: "Go beyond writing individual screens and learn about data, testing, debugging, builds and application release.",
        icon: "target",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Why Learn Flutter Now?",
    paragraphs: [
      "Mobile applications continue to be an important part of digital products, services and businesses. Flutter provides a practical route into cross-platform development while allowing beginners to build modern interfaces with a single development framework.",
      "Learning Flutter alongside Dart, APIs, databases and Firebase also gives students a broader understanding of how mobile applications work beyond the visual interface.",
    ],
    listTitle: "The goal is simple",
    // The brief's own chain — "Learn the language → Build the interface →
    // Connect the data → Test the application → Prepare it for release" — with
    // each link named against the stage of the curriculum that delivers it.
    items: [
      { title: "Learn the language", body: "Dart syntax, collections, object-oriented concepts and null safety." },
      { title: "Build the interface", body: "Widgets, layouts, forms, themes and responsive screens." },
      { title: "Connect the data", body: "REST APIs, JSON, SQLite and Firebase inside a running app." },
      { title: "Test the application", body: "Unit, widget and integration tests, and debugging what they find." },
      { title: "Prepare it for release", body: "Builds, signing, versioning and store listing preparation." },
    ],
  },

  // The brief writes no advisor band of its own; this is the break its enquiry
  // section asks for, stated once rather than repeated from there.
  advisor: {
    title: "Not sure Flutter is your starting point?",
    body: "Ten minutes with a course advisor settles eligibility, batch timings, fees and where this leads — before you commit three months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Certification & Placement Support",
    intro:
      "On successful completion of the program, students can receive a course completion certificate along with career-oriented support.",
    items: [
      {
        icon: "certificate",
        title: "Certificate",
        body: "Recognition of successful completion of the Flutter App Development training program.",
      },
      {
        icon: "layers",
        title: "Project Portfolio",
        body: "Practical applications developed during the course can be presented as part of your portfolio.",
      },
      {
        icon: "briefcase",
        title: "Placement Assistance",
        body: "Support with resume preparation, interview practice and relevant job opportunities.",
      },
      {
        icon: "target",
        title: "Career Guidance",
        body: "Get guidance on building the next stage of your development career after completing the program.",
      },
    ],
  },

  takesYou: {
    title: "Career Opportunities",
    intro:
      "After completing the program, you can prepare for entry-level opportunities such as:",
    listTitle: "Roles this program prepares you for",
    steps: [
      {
        title: "Junior Flutter Developer",
        body: "Work on Flutter applications under the guidance of experienced developers.",
      },
      {
        title: "Mobile App Developer",
        body: "Use your Flutter skills to contribute to mobile application projects.",
      },
      {
        title: "Cross-Platform Developer",
        body: "Build applications designed to work across multiple supported platforms.",
      },
      {
        title: "Flutter Development Intern",
        body: "Apply your skills in an internship environment while gaining professional experience.",
      },
      {
        title: "Freelance App Developer",
        body: "Use your project experience as a starting point for independent application-development work.",
      },
    ],
  },

  projects: {
    title: "Practical Projects",
    items: [
      {
        title: "Personal Task Manager",
        body: "Create a multi-screen task application with forms, categories, local data and interactive UI elements.",
      },
      {
        title: "Service Booking App",
        body: "Develop an application where users can browse services, view details, submit information and manage bookings.",
      },
      {
        title: "Live Information App",
        body: "Connect Flutter with a REST API and display dynamically retrieved information through a responsive interface.",
      },
      {
        title: "Firebase User App",
        body: "Build authentication and cloud-based data functionality using Firebase services.",
      },
      {
        title: "Expense Management App",
        body: "Create an application for recording expenses, organizing transactions and displaying stored information.",
      },
      {
        title: "Final Capstone Application",
        body: "Develop a complete Flutter application from planning and UI implementation through data integration, testing and release preparation.",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Show It.",
    paragraphs: ["The learning process follows a practical cycle:"],
    items: [
      {
        title: "Understand",
        body: "Learn the concept and understand where it is used in application development.",
        icon: "layers",
      },
      {
        title: "Practice",
        body: "Implement the concept through coding exercises and guided tasks.",
        icon: "terminal",
      },
      {
        title: "Build",
        body: "Apply multiple concepts together to create a working application feature.",
        icon: "cube",
      },
      {
        title: "Present",
        body: "Document your project and explain how your application works.",
        icon: "briefcase",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Students Choose techcadd",
    intro:
      "The program is built around practical training, industry-relevant tools and project-based learning, so students finish with development work they can actually demonstrate.",
    items: [
      {
        title: "Practical, Not Just Theoretical",
        body: "Concepts are reinforced through coding exercises, interface-building tasks and application projects rather than lectures alone.",
        icon: "terminal",
      },
      {
        title: "Beginner-Friendly Learning",
        body: "The curriculum starts at Dart fundamentals, making it suitable for 12th-pass students and learners with no programming background.",
        icon: "sparkles",
      },
      {
        title: "Learn With Real Tools",
        body: "Dart, the Flutter SDK, VS Code, Android Studio, DevTools, Git, REST APIs, SQLite and Firebase — the stack a Flutter developer actually uses.",
        icon: "cube",
      },
      {
        title: "Build Projects",
        body: "Six practical applications, closing on a capstone taken from planning through to release preparation.",
        icon: "rocket",
      },
      {
        title: "Career-Focused Training",
        body: "Certificate, portfolio, placement assistance and career guidance once the programme ends.",
        icon: "briefcase",
      },
    ],
  },

  popular: {
    title: "Popular Projects You Can Add to Your Portfolio",
    intro:
      "Applications students commonly build on this route. Each one exercises a different part of the curriculum — ask about any of them when you enquire.",
    // The brief names these ten but gives no destination for them, so each
    // points at the enquiry form on this page rather than at an invented URL.
    items: [
      { title: "Task Management Application", body: "Forms, categories and local data across multiple screens.", href: "#enquire" },
      { title: "Expense Tracker", body: "Recording transactions and displaying stored information.", href: "#enquire" },
      { title: "Weather Application", body: "A REST API, JSON responses and loading states.", href: "#enquire" },
      { title: "Service Booking Application", body: "Browsing, detail screens and submitted information.", href: "#enquire" },
      { title: "E-Commerce Application", body: "Lists, grids, cart state and cloud data.", href: "#enquire" },
      { title: "News Application", body: "Live content pulled from an API into a responsive interface.", href: "#enquire" },
      { title: "Student Management Application", body: "SQLite CRUD over structured records.", href: "#enquire" },
      { title: "Firebase Authentication Application", body: "Sign-in, sessions and cloud-backed user data.", href: "#enquire" },
      { title: "API-Based Application", body: "Asynchronous requests, error handling and live display.", href: "#enquire" },
      { title: "Final Flutter Capstone Project", body: "Planning through UI, data, testing and release preparation.", href: "#enquire" },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the Flutter App Development Program in Mohali?",
      a: "The program is designed as a 3-month training pathway covering Dart, Flutter, application development, data integration, testing and deployment fundamentals.",
    },
    {
      q: "Can I join after 12th from any stream?",
      a: "Yes. The program is designed for students who have completed 12th and want to start learning application development.",
    },
    {
      q: "Do I need prior coding experience?",
      a: "No. Beginners can start with Dart fundamentals before moving into Flutter development.",
    },
    {
      q: "What programming language is used in Flutter?",
      a: "Flutter application development primarily uses Dart.",
    },
    {
      q: "Will I work on practical projects?",
      a: "Yes. The curriculum incorporates application-based exercises and projects throughout the learning journey.",
    },
    {
      q: "Will I learn Firebase and APIs?",
      a: "Yes. API integration, Firebase services and database concepts are included in the curriculum.",
    },
    {
      q: "Can I build a portfolio after the course?",
      a: "Yes. The practical projects completed during training can be organized into a development portfolio.",
    },
    {
      q: "Does the program include placement assistance?",
      a: "Placement-oriented support can include resume guidance, interview preparation and assistance with relevant opportunities.",
    },
  ],

  enquiry: {
    title: "Ask About Flutter App Development Program",
    paragraphs: [
      "Not sure whether Flutter is the right starting point for you? Speak with a course advisor about eligibility, batch timings, curriculum, fees and career pathways.",
    ],
  },

  fit: {
    title: "Where This Course Can Take You",
    paragraphs: [
      "The 3-month program gives you a foundation that can be extended through advanced learning, internships, professional development or longer-term specialization.",
    ],
    ctaTitle: "You can continue developing skills in:",
    points: [
      "Advanced Flutter development",
      "Backend integration",
      "Mobile UI/UX",
      "Firebase development",
      "API-driven applications",
      "Full-stack application development",
      "App deployment",
      "Freelancing",
    ],
  },
};

const mernFullStack: After12Page = {
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
    title: "Best After 12th 3-Month MERN Stack Program in Mohali",
    paragraphs: [
      "Learn to create complete web applications with a practical 3-month MERN Stack Program in Mohali. Start with HTML, CSS and JavaScript, progress into React and MongoDB, and finish with Node.js, Express.js, authentication, APIs and full-stack project development.",
      "The program is structured for students after 12th who want to enter web development without spending years on disconnected technologies. You’ll learn by building websites, interactive applications and a complete full-stack project that can be added to your portfolio.",
    ],
  },

  program: {
    title: "MERN Stack Program Course in Mohali",
    paragraphs: [
      "Begin your full-stack development journey with a hands-on MERN Stack Course in Mohali designed for beginners and students after 12th. The curriculum brings together frontend development, backend programming and database management so you can understand how a complete web application works from end to end.",
      "During the program, you’ll practice with HTML5, CSS3, JavaScript, React.js, Node.js, Express.js and MongoDB. You’ll also work with REST APIs, authentication, Git and GitHub, deployment and responsive interfaces.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "3 Months" },
      { label: "Mode", value: "Classroom + Practical Training" },
      { label: "Eligibility", value: "12th Pass, Any Stream" },
      { label: "Experience Required", value: "No Prior Coding Experience" },
      { label: "Projects", value: "Multiple Mini Projects + Final Capstone" },
      { label: "Technologies", value: "MongoDB, Express.js, React.js & Node.js" },
      { label: "Includes", value: "Certificate + Placement Assistance" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "The 3-month MERN Stack program provides a step-by-step route into modern web application development. Instead of studying frontend and backend technologies independently, you’ll learn how the different layers connect to create a functioning application.",
      "The first phase concentrates on website development and JavaScript programming. You’ll learn how webpages are structured, how responsive interfaces are created and how JavaScript adds interaction and functionality.",
      "The second phase introduces React.js and MongoDB. You’ll build reusable frontend components, manage application data and connect projects with a database.",
      "The final phase focuses on server-side development with Node.js and Express.js. You’ll create APIs, implement authentication, connect the frontend and backend, and develop a complete MERN application.",
      "By the end of the program, you’ll have experience moving through the complete development cycle: Plan → Design → Code → Connect → Test → Deploy",
    ],
  },

  learn: {
    title: "What You'll Learn",
    // The brief numbers its ten topics but writes no lead-in; this states its
    // own arrangement in a sentence.
    intro:
      "The ten topics below run in order, from webpage structure through to a deployed full-stack application and the portfolio that comes out of it.",
    items: [
      {
        title: "Web Development Foundations",
        body: "Understand HTML5, CSS3 and responsive design before moving into JavaScript and modern frontend development.",
      },
      {
        title: "JavaScript Programming",
        body: "Learn programming logic, functions, arrays, objects, DOM manipulation, events, ES6+ features and asynchronous JavaScript.",
      },
      {
        title: "React.js Development",
        body: "Build component-based interfaces with JSX, props, state, hooks, routing and API integration.",
      },
      {
        title: "MongoDB Database",
        body: "Learn how to create databases, collections and documents, perform CRUD operations and manage application data.",
      },
      {
        title: "Node.js & Express.js",
        body: "Develop backend applications, create servers, work with middleware and build RESTful APIs.",
      },
      {
        title: "Authentication",
        body: "Implement registration and login functionality, password protection, JWT-based authentication and restricted routes.",
      },
      {
        title: "Full-Stack Integration",
        body: "Connect React with Node.js, Express and MongoDB to create applications where frontend, backend and database work together.",
      },
      {
        title: "Git & GitHub",
        body: "Learn source-code management, repositories, commits, branches and GitHub workflows for maintaining development projects.",
      },
      {
        title: "Deployment",
        body: "Understand environment variables, production builds and the process of putting your full-stack application online.",
      },
      {
        title: "Career Preparation",
        body: "Prepare your GitHub portfolio, project presentation, resume and technical interview fundamentals.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    // The brief writes no lead-in for the curriculum; this names the three
    // months it is actually divided into.
    intro:
      "Three months, three stages — the frontend and JavaScript, then React and the database, then the server, authentication and a deployed full-stack application.",
    // Each month keeps the brief's own grouping headings (HTML5, CSS3,
    // JavaScript, Practical Work …) in place as entries, so the order and the
    // wording are exactly as supplied.
    modules: [
      {
        title: "Month 1 — HTML, CSS & JavaScript",
        points: [
          "HTML5",
          "HTML document structure",
          "Semantic elements",
          "Headings and paragraphs",
          "Links and navigation",
          "Lists and tables",
          "Forms and input controls",
          "Images and multimedia",
          "Basic accessibility",
          "CSS3",
          "Selectors and properties",
          "Box model",
          "Display and positioning",
          "Flexbox",
          "CSS Grid",
          "Responsive layouts",
          "Media queries",
          "Transitions and animations",
          "JavaScript",
          "Variables and data types",
          "Operators",
          "Conditions",
          "Loops",
          "Functions",
          "Arrays and objects",
          "ES6+ syntax",
          "DOM manipulation",
          "Event handling",
          "Form validation",
          "Fetch API",
          "Promises and async/await",
          "Local storage",
          "Practical Work",
          "Personal portfolio website",
          "Responsive business webpage",
          "JavaScript calculator",
          "Task management application",
          "API-based mini application",
        ],
      },
      {
        title: "Month 2 — React.js & MongoDB",
        points: [
          "React.js",
          "Introduction to React",
          "React project setup",
          "JSX",
          "Components",
          "Props",
          "State",
          "Event handling",
          "Conditional rendering",
          "Lists and keys",
          "useState",
          "useEffect",
          "Forms",
          "API integration",
          "React Router",
          "Reusable components",
          "Responsive React interfaces",
          "MongoDB",
          "Database fundamentals",
          "MongoDB architecture",
          "Collections and documents",
          "MongoDB Atlas",
          "CRUD operations",
          "Queries and filters",
          "Data relationships",
          "Mongoose introduction",
          "Schemas and models",
          "Validation",
          "Practical Projects",
          "React product catalogue",
          "Blog interface",
          "Student management application",
          "Employee dashboard",
          "MongoDB-powered CRUD application",
        ],
      },
      {
        title: "Month 3 — Node.js, Express & Full-Stack Project",
        points: [
          "Node.js",
          "Node.js fundamentals",
          "npm and packages",
          "package.json",
          "Modules",
          "File handling",
          "HTTP fundamentals",
          "Environment configuration",
          "Express.js",
          "Express server setup",
          "Routes",
          "Middleware",
          "Controllers",
          "REST API development",
          "Request and response handling",
          "Error handling",
          "MVC structure",
          "Authentication",
          "User registration",
          "Login system",
          "Password hashing",
          "JWT authentication",
          "Protected routes",
          "Role-based access concepts",
          "MERN Integration",
          "React frontend connection",
          "API communication",
          "MongoDB integration",
          "CRUD workflows",
          "Authentication integration",
          "Error handling",
          "Application structure",
          "Deployment",
          "Production configuration",
          "Environment variables",
          "Frontend deployment",
          "Backend deployment",
          "Database hosting",
          "Final application testing",
          "Final Project",
          "Choose and develop a complete application such as:",
          "E-Commerce Platform",
          "Job Portal",
          "Learning Management System",
          "Hospital Management System",
          "Service Booking Platform",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the practical work listed inside each month, and the cycle the overview
    // closes on.
    practical: {
      title: "Practical Work",
      body: "Every month closes on build work rather than revision — portfolio and business pages in month one, React and MongoDB applications in month two, and a full-stack project taken to deployment in month three.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have moved through the whole development cycle — plan, design, code, connect, test and deploy — with a set of mini projects and one complete MERN application to show for it.",
    },
  },

  tools: {
    title: "Tools & Technologies",
    // The brief lists the fifteen names under "technologies commonly used
    // across modern web-development workflows" but writes no line for each;
    // every line below is that tool's own job in the curriculum above.
    items: [
      { name: "HTML5", body: "Document structure, semantic elements, forms and accessibility." },
      { name: "CSS3", body: "The box model, Flexbox, Grid, media queries and animation." },
      { name: "JavaScript", body: "Logic, the DOM, events, ES6+ and asynchronous work." },
      { name: "React.js", body: "Components, props, state, hooks and routing." },
      { name: "Node.js", body: "The server-side runtime, modules and npm packages." },
      { name: "Express.js", body: "Routes, middleware, controllers and REST APIs." },
      { name: "MongoDB", body: "Collections, documents, queries and CRUD." },
      { name: "Mongoose", body: "Schemas, models and validation over MongoDB." },
      { name: "REST APIs", body: "The contract the React frontend and the server talk over." },
      { name: "Git", body: "Commits, branches and a recoverable project history." },
      { name: "GitHub", body: "Remote repositories and the portfolio employers read." },
      { name: "VS Code", body: "Where the code is written, run and debugged." },
      { name: "MongoDB Atlas", body: "The hosted database the deployed application uses." },
      { name: "Browser Developer Tools", body: "Inspect the DOM, watch requests and trace bugs." },
      { name: "Deployment Platforms", body: "Put the frontend, backend and database online." },
    ],
  },

  who: {
    title: "Who Can Join?",
    items: [
      {
        title: "Students After 12th",
        body: "Students from any stream can start the program and gradually develop their programming and web-development skills.",
        icon: "users",
      },
      {
        title: "College Students",
        body: "Add practical development experience alongside a BCA, B.Sc, B.Tech, BBA or other degree program.",
        icon: "certificate",
      },
      {
        title: "Beginners in Coding",
        body: "The program starts with HTML, CSS and programming fundamentals, making it suitable for learners without professional development experience.",
        icon: "sparkles",
      },
      {
        title: "Aspiring Web Developers",
        body: "Build the frontend, backend and database skills required to start working toward full-stack development roles.",
        icon: "code",
      },
      {
        title: "Freelancers",
        body: "Develop the technical foundation needed to create websites, dashboards and custom web applications for clients.",
        icon: "briefcase",
      },
    ],
  },

  worth: {
    title: "Why Choose This MERN Program?",
    items: [
      {
        title: "Learn the Complete Stack",
        body: "Instead of learning only frontend development, you’ll understand how the user interface, server and database communicate with each other.",
        icon: "layers",
      },
      {
        title: "Build While You Learn",
        body: "Every major technology is connected with practical exercises and projects, helping you turn concepts into working applications.",
        icon: "cube",
      },
      {
        title: "Start With Beginner-Friendly Fundamentals",
        body: "You don’t need to begin with advanced programming knowledge. The curriculum gradually increases in complexity.",
        icon: "sparkles",
      },
      {
        title: "Work on Portfolio Projects",
        body: "Your projects can demonstrate your ability to build interfaces, work with databases, create APIs and develop complete applications.",
        icon: "briefcase",
      },
      {
        title: "Learn Deployment Basics",
        body: "A project becomes much more useful when others can access it. The program introduces the process of taking applications from development to online deployment.",
        icon: "cloud",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Why Learn MERN Stack?",
    paragraphs: [
      "Modern web applications require more than attractive interfaces. Developers need to understand frontend behaviour, backend services, databases and the communication between them.",
      "The MERN ecosystem gives learners a JavaScript-focused development path covering: MongoDB → Express.js → React.js → Node.js",
      "Learning these technologies together can provide a strong foundation for building full-stack web applications and continuing into more advanced software-development areas.",
    ],
    // The brief's own four letters, each named against the stage of the
    // curriculum that delivers it.
    listTitle: "The four layers, in order",
    items: [
      { title: "MongoDB", body: "Collections, documents, queries and CRUD behind the application." },
      { title: "Express.js", body: "Routes, middleware and the REST API the frontend calls." },
      { title: "React.js", body: "Components, state, hooks and routing in the interface." },
      { title: "Node.js", body: "The runtime everything server-side is built and deployed on." },
    ],
  },

  // The brief writes no advisor band of its own; this is the break its enquiry
  // section asks for, stated once rather than repeated from there.
  advisor: {
    title: "Not sure MERN is your starting point?",
    body: "Ten minutes with a course advisor settles eligibility, batch timings, fees and where this leads — before you commit three months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Certification & Placement Assistance",
    intro: "Complete the program with practical projects and career-focused guidance.",
    items: [
      {
        icon: "certificate",
        title: "Course Certificate",
        body: "Receive a certificate upon successful completion of the training program.",
      },
      {
        icon: "layers",
        title: "Project Portfolio",
        body: "Organize your completed applications into a portfolio that demonstrates your development abilities.",
      },
      {
        icon: "target",
        title: "Resume Guidance",
        body: "Learn how to present your technical skills and projects effectively on your resume.",
      },
      {
        icon: "users",
        title: "Interview Preparation",
        body: "Practice explaining projects, technologies and common development concepts.",
      },
      {
        icon: "briefcase",
        title: "Placement Assistance",
        body: "Receive support in identifying relevant entry-level opportunities and preparing for recruitment processes.",
      },
    ],
  },

  takesYou: {
    title: "Career Opportunities",
    intro:
      "After completing the program and building sufficient practical experience, you can prepare for entry-level roles such as:",
    listTitle: "Roles this program prepares you for",
    steps: [
      {
        title: "Junior Full Stack Developer",
        body: "Work on both frontend and backend features under senior developer guidance.",
      },
      {
        title: "MERN Stack Developer",
        body: "Develop web applications using MongoDB, Express.js, React.js and Node.js.",
      },
      {
        title: "React.js Developer",
        body: "Focus primarily on frontend interfaces and React-based applications.",
      },
      {
        title: "Node.js Developer",
        body: "Work on server-side functionality, APIs and backend services.",
      },
      {
        title: "Web Developer",
        body: "Build and maintain websites and web applications for businesses and organizations.",
      },
      {
        title: "Freelance Web Developer",
        body: "Use your development portfolio to pursue independent website and application projects.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects",
    items: [
      {
        title: "Responsive Portfolio Website",
        body: "Create a personal website with responsive layouts, navigation, sections and a professional project showcase.",
      },
      {
        title: "JavaScript Task Manager",
        body: "Build an interactive task application using JavaScript, DOM manipulation, events and browser storage.",
      },
      {
        title: "React Blog Interface",
        body: "Develop a multi-page React interface with reusable components, routing, forms and responsive layouts.",
      },
      {
        title: "Student Management System",
        body: "Create a database-driven application capable of adding, viewing, updating and deleting student records.",
      },
      {
        title: "Employee Dashboard",
        body: "Build a dashboard interface with forms, data display and backend connectivity.",
      },
      {
        title: "Final MERN Application",
        body: "Develop a complete full-stack project combining React, Node.js, Express.js and MongoDB with authentication and CRUD functionality.",
      },
    ],
  },

  approach: {
    title: "Learn. Develop. Deploy.",
    paragraphs: ["The program follows a practical four-stage process:"],
    items: [
      {
        title: "Learn",
        body: "Understand the technology and the problem you are solving.",
        icon: "layers",
      },
      {
        title: "Develop",
        body: "Write code and implement the feature with trainer guidance.",
        icon: "terminal",
      },
      {
        title: "Integrate",
        body: "Connect the frontend, backend and database into one working application.",
        icon: "cube",
      },
      {
        title: "Deploy",
        body: "Prepare your project for production and make it accessible online.",
        icon: "cloud",
      },
    ],
  },

  // The brief writes no "why this institute" section; these five are its own
  // claims — the stack it teaches, where it starts, what it builds and the
  // career support it closes with.
  whyUs: {
    kicker: "Why techcadd",
    title: "Why Students Choose techcadd",
    intro:
      "The program is built around practical training, industry-relevant tools and project-based learning, so students finish with applications they can actually demonstrate.",
    items: [
      {
        title: "The Whole Stack, Not One Slice",
        body: "Frontend, server and database are taught as one connected application rather than three unrelated subjects.",
        icon: "layers",
      },
      {
        title: "Beginner-Friendly Learning",
        body: "The curriculum opens on HTML, CSS and programming fundamentals, so no prior coding experience is assumed.",
        icon: "sparkles",
      },
      {
        title: "Learn With Real Tools",
        body: "React, Node, Express, MongoDB, Mongoose, Git, GitHub, VS Code, Atlas and the browser dev tools — the stack the job actually uses.",
        icon: "terminal",
      },
      {
        title: "Build Projects",
        body: "Six hands-on projects plus the mini applications inside each month, closing on a full-stack capstone.",
        icon: "rocket",
      },
      {
        title: "Career-Focused Training",
        body: "Certificate, portfolio, resume guidance, interview practice and placement assistance once the programme ends.",
        icon: "briefcase",
      },
    ],
  },

  // The brief names no other courses; these are the After 12th routes that
  // exist alongside this one, so the section points at real pages.
  popular: {
    title: "Popular Courses",
    intro:
      "Other career-focused programmes at techcadd for students starting straight after school.",
    items: [
      {
        title: "Flutter App Development Program",
        body: "Dart, Flutter, APIs, SQLite and Firebase — cross-platform mobile apps in three months.",
        href: "/courses/after12th/flutter",
      },
      {
        title: "Cloud Computing Program",
        body: "Linux, networking, Bash, Git and AWS, closing on a cloud deployment capstone.",
        href: "/courses/after12th/cloud-computing",
      },
      {
        title: "Artificial Intelligence Course",
        body: "Understand AI concepts and work with the tools used to build intelligent applications.",
        href: "/courses/after12th/artificial-intelligence",
      },
      {
        title: "Data Science Course",
        body: "Python, statistics, machine learning and the analysis employers hire for.",
        href: "/courses/after12th/data-science",
      },
      {
        title: "Digital Marketing Course",
        body: "SEO, Google Ads, social media, content marketing and analytics.",
        href: "/courses/after12th/digital-marketing",
      },
      {
        title: "Cyber Security Course",
        body: "Networking, Linux hardening, vulnerability assessment and incident response.",
        href: "/courses/after12th/cyber-security",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the MERN Stack Program in Mohali?",
      a: "The program is structured as a 3-month learning pathway covering frontend, backend, database and full-stack project development.",
    },
    {
      q: "Can I join after 12th?",
      a: "Yes. Students who have completed 12th from any stream can begin the program.",
    },
    {
      q: "Do I need previous programming knowledge?",
      a: "No. The curriculum starts with web-development fundamentals and gradually introduces programming and full-stack technologies.",
    },
    {
      q: "What technologies are included?",
      a: "The core stack includes MongoDB, Express.js, React.js and Node.js, along with HTML, CSS, JavaScript, Git, GitHub, APIs and deployment concepts.",
    },
    {
      q: "How many projects will I build?",
      a: "You’ll work on multiple practical exercises and mini projects before developing a larger full-stack application as your final project.",
    },
    {
      q: "Can I use the projects in my portfolio?",
      a: "Yes. Projects completed during training can be organized and presented as part of your development portfolio.",
    },
    {
      q: "Is React included in the program?",
      a: "Yes. React is a major part of the second stage of the curriculum, including components, props, state, hooks, routing and API integration.",
    },
    {
      q: "Will I learn MongoDB?",
      a: "Yes. MongoDB, MongoDB Atlas and Mongoose are covered for database development and application integration.",
    },
    {
      q: "Does the course include placement support?",
      a: "The program includes career-oriented assistance such as resume guidance, interview preparation and support for relevant opportunities.",
    },
  ],

  enquiry: {
    title: "Ask About MERN Stack Program in Mohali",
    paragraphs: [
      "Have questions about the syllabus, eligibility, fees, batch timings or career options? Talk to a course advisor and understand whether the 3-month MERN pathway matches your goals.",
    ],
  },

  fit: {
    title: "Where This Course Takes You",
    paragraphs: [
      "The 3-month program can serve as your starting point for a longer development journey. After building your fundamentals, you can progress toward:",
    ],
    ctaTitle: "You can progress toward",
    points: [
      "Advanced MERN development",
      "Full-stack application architecture",
      "Backend development",
      "React specialization",
      "Next.js",
      "Cloud deployment",
      "DevOps fundamentals",
      "Mobile application development",
      "Freelancing",
      "Software development careers",
    ],
  },
};

const agenticAi: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Future scope" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "Best After 12th 3-Month Agentic AI Program in Mohali",
    paragraphs: [
      "Turn your interest in artificial intelligence into practical skills with a 3-month Agentic AI Program in Mohali. Start with Python and AI fundamentals, then progress into prompt engineering, tool integration, RAG, memory, agent workflows, evaluation, security, and deployment. Build functional AI agents that can work with data, APIs, documents, and real-world tasks — even if you are starting without a programming background.",
    ],
  },

  program: {
    title: "Agentic AI Program Course in Mohali",
    paragraphs: [
      "The Agentic AI Program in Mohali is designed for students who want to understand how modern AI systems move beyond simple question-and-answer interactions. Instead of only learning how to use AI tools, you learn how to design systems that can understand a goal, select tools, retrieve information, maintain context, and complete multi-step tasks.",
      "The learning journey begins with Python, APIs, Git, databases, and basic AI concepts. You then move into prompt design, structured outputs, function and tool calling, retrieval-augmented generation, memory, agent frameworks, evaluation, guardrails, and deployment.",
      "By the end of the program, you will have practical projects and a capstone that demonstrate your ability to build an AI-powered workflow from the initial idea through deployment.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "3 Months" },
      { label: "Learning Mode", value: "Practical + Theory" },
      { label: "Eligibility", value: "12th Pass, Any Stream" },
      { label: "Level", value: "Beginner to Job-Ready" },
      { label: "Projects", value: "Mini Projects + Final AI Agent" },
      { label: "Training", value: "Hands-on Lab Practice" },
      { label: "Includes", value: "Course Certificate + Placement Assistance" },
    ],
  },

  overview: {
    title: "Course Overview",
    // The brief's three month blocks keep their own headings, joined to the
    // sentence that follows each one.
    paragraphs: [
      "This 3-month program follows a progressive learning path so that beginners can build confidence before working with advanced AI architectures.",
      "Month 1 — Coding & AI Foundations: Learn Python programming, Git/GitHub, APIs, JSON, databases, LLM fundamentals, prompt engineering, structured responses, and tool calling. You will also understand how an AI agent differs from a conventional chatbot.",
      "Month 2 — RAG, Memory & Agent Workflows: Build systems that can search documents and external knowledge before generating responses. Explore embeddings, vector databases, document processing, memory, state management, agent orchestration, and human approval workflows.",
      "Month 3 — Evaluation, Security & Deployment: Learn how to test AI agents, measure response quality, manage costs, add safety controls, monitor applications, and deploy an agent as a usable application. The final stage focuses on a complete portfolio project.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    // The brief numbers its ten outcomes but writes no lead-in; this states its
    // own arrangement in a sentence.
    intro:
      "The ten outcomes below run in order, from the Python underneath an AI application through to a hosted agent you can demonstrate in an interview.",
    items: [
      {
        title: "Build a strong technical base",
        body: "Start with Python, APIs, databases, Git, and command-line fundamentals so you understand what happens underneath an AI application.",
      },
      {
        title: "Design effective AI instructions",
        body: "Learn practical prompt engineering techniques for structured, reliable, and task-specific model responses.",
      },
      {
        title: "Connect AI with external tools",
        body: "Create tool-enabled workflows where an AI model can interact with APIs, databases, services, and custom functions.",
      },
      {
        title: "Create knowledge-based AI",
        body: "Build RAG applications that retrieve relevant information from documents and databases before producing an answer.",
      },
      {
        title: "Add memory and context",
        body: "Understand how AI applications maintain conversation state, user context, and persistent information across interactions.",
      },
      {
        title: "Develop agent workflows",
        body: "Learn how agents can plan tasks, make decisions, call tools, evaluate results, and continue through multiple steps.",
      },
      {
        title: "Work with agent frameworks",
        body: "Get practical exposure to modern frameworks used to create structured and stateful AI workflows.",
      },
      {
        title: "Evaluate AI applications",
        body: "Learn to test responses, retrieval quality, tool selection, and complete agent trajectories instead of relying only on visual demos.",
      },
      {
        title: "Add security and guardrails",
        body: "Understand common AI application risks and implement validation, filtering, approval steps, and safe-response mechanisms.",
      },
      {
        title: "Deploy your AI project",
        body: "Move from a local development environment to a hosted application that can be demonstrated during interviews or portfolio reviews.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    // The brief writes no lead-in for the curriculum; this names the three
    // months it is actually divided into.
    intro:
      "Three months, three stages — the code and the model, then retrieval, memory and agents, then evaluation, safety, deployment and a capstone.",
    // Each month keeps the brief's own grouping labels ("Practical Projects:",
    // "Capstone Options:") in place, so the order and wording are as supplied.
    modules: [
      {
        title: "Month 1 — Python, AI Fundamentals & Tool Calling",
        points: [
          "Python syntax, variables, operators, conditions, loops, functions, and data structures",
          "Object-oriented programming and reusable Python code",
          "Type hints, packages, virtual environments, and asynchronous programming",
          "Command-line fundamentals and developer workflows",
          "Git and GitHub for source-code management",
          "HTTP, REST APIs, JSON, authentication, and API integration",
          "SQL and database fundamentals",
          "Introduction to large language models and generative AI",
          "Tokens, context, model parameters, and prompt structure",
          "System, user, and assistant instructions",
          "Prompt engineering and few-shot prompting",
          "Structured outputs and schema validation",
          "Function and tool calling",
          "Building a basic agent workflow without relying completely on a framework",
          "Introduction to Model Context Protocol and tool-based AI integrations",
          "Practical Projects:",
          "Python API application",
          "AI prompt experimentation project",
          "API-connected AI assistant",
          "Basic tool-calling agent",
        ],
      },
      {
        title: "Month 2 — RAG, Memory & Agent Development",
        points: [
          "Retrieval-Augmented Generation fundamentals",
          "Document loading and preprocessing",
          "Text splitting and chunking strategies",
          "Embeddings and semantic search",
          "Vector database concepts",
          "Working with PDF and structured documents",
          "Hybrid search and retrieval improvement",
          "Source-based answers and citations",
          "RAG evaluation and response quality",
          "Short-term and long-term memory",
          "Conversation state and context management",
          "Persistent storage for AI applications",
          "Multi-user data separation",
          "Introduction to LangChain and LlamaIndex",
          "Agent graphs and workflow orchestration",
          "Conditional routing and state-based execution",
          "Human-in-the-loop workflows",
          "Multi-agent concepts and task delegation",
          "Practical Projects:",
          "Document Q&A assistant",
          "Knowledge-base chatbot",
          "Citation-enabled RAG application",
          "Stateful AI workflow",
        ],
      },
      {
        title: "Month 3 — Evaluation, Security, Deployment & Capstone",
        points: [
          "Creating test datasets for AI applications",
          "Automated AI evaluation",
          "Response quality and retrieval metrics",
          "Tool-use and agent-trajectory testing",
          "Prompt regression testing",
          "Token usage and AI cost tracking",
          "Prompt injection awareness",
          "Input and output validation",
          "PII protection and data handling",
          "AI guardrails and approval workflows",
          "API-based agent deployment",
          "Streaming responses",
          "Rate limiting and secrets management",
          "Application logging and monitoring",
          "Building an AI chat interface",
          "Docker and deployment fundamentals",
          "GitHub-based development workflow",
          "Final architecture documentation",
          "Portfolio and interview preparation",
          "Capstone Options:",
          "AI Customer Support Agent",
          "Internal Knowledge Assistant",
          "Document Analysis Agent",
          "Recruitment Assistant",
          "Business Process Automation Agent",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the lab practice named in the highlights, and the capstone the third
    // month closes on.
    practical: {
      title: "Hands-on Lab Practice",
      body: "Every stage ends in build work rather than revision — API and prompt exercises in month one, RAG and stateful workflows in month two, and an evaluated, deployed agent in month three.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have taken an AI workflow from the initial idea through tools, retrieval, memory, evaluation, guardrails and deployment, with a capstone agent to demonstrate.",
    },
  },

  tools: {
    title: "Tools You Will Practically Work With",
    intro:
      "The program focuses on tools that help you move from experimentation to complete AI applications.",
    // The brief lists the twenty-one names but writes no line for each; every
    // line below is that tool's own job in the curriculum above.
    items: [
      { name: "Python", body: "The language everything in the programme is built in." },
      { name: "Git & GitHub", body: "Source-code management and the development workflow." },
      { name: "FastAPI", body: "Serve an agent behind an HTTP API." },
      { name: "PostgreSQL", body: "Relational storage for application and agent data." },
      { name: "Docker", body: "Package the finished agent for deployment." },
      { name: "OpenAI API", body: "One of the model providers behind the agents." },
      { name: "Claude API", body: "A second provider, for comparison and structured work." },
      { name: "Gemini API", body: "A third provider in the same tool-calling patterns." },
      { name: "Pydantic", body: "Schema validation for structured model outputs." },
      { name: "LangChain", body: "Chains, tools and the glue around model calls." },
      { name: "LlamaIndex", body: "Document indexing and retrieval pipelines." },
      { name: "LangGraph", body: "Agent graphs, state and conditional routing." },
      { name: "Qdrant", body: "A vector database for semantic search." },
      { name: "Chroma", body: "A lightweight vector store for local RAG work." },
      { name: "FAISS", body: "Similarity search over embeddings at speed." },
      { name: "Redis", body: "Short-term memory and fast shared state." },
      { name: "RAGAS", body: "Measure retrieval and answer quality." },
      { name: "LangSmith", body: "Trace runs and debug agent trajectories." },
      { name: "Langfuse", body: "Logging, monitoring and cost tracking." },
      { name: "Streamlit", body: "A chat interface for the deployed capstone." },
      { name: "GitHub Actions", body: "Automate tests and the deployment pipeline." },
    ],
  },

  who: {
    title: "Who Can Join the Agentic AI Program?",
    items: [
      {
        title: "Students After 12th",
        body: "Students from any stream can begin the program. The curriculum starts with programming fundamentals before introducing advanced AI concepts.",
        icon: "users",
      },
      {
        title: "College Students",
        body: "Students pursuing BCA, B.Sc, B.Tech, BBA, or other technology-related programs can use the course to add practical AI development skills to their academic knowledge.",
        icon: "certificate",
      },
      {
        title: "Graduates & Freshers",
        body: "Graduates looking to enter the growing AI and automation space can develop a project portfolio instead of relying only on theoretical knowledge.",
        icon: "rocket",
      },
      {
        title: "Working Professionals & Career Changers",
        body: "Professionals interested in AI automation can use the practical curriculum to understand how AI agents are designed, integrated, evaluated, and deployed.",
        icon: "briefcase",
      },
      {
        title: "Developers & Tech Learners",
        body: "Anyone who already understands programming can use the program to move from conventional application development toward AI-powered systems and agent workflows.",
        icon: "terminal",
      },
    ],
  },

  worth: {
    title: "Why Choose This Programme?",
    items: [
      {
        title: "Learn AI by Building",
        body: "Instead of spending three months only watching demonstrations, you work on practical exercises and progressively larger AI projects.",
        icon: "cube",
      },
      {
        title: "Start From the Basics",
        body: "You do not need to be an AI expert on day one. Python, APIs, databases, and developer tools are introduced before advanced agent concepts.",
        icon: "layers",
      },
      {
        title: "Understand the Technology Behind Agents",
        body: "The focus is not simply on prompting ChatGPT. You learn how agents interact with tools, retrieve information, maintain state, and execute workflows.",
        icon: "terminal",
      },
      {
        title: "Build Portfolio-Ready Work",
        body: "Your projects can demonstrate practical skills in Python, APIs, RAG, agent workflows, evaluation, and deployment.",
        icon: "briefcase",
      },
      {
        title: "Learn Responsible AI Development",
        body: "Security, validation, evaluation, privacy, monitoring, and human approval are included so you understand the challenges involved in real AI applications.",
        icon: "shield",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "From AI Users to AI Builders",
    // The brief's two "why" blocks — "Why Learn Agentic AI After 12th?" and
    // "Why Now?" — make one argument, so they run together here.
    paragraphs: [
      "Artificial intelligence is moving from simple content generation toward systems capable of handling multi-step tasks. Learning Agentic AI early can give students exposure to a fast-evolving area that combines programming, automation, APIs, data, and generative AI.",
      "Rather than learning AI only as a user, this program helps you understand how AI-powered applications are constructed and connected to real services.",
      "Generative AI has made powerful models accessible, but building dependable AI applications requires more than writing prompts. Organizations also need people who can connect models to business data, tools, workflows, and applications.",
      "Agentic AI brings these capabilities together by combining language models with tools, retrieval, memory, automation, and controlled decision-making.",
    ],
    // The brief writes no list here; these five are the capabilities its closing
    // sentence names, one each.
    listTitle: "What an agent adds to a model",
    items: [
      { title: "Tools", body: "Call APIs, databases, services and custom functions to act, not just answer." },
      { title: "Retrieval", body: "Search documents and knowledge bases before generating a response." },
      { title: "Memory", body: "Hold conversation state and user context across interactions." },
      { title: "Automation", body: "Plan and run multi-step tasks through to completion." },
      { title: "Controlled decision-making", body: "Validation, guardrails and human approval on the steps that matter." },
    ],
  },

  // The brief writes no advisor band of its own; this is the break its enquiry
  // section asks for, stated once rather than repeated from there.
  advisor: {
    title: "Not sure Agentic AI is your starting point?",
    body: "Ten minutes with a course counsellor settles eligibility, batch timings, fees and where this leads — before you commit three months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Get Certified in Agentic AI Program",
    intro:
      "After completing the program and practical assignments, students receive a course completion certificate. Students who successfully complete the final project can also use their project as a portfolio piece during interviews and further career applications.",
    items: [
      {
        icon: "certificate",
        title: "Course Certificate",
        body: "Recognition of successful completion of the Agentic AI training program.",
      },
      {
        icon: "cube",
        title: "Project Experience",
        body: "A completed AI application demonstrating practical development skills.",
      },
      {
        icon: "briefcase",
        title: "Internship & Placement Assistance",
        body: "Career guidance, resume support, interview preparation, and placement assistance are provided as part of the training support.",
      },
      {
        icon: "layers",
        title: "Portfolio Development",
        body: "Build project documentation and demonstrations that can strengthen your technical portfolio.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Can Take You",
    intro:
      "Agentic AI combines software development with artificial intelligence and automation. Depending on your existing skills and further learning, possible career directions include:",
    listTitle: "Possible career directions",
    steps: [
      {
        title: "AI Automation Engineer",
        body: "Work on AI-powered workflows that connect models with business tools, APIs, and data.",
      },
      {
        title: "Agentic AI Developer",
        body: "Develop intelligent applications capable of handling multi-step tasks and tool-based workflows.",
      },
      {
        title: "Generative AI Developer",
        body: "Create applications using large language models, RAG, APIs, and AI-powered interfaces.",
      },
      {
        title: "AI Solutions Associate",
        body: "Help businesses identify processes where AI assistants and automation can improve productivity.",
      },
      {
        title: "AI Support & Operations Associate",
        body: "Monitor, test, maintain, and improve AI-powered applications and workflows.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Build",
    // Each project keeps the brief's own "Skills:" line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "AI-Powered API Assistant",
        body: "Create a Python-based service that communicates with external APIs and uses an AI model to process user requests. Skills: Python · FastAPI · REST APIs · Git",
      },
      {
        title: "Intelligent Document Assistant",
        body: "Build an application capable of processing documents and answering questions using retrieved information. Skills: Python · RAG · Embeddings · Vector Search",
      },
      {
        title: "Tool-Calling AI Agent",
        body: "Develop an agent that can select and execute predefined tools based on a user's objective. Skills: LLM APIs · Tool Calling · Structured Outputs",
      },
      {
        title: "Knowledge Base Copilot",
        body: "Create a citation-aware assistant that searches a knowledge base before generating responses. Skills: RAG · Qdrant/Chroma · Retrieval · Evaluation",
      },
      {
        title: "Human Approval Workflow",
        body: "Build a stateful AI workflow where selected actions require human approval before execution. Skills: LangGraph · State Management · Checkpoints",
      },
      {
        title: "Deployed AI Agent",
        body: "Complete a publicly demonstrable capstone application with a user interface, evaluation process, monitoring, and deployment. Skills: Agent Framework · Streamlit · Docker · Deployment",
      },
    ],
  },

  approach: {
    title: "Learn. Build. Deploy.",
    // The brief lists the five stages without a lead-in; this names what they
    // are.
    paragraphs: ["The programme runs the same five stages on every project you build:"],
    items: [
      {
        title: "Understand",
        body: "Start by understanding the problem, data, tools, and expected output before writing the solution.",
        icon: "layers",
      },
      {
        title: "Develop",
        body: "Build the workflow step by step with trainer guidance and practical testing.",
        icon: "terminal",
      },
      {
        title: "Evaluate",
        body: "Test your AI application using real examples and identify weaknesses in retrieval, responses, or tool execution.",
        icon: "target",
      },
      {
        title: "Improve",
        body: "Refine prompts, workflows, retrieval strategies, validation, and safety controls.",
        icon: "refresh",
      },
      {
        title: "Deploy",
        body: "Turn the completed project into a working application that can be demonstrated online.",
        icon: "cloud",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Students Choose techcadd",
    // The brief writes no lead-in for this block; this states what its five
    // points have in common.
    intro:
      "Practical training, a beginner-friendly progression and project work at every stage, closed with career support.",
    items: [
      {
        title: "Practical Learning Approach",
        body: "The program combines concepts with hands-on implementation so students can immediately apply what they learn.",
        icon: "terminal",
      },
      {
        title: "Beginner-Friendly Progression",
        body: "The curriculum is structured to help students move from Python basics toward advanced AI development without assuming extensive prior knowledge.",
        icon: "sparkles",
      },
      {
        title: "Project-Based Training",
        body: "Each stage introduces practical work, allowing students to gradually build a portfolio of AI applications.",
        icon: "cube",
      },
      {
        title: "Career-Focused Guidance",
        body: "Students receive support with resume preparation, interview practice, project presentation, and career direction.",
        icon: "briefcase",
      },
      {
        title: "Expandable Learning Path",
        body: "After completing the 3-month program, students can continue developing their skills through advanced AI, full-stack, cloud, data, or automation pathways.",
        icon: "layers",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    // The brief names these four but gives no destinations. The two longer
    // Agentic AI tracks use the slugs the After 12th menu reserves for them in
    // `@/lib/site`; the other two are live pages.
    intro:
      "Other career-focused programmes at techcadd for students starting straight after school.",
    items: [
      {
        title: "After 12th 6-Month Agentic AI Program",
        body: "A deeper learning track for students who want additional time for advanced agent architectures, projects, deployment, and portfolio development.",
        href: "/after-12th/agentic-ai-certificate-program",
      },
      {
        title: "After 12th 9-Month Agentic AI Program",
        body: "An extended pathway combining advanced AI development, larger projects, and broader industry preparation.",
        href: "/after-12th/agentic-ai-diploma-program",
      },
      {
        title: "After 12th Full Stack Development Program",
        body: "Build complete web applications while developing strong programming and software development fundamentals.",
        href: "/courses/after12th/full-stack-development",
      },
      {
        title: "After 12th Cloud Computing Program",
        body: "Learn cloud infrastructure, deployment, networking, and modern cloud platforms as part of a technology-focused career path.",
        href: "/courses/after12th/cloud-computing",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the Agentic AI Program in Mohali?",
      a: "The program is designed as a 3-month practical training pathway covering programming foundations, AI development, agent workflows, evaluation, and deployment.",
    },
    {
      q: "Can I join after 12th without coding experience?",
      a: "Yes. The curriculum begins with programming and technical fundamentals, making it suitable for students who are new to coding.",
    },
    {
      q: "Is Agentic AI different from a normal AI course?",
      a: "Yes. A conventional AI or generative AI course may focus primarily on concepts, models, or AI tools. Agentic AI focuses on creating systems that can use tools, retrieve information, maintain state, and perform multi-step tasks.",
    },
    {
      q: "Will I build an actual AI agent?",
      a: "Yes. Practical assignments progressively lead toward tool-enabled agents, RAG applications, stateful workflows, and a final capstone project.",
    },
    {
      q: "Do I need a science or computer background?",
      a: "No specific stream is required for the beginner-level program. Students from different academic backgrounds can start with the fundamentals.",
    },
    {
      q: "What projects will I have after completing the course?",
      a: "Depending on the learning path, projects can include API assistants, document Q&A systems, RAG applications, tool-calling agents, approval workflows, and a deployed capstone.",
    },
    {
      q: "What career options are available after learning Agentic AI?",
      a: "Potential career directions include AI Automation Engineer, Agentic AI Developer, Generative AI Developer, AI Solutions Associate, and AI Support & Operations roles.",
    },
    {
      q: "Is placement guaranteed?",
      a: "Placement assistance and career support can help students prepare for opportunities, but employment depends on individual skills, interview performance, portfolio quality, and available openings.",
    },
    {
      q: "Can I continue studying AI after the 3-month course?",
      a: "Yes. The 3-month program can serve as a foundation for more advanced Agentic AI, Generative AI, machine learning, cloud, automation, and software-development learning paths.",
    },
    {
      q: "Do I receive a certificate?",
      a: "Students who successfully complete the required training and assessments receive a course completion certificate.",
    },
  ],

  enquiry: {
    title: "Ask About Agentic AI Program in Mohali",
    paragraphs: [
      "Have questions about the syllabus, practical training, batch timings, fees, projects, eligibility, or career opportunities? Connect with a course counsellor to understand whether the Agentic AI Program is suitable for your learning goals.",
    ],
  },

  // The brief writes no closing "still deciding" block; its title and points are
  // the continuation paths named in "Expandable Learning Path" and in the FAQ
  // that asks what comes after the three months.
  fit: {
    title: "Where You Can Go After This",
    paragraphs: [
      "The 3-month program can serve as a foundation rather than an endpoint. After building your fundamentals, you can continue along a longer learning path.",
    ],
    ctaTitle: "You can continue toward",
    points: [
      "Advanced Agentic AI",
      "Generative AI",
      "Machine learning",
      "Cloud",
      "Automation",
      "Software development",
      "Full-stack development",
      "Data",
    ],
  },
};

const digitalMarketing: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Future scope" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "Best After 12th 3-Month Digital Marketing Program in Mohali",
    paragraphs: [
      "Build practical digital marketing skills in just three months with a career-focused program designed for students after 12th. Learn how brands attract customers through SEO, Google Ads, Meta Ads, social media, websites, content, analytics, and conversion strategies. Work on practical campaigns and portfolio projects while learning how digital marketing is applied to real businesses.",
    ],
  },

  program: {
    title: "Digital Marketing Program Course in Mohali",
    paragraphs: [
      "The 3-Month Digital Marketing Program in Mohali is built for students who want to turn an interest in online marketing into practical, employable skills.",
      "You will learn how a business moves from being discovered online to generating enquiries and sales. The course covers search engine optimization, paid advertising, social media marketing, website and landing-page fundamentals, content strategy, email and WhatsApp marketing, Google Analytics, conversion tracking, and campaign reporting.",
      "Rather than learning each topic separately, you will understand how the different channels work together. Practical assignments and projects help you create work that can be added to your portfolio when applying for internships, jobs, or freelance opportunities.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "3 Months" },
      { label: "Mode", value: "Classroom + Practical Training" },
      { label: "Eligibility", value: "12th Pass, Any Stream" },
      { label: "Experience", value: "Beginner Friendly" },
      { label: "Training", value: "Project-Based Learning" },
      { label: "Focus", value: "SEO, Paid Ads, Social Media & Analytics" },
      { label: "Includes", value: "Certificate + Placement Assistance" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "Digital marketing is more than posting content or running an advertisement. A successful campaign requires the right audience, message, platform, budget, landing page, tracking system, and continuous optimization.",
      "This program introduces these elements progressively.",
      "During the first month, you build your foundation in digital marketing strategy, websites, WordPress, content, keyword research, and SEO.",
      "The second month focuses on paid acquisition and social platforms, including Google Ads, Meta Ads, campaign planning, audience targeting, creatives, budgets, and performance optimization.",
      "The final month brings everything together through analytics, conversion tracking, retention marketing, reporting, practical projects, and career preparation.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    intro:
      "Each stage combines concepts with practical assignments so that you finish the program with actual marketing work rather than only notes.",
    items: [
      {
        title: "Understand Digital Marketing Strategy",
        body: "Learn how customers move through awareness, consideration, conversion, and retention stages and how marketers plan campaigns around each stage.",
      },
      {
        title: "Build Website & Landing Page Foundations",
        body: "Understand domains, hosting, website structure, WordPress, landing pages, calls-to-action, and basic conversion-focused design.",
      },
      {
        title: "Master SEO Fundamentals",
        body: "Learn keyword research, search intent, on-page optimization, technical SEO, internal linking, content optimization, and basic off-page strategies.",
      },
      {
        title: "Run Google Ads Campaigns",
        body: "Understand search advertising, keyword targeting, ad groups, bidding, budgets, conversion tracking, display campaigns, and shopping campaign fundamentals.",
      },
      {
        title: "Create Meta Advertising Campaigns",
        body: "Learn campaign objectives, audience creation, ad sets, creatives, placements, budgets, retargeting, and performance analysis for Facebook and Instagram advertising.",
      },
      {
        title: "Manage Social Media",
        body: "Develop content calendars, platform-specific strategies, engagement plans, creative concepts, and reporting systems for social media campaigns.",
      },
      {
        title: "Use Content to Generate Leads",
        body: "Learn how blogs, social content, landing pages, video, and promotional content can work together to attract and convert potential customers.",
      },
      {
        title: "Understand Email & WhatsApp Marketing",
        body: "Explore lead nurturing, customer communication, campaign planning, segmentation, follow-ups, and retention strategies.",
      },
      {
        title: "Measure Campaign Performance",
        body: "Learn how to read traffic, engagement, leads, conversions, costs, and other marketing metrics using analytics and reporting platforms.",
      },
      {
        title: "Optimize for Better Results",
        body: "Use campaign data to identify weak areas, improve targeting and creatives, control spending, and make evidence-based marketing decisions.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The three-month curriculum is designed to move from digital marketing fundamentals to campaign execution and performance analysis.",
    // Each month keeps the brief's own grouping labels ("Practical Projects:",
    // "Final Projects:") in place, so the order and wording are as supplied.
    modules: [
      {
        title: "Month 1 — Digital Marketing, Website & SEO",
        points: [
          "Introduction to digital marketing and online customer journeys",
          "Marketing objectives and campaign planning",
          "Target audience and buyer personas",
          "Marketing funnels and customer intent",
          "Brand positioning and online presence",
          "Domain, hosting, website structure, and CMS basics",
          "WordPress fundamentals",
          "Landing page creation",
          "Content planning and copywriting basics",
          "Keyword research",
          "Search intent",
          "On-page SEO",
          "Title tags, meta descriptions, headings, URLs, and internal links",
          "Technical SEO fundamentals",
          "Search Console basics",
          "Local SEO fundamentals",
          "SEO reporting and optimization",
          "Practical Projects:",
          "Marketing strategy worksheet",
          "WordPress business website",
          "SEO keyword research project",
          "On-page SEO optimization",
          "Local business SEO assignment",
        ],
      },
      {
        title: "Month 2 — Google Ads, Meta Ads & Social Media",
        points: [
          "Introduction to paid advertising",
          "Google Ads account structure",
          "Search campaign creation",
          "Keyword match types",
          "Negative keywords",
          "Ad copy and extensions/assets",
          "Budget and bidding fundamentals",
          "Conversion tracking",
          "Display advertising fundamentals",
          "Shopping campaign concepts",
          "Meta Business Suite",
          "Facebook and Instagram advertising",
          "Campaign objectives",
          "Audience targeting",
          "Custom and retargeting audiences",
          "Ad creatives and messaging",
          "Campaign budget planning",
          "A/B testing",
          "Social media content calendars",
          "Organic engagement strategies",
          "Social media reporting",
          "Practical Projects:",
          "Google Search Ads campaign",
          "Meta Ads campaign structure",
          "Social media content calendar",
          "Audience research project",
          "Paid campaign optimization exercise",
        ],
      },
      {
        title: "Month 3 — Analytics, Conversion & Portfolio Projects",
        points: [
          "Google Analytics fundamentals",
          "Website traffic analysis",
          "Event and conversion concepts",
          "Campaign tracking and UTM parameters",
          "Lead-generation measurement",
          "Conversion rate fundamentals",
          "Remarketing concepts",
          "Email marketing",
          "WhatsApp marketing",
          "Lead nurturing",
          "Customer retention strategies",
          "Marketing dashboards and reports",
          "Campaign performance analysis",
          "Client reporting",
          "Freelancing fundamentals",
          "Digital marketing interview preparation",
          "Resume and portfolio development",
          "Final marketing project",
          "Final Projects:",
          "Complete digital marketing campaign",
          "SEO audit and optimization report",
          "Paid advertising performance report",
          "Social media strategy",
          "Analytics and conversion report",
          "Portfolio-ready capstone",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the project-based training named in the highlights, and the portfolio the
    // third month closes on.
    practical: {
      title: "Project-Based Learning",
      body: "Every month ends in campaign work rather than revision — a website and SEO project in month one, live Google and Meta campaign structures in month two, and an integrated, measured campaign in month three.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have researched, planned, executed, measured and optimised campaigns across SEO, paid search, social and analytics, with portfolio-ready work to show for each.",
    },
  },

  tools: {
    title: "Tools You Will Actually Work With",
    intro:
      "The training introduces the platforms and software commonly used across different areas of digital marketing. The objective is not simply to know what each platform does. You learn where each tool fits into a marketing workflow and how to interpret the data it produces.",
    // The brief lists the sixteen names but writes no line for each; every line
    // below is that tool's own job in the curriculum above.
    items: [
      { name: "Google Ads", body: "Search, display and shopping campaigns, bidding and budgets." },
      { name: "Google Analytics", body: "Traffic, events, conversions and campaign performance." },
      { name: "Google Search Console", body: "Indexing, queries and technical SEO health." },
      { name: "Google Tag Manager", body: "Deploy tracking without touching the site code." },
      { name: "Meta Ads Manager", body: "Objectives, audiences, ad sets, creatives and budgets." },
      { name: "Facebook", body: "Organic presence and paid placements." },
      { name: "Instagram", body: "Content, engagement and campaign placements." },
      { name: "WordPress", body: "Build the business site and its landing pages." },
      { name: "Canva", body: "Produce ad creatives and social content." },
      { name: "Google Business Profile", body: "Local SEO and map visibility." },
      { name: "Keyword research tools", body: "Find search intent, volume and opportunity." },
      { name: "SEO audit tools", body: "Diagnose on-page and technical issues." },
      { name: "Email marketing platforms", body: "Segmentation, nurture sequences and retention." },
      { name: "WhatsApp marketing tools", body: "Direct customer communication and follow-ups." },
      { name: "Looker Studio", body: "Dashboards and client-facing reports." },
      { name: "Google Sheets", body: "Keyword sheets, calendars and campaign tracking." },
    ],
  },

  who: {
    title: "Who Can Join This Course?",
    items: [
      {
        title: "Students After 12th",
        body: "Students from any stream can join the program and start with the fundamentals. You do not need previous marketing or technical experience.",
        icon: "users",
      },
      {
        title: "College Students",
        body: "BBA, B.Com, BCA, BA, B.Sc, and other college students can use the course to develop an additional career skill alongside their degree.",
        icon: "certificate",
      },
      {
        title: "Graduates & Freshers",
        body: "Fresh graduates can build practical projects and develop a stronger portfolio for entry-level digital marketing positions.",
        icon: "rocket",
      },
      {
        title: "Freelancers",
        body: "Learn multiple digital marketing services that can be packaged into freelance offerings for businesses in India and international markets.",
        icon: "briefcase",
      },
      {
        title: "Entrepreneurs & Business Owners",
        body: "Business owners can learn how SEO, paid advertising, social media, analytics, and conversion strategies contribute to customer acquisition.",
        icon: "building",
      },
      {
        title: "Career Changers",
        body: "If you are moving from another field, the beginner-friendly structure gives you a practical starting point without requiring a marketing degree.",
        icon: "refresh",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Time",
    items: [
      {
        title: "Practical Skills Over Marketing Theory",
        body: "Digital marketing changes quickly. Instead of focusing only on definitions, the program emphasizes campaign planning, implementation, measurement, and optimization.",
        icon: "target",
      },
      {
        title: "Multiple Career Paths",
        body: "Digital marketing covers several specializations. You can eventually focus on SEO, paid advertising, social media, content, analytics, email marketing, or performance marketing.",
        icon: "layers",
      },
      {
        title: "Portfolio From Practical Work",
        body: "A portfolio gives employers and clients something concrete to evaluate. Your assignments can demonstrate how you approach keyword research, campaigns, content, analytics, and optimization.",
        icon: "briefcase",
      },
      {
        title: "Learn How the Channels Connect",
        body: "SEO, Google Ads, Meta Ads, social media, websites, and analytics work better when they are viewed as one customer-acquisition system rather than isolated subjects.",
        icon: "cube",
      },
      {
        title: "Skills That Support Freelancing",
        body: "Once you understand multiple marketing channels, you can offer individual services or create broader digital marketing packages for small businesses and startups.",
        icon: "rocket",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Build Skills for the Digital Economy",
    paragraphs: [
      "Businesses increasingly depend on online visibility, lead generation, ecommerce, social media, search advertising, and measurable customer acquisition.",
      "That creates opportunities for people who can do more than create posts. Companies need marketers who can research audiences, launch campaigns, understand performance data, improve conversions, and communicate results clearly.",
      "A practical digital marketing education can give students a foundation for exploring these opportunities immediately after 12th.",
    ],
    // The brief writes no list here; these five are the capabilities its middle
    // paragraph names, one each.
    listTitle: "What companies actually need",
    items: [
      { title: "Research audiences", body: "Personas, intent and the market a campaign is aimed at." },
      { title: "Launch campaigns", body: "Search, display, social and organic, structured properly." },
      { title: "Understand performance data", body: "Traffic, leads, conversions and cost, read correctly." },
      { title: "Improve conversions", body: "Landing pages, creatives and targeting, changed on evidence." },
      { title: "Communicate results", body: "Dashboards and client reports that say what happened and why." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with a course counsellor settles eligibility, batch timings, fees and where this leads — before you commit three months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Get Certified in Digital Marketing",
    intro:
      "Complete the required training and practical assignments to receive a course completion certificate. Your project work can also become part of your professional portfolio.",
    items: [
      {
        icon: "certificate",
        title: "Course Certificate",
        body: "Recognition of successful completion of the Digital Marketing Program.",
      },
      {
        icon: "cube",
        title: "Practical Project Experience",
        body: "Complete marketing assignments across SEO, paid advertising, social media, analytics, and campaign planning.",
      },
      {
        icon: "briefcase",
        title: "Internship & Placement Assistance",
        body: "Receive career-oriented guidance including resume preparation, interview practice, and placement assistance.",
      },
      {
        icon: "layers",
        title: "Portfolio Development",
        body: "Present your practical work in a structured portfolio that can be shared with employers and freelance clients.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Can Take You",
    intro:
      "Digital marketing offers several specialization paths. As your experience grows, you can move toward roles such as:",
    listTitle: "Roles this program prepares you for",
    steps: [
      {
        title: "Digital Marketing Executive",
        body: "Assist with SEO, social media, paid campaigns, content, analytics, and online marketing activities.",
      },
      {
        title: "SEO Executive",
        body: "Work on keyword research, website optimization, content, technical SEO, and search performance.",
      },
      {
        title: "Performance Marketing Executive",
        body: "Manage paid campaigns with a focus on leads, conversions, acquisition costs, and measurable results.",
      },
      {
        title: "Social Media Executive",
        body: "Plan content, manage social channels, develop campaigns, and monitor audience engagement.",
      },
      {
        title: "PPC Executive",
        body: "Work with paid search campaigns, keywords, ad copy, bidding strategies, budgets, and conversion tracking.",
      },
      {
        title: "Digital Marketing Freelancer",
        body: "Provide specialized marketing services to businesses and clients through freelance platforms or direct outreach.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Ship",
    // Each project keeps the brief's own tool line, appended to its description
    // rather than dropped.
    items: [
      {
        title: "Business Website & Marketing Setup",
        body: "Create a basic business website and develop the marketing structure required to attract relevant visitors. WordPress · Content · Landing Pages",
      },
      {
        title: "SEO Growth Project",
        body: "Research keywords, optimize pages, improve website structure, and prepare an SEO performance report. Keyword Research · On-Page SEO · Search Console",
      },
      {
        title: "Google Ads Campaign",
        body: "Plan and structure a paid search campaign with keywords, advertisements, targeting, budget allocation, and conversion goals. Google Ads · Keywords · Conversion Tracking",
      },
      {
        title: "Meta Advertising Campaign",
        body: "Develop a Facebook and Instagram advertising campaign with audience research, creative planning, campaign structure, and performance analysis. Meta Ads Manager · Facebook · Instagram",
      },
      {
        title: "Social Media Strategy",
        body: "Create a content calendar and social media strategy for a selected business, including content themes and engagement objectives. Instagram · Facebook · Canva",
      },
      {
        title: "Complete Digital Marketing Capstone",
        body: "Bring SEO, paid advertising, social media, website optimization, analytics, and reporting together into one integrated marketing project. Analytics · SEO · Paid Ads · Reporting",
      },
    ],
  },

  approach: {
    title: "Learn It. Apply It. Improve It.",
    paragraphs: [
      "Every project follows a practical cycle designed to help you understand not only what to do, but why you are doing it.",
    ],
    items: [
      {
        title: "Research",
        body: "Understand the business, market, competitors, audience, and campaign objective.",
        icon: "search",
      },
      {
        title: "Plan",
        body: "Choose the right channel, message, keywords, content, budget, and measurement strategy.",
        icon: "layers",
      },
      {
        title: "Execute",
        body: "Implement the campaign, optimize the website, publish content, or launch advertisements.",
        icon: "rocket",
      },
      {
        title: "Measure",
        body: "Study traffic, engagement, leads, conversions, cost, and other relevant performance indicators.",
        icon: "chart",
      },
      {
        title: "Optimize",
        body: "Use the data to improve your campaign and document the decisions behind the changes.",
        icon: "refresh",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Students Choose techcadd",
    // The brief writes no lead-in for this block; this states what its six
    // points have in common.
    intro:
      "Trainer-guided practical work across every marketing discipline, closed with the career preparation that turns it into a first job.",
    items: [
      {
        title: "Trainer-Guided Practical Learning",
        body: "Students receive guidance while working through assignments and projects instead of learning entirely through recorded material.",
        icon: "users",
      },
      {
        title: "Multiple Digital Marketing Disciplines",
        body: "The curriculum brings SEO, paid advertising, social media, content, websites, analytics, and retention marketing into one learning path.",
        icon: "layers",
      },
      {
        title: "Project-Based Training",
        body: "Practical projects help students turn individual concepts into demonstrable work.",
        icon: "cube",
      },
      {
        title: "Career Preparation",
        body: "Resume guidance, portfolio development, interview preparation, and placement assistance help students prepare for the next step.",
        icon: "briefcase",
      },
      {
        title: "Beginner-Friendly Approach",
        body: "The course begins with fundamentals, making it suitable for students who have completed 12th and are exploring their first professional skill.",
        icon: "sparkles",
      },
      {
        title: "Flexible Career Direction",
        body: "After the course, students can continue toward SEO, PPC, performance marketing, social media, analytics, content marketing, freelancing, or broader digital marketing roles.",
        icon: "target",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro:
      "Other career-focused programmes at techcadd for students starting straight after school.",
    // The two longer Digital Marketing tracks use the slugs the After 12th menu
    // reserves for them in `@/lib/site`; the other four are live pages.
    items: [
      {
        title: "After 12th 6-Month Digital Marketing Program",
        body: "An extended learning route for students who want more time for advanced campaigns, additional projects, analytics, and career preparation.",
        href: "/after-12th/digital-marketing-certificate-program",
      },
      {
        title: "After 12th 9-Month Digital Marketing Program",
        body: "A longer pathway for students looking to develop deeper digital marketing expertise and a broader project portfolio.",
        href: "/after-12th/digital-marketing-diploma-program",
      },
      {
        title: "After 12th Agentic AI Program",
        body: "Explore artificial intelligence, automation, AI agents, and modern AI-powered workflows.",
        href: "/courses/after12th/agentic-ai",
      },
      {
        title: "After 12th Artificial Intelligence Program",
        body: "Build a foundation in AI concepts, programming, machine learning, and practical artificial intelligence applications.",
        href: "/courses/after12th/artificial-intelligence",
      },
      {
        title: "After 12th Cloud Computing Program",
        body: "Develop skills in cloud platforms, infrastructure, deployment, networking, and modern cloud environments.",
        href: "/courses/after12th/cloud-computing",
      },
      {
        title: "After 12th Cyber Security Program",
        body: "Learn security fundamentals, network protection, application security, and defensive cybersecurity concepts.",
        href: "/courses/after12th/cyber-security",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the Digital Marketing Program in Mohali?",
      a: "The program is designed as a 3-month training course covering digital marketing fundamentals, SEO, paid advertising, social media, analytics, and practical projects.",
    },
    {
      q: "Can I join the course after 12th?",
      a: "Yes. Students who have completed 12th from any stream can begin the beginner-level program.",
    },
    {
      q: "Do I need prior marketing experience?",
      a: "No. The curriculum starts with the fundamentals and gradually moves toward campaign execution and optimization.",
    },
    {
      q: "What topics are covered in the course?",
      a: "The program covers SEO, Google Ads, Meta Ads, social media marketing, WordPress, content marketing, email and WhatsApp marketing, analytics, conversion tracking, and digital marketing strategy.",
    },
    {
      q: "Which tools will I learn?",
      a: "You will work with platforms and tools such as Google Ads, Google Analytics, Search Console, Tag Manager, Meta Ads Manager, WordPress, Canva, Looker Studio, Google Business Profile, and other marketing tools.",
    },
    {
      q: "Will I work on practical projects?",
      a: "Yes. The program includes practical assignments and projects across SEO, paid advertising, social media, websites, analytics, and campaign planning.",
    },
    {
      q: "What jobs can I apply for after the course?",
      a: "Depending on your skills and experience, you can explore Digital Marketing Executive, SEO Executive, PPC Executive, Performance Marketing Executive, Social Media Executive, Content Marketing, and freelance opportunities.",
    },
    {
      q: "Can I become a freelancer after learning digital marketing?",
      a: "Yes. Digital marketing includes several services that can be offered independently to businesses, such as SEO, social media management, paid advertising, content marketing, and website optimization.",
    },
    {
      q: "Is placement guaranteed?",
      a: "Placement assistance can support students with preparation and opportunities, but final employment depends on individual skills, portfolio quality, interview performance, and employer requirements.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Students who successfully complete the required course work and training receive a course completion certificate.",
    },
    {
      q: "Are practical projects included?",
      a: "Yes. Practical work is an important part of the program, allowing students to apply marketing concepts and create portfolio material.",
    },
  ],

  enquiry: {
    title: "Ask About Digital Marketing Program in Mohali",
    paragraphs: [
      "Want to know about the syllabus, fees, batch timings, practical training, projects, or career opportunities? Speak with a course counsellor and understand whether the 3-month Digital Marketing Program is the right starting point for you",
    ],
  },

  fit: {
    title: "What Students Can Build",
    paragraphs: [
      "Instead of finishing with only a certificate, students can complete a portfolio containing examples such as:",
    ],
    ctaTitle: "Your portfolio can include",
    points: [
      "SEO audit and keyword research",
      "WordPress website",
      "Landing page",
      "Google Ads campaign",
      "Meta Ads campaign",
      "Social media content plan",
      "Analytics report",
      "Digital marketing strategy",
      "Final integrated marketing project",
    ],
  },
};

const seoPerformanceMarketing: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Future scope" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "Best After 12th 4-Month SEO + Performance Marketing Program in Mohali",
    paragraphs: [
      "Build the skills to attract customers through search, run measurable advertising campaigns, and understand what actually drives online growth. This four-month programme takes you from SEO fundamentals to Google Ads, Meta retargeting, analytics and reporting, with practical assignments, portfolio projects and a live growth project.",
    ],
  },

  program: {
    title: "SEO + Performance Marketing Program Course in Mohali",
    paragraphs: [
      "techcadd's 4-month SEO + Performance Marketing Program in Mohali is designed for students who want more than theoretical digital marketing knowledge. Across classroom sessions and supervised practical work, you learn how to research keywords, optimise websites, launch paid campaigns, track conversions and turn campaign data into clear marketing decisions.",
      "The programme combines organic search, paid acquisition, social retargeting and analytics so you understand the complete customer acquisition journey.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "4 Months" },
      { label: "Practical Training", value: "165+ Hours" },
      { label: "Eligibility", value: "12th Pass Onward" },
      { label: "Learning Mode", value: "Classroom + Practical Lab" },
      { label: "Portfolio", value: "6 Major Projects" },
      { label: "Focus", value: "SEO + Google Ads + Meta Ads + Analytics" },
      { label: "Career Support", value: "Resume, Interview & Placement Assistance" },
      { label: "Final Project", value: "Live 30-Day Growth Campaign" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "The programme is built around one practical question: How does a business get discovered online, convert visitors into customers, and measure whether its marketing is working?",
      "During the first two months, you build your SEO foundation. You learn how search engines interpret websites, how people search, how to select valuable keywords and how to create content around genuine search intent. You also work on on-page optimisation, technical SEO, local search, link-building strategies and conversion-focused content.",
      "The third month moves into paid acquisition with Google Ads. Instead of learning only search advertising, you explore campaign structure, keyword targeting, ad creation, Display, Shopping, Performance Max, YouTube campaigns, conversion tracking and optimisation. The emphasis is on understanding why a campaign performs rather than simply knowing where to click.",
      "The final month connects paid marketing with Meta advertising and measurement. You learn how to create remarketing audiences, structure campaigns, test creatives, configure tracking and evaluate performance. GA4, Google Tag Manager and Looker Studio bring the different channels together so you can build reports that explain traffic, leads, conversions and campaign efficiency.",
      "The programme finishes with an integrated growth project where SEO and paid campaigns are planned together, monitored through data and presented as a complete marketing case study.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    intro:
      "The programme is designed around practical outcomes rather than a list of software names. By the end, you should have multiple pieces of work that demonstrate what you can actually do.",
    items: [
      {
        title: "Build an SEO Growth Plan",
        body: "Research a business, understand its audience, analyse competitors and create a keyword-led SEO roadmap covering content, technical improvements and priority pages.",
      },
      {
        title: "Audit and Improve a Website",
        body: "Work through on-page and technical SEO issues, identify indexation problems, improve internal linking, implement structured data and prepare a prioritised optimisation plan.",
      },
      {
        title: "Create Google Ads Campaigns",
        body: "Build search campaigns with relevant keywords, ad groups, negative keywords, conversion actions and appropriate bidding strategies, followed by performance analysis and optimisation.",
      },
      {
        title: "Launch a Retargeting Strategy",
        body: "Create audiences based on website behaviour and engagement, then design Meta retargeting campaigns that bring interested visitors back into the conversion journey.",
      },
      {
        title: "Track Marketing Performance",
        body: "Configure essential tracking with GA4 and Google Tag Manager and turn campaign data into useful reports through Looker Studio.",
      },
      {
        title: "Present a Complete Growth Case Study",
        body: "Combine organic search, paid campaigns, retargeting and analytics into one documented project that can become part of your portfolio.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "Four months of structured training take you from marketing fundamentals to a complete SEO and performance marketing workflow.",
    // Each month keeps the brief's own topic headings, with the sentence that
    // follows each one carried on the same line.
    modules: [
      {
        title: "Month 1 — Marketing Strategy, Keywords & SEO Foundations",
        points: [
          "Digital Marketing & Customer Journey — Understand how digital channels contribute to customer acquisition, from awareness and discovery to enquiry and purchase. Learn customer personas, marketing funnels, campaign objectives and essential metrics such as CPC, CTR, CPL, CAC, ROAS and ROI.",
          "Keyword Research & Search Intent — Learn how to discover keyword opportunities, analyse competitor rankings, classify search intent and build keyword groups around topics. Create a practical keyword database and map important terms to appropriate website pages.",
          "On-Page SEO — Work with titles, meta descriptions, headings, URLs, content structure, internal links, image optimisation, semantic relevance and conversion-focused page improvements.",
          "Technical SEO Fundamentals — Explore crawling, indexing, XML sitemaps, robots.txt, canonicalisation, redirects, duplicate content, website architecture, mobile usability and other factors that influence search visibility.",
          "Month 1 Practical — Complete a website research and SEO strategy assignment covering competitors, keywords, page priorities and initial optimisation recommendations.",
        ],
      },
      {
        title: "Month 2 — Technical, Local, Off-Page SEO & Content",
        points: [
          "Advanced Technical SEO — Learn how to investigate Core Web Vitals, indexation issues, structured data, broken links, redirect chains, HTTPS, JavaScript-related SEO problems and other technical barriers.",
          "Off-Page SEO & Link Building — Understand authority, backlinks, relevance, anchor text and ethical link acquisition. Build outreach lists, analyse competitor backlinks, identify link opportunities and create a realistic link-building plan.",
          "Local SEO & Google Business Profile — Learn how businesses can improve local visibility through profile optimisation, categories, services, reviews, local landing pages, citations, location signals and reputation management.",
          "SEO Content Strategy — Create topic clusters, content calendars and search-focused articles. Learn headline writing, content optimisation, user intent, conversion copywriting and techniques for improving existing pages.",
          "Mid-Term Practical — Perform a complete SEO audit on a selected website and submit a prioritised action plan with technical, content and authority recommendations.",
        ],
      },
      {
        title: "Month 3 — Google Ads & Paid Search",
        points: [
          "Google Ads Search Campaigns — Learn account and campaign structure, keyword targeting, match types, search terms, negative keywords, ad groups, responsive search ads and conversion goals.",
          "Campaign Optimisation — Understand Quality Score, Ad Rank, bidding strategies, budget allocation, search term analysis, CTR, CPC, conversion rate and cost per lead.",
          "Display Advertising — Explore audience targeting, placements, contextual signals, remarketing lists, creative formats and campaign objectives for Display advertising.",
          "Shopping & Performance Max — Understand Merchant Center basics, product feeds, campaign structures, asset groups, audience signals, product advertising and Performance Max optimisation.",
          "YouTube & Video Advertising — Learn video campaign objectives, audience targeting, creative considerations, sequencing and performance measurement.",
          "Month 3 Practical — Create a complete paid media campaign plan and build a supervised Google Ads project with conversion tracking and an optimisation checklist.",
        ],
      },
      {
        title: "Month 4 — Meta Ads, Analytics & Growth Project",
        points: [
          "Meta Ads Setup — Understand Business Manager, advertising accounts, campaign objectives, audience structures, placements, budgets and basic account organisation.",
          "Retargeting & Audience Strategy — Build custom audiences, engagement audiences, website visitor segments, exclusions and remarketing funnels designed around different stages of the customer journey.",
          "Creative Testing — Learn how to compare hooks, messages, formats and calls to action. Use CTR, CPM, CPC, CPA and conversion data to decide which creatives deserve more budget.",
          "GA4 & Google Tag Manager — Understand events, parameters, conversions, audiences, tags, triggers and tracking workflows. Learn how to measure forms, calls, purchases and other important actions.",
          "Looker Studio Reporting — Create marketing dashboards that combine analytics and advertising data into a readable performance report for clients or internal teams.",
          "30-Day Growth Project — Bring the complete programme together by working on an integrated marketing project involving SEO, paid advertising, retargeting and measurement.",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the practical lab hours in the highlights, and the growth project the
    // fourth month closes on.
    practical: {
      title: "Practical Lab",
      body: "165+ hours of supervised practical work: every month ends in a graded deliverable — an SEO strategy, a full audit, a built Google Ads campaign, and finally the 30-day growth project.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have researched, planned, executed, measured and presented campaigns across organic search, paid search, retargeting and analytics, with six portfolio projects and a documented growth case study.",
    },
  },

  tools: {
    title: "Tools You Will Work With",
    intro:
      "Training focuses on platforms that digital marketing teams commonly use to research, launch, track and report campaigns. You don't simply watch demonstrations. Each major platform is connected to an assignment or project so you can practise using the data and settings yourself.",
    // The brief lists the seventeen names but writes no line for each; every
    // line below is that platform's own job in the curriculum above.
    items: [
      { name: "Google Ads", body: "Search, Display, Shopping, Performance Max and YouTube campaigns." },
      { name: "Google Analytics 4", body: "Events, conversions, audiences and traffic analysis." },
      { name: "Google Search Console", body: "Indexation, queries and technical SEO health." },
      { name: "Google Tag Manager", body: "Tags, triggers and the tracking workflow." },
      { name: "Looker Studio", body: "Dashboards that explain performance to a client." },
      { name: "Google Business Profile", body: "Local visibility, categories, services and reviews." },
      { name: "Meta Ads Manager", body: "Objectives, audiences, placements and budgets." },
      { name: "Facebook & Instagram", body: "The placements retargeting campaigns run on." },
      { name: "WordPress", body: "Implement on-page and technical SEO improvements." },
      { name: "Canva", body: "Produce ad creatives for testing." },
      { name: "Keyword Research Platforms", body: "Find opportunity, volume and competitor rankings." },
      { name: "SEO Audit Tools", body: "Diagnose on-page and technical issues at scale." },
      { name: "Backlink Analysis Tools", body: "Study authority, anchors and link opportunities." },
      { name: "Content Optimisation Tools", body: "Improve relevance and search intent coverage." },
      { name: "Google Sheets", body: "Keyword databases, outreach lists and campaign tracking." },
      { name: "Merchant Center", body: "Product feeds behind Shopping campaigns." },
      { name: "YouTube Ads", body: "Video objectives, targeting and sequencing." },
    ],
  },

  who: {
    title: "Who Can Join This Programme?",
    items: [
      {
        title: "Students After 12th",
        body: "The programme starts from the basics, making it suitable for students from commerce, arts, science, management and other educational backgrounds.",
        icon: "users",
      },
      {
        title: "College Students",
        body: "Students pursuing graduation can develop practical marketing skills alongside their academic studies and start building a portfolio before completing their degree.",
        icon: "certificate",
      },
      {
        title: "Freshers Looking for Digital Marketing Jobs",
        body: "If you want to enter SEO, PPC, performance marketing or digital marketing roles, the programme provides practical exposure across several important channels.",
        icon: "rocket",
      },
      {
        title: "Freelancers",
        body: "Learn how to offer clients more than one service by combining website optimisation, search marketing, paid campaigns and performance reporting.",
        icon: "briefcase",
      },
      {
        title: "Business Owners & Entrepreneurs",
        body: "Understand how search visibility, advertising budgets, customer journeys and marketing analytics work so you can make better decisions for your own business.",
        icon: "building",
      },
      {
        title: "Career Changers",
        body: "No previous professional marketing experience is required. The programme gradually moves from fundamentals to campaign execution and reporting.",
        icon: "refresh",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Four Months",
    items: [
      {
        title: "Learn Organic and Paid Search Together",
        body: "Instead of studying SEO and advertising as completely separate subjects, understand when a business should earn traffic through search and when it makes sense to pay for immediate visibility.",
        icon: "layers",
      },
      {
        title: "Build Work for Your Portfolio",
        body: "Assignments turn into practical deliverables such as SEO audits, campaign structures, keyword strategies, dashboards and growth reports.",
        icon: "briefcase",
      },
      {
        title: "Go Beyond Basic SEO",
        body: "Technical SEO, local search, content optimisation and authority building help you understand the wider factors that influence organic visibility.",
        icon: "search",
      },
      {
        title: "Learn Multiple Google Ads Formats",
        body: "Search, Display, Shopping, Performance Max and YouTube introduce you to different paid acquisition environments.",
        icon: "megaphone",
      },
      {
        title: "Understand Retargeting",
        body: "Learn how businesses reconnect with people who have already visited their website or interacted with their content.",
        icon: "refresh",
      },
      {
        title: "Make Decisions Using Data",
        body: "GA4, Tag Manager and Looker Studio help you move from assumptions to measurable marketing decisions.",
        icon: "chart",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Learn the Skills Behind Modern Customer Acquisition",
    paragraphs: [
      "Digital marketing is no longer limited to posting on social media or writing blog articles. Businesses need people who can understand search behaviour, manage advertising budgets, analyse customer journeys and explain campaign performance.",
      "This programme gives you four focused months to develop those skills through structured learning and practical execution.",
    ],
    listTitle: "By the end, you can have",
    // The brief's own "By the end, you can have" list, one entry each.
    items: [
      { title: "A collection of SEO and advertising projects", body: "Six major deliverables built across the four months." },
      { title: "Experience working with marketing platforms", body: "Every platform connected to an assignment, not a demo." },
      { title: "A documented growth project", body: "The live 30-day integrated campaign, written up." },
      { title: "Practical analytics and reporting experience", body: "GA4, Tag Manager and Looker Studio dashboards." },
      { title: "A professional portfolio foundation", body: "Case studies you can show clients or employers." },
      { title: "Interview and resume preparation", body: "Presenting projects and explaining campaign decisions." },
      { title: "Course and project certification", body: "Documented training and project work." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with a course advisor settles eligibility, batch timings, fees and where this leads — before you commit four months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Get Certified in SEO + Performance Marketing",
    intro:
      "Complete the programme with practical project work and receive certification that documents your training and project experience.",
    items: [
      {
        icon: "certificate",
        title: "Industry-Oriented Course Certificate",
        body: "Demonstrates successful completion of the SEO + Performance Marketing programme.",
      },
      {
        icon: "cube",
        title: "Project Certificate",
        body: "Documents your practical project work and the skills applied during training.",
      },
      {
        icon: "rocket",
        title: "Live Growth Project Certificate",
        body: "Recognises completion of the integrated growth project covering organic and paid marketing.",
      },
      {
        icon: "briefcase",
        title: "Internship Documentation",
        body: "Where applicable, students can receive internship/project documentation based on their practical training.",
      },
      {
        icon: "layers",
        title: "Portfolio Support",
        body: "Your completed assignments can be organised into case studies that you can discuss during interviews or show prospective clients.",
      },
      {
        icon: "users",
        title: "Placement Assistance",
        body: "Receive support with resume preparation, interview practice, portfolio presentation and relevant job opportunities.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Can Take You",
    intro:
      "The combination of SEO, paid advertising, analytics and reporting can prepare learners for several entry-level and junior digital marketing roles.",
    listTitle: "Roles this programme prepares you for",
    steps: [
      {
        title: "SEO Executive",
        body: "Work on keyword research, website optimisation, content planning, technical checks and search performance.",
      },
      {
        title: "SEO Analyst",
        body: "Study rankings, traffic, search behaviour and website issues to recommend improvements.",
      },
      {
        title: "PPC Executive",
        body: "Create and optimise paid campaigns, monitor budgets and analyse conversions.",
      },
      {
        title: "Performance Marketing Executive",
        body: "Manage paid acquisition campaigns and evaluate performance against business goals.",
      },
      {
        title: "Digital Marketing Executive",
        body: "Work across SEO, paid advertising, social media, analytics and content activities.",
      },
      {
        title: "Search Marketing Specialist",
        body: "Focus on the combined organic and paid search strategy of a business.",
      },
      {
        title: "Digital Marketing Freelancer",
        body: "Offer SEO, Google Ads, local search and reporting services to businesses and clients.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Ship",
    // Each project keeps the brief's own "Outcome:" line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Complete Search Opportunity Map",
        body: "Research a business and create a structured map of keywords, search intent, competitors and priority pages. Outcome: SEO & Search Strategy Report",
      },
      {
        title: "Website SEO Transformation",
        body: "Audit a website, identify optimisation opportunities and implement selected improvements covering on-page and technical SEO. Outcome: Before-and-After SEO Report",
      },
      {
        title: "Paid Search Campaign Build",
        body: "Create a Google Ads campaign structure with keyword groups, ad variations, negative keywords, conversion goals and optimisation recommendations. Outcome: Paid Campaign Portfolio Case Study",
      },
      {
        title: "Local Visibility Campaign",
        body: "Optimise a local business search strategy using Google Business Profile, location-focused pages, reviews and citation opportunities. Outcome: Local SEO Strategy",
      },
      {
        title: "Retargeting Campaign",
        body: "Develop a Meta retargeting structure using audience segments, exclusions, creative concepts and conversion objectives. Outcome: Retargeting Campaign Blueprint",
      },
      {
        title: "30-Day Integrated Growth Challenge",
        body: "Combine SEO, Google Ads, Meta retargeting and analytics into one complete marketing project. Track progress, review performance and document the decisions made during the project. Outcome: Complete Digital Growth Case Study",
      },
    ],
  },

  approach: {
    title: "Learn. Practise. Measure. Improve.",
    paragraphs: [
      "The training follows a simple cycle that mirrors how digital marketing work happens in real teams.",
    ],
    items: [
      {
        title: "Research",
        body: "Understand the business, audience, competitors and marketing objective before choosing a channel.",
        icon: "search",
      },
      {
        title: "Plan",
        body: "Translate the research into keywords, campaigns, content, audiences, budgets and measurable goals.",
        icon: "layers",
      },
      {
        title: "Execute",
        body: "Build the website improvements, campaigns, tracking setup and marketing assets under trainer guidance.",
        icon: "rocket",
      },
      {
        title: "Measure",
        body: "Review rankings, traffic, clicks, leads, conversions, cost and other relevant performance indicators.",
        icon: "chart",
      },
      {
        title: "Optimise",
        body: "Identify what is working, what is underperforming and what should change in the next cycle.",
        icon: "refresh",
      },
      {
        title: "Present",
        body: "Turn your work and results into a clear case study that can be discussed during an interview or client meeting.",
        icon: "briefcase",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Students Choose techcadd",
    intro: "The focus is on practical learning rather than simply completing chapters from a syllabus.",
    items: [
      {
        title: "Practical Lab Sessions",
        body: "Students get dedicated time to work with marketing platforms and apply concepts through guided exercises.",
        icon: "terminal",
      },
      {
        title: "Trainer Guidance",
        body: "Questions, campaign decisions and project work are reviewed so learners understand not just what to do, but why a particular approach makes sense.",
        icon: "users",
      },
      {
        title: "Portfolio-Oriented Learning",
        body: "Major assignments are structured so they can become useful examples for resumes, interviews and freelance proposals.",
        icon: "briefcase",
      },
      {
        title: "Interview Preparation",
        body: "Students receive guidance on presenting projects, explaining campaign decisions and answering common digital marketing interview questions.",
        icon: "target",
      },
      {
        title: "Real-World Marketing Workflow",
        body: "The course introduces the process followed by marketing teams — research, planning, execution, tracking, reporting and optimisation.",
        icon: "refresh",
      },
      {
        title: "Beginner-Friendly Structure",
        body: "The programme starts with fundamentals and gradually introduces more advanced SEO, advertising and analytics concepts.",
        icon: "sparkles",
      },
      {
        title: "Career-Focused Approach",
        body: "Learning is connected to practical job responsibilities so students can understand what different digital marketing roles actually involve.",
        icon: "chart",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro:
      "Explore other career-focused programmes after completing your 12th or while building your professional skills.",
    // The three longer Digital Marketing tracks use the slugs the After 12th
    // menu reserves for them in `@/lib/site`; the other three are live pages.
    items: [
      {
        title: "After 12th 3-Month Digital Marketing Program",
        body: "A shorter route for students who want to develop essential SEO, advertising, social media and analytics skills.",
        href: "/courses/after12th/digital-marketing",
      },
      {
        title: "After 12th 6-Month Digital Marketing Program",
        body: "A broader programme for learners who want more time for digital marketing practice, projects and advanced topics.",
        href: "/after-12th/digital-marketing-certificate-program",
      },
      {
        title: "After 12th 9-Month Digital Marketing Diploma Program",
        body: "A longer learning path for students looking for deeper exposure to digital marketing and career preparation.",
        href: "/after-12th/digital-marketing-diploma-program",
      },
      {
        title: "Artificial Intelligence Program",
        body: "Build foundational knowledge of AI concepts, tools and practical applications.",
        href: "/courses/after12th/artificial-intelligence",
      },
      {
        title: "Data Analytics Program",
        body: "Learn how to work with data, visualisation and analytical tools for business decision-making.",
        href: "/courses/after12th/data-analytics",
      },
      {
        title: "SEO Training",
        body: "Focus specifically on organic search, website optimisation, keyword strategy and technical SEO.",
        href: "/courses/course/seo",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the SEO + Performance Marketing programme?",
      a: "The programme runs for four months and combines classroom instruction, practical lab sessions, assignments and project work.",
    },
    {
      q: "Can students join after 12th?",
      a: "Yes. The programme is suitable for students who have completed 12th from any stream and want to start developing digital marketing skills.",
    },
    {
      q: "Do I need previous SEO experience?",
      a: "No. The programme starts with digital marketing and SEO fundamentals before moving into technical SEO, paid advertising and analytics.",
    },
    {
      q: "Will I learn Google Ads and Meta Ads?",
      a: "Yes. Google Ads is covered extensively, followed by Meta advertising, audience targeting and retargeting concepts.",
    },
    {
      q: "Is the course only about SEO?",
      a: "No. SEO is an important part of the programme, but the curriculum also includes Google Ads, Meta Ads, analytics, tracking, reporting and performance optimisation.",
    },
    {
      q: "Will I work on projects?",
      a: "Yes. The programme includes multiple practical projects covering search strategy, website optimisation, paid advertising, local SEO, retargeting and reporting.",
    },
    {
      q: "Will I learn Google Analytics?",
      a: "Yes. GA4 is covered along with Google Tag Manager and Looker Studio so you can understand and report marketing performance.",
    },
    {
      q: "Is the programme suitable for freelancers?",
      a: "Yes. The combination of SEO, paid advertising, local search and reporting can help learners build broader digital marketing service packages.",
    },
    {
      q: "Do I need a laptop?",
      a: "A laptop is recommended for continued practice, portfolio development and working on assignments outside classroom sessions.",
    },
    {
      q: "Does techcadd provide placement assistance?",
      a: "Placement assistance can include resume preparation, interview practice, portfolio guidance and support with relevant opportunities. Placement is not a guaranteed job offer.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Students who successfully complete the programme and its required assessments can receive course and project certification as applicable.",
    },
    {
      q: "How can I enrol?",
      a: "You can contact the course team to check the current batch schedule, fees, available seats and admission process, or book a demo session before enrolling.",
    },
  ],

  enquiry: {
    title: "Ask About SEO + Performance Marketing in Mohali",
    // The brief's enquiry copy sits under its closing heading; this is that
    // copy, with the closing block below carrying the heading itself.
    paragraphs: [
      "Want to know about the syllabus, fees, batch timings, practical lab sessions, projects or career opportunities? Speak with a course advisor and understand whether the 4-month SEO + Performance Marketing programme is the right starting point for you.",
    ],
  },

  fit: {
    title: "Not Sure If SEO + Performance Marketing Is Right for You?",
    paragraphs: [
      "Choosing a course after 12th can be easier when you understand exactly what you will learn and where it can lead. Talk to a course advisor, explore the practical training approach and decide whether SEO and performance marketing match your career plans.",
    ],
    ctaTitle: "Get Started Today",
    // The brief names no list here; these six are its own highlights, the facts
    // a reader still deciding is weighing.
    points: [
      "4 months, 165+ hours of practical training",
      "12th pass onward, any stream",
      "SEO, Google Ads, Meta Ads and analytics in one programme",
      "6 major portfolio projects",
      "A live 30-day growth campaign",
      "Resume, interview and placement assistance",
    ],
  },
};

const dataScience: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Future scope" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "Best After 12th 4-Month Data Science Program in Mohali",
    paragraphs: [
      "A four-month fast-track journey from data fundamentals to practical AI development — learn Python, SQL, machine learning, deep learning, LLMs, RAG, AI agents and cloud deployment, and finish with an industry-focused AI SaaS capstone.",
    ],
  },

  program: {
    title: "Data Science Program in Mohali",
    paragraphs: [
      "A 4-month AI-integrated Data Science programme designed for students starting after 12th. Build skills across Excel, Power BI, Python, SQL, Pandas, NumPy, Polars, machine learning, deep learning, computer vision, LLMs, vector databases, RAG, AI agents, FastAPI and cloud deployment.",
      "The programme combines foundational data skills with modern AI development so you can progress from analysing datasets to building and deploying practical AI applications.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "4 Months" },
      { label: "Mode", value: "Classroom & 1-on-1" },
      { label: "Eligibility", value: "12th Pass" },
      { label: "Learning", value: "Practical, project-based training" },
      { label: "Includes", value: "Placement Support" },
      { label: "Projects", value: "Multiple hands-on projects + final capstone" },
      { label: "Focus", value: "Data Science + Machine Learning + Generative AI" },
    ],
  },

  overview: {
    title: "Course Overview",
    // The brief's four month blocks keep their own headings, joined to the
    // sentences that follow each one.
    paragraphs: [
      "This four-month fast-track Data Science programme is designed for students who want to build practical data and AI skills after 12th without spending years before creating real projects.",
      "The course begins with Excel, Power BI, Python and SQL before moving into data science, machine learning and deep learning. You then progress into computer vision, LLMs, embeddings, vector databases, RAG and AI agents.",
      "The final month focuses on application development, cloud deployment, AI security and an industry-style AI SaaS capstone.",
      "Month 1 — Data & Programming Foundations: Start with advanced Excel, Power Query, Power BI, DAX, KPI reporting and data literacy. Move into Python fundamentals with VS Code, object-oriented programming, exception handling, type hints, testing and coding practices. You will also learn Git, GitHub, SQL with PostgreSQL, database design, window functions and query optimisation. The month concludes with APIs, JSON, FastAPI basics, JWT, Postman, Pandas, NumPy, Polars, DuckDB and PyArrow.",
      "Month 2 — Data Science, Machine Learning & Deep Learning: Learn how to clean and understand datasets through exploratory data analysis, feature engineering, statistics and visualisation. Build machine learning workflows with scikit-learn, pipelines and cross-validation. Explore advanced gradient-boosting models including XGBoost, LightGBM and CatBoost, followed by model evaluation and hyperparameter optimisation. The month also introduces PyTorch, tensors, neural networks and deep learning fundamentals.",
      "Month 3 — Computer Vision, LLMs & Vector Search: Move into computer vision with CNNs, transfer learning and OpenCV. Then explore transformers, Hugging Face and tokenizers. Learn the foundations of large language models, including tokenisation, embeddings, attention mechanisms and prompt engineering. Work with major AI APIs and local model tools, followed by vector embeddings and databases such as FAISS, ChromaDB, Pinecone, Qdrant and Milvus for semantic search.",
      "Month 4 — RAG, AI Agents, Deployment & Capstone: Learn how modern AI applications are built using RAG architecture, hybrid search, guardrails, LangChain, LangGraph, CrewAI, MCP, tool calling and multi-agent systems. Develop AI applications using FastAPI, asynchronous programming, WebSockets, Streamlit, Gradio and Chainlit. The final stage covers Docker, cloud deployment, AWS, Azure AI, Google Vertex AI, CI/CD, prompt-injection defence and responsible AI. You then bring everything together in an end-to-end AI SaaS capstone using FastAPI, PostgreSQL, RAG, AI agents and Docker.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    // The brief numbers its four outcomes but writes no lead-in; this states
    // its own arrangement in a sentence.
    intro:
      "Four practical outcomes, one per stage of the programme — a dashboard, a model, a retrieval assistant and a deployed application.",
    items: [
      {
        title: "Build a Business Intelligence Dashboard",
        body: "Use advanced Excel, Power Query, Power BI and DAX to create an interactive KPI dashboard and understand how businesses use data for reporting and decision-making.",
      },
      {
        title: "Build and Evaluate Machine Learning Models",
        body: "Create complete machine learning pipelines using scikit-learn and compare advanced models such as XGBoost, LightGBM and CatBoost.",
      },
      {
        title: "Build a Working RAG Assistant",
        body: "Learn how documents are converted into embeddings, stored in vector databases and retrieved to create an AI-powered question-answering system.",
      },
      {
        title: "Develop an AI SaaS Application",
        body: "Combine FastAPI, PostgreSQL, RAG pipelines, AI agents and Docker into a complete application that can be documented, deployed and presented as a portfolio project.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The syllabus is structured across four months, progressing from data fundamentals to advanced AI application development.",
    // Each month keeps the brief's own grouping headings in place as entries,
    // so the order and the wording are exactly as supplied.
    modules: [
      {
        title: "Month 1 — Data & Programming Foundations",
        points: [
          "Excel, Power BI & Data Literacy",
          "Advanced Excel",
          "Power Query",
          "Power BI",
          "DAX",
          "Business dashboards",
          "KPI reporting",
          "AI productivity",
          "Data literacy",
          "Python Fundamentals & Engineering Practices",
          "Python fundamentals",
          "VS Code",
          "Package management",
          "Object-oriented programming",
          "Exception handling",
          "Type hints",
          "pytest",
          "Ruff",
          "Black",
          "Git, GitHub & SQL Foundations",
          "Git",
          "GitHub",
          "Git Flow",
          "GitHub Copilot",
          "PostgreSQL",
          "Database design",
          "SQL queries",
          "Window functions",
          "Query optimisation",
          "APIs & Data Engineering",
          "APIs",
          "JSON",
          "FastAPI basics",
          "JWT",
          "Postman",
          "Pandas",
          "NumPy",
          "Polars",
          "DuckDB",
          "PyArrow",
        ],
      },
      {
        title: "Month 2 — Data Science, Machine Learning & Deep Learning",
        points: [
          "EDA, Visualisation & Statistics",
          "Data cleaning",
          "Feature engineering",
          "Exploratory data analysis",
          "Statistics",
          "Probability",
          "Data preprocessing",
          "Plotly",
          "Streamlit",
          "Machine Learning Foundations",
          "Machine learning concepts",
          "scikit-learn",
          "Pipelines",
          "Cross-validation",
          "Model evaluation",
          "Gradient Boosting & Model Tuning",
          "XGBoost",
          "LightGBM",
          "CatBoost",
          "Hyperparameter optimisation",
          "Model comparison",
          "Deep Learning Fundamentals",
          "Neural networks",
          "PyTorch",
          "Tensor operations",
          "Deep learning fundamentals",
        ],
      },
      {
        title: "Month 3 — Computer Vision, LLMs & Vector Search",
        points: [
          "Computer Vision & Transformers",
          "CNNs",
          "Transfer learning",
          "Computer vision",
          "OpenCV",
          "Transformers",
          "Hugging Face",
          "Tokenizers",
          "LLM Fundamentals & Prompt Engineering",
          "LLM concepts",
          "Tokenisation",
          "Embeddings",
          "Attention mechanism",
          "Prompt engineering",
          "Structured prompting",
          "LLM APIs & Model Access",
          "OpenAI API",
          "Gemini API",
          "Claude API",
          "Grok API",
          "Ollama",
          "LiteLLM",
          "Embeddings & Vector Databases",
          "Embeddings",
          "FAISS",
          "ChromaDB",
          "Pinecone",
          "Qdrant",
          "Milvus",
          "Semantic search",
        ],
      },
      {
        title: "Month 4 — RAG, Agents, Deployment & Capstone",
        points: [
          "RAG Architecture & AI Agents",
          "RAG architecture",
          "Hybrid search",
          "Guardrails",
          "LangChain",
          "LangGraph",
          "CrewAI",
          "MCP",
          "Tool calling",
          "AI agents",
          "Multi-agent systems",
          "AI Application Development",
          "Advanced FastAPI",
          "Async programming",
          "WebSockets",
          "Streamlit",
          "Gradio",
          "Chainlit",
          "Cloud Deployment & AI Security",
          "Docker",
          "Docker Compose",
          "AWS",
          "Azure AI",
          "Google Vertex AI",
          "CI/CD",
          "Prompt injection defence",
          "Responsible AI",
          "Industry Capstone Project",
          "FastAPI",
          "PostgreSQL",
          "RAG pipeline",
          "AI agents",
          "Docker",
          "Cloud deployment",
          "Documentation",
          "Professional GitHub portfolio",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the project-based training named in the highlights, and the capstone the
    // fourth month closes on.
    practical: {
      title: "Practical, Project-Based Training",
      body: "Every month ends in build work rather than revision — a Power BI dashboard and a SQL service in month one, an ML pipeline in month two, a vision build and a RAG assistant in month three, and the deployed AI SaaS capstone in month four.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have moved from Excel and SQL fundamentals through machine learning, deep learning, LLMs, RAG and agents to a deployed application, with six projects and a professional GitHub portfolio.",
    },
  },

  tools: {
    title: "Tools You Will Actually Work With",
    // The brief lists the forty-two names but writes no line for each; every
    // line below is that tool's own job in the curriculum above.
    items: [
      { name: "Microsoft Excel", body: "Business reporting and the first dashboards." },
      { name: "Power Query", body: "Clean and reshape data before it reaches a report." },
      { name: "Power BI", body: "Data models, DAX measures and KPI dashboards." },
      { name: "Python", body: "The language the rest of the programme is built in." },
      { name: "VS Code", body: "Where the code is written, run and debugged." },
      { name: "PostgreSQL", body: "Relational database design and querying." },
      { name: "Git & GitHub", body: "Version control and the portfolio employers read." },
      { name: "GitHub Copilot", body: "AI assistance inside the editor." },
      { name: "Pandas", body: "Load, clean and reshape tabular data." },
      { name: "NumPy", body: "Numerical arrays underneath the analysis." },
      { name: "Polars", body: "Fast dataframes for larger datasets." },
      { name: "DuckDB", body: "Analytical SQL directly over local files." },
      { name: "PyArrow", body: "Columnar data interchange between tools." },
      { name: "scikit-learn", body: "Pipelines, cross-validation and model evaluation." },
      { name: "XGBoost", body: "Gradient boosting for tabular problems." },
      { name: "LightGBM", body: "A faster boosting alternative to compare against." },
      { name: "CatBoost", body: "Boosting that handles categorical features directly." },
      { name: "PyTorch", body: "Tensors, neural networks and deep learning." },
      { name: "OpenCV", body: "Image processing behind the vision project." },
      { name: "Hugging Face", body: "Transformers, tokenizers and pretrained models." },
      { name: "OpenAI", body: "One of the model APIs behind the AI applications." },
      { name: "Gemini", body: "A second provider in the same patterns." },
      { name: "Claude", body: "A third provider, for comparison and structured work." },
      { name: "Grok", body: "A fourth API surface to work against." },
      { name: "Ollama", body: "Run local models on your own machine." },
      { name: "LiteLLM", body: "One interface across several model providers." },
      { name: "FAISS", body: "Similarity search over embeddings at speed." },
      { name: "ChromaDB", body: "A lightweight vector store for local RAG work." },
      { name: "Pinecone", body: "A hosted vector database for semantic search." },
      { name: "Qdrant", body: "Vector search with filtering and payloads." },
      { name: "Milvus", body: "Vector storage at larger scale." },
      { name: "FastAPI", body: "Serve models and RAG pipelines behind an API." },
      { name: "Streamlit", body: "Turn an analysis into an interactive app." },
      { name: "Gradio", body: "Quick interfaces for model demos." },
      { name: "Chainlit", body: "Chat interfaces for LLM applications." },
      { name: "LangChain", body: "Chains, tools and the glue around model calls." },
      { name: "LangGraph", body: "Agent graphs, state and conditional routing." },
      { name: "CrewAI", body: "Multi-agent orchestration and task delegation." },
      { name: "Docker", body: "Package the finished application for deployment." },
      { name: "AWS", body: "Cloud hosting for the deployed capstone." },
      { name: "Azure AI", body: "A second cloud AI platform to compare." },
      { name: "Google Vertex AI", body: "Managed model training and serving." },
    ],
  },

  who: {
    title: "Who Can Do This Course",
    items: [
      {
        title: "Students Straight Out of 12th",
        body: "Students from different academic streams can begin with the fundamentals and gradually move into Python, analytics and AI development.",
        icon: "users",
      },
      {
        title: "Students With a Gap Before College",
        body: "Use the months after school to build practical technical skills, complete projects and create a portfolio before starting your degree.",
        icon: "calendar",
      },
      {
        title: "Commerce & Arts Students",
        body: "You do not need to already be an advanced programmer. The programme starts with fundamentals and introduces statistics and programming progressively.",
        icon: "sparkles",
      },
      {
        title: "Degree Students Who Want a Head Start",
        body: "Students entering BCA, BBA, B.Sc or related programmes can use the course to develop practical data and AI skills alongside their academic studies.",
        icon: "certificate",
      },
      {
        title: "Students Exploring Data & AI",
        body: "If you are unsure whether Data Science is the right career path, a four-month structured programme gives you an opportunity to experience analytics, machine learning and AI development through practical work.",
        icon: "search",
      },
      {
        title: "Self-Taught Learners",
        body: "If you have learned from scattered tutorials but lack complete projects, structured training and trainer feedback can help you turn individual skills into a portfolio.",
        icon: "terminal",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Four Months",
    items: [
      {
        title: "Excel, Power BI & Data Literacy",
        body: "Start with practical business reporting using Excel, Power Query, Power BI, DAX and KPI dashboards.",
        icon: "chart",
      },
      {
        title: "Python & SQL",
        body: "Develop strong programming and database fundamentals that support analytics, machine learning and application development.",
        icon: "terminal",
      },
      {
        title: "Data Engineering & Machine Learning",
        body: "Work with Pandas, NumPy, Polars, DuckDB and PyArrow before building machine learning pipelines with scikit-learn and gradient-boosting models.",
        icon: "layers",
      },
      {
        title: "Deep Learning & Computer Vision",
        body: "Understand neural networks, PyTorch, CNNs, transfer learning and OpenCV through practical projects.",
        icon: "sparkles",
      },
      {
        title: "LLMs, RAG & AI Agents",
        body: "Go beyond basic AI prompts and learn embeddings, vector databases, RAG architecture, AI agents and modern orchestration frameworks.",
        icon: "cube",
      },
      {
        title: "Cloud Deployment & Capstone",
        body: "Learn Docker, cloud deployment, CI/CD and AI security before completing an end-to-end AI SaaS application.",
        icon: "cloud",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "One Fast Track From Data to AI Applications",
    paragraphs: [
      "In four focused months, move from Excel and SQL fundamentals to machine learning, deep learning, LLMs, RAG, AI agents and cloud deployment.",
      "Instead of finishing with only certificates and notes, the programme is designed around practical projects that can become part of your portfolio.",
    ],
    // The brief writes no list here; these four are its own months, one each.
    listTitle: "The fast track, month by month",
    items: [
      { title: "Month 1 — Foundations", body: "Excel, Power BI, Python, Git, SQL and the data engineering stack." },
      { title: "Month 2 — Models", body: "EDA, statistics, scikit-learn, gradient boosting and PyTorch." },
      { title: "Month 3 — Vision & LLMs", body: "CNNs, transformers, embeddings and vector databases." },
      { title: "Month 4 — Applications", body: "RAG, agents, FastAPI, Docker, cloud and the AI SaaS capstone." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with a course counsellor settles eligibility, batch timings, fees and where this leads — before you commit four months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Get Certified in Data Science",
    intro:
      "Complete the programme with practical projects and receive a course completion certificate. Your project work can also be organised into a professional portfolio for interviews, internships and future applications.",
    items: [
      {
        icon: "certificate",
        title: "Industry Certificate",
        body: "Demonstrate completion of structured Data Science and AI training.",
      },
      {
        icon: "layers",
        title: "Project Portfolio",
        body: "Build multiple practical projects that can be presented during interviews.",
      },
      {
        icon: "cube",
        title: "Capstone Project",
        body: "Complete an end-to-end AI application as the final project.",
      },
      {
        icon: "briefcase",
        title: "Placement Support",
        body: "Get support with CV preparation, interview practice and career guidance.",
      },
    ],
  },

  takesYou: {
    title: "What Job Roles Can You Explore?",
    intro:
      "Depending on your skills, portfolio and further experience, potential career paths include:",
    listTitle: "Roles this programme prepares you for",
    // The brief names the ten roles without descriptions; each line below is
    // that role's own work within the stack taught above.
    steps: [
      { title: "Junior Data Analyst", body: "Clean, query and report on business datasets." },
      { title: "Data Science Intern", body: "Support analysis and modelling work under supervision." },
      { title: "Junior Data Scientist", body: "Build and evaluate models against real problems." },
      { title: "Machine Learning Intern", body: "Assist with pipelines, features and experiments." },
      { title: "AI/ML Intern", body: "Work across classical ML and modern AI tooling." },
      { title: "Python Developer", body: "Write the services and automation around the data." },
      { title: "AI Application Developer", body: "Build LLM and RAG applications end to end." },
      { title: "Junior Machine Learning Engineer", body: "Take models from notebook to deployment." },
      { title: "Generative AI Developer", body: "Work with model APIs, embeddings and retrieval." },
      { title: "AI Automation Developer", body: "Connect agents and tools into working workflows." },
    ],
  },

  projects: {
    title: "Hands-On Projects You Will Ship",
    // Each project keeps the brief's own month-and-stack line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Business KPI Dashboard",
        body: "Create an interactive Power BI dashboard using Power Query transformations and DAX measures to present important business KPIs. Month 1 · Power BI · DAX",
      },
      {
        title: "SQL Data Service With FastAPI",
        body: "Design a PostgreSQL database, write advanced SQL queries and expose selected functionality through a FastAPI application. Month 1 · PostgreSQL · FastAPI",
      },
      {
        title: "End-to-End Machine Learning Pipeline",
        body: "Clean and analyse a real-world dataset using Pandas and Polars, then build and evaluate machine learning models using scikit-learn and advanced boosting techniques. Month 2 · scikit-learn · XGBoost",
      },
      {
        title: "Computer Vision Build",
        body: "Develop a computer vision project using PyTorch, CNNs, transfer learning and OpenCV. Month 3 · PyTorch · OpenCV",
      },
      {
        title: "RAG Assistant Over Documents",
        body: "Create an AI assistant that processes documents, generates embeddings, retrieves relevant information from a vector database and produces responses through an LLM. Months 3–4 · LangChain · Vector Database",
      },
      {
        title: "Industry AI SaaS Capstone",
        body: "Develop a complete AI application combining FastAPI, PostgreSQL, RAG, AI agents and Docker, with deployment documentation and a professional GitHub presentation. Month 4 · AI SaaS · Capstone",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Make It Yours.",
    paragraphs: ["Every project follows a simple learning cycle."],
    items: [
      {
        title: "Understand",
        body: "Understand the requirement, break it into smaller tasks and choose the right tools.",
        icon: "layers",
      },
      {
        title: "Build",
        body: "Develop the project hands-on with guidance and trainer feedback.",
        icon: "cube",
      },
      {
        title: "Present",
        body: "Explain your approach, demonstrate the final project and turn your work into a portfolio story.",
        icon: "briefcase",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Students Choose techcadd",
    // The brief writes no lead-in for this block; this states what its six
    // points have in common.
    intro:
      "Practical, beginner-friendly training on a current stack, structured so every stage ends in portfolio work.",
    items: [
      {
        title: "Trainers Focused on Practical Learning",
        body: "Learn through practical examples, exercises and projects rather than relying only on theoretical lessons.",
        icon: "users",
      },
      {
        title: "Designed for Beginners",
        body: "The programme starts with fundamentals so students coming directly after 12th can gradually build their technical confidence.",
        icon: "sparkles",
      },
      {
        title: "Classical Data Science + Modern AI",
        body: "Learn traditional machine learning alongside LLMs, RAG, vector databases and AI agents.",
        icon: "layers",
      },
      {
        title: "Current Technology Stack",
        body: "Work with modern tools used across data analytics, machine learning and AI application development.",
        icon: "terminal",
      },
      {
        title: "Real API-Based AI Learning",
        body: "Understand how AI applications work with model APIs, local models, embeddings, vector databases and application frameworks.",
        icon: "cloud",
      },
      {
        title: "Portfolio-Focused Training",
        body: "The programme is structured around projects so that you can finish with practical work to demonstrate during internships and interviews.",
        icon: "briefcase",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro:
      "Other career-focused programmes at techcadd for students starting straight after school.",
    // The longer Data Science track uses the slug the After 12th menu reserves
    // for it in `@/lib/site`; the other three are live pages.
    items: [
      {
        title: "After 12th 6-Month Data Science Program",
        body: "A deeper learning path covering the complete data science and AI development journey with additional time for advanced projects.",
        href: "/after-12th/data-science-certificate-program",
      },
      {
        title: "After 12th Data Analytics Program",
        body: "Focus on Excel, SQL, Power BI, Python and business reporting for students interested in analytics careers.",
        href: "/courses/after12th/data-analytics",
      },
      {
        title: "After 12th MERN Stack Program",
        body: "Learn MongoDB, Express.js, React and Node.js to build modern full-stack web applications.",
        href: "/courses/after12th/mern-full-stack",
      },
      {
        title: "Data Science Course",
        body: "A professional Data Science pathway for learners looking to develop practical skills in analytics, machine learning and AI.",
        href: "/courses/course/data-science",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the Data Science programme after 12th?",
      a: "The fast-track programme is designed to be completed in four months, covering data fundamentals, Python, SQL, machine learning, deep learning, LLMs, RAG, AI agents, deployment and a final capstone.",
    },
    {
      q: "Can I join after 12th without coding experience?",
      a: "Yes. The programme begins with foundational concepts before progressing into Python, SQL and advanced AI technologies.",
    },
    {
      q: "Does my academic stream matter?",
      a: "Students from different streams can explore the programme. The curriculum introduces programming, statistics and data science progressively.",
    },
    {
      q: "Does the course include Generative AI and LLMs?",
      a: "Yes. The programme covers LLM fundamentals, prompt engineering, model APIs, embeddings, vector databases, RAG, AI agents and related application-development tools.",
    },
    {
      q: "How is the 4-month programme different from a 6-month programme?",
      a: "The four-month programme is a fast-track route covering the core data science and AI development stack. A longer programme can provide additional time for deeper learning, more practice and advanced projects.",
    },
    {
      q: "Which vector databases will I learn?",
      a: "The curriculum includes FAISS, ChromaDB, Pinecone, Qdrant and Milvus, along with embeddings and semantic search.",
    },
    {
      q: "How many projects will I build?",
      a: "The programme includes multiple hands-on projects across dashboards, SQL, machine learning, computer vision, RAG and a final AI SaaS capstone.",
    },
    {
      q: "What is the industry capstone?",
      a: "The capstone brings together the major technologies taught during the programme into one complete AI application using technologies such as FastAPI, PostgreSQL, RAG, AI agents and Docker.",
    },
    {
      q: "Is AI security included?",
      a: "Yes. The programme introduces topics including prompt injection defence, responsible AI and deployment-related security considerations.",
    },
    // The brief asks and answers these two under their own headings rather than
    // in the FAQ list; they are questions, so they run with the rest.
    {
      q: "Do You Need Maths or a Science Stream?",
      a: "No advanced school-level mathematics is assumed at the beginning. Statistics and probability are introduced progressively alongside the data science and machine learning concepts where they are needed.",
    },
    {
      q: "Can You Freelance With Data Science Skills?",
      a: "Yes, the skills can support freelance work such as dashboard development, data cleaning, reporting automation, Python data processing, AI chatbot development and RAG-based applications. Building a strong portfolio is important before taking on professional projects.",
    },
    {
      q: "What is the fee for the 4-month Data Science programme in Mohali?",
      a: "Course fees can vary by batch and training mode. Contact the Mohali counselling team for the current fee, batch schedule and available payment options.",
    },
    {
      q: "Is placement guaranteed?",
      a: "Placement support does not mean guaranteed employment. Career outcomes depend on your skills, project portfolio, interview performance and the opportunities available at the time of application.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Yes, students who successfully complete the programme can receive a course completion certificate, subject to the institute's current certification requirements.",
    },
    {
      q: "Are weekend and evening batches available?",
      a: "Batch availability can change according to current schedules. Contact the Mohali team for the latest weekday, evening and weekend options.",
    },
  ],

  enquiry: {
    title: "Ask About Data Science Program in Mohali",
    // The brief's contact block leaves email and phone blank; the page already
    // renders the centre's real details, so only the two lines it fills in are
    // carried here.
    paragraphs: [
      "Have questions about the course, curriculum, fees, batch timings or career options? Speak with a course counsellor to understand whether this four-month Data Science programme matches your goals.",
      "Location: Mohali, Punjab. Counselling hours: Monday – Saturday, 9:00 AM – 7:00 PM.",
    ],
  },

  fit: {
    title: "Not Sure If Data Science Program Is the Right Fit?",
    paragraphs: [
      "A quick conversation with a course advisor can help you understand the curriculum, learning path, course duration and career options before you enrol.",
      "By the end of the programme, you can develop a broader understanding of the modern data and AI workflow — from collecting and cleaning data to training models and deploying AI applications.",
    ],
    ctaTitle: "You will work with",
    points: [
      "Python-based data analysis",
      "SQL and databases",
      "Data engineering tools",
      "Machine learning",
      "Deep learning",
      "Computer vision",
      "LLM applications",
      "Vector databases",
      "RAG systems",
      "AI agents",
      "FastAPI",
      "Docker",
      "Cloud AI platforms",
      "AI security",
      "GitHub portfolio development",
    ],
  },
};

const cyberSecurity: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Future scope" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "Best After 12th 3-Month Cyber Security Program in Mohali",
    paragraphs: [
      "A fast-paced three-month programme designed to take beginners from cybersecurity fundamentals to hands-on networking, ethical hacking, web security, SOC and SIEM, cloud security, Python automation, and AI-powered security projects — with career and placement preparation built into the final stage.",
    ],
  },

  program: {
    title: "Cyber Security Program in Mohali",
    paragraphs: [
      "Build practical cybersecurity skills through a structured 3-month programme designed for students after 12th, beginners, degree students, IT support professionals, and career switchers.",
      "Learn networking and system administration, Linux, ethical hacking, web application security, vulnerability assessment, SOC and SIEM fundamentals, cloud security, Python automation, and AI-assisted cybersecurity.",
      "The programme includes hands-on labs, mini projects, and an AI-powered cybersecurity capstone that can become part of your portfolio.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "3 Months" },
      { label: "Mode", value: "Classroom & 1-on-1" },
      { label: "Eligibility", value: "12th Pass" },
      { label: "Hands-on", value: "Labs, mini projects & capstone" },
      { label: "Includes", value: "Placement & interview preparation" },
      { label: "Focus", value: "Cybersecurity + Ethical Hacking + SOC + AI" },
    ],
  },

  overview: {
    title: "Course Overview",
    // The brief's three month blocks keep their own headings, joined to the
    // paragraphs that follow each one.
    paragraphs: [
      "This three-month AI-Powered Cyber Security Program in Mohali is designed for students who want to enter the cybersecurity field with practical skills instead of only theoretical knowledge.",
      "Month 1 — Cybersecurity, Networking & System Administration: Start with the fundamentals of cybersecurity, including the CIA triad, security domains, common cyber attacks, cybersecurity careers, cyber laws and ethics. Move into computer hardware and operating systems, Windows and Linux administration, user and group management, file permissions, and system configuration. Networking is covered from the ground up, including OSI and TCP/IP models, IPv4 and IPv6, IP addressing, subnetting, routing and switching, DNS, DHCP, NAT, VPNs, ports and protocols. You will also work with VMware Workstation and VirtualBox to install Kali Linux and Windows Server and create a controlled cybersecurity lab. Git and GitHub are introduced for version control and project documentation. AI tools such as ChatGPT, Google Gemini and GitHub Copilot are also introduced for cybersecurity research, productivity and learning. Mini projects: Cybersecurity lab setup, secure Linux installation, network documentation and password policy implementation.",
      "Month 2 — Ethical Hacking, Web Security & SOC: The second month moves into practical security testing. Learn information gathering through OSINT, DNS enumeration, subdomain discovery and other reconnaissance techniques. Work with tools such as Nmap, Wireshark, Nikto, Gobuster and Nuclei for vulnerability assessment. Web application security covers HTTP/HTTPS, cookies, sessions, APIs and the OWASP Top 10, including concepts around SQL injection, XSS, CSRF, authentication weaknesses and file upload vulnerabilities. Use Burp Suite for web security testing through Proxy, Target, Repeater, Intruder, Decoder and Comparer. The defensive side introduces Security Operations Centre concepts, monitoring, log analysis, incident response and SIEM fundamentals using platforms such as Wazuh and Splunk. AI-assisted security topics include AI-supported vulnerability analysis, report generation, log analysis, threat detection and security analytics. Mini projects: DVWA assessment, OWASP Juice Shop assessment, vulnerability assessment report and AI-assisted log analyser.",
      "Month 3 — Advanced Security, Cloud, Python & AI Automation: The final month introduces advanced security concepts including Metasploit Framework, password attack concepts, wireless security, Active Directory fundamentals and privilege escalation concepts. Learn cloud security fundamentals across AWS and Azure, including IAM, security groups and basic container security concepts involving Docker and Kubernetes. Python is introduced for cybersecurity automation, including automation scripts, API interaction, log parsing and report generation. You will then explore AI security automation using APIs from OpenAI and Google Gemini to create practical security solutions. The programme concludes with an industry-style capstone project and placement preparation covering resumes, GitHub portfolios, LinkedIn optimisation, cybersecurity interview questions, technical interviews, HR interviews and practical mock rounds.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    // The brief numbers its four outcomes but writes no lead-in; this states
    // its own arrangement in a sentence.
    intro:
      "Four practical outcomes, each built in a controlled environment — your own lab, an authorised web assessment, a SOC workflow and an AI-assisted security project.",
    items: [
      {
        title: "Build Your Own Cybersecurity Lab",
        body: "Set up a controlled virtual environment using VMware or VirtualBox with Kali Linux and Windows Server. Use this lab for later networking and security exercises.",
      },
      {
        title: "Perform Web Security Assessments",
        body: "Work with deliberately vulnerable applications such as DVWA and OWASP Juice Shop to understand web vulnerabilities and practise security testing using Burp Suite.",
      },
      {
        title: "Understand SOC & SIEM Operations",
        body: "Learn how security teams monitor systems, analyse logs, investigate suspicious activity and respond to incidents using platforms such as Wazuh and Splunk.",
      },
      {
        title: "Build an AI-Powered Security Project",
        body: "Develop an AI-assisted cybersecurity solution such as a security assistant, threat-analysis tool, log analyser, SOC dashboard or vulnerability-analysis application.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    // The brief writes no lead-in for the curriculum; this names the three
    // months it is actually divided into.
    intro:
      "Three months, three stages — fundamentals, networking and the lab; then testing, web security and the SOC; then advanced security, cloud, Python, AI automation and the capstone.",
    // Each month keeps the brief's own grouping headings in place as entries,
    // so the order and the wording are exactly as supplied.
    modules: [
      {
        title: "Month 1 — Cybersecurity, Networking & System Administration",
        points: [
          "Cybersecurity Fundamentals",
          "Introduction to cybersecurity",
          "CIA triad",
          "Cybersecurity domains",
          "Common cyber attacks",
          "Cybersecurity career paths",
          "Cyber laws and ethics",
          "Computer & Operating Systems",
          "Computer hardware basics",
          "Operating systems",
          "Windows administration",
          "Linux administration",
          "User and group management",
          "File system permissions",
          "Networking Fundamentals",
          "OSI model",
          "TCP/IP model",
          "IPv4 and IPv6",
          "IP addressing",
          "Subnetting",
          "Routing and switching",
          "DNS",
          "DHCP",
          "NAT",
          "VPN",
          "Common ports and protocols",
          "Virtualization",
          "VMware Workstation",
          "VirtualBox",
          "Kali Linux installation",
          "Windows Server installation",
          "Cybersecurity lab setup",
          "Git & GitHub",
          "Git installation",
          "Git commands",
          "Branching",
          "Version control",
          "GitHub workflow",
          "AI for Cybersecurity",
          "Introduction to AI",
          "ChatGPT for cybersecurity",
          "Google Gemini",
          "GitHub Copilot",
          "Prompt engineering",
          "AI research techniques",
          "Mini Projects",
          "Home cybersecurity lab setup",
          "Secure Linux installation",
          "Network documentation",
          "Password policy implementation",
        ],
      },
      {
        title: "Month 2 — Ethical Hacking, Web Security & Security Operations",
        points: [
          "Information Gathering",
          "OSINT fundamentals",
          "Search techniques",
          "WHOIS",
          "DNS enumeration",
          "Subdomain enumeration",
          "Vulnerability Assessment",
          "Nmap",
          "Wireshark",
          "Nikto",
          "Gobuster",
          "Nuclei",
          "Web Security",
          "HTTP and HTTPS",
          "Cookies and sessions",
          "APIs",
          "OWASP Top 10",
          "SQL injection concepts",
          "XSS concepts",
          "CSRF concepts",
          "Authentication and session security",
          "File upload vulnerabilities",
          "Burp Suite",
          "Proxy",
          "Target",
          "Repeater",
          "Intruder",
          "Decoder",
          "Comparer",
          "Security Operations Centre",
          "SOC fundamentals",
          "Security monitoring",
          "Log analysis",
          "Incident lifecycle",
          "SIEM fundamentals",
          "Wazuh",
          "Splunk basics",
          "AI-Assisted Security",
          "AI vulnerability analysis",
          "AI-assisted report generation",
          "AI log analysis",
          "AI threat detection",
          "AI security analytics",
          "Mini Projects",
          "DVWA security assessment",
          "OWASP Juice Shop assessment",
          "Vulnerability assessment report",
          "AI-assisted log analyser",
        ],
      },
      {
        title: "Month 3 — Advanced Security, Cloud, Python & AI Automation",
        points: [
          "Advanced Ethical Hacking",
          "Metasploit Framework",
          "Password attack concepts",
          "Wireless security",
          "Active Directory basics",
          "Privilege escalation concepts",
          "Cloud Security",
          "AWS security fundamentals",
          "Azure security fundamentals",
          "IAM",
          "Security groups",
          "Docker security basics",
          "Kubernetes security concepts",
          "Python Security Automation",
          "Python fundamentals",
          "Security automation scripts",
          "API automation",
          "Log parsing",
          "Report automation",
          "AI Security Automation",
          "OpenAI API",
          "Google Gemini API",
          "AI security assistant",
          "AI security chatbot",
          "AI threat intelligence",
          "AI-assisted incident response",
          "Industry Capstone Project",
          "Choose a project such as:",
          "AI SOC dashboard",
          "AI vulnerability-analysis tool",
          "AI security assistant",
          "AI threat detection platform",
          "AI phishing detection tool",
          "Placement Preparation",
          "ATS-friendly resume",
          "GitHub portfolio",
          "LinkedIn optimisation",
          "Personal branding",
          "Cybersecurity interview questions",
          "Technical mock interviews",
          "HR mock interviews",
          "Practical interview rounds",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the labs and mini projects named in the highlights, and the capstone the
    // third month closes on.
    practical: {
      title: "Hands-on Labs & Mini Projects",
      body: "Every month ends in lab work rather than revision — the lab build and network documentation in month one, authorised DVWA and Juice Shop assessments in month two, and the AI-powered capstone in month three.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have built a controlled lab, assessed authorised targets, worked a SOC and SIEM workflow, automated tasks with Python and shipped an AI-assisted security project.",
    },
  },

  tools: {
    title: "Tools You Will Actually Work With",
    intro:
      "The programme introduces learners to tools and platforms used across cybersecurity labs, security testing, monitoring, automation and AI-assisted security workflows.",
    // The brief lists the thirty-one names but writes no line for each; every
    // line below is that tool's own job in the curriculum above.
    items: [
      { name: "Kali Linux", body: "The lab's testing distribution." },
      { name: "Windows Server", body: "The second lab machine, for administration and AD basics." },
      { name: "VMware Workstation", body: "Host the controlled lab environment." },
      { name: "VirtualBox", body: "The alternative hypervisor for the same lab." },
      { name: "Git & GitHub", body: "Version control and project documentation." },
      { name: "Nmap", body: "Host discovery and service enumeration on authorised targets." },
      { name: "Wireshark", body: "Read traffic at the packet level." },
      { name: "Nikto", body: "Scan web servers for known issues." },
      { name: "Gobuster", body: "Directory and subdomain enumeration." },
      { name: "Nuclei", body: "Template-driven vulnerability scanning." },
      { name: "Burp Suite", body: "Proxy, Repeater, Intruder and the rest of the web testing workflow." },
      { name: "Metasploit", body: "Framework concepts, used in the lab only." },
      { name: "Hydra", body: "Password attack concepts against lab systems." },
      { name: "Wazuh", body: "SIEM monitoring, alerts and log analysis." },
      { name: "Splunk", body: "Log search and security analytics basics." },
      { name: "Python", body: "Automate scripts, parse logs and generate reports." },
      { name: "AWS", body: "Cloud security fundamentals, IAM and security groups." },
      { name: "Azure", body: "The second cloud platform for the same concepts." },
      { name: "Docker", body: "Container security basics." },
      { name: "Kubernetes", body: "Orchestration security concepts." },
      { name: "DVWA", body: "A deliberately vulnerable app for authorised practice." },
      { name: "OWASP Juice Shop", body: "A second intentionally vulnerable target." },
      { name: "TryHackMe", body: "Guided rooms for structured practice." },
      { name: "Hack The Box", body: "Lab machines for applied practice." },
      { name: "PortSwigger Web Security Academy", body: "Web security labs from the Burp authors." },
      { name: "OverTheWire", body: "Wargames for Linux and networking fundamentals." },
      { name: "ChatGPT", body: "Research, explanation and report drafting." },
      { name: "Google Gemini", body: "A second assistant for the same work." },
      { name: "GitHub Copilot", body: "AI assistance while writing automation." },
      { name: "OpenAI API", body: "Build the AI security assistant." },
      { name: "Gemini API", body: "The alternative API behind the same project." },
    ],
  },

  who: {
    title: "Who Can Do This Course",
    items: [
      {
        title: "Students Straight Out of 12th",
        body: "Students from any stream can start with the fundamentals and gradually move into networking, Linux, security testing, SOC and AI security.",
        icon: "users",
      },
      {
        title: "Students Taking a Gap or Summer Term",
        body: "A three-month programme can provide a structured introduction to cybersecurity before starting a degree such as BCA, B.Sc IT or another technology programme.",
        icon: "calendar",
      },
      {
        title: "Degree Students",
        body: "Students pursuing BCA, B.Sc IT, Computer Science or related programmes can use the course to gain practical exposure alongside their academic studies.",
        icon: "certificate",
      },
      {
        title: "Beginners Exploring Cybersecurity",
        body: "If you are interested in cybersecurity but are unsure where to start, the programme provides a structured path from fundamentals to hands-on projects.",
        icon: "search",
      },
      {
        title: "IT Support Professionals & Career Switchers",
        body: "People with experience in computers, networking or technical support can use the programme to develop cybersecurity-focused skills.",
        icon: "briefcase",
      },
      {
        title: "Self-Taught Learners",
        body: "If you have learned cybersecurity through videos, labs and online platforms but need a structured learning path, this programme brings the topics together into a guided curriculum.",
        icon: "terminal",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Three Months",
    items: [
      {
        title: "Strong Cybersecurity Fundamentals",
        body: "Learn cybersecurity concepts, operating systems and networking before moving into ethical hacking and security operations.",
        icon: "shield",
      },
      {
        title: "Ethical Hacking & Web Security",
        body: "Understand reconnaissance, vulnerability assessment, web application security and security testing in controlled environments.",
        icon: "target",
      },
      {
        title: "SOC & SIEM Fundamentals",
        body: "Learn security monitoring, log analysis, incident response and SIEM concepts using Wazuh and Splunk.",
        icon: "monitor",
      },
      {
        title: "AI in Cybersecurity",
        body: "Explore how AI can support vulnerability analysis, security research, log analysis, reporting and threat detection.",
        icon: "sparkles",
      },
      {
        title: "Python & Security Automation",
        body: "Use Python to automate repetitive security tasks, work with APIs, process logs and generate reports.",
        icon: "terminal",
      },
      {
        title: "Capstone & Career Preparation",
        body: "Finish with an AI-powered cybersecurity project and preparation for resumes, portfolios, interviews and entry-level opportunities.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Three Months to Build Practical Cybersecurity Skills",
    paragraphs: [
      "Cybersecurity is broader than ethical hacking alone. Modern security teams need people who understand networking, operating systems, web security, monitoring, cloud environments, automation and emerging AI tools.",
      "This programme brings those foundations together in a focused three-month learning path.",
    ],
    listTitle: "What the three months include",
    // The brief's own eight-item list, each with the line naming where it sits
    // in the curriculum above.
    items: [
      { title: "Hands-on cybersecurity labs", body: "A controlled VMware or VirtualBox environment you build yourself." },
      { title: "Multiple mini projects", body: "Four in month one and four in month two, before the capstone." },
      { title: "Web security practice", body: "DVWA and Juice Shop through Burp Suite, on authorised targets." },
      { title: "SOC and SIEM exposure", body: "Monitoring, log analysis and incident response with Wazuh and Splunk." },
      { title: "Python automation", body: "Scripts, API interaction, log parsing and report generation." },
      { title: "Cloud security fundamentals", body: "AWS and Azure IAM, security groups and container basics." },
      { title: "AI-powered security project", body: "The capstone — a SOC dashboard, assistant or detection tool." },
      { title: "Resume and interview preparation", body: "ATS resume, GitHub portfolio, LinkedIn and mock rounds." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with a course counsellor settles eligibility, batch timings, fees and where this leads — before you commit three months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Get Certified in Cyber Security Program",
    intro:
      "Complete the programme and receive course certification based on the training requirements and project work completed during the programme.",
    items: [
      {
        icon: "certificate",
        title: "Industry Course Certificate",
        body: "Document your successful completion of the Cyber Security Program.",
      },
      {
        icon: "layers",
        title: "Project Portfolio",
        body: "Build practical projects that can be presented during interviews and added to your professional portfolio.",
      },
      {
        icon: "cube",
        title: "Project Certificate",
        body: "Receive project documentation/certification where applicable based on programme completion.",
      },
      {
        icon: "briefcase",
        title: "Placement Support",
        body: "Get support with resume preparation, interview practice, portfolio development and relevant career opportunities.",
      },
    ],
  },

  takesYou: {
    title: "What Job Roles Can I Target?",
    intro:
      "Depending on your skills, qualifications and experience, potential entry-level paths can include:",
    listTitle: "Entry-level paths",
    // The brief names the eight roles without descriptions; each line below is
    // that role's own work within the stack taught above.
    steps: [
      { title: "SOC Analyst", body: "Monitor alerts, triage events and follow the incident lifecycle." },
      { title: "Junior Cybersecurity Analyst", body: "Support assessments, reporting and day-to-day security work." },
      { title: "Security Operations Intern", body: "Learn the SOC workflow alongside an experienced team." },
      { title: "IT Security Support", body: "Keep systems, accounts and endpoints configured safely." },
      { title: "Vulnerability Assessment Trainee", body: "Run authorised scans and write up what they find." },
      { title: "Junior Security Tester", body: "Test authorised web applications against the OWASP Top 10." },
      { title: "Network Security Trainee", body: "Apply networking and hardening fundamentals in practice." },
      { title: "Cybersecurity Intern", body: "Rotate across monitoring, assessment and documentation." },
    ],
  },

  projects: {
    title: "Hands-On Projects You Will Build",
    // Each project keeps the brief's own month-and-stack line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Home Cybersecurity Lab Setup",
        body: "Build a controlled virtual lab using Kali Linux and Windows Server on VMware or VirtualBox. Month 1 · Kali Linux · VMware",
      },
      {
        title: "Network Documentation & Hardening",
        body: "Document IP addressing, subnetting, DNS, DHCP and other network configurations while applying basic security practices to your lab. Month 1 · Networking",
      },
      {
        title: "DVWA & Juice Shop Security Assessments",
        body: "Work with deliberately vulnerable applications to understand web security concepts and practise authorised security testing using Burp Suite. Month 2 · Burp Suite",
      },
      {
        title: "Vulnerability Assessment Report",
        body: "Use tools such as Nmap and Nuclei in a controlled environment, analyse findings and create a structured security assessment report. Month 2 · Nmap · Nuclei",
      },
      {
        title: "AI-Assisted Log Analyser",
        body: "Explore Wazuh/Splunk logs and create an AI-assisted workflow for analysing and categorising security-related events. Month 2 · Wazuh · Splunk",
      },
      {
        title: "AI-Powered Cybersecurity Capstone",
        body: "Build a complete AI-assisted cybersecurity solution such as an AI SOC dashboard, security assistant, threat detection application or phishing detection tool. Month 3 · Python · AI APIs · Capstone",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Make It Yours.",
    paragraphs: ["Every project follows a simple three-stage workflow."],
    items: [
      {
        title: "Understand",
        body: "Understand the security requirement, identify the problem and select the appropriate tools.",
        icon: "search",
      },
      {
        title: "Build",
        body: "Work hands-on in a controlled environment while applying concepts through practical exercises.",
        icon: "cube",
      },
      {
        title: "Present",
        body: "Document your work, explain your approach and turn the project into a portfolio story that you can discuss during interviews.",
        icon: "briefcase",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Students Choose techcadd",
    intro:
      "Choosing a cybersecurity programme is about more than the syllabus. Practical lab access, trainer guidance, project work and career preparation all matter.",
    items: [
      {
        title: "Practical Learning",
        body: "The programme focuses on labs and projects so students can apply cybersecurity concepts instead of relying only on theory.",
        icon: "terminal",
      },
      {
        title: "Structured Learning Path",
        body: "The curriculum progresses from cybersecurity fundamentals and networking to ethical hacking, SOC, cloud, Python and AI security.",
        icon: "layers",
      },
      {
        title: "Controlled Security Labs",
        body: "Practice cybersecurity concepts only in authorised and deliberately vulnerable environments designed for learning.",
        icon: "shield",
      },
      {
        title: "AI-Integrated Cybersecurity",
        body: "AI tools and APIs are introduced as productivity and security-assistance technologies throughout the programme.",
        icon: "sparkles",
      },
      {
        title: "Project-Based Portfolio",
        body: "Students finish with multiple practical projects that can demonstrate their learning during interviews.",
        icon: "cube",
      },
      {
        title: "Career Preparation",
        body: "Resume development, GitHub portfolio guidance, LinkedIn optimisation and mock interviews help students prepare for entry-level opportunities.",
        icon: "briefcase",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore more career-focused programmes at techcadd.",
    // The two longer Cyber Security tracks use the slugs the After 12th menu
    // reserves for them in `@/lib/site`; the other three are live pages.
    items: [
      {
        title: "After 12th 9-Month Cyber Security Program",
        body: "A longer cybersecurity pathway for students who want deeper exposure to security operations, ethical hacking, cloud security and advanced cybersecurity topics.",
        href: "/after-12th/cyber-security-diploma-program",
      },
      {
        title: "After 12th 6-Month Cyber Security Program",
        body: "A focused cybersecurity programme combining fundamentals, security testing, SOC concepts, cloud and practical projects.",
        href: "/after-12th/cyber-security-certificate-program",
      },
      {
        title: "After 12th 3-Month Cloud Computing Program",
        body: "Learn cloud fundamentals and practical infrastructure concepts using platforms such as AWS and Azure.",
        href: "/courses/after12th/cloud-computing",
      },
      {
        title: "After 12th 3-Month MERN Stack Program",
        body: "Learn MongoDB, Express.js, React and Node.js through practical full-stack development projects.",
        href: "/courses/after12th/mern-full-stack",
      },
      {
        title: "Cybersecurity Course",
        body: "Explore cybersecurity training covering security fundamentals, ethical hacking, network security and security operations.",
        href: "/courses/course/cyber-security",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of this Cyber Security programme after 12th?",
      a: "The programme is designed to be completed in 3 months, covering cybersecurity fundamentals, networking, ethical hacking, web security, SOC and SIEM, cloud security, Python automation and AI-powered cybersecurity projects.",
    },
    {
      q: "Can I join straight after 12th with no cybersecurity background?",
      a: "Yes. The programme begins with fundamentals, networking and operating systems before moving into advanced topics.",
    },
    {
      q: "Is ethical hacking legal?",
      a: "Ethical hacking is legal only when you have explicit permission to test the target. Training activities should be performed on authorised labs, deliberately vulnerable applications or platforms designed for security practice.",
    },
    {
      q: "What will I practise on?",
      a: "Practical learning can use controlled environments and authorised training platforms such as DVWA, OWASP Juice Shop, TryHackMe, Hack The Box, PortSwigger Web Security Academy and OverTheWire.",
    },
    {
      q: "How is this different from a longer Cyber Security programme?",
      a: "The 3-month programme is a focused foundation designed to provide practical exposure quickly. A longer programme can provide additional time for advanced security domains, deeper projects and more extensive preparation.",
    },
    {
      q: "Can I upgrade to a longer programme later?",
      a: "Depending on the available programme structure, students can discuss progression into longer cybersecurity tracks with the course counsellor.",
    },
    {
      q: "How many projects will I build?",
      a: "The programme is structured around multiple mini projects and a final AI-powered cybersecurity capstone.",
    },
    {
      q: "What is the capstone project?",
      a: "The capstone is a larger project that combines cybersecurity concepts with Python and AI. Examples include an AI SOC dashboard, AI security assistant, threat detection solution or phishing detection application.",
    },
    {
      q: "Do I need to know Python before joining?",
      a: "No. Python fundamentals are introduced as part of the programme before moving into cybersecurity automation.",
    },
    {
      q: "Which tools and platforms are covered?",
      a: "The programme covers tools and platforms including Kali Linux, Nmap, Wireshark, Burp Suite, Nuclei, Wazuh, Splunk, Metasploit, Python, AWS, Azure, Docker, GitHub and AI APIs.",
    },
    // The brief asks and answers these four under the future-scope heading
    // rather than in the FAQ list; they are questions, so they run with the
    // rest.
    {
      q: "What will I be able to do after completing the programme?",
      a: "You will understand how to build a controlled cybersecurity lab, work with networking and Linux environments, perform basic security assessments on authorised targets, analyse logs, understand SOC workflows, use common cybersecurity tools, automate selected tasks with Python and develop an AI-assisted security project.",
    },
    {
      q: "Can I start cybersecurity after 12th?",
      a: "Yes. The programme starts with fundamentals, so students without previous cybersecurity experience can build their knowledge progressively.",
    },
    {
      q: "Is three months enough to become an expert?",
      a: "No. Three months is designed as a focused foundation and practical entry point. Becoming job-ready and progressing into advanced cybersecurity roles requires continued practice, projects, certifications and real-world experience.",
    },
    {
      q: "Can I freelance after this course?",
      a: "You can explore legitimate cybersecurity-related freelance services such as security documentation, basic security assessments and authorised testing, subject to your skills and the client's permission.",
    },
    {
      q: "What is the fee for the 3-month Cyber Security programme in Mohali?",
      a: "Fees can vary according to the current batch, training mode and programme structure. Contact the Mohali team for the latest fee and available payment options.",
    },
    {
      q: "Do you help with resumes and interviews?",
      a: "The programme includes career preparation such as ATS-friendly resume guidance, GitHub portfolio development, LinkedIn optimisation and mock interview preparation.",
    },
    {
      q: "Is placement guaranteed?",
      a: "Placement support and placement assistance do not mean a guaranteed job. Selection depends on your skills, performance, qualifications and employer requirements.",
    },
    {
      q: "Will I get a certificate?",
      a: "Students who successfully complete the programme can receive course certification according to the programme's completion requirements.",
    },
    {
      q: "Are weekend and evening batches available?",
      a: "Batch timings depend on the current schedule. Contact the Mohali team to confirm available weekday, evening or weekend batches.",
    },
  ],

  enquiry: {
    title: "Ask About Cyber Security Program",
    // The brief's contact block leaves email and phone blank; the page already
    // renders the centre's real details, so only the lines it fills in are
    // carried here.
    paragraphs: [
      "Have questions about course duration, fees, batch timings, eligibility, projects or career preparation? Speak with a course counsellor and understand whether the After 12th 3-Month Cyber Security Program in Mohali matches your goals.",
      "Location: Mohali, Punjab. Counselling hours: contact the Mohali team for current counselling timings.",
    ],
  },

  fit: {
    title: "Not Sure If Cyber Security Program Is Right for You?",
    paragraphs: [
      "One conversation with a course advisor can help you understand the syllabus, practical labs, projects, duration and progression options.",
      "After completing the programme, you can continue building towards entry-level cybersecurity and IT security roles.",
    ],
    ctaTitle: "You will have exposure to",
    points: [
      "Cybersecurity fundamentals",
      "Network security concepts",
      "Linux administration",
      "Vulnerability assessment",
      "Web application security",
      "Ethical hacking concepts",
      "SOC operations",
      "SIEM fundamentals",
      "Cloud security",
      "Python automation",
      "AI-assisted security workflows",
      "Security reporting",
      "Cybersecurity project development",
    ],
  },
};

const fullStackDevelopment: After12Page = {
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
    title: "Best After 12th 3-Month Full Stack Development Program in Mohali",
    paragraphs: [
      "Build the skills to create complete web applications from the ground up. This 3-month Full Stack Development Program in Mohali takes you through HTML, CSS, JavaScript, Python, Django, databases, APIs, AI-assisted development, and deployment-focused concepts through practical learning and portfolio projects.",
    ],
  },

  program: {
    title: "Full Stack Development Program in Mohali",
    paragraphs: [
      "Start your development journey after 12th with a structured programme designed for beginners. Learn front-end fundamentals, Python programming, Django, SQL, REST APIs, authentication, AI-assisted development, background tasks, payment integration, CI/CD concepts, and system design.",
      "The course focuses on building rather than simply watching tutorials. Each stage gives you practical work that can become part of your development portfolio.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "3 Months" },
      { label: "Mode", value: "Classroom & 1-on-1" },
      { label: "Eligibility", value: "12th Pass" },
      { label: "Learning Approach", value: "Practical + Project-Based" },
      { label: "Includes", value: "Placement Support" },
      { label: "Core Stack", value: "HTML, CSS, JavaScript, Python, Django, DRF and SQL" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "The Best After 12th 3-Month Full Stack Development Program in Mohali is structured to take a beginner from web fundamentals to backend development and API-based applications.",
      "You begin with HTML5, CSS3, Bootstrap and JavaScript before moving into Python programming and object-oriented concepts. The second phase introduces databases, SQL, Django and the Django ORM. The final phase focuses on Django REST Framework, JWT authentication, API documentation, LLM APIs, Celery, payments, CI/CD concepts and system design.",
      "The goal is simple: learn the technology, build with it, and finish with projects you can explain in an interview.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    intro: "The programme covers the complete development journey through eight core learning areas:",
    items: [
      {
        title: "Web Fundamentals, HTML5, CSS3 & Bootstrap",
        body: "Understand how modern websites are structured and create responsive layouts using HTML, CSS and Bootstrap.",
      },
      {
        title: "JavaScript & the DOM",
        body: "Learn JavaScript fundamentals and use the DOM to create interactive browser-based experiences.",
      },
      {
        title: "Python Programming & OOP",
        body: "Build a strong programming foundation with Python, functions, classes, objects, inheritance and other OOP concepts.",
      },
      {
        title: "Databases, SQL & Schema Design",
        body: "Learn how applications store and manage information using relational databases, SQL queries and structured schemas.",
      },
      {
        title: "Django, ORM & Advanced Django",
        body: "Develop server-side applications using Django, work with models and the ORM, and understand how larger Django applications are structured.",
      },
      {
        title: "AI-Assisted Development & Verification",
        body: "Use modern AI tools to support development, generate ideas and accelerate coding while learning how to review, test and verify generated output.",
      },
      {
        title: "Django REST Framework, JWT & API Documentation",
        body: "Create REST APIs, implement authentication with JWT and document APIs so they can be consumed by web and mobile applications.",
      },
      {
        title: "LLM APIs, Celery, Payments, CI/CD & System Design",
        body: "Explore API-based AI integrations, asynchronous background processing, payment workflows, deployment practices and fundamental system-design concepts.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The three-month curriculum gradually increases in technical depth, moving from front-end foundations to Python/Django development and finally to APIs, integrations and deployment concepts.",
    // Each month keeps the brief's own grouping headings in place as entries,
    // so the order and the wording are exactly as supplied.
    modules: [
      {
        title: "Month 1",
        points: [
          "Web Fundamentals, HTML5, CSS3 & Bootstrap",
          "Internet and web fundamentals",
          "HTML document structure",
          "Semantic HTML",
          "Forms and validation",
          "CSS selectors and properties",
          "Flexbox and responsive layouts",
          "Bootstrap components and grid system",
          "Responsive website development",
          "JavaScript & the DOM",
          "JavaScript fundamentals",
          "Variables, data types and operators",
          "Functions and arrays",
          "Objects",
          "Events",
          "DOM manipulation",
          "Form interactions",
          "Basic client-side validation",
          "Python Programming & OOP",
          "Python syntax and fundamentals",
          "Variables and data types",
          "Conditions and loops",
          "Functions",
          "Lists, tuples, sets and dictionaries",
          "Modules and packages",
          "Exception handling",
          "Classes and objects",
          "Inheritance and OOP fundamentals",
        ],
      },
      {
        title: "Month 2",
        points: [
          "Databases, SQL & Schema Design",
          "Relational database concepts",
          "Tables and relationships",
          "Primary and foreign keys",
          "SQL queries",
          "CRUD operations",
          "Joins",
          "Filtering and sorting",
          "Database normalization",
          "Schema planning",
          "Django, ORM & Advanced Django",
          "Django project structure",
          "Apps and settings",
          "URL routing",
          "Views and templates",
          "Models",
          "Django ORM",
          "Forms",
          "Authentication",
          "Admin panel",
          "Static and media files",
          "Application architecture",
          "AI-Assisted Development & Verification",
          "Learn how AI tools can support the development workflow without replacing fundamental programming knowledge. You will explore:",
          "AI-assisted coding",
          "Prompting for development tasks",
          "Code explanation and debugging",
          "Generating development ideas",
          "Reviewing AI-generated code",
          "Testing and verification",
          "Responsible use of AI in software development",
        ],
      },
      {
        title: "Month 3",
        points: [
          "Django REST Framework, JWT & API Documentation",
          "REST API fundamentals",
          "Serializers",
          "API views",
          "ViewSets and routers",
          "CRUD APIs",
          "JWT authentication",
          "Permissions",
          "API testing",
          "API documentation",
          "LLM APIs, Celery, Payments, CI/CD & System Design",
          "Working with LLM APIs",
          "API integration concepts",
          "Background jobs with Celery",
          "Task queues",
          "Payment integration concepts",
          "Environment variables",
          "Deployment workflow",
          "CI/CD fundamentals",
          "Application architecture",
          "Scalability and system-design basics",
          "Project & Placement Preparation",
          "Full-stack project development",
          "Git and GitHub portfolio",
          "Project documentation",
          "Resume preparation",
          "Interview preparation",
          "Technical discussion practice",
          "Portfolio presentation",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the project-based approach named in the highlights, and the capstone the
    // third month closes on.
    practical: {
      title: "Practical, Project-Based Learning",
      body: "Every stage gives you practical work rather than revision — a responsive site and a Python/database application in month one and two, then a Django app, a REST API and the full-stack capstone in month three.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have built the front end, the backend, the database and the API of a working application, with six projects and a GitHub portfolio to show for it.",
    },
  },

  tools: {
    title: "Tools You Will Work With",
    intro:
      "The programme introduces students to the tools commonly used throughout a modern Python/Django development workflow.",
    // The brief groups its tools under Development, Database & API, Development
    // Workflow and Modern Development; each line below names that tool's own
    // job, with its group kept in the wording.
    items: [
      { name: "Python", body: "Development — the language the backend is built in." },
      { name: "Django", body: "Development — models, views, templates and the ORM." },
      { name: "Django REST Framework", body: "Development — serializers, viewsets and REST APIs." },
      { name: "HTML5", body: "Development — document structure and semantic markup." },
      { name: "CSS3", body: "Development — selectors, Flexbox and responsive layout." },
      { name: "Bootstrap", body: "Development — components and the grid system." },
      { name: "JavaScript", body: "Development — the DOM, events and client-side validation." },
      { name: "SQL", body: "Database & API — queries, joins, filtering and CRUD." },
      { name: "PostgreSQL", body: "Database & API — the relational database behind the app." },
      { name: "REST APIs", body: "Database & API — the contract clients consume." },
      { name: "JWT", body: "Database & API — token authentication and permissions." },
      { name: "API documentation tools", body: "Database & API — document endpoints for consumers." },
      { name: "Git", body: "Development workflow — commits, branches and history." },
      { name: "GitHub", body: "Development workflow — the portfolio employers read." },
      { name: "VS Code", body: "Development workflow — where the code is written and debugged." },
      { name: "Postman", body: "Development workflow — test and inspect API requests." },
      { name: "Environment configuration", body: "Development workflow — secrets and per-environment settings." },
      { name: "LLM APIs", body: "Modern development — AI features inside the application." },
      { name: "AI-assisted coding tools", body: "Modern development — with review, testing and verification." },
      { name: "Celery", body: "Modern development — background jobs and task queues." },
      { name: "Payment APIs", body: "Modern development — payment integration concepts." },
      { name: "CI/CD concepts", body: "Modern development — the deployment workflow." },
      { name: "Deployment platforms", body: "Modern development — putting the application online." },
    ],
  },

  who: {
    title: "Who Can Join This Course?",
    items: [
      {
        title: "Students After 12th",
        body: "You can begin the programme immediately after completing 12th. The curriculum starts with fundamentals, so previous programming experience is not required.",
        icon: "users",
      },
      {
        title: "Graduates & Final-Year Students",
        body: "Students from BCA, B.Tech, BBA, B.Com, BA and other backgrounds can use the programme to develop practical software skills alongside their academic qualification.",
        icon: "certificate",
      },
      {
        title: "Career Switchers",
        body: "If you are moving from a non-technical field into software development, the structured curriculum gives you a step-by-step route from programming basics to full-stack application development.",
        icon: "refresh",
      },
      {
        title: "Freelancers",
        body: "Learn how front-end and backend technologies work together so you can take on a wider range of website and application-development projects.",
        icon: "briefcase",
      },
      {
        title: "Career Restarters",
        body: "If you have taken a career break, practical projects and a GitHub portfolio can help you demonstrate your current technical abilities to potential employers.",
        icon: "rocket",
      },
      {
        title: "Self-Taught Learners",
        body: "If you have learned development through scattered tutorials, this programme provides a structured curriculum, trainer guidance and project-based practice.",
        icon: "terminal",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Three Months",
    items: [
      {
        title: "Practical Learning",
        body: "Instead of spending the entire course on theory, you continuously apply concepts through coding exercises, application components and projects.",
        icon: "cube",
      },
      {
        title: "One Structured Learning Path",
        body: "Rather than jumping between unrelated technologies, the curriculum connects HTML, CSS and JavaScript with Python, Django, databases and APIs.",
        icon: "layers",
      },
      {
        title: "Portfolio Development",
        body: "Your projects give you tangible examples of your development skills that can be added to GitHub and discussed during interviews.",
        icon: "briefcase",
      },
      {
        title: "Modern Development Skills",
        body: "The programme also introduces AI-assisted development, LLM APIs, background processing, payments, API development and deployment concepts.",
        icon: "sparkles",
      },
      {
        title: "Trainer Guidance",
        body: "Getting feedback while building helps you identify mistakes earlier and understand why a particular development approach works.",
        icon: "users",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Why Learn Full Stack Development Now?",
    paragraphs: [
      "Modern applications are rarely built using a single technology. A developer may need to understand the user interface, backend logic, database, APIs, authentication and deployment workflow.",
      "That is why full-stack knowledge can be valuable for students who want broader development capabilities.",
      "The programme also introduces AI-assisted development so students can understand how modern developers use AI tools while still maintaining coding fundamentals, testing discipline and control over the final application.",
      "A certificate can show that you completed training. A working project can show what you actually know.",
    ],
    // The brief's own "What You Build Matters" list, each with the line naming
    // where it sits in the curriculum above.
    listTitle: "That is why the course emphasizes",
    items: [
      { title: "Coding practice", body: "Exercises and components at every stage, not only at the end." },
      { title: "Application development", body: "Django apps with models, forms and authentication." },
      { title: "API creation", body: "REST endpoints built and documented with DRF." },
      { title: "Database integration", body: "Schema design, SQL and the Django ORM." },
      { title: "Authentication", body: "Sessions, JWT tokens and permissions." },
      { title: "Project documentation", body: "Written up so the work can be explained." },
      { title: "GitHub portfolio development", body: "Repositories an interviewer can actually read." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with a course counsellor settles eligibility, batch timings, fees and where this leads — before you commit three months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Get Certified in Full Stack Development",
    intro:
      "Students who successfully complete the programme can receive course certification according to the training centre's current certification process. The learning journey can include:",
    items: [
      {
        icon: "certificate",
        title: "Course Certificate",
        body: "Recognition of successful completion of the Full Stack Development training programme.",
      },
      {
        icon: "layers",
        title: "Project Portfolio",
        body: "Practical projects that demonstrate your ability to work with the technologies covered during training.",
      },
      {
        icon: "briefcase",
        title: "Placement Support",
        body: "Assistance with resume preparation, interview practice and relevant job opportunities.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Can Take You",
    intro:
      "After developing strong fundamentals and completing practical projects, you can explore entry-level opportunities such as:",
    listTitle: "Roles this programme prepares you for",
    steps: [
      {
        title: "Full Stack Developer",
        body: "Work across front-end interfaces, backend services, databases and APIs.",
      },
      {
        title: "Backend Developer",
        body: "Focus on Python, Django, databases, REST APIs and server-side application development.",
      },
      {
        title: "Python Developer",
        body: "Use Python to build applications, automation workflows, APIs and backend systems.",
      },
      {
        title: "Django Developer",
        body: "Develop web applications and backend systems using Django and related technologies.",
      },
      {
        title: "API Developer",
        body: "Build, test and document APIs used by web, mobile and other software applications.",
      },
      {
        title: "Junior Software Developer",
        body: "Use your programming, database and application-development skills in an entry-level software role.",
      },
      {
        title: "Freelance Web Developer",
        body: "Use full-stack capabilities to build websites and custom web applications for clients.",
      },
    ],
  },

  projects: {
    title: "Hands-On Projects You Will Ship",
    // Each project keeps the brief's own "Skills:" line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Responsive Web Application",
        body: "Build a responsive website using HTML5, CSS3, Bootstrap and JavaScript. Skills: HTML5 · CSS3 · Bootstrap · JavaScript",
      },
      {
        title: "Python & Database Application",
        body: "Create an application that uses Python with structured database operations and SQL. Skills: Python · SQL · Database Design",
      },
      {
        title: "Django Web Application",
        body: "Develop a Django-based application with models, authentication, forms and database integration. Skills: Django · ORM · SQL · Authentication",
      },
      {
        title: "REST API Application",
        body: "Build a REST API using Django REST Framework with CRUD functionality and JWT authentication. Skills: DRF · REST APIs · JWT · Documentation",
      },
      {
        title: "AI-Integrated Application",
        body: "Connect an application with an LLM API and explore practical AI-assisted functionality. Skills: Python · APIs · LLM Integration",
      },
      {
        title: "Full Stack Capstone",
        body: "Bring the technologies together in a final application covering frontend, backend, database, authentication and API functionality. Skills: HTML · CSS · JavaScript · Python · Django · DRF · SQL",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Make It Yours.",
    paragraphs: ["Every project follows a simple development cycle."],
    items: [
      {
        title: "Understand",
        body: "Understand the requirement, identify the technologies involved and break the application into manageable components.",
        icon: "layers",
      },
      {
        title: "Build",
        body: "Write the code, connect the components, test the application and improve it through trainer feedback.",
        icon: "cube",
      },
      {
        title: "Present",
        body: "Document your work, explain your technical decisions and prepare the project as part of your professional portfolio.",
        icon: "briefcase",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Choose techcadd for Full Stack Development?",
    intro:
      "Choosing a development programme is about more than comparing syllabus lists. The quality of practical training, guidance and project work can make a major difference to the learning experience.",
    items: [
      {
        title: "Structured Curriculum",
        body: "The programme follows a clear progression from web fundamentals to Python, Django, databases, APIs and modern development integrations.",
        icon: "layers",
      },
      {
        title: "Practical Project Work",
        body: "Students get opportunities to apply concepts through projects rather than studying every topic only from theory.",
        icon: "cube",
      },
      {
        title: "Beginner-Friendly Approach",
        body: "The programme is designed to start from foundational concepts, making it suitable for students entering development after 12th.",
        icon: "sparkles",
      },
      {
        title: "Modern Technology Exposure",
        body: "Along with the core Python-Django stack, students are introduced to AI-assisted development, LLM APIs, Celery, payments and CI/CD concepts.",
        icon: "terminal",
      },
      {
        title: "Portfolio Guidance",
        body: "Students can organize their projects, code repositories and documentation into a portfolio that demonstrates practical development skills.",
        icon: "briefcase",
      },
      {
        title: "Placement Preparation",
        body: "Training can include resume guidance, interview preparation, project discussion and placement-support activities.",
        icon: "users",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro:
      "Students interested in Full Stack Development can also explore related technology programmes:",
    // The two longer Full Stack tracks use the slugs the After 12th menu
    // reserves for them in `@/lib/site`; the other three are live pages.
    items: [
      {
        title: "After 12th 6-Month Full Stack Development Program",
        body: "A longer learning path for students who want additional time for advanced development, projects and specialization.",
        href: "/after-12th/full-stack-development-certificate-program",
      },
      {
        title: "After 12th 9-Month Full Stack Development Program",
        body: "A more extensive programme for students looking for deeper development training and a broader portfolio.",
        href: "/after-12th/full-stack-development-diploma-program",
      },
      {
        title: "After 12th 3-Month MERN Stack Program",
        body: "Explore MongoDB, Express.js, React and Node.js for JavaScript-based full-stack development.",
        href: "/courses/after12th/mern-full-stack",
      },
      {
        title: "After 12th 3-Month Agentic AI Program",
        body: "Learn the foundations of AI systems that can use tools, follow workflows and perform multi-step tasks.",
        href: "/courses/after12th/agentic-ai",
      },
      {
        title: "After 12th 3-Month Cloud Computing Program",
        body: "Build foundational knowledge of cloud platforms, infrastructure and deployment.",
        href: "/courses/after12th/cloud-computing",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the Full Stack Development Program in Mohali?",
      a: "The programme is designed as a 3-month full-stack development course covering web fundamentals, JavaScript, Python, databases, Django, REST APIs, AI integrations and development workflows.",
    },
    {
      q: "Can I join the course after 12th?",
      a: "Yes. The programme is designed to start with fundamentals, making it suitable for students who have completed 12th.",
    },
    {
      q: "Do I need prior programming experience?",
      a: "No. The curriculum begins with HTML, CSS and basic programming concepts before progressing to Python and Django.",
    },
    {
      q: "What technologies will I learn?",
      a: "You will work with HTML5, CSS3, Bootstrap, JavaScript, Python, Django, Django REST Framework, SQL, JWT, APIs, Git/GitHub and additional modern development tools.",
    },
    {
      q: "Can I learn Django without knowing Python?",
      a: "Basic Python knowledge is important for learning Django effectively. The programme therefore teaches Python before moving deeply into Django.",
    },
    {
      q: "Will I build projects during the course?",
      a: "Yes. The programme is designed around practical assignments and projects, including web applications, Python/database work, Django applications, REST APIs and a final full-stack project.",
    },
    {
      q: "Can I use the projects in my portfolio?",
      a: "Yes, provided the projects comply with the applicable training and project-use guidelines. You can use suitable completed projects to demonstrate your skills on GitHub and during interviews.",
    },
    {
      q: "Does the course include placement support?",
      a: "Placement support is included as a programme feature. However, placement should not be treated as a guaranteed job offer.",
    },
    {
      q: "Can I freelance after learning Full Stack Development?",
      a: "Yes. Full-stack skills can be used for freelance website, API and web-application projects. Your ability to win freelance work will depend on your portfolio, communication, pricing, project quality and client acquisition skills.",
    },
    {
      q: "Is Full Stack Development suitable for students from non-technical streams?",
      a: "Yes. Students from different academic backgrounds can begin with the fundamentals and gradually develop programming and application-development skills.",
    },
    {
      q: "What should I learn after completing the 3-month course?",
      a: "Depending on your goals, you can specialize further in advanced Django, React, MERN, cloud deployment, DevOps, AI integration, system design or another software-development track.",
    },
  ],

  enquiry: {
    title: "Ask About Full Stack Development Program",
    // The brief's contact block leaves email and phone blank; the page already
    // renders the centre's real details, so only the lines it fills in are
    // carried here.
    paragraphs: [
      "Have questions about the course? Contact the Mohali team for current information about batch timings, course fees, eligibility, training format, project work, certification, placement support and advanced learning options.",
      "Location: Mohali, Punjab.",
    ],
  },

  fit: {
    title: "Not Sure If Full Stack Development Is Right for You?",
    paragraphs: [
      "If you are unsure whether Full Stack Development is the right career direction after 12th, speak with a course counsellor and understand the curriculum, learning path and career options before enrolling.",
      "Explore the learning environment, understand the course structure and decide whether the programme matches your goals.",
    ],
    ctaTitle: "Get Started Today",
    // The brief names no list here; these six are its own highlights, the facts
    // a reader still deciding is weighing.
    points: [
      "3 months, 12th pass, any stream",
      "No prior programming experience required",
      "HTML, CSS, JavaScript, Python, Django, DRF and SQL",
      "AI-assisted development, LLM APIs, Celery and CI/CD",
      "6 portfolio projects and a full-stack capstone",
      "Resume, interview and placement support",
    ],
  },
};

const cloudComputingCertificate: After12Page = {
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
    title: "Best After 12th 6-Month Cloud Computing Program in Mohali",
    paragraphs: [
      "Build practical cloud and DevOps skills from the ground up with a six-month Cloud Computing Program in Mohali. Start with Linux, networking, Bash and Git, then progress into AWS, cloud security, Docker, Kubernetes, CI/CD, Terraform, monitoring and infrastructure automation.",
      "No prior cloud or IT experience is required. The programme is structured for students after 12th who want to understand how modern applications are hosted, secured, deployed and monitored in the cloud.",
    ],
  },

  program: {
    title: "Cloud Computing Certificate Program in Mohali",
    paragraphs: [
      "Join a structured 6-month Cloud Computing course after 12th and learn how modern cloud infrastructure works through practical labs and projects.",
      "You will begin with Linux administration, networking and scripting before moving into AWS services such as IAM, VPC, EC2, S3, RDS, Lambda, CloudWatch and more. Later modules introduce Docker, Kubernetes, Jenkins, Terraform, Prometheus, Grafana and CI/CD automation.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "6 Months" },
      { label: "Eligibility", value: "12th Pass, Any Stream" },
      { label: "Prior Experience", value: "Not Required" },
      { label: "Learning Mode", value: "Practical + Theory" },
      { label: "Core Platform", value: "AWS" },
      { label: "Includes", value: "Certificate + Placement Support" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "The Best After 12th 6-Month Cloud Computing Program in Mohali takes you from basic IT infrastructure concepts to the tools used for cloud deployment and DevOps workflows.",
      "The first month establishes your foundation in Linux, networking, Bash and Git. You then learn AWS infrastructure, storage, databases, scalability, monitoring, serverless services and cloud security.",
      "The final stages introduce containerization with Docker, orchestration with Kubernetes, automated pipelines, Infrastructure as Code with Terraform and observability with tools such as Prometheus and Grafana.",
      "Instead of learning each technology in isolation, the curriculum connects them through practical projects so you understand how the pieces work together.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    // The brief numbers its four outcomes but writes no lead-in; this states
    // its own arrangement in a sentence.
    intro:
      "Four principles the six months are built on — one layer at a time, from the ground up, secure by default, and automated by the end.",
    items: [
      {
        title: "Learn One Layer at a Time",
        body: "Start with operating systems, networking and scripting before moving into cloud infrastructure, containers and automation.",
      },
      {
        title: "Understand Cloud from the Ground Up",
        body: "Learn concepts such as regions, availability zones, IAM, VPCs, compute, storage, databases and load balancing before working with more advanced cloud architecture.",
      },
      {
        title: "Build with Security in Mind",
        body: "Understand permissions, encryption, secrets, backups, network security and monitoring as part of the cloud workflow rather than treating security as an afterthought.",
      },
      {
        title: "Finish with an Automated Environment",
        body: "By the end of the programme, you can work through a complete workflow involving application deployment, containers, CI/CD, infrastructure automation and monitoring.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The six-month curriculum progresses from infrastructure fundamentals to AWS, cloud architecture, serverless computing, containers, Kubernetes and DevOps automation.",
    // Each month keeps the brief's own grouping headings, "Tools Used" line and
    // "Project" in place as entries, so the order and wording are as supplied.
    modules: [
      {
        title: "Month 1 — Linux, Basic Scripting, Networking & Git",
        points: [
          "Linux Administration",
          "Linux installation and setup",
          "File system structure",
          "Linux commands",
          "File and directory management",
          "Searching and text processing",
          "Nano and Vim editors",
          "Users and groups",
          "File permissions",
          "Package management",
          "Services",
          "SSH",
          "Cron jobs",
          "Bash Scripting",
          "Variables",
          "Conditions",
          "Loops",
          "Functions",
          "Script arguments",
          "Backup automation",
          "Log-cleaning scripts",
          "Server health checks",
          "Networking Fundamentals",
          "Routers and switches",
          "Firewalls",
          "IP addressing",
          "Subnetting",
          "DNS",
          "DHCP",
          "NAT",
          "TCP and UDP",
          "HTTP and HTTPS",
          "Basic network troubleshooting",
          "Network Troubleshooting Tools",
          "Ping",
          "Traceroute",
          "Dig",
          "Netstat",
          "Curl",
          "Git & GitHub",
          "Git repositories",
          "Commits",
          "Branches",
          "Merging",
          "Pull requests",
          "Remote repositories",
          "Project version control",
          "Tools Used: Linux · Ubuntu · Amazon Linux · Bash · SSH · Cron · Git · GitHub",
          "Project — Linux Administration & Automation Toolkit: Build a collection of Bash scripts for backups, log management and server health monitoring and maintain the project through GitHub.",
        ],
      },
      {
        title: "Month 2 — Cloud Basics & Core AWS",
        points: [
          "Cloud Computing Fundamentals",
          "What cloud computing means",
          "Traditional servers vs cloud infrastructure",
          "IaaS",
          "PaaS",
          "SaaS",
          "Cloud responsibility models",
          "Benefits and limitations of cloud computing",
          "AWS Fundamentals",
          "AWS global infrastructure",
          "Regions",
          "Availability Zones",
          "Edge locations",
          "AWS Management Console",
          "AWS CLI",
          "Basic account configuration",
          "Free-tier awareness",
          "Billing alarms",
          "Budget controls",
          "IAM",
          "Users",
          "Groups",
          "Roles",
          "Policies",
          "Permissions",
          "Least-privilege access",
          "MFA",
          "CloudTrail",
          "Access management",
          "VPC",
          "Virtual Private Cloud",
          "Public and private subnets",
          "Route tables",
          "Internet Gateway",
          "NAT Gateway",
          "Security Groups",
          "Network ACLs",
          "EC2",
          "Virtual server concepts",
          "AMIs",
          "Instance types",
          "Key pairs",
          "SSH connections",
          "EBS storage",
          "Snapshots",
          "Encryption",
          "Web-server deployment",
          "Web Server Deployment — install and configure Nginx, Apache and EC2-hosted websites",
          "Tools Used: AWS Console · AWS CLI · IAM · CloudTrail · VPC · EC2 · EBS · Nginx · Apache",
          "Project — Secure AWS Network & Web Server: Create a structured AWS network with appropriate access controls and deploy a working website on an EC2 instance.",
        ],
      },
      {
        title: "Month 3 — Storage, Databases, Scaling & Monitoring",
        points: [
          "Amazon S3",
          "Buckets",
          "Objects",
          "Storage classes",
          "Lifecycle rules",
          "Static website hosting",
          "Bucket policies",
          "Versioning",
          "Encryption",
          "Amazon RDS",
          "Managed relational databases",
          "Database connectivity",
          "Automated backups",
          "Snapshots",
          "Secure database access",
          "DynamoDB",
          "NoSQL fundamentals",
          "Tables",
          "Primary keys",
          "Capacity concepts",
          "Relational vs NoSQL use cases",
          "Load Balancing",
          "Application Load Balancer",
          "Target groups",
          "Health checks",
          "Traffic distribution",
          "Auto Scaling",
          "Scaling concepts",
          "Launch configurations",
          "Scaling policies",
          "Handling changing traffic",
          "Availability considerations",
          "Route 53 & CloudWatch",
          "Domain and DNS management",
          "Health checks",
          "Monitoring",
          "Metrics",
          "Alarms",
          "Dashboards",
          "AWS Well-Architected Concepts — understand the major principles used when designing reliable, secure, efficient and cost-conscious cloud systems.",
          "Tools Used: S3 · RDS · DynamoDB · Application Load Balancer · Auto Scaling · Route 53 · CloudWatch",
          "Project — Scalable Multi-Tier Cloud Application: Design and deploy a multi-tier application using cloud storage, database services, load balancing and Auto Scaling, supported by monitoring dashboards and an architecture diagram.",
        ],
      },
      {
        title: "Month 4 — Serverless AWS, AI Services & Cloud Security",
        points: [
          "Serverless Computing",
          "Serverless concepts",
          "AWS Lambda",
          "Function configuration",
          "Memory and timeout settings",
          "API Gateway",
          "Serverless APIs",
          "Event-Driven Architecture",
          "EventBridge",
          "SNS",
          "SQS",
          "Message queues",
          "Dead-letter queues",
          "Event-driven workflows",
          "Infrastructure as Code — define AWS infrastructure through configuration files using AWS CloudFormation",
          "AWS AI Services",
          "Amazon Bedrock",
          "Amazon Rekognition",
          "Amazon Textract",
          "Amazon Comprehend",
          "Use Python and a simple Streamlit interface to connect cloud applications with AI services",
          "Cloud Security",
          "IAM hardening",
          "Encryption",
          "Data protection",
          "KMS",
          "Secrets Manager",
          "Parameter Store",
          "Secure application configuration",
          "Security monitoring",
          "AWS Application Protection",
          "ACM certificates",
          "AWS WAF",
          "AWS Shield",
          "GuardDuty",
          "AWS Backup",
          "Disaster-recovery planning",
          "Tools Used: Lambda · API Gateway · EventBridge · SNS · SQS · CloudFormation · Bedrock · Rekognition · Textract · Comprehend · Python · Streamlit · KMS · Secrets Manager · WAF · GuardDuty · AWS Backup",
          "Project — Serverless Workflow & AI Application: Build an event-driven AWS workflow and connect it with a small AI-powered application while applying security, backup and recovery practices.",
        ],
      },
      {
        title: "Month 5 — Docker & Kubernetes",
        points: [
          "Docker Fundamentals",
          "What containers are",
          "Containers vs virtual machines",
          "Docker architecture",
          "Docker images",
          "Containers",
          "Dockerfiles",
          "Image tagging",
          "Image versioning",
          "Container Management",
          "Running containers",
          "Inspecting containers",
          "Debugging",
          "Volumes",
          "Docker networks",
          "Multi-container applications",
          "Docker Compose",
          "Compose files",
          "Service configuration",
          "Application networking",
          "Multi-container development",
          "Container Registries",
          "Docker Hub",
          "Amazon ECR",
          "Image management",
          "Container security scanning",
          "Kubernetes Fundamentals",
          "Why orchestration is needed",
          "Kubernetes architecture",
          "Clusters",
          "Pods",
          "Deployments",
          "ReplicaSets",
          "Services",
          "Ingress",
          "Kubernetes Operations",
          "Rolling deployments",
          "Rollbacks",
          "ConfigMaps",
          "Secrets",
          "Health probes",
          "Pod scaling",
          "Helm charts",
          "Amazon EKS — run Kubernetes workloads on AWS using Amazon Elastic Kubernetes Service",
          "Tools Used: Docker · Dockerfile · Docker Compose · Docker Hub · Amazon ECR · Trivy · Kubernetes · kubectl · Minikube · Amazon EKS · Helm",
          "Project — Containerized Application on Kubernetes: Containerize a multi-service application, deploy it to Kubernetes, configure scaling and health checks, and package the deployment using Helm.",
        ],
      },
      {
        title: "Month 6 — CI/CD, Terraform, Monitoring & Final Project",
        points: [
          "CI/CD Fundamentals",
          "Continuous Integration",
          "Continuous Delivery",
          "Automated testing",
          "Automated deployments",
          "Pipeline architecture",
          "Jenkins",
          "Jenkins installation",
          "Plugins",
          "Credentials",
          "Pipeline jobs",
          "Jenkinsfile",
          "Pipeline stages",
          "GitHub integration",
          "Automated builds",
          "GitHub Actions — automate development workflows and deployment tasks",
          "Code Quality & Security",
          "SonarQube",
          "Trivy",
          "Code-quality checks",
          "Container image scanning",
          "Kubernetes Deployment Automation",
          "Building Docker images",
          "Pushing images",
          "Pipeline-based deployments",
          "Approval workflows",
          "Rollback strategies",
          "Terraform",
          "Infrastructure as Code",
          "Terraform providers",
          "Variables",
          "Outputs",
          "Plan and apply workflow",
          "State management",
          "S3-based state storage",
          "Reusable modules",
          "Monitoring & Observability",
          "Prometheus — collect and manage infrastructure and application metrics",
          "Grafana — build dashboards to visualize system performance",
          "Alertmanager — configure alerts for important system conditions",
          "Loki / ELK — centralized log collection and analysis",
          "CloudWatch — monitor AWS infrastructure and services",
          "Final Project & Career Preparation",
          "End-to-end cloud application",
          "Infrastructure automation",
          "CI/CD pipeline",
          "Kubernetes deployment",
          "Monitoring dashboards",
          "Project documentation",
          "GitHub portfolio",
          "Resume preparation",
          "Mock interviews",
          "Final project presentation",
          "Tools Used: Jenkins · GitHub Actions · SonarQube · Trivy · Terraform · Prometheus · Grafana · Alertmanager · Loki · ELK · Docker · Kubernetes",
          "Final Project — Automated Cloud Deployment Pipeline: Create a complete workflow from source-code commit to cloud deployment using CI/CD, Docker, Kubernetes and Terraform, with monitoring and alerting integrated into the environment.",
        ],
      },
      {
        // The brief expands Month 1 a second time under its own heading; it is
        // curriculum, so it runs here rather than being dropped.
        title: "Month 1 — Detailed Learning Path",
        points: [
          "Linux Fundamentals — Learn the Linux command line, file system, permissions, package management and basic administration.",
          "Users, Groups & Services — Manage users, groups, permissions, services and remote access using SSH.",
          "Bash Automation — Write beginner-friendly scripts for backups, log cleanup and server health checks.",
          "Networking — Understand IP addresses, subnetting, DNS, DHCP, NAT, routers, switches and firewalls.",
          "Network Troubleshooting — Use tools such as ping, traceroute, dig, netstat and curl to investigate connectivity problems.",
          "Git & GitHub — Learn version control, branches, commits, merging and collaborative Git workflows.",
          "Tools — Ubuntu · Amazon Linux · Bash · SSH · Cron · Git · GitHub",
          "Project — Create a Linux administration lab and automation toolkit that demonstrates practical scripting and system-management skills.",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the project that closes every month, and the final pipeline.
    practical: {
      title: "A Project Every Month",
      body: "Each of the six months closes on its own build — an automation toolkit, a secure AWS network, a scalable multi-tier application, a serverless AI workflow, a Kubernetes deployment and an automated pipeline.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have taken an application from a Linux server to a containerised, orchestrated, monitored cloud deployment provisioned by Terraform and shipped through CI/CD.",
    },
  },

  tools: {
    title: "Tools You Will Actually Work With",
    intro: "The programme introduces students to a broad cloud and DevOps toolchain.",
    // The brief groups its tools under Cloud, Containers, DevOps, Monitoring and
    // Programming & Automation; each line below names that tool's own job, with
    // its group kept in the wording.
    items: [
      { name: "AWS", body: "Cloud — the platform the whole programme is taught on." },
      { name: "AWS CLI", body: "Cloud — drive AWS from the command line." },
      { name: "IAM", body: "Cloud — users, roles, policies and least-privilege access." },
      { name: "EC2", body: "Cloud — virtual servers, AMIs, key pairs and EBS." },
      { name: "VPC", body: "Cloud — subnets, route tables, gateways and security groups." },
      { name: "S3", body: "Cloud — object storage, lifecycle rules and static hosting." },
      { name: "RDS", body: "Cloud — managed relational databases and backups." },
      { name: "DynamoDB", body: "Cloud — NoSQL tables, keys and capacity." },
      { name: "Lambda", body: "Cloud — serverless functions behind API Gateway." },
      { name: "CloudFormation", body: "Cloud — AWS infrastructure defined as configuration." },
      { name: "CloudWatch", body: "Cloud — metrics, alarms and dashboards." },
      { name: "Docker", body: "Containers — images, Dockerfiles and container management." },
      { name: "Docker Compose", body: "Containers — multi-container application development." },
      { name: "Amazon ECR", body: "Containers — the registry images are pushed to." },
      { name: "Kubernetes", body: "Containers — pods, deployments, services and ingress." },
      { name: "kubectl", body: "Containers — operate the cluster from the CLI." },
      { name: "Helm", body: "Containers — package and version the deployment." },
      { name: "Amazon EKS", body: "Containers — run Kubernetes workloads on AWS." },
      { name: "Jenkins", body: "DevOps — pipeline jobs, Jenkinsfiles and automated builds." },
      { name: "GitHub Actions", body: "DevOps — automate workflows and deployment tasks." },
      { name: "Terraform", body: "DevOps — Infrastructure as Code, state and modules." },
      { name: "SonarQube", body: "DevOps — code-quality checks in the pipeline." },
      { name: "Trivy", body: "DevOps — container image security scanning." },
      { name: "Prometheus", body: "Monitoring — collect infrastructure and application metrics." },
      { name: "Grafana", body: "Monitoring — dashboards that visualise performance." },
      { name: "Alertmanager", body: "Monitoring — alerts for important system conditions." },
      { name: "Loki", body: "Monitoring — centralised log collection." },
      { name: "ELK", body: "Monitoring — log search and analysis." },
      { name: "Linux", body: "Programming & automation — the operating system underneath it all." },
      { name: "Bash", body: "Programming & automation — backups, log cleanup and health checks." },
      { name: "Python", body: "Programming & automation — the AI application and scripting." },
      { name: "Git", body: "Programming & automation — version control across every project." },
      { name: "GitHub", body: "Programming & automation — the portfolio and the pipeline trigger." },
    ],
  },

  who: {
    title: "Who Can Do This Course?",
    items: [
      {
        title: "Students After 12th",
        body: "Students from Science, Commerce or Arts backgrounds can begin the programme without previous cloud experience. The first module starts with Linux, networking and basic scripting.",
        icon: "users",
      },
      {
        title: "Graduates & Final-Year Students",
        body: "Students pursuing BCA, B.Sc, B.Tech, BBA and related degrees can use the course to develop practical cloud and DevOps skills alongside their academic studies.",
        icon: "certificate",
      },
      {
        title: "Career Changers",
        body: "If you want to move toward cloud computing, infrastructure or DevOps, the six-month curriculum provides a structured path from fundamentals to practical deployment.",
        icon: "refresh",
      },
      {
        title: "Beginners Interested in IT",
        body: "You do not need to start as a Linux or AWS expert. The course gradually introduces each technology and connects it with practical exercises.",
        icon: "sparkles",
      },
      {
        title: "Working Learners",
        body: "Learners balancing work or college can explore available batch schedules with the Mohali training team and choose a format that fits their routine.",
        icon: "calendar",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Six Months",
    items: [
      {
        title: "Start from the Foundation",
        body: "Cloud technologies make much more sense when you understand Linux, networking, servers and basic scripting first.",
        icon: "layers",
      },
      {
        title: "Learn AWS Through Practical Work",
        body: "Instead of memorizing cloud-service names, you learn how compute, storage, networking, databases, security and monitoring work together.",
        icon: "cloud",
      },
      {
        title: "Move Beyond Basic Cloud",
        body: "The programme progresses into Docker, Kubernetes, CI/CD and Terraform so you understand how applications move from development to deployment.",
        icon: "cube",
      },
      {
        title: "Build Multiple Projects",
        body: "Each stage gives you a practical project, helping you create a portfolio covering Linux automation, AWS infrastructure, scalable applications, serverless systems, Kubernetes and CI/CD.",
        icon: "briefcase",
      },
      {
        title: "Understand Cloud Security",
        body: "IAM, encryption, network controls, secrets management, monitoring and backup concepts are integrated into the learning journey.",
        icon: "shield",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Why Learn Cloud Computing Now?",
    paragraphs: [
      "Cloud computing has changed how organizations build and operate software. Instead of relying only on physical servers, teams can provision computing resources, databases, storage and networking services through cloud platforms.",
      "This creates opportunities for professionals who understand both infrastructure and automation.",
      "The objective of this programme is to help you build that foundation step by step.",
    ],
    listTitle: "A modern cloud learner benefits from knowing",
    // The brief's own ten-item list, each with the line naming where it sits in
    // the curriculum above.
    items: [
      { title: "Linux administration", body: "Month 1 — the command line, permissions, services and SSH." },
      { title: "Networking", body: "Month 1 — IP, subnetting, DNS, DHCP, NAT and firewalls." },
      { title: "AWS", body: "Months 2–4 — IAM, VPC, EC2, S3, RDS, Lambda and CloudWatch." },
      { title: "Security", body: "Month 4 — IAM hardening, KMS, Secrets Manager, WAF and GuardDuty." },
      { title: "Containers", body: "Month 5 — Docker images, Compose and registries." },
      { title: "Kubernetes", body: "Month 5 — pods, deployments, Helm and Amazon EKS." },
      { title: "CI/CD", body: "Month 6 — Jenkins, GitHub Actions and automated deployments." },
      { title: "Infrastructure as Code", body: "Months 4 and 6 — CloudFormation and Terraform." },
      { title: "Monitoring", body: "Month 6 — Prometheus, Grafana, Alertmanager and Loki/ELK." },
      { title: "Automation", body: "Throughout — Bash, pipelines and reusable Terraform modules." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with a course counsellor settles eligibility, batch timings, fees, lab access and where this leads — before you commit six months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Get Certified in Cloud Computing",
    intro:
      "After successful completion of the programme, students can receive course certification according to the current certification process of the training centre. Certification, internship documentation and placement-support terms should be confirmed with the Mohali centre before enrolment.",
    items: [
      {
        icon: "certificate",
        title: "Industry-Oriented Skills",
        body: "Work with cloud and DevOps technologies used across modern development and infrastructure environments.",
      },
      {
        icon: "layers",
        title: "Project Portfolio",
        body: "Complete practical projects that can be documented and presented during interviews.",
      },
      {
        icon: "briefcase",
        title: "Placement Support",
        body: "Receive support with resume preparation, interview practice and relevant opportunities.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Can Take You",
    intro:
      "The skills covered in this programme can prepare you to explore entry-level opportunities such as:",
    listTitle: "Roles this programme prepares you for",
    steps: [
      {
        title: "Cloud Engineer",
        body: "Work with cloud infrastructure, compute, networking, storage, databases and monitoring.",
      },
      {
        title: "AWS Cloud Engineer",
        body: "Build foundational AWS skills around services such as EC2, VPC, S3, IAM, RDS and CloudWatch.",
      },
      {
        title: "Junior DevOps Engineer",
        body: "Develop knowledge of Docker, Kubernetes, Jenkins, GitHub Actions, Terraform and CI/CD workflows.",
      },
      {
        title: "Cloud Support Associate",
        body: "Support cloud environments, troubleshoot infrastructure issues and monitor deployed services.",
      },
      {
        title: "Cloud Operations Associate",
        body: "Assist with infrastructure operations, deployments, monitoring and cloud resource management.",
      },
      {
        title: "Infrastructure / System Administrator",
        body: "Use Linux, networking, scripting and cloud knowledge to support modern IT infrastructure.",
      },
    ],
  },

  projects: {
    title: "Hands-On Projects You Will Ship",
    // Each project keeps the brief's own tool line, appended to its description
    // rather than dropped.
    items: [
      {
        title: "Linux & Bash Automation Toolkit",
        body: "Create scripts for backups, log cleanup and system-health checks and manage the project using GitHub. Linux · Bash · Git",
      },
      {
        title: "Secure AWS Network & Web Server",
        body: "Build an AWS environment with network segmentation, access controls and an EC2-hosted web server. VPC · EC2 · IAM · Nginx",
      },
      {
        title: "Scalable Cloud Application",
        body: "Build a multi-tier cloud architecture using storage, database, load balancing, Auto Scaling and monitoring. S3 · RDS · ALB · Auto Scaling · CloudWatch",
      },
      {
        title: "Serverless Workflow & AI Application",
        body: "Create an event-driven serverless workflow and connect cloud AI services with a Python-based application. Lambda · EventBridge · Bedrock · Python",
      },
      {
        title: "Containerized Kubernetes Application",
        body: "Package an application using Docker and deploy it to Kubernetes with scaling, health checks and Helm. Docker · Kubernetes · Helm",
      },
      {
        title: "Automated CI/CD & Infrastructure",
        body: "Build a deployment pipeline and provision cloud infrastructure using Terraform. Jenkins · Terraform · SonarQube · Trivy",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Make It Yours.",
    paragraphs: ["Every project follows a practical development cycle."],
    items: [
      {
        title: "Understand",
        body: "Break the requirement into infrastructure, application, security and deployment components.",
        icon: "layers",
      },
      {
        title: "Build",
        body: "Configure the environment, write scripts or infrastructure code, deploy services and troubleshoot issues.",
        icon: "terminal",
      },
      {
        title: "Present",
        body: "Document the architecture, explain the decisions you made and prepare the project for your professional portfolio.",
        icon: "briefcase",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Choose techcadd?",
    // The brief writes no lead-in for this block; this states what its six
    // points have in common.
    intro:
      "A structured path through the whole stack, taught from fundamentals and built around a project in every month.",
    items: [
      {
        title: "A Structured Cloud Learning Path",
        body: "The programme moves logically from Linux and networking to AWS, containers, Kubernetes and DevOps automation.",
        icon: "layers",
      },
      {
        title: "Practical Infrastructure Training",
        body: "Students get opportunities to work with cloud services, deployment workflows and infrastructure-related projects.",
        icon: "cloud",
      },
      {
        title: "Beginner-Friendly Curriculum",
        body: "The course begins with fundamentals rather than assuming that every learner already knows Linux, networking or cloud terminology.",
        icon: "sparkles",
      },
      {
        title: "Modern Cloud & DevOps Tools",
        body: "The curriculum includes AWS, Docker, Kubernetes, Jenkins, Terraform, Prometheus, Grafana and related tools.",
        icon: "terminal",
      },
      {
        title: "Project-Based Learning",
        body: "Multiple projects help students turn individual topics into complete practical systems.",
        icon: "cube",
      },
      {
        title: "Placement Preparation",
        body: "Students can receive support with resumes, portfolio presentation, mock interviews and relevant placement activities.",
        icon: "briefcase",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Students exploring technology careers can also consider related programmes:",
    // The four 6-month certificate tracks use the slugs the After 12th menu
    // reserves for them in `@/lib/site`; the 3-month and 9-month Cloud pages
    // are live.
    items: [
      {
        title: "After 12th 3-Month Cloud Computing Program",
        body: "A shorter cloud-focused pathway covering essential AWS and cloud fundamentals.",
        href: "/courses/after12th/cloud-computing",
      },
      {
        title: "After 12th 9-Month Cloud Computing Diploma Program",
        body: "A longer learning route for students who want more time for advanced cloud, DevOps and project work.",
        href: "/after-12th/cloud-computing-diploma",
      },
      {
        title: "After 12th 6-Month Cyber Security Certificate Program",
        body: "Explore network security, ethical security practices, security operations and defensive technologies.",
        href: "/after-12th/cyber-security-certificate-program",
      },
      {
        title: "After 12th 6-Month Data Science Certificate Program",
        body: "Learn the data pipeline from data preparation and analysis to machine learning and practical projects.",
        href: "/after-12th/data-science-certificate-program",
      },
      {
        title: "After 12th 6-Month Full Stack Development Certificate Program",
        body: "Learn how to build web applications using modern frontend and backend development technologies.",
        href: "/after-12th/full-stack-development-certificate-program",
      },
      {
        title: "After 12th 6-Month Artificial Intelligence Certificate Program",
        body: "Develop practical knowledge of AI, machine learning and modern AI application development.",
        href: "/after-12th/artificial-intelligence-certificate-program",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the After 12th 6-Month Cloud Computing Program in Mohali?",
      a: "The programme runs for six months and progresses from Linux, networking and Git to AWS, cloud security, Docker, Kubernetes, CI/CD, Terraform and monitoring.",
    },
    {
      q: "Do I need programming experience to join?",
      a: "No. Prior programming or cloud experience is not required. Basic scripting is introduced during the early part of the course.",
    },
    {
      q: "Can students from Arts or Commerce join?",
      a: "Yes. The programme is designed to begin with foundational concepts, so students from different academic streams can explore cloud computing.",
    },
    {
      q: "Is Cloud Computing difficult for a 12th-pass student?",
      a: "It can seem technical initially, but the curriculum starts with Linux and networking before moving into advanced cloud and DevOps topics. Consistent practice is important.",
    },
    {
      q: "What will I learn in six months?",
      a: "You will cover Linux, Bash, networking, Git, AWS, IAM, VPC, EC2, S3, RDS, Lambda, cloud security, Docker, Kubernetes, Jenkins, Terraform, CI/CD and monitoring.",
    },
    {
      q: "Will I practise AWS?",
      a: "The programme includes practical AWS learning. The exact account setup, lab access and usage arrangements should be confirmed with the Mohali centre.",
    },
    {
      q: "What projects will I build?",
      a: "Projects include Linux automation, AWS infrastructure, scalable cloud applications, serverless workflows, Kubernetes deployments and automated CI/CD pipelines.",
    },
    {
      q: "What jobs can I explore after the course?",
      a: "Depending on your skills and experience, you can explore entry-level opportunities such as Cloud Engineer, AWS Cloud Engineer, Cloud Support Associate, Cloud Operations Associate, Junior DevOps Engineer and Infrastructure Support roles.",
    },
    {
      q: "What salary can a fresher expect?",
      a: "Salary varies significantly based on skills, location, company, interview performance, portfolio and previous experience. It is better to evaluate current job listings rather than rely on a fixed course-level salary promise.",
    },
    {
      q: "Does the programme guarantee placement?",
      a: "No training programme should be treated as a guaranteed job. Placement support can assist with preparation and relevant opportunities, while final selection depends on the employer and candidate.",
    },
    {
      q: "Can I do this course along with college?",
      a: "Depending on the available schedule, students may be able to choose a weekday, evening or weekend batch. Confirm current timings with the Mohali centre.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Students who successfully complete the programme can receive certification according to the centre's current certification policy. Confirm the exact certificate and documentation provided before enrolment.",
    },
  ],

  enquiry: {
    title: "Ask About Cloud Computing Certificate Program",
    // The brief's contact block leaves email and phone blank; the page already
    // renders the centre's real details, so only the line it fills in is
    // carried here.
    paragraphs: [
      "Have questions about the programme? Contact the Mohali team to discuss course fees, batch timings, eligibility, training format, AWS practical labs, projects, certification, placement support and advanced cloud learning options.",
      "Location: Mohali, Punjab.",
    ],
  },

  fit: {
    title: "Not Sure If Cloud Computing Is the Right Fit?",
    paragraphs: [
      "If you have recently completed 12th and are considering a career in cloud, DevOps or IT infrastructure, speak with a course counsellor to understand the learning path before enrolling.",
      "A free demo can help you see how the training works, what technologies are covered and whether the programme matches your career goals.",
    ],
    ctaTitle: "Get Started Today",
    // The brief names no list here; these six are its own highlights, the facts
    // a reader still deciding is weighing.
    points: [
      "6 months, 12th pass, any stream",
      "No prior cloud or IT experience required",
      "AWS as the core platform, taught practically",
      "Docker, Kubernetes, Jenkins, Terraform and monitoring",
      "A project in every month, six in total",
      "Certificate and placement support",
    ],
  },
};

const flutterCertificate: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Career scope" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "Best After 12th 6-Month Flutter App Development Program in Mohali",
    paragraphs: [
      "Learn how to design, develop, test, optimize, and prepare cross-platform mobile applications with Flutter. This six-month program takes you from Dart programming and Flutter fundamentals to advanced application architecture, Firebase, APIs, native device features, AI integration, machine learning, performance optimization, and app deployment.",
      "Designed for students after 12th, graduates, beginners, and aspiring mobile developers, the course combines structured learning with practical application-building.",
    ],
  },

  program: {
    title: "6-Month Flutter App Development Course in Mohali",
    paragraphs: [
      "The Flutter App Development Certificate Program in Mohali follows a gradual learning path. You first develop a strong understanding of Dart and Flutter, then move into data handling, state management, backend services, testing, architecture, native integrations, AI and publishing.",
      "By the end of the program, you will have worked on multiple Flutter applications and gained experience with technologies used across the mobile development workflow.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "6 Months" },
      { label: "Learning Mode", value: "Practical + Theory" },
      { label: "Eligibility", value: "12th Pass, Any Stream" },
      { label: "Level", value: "Beginner to Advanced" },
      { label: "Primary Technology", value: "Flutter & Dart" },
      { label: "Major Areas", value: "Firebase, APIs, State Management, AI & ML" },
      { label: "Projects", value: "Multiple hands-on applications" },
      { label: "Certification", value: "Course completion certificate" },
      { label: "Career Support", value: "Available as per current centre offerings" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "Flutter development is more than creating attractive mobile screens. A complete application needs reliable state handling, backend communication, data storage, testing, performance optimization and deployment.",
      "This six-month course is divided into two learning phases.",
      "Foundation Phase — Months 1 to 3: The first half focuses on Dart, Flutter UI development, responsive layouts, navigation, state management, asynchronous programming, REST APIs, local storage, Firebase, testing and production preparation.",
      "Advanced Phase — Months 4 to 6: The second half introduces native platform integration, Riverpod, GetX, advanced Dart, Clean Architecture, dependency injection, performance engineering, AI-powered applications, Google ML Kit, store deployment and Flutter package development.",
      "This progression allows beginners to build confidence before taking on more advanced application-development challenges.",
    ],
  },

  learn: {
    title: "What You Will Learn",
    // The brief lists its eight outcomes but writes no lead-in; this states its
    // own arrangement in a sentence.
    intro:
      "Eight outcomes spanning both phases — from a first widget through to a signed release build on both stores.",
    items: [
      {
        title: "Build Complete Flutter Applications",
        body: "Start with individual widgets and gradually combine them into responsive, interactive and data-driven mobile applications.",
      },
      {
        title: "Work With APIs and Cloud Services",
        body: "Learn how applications communicate with external services through HTTP, REST APIs, JSON and Firebase.",
      },
      {
        title: "Manage Complex Application State",
        body: "Understand multiple state-management patterns instead of depending on a single approach.",
      },
      {
        title: "Structure Large Applications",
        body: "Learn how architecture patterns such as MVVM, Repository Pattern and Clean Architecture can make projects easier to maintain.",
      },
      {
        title: "Connect Flutter With Native Features",
        body: "Use platform communication to work with device capabilities such as cameras and sensors.",
      },
      {
        title: "Add AI and Machine Learning",
        body: "Integrate text-generation services and experiment with on-device capabilities such as OCR and face detection.",
      },
      {
        title: "Test and Optimize Applications",
        body: "Use Flutter testing tools and DevTools to find problems and improve application behavior.",
      },
      {
        title: "Understand the Release Process",
        body: "Learn the fundamentals of signing, building and preparing applications for Android and iOS distribution.",
      },
    ],
  },

  curriculum: {
    title: "Flutter App Development Curriculum",
    // The brief writes no lead-in for the curriculum; this names the two phases
    // it is actually divided into.
    intro:
      "Six months in two phases — Dart, UI, data and testing across months one to three, then native integration, architecture, AI, ML Kit and publishing across months four to six.",
    // Each month keeps the brief's own grouping headings, "Tools" line and
    // practical work in place as entries, so the order and wording are as
    // supplied.
    modules: [
      {
        title: "Month 1: Dart, Flutter Fundamentals & Interface Design",
        points: [
          "The first month establishes the programming and Flutter foundation required for the rest of the course.",
          "Dart Programming",
          "Dart syntax and program structure",
          "Variables and constants",
          "Data types",
          "Operators",
          "Conditional statements",
          "for, while and do-while loops",
          "switch statements",
          "Functions",
          "Named and optional parameters",
          "Lists, Sets and Maps",
          "Null safety",
          "Classes and objects",
          "Constructors",
          "Inheritance",
          "Interfaces",
          "Flutter Basics",
          "Flutter installation and environment setup",
          "Flutter project structure",
          "Widget tree",
          "StatelessWidget",
          "StatefulWidget",
          "Container",
          "Row",
          "Column",
          "Stack",
          "Material widgets",
          "Cupertino widgets",
          "Themes",
          "Custom widgets",
          "UI Development",
          "Responsive layouts",
          "Mobile and tablet interfaces",
          "Flutter web layout concepts",
          "Navigation",
          "Named routes",
          "Forms",
          "Form validation",
          "User interactions",
          "Gestures",
          "Animations",
          "Page transitions",
          "Tools: Dart SDK · DartPad · Flutter SDK · Android Studio · Xcode · VS Code · go_router · flutter_animate",
          "Practical Work: Command-line Dart project · Three-screen Flutter application · Responsive multi-screen application · Animated form-based interface",
        ],
      },
      {
        title: "Month 2: State, APIs, Storage & Firebase",
        points: [
          "Once the UI foundation is ready, learners move into application logic and data.",
          "State Management",
          "setState",
          "State lifting",
          "InheritedWidget",
          "Provider",
          "Bloc fundamentals",
          "Comparing Provider and Bloc",
          "Choosing an appropriate state-management approach",
          "Asynchronous Programming",
          "Futures",
          "async and await",
          "Streams",
          "StreamBuilder",
          "Background processing",
          "Isolates",
          "API Integration",
          "HTTP requests",
          "REST API concepts",
          "JSON data",
          "JSON parsing",
          "Error handling",
          "WebSocket basics",
          "Real-time application updates",
          "Local Data",
          "SharedPreferences",
          "SQLite",
          "sqflite",
          "Storing structured application data",
          "Firebase",
          "Firebase configuration",
          "Firebase Authentication",
          "Email login",
          "Google authentication",
          "Phone authentication",
          "Cloud Firestore",
          "Push notifications",
          "Firebase Analytics",
          "Tools: Provider · flutter_bloc · http · dio · sqflite · Firebase Authentication · Cloud Firestore · Firebase Cloud Messaging",
          "Projects: Provider and Bloc comparison project · REST API + SQLite application · Real-time data application · Firebase login and notification application",
        ],
      },
      {
        title: "Month 3: Testing, Advanced UI & Release Preparation",
        points: [
          "The third month focuses on quality, debugging and preparing applications for production.",
          "Testing",
          "Unit tests",
          "Widget tests",
          "Integration tests",
          "Business-logic testing",
          "User-flow testing",
          "Debugging",
          "Flutter debugging techniques",
          "Flutter DevTools",
          "Performance inspection",
          "Finding UI bottlenecks",
          "Understanding application behavior",
          "Advanced UI",
          "CustomPainter",
          "Custom animations",
          "Gesture recognition",
          "Interactive components",
          "Application Configuration",
          "Development environments",
          "Staging environments",
          "Production environments",
          "Flavors",
          "Version numbers",
          "Store metadata",
          "Localization",
          "Internationalization",
          "Release Fundamentals",
          "Android release builds",
          "iOS release builds",
          "Application signing",
          "Crash reporting",
          "Release notes",
          "Tools: flutter_test · integration_test · Flutter DevTools · CustomPainter · Intl · Play Console · App Store Connect",
          "Projects: Unit, widget and integration-tested application · Custom interactive interface · Signed release application",
        ],
      },
      {
        title: "Month 4: Native Integration, Riverpod, GetX & Advanced Dart",
        points: [
          "The fourth month moves into advanced Flutter development.",
          "Native Platform Integration",
          "MethodChannel",
          "Flutter-to-native communication",
          "Camera integration",
          "Sensor access",
          "Background processes",
          "Push notification workflows",
          "State Management",
          "Advanced Provider patterns",
          "Riverpod",
          "GetX",
          "Routing with GetX",
          "Dependency injection concepts",
          "Flutter Hooks",
          "Advanced Dart",
          "Generics",
          "Extension methods",
          "Mixins",
          "Type-safe reusable components",
          "Isolate.spawn",
          "Concurrency concepts",
          "Tools: MethodChannel · camera · sensors_plus · flutter_background_service · Riverpod · GetX · flutter_hooks",
          "Practical Deliverable: Develop an application containing a native device capability and implement an alternative state-management architecture using Riverpod or GetX.",
        ],
      },
      {
        title: "Month 5: Clean Architecture, Optimization & AI",
        points: [
          "This module focuses on developing applications that are easier to maintain and extend.",
          "Application Architecture",
          "MVVM",
          "Clean Architecture",
          "Presentation layer",
          "Domain layer",
          "Data layer",
          "Repository Pattern",
          "Dependency Injection",
          "get_it",
          "injectable",
          "freezed",
          "Performance Optimization",
          "Widget optimization",
          "Render-tree analysis",
          "Memory management",
          "Detecting leaks",
          "Application size optimization",
          "Profiling",
          "Benchmarking",
          "Flutter DevTools",
          "AI Integration",
          "AI-powered mobile features",
          "Text-generation APIs",
          "AI chatbot workflows",
          "Question-answer applications",
          "Text summarization",
          "Conversation management",
          "Chat interface design",
          "Local conversation history",
          "Tools: get_it · injectable · freezed · Flutter DevTools · flutter_chat_ui · http · dio · Text-generation APIs",
          "Project: Build an AI-enabled Flutter application and restructure an existing project using Clean Architecture and dependency injection.",
        ],
      },
      {
        title: "Month 6: ML Kit, App Deployment & pub.dev",
        points: [
          "The final module brings together mobile AI, deployment and reusable Flutter development.",
          "Google ML Kit",
          "Introduction to ML Kit",
          "Text recognition",
          "OCR implementation",
          "Face detection",
          "Camera-based ML features",
          "Testing with different inputs",
          "Android & iOS Deployment",
          "App store requirements",
          "Release builds",
          "Android App Bundle",
          "iOS archiving",
          "App signing",
          "Version management",
          "Release preparation",
          "Continuous integration fundamentals",
          "Flutter Packages",
          "Package development",
          "Plugin development",
          "Platform interfaces",
          "Documentation",
          "Changelog creation",
          "Automated tests",
          "Evaluating third-party packages",
          "Publishing packages on pub.dev",
          "Tools: Google ML Kit · App Store Connect · Play Console · Xcode · Android App Bundle · pub.dev · plugin_platform_interface",
          "Final Project: Complete an application featuring an on-device ML capability, prepare Android and iOS release builds, and develop a reusable Flutter package.",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the practical work that closes every month, and the final project.
    practical: {
      title: "Practical Work Every Month",
      body: "Each month closes on build work rather than revision — Dart and UI applications in month one, Provider/Bloc and Firebase apps in month two, tested and signed builds in month three, and native, architected, AI and ML projects across months four to six.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have taken Flutter applications from Dart fundamentals through state, APIs, Firebase, testing, architecture, native channels, AI and ML Kit to signed store builds and a published package.",
    },
  },

  tools: {
    title: "Technologies You Will Practice During the Course",
    // The brief groups its tools under Programming, IDE & Development, State
    // Management, APIs & Backend, Database, Architecture, AI & ML, Testing &
    // Optimization and Publishing; each line below names that tool's own job,
    // with its group kept in the wording.
    items: [
      { name: "Dart", body: "Programming — the language Flutter is written in." },
      { name: "Flutter", body: "Programming — the framework itself." },
      { name: "Android Studio", body: "IDE & development — emulators and the Android toolchain." },
      { name: "Xcode", body: "IDE & development — iOS builds and archiving." },
      { name: "VS Code", body: "IDE & development — day-to-day editing and debugging." },
      { name: "DartPad", body: "IDE & development — try Dart without a local setup." },
      { name: "Provider", body: "State management — the first pattern taught." },
      { name: "Bloc", body: "State management — events, states and streams." },
      { name: "Riverpod", body: "State management — the month-four alternative." },
      { name: "GetX", body: "State management — state, routing and injection together." },
      { name: "Flutter Hooks", body: "State management — reusable stateful logic." },
      { name: "HTTP", body: "APIs & backend — basic requests and responses." },
      { name: "Dio", body: "APIs & backend — interceptors and richer error handling." },
      { name: "REST APIs", body: "APIs & backend — the contract the app consumes." },
      { name: "WebSockets", body: "APIs & backend — real-time application updates." },
      { name: "Firebase", body: "APIs & backend — auth, Firestore, messaging and analytics." },
      { name: "SQLite", body: "Database — structured on-device storage." },
      { name: "sqflite", body: "Database — the Flutter plugin over SQLite." },
      { name: "Cloud Firestore", body: "Database — cloud documents and collections." },
      { name: "SharedPreferences", body: "Database — small key-value application settings." },
      { name: "MVVM", body: "Architecture — separating view from view-model." },
      { name: "Clean Architecture", body: "Architecture — presentation, domain and data layers." },
      { name: "Repository Pattern", body: "Architecture — one place data access lives." },
      { name: "Dependency Injection", body: "Architecture — wiring components without hard-coding them." },
      { name: "get_it", body: "Architecture — the service locator." },
      { name: "injectable", body: "Architecture — generated dependency registration." },
      { name: "freezed", body: "Architecture — immutable models and unions." },
      { name: "Text-generation APIs", body: "AI & ML — the chatbot and summarisation features." },
      { name: "Google ML Kit", body: "AI & ML — on-device machine learning." },
      { name: "OCR", body: "AI & ML — text recognition from the camera." },
      { name: "Face Detection", body: "AI & ML — the second ML Kit capability." },
      { name: "flutter_test", body: "Testing & optimization — unit and widget tests." },
      { name: "integration_test", body: "Testing & optimization — full user-flow tests." },
      { name: "Flutter DevTools", body: "Testing & optimization — profiling, memory and render trees." },
      { name: "Play Console", body: "Publishing — Android store listing and releases." },
      { name: "App Store Connect", body: "Publishing — iOS store listing and releases." },
      { name: "Android App Bundle", body: "Publishing — the Android release artefact." },
      { name: "pub.dev", body: "Publishing — where your Flutter package goes." },
    ],
  },

  who: {
    title: "Who Can Join the 6-Month Flutter Course?",
    items: [
      {
        title: "Students After 12th",
        body: "Students from any stream can begin with Dart programming and gradually develop mobile applications using Flutter.",
        icon: "users",
      },
      {
        title: "College Students",
        body: "Learners pursuing BCA, B.Sc, B.Tech or other technical and non-technical degrees can use the course to develop practical application-development skills.",
        icon: "certificate",
      },
      {
        title: "Graduates",
        body: "Graduates looking to enter software or mobile development can build a portfolio around Flutter projects.",
        icon: "rocket",
      },
      {
        title: "Beginners",
        body: "The course starts from programming fundamentals, making it suitable for learners without previous Flutter experience.",
        icon: "sparkles",
      },
      {
        title: "Existing Developers",
        body: "Developers who already understand programming can use the advanced modules to strengthen their knowledge of architecture, native integration, performance and deployment.",
        icon: "terminal",
      },
      {
        title: "Freelancers",
        body: "Freelancers can develop cross-platform applications and understand the broader workflow involved in taking a mobile project from development to release.",
        icon: "briefcase",
      },
    ],
  },

  worth: {
    title: "Go Further Than Basic App Development",
    items: [
      {
        title: "Strong Dart Foundation",
        body: "Understanding Dart helps you write and maintain Flutter applications rather than depending only on pre-written code.",
        icon: "layers",
      },
      {
        title: "Practical UI Development",
        body: "Build responsive interfaces using Flutter widgets, layouts, navigation, forms and animations.",
        icon: "monitor",
      },
      {
        title: "Real Application Data",
        body: "Connect applications to APIs, databases and Firebase services.",
        icon: "cloud",
      },
      {
        title: "Advanced Architecture",
        body: "Understand how larger projects can be divided into manageable layers.",
        icon: "cube",
      },
      {
        title: "Native Device Capabilities",
        body: "Explore communication between Flutter and native Android/iOS functionality.",
        icon: "terminal",
      },
      {
        title: "AI-Powered Features",
        body: "Learn how AI services can be connected to mobile applications and how ML features can operate on-device.",
        icon: "sparkles",
      },
      {
        title: "Testing & Performance",
        body: "Develop the habit of testing features and measuring application performance before release.",
        icon: "target",
      },
      {
        title: "Deployment Knowledge",
        body: "Understand the steps involved in preparing Flutter applications for distribution.",
        icon: "rocket",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "One Framework, Multiple Application Targets",
    paragraphs: [
      "Flutter provides a development environment for creating cross-platform applications while maintaining a shared codebase.",
      "However, becoming a capable Flutter developer requires more than learning widgets.",
      "This course brings these areas together into one structured learning path.",
    ],
    listTitle: "Modern mobile applications often involve",
    // The brief's own eleven-item list, each with the line naming where it sits
    // in the curriculum above.
    items: [
      { title: "User authentication", body: "Month 2 — Firebase email, Google and phone sign-in." },
      { title: "APIs", body: "Month 2 — HTTP, REST, JSON parsing and error handling." },
      { title: "Databases", body: "Month 2 — SQLite, sqflite and SharedPreferences." },
      { title: "Cloud services", body: "Month 2 — Cloud Firestore, messaging and analytics." },
      { title: "State management", body: "Months 2 and 4 — Provider, Bloc, Riverpod and GetX." },
      { title: "Native device capabilities", body: "Month 4 — MethodChannel, camera and sensors." },
      { title: "Testing", body: "Month 3 — unit, widget and integration tests." },
      { title: "Architecture", body: "Month 5 — MVVM, Clean Architecture and DI." },
      { title: "Performance", body: "Month 5 — profiling, memory and app-size optimisation." },
      { title: "AI", body: "Months 5 and 6 — text-generation APIs and Google ML Kit." },
      { title: "Deployment", body: "Months 3 and 6 — signing, App Bundles and store workflows." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with the techcadd team settles eligibility, batch timings, fees and where this leads — before you commit six months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Flutter App Development Certificate",
    intro:
      "Learners who successfully complete the applicable course requirements can receive a Flutter App Development course certificate from the training centre. The training also focuses on practical projects so that learners can demonstrate their development skills through actual applications. For the latest information about certification, internship documentation and placement support, confirm the applicable terms with the Mohali centre.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "Recognition of successful completion of the applicable Flutter training programme.",
      },
      {
        icon: "layers",
        title: "Project Portfolio",
        body: "A collection of applications created throughout the course.",
      },
      {
        icon: "cube",
        title: "Practical Skills",
        body: "Experience with Flutter, Dart, APIs, Firebase, architecture, testing, AI and deployment.",
      },
      {
        icon: "briefcase",
        title: "Career Preparation",
        body: "Support may include resume guidance, interview preparation and project presentation depending on the current centre offerings.",
      },
    ],
  },

  takesYou: {
    title: "Career Paths After Flutter Training",
    // The brief writes no lead-in for this section; this states what the six
    // roles below have in common.
    intro:
      "Six directions the six months open up, from cross-platform development through to independent client work.",
    listTitle: "Roles this programme prepares you for",
    steps: [
      {
        title: "Flutter Developer",
        body: "Develop cross-platform applications using Dart and Flutter.",
      },
      {
        title: "Mobile Application Developer",
        body: "Work on mobile interfaces, application logic, APIs and device functionality.",
      },
      {
        title: "Cross-Platform Developer",
        body: "Build applications for Android, iOS and other supported platforms.",
      },
      {
        title: "Junior Software Developer",
        body: "Use programming and application-development skills as an entry point into software development.",
      },
      {
        title: "AI-Integrated App Developer",
        body: "Combine mobile applications with AI APIs and machine-learning capabilities.",
      },
      {
        title: "Freelance Flutter Developer",
        body: "Create customized applications for businesses, startups and individual clients.",
      },
    ],
  },

  projects: {
    title: "Practical Flutter Projects",
    // Each project keeps the brief's own technologies line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Device Integration App",
        body: "Create a Flutter feature that communicates with a native device capability through MethodChannel. Technologies: Flutter · MethodChannel · sensors_plus",
      },
      {
        title: "Multi-State Management Application",
        body: "Implement application state using different approaches and compare their structures. Technologies: Provider · Bloc · Riverpod · GetX",
      },
      {
        title: "Clean Architecture Project",
        body: "Organize an application using presentation, domain and data layers. Technologies: MVVM · Clean Architecture · Repository Pattern · get_it · injectable",
      },
      {
        title: "Performance Optimization Project",
        body: "Analyze rendering, memory and build-size characteristics and document the improvements. Technology: Flutter DevTools",
      },
      {
        title: "AI Chatbot Application",
        body: "Develop a mobile chat interface connected to a text-generation API. Technologies: Flutter · HTTP/Dio · AI API",
      },
      {
        title: "ML Scanner",
        body: "Create an OCR or face-detection feature using Google ML Kit. Technology: Google ML Kit",
      },
      {
        title: "Flutter Package",
        body: "Develop and document a reusable Flutter package and learn the publishing workflow for pub.dev. Technology: pub.dev",
      },
    ],
  },

  approach: {
    title: "Understand. Code. Test. Improve.",
    // The brief writes no lead-in for this cycle; this names what it is.
    paragraphs: ["Every feature you build runs through the same five stages:"],
    items: [
      {
        title: "Learn",
        body: "Understand the programming concept, framework feature or development pattern.",
        icon: "layers",
      },
      {
        title: "Implement",
        body: "Apply the concept through coding exercises and application features.",
        icon: "terminal",
      },
      {
        title: "Test",
        body: "Check functionality using debugging and testing techniques.",
        icon: "target",
      },
      {
        title: "Optimize",
        body: "Improve code structure, application performance and maintainability.",
        icon: "refresh",
      },
      {
        title: "Document",
        body: "Prepare project documentation and learn how to explain your implementation.",
        icon: "briefcase",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Build Practical Flutter Skills in Mohali",
    // The brief writes no lead-in for this block; this states what its five
    // points have in common.
    intro:
      "A staged curriculum, a project at every stage, and the modern Flutter topics most short courses stop before reaching.",
    items: [
      {
        title: "Structured Learning",
        body: "The curriculum moves from Dart fundamentals to advanced Flutter development instead of introducing complex concepts all at once.",
        icon: "layers",
      },
      {
        title: "Project-Based Practice",
        body: "Practical projects give learners opportunities to apply concepts while progressing through the syllabus.",
        icon: "cube",
      },
      {
        title: "Modern Flutter Topics",
        body: "The advanced curriculum covers state management, architecture, native integrations, AI, ML Kit, performance and deployment.",
        icon: "sparkles",
      },
      {
        title: "Development Tools",
        body: "Learners get exposure to the development environments, libraries and tools used throughout the Flutter workflow.",
        icon: "terminal",
      },
      {
        title: "Career-Oriented Learning",
        body: "Projects, technical understanding and application-building practice can help learners prepare for entry-level development opportunities.",
        icon: "briefcase",
      },
    ],
  },

  popular: {
    title: "Other Programs You Can Consider",
    intro: "Explore more career-focused programmes at techcadd.",
    // All four use the slugs the After 12th menu reserves for its 6-month
    // column in `@/lib/site`.
    items: [
      {
        title: "After 12th 6-Month MERN Stack Program",
        body: "Learn MongoDB, Express.js, React and Node.js for full-stack web development.",
        href: "/after-12th/mern-stack-certificate-program",
      },
      {
        title: "After 12th 6-Month Full Stack Development Program",
        body: "Develop frontend and backend applications while learning databases, APIs and server-side development.",
        href: "/after-12th/full-stack-development-certificate-program",
      },
      {
        title: "After 12th 6-Month Artificial Intelligence Program",
        body: "Study machine learning, deep learning, generative AI and modern AI application development.",
        href: "/after-12th/artificial-intelligence-certificate-program",
      },
      {
        title: "After 12th 6-Month Agentic AI Program",
        body: "Explore AI systems capable of using tools, workflows and multi-step processes.",
        href: "/after-12th/agentic-ai-certificate-program",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the Flutter App Development Program in Mohali?",
      a: "The programme is structured over six months, covering Flutter fundamentals during the initial stage and advanced development, AI and deployment topics during the later modules.",
    },
    {
      q: "Can I join after 12th?",
      a: "Yes. The course is designed for students who have completed 12th from any stream.",
    },
    {
      q: "Is previous coding knowledge necessary?",
      a: "No. Dart programming is introduced from the fundamentals before moving into Flutter.",
    },
    {
      q: "Which programming language is used in Flutter?",
      a: "Flutter applications are primarily developed using Dart.",
    },
    {
      q: "Will I learn Firebase?",
      a: "Yes. Firebase Authentication, Cloud Firestore, push notifications and analytics are included in the curriculum.",
    },
    {
      q: "Does the course teach API integration?",
      a: "Yes. You will learn REST APIs, JSON processing, HTTP requests, Dio and WebSocket fundamentals.",
    },
    {
      q: "Which state-management frameworks are covered?",
      a: "The programme introduces Provider, Bloc, Riverpod and GetX, along with Flutter's basic state-management concepts.",
    },
    {
      q: "Is Clean Architecture included?",
      a: "Yes. The advanced curriculum covers MVVM, Clean Architecture, Repository Pattern and dependency injection.",
    },
    {
      q: "Will I learn AI development?",
      a: "Yes. The course includes AI chatbot integration using text-generation APIs and introduces on-device ML through Google ML Kit.",
    },
    {
      q: "Will I learn OCR and face detection?",
      a: "Yes. Google ML Kit topics include text recognition/OCR and face detection.",
    },
    {
      q: "Does the course include Android and iOS publishing?",
      a: "The final module covers release preparation, signing, Android App Bundles, iOS archiving and store workflows.",
    },
    {
      q: "What projects will I build?",
      a: "Projects include native device integration, state management, Clean Architecture, performance analysis, an AI chatbot, an ML scanner and a Flutter package.",
    },
    {
      q: "Can I become a Flutter Developer after completing the course?",
      a: "The course is designed to develop practical Flutter and mobile application skills. Your career outcome will also depend on your portfolio, technical ability, interview performance and the current job market.",
    },
    {
      q: "Can I continue learning after six months?",
      a: "Yes. After completing the foundational and advanced Flutter topics, you can continue into specialized areas such as advanced mobile architecture, AI-powered applications, backend integration or broader software development.",
    },
  ],

  enquiry: {
    title: "Ask About the Flutter App Development Programme",
    // The contact details the brief supplies are the centre's own; the page
    // already renders them from `@/lib/site`, so only the wording is carried
    // here rather than a second copy of the number.
    paragraphs: [
      "For information about fees, batches, timings, eligibility, course content, certification and available career support, connect with the techcadd team.",
      "Location: Mohali, Punjab.",
    ],
  },

  fit: {
    title: "Turn Your Coding Skills Into Mobile Applications",
    paragraphs: [
      "Start with Dart, learn Flutter fundamentals, connect real application data, explore advanced architecture and build modern features with AI and machine learning.",
      "The 6-Month Flutter App Development Program in Mohali gives you a structured path from beginner-level programming to advanced mobile application development.",
    ],
    ctaTitle: "Get Started With Flutter",
    // The brief names no list here; these six are its own highlights, the facts
    // a reader still deciding is weighing.
    points: [
      "6 months, 12th pass, any stream",
      "Beginner to advanced — Dart taught from the fundamentals",
      "Provider, Bloc, Riverpod and GetX, not one single approach",
      "Firebase, REST APIs, SQLite and native device channels",
      "AI chatbots, Google ML Kit, OCR and face detection",
      "7 practical projects, signed store builds and a published package",
    ],
  },
};

const mernCertificate: After12Page = {
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
    title: "Best After 12th 6-Month MERN Stack Certificate Program in Mohali",
    paragraphs: [
      "Build your foundation in modern web development with a practical six-month MERN Stack programme designed for students after 12th. Start with HTML, CSS and JavaScript, progress into React.js, Node.js, Express.js and MongoDB, and finish by developing, deploying and presenting a complete full-stack application.",
      "Whether you are completely new to coding or want structured training alongside your degree, this programme gives you a step-by-step route from your first webpage to portfolio-ready MERN projects.",
    ],
  },

  program: {
    title: "MERN Stack Certificate Program in Mohali",
    paragraphs: [
      "Learn the technologies that form the MERN Stack — MongoDB, Express.js, React.js and Node.js through a connected, project-oriented curriculum.",
      "The programme begins with web development fundamentals and gradually introduces programming, frontend development, backend engineering, databases, authentication, APIs and deployment.",
      "During the six months, you will work on several smaller applications before moving to a major MERN project. You will also learn Git and GitHub, API testing, responsive UI development, database integration and deployment fundamentals.",
      "The final stage focuses on making your work presentable through a portfolio, GitHub profile, resume preparation, interview practice and mock coding sessions.",
    ],
    highlightsTitle: "Key Highlights",
    // The brief states these four beneath the hero rather than under a heading.
    highlights: [
      { label: "Duration", value: "6 Months" },
      { label: "Mode", value: "Classroom & 1-on-1" },
      { label: "Eligibility", value: "12th Pass" },
      { label: "Includes", value: "Placement Support" },
    ],
  },

  overview: {
    title: "Course Overview",
    // The brief's six month blocks keep their own headings, joined to the
    // paragraphs and project lines that follow each one.
    paragraphs: [
      "Month 1 — Understand How the Web Works: Begin with the fundamentals of web development. Learn how browsers communicate with servers, understand client-server architecture and explore HTTP, HTTPS, domains and hosting. Then move into HTML5, CSS3 and responsive layouts. You will also learn Git and GitHub so that your code can be managed properly from the beginning. Projects: Personal Portfolio Website, Responsive Landing Page.",
      "Month 2 — Master JavaScript: Move from basic programming concepts into modern JavaScript. Learn variables, data types, conditions, loops, functions, arrays, objects, ES6+, modules, closures, higher-order functions and DOM manipulation. You will then work with asynchronous JavaScript, promises, async/await, Fetch API, REST API integration and browser storage. Projects: Calculator, Weather App, To-Do App.",
      "Month 3 — Build Interfaces With React: Learn how modern frontend applications are structured using React.js. Work with components, JSX, props, state, hooks, routing and API communication. Context API and Tailwind CSS are introduced for state management and responsive interface development. You will also explore JWT-based authentication and protected routes. Projects: Blog Website, Employee Dashboard, E-commerce Frontend.",
      "Month 4 — Develop the Backend: Learn how the server side of a web application works using Node.js and Express.js. Build REST APIs, work with middleware and MVC architecture, and implement authentication and authorisation. MongoDB and Mongoose are used for database development, while Multer, Cloudinary and Nodemailer introduce file and email functionality. Projects: Authentication System, Student Management System, Library Management System.",
      "Month 5 — Develop a Major MERN Project: Take one complete project through the development lifecycle. Start with requirements and user stories, create wireframes, plan the database and APIs, then build the frontend and backend. Testing, debugging, security, performance, documentation, code reviews and GitHub workflows are included throughout the project.",
      "Month 6 — Deployment & Career Preparation: Take your application toward production by learning deployment with Vercel, Render and MongoDB Atlas. The final month also covers portfolio development, ATS-friendly resumes, GitHub and LinkedIn profiles, technical interview preparation, aptitude, logical reasoning, HR discussions, live coding and mock interviews.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    // The brief numbers its six outcomes but writes no lead-in; this states its
    // own arrangement in a sentence.
    intro:
      "Six outcomes across the six months — from your first responsive page through to a deployed full-stack application you can demonstrate.",
    items: [
      {
        title: "Create Your Own Portfolio",
        body: "Develop a responsive portfolio website using HTML5 and CSS3 and use Git and GitHub to maintain and showcase your source code.",
      },
      {
        title: "Develop React Applications",
        body: "Create component-based interfaces with React, hooks, routing, Context API, Axios and Tailwind CSS.",
      },
      {
        title: "Build REST APIs",
        body: "Learn to create backend services using Node.js and Express.js, connect them to MongoDB and implement CRUD operations.",
      },
      {
        title: "Secure Your Applications",
        body: "Understand authentication, authorisation, password hashing, JWT tokens and protected routes.",
      },
      {
        title: "Work With Databases",
        body: "Learn MongoDB fundamentals and use Mongoose to create schemas, models, validation and relationships through population.",
      },
      {
        title: "Deploy a Full-Stack Application",
        body: "Learn the basics of hosting a MERN project using Vercel, Render and MongoDB Atlas and prepare your application for live demonstration.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The programme follows a six-stage learning path, taking you from beginner web concepts to a deployed MERN application.",
    // Each month keeps the brief's own grouping headings and practical-project
    // lines in place as entries, so the order and wording are as supplied.
    modules: [
      {
        title: "Month 1 — Web Development Fundamentals",
        points: [
          "Web Fundamentals",
          "Introduction to web development",
          "How the internet works",
          "Client-server architecture",
          "Frontend vs backend vs full stack",
          "HTTP and HTTPS",
          "Browser fundamentals",
          "Domains and hosting",
          "HTML5",
          "HTML structure",
          "Semantic elements",
          "Headings and paragraphs",
          "Lists and tables",
          "Forms",
          "Images and media",
          "Accessibility fundamentals",
          "CSS3",
          "Selectors",
          "Box model",
          "Flexbox",
          "CSS Grid",
          "Typography",
          "Spacing",
          "Transitions and animations",
          "Responsive design",
          "Media queries",
          "Git & GitHub",
          "Git fundamentals",
          "Repository creation",
          "Commits",
          "Branches",
          "Merging",
          "Pull requests",
          "GitHub workflow",
          "Practical Projects: Personal portfolio website · Responsive landing page",
        ],
      },
      {
        title: "Month 2 — JavaScript Development",
        points: [
          "JavaScript Fundamentals",
          "Variables",
          "Data types",
          "Operators",
          "Template literals",
          "Input and output",
          "Control Flow",
          "Conditions",
          "Loops",
          "Functions",
          "Arrow functions",
          "Scope",
          "Hoisting",
          "Arrays & Objects",
          "Array methods",
          "Object methods",
          "Destructuring",
          "Spread operator",
          "Rest operator",
          "JSON",
          "Advanced JavaScript",
          "Higher-order functions",
          "Closures",
          "ES6+",
          "Modules",
          "Callback functions",
          "DOM Manipulation",
          "DOM selection",
          "Events",
          "Dynamic elements",
          "Forms",
          "Form validation",
          "Asynchronous JavaScript",
          "Promises",
          "async/await",
          "Fetch API",
          "REST API integration",
          "Error handling",
          "Browser Storage",
          "Local storage",
          "Session storage",
          "Practical Projects: Calculator · Weather application · To-do application",
        ],
      },
      {
        title: "Month 3 — React.js Development",
        points: [
          "React Fundamentals",
          "React introduction",
          "Vite",
          "JSX",
          "Components",
          "Props",
          "State",
          "React Hooks",
          "useState",
          "useEffect",
          "useRef",
          "Custom hooks",
          "React Routing",
          "React Router DOM",
          "Routes",
          "Nested routes",
          "Protected routes",
          "API Integration",
          "Axios",
          "Fetch API",
          "CRUD operations",
          "API error handling",
          "State Management",
          "Context API",
          "useContext",
          "UI Development",
          "Tailwind CSS",
          "Responsive design",
          "Reusable components",
          "Frontend Authentication",
          "Login",
          "Signup",
          "JWT authentication",
          "Protected routes",
          "Practical Projects: Blog website · Employee dashboard · E-commerce frontend",
        ],
      },
      {
        title: "Month 4 — Node.js, Express.js & MongoDB",
        points: [
          "Node.js",
          "Node.js fundamentals",
          "Modules",
          "npm",
          "package.json",
          "File system",
          "HTTP module",
          "Express.js",
          "Express server",
          "Routing",
          "Middleware",
          "MVC architecture",
          "REST APIs",
          "Authentication",
          "bcrypt",
          "JWT",
          "Authorisation",
          "Protected routes",
          "MongoDB",
          "Database fundamentals",
          "Collections and documents",
          "CRUD operations",
          "Query operators",
          "Aggregation basics",
          "Mongoose",
          "Schemas",
          "Models",
          "Validation",
          "Population",
          "File & Email Features",
          "Multer",
          "Cloudinary",
          "Nodemailer",
          "Practical Projects: Authentication system · Student management system · Library management system",
        ],
      },
      {
        title: "Month 5 — Industry Project Development",
        points: [
          "Planning & Architecture",
          "Project selection",
          "Requirement analysis",
          "User stories",
          "Wireframing",
          "Folder structure",
          "Database design",
          "API planning",
          "Frontend Implementation",
          "Dashboard",
          "Forms",
          "Routing",
          "API integration",
          "Responsive UI",
          "Backend Implementation",
          "REST APIs",
          "Authentication",
          "CRUD functionality",
          "Database integration",
          "File uploads",
          "Testing & Optimisation",
          "Debugging",
          "API testing",
          "Error handling",
          "Performance optimisation",
          "Security best practices",
          "Project Review",
          "Code review",
          "Feature completion",
          "Bug fixing",
          "Documentation",
          "Git and GitHub workflow",
          "Project Outcome: A complete MERN application developed through a structured project lifecycle.",
        ],
      },
      {
        title: "Month 6 — Deployment & Placement Preparation",
        points: [
          "Deployment & Hosting",
          "Vercel",
          "Render",
          "MongoDB Atlas",
          "Environment variables",
          "Domain basics",
          "Hosting concepts",
          "Final Project",
          "Feature improvements",
          "Testing",
          "Performance optimisation",
          "Documentation",
          "GitHub repository",
          "Live project presentation",
          "Career Portfolio",
          "ATS-friendly resume",
          "GitHub profile",
          "LinkedIn profile",
          "Portfolio website",
          "Project descriptions",
          "Technical Interview Preparation",
          "HTML interview questions",
          "CSS interview questions",
          "JavaScript interview questions",
          "React interview questions",
          "Node.js interview questions",
          "Express interview questions",
          "MongoDB interview questions",
          "REST API concepts",
          "Authentication questions",
          "Placement Preparation",
          "Aptitude",
          "Logical reasoning",
          "HR interview preparation",
          "Technical mock interviews",
          "Live coding",
          "Communication skills",
          "Career guidance",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the projects that close each month, and the deployed application the
    // sixth month ends on.
    practical: {
      title: "Practical Projects Every Month",
      body: "Each of the first four months closes on its own applications, month five is one complete project taken through its lifecycle, and month six deploys and presents it.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have moved from a first webpage through JavaScript, React, Node, Express and MongoDB to a deployed, documented full-stack application and an interview-ready portfolio.",
    },
  },

  tools: {
    title: "Tools You Will Practise With",
    intro: "The programme introduces the tools used across different stages of MERN development.",
    // The brief lists the twenty names but writes no line for each; every line
    // below is that tool's own job in the curriculum above.
    items: [
      { name: "HTML5", body: "Structure, semantic elements, forms and accessibility." },
      { name: "CSS3", body: "The box model, Flexbox, Grid, media queries and animation." },
      { name: "JavaScript", body: "Logic, the DOM, ES6+, async and browser storage." },
      { name: "React.js", body: "Components, hooks, routing and Context API." },
      { name: "Node.js", body: "The server-side runtime, modules and npm." },
      { name: "Express.js", body: "Routing, middleware, MVC and REST APIs." },
      { name: "MongoDB", body: "Collections, documents, query operators and aggregation." },
      { name: "MongoDB Atlas", body: "The hosted database the deployed project uses." },
      { name: "Mongoose", body: "Schemas, models, validation and population." },
      { name: "Git", body: "Commits, branches and a recoverable history." },
      { name: "GitHub", body: "Repositories, pull requests and the portfolio profile." },
      { name: "VS Code", body: "Where the code is written and debugged." },
      { name: "Postman", body: "Test and inspect API requests." },
      { name: "Tailwind CSS", body: "Responsive React interfaces and reusable components." },
      { name: "Vite", body: "The React project toolchain." },
      { name: "Axios", body: "API calls from the React frontend." },
      { name: "Vercel", body: "Frontend deployment." },
      { name: "Render", body: "Backend deployment." },
      { name: "Cloudinary", body: "File and image handling." },
      { name: "Nodemailer", body: "Email functionality from the server." },
    ],
  },

  who: {
    title: "Who Can Join This Course?",
    items: [
      {
        title: "Students After 12th",
        body: "Start learning web development immediately after school with a curriculum that introduces coding gradually instead of assuming prior programming experience.",
        icon: "users",
      },
      {
        title: "College Students",
        body: "Students pursuing BCA, B.Sc, B.Com or other degree programmes can use the course to develop practical software skills alongside their academic studies.",
        icon: "certificate",
      },
      {
        title: "Students From Any Stream",
        body: "Arts, commerce and non-medical students can explore MERN development with a beginner-friendly starting point.",
        icon: "sparkles",
      },
      {
        title: "Career Switchers",
        body: "Learners from non-technical backgrounds can follow the structured roadmap and gradually build software development skills.",
        icon: "refresh",
      },
      {
        title: "Freelancers",
        body: "Build websites, dashboards, APIs and database-driven applications that can become part of your freelance portfolio.",
        icon: "briefcase",
      },
      {
        title: "Self-Learners",
        body: "If you have learned individual technologies through online tutorials but want structured projects and trainer guidance, the programme provides a more organised learning path.",
        icon: "terminal",
      },
    ],
  },

  worth: {
    title: "Why This Six-Month Programme Is Worth It",
    items: [
      {
        title: "One Connected Curriculum",
        body: "HTML, CSS, JavaScript, React, Node.js, Express and MongoDB are taught as parts of the same development workflow.",
        icon: "layers",
      },
      {
        title: "Multiple Practical Projects",
        body: "Instead of waiting until the end to build something, you apply new concepts through projects throughout the programme.",
        icon: "cube",
      },
      {
        title: "Dedicated Major Project",
        body: "One complete month is reserved for developing a full-stack application from planning to testing and documentation.",
        icon: "rocket",
      },
      {
        title: "Backend & API Skills",
        body: "Learn REST APIs, CRUD operations, authentication, authorisation and database integration.",
        icon: "terminal",
      },
      {
        title: "GitHub-Based Development",
        body: "Understand how to organise repositories and maintain your development work with version control.",
        icon: "code",
      },
      {
        title: "Deployment Experience",
        body: "Move beyond localhost and learn the fundamentals of deploying a frontend, backend and database.",
        icon: "cloud",
      },
      {
        title: "Career Preparation",
        body: "Build a professional resume, portfolio and online developer presence while practising technical and behavioural interviews.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Why Learn MERN After 12th?",
    paragraphs: [
      "Starting development skills early gives you more time to practise before graduation.",
      "Over six months, you can move from basic HTML and CSS to building complete applications with a frontend, backend, database and authentication system.",
      "This approach gives you practical work that can later be improved as your development skills grow.",
    ],
    listTitle: "The complete development workflow",
    // The brief's own chain — "Plan → Code → Connect → Test → Deploy → Present"
    // — with each link named against the month that delivers it.
    items: [
      { title: "Plan", body: "Month 5 — requirements, user stories, wireframes and database design." },
      { title: "Code", body: "Months 1–4 — HTML, CSS, JavaScript, React, Node and Express." },
      { title: "Connect", body: "Months 3–4 — APIs, MongoDB, authentication and file handling." },
      { title: "Test", body: "Month 5 — debugging, API testing, performance and security." },
      { title: "Deploy", body: "Month 6 — Vercel, Render, MongoDB Atlas and environment variables." },
      { title: "Present", body: "Month 6 — portfolio, GitHub, resume and live project presentation." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with the techcadd team settles eligibility, batch timings, fees and where this leads — before you commit six months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Complete the Programme With Practical Work",
    intro:
      "Students who successfully complete the programme can receive course documentation according to the current programme terms. For the latest details regarding certificates, internship documentation and applicable terms, contact the Mohali team.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "Documentation of successful completion of the MERN Stack programme.",
      },
      {
        icon: "layers",
        title: "Practical Project Portfolio",
        body: "Projects developed throughout the six-month curriculum.",
      },
      {
        icon: "rocket",
        title: "Major MERN Project",
        body: "A complete full-stack application developed during the project module.",
      },
      {
        icon: "briefcase",
        title: "Career Preparation",
        body: "Resume, portfolio and interview preparation support.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Can Take You",
    intro: "A MERN Stack foundation can support entry-level career paths such as:",
    listTitle: "Roles this programme prepares you for",
    // The brief names the ten roles without descriptions; each line below is
    // that role's own work within the stack taught above. Its closing caveat is
    // carried into the FAQ that asks about becoming a developer.
    steps: [
      { title: "Junior MERN Developer", body: "Work across React, Node, Express and MongoDB features." },
      { title: "React.js Developer", body: "Build component-based interfaces and consume APIs." },
      { title: "Frontend Developer", body: "Responsive UI, routing and state in the browser." },
      { title: "Node.js Developer", body: "Server-side logic, modules and the runtime." },
      { title: "Backend Developer", body: "REST APIs, authentication and database integration." },
      { title: "Full Stack Developer", body: "Both halves of the application, end to end." },
      { title: "JavaScript Developer", body: "One language across the frontend and the server." },
      { title: "Web Application Developer", body: "Database-driven applications for real users." },
      { title: "Junior Software Developer", body: "An entry point into a wider software team." },
      { title: "Freelance Web Developer", body: "Websites, dashboards and APIs for your own clients." },
    ],
  },

  projects: {
    title: "Hands-On Projects You Will Build",
    // Each project keeps the brief's own month-and-stack line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Personal Portfolio Website",
        body: "Create your first responsive website using semantic HTML5 and CSS3. Add your project work later and maintain the code through Git and GitHub. Month 1 · HTML5 · CSS3 · Git",
      },
      {
        title: "Calculator, Weather & To-Do Apps",
        body: "Build three JavaScript applications to practise DOM manipulation, events, validation, browser storage and asynchronous API communication. Month 2 · JavaScript · Fetch API",
      },
      {
        title: "Blog, Employee Dashboard & E-commerce Frontend",
        body: "Create modern React applications using components, hooks, routing, API calls, Context API and Tailwind CSS. Month 3 · React.js · Axios · Tailwind CSS",
      },
      {
        title: "Authentication & Management Applications",
        body: "Develop backend-powered applications with Node.js, Express and MongoDB. Add authentication, CRUD operations, validation, protected routes and file-handling functionality. Month 4 · Node.js · Express.js · MongoDB",
      },
      {
        title: "Major MERN Application",
        body: "Select a suitable application idea and take it from requirements and wireframes to frontend development, backend APIs, database integration, authentication, testing and documentation. Month 5 · Full Stack MERN",
      },
      {
        title: "Deployed Full-Stack Application",
        body: "Prepare the major project for online deployment using Vercel, Render and MongoDB Atlas. Organise the repository, configure environment variables and present the completed application. Month 6 · Vercel · Render · MongoDB Atlas",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Present It.",
    paragraphs: [
      "This cycle helps you develop both coding ability and project communication skills.",
    ],
    items: [
      {
        title: "Understand",
        body: "Break a requirement into features and decide how the application should work before writing the code.",
        icon: "layers",
      },
      {
        title: "Build",
        body: "Develop the application step by step, test your features and improve the implementation through practical guidance.",
        icon: "cube",
      },
      {
        title: "Present",
        body: "Explain the project, demonstrate its features and understand the technical decisions behind your implementation.",
        icon: "briefcase",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Choose techcadd for MERN Training in Mohali?",
    // The brief writes no lead-in for this block; this states what its six
    // points have in common.
    intro:
      "A beginner-friendly path through both halves of the stack, with a project at every stage and a month reserved for the major build.",
    items: [
      {
        title: "Beginner-Friendly Learning Path",
        body: "The curriculum starts with fundamental web concepts before moving into programming and full-stack application development.",
        icon: "sparkles",
      },
      {
        title: "Practical Project Work",
        body: "Each stage gives you opportunities to apply what you have learned through websites, JavaScript applications, React projects and backend systems.",
        icon: "cube",
      },
      {
        title: "Classroom & 1-on-1 Options",
        body: "Choose a learning format based on your preferred training approach and requirements.",
        icon: "users",
      },
      {
        title: "Full-Stack Exposure",
        body: "Learn both frontend and backend development instead of limiting your training to a single technology.",
        icon: "layers",
      },
      {
        title: "Deployment-Oriented Learning",
        body: "Understand how a complete application can move from local development toward a hosted environment.",
        icon: "cloud",
      },
      {
        title: "Career Support",
        body: "Work on resume preparation, portfolio presentation, GitHub, interview questions, mock interviews and coding practice.",
        icon: "briefcase",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore more career-focused programmes at techcadd.",
    // The 6-month and 9-month tracks use the slugs the After 12th menu reserves
    // for them in `@/lib/site`; the 3-month MERN page and the catalogue MERN
    // page are live.
    items: [
      {
        title: "After 12th 3-Month MERN Stack Program",
        body: "A shorter MERN learning path for students who want an introduction to MongoDB, Express.js, React.js and Node.js.",
        href: "/courses/after12th/mern-full-stack",
      },
      {
        title: "After 12th 6-Month Full Stack Development Program",
        body: "A broader full-stack development pathway covering technologies such as Python, Django and APIs.",
        href: "/after-12th/full-stack-development-certificate-program",
      },
      {
        title: "After 12th 6-Month Data Science Program",
        body: "Explore Python, data analysis, visualisation and machine-learning concepts through practical learning.",
        href: "/after-12th/data-science-certificate-program",
      },
      {
        title: "After 12th 6-Month Artificial Intelligence Program",
        body: "Develop foundational AI knowledge and explore tools and techniques used to create intelligent applications.",
        href: "/after-12th/artificial-intelligence-certificate-program",
      },
      {
        title: "After 12th 9-Month MERN Stack Program",
        body: "A longer MERN learning route for students who want additional time for practice, projects and development concepts.",
        href: "/after-12th/mern-stack-diploma-program",
      },
      {
        title: "MERN Stack Program",
        body: "A dedicated programme for learners who want to focus on modern JavaScript-based full-stack development.",
        href: "/courses/course/mern-full-stack",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the After 12th MERN Stack programme?",
      a: "The programme runs for six months and covers web fundamentals, JavaScript, React.js, backend development, MongoDB, project development, deployment and career preparation.",
    },
    {
      q: "Can I join after 12th without coding knowledge?",
      a: "Yes. The curriculum begins with basic web development concepts and gradually progresses toward full-stack development.",
    },
    {
      q: "Does my 12th stream matter?",
      a: "The programme is designed for learners from different streams. Prior professional programming experience is not required to begin.",
    },
    {
      q: "How many projects will I complete?",
      a: "You will work on multiple mini projects throughout the first four months and a dedicated major MERN project during the fifth month, followed by deployment and presentation.",
    },
    {
      q: "What technologies are included?",
      a: "The core curriculum includes HTML5, CSS3, JavaScript, React.js, Node.js, Express.js, MongoDB and Mongoose, along with Git, GitHub, Postman, Tailwind CSS and deployment tools.",
    },
    {
      q: "Will I learn REST API development?",
      a: "Yes. REST API creation and integration are covered across the JavaScript, React and backend modules.",
    },
    {
      q: "Will authentication be included?",
      a: "Yes. The curriculum covers bcrypt, JWT authentication, authorisation and protected routes.",
    },
    {
      q: "Will I learn MongoDB?",
      a: "Yes. MongoDB CRUD operations, query operators, aggregation basics and Mongoose schemas, models and validation are included.",
    },
    {
      q: "Can I deploy my project?",
      a: "Yes. The final module introduces deployment using Vercel, Render and MongoDB Atlas.",
    },
    {
      q: "Do you provide placement support?",
      a: "The programme includes placement-oriented preparation such as resume guidance, portfolio development, technical interview preparation, mock interviews and coding practice. Placement should not be considered guaranteed.",
    },
    {
      q: "Will I get a certificate?",
      a: "Certificate details depend on the applicable programme terms. Contact the Mohali team for the current course completion and internship documentation details.",
    },
    {
      q: "Is the six-month programme different from a three-month MERN course?",
      a: "The six-month route provides more time for JavaScript, React, backend development, database concepts, projects, deployment and interview preparation. The best option depends on your learning goals and available time.",
    },
    {
      q: "Are weekend and evening batches available?",
      a: "Batch availability can vary. Contact the Mohali team for the latest weekday, evening and weekend schedules.",
    },
    {
      q: "How long is each class?",
      a: "Class duration and schedules may vary by batch. Confirm the current timetable with the Mohali admissions team.",
    },
    // The brief states this caveat under "Where This Course Can Take You"; it
    // answers a question, so it runs with the rest.
    {
      q: "Will this course get me a developer job?",
      a: "Your career outcome will depend on your technical skills, projects, interview performance, experience and the requirements of individual employers.",
    },
  ],

  enquiry: {
    title: "Ask About MERN Stack Certificate Program in Mohali",
    // The contact details the brief supplies are the centre's own; the page
    // already renders them from `@/lib/site`, so only the wording is carried
    // here rather than a second copy of the number.
    paragraphs: [
      "Want to know more about the syllabus, fees, batch timings, learning mode or placement support? Connect with the course team to discuss your current education level and find out whether this six-month MERN roadmap matches your goals.",
      "Counselling hours: Monday–Saturday, 9:00 AM–7:00 PM.",
    ],
  },

  fit: {
    title: "Not Sure If MERN Is the Right Choice?",
    paragraphs: [
      "A demo session can help you understand what you will learn before making your decision.",
      "Explore the course structure, discuss your goals, understand the project work and ask questions about the learning process.",
    ],
    ctaTitle: "Book a Free Demo",
    // The brief names no list here; these six are its own highlights, the facts
    // a reader still deciding is weighing.
    points: [
      "6 months, 12th pass, any stream",
      "No prior coding knowledge required",
      "Classroom & 1-on-1 learning modes",
      "HTML, CSS, JavaScript, React, Node, Express and MongoDB",
      "A full month reserved for the major project",
      "Deployment, portfolio and placement preparation",
    ],
  },
};

const agenticAiCertificate: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Future scope" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "Best After 12th 6-Month Agentic AI Program in Mohali",
    paragraphs: [
      "Build practical AI agents from the ground up with a six-month, project-driven programme designed for students after 12th. Start with Python, APIs and LLM fundamentals, then progress into RAG, memory, agent frameworks, evaluation, security, multi-agent architectures, browser automation, deployment and AI infrastructure.",
      "By the end of the programme, you will have worked on practical AI systems, evaluated their performance, secured them against common attacks and deployed production-oriented projects that can strengthen your technical portfolio.",
    ],
  },

  program: {
    title: "Agentic AI Certificate Program in Mohali",
    paragraphs: [
      "The 6-Month Agentic AI Program in Mohali takes you beyond basic prompting and introduces the engineering practices required to design, build, test and operate AI-powered agents.",
      "The programme progresses from beginner-level Python to advanced areas including MCP, RAG, LangGraph, model routing, DSPy, GraphRAG, durable execution, multi-agent systems, browser agents, AI security and Kubernetes.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "6 Months" },
      { label: "Learning Mode", value: "Practical + Theory" },
      { label: "Eligibility", value: "12th Pass, Any Stream" },
      { label: "Focus", value: "AI Agents, LLM Applications & Production Engineering" },
      {
        label: "Includes",
        value: "Course completion certification and career support, subject to current programme terms",
      },
      { label: "Location", value: "Mohali, Punjab" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "This six-month programme follows a structured path from programming fundamentals to advanced agent engineering.",
      "During the first three months, you establish the core knowledge needed to work with Python, APIs, language models, prompting, tool calling, retrieval systems, memory, agent frameworks and evaluation.",
      "The second half focuses on professional engineering practices. You work with asynchronous Python, model routing, prompt optimisation, production MCP, advanced retrieval, knowledge graphs, durable workflows, multi-agent systems, browser automation, coding agents, AI security and cloud-native deployment.",
      "Rather than treating every topic as isolated theory, the programme connects each concept with a practical implementation. You progressively build systems, test them, analyse their behaviour and improve them.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    // The brief numbers its four outcomes but writes no lead-in; this states its
    // own arrangement in a sentence.
    intro:
      "Four engineering outcomes the six months are built around — reliability, security, durability and cost.",
    items: [
      {
        title: "Build Reliable AI Agents",
        body: "Move beyond simple chatbot demonstrations and understand how reliable AI systems are engineered using concurrency controls, retries, circuit breakers, checkpoints and failure-handling strategies.",
      },
      {
        title: "Test and Secure AI Systems",
        body: "Learn how to evaluate AI applications and identify vulnerabilities such as prompt injection, unsafe tool usage and data exposure through structured testing and red-team exercises.",
      },
      {
        title: "Design Durable AI Workflows",
        body: "Create workflows that can maintain state, recover from interruptions and continue long-running tasks without losing important progress.",
      },
      {
        title: "Engineer for Cost and Performance",
        body: "Learn how model selection, routing, caching, context management and smaller models can influence latency, quality and operating costs.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    // The brief writes no lead-in for the curriculum; this names the two halves
    // it is actually divided into.
    intro:
      "Six months in two halves — Python, prompting, retrieval, memory, frameworks and evaluation across months one to three, then production engineering, advanced retrieval, multi-agent systems, security and deployment across months four to six.",
    // Each month keeps the brief's own "Tool Stack" and deliverable lines in
    // place as entries, so the order and wording are as supplied.
    modules: [
      {
        title: "Month 1 — Python, LLM Prompting & Tool Calling",
        points: [
          "Begin with Python and gradually connect programming concepts to modern AI application development.",
          "Python fundamentals including syntax, variables, data structures, loops, functions and classes.",
          "Type hints, asynchronous programming and virtual environments using modern Python tooling.",
          "Command-line fundamentals and development workflows.",
          "Git and GitHub including repositories, commits, branches, pull requests and .gitignore.",
          "HTTP, REST APIs, JSON, API keys and bearer-token authentication.",
          "Introduction to SQL and PostgreSQL.",
          "Docker fundamentals and application containerisation.",
          "Understanding language models through tokens, context windows, temperature and conversational roles.",
          "Core characteristics of AI agents: goals, tools, memory and autonomy.",
          "Prompt design including few-shot prompting and structured responses.",
          "JSON Schema and Pydantic validation.",
          "Tool calling and parameter design.",
          "Building a ReAct-style agent loop without depending entirely on a framework.",
          "Model Context Protocol (MCP), including servers, clients, resources and transports.",
          "Connecting external REST APIs with AI tools.",
          "Tool Stack: Python · Git · GitHub · FastAPI · PostgreSQL · Docker · Claude API · OpenAI API · Pydantic · MCP SDK",
          "Deliverable: A containerised API service, model comparison exercise and an MCP server containing multiple usable tools.",
        ],
      },
      {
        title: "Month 2 — RAG, Memory & Agent Frameworks",
        points: [
          "Learn how AI applications can retrieve external knowledge, preserve useful context and coordinate complex tasks.",
          "Retrieval-Augmented Generation fundamentals.",
          "Embeddings and vector representations.",
          "Document chunking and parsing for PDFs and structured information.",
          "Vector databases and similarity search.",
          "Qdrant, Chroma and FAISS.",
          "Keyword and semantic hybrid retrieval.",
          "Reranking and citation-aware responses.",
          "Measuring retrieval and answer quality.",
          "Faithfulness, context precision and relevance.",
          "Understanding when RAG is preferable to fine-tuning.",
          "Short-term, long-term and episodic memory.",
          "Conversation history and summarisation.",
          "Context engineering and state management.",
          "Multi-user data separation and privacy considerations.",
          "Persistent state and checkpointing.",
          "LangGraph nodes, edges, routing and subgraphs.",
          "Human approval workflows.",
          "Time-travel debugging and resumable execution.",
          "Supervisor-worker and handoff-based multi-agent patterns.",
          "Tool Stack: LlamaIndex · LangChain · Qdrant · Chroma · FAISS · RAGAS · LangGraph · Mem0 · Redis",
          "Deliverable: A cited knowledge assistant, persistent memory system and stateful approval workflow.",
        ],
      },
      {
        title: "Month 3 — Evaluation, Guardrails & Deployed Agents",
        points: [
          "Turn experimental AI applications into measurable and deployable services.",
          "Creating evaluation datasets from practical examples.",
          "Deterministic testing versus LLM-based evaluation.",
          "Tool-selection and trajectory evaluation.",
          "RAG quality measurement.",
          "Faithfulness, relevance and context-recall metrics.",
          "Regression testing and CI evaluation gates.",
          "Token and cost monitoring.",
          "Prompt injection fundamentals.",
          "Input and output guardrails.",
          "PII detection and filtering.",
          "Refusal and escalation policies.",
          "Streaming AI APIs.",
          "Rate limiting and secrets management.",
          "Containerised agent deployment.",
          "Building interfaces with Streamlit.",
          "Logging and monitoring.",
          "Architecture documentation and technical demonstrations.",
          "Tool Stack: LangSmith · Langfuse · RAGAS · promptfoo · Guardrails AI · Presidio · Docker · Streamlit · Railway · GitHub Actions",
          "Deliverable: A deployed AI agent with an evaluation report, architecture diagram, GitHub repository and technical demonstration.",
        ],
      },
      {
        title: "Month 4 — Production Python, Model Routing & Prompt Optimisation",
        points: [
          "Develop the engineering skills needed to handle larger AI workloads efficiently.",
          "Async Python for I/O-heavy AI applications.",
          "Concurrency limits, semaphores and connection pooling.",
          "Pydantic-based domain modelling.",
          "Dependency injection.",
          "Structured application logging.",
          "Testing strategies for non-deterministic AI applications.",
          "Fixtures, snapshots and test cassettes.",
          "Repository architecture for AI projects.",
          "Retry strategies and exponential backoff.",
          "Jitter and circuit breakers.",
          "Attention and KV-cache fundamentals.",
          "Prefill and decode concepts.",
          "Sampling parameters and reasoning models.",
          "Quantisation using formats such as GGUF, AWQ and GPTQ.",
          "Open-source versus hosted model economics.",
          "Self-hosted model serving.",
          "Model routing and fallback strategies.",
          "Context-window management.",
          "Context compaction.",
          "Prompt caching.",
          "DSPy signatures and metric-based prompt optimisation.",
          "Prompt versioning and rollback.",
          "Reflection and self-refinement techniques.",
          "Domain-specific and multilingual prompting.",
          "Tool Stack: asyncio · Pydantic · pytest · httpx · Tenacity · structlog · ruff · mypy · vLLM · Ollama · Hugging Face Transformers · llama.cpp · LiteLLM · OpenRouter · DSPy · Instructor · Outlines · promptfoo · Langfuse",
          "Practical Project: Build a high-volume LLM processing pipeline with controlled concurrency, resumable execution and model routing.",
          "Deliverable: A typed and tested LLM client, model router, self-hosted inference endpoint and DSPy-optimised module.",
        ],
      },
      {
        title: "Month 5 — Production Tools, Advanced Retrieval & Multi-Agent Systems",
        points: [
          "Move into advanced agent architecture and production-grade tool integration.",
          "Designing AI tools like production APIs.",
          "Tool catalogues and dynamic tool selection.",
          "Permission scopes and namespaces.",
          "Production MCP architecture.",
          "OAuth-based authentication.",
          "MCP resources, prompts and sampling.",
          "Streamable HTTP transport.",
          "Secure code-execution environments.",
          "Long-running asynchronous tools.",
          "Tool-result compression.",
          "Designing tools with controlled permissions.",
          "Query rewriting and decomposition.",
          "HyDE and multi-query retrieval.",
          "Reciprocal Rank Fusion.",
          "Cross-encoder reranking.",
          "Late-interaction retrieval.",
          "Contextual and hierarchical chunking.",
          "Knowledge graphs and GraphRAG.",
          "Multi-hop information retrieval.",
          "Multimodal retrieval.",
          "Index updates and retrieval-error analysis.",
          "Memory read/write/update/forget strategies.",
          "Memory consolidation and conflict resolution.",
          "Temporal knowledge graphs.",
          "ReAct and Plan-and-Execute patterns.",
          "Reflexion and evaluator-optimiser workflows.",
          "Router and orchestrator-worker architectures.",
          "Durable execution and rollback strategies.",
          "Hierarchical and network-based multi-agent architectures.",
          "Shared state versus message passing.",
          "Deadlock and infinite-handoff detection.",
          "Comparing multi-agent and single-agent systems.",
          "Tool Stack: MCP SDKs · FastMCP · MCP Inspector · E2B · Composio · Qdrant · Weaviate · Elasticsearch · Neo4j · GraphRAG · ColBERT · Cohere Rerank · RAGAS · LangGraph Platform · Temporal · Prefect · CrewAI · AutoGen · Ray · Kafka",
          "Deliverable: A protected MCP server, advanced retrieval service with a knowledge graph and a durable multi-agent application.",
        ],
      },
      {
        title: "Month 6 — Browser Agents, Evaluation, Security, Deployment & Capstone",
        points: [
          "The final month brings together agent development, security, infrastructure and project delivery.",
          "DOM-based and vision-based browser agents.",
          "Accessibility-tree grounding.",
          "Resilient web selectors.",
          "Authentication and session management.",
          "Responsible and lawful web automation.",
          "Screenshot-reason-act computer-use loops.",
          "Coding agents and repository indexing.",
          "Automated diff generation.",
          "Test-driven coding-agent workflows.",
          "Sandboxed code execution.",
          "AI-generated pull-request review.",
          "Evaluation dataset design and labelling.",
          "Unit, component, end-to-end and trajectory evaluations.",
          "LLM-as-judge calibration.",
          "Online evaluation and A/B testing.",
          "Shadow deployments.",
          "Distributed tracing.",
          "Failure classification and analysis.",
          "OWASP risks for LLM applications.",
          "Direct and indirect prompt injection.",
          "Excessive agency and least-privilege architecture.",
          "Sandbox and network egress controls.",
          "MCP supply-chain security.",
          "Automated red teaming.",
          "Incident-response planning.",
          "Horizontal scaling of stateful AI services.",
          "Queues, workers and backpressure.",
          "Multi-region reliability concepts.",
          "Semantic and prompt caching.",
          "Blue/green and canary deployments.",
          "SLOs and error budgets.",
          "Infrastructure as Code.",
          "AI unit economics and cost-per-successful-task measurement.",
          "Capstone architecture and ROI planning.",
          "Technical documentation and stakeholder presentation.",
          "Tool Stack: Playwright · Browser Use · Claude Code · Aider · E2B Desktop · LangSmith · Langfuse · Braintrust · DeepEval · OpenTelemetry · Garak · PyRIT · Lakera Guard · NeMo Guardrails · Docker · Kubernetes · Helm · Terraform · ArgoCD · Prometheus · Grafana",
          "Final Deliverable: A complete AI capstone with evaluation, security testing, deployment documentation, cost analysis and a technical case study.",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the deliverable that closes every month, and the capstone.
    practical: {
      title: "A Deliverable Every Month",
      body: "Each of the six months closes on its own shipped artefact — an MCP server, a cited knowledge assistant, a deployed agent, a model router, a durable multi-agent application and the final capstone.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have built, evaluated, secured, deployed and costed AI agents across the full engineering stack, closing on a documented capstone with a technical case study.",
    },
  },

  tools: {
    title: "Technologies You Will Practise",
    intro:
      "The programme uses a broad development stack so that you understand not only how AI models work, but also how AI applications are developed around them.",
    // The brief lists the thirty-five names but writes no line for each; every
    // line below is that tool's own job in the curriculum above.
    items: [
      { name: "Python", body: "The language everything in the programme is built in." },
      { name: "Git & GitHub", body: "Repositories, branches and the development workflow." },
      { name: "FastAPI", body: "Serve agents and pipelines behind an HTTP API." },
      { name: "PostgreSQL", body: "Relational storage for application and agent data." },
      { name: "Docker", body: "Containerise the agent for deployment." },
      { name: "OpenAI API", body: "One of the model providers behind the agents." },
      { name: "Claude API", body: "A second provider, for comparison and structured work." },
      { name: "LangChain", body: "Chains, tools and the glue around model calls." },
      { name: "LangGraph", body: "Nodes, edges, routing, subgraphs and durable state." },
      { name: "LlamaIndex", body: "Document indexing and retrieval pipelines." },
      { name: "Qdrant", body: "A vector database for semantic search." },
      { name: "Chroma", body: "A lightweight vector store for local RAG work." },
      { name: "FAISS", body: "Similarity search over embeddings at speed." },
      { name: "Redis", body: "Short-term memory and fast shared state." },
      { name: "RAGAS", body: "Measure retrieval and answer quality." },
      { name: "LangSmith", body: "Trace runs and debug agent trajectories." },
      { name: "Langfuse", body: "Logging, monitoring and cost tracking." },
      { name: "MCP", body: "Servers, clients, resources and transports." },
      { name: "FastMCP", body: "Build production MCP servers quickly." },
      { name: "LiteLLM", body: "One interface across several model providers." },
      { name: "DSPy", body: "Signatures and metric-based prompt optimisation." },
      { name: "vLLM", body: "Self-hosted model serving at throughput." },
      { name: "Ollama", body: "Run local models on your own machine." },
      { name: "Hugging Face", body: "Transformers, tokenizers and pretrained models." },
      { name: "Neo4j", body: "The graph database behind GraphRAG." },
      { name: "GraphRAG", body: "Knowledge-graph retrieval for multi-hop questions." },
      { name: "Temporal", body: "Durable execution for long-running workflows." },
      { name: "CrewAI", body: "Multi-agent orchestration and task delegation." },
      { name: "AutoGen", body: "A second multi-agent framework to compare." },
      { name: "Playwright", body: "Browser automation for web agents." },
      { name: "Kubernetes", body: "Scale stateful AI services in production." },
      { name: "Terraform", body: "Infrastructure as Code for the deployment." },
      { name: "Helm", body: "Package and version the Kubernetes deployment." },
      { name: "Prometheus", body: "Collect service and application metrics." },
      { name: "Grafana", body: "Dashboards for reliability and cost." },
    ],
  },

  who: {
    title: "Who Can Join the Programme?",
    items: [
      {
        title: "Students After 12th",
        body: "Students from any stream can begin the programme with the Python fundamentals module and gradually progress toward AI application development.",
        icon: "users",
      },
      {
        title: "College Students",
        body: "Students pursuing BCA, B.Sc, B.Tech or other technology-related degree programmes can use the course to add practical AI engineering skills alongside their academic studies.",
        icon: "certificate",
      },
      {
        title: "Developers & Technical Learners",
        body: "Learners with existing programming knowledge can strengthen their capabilities in LLM applications, agent architecture, evaluation, security and deployment.",
        icon: "terminal",
      },
      {
        title: "Career Changers",
        body: "If you are moving toward the AI technology field, the structured six-month progression provides a practical route from programming fundamentals to project development.",
        icon: "refresh",
      },
      {
        title: "Freelancers & Entrepreneurs",
        body: "Understand how AI agents can be designed around business workflows, automation requirements, information retrieval and operational processes.",
        icon: "briefcase",
      },
      {
        title: "Self-Learners",
        body: "If you have explored AI independently but need a structured curriculum and project-based learning environment, this programme provides a guided progression.",
        icon: "sparkles",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Six Months",
    items: [
      {
        title: "Build More Than Prompt Skills",
        body: "Agentic AI requires much more than writing effective prompts. You need to understand APIs, state, tools, retrieval, evaluation, security, deployment and system reliability.",
        icon: "layers",
      },
      {
        title: "Reliability Engineering",
        body: "Learn concurrency management, retries, checkpoints, circuit breakers and failure recovery so your applications can handle problems instead of simply working during a demonstration.",
        icon: "target",
      },
      {
        title: "Cost-Aware AI Development",
        body: "Understand model selection, routing, caching and context management to design AI applications with performance and operational costs in mind.",
        icon: "chart",
      },
      {
        title: "Security-First Development",
        body: "Learn how AI applications can be attacked and how architecture, permissions, guardrails, sandboxing and monitoring can reduce risk.",
        icon: "shield",
      },
      {
        title: "Practical Multi-Agent Engineering",
        body: "Build multi-agent systems and compare them against simpler architectures instead of assuming that adding more agents automatically improves the result.",
        icon: "cube",
      },
      {
        title: "Production-Oriented Deployment",
        body: "Gain exposure to containers, cloud deployment, Kubernetes, monitoring, SLOs, infrastructure automation and operational workflows.",
        icon: "cloud",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Build AI Systems That Can Actually Do Work",
    paragraphs: [
      "AI is moving beyond question-and-answer interfaces toward systems that can use tools, retrieve information, interact with applications and complete multi-step workflows.",
      "That creates demand for people who understand the engineering layer surrounding AI models.",
      "This programme is structured around those practical engineering questions.",
    ],
    listTitle: "A strong AI engineer needs to answer questions such as",
    // The brief's own eight questions, each with the line naming where the
    // curriculum answers it.
    items: [
      { title: "How reliable is the agent?", body: "Month 4 — retries, backoff, jitter and circuit breakers." },
      { title: "What happens when a tool fails?", body: "Month 5 — durable execution and rollback strategies." },
      { title: "How is sensitive information protected?", body: "Months 3 and 6 — PII filtering, guardrails and least privilege." },
      { title: "How much does each successful task cost?", body: "Month 6 — AI unit economics and cost per successful task." },
      { title: "How do you evaluate an AI workflow?", body: "Months 3 and 6 — datasets, trajectory evals and LLM-as-judge." },
      { title: "Can the system recover after an interruption?", body: "Months 2 and 5 — checkpointing and resumable execution." },
      { title: "How do multiple agents communicate?", body: "Month 5 — shared state versus message passing." },
      { title: "How can the application be monitored after deployment?", body: "Month 6 — tracing, SLOs, Prometheus and Grafana." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with the techcadd team settles eligibility, batch timings, fees and where this leads — before you commit six months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Complete the Agentic AI Programme",
    intro:
      "After completing the required programme components, learners may receive course completion documentation according to the current certification terms.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "A certificate documenting successful completion of the Agentic AI training programme, subject to programme requirements.",
      },
      {
        icon: "layers",
        title: "Project Portfolio",
        body: "Your practical work can become part of a technical portfolio demonstrating your development experience.",
      },
      {
        icon: "cube",
        title: "Project Documentation",
        body: "Learn to document architecture, implementation decisions, testing results and deployment details.",
      },
      {
        icon: "briefcase",
        title: "Career Preparation",
        body: "Get support with resume development, project presentation, interview preparation and career guidance where included in the current programme.",
      },
    ],
  },

  takesYou: {
    title: "Where Can Agentic AI Skills Take You?",
    intro: "The programme develops skills relevant to several emerging technology roles.",
    listTitle: "Roles this programme prepares you for",
    steps: [
      {
        title: "AI Engineer / LLM Application Engineer",
        body: "Work on applications that integrate language models with APIs, databases, retrieval systems and external tools.",
      },
      {
        title: "Agent Platform Engineer",
        body: "Focus on the infrastructure, orchestration, tools and services used to operate AI agents.",
      },
      {
        title: "AI Automation / Integration Engineer",
        body: "Build AI-powered workflows that connect business systems, APIs and automated processes.",
      },
      {
        title: "MLOps / AI Reliability Engineer",
        body: "Work around deployment, monitoring, evaluation, infrastructure and reliability of AI applications.",
      },
      {
        title: "Generative AI Developer",
        body: "Develop applications using modern language models, RAG pipelines, structured generation and AI APIs.",
      },
    ],
  },

  projects: {
    title: "Hands-On Projects You Will Build",
    // Each project keeps the brief's own technologies line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Async LLM Client Library",
        body: "Create a production-oriented Python client with asynchronous execution, retries, rate limiting, caching and automated tests. Technologies: asyncio · httpx · Tenacity · pytest",
      },
      {
        title: "Multi-Provider Model Router",
        body: "Build a routing layer that can select different models according to task requirements, performance and cost. Technologies: LiteLLM · vLLM · OpenRouter",
      },
      {
        title: "GraphRAG Retrieval Service",
        body: "Combine semantic retrieval, reranking and graph-based knowledge retrieval to answer complex multi-step questions. Technologies: Neo4j · GraphRAG · ColBERT",
      },
      {
        title: "Durable Workflow Agent",
        body: "Create a long-running agent workflow capable of maintaining state and recovering after an interrupted execution. Technologies: Temporal · LangGraph · Redis",
      },
      {
        title: "Browser & Coding Agent",
        body: "Develop an automated browser workflow and explore coding-agent techniques for repository analysis, testing and code changes. Technologies: Playwright · Browser Use · Claude Code",
      },
      {
        title: "AI Red-Team Security Report",
        body: "Design an automated security-testing workflow that explores prompt injection and other common attack scenarios and documents mitigation results. Technologies: Garak · PyRIT · Lakera Guard",
      },
      {
        title: "Kubernetes AI Deployment",
        body: "Deploy an AI service using container orchestration and infrastructure automation while monitoring application performance and reliability. Technologies: Kubernetes · Helm · Terraform · ArgoCD",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Explain It.",
    paragraphs: [
      "Every major project follows a practical cycle designed to turn concepts into demonstrable skills.",
    ],
    items: [
      {
        title: "Understand",
        body: "Study the requirement, identify the technical problem and choose an appropriate architecture.",
        icon: "layers",
      },
      {
        title: "Build",
        body: "Implement the system with practical guidance, testing and iterative improvements.",
        icon: "terminal",
      },
      {
        title: "Present",
        body: "Explain your architecture, technical decisions, challenges and results so the project becomes something you can confidently discuss in interviews.",
        icon: "briefcase",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "A Structured Path From Beginner to Advanced AI Engineering",
    // The brief writes no lead-in for this block; this states what its five
    // points have in common.
    intro:
      "Progressive topics, working applications at every stage, and a stack that runs all the way to deployment.",
    items: [
      {
        title: "Skill-Based Progression",
        body: "Topics are connected progressively, allowing learners to move from Python fundamentals toward complex AI systems without jumping immediately into advanced infrastructure.",
        icon: "layers",
      },
      {
        title: "Practical Project Development",
        body: "The curriculum focuses on building working applications alongside the concepts being taught.",
        icon: "cube",
      },
      {
        title: "Modern AI Technology Stack",
        body: "Learners are introduced to current tools and frameworks used across LLM application development, retrieval, orchestration, evaluation and deployment.",
        icon: "sparkles",
      },
      {
        title: "Deployment-Focused Learning",
        body: "The programme extends beyond local development into containers, deployment, monitoring and cloud-native infrastructure.",
        icon: "cloud",
      },
      {
        title: "Career-Oriented Preparation",
        body: "Project documentation, GitHub work, portfolio development, resume preparation and interview practice can help learners present their technical skills more effectively.",
        icon: "briefcase",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore more career-focused programmes at techcadd.",
    // The 3-month Agentic AI page is live; the rest use the slugs the After 12th
    // menu reserves for them in `@/lib/site`.
    items: [
      {
        title: "After 12th 3-Month Agentic AI Program",
        body: "A shorter introduction to AI agents, tool usage, automation and modern LLM application concepts.",
        href: "/courses/after12th/agentic-ai",
      },
      {
        title: "After 12th 9-Month Agentic AI Diploma Program",
        body: "A longer learning track for students who want additional time to explore advanced AI engineering and architecture.",
        href: "/after-12th/agentic-ai-diploma-program",
      },
      {
        title: "After 12th 6-Month Artificial Intelligence Certificate Program",
        body: "Explore broader artificial intelligence concepts including machine learning, AI applications and intelligent systems.",
        href: "/after-12th/artificial-intelligence-certificate-program",
      },
      {
        title: "After 12th 6-Month Data Science Certificate Program",
        body: "Learn the journey from data preparation and analysis to business-focused insights and predictive applications.",
        href: "/after-12th/data-science-certificate-program",
      },
      {
        title: "After 12th 6-Month Cloud Computing Certificate Program",
        body: "Build foundational cloud and infrastructure skills with exposure to modern cloud platforms and deployment concepts.",
        href: "/after-12th/cloud-computing-certificate-program",
      },
      {
        title: "After 12th 6-Month Cyber Security Certificate Program",
        body: "Develop knowledge of security fundamentals, networks, applications, threats and defensive techniques.",
        href: "/after-12th/cyber-security-certificate-program",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the After 12th 6-Month Agentic AI Program in Mohali?",
      a: "The programme runs for six months. The curriculum is divided into foundational AI development during the first half and advanced engineering, security, deployment and capstone work during the later months.",
    },
    {
      q: "Can I join the Agentic AI course after 12th?",
      a: "Yes. The programme is designed to begin with Python fundamentals, making it suitable for students who are starting their technical journey after 12th.",
    },
    {
      q: "Do I need previous programming experience?",
      a: "Previous programming experience is not mandatory for the beginner pathway. Learners start with Python and progressively move into AI development.",
    },
    {
      q: "Which technologies will I learn?",
      a: "The curriculum includes Python, APIs, FastAPI, PostgreSQL, Docker, OpenAI and Claude APIs, LangChain, LangGraph, RAG, Qdrant, Redis, MCP, DSPy, LiteLLM, vLLM, Neo4j, GraphRAG, Temporal, Playwright, Kubernetes and several evaluation and security tools.",
    },
    {
      q: "What projects will I complete?",
      a: "Projects include an asynchronous LLM client, model router, GraphRAG service, durable agent workflow, browser and coding agent, AI security testing project and Kubernetes deployment.",
    },
    {
      q: "Can this course help me build a portfolio?",
      a: "Yes. The programme is strongly project-oriented, so completed applications, GitHub repositories, technical documentation and capstone work can be used to strengthen your portfolio.",
    },
    {
      q: "What career opportunities are available after the course?",
      a: "Depending on your skills and experience, relevant roles may include AI Engineer, LLM Application Developer, Generative AI Developer, AI Automation Engineer, Agent Platform Engineer and AI/MLOps-oriented roles.",
    },
    {
      q: "Is placement guaranteed?",
      a: "No training programme should be considered an automatic job guarantee. Career support can assist with resume preparation, interview practice, portfolio development and job-search readiness, while actual employment depends on skills, interviews, experience and employer requirements.",
    },
    {
      q: "Do I receive a certificate?",
      a: "Course completion certification may be provided according to the current programme requirements and terms. Contact the Mohali team for the latest certification details.",
    },
    {
      q: "What is the difference between the 3-month, 6-month and 9-month programmes?",
      a: "The shorter programme is intended for foundational exposure, the six-month programme provides a more comprehensive learning path with advanced projects, and the longer programme can provide additional depth and time for advanced topics and architecture.",
    },
    {
      q: "Can I attend alongside college?",
      a: "Batch availability depends on the current schedule. Students can contact the Mohali team to ask about weekday, evening or weekend options.",
    },
    {
      q: "How long is each class?",
      a: "The current schedule and class duration can vary by batch. Contact the Mohali centre for the latest timetable.",
    },
  ],

  enquiry: {
    title: "Ask About the Agentic AI Certificate Program",
    // The brief's contact block leaves the phone blank; the page already renders
    // the centre's real details, so only the lines it fills in are carried here.
    paragraphs: [
      "Want to understand whether Agentic AI is suitable for your career plans? Speak with a course counsellor about current batch timings, course fees, available payment or EMI options, eligibility, course structure, project work, certification, career support and the admission process.",
      "Location: Mohali, Punjab. Counselling hours: Monday – Saturday, 9:00 AM – 7:00 PM.",
    ],
  },

  fit: {
    title: "Not Sure If Agentic AI Is Right for You?",
    paragraphs: [
      "A counselling session can help you understand the curriculum, practical projects, eligibility and learning path before you enrol.",
      "Start with a free demo or speak with the Mohali course team to understand how the six-month Agentic AI programme can fit into your education and career plans.",
    ],
    ctaTitle: "Get Started Today",
    // The brief names no list here; these six are its own highlights, the facts
    // a reader still deciding is weighing.
    points: [
      "6 months, 12th pass, any stream",
      "Starts at Python — no prior programming required",
      "RAG, memory, LangGraph, MCP and multi-agent systems",
      "Evaluation, guardrails and AI security throughout",
      "7 practical projects and a deployed capstone",
      "Kubernetes, Terraform and production deployment",
    ],
  },
};

const digitalMarketingCertificate: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Future scope" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "Best After 12th 6-Month Digital Marketing Certificate Program in Mohali",
    paragraphs: [
      "Build practical digital marketing skills in six months with a structured programme covering SEO, Google Ads, Meta Ads, social media, content marketing, website development, e-commerce, analytics, email marketing and conversion optimisation.",
      "Designed for students after 12th and beginners who want to enter the digital marketing field, the programme combines classroom concepts with hands-on assignments, marketing campaigns, website projects, analytics exercises and portfolio development.",
    ],
  },

  program: {
    title: "6-Month Digital Marketing Certificate Program in Mohali",
    paragraphs: [
      "The After 12th 6-Month Digital Marketing Certificate Program in Mohali is designed to take learners from marketing fundamentals to practical campaign execution.",
      "You will learn how digital marketing channels work together, how businesses attract and convert customers online, how campaigns are measured and how marketing performance can be improved using data.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "6 Months" },
      { label: "Eligibility", value: "12th Pass Onward" },
      { label: "Mode", value: "Practical + Theory" },
      { label: "Focus", value: "SEO, Paid Advertising, Social Media, Content, Analytics & E-commerce" },
      { label: "Projects", value: "Multiple practical and portfolio-based projects" },
      { label: "Location", value: "Mohali, Punjab" },
      { label: "Career Support", value: "Resume, portfolio and interview preparation" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "Digital marketing is a combination of multiple skills rather than a single tool or platform. This programme introduces those skills progressively so that students understand both the strategy behind a campaign and the practical steps required to execute it.",
      "The initial months establish your marketing, design, content, video and website foundations. You then move into the complete SEO process, local search, social media and content marketing.",
      "The later stages focus heavily on paid advertising, e-commerce, conversion optimisation, email automation and marketing analytics.",
      "The programme also introduces freelancing, agency workflows, client communication, reporting, portfolio development and interview preparation so learners can understand how digital marketing skills are applied in professional environments.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    intro:
      "Every stage of the programme is connected to practical output so you can gradually build a portfolio while learning.",
    items: [
      {
        title: "Marketing Strategy & Campaign Planning",
        body: "Understand customer journeys, marketing funnels, buyer personas, competitor analysis, channel selection and important performance metrics.",
      },
      {
        title: "Design, Video & Website Skills",
        body: "Create marketing creatives, edit short-form videos and develop WordPress websites and landing pages that support marketing campaigns.",
      },
      {
        title: "Complete SEO Workflow",
        body: "Learn keyword research, on-page SEO, technical optimisation, content optimisation, link building, local SEO and performance tracking.",
      },
      {
        title: "Paid Advertising",
        body: "Work with Google Ads and Meta Ads, including campaign structures, audiences, conversion tracking, creative testing and optimisation.",
      },
      {
        title: "E-Commerce & Conversion",
        body: "Understand WooCommerce, Shopify, product pages, checkout optimisation, cart recovery and conversion-focused marketing.",
      },
      {
        title: "Analytics & Automation",
        body: "Use GA4, Google Tag Manager, Looker Studio, email marketing and CRM workflows to track and improve marketing performance.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    // The brief writes no lead-in for the curriculum; this names the arc it
    // actually follows.
    intro:
      "Six months from strategy and creative production through SEO, local search, social and paid advertising to e-commerce, analytics, CRM and career preparation.",
    // Each month keeps the brief's own grouping headings, explanatory lines and
    // project entries in place, so the order and wording are as supplied.
    modules: [
      {
        title: "Month 1 — Digital Marketing Strategy & Creative Production",
        points: [
          "Digital Marketing & Funnel Fundamentals — learn how online marketing works and how different channels contribute to customer acquisition.",
          "Digital marketing fundamentals",
          "7P marketing framework",
          "Consumer and buyer behaviour",
          "Customer journey mapping",
          "TOFU, MOFU and BOFU funnels",
          "Buyer persona creation",
          "Competitor analysis",
          "Channel selection and marketing mix",
          "CPM, CPC, CTR, CPL, CAC, AOV, LTV, ROAS and ROI",
          "Campaign planning",
          "Marketing objectives and KPIs",
          "Creating a practical marketing strategy document",
          "Graphic Design for Digital Marketers — develop the visual skills required to create effective marketing creatives.",
          "Design principles",
          "Layout and grid systems",
          "Visual hierarchy",
          "Contrast and whitespace",
          "Colour theory",
          "Typography",
          "Photoshop fundamentals",
          "Canva Pro workflows",
          "Social media creatives",
          "Ad banners",
          "Carousel designs",
          "Story designs",
          "YouTube thumbnails",
          "Marketing brochures",
          "Creative variations",
          "Introduction to AI-assisted design",
          "Project: Marketing strategy document + creative portfolio",
          "Certification Preparation: Digital marketing and design-related certification preparation according to the current programme structure.",
        ],
      },
      {
        title: "Month 2 — Video Marketing & Website Development",
        points: [
          "Video Editing & Short-Form Content — learn how marketers create video content for platforms such as Instagram, YouTube and other social channels.",
          "Video composition",
          "Shots and cuts",
          "Pacing",
          "J-cuts and L-cuts",
          "Adobe Premiere Pro workflow",
          "CapCut editing",
          "Reels and Shorts",
          "Three-second hooks",
          "Retention-focused editing",
          "Captioning",
          "Scriptwriting",
          "YouTube titles and thumbnails",
          "Content repurposing",
          "Website Development & Landing Pages — build the web assets required for digital marketing campaigns.",
          "Domains and DNS",
          "Hosting fundamentals",
          "SSL",
          "Staging environments",
          "cPanel",
          "WordPress installation",
          "WordPress security basics",
          "Themes and plugins",
          "Navigation and menus",
          "User roles",
          "Elementor Pro",
          "Responsive design",
          "Business website structure",
          "Landing page creation",
          "Lead forms",
          "Email integration",
          "CRM integration",
          "Tracking and marketing pixels",
          "Website backups",
          "Project: WordPress business website + conversion-focused landing page",
        ],
      },
      {
        title: "Month 3 — Complete SEO Training",
        points: [
          "Keyword Research & Search Intent — learn how to identify the searches that matter to a business.",
          "Search engine fundamentals",
          "SERP analysis",
          "Keyword discovery",
          "Competitor keyword research",
          "Search intent classification",
          "Search volume",
          "Keyword difficulty",
          "CPC and commercial value",
          "Long-tail keywords",
          "Question-based keywords",
          "Keyword clustering",
          "Keyword mapping",
          "Cannibalisation",
          "Seasonal search behaviour",
          "Project: 100-keyword SEO master sheet",
          "On-Page SEO & Content Optimisation — learn how to optimise website pages for users and search engines.",
          "SEO titles",
          "Meta descriptions",
          "URLs",
          "Heading structure",
          "Semantic keywords",
          "Search-intent optimisation",
          "Internal linking",
          "Topic clusters",
          "Image optimisation",
          "Content quality",
          "E-E-A-T concepts",
          "Content refresh",
          "Content decay",
          "Featured snippets",
          "People Also Ask",
          "On-page SEO auditing",
          "Project: Complete on-page audit + developer fix list",
          "Technical SEO & Website Health — understand the technical factors that influence crawling, indexing and website performance.",
          "Crawl budget",
          "Robots.txt",
          "XML sitemaps",
          "Indexation",
          "Canonical tags",
          "Pagination",
          "Hreflang concepts",
          "Website architecture",
          "Crawl paths",
          "Core Web Vitals",
          "Mobile-first optimisation",
          "Structured data",
          "Redirects",
          "404 management",
          "JavaScript rendering",
          "Technical SEO auditing",
          "Project: Prioritised technical SEO remediation report",
          "Off-Page SEO, Link Building & Digital PR — learn how websites build authority and acquire relevant backlinks.",
          "Backlink fundamentals",
          "Authority and relevance",
          "Anchor-text distribution",
          "Guest posting",
          "Resource-page links",
          "Broken-link building",
          "Digital PR",
          "Citation building",
          "NAP consistency",
          "Competitor backlink analysis",
          "Outreach list creation",
          "Outreach sequences",
          "Unlinked brand mentions",
          "Toxic backlink identification",
          "Disavow concepts",
          "90-day link-building planning",
          "Project: SEO case study + link-building plan",
        ],
      },
      {
        title: "Month 4 — Local SEO, Content & Social Media",
        points: [
          "Local SEO & Google Business Profile — develop skills for businesses targeting customers in specific cities and service areas.",
          "Local ranking factors",
          "Google Business Profile fundamentals",
          "Business categories",
          "Services",
          "Business photos",
          "Posts",
          "Q&A",
          "Review management",
          "Citation building",
          "Local landing pages",
          "Location-based content",
          "Local schema concepts",
          "Map Pack optimisation",
          "Geo-grid tracking",
          "Local reporting",
          "Project: Local SEO strategy + monthly reporting pack",
          "Content Marketing & Conversion Copywriting — learn how to create content that attracts users and supports conversions.",
          "Content strategy",
          "Pillar and cluster content",
          "Editorial calendars",
          "SEO blog writing",
          "AIDA framework",
          "PAS framework",
          "BAB framework",
          "4Ps",
          "FAB",
          "Headlines and hooks",
          "Landing-page copy",
          "Objection handling",
          "CTA writing",
          "Google ad copy",
          "Meta ad copy",
          "Email copy",
          "Brand storytelling",
          "Case-study writing",
          "Social Media Marketing & Organic Growth — understand how businesses can build visibility and engagement across major social platforms.",
          "Instagram marketing",
          "Facebook marketing",
          "LinkedIn marketing",
          "YouTube marketing",
          "X marketing",
          "Pinterest marketing",
          "Social Media Optimisation",
          "Content pillars",
          "30-day content calendars",
          "Organic growth",
          "LinkedIn B2B marketing",
          "Influencer marketing",
          "UGC campaigns",
          "Community management",
          "DM funnels",
          "Social listening",
          "Reputation management",
          "Crisis communication",
          "Project: 30-day social media content and execution plan",
          "Mid-Term Practical: A practical assessment can be conducted at the end of this stage to evaluate your understanding of SEO, local marketing, content and social media.",
        ],
      },
      {
        title: "Month 5 — Google Ads & Meta Ads",
        points: [
          "Google Ads — Search & Display: learn how paid search campaigns are planned, launched and optimised.",
          "Google Ads account structure",
          "Campaign architecture",
          "Ad auction",
          "Ad Rank",
          "Quality Score",
          "Keyword match types",
          "Search-term analysis",
          "Negative keywords",
          "Responsive Search Ads",
          "Ad assets",
          "Display campaigns",
          "Audience targeting",
          "Remarketing",
          "Conversion actions",
          "Landing-page relevance",
          "Bidding fundamentals",
          "Campaign optimisation routines",
          "Google Ads — Shopping, Performance Max & YouTube: expand your paid advertising knowledge into additional Google advertising formats.",
          "Google Merchant Center",
          "Product feeds",
          "Shopping campaigns",
          "Performance Max",
          "Asset groups",
          "Audience signals",
          "Brand exclusions",
          "Performance reporting",
          "YouTube advertising",
          "Video campaign formats",
          "Demand Gen concepts",
          "Smart bidding",
          "Seasonality",
          "Campaign scaling",
          "Meta Ads — Setup, Pixel & Conversions API: learn how to establish and manage Meta advertising infrastructure.",
          "Meta Business Manager",
          "Business assets",
          "Account roles",
          "Payment setup",
          "Campaign objectives",
          "CBO and ABO",
          "Meta Pixel",
          "Google Tag Manager integration",
          "Event configuration",
          "Conversions API",
          "Event matching",
          "Domain verification",
          "Advantage+ features",
          "Placements",
          "Ad policies",
          "Ads Manager reporting",
          "Meta Ads — Audiences, Testing & Scaling: learn how to create audiences and optimise campaigns using performance data.",
          "Broad targeting",
          "Interest audiences",
          "Custom audiences",
          "Lookalike audiences",
          "Exclusions",
          "Retargeting funnels",
          "Creative testing",
          "Hook-rate analysis",
          "CTR",
          "CPM",
          "CPA",
          "Creative fatigue",
          "Lead-generation campaigns",
          "Instant forms",
          "CRM integration",
          "Advantage+ Shopping",
          "Dynamic product ads",
          "Click-to-WhatsApp campaigns",
          "Campaign scaling",
          "Projects: Google Ads campaign + Meta Ads campaign",
        ],
      },
      {
        title: "Month 6 — E-Commerce, Analytics, CRM & Career Preparation",
        points: [
          "E-Commerce Store Development — learn how digital marketers support online stores.",
          "E-commerce business models",
          "D2C",
          "Marketplace models",
          "Dropshipping concepts",
          "WooCommerce",
          "Product variations",
          "Tax settings",
          "Shipping zones",
          "Shopify fundamentals",
          "Product-page optimisation",
          "Inventory workflows",
          "Returns",
          "Coupons",
          "Bundles",
          "Loyalty programmes",
          "COD and prepaid orders",
          "RTO reduction",
          "Store launch checklist",
          "Pre-launch QA",
          "Conversion Rate Optimisation & Cart Recovery — learn how to identify friction and improve website conversion rates.",
          "CRO fundamentals",
          "LIFT framework",
          "MECLABS concepts",
          "Heatmaps",
          "Scroll maps",
          "Session recordings",
          "Checkout optimisation",
          "Abandoned-cart recovery",
          "Email recovery",
          "WhatsApp recovery",
          "A/B testing",
          "Multivariate testing",
          "Mobile-first optimisation",
          "ICE scoring",
          "PIE prioritisation",
          "Conversion roadmap",
          "Email Marketing, CRM & Lead Nurturing — build automated communication workflows for different customer stages.",
          "Email list building",
          "Permission-based marketing",
          "Audience segmentation",
          "Email deliverability",
          "SPF",
          "DKIM",
          "DMARC",
          "Broadcast campaigns",
          "Drip campaigns",
          "Transactional emails",
          "Lifecycle marketing",
          "Welcome sequences",
          "Lead nurturing",
          "Cart recovery",
          "Win-back campaigns",
          "Subject-line optimisation",
          "CRM pipelines",
          "Lead scoring",
          "WhatsApp marketing compliance",
          "Revenue attribution",
          "GA4, Google Tag Manager & Looker Studio — learn how to measure marketing performance with analytics and reporting tools.",
          "GA4 fundamentals",
          "Property configuration",
          "Google Tag Manager",
          "Tags",
          "Triggers",
          "Variables",
          "DataLayer concepts",
          "Form tracking",
          "Call tracking",
          "WhatsApp-click tracking",
          "Purchase tracking",
          "GA4 Explorations",
          "Funnel analysis",
          "Path analysis",
          "Audience creation",
          "Google Ads integration",
          "Looker Studio",
          "Marketing dashboards",
          "Tag Assistant",
          "DebugView",
          "Freelancing, Agency Building & Client Acquisition — learn how digital marketing skills can be presented as professional services.",
          "Selecting a niche",
          "Service packages",
          "Ideal customer profile",
          "Pricing strategy",
          "Portfolio development",
          "Case studies",
          "Upwork profile basics",
          "Fiverr profile basics",
          "LinkedIn positioning",
          "Cold outreach",
          "Referral strategies",
          "Discovery calls",
          "Proposal writing",
          "Client contracts",
          "Invoicing",
          "GST basics",
          "International payments",
          "Retainer models",
          "Marketing Project Management & Interview Preparation — prepare for agency, in-house and freelance working environments.",
          "Project briefs",
          "Campaign workflows",
          "SOPs",
          "Checklists",
          "Client communication",
          "Escalation procedures",
          "Monthly reports",
          "Resume development",
          "LinkedIn optimisation",
          "Portfolio presentation",
          "Technical interview preparation",
          "Case-study interviews",
          "HR interview preparation",
          "Mock interviews",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the project that closes each month, and the portfolio it all builds toward.
    practical: {
      title: "A Project Every Month",
      body: "Each month closes on its own deliverable — a strategy document and creative portfolio, a website and landing page, SEO audits and a link plan, a social calendar, live ad campaigns, and an e-commerce and analytics build.",
    },
    outcome: {
      label: "Outcome",
      body: "By completing the curriculum, students will have planned, built, advertised, optimised and measured across every major digital channel, with a portfolio of strategy documents, creatives, websites, SEO reports, campaigns and dashboards.",
    },
  },

  tools: {
    title: "Tools You Will Practise",
    intro: "The programme provides exposure to a broad range of marketing and business tools.",
    // The brief lists the twenty-four names but writes no line for each; every
    // line below is that tool's own job in the curriculum above.
    items: [
      { name: "Google Analytics 4", body: "Events, conversions, explorations and audiences." },
      { name: "Google Tag Manager", body: "Tags, triggers, variables and the dataLayer." },
      { name: "Google Ads", body: "Search, Display, Shopping, Performance Max and YouTube." },
      { name: "Google Merchant Center", body: "Product feeds behind Shopping campaigns." },
      { name: "Meta Ads Manager", body: "Objectives, audiences, creatives and reporting." },
      { name: "Meta Business Manager", body: "Business assets, roles and domain verification." },
      { name: "Google Business Profile", body: "Local visibility, reviews and the Map Pack." },
      { name: "Search Console", body: "Indexation, queries and technical SEO health." },
      { name: "WordPress", body: "Build the business site and its landing pages." },
      { name: "Elementor", body: "Page building and responsive layout." },
      { name: "WooCommerce", body: "Products, variations, tax and shipping." },
      { name: "Shopify", body: "The second e-commerce platform to compare." },
      { name: "Photoshop", body: "Creative production for ads and social." },
      { name: "Canva", body: "Fast creative variations and templates." },
      { name: "Premiere Pro", body: "The video editing workflow." },
      { name: "CapCut", body: "Short-form Reels and Shorts editing." },
      { name: "SEMrush", body: "Keyword research and competitor analysis." },
      { name: "Ahrefs", body: "Backlink analysis and link opportunities." },
      { name: "Yoast SEO", body: "On-page optimisation inside WordPress." },
      { name: "BrightLocal", body: "Local rankings, citations and geo-grid tracking." },
      { name: "Looker Studio", body: "Marketing dashboards and client reports." },
      { name: "HubSpot", body: "CRM pipelines and lifecycle marketing." },
      { name: "CRM platforms", body: "Lead scoring, nurturing and attribution." },
      { name: "Email marketing tools", body: "Broadcasts, drips and deliverability." },
    ],
  },

  who: {
    title: "Who Can Join This Course?",
    items: [
      { title: "Students After 12th", body: "Students from any stream can start learning digital marketing from the fundamentals and progressively move toward advanced marketing channels.", icon: "users" },
      { title: "College Students", body: "Students pursuing graduation can develop practical digital marketing abilities alongside their academic education.", icon: "certificate" },
      { title: "Beginners", body: "No previous professional marketing experience is required for the beginner pathway. The programme starts with basic concepts before moving into campaign execution.", icon: "sparkles" },
      { title: "Aspiring Freelancers", body: "Learn marketing services, portfolio building, client communication, proposals, pricing and online profile development.", icon: "briefcase" },
      { title: "Working Professionals", body: "Professionals looking to add digital marketing to their existing skill set can use the programme to develop practical knowledge across multiple channels.", icon: "refresh" },
      { title: "Business Owners", body: "Entrepreneurs and family-business owners can learn how SEO, paid advertising, social media, websites, analytics and e-commerce contribute to online growth.", icon: "building" },
    ],
  },

  worth: {
    title: "Develop a Complete Digital Marketing Skill Set",
    items: [
      { title: "Multiple Marketing Channels", body: "Study SEO, social media, paid advertising, content, email, websites, e-commerce and analytics within one structured learning path.", icon: "layers" },
      { title: "Practical Portfolio Development", body: "Build strategy documents, creatives, websites, SEO reports, social media plans, advertising campaigns, e-commerce assets and analytics dashboards.", icon: "briefcase" },
      { title: "SEO From Basic to Technical", body: "Go beyond keyword research and learn on-page, technical, local and off-page SEO.", icon: "search" },
      { title: "Paid Advertising Experience", body: "Understand both Google and Meta advertising, from account setup and tracking to audience development, creative testing and optimisation.", icon: "megaphone" },
      { title: "Business-Focused Marketing", body: "Learn to connect marketing activity with leads, sales, conversions, customer journeys and business objectives.", icon: "chart" },
      { title: "Career & Freelancing Preparation", body: "Develop a portfolio, improve your CV and LinkedIn profile, practise interviews and understand the basics of working with clients.", icon: "rocket" },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Build Skills That Businesses Use Every Day",
    paragraphs: [
      "Businesses increasingly depend on digital channels to attract customers, generate leads, sell products and maintain relationships with existing audiences.",
      "The goal of this programme is not simply to teach individual platforms. It is to help you understand how different digital channels work together as a complete marketing system.",
    ],
    listTitle: "Digital marketing skills can be applied across industries, including",
    // The brief's own ten industries, each with the line naming what marketing
    // it typically needs.
    items: [
      { title: "Education", body: "Admissions funnels, local search and lead nurturing." },
      { title: "E-commerce", body: "Shopping campaigns, CRO and cart recovery." },
      { title: "Healthcare", body: "Local SEO, reviews and appointment enquiries." },
      { title: "Real estate", body: "Landing pages, Meta lead forms and CRM follow-up." },
      { title: "Hospitality", body: "Map Pack visibility, social content and reputation." },
      { title: "Retail", body: "Local campaigns, offers and WhatsApp marketing." },
      { title: "IT services", body: "LinkedIn B2B, content marketing and paid search." },
      { title: "Professional services", body: "Authority content, citations and enquiry tracking." },
      { title: "Local businesses", body: "Google Business Profile, reviews and local pages." },
      { title: "Startups", body: "Fast experimentation across paid, organic and email." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with the techcadd team settles eligibility, batch timings, fees and where this leads — before you commit six months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Complete Your Digital Marketing Training",
    intro:
      "Learners who successfully complete the required programme components may receive course completion documentation according to the current certification terms.",
    items: [
      { icon: "certificate", title: "Course Completion Certificate", body: "Documentation of successful completion of the Digital Marketing Certificate Program." },
      { icon: "layers", title: "Project Portfolio", body: "A collection of practical marketing assignments and projects that can be used when presenting your skills." },
      { icon: "cube", title: "Practical Experience", body: "Projects involving SEO, websites, social media, advertising, e-commerce and analytics can help demonstrate hands-on understanding." },
      { icon: "briefcase", title: "Career Preparation", body: "Resume development, portfolio guidance, interview practice and career-oriented support may be included according to the current programme structure." },
    ],
  },

  takesYou: {
    title: "Where Can Digital Marketing Take You?",
    intro:
      "The skills covered in the programme can prepare learners for a variety of entry-level and growth-oriented digital marketing roles.",
    listTitle: "Roles this programme prepares you for",
    steps: [
      { title: "Digital Marketing Executive", body: "Work across multiple online marketing channels and assist with campaign execution and reporting." },
      { title: "SEO Executive", body: "Handle keyword research, on-page optimisation, technical SEO, local SEO and link-building activities." },
      { title: "Social Media Executive", body: "Plan content, manage social channels, monitor engagement and support organic growth campaigns." },
      { title: "PPC / Google Ads Executive", body: "Create, monitor and optimise paid advertising campaigns on Google." },
      { title: "Performance Marketing Executive", body: "Work with paid campaigns, conversion tracking, audiences, creative testing and performance data." },
      { title: "Content Marketing Executive", body: "Develop blogs, social content, landing-page copy, email content and campaign assets." },
      { title: "E-Commerce Marketing Executive", body: "Support online stores through product optimisation, advertising, CRO, analytics and customer-retention campaigns." },
      { title: "Freelance Digital Marketer", body: "Offer services such as SEO, social media, Google Ads, Meta Ads, website marketing and content creation to clients." },
    ],
  },

  projects: {
    title: "Hands-On Projects You Will Build",
    // Each project keeps the brief's own deliverable line, appended to its
    // description rather than dropped.
    items: [
      { title: "Brand & Funnel Strategy + Creative Portfolio", body: "Create a complete marketing strategy including customer personas, funnel stages, channel selection and campaign planning. Build a collection of marketing assets such as ad banners, social posts, carousels, thumbnails, brochures and brand elements. Deliverable: Strategy document + creative portfolio" },
      { title: "Video Content + Business Website", body: "Create short-form marketing videos with hooks, captions and platform-specific formatting. Then develop a WordPress business website with a dedicated conversion-oriented landing page. Deliverable: Video portfolio + website" },
      { title: "SEO Campaign", body: "Complete a practical SEO workflow including keyword research, website audit, on-page optimisation, technical recommendations, link-building strategy and performance tracking. Deliverable: SEO case study" },
      { title: "Social Media Marketing Operation", body: "Develop a 30-day social media strategy with content pillars, publishing plans, creative ideas and performance tracking. Deliverable: Content calendar + analytics report" },
      { title: "Google Ads & Meta Ads", body: "Create paid marketing campaign structures covering search advertising, audience targeting, conversion tracking, retargeting and creative testing. Deliverable: Paid advertising campaign projects" },
      { title: "E-Commerce + Marketing Analytics", body: "Build an e-commerce marketing workflow involving a store, product pages, conversion optimisation, email automation and analytics. Implement GA4, GTM and reporting dashboards to monitor marketing activity. Deliverable: E-commerce project + analytics dashboard" },
    ],
  },

  approach: {
    title: "Learn It. Build It. Present It.",
    paragraphs: ["Every project follows a simple practical cycle."],
    items: [
      { title: "Understand", body: "Study the business objective, identify the audience and determine which marketing channels are appropriate.", icon: "search" },
      { title: "Build", body: "Create the strategy, campaign, website, content or marketing asset with practical guidance.", icon: "cube" },
      { title: "Present", body: "Explain your decisions, show the results or analysis and turn the completed project into a portfolio case study.", icon: "briefcase" },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "A Practical Path From Beginner to Job-Ready Skills",
    // The brief writes no lead-in for this block; this states what its six
    // points have in common.
    intro: "A logical sequence across every channel, worked through by hand rather than explained from slides.",
    items: [
      { title: "Structured Curriculum", body: "The programme moves from marketing fundamentals to advanced channels in a logical sequence.", icon: "layers" },
      { title: "Hands-On Learning", body: "Learners work on practical assignments instead of relying only on theoretical explanations.", icon: "terminal" },
      { title: "Multiple Digital Channels", body: "SEO, paid advertising, social media, content, websites, e-commerce, email and analytics are covered within one programme.", icon: "cube" },
      { title: "Portfolio-Oriented Projects", body: "Projects are designed to give learners material that can be presented during interviews or client discussions.", icon: "briefcase" },
      { title: "Career Preparation", body: "Resume, LinkedIn, portfolio and interview preparation help learners present their digital marketing capabilities professionally.", icon: "users" },
      { title: "Freelancing Skills", body: "Students interested in independent work can explore client acquisition, proposals, pricing, service packages and project management.", icon: "rocket" },
    ],
  },

  popular: {
    title: "Explore More Learning Options",
    intro: "Other career-focused programmes at techcadd.",
    items: [
      { title: "After 12th 3/4-Month Digital Marketing Program", body: "A shorter pathway for learners looking to develop essential digital marketing fundamentals and practical skills.", href: "/courses/after12th/digital-marketing" },
      { title: "After 12th 9-Month Digital Marketing Diploma Program", body: "A longer learning route for students seeking additional depth across marketing, advertising, analytics and business applications.", href: "/after-12th/digital-marketing-diploma-program" },
      { title: "After 12th 6-Month Data Analytics Program", body: "Learn data handling, analysis, visualisation and business reporting skills.", href: "/after-12th/data-analytics-certificate-program" },
      { title: "After 12th 6-Month MERN Stack Certificate Program", body: "Build web applications using MongoDB, Express.js, React and Node.js.", href: "/after-12th/mern-stack-certificate-program" },
      { title: "Digital Marketing Course", body: "A broader digital marketing learning pathway covering the major online marketing channels.", href: "/courses/course/digital-marketing" },
    ],
  },

  faqs: [
    { q: "What is the duration of the Digital Marketing Certificate Program in Mohali?", a: "The programme is designed as a six-month learning track covering digital marketing fundamentals, SEO, social media, advertising, websites, e-commerce, analytics, email marketing and career preparation." },
    { q: "Can I join after 12th?", a: "Yes. Students who have completed 12th can begin the programme without requiring previous professional digital marketing experience." },
    { q: "Do I need a marketing background?", a: "No. The curriculum starts with fundamentals and progressively introduces more advanced marketing concepts and platforms." },
    { q: "Which digital marketing topics are covered?", a: "The programme covers digital marketing fundamentals, marketing funnels, graphic design, video marketing, WordPress, SEO, local SEO, content marketing, social media marketing, Google Ads, Meta Ads, e-commerce, CRO, email marketing, CRM, GA4, Google Tag Manager, Looker Studio, freelancing and agency management." },
    { q: "Which tools will I learn?", a: "You can work with tools such as Google Ads, Meta Ads Manager, Google Analytics 4, Google Tag Manager, Search Console, WordPress, Elementor, WooCommerce, Shopify, Photoshop, Canva, Premiere Pro, CapCut, SEMrush, Ahrefs, Yoast, BrightLocal and Looker Studio." },
    { q: "Will I build projects during the course?", a: "Yes. The curriculum is project-oriented and includes marketing strategy, creative design, video, website, SEO, social media, advertising, e-commerce and analytics projects." },
    { q: "Can this course help me become a freelancer?", a: "The programme includes topics such as service positioning, portfolio creation, proposals, pricing, client acquisition, contracts and project management. Actual freelance success depends on your skills, consistency, niche and ability to acquire and retain clients." },
    { q: "What jobs can I apply for after completing the course?", a: "Depending on your skills and experience, possible roles include Digital Marketing Executive, SEO Executive, Social Media Executive, PPC Executive, Performance Marketing Executive, Content Marketing Executive and E-commerce Marketing Executive." },
    { q: "Is placement guaranteed?", a: "No. Placement support should not be interpreted as a guaranteed job. Employment depends on your skills, portfolio, interview performance, experience and employer requirements." },
    { q: "Do I receive a certificate?", a: "Course completion certification may be provided according to the current programme terms. Contact the Mohali team for the latest certification details." },
    { q: "What is the difference between the shorter and six-month programme?", a: "The shorter programme generally focuses on essential digital marketing skills, while the six-month track provides broader coverage of SEO, advertising, social media, websites, e-commerce, analytics and advanced practical work." },
    { q: "Can I attend the course while studying?", a: "Batch availability depends on the current schedule. Contact the Mohali team for available weekday, evening or weekend options." },
    { q: "Do I need my own laptop?", a: "Laptop requirements can depend on the current batch and lab arrangements. Confirm the latest requirements with the Mohali centre before enrolment." },
    { q: "What is the course fee?", a: "Fees can vary depending on the current programme, batch and available offers. Contact the Mohali team for the latest fee and payment information." },
  ],

  enquiry: {
    title: "Ask About the Digital Marketing Certificate Program",
    // The contact details the brief supplies are the centre's own; the page
    // already renders them from `@/lib/site`, so only the wording is carried
    // here rather than a second copy of the number.
    paragraphs: [
      "Want to know whether digital marketing is the right career path for you? Speak with a course counsellor about current batches, course fees, payment/EMI options, eligibility, course syllabus, projects, certification, career support, freelancing opportunities and the admission process.",
      "Location: Mohali, Punjab. Counselling hours: Monday – Saturday, 9:00 AM – 7:00 PM.",
    ],
  },

  fit: {
    title: "Not Sure If Digital Marketing Is Right for You?",
    paragraphs: [
      "You do not need to decide your entire career before starting the conversation.",
      "Speak with a course advisor, understand the six-month curriculum, explore the practical projects and learn how the programme can fit your education or career goals.",
    ],
    ctaTitle: "Get Started Today",
    points: [
      "6 months, 12th pass onward, any stream",
      "No marketing background required",
      "SEO, Google Ads, Meta Ads, social, content and email",
      "Websites, e-commerce, CRO and analytics",
      "6 portfolio projects across every channel",
      "Freelancing, resume and interview preparation",
    ],
  },
};

const dataAnalyticsCertificate: After12Page = {
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
    title: "Best After 12th 6-Month Data Analytics & Business Analysis Certificate Program in Mohali",
    paragraphs: [
      "Start with spreadsheets and basic programming, then progress toward SQL, Python, Power BI, Tableau, business analysis, cloud data platforms, machine learning and AI-assisted analytics. This six-month programme is designed to help students after 12th build practical projects and a portfolio for entry-level analytics and business-focused technology roles.",
    ],
  },

  program: {
    title: "After 12th 6-Month Data Analytics & Business Analysis Certificate Program in Mohali",
    paragraphs: [
      "Data is now part of almost every business decision — from sales forecasting and inventory planning to customer behaviour, finance and operations. Our six-month Data Analytics & Business Analysis programme in Mohali is designed for students who want to learn how to transform raw information into useful business insights.",
      "The programme combines Excel, SQL, Python, Power BI, Tableau and statistics with a dedicated business analysis track covering requirements, BRD, FRD, SRS, Agile, Scrum, Jira and BPMN.",
      "You will also explore modern data technologies such as Microsoft Fabric, Snowflake, DuckDB, dbt and Apache Airflow, followed by machine learning, generative AI and AI-assisted reporting.",
      "Instead of learning disconnected software tools, the programme follows a progression: Understand the data → Analyse it → Visualise it → Understand the business requirement → Build the solution → Present the insight.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "6 Months" },
      { label: "Eligibility", value: "12th Pass & Above" },
      { label: "Mode", value: "Classroom / Practical Training" },
      { label: "Learning Style", value: "Theory + Hands-on Labs" },
      { label: "Projects", value: "Monthly Mini Projects + Final Capstone" },
      { label: "Focus", value: "Data Analytics + Business Analysis" },
      { label: "Career Support", value: "Resume, Portfolio & Interview Preparation" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "The six-month programme starts from the fundamentals and gradually moves toward professional analytics workflows.",
      "During the first two months, you build a strong foundation in Excel, SQL, Python, statistics and data analysis. You learn how businesses store information, how analysts clean datasets and how reports are converted into useful decisions.",
      "Month 3 focuses on Python for analytics, including NumPy, Pandas, exploratory data analysis, visualisation, APIs, web scraping and Streamlit.",
      "Month 4 moves into Business Intelligence, where you work with Power BI, Power Query, data modelling, DAX and Tableau.",
      "Month 5 introduces the business analyst side of technology. You learn requirement gathering, stakeholder analysis, BRD, FRD, SRS, user stories, acceptance criteria, Agile, Scrum, Jira, Confluence and BPMN. Modern data platforms including Microsoft Fabric, Snowflake and DuckDB are also introduced.",
      "The final month brings together AI, machine learning, automation and portfolio development, followed by interview preparation and an end-to-end analytics capstone.",
      "The result is a programme that covers both sides of modern analytics: technical data skills and business problem-solving skills.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    intro:
      "Every stage of the programme is connected to practical work so that students gradually build a portfolio instead of completing the course with only theoretical notes.",
    items: [
      {
        title: "Business Dashboards",
        body: "Build practical Sales, HR, Inventory and Finance dashboards using Excel and Power BI. Learn data modelling, KPIs, DAX and dashboard storytelling.",
      },
      {
        title: "Professional SQL",
        body: "Move beyond basic SELECT queries into joins, CTEs, subqueries, CASE statements, window functions, views and query optimisation.",
      },
      {
        title: "Python Analytics",
        body: "Use Python, NumPy and Pandas to clean, transform and analyse datasets. Create visualisations using Matplotlib, Seaborn and Plotly.",
      },
      {
        title: "Business Analysis Documentation",
        body: "Learn how analysts convert business conversations into structured requirements through BRD, FRD, SRS, user stories, acceptance criteria and process maps.",
      },
      {
        title: "Modern Data Platforms",
        body: "Understand the concepts behind data warehouses, data lakes and lakehouses while exploring Microsoft Fabric, Snowflake, DuckDB, dbt and Airflow.",
      },
      {
        title: "AI & Machine Learning",
        body: "Learn practical machine learning concepts and discover how generative AI tools can support SQL, coding, reporting, research and analytics workflows.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The syllabus is divided into six progressive modules. Each month combines concepts, labs, assignments and project work.",
    // Each month keeps the brief's own grouping headings, explanatory lines,
    // lab entries and mini project in place, so the order and wording are as
    // supplied.
    modules: [
      {
        title: "Month 1 — Data Analytics & Programming Foundations",
        points: [
          "Introduction to Data Analytics",
          "Understand what data analytics means and how organisations use data for decision-making. Learn the analytics lifecycle and the difference between descriptive, diagnostic, predictive and prescriptive analytics.",
          "Explore applications across retail, finance, healthcare, marketing and operations.",
          "Practical Work",
          "Set up Python and VS Code",
          "Install Anaconda and Git",
          "Configure MySQL and DBeaver",
          "Install Power BI and Tableau",
          "Create GitHub and LinkedIn profiles",
          "Introduction to ChatGPT, Microsoft Copilot, GitHub Copilot and Gemini",
          "Advanced Excel — build confidence with Excel as an analyst's first reporting tool.",
          "Data cleaning",
          "Tables and formatting",
          "Pivot tables",
          "Pivot charts",
          "XLOOKUP",
          "INDEX-MATCH",
          "IF functions",
          "Conditional formatting",
          "Power Query fundamentals",
          "Dashboard design",
          "Lab: Sales, HR and Inventory dashboards.",
          "SQL Fundamentals — learn how relational databases store business information.",
          "Databases and tables",
          "Primary and foreign keys",
          "SELECT",
          "WHERE",
          "GROUP BY",
          "HAVING",
          "ORDER BY",
          "Aggregate functions",
          "Introduction to joins",
          "Lab: Retail and HR database analysis.",
          "Python Fundamentals — start programming from the basics.",
          "Variables",
          "Data types",
          "Operators",
          "Conditions",
          "Loops",
          "Functions",
          "File handling",
          "Exception handling",
          "OOP fundamentals",
          "Lab: Calculator, employee record processor and CSV reader.",
          "Mini Project — Retail Sales Performance Analysis: combine Excel, SQL and Python to analyse sales information and prepare a business-oriented summary.",
        ],
      },
      {
        title: "Month 2 — Advanced SQL, Excel & Business Statistics",
        points: [
          "SQL & Database Reporting — strengthen your database knowledge through practical reporting exercises.",
          "Advanced SQL",
          "INNER JOIN",
          "LEFT JOIN",
          "RIGHT JOIN",
          "FULL JOIN",
          "SELF JOIN",
          "UNION",
          "CTEs",
          "Subqueries",
          "CASE statements",
          "Window functions",
          "Views",
          "Query optimisation",
          "Lab: Build reports using customer, order and product datasets.",
          "Advanced Excel",
          "XLOOKUP",
          "INDEX-MATCH",
          "Dynamic arrays",
          "Power Query",
          "Pivot charts",
          "Dashboard development",
          "Lab: Finance, Sales and HR reporting dashboards.",
          "Business Statistics — learn how statistics supports business decisions.",
          "Mean",
          "Median",
          "Mode",
          "Variance",
          "Standard deviation",
          "Correlation",
          "Probability",
          "Normal distribution",
          "Outlier detection",
          "Business interpretation",
          "Assignments: SQL reporting · Excel dashboard · Statistical analysis · Query optimisation · Power Query data cleaning",
          "Mini Project — Enterprise Sales Intelligence Dashboard: analyse sales information using SQL, Excel and Power Query, then convert the results into executive-level KPIs.",
        ],
      },
      {
        title: "Month 3 — Python for Data Analytics",
        points: [
          "Python Programming — strengthen Python fundamentals through practical applications.",
          "Expense tracker",
          "Banking system",
          "Employee record manager",
          "Inventory management application",
          "NumPy & Pandas",
          "NumPy arrays",
          "Array operations",
          "Indexing and slicing",
          "Pandas Series",
          "DataFrames",
          "CSV and Excel ingestion",
          "Filtering",
          "Sorting",
          "Missing-value treatment",
          "GroupBy",
          "Merge and Join",
          "Feature engineering",
          "Lab: HR analytics dataset.",
          "Exploratory Data Analysis — learn how analysts investigate datasets before modelling.",
          "Data cleaning",
          "Outlier detection",
          "Correlation analysis",
          "Matplotlib",
          "Seaborn",
          "Plotly",
          "Interactive visualisation",
          "Datasets: Retail, entertainment and healthcare examples.",
          "APIs, Web Scraping & Streamlit",
          "REST APIs",
          "JSON",
          "Requests",
          "BeautifulSoup",
          "Introduction to Selenium",
          "Automation concepts",
          "Streamlit",
          "Activities: Weather API · News API · Product data extraction · Interactive Streamlit dashboard",
          "Mini Project — Customer Insights Analytics System: use Python, Pandas and visualisation techniques to transform customer data into an interactive analytical application.",
        ],
      },
      {
        title: "Month 4 — Business Intelligence & Data Visualisation",
        points: [
          "Power BI",
          "Business Intelligence fundamentals",
          "Power BI Desktop",
          "Power BI Service overview",
          "Excel connections",
          "SQL connections",
          "Web data connections",
          "Import vs DirectQuery",
          "Lab: Build a sales performance dashboard.",
          "Power Query & Data Modelling",
          "Data cleaning",
          "Merge queries",
          "Append queries",
          "Custom columns",
          "Relationships",
          "Star schema",
          "Snowflake schema",
          "Fact tables",
          "Dimension tables",
          "DAX & KPI Development",
          "Measures",
          "Calculated columns",
          "Time intelligence",
          "Running totals",
          "Ranking",
          "Dynamic titles",
          "KPI cards",
          "Lab: Finance, HR and Sales KPI dashboards.",
          "Tableau",
          "Tableau interface",
          "Charts",
          "Maps",
          "Parameters",
          "Calculated fields",
          "Dashboard creation",
          "Stories",
          "Publishing",
          "Dashboard design principles",
          "Mini Project — Executive Business Intelligence Dashboard: create a business dashboard using SQL, Power Query, DAX and Tableau, followed by recommendations based on the analysis.",
        ],
      },
      {
        title: "Month 5 — Business Analysis & Modern Data Engineering",
        points: [
          "Business Analysis Fundamentals — understand the role of a Business Analyst and how requirements are collected.",
          "Requirement gathering",
          "Stakeholder analysis",
          "SWOT analysis",
          "Gap analysis",
          "Functional requirements",
          "Non-functional requirements",
          "Lab: Gather requirements for a retail management system.",
          "Documentation & Agile",
          "BRD",
          "FRD",
          "SRS",
          "User stories",
          "Acceptance criteria",
          "Agile",
          "Scrum",
          "Sprint planning",
          "Jira",
          "Confluence",
          "Lab: Prepare documentation for an e-commerce application.",
          "BPMN & Modern Data Platforms",
          "BPMN",
          "Process mapping",
          "Lucidchart",
          "Figma basics",
          "Data warehouse",
          "Data lake",
          "Lakehouse",
          "Microsoft Fabric",
          "Snowflake",
          "DuckDB",
          "ETL, ELT & Automation",
          "ETL vs ELT",
          "dbt fundamentals",
          "Apache Airflow introduction",
          "REST APIs",
          "Postman",
          "JSON",
          "Data pipeline concepts",
          "Mini Project — Business Process & Data Platform Design: prepare a BRD, BPMN diagrams, conceptual ETL pipeline, data platform architecture and stakeholder presentation.",
        ],
      },
      {
        title: "Month 6 — AI-Powered Analytics & Career Readiness",
        points: [
          "AI for Data Analysts — learn the fundamentals of AI and responsible AI usage.",
          "Generative AI",
          "Prompt engineering",
          "ChatGPT",
          "Microsoft Copilot",
          "GitHub Copilot",
          "Google Gemini",
          "Claude",
          "Lab: Use AI tools to assist with SQL, Python explanations, reporting and analysis.",
          "Machine Learning for Analysts",
          "Supervised learning",
          "Unsupervised learning",
          "Linear regression",
          "Logistic regression",
          "Decision trees",
          "Random forest",
          "K-means clustering",
          "Model evaluation",
          "Lab: Sales prediction and customer segmentation.",
          "AI Automation & Portfolio Development",
          "OpenAI API concepts",
          "LangChain fundamentals",
          "AI agents overview",
          "RAG concepts",
          "Streamlit deployment",
          "GitHub portfolio",
          "LinkedIn optimisation",
          "ATS-friendly resume preparation",
          "Placement & Interview Preparation",
          "SQL interview questions",
          "Python interview questions",
          "Power BI interview questions",
          "Business Analyst scenarios",
          "HR interviews",
          "Mock interviews",
          "Communication skills",
          "Final Capstone — End-to-End Business Analytics Solution: Requirement Gathering → SQL → Python → Data Visualisation → Power BI → Business Analysis → AI-Assisted Reporting → Executive Presentation.",
        ],
      },
    ],
    // The brief's own "Student Experience" block, kept where it belongs — the
    // work every month leaves behind.
    practical: {
      title: "Learn Through Projects, Not Just Lectures",
      body: "A strong analytics portfolio should demonstrate what you can actually do. Throughout the programme, students can work on business dashboards, SQL reporting, Python analysis, data visualisation, business requirements, BPMN process mapping, data architecture concepts, AI-assisted analytics and end-to-end capstone development.",
    },
    outcome: {
      label: "Outcome",
      body: "The capstone runs the whole chain in one project — requirement gathering, SQL, Python, data visualisation, Power BI, business analysis, AI-assisted reporting and an executive presentation.",
    },
  },

  tools: {
    title: "Tools You Will Work With",
    intro:
      "The programme introduces a broad analytics toolchain covering spreadsheets, databases, programming, BI, business analysis, cloud data and AI.",
    // The brief groups its tools under Analytics & Programming, Databases &
    // SQL, Business Intelligence, Business Analysis, Modern Data Platforms and
    // AI & Development; each line below names that tool's own job, with its
    // group kept in the wording.
    items: [
      { name: "Microsoft Excel", body: "Analytics & programming — cleaning, pivots and the first dashboards." },
      { name: "Power Query", body: "Analytics & programming — repeatable data cleaning and shaping." },
      { name: "Python", body: "Analytics & programming — the language behind months three and six." },
      { name: "NumPy", body: "Analytics & programming — arrays, indexing and numeric work." },
      { name: "Pandas", body: "Analytics & programming — DataFrames, GroupBy, merges and feature engineering." },
      { name: "Matplotlib", body: "Analytics & programming — the base plotting library." },
      { name: "Seaborn", body: "Analytics & programming — statistical charts for exploratory analysis." },
      { name: "Plotly", body: "Analytics & programming — interactive visualisation." },
      { name: "Jupyter", body: "Analytics & programming — notebooks for analysis and labs." },
      { name: "VS Code", body: "Analytics & programming — the editor set up in month one." },
      { name: "MySQL", body: "Databases & SQL — the relational database behind the reporting labs." },
      { name: "SQL", body: "Databases & SQL — joins, CTEs, window functions and views." },
      { name: "DBeaver", body: "Databases & SQL — the client you query and browse from." },
      { name: "DuckDB", body: "Databases & SQL — analytical queries straight over local files." },
      { name: "Power BI", body: "Business intelligence — data models, DAX and KPI dashboards." },
      { name: "Power BI Service", body: "Business intelligence — publishing and sharing reports." },
      { name: "Tableau", body: "Business intelligence — charts, maps, dashboards and stories." },
      { name: "Jira", body: "Business analysis — sprints, issues and project workflow." },
      { name: "Confluence", body: "Business analysis — where the requirements are documented." },
      { name: "Lucidchart", body: "Business analysis — process and flow diagrams." },
      { name: "Figma", body: "Business analysis — basic screens and wireframes." },
      { name: "BPMN", body: "Business analysis — the notation behind the process maps." },
      { name: "Microsoft Fabric", body: "Modern data platforms — the lakehouse-era analytics stack." },
      { name: "Snowflake", body: "Modern data platforms — the cloud data warehouse." },
      { name: "dbt", body: "Modern data platforms — transformations inside the ELT pipeline." },
      { name: "Apache Airflow", body: "Modern data platforms — scheduling and orchestration." },
      { name: "REST APIs", body: "Modern data platforms — where external data comes from." },
      { name: "Postman", body: "Modern data platforms — testing and inspecting those APIs." },
      { name: "ChatGPT", body: "AI & development — analysis, explanation and drafting support." },
      { name: "Microsoft Copilot", body: "AI & development — assistance inside the Microsoft stack." },
      { name: "GitHub Copilot", body: "AI & development — code completion for SQL and Python." },
      { name: "Google Gemini", body: "AI & development — a second general assistant." },
      { name: "Claude", body: "AI & development — long-document reporting and research work." },
      { name: "OpenAI API concepts", body: "AI & development — calling models from your own code." },
      { name: "LangChain", body: "AI & development — chaining models, tools and retrieval." },
      { name: "Streamlit", body: "AI & development — shipping an analysis as an interactive app." },
    ],
  },

  who: {
    title: "Who Can Join This Course?",
    items: [
      {
        title: "Students After 12th",
        body: "The programme is suitable for students who have completed 12th and want to enter technology, analytics or business-oriented roles without beginning with advanced programming.",
        icon: "users",
      },
      {
        title: "Commerce & Management Students",
        body: "Students from B.Com, BBA and related backgrounds can combine their business understanding with Excel, SQL, Power BI and business analysis skills.",
        icon: "briefcase",
      },
      {
        title: "BCA, B.Sc & Technical Students",
        body: "Students pursuing technical degrees can use the programme to strengthen their practical analytics, BI and business-analysis capabilities.",
        icon: "code",
      },
      {
        title: "Students Preparing for Analyst Roles",
        body: "If your target is an entry-level Data Analyst, MIS, Reporting or Business Analyst role, the curriculum provides practice across the tools commonly used in these workflows.",
        icon: "target",
      },
      {
        title: "Career Switchers",
        body: "Working professionals can use the structured learning path to move from routine reporting or non-technical work toward analytics-focused responsibilities.",
        icon: "refresh",
      },
      {
        title: "Self-Learners",
        body: "If you have learned individual tools through online tutorials but struggle to connect them into complete projects, the project-based structure can help create a more organised portfolio.",
        icon: "search",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Considering",
    items: [
      {
        title: "Practical Learning",
        body: "The programme moves from concepts to labs and projects so that you can apply each major skill instead of only reading about it.",
        icon: "target",
      },
      {
        title: "Strong Excel & SQL Foundation",
        body: "Excel, Power Query and SQL are developed beyond beginner-level reporting and include advanced querying and data preparation.",
        icon: "chart",
      },
      {
        title: "Python for Real Analysis",
        body: "Python is introduced progressively and then applied to cleaning, EDA, APIs, visualisation and interactive applications.",
        icon: "terminal",
      },
      {
        title: "Power BI & Tableau",
        body: "Learn both major visualisation platforms while understanding data modelling, KPIs, DAX and dashboard storytelling.",
        icon: "monitor",
      },
      {
        title: "Business Analysis Included",
        body: "Requirement gathering, BRD, FRD, SRS, Agile, Scrum, Jira and BPMN make the programme broader than a purely technical analytics course.",
        icon: "briefcase",
      },
      {
        title: "Modern Data Concepts",
        body: "Explore cloud data platforms, warehouse/lakehouse architecture, ELT, dbt and orchestration concepts.",
        icon: "cloud",
      },
      {
        title: "AI & Machine Learning",
        body: "Understand how machine learning and generative AI can support modern analytics workflows while maintaining the importance of human validation and business context.",
        icon: "sparkles",
      },
      {
        title: "Portfolio & Career Preparation",
        body: "Build projects, organise your GitHub portfolio, improve your resume and practise technical and HR interviews.",
        icon: "rocket",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Build Analytics Skills for a Data-Driven Workplace",
    paragraphs: [
      "Businesses increasingly depend on dashboards, reports and data-backed decisions. Learning only one tool is often not enough; analysts need to understand where the data comes from, how it should be cleaned, how it should be presented and what business decision it supports.",
      "This programme brings those stages together in one structured six-month learning path.",
    ],
    // The brief lists these nine as bare lines under the paragraphs above; each
    // body names where that line actually sits in the curriculum.
    listTitle: "What the six months include",
    items: [
      { title: "Six months of structured analytics training", body: "Six modules, one per month, fundamentals through to career readiness." },
      { title: "Monthly practical projects", body: "A mini project closes every month, from month one onward." },
      { title: "Excel, SQL and Python foundations", body: "Months 1 to 3 — dashboards, advanced querying, NumPy and Pandas." },
      { title: "Power BI and Tableau", body: "Month 4 — data modelling, DAX, KPI cards, dashboards and stories." },
      { title: "Business analysis documentation", body: "Month 5 — BRD, FRD, SRS, user stories and acceptance criteria." },
      { title: "Modern data platform concepts", body: "Month 5 — Fabric, Snowflake, DuckDB, dbt and Airflow." },
      { title: "AI and machine learning", body: "Month 6 — regression, classification, clustering and generative AI." },
      { title: "Final portfolio project", body: "Month 6 — the end-to-end business analytics capstone." },
      { title: "Resume and interview preparation", body: "Month 6 — ATS-friendly resume, mock interviews and portfolio review." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with the techcadd team settles eligibility, batch timings, fees and where this leads — before you commit six months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Complete the Data Analytics Certificate Program",
    intro:
      "Students who complete the programme can receive course-completion documentation according to the current techcadd programme terms. The focus is not only on completing classes but also on demonstrating your learning through assignments, practical work and projects.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "Documentation for successful completion of the training programme, subject to current institute requirements.",
      },
      {
        icon: "layers",
        title: "Project Documentation",
        body: "Project-based work that can be organised as part of your professional portfolio.",
      },
      {
        icon: "chart",
        title: "Analytics Portfolio",
        body: "A collection of dashboards, SQL work, Python analysis, business documentation and the final capstone.",
      },
      {
        icon: "briefcase",
        title: "Career Support",
        body: "Resume preparation, portfolio guidance and interview practice as offered under the current programme.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Can Take You",
    intro:
      "The programme can prepare you for several entry-level and junior career paths, depending on your skills, portfolio, interview performance and employer requirements.",
    listTitle: "Potential Roles",
    // The brief names the thirteen roles without describing them; each line
    // below names the work from the curriculum that role draws on.
    steps: [
      { title: "Data Analyst", body: "Clean, query and analyse business datasets, then report what they show." },
      { title: "Junior Data Analyst", body: "Support a reporting team with SQL, Excel and dashboard work." },
      { title: "MIS Executive", body: "Maintain the recurring management reports a business runs on." },
      { title: "Reporting Analyst", body: "Build and maintain scheduled reports across sales, finance and operations." },
      { title: "Business Analyst", body: "Gather requirements and write the BRD, FRD and SRS behind a solution." },
      { title: "Junior Business Analyst", body: "Support requirement gathering, user stories and process mapping." },
      { title: "BI Executive", body: "Keep dashboards, data models and KPI definitions current." },
      { title: "BI Analyst", body: "Model data and build the Power BI and Tableau reporting a team uses." },
      { title: "Data Reporting Executive", body: "Prepare the day-to-day reporting packs stakeholders read." },
      { title: "Analytics Executive", body: "Run analysis requests end to end, from dataset to recommendation." },
      { title: "Operations Analyst", body: "Apply the same analysis to inventory, process and operational data." },
      { title: "Junior BI Developer", body: "Build data models, measures and report layers in Power BI." },
      { title: "Freelance Data Analyst", body: "Deliver dashboards, Excel reporting and data cleaning to your own clients." },
    ],
  },

  projects: {
    title: "Hands-On Projects You Will Build",
    // Each project keeps the brief's own month and tools line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Retail Sales Performance Analysis",
        body: "Clean and analyse a retail dataset using Excel, SQL and Python, then prepare a concise business report. Month 1 · Excel · SQL · Python",
      },
      {
        title: "Enterprise Sales Intelligence Dashboard",
        body: "Use advanced SQL, Power Query and statistical analysis to create an executive sales reporting system. Month 2 · SQL · Excel · Power Query",
      },
      {
        title: "Customer Insights Analytics System",
        body: "Work with APIs and external data, clean the information with Pandas and create interactive visualisations using Plotly and Streamlit. Month 3 · Python · Pandas · Streamlit",
      },
      {
        title: "Executive Business Intelligence Dashboard",
        body: "Create a structured Power BI data model with DAX measures and executive KPIs, then develop a complementary Tableau dashboard. Month 4 · Power BI · Tableau",
      },
      {
        title: "Business Process & Data Platform Design",
        body: "Prepare business requirements, user stories, BPMN diagrams and a conceptual modern data architecture. Month 5 · BRD · FRD · BPMN · Fabric",
      },
      {
        title: "Enterprise Analytics Capstone",
        body: "Bring together requirements, SQL, Python, BI, business analysis and AI-assisted reporting in one end-to-end portfolio project. Month 6 · Capstone",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Present It.",
    paragraphs: [
      "The learning cycle is simple:",
      "This approach helps turn a completed assignment into something you can actually discuss during an interview.",
    ],
    items: [
      {
        title: "Understand",
        body: "Start by understanding the business question, available data and expected outcome.",
        icon: "search",
      },
      {
        title: "Build",
        body: "Apply the relevant tools to clean, analyse, model and visualise the information.",
        icon: "cube",
      },
      {
        title: "Present",
        body: "Explain what you discovered, why you used a particular approach and what action the business could consider.",
        icon: "megaphone",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Students Can Choose techcadd",
    // The brief writes no lead-in for this block; this states what its six
    // points have in common.
    intro:
      "A curriculum that builds in order, a project at every stage, and the business-analysis half most analytics courses leave out.",
    items: [
      {
        title: "Structured Learning Path",
        body: "The curriculum progresses from fundamentals to advanced topics rather than expecting beginners to understand everything immediately.",
        icon: "layers",
      },
      {
        title: "Practical Assignments",
        body: "Regular labs and projects give students opportunities to apply concepts throughout the programme.",
        icon: "target",
      },
      {
        title: "Analytics + Business Analysis",
        body: "Students learn technical analytics as well as the documentation and requirement skills used in business-facing roles.",
        icon: "briefcase",
      },
      {
        title: "Project-Based Portfolio",
        body: "Six major project stages provide multiple opportunities to create work that can be presented in a portfolio.",
        icon: "cube",
      },
      {
        title: "Modern Technology Exposure",
        body: "The programme introduces cloud data platforms, modern data engineering concepts, AI and machine learning alongside established analytics tools.",
        icon: "cloud",
      },
      {
        title: "Interview Preparation",
        body: "Technical questions, business scenarios, resume development, portfolio presentation and mock interviews are included as part of career preparation.",
        icon: "rocket",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore other career-focused programmes after 12th and beyond.",
    items: [
      {
        title: "After 12th 3-Month Data Analytics Program",
        body: "A shorter introduction to Excel, SQL, reporting and analytics fundamentals.",
        href: "/courses/after12th/data-analytics",
      },
      {
        title: "After 12th 6-Month Data Science Certificate Program",
        body: "A deeper path toward Python, statistics, machine learning and data science.",
        href: "/after-12th/data-science-certificate-program",
      },
      {
        title: "After 12th 6-Month Artificial Intelligence Certificate Program",
        body: "Explore AI concepts, machine learning, automation and modern AI development.",
        href: "/after-12th/artificial-intelligence-certificate-program",
      },
      {
        title: "After 12th 6-Month Digital Marketing Certificate Program",
        body: "Learn SEO, paid advertising, social media, analytics, websites and e-commerce marketing.",
        href: "/after-12th/digital-marketing-certificate-program",
      },
      {
        title: "Data Analytics Course",
        body: "A broader analytics pathway for learners who want to specialise in data-driven business reporting.",
        href: "/courses/course/data-analytics",
      },
    ],
  },

  // The first four come from the brief's own "Where this course can take you"
  // block, which asks and answers them there; the rest are its FAQ section in
  // the order supplied.
  faqs: [
    {
      q: "What will I be able to do?",
      a: "By the end of the programme, you should be able to work through a typical analytics assignment from raw information to business recommendation. You will practise cleaning and analysing datasets, writing SQL queries, using Excel and Power Query, analysing data with Python and Pandas, creating visualisations, building Power BI dashboards, developing Tableau stories, understanding DAX and data models, gathering business requirements, writing BRD, FRD and SRS documents, creating BPMN process maps, working with Agile concepts, using Jira for project workflows, understanding modern data architectures, applying basic machine learning, using AI tools as analytics assistants, presenting insights to stakeholders and building a professional analytics portfolio.",
    },
    {
      q: "Do I need advanced mathematics?",
      a: "No advanced mathematics background is required to begin the programme. The statistics section focuses on concepts that analysts use for interpreting business data, while more advanced mathematical concepts are introduced only where relevant.",
    },
    {
      q: "Is it data analytics or business analysis?",
      a: "It combines both. The first part focuses heavily on data analytics, programming, databases and BI. The later modules introduce requirements, documentation, Agile, BPMN and stakeholder-oriented business analysis. This combination can be useful for students who want flexibility between technical analytics and business-facing roles.",
    },
    {
      q: "Can I freelance after learning these skills?",
      a: "Yes, analytics skills can be used for freelance services such as dashboard creation, Excel reporting, SQL reporting, data cleaning, Power BI development and business reporting. However, freelancing depends on your portfolio, communication, service positioning, ability to find clients and quality of delivery.",
    },
    {
      q: "What is the duration of the Data Analytics programme after 12th?",
      a: "The programme is designed as a six-month learning path covering analytics foundations, Excel, SQL, Python, BI, business analysis, modern data platforms, AI and career preparation. Confirm the current batch schedule and class timings with the Mohali centre.",
    },
    {
      q: "Can I join directly after 12th?",
      a: "Yes. The programme is designed to introduce the fundamentals before moving into advanced analytics and business-analysis concepts.",
    },
    {
      q: "Do I need prior coding experience?",
      a: "No advanced coding experience is required to start. Python is introduced progressively after the foundational analytics concepts.",
    },
    {
      q: "Can students from Arts or Commerce join?",
      a: "Yes. Students from different academic backgrounds can join. Commerce and management students may particularly benefit from the business reporting and business-analysis components.",
    },
    {
      q: "How many projects are included?",
      a: "The curriculum is structured around six major project stages, with practical assignments and a final capstone.",
    },
    {
      q: "What is included in the final capstone?",
      a: "The capstone brings together requirement gathering, SQL analysis, Python-based data work, Power BI reporting, business analysis and AI-assisted reporting into an end-to-end solution.",
    },
    {
      q: "Which tools are covered?",
      a: "The programme includes Excel, Power Query, SQL, MySQL, Python, NumPy, Pandas, Matplotlib, Seaborn, Plotly, Power BI, Tableau, Jira, Confluence, Lucidchart, Figma, Microsoft Fabric, Snowflake, DuckDB, dbt, Apache Airflow, Streamlit and selected AI tools.",
    },
    {
      q: "Is machine learning included?",
      a: "Yes. The final module introduces machine learning concepts such as regression, classification, decision trees, random forest and clustering, with practical analyst-focused applications.",
    },
    {
      q: "Is this programme suitable for a Business Analyst career?",
      a: "Yes. Business analysis is a dedicated part of the curriculum and includes requirement gathering, stakeholder analysis, BRD, FRD, SRS, user stories, acceptance criteria, Agile, Scrum, Jira and BPMN.",
    },
    {
      q: "Can I work as a freelancer after the course?",
      a: "The skills can support freelance services such as Excel dashboards, Power BI reports, SQL reporting, data cleaning and analytics projects. Building a strong portfolio and learning client acquisition are important for freelance success.",
    },
    {
      q: "Does the programme guarantee a job?",
      a: "No training programme should be treated as a guaranteed job offer. Career outcomes depend on your skills, project quality, interview performance, experience and the hiring market. techcadd can provide career and placement support according to its current programme policies.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Course-completion documentation is provided according to the current programme terms. Ask the Mohali team for the latest certificate and project-documentation details.",
    },
    {
      q: "Are weekend or evening batches available?",
      a: "Batch availability can change. Contact the Mohali centre for the latest weekday, evening and weekend schedule.",
    },
  ],

  enquiry: {
    title: "Ask About the Data Analytics Certificate Program in Mohali",
    // The contact details the brief supplies are the centre's own; the page
    // already renders them from `@/lib/site`, so only the wording is carried
    // here rather than a second copy of the number.
    paragraphs: [
      "Have questions about the syllabus, fees, batch timings, eligibility or career pathway?",
      "Speak with a course counsellor to understand whether this six-month programme matches your academic background and career goals.",
      "Location: Mohali, Punjab. Counselling hours: Monday to Saturday, 9:00 AM to 7:00 PM.",
    ],
  },

  fit: {
    title: "Not Sure If Data Analytics Is the Right Choice?",
    paragraphs: [
      "If you are planning your next step after 12th and are interested in data, dashboards, technology and business decision-making, a counselling session can help you compare the available learning paths.",
      "Book a free demo or speak with the Mohali team to understand the current curriculum, batch schedule and programme requirements.",
    ],
    ctaTitle: "Get Started Today",
    // The brief names no list here; these are its own highlights, the facts a
    // reader still deciding is weighing.
    points: [
      "6 months, 12th pass and above, any stream",
      "Excel, SQL, Python and business statistics from the fundamentals",
      "Power BI, Power Query, DAX and Tableau",
      "Business analysis — BRD, FRD, SRS, Agile, Scrum, Jira and BPMN",
      "Microsoft Fabric, Snowflake, DuckDB, dbt and Airflow",
      "Machine learning, generative AI and AI-assisted reporting",
      "6 project stages and an end-to-end analytics capstone",
    ],
  },
};

const fullStackDevelopmentCertificate: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Future scope" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "Best After 12th 6-Month Full Stack Development Certificate Program in Mohali",
    paragraphs: [
      "Build practical full-stack development skills in six months with a structured learning path covering HTML, CSS, JavaScript, Python, Django, databases, REST APIs, authentication, AI-assisted development, payments, background processing, deployment, and modern application architecture.",
      "Whether you are starting after 12th, completing a degree, changing careers, or building technical skills for freelancing, this programme is designed to take you from fundamentals to portfolio-ready web applications.",
    ],
  },

  program: {
    title: "Full Stack Development Certificate Program in Mohali",
    paragraphs: [
      "The After 12th 6-Month Full Stack Development Certificate Program in Mohali at techcadd is designed around progressive skill building rather than isolated programming topics.",
      "You begin with web development fundamentals and JavaScript, move into Python and object-oriented programming, then learn databases and Django before progressing to REST APIs, JWT authentication, AI-assisted development, payment integration, background jobs, CI/CD concepts, and system design.",
      "The final stage focuses on bringing these skills together through substantial application development and portfolio preparation.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "6 Months" },
      { label: "Learning Mode", value: "Practical + Theory" },
      { label: "Eligibility", value: "12th Pass / Any Stream" },
      { label: "Level", value: "Beginner to Advanced" },
      { label: "Focus", value: "Full-Stack Web & Backend Development" },
      { label: "Includes", value: "Projects, Portfolio Development & Career Support" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "This six-month programme follows a logical development journey.",
      "Instead of jumping directly into frameworks, you first understand how websites work, how browsers interact with JavaScript, and how frontend applications communicate with backend systems.",
      "You then progress to Python, Django, SQL, database design, REST APIs, authentication, AI-assisted coding workflows, third-party integrations, asynchronous processing, deployment concepts, and application architecture.",
      "By the end, you should have a collection of practical projects that demonstrate how you approach real development tasks.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    // The brief lists its eight outcomes but writes no lead-in; this states the
    // arc they actually follow.
    intro:
      "Eight outcomes across the three stages — from a first HTML page through to APIs, AI integration and production-oriented development.",
    items: [
      {
        title: "Web Development Foundations",
        body: "Understand HTML5, CSS3, responsive layouts, Bootstrap and the fundamentals required to create functional web interfaces.",
      },
      {
        title: "JavaScript & Browser Programming",
        body: "Learn JavaScript fundamentals, DOM manipulation, events, validation and client-side application behaviour.",
      },
      {
        title: "Python Programming",
        body: "Develop a strong Python foundation covering programming concepts, functions, collections, OOP, error handling and reusable code.",
      },
      {
        title: "Databases & SQL",
        body: "Work with relational databases, SQL queries, schema design, relationships, joins and database-driven application development.",
      },
      {
        title: "Django Development",
        body: "Build backend applications using Django, Django ORM, models, views, forms, authentication and advanced framework concepts.",
      },
      {
        title: "AI-Assisted Development",
        body: "Learn how modern AI coding assistants can support development while maintaining code review, testing, debugging and verification practices.",
      },
      {
        title: "REST APIs & Authentication",
        body: "Create APIs with Django REST Framework, implement JWT-based authentication and understand API documentation and integration.",
      },
      {
        title: "Production-Oriented Development",
        body: "Explore LLM APIs, Celery, payment workflows, CI/CD concepts and system-design fundamentals used when moving applications beyond basic projects.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The programme is divided into three progressive stages so that every phase builds on the skills learned previously.",
    // Each stage keeps the brief's own grouping headings and topic order in
    // place, so the wording is as supplied.
    modules: [
      {
        title: "Module 1: Months 1–2",
        points: [
          "Web Fundamentals",
          "HTML5 fundamentals",
          "Semantic HTML",
          "CSS3",
          "Responsive design",
          "Bootstrap",
          "Forms and validation",
          "Website structure",
          "Browser fundamentals",
          "JavaScript & DOM",
          "JavaScript syntax",
          "Variables and data types",
          "Functions",
          "Arrays and objects",
          "Events",
          "DOM manipulation",
          "Form handling",
          "Browser-based interactions",
          "Basic asynchronous JavaScript",
          "Python Programming & OOP",
          "Python fundamentals",
          "Variables and operators",
          "Conditional statements",
          "Loops",
          "Functions",
          "Lists, tuples, sets and dictionaries",
          "File handling",
          "Modules and packages",
          "Object-oriented programming",
          "Classes and objects",
          "Inheritance",
          "Encapsulation",
          "Exception handling",
        ],
      },
      {
        title: "Module 2: Months 3–4",
        points: [
          "Databases & SQL",
          "Database fundamentals",
          "Relational database concepts",
          "SQL",
          "CRUD operations",
          "SELECT queries",
          "Filtering and sorting",
          "Joins",
          "Aggregation",
          "Relationships",
          "Schema design",
          "Normalisation concepts",
          "Query optimisation fundamentals",
          "Django Framework",
          "Django project structure",
          "Applications",
          "URLs",
          "Views",
          "Templates",
          "Models",
          "Forms",
          "Django ORM",
          "Authentication",
          "Admin panel",
          "Static and media files",
          "CRUD application development",
          "Advanced Django concepts",
          "AI-Assisted Development",
          "AI coding assistants",
          "Prompting for development tasks",
          "Code generation",
          "Debugging assistance",
          "Refactoring support",
          "Documentation generation",
          "Test generation",
          "Reviewing AI-generated code",
          "Verification and responsible use of AI tools",
        ],
      },
      {
        title: "Module 3: Months 5–6",
        points: [
          "Django REST Framework",
          "REST architecture",
          "Serializers",
          "API views",
          "ViewSets",
          "Routers",
          "CRUD APIs",
          "API validation",
          "Authentication",
          "JWT",
          "Permissions",
          "API documentation",
          "Frontend-backend communication",
          "LLM APIs & AI Integration",
          "Introduction to LLM APIs",
          "API requests and responses",
          "Structured responses",
          "Connecting AI services with applications",
          "Basic AI-powered application features",
          "API key and secret management",
          "Celery & Background Processing",
          "Background task concepts",
          "Task queues",
          "Scheduled tasks",
          "Asynchronous processing",
          "Email/background workflows",
          "Celery fundamentals",
          "Payment Integration",
          "Payment workflow concepts",
          "Checkout integration",
          "Payment callbacks",
          "Transaction handling",
          "Basic payment security practices",
          "CI/CD & Deployment Concepts",
          "Version control workflows",
          "Git and GitHub",
          "Environment variables",
          "Build and deployment concepts",
          "CI/CD fundamentals",
          "Application configuration",
          "Production-readiness basics",
          "System Design Fundamentals",
          "Application architecture",
          "Frontend/backend separation",
          "API architecture",
          "Database design",
          "Scalability fundamentals",
          "Caching concepts",
          "Security considerations",
          "Designing applications for future growth",
        ],
      },
    ],
    // The brief's own "Student Experience" block, kept where it belongs — how
    // the work actually runs.
    practical: {
      title: "A Learning Environment Focused on Practical Development",
      body: "The goal of the programme is to make students comfortable with the complete development cycle — plan, code, test, debug, integrate, improve and present. Rather than treating every technology as a separate subject, the programme progressively connects frontend, backend, databases, APIs and modern integrations. For the Mohali programme, current batch size, lab access, class timings and available facilities should be confirmed with the centre before enrolment.",
    },
    outcome: {
      label: "Outcome",
      body: "By the end of the three stages, you should be able to take an application from an interface through JavaScript, a REST API, a Django backend, a relational database and authentication out to external services and deployment.",
    },
  },

  tools: {
    title: "Technologies You Will Work With",
    // The second sentence is the brief's own footnote to this section; the
    // first names the five groups it is organised into.
    intro:
      "The toolchain spans frontend, programming, backend, database and modern development work. The exact software versions and API providers may vary according to the current training environment.",
    // The brief groups its tools under Frontend, Programming, Backend, Database
    // and Modern Development; each line below names that tool's own job, with
    // its group kept in the wording.
    items: [
      { name: "HTML5", body: "Frontend — semantic structure and the page itself." },
      { name: "CSS3", body: "Frontend — styling, layout and responsive design." },
      { name: "JavaScript", body: "Frontend — behaviour, events and browser interaction." },
      { name: "Bootstrap", body: "Frontend — the responsive component library." },
      { name: "DOM APIs", body: "Frontend — reading and changing the live page." },
      { name: "Python", body: "Programming — the language behind the backend track." },
      { name: "Object-Oriented Programming", body: "Programming — classes, inheritance and encapsulation." },
      { name: "Git", body: "Programming — version control and branching workflows." },
      { name: "GitHub", body: "Programming — where the projects and portfolio live." },
      { name: "Django", body: "Backend — models, views, templates, forms and auth." },
      { name: "Django ORM", body: "Backend — the database layer you query from Python." },
      { name: "Django REST Framework", body: "Backend — serializers, ViewSets and routers." },
      { name: "JWT Authentication", body: "Backend — token-based API authentication." },
      { name: "REST APIs", body: "Backend — the contract between frontend and backend." },
      { name: "SQL", body: "Database — CRUD, filtering, joins and aggregation." },
      { name: "Relational Database Concepts", body: "Database — tables, keys and relationships." },
      { name: "Database Schema Design", body: "Database — normalisation and structuring data." },
      { name: "AI coding assistants", body: "Modern development — generation, debugging and refactoring support." },
      { name: "LLM APIs", body: "Modern development — the AI features inside your own app." },
      { name: "Celery", body: "Modern development — task queues and background processing." },
      { name: "Payment APIs", body: "Modern development — checkout, callbacks and transactions." },
      { name: "API documentation tools", body: "Modern development — documenting what your API exposes." },
      { name: "CI/CD workflows", body: "Modern development — build, configuration and deployment." },
    ],
  },

  who: {
    title: "Who Can Join This Programme?",
    items: [
      {
        title: "Students After 12th",
        body: "Students from any stream can begin with the fundamentals and gradually develop programming and application-building skills.",
        icon: "users",
      },
      {
        title: "College Students",
        body: "Students pursuing BCA, BSc, BBA, B.Com, B.Tech or other degrees can use the programme to develop practical development skills alongside their academic studies.",
        icon: "certificate",
      },
      {
        title: "Graduates",
        body: "Graduates looking to add a technical skill to their existing qualification can follow the structured path from programming fundamentals to full-stack application development.",
        icon: "rocket",
      },
      {
        title: "Career Changers",
        body: "If you are moving from a non-technical background into software development, the programme provides a progressive learning route instead of assuming advanced programming knowledge from day one.",
        icon: "refresh",
      },
      {
        title: "Freelancers",
        body: "Aspiring freelancers can use full-stack development skills to create websites, dashboards, APIs, business applications and custom web solutions.",
        icon: "briefcase",
      },
      {
        title: "Self-Learners",
        body: "Learners who have studied programming independently can use instructor-led projects and structured modules to turn fragmented knowledge into practical development experience.",
        icon: "search",
      },
    ],
  },

  worth: {
    title: "Why This Six-Month Programme Is Worth Considering",
    items: [
      {
        title: "Build Instead of Only Studying",
        body: "Programming becomes easier to understand when concepts are applied to actual applications. Each stage gives you opportunities to practise the technology you have learned.",
        icon: "cube",
      },
      {
        title: "Start With Fundamentals",
        body: "The programme does not require you to begin with advanced backend frameworks. HTML, CSS, JavaScript and Python create the foundation before Django and APIs are introduced.",
        icon: "layers",
      },
      {
        title: "Learn Backend Development Properly",
        body: "Django, Django ORM, SQL, REST APIs and authentication give you the skills needed to understand how modern web applications operate behind the interface.",
        icon: "terminal",
      },
      {
        title: "Understand Modern AI Integration",
        body: "AI is increasingly becoming part of software products. Learning how applications can interact with LLM APIs gives you an additional development capability beyond conventional web programming.",
        icon: "sparkles",
      },
      {
        title: "Develop Production-Oriented Thinking",
        body: "Deployment concepts, background processing, payments, security, Git workflows and CI/CD introduce you to considerations that become important when applications move beyond classroom projects.",
        icon: "shield",
      },
      {
        title: "Create a Portfolio",
        body: "A practical project portfolio can help you demonstrate your skills during internships, interviews, freelance discussions and further learning.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Full Stack Development Is More Than Frontend Coding",
    paragraphs: [
      "Modern developers often need to understand how multiple parts of an application connect.",
      "A typical application may involve: User Interface → JavaScript → REST API → Backend → Database → Authentication → External Services → Deployment.",
      "With AI-enabled applications, another layer may be added: Application → LLM API → AI Response → Business Logic → User Interface.",
      "Learning these connections gives students a broader understanding of application development.",
    ],
    listTitle: "What You Can Practise",
    // The brief lists these nine as bare lines; each body names where that line
    // actually sits in the curriculum above.
    items: [
      { title: "Building responsive web pages", body: "Months 1–2 — HTML5, CSS3, Bootstrap and responsive design." },
      { title: "Creating database-backed applications", body: "Months 3–4 — SQL, schema design and the Django ORM." },
      { title: "Developing REST APIs", body: "Months 5–6 — serializers, ViewSets, routers and CRUD APIs." },
      { title: "Implementing authentication", body: "Months 3–6 — Django auth, JWT tokens and permissions." },
      { title: "Connecting frontend and backend systems", body: "Months 5–6 — frontend-backend communication over the API." },
      { title: "Integrating third-party services", body: "Months 5–6 — payment checkout, callbacks and transactions." },
      { title: "Adding AI-powered functionality", body: "Months 5–6 — LLM API requests, structured responses and key management." },
      { title: "Processing background tasks", body: "Months 5–6 — Celery, task queues and scheduled work." },
      { title: "Preparing applications for deployment", body: "Months 5–6 — environment variables, CI/CD and production readiness." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with the techcadd team settles eligibility, batch timings, fees and where this leads — before you commit six months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Complete the Programme With Practical Work",
    intro:
      "After completing the required training and project work, students can receive course-related certification according to the applicable techcadd programme terms. The learning outcome can also include project documentation and portfolio material that you can use when presenting your technical skills.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion",
        body: "Documentation of successful completion of the training programme, subject to programme requirements.",
      },
      {
        icon: "cube",
        title: "Project Work",
        body: "Practical applications developed during the learning journey can become part of your portfolio.",
      },
      {
        icon: "briefcase",
        title: "Career Preparation",
        body: "Support may include guidance around resumes, project presentation, interview preparation and development career paths.",
      },
      {
        icon: "layers",
        title: "Internship / Training Documentation",
        body: "Where applicable, internship or training documentation is provided according to the current programme policy. Confirm the latest terms with the Mohali team before enrolment.",
      },
    ],
  },

  takesYou: {
    title: "Where Full-Stack Development Can Take You",
    intro:
      "The skills developed through this programme can support several technology career paths. Job availability and compensation depend on skills, experience, location, portfolio quality and current market conditions.",
    listTitle: "Roles this programme prepares you for",
    steps: [
      {
        title: "Full-Stack Developer",
        body: "Work across frontend interfaces, backend services, databases and APIs.",
      },
      {
        title: "Backend Developer",
        body: "Focus on Python, Django, APIs, databases, authentication and server-side application logic.",
      },
      {
        title: "Python Developer",
        body: "Use Python for web development, automation, APIs and software applications.",
      },
      {
        title: "Django Developer",
        body: "Specialise in developing web applications and backend systems using Django.",
      },
      {
        title: "API Developer",
        body: "Design and build REST APIs that allow different applications and services to communicate.",
      },
      {
        title: "AI Integration Developer",
        body: "Combine traditional application development with AI APIs and intelligent application features.",
      },
      {
        title: "Freelance Web Developer",
        body: "Build websites, dashboards, business applications and custom backend solutions for clients.",
      },
      {
        title: "Junior Software Developer",
        body: "Use your programming fundamentals, projects and development portfolio as a starting point for entry-level software roles.",
      },
    ],
  },

  projects: {
    title: "Projects You Can Build",
    // Each project keeps the brief's own technologies line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Responsive Business Website",
        body: "Create a structured website using HTML5, CSS3, Bootstrap and JavaScript with responsive layouts and interactive elements. HTML5 · CSS3 · Bootstrap · JavaScript",
      },
      {
        title: "Database-Driven Application",
        body: "Build an application that stores, retrieves and manages information through SQL and a properly structured database. Python · SQL · Database",
      },
      {
        title: "Django Web Application",
        body: "Develop a complete backend-powered application using Django, models, templates, forms, authentication and CRUD functionality. Python · Django · ORM",
      },
      {
        title: "REST API Application",
        body: "Create a REST API using Django REST Framework with authentication, permissions, CRUD operations and API documentation. DRF · JWT · REST API",
      },
      {
        title: "AI-Enabled Application",
        body: "Integrate an LLM API into a web application to create an AI-assisted feature such as content generation, question answering or an intelligent productivity workflow. Django · API · LLM",
      },
      {
        title: "Final Full-Stack Capstone",
        body: "Bring multiple concepts together into one larger project involving frontend interaction, backend services, database operations, authentication and API integrations. Full Stack · Database · API · Deployment",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Present It.",
    // The brief writes no lead-in for this cycle; this names what it is.
    paragraphs: ["Every project you take on runs through the same five stages:"],
    items: [
      {
        title: "Understand",
        body: "Learn the concept, understand why it is used and study the development pattern behind it.",
        icon: "search",
      },
      {
        title: "Practise",
        body: "Write the code yourself, test different approaches and troubleshoot errors.",
        icon: "terminal",
      },
      {
        title: "Build",
        body: "Apply the concept inside a working project rather than keeping it as an isolated coding exercise.",
        icon: "cube",
      },
      {
        title: "Improve",
        body: "Refactor your implementation, add validation and improve the application's structure.",
        icon: "refresh",
      },
      {
        title: "Present",
        body: "Document the project and explain the technical decisions behind your implementation.",
        icon: "megaphone",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Students Can Consider techcadd for Full-Stack Training",
    // The brief writes no lead-in for this block; this states what its six
    // points have in common.
    intro:
      "A curriculum that builds in order, a project at every stage, and the production-side topics most short courses stop before reaching.",
    items: [
      {
        title: "Structured Learning Path",
        body: "The curriculum follows a progression from web fundamentals and Python to Django, APIs and advanced development concepts.",
        icon: "layers",
      },
      {
        title: "Practical Orientation",
        body: "Projects and coding exercises help students apply concepts rather than relying only on theoretical learning.",
        icon: "cube",
      },
      {
        title: "Modern Development Topics",
        body: "The curriculum includes AI-assisted development, LLM integration, background processing, payments and deployment concepts alongside conventional full-stack skills.",
        icon: "sparkles",
      },
      {
        title: "Portfolio Focus",
        body: "Students can organise completed projects into a portfolio that demonstrates practical development ability.",
        icon: "briefcase",
      },
      {
        title: "Beginner-Friendly Progression",
        body: "The programme starts with foundational technologies before moving toward more advanced backend and application-development topics.",
        icon: "target",
      },
      {
        title: "Career Preparation",
        body: "Students can receive guidance related to project presentation, resumes, interviews and potential career directions.",
        icon: "rocket",
      },
    ],
  },

  popular: {
    title: "Explore Other Technology Programmes",
    intro:
      "Students interested in expanding beyond full-stack development can also explore related learning paths.",
    // The brief names these six without describing them; each line below names
    // what that programme covers. All six use the slugs the After 12th menu
    // reserves in `@/lib/site`.
    items: [
      {
        title: "After 12th 3-Month Full Stack Development Programme",
        body: "The shorter route through the same frontend, Python and backend fundamentals.",
        href: "/courses/after12th/full-stack-development",
      },
      {
        title: "After 12th 9-Month Full Stack Development Diploma Programme",
        body: "The longest track, carrying the same skills further and adding placement preparation.",
        href: "/after-12th/full-stack-development-diploma-program",
      },
      {
        title: "After 12th 6-Month MERN Stack Certificate Programme",
        body: "The JavaScript route to the same stack — MongoDB, Express.js, React and Node.js.",
        href: "/after-12th/mern-stack-certificate-program",
      },
      {
        title: "After 12th 6-Month Artificial Intelligence Certificate Programme",
        body: "Machine learning, deep learning, LLMs and modern AI application development.",
        href: "/after-12th/artificial-intelligence-certificate-program",
      },
      {
        title: "After 12th 6-Month Agentic AI Certificate Programme",
        body: "AI systems capable of using tools, workflows and multi-step processes.",
        href: "/after-12th/agentic-ai-certificate-program",
      },
      {
        title: "After 12th 6-Month Cloud Computing Certificate Programme",
        body: "Linux, AWS, Docker, Kubernetes and the pipelines applications are deployed through.",
        href: "/after-12th/cloud-computing-certificate-program",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the Full Stack Development Certificate Program in Mohali?",
      a: "The programme is designed as a six-month learning path covering frontend fundamentals, JavaScript, Python, databases, Django, REST APIs, authentication, AI integration and advanced development concepts.",
    },
    {
      q: "Can I join after 12th?",
      a: "Yes. Students who have completed 12th can start the programme from the fundamentals. No advanced programming background is assumed at the beginning.",
    },
    {
      q: "Can students from any stream apply?",
      a: "The programme can be suitable for students from different academic streams. Basic computer familiarity and a willingness to practise programming are helpful.",
    },
    {
      q: "Do I need prior coding experience?",
      a: "No advanced coding experience is required for the beginner-level starting point. Consistent practice is important because programming skills develop through hands-on work.",
    },
    {
      q: "What programming language is taught?",
      a: "Python is the primary programming language for the backend development track, supported by HTML, CSS and JavaScript for web development.",
    },
    {
      q: "Will I learn Django?",
      a: "Yes. Django is a major part of the backend curriculum, including Django ORM, models, views, authentication and application development.",
    },
    {
      q: "Will I learn REST APIs?",
      a: "Yes. Django REST Framework is covered along with serializers, API views, CRUD operations, authentication, JWT and API documentation.",
    },
    {
      q: "Is AI included in the programme?",
      a: "Yes. The curriculum introduces AI-assisted development and LLM API integration so students can understand how AI functionality can be incorporated into web applications.",
    },
    {
      q: "Will I learn databases?",
      a: "Yes. The programme covers SQL, relational database concepts, CRUD operations, joins, relationships and schema design.",
    },
    {
      q: "How many projects will I build?",
      a: "The programme includes progressive project work, from foundational web development and database applications to Django applications, APIs and a larger final capstone. The exact number of assigned projects may vary by batch and training plan.",
    },
    {
      q: "Can I use these projects in my portfolio?",
      a: "Yes. Completed projects can be documented and presented as portfolio work, provided they meet the programme's project requirements.",
    },
    {
      q: "What jobs can I pursue after the course?",
      a: "Potential career directions include Full-Stack Developer, Backend Developer, Python Developer, Django Developer, API Developer, Junior Software Developer and AI Integration Developer.",
    },
    {
      q: "Is placement guaranteed?",
      a: "No training programme should be treated as a guaranteed job offer. Career support can assist with resume preparation, interview practice and relevant opportunities, while selection depends on individual skills and employer requirements.",
    },
    {
      q: "What salary can I expect after completing the programme?",
      a: "There is no fixed salary outcome. Compensation varies according to your technical ability, portfolio, interview performance, experience, employer, role and location.",
    },
    {
      q: "Are weekend or evening batches available?",
      a: "Batch schedules can change based on current admissions and centre availability. Contact the Mohali team for the latest weekday, evening or weekend options.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Course certification is subject to successful completion and the applicable programme terms. Confirm the current certificate structure with the Mohali centre before joining.",
    },
    {
      q: "Can I learn this course for freelancing?",
      a: "Yes. Full-stack development can provide a technical foundation for freelance websites, dashboards, APIs and custom web applications. Building a strong portfolio and learning client communication are equally important.",
    },
  ],

  enquiry: {
    title: "Ask About the Full Stack Development Certificate Program",
    // The contact details the brief supplies are the centre's own; the page
    // already renders them from `@/lib/site`, so only the wording is carried
    // here rather than a second copy of the number.
    paragraphs: [
      "Want to know whether this six-month programme matches your academic background or career goal?",
      "Speak with the techcadd team about current batch timings, course fees, demo class availability, learning mode, project structure, certification, career support and internship or training options.",
      "Location: Mohali, Punjab.",
    ],
  },

  fit: {
    title: "Not Sure If Full Stack Development Is Right for You?",
    paragraphs: [
      "A quick counselling session can help you understand the curriculum, learning requirements and career paths before you enrol.",
      "Start with the fundamentals, build real applications, strengthen your backend skills and create a portfolio that demonstrates what you can actually develop.",
    ],
    ctaTitle: "Get Started Today",
    // The brief names no list here; these are its own highlights, the facts a
    // reader still deciding is weighing.
    points: [
      "6 months, 12th pass, any stream",
      "Beginner to advanced — HTML, CSS, JavaScript and Python from the fundamentals",
      "Django, Django ORM, SQL and relational schema design",
      "Django REST Framework, JWT authentication and API documentation",
      "AI-assisted development and LLM API integration",
      "Celery, payments, CI/CD and system-design fundamentals",
      "6 projects, a full-stack capstone and portfolio preparation",
    ],
  },
};

const dataScienceCertificate: After12Page = {
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
    title: "Best After 12th 6-Month Data Science Certificate Program in Mohali",
    paragraphs: [
      "Start your data science journey after 12th with a structured six-month programme that takes you from data analysis and Python fundamentals to machine learning, deep learning, generative AI, RAG systems, AI agents and cloud deployment.",
      "Instead of learning disconnected tools, you work through a progressive project-based curriculum where every stage adds another practical skill to your portfolio.",
    ],
  },

  program: {
    title: "Data Science Certificate Program in Mohali",
    paragraphs: [
      "This six-month Data Science programme is designed for students entering the technology field after 12th as well as learners who want a practical route into data and AI.",
      "The programme begins with Excel, Power BI, Python and SQL, then moves into data preparation, statistics, machine learning, deep learning and computer vision. The second half introduces LLMs, prompt engineering, vector databases, RAG, AI agents and modern AI application development, followed by deployment, security and a complete capstone.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "6 Months" },
      { label: "Mode", value: "Classroom & 1-on-1" },
      { label: "Eligibility", value: "12th Pass" },
      { label: "Includes", value: "Practical Projects & Placement Support" },
    ],
  },

  // The brief walks the six months in prose before it lists the syllabus; those
  // month blocks are kept here as written, and the curriculum below carries the
  // module lists.
  overview: {
    title: "Course Overview",
    paragraphs: [
      "Month 1 — Build Your Data & Programming Foundation. Begin with Advanced Excel, Power Query, Power BI and DAX to understand business reporting and dashboards. Python is then introduced from the fundamentals using VS Code, virtual environments, object-oriented programming, exception handling, logging, type hints and testing.",
      "You also learn Git, GitHub and modern AI-assisted coding workflows before moving into PostgreSQL, database design, SQL queries, window functions, optimisation, APIs, JSON, FastAPI fundamentals and JWT authentication.",
      "Month 2 — Data Engineering & Machine Learning. Work with Pandas, NumPy, Polars, DuckDB and PyArrow to clean, transform and analyse datasets. You learn exploratory data analysis, feature engineering, statistics, probability and interactive visualisation using Plotly and Streamlit.",
      "The machine-learning section introduces scikit-learn pipelines, preprocessing, cross-validation and model evaluation, followed by practical work with XGBoost, LightGBM and CatBoost and hyperparameter optimisation.",
      "Month 3 — Deep Learning & Computer Vision. Move beyond traditional machine learning into neural networks using PyTorch. Learn tensors, model architecture, CNNs and transfer learning before applying computer vision techniques with OpenCV.",
      "The module also covers YOLO, object detection, OCR, image segmentation, Vision Transformers and Hugging Face, giving you exposure to modern computer-vision workflows.",
      "Month 4 — LLMs & Vector Search. Understand how modern large language models work, including tokenization, embeddings, context windows and attention mechanisms. Learn prompt engineering and structured prompting while working with APIs such as OpenAI, Gemini, Claude and Grok, together with Ollama and LiteLLM.",
      "The module then introduces embeddings and vector search through technologies such as FAISS, ChromaDB, Pinecone, Qdrant and Milvus.",
      "Month 5 — RAG, AI Agents & Applications. Turn your LLM knowledge into usable applications. Learn RAG architecture, document processing, hybrid retrieval, re-ranking, evaluation and guardrails. Work with LangChain, LangGraph, CrewAI and Model Context Protocol (MCP) for tool calling, structured outputs and agent workflows.",
      "Application development includes advanced FastAPI, asynchronous programming, background tasks, WebSockets, Streamlit, Gradio and Chainlit.",
      "Month 6 — Deployment, Security & Capstone. Learn how to move AI applications beyond the development environment. The final module covers Docker, Docker Compose, Linux, Nginx, AWS, Azure AI and Google Vertex AI, together with reverse proxies and cloud deployment approaches.",
      "You also explore AI security topics such as prompt injection, jailbreak risks, secret management and responsible AI, followed by CI/CD using GitHub Actions. The programme concludes with an end-to-end AI application combining FastAPI, PostgreSQL, RAG and AI agents, documented and prepared as a professional portfolio project.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    intro:
      "The focus is on creating demonstrable work rather than simply completing theoretical lessons.",
    items: [
      {
        title: "Business Data Dashboard",
        body: "Build a Power BI dashboard using Excel, Power Query and DAX. Work with KPIs, transformations and business reporting so your first project already resembles a workplace deliverable.",
      },
      {
        title: "Machine Learning Pipeline",
        body: "Prepare a real-world dataset, perform exploratory analysis, engineer features and create a complete scikit-learn pipeline. Compare boosting models and document the evaluation results.",
      },
      {
        title: "RAG-Based AI Assistant",
        body: "Create a document-questioning system using embeddings and a vector database. Implement retrieval, re-ranking and response generation while considering evaluation and guardrails.",
      },
      {
        title: "AI Application Capstone",
        body: "Bring together backend development, databases, RAG, AI agents and deployment into one substantial application that can become a central part of your portfolio.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The six-month curriculum is divided into progressive stages. Each module connects with the previous one so students gradually move from data fundamentals to production-oriented AI development.",
    // Each month keeps the brief's own four grouping headings, each followed by
    // the topic line written under it, so the order and wording are as supplied.
    modules: [
      {
        title: "Month 1 — Data & Programming Foundations",
        points: [
          "Excel, Power BI & Data Literacy",
          "Advanced Excel, Power Query, Power BI, DAX, business dashboards, KPI reporting, AI productivity and data literacy.",
          "Python Fundamentals & Engineering Practices",
          "VS Code, uv package manager, virtual environments, Python fundamentals, OOP, exception handling, logging, type hints, pytest, Ruff and Black.",
          "Git, GitHub & AI Coding Tools",
          "Git, GitHub, Git Flow, GitHub Copilot, Cursor AI and Windsurf IDE.",
          "SQL, Database Design & APIs",
          "PostgreSQL, database design, SQL queries, window functions, query optimisation, APIs, JSON, FastAPI fundamentals, authentication, JWT and Postman.",
        ],
      },
      {
        title: "Month 2 — Data Engineering & Machine Learning",
        points: [
          "Data Engineering Fundamentals",
          "Pandas 2.x, NumPy, Polars, DuckDB and PyArrow.",
          "EDA, Visualisation & Statistics",
          "Data cleaning, feature engineering, exploratory data analysis, Plotly, Streamlit, statistics, probability, feature selection and preprocessing.",
          "Machine Learning Foundations",
          "Scikit-learn, preprocessing pipelines, model training, cross-validation and evaluation.",
          "Gradient Boosting & Model Optimisation",
          "XGBoost, LightGBM, CatBoost, hyperparameter tuning and model comparison.",
        ],
      },
      {
        title: "Month 3 — Deep Learning & Computer Vision",
        points: [
          "Deep Learning Fundamentals",
          "PyTorch, tensors, neural networks and model fundamentals.",
          "CNNs & Transfer Learning",
          "Convolutional neural networks, transfer learning and computer vision with OpenCV.",
          "Object Detection & OCR",
          "YOLO, object detection, OCR, image segmentation and Vision Transformers.",
          "Transformers & Hugging Face",
          "Transformers, tokenizers, Hugging Face ecosystem and Model Hub workflows.",
        ],
      },
      {
        title: "Month 4 — LLM Fundamentals & Vector Search",
        points: [
          "LLM Fundamentals",
          "Tokenization, embeddings, context windows and attention mechanisms.",
          "Prompt Engineering",
          "Prompt design, optimisation, system prompts and structured prompting.",
          "LLM APIs & Model Access",
          "OpenAI API, Gemini API, Claude API, Grok API, Ollama and LiteLLM.",
          "Embeddings & Vector Databases",
          "Embeddings, FAISS, ChromaDB, Pinecone, Qdrant, Milvus and semantic search.",
        ],
      },
      {
        title: "Month 5 — RAG, AI Agents & App Development",
        points: [
          "RAG Architecture",
          "Retrieval-Augmented Generation, hybrid search, re-ranking, evaluation and guardrails.",
          "LangChain, MCP & Tool Calling",
          "LangChain, LangGraph, prompt templates, chains, memory, CrewAI, Model Context Protocol, function calling and structured outputs.",
          "AI Agents & Multi-Agent Systems",
          "AI agents, multi-agent workflows, autonomous processes and enterprise-oriented agent design.",
          "AI Application Development",
          "Advanced FastAPI, async programming, background tasks, WebSockets, Streamlit, Gradio and Chainlit.",
        ],
      },
      {
        title: "Month 6 — Deployment & Industry Capstone",
        points: [
          "Containerisation & Cloud Deployment",
          "Docker, Docker Compose, Linux, Nginx, reverse proxy, AWS, Azure AI, Google Vertex AI and cloud deployment concepts.",
          "AI Security & CI/CD",
          "Prompt injection, jailbreak defence, secret management, responsible AI, GitHub Actions and CI/CD pipelines.",
          "Industry Capstone Build",
          "Develop an end-to-end AI application using FastAPI, PostgreSQL, RAG and AI agents.",
          "Capstone Delivery & Professional Standards",
          "Project documentation, code review, GitHub repository organisation, deployment practices and industry-oriented development standards.",
        ],
      },
    ],
    // The brief's own "Student Experience" block, kept where it belongs — the
    // work every stage leaves behind.
    practical: {
      title: "Build Something at Every Stage",
      body: "The strongest way to demonstrate technical learning is through completed work. Students can progressively move from a dashboard to a SQL service, a machine-learning pipeline, computer vision, a RAG assistant and an AI SaaS capstone. This gives your portfolio a clear story: you started with data fundamentals and gradually learned how to build complete AI-powered applications.",
    },
    outcome: {
      label: "Outcome",
      body: "The capstone runs the whole chain in one application — FastAPI and PostgreSQL behind RAG and AI agents, containerised, deployed and documented as a professional portfolio project.",
    },
  },

  tools: {
    title: "Tools You Will Work With",
    intro:
      "The programme introduces a modern technical toolkit used across data analysis, machine learning and AI development.",
    // The brief groups its tools under Data & Analytics, Programming &
    // Development, Machine Learning, Deep Learning & Vision, Generative AI,
    // RAG & Vector Search, AI Agents and Deployment; each line below names that
    // tool's own job, with its group kept in the wording.
    items: [
      { name: "Excel", body: "Data & analytics — the first reporting surface." },
      { name: "Power Query", body: "Data & analytics — repeatable cleaning and transformation." },
      { name: "Power BI", body: "Data & analytics — business dashboards and KPI reporting." },
      { name: "DAX", body: "Data & analytics — the measures behind those dashboards." },
      { name: "Pandas", body: "Data & analytics — DataFrames, cleaning and analysis." },
      { name: "NumPy", body: "Data & analytics — arrays and numeric work." },
      { name: "Polars", body: "Data & analytics — fast DataFrames for larger datasets." },
      { name: "DuckDB", body: "Data & analytics — analytical SQL straight over files." },
      { name: "PyArrow", body: "Data & analytics — the columnar format underneath." },
      { name: "Python", body: "Programming & development — the language the whole course runs on." },
      { name: "VS Code", body: "Programming & development — the editor and environment." },
      { name: "Git", body: "Programming & development — version control and Git Flow." },
      { name: "GitHub", body: "Programming & development — where the portfolio lives." },
      { name: "PostgreSQL", body: "Programming & development — the relational database." },
      { name: "FastAPI", body: "Programming & development — the API layer, basic through advanced." },
      { name: "Postman", body: "Programming & development — testing the APIs you build." },
      { name: "Scikit-learn", body: "Machine learning — pipelines, training and evaluation." },
      { name: "XGBoost", body: "Machine learning — gradient boosting." },
      { name: "LightGBM", body: "Machine learning — the fast boosting alternative." },
      { name: "CatBoost", body: "Machine learning — boosting with categorical features." },
      { name: "PyTorch", body: "Deep learning & vision — tensors, neural networks and CNNs." },
      { name: "OpenCV", body: "Deep learning & vision — image processing." },
      { name: "YOLO", body: "Deep learning & vision — object detection." },
      { name: "OCR", body: "Deep learning & vision — reading text out of images." },
      { name: "Hugging Face", body: "Deep learning & vision — Transformers, tokenizers and the Model Hub." },
      { name: "OpenAI", body: "Generative AI — the first LLM API you call." },
      { name: "Gemini", body: "Generative AI — a second provider to compare against." },
      { name: "Claude", body: "Generative AI — long-context reasoning work." },
      { name: "Grok", body: "Generative AI — a further model API." },
      { name: "Ollama", body: "Generative AI — running models locally." },
      { name: "LiteLLM", body: "Generative AI — one interface across providers." },
      { name: "FAISS", body: "RAG & vector search — local similarity search." },
      { name: "ChromaDB", body: "RAG & vector search — an embedded vector store." },
      { name: "Pinecone", body: "RAG & vector search — the hosted vector database." },
      { name: "Qdrant", body: "RAG & vector search — filtering alongside vector search." },
      { name: "Milvus", body: "RAG & vector search — vector search at scale." },
      { name: "LangChain", body: "RAG & vector search — chains, prompts and memory." },
      { name: "LangGraph", body: "RAG & vector search — stateful graph workflows." },
      { name: "CrewAI", body: "AI agents — multi-agent workflows." },
      { name: "MCP", body: "AI agents — Model Context Protocol for tools and resources." },
      { name: "Tool Calling", body: "AI agents — how a model reaches your functions." },
      { name: "Multi-Agent Workflows", body: "AI agents — autonomous, enterprise-oriented processes." },
      { name: "Docker", body: "Deployment — containerising the application." },
      { name: "Docker Compose", body: "Deployment — running the whole stack together." },
      { name: "Linux", body: "Deployment — the server the application runs on." },
      { name: "Nginx", body: "Deployment — reverse proxy in front of the app." },
      { name: "AWS", body: "Deployment — cloud hosting and services." },
      { name: "Azure AI", body: "Deployment — Microsoft's AI platform." },
      { name: "Google Vertex AI", body: "Deployment — Google's managed AI platform." },
      { name: "GitHub Actions", body: "Deployment — CI/CD pipelines." },
    ],
  },

  who: {
    title: "Who Can Join This Course?",
    items: [
      {
        title: "Students After 12th",
        body: "Students from different academic streams can begin with the fundamentals and gradually progress into Python, SQL, machine learning and AI.",
        icon: "users",
      },
      {
        title: "Students Pursuing a Degree",
        body: "Students studying BCA, B.Sc, BBA, B.Com or related programmes can use the course to add practical technology skills alongside their academic education.",
        icon: "certificate",
      },
      {
        title: "Commerce & Arts Students",
        body: "You do not need to begin as an advanced programmer. The curriculum introduces programming, statistics and machine learning progressively.",
        icon: "briefcase",
      },
      {
        title: "Students Looking for a Technical Skill",
        body: "If you want a structured technology programme after 12th instead of learning isolated tools from different sources, the six-month format provides a clear learning path.",
        icon: "target",
      },
      {
        title: "Career Switchers",
        body: "Learners from non-technical backgrounds can build their foundation step by step before moving into advanced AI application development.",
        icon: "refresh",
      },
      {
        title: "Self-Learners",
        body: "If you have learned Python or AI through online tutorials but struggled to complete projects, the project-based structure can help you turn individual lessons into finished portfolio work.",
        icon: "search",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Time",
    items: [
      {
        title: "Start With Employable Data Skills",
        body: "Excel, Power Query, Power BI, DAX and SQL provide a practical foundation for working with business data before you move into advanced AI.",
        icon: "chart",
      },
      {
        title: "Learn Python for Real Development",
        body: "Go beyond basic syntax with virtual environments, OOP, testing, logging, Git and development practices.",
        icon: "terminal",
      },
      {
        title: "Cover the Complete Machine Learning Journey",
        body: "Learn data preparation, EDA, feature engineering, model building, evaluation, cross-validation and boosting algorithms.",
        icon: "layers",
      },
      {
        title: "Move Into Modern AI",
        body: "Explore LLMs, embeddings, prompt engineering, vector databases, RAG and AI agents instead of stopping at traditional data science.",
        icon: "sparkles",
      },
      {
        title: "Learn to Build AI Applications",
        body: "FastAPI, Streamlit, Gradio, Chainlit, databases and API integrations help connect models to usable applications.",
        icon: "cube",
      },
      {
        title: "Understand Deployment & Security",
        body: "Docker, cloud platforms, CI/CD and AI security topics prepare you to think beyond a local notebook.",
        icon: "cloud",
      },
      {
        title: "Finish With a Major Capstone",
        body: "The final project brings multiple technologies together into one portfolio-ready application.",
        icon: "rocket",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Data Science Is Expanding Into AI Engineering",
    paragraphs: [
      "Modern data roles increasingly overlap with machine learning, automation and generative AI.",
      "A strong foundation therefore needs more than spreadsheets or isolated Python exercises. Students benefit from understanding the complete journey.",
      "This programme is designed around that progression so you can build knowledge in stages rather than trying to learn every advanced AI concept on day one.",
    ],
    // The brief writes that journey as a single arrow chain; each stage is set
    // out here with the month that covers it.
    listTitle: "The complete journey, stage by stage",
    items: [
      { title: "Data", body: "Month 1 — Excel, Power Query, Power BI and DAX." },
      { title: "Python", body: "Month 1 — fundamentals, OOP, testing, logging and type hints." },
      { title: "SQL", body: "Month 1 — PostgreSQL, window functions and query optimisation." },
      { title: "Machine Learning", body: "Month 2 — scikit-learn pipelines and gradient boosting." },
      { title: "Deep Learning", body: "Month 3 — PyTorch, CNNs, transfer learning and computer vision." },
      { title: "LLMs", body: "Month 4 — tokenization, embeddings, prompting and model APIs." },
      { title: "RAG", body: "Month 5 — retrieval, hybrid search, re-ranking and guardrails." },
      { title: "AI Agents", body: "Month 5 — LangGraph, CrewAI, MCP and multi-agent workflows." },
      { title: "Deployment", body: "Month 6 — Docker, cloud platforms, AI security and CI/CD." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with the techcadd team settles eligibility, batch timings, fees and where this leads — before you commit six months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Certification & Career Documentation",
    intro:
      "Students completing the programme can build a collection of project work and course documentation according to the current programme terms.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Documentation",
        body: "Documentation confirming successful completion of the training programme, subject to the institute's current certification policy.",
      },
      {
        icon: "layers",
        title: "Project Documentation",
        body: "Structured project records that explain the work completed during the programme.",
      },
      {
        icon: "chart",
        title: "Portfolio Projects",
        body: "A collection of dashboards, data projects, machine-learning work and AI applications that can be presented during interviews.",
      },
      {
        icon: "briefcase",
        title: "Placement Support",
        body: "Career-oriented assistance such as resume preparation, portfolio guidance, interview practice and information about relevant opportunities, subject to current placement-support policies.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Can Take You",
    intro:
      "The skills covered in the programme can support entry-level pathways across data, analytics, machine learning and AI development. Actual opportunities depend on your skills, portfolio, interview performance, experience and the requirements of individual employers.",
    listTitle: "Potential Job Roles",
    // The brief names the fourteen roles without describing them; each line
    // below names the work from the curriculum that role draws on.
    steps: [
      { title: "Data Analyst", body: "Clean, query and analyse business data, then report what it shows." },
      { title: "Junior Data Analyst", body: "Support a reporting team with SQL, Excel and dashboard work." },
      { title: "Business Intelligence Analyst", body: "Model data and build the Power BI reporting a business runs on." },
      { title: "Python Developer", body: "Write the Python behind data services, APIs and automation." },
      { title: "Junior Machine Learning Engineer", body: "Build and evaluate scikit-learn and boosting models." },
      { title: "Machine Learning Developer", body: "Take models from a notebook into a working pipeline." },
      { title: "Data Science Trainee", body: "Work across cleaning, EDA, statistics and modelling." },
      { title: "AI Developer", body: "Build applications around LLM APIs and AI services." },
      { title: "Generative AI Developer", body: "Work with prompting, structured outputs and model selection." },
      { title: "RAG Application Developer", body: "Build retrieval systems with embeddings, vector search and re-ranking." },
      { title: "AI Automation Developer", body: "Wire AI agents and tool calling into business workflows." },
      { title: "Junior AI Engineer", body: "Deploy and maintain AI services with Docker, cloud and CI/CD." },
      { title: "Data & AI Intern", body: "Enter a team on the strength of the projects you have documented." },
      { title: "Freelance Data/AI Developer", body: "Deliver dashboards, analysis and AI applications to your own clients." },
    ],
  },

  projects: {
    title: "Portfolio Projects",
    // Each project keeps the brief's own technologies line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Business KPI Dashboard",
        body: "Create a business reporting dashboard using Power BI, Power Query and DAX. Present important KPIs through a clean, interactive reporting interface. Technologies: Power BI · DAX · Power Query",
      },
      {
        title: "SQL Data Service With FastAPI",
        body: "Design a PostgreSQL database, write optimised queries and expose selected data through a FastAPI service with authentication. Technologies: PostgreSQL · FastAPI · JWT · Postman",
      },
      {
        title: "End-to-End Machine Learning Pipeline",
        body: "Take a raw dataset through cleaning, feature engineering, visual analysis and model development. Compare multiple algorithms and document the final evaluation. Technologies: Pandas · Polars · Scikit-learn · XGBoost",
      },
      {
        title: "Computer Vision Application",
        body: "Build a computer-vision solution using deep learning and image-processing techniques, with exposure to object detection and OCR. Technologies: PyTorch · OpenCV · YOLO",
      },
      {
        title: "RAG Assistant",
        body: "Create an AI assistant that can retrieve information from documents using embeddings and vector search before generating contextual responses. Technologies: LangChain · Vector Database · LLM APIs",
      },
      {
        title: "Industry-Style AI SaaS Capstone",
        body: "Develop a complete AI application combining backend APIs, PostgreSQL, RAG, AI agents, containerisation and deployment. Technologies: FastAPI · PostgreSQL · RAG · AI Agents · Docker · Cloud",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Present It.",
    paragraphs: ["Every major project follows a practical three-stage workflow."],
    items: [
      {
        title: "Understand",
        body: "Study the requirement, identify the problem and select an appropriate technology stack.",
        icon: "search",
      },
      {
        title: "Build",
        body: "Develop the project step by step with practical implementation and trainer feedback.",
        icon: "cube",
      },
      {
        title: "Present",
        body: "Explain your architecture, methodology, decisions and results so the project becomes something you can confidently discuss in an interview.",
        icon: "megaphone",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Choose techcadd for Data Science Training in Mohali?",
    // The brief writes no lead-in for this block; this states what its six
    // points have in common.
    intro:
      "A curriculum that builds in order, a project at every stage, and a stack that runs from a first spreadsheet to a deployed AI application.",
    items: [
      {
        title: "Structured Learning Path",
        body: "The curriculum progresses from beginner-level data concepts to advanced AI development rather than introducing complex tools without context.",
        icon: "layers",
      },
      {
        title: "Project-Focused Training",
        body: "Projects are integrated throughout the programme so learners have opportunities to apply concepts immediately.",
        icon: "cube",
      },
      {
        title: "Beginner-Friendly Foundation",
        body: "Students starting after 12th can first develop their programming and data fundamentals before moving into machine learning and AI.",
        icon: "target",
      },
      {
        title: "Modern Technology Stack",
        body: "The syllabus covers current technologies across Python, machine learning, deep learning, LLMs, RAG, AI agents, APIs, containers and cloud platforms.",
        icon: "sparkles",
      },
      {
        title: "Portfolio Development",
        body: "Instead of finishing with only notes, students work toward dashboards, machine-learning applications and AI projects that can be organised into a portfolio.",
        icon: "chart",
      },
      {
        title: "Career Preparation",
        body: "The programme can include resume, portfolio and interview preparation alongside technical learning and placement-support activities according to current institute policies.",
        icon: "rocket",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro:
      "Explore other career-focused programmes available across technology and digital skills.",
    items: [
      {
        title: "After 12th Data Analytics Program",
        body: "A practical route into Excel, SQL, Power BI, data visualisation and business analytics.",
        href: "/courses/after12th/data-analytics",
      },
      {
        title: "After 12th Artificial Intelligence Certificate Program",
        body: "Focus on artificial intelligence concepts, machine learning and applied AI development.",
        href: "/after-12th/artificial-intelligence-certificate-program",
      },
      {
        title: "After 12th MERN Stack Certificate Program",
        body: "Learn MongoDB, Express.js, React and Node.js through full-stack application development.",
        href: "/after-12th/mern-stack-certificate-program",
      },
      {
        title: "Digital Marketing Programs",
        body: "Build skills across SEO, paid advertising, social media, analytics, content and performance marketing.",
        href: "/courses/after12th/digital-marketing",
      },
      {
        title: "Data Science Certificate Program",
        body: "Learn the complete path from data analysis and Python to machine learning, generative AI and deployment.",
        href: "/courses/course/data-science",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the Data Science Certificate Program in Mohali?",
      a: "The programme is structured as a six-month learning path covering data analysis, Python, SQL, machine learning, deep learning, LLMs, RAG, AI agents and deployment. Current class schedules, batch timings and total instructional hours should be confirmed with the Mohali centre.",
    },
    {
      q: "Can I join after 12th without coding experience?",
      a: "Yes. The curriculum begins with foundational data and Python concepts and progressively introduces programming, SQL and machine learning.",
    },
    {
      q: "Does my 12th stream matter?",
      a: "Students from different streams can explore the programme. The course introduces programming and the required statistics progressively rather than assuming advanced technical knowledge.",
    },
    {
      q: "Is this course only about traditional Data Science?",
      a: "No. Along with classical data science, the curriculum includes deep learning, LLMs, vector databases, RAG, AI agents and AI application deployment.",
    },
    {
      q: "Which AI technologies are covered?",
      a: "The curriculum includes LLM APIs, Ollama, LiteLLM, embeddings, vector databases, LangChain, LangGraph, CrewAI, MCP and several AI application frameworks.",
    },
    {
      q: "How many projects will I complete?",
      a: "The programme is structured around multiple practical builds, including dashboards, SQL/API applications, machine-learning pipelines, computer vision, RAG and an end-to-end capstone.",
    },
    {
      q: "What is the final capstone?",
      a: "The capstone brings together technologies learned throughout the programme into an AI application using components such as FastAPI, PostgreSQL, RAG, AI agents, Docker and cloud deployment.",
    },
    {
      q: "Do I need advanced mathematics?",
      a: "You do not need to enter the programme as a mathematics expert. Statistics and probability are introduced as part of the data and machine-learning modules.",
    },
    {
      q: "Can I freelance after completing the course?",
      a: "The skills can support freelance opportunities involving dashboards, data analysis, Python development, automation and AI applications. Finding clients and earning income depends on your portfolio, communication, technical ability and market demand.",
    },
    {
      q: "Is placement guaranteed?",
      a: "No training programme should be treated as a guaranteed job placement. Placement support can include career guidance, resume preparation, interview preparation and relevant opportunity sharing according to the current institute policy.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Course completion and project documentation depend on the current programme terms. Confirm the exact certificate structure and eligibility requirements with the Mohali centre before enrolment.",
    },
    {
      q: "Can I attend evening or weekend classes?",
      a: "Batch availability can change. Contact the Mohali centre for the current weekday, evening, weekend and 1-on-1 options.",
    },
    {
      q: "What is the fee for the six-month programme?",
      a: "Fees, instalment plans and available offers can change by batch. Contact the Mohali counselling team for the current fee structure.",
    },
  ],

  enquiry: {
    title: "Ask About Data Science Certificate Program in Mohali",
    // The contact details the brief supplies are the centre's own; the page
    // already renders them from `@/lib/site`, so only the wording is carried
    // here rather than a second copy of the number.
    paragraphs: [
      "Have questions about the syllabus, batch timings, fees, projects or eligibility?",
      "Speak with the course counselling team to understand whether this six-month Data Science programme matches your academic background and career goals.",
      "Location: Mohali, Punjab. Counselling hours: Monday to Saturday, 9:00 AM to 7:00 PM.",
    ],
  },

  fit: {
    title: "Not Sure If Data Science Is the Right Choice After 12th?",
    paragraphs: [
      "A counselling session can help you understand the difference between Data Science, Data Analytics, Artificial Intelligence and other technology tracks.",
      "Explore the curriculum, ask about the current Mohali batch and choose a learning path based on your interests and career plans.",
    ],
    ctaTitle: "Get Started Today",
    // The brief names no list here; these are its own highlights, the facts a
    // reader still deciding is weighing.
    points: [
      "6 months, 12th pass, classroom and 1-on-1",
      "Excel, Power BI, DAX and SQL before any machine learning",
      "Python taught as engineering — OOP, testing, logging and Git",
      "scikit-learn, XGBoost, LightGBM, CatBoost and PyTorch",
      "LLMs, embeddings, vector databases, RAG and AI agents",
      "Docker, AWS, Azure AI, Vertex AI, AI security and CI/CD",
      "6 portfolio projects closing on an AI SaaS capstone",
    ],
  },
};

const cyberSecurityCertificate: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Future scope" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "Best After 12th 6-Month Cyber Security Certificate Program in Mohali",
    paragraphs: [
      "Build practical cybersecurity skills in six months — starting with computer systems, Linux and networking, then progressing into ethical hacking, web security, SOC operations, SIEM, cloud security, digital forensics, malware analysis, DevSecOps and AI-powered security automation.",
    ],
  },

  program: {
    title: "Cyber Security Certificate Program in Mohali",
    paragraphs: [
      "The After 12th 6-Month Cyber Security Certificate Program in Mohali is designed for students and beginners who want to understand how modern systems are protected, monitored and investigated.",
      "The programme takes you from foundational concepts to hands-on security labs. You will work with Linux, networking environments, vulnerability-testing tools, web security platforms, SIEM solutions, cloud services, Python automation and AI APIs.",
      "The final stage focuses on building a documented cybersecurity capstone that can become a strong addition to your technical portfolio.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "6 Months" },
      { label: "Mode", value: "Classroom & practical training" },
      { label: "Eligibility", value: "12th Pass" },
      { label: "Learning Style", value: "Hands-on labs, assignments & projects" },
      { label: "Focus", value: "Cybersecurity + Cloud + AI Security" },
      { label: "Includes", value: "Career and placement preparation" },
    ],
  },

  // The brief walks the six months in prose before it lists the syllabus; those
  // month blocks are kept here as written, and the curriculum below carries the
  // module lists.
  overview: {
    title: "Course Overview",
    paragraphs: [
      "This six-month programme follows a progressive path so that beginners do not have to jump directly into advanced security tools.",
      "Month 1 — Cybersecurity Foundations & Networking. The first month establishes the technical base required for cybersecurity. You will learn computer fundamentals, operating systems, Windows and Linux administration, networking concepts, virtualisation and basic security principles.",
      "The networking portion covers the OSI and TCP/IP models, IP addressing, subnetting, routing, switching, DNS, DHCP, NAT and VPN concepts. You will also create virtual environments using VMware or VirtualBox and work with Kali Linux and Windows Server. Git, GitHub and introductory AI tools are also introduced to help you document work and explore AI-assisted cybersecurity workflows.",
      "Month 2 — Ethical Hacking & Web Security. The second month introduces authorised security testing and web application security. You will explore OSINT, information gathering, DNS and subdomain enumeration, WHOIS and search-based reconnaissance. Practical security tools include Nmap, Wireshark, Nikto, Gobuster and Nuclei.",
      "Web security training covers HTTP, HTTPS, cookies, sessions and APIs before moving into OWASP Top 10 vulnerabilities such as SQL injection, XSS, CSRF, insecure file uploads and authentication weaknesses. Burp Suite is used for understanding and testing web applications in controlled environments. AI-assisted research, vulnerability analysis and report preparation are also introduced.",
      "Month 3 — Advanced Ethical Hacking & SOC Operations. Month three moves towards offensive security techniques and defensive security operations. Topics include Metasploit, Hydra, password security, wireless security, Windows security, Active Directory, Group Policy and privilege-escalation fundamentals.",
      "You will then move into SOC operations, blue-team workflows and incident handling. SIEM platforms such as Wazuh, Splunk and the ELK Stack are used to understand log collection, monitoring and investigation. Threat hunting introduces MITRE ATT&CK, indicators of compromise, threat intelligence and detection engineering. AI can be applied to log analysis, alert classification and security investigation workflows.",
      "Month 4 — Cloud Security & Security Automation. Modern security professionals increasingly need to understand cloud infrastructure. This module covers security concepts across AWS and Azure, including IAM, EC2, S3, CloudTrail, security groups, Azure IAM and cloud security monitoring.",
      "You will also explore Docker and Kubernetes security, CI/CD security, SAST, DAST and secrets management. Python is introduced for security automation, including scripts for log processing, API interaction and repetitive security tasks. OpenAI and Gemini APIs can be used to develop security-focused assistants and automation workflows.",
      "Month 5 — Digital Forensics, Malware Analysis & Incident Response. The fifth month focuses on what happens after a security incident occurs. You will study evidence collection, chain of custody, memory analysis and disk analysis. Malware analysis introduces static analysis, dynamic analysis, sandboxing and indicators of compromise.",
      "The incident-response process covers detection, containment, eradication, recovery and lessons learned. Threat intelligence concepts include IOCs, TTPs, STIX, TAXII and threat feeds. AI applications in malware analysis, incident response and threat intelligence are also explored.",
      "Month 6 — Capstone Project & Career Preparation. The final month brings the previous modules together. You will select and develop an AI-enabled cybersecurity project such as an AI SOC platform, threat-hunting system, vulnerability-management application, security automation tool or AI security assistant.",
      "The project includes architecture planning, technical documentation, a user guide, GitHub documentation and deployment considerations. Career preparation covers ATS-friendly resumes, LinkedIn optimisation, GitHub presentation, technical interview questions and mock interviews.",
      "Practical cybersecurity activities should always be performed in your own lab, authorised training environments or intentionally vulnerable platforms such as DVWA and OWASP Juice Shop.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    intro:
      "The programme is designed around practical outcomes rather than only theoretical cybersecurity terminology.",
    items: [
      {
        title: "Build Your Own Security Lab",
        body: "Set up a controlled virtual environment using VMware or VirtualBox with Linux and Windows systems for cybersecurity practice.",
      },
      {
        title: "Test Web Applications Safely",
        body: "Understand reconnaissance, vulnerability discovery and common OWASP web security weaknesses using controlled applications.",
      },
      {
        title: "Operate a SIEM Environment",
        body: "Work with Wazuh, Splunk and ELK-based workflows to understand logs, alerts, security monitoring and threat investigation.",
      },
      {
        title: "Investigate Security Incidents",
        body: "Learn the fundamentals of evidence handling, malware investigation, digital forensics and incident-response procedures.",
      },
      {
        title: "Secure Cloud Infrastructure",
        body: "Understand identity, permissions, monitoring, storage and infrastructure-security concepts across AWS and Azure.",
      },
      {
        title: "Build an AI Security Project",
        body: "Use Python and AI APIs to create a security-focused application or automation solution and turn it into a documented capstone project.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The six-month curriculum combines cybersecurity fundamentals, offensive security, defensive operations, cloud protection, forensics and AI.",
    // Each month keeps the brief's own grouping headings, topic order and mini
    // project lines in place, so the wording is as supplied.
    modules: [
      {
        title: "Month 1 — Cybersecurity Foundations & Networking",
        points: [
          "Cybersecurity Fundamentals",
          "Introduction to cybersecurity",
          "CIA triad",
          "Common cyber attacks",
          "Security domains",
          "Threat landscape",
          "Cybersecurity career paths",
          "Computer Fundamentals",
          "Computer hardware",
          "Operating systems",
          "Windows administration",
          "Linux administration",
          "File systems",
          "Users and permissions",
          "Networking Fundamentals",
          "OSI model",
          "TCP/IP model",
          "IP addressing",
          "Subnetting",
          "Routing",
          "Switching",
          "DNS",
          "DHCP",
          "NAT",
          "VPN",
          "Virtualisation",
          "VMware",
          "VirtualBox",
          "Kali Linux installation",
          "Windows Server installation",
          "Git & GitHub",
          "Git fundamentals",
          "Repositories",
          "Branching",
          "Version control",
          "GitHub workflow",
          "AI for Cybersecurity",
          "ChatGPT",
          "Gemini",
          "GitHub Copilot",
          "Prompt engineering",
          "AI-assisted research",
          "Mini Projects: Home cybersecurity lab · Secure Linux setup · Network documentation · Password policy implementation",
        ],
      },
      {
        title: "Month 2 — Ethical Hacking & Web Security",
        points: [
          "Information Gathering",
          "OSINT",
          "Search-based reconnaissance",
          "WHOIS",
          "DNS enumeration",
          "Subdomain enumeration",
          "Vulnerability Assessment",
          "Nmap",
          "Wireshark",
          "Nikto",
          "Gobuster",
          "Nuclei",
          "Web Technologies",
          "HTTP",
          "HTTPS",
          "Cookies",
          "Sessions",
          "APIs",
          "Web Application Security",
          "OWASP Top 10",
          "SQL injection",
          "XSS",
          "CSRF",
          "File-upload vulnerabilities",
          "Authentication weaknesses",
          "Burp Suite",
          "Proxy",
          "Repeater",
          "Intruder",
          "Decoder",
          "Comparer",
          "AI-Assisted Security Work",
          "AI-assisted reconnaissance",
          "Vulnerability analysis",
          "Security report generation",
          "Research assistance",
          "Mini Projects: DVWA assessment · OWASP Juice Shop assessment · Vulnerability assessment report",
        ],
      },
      {
        title: "Month 3 — Advanced Ethical Hacking & SOC",
        points: [
          "Security Testing",
          "Metasploit",
          "Hydra",
          "Password security",
          "Wireless security",
          "Windows Security",
          "Active Directory",
          "Group Policy",
          "Privilege escalation fundamentals",
          "SOC Fundamentals",
          "SOC structure",
          "Blue-team operations",
          "Security monitoring",
          "Incident lifecycle",
          "SIEM",
          "Wazuh",
          "Splunk",
          "ELK Stack",
          "Log collection",
          "Log analysis",
          "Threat Hunting",
          "MITRE ATT&CK",
          "Indicators of compromise",
          "Threat intelligence",
          "Detection engineering",
          "AI-Powered SOC",
          "AI-assisted threat detection",
          "AI log analysis",
          "Alert classification",
          "Investigation assistance",
          "Mini Projects: Wazuh deployment · AI-assisted log analyser · Threat-hunting report",
        ],
      },
      {
        title: "Month 4 — Cloud Security & Security Automation",
        points: [
          "AWS Security",
          "IAM",
          "EC2 security",
          "S3 security",
          "CloudTrail",
          "Security groups",
          "Azure Security",
          "Azure IAM",
          "Microsoft Defender security concepts",
          "Cloud security monitoring",
          "Container Security",
          "Docker security",
          "Kubernetes security",
          "DevSecOps",
          "CI/CD security",
          "SAST",
          "DAST",
          "Secrets management",
          "Python Security Automation",
          "Python fundamentals",
          "Automation scripts",
          "Log parsing",
          "API automation",
          "AI Automation",
          "OpenAI API",
          "Gemini API",
          "AI security assistant",
          "AI security chatbot",
          "Mini Projects: AI security assistant · Automated security-scanning workflow · Cloud security assessment",
        ],
      },
      {
        title: "Month 5 — Digital Forensics, Malware Analysis & Incident Response",
        points: [
          "Digital Forensics",
          "Evidence collection",
          "Chain of custody",
          "Memory analysis",
          "Disk analysis",
          "Malware Analysis",
          "Static analysis",
          "Dynamic analysis",
          "Sandboxing",
          "Indicators of compromise",
          "Incident Response",
          "Detection",
          "Containment",
          "Eradication",
          "Recovery",
          "Lessons learned",
          "Threat Intelligence",
          "IOC",
          "TTPs",
          "STIX",
          "TAXII",
          "Threat feeds",
          "AI in DFIR",
          "AI-assisted malware analysis",
          "AI incident-response workflows",
          "AI threat intelligence",
          "Project Options: AI malware detection concept · AI phishing detection system · AI incident-response platform · AI threat-intelligence dashboard · AI SOC dashboard",
        ],
      },
      {
        title: "Month 6 — Capstone Project & Placement Preparation",
        points: [
          "Capstone Development",
          "AI SOC platform",
          "AI threat-hunting platform",
          "Vulnerability-management solution",
          "Security automation platform",
          "AI security chatbot",
          "Project Documentation",
          "Architecture",
          "Technical documentation",
          "User manual",
          "GitHub repository",
          "Project presentation",
          "Deployment",
          "Cloud deployment concepts",
          "Docker deployment",
          "Security hardening",
          "Career Portfolio",
          "ATS resume",
          "LinkedIn optimisation",
          "GitHub profile",
          "Project portfolio",
          "Interview Preparation",
          "Networking questions",
          "Linux questions",
          "Cybersecurity fundamentals",
          "Ethical hacking",
          "SOC and SIEM",
          "Cloud security",
          "AI security",
          "Mock Interviews: Technical round · HR round · Practical assessment",
        ],
      },
    ],
    // The brief's own "Student Experience" block, kept where it belongs — the
    // work every month leaves behind.
    practical: {
      title: "Learn Through Practice, Projects & Review",
      body: "The programme is designed around practical exercises rather than memorising cybersecurity definitions. Learners can progressively build a virtual cybersecurity lab, networking documentation, web-security assessments, vulnerability reports, SIEM deployments, threat-hunting reports, cloud-security exercises, Python automation scripts, AI-powered security applications and a final cybersecurity capstone.",
    },
    outcome: {
      label: "Outcome",
      body: "The capstone brings the six months together in one documented build — an AI SOC platform, threat-hunting system, vulnerability-management application, security automation tool or AI security assistant, with its architecture, user guide, GitHub repository and deployment written up.",
    },
  },

  tools: {
    title: "Tools and Platforms You Can Explore",
    intro:
      "The curriculum introduces a broad cybersecurity toolkit across networking, offensive security, defensive operations, cloud and AI.",
    // The brief groups its tools under Networking & Security Testing, Operating
    // Systems & Virtualisation, SOC & SIEM, Cloud & DevSecOps, Programming & AI
    // and Practice Platforms; each line below names that tool's own job, with
    // its group kept in the wording.
    items: [
      { name: "Nmap", body: "Networking & security testing — host discovery and port scanning." },
      { name: "Wireshark", body: "Networking & security testing — reading traffic packet by packet." },
      { name: "Nikto", body: "Networking & security testing — web server scanning." },
      { name: "Gobuster", body: "Networking & security testing — directory and subdomain discovery." },
      { name: "Nuclei", body: "Networking & security testing — template-driven vulnerability scanning." },
      { name: "Burp Suite", body: "Networking & security testing — proxy, repeater and intruder." },
      { name: "Metasploit", body: "Networking & security testing — authorised exploitation practice." },
      { name: "Hydra", body: "Networking & security testing — password security testing." },
      { name: "Linux", body: "Operating systems & virtualisation — the platform security runs on." },
      { name: "Kali Linux", body: "Operating systems & virtualisation — the testing distribution." },
      { name: "Windows Server", body: "Operating systems & virtualisation — Active Directory and Group Policy." },
      { name: "VMware", body: "Operating systems & virtualisation — building the lab." },
      { name: "VirtualBox", body: "Operating systems & virtualisation — the free alternative hypervisor." },
      { name: "Wazuh", body: "SOC & SIEM — the SIEM you deploy yourself." },
      { name: "Splunk", body: "SOC & SIEM — enterprise log search and investigation." },
      { name: "ELK Stack", body: "SOC & SIEM — Elasticsearch, Logstash and Kibana workflows." },
      { name: "MITRE ATT&CK", body: "SOC & SIEM — the framework threat hunting maps to." },
      { name: "AWS", body: "Cloud & DevSecOps — IAM, EC2, S3, CloudTrail and security groups." },
      { name: "Azure", body: "Cloud & DevSecOps — Azure IAM and cloud security monitoring." },
      { name: "Docker", body: "Cloud & DevSecOps — container security." },
      { name: "Kubernetes", body: "Cloud & DevSecOps — orchestration security." },
      { name: "CI/CD", body: "Cloud & DevSecOps — securing the delivery pipeline." },
      { name: "SAST", body: "Cloud & DevSecOps — static application security testing." },
      { name: "DAST", body: "Cloud & DevSecOps — dynamic application security testing." },
      { name: "Python", body: "Programming & AI — automation, log parsing and API scripts." },
      { name: "OpenAI APIs", body: "Programming & AI — the security assistant you build." },
      { name: "Gemini APIs", body: "Programming & AI — a second provider for AI automation." },
      { name: "ChatGPT", body: "Programming & AI — research and analysis assistance." },
      { name: "GitHub Copilot", body: "Programming & AI — code assistance for security scripts." },
      { name: "Git", body: "Programming & AI — version control for your project work." },
      { name: "GitHub", body: "Programming & AI — where the capstone is documented." },
      { name: "DVWA", body: "Practice platforms — intentionally vulnerable web application." },
      { name: "OWASP Juice Shop", body: "Practice platforms — a modern vulnerable application." },
      { name: "TryHackMe", body: "Practice platforms — guided security rooms." },
      { name: "Hack The Box", body: "Practice platforms — hands-on challenge machines." },
      { name: "PortSwigger Web Security Academy", body: "Practice platforms — web security labs." },
      { name: "OverTheWire", body: "Practice platforms — Linux and security wargames." },
    ],
  },

  who: {
    title: "Who Can Do This Course?",
    items: [
      {
        title: "Students After 12th",
        body: "Students from different academic streams can begin with the fundamentals and gradually develop cybersecurity knowledge without assuming advanced programming skills.",
        icon: "users",
      },
      {
        title: "BCA, B.Sc IT & Computer Students",
        body: "The programme can complement academic learning with practical networking, Linux, security testing, SOC and cloud-security projects.",
        icon: "certificate",
      },
      {
        title: "Students Exploring Cybersecurity Careers",
        body: "If you are considering SOC, security testing, cloud security, digital forensics or security automation, this programme provides exposure to multiple areas before choosing a specialisation.",
        icon: "search",
      },
      {
        title: "Beginners Interested in Ethical Hacking",
        body: "You can learn ethical hacking concepts through authorised labs and intentionally vulnerable applications while also understanding the defensive side of security.",
        icon: "shield",
      },
      {
        title: "IT Support & Networking Learners",
        body: "Learners with basic computer, networking or system-administration knowledge can use the programme to expand into security-focused roles.",
        icon: "terminal",
      },
      {
        title: "Career Switchers & Self-Learners",
        body: "If you have studied cybersecurity independently but want a structured curriculum, projects and interview preparation, the six-month format provides a guided learning path.",
        icon: "refresh",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Your Time",
    items: [
      {
        title: "Strong Technical Foundations",
        body: "Learn Linux, Windows, networking, virtualisation and cybersecurity fundamentals before moving into advanced security tools.",
        icon: "layers",
      },
      {
        title: "Offensive & Defensive Security",
        body: "Understand both sides of cybersecurity — vulnerability discovery as well as monitoring, detection and incident response.",
        icon: "shield",
      },
      {
        title: "Practical SOC Exposure",
        body: "Work through SIEM concepts, log analysis, threat hunting, MITRE ATT&CK and security operations.",
        icon: "monitor",
      },
      {
        title: "Cloud Security Skills",
        body: "Explore AWS and Azure security concepts alongside containers and DevSecOps practices.",
        icon: "cloud",
      },
      {
        title: "Digital Forensics & Incident Response",
        body: "Develop an understanding of how security teams collect evidence, analyse incidents and respond to threats.",
        icon: "search",
      },
      {
        title: "AI-Powered Security",
        body: "Explore how Python and generative AI APIs can support security research, analysis, automation and security applications.",
        icon: "sparkles",
      },
      {
        title: "Portfolio-Based Learning",
        body: "Use projects and the final capstone to demonstrate what you can actually build and investigate.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Build Skills Across the Modern Security Stack",
    paragraphs: [
      "Cybersecurity is no longer limited to antivirus software or basic network protection. Organisations increasingly need people who understand applications, cloud environments, identities, logs, incidents, automation and AI.",
      "The goal is to give beginners a broader understanding of modern security workflows while developing practical project experience.",
    ],
    // The brief writes the progression as a single arrow chain; each stage is
    // set out here with the month that covers it.
    listTitle: "The progression this programme follows",
    items: [
      { title: "Computer Fundamentals", body: "Month 1 — hardware, operating systems and permissions." },
      { title: "Linux", body: "Month 1 — administration, file systems and a secure setup." },
      { title: "Networking", body: "Month 1 — OSI, TCP/IP, subnetting, DNS, NAT and VPN." },
      { title: "Ethical Hacking", body: "Month 2 — OSINT, enumeration, Nmap, Nuclei and Metasploit." },
      { title: "Web Security", body: "Month 2 — OWASP Top 10 and Burp Suite on controlled targets." },
      { title: "SOC", body: "Month 3 — blue-team operations and the incident lifecycle." },
      { title: "SIEM", body: "Month 3 — Wazuh, Splunk, ELK and threat hunting." },
      { title: "Cloud Security", body: "Month 4 — AWS and Azure identity, storage and monitoring." },
      { title: "DevSecOps", body: "Month 4 — container security, CI/CD, SAST, DAST and secrets." },
      { title: "Forensics", body: "Month 5 — evidence handling, memory and disk analysis." },
      { title: "Malware Analysis", body: "Month 5 — static, dynamic and sandboxed analysis." },
      { title: "AI Security", body: "Months 4 to 6 — Python and AI APIs across the security workflow." },
      { title: "Capstone", body: "Month 6 — one documented, deployed security project." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with the techcadd team settles eligibility, batch timings, fees and where this leads — before you commit six months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Complete the Programme With a Project-Based Portfolio",
    intro:
      "After completing the required training and project work, learners can receive the applicable course-completion documentation provided by the institute. Certificate titles, internship documentation and current placement-support terms should be confirmed with the Mohali centre before enrolment.",
    // The brief lists eight supporting career materials; they are grouped here
    // into the four cards this section renders, with every item kept.
    items: [
      {
        icon: "certificate",
        title: "Course Completion Documentation",
        body: "Documentation of successful completion of the applicable training programme.",
      },
      {
        icon: "layers",
        title: "Capstone Project Documentation",
        body: "Architecture, technical documentation and a user guide for the project you build.",
      },
      {
        icon: "cube",
        title: "GitHub Project Presentation",
        body: "Your repository organised and presented as portfolio work.",
      },
      {
        icon: "briefcase",
        title: "Career Preparation",
        body: "Resume preparation, LinkedIn profile optimisation, mock interviews, technical interview preparation and career guidance.",
      },
    ],
  },

  takesYou: {
    title: "Where Cybersecurity Skills Can Take You",
    intro:
      "The programme can help you explore entry-level and junior opportunities across security operations, testing, cloud, forensics and automation.",
    listTitle: "Roles this programme prepares you for",
    steps: [
      {
        title: "Cybersecurity Analyst",
        body: "Monitor security events, investigate alerts and support incident-response processes.",
      },
      {
        title: "SOC Analyst",
        body: "Work with security monitoring and SIEM systems to identify suspicious activity.",
      },
      {
        title: "Security Testing Trainee",
        body: "Assist with authorised vulnerability assessments and web-security testing.",
      },
      {
        title: "Network Security Trainee",
        body: "Apply networking knowledge to security monitoring and infrastructure protection.",
      },
      {
        title: "Cloud Security Trainee",
        body: "Work with cloud identity, permissions, monitoring and security controls.",
      },
      {
        title: "Incident Response Trainee",
        body: "Support the investigation and documentation of security incidents.",
      },
      {
        title: "Digital Forensics Trainee",
        body: "Assist with evidence collection and basic forensic investigation workflows.",
      },
      {
        title: "Security Automation Developer",
        body: "Use Python and APIs to automate repetitive security tasks.",
      },
      {
        title: "AI Security / GenAI Security Trainee",
        body: "Explore AI-assisted security analysis, automation and security-focused applications.",
      },
    ],
  },

  projects: {
    title: "Hands-On Projects You Can Build",
    // Each project keeps the brief's own skills line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Personal Cybersecurity Lab",
        body: "Create a controlled virtual environment with Kali Linux and Windows Server, document the network and implement basic security policies. Skills: Linux · Windows Server · VMware/VirtualBox",
      },
      {
        title: "DVWA & Juice Shop Security Assessment",
        body: "Perform authorised assessments of intentionally vulnerable web applications and document common security weaknesses. Skills: Burp Suite · OWASP · Web Security",
      },
      {
        title: "Vulnerability Assessment Report",
        body: "Use security-assessment tools to identify findings in a controlled environment and prepare a structured vulnerability report. Skills: Nmap · Nuclei · Wireshark · Reporting",
      },
      {
        title: "SIEM Deployment & Threat Hunting",
        body: "Set up a SIEM environment, collect logs and investigate security events using threat-hunting concepts. Skills: Wazuh · Splunk · ELK · MITRE ATT&CK",
      },
      {
        title: "AI Security Assistant",
        body: "Develop a Python-based security assistant that uses an AI API to support selected security-analysis or documentation workflows. Skills: Python · APIs · AI Automation",
      },
      {
        title: "AI-Powered Cybersecurity Capstone",
        body: "Build one complete project such as an AI SOC dashboard, AI threat-hunting assistant, security automation platform, vulnerability-management application, AI security chatbot or threat-intelligence dashboard. Document the architecture, implementation, usage and deployment process. Skills: Cybersecurity · Python · AI · APIs · GitHub · Deployment",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Present It.",
    paragraphs: ["Every project follows a simple learning cycle."],
    items: [
      {
        title: "Understand",
        body: "Start with the security problem, understand the environment and identify the appropriate tools.",
        icon: "search",
      },
      {
        title: "Build",
        body: "Work through the implementation in a controlled lab with guidance and practical exercises.",
        icon: "cube",
      },
      {
        title: "Explain",
        body: "Document what you discovered, why you selected particular techniques and how the solution works.",
        icon: "layers",
      },
      {
        title: "Present",
        body: "Turn the finished project into a portfolio piece that you can discuss during interviews.",
        icon: "megaphone",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Choose techcadd for Cybersecurity Training in Mohali?",
    // The brief writes no lead-in for this block; this states what its six
    // points have in common.
    intro:
      "A curriculum that builds in order, a lab behind every concept, and coverage that runs past ethical hacking into operations, cloud and forensics.",
    items: [
      {
        title: "Structured Learning Path",
        body: "The programme moves from computer and networking fundamentals into increasingly advanced cybersecurity areas.",
        icon: "layers",
      },
      {
        title: "Practical Lab Focus",
        body: "Security concepts become easier to understand when you configure systems, analyse logs and work through controlled security scenarios.",
        icon: "terminal",
      },
      {
        title: "Broad Cybersecurity Coverage",
        body: "Instead of focusing exclusively on ethical hacking, the curriculum also introduces SOC, SIEM, cloud security, DevSecOps, forensics and incident response.",
        icon: "shield",
      },
      {
        title: "AI-Enabled Curriculum",
        body: "The course includes AI tools and APIs to demonstrate how automation and generative AI can support modern security workflows.",
        icon: "sparkles",
      },
      {
        title: "Portfolio Development",
        body: "Mini projects and the final capstone give learners practical work to document and discuss.",
        icon: "cube",
      },
      {
        title: "Career Preparation",
        body: "Resume development, GitHub presentation, LinkedIn optimisation and mock interview preparation help learners prepare for entry-level opportunities.",
        icon: "rocket",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro:
      "Explore related technology programmes that can complement your cybersecurity learning.",
    items: [
      {
        title: "After 12th 3-Month Cyber Security Program",
        body: "A shorter introduction to cybersecurity fundamentals, ethical hacking and security concepts.",
        href: "/courses/after12th/cyber-security",
      },
      {
        title: "After 12th 9-Month Cyber Security Diploma Program",
        body: "A longer learning path for students seeking broader and deeper cybersecurity training.",
        href: "/after-12th/cyber-security-diploma-program",
      },
      {
        title: "After 12th 6-Month Cloud Computing Certificate Program",
        body: "Build knowledge of cloud infrastructure, AWS, Azure and deployment technologies.",
        href: "/after-12th/cloud-computing-certificate-program",
      },
      {
        title: "After 12th 6-Month MERN Stack Certificate Program",
        body: "Learn MongoDB, Express.js, React and Node.js for full-stack web development.",
        href: "/after-12th/mern-stack-certificate-program",
      },
      {
        title: "After 12th 6-Month Artificial Intelligence Certificate Program",
        body: "Explore Python, machine learning, AI development and modern generative-AI technologies.",
        href: "/after-12th/artificial-intelligence-certificate-program",
      },
      {
        title: "Cybersecurity Course",
        body: "A focused cybersecurity learning option for students and professionals looking to develop security skills.",
        href: "/courses/course/cyber-security",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the After 12th Cyber Security programme?",
      a: "The programme is structured as a six-month cybersecurity course covering foundations, ethical hacking, SOC, cloud security, forensics, AI security and a final capstone project.",
    },
    {
      q: "Can I join after 12th without coding experience?",
      a: "Yes. The curriculum starts with computer fundamentals, operating systems and networking before introducing Python and security automation.",
    },
    {
      q: "Is this course suitable for students from non-technical streams?",
      a: "Students from different streams can begin with the foundational modules. Basic computer familiarity can be helpful, but advanced programming knowledge is not assumed at the beginning.",
    },
    {
      q: "Is ethical hacking taught legally?",
      a: "Practical security testing should only be performed on systems where you have explicit permission or on authorised training platforms and intentionally vulnerable applications.",
    },
    {
      q: "What tools are covered?",
      a: "The curriculum introduces tools and platforms including Nmap, Wireshark, Burp Suite, Nuclei, Metasploit, Wazuh, Splunk, ELK Stack, AWS, Azure, Docker, Kubernetes, Python and AI APIs.",
    },
    {
      q: "Will I learn SOC and SIEM?",
      a: "Yes. The third month focuses on SOC operations, SIEM, log analysis, threat hunting, MITRE ATT&CK and defensive security workflows.",
    },
    {
      q: "Is digital forensics included?",
      a: "Yes. The fifth module introduces evidence collection, chain of custody, memory analysis, disk analysis, malware analysis and incident response.",
    },
    {
      q: "Do I need to learn Python before joining?",
      a: "No. Python is introduced as part of the programme, particularly for automation, scripting and API-based security projects.",
    },
    {
      q: "What projects will I build?",
      a: "Projects can include a cybersecurity lab, web-application assessments, vulnerability reports, SIEM deployment, threat-hunting exercises, AI security automation and a final cybersecurity capstone.",
    },
    {
      q: "What is the capstone project?",
      a: "The capstone is a larger cybersecurity project that combines multiple skills from the programme. Possible projects include an AI SOC platform, threat-hunting assistant, security automation system or AI security chatbot.",
    },
    {
      q: "Does the course guarantee placement?",
      a: "No training programme should be treated as a guaranteed job offer. Career support can include resume guidance, interview preparation, project presentation and placement assistance, subject to the institute's current terms.",
    },
    {
      q: "What is the fee?",
      a: "Fees can vary according to the current batch, training mode and available offers. Contact the Mohali team for the latest fee structure and payment options.",
    },
    {
      q: "Are evening or weekend batches available?",
      a: "Batch schedules can change. Contact the Mohali centre to confirm the latest weekday, evening and weekend options.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Eligible learners who successfully complete the applicable programme requirements can receive course-completion documentation. Confirm the current certificate format and terms with the Mohali centre before admission.",
    },
  ],

  enquiry: {
    title: "Ask About Cyber Security Certificate Program",
    // The contact details the brief supplies are the centre's own; the page
    // already renders them from `@/lib/site`, so only the wording is carried
    // here rather than a second copy of the number.
    paragraphs: [
      "Want to know whether cybersecurity is the right option after 12th?",
      "Speak with a course counsellor about the current syllabus, batch timings, practical training, fees, project work, certification and career-support options available in Mohali.",
      "Location: Mohali, Punjab. Counselling hours: Monday to Saturday, 9:00 AM to 7:00 PM.",
    ],
  },

  fit: {
    title: "Not Sure If Cybersecurity Is the Right Career Path?",
    paragraphs: [
      "You do not need to decide your specialisation before you begin.",
      "A counselling session or demo class can help you understand the learning path, practical lab environment, project structure and career options before enrolling.",
    ],
    ctaTitle: "Get Started Today",
    // The brief names no list here; these are its own highlights, the facts a
    // reader still deciding is weighing.
    points: [
      "6 months, 12th pass, classroom and practical training",
      "Linux, Windows, networking and virtualisation from the fundamentals",
      "Ethical hacking and the OWASP Top 10 on authorised targets only",
      "SOC, SIEM, threat hunting and MITRE ATT&CK",
      "AWS and Azure security, containers and DevSecOps",
      "Forensics, malware analysis and incident response",
      "6 projects closing on an AI-powered cybersecurity capstone",
    ],
  },
};

const artificialIntelligenceCertificate: After12Page = {
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
    title: "Best After 12th 6-Month Artificial Intelligence Program in Mohali",
    paragraphs: [
      "Turn your interest in AI into practical development skills with a six-month learning path covering Python, machine learning, deep learning, NLP, LLMs, prompt engineering, RAG, AI agents, multimodal applications and cloud deployment.",
      "Designed for students after 12th and aspiring AI developers, this programme combines technical foundations with hands-on projects so you can move from writing your first Python programs to developing and deploying AI-powered applications.",
    ],
  },

  program: {
    title: "Artificial Intelligence Certificate Program in Mohali",
    paragraphs: [
      "The After 12th 6-Month Artificial Intelligence Program in Mohali introduces learners to the technologies behind modern AI applications.",
      "You will begin with Python, statistics, machine learning and software-development practices. The programme then progresses through PyTorch, computer vision, NLP and Transformers before moving into LLM APIs, embeddings, vector databases, RAG architectures, AI agents and multimodal AI.",
      "The final phase focuses on FastAPI, Docker, cloud deployment, AI security and an end-to-end capstone project.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "6 Months" },
      { label: "Eligibility", value: "12th Pass, Any Stream" },
      { label: "Mode", value: "Practical + Theory" },
      { label: "Focus", value: "AI, ML, Deep Learning & Generative AI" },
      { label: "Projects", value: "Mini projects + final capstone" },
      { label: "Career Support", value: "Resume, portfolio & interview preparation" },
    ],
  },

  // The brief walks the six months in prose under its Course Overview heading;
  // those month blocks are kept here as written, and the curriculum below
  // carries the module lists.
  overview: {
    title: "Course Overview",
    paragraphs: [
      "This programme follows a structured progression from programming fundamentals to modern AI engineering.",
      "Instead of treating artificial intelligence as a single topic, the curriculum separates the major skills required to create useful AI applications.",
      "Month 1 — Python & AI/ML Foundations. The first month establishes your programming and data foundations.",
      "You will learn Python from the beginning, work with VS Code, create virtual environments and use Git and GitHub for version control. Development practices such as object-oriented programming, exception handling, logging, type hints and automated testing are introduced alongside APIs and JSON.",
      "The AI foundation includes NumPy, Pandas, statistics, probability, linear algebra and machine learning using scikit-learn. You will also understand model training, evaluation and cross-validation.",
      "Month 2 — Deep Learning & NLP. Once the fundamentals are established, the programme moves into neural networks and deep learning.",
      "You will work with PyTorch and learn tensor operations, neural networks, CNNs, transfer learning and computer-vision workflows using OpenCV.",
      "The NLP section introduces text processing, embeddings, sequence models and language understanding before moving into Transformers and the Hugging Face ecosystem.",
      "Month 3 — LLM Fundamentals & Prompt Engineering. The third month focuses on large language models.",
      "You will learn how tokenization, embeddings, context windows and attention contribute to the behaviour of LLM-based applications.",
      "Prompt engineering covers system prompts, structured prompting and prompt optimisation. You will work with multiple AI providers including OpenAI, Gemini, Claude and Grok, while Ollama introduces local-model workflows and LiteLLM provides an approach for working across different providers.",
      "Month 4 — RAG & AI Agents. This module moves from using AI models to building applications around them.",
      "You will learn embeddings, semantic search and vector databases such as FAISS, ChromaDB, Pinecone and Qdrant.",
      "RAG architecture is introduced with hybrid search, re-ranking, evaluation and guardrails. The agent-development section covers LangChain, LangGraph, CrewAI, MCP, tool calling, function calling, structured outputs, memory and multi-agent workflows.",
      "Month 5 — AI Application Development. The fifth month concentrates on turning AI components into usable applications.",
      "You will work with advanced FastAPI, asynchronous programming, background tasks and WebSockets. Application interfaces can be developed using Streamlit, Gradio and Chainlit.",
      "You will also explore conversational AI, chatbot architecture, dialogue management and multimodal applications involving text, images, audio and video.",
      "Whisper, vision-language models and speech-AI concepts are included to demonstrate how AI applications can work beyond text.",
      "Month 6 — Deployment, Security & Capstone. The final month connects development with deployment.",
      "You will learn Docker, Docker Compose, Linux and Nginx before exploring deployment concepts across AWS, Azure AI and Google Vertex AI.",
      "AI-security topics include prompt injection, jailbreak defence, secret management and responsible AI.",
      "The programme concludes with an end-to-end capstone combining technologies such as LLMs, RAG, agents, APIs, Docker and cloud deployment.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    // The brief numbers its seven outcomes but writes no lead-in; this states
    // the arc they actually follow.
    intro:
      "Seven outcomes across the six months — from a first Python program through to a deployed, documented AI capstone.",
    items: [
      {
        title: "Build AI Models With Python & PyTorch",
        body: "Start with Python and progress towards machine-learning and deep-learning workflows using scikit-learn and PyTorch.",
      },
      {
        title: "Understand NLP & Transformers",
        body: "Learn how computers process language and how Transformer-based architectures support modern language applications.",
      },
      {
        title: "Work With Large Language Models",
        body: "Understand tokens, embeddings, context windows and attention while experimenting with multiple model providers.",
      },
      {
        title: "Create RAG Applications",
        body: "Connect language models with external knowledge using embeddings, vector databases, retrieval and evaluation techniques.",
      },
      {
        title: "Develop AI Agents",
        body: "Build systems capable of using tools and following multi-step workflows with LangChain, LangGraph, CrewAI and related technologies.",
      },
      {
        title: "Deploy AI Applications",
        body: "Move beyond notebooks and prototypes by learning APIs, Docker, cloud deployment, application interfaces and basic AI security.",
      },
      {
        title: "Complete an AI Capstone",
        body: "Combine the skills from the programme into a complete AI application that can be documented and presented as part of your portfolio.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The six-month curriculum moves through programming, machine learning, deep learning, LLMs, RAG, agents, application development and deployment.",
    // Each month keeps the brief's own grouping headings and topic order in
    // place. The brief also writes out month one a second time in more detail;
    // that block follows Month 1 here under its own heading, as supplied.
    modules: [
      {
        title: "Month 1 — Python & AI/ML Foundations",
        points: [
          "Python & Development",
          "Python fundamentals",
          "VS Code",
          "uv package manager",
          "Virtual environments",
          "Git",
          "GitHub",
          "Object-oriented programming",
          "Exception handling",
          "Logging",
          "Type hints",
          "pytest",
          "APIs",
          "JSON",
          "Data & Mathematics",
          "NumPy",
          "Pandas",
          "Statistics",
          "Probability",
          "Linear algebra fundamentals",
          "Machine Learning",
          "scikit-learn",
          "Model training",
          "Model evaluation",
          "Cross-validation",
          "Basic machine-learning workflows",
          "AI Development Tools",
          "ChatGPT",
          "GitHub Copilot",
          "AI-assisted coding",
          "Development workflows",
        ],
      },
      {
        title: "Month 1 — Detailed Learning Path",
        points: [
          "Python & AI/ML Foundations, step by step.",
          "Python Fundamentals — learn variables, data types, operators, conditions, loops, functions and core Python programming concepts.",
          "VS Code — set up a professional development environment and organise AI projects effectively.",
          "Package Management & Environments — use uv and virtual environments to manage Python projects and dependencies.",
          "Git & GitHub — learn version control, repositories, commits, branches and collaborative development workflows.",
          "AI-Assisted Development — explore ChatGPT and GitHub Copilot for coding assistance, research and productivity.",
          "Object-Oriented Programming — understand classes, objects, inheritance, encapsulation and reusable application structures.",
          "Error Handling & Logging — learn how to handle exceptions and create useful application logs.",
          "Type Hints — use Python type annotations to make code easier to understand and maintain.",
          "Automated Testing — use pytest to create and run tests for Python applications.",
          "APIs & JSON — understand API communication, requests, responses and JSON data structures.",
          "FastAPI Basics — create simple API endpoints and understand how AI backends communicate with applications.",
          "NumPy — work with arrays, numerical operations and data structures used in machine learning.",
          "Pandas — load, inspect, transform and analyse tabular datasets.",
          "Statistics & Probability — learn the mathematical concepts commonly used to understand machine-learning results.",
          "Linear Algebra — understand vectors, matrices and other essential mathematical concepts for AI.",
          "Machine Learning With scikit-learn — build introductory machine-learning models and understand the standard ML workflow.",
          "Model Evaluation — learn training, validation, testing and cross-validation to evaluate model performance.",
        ],
      },
      {
        title: "Month 2 — Deep Learning & NLP",
        points: [
          "Deep Learning",
          "Deep-learning fundamentals",
          "PyTorch",
          "Tensor operations",
          "Neural networks",
          "CNNs",
          "Transfer learning",
          "Computer Vision",
          "Computer-vision fundamentals",
          "OpenCV",
          "Image-processing workflows",
          "Model-based vision applications",
          "Natural Language Processing",
          "Text processing",
          "Word embeddings",
          "Sequence models",
          "Language understanding",
          "Transformers",
          "Transformer fundamentals",
          "Hugging Face",
          "Tokenizers",
          "Model Hub",
        ],
      },
      {
        title: "Month 3 — LLM Fundamentals & Prompt Engineering",
        points: [
          "LLM Fundamentals",
          "Large language models",
          "Tokenization",
          "Embeddings",
          "Context windows",
          "Attention mechanism",
          "Prompt Engineering",
          "Prompt design",
          "Prompt optimisation",
          "System prompts",
          "Structured prompting",
          "Prompt evaluation",
          "Model APIs",
          "OpenAI API",
          "Gemini API",
          "Claude API",
          "Grok API",
          "Local & Multi-Provider AI",
          "Ollama",
          "Local model workflows",
          "LiteLLM",
          "Model routing concepts",
        ],
      },
      {
        title: "Month 4 — RAG & AI Agents",
        points: [
          "Retrieval & Vector Search",
          "Embeddings",
          "Semantic search",
          "FAISS",
          "ChromaDB",
          "Pinecone",
          "Qdrant",
          "RAG",
          "RAG architecture",
          "Document retrieval",
          "Hybrid search",
          "Re-ranking",
          "RAG evaluation",
          "Guardrails",
          "AI Frameworks",
          "LangChain",
          "LangGraph",
          "CrewAI",
          "Prompt templates",
          "Chains",
          "Memory",
          "Agent Development",
          "MCP",
          "Tool calling",
          "Function calling",
          "Structured outputs",
          "AI agents",
          "Multi-agent systems",
          "Autonomous workflows",
          "Enterprise agent concepts",
        ],
      },
      {
        title: "Month 5 — AI Application Development",
        points: [
          "Backend Development",
          "FastAPI",
          "Advanced API development",
          "Async programming",
          "Background tasks",
          "WebSockets",
          "AI Interfaces",
          "Streamlit",
          "Gradio",
          "Chainlit",
          "Conversational AI",
          "AI chatbot development",
          "Conversational application design",
          "Dialogue management",
          "Context handling",
          "Multimodal AI",
          "Text AI",
          "Image AI",
          "Audio AI",
          "Video AI",
          "Whisper",
          "Vision-language models",
          "Speech AI",
        ],
      },
      {
        title: "Month 6 — Deployment, Security & Capstone",
        points: [
          "Deployment",
          "Docker",
          "Docker Compose",
          "Linux",
          "Nginx",
          "AWS",
          "Azure AI",
          "Google Vertex AI",
          "Serverless AI concepts",
          "AI Security",
          "Prompt injection",
          "Jailbreak defence",
          "Secret management",
          "Responsible AI",
          "Application security fundamentals",
          "Capstone",
          "AI application architecture",
          "LLM integration",
          "RAG pipeline",
          "AI agents",
          "API backend",
          "Docker deployment",
          "Cloud deployment",
          "Career Preparation",
          "Project documentation",
          "GitHub portfolio",
          "Resume development",
          "Mock interviews",
          "Industry-oriented best practices",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts —
    // the mini projects that run alongside the syllabus, and the capstone.
    practical: {
      title: "Mini Projects, Then a Capstone",
      body: "The programme runs mini projects alongside the syllabus and closes on a final capstone — a machine-learning application in month one, computer vision in month two, an LLM assistant in month three, a RAG knowledge assistant in month four and an agent workflow in month five.",
    },
    outcome: {
      label: "Outcome",
      body: "The capstone brings the six months together in one application — an API backend, AI model integration, RAG or agents, Docker and cloud deployment, documented as portfolio work.",
    },
  },

  tools: {
    title: "Technologies You Can Explore During the Programme",
    // The brief writes no lead-in for this section; this names the eight groups
    // it is organised into.
    intro:
      "The toolchain spans programming, data and machine learning, deep learning, generative AI, retrieval, agents, application development and deployment.",
    // The brief groups its tools under those eight headings; each line below
    // names that tool's own job, with its group kept in the wording.
    items: [
      { name: "Python", body: "Programming & development — the language the whole course runs on." },
      { name: "VS Code", body: "Programming & development — the editor and project workspace." },
      { name: "uv", body: "Programming & development — packages and virtual environments." },
      { name: "Git", body: "Programming & development — version control and branches." },
      { name: "GitHub", body: "Programming & development — where the portfolio lives." },
      { name: "FastAPI", body: "Programming & development — the API layer, basic through advanced." },
      { name: "NumPy", body: "Data & machine learning — arrays and numerical operations." },
      { name: "Pandas", body: "Data & machine learning — loading, transforming and analysing data." },
      { name: "scikit-learn", body: "Data & machine learning — training, evaluation and cross-validation." },
      { name: "PyTorch", body: "Deep learning — tensors, neural networks, CNNs and transfer learning." },
      { name: "OpenCV", body: "Deep learning — image processing and vision workflows." },
      { name: "Hugging Face", body: "Deep learning — the Model Hub and ecosystem." },
      { name: "Transformers", body: "Deep learning — the architecture behind modern language models." },
      { name: "Tokenizers", body: "Deep learning — how text becomes tokens a model can read." },
      { name: "OpenAI", body: "Generative AI — the first LLM API you call." },
      { name: "Gemini", body: "Generative AI — a second provider to compare against." },
      { name: "Claude", body: "Generative AI — long-context reasoning work." },
      { name: "Grok", body: "Generative AI — a further model API." },
      { name: "Ollama", body: "Generative AI — running models locally." },
      { name: "LiteLLM", body: "Generative AI — one interface across providers." },
      { name: "FAISS", body: "RAG & vector search — local similarity search." },
      { name: "ChromaDB", body: "RAG & vector search — an embedded vector store." },
      { name: "Pinecone", body: "RAG & vector search — the hosted vector database." },
      { name: "Qdrant", body: "RAG & vector search — filtering alongside vector search." },
      { name: "LangChain", body: "AI agents — chains, prompt templates and memory." },
      { name: "LangGraph", body: "AI agents — stateful graph workflows." },
      { name: "CrewAI", body: "AI agents — multi-agent workflows." },
      { name: "MCP", body: "AI agents — Model Context Protocol for tools and resources." },
      { name: "Streamlit", body: "Application development — the fastest route to an interface." },
      { name: "Gradio", body: "Application development — demo interfaces for models." },
      { name: "Chainlit", body: "Application development — chat interfaces for AI apps." },
      { name: "Docker", body: "Deployment — containerising the application." },
      { name: "Docker Compose", body: "Deployment — running the whole stack together." },
      { name: "Nginx", body: "Deployment — reverse proxy in front of the app." },
      { name: "AWS", body: "Deployment — cloud hosting and services." },
      { name: "Azure AI", body: "Deployment — Microsoft's AI platform." },
      { name: "Google Vertex AI", body: "Deployment — Google's managed AI platform." },
    ],
  },

  who: {
    title: "Who Can Join This Course?",
    items: [
      {
        title: "Students After 12th",
        body: "Students from any stream can begin with Python and gradually progress into AI and machine learning concepts.",
        icon: "users",
      },
      {
        title: "College Students",
        body: "BCA, B.Sc, B.Tech, BBA and other students can use the programme to supplement their academic learning with practical AI development.",
        icon: "certificate",
      },
      {
        title: "Graduates",
        body: "Graduates looking to build technical skills in artificial intelligence can use the structured six-month curriculum to develop a portfolio.",
        icon: "rocket",
      },
      {
        title: "Aspiring AI Developers",
        body: "If your goal is to create AI-powered applications rather than only learn AI theory, the programme covers APIs, RAG, agents, backends and deployment.",
        icon: "sparkles",
      },
      {
        title: "Python Beginners",
        body: "You do not need to be an advanced Python developer. The first module establishes the programming foundation required for later AI topics.",
        icon: "target",
      },
      {
        title: "Developers & Technical Learners",
        body: "Learners who already understand programming can focus more heavily on the LLM, RAG, agent and deployment sections.",
        icon: "terminal",
      },
    ],
  },

  worth: {
    title: "Why Choose a Six-Month AI Programme?",
    items: [
      {
        title: "Learn the Full AI Application Journey",
        body: "Understand how an AI application moves from data and models to retrieval, agents, backend APIs and deployment.",
        icon: "layers",
      },
      {
        title: "Build Strong Programming Foundations",
        body: "Python, Git, testing, APIs and software-development practices give you a foundation for more advanced AI work.",
        icon: "terminal",
      },
      {
        title: "Explore Modern Generative AI",
        body: "Learn how LLMs, embeddings, RAG and AI agents are used to create applications around foundation models.",
        icon: "sparkles",
      },
      {
        title: "Go Beyond Chatbots",
        body: "The curriculum includes machine learning, computer vision, NLP, multimodal AI, backend development and deployment.",
        icon: "cube",
      },
      {
        title: "Work With Multiple AI Models",
        body: "Exposure to different providers and local models helps you understand that AI development is not limited to a single platform.",
        icon: "cloud",
      },
      {
        title: "Build Portfolio Projects",
        body: "Practical assignments and the final capstone give you work that can be documented and discussed during interviews.",
        icon: "briefcase",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "From Python to Production AI",
    paragraphs: [
      "AI development increasingly involves more than training a model.",
      "Learning these layers together can help you understand how modern AI products are assembled.",
      "The programme therefore focuses not only on AI concepts but also on the engineering skills needed to connect models with real applications.",
    ],
    listTitle: "A useful AI application may require",
    // The brief writes those layers as a single arrow chain; each stage is set
    // out here with the month that covers it.
    items: [
      { title: "Python", body: "Month 1 — fundamentals, OOP, testing, logging and type hints." },
      { title: "Data", body: "Month 1 — NumPy, Pandas, statistics, probability and linear algebra." },
      { title: "Machine Learning", body: "Month 1 — scikit-learn, training, evaluation and cross-validation." },
      { title: "Deep Learning", body: "Month 2 — PyTorch, neural networks, CNNs and transfer learning." },
      { title: "LLMs", body: "Month 3 — tokenization, context windows, attention and model APIs." },
      { title: "RAG", body: "Month 4 — embeddings, vector search, hybrid retrieval and guardrails." },
      { title: "Agents", body: "Month 4 — LangChain, LangGraph, CrewAI, MCP and tool calling." },
      { title: "APIs", body: "Month 5 — advanced FastAPI, async, background tasks and WebSockets." },
      { title: "Interfaces", body: "Month 5 — Streamlit, Gradio, Chainlit and conversational design." },
      { title: "Docker", body: "Month 6 — containerising the application with Compose and Nginx." },
      { title: "Cloud", body: "Month 6 — AWS, Azure AI, Google Vertex AI and serverless concepts." },
      { title: "Security", body: "Month 6 — prompt injection, jailbreak defence and responsible AI." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with the techcadd team settles eligibility, batch timings, fees and where this leads — before you commit six months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Build Your Skills and Document Your Work",
    intro:
      "Learners who complete the applicable programme requirements can receive the relevant course-completion documentation provided by the institute. Certificate and internship details should be confirmed with the Mohali centre before enrolment.",
    // The brief lists nine career-preparation items; they are grouped here into
    // the four cards this section renders, with every item kept.
    items: [
      {
        icon: "certificate",
        title: "Course Completion Documentation",
        body: "Documentation of successful completion of the applicable training programme.",
      },
      {
        icon: "layers",
        title: "Capstone Project Documentation",
        body: "A written record of the architecture, implementation and results of your final AI application.",
      },
      {
        icon: "cube",
        title: "GitHub Portfolio Development",
        body: "Your repositories organised and presented as portfolio work.",
      },
      {
        icon: "briefcase",
        title: "Career Preparation",
        body: "Resume preparation, LinkedIn profile optimisation, technical interview preparation, mock interviews, career guidance and placement assistance, subject to current institute terms.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Can Take You",
    intro:
      "The skills covered in the programme can help you explore roles and learning paths across AI, machine learning and application development.",
    listTitle: "Roles this programme prepares you for",
    steps: [
      {
        title: "AI Engineer",
        body: "Develop applications that integrate machine-learning or generative-AI technologies.",
      },
      {
        title: "Machine Learning Engineer",
        body: "Work with data, models, training pipelines and model evaluation.",
      },
      {
        title: "Deep Learning Engineer",
        body: "Develop neural-network-based solutions for areas such as vision and language.",
      },
      {
        title: "LLM Application Developer",
        body: "Create applications around large language models, APIs and retrieval systems.",
      },
      {
        title: "AI Agent Developer",
        body: "Build tool-using AI workflows and agent-based applications.",
      },
      {
        title: "AI Application Developer",
        body: "Connect AI models with APIs, interfaces, databases and application logic.",
      },
      {
        title: "Generative AI Developer",
        body: "Develop applications using LLMs, embeddings, RAG and generative-AI services.",
      },
      {
        title: "Python AI Developer",
        body: "Use Python as the foundation for AI automation and application development.",
      },
    ],
  },

  projects: {
    title: "Hands-On Projects",
    // Each project keeps the brief's own skills line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Machine Learning Application",
        body: "Build a machine-learning application using Python, Pandas and scikit-learn with data preparation, training and model evaluation. Skills: Python · Pandas · scikit-learn",
      },
      {
        title: "Computer Vision Application",
        body: "Create a basic computer-vision solution using PyTorch and OpenCV. Skills: PyTorch · OpenCV · Deep Learning",
      },
      {
        title: "LLM-Powered Assistant",
        body: "Develop an application using an LLM API with structured prompts and application logic. Skills: LLM APIs · Prompt Engineering · Python",
      },
      {
        title: "RAG Knowledge Assistant",
        body: "Create a retrieval-augmented application that uses embeddings and a vector database to retrieve relevant information before generating responses. Skills: Embeddings · Vector Search · RAG · LangChain",
      },
      {
        title: "AI Agent Workflow",
        body: "Develop an AI agent capable of interacting with selected tools and completing a multi-step task. Skills: LangGraph · CrewAI · Tool Calling · AI Agents",
      },
      {
        title: "AI Capstone Application",
        body: "Build a complete AI application integrating several technologies from the programme. Possible capstone ideas include an AI customer-support assistant, RAG-based knowledge platform, AI document assistant, AI research assistant, AI content workflow, AI analytics assistant, multi-agent business workflow or multimodal AI application. The project can include an API backend, AI model integration, RAG or agents, Docker and cloud deployment.",
      },
    ],
  },

  approach: {
    title: "Learn. Build. Deploy.",
    // The brief writes no lead-in for this cycle; this names what it is.
    paragraphs: ["Every project you take on runs through the same five stages:"],
    items: [
      {
        title: "Learn",
        body: "Understand the concept, technology and problem you are trying to solve.",
        icon: "search",
      },
      {
        title: "Build",
        body: "Implement the idea through guided coding, experiments and practical assignments.",
        icon: "terminal",
      },
      {
        title: "Improve",
        body: "Test the application, evaluate its output and refine the implementation.",
        icon: "refresh",
      },
      {
        title: "Deploy",
        body: "Package the application and explore deployment using Docker and cloud platforms.",
        icon: "cloud",
      },
      {
        title: "Present",
        body: "Document your project and explain the technical decisions behind it.",
        icon: "megaphone",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Choose techcadd for AI Training in Mohali?",
    // The brief writes no lead-in for this block; this states what its six
    // points have in common.
    intro:
      "A curriculum that builds in order, a project at every stage, and a stack that runs from a first Python program to a deployed AI application.",
    items: [
      {
        title: "Progressive Curriculum",
        body: "The course begins with programming and AI fundamentals before introducing increasingly advanced technologies.",
        icon: "layers",
      },
      {
        title: "Practical AI Development",
        body: "Instead of focusing exclusively on definitions, learners work towards applications involving models, APIs, retrieval and agents.",
        icon: "cube",
      },
      {
        title: "Modern AI Stack",
        body: "The curriculum includes technologies from Python and PyTorch to LLM APIs, RAG frameworks, AI agents and cloud deployment.",
        icon: "sparkles",
      },
      {
        title: "Portfolio-Oriented Learning",
        body: "Projects provide opportunities to demonstrate your practical skills through GitHub repositories and project documentation.",
        icon: "briefcase",
      },
      {
        title: "Beginner-Friendly Foundation",
        body: "The programme starts from Python fundamentals, making the learning path more accessible to students after 12th.",
        icon: "target",
      },
      {
        title: "Career Preparation",
        body: "Resume building, GitHub presentation, LinkedIn optimisation and mock interviews can help prepare learners for AI-focused opportunities.",
        icon: "rocket",
      },
    ],
  },

  // The brief names no related programmes for this page; these are the After
  // 12th menu's own neighbours to this one, using the slugs it reserves in
  // `@/lib/site`.
  popular: {
    title: "Popular Courses",
    intro: "Explore more career-focused programmes at techcadd.",
    items: [
      {
        title: "After 12th 3-Month Artificial Intelligence Program",
        body: "A shorter introduction to Python, machine learning and applied AI concepts.",
        href: "/courses/after12th/artificial-intelligence",
      },
      {
        title: "After 12th 9-Month Artificial Intelligence Diploma Program",
        body: "A longer track with more time for advanced AI topics and architecture.",
        href: "/after-12th/artificial-intelligence-diploma-program",
      },
      {
        title: "After 12th 6-Month Agentic AI Certificate Program",
        body: "Go deeper into tool-using agents, evaluation, AI security and production engineering.",
        href: "/after-12th/agentic-ai-certificate-program",
      },
      {
        title: "After 12th 6-Month Data Science Certificate Program",
        body: "The data route to the same technologies — analysis, statistics, ML and generative AI.",
        href: "/after-12th/data-science-certificate-program",
      },
      {
        title: "After 12th 6-Month Data Analytics & Business Analysis Certificate Program",
        body: "Excel, SQL, Power BI and business analysis for reporting-focused roles.",
        href: "/after-12th/data-analytics-certificate-program",
      },
      {
        title: "After 12th 6-Month Full Stack Development Certificate Program",
        body: "Build the web applications AI features are usually delivered inside.",
        href: "/after-12th/full-stack-development-certificate-program",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the Artificial Intelligence course after 12th?",
      a: "The programme is structured as a six-month Artificial Intelligence course, covering Python, machine learning, deep learning, NLP, LLMs, RAG, agents, AI application development and deployment.",
    },
    {
      q: "Can I join after 12th?",
      a: "Yes. The programme is designed to begin with foundational programming and gradually introduce advanced AI technologies.",
    },
    {
      q: "Can students from any stream join?",
      a: "The programme can be suitable for students from different academic streams. Since Python begins from the fundamentals, advanced programming knowledge is not assumed at the start.",
    },
    {
      q: "Do I need Python experience?",
      a: "No. Python is taught during the first module. Basic computer familiarity can still be helpful.",
    },
    {
      q: "What is covered in Generative AI?",
      a: "The programme introduces LLM fundamentals, prompting, model APIs, embeddings, RAG, vector databases, AI agents, multimodal AI and application development.",
    },
    {
      q: "Will I learn ChatGPT?",
      a: "ChatGPT is introduced as an AI-assisted development and productivity tool. The curriculum goes beyond chatbot usage into APIs, LLM application development, RAG and AI agents.",
    },
    {
      q: "Which AI APIs are covered?",
      a: "The curriculum includes OpenAI, Gemini, Claude and Grok APIs, along with Ollama and LiteLLM for local and multi-provider workflows.",
    },
    {
      q: "What is RAG?",
      a: "RAG, or Retrieval-Augmented Generation, connects an AI model with an external knowledge source so the application can retrieve relevant information before generating a response.",
    },
    {
      q: "What are AI agents?",
      a: "AI agents are application workflows that can use models, tools and instructions to complete multi-step tasks. The programme introduces agent frameworks, tool calling, structured outputs and multi-agent concepts.",
    },
    {
      q: "Will I learn machine learning?",
      a: "Yes. The first module introduces machine learning with scikit-learn, including model training, evaluation and cross-validation.",
    },
    {
      q: "Is deep learning included?",
      a: "Yes. Month two covers PyTorch, tensors, neural networks, CNNs, transfer learning and computer vision.",
    },
    {
      q: "Will I build projects?",
      a: "Yes. The learning path includes practical projects and a final capstone application.",
    },
    {
      q: "Can I create a project for my portfolio?",
      a: "Yes. Projects can be documented with GitHub repositories, technical explanations and demonstrations where applicable.",
    },
    {
      q: "Does the programme guarantee a job?",
      a: "No course should be treated as a guaranteed job placement. Career support and placement assistance depend on the institute's current policies and available opportunities.",
    },
    {
      q: "What is the course fee in Mohali?",
      a: "The current fee can depend on the batch and training format. Contact the Mohali centre for the latest fee and payment options.",
    },
    {
      q: "Are weekend or evening classes available?",
      a: "Batch availability can change. Confirm the current weekday, evening and weekend schedules with the Mohali centre.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Learners completing the applicable requirements may receive course-completion documentation. Confirm the current certificate details before admission.",
    },
  ],

  enquiry: {
    title: "Ask About Artificial Intelligence Certificate Program",
    // The contact details the brief supplies are the centre's own; the page
    // already renders them from `@/lib/site`, so only the wording is carried
    // here rather than a second copy of the number.
    paragraphs: [
      "Thinking about learning AI after 12th?",
      "Speak with a course counsellor about the current curriculum, practical projects, batch timings, fees, certification and career-support options available in Mohali.",
      "Location: Mohali, Punjab. Counselling hours: Monday to Saturday, 9:00 AM to 7:00 PM.",
    ],
  },

  fit: {
    title: "Ready to Start Your AI Learning Journey?",
    paragraphs: [
      "You do not need to master programming before exploring artificial intelligence.",
      "Start with Python, understand how machine learning works, build with LLMs, experiment with RAG and agents, and finish with an AI application that demonstrates your skills.",
    ],
    ctaTitle: "Get Started Today",
    // The brief names no list here; these are its own highlights, the facts a
    // reader still deciding is weighing.
    points: [
      "6 months, 12th pass, any stream",
      "Python taught from the fundamentals — no prior coding needed",
      "scikit-learn, PyTorch, CNNs, computer vision and NLP",
      "LLM APIs across OpenAI, Gemini, Claude, Grok and Ollama",
      "RAG, vector databases, LangGraph, CrewAI and MCP agents",
      "FastAPI, Streamlit, Docker, AWS, Azure AI and Vertex AI",
      "6 projects closing on a deployed AI capstone",
    ],
  },
};

const dataAnalytics: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Future scope" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "Best After 12th 4-Month Data Analytics & Business Analysis Program in Mohali",
    paragraphs: [
      "Turn data into meaningful business decisions with a practical four-month programme covering Excel, SQL, Python, Power BI, Tableau, business analysis and modern AI productivity tools. Build dashboards, analyse real-world datasets, work with business requirements and complete a portfolio-ready analytics capstone.",
    ],
  },

  program: {
    title: "Data Analytics & Business Analysis Program in Mohali",
    paragraphs: [
      "techcadd's 4-Month Data Analytics & Business Analysis Program in Mohali is designed for students who want to enter the growing world of data-driven business and technology.",
      "Starting from the fundamentals, the programme takes you through advanced Excel, SQL, Python, Pandas, NumPy, Power BI, Tableau, data visualisation, business analysis, Agile practices and generative AI tools.",
      "Instead of learning isolated software, you follow the complete analytics workflow — collect data, clean it, analyse it, visualise it, identify insights and communicate recommendations.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Duration", value: "4 Months" },
      { label: "Learning Mode", value: "Classroom + Practical Training" },
      { label: "Eligibility", value: "12th Pass Onward" },
      { label: "Core Skills", value: "Excel + SQL + Python + Power BI + Tableau" },
      { label: "Business Skills", value: "Business Analysis + Requirements Engineering" },
      { label: "Portfolio", value: "Multiple Practical Projects" },
      { label: "Final Project", value: "Enterprise Analytics Capstone" },
      { label: "Career Support", value: "Resume, Portfolio & Interview Assistance" },
    ],
  },

  overview: {
    title: "Course Overview",
    paragraphs: [
      "The programme is built around a practical question: how can raw business data be transformed into information that helps people make better decisions?",
      "The first month establishes your analytics foundation. You learn the data analytics lifecycle, advanced Excel, SQL fundamentals, Python basics and business statistics. You also become familiar with AI productivity tools that can support research, coding, documentation and reporting.",
      "In the second month, the programme moves deeper into SQL, data manipulation and exploratory data analysis. You work with joins, CTEs, subqueries and window functions while using Pandas and NumPy to clean and transform datasets. You also explore data visualisation, APIs, web scraping and interactive analytics applications.",
      "Month three focuses on Business Intelligence. You learn how to build data models and dashboards using Power BI and Tableau. The curriculum introduces Power Query, star schemas, fact and dimension tables, DAX measures, time intelligence, KPI reporting and dashboard storytelling.",
      "The final month introduces business analysis and professional project practices. You learn requirement gathering, BRD and FRD documentation, Agile and Scrum concepts, user stories, project management and AI-assisted productivity.",
      "The programme ends with an enterprise analytics capstone combining requirements, SQL, Python analysis, business intelligence dashboards and professional documentation.",
    ],
  },

  learn: {
    title: "What You'll Learn",
    intro:
      "The programme is structured around practical outcomes so that you finish with work you can explain, demonstrate and add to your portfolio.",
    items: [
      {
        title: "Analyse Business Data",
        body: "Learn how to take raw datasets through cleaning, transformation, analysis and interpretation to identify useful business insights.",
      },
      {
        title: "Work with Excel & SQL",
        body: "Develop strong spreadsheet and database skills for reporting, data analysis and business decision-making.",
      },
      {
        title: "Analyse Data with Python",
        body: "Use Python, Pandas and NumPy to clean datasets, manipulate information, identify patterns and perform exploratory analysis.",
      },
      {
        title: "Build BI Dashboards",
        body: "Create interactive Power BI and Tableau dashboards using data models, calculated measures, filters, KPIs and visual storytelling.",
      },
      {
        title: "Understand Business Requirements",
        body: "Learn how analysts communicate with stakeholders, gather requirements and convert business problems into structured documentation.",
      },
      {
        title: "Complete an Enterprise Capstone",
        body: "Bring your technical and business skills together through a complete analytics project that can become a central piece of your portfolio.",
      },
    ],
  },

  curriculum: {
    title: "Course Curriculum",
    intro:
      "The four-month curriculum progresses from analytics fundamentals to advanced querying, data visualisation, business intelligence, business analysis and an integrated capstone.",
    // Each month keeps the brief's own grouping headings, each followed by the
    // paragraph written under it, so the order and wording are as supplied.
    modules: [
      {
        title: "Month 1 — Analytics Foundations & Programming",
        points: [
          "Data Analytics Fundamentals",
          "Understand the analytics lifecycle and the difference between descriptive, diagnostic, predictive and prescriptive analytics. Learn how organisations use data to support business decisions.",
          "Advanced Excel for Analysts",
          "Work with data cleaning, formulas, XLOOKUP, INDEX-MATCH, pivot tables, pivot charts, conditional logic, Power Query fundamentals and interactive dashboard creation.",
          "SQL Fundamentals",
          "Learn databases, tables, relationships, primary keys, foreign keys and essential SQL commands including SELECT, WHERE, GROUP BY, HAVING and aggregate functions.",
          "Python Fundamentals",
          "Start with variables, data types, conditions, loops, functions, modules, exception handling and basic object-oriented programming concepts.",
          "Business Statistics",
          "Understand mean, median, standard deviation, probability, correlation, distributions and outliers, with a focus on how statistics support business analysis.",
          "Month 1 Practical: Complete an Excel reporting project and introductory SQL/Python exercises using structured datasets.",
        ],
      },
      {
        title: "Month 2 — Advanced SQL, Python & Data Visualisation",
        points: [
          "Advanced SQL",
          "Move beyond basic queries with INNER, LEFT and RIGHT joins, CTEs, subqueries, views and window functions.",
          "SQL for Reporting",
          "Learn how complex queries can be structured for business reporting and explore query optimisation concepts.",
          "Data Wrangling with Pandas & NumPy",
          "Import CSV and Excel data, handle missing values, filter records, group information, merge datasets and create new analytical features.",
          "Exploratory Data Analysis",
          "Investigate trends, relationships, distributions and outliers using Python-based analysis techniques.",
          "Data Visualisation",
          "Create charts and analytical visuals using Matplotlib, Seaborn and Plotly to communicate findings effectively.",
          "APIs & Web Data",
          "Understand REST APIs, JSON and basic web data extraction concepts. Learn how external data can be brought into an analytics workflow.",
          "Interactive Analytics Applications",
          "Explore Streamlit fundamentals and understand how analytical results can be presented through interactive applications.",
          "Month 2 Practical: Build a complete dataset analysis involving SQL querying, Python data cleaning, exploratory analysis and visualisation.",
        ],
      },
      {
        title: "Month 3 — Power BI, Tableau & Modern Data Platforms",
        points: [
          "Power BI Fundamentals",
          "Learn Power BI Desktop, data import, Power Query transformation, relationships, data modelling and dashboard design.",
          "Data Modelling",
          "Understand fact tables, dimension tables, star schemas and other modelling concepts used to create efficient BI solutions.",
          "Advanced DAX",
          "Work with calculated columns, measures, time intelligence, running totals, filters and dynamic calculations.",
          "Executive Dashboards",
          "Build KPI cards, interactive reports and management dashboards designed to answer real business questions.",
          "Tableau",
          "Learn calculated fields, filters, parameters, interactive dashboards, maps and data storytelling techniques.",
          "Modern Data Platforms",
          "Understand the difference between data warehouses and data lakes and explore modern concepts such as Microsoft Fabric, Snowflake, ETL, ELT and dbt.",
          "Month 3 Practical: Create an interactive Power BI dashboard and a complementary Tableau reporting project based on business data.",
        ],
      },
      {
        title: "Month 4 — Business Analysis, AI & Capstone",
        points: [
          "Business Analysis Fundamentals",
          "Understand stakeholders, business problems, requirement gathering, process analysis and gap analysis.",
          "BRD, FRD & Requirements Documentation",
          "Learn how to create Business Requirement Documents, Functional Requirement Documents and structured requirement specifications.",
          "Agile & Scrum",
          "Explore Agile principles, Scrum roles, user stories, acceptance criteria, sprint planning and project workflows.",
          "Jira & Project Management",
          "Understand how teams manage tasks, requirements and development work using project management platforms.",
          "Generative AI for Analysts",
          "Learn how AI tools can support research, SQL development, documentation, data analysis, presentation preparation and repetitive reporting tasks.",
          "Professional Portfolio Development",
          "Organise your projects, document your work, create a professional resume and prepare to discuss your analytics projects during interviews.",
          "Enterprise Analytics Capstone: Complete an end-to-end analytics solution combining business requirements, SQL, Python, data analysis, Power BI and professional reporting.",
        ],
      },
    ],
    // Neither pair is written as a block in the brief; both are stated from its
    // own facts — the practical that closes every month, and the capstone.
    practical: {
      title: "Practical Work Every Month",
      body: "Each month closes on build work rather than revision — an Excel reporting project with introductory SQL and Python in month one, a full dataset analysis in month two, a Power BI dashboard with a complementary Tableau project in month three, and the enterprise capstone in month four.",
    },
    outcome: {
      label: "Outcome",
      body: "The capstone runs the whole workflow in one project — business requirements, SQL, Python analysis, data visualisation, Power BI dashboards and executive reporting, documented as a portfolio case study.",
    },
  },

  tools: {
    title: "Tools You Will Work With",
    intro:
      "The programme introduces a range of tools used across analytics, business intelligence and professional reporting workflows. The objective is not to memorise software features — you learn how different tools fit together within an actual analytics workflow.",
    // The brief lists the toolchain without describing each entry; every line
    // below names that tool's own job inside the workflow above.
    items: [
      { name: "Microsoft Excel", body: "The first reporting surface — cleaning, formulas and pivots." },
      { name: "Advanced Excel", body: "XLOOKUP, INDEX-MATCH, conditional logic and dashboards." },
      { name: "Power Query", body: "Repeatable cleaning and transformation before analysis." },
      { name: "SQL", body: "Joins, CTEs, subqueries, views and window functions." },
      { name: "Python", body: "The language behind months two and four." },
      { name: "Pandas", body: "Importing, filtering, grouping and merging datasets." },
      { name: "NumPy", body: "Arrays and the numeric work underneath Pandas." },
      { name: "Matplotlib", body: "The base plotting library for analytical charts." },
      { name: "Seaborn", body: "Statistical charts for exploratory analysis." },
      { name: "Plotly", body: "Interactive visuals that a reader can explore." },
      { name: "Power BI", body: "Data models, dashboards and executive reporting." },
      { name: "DAX", body: "Measures, time intelligence and dynamic calculations." },
      { name: "Tableau", body: "Calculated fields, parameters, maps and data storytelling." },
      { name: "Streamlit", body: "Turning an analysis into an interactive application." },
      { name: "Git & GitHub", body: "Version control and where your project portfolio lives." },
      { name: "VS Code", body: "The editor the Python and SQL work is written in." },
      { name: "REST APIs", body: "Bringing external data into the analytics workflow." },
      { name: "JSON", body: "The format that API data arrives in." },
      { name: "BeautifulSoup", body: "Basic web data extraction." },
      { name: "Jira", body: "Tasks, requirements and sprint workflow." },
      { name: "Confluence", body: "Where the requirement documents are written up." },
      { name: "Microsoft Fabric", body: "The lakehouse-era analytics platform." },
      { name: "Snowflake", body: "The cloud data warehouse." },
      { name: "dbt", body: "Transformations inside the ELT pipeline." },
      { name: "ChatGPT", body: "Research, documentation and analysis support." },
      { name: "GitHub Copilot", body: "Code assistance for SQL and Python work." },
      { name: "Gemini", body: "A second assistant for research and reporting." },
    ],
  },

  who: {
    title: "Who Can Join This Programme?",
    items: [
      {
        title: "Students After 12th",
        body: "Students from commerce, arts, science, humanities, management and other streams can begin with the fundamentals and gradually develop technical analytics skills.",
        icon: "users",
      },
      {
        title: "Commerce & B.Com Students",
        body: "Students with a commerce background can use their understanding of business and numbers as a foundation for learning Excel, SQL, Power BI and business analysis.",
        icon: "briefcase",
      },
      {
        title: "College Students",
        body: "Graduation students can develop practical analytics skills alongside their academic education and start building a professional portfolio.",
        icon: "certificate",
      },
      {
        title: "Aspiring Data Analysts",
        body: "If you want to move towards Data Analyst, MIS, Reporting or Business Intelligence roles, the programme introduces the core technical and analytical skills required for these paths.",
        icon: "target",
      },
      {
        title: "Career Switchers",
        body: "Professionals from non-technical backgrounds can start from the basics and gradually progress towards data analysis and business intelligence.",
        icon: "refresh",
      },
      {
        title: "Self-Learners",
        body: "If you have learned individual tools through online tutorials but struggle to connect them into one workflow, the project-based structure can help you build a more organised skill set.",
        icon: "search",
      },
    ],
  },

  worth: {
    title: "Why This Programme Is Worth Four Months",
    items: [
      {
        title: "Strong Excel & SQL Foundation",
        body: "Excel and SQL remain important skills for reporting, business analysis and data-related roles. The programme takes both beyond basic formulas and simple queries.",
        icon: "chart",
      },
      {
        title: "Python for Modern Analytics",
        body: "Learn Python alongside Pandas and NumPy so you can work with larger datasets and automate parts of the analysis process.",
        icon: "terminal",
      },
      {
        title: "Power BI & Tableau",
        body: "Gain exposure to two major business intelligence platforms and learn how to create interactive dashboards and reports.",
        icon: "monitor",
      },
      {
        title: "Business Analysis Skills",
        body: "Technical knowledge alone is not enough. Learn requirement gathering, documentation, stakeholder communication and Agile project practices.",
        icon: "briefcase",
      },
      {
        title: "Modern Data Concepts",
        body: "Understand data warehouses, data lakes, ETL, ELT, APIs and modern cloud-oriented data platforms.",
        icon: "cloud",
      },
      {
        title: "AI-Assisted Productivity",
        body: "Learn how generative AI tools can assist analysts with SQL, documentation, research, reporting and repetitive tasks while maintaining human review.",
        icon: "sparkles",
      },
      {
        title: "Portfolio-Based Learning",
        body: "Your practical assignments and capstone can be organised into case studies that demonstrate your skills to recruiters or potential clients.",
        icon: "rocket",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Build the Skills Behind Data-Driven Business",
    paragraphs: [
      "Businesses across industries generate large amounts of information through sales, marketing, finance, operations and customer interactions.",
      "The challenge is no longer simply collecting data. Organisations need people who can clean it, analyse it, visualise it and communicate what the numbers mean.",
      "A strong foundation in Excel, SQL, Python and business intelligence can help learners move towards a variety of data and reporting roles.",
    ],
    listTitle: "By the end of the programme, you can have",
    // The brief lists these nine as bare lines; each body names where that line
    // actually comes from in the curriculum above.
    items: [
      { title: "Practical Excel and SQL experience", body: "Months 1 and 2 — dashboards, joins, CTEs and window functions." },
      { title: "Python analytics projects", body: "Month 2 — Pandas, NumPy, exploratory analysis and visualisation." },
      { title: "Power BI dashboards", body: "Month 3 — data models, DAX measures and executive KPI reports." },
      { title: "Tableau visualisations", body: "Month 3 — calculated fields, parameters, maps and storytelling." },
      { title: "Business analysis documentation", body: "Month 4 — BRD, FRD, user stories and acceptance criteria." },
      { title: "An enterprise capstone", body: "Month 4 — requirements through to executive reporting in one project." },
      { title: "GitHub project documentation", body: "Month 4 — your work written up and version-controlled." },
      { title: "A professional portfolio foundation", body: "Month 4 — six projects organised as case studies." },
      { title: "Resume and interview preparation", body: "Month 4 — presenting the projects and the decisions behind them." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with the techcadd team settles eligibility, batch timings, fees and where this leads — before you commit four months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Get Certified in Data Analytics & Business Analysis",
    intro:
      "Successfully complete the required coursework, practical assignments and project assessments to receive applicable course and project documentation.",
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "Documents your successful completion of the Data Analytics & Business Analysis programme.",
      },
      {
        icon: "check",
        title: "Project Certificate",
        body: "Recognises your practical project work completed during training.",
      },
      {
        icon: "layers",
        title: "Capstone Documentation",
        body: "Provides a structured record of your final analytics project and the technologies and processes used.",
      },
      {
        icon: "building",
        title: "Internship Documentation",
        body: "Where applicable, students can receive relevant internship or project documentation based on their training.",
      },
      {
        icon: "chart",
        title: "Portfolio Support",
        body: "Organise your projects into professional case studies that can be presented during interviews.",
      },
      {
        icon: "briefcase",
        title: "Placement Assistance",
        body: "Receive support with resume preparation, portfolio presentation, interview practice and relevant career opportunities.",
      },
    ],
  },

  takesYou: {
    title: "Where This Course Takes You",
    intro:
      "The combination of technical analytics and business understanding can prepare learners for multiple entry-level and junior career paths.",
    listTitle: "Roles this programme prepares you for",
    steps: [
      {
        title: "Data Analyst",
        body: "Analyse datasets, identify trends, create reports and communicate insights to business teams.",
      },
      {
        title: "MIS Executive",
        body: "Prepare recurring reports, manage business data and create dashboards for operational decision-making.",
      },
      {
        title: "Reporting Analyst",
        body: "Transform business information into structured reports and performance dashboards.",
      },
      {
        title: "Business Analyst",
        body: "Work with stakeholders to understand requirements, document processes and support business improvement.",
      },
      {
        title: "BI Analyst",
        body: "Develop dashboards and data models using tools such as Power BI and Tableau.",
      },
      {
        title: "Power BI Developer",
        body: "Build interactive reports, data models, DAX calculations and business intelligence dashboards.",
      },
      {
        title: "Junior SQL Analyst",
        body: "Use SQL queries to retrieve, combine and analyse information stored in databases.",
      },
      {
        title: "Data Analytics Freelancer",
        body: "Provide reporting, dashboard creation, data cleaning and analytics services to businesses and clients.",
      },
    ],
  },

  projects: {
    title: "Hands-on Projects You Will Ship",
    // Each project keeps the brief's own outcome line, appended to its
    // description rather than dropped.
    items: [
      {
        title: "Interactive Excel Business Dashboard",
        body: "Clean a business dataset, create pivot tables and charts, apply advanced formulas and use Power Query to develop a practical reporting dashboard. Outcome: Excel Business Dashboard",
      },
      {
        title: "SQL Business Reporting System",
        body: "Work with related customer, product and transaction datasets using joins, CTEs, subqueries and window functions to answer business questions. Outcome: SQL Reporting Case Study",
      },
      {
        title: "Python EDA & Business Insights",
        body: "Clean and transform a raw dataset using Pandas and NumPy, investigate patterns and create meaningful visualisations. Outcome: Python Analytics Report",
      },
      {
        title: "API & Interactive Analytics Application",
        body: "Work with API-based data or structured web information and present the results through an interactive analytics application. Outcome: Interactive Analytics App",
      },
      {
        title: "Power BI & Tableau Dashboard",
        body: "Build a structured data model, create DAX measures and develop an executive Power BI dashboard, followed by a Tableau visualisation project. Outcome: Business Intelligence Portfolio Project",
      },
      {
        title: "Enterprise Analytics Capstone",
        body: "Complete a full analytics workflow starting with business requirements and moving through SQL, Python analysis, data visualisation, Power BI dashboards and executive reporting. Outcome: Enterprise Data Analytics Case Study",
      },
    ],
  },

  approach: {
    title: "Learn It. Build It. Present It.",
    paragraphs: [
      "Every major project follows a practical process that helps you understand both the technical work and the business reasoning behind it.",
    ],
    items: [
      {
        title: "Understand",
        body: "Identify the business question, available data and expected outcome.",
        icon: "search",
      },
      {
        title: "Prepare",
        body: "Clean, structure and validate the data before beginning analysis.",
        icon: "layers",
      },
      {
        title: "Analyse",
        body: "Use Excel, SQL or Python to explore the data and identify useful patterns.",
        icon: "terminal",
      },
      {
        title: "Visualise",
        body: "Turn analytical findings into dashboards, charts and reports using Power BI or Tableau.",
        icon: "chart",
      },
      {
        title: "Explain",
        body: "Translate technical findings into clear business insights and recommendations.",
        icon: "cube",
      },
      {
        title: "Present",
        body: "Document the project and present your decisions as a professional portfolio case study.",
        icon: "megaphone",
      },
    ],
  },

  whyUs: {
    kicker: "Why techcadd",
    title: "Why Students Choose techcadd",
    intro:
      "The programme connects technical analytics with practical business requirements instead of treating every tool as a separate subject.",
    items: [
      {
        title: "Practical Learning",
        body: "Work through exercises, assignments and projects to reinforce concepts beyond classroom explanations.",
        icon: "cube",
      },
      {
        title: "Beginner-Friendly Approach",
        body: "The curriculum starts with fundamentals and gradually progresses towards SQL, Python, BI and business analysis.",
        icon: "target",
      },
      {
        title: "Multiple Analytics Tools",
        body: "Learn Excel, SQL, Python, Power BI and Tableau within one structured programme.",
        icon: "layers",
      },
      {
        title: "Business Analysis Exposure",
        body: "Understand requirements, documentation, stakeholder communication and Agile workflows alongside technical analytics.",
        icon: "briefcase",
      },
      {
        title: "Portfolio Development",
        body: "Major projects can be organised into case studies for your resume, GitHub profile and interviews.",
        icon: "chart",
      },
      {
        title: "AI Productivity",
        body: "Understand how modern AI tools can assist with research, coding, documentation and reporting.",
        icon: "sparkles",
      },
      {
        title: "Interview Preparation",
        body: "Receive guidance on explaining projects, discussing technical decisions and presenting your portfolio professionally.",
        icon: "rocket",
      },
    ],
  },

  popular: {
    title: "Popular Courses",
    intro: "Explore more career-focused programmes at techcadd.",
    items: [
      {
        title: "After 12th 3-Month Digital Marketing Program",
        body: "Build foundational skills in SEO, digital advertising, social media marketing and analytics.",
        href: "/courses/after12th/digital-marketing",
      },
      {
        title: "After 12th 6-Month Data Analytics Program",
        body: "Explore a broader analytics curriculum with additional time for practical projects and advanced topics.",
        href: "/after-12th/data-analytics-certificate-program",
      },
      {
        title: "After 12th 6-Month Data Science Program",
        body: "Develop deeper technical skills in data science, Python, analytics and related technologies.",
        href: "/after-12th/data-science-certificate-program",
      },
      {
        title: "Digital Marketing Program",
        body: "Learn organic search, paid advertising, social media, analytics and performance marketing.",
        href: "/courses/course/digital-marketing",
      },
      {
        title: "Artificial Intelligence Program",
        body: "Explore AI concepts, modern AI tools, machine learning fundamentals and practical applications.",
        href: "/courses/after12th/artificial-intelligence",
      },
      {
        title: "Python Programming Course",
        body: "Build a programming foundation and learn Python for development, automation and data-related applications.",
        href: "/courses/course/python-programming",
      },
    ],
  },

  faqs: [
    {
      q: "What is the duration of the Data Analytics & Business Analysis programme?",
      a: "The programme is structured as a four-month learning path covering analytics foundations, SQL, Python, business intelligence, business analysis and a final capstone.",
    },
    {
      q: "Can I join after 12th without a coding background?",
      a: "Yes. The curriculum begins with analytics fundamentals and gradually introduces Excel, SQL and Python before moving into advanced concepts.",
    },
    {
      q: "Does my educational stream matter?",
      a: "No. Students from commerce, arts, science, management and other backgrounds can start with the fundamentals.",
    },
    {
      q: "Is this course suitable for B.Com students?",
      a: "Yes. Commerce students can benefit from the combination of business concepts, Excel, SQL, dashboards and business analysis.",
    },
    {
      q: "Do I need advanced mathematics?",
      a: "No advanced mathematics background is required to begin. The programme includes practical business statistics and focuses on applying analytical concepts to datasets.",
    },
    {
      q: "Will I learn Excel and SQL?",
      a: "Yes. Excel and SQL form an important part of the first two months and progress from fundamentals to more advanced reporting and querying techniques.",
    },
    {
      q: "Will I learn Python for Data Analytics?",
      a: "Yes. Python fundamentals are followed by Pandas, NumPy, data cleaning, exploratory analysis and visualisation.",
    },
    {
      q: "Are Power BI and Tableau both covered?",
      a: "Yes. The Business Intelligence module introduces both Power BI and Tableau, including dashboard development and data visualisation.",
    },
    {
      q: "What is the difference between Data Analytics and Business Analysis?",
      a: "Data Analytics focuses on working with data to identify trends, patterns and insights. Business Analysis focuses on understanding business requirements, processes, stakeholders and solutions. This programme introduces both areas.",
    },
    {
      q: "How many projects will I build?",
      a: "The programme includes multiple practical assignments and six major portfolio-oriented projects covering Excel, SQL, Python, APIs, BI dashboards and the final enterprise capstone.",
    },
    {
      q: "What is the final capstone project?",
      a: "The capstone brings together business requirements, data analysis, SQL, Python and business intelligence. The objective is to create an end-to-end analytics solution that can be documented as a portfolio case study.",
    },
    {
      q: "Can I freelance after completing the course?",
      a: "The skills can support freelance services such as Excel reporting, dashboard development, data cleaning, SQL reporting and business analytics. Freelancing success depends on your portfolio, communication, expertise and ability to find clients.",
    },
    {
      q: "Do I need a laptop?",
      a: "A laptop is recommended for practising outside class, completing assignments, developing projects and maintaining your portfolio.",
    },
    {
      q: "Does techcadd provide placement assistance?",
      a: "Placement assistance may include resume preparation, interview guidance, portfolio support and relevant career opportunities. Placement assistance should not be considered a guaranteed job offer.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Students who successfully complete the required coursework and assessments can receive applicable course and project certification.",
    },
    {
      q: "Are weekend or flexible batches available?",
      a: "Batch schedules can vary. Contact the Mohali course team to confirm current weekday, evening or weekend options.",
    },
    {
      q: "How can I enrol?",
      a: "Contact the course team to check current fees, batch timings, eligibility, available seats and the admission process. You can also enquire about a demo session before enrolling.",
    },
  ],

  enquiry: {
    title: "Ask About Data Analytics & Business Analysis Program in Mohali",
    // The brief leaves its email and phone blank; the page already renders the
    // centre's real details from `@/lib/site`, so only the wording is carried.
    paragraphs: [
      "Have questions about course fees, eligibility, batch timings, projects or career opportunities?",
      "Speak with a course advisor to understand the programme and find out whether Data Analytics and Business Analysis are the right career direction for you.",
      "Location: Mohali, Punjab. Counselling hours: Monday to Saturday, 9:00 AM to 7:00 PM.",
    ],
  },

  fit: {
    title: "Not Sure If Data Analytics Is Right for You?",
    paragraphs: [
      "Starting a career in analytics becomes easier when you understand the tools, projects and career paths involved.",
      "Explore the practical training approach, discuss your goals with a course advisor and discover how a Data Analytics & Business Analysis Program in Mohali can help you build job-oriented technical and business skills.",
    ],
    ctaTitle: "Get Started Today",
    // The brief names no list here; these are its own highlights, the facts a
    // reader still deciding is weighing.
    points: [
      "4 months, 12th pass onward, any stream",
      "Advanced Excel, Power Query and SQL from the fundamentals",
      "Python, Pandas, NumPy, EDA and visualisation",
      "Power BI, DAX and Tableau across one BI module",
      "Business analysis — BRD, FRD, Agile, Scrum and Jira",
      "Generative AI as an analyst's productivity tool",
      "6 portfolio projects closing on an enterprise capstone",
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

const artificialIntelligence: After12Page = {
  sections: [
    { id: "overview", label: "Overview" },
    { id: "learn", label: "What you learn" },
    { id: "modules", label: "Curriculum" },
    { id: "tools", label: "Tools" },
    { id: "who", label: "Who can join" },
    { id: "why-now", label: "Why now" },
    { id: "certificate", label: "Certification" },
    { id: "scope", label: "Career paths" },
    { id: "projects", label: "Projects" },
    { id: "why", label: "Why techcadd" },
    { id: "reviews", label: "Reviews" },
    { id: "faqs", label: "FAQs" },
    { id: "enquire", label: "Enquire" },
  ],

  hero: {
    badge: "Start right after school",
    title: "After 12th 4-Month Artificial Intelligence Program in Mohali",
    paragraphs: [
      "A focused, four-month route into practical AI work — Python and machine-learning foundations, deep learning, large language models, retrieval-augmented generation, and AI agents — ending with one deployed application you can show in an interview, not just describe in one.",
    ],
  },

  program: {
    title: "4-Month Artificial Intelligence Program in Mohali",
    // The brief writes no separate programme paragraph; these two state what it
    // covers and how it is sequenced, in its own words.
    paragraphs: [
      "Python and machine-learning foundations, deep learning, large language models, retrieval-augmented generation and AI agents, across four months of hands-on build work.",
      "The course moves in a deliberate sequence — foundations before frameworks, understanding before frameworks, and building before deploying.",
    ],
    highlightsTitle: "Key Highlights",
    highlights: [
      { label: "Eligibility", value: "12th pass, any stream" },
      { label: "Duration", value: "4 months" },
      { label: "Format", value: "Practical-first, theory alongside" },
      { label: "Includes", value: "Certificate + placement support" },
    ],
  },

  // The brief writes no course-overview block; these three paragraphs state
  // what the four months do, from its own facts.
  overview: {
    title: "Course Overview",
    paragraphs: [
      "The programme is built the way the work is done: the applied-math and programming layer first, then the models, then the systems built around them, then deployment.",
      "Months one and two put Python, engineering practice and the maths under your hands before any framework appears — NumPy, Pandas, statistics and scikit-learn, then neural networks, CNNs and the transformer mechanics behind every modern chatbot.",
      "Months three and four are where it becomes employable work: prompting across four model providers, vector search and full RAG architecture, agent-building with LangChain, LangGraph, CrewAI and MCP, and finally a containerised application deployed to the cloud.",
    ],
  },

  // The brief lists no learning outcomes; these six are drawn from what each
  // month actually produces.
  learn: {
    title: "What You'll Learn",
    intro:
      "Six capabilities the four months are built around — each one something you can demonstrate, not just describe.",
    items: [
      {
        title: "Write Python Like a Developer",
        body: "Python from scratch with object-oriented programming, exception handling, Git and GitHub, APIs and JSON, and FastAPI basics — the engineering layer, not just syntax.",
      },
      {
        title: "Build and Evaluate Models",
        body: "NumPy, Pandas, statistics and probability, and scikit-learn fundamentals, then neural networks, CNNs and transfer learning in PyTorch.",
      },
      {
        title: "Understand What an LLM Actually Does",
        body: "Tokenization, embeddings, context windows and attention — the mechanics behind every modern chatbot, rather than prompting a black box.",
      },
      {
        title: "Work Across Model Providers",
        body: "Structured prompt engineering across OpenAI, Gemini, Claude and Grok APIs, plus local models via Ollama and routing between them with LiteLLM.",
      },
      {
        title: "Ground a Model in Real Data",
        body: "Vector databases, semantic search and full RAG architecture with hybrid search and re-ranking.",
      },
      {
        title: "Ship It",
        body: "Interfaces in Streamlit, Gradio or Chainlit, containerised with Docker and deployed to AWS, Azure AI or Google Vertex AI.",
      },
    ],
  },

  curriculum: {
    title: "Program Structure: What Four Months Actually Covers",
    intro:
      "The course moves in a deliberate sequence — foundations before frameworks, understanding before frameworks, and building before deploying.",
    // Each month keeps the brief's own framing line, followed by the topics it
    // names broken out as their own entries.
    modules: [
      {
        title: "Month 1 — Python, Math & AI Foundations",
        points: [
          "Python programming from scratch, and the applied-math layer every AI course skips too fast.",
          "Python programming from scratch",
          "Git / GitHub",
          "Object-oriented programming",
          "Exception handling",
          "Working with APIs and JSON",
          "FastAPI basics",
          "NumPy",
          "Pandas",
          "Statistics and probability",
          "scikit-learn fundamentals",
        ],
      },
      {
        title: "Month 2 — Deep Learning, NLP & LLM Internals",
        points: [
          "Neural networks through to the mechanics behind every modern chatbot.",
          "Neural networks and CNNs in PyTorch",
          "Transfer learning",
          "Computer vision with OpenCV",
          "Text processing and word embeddings",
          "Transformer architecture",
          "Tokenization",
          "Embeddings",
          "Context windows",
          "Attention",
        ],
      },
      {
        title: "Month 3 — Prompting, LLM APIs, RAG & AI Agents",
        points: [
          "Structured prompt engineering across four providers, then retrieval and agents.",
          "Structured prompt engineering",
          "OpenAI, Gemini, Claude and Grok APIs",
          "Local models via Ollama",
          "Vector databases — FAISS, ChromaDB, Pinecone, Qdrant",
          "Semantic search",
          "Full RAG architecture with hybrid search and re-ranking",
          "Agent-building with LangChain",
          "LangGraph",
          "CrewAI",
          "Model Context Protocol (MCP)",
        ],
      },
      {
        title: "Month 4 — AI Applications, Deployment & Capstone",
        points: [
          "Building real interfaces, containerising them, and shipping one complete application.",
          "Building real interfaces with Streamlit, Gradio or Chainlit",
          "Containerising with Docker",
          "Deploying to AWS, Azure AI or Google Vertex AI",
          "One complete, end-to-end AI capstone — LLMs, RAG and agents integrated into a single deployed application",
          "Documentation",
          "GitHub portfolio",
          "Mock interviews",
        ],
      },
    ],
    // Neither pair is written in the brief; both are stated from its own facts.
    practical: {
      title: "It Ends Deployed",
      body: "Docker, cloud deployment and a documented capstone mean the final output is a working application with a live link, not a slide describing one.",
    },
    outcome: {
      label: "Outcome",
      body: "One complete, end-to-end AI application combining a language model, a RAG pipeline and an AI agent, deployed to the cloud with full documentation and a GitHub portfolio entry.",
    },
  },

  // The brief names its toolchain across the four months rather than in a list
  // of its own; every tool below is one it names, with the month it appears in.
  tools: {
    title: "Tools You Will Work With",
    intro:
      "Four months across four model providers, four vector databases and three cloud platforms — because real product teams rarely commit to just one.",
    items: [
      { name: "Python", body: "Month 1 — the language the whole course runs on." },
      { name: "Git & GitHub", body: "Month 1 — version control and the portfolio it becomes." },
      { name: "FastAPI", body: "Month 1 — the API layer behind your applications." },
      { name: "NumPy", body: "Month 1 — arrays and the numeric layer under everything." },
      { name: "Pandas", body: "Month 1 — loading, cleaning and analysing data." },
      { name: "scikit-learn", body: "Month 1 — machine-learning fundamentals." },
      { name: "PyTorch", body: "Month 2 — neural networks, CNNs and transfer learning." },
      { name: "OpenCV", body: "Month 2 — computer vision." },
      { name: "Hugging Face", body: "Month 2 — transformer models and tokenizers." },
      { name: "OpenAI", body: "Month 3 — the first LLM API you call." },
      { name: "Gemini", body: "Month 3 — a second provider to compare against." },
      { name: "Claude", body: "Month 3 — a third, for long-context work." },
      { name: "Grok", body: "Month 3 — a fourth provider in the same codebase." },
      { name: "Ollama", body: "Month 3 — running models locally." },
      { name: "LiteLLM", body: "Month 3 — routing between all of them." },
      { name: "FAISS", body: "Month 3 — local similarity search." },
      { name: "ChromaDB", body: "Month 3 — an embedded vector store." },
      { name: "Pinecone", body: "Month 3 — the hosted vector database." },
      { name: "Qdrant", body: "Month 3 — filtering alongside vector search." },
      { name: "LangChain", body: "Month 3 — chains, prompts and tools." },
      { name: "LangGraph", body: "Month 3 — stateful agent workflows." },
      { name: "CrewAI", body: "Month 3 — multi-agent coordination." },
      { name: "MCP", body: "Month 3 — Model Context Protocol for tool calling." },
      { name: "Streamlit", body: "Month 4 — the fastest route to an interface." },
      { name: "Gradio", body: "Month 4 — demo interfaces for models." },
      { name: "Chainlit", body: "Month 4 — chat interfaces for AI apps." },
      { name: "Docker", body: "Month 4 — containerising the application." },
      { name: "AWS", body: "Month 4 — cloud deployment." },
      { name: "Azure AI", body: "Month 4 — Microsoft's AI platform." },
      { name: "Google Vertex AI", body: "Month 4 — Google's managed AI platform." },
    ],
  },

  who: {
    title: "Who This Program Is For",
    items: [
      {
        title: "Students Straight After 12th",
        body: "From any stream, with zero assumed coding background — can run alongside a college degree using a weekday or weekend batch.",
        icon: "users",
      },
      {
        title: "Graduating BCA / B.Sc / B.Tech Students",
        body: "Who want a deployed AI project to walk into placement season with, instead of a resume built only on coursework.",
        icon: "certificate",
      },
      {
        title: "Working Professionals",
        body: "In Mohali's IT and BPO sector, looking to move into AI-adjacent roles via the weekend track, without quitting a current job first.",
        icon: "briefcase",
      },
      {
        title: "Junior Developers or Data Analysts",
        body: "Who already write some Python — the early foundation moves fast for this group, and the LLM/RAG/agent modules are the real destination.",
        icon: "terminal",
      },
    ],
  },

  worth: {
    title: "What Makes the Curriculum Different",
    items: [
      {
        title: "Six model providers, not one",
        body: "Working across OpenAI, Gemini, Claude, Grok and local Ollama models — plus LiteLLM for routing between them — matters more for employability than deep fluency in a single API, since real product teams rarely commit to just one provider.",
        icon: "layers",
      },
      {
        title: "Retrieval and agents are treated as core, not optional add-ons",
        body: "A large share of current AI hiring in and around Mohali's IT Park is specifically for people who can build a working RAG pipeline or a tool-calling agent — not just prompt a chatbot.",
        icon: "cube",
      },
      {
        title: "It ends deployed",
        body: "Docker, cloud deployment, and a documented capstone mean the final output is a working application with a live link, not a slide describing one.",
        icon: "rocket",
      },
    ],
  },

  whyNow: {
    kicker: "Why now",
    title: "Why This Program Fits Mohali Specifically",
    paragraphs: [
      "Mohali's IT Park (Quark City and the surrounding sectors) and the wider tricity tech ecosystem have shifted hard toward AI-integrated product work over the past two years — companies aren't just hiring \"developers\" anymore, they're hiring people who can wire a large language model into a real application, ground it in company data, and ship it safely.",
      "That shift has outpaced what most degree programs teach. A B.Tech or BCA syllabus in the region still moves slowly toward AI topics, while local product teams and IT-park companies are already hiring for LLM integration, RAG pipelines, and AI agent development today. This program is built to put a 12th-pass or early-degree student directly into that gap — with four months of hands-on build work instead of a four-year wait.",
    ],
    // The brief names what those companies are hiring for inside its own
    // paragraphs; each line below is one of them, with the month that covers it.
    listTitle: "What local teams are hiring for",
    items: [
      { title: "LLM integration", body: "Month 3 — four provider APIs, local models and routing between them." },
      { title: "RAG pipelines", body: "Month 3 — vector databases, hybrid search and re-ranking." },
      { title: "AI agent development", body: "Month 3 — LangChain, LangGraph, CrewAI and MCP tool calling." },
      { title: "Grounding a model in company data", body: "Month 3 — full RAG architecture over your own documents." },
      { title: "Shipping it safely", body: "Month 4 — containerised, deployed and documented, not left on a laptop." },
    ],
  },

  advisor: {
    title: "Talk to a Course Advisor",
    body: "Ten minutes with the techcadd team settles eligibility, batch timings, fees and which of the three AI tracks fits — before you commit four months to it.",
    cta: "Book a Free Demo",
  },

  certificate: {
    title: "Certification & Placement Support",
    intro:
      "Students receive an industry-recognised course completion certificate and a separate capstone project certificate, along with a documented internship letter based on real project work. Placement support includes CV review, mock interviews, portfolio preparation, and hiring drives with partner companies across the tricity region.",
    // The brief writes this as one paragraph; the four cards below are the four
    // things it names, kept in its own wording.
    items: [
      {
        icon: "certificate",
        title: "Course Completion Certificate",
        body: "An industry-recognised certificate for completing the four-month programme.",
      },
      {
        icon: "cube",
        title: "Capstone Project Certificate",
        body: "A separate certificate for the end-to-end AI application you build and deploy.",
      },
      {
        icon: "building",
        title: "Internship Letter",
        body: "A documented internship letter based on real project work.",
      },
      {
        icon: "briefcase",
        title: "Placement Support",
        body: "CV review, mock interviews, portfolio preparation, and hiring drives with partner companies across the tricity region.",
      },
    ],
  },

  takesYou: {
    title: "Career Paths This Opens",
    // The brief writes this as a two-column table; the intro states what the
    // six rows have in common.
    intro:
      "Six roles the four months point at, from the model layer through to the deployed product.",
    listTitle: "Role and what it involves",
    steps: [
      {
        title: "AI Engineer",
        body: "Building and shipping systems with models embedded — retrieval, agents, APIs, deployment.",
      },
      {
        title: "Machine Learning Engineer",
        body: "Model-focused work: PyTorch, neural networks, computer vision, transfer learning.",
      },
      {
        title: "LLM Engineer",
        body: "Owning the model layer — tokenization, context windows, multi-provider routing, cost/latency tradeoffs.",
      },
      {
        title: "AI Agent Developer",
        body: "Tool-calling systems, multi-agent coordination via LangChain/LangGraph/CrewAI.",
      },
      {
        title: "AI Application Developer",
        body: "Full product build — FastAPI backend, deployed interface, containerised and cloud-hosted.",
      },
      {
        title: "Junior AI Developer",
        body: "Entry-level support role on a live AI feature, prompt tuning, evaluation data curation.",
      },
    ],
  },

  // The brief describes only the capstone; the five builds before it are the
  // work each month already produces, named here so the run-up is visible.
  projects: {
    title: "What You Build Along the Way",
    items: [
      {
        title: "First API Service",
        body: "A working FastAPI service that reads and returns JSON, version-controlled on GitHub. Month 1 · Python · FastAPI · Git",
      },
      {
        title: "Machine Learning Model",
        body: "A trained and evaluated scikit-learn model over a real dataset prepared with NumPy and Pandas. Month 1 · scikit-learn · Pandas · NumPy",
      },
      {
        title: "Computer Vision Build",
        body: "A CNN in PyTorch with transfer learning, applied to images through OpenCV. Month 2 · PyTorch · OpenCV",
      },
      {
        title: "RAG Pipeline",
        body: "A retrieval system over your own documents with a vector database, hybrid search and re-ranking. Month 3 · FAISS/Chroma/Pinecone/Qdrant",
      },
      {
        title: "Tool-Calling Agent",
        body: "An agent that uses tools and completes a multi-step task, built with LangGraph, CrewAI and MCP. Month 3 · LangChain · LangGraph · CrewAI · MCP",
      },
      {
        title: "End-to-End AI Capstone",
        body: "One complete application — LLMs, RAG and agents integrated, containerised and deployed to the cloud, backed by documentation, a GitHub portfolio and mock interviews. Month 4 · Docker · AWS / Azure AI / Vertex AI",
      },
    ],
  },

  // The brief states the sequence but writes no cycle of its own; these four
  // stages are that sequence, named.
  approach: {
    title: "Foundations. Frameworks. Build. Deploy.",
    paragraphs: [
      "Foundations before frameworks, understanding before frameworks, and building before deploying — applied to every topic in the course.",
    ],
    items: [
      {
        title: "Foundations",
        body: "The programming, engineering practice and applied maths under the topic, before any library is introduced.",
        icon: "layers",
      },
      {
        title: "Understanding",
        body: "What the model or system is actually doing — tokenization, attention, retrieval — before a framework hides it.",
        icon: "search",
      },
      {
        title: "Build",
        body: "Write the thing yourself, with the framework, until it works on your own data.",
        icon: "terminal",
      },
      {
        title: "Deploy",
        body: "Containerise it, put it on a cloud platform, document it, and be able to hand over the link.",
        icon: "rocket",
      },
    ],
  },

  // The brief writes no "why techcadd" block; these five points are its own
  // claims about the programme, restated as reasons to take it here.
  whyUs: {
    kicker: "Why techcadd",
    title: "Built for the Gap Mohali Is Hiring Into",
    intro:
      "Four months of hands-on build work aimed at what local product teams and IT-park companies are recruiting for today.",
    items: [
      {
        title: "Four Months, Not Four Years",
        body: "Built to put a 12th-pass or early-degree student directly into the gap between what degree syllabi teach and what local teams are hiring for.",
        icon: "target",
      },
      {
        title: "Practical-First",
        body: "Theory runs alongside the build work rather than ahead of it, so every concept lands against something you are making.",
        icon: "cube",
      },
      {
        title: "No Assumed Background",
        body: "It starts from Python fundamentals, adding OOP, APIs and applied maths before any machine-learning topic appears.",
        icon: "layers",
      },
      {
        title: "Batches That Fit Around a Degree",
        body: "Weekday, evening and weekend options exist specifically so the programme can run in parallel with ongoing BCA, B.Sc or B.Tech coursework.",
        icon: "clock",
      },
      {
        title: "A Portfolio, Not a Transcript",
        body: "You finish with a deployed application, documentation and a GitHub portfolio entry to take into placement season.",
        icon: "briefcase",
      },
    ],
  },

  // The brief names no related programmes; these are this one's neighbours in
  // the After 12th menu, using the slugs it reserves in `@/lib/site`.
  popular: {
    title: "Popular Courses",
    intro: "The same subject at other lengths, and the tracks closest to it.",
    items: [
      {
        title: "After 12th 6-Month Artificial Intelligence Certificate Program",
        body: "The same core topics with room for machine-learning depth, a separated NLP block, a four-part agent track and a dedicated AI security module.",
        href: "/after-12th/artificial-intelligence-certificate-program",
      },
      {
        title: "After 12th 9-Month Artificial Intelligence Diploma Program",
        body: "The full path — the data layer beneath AI, MLOps and fine-tuning above it, and a month reserved for an enterprise capstone.",
        href: "/after-12th/artificial-intelligence-diploma-program",
      },
      {
        title: "After 12th 3-Month Agentic AI Program",
        body: "A shorter route straight at AI agents, tool usage and modern LLM application concepts.",
        href: "/courses/after12th/agentic-ai",
      },
      {
        title: "After 12th 6-Month Data Science Certificate Program",
        body: "The data route to the same technologies — analysis, statistics, machine learning and generative AI.",
        href: "/after-12th/data-science-certificate-program",
      },
      {
        title: "After 12th 4-Month Data Analytics & Business Analysis Program",
        body: "Excel, SQL, Power BI and business analysis for reporting-focused roles.",
        href: "/courses/after12th/data-analytics",
      },
      {
        title: "After 12th 3-Month Full Stack Development Program",
        body: "Build the web applications AI features are usually delivered inside.",
        href: "/courses/after12th/full-stack-development",
      },
    ],
  },

  faqs: [
    {
      q: "Is this program suitable for a complete beginner with no coding background?",
      a: "Yes. It starts from Python fundamentals in Month 1, adding object-oriented programming, APIs, and applied math before any machine-learning or deep-learning topic is introduced.",
    },
    {
      q: "How is this different from a standard data science course?",
      a: "Data science focuses on analysing existing data. This program focuses on building AI-powered software — deep learning models, LLM integrations, retrieval pipelines, and autonomous agents — culminating in a deployed application rather than an analysis report.",
    },
    {
      q: "Which AI models and tools will I actually use during the course?",
      a: "OpenAI, Gemini, Claude, and Grok APIs, local models through Ollama, PyTorch and Hugging Face for model work, and LangChain, LangGraph, and CrewAI for agent development.",
    },
    {
      q: "What exactly will I have built by the end of four months?",
      a: "One complete, end-to-end AI application — the capstone — combining a language model, a RAG pipeline, and an AI agent, deployed to the cloud with full documentation and a GitHub portfolio entry.",
    },
    {
      q: "Is a job guaranteed after completing the program?",
      a: "No responsible training provider can guarantee employment, and it's worth being cautious of any Mohali institute that claims otherwise. What's realistic to expect is structured placement support — CV reviews, mock interviews, and hiring-partner drives — alongside a real, demonstrable project.",
    },
    {
      q: "Can this run alongside a college degree?",
      a: "Yes. Weekday, evening, and weekend batch options exist specifically so the program can run in parallel with ongoing BCA, B.Sc, or B.Tech coursework.",
    },
  ],

  // The brief writes no contact block; the page already renders the centre's
  // real details from `@/lib/site`, so only the wording is carried here.
  enquiry: {
    title: "Ask About the Artificial Intelligence Program in Mohali",
    paragraphs: [
      "Want to know which of the three AI tracks — four months, six months or the nine-month diploma — fits your background and the time you have?",
      "Speak with a course advisor about batch timings, fees, eligibility, the capstone and the placement support that comes with it.",
      "Location: Mohali, Punjab.",
    ],
  },

  // The brief names no closing list; these are its own highlights, the facts a
  // reader still deciding is weighing.
  fit: {
    title: "Not Sure If Four Months Is the Right Length?",
    paragraphs: [
      "A counselling session can help you compare the four-month programme against the six-month certificate and the nine-month diploma before you commit.",
      "All three start from Python fundamentals with no assumed coding background — the difference is how much depth there is room for, and how far past the first deployed application you go.",
    ],
    ctaTitle: "Get Started Today",
    points: [
      "4 months, 12th pass, any stream",
      "No assumed coding background — Python from scratch",
      "PyTorch, CNNs, transfer learning and computer vision",
      "Four model providers plus local models and routing",
      "Vector databases, full RAG, LangGraph, CrewAI and MCP",
      "Docker and deployment to AWS, Azure AI or Vertex AI",
      "One deployed capstone, documented, with a GitHub portfolio",
    ],
  },
};

/** Slugs whose After-12th page is written rather than derived. */
export const after12Pages: Record<string, After12Page> = {
  // After 12th 3-Month Program
  "cloud-computing": cloudComputing,
  flutter,
  "mern-full-stack": mernFullStack,
  "agentic-ai": agenticAi,
  "digital-marketing": digitalMarketing,
  "digital-marketing-program-4-months": seoPerformanceMarketing,
  "data-analytics": dataAnalytics,
  "data-science": dataScience,
  "cyber-security": cyberSecurity,
  "artificial-intelligence": artificialIntelligence,
  "full-stack-development": fullStackDevelopment,

  // After 12th 6-Month Certificate Program
  "cloud-computing-certificate-program": cloudComputingCertificate,
  "flutter-app-development-diploma-certificate-program": flutterCertificate,
  "mern-stack-certificate-program": mernCertificate,
  "agentic-ai-certificate-program": agenticAiCertificate,
  "digital-marketing-certificate-program": digitalMarketingCertificate,
  "data-analytics-certificate-program": dataAnalyticsCertificate,
  "data-science-certificate-program": dataScienceCertificate,
  "cyber-security-certificate-program": cyberSecurityCertificate,
  "artificial-intelligence-certificate-program": artificialIntelligenceCertificate,
  "full-stack-development-certificate-program": fullStackDevelopmentCertificate,

  // After 12th 9-Month Diploma Program
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
