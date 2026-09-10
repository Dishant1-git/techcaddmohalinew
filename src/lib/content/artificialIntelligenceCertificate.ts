import type { CourseOverride } from "@/lib/content/overrides";
import type { WrittenCertificateHero, WrittenHeading } from "@/lib/content/mernCertificate";

/**
 * The Certificate Programs menu's Artificial Intelligence page, at
 * `/courses/certificate-programs/artificial-intelligence`.
 *
 * The same catalogue course the Courses and AI menus list, written to its own
 * brief: a structured path from Python and mathematics fundamentals through
 * Machine Learning, Deep Learning, NLP, Computer Vision and Generative AI,
 * taught through datasets, models and practical projects rather than theory
 * alone.
 *
 * No `comparison`: this brief makes its case in prose only. No `tracks`
 * export either — the brief names no specific 3/6/9-month breakdown, so
 * `@/lib/certificateTracks` derives the three lengths from this record's own
 * module and tool counts rather than from an invented one.
 */

/* -------------------------------------------------------------------------- *
 *                                    Hero                                     *
 * -------------------------------------------------------------------------- */

export const artificialIntelligenceCertificateHero: WrittenCertificateHero = {
  title: "Artificial Intelligence Diploma Program in Mohali — From Python to Generative AI",
  lead: "A structured learning path from programming and mathematics fundamentals to Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Generative AI and practical AI project development — for students, graduates, beginners, job seekers and working professionals who want to build real AI skills, not just use AI tools.",
  primaryCta: "Book My Free Counselling Call",
  secondaryCta: "Request a Callback",
  points: [
    "A complete learning path — Python, data handling, Machine Learning, Deep Learning, NLP, Computer Vision, Generative AI and AI projects",
    "Practical, project-based learning with datasets, models, evaluation and real AI applications",
    "No prior AI experience required — the program starts from programming and AI fundamentals",
    "Career-focused learning with resume preparation, interview preparation and portfolio development",
  ],
  highlights: [
    { icon: "monitor", label: "Mode", value: "Classroom & Online" },
    { icon: "cloud", label: "Focus", value: "ML, DL, NLP & Generative AI" },
    { icon: "terminal", label: "Training", value: "Practical & Project-Based" },
    { icon: "briefcase", label: "Level", value: "Beginner to Advanced" },
  ],
};

/* -------------------------------------------------------------------------- *
 *                            The catalogue record                             *
 * -------------------------------------------------------------------------- */

export const artificialIntelligenceCertificateOverride: CourseOverride = {
  contentKey: "artificial-intelligence--certificate",
  duration: "3 – 9 Months",
  level: "Beginner",
  blurb:
    "Python, Machine Learning, Deep Learning, NLP, Computer Vision and Generative AI — a structured, practical path to building real AI applications, taught in Mohali.",
  overview:
    "The Artificial Intelligence Diploma Program in Mohali provides a structured learning path from programming and mathematics fundamentals to Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Generative AI and practical AI project development. Students learn how Artificial Intelligence systems work and how AI models can be trained, evaluated, improved and integrated into real-world applications. The program focuses on practical learning rather than theory alone — students work with programming exercises, datasets, machine learning models, AI tools, practical assignments and real-world projects. Whether you are a complete beginner, a 12th-pass student, college student, graduate, job seeker or working professional, this program can provide a structured foundation for building AI skills.",
  modules: [
    {
      title: "Python & Data Foundations",
      blurb: "The programming and data-handling base every AI topic builds on.",
      points: [
        "Python programming — variables, data types, control flow, functions, OOP basics, file and exception handling",
        "NumPy and Pandas — arrays, DataFrames, data cleaning, filtering, grouping and transformation",
        "Data visualization and preprocessing — missing values, encoding, feature scaling and train-test splitting",
      ],
    },
    {
      title: "Machine Learning",
      blurb: "Teaching a model to find patterns in data and make predictions.",
      points: [
        "Supervised learning — Linear and Logistic Regression, Decision Trees, Random Forest, KNN, SVM",
        "Unsupervised learning — clustering, K-Means, hierarchical clustering and dimensionality reduction concepts",
        "Model evaluation and feature engineering with Scikit-learn — accuracy, precision, recall, F1 score, cross-validation",
      ],
    },
    {
      title: "Deep Learning, NLP & Computer Vision",
      blurb: "Neural networks, and the language and vision systems built on them.",
      points: [
        "Deep Learning fundamentals — neural networks, activation and loss functions, backpropagation and training",
        "Natural Language Processing — text preprocessing, tokenization, text classification, sentiment analysis and chatbot concepts",
        "Computer Vision — image processing, image classification, CNN concepts and object detection concepts",
      ],
    },
    {
      title: "Generative AI & Projects",
      blurb: "Modern AI systems, and shipping something that uses them.",
      points: [
        "Generative AI fundamentals — Large Language Models, prompt engineering, AI APIs and responsible AI concepts",
        "AI API integration — authentication, requests, responses and building application workflows around a model",
        "Real-world AI projects and portfolio development, with resume and interview preparation",
      ],
    },
  ],
  tools: [
    "Python",
    "NumPy & Pandas",
    "Matplotlib",
    "Scikit-learn",
    "TensorFlow",
    "Jupyter Notebook / Google Colab",
    "Git",
  ],
  outcomes: [
    "Clean, prepare and visualize a dataset, and train, evaluate and improve a Machine Learning model",
    "Explain how neural networks, NLP and Computer Vision systems work, with hands-on exposure to each",
    "Use prompt engineering and AI APIs to build a Generative-AI-powered application",
    "Assemble a portfolio of AI projects and present it credibly in a technical interview",
  ],
  roles: [
    "AI Developer",
    "Machine Learning Developer",
    "Junior Machine Learning Engineer",
    "AI Application Developer",
    "NLP / Computer Vision Developer",
    "Generative AI Developer",
  ],
};

/* -------------------------------------------------------------------------- *
 *                              Section headings                               *
 * -------------------------------------------------------------------------- */

export const artificialIntelligenceCertificateHeadings: Record<string, WrittenHeading> = {
  tracks: {
    index: "—",
    eyebrow: "Programme lengths",
    title: "Choose Your Artificial Intelligence Track in Mohali",
    intro:
      "One subject, three depths. Each track builds on the last, so a shorter option costs you scope, not foundation.",
  },
  overview: { index: "01", eyebrow: "Programme brief", title: "Course Overview" },
  modules: { index: "02", eyebrow: "Syllabus of record", title: "What You'll Actually Build" },
  learn: {
    index: "03",
    eyebrow: "Competencies covered",
    title: "What You'll Learn in the Artificial Intelligence Diploma Program",
  },
  why: { index: "04", eyebrow: "Standing", title: "Why Choose the Artificial Intelligence Diploma Program?" },
  who: {
    index: "05",
    eyebrow: "Eligibility & admission",
    title: "Who Can Do This Course?",
    intro:
      "Previous professional Artificial Intelligence experience is not required — the program can start from programming and AI fundamentals and gradually move toward Machine Learning, Deep Learning, Generative AI and practical projects.",
  },
  tools: {
    index: "06",
    eyebrow: "Tools & technologies",
    title: "Tools & Technologies Students May Work With",
    intro:
      "Depending on the current AI curriculum, students may work with the following — the exact tools should be confirmed with the current Techcadd Mohali batch before treating them as fixed curriculum details:",
  },
  certification: { index: "07", eyebrow: "The award", title: "Certification & Support" },
  scope: { index: "08", eyebrow: "Career opportunities", title: "Career Opportunities After Artificial Intelligence Training" },
  projects: { index: "09", eyebrow: "Deliverables", title: "Real-World AI Projects You Will Ship" },
  institute: {
    index: "10",
    eyebrow: "The comparison",
    title: "Why Choose Techcadd for Artificial Intelligence Training in Mohali",
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

export const artificialIntelligenceCertificateSections = [
  { id: "overview", label: "Overview" },
  { id: "modules", label: "What you build" },
  { id: "learn", label: "What you learn" },
  { id: "why", label: "Worth your time" },
  { id: "who", label: "Who should join" },
  { id: "tools", label: "Tools" },
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
 *          "Why Choose the Artificial Intelligence Diploma Program?"          *
 * -------------------------------------------------------------------------- */

export const artificialIntelligenceCertificateWhyChoose = [
  {
    icon: "layers",
    title: "A Complete Learning Path, Not Isolated Topics",
    body: "Python → Data Handling → Machine Learning → Deep Learning → NLP → Computer Vision → Generative AI → AI Projects — a structured path from fundamentals to practical AI development.",
  },
  {
    icon: "terminal",
    title: "Practical, Project-Based Learning",
    body: "Students practice writing Python programs, working with datasets, training and evaluating Machine Learning models, and building prediction, text and image applications — not theory alone.",
  },
  {
    icon: "cloud",
    title: "Generative AI, Covered Properly",
    body: "Large Language Model concepts, prompt engineering, AI APIs and AI-powered applications are taught as part of the path, not bolted on as a buzzword module.",
  },
  {
    icon: "briefcase",
    title: "Career-Focused, End to End",
    body: "Resume preparation, AI project presentation, interview preparation and portfolio development sit alongside the technical curriculum.",
  },
];

/* -------------------------------------------------------------------------- *
 *                          "Who Can Do This Course?"                          *
 * -------------------------------------------------------------------------- */

export const artificialIntelligenceCertificateAudience = [
  {
    icon: "users",
    title: "12th-Pass & College Students",
    body: "12th-pass students can start learning AI with a gradual introduction to programming and AI concepts; BCA, B.Tech, MCA, BSc-IT and BSc students can learn alongside their academic education.",
  },
  {
    icon: "certificate",
    title: "Graduates & Job Seekers",
    body: "Graduates from technical backgrounds can explore AI, Machine Learning, Data Science and AI application development; job seekers can build a portfolio of practical AI projects.",
  },
  {
    icon: "briefcase",
    title: "Working Professionals & Career Switchers",
    body: "Professionals can upgrade their technical skills, explore automation opportunities, or use structured AI training as a starting point for a technology-focused career move.",
  },
  {
    icon: "rocket",
    title: "Beginners & Python Beginners",
    body: "Anyone curious about ChatGPT, Generative AI, computer vision or AI automation can start here; Python beginners can learn the language before progressing to Machine Learning and AI.",
  },
  {
    icon: "code",
    title: "Data Enthusiasts",
    body: "People interested in data analysis, prediction, patterns and intelligent systems can learn how Machine Learning models use data to make predictions and classifications.",
  },
  {
    icon: "target",
    title: "Entrepreneurs",
    body: "Business owners and entrepreneurs interested in AI-powered automation, chatbots, recommendation systems or intelligent business solutions can learn AI fundamentals.",
  },
];

export const artificialIntelligenceCertificateEligibility = [
  "12th-pass students, college students (BCA/B.Tech/MCA/BSc-IT/BSc) and graduates from technical backgrounds",
  "Job seekers, working professionals and career switchers looking to move toward AI-related roles",
  "Beginners interested in ChatGPT, Generative AI, computer vision or AI automation",
  "Python beginners and data enthusiasts interested in prediction, patterns and intelligent systems",
  "Entrepreneurs interested in AI-powered automation, chatbots or data-driven applications",
  "No prior professional Artificial Intelligence experience required — the program starts from fundamentals",
];

/* -------------------------------------------------------------------------- *
 *                        "Certification & Support"                            *
 * -------------------------------------------------------------------------- */

export const artificialIntelligenceCertificateCertification = [
  {
    icon: "certificate",
    title: "Course completion certificate",
    body: "issued on completing the programme, subject to the institute's certification requirements",
  },
  {
    icon: "layers",
    title: "Portfolio of AI projects",
    body: "prediction systems, classification models, an NLP or computer vision project and a Generative AI application you can show in an interview",
  },
  {
    icon: "users",
    title: "Trainer guidance & doubt-clearing",
    body: "AI development involves programming, data preparation, model errors, debugging and evaluation — trainer guidance helps students work through these step by step",
  },
  {
    icon: "briefcase",
    title: "Resume & interview preparation",
    body: "resume preparation, AI project presentation and technical interview preparation alongside the technical curriculum",
  },
];

/* -------------------------------------------------------------------------- *
 *          "Career Opportunities After Artificial Intelligence Training"      *
 * -------------------------------------------------------------------------- */

export const artificialIntelligenceCertificateScope = [
  {
    q: "Job roles",
    a: "After developing the required technical skills, practical projects and portfolio, students can explore roles such as AI Developer, Machine Learning Developer, Junior Machine Learning Engineer, Artificial Intelligence Engineer, AI Application Developer, Python Developer, Junior Data Scientist, NLP Developer, Computer Vision Developer, Generative AI Developer and AI Automation Developer.",
  },
  {
    q: "Where the skills apply",
    a: "AI, Machine Learning and Generative AI skills are increasingly relevant across software, data, automation and product roles, not confined to titles with \"AI\" in them.",
  },
  {
    q: "Becoming job-ready",
    a: "This program provides a foundation for AI development. Becoming job-ready also requires regular coding practice, Machine Learning knowledge, strong projects, problem-solving skills and continued learning.",
  },
];

/* -------------------------------------------------------------------------- *
 *                 "Real-World AI Projects You Will Ship"                      *
 * -------------------------------------------------------------------------- */

export const artificialIntelligenceCertificateProjects = [
  {
    label: "Project 1",
    title: "Prediction / Classification System",
    body: "Train, evaluate and improve a supervised learning model on a real dataset — regression or classification.",
  },
  {
    label: "Project 2",
    title: "NLP Application",
    body: "Build a text classification, sentiment analysis or chatbot-style application using NLP concepts.",
  },
  {
    label: "Project 3",
    title: "Computer Vision Application",
    body: "Apply image classification or CNN concepts to a practical image-based use case.",
  },
  {
    label: "Project 4",
    title: "Generative AI Application",
    body: "Integrate an AI API and prompt engineering into a working Generative AI-powered application.",
  },
];

/* -------------------------------------------------------------------------- *
 *      "Why Choose Techcadd for Artificial Intelligence Training in Mohali"   *
 * -------------------------------------------------------------------------- */

export const artificialIntelligenceCertificateInstitute = [
  {
    icon: "terminal",
    title: "Practical AI training",
    body: "learning through coding exercises, datasets, models, assignments and AI projects, not theory alone.",
  },
  {
    icon: "rocket",
    title: "Beginner-friendly learning",
    body: "students can begin with Python and fundamental concepts before progressing toward Machine Learning and advanced AI technologies.",
  },
  {
    icon: "layers",
    title: "Project-based training",
    body: "opportunities to apply AI concepts through practical projects instead of studying concepts only theoretically.",
  },
  {
    icon: "briefcase",
    title: "Career-focused approach",
    body: "guidance on resume preparation, AI project presentation, interview preparation, technical interview questions, portfolio development and career direction.",
  },
];

/* -------------------------------------------------------------------------- *
 *                      "Classroom & Online Learning"                          *
 * -------------------------------------------------------------------------- */

export const artificialIntelligenceCertificateModes = [
  {
    icon: "building",
    title: "Classroom Training",
    body: "In-person sessions with hands-on practice, depending on current batch availability.",
  },
  {
    icon: "monitor",
    title: "Online Learning",
    body: "Classroom and online learning options may be available depending on the current batches and schedule — enquire for current availability.",
  },
];

/* -------------------------------------------------------------------------- *
 *                       "Frequently Asked Questions"                          *
 * -------------------------------------------------------------------------- */

export const artificialIntelligenceCertificateFaqs = [
  {
    q: "What is an Artificial Intelligence Diploma Program?",
    a: "An Artificial Intelligence Diploma Program teaches students the fundamentals and practical applications of AI, including Python, Machine Learning, Deep Learning, NLP, Computer Vision, Generative AI and AI application development.",
  },
  {
    q: "Is prior AI experience required?",
    a: "No. Beginners can start with programming and AI fundamentals before progressing toward Machine Learning and advanced AI topics.",
  },
  {
    q: "Who can join the Artificial Intelligence Diploma Program?",
    a: "12th-pass students, college students, graduates, BCA/B.Tech/MCA students, job seekers, working professionals, freelancers and beginners interested in AI can join.",
  },
  {
    q: "Can I learn Artificial Intelligence after 12th?",
    a: "Yes. Students who have completed 12th can start learning AI through a structured program that begins with programming fundamentals.",
  },
  {
    q: "Is Python required for Artificial Intelligence?",
    a: "Python is widely used in Artificial Intelligence and Machine Learning. Learning Python fundamentals provides a useful foundation for AI development.",
  },
  {
    q: "Is Artificial Intelligence difficult for beginners?",
    a: "AI involves programming, mathematics, data and Machine Learning concepts, so it can be challenging initially. A structured curriculum and regular practical practice can make the learning process easier.",
  },
  {
    q: "Does the course include Machine Learning?",
    a: "Yes. Machine Learning fundamentals, supervised learning, unsupervised learning, model training, prediction and model evaluation can be included.",
  },
  {
    q: "Does the course include Deep Learning?",
    a: "Yes. Students can learn neural network and Deep Learning fundamentals along with practical applications.",
  },
  {
    q: "Does the course include Generative AI?",
    a: "Generative AI concepts can be included, covering topics such as Large Language Models, prompt engineering, AI APIs and AI-powered application development.",
  },
  {
    q: "Does the course include Natural Language Processing and Computer Vision?",
    a: "Yes. NLP concepts can include text processing, classification, sentiment analysis and chatbot concepts, and Computer Vision can include image processing, image classification and CNN concepts.",
  },
  {
    q: "Does the program include practical AI projects?",
    a: "Yes. Projects can include prediction systems, classification applications, recommendation systems, chatbots, sentiment analysis, computer vision applications and Generative AI applications.",
  },
  {
    q: "Can I become an AI Developer after this course?",
    a: "The program can provide a foundation for AI development. Becoming job-ready also requires regular coding practice, Machine Learning knowledge, strong projects, problem-solving skills and continued learning.",
  },
  {
    q: "Does the program include placement assistance?",
    a: "Placement and career-support services should be confirmed with the current Techcadd Mohali centre before relying on specific placement claims.",
  },
  {
    q: "Does Techcadd provide Artificial Intelligence training in Mohali?",
    a: "Yes, Techcadd offers career-focused AI training in Mohali, including Python, Machine Learning, Deep Learning, NLP, Computer Vision and Generative AI.",
  },
  {
    q: "Is Artificial Intelligence training available online?",
    a: "Training availability can depend on the current batch and schedule. Students can enquire about available classroom and online learning options.",
  },
];

/* -------------------------------------------------------------------------- *
 *                "Start Your Artificial Intelligence Career in Mohali"        *
 * -------------------------------------------------------------------------- */

export const artificialIntelligenceCertificateClosing = {
  title: "Start Your Artificial Intelligence Career in Mohali",
  body: "Don't just use AI tools — understand how Artificial Intelligence works. Learn Python, Data Handling, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Generative AI, Prompt Engineering, AI APIs and practical AI projects with Techcadd, Mohali.",
  primaryCta: "Book My Free Counselling Call",
  secondaryCta: "Request a Callback",
};
