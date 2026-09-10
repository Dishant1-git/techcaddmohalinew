import type { Course } from "@/lib/courses";
import type { CourseReview, LearnDetail, SectionCopy } from "@/lib/coursePage";

/**
 * The AI menu's All AI Courses page, at `/courses/ai/all-ai-courses`.
 *
 * The menu's map of every AI pathway it offers, and one of the courses whose
 * record does not come from the catalogue in `@/lib/courses`. It belongs to
 * the AI menu alone — the Courses, Certificate Programs and After 12th routes
 * never serve this slug — so the copy below appears on exactly one page. The
 * AI panel's "All AI courses in Mohali" link, which used to point at the
 * catalogue listing, now points here.
 *
 * Everything here is the supplied copy, reproduced as written. Where a section
 * of the detail page had no copy in that brief — the outcomes, the eligibility
 * checklist and the comparison — it is composed from the same brief rather
 * than invented, so the page never states anything the copy does not.
 *
 * One thing to act on before this page carries weight: the brief's own note
 * says the ten reviews below are sample testimonial-style placeholders for
 * layout, and each should be replaced with a verified student review before it
 * stands as a genuine testimonial.
 *
 * Types are imported with `import type` on purpose: `@/lib/coursePage` reads
 * the values below, so a value import here would close a runtime cycle.
 */

/* -------------------------------------------------------------------------- *
 *                              The course record                              *
 * -------------------------------------------------------------------------- */

export const allAiCoursesCourse: Course = {
  slug: "all-ai-courses",
  title: "All AI Courses",
  category: "ai-data",
  duration: "3 – 9 Months",
  level: "Beginner → Advanced",
  badge: "New",
  blurb:
    "Every AI learning path in one place — foundations, Generative AI, Prompt Engineering, Agentic AI, RAG, Machine Learning, Deep Learning, NLP, Computer Vision and data, with 3-, 6- and 9-month levels.",
  overview:
    "Artificial Intelligence is changing how software is developed, businesses operate, data is analysed and digital work is performed. Techcadd's All AI Courses in Mohali bring multiple AI learning paths together so students can choose the right direction according to their interests, educational background and career goals.\n\nWhether you are a 12th-pass student, graduate, BCA/BTech/MCA student, job seeker, working professional, freelancer or aspiring AI developer, you can start with foundational concepts and progress toward practical AI applications.\n\nThe learning ecosystem covers Artificial Intelligence, Generative AI, Prompt Engineering, ChatGPT and AI Tools, Agentic AI, RAG, Machine Learning, Deep Learning, Data Science, Data Analytics and AI-powered development.\n\nThe AI and data pathway also progresses from Python and data handling toward machine learning, deep learning, NLP, computer vision, LLMs, RAG and AI application development. The reference curriculum provides 3-month, 6-month and 9-month learning levels with increasing depth.\n\nFor students looking for AI courses in Mohali, the goal is not simply to learn definitions. The focus is on developing usable skills, completing projects and understanding how AI technologies are applied in real professional environments.",

  /* The five levels of "What Will You Learn?", then the three duration tracks
     of "AI Course Duration in Mohali" — the brief's own two ways of laying the
     same ladder out. The pathway prose is in `allAiCoursesLearn` below. */
  modules: [
    {
      title: "Foundation Level",
      blurb: "Where every track starts, whatever you specialise in later.",
      points: [
        "AI fundamentals",
        "Python basics",
        "Python data structures",
        "OOP",
        "File handling",
        "NumPy",
        "Pandas",
        "Data visualization",
      ],
    },
    {
      title: "Machine Learning Level",
      blurb: "Learning patterns from data, and knowing which algorithm to reach for.",
      points: [
        "ML fundamentals",
        "Regression",
        "Classification",
        "Feature engineering",
        "Model evaluation",
        "Advanced machine learning",
        "Clustering",
        "PCA",
        "Ensemble learning",
      ],
    },
    {
      title: "Deep Learning Level",
      blurb: "Neural networks, and the architectures built on them.",
      points: ["Neural networks", "ANN", "CNN", "RNN", "LSTM", "GRU"],
    },
    {
      title: "Advanced AI Level",
      blurb: "Language, vision and generative systems — where most current AI work sits.",
      points: [
        "NLP",
        "Embeddings",
        "Computer Vision",
        "Object detection",
        "Generative AI",
        "LLMs",
        "RAG",
        "Vector databases",
        "Prompt engineering",
        "Tool calling",
        "AI application development",
      ],
    },
    {
      title: "Production Level",
      blurb: "Turning a model into something that runs, and keeps running.",
      points: [
        "APIs",
        "Database integration",
        "Authentication",
        "Git",
        "Deployment",
        "Monitoring",
        "Capstone projects",
      ],
    },
    {
      title: "3 Months – Practitioner Track",
      blurb:
        "A shorter practical pathway for students who want to establish a strong foundation.",
      points: [
        "Python Fundamentals",
        "Python Data Structures",
        "OOP & File Handling",
        "NumPy & Pandas",
        "Data Visualization",
        "Machine Learning Fundamentals",
        "Advanced ML",
        "Deep Learning Basics",
        "AI Project & Deployment",
      ],
    },
    {
      title: "6 Months – Professional Track",
      blurb: "A deeper learning route that can add:",
      points: [
        "Excel for data analysis",
        "Exception handling",
        "Statistics",
        "Probability",
        "Feature engineering",
        "Clustering",
        "PCA",
        "Advanced machine learning",
        "More substantial project work",
      ],
    },
    {
      title: "9 Months – Expert Track",
      blurb: "The most comprehensive pathway can progress toward:",
      points: [
        "Sequence models",
        "NLP",
        "Embeddings",
        "Computer Vision",
        "YOLO",
        "Generative AI",
        "LLMs",
        "RAG",
        "Advanced GenAI",
        "AI application development",
        "Deployment",
        "Production workflows",
        "Capstone project",
      ],
    },
  ],

  tools: [
    "Python",
    "Jupyter Notebook",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "scikit-learn",
    "TensorFlow",
    "PyTorch",
    "OpenCV",
    "YOLO",
    "Hugging Face",
    "LangChain",
    "Streamlit",
    "Flask",
    "FastAPI",
    "SQL",
    "Git",
    "GitHub",
    "FAISS",
    "Pinecone",
    "ChatGPT",
    "Claude",
    "AI APIs",
  ],

  outcomes: [
    "A portfolio built across Python, machine learning, deep learning, NLP, vision and Generative AI projects",
    "A capstone AI application with an API, database and deployment",
    "Mentor-reviewed work, improved through feedback rather than submitted once",
    "A Techcadd certificate for the learning track completed",
    "Resume support, interview preparation and introductions to hiring partners",
  ],

  /* The roles the brief lists under "Career Opportunities After AI Training". */
  roles: [
    "AI Trainee",
    "Machine Learning Engineer",
    "Junior AI Developer",
    "Python Developer",
    "Data Analyst",
    "AI Application Developer",
    "GenAI Developer",
    "LLM Application Developer",
    "NLP Developer",
    "Computer Vision Developer",
    "AI Automation Specialist",
  ],
};

/* -------------------------------------------------------------------------- *
 *                                    SEO                                      *
 * -------------------------------------------------------------------------- */

export const allAiCoursesSeo = {
  title: "All AI Courses in Mohali | AI, GenAI, ML & Data Training – Techcadd",
  description:
    "Every Techcadd AI learning path in Mohali — AI fundamentals, Generative AI, Prompt Engineering, Agentic AI, RAG, Machine Learning, Deep Learning, NLP, Computer Vision and Data Science, across 3-, 6- and 9-month tracks.",
};

/* -------------------------------------------------------------------------- *
 *                             Section headings                                *
 * -------------------------------------------------------------------------- */

export const allAiCoursesSectionCopy: Partial<
  Record<"hero" | "learn" | "why" | "who" | "tools" | "scope" | "enquire", SectionCopy>
> = {
  hero: {
    title: "Build Practical AI Skills for the Careers of Tomorrow",
  },
  learn: {
    title: "Explore Your AI Learning Path",
  },
  why: {
    title: "Why Learn All AI Courses in Mohali?",
    intro:
      "Mohali has developed into an important technology, education and business destination in the Chandigarh Tricity region. Students increasingly want technology skills that can connect classroom learning with practical career opportunities. A broad AI learning program can be useful because Artificial Intelligence is not limited to one job role — AI skills connect with software development, data analytics, machine learning, Generative AI, digital marketing, business automation, AI application development, research and experimentation, content and creative workflows, and intelligent data-driven systems. Instead of selecting an advanced specialization without understanding the basics, students can begin with foundational AI concepts and gradually identify the area that best matches their strengths.",
    note: "The goal should not simply be to add “AI” to a resume. Students should be able to explain what they learned, what they built and how they solved a problem using AI.",
  },
  who: {
    title: "Who Can Join All AI Courses in Mohali?",
    intro:
      "AI learning at Techcadd is designed to begin with fundamentals and progress toward practical applications, so students from different educational and professional backgrounds can find a suitable entry point.",
  },
  tools: {
    title: "Tools & Technologies Covered",
    intro:
      "Depending on the selected track and level, students can work with technologies such as:",
    note: "The reference Techcadd page positions ChatGPT, Claude and LangChain as AI tools integrated into its broader learning tracks.",
  },
  scope: {
    note: "For students in Mohali and the Chandigarh Tricity region, AI skills can complement traditional degrees and existing technical knowledge. Rather than waiting until graduation to explore Artificial Intelligence, students can begin developing practical capabilities through Python, data handling, machine learning, Generative AI, AI tools, automation and AI application development. Mohali also has an active technology and training ecosystem, with AI, software and data-focused organizations operating across sectors and local technology hubs.",
  },
  enquire: {
    title: "Ready to Start Your AI Career?",
    intro:
      "Artificial Intelligence is a broad field. You do not have to learn everything on day one. Start with the fundamentals, identify your area of interest, build practical projects and gradually develop the skills required for your target career. Join All AI Courses in Mohali with Techcadd and take the next step toward becoming an AI-ready professional.",
    facts: [
      { label: "Tracks", value: "3 months (Practitioner), 6 months (Professional), 9 months (Expert)" },
      { label: "Modes", value: "Weekday, weekend and evening learning options" },
      { label: "Starts from", value: "AI fundamentals and Python — no prior AI background assumed" },
      {
        label: "Pathways",
        value:
          "AI, Generative AI, Prompt Engineering, ChatGPT & AI Tools, Agentic AI, RAG, ML, Deep Learning, NLP, Computer Vision, Data Science and Data Analytics",
      },
      {
        label: "On completion",
        value: "A Techcadd certificate for your track, a project portfolio and placement support",
      },
    ],
    note: "Book a free counselling session to discuss your eligibility, preferred AI specialization, duration, batch availability and career goals before choosing your program. Learn AI. Build Projects. Develop Skills. Prepare for the Future.",
  },
};

/* -------------------------------------------------------------------------- *
 *                          What you will learn                                *
 * -------------------------------------------------------------------------- */

export const allAiCoursesLearn: LearnDetail = {
  intro:
    "Thirteen pathways, one ecosystem. Start wherever your background puts you and move toward the specialization that fits your strengths.",
  count: { value: "13", label: "AI pathways to choose from" },
  topics: [
    {
      title: "AI Fundamentals & Artificial Intelligence",
      body: [
        "This is the ideal starting point for students who are new to Artificial Intelligence. Students can understand:",
      ],
      points: [
        "What Artificial Intelligence is",
        "AI applications",
        "Machine learning basics",
        "Data and algorithms",
        "AI problem-solving",
        "Introduction to Python",
        "AI tools and workflows",
        "Responsible AI concepts",
      ],
    },
    {
      title: "Generative AI Course",
      body: [
        "Generative AI enables systems to produce text, images, code, summaries and other forms of content. Students can learn concepts related to:",
      ],
      points: [
        "Generative AI fundamentals",
        "Large Language Models",
        "Prompt design",
        "AI content workflows",
        "AI-assisted research",
        "AI productivity",
        "LLM applications",
        "AI APIs",
        "Generative AI evaluation",
      ],
    },
    {
      title: "Prompt Engineering",
      body: [
        "Prompt Engineering focuses on communicating effectively with AI systems. Students can learn how to create structured prompts for:",
      ],
      points: [
        "Content generation",
        "Research",
        "Summarization",
        "Data interpretation",
        "Coding assistance",
        "Creative workflows",
        "Business tasks",
        "AI automation",
      ],
    },
    {
      title: "ChatGPT & AI Tools",
      body: [
        "AI tools are becoming part of everyday professional workflows. This module can help students understand how to use AI responsibly for:",
      ],
      points: [
        "Research",
        "Writing",
        "Brainstorming",
        "Coding assistance",
        "Productivity",
        "Documentation",
        "Data-related tasks",
        "Marketing",
        "Business workflows",
      ],
    },
    {
      title: "Agentic AI",
      body: [
        "Agentic AI goes beyond simple question-and-answer interactions. Students can explore how AI systems can:",
      ],
      points: [
        "Understand goals",
        "Plan tasks",
        "Use tools",
        "Execute multiple steps",
        "Work with external information",
        "Coordinate workflows",
        "Produce results based on defined objectives",
      ],
    },
    {
      title: "RAG – Retrieval-Augmented Generation",
      body: [
        "RAG allows AI applications to retrieve relevant information from external knowledge sources before generating responses. Students can explore:",
      ],
      points: [
        "RAG architecture",
        "Document processing",
        "Embeddings",
        "Vector search",
        "Knowledge bases",
        "Retrieval pipelines",
        "Context-aware responses",
        "RAG evaluation",
        "AI application integration",
      ],
    },
    {
      title: "AI-Powered Marketing",
      body: ["AI is also transforming digital marketing. This pathway can combine AI with:"],
      points: [
        "SEO research",
        "Keyword research",
        "Audience analysis",
        "Content planning",
        "Social media",
        "Ad copy",
        "Creative ideation",
        "Performance reporting",
        "Chatbots",
        "Lead generation",
        "Email automation",
      ],
    },
    {
      title: "Machine Learning",
      body: [
        "Machine Learning is a core component of Artificial Intelligence. Students can progress through:",
      ],
      points: [
        "Supervised learning",
        "Unsupervised learning",
        "Regression",
        "Classification",
        "KNN",
        "SVM",
        "Decision trees",
        "Random forests",
        "Ensemble techniques",
        "Clustering",
        "PCA",
        "Model evaluation",
        "Cross-validation",
        "Feature engineering",
      ],
    },
    {
      title: "Deep Learning",
      body: [
        "Students who want to move beyond traditional machine learning can explore Deep Learning. Topics may include:",
      ],
      points: [
        "Neural networks",
        "ANN",
        "CNN",
        "Sequence models",
        "RNN",
        "LSTM",
        "GRU",
        "Deep learning workflows",
        "Model training",
        "Evaluation",
      ],
    },
    {
      title: "Natural Language Processing",
      body: [
        "NLP focuses on enabling computers to process and understand human language. Students can explore:",
      ],
      points: [
        "Text preprocessing",
        "Tokenisation",
        "TF-IDF",
        "Word embeddings",
        "Semantic representation",
        "Text classification",
        "NLP applications",
        "LLM foundations",
      ],
    },
    {
      title: "Computer Vision",
      body: [
        "Computer Vision enables AI systems to interpret visual information. Learning can include:",
      ],
      points: [
        "Image processing",
        "OpenCV",
        "Image classification",
        "Feature extraction",
        "Object detection",
        "YOLO",
        "Computer vision applications",
      ],
    },
    {
      title: "Data Science & Data Analytics With AI",
      body: ["AI becomes more powerful when combined with quality data. Students can learn:"],
      points: [
        "Python for data",
        "NumPy",
        "Pandas",
        "Data cleaning",
        "Exploratory Data Analysis",
        "Data visualization",
        "Statistics",
        "Probability",
        "Feature engineering",
        "Data interpretation",
        "Machine learning",
      ],
    },
    {
      title: "Python for AI",
      body: [
        "Python forms an important foundation for many AI and data workflows. The learning progression can cover:",
      ],
      points: [
        "Python Fundamentals — variables, operators, conditions, loops and functions",
        "Data Structures — lists, tuples, dictionaries, sets and comprehensions",
        "Object-Oriented Programming — classes, objects and reusable code structures",
        "File Handling — working with files and structured data",
        "Exception Handling — managing errors and building more reliable applications",
        "Python for Data — NumPy, Pandas and visualization",
      ],
    },
    {
      title: "Practical Projects You Can Build",
      body: [
        "AI learning becomes more valuable when students can demonstrate what they have built. Possible project categories include:",
      ],
      points: [
        "AI & Python — AI productivity assistant, data analysis application, Python automation tool, AI-powered utility application",
        "Machine Learning — prediction system, classification application, customer segmentation, recommendation workflow",
        "Deep Learning — image classification, neural network application, sequence prediction model",
        "NLP — text classification, sentiment analysis, document analysis, AI text assistant",
        "Computer Vision — image recognition, object detection, visual inspection system",
        "Generative AI — AI chatbot, document question-answering system, RAG application, LLM-powered assistant",
        "AI Applications — AI-powered web application, API-connected AI tool, AI automation workflow, portfolio-ready capstone",
      ],
    },
    {
      title: "What You Can Build From Beginner to Advanced Level",
      body: [
        "The learning journey can progress from small Python assignments to complete AI applications:",
      ],
      points: [
        "Beginner — Python + data analysis project",
        "Intermediate — machine learning prediction project",
        "Advanced — deep learning / NLP / computer vision project",
        "GenAI — LLM or RAG application",
        "Professional — AI-powered application with API, database and deployment",
      ],
    },
    {
      title: "Student Learning Experience",
      body: ["What the week actually looks like, whichever pathway you are on:"],
      points: [
        "Learn from the basics — no need to assume that every student already knows advanced AI",
        "Practice after learning — concepts are reinforced through practical exercises",
        "Build projects — projects help connect theory with application",
        "Improve through feedback — mentor feedback can help identify technical and presentation gaps",
        "Create a career portfolio — completed projects can become part of a student's portfolio when properly documented",
      ],
    },
  ],
  outro: [
    "This project progression helps students understand not just how an AI model works, but how AI can become part of a functional application.",
  ],
};

/* -------------------------------------------------------------------------- *
 *                               Why choose                                    *
 * -------------------------------------------------------------------------- */

/**
 * The brief answers this twice — five learning principles under "What Makes
 * Techcadd's AI Learning Approach Different?", then seven reasons under "Why
 * Choose Techcadd for AI Courses in Mohali?". They render as one grid, the
 * learning principles first, the way the agentic-ai page already does it.
 */
export const allAiCoursesWhyChoose: { icon: string; title: string; body: string }[] = [
  {
    icon: "layers",
    title: "Learn the Fundamentals",
    body: "Understand AI terminology, Python, data, algorithms and the fundamentals required for advanced learning. The objective is to make AI learning practical rather than purely theoretical, through a structured progression: Learn → Practice → Build → Review → Improve → Deploy.",
  },
  {
    icon: "terminal",
    title: "Work With Modern AI Tools",
    body: "Explore tools and frameworks used across Generative AI, machine learning, data analysis and AI development.",
  },
  {
    icon: "cube",
    title: "Build Projects",
    body: "Apply concepts through practical assignments and progressively more advanced projects.",
  },
  {
    icon: "certificate",
    title: "Develop a Portfolio",
    body: "Turn learning outcomes into demonstrable work that can support internships, interviews and career applications.",
  },
  {
    icon: "briefcase",
    title: "Prepare for Professional Work",
    body: "Learn how AI technologies fit into actual software, data and business workflows.",
  },
  {
    icon: "rocket",
    title: "Practical, Career-Oriented Learning",
    body: "The focus is on understanding concepts and applying them through assignments and projects.",
  },
  {
    icon: "sparkles",
    title: "Multiple AI Learning Directions",
    body: "Instead of limiting students to a single AI topic, the learning ecosystem covers foundational AI, Generative AI, Agentic AI, RAG, AI-powered marketing, machine learning, deep learning, data science and data analytics.",
  },
  {
    icon: "users",
    title: "Mentor-Guided Projects",
    body: "Students can receive guidance while working through practical tasks and projects.",
  },
  {
    icon: "bolt",
    title: "AI Tools Integrated Into Learning",
    body: "Modern AI tools can be incorporated into development, research, productivity and project workflows.",
  },
  {
    icon: "clock",
    title: "Flexible Learning Options",
    body: "The reference program highlights weekday, weekend and evening learning options. The exact available batch should be confirmed with the centre.",
  },
  {
    icon: "checkCircle",
    title: "Certification",
    body: "Students completing the applicable program can receive a Techcadd certificate corresponding to their learning track.",
  },
  {
    icon: "target",
    title: "Career & Placement Support",
    body: "The reference page highlights placement assistance including resume support, interview preparation and employer introductions.",
  },
];

/* -------------------------------------------------------------------------- *
 *                               Who can join                                  *
 * -------------------------------------------------------------------------- */

export const allAiCoursesAudience: { title: string; body: string; icon: string }[] = [
  {
    icon: "users",
    title: "Students After 12th",
    body: "Students who have completed 12th and are interested in technology can start learning AI fundamentals, Python and modern AI tools. A beginner-friendly pathway allows students to understand programming and Artificial Intelligence progressively rather than jumping directly into complex models.",
  },
  {
    icon: "monitor",
    title: "BCA and Computer Applications Students",
    body: "BCA students can use AI training to strengthen their programming and application-development knowledge with modern AI capabilities. Learning Python, machine learning, Generative AI and AI APIs can complement academic studies and help students build stronger technical portfolios.",
  },
  {
    icon: "code",
    title: "BTech and Engineering Students",
    body: "Engineering students can explore AI as an additional specialization alongside their degree. AI training can be particularly useful for students interested in software development, machine learning, data science, computer vision, NLP or AI-powered applications.",
  },
  {
    icon: "certificate",
    title: "MCA and Postgraduate Students",
    body: "MCA and postgraduate learners can use advanced AI training to develop industry-oriented projects and explore specialized areas such as deep learning, NLP, LLMs, RAG and AI application development.",
  },
  {
    icon: "target",
    title: "Graduates and Job Seekers",
    body: "Graduates who want to move into technology can begin with foundational modules before progressing toward a specialized AI track.",
  },
  {
    icon: "briefcase",
    title: "Working Professionals",
    body: "Professionals can learn AI tools and automation techniques to improve productivity and add modern AI capabilities to their existing careers.",
  },
  {
    icon: "megaphone",
    title: "Freelancers and Entrepreneurs",
    body: "Freelancers and entrepreneurs can explore AI for content generation, automation, research, analytics, customer support, marketing and business workflows.",
  },
];

/** The checklist beside those cards, drawn from the brief's FAQs. */
export const allAiCoursesEligibility = [
  "Open from 12th onward — beginners can start with AI and programming fundamentals",
  "No programming knowledge needed for AI fundamentals, Generative AI or AI-tool tracks",
  "Basic programming helps on the Machine Learning, Agentic AI and AI-development tracks",
  "Open to college students, graduates, job seekers, professionals, freelancers and enthusiasts",
  "Weekday, weekend and evening options — confirm the current Mohali batch during counselling",
];

/* -------------------------------------------------------------------------- *
 *                              Future scope                                   *
 * -------------------------------------------------------------------------- */

/** The line under the "where this course takes you" heading. */
export const allAiCoursesDemand =
  "Current job listings show AI-related opportunities in Mohali, including fresher-level roles involving Artificial Intelligence, Machine Learning, Python and data-driven problem solving.";

/* -------------------------------------------------------------------------- *
 *                                 Compare                                     *
 * -------------------------------------------------------------------------- */

/**
 * A short track against a long one — the choice the brief closes its FAQ with,
 * and the one a reader of this page is actually weighing.
 */
export const allAiCoursesComparison: {
  aspect: string;
  icon: string;
  us: string;
  them: string;
}[] = [
  {
    aspect: "What it suits",
    icon: "target",
    us: "A longer program suits a goal of deeper ML, deep learning, GenAI and application development.",
    them: "A shorter course suits foundational or focused skills.",
  },
  {
    aspect: "How far the ladder goes",
    icon: "layers",
    us: "9 months reaches sequence models, NLP, Computer Vision, YOLO, LLMs, RAG and production workflows.",
    them: "3 months reaches Python, data handling, ML and introductory deep learning.",
  },
  {
    aspect: "Projects",
    icon: "cube",
    us: "Progressively advanced work, closing on a portfolio-ready capstone.",
    them: "An AI project and deployment at foundation level.",
  },
  {
    aspect: "Deployment",
    icon: "rocket",
    us: "APIs, database integration, authentication, deployment and monitoring.",
    them: "A first taste of project deployment.",
  },
  {
    aspect: "Specialisation",
    icon: "sparkles",
    us: "Room to choose a direction — GenAI, RAG, vision, NLP or data.",
    them: "One foundation, common to every direction.",
  },
  {
    aspect: "Where to start",
    icon: "checkCircle",
    us: "Either — you do not have to learn everything on day one.",
    them: "Begin with fundamentals, then pick the track that fits your strengths.",
  },
];

/* -------------------------------------------------------------------------- *
 *                                   FAQs                                      *
 * -------------------------------------------------------------------------- */

export const allAiCoursesFaqs: { q: string; a: string }[] = [
  {
    q: "What are All AI Courses in Mohali?",
    a: "All AI Courses in Mohali refer to a broader collection of Artificial Intelligence learning paths covering areas such as AI fundamentals, Generative AI, Prompt Engineering, Machine Learning, Deep Learning, Agentic AI, RAG, Data Science and AI application development.",
  },
  {
    q: "Who can join AI courses in Mohali?",
    a: "12th-pass students, graduates, college students, job seekers, working professionals, freelancers and technology enthusiasts can explore suitable AI learning tracks.",
  },
  {
    q: "Can beginners learn AI?",
    a: "Yes. Beginners can start with foundational AI concepts and Python before progressing to machine learning and advanced AI technologies.",
  },
  {
    q: "Can I join after 12th?",
    a: "Yes. Students who have completed 12th can start with beginner-friendly AI and programming fundamentals.",
  },
  {
    q: "Do I need programming knowledge?",
    a: "Not necessarily for beginner-oriented AI fundamentals, Generative AI or AI-tool learning. Advanced Machine Learning, Agentic AI and AI development tracks benefit from basic programming knowledge.",
  },
  {
    q: "Is Python taught in AI training?",
    a: "Yes. Python is an important foundation for AI, machine learning and data-related development.",
  },
  {
    q: "What is Generative AI?",
    a: "Generative AI refers to AI systems capable of producing or transforming content such as text, code, images and other outputs based on user instructions and data.",
  },
  {
    q: "What is RAG in AI?",
    a: "RAG, or Retrieval-Augmented Generation, combines information retrieval with generative AI so an application can use relevant external information when generating responses.",
  },
  {
    q: "What is Agentic AI?",
    a: "Agentic AI refers to AI systems designed to plan and execute multi-step tasks, often using tools, external information or defined workflows.",
  },
  {
    q: "Which AI course is best for beginners?",
    a: "A beginner should generally start with AI fundamentals, Python and AI tools before choosing advanced specializations such as machine learning, RAG or Agentic AI.",
  },
  {
    q: "How long does an AI course take?",
    a: "The duration depends on the selected learning path. The reference Techcadd AI/ML pathway provides 3-month, 6-month and 9-month levels with progressively deeper coverage.",
  },
  {
    q: "Will I work on AI projects?",
    a: "Project-based learning can include Python, machine learning, Generative AI, NLP, computer vision and AI application projects depending on the selected track.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Students completing the applicable program can receive a Techcadd certificate for their respective learning track.",
  },
  {
    q: "Is placement assistance available?",
    a: "The reference Techcadd program states that placement assistance includes resume building, mock interviews and introductions to hiring partners. Exact support for the Mohali centre should be confirmed during counselling.",
  },
  {
    q: "Can working professionals learn AI?",
    a: "Yes. Working professionals can choose a suitable batch and focus on AI tools, automation or technical AI skills according to their career objectives.",
  },
  {
    q: "Which is better: a short AI course or a long AI course?",
    a: "A shorter course may suit learners seeking foundational or focused skills. A longer program is more suitable when the goal is deeper machine learning, deep learning, Generative AI and application-development knowledge.",
  },
];

/* -------------------------------------------------------------------------- *
 *                                 Reviews                                     *
 * -------------------------------------------------------------------------- */

/**
 * The ten reviews from the brief, in its order and with its attributions.
 *
 * The brief's own note applies and has not been overridden: these are sample
 * testimonial-style placeholders for website layout, and each should be
 * replaced with a verified student review before publishing as a genuine
 * testimonial.
 */
export const allAiCoursesReviews: CourseReview[] = [
  {
    name: "BCA Student",
    role: "1. Sample review",
    company: "Mohali",
    quote:
      "“Before joining, I knew the basic concepts of programming but had very little understanding of AI. The structured learning helped me understand Python, machine learning and Generative AI much better.”",
    rating: 5,
    initials: "BC",
  },
  {
    name: "BTech Student",
    role: "2. Sample review",
    company: "Chandigarh Tricity",
    quote:
      "“I wanted practical AI knowledge alongside my engineering degree. Working on projects helped me understand how the concepts are actually applied.”",
    rating: 5,
    initials: "BT",
  },
  {
    name: "Graduate",
    role: "3. Sample review",
    company: "Mohali",
    quote:
      "“I was looking for a technology skill that could improve my career options. The AI learning path gave me a clear starting point instead of making everything feel complicated.”",
    rating: 5,
    initials: "GR",
  },
  {
    name: "MCA Student",
    role: "4. Sample review",
    company: "Mohali",
    quote:
      "“The advanced topics were the most interesting part for me. Learning about NLP, LLMs and RAG gave me a better understanding of current AI development.”",
    rating: 5,
    initials: "MC",
  },
  {
    name: "Job Seeker",
    role: "5. Sample review",
    company: "Chandigarh",
    quote:
      "“I joined to strengthen my technical profile. The combination of Python, machine learning and projects made the learning much more practical.”",
    rating: 5,
    initials: "JS",
  },
  {
    name: "Working Professional",
    role: "6. Sample review",
    company: "Mohali",
    quote:
      "“I wanted to understand how AI could be used in my existing work. Learning AI tools and automation helped me think about productivity in a completely different way.”",
    rating: 5,
    initials: "WP",
  },
  {
    name: "BCA Student",
    role: "7. Sample review",
    company: "Kharar/Mohali Region",
    quote:
      "“The step-by-step approach was useful because I didn't have an advanced AI background when I started.”",
    rating: 5,
    initials: "BC",
  },
  {
    name: "Engineering Student",
    role: "8. Sample review",
    company: "Tricity",
    quote:
      "“The project work was helpful because it gave me something practical to discuss when preparing for technical interviews.”",
    rating: 5,
    initials: "ES",
  },
  {
    name: "Graduate",
    role: "9. Sample review",
    company: "Mohali",
    quote:
      "“I was confused about which AI specialization to choose. Understanding the different AI pathways helped me decide where I wanted to focus.”",
    rating: 5,
    initials: "GR",
  },
  {
    name: "Aspiring AI Developer",
    role: "10. Sample review",
    company: "Mohali",
    quote:
      "“The advanced AI topics, especially Generative AI and RAG, were exactly what I wanted to explore after learning the fundamentals.”",
    rating: 5,
    initials: "AD",
  },
];
