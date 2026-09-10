import type { Course } from "@/lib/courses";
import type { CourseReview, LearnDetail, SectionCopy } from "@/lib/coursePage";

/**
 * The AI menu's AI-Powered Courses page, at `/courses/ai/ai-powered-courses`.
 *
 * The menu's umbrella programme, and one of the courses whose record does not
 * come from the catalogue in `@/lib/courses`. It belongs to the AI menu alone
 * — the Courses, Certificate Programs and After 12th routes never serve this
 * slug — so the copy below appears on exactly one page.
 *
 * Everything here is the supplied copy, reproduced as written. Where a section
 * of the detail page had no copy in that brief — the module grouping, the
 * outcomes, the roles, the eligibility checklist, the demand line and the
 * comparison — it is composed from the same brief rather than invented, so the
 * page never states anything the copy does not.
 *
 * Types are imported with `import type` on purpose: `@/lib/coursePage` reads
 * the values below, so a value import here would close a runtime cycle.
 */

/* -------------------------------------------------------------------------- *
 *                              The course record                              *
 * -------------------------------------------------------------------------- */

export const aiPoweredCoursesCourse: Course = {
  slug: "ai-powered-courses",
  title: "AI-Powered Courses",
  category: "ai-data",
  duration: "3 – 9 Months",
  level: "Beginner → Advanced",
  badge: "New",
  blurb:
    "Practical AI skills for today's technology-driven careers — Python, ChatGPT, Claude, LangChain, Jupyter, Zapier and Streamlit, learned by building rather than by watching.",
  overview:
    "AI-Powered Courses in Mohali by Techcadd are designed for students, graduates, job seekers, freelancers, and working professionals who want to build practical AI skills for today's technology-driven careers. Instead of learning AI only through theory, students work with modern tools and technologies such as Python, ChatGPT, Claude, LangChain, Jupyter, Zapier, and Streamlit while developing practical projects.\n\nThe program introduces learners to AI fundamentals, Python for AI, language models, prompt design and evaluation, AI-assisted data handling, small AI application development, automation, AI ethics, and project deployment. The curriculum is structured around practical learning so students can turn concepts into portfolio-ready work.\n\nFor students searching for AI courses in Mohali, AI training in Mohali, Artificial Intelligence courses in Mohali, or job-oriented AI training near Chandigarh, this program provides a career-focused learning path with practical projects, certification, internship support, and placement assistance. Techcadd also offers flexible learning formats designed to suit students and working professionals.",

  /* The nine areas of "What You Will Learn", in the order the brief gives
     them, grouped into three stages so the curriculum accordion has modules to
     open. The prose behind each area is in `aiPoweredCoursesLearn` below
     rather than repeated here. */
  modules: [
    {
      title: "Foundations — concepts, Python and language models",
      blurb:
        "Where the programme starts: what AI actually is, the programming underneath it, and how modern generative systems behave.",
      points: [
        "AI Fundamentals & AI Concepts",
        "Python for AI",
        "Generative AI & Language Models",
      ],
    },
    {
      title: "Working with AI — prompts, data and applications",
      blurb:
        "Instructing a model well, using it against real information, and moving past conversation into something that runs.",
      points: [
        "Prompt Design & Evaluation",
        "AI-Assisted Data Handling",
        "Building AI Applications",
      ],
    },
    {
      title: "Automation, judgement and delivery",
      blurb:
        "Connecting AI to everyday processes, knowing where it fails, and finishing on work you can show.",
      points: [
        "AI Automation & Workflows",
        "AI Ethics, Limitations & Verification",
        "Live Project & Portfolio Development",
      ],
    },
  ],

  tools: ["Python", "ChatGPT", "Claude", "LangChain", "Jupyter", "Zapier", "Streamlit"],

  outcomes: [
    "Portfolio-ready work built during the course rather than after it",
    "A small AI-powered application connected to a usable interface or workflow",
    "A live client-oriented project component",
    "An industry-recognised course certificate and internship documentation",
    "Portfolio preparation, CV review and mock interviews through placement support",
  ],

  /* The directions the brief names when it answers "what career options are
     available after learning AI?" */
  roles: [
    "AI/ML Engineer",
    "AI Application Developer",
    "AI Automation Specialist",
    "Data Analyst",
    "Machine Learning professional",
    "Generative AI professional",
  ],
};

/* -------------------------------------------------------------------------- *
 *                                    SEO                                      *
 * -------------------------------------------------------------------------- */

export const aiPoweredCoursesSeo = {
  title: "AI-Powered Courses in Mohali | AI Training & Certification – Techcadd",
  description:
    "Techcadd's AI-Powered Courses in Mohali — Python, ChatGPT, Claude, LangChain, Jupyter, Zapier and Streamlit, taught through practical projects with certification, internship support and placement assistance.",
};

/* -------------------------------------------------------------------------- *
 *                             Section headings                                *
 * -------------------------------------------------------------------------- */

export const aiPoweredCoursesSectionCopy: Partial<
  Record<"learn" | "why" | "who" | "tools" | "enquire", SectionCopy>
> = {
  learn: {
    title: "What You Will Learn in AI-Powered Courses in Mohali",
  },
  why: {
    title: "Why This Program?",
    intro:
      "AI is no longer limited to specialised technology companies. Businesses are using AI for research, content, automation, customer support, data analysis, software development and decision-making. That makes AI-Powered Courses in Mohali a practical choice for students who want to understand how modern AI tools can be applied to real career and business requirements. The biggest advantage of this program is its hands-on approach: instead of learning AI only through definitions and presentations, students work through a progression of foundations, core AI skills and practical applications.",
    note: "For students searching for Artificial Intelligence courses in Mohali, AI certification courses in Mohali, AI training near Chandigarh, or job-oriented AI courses in Mohali, Techcadd provides a structured path from learning fundamentals to applying AI skills through practical work.",
  },
  who: {
    title: "Who Can Do This AI-Powered Courses in Mohali?",
    intro:
      "AI-Powered Courses in Mohali are suitable for learners from different educational and professional backgrounds. The program is designed to begin with fundamentals and gradually move toward practical AI applications, so students do not necessarily need advanced technical knowledge before joining. The curriculum can be especially useful for learners who want to understand AI tools, automation, language models, data handling, and practical AI development.",
    note: "In short, this program is for anyone who wants to move beyond simply using AI tools and learn how to apply them productively in real-world projects and career situations.",
  },
  tools: {
    title: "Tools You Will Learn",
    intro:
      "The program introduces learners to a practical collection of AI and productivity technologies. Key tools include:",
    note: "Depending on the learner's chosen AI pathway, students can further explore technologies such as NumPy, Pandas, Scikit-learn, TensorFlow, Keras, OpenCV, Hugging Face, vector databases and modern Generative AI frameworks. Current AI training programs in the Chandigarh–Mohali region similarly emphasise Python, Machine Learning, Generative AI, RAG, AI agents, APIs and practical projects.",
  },
  enquire: {
    title: "Start Your AI Journey with Techcadd",
    intro:
      "Ready to build practical AI skills? Turn your interest in Artificial Intelligence into practical, career-focused skills with AI-Powered Courses in Mohali at Techcadd. Learn AI concepts, modern AI tools, automation, Python and project-based applications with structured guidance. Whether you are a student after 12th, graduate, job seeker, working professional or beginner, our AI learning pathway can help you take the next step with confidence.",
    facts: [
      { label: "Duration", value: "Approximately 3 to 9 months, depending on the curriculum" },
      { label: "Modes", value: "Weekday, evening, weekend and 1-on-1 learning options" },
      { label: "Starts from", value: "AI fundamentals — no advanced technical knowledge assumed" },
      {
        label: "Core tools",
        value: "Python, ChatGPT, Claude, LangChain, Jupyter, Zapier and Streamlit",
      },
      {
        label: "On completion",
        value: "An industry-recognised certificate, internship documentation and a portfolio project",
      },
    ],
    note: "What students value most: across AI learning, students generally look for three things — practical training, supportive guidance and projects they can demonstrate. For learners comparing AI-Powered Courses in Mohali, these are also useful factors to evaluate during a demo class: ask what projects you will build, which tools you will practise, how doubts are handled, whether you receive portfolio guidance and what career support is included.",
  },
};

/* -------------------------------------------------------------------------- *
 *                          What you will learn                                *
 * -------------------------------------------------------------------------- */

export const aiPoweredCoursesLearn: LearnDetail = {
  intro:
    "The AI-Powered Courses in Mohali at Techcadd are designed to take students from fundamental AI concepts to practical applications. The learning journey focuses on understanding Artificial Intelligence, using modern AI tools, working with data, creating AI-powered solutions and developing the confidence to apply AI in real-world situations.",
  count: { value: "9", label: "areas, fundamentals to portfolio" },
  topics: [
    {
      title: "1. AI Fundamentals & AI Concepts",
      body: [
        "Students begin by understanding the foundations of Artificial Intelligence. You will learn important AI terminology, different types of AI, how modern AI systems work, common applications of AI and the difference between traditional software and AI-based solutions. This foundation helps beginners understand later topics without feeling overwhelmed.",
      ],
    },
    {
      title: "2. Python for AI",
      body: [
        "Python is introduced as an important programming foundation for AI-related work. Students learn Python basics, variables, data types, conditions, loops, functions and other programming concepts required for practical AI workflows. You can then progress toward using Python for data handling and AI applications.",
      ],
    },
    {
      title: "3. Generative AI & Language Models",
      body: [
        "The program introduces students to modern Generative AI and language-model workflows. You learn how AI systems generate text and other outputs, how to communicate effectively with AI models, and how to evaluate generated responses rather than accepting every output blindly.",
      ],
    },
    {
      title: "4. Prompt Design & Evaluation",
      body: [
        "Prompt Engineering is an important part of modern AI usage. Students learn how to create clearer prompts, provide useful context, structure instructions, improve responses and evaluate AI-generated results. The goal is to make AI outputs more relevant, consistent and useful.",
      ],
    },
    {
      title: "5. AI-Assisted Data Handling",
      body: [
        "Students also learn how AI can support data-related tasks such as organising information, analysing datasets, identifying patterns and generating useful summaries. This creates a bridge between AI tools and practical business or academic workflows.",
      ],
    },
    {
      title: "6. Building AI Applications",
      body: [
        "Instead of stopping at AI conversations, students can move toward application development. The curriculum includes building a small AI-powered application and understanding how AI functionality can be connected with a usable interface or workflow. This project-oriented approach helps students create portfolio-worthy work.",
      ],
    },
    {
      title: "7. AI Automation & Workflows",
      body: [
        "AI becomes more useful when it can be connected with everyday business processes. Students are introduced to automation concepts and tools that can help connect AI with repetitive tasks, information processing and workflow-based activities.",
      ],
    },
    {
      title: "8. AI Ethics, Limitations & Verification",
      body: [
        "Responsible AI usage is another important learning area. Students learn about inaccurate AI outputs, hallucinations, privacy considerations, bias, limitations and the importance of verifying information. This helps learners understand that AI should be treated as a powerful tool that still requires human judgement.",
      ],
    },
    {
      title: "9. Live Project & Portfolio Development",
      body: [
        "Practical projects bring the learning together. Students can work through AI-based assignments, real-world challenges and a final portfolio project. Techcadd's AI-powered curriculum includes practical project work and a live client-oriented component, helping students understand how AI skills can be applied beyond classroom exercises.",
      ],
    },
    {
      title: "Tools You Will Learn",
      body: [
        "The program introduces learners to a practical collection of AI and productivity technologies. Key tools include:",
      ],
      points: [
        "Python – programming foundation for AI and data-related work.",
        "ChatGPT – Generative AI, research, ideation, content and workflow assistance.",
        "Claude – working with AI for analysis, writing and structured tasks.",
        "LangChain – building AI-powered workflows and applications around language models.",
        "Jupyter – an interactive environment for Python experimentation, analysis and AI learning.",
        "Zapier – connecting applications and creating automation workflows.",
        "Streamlit – creating simple interfaces for Python-based data and AI applications.",
      ],
    },
  ],
  outro: [
    "By completing these modules, students gain more than basic knowledge of AI tools. They develop a foundation for using AI, evaluating AI outputs, automating workflows, analysing information and building practical AI-powered solutions — skills that can support further learning, internships, freelance work and AI-focused career pathways.",
  ],
};

/* -------------------------------------------------------------------------- *
 *                               Why choose                                    *
 * -------------------------------------------------------------------------- */

/**
 * The brief answers this twice — the case for the programme, then "Why Choose
 * Techcadd for AI-Powered Courses in Mohali?". They render as one grid, the
 * programme's reasons first, the way the agentic-ai page already does it.
 */
export const aiPoweredCoursesWhyChoose: { icon: string; title: string; body: string }[] = [
  {
    icon: "cube",
    title: "Build Skills, Not Just Certificates",
    body: "A certificate can show that you completed a course, but a portfolio can demonstrate what you can actually do. This program therefore focuses on creating practical outputs during learning. Students can work with tools such as Python, ChatGPT, Claude, LangChain, Jupyter, Zapier and Streamlit, giving them exposure to technologies used across modern AI workflows. For students in Mohali and Chandigarh, this practical exposure can be particularly useful when preparing for internships, entry-level roles, freelance projects or further technical education. Students can learn how to approach an AI problem, select an appropriate tool, test the output, identify limitations and improve the final result instead of blindly depending on AI-generated answers.",
  },
  {
    icon: "target",
    title: "A Career-Oriented Learning Path",
    body: "The program is also useful because AI skills can complement different career directions. A learner interested in programming can explore AI application development. Someone interested in marketing can use AI for research, content and automation. A data-oriented student can explore AI-assisted analysis and machine learning. The broader Techcadd AI learning ecosystem also covers areas such as Generative AI, Artificial Intelligence, Prompt Engineering, Agentic AI, RAG, AI-Powered Marketing, Machine Learning, Deep Learning, Data Science and Data Analytics. This makes the program more than a short-term introduction to ChatGPT. It gives students a structured pathway to understand how AI works, where AI tools fit into professional workflows, and how to build useful solutions with them.",
  },
  {
    icon: "terminal",
    title: "Practical AI Learning",
    body: "AI cannot be mastered simply by watching tutorials or memorising definitions. Students need opportunities to practise tools, solve problems and understand how AI can be applied to real situations. Techcadd follows a practical learning approach where students can progress from AI fundamentals to hands-on applications, projects and portfolio development. The wider Techcadd AI curriculum covers areas including Python, Machine Learning, Deep Learning, NLP, Computer Vision, Generative AI and modern AI tools.",
  },
  {
    icon: "layers",
    title: "Industry-Relevant Tools",
    body: "One of the key benefits of structured AI training in Mohali is learning with tools that connect concepts to actual workflows. Depending on the learning track, students can gain exposure to technologies such as Python, NumPy, Pandas, Scikit-learn, TensorFlow, Keras, OpenCV, Jupyter Notebook, Google Colab and Generative AI tools. For learners interested specifically in AI-powered workflows, Techcadd's AI curriculum also introduces tools such as ChatGPT, Claude, LangChain, Jupyter, Zapier and Streamlit. This helps students understand both AI concepts and practical AI-assisted applications.",
  },
  {
    icon: "rocket",
    title: "Project-Based Skill Development",
    body: "A major focus is moving beyond classroom theory. Students can work on practical assignments and projects that demonstrate how AI is used for prediction, classification, data analysis, language processing, computer vision and Generative AI applications. Project-based learning can also help students build material for their portfolio and gain confidence when discussing their skills during interviews.",
  },
  {
    icon: "users",
    title: "Suitable for Different Career Goals",
    body: "Techcadd's AI learning approach can support different starting points. A student after 12th can begin with foundational concepts, while a BCA, B.Tech, MCA or other graduate can use AI training to complement an existing technical background. Working professionals can also explore AI as an additional skill for automation, productivity and career development.",
  },
  {
    icon: "briefcase",
    title: "Career-Focused Support",
    body: "Learning should not end when the final module is completed. A career-oriented program should help students understand how to present their skills, explain their projects and prepare for opportunities. Techcadd's AI training ecosystem includes practical projects, portfolio development, certification and placement-oriented preparation.",
  },
];

/* -------------------------------------------------------------------------- *
 *                               Who can join                                  *
 * -------------------------------------------------------------------------- */

export const aiPoweredCoursesAudience: { title: string; body: string; icon: string }[] = [
  {
    icon: "users",
    title: "Students After 12th",
    body: "Students who have completed 12th can start their AI learning journey with this program. Whether you come from science, commerce, or another stream, the fundamentals-first approach helps you understand concepts step by step. It can be a useful option for students in Mohali and the Chandigarh region who want to add industry-relevant AI skills alongside their college education.",
  },
  {
    icon: "building",
    title: "College Students & Graduates",
    body: "BCA, BSc, BTech, MCA, BBA, BCom and other graduates can use the program to strengthen their practical technology skills. Students can learn AI concepts alongside programming, data handling and modern AI tools, then apply their knowledge through projects that can support their portfolio.",
  },
  {
    icon: "target",
    title: "Job Seekers",
    body: "If you are looking for an entry-level technology career, learning how AI is used in real workflows can make your skill set more relevant. The program focuses on practical work rather than only theoretical concepts, helping learners build demonstrable skills for interviews and entry-level opportunities.",
  },
  {
    icon: "briefcase",
    title: "Working Professionals",
    body: "Professionals who want to upgrade their existing skills or explore an AI-focused career path can also consider the course. AI tools are increasingly being incorporated into areas such as content, marketing, data analysis, software development and business automation. Learning these tools systematically can help professionals improve productivity while developing new capabilities.",
  },
  {
    icon: "megaphone",
    title: "Freelancers & Entrepreneurs",
    body: "Freelancers and small-business owners can learn how AI tools can support research, content creation, automation, analysis and everyday business workflows. The practical orientation makes the course relevant for people who want to use AI to improve their existing work rather than simply study AI as an academic subject.",
  },
  {
    icon: "sparkles",
    title: "Beginners Interested in Artificial Intelligence",
    body: "You do not have to be an AI expert to begin. If you are searching for AI training in Mohali, Artificial Intelligence courses in Mohali, or a practical AI course near Chandigarh, this program can provide a structured starting point. Learners can progress from AI fundamentals toward tools such as ChatGPT, Claude, LangChain, Jupyter, Zapier and Streamlit.",
  },
];

/** The checklist beside those cards, drawn from the same section and the FAQs. */
export const aiPoweredCoursesEligibility = [
  "Open from 12th onward — science, commerce or any other stream",
  "No advanced technical knowledge needed before joining; the programme begins at fundamentals",
  "Programming knowledge is not required — Python is introduced gradually",
  "Open to college students, graduates, job seekers, professionals, freelancers and entrepreneurs",
  "Weekday, evening, weekend and 1-on-1 learning options; confirm current Mohali batch timings",
];

/* -------------------------------------------------------------------------- *
 *                              Future scope                                   *
 * -------------------------------------------------------------------------- */

/** The line under the "where this course takes you" heading. */
export const aiPoweredCoursesDemand =
  "AI is no longer limited to specialised technology companies — businesses are using AI for research, content, automation, customer support, data analysis, software development and decision-making.";

/* -------------------------------------------------------------------------- *
 *                                 Compare                                     *
 * -------------------------------------------------------------------------- */

/**
 * A structured course against random online tutorials — the comparison the
 * brief draws itself in its FAQ, in the columns this section renders.
 */
export const aiPoweredCoursesComparison: {
  aspect: string;
  icon: string;
  us: string;
  them: string;
}[] = [
  {
    aspect: "Learning sequence",
    icon: "layers",
    us: "A defined pathway from fundamentals to practical AI applications.",
    them: "Disconnected tutorials collected in no particular order.",
  },
  {
    aspect: "Guidance",
    icon: "users",
    us: "Trainer guidance, with doubts handled as they come up.",
    them: "No one to ask when a concept or an output does not make sense.",
  },
  {
    aspect: "Practice",
    icon: "rocket",
    us: "Practical assignments and projects after each set of concepts.",
    them: "Watching, then moving on to the next video.",
  },
  {
    aspect: "Feedback",
    icon: "refresh",
    us: "Work reviewed, so you learn to test output, spot limitations and improve it.",
    them: "Accepting AI-generated answers without ever checking them.",
  },
  {
    aspect: "What you can show",
    icon: "cube",
    us: "A portfolio project and a live client-oriented component.",
    them: "A list of courses completed.",
  },
  {
    aspect: "Afterwards",
    icon: "briefcase",
    us: "Certification, internship documentation, CV review, mock interviews and hiring drives.",
    them: "Nothing beyond the last video.",
  },
];

/* -------------------------------------------------------------------------- *
 *                                   FAQs                                      *
 * -------------------------------------------------------------------------- */

export const aiPoweredCoursesFaqs: { q: string; a: string }[] = [
  {
    q: "What are AI-Powered Courses in Mohali?",
    a: "AI-Powered Courses in Mohali are career-focused programs that teach students how to use Artificial Intelligence, Generative AI, language models, automation and AI-powered tools for practical applications. The learning can include Python, prompt engineering, AI tools, data handling, application development and project work.",
  },
  {
    q: "Who can join AI-Powered Courses in Mohali?",
    a: "Students after 12th, college students, graduates, job seekers, working professionals, freelancers and beginners interested in Artificial Intelligence can join. Beginners can start with foundational AI concepts before progressing to more advanced topics.",
  },
  {
    q: "Do I need programming knowledge to learn AI?",
    a: "Not necessarily. Beginner-focused AI programs can start with fundamentals and introduce Python gradually. However, advanced areas such as Machine Learning, AI application development and Agentic AI may require basic programming knowledge.",
  },
  {
    q: "What will I learn in an AI-Powered Course?",
    a: "You can learn AI fundamentals, Python for AI, Generative AI, language models, prompt design, AI-assisted data handling, automation, AI application development, AI ethics, output verification and project development. Advanced pathways may include Machine Learning, Deep Learning, NLP, Computer Vision, LLMs and deployment.",
  },
  {
    q: "Which AI tools will I learn?",
    a: "Depending on the selected track, students can work with tools and technologies such as Python, ChatGPT, Claude, LangChain, Jupyter, Zapier and Streamlit. Advanced AI programs may additionally introduce TensorFlow, PyTorch, Scikit-learn, OpenCV, Hugging Face, NumPy, Pandas and other development tools.",
  },
  {
    q: "Is this course suitable for beginners?",
    a: "Yes. A beginner can start with AI fundamentals and gradually move toward practical applications. Students do not need to learn every advanced AI technology on the first day. A structured progression helps build confidence step by step.",
  },
  {
    q: "Will I work on practical AI projects?",
    a: "Yes. Project-based learning is an important part of the Techcadd AI curriculum. Students can work on practical assignments, AI-powered builds, data challenges and portfolio projects rather than relying only on theoretical learning.",
  },
  {
    q: "Will I receive a certificate after completing the course?",
    a: "Yes. Techcadd's published AI programs include an industry-recognised course certificate, with internship documentation and project-based evidence depending on the selected program.",
  },
  {
    q: "Is an internship included with the AI course?",
    a: "Techcadd's published AI curriculum includes an internship letter based on practical work. Students should confirm the exact internship structure, duration and current terms with the Mohali centre before admission.",
  },
  {
    q: "Does Techcadd provide placement assistance after AI training?",
    a: "Yes. Techcadd states that its AI programs include placement support such as portfolio preparation, CV review, mock interviews and hiring drives. Placement assistance should not be confused with a guaranteed job offer.",
  },
  {
    q: "What career options are available after learning AI?",
    a: "Depending on your skills and chosen specialization, possible career directions include AI/ML Engineer, AI Application Developer, AI Automation Specialist, Data Analyst, Machine Learning professional, Generative AI professional and other AI-supported technology roles. Your actual opportunities depend on your skills, projects, qualifications and interview performance.",
  },
  {
    q: "Can non-technical students learn AI?",
    a: "Yes. Students from non-technical backgrounds can begin with AI fundamentals, Generative AI and AI tools. If they later choose programming-heavy areas such as Machine Learning or AI application development, they may need to build additional Python and mathematics fundamentals.",
  },
  {
    q: "How long does an AI course take?",
    a: "The duration depends on the selected AI program and depth of training. Techcadd's published AI programs currently include structured options ranging from approximately 3 to 9 months, depending on the curriculum.",
  },
  {
    q: "Are weekend or flexible AI classes available?",
    a: "Techcadd's published AI programs mention weekday, evening, weekend and 1-on-1 learning options. Students should confirm the currently available Mohali batch timings before enrolling.",
  },
  {
    q: "Why should I choose an AI course instead of learning from random online tutorials?",
    a: "A structured course can provide a clear learning sequence, trainer guidance, practical assignments, projects, feedback and career preparation. Instead of collecting disconnected tutorials, students can follow a defined pathway from fundamentals to practical AI applications.",
  },
  {
    q: "How can I choose the right AI course in Mohali?",
    a: "Start by checking the syllabus, trainer experience, practical projects, tools covered, batch size, learning mode, certification, internship terms and placement support. Also attend a demo or counselling session if available before making your final decision.",
  },
  {
    q: "Can AI skills help with freelancing?",
    a: "Yes. AI skills can support freelance services such as AI-assisted content workflows, automation, data analysis, chatbot solutions, research workflows and AI application development. Your earning potential will depend on your actual expertise, portfolio, client acquisition and ability to deliver useful solutions.",
  },
  {
    q: "Is AI training useful for students after 12th?",
    a: "Yes. Students after 12th can use an AI program to build an early foundation in Python, Artificial Intelligence and modern AI tools. Starting early can also help them understand which specialised technology pathway — such as AI, Data Science, Machine Learning or development — they want to pursue later.",
  },
];

/* -------------------------------------------------------------------------- *
 *                                 Reviews                                     *
 * -------------------------------------------------------------------------- */

/** The twelve reviews from the brief, in its order and with its attributions. */
export const aiPoweredCoursesReviews: CourseReview[] = [
  {
    name: "Harpreet Singh",
    role: "BCA Student",
    company: "Mohali",
    quote:
      "“I joined the AI-Powered Course because I wanted to understand AI beyond ChatGPT. The practical sessions helped me learn Python, prompting and AI applications step by step. The project work made the concepts much easier to understand.”",
    rating: 5,
    initials: "HS",
  },
  {
    name: "Simran Kaur",
    role: "B.Sc. IT Graduate",
    company: "Chandigarh",
    quote:
      "“I was a beginner when I started the course, so I was initially worried that AI would be too technical for me. The trainers explained everything from the basics and gave practical tasks after the concepts. Now I feel much more confident working with AI tools.”",
    rating: 5,
    initials: "SK",
  },
  {
    name: "Gurpreet Singh",
    role: "B.Tech Student",
    company: "Kharar",
    quote:
      "“What I liked most was the practical approach. We were not only discussing AI concepts; we were actually using different tools and working on projects. It gave me a better understanding of how AI can be used in real applications.”",
    rating: 5,
    initials: "GS",
  },
  {
    name: "Manpreet Kaur",
    role: "Graduate",
    company: "Mohali",
    quote:
      "“I was looking for an AI course near Mohali that could help me develop a useful skill for my career. The structured modules helped me understand Generative AI, prompt engineering and AI-powered workflows. The doubt support was also helpful.”",
    rating: 5,
    initials: "MK",
  },
  {
    name: "Rahul Sharma",
    role: "Job Seeker",
    company: "Zirakpur",
    quote:
      "“I wanted to add AI skills to my existing knowledge before applying for jobs. The course helped me understand Python, AI tools and practical projects. Building a portfolio project was one of the most useful parts for me.”",
    rating: 5,
    initials: "RS",
  },
  {
    name: "Jasleen Kaur",
    role: "BCA Final Year",
    company: "Mohali",
    quote:
      "“I joined during my final year because I wanted something more practical than college theory. The trainers encouraged us to practise regularly and solve problems ourselves. The AI project work also gave me something useful to discuss during interviews.”",
    rating: 5,
    initials: "JK",
  },
  {
    name: "Navjot Singh",
    role: "Working Professional",
    company: "Chandigarh Tricity",
    quote:
      "“I joined the AI training to understand how AI could be used in my existing work. I especially found the automation and AI-tool sessions useful. The training helped me think about repetitive tasks differently and identify where AI could save time.”",
    rating: 5,
    initials: "NS",
  },
  {
    name: "Amandeep Singh",
    role: "Student",
    company: "Mohali",
    quote:
      "“As someone with limited programming experience, I was looking for a beginner-friendly AI course. The learning progression was comfortable, starting with fundamentals before moving towards applications. The practical assignments helped me learn faster.”",
    rating: 5,
    initials: "AS",
  },
  {
    name: "Neha Sharma",
    role: "Graduate",
    company: "Kharar",
    quote:
      "“The course gave me a much better understanding of Generative AI and language models. I liked learning how to write better prompts and, more importantly, how to check whether an AI response is actually reliable. It was more useful than simply learning random AI tools.”",
    rating: 5,
    initials: "NS",
  },
  {
    name: "Arjun Verma",
    role: "B.Tech Graduate",
    company: "Mohali",
    quote:
      "“I wanted practical exposure before moving towards an AI-related career. The project-based learning helped me connect Python and AI concepts with actual applications. The trainers were approachable whenever I got stuck during practical work.”",
    rating: 5,
    initials: "AV",
  },
  {
    name: "Priya",
    role: "College Student",
    company: "Chandigarh",
    quote:
      "“I was confused about where to start with Artificial Intelligence. The course provided a clear learning path instead of throwing too many advanced topics at once. Learning tools like ChatGPT, Claude and LangChain along with practical applications was a good experience.”",
    rating: 5,
    initials: "PR",
  },
  {
    name: "Manav",
    role: "Career Switcher",
    company: "Mohali",
    quote:
      "“I joined the program to build a technology skill that could complement my previous experience. What stood out for me was the focus on practical work, portfolio development and understanding AI limitations. It gave me a clearer direction for my next career step.”",
    rating: 5,
    initials: "MA",
  },
];
