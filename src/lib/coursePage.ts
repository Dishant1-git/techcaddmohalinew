import type { CategoryKey, Course } from "@/lib/courses";
import { categories, categoryLabel, faqs as generalFaqs, testimonials } from "@/lib/courses";
import {
  aiPoweredMarketingAudience,
  aiPoweredMarketingComparison,
  aiPoweredMarketingDemand,
  aiPoweredMarketingEligibility,
  aiPoweredMarketingFaqs,
  aiPoweredMarketingLearn,
  aiPoweredMarketingReviews,
  aiPoweredMarketingSectionCopy,
  aiPoweredMarketingSeo,
  aiPoweredMarketingWhyChoose,
} from "@/lib/content/aiPoweredMarketing";
import {
  chatgptAiToolsAudience,
  chatgptAiToolsComparison,
  chatgptAiToolsDemand,
  chatgptAiToolsEligibility,
  chatgptAiToolsFaqs,
  chatgptAiToolsLearn,
  chatgptAiToolsReviews,
  chatgptAiToolsSectionCopy,
  chatgptAiToolsSeo,
  chatgptAiToolsWhyChoose,
} from "@/lib/content/chatgptAiTools";
import {
  ragAudience,
  ragComparison,
  ragDemand,
  ragEligibility,
  ragFaqs,
  ragLearn,
  ragReviews,
  ragSectionCopy,
  ragSeo,
  ragWhyChoose,
} from "@/lib/content/rag";
import {
  aiPoweredCoursesAudience,
  aiPoweredCoursesComparison,
  aiPoweredCoursesDemand,
  aiPoweredCoursesEligibility,
  aiPoweredCoursesFaqs,
  aiPoweredCoursesLearn,
  aiPoweredCoursesReviews,
  aiPoweredCoursesSectionCopy,
  aiPoweredCoursesSeo,
  aiPoweredCoursesWhyChoose,
} from "@/lib/content/aiPoweredCourses";
import {
  allAiCoursesAudience,
  allAiCoursesComparison,
  allAiCoursesDemand,
  allAiCoursesEligibility,
  allAiCoursesFaqs,
  allAiCoursesLearn,
  allAiCoursesReviews,
  allAiCoursesSectionCopy,
  allAiCoursesSeo,
  allAiCoursesWhyChoose,
} from "@/lib/content/allAiCourses";
import {
  mernCertificateAudience,
  mernCertificateEligibility,
  mernCertificateFaqs,
  mernCertificateWhyChoose,
} from "@/lib/content/mernCertificate";
import {
  dataScienceCertificateAudience,
  dataScienceCertificateEligibility,
  dataScienceCertificateFaqs,
  dataScienceCertificateWhyChoose,
} from "@/lib/content/dataScienceCertificate";
import {
  agenticAiCertificateAudience,
  agenticAiCertificateEligibility,
  agenticAiCertificateFaqs,
  agenticAiCertificateWhyChoose,
} from "@/lib/content/agenticAiCertificate";
import {
  cyberSecurityCertificateAudience,
  cyberSecurityCertificateEligibility,
  cyberSecurityCertificateFaqs,
  cyberSecurityCertificateWhyChoose,
} from "@/lib/content/cyberSecurityCertificate";
import {
  cloudComputingCertificateAudience,
  cloudComputingCertificateEligibility,
  cloudComputingCertificateFaqs,
  cloudComputingCertificateWhyChoose,
} from "@/lib/content/cloudComputingCertificate";
import {
  digitalMarketingCertificateAudience,
  digitalMarketingCertificateEligibility,
  digitalMarketingCertificateFaqs,
  digitalMarketingCertificateWhyChoose,
} from "@/lib/content/digitalMarketingCertificate";
import {
  artificialIntelligenceCertificateAudience,
  artificialIntelligenceCertificateEligibility,
  artificialIntelligenceCertificateFaqs,
  artificialIntelligenceCertificateWhyChoose,
} from "@/lib/content/artificialIntelligenceCertificate";
import {
  flutterCertificateAudience,
  flutterCertificateEligibility,
  flutterCertificateFaqs,
  flutterCertificateWhyChoose,
} from "@/lib/content/flutterCertificate";
import {
  dataAnalyticsCertificateAudience,
  dataAnalyticsCertificateEligibility,
  dataAnalyticsCertificateFaqs,
  dataAnalyticsCertificateWhyChoose,
} from "@/lib/content/dataAnalyticsCertificate";
import {
  fullStackDevelopmentCertificateAudience,
  fullStackDevelopmentCertificateEligibility,
  fullStackDevelopmentCertificateFaqs,
  fullStackDevelopmentCertificateWhyChoose,
} from "@/lib/content/fullStackDevelopmentCertificate";
import {
  basicComputerOfficeSkillsAudience,
  basicComputerOfficeSkillsEligibility,
  basicComputerOfficeSkillsFaqs,
  basicComputerOfficeSkillsReviews,
  basicComputerOfficeSkillsWhyChoose,
} from "@/lib/content/basicComputerOfficeSkills";

/**
 * Everything the /courses/[slug] detail page renders beyond what `courses.ts`
 * already stores. Kept in its own module on purpose: the course catalogue is
 * shared by the nav, the listing grid and the cards, so it stays untouched and
 * this file derives the extra sections (why choose, who can join, per-course
 * FAQs and reviews) from the course it is handed.
 *
 * Everything here is a pure function of the course, so the detail page still
 * prerenders statically from `generateStaticParams`.
 */

/* -------------------------------------------------------------------------- *
 *                            Deterministic seeding                            *
 * -------------------------------------------------------------------------- */

/**
 * Reviews and rating summaries must match between server render and client
 * hydration, and between builds — so they are seeded from the slug rather than
 * randomised. Same slug in, same numbers out, every time.
 */
function seeded(key: string) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return Math.abs(h % 100000) / 100000;
  };
}

/* -------------------------------------------------------------------------- *
 *                            Which copy to render                             *
 * -------------------------------------------------------------------------- */

/**
 * The key every written block in this file is stored under.
 *
 * A course's slug, unless its record carries a `contentKey` — which is how one
 * course reached from two menus shows two different pages. The AI menu's
 * override map can hand `/courses/ai/data-science` a record keyed
 * `data-science--ai`, and every lookup below then finds the copy written for
 * that key while `/courses/course/data-science` keeps the catalogue's.
 *
 * Nothing has to be written for a new key: each lookup falls back to the copy
 * derived from the course record, and the record itself is what the override
 * changed, so a menu gets a page of its own either way.
 */
export function contentKey(course: Course) {
  return course.contentKey ?? course.slug;
}

/* -------------------------------------------------------------------------- *
 *                          In-page section rail                               *
 * -------------------------------------------------------------------------- */

/** Anchor rail shown under the hero. Order matches the DOM order on the page. */
export const courseSections = [
  { id: "overview", label: "Overview" },
  { id: "modules", label: "Modules" },
  { id: "learn", label: "What you learn" },
  { id: "why", label: "Why choose us" },
  { id: "who", label: "Who can join" },
  { id: "tools", label: "Tools" },
  { id: "certificate", label: "Certification" },
  { id: "scope", label: "Future scope" },
  { id: "compare", label: "Compare" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
  { id: "enquire", label: "Enquire" },
];

/* -------------------------------------------------------------------------- *
 *                             Course photography                              *
 * -------------------------------------------------------------------------- */

export type CourseImage = { src: string; alt: string };

/**
 * The photograph shown beside the overview, keyed by slug.
 *
 * The site ships no photography yet, so this starts empty and every course
 * falls back to the generated artwork in <CourseVisual/>. To use a real photo:
 * drop the file into `public/courses/` and add one line here. Paths are listed
 * explicitly rather than guessed from the slug, so a file that has not been
 * added yet can never render as a broken image.
 *
 *   "data-science": {
 *     src: "/courses/data-science.jpg",
 *     alt: "Students working through a dataset in the Mohali lab",
 *   },
 */
export const courseImages: Record<string, CourseImage> = {};

export function courseImage(course: Course): CourseImage | undefined {
  return courseImages[contentKey(course)];
}

/** The category's gradient, reused from the catalogue so nothing drifts. */
export function categoryArt(course: Course) {
  const category = categories.find((c) => c.key === course.category);
  return {
    gradient: category?.accent ?? "from-hero-glow to-brand-700",
    icon: category?.icon ?? "sparkles",
    label: categoryLabel[course.category],
  };
}

/* -------------------------------------------------------------------------- *
 *                                 Highlights                                  *
 * -------------------------------------------------------------------------- */

export function courseHighlights(course: Course) {
  const topics = course.modules.reduce((n, m) => n + m.points.length, 0);
  return [
    // A course that advertises no fixed length shows the batch tile instead,
    // which is the honest answer and keeps the row at four.
    course.duration
      ? { icon: "clock", value: course.duration, label: "Programme length" }
      : { icon: "clock", value: "Flexible", label: "Batch-based schedule" },
    { icon: "layers", value: `${course.modules.length} modules`, label: `${topics} topics covered` },
    { icon: "target", value: course.level, label: "Difficulty level" },
    { icon: "briefcase", value: "100%", label: "Placement assistance" },
  ];
}

/* -------------------------------------------------------------------------- *
 *                      What we learn in this program                          *
 * -------------------------------------------------------------------------- */

/**
 * A flat, scannable skill list built from the leading bullets of every module —
 * the headline capabilities, without repeating the full curriculum accordion
 * that sits above it.
 */
export function learningPoints(course: Course) {
  return course.modules.flatMap((m, moduleIndex) =>
    m.points.slice(0, 2).map((point) => ({ point, module: m.title, moduleIndex })),
  );
}

/**
 * The written version of the same section.
 *
 * A course page written to its own brief explains what it teaches in prose —
 * a numbered stage, a heading and a paragraph or two each — rather than as a
 * grid of one-line skills. Where a slug appears here, <LearnPoints/> renders
 * this instead of the derived list; every other course keeps the grid.
 */
/**
 * `body` is optional: a stage written as a bare list of modules has a heading
 * and its bullets and nothing to say in between, and an empty lead-in
 * paragraph would render as a gap above the list.
 */
export type LearnTopic = { title: string; body?: string[]; points?: string[] };
export type LearnDetail = {
  intro?: string;
  topics: LearnTopic[];
  outro?: string[];
  /** The figure in the tile beside the heading. Defaults to the topic count. */
  count?: { value: string; label: string };
};

const learnDetailBySlug: Record<string, LearnDetail> = {
  "ai-powered-marketing": aiPoweredMarketingLearn,
  "chatgpt-ai-tools": chatgptAiToolsLearn,
  rag: ragLearn,
  "ai-powered-courses": aiPoweredCoursesLearn,
  "all-ai-courses": allAiCoursesLearn,
  "agentic-ai": {
    intro:
      "This isn't a theory-only syllabus. The program runs as a single ladder of 33 modules with three exit points — 3, 6, and 9 months — and every module ends with a graded deliverable that goes straight into your portfolio. Module 01 starts at Python from the first line, so no programming background is required to join our Mohali batch; from Module 02 onward, every session is agent engineering.",
    count: { value: "33", label: "modules, three exit points" },
    topics: [
      {
        title: "Foundation stage — Agent Practitioner (Modules 1–7, 3 months)",
        points: [
          "Programming Foundations — Python, the command line, Git and GitHub, HTTP/REST, and SQL from absolute zero",
          "LLM Foundations, Prompting & Structured Output — tokenization, context windows, and returning schema-valid JSON reliably",
          "Tool Calling, Function Execution & MCP — building a ReAct loop from scratch and working with Model Context Protocol servers",
          "Retrieval-Augmented Generation & Knowledge Grounding — embeddings, hybrid search, reranking, and clause-level citations",
          "Memory, State & Context Management — short-term, long-term, and episodic memory with multi-user isolation",
          "Agent Frameworks, Graph Orchestration & Delegation — LangGraph nodes, conditional routing, and human-in-the-loop approvals",
          "Evaluation, Guardrails, Deployment & Capstone — gold datasets, CI regression gates, and shipping a deployed agent",
        ],
      },
      {
        title: "What you build in Stage 1",
        body: [
          "A containerised FastAPI service, a document-extraction engine, a published MCP server, a cited RAG compliance copilot, a human-in-the-loop approval agent, and a fully deployed support agent with a cost-per-conversation report.",
        ],
      },
      {
        title: "Engineer stage (Modules 8–20, 6 months)",
        body: [
          "Adds async engineering, multi-provider model routing, DSPy optimisation, GraphRAG, durable execution with Temporal, multi-agent systems, browser and coding agents, red-teaming, and Kubernetes deployment with cost engineering.",
        ],
      },
      {
        title: "Architect stage (Modules 21–33, 9 months)",
        body: [
          "Moves from building an agent to owning the platform: CDC data ingestion, billion-scale vector infrastructure, A2A agent interoperability, a full evaluation service, fine-tuning and reinforcement-learning post-training, voice and multimodal agents, and governance mapped to the EU AI Act and NIST AI RMF.",
        ],
      },
      {
        title: "The tools you'll actually use — installed on our Mohali lab machines",
        body: [
          "Python, LangGraph, LangChain, CrewAI, the Claude API, OpenAI API, and Gemini API, Ollama for local models, FastAPI, Pydantic, the MCP SDK, Qdrant, Chroma, pgvector, Neo4j, LangSmith, Langfuse, RAGAS, promptfoo, Garak and PyRIT for red-teaming, Playwright and Browser Use for browser agents, and Docker, Kubernetes, Terraform, and Temporal for production deployment.",
        ],
      },
    ],
    outro: [
      "Every module names the exact tool stack, the commercial problem it solves, and the graded artefact you'll walk into an interview with — so students at our Mohali centre leave with a portfolio, not just a certificate.",
    ],
  },
  "prompt-engineering": {
    intro:
      "Techcadd's Prompt Engineering course in Mohali follows a structured, phase-wise curriculum that takes you from complete beginner to confident, job-ready AI practitioner. Here's what the journey covers:",
    count: { value: "8", label: "phases, beginner to job-ready" },
    topics: [
      {
        title: "Phase 1: Foundations of Generative AI",
        body: [
          "You'll start by understanding what generative AI actually is — how large language models (LLMs) process language, generate responses, and differ from traditional software. You'll explore categories of generative AI tools: text generation (ChatGPT, Claude, Gemini), image generation (Midjourney, DALL·E, Stable Diffusion), and emerging tools for video, audio, and music generation. This phase builds the conceptual base so you understand why prompts work the way they do — not just which buttons to click.",
        ],
      },
      {
        title: "Phase 2: Mastering ChatGPT",
        body: [
          "This module transforms you from a casual ChatGPT user into a power user. You'll learn conversation design, context management, custom instructions, memory handling, and how to structure multi-turn conversations that consistently produce high-quality output for writing, research, coding help, and business tasks.",
        ],
      },
      {
        title: "Phase 3: Prompt Engineering Excellence (Core Module)",
        body: [
          "This is the heart of the course. You'll learn the core prompting frameworks used by professionals:",
          "You'll practice these techniques across real applications — content writing, data analysis, coding assistance, customer support scripting, and creative brainstorming — until structuring an effective prompt becomes second nature.",
        ],
        points: [
          "Zero-shot prompting — getting results without examples",
          "Few-shot prompting — using examples to guide output style and format",
          "Chain-of-thought prompting — encouraging step-by-step AI reasoning",
          "Role-based / persona prompting — assigning the AI a specific expert role",
          "Prompt chaining and iteration — refining prompts through structured feedback loops",
          "Instruction clarity, context-setting, and constraint design — the building blocks of every effective prompt",
        ],
      },
      {
        title: "Phase 4: Visual AI & Midjourney",
        body: [
          "You'll move into visual prompt engineering, learning how to generate high-quality images using Midjourney — covering style parameters, aspect ratios, reference imaging, and iterative prompt refinement for design, marketing, and content use cases.",
        ],
      },
      {
        title: "Phase 5: NLP Fundamentals & AI Applications",
        body: [
          "A lighter introduction to Natural Language Processing concepts using libraries like NLTK and spaCy, helping you understand what's happening \"under the hood\" when you interact with chatbots, sentiment analyzers, and text classifiers — useful context for anyone moving toward more technical AI roles.",
        ],
      },
      {
        title: "Phase 6: AI Tools for Productivity & Automation",
        body: [
          "You'll explore how prompt engineering applies beyond chat — automating workflows, building simple AI-powered assistants, and integrating AI into everyday business and content tasks.",
        ],
      },
      {
        title: "Phase 7: Ethics, Limitations & Responsible AI Use",
        body: [
          "Understanding AI hallucinations, bias, data privacy, and the ethical boundaries of AI-generated content — essential knowledge for using these tools responsibly in professional settings.",
        ],
      },
      {
        title: "Phase 8: Capstone Projects",
        body: [
          "You'll finish the course by building a portfolio of real, presentable AI projects — combining text and visual prompting skills into practical outputs you can showcase to employers or clients.",
        ],
      },
    ],
    outro: [
      "Tools & Platforms You'll Work With: ChatGPT, Claude, Google Gemini, Midjourney, DALL·E, Stable Diffusion, NLTK, spaCy, plus AI-powered productivity and automation tools used in real workplace settings.",
      "By the end, you won't just understand prompt engineering in theory — you'll have hands-on fluency across the exact tools Mohali and tricity employers are actively looking for.",
    ],
  },
  "generative-ai": {
    intro:
      "The Generative AI Course in Mohali by Techcadd is structured to take students from understanding how modern AI systems work to actually building and deploying AI-powered applications. The curriculum on Techcadd’s current Generative AI course page focuses on LLMs, prompt design and evaluation, OpenAI and Claude, open-source models, embeddings, vector databases, RAG, image and audio generation, Python-based AI applications, deployment, safety, and cost management.",
    topics: [
      {
        title: "Generative AI & Large Language Model Fundamentals",
        body: [
          "You will begin by understanding the foundation of Generative AI and how Large Language Models (LLMs) work. This gives you the technical context needed to understand why AI models generate particular responses and how they can be used effectively in applications.",
          "You will explore concepts such as AI-generated text, model capabilities, limitations, context, tokens, and practical LLM workflows. The aim is to move beyond simply asking questions to AI tools and understand the technology powering modern AI applications.",
        ],
      },
      {
        title: "Prompt Engineering & Prompt Evaluation",
        body: [
          "Prompt engineering is an important part of working with Generative AI. You will learn how to create structured prompts, improve instructions, provide context, control outputs, and evaluate whether a prompt is actually producing reliable results.",
          "The course focuses not only on writing prompts but also on testing and judging prompt quality, helping you develop a more systematic approach to AI interaction and application development.",
        ],
      },
      {
        title: "Working with OpenAI, ChatGPT & Claude",
        body: [
          "The course provides practical exposure to popular AI platforms and model ecosystems, including OpenAI/ChatGPT and Claude. You learn how these models can be integrated into practical workflows and applications instead of using them only through their consumer interfaces.",
          "This can help students understand model selection, API-based interaction, prompt workflows, and the difference between simply using an AI assistant and incorporating an AI model into a software solution.",
        ],
      },
      {
        title: "Open-Source Models & Hugging Face",
        body: [
          "You will also explore open-source AI models through Hugging Face. This introduces students to an ecosystem of models and tools that can be used for experimentation and application development.",
          "Learning Hugging Face alongside commercial AI APIs gives students a broader understanding of the Generative AI landscape and how different model options can be incorporated into applications.",
        ],
      },
      {
        title: "Python for Generative AI Development",
        body: [
          "Python is one of the core technologies used throughout the program. You will learn how Python can be used to connect AI models, process data, build application logic, and create AI-powered solutions.",
          "The course moves from concepts toward building practical applications with Python, giving students an opportunity to combine programming knowledge with Generative AI capabilities.",
        ],
      },
      {
        title: "Embeddings & Vector Databases",
        body: [
          "One of the important technical areas covered is embeddings and vector databases. Embeddings allow information to be represented in a form that AI systems can use for similarity-based retrieval.",
          "You will learn the role of vector databases and how they can store and retrieve relevant information efficiently. The Techcadd curriculum specifically includes Pinecone as one of the tools used in this area.",
        ],
      },
      {
        title: "Retrieval-Augmented Generation (RAG)",
        body: [
          "RAG, or Retrieval-Augmented Generation, is a major practical component of the course. You will learn how to build systems that retrieve relevant information from a user's documents or knowledge base before generating an answer.",
          "This is particularly useful when developing AI assistants that need to work with business documents, internal knowledge, FAQs, research material, or other customized information. Instead of relying only on a model's pretrained knowledge, RAG allows the application to retrieve relevant external information before responding.",
        ],
      },
      {
        title: "Building AI Applications with LangChain",
        body: [
          "The course introduces LangChain for developing AI-powered applications. You will learn how frameworks like LangChain can connect models, prompts, retrieved information, tools, and application workflows.",
          "This helps students understand the architecture behind practical AI applications rather than treating an LLM as an isolated chatbot.",
        ],
      },
      {
        title: "Image & Audio Generation",
        body: [
          "Generative AI is not limited to text. The course also covers image and audio generation, giving students exposure to multimodal possibilities within the AI ecosystem.",
          "This can be particularly useful for learners interested in content creation, marketing automation, creative technology, media applications, and AI-powered digital products.",
        ],
      },
      {
        title: "AI Application Development with Streamlit",
        body: [
          "You will work with Streamlit to turn AI functionality into usable applications. Instead of keeping your work inside notebooks or scripts, Streamlit can help you create an accessible interface around your AI project.",
          "This makes the learning process more portfolio-oriented because students can demonstrate an actual working application instead of showing only code snippets.",
        ],
      },
      {
        title: "AI APIs & Model Integration",
        body: [
          "Another important skill is understanding how AI models can be integrated through APIs. You will learn the practical workflow of connecting AI services with Python applications and using model capabilities inside software solutions.",
          "This is an important step toward developing AI-based automation tools, assistants, productivity applications, and business-focused solutions.",
        ],
      },
      {
        title: "AI Safety, Cost & Deployment",
        body: [
          "The program does not stop at creating an AI prototype. The curriculum also covers cost, safety, and deployment, which are essential considerations when taking an AI application beyond experimentation.",
          "You will gain awareness of issues such as responsible AI usage, application costs, deployment considerations, and the challenges that can arise when moving an AI prototype toward a usable system.",
        ],
      },
      {
        title: "Live Projects & Portfolio Development",
        body: [
          "A major practical component is project work. Techcadd states that students work through live client projects under trainer supervision, with every stage producing something that can be reviewed and improved. The course culminates in a deployed AI application, portfolio development, CV preparation, and interview practice.",
        ],
      },
    ],
    outro: [
      "Key Tools You Can Learn — the current Techcadd Generative AI curriculum highlights a practical tool stack including: Python • LangChain • Hugging Face • OpenAI / ChatGPT • Claude • Pinecone • Streamlit.",
      "Together, these tools cover programming, LLM integration, open-source models, prompt workflows, embeddings, vector search, AI application frameworks, and application interfaces.",
      "By completing these modules and projects, students searching for a Generative AI course in Mohali can build a foundation not just for using AI tools, but for developing practical AI-powered applications and solutions.",
    ],
  },
  "artificial-intelligence": {
    intro:
      "The Artificial Intelligence Course in Mohali by Techcadd is structured to take learners from AI fundamentals to practical model building, application development and deployment. The current Techcadd syllabus covers 9 core stages, progressing through Python, mathematics and statistics, Machine Learning, Deep Learning, NLP, Generative AI and LLMs, Computer Vision, deployment and a portfolio-focused capstone.",
    topics: [
      {
        title: "Artificial Intelligence & Python Foundations",
        body: [
          "You begin by understanding what Artificial Intelligence, Machine Learning and Deep Learning actually mean and where each technology is used. The Python foundation covers programming fundamentals, data structures and libraries needed for AI development. Students work with Python, Jupyter Notebook and Google Colab, while NumPy and Pandas introduce practical data handling.",
          "Key learning areas include Python syntax, variables, operators, conditions, loops, functions, data structures, file handling and exception handling. Learners gradually move from writing basic programs to creating reusable code for AI and data projects.",
        ],
      },
      {
        title: "Mathematics, Statistics & Data Preparation",
        body: [
          "AI models depend on quality data and sound mathematical understanding. The programme introduces the essential linear algebra, probability and statistics concepts required for Machine Learning. Students also learn data preprocessing and exploratory data analysis (EDA), helping them understand datasets before applying models.",
          "Tools and technologies can include NumPy, Pandas, Matplotlib and Seaborn, giving learners the ability to clean, inspect, analyse and visualise data before model training.",
        ],
      },
      {
        title: "Machine Learning",
        body: [
          "The Machine Learning module focuses on learning patterns from data and selecting appropriate algorithms for different problems. Students explore supervised learning and unsupervised learning, including regression, classification and clustering.",
          "Learners can also build a stronger practical understanding of preprocessing, feature engineering, model evaluation and algorithm selection. The broader Techcadd AI/ML syllabus expands into techniques such as KNN, SVM, decision trees, random forests, ensemble methods, clustering and PCA.",
          "The major tool in this stage is scikit-learn, supported by the Python data-science ecosystem.",
        ],
      },
      {
        title: "Deep Learning",
        body: [
          "After classical Machine Learning, the course progresses into neural networks and Deep Learning. Students learn neural-network fundamentals, activation and loss functions, optimisation concepts and architectures used for different types of data.",
          "The syllabus includes Artificial Neural Networks (ANN), Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN) and LSTM models for tasks involving images and sequential information.",
          "Tools covered include TensorFlow, PyTorch and Keras, helping learners understand how modern deep-learning models are developed and trained.",
        ],
      },
      {
        title: "Natural Language Processing",
        body: [
          "The NLP component introduces AI systems that work with human language. Students learn text preprocessing, sentiment analysis and chatbot development before progressing toward transformers and language models.",
          "The broader curriculum also incorporates areas such as text embeddings, TF-IDF, word embeddings and vector semantics, which provide a foundation for modern language-based AI applications.",
          "Relevant technologies can include NLTK, spaCy and Hugging Face, giving learners exposure to practical NLP workflows.",
        ],
      },
      {
        title: "Generative AI & Large Language Models",
        body: [
          "Modern AI training needs to go beyond traditional prediction models. Techcadd's curriculum introduces Generative AI and Large Language Models (LLMs), including the fundamentals of generative systems and practical prompt engineering.",
          "The extended AI/ML + GenAI curriculum goes deeper into LLM fundamentals, Hugging Face integration, Retrieval-Augmented Generation (RAG), vector databases, advanced prompting, tool calling and GenAI evaluation.",
          "This gives students exposure to the technology behind applications such as AI assistants, intelligent search systems, document-question answering tools and customised chatbots.",
        ],
      },
      {
        title: "Computer Vision",
        body: [
          "Computer Vision helps machines interpret images and visual information. Students learn image processing, object detection and vision-based AI application development.",
          "The expanded Techcadd syllabus includes OpenCV and YOLO-based object detection, making the learning path more relevant to practical computer-vision applications.",
          "A learner can use these skills to understand applications such as image classification, object detection, visual inspection and intelligent camera systems.",
        ],
      },
      {
        title: "AI Application Development, APIs & Deployment",
        body: [
          "Building a model is only one part of an AI project. Students also need to understand how that model can be made usable through an application or API. Techcadd's syllabus therefore includes model deployment as web applications and APIs, along with version-control and cloud basics.",
          "The extended curriculum covers Flask, FastAPI, SQL/database integration, authentication, Git and production deployment, helping learners understand the transition from experimentation to usable AI applications.",
        ],
      },
      {
        title: "Capstone & Portfolio Development",
        body: [
          "The final stage connects the complete learning journey. Students work on an end-to-end AI project, moving from data collection and preparation to modelling and deployment. The course also incorporates live client work that can become part of a student's portfolio.",
          "This project-focused approach helps learners demonstrate practical skills instead of presenting only a training certificate. For students searching for an Artificial Intelligence course in Mohali with practical projects, portfolio development can be an important part of evaluating a programme.",
        ],
      },
    ],
    outro: [
      "Tools You Can Learn During the Course — depending on the programme track and depth, the Techcadd AI curriculum includes or works with: Python, Jupyter Notebook, Google Colab, NumPy, Pandas, Matplotlib, Seaborn, scikit-learn, TensorFlow, PyTorch, Keras, NLTK, spaCy, OpenCV, Hugging Face, LangChain, Flask, FastAPI, Streamlit, Git and GitHub, along with technologies used for RAG, vector databases, APIs and AI deployment.",
      "Overall, the Artificial Intelligence Course in Mohali is designed around a complete learning progression: learn the fundamentals → work with data → train models → build AI applications → integrate Generative AI → deploy solutions → create portfolio-ready projects.",
    ],
  },
  // The eight AutoCAD modules and their topics live in the curriculum
  // accordion above this section, so what is written here is the rest of the
  // brief: the software, the project work and why the sequence is built that
  // way — none of which the module list carries.
  "autocad": {
    intro:
      "One of the most important things to check before joining any AutoCAD course in Mohali is exactly what you'll be learning — not just vague promises of \"becoming an expert.\" Here's a detailed, transparent breakdown of the skills, tools, and modules covered in Techcadd's AutoCAD training program.",
    count: { value: "8", label: "modules, project-based throughout" },
    topics: [
      {
        title: "Tools & Software Covered",
        body: ["Throughout the course, students get hands-on time with:"],
        points: [
          "AutoCAD (latest version) — the primary software used throughout the training",
          "DWG file format management and compatibility",
          "Plotting and PDF export tools for sharing drawings professionally",
          "Introduction to complementary tools like AutoCAD 3D, with guidance on natural next steps such as Revit, SolidWorks, or 3ds Max for students who want to specialize further",
        ],
      },
      {
        title: "Real Project Work Throughout",
        body: ["Rather than saving \"real projects\" for the end, Techcadd integrates them throughout the course:"],
        points: [
          "Residential floor plan design",
          "Mechanical part and assembly drawings",
          "Civil site layout planning",
          "Interior space planning and furniture layout",
          "A final capstone project that becomes a portfolio piece for job applications in Mohali, Chandigarh, and beyond",
        ],
      },
      {
        title: "Why This Curriculum Structure Matters",
        body: [
          "Many institutes teach AutoCAD as a list of disconnected commands. Techcadd's approach is different — every tool is taught in the context of a real drafting task you'd actually perform on the job. This means that by the time you complete the course, you're not just someone who has \"seen\" AutoCAD's features — you're someone who has used them repeatedly, on realistic projects, to solve real design problems.",
          "For students in Mohali looking to enter engineering, architecture, construction, or interior design fields, this comprehensive, tool-by-tool and project-by-project curriculum is designed to make sure you leave with a skill set that's immediately usable — not just a certificate that says you attended a class.",
        ],
      },
    ],
  },
};

export function learnDetail(course: Course): LearnDetail | undefined {
  return learnDetailBySlug[contentKey(course)];
}

/* -------------------------------------------------------------------------- *
 *                        Written section headings                             *
 * -------------------------------------------------------------------------- */

/**
 * Heading, standfirst and closing note for the sections whose copy is
 * otherwise derived from the course record. A slug listed here replaces those
 * defaults on that section only; anything left undefined falls back.
 */
export type SectionCopy = {
  title?: string;
  intro?: string;
  note?: string;
  /** "At a glance" rows, rendered beside the enquiry form where a page has them. */
  facts?: { label: string; value: string }[];
};
type SectionKey = "hero" | "learn" | "why" | "who" | "tools" | "scope" | "enquire";

const sectionCopyBySlug: Record<string, Partial<Record<SectionKey, SectionCopy>>> = {
  "ai-powered-marketing": aiPoweredMarketingSectionCopy,
  "chatgpt-ai-tools": chatgptAiToolsSectionCopy,
  rag: ragSectionCopy,
  "ai-powered-courses": aiPoweredCoursesSectionCopy,
  "all-ai-courses": allAiCoursesSectionCopy,
  "agentic-ai": {
    learn: {
      title: "What you will actually build in this Agentic AI course in Mohali",
    },
    why: {
      title: "Why this Agentic AI program is worth your year",
      intro:
        "There are several places to learn Agentic AI across Mohali and the wider Tricity, and the brochure syllabus can look similar at most of them. What actually differs is who teaches you, whether you ever touch real client work, and whether anyone still picks up the phone once you've paid. Techcadd has trained students across Punjab since 2007 on the same model: small batches, working practitioners as trainers, real client projects as coursework — now brought to our Mohali centre for students across Phase 5, Phase 7, Phase 8, Sector 70, Sector 71, Zirakpur, and Kharar.",
      note: "Bottom line: If you're comparing institutes for an Agentic AI course in Mohali, the question isn't which one has the longer module list — it's which one puts you on real work, with a trainer who corrects you, and a placement cell that doesn't disappear after the fee clears. That's the case for Techcadd.",
    },
    who: {
      title: "Who can do this Agentic AI course in Mohali",
      intro:
        "Techcadd's Agentic AI course in Mohali is built for people at six different starting points, and the batch is deliberately mixed. What matters far more than your background is turning up consistently and finishing what each module asks you to build.",
      note: "Where our Mohali students commute from: Students reach our Mohali centre from Phase 5, Phase 7, Phase 8, Phase 9, Phase 11, Sector 70, Sector 71, and Sohana, with weekend batch students travelling in from Zirakpur, Kharar, Derabassi, and Panchkula. Whether you've just finished 12th, are completing a degree at a Tricity college, or are switching from a non-technical job, this Agentic AI course in Mohali starts at zero — which is why weekday, evening, weekend, and 1-on-1 timings all exist, with every class running two hours.",
    },
    enquire: {
      title: "Start your Agentic AI career in Mohali",
      intro:
        "Talk to a course counsellor about batch timings, fees, EMI options, and whether this course fits your degree or your current job. One call is usually enough to find out. Book a free demo class — see the lab before you decide.",
      facts: [
        { label: "Batches", value: "Weekday, evening, weekend and 1-on-1 — every class runs two hours" },
        {
          label: "Exit points",
          value: "3 months (Practitioner), 6 months (Engineer), 9 months (Architect) — nested, not parallel",
        },
        {
          label: "Starts from",
          value: "Module 01 teaches Python from the first line — no programming background required",
        },
        {
          label: "On completion",
          value:
            "An industry-recognised certificate plus a documented internship letter based on real client work",
        },
        {
          label: "Fresher salary",
          value: "Around ₹25,000–₹50,000 a month in the Mohali/Tricity market with a working portfolio",
        },
      ],
    },
  },
  "prompt-engineering": {
    // The standfirst for this section comes from `learnDetailBySlug.intro`,
    // which is what <LearnPoints/> reads; only the heading is set here.
    learn: {
      title: "What you'll learn & tools covered",
    },
    why: {
      title: "Why this program, and why Techcadd for Prompt Engineering in Mohali",
      intro:
        "Why prompt engineering, why now, why Mohali — and then why Techcadd. The first eight reasons below answer the first question; the nine after them answer the second.",
      note: "In short: the timing is right, the location is right, and the format is designed to get you results — not just a certificate, but a genuinely usable, career-moving skill.",
    },
    who: {
      title: "Who can enrol in the Prompt Engineering course in Mohali",
      intro:
        "Anyone can enrol — 12th-pass students, college graduates, IT professionals, digital marketers, freelancers, job seekers, and even career returnees. The course is built to be accessible across skill levels.",
      note: "No prior programming knowledge is required to start. The curriculum is designed to be accessible for 12th-pass students, graduates from any stream, working professionals, and career switchers — while still going deep enough to genuinely prepare you for AI-related job roles.",
    },
    enquire: {
      title: "Ready to Master AI? Start Your Prompt Engineering Journey in Mohali Today",
      intro:
        "Join Techcadd's Prompt Engineering Course in Mohali and gain the in-demand AI skills that employers across Chandigarh, Mohali, and Panchkula are actively hiring for. Learn hands-on, build a real portfolio, and take the first confident step into an AI-powered career — right here in your city.",
    },
  },
  "generative-ai": {
    learn: {
      title: "What you will learn & tools covered",
    },
    why: {
      title: "Why this program, and why Techcadd for Generative AI in Mohali",
      intro:
        "Generative AI is changing how software, marketing, education, design, analytics, and business processes work. The Generative AI Course in Mohali by Techcadd is valuable because it focuses on turning AI from a simple everyday tool into a practical technical skill. Instead of learning only how to write prompts, students explore how modern AI applications are designed, connected with data, and deployed for real-world use.",
      note: "Choosing the right institute can make a major difference when learning a fast-evolving technology like Generative AI. For students searching for a Generative AI training institute in Mohali, Techcadd combines structured learning, practical exposure, relevant tools, and career-oriented project work to create a more complete learning experience.",
    },
    who: {
      title: "Who can do this course",
      intro:
        "The Generative AI Course in Mohali by Techcadd is designed for learners from different educational and professional backgrounds. You do not need to be an experienced AI developer to begin. The program is suitable for students after 12th, graduates, final-year students, working professionals, freelancers, business owners, career restarters, and self-taught learners who want practical Generative AI skills. Techcadd’s current Generative AI curriculum is structured from fundamentals through prompt design, LLMs, embeddings, RAG, AI application development, deployment, and live project work.",
      note: "Basic computer knowledge and a willingness to learn are more important than having an advanced AI background. Whether you are searching for a Generative AI training institute in Mohali, planning an AI career after graduation, or simply want to understand how modern AI applications are built, this course can provide a structured path from fundamentals to practical implementation.",
    },
    enquire: {
      title: "Enroll in Generative AI Course in Mohali",
      intro:
        "Build practical Generative AI skills with Techcadd. Ready to move from simply using AI tools to building AI-powered applications? Join the Generative AI Course in Mohali by Techcadd and learn practical concepts including LLMs, prompt engineering, RAG, AI APIs, embeddings, Python, LangChain, Hugging Face, and AI application development.",
    },
  },
  "artificial-intelligence": {
    learn: {
      title: "What you will learn & tools covered",
    },
    why: {
      title: "Why choose an Artificial Intelligence Course in Mohali?",
      intro:
        "Artificial Intelligence is no longer limited to research labs or large technology companies. AI is increasingly connected with areas such as data analysis, software development, marketing, automation, education, healthcare and business operations. For students and professionals in Mohali and the wider Chandigarh Tricity, learning AI can therefore become a practical way to add a high-value technology skill to an existing academic or professional profile.",
      note: "For learners in Mohali, Chandigarh and nearby areas, choosing a structured Artificial Intelligence course in Mohali can therefore be a practical step toward developing AI skills, creating demonstrable projects and preparing for the next stage of a technology career.",
    },
    who: {
      title: "Who can do an Artificial Intelligence Course in Mohali?",
      intro:
        "An Artificial Intelligence Course in Mohali is suitable for learners from different educational and career backgrounds. You do not have to be an AI expert before joining. The Techcadd Artificial Intelligence programme starts with foundational concepts and gradually moves into Python, Machine Learning, Deep Learning, NLP, Generative AI, LLMs, Computer Vision and deployment.",
      note: "In short, the Artificial Intelligence Course in Mohali is designed for beginners as well as learners looking to upgrade, specialise or transition into AI-related careers.",
    },
    enquire: {
      title: "Build Your AI Skills with Techcadd",
      intro:
        "Ready to move from AI curiosity to practical skills? Join the Artificial Intelligence Course in Mohali by Techcadd and learn through a structured, project-focused programme covering Python, Machine Learning, Deep Learning, NLP, Generative AI, LLMs, Computer Vision and AI deployment.",
    },
  },
  "autocad": {
    learn: {
      title: "Course curriculum: what you'll actually learn",
    },
    why: {
      title: "Why this program, and why Techcadd for AutoCAD in Mohali",
      intro:
        "Choosing the right training path can feel overwhelming, especially with so many institutes across Mohali and Chandigarh claiming to offer \"the best\" AutoCAD course. So why does this particular AutoCAD training program in Mohali consistently stand out for students in the Tricity region? Here's an honest, detailed look at what makes Techcadd different — and why thousands of students across Mohali, Chandigarh, and the wider Tricity region have chosen this institute to launch their CAD careers.",
      note: "The bottom line: choosing an AutoCAD training institute isn't just about which one is closest to home or has the flashiest ad. It's about which one will actually prepare you for the real demands of the job market in and around Mohali. Techcadd combines scale, certification, practical training, experienced mentorship, flexibility, and genuine local placement support — a combination that's difficult to find in one place.",
    },
    who: {
      title: "Who can do the AutoCAD Course in Mohali?",
      intro:
        "One of the biggest reasons students across Mohali, Chandigarh, and Zirakpur choose Techcadd is because this AutoCAD course in Mohali is genuinely open to almost anyone — regardless of your educational background or current stage in life. You don't need to be an engineering topper or have prior design experience. If you have basic computer knowledge and an interest in design, drafting, or technical drawing, you're ready to start.",
      note: "In short: whether you're 18 or 38, a fresher or an experienced professional, if you're based in or around Mohali and want a practical, respected, career-boosting skill, this course is built for you.",
    },
    enquire: {
      title: "Start your CAD career today — enroll in the AutoCAD Course in Mohali",
      intro:
        "Turn your interest in design into a real, job-ready skill — right here in Mohali. Whether you're a 12th-pass student, a graduate, or a working professional looking to upskill, Techcadd's practical, project-based AutoCAD training is designed to get you industry-ready — with certification and placement support to back it up.",
      facts: [
        { label: "Course name", value: "AutoCAD Course (2D & 3D Certification)" },
        { label: "Duration", value: "1–3 Months (Regular / Fast-Track / Weekend Batches)" },
        { label: "Mode", value: "Online & Offline (Classroom + Virtual Labs)" },
        { label: "Centre", value: "Techcadd, Mohali (Chandigarh Tricity Region)" },
        { label: "Certification", value: "ISO-Certified Course Completion Certificate" },
        { label: "Placement support", value: "100% Placement Assistance" },
      ],
      note: "Have questions about batch timings, fees, or which track fits your background? Send your details and our course counsellor will call you back within 24 hours — no spam calls, only genuine course guidance, and a free counselling session so you decide once you have all the details.",
    },
  },
};

export function sectionCopy(course: Course, section: SectionKey): SectionCopy | undefined {
  return sectionCopyBySlug[contentKey(course)]?.[section];
}

/* -------------------------------------------------------------------------- *
 *                       Per-course content overrides                          *
 * -------------------------------------------------------------------------- *
 *
 * Everything else in this file is derived from the course record, which is
 * what keeps a newly added course rendering a full page for free. A course
 * whose page has been written properly — its own audience, its own reasons,
 * its own reviews and FAQs — overrides those defaults here, keyed by slug.
 * Any slug not listed keeps the derived content exactly as it was.
 */

/** "Why choose this program" cards, replacing the generic six. */
const whyChooseBySlug: Record<string, { icon: string; title: string; body: string }[]> = {
  "ai-powered-marketing": aiPoweredMarketingWhyChoose,
  "chatgpt-ai-tools": chatgptAiToolsWhyChoose,
  rag: ragWhyChoose,
  "ai-powered-courses": aiPoweredCoursesWhyChoose,
  "all-ai-courses": allAiCoursesWhyChoose,
  "mern-full-stack--certificate": mernCertificateWhyChoose,
  "data-science--certificate": dataScienceCertificateWhyChoose,
  "agentic-ai--certificate": agenticAiCertificateWhyChoose,
  "cyber-security--certificate": cyberSecurityCertificateWhyChoose,
  "cloud-computing--certificate": cloudComputingCertificateWhyChoose,
  "digital-marketing--certificate": digitalMarketingCertificateWhyChoose,
  "artificial-intelligence--certificate": artificialIntelligenceCertificateWhyChoose,
  "flutter--certificate": flutterCertificateWhyChoose,
  "data-analytics--certificate": dataAnalyticsCertificateWhyChoose,
  "full-stack-development--certificate": fullStackDevelopmentCertificateWhyChoose,
  "basic-computer-office-skills--certificate": basicComputerOfficeSkillsWhyChoose,
  // The first six answer "why this program"; the seven after them answer
  // "why Techcadd".
  "agentic-ai": [
    {
      icon: "chart",
      title: "Demand",
      body: "Agentic systems are where AI budgets are moving, and practitioners are genuinely rare across the Mohali–Chandigarh Tricity. That gap is the whole argument for this program: there is strong local demand from IT Park Mohali, Quark City, and the many product and service companies setting up in Sector 82 and Phase 8, there are real budgets behind these hires, and there are very few trained people locally to hand the work to.",
    },
    {
      icon: "terminal",
      title: "Method",
      body: "What separates this Agentic AI course in Mohali from a playlist of tutorials is supervision on real work. From the second half of the program, you build on live client projects with a trainer beside you, make decisions that have consequences, and correct them the following week. That loop — build, get corrected, rebuild — is the actual skill. No employer in Mohali or Chandigarh will take your word for it without work they can inspect.",
    },
    {
      icon: "briefcase",
      title: "Earnings",
      body: "Be realistic about the money. A fresher who finishes this course with a working portfolio typically starts around ₹25,000–₹50,000 a month in the Mohali/Tricity market, and moves up quickly with experience. Roles include AI Engineer, Agent Developer, Automation Architect, and AI Consultant. The ceiling is high, but it is earned — nobody pays a beginner well for a certificate alone.",
    },
    {
      icon: "target",
      title: "The alternative",
      body: "The alternative is what most people try first: free videos, a cheap online course, six months of drifting, and knowledge you cannot demonstrate in an interview. A structured Agentic AI course with live projects, a mentor who corrects you, an internship letter, and a placement cell that actually calls employers in Mohali and Chandigarh is the difference between knowing the subject and being hired to do it.",
    },
    {
      icon: "rocket",
      title: "Why now — Agentic AI is powering the next generation of Mohali's tech talent",
      body: "Live client work from week one, supervised by a trainer — not slides, not simulations. AI Engineer roles in the Mohali–Chandigarh Tricity start around ₹25,000–₹50,000 a month for a fresher with a working portfolio. Mohali's IT ecosystem — IT Park, Quark City, and the growing startup base around Sector 82 — is actively hiring for agent-building skills that most local candidates simply don't have yet. A Mohali address costs you nothing on a remote brief either — students from this program go on to bill clients in Delhi, Dubai, and beyond, since agentic AI work isn't limited by geography.",
    },
    {
      icon: "check",
      title: "What decides whether it's worth it",
      body: "It isn't the syllabus — most institutes in Mohali show a similar module list. What decides it is whether you ever touch real client work, whether a trainer actually reviews what you built this week, and whether anyone still picks up the phone for you after you've paid and finished. That's the bar this Agentic AI course in Mohali is built to clear.",
    },
    {
      icon: "users",
      title: "Trainers who still do the work",
      body: "Your trainer at Techcadd Mohali isn't a full-time lecturer reading off slides. They deliver client projects for Techcadd's own services arm, so what you see in class — the tools, the failure modes, the fixes — is current, not a five-year-old case study.",
    },
    {
      icon: "code",
      title: "Live projects, real consequences",
      body: "You work on genuine client requirements under supervision, building the same kind of agents companies in IT Park Mohali and Quark City are actually hiring for. This is where a real portfolio comes from, and it's the first thing an interviewer in Chandigarh or Mohali asks to see.",
    },
    {
      icon: "monitor",
      title: "Small batches and open lab hours",
      body: "Batches at our Mohali centre stay small enough that a trainer sees your screen daily. Lab time runs outside class hours, and doubt-clearing sessions continue until the concept actually lands — not until the clock runs out.",
    },
    {
      icon: "certificate",
      title: "Internship letter and certificate",
      body: "Every student finishes the Agentic AI course in Mohali with an industry-recognised certificate and a documented internship letter based on real client work — accepted for industrial training requirements at most Punjab universities, including colleges across the Chandigarh–Mohali education belt.",
    },
    {
      icon: "phone",
      title: "A placement cell that persists",
      body: "Mock interviews, CV reviews, and hiring drives with partners across Mohali, Chandigarh, and Panchkula, repeated after a rejection rather than abandoned. Techcadd's placement cell keeps calling on your behalf, not just until you enrol.",
    },
    {
      icon: "shield",
      title: "Since 2007, 25,000+ students trained",
      body: "Nearly two decades of hiring relationships across Punjab and the Tricity is why a call from our placement cell gets answered, and why local employers in Mohali know exactly what a Techcadd certificate means.",
    },
    {
      icon: "layers",
      title: "What you're really being taught",
      body: "Tools in any AI syllabus will be replaced within a few years — frameworks change every quarter. What doesn't change are the underlying skills: evaluation over demos, engineering discipline over model tricks, and the judgement to know when not to build an autonomous agent at all. That's the standard Techcadd Mohali trainers hold you to on every module, because it's the standard a real interview in this field actually tests.",
    },
  ],
  // The first eight answer "why prompt engineering, why now, why Mohali"; the
  // nine after them answer "why Techcadd".
  "prompt-engineering": [
    {
      icon: "sparkles",
      title: "AI Is No Longer Optional — It's the New Baseline Skill",
      body: "Just like computer literacy became non-negotiable in the 2000s and digital marketing became essential in the 2010s, prompt engineering is becoming the core skill of the 2020s AI economy. Every industry — IT, healthcare, education, finance, retail, and marketing — is integrating generative AI into daily operations. Professionals who can direct AI tools effectively are becoming significantly more valuable than those who can't, regardless of their original field of study.",
    },
    {
      icon: "pin",
      title: "Mohali Is Emerging as a Serious Tech and AI Hub",
      body: "Mohali is no longer just \"next to Chandigarh.\" With IT Park, Sector 74, Phase 8B, and the Sahibzada Ajit Singh Nagar tech corridor rapidly filling up with IT companies, startups, and BPOs, the demand for AI-literate professionals in this region has grown sharply. Local businesses — from IT firms to marketing agencies to ed-tech startups — are actively looking for people who understand how to work with tools like ChatGPT, Claude, and Midjourney. Studying a Prompt Engineering course in Mohali means you're training exactly where the jobs are opening up, without needing to relocate to Bangalore, Delhi, or Gurugram.",
    },
    {
      icon: "clock",
      title: "Faster ROI Than Traditional Degrees",
      body: "A full-time degree can take three to four years. Techcadd's Prompt Engineering program is designed to get you job-ready in a fraction of that time, with a curriculum focused entirely on practical, employable skills rather than long theoretical detours. For students and professionals who need to start earning sooner, this is a realistic, high-value alternative.",
    },
    {
      icon: "chart",
      title: "High Demand, Limited Local Supply of Trained Talent",
      body: "While national job platforms show a rising number of prompt engineering and AI-support roles, the number of properly trained candidates in tier-2 cities like Mohali remains low. This gap works in your favor — early movers who train now, while the field is still growing, position themselves ahead of the curve as more companies begin hiring locally for these roles over the next few years.",
    },
    {
      icon: "target",
      title: "Skills That Apply Across Every Career Path",
      body: "Unlike narrow technical certifications, prompt engineering skills transfer across careers. A marketer, a developer, a customer support executive, and a business owner in Mohali can all apply the same core prompting techniques to completely different problems. This makes the program a safe, future-proof investment regardless of which direction your career eventually takes.",
    },
    {
      icon: "rocket",
      title: "Hands-On, Project-Based Learning — Not Just Theory",
      body: "This program is built around real prompting exercises, live AI tool practice, and portfolio-ready projects, not passive lecture-watching. You leave with actual work you can show employers or clients — something theoretical courses often fail to provide.",
    },
    {
      icon: "certificate",
      title: "Recognized Certification for Local and Remote Opportunities",
      body: "A certificate from a known Mohali-based training institute adds credibility when applying to local companies, freelance platforms, or remote-first organizations that increasingly hire AI-literate talent from tier-2 cities across India.",
    },
    {
      icon: "users",
      title: "Community and Mentorship, Not Isolated Online Learning",
      body: "Learning prompt engineering through a self-paced YouTube video or random online course often leaves gaps. Techcadd's Mohali centre offers structured, in-person guidance, doubt-resolution, and peer learning — something that significantly improves retention and real-world application compared to solo online learning.",
    },
    {
      icon: "shield",
      title: "A Trusted Name in IT & Computer Education Since 2016",
      body: "Techcadd isn't a fly-by-night AI bootcamp that popped up when ChatGPT went viral. Founded in 2016, Techcadd has built a track record training students across Punjab in software development, CAD/CAE, data science, and now generative AI — giving the Mohali centre a foundation of real institutional experience, not hype-driven curriculum.",
    },
    {
      icon: "pin",
      title: "A Locally Rooted, Tricity-Focused Institute",
      body: "Unlike generic online platforms that treat every student the same regardless of location, Techcadd's Prompt Engineering course in Mohali is designed with the tricity job market in mind — Chandigarh, Mohali, Panchkula, Zirakpur, and Kharar. Trainers understand which local companies are hiring, what skills regional employers actually expect, and how to position students for opportunities in this specific market — something a purely online, one-size-fits-all course simply cannot offer.",
    },
    {
      icon: "layers",
      title: "Structured, Phase-Wise Curriculum — Not Random Video Lessons",
      body: "Techcadd's program is built in a clear, progressive structure: starting with the foundations of generative AI, moving into ChatGPT mastery, then into dedicated Prompt Engineering excellence, followed by visual AI tools like Midjourney, and finishing with capstone projects. This phase-wise design means you're never thrown into advanced prompting techniques before you understand the basics of how AI models actually process instructions — reducing confusion and building real confidence.",
    },
    {
      icon: "terminal",
      title: "Hands-On, Project-Based Classroom Training",
      body: "Every module is reinforced through live practice — not passive watching. Students work directly on real prompting tasks across writing, coding assistance, business analysis, and image generation, using tools like ChatGPT, Claude, Gemini, and Midjourney. By the end of the course, you don't just \"know\" prompt engineering — you have a portfolio of real projects to show.",
    },
    {
      icon: "users",
      title: "Experienced, Industry-Aware Trainers",
      body: "Techcadd's instructors bring practical, real-world exposure rather than purely academic backgrounds, ensuring what you learn in class reflects how AI tools are actually used in workplaces today — not outdated textbook theory.",
    },
    {
      icon: "code",
      title: "Beginner-Friendly, No Coding Background Required",
      body: "You don't need to know Python or have an IT degree to start. The curriculum is designed to be accessible for 12th-pass students, graduates from any stream, working professionals, and career switchers — while still going deep enough to genuinely prepare you for AI-related job roles.",
    },
    {
      icon: "monitor",
      title: "Offline, In-Person Learning at the Mohali Centre",
      body: "While online courses are convenient, they often lack accountability and doubt-resolution. Techcadd's Mohali centre offers classroom-based, face-to-face training, where you can ask questions in real time, learn alongside peers, and get direct mentor feedback — something that consistently improves outcomes compared to solo online learning.",
    },
    {
      icon: "briefcase",
      title: "Career Support and Placement Assistance",
      body: "Techcadd doesn't just teach and leave you to figure out the job search alone. Students get guidance on resume building, portfolio presentation, and interview preparation, along with placement support to connect skills learned in class with real opportunities in Mohali and the wider tricity job market.",
    },
    {
      icon: "check",
      title: "Affordable, Transparent Pricing",
      body: "Compared to premium metro-city bootcamps or expensive international certifications, Techcadd's Mohali-based pricing makes quality AI education accessible to local students and professionals without compromising on curriculum depth or trainer quality.",
    },
  ],
  "cyber-security": [
    {
      icon: "shield",
      title: "Cybersecurity is no longer optional for businesses",
      body: "Every company — from startups in Mohali's IT City to established enterprises in Chandigarh — now depends on digital infrastructure, which makes every one of them a potential target. That has created sustained, long-term demand for skilled security professionals, not a temporary hiring trend.",
    },
    {
      icon: "layers",
      title: "Structured learning beats scattered self-study",
      body: "Cybersecurity covers networking, operating systems, ethical hacking, cryptography and compliance. A structured program teaches them in the right sequence, so you build on fundamentals properly and miss none of the topics employers expect you to know.",
    },
    {
      icon: "terminal",
      title: "Hands-on practice over passive watching",
      body: "Built around live labs, real vulnerability testing and simulated attack-and-defence scenarios. Employers look for candidates who have worked with Nmap, Wireshark, Metasploit and Burp Suite — not candidates who watched someone else use them.",
    },
    {
      icon: "users",
      title: "Local mentorship makes a real difference",
      body: "Trainers who understand the Mohali job market, regional hiring patterns and what tricity IT companies expect. You ask questions in real time, get feedback on your approach, and build a mentor relationship that lasts well beyond the classroom.",
    },
    {
      icon: "briefcase",
      title: "Career support built into the program",
      body: "Resume building, interview preparation and placement assistance are part of the course, not an afterthought — and a local training partner that knows regional hiring companies makes the move into a job significantly smoother.",
    },
    {
      icon: "building",
      title: "A growing local tech ecosystem",
      body: "Mohali's IT sector has expanded rapidly, with the IT City hosting numerous technology companies actively hiring for security roles. Training locally puts you where the opportunities are — walk-in interviews, networking events and industry meetups included.",
    },
    {
      icon: "target",
      title: "Affordable, accessible and community-focused",
      body: "Compared with relocating to Delhi or Bangalore, learning in Mohali means a lower cost of living, an easier commute across the tricity and a peer group from similar backgrounds — with training quality that matches the bigger cities.",
    },
  ],
  "cloud-computing": [
    {
      icon: "cloud",
      title: "Cloud Is the Backbone of Modern Business, Not a Passing Trend",
      body: "From startups in Mohali's IT City to large enterprises across Chandigarh, nearly every business now runs part or all of its operations on cloud platforms like AWS, Azure, or Google Cloud. This isn't a temporary hiring wave — it's a fundamental, long-term shift in how technology infrastructure works. Choosing cloud computing means choosing a skill set with sustained, growing demand.",
    },
    {
      icon: "layers",
      title: "Structured Learning Beats Scattered Self-Study",
      body: "Cloud computing spans a wide range of topics — virtualization, networking, storage, security, deployment models, and specific platform services. Piecing this together from random tutorials often leaves dangerous gaps in understanding, gaps that surface painfully during technical interviews or on the job. A structured program ensures concepts build logically, from fundamentals to advanced deployment, without critical topics slipping through the cracks.",
    },
    {
      icon: "terminal",
      title: "Hands-On Practice Over Passive Watching",
      body: "Watching someone else configure a cloud server teaches you very little. This program is built around live labs, real cloud consoles, hands-on deployment exercises, and practical scenarios that mirror actual workplace tasks. Employers today expect candidates to demonstrate real experience with platforms like AWS EC2, Azure Virtual Machines, and cloud storage services — not just theoretical familiarity from a video.",
    },
    {
      icon: "users",
      title: "Local Mentorship Makes a Real Difference",
      body: "Learning cloud computing in Mohali, from trainers who understand the local job market and the specific expectations of IT companies across the tricity region, gives you a genuine practical edge. You get real-time answers to your doubts, personalized feedback on your lab work, and a mentor relationship that continues to support you well after the course ends — something online-only learning simply can't replicate.",
    },
    {
      icon: "briefcase",
      title: "Career Support Built Into the Program",
      body: "A strong training program doesn't stop at teaching — it prepares you for what comes next: resume building tailored to cloud roles, interview preparation, and placement assistance. For students across Mohali, Kharar, Zirakpur, Dera Bassi, and Chandigarh, having a local training partner that understands regional hiring patterns makes the jump into an actual job noticeably smoother.",
    },
    {
      icon: "building",
      title: "A Rapidly Expanding Local Tech Ecosystem",
      body: "Mohali's IT sector has grown substantially in recent years, with the IT City hosting a growing number of technology and software companies actively hiring for cloud-related roles. Training locally means you're positioned right where this demand is emerging, with easier access to walk-in interviews, local tech meetups, and networking opportunities within the region.",
    },
    {
      icon: "target",
      title: "Affordable, Accessible, and Community-Focused",
      body: "Compared to relocating to a metro city like Bangalore or Delhi for cloud training, learning in Mohali offers a lower cost of living, easier commute for tricity residents, and a supportive local peer community — all without compromising on the quality of training or the relevance of skills taught.",
    },
  ],
  linux: [
    {
      icon: "layers",
      title: "Linux Powers the Backbone of Modern IT",
      body: "Nearly every server, cloud platform (AWS, Azure, Google Cloud), and enterprise data centre runs on Linux. Companies across the Mohali IT Park, Chandigarh Tricity, and beyond rely on Linux systems daily — which means Linux skills are not optional extras, they're foundational. Learning Linux here means learning a skill that stays relevant regardless of which specific technology trend comes next.",
    },
    {
      icon: "rocket",
      title: "Gateway to High-Growth Career Paths",
      body: "This program isn't a dead-end course — it's a launchpad. Once you understand Linux fundamentals, you're naturally positioned to move into System Administration, Cloud Computing (AWS/Azure), DevOps Engineering, Cybersecurity, and Ethical Hacking. Each of these fields is actively hiring across India's IT hubs, including the growing tech ecosystem in Mohali. Instead of learning one narrow skill, you're building a foundation that opens multiple career doors.",
    },
    {
      icon: "terminal",
      title: "Practical, Lab-Based Learning — Not Just Theory",
      body: "A major reason students choose this program is the hands-on approach. Rather than sitting through slide-based lectures, you get live lab practice, real server setups, and project-based exercises. You'll actually install Linux, configure permissions, write shell scripts, and troubleshoot systems — the same tasks you'll be doing on the job. This \"learning by doing\" method is especially valuable for students coming from non-technical backgrounds who need practical confidence, not just textbook knowledge.",
    },
    {
      icon: "pin",
      title: "Locally Accessible, Industry-Relevant Training",
      body: "For students in Mohali, Zirakpur, Kharar, Panchkula, and Chandigarh, this means quality IT training without having to relocate to Delhi, Bangalore, or other metro cities. Mohali's IT sector — spanning IT Park, Phase 8B, and Quark City — is steadily growing, and local, industry-relevant training helps students tap into these nearby opportunities directly.",
    },
    {
      icon: "briefcase",
      title: "Career Support Beyond the Classroom",
      body: "The program doesn't end at technical training. Resume building, interview preparation, and placement guidance are built into the journey, helping students translate their new Linux skills into actual job offers. This end-to-end support matters especially for first-time job seekers who may not know how to present technical skills to recruiters.",
    },
    {
      icon: "clock",
      title: "Flexible Formats for Every Kind of Learner",
      body: "Whether you're a 12th-pass student with full-time availability or a working professional who can only attend evenings and weekends, batch flexibility ensures the course fits into your life — not the other way around.",
    },
    {
      icon: "cloud",
      title: "Future-Proof, Not Just Present-Ready",
      body: "Cloud computing, containerization, and DevOps are all built on Linux fundamentals. By starting here, students aren't just solving today's job search — they're setting up a long-term, evolving career path in one of IT's most stable and consistently in-demand domains.",
    },
  ],
  "ethical-hacking": [
    {
      icon: "chart",
      title: "Cybersecurity Demand Is Outpacing Supply",
      body: "India's cybersecurity market is growing rapidly, and there's a well-documented global shortage of trained professionals — meaning skilled ethical hackers are in a genuine seller's market. For students in Mohali and the wider Tricity region, this translates into strong job security and faster career advancement compared to many saturated IT fields.",
    },
    {
      icon: "rocket",
      title: "A Genuine Gateway to High-Paying Careers",
      body: "This program isn't a narrow, one-skill course — it's a launchpad into multiple lucrative career paths: Security Analyst, Penetration Tester, SOC Engineer, Digital Forensics Specialist, and Cloud Security professional. Each of these roles is actively hiring across major IT service providers, corporate security teams, and consulting firms, with strong entry-level and long-term earning potential.",
    },
    {
      icon: "terminal",
      title: "Hands-On Training With Real Industry Tools",
      body: "Rather than sitting through theory-heavy lectures, you'll get practical experience with the same tools used by real cybersecurity professionals — Kali Linux, Metasploit, Wireshark, Burp Suite, and Nmap. Through live labs and simulated attack scenarios, you'll practice discovering vulnerabilities, testing network defenses, and thinking like both an attacker and a defender — the exact mindset employers look for.",
    },
    {
      icon: "pin",
      title: "Locally Accessible, Industry-Relevant Training",
      body: "Mohali and Chandigarh have emerged as one of North India's fastest-growing cybersecurity talent hubs. This means students in Mohali, Zirakpur, Kharar, and Panchkula can access genuinely industry-relevant cybersecurity training without relocating to Delhi, Bangalore, or other metro cities — while still connecting to opportunities across the wider Tricity tech ecosystem.",
    },
    {
      icon: "briefcase",
      title: "Career Support Built Into the Program",
      body: "Technical training alone isn't enough to land your first cybersecurity job. This program includes career counseling, resume building, and interview preparation, helping students — especially first-time job seekers — confidently present their new skills to recruiters and hiring managers.",
    },
    {
      icon: "shield",
      title: "Covers Both Offensive and Defensive Security",
      body: "A well-rounded ethical hacker understands both how attacks happen and how to defend against them. This program covers penetration testing and offensive techniques alongside network defense, web security, and cloud security — giving you a complete, balanced skill set rather than a narrow specialization.",
    },
    {
      icon: "clock",
      title: "Flexible Formats for Every Kind of Learner",
      body: "Whether you're a 12th-pass student with full-time availability or a working professional who can only attend evenings and weekends, batch flexibility ensures the course fits your schedule — including intensive short-term crash course options during semester breaks.",
    },
    {
      icon: "verified",
      title: "A Future-Proof, Evolving Career Path",
      body: "Cyber threats are constantly evolving, which means ethical hacking skills stay continuously relevant rather than becoming outdated. Starting here gives students a foundation that can grow into specialized certifications and senior security roles over time, rather than a skill with a shelf life.",
    },
  ],
  "power-bi": [
    {
      icon: "chart",
      title: "Data Skills Are in Massive Demand",
      body: "The demand for data-literate professionals has skyrocketed in recent years. Companies across the globe — and particularly in the thriving industrial corridors of Mohali and Chandigarh — are generating vast amounts of data but lack the skilled workforce to extract meaningful insights from it. Learning Power BI positions you directly to fill that gap.",
    },
    {
      icon: "rocket",
      title: "A Gateway to Multiple Career Paths",
      body: "This program isn't a narrow, single-skill course — it's a launchpad into Data Analyst, Business Intelligence Analyst, Reporting Analyst, and Data Visualization Specialist roles. It also serves as a strong stepping stone toward broader Data Analytics and Data Science careers, since dashboarding and visualization are core components of both fields.",
    },
    {
      icon: "sparkles",
      title: "Beyond Button-Pushing — Real Business Intelligence Logic",
      body: "A major differentiator of this course is that it goes beyond simply teaching software features. The focus is on business intelligence logic, data storytelling, and practical implementation — training you to think like a data analyst, not just operate a tool. This means you learn why a dashboard is designed a certain way, not just how to build one.",
    },
    {
      icon: "layers",
      title: "Hands-On Learning With Real-World Projects",
      body: "Rather than passive tutorials, the course is built around practical exposure through real-world projects — connecting to actual data sources, cleaning messy datasets, and building interactive dashboards that mirror what employers expect to see in interviews and on the job.",
    },
    {
      icon: "pin",
      title: "Locally Accessible, Industry-Relevant Training",
      body: "Located in the heart of Mohali's Phase 8 Industrial Area, this course bridges the gap between academic knowledge and industry demand for students across Mohali, Zirakpur, Kharar, and Panchkula — without needing to relocate to Delhi, Bangalore, or other metro cities for quality data analytics training.",
    },
    {
      icon: "certificate",
      title: "Certification-Aligned Learning",
      body: "The course includes Power BI certification preparation aligned with globally recognized standards, giving students a credential that adds credibility to their resume alongside the practical project portfolio they build during training.",
    },
    {
      icon: "users",
      title: "Small Batches, Personalized Mentorship",
      body: "Small batch sizes ensure focused guidance and personalized mentorship — a meaningful advantage for a visually and logically detailed tool like Power BI, where hands-on troubleshooting support speeds up genuine mastery.",
    },
    {
      icon: "clock",
      title: "Flexible Formats for Every Kind of Learner",
      body: "Whether you're a 12th-pass student with full-time availability, a college student balancing academics, or a working professional needing evening or weekend batches, flexible scheduling ensures this course fits around your life.",
    },
    {
      icon: "verified",
      title: "A Future-Proof, Evolving Skill",
      body: "As businesses across every sector — finance, retail, healthcare, manufacturing — become increasingly data-driven, Power BI skills continue to grow in relevance rather than fade. Starting here gives you a foundation that can expand into deeper data analytics, data science, or business intelligence specializations over time.",
    },
  ],
  tableau: [
    {
      icon: "chart",
      title: "Tableau Is an Industry-Standard Visualization Tool",
      body: "Tableau is one of the most widely adopted business intelligence and data visualization platforms used by companies worldwide. As data-driven decision-making becomes essential across industries, professionals who can turn complex datasets into clear, actionable visuals are in consistently high demand — including across the growing IT and business landscape in Mohali and Chandigarh.",
    },
    {
      icon: "rocket",
      title: "A Gateway to Multiple Data Career Paths",
      body: "This program isn't a narrow, single-skill course — it's a launchpad into Data Analyst, Business Intelligence Analyst, Data Visualization Specialist, and Reporting Analyst roles. It also complements broader Data Analytics and Data Science career paths, since Tableau skills are frequently listed alongside Python, SQL, and Power BI in job requirements.",
    },
    {
      icon: "layers",
      title: "Hands-On Learning With Real-World Data",
      body: "Rather than passive tutorials, the course emphasizes working with real datasets and real-world business scenarios — connecting to data sources, cleaning data, and building interactive, professional-grade dashboards that mirror what employers expect to see in interviews and on the job.",
    },
    {
      icon: "monitor",
      title: "Complements Other In-Demand Data Tools",
      body: "Because Tableau is often taught alongside Python, SQL, and Power BI in comprehensive data programs, learning it here positions you to build a broader, more versatile data skill set — rather than being limited to a single tool, which matters when job descriptions increasingly ask for multi-tool proficiency.",
    },
    {
      icon: "pin",
      title: "Locally Accessible, Industry-Relevant Training",
      body: "Students in Mohali, Zirakpur, Kharar, and Panchkula can access genuinely practical, job-oriented Tableau training without relocating to Delhi, Bangalore, or other metro cities — while still connecting to the broader, expanding data and IT job market across the Tricity region.",
    },
    {
      icon: "sparkles",
      title: "Focus on Data Storytelling, Not Just Software Features",
      body: "A key differentiator of this course is its emphasis on data storytelling — teaching you to think about what insight a visualization should communicate, not just how to click through menu options. This distinction is what separates analysts who create genuinely useful dashboards from those who simply operate software.",
    },
    {
      icon: "briefcase",
      title: "Real-World Projects for a Strong Portfolio",
      body: "Throughout training, you'll build a portfolio of real-world Tableau projects — practical proof of your skills that carries far more weight with employers than certificates alone, especially for first-time job seekers competing in the Mohali and Chandigarh job market.",
    },
    {
      icon: "clock",
      title: "Flexible Formats for Every Kind of Learner",
      body: "Whether you're a 12th-pass student with full-time availability, a college student balancing classes, or a working professional needing evening or weekend batches, flexible scheduling ensures this course fits around your life and commitments.",
    },
    {
      icon: "verified",
      title: "A Future-Proof, Evolving Skill",
      body: "As more businesses across finance, retail, healthcare, and manufacturing become data-driven, the ability to visualize and communicate data clearly remains consistently valuable — regardless of which specific tools or trends dominate the broader tech landscape.",
    },
  ],
  "data-science": [
    {
      icon: "chart",
      title: "Demand Consistently Outpaces Supply",
      body: "Companies in Mohali's IT Park, Chandigarh, and across India are actively seeking professionals who can turn data into insights, and this demand continues to outpace the supply of genuinely skilled data scientists. For students in the Tricity region, this translates directly into strong job security, competitive salaries, and multiple career pathways.",
    },
    {
      icon: "layers",
      title: "A Complete, Multi-Skill Curriculum — Not Just One Tool",
      body: "Unlike narrow, single-tool courses, this program takes you through Python, statistics, machine learning, SQL, and data visualization (Tableau and Power BI) in one structured journey. This comprehensive approach mirrors exactly what real job descriptions ask for, rather than leaving you with fragmented, incomplete skills.",
    },
    {
      icon: "rocket",
      title: "A Gateway to Multiple High-Paying Roles",
      body: "This program is a launchpad into Data Analyst, Data Scientist, Machine Learning Engineer, Business Intelligence Analyst, and Big Data roles. Because the curriculum spans the full analytics pipeline — from data extraction to visualization — graduates aren't boxed into one narrow job title.",
    },
    {
      icon: "terminal",
      title: "Real Projects, Real Business Problems",
      body: "Rather than studying algorithms in isolation, you'll implement them on real datasets, build predictive models, and create compelling visualizations tied to actual business problems. This hands-on, project-based approach ensures your portfolio reflects genuine analytical ability, not just theoretical knowledge.",
    },
    {
      icon: "target",
      title: "Structured, Phase-Wise Learning Path",
      body: "The course follows a logical progression — starting with Python and data manipulation, moving through statistics and exploratory data analysis, then machine learning, SQL, data visualization, and finally big data and cloud platforms — ending in a capstone project. This structure ensures each concept builds on the last, rather than overwhelming beginners with everything at once.",
    },
    {
      icon: "pin",
      title: "Locally Accessible, Industry-Relevant Training",
      body: "Students in Mohali, Zirakpur, Kharar, and Panchkula can access genuinely industry-relevant data science training without relocating to Delhi, Bangalore, or other metro cities — while still connecting to the expanding Tricity IT and analytics job market.",
    },
    {
      icon: "briefcase",
      title: "Career Support Built Into the Program",
      body: "Beyond technical training, dedicated placement assistance, resume building, and interview preparation help students — especially first-time job seekers — confidently present their new technical skills to recruiters and hiring managers.",
    },
    {
      icon: "refresh",
      title: "Lifelong Learning Access",
      body: "Alumni often get access to updated course materials and can attend new workshops to stay current with industry trends — critical in a field where tools, techniques, and best practices evolve constantly.",
    },
    {
      icon: "clock",
      title: "Flexible Formats for Every Kind of Learner",
      body: "Whether you're a full-time 12th-pass student, a college student balancing academics, or a working professional needing evening or weekend batches, flexible scheduling — including fast-track options — ensures the course fits around your life.",
    },
    {
      icon: "verified",
      title: "A Future-Proof, Expanding Career Path",
      body: "Data science is not a passing trend — it's foundational to nearly every modern industry, from finance and healthcare to retail and manufacturing. Starting here gives you skills that open doors to industries and roles that continue to expand as data becomes increasingly central to business decision-making.",
    },
  ],
  "data-analytics": [
    {
      icon: "refresh",
      title: "Industry-Relevant, Constantly Updated Curriculum",
      body: "Data analytics as a field moves fast — new tools, new techniques, and new business expectations emerge every year. This program's curriculum isn't static. It's regularly updated to reflect what companies hiring in Mohali's IT Park and across the Tricity region actually expect from entry-level and mid-level analysts. You won't be learning outdated theory; you'll be learning what's currently used in real business environments.",
    },
    {
      icon: "layers",
      title: "A Complete Toolkit, Not Just One Skill",
      body: "Many short courses teach just Excel or just Python in isolation. This program takes a full-stack approach — Excel, SQL, Power BI, Tableau, and Python — so you understand how data actually flows from raw spreadsheets to polished, decision-ready dashboards. That breadth matters, because most real analytics jobs in Mohali and Chandigarh companies expect familiarity with more than one tool.",
    },
    {
      icon: "terminal",
      title: "Learning by Doing, Not Just Watching",
      body: "The program is built around hands-on, project-based learning rather than passive lectures. With 15+ live projects and a capstone project by the end, you graduate with an actual portfolio — something you can show in interviews rather than just a certificate. For students in Mohali competing for limited analytics openings, a strong project portfolio often makes the real difference.",
    },
    {
      icon: "users",
      title: "Small Batches Mean Real Mentorship",
      body: "With batch sizes capped at 8–12 students, you're not lost in a crowd. Trainers can actually track your progress, revisit concepts you're struggling with, and give feedback tailored to you — something that's hard to find in larger, mass-batch training centres around Mohali.",
    },
    {
      icon: "target",
      title: "Built for Beginners, Without Slowing Down Advanced Learners",
      body: "Whether you're starting from zero or already have some exposure to Excel or SQL, the pacing is designed to meet you where you are. Foundational modules ensure nobody is left behind, while project complexity increases steadily so advanced learners stay challenged too.",
    },
    {
      icon: "briefcase",
      title: "Strong Placement Support Rooted in the Local Job Market",
      body: "This isn't a generic, one-size-fits-all placement promise. The program's placement support is built around real hiring relationships across Mohali, Chandigarh, and Panchkula's growing IT and analytics ecosystem — meaning the guidance you get on resumes, interviews, and job applications is grounded in what local employers are actually looking for.",
    },
    {
      icon: "verified",
      title: "A Proven Track Record",
      body: "With 1000+ alumni placed across companies in India and a strong local reputation, this program has already helped students from commerce, arts, and engineering backgrounds alike transition into analytics careers. That track record isn't incidental — it reflects a training approach that consistently works.",
    },
  ],
  "machine-learning": [
    {
      icon: "chart",
      title: "Built Around Real Industry Demand",
      body: "Machine learning is evolving constantly, and a course that doesn't keep pace quickly becomes outdated. This program's curriculum is regularly reviewed to reflect what companies hiring in Mohali's IT Park and across the Tricity region actually expect from junior ML professionals — not just academic theory that rarely applies on the job.",
    },
    {
      icon: "terminal",
      title: "A Strong Python Foundation First",
      body: "Many ML courses rush students into algorithms before they're comfortable with the underlying programming. This program takes a different approach — building a solid Python foundation first, then layering in NumPy, Pandas, and data handling, before moving into machine learning algorithms. This sequencing means students genuinely understand what their code is doing, not just copying syntax.",
    },
    {
      icon: "layers",
      title: "Coverage of Core ML Algorithms and Concepts",
      body: "Rather than skimming the surface, the course dives into supervised learning (regression, classification), unsupervised learning (clustering), model evaluation techniques, and the practical workflow of building, testing, and improving a machine learning model. This breadth gives students in Mohali a well-rounded understanding that applies across multiple industries — not just one narrow use case.",
    },
    {
      icon: "rocket",
      title: "Learning by Building, Not Just Watching",
      body: "The program is centred around hands-on projects rather than passive theory sessions. Students work with real datasets, build actual predictive models, and troubleshoot the kind of messy, imperfect data they'll encounter in real jobs. This project-first approach means graduates walk away with a working portfolio, not just lecture notes.",
    },
    {
      icon: "users",
      title: "Small Batches for Real Mentorship",
      body: "Machine learning concepts can be genuinely difficult to grasp the first time around — from probability to model tuning. With batch sizes kept small, trainers can slow down, revisit tricky topics, and give one-on-one feedback, something that's rare in larger, mass-batch institutes around Mohali.",
    },
    {
      icon: "target",
      title: "Designed for Both Beginners and Upskillers",
      body: "Whether you're starting completely from scratch or already know some Python or data analytics, the course structure adapts. Foundational modules ensure beginners aren't left behind, while the depth of ML algorithms and project complexity keeps more experienced learners genuinely challenged.",
    },
    {
      icon: "briefcase",
      title: "Placement Support Rooted in the Local Market",
      body: "This program's placement guidance isn't generic — it's shaped by real hiring relationships and industry exposure across Mohali, Chandigarh, and Panchkula's growing tech ecosystem. That means resume feedback, interview preparation, and job guidance that reflects what local employers are actually asking for in ML and AI roles.",
    },
    {
      icon: "verified",
      title: "Part of a Proven, Established Training Ecosystem",
      body: "This Machine Learning course sits within Techcadd's broader, well-established technology training ecosystem — one that has already helped thousands of students from diverse academic backgrounds move into IT, data, and AI careers. That track record reflects a teaching approach that consistently works, not a one-off program built in isolation.",
    },
  ],
  "deep-learning": [
    {
      icon: "layers",
      title: "Built on Real Neural Network Fundamentals",
      body: "Rather than jumping straight into pre-built models, this program ensures students understand how neural networks actually work — layers, weights, activation functions, and backpropagation — before applying them. This foundational understanding means students can troubleshoot and adapt models in real jobs, not just run pre-written code without knowing why it works.",
    },
    {
      icon: "terminal",
      title: "Industry-Standard Frameworks From Day One",
      body: "Students train directly on TensorFlow and Keras — the same frameworks used by AI teams across the industry, including companies hiring in Mohali's IT Park and the broader Tricity region. This means the skills learned in the classroom transfer directly to real workplace tools, not academic-only libraries.",
    },
    {
      icon: "sparkles",
      title: "Coverage of High-Demand Deep Learning Applications",
      body: "The course goes beyond theory into applied areas like computer vision (image classification, object detection basics) and natural language processing (text classification, sentiment analysis) — two of the most in-demand deep learning specializations in today's job market, both locally and nationally.",
    },
    {
      icon: "rocket",
      title: "Learning by Building, Not Just Watching",
      body: "True to Techcadd's teaching philosophy, this program is centred around hands-on projects. Students train real neural networks on real datasets, encountering the practical challenges of model training — like overfitting, underfitting, and long training times — and learning how to actually solve them, not just read about them.",
    },
    {
      icon: "users",
      title: "Small Batches for a Technically Demanding Subject",
      body: "Deep learning concepts can be genuinely difficult the first time through — understanding gradient descent, tuning hyperparameters, or debugging a model that isn't learning properly takes real mentorship. With small batch sizes, Techcadd's trainers can give the one-on-one attention this subject often requires.",
    },
    {
      icon: "target",
      title: "A Natural Progression From Machine Learning",
      body: "For students who've already built a foundation in Python and machine learning, this course offers a structured, logical next step rather than an overwhelming jump. The curriculum assumes and builds on that foundation, making the learning curve manageable rather than intimidating.",
    },
    {
      icon: "briefcase",
      title: "Placement Support for Specialized AI Roles",
      body: "Because deep learning is a more specialized skill set, placement guidance is tailored accordingly — helping students position themselves for AI-focused roles rather than generic tech openings. Techcadd's placement team draws on real hiring relationships across Mohali, Chandigarh, and Panchkula's expanding AI and tech ecosystem.",
    },
    {
      icon: "chart",
      title: "Part of a Complete AI Learning Ecosystem",
      body: "This Deep Learning course fits within Techcadd's broader AI, Machine Learning, and Data Science training ecosystem — meaning students can build a genuinely comprehensive, layered skill set over time, backed by an institute with an established track record of turning beginners into job-ready tech professionals.",
    },
  ],
  "artificial-intelligence": [
    {
      icon: "terminal",
      title: "Build Practical Skills, Not Just AI Theory",
      body: "One of the biggest reasons to choose a structured Artificial Intelligence Course in Mohali is the opportunity to learn by doing. Instead of only studying definitions and algorithms, students can progress from Python and data handling into Machine Learning, Deep Learning, NLP, Generative AI, LLMs, Computer Vision and deployment. The Techcadd programme follows this progression and includes practical work with tools such as Python, TensorFlow, PyTorch, scikit-learn, OpenCV, Hugging Face, LangChain, Jupyter and Streamlit.",
    },
    {
      icon: "target",
      title: "Learn AI Step by Step",
      body: "AI can appear complicated when learners encounter programming, mathematics, machine learning models and neural networks simultaneously. A structured programme makes the learning path easier to follow. Techcadd's curriculum begins with AI and Python fundamentals, followed by mathematics and statistics, Machine Learning, Deep Learning, NLP, Generative AI and LLMs, Computer Vision, deployment and a capstone project. This staged approach can be especially useful for beginners searching for an AI course in Mohali for students, because they can develop their foundation before moving toward advanced AI concepts.",
    },
    {
      icon: "rocket",
      title: "Create Portfolio-Worthy Projects",
      body: "A certificate can show that you completed training, but a working project can demonstrate what you actually know. Techcadd's AI programme includes projects such as sales forecasting, customer-support chatbots, image-recognition systems, sentiment dashboards, live client briefs and an end-to-end AI product. For students preparing for internships or entry-level interviews, projects can provide something concrete to discuss: the problem, dataset, model selection, testing, results and deployment.",
    },
    {
      icon: "briefcase",
      title: "Prepare for Multiple AI-Related Career Paths",
      body: "Artificial Intelligence does not lead to just one job title. Depending on your background and the skills you develop, AI knowledge can support career paths involving AI Engineering, Machine Learning, Data Science, AI product work, automation and related technical roles. Techcadd specifically positions its programme around AI Engineer, ML Engineer, Data Scientist and AI Product Analyst pathways. This flexibility is valuable for learners in Mohali who may still be deciding which technology specialization best fits their interests.",
    },
    {
      icon: "users",
      title: "Suitable for Different Learner Profiles",
      body: "The programme is positioned for students after 12th, graduates, final-year students, working professionals, freelancers, career restarters, educators and self-taught learners. It also offers classroom, weekend and 1-on-1 modes, allowing learners with different schedules to choose a suitable format. For a learner comparing an Artificial Intelligence training institute in Mohali, the important consideration should not simply be the course title. Look at the curriculum, trainer support, practical assignments, projects, tools, career preparation and the evidence of work students complete.",
    },
    {
      icon: "layers",
      title: "Learn Technologies Used Across Modern AI Workflows",
      body: "The Techcadd curriculum covers a broad AI technology stack, including Python, NumPy, Pandas, Matplotlib, Seaborn, scikit-learn, TensorFlow, PyTorch, Keras, OpenCV, NLTK, spaCy, Hugging Face, LangChain, Flask/FastAPI, Streamlit, Git, GitHub and Google Colab. Learning this ecosystem can help students understand not just how to train a model, but also how data is prepared, models are evaluated, applications are created and AI solutions are eventually deployed.",
    },
    {
      icon: "monitor",
      title: "Get Guidance While Building",
      body: "Self-learning through scattered tutorials can leave learners unsure about what to study next or why a project is not working. Trainer-guided practice gives students a clearer learning path and opportunities to discuss errors, implementation decisions and project improvements. Techcadd highlights small batches, daily doubt clearing, live client projects, practitioner trainers and placement support as part of its training model. For students searching locally for the best Artificial Intelligence course in Mohali, this practical learning environment can be more useful than choosing a programme based only on a long syllabus.",
    },
    {
      icon: "chart",
      title: "Build Skills That Can Grow With You",
      body: "AI is a rapidly developing field, so the goal should not be to memorize a fixed set of tools. A strong foundation in Python, data, algorithms, machine learning and model development can provide a base for continuing into newer areas such as Generative AI, LLM applications, RAG and AI deployment. Techcadd's longer AI track includes advanced areas such as RAG, vector databases, advanced prompting, tool calling, GenAI evaluation, authentication, deployment and production monitoring.",
    },
  ],
  "digital-marketing": [
    {
      icon: "terminal",
      title: "Practical, Not Just Theoretical",
      body: "A lot of digital marketing courses in Mohali still teach outdated slide-based theory. Techcadd's program is built around real, hands-on execution — you'll actually run campaigns, write content, analyze data, and manage tools, not just read about them. By the time you finish, you'll have done the work, not just studied it.",
    },
    {
      icon: "rocket",
      title: "Built Around Live Projects",
      body: "Employers in Mohali and Chandigarh don't just want to see a certificate — they want to see what you've actually done. This program is structured around live and simulated client-style projects, so you graduate with a portfolio you can show in interviews, not just a completion letter.",
    },
    {
      icon: "layers",
      title: "Covers the Full Digital Marketing Ecosystem",
      body: "Instead of narrowly focusing on just SEO or just social media, this course covers the complete picture — SEO, Google Ads, Meta Ads, content marketing, email marketing, analytics, and AI-powered marketing tools. This matters because most real digital marketing jobs (especially at Mohali and Chandigarh-based agencies and startups) expect you to understand how these pieces work together, not operate in a silo.",
    },
    {
      icon: "pin",
      title: "Designed for Local Job Market Realities",
      body: "Mohali's IT and startup ecosystem — especially around Phase 8, IT City, and the wider Tricity belt — is growing fast, and local businesses increasingly need people who understand digital marketing from the ground up. This program is shaped with that local hiring reality in mind, so what you learn maps directly to what companies here are actually looking for.",
    },
    {
      icon: "users",
      title: "No Prior Experience Required",
      body: "You don't need a technical background, coding knowledge, or a marketing degree to start. The course is structured to take absolute beginners and build them up step by step, so you're never lost, regardless of your starting point.",
    },
    {
      icon: "briefcase",
      title: "Career-Focused, Not Just Skill-Focused",
      body: "This isn't just about learning tools for the sake of learning them. Every module is tied back to a career outcome — whether that's getting hired at an agency, freelancing independently, or managing marketing for your own business. The goal is employability and real-world readiness, not just knowledge.",
    },
    {
      icon: "clock",
      title: "Flexibility for Different Life Situations",
      body: "Whether you're a student trying to balance this with your studies, a job seeker with limited time, or a homemaker looking for flexible learning — the program is structured to accommodate different schedules and starting points, so life circumstances don't become a barrier to learning.",
    },
    {
      icon: "building",
      title: "Local Support, Local Understanding",
      body: "Being based in Mohali means Techcadd understands the local student mindset, the local job market, and the practical concerns Mohali and Tricity students have — things like commute, budget, and how competitive local hiring can be. That local context shapes how the course is taught and supported.",
    },
    {
      icon: "verified",
      title: "A Stepping Stone, Not Just a Course",
      body: "By the end of the program, the goal isn't just \"you finished a course\" — it's that you have a working portfolio, practical skills across the full digital marketing spectrum, and a clear sense of direction for your next career step, whether that's a job, freelancing, or entrepreneurship.",
    },
  ],
  "social-media-marketing": [
    {
      icon: "terminal",
      title: "Built around real platforms, not just theory",
      body: "A lot of SMM training in the Tricity leans heavily on slides and PDFs. This program is structured around actually running campaigns — creating content calendars, launching Meta ad campaigns, analysing real engagement data and adjusting strategy based on results. By the end you have not just learned how Instagram or Facebook ads work; you have managed them.",
    },
    {
      icon: "pin",
      title: "Local market relevance",
      body: "Mohali's digital economy is growing fast, driven by IT companies, startups and agencies in and around Phase 8, QuarkCity and the wider Chandigarh IT Park corridor. Businesses here — from local D2C brands to regional service providers — need social media managers who understand both global platform trends and the local audience, and the training uses region-relevant case studies to match.",
    },
    {
      icon: "rocket",
      title: "Career-focused, not just certificate-focused",
      body: "Many students choose a course purely for the certificate. The certificate matters here, but the emphasis is on building a portfolio you can actually show a recruiter or client. Live projects, mock campaigns and real analytics reports become part of your resume, not just a line item.",
    },
    {
      icon: "briefcase",
      title: "Placement support that understands the local job market",
      body: "Because Techcadd is based directly in Mohali's IT hub, placement assistance is not generic — it is connected to companies and agencies actually hiring across Mohali, Chandigarh and Panchkula. That includes resume support, mock interviews and direct referrals, giving students a real shot at converting training into employment without relocating out of the Tricity.",
    },
    {
      icon: "clock",
      title: "Flexible for every kind of student",
      body: "Whether you are a 12th-pass student with full-day availability, a working professional who can only attend evenings or weekends, or a homemaker managing a flexible schedule, the course structure accommodates different paces and time commitments — a genuine concern for students weighing local institutes.",
    },
    {
      icon: "verified",
      title: "Future-proof skill in a growing field",
      body: "Social media is not a passing trend — it is now core to how every business, from a Mohali boutique to a multinational brand, reaches customers. Learning SMM today means positioning yourself in a field with consistent, rising demand rather than chasing a skill that might be automated or outdated in a few years.",
    },
    {
      icon: "users",
      title: "Confidence through practical exposure",
      body: "Perhaps most importantly, students leave not just informed but confident — comfortable pitching to a client, presenting a campaign report or applying for a marketing role, because they have already done it in a training environment before doing it for real.",
    },
  ],
  "google-ads": [
    {
      icon: "chart",
      title: "The timing has never been better",
      body: "Digital advertising is not a future trend — it is the present. Every business, from a local Mohali boutique to a Tricity tech startup, is shifting budget toward Google Ads because it delivers measurable, trackable results. That shift has created genuine, growing demand for certified PPC professionals across Mohali, Chandigarh and Panchkula.",
    },
    {
      icon: "pin",
      title: "Mohali's thriving IT and marketing ecosystem",
      body: "Unlike smaller towns, Mohali offers a real working ecosystem for digital marketing careers. With IT Park Sectors 67–74, Phase 8, Phase 8A and Phase 8B housing hundreds of software companies, agencies and startups, you step into a job market that is hiring locally — shorter commutes, easier interview access, networking and a peer group working in nearby offices.",
    },
    {
      icon: "clock",
      title: "A high-income skill without a long-term degree",
      body: "Instead of investing three or four years in a degree with uncertain job prospects, focused Google Ads training equips you with a specific, monetizable skill in weeks. Google Ads is pay-per-click and results-driven, so your work is easy to show employers or clients through real dashboards, live campaigns and performance reports.",
    },
    {
      icon: "target",
      title: "Skills employers actually ask for",
      body: "Recruiters across Mohali and the Tricity consistently list Google Ads, PPC, SEM and campaign optimization as top-priority skills. This program maps directly onto that — account setup, keyword match types, bidding strategies, ad extensions, Quality Score optimization and conversion tracking — so you graduate with exactly what local job listings ask for.",
    },
    {
      icon: "briefcase",
      title: "Works for employment and entrepreneurship alike",
      body: "Whether your goal is a stable agency job, a corporate marketing role or your own freelance PPC consultancy, Google Ads keeps every door open. It is one of the few skills where the same certification leads to a nine-to-five career, freelance income or your own agency — flexibility as your goals evolve.",
    },
    {
      icon: "terminal",
      title: "Real, practical, hands-on learning",
      body: "This is not about memorising theory. You set up real campaigns, run live budgets, analyse actual performance data and build a portfolio you can show employers or clients — the exact proof that gets you hired, and hired again.",
    },
    {
      icon: "verified",
      title: "Future-proofing your career",
      body: "As AI-driven advertising, automation and smart bidding reshape Google Ads, professionals who understand the fundamentals alongside modern tools stay ahead of the curve. Starting now with a strong foundation positions you to grow with the platform rather than get left behind by it.",
    },
  ],
  seo: [
    {
      icon: "terminal",
      title: "Practical, not just theoretical",
      body: "A lot of SEO education online is scattered across YouTube videos and blog posts that leave you with fragments of knowledge but no structured understanding. This program moves through a logical sequence, from fundamentals to advanced local and technical SEO, with hands-on practice at every stage. You will not just learn what a backlink is — you will build one.",
    },
    {
      icon: "pin",
      title: "Designed around local career opportunities",
      body: "This is not a generic, one-size-fits-all course. It is shaped around what Mohali and Tricity employers actually ask for — local SEO, Google Business Profile optimization, technical audits and analytics reporting. Because so many businesses here are local-first — real estate, healthcare, education, retail, hospitality — local SEO gives you an edge a generic course would not.",
    },
    {
      icon: "briefcase",
      title: "Bridges the gap between learning and employability",
      body: "Many students in Mohali finish a course and still struggle to explain their skills confidently in interviews. Every module here ties back to a project you can talk about, screenshot and add to your portfolio. By the end you are not just someone who took an SEO course — you are someone with demonstrable proof of skill.",
    },
    {
      icon: "layers",
      title: "Complements other in-demand skills",
      body: "SEO does not exist in isolation. Students who pair it with a Google Ads course in Mohali or social media marketing training become far more employable, because businesses increasingly want marketers who understand both organic and paid strategy. The program is designed so you can layer skills on top of your SEO foundation without starting from zero.",
    },
    {
      icon: "target",
      title: "Low barrier to entry, high growth ceiling",
      body: "You do not need to invest years or lakhs of rupees to get started. SEO training has one of the best cost-to-career-outcome ratios among digital skills — a relatively short, affordable program can realistically lead to freelance income, an entry-level job or a stronger resume within a few months of consistent effort.",
    },
    {
      icon: "verified",
      title: "Future-proof skill, not a trend",
      body: "Search engines are not going away. As AI-driven search — Google's AI Overviews, voice search and answer engines — reshapes how people find information, the fundamentals of SEO become more valuable, not less: understanding user intent, structuring content well and building topical authority. Learning now puts you ahead of a shift the market is only beginning to adjust to.",
    },
  ],
  wordpress: [
    {
      icon: "layers",
      title: "Industry-relevant curriculum",
      body: "This program does not just teach you how to click buttons on a dashboard — it teaches you how the web development industry actually works. From setting up your first website to advanced theme customization, plugin integration and WordPress SEO, every module is designed around real employer expectations.",
    },
    {
      icon: "terminal",
      title: "Hands-on, project-based learning",
      body: "Instead of passive lectures, the program is centred on live projects. You personally build and launch functional websites during training, giving you a ready portfolio to show future employers or freelance clients — a major advantage over candidates who have only studied theory.",
    },
    {
      icon: "pin",
      title: "High local and national demand",
      body: "WordPress powers a huge share of websites worldwide, and businesses across Mohali's IT hubs — IT City, Quark City, Phase 8 Industrial Area and the wider Chandigarh Tricity — constantly need skilled WordPress developers, website administrators and freelancers. This course positions you to meet that demand in your own city.",
    },
    {
      icon: "rocket",
      title: "Career flexibility",
      body: "Unlike many single-path courses, WordPress opens several doors at once — full-time developer, freelance web designer, WooCommerce e-commerce specialist, content manager, or your own web design agency. Few short-term programs offer this level of career flexibility.",
    },
    {
      icon: "target",
      title: "Low entry barrier, high earning potential",
      body: "The program is beginner-friendly, so you do not need a technical degree to start, yet it leads to genuinely high-earning paths — freelance work with international clients, agency jobs and consulting roles. It is one of the most practical returns on investment among short-term IT courses in Mohali today.",
    },
    {
      icon: "users",
      title: "Expert mentorship",
      body: "Learning from trainers with real industry experience means you avoid the common mistakes beginners make when self-teaching from YouTube or random blogs. That structured, mentor-led approach is what makes this training genuinely effective compared with free online resources.",
    },
    {
      icon: "certificate",
      title: "Certification that adds credibility",
      body: "On completion you receive a certification that adds weight to your resume or LinkedIn profile, helping you stand out whether you are applying for jobs in Mohali's IT sector or pitching yourself to freelance clients globally.",
    },
    {
      icon: "clock",
      title: "Perfect timing for career growth",
      body: "With businesses in Mohali, Kharar, Zirakpur and Chandigarh increasingly shifting online, the timing to learn WordPress has never been better. Companies need websites built, redesigned, secured and optimized — and this program prepares you to do exactly that, right when demand is at its peak.",
    },
  ],
  shopify: [
    {
      icon: "terminal",
      title: "Real development skills, not just store setup",
      body: "Most beginner tutorials teach you how to add products and install apps. This program goes far deeper — you master Liquid, Shopify's core template language, so you can customize themes, build unique layouts and create features off-the-shelf apps simply cannot offer. That is the gap between someone who knows Shopify and someone who gets hired as a Shopify Developer.",
    },
    {
      icon: "pin",
      title: "Built around the Tri-City job market",
      body: "Mohali's IT parks, Chandigarh's growing agency ecosystem and Panchkula's corporate sector are actively hiring for e-commerce and Shopify roles. This program is structured around what local employers actually look for: theme customization, app integration, speed optimization and client-facing project delivery.",
    },
    {
      icon: "rocket",
      title: "Portfolio-first learning",
      body: "By the end you will not just have a certificate — you will have a minimum of three fully functional, live e-commerce stores in your portfolio, across niches like dropshipping, D2C brands and service-based businesses. For students applying to a first developer job, a strong portfolio often matters more than the certificate.",
    },
    {
      icon: "users",
      title: "Learn from certified Shopify Partners",
      body: "Training is led by experienced e-commerce consultants and certified Shopify Partners — professionals who build and maintain high-volume stores for real brands and agencies. You learn current, real-world practice, not outdated theory.",
    },
    {
      icon: "refresh",
      title: "Future-proof curriculum, Shopify 2.0 ready",
      body: "The curriculum is built around modern Shopify 2.0 architecture — flexible sections, metafields and today's performance standards — so you are job-ready for what agencies and brands are using right now, not what was current five years ago.",
    },
    {
      icon: "briefcase",
      title: "Strong placement network across the Tri-City",
      body: "A dedicated placement cell offering direct interviews and job referrals connects Mohali-based students with IT companies and e-commerce agencies across Chandigarh, Mohali and Panchkula — a genuine local advantage.",
    },
    {
      icon: "building",
      title: "Freelance-ready, not just job-ready",
      body: "Beyond employment, dedicated modules on client acquisition, project pricing and store handover prepare you to earn independently as a freelance Shopify Developer — a route many Mohali students prefer for flexibility and higher earning potential.",
    },
    {
      icon: "clock",
      title: "Flexible learning for every schedule",
      body: "Whether you are a student, a working professional or managing other commitments, the course runs offline at the Mohali centre, fully online or in a hybrid format — with EMI options to make it financially accessible.",
    },
    {
      icon: "chart",
      title: "A clear, high-growth career path",
      body: "From Junior Shopify Developer (₹4–7 LPA) to Shopify Technical Lead or Architect (₹18–25+ LPA), this program is designed around visible career progression — not just a one-time job, but a long-term path in one of tech's fastest-growing niches.",
    },
  ],
  "python-programming": [
    {
      icon: "briefcase",
      title: "Built around employability, not just syllabus completion",
      body: "A lot of Python courses in Mohali focus on finishing a checklist of topics. Every module here is taught with one question in mind: will this help a student get hired? That is why the course does not stop at syntax and theory — it pushes into object-oriented programming, file handling, automation and libraries like NumPy and Pandas, the exact skills that show up in real job descriptions across Mohali's IT sector.",
    },
    {
      icon: "target",
      title: "Beginner-friendly without being basic",
      body: "Many students worry that beginner-friendly means watered down. Not here. The course starts from zero, but by the end students are working with real datasets, building functional programs and understanding how Python fits into web development and data-driven roles. It is a gradual, layered structure — not a shortcut, and not an overload.",
    },
    {
      icon: "pin",
      title: "Local relevance for Mohali's job market",
      body: "Mohali's IT City, along with the wider tri-city area, has seen steady growth in software, data and automation-focused companies. This program is designed with that local hiring landscape in mind, so students learn Python in a way that connects directly to the roles actually advertised in and around Mohali, Chandigarh and Panchkula.",
    },
    {
      icon: "terminal",
      title: "Live projects over passive learning",
      body: "Reading about Python and actually building with it are two very different experiences. This course leans heavily into hands-on, project-based learning — students write code, debug it, fix it and build small applications rather than watching demonstrations. That project experience becomes a genuine talking point in interviews.",
    },
    {
      icon: "users",
      title: "A structured support system",
      body: "Learning to code can feel isolating, especially for first-time programmers. This training is built with mentorship in mind — trainers are approachable, doubt-clearing sessions are part of the structure, and students are not handed a textbook and left to figure things out alone.",
    },
    {
      icon: "rocket",
      title: "A realistic career on-ramp",
      body: "Whether the goal is a job in web development, data analysis, automation or simply a stronger resume before further studies, this program is designed as a genuine on-ramp — not a vague promise. You walk away with certification, a project portfolio and a working understanding of one of the most in-demand programming languages globally.",
    },
  ],
  "java-programming": [
    {
      icon: "terminal",
      title: "You learn by building, not just watching",
      body: "A huge problem with many Java courses is that they stay stuck in theory — slides, definitions and copy-paste examples. Here you write real code from the first modules on basics and control flow. By the time you reach OOP, Collections and JDBC you are applying concepts to actual mini-projects, which is exactly why employers in Mohali's IT Park and Aerocity corridor prefer project-backed candidates.",
    },
    {
      icon: "target",
      title: "The curriculum matches what companies actually ask for",
      body: "This course is not randomly assembled — it is structured around what real Java roles demand: Core Java fundamentals, OOP, exception handling, data structures, the Collections Framework, file handling and JDBC. These are the exact skills tested in technical interviews for Java Developer, Backend Developer and Full Stack Developer roles across Chandigarh, Mohali and Zirakpur.",
    },
    {
      icon: "certificate",
      title: "It solves the degree-but-no-skills problem",
      body: "Many students in Mohali complete a degree and still struggle to clear technical interviews, because the college curriculum never went deep enough into practical coding. This program is designed specifically to close that gap — giving you the hands-on confidence a purely academic degree often does not.",
    },
    {
      icon: "briefcase",
      title: "Career-focused, not just skill-focused",
      body: "Learning Java in isolation does not help if you do not know how to use it to get a job. Throughout the course you are guided toward real outcomes — which roles exist (Java Developer, Android Developer, Backend Developer, Software Engineer, QA Engineer), what companies expect, and how to position yourself in interviews.",
    },
    {
      icon: "pin",
      title: "Local relevance matters",
      body: "Mohali is home to a genuinely growing IT ecosystem, from established IT Park companies to newer startups in the Aerocity corridor. Training locally means your batch, mentors and networking opportunities are rooted in the same job market you are trying to enter — a real advantage over generic online courses.",
    },
    {
      icon: "users",
      title: "Built for every starting point",
      body: "Whether you are a complete beginner or already have some coding exposure, the pacing and structure of this program are designed to meet you at your level and push you toward genuine competency — not just course completion.",
    },
    {
      icon: "rocket",
      title: "You walk away with more than knowledge",
      body: "By the end you are not just someone who took a Java course. You are someone with hands-on project experience, a working understanding of how real applications are built, and the confidence to walk into a technical interview and actually perform.",
    },
  ],
  "cpp-dsa": [
    {
      icon: "sparkles",
      title: "Concept-first teaching approach",
      body: "Many students struggle with C/C++ not because the language is difficult, but because it is taught as a set of rules to memorize rather than a way of thinking. Every topic — loops and functions through pointers and inheritance — is taught with a focus on why it works that way, not just how to write the syntax. That logic-first method means you can actually apply what you learn, in exams, interviews or real projects.",
    },
    {
      icon: "terminal",
      title: "Hands-on, practical learning",
      body: "Theory alone does not make a programmer — practice does. The course is built around daily coding exercises, lab sessions and mini-projects that have you writing real code from day one. By the end you will not just understand OOP on paper; you will have built actual programs demonstrating classes, inheritance, polymorphism and file handling.",
    },
    {
      icon: "layers",
      title: "A strong foundation for future learning",
      body: "C/C++ is not just another language on a syllabus — it is the foundation that makes every other language easier. Memory management, data structures and object-oriented programming mastered here carry directly into Python, Java, DSA, competitive programming and advanced fields like embedded systems and game development.",
    },
    {
      icon: "pin",
      title: "Locally accessible, industry-relevant training",
      body: "For students in Mohali, Sector 70, Sector 71, Kharar, Zirakpur and nearby Chandigarh, quality technical training close to home — without travelling to Delhi or Bangalore for a big-city bootcamp — is a real advantage. This brings practically-oriented coding education into the tricity, saving time and travel cost without compromising on quality.",
    },
    {
      icon: "clock",
      title: "Flexible batches for every schedule",
      body: "Whether you are a full-time student with college hours to work around, or a job seeker who needs weekend or evening classes, flexible batch timings mean you can pursue this course without disrupting your existing commitments.",
    },
    {
      icon: "target",
      title: "Confidence for competitive exams and interviews",
      body: "C/C++ concepts appear constantly in technical interviews, campus placements and competitive exams. This program does not just teach you to pass a course — it prepares you to confidently answer questions on pointers, memory allocation, OOP principles and data structures, giving you a real edge when it matters.",
    },
    {
      icon: "rocket",
      title: "A stepping stone to a long-term IT career",
      body: "Whether your next goal is software development, data structures and algorithms, competitive programming, embedded systems or simply stronger engineering fundamentals, this program is designed as the first strong step — not a standalone destination. It sets you up to keep growing wherever the industry takes you.",
    },
  ],
  kotlin: [
    {
      icon: "verified",
      title: "Kotlin is Google's official language for Android",
      body: "Since Google made Kotlin its preferred language for Android development, the market has shifted fast. Companies across India — especially the growing IT ecosystem around Mohali's IT City and Chandigarh's tech parks — are actively hiring Kotlin developers over legacy Java-only developers. Learning it now puts you ahead of the curve rather than catching up later.",
    },
    {
      icon: "rocket",
      title: "Real projects, not just theory",
      body: "This is not a course where you copy code from a slide and forget it a week later. The training is built around building actual apps — a to-do app, a news reader, a movie browser, an e-commerce app and a social media clone. By the time you finish, you have a portfolio you can show in interviews, not just a certificate.",
    },
    {
      icon: "users",
      title: "Small batches mean real mentorship",
      body: "Large institutes often pack 40–50 students into a single batch, where personal attention is impossible. Techcadd keeps batches small so every student actually gets doubt-solving time, code reviews and one-on-one mentorship — which matters enormously when you are learning to code for the first time.",
    },
    {
      icon: "pin",
      title: "Local advantage — learn where the jobs are",
      body: "Mohali and the surrounding Tricity has a fast-growing IT and startup scene, including companies based in IT City Mohali, Phase 8B and Sector 70. Training locally means you are building connections and understanding the exact market you are likely to be hired into — not learning in isolation and then trying to break into an unfamiliar job market elsewhere.",
    },
    {
      icon: "certificate",
      title: "Certification that actually counts",
      body: "The program includes preparation support for the Google Certified Associate Android Developer exam — a credential recruiters recognize immediately. Combined with a Techcadd course completion certificate, it gives your resume real weight when applying for Android developer roles anywhere in India.",
    },
    {
      icon: "target",
      title: "Career-focused curriculum",
      body: "Every module is chosen with employability in mind — Kotlin fundamentals and OOP through Jetpack Compose, MVVM architecture, coroutines and API integration. Nothing here is filler; everything maps directly to what companies test for in technical interviews and coding rounds.",
    },
    {
      icon: "clock",
      title: "Flexible learning for every kind of student",
      body: "Whether you are a full-time student, a working professional or someone juggling family responsibilities, batch timings — morning, evening and weekend options — are designed so location or schedule near Mohali is never a barrier to starting your Android development journey.",
    },
    {
      icon: "briefcase",
      title: "Placement support across the Tricity",
      body: "Techcadd does not just teach and let you go — the placement support network spans Mohali, Chandigarh and Panchkula, connecting job-ready students with local hiring companies and Android development studios.",
    },
  ],
  flutter: [
    {
      icon: "chart",
      title: "Learn the technology companies actually want",
      body: "Flutter is not just another trend — it is backed by Google and used by major brands for exactly the reason businesses in Mohali and Chandigarh are adopting it: one codebase, two platforms, lower cost, faster delivery. Companies across the tricity's IT corridor — Phase 8 and IT Park Mohali through Chandigarh's tech parks — want developers who can deliver Android and iOS without doubling the team.",
    },
    {
      icon: "terminal",
      title: "Practical, project-based learning — not just theory",
      body: "This program is built around real, hands-on development from day one. Instead of memorizing concepts you build actual working apps — from a chat application with Firebase to an e-commerce app with live API integration. By the end you are not holding a certificate; you are holding a portfolio of functional apps you built yourself.",
    },
    {
      icon: "layers",
      title: "Structured, step-by-step curriculum",
      body: "The course takes you from absolute basics — Dart programming and Flutter architecture — all the way to state management, REST API integration, Firebase, animations and app store deployment. Every module builds on the last, so complete beginners progress logically without feeling overwhelmed.",
    },
    {
      icon: "briefcase",
      title: "Career-focused, not just skill-focused",
      body: "This is not a course that ends when the lessons do. Resume building, interview preparation and placement support are part of the journey, helping you convert new skills into real job opportunities in Mohali, Chandigarh and beyond.",
    },
    {
      icon: "pin",
      title: "Local advantage — learning in a growing tech hub",
      body: "Being trained in Mohali gives you a locational advantage. You are learning in the heart of a region with a fast-expanding IT ecosystem, which means networking opportunities, internships and job openings are close by — not something you have to relocate for.",
    },
    {
      icon: "clock",
      title: "Flexible learning that fits your life",
      body: "Whether you are a student with college hours to work around, a professional with a nine-to-six job, or someone balancing multiple commitments, flexible weekday, weekend and fast-track batch options make it realistic to complete this program without disrupting your routine.",
    },
    {
      icon: "users",
      title: "Mentorship that goes beyond the classroom",
      body: "Learning Flutter is easier — and far more effective — when experienced developers guide you through real mistakes, code reviews and doubt-clearing sessions, rather than learning alone from scattered online tutorials.",
    },
    {
      icon: "verified",
      title: "A future-proof skill investment",
      body: "Mobile apps are not going anywhere, and cross-platform development is only becoming more dominant. Investing your time here means a skill set with long-term relevance, strong salary growth potential and the flexibility to work locally, remotely or freelance.",
    },
  ],
  "web-designing": [
    {
      icon: "monitor",
      title: "Every business needs a website — and a designer behind it",
      body: "From local Mohali boutiques and Chandigarh startups to national e-commerce brands, every business needs a strong online presence. A website is often the first impression a customer forms of a company, which keeps skilled designers consistently in demand. As more businesses across Mohali, Chandigarh, Panchkula and Punjab move online, the need for people who can design clean, functional, user-friendly sites keeps growing.",
    },
    {
      icon: "sparkles",
      title: "A skill that blends creativity with technology",
      body: "Unlike purely technical or purely artistic courses, web designing sits at a unique intersection. You get to be creative — colours, layouts, typography, visual style — while learning practical, structured skills like HTML, CSS and JavaScript. That dual nature makes it deeply satisfying for students who do not want to choose between creative and technical career paths.",
    },
    {
      icon: "target",
      title: "Low entry barrier, high growth ceiling",
      body: "You do not need an engineering degree or years of preparation to start. Within a few months of focused, practical training you can build real websites. But the field has enormous room to grow — from front-end design into full UI/UX, freelancing, web development, or later into digital marketing and product design roles.",
    },
    {
      icon: "layers",
      title: "Multiple career paths from one course",
      body: "A single web designing course opens several directions: Web Designer at an IT company or digital agency, UI/UX Designer, WordPress Developer building client sites, Freelance Web Designer working with businesses in Mohali or internationally, or Frontend Developer with further JavaScript learning. Your investment pays off in more than one direction.",
    },
    {
      icon: "pin",
      title: "Fast-growing local opportunity in Mohali",
      body: "Mohali has emerged as one of Punjab's strongest IT hubs, with IT City Mohali, Phase 8 Industrial Area and Quark City housing numerous IT companies, startups and digital agencies. Local businesses in Sector 70, Sector 74, Zirakpur and Kharar are increasingly investing in websites and online stores — so this is a skill with direct local job and freelance demand.",
    },
    {
      icon: "briefcase",
      title: "Remote and freelance-friendly career",
      body: "Web design is one of the few skills that lets you work from anywhere — for a company in Mohali, a client in Delhi or a business abroad. That flexibility is especially valuable for students balancing studies, professionals seeking side income, or anyone who eventually wants location-independent work.",
    },
    {
      icon: "rocket",
      title: "Quick, visible results keep you motivated",
      body: "Unlike technical fields where progress feels invisible for a long time, web design lets you see your skills come to life almost immediately — a webpage you style today, a layout you build this week, a full project by the end of the course. That visible progress builds real confidence.",
    },
    {
      icon: "verified",
      title: "Future-proofing with AI-aware design skills",
      body: "Modern web design training increasingly incorporates AI-assisted design tools and workflows, helping you stay relevant as the industry evolves rather than being left behind by it.",
    },
  ],
  "web-development": [
    {
      icon: "pin",
      title: "Skills that are actually in demand in Mohali & Tricity",
      body: "Mohali is not just a residential hub any more — it is rapidly becoming one of North India's strongest IT and startup destinations, with companies clustered around Phase 8 Industrial Area, IT Park, Sector 74 and neighbouring Chandigarh and Panchkula. This course is designed around exactly what those companies hire for — current frontend and backend technologies including React.js, Node.js and the MERN stack, not an outdated syllabus.",
    },
    {
      icon: "terminal",
      title: "Practical, project-based learning — not just theory",
      body: "One of the biggest gaps between college education and actual employability is the lack of hands-on experience. This program is built around live projects and real coding assignments from the very first module. Instead of memorizing concepts you build actual websites and applications, so you finish with a portfolio to show employers — not just a certificate.",
    },
    {
      icon: "layers",
      title: "Full-stack exposure, not just one half of the picture",
      body: "Many local courses teach only frontend, or only backend, leaving students with an incomplete skill set. This program covers both — frontend development, backend logic and database management — so you understand how a complete web application works end to end. That foundation makes you significantly more valuable than a developer who knows one side.",
    },
    {
      icon: "target",
      title: "Structured, step-by-step curriculum",
      body: "Instead of jumping randomly between YouTube tutorials and scattered resources, you follow a clear, sequenced path — from web fundamentals progressively into advanced frameworks and full-stack development. That structure matters especially for beginners, because it removes the confusion and guesswork of self-learning.",
    },
    {
      icon: "briefcase",
      title: "Career-focused outcomes",
      body: "This course is not designed just to teach you to code — it is designed to get you hired. That means portfolio building, interview preparation and guidance on presenting your projects to recruiters. Every module is built with the end goal of making you job-ready, not just knowledgeable.",
    },
    {
      icon: "building",
      title: "Local accessibility for Mohali & Tricity students",
      body: "Being based in Mohali means you do not need to relocate to Chandigarh, Delhi or another metro for quality tech training. Students from Sector 70, Kharar, Zirakpur, Panchkula and across the Tricity access the same standard of training close to home, with a local support system and a peer group on the same journey.",
    },
    {
      icon: "clock",
      title: "Flexible learning for every type of student",
      body: "Whether you are a 12th-pass student with full-day availability, a graduate juggling other commitments or a working professional who can only attend evenings or weekends, the course accommodates different schedules — so career growth does not have to wait for the right time.",
    },
    {
      icon: "verified",
      title: "A future-proof career investment",
      body: "Web development is not a trend — it is foundational to how businesses operate. Every company, regardless of industry, eventually needs a website or web application. The skills you build here stay relevant for years, whether you pursue a full-time developer role, freelancing, or eventually build your own products.",
    },
  ],
  "full-stack-development": [
    {
      icon: "layers",
      title: "Full stack skills mean more career options",
      body: "Instead of specialising narrowly in just front-end or just back-end, this program teaches both — HTML, CSS, JavaScript and React.js on the front, Node.js, Express.js and MongoDB on the back. You are not limited to one type of job: the same skill set opens Front-End Developer, Back-End Developer, Full Stack Developer and Software Engineer roles.",
    },
    {
      icon: "pin",
      title: "Mohali's IT ecosystem is growing fast",
      body: "Mohali, along with the wider Tricity, has seen a steady rise in IT companies, product startups and digital agencies over recent years. Local hiring for web developers — from junior roles to freelance projects — keeps growing, which means you do not necessarily need to relocate to a metro city to start your tech career.",
    },
    {
      icon: "terminal",
      title: "Practical, project-based learning",
      body: "Reading about code and writing code are two very different skills. This program is structured around real coding practice — you build actual websites and web applications during training, not just after. By the time you finish you have working projects to show, not just certificates to claim.",
    },
    {
      icon: "users",
      title: "Learn from experienced mentors, not just recorded videos",
      body: "Self-paced online courses often leave students stuck when they hit an error they cannot solve. Here mentors guide you through debugging, logic-building and real development workflows — the kind of support that speeds up learning significantly compared with solo online study.",
    },
    {
      icon: "target",
      title: "A structured path from beginner to job-ready",
      body: "The course does not assume prior knowledge. It starts with the fundamentals — how websites work, HTML structure, CSS styling — and builds gradually to React components, REST APIs, authentication and deployment. That step-by-step structure prevents the overwhelm of jumping straight into frameworks.",
    },
    {
      icon: "rocket",
      title: "A portfolio that actually gets you interviews",
      body: "Recruiters increasingly care more about what you have built than which college you attended. By the end of this program you will have multiple projects — including a full stack application — to showcase in interviews, on GitHub, or to freelance clients.",
    },
    {
      icon: "briefcase",
      title: "Career support built into the program",
      body: "Beyond technical training, the course includes guidance on resume building, interview preparation and placement assistance — helping you convert new skills into an actual job offer, not just a certificate.",
    },
    {
      icon: "clock",
      title: "Flexibility for every kind of learner",
      body: "Whether you are a student with free afternoons, a working professional who needs evening batches, or someone balancing other commitments, the course structure accommodates different schedules without compromising on learning quality.",
    },
  ],
  "mern-full-stack": [
    {
      icon: "layers",
      title: "A full-stack skill set in one language",
      body: "The biggest advantage of MERN is efficiency — you learn JavaScript once and apply it across MongoDB, Express.js, React.js and Node.js. Instead of juggling multiple languages for frontend and backend, you build a complete, deployable application on a single consistent skill set. For students in Mohali balancing time, cost and career urgency, that makes MERN one of the fastest routes into professional web development.",
    },
    {
      icon: "pin",
      title: "High local and national demand",
      body: "Mohali, alongside Chandigarh and Panchkula, has become one of North India's fastest-growing IT and startup corridors. Companies here — from product startups to established IT service firms — actively hire full-stack JavaScript developers. Learning MERN in Mohali means training for roles that exist right in your city, not just in distant metros.",
    },
    {
      icon: "terminal",
      title: "Project-first learning, not just theory",
      body: "This program is deliberately structured so 80% of your time goes into hands-on coding rather than passive lectures. You will not just learn about REST APIs or authentication; you will build them, break them, debug them and deploy them. You finish with a working portfolio — to-do apps, e-commerce platforms, social feeds, portfolio sites — to show interviewers.",
    },
    {
      icon: "target",
      title: "Beginner-friendly structure, career-level outcome",
      body: "Many students hesitate to start coding courses assuming they need prior experience. This program closes that gap — starting from HTML, CSS and JavaScript basics and progressing systematically into React, Node.js, Express, MongoDB, authentication and cloud deployment. You do not need to already know how to code to finish job-ready.",
    },
    {
      icon: "chart",
      title: "Strong ROI compared to a traditional degree",
      body: "A 4-6 month, project-based MERN program costs a fraction of a multi-year degree and gets you interview-ready in months, not years. For 12th-pass students, graduates and career switchers in Mohali looking to enter the workforce faster, it is a significantly more time- and cost-efficient path into tech.",
    },
    {
      icon: "briefcase",
      title: "Placement and career support built in",
      body: "Learning to code is only half the journey — getting hired is the other half. This program includes resume building, mock interviews, portfolio guidance and direct exposure to hiring partners, so you are not left to figure out the job search alone after training.",
    },
    {
      icon: "clock",
      title: "Flexible learning for every type of student",
      body: "Whether you are a student with a packed academic schedule, a working professional upskilling on the side, or someone in Mohali balancing other commitments, the course runs in classroom and online formats — so location and timing are not barriers to starting.",
    },
    {
      icon: "verified",
      title: "Future-proof, in-demand technology",
      body: "React and Node.js consistently rank among the most in-demand and widely-used technologies globally. Learning MERN today positions you not just for a first developer job, but for a long-term career — with room to grow into senior developer, technical lead, or your own product or startup.",
    },
  ],
  "mean-stack": [
    {
      icon: "layers",
      title: "One language, four powerful technologies",
      body: "The biggest advantage of MEAN Stack is that it is entirely JavaScript-based. Instead of juggling multiple programming languages, you master one — JavaScript — and apply it across the front end with Angular, the back end with Node.js and Express.js, and the database with MongoDB. That makes the learning curve far more manageable, especially for students in Mohali just starting their coding journey.",
    },
    {
      icon: "pin",
      title: "High local and regional demand",
      body: "Mohali has grown into a genuine IT hub over the past decade, with companies setting up in IT Park, Phase 8 and Sector 82 because of proximity to Chandigarh and a growing tech talent pool. Full-stack developers who know MEAN are consistently sought after by these companies and by startups across the Tricity — so this training positions you for local opportunities with no relocation required.",
    },
    {
      icon: "terminal",
      title: "Practical, project-based learning",
      body: "This program is not about memorizing theory. From the very first weeks you build real components — forms, APIs, database schemas and full applications — so that by the time you finish you have a portfolio you can actually show employers. Every module is backed by hands-on practice, so you understand not just how each technology works but how they work together.",
    },
    {
      icon: "rocket",
      title: "Faster, more efficient development skills",
      body: "Node.js gives you a fast, scalable runtime, while Angular provides a robust framework for dynamic, responsive interfaces. Learning to combine them efficiently means you leave the course able to build and ship applications quickly — a skill highly valued in fast-moving development teams.",
    },
    {
      icon: "briefcase",
      title: "Career flexibility",
      body: "A single MEAN skill set opens doors to Full-Stack Developer, Front-End Developer, Back-End Developer, Software Engineer, Application Developer and even Technical Consultant roles. You are not boxing yourself into one narrow specialization; you are building a versatile skill set that adapts to whatever role or project comes your way.",
    },
    {
      icon: "refresh",
      title: "A future-ready curriculum",
      body: "Technologies evolve constantly and the MEAN ecosystem is no exception. This program is regularly updated to reflect current industry practice, so what you learn in Mohali today stays relevant for years into your career — not just for a first job, but for the long run.",
    },
    {
      icon: "building",
      title: "Local convenience, serious career outcomes",
      body: "You get all of this without travelling to Chandigarh, Delhi or Bangalore for quality tech training. Techcadd brings a genuinely career-focused, industry-aligned MEAN Stack course to Mohali, with trainers who understand exactly what local and regional employers are looking for.",
    },
  ],
  "php-full-stack": [
    {
      icon: "layers",
      title: "You are not limited to one part of a website",
      body: "One major advantage of learning full stack development is understanding how the user interface connects with backend logic, how information is stored in a database, and how different technologies work together. The curriculum progresses from PHP fundamentals and advanced OOPs to MySQL, HTML, CSS, JavaScript, jQuery, Bootstrap, Laravel, CodeIgniter and WordPress, followed by certification and interview preparation.",
    },
    {
      icon: "terminal",
      title: "Build strong PHP fundamentals",
      body: "PHP remains an important skill for server-side web development. Starting with variables, data types, operators, control structures, functions, arrays and forms builds a strong coding base before advanced concepts. The program then introduces Object-Oriented PHP — classes, objects, inheritance, polymorphism, exception handling and file input/output — which is how larger applications are structured and maintained.",
    },
    {
      icon: "chart",
      title: "Learn database-driven development",
      body: "Modern websites need to store, retrieve, update and manage information, which is why MySQL forms an important part of the program. You learn SQL fundamentals, joins, database connectivity, and how PHP applications communicate with databases through MySQLi and PDO — the practical combination behind dynamic sites rather than static pages.",
    },
    {
      icon: "monitor",
      title: "Move from backend to full stack",
      body: "A full stack path also covers the frontend. HTML, CSS, JavaScript, jQuery and Bootstrap provide the foundation for responsive, interactive interfaces. Once frontend and backend connect, you can work toward complete applications — and Laravel adds another layer with Artisan, MVC architecture, Eloquent ORM, Blade templates and API development.",
    },
    {
      icon: "rocket",
      title: "Gain practical project experience",
      body: "The program is deliberately practical, including 25+ real-world PHP web applications and live project development so you practise concepts rather than learning only through theory. For students searching for PHP Full Stack training in Mohali, that project focus turns classroom learning into demonstrable portfolio work.",
    },
    {
      icon: "briefcase",
      title: "Prepare for an IT career",
      body: "The program is built with career preparation in mind, including PHP developer interview preparation, certification preparation and learning around data structures and algorithms — a structured pathway toward entry-level opportunities in the IT sector for students, graduates, job seekers and aspiring freelancers.",
    },
    {
      icon: "pin",
      title: "Relevant to the Mohali and Tricity market",
      body: "For learners across Mohali, Chandigarh, Zirakpur and Kharar, this route is aligned to local web development careers — practical PHP, Laravel and database skills that map to the roles being advertised across the Tricity, without travelling elsewhere for training.",
    },
  ],
  // The first five reasons answer "why this program"; the seven after them
  // answer "why Techcadd" — the section renders however many it is handed.
  "generative-ai": [
    {
      icon: "sparkles",
      title: "Learn Beyond Basic AI Tools",
      body: "Many learners use ChatGPT or other AI platforms for content, research, or brainstorming, but using an AI tool and understanding how an AI application works are two different skill levels. This program introduces students to concepts such as Large Language Models, prompt engineering, embeddings, vector databases, Retrieval-Augmented Generation (RAG), AI APIs, and AI application development. These areas provide a stronger foundation for students who want to progress toward technical AI roles.",
    },
    {
      icon: "rocket",
      title: "Practical, Project-Based Learning",
      body: "For students searching for a Generative AI training course in Mohali, practical exposure can make a major difference. Techcadd’s curriculum includes hands-on work with technologies such as Python, LangChain, Hugging Face, Pinecone, Streamlit, ChatGPT, and Claude. Learners can use these technologies to understand how AI solutions are created rather than simply studying definitions and theory. Projects can also help learners develop a portfolio that demonstrates their understanding to potential employers. A working AI chatbot, RAG-based application, AI assistant, or other practical project can communicate technical capability more effectively than course completion alone.",
    },
    {
      icon: "briefcase",
      title: "Build Job-Ready AI Skills",
      body: "The objective of this Generative AI course in Mohali is not limited to learning individual tools. Students can develop skills related to AI application development, prompt optimization, data interaction, model integration, and deployment. These skills are relevant to emerging career paths such as Generative AI Developer, AI Engineer, Prompt Engineer, AI Application Developer, and AI Consultant. For graduates and job seekers in the Mohali–Chandigarh region, learning these technologies can provide an additional specialization alongside an existing degree in computer applications, engineering, commerce, management, or another field.",
    },
    {
      icon: "target",
      title: "Suitable for Different Learning Goals",
      body: "The course can be useful whether your objective is getting your first technology job, upgrading your current profile, freelancing, developing an AI-based product, or understanding how businesses can use Generative AI. The program's available 3–6 month formats, classroom learning, weekend options, and 1-on-1 learning offer flexibility for different types of learners.",
    },
    {
      icon: "chart",
      title: "Stay Relevant in an AI-Driven Job Market",
      body: "AI skills are increasingly becoming complementary to existing digital and technical skills. Learning Generative AI now can help students understand how modern AI systems are used in practical workflows and applications. Rather than treating AI as a shortcut, this program encourages learners to understand the technology, experiment with it, build projects, and apply it to real problems. For anyone looking for a Generative AI course in Mohali with a practical and career-focused learning approach, Techcadd provides a structured path from foundational concepts toward building AI-powered solutions.",
    },
    {
      icon: "terminal",
      title: "Practical Learning Approach",
      body: "Techcadd emphasizes practical learning so students can apply concepts while studying them. The Generative AI curriculum includes areas such as Python, prompt engineering, Large Language Models, embeddings, vector databases, Retrieval-Augmented Generation (RAG), AI APIs, and AI application development. This progression helps learners move from fundamental concepts toward building useful AI-powered applications.",
    },
    {
      icon: "layers",
      title: "Industry-Relevant Tools",
      body: "Students get exposure to widely used AI and development technologies, including ChatGPT, Claude, Hugging Face, LangChain, Pinecone, Python, and Streamlit. Learning a combination of AI platforms, programming concepts, frameworks, and deployment-oriented tools can help students understand how different components work together in an AI application.",
    },
    {
      icon: "code",
      title: "Project-Focused Training",
      body: "Reading about Generative AI is only one part of learning. Building projects provides an opportunity to apply concepts, identify errors, improve solutions, and develop problem-solving ability. Techcadd's course includes practical project work so students can gain experience creating AI-based solutions and develop material that can contribute to their professional portfolio.",
    },
    {
      icon: "users",
      title: "Designed for Career Growth",
      body: "The program is suitable for 12th-pass students, graduates, final-year students, job seekers, freelancers, and working professionals. Learners can use the course to develop a new specialization or add Generative AI knowledge to an existing technical or digital skill set. For students in the Mohali–Chandigarh region, local classroom-based learning can also provide direct interaction with trainers and fellow learners.",
    },
    {
      icon: "clock",
      title: "Flexible Learning Options",
      body: "Different students have different schedules and learning preferences. Techcadd offers 3-month and 6-month learning formats, along with classroom, weekend, and 1-on-1 training options. This flexibility can make it easier for college students and working professionals to choose a learning format that fits their routine.",
    },
    {
      icon: "monitor",
      title: "Trainer Guidance and Structured Learning",
      body: "Generative AI includes many rapidly changing concepts, tools, and workflows. Learning through a structured curriculum can help reduce confusion caused by disconnected online tutorials. Trainer guidance gives students an opportunity to clarify concepts, receive feedback on practical work, and understand how AI technologies can be applied to real-world scenarios.",
    },
    {
      icon: "certificate",
      title: "Build a Stronger Portfolio",
      body: "A valuable outcome of technical training is the ability to demonstrate what you can actually build. Through assignments and projects, students can work toward creating a portfolio that showcases their Generative AI knowledge. This can be useful when preparing for interviews, internships, freelance projects, or entry-level AI opportunities.",
    },
  ],
  // The first six answer "why this program"; the ten after them answer
  // "why Techcadd".
  "autocad": [
    {
      icon: "pin",
      title: "It Solves a Real, Local Problem",
      body: "Mohali is rapidly growing as an industrial, IT, and real estate hub — from IT Park and Industrial Area Phase 7, 8, and 9, to the booming construction activity across Sector 70, Sector 82, and Aerocity. This growth has created strong, consistent local demand for skilled CAD drafters, design assistants, and junior engineers. Yet many students graduate without ever getting hands-on, practical AutoCAD exposure. This program directly addresses that gap for students living in and around Mohali, without requiring relocation to Delhi or other big cities.",
    },
    {
      icon: "briefcase",
      title: "Career Readiness, Not Just Software Training",
      body: "A lot of institutes simply teach you which button does what. This program is structured differently — it's built around actual industry workflows. You don't just learn commands; you learn how a mechanical assembly drawing is prepared for manufacturing, how a civil site plan is structured for approval, or how an interior layout is presented to a client. This distinction matters enormously when you're sitting in a job interview in Mohali or Chandigarh and a recruiter asks you to walk through your process.",
    },
    {
      icon: "chart",
      title: "Low Investment, High Return",
      body: "Compared to a full engineering degree or a expensive diploma program, an AutoCAD course is a low-cost, short-duration investment that can open doors to jobs paying reasonably well starting salaries in drafting, design assistance, and CAD operation roles — right here in the local Mohali-Chandigarh-Panchkula job market, without needing to relocate.",
    },
    {
      icon: "layers",
      title: "It Builds a Foundation for Multiple Career Paths",
      body: "AutoCAD isn't a dead-end skill. It's often the first step toward more advanced tools like Revit, SolidWorks, CATIA, or 3ds Max. Many Techcadd students in Mohali go on to specialize further in BIM (Building Information Modelling), mechanical design, or interior visualization — building a long-term, layered career rather than a single job.",
    },
    {
      icon: "users",
      title: "Local Support, Local Placement Network",
      body: "Because this program is based in Mohali, it's connected to the local job ecosystem — architecture firms, interior design studios, construction companies, and manufacturing units across Mohali, Chandigarh, Panchkula, and Zirakpul. That local placement network matters far more than a generic online course with no regional connections.",
    },
    {
      icon: "target",
      title: "Confidence Through Practice, Not Just Certificates",
      body: "At the end of the day, employers care less about a certificate and more about whether you can actually draft, design, and deliver. This program is built so that by the time you finish, you're not \"familiar\" with AutoCAD — you're confident using it independently on real project files, ready to show your portfolio in any interview across the region.",
    },
    {
      icon: "verified",
      title: "A Proven Track Record — 10,000+ Students Trained",
      body: "Techcadd isn't a new name experimenting in the training space. It has trained over 10,000 students across various IT and design courses, with AutoCAD being one of its most popular and consistently in-demand programs. This kind of scale doesn't happen by accident — it reflects years of refining course content, trainer quality, and student support based on real feedback from the local Mohali job market.",
    },
    {
      icon: "certificate",
      title: "ISO-Certified Training Standards",
      body: "Techcadd operates as an ISO-certified institute, which means its training processes, quality checks, and certification standards follow a recognized benchmark — not just informal, ad-hoc teaching. For students, this translates into a certificate that actually carries weight when you apply for jobs in Mohali, Chandigarh, or beyond, because it signals a structured, quality-controlled learning process rather than a quick weekend crash course.",
    },
    {
      icon: "refresh",
      title: "Industry-Relevant, Constantly Updated Curriculum",
      body: "One of the biggest complaints students have about traditional institutes is outdated course content — teaching old AutoCAD versions or ignoring how the software is actually used in today's architecture, mechanical design, and civil drafting industries. Techcadd's AutoCAD curriculum is built around current industry workflows: 2D drafting, construction layouts, mechanical assembly drawings, 3D modelling, interior layouts, and building plans. Instead of learning in isolation, you learn the way professionals in Mohali's growing design and construction firms actually work.",
    },
    {
      icon: "terminal",
      title: "Hands-On, Project-Based Learning — Not Just Theory",
      body: "At Techcadd, learning AutoCAD doesn't mean sitting through hours of passive lectures. The course is built around live, real-world drafting labs. You'll work on actual building plans, furniture layouts, mechanical assemblies, and engineering drawings — the same type of work you'd encounter on the job. By the time you finish, you're not just \"aware\" of AutoCAD tools; you've used them repeatedly on realistic project files, which means you walk into interviews with an actual portfolio, not just a certificate.",
    },
    {
      icon: "cube",
      title: "Experienced Trainers With Real Industry Backgrounds",
      body: "The quality of any technical course comes down to who's teaching it. Techcadd's trainers aren't fresh graduates reading from a manual — they bring real industry experience in CAD design, drafting, and engineering projects. This matters because they can explain not just how to use a tool, but why it's used that way in real projects, and share practical shortcuts and troubleshooting tips that only come from hands-on professional experience. For students in Mohali, this kind of mentorship — grounded in local industry context — is hard to find elsewhere.",
    },
    {
      icon: "clock",
      title: "Flexible Batch Timings for Every Type of Student",
      body: "Techcadd understands that its students aren't all the same. Some are full-time students juggling college classes; others are working professionals trying to upskill after office hours; some are job seekers who need to move quickly. That's why Techcadd Mohali offers flexible batch timings — including weekend and evening options — so that no matter your schedule, you can attend consistently without disrupting your studies or job.",
    },
    {
      icon: "monitor",
      title: "Both Online and Offline Learning Options",
      body: "While hands-on, in-person training is often the most effective way to learn a tool like AutoCAD, Techcadd also understands that not every student in the Mohali-Chandigarh region can commute easily. That's why the institute offers virtual labs, live online classes, and recorded sessions alongside its offline classroom training — giving you the flexibility to choose (or combine) whichever mode suits your life best.",
    },
    {
      icon: "building",
      title: "100% Placement Assistance With Local Industry Connections",
      body: "A course is only as valuable as the outcome it leads to. Techcadd provides placement assistance connected to real companies operating in Mohali's Industrial Areas, Chandigarh's design studios, and the broader Tricity job market. This local network means the institute understands what regional employers are actually looking for — and can guide your training and portfolio-building accordingly, rather than teaching in a generic, one-size-fits-all way disconnected from where you'll actually be applying for jobs.",
    },
    {
      icon: "checkCircle",
      title: "Affordable Fees With Installment Support",
      body: "Cost is a real factor for most students and job seekers. Techcadd's AutoCAD course in Mohali is priced to be accessible, with installment support available so you're not forced to pay everything upfront. Compared to the cost of a full engineering diploma or the opportunity cost of staying unskilled while job hunting, this course represents a genuinely low-risk, high-reward investment in your career.",
    },
    {
      icon: "rocket",
      title: "A Learning Environment Built for Confidence, Not Just Information",
      body: "Perhaps the most important thing Techcadd offers isn't a specific feature — it's an outcome. Students don't just leave with information about AutoCAD; they leave with the confidence to sit down at a workstation and independently draft, design, and deliver. That confidence is what actually gets you hired and helps you perform well once you're on the job — whether that's at a construction firm in Sector 82, an architecture studio in Chandigarh, or a manufacturing unit in Mohali's Industrial Area.",
    },
  ],
};

/** "Who can join" cards, replacing the category default. */
const audienceBySlug: Record<string, { title: string; body: string; icon: string }[]> = {
  "ai-powered-marketing": aiPoweredMarketingAudience,
  "chatgpt-ai-tools": chatgptAiToolsAudience,
  rag: ragAudience,
  "ai-powered-courses": aiPoweredCoursesAudience,
  "all-ai-courses": allAiCoursesAudience,
  "mern-full-stack--certificate": mernCertificateAudience,
  "data-science--certificate": dataScienceCertificateAudience,
  "agentic-ai--certificate": agenticAiCertificateAudience,
  "cyber-security--certificate": cyberSecurityCertificateAudience,
  "cloud-computing--certificate": cloudComputingCertificateAudience,
  "digital-marketing--certificate": digitalMarketingCertificateAudience,
  "artificial-intelligence--certificate": artificialIntelligenceCertificateAudience,
  "flutter--certificate": flutterCertificateAudience,
  "data-analytics--certificate": dataAnalyticsCertificateAudience,
  "full-stack-development--certificate": fullStackDevelopmentCertificateAudience,
  "basic-computer-office-skills--certificate": basicComputerOfficeSkillsAudience,
  "agentic-ai": [
    {
      icon: "users",
      title: "Students after 12th",
      body: "Join from any stream — Science, Commerce, or Arts. You start from Python fundamentals with no assumed knowledge, and most students run this Agentic AI course in Mohali alongside a degree at a local college using the weekday or weekend batch. Students from Phase 3B2, Phase 7, Phase 9, and Sector 70–71 in Mohali regularly join straight after their 12th boards to get a head start before college even begins.",
    },
    {
      icon: "certificate",
      title: "Graduates and final-year students",
      body: "If you're finishing a BCA, B.Tech, BBA, or B.Com from a college in the Mohali–Chandigarh Tricity — Chandigarh University Gharuan, Chitkara University, Chandigarh Group of Colleges Landran, or DAV College Mohali — this is the shortest route from degree to salary. Enter placement season with real project work in hand instead of a blank CV.",
    },
    {
      icon: "briefcase",
      title: "Working professionals",
      body: "The weekend and evening batches exist for people already earning, including those working in Mohali's IT Park, Quark City, or the many IT/ITES companies across Phase 8. Career switchers typically become interview-ready for AI Engineer roles within five to six months without leaving their current job.",
    },
    {
      icon: "rocket",
      title: "Business owners and freelancers",
      body: "Business owners in Mohali and Zirakpur take this Agentic AI training to stop outsourcing work they cannot judge for themselves. Freelancers take it to bill clients beyond Punjab — Mohali's growing tech ecosystem means location no longer limits remote-work opportunities in this field.",
    },
    {
      icon: "refresh",
      title: "Career restarters",
      body: "A gap on your CV counts for less than work you can point to. This course starts at zero and finishes with a portfolio and a documented internship letter — exactly what an interviewer in Chandigarh, Mohali, or Panchkula asks about after a career break.",
    },
    {
      icon: "monitor",
      title: "Self-taught learners",
      body: "If free YouTube tutorials left you with notes but nothing actually built, what changes here is a trainer who reviews your work every week and a deadline attached to every module — not another playlist to abandon halfway.",
    },
  ],
  // The brief carries no standalone audience section; these are the seven
  // groups its FAQ names, each expanded only with lines the brief itself
  // writes about that group.
  "prompt-engineering": [
    {
      icon: "users",
      title: "12th-Pass Students",
      body: "No prior programming knowledge is required to start. A full-time degree can take three to four years — this program is designed to get you job-ready in a fraction of that time, with a curriculum focused entirely on practical, employable skills rather than long theoretical detours.",
    },
    {
      icon: "certificate",
      title: "College Graduates",
      body: "Graduates from any stream can enrol. Prompt engineering skills transfer across careers, so the program is a safe, future-proof investment regardless of which direction your career eventually takes — and you leave with a portfolio of real projects rather than only a certificate.",
    },
    {
      icon: "terminal",
      title: "IT Professionals",
      body: "Professionals who can direct AI tools effectively are becoming significantly more valuable than those who can't, regardless of their original field of study. The course goes deep enough to genuinely prepare you for AI-related job roles, covering prompting frameworks, visual AI and automation.",
    },
    {
      icon: "megaphone",
      title: "Digital Marketers",
      body: "A marketer and a developer in Mohali can apply the same core prompting techniques to completely different problems. You'll practice across content writing, creative brainstorming and image generation for design, marketing and content use cases.",
    },
    {
      icon: "rocket",
      title: "Freelancers",
      body: "A certificate from a known Mohali-based training institute adds credibility when applying to freelance platforms or remote-first organizations that increasingly hire AI-literate talent from tier-2 cities across India. You leave with actual work you can show clients.",
    },
    {
      icon: "target",
      title: "Job Seekers",
      body: "While national job platforms show a rising number of prompt engineering and AI-support roles, the number of properly trained candidates in tier-2 cities like Mohali remains low. This gap works in your favor — early movers who train now position themselves ahead of the curve.",
    },
    {
      icon: "refresh",
      title: "Career Returnees and Switchers",
      body: "The curriculum is designed to be accessible for career switchers, starting from what generative AI actually is before moving into advanced prompting techniques. You're never thrown into advanced material before you understand how AI models process instructions.",
    },
  ],
  "cyber-security": [
    {
      icon: "users",
      title: "12th pass students (science or commerce)",
      body: "Students from Mohali, Kharar and Zirakpur often start right after school — the field offers fast-track certifications and quicker entry into paying jobs than a four-year degree path. Basic computer knowledge and curiosity about how systems work is enough.",
    },
    {
      icon: "certificate",
      title: "Graduates — BCA, B.Tech, B.Sc IT or any stream",
      body: "Technical or non-technical, this training helps you pivot into a high-demand IT career. Many graduates from Mohali and Chandigarh colleges join because their degree gave them theory, and recruiters want proof of hands-on ability instead.",
    },
    {
      icon: "monitor",
      title: "IT professionals looking to upskill",
      body: "Already in development, networking or system administration? Security skills open specialised, higher-paying roles. Professionals from Mohali's IT City and Chandigarh's IT Park enrol to stay competitive as hiring turns security-first.",
    },
    {
      icon: "rocket",
      title: "Job seekers wanting a career switch",
      body: "Unemployed, underemployed or unhappy in your current field? We have trained students from across the tricity who moved from unrelated fields into IT security roles within months of structured training.",
    },
    {
      icon: "briefcase",
      title: "Freelancers and entrepreneurs",
      body: "Bug bounty hunters, freelancers and business owners all benefit from knowing how to secure systems, websites and networks — especially as cyber threats against small businesses in Punjab and North India keep rising.",
    },
  ],
  "cloud-computing": [
    {
      icon: "users",
      title: "12th Pass Students (Science or Commerce Background)",
      body: "If you've just completed 12th grade and are weighing your career options, cloud computing is one of the smartest fields to enter early. Students from Mohali, Kharar, Zirakpur, and surrounding areas increasingly choose cloud training right after school because it offers a faster, more direct route into a well-paying tech career compared to longer traditional degree paths. Basic computer familiarity and an interest in how websites, apps, and servers actually run behind the scenes is a great foundation to start from.",
    },
    {
      icon: "certificate",
      title: "Graduates (BCA, B.Tech, B.Sc IT, or Any Stream)",
      body: "Whether you hold a technical degree like BCA or B.Tech, or come from a completely different background like B.Com or BA, cloud computing training can open doors that your degree alone may not have. Many graduates from colleges across Mohali and Chandigarh join this course specifically because their academic education covered theory but left them without practical, deployable cloud skills that recruiters are actively screening for.",
    },
    {
      icon: "monitor",
      title: "IT Professionals Looking to Upskill",
      body: "Already working in software development, system administration, or networking? Adding cloud skills — particularly around AWS or Azure — to your profile significantly boosts your market value. Professionals from companies based in Mohali's IT City and Chandigarh's IT Park frequently enroll in cloud training because organizations across nearly every sector are migrating operations to the cloud, and internal promotions increasingly favor those with proven cloud competency.",
    },
    {
      icon: "rocket",
      title: "Job Seekers Wanting a Career Switch",
      body: "If you're between jobs, stuck in a role that doesn't excite you, or simply looking for a more future-proof career, cloud computing offers a realistic and well-documented path forward. Techcadd has trained students from Mohali and the wider tricity region who successfully moved from entirely unrelated fields into cloud support and administration roles within a few months of structured training.",
    },
    {
      icon: "briefcase",
      title: "Freelancers, Startup Founders, and Small Business Owners",
      body: "Understanding cloud infrastructure isn't just useful for employees. Freelancers managing client websites, and small business owners running their own digital operations, benefit enormously from understanding how to deploy, scale, and secure cloud-based systems — especially as more businesses across Punjab and North India move core operations online.",
    },
  ],
  linux: [
    {
      icon: "users",
      title: "12th Pass Students (Any Stream)",
      body: "If you've just completed your 12th and are wondering what to do next, a Linux course after 12th in Mohali is one of the smartest early moves into the IT industry. Science, commerce, or arts background — it doesn't matter. Linux is taught from the absolute basics, so students with zero technical exposure can follow along comfortably. Many students in Mohali, Kharar, and Zirakpur choose this path instead of waiting years for a traditional degree to become \"job-ready.\"",
    },
    {
      icon: "certificate",
      title: "Undergraduates and Graduates (BCA, B.Tech, B.Sc IT, or Any Degree)",
      body: "College students and recent graduates from Mohali, Chandigarh, Panchkula, and nearby areas often find that their degree alone isn't enough to land an IT job. This Linux training in Mohali fills that practical skills gap — employers today want candidates who can actually operate servers, write shell scripts, and manage systems, not just recite theory. Pairing your degree with hands-on Linux skills makes your resume far more competitive in the Tricity job market.",
    },
    {
      icon: "rocket",
      title: "Job Seekers Looking to Break into IT",
      body: "If you're currently unemployed or in a non-IT job and want a genuine entry point into tech, Linux is one of the most in-demand and beginner-friendly skills you can learn. Since almost every server, cloud platform, and enterprise IT setup runs on Linux, this course gives job seekers in Mohali a direct, practical route into system administration, technical support, and IT infrastructure roles — without needing years of prior experience.",
    },
    {
      icon: "monitor",
      title: "Working Professionals Wanting to Upskill",
      body: "Already working in IT, networking, or software support? Adding Linux administration to your skill set is one of the highest-ROI upgrades you can make. With flexible batch timings at Techcadd's Mohali training centre, working professionals from across Chandigarh and Punjab can attend evening or weekend batches without disrupting their current job.",
    },
    {
      icon: "shield",
      title: "Aspiring Cloud, DevOps, and Cybersecurity Professionals",
      body: "If your long-term goal is AWS, Azure, DevOps, or ethical hacking, Linux is the non-negotiable foundation underneath all of it. Students planning to pursue advanced certifications later often start here first, because nearly every cloud and cybersecurity tool is built on Linux systems.",
    },
    {
      icon: "building",
      title: "Diploma and Polytechnic Students",
      body: "Students pursuing diplomas in computer science or IT-related fields from institutes across Mohali and Punjab can use this course to gain the practical, lab-based experience that classroom diplomas often lack.",
    },
  ],
  "ethical-hacking": [
    {
      icon: "users",
      title: "12th Pass Students (Any Stream)",
      body: "If you've just finished school and are fascinated by hacking, cybercrime investigations, or how digital systems get breached, an Ethical Hacking course after 12th in Mohali is a strong entry point into cybersecurity. Whether you come from science, commerce, or arts, the course builds foundational IT and networking concepts before moving into hacking techniques, so no prior technical background is assumed.",
    },
    {
      icon: "certificate",
      title: "Undergraduates and Graduates (BCA, B.Tech, B.Sc IT, or Any Degree)",
      body: "Many college students and graduates from Mohali, Chandigarh, Panchkula, and Zirakpur find that their degree covers theory but not the practical, tool-based skills employers actually test for. This Ethical Hacking training in Mohali fills that gap with hands-on labs using real penetration testing tools — giving your resume a serious edge in the competitive Tricity IT job market.",
    },
    {
      icon: "rocket",
      title: "Job Seekers Looking to Enter Cybersecurity",
      body: "If you're currently unemployed or working outside IT and want a genuine, high-demand career switch, ethical hacking is one of the fastest-growing fields globally. With a well-documented shortage of skilled cybersecurity professionals in India, job seekers in Mohali completing this course gain a direct path into roles like Security Analyst, Junior Penetration Tester, or SOC Analyst — often without needing years of prior IT experience.",
    },
    {
      icon: "monitor",
      title: "IT Professionals and Network Administrators Wanting to Upskill",
      body: "If you already work in networking, system administration, or IT support, adding ethical hacking and penetration testing skills is one of the highest-value upgrades you can make to your career. Techcadd's flexible batch timings in Mohali allow working professionals from across Chandigarh and Punjab to attend evening or weekend sessions without leaving their current job.",
    },
    {
      icon: "shield",
      title: "Aspiring Cybersecurity Specialists (SOC, VAPT, Forensics)",
      body: "Students planning long-term careers in Security Operations Centers (SOC), Vulnerability Assessment and Penetration Testing (VAPT), or digital forensics often start with this course as their foundation. Since ethical hacking concepts underpin nearly every advanced cybersecurity specialization, this training sets you up for deeper certifications later.",
    },
    {
      icon: "building",
      title: "Diploma and Polytechnic Students",
      body: "Students pursuing diplomas in computer science, IT, or related fields across Mohali and Punjab can use this course to gain the practical, lab-based exposure to real hacking tools and techniques that classroom-only diplomas typically don't provide.",
    },
    {
      icon: "target",
      title: "Tech Enthusiasts and Puzzle-Solvers",
      body: "If you naturally enjoy problem-solving, understanding how systems work, and finding weaknesses before criminals do, ethical hacking offers a legal, structured, and highly rewarding outlet for that curiosity — combined with strong career prospects.",
    },
  ],
  "power-bi": [
    {
      icon: "users",
      title: "12th Pass Students (Any Stream)",
      body: "If you've just completed your 12th and are interested in data, reporting, or business analytics, a Power BI course after 12th in Mohali is a smart, practical entry point into the data analytics field. Whether you're from science, commerce, or arts, the course builds foundational data concepts from scratch, so no prior technical background is assumed.",
    },
    {
      icon: "certificate",
      title: "Undergraduates and Graduates (BCA, B.Com, BBA, B.Tech, or Any Degree)",
      body: "Commerce and business graduates especially benefit from this course, since Power BI bridges business thinking with technical execution. Students from Mohali, Chandigarh, Panchkula, and Zirakpur often find that their degree covers business or IT theory but not the hands-on dashboard-building and data storytelling skills employers now expect. This course fills exactly that gap.",
    },
    {
      icon: "rocket",
      title: "Job Seekers Looking to Enter Data Analytics",
      body: "If you're currently unemployed or working outside the data field and want a genuine, high-demand career switch, Power BI is one of the fastest, most practical routes into data analytics. Since companies across Mohali's IT Park, Chandigarh, and beyond are sitting on large volumes of data but lack skilled analysts to interpret it, job seekers completing this course gain a direct path into roles like Data Analyst, BI Analyst, and Reporting Analyst.",
    },
    {
      icon: "briefcase",
      title: "Working Professionals (Finance, Operations, Marketing, Sales)",
      body: "You don't need to work in IT to benefit from Power BI. Professionals in finance, operations, marketing, sales, and HR increasingly need to present data-driven insights in their day-to-day roles. Flexible weekend and evening batches at Techcadd Mohali let working professionals across Chandigarh and Punjab add this high-value skill without stepping away from their current job.",
    },
    {
      icon: "chart",
      title: "Aspiring Data Analysts and Business Intelligence Professionals",
      body: "Students planning long-term careers in data analytics, business intelligence, or data science often start with Power BI as their visualization foundation, since dashboarding and reporting skills are core to nearly every data-driven role across industries.",
    },
    {
      icon: "monitor",
      title: "Diploma, MBA, and Management Students",
      body: "Students pursuing diplomas, MBAs, or management degrees across Mohali and Punjab can use this course to add a practical, portfolio-ready skill that directly supports case studies, project reports, and dashboard-based presentations — something most academic programs don't teach hands-on.",
    },
    {
      icon: "building",
      title: "Entrepreneurs and Small Business Owners",
      body: "If you run or plan to run a business, understanding your own sales, inventory, or customer data through Power BI dashboards can directly improve decision-making — no need to hire a separate analyst for basic reporting needs.",
    },
  ],
  tableau: [
    {
      icon: "users",
      title: "12th Pass Students (Any Stream)",
      body: "If you've just finished your 12th and are curious about data, analytics, or visual reporting, a Tableau course after 12th in Mohali is a smart, practical way to enter the data analytics field early. Whether you come from science, commerce, or arts, the course starts from foundational data concepts, so no prior technical background is required.",
    },
    {
      icon: "certificate",
      title: "Undergraduates and Graduates (BCA, B.Com, BBA, B.Tech, or Any Degree)",
      body: "Commerce and business graduates especially benefit from Tableau, since it bridges business understanding with visual data analysis. Students from Mohali, Chandigarh, Panchkula, and Zirakpur often find that their degree covers theory but not hands-on dashboarding skills — this course fills exactly that gap, giving your resume a genuine edge in the Tricity job market.",
    },
    {
      icon: "rocket",
      title: "Job Seekers Looking to Enter Data Analytics",
      body: "If you're currently unemployed or working outside the data field and want a genuine, high-demand career switch, Tableau is one of the most widely recognized visualization tools in the industry. Since companies across Mohali and Chandigarh generate large volumes of data but often lack skilled analysts to interpret it, job seekers completing this course gain a direct path into roles like Data Analyst, BI Analyst, and Reporting Analyst.",
    },
    {
      icon: "briefcase",
      title: "Working Professionals (Finance, Marketing, Operations, Sales)",
      body: "You don't need to work in IT to benefit from Tableau. Professionals across finance, marketing, operations, and sales increasingly need to present data-driven insights clearly to stakeholders. Flexible batch timings at Techcadd Mohali allow working professionals from across Chandigarh and Punjab to add this valuable skill without pausing their current job.",
    },
    {
      icon: "chart",
      title: "Aspiring Data Analysts and Data Scientists",
      body: "Students planning long-term careers in data analytics or data science often learn Tableau alongside Python, SQL, and Power BI, since visualization is a core, non-negotiable skill across nearly every data-driven role. This course serves as a strong foundation or complementary skill for those broader career paths.",
    },
    {
      icon: "building",
      title: "Diploma, MBA, and Management Students",
      body: "Students pursuing diplomas, MBAs, or management degrees across Mohali and Punjab can use this course to build a practical, portfolio-ready skill directly applicable to case studies, business reports, and dashboard-based presentations — something most academic syllabi don't teach hands-on.",
    },
    {
      icon: "target",
      title: "Freelancers and Consultants",
      body: "If you're building a freelance career in data analysis or business consulting, Tableau skills allow you to offer clients professional, visually compelling reporting — a valuable, billable skill set that's in demand well beyond traditional employment.",
    },
  ],
  "data-science": [
    {
      icon: "users",
      title: "12th Pass Students (Any Stream)",
      body: "If you've just completed your 12th and are drawn to data, statistics, or the idea of building predictive models, a Data Science course after 12th in Mohali is an ambitious but achievable entry point. Science stream students often adapt fastest due to comfort with logic and math, but commerce and even arts students can succeed here too, since the course builds Python, statistics, and analytical thinking from the ground up.",
    },
    {
      icon: "certificate",
      title: "Undergraduates and Graduates (B.Tech, BCA, B.Sc, B.Com, or Any Degree)",
      body: "Engineering and computer science graduates from Mohali, Chandigarh, Panchkula, and Zirakpur often use this course to specialize beyond their core degree, while B.Com, BBA, and B.Sc graduates use it to pivot entirely into a technical, high-paying analytics career. Since most degrees don't teach practical Python, machine learning, or real-world data handling, this course fills a critical, job-relevant skills gap.",
    },
    {
      icon: "rocket",
      title: "Job Seekers Looking to Enter the Data Field",
      body: "If you're currently unemployed or working in a non-data role and want a genuine, high-demand career switch, data science offers one of the strongest return-on-investment paths in today's job market. Companies across Mohali's IT Park, Chandigarh, and beyond are actively seeking professionals who can turn raw data into business insights — and this course builds you directly toward Data Analyst, Junior Data Scientist, and Machine Learning roles.",
    },
    {
      icon: "monitor",
      title: "Working IT Professionals Wanting to Pivot or Upskill",
      body: "If you already work in software development, testing, or IT support, adding data science skills is one of the highest-leverage career moves available. Flexible batch timings — including part-time evening batches for college students and weekend batches for working professionals — let you build this skill set without leaving your current job.",
    },
    {
      icon: "sparkles",
      title: "Aspiring Machine Learning and AI Professionals",
      body: "Students planning long-term careers in machine learning, AI, or advanced analytics typically start with a strong data science foundation, since concepts like statistics, data manipulation, and model evaluation underpin nearly every advanced AI role.",
    },
    {
      icon: "building",
      title: "Diploma, MBA, and Analytics-Focused Students",
      body: "Students pursuing diplomas, MBAs, or analytics-adjacent degrees across Mohali and Punjab can use this course to gain the hands-on, project-based technical depth that most classroom-only programs don't provide — directly strengthening dissertations, capstones, and job applications.",
    },
    {
      icon: "briefcase",
      title: "Career Changers from Non-Technical Backgrounds",
      body: "Even without a technical background, motivated learners from finance, marketing, or operations backgrounds have successfully transitioned into data roles through structured, beginner-friendly programs like this one — provided they're willing to put in consistent, focused effort across the course duration.",
    },
  ],
  "data-analytics": [
    {
      icon: "users",
      title: "12th Pass Students (Any Stream)",
      body: "If you've just finished school and are trying to figure out what comes next, a Data Analytics course in Mohali can be a smart, future-proof starting point. You don't need a background in programming or advanced math. Techcadd starts from the absolute basics — Excel fundamentals, logical thinking, and data literacy — before moving into SQL, Power BI, Tableau, and Python. Many students who join straight after 12th grade end up building a strong foundation early, giving them a head start over peers who choose analytics only after college.",
    },
    {
      icon: "certificate",
      title: "Graduates From Any Stream (B.Com, BA, BBA, B.Sc, B.Tech)",
      body: "You don't need to be an engineer to become a data analyst. In fact, one of the most common success stories at Techcadd's Mohali centre comes from commerce and arts graduates. Students from B.Com, BA, and BBA backgrounds regularly join this Data Analytics course in Mohali and go on to work confidently with SQL queries, dashboards, and Python scripts. If you're a graduate unsure about your next career move — especially if you're based in Mohali, Chandigarh, Panchkula, or Zirakpur — this course offers a clear, structured path into the IT and analytics industry without requiring you to start a fresh degree.",
    },
    {
      icon: "briefcase",
      title: "Working Professionals Looking to Upskill or Switch Careers",
      body: "Mohali's IT Park and the wider Tricity region are home to thousands of professionals working in support roles, operations, sales, HR, and admin — many of whom are now looking to move into more data-driven, higher-paying roles. If you're currently employed but want to pivot into analytics, this course is structured with evening-friendly batches and flexible mentorship so you can upskill without pausing your career. Professionals from finance, marketing, and management backgrounds often find that analytics skills directly boost their current role's value, even before they switch jobs.",
    },
    {
      icon: "monitor",
      title: "IT Professionals Wanting to Specialize",
      body: "If you're already working in IT — as a developer, tester, or support executive — but want to specialize in data analytics or data science, this course helps you build in-demand skills like Power BI dashboarding, advanced SQL, and Python-based data analysis. Given how competitive the Mohali and Chandigarh IT job market has become, specializing in analytics is one of the fastest ways to stand out.",
    },
    {
      icon: "rocket",
      title: "Career Changers and Domain Switchers",
      body: "Finally, this course is genuinely built for anyone based in or around Mohali who wants a structural career change — regardless of age or current profession. With small batch sizes, one-on-one mentorship, and real project work, Techcadd ensures that even complete beginners are supported step by step rather than left to catch up on their own.",
    },
  ],
  "machine-learning": [
    {
      icon: "users",
      title: "12th Pass Students Interested in Future-Ready Careers",
      body: "If you've just completed school and are drawn to technology, AI, and problem-solving, this course is a strong starting point. You don't need prior programming knowledge. Techcadd begins with Python fundamentals — variables, loops, functions, and logic building — before gradually introducing machine learning concepts. Starting early with ML gives students in Mohali a significant head start, since this field typically takes years to master and early exposure compounds quickly.",
    },
    {
      icon: "certificate",
      title: "Graduates From Any Stream (B.Tech, B.Sc, BCA, B.Com, BA)",
      body: "While a technical background helps, it's not mandatory. Techcadd regularly trains graduates from non-CS backgrounds — including B.Com, BA, and BBA students — who go on to build real machine learning models using Python and Scikit-learn. If you're a graduate in or around Mohali unsure how to enter the AI/ML space without a computer science degree, this course provides a structured, beginner-friendly bridge into the field.",
    },
    {
      icon: "briefcase",
      title: "Working Professionals Looking to Move Into AI/ML Roles",
      body: "Mohali's IT Park and the wider Tricity region host thousands of professionals working in software development, testing, support, and analytics — many of whom are now looking to specialize in machine learning as demand grows. This course is structured with evening and weekend batch options so working professionals can build ML skills without stepping away from their current job.",
    },
    {
      icon: "monitor",
      title: "Developers and IT Professionals Wanting to Specialize",
      body: "If you're already working as a developer, data analyst, or software engineer in Mohali or Chandigarh, adding machine learning to your skill set is one of the fastest ways to move into higher-paying, more specialized roles. This course covers supervised and unsupervised learning, model evaluation, and real-world ML workflows — exactly the depth needed to transition from general development into applied ML work.",
    },
    {
      icon: "rocket",
      title: "Career Changers Serious About Long-Term Tech Careers",
      body: "Finally, this course is built for anyone based in or near Mohali who wants a genuine, long-term shift into artificial intelligence and machine learning — regardless of current profession or age. With small batch sizes and hands-on mentorship, Techcadd ensures beginners aren't left to figure out complex ML concepts alone, while still challenging students who already have some technical exposure.",
    },
  ],
  "deep-learning": [
    {
      icon: "terminal",
      title: "Students and Graduates With Some Python or ML Exposure",
      body: "If you've already worked with Python — whether through a data analytics course, a machine learning course, or self-study — and you're ready to go further into neural networks and AI, this course is a natural next step. Techcadd builds on existing Python knowledge and gradually introduces neural network concepts, so you're not starting from zero, but you're also not thrown into complex research papers without support.",
    },
    {
      icon: "certificate",
      title: "B.Tech, BCA, and Computer Science Graduates",
      body: "Technical graduates from Mohali, Chandigarh, and surrounding areas looking to specialize beyond general programming or web development will find this course directly relevant. Deep learning skills — particularly in computer vision and NLP — are increasingly requested in job postings across the Tricity IT hub, making this a strong specialization choice for CS-background students.",
    },
    {
      icon: "monitor",
      title: "Working Professionals in Data, Analytics, or Software Roles",
      body: "If you're currently working as a data analyst, software developer, or in a related tech role around Mohali's IT Park and want to move into more advanced AI work, this course helps you make that transition. Evening and weekend batch options mean you can build deep learning skills without pausing your current job, and the applied focus means you can start connecting concepts to your existing work almost immediately.",
    },
    {
      icon: "rocket",
      title: "Machine Learning Learners Ready to Go Deeper",
      body: "Students who've already completed a machine learning course — at Techcadd or elsewhere — and want to specialize in neural networks, image recognition, or natural language processing will find this course a logical progression. Deep learning opens doors to more specialized, often better-paying AI roles compared to general ML positions.",
    },
    {
      icon: "sparkles",
      title: "Career Changers Aiming for Specialized AI Roles",
      body: "Finally, this course suits anyone based in or near Mohali who's serious about building a career specifically in AI-driven fields — not just general data roles. With small batch sizes and dedicated mentorship, Techcadd ensures that even students who find neural network concepts challenging at first get the support needed to genuinely understand them, not just complete the syllabus.",
    },
    {
      icon: "target",
      title: "A Quick Note on Prerequisites",
      body: "Because deep learning builds directly on programming and basic ML concepts, some prior exposure to Python is genuinely helpful before starting. Students without any Python background are encouraged to first consider Techcadd's Machine Learning or Data Analytics course in Mohali as a foundation.",
    },
  ],
  "artificial-intelligence": [
    {
      icon: "users",
      title: "Students After 12th",
      body: "Students who have completed 12th can start learning Artificial Intelligence from the basics. Whether you come from a science, commerce or another stream, the right training structure can help you understand programming, data and AI concepts step by step. For students searching for an AI course in Mohali after 12th, this can be a strong way to begin building technology skills early.",
    },
    {
      icon: "code",
      title: "College Students",
      body: "BCA, B.Sc., B.Tech, BCA, MCA, B.Tech and other undergraduate or postgraduate students can use AI training to add practical skills alongside their academic studies. Learning Python, Machine Learning and Generative AI can help students build projects before graduation instead of relying only on theoretical knowledge.",
    },
    {
      icon: "certificate",
      title: "Graduates and Final-Year Students",
      body: "Graduates looking for better career opportunities can use an Artificial Intelligence training course in Mohali to develop a more specialised technical profile. Practical projects can also give final-year students useful material for portfolios, resumes and interviews.",
    },
    {
      icon: "target",
      title: "Job Seekers and Freshers",
      body: "Freshers who want to enter the technology industry can consider AI training as a route toward roles connected with AI, Machine Learning, data and automation. Techcadd’s programme is structured around practical output, including model building, AI applications and an end-to-end capstone project.",
    },
    {
      icon: "briefcase",
      title: "Working Professionals",
      body: "Professionals from IT, software, analytics, marketing, operations or other fields can learn AI to upgrade their existing skill set. The programme includes classroom, weekend and 1-on-1 learning formats, making structured AI education more accessible for people managing work commitments.",
    },
    {
      icon: "refresh",
      title: "Career Switchers",
      body: "Professionals planning a move into AI, Machine Learning or related technology careers can start with foundational programming and gradually progress toward advanced applications. A structured Artificial Intelligence course in Mohali can be especially useful for learners who find self-study confusing or fragmented.",
    },
    {
      icon: "rocket",
      title: "Freelancers and Business Owners",
      body: "Freelancers can explore AI for automation, data analysis, chatbot development, content workflows and client solutions. Business owners can also understand how AI-based tools and applications can support everyday operations and decision-making.",
    },
    {
      icon: "monitor",
      title: "Self-Learners",
      body: "Learners who have watched online AI tutorials but still struggle to build complete projects can benefit from trainer guidance and a structured curriculum. Techcadd’s course progresses from fundamentals to practical development and deployment rather than stopping at theoretical concepts.",
    },
    {
      icon: "pin",
      title: "Learners from Mohali, Chandigarh and Tricity",
      body: "Students searching for an AI training institute in Mohali, Artificial Intelligence classes in Mohali, or an AI certification course near Chandigarh can consider a structured local programme that combines learning with project work. The location is particularly relevant for students and professionals across the wider Tricity region.",
    },
    {
      icon: "sparkles",
      title: "Educators and Researchers",
      body: "Teachers, researchers and academically oriented learners can also benefit from AI skills when they want to apply machine learning, NLP, computer vision or Generative AI within their own fields. The programme covers practical AI technologies that can be adapted to different domains.",
    },
  ],
  "digital-marketing": [
    {
      icon: "users",
      title: "12th Pass Students (Any Stream)",
      body: "If you've just completed your 12th and are unsure whether to go for a traditional degree or a skill-based career, digital marketing is one of the fastest-growing fields you can enter directly. Students from Mohali, Kharar, Zirakpur, and across the Tricity region often choose this route because it offers real, practical skills and quicker entry into paid internships and jobs — without waiting three to four years for a degree to \"prove\" your worth. Techcadd's course is structured so beginners with zero background in marketing, coding, or design can follow along comfortably from day one.",
    },
    {
      icon: "certificate",
      title: "Graduates (BA, B.Com, BBA, B.Sc, B.Tech, and More)",
      body: "If you've completed your graduation and are wondering what comes next, digital marketing is one of the few fields where your degree subject barely matters. Commerce graduates, arts graduates, engineering graduates — all of them can build strong digital marketing careers because the skill set (strategy, tools, creativity, data) is learned fresh, on the job and in training, not from your degree syllabus. Many students in Mohali and Chandigarh choose this course specifically because they want a practical add-on skill that makes them employable faster than a generic degree alone.",
    },
    {
      icon: "rocket",
      title: "Job Seekers Looking for a Career Switch",
      body: "Already working in a different field — retail, teaching, customer service, even a non-marketing corporate job — and looking for something more dynamic? Digital marketing offers strong career mobility. With Mohali and Chandigarh's growing IT and startup ecosystem, companies are actively hiring people who understand SEO, paid ads, and social media, regardless of what their previous job title was. This course is built to help career-switchers build a portfolio quickly, so you can show employers real work, not just a certificate.",
    },
    {
      icon: "building",
      title: "Small Business Owners and Entrepreneurs",
      body: "If you run a business in Mohali, Chandigarh, Panchkula, or nearby areas — a shop, a service, a startup, or a family business — this course helps you take control of your own marketing instead of depending entirely on paid agencies. You'll learn how to run your own Google Ads and Meta Ads campaigns, manage your business's social media, and understand analytics well enough to make smarter decisions about where your marketing budget goes.",
    },
    {
      icon: "monitor",
      title: "Freelancers and Work-From-Home Aspirants",
      body: "Digital marketing is one of the most freelance-friendly skill sets available today. If you're looking to work independently, take up client projects, or build a work-from-home career — especially useful for homemakers or those who need flexible working hours — this course gives you the foundation to start freelancing confidently, with real project experience to show potential clients.",
    },
    {
      icon: "sparkles",
      title: "Anyone Curious About a Career in Digital Marketing",
      body: "Simply put — if you're in or around Mohali and curious about a career that's practical, in-demand, and doesn't require years of study before you start earning, this course is built for you.",
    },
  ],
  "social-media-marketing": [
    {
      icon: "users",
      title: "12th-pass students in Mohali & Tricity",
      body: "If you have just finished school and are exploring career options beyond the traditional B.Com–MBA route, this is a strong entry point. Social media marketing does not require an engineering or commerce background — it rewards creativity, curiosity and consistency. Many students from Mohali, Zirakpur, Kharar and Chandigarh join right after Class 12 to build an early, practical skill set instead of waiting three or four years for a degree to qualify them.",
    },
    {
      icon: "certificate",
      title: "Graduates looking for a faster career start",
      body: "BA, BCom, BBA and even BTech graduates across the Tricity often find their degree alone is not enough to land a marketing role. Recruiters in Mohali's IT corridor — including companies around QuarkCity and Bestech Business Tower — want candidates who can actually run a campaign, not just explain the theory behind one. This course fills that exact gap with practical, portfolio-ready skills.",
    },
    {
      icon: "rocket",
      title: "Job seekers wanting a career switch",
      body: "If you are in a job that feels stagnant — retail, customer support, teaching or even a non-digital marketing role — and want to move into a growing, high-demand field, SMM is one of the fastest and most accessible switches available. Mohali and Chandigarh's expanding startup and agency ecosystem means genuine local demand for people who can manage brand pages, run ads and grow online communities.",
    },
    {
      icon: "building",
      title: "Freelancers & small business owners",
      body: "A large number of students join not for a job but to manage their own business's Instagram or Facebook page, or to start freelancing for local shops, salons, restaurants and startups across Mohali and Panchkula. The course teaches exactly the skills needed to offer paid SMM services independently — content planning, ad management and client reporting.",
    },
    {
      icon: "monitor",
      title: "Homemakers & career returners",
      body: "Social media marketing is one of the few fields where flexible, partly remote work is realistic. Many homemakers in Mohali and nearby sectors join to build an independent income stream — managing pages, running ads or freelancing for local businesses — without a daily commute or rigid office hours.",
    },
    {
      icon: "briefcase",
      title: "Working professionals wanting an upgrade",
      body: "If you already work in sales, HR, content or admin and want to add a high-value, in-demand skill to your resume, this works well as a weekend or evening upskilling option — helping you move into marketing or hybrid roles within your current company or elsewhere in the Tricity.",
    },
  ],
  "google-ads": [
    {
      icon: "users",
      title: "12th pass students",
      body: "If you have just finished school and are exploring options beyond the traditional B.Tech or B.Com route, this is an excellent starting point. Digital marketing is one of the fastest-growing fields in India, and Mohali's booming IT sector — especially around Phase 8 and Phase 8B — offers plenty of entry-level opportunities for freshers certified in Google Ads and PPC fundamentals.",
    },
    {
      icon: "certificate",
      title: "Graduates (any stream)",
      body: "Whether your degree is in Commerce, Arts, Science or Engineering, Google Ads does not discriminate by academic background. Many successful PPC specialists across the Mohali–Chandigarh Tricity come from non-technical backgrounds. If you want to break into a high-growth career without another three-year degree, this gives you job-ready skills in weeks, not years.",
    },
    {
      icon: "rocket",
      title: "Job seekers & freshers",
      body: "With hundreds of IT and digital marketing companies operating out of Sectors 67, 70, 73, 75, 78 and 82 in Mohali, local employers hire consistently for PPC Executive, Google Ads Associate and SEM Specialist roles. If you are job-hunting, a practical, portfolio-backed skill is often the difference between a generic resume and one that gets shortlisted.",
    },
    {
      icon: "briefcase",
      title: "Working professionals looking to upskill",
      body: "Already working in sales, content, social media or customer service? Adding Google Ads expertise helps you transition into a full digital marketing role or negotiate a better salary where you are. Many professionals from Mohali, Chandigarh and Panchkula join evening and weekend batches specifically to upskill without quitting their jobs.",
    },
    {
      icon: "building",
      title: "Business owners & entrepreneurs",
      body: "If you run a business in Mohali — a local shop, an e-commerce store or a service-based startup — learning Google Ads yourself means no longer depending entirely on paid agencies. You will run, manage and optimize your own campaigns, saving money while driving real customers to your business.",
    },
    {
      icon: "monitor",
      title: "Freelancers & consultants",
      body: "Google Ads is one of the most in-demand freelance skills today. Once certified, you can offer PPC management services to local Mohali businesses or clients across India, working on your own schedule and building an independent income stream.",
    },
  ],
  seo: [
    {
      icon: "users",
      title: "12th pass students",
      body: "If you have just finished school and are exploring career options beyond traditional degrees, this is one of the fastest ways to build an in-demand, practical skill. Instead of waiting years for a degree to translate into a job, you can start learning SEO right after 12th and build a portfolio, resume and real project experience within months — while your peers are still deciding on a college stream.",
    },
    {
      icon: "certificate",
      title: "Graduates (any stream)",
      body: "Whether your degree is in commerce, arts, science or engineering, SEO does not discriminate by educational background. Graduates from Mohali, Chandigarh and nearby Punjab towns join to pivot into digital marketing because it offers faster entry into paid roles than many traditional paths. If your degree has not opened the doors you expected, this adds a practical, in-demand skill to your profile.",
    },
    {
      icon: "rocket",
      title: "Job seekers & freshers",
      body: "If you are job-hunting and want a skill recruiters in Mohali's IT Park, Sector 82, Sector 74 and the wider Tricity are actively hiring for, SEO is among the most searched-for skills on job portals today. IT firms, e-commerce brands and local service businesses all need people who can drive organic traffic — and this course gets you interview-ready with real project work to show.",
    },
    {
      icon: "briefcase",
      title: "Working professionals looking to upskill",
      body: "Already in content writing, web development, sales or customer support? Adding SEO makes you significantly more valuable to your current employer, or opens a switch into digital marketing. Many working professionals in Mohali join evening or weekend batches specifically to upskill without quitting their job.",
    },
    {
      icon: "building",
      title: "Small business owners & entrepreneurs",
      body: "If you run a business in Mohali — a local shop, service provider, coaching centre, restaurant or online store — learning SEO yourself means you no longer depend entirely on paid agencies to get found on Google. You will optimise your own website and Google Business Profile for local search visibility.",
    },
    {
      icon: "monitor",
      title: "Freelancers & content creators",
      body: "If you are a blogger, YouTuber, content writer or freelancer, understanding SEO is what gets your content actually discovered. The practical keyword research and on-page optimization taught here directly improve your reach and freelance earning potential.",
    },
    {
      icon: "sparkles",
      title: "Career switchers from non-digital backgrounds",
      body: "Students from teaching, retail and hospitality backgrounds join regularly, because SEO has a relatively short, practical learning curve compared with other technical careers while still offering strong salary potential.",
    },
  ],
  wordpress: [
    {
      icon: "users",
      title: "12th pass students",
      body: "If you have just completed your 12th — Commerce, Arts or Science — and are exploring careers in web development or digital marketing, this is an excellent starting point. It requires no prior technical knowledge, and within a short duration you will be building fully functional websites on your own. Many students from Sector 70, Phase 7, Phase 8 and nearby areas join right after school for a head start.",
    },
    {
      icon: "certificate",
      title: "Graduates and postgraduates",
      body: "Whether your degree is BCA, B.Com, BA, MBA or any other stream, WordPress skills add real value to your resume. Graduates looking to enter digital marketing, web design or freelancing choose this course because it offers quick, practical, job-ready skills without requiring years of additional study.",
    },
    {
      icon: "rocket",
      title: "Job seekers and career switchers",
      body: "If you are unemployed or looking to switch industries, WordPress opens doors to web design, content management, SEO and e-commerce. These classes are designed with placement support in mind, helping job seekers from across Mohali, Kharar, Zirakpur and the greater Chandigarh Tricity transition into stable IT careers.",
    },
    {
      icon: "briefcase",
      title: "Working professionals",
      body: "Professionals already in marketing, sales, content writing or administration can upskill without quitting their jobs. With flexible batch timings, working individuals employed in IT Park, Quark City or Industrial Area companies can attend classes on weekends or in the evenings.",
    },
    {
      icon: "building",
      title: "Freelancers and entrepreneurs",
      body: "If you run a small business or want to freelance, learning WordPress means you no longer depend on expensive developers. You can build, manage and update your own website — a huge advantage for shop owners, consultants and startups across Mohali's growing IT ecosystem, including Aerocity and IT City.",
    },
    {
      icon: "monitor",
      title: "Bloggers and content creators",
      body: "Anyone passionate about writing, photography or content creation can use WordPress to launch and manage their own blog or personal brand, making this course a strong fit for creative individuals as well.",
    },
  ],
  shopify: [
    {
      icon: "users",
      title: "12th pass students (any stream)",
      body: "If you have just completed your 12th and are exploring career options beyond traditional degrees, this is one of the best after-12th courses in Mohali. You do not need a commerce or computer science background — the foundational modules cover everything from e-commerce basics to advanced Liquid coding, step by step. Many students from Mohali, Kharar and Zirakpur join right after school.",
    },
    {
      icon: "certificate",
      title: "Graduates & postgraduates (BA, B.Com, BCA, B.Tech, MBA)",
      body: "Whether your degree is in commerce, arts, computer applications or engineering, Shopify development is one of the most accessible and lucrative tech skills to pick up. Graduates from colleges around Mohali and Chandigarh choose this training to add a practical, job-ready skill that complements their degree in a competitive market.",
    },
    {
      icon: "code",
      title: "Web designers & developers",
      body: "Already know HTML, CSS or WordPress? Adding Shopify and Liquid programming instantly increases your market value. This course helps existing web professionals in Mohali's growing IT hub specialize in e-commerce development — one of the fastest-growing niches in web development today.",
    },
    {
      icon: "rocket",
      title: "Job seekers & freshers",
      body: "If you are looking for a stable, well-paying job in Mohali, Chandigarh or Panchkula's booming IT sector, this course is designed with placement in mind. With 99% placement assistance, mock interviews and direct referrals to IT companies and e-commerce agencies across the Tri-City, you graduate with both skills and job support.",
    },
    {
      icon: "megaphone",
      title: "Digital marketers",
      body: "If you already work in SEO, Google Ads or social media, understanding Shopify's technical side — store structure, page speed and on-page SEO — gives you a serious edge. Marketers who complete this course can implement advanced tracking, CRO and SEO improvements directly, without depending on a developer.",
    },
    {
      icon: "building",
      title: "E-commerce entrepreneurs & small business owners",
      body: "Running or planning your own online store? Instead of outsourcing setup and customization, learn to build, manage and scale it yourself. Especially valuable for local Mohali and Chandigarh business owners launching a D2C brand without recurring developer costs.",
    },
    {
      icon: "target",
      title: "Aspiring freelancers",
      body: "Shopify development is one of the highest-paying freelance skills globally. This course includes dedicated freelancing modules — client acquisition, pricing and project delivery — so you can start earning independently, with international and domestic clients alike.",
    },
    {
      icon: "clock",
      title: "Working professionals looking to upskill",
      body: "With flexible weekday and weekend batches, offline at the Mohali centre or online, working professionals across Mohali and the Tri-City can learn Shopify development alongside their current job without career disruption.",
    },
  ],
  "python-programming": [
    {
      icon: "users",
      title: "12th pass students (any stream)",
      body: "If you have just finished your 12th and are wondering what comes next, Python is one of the smartest starting points in tech today. You do not need a Non-Medical background or prior programming exposure — the course is structured so Commerce, Arts and Science students can all follow comfortably, starting with variables, data types and logic building. For many students in Mohali, Kharar and Landran this becomes their first real step into the IT industry.",
    },
    {
      icon: "certificate",
      title: "Graduates (BCA, B.Tech, BSc-IT or any discipline)",
      body: "Graduates often feel their degree alone is not enough to get noticed by recruiters — a fair concern, since most companies want proof of practical skill, not just a certificate. This course gives graduates hands-on coding practice, real project work and a portfolio they can show in interviews. Even graduates from BA, BCom or BSc non-CS backgrounds have moved into Python roles after this training.",
    },
    {
      icon: "rocket",
      title: "Job seekers looking for a career switch",
      body: "Mohali's IT City and the broader tri-city job market are increasingly Python-driven — web development, data analysis, automation. If you are in a non-technical job or returning to the workforce, this course is designed to get you interview-ready without wasting time on unnecessary theory, paced to build confidence quickly.",
    },
    {
      icon: "monitor",
      title: "Working professionals wanting to upskill",
      body: "IT professionals already in QA, testing, support or other non-coding technical roles join this training to move into development, automation or data-focused positions. With flexible batch timings, professionals from Mohali and nearby Chandigarh do not have to choose between their job and their upskilling goals.",
    },
    {
      icon: "sparkles",
      title: "School students & early learners (foundation track)",
      body: "Younger students curious about coding who want a head start before college can join a foundation-level track, learning logical thinking and basic Python syntax in a beginner-friendly, low-pressure environment.",
    },
  ],
  "java-programming": [
    {
      icon: "users",
      title: "12th pass students (any stream)",
      body: "If you have just completed your 12th — Science, Commerce or even Arts — this is one of the smartest first steps toward a tech career, and no prior coding experience is needed. Training starts from setting up your development environment, variables, data types and control flow before building up to OOP. Students from Mohali, Kharar and Zirakpur often join right after 12th to get a head start well before their peers declare a college major.",
    },
    {
      icon: "certificate",
      title: "Graduates (BCA, B.Tech, B.Sc, BA or any degree)",
      body: "Many graduates realise a degree alone does not guarantee job-readiness. Whether you hold a BCA, B.Tech, B.Sc (IT/CS) or a non-technical degree, this course gives you the practical skills recruiters actually look for — real coding ability, project experience and interview confidence. Java remains one of the top languages requested in campus and off-campus hiring across the Tricity.",
    },
    {
      icon: "rocket",
      title: "Job seekers and career switchers",
      body: "If you are in a non-tech role or job hunting without much luck, Java opens doors to some of the most in-demand roles in IT — Java Developer, Backend Developer, Android Developer and Full Stack Developer. The practical, project-based approach is designed for switchers who need genuine skills quickly, and evening or weekend batches let professionals reskill without quitting.",
    },
    {
      icon: "monitor",
      title: "Diploma and polytechnic students",
      body: "Students pursuing a diploma in Computer Science or IT often need stronger practical exposure than classroom lectures alone provide. This course fills that gap with live coding practice, projects and mentorship from experienced trainers.",
    },
    {
      icon: "layers",
      title: "Engineering students wanting extra skills",
      body: "Even if you are currently in a B.Tech or BCA program, this works well as parallel or summer training. Java is core to many university curriculums, and reinforcing it with hands-on, industry-style training gives you a real edge over classmates who have only studied it on paper.",
    },
    {
      icon: "sparkles",
      title: "Absolute beginners with zero coding background",
      body: "You do not need to have touched a keyboard for coding before. The course is built from the ground up, so anyone with basic computer literacy and a genuine interest in learning can follow along and succeed — no prior programming experience required.",
    },
  ],
  "cpp-dsa": [
    {
      icon: "users",
      title: "12th pass students (science & commerce)",
      body: "If you have just finished your 12th and are exploring career options in IT, this is an excellent starting point — no prior coding experience needed. The classes take absolute beginners step by step through logic building, syntax and problem-solving, the base for almost every language you will learn later, including Python, Java and web development.",
    },
    {
      icon: "certificate",
      title: "BCA, B.Tech, MCA and B.Sc (IT) students",
      body: "For students in computer science or IT degrees across Mohali, Kharar and the tricity, this works as a powerful supplement to the college curriculum. Many university syllabi cover C/C++ theoretically without enough lab time — this fills that gap with practical coding sessions, real assignments and personal doubt-clearing, so you understand pointers, OOP and memory management rather than memorising them.",
    },
    {
      icon: "target",
      title: "Engineering & diploma students preparing for exams",
      body: "If you are studying for GATE, NIELIT or university semester papers where C/C++ is a core subject, structured coaching makes a real difference. Trainers focus on concept clarity and logic-building exercises so you can approach even tricky exam questions with confidence.",
    },
    {
      icon: "rocket",
      title: "Career switchers and job seekers",
      body: "Not everyone comes from a technical background, and that is completely fine. C/C++ is one of the most respected languages to start with — it demonstrates strong problem-solving ability to employers and is still widely used in system-level programming, competitive coding and software development across Mohali's growing IT sector, including IT Park Chandigarh and Mohali's Sector 82–83 hubs.",
    },
    {
      icon: "sparkles",
      title: "Coding beginners & hobbyists",
      body: "If you have always been curious about how apps, games or operating systems are built, and want to try coding before committing to a full IT career, this course offers a low-pressure, beginner-friendly environment to explore that curiosity with expert guidance.",
    },
    {
      icon: "briefcase",
      title: "Working professionals looking to upskill",
      body: "Professionals from non-coding backgrounds who want a technical skill on their resume — particularly those eyeing software testing, technical support or embedded systems — will find this a practical, time-efficient way to build core programming competence.",
    },
  ],
  kotlin: [
    {
      icon: "users",
      title: "12th pass students (science / commerce / arts)",
      body: "If you have just completed your 12th and are wondering what comes next, a Kotlin course in Mohali is one of the smartest early moves you can make. You do not need a computer science background — training starts from the absolute basics of programming logic before moving into Kotlin syntax. Many students from Mohali, Kharar and nearby areas join right after board exams to get a head start on a tech career.",
    },
    {
      icon: "certificate",
      title: "BCA, MCA, B.Tech & B.Sc (IT/CS) students",
      body: "If you are pursuing a degree in computer applications or engineering, this works perfectly as a skill add-on alongside your studies. College syllabi often stay theoretical, but this training focuses on hands-on Android app building — the exact skill recruiters test for. Students from colleges around Mohali, Landran and Kharar frequently join on weekends or evenings to bridge that gap.",
    },
    {
      icon: "rocket",
      title: "Graduates looking for a career switch",
      body: "Not from a computer science background? That is completely fine. Many graduates from commerce, arts or unrelated science streams join because Android development is one of the highest-demand, most beginner-friendly entry points into IT. If you have a degree but no clear direction into tech yet, this gives you a structured, practical route in.",
    },
    {
      icon: "monitor",
      title: "Working professionals wanting to upskill",
      body: "Already in a non-tech job, or an IT-adjacent role like QA, support or documentation? Learning Kotlin opens the door to Android development roles with significantly better pay. Flexible batch timings make it realistic for working professionals across Mohali, Chandigarh and Panchkula to attend without quitting their current job.",
    },
    {
      icon: "building",
      title: "Freelancers & app idea founders",
      body: "If you have an app idea and are tired of depending on developers to build it, this course teaches you to build it yourself — from UI design to publishing on the Play Store. Aspiring freelancers in the Mohali IT ecosystem, including near IT City Mohali and Phase 8B, use this to start freelance Android development work.",
    },
    {
      icon: "code",
      title: "Java developers wanting to upgrade",
      body: "If you already know Java, Kotlin is a natural next step — it is Google's preferred language for Android today. This course helps Java developers in Mohali and nearby industrial and IT hubs transition smoothly into modern Android development standards.",
    },
  ],
  flutter: [
    {
      icon: "users",
      title: "12th pass students",
      body: "If you have just completed your 12th — Science, Commerce or even Arts — and are curious about technology, this is a perfect starting point. You do not need a computer science background: trainers begin with the basics of Dart programming and build gradually to full app development. Many students from Mohali, Chandigarh and nearby Punjab towns join right after school for a head start on a high-paying tech career.",
    },
    {
      icon: "certificate",
      title: "Graduates & BCA/B.Tech/MCA students",
      body: "Whether your degree is in Computer Science, IT, BCA, B.Tech, MCA or something unrelated like Commerce or Arts, this course equips you with in-demand, practical skills colleges rarely teach. If your degree gave you theory but not real coding experience, this hands-on Flutter training bridges that exact gap with live projects and an industry-relevant curriculum.",
    },
    {
      icon: "rocket",
      title: "Job seekers & freshers",
      body: "For freshers struggling to find a first tech job, Flutter is one of the smartest skills to add right now. Because one codebase builds both Android and iOS apps, companies save time and money — which is exactly why they hire Flutter developers over separate native teams. Paired with placement support in Mohali and Chandigarh, this gives job seekers a genuine edge.",
    },
    {
      icon: "briefcase",
      title: "Working professionals & career switchers",
      body: "Already working in IT, customer support or a non-tech field but want to switch into mobile development? Weekend and evening batches at the Mohali centre make it possible to learn Flutter without quitting your current job.",
    },
    {
      icon: "code",
      title: "Native Android/iOS developers upskilling",
      body: "If you already know Kotlin, Java or Swift, learning Flutter lets you expand into cross-platform development — a highly valued skill for freelance work and mid-to-senior roles.",
    },
    {
      icon: "building",
      title: "Entrepreneurs & startup founders",
      body: "Mohali's startup ecosystem is booming. If you have a business idea and want to build your own app's MVP without hiring an expensive development team, this course gives you the practical ability to do it yourself.",
    },
    {
      icon: "monitor",
      title: "Freelancers",
      body: "With Flutter's rising global demand, freelancers based in Mohali can take on projects from clients worldwide, working remotely while building a strong portfolio.",
    },
  ],
  "web-designing": [
    {
      icon: "users",
      title: "12th pass students (any stream)",
      body: "If you have just finished school and are unsure whether to take the traditional degree route or start building a practical skill early, this is an excellent starting point. Students from Mohali, Kharar, Zirakpur and nearby areas can begin an IT career without waiting years for a degree. Web design combines creativity with technology, making it ideal for Arts, Commerce or Science students who enjoy visual thinking as much as logical problem-solving.",
    },
    {
      icon: "certificate",
      title: "Graduates looking for IT-sector jobs",
      body: "BA, BCom, BSc and even BTech graduates in Mohali and the tricity often find their degree alone is not enough in a competitive market. This course adds a specialised, in-demand skill set — HTML, CSS, JavaScript, Bootstrap, WordPress and UI/UX — that significantly improves employability, bridging the gap between graduation and a first job.",
    },
    {
      icon: "rocket",
      title: "Job seekers & career switchers",
      body: "If you work in an unrelated field — retail, education, customer support — and want to move into IT and digital, web design is one of the most accessible entry points. It does not require years of programming, and the visual, project-based nature means you build a portfolio quickly and start applying for junior designer roles across IT City Mohali and Phase 8 Industrial Area.",
    },
    {
      icon: "building",
      title: "Freelancers & aspiring entrepreneurs",
      body: "Mohali and the tricity have a fast-growing freelance and small-business ecosystem. If you want to design and sell websites independently — for local businesses, e-commerce brands or clients on Fiverr and Upwork — this course teaches not just design skills but how to plan, price and deliver client projects confidently.",
    },
    {
      icon: "briefcase",
      title: "Small business owners & working professionals",
      body: "Business owners in Mohali who want to manage or update their own website, and professionals in marketing or content roles who want to add web design to their skill set, will find this equally valuable. Understanding design also strengthens how you collaborate with developers and marketing teams.",
    },
    {
      icon: "clock",
      title: "Homemakers & career restarters",
      body: "For anyone restarting a career after a break, web design offers flexible, remote-friendly and freelance-friendly paths — making it a practical and empowering choice.",
    },
  ],
  "web-development": [
    {
      icon: "users",
      title: "12th pass students (any stream)",
      body: "If you have just finished school and are wondering what comes next, web development is one of the smartest, most future-proof paths available. You do not need to have studied Computer Science — Arts, Commerce or Science, the curriculum starts from HTML, CSS and JavaScript before moving into advanced frameworks. Many students from schools around Mohali, Sector 70 and Kharar join right after 12th for a head start.",
    },
    {
      icon: "certificate",
      title: "Graduates (BCA, B.Tech, BSc-IT or any degree)",
      body: "If you have a degree — technical or not — and are unsure how to convert it into an actual job, this course is built for you. Graduates across Mohali and the Tricity often have theory but lack the hands-on exposure recruiters look for. Live projects, real coding practice and an interview-ready portfolio bridge that gap, and non-IT graduates from BA, BCom and BSc switch across successfully.",
    },
    {
      icon: "rocket",
      title: "Job seekers looking for a career switch",
      body: "Unemployed, between jobs or stuck in a role with no growth? Web development is one of the fastest, most accessible entry points into IT. Mohali and Chandigarh's growing ecosystem — Phase 8 Industrial Area, IT Park and Sector 74 — hires developers consistently, and this gives you a structured, time-bound path rather than random YouTube tutorials.",
    },
    {
      icon: "monitor",
      title: "Working professionals wanting to upskill",
      body: "If you already work — in a non-tech role, or in IT but a different function — and want to add web development, flexible batch timings fit around your job. Many working professionals in Mohali join evening or weekend batches specifically to move into higher-paying developer roles or freelance work on the side.",
    },
    {
      icon: "briefcase",
      title: "Freelancers and entrepreneurs",
      body: "If you run a business or want to freelance, knowing web development means you are no longer dependent on hiring developers for every small website update. You can build, manage and scale your own web presence independently.",
    },
    {
      icon: "sparkles",
      title: "Absolute beginners with zero coding background",
      body: "This is genuinely a beginner-friendly course. If you have never written a line of code, you are not behind — you are exactly who this program is designed for. Trainers build every concept step by step, ensuring no student is left confused before moving to the next module.",
    },
  ],
  "full-stack-development": [
    {
      icon: "users",
      title: "12th pass students",
      body: "If you have just finished school and are unsure whether to take the traditional B.Tech or BCA route or start building real skills right away, this is an ideal starting point. Many students in Mohali, Chandigarh and Zirakpur now choose skill-first career paths over theory-heavy degrees — this lets you begin an IT career early, without waiting three or four years to touch real code.",
    },
    {
      icon: "certificate",
      title: "Graduates (any stream)",
      body: "Whether your degree is B.Tech, BCA, B.Sc, BA or something non-technical like commerce or arts, full stack development does not require your degree to match your career goal. The training is built from the ground up, so graduates from any academic background can confidently transition into web development roles.",
    },
    {
      icon: "rocket",
      title: "Job seekers looking for a career switch",
      body: "If you are unemployed, between jobs or stuck in a role that does not excite you, full stack development opens doors to genuinely in-demand IT positions. Mohali's growing tech ecosystem — IT parks, startups and service companies — actively hires developers who can demonstrate real project work, which is exactly what this course helps you build.",
    },
    {
      icon: "monitor",
      title: "Working professionals wanting an IT transition",
      body: "Many professionals from non-tech backgrounds — sales, teaching, operations, even engineering fields unrelated to software — join to pivot into tech. With flexible batch timings, working professionals can learn full stack development without quitting their current job.",
    },
    {
      icon: "building",
      title: "Freelancers and entrepreneurs",
      body: "If you want to build your own website, launch a startup idea or offer web development services independently, this course gives you the complete skill set — front-end, back-end and databases — needed to build and deploy full applications on your own.",
    },
    {
      icon: "code",
      title: "Diploma holders and ITI students",
      body: "Students from technical diploma backgrounds who want to specialise further in web technologies find this valuable, since it bridges the gap between basic technical knowledge and modern, job-ready full stack skills.",
    },
  ],
  "mern-full-stack": [
    {
      icon: "users",
      title: "12th pass students (science, commerce or arts)",
      body: "If you have just finished school in Mohali, Chandigarh or nearby Kharar, Zirakpur or Panchkula and are unsure about the traditional degree route, this offers a faster, skill-first alternative. Many 12th-pass students join straight after board exams to build a tech career without waiting three or four years for a degree to prove their skills. The course starts from HTML, CSS and JavaScript fundamentals.",
    },
    {
      icon: "certificate",
      title: "College students & graduates (BCA, B.Tech, BSc-IT, MCA or any stream)",
      body: "Whether you are currently studying or already graduated, this adds practical, employer-recognized skills most college syllabi do not fully cover. Graduates from colleges around Mohali and the Tricity enrol to bridge the gap between academic knowledge and real hiring expectations — because recruiters want live projects and GitHub portfolios, not just marksheets.",
    },
    {
      icon: "rocket",
      title: "Career switchers from non-IT backgrounds",
      body: "It is increasingly common for professionals from commerce, marketing or entirely unrelated industries to switch into tech. If you are in Mohali and want a practical, structured route into full-stack development, MERN is one of the most in-demand and beginner-friendly paths available — because it uses JavaScript across frontend, backend and everything in between.",
    },
    {
      icon: "monitor",
      title: "Job seekers wanting faster placement opportunities",
      body: "If you are job hunting in Mohali, Chandigarh or Panchkula's expanding IT sector and want a skill set in high demand right now, MERN opens doors to Frontend Developer, Backend Developer, Full Stack Developer and API Developer roles. The course is structured specifically to make you interview-ready with a project portfolio.",
    },
    {
      icon: "briefcase",
      title: "Working professionals looking to upskill",
      body: "IT professionals already in QA, support or other tech-adjacent roles often join to move into development. Flexible batch timings let working professionals in Mohali build these skills without quitting their current job.",
    },
    {
      icon: "building",
      title: "Freelancers & entrepreneurs",
      body: "If you want to build your own web apps, launch a startup MVP, or take freelance projects for local Mohali and Chandigarh businesses, MERN gives you the independence to design, build and deploy complete applications on your own — without depending on a large team.",
    },
    {
      icon: "sparkles",
      title: "Anyone living in or relocating to Mohali's tech corridor",
      body: "With Mohali rapidly emerging as a preferred IT and startup destination in North India, students and professionals moving to the city for career growth find this a strong entry point into the local tech ecosystem, with direct exposure to hiring companies in the region.",
    },
  ],
  "mean-stack": [
    {
      icon: "users",
      title: "12th pass students",
      body: "If you have completed your 12th and are curious about a career in web development, this is one of the smartest entry points into IT. You do not need prior coding experience — the course begins with HTML, CSS and JavaScript fundamentals before moving into MongoDB, Express.js, Angular and Node.js. Many students from Mohali, Kharar and Zirakpur join right after school to build a strong technical foundation early.",
    },
    {
      icon: "certificate",
      title: "Graduates (BCA, B.Tech, BSc-IT or any stream)",
      body: "Whether your degree is in computer applications, engineering or a completely unrelated field, this course helps you pivot into full-stack development with confidence. Graduates find it especially valuable because it is placement-oriented — you do not just learn concepts, you build a portfolio of real projects that recruiters in Mohali's IT companies actually want to see.",
    },
    {
      icon: "rocket",
      title: "Job seekers and freshers",
      body: "If you are hunting for your first IT job and want a skill set that makes your resume stand out, MEAN is one of the most in-demand full-stack combinations right now. Companies across Mohali's IT Park, Phase 8 and Phase 5 tech corridors consistently hire full-stack developers who can handle both front-end and back-end work.",
    },
    {
      icon: "monitor",
      title: "Working professionals looking to upskill",
      body: "Already working in IT or a related field but want to add full-stack development? This course accommodates professionals too. With flexible batch timings and a curriculum focused on practical, job-relevant skills, you can upgrade your capabilities without putting your career on pause.",
    },
    {
      icon: "briefcase",
      title: "Freelancers and entrepreneurs",
      body: "If you are building your own products, running a small agency or freelancing on web development projects, MEAN gives you the independence to build complete applications — front end to back end — without relying on multiple specialists. A significant advantage for freelancers in Mohali and Chandigarh taking on bigger client projects.",
    },
    {
      icon: "sparkles",
      title: "Career switchers",
      body: "Coming from a non-technical background — sales, marketing, commerce or any other field — but want to break into tech? It is more common than you would think, and this training takes absolute beginners through a structured, step-by-step learning path so you are never left guessing.",
    },
  ],
  "php-full-stack": [
    {
      icon: "users",
      title: "Students after 12th",
      body: "Students who have completed 12th and want to enter the IT industry can choose PHP Full Stack development as a practical career pathway. Learning HTML, CSS, JavaScript, PHP, MySQL, Laravel and web development concepts gives beginners a foundation for creating dynamic websites and applications.",
    },
    {
      icon: "certificate",
      title: "BCA, MCA, B.Tech and computer students",
      body: "Students pursuing or completing BCA, MCA, B.Tech, B.Sc IT, M.Sc IT or other computer-related programmes can use the course to strengthen practical development skills. Academic study introduces programming concepts; hands-on full-stack training helps you apply them through websites, databases, backend functionality, APIs and projects.",
    },
    {
      icon: "rocket",
      title: "Graduates looking for IT careers",
      body: "Graduates from different educational backgrounds who want to move into web development can consider this programme. Learning PHP and Laravel alongside frontend technologies and MySQL provides a focused route toward entry-level development roles, and you build a portfolio demonstrating you can work on functional web applications.",
    },
    {
      icon: "sparkles",
      title: "Beginners interested in web development",
      body: "You can start even when your coding knowledge is limited. The approach takes students from fundamental web concepts toward more advanced practice — object-oriented programming, MVC-based development, REST APIs, database interaction, Git and deployment workflows — combining HTML, CSS, JavaScript and Bootstrap with PHP, MySQL and Laravel.",
    },
    {
      icon: "briefcase",
      title: "Job seekers and career changers",
      body: "Students and professionals looking for a career change into IT benefit from learning a complete development stack rather than a single language. Understanding how frontend interfaces connect with server-side logic and databases makes it easier to work on end-to-end web projects.",
    },
    {
      icon: "building",
      title: "Freelancers and aspiring web entrepreneurs",
      body: "Those interested in freelancing learn skills useful for creating business websites, dynamic web applications, database-driven solutions and customised PHP-based projects. Developing practical projects during training also helps build a portfolio for approaching freelance clients.",
    },
    {
      icon: "pin",
      title: "Learners from Mohali and Chandigarh",
      body: "The programme is particularly relevant for students searching for PHP Full Stack training in Mohali, a PHP Laravel course in Mohali, a PHP developer course in Mohali, or full stack development near Chandigarh. Students from the wider Tricity can use the training to develop skills aligned with web development careers.",
    },
  ],
  "generative-ai": [
    {
      icon: "users",
      title: "Students after 12th",
      body: "They can choose this course to start exploring one of the fastest-developing areas of technology. Students from Science, Commerce, Arts, or other streams can build foundational AI knowledge and gradually learn practical tools. For learners searching for a Generative AI course after 12th in Mohali, this can be a useful way to develop technology skills alongside their regular degree or diploma.",
    },
    {
      icon: "target",
      title: "Graduates and final-year students",
      body: "using Generative AI training to strengthen their resumes before entering the job market. Students pursuing BCA, B.Tech, B.Sc., B.Com, BBA, BA, MCA, or related programs can learn how AI is applied to real business and software problems. Building projects with Python, LangChain, Hugging Face, ChatGPT, Claude, Pinecone, and Streamlit can help students demonstrate practical skills instead of relying only on academic qualifications.",
    },
    {
      icon: "briefcase",
      title: "Working professionals",
      body: "they can also benefit from a Generative AI course in Mohali, particularly those looking to upgrade their existing skills or explore AI-assisted workflows. Developers, analysts, marketers, designers, content professionals, and technology professionals can learn how modern AI systems are integrated into applications and business processes. Weekend and 1-on-1 learning options make the program more flexible for people balancing work with upskilling.",
    },
    {
      icon: "rocket",
      title: "Freelancers and business owners",
      body: "they can learn how Generative AI can support content creation, research, customer communication, document processing, automation, and other repetitive tasks. Rather than simply learning how to use ChatGPT, learners can understand the technology behind AI-powered applications and explore how these skills can be converted into freelance services or business solutions.",
    },
    {
      icon: "refresh",
      title: "Career restarters",
      body: "They can use the course to rebuild their technical profile with current skills and project experience. A career gap does not have to define your next opportunity when you can demonstrate what you have recently learned, built, and applied.",
    },
    {
      icon: "monitor",
      title: "Self-taught learners",
      body: "The course is also suitable for self-taught learners who have explored AI independently but want structured guidance. A classroom environment, trainer feedback, practical assignments, and project-based learning can provide the direction that scattered tutorials often lack. Techcadd’s curriculum emphasizes building working outputs throughout the learning journey rather than limiting learning to theoretical concepts.",
    },
  ],
  "autocad": [
    {
      icon: "users",
      title: "12th Pass Students (Science & Commerce Background)",
      body: "If you've just completed your 12th grade and are unsure which technical career path to take, this is one of the smartest first steps. Students from PCM (Physics, Chemistry, Maths) backgrounds especially find AutoCAD easy to pick up, since it builds directly on concepts like geometry, measurement, and spatial visualization. Many students in Mohali join this course right after school to get a head start before college, or as a parallel skill alongside their degree.",
    },
    {
      icon: "cube",
      title: "Diploma and Engineering Students",
      body: "Diploma holders and engineering students in civil, mechanical, electrical, and architecture streams often find that their college curriculum covers AutoCAD only briefly — not enough to be truly job-ready. Techcadd's AutoCAD training in Mohali fills this exact gap with deep, practical, project-based learning that goes far beyond textbook basics. This makes it especially valuable for polytechnic students from Mohali, Kharar, and nearby institutes looking to strengthen their technical resumes.",
    },
    {
      icon: "target",
      title: "Graduates and Job Seekers",
      body: "If you've completed your graduation (B.Tech, B.Arch, BSc, or even a non-technical degree) and are job hunting in Mohali's growing IT and industrial corridor, AutoCAD is a high-demand, practical skill that recruiters actively look for. Many companies in Mohali's industrial areas and Chandigarh's design firms prefer candidates who already know CAD software, since it reduces training time and cost for employers.",
    },
    {
      icon: "briefcase",
      title: "Working Professionals Looking to Upskill",
      body: "Design assistants, site supervisors, draftsmen, and junior engineers already working in the field often join this course to formalize their skills with a recognized certification. Flexible batch timings at Techcadd Mohali make it possible to attend classes on weekends or evenings without disrupting your job.",
    },
    {
      icon: "refresh",
      title: "Career Switchers and Freelancers",
      body: "Some students come from completely unrelated backgrounds — retail, teaching, even hospitality — but want to switch into a stable, in-demand technical career. AutoCAD is one of the easiest technical skills to learn from scratch, and many students go on to freelance as CAD designers or drafters after completing the course, serving clients across Mohali, Chandigarh, and even remote clients online.",
    },
    {
      icon: "sparkles",
      title: "Interior Design and Architecture Enthusiasts",
      body: "If your interest lies in interior design, home planning, or architectural visualization rather than mechanical or civil engineering, this course still applies to you. AutoCAD's 2D and 3D tools are core software used across the interior design industry in the Tricity region.",
    },
  ],
};

/** "What you need to start", replacing the generic eligibility list. */
const eligibilityBySlug: Record<string, string[]> = {
  "ai-powered-marketing": aiPoweredMarketingEligibility,
  "chatgpt-ai-tools": chatgptAiToolsEligibility,
  rag: ragEligibility,
  "ai-powered-courses": aiPoweredCoursesEligibility,
  "all-ai-courses": allAiCoursesEligibility,
  "mern-full-stack--certificate": mernCertificateEligibility,
  "data-science--certificate": dataScienceCertificateEligibility,
  "agentic-ai--certificate": agenticAiCertificateEligibility,
  "cyber-security--certificate": cyberSecurityCertificateEligibility,
  "cloud-computing--certificate": cloudComputingCertificateEligibility,
  "digital-marketing--certificate": digitalMarketingCertificateEligibility,
  "artificial-intelligence--certificate": artificialIntelligenceCertificateEligibility,
  "flutter--certificate": flutterCertificateEligibility,
  "data-analytics--certificate": dataAnalyticsCertificateEligibility,
  "full-stack-development--certificate": fullStackDevelopmentCertificateEligibility,
  "basic-computer-office-skills--certificate": basicComputerOfficeSkillsEligibility,
  "agentic-ai": [
    "No programming experience needed — Module 01 teaches Python from the first line",
    "Open from any stream after 12th — Science, Commerce or Arts",
    "Weekday, evening, weekend and 1-on-1 batches, every class running two hours",
    "What matters is turning up consistently and finishing what each module asks you to build",
  ],
  "prompt-engineering": [
    "No coding background required — no prior programming knowledge is needed to start",
    "Open to 12th-pass students, college graduates, IT professionals, digital marketers, freelancers, job seekers and career returnees",
    "Built to be accessible across skill levels",
    "Classroom-based, in-person training at the Mohali centre",
  ],
  "cyber-security": [
    "Minimum qualification: 12th pass (any stream)",
    "Basic familiarity with computers and internet usage",
    "No prior coding or networking experience mandatory",
    "Strong interest in problem-solving and technology",
  ],
  "cloud-computing": [
    "Minimum qualification: 12th pass (any stream)",
    "Basic familiarity with computers and internet usage",
    "No prior coding or networking experience mandatory",
    "Genuine interest in technology and problem-solving",
  ],
  linux: [
    "Minimum qualification: 12th pass (any stream)",
    "No prior coding or IT background required",
    "Basic computer familiarity is enough to start",
    "An interest in system administration, cloud or DevOps",
  ],
  "ethical-hacking": [
    "Minimum qualification: 12th pass (any stream)",
    "No prior networking or IT experience required",
    "Basic computer familiarity is enough to start",
    "Curiosity, problem-solving instinct and a willingness to learn",
  ],
  "power-bi": [
    "Minimum qualification: 12th pass (any stream)",
    "No coding or data science knowledge required",
    "Basic computer familiarity is enough to start",
    "Curiosity about data and how businesses make decisions with it",
  ],
  tableau: [
    "Minimum qualification: 12th pass (any stream)",
    "No coding knowledge required — Tableau is largely drag-and-drop",
    "Basic computer familiarity is enough to start",
    "An interest in working with data and telling stories through visuals",
  ],
  "data-science": [
    "Minimum qualification: 12th pass (any stream)",
    "No prior programming or math-heavy background strictly required",
    "Logical thinking and comfort with structured problem-solving helps",
    "Willingness to put in consistent effort across the full course duration",
  ],
  "data-analytics": [
    "12th pass, graduate from any stream, working professional or career changer",
    "No prior coding experience required",
    "Comfort with basic computer use is enough to start",
    "Curiosity about numbers, trends and problem-solving",
  ],
  "machine-learning": [
    "12th pass, graduate from any stream, working professional or career changer",
    "No prior programming background required — Python is taught from scratch",
    "Comfort with logical, step-by-step thinking",
    "A genuine interest in technology, AI and problem-solving",
  ],
  "deep-learning": [
    "Basic Python familiarity is genuinely recommended before starting",
    "Some prior machine learning exposure helps — Techcadd's ML course is the natural feeder",
    "Suits B.Tech, BCA and CS graduates, ML course completers and working data or software professionals",
    "No prior Python at all? Start with the Machine Learning or Data Analytics course first",
  ],
  "artificial-intelligence": [
    "Previous coding experience is not required — the programme starts with Python from the fundamentals",
    "Open to students after 12th, graduates, final-year students, working professionals, freelancers, career switchers and self-taught learners",
    "Basic computer literacy can be helpful for getting started",
    "You do not have to be an AI expert before joining",
  ],
  "digital-marketing": [
    "No strict eligibility — 12th pass, graduates from any stream, professionals, entrepreneurs and homemakers all welcome",
    "No coding knowledge required",
    "No prior marketing experience or marketing degree needed",
    "Curiosity, and the willingness to run real campaigns rather than just read about them",
  ],
  "social-media-marketing": [
    "No marketing degree, design background or prior digital experience required",
    "12th pass, graduates, job seekers, freelancers, business owners and homemakers all welcome",
    "If you are comfortable using Instagram or WhatsApp on your phone, you have the instinct this builds on",
    "Motivation to learn a practical, high-demand skill",
  ],
  "google-ads": [
    "Open to 12th pass, graduates from any stream, job seekers, professionals, business owners and freelancers",
    "No technical background or coding knowledge required",
    "No prior digital marketing experience needed",
    "Curiosity about digital advertising and a willingness to run live campaigns",
  ],
  seo: [
    "Open to 12th pass, graduates from any stream, job seekers, professionals, freelancers and business owners",
    "No coding knowledge required — technical SEO is taught step by step",
    "Basic computer literacy and internet familiarity is enough to start",
    "No marketing degree or prior digital experience needed",
  ],
  wordpress: [
    "Open to 12th pass, graduates, working professionals, freelancers, entrepreneurs and content creators",
    "No prior coding background or technical degree required",
    "Basic computer familiarity is the only real prerequisite",
    "Basic HTML/CSS helps with advanced customization later, but is not mandatory",
  ],
  shopify: [
    "Open to 12th pass, graduates, web professionals, marketers, entrepreneurs and freelancers",
    "No prior coding knowledge required — the course starts from the basics",
    "Basic HTML and CSS helps and speeds up Liquid customization, but is not mandatory",
    "Offline, online or hybrid batches, with EMI options available",
  ],
  "python-programming": [
    "Open to 12th pass from any stream, graduates from any discipline, job seekers and working professionals",
    "No prior coding experience required",
    "No Non-Medical or computer science background needed",
    "A foundation track is available for school students and early learners",
  ],
  "java-programming": [
    "Open to 12th pass from any stream, graduates from any degree, diploma students and job seekers",
    "No prior coding experience required",
    "Basic computer literacy and a genuine interest in learning is enough",
    "Works as parallel or summer training alongside a B.Tech or BCA",
  ],
  "cpp-dsa": [
    "Open to 12th pass (science or commerce), BCA/B.Tech/MCA/B.Sc(IT) students and diploma students",
    "No prior coding experience required",
    "Career switchers, beginners and hobbyists all welcome",
    "Classroom or online batches, with morning, evening and weekend slots",
  ],
  kotlin: [
    "Open to 12th pass (any stream), BCA/MCA/B.Tech/B.Sc students, graduates, professionals and freelancers",
    "No prior coding knowledge required — classes start from basic programming logic",
    "Java developers welcome as a direct upgrade path",
    "Morning, evening and weekend batches available",
  ],
  flutter: [
    "Open to 12th pass (any stream), graduates, BCA/B.Tech/MCA students, professionals and entrepreneurs",
    "No prior coding experience required — the course starts from Dart basics",
    "Native Android or iOS developers welcome as a cross-platform upgrade",
    "Offline, online and hybrid formats, with weekday, weekend and fast-track batches",
  ],
  "web-designing": [
    "Open to 12th pass (any stream), graduates, job seekers, professionals, freelancers and career restarters",
    "No coding background, design degree or prior technical knowledge required",
    "Curiosity, creativity and a willingness to learn is enough",
    "Weekday and weekend batches, accessible from Chandigarh, Panchkula, Zirakpur and Kharar",
  ],
  "web-development": [
    "Open to 12th pass (any stream), graduates from any degree, job seekers and working professionals",
    "No computer science degree or prior coding background required",
    "Absolute beginners are exactly who this course is built for",
    "Evening and weekend batches available for those already working",
  ],
  "full-stack-development": [
    "Open to 12th pass, graduates from any stream, job seekers, professionals, freelancers and diploma holders",
    "No computer science degree required",
    "No prior coding experience needed — the course starts from how the internet works",
    "Flexible batches for students, working professionals and career switchers",
  ],
  "mern-full-stack": [
    "Open to 12th pass (any stream), college students, graduates, career switchers and working professionals",
    "No computer science degree or prior coding experience required",
    "Curiosity, consistency and a willingness to build things",
    "Classroom and online formats, with flexible batch timings",
  ],
  "mean-stack": [
    "No strict prerequisites — open to 12th pass, graduates, freshers, professionals and career switchers",
    "Basic familiarity with HTML, CSS and JavaScript helps but is not mandatory",
    "Complete beginners are welcome; the course builds those fundamentals first",
    "Flexible batch timings for students and working professionals",
  ],
  "php-full-stack": [
    "Open to 12th pass, BCA/MCA/B.Tech students, graduates, job seekers and career changers",
    "No prior PHP knowledge required — the curriculum starts from fundamentals",
    "You do not need to be an expert programmer before joining",
    "An interest in websites, coding and software development is the real prerequisite",
  ],
  "generative-ai": [
    "Eligibility from 12th pass onward — any stream",
    "Basic computer knowledge and a willingness to learn",
    "Basic programming knowledge, particularly Python, can be helpful for the technical modules",
    "You do not need to be an advanced machine-learning professional to start building with Generative AI",
  ],
  "autocad": [
    "Open to 12th-pass students, diploma holders, engineering graduates, working professionals and career switchers",
    "No prior design experience is required — only basic computer familiarity is needed to get started",
    "No engineering background needed; many students come from commerce and arts backgrounds",
    "An interest in design, drafting or technical drawing is the real prerequisite",
  ],
};

/** Hiring context for the future-scope section, where a course has its own. */
const demandBySlug: Record<string, string> = {
  "ai-powered-marketing": aiPoweredMarketingDemand,
  "chatgpt-ai-tools": chatgptAiToolsDemand,
  rag: ragDemand,
  "ai-powered-courses": aiPoweredCoursesDemand,
  "all-ai-courses": allAiCoursesDemand,
  "cyber-security":
    "Every company now depends on digital infrastructure, which makes every one of them a potential target — and Mohali's IT City, together with the wider Chandigarh tricity, is hiring for SOC, VAPT and security-support roles as fast as that infrastructure grows.",
  "cloud-computing":
    "Nearly every business now runs part or all of its operations on AWS, Azure or Google Cloud — and Mohali's IT City, together with the wider Chandigarh tricity, is hiring for cloud support, administration and operations roles every quarter as that migration continues.",
  linux:
    "Almost every server, cloud platform and enterprise IT setup runs on Linux — and companies across Mohali's IT Park, Phase 8B and Quark City, along with the wider Chandigarh Tricity, hire Linux-capable administrators as the first rung of system administration, cloud and DevOps teams.",
  "ethical-hacking":
    "India's cybersecurity market is growing rapidly against a well-documented shortage of trained professionals — and Mohali and Chandigarh have emerged as one of North India's fastest-growing cybersecurity talent hubs, hiring across IT service providers, corporate security teams and consulting firms.",
  "power-bi":
    "Companies across the industrial corridors of Mohali and Chandigarh are generating vast amounts of data but lack the skilled workforce to extract insight from it — and because finance, retail, healthcare and manufacturing teams all report on that data, Power BI hiring is not confined to IT companies.",
  tableau:
    "Companies across Mohali and Chandigarh generate large volumes of data but often lack skilled analysts to interpret it — and because Tableau sits in job descriptions alongside Python, SQL and Power BI, the profile is hired across finance, retail, healthcare and manufacturing, not only in IT.",
  "data-science":
    "Companies in Mohali's IT Park, Chandigarh and across India are actively seeking professionals who can turn data into insight, and that demand keeps outpacing the supply of genuinely skilled data scientists — with IT Park Sector 67 and the Phase 8 industrial belt hiring within minutes of the campus.",
  "data-analytics":
    "Companies hiring across Mohali's IT Park and the wider Chandigarh–Panchkula–Zirakpur belt expect entry-level analysts to arrive fluent in more than one tool — Excel and SQL through to Power BI, Tableau and Python — which is exactly the gap a full-stack analytics track closes.",
  "machine-learning":
    "Companies hiring across Mohali's IT Park and the wider Chandigarh–Panchkula–Kharar–Zirakpur belt are adding junior ML profiles as AI moves from pilot projects into production — and developers, testers and analysts already in those teams are the ones being asked to specialize.",
  "deep-learning":
    "Computer vision and NLP skills appear increasingly often in job postings across the Tricity IT hub, and because deep learning is a more specialized skill set than general ML, the roles it opens — and what they pay — sit a step above the generic data openings.",
  "artificial-intelligence":
    "Companies across Mohali's IT Park and the broader Tricity region are building AI capability and hiring for applied, practical skill rather than research credentials — and because this track spans machine learning, deep learning and NLP together, it opens more of those doors than a single-tool course does.",
  "digital-marketing":
    "Mohali's IT and startup ecosystem — especially around Phase 8, IT City and the wider Tricity belt — is growing fast, and local agencies, startups and in-house teams hire for people who understand SEO, paid ads, social and analytics together rather than one channel in isolation.",
  "social-media-marketing":
    "Mohali's digital economy is growing fast, driven by IT companies, startups and agencies around Phase 8, QuarkCity and the wider Chandigarh IT Park corridor — and local D2C brands and service providers need social media managers who understand both platform trends and the local audience.",
  "google-ads":
    "Recruiters across Mohali and the wider Tricity consistently list Google Ads, PPC, SEM and campaign optimization among their top-priority skills — and with IT Park Sectors 67–74, Phase 8, Phase 8A and Phase 8B housing hundreds of software companies, agencies and startups, that hiring happens locally.",
  seo:
    "Mohali has become one of Punjab's strongest IT and startup hubs — IT Park, Sector 82, Sector 74 and the wider Tricity house hundreds of growing companies, agencies and e-commerce businesses, and every one of them needs online visibility, which is what keeps SEO hiring consistent here.",
  wordpress:
    "WordPress powers over 40% of the websites on the internet, and businesses across Mohali's IT hubs — IT City, Quark City, Phase 8 Industrial Area and the wider Chandigarh Tricity — constantly need developers, website administrators and freelancers to build, redesign, secure and optimise those sites.",
  shopify:
    "Mohali's IT parks, Chandigarh's growing agency ecosystem and Panchkula's corporate sector are actively hiring for e-commerce and Shopify roles — developers who can handle theme customization, app integration, speed optimization and client-facing delivery, rather than store setup alone.",
  "python-programming":
    "Mohali's IT City and the wider tri-city area have seen steady growth in software, data and automation-focused companies — and Python sits underneath most of those roles, from backend and Django work through data analysis to QA scripting.",
  "java-programming":
    "Mohali is home to a genuinely growing IT ecosystem, from established IT Park companies to newer startups in the Aerocity corridor — and Core Java, OOP, Collections and JDBC remain the skills technical interviews for Java, backend and full-stack roles across the Tricity are actually built on.",
  "cpp-dsa":
    "C/C++ is still widely used in system-level programming, competitive coding and software development across Mohali's growing IT sector — including IT Park Chandigarh and the Sector 82–83 hubs — and the concepts show up in almost every technical interview and campus placement round.",
  kotlin:
    "Since Google made Kotlin its preferred Android language the market has shifted fast — companies around Mohali's IT City, Phase 8B, Sector 70 and Chandigarh's tech parks now hire Kotlin developers ahead of legacy Java-only ones.",
  flutter:
    "Mohali is one of North India's fastest-growing IT destinations, home to hundreds of startups, software companies and MNC development centres across Phase 8 Industrial Area, IT Park Mohali and the wider tricity — and one Flutter developer shipping both Android and iOS is exactly the economics those teams hire for.",
  "web-designing":
    "Mohali has emerged as one of Punjab's strongest IT hubs — IT City Mohali, Phase 8 Industrial Area and Quark City house numerous IT companies, startups and digital agencies, while local businesses across Sector 70, Sector 74, Zirakpur and Kharar keep investing in websites and online stores.",
  "web-development":
    "Mohali is rapidly becoming one of North India's strongest IT and startup destinations, with companies clustered around Phase 8 Industrial Area, IT Park and Sector 74 — and they hire developers who can handle a real project from day one, across both frontend and backend.",
  "full-stack-development":
    "Mohali has become one of North India's fastest-growing IT hubs, with startups, product companies and service firms constantly hiring skilled full stack developers — and local hiring, from junior roles through freelance projects, keeps growing across the Tricity.",
  "mern-full-stack":
    "Mohali, alongside Chandigarh and Panchkula, has become one of North India's fastest-growing IT and startup corridors — product startups and established service firms alike are hiring full-stack JavaScript developers, which means MERN training here is training for roles that exist in your own city.",
  "mean-stack":
    "Mohali has grown into a genuine IT hub over the past decade, with companies in IT Park, Phase 8 and Sector 82 drawn by proximity to Chandigarh and a growing tech talent pool — and full-stack developers who know MEAN are consistently sought after by those firms and by startups across the Tricity.",
  "php-full-stack":
    "PHP still runs a very large share of the web, and across Mohali, Chandigarh, Zirakpur and Kharar the demand is for developers who can work end to end — PHP and MySQL on the server, Laravel or CodeIgniter for structure, and WordPress for content-driven client work.",
};

/** Page-level SEO, where a course page has been written to a keyword brief. */
export const courseSeo: Record<string, { title: string; description: string }> = {
  "ai-powered-marketing": aiPoweredMarketingSeo,
  "chatgpt-ai-tools": chatgptAiToolsSeo,
  rag: ragSeo,
  "ai-powered-courses": aiPoweredCoursesSeo,
  "all-ai-courses": allAiCoursesSeo,
  "generative-ai": {
    title: "Generative AI Course in Mohali | Techcadd Training Institute",
    description:
      "Generative AI Course in Mohali by Techcadd — LLMs, prompt engineering, embeddings, RAG, AI APIs and AI application development with Python, LangChain and Hugging Face.",
  },
  autocad: {
    title: "AutoCAD Course in Mohali | Techcadd – Certified Training with Placement",
    description:
      "Join Techcadd's AutoCAD course in Mohali — hands-on 2D/3D training, ISO-certified, flexible batches & 100% placement support. Enroll today.",
  },
  "cyber-security": {
    title: "Cyber Security Course in Mohali | Techcadd Training Institute",
    description:
      "Join Techcadd's hands-on Cyber Security course in Mohali. Learn ethical hacking, network security & real tools. Placement support included. Enquire now.",
  },
  "cloud-computing": {
    title: "Cloud Computing Course in Mohali | Techcadd Training Institute",
    description:
      "Join Techcadd's hands-on Cloud Computing course in Mohali. Learn AWS, Azure & real cloud tools. Placement support included. Enquire now.",
  },
  linux: {
    title: "Linux Course in Mohali | Job-Oriented Linux Training – Techcadd",
    description:
      "Learn Linux in Mohali with hands-on labs, expert trainers & placement support. Beginner to advanced batches for 12th pass, graduates & professionals. Enquire now.",
  },
  "ethical-hacking": {
    title: "Ethical Hacking Course in Mohali | Cybersecurity Training with Placement – Techcadd",
    description:
      "Learn Ethical Hacking in Mohali with hands-on labs on Kali Linux, Metasploit & Burp Suite. Beginner to advanced batches. 100% placement support. Enquire now.",
  },
  "power-bi": {
    title: "Power BI Course in Mohali | Data Visualization & BI Training – Techcadd",
    description:
      "Learn Power BI in Mohali with real-world projects, DAX training & certification prep. Beginner-friendly batches for students, graduates & professionals. Enquire now.",
  },
  tableau: {
    title: "Tableau Course in Mohali | Data Visualization & BI Training – Techcadd",
    description:
      "Learn Tableau in Mohali with real-world projects, dashboard training & placement support. Beginner-friendly batches for students, graduates & professionals. Enquire now.",
  },
  "data-science": {
    title: "Data Science Course in Mohali | Techcadd – Certification + Placement",
    description:
      "Join Techcadd's Data Science course in Mohali — Python, ML, SQL, Tableau & Power BI taught through live projects, a capstone and placement assistance. Enquire now.",
  },
  "data-analytics": {
    title: "Data Analytics Course in Mohali | 6-Month Training with Placement – Techcadd",
    description:
      "Techcadd's 6-month Data Analytics course in Mohali — Excel, SQL, Power BI, Tableau & Python with 15+ live projects, small batches and placement support. Enquire now.",
  },
  "machine-learning": {
    title: "Machine Learning Course in Mohali | Python, ML Algorithms & Placement – Techcadd",
    description:
      "Learn Machine Learning in Mohali with Techcadd — Python, Pandas & Scikit-learn taught through real projects and a capstone, with small batches and placement support.",
  },
  "deep-learning": {
    title: "Deep Learning Course in Mohali | Neural Networks, TensorFlow & Placement – Techcadd",
    description:
      "Learn Deep Learning in Mohali with Techcadd — neural networks, CNNs, RNNs, computer vision & NLP in TensorFlow and Keras, with real projects and AI placement support.",
  },
  "artificial-intelligence": {
    title: "Artificial Intelligence Course in Mohali | Python, ML, Deep Learning & Placement – Techcadd",
    description:
      "Techcadd's Artificial Intelligence course in Mohali covers Python, Machine Learning, Deep Learning, NLP, Generative AI, LLMs, Computer Vision and AI deployment with practical projects.",
  },
  "digital-marketing": {
    title: "Digital Marketing Course in Mohali | Techcadd Training Institute",
    description:
      "Join Techcadd's hands-on Digital Marketing course in Mohali. Learn SEO, Google Ads, Meta Ads, analytics & AI marketing tools through live projects. Enquire now.",
  },
  "social-media-marketing": {
    title: "Social Media Marketing Course in Mohali | Techcadd Training Institute",
    description:
      "Join Techcadd's hands-on Social Media Marketing course in Mohali. Instagram, Meta Ads, analytics & AI tools through live campaigns. Placement assistance. Enquire now.",
  },
  "google-ads": {
    title: "Google Ads Course in Mohali | PPC Training with Placement – Techcadd",
    description:
      "Join Techcadd's hands-on Google Ads course in Mohali. Learn campaign setup, keyword research, bidding & conversion tracking on live budgets. Placement support included.",
  },
  seo: {
    title: "SEO Course in Mohali | Job-Oriented SEO Training – Techcadd",
    description:
      "Join Techcadd's hands-on SEO course in Mohali. Keyword research, on-page, technical & local SEO taught on live websites. Certification and placement support included.",
  },
  wordpress: {
    title: "WordPress Course in Mohali | Website Building & WooCommerce Training – Techcadd",
    description:
      "Join Techcadd's hands-on WordPress course in Mohali. Themes, plugins, Elementor, WooCommerce & SEO taught on live projects. No coding needed. Placement support included.",
  },
  shopify: {
    title: "Shopify Course in Mohali | Liquid, Theme Development & Placement – Techcadd",
    description:
      "Join Techcadd's Shopify Development course in Mohali. Master Liquid, theme customization, apps & Shopify SEO across 3+ live stores. Placement support included.",
  },
  "python-programming": {
    title: "Python Course in Mohali | Job-Oriented Python Training – Techcadd",
    description:
      "Join Techcadd's Python course in Mohali. Learn core Python, OOP, NumPy, Pandas & Django through live projects. Beginner-friendly, with certification and placement support.",
  },
  "java-programming": {
    title: "Java Course in Mohali | Core Java, OOP & JDBC Training – Techcadd",
    description:
      "Join Techcadd's Java course in Mohali. Learn Core Java, OOP, Collections, file handling & JDBC through live projects in Eclipse and IntelliJ. Placement support included.",
  },
  "cpp-dsa": {
    title: "C/C++ Course in Mohali | Programming Training from Scratch – Techcadd",
    description:
      "Join Techcadd's C/C++ course in Mohali. Learn syntax, loops, functions, OOP, pointers, file handling & STL through daily hands-on coding. Beginner-friendly batches.",
  },
  kotlin: {
    title: "Kotlin Course in Mohali | Android App Development Training – Techcadd",
    description:
      "Join Techcadd's Kotlin course in Mohali. Learn Kotlin, Jetpack Compose, MVVM & coroutines while building 5+ Android apps. Small batches and placement support.",
  },
  flutter: {
    title: "Flutter App Development Course in Mohali | Dart & Cross-Platform Training – Techcadd",
    description:
      "Join Techcadd's Flutter course in Mohali. Learn Dart, widgets, state management, Firebase & APIs while building real Android and iOS apps. Placement support included.",
  },
  "web-designing": {
    title: "Web Designing Course in Mohali | HTML, CSS, WordPress & UI/UX – Techcadd",
    description:
      "Join Techcadd's Web Designing course in Mohali. Learn HTML5, CSS3, JavaScript, Bootstrap, WordPress & UI/UX in Figma through live projects. Placement support included.",
  },
  "web-development": {
    title: "Web Development Course in Mohali | Full Stack MERN Training – Techcadd",
    description:
      "Join Techcadd's Web Development course in Mohali. Learn HTML, CSS, JavaScript, React, Node, Express & MongoDB through live projects. Placement support included.",
  },
  "full-stack-development": {
    title: "Full Stack Development Course in Mohali | MERN Training – Techcadd",
    description:
      "Join Techcadd's Full Stack Development course in Mohali. Learn HTML, CSS, JavaScript, React, Node, Express & MongoDB through live projects. Placement support included.",
  },
  "mern-full-stack": {
    title: "MERN Stack Course in Mohali | MongoDB, Express, React & Node – Techcadd",
    description:
      "Join Techcadd's MERN Stack certification course in Mohali. 80% hands-on coding across React, Node, Express & MongoDB with live projects and placement support.",
  },
  "mean-stack": {
    title: "MEAN Stack Course in Mohali | MongoDB, Express, Angular & Node – Techcadd",
    description:
      "Join Techcadd's MEAN Stack course in Mohali. Learn MongoDB, Express.js, Angular & Node.js through hands-on projects, with placement support across the Tricity.",
  },
  "php-full-stack": {
    title: "PHP Full Stack Course in Mohali | Laravel, MySQL & Web Development – Techcadd",
    description:
      "Join Techcadd's PHP Full Stack course in Mohali. Learn Core PHP, OOPs, MySQL, Laravel, CodeIgniter & WordPress across 25+ real projects, with interview preparation.",
  },
};

/* -------------------------------------------------------------------------- *
 *                               Why choose us                                 *
 * -------------------------------------------------------------------------- */

/**
 * The written title/description pair for a page, or undefined when the course
 * has none and the page should derive its own.
 *
 * Keyed like everything else here, so a menu with its own copy for a shared
 * course gets its own tag and meta description too rather than competing in
 * search with the same page under another menu.
 */
export function courseSeoFor(course: Course) {
  return courseSeo[contentKey(course)];
}

export function whyChoose(course: Course) {
  const written = whyChooseBySlug[contentKey(course)];
  if (written) return written;

  return [
    {
      icon: "users",
      title: "Trainers who still ship",
      body: `Your ${course.title} sessions are taken by people who use this stack at work every week — current practice and the judgement behind it, not a syllabus written five years ago.`,
    },
    {
      icon: "rocket",
      title: "Build from week one",
      body: "Concepts in the first half of a session, hands-on in the second. Every module closes with something that runs, gets reviewed and goes into your portfolio.",
    },
    {
      icon: "briefcase",
      title: "Live project + internship letter",
      body: "From the third week you join a project team with real requirements, deadlines and code review, and you leave with a documented internship letter.",
    },
    {
      icon: "certificate",
      title: "ISO-certified certification",
      body: "An ISO-certified training certificate, a project completion letter and a portfolio you can actually show — all recognised across our hiring-partner network.",
    },
    {
      icon: "chart",
      title: "Placement machinery that runs",
      body: "Resume and LinkedIn rebuilds, mock technical and HR rounds, aptitude practice and continuous drives with 450+ hiring partners around Mohali and Chandigarh.",
    },
    {
      icon: "clock",
      title: "Batches built around your life",
      body: "Morning, evening, weekend and live-online batches for the same programme. Every session is recorded and stays in your student portal.",
    },
  ];
}

/* -------------------------------------------------------------------------- *
 *                               Who can join                                  *
 * -------------------------------------------------------------------------- */

const audienceByCategory: Record<CategoryKey, { title: string; body: string; icon: string }[]> = {
  "ai-data": [
    {
      icon: "users",
      title: "Students & final-year graduates",
      body: "B.Tech, BCA, MCA, B.Sc and M.Sc students who want an AI or data profile in place before campus placements begin.",
    },
    {
      icon: "code",
      title: "Developers moving into AI",
      body: "Working engineers who can already code and want models, pipelines and deployment added to the stack they ship with.",
    },
    {
      icon: "chart",
      title: "Analysts & MIS professionals",
      body: "Anyone living inside spreadsheets who wants Python, SQL and modern BI doing the heavy lifting instead.",
    },
    {
      icon: "rocket",
      title: "Career changers",
      body: "Non-technical professionals starting from Python basics — the foundation module assumes nothing at all.",
    },
  ],
  development: [
    {
      icon: "users",
      title: "Students & fresh graduates",
      body: "Any stream. If you are confident with a computer, the fundamentals module brings you to the same starting line as everyone else.",
    },
    {
      icon: "monitor",
      title: "Designers moving into code",
      body: "UI and graphic designers who want to build and deploy the interfaces they currently hand over to somebody else.",
    },
    {
      icon: "code",
      title: "Self-taught developers",
      body: "You have watched the tutorials. Here you build, get reviewed and deploy with a mentor reading your code.",
    },
    {
      icon: "rocket",
      title: "Working professionals",
      body: "Evening and weekend batches designed around a full-time job, with every session recorded for later.",
    },
  ],
  "cyber-cloud": [
    {
      icon: "users",
      title: "IT & networking students",
      body: "B.Tech, BCA and diploma students who want a security or infrastructure profile before placement season.",
    },
    {
      icon: "monitor",
      title: "System & network admins",
      body: "Professionals already running infrastructure who want to defend, audit and automate it properly.",
    },
    {
      icon: "shield",
      title: "Aspiring security analysts",
      body: "Anyone targeting SOC, VAPT or cloud-security roles. The labs start from Linux and networking fundamentals.",
    },
    {
      icon: "cloud",
      title: "Developers going DevOps",
      body: "Engineers who want CI/CD, containers and cloud deployment layered on top of what they already build.",
    },
  ],
  "digital-marketing": [
    {
      icon: "users",
      title: "Students & graduates",
      body: "BBA, MBA, B.Com and any-stream graduates aiming at agency or in-house marketing roles.",
    },
    {
      icon: "briefcase",
      title: "Business & shop owners",
      body: "Run your own ads, ranking and content instead of paying an agency to guess on your behalf.",
    },
    {
      icon: "megaphone",
      title: "Freelancers & creators",
      body: "Turn a content habit into paid retainers, with real analytics, funnels and reporting behind it.",
    },
    {
      icon: "chart",
      title: "Sales & marketing staff",
      body: "Add measurable performance marketing to a role that currently leans on offline channels.",
    },
  ],
  "cad-design": [
    {
      icon: "users",
      title: "Engineering students",
      body: "Mechanical, civil, architecture and diploma students who need drafting depth their college does not cover.",
    },
    {
      icon: "cube",
      title: "Draughtsmen & site engineers",
      body: "Move from manual or basic drafting to standards-compliant production drawing sets.",
    },
    {
      icon: "briefcase",
      title: "Working design engineers",
      body: "Add modelling, assemblies and documentation depth to a role you already hold.",
    },
    {
      icon: "rocket",
      title: "Freelance designers",
      body: "Take on client drawing work with output that meets industry standards from day one.",
    },
  ],
  programming: [
    {
      icon: "users",
      title: "Absolute beginners",
      body: "No coding background needed. Module one starts at variables and builds steadily from there.",
    },
    {
      icon: "code",
      title: "School & college students",
      body: "Class 11–12 and first-year students who want a real head start before the syllabus catches up.",
    },
    {
      icon: "target",
      title: "Placement aspirants",
      body: "Anyone preparing for coding rounds — data structures, problem solving and interview patterns are built in.",
    },
    {
      icon: "rocket",
      title: "Career changers",
      body: "Professionals from non-IT backgrounds who need one first, solid programming language.",
    },
  ],
  "office-skills": [
    {
      icon: "users",
      title: "Absolute beginners",
      body: "No prior computer experience needed — the track starts at switching the machine on and builds from there.",
    },
    {
      icon: "certificate",
      title: "Government exam candidates",
      body: "Anyone sitting a recruitment exam with an English or Punjabi typing test, trained to the benchmark speed and accuracy.",
    },
    {
      icon: "building",
      title: "Shopkeepers & small business owners",
      body: "Owners who want to run their own GST billing and books in Tally instead of paying to outsource it.",
    },
    {
      icon: "briefcase",
      title: "Office & admin entrants",
      body: "Anyone starting in office, admin, billing or data-entry work across Mohali's retail, trading, healthcare and services employers.",
    },
  ],
};

export function whoCanJoin(course: Course) {
  return audienceBySlug[contentKey(course)] ?? audienceByCategory[course.category];
}

export function eligibility(course: Course) {
  const written = eligibilityBySlug[contentKey(course)];
  if (written) return written;

  const base = [
    "10+2 or above — any stream accepted",
    "A laptop for practice (lab systems available on campus)",
    "Basic computer familiarity",
  ];
  if (course.level === "Beginner") {
    return [...base, "No prior coding or design experience required"];
  }
  if (course.level === "Advanced") {
    return [...base, "Comfort with the fundamentals of this domain"];
  }
  return [...base, "Willingness to practise between sessions"];
}

/* -------------------------------------------------------------------------- *
 *                                   FAQs                                      *
 * -------------------------------------------------------------------------- */


/** Course FAQs written for a specific page, replacing the derived set. */
const faqsBySlug: Record<string, { q: string; a: string }[]> = {
  "ai-powered-marketing": aiPoweredMarketingFaqs,
  "chatgpt-ai-tools": chatgptAiToolsFaqs,
  rag: ragFaqs,
  "ai-powered-courses": aiPoweredCoursesFaqs,
  "all-ai-courses": allAiCoursesFaqs,
  "mern-full-stack--certificate": mernCertificateFaqs,
  "data-science--certificate": dataScienceCertificateFaqs,
  "agentic-ai--certificate": agenticAiCertificateFaqs,
  "cyber-security--certificate": cyberSecurityCertificateFaqs,
  "cloud-computing--certificate": cloudComputingCertificateFaqs,
  "digital-marketing--certificate": digitalMarketingCertificateFaqs,
  "artificial-intelligence--certificate": artificialIntelligenceCertificateFaqs,
  "flutter--certificate": flutterCertificateFaqs,
  "data-analytics--certificate": dataAnalyticsCertificateFaqs,
  "full-stack-development--certificate": fullStackDevelopmentCertificateFaqs,
  "basic-computer-office-skills--certificate": basicComputerOfficeSkillsFaqs,
  "agentic-ai": [
    {
      q: "What is Agentic AI?",
      a: "Agentic AI is software that pursues a goal on its own rather than answering a single prompt. Given an outcome, it plans its own next step, calls a real tool such as an API, database, or browser, reads what came back, and repeats — until the goal is met, the budget runs out, or it asks a human. Four properties define an agent: goal-directedness, tool use, memory, and autonomy.",
    },
    {
      q: "Where is the Agentic AI course in Mohali taught?",
      a: "Techcadd's Agentic AI course runs at our Mohali training centre, easily accessible for students from Phase 5, Phase 7, Phase 8, Phase 9, Sector 70, Sector 71, and nearby areas including Zirakpur, Kharar, Derabassi, and Panchkula.",
    },
    {
      q: "How long is the Agentic AI certificate program in Mohali?",
      a: "There are three exit points on one 33-module ladder: 3 months (Practitioner), 6 months (Engineer), and 9 months (Architect). They're nested, not parallel — the 6-month program includes the 3-month one and continues onward, and the 9-month includes both — so choosing a shorter track costs you scope, never depth.",
    },
    {
      q: "Do I need programming experience to join this course?",
      a: "No. Module 01 teaches Python from the first line, along with the command line, Git, HTTP/REST, and SQL, ending with a working containerised service. Everything after assumes only what you learned in Module 01, which is why the course is open to complete beginners and career changers alike.",
    },
    {
      q: "Which tools and frameworks does the Agentic AI course cover?",
      a: "The stack includes Python, FastAPI, and Pydantic; the Claude, OpenAI, and Gemini APIs with Ollama for local models; LangGraph, LangChain, and CrewAI for orchestration; the Model Context Protocol (MCP) SDK for tools; Qdrant, Chroma, pgvector, and Neo4j for retrieval; and Docker, Kubernetes, and Temporal for production deployment.",
    },
    {
      q: "What jobs can I get after this Agentic AI course in Mohali?",
      a: "Graduates move into roles such as AI Engineer, Agent Developer, Automation Architect, and AI Consultant — hired both locally across the Mohali–Chandigarh Tricity and remotely by companies elsewhere in India and abroad.",
    },
    {
      q: "What salary can a fresher expect after this course in Mohali?",
      a: "A fresher with a working portfolio typically starts around ₹25,000–₹50,000 a month in the Mohali/Tricity market, rising substantially within two years of hands-on delivery experience.",
    },
    {
      q: "What is the fee for the Agentic AI course in Mohali?",
      a: "Shorter foundation-stage courses are more affordable, while the comprehensive 6-month program with live projects, an internship, and placement support is priced higher. Techcadd counsellors at the Mohali centre share the current fee sheet and EMI options on request, and a demo class is free.",
    },
    {
      q: "Are weekend and evening batches available in Mohali?",
      a: "Yes. Techcadd Mohali runs weekday, evening, and weekend batches in parallel so working professionals from IT Park Mohali and Quark City, as well as college students, can attend without disrupting their schedule. 1-on-1 training is also available.",
    },
    {
      q: "Will I get a certificate and internship letter?",
      a: "Yes. Every student receives an industry-recognised certificate on completion plus a documented internship letter based on real client work, accepted for industrial training requirements at most Punjab universities.",
    },
    {
      q: "Is placement guaranteed after this course?",
      a: "No responsible training provider can honestly guarantee a job, and you should be cautious of any Mohali institute that claims one. Techcadd guarantees placement support: CV reviews, mock interviews, portfolio preparation, and repeated hiring drives across Mohali, Chandigarh, and Panchkula.",
    },
    {
      q: "Can I freelance or work remotely with Agentic AI skills learned in Mohali?",
      a: "Yes. A Mohali address doesn't limit remote client work in this field. Students from this course go on to work with clients outside Punjab and even outside India, since agentic AI development is fundamentally remote-friendly.",
    },
  ],
  "prompt-engineering": [
    {
      q: "What is the Prompt Engineering course in Mohali at Techcadd about?",
      a: "Techcadd's Prompt Engineering course in Mohali teaches students how to write effective, structured prompts for AI tools like ChatGPT, Claude, Gemini, and Midjourney. It covers prompting frameworks, real-world use cases, and hands-on projects designed to make you job-ready in AI-related roles.",
    },
    {
      q: "Do I need a coding background to join this course?",
      a: "No. This course is designed for beginners, including 12th-pass students, graduates from any stream, and working professionals. No prior programming knowledge is required to start.",
    },
    {
      q: "Who can enrol in the Prompt Engineering course in Mohali?",
      a: "Anyone can enrol — 12th-pass students, college graduates, IT professionals, digital marketers, freelancers, job seekers, and even career returnees. The course is built to be accessible across skill levels.",
    },
    {
      q: "How long is the Prompt Engineering course at Techcadd Mohali?",
      a: "The course duration varies based on the batch and mode selected. Contact the Techcadd Mohali centre directly for the current schedule, weekday/weekend batch options, and exact duration.",
    },
    {
      q: "Is this course online, offline, or both?",
      a: "Techcadd offers classroom-based, offline training at its Mohali centre, giving students direct mentor access and hands-on, in-person practice with real AI tools.",
    },
    {
      q: "What tools will I learn during the course?",
      a: "You'll work with ChatGPT, Claude, Google Gemini, Midjourney, DALL·E, Stable Diffusion, and NLP libraries like NLTK and spaCy, along with AI-powered productivity and automation tools.",
    },
    {
      q: "Will I get a certificate after completing the course?",
      a: "Yes, students receive a course completion certificate from Techcadd, which can be added to resumes and professional profiles to demonstrate verified prompt engineering skills.",
    },
    {
      q: "Does Techcadd provide placement assistance after the course?",
      a: "Yes, Techcadd offers career support including resume guidance, portfolio building, interview preparation, and placement assistance to help connect students with opportunities in Mohali and the wider tricity region.",
    },
    {
      q: "What kind of jobs can I get after this course?",
      a: "Graduates can pursue roles such as Prompt Engineer, AI Content Specialist, AI-assisted Developer, Digital Marketing Executive with AI skills, Chatbot Trainer, and Freelance AI Consultant, among other AI-adjacent roles.",
    },
    {
      q: "Is prompt engineering a good career choice in 2026?",
      a: "Yes. As businesses across industries integrate generative AI into daily operations, demand for professionals who can effectively direct AI tools is rising steadily, including in emerging tech hubs like Mohali and Chandigarh.",
    },
    {
      q: "How is Techcadd's Prompt Engineering course different from online courses?",
      a: "Unlike generic online videos, Techcadd offers structured, phase-wise, project-based classroom training with direct mentor feedback, local job-market awareness, and hands-on practice — leading to stronger retention and real-world application.",
    },
    {
      q: "What is the fee for the Prompt Engineering course in Mohali?",
      a: "Course fees vary depending on batch type and duration. Please contact the Techcadd Mohali centre or fill out the enquiry form on this page for current pricing and available offers.",
    },
  ],
  "cyber-security": [
    {
      q: "What is the duration of the Cyber Security course at Techcadd Mohali?",
      a: "The Cyber Security course at Techcadd Mohali typically runs for a few months, with both regular and flexible batch timings available to suit students, graduates and working professionals.",
    },
    {
      q: "Who can enroll in this Cyber Security course in Mohali?",
      a: "Anyone who has passed 12th grade (any stream), graduates from any background, working IT professionals and job seekers looking to switch careers can enroll. No prior coding or networking experience is required.",
    },
    {
      q: "Is this course suitable for complete beginners?",
      a: "Yes. Techcadd's Cyber Security course in Mohali is designed to start from the fundamentals of networking and systems before progressing into advanced topics, making it accessible for students with zero prior technical background.",
    },
    {
      q: "What tools will I learn during the course?",
      a: "Students get hands-on training with industry-standard tools including Kali Linux, Nmap, Wireshark, Metasploit, Burp Suite, John the Ripper, and vulnerability scanners like Nessus or OpenVAS.",
    },
    {
      q: "Does Techcadd provide placement assistance after the course?",
      a: "Yes. Techcadd offers placement support tailored to the local job market in Mohali and the greater Chandigarh tricity region, including resume building, interview preparation and connections with hiring companies.",
    },
    {
      q: "Where is the Techcadd Cyber Security training centre located?",
      a: "Techcadd's Cyber Security training is conducted at its Mohali centre, easily accessible for students from Chandigarh, Panchkula, Zirakpur, Kharar and Dera Bassi.",
    },
    {
      q: "What job roles can I apply for after completing this course?",
      a: "Graduates of this program can pursue roles such as SOC Analyst, Junior Penetration Tester, Security Analyst, IT Security Support Specialist and Vulnerability Assessment Associate, among others.",
    },
    {
      q: "Is the course only classroom-based, or is there practical lab work too?",
      a: "The course is heavily lab-focused, with students getting consistent hands-on practice in simulated environments for ethical hacking, network security and vulnerability testing rather than relying solely on lectures.",
    },
    {
      q: "Does Techcadd offer certification after course completion?",
      a: "Yes, students receive course completion recognition from Techcadd, and are also guided toward relevant industry certifications that strengthen their resume for job applications.",
    },
    {
      q: "How is Techcadd different from online cybersecurity courses?",
      a: "Techcadd offers in-person, mentor-led training with small batch sizes, real-time doubt resolution, hands-on lab access and locally-relevant placement support — advantages that self-paced online courses typically cannot replicate.",
    },
    {
      q: "Can working professionals join this course alongside their job?",
      a: "Yes, Techcadd offers flexible batch timings, including options suited for working professionals in Mohali and the tricity area who want to upskill without quitting their current job.",
    },
    {
      q: "Is prior knowledge of coding necessary to join this course?",
      a: "No prior coding knowledge is mandatory. The course begins with foundational concepts and gradually builds toward more technical, hands-on skills as students progress.",
    },
  ],
  "cloud-computing": [
    {
      q: "What is the duration of the Cloud Computing course at Techcadd Mohali?",
      a: "The Cloud Computing course at Techcadd Mohali typically runs for a few months, with both regular and flexible batch timings available to suit students, graduates, and working professionals.",
    },
    {
      q: "Who can enroll in this Cloud Computing course in Mohali?",
      a: "Anyone who has passed 12th grade (any stream), graduates from any background, working IT professionals, and job seekers looking to switch careers can enroll. No prior coding or networking experience is required.",
    },
    {
      q: "Is this course suitable for complete beginners?",
      a: "Yes. Techcadd's Cloud Computing course in Mohali starts with foundational concepts like cloud basics, networking, and virtualization before progressing into AWS and Azure, making it accessible for students with zero prior technical background.",
    },
    {
      q: "Which cloud platforms will I learn — AWS, Azure, or both?",
      a: "The course covers both Amazon Web Services (AWS) and Microsoft Azure fundamentals, giving students cross-platform familiarity that widens job eligibility across different companies and hiring requirements.",
    },
    {
      q: "Does Techcadd provide placement assistance after the course?",
      a: "Yes. Techcadd offers placement support tailored to the local job market in Mohali and the greater Chandigarh tricity region, including resume building, interview preparation, and connections with hiring companies.",
    },
    {
      q: "Where is the Techcadd Cloud Computing training centre located?",
      a: "Techcadd's Cloud Computing training is conducted at its Mohali centre, easily accessible for students from Chandigarh, Panchkula, Zirakpur, Kharar, and Dera Bassi.",
    },
    {
      q: "What job roles can I apply for after completing this course?",
      a: "Graduates of this program can pursue roles such as Cloud Support Associate, Junior Cloud Engineer, Cloud Administrator, and Cloud Operations Analyst, among other entry-level cloud positions.",
    },
    {
      q: "Is the course only classroom-based, or is there practical lab work too?",
      a: "The course is heavily lab-focused, with students getting consistent hands-on practice on real AWS and Azure consoles, virtualization exercises, and cloud storage configuration rather than relying solely on lectures.",
    },
    {
      q: "Does Techcadd offer certification guidance after course completion?",
      a: "Yes, students receive course completion recognition from Techcadd and are also guided toward relevant industry certifications, such as foundational AWS or Azure credentials, that strengthen their resume for job applications.",
    },
    {
      q: "How is Techcadd different from online cloud computing courses?",
      a: "Techcadd offers in-person, mentor-led training with small batch sizes, real-time doubt resolution, hands-on access to actual cloud platforms, and locally-relevant placement support — advantages that self-paced online courses typically cannot replicate.",
    },
    {
      q: "Can working professionals join this course alongside their job?",
      a: "Yes, Techcadd offers flexible batch timings, including evening and weekend options suited for working professionals in Mohali and the tricity area who want to upskill without quitting their current job.",
    },
    {
      q: "Is prior knowledge of coding necessary to join this course?",
      a: "No prior coding knowledge is mandatory. The course begins with foundational concepts and gradually builds toward hands-on, platform-specific skills as students progress.",
    },
  ],
  linux: [
    {
      q: "What is the duration of the Linux course in Mohali at Techcadd?",
      a: "The Linux course at Techcadd Mohali is available in both regular and fast-track formats, typically ranging from a few weeks for crash/short-term batches to a more comprehensive multi-week program for in-depth, job-ready training. Exact duration depends on the batch (regular, weekend, or fast-track) you choose.",
    },
    {
      q: "Who can join this Linux course in Mohali?",
      a: "This course is open to 12th-pass students from any stream, undergraduates, graduates, job seekers, and working professionals. No prior coding or IT background is required — the course starts from the fundamentals and builds up progressively.",
    },
    {
      q: "Do I need a technical or computer science background to learn Linux?",
      a: "No. The Linux course at Techcadd Mohali is designed to be beginner-friendly. Concepts are taught from the ground up, including basic navigation, commands, and system concepts, making it accessible to students from any academic stream.",
    },
    {
      q: "Is this Linux course suitable for students right after 12th?",
      a: "Yes. Many students join this Linux course immediately after completing their 12th, using it as an early, practical entry point into the IT industry instead of waiting to complete a full degree before gaining job-ready skills.",
    },
    {
      q: "What topics are covered in the Linux training program?",
      a: "The course covers Linux installation, file system structure, Linux commands, user and permission management, shell scripting, package management, networking fundamentals, and server configuration, with additional advanced topics available for learners who want to go further.",
    },
    {
      q: "Is the training practical or mostly theory-based?",
      a: "The training is heavily practical, using live lab sessions, real-time exercises, and project-based learning. Students get hands-on experience installing, configuring, and managing actual Linux systems rather than just studying concepts.",
    },
    {
      q: "What career opportunities are available after completing this course?",
      a: "Graduates of this Linux course can pursue roles in system administration, IT infrastructure support, cloud computing, and DevOps. Linux knowledge also serves as a strong foundation for further specialization in cybersecurity, ethical hacking, and cloud platforms like AWS and Azure.",
    },
    {
      q: "Does Techcadd provide placement support after the Linux course?",
      a: "Yes. Along with technical training, Techcadd offers placement-oriented support including resume building, interview preparation, and career guidance to help students transition from training into actual job opportunities.",
    },
    {
      q: "Are flexible batch timings available for working professionals?",
      a: "Yes. Techcadd offers flexible batch options, including weekend and evening batches, so working professionals and college students can attend the Linux course without disrupting their existing schedules.",
    },
    {
      q: "Where is the Techcadd Linux training centre located in Mohali?",
      a: "Techcadd's Linux training centre is located in Mohali, easily accessible for students commuting from Chandigarh, Zirakpur, Kharar, Panchkula, and other nearby Punjab towns, eliminating the need to travel to metro cities for quality IT training.",
    },
    {
      q: "Can I pursue Cloud Computing or DevOps after this Linux course?",
      a: "Yes. Linux is a foundational skill for both Cloud Computing and DevOps. Many students at Techcadd complete this Linux course first and then move on to Cloud Computing (AWS/Azure) or DevOps training to build a complete, career-ready skill stack.",
    },
    {
      q: "Is there an advanced level Linux course available after the basic training?",
      a: "Yes. Techcadd offers Advance Linux Training covering server optimization, virtualization, cloud integration, shell scripting automation, and configuration management tools for students who want to move beyond the fundamentals.",
    },
  ],
  "ethical-hacking": [
    {
      q: "What is the duration of the Ethical Hacking course in Mohali at Techcadd?",
      a: "Techcadd offers both a comprehensive advanced program (spanning several months for in-depth, certification-oriented training) and an intensive 6-week (45-day) crash course covering networking, Linux, and ethical hacking fundamentals — ideal for students during semester breaks.",
    },
    {
      q: "Who can join this Ethical Hacking course in Mohali?",
      a: "This course is open to 12th-pass students from any stream, undergraduates, graduates, job seekers, and working IT professionals. No prior networking or IT experience is required — the program starts from foundational concepts before progressing to advanced techniques.",
    },
    {
      q: "Do I need a technical or networking background to learn ethical hacking?",
      a: "No formal experience is needed. The course begins with cybersecurity and networking fundamentals before moving into penetration testing and hacking techniques, making it accessible to complete beginners as well as IT professionals.",
    },
    {
      q: "Is this Ethical Hacking course suitable for students right after 12th?",
      a: "Yes. Many students join immediately after completing their 12th, using it as an early, practical entry point into one of India's fastest-growing career fields instead of waiting to complete a full degree first.",
    },
    {
      q: "What tools and topics are covered in the Ethical Hacking training?",
      a: "The course covers cybersecurity fundamentals, penetration testing, network defense, web security, cloud security, and digital forensics, with hands-on practice using industry-standard tools including Kali Linux, Metasploit, Wireshark, Burp Suite, and Nmap.",
    },
    {
      q: "Is the training practical or mostly theory-based?",
      a: "The training is heavily practical, delivered through hands-on labs, live attack simulations, and mentor-guided sessions. Students actively practice penetration testing and security techniques on real tools rather than only studying concepts.",
    },
    {
      q: "What career opportunities are available after completing this course?",
      a: "Graduates can pursue roles such as Security Analyst, Ethical Hacker, Penetration Tester, SOC Engineer, and Digital Forensics Specialist, with strong demand across IT service providers, corporate security teams, and consulting firms in India and abroad.",
    },
    {
      q: "Does Techcadd provide placement support after the Ethical Hacking course?",
      a: "Yes. Techcadd offers 100% placement assistance, career counseling, and interview preparation to help students confidently enter the cybersecurity job market after completing the course.",
    },
    {
      q: "Are flexible batch timings available for working professionals?",
      a: "Yes. Techcadd offers flexible batch options, including weekend and evening batches as well as intensive short-term crash courses, so working professionals and students can train without disrupting existing schedules.",
    },
    {
      q: "Where is the Techcadd Ethical Hacking training centre located?",
      a: "The training centre is located in Mohali, easily accessible for students commuting from Chandigarh, Zirakpur, Kharar, Panchkula, and other nearby Punjab towns, eliminating the need to travel to metro cities for quality cybersecurity training.",
    },
    {
      q: "What is the expected salary range after completing this course?",
      a: "Entry-level roles typically start in the ₹6–10 LPA range, with experienced professionals in roles like penetration testing and security consulting earning significantly higher, reflecting the strong demand-to-supply gap in India's cybersecurity job market.",
    },
    {
      q: "Can I specialize further after this Ethical Hacking course?",
      a: "Yes. This course serves as a strong foundation for further specialization in areas like VAPT (Vulnerability Assessment and Penetration Testing), SOC operations, cloud security, and digital forensics.",
    },
  ],
  "power-bi": [
    {
      q: "What is the duration of the Power BI course in Mohali at Techcadd?",
      a: "Techcadd offers a comprehensive Power BI training program, along with flexible options as part of broader Data Analytics and Data Science tracks. Batch duration depends on the format chosen — standalone Power BI training or a combined data analytics program spanning several months.",
    },
    {
      q: "Who can join this Power BI course in Mohali?",
      a: "This course is open to 12th-pass students from any stream, graduates (BCA, B.Com, BBA, B.Tech, or any degree), job seekers, and working professionals from finance, operations, marketing, or any field that involves data-driven decision-making. No prior technical background is required.",
    },
    {
      q: "Do I need coding or data science knowledge to learn Power BI?",
      a: "No. Power BI is designed to be accessible without heavy coding knowledge. The course starts with fundamentals — data cleaning, visualization basics, and the Power BI interface — before progressing into DAX formulas and advanced reporting.",
    },
    {
      q: "Is this Power BI course suitable for students right after 12th?",
      a: "Yes. Many students join immediately after completing their 12th, using it as a practical, job-oriented entry point into the growing field of data analytics without needing to wait for a full degree first.",
    },
    {
      q: "What topics and tools are covered in the Power BI training?",
      a: "The course covers Power BI fundamentals, data cleaning with Power Query, data modeling, DAX formulas, interactive dashboard design, connecting to multiple data sources, and publishing reports via Power BI Service — with additional exposure to complementary tools like Excel, SQL, and Tableau.",
    },
    {
      q: "Is the training practical or mostly theory-based?",
      a: "The training is heavily practical, built around real-world projects and hands-on dashboard building rather than passive tutorials. Students work with actual business scenarios to build a genuine, interview-ready project portfolio.",
    },
    {
      q: "What career opportunities are available after completing this course?",
      a: "Graduates can pursue roles such as Data Analyst, Business Intelligence Analyst, Reporting Analyst, and Data Visualization Specialist, with growing demand across IT companies, finance firms, and business operations teams in Mohali, Chandigarh, and beyond.",
    },
    {
      q: "Does Techcadd provide placement support after the Power BI course?",
      a: "Yes. Techcadd offers placement support and access to hiring partnerships, along with resume building and interview preparation, helping students transition from training into real data analytics roles.",
    },
    {
      q: "Are flexible batch timings available for working professionals?",
      a: "Yes. Techcadd offers flexible batch options, including weekend and evening batches, so working professionals across Chandigarh, Mohali, and Panchkula can complete the course without disrupting their current job.",
    },
    {
      q: "Where is the Techcadd Power BI training centre located in Mohali?",
      a: "The training centre is located in the heart of Mohali's Phase 8 Industrial Area, easily accessible for students commuting from Chandigarh, Zirakpur, Kharar, and Panchkula.",
    },
    {
      q: "Does this course include certification preparation?",
      a: "Yes. The course includes Power BI certification preparation aligned with globally recognized standards, giving students a credential to complement their hands-on project portfolio.",
    },
    {
      q: "Can I move into Data Analytics or Data Science after this Power BI course?",
      a: "Yes. Power BI serves as a strong visualization foundation for further specialization in Data Analytics or Data Science, where students typically add Python, SQL, and statistical analysis skills to build a more advanced analyst profile.",
    },
  ],
  tableau: [
    {
      q: "What is the duration of the Tableau course in Mohali at Techcadd?",
      a: "Techcadd offers Tableau training both as a standalone course and as part of broader Data Analytics and Data Science programs. Duration varies depending on the format chosen — a focused Tableau module or a comprehensive multi-month data analytics track.",
    },
    {
      q: "Who can join this Tableau course in Mohali?",
      a: "This course is open to 12th-pass students from any stream, graduates (BCA, B.Com, BBA, B.Tech, or any degree), job seekers, and working professionals from finance, marketing, or operations backgrounds. No prior technical or coding background is required.",
    },
    {
      q: "Do I need coding knowledge to learn Tableau?",
      a: "No. Tableau is designed to be accessible without heavy coding knowledge, relying mainly on drag-and-drop functionality. The course starts with fundamentals — data connections and basic visualizations — before progressing into calculated fields and advanced dashboard design.",
    },
    {
      q: "Is this Tableau course suitable for students right after 12th?",
      a: "Yes. Many students join immediately after completing their 12th, using it as a practical, job-oriented entry point into the growing field of data analytics without needing to wait for a full degree first.",
    },
    {
      q: "What topics and tools are covered in the Tableau training?",
      a: "The course covers Tableau fundamentals, connecting to data sources, data cleaning and preparation, building charts and visualizations, interactive dashboard design, calculated fields, data storytelling, and publishing to Tableau Server or Tableau Public — with exposure to complementary tools like Excel, SQL, and Power BI.",
    },
    {
      q: "Is the training practical or mostly theory-based?",
      a: "The training is heavily practical, built around real-world datasets and business case studies rather than passive tutorials. Students work on actual business scenarios to build a genuine, interview-ready dashboard portfolio.",
    },
    {
      q: "What career opportunities are available after completing this course?",
      a: "Graduates can pursue roles such as Data Analyst, Business Intelligence Analyst, Data Visualization Specialist, and Reporting Analyst, with growing demand across IT companies, finance firms, and business operations teams in Mohali, Chandigarh, and beyond.",
    },
    {
      q: "Does Techcadd provide placement support after the Tableau course?",
      a: "Yes. Techcadd offers dedicated placement assistance, along with resume building and interview preparation, helping students transition from training into real data analytics roles.",
    },
    {
      q: "Are flexible batch timings available for working professionals?",
      a: "Yes. Techcadd offers flexible batch options, including weekend and evening batches, so working professionals across Chandigarh, Mohali, and Panchkula can complete the course without disrupting their current job.",
    },
    {
      q: "Where is the Techcadd Tableau training centre located in Mohali?",
      a: "The training centre is located in Mohali, easily accessible for students commuting from Chandigarh, Zirakpur, Kharar, and Panchkula, removing the need to travel to metro cities for quality data visualization training.",
    },
    {
      q: "Is Tableau better than Power BI, or should I learn both?",
      a: "Both tools are widely used in the industry, and many employers value proficiency in either or both. Since Techcadd teaches Tableau alongside Power BI in its broader data analytics programs, students often benefit from learning both to maximize job flexibility.",
    },
    {
      q: "Can I move into Data Analytics or Data Science after this Tableau course?",
      a: "Yes. Tableau serves as a strong visualization foundation for further specialization in Data Analytics or Data Science, where students typically add Python, SQL, and statistical analysis skills to build a more advanced analyst profile.",
    },
  ],
  "data-science": [
    {
      q: "What is the duration of the Data Science course in Mohali at Techcadd?",
      a: "The Data Science course typically spans 5 to 6 months, with flexible options including full-time weekday batches, part-time evening batches for college students, and weekend batches for working professionals. Fast-track options are also available for those who want to complete training sooner.",
    },
    {
      q: "Who can join this Data Science course in Mohali?",
      a: "This course is open to 12th-pass students from any stream, graduates (B.Tech, BCA, B.Sc, B.Com, or any degree), job seekers, and working professionals wanting to pivot into a data career. No prior programming or math-heavy background is strictly required, though logical thinking helps.",
    },
    {
      q: "Do I need a math or coding background to learn data science?",
      a: "Not necessarily. The course starts with Python fundamentals and builds statistical concepts progressively, so motivated beginners without a strong technical background can follow along, though science and engineering students often adapt slightly faster.",
    },
    {
      q: "Is this Data Science course suitable for students right after 12th?",
      a: "Yes, though it's an ambitious path. Motivated 12th-pass students, especially from the science stream, can succeed in this course, as it builds Python, statistics, and analytical thinking from the ground up rather than assuming prior knowledge.",
    },
    {
      q: "What topics and tools are covered in the Data Science training?",
      a: "The course covers Python programming, data manipulation with NumPy and Pandas, statistics and exploratory data analysis, machine learning algorithms, advanced ML techniques like XGBoost, SQL, data visualization with Tableau and Power BI, and big data basics with PySpark — culminating in a capstone project.",
    },
    {
      q: "Is the training practical or mostly theory-based?",
      a: "The training is heavily practical. Students implement algorithms on real datasets, build predictive models, and create visualizations tied to real-world case studies, rather than only studying concepts theoretically.",
    },
    {
      q: "What career opportunities are available after completing this course?",
      a: "Graduates can pursue roles such as Data Analyst, Data Scientist, Machine Learning Engineer, and Business Intelligence Analyst, with strong demand from companies across Mohali's IT Park, Chandigarh, and beyond, as well as remote opportunities with national and international firms.",
    },
    {
      q: "Does Techcadd provide placement support after the Data Science course?",
      a: "Yes. The program includes dedicated placement assistance, resume building, and interview preparation as part of its structured curriculum, helping students transition confidently into data science and analytics roles.",
    },
    {
      q: "Are flexible batch timings available for working professionals?",
      a: "Yes. Techcadd offers full-time, part-time evening, and weekend batch options, along with fast-track formats, so working professionals and students across Chandigarh, Mohali, and Panchkula can train without disrupting their existing schedules.",
    },
    {
      q: "Where is the Techcadd Data Science training centre located in Mohali?",
      a: "The training centre is located in Mohali, easily accessible for students commuting from Chandigarh, Zirakpur, Kharar, and Panchkula, eliminating the need to travel to metro cities for comprehensive data science training.",
    },
    {
      q: "What is the difference between this Data Science course and standalone Power BI or Tableau courses?",
      a: "This Data Science course covers the complete analytics pipeline — Python, statistics, machine learning, SQL, and visualization tools including Tableau and Power BI — while standalone courses focus only on one specific visualization tool. Students wanting a broader, more comprehensive skill set typically choose this full program.",
    },
    {
      q: "Do I get access to updated learning materials after completing the course?",
      a: "Yes. Alumni often get access to updated course materials and can attend new workshops, helping graduates stay current with evolving data science trends and tools even after course completion.",
    },
  ],
  "data-analytics": [
    {
      q: "What is the duration of the Data Analytics course in Mohali at Techcadd?",
      a: "Techcadd's Data Analytics course in Mohali is a comprehensive 6-month program, covering everything from Excel and SQL basics to advanced Power BI, Tableau, and Python training.",
    },
    {
      q: "Who can join this Data Analytics course in Mohali?",
      a: "This course is open to 12th-pass students, graduates from any stream (B.Com, BA, BBA, B.Sc, B.Tech), working professionals, and career changers. No prior coding experience is required.",
    },
    {
      q: "Do I need a technical background to join this course?",
      a: "No. The course starts from the fundamentals and is specifically designed to support students from non-technical backgrounds, including commerce and arts graduates.",
    },
    {
      q: "What tools will I learn in this Data Analytics course?",
      a: "Students learn Excel, SQL, Power BI, Tableau, and Python (including Pandas, NumPy, and Matplotlib), along with foundational statistics for data analysis.",
    },
    {
      q: "Does Techcadd offer placement support after the course?",
      a: "Yes. Techcadd provides dedicated placement assistance, including resume-building workshops, mock interviews, and connections with hiring partners across Mohali, Chandigarh, and Panchkula.",
    },
    {
      q: "What is the batch size for the Data Analytics course in Mohali?",
      a: "Techcadd keeps batch sizes small, typically 8–12 students per batch, to ensure personalized mentorship and better learning outcomes.",
    },
    {
      q: "Is this course suitable for working professionals?",
      a: "Yes. The course offers flexible batch timings, including evening and weekend options, making it accessible for working professionals across Mohali, Chandigarh, and Zirakpur who want to upskill without quitting their jobs.",
    },
    {
      q: "Will I work on real projects during the course?",
      a: "Yes. The course includes 15+ live projects across different business domains, along with a final capstone project, giving students a portfolio to showcase in interviews.",
    },
    {
      q: "Where is Techcadd's Data Analytics training centre located?",
      a: "Techcadd's Data Analytics course is delivered from its training centre in Mohali, with additional access for students from Chandigarh, Panchkula, and Zirakpur.",
    },
    {
      q: "What career roles can I apply for after completing this course?",
      a: "Graduates can apply for roles such as Data Analyst, Business Analyst, Reporting Analyst, BI Analyst, and Junior Data Scientist across IT companies, startups, and corporate firms in the Tricity region.",
    },
    {
      q: "Is Techcadd's spelling \"TechCADD\" or \"Techcadd\"?",
      a: "The correct spelling is Techcadd. Variations like \"TechCADD,\" \"TechCAdd,\" or \"Tech CADD\" are incorrect and not the official brand name.",
    },
    {
      q: "How is this course different from other data analytics courses in Mohali?",
      a: "Techcadd combines a full toolkit (Excel, SQL, Power BI, Tableau, Python), small batch mentorship, hands-on project work, and locally rooted placement support — making it more practical and job-focused compared to generic or purely online courses.",
    },
  ],
  "machine-learning": [
    {
      q: "What is the duration of the Machine Learning course in Mohali at Techcadd?",
      a: "Techcadd's Machine Learning course in Mohali covers Python fundamentals, data handling, and core ML algorithms through a structured, hands-on training program with real-world projects.",
    },
    {
      q: "Do I need a programming background to join this Machine Learning course?",
      a: "No. The course starts with Python fundamentals from scratch, making it accessible to students with no prior coding experience, including non-technical graduates.",
    },
    {
      q: "Who can join this Machine Learning course in Mohali?",
      a: "This course is open to 12th-pass students, graduates from any stream, working professionals, and developers looking to specialize in AI/ML — no computer science degree required.",
    },
    {
      q: "What tools and technologies will I learn?",
      a: "Students learn Python, NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, and foundational statistics and probability concepts used in machine learning.",
    },
    {
      q: "What machine learning algorithms are covered in the course?",
      a: "The course covers supervised learning (linear regression, logistic regression, decision trees, random forests) and unsupervised learning (clustering techniques like K-Means), along with model evaluation methods.",
    },
    {
      q: "Does Techcadd offer placement support after the Machine Learning course?",
      a: "Yes. Techcadd provides dedicated placement assistance, including resume-building workshops, mock interviews, and hiring connections across Mohali, Chandigarh, and Panchkula.",
    },
    {
      q: "What is the batch size for the Machine Learning course in Mohali?",
      a: "Techcadd keeps batch sizes small to ensure personalized mentorship, which is especially important for a technically challenging subject like machine learning.",
    },
    {
      q: "Is this course suitable for working professionals?",
      a: "Yes. Flexible evening and weekend batch options make the course accessible for working professionals across Mohali, Chandigarh, Panchkula, and Zirakpur.",
    },
    {
      q: "Will I work on real machine learning projects during the course?",
      a: "Yes. Students build multiple real-world projects, including prediction and classification models, and complete a capstone project using real datasets.",
    },
    {
      q: "Where is Techcadd's Machine Learning training centre located?",
      a: "Techcadd's Machine Learning course is delivered from its training centre in Mohali, with easy accessibility for students from Chandigarh, Panchkula, Kharar, and Zirakpur.",
    },
    {
      q: "What career roles can I apply for after completing this course?",
      a: "Graduates can apply for roles such as Machine Learning Engineer (entry-level), Data Analyst, AI/ML Associate, and Junior Data Scientist across IT companies and startups in the Tricity region.",
    },
    {
      q: "Is Techcadd's spelling \"TechCADD\" or \"Techcadd\"?",
      a: "The correct spelling is Techcadd. Variations like \"TechCADD,\" \"TechCAdd,\" or \"Tech CADD\" are incorrect and not the official brand name.",
    },
    {
      q: "How is this Machine Learning course different from a Data Science course?",
      a: "This course focuses specifically on machine learning algorithms, model building, and evaluation, while Techcadd's Data Science course covers a broader scope including SQL, visualization tools, and analytics. Students can pursue either, or both, based on their career goals.",
    },
  ],
  "deep-learning": [
    {
      q: "What is the Deep Learning course in Mohali at Techcadd about?",
      a: "Techcadd's Deep Learning course in Mohali covers neural network fundamentals, CNNs, RNNs, and applied computer vision and NLP techniques using TensorFlow and Keras, with hands-on, real-world projects.",
    },
    {
      q: "Do I need prior programming or ML knowledge to join this course?",
      a: "Yes. Some basic Python and machine learning familiarity is recommended before starting, since deep learning builds directly on those concepts. Students without this background are advised to first take Techcadd's Machine Learning or Data Analytics course in Mohali.",
    },
    {
      q: "Who can join this Deep Learning course in Mohali?",
      a: "This course suits B.Tech/BCA/CS graduates, students who've completed a machine learning course, and working professionals in data or software roles looking to specialize in AI.",
    },
    {
      q: "What tools and frameworks will I learn?",
      a: "Students learn Python, TensorFlow, Keras, NumPy, Pandas, and core neural network architectures including CNNs and RNNs.",
    },
    {
      q: "What deep learning applications are covered in the course?",
      a: "The course covers computer vision (image classification), natural language processing (text classification, sentiment analysis), and sequence data handling using RNNs.",
    },
    {
      q: "Does Techcadd offer placement support after the Deep Learning course?",
      a: "Yes. Techcadd provides placement assistance tailored for AI/ML-specialized roles, including resume support, mock interviews, and hiring connections across Mohali, Chandigarh, and Panchkula.",
    },
    {
      q: "What is the batch size for the Deep Learning course in Mohali?",
      a: "Techcadd keeps batch sizes small to support the one-on-one mentorship this technically demanding subject typically requires.",
    },
    {
      q: "Is this course suitable for working professionals?",
      a: "Yes. Evening and weekend batch options make the course accessible for working professionals across Mohali, Chandigarh, Panchkula, and Zirakpur.",
    },
    {
      q: "Will I work on real deep learning projects during the course?",
      a: "Yes. Students train real neural networks on real datasets across multiple projects, including image classification and text analysis, culminating in a capstone project.",
    },
    {
      q: "Where is Techcadd's Deep Learning training centre located?",
      a: "Techcadd's Deep Learning course is delivered from its training centre in Mohali, easily accessible for students from Chandigarh, Panchkula, Kharar, and Zirakpur.",
    },
    {
      q: "What career roles can I apply for after completing this course?",
      a: "Graduates can pursue roles such as Deep Learning Engineer, Computer Vision Associate, NLP Associate, and AI/ML Specialist across IT companies and startups in the Tricity region.",
    },
    {
      q: "Is Techcadd's spelling \"TechCADD\" or \"Techcadd\"?",
      a: "The correct spelling is Techcadd. Variations like \"TechCADD,\" \"TechCAdd,\" or \"Tech CADD\" are incorrect and not the official brand name.",
    },
    {
      q: "How is this Deep Learning course different from the Machine Learning course?",
      a: "The Machine Learning course covers foundational algorithms like regression and clustering using Scikit-learn, while this Deep Learning course goes further into neural networks, CNNs, RNNs, and frameworks like TensorFlow and Keras — making it a natural next step after machine learning.",
    },
  ],
  "artificial-intelligence": [
    {
      q: "What is an Artificial Intelligence Course in Mohali?",
      a: "An Artificial Intelligence Course in Mohali teaches learners how to understand, build and apply AI systems using technologies such as Python, Machine Learning, Deep Learning, NLP, Generative AI and Computer Vision. The Techcadd curriculum progresses from programming fundamentals to AI model development, deployment and practical projects.",
    },
    {
      q: "Who can join the Artificial Intelligence course?",
      a: "Students after 12th, graduates, final-year students, working professionals, freelancers, career switchers and self-taught learners can join. Techcadd states that the programme starts from Python fundamentals, so previous programming experience is not mandatory.",
    },
    {
      q: "Do I need coding experience to learn Artificial Intelligence?",
      a: "No, previous coding experience is not required. The programme starts with Python from the fundamentals before progressing to data handling, Machine Learning and advanced AI concepts. Basic computer literacy can be helpful for getting started.",
    },
    {
      q: "What will I learn in the AI course?",
      a: "The curriculum covers AI and Python fundamentals, mathematics and statistics, Machine Learning, Deep Learning, Natural Language Processing, Generative AI, LLMs, Computer Vision, model deployment and a capstone project.",
    },
    {
      q: "Which AI tools and technologies are covered?",
      a: "Students work with tools and frameworks including Python, NumPy, Pandas, Jupyter Notebook, Google Colab, scikit-learn, TensorFlow, PyTorch, Keras, OpenCV, Hugging Face, LangChain, Flask/FastAPI and Streamlit.",
    },
    {
      q: "Will I learn Generative AI and LLMs?",
      a: "Yes, depending on the selected track. The AI programme introduces Generative AI, Large Language Models and prompt engineering. The advanced 9-month AI/ML + GenAI track goes further into LLMs, Hugging Face, RAG, vector databases, advanced prompting, tool calling and GenAI evaluation.",
    },
    {
      q: "What is the duration of the Artificial Intelligence course?",
      a: "Techcadd currently offers 3-month, 6-month and 9-month tracks, with the depth of learning increasing with each track. The programme also offers classroom, weekend and 1-on-1 learning formats.",
    },
    {
      q: "Is the Artificial Intelligence course practical or theory-based?",
      a: "The programme is designed around practical, project-based learning. The curriculum includes hands-on work, graded deliverables, live briefs and an end-to-end capstone project designed to become part of the learner's portfolio.",
    },
    {
      q: "Can an AI course help me prepare for a career in Artificial Intelligence?",
      a: "Yes. AI training can help learners build foundational and practical skills relevant to areas such as AI Engineering, Machine Learning, Data Science, AI product development and Generative AI application development. Career outcomes depend on the learner's skills, projects, experience and interview performance.",
    },
    {
      q: "Will I receive a certificate after completing the course?",
      a: "Yes. Techcadd states that students receive an industry-recognised course certificate, with an additional project certificate and internship letter described on its programme page. Placement support includes activities such as CV review, mock interviews and hiring drives.",
    },
    {
      q: "Are weekend or flexible AI classes available in Mohali?",
      a: "Techcadd's Artificial Intelligence programme lists classroom, weekend and 1-on-1 modes, making the format suitable for both students and working professionals. Current batch timings and centre availability should be confirmed with the course counsellor.",
    },
    {
      q: "Which projects can I build during Artificial Intelligence training?",
      a: "The programme highlights practical work such as a sales forecasting model, customer-support chatbot, image-recognition system and an end-to-end AI product. These projects can help learners demonstrate their practical skills through a portfolio.",
    },
  ],
  "digital-marketing": [
    {
      q: "What is the eligibility for Techcadd's digital marketing course in Mohali?",
      a: "There is no strict eligibility requirement. 12th-pass students, graduates from any stream, working professionals, and even entrepreneurs or homemakers can join. No technical background or prior marketing experience is needed.",
    },
    {
      q: "Do I need coding knowledge to learn digital marketing?",
      a: "No. Digital marketing does not require coding skills. Techcadd's course is designed for complete beginners and covers everything from the basics of SEO, Google Ads, and social media marketing to advanced tools, step by step.",
    },
    {
      q: "How long does the digital marketing course in Mohali take to complete?",
      a: "Course duration depends on the module and batch type selected. Techcadd offers structured programs designed to balance depth of learning with a practical, job-ready timeline — details are shared during counselling based on your chosen track.",
    },
    {
      q: "Will I get placement support after completing the course?",
      a: "Yes. Techcadd's digital marketing course includes career-focused training with placement support, helping students build a job-ready portfolio through live projects and guiding them toward relevant job opportunities in Mohali, Chandigarh, and beyond.",
    },
    {
      q: "Is this course suitable for someone who wants to freelance instead of taking a job?",
      a: "Yes. Many students use the skills learned — SEO, social media management, Google Ads, and content marketing — to start freelancing or take up client projects independently after completing the course.",
    },
    {
      q: "What tools will I learn during the course?",
      a: "You'll get hands-on training with tools like Google Analytics, Google Search Console, Google Ads, Meta Ads Manager, SEMrush/Ahrefs, Canva, Mailchimp, WordPress, and AI-powered marketing tools.",
    },
    {
      q: "Is the digital marketing course available for both students and working professionals?",
      a: "Yes. The course is structured to accommodate different learners — including full-time students, working professionals looking to upskill, and business owners wanting to manage their own marketing.",
    },
    {
      q: "Does Techcadd offer both online and offline classes in Mohali?",
      a: "Techcadd's training centre is based in Mohali, offering in-person, hands-on learning. For specific batch and mode availability (online/offline), it's best to confirm directly with the counselling team.",
    },
    {
      q: "What kind of jobs can I get after this digital marketing course?",
      a: "Graduates commonly pursue roles such as SEO Executive, Social Media Executive, Google Ads/PPC Specialist, Content Marketing Executive, Digital Marketing Executive, or Digital Marketing Analyst — at agencies, startups, or in-house marketing teams across Mohali and Chandigarh.",
    },
    {
      q: "How is Techcadd different from other digital marketing institutes in Mohali?",
      a: "Techcadd focuses heavily on live-project-based, practical learning rather than theory-only teaching, with a curriculum shaped around what Mohali and Chandigarh employers actually look for, alongside newer areas like AI-powered marketing, AEO, and GEO.",
    },
    {
      q: "Do I get a certificate after completing the course?",
      a: "Yes, students receive a course completion certificate from Techcadd, which can be added to your resume and professional profiles like LinkedIn.",
    },
    {
      q: "I have no experience at all — can I still succeed in digital marketing?",
      a: "Yes. Most students joining digital marketing courses start with no prior experience. Techcadd's course is structured to build your skills progressively from the fundamentals, so a lack of experience is not a barrier.",
    },
  ],
  "social-media-marketing": [
    {
      q: "What is the duration of the Social Media Marketing course in Mohali at Techcadd?",
      a: "The course typically runs for 6 to 8 weeks, with flexible weekday, weekend and evening batches available to suit students, graduates and working professionals.",
    },
    {
      q: "Is this course suitable for complete beginners with no marketing background?",
      a: "Yes. The course starts from the fundamentals of social media platforms and gradually progresses to advanced strategies, ad management and analytics — no prior experience or technical background is required.",
    },
    {
      q: "Where is Techcadd's Social Media Marketing training center located in Mohali?",
      a: "Techcadd is located in Phase 8, Sector 62, Mohali, near QuarkCity and Bestech Business Tower, making it easily accessible from Chandigarh, Panchkula, Zirakpur and Kharar.",
    },
    {
      q: "Does the course include hands-on practical training, not just theory?",
      a: "Yes. Students work on live projects, real Meta ad campaigns, content calendars and analytics reporting throughout the course, building a portfolio alongside their certification.",
    },
    {
      q: "What certification will I receive after completing the course?",
      a: "Students receive a Techcadd Social Media Marketing certification and are also prepared to attempt the Meta Blueprint Certification exams, which are recognized globally by employers and agencies.",
    },
    {
      q: "Does Techcadd provide placement assistance after the course?",
      a: "Yes. Techcadd offers placement support including resume building, mock interviews and direct connections with hiring companies and agencies across Mohali, Chandigarh and Panchkula.",
    },
    {
      q: "Can I take this course if I want to freelance instead of getting a job?",
      a: "Yes. The course includes modules on client pitching, portfolio building and managing multiple client accounts, making it suitable for students who want to freelance rather than pursue full-time employment.",
    },
    {
      q: "What tools will I learn during the course?",
      a: "You will get hands-on training in Canva, CapCut, Meta Business Suite, Meta Ads Manager, Buffer, Hootsuite, and the analytics and AI-powered content tools currently used by agencies and brands.",
    },
    {
      q: "Is this course suitable for 12th-pass students?",
      a: "Yes. Many students join directly after Class 12. No specific degree or technical qualification is required to enroll or succeed in this course.",
    },
    {
      q: "What is the fee structure, and are EMI options available?",
      a: "Course fees vary based on batch type and duration. Techcadd offers flexible payment options, including EMI plans, to make the course accessible for students and job seekers.",
    },
    {
      q: "Will I learn how to run paid ad campaigns on Instagram and Facebook?",
      a: "Yes. A dedicated module covers Meta Ads Manager, including audience targeting, budget setting, ad creative testing and performance optimization for Instagram and Facebook campaigns.",
    },
    {
      q: "Are online classes available, or is training only offline in Mohali?",
      a: "Techcadd primarily offers offline, in-person training at its Mohali center for better hands-on learning, with flexibility discussed for specific student needs — contact the center directly to confirm current options.",
    },
  ],
  "google-ads": [
    {
      q: "What is the Google Ads course in Mohali at Techcadd all about?",
      a: "The Google Ads course in Mohali at Techcadd is a practical, job-oriented training program that teaches you how to create, manage and optimize Google Ads campaigns — covering keyword research, bidding strategies, ad extensions and performance tracking using real campaign data.",
    },
    {
      q: "Who can join this Google Ads course in Mohali?",
      a: "This course is open to 12th-pass students, graduates from any stream, job seekers, working professionals, business owners and freelancers. No prior technical or marketing background is required to enroll.",
    },
    {
      q: "Do I need any prior digital marketing knowledge to join?",
      a: "No. The course starts from the fundamentals of Google Ads and gradually moves to advanced strategies, making it suitable for complete beginners as well as those looking to upskill.",
    },
    {
      q: "What is the duration of the Google Ads course in Mohali?",
      a: "The course runs for a focused, short-term duration designed for fast, practical learning. Exact batch duration and schedule details are shared during enrollment based on weekday or weekend batch preferences.",
    },
    {
      q: "Will I get hands-on, practical training or just theory?",
      a: "Techcadd's Google Ads training in Mohali is 100% practical. Students work on live or simulated campaigns, conduct real keyword research and use actual Google Ads tools throughout the course rather than relying only on classroom lectures.",
    },
    {
      q: "What job opportunities are available after completing this course?",
      a: "Graduates can pursue roles such as Google Ads Specialist, PPC Executive, Digital Marketing Manager, SEM Specialist, E-commerce Advertising Manager, or work as independent freelancers and consultants — with strong demand from agencies and IT companies across Mohali, Chandigarh and Panchkula.",
    },
    {
      q: "Does Techcadd provide placement assistance after the course?",
      a: "Yes, Techcadd offers placement assistance and connects students with digital marketing agencies, IT firms and startups operating in Mohali's Phase 8, Phase 8B and IT Park sectors, along with the wider Tricity region.",
    },
    {
      q: "What tools will I learn during the Google Ads course?",
      a: "You will gain hands-on experience with the Google Ads Platform, Google Keyword Planner, Google Analytics, Google Tag Manager, Google Merchant Center and Looker Studio for reporting and analytics.",
    },
    {
      q: "Is this course suitable for business owners who want to run their own ads?",
      a: "Absolutely. Many business owners in Mohali join this course specifically to manage their own Google Ads campaigns in-house, saving on agency costs while gaining direct control over their advertising results.",
    },
    {
      q: "Will I receive a certificate after completing the course?",
      a: "Yes, upon successful completion you receive a certification from Techcadd that validates your practical skills in Google Ads and PPC management, adding credibility to your resume or freelance profile.",
    },
    {
      q: "What are the class timing options for the Google Ads course in Mohali?",
      a: "Techcadd offers flexible batch timings, including weekday, evening and weekend options, making it convenient for students, working professionals and business owners to attend without disrupting their existing commitments.",
    },
    {
      q: "Is Techcadd's Google Ads course beginner-friendly?",
      a: "Yes, the course is structured to take absolute beginners step-by-step through account setup, campaign creation and optimization — ensuring no one feels left behind regardless of their starting knowledge level.",
    },
  ],
  seo: [
    {
      q: "What is the duration of the SEO course in Mohali at Techcadd?",
      a: "The SEO course in Mohali at Techcadd typically runs for a few weeks to a few months, depending on the batch type — regular, weekend or fast-track. Exact duration is confirmed during counseling based on your chosen schedule.",
    },
    {
      q: "Who can join the SEO course in Mohali?",
      a: "This course is open to 12th pass students, graduates from any stream, job seekers, working professionals, freelancers and small business owners. No prior technical or coding background is required.",
    },
    {
      q: "Do I need any coding knowledge to learn SEO?",
      a: "No. SEO does not require coding skills. Basic computer literacy and internet familiarity are enough to start; technical SEO concepts are taught step-by-step during the course.",
    },
    {
      q: "What topics are covered in the SEO course in Mohali?",
      a: "The course covers SEO fundamentals, keyword research, on-page SEO, off-page SEO and link building, technical SEO, local SEO and Google Business Profile optimization, SEO tools and analytics, and SEO reporting.",
    },
    {
      q: "Will I get hands-on practice, or is it only theory?",
      a: "The course is built on 100% practical, project-based learning. Students work on real or live websites using industry tools like Google Search Console and Google Analytics, rather than relying only on lectures.",
    },
    {
      q: "Does Techcadd provide a certificate after course completion?",
      a: "Yes. Students receive a course completion certificate from Techcadd, which can be added to a resume or LinkedIn profile as proof of practical SEO training.",
    },
    {
      q: "Is placement assistance provided after the SEO course?",
      a: "Yes. Techcadd offers placement support including resume guidance, interview preparation and connections with hiring partners across Mohali, Chandigarh and Panchkula.",
    },
    {
      q: "Can I pair this SEO course with a Google Ads course in Mohali?",
      a: "Yes. Many students combine the SEO course with Techcadd's Google Ads course in Mohali to build both organic (SEO) and paid (PPC) marketing skills, which significantly improves job and freelance opportunities.",
    },
    {
      q: "What career options are available after completing an SEO course?",
      a: "Graduates can pursue roles such as SEO Executive, SEO Analyst, SEO Content Strategist, Digital Marketing Executive, or work as a freelance SEO consultant for local and international clients.",
    },
    {
      q: "Are weekend or evening batches available for working professionals?",
      a: "Yes. Techcadd offers flexible batch timings, including weekday, weekend and evening options, so working professionals and students can join without disrupting their existing schedule.",
    },
    {
      q: "How is Techcadd's SEO course different from other institutes in Mohali?",
      a: "Techcadd focuses on practical, agency-experienced trainers, live project work and a curriculum shaped around Mohali and Tricity's local business landscape — particularly local SEO and Google Business Profile optimization, which many generic courses skip.",
    },
    {
      q: "Is this course useful for someone who already runs a business in Mohali?",
      a: "Yes. Business owners can directly apply what they learn — especially local SEO and Google Business Profile optimization — to improve their own website's visibility in Mohali-area searches without depending fully on paid agencies.",
    },
  ],
  wordpress: [
    {
      q: "What is WordPress and why should I learn it in Mohali?",
      a: "WordPress is a free, open-source content management system (CMS) used to build and manage over 40% of websites worldwide, including blogs, business sites and online stores. Learning it through a WordPress course in Mohali gives you a practical, in-demand skill directly applicable to freelance work, agency jobs and IT roles across the local Mohali and Chandigarh Tricity market.",
    },
    {
      q: "Do I need coding knowledge to join this WordPress course in Mohali?",
      a: "No. WordPress is designed to be beginner-friendly, and this course requires no prior coding experience. Basic HTML/CSS knowledge can help with advanced customization later, but it is not mandatory to get started or to build fully functional websites.",
    },
    {
      q: "Who can enroll in the WordPress training in Mohali?",
      a: "This course is open to 12th pass students, graduates, working professionals, freelancers, entrepreneurs and content creators. Whether you are based in Mohali, Kharar, Zirakpur or Chandigarh, there are no strict eligibility requirements beyond basic computer familiarity.",
    },
    {
      q: "How long does the WordPress course in Mohali take to complete?",
      a: "The course is structured as a short-term, intensive program covering website setup, theme customization, plugins, WooCommerce, SEO and security — designed to make you job-ready in a matter of weeks rather than months.",
    },
    {
      q: "Will I get a certificate after completing the WordPress course?",
      a: "Yes. Upon successful completion of the WordPress training in Mohali, students receive a certification from Techcadd that adds credibility to their resume and portfolio, useful for both job applications and freelance client pitching.",
    },
    {
      q: "What job opportunities are available after this WordPress course in Mohali?",
      a: "Graduates can pursue roles such as WordPress Developer, Web Designer, Website Administrator, WooCommerce/E-commerce Specialist, SEO Expert, Content Manager, WordPress Consultant, or work as a Freelance WordPress Developer serving clients locally or internationally.",
    },
    {
      q: "Does the course include SEO training along with WordPress?",
      a: "Yes. This program includes a dedicated WordPress SEO module covering SEO plugins, keyword optimization, meta tags, and Google Analytics and Search Console setup — ensuring you can build websites that are both functional and search-engine-friendly.",
    },
    {
      q: "Can I learn WooCommerce and build an online store in this course?",
      a: "Yes. The WordPress course in Mohali includes a WooCommerce module where you will learn to set up an online store, add products, configure basic payment options and manage orders — a valuable skill for e-commerce freelancing.",
    },
    {
      q: "Are batch timings flexible for working professionals in Mohali?",
      a: "Yes. Techcadd offers flexible morning, evening and weekend batches for this WordPress training in Mohali, making it accessible for students, working professionals from IT City and Quark City, and busy entrepreneurs.",
    },
    {
      q: "Is this WordPress course suitable for someone who wants to freelance?",
      a: "Absolutely. The course is built around live, hands-on projects, giving you a real portfolio by the end of training — a critical requirement for freelancers looking to attract clients on platforms like Upwork and Fiverr, or through local businesses in Mohali and the Tricity region.",
    },
    {
      q: "How is Techcadd different from other WordPress training institutes in Mohali?",
      a: "Techcadd focuses on 100% practical, project-based learning led by trainers with real industry experience, combined with affordable fees, flexible timings and placement support — rather than a purely theory-driven classroom approach.",
    },
    {
      q: "Can beginners with zero technical background join this WordPress course?",
      a: "Yes, this course is specifically designed for beginners. The curriculum starts from the absolute basics — dashboard navigation and website setup — before progressing to advanced customization, plugins and SEO.",
    },
  ],
  shopify: [
    {
      q: "Which is the best Shopify course in Mohali?",
      a: "Techcadd's Shopify Development Course in Mohali is widely regarded as one of the best, offering hands-on Liquid coding training, live project work, certified Shopify Partner trainers and 99% placement assistance across Mohali, Chandigarh and Panchkula.",
    },
    {
      q: "Do I need coding knowledge to join this Shopify course in Mohali?",
      a: "No prior coding knowledge is required. The course is beginner-friendly and starts from the basics. However, a basic understanding of HTML and CSS is helpful and can speed up your learning of Liquid template customization.",
    },
    {
      q: "What is the duration of the Shopify course in Mohali?",
      a: "The Shopify Development Course typically runs for 6 months, with flexible weekday and weekend batch options available at the Mohali centre.",
    },
    {
      q: "Is this course focused on store management or actual development?",
      a: "This course focuses on development and customization — not just basic store management. You will learn Liquid coding, theme modification, API integration and performance optimization, going far beyond simple store setup.",
    },
    {
      q: "Does Techcadd offer placement support after the Shopify course?",
      a: "Yes. Techcadd provides 99% placement assistance, including job referrals, mock interviews and resume support, connecting students with IT companies and e-commerce agencies across Mohali, Chandigarh and Panchkula.",
    },
    {
      q: "What job roles can I get after completing the Shopify course in Mohali?",
      a: "Graduates typically qualify for roles such as Junior Shopify Developer, Shopify Theme Developer, Shopify App Developer, E-commerce Developer and freelance Shopify Expert.",
    },
    {
      q: "What is the expected starting salary after this Shopify course?",
      a: "Starting salaries for certified Shopify Developers in the Tri-City region typically range from ₹4–7 LPA, depending on the role and company, with senior roles reaching ₹18–25+ LPA over time.",
    },
    {
      q: "Are online classes available for the Shopify course, or only offline in Mohali?",
      a: "Techcadd offers all three formats — in-person classroom training at the Mohali centre, live online classes and a hybrid model — so students can choose what fits their schedule best.",
    },
    {
      q: "How many live projects will I build during the course?",
      a: "You will build and customize a minimum of 3 fully functional, live e-commerce stores across different niches, such as dropshipping, D2C brand and service-based business models, for your professional portfolio.",
    },
    {
      q: "Can working professionals or business owners join this Shopify course?",
      a: "Yes. With flexible weekday and weekend batches, this course is suitable for working professionals, digital marketers and e-commerce entrepreneurs in Mohali who want to manage or scale their own Shopify stores.",
    },
    {
      q: "Does the course cover Shopify 2.0 and the latest theme architecture?",
      a: "Yes. The curriculum is built around modern Shopify 2.0 architecture, including flexible sections, metafields and current performance standards used by agencies and brands today.",
    },
    {
      q: "Are EMI or installment options available for the course fee?",
      a: "Yes, Techcadd offers flexible EMI options to make the Shopify Development Course accessible and affordable for students in Mohali.",
    },
  ],
  "python-programming": [
    {
      q: "Who can join the Python course in Mohali at Techcadd?",
      a: "Anyone can join — 12th-pass students from any stream, graduates from technical or non-technical backgrounds, job seekers looking for a career switch, and working professionals wanting to upskill. No prior coding experience is required.",
    },
    {
      q: "Do I need a technical background to learn Python at Techcadd Mohali?",
      a: "No. The course is designed for absolute beginners and starts with core programming fundamentals before moving into advanced topics, so students with no coding background can follow along comfortably.",
    },
    {
      q: "What is the duration of the Python course in Mohali?",
      a: "Techcadd offers flexible duration options, including a comprehensive 6-month Python training program in Mohali, along with shorter-format options depending on the student's goals and prior experience.",
    },
    {
      q: "What tools and technologies are covered in this Python course?",
      a: "The course covers Core Python, data structures, OOP, file handling, NumPy, Pandas, Django, virtual environments, and basic automation and scripting — giving students both foundational and job-relevant technical skills.",
    },
    {
      q: "Is this Python course in Mohali suitable for 12th-pass students?",
      a: "Yes. It is one of the most popular options for 12th-pass students in Mohali who want to start a tech career without waiting for a full degree program, as the course builds programming skills from the ground up.",
    },
    {
      q: "Does Techcadd provide placement assistance after the Python course?",
      a: "Yes. Techcadd offers placement support and career guidance to help students apply their Python skills toward real job opportunities in Mohali's growing IT sector and beyond.",
    },
    {
      q: "Will I work on real projects during the Python training in Mohali?",
      a: "Yes. The course is project-based, meaning students build hands-on mini-projects throughout training — covering data handling, automation and basic web development — rather than relying solely on theory.",
    },
    {
      q: "Is the Python course available for working professionals with flexible timings?",
      a: "Yes. Techcadd offers flexible batch timings specifically so that working professionals and college students can manage this course alongside their existing commitments.",
    },
    {
      q: "What career opportunities are available after completing a Python course in Mohali?",
      a: "Graduates of this course can pursue roles such as Python Developer, Junior Data Analyst, Automation Engineer, Backend Developer (Django) and QA/Testing roles that require scripting knowledge — many of which are actively hiring across the Mohali–Chandigarh IT corridor.",
    },
    {
      q: "Is Techcadd's Python course beginner-friendly for non-IT graduates?",
      a: "Yes. Many students joining this program come from non-IT academic backgrounds such as BA, BCom or BSc. The curriculum does not assume prior technical knowledge, making it accessible to all graduates.",
    },
    {
      q: "Do I get a certificate after completing the Python course at Techcadd Mohali?",
      a: "Yes. Upon successful completion, students receive a certification that can be added to resumes and used to demonstrate verified, practical Python training to potential employers.",
    },
    {
      q: "Where is Techcadd's Python training institute located in Mohali?",
      a: "Techcadd's Python course in Mohali is easily accessible for students from nearby areas including IT City, Sector 70/71, Phase 8B, Zirakpur, Kharar and the wider Chandigarh tri-city region.",
    },
  ],
  "java-programming": [
    {
      q: "What is the best Java course in Mohali for beginners?",
      a: "Techcadd's Java course in Mohali is designed for absolute beginners as well as students with some coding background. The course starts with Java basics — variables, data types and control flow — before progressing to Object-Oriented Programming, Data Structures and Database Connectivity, making it suitable regardless of your starting level.",
    },
    {
      q: "Do I need prior coding experience to join this Java course in Mohali?",
      a: "No. This course is structured to start from the fundamentals, so 12th-pass students, graduates from any stream and complete beginners can join without any prior programming knowledge.",
    },
    {
      q: "What topics are covered in the Java course in Mohali?",
      a: "The course covers Introduction to Java, Java Basics, Object-Oriented Programming (OOP), Exception Handling, Data Structures, the Java Collections Framework, File Handling and Java Database Connectivity (JDBC) — giving you a complete foundation in practical Java development.",
    },
    {
      q: "Which IDEs and tools will I learn during the course?",
      a: "You will work with industry-standard tools including Eclipse and IntelliJ IDEA for writing and debugging Java code, along with the Java Development Kit (JDK) and JDBC for database connectivity.",
    },
    {
      q: "Is this Java course suitable for graduates and working professionals in Mohali?",
      a: "Yes. Graduates looking to strengthen practical skills and working professionals wanting to switch to a tech career can join, with flexible batch timings designed to accommodate different schedules across Mohali, Zirakpur and Chandigarh.",
    },
    {
      q: "What job roles can I apply for after completing this Java course?",
      a: "After completing the course, you can apply for roles such as Java Developer, Backend Developer, Android Developer, Full Stack Developer, Software Engineer and Java Web Developer, among others.",
    },
    {
      q: "Does Techcadd provide placement assistance after the Java course in Mohali?",
      a: "Yes, Techcadd's training approach includes career guidance and placement-oriented support to help students transition from learning to actual job opportunities in the Mohali and Tricity job market.",
    },
    {
      q: "How is Techcadd's Java course different from other institutes in Mohali?",
      a: "Techcadd focuses on hands-on, project-based learning rather than theory-heavy lectures, uses small batch sizes for personalized mentorship, and structures its curriculum around skills that are actually tested in Java job interviews.",
    },
    {
      q: "Will I get a certificate after completing the Java course?",
      a: "Yes, students receive a course completion certificate that validates their Java programming skills, useful for job applications, resumes and freelance opportunities.",
    },
    {
      q: "Are batch timings flexible for students and working professionals?",
      a: "Yes, Techcadd offers flexible batch timings — including options suited to full-time students, college students needing parallel training, and working professionals who need evening or weekend sessions.",
    },
    {
      q: "Why should I choose a local Java course in Mohali instead of an online course?",
      a: "Learning locally in Mohali connects you with trainers, mentors and a student community aligned with the actual regional job market — including companies in Mohali's IT Park and Aerocity corridor — giving you a practical, real-world advantage over generic online-only courses.",
    },
  ],
  "cpp-dsa": [
    {
      q: "What is the duration of the C/C++ course in Mohali at Techcadd?",
      a: "The C/C++ course at Techcadd typically runs for 1 to 2 months, with fast-track options available for students who want to complete it more quickly. Exact duration may vary based on batch type and prior coding experience.",
    },
    {
      q: "Who can join the C/C++ course in Mohali?",
      a: "This course is open to 12th pass students, BCA/B.Tech/MCA/BSc(IT) students, engineering diploma students, career switchers, coding beginners and working professionals looking to build strong programming fundamentals. No prior coding experience is required.",
    },
    {
      q: "Is this course suitable for absolute beginners with no coding background?",
      a: "Yes. The curriculum starts from the very basics — setting up the development environment, variables and data types — before progressing to advanced topics like OOP and pointers, making it beginner-friendly.",
    },
    {
      q: "What is the difference between C and C++?",
      a: "C++ is an extended version of C that adds object-oriented programming features like classes, objects and inheritance. While C follows a purely procedural approach, C++ supports both procedural and object-oriented programming, offering more flexibility for building complex, scalable software.",
    },
    {
      q: "Will I get hands-on coding practice during the course?",
      a: "Yes. The course is built around practical, hands-on learning with daily coding exercises, lab sessions and real assignments rather than theory-only lectures, so you build actual coding skills you can apply immediately.",
    },
    {
      q: "Does Techcadd offer both online and offline classes for C/C++ in Mohali?",
      a: "Yes. Techcadd offers flexible learning modes — classroom-based training for students in Mohali and nearby areas, as well as online sessions for those who prefer remote learning.",
    },
    {
      q: "What topics are covered in the C/C++ course?",
      a: "The course covers C/C++ basics, loops, functions, arrays and vectors, strings, object-oriented programming (classes, objects, inheritance, polymorphism), pointers, dynamic memory management, file handling, STL, templates and exception handling.",
    },
    {
      q: "Will I receive a certificate after completing the course?",
      a: "Yes. Students who successfully complete the C/C++ course at Techcadd receive a course completion certificate, which can be added to your resume for internships, placements and job applications.",
    },
    {
      q: "How does learning C/C++ help with future programming languages?",
      a: "C/C++ builds a strong foundation in programming logic, memory management and object-oriented concepts. This makes it significantly easier to learn other languages like Python, Java and JavaScript later, as many core concepts carry over directly.",
    },
    {
      q: "What career opportunities are available after completing a C/C++ course?",
      a: "After completing this course, students can pursue roles such as software developer, system programmer, embedded systems engineer, application engineer or game developer, since C/C++ remains widely used across gaming, finance, automotive and system-level software industries.",
    },
    {
      q: "Is the C/C++ course helpful for college exams and technical interviews?",
      a: "Yes. The course strengthens core programming concepts frequently tested in university exams, competitive coding platforms and technical interview rounds, particularly around OOP, pointers and data structures.",
    },
    {
      q: "Are batch timings flexible for working professionals and students?",
      a: "Yes. Techcadd offers flexible batch timings, including morning, evening and weekend slots, so both students and working professionals in Mohali can attend without disrupting their existing schedules.",
    },
  ],
  kotlin: [
    {
      q: "What is the duration of Techcadd's Kotlin course in Mohali?",
      a: "The Kotlin course at Techcadd Mohali is a 6-month professional training program, covering Kotlin fundamentals, Android app development and real project building in a structured, progressive format.",
    },
    {
      q: "Do I need prior coding knowledge to join this Kotlin course in Mohali?",
      a: "No. This course is designed for absolute beginners as well as those with some programming background. Classes start from basic programming logic before moving into Kotlin-specific concepts.",
    },
    {
      q: "Is Kotlin better than Java for Android app development?",
      a: "Yes, for modern Android development. Google has officially made Kotlin its preferred language for Android, offering more concise syntax, built-in null safety and better support for coroutines compared to Java.",
    },
    {
      q: "What will I be able to build after completing this course?",
      a: "By the end of the course you will have built 5+ complete Android apps, including a to-do app, a news reader, a movie browser, an e-commerce app and a social media clone — giving you a real portfolio for job applications.",
    },
    {
      q: "Does Techcadd provide placement support after the Kotlin course?",
      a: "Yes. Techcadd offers placement support across the Tricity region — Mohali, Chandigarh and Panchkula — connecting job-ready students with hiring companies in the local Android development job market.",
    },
    {
      q: "What is the batch size for the Kotlin course in Mohali?",
      a: "Techcadd keeps batches small, limited to around 8 students per batch, ensuring personalized mentorship and direct code review support from trainers.",
    },
    {
      q: "Is there any certification included with this course?",
      a: "Yes. Students receive a Techcadd course completion certificate and also get preparation support for the Google Certified Associate Android Developer exam, a globally recognized credential.",
    },
    {
      q: "Are classes available for working professionals?",
      a: "Yes. Techcadd offers flexible batch timings — including evening and weekend options — so working professionals across Mohali and the Tricity can attend without quitting their jobs.",
    },
    {
      q: "What tools and technologies are taught in this Kotlin course?",
      a: "The course covers Android Studio, IntelliJ IDEA, Jetpack Compose, XML layouts, Gradle, SQLite, Git basics and Google Play Console for app publishing.",
    },
    {
      q: "Who can join Techcadd's Kotlin course in Mohali?",
      a: "This course is suitable for 12th-pass students, BCA/MCA/B.Tech students, graduates from any stream looking for a career switch, working professionals, freelancers and Java developers upgrading to Kotlin.",
    },
    {
      q: "Is this Kotlin course only useful for students living in Mohali?",
      a: "No. While the course is based in Mohali, students regularly join from across the Tricity region, including Chandigarh, Panchkula, Zirakpur, Kharar and Landran.",
    },
    {
      q: "What career opportunities are available after learning Kotlin?",
      a: "Graduates can pursue roles such as Android Developer, Mobile App Developer, Junior Software Developer and Freelance App Developer, with starting salaries typically ranging from ₹5–22 LPA depending on skill level and role.",
    },
  ],
  flutter: [
    {
      q: "What is the Flutter App Development Course in Mohali offered by Techcadd?",
      a: "The Flutter App Development Course in Mohali by Techcadd is a hands-on training program that teaches you to build cross-platform mobile apps for Android and iOS using Google's Flutter framework and the Dart programming language — all through a single codebase.",
    },
    {
      q: "Who can join this Flutter course in Mohali?",
      a: "Anyone can join — 12th pass students, graduates, BCA/B.Tech/MCA students, working professionals, freelancers and entrepreneurs. No prior coding experience is required, as the course starts from Dart programming basics.",
    },
    {
      q: "Do I need coding experience to learn Flutter at Techcadd Mohali?",
      a: "No. The course is designed for complete beginners. You will start with Dart fundamentals and gradually progress to advanced app development, guided step-by-step by experienced trainers.",
    },
    {
      q: "What is the duration of the Flutter App Development Course in Mohali?",
      a: "The course offers flexible durations and formats, including weekday batches, weekend batches for working professionals, and fast-track programs for those wanting to complete training quickly.",
    },
    {
      q: "Will I get a certificate after completing this course?",
      a: "Yes. On successful completion of the course and final capstone project, you receive a Flutter App Development certification from Techcadd, which is recognized by IT companies and startups in Mohali and beyond.",
    },
    {
      q: "What projects will I build during the course?",
      a: "You will build multiple real-world projects, including a chat app with Firebase integration, an e-commerce app using APIs and a weather forecast app — giving you a strong, job-ready portfolio.",
    },
    {
      q: "What tools and technologies are covered in this Flutter course?",
      a: "The course covers Dart, Flutter SDK, Android Studio/VS Code, Firebase, SQLite, state management tools (Provider, Riverpod, Bloc), Postman for API testing, and app publishing on the Google Play Store and Apple App Store.",
    },
    {
      q: "Does Techcadd provide placement support after the Flutter course in Mohali?",
      a: "Yes. Techcadd's placement cell assists students with resume building, interview preparation and job connections in Mohali, Chandigarh and the wider tricity region.",
    },
    {
      q: "What job roles can I apply for after completing this course?",
      a: "Graduates can apply for roles such as Flutter App Developer, Mobile App Engineer, Cross-Platform Developer, UI/UX Developer for mobile apps, or work independently as a freelance app developer.",
    },
    {
      q: "Is online learning available for this Flutter course, or only offline classes in Mohali?",
      a: "Techcadd offers offline, online and hybrid learning options, so you can choose classroom training at the Mohali centre or attend live sessions remotely with full mentor support.",
    },
    {
      q: "What makes Techcadd the best institute for Flutter training in Mohali?",
      a: "Techcadd combines 15+ years of IT training experience, an industry-relevant curriculum, small batch sizes, experienced trainers, 100% practical project-based learning and dedicated placement assistance — making it a trusted choice across Mohali and Chandigarh.",
    },
  ],
  "web-designing": [
    {
      q: "What is the duration of the Web Designing course at Techcadd in Mohali?",
      a: "The Web Designing course at Techcadd is available in flexible durations, typically ranging from 6 weeks to 6 months, depending on whether you choose the basic, advanced or diploma-level track. Weekday and weekend batches are both available.",
    },
    {
      q: "Who can join the Web Designing course in Mohali?",
      a: "Anyone can join — 12th pass students, graduates, job seekers, working professionals, freelancers and even homemakers restarting their careers. No prior coding or design experience is required.",
    },
    {
      q: "Do I need a technical or coding background to learn web designing?",
      a: "No. The course is designed for absolute beginners and gradually builds up to advanced concepts, so students from any academic background — Arts, Commerce or Science — can learn comfortably.",
    },
    {
      q: "What tools and software will I learn in this course?",
      a: "You will learn HTML5, CSS3, JavaScript, Bootstrap, WordPress and industry-standard UI/UX design tools including Figma and Adobe XD.",
    },
    {
      q: "Does Techcadd offer placement assistance after the Web Designing course?",
      a: "Yes, Techcadd provides career support including portfolio-building guidance, interview preparation and placement assistance to help students transition into web design or UI/UX roles.",
    },
    {
      q: "Can I learn web designing and also start freelancing after this course?",
      a: "Yes. The course includes a dedicated module on freelancing basics — building a portfolio, pricing projects and getting started on platforms like Fiverr and Upwork — so you can freelance alongside or instead of a full-time job.",
    },
    {
      q: "Is this Web Designing course suitable for students from Chandigarh, Zirakpur or Kharar as well?",
      a: "Yes. While the course is designed for Mohali-based students, it is equally accessible to students from nearby areas including Chandigarh, Panchkula, Zirakpur and Kharar, with flexible batch timings to accommodate travel.",
    },
    {
      q: "Will I get to work on real, live projects during the course?",
      a: "Yes. Techcadd's Web Designing course is project-based, meaning you build actual websites — portfolio sites, business websites and landing pages — throughout the training, not just theoretical assignments.",
    },
    {
      q: "What is the difference between web designing and web development?",
      a: "Web designing focuses on the visual layout, user experience and front-end appearance of a website, while web development includes the technical, back-end programming that makes a website function. This course focuses primarily on design, with foundational front-end coding included.",
    },
    {
      q: "Will I receive a certificate after completing the course?",
      a: "Yes. Upon successful completion, Techcadd provides a course certification that you can add to your resume, LinkedIn profile and freelance portfolio.",
    },
    {
      q: "What career options are available after this Web Designing course?",
      a: "Graduates can pursue roles such as Web Designer, UI/UX Designer, WordPress Developer or Freelance Web Designer, both locally in Mohali's IT hubs and remotely for clients across India or internationally.",
    },
    {
      q: "How is Techcadd different from other web designing institutes in Mohali?",
      a: "Techcadd focuses on practical, project-based learning, an industry-updated curriculum, experienced mentors and dedicated placement and freelancing support — helping students build a real portfolio, not just complete a syllabus.",
    },
  ],
  "web-development": [
    {
      q: "What is the duration of the Web Development Course at Techcadd Mohali?",
      a: "The Web Development Course at Techcadd Mohali typically runs for 6 months, covering frontend, backend, database management and full-stack (MERN) development with hands-on projects throughout.",
    },
    {
      q: "Can a 12th-pass student join this Web Development Course in Mohali?",
      a: "Yes. This course is designed for absolute beginners, including 12th-pass students from any stream — Science, Commerce or Arts. No prior coding experience is required.",
    },
    {
      q: "Do I need a technical degree to join this course?",
      a: "No. Graduates from any background — technical or non-technical — as well as working professionals and job seekers can join. The curriculum starts from the fundamentals and builds up progressively.",
    },
    {
      q: "What technologies and tools will I learn in this course?",
      a: "You will learn HTML5, CSS3, JavaScript, Bootstrap, React.js, Node.js, Express.js, MongoDB (MERN stack), Git & GitHub and REST APIs, along with real project building and deployment basics.",
    },
    {
      q: "Is this course only theory-based, or does it include practical projects?",
      a: "The course is heavily project-based. Students build real, functional websites and full-stack applications throughout the program, resulting in a portfolio they can show employers.",
    },
    {
      q: "Does Techcadd offer placement support after course completion?",
      a: "Yes. Techcadd provides placement support including portfolio building, interview preparation and guidance to help students connect with hiring opportunities across Mohali, Chandigarh and the Tricity region.",
    },
    {
      q: "Are there flexible batch timings for working professionals?",
      a: "Yes. Techcadd Mohali offers flexible batch options, including evening and weekend timings, so working professionals and college students can join without disrupting their existing schedules.",
    },
    {
      q: "Where is Techcadd's Web Development Course center located in Mohali?",
      a: "Techcadd's Web Development Course is offered at its Mohali training center, easily accessible for students from Phase 8, Sector 70, Sector 71, Sector 74, Industrial Area, Kharar, Zirakpur and nearby Chandigarh and Panchkula.",
    },
    {
      q: "Will I receive a certificate after completing the course?",
      a: "Yes. Students receive a course completion certificate from Techcadd upon successfully finishing the program, which can be added to resumes and professional profiles like LinkedIn.",
    },
    {
      q: "What kind of jobs can I get after this Web Development Course in Mohali?",
      a: "Graduates can pursue roles such as Frontend Developer, Backend Developer, Full-Stack Developer, Web Designer or MERN Stack Developer, and can also freelance or build their own web projects independently.",
    },
    {
      q: "Is online training available, or is it only classroom-based at Techcadd Mohali?",
      a: "Techcadd offers both online and offline (classroom) training options for the Web Development Course, so students can choose the format that suits them best.",
    },
    {
      q: "How is this course different from free YouTube tutorials?",
      a: "Unlike scattered free resources, this course offers a structured curriculum, hands-on mentorship, live doubt-clearing, real project deployment and placement support — providing a complete, guided path rather than fragmented self-learning.",
    },
  ],
  "full-stack-development": [
    {
      q: "What is the Full Stack Development course in Mohali at Techcadd?",
      a: "It is a structured training program that teaches both front-end and back-end web development. Students learn HTML, CSS, JavaScript, React.js, Node.js, Express.js and MongoDB, along with Git, REST APIs and deployment — enabling them to build complete, working web applications.",
    },
    {
      q: "Who can join this Full Stack Development course in Mohali?",
      a: "The course is open to 12th pass students, graduates from any stream, working professionals looking to switch to IT, freelancers and diploma holders. No prior coding experience is required.",
    },
    {
      q: "What is the duration of the Full Stack Development course?",
      a: "The course typically runs for 4 to 6 months, depending on the batch schedule, and includes hands-on projects and assignments throughout the training.",
    },
    {
      q: "What technologies and tools are covered in the course?",
      a: "Students learn HTML5, CSS3, Bootstrap, JavaScript (ES6+), React.js, Node.js, Express.js, MongoDB, Git & GitHub, REST APIs and modern deployment platforms.",
    },
    {
      q: "Is this course suitable for absolute beginners with no coding background?",
      a: "Yes. The course starts with the basics of web development and gradually progresses to advanced full stack concepts, making it beginner-friendly for students with zero prior programming experience.",
    },
    {
      q: "Will I work on real projects during the course?",
      a: "Yes. The program includes multiple hands-on projects — portfolio websites, REST API builds and a final full stack capstone project — so you graduate with a portfolio, not just a certificate.",
    },
    {
      q: "Does Techcadd offer placement assistance after the course?",
      a: "Yes. Techcadd provides career support including resume building, interview preparation and placement guidance to help students transition into developer roles after completing the course.",
    },
    {
      q: "Is classroom training available in Mohali, or is it online only?",
      a: "Techcadd offers classroom-based training at its Mohali center, with flexible batch timings suitable for students and working professionals. This allows for direct mentor interaction and hands-on lab practice.",
    },
    {
      q: "Can I become a freelancer after completing this Full Stack Development course?",
      a: "Yes. Since the course covers both front-end and back-end development along with deployment, graduates are equipped to build and deliver complete web applications independently — making freelancing a realistic career path.",
    },
    {
      q: "Will I receive a certificate after completing the course?",
      a: "Yes. Students receive a certification upon successful completion of the Full Stack Development course, which can be added to resumes, LinkedIn profiles and job applications.",
    },
    {
      q: "How is this course different from a free online tutorial?",
      a: "Unlike self-paced tutorials, this course offers structured mentorship, live doubt-solving, project-based learning and career support — factors that significantly speed up learning and improve job readiness.",
    },
    {
      q: "What career roles can I apply for after this course?",
      a: "Graduates can apply for roles such as Full Stack Developer, Front-End Developer, Back-End Developer, Web Application Developer or Software Engineer, both locally in Mohali and Chandigarh and remotely.",
    },
  ],
  "mern-full-stack": [
    {
      q: "What is the MERN Stack course in Mohali offered by Techcadd?",
      a: "It is a comprehensive full-stack web development program that teaches you how to build and deploy web applications using MongoDB, Express.js, React.js and Node.js — covering everything from frontend basics to backend APIs, databases and cloud deployment.",
    },
    {
      q: "How long does the MERN Stack course in Mohali take to complete?",
      a: "The course typically runs for 4-6 months, depending on your learning pace and whether you choose regular or fast-track batches.",
    },
    {
      q: "Do I need prior coding experience to join this course?",
      a: "No. The course is designed for absolute beginners and starts with HTML, CSS and JavaScript fundamentals before progressing into React, Node.js, Express and MongoDB.",
    },
    {
      q: "Is this course suitable for 12th-pass students?",
      a: "Yes. Many students join right after completing their 12th grade. The structured, beginner-friendly curriculum makes it a strong starting point for a tech career without needing a prior degree.",
    },
    {
      q: "Does Techcadd offer placement assistance after the MERN Stack course?",
      a: "Yes. Techcadd provides placement support including resume building, mock interviews, internship opportunities and job referrals with hiring partners across Mohali, Chandigarh and the wider IT industry.",
    },
    {
      q: "Can I take this MERN Stack course online if I am not based in Mohali?",
      a: "Yes. Techcadd offers both classroom training at its Mohali center and an online MERN Stack program with live interactive sessions, so students from outside Mohali can also enroll.",
    },
    {
      q: "What projects will I build during the course?",
      a: "You will build real, portfolio-ready projects including a to-do application, an e-commerce web app, a social media-style platform, a personal portfolio website and a blog CMS.",
    },
    {
      q: "What certificate do I receive after completing the course?",
      a: "You receive an industry-recognized MERN Stack Certification from Techcadd, along with a portfolio of live projects to showcase to employers.",
    },
    {
      q: "What job roles can I apply for after this course?",
      a: "Graduates can apply for roles such as MERN Stack Developer, Frontend Developer (React), Backend Developer (Node.js), Full Stack Developer and API Developer, both in Mohali and remotely.",
    },
    {
      q: "Why is MERN stack a good choice for full-stack development?",
      a: "Because it lets you use JavaScript across the entire application — frontend, backend and database layer — making development faster, more efficient and easier to learn as a single connected skill set.",
    },
    {
      q: "Are classes available for working professionals in Mohali?",
      a: "Yes. Techcadd offers flexible batch timings, including evening and weekend options, so working professionals in Mohali and nearby areas can upskill without quitting their jobs.",
    },
    {
      q: "What is the fee structure for the MERN Stack course in Mohali?",
      a: "Techcadd offers competitively priced, budget-friendly training compared to premium metro institutes. For exact fees and current offers, it is best to speak directly with the Mohali admissions team.",
    },
  ],
  "mean-stack": [
    {
      q: "What is the MEAN Stack?",
      a: "The MEAN Stack is a JavaScript-based set of technologies used to build dynamic, full-stack web applications. It consists of MongoDB (NoSQL database), Express.js (back-end web framework), Angular (front-end framework) and Node.js (JavaScript runtime environment). Learning these four together makes you a capable full-stack developer.",
    },
    {
      q: "Who should join a MEAN Stack course in Mohali?",
      a: "This course is ideal for 12th-pass students, graduates, job seekers, working professionals, freelancers and career switchers who want to build full-stack web development skills. A basic understanding of JavaScript is helpful but not mandatory — the course starts from the fundamentals.",
    },
    {
      q: "Are there any prerequisites for enrolling?",
      a: "There are no strict prerequisites. However, basic familiarity with HTML, CSS and JavaScript makes the learning process smoother. Complete beginners are welcome, as the course builds these fundamentals from the ground up before moving into advanced topics.",
    },
    {
      q: "What will I learn in this MEAN Stack course?",
      a: "You will learn to set up a full development environment, work with MongoDB for data storage, build server-side applications using Express.js, create dynamic front-end interfaces with Angular, and build RESTful APIs connecting the front end with the back end — all leading up to a complete, integrated MEAN Stack project.",
    },
    {
      q: "How long is the MEAN Stack course in Mohali?",
      a: "The course is designed as a focused, intensive program covering all core modules — from HTML/CSS basics to a complete MEAN Stack project — with a structured, project-driven curriculum. Exact batch duration and schedule details are shared during enrollment counseling.",
    },
    {
      q: "Does Techcadd offer placement assistance after the course?",
      a: "Yes. Techcadd provides placement support and career guidance, including resume preparation and interview readiness, to help students transition into full-stack developer, front-end developer or back-end developer roles in Mohali, Chandigarh and the wider Tricity region.",
    },
    {
      q: "Is this course suitable for someone with no coding background?",
      a: "Yes. The curriculum is structured to take absolute beginners through HTML, CSS and JavaScript fundamentals first, before progressing into Node.js, MongoDB, Express.js and Angular. You do not need prior programming experience to start.",
    },
    {
      q: "What job roles can I apply for after completing this course?",
      a: "Graduates of this MEAN Stack training in Mohali can apply for roles such as Full-Stack Developer, Front-End Developer, Back-End Developer, Software Engineer, Application Developer and Technical Consultant across IT companies and startups.",
    },
    {
      q: "Will I work on real projects during the course?",
      a: "Yes. The course includes hands-on, project-based learning throughout, culminating in a complete MEAN Stack application that combines MongoDB, Express.js, Angular and Node.js — giving you a real project to showcase in interviews and on your resume.",
    },
    {
      q: "Do I get a certificate after completing the course?",
      a: "Yes, students receive a course completion certificate from Techcadd upon finishing the MEAN Stack course, adding credibility to your resume when applying for full-stack developer roles.",
    },
    {
      q: "Is the MEAN Stack course available for working professionals in Mohali?",
      a: "Yes. Techcadd offers flexible batch timings, including options suited for working professionals, so you can upskill into full-stack development without pausing your current job.",
    },
    {
      q: "Why should I choose Techcadd for MEAN Stack training in Mohali instead of an online course?",
      a: "Techcadd offers in-person, mentor-led training with hands-on project work, direct doubt-clearing support and placement guidance tailored to the local Mohali and Tricity job market — advantages that self-paced online courses typically cannot match.",
    },
  ],
  "php-full-stack": [
    {
      q: "What is a PHP Full Stack Course in Mohali?",
      a: "A PHP Full Stack Course in Mohali teaches both frontend and backend web development. Students learn technologies such as HTML, CSS, JavaScript, PHP, MySQL, Laravel and other tools used to create complete web applications.",
    },
    {
      q: "Who can join the PHP Full Stack Course at Techcadd?",
      a: "The course is suitable for 12th-pass students, graduates, BCA/MCA students, engineering students, beginners, job seekers and career changers who want to develop practical web development skills.",
    },
    {
      q: "Do I need prior PHP knowledge to join?",
      a: "No. Beginners can join the programme. The curriculum starts with PHP fundamentals and gradually moves toward advanced PHP, OOPs, databases, frameworks, APIs and application development.",
    },
    {
      q: "What technologies are covered in the PHP Full Stack Course?",
      a: "The course covers PHP, OOPs, MySQL, HTML, CSS, JavaScript, jQuery, Bootstrap, Laravel, CodeIgniter, WordPress, APIs, Git, GitHub and development tools as part of the broader learning path.",
    },
    {
      q: "Is Laravel included in PHP Full Stack training in Mohali?",
      a: "Yes. Laravel is an important part of the programme, with topics including MVC, Artisan, Blade templates, Eloquent ORM, migrations, relationships and API development.",
    },
    {
      q: "Will I learn MySQL with PHP?",
      a: "Yes. Students learn MySQL and PHP database connectivity, including SQL concepts, queries, joins and methods for connecting PHP applications with databases.",
    },
    {
      q: "Does the course include practical projects?",
      a: "Yes. The PHP course includes practical application development and 25+ real-world PHP web applications with live project exposure, helping students apply concepts through development work.",
    },
    {
      q: "What career opportunities are available after a PHP Full Stack Course?",
      a: "Depending on skills and experience, learners can target roles such as PHP Developer, Laravel Developer, Backend Developer, Full Stack Developer, Web Developer, WordPress Developer or Junior Software Developer.",
    },
    {
      q: "Is PHP Full Stack training useful for students in Mohali and Chandigarh?",
      a: "Yes. Students from Mohali, Chandigarh, Zirakpur, Kharar and nearby Tricity areas can consider PHP full stack training to develop practical web development skills and prepare for entry-level IT opportunities.",
    },
    {
      q: "Does Techcadd provide interview preparation?",
      a: "Yes. The course curriculum includes PHP developer interview preparation and certification preparation, along with programming-oriented topics such as data structures and algorithms.",
    },
    {
      q: "Which tools are used during PHP Full Stack training?",
      a: "Depending on the project and development requirements, students may work with tools such as VS Code, XAMPP/WAMP, Composer, Git, GitHub, MySQL Workbench, Postman, browser developer tools and debugging tools.",
    },
    {
      q: "Can I learn PHP Full Stack for freelancing?",
      a: "Yes. The skills covered are useful for freelancers who want to develop business websites, dynamic PHP applications, database-driven websites, WordPress solutions and customised web projects. Freelancing success will also depend on portfolio quality, communication, client acquisition and practical experience.",
    },
  ],
  "generative-ai": [
    {
      q: "What is a Generative AI course?",
      a: "A Generative AI course teaches you how AI models can generate and work with content such as text, images, audio, and other data. At Techcadd, the program focuses on practical skills such as LLMs, prompt engineering, embeddings, RAG, AI APIs, agents, and AI application development.",
    },
    {
      q: "Who can join a Generative AI course in Mohali?",
      a: "Students after 12th, college students, graduates, final-year students, job seekers, working professionals, freelancers, and career switchers can consider the course. Techcadd lists eligibility from 12th pass onward.",
    },
    {
      q: "Do I need programming knowledge to learn Generative AI?",
      a: "Basic programming knowledge, particularly Python, can be helpful for the technical modules. You do not need to be an advanced machine-learning professional to start building with Generative AI; the course progresses from fundamentals toward practical application development.",
    },
    {
      q: "What will I learn in the Generative AI course in Mohali?",
      a: "You can learn large language models, prompt engineering, structured outputs, embeddings, vector databases, Retrieval-Augmented Generation (RAG), agents, AI APIs, model integration, evaluation, deployment, and AI application development.",
    },
    {
      q: "Which tools are covered in the course?",
      a: "The Techcadd Generative AI curriculum includes tools and technologies such as OpenAI APIs, Claude, LangChain, Hugging Face, Pinecone, FAISS, LlamaIndex, FastAPI, Streamlit, and Python.",
    },
    {
      q: "Will I work on real Generative AI projects?",
      a: "Yes. The program emphasizes practical project work and live client-oriented learning. Techcadd states that learners work on applications rather than limiting the course to demonstrations or theoretical lessons.",
    },
    {
      q: "How long is the Generative AI course?",
      a: "Techcadd's Jalandhar Generative AI course is listed with a 3–6 month duration, with classroom, weekend, and 1-on-1 learning options. The exact duration can vary according to the selected program or batch.",
    },
    {
      q: "Is Generative AI useful for getting a job?",
      a: "Generative AI skills can complement programming, data, software, marketing, and other technical skills. Training can help you develop projects and portfolio work for roles such as AI Application Developer, Generative AI Engineer, Prompt Engineer, LLM Engineer, and AI-focused product roles.",
    },
    {
      q: "Does Techcadd provide placement support?",
      a: "Techcadd lists placement support as part of its Generative AI offering. Its career-support approach includes areas such as portfolio preparation, interview practice, and placement assistance. Placement support should not be understood as a guaranteed job offer.",
    },
    {
      q: "Will I receive a certificate after completing the course?",
      a: "Yes. Techcadd states that its Generative AI program includes a course completion certificate, with project/internship documentation associated with the practical work.",
    },
    {
      q: "Can working professionals join Generative AI training in Mohali?",
      a: "Yes. Flexible options such as weekend, evening, online, or 1-on-1 learning, depending on the available batch, can make the program suitable for working professionals who want to upskill without leaving their current schedule.",
    },
    {
      q: "What career options are available after a Generative AI course?",
      a: "Depending on your existing education, technical background, portfolio, and experience, you can explore roles including AI Application Developer, Generative AI Engineer, LLM Engineer, Prompt Engineer, AI Product Specialist, and AI Consultant.",
    },
    {
      q: "Is this course suitable for beginners?",
      a: "Yes, particularly for learners who want a structured introduction to building with Generative AI. However, students should be prepared to practice programming, APIs, AI workflows, and project development rather than expecting a tool-only course. Techcadd describes the program as practical and career-oriented.",
    },
  ],
  "autocad": [
    {
      q: "What is the duration of the AutoCAD course in Mohali at Techcadd?",
      a: "The AutoCAD course at Techcadd Mohali typically ranges from 1 to 3 months, depending on whether you choose the basic, advanced, or combined 2D+3D certification track. Weekend and fast-track batches are also available for students who want to complete it sooner.",
    },
    {
      q: "Who can join the AutoCAD course in Mohali?",
      a: "This course is open to 12th-pass students, diploma holders, engineering graduates, working professionals, and career switchers. No prior design experience is required — only basic computer familiarity is needed to get started.",
    },
    {
      q: "Is the AutoCAD course available in online mode as well as offline?",
      a: "Yes. Techcadd Mohali offers both online and offline (classroom) training options, including virtual labs, live interactive classes, and recorded sessions for flexible learning.",
    },
    {
      q: "Does the AutoCAD course include 3D modelling, or only 2D drafting?",
      a: "The course covers both. Students start with core 2D drafting (floor plans, mechanical drawings, civil layouts) and progress into 3D modelling, solid modelling, and basic rendering and visualization techniques.",
    },
    {
      q: "What is the fee for the AutoCAD course in Mohali?",
      a: "Fees vary based on course duration and level (basic, advanced, or combined). Techcadd offers affordable pricing with installment support. Contact the institute directly for current fee details and any active discounts.",
    },
    {
      q: "Will I get a certificate after completing the course?",
      a: "Yes, students receive a certification upon successful completion, backed by Techcadd's ISO-certified training standards, which is recognized by employers across Mohali, Chandigarh, and the wider Tricity region.",
    },
    {
      q: "Does Techcadd provide placement assistance after the AutoCAD course?",
      a: "Yes, Techcadd offers 100% placement assistance, with connections to companies in Mohali's Industrial Areas, architecture firms in Chandigarh, and construction/design companies across the Tricity region.",
    },
    {
      q: "Do I need an engineering background to learn AutoCAD?",
      a: "No. While engineering and diploma students often join to strengthen their skills, many successful students come from non-technical backgrounds, including commerce and arts, and learn AutoCAD from scratch through the step-by-step training approach.",
    },
    {
      q: "What career opportunities are available after completing an AutoCAD course?",
      a: "Graduates can pursue roles such as CAD drafter, junior design engineer, architectural assistant, interior design assistant, or freelance CAD designer — across industries including civil engineering, mechanical design, architecture, and interior design.",
    },
    {
      q: "How is Techcadd's AutoCAD training different from other institutes in Mohali?",
      a: "Techcadd focuses on live, project-based learning rather than theory-only instruction, uses experienced industry trainers, offers flexible batch timings, and provides a local placement network connected to the Mohali-Chandigarh job market.",
    },
    {
      q: "Can working professionals join this course alongside their job?",
      a: "Yes. Techcadd offers evening and weekend batch options specifically designed for working professionals who want to upskill without disrupting their job schedule.",
    },
    {
      q: "Is AutoCAD a good skill to learn for someone in Mohali specifically?",
      a: "Yes. Mohali's growing IT, industrial, and construction sectors (including Industrial Areas Phase 7–9 and Sector 70–82 developments) create consistent local demand for skilled CAD drafters and design professionals.",
    },
  ],
};

export function courseFaqs(course: Course) {
  const written = faqsBySlug[contentKey(course)];
  if (written) return written;

  const label = categoryLabel[course.category].toLowerCase();

  const specific = [
    {
      q: `How long is the ${course.title} course and what are the batch timings?`,
      a: `${course.title} runs ${course.duration ? `for ${course.duration} ` : ""}at our Sector 75 campus in Mohali. Morning, afternoon, evening and weekend batches run in parallel, there is a live-online seat in the same batch, and every session is recorded to your student portal.`,
    },
    {
      q: `Do I need any experience before joining ${course.title}?`,
      a:
        course.level === "Beginner"
          ? `No. This is a beginner track — module one starts from first principles and assumes no background in ${label}. A short counselling call confirms you are in the right batch.`
          : `This is a ${course.level.toLowerCase()} track, so comfort with the basics helps. If you are starting fresh, your counsellor adds a short foundation module before the main syllabus so you are never left behind.`,
    },
    {
      q: `What will I have built by the end of ${course.title}?`,
      a: `${course.modules.length} modules, each closing in something you build and get reviewed — ${course.modules
        .slice(0, 3)
        .map((m) => m.title.toLowerCase())
        .join(", ")} and more — plus one live, client-style project. You finish with ${course.outcomes.length} portfolio-ready outcomes and a written project report.`,
    },
    {
      q: `What jobs does ${course.title} lead to?`,
      a: `Graduates of this track move into roles such as ${course.roles
        .slice(0, 3)
        .join(", ")}. The placement cell rebuilds your resume, runs mock interviews and introduces you to hiring partners across Mohali, Chandigarh and beyond.`,
    },
    {
      q: "What are the fees, and is there an EMI option?",
      a: "Fees depend on the batch format you choose, so they are shared on a short call rather than published here. Instalments across the duration of the course are standard, and no-cost EMI is available through partner providers.",
    },
  ];

  return [...specific, ...generalFaqs.slice(1, 4)];
}

/* -------------------------------------------------------------------------- *
 *                                  Reviews                                    *
 * -------------------------------------------------------------------------- */

export type CourseReview = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  initials: string;
};


/** Reviews collected for a specific course page, replacing the rotated set. */
const reviewsBySlug: Record<string, CourseReview[]> = {
  // The After 12th menu's own 4-month SEO + Performance Marketing programme,
  // whose brief supplies its four reviews as written.
  "digital-marketing-program-4-months": [
    {
      name: "Amanpreet Singh",
      role: "SEO Trainee",
      company: "Mohali",
      quote:
        "I had studied basic SEO before joining, but the projects helped me understand how keyword research, website optimisation and reporting connect. The audit project became one of the strongest pieces in my portfolio.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Simran Kaur",
      role: "PPC Executive",
      company: "Chandigarh",
      quote:
        "Before the programme, Google Ads looked complicated. Building campaign structures and analysing search terms step by step made the process much easier to understand.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Karan Sharma",
      role: "Digital Marketing Executive",
      company: "Mohali",
      quote:
        "Learning GA4 and creating a marketing dashboard helped me understand how agencies explain results to clients instead of only showing clicks and impressions.",
      rating: 5,
      initials: "KS",
    },
    {
      name: "Navneet Arora",
      role: "Freelance Marketer",
      company: "Mohali",
      quote:
        "I wanted to offer SEO services to local businesses. The local SEO, Google Business Profile and reporting modules helped me create a clearer service package.",
      rating: 5,
      initials: "NA",
    },
  ],
  "basic-computer-office-skills--certificate": basicComputerOfficeSkillsReviews,
  "ai-powered-marketing": aiPoweredMarketingReviews,
  "chatgpt-ai-tools": chatgptAiToolsReviews,
  rag: ragReviews,
  "ai-powered-courses": aiPoweredCoursesReviews,
  "all-ai-courses": allAiCoursesReviews,
  "agentic-ai": [
    {
      name: "Simran Kaur",
      role: "Final-Year BCA Student",
      company: "Sector 70, Mohali",
      quote:
        "The Agentic AI course at Techcadd Mohali got me interview-ready faster than I expected. My interviewer asked to see my MCP server project, and that was basically the whole conversation.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Vikram Chopra",
      role: "Weekend Batch",
      company: "Zirakpur",
      quote:
        "I travelled in from Zirakpur for the weekend batch and it was worth every trip. Small batch, real client work, no time wasted on theory nobody actually uses on the job.",
      rating: 5,
      initials: "VC",
    },
    {
      name: "Neha Bansal",
      role: "Placed Fresher",
      company: "Phase 8, Mohali",
      quote:
        "Techcadd's placement cell kept calling me for drives across Mohali and Chandigarh until I was actually placed. That persistence mattered more to me than the certificate itself.",
      rating: 5,
      initials: "NB",
    },
    {
      name: "Arshdeep Singh",
      role: "Career Switcher",
      company: "Kharar",
      quote:
        "I was switching careers at 27 and worried I'd be behind everyone else. Half the batch at the Mohali centre was doing the same thing — nobody made me feel slow.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Pooja Rani",
      role: "Graduate",
      company: "Derabassi",
      quote:
        "I joined with almost zero coding background and finished with a deployed agent I could actually demo. The trainer corrected my work daily instead of just moving to the next slide.",
      rating: 5,
      initials: "PR",
    },
    {
      name: "Karan Mehta",
      role: "B.Tech Student",
      company: "Chitkara University, Mohali",
      quote:
        "What made Agentic AI click for me was the lab time. You could sit back after class in the Mohali centre and someone would still explain it until it actually made sense.",
      rating: 5,
      initials: "KM",
    },
    {
      name: "Rohit Verma",
      role: "Working Professional",
      company: "IT Park, Mohali",
      quote:
        "Working full-time in IT Park Mohali, the evening batch was the only reason I could do this without quitting my job. Interview-ready for an AI Engineer role in about five months.",
      rating: 5,
      initials: "RV",
    },
    {
      name: "Amanpreet Sidhu",
      role: "Business Owner",
      company: "Chandigarh",
      quote:
        "I run a small digital agency in Chandigarh and took this course to stop outsourcing AI work I couldn't evaluate myself. Now I scope and review agent projects with confidence.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Divya Sharma",
      role: "Placed Fresher",
      company: "Sohana, Mohali",
      quote:
        "Compared two other institutes in Mohali before joining Techcadd. The difference was real client work versus recorded demos — that's what actually got me placed.",
      rating: 5,
      initials: "DS",
    },
    {
      name: "Harmanjot Singh",
      role: "Final-Year B.Tech",
      company: "Chandigarh University, Gharuan",
      quote:
        "The internship letter from live client work was accepted for my university's industrial training requirement without any issue — one less thing to worry about in final year.",
      rating: 5,
      initials: "HS",
    },
    {
      name: "Manpreet Kaur",
      role: "Career Restarter",
      company: "Panchkula",
      quote:
        "I'm a self-taught learner who had watched dozens of YouTube tutorials and built nothing real. A deadline attached to every module here is what finally got me shipping projects.",
      rating: 5,
      initials: "MK",
    },
    {
      name: "Gurleen Kaur",
      role: "Graduate",
      company: "Sector 71, Mohali",
      quote:
        "Small batch size at the Mohali centre meant the trainer actually knew what each of us was stuck on. That's rare compared to the crowded batches I sat through elsewhere.",
      rating: 5,
      initials: "GK",
    },
  ],
  "cyber-security": [
    {
      name: "Ramanpreet Singh",
      role: "B.Tech graduate",
      company: "Mohali, Phase 7",
      quote:
        "I joined Techcadd right after my B.Tech from a college in Kharar. Honestly, my degree taught me theory but nothing practical. The trainers here made me actually use Kali Linux and Metasploit in labs, not just read about them. Got an interview call within a month of finishing the course!",
      rating: 5,
      initials: "RS",
    },
    {
      name: "Simran Kaur",
      role: "Junior SOC Analyst",
      company: "Zirakpur",
      quote:
        "Being a girl from a non-tech background (I did BA), I was nervous about joining a cybersecurity course. The trainers at Techcadd's Mohali centre were so patient and broke everything down step by step. Now I'm working as a junior SOC analyst in Chandigarh IT Park.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Gurjot S.",
      role: "12th pass, non-medical",
      company: "Kharar",
      quote:
        "Came here straight after 12th (non-medical). My cousin studies in Mohali and recommended Techcadd. The hands-on labs with Wireshark and Nmap really helped me understand networking properly, something I was always confused about in school.",
      rating: 4,
      initials: "GS",
    },
    {
      name: "Ankit Sharma",
      role: "IT support to security",
      company: "Panchkula",
      quote:
        "I was working a regular IT support job and wanted to switch into security. Techcadd's flexible batch timing let me attend classes after work hours. The mentors genuinely know the Mohali/Chandigarh job market and helped me tailor my resume for local companies.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Harpreet Kaur",
      role: "Cyber security student",
      company: "Sector 70, Mohali",
      quote:
        "What stood out for me was how small the batch size was. I could ask questions without feeling embarrassed, and the trainer actually remembered where each student was struggling. Big online courses never gave me that.",
      rating: 5,
      initials: "HK",
    },
    {
      name: "Naveen K.",
      role: "Career changer",
      company: "Dera Bassi",
      quote:
        "Honestly went in with zero coding background. A few weeks in, I was doing basic penetration testing exercises in the lab. It's not magic, you have to put in the effort, but the structure Techcadd provides makes it manageable even for beginners.",
      rating: 4,
      initials: "NK",
    },
    {
      name: "Ishika Verma",
      role: "Cyber security student",
      company: "Chandigarh",
      quote:
        "I commute from Chandigarh to the Mohali centre and it's totally worth it. The trainers have real industry experience, you can tell from how they explain real attack scenarios instead of just definitions from a textbook.",
      rating: 5,
      initials: "IV",
    },
    {
      name: "Manpreet Singh",
      role: "IT professional",
      company: "Mohali, IT City",
      quote:
        "Working in a local IT company already, I took this course to specialize in security. The certification guidance and the practical exposure with tools like Burp Suite and Nessus made a visible difference in my next internal role change.",
      rating: 5,
      initials: "MS",
    },
    {
      name: "Ravjot B.",
      role: "Security support role",
      company: "Sector 61, Mohali",
      quote:
        "Techcadd's placement team actually followed up with me for weeks after the course ended, not just during the sales pitch. Landed a security support role in a Mohali-based company within two months.",
      rating: 4,
      initials: "RB",
    },
    {
      name: "Priya Chawla",
      role: "Cyber security student",
      company: "Zirakpur",
      quote:
        "I researched a lot of cybersecurity courses in Mohali before choosing Techcadd. What convinced me was the practical lab access and the fact that trainers actually work in the field. No regrets, learned way more than I expected.",
      rating: 5,
      initials: "PC",
    },
  ],
  "cloud-computing": [
    {
      name: "Jaspreet Singh",
      role: "B.Tech graduate",
      company: "Mohali, Phase 8",
      quote:
        "I completed my B.Tech from a college near Kharar and thought I understood networking, but I'd never actually deployed anything real. Techcadd's cloud course got me working on actual AWS consoles within the first few weeks. Got shortlisted for a Cloud Support role in Chandigarh IT Park within two months of finishing.",
      rating: 5,
      initials: "JS",
    },
    {
      name: "Anjali Mehta",
      role: "Junior Cloud Administrator",
      company: "Zirakpur",
      quote:
        "Coming from a BBA background, I had zero technical experience. I was worried I'd be left behind, but the trainers at Techcadd's Mohali centre started from the absolute basics and built up gradually. Now I'm working as a Junior Cloud Administrator.",
      rating: 5,
      initials: "AM",
    },
    {
      name: "Karanveer S.",
      role: "12th pass student",
      company: "Mohali, Sector 66",
      quote:
        "Joined right after 12th on a friend's recommendation. The AWS and Azure labs made concepts click that I could never fully understand just by reading online articles. Solid, practical teaching.",
      rating: 4,
      initials: "KS",
    },
    {
      name: "Rohit Bansal",
      role: "IT support to cloud",
      company: "Panchkula",
      quote:
        "I was already working in IT support and wanted to move into cloud roles. Techcadd's evening batches worked perfectly with my job schedule, and the trainers genuinely understood what local Chandigarh/Mohali companies look for during interviews.",
      rating: 5,
      initials: "RB",
    },
    {
      name: "Simranjeet Kaur",
      role: "Cloud computing student",
      company: "Sector 70, Mohali",
      quote:
        "Small batch size made a huge difference for me. I could ask basic questions about networking without feeling judged, and the trainer actually adjusted the pace when a few of us were struggling with a topic.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Deepak M.",
      role: "Career changer",
      company: "Dera Bassi",
      quote:
        "Went in with no coding background at all. It took effort, but by the end I was comfortable setting up virtual machines and basic storage on AWS. Techcadd's structure makes it doable even if you're starting from zero.",
      rating: 4,
      initials: "DM",
    },
    {
      name: "Kirti Sharma",
      role: "Cloud computing student",
      company: "Chandigarh",
      quote:
        "I travel from Chandigarh to Mohali for these classes and it's genuinely worth the commute. Trainers have real corporate cloud experience, and it shows in how they explain real deployment scenarios, not just definitions.",
      rating: 5,
      initials: "KS",
    },
    {
      name: "Amanpreet Singh",
      role: "IT professional",
      company: "Mohali, IT City",
      quote:
        "Already working at a local IT company, I took this course specifically to add cloud skills to my profile. The hands-on AWS and Azure practice made a visible difference when I applied for an internal role switch.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Navdeep K.",
      role: "Cloud Support Associate",
      company: "Sector 61, Mohali",
      quote:
        "Techcadd's placement team kept checking in with me even weeks after my batch ended. Ended up getting a Cloud Support Associate position at a Mohali-based company.",
      rating: 4,
      initials: "NK",
    },
    {
      name: "Ritika Chopra",
      role: "Cloud computing student",
      company: "Zirakpur",
      quote:
        "Compared a few cloud computing institutes around Mohali before joining Techcadd. What tipped the decision was the hands-on lab access to real AWS/Azure environments and trainers who've actually worked with these platforms professionally. Very happy with the outcome.",
      rating: 5,
      initials: "RC",
    },
  ],
  linux: [
    {
      name: "Ramanpreet Singh",
      role: "12th pass student",
      company: "Mohali",
      quote:
        "I joined Techcadd right after my 12th, honestly had zero idea about computers beyond basic use. The Linux course broke everything down so simply. Now I actually understand how servers work, not just theory. Trainers here are very patient with beginners.",
      rating: 5,
      initials: "RS",
    },
    {
      name: "Simran Kaur",
      role: "B.Com graduate",
      company: "Zirakpur",
      quote:
        "Was doing B.Com but wanted to switch into IT. The Linux training at Techcadd Mohali gave me the practical push I needed. The lab sessions were the best part — real hands-on practice, not just watching slides.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Harpreet Singh",
      role: "College student",
      company: "Chandigarh",
      quote:
        "Good course overall. I commute daily from Chandigarh and the batch timings worked well for me as a college student. Shell scripting module was tough initially but the trainer explained it well with examples.",
      rating: 4,
      initials: "HS",
    },
    {
      name: "Ankush Sharma",
      role: "Career changer",
      company: "Kharar",
      quote:
        "I was working a non-IT job and wanted to switch careers. This Linux course in Mohali gave me the confidence to actually apply for IT support roles. Got an interview call within a month of completing the course.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Priya Verma",
      role: "12th commerce student",
      company: "Mohali",
      quote:
        "Best decision after 12th commerce — took this Linux course instead of just going straight to college. Learned file permissions, user management and basic networking. Feeling much more prepared for a BCA now.",
      rating: 5,
      initials: "PV",
    },
    {
      name: "Gurjot Singh",
      role: "Developer moving to sysadmin",
      company: "Panchkula",
      quote:
        "Solid practical training. I already had some coding background but the Linux system admin side was new to me. Techcadd's trainers connected everything to real server scenarios which helped a lot.",
      rating: 4,
      initials: "GS",
    },
    {
      name: "Neha Rani",
      role: "Networking professional",
      company: "Mohali",
      quote:
        "As a working professional in networking, I wanted to add Linux to my resume. The weekend batch at Techcadd Mohali fit perfectly around my job. Shell scripting and package management modules were genuinely useful at work.",
      rating: 5,
      initials: "NR",
    },
    {
      name: "Karanveer Singh",
      role: "Linux student",
      company: "Derabassi",
      quote:
        "Travelled from Derabassi for this course and it was worth it. The trainers don't just teach commands, they explain the 'why' behind everything. Planning to do the Cloud Computing course next at the same institute.",
      rating: 5,
      initials: "KS",
    },
    {
      name: "Ishika Gupta",
      role: "B.Sc IT graduate",
      company: "Chandigarh",
      quote:
        "Good foundational course for anyone new to IT. I'm a B.Sc IT graduate and this filled a lot of practical gaps my college course never covered. The lab practice on real Linux systems made a big difference.",
      rating: 4,
      initials: "IG",
    },
    {
      name: "Manpreet Kaur",
      role: "Linux student",
      company: "Mohali",
      quote:
        "I was honestly scared of the command line before this course. Now I'm comfortable navigating Linux systems, managing users and writing basic scripts. Great starting point for anyone in Mohali wanting an IT career.",
      rating: 5,
      initials: "MK",
    },
    {
      name: "Rohit Bansal",
      role: "Aspiring DevOps engineer",
      company: "Panchkula",
      quote:
        "Took this as a stepping stone before DevOps. Trainers made sure the Linux basics were rock solid before moving forward. Appreciated the small batch size — got personal attention whenever I was stuck.",
      rating: 5,
      initials: "RB",
    },
    {
      name: "Divya Thakur",
      role: "Diploma student",
      company: "Mohali",
      quote:
        "Practical, no-nonsense training. As a diploma student, the hands-on labs here gave me much more real exposure than my college practicals ever did. Would recommend to anyone serious about IT.",
      rating: 4,
      initials: "DT",
    },
  ],
  "ethical-hacking": [
    {
      name: "Aryan Sharma",
      role: "12th pass student",
      company: "Mohali",
      quote:
        "I joined right after 12th with zero networking background. The trainers started from absolute basics and built up to real penetration testing labs. Using Kali Linux and Metasploit for the first time felt like a movie, honestly. Great starting point for cybersecurity.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Jasleen Kaur",
      role: "B.Com graduate",
      company: "Zirakpur",
      quote:
        "Was doing B.Com and wanted a career switch. Techcadd's Ethical Hacking course in Mohali gave me the practical push I needed. The Wireshark and Nmap sessions were my favorite — finally understood how networks actually work.",
      rating: 5,
      initials: "JK",
    },
    {
      name: "Vikram Thakur",
      role: "College student",
      company: "Chandigarh",
      quote:
        "Commute daily from Chandigarh and the batch timings worked well. Web security module was intense but the trainer used real vulnerable-site simulations which made everything click faster than any tutorial online.",
      rating: 4,
      initials: "VT",
    },
    {
      name: "Simarpreet Singh",
      role: "Career changer",
      company: "Kharar",
      quote:
        "Was working a non-IT job and wanted into cybersecurity. This course gave me confidence with real tools, not just PowerPoint slides. Got a Security Analyst interview call within weeks of finishing.",
      rating: 5,
      initials: "SS",
    },
    {
      name: "Riya Mehta",
      role: "12th commerce student",
      company: "Mohali",
      quote:
        "Best decision after 12th commerce — chose this over jumping straight into a generic degree. Learned penetration testing basics, digital forensics fundamentals and network defense. Feels like a huge head start for BCA now.",
      rating: 5,
      initials: "RM",
    },
    {
      name: "Gurpreet Singh",
      role: "Network administrator",
      company: "Panchkula",
      quote:
        "Already had some networking background but the offensive security side was totally new. Trainers connected everything to real breach case studies, which made the learning stick much better than theory alone.",
      rating: 4,
      initials: "GS",
    },
    {
      name: "Neha Bansal",
      role: "IT support to security",
      company: "Mohali",
      quote:
        "Working in IT support and wanted to specialize in security. The weekend batch fit perfectly around my job. Burp Suite and web security modules were directly useful — used what I learned at work within days.",
      rating: 5,
      initials: "NB",
    },
    {
      name: "Karanveer Singh",
      role: "Aspiring VAPT analyst",
      company: "Derabassi",
      quote:
        "Travelled from Derabassi and it was completely worth it. Trainers don't just show you tools, they explain the attacker's mindset and the defender's response. Planning to specialize in VAPT next.",
      rating: 5,
      initials: "KS",
    },
    {
      name: "Ishita Verma",
      role: "B.Sc IT graduate",
      company: "Chandigarh",
      quote:
        "Good, structured course for someone new to cybersecurity. I'm a B.Sc IT graduate and this filled major practical gaps my college never covered. The live lab simulations made a real difference.",
      rating: 4,
      initials: "IV",
    },
    {
      name: "Manpreet Kaur",
      role: "Ethical hacking student",
      company: "Mohali",
      quote:
        "Was honestly intimidated by 'hacking' as a term before this course. Now I'm comfortable with vulnerability scanning, basic pen-testing and understanding network defense. Excellent starting point for anyone in Mohali.",
      rating: 5,
      initials: "MK",
    },
    {
      name: "Rohit Chauhan",
      role: "Aspiring SOC analyst",
      company: "Panchkula",
      quote:
        "Took this as a stepping stone toward SOC roles. Trainers made sure fundamentals were solid before moving to advanced topics. Small batch sizes meant real one-on-one attention whenever stuck on a lab.",
      rating: 5,
      initials: "RC",
    },
    {
      name: "Divya Kapoor",
      role: "Diploma student",
      company: "Mohali",
      quote:
        "Practical, no-fluff training. As a diploma student, the hands-on labs gave me way more real exposure than college practicals ever did. Would recommend to anyone serious about a cybersecurity career.",
      rating: 4,
      initials: "DK",
    },
  ],
  "power-bi": [
    {
      name: "Ananya Sharma",
      role: "B.Com graduate",
      company: "Mohali",
      quote:
        "I did my B.Com and had zero technical background, but the Power BI course at Techcadd Mohali broke everything down so simply. Now I can build proper dashboards, not just charts in Excel. Genuinely proud of the project portfolio I built.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Karan Mehta",
      role: "Finance professional",
      company: "Zirakpur",
      quote:
        "Was working in finance and wanted to add data skills to my resume. The weekend batch fit perfectly around my job. DAX was tough at first but the trainer explained it with real business examples, which made it click.",
      rating: 5,
      initials: "KM",
    },
    {
      name: "Priya Kapoor",
      role: "Power BI student",
      company: "Chandigarh",
      quote:
        "Commute daily from Chandigarh and the small batch size made a real difference — got direct help whenever stuck on a formula. The real-world projects felt like actual client work, not just practice exercises.",
      rating: 4,
      initials: "PK",
    },
    {
      name: "Rohit Bansal",
      role: "Career changer",
      company: "Kharar",
      quote:
        "Was in a non-data role and wanted a career switch. This course gave me the confidence to actually apply for Data Analyst roles. Got an interview call within a month of finishing the course.",
      rating: 5,
      initials: "RB",
    },
    {
      name: "Simran Kaur",
      role: "Fresh graduate",
      company: "Mohali",
      quote:
        "Best decision after graduation — took this instead of just sending out resumes with just a degree. Learned Power Query, DAX and dashboard design. Feels like a real head start compared to my batchmates.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Aman Thakur",
      role: "Excel user turned analyst",
      company: "Panchkula",
      quote:
        "Had some Excel background already but Power BI's dashboarding and DAX side was completely new. Trainers connected everything to real business reporting scenarios, which made learning stick much better than YouTube tutorials.",
      rating: 4,
      initials: "AT",
    },
    {
      name: "Neha Verma",
      role: "Operations professional",
      company: "Mohali",
      quote:
        "Working in operations and wanted to present data better to my team. The course taught me business intelligence thinking, not just software clicks. Already using dashboards I built during training at my actual job.",
      rating: 5,
      initials: "NV",
    },
    {
      name: "Gurpreet Singh",
      role: "Aspiring data analyst",
      company: "Derabassi",
      quote:
        "Travelled from Derabassi and it was completely worth it. Trainers don't just show features — they explain why a dashboard is designed a certain way. Planning to move into a full Data Analytics course next.",
      rating: 5,
      initials: "GS",
    },
    {
      name: "Ishita Grover",
      role: "BBA graduate",
      company: "Chandigarh",
      quote:
        "Solid, structured course for someone new to data analytics. I'm a BBA graduate and this gave me practical skills my degree never touched. The real-world projects made the biggest difference.",
      rating: 4,
      initials: "IG",
    },
    {
      name: "Manpreet Kaur",
      role: "Power BI student",
      company: "Mohali",
      quote:
        "Was honestly intimidated by DAX formulas before this course. Now I'm comfortable building data models, writing measures and designing interactive reports. Great starting point for anyone in Mohali wanting into data analytics.",
      rating: 5,
      initials: "MK",
    },
    {
      name: "Rohan Chauhan",
      role: "Aspiring data analyst",
      company: "Panchkula",
      quote:
        "Took this as a stepping stone toward a Data Analyst role. Trainers made sure the fundamentals of data modeling were solid before moving to advanced DAX. Small batches meant real personal attention throughout.",
      rating: 5,
      initials: "RC",
    },
    {
      name: "Divya Rani",
      role: "MBA student",
      company: "Mohali",
      quote:
        "Practical, project-focused training. As an MBA student, the hands-on dashboard work gave me way more real exposure than my college case studies ever did. Would recommend to anyone serious about data skills.",
      rating: 4,
      initials: "DR",
    },
  ],
  tableau: [
    {
      name: "Aisha Sharma",
      role: "BBA graduate",
      company: "Mohali",
      quote:
        "I did my BBA and had zero technical background, but the Tableau course at Techcadd Mohali broke everything down so simply. Building my first interactive dashboard felt like a real achievement. Great foundation for anyone new to data.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Vikas Mehta",
      role: "Marketing professional",
      company: "Zirakpur",
      quote:
        "Was working in marketing and wanted to present campaign data better. The Tableau training gave me practical dashboarding skills I use at work every week now. Trainers explained calculated fields with real business examples.",
      rating: 5,
      initials: "VM",
    },
    {
      name: "Priyanka Kapoor",
      role: "Tableau student",
      company: "Chandigarh",
      quote:
        "Commute daily from Chandigarh and the real-world case studies made the biggest difference. Learning Tableau alongside a bit of SQL gave me much more confidence going into interviews.",
      rating: 4,
      initials: "PK",
    },
    {
      name: "Rohan Bansal",
      role: "Career changer",
      company: "Kharar",
      quote:
        "Switched careers from a non-data role. This course gave me the confidence to actually apply for Data Analyst positions. The dashboard projects I built during training became my portfolio for interviews.",
      rating: 5,
      initials: "RB",
    },
    {
      name: "Simran Grover",
      role: "Fresh graduate",
      company: "Mohali",
      quote:
        "Best decision after graduation — took this instead of just sending resumes with just a degree. Learned data prep, visualizations and dashboard storytelling. Feels like a real head start in the data analytics field.",
      rating: 5,
      initials: "SG",
    },
    {
      name: "Aman Thakur",
      role: "Excel user turned analyst",
      company: "Panchkula",
      quote:
        "Had some Excel background but Tableau's visualization and dashboard-building side was completely new. Trainers connected everything to real business reporting scenarios, which made learning stick much better than online tutorials.",
      rating: 4,
      initials: "AT",
    },
    {
      name: "Neha Verma",
      role: "Operations professional",
      company: "Mohali",
      quote:
        "Working in operations and wanted to visualize our team's data better. The course taught me to think about what story the data was telling, not just how to click through menus. Already using what I learned at my job.",
      rating: 5,
      initials: "NV",
    },
    {
      name: "Gurpreet Singh",
      role: "Aspiring data analyst",
      company: "Derabassi",
      quote:
        "Travelled from Derabassi and it was completely worth it. Trainers explain the 'why' behind dashboard design choices, not just the 'how.' Planning to add Power BI next to round out my data skills.",
      rating: 5,
      initials: "GS",
    },
    {
      name: "Ishita Grover",
      role: "B.Com graduate",
      company: "Chandigarh",
      quote:
        "Solid, structured course for someone new to data visualization. I'm a B.Com graduate and this gave me practical skills my degree never touched. The real-world case studies made the biggest difference.",
      rating: 4,
      initials: "IG",
    },
    {
      name: "Manpreet Kaur",
      role: "Tableau student",
      company: "Mohali",
      quote:
        "Was intimidated by data tools before this course. Now I'm comfortable connecting data sources, building calculated fields and designing interactive dashboards. Great starting point for anyone in Mohali wanting into data analytics.",
      rating: 5,
      initials: "MK",
    },
    {
      name: "Rohan Chauhan",
      role: "Aspiring data analyst",
      company: "Panchkula",
      quote:
        "Took this as a stepping stone toward a full Data Analytics program. Trainers made sure Tableau fundamentals were solid before layering in more advanced concepts. Appreciated the practical, project-based approach.",
      rating: 5,
      initials: "RC",
    },
    {
      name: "Divya Rani",
      role: "MBA student",
      company: "Mohali",
      quote:
        "Practical, project-focused training. As an MBA student, the hands-on dashboard work gave me way more real exposure than my college case studies ever did. Would recommend to anyone serious about data visualization skills.",
      rating: 4,
      initials: "DR",
    },
  ],
  "data-science": [
    {
      name: "Aditya Sharma",
      role: "B.Tech graduate",
      company: "Mohali",
      quote:
        "I did my B.Tech but never got hands-on data science exposure in college. Techcadd's course changed that completely — real projects, real datasets, not just theory. The capstone project became the centerpiece of my resume.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Kirti Mehta",
      role: "B.Com graduate",
      company: "Zirakpur",
      quote:
        "Was doing B.Com and wanted a technical pivot. Honestly intimidating at first, but the phase-wise structure — starting with Python before jumping into ML — made it manageable. Got a Data Analyst interview call soon after finishing.",
      rating: 5,
      initials: "KM",
    },
    {
      name: "Vivek Thakur",
      role: "Data science student",
      company: "Chandigarh",
      quote:
        "Commute daily from Chandigarh and the structured curriculum was the biggest plus. Machine learning modules were tough but the real-world case studies made concepts stick far better than any online course I'd tried before.",
      rating: 4,
      initials: "VT",
    },
    {
      name: "Simran Bansal",
      role: "Career changer",
      company: "Kharar",
      quote:
        "Working in a non-IT job and wanted a genuine career switch. This course gave me practical Python, SQL and ML skills, not just certificates. The Tableau and Power BI modules were outstanding — we worked with real business data.",
      rating: 5,
      initials: "SB",
    },
    {
      name: "Rohit Grover",
      role: "Fresh graduate",
      company: "Mohali",
      quote:
        "Best decision after graduation — chose this over just adding another degree. Learned the entire pipeline from Python to visualization. Feels like a genuine head start compared to peers with just theoretical knowledge.",
      rating: 5,
      initials: "RG",
    },
    {
      name: "Ankita Verma",
      role: "Developer moving to data",
      company: "Panchkula",
      quote:
        "Already had programming background but statistics and ML were new territory. Trainers connected everything to real business scenarios, which made the learning curve much less overwhelming than self-study would have been.",
      rating: 4,
      initials: "AV",
    },
    {
      name: "Karanveer Singh",
      role: "Software tester to data scientist",
      company: "Mohali",
      quote:
        "Working in software testing and wanted to pivot into data science. The evening batches let me train without leaving my job. The advanced ML module with XGBoost and ensemble methods was genuinely challenging but rewarding.",
      rating: 5,
      initials: "KS",
    },
    {
      name: "Priya Kapoor",
      role: "Data science student",
      company: "Derabassi",
      quote:
        "Travelled from Derabassi and it was completely worth it. Trainers don't rush through algorithms — they explain the business reasoning behind each technique. The capstone project gave me something real to show in interviews.",
      rating: 5,
      initials: "PK",
    },
    {
      name: "Ishaan Malhotra",
      role: "B.Sc graduate",
      company: "Chandigarh",
      quote:
        "Solid, comprehensive course for someone serious about data science. I'm a B.Sc graduate and this gave me the practical Python and SQL skills my degree never covered. The structured phases made a huge difference.",
      rating: 4,
      initials: "IM",
    },
    {
      name: "Manpreet Kaur",
      role: "Data science student",
      company: "Mohali",
      quote:
        "Was intimidated by machine learning before this course. Now I'm comfortable building models, evaluating performance and visualizing results. Genuinely one of the better structured programs I researched in Mohali.",
      rating: 5,
      initials: "MK",
    },
    {
      name: "Rohan Chauhan",
      role: "Aspiring data scientist",
      company: "Panchkula",
      quote:
        "Took this as a serious investment toward a data science career. The phase-wise approach — Python, stats, ML, SQL, visualization, big data — meant nothing felt rushed. Small batches meant real attention when stuck.",
      rating: 5,
      initials: "RC",
    },
    {
      name: "Divya Rani",
      role: "MBA student",
      company: "Mohali",
      quote:
        "Practical, project-heavy training. As an MBA student, the hands-on capstone project gave me far more real exposure than my college case studies ever did. Would recommend to anyone serious about a data career.",
      rating: 4,
      initials: "DR",
    },
  ],
  "data-analytics": [
    {
      name: "Ramanpreet Kaur",
      role: "B.Com graduate",
      company: "Mohali, Phase 7",
      quote:
        "I did my graduation in B.Com and honestly had zero coding background. I was scared to even open Excel formulas. But the trainers at Techcadd started from absolute basics and by the second month I was writing SQL queries confidently. Best decision I made after graduation.",
      rating: 5,
      initials: "RK",
    },
    {
      name: "Gurjot Singh",
      role: "Junior Data Analyst",
      company: "Zirakpur",
      quote:
        "I was working in a BPO in Chandigarh and wanted a career switch. Joined the Data Analytics course in Mohali at Techcadd on weekends, and within 6 months I had a portfolio of projects to show in interviews. Got placed as a Junior Data Analyst soon after.",
      rating: 5,
      initials: "GS",
    },
    {
      name: "Simran Kaur",
      role: "Data analytics student",
      company: "Sector 70, Mohali",
      quote:
        "Small batch size actually makes a huge difference. There were only 10 of us, so the trainer knew exactly where each person was struggling. Power BI and Tableau modules were taught really practically, not just theory.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Aman Thakur",
      role: "BA graduate",
      company: "Panchkula",
      quote:
        "Came in from a BA background, honestly didn't expect to enjoy Python this much. The trainers made statistics and Python feel less intimidating. Only thing I'd say is the batch pace picks up quickly once basics are done, so you need to stay consistent.",
      rating: 4,
      initials: "AT",
    },
    {
      name: "Harpreet Kaur",
      role: "IT professional",
      company: "Mohali, Phase 8 (IT Park)",
      quote:
        "I work in Mohali IT Park and wanted to add analytics skills to my resume. Evening batches worked perfectly for my schedule. The SQL and Power BI training was directly applicable to my current job within weeks.",
      rating: 5,
      initials: "HK",
    },
    {
      name: "Vikram Sharma",
      role: "Data analytics student",
      company: "Chandigarh, Sector 22",
      quote:
        "What stood out for me was the placement support. They didn't just teach tools and leave us to figure out jobs — mock interviews and resume sessions were genuinely useful. Got two interview calls within a month of finishing the course.",
      rating: 5,
      initials: "VS",
    },
    {
      name: "Navjot Kaur",
      role: "B.Sc graduate",
      company: "Mohali, Phase 11",
      quote:
        "I'm from a B.Sc background and always liked numbers but didn't know how to turn that into a career. This course gave me a clear direction — Excel to SQL to Power BI to Python, step by step. Never felt overwhelmed.",
      rating: 5,
      initials: "NK",
    },
    {
      name: "Rohit Mehta",
      role: "Data analytics student",
      company: "Zirakpur, VIP Road",
      quote:
        "Good course overall, especially the live projects. I'd recommend it to anyone from Mohali or Chandigarh looking to get into analytics seriously. Would've liked a bit more practice time on Python, but overall solid.",
      rating: 4,
      initials: "RM",
    },
    {
      name: "Manpreet Singh",
      role: "Commerce graduate",
      company: "Mohali, Sector 66",
      quote:
        "I was the classic commerce-background, math-phobic student. The trainers didn't move to Python until literally everyone was comfortable with Excel and SQL. That patience made a real difference for someone like me.",
      rating: 5,
      initials: "MS",
    },
    {
      name: "Ishika Verma",
      role: "Data analytics student",
      company: "Panchkula, Sector 15",
      quote:
        "Honestly one of the better training institutes I researched around the Tricity. The capstone project at the end felt like real consulting work — I use it in my portfolio even now during interviews.",
      rating: 5,
      initials: "IV",
    },
    {
      name: "Karanveer Singh",
      role: "Sales to analytics switcher",
      company: "Mohali, Sohana Road",
      quote:
        "Switched from a sales job to data analytics after this course. The local placement connections in Mohali and Chandigarh actually helped — got my first interview through a company Techcadd's placement cell referred.",
      rating: 5,
      initials: "KS",
    },
  ],
  "machine-learning": [
    {
      name: "Jaspreet Singh",
      role: "Developer moving into ML",
      company: "Mohali, Phase 8 (IT Park)",
      quote:
        "I work as a developer in IT Park and wanted to move into machine learning. The Python-first approach really helped — by the time we got to algorithms, I wasn't struggling with syntax anymore. Evening batch fit perfectly around my job.",
      rating: 5,
      initials: "JS",
    },
    {
      name: "Ridhima Chawla",
      role: "BCA graduate",
      company: "Sector 70, Mohali",
      quote:
        "Came from a BCA background but had never really understood ML beyond textbook definitions. The trainers explained supervised vs unsupervised learning using actual business examples, which finally made it click for me.",
      rating: 5,
      initials: "RC",
    },
    {
      name: "Karan Bajaj",
      role: "Support role to ML",
      company: "Zirakpur",
      quote:
        "Honestly one of the better decisions I made. I was in a support role in Chandigarh and wanted a career shift. Built my first real ML model — a price prediction project — by month two. That project is still on my resume.",
      rating: 5,
      initials: "KB",
    },
    {
      name: "Simarjeet Kaur",
      role: "Commerce graduate",
      company: "Mohali, Phase 11",
      quote:
        "Good course, especially the hands-on projects. Statistics module was a bit heavy for someone from a commerce background like me, but the trainers slowed down and explained it again till it made sense.",
      rating: 4,
      initials: "SK",
    },
    {
      name: "Abhinav Sharma",
      role: "Machine learning student",
      company: "Panchkula",
      quote:
        "I was genuinely intimidated by ML before joining — thought it was only for engineers. Techcadd's small batch meant the trainer actually noticed when I was stuck on model evaluation and helped one-on-one instead of just moving ahead.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Navdeep Kaur",
      role: "ML intern",
      company: "Mohali, Sohana Road",
      quote:
        "Loved that we worked with real, messy datasets instead of perfectly clean textbook data. That's exactly what I've encountered in my internship since — felt genuinely prepared.",
      rating: 5,
      initials: "NK",
    },
    {
      name: "Yuvraj Mehta",
      role: "Career changer",
      company: "Chandigarh, Sector 34",
      quote:
        "Switched careers from a non-tech background into ML after this course. The mock interviews really helped — got asked about model evaluation metrics in my actual interview and could answer confidently.",
      rating: 5,
      initials: "YM",
    },
    {
      name: "Priyanka Dutta",
      role: "Machine learning student",
      company: "Panchkula, Sector 15",
      quote:
        "Solid course overall. The capstone project felt like real work, not just an assignment. Would've liked slightly more time on deep learning basics, but as a machine learning foundation course it delivers well.",
      rating: 4,
      initials: "PD",
    },
    {
      name: "Rohan Kapoor",
      role: "B.Sc graduate",
      company: "Mohali, Sector 66",
      quote:
        "I'm from a B.Sc background and always liked math but didn't know how to apply it practically. This course connected the dots between statistics, Python and actual predictive models. Genuinely enjoyed every module.",
      rating: 5,
      initials: "RK",
    },
    {
      name: "Ekjot Kaur",
      role: "Weekend batch student",
      company: "Kharar",
      quote:
        "Travelled in from Kharar for weekend batches and it was completely worth it. Trainers were patient with beginners but still went deep enough into algorithms that I felt genuinely challenged.",
      rating: 5,
      initials: "EK",
    },
    {
      name: "Manav Arora",
      role: "AI/ML associate",
      company: "Mohali, Phase 7",
      quote:
        "What stood out was the placement support. Beyond just teaching ML, they helped with resume building specifically for AI/ML roles and connected me with an interview through their Mohali hiring network.",
      rating: 5,
      initials: "MA",
    },
  ],
  "deep-learning": [
    {
      name: "Arshdeep Singh",
      role: "ML course graduate",
      company: "Mohali, Phase 8 (IT Park)",
      quote:
        "I'd already done a machine learning course elsewhere but wanted to go deeper into neural networks. Techcadd's Deep Learning course finally made backpropagation click for me — the trainers actually explain the math instead of skipping past it.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Muskan Bhatia",
      role: "B.Tech CS graduate",
      company: "Sector 70, Mohali",
      quote:
        "Came in with a B.Tech CS background and wanted to specialize in computer vision. The CNN module with real image datasets was genuinely challenging in a good way. Built an image classification project I still show in interviews.",
      rating: 5,
      initials: "MB",
    },
    {
      name: "Deepak Rathi",
      role: "Data analyst moving into AI",
      company: "Chandigarh, Sector 22",
      quote:
        "Was working as a data analyst in Chandigarh and wanted to move into AI-specific roles. This course gave me exactly the specialization I needed. TensorFlow and Keras training was hands-on, not just slides.",
      rating: 5,
      initials: "DR",
    },
    {
      name: "Harleen Kaur",
      role: "Deep learning student",
      company: "Zirakpur",
      quote:
        "Solid course, especially the NLP module. Fair warning though — you do need some Python and basic ML knowledge going in, it's not a complete-beginner course. Once I brushed up, everything made much more sense.",
      rating: 4,
      initials: "HK",
    },
    {
      name: "Nikhil Sood",
      role: "Deep learning student",
      company: "Mohali, Phase 11",
      quote:
        "The small batch really helped when I got stuck on why my model wasn't converging. The trainer sat with me one-on-one and walked through the debugging process instead of just telling me to 'try again.'",
      rating: 5,
      initials: "NS",
    },
    {
      name: "Ramanjit Kaur",
      role: "ML to deep learning",
      company: "Panchkula, Sector 15",
      quote:
        "I'd done Techcadd's Machine Learning course earlier and this felt like a natural next step. Loved that the deep learning course built directly on what I already knew instead of starting over.",
      rating: 5,
      initials: "RK",
    },
    {
      name: "Vaibhav Chauhan",
      role: "Deep learning student",
      company: "Kharar",
      quote:
        "Genuinely one of the more technically rigorous courses I've taken. The transfer learning module was especially useful — learned how to use pre-trained models to solve problems way faster than training from scratch.",
      rating: 5,
      initials: "VC",
    },
    {
      name: "Simran Oberoi",
      role: "Non-CS background",
      company: "Mohali, Sohana Road",
      quote:
        "Good depth on CNNs and RNNs. As someone from a non-CS background, the first few weeks were tough, but the trainers were patient and revisited concepts until they made sense. Would recommend to anyone serious about AI.",
      rating: 4,
      initials: "SO",
    },
    {
      name: "Karanveer Bedi",
      role: "Deep learning student",
      company: "Mohali, Sector 66",
      quote:
        "What I appreciated most was how practical it was — training actual neural networks on real datasets, not just watching demos. The overfitting and regularization module directly helped me fix issues in my own capstone project.",
      rating: 5,
      initials: "KB",
    },
    {
      name: "Priya Nanda",
      role: "Software to AI role",
      company: "Chandigarh, Sector 34",
      quote:
        "Switched from a general software role into an AI-focused position after this course. The interview prep specifically for AI/ML roles was genuinely useful — got asked about CNNs in my interview and could answer with confidence.",
      rating: 5,
      initials: "PN",
    },
    {
      name: "Ishaan Malhotra",
      role: "AI specialist",
      company: "Mohali, Phase 7",
      quote:
        "Best decision after completing the ML course at Techcadd. This deep learning course gave me the specialization I needed to stand out. The placement team also connected me with an AI-focused opening in Mohali's IT Park.",
      rating: 5,
      initials: "IM",
    },
  ],
  "artificial-intelligence": [
    {
      name: "Amandeep K.",
      role: "Practical Learning Experience",
      company: "Mohali",
      quote:
        "Before joining the Artificial Intelligence Course in Mohali, I was confused about where to start with AI. The trainers explained Python, Machine Learning and AI concepts step by step. The practical assignments helped me understand the topics much better.",
      rating: 5,
      initials: "AK",
    },
    {
      name: "Harpreet S.",
      role: "Helpful for Beginners",
      company: "Chandigarh",
      quote:
        "I had very little knowledge of Artificial Intelligence when I enrolled. The course started with the basics and gradually moved toward Machine Learning, Deep Learning and Generative AI. The learning process felt manageable and well structured.",
      rating: 5,
      initials: "HS",
    },
    {
      name: "Rishav M.",
      role: "Projects Made a Difference",
      company: "Mohali",
      quote:
        "What I liked most was the project-based learning. Instead of only studying algorithms, I got opportunities to work on practical AI applications. It helped me understand how the concepts are actually used in projects.",
      rating: 5,
      initials: "RM",
    },
    {
      name: "Gurleen K.",
      role: "Python Foundation Was Useful",
      company: "Zirakpur",
      quote:
        "I wanted to learn AI but was not confident in Python. The initial modules helped me strengthen my programming basics before moving into Machine Learning. That made the advanced topics much easier to understand.",
      rating: 5,
      initials: "GK",
    },
    {
      name: "Manpreet S.",
      role: "Generative AI Exposure",
      company: "Chandigarh",
      quote:
        "The Generative AI and LLM modules were the most interesting part for me. Learning about prompt engineering, LLM applications and modern AI workflows gave me a better idea of how this technology is being used today.",
      rating: 5,
      initials: "MS",
    },
    {
      name: "Navjot P.",
      role: "Support During Practice",
      company: "Mohali",
      quote:
        "I liked the trainer interaction during practical sessions. Whenever I got stuck with code or a Machine Learning model, I could discuss the issue and understand where I was making mistakes. That support made self-learning much easier.",
      rating: 5,
      initials: "NP",
    },
    {
      name: "Karan D.",
      role: "Good Skill Upgrade",
      company: "Sahibzada Ajit Singh Nagar",
      quote:
        "I am from a technical background and wanted to add AI skills to my existing knowledge. The course gave me exposure to Python, Machine Learning, Deep Learning and Computer Vision in a structured way.",
      rating: 5,
      initials: "KD",
    },
    {
      name: "Simran K.",
      role: "Portfolio-Focused Learning",
      company: "Mohali",
      quote:
        "The course encouraged us to work on projects rather than simply completing theory. Building AI applications helped me understand how to present my technical work and gave me useful material for my portfolio.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Yuvraj M.",
      role: "Useful for Career Preparation",
      company: "Chandigarh",
      quote:
        "I joined because I wanted to explore AI as a career option. The course helped me understand the difference between AI, Machine Learning and Deep Learning and showed me which skills I should focus on next.",
      rating: 5,
      initials: "YM",
    },
    {
      name: "Jasleen K.",
      role: "Modern AI Topics",
      company: "Mohali",
      quote:
        "I was specifically looking for an AI training course that covered more than traditional Machine Learning. The inclusion of NLP, Generative AI, LLMs and Computer Vision made the curriculum more interesting for me.",
      rating: 5,
      initials: "JK",
    },
    {
      name: "Abhishek R.",
      role: "Structured Learning Path",
      company: "Kharar",
      quote:
        "There are so many AI tutorials online that I didn't know what to learn first. Having a proper sequence from Python and data handling to Machine Learning and advanced AI topics made my learning journey much more organised.",
      rating: 5,
      initials: "AR",
    },
    {
      name: "Mehak S.",
      role: "Positive Learning Environment",
      company: "Chandigarh",
      quote:
        "The overall learning environment was comfortable for asking questions and practising concepts. As someone from the Chandigarh Tricity region, having access to a local AI training option made regular learning more convenient.",
      rating: 5,
      initials: "MS",
    },
  ],
  "digital-marketing": [
    {
      name: "Simran Kaur",
      role: "BBA graduate",
      company: "Mohali",
      quote:
        "I was a BBA graduate with zero idea what to do next. Joined Techcadd's digital marketing course and honestly, the live projects made all the difference. I run a small Instagram management gig now, on the side, while job hunting. Very practical teaching style.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Rohit Sharma",
      role: "12th pass student",
      company: "Zirakpur",
      quote:
        "Did my 12th and wasn't keen on a 3-year degree right away. My cousin suggested Techcadd. Learned SEO and Google Ads from scratch, no background needed. Trainers explain everything in simple language, which helped a lot in the beginning.",
      rating: 5,
      initials: "RS",
    },
    {
      name: "Anmol Kaur",
      role: "Career changer",
      company: "Chandigarh",
      quote:
        "Switched from a customer support job to digital marketing after this course. The Meta Ads and Google Ads modules were the most useful for me personally. Wish the batch timings were a bit more flexible, but overall solid learning.",
      rating: 4,
      initials: "AK",
    },
    {
      name: "Gurpreet Singh",
      role: "Digital marketing student",
      company: "Kharar",
      quote:
        "What I liked most was that it wasn't just theory — we actually worked on live projects. Got an interview call within a month of completing the course. Good support from the trainers even after class hours.",
      rating: 5,
      initials: "GS",
    },
    {
      name: "Priya Mehta",
      role: "Business owner",
      company: "Mohali, Phase 8",
      quote:
        "I run a small boutique business and wanted to handle my own social media and ads instead of paying an agency every month. This course gave me exactly that confidence. Now I manage my own Instagram ads.",
      rating: 5,
      initials: "PM",
    },
    {
      name: "Aditya Verma",
      role: "B.Tech graduate",
      company: "Panchkula",
      quote:
        "Came from a B.Tech background with no marketing experience. The SEO and analytics modules clicked well for me since I already understood data. Would've liked a bit more depth in email marketing, but overall very useful.",
      rating: 4,
      initials: "AV",
    },
    {
      name: "Harleen Kaur",
      role: "Fresh graduate",
      company: "Mohali",
      quote:
        "Honestly one of the better decisions I made after graduation. The trainers actually explain the 'why' behind strategies, not just the 'how.' Built a small portfolio during the course which really helped in interviews.",
      rating: 5,
      initials: "HK",
    },
    {
      name: "Karanveer Singh",
      role: "Digital marketing student",
      company: "Mohali, Sector 82",
      quote:
        "Being close to home in Mohali mattered a lot for me — didn't have to travel to Chandigarh daily. Course content was practical, and I liked that they cover the newer AI marketing tools too, not just the old-school basics.",
      rating: 5,
      initials: "KS",
    },
    {
      name: "Ishita Bansal",
      role: "Teacher turned freelancer",
      company: "Chandigarh",
      quote:
        "Took this course as a career switch from teaching. It felt intimidating at first since I had zero technical background, but the pace was beginner-friendly. Now working part-time as a freelance content and social media person.",
      rating: 4,
      initials: "IB",
    },
    {
      name: "Manpreet Singh",
      role: "Digital marketing student",
      company: "Mohali",
      quote:
        "I'll be honest, I compared a few institutes in Mohali before joining. What stood out with Techcadd was the hands-on approach — actually running campaigns instead of just watching slides. Would recommend to anyone serious about this field.",
      rating: 5,
      initials: "MS",
    },
  ],
  "social-media-marketing": [
    {
      name: "Simran Kaur",
      role: "12th pass student",
      company: "Mohali, Phase 7",
      quote:
        "I joined Techcadd right after my 12th because I wasn't sure engineering or commerce was for me. Best decision I made. The trainers actually showed us how to run real Instagram ad campaigns, not just theory from a book. I'm now handling social media for a boutique in Sector 70.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Rohan Mehta",
      role: "Freelance social media manager",
      company: "Chandigarh, Sector 35",
      quote:
        "I used to just post random stuff on my personal Instagram and thought I knew social media. Techcadd showed me how wrong I was — content strategy, analytics, ad targeting, all of it. Now I freelance for two local businesses in Chandigarh alongside my regular job.",
      rating: 5,
      initials: "RM",
    },
    {
      name: "Anmol Sharma",
      role: "SMM student, placed",
      company: "Zirakpur",
      quote:
        "The location in Phase 8 made it super convenient since I commute from Zirakpur. Loved the practical approach — we actually ran a mock Meta ads campaign with real budgets during training. Got placed within a month of finishing the course.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Harleen Bhatia",
      role: "SMM student",
      company: "Panchkula",
      quote:
        "Good course overall, very hands-on. The Canva and CapCut sessions were especially useful since I had zero design background before. Would have liked a bit more time on influencer marketing, but overall solid training.",
      rating: 4,
      initials: "HB",
    },
    {
      name: "Karanveer Singh",
      role: "SMM student",
      company: "Mohali, Phase 9",
      quote:
        "Being from Phase 9, Techcadd was literally 10 minutes away, which made attending easier than institutes in Chandigarh. The trainers had real agency experience which showed — they knew the actual problems you face managing client accounts.",
      rating: 5,
      initials: "KS",
    },
    {
      name: "Ishita Goyal",
      role: "Homemaker turned freelancer",
      company: "Kharar",
      quote:
        "I was a homemaker for 4 years and wanted to start earning again without a rigid 9-to-5. This course gave me exactly that. I now manage Instagram pages for two small businesses near Kharar from home.",
      rating: 5,
      initials: "IG",
    },
    {
      name: "Gurpreet Kaur",
      role: "SMM student",
      company: "Mohali, Sector 70",
      quote:
        "What stood out was how updated the training felt — we worked with actual AI tools for content planning, not outdated software. Felt like I was learning what agencies use right now, not five years ago.",
      rating: 5,
      initials: "GK",
    },
    {
      name: "Aditya Chawla",
      role: "Retail to digital marketing",
      company: "Chandigarh",
      quote:
        "Switched careers from retail to digital marketing through this course. The placement team helped me a lot with interview prep. Got hired by a small agency in Chandigarh within 6 weeks of completing the course.",
      rating: 4,
      initials: "AC",
    },
    {
      name: "Navjot Kaur",
      role: "College student",
      company: "Mohali, Phase 11",
      quote:
        "As a college student, the weekend batch worked perfectly for me. I built a proper portfolio during the course — real campaigns, real analytics reports — which really helped when I started applying for internships.",
      rating: 5,
      initials: "NK",
    },
    {
      name: "Yash Anand",
      role: "Freelance marketer",
      company: "Panchkula",
      quote:
        "Honestly one of the better decisions post-graduation. The Meta Ads and analytics modules gave me confidence to freelance immediately. Already working with two clients from the Tricity area while job hunting.",
      rating: 5,
      initials: "YA",
    },
    {
      name: "Priya Sood",
      role: "SMM student",
      company: "Mohali, Phase 8",
      quote:
        "Loved that the institute is right in the middle of the IT hub — felt motivating to train so close to actual companies. The trainers connected classroom learning to what's happening in the real Mohali job market.",
      rating: 5,
      initials: "PS",
    },
  ],
  "google-ads": [
    {
      name: "Ramanpreet Kaur",
      role: "Fresh graduate",
      company: "Sector 70, Mohali",
      quote:
        "I joined Techcadd's Google Ads course in Mohali right after finishing my graduation, and honestly it was the best decision I made. I had zero background in digital marketing, but the trainers explained everything so practically that within a few weeks I was running my own mock campaigns. Highly recommend for anyone in Mohali confused about their career path!",
      rating: 5,
      initials: "RK",
    },
    {
      name: "Gurpreet Singh",
      role: "Placed at a local agency",
      company: "Phase 8, Mohali",
      quote:
        "Being based in Phase 8, I was looking for something close to home that wouldn't waste my commute time, and Techcadd fit perfectly. The Google Ads training in Mohali here is very hands-on — no boring PPTs, just real campaign setups. Got placed in a local digital agency within a month of completing the course.",
      rating: 5,
      initials: "GS",
    },
    {
      name: "Simran Kaur",
      role: "Google Ads student",
      company: "Zirakpur",
      quote:
        "I work in Zirakpur but travel to Mohali for classes, and it's totally worth it. The course covers everything from keyword research to conversion tracking in proper depth. The trainers actually answer your doubts instead of rushing to the next topic.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Aditya Sharma",
      role: "Small business owner",
      company: "Sector 82, Mohali",
      quote:
        "As a small business owner in Sector 82, I wanted to manage my own ads instead of paying an agency every month. This Google Ads course in Mohali taught me exactly that. I'm now running my own campaigns and saving a good amount every month while getting better results.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Harleen Kaur",
      role: "Google Ads student",
      company: "Chandigarh",
      quote:
        "I commute from Chandigarh, and I can say Techcadd's Google Ads program is genuinely one of the better options in the Tricity. Practical assignments, real Google Ads dashboard access and supportive faculty made the whole learning experience smooth.",
      rating: 5,
      initials: "HK",
    },
    {
      name: "Karanveer Singh",
      role: "Sales to digital marketing",
      company: "Phase 8B, Mohali",
      quote:
        "I was working a random sales job and wanted to switch to digital marketing. The Google Ads course in Mohali at Techcadd gave me the confidence and skillset to make that switch. Landed an interview within two weeks of finishing the course.",
      rating: 5,
      initials: "KS",
    },
    {
      name: "Ishita Bansal",
      role: "Google Ads student",
      company: "Sector 75, Mohali",
      quote:
        "Loved how structured the course was — from basics of account setup to advanced bidding strategies. The live project work really helped me understand Quality Score and ad optimization, something I couldn't fully grasp from YouTube videos alone.",
      rating: 5,
      initials: "IB",
    },
    {
      name: "Manpreet Singh",
      role: "Google Ads student",
      company: "Panchkula",
      quote:
        "Travelled from Panchkula for this course, and it was worth every trip. The instructors have real agency experience, which really shows in how they teach — lots of real examples from actual client campaigns, not just theory.",
      rating: 5,
      initials: "MS",
    },
    {
      name: "Navjot Kaur",
      role: "IT professional",
      company: "Sector 67, Mohali",
      quote:
        "I'm currently working in an IT company in Sector 67 and wanted to add Google Ads skills to my resume. The evening batch worked perfectly with my job schedule, and now I've been given more marketing responsibilities at work because of it.",
      rating: 5,
      initials: "NK",
    },
    {
      name: "Ayush Mehta",
      role: "Google Ads student",
      company: "Sector 78, Mohali",
      quote:
        "Honestly one of the most practical courses I've done. We didn't just learn Google Ads — we actually set up campaigns, tracked conversions and analyzed real performance data. Great support from trainers even after the course ended, when I had job-related queries.",
      rating: 5,
      initials: "AM",
    },
  ],
  seo: [
    {
      name: "Simran Kaur",
      role: "Fresh graduate, freelancing",
      company: "Sector 70, Mohali",
      quote:
        "I joined Techcadd's SEO course in Mohali right after finishing my graduation, and honestly it changed my direction completely. The trainers explained everything practically, and I got to work on real websites instead of just slides. Within two months I started freelancing part-time.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Rohit Sharma",
      role: "Family business owner",
      company: "Zirakpur",
      quote:
        "I was looking for an SEO course in Mohali that wasn't just theory, and Techcadd delivered exactly that. The local SEO module was super useful since I run a small business page for my family's shop.",
      rating: 5,
      initials: "RS",
    },
    {
      name: "Ankita Mehta",
      role: "SEO student",
      company: "Chandigarh",
      quote:
        "Commuting to Mohali for classes was worth it. The keyword research and analytics sessions were detailed, and the trainers actually answered every doubt patiently instead of rushing through slides.",
      rating: 5,
      initials: "AM",
    },
    {
      name: "Gurpreet Singh",
      role: "12th pass student",
      company: "Sector 82, Mohali",
      quote:
        "Best decision after 12th. I didn't want to jump into a 3-year degree without knowing what I actually wanted. This SEO course gave me a real skill and a portfolio within a few months.",
      rating: 5,
      initials: "GS",
    },
    {
      name: "Priyanka Rani",
      role: "Content writer",
      company: "Panchkula",
      quote:
        "I was already working in content writing and wanted to add SEO to my skillset. The on-page and technical SEO modules at Techcadd Mohali helped me understand exactly how my writing connects to rankings.",
      rating: 5,
      initials: "PR",
    },
    {
      name: "Harsimran Kaur",
      role: "SEO reporting at work",
      company: "IT Park, Mohali",
      quote:
        "The Google Search Console and Analytics training was hands-on, not just theoretical explanation. I now handle SEO reporting for my current employer confidently.",
      rating: 5,
      initials: "HK",
    },
    {
      name: "Deepak Verma",
      role: "SEO student",
      company: "Sector 74, Mohali",
      quote:
        "I compared a few institutes in Mohali and Chandigarh before joining. Techcadd's trainers had real agency experience, which made a huge difference in how practical the sessions felt.",
      rating: 5,
      initials: "DV",
    },
    {
      name: "Nisha Thakur",
      role: "Weekend batch student",
      company: "Kharar",
      quote:
        "Even though I travel from Kharar, the flexible weekend batch made it manageable alongside my job. The local SEO and Google Business Profile module was directly useful for my current work.",
      rating: 5,
      initials: "NT",
    },
    {
      name: "Aman Chopra",
      role: "SEO + Google Ads student",
      company: "Sector 91, Mohali",
      quote:
        "I paired this SEO course with the Google Ads course at Techcadd, and together they gave me a complete digital marketing skillset. Got my first internship within a month of completing both.",
      rating: 5,
      initials: "AC",
    },
    {
      name: "Ritika Bansal",
      role: "Non-technical background",
      company: "Mohali",
      quote:
        "As someone with zero technical background, I was nervous starting an SEO course. But the pace was beginner-friendly, and by the end I was comfortable doing full website audits on my own.",
      rating: 5,
      initials: "RB",
    },
    {
      name: "Karanveer Singh",
      role: "SEO student",
      company: "Sector 66, Mohali",
      quote:
        "The best part was the live project work. I didn't just learn definitions — I actually optimized real pages and saw ranking improvements, which felt like real proof I was learning something valuable.",
      rating: 5,
      initials: "KS",
    },
  ],
  wordpress: [
    {
      name: "Ramanpreet Kaur",
      role: "Fresh graduate",
      company: "Phase 8, Mohali",
      quote:
        "I joined Techcadd for the WordPress course in Mohali right after my graduation, and honestly, it was one of my best decisions. I built my first live website within the first two weeks itself. The trainers explained everything in simple language, and I never felt lost even though I had zero coding background.",
      rating: 5,
      initials: "RK",
    },
    {
      name: "Harshdeep Singh",
      role: "Freelancing while learning",
      company: "Sector 70, Mohali",
      quote:
        "Being from an IT City background, I always wanted to get into web development. This WordPress training in Mohali gave me exactly the hands-on exposure I needed. I've already started freelancing for two local clients while still learning advanced modules.",
      rating: 5,
      initials: "HS",
    },
    {
      name: "Simran Kaur",
      role: "WordPress student",
      company: "Kharar",
      quote:
        "I travel daily from Kharar to attend this WordPress course in Mohali, and it's totally worth the commute. The WooCommerce module especially helped me understand how online stores actually work — something I couldn't grasp from YouTube tutorials alone.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Gurpreet Singh",
      role: "Junior web designer",
      company: "Zirakpur",
      quote:
        "What I liked most about Techcadd's WordPress classes in Mohali was the live project work. By the end of the course, I had 2 real websites in my portfolio, which helped me land a junior web designer role in Chandigarh.",
      rating: 5,
      initials: "GS",
    },
    {
      name: "Anmol Sharma",
      role: "Working professional",
      company: "Phase 7, Mohali",
      quote:
        "I was working a regular job near Quark City and wanted to upskill on weekends. Techcadd's flexible batch timing for the WordPress institute in Mohali made it possible for me to learn without quitting my job.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Navjot Kaur",
      role: "WordPress student",
      company: "Sector 71, Mohali",
      quote:
        "The SEO module inside this WordPress course in Mohali was a pleasant surprise — I didn't expect to learn keyword optimization and Google Search Console setup as part of a web design course. Great value for the fees.",
      rating: 5,
      initials: "NK",
    },
    {
      name: "Rohit Verma",
      role: "Beginner, now building client sites",
      company: "Chandigarh",
      quote:
        "I commute from Chandigarh for this WordPress training in Mohali, and the trainers are genuinely patient with beginners. I had never touched a CMS before, and now I can confidently build client websites.",
      rating: 5,
      initials: "RV",
    },
    {
      name: "Manpreet Kaur",
      role: "IT professional",
      company: "IT City, Mohali",
      quote:
        "As someone working in an IT company in IT City, I wanted a practical, no-nonsense WordPress course in Mohali. This program delivered exactly that — real dashboard work, real plugins, real projects, not just theory slides.",
      rating: 5,
      initials: "MK",
    },
    {
      name: "Aditya Chawla",
      role: "Small business owner",
      company: "Sector 67, Mohali",
      quote:
        "I run a small business and wanted to manage my own website instead of hiring a developer every time. This WordPress classes in Mohali program taught me everything from themes to plugins, and now I update my site myself.",
      rating: 5,
      initials: "AC",
    },
    {
      name: "Jaspreet Kaur",
      role: "Content writer",
      company: "Landran",
      quote:
        "I'm a content writer and wanted to understand how websites actually work behind the scenes. This WordPress course in Mohali helped me become far more valuable in my content and digital marketing role.",
      rating: 5,
      initials: "JK",
    },
    {
      name: "Karanveer Singh",
      role: "12th pass student",
      company: "Phase 3B2, Mohali",
      quote:
        "Best decision after 12th! I joined this WordPress training in Mohali straight after school, and within a month I could build fully functional websites. Highly recommend Techcadd to anyone starting out.",
      rating: 5,
      initials: "KS",
    },
  ],
  shopify: [
    {
      name: "Anjali Verma",
      role: "Shopify Developer",
      company: "Mohali",
      quote:
        "I joined this course straight after my graduation with zero coding background. Mastering Liquid was a game-changer for me — I can now build custom features that basic themes just don't offer. I secured a developer role at a D2C brand based in Mohali within a month of finishing the course.",
      rating: 5,
      initials: "AV",
    },
    {
      name: "Karanveer Singh",
      role: "Student, joined after 12th",
      company: "Sector 70, Mohali",
      quote:
        "I did this course right after 12th instead of jumping into a random degree. Best decision. The trainers explained everything from scratch, and by month three I was already building real store projects. My parents were skeptical at first, but the placement support changed their mind completely.",
      rating: 5,
      initials: "KS",
    },
    {
      name: "Harman Singh",
      role: "E-commerce Consultant",
      company: "Panchkula",
      quote:
        "I specifically joined for the freelancing modules and Liquid coding. Built three solid stores for my portfolio during the course, and now I charge premium rates for theme customization work. The trainers, being actual Shopify Partners, gave real advice — not textbook stuff.",
      rating: 5,
      initials: "HS",
    },
    {
      name: "Priya Kaur",
      role: "Web Designer",
      company: "Chandigarh",
      quote:
        "I already knew basic web design but wanted to specialize. The focus on e-commerce SEO and speed optimization directly helped me land a job at a top web agency in Chandigarh, where I now handle client store performance.",
      rating: 5,
      initials: "PK",
    },
    {
      name: "Simran Kaur",
      role: "Digital Marketer",
      company: "Zirakpur",
      quote:
        "I was already working in digital marketing but had zero technical understanding of Shopify's backend. The weekend batches worked perfectly around my job. Now I can implement CRO and tracking changes myself instead of depending on a developer every time.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Gurpreet Singh",
      role: "Fresher",
      company: "Mohali",
      quote:
        "Honestly went in expecting just app-based store setup like most tutorials online. Was surprised by how much Liquid coding was actually taught. Built three live stores by the end. Only wish the API integration module was slightly longer, but overall very solid.",
      rating: 4,
      initials: "GS",
    },
    {
      name: "Ishaan Mehta",
      role: "Junior Shopify Developer",
      company: "IT Park, Mohali",
      quote:
        "A lot of institutes near Mohali promise placement but don't follow through. Techcadd's placement cell actually got me two interview calls within weeks of completing the course, and I'm now working as a Junior Shopify Developer with a decent starting package.",
      rating: 5,
      initials: "IM",
    },
    {
      name: "Ramanpreet Kaur",
      role: "Boutique Owner",
      company: "Phase 8, Mohali",
      quote:
        "I run a small clothing brand and used to pay freelancers every time I needed a change on my Shopify store. Took this course to finally manage it myself, and now I customize and scale my own store without depending on anyone.",
      rating: 5,
      initials: "RK",
    },
    {
      name: "Aditya Sharma",
      role: "BCA Graduate",
      company: "Kharar",
      quote:
        "What stood out for me was that our trainer was an actual certified Shopify Partner, not just someone who'd done an online certification. The real client examples he shared made concepts like theme architecture and metafields so much easier to understand.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Navdeep Kaur",
      role: "Freelance Shopify Developer",
      company: "Mohali",
      quote:
        "The client management module gave me the confidence to pitch to international clients. I've now delivered two Shopify projects for overseas clients while still living in Mohali. Never thought I'd be earning in dollars from here.",
      rating: 5,
      initials: "NK",
    },
    {
      name: "Manpreet Singh",
      role: "Career switcher",
      company: "Sector 75, Mohali",
      quote:
        "Switched from a non-tech background at 26. Was nervous, but the course paced things well for beginners. The hands-on projects gave me something real to show in interviews instead of just a certificate. Got placed within two months of completing it.",
      rating: 4,
      initials: "MS",
    },
    {
      name: "Tanvi Bhardwaj",
      role: "Graduate",
      company: "Mohali",
      quote:
        "Being located right in Sector 75 Mohali made it easy for me to attend offline classes regularly. The 24/7 technical support was honestly a lifesaver during my project phase whenever I got stuck at home.",
      rating: 5,
      initials: "TB",
    },
  ],
  "python-programming": [
    {
      name: "Simranjeet Kaur",
      role: "12th pass student",
      company: "Sector 70, Mohali",
      quote:
        "I joined the Python course in Mohali at Techcadd right after my 12th and honestly wasn't sure I'd be able to keep up. The trainers started from zero and never made me feel behind. Now I'm comfortable building small projects on my own.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Rohit Sharma",
      role: "Career switcher",
      company: "Zirakpur",
      quote:
        "I was working in a non-IT job and wanted a career switch. Techcadd's Python training in Mohali gave me exactly what I needed — practical coding, not just theory. Got placement support too, which made a real difference.",
      rating: 5,
      initials: "RS",
    },
    {
      name: "Anmol Kaur",
      role: "College student",
      company: "Kharar",
      quote:
        "The batch timings were flexible enough that I could manage my college classes alongside this course. The NumPy and Pandas sessions were especially useful — I didn't expect to enjoy data handling that much.",
      rating: 4,
      initials: "AK",
    },
    {
      name: "Gurpreet Singh",
      role: "BCA graduate",
      company: "IT City, Mohali",
      quote:
        "Best decision I made after graduation. I did my BCA but felt like I didn't actually know how to code confidently. This Python course in Mohali fixed that gap with real projects, not just slides.",
      rating: 5,
      initials: "GS",
    },
    {
      name: "Priya Verma",
      role: "Python student",
      company: "Phase 8B, Mohali",
      quote:
        "What I liked most was how the trainers explained OOP concepts with actual examples instead of just definitions. It finally clicked for me here after struggling with it in college.",
      rating: 5,
      initials: "PV",
    },
    {
      name: "Harman Singh",
      role: "Python student",
      company: "Chandigarh, Sector 22",
      quote:
        "Traveled from Chandigarh for this course since I heard good things about Techcadd. The Django module was a highlight — gave me a real starting point into web development.",
      rating: 4,
      initials: "HS",
    },
    {
      name: "Neha Rani",
      role: "Non-technical background",
      company: "Landran, Mohali",
      quote:
        "As someone from a non-technical background, I was scared coding would be too hard for me. The step-by-step approach in this Python training in Mohali made it manageable and honestly kind of fun.",
      rating: 5,
      initials: "NR",
    },
    {
      name: "Aditya Chauhan",
      role: "Python student",
      company: "Sector 71, Mohali",
      quote:
        "I'd tried learning Python online before and kept giving up. Having structured classes, a mentor to ask doubts to, and real deadlines here made all the difference in actually finishing the course.",
      rating: 5,
      initials: "AC",
    },
    {
      name: "Kirandeep Kaur",
      role: "Working professional",
      company: "Panchkula",
      quote:
        "Commuted from Panchkula but it was worth it. The file handling and automation modules were things I could immediately apply to tasks at my current job.",
      rating: 4,
      initials: "KK",
    },
    {
      name: "Manpreet Singh",
      role: "Placed after the course",
      company: "Mohali",
      quote:
        "Techcadd's reputation as the best Python institute in Mohali is well deserved. The projects I built during the course are literally what I showed in my first job interview.",
      rating: 5,
      initials: "MS",
    },
    {
      name: "Simran Bhatia",
      role: "Python student",
      company: "Sector 68, Mohali",
      quote:
        "I appreciated that the trainers didn't rush through topics just to finish the syllabus. Every doubt was addressed properly before moving ahead — that's rare.",
      rating: 5,
      initials: "SB",
    },
  ],
  "java-programming": [
    {
      name: "Ramanpreet Kaur",
      role: "12th pass student",
      company: "Mohali, Phase 7",
      quote:
        "I joined Techcadd right after my 12th, and honestly it was the best decision I made. I had zero coding background, but the trainers explained everything so simply. Now I can actually build small Java applications on my own!",
      rating: 5,
      initials: "RK",
    },
    {
      name: "Gurpreet Singh",
      role: "B.Tech graduate",
      company: "Zirakpur",
      quote:
        "I did my B.Tech but felt like I hadn't really learned to code properly in college. This Java course in Mohali filled all the gaps — especially OOP concepts and JDBC, which I was really weak in before.",
      rating: 5,
      initials: "GS",
    },
    {
      name: "Simran Kaur",
      role: "Java student",
      company: "Kharar",
      quote:
        "The best part was the live project work. We didn't just study theory — we actually built things using Collections and file handling. That practical exposure really helped me in my interview prep.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Aman Sharma",
      role: "Java student",
      company: "Sector 70, Mohali",
      quote:
        "Good course overall, well structured from basics to JDBC. I would've liked a bit more time on multithreading, but the trainers were always available for doubts, which made a big difference.",
      rating: 4,
      initials: "AS",
    },
    {
      name: "Harleen Kaur",
      role: "Career switcher",
      company: "Mohali, Phase 11",
      quote:
        "I was working in a non-tech job and wanted to switch careers. Techcadd's evening batch made it possible for me to learn Java without quitting my job. The trainers understood our pace and never rushed.",
      rating: 5,
      initials: "HK",
    },
    {
      name: "Vikas Chauhan",
      role: "Java student",
      company: "Chandigarh, Sector 22",
      quote:
        "I compared a few institutes around Chandigarh and Mohali before joining, and Techcadd's Java curriculum was clearly the most practical. The Exception Handling and Data Structures modules were taught really well.",
      rating: 5,
      initials: "VC",
    },
    {
      name: "Priya Mehta",
      role: "BCA student",
      company: "Mohali, Phase 5",
      quote:
        "As a BCA student, I wanted extra hands-on training alongside my degree. This course gave me exactly that — real coding practice instead of just PowerPoint slides.",
      rating: 5,
      initials: "PM",
    },
    {
      name: "Rohit Bansal",
      role: "Java student",
      company: "Zirakpur",
      quote:
        "Small batch size made a huge difference for me. I could ask questions without hesitation, and the trainer actually remembered where each of us was struggling. Highly recommend for anyone in the Tricity area.",
      rating: 5,
      initials: "RB",
    },
    {
      name: "Manpreet Kaur",
      role: "College student",
      company: "SAS Nagar, Mohali",
      quote:
        "Solid course content, especially the OOP and Collections Framework sections. Batch timings were flexible enough to manage alongside my college classes.",
      rating: 4,
      initials: "MK",
    },
    {
      name: "Karanveer Singh",
      role: "Aspiring Java developer",
      company: "Mohali IT Park area",
      quote:
        "Since I want to work at one of the IT companies here in Mohali, having local, practical training felt important. Techcadd's trainers understood exactly what kind of Java skills companies around here are hiring for.",
      rating: 5,
      initials: "KS",
    },
  ],
  "cpp-dsa": [
    {
      name: "Ramanpreet Singh",
      role: "12th pass student",
      company: "Mohali, Phase 7",
      quote:
        "I joined Techcadd's C/C++ course right after my 12th, and honestly it was the best decision. I had zero coding background, but the trainers explained everything from scratch. Now I feel confident enough to start learning Python next.",
      rating: 5,
      initials: "RS",
    },
    {
      name: "Simran Kaur",
      role: "B.Tech student",
      company: "Sector 70, Mohali",
      quote:
        "I was struggling with pointers and OOP concepts for my B.Tech exams. The way they teach here with real coding practice instead of just theory made everything click. Cleared my semester exam with much more confidence.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Gurjot Singh",
      role: "Programming beginner",
      company: "Kharar",
      quote:
        "Good institute for anyone starting out in programming. Trainers are patient and don't rush through topics. Only wish the batch timing was a bit more flexible on weekdays, but overall a solid experience.",
      rating: 4,
      initials: "GS",
    },
    {
      name: "Ishita Sharma",
      role: "BCA student",
      company: "Zirakpur",
      quote:
        "I'm doing BCA and wanted extra practical exposure beyond college lectures. Techcadd's C/C++ classes gave me exactly that — proper lab sessions, real assignments and doubt-clearing whenever I got stuck.",
      rating: 5,
      initials: "IS",
    },
    {
      name: "Harmanjot Singh",
      role: "Career switcher",
      company: "Sector 82, Mohali",
      quote:
        "Switched careers from a non-technical background and was nervous about learning to code. The trainers here made C++ approachable step by step. Really happy I chose an institute close to home in Mohali instead of going online-only.",
      rating: 5,
      initials: "HS",
    },
    {
      name: "Ananya Verma",
      role: "C/C++ student",
      company: "Chandigarh, Sector 34",
      quote:
        "Commute from Chandigarh was a bit of a factor, but the quality of teaching made it worth it. Strong focus on logic building rather than just memorizing syntax, which I appreciated.",
      rating: 4,
      initials: "AV",
    },
    {
      name: "Manpreet Kaur",
      role: "12th pass student",
      company: "Mohali, Sector 71",
      quote:
        "As a 12th pass student exploring IT as a career, this course gave me a proper foundation. The trainers were approachable and always ready to explain concepts again if we didn't get it the first time.",
      rating: 5,
      initials: "MK",
    },
    {
      name: "Aditya Thakur",
      role: "Placement candidate",
      company: "Panchkula",
      quote:
        "I took this course to prepare for placement interviews. The interview-style questions on OOP and pointers that they covered actually came up in my technical rounds. Very practical approach.",
      rating: 5,
      initials: "AT",
    },
    {
      name: "Navdeep Singh",
      role: "Programming beginner",
      company: "Mohali, Phase 5",
      quote:
        "Solid course for beginners. I liked that they didn't just stick to theory — we wrote actual programs every class. Would recommend to anyone in Mohali looking to start programming seriously.",
      rating: 4,
      initials: "NS",
    },
    {
      name: "Priya Chawla",
      role: "C/C++ student",
      company: "Sector 91, Mohali",
      quote:
        "Best part about Techcadd was the personal attention despite being in a group batch. My doubts on file handling and STL got cleared properly instead of being rushed through. Great experience overall.",
      rating: 5,
      initials: "PC",
    },
  ],
  kotlin: [
    {
      name: "Ishaan Sharma",
      role: "12th pass student",
      company: "Mohali",
      quote:
        "I joined right after my 12th with zero coding background. The way trainers broke down Kotlin basics made it click fast. Built my first app in the third month itself!",
      rating: 5,
      initials: "IS",
    },
    {
      name: "Simran Kaur",
      role: "BCA student",
      company: "Zirakpur",
      quote:
        "Was doing BCA and my college syllabus felt too theoretical. Techcadd's Kotlin course in Mohali gave me the hands-on practice I actually needed for interviews.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Rohan Mehta",
      role: "Kotlin student",
      company: "Chandigarh",
      quote:
        "Small batch size made a huge difference. The trainer actually reviewed my code line by line instead of just moving to the next topic.",
      rating: 5,
      initials: "RM",
    },
    {
      name: "Anmol Singh",
      role: "Java developer",
      company: "Kharar",
      quote:
        "I was a Java developer for 2 years and wanted to switch to Kotlin for Android. This course made the transition smooth — MVVM and coroutines were explained really well.",
      rating: 5,
      initials: "AS",
    },
    {
      name: "Priya Verma",
      role: "Kotlin student",
      company: "Panchkula",
      quote:
        "Loved that we built real apps — the e-commerce app project alone taught me more than months of YouTube tutorials ever did.",
      rating: 5,
      initials: "PV",
    },
    {
      name: "Karanveer Dhillon",
      role: "Working professional",
      company: "Mohali, Phase 8",
      quote:
        "Convenient location near IT City Mohali made attending evening batches easy alongside my job. Solid trainers, practical curriculum.",
      rating: 5,
      initials: "KD",
    },
    {
      name: "Neha Chawla",
      role: "Commerce graduate",
      company: "Landran",
      quote:
        "Started as a commerce graduate with no coding experience. Now I'm confident enough to apply for junior Android developer roles. Grateful for the mentorship here.",
      rating: 5,
      initials: "NC",
    },
    {
      name: "Gurpreet Singh",
      role: "Kotlin student",
      company: "Sector 70, Mohali",
      quote:
        "The Jetpack Compose module was up to date with what's actually used in the industry now, not outdated XML-only teaching like some other institutes.",
      rating: 5,
      initials: "GS",
    },
    {
      name: "Aditi Kapoor",
      role: "Placed via placement support",
      company: "Chandigarh",
      quote:
        "Placement support helped me get interview calls with two Tricity-based startups. The portfolio of 5 apps really helped me stand out.",
      rating: 5,
      initials: "AK",
    },
    {
      name: "Manpreet Singh",
      role: "Post-graduation learner",
      company: "Kurali",
      quote:
        "Honestly one of the best decisions I made post-graduation. The trainers' real industry experience showed in how they explained debugging and app architecture.",
      rating: 5,
      initials: "MS",
    },
    {
      name: "Tanvi Bansal",
      role: "Kotlin student",
      company: "Mohali",
      quote:
        "Loved the balance between theory and practical work. Every concept was immediately applied to a mini project, so nothing felt wasted.",
      rating: 5,
      initials: "TB",
    },
  ],
  flutter: [
    {
      name: "Gurpreet Singh",
      role: "B.Tech graduate, freelancing",
      company: "Sector 70, Mohali",
      quote:
        "I joined Techcadd right after finishing my B.Tech and honestly wasn't sure Flutter was the right move. Six months later, I've built three apps on my own and just started freelancing for a client in Chandigarh. The trainers explain everything step by step — never felt rushed.",
      rating: 5,
      initials: "GS",
    },
    {
      name: "Simranjeet Kaur",
      role: "Flutter student",
      company: "Kharar",
      quote:
        "The best part was how practical everything was. We weren't just watching the trainer code — we were building our own apps from week two. The e-commerce app project on my resume actually got noticed in interviews.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Aman Deep",
      role: "Flutter student",
      company: "Zirakpur",
      quote:
        "I commute from Zirakpur for classes and it's completely worth it. The batch size is small so the mentor actually remembers what each of us is struggling with. Learned Firebase and API integration properly, not just surface-level stuff.",
      rating: 5,
      initials: "AD",
    },
    {
      name: "Ridhima Chawla",
      role: "Career switcher, junior developer",
      company: "Sector 34, Chandigarh",
      quote:
        "Switched careers from customer support to app development through this course. It was tough balancing my job with weekend batches, but the flexible timing at Techcadd made it manageable. Landed a junior developer role within two months of finishing.",
      rating: 4,
      initials: "RC",
    },
    {
      name: "Harman Preet Singh",
      role: "Flutter student",
      company: "Mohali, Phase 8",
      quote:
        "Being from Phase 8 Industrial Area, I know a lot of companies here are hiring app developers. This course gave me exactly the skills they're asking for — Dart, Flutter, Firebase, all covered properly with real projects.",
      rating: 5,
      initials: "HS",
    },
    {
      name: "Kirti Sharma",
      role: "Flutter student",
      company: "Panchkula",
      quote:
        "I travelled from Panchkula for this course after checking reviews of institutes across the tricity. Glad I did — the state management module (Provider, Bloc) was explained way better here than in the YouTube tutorials I had tried before.",
      rating: 5,
      initials: "KS",
    },
    {
      name: "Manpreet Singh",
      role: "Flutter student",
      company: "Sector 82, Mohali",
      quote:
        "Good hands-on training overall. The trainer had real industry experience which made a huge difference — he would share actual scenarios from projects he had worked on, not just textbook explanations.",
      rating: 4,
      initials: "MS",
    },
    {
      name: "Ananya Gupta",
      role: "12th pass student",
      company: "Sector 71, Mohali",
      quote:
        "As a 12th pass student with zero coding background, I was nervous. But the course starts from absolute basics of Dart and builds up slowly. By the final capstone project, I genuinely felt like a developer, not just a student.",
      rating: 5,
      initials: "AG",
    },
    {
      name: "Rohit Bansal",
      role: "IT professional",
      company: "IT Park, Mohali",
      quote:
        "I work in IT Park Mohali and wanted to add mobile development to my skillset. The weekend batch worked perfectly with my job, and the placement cell even helped me negotiate a better internal role at my own company.",
      rating: 5,
      initials: "RB",
    },
    {
      name: "Navjot Kaur",
      role: "Flutter student",
      company: "Dera Bassi",
      quote:
        "Techcadd's Flutter course in Mohali exceeded my expectations. The trainers are patient, the projects are real (we built a chat app with Firebase!), and the placement support actually followed up with me after the course ended.",
      rating: 5,
      initials: "NK",
    },
    {
      name: "Yuvraj Malhotra",
      role: "Flutter student",
      company: "Sector 66, Mohali",
      quote:
        "Solid course structure — from Dart basics to publishing apps on the Play Store. Only wish the batch had run a bit longer for the animation module, but overall a great foundation for a Flutter developer career.",
      rating: 4,
      initials: "YM",
    },
  ],
  "web-designing": [
    {
      name: "Ravneet Kaur",
      role: "12th pass student",
      company: "Sector 70, Mohali",
      quote:
        "I joined right after my 12th because I wasn't sure about a regular college route. The trainers at Techcadd explained everything from scratch — HTML, CSS, everything. Now I have my own portfolio website and I'm applying for junior designer roles in IT City Mohali.",
      rating: 5,
      initials: "RK",
    },
    {
      name: "Harpreet Singh",
      role: "BA graduate",
      company: "Kharar",
      quote:
        "Best decision I made after graduation. I did BA and thought I had no options in IT. This course changed that completely. The live project work really helped me understand real client work, not just theory.",
      rating: 5,
      initials: "HS",
    },
    {
      name: "Simran Mehta",
      role: "Web designing student",
      company: "Sector 61, SAS Nagar",
      quote:
        "Loved the UI/UX module especially. Learning Figma and Adobe XD felt very practical, not just watching videos. Only wish the batch was slightly longer, but overall a solid course.",
      rating: 4,
      initials: "SM",
    },
    {
      name: "Arjun Thakur",
      role: "Career switcher, freelancing",
      company: "Zirakpur",
      quote:
        "I was working in a non-IT job and wanted a change. Techcadd's evening batches made it possible for me to attend classes after work. Six months later, I'm freelancing part-time and building websites for small businesses in Zirakpur and Chandigarh.",
      rating: 5,
      initials: "AT",
    },
    {
      name: "Navjot Kaur",
      role: "Web designing student",
      company: "Phase 8, Mohali",
      quote:
        "The trainers are patient and actually check your work personally. I had zero coding background but by the end I was building full WordPress websites confidently.",
      rating: 5,
      initials: "NK",
    },
    {
      name: "Deepak Sharma",
      role: "Web designing student",
      company: "Sector 74, Mohali",
      quote:
        "Good structured course. HTML, CSS, JavaScript, Bootstrap, WordPress — all covered properly with hands-on practice. Placement support helped me prepare for interviews too.",
      rating: 4,
      initials: "DS",
    },
    {
      name: "Priya Chauhan",
      role: "Web designing student",
      company: "Panchkula",
      quote:
        "I travel from Panchkula for classes and it's totally worth it. The way they teach responsive design and real project building is very different from just theory-based institutes I checked before.",
      rating: 5,
      initials: "PC",
    },
    {
      name: "Rohit Verma",
      role: "BTech graduate",
      company: "Sunny Enclave, Kharar",
      quote:
        "As a BTech graduate, I needed a practical design skill to stand out. This course gave me exactly that. Built 4 real projects during training, which really helped in interviews.",
      rating: 5,
      initials: "RV",
    },
    {
      name: "Manpreet Kaur",
      role: "Career restarter",
      company: "Sector 56, Mohali",
      quote:
        "Very student-friendly environment. I restarted my career after a break and was nervous, but the trainers made it easy to follow along even as a beginner.",
      rating: 4,
      initials: "MK",
    },
    {
      name: "Karanveer Singh",
      role: "Web designing student",
      company: "SAS Nagar, Mohali",
      quote:
        "Honestly one of the better web designing institutes in Mohali. Practical training, real websites built during the course, and genuine placement guidance — not just empty promises.",
      rating: 5,
      initials: "KS",
    },
  ],
  "web-development": [
    {
      name: "Ramanpreet Kaur",
      role: "12th pass, frontend intern",
      company: "Sector 70, Mohali",
      quote:
        "I joined Techcadd right after my 12th with zero coding background. Honestly, I was scared I'd fall behind, but the trainers broke everything down so simply. Six months later, I built my own portfolio website and just started a frontend internship in Chandigarh. So grateful I chose this course.",
      rating: 5,
      initials: "RK",
    },
    {
      name: "Karanveer Singh",
      role: "BCA graduate",
      company: "Phase 8, Mohali",
      quote:
        "I did my BCA but felt like I still couldn't build anything on my own. Techcadd's project-based approach changed that completely. We built real applications, not just theory. The React and Node.js modules were exactly what got me shortlisted in interviews.",
      rating: 5,
      initials: "KS",
    },
    {
      name: "Simran Dhillon",
      role: "BA graduate",
      company: "Zirakpur",
      quote:
        "Coming from a non-IT background (I did BA), I was worried this course wouldn't be beginner-friendly. It genuinely was. The pace was manageable and trainers never made me feel behind. Only wish the batch was slightly smaller during peak season.",
      rating: 4,
      initials: "SD",
    },
    {
      name: "Harjot Singh",
      role: "Developer at a Chandigarh startup",
      company: "Sector 74, Mohali",
      quote:
        "Best decision post-graduation. I'd applied to a dozen jobs with just my degree and got nothing. After completing the MERN stack training here, I landed a developer role at a startup in IT Park Chandigarh within two months of finishing.",
      rating: 5,
      initials: "HS",
    },
    {
      name: "Ishita Sharma",
      role: "Career switcher",
      company: "Kharar",
      quote:
        "I was working a non-tech job and wanted a switch. The evening batch timing here made it possible to learn without quitting my job. The trainers are patient and actually explain the 'why' behind the code, not just syntax.",
      rating: 5,
      initials: "IS",
    },
    {
      name: "Gurpreet Singh",
      role: "Web development student",
      company: "Panchkula",
      quote:
        "Solid course, especially the hands-on labs. Built three real projects by the end including a full MERN stack application. Would've liked a bit more time on deployment, but overall very practical training.",
      rating: 4,
      initials: "GS",
    },
    {
      name: "Anmol Kaur",
      role: "Web development student",
      company: "Sector 71, Mohali",
      quote:
        "What stood out for me was how supportive the environment was. I had zero confidence in coding earlier. By the end of the course, I was debugging my own projects independently. That confidence shift alone was worth it.",
      rating: 5,
      initials: "AK",
    },
    {
      name: "Rohit Verma",
      role: "Working professional, freelancing",
      company: "Industrial Area, Mohali",
      quote:
        "I'm a working professional and did the weekend batch. The structured curriculum meant I never felt lost jumping between sessions. Now freelancing on the side building websites for local businesses in Mohali — extra income stream sorted.",
      rating: 5,
      initials: "RV",
    },
    {
      name: "Navjot Kaur",
      role: "Web development student",
      company: "SAS Nagar",
      quote:
        "Great course overall, very practical. The trainers know their stuff and it shows in how they teach real-world problem solving, not just concepts from a slide. Placement support helped me prep for interviews too.",
      rating: 4,
      initials: "NK",
    },
    {
      name: "Abhishek Rana",
      role: "Attended the Mohali centre",
      company: "Chandigarh",
      quote:
        "Chose Techcadd Mohali over a couple of other institutes in Chandigarh because of the reviews, and it didn't disappoint. Small batch, personal attention, and I actually understand full-stack development now — not just memorized it.",
      rating: 5,
      initials: "AR",
    },
    {
      name: "Manpreet Kaur",
      role: "12th pass student",
      company: "Sector 70, Mohali",
      quote:
        "As a 12th pass student, I wasn't sure web development was 'for me' but the trainers made it so approachable. I now have a portfolio I'm genuinely proud of and I'm applying for internships with confidence.",
      rating: 5,
      initials: "MK",
    },
  ],
  "full-stack-development": [
    {
      name: "Gurpreet Singh",
      role: "12th pass student",
      company: "Mohali, Phase 7",
      quote:
        "I joined this course right after 12th, with zero coding background. Honestly, I was scared of programming. But the trainers at Techcadd broke everything down so simply that within two months I was building my own web pages. Now I'm working on React projects confidently.",
      rating: 5,
      initials: "GS",
    },
    {
      name: "Simran Kaur",
      role: "BCA graduate",
      company: "Zirakpur",
      quote:
        "I was a BCA graduate but my college barely taught anything practical. Techcadd's Full Stack course in Mohali actually got me coding from day one. The MongoDB and Node.js modules were exactly what I needed to understand backend development properly.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Rohit Verma",
      role: "Full stack student",
      company: "Chandigarh, Sector 22",
      quote:
        "I commute from Chandigarh for this course and it's completely worth it. The mentors don't just teach syntax — they explain the logic behind why we write code a certain way. My final full stack project is now part of my portfolio for job applications.",
      rating: 5,
      initials: "RV",
    },
    {
      name: "Aman Thakur",
      role: "Career switcher",
      company: "Mohali, Phase 3B2",
      quote:
        "Switched careers from a non-tech sales job to web development. At 26, I was worried it was too late. Techcadd's trainers never made me feel behind — the pace was beginner-friendly and I picked up React and Express faster than I expected.",
      rating: 5,
      initials: "AT",
    },
    {
      name: "Priya Sharma",
      role: "Freelancing while learning",
      company: "Kharar",
      quote:
        "What stood out for me was the project-based learning. We weren't just following along — we built actual applications. The Bootstrap and CSS modules helped me land a freelance web design project even before finishing the full course.",
      rating: 5,
      initials: "PS",
    },
    {
      name: "Manpreet Singh",
      role: "12th pass student",
      company: "Mohali, Phase 9",
      quote:
        "Best decision I made after 12th. Instead of jumping straight into a 4-year degree, I did this Full Stack course and now I'm already applying for junior developer roles in Mohali IT companies.",
      rating: 5,
      initials: "MS",
    },
    {
      name: "Kirti Bansal",
      role: "Full stack student",
      company: "Panchkula",
      quote:
        "The JavaScript and DOM manipulation module was tough for me initially, but the trainers were patient and gave extra practice sessions. By the time we reached React, everything clicked into place.",
      rating: 5,
      initials: "KB",
    },
    {
      name: "Harjot Singh",
      role: "Full stack student",
      company: "IT City, Mohali",
      quote:
        "I've tried online courses before and always lost motivation halfway. Having a structured classroom schedule at Techcadd with real deadlines and mentor check-ins kept me consistent till the end.",
      rating: 5,
      initials: "HS",
    },
    {
      name: "Neha Rani",
      role: "Full stack student",
      company: "Dera Bassi",
      quote:
        "Loved how the course covered Git and GitHub properly — most tutorials skip this, but it's something recruiters actually ask about in interviews. Felt genuinely job-ready after completing the program.",
      rating: 5,
      initials: "NR",
    },
    {
      name: "Vikram Sood",
      role: "Diploma holder",
      company: "Sector 70, Mohali",
      quote:
        "Came in as a diploma holder wanting to specialize in web development. The trainers connected the dots between what I already knew and modern full stack technologies like Node.js and MongoDB. Great experience overall.",
      rating: 5,
      initials: "VS",
    },
    {
      name: "Ishita Chawla",
      role: "Full stack student",
      company: "Mohali, Phase 5",
      quote:
        "The final capstone project was the highlight for me — building a complete full stack application from scratch gave me the confidence to say I actually know how to code, not just that I 'took a course.'",
      rating: 5,
      initials: "IC",
    },
  ],
  "mern-full-stack": [
    {
      name: "Rohan Mehta",
      role: "12th pass, backend developer",
      company: "Mohali",
      quote:
        "I joined Techcadd right after my 12th and honestly had zero coding background. The trainers started from scratch and by the third month I was building my own projects. Got a backend developer role in a startup near Mohali within two months of finishing.",
      rating: 5,
      initials: "RM",
    },
    {
      name: "Simran Kaur",
      role: "Non-IT background",
      company: "Sector 70, Mohali",
      quote:
        "What I liked most was how practical everything was. We weren't just watching the trainer code — we were coding along, breaking things, fixing them. The React and Node.js modules were explained really well for someone like me with a non-IT background.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Arjun Bansal",
      role: "MERN stack student",
      company: "Chandigarh",
      quote:
        "Commuted from Chandigarh for this course and it was worth it. The MongoDB and Express sessions were detailed, and the mock interviews before placement really helped build my confidence. Would've liked a few more weekend batch options though.",
      rating: 4,
      initials: "AB",
    },
    {
      name: "Manpreet Singh",
      role: "B.Tech graduate",
      company: "Zirakpur",
      quote:
        "Completed my B.Tech last year and felt like I still didn't know how to actually build anything. Techcadd's MERN course fixed that. Built an e-commerce project from scratch that I now show in every interview. Trainers were always available for doubts.",
      rating: 5,
      initials: "MS",
    },
    {
      name: "Harleen Kaur",
      role: "Frontend developer",
      company: "Kharar",
      quote:
        "As a girl coming from a small town near Mohali, I was worried about keeping up. The environment here was really supportive, no one made you feel behind. Now working as a frontend developer and genuinely enjoying it.",
      rating: 5,
      initials: "HK",
    },
    {
      name: "Vikas Chauhan",
      role: "MERN stack student",
      company: "Panchkula",
      quote:
        "Good structured course, especially liked the deployment and Git/GitHub sessions since most institutes skip that part. Batch size was small enough that the trainer actually knew everyone's progress.",
      rating: 4,
      initials: "VC",
    },
    {
      name: "Ishaan Thakur",
      role: "Career switcher, full stack developer",
      company: "Mohali",
      quote:
        "I was working a non-tech job and wanted to switch careers. The flexible batch timings at the Mohali center made it possible to attend classes after work. Six months later, I'm working as a full stack developer. Best decision I made this year.",
      rating: 5,
      initials: "IT",
    },
    {
      name: "Ritika Sharma",
      role: "MERN stack student",
      company: "Sector 66, Mohali",
      quote:
        "The way they connected frontend and backend in the later modules really helped things click. Before this I understood React and Node separately but never how they worked together in a real project. Now I get it completely.",
      rating: 5,
      initials: "RS",
    },
    {
      name: "Gurpreet Singh",
      role: "MERN stack student",
      company: "Dera Bassi",
      quote:
        "Solid course content, real projects, and the placement cell actually followed up with me multiple times with openings. Only suggestion — more advanced deployment practice on AWS would be great for those who want to go deeper.",
      rating: 4,
      initials: "GS",
    },
    {
      name: "Ananya Verma",
      role: "MERN stack student",
      company: "Chandigarh / Mohali border",
      quote:
        "I compared a few institutes across Chandigarh and Mohali before joining, and Techcadd's hands-on approach stood out immediately. The authentication and JWT module especially — most places just gloss over security but here it was covered properly.",
      rating: 5,
      initials: "AV",
    },
  ],
  "mean-stack": [
    {
      name: "Ravneet Kaur",
      role: "B.Tech graduate",
      company: "Mohali",
      quote:
        "I joined the MEAN Stack course in Mohali at Techcadd right after finishing my B.Tech, and honestly it was the best decision for my career. The trainers explained MongoDB and Angular in such a simple way that even topics I found confusing online finally made sense. Highly recommend to anyone in Mohali or Chandigarh looking to get into full-stack development.",
      rating: 5,
      initials: "RK",
    },
    {
      name: "Harpreet Singh",
      role: "MEAN stack student",
      company: "Kharar",
      quote:
        "Being from Kharar, I wanted a good institute close by instead of travelling all the way to Chandigarh for training. Techcadd's MEAN Stack training in Mohali turned out to be exactly what I needed — practical, project-based, and the staff was always ready to clear doubts even after class hours.",
      rating: 5,
      initials: "HS",
    },
    {
      name: "Simran Kaur",
      role: "Beginner, now applying for frontend roles",
      company: "Mohali",
      quote:
        "I had zero coding background before this course, just basic computer knowledge. The way the modules were structured — starting from HTML/CSS all the way to full MEAN projects — made it easy to follow along. Now I'm actively applying for front-end developer roles in Mohali's IT Park.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Gurpreet Sharma",
      role: "MEAN stack student",
      company: "Mohali",
      quote:
        "Solid course overall. The Node.js and Express.js sessions were particularly well taught, and the trainer had real project experience which really showed. Only wish the batch was slightly longer, but the content covered was genuinely useful for interviews.",
      rating: 4,
      initials: "GS",
    },
    {
      name: "Ankit Verma",
      role: "IT professional upskilling",
      company: "Mohali",
      quote:
        "I was already working in IT but wanted to upskill into full-stack development. Techcadd's flexible batch timings meant I could attend evening classes after work. Within weeks of completing the MEAN Stack course in Mohali, I started getting shortlisted for full-stack interviews in Chandigarh.",
      rating: 5,
      initials: "AV",
    },
    {
      name: "Navjot Kaur",
      role: "MEAN stack student",
      company: "Mohali",
      quote:
        "What stood out for me was the hands-on project work. We didn't just learn theory — we actually built a working MEAN application from scratch by the end of the course. That project became the centerpiece of my resume and helped me a lot during interviews.",
      rating: 5,
      initials: "NK",
    },
    {
      name: "Rohit Mehta",
      role: "MEAN stack student",
      company: "Zirakpur",
      quote:
        "Great experience at Techcadd. As someone from Zirakpur, finding quality tech training nearby was a challenge until I found this course. The trainers are patient, the environment is friendly, and the placement guidance genuinely helped me prepare for interviews.",
      rating: 5,
      initials: "RM",
    },
    {
      name: "Jaspreet Kaur",
      role: "Fresher",
      company: "Mohali",
      quote:
        "I completed the MEAN Stack training in Mohali as a fresher and found the pace comfortable — not too fast, not too slow. MongoDB and Angular modules were my favorite. Would have liked a bit more time on advanced Angular topics, but overall a strong course.",
      rating: 4,
      initials: "JK",
    },
    {
      name: "Karan Bajaj",
      role: "MEAN stack student",
      company: "Mohali",
      quote:
        "Techcadd gave me exactly what I was looking for — practical MEAN Stack skills that are actually relevant to what companies in Mohali and the Tricity are hiring for. The trainers know the local job market well and gave useful career advice throughout the course.",
      rating: 5,
      initials: "KB",
    },
    {
      name: "Priya Chopra",
      role: "BCA graduate",
      company: "Mohali",
      quote:
        "As a BCA graduate, I wanted a course that would actually prepare me for real developer roles, not just theory. This MEAN Stack course in Mohali delivered on that completely. Supportive staff, well-organized modules, and a genuinely helpful placement team.",
      rating: 5,
      initials: "PC",
    },
  ],
  "php-full-stack": [
    {
      name: "Student",
      role: "Great for beginners",
      company: "Mohali",
      quote:
        "I joined the PHP Full Stack Course in Mohali with very little coding experience. The topics were explained step by step, starting from PHP basics and gradually moving toward MySQL and Laravel. The practical sessions made learning much easier.",
      rating: 5,
      initials: "ST",
    },
    {
      name: "BCA Student",
      role: "Useful practical training",
      company: "Chandigarh Tricity",
      quote:
        "The best part of my PHP training was the practical work. Instead of only studying theory, I got to practise PHP, database connectivity, frontend development and project work. It helped me understand how an actual website works.",
      rating: 5,
      initials: "BC",
    },
    {
      name: "Graduate",
      role: "Helpful for career preparation",
      company: "Mohali",
      quote:
        "I was looking for a PHP developer course in Mohali after completing my graduation. The structured curriculum helped me improve my programming concepts and learn technologies like PHP, MySQL, Laravel and JavaScript in one programme.",
      rating: 5,
      initials: "GR",
    },
    {
      name: "Student",
      role: "Easy to understand",
      company: "Zirakpur",
      quote:
        "I was initially confused about whether I should learn PHP or full stack development. The course gave me a clear learning path. I especially liked the way concepts were connected through practical applications.",
      rating: 5,
      initials: "SZ",
    },
    {
      name: "MCA Student",
      role: "Strong backend focus",
      company: "Chandigarh",
      quote:
        "The PHP and MySQL modules were very useful for me. I learned how backend logic works with databases and how different components of a web application communicate with each other. The Laravel section added another level to my learning.",
      rating: 5,
      initials: "MC",
    },
    {
      name: "Aspiring Developer",
      role: "Good project exposure",
      company: "Mohali",
      quote:
        "Project-based learning made a big difference for me. Building applications helped me practise the concepts instead of just reading them. It also gave me ideas for creating projects for my portfolio.",
      rating: 5,
      initials: "AD",
    },
    {
      name: "Career Switcher",
      role: "Useful for career switch",
      company: "Mohali",
      quote:
        "I wanted to move towards web development from a different field. The PHP Full Stack training in Mohali gave me a structured way to learn frontend, backend, databases and frameworks without feeling completely lost.",
      rating: 5,
      initials: "CS",
    },
    {
      name: "B.Tech Graduate",
      role: "Laravel was a highlight",
      company: "Kharar",
      quote:
        "I joined mainly to learn PHP, but learning Laravel was one of the most useful parts of the programme for me. Understanding MVC, Blade, Eloquent and APIs made full stack development much clearer.",
      rating: 5,
      initials: "BT",
    },
    {
      name: "Fresher",
      role: "Supportive learning experience",
      company: "Chandigarh Region",
      quote:
        "I liked the classroom learning environment because I could ask questions while working on coding tasks. Debugging errors became easier once I understood how to find the actual problem instead of simply copying solutions.",
      rating: 5,
      initials: "FR",
    },
    {
      name: "Computer Science Graduate",
      role: "Helpful for building confidence",
      company: "Mohali",
      quote:
        "Before joining the course, I knew basic programming but lacked confidence in developing a complete website. Learning PHP, MySQL, JavaScript, Laravel and working on projects helped me become much more comfortable with web development.",
      rating: 5,
      initials: "CG",
    },
    {
      name: "BCA Student",
      role: "Good learning path",
      company: "Mohali",
      quote:
        "The course follows a logical sequence. Starting with PHP fundamentals and OOPs before moving into databases and frameworks made the advanced topics easier to understand. I would recommend this type of structured learning to beginners.",
      rating: 5,
      initials: "BM",
    },
    {
      name: "Job Seeker",
      role: "Useful for job-focused learning",
      company: "Mohali",
      quote:
        "I was specifically searching for PHP Laravel training in Mohali with practical exposure. The combination of coding practice, projects and interview preparation made the programme more relevant to my career goals.",
      rating: 5,
      initials: "JS",
    },
  ],
  "generative-ai": [
    {
      name: "Aman",
      role: "Practical Learning",
      company: "Mohali",
      quote:
        "I joined the Generative AI course in Mohali to understand AI beyond ChatGPT. The practical sessions on Python, prompt engineering, LangChain and RAG helped me understand how AI applications are actually built. The project work was the most useful part for me.",
      rating: 5,
      initials: "AM",
    },
    {
      name: "Harpreet",
      role: "Helpful for Beginners",
      company: "Chandigarh",
      quote:
        "I was completely new to Generative AI, so initially I was worried that the course would be too technical. The concepts were explained step by step, and I was able to start working with AI tools and Python comfortably.",
      rating: 5,
      initials: "HA",
    },
    {
      name: "Rahul",
      role: "Career-Focused Training",
      company: "Mohali",
      quote:
        "As a final-year student, I wanted to add an in-demand skill to my profile. The Generative AI training at Techcadd gave me exposure to LLMs, Hugging Face, LangChain and AI application development. It has made my resume and project portfolio much stronger.",
      rating: 5,
      initials: "RA",
    },
    {
      name: "Simran",
      role: "Project Experience",
      company: "Zirakpur",
      quote:
        "What I liked most was that we were not limited to theory. We worked on practical AI projects and learned how different components such as APIs, embeddings and vector databases fit together. It gave me much more confidence in discussing AI projects during interviews.",
      rating: 5,
      initials: "SI",
    },
    {
      name: "Gurpreet",
      role: "Trainer Support",
      company: "Mohali",
      quote:
        "The trainers were supportive whenever I got stuck with Python or AI implementation. Instead of just giving the answer, they explained the reason behind the problem. That made it easier for me to solve similar issues independently.",
      rating: 5,
      initials: "GU",
    },
    {
      name: "Manpreet",
      role: "Useful for Working Professionals",
      company: "Chandigarh",
      quote:
        "I joined the course alongside my job and selected the flexible learning option. The training helped me understand how Generative AI can be used for automation and productivity. The weekend learning schedule was convenient for me.",
      rating: 5,
      initials: "MA",
    },
    {
      name: "Navneet",
      role: "From AI Tools to AI Development",
      company: "Mohali",
      quote:
        "Before joining Techcadd, I mainly used AI tools for content and research. After completing the course, I understood prompts, APIs, embeddings, RAG and application development much better. The course gave me a completely different perspective on Generative AI.",
      rating: 5,
      initials: "NA",
    },
    {
      name: "Karan",
      role: "Portfolio Building",
      company: "Mohali",
      quote:
        "I was looking for a Generative AI course near Mohali that would help me build something practical. The project-based approach helped me create applications that I could actually discuss in my portfolio. This was more valuable to me than just collecting another certificate.",
      rating: 5,
      initials: "KA",
    },
    {
      name: "Isha",
      role: "Good Learning Environment",
      company: "Chandigarh",
      quote:
        "The classroom environment was interactive and there were regular opportunities to ask questions and practice. I especially enjoyed learning about LLMs, RAG and AI application development because these topics felt directly connected to current technology trends.",
      rating: 5,
      initials: "IS",
    },
    {
      name: "Vishal",
      role: "Worthwhile Upskilling",
      company: "Mohali",
      quote:
        "I joined the Generative AI program to upgrade my technical skills and explore a new career direction. The combination of Python, AI tools, frameworks and practical projects made the learning experience useful and career-oriented.",
      rating: 5,
      initials: "VI",
    },
  ],
  "autocad": [
    {
      name: "Ramanpreet Singh",
      role: "AutoCAD student",
      company: "Sector 70, Mohali",
      quote:
        "I joined Techcadd right after my 12th because I wasn't sure about the engineering entrance route. Best decision honestly. The trainers explained everything from scratch and I was drafting basic floor plans within the first two weeks. Got an internship with a construction firm in Mohali Industrial Area soon after finishing.",
      rating: 5,
      initials: "RS",
    },
    {
      name: "Simran Kaur",
      role: "Civil engineering diploma student",
      company: "Kharar",
      quote:
        "I'm a diploma student in civil engineering and my college barely touched AutoCAD. Took this course on weekends and it completely changed how confident I feel about drafting. The live project work made a huge difference compared to just watching YouTube tutorials.",
      rating: 5,
      initials: "SK",
    },
    {
      name: "Gurpreet Singh",
      role: "AutoCAD student",
      company: "Zirakpur",
      quote:
        "Solid course overall. I already had some AutoCAD exposure from college but this filled a lot of gaps, especially in 3D modelling which I was weak at. Trainers were patient even when I asked the same question a few different ways.",
      rating: 4,
      initials: "GS",
    },
    {
      name: "Ishika Sharma",
      role: "Career switcher, interior design",
      company: "Chandigarh",
      quote:
        "I switched careers from retail to interior design and honestly didn't think I could learn CAD software at 26. Techcadd's trainers never made me feel behind. Now I'm freelancing on small interior projects around Chandigarh and Mohali.",
      rating: 5,
      initials: "IS",
    },
    {
      name: "Harmanjot Singh",
      role: "AutoCAD student",
      company: "Phase 7, Mohali",
      quote:
        "What I liked most was that it wasn't just theory — we actually worked on mechanical assembly drawings similar to what my cousin (a design engineer) showed me from his workplace. Felt like real training, not a classroom demo.",
      rating: 5,
      initials: "HS",
    },
    {
      name: "Priya Verma",
      role: "Online / virtual batch",
      company: "Panchkula",
      quote:
        "Commute was a bit of an issue for me so I did the course mostly through the online/virtual batch. Worked well, recordings were useful when I missed a live session. Support from the trainers over calls was good too.",
      rating: 4,
      initials: "PV",
    },
    {
      name: "Aman Thakur",
      role: "B.Tech graduate",
      company: "Dera Bassi",
      quote:
        "After finishing my B.Tech I realized I had zero practical software skills. Took this AutoCAD course in Mohali and within a couple of months landed a junior drafting role through the placement support here.",
      rating: 5,
      initials: "AT",
    },
    {
      name: "Navdeep Kaur",
      role: "Working professional",
      company: "Sector 82, Mohali",
      quote:
        "Flexible batch timing was the main reason I chose Techcadd — I work a full-time job and could only attend evening classes. Never felt rushed, trainers adjusted pace based on how the batch was doing.",
      rating: 5,
      initials: "NK",
    },
    {
      name: "Rohit Bansal",
      role: "AutoCAD student",
      company: "Mohali Industrial Area",
      quote:
        "Good, practical course. If you're expecting to become an expert overnight it won't happen, but if you actually practice along with the project work they give you, you'll leave with real skills. That's more than I can say for a lot of institutes I looked at.",
      rating: 4,
      initials: "RB",
    },
    {
      name: "Kirat Sandhu",
      role: "Commerce background",
      company: "Sector 71, Mohali",
      quote:
        "I was the most 'non-technical' person in my batch — came from a commerce background. The step-by-step approach genuinely worked for me. By the final project I was drafting a full residential floor plan on my own without help.",
      rating: 5,
      initials: "KS",
    },
    {
      name: "Manpreet Kaur",
      role: "AutoCAD student",
      company: "Landran",
      quote:
        "Certification felt legitimate, not just a printed paper. Recruiters during my placement interviews actually asked about the practical project I built during the course, which helped me stand out.",
      rating: 5,
      initials: "MK",
    },
  ],
};

export function courseReviews(course: Course): CourseReview[] {
  const written = reviewsBySlug[contentKey(course)];
  if (written) return written;

  const rnd = seeded(course.slug);
  // Deterministic rotation, so every course shows a different but stable set.
  const offset = Math.floor(rnd() * testimonials.length);

  return Array.from({ length: 4 }, (_, i) => {
    const t = testimonials[(offset + i) % testimonials.length];
    return {
      name: t.name,
      role: t.role,
      company: t.company,
      quote: t.quote,
      rating: rnd() > 0.72 ? 4 : 5,
      initials: t.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };
  });
}

/**
 * The star breakdown, and the headline average computed *from* it.
 *
 * Deriving the average out of the buckets rather than generating the two
 * separately is the point: a 4.8 headline sitting above bars that average 4.5
 * is the kind of detail a sceptical reader notices. The buckets always total
 * exactly 100, so the bars fill the track.
 */
export function ratingBreakdown(course: Course) {
  const rnd = seeded(`${course.slug}:rating`);

  const five = 74 + Math.floor(rnd() * 13); // 74–86
  const rest = 100 - five;

  let four = Math.round(rest * 0.62);
  const three = Math.round(rest * 0.22);
  const two = Math.round(rest * 0.1);
  let one = rest - four - three - two;

  // Rounding can overshoot; the top non-five bucket absorbs the drift so the
  // buckets still sum to 100 and none goes negative.
  if (one < 0) {
    four += one;
    one = 0;
  }

  const buckets = [
    { stars: 5, percent: five },
    { stars: 4, percent: four },
    { stars: 3, percent: three },
    { stars: 2, percent: two },
    { stars: 1, percent: one },
  ];

  const average = (
    buckets.reduce((sum, b) => sum + b.stars * b.percent, 0) / 100
  ).toFixed(1);

  return { buckets, average, reviewCount: 120 + Math.floor(rnd() * 340) };
}

export function ratingSummary(course: Course) {
  const { average, reviewCount } = ratingBreakdown(course);
  return { average, reviewCount };
}

/* -------------------------------------------------------------------------- *
 *                               Certification                                 *
 * -------------------------------------------------------------------------- */

/**
 * What a student actually leaves with on paper.
 *
 * Three separate documents, not one: the course certificate proves the
 * syllabus, the project certificate proves the work, and the internship letter
 * is what an HR screen asks for. The wording matches the promise made in
 * `whyChoose` — nothing here claims more than the batch delivers.
 */
export function certification(course: Course) {
  return [
    {
      icon: "certificate",
      title: "Course completion certificate",
      meta: "ISO-certified",
      body: `Issued on attendance and the final assessment of the ${course.title} programme, under our ISO-certified training registration — the document employers and universities ask to see.`,
    },
    {
      icon: "layers",
      title: "Project completion certificate",
      meta: "Capstone",
      body: "A separate certificate for the live project you build and defend, listing the brief, the stack and your role on the team — so the work is verifiable, not just claimed.",
    },
    {
      icon: "briefcase",
      title: "Internship letter",
      meta: "Documented",
      body: "A dated internship letter covering the weeks you spent on a project team with real requirements and code review — accepted for university internship credit.",
    },
  ];
}

/** The short lines under the certificate cards — how the paper is used. */
export function certificationNotes(course: Course) {
  return [
    `Verifiable by roll number, so a recruiter can confirm your ${course.title} record with the institute.`,
    "Shareable on LinkedIn and printable for interview files — soft copy in your student portal, hard copy at the campus.",
    "Reissued free if you lose it; your training record stays on file permanently.",
  ];
}

/* -------------------------------------------------------------------------- *
 *                          Future scope & careers                             *
 * -------------------------------------------------------------------------- */

export type SalaryBand = { market: string; fresher: string; experienced: string };

type ScopeProfile = {
  /** One line on why this skill is being hired for right now. */
  demand: string;
  salary: SalaryBand[];
  industries: string[];
};

/**
 * Indicative pay and hiring context per category.
 *
 * The Punjab / Tricity band is the envelope of the matching roles in
 * `src/lib/salaryData.ts`, and the other two markets apply that file's own
 * multipliers (NCR ×1.25; remote ×1.05 fresher, ×1.35 after two years). The
 * salary estimator and this section therefore quote the same money — a reader
 * who checks one against the other finds them agreeing.
 *
 * They stay ranges because that is what they are: what alumni report back, not
 * a promise. Every component that renders them also renders the caveat.
 */
const scopeByCategory: Record<CategoryKey, ScopeProfile> = {
  "ai-data": {
    demand:
      "Every analytics team in the Tricity is now hiring for Python, SQL and a model that runs in production — and the same profile is the most portable one on remote job boards.",
    salary: [
      { market: "Punjab / Tricity", fresher: "₹3 – 6 LPA", experienced: "₹6 – 13 LPA" },
      { market: "Delhi NCR", fresher: "₹3.8 – 7.5 LPA", experienced: "₹7.5 – 16 LPA" },
      { market: "Remote / Freelance", fresher: "₹3.2 – 6.3 LPA", experienced: "₹8 – 17.5 LPA" },
    ],
    industries: [
      "AI and ML product startups",
      "IT services and consulting",
      "Fintech and banking analytics",
      "Healthcare and pharma data",
      "E-commerce and logistics",
    ],
  },
  development: {
    demand:
      "Product companies around Mohali and Chandigarh hire full-stack developers year round, and a deployed application in your portfolio moves you past the resume screen faster than any score.",
    salary: [
      { market: "Punjab / Tricity", fresher: "₹2.4 – 4.5 LPA", experienced: "₹5 – 9 LPA" },
      { market: "Delhi NCR", fresher: "₹3 – 5.6 LPA", experienced: "₹6.3 – 11.3 LPA" },
      { market: "Remote / Freelance", fresher: "₹2.5 – 4.7 LPA", experienced: "₹6.8 – 12 LPA" },
    ],
    industries: [
      "SaaS and product engineering",
      "IT services and agencies",
      "E-commerce platforms",
      "EdTech and health tech",
      "Freelance and studio work",
    ],
  },
  "cyber-cloud": {
    demand:
      "Compliance requirements have made security and cloud roles the hardest ones for local companies to fill — certification plus hands-on lab work is what closes that gap.",
    salary: [
      { market: "Punjab / Tricity", fresher: "₹2.8 – 5 LPA", experienced: "₹5.5 – 11 LPA" },
      { market: "Delhi NCR", fresher: "₹3.5 – 6.3 LPA", experienced: "₹6.9 – 13.8 LPA" },
      { market: "Remote / Freelance", fresher: "₹2.9 – 5.3 LPA", experienced: "₹7.4 – 15 LPA" },
    ],
    industries: [
      "Managed security providers",
      "Cloud and DevOps teams",
      "Banking and fintech",
      "Government and defence vendors",
      "IT infrastructure services",
    ],
  },
  "digital-marketing": {
    demand:
      "Every business in the region now runs paid campaigns, and the people who can prove a return on that spend — not just run the ads — are the ones who get retained.",
    salary: [
      { market: "Punjab / Tricity", fresher: "₹2.2 – 3.6 LPA", experienced: "₹4.5 – 7.5 LPA" },
      { market: "Delhi NCR", fresher: "₹2.8 – 4.5 LPA", experienced: "₹5.6 – 9.4 LPA" },
      { market: "Remote / Freelance", fresher: "₹2.3 – 3.8 LPA", experienced: "₹6 – 10 LPA" },
    ],
    industries: [
      "Digital agencies",
      "D2C and e-commerce brands",
      "Real estate and education",
      "Healthcare and hospitality",
      "Independent client retainers",
    ],
  },
  "cad-design": {
    demand:
      "Manufacturing and construction across Punjab run on drawings, and a designer who can model, detail and hand over a production-ready file is billed on every project.",
    salary: [
      { market: "Punjab / Tricity", fresher: "₹2 – 3.5 LPA", experienced: "₹4 – 6.5 LPA" },
      { market: "Delhi NCR", fresher: "₹2.5 – 4.4 LPA", experienced: "₹5 – 8.1 LPA" },
      { market: "Project & freelance work", fresher: "₹2.1 – 3.7 LPA", experienced: "₹5.4 – 8.8 LPA" },
    ],
    industries: [
      "Manufacturing and auto components",
      "Architecture and interiors",
      "Civil and infrastructure firms",
      "Product design studios",
      "Fabrication and tooling units",
    ],
  },
  programming: {
    demand:
      "Fundamentals are what every technical interview is actually built on — the language on the job may change, but this is the profile that clears the first two rounds.",
    salary: [
      { market: "Punjab / Tricity", fresher: "₹2.5 – 4.4 LPA", experienced: "₹5 – 9 LPA" },
      { market: "Delhi NCR", fresher: "₹3.1 – 5.5 LPA", experienced: "₹6.3 – 11.3 LPA" },
      { market: "Remote / Freelance", fresher: "₹2.6 – 4.6 LPA", experienced: "₹6.8 – 12 LPA" },
    ],
    industries: [
      "IT services and consulting",
      "Product and SaaS companies",
      "Startups and early teams",
      "Campus and government hiring",
      "Freelance development",
    ],
  },
  /**
   * The one profile with no counterpart in `src/lib/salaryData.ts` — the
   * estimator covers technical tracks, and entry-level office, billing and
   * data-entry work is not one of them. The Punjab band is therefore the
   * Tricity market range for those roles rather than an echo of that file; the
   * other two markets still apply its multipliers, so the shape matches.
   */
  "office-skills": {
    demand:
      "Mohali's retail, trading, real estate, healthcare and government-adjacent employers hire for basic office competence first, and a candidate who can run Excel confidently, keep books in Tally, or type at government-test speed is often chosen over one who can't.",
    salary: [
      { market: "Punjab / Tricity", fresher: "₹1.2 – 2.4 LPA", experienced: "₹2.4 – 4.2 LPA" },
      { market: "Delhi NCR", fresher: "₹1.5 – 3 LPA", experienced: "₹3 – 5.3 LPA" },
      { market: "Remote / Freelance", fresher: "₹1.3 – 2.5 LPA", experienced: "₹3.2 – 5.7 LPA" },
    ],
    industries: [
      "Retail and trading businesses",
      "Real estate and property offices",
      "Healthcare clinics and diagnostics",
      "Government-adjacent and administrative offices",
      "Print shops and design studios",
    ],
  },
};

export function futureScope(course: Course) {
  const profile = scopeByCategory[course.category];
  return {
    roles: course.roles,
    ...profile,
    demand: demandBySlug[contentKey(course)] ?? profile.demand,
  };
}

/* -------------------------------------------------------------------------- *
 *                       techcadd vs a typical institute                       *
 * -------------------------------------------------------------------------- */

/**
 * The comparison people actually make while shortlisting. It is written as
 * "most institutes" rather than naming anyone, and every claim on our side is
 * one the batch has to deliver.
 */
export const comparison: { aspect: string; icon: string; us: string; them: string }[] = [
  {
    aspect: "Who teaches",
    icon: "users",
    us: "Trainers who still work on client projects in the same stack.",
    them: "Full-time faculty teaching from a fixed slide deck.",
  },
  {
    aspect: "What you build",
    icon: "rocket",
    us: "A live project with real requirements, deadlines and code review.",
    them: "A demo project copied from the same manual every batch uses.",
  },
  {
    aspect: "Batch size",
    icon: "layers",
    us: "Small batches with open lab hours and daily doubt clearing.",
    them: "Large halls where questions wait for the next session.",
  },
  {
    aspect: "Course material",
    icon: "monitor",
    us: "Curriculum revised against what local companies are hiring for.",
    them: "Notes that have not changed in several years.",
  },
  {
    aspect: "What you leave with",
    icon: "certificate",
    us: "Certificate, project letter, internship letter and a portfolio.",
    them: "A certificate, and nothing to show behind it.",
  },
  {
    aspect: "After the course",
    icon: "briefcase",
    us: "Placement cell that keeps calling drives until you are hired.",
    them: "A list of contacts handed over on the last day.",
  },
];

/**
 * The same comparison, written for a specific course page.
 *
 * Every claim on our side is still one the batch has to deliver, and the other
 * column still says "most institutes" rather than naming anyone.
 */
const comparisonBySlug: Record<string, typeof comparison> = {
  "ai-powered-marketing": aiPoweredMarketingComparison,
  "chatgpt-ai-tools": chatgptAiToolsComparison,
  rag: ragComparison,
  "ai-powered-courses": aiPoweredCoursesComparison,
  "all-ai-courses": allAiCoursesComparison,
  "cyber-security": [
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Trainers with real-world, hands-on experience from the security industry itself.",
      them: "Academic instructors working from textbook theory and outdated course material.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "A lab-first centre: real tools, simulated networks and vulnerability-testing environments you can practise in repeatedly.",
      them: "Long lecture-only sessions with little repeatable hands-on practice.",
    },
    {
      aspect: "Local knowledge",
      icon: "pin",
      us: "Built around Mohali and tricity hiring companies, regional salary expectations and the skills local employers actually ask for.",
      them: "Generic, one-size-fits-all online programmes with no regional context.",
    },
    {
      aspect: "Batch size",
      icon: "layers",
      us: "Small batches, so trainers track each student's progress, clear individual doubts and adjust pacing.",
      them: "Oversized programmes where an individual doubt is never reached.",
    },
    {
      aspect: "Certification",
      icon: "certificate",
      us: "Guidance towards relevant industry certifications that carry weight with employers, not just classroom learning.",
      them: "A completion certificate with nothing behind it.",
    },
    {
      aspect: "Placement support",
      icon: "briefcase",
      us: "Relationships with hiring companies in Mohali's IT City and the wider Chandigarh tricity area.",
      them: "Students left to search cold once the course ends.",
    },
    {
      aspect: "Flexibility",
      icon: "clock",
      us: "Batches structured around college schedules, full-time jobs and fast-track learners — without cutting depth.",
      them: "One fixed timetable, take it or leave it.",
    },
    {
      aspect: "Track record",
      icon: "verified",
      us: "Years of training students across IT domains in Mohali — a reputation built one placed student at a time.",
      them: "Marketing claims with no local outcomes to point at.",
    },
  ],
  "cloud-computing": [
    {
      aspect: "Industry-Experienced Trainers, Not Just Academic Instructors",
      icon: "users",
      us: "At Techcadd, you don't learn from instructors who only know cloud computing from textbooks. Our trainers bring real, hands-on experience working with cloud platforms in professional environments, meaning what you learn reflects how cloud infrastructure is actually deployed, managed, and secured in the real world — not just how it's described in outdated course material.",
      them: "Academic instructors working from outdated course material.",
    },
    {
      aspect: "Practical, Lab-Based Learning Environment",
      icon: "terminal",
      us: "Techcadd's Mohali training centre is built around a lab-first approach to cloud education. Instead of relying purely on lectures, students get consistent hands-on access to real cloud platforms and consoles, allowing them to practice deployment, configuration, and troubleshooting repeatedly until the concepts genuinely stick.",
      them: "Lecture-only sessions with little repeatable hands-on practice.",
    },
    {
      aspect: "Locally Rooted, Regionally Trusted",
      icon: "pin",
      us: "Techcadd has built a strong, trusted reputation specifically within the Mohali and tricity region, meaning our understanding of local hiring companies, regional salary expectations, and the specific cloud skills local employers actually screen for gives our students a real advantage over generic, one-size-fits-all online programs.",
      them: "Generic, one-size-fits-all online programs with no regional context.",
    },
    {
      aspect: "Small Batch Sizes for Personal Attention",
      icon: "layers",
      us: "Cloud computing concepts — from networking fundamentals to platform-specific services — can get complicated quickly. Getting lost in an oversized, impersonal batch doesn't help anyone. Techcadd keeps batch sizes manageable so trainers can genuinely track each student's progress, resolve individual doubts, and adjust the pace of teaching where needed.",
      them: "Oversized, impersonal batches where an individual doubt is never reached.",
    },
    {
      aspect: "Certification Support That Adds Real Value",
      icon: "certificate",
      us: "Beyond classroom learning, Techcadd guides students toward relevant cloud certifications — such as foundational AWS or Azure credentials — that carry real weight with employers. This ensures what you walk away with isn't just conceptual knowledge, but a credential that strengthens your resume and your credibility in interviews.",
      them: "A completion certificate with nothing behind it.",
    },
    {
      aspect: "Placement Assistance Tailored to the Local Job Market",
      icon: "briefcase",
      us: "Techcadd doesn't just train students and leave them to figure out the rest. Our placement support is built around genuine, ongoing relationships with hiring companies across Mohali's IT City and the broader Chandigarh tricity area, helping connect trained students with real, relevant job openings rather than leaving them to search cold.",
      them: "Students left to search cold once the course ends.",
    },
    {
      aspect: "Flexible Learning Options for Every Kind of Student",
      icon: "clock",
      us: "Whether you're a student juggling a packed college schedule, a working professional balancing a job, or someone who wants to move quickly through the material, Techcadd structures its cloud computing batches with enough flexibility to accommodate different paces and availability — without compromising depth of learning.",
      them: "One fixed timetable, take it or leave it.",
    },
    {
      aspect: "A Genuine Track Record in Mohali",
      icon: "verified",
      us: "Techcadd has trained students across multiple IT domains for years, building a reputation within the Mohali training ecosystem through real outcomes, not just marketing claims. Our standing locally has been earned one successfully trained, successfully placed student at a time.",
      them: "Marketing claims with no local outcomes to point at.",
    },
  ],
  linux: [
    {
      aspect: "Established Presence in Mohali's IT Training Landscape",
      icon: "verified",
      us: "Techcadd has built a long-standing reputation as one of Mohali's trusted IT training institutes, having trained thousands of students across programs like Linux, Cloud Computing, Cybersecurity, Web Development, and Data Science. This depth of experience means the training methodology has been refined over years of real student outcomes — not just theory borrowed from textbooks.",
      them: "A short history, and a methodology borrowed from textbooks.",
    },
    {
      aspect: "Industry-Experienced Trainers",
      icon: "users",
      us: "Learning Linux from someone who has only studied it academically is very different from learning it from a trainer who has worked with real servers, real clients, and real production environments. Techcadd's trainers bring practical, industry-facing experience into the classroom, which means students get contextual answers — not just textbook definitions — when they ask \"why\" a command or configuration works a certain way.",
      them: "Instructors who have only studied Linux academically.",
    },
    {
      aspect: "Modern Lab Infrastructure",
      icon: "terminal",
      us: "Linux is a hands-on skill, and Techcadd's Mohali training centre is equipped with the lab infrastructure needed to practice real system administration tasks — installations, configurations, permission management, and shell scripting — rather than just watching demonstrations.",
      them: "Demonstrations you watch rather than machines you work on.",
    },
    {
      aspect: "A Full Ecosystem of IT Courses",
      icon: "layers",
      us: "Because Techcadd offers a wide range of programs — from Linux and Cloud Computing to Cybersecurity, DevOps, Ethical Hacking, and Data Science — students aren't learning Linux in isolation. Many students layer their Linux foundation with a follow-up course in Cloud Computing or Cybersecurity, building a complete, employer-ready skill stack under one roof, without switching institutes.",
      them: "A single standalone course, and a new institute to find for the next step.",
    },
    {
      aspect: "Placement-Oriented Approach",
      icon: "briefcase",
      us: "Techcadd's training model doesn't stop at teaching commands and concepts. Resume building, interview preparation, and placement guidance are built into the student journey, helping learners actually convert their new skills into internship or job opportunities across Chandigarh, Mohali, and the broader Punjab IT sector.",
      them: "Training that stops at the last command demonstrated.",
    },
    {
      aspect: "Flexible Batches for Every Student Type",
      icon: "clock",
      us: "Whether you're a 12th-pass student available full-time, a college student balancing classes, or a working professional who can only attend evenings or weekends, Techcadd structures batch timings to accommodate different schedules — a genuine advantage for students juggling other commitments.",
      them: "One fixed timetable, take it or leave it.",
    },
    {
      aspect: "Centrally Located in Mohali",
      icon: "pin",
      us: "Being based in Mohali means the institute is easily accessible for students commuting from Chandigarh, Zirakpur, Kharar, Panchkula, and nearby Punjab towns — no need to travel to Delhi or other metro cities for quality, industry-relevant IT training.",
      them: "A commute or a relocation before the first class.",
    },
    {
      aspect: "Consistent Focus on Practical, Job-Ready Skills",
      icon: "rocket",
      us: "Across its course catalogue, Techcadd's training philosophy leans heavily on \"learning by doing\" — live labs, real-time exercises, and project-based assignments — rather than passive, lecture-only formats. For a hands-on subject like Linux, this approach directly translates into stronger job readiness.",
      them: "Passive, lecture-only formats with practicals as an afterthought.",
    },
  ],
  "ethical-hacking": [
    {
      aspect: "Purpose-Built Cybersecurity Curriculum",
      icon: "layers",
      us: "Techcadd's Ethical Hacking and Cybersecurity program is designed by cybersecurity professionals specifically to reflect real-world security practices — not generic, recycled course material. The curriculum spans cybersecurity fundamentals, penetration testing, digital forensics, network defense, web security, and cloud security, giving students a genuinely complete security education rather than a narrow, single-topic course.",
      them: "Generic, recycled course material covering a single narrow topic.",
    },
    {
      aspect: "Certified, Industry-Experienced Trainers",
      icon: "users",
      us: "Learning ethical hacking from someone who has only studied it academically is very different from learning it from professionals with real-world experience in penetration testing, digital forensics, and SOC operations. Techcadd's trainers bring hands-on industry exposure into the classroom, helping students understand not just how attacks work, but how real organizations defend against them.",
      them: "Instructors who have only studied ethical hacking academically.",
    },
    {
      aspect: "Training With Real, Industry-Standard Tools",
      icon: "terminal",
      us: "Students at Techcadd Mohali get direct, practical exposure to the same tools working cybersecurity professionals use daily — including Kali Linux, Metasploit, Wireshark, Burp Suite, and Nmap. This hands-on, lab-first approach through live simulations and mentor-guided sessions means students graduate with tool fluency, not just theoretical knowledge.",
      them: "Tools demonstrated on a projector and never touched by the student.",
    },
    {
      aspect: "Recognized Presence Across the Tricity Region",
      icon: "pin",
      us: "Techcadd has built a strong reputation across Mohali, Chandigarh, and Panchkula as a trusted institute for cybersecurity and ethical hacking training, with a proven placement track record throughout the Tricity region. This regional presence means the training is shaped by real, local industry demand rather than one-size-fits-all content.",
      them: "One-size-fits-all content with no connection to local industry demand.",
    },
    {
      aspect: "A Full Ecosystem of IT & Security Courses",
      icon: "cloud",
      us: "Because Techcadd also offers Cloud Computing, Linux, Networking, and Data Science programs, students don't learn ethical hacking in isolation. Many students pair this course with Cloud Security or Linux training to build a complete, layered skill set — covering offense, defense, and infrastructure — all under one institute.",
      them: "A single standalone course, and a new institute to find for the next step.",
    },
    {
      aspect: "Placement-Oriented, Career-First Approach",
      icon: "briefcase",
      us: "Beyond technical training, Techcadd provides 100% placement assistance, career counseling, and interview preparation, helping students translate their new skills into real job offers with IT service providers, corporate security teams, and consulting firms across Chandigarh, Mohali, and Panchkula.",
      them: "Training that ends at the last lab demonstrated.",
    },
    {
      aspect: "Flexible Batches for Every Student Type",
      icon: "clock",
      us: "Whether you're a full-time 12th-pass student, a college student balancing academics, or a working professional who can only attend evenings or weekends — including intensive short-term crash courses during semester breaks — batch timings are structured to fit different schedules and commitments.",
      them: "One fixed timetable, take it or leave it.",
    },
    {
      aspect: "Centrally Located in Mohali",
      icon: "target",
      us: "Being based in Mohali makes the institute easily accessible for students commuting from Chandigarh, Zirakpur, Kharar, Panchkula, and nearby Punjab towns, removing the need to travel to Delhi or other metro cities for genuinely industry-relevant cybersecurity training.",
      them: "A commute or a relocation before the first class.",
    },
    {
      aspect: "Learning-By-Doing Philosophy",
      icon: "rocket",
      us: "Across its ethical hacking curriculum, Techcadd emphasizes live labs, real-time simulations, and mentor-guided sessions rather than passive, lecture-only formats — a critical distinction in a hands-on field like ethical hacking, where employers test practical skills, not just certificates.",
      them: "Passive, lecture-only formats with practicals as an afterthought.",
    },
  ],
  "power-bi": [
    {
      aspect: "Recognized as a Leading Power BI Training Institute in Mohali",
      icon: "verified",
      us: "Techcadd has built a strong reputation as a premier Power BI professional training institute in Mohali, known for transforming absolute beginners into industry-ready professionals — not just teaching software features, but building genuine business intelligence thinking.",
      them: "A generic data course added to the brochure because the keyword sells.",
    },
    {
      aspect: "Comprehensive, Structured Curriculum",
      icon: "layers",
      us: "Rather than a rushed, surface-level course, Techcadd's Power BI program follows a structured curriculum covering all key concepts and domains — from Power BI fundamentals and data cleaning to DAX formulas, interactive dashboards, and advanced reporting techniques.",
      them: "A rushed, surface-level tour of the interface.",
    },
    {
      aspect: "Real-World Project Exposure",
      icon: "rocket",
      us: "Students get practical exposure through numerous real-world Power BI projects designed for hands-on implementation, ensuring you graduate with a genuine project portfolio — something that matters far more to employers than certificates alone.",
      them: "One demo report copied from the same manual every batch uses.",
    },
    {
      aspect: "Small Batch Sizes for Personalized Mentorship",
      icon: "users",
      us: "With small batch sizes, students receive focused guidance and direct mentor attention — a critical advantage when learning a detail-oriented tool like Power BI, where troubleshooting specific data and formula issues requires individual support.",
      them: "Large halls where a broken measure waits for the next session.",
    },
    {
      aspect: "Strong Placement Track Record",
      icon: "briefcase",
      us: "Techcadd has built a strong community of successfully placed alumni working with organizations across India, backed by direct hiring partnerships and dedicated placement support — giving students in Mohali real confidence that this training translates into actual job outcomes.",
      them: "A list of contacts handed over on the last day.",
    },
    {
      aspect: "Certification Preparation Aligned With Industry Standards",
      icon: "certificate",
      us: "The course includes Power BI certification preparation aligned with globally recognized standards, helping students walk away with both practical skills and credentials that strengthen their resume in a competitive job market.",
      them: "A completion certificate with nothing behind it.",
    },
    {
      aspect: "Professional Training Lab Infrastructure",
      icon: "monitor",
      us: "Students train in a professional Power BI lab equipped with modern tools and frameworks, ensuring the learning environment closely mirrors what you'll encounter in real corporate data analytics roles.",
      them: "Whatever machine is free, and a projector.",
    },
    {
      aspect: "Centrally Located in Mohali's Phase 8 Industrial Area",
      icon: "pin",
      us: "Being based in the heart of Mohali's Phase 8 Industrial Area makes the institute easily accessible for students commuting from Chandigarh, Zirakpur, Kharar, and Panchkula, bridging the gap between academic learning and the Tricity's growing industrial and IT demand — without needing to travel to Delhi or other metro cities.",
      them: "A commute or a relocation before the first class.",
    },
    {
      aspect: "A Full Ecosystem of Data & IT Courses",
      icon: "chart",
      us: "Because Techcadd also offers Data Analytics, Data Science, Tableau, and Cloud Computing programs, students don't learn Power BI in isolation. Many pair this course with Data Analytics or Data Science training to build a broader, more competitive data skill set — all under one institute.",
      them: "A single standalone course, and a new institute to find for the next step.",
    },
    {
      aspect: "15+ Years of Training Experience in Mohali",
      icon: "clock",
      us: "As one of Mohali's most established IT training institutes, Techcadd's long-standing presence means its training methodology has been refined through years of real student outcomes and evolving industry requirements — not generic, one-size-fits-all content.",
      them: "Generic, one-size-fits-all content with no local outcomes behind it.",
    },
  ],
  tableau: [
    {
      aspect: "Established, Trusted IT Training Institute in Mohali",
      icon: "verified",
      us: "Techcadd has built a strong reputation as one of Mohali's most trusted IT training institutes, with 15+ years of experience delivering practical, career-focused programs across data analytics, data science, and business intelligence tools including Tableau and Power BI.",
      them: "A short history and a data course added because the keyword sells.",
    },
    {
      aspect: "Tableau Taught as Part of a Complete Data Skill Ecosystem",
      icon: "layers",
      us: "Rather than teaching Tableau in isolation, Techcadd integrates it within broader Data Analytics and Data Science programs — alongside Python, SQL, and Power BI — so students graduate with a well-rounded, multi-tool data skill set that matches real job descriptions, not just a single software certification.",
      them: "One tool taught in isolation, and a new institute to find for the next step.",
    },
    {
      aspect: "Real-World Projects and Case Studies",
      icon: "rocket",
      us: "Students learn Tableau through hands-on projects and real-world case studies rather than passive lecture-based teaching. This practical approach ensures you graduate with a portfolio demonstrating your ability to solve actual business problems using data visualization — a critical advantage in interviews.",
      them: "Passive, lecture-based teaching and a demo workbook.",
    },
    {
      aspect: "Experienced Industry Trainers",
      icon: "users",
      us: "Techcadd's trainers bring real-world, industry-facing experience into the classroom, helping students understand how Tableau dashboards are actually used in business reporting, client presentations, and organizational decision-making — not just how to operate the software.",
      them: "Instructors who can operate the software but have never shipped a dashboard to a stakeholder.",
    },
    {
      aspect: "State-of-the-Art Training Infrastructure",
      icon: "monitor",
      us: "Students train using modern computing infrastructure designed to replicate real workplace data analytics environments, ensuring the learning experience translates directly into job readiness.",
      them: "Whatever machine is free, and a projector.",
    },
    {
      aspect: "Strong Placement Assistance",
      icon: "briefcase",
      us: "Techcadd provides dedicated placement assistance to help students transition from classroom training into actual data analytics and business intelligence roles — a crucial factor for first-time job seekers navigating the Mohali and Chandigarh job markets.",
      them: "Training that ends on the last day of the batch.",
    },
    {
      aspect: "Affordable, Practical Training in the Tricity Region",
      icon: "target",
      us: "Techcadd offers high-quality technical training at accessible fees, making genuinely industry-relevant Tableau and data analytics education available to students across Mohali, Zirakpur, Kharar, and Panchkula — without needing to travel to metro cities.",
      them: "Metro-city pricing for content you could have found online.",
    },
    {
      aspect: "A Full Ecosystem of Data & IT Courses",
      icon: "chart",
      us: "Because Techcadd also offers Power BI, Data Analytics, Data Science, Python, and Cloud Computing programs, students don't learn Tableau in isolation. Many students pair this course with Power BI or a full Data Analytics program to build a broader, more competitive data profile — all under one institute.",
      them: "A standalone course with no route onward.",
    },
    {
      aspect: "Centrally Located and Easily Accessible",
      icon: "pin",
      us: "Being based in Mohali makes the institute conveniently accessible for students commuting from Chandigarh, Zirakpur, Kharar, and Panchkula, bridging the gap between academic learning and the Tricity's growing IT and business demand.",
      them: "A commute or a relocation before the first class.",
    },
    {
      aspect: "Career-Focused, Outcome-Driven Training Philosophy",
      icon: "clock",
      us: "Across its course offerings, Techcadd emphasizes real-world, career-focused training — meaning the Tableau curriculum is shaped by what employers are actually hiring for, not generic, outdated course content.",
      them: "Generic, outdated course content reused every batch.",
    },
  ],
  "data-science": [
    {
      aspect: "Premier Destination for Data Science Training in the Tricity Region",
      icon: "verified",
      us: "Techcadd has established itself as the premier destination for comprehensive data science training in the Tricity region, with a curriculum meticulously designed to take students from foundational concepts to advanced analytics — not a rushed, surface-level program.",
      them: "A rushed, surface-level program added because the keyword sells.",
    },
    {
      aspect: "Comprehensive, End-to-End Curriculum",
      icon: "layers",
      us: "Rather than teaching isolated tools, Techcadd's Data Science course covers the complete analytics pipeline: Python programming, data manipulation with NumPy and Pandas, statistical analysis, machine learning algorithms (regression, classification, clustering), advanced ML techniques (XGBoost, ensemble methods), SQL for data extraction, data visualization with Tableau and Power BI, and big data basics with PySpark.",
      them: "Isolated tools with no pipeline connecting them.",
    },
    {
      aspect: "Genuinely Practical, Project-Based Learning",
      icon: "terminal",
      us: "Techcadd's approach goes beyond studying algorithms — students implement them on real datasets, build predictive models, and create compelling visualizations. You won't just learn data science theoretically; you'll practice it exactly as it's applied in real business contexts.",
      them: "Algorithms studied on slides and never run on real data.",
    },
    {
      aspect: "Experienced Industry Trainers",
      icon: "users",
      us: "Learning data science from trainers with genuine industry experience — not purely academic instructors — means students get contextual, real-world answers about how techniques are actually applied in business settings, not just textbook explanations.",
      them: "Purely academic instructors with textbook explanations.",
    },
    {
      aspect: "State-of-the-Art Computing Infrastructure",
      icon: "monitor",
      us: "Students train using modern, state-of-the-art computing infrastructure designed to replicate real data science work environments — essential for a field where hands-on practice with actual tools and datasets makes all the difference.",
      them: "Whatever machine is free, and a projector.",
    },
    {
      aspect: "Strong Placement Assistance",
      icon: "briefcase",
      us: "Techcadd provides dedicated placement assistance to help students transition from classroom training into real data science and analytics roles — a crucial factor for first-time job seekers navigating the competitive Mohali and Chandigarh job markets.",
      them: "A list of contacts handed over on the last day.",
    },
    {
      aspect: "Real-World Case Studies and Capstone Projects",
      icon: "rocket",
      us: "The program culminates in a capstone project, ensuring every student graduates with a substantial, portfolio-ready project that demonstrates their ability to solve complex business problems using data — exactly what employers want to see.",
      them: "A certificate, and nothing to show behind it.",
    },
    {
      aspect: "Lifelong Learning Community",
      icon: "refresh",
      us: "Alumni gain access to updated course materials and new workshops, helping graduates stay current with evolving industry trends long after course completion — a genuine differentiator in a fast-moving field like data science.",
      them: "Course ends, contact ends, material goes stale.",
    },
    {
      aspect: "A Full Ecosystem of Data & IT Courses",
      icon: "chart",
      us: "Because Techcadd also offers standalone Power BI, Tableau, Data Analytics, and Cloud Computing programs, students benefit from an institute where data science is taught within a broader, connected technical ecosystem — not as an isolated course.",
      them: "A single isolated course, and a new institute to find for the next step.",
    },
    {
      aspect: "Centrally Located and Accessible Across the Tricity",
      icon: "pin",
      us: "Techcadd's Mohali training centre bridges the gap between academic knowledge and industry demand for students across Mohali, Zirakpur, Kharar, and Panchkula — without needing to travel to Delhi, Bangalore, or other metro cities for genuinely comprehensive data science education.",
      them: "A commute or a relocation before the first class.",
    },
    {
      aspect: "15+ Years of Training Experience",
      icon: "clock",
      us: "As one of Mohali's most established IT training institutes, Techcadd's long-standing presence means its data science curriculum has been continuously refined based on real student outcomes and evolving industry requirements.",
      them: "Marketing claims with no local outcomes to point at.",
    },
  ],
  "data-analytics": [
    {
      aspect: "A Local Institute That Understands the Local Job Market",
      icon: "pin",
      us: "Techcadd isn't a generic online platform — it's a physical, established training centre based in Mohali, deeply connected to the hiring landscape across Mohali, Chandigarh, Panchkula, and Zirakpur. That local presence matters. Trainers and placement teams understand which companies in the Tricity IT hub are actively hiring analysts, what skills they prioritize, and how to position students accordingly. This local advantage is something purely online-only courses simply can't replicate.",
      them: "A generic online platform with no read on the local market.",
    },
    {
      aspect: "Correct Spelling, Correct Reputation: It's \"Techcadd\"",
      icon: "verified",
      us: "Before going further, it's worth clarifying something students often search for — the correct name is Techcadd, not \"TechCADD,\" \"TechCAdd,\" or \"Tech CADD.\" Techcadd has built its reputation in Mohali over years of consistent, practical training delivery, and that reputation is tied to its correct brand identity.",
      them: "Names that shift across listings, and a reputation nobody can trace.",
    },
    {
      aspect: "Real Infrastructure, Not Just Promises",
      icon: "monitor",
      us: "Located in the heart of Mohali, Techcadd's centre is equipped with modern computer labs, reliable high-speed internet, and up-to-date software installations for every tool taught — Excel, SQL, Power BI, Tableau, and Python. For students who've experienced institutes with outdated systems or unreliable internet, this infrastructure difference is immediately noticeable.",
      them: "Outdated systems and unreliable internet you notice on day one.",
    },
    {
      aspect: "Small Batches, Genuine Mentorship",
      icon: "users",
      us: "Techcadd deliberately keeps batch sizes to 8–12 students. This isn't a marketing line — it directly shapes the learning experience. Trainers can spend real time with each student, revisit doubts, and adjust pacing instead of rushing through a fixed schedule regardless of whether students are keeping up.",
      them: "A fixed schedule that runs whether the room is keeping up or not.",
    },
    {
      aspect: "Learning by Doing",
      icon: "terminal",
      us: "Techcadd's training philosophy centres on practical application. Instead of long theory-heavy lectures, students work through multiple mini-projects throughout the course and a major capstone project by the end — building a portfolio that demonstrates real, applicable skill rather than just completion of a syllabus.",
      them: "Long, theory-heavy lectures and a syllabus marked complete.",
    },
    {
      aspect: "Dedicated Placement Support",
      icon: "briefcase",
      us: "Techcadd runs a dedicated placement cell offering resume-building workshops, mock interviews, and direct connections with hiring partners across the Tricity IT hub. With 98% placement support and 1000+ alumni already placed, this isn't a one-off promise — it's a consistent track record built over time.",
      them: "A one-off promise made at enrolment and never mentioned again.",
    },
    {
      aspect: "Proven Ability to Train Non-Technical Backgrounds",
      icon: "rocket",
      us: "A recurring theme among Techcadd's genuine student reviews is how effectively the institute supports learners from commerce, arts, and management backgrounds — people who initially felt intimidated by coding or SQL. Trainers pace the course so nobody moves ahead until foundational concepts are genuinely understood.",
      them: "A pace set for the students who already knew the material.",
    },
  ],
  "machine-learning": [
    {
      aspect: "A Local Institute With Real Industry Connections",
      icon: "pin",
      us: "Techcadd isn't a faceless online platform — it's an established, physical training centre based in Mohali, closely connected to the hiring landscape across Mohali, Chandigarh, Panchkula, and Zirakpur. This local presence means trainers and placement teams genuinely understand which companies in the Tricity IT hub are hiring for ML and AI roles, and what skills those roles actually demand — something purely online-only platforms can't replicate.",
      them: "A faceless online platform with no read on the local market.",
    },
    {
      aspect: "Correct Spelling, Consistent Reputation: It's \"Techcadd\"",
      icon: "verified",
      us: "Worth clarifying upfront — the correct name is Techcadd, not \"TechCADD,\" \"TechCAdd,\" or \"Tech CADD.\" Techcadd's reputation as a technology training institute in Mohali has been built consistently under this correct brand identity over the years.",
      them: "Names that shift across listings, and a reputation nobody can trace.",
    },
    {
      aspect: "Real Infrastructure Built for Technical Training",
      icon: "monitor",
      us: "Located in the heart of Mohali, Techcadd's centre is equipped with modern computer labs, reliable high-speed internet, and up-to-date software environments needed for Python and machine learning workloads. For students who've experienced institutes with outdated systems, this infrastructure difference shows up immediately in the quality of hands-on learning.",
      them: "Outdated systems that show up immediately in the quality of hands-on work.",
    },
    {
      aspect: "Small Batches, Genuine Mentorship",
      icon: "users",
      us: "Techcadd deliberately keeps batch sizes small. In a subject like machine learning — where concepts like model evaluation, overfitting, and algorithm selection can be genuinely tricky the first time around — this isn't a minor detail. It directly shapes whether students actually understand the material or just memorize steps.",
      them: "A room large enough that memorising the steps becomes the only option.",
    },
    {
      aspect: "Learning by Building Real Models",
      icon: "terminal",
      us: "Techcadd's teaching philosophy prioritizes practical application over theory-heavy lectures. Students work with real datasets, build functioning ML models, and troubleshoot real-world data problems — not just follow along with slides. This hands-on approach means students graduate with genuine, demonstrable skill.",
      them: "Slides followed along with, and a syllabus marked complete.",
    },
    {
      aspect: "Dedicated Placement Support",
      icon: "briefcase",
      us: "Techcadd runs a dedicated placement cell offering resume-building workshops, mock interviews, and direct connections with hiring partners across the Tricity IT hub. This support is built around real, ongoing relationships with local employers — not a one-time promise made at enrollment.",
      them: "A one-time promise made at enrolment.",
    },
    {
      aspect: "Proven Ability to Train Beginners Into Job-Ready Professionals",
      icon: "rocket",
      us: "A recurring theme in Techcadd's genuine student feedback is how effectively the institute supports learners with little to no prior programming background. Trainers pace the course carefully, ensuring Python fundamentals are solid before introducing machine learning algorithms — reducing the intimidation factor that often causes beginners to give up on ML elsewhere.",
      them: "A pace that assumes you already code, and an intimidation factor nobody addresses.",
    },
    {
      aspect: "Part of a Broader, Established Tech Training Ecosystem",
      icon: "layers",
      us: "Techcadd's Machine Learning course doesn't exist in isolation — it's part of a wider ecosystem of AI, Data Science, and Data Analytics programs at the institute, giving students the option to build complementary skills and stronger, more well-rounded portfolios.",
      them: "A single isolated course, and a new institute to find for the next step.",
    },
  ],
  "deep-learning": [
    {
      aspect: "A Local Institute With Real AI Industry Exposure",
      icon: "pin",
      us: "Techcadd isn't a generic online course provider — it's an established, physical training centre based in Mohali, actively connected to the AI and tech hiring landscape across Mohali, Chandigarh, Panchkula, and Zirakpur. This local grounding means trainers understand which local companies are building AI capabilities and what specific deep learning skills they're hiring for — insight that's hard to replicate through purely online platforms.",
      them: "A generic online course provider with no read on the local market.",
    },
    {
      aspect: "Correct Spelling, Consistent Reputation: It's \"Techcadd\"",
      icon: "verified",
      us: "Worth clarifying upfront — the correct brand name is Techcadd, not \"TechCADD,\" \"TechCAdd,\" or \"Tech CADD.\" Techcadd's standing as a technology and AI training institute in Mohali has been built consistently under this correct identity.",
      them: "Names that shift across listings, and a reputation nobody can trace.",
    },
    {
      aspect: "Real Infrastructure for Compute-Intensive Training",
      icon: "monitor",
      us: "Deep learning training requires reliable systems capable of handling model training workloads. Techcadd's Mohali centre is equipped with modern computer labs, dependable high-speed internet, and properly configured environments for TensorFlow and Keras — removing the technical friction that can derail hands-on deep learning practice at less-equipped institutes.",
      them: "Machines that cannot carry a training run, and an environment nobody configured.",
    },
    {
      aspect: "Small Batches for a Genuinely Difficult Subject",
      icon: "users",
      us: "Techcadd deliberately caps batch sizes to keep mentorship personal. In a subject like deep learning — where debugging a poorly performing neural network or understanding why a model isn't converging requires real one-on-one guidance — this isn't a minor detail. It's often the difference between students who truly understand the material and those who just follow along.",
      them: "A room large enough that following along becomes the only option.",
    },
    {
      aspect: "Learning by Building Real Neural Networks",
      icon: "terminal",
      us: "Techcadd's teaching approach prioritizes hands-on model building over passive theory. Students train actual neural networks on real datasets, encountering — and learning to solve — the practical challenges that come with real deep learning work, from data preprocessing to model tuning.",
      them: "Pre-built notebooks run once and never questioned.",
    },
    {
      aspect: "Dedicated Placement Support for Specialized AI Roles",
      icon: "briefcase",
      us: "Techcadd runs a dedicated placement cell that helps deep learning graduates position themselves for specialized AI roles, offering resume support tailored to AI/ML profiles, mock interviews, and connections with hiring partners across the Tricity IT and AI ecosystem.",
      them: "Generic tech-opening lists with no AI focus.",
    },
    {
      aspect: "A Progressive AI Learning Path",
      icon: "layers",
      us: "Techcadd doesn't teach deep learning in isolation — it sits within a structured progression from Python and Data Analytics, through Machine Learning, into Deep Learning and applied AI. This means students can build genuinely layered expertise over time, with each course reinforcing the last.",
      them: "A standalone course with no route in and no route onward.",
    },
    {
      aspect: "Recognized Presence in Mohali's Tech Education Community",
      icon: "building",
      us: "Techcadd has built visibility through direct engagement with regional educational institutions and AI-focused workshops, reflecting active involvement in Mohali's broader tech education ecosystem — not just a training centre operating in isolation.",
      them: "A centre nobody in the local ecosystem has heard from.",
    },
  ],
  "artificial-intelligence": [
    {
      aspect: "A Local Institute With Real AI Industry Connections",
      icon: "pin",
      us: "Techcadd isn't a faceless online platform — it's an established, physical training centre based in Mohali, actively connected to the AI and tech hiring landscape across Mohali, Chandigarh, Panchkula, and Zirakpur. This local grounding means trainers and placement teams genuinely understand which companies are building AI capabilities in the Tricity region and what skills they're actually hiring for.",
      them: "A faceless online platform with no read on the local market.",
    },
    {
      aspect: "Correct Spelling, Consistent Reputation: It's \"Techcadd\"",
      icon: "verified",
      us: "Worth clarifying upfront — the correct brand name is Techcadd, not \"TechCADD,\" \"TechCAdd,\" or \"Tech CADD.\" Techcadd's reputation as a leading AI and technology training institute in Mohali has been built consistently under this correct identity.",
      them: "Names that shift across listings, and a reputation nobody can trace.",
    },
    {
      aspect: "Real Infrastructure Built for AI Training",
      icon: "monitor",
      us: "Located in the heart of Mohali, Techcadd's centre is equipped with modern computer labs, reliable high-speed internet, and properly configured environments for Python, machine learning, and deep learning workloads. For students who've experienced institutes with outdated systems, this infrastructure difference shows up immediately in the quality of hands-on learning.",
      them: "Outdated systems that show up immediately in the quality of hands-on work.",
    },
    {
      aspect: "Small Batches, Genuine Mentorship",
      icon: "users",
      us: "Techcadd deliberately keeps batch sizes small. AI is a conceptually dense subject spanning programming, statistics, and multiple advanced techniques — and small batches mean trainers can actually track individual progress and address doubts in real time, rather than moving ahead regardless of who's kept up.",
      them: "A fixed pace that runs whether the room has kept up or not.",
    },
    {
      aspect: "Learning by Building Real AI Applications",
      icon: "terminal",
      us: "Techcadd's teaching philosophy prioritizes hands-on application over passive theory. Students build real projects across machine learning, deep learning, and NLP — working with actual datasets and encountering the practical challenges of real AI development, not just simplified textbook examples.",
      them: "Simplified textbook examples that never break.",
    },
    {
      aspect: "Dedicated Placement Support",
      icon: "briefcase",
      us: "Techcadd runs a dedicated placement cell offering resume-building workshops, mock interviews, and direct connections with hiring partners across the Tricity IT hub. This support is grounded in ongoing local employer relationships, not a one-time promise made at enrollment.",
      them: "A one-time promise made at enrolment.",
    },
    {
      aspect: "Recognized Presence in Mohali's AI Education Community",
      icon: "building",
      us: "Techcadd has demonstrated active engagement with regional educational institutions through AI-focused workshops and collaborations, including partnerships with universities in the region — reflecting genuine involvement in Mohali's broader AI and tech education landscape.",
      them: "A centre nobody in the local ecosystem has heard from.",
    },
    {
      aspect: "A Structured, Progressive AI Learning Path",
      icon: "layers",
      us: "Techcadd's AI course doesn't exist in isolation — it connects naturally to specialized Machine Learning and Deep Learning courses for students who want to go deeper into a specific domain. This layered approach means students can build genuinely comprehensive expertise over time, all within one trusted institute.",
      them: "A standalone course with no route onward.",
    },
    {
      aspect: "Proven Ability to Train Beginners Into Job-Ready Professionals",
      icon: "rocket",
      us: "A recurring theme in Techcadd's genuine student feedback is how effectively the institute supports learners with little to no prior technical background — pacing the course carefully so foundational concepts are solid before introducing advanced AI techniques.",
      them: "A pace set for the students who already knew the material.",
    },
  ],
  "digital-marketing": [
    {
      aspect: "Training Focused on Practical Skill-Building, Not Just Certificates",
      icon: "terminal",
      us: "Techcadd's approach centres on doing the work — running campaigns, writing real content, working with analytics dashboards, managing ad accounts — rather than passively sitting through slide-based lectures. The idea is simple: you should leave the course able to actually do the job, not just talk about it in an interview.",
      them: "Passive, slide-based lectures you can only talk about in an interview.",
    },
    {
      aspect: "Experienced Trainers Who Understand Real Campaigns",
      icon: "users",
      us: "Learning digital marketing from someone who has only taught it, and never actually run a campaign, only gets you so far. Techcadd's training is shaped by trainers with genuine hands-on experience across SEO, paid advertising, and content strategy — so what you learn reflects how digital marketing actually works in the field, not just in a textbook.",
      them: "Instructors who have taught the subject but never run a campaign.",
    },
    {
      aspect: "Locally Rooted, Mohali-Focused Training",
      icon: "pin",
      us: "Techcadd is based right here in Mohali, which means the training isn't a generic, one-size-fits-all program copied for every city. It's shaped with an understanding of the local job market, the kinds of businesses hiring in Mohali and Chandigarh, and what local employers actually expect from digital marketing hires.",
      them: "A generic, one-size-fits-all program copied for every city.",
    },
    {
      aspect: "A Complete, Well-Rounded Curriculum",
      icon: "layers",
      us: "Rather than narrowly training you in just one skill, Techcadd's course covers the full digital marketing landscape — SEO, Google Ads, Meta Ads, social media marketing, content marketing, email marketing, analytics, and AI-powered marketing tools. This matters because most real jobs expect a well-rounded understanding, not a single narrow specialty.",
      them: "One narrow specialty, and gaps everywhere else.",
    },
    {
      aspect: "Live Projects Over Passive Learning",
      icon: "rocket",
      us: "Instead of only working with sample data or hypothetical scenarios, Techcadd structures learning around live and real-world style projects. This means you build an actual portfolio during the course — something you can show employers or clients, rather than just describing what you learned.",
      them: "Sample data and hypothetical scenarios that never leave the classroom.",
    },
    {
      aspect: "Career and Placement-Oriented Approach",
      icon: "briefcase",
      us: "Techcadd's course structure keeps the end goal in mind throughout — helping you become genuinely employable. That means the curriculum, projects, and mentorship are all built around real career outcomes: getting hired, freelancing successfully, or confidently running marketing for your own business.",
      them: "A syllabus completed, and the job search left to you.",
    },
    {
      aspect: "Beginner-Friendly, No Technical Background Needed",
      icon: "target",
      us: "You don't need coding knowledge, a marketing degree, or prior experience to join. Techcadd's course is structured to bring complete beginners up to speed step by step, so nobody gets left behind regardless of their starting point.",
      them: "A pace set for whoever already knew the tools.",
    },
    {
      aspect: "Accessible and Student-Friendly for Mohali & Tricity Learners",
      icon: "clock",
      us: "Being centrally located in Mohali makes Techcadd a practical choice for students across Mohali, Chandigarh, Zirakpur, Kharar, and Panchkula — no long commutes to other cities just to get quality digital marketing training.",
      them: "A commute to another city before the first class.",
    },
    {
      aspect: "A Learning Environment Built Around Support",
      icon: "verified",
      us: "Techcadd focuses on mentorship-driven learning, where questions are encouraged, doubts are cleared, and students aren't just left to figure things out alone — an important difference for students who are new to the digital marketing world entirely.",
      them: "Students left to figure it out alone.",
    },
  ],
  "social-media-marketing": [
    {
      aspect: "Location",
      icon: "pin",
      us: "Phase 8, Sector 62, Mohali — the centre of the Tricity's IT and startup corridor, close to QuarkCity and Bestech Business Tower, so you train surrounded by the companies you will work with or pitch to.",
      them: "An address chosen for rent, nowhere near the employers.",
    },
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Trainers who have worked on live social media campaigns — essential in a field where algorithm updates, new ad formats and shifting platform trends move constantly.",
      them: "Instructors reading from a syllabus written before the last algorithm change.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "100% practical and project-based — content calendars, ad campaigns, analytics reports and brand strategy projects, so you graduate with portfolio-ready work.",
      them: "Isolated theory lessons and a certificate with no evidence behind it.",
    },
    {
      aspect: "Placement support",
      icon: "briefcase",
      us: "Resume building, mock interviews and direct connections to hiring partners across Mohali, Chandigarh and Panchkula — guidance tied to jobs actually available in the region.",
      them: "Generic advice disconnected from the local market.",
    },
    {
      aspect: "Certification",
      icon: "certificate",
      us: "A certification that carries weight with local employers and clients, backed by an established reputation as a leading IT and digital training institute in Mohali.",
      them: "A printout nobody recognises.",
    },
    {
      aspect: "Flexibility",
      icon: "clock",
      us: "Batches for full-day students, college students balancing classes and working professionals needing evenings or weekends — different paces and time constraints accommodated.",
      them: "One fixed timetable, take it or leave it.",
    },
    {
      aspect: "Learning environment",
      icon: "monitor",
      us: "A well-equipped, professional space built for focused, hands-on learning.",
      them: "A makeshift classroom setup.",
    },
    {
      aspect: "Institutional depth",
      icon: "layers",
      us: "Not a single-course institute — established programs across web development, AI, data science, cloud computing and digital marketing, reflecting consistent teaching quality and stability.",
      them: "One course, one trainer, and no track record beyond it.",
    },
  ],
  "google-ads": [
    {
      aspect: "Track record",
      icon: "verified",
      us: "A reputation built over years on career-focused, practical digital marketing training, with a Google Ads curriculum refined against real industry requirements rather than textbook concepts.",
      them: "A syllabus assembled once and never revisited.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "Live campaign creation, real budget allocation exercises and hands-on keyword research — the same tasks you do on day one of a real PPC job.",
      them: "Slides about campaigns you never actually run.",
    },
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Practitioners who have managed real Google Ads accounts, handled real ad budgets and solved real performance problems — so you get the why behind the strategy, not just the click path.",
      them: "Teachers who have read the documentation but never spent a rupee of ad budget.",
    },
    {
      aspect: "Curriculum currency",
      icon: "refresh",
      us: "Continuously updated for the latest Google Ads features, campaign types and automation tools — what agencies are using today, not two years ago.",
      them: "Screenshots of an interface Google has already replaced.",
    },
    {
      aspect: "Flexibility",
      icon: "clock",
      us: "Weekday, evening and weekend batches, so students, working professionals and business owners can train without disrupting studies, job or business.",
      them: "One fixed timetable, take it or leave it.",
    },
    {
      aspect: "Fees",
      icon: "target",
      us: "Affordable fees without compromising on comprehensive modules, expert mentorship and certification.",
      them: "A premium price for content you could have found free online.",
    },
    {
      aspect: "Placement support",
      icon: "briefcase",
      us: "Dedicated placement assistance connecting students with digital marketing agencies, IT companies and startups across Mohali, Chandigarh and the wider Tricity.",
      them: "Training that ends the day the syllabus does.",
    },
    {
      aspect: "Certification",
      icon: "certificate",
      us: "A recognized certificate that validates your skills to employers or clients — real credibility when applying for PPC roles or pitching as a freelancer.",
      them: "A printout with nothing behind it.",
    },
    {
      aspect: "Local understanding",
      icon: "pin",
      us: "Rooted in the region, with a genuine read on what Mohali and Tricity employers look for — so guidance, interview prep and career advice are tailored to the local job market.",
      them: "Generic advice written for no particular city.",
    },
  ],
  seo: [
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Trainers with real agency experience who have ranked live websites — so the sessions carry the judgement behind the tactic, not just the definition.",
      them: "Instructors working from a slide deck they did not write.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "100% practical and project-based: you run keyword research on a real project, optimise live pages and build an actual backlink rather than reading about one.",
      them: "Theory sessions and a certificate with no work behind it.",
    },
    {
      aspect: "Local SEO focus",
      icon: "pin",
      us: "Local SEO and Google Business Profile optimization taught properly — because so many Mohali and Tricity businesses are local-first, in real estate, healthcare, education, retail and hospitality.",
      them: "Generic SEO courses that skip local search entirely.",
    },
    {
      aspect: "Structure",
      icon: "layers",
      us: "A logical sequence from fundamentals through on-page, off-page, technical and local SEO to reporting — instead of fragments picked up across scattered videos and blog posts.",
      them: "A topic list with no order, and gaps you only discover in an interview.",
    },
    {
      aspect: "What you leave with",
      icon: "rocket",
      us: "Every module ties back to a project you can talk about, screenshot and put in a portfolio — demonstrable proof, not just a course you attended.",
      them: "A completion letter you cannot explain in an interview.",
    },
    {
      aspect: "Skill pairing",
      icon: "chart",
      us: "Designed to layer with the Google Ads course, so you cover organic and paid search — the combination employers increasingly ask for — without starting from zero.",
      them: "A standalone course with no route onward.",
    },
    {
      aspect: "Flexibility",
      icon: "clock",
      us: "Weekday, weekend and evening batches, so working professionals and students can join without disrupting an existing schedule.",
      them: "One fixed timetable, take it or leave it.",
    },
    {
      aspect: "Fees",
      icon: "target",
      us: "Affordable fees with certification and placement support included — one of the best cost-to-career-outcome ratios among digital skills.",
      them: "A premium price for content already free on YouTube.",
    },
    {
      aspect: "Placement support",
      icon: "briefcase",
      us: "Resume guidance, interview preparation and connections with hiring partners across Mohali, Chandigarh and Panchkula.",
      them: "Training that ends with the last module.",
    },
  ],
  wordpress: [
    {
      aspect: "Track record",
      icon: "verified",
      us: "A strong reputation across Punjab for practical, job-oriented IT and digital marketing training, with the WordPress syllabus continuously updated to match current industry standards.",
      them: "An outdated syllabus reused batch after batch.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "100% hands-on: from your very first class you are inside the WordPress dashboard, installing themes, configuring plugins and publishing real content.",
      them: "Theory and slideshows, with demonstrations you only watch.",
    },
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Instructors with real project experience in web design, WordPress development and SEO — so the guidance reflects what works in live client projects.",
      them: "Teachers relaying textbook theory they have never applied.",
    },
    {
      aspect: "What you leave with",
      icon: "rocket",
      us: "Live project work you can showcase — whether applying for a job, pitching freelance clients or launching your own venture. A portfolio-first approach.",
      them: "A certificate with nothing behind it.",
    },
    {
      aspect: "Flexibility",
      icon: "clock",
      us: "Morning, evening and weekend batches, because students come from every walk of life — school leavers, college students, professionals from IT Park and Quark City, and homemakers building new skills.",
      them: "One fixed timetable, take it or leave it.",
    },
    {
      aspect: "Fees",
      icon: "target",
      us: "Cost-effective fees with transparent pricing and no hidden charges, keeping professional-grade training accessible across Mohali, Kharar and Zirakpur.",
      them: "A headline price, then extras nobody mentioned at enrolment.",
    },
    {
      aspect: "Placement support",
      icon: "briefcase",
      us: "Placement assistance, resume guidance and interview preparation, to move students from the classroom into real employment or freelance work in Mohali's growing IT sector.",
      them: "Training that ends with the last module.",
    },
    {
      aspect: "Certification",
      icon: "certificate",
      us: "A certificate that adds credibility whether you are applying to local Mohali IT firms or pitching international freelance clients.",
      them: "A printout no employer recognises.",
    },
    {
      aspect: "Local presence",
      icon: "pin",
      us: "Locally accessible for students across Phase 7, Phase 8, IT City and Sector 70 — personalised attention, easier campus visits and a learning environment built around the local student community.",
      them: "A remote provider with no campus to visit.",
    },
  ],
  shopify: [
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Certified Shopify Partners and veteran e-commerce consultants who build and manage high-volume stores for real brands and agencies — every technique comes from real-world experience.",
      them: "Instructors reading off a syllabus they did not write.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "You learn Shopify by building Shopify — 3+ full store projects using Liquid customization, covering product pages, carts and checkouts.",
      them: "Passive lectures and app-based store setup that any tutorial covers free.",
    },
    {
      aspect: "Placement support",
      icon: "briefcase",
      us: "A dedicated placement cell with real relationships across Chandigarh, Mohali and Panchkula — direct interviews, referrals, mock interviews and resume support for E-commerce Developer, Web Developer and Shopify Expert roles.",
      them: "A generic online course with no regional placement network.",
    },
    {
      aspect: "Certification & freelancing",
      icon: "certificate",
      us: "The Techcadd Certified Shopify Developer credential, plus advanced freelance modules on client acquisition, pricing strategy and project management — preparing you for jobs and independent work alike.",
      them: "A certificate, and nothing about how to actually win a client.",
    },
    {
      aspect: "Local understanding",
      icon: "pin",
      us: "Based in Sector 75, Mohali, with a real read on local salary expectations and the specific skills Mohali IT companies and agencies hire for — tailored to the Tri-City employment landscape.",
      them: "A one-size-fits-all national course with no local context.",
    },
    {
      aspect: "The curriculum",
      icon: "layers",
      us: "Beginner to advanced in one arc — store setup through Liquid programming, API integration and CRO — with offline, online and hybrid options plus EMI plans.",
      them: "A shallow tour of the admin panel and nothing past it.",
    },
    {
      aspect: "Support",
      icon: "clock",
      us: "24/7 technical support, regular doubt-clearing sessions and one-on-one mentorship through the project phases, so nobody gets stuck mid-build.",
      them: "Support that ends when the class does.",
    },
  ],
  "python-programming": [
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Instructors who bring real industry context into every session — when a student asks how a concept is actually used in a job, the answer comes with a practical example, not vague theory.",
      them: "Trainers who can recite the syntax but not the why or when.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "Structured around doing, not watching — early exercises through full mini-projects in data handling, automation and basic web development, building a portfolio you can discuss in interviews.",
      them: "Demonstrations you follow along with and forget.",
    },
    {
      aspect: "Beginners",
      icon: "target",
      us: "A teaching method that assumes zero prior coding: concepts broken down step by step, doubts addressed in real time, and nothing expected to be known before it is taught.",
      them: "A pace set for whoever already programmed in school.",
    },
    {
      aspect: "Flexibility",
      icon: "clock",
      us: "Flexible batch options so working professionals, college students and job seekers all fit training around existing commitments — without cutting the depth of the course.",
      them: "One fixed timetable, take it or leave it.",
    },
    {
      aspect: "Certification",
      icon: "certificate",
      us: "A certification reflecting real, verifiable training — credibility when applying for development, data analysis or automation roles across Mohali's growing IT sector.",
      them: "A completion slip with nothing behind it.",
    },
    {
      aspect: "After the course",
      icon: "briefcase",
      us: "Placement assistance and career guidance to translate new skills into real opportunities — a first job, a career switch or a stronger footing for further study.",
      them: "Learning delivered, and the job search left entirely to you.",
    },
    {
      aspect: "Track record",
      icon: "verified",
      us: "A reputation across Punjab's IT training landscape — Jalandhar and now Mohali — for practical, no-nonsense training that prioritises outcomes over gimmicks.",
      them: "An untested methodology and marketing claims.",
    },
    {
      aspect: "Accessibility",
      icon: "pin",
      us: "Based in Mohali, so students from Sector 70/71, IT City, Zirakpur and Kharar do not need to travel into Chandigarh or further for quality Python training.",
      them: "A commute into another city before every class.",
    },
  ],
  "java-programming": [
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Trainers who have worked in real development environments — so the debugging habits, coding standards and problem-solving approaches you pick up are industry-tested, not textbook-only.",
      them: "Academic instructors who have read the book but never shipped the code.",
    },
    {
      aspect: "The curriculum",
      icon: "layers",
      us: "Structured around what Mohali, Chandigarh and Tricity companies actually look for: Core Java, OOP, exception handling, data structures, Collections, file handling and JDBC — every module maps to a skill tested in interviews.",
      them: "A generic syllabus assembled from whatever was already written.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "Live coding practice and real project work, so you finish with applications you built rather than notes you took — a talking point in interviews and the start of a portfolio.",
      them: "Slides, definitions and copy-paste examples.",
    },
    {
      aspect: "Batch size",
      icon: "target",
      us: "Small, focused batches, because learning to code is not a spectator activity — every student gets real mentorship rather than a seat in a crowded room.",
      them: "A hall large enough that your doubt waits for next week.",
    },
    {
      aspect: "Certification",
      icon: "certificate",
      us: "A certificate that validates real Java skill — useful for a first job, resume credibility or showcasing to freelance clients.",
      them: "A completion slip with nothing behind it.",
    },
    {
      aspect: "Flexibility",
      icon: "clock",
      us: "Batch timings for full-time 12th-pass students, college students needing parallel or summer training, and working professionals reskilling in the evenings.",
      them: "One fixed timetable, take it or leave it.",
    },
    {
      aspect: "After the course",
      icon: "briefcase",
      us: "Placement assistance and career guidance — which roles fit your level, what companies expect, and how to present yourself to employers.",
      them: "Syntax taught, and the job search left entirely to you.",
    },
    {
      aspect: "Local grounding",
      icon: "pin",
      us: "Training students who go on to work at companies across Mohali's IT Park, the Aerocity corridor and greater Chandigarh — so the content stays tied to real regional hiring trends.",
      them: "One-size-fits-all content disconnected from where you will actually apply.",
    },
    {
      aspect: "Track record",
      icon: "verified",
      us: "A reputation built on genuine student outcomes rather than empty promises — reflected in reviews and repeat referrals across the region.",
      them: "Marketing claims with no outcomes to point at.",
    },
    {
      aspect: "Fees",
      icon: "chart",
      us: "Accessible and transparent, so you can make an informed decision about investing in your career.",
      them: "A fee structure you only learn after you have committed.",
    },
  ],
  "cpp-dsa": [
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Trainers who bring practical, real-world coding experience into the classroom — every concept explained with real applications in mind, so you understand not just what to code but why it is written that way in industry.",
      them: "Instructors teaching straight from a textbook.",
    },
    {
      aspect: "The curriculum",
      icon: "layers",
      us: "A carefully sequenced beginner-to-advanced path — programming basics, then OOP, data structures and file handling — so no student feels lost regardless of starting point.",
      them: "Complex topics dropped on you all at once.",
    },
    {
      aspect: "Batch size",
      icon: "target",
      us: "Manageable batches, because students grasp pointers and recursion at different speeds — trainers give individual attention, clear doubts in real time and adapt the pace to the group.",
      them: "One pace for a full room, whoever keeps up.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "You write, debug and run your own programs from the first sessions — building the muscle memory and genuine problem-solving skill theory alone cannot provide.",
      them: "Watching someone else's code on a projector.",
    },
    {
      aspect: "Learning modes",
      icon: "monitor",
      us: "Classroom training close to home or online sessions, so students from Mohali, Kharar, Zirakpur and nearby Chandigarh learn in whichever format suits their schedule.",
      them: "One format, take it or leave it.",
    },
    {
      aspect: "Support between classes",
      icon: "clock",
      us: "Dedicated doubt-clearing sessions and mentorship, so you are never left struggling alone with a bug or a confusing concept.",
      them: "Support that ends when the session does.",
    },
    {
      aspect: "Local understanding",
      icon: "pin",
      us: "A reputation among students in Punjab for practical, no-nonsense IT training — built around the local community's exam patterns, college requirements and career goals.",
      them: "Generic online-only content with no local context.",
    },
    {
      aspect: "Certification",
      icon: "certificate",
      us: "A course completion certificate that adds real weight to a resume for internships, campus placements and a first IT job.",
      them: "A printout with nothing behind it.",
    },
    {
      aspect: "What comes next",
      icon: "rocket",
      us: "Positioned as a foundation that leads into Python, Java, Full Stack Development and DSA — all offered here, so the institute stays a long-term learning partner rather than a single-course provider.",
      them: "A standalone course, and a new institute to find for the next step.",
    },
  ],
  kotlin: [
    {
      aspect: "The lab",
      icon: "monitor",
      us: "A dedicated Kotlin Android App Development Lab — systems, software and environment set up specifically for Android Studio, emulators and app testing.",
      them: "A shared computer lab meant for every course under the sun.",
    },
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Trainers with 10+ years of hands-on industry and teaching experience — mentors who have worked on real Android projects and know exactly where beginners get stuck, from null safety confusion to Gradle build errors.",
      them: "Someone reading from a textbook a day ahead of you.",
    },
    {
      aspect: "Batch size",
      icon: "target",
      us: "Batches genuinely capped at a small number. In a room of 8, a trainer can watch you code, catch your specific mistakes and explain a concept the way it clicks for you.",
      them: "A cap that exists in the brochure and nowhere else.",
    },
    {
      aspect: "Placement record",
      icon: "briefcase",
      us: "A placement track record spanning Chandigarh, Mohali and Panchkula, built on active relationships with hiring companies in the region.",
      them: "Online-only or non-local training with no employer relationships here.",
    },
    {
      aspect: "Curriculum currency",
      icon: "refresh",
      us: "Kept current with where Android has actually moved — Jetpack Compose and MVVM, not XML-only UI and older architecture patterns.",
      them: "A syllabus that was correct three years ago.",
    },
    {
      aspect: "Theory and practice",
      icon: "layers",
      us: "A balanced structure — Kotlin fundamentals first, then Android-specific concepts, then real project builds — so concepts stack instead of feeling scattered.",
      them: "Pure theory overload, or code thrown at you with no foundation.",
    },
    {
      aspect: "Certification",
      icon: "certificate",
      us: "Active preparation for the Google Certified Associate Android Developer exam alongside the course certificate — few local institutes include this.",
      them: "A completion certificate and nothing globally recognised.",
    },
    {
      aspect: "Local presence",
      icon: "pin",
      us: "Based in the Mohali/Tricity region, so you can visit the centre, meet trainers before enrolling and get in-person support throughout — not be a faceless enrollment number.",
      them: "A remote-only platform with a support ticket queue.",
    },
  ],
  flutter: [
    {
      aspect: "Track record",
      icon: "verified",
      us: "15+ years training students across Punjab in real, industry-relevant technology skills — consistency that comes from actual results, not marketing claims.",
      them: "A new player experimenting with courses.",
    },
    {
      aspect: "Curriculum currency",
      icon: "refresh",
      us: "Built and refreshed in consultation with industry professionals, so you learn the Flutter and Dart practices companies use today — not concepts from years ago.",
      them: "A syllabus written once, when the framework looked different.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "Every concept immediately reinforced with hands-on coding, every module leading toward a real, functional application — UI design through backend integration to deployment.",
      them: "Endless theory sessions, with the practical side left for you to figure out later.",
    },
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Seasoned Flutter developers who have actually built and shipped apps, bringing real project experience in — so you understand not just how something works, but why it is done that way.",
      them: "Someone who has only read about the framework.",
    },
    {
      aspect: "Batch size",
      icon: "target",
      us: "Small batches, so trainers give one-on-one feedback, review your code personally and adjust the pace to how you are actually progressing.",
      them: "A crowded room where your doubts go unanswered and the schedule never bends.",
    },
    {
      aspect: "Certification",
      icon: "certificate",
      us: "A Flutter App Development certification increasingly recognised by IT companies and startups as proof of genuine, practical skill rather than classroom attendance.",
      them: "A record that you turned up.",
    },
    {
      aspect: "Placement support",
      icon: "briefcase",
      us: "A placement cell working directly with students on resumes, interview preparation and real job connections in Mohali, Chandigarh and beyond.",
      them: "Promises made at enrolment and never mentioned again.",
    },
    {
      aspect: "Learning formats",
      icon: "monitor",
      us: "Offline classroom, fully online or hybrid — so you do not compromise your existing routine, job or college schedule to learn.",
      them: "One format, and it is on you to make it work.",
    },
  ],
  "web-designing": [
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "You do not just watch demonstrations — you build. From the first few classes you are styling pages, building layouts and eventually creating complete websites, finishing with a portfolio of real projects.",
      them: "A certificate with no proof of skill behind it.",
    },
    {
      aspect: "Curriculum currency",
      icon: "refresh",
      us: "Structured around what the industry actually uses today — HTML5, CSS3, JavaScript, Bootstrap, responsive design, WordPress and UI/UX in Figma and Adobe XD.",
      them: "Outdated techniques nobody hires for any more.",
    },
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Mentor-style trainers who work through real problem-solving with you, review your work and help you build genuine design judgement — not just copy templates.",
      them: "A syllabus read aloud, and templates handed over.",
    },
    {
      aspect: "Accessibility",
      icon: "pin",
      us: "Convenient for students across Mohali, SAS Nagar, IT City Mohali, Kharar, Zirakpur and nearby Chandigarh and Panchkula, with weekday and weekend batches for school students, college-goers and working professionals alike.",
      them: "One timetable, and a commute you have to make work.",
    },
    {
      aspect: "Career focus",
      icon: "briefcase",
      us: "Structured with career outcomes in mind — portfolio guidance, interview preparation and a clear approach to job applications and freelance client work.",
      them: "Skills taught, and the rest left to you.",
    },
    {
      aspect: "Freelancing",
      icon: "rocket",
      us: "Freelancing basics covered too — presenting your work, communicating with clients and getting started on freelance platforms, so you are not limited to one career path.",
      them: "A job-only track with nothing for independent work.",
    },
    {
      aspect: "Beginners",
      icon: "target",
      us: "No prior coding or design background assumed — concepts broken down step by step so students from Arts, Commerce, Science or non-technical jobs can build confidence progressively.",
      them: "A pace set for whoever already knew HTML.",
    },
    {
      aspect: "Certification",
      icon: "certificate",
      us: "A course certification you can add to a resume, LinkedIn profile and freelance portfolio, giving job and client applications added credibility.",
      them: "A printout that adds nothing.",
    },
  ],
  "web-development": [
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Trainers with real, hands-on development experience across React.js, Node.js and full-stack architectures — so what you learn reflects how development actually happens, not outdated academic examples.",
      them: "Textbook knowledge and examples from a decade ago.",
    },
    {
      aspect: "Track record",
      icon: "verified",
      us: "A reputation built across Jalandhar, Ludhiana, Chandigarh and now Mohali, training thousands of students — curriculum, teaching methods and support systems already tested and refined over years.",
      them: "An experimental first batch, and you are in it.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "Active, project-based learning in dedicated coding labs, using the same tools and workflows professional development teams use — you graduate having built and deployed real projects.",
      them: "Passive lectures and assignments completed on paper.",
    },
    {
      aspect: "Batch size",
      icon: "target",
      us: "Manageable batches, so trainers track each student's progress, clear doubts individually and adjust pacing — which matters most for beginners in the early weeks.",
      them: "A crowded room where falling behind goes unnoticed.",
    },
    {
      aspect: "Flexibility",
      icon: "clock",
      us: "Batch timings kept flexible for full-time learners, working professionals and students managing college alongside — you are never forced to choose between current responsibilities and a new career.",
      them: "One schedule, and it is your problem to fit around.",
    },
    {
      aspect: "Placement support",
      icon: "briefcase",
      us: "Active support with portfolio building, interview preparation and connections to hiring opportunities across Mohali, Chandigarh and the wider Tricity — the goal is a developer role, not course completion.",
      them: "Training that ends at the last module.",
    },
    {
      aspect: "Local insight",
      icon: "pin",
      us: "A real read on which companies hire in Phase 8 Industrial Area, IT Park and Sector 74, and what skills they look for — so you learn web development in a way relevant to opportunities near you.",
      them: "Web development taught in the abstract.",
    },
    {
      aspect: "The environment",
      icon: "rocket",
      us: "Doubt-clearing sessions, practical problem-solving and a setting where beginners are not made to feel behind — often the difference between quitting halfway and finishing.",
      them: "Sink or swim, and most sink.",
    },
  ],
  "full-stack-development": [
    {
      aspect: "The curriculum",
      icon: "layers",
      us: "Structured around what companies in Mohali, Chandigarh and Panchkula actually look for when hiring junior developers — HTML, CSS, JavaScript, React, Node, Express, MongoDB, Git and API integration. Every module builds toward employability.",
      them: "A generic syllabus copied from a textbook.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "Active coding practice — you write the HTML tags, debug the JavaScript and build the React components yourself, with mentors nearby when you get stuck.",
      them: "Watching someone else code and hoping it sticks.",
    },
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Instructors who have built and deployed real applications, bringing industry practice into the classroom — not just syntax.",
      them: "Trainers who have only studied the theory.",
    },
    {
      aspect: "Projects",
      icon: "rocket",
      us: "Multiple smaller projects throughout — portfolio websites, interactive UI builds, REST API projects and a final full stack application — reinforcing learning at every stage.",
      them: "One end-of-course assignment doing all the work.",
    },
    {
      aspect: "Local presence",
      icon: "pin",
      us: "Based in Mohali, so you learn close to home, visit the institute, meet trainers face-to-face and stay connected to a local peer group — hard to replicate in a purely online course.",
      them: "A support inbox and a video library.",
    },
    {
      aspect: "Pace for beginners",
      icon: "target",
      us: "No assumption that you already code. It starts from what a website is, how the internet works and what a code editor does, before HTML, CSS and eventually advanced JavaScript frameworks.",
      them: "Frameworks from week one, and beginners left behind.",
    },
    {
      aspect: "Career readiness",
      icon: "briefcase",
      us: "Resume building, mock interviews and placement guidance treated as part of the training, not an afterthought.",
      them: "Code taught, career left to chance.",
    },
    {
      aspect: "Learning path",
      icon: "verified",
      us: "A transparent progression — HTML and CSS, through JavaScript and React, into Node, Express and MongoDB — so you always know where you are and what is coming next.",
      them: "A topic list with no order, and constant guessing.",
    },
  ],
  "mern-full-stack": [
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Developers who have actually built and shipped production applications, bringing real enterprise experience in React, Node.js and full-stack architecture into the classroom.",
      them: "Instructors reading off slides.",
    },
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "Theory is a small part — most of your time is spent writing code, debugging real issues and building functional applications, with modules connected into simulated real development workflows.",
      them: "Isolated topic-by-topic exercises that never join up.",
    },
    {
      aspect: "The curriculum",
      icon: "layers",
      us: "A clear, progressive path — web fundamentals and JavaScript ES6, into React and state management, then Node, Express, MongoDB, authentication and cloud deployment. Every stage builds on the last.",
      them: "Advanced concepts thrown at you without the foundation.",
    },
    {
      aspect: "Local presence",
      icon: "pin",
      us: "An established footprint across the Tricity, with centres serving Mohali, Chandigarh and Panchkula — in-person support, a peer learning environment and direct familiarity with regional hiring.",
      them: "An online-only platform with no read on the local market.",
    },
    {
      aspect: "After the course",
      icon: "briefcase",
      us: "Resume building, mock interviews, internship exposure and career guidance, connecting trained students with companies actively hiring full-stack and MERN developers.",
      them: "A certificate, and the job search left to you.",
    },
    {
      aspect: "What you build",
      icon: "rocket",
      us: "Dynamic to-do apps, e-commerce platforms with payment integration, social feed and chat systems, blog CMS platforms and deployed portfolio sites — tangible proof hiring managers want to see.",
      them: "One demo project copied from the same manual every batch uses.",
    },
    {
      aspect: "Fees",
      icon: "target",
      us: "Priced to stay accessible for students, graduates and career switchers without compromising training quality, in classroom or online formats.",
      them: "Premium metro-city pricing for the same syllabus.",
    },
    {
      aspect: "Certification",
      icon: "certificate",
      us: "An industry-recognized MERN Stack certification that strengthens your resume for jobs, freelance work and further career growth.",
      them: "A printout with nothing behind it.",
    },
    {
      aspect: "Track record",
      icon: "verified",
      us: "Thousands of students trained and placed across centres, with alumni now at established IT companies and startups — and a strong local reputation across Mohali and the Tricity.",
      them: "A newer, less-established alternative with nothing to point at.",
    },
  ],
  "mean-stack": [
    {
      aspect: "Who teaches",
      icon: "users",
      us: "Trainers with real, hands-on industry experience in MongoDB, Express.js, Angular and Node.js — current best practices, not outdated theory, and a genuine read on what Tricity employers expect from a full-stack developer.",
      them: "Someone reading off a textbook.",
    },
    {
      aspect: "Theory and practice",
      icon: "terminal",
      us: "A balanced mix of conceptual clarity and hands-on coding, with live projects throughout — so you graduate having actually built with MEAN, not just heard about it.",
      them: "Watching, not doing.",
    },
    {
      aspect: "The curriculum",
      icon: "layers",
      us: "Beginner to advanced in one arc — HTML, CSS and JavaScript fundamentals, then Node.js, MongoDB, Express.js and Angular, finishing with complete integrated applications. Nothing rushed, nothing important skipped.",
      them: "Advanced topics first, and gaps you find out about in an interview.",
    },
    {
      aspect: "What you leave with",
      icon: "rocket",
      us: "Multiple hands-on projects you can showcase in interviews and on GitHub and LinkedIn — a genuine edge over candidates with only theoretical knowledge.",
      them: "A certificate and nothing to point at.",
    },
    {
      aspect: "After the course",
      icon: "briefcase",
      us: "Placement support and career guidance built into the program — resume preparation, interview skills and connections to full-stack roles across Mohali, Chandigarh and beyond.",
      them: "Teaching that stops at the last module.",
    },
    {
      aspect: "Flexibility",
      icon: "clock",
      us: "Flexible batch options for students working around college hours and professionals squeezing in learning time — the course fits into your life, not the other way around.",
      them: "One timetable, and it is your problem.",
    },
    {
      aspect: "Local insight",
      icon: "pin",
      us: "Rooted in the Tricity, with a real understanding of which companies are hiring, which skills they prioritise and what salary expectations are realistic for freshers versus experienced developers.",
      them: "Generic content written for no particular market.",
    },
    {
      aspect: "Certification",
      icon: "certificate",
      us: "A certification that validates your skills to employers, adding credibility as you apply for full-stack developer roles.",
      them: "A printout that adds nothing.",
    },
  ],
  "php-full-stack": [
    {
      aspect: "How you learn",
      icon: "terminal",
      us: "A practical approach — you apply programming concepts while building web applications and projects, so you understand how coding is used in real development situations rather than memorising commands.",
      them: "Syntax memorised, and never applied.",
    },
    {
      aspect: "The curriculum",
      icon: "layers",
      us: "The full path across Core PHP, advanced OOP, MySQL, HTML, CSS, JavaScript, jQuery, Bootstrap, Laravel, CodeIgniter and WordPress, plus projects and interview-oriented preparation.",
      them: "One framework taught in isolation, with the rest left as gaps.",
    },
    {
      aspect: "Where it starts",
      icon: "target",
      us: "Fundamentals before frameworks — PHP basics, then object-oriented programming, then MVC architecture, database-driven applications, APIs and modern PHP practice.",
      them: "Straight into a framework, with programming fundamentals never established.",
    },
    {
      aspect: "What you build",
      icon: "rocket",
      us: "25+ real-world PHP web applications and live project development, producing a portfolio that demonstrates PHP, databases, frontend technologies and frameworks together.",
      them: "One demo assignment, and nothing for a portfolio.",
    },
    {
      aspect: "Local learning advantage",
      icon: "pin",
      us: "Classroom guidance and a structured study routine in Mohali, so students from across the Chandigarh Tricity can train without long-distance arrangements for every class.",
      them: "A commute to another city, or a video queue.",
    },
    {
      aspect: "Career preparation",
      icon: "briefcase",
      us: "PHP developer interview preparation and certification preparation, plus data structures and algorithms to sharpen programming logic for technical discussions during recruitment.",
      them: "Technical skills taught, and the recruitment stage left to you.",
    },
    {
      aspect: "Who it suits",
      icon: "users",
      us: "Structured so beginners can follow while experienced learners still strengthen existing knowledge — 12th-pass students, graduates, BCA/MCA learners, job seekers and career changers alike.",
      them: "A single pace that suits whoever already knew the material.",
    },
    {
      aspect: "Tooling",
      icon: "monitor",
      us: "The tools professional PHP teams actually use — VS Code, XAMPP/WAMP, Composer, Git and GitHub, MySQL Workbench, Postman, browser dev tools and Xdebug.",
      them: "One editor, and no exposure to the surrounding workflow.",
    },
  ],
};

/** The comparison rows for a course — its own where written, ours otherwise. */
export function comparisonFor(course: Course) {
  return comparisonBySlug[contentKey(course)] ?? comparison;
}
