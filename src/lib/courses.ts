export type Course = {
  slug: string;
  title: string;
  category: CategoryKey;
  /**
   * Optional, deliberately. Most courses advertise a length; a course whose
   * written brief gives none — because the length varies by batch and mode —
   * omits it rather than inventing one, and every surface that prints it
   * falls back to copy that does not name a figure.
   */
  duration?: string;
  level: "Beginner" | "Beginner → Advanced" | "Intermediate" | "Advanced";
  badge?: "Hot" | "New" | "Trending";
  blurb: string;
  overview: string;
  /**
   * `blurb` is the line of orientation shown beside a module's topics. A
   * course that has one written for it uses it; the rest fall back to the
   * line <ModuleCard/> derives from where the module sits in the programme.
   */
  modules: { title: string; blurb?: string; points: string[] }[];
  tools: string[];
  outcomes: string[];
  roles: string[];
};

export type CategoryKey =
  | "ai-data"
  | "development"
  | "cyber-cloud"
  | "digital-marketing"
  | "cad-design"
  | "programming";

export const categories: {
  key: CategoryKey;
  title: string;
  blurb: string;
  icon: string;
  accent: string;
}[] = [
  {
    key: "ai-data",
    title: "Artificial Intelligence & Data",
    blurb: "Generative AI, machine learning, analytics and the tooling that ships models to production.",
    icon: "sparkles",
    accent: "from-accent-glow to-hero-glow",
  },
  {
    key: "development",
    title: "Full-Stack Development",
    blurb: "MERN, MEAN and PHP stacks — build, test and deploy real applications end to end.",
    icon: "code",
    accent: "from-hero-glow to-brand-700",
  },
  {
    key: "cyber-cloud",
    title: "Cyber Security & Cloud",
    blurb: "Ethical hacking, network defence, Linux and cloud infrastructure on AWS and Azure.",
    icon: "shield",
    accent: "from-up-soft to-hero-600",
  },
  {
    key: "digital-marketing",
    title: "Digital Marketing",
    blurb: "SEO, paid ads, social, analytics and AI-assisted campaigns that actually convert.",
    icon: "megaphone",
    accent: "from-accent-yellow to-hero-glow",
  },
  {
    key: "cad-design",
    title: "CAD / CAM & Design",
    blurb: "AutoCAD, SolidWorks, Revit and 3ds Max for mechanical, civil and architectural work.",
    icon: "cube",
    accent: "from-accent-400 to-hero-800",
  },
  {
    key: "programming",
    title: "Core Programming",
    blurb: "C, C++, Java, Python and DSA — the fundamentals every interview is built on.",
    icon: "terminal",
    accent: "from-brand-400 to-hero-900",
  },
];

/** Every course in a category, in catalogue order. */
export const coursesIn = (key: CategoryKey) => courses.filter((c) => c.category === key);

export const categoryLabel: Record<CategoryKey, string> = {
  "ai-data": "AI & Data",
  development: "Development",
  "cyber-cloud": "Cyber & Cloud",
  "digital-marketing": "Digital Marketing",
  "cad-design": "CAD & Design",
  programming: "Programming",
};

export const courses: Course[] = [
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    category: "ai-data",
    duration: "3 – 9 Months",
    level: "Beginner → Advanced",
    badge: "Hot",
    blurb:
      "Python, machine learning, deep learning and NLP together — the complete AI foundation, not one narrow slice.",
    // Written to the Artificial Intelligence keyword brief. Paragraphs are
    // separated by a blank line and rendered as such by <Overview/>.
    overview:
      "The Artificial Intelligence Course in Mohali by Techcadd is designed for students, graduates, job seekers and working professionals who want to build practical, career-focused AI skills. The curriculum follows a progressive learning path, starting with Python programming, NumPy, Pandas, mathematics and statistics for AI, and then moving into Machine Learning, Deep Learning, Natural Language Processing, Generative AI, Large Language Models (LLMs), Computer Vision and AI model deployment.\n\nStudents learn through hands-on practice using industry-relevant tools such as Python, Jupyter Notebook, Google Colab, TensorFlow, PyTorch, scikit-learn, Keras, OpenCV, Hugging Face, LangChain and Streamlit. The programme also emphasizes project-based learning, helping learners convert concepts into portfolio-ready applications such as AI models, chatbots, computer vision systems and end-to-end AI products.\n\nFor learners searching for an Artificial Intelligence course in Mohali, this structured approach can provide a practical foundation for progressing toward roles related to AI, Machine Learning, Generative AI and applied AI development while building demonstrable project experience.",
    modules: [
      {
        title: "Python Programming Foundations",
        points: [
          "Variables, data types and operators",
          "Loops, conditionals and functions",
          "Object-oriented basics",
          "The language behind virtually every AI application",
        ],
      },
      {
        title: "Data Handling and Preprocessing",
        points: [
          "NumPy for numerical work",
          "Pandas for data manipulation",
          "Cleaning datasets and handling missing values",
          "Preparing raw data for analysis and modelling",
        ],
      },
      {
        title: "Statistics and Mathematical Foundations for AI",
        points: [
          "Probability and distributions",
          "Linear algebra basics",
          "Correlation",
          "Intuition first, no advanced maths background assumed",
        ],
      },
      {
        title: "Machine Learning Algorithms",
        points: [
          "Supervised learning — regression and classification",
          "Unsupervised learning — clustering",
          "Training models with Scikit-learn",
          "Predicting outcomes and finding patterns in data",
        ],
      },
      {
        title: "Introduction to Neural Networks and Deep Learning",
        points: [
          "How neural networks are structured and trained",
          "Deep learning basics in TensorFlow and Keras",
          "Convolutional neural networks (CNNs) for images",
          "Solving problems classical ML cannot",
        ],
      },
      {
        title: "Natural Language Processing (NLP) Fundamentals",
        points: [
          "Text preprocessing",
          "Sentiment analysis",
          "Basic text classification",
          "How AI systems understand human language",
        ],
      },
      {
        title: "AI-Driven Automation Concepts",
        points: [
          "Where intelligent systems replace repetitive work",
          "Supporting decision-making with AI",
          "Practical automation in business environments",
          "Applied AI beyond the model itself",
        ],
      },
      {
        title: "Model Evaluation and Optimization",
        points: [
          "Choosing the right performance metrics",
          "Cross-validation",
          "Hyperparameter tuning",
          "Building models that work reliably, not just once",
        ],
      },
      {
        title: "Real-World Projects & Capstone Work",
        points: [
          "Prediction and classification",
          "Image recognition",
          "Text analysis",
          "A capstone from raw data to a working, trained model",
        ],
      },
      {
        title: "Career Readiness Skills",
        points: [
          "Resume-building support for AI roles",
          "Mock interview practice",
          "Presenting an AI project portfolio",
          "Applying across Mohali, Chandigarh and Panchkula",
        ],
      },
    ],
    tools: [
      "Python",
      "Jupyter Notebook",
      "Google Colab",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "NLTK",
      "spaCy",
      "OpenCV",
      "Hugging Face",
      "LangChain",
      "Flask",
      "FastAPI",
      "Streamlit",
      "Git",
      "GitHub",
    ],
    outcomes: [
      "Write Python and prepare real, messy data with NumPy and Pandas before any model is trained",
      "Train and evaluate machine learning models in Scikit-learn — regression, classification and clustering",
      "Build neural networks and CNNs in TensorFlow and Keras, and run basic NLP on real text",
      "Ship a capstone spanning prediction, image recognition and text analysis, ready for a portfolio",
    ],
    roles: ["AI Engineer", "ML Engineer", "Data Scientist", "AI Product Analyst"],
  },
  {
    slug: "generative-ai",
    title: "Generative AI",
    category: "ai-data",
    duration: "3 – 6 Months",
    level: "Intermediate",
    badge: "New",
    blurb:
      "LLMs, prompt engineering, RAG pipelines and agentic workflows — build products on top of modern models.",
    // Written to the Generative AI keyword brief. Paragraphs are separated by a
    // blank line and rendered as separate paragraphs by <Overview/>.
    overview:
      "Looking to build practical Generative AI skills in Mohali? The Generative AI Course in Mohali by Techcadd is designed for students, graduates, developers, job seekers, freelancers, and working professionals who want to move beyond simply using AI tools and learn how to build AI-powered applications. The program follows a practical, project-focused approach covering Large Language Models (LLMs), prompt engineering, AI APIs, embeddings, vector databases, Retrieval-Augmented Generation (RAG), image and audio generation, and AI application development.\n\nStudents get hands-on exposure to tools and technologies including Python, LangChain, Hugging Face, ChatGPT, Claude, Pinecone, and Streamlit, with projects designed to strengthen practical understanding and portfolio skills. The course is available in a 3–6 month format, with classroom, weekend, and 1-on-1 learning options, making it suitable for learners across the Mohali–Chandigarh region.\n\nWhether your goal is to become an AI Engineer, Prompt Engineer, AI Developer, or build AI-based freelance solutions, this program gives you a structured starting point for a career in Generative AI.",
    modules: [
      { title: "LLM Fundamentals", points: ["Tokens & embeddings", "Context windows", "Model families", "Cost & latency"] },
      { title: "Prompt Engineering", points: ["Structured prompting", "Few-shot patterns", "Guardrails", "Evaluation"] },
      { title: "RAG Systems", points: ["Chunking strategies", "Vector databases", "Hybrid retrieval", "Citations"] },
      { title: "Agents", points: ["Tool calling", "Multi-step planning", "Memory", "Production monitoring"] },
    ],
    tools: [
      "Python",
      "LangChain",
      "Hugging Face",
      "OpenAI / ChatGPT",
      "Claude",
      "Pinecone",
      "FAISS",
      "LlamaIndex",
      "FastAPI",
      "Streamlit",
    ],
    outcomes: [
      "Ship a production RAG assistant over your own documents",
      "Design and evaluate agentic workflows",
      "Control model cost, latency and hallucination",
    ],
    roles: [
      "AI Application Developer",
      "Generative AI Engineer",
      "LLM Engineer",
      "Prompt Engineer",
      "AI Product Specialist",
      "AI Consultant",
    ],
  },
  {
    slug: "agentic-ai",
    title: "Agentic AI",
    category: "ai-data",
    duration: "3 – 9 Months",
    level: "Beginner → Advanced",
    badge: "New",
    blurb:
      "Agents that plan, call real tools and finish the job — Python, LangGraph, MCP and production deployment.",
    // Written to the Agentic AI keyword brief. Paragraphs are separated by a
    // blank line and rendered as such by <Overview/>.
    overview:
      "Agentic AI is software that pursues a goal on its own instead of just answering a single prompt — it plans, calls real tools like APIs and databases, reads the results, and keeps going until the task is done. That's the shift companies across the Mohali–Chandigarh Tricity are hiring for right now, and very few local candidates can actually build it.\n\nTechcadd's Agentic AI course in Mohali is a hands-on, project-first program for students, graduates, and working professionals who want to move from \"using AI tools\" to engineering AI systems that act. You'll work with Python, LangChain, LangGraph, the Claude and OpenAI APIs, vector databases, and MCP servers — the same stack used on live client work at Techcadd, not just slides.\n\nWith flexible batches (weekday, evening, weekend, and 1-on-1), a structured module ladder with 3/6/9-month exit points, an internship letter, and placement support, this is Mohali's most practical route into AI Engineer and Agent Developer roles.",
    // The seven foundation modules, then the two later stages. The written
    // version of the same ladder lives in `learnDetailBySlug`.
    modules: [
      {
        title: "Programming Foundations",
        blurb: "Module 01 starts at Python from the first line — no programming background assumed.",
        points: [
          "Python from absolute zero",
          "The command line",
          "Git and GitHub",
          "HTTP/REST",
          "SQL",
        ],
      },
      {
        title: "LLM Foundations, Prompting & Structured Output",
        points: [
          "Tokenization",
          "Context windows",
          "Returning schema-valid JSON reliably",
        ],
      },
      {
        title: "Tool Calling, Function Execution & MCP",
        points: [
          "Building a ReAct loop from scratch",
          "Working with Model Context Protocol servers",
        ],
      },
      {
        title: "Retrieval-Augmented Generation & Knowledge Grounding",
        points: ["Embeddings", "Hybrid search", "Reranking", "Clause-level citations"],
      },
      {
        title: "Memory, State & Context Management",
        points: [
          "Short-term memory",
          "Long-term memory",
          "Episodic memory",
          "Multi-user isolation",
        ],
      },
      {
        title: "Agent Frameworks, Graph Orchestration & Delegation",
        points: ["LangGraph nodes", "Conditional routing", "Human-in-the-loop approvals"],
      },
      {
        title: "Evaluation, Guardrails, Deployment & Capstone",
        points: ["Gold datasets", "CI regression gates", "Shipping a deployed agent"],
      },
      {
        title: "Engineer stage (Modules 8–20)",
        blurb: "The six-month exit point.",
        points: [
          "Async engineering and multi-provider model routing",
          "DSPy optimisation and GraphRAG",
          "Durable execution with Temporal and multi-agent systems",
          "Browser and coding agents, and red-teaming",
          "Kubernetes deployment with cost engineering",
        ],
      },
      {
        title: "Architect stage (Modules 21–33)",
        blurb: "The nine-month exit point — from building an agent to owning the platform.",
        points: [
          "CDC data ingestion and billion-scale vector infrastructure",
          "A2A agent interoperability and a full evaluation service",
          "Fine-tuning and reinforcement-learning post-training",
          "Voice and multimodal agents",
          "Governance mapped to the EU AI Act and NIST AI RMF",
        ],
      },
    ],
    tools: [
      "Python",
      "LangGraph",
      "LangChain",
      "CrewAI",
      "Claude API",
      "OpenAI API",
      "Gemini API",
      "Ollama",
      "FastAPI",
      "Pydantic",
      "MCP SDK",
      "Qdrant",
      "Chroma",
      "pgvector",
      "Neo4j",
      "LangSmith",
      "Langfuse",
      "RAGAS",
      "promptfoo",
      "Garak",
      "PyRIT",
      "Playwright",
      "Browser Use",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Temporal",
    ],
    outcomes: [
      "Ship a containerised FastAPI service and a document-extraction engine",
      "Publish an MCP server and build a cited RAG compliance copilot",
      "Build a human-in-the-loop approval agent with LangGraph",
      "Deploy a support agent with a cost-per-conversation report",
    ],
    roles: ["AI Engineer", "Agent Developer", "Automation Architect", "AI Consultant"],
  },
  {
    slug: "prompt-engineering",
    title: "Prompt Engineering",
    category: "ai-data",
    // No `duration`: the written brief states only that it "varies based on
    // the batch and mode selected", so the page asks you to call rather than
    // advertising a figure that was never given.
    level: "Beginner → Advanced",
    badge: "New",
    blurb:
      "ChatGPT, Claude, Gemini and Midjourney — prompting frameworks, AI workflows and a portfolio of real projects.",
    // Written to the Prompt Engineering keyword brief. Paragraphs are
    // separated by a blank line and rendered as such by <Overview/>.
    overview:
      "Techcadd's Prompt Engineering course in Mohali is a hands-on, career-focused program designed to help students, graduates, and working professionals master the art of communicating with AI tools like ChatGPT, Claude, Gemini, and Midjourney. As Mohali's IT and startup ecosystem grows around Sector 74, Phase 8B, and the IT Park corridor, companies across the Chandigarh tri-city region are actively hiring people who can write effective prompts, build AI workflows, and apply generative AI to real business problems.\n\nThis course takes you from the fundamentals of how large language models work to advanced prompting techniques — zero-shot, few-shot, chain-of-thought, and role-based prompting — through live, project-based classroom training at our Mohali centre. You'll practice on real use cases in content creation, coding assistance, data analysis, and automation, guided by industry-experienced trainers.\n\nBy the end, you'll have a portfolio of AI projects and the practical skills to work as a Prompt Engineer, AI Content Specialist, or GenAI-savvy professional — right here in Mohali, without relocating to a metro city.",
    // The eight phases of the written curriculum. The prose version of each
    // one lives in `learnDetailBySlug` on the "what you learn" section.
    modules: [
      {
        title: "Foundations of Generative AI",
        blurb:
          "The conceptual base, so you understand why prompts work the way they do — not just which buttons to click.",
        points: [
          "How large language models process language and generate responses",
          "How generative AI differs from traditional software",
          "Text generation — ChatGPT, Claude, Gemini",
          "Image generation — Midjourney, DALL·E, Stable Diffusion",
          "Emerging tools for video, audio and music generation",
        ],
      },
      {
        title: "Mastering ChatGPT",
        blurb: "From casual ChatGPT user to power user.",
        points: [
          "Conversation design and context management",
          "Custom instructions and memory handling",
          "Structuring multi-turn conversations",
          "Consistently high-quality output for writing, research, coding help and business tasks",
        ],
      },
      {
        title: "Prompt Engineering Excellence",
        blurb: "The core module — the prompting frameworks used by professionals.",
        points: [
          "Zero-shot prompting — getting results without examples",
          "Few-shot prompting — using examples to guide output style and format",
          "Chain-of-thought prompting — encouraging step-by-step AI reasoning",
          "Role-based / persona prompting — assigning the AI a specific expert role",
          "Prompt chaining and iteration — refining prompts through structured feedback loops",
          "Instruction clarity, context-setting and constraint design",
        ],
      },
      {
        title: "Visual AI & Midjourney",
        blurb: "Visual prompt engineering for design, marketing and content use cases.",
        points: [
          "Generating high-quality images with Midjourney",
          "Style parameters and aspect ratios",
          "Reference imaging",
          "Iterative prompt refinement",
        ],
      },
      {
        title: "NLP Fundamentals & AI Applications",
        blurb: "What is happening “under the hood” when you interact with an AI system.",
        points: [
          "Natural Language Processing concepts with NLTK and spaCy",
          "How chatbots process text",
          "Sentiment analyzers and text classifiers",
          "Useful context for anyone moving toward more technical AI roles",
        ],
      },
      {
        title: "AI Tools for Productivity & Automation",
        blurb: "Where prompt engineering applies beyond chat.",
        points: [
          "Automating workflows with prompts",
          "Building simple AI-powered assistants",
          "Integrating AI into everyday business tasks",
          "Integrating AI into everyday content tasks",
        ],
      },
      {
        title: "Ethics, Limitations & Responsible AI Use",
        blurb: "Essential knowledge for using these tools responsibly in professional settings.",
        points: [
          "AI hallucinations",
          "Bias in generated output",
          "Data privacy",
          "The ethical boundaries of AI-generated content",
        ],
      },
      {
        title: "Capstone Projects",
        blurb: "Real, presentable AI projects you can showcase to employers or clients.",
        points: [
          "Combining text and visual prompting skills",
          "Building practical, presentable outputs",
          "A portfolio of real AI projects",
        ],
      },
    ],
    tools: [
      "ChatGPT",
      "Claude",
      "Google Gemini",
      "Midjourney",
      "DALL·E",
      "Stable Diffusion",
      "NLTK",
      "spaCy",
      "AI productivity tools",
      "AI automation tools",
    ],
    outcomes: [
      "Write effective, structured prompts using zero-shot, few-shot, chain-of-thought and role-based frameworks",
      "Direct ChatGPT, Claude and Gemini through multi-turn conversations for writing, research, coding help and business tasks",
      "Generate and refine visual output in Midjourney using style parameters, aspect ratios and reference imaging",
      "Finish with a portfolio of real AI projects combining text and visual prompting skills",
    ],
    roles: [
      "Prompt Engineer",
      "AI Content Specialist",
      "AI-assisted Developer",
      "Digital Marketing Executive with AI skills",
      "Chatbot Trainer",
      "Freelance AI Consultant",
    ],
  },
  {
    slug: "data-science",
    title: "Data Science",
    category: "ai-data",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Python, statistics, machine learning, SQL and visualization with Tableau and Power BI — the full analytics stack, end to end.",
    overview:
      "Looking for a career-defining Data Science course in Mohali? Techcadd's Data Science program is designed for students, graduates, and job seekers who want to master the full analytics stack — Python, statistics, machine learning, SQL, and data visualization — and turn it into a genuine career in one of India's highest-demand fields. Based in Mohali, right at the heart of the growing Tricity data and IT ecosystem, this program takes you from foundational concepts to advanced, industry-ready analytics. You'll learn Python programming, data manipulation with NumPy and Pandas, statistical analysis, machine learning algorithms, SQL for data extraction, and data visualization using Tableau and Power BI — all through hands-on projects and real-world case studies. Whether you're a fresher exploring data careers or a working professional wanting to pivot into analytics, this course builds you into a job-ready data professional, not just someone who's studied algorithms in theory. With experienced industry trainers, practical capstone projects, and dedicated placement assistance, Techcadd's Mohali training centre prepares students in Mohali, Chandigarh, and Panchkula for real roles in data science, analytics, and machine learning.",
    modules: [
      {
        title: "Phase 1 — Python & Data Manipulation",
        points: [
          "Python programming fundamentals",
          "NumPy for numerical computing",
          "Pandas for structured data handling",
          "Cleaning and transforming real-world datasets",
        ],
      },
      {
        title: "Phase 2 — Statistics & Exploratory Data Analysis",
        points: [
          "Probability and distributions",
          "Hypothesis testing",
          "EDA techniques before modelling",
          "The analytical thinking layer, not just running code",
        ],
      },
      {
        title: "Phase 3 — Machine Learning Algorithms",
        points: [
          "Regression",
          "Classification",
          "Clustering",
          "When and why to use each approach",
        ],
      },
      {
        title: "Phase 4 — Advanced ML & Model Evaluation",
        points: [
          "XGBoost",
          "Ensemble methods",
          "Measuring and comparing model performance",
          "Improving models against real metrics",
        ],
      },
      {
        title: "Phase 5 — SQL for Data Extraction",
        points: [
          "Querying relational databases",
          "Joins, aggregation and subqueries",
          "Extracting data efficiently",
          "Working with real organizational data",
        ],
      },
      {
        title: "Phase 6 — Data Visualization (Tableau & Power BI)",
        points: [
          "Dashboards in Tableau",
          "Reports in Power BI",
          "Turning technical analysis into business insight",
          "Communicating findings stakeholders can act on",
        ],
      },
      {
        title: "Phase 7 — Big Data & Cloud Platforms",
        points: [
          "Big data concepts",
          "Cloud platform basics",
          "PySpark",
          "Handling datasets too large for traditional tools",
        ],
      },
      {
        title: "Phase 8 — Capstone Project",
        points: [
          "A substantial, portfolio-ready project",
          "Raw data through to actionable insight",
          "Solving a complex business problem end to end",
          "The centrepiece of your portfolio",
        ],
      },
      {
        title: "Phase 9 — Placement Assistance & Interview Prep",
        points: [
          "Dedicated placement assistance",
          "Resume building for data roles",
          "Interview preparation",
          "Translating technical skill into a job offer",
        ],
      },
    ],
    tools: [
      "Python",
      "NumPy & Pandas",
      "Scikit-learn",
      "SQL",
      "Tableau",
      "Power BI",
      "PySpark",
      "Jupyter Notebooks",
    ],
    outcomes: [
      "Work the full analytics pipeline — Python and Pandas through statistics, machine learning, SQL and visualization",
      "Implement regression, classification and clustering on real datasets, then evaluate and improve the models",
      "Query business databases in SQL and communicate the findings in Tableau and Power BI dashboards",
      "Ship a capstone project that solves a complete business problem end to end",
    ],
    roles: [
      "Data Analyst",
      "Data Scientist",
      "Machine Learning Engineer",
      "Business Intelligence Analyst",
      "Big Data Engineer",
    ],
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    category: "ai-data",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Excel, SQL, Power BI, Tableau and Python — the full analytics toolkit, from raw spreadsheets to decision-ready dashboards.",
    overview:
      "Looking for a Data Analytics course in Mohali that actually gets you job-ready? Techcadd's 6-month Data Analytics program is built for exactly that. Based in the heart of Mohali and serving students across the Tricity region — Chandigarh, Panchkula, and Zirakpur — this course takes you from complete beginner to confident data analyst, no prior coding background needed. You'll work hands-on with Excel, SQL, Power BI, Tableau, and Python, learning how businesses actually use data to make decisions. With small batch sizes of 8–12 students, real-world projects, and mentors who've worked in the industry, Techcadd keeps things practical rather than purely theoretical. Whether you're a 12th-pass student exploring career options, a graduate from a Mohali college, or a working professional near the IT Park looking to upskill, this program is designed to fit your starting point. With 98% placement support and a growing alumni network placed across top companies, Techcadd has built a reputation as one of the most trusted names for data analytics training in Mohali.",
    modules: [
      {
        title: "Foundations of Data Analytics",
        points: [
          "What data analytics really means",
          "How businesses use data to decide",
          "The end-to-end analytics workflow",
          "From raw data to a clearly presented insight",
        ],
      },
      {
        title: "Advanced Excel for Data Analysis",
        points: [
          "Advanced formulas",
          "Pivot tables",
          "Data cleaning and conditional formatting",
          "Dashboard basics",
        ],
      },
      {
        title: "SQL for Data Management",
        points: [
          "SELECT, filtering and sorting",
          "Joins and subqueries",
          "Aggregate functions",
          "Extracting data for real business reporting",
        ],
      },
      {
        title: "Power BI for Business Intelligence",
        points: [
          "Connecting data sources",
          "Building visualizations",
          "DAX formulas",
          "Reports for non-technical stakeholders",
        ],
      },
      {
        title: "Tableau for Data Visualization",
        points: [
          "Building visual stories from raw data",
          "Charts, maps and dashboards",
          "Why both BI tools matter",
          "Flexibility across employers who prefer either platform",
        ],
      },
      {
        title: "Python for Data Analytics",
        points: [
          "Pandas and NumPy for data manipulation",
          "Matplotlib and Seaborn for visualization",
          "Cleaning datasets and exploratory data analysis",
          "Automating repetitive analytical tasks",
        ],
      },
      {
        title: "Statistics for Data Analysis",
        points: [
          "Measures of central tendency",
          "Probability basics",
          "Correlation",
          "Hypothesis testing",
        ],
      },
      {
        title: "Real-World Projects & Capstone Work",
        points: [
          "15+ live projects across industries",
          "Sales, HR, marketing and financial analytics",
          "A complete capstone built from scratch",
          "A portfolio-ready analytics solution",
        ],
      },
      {
        title: "Career Readiness Skills",
        points: [
          "Resume-building support",
          "Mock interview practice",
          "Presenting technical skills to recruiters",
          "Applying across Mohali, Chandigarh and Panchkula",
        ],
      },
    ],
    tools: [
      "Excel",
      "SQL",
      "Power BI",
      "Tableau",
      "Python",
      "Pandas & NumPy",
      "Matplotlib / Seaborn",
      "Statistics",
    ],
    outcomes: [
      "Move data end to end — clean it in Excel, query it in SQL, visualize it in Power BI and Tableau",
      "Analyse and automate with Python using Pandas, NumPy and Matplotlib",
      "Interpret results correctly with practical statistics, not just chart them",
      "Leave with 15+ live projects and a capstone you can show in an interview",
    ],
    roles: [
      "Data Analyst",
      "Business Analyst",
      "Reporting Analyst",
      "BI Analyst",
      "Junior Data Scientist",
    ],
  },
  {
    slug: "power-bi",
    title: "Power BI",
    category: "ai-data",
    duration: "2 Months",
    level: "Beginner → Advanced",
    blurb:
      "Power Query, data modelling, DAX and interactive dashboards — business intelligence logic, not just button-pushing.",
    overview:
      "Want to turn raw data into insights companies actually pay for? Techcadd's Power BI course in Mohali is built for students, graduates, and working professionals who want practical, job-ready skills in data visualization and business intelligence. Located in Mohali's Phase 8 Industrial Area — right in the heart of the growing Tricity data and analytics ecosystem — this program takes you beyond \"button-pushing\" and teaches you to think like a real data analyst. You'll learn to connect to multiple data sources, clean and model data, build DAX formulas, and design interactive dashboards and reports that mirror real business use cases. Whether you're a fresher exploring data analytics or a professional looking to add a high-demand tool to your resume, this course is structured to build genuine business intelligence logic, not just software familiarity. With small batch sizes for personalized mentorship, hands-on projects, and Power BI certification preparation, Techcadd's Mohali training centre prepares students in Mohali, Chandigarh, and Panchkula for real roles in data analytics, business intelligence, and reporting — backed by strong placement support.",
    modules: [
      {
        title: "Power BI Fundamentals",
        points: [
          "The Power BI interface",
          "Collecting, cleaning and preparing data",
          "Power Query for data transformation",
          "The ecosystem — Desktop, Service and Mobile",
        ],
      },
      {
        title: "Data Cleaning & Data Modeling",
        points: [
          "Handling messy, inconsistent datasets",
          "Relationships between multiple tables",
          "Building proper data models",
          "The backbone of an accurate dashboard",
        ],
      },
      {
        title: "DAX (Data Analysis Expressions)",
        points: [
          "Calculated columns and measures",
          "Custom business metrics",
          "Time intelligence and aggregation",
          "What separates report builders from analysts",
        ],
      },
      {
        title: "Data Visualization & Interactive Dashboards",
        points: [
          "Bar charts, line graphs and matrix tables",
          "KPI cards and custom visuals",
          "Design principles that make a report readable",
          "Dashboards that are easy to act on, not just busy",
        ],
      },
      {
        title: "Connecting to Multiple Data Sources",
        points: [
          "Excel files",
          "SQL databases",
          "Cloud services and web sources",
          "Because real business data never lives in one spreadsheet",
        ],
      },
      {
        title: "Business Intelligence Logic & Data Storytelling",
        points: [
          "Identifying the story the data is telling",
          "Structuring reports around business questions",
          "Presenting insight that drives decisions",
          "Thinking like a data analyst, not a tool operator",
        ],
      },
      {
        title: "Report Publishing & Sharing",
        points: [
          "Publishing to Power BI Service",
          "Scheduled data refreshes",
          "Sharing dashboards securely with stakeholders",
          "Real workplace deployment of your reports",
        ],
      },
      {
        title: "Real-World Projects",
        points: [
          "Multiple realistic business scenarios",
          "End-to-end dashboard builds",
          "An interview-ready project portfolio",
          "Work that stands out further than a certificate",
        ],
      },
    ],
    tools: [
      "Power BI Desktop",
      "Power Query",
      "DAX",
      "Power BI Service",
      "Excel",
      "SQL",
      "Tableau",
    ],
    outcomes: [
      "Connect, clean and model data from Excel, SQL and cloud sources into a reliable data model",
      "Write DAX measures and calculated columns that answer real business questions",
      "Design interactive dashboards people can actually read and act on",
      "Publish, refresh and share reports through Power BI Service the way a workplace does",
    ],
    roles: [
      "Data Analyst",
      "Business Intelligence Analyst",
      "Reporting Analyst",
      "Data Visualization Specialist",
    ],
  },
  {
    slug: "tableau",
    title: "Tableau",
    category: "ai-data",
    duration: "2 Months",
    level: "Beginner → Advanced",
    blurb:
      "Data connections, Tableau Prep, calculated fields, interactive dashboards and data storytelling that drives decisions.",
    overview:
      "Want to turn data into visual stories that drive business decisions? Techcadd's Tableau course in Mohali is designed for students, graduates, and job seekers who want practical, job-ready skills in data visualization and analytics. Based in Mohali — right in the heart of the growing Tricity data and IT ecosystem — this program teaches you to connect, clean, and visualize data using one of the world's most widely used business intelligence tools. You'll learn to build interactive dashboards, create insightful visualizations, and work with real-world datasets — the exact skills companies across Mohali, Chandigarh, and Panchkula look for when hiring data analysts and BI professionals. Whether you're a fresher exploring the data analytics field or a working professional wanting to add a high-demand visualization tool to your resume, this course builds you up from the fundamentals to advanced Tableau techniques. With hands-on projects, experienced trainers, and placement support, Techcadd's Mohali training centre prepares students in Mohali, Zirakpur, Kharar, and Panchkula for real roles in data analytics and business intelligence — often alongside complementary skills like Power BI, Python, and SQL.",
    modules: [
      {
        title: "Tableau Fundamentals",
        points: [
          "The Tableau interface and workspace",
          "How Tableau connects to data",
          "Dimensions, measures and how fields are organised",
          "How a visualization is structured",
        ],
      },
      {
        title: "Connecting to Data Sources",
        points: [
          "Excel files",
          "Databases and live connections",
          "Cloud-based data",
          "Because real business data never comes from one clean source",
        ],
      },
      {
        title: "Data Cleaning & Preparation",
        points: [
          "Cleaning and shaping raw, messy datasets",
          "Tableau Prep",
          "Built-in data preparation features",
          "The step before any meaningful visualization",
        ],
      },
      {
        title: "Building Charts & Visualizations",
        points: [
          "Bar charts, line graphs and scatter plots",
          "Maps and heat maps",
          "Choosing the right chart for the insight",
          "What each visualization type actually communicates",
        ],
      },
      {
        title: "Interactive Dashboards",
        points: [
          "Combining visualizations into one dashboard",
          "Filters and parameters",
          "Drill-down features end users can explore",
          "What separates a static report from a business tool",
        ],
      },
      {
        title: "Calculated Fields & Formulas",
        points: [
          "Building calculated fields",
          "Custom formulas and metrics",
          "Deeper analytical insight beyond raw data",
          "Tableau's formula syntax, compared with DAX",
        ],
      },
      {
        title: "Data Storytelling with Tableau Stories",
        points: [
          "Sequencing visualizations into a narrative",
          "Structuring findings around a business question",
          "Presenting to stakeholders and decision-makers",
          "Communicating clearly, not just displaying numbers",
        ],
      },
      {
        title: "Publishing & Sharing Dashboards",
        points: [
          "Publishing to Tableau Server",
          "Publishing to Tableau Public",
          "Sharing insight securely with teams",
          "Workplace-ready deployment scenarios",
        ],
      },
      {
        title: "Real-World Projects & Case Studies",
        points: [
          "Real datasets and business case studies",
          "Solving actual business problems with visualization",
          "A portfolio of Tableau projects",
          "Proof that carries further than a certificate",
        ],
      },
    ],
    tools: [
      "Tableau Desktop",
      "Tableau Prep",
      "Tableau Public",
      "Tableau Server",
      "Excel",
      "SQL",
      "Power BI",
      "Python basics",
    ],
    outcomes: [
      "Connect Tableau to Excel, databases and cloud sources, then clean and shape the data for analysis",
      "Choose and build the visualization that actually communicates a given business insight",
      "Design interactive dashboards with filters, parameters and drill-downs end users can explore",
      "Sequence findings into a Tableau Story and publish it for stakeholders",
    ],
    roles: [
      "Data Analyst",
      "Business Intelligence Analyst",
      "Data Visualization Specialist",
      "Reporting Analyst",
    ],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    category: "ai-data",
    duration: "4 Months",
    level: "Beginner → Advanced",
    blurb:
      "Python from scratch through NumPy, Pandas, Scikit-learn and the core supervised and unsupervised algorithms.",
    overview:
      "Looking for a Machine Learning course in Mohali that goes beyond theory and actually builds job-ready skills? Techcadd's Machine Learning program is designed for exactly that — a practical, project-driven path into one of the fastest-growing fields in tech. Based in Mohali and serving students across the Tricity region — Chandigarh, Panchkula, Kharar, and Zirakpur — this course takes you from Python fundamentals to building real, working machine learning models. You'll work hands-on with Python, NumPy, Pandas, Scikit-learn, and core ML algorithms — learning how machines \"learn\" from data to make predictions, classify information, and automate decisions. With small batch sizes, mentors who understand what local IT companies are hiring for, and a strong focus on real projects over theory, Techcadd keeps the learning practical from day one. Whether you're a 12th-pass student exploring emerging tech careers, a graduate wanting to break into AI/ML, or a working professional near Mohali's IT Park looking to upskill, this program meets you at your level. With dedicated placement support and a growing alumni network, Techcadd has built a strong reputation as a trusted destination for Machine Learning training in Mohali.",
    modules: [
      {
        title: "Python Programming Foundations",
        points: [
          "Variables, data types and operators",
          "Loops, conditionals and functions",
          "Object-oriented basics",
          "A programming foundation before any ML concept",
        ],
      },
      {
        title: "Data Handling with NumPy and Pandas",
        points: [
          "NumPy for numerical computing",
          "Pandas for data manipulation",
          "Cleaning datasets and handling missing values",
          "Preparing raw data for a model",
        ],
      },
      {
        title: "Data Visualization for Exploratory Analysis",
        points: [
          "Matplotlib",
          "Seaborn",
          "Finding patterns, correlations and outliers",
          "Letting the data tell you which technique fits",
        ],
      },
      {
        title: "Statistics and Probability for Machine Learning",
        points: [
          "Probability and distributions",
          "Correlation",
          "Basic linear algebra concepts",
          "Why algorithms behave the way they do",
        ],
      },
      {
        title: "Supervised Learning Algorithms",
        points: [
          "Linear regression",
          "Logistic regression",
          "Decision trees",
          "Random forests",
        ],
      },
      {
        title: "Unsupervised Learning Algorithms",
        points: [
          "Clustering with K-Means",
          "Working without predefined labels",
          "Pattern discovery",
          "Segmentation in real business use",
        ],
      },
      {
        title: "Model Evaluation and Optimization",
        points: [
          "Accuracy, precision and recall",
          "Confusion matrices",
          "Cross-validation",
          "Hyperparameter tuning",
        ],
      },
      {
        title: "Introduction to Scikit-learn",
        points: [
          "The industry-standard Python ML library",
          "Implementing algorithms efficiently",
          "Pipelines and consistent workflows",
          "The exact tooling used in real ML roles",
        ],
      },
      {
        title: "Real-World Projects & Capstone Work",
        points: [
          "Price prediction",
          "Customer segmentation",
          "Classification problems",
          "A capstone from raw data to final model",
        ],
      },
      {
        title: "Career Readiness Skills",
        points: [
          "Resume-building support for AI/ML roles",
          "Mock interview practice",
          "Presenting your project portfolio",
          "Interviewing across Mohali, Chandigarh and Panchkula",
        ],
      },
    ],
    tools: [
      "Python",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
      "Statistics & probability",
    ],
    outcomes: [
      "Write Python confidently and prepare messy, real-world data with NumPy and Pandas",
      "Train supervised and unsupervised models — regression, trees, forests and K-Means clustering",
      "Evaluate and improve a model with accuracy, precision, recall, cross-validation and tuning",
      "Ship a capstone that runs from raw data through to a working, portfolio-ready model",
    ],
    roles: [
      "Machine Learning Engineer (entry-level)",
      "Data Analyst",
      "AI/ML Associate",
      "Junior Data Scientist",
    ],
  },
  {
    slug: "deep-learning",
    title: "Deep Learning",
    category: "ai-data",
    duration: "4 Months",
    level: "Intermediate",
    blurb:
      "Neural networks, CNNs, RNNs, computer vision and NLP — built and trained in TensorFlow and Keras.",
    overview:
      "Looking for a Deep Learning course in Mohali that goes beyond machine learning basics and into neural networks and real AI systems? Techcadd's Deep Learning program is built for students who want to work at the cutting edge of artificial intelligence — from image recognition to natural language processing. Based in Mohali and accessible to students across the Tricity region — Chandigarh, Panchkula, Kharar, and Zirakpur — this course takes you from neural network fundamentals to building real deep learning models using industry-standard frameworks. You'll work hands-on with Python, TensorFlow, and Keras, learning how neural networks are structured, trained, and optimized to solve complex problems like image classification, text analysis, and pattern recognition. With small batch mentorship, trainers who understand what Mohali and Chandigarh's growing AI job market actually demands, and a strong project-first approach, Techcadd keeps deep learning genuinely learnable rather than overwhelming. Whether you already have a foundation in Python and machine learning and want to specialize further, or you're a graduate exploring advanced AI career paths, this program meets you where you are. With dedicated placement support and an established reputation in AI training, Techcadd is a trusted choice for Deep Learning training in Mohali.",
    modules: [
      {
        title: "Neural Network Fundamentals",
        points: [
          "Neurons and layers",
          "Weights and biases",
          "Activation functions",
          "How a network actually processes information",
        ],
      },
      {
        title: "Forward Propagation and Backpropagation",
        points: [
          "How a network makes a prediction",
          "How it learns from its mistakes",
          "Gradient descent",
          "The maths behind learning, demystified",
        ],
      },
      {
        title: "Building Neural Networks with TensorFlow and Keras",
        points: [
          "Constructing a model",
          "Compiling and training it",
          "The industry-standard frameworks",
          "Moving from theory into working code",
        ],
      },
      {
        title: "Convolutional Neural Networks (CNNs) for Computer Vision",
        points: [
          "How convolution works",
          "Image classification",
          "Basic object detection",
          "Hands-on projects on real image datasets",
        ],
      },
      {
        title: "Recurrent Neural Networks (RNNs) and Sequence Data",
        points: [
          "How RNNs handle sequences",
          "Text data",
          "Time-series analysis",
          "The foundation for NLP applications",
        ],
      },
      {
        title: "Natural Language Processing (NLP) Basics",
        points: [
          "Text preprocessing",
          "Text classification",
          "Sentiment analysis",
          "How models process human language",
        ],
      },
      {
        title: "Model Evaluation, Overfitting and Optimization",
        points: [
          "Evaluating a deep learning model",
          "Recognising overfitting and underfitting",
          "Dropout and regularization",
          "Models that generalize to new data",
        ],
      },
      {
        title: "Transfer Learning Concepts",
        points: [
          "Using pre-trained models",
          "Adapting them to a new problem",
          "Saving time and compute",
          "How real AI teams work in practice",
        ],
      },
      {
        title: "Real-World Projects & Capstone Work",
        points: [
          "Image classification",
          "Text analysis",
          "Prediction tasks on real datasets",
          "A capstone from data preparation to trained model",
        ],
      },
      {
        title: "Career Readiness Skills",
        points: [
          "Resume support tailored to AI/ML roles",
          "Mock interview practice",
          "Presenting a deep learning portfolio",
          "Applying across Mohali, Chandigarh and Panchkula",
        ],
      },
    ],
    tools: [
      "Python",
      "TensorFlow",
      "Keras",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "CNNs",
      "RNNs",
    ],
    outcomes: [
      "Explain and build a neural network from neurons and activation functions up, not just call a library",
      "Train CNNs for image classification and RNNs for text and sequence data in TensorFlow and Keras",
      "Diagnose overfitting and tune a model with dropout, regularization and transfer learning",
      "Ship a capstone that runs from raw data preparation through to a trained, portfolio-ready model",
    ],
    roles: [
      "Deep Learning Engineer",
      "Computer Vision Associate",
      "NLP Associate",
      "AI/ML Specialist",
    ],
  },
  {
    slug: "mern-full-stack",
    title: "MERN Full Stack Development",
    category: "development",
    duration: "4 – 6 Months",
    level: "Beginner → Advanced",
    badge: "Hot",
    blurb:
      "MongoDB, Express, React and Node — one language, end to end, with authentication and cloud deployment.",
    overview:
      "Techcadd's MERN Stack Certification Training Program is designed to turn beginners, graduates and job seekers into industry-ready full-stack developers. Based in Mohali's growing IT hub — and easily accessible to students across the Tricity region of Chandigarh, Panchkula, Kharar and Zirakpur — this course covers the four pillars of modern web development: MongoDB, Express.js, React.js and Node.js. At Techcadd you do not just learn theory — you build. With 80% hands-on coding, live projects and real-world assignments, students master frontend design, backend logic, database management, API development, authentication and cloud deployment using a single language: JavaScript. Whether you are a 12th-pass student exploring tech careers, a graduate preparing for placements or a working professional upskilling for a MERN Stack Developer role, this MERN Stack training in Mohali gives you a structured path — from HTML/CSS basics to deploying full-stack applications — backed by placement support, internship opportunities and a certification recognized by top IT companies in Mohali, Chandigarh and beyond.",
    modules: [
      {
        title: "Frontend Foundations",
        points: [
          "HTML5 and CSS3 with responsive layouts",
          "JavaScript ES6+ — functions, promises, async/await",
          "Client-server architecture",
          "How requests and responses actually work",
        ],
      },
      {
        title: "React.js — Building Modern User Interfaces",
        points: [
          "Components, props and state",
          "React Hooks — useState, useEffect and more",
          "Component lifecycle and rendering behaviour",
          "SPA routing, Redux, Context API and Axios",
        ],
      },
      {
        title: "Node.js — Backend Fundamentals",
        points: [
          "The event loop",
          "Core modules",
          "npm package management",
          "Setting up a working server environment",
        ],
      },
      {
        title: "Express.js — Building APIs",
        points: [
          "Designing clean, scalable RESTful APIs",
          "Middleware",
          "Routing and request handling",
          "Structuring backend logic the way production apps do",
        ],
      },
      {
        title: "MongoDB — Database Management",
        points: [
          "NoSQL fundamentals and CRUD operations",
          "Schema design with Mongoose",
          "Data relationships",
          "Structuring flexible, scalable databases",
        ],
      },
      {
        title: "Authentication & Security",
        points: [
          "JWT (JSON Web Tokens)",
          "Password hashing with bcrypt",
          "Authorization flows",
          "An introduction to OAuth integration",
        ],
      },
      {
        title: "Full-Stack Integration",
        points: [
          "Connecting React to Node and Express",
          "Wiring the backend through to MongoDB",
          "One working, end-to-end application",
          "The true test of full-stack capability",
        ],
      },
      {
        title: "Cloud Deployment",
        points: [
          "Deploying to Netlify, Render and Vercel",
          "Deploying on AWS",
          "Version control with Git and GitHub",
          "Shipping an app, not just building one",
        ],
      },
      {
        title: "Real Projects You'll Build",
        points: [
          "A dynamic to-do application with full CRUD",
          "An e-commerce web app with authentication and product APIs",
          "A social media-style app with real-time features",
          "A blog CMS and a deployed personal portfolio site",
        ],
      },
    ],
    tools: [
      "React.js, Redux & Axios",
      "Node.js & Express.js",
      "MongoDB & Mongoose",
      "HTML5, CSS3 & JavaScript ES6",
      "REST APIs & Postman",
      "Git & GitHub",
      "Netlify, Render, Vercel & AWS",
      "VS Code, NPM, Babel & Webpack",
    ],
    outcomes: [
      "Build dynamic React interfaces with hooks, routing, Redux and API integration",
      "Design RESTful APIs in Node and Express, backed by MongoDB and Mongoose schemas",
      "Secure applications properly with JWT, bcrypt and OAuth fundamentals",
      "Deploy a complete full-stack app to Netlify, Render, Vercel or AWS, version-controlled in Git",
    ],
    roles: [
      "MERN Stack Developer",
      "Frontend Developer (React)",
      "Backend Developer (Node.js)",
      "Full Stack Developer",
      "API Developer",
    ],
  },
  {
    slug: "mean-stack",
    title: "MEAN Stack Development",
    category: "development",
    duration: "4 – 6 Months",
    level: "Beginner → Advanced",
    blurb:
      "MongoDB, Express.js, Angular and Node.js — one JavaScript skill set across front end, back end and database.",
    overview:
      "Techcadd's MEAN Stack training program is built for students, freshers and working professionals who want to become job-ready full-stack developers using MongoDB, Express.js, Angular and Node.js — the four technologies powering today's most scalable web applications. This MEAN Stack course in Mohali blends strong theoretical foundations with hands-on, project-based learning. You will work under experienced trainers, build real-world applications and gain the practical exposure that employers across Mohali, Chandigarh and the greater Tricity region actively look for. Whether you are a 12th-pass student exploring tech careers, a graduate preparing for placements or a professional upskilling for a full-stack role, this MEAN Stack training in Mohali gives you everything you need — from writing your first Angular component to deploying a complete, database-driven web application. By the end of this course you will be equipped to apply for roles as a Full-Stack Developer, Front-End Developer or Back-End Developer at IT companies, startups and MNCs based in Mohali's growing tech hubs like IT Park and Phase 8.",
    modules: [
      {
        title: "Introduction to MEAN Stack Development",
        points: [
          "An overview of full-stack web development",
          "Why MongoDB, Express.js, Angular and Node.js work well together",
          "Setting up your complete development environment",
          "How a real project workflow runs from planning to deployment",
        ],
      },
      {
        title: "Basics of HTML and CSS",
        points: [
          "HTML structure and elements",
          "CSS styling fundamentals",
          "Responsive design principles",
          "Layout techniques with Flexbox and Grid",
        ],
      },
      {
        title: "JavaScript Fundamentals",
        points: [
          "Data types, variables and functions",
          "Loops and conditional statements",
          "Event handling",
          "DOM manipulation",
        ],
      },
      {
        title: "Introduction to Node.js",
        points: [
          "The Node.js runtime environment",
          "Setting Node up and exploring core modules",
          "Creating your first simple server",
          "Managing dependencies with NPM",
        ],
      },
      {
        title: "Introduction to MongoDB",
        points: [
          "NoSQL database concepts",
          "Installing and configuring MongoDB",
          "CRUD operations",
          "Connecting Node.js applications to MongoDB",
        ],
      },
      {
        title: "Basics of Express.js",
        points: [
          "Building your first Express server",
          "Routing fundamentals",
          "Middleware",
          "Constructing simple, functional APIs",
        ],
      },
      {
        title: "Angular Basics",
        points: [
          "Setting up an Angular project",
          "Components and templates",
          "Data binding",
          "Directives that bring an application to life",
        ],
      },
      {
        title: "Building a Complete MEAN Project",
        points: [
          "Combining MongoDB, Express, Angular and Node",
          "Structuring a real project from scratch",
          "Connecting front end to back end properly",
          "The way it is done in professional development environments",
        ],
      },
    ],
    tools: [
      "MongoDB",
      "Express.js",
      "Angular",
      "Node.js",
      "NPM",
      "HTML5 & CSS3",
      "Git & GitHub",
      "RESTful APIs",
      "VS Code",
    ],
    outcomes: [
      "Write JavaScript confidently and apply it across front end, back end and database",
      "Build dynamic Angular interfaces with components, templates, data binding and directives",
      "Create Node and Express servers with routing, middleware and working REST APIs",
      "Ship one integrated MEAN application, front end connected to MongoDB end to end",
    ],
    roles: [
      "Full-Stack Developer",
      "Front-End Developer",
      "Back-End Developer",
      "Software Engineer",
      "Application Developer",
      "Technical Consultant",
    ],
  },
  {
    slug: "php-full-stack",
    title: "PHP Full Stack Development",
    category: "development",
    duration: "4 – 6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Core PHP and OOP through MySQL, Laravel, CodeIgniter and WordPress — front end to back end, with 25+ real applications.",
    overview:
      "The PHP Full Stack Course in Mohali by Techcadd is designed for students, freshers, graduates and aspiring developers who want to build practical skills across front-end, back-end, databases and modern web application development. The learning path covers Core PHP, object-oriented PHP, MySQL, Laravel, HTML, CSS, JavaScript, responsive web development, API development and real-world application building. Instead of focusing only on theory, this PHP Full Stack training in Mohali is built around practical coding, projects, assignments and career-oriented development skills. You learn how the parts of a web application work together — from creating user-facing interfaces to connecting PHP applications with databases and developing structured backend functionality. For learners searching for a PHP development course in Mohali, PHP Laravel training in Mohali, or a PHP full stack developer course near Chandigarh, this program provides a structured route toward building portfolio-ready skills and preparing for roles such as PHP Developer, Laravel Developer, Backend Developer and Full Stack Web Developer.",
    modules: [
      {
        title: "PHP Fundamentals",
        points: [
          "PHP syntax, variables and data types",
          "Operators and conditional statements",
          "Loops and functions",
          "Arrays and how server-side scripts operate",
        ],
      },
      {
        title: "Advanced PHP and OOPs",
        points: [
          "Classes and objects",
          "Inheritance and polymorphism",
          "Exception handling",
          "File input and output",
        ],
      },
      {
        title: "MySQL Database Development",
        points: [
          "SQL fundamentals and queries",
          "Joins",
          "Database connectivity",
          "PHP to MySQL with MySQLi and PDO",
        ],
      },
      {
        title: "Frontend Web Technologies",
        points: [
          "HTML and CSS",
          "JavaScript",
          "jQuery",
          "Bootstrap for responsive, interactive interfaces",
        ],
      },
      {
        title: "Laravel Framework",
        points: [
          "Artisan and MVC architecture",
          "Blade templates",
          "Eloquent ORM, migrations and relationships",
          "API development",
        ],
      },
      {
        title: "CodeIgniter and WordPress",
        points: [
          "CodeIgniter's lightweight MVC architecture",
          "WordPress installation",
          "Theme customisation",
          "Basic plugin development",
        ],
      },
      {
        title: "APIs, Testing and Debugging",
        points: [
          "REST API development and JSON responses",
          "API authentication",
          "API testing with Postman",
          "Debugging with Xdebug, browser dev tools and Laravel Telescope",
        ],
      },
      {
        title: "Practical Projects and Career Preparation",
        points: [
          "25+ real-world PHP web applications",
          "Live project development",
          "Portfolio development",
          "Interview preparation and essential data structures and algorithms",
        ],
      },
    ],
    tools: [
      "VS Code",
      "XAMPP / WAMP",
      "Composer",
      "Git & GitHub",
      "MySQL Workbench",
      "Postman",
      "Browser developer tools",
      "Xdebug",
    ],
    outcomes: [
      "Write structured, object-oriented PHP and connect it to MySQL through MySQLi and PDO",
      "Build responsive interfaces in HTML, CSS, JavaScript, jQuery and Bootstrap",
      "Develop applications in Laravel with MVC, Blade, Eloquent and REST APIs, plus CodeIgniter and WordPress",
      "Leave with 25+ real applications, a portfolio and interview preparation behind you",
    ],
    roles: [
      "PHP Developer",
      "Laravel Developer",
      "Backend Developer",
      "Full Stack Developer",
      "WordPress Developer",
      "Junior Software Developer",
    ],
  },
  {
    slug: "full-stack-development",
    title: "Full Stack Development",
    category: "development",
    duration: "4 – 6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Front-end to back-end — HTML, CSS, JavaScript, React, Node, Express, MongoDB, Git and deployment.",
    overview:
      "The Full Stack Development course in Mohali at Techcadd is designed to take you from a complete beginner to a job-ready developer, all under one structured, mentor-led program. Mohali has quickly become one of North India's fastest-growing IT hubs, with startups, product companies and service firms constantly hiring skilled full stack developers, and this course is built to meet that exact demand. You will learn both front-end and back-end development — HTML, CSS, JavaScript, React.js, Node.js, Express.js and MongoDB — through live projects instead of just theory. Whether you are a 12th-pass student exploring your first career path, a graduate preparing for placements or a working professional looking to switch into IT, this Full Stack Development training in Mohali gives you a practical, industry-aligned foundation. With hands-on coding labs, real applications to add to your portfolio and placement support, Techcadd helps you turn coding skills into an actual career — right here in the Mohali/Tricity region.",
    modules: [
      {
        title: "Introduction to Web Development",
        points: [
          "How the internet works — client-server architecture",
          "How websites are structured",
          "Domains, hosting and servers",
          "Code editors, browsers and daily developer tools",
        ],
      },
      {
        title: "HTML — Website Structure",
        points: [
          "Headings, paragraphs, lists and links",
          "Images and tables",
          "Forms",
          "Semantic tags",
        ],
      },
      {
        title: "CSS — Styling and Layout",
        points: [
          "Selectors, colours, fonts and spacing",
          "Flexbox",
          "CSS Grid",
          "Responsive design across mobile, tablet and desktop",
        ],
      },
      {
        title: "Bootstrap Framework",
        points: [
          "Navigation bars and grids",
          "Buttons and forms",
          "Cards and modals",
          "Professional, mobile-friendly layouts, faster",
        ],
      },
      {
        title: "JavaScript Programming",
        points: [
          "Variables, data types, loops and functions",
          "Arrays and objects",
          "DOM manipulation and event handling",
          "Form validation",
        ],
      },
      {
        title: "Advanced JavaScript (ES6+)",
        points: [
          "Arrow functions and destructuring",
          "Promises and asynchronous programming",
          "Modules",
          "Fetching data from APIs",
        ],
      },
      {
        title: "React.js Front-End Development",
        points: [
          "JSX, components and props",
          "State management and hooks",
          "Routing",
          "API integration and single-page applications",
        ],
      },
      {
        title: "Node.js Back-End Development",
        points: [
          "Building servers",
          "Handling HTTP requests",
          "Working with file systems",
          "Creating RESTful APIs",
        ],
      },
      {
        title: "Express.js Framework",
        points: [
          "Routing",
          "Middleware",
          "Scalable backend architecture",
          "Server-side development, simplified",
        ],
      },
      {
        title: "MongoDB Database Management",
        points: [
          "NoSQL fundamentals",
          "Databases, collections and documents",
          "CRUD operations",
          "Integrating MongoDB with Node.js",
        ],
      },
      {
        title: "Git & Version Control",
        points: [
          "Git fundamentals",
          "GitHub workflows",
          "Tracking changes",
          "Collaborating with other developers",
        ],
      },
      {
        title: "Deployment & Hosting",
        points: [
          "Hosting platforms",
          "Domain configuration",
          "Server setup",
          "Performance and security optimization before launch",
        ],
      },
    ],
    tools: [
      "HTML5",
      "CSS3",
      "Bootstrap",
      "JavaScript (ES6+)",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Git & GitHub",
      "REST APIs",
      "VS Code",
    ],
    outcomes: [
      "Structure and style responsive sites in HTML5, CSS3 and Bootstrap",
      "Write real JavaScript — DOM manipulation, ES6+, async and API calls — then build SPAs in React",
      "Build RESTful APIs in Node and Express, backed by MongoDB",
      "Version-control your work in Git and take a full stack capstone project live",
    ],
    roles: [
      "Full Stack Developer",
      "Front-End Developer",
      "Back-End Developer",
      "Web Application Developer",
      "Software Engineer",
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    category: "development",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Frontend to backend — HTML5, CSS3, JavaScript, React, Node, Express and MongoDB, deployed live.",
    overview:
      "Techcadd's Web Development Course in Mohali is built for students, graduates and job seekers who want real, job-ready coding skills — not just theory. Located in the heart of Mohali, close to Phase 8, Sector 74 and the IT Park, Techcadd trains you in both frontend and backend development, including HTML5, CSS3, JavaScript, React.js, Node.js, Express.js and MongoDB (MERN Stack), alongside database management and live project deployment. This is not a classroom-only course — every module is backed by hands-on projects, real coding assignments and mentorship from experienced developers who understand what Mohali and Tricity-based IT companies actually hire for. Whether you are a 12th-pass student exploring tech, a graduate switching careers or a working professional upskilling, this course builds you into a confident, portfolio-ready web developer. By the end of the program you will be equipped with full-stack development skills, a live project portfolio and placement support — everything you need to start your career as a Web Developer in Mohali and beyond.",
    modules: [
      {
        title: "Web Fundamentals & Frontend Development",
        points: [
          "HTML5 for structuring content",
          "CSS3 for styling and layout",
          "JavaScript for interactivity and logic",
          "Responsive design and Bootstrap components",
        ],
      },
      {
        title: "Modern Frontend Frameworks",
        points: [
          "React.js component-based architecture",
          "State management",
          "Hooks",
          "Dynamic, production-grade user interfaces",
        ],
      },
      {
        title: "Backend Development",
        points: [
          "Node.js server-side fundamentals",
          "Express.js routing",
          "Building REST APIs",
          "How data moves between browser and server",
        ],
      },
      {
        title: "Database Management",
        points: [
          "MongoDB, a widely-used NoSQL database",
          "Designing schemas",
          "CRUD operations",
          "Connecting the database to your backend",
        ],
      },
      {
        title: "Full-Stack Integration (MERN Stack)",
        points: [
          "MongoDB, Express.js, React.js and Node.js together",
          "End-to-end web applications from scratch",
          "How professional development teams build",
          "Complete full-stack architecture",
        ],
      },
      {
        title: "Version Control & Deployment",
        points: [
          "Git for version control",
          "GitHub and collaborative coding",
          "Deploying projects live",
          "Work that is accessible on the internet, not just your laptop",
        ],
      },
      {
        title: "Real Project Building",
        points: [
          "Live projects rather than isolated exercises",
          "Actual websites and applications",
          "Increasing complexity through the course",
          "A portfolio of real, deployable projects",
        ],
      },
      {
        title: "Career Readiness Tools",
        points: [
          "Structuring your GitHub profile",
          "Building a developer portfolio",
          "Technical interview preparation",
          "Turning skills into job opportunities",
        ],
      },
    ],
    tools: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "React.js",
      "Node.js & Express.js",
      "MongoDB",
      "Git & GitHub",
      "VS Code",
      "REST APIs & Postman",
    ],
    outcomes: [
      "Build responsive frontends in HTML5, CSS3, JavaScript, Bootstrap and React",
      "Write server-side logic and REST APIs in Node.js and Express",
      "Design MongoDB schemas and wire a database through to a working frontend",
      "Ship complete MERN applications, version-controlled in Git and deployed live",
    ],
    roles: [
      "Frontend Developer",
      "Backend Developer",
      "Full-Stack Developer",
      "MERN Stack Developer",
      "Web Designer",
    ],
  },
  {
    slug: "python-programming",
    title: "Python Programming",
    category: "programming",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Fundamentals to OOP, data structures, NumPy, Pandas and Django — from your first line of code to real applications.",
    overview:
      "Techcadd's Python Programming Course in Mohali is built for students who want more than theory — you will write real code, build real projects and walk out job-ready. Whether you are a 12th-pass student from Mohali, Zirakpur or Kharar, a graduate exploring IT, or a working professional planning a switch, this course starts from the absolute basics and takes you all the way to real-world application development. Our Python training in Mohali blends a structured, industry-relevant curriculum with hands-on coding, live projects and mentorship from experienced trainers. You will master core programming logic, object-oriented concepts, data structures, file handling, automation and in-demand tools like NumPy, Pandas and Django — the same skills companies across the Mohali–Chandigarh IT corridor are actively hiring for. No coding background? No problem. This Python course in Mohali is designed to take absolute beginners and turn them into confident, practical programmers — with certification, placement assistance and a curriculum built around what the industry actually wants today.",
    modules: [
      {
        title: "Python Fundamentals",
        points: [
          "Syntax, variables and operators",
          "Strings, integers, floats and booleans",
          "Input and output handling",
          "Basic program logic",
        ],
      },
      {
        title: "Control Flow & Logic Building",
        points: [
          "if-else statements",
          "for and while loops",
          "Nested conditions",
          "Breaking real problems into logical steps",
        ],
      },
      {
        title: "Functions & Modular Programming",
        points: [
          "Writing reusable functions",
          "Parameters and return values",
          "Structuring clean, maintainable code",
          "What separates beginner code from professional code",
        ],
      },
      {
        title: "Data Structures",
        points: [
          "Lists and tuples",
          "Dictionaries and sets",
          "Storing, accessing and manipulating data efficiently",
          "The structures behind almost every real Python project",
        ],
      },
      {
        title: "Object-Oriented Programming (OOP)",
        points: [
          "Classes and objects",
          "Inheritance",
          "Polymorphism",
          "Building scalable applications",
        ],
      },
      {
        title: "Error & Exception Handling",
        points: [
          "try-except blocks",
          "Anticipating failure",
          "Managing errors gracefully",
          "Programs that do not crash unexpectedly",
        ],
      },
      {
        title: "File Handling",
        points: [
          "Reading and writing files programmatically",
          "Managing file paths and formats",
          "The foundation of automation work",
          "Data processing from disk",
        ],
      },
      {
        title: "Modules & Packages",
        points: [
          "Creating and importing modules",
          "Built-in and third-party packages",
          "Virtual environments",
          "How larger applications are structured",
        ],
      },
      {
        title: "Data Analysis with NumPy & Pandas",
        points: [
          "NumPy for numerical computing",
          "Pandas for data manipulation",
          "Cleaning and analysing real datasets",
          "Two of the most in-demand tools for data roles",
        ],
      },
      {
        title: "Web Development Basics with Django",
        points: [
          "Django project structure",
          "Views, templates and models",
          "Building a working web application",
          "An entry point into backend and full-stack roles",
        ],
      },
      {
        title: "Automation & Scripting",
        points: [
          "Automating repetitive tasks",
          "Organising files programmatically",
          "Processing data with scripts",
          "Workplace efficiency projects",
        ],
      },
      {
        title: "Real-World Projects",
        points: [
          "Hands-on mini-projects throughout",
          "Data handling, automation and web development",
          "Debugging and fixing your own code",
          "Demonstrable experience by the time you finish",
        ],
      },
    ],
    tools: [
      "Python (Core)",
      "NumPy",
      "Pandas",
      "Django",
      "Virtual environments (venv)",
      "Jupyter & IDE tools",
      "Git basics",
      "APIs & web scraping",
    ],
    outcomes: [
      "Write clean, logical Python from fundamentals through OOP, data structures and exception handling",
      "Analyse real datasets with NumPy and Pandas",
      "Build a working web application in Django and automate repetitive tasks with scripts",
      "Finish with a portfolio of mini-projects you can actually discuss in an interview",
    ],
    roles: [
      "Python Developer",
      "Junior Data Analyst",
      "Automation Engineer",
      "Backend Developer (Django)",
      "QA / Testing Engineer",
    ],
  },
  {
    slug: "java-programming",
    title: "Java Programming",
    category: "programming",
    duration: "4 Months",
    level: "Beginner → Advanced",
    blurb:
      "Core Java, OOP, exception handling, data structures, Collections, file handling and JDBC — built hands-on, from zero.",
    overview:
      "Techcadd's Java training program is built for students in Mohali, Phase 7, Phase 5, Phase 11, Zirakpur and the wider Tricity region who want practical, job-ready coding skills. This hands-on program takes you from Java fundamentals to advanced concepts like Object-Oriented Programming, the Collections Framework, Exception Handling, Multithreading, File Handling and Java Database Connectivity (JDBC). At Techcadd we do not just teach theory — you will build real applications, work on live projects and get mentored by trainers with genuine industry experience. Whether you are a fresher, a 12th-pass student exploring tech careers or a graduate aiming to break into IT, this Java course in Mohali is designed to make you interview-ready and placement-ready. With Mohali's growing IT Park and Aerocity corridor creating strong local demand for developers, there is no better time to start. Join Techcadd and turn your Java learning into a real career in software development, right here in Mohali.",
    modules: [
      {
        title: "Introduction to Java & Development Environment",
        points: [
          "What Java is and where it is used",
          "Write once, run anywhere",
          "Setting up the Java development environment",
          "Working in Eclipse and IntelliJ IDEA",
        ],
      },
      {
        title: "Java Basics",
        points: [
          "Variables, data types and operators",
          "if-else and switch statements",
          "for and while loops",
          "Reading and writing basic Java logic",
        ],
      },
      {
        title: "Object-Oriented Programming (OOP) Concepts",
        points: [
          "Classes and objects",
          "Inheritance and polymorphism",
          "Encapsulation and abstraction",
          "How real, scalable Java applications are structured",
        ],
      },
      {
        title: "Exception Handling",
        points: [
          "try, catch and finally",
          "throw and throws",
          "Custom exceptions",
          "Applications that handle errors without crashing",
        ],
      },
      {
        title: "Data Structures in Java",
        points: [
          "Arrays and linked lists",
          "Stacks and queues",
          "HashMap and ArrayList",
          "Storing and manipulating data efficiently",
        ],
      },
      {
        title: "Java Collections Framework",
        points: [
          "List, Set and Map interfaces",
          "Iterators",
          "Generics",
          "Flexible, reusable, type-safe code",
        ],
      },
      {
        title: "Java File Handling",
        points: [
          "Reading from and writing to files",
          "File input and output operations",
          "Serialization",
          "Storing and transferring application data",
        ],
      },
      {
        title: "Java Database Connectivity (JDBC)",
        points: [
          "Connecting Java applications to real databases",
          "CRUD operations",
          "Prepared statements",
          "Handling ResultSets",
        ],
      },
    ],
    tools: [
      "Java Development Kit (JDK)",
      "Eclipse",
      "IntelliJ IDEA",
      "Java Collections Framework",
      "JDBC",
      "Version control basics",
    ],
    outcomes: [
      "Write and debug real Java in Eclipse and IntelliJ, from basics through OOP",
      "Handle errors properly with custom exceptions, and organise data with arrays, collections and generics",
      "Read and write files, and serialize application data",
      "Connect a Java application to a database and run full CRUD operations through JDBC",
    ],
    roles: [
      "Java Developer",
      "Backend Developer",
      "Android Developer",
      "Full Stack Developer",
      "Software Engineer",
      "Java Web Developer",
    ],
  },
  {
    slug: "web-designing",
    title: "Web Designing",
    category: "development",
    duration: "6 Weeks – 6 Months",
    level: "Beginner → Advanced",
    blurb:
      "HTML5, CSS3, JavaScript, Bootstrap, WordPress and UI/UX in Figma and Adobe XD — built through real websites.",
    overview:
      "Techcadd's Web Designing Course is built for students, graduates and job seekers across Mohali, SAS Nagar, IT City Mohali and the greater Chandigarh tricity who want practical, job-ready design skills — not just theory. This course takes you from the fundamentals of HTML5, CSS3 and JavaScript to modern, in-demand skills like Bootstrap, responsive web design, WordPress and UI/UX design using industry tools such as Figma and Adobe XD. Every module is taught through live projects, real websites and hands-on practice, so you graduate with a portfolio — not just a certificate. Whether you are a 12th-pass student exploring a creative-tech career, a graduate preparing for your first job, or a working professional upskilling for freelancing, Techcadd's Mohali-focused, mentor-led training, placement assistance and flexible batch timings make this one of the most practical ways to start your journey in web design.",
    modules: [
      {
        title: "Introduction to Web Design & the Digital Landscape",
        points: [
          "How websites actually work",
          "Web designer versus web developer",
          "Usability, accessibility and visual hierarchy",
          "Consistency as a design principle",
        ],
      },
      {
        title: "HTML5 — Structuring the Web",
        points: [
          "Headings, paragraphs, links and images",
          "Forms and tables",
          "Semantic tags",
          "The backbone every website is built on",
        ],
      },
      {
        title: "CSS3 — Styling & Layout",
        points: [
          "Colours, fonts, spacing and positioning",
          "Flexbox and Grid",
          "Responsive web design",
          "Sites that work on desktop, tablet and mobile",
        ],
      },
      {
        title: "JavaScript Basics",
        points: [
          "Dropdown menus and sliders",
          "Form validation",
          "Dynamic content",
          "The interactivity that makes a designer more employable",
        ],
      },
      {
        title: "Bootstrap Framework",
        points: [
          "Pre-built components",
          "The Bootstrap grid system",
          "Responsive layouts, faster",
          "The framework real agency and freelance work uses",
        ],
      },
      {
        title: "UI/UX Design Principles",
        points: [
          "Understanding user needs",
          "Wireframes and user personas",
          "Intuitive navigation flows",
          "Design psychology, colour theory and typography",
        ],
      },
      {
        title: "Design Tools — Figma & Adobe XD",
        points: [
          "Wireframing",
          "Prototyping",
          "Polished visual design before development",
          "The tools design teams across the IT industry actually use",
        ],
      },
      {
        title: "WordPress — CMS-Based Website Building",
        points: [
          "Installing and customizing themes",
          "Working with plugins",
          "Customising layouts",
          "Business-ready websites without writing code from scratch",
        ],
      },
      {
        title: "Building Real Website Projects",
        points: [
          "Portfolio websites",
          "Business websites",
          "Landing pages",
          "E-commerce style layouts",
        ],
      },
      {
        title: "SEO Basics for Web Designers",
        points: [
          "Page speed",
          "Site structure",
          "On-page fundamentals",
          "Search-engine-friendly sites from day one",
        ],
      },
      {
        title: "Freelancing & Portfolio Building",
        points: [
          "Presenting your work professionally",
          "Building a personal portfolio",
          "Pricing projects and client communication",
          "Getting started on Fiverr and Upwork",
        ],
      },
    ],
    tools: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "Figma",
      "Adobe XD",
      "WordPress",
      "SEO basics",
    ],
    outcomes: [
      "Build and style complete, responsive websites in HTML5, CSS3 and Bootstrap",
      "Add real interactivity with JavaScript — menus, sliders and form validation",
      "Design interfaces properly — wireframes, prototypes and visual design in Figma and Adobe XD",
      "Ship real projects and a personal portfolio, ready for a job or your first freelance client",
    ],
    roles: [
      "Web Designer",
      "UI/UX Designer",
      "WordPress Developer",
      "Frontend Developer",
      "Freelance Web Designer",
    ],
  },
  {
    slug: "wordpress",
    title: "WordPress",
    category: "development",
    duration: "45 Days",
    level: "Beginner → Advanced",
    blurb:
      "Themes, plugins, Elementor, WooCommerce, SEO and security — build and launch real websites without writing code.",
    overview:
      "The WordPress course in Mohali at Techcadd is designed to help students, graduates and job seekers master the world's most popular content management system — the same platform powering over 40% of websites globally. This WordPress training in Mohali takes you from the basics of setting up a website to advanced theme customization, plugin management, WooCommerce store building and on-page SEO optimization. Whether you are near IT City, Phase 7, Phase 8, Industrial Area or the wider Chandigarh Tricity region, Techcadd's WordPress classes in Mohali offer hands-on, practical training led by industry experts — not just theory. You will work on live projects, build real websites and gain a portfolio that is ready to show employers or clients from day one. With flexible batch timings, affordable fees and placement assistance, our WordPress course in Mohali is built for 12th pass students, graduates and working professionals who want to enter web development, freelancing or digital marketing careers. Join Techcadd Mohali and turn your web design ambitions into a real, in-demand skill.",
    modules: [
      {
        title: "Introduction to WordPress",
        points: [
          "Overview of WordPress",
          "How a CMS works",
          "Setting up your website",
          "Dashboard walkthrough",
        ],
      },
      {
        title: "Choosing a WordPress Theme",
        points: [
          "Theme installation",
          "Theme customization",
          "Free versus premium themes",
          "Responsive design basics",
        ],
      },
      {
        title: "Creating Pages and Posts",
        points: [
          "Adding pages and posts",
          "Managing content",
          "Categories and tags",
          "Media library and image uploads",
        ],
      },
      {
        title: "WordPress Plugins",
        points: [
          "Installing and managing plugins",
          "Must-have plugins",
          "Plugin configuration",
          "Contact forms",
        ],
      },
      {
        title: "Page Builders & Customization",
        points: [
          "Elementor",
          "The Gutenberg block editor",
          "Drag-and-drop page design",
          "Widgets and menus",
        ],
      },
      {
        title: "WooCommerce & E-Commerce Setup",
        points: [
          "Setting up an online store",
          "Adding products",
          "Payment gateway basics",
          "Order and inventory management",
        ],
      },
      {
        title: "WordPress SEO Optimization",
        points: [
          "SEO plugins — Yoast and Rank Math",
          "Keyword optimization",
          "Meta titles and descriptions",
          "Google Analytics and Search Console setup",
        ],
      },
      {
        title: "WordPress Security & Maintenance",
        points: [
          "Security plugins",
          "Backup solutions",
          "Regular core and plugin updates",
          "Site speed optimization",
        ],
      },
    ],
    tools: [
      "WordPress Dashboard",
      "Elementor / Gutenberg",
      "Yoast SEO / Rank Math",
      "WooCommerce",
      "Google Analytics",
      "Google Search Console",
      "UpdraftPlus & Wordfence",
      "WPForms / Contact Form 7",
    ],
    outcomes: [
      "Plan, build, secure and launch a complete website from scratch — no code required",
      "Customise themes and design visually rich pages in Elementor and Gutenberg",
      "Set up a WooCommerce store with products, payments and order management",
      "Optimise a site for search with Yoast or Rank Math, and keep it fast, backed up and secure",
    ],
    roles: [
      "WordPress Developer",
      "Web Designer",
      "Website Administrator",
      "WooCommerce / E-commerce Specialist",
      "Content Manager",
      "Freelance WordPress Developer",
    ],
  },
  {
    slug: "shopify",
    title: "Shopify",
    category: "development",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Liquid programming, theme customization, app integration and Shopify SEO — build real e-commerce stores, not just set them up.",
    overview:
      "Techcadd's Shopify Development Course in Mohali is designed for students, graduates and job seekers across Mohali, Chandigarh and Panchkula who want practical, industry-ready skills in building and customizing high-performing online stores. This hands-on program takes you beyond basic store setup — you will master Liquid programming, theme customization, app integration and Shopify SEO, working on live projects that mirror real client work. Whether you are a beginner from Sector 75, Phase 8 or IT Park Mohali, or a working professional looking to upskill, this course builds you into a job-ready Shopify Developer. Backed by certified trainers, 100% practical training and strong placement support with IT companies across the Tri-City region, Techcadd's Shopify course in Mohali is your fastest route to a rewarding career in e-commerce development — whether you aim for a full-time developer role or a thriving freelance business.",
    modules: [
      {
        title: "Liquid Programming & Theme Customization",
        points: [
          "In-depth mastery of the Liquid template language",
          "Modifying Dawn and other Shopify 2.0 themes",
          "Customizing sections and building layouts from scratch",
          "Features standard themes and apps cannot provide",
        ],
      },
      {
        title: "Store Setup & E-commerce Operations",
        points: [
          "Product catalog management",
          "Shipping profiles and tax setup",
          "Payment gateway integration, including Razorpay",
          "How a store actually runs behind the scenes",
        ],
      },
      {
        title: "Speed Optimization & SEO for E-commerce",
        points: [
          "Improving page load speed",
          "Optimizing product pages for Google",
          "Core Web Vitals compliance",
          "What employers screen for on high-traffic stores",
        ],
      },
      {
        title: "App Integration & Store Scaling",
        points: [
          "Inventory management apps",
          "Dropshipping automation and subscriptions",
          "Conversion rate optimization (CRO)",
          "Extending functionality without bloating the site",
        ],
      },
      {
        title: "Client Management & Project Delivery",
        points: [
          "Scoping projects professionally",
          "Communicating with clients",
          "Managing store handovers",
          "Marketing yourself as a freelance Shopify Developer",
        ],
      },
      {
        title: "Advanced E-commerce Features",
        points: [
          "The Shopify API",
          "Complex inventory system management",
          "Mobile shopping experience optimization",
          "The depth higher-paying developer and lead roles ask for",
        ],
      },
    ],
    tools: [
      "Liquid",
      "Shopify Admin & Storefront APIs",
      "Shopify 2.0 — sections & metafields",
      "HTML, CSS & JavaScript",
      "Razorpay & payment gateways",
      "Shopify Apps ecosystem",
      "Core Web Vitals & SEO tools",
      "Figma / PSD-to-Shopify",
    ],
    outcomes: [
      "Write Liquid confidently and customise any Shopify 2.0 theme, sections and metafields included",
      "Run a store end to end — catalog, shipping, tax and payment gateways including Razorpay",
      "Optimise a store for speed, Core Web Vitals and product-page SEO",
      "Ship at least three live stores across different niches, plus scope, price and hand over client work",
    ],
    roles: [
      "Junior Shopify Developer",
      "Shopify Theme Developer",
      "Shopify App Developer",
      "E-commerce Developer",
      "Freelance Shopify Expert",
    ],
  },
  {
    slug: "kotlin",
    title: "Kotlin",
    category: "development",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Kotlin fundamentals to Jetpack Compose, MVVM and coroutines — build and publish real Android apps.",
    overview:
      "Techcadd's Kotlin program is designed for students who want real, job-ready skills in Android app development — not just theory. Based in the Mohali/Tricity region and trusted by learners from Chandigarh, Panchkula and across Punjab, this course takes you from Kotlin fundamentals to building fully functional Android apps using industry-standard tools like Android Studio and Jetpack Compose. You will learn core programming concepts, object-oriented programming, app architecture (MVVM) and coroutines, while working on 5+ live projects including a to-do app, news reader and e-commerce app. Small batch sizes mean personal mentorship, not lost-in-the-crowd lectures. Whether you are a 12th-pass student, a graduate or a working professional switching to tech, this Kotlin training program in Mohali gives you the practical foundation and certification support — including Google Certified Associate Android Developer prep — needed to enter the booming Android developer job market, with placement support across the Tricity region.",
    modules: [
      {
        title: "Introduction to Kotlin",
        points: [
          "Overview of the Kotlin language",
          "Why Google adopted it for Android",
          "Setting up the development environment",
          "IntelliJ IDEA and Android Studio",
        ],
      },
      {
        title: "Kotlin Basics",
        points: [
          "Variables and data types — Int, Char, Float, Double, Boolean",
          "Arithmetic, relational and logical operators",
          "if and else",
          "when statements",
        ],
      },
      {
        title: "Loops in Kotlin",
        points: [
          "for and while loops",
          "do-while loops",
          "Nested loops",
          "Ranges and iterators",
        ],
      },
      {
        title: "Functions in Kotlin",
        points: [
          "Defining and calling functions",
          "Parameters and return types",
          "Lambda functions",
          "Inline functions",
        ],
      },
      {
        title: "Object-Oriented Programming (OOP)",
        points: [
          "Classes, objects, properties and methods",
          "Inheritance and interfaces",
          "Data classes and sealed classes",
          "Null safety — Kotlin's biggest advantage over Java",
        ],
      },
      {
        title: "Exception Handling",
        points: [
          "try-catch blocks",
          "Custom exceptions",
          "Exception propagation",
          "The finally block for cleanup",
        ],
      },
      {
        title: "Coroutines & Asynchronous Programming",
        points: [
          "Kotlin coroutines for concurrency",
          "Launching coroutines correctly",
          "Structured, non-blocking code",
          "What keeps an Android app responsive",
        ],
      },
      {
        title: "Android UI Development",
        points: [
          "Activities, Fragments and XML layouts",
          "Modern UI with Jetpack Compose",
          "Navigation patterns",
          "State management",
        ],
      },
      {
        title: "App Architecture (MVVM)",
        points: [
          "The Model-View-ViewModel pattern",
          "How professional Android apps are structured",
          "Scalable, maintainable code",
          "Working the way real development teams do",
        ],
      },
      {
        title: "Data Storage & APIs",
        points: [
          "Local storage",
          "SQLite",
          "Parsing JSON data",
          "Integrating third-party APIs",
        ],
      },
      {
        title: "Capstone Projects & Publishing",
        points: [
          "To-do app and news reader",
          "Movie browser and e-commerce app",
          "Social media clone",
          "Publishing an app live on the Play Store",
        ],
      },
    ],
    tools: [
      "Android Studio",
      "IntelliJ IDEA",
      "Kotlin SDK",
      "Jetpack Compose",
      "XML Layouts",
      "Gradle",
      "SQLite",
      "Git basics",
      "Google Play Console",
    ],
    outcomes: [
      "Write Kotlin confidently — from basics and OOP through null safety, coroutines and exception handling",
      "Build Android UIs in both Jetpack Compose and XML, with proper navigation and state management",
      "Structure an app the professional way with MVVM, local storage and third-party API integration",
      "Ship 5+ complete apps and publish one live through the Google Play Console",
    ],
    roles: [
      "Android Developer",
      "Mobile App Developer",
      "Junior Software Developer",
      "Freelance App Developer",
    ],
  },
  {
    slug: "flutter",
    title: "Flutter App Development",
    category: "development",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Dart, Flutter widgets, state management, Firebase and APIs — one codebase, Android and iOS, published live.",
    overview:
      "The Flutter App Development Course in Mohali by Techcadd is designed for students, freshers and working professionals who want to master Google's Flutter framework and the Dart programming language — the technology powering apps for brands like Google, BMW and Alibaba. At Techcadd Mohali you will learn to build high-performance, cross-platform apps for Android and iOS using a single codebase, right from the fundamentals of Dart to advanced concepts like state management, API integration, Firebase and app deployment. With Mohali and the greater Chandigarh tricity region rapidly emerging as an IT and startup hub, demand for skilled Flutter developers is growing fast — and this course prepares you to meet it. Through 100% practical training, live projects and placement-focused mentorship, Techcadd helps you go from beginner to job-ready mobile app developer. Whether you are a 12th-pass student, a graduate or a professional upskilling for a tech career, this course is your launchpad into the world of app development.",
    modules: [
      {
        title: "Introduction to Flutter & Dart",
        points: [
          "What Flutter is and why it leads cross-platform development",
          "Flutter architecture and SDK setup",
          "Dart fundamentals — variables, loops, functions, data types",
          "Writing and running your first Flutter application",
        ],
      },
      {
        title: "Flutter Widgets & UI Design",
        points: [
          "Stateless and Stateful widgets",
          "Layouts with rows, columns and containers",
          "Responsive interfaces across screen sizes",
          "Theming, images, custom fonts and app assets",
        ],
      },
      {
        title: "State Management in Flutter",
        points: [
          "App state and lifecycles",
          "Provider, Riverpod and Bloc",
          "Handling user input and form validation",
          "Navigation between multiple screens",
        ],
      },
      {
        title: "Working with APIs & Databases",
        points: [
          "Connecting to RESTful APIs",
          "Fetching and displaying live data",
          "Local storage with SQLite",
          "Firebase real-time database and authentication",
        ],
      },
      {
        title: "Advanced Flutter & Animation",
        points: [
          "Custom animations and screen transitions",
          "Third-party packages and libraries",
          "Push notifications",
          "Device permissions, gestures and camera access",
        ],
      },
      {
        title: "Testing, Debugging & Deployment",
        points: [
          "Debugging tools and performance optimization",
          "Unit, widget and integration tests",
          "Generating app builds",
          "Publishing to the Google Play Store and Apple App Store",
        ],
      },
      {
        title: "Capstone Project & Portfolio Development",
        points: [
          "A full app from concept to deployment",
          "Built under mentor guidance",
          "A professional, ready-to-show portfolio",
          "Prepared for job interviews and freelance pitches",
        ],
      },
    ],
    tools: [
      "Dart",
      "Flutter SDK",
      "Android Studio / VS Code",
      "Firebase",
      "SQLite",
      "Provider, Riverpod & Bloc",
      "Postman",
      "Git & GitHub",
      "Play Console & App Store Connect",
    ],
    outcomes: [
      "Build cross-platform Android and iOS apps from a single Flutter codebase",
      "Manage app state properly with Provider, Riverpod or Bloc, and validate real user input",
      "Wire apps to REST APIs, SQLite and Firebase for authentication and live data",
      "Test, debug and publish a finished app to the Play Store and App Store",
    ],
    roles: [
      "Flutter App Developer",
      "Mobile App Engineer",
      "Cross-Platform Developer",
      "Mobile UI/UX Developer",
      "Freelance App Developer",
    ],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    category: "cyber-cloud",
    duration: "6 Months",
    level: "Beginner → Advanced",
    blurb:
      "Ethical hacking, network security, penetration testing and threat analysis — taught hands-on in Mohali.",
    overview:
      "Techcadd's Cyber Security course in Mohali is designed for students, graduates and job seekers who want practical, industry-relevant skills — not just theory. Based in the heart of Mohali, we offer hands-on training in ethical hacking, network security, penetration testing and threat analysis, guided by experienced mentors who have worked in real-world security roles. Whether you are a 12th-pass student exploring your options or a graduate looking to switch into IT, this cyber security training in Mohali gives you a clear path from fundamentals to job-readiness. With Mohali and the greater Chandigarh tricity region emerging as a growing IT and cybersecurity hub, demand for skilled professionals is rising fast — and Techcadd is positioned right at the centre of that opportunity. Our course blends live labs, real tools, certification support and placement guidance to help you step confidently into roles like SOC Analyst, Penetration Tester or Security Consultant. Learn locally in Mohali. Get certified. Get job-ready.",
    modules: [
      {
        title: "Networking & Systems Fundamentals",
        points: [
          "IP addressing and TCP/IP",
          "DNS, protocols and firewalls",
          "Linux system administration basics",
          "Windows system administration basics",
        ],
      },
      {
        title: "Ethical Hacking & Penetration Testing",
        points: [
          "Reconnaissance and scanning",
          "Gaining access and reporting vulnerabilities",
          "Web application penetration testing",
          "Network and wireless security assessments",
        ],
      },
      {
        title: "Cryptography & Data Protection",
        points: [
          "Encryption algorithms",
          "Hashing and digital signatures",
          "Data secured in transit and at rest",
          "Securing real-world systems and communications",
        ],
      },
      {
        title: "Malware Analysis & Threat Detection",
        points: [
          "Viruses and trojans",
          "Ransomware and spyware",
          "How security teams detect threats",
          "Containing threats before damage spreads",
        ],
      },
      {
        title: "Security Operations & Incident Response",
        points: [
          "How a Security Operations Centre works",
          "Monitoring systems for suspicious activity",
          "Responding to security incidents",
          "Containment and remediation protocols",
        ],
      },
      {
        title: "Web Application & Network Security",
        points: [
          "SQL injection",
          "Cross-site scripting (XSS)",
          "Broken authentication",
          "Defending against breaches and denial-of-service",
        ],
      },
      {
        title: "Compliance, Governance & Risk Management",
        points: [
          "Security frameworks",
          "Compliance requirements",
          "Risk assessment practices",
          "Staying audit-ready and legally compliant",
        ],
      },
    ],
    tools: [
      "Kali Linux",
      "Nmap",
      "Wireshark",
      "Metasploit",
      "Burp Suite",
      "John the Ripper",
      "Nessus / OpenVAS",
      "tcpdump",
      "VirtualBox / VMware",
      "Splunk (SIEM)",
    ],
    outcomes: [
      "Log real practice hours with the same tools working security professionals use daily",
      "Run ethical hacking and penetration testing exercises inside a controlled lab",
      "Detect, analyse and respond to malware, threats and live security incidents",
      "Walk into local and remote interviews with demonstrable, hands-on ability",
    ],
    roles: [
      "SOC Analyst",
      "Junior Penetration Tester",
      "Security Analyst",
      "IT Security Support Specialist",
      "Vulnerability Assessment Associate",
      "Security Consultant",
    ],
  },
  {
    slug: "ethical-hacking",
    title: "Ethical Hacking",
    category: "cyber-cloud",
    duration: "3 Months",
    level: "Beginner → Advanced",
    blurb:
      "Penetration testing, network defence, web and cloud security and digital forensics — on Kali Linux, Metasploit, Wireshark, Burp Suite and Nmap.",
    overview:
      "Want to build a career defending organizations from cyberattacks? Techcadd's Ethical Hacking course in Mohali is designed for 12th pass students, graduates, and job seekers who want practical, industry-ready skills in penetration testing, network security, and vulnerability assessment. Based in Mohali — Punjab's fast-growing IT and cybersecurity hub near Chandigarh — this program blends hands-on labs with real-world attack simulations using industry-standard tools like Kali Linux, Metasploit, Wireshark, Burp Suite, and Nmap. Whether you're completely new to cybersecurity or already working in IT and want to specialize, this course builds your skills step by step — from core security fundamentals to advanced penetration testing and digital forensics. With cyberattacks rising and skilled ethical hackers in short supply across India, students trained in Mohali, Chandigarh, and the wider Tricity region are stepping directly into in-demand roles like Security Analyst, Penetration Tester, and SOC Engineer. Techcadd's Mohali training centre combines mentor-guided practical sessions with placement support, resume building, and interview preparation — helping students move confidently from classroom labs to real cybersecurity careers.",
    modules: [
      {
        title: "Cybersecurity Fundamentals",
        points: [
          "The CIA triad — confidentiality, integrity, availability",
          "Risk management principles",
          "NIST and ISO 27001 frameworks",
          "Why security practices exist, not just how to run them",
        ],
      },
      {
        title: "Networking Fundamentals for Security",
        points: [
          "IP addressing and protocols",
          "How data moves across systems",
          "Applying networking to vulnerability identification",
          "Securing infrastructure end to end",
        ],
      },
      {
        title: "Penetration Testing",
        points: [
          "Thinking like an attacker, legally and ethically",
          "Probing systems, networks and applications",
          "Structured testing methodologies",
          "Discovering vulnerabilities before real attackers do",
        ],
      },
      {
        title: "Network Defense & Security",
        points: [
          "Protecting networks from unauthorized access",
          "Configuring defensive measures",
          "Monitoring traffic for suspicious activity",
          "The defender's side of offensive testing",
        ],
      },
      {
        title: "Web Security",
        points: [
          "Web applications as an attack surface",
          "Identifying web-based vulnerabilities",
          "Mitigating and preventing exploitation",
          "How attackers exploit websites and applications",
        ],
      },
      {
        title: "Cloud Security",
        points: [
          "Cloud security principles",
          "How cloud vulnerabilities differ from on-premise",
          "Defending cloud-hosted infrastructure",
          "Security as infrastructure moves to the cloud",
        ],
      },
      {
        title: "Digital Forensics",
        points: [
          "Investigating security incidents",
          "Tracing attack origins",
          "Gathering and analysing evidence after a breach",
          "Forensics for defensive and law-enforcement-adjacent roles",
        ],
      },
      {
        title: "Cyber Threat Detection & Vulnerability Assessment",
        points: [
          "Identifying and responding to cyber threats",
          "Vulnerability scanning",
          "Spotting weaknesses before they are exploited",
          "Reporting findings to the organisation",
        ],
      },
      {
        title: "Live Simulations & Mentor-Guided Labs",
        points: [
          "Live attack simulations",
          "Hands-on labs under mentor guidance",
          "Replicating real-world breach scenarios",
          "Graduating with demonstrable skills, not just certificates",
        ],
      },
    ],
    tools: ["Kali Linux", "Metasploit", "Wireshark", "Burp Suite", "Nmap"],
    outcomes: [
      "Practise penetration testing on live simulations with the same tools professional security teams use daily",
      "Think like both an attacker and a defender across networks, web applications and cloud environments",
      "Run vulnerability scans and assessments that surface weaknesses before attackers reach them",
      "Investigate a security incident using digital forensics fundamentals",
    ],
    roles: [
      "Security Analyst",
      "Ethical Hacker",
      "Penetration Tester",
      "SOC Engineer",
      "Digital Forensics Specialist",
    ],
  },
  {
    slug: "cloud-computing",
    title: "Cloud Computing",
    category: "cyber-cloud",
    duration: "5 Months",
    level: "Intermediate",
    blurb:
      "Cloud fundamentals, AWS, Microsoft Azure, virtualization and cloud security — taught hands-on in Mohali.",
    overview:
      "Cloud technology now powers almost every modern business — and companies everywhere are racing to hire professionals who understand it. Techcadd's Cloud Computing course in Mohali is built for students, graduates, and job seekers who want practical, industry-relevant skills in one of the highest-paying domains in IT today. Located in the heart of Mohali, Techcadd offers hands-on training in cloud fundamentals, AWS, Microsoft Azure, cloud architecture, virtualization, and DevOps-adjacent tools, guided by trainers with real industry experience. Whether you're a 12th-pass student exploring career options or a graduate looking to break into IT, this Cloud Computing training in Mohali takes you from the basics to job-ready cloud skills, step by step. With Mohali's IT City and the broader Chandigarh tricity region rapidly expanding as a tech and IT services hub, demand for cloud-skilled professionals is growing every quarter — and Techcadd is positioned right where that opportunity is happening. Our course combines live labs, real cloud platforms, certification guidance, and placement support to help you step into roles like Cloud Support Associate, Cloud Administrator, or Junior Cloud Engineer. Learn locally in Mohali. Get cloud-certified. Get job-ready.",
    modules: [
      {
        title: "Cloud Computing Fundamentals",
        points: [
          "Service models — IaaS, PaaS, SaaS",
          "Deployment models — public, private, hybrid",
          "Scalability, elasticity and cost efficiency",
          "Why businesses migrate to the cloud",
        ],
      },
      {
        title: "Networking & Virtualization Basics",
        points: [
          "Essential cloud networking concepts",
          "Virtual machines and hypervisors",
          "Multiple workloads on shared hardware",
          "Building and testing virtualization locally",
        ],
      },
      {
        title: "AWS (Amazon Web Services) Essentials",
        points: [
          "EC2 compute instances",
          "S3 object storage",
          "IAM — identity and access management",
          "VPC networking and RDS databases",
        ],
      },
      {
        title: "Microsoft Azure Fundamentals",
        points: [
          "Azure Virtual Machines",
          "Azure Storage",
          "Azure Active Directory",
          "Azure Resource Manager",
        ],
      },
      {
        title: "Cloud Storage & Database Management",
        points: [
          "Object storage and block storage",
          "Managed database services",
          "Backup and recovery in the cloud",
          "Day-to-day cloud data administration",
        ],
      },
      {
        title: "Cloud Security Fundamentals",
        points: [
          "Identity and access management",
          "Data encryption in transit and at rest",
          "Security groups and network rules",
          "The shared responsibility model",
        ],
      },
      {
        title: "Cloud Deployment & Automation Basics",
        points: [
          "Infrastructure automation concepts",
          "Basic deployment pipelines",
          "Containerization with Docker basics",
          "How modern applications are packaged at scale",
        ],
      },
      {
        title: "Monitoring, Cost Management & Optimization",
        points: [
          "Monitoring cloud resource usage",
          "Reading and managing cloud billing",
          "Cost optimization practices",
          "Reporting used in cloud support roles",
        ],
      },
    ],
    tools: [
      "AWS — EC2, S3, IAM, VPC, RDS",
      "Microsoft Azure — VMs, Storage, Active Directory",
      "Linux",
      "Docker",
      "Cloud monitoring consoles",
      "Postman / API tools",
      "Git & GitHub",
      "VirtualBox / VMware",
    ],
    outcomes: [
      "Log genuine practice hours on the same AWS and Azure consoles working cloud professionals use daily",
      "Deploy, configure and troubleshoot compute, storage and networking on a real cloud platform",
      "Apply core cloud security practice — IAM, encryption and the shared responsibility model",
      "Monitor cloud usage, read a billing console and optimise what an account costs",
    ],
    roles: [
      "Cloud Support Associate",
      "Junior Cloud Engineer",
      "Cloud Administrator",
      "Cloud Operations Analyst",
    ],
  },
  {
    slug: "linux",
    title: "Linux",
    category: "cyber-cloud",
    duration: "2 Months",
    level: "Beginner → Advanced",
    blurb:
      "Command line, file systems, permissions, shell scripting and server administration — the foundation under cloud, DevOps and security.",
    overview:
      "Looking for a career-ready Linux course in Mohali? Techcadd's Linux Training program is designed for 12th pass students, graduates, and job seekers who want to build a strong career in system administration, cloud computing, and DevOps. Based in Mohali — Punjab's fastest-growing IT hub near Chandigarh — Techcadd combines classroom learning with live lab practice, covering Linux installation, file systems, user and permission management, shell scripting, networking fundamentals, and server configuration. Whether you're a complete beginner or an IT professional looking to upskill, this Linux training in Mohali builds your foundation step by step, then moves into real-world, project-based learning so you're ready for enterprise environments. With growing demand for skilled Linux administrators across IT companies in Mohali, Chandigarh, and the wider Tricity region, this course opens doors to roles in system administration, cloud engineering, and DevOps. Techcadd's Mohali training centre pairs hands-on practical sessions with placement support, resume building, and interview preparation — helping students transition confidently from classroom to career.",
    modules: [
      {
        title: "Core Linux Fundamentals",
        points: [
          "Linux installation and setup",
          "Understanding the major distributions",
          "Navigating the command line interface",
          "File system structure, directories and file types",
        ],
      },
      {
        title: "Linux Commands & Command-Line Mastery",
        points: [
          "File management commands",
          "Process management",
          "Text processing and searching",
          "System monitoring commands",
        ],
      },
      {
        title: "User & Permission Management",
        points: [
          "Creating and managing user accounts",
          "Groups and access levels",
          "Ownership and permission models",
          "Troubleshooting permission-related issues",
        ],
      },
      {
        title: "File Systems & Storage Management",
        points: [
          "File system types",
          "Disk partitioning",
          "Mounting and unmounting drives",
          "Storage management on real servers",
        ],
      },
      {
        title: "Shell Scripting & Automation",
        points: [
          "Bash scripting fundamentals",
          "Variables, conditions and loops",
          "Automating repetitive admin tasks",
          "Scripts that carry into DevOps and cloud roles",
        ],
      },
      {
        title: "Package Management",
        points: [
          "Installing software with package managers",
          "Updating and removing packages",
          "Repositories and dependencies",
          "Maintaining systems efficiently",
        ],
      },
      {
        title: "Networking Fundamentals",
        points: [
          "IP addressing",
          "Network configuration on Linux",
          "Troubleshooting connectivity issues",
          "How Linux systems talk to wider infrastructure",
        ],
      },
      {
        title: "Server Configuration & Administration",
        points: [
          "Configuring and managing servers",
          "Setting up services",
          "Managing system logs",
          "How servers are maintained in production",
        ],
      },
      {
        title: "Security Fundamentals",
        points: [
          "Securing user access",
          "Managing permissions correctly",
          "Common vulnerabilities and how to avoid them",
          "A security-conscious mindset from day one",
        ],
      },
      {
        title: "Advance Linux Training",
        points: [
          "Server optimization",
          "Virtualization",
          "Cloud integration",
          "Configuration management tools",
        ],
      },
    ],
    tools: [
      "Bash shell & terminal",
      "Ubuntu / Debian",
      "RHEL / CentOS",
      "apt / yum / dnf package managers",
      "SSH & networking utilities",
      "systemd & system logs",
      "VirtualBox / VMware",
      "AWS / Azure foundations",
    ],
    outcomes: [
      "Install, configure and navigate a Linux system with real fluency at the command line",
      "Manage users, groups, permissions and storage the way a system administrator does daily",
      "Automate repetitive administrative work with Bash shell scripts",
      "Configure, secure and troubleshoot a live Linux server in the lab",
    ],
    roles: [
      "Linux System Administrator",
      "IT Infrastructure Support Engineer",
      "Cloud Support Engineer",
      "Junior DevOps Engineer",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "digital-marketing",
    duration: "4 Months",
    level: "Beginner → Advanced",
    badge: "Trending",
    blurb:
      "SEO, Google Ads, Meta Ads, social, content, email, analytics and AI-powered marketing tools — the full ecosystem, taught hands-on.",
    overview:
      "Looking for the right digital marketing course in Mohali? Techcadd's Digital Marketing Course is designed for students, graduates, and job seekers in Mohali, Chandigarh, and the wider Tricity region who want practical, job-ready digital marketing skills — not just theory. At Techcadd, you'll learn SEO, Google Ads, Meta Ads, social media marketing, content marketing, email marketing, analytics, and the latest AI-powered marketing tools, all through hands-on training and live projects. Whether you're a 12th-pass student exploring career options, a graduate looking to upskill, or a working professional planning a career switch, this course is built to take you from beginner to industry-ready. Our Mohali-based training centre combines expert mentorship, real client-style projects, and placement support to help you build a strong digital marketing portfolio — right here in Mohali, without needing to relocate. Techcadd focuses on practical learning so you graduate with skills employers actually want, not just a certificate.",
    modules: [
      {
        title: "Digital Marketing Foundations",
        points: [
          "How the digital marketing ecosystem fits together",
          "Marketing funnels and audience research",
          "Websites and landing pages in WordPress",
          "Where each channel sits in a real campaign",
        ],
      },
      {
        title: "Search Engine Optimization (SEO)",
        points: [
          "Keyword research",
          "On-page and technical SEO",
          "Link building",
          "Local SEO for Mohali and Tricity businesses",
        ],
      },
      {
        title: "Google Ads",
        points: [
          "Campaign structure and account setup",
          "Search, display and shopping basics",
          "Keyword bidding and budget management",
          "Running a live account, not a demo",
        ],
      },
      {
        title: "Meta Ads",
        points: [
          "Facebook and Instagram campaign setup",
          "Audience targeting and retargeting",
          "Creative testing",
          "Reading and acting on ad performance",
        ],
      },
      {
        title: "Social Media Marketing",
        points: [
          "Building a content calendar",
          "Platform-native content that performs",
          "Community management",
          "Growing a real business page",
        ],
      },
      {
        title: "Content Marketing",
        points: [
          "Writing for search and for people",
          "Blog, landing page and ad copy",
          "Design basics in Canva",
          "Content that supports the funnel",
        ],
      },
      {
        title: "Email Marketing",
        points: [
          "List building and segmentation",
          "Campaigns and automation in Mailchimp",
          "Writing emails people open",
          "Measuring opens, clicks and conversions",
        ],
      },
      {
        title: "Analytics & Reporting",
        points: [
          "Google Analytics",
          "Google Search Console",
          "SEMrush and Ahrefs",
          "Reporting performance credibly to a client or manager",
        ],
      },
      {
        title: "AI-Powered Marketing, AEO & GEO",
        points: [
          "AI tools in a real marketing workflow",
          "Answer Engine Optimization (AEO)",
          "Generative Engine Optimization (GEO)",
          "Staying visible as search itself changes",
        ],
      },
      {
        title: "Live Projects & Portfolio",
        points: [
          "Live and client-style project work",
          "A documented campaign case study",
          "A portfolio you can show in interviews",
          "Career guidance and placement support",
        ],
      },
    ],
    tools: [
      "Google Analytics",
      "Google Search Console",
      "Google Ads",
      "Meta Ads Manager",
      "SEMrush / Ahrefs",
      "Canva",
      "Mailchimp",
      "WordPress",
      "AI marketing tools",
    ],
    outcomes: [
      "Run real Google Ads and Meta Ads campaigns and manage the budget behind them",
      "Rank a live site with on-page, technical and local SEO",
      "Build a content, social and email programme that supports the funnel end to end",
      "Report performance from Analytics and Search Console, and leave with a project portfolio",
    ],
    roles: [
      "Digital Marketing Executive",
      "SEO Executive",
      "Social Media Executive",
      "Google Ads / PPC Specialist",
      "Content Marketing Executive",
      "Digital Marketing Analyst",
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    category: "digital-marketing",
    duration: "6 – 8 Weeks",
    level: "Beginner → Advanced",
    blurb:
      "Instagram, Meta, LinkedIn and YouTube — content strategy, paid campaigns, analytics and the AI tools agencies actually use.",
    overview:
      "Techcadd's Social Media Marketing course in Mohali is built for students, graduates and job seekers who want to turn everyday social platforms into a real career. Based in Phase 8, Sector 62, Mohali — right in the heart of the Tricity's IT corridor near QuarkCity and Bestech Business Tower — Techcadd trains you hands-on in Instagram, Facebook (Meta), LinkedIn, YouTube and emerging platforms like Threads. You will learn content strategy, paid ad campaigns, audience targeting, analytics, influencer marketing and the AI-powered tools brands use today to grow their online presence. This is not theory-heavy classroom learning — it is live projects, real client-style campaigns and portfolio-building work designed to make you job-ready from day one. Whether you are a 12th-pass student exploring digital careers, a graduate from Mohali, Chandigarh or Panchkula planning your next step, or a freelancer wanting to upskill, this social media marketing course in Mohali gives you industry-recognized certification, 100% placement assistance and direct exposure to the Tricity's booming digital marketing job market.",
    modules: [
      {
        title: "Platform Fundamentals & Strategy",
        points: [
          "How Instagram, Meta, LinkedIn and YouTube actually work",
          "Emerging spaces like Threads and Snapchat",
          "Platform-specific strategy and algorithm behaviour",
          "Content calendars aligned to real business goals",
        ],
      },
      {
        title: "Content Creation & Design",
        points: [
          "Graphics and carousels in Canva",
          "Short-form video editing in CapCut",
          "Reels, Stories and YouTube Shorts",
          "AI caption and content tools that keep brand voice",
        ],
      },
      {
        title: "Scheduling & Publishing Tools",
        points: [
          "Buffer",
          "Hootsuite",
          "Later",
          "Planning and cross-posting from a single dashboard",
        ],
      },
      {
        title: "Paid Advertising & Meta Ads",
        points: [
          "Meta Business Suite and Ads Manager",
          "Audience targeting and budget allocation",
          "A/B testing ad creatives",
          "Preparation for Meta Blueprint Certification",
        ],
      },
      {
        title: "Analytics & Performance Tracking",
        points: [
          "Native platform insights",
          "Keyhole and Iconosquare",
          "Engagement and audience growth tracking",
          "Competitor benchmarking",
        ],
      },
      {
        title: "Social Listening & Content Research",
        points: [
          "Brandwatch",
          "Buzzsumo",
          "Tracking trending topics and brand mentions",
          "Understanding what performs in a given niche",
        ],
      },
      {
        title: "AI-Powered Workflow Tools",
        points: [
          "ContentStudio",
          "FeedHive",
          "AI-suggested content ideas and post recycling",
          "Working the way modern agencies and in-house teams do",
        ],
      },
      {
        title: "Community Management & Engagement",
        points: [
          "Managing a unified inbox",
          "Responding to comments and DMs professionally",
          "Building genuine audience engagement",
          "Moving from broadcasting to community building",
        ],
      },
      {
        title: "Influencer Marketing & Client Handling",
        points: [
          "Influencer collaboration basics",
          "Campaign pitching",
          "Client reporting",
          "Portfolio building for freelance and agency work",
        ],
      },
    ],
    tools: [
      "Meta Business Suite",
      "Meta Ads Manager",
      "Canva",
      "CapCut",
      "Buffer / Hootsuite / Later",
      "Keyhole & Iconosquare",
      "Brandwatch & Buzzsumo",
      "ContentStudio & FeedHive",
    ],
    outcomes: [
      "Plan and run platform-specific content calendars across Instagram, Meta, LinkedIn and YouTube",
      "Set up, optimise and report on paid Meta campaigns — targeting, budget, A/B testing and results",
      "Read analytics and social listening data to decide what to change, not just what happened",
      "Leave with a portfolio of real campaigns, analytics reports and client-style project work",
    ],
    roles: [
      "Social Media Executive",
      "Social Media Manager",
      "Paid Social / Meta Ads Specialist",
      "Community Manager",
      "Freelance Social Media Marketer",
    ],
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    category: "digital-marketing",
    duration: "6 Weeks",
    level: "Beginner → Advanced",
    blurb:
      "Campaign creation, keyword research, bidding, extensions and conversion tracking — PPC taught on live budgets.",
    overview:
      "The Google Ads course in Mohali by Techcadd is designed to turn beginners and working professionals into confident, job-ready PPC experts. Mohali's IT hub — spanning Phase 8, Phase 8B and the IT Park sectors — is home to SEO and digital marketing companies actively hiring skilled Google Ads professionals. This Google Ads training in Mohali gives you 100% practical, hands-on exposure to campaign creation, keyword research, bid strategies, ad extensions, conversion tracking and performance optimization — the exact skills local agencies and Tricity businesses across Mohali, Chandigarh and Panchkula look for. At Techcadd, students do not just learn theory — they run live Google Ads campaigns, work on real client-style projects and get certified by industry-experienced trainers. Whether you are a 12th-pass student, a graduate or a working professional in Mohali looking to upskill, this course prepares you for real roles like PPC Executive, Google Ads Specialist and Digital Marketing Manager. Join Techcadd's Google Ads course in Mohali and start your career in performance marketing with placement support and expert mentorship.",
    modules: [
      {
        title: "Introduction to Google Ads",
        points: [
          "How Google Ads actually works",
          "Setting up your first account",
          "Search, Display, Shopping, Video and Performance Max",
          "Why each campaign type exists and when to use it",
        ],
      },
      {
        title: "Keyword Research and Targeting",
        points: [
          "Conducting effective keyword research",
          "Match types — broad, phrase and exact",
          "Negative keywords that stop wasted spend",
          "Hands-on Google Keyword Planner practice",
        ],
      },
      {
        title: "Creating Your First Google Ads Campaign",
        points: [
          "Setting budgets",
          "Manual CPC, Target CPA, Target ROAS and Maximize Conversions",
          "Structuring ad groups for relevance",
          "Building a complete campaign from scratch",
        ],
      },
      {
        title: "Google Ads Extensions",
        points: [
          "Sitelinks and callouts",
          "Structured snippets",
          "Call extensions",
          "Location extensions and their effect on click-through rate",
        ],
      },
      {
        title: "Ad Performance Optimization",
        points: [
          "Ad copywriting that converts",
          "A/B testing strategies",
          "Quality Score — the most misunderstood metric in Google Ads",
          "Refining campaigns for better ROI",
        ],
      },
      {
        title: "Google Ads Reporting and Analytics",
        points: [
          "Reading and interpreting Google Ads reports",
          "Setting up conversion tracking",
          "Turning A/B test insight into decisions",
          "Client-ready reports in Looker Studio",
        ],
      },
    ],
    tools: [
      "Google Ads Platform",
      "Google Keyword Planner",
      "Google Analytics",
      "Google Tag Manager",
      "Google Merchant Center",
      "Looker Studio",
      "Canva",
    ],
    outcomes: [
      "Build, launch and structure a complete Google Ads campaign across Search, Display, Shopping and Performance Max",
      "Research keywords and apply match types and negatives so budget goes to high-intent clicks",
      "Set up conversion tracking with Analytics and Tag Manager, without needing a developer",
      "Optimise on Quality Score, A/B tests and real performance data, and report it in Looker Studio",
    ],
    roles: [
      "Google Ads Specialist",
      "PPC Executive",
      "SEM Specialist",
      "Digital Marketing Manager",
      "E-commerce Advertising Manager",
      "Freelance PPC Consultant",
    ],
  },
  {
    slug: "seo",
    title: "SEO",
    category: "digital-marketing",
    duration: "2 Months",
    level: "Beginner → Advanced",
    blurb:
      "Keyword research, on-page, off-page, technical and local SEO — taught by ranking real websites, not slides.",
    overview:
      "Techcadd's SEO Course in Mohali is a practical, job-oriented program designed for 12th pass students, graduates and working professionals who want to master Google ranking strategies from scratch. Whether you are exploring digital marketing as a fresh career or looking to upskill alongside a Google Ads course in Mohali, this program builds the exact skill set employers across Mohali, Chandigarh and Panchkula are hiring for. At Techcadd, you will learn keyword research, on-page and off-page SEO, technical SEO, local SEO and analytics through 100% hands-on training and live projects — not just theory. Our trainers bring real agency experience, helping you rank actual websites while you learn. With flexible batch timings, affordable fees, certification and placement support, Techcadd has become one of the most trusted names in the Tricity for SEO and digital marketing training. If you are serious about becoming an SEO expert and want training built around Mohali's growing IT and business landscape, this is where your journey starts.",
    modules: [
      {
        title: "Introduction to SEO",
        points: [
          "What SEO actually is, and why businesses need it",
          "How Google discovers, crawls and ranks pages",
          "Organic versus paid visibility",
          "Why SEO is a long-term digital marketing skill",
        ],
      },
      {
        title: "SEO Fundamentals & Keyword Research",
        points: [
          "How search engines evaluate ranking factors",
          "Finding what your audience actually searches for",
          "Building a strategy around real search intent",
          "High-value, low-competition keywords, hands-on",
        ],
      },
      {
        title: "On-Page SEO",
        points: [
          "Title tags, meta descriptions and header structure",
          "URL optimization and internal linking",
          "Image optimization",
          "Optimising real pages for users and search engines alike",
        ],
      },
      {
        title: "Off-Page SEO & Link Building",
        points: [
          "How backlinks, social signals and brand mentions build authority",
          "Guest posting and influencer outreach",
          "Directory listings and citations",
          "A natural backlink profile that stays within guidelines",
        ],
      },
      {
        title: "Technical SEO",
        points: [
          "Site speed and mobile-friendliness",
          "Crawlability and indexing",
          "XML sitemaps and robots.txt",
          "Finding and fixing the errors that hold rankings back",
        ],
      },
      {
        title: "Local SEO & Google Business Profile",
        points: [
          "Optimising a Google Business Profile",
          "Managing local citations",
          "Location-based keyword strategy",
          "Review management and ranking in near-me searches",
        ],
      },
      {
        title: "SEO Tools & Analytics",
        points: [
          "Google Search Console — indexing, performance and errors",
          "Google Analytics (GA4) — traffic, behaviour and conversions",
          "Keyword research and content gap analysis",
          "Rank tracking and SEO audit tools",
        ],
      },
      {
        title: "SEO Reporting & Performance Tracking",
        points: [
          "Conducting a full SEO audit",
          "Building performance reports",
          "Communicating results clearly to clients or managers",
          "What separates a learner from someone who can run a campaign",
        ],
      },
      {
        title: "SEO Maintenance & Algorithm Updates",
        points: [
          "Staying current with Google's algorithm changes",
          "Regular audits and strategy adjustment",
          "AI Overviews, voice search and answer engines",
          "How AI-driven search is reshaping SEO practice",
        ],
      },
    ],
    tools: [
      "Google Search Console",
      "Google Analytics (GA4)",
      "Google Business Profile",
      "Keyword research tools",
      "Rank tracking tools",
      "SEO audit tools",
    ],
    outcomes: [
      "Run keyword research grounded in real search intent, not guesswork",
      "Optimise pages end to end — on-page, technical and off-page — on live websites",
      "Rank a local business in near-me searches through Google Business Profile and local SEO",
      "Audit a site, report performance in Search Console and GA4, and keep a strategy current as algorithms shift",
    ],
    roles: [
      "SEO Executive",
      "SEO Analyst",
      "SEO Content Strategist",
      "Digital Marketing Executive",
      "Freelance SEO Consultant",
    ],
  },
  {
    slug: "autocad",
    title: "AutoCAD",
    category: "cad-design",
    duration: "1 – 3 Months",
    level: "Beginner",
    blurb: "2D drafting and 3D modelling for mechanical, civil and architectural drawings.",
    // Written to the AutoCAD keyword brief. Paragraphs are separated by a
    // blank line and rendered as such by <Overview/>.
    overview:
      "Looking to build a career in CAD design? The AutoCAD course in Mohali by Techcadd is designed for students, diploma holders, engineers, and job seekers who want practical, industry-ready skills in computer-aided drafting and design. Located in the heart of Mohali (near Chandigarh), Techcadd offers a hands-on training program covering both 2D drafting and 3D modelling — from basic commands and drawing tools to advanced mechanical, civil, and architectural design workflows used by real engineering firms.\n\nThis isn't just theory. Every student at Techcadd works on live projects — building plans, mechanical assembly drawings, furniture layouts, and interior design models — to build a portfolio that stands out to employers across Mohali, Chandigarh, and Panchkula (Tricity).\n\nWith experienced trainers, flexible batch timings, ISO-certified training standards, and 100% placement assistance, Techcadd has helped 10,000+ students launch careers in design, drafting, and engineering. Whether you're a 12th-pass student, a fresh graduate, or a working professional looking to upskill, this AutoCAD training in Mohali gives you the practical, job-ready foundation the industry demands.",
    modules: [
      {
        title: "AutoCAD Fundamentals & Interface Mastery",
        blurb:
          "Every student starts here, regardless of prior experience. This foundation ensures that even complete beginners — including 12th-pass students with no prior design exposure — can move forward confidently into more advanced topics.",
        points: [
          "The complete AutoCAD interface — ribbons, toolbars, command line, and workspace customization",
          "File management: creating, saving, and organizing drawing files (.dwg format)",
          "Navigation tools: pan, zoom, and view management for working efficiently on large drawings",
          "Coordinate systems: absolute, relative, and polar coordinates for precise drafting",
          "Units, drawing limits, and setting up a new drawing correctly from scratch",
        ],
      },
      {
        title: "Core 2D Drafting Tools",
        blurb:
          "This is where students build real drafting muscle memory. By the end of this module, students in Mohali are typically able to independently draft basic floor plans, mechanical parts, and technical layouts.",
        points: [
          "Drawing tools: Line, polyline, circle, arc, rectangle, polygon, ellipse",
          "Modify tools: Trim, extend, offset, mirror, array (rectangular, polar, path), fillet, chamfer",
          "Layer management: creating and organizing layers by function, color, and linetype — a critical skill for professional, industry-standard drawings",
          "Dimensioning: linear, angular, radial, and ordinate dimensions, plus dimension styles for consistent, professional output",
          "Text and annotation: multiline text, leaders, tables, and text styles for clear drawing communication",
          "Hatching and gradient fills: used extensively in architectural and civil drawings to represent materials",
        ],
      },
      {
        title: "Blocks, Attributes & Drawing Efficiency",
        blurb:
          "Professional drafting isn't just about drawing — it's about working efficiently.",
        points: [
          "Creating and inserting blocks (reusable drawing components)",
          "Dynamic blocks for flexible, reusable design elements",
          "Block attributes for adding data (like part numbers or specifications) directly into drawings",
          "External references (Xrefs) for managing large, multi-file projects — a skill heavily used in architecture and construction firms across Mohali and Chandigarh",
          "Design Center and tool palettes for speeding up repetitive tasks",
        ],
      },
      {
        title: "Advanced 2D Techniques for Real Projects",
        blurb:
          "Once the basics are solid, students move into applied, project-based work. This is where the \"live project\" approach really pays off — students work on drawings modeled after real assignments they'd encounter working at a firm in Mohali's Industrial Area or a design studio in Chandigarh.",
        points: [
          "Architectural drafting: floor plans, elevations, sections, site plans",
          "Mechanical drafting: orthographic projections, assembly drawings, part detailing",
          "Civil drafting: site layouts, grading plans, utility drawings",
          "Interior design layouts: furniture placement, space planning, material specification",
        ],
      },
      {
        title: "Introduction to 3D Modelling",
        blurb:
          "AutoCAD isn't just a 2D tool anymore — modern design work increasingly requires 3D visualization.",
        points: [
          "3D workspace navigation and view management (isometric, perspective, orbit)",
          "Solid modelling: creating 3D shapes using extrude, revolve, loft, and sweep commands",
          "Boolean operations: union, subtract, and intersect for building complex 3D forms",
          "Surface modelling basics for more organic or complex shapes",
          "Converting 2D drawings into 3D models — a highly practical, employer-valued skill",
        ],
      },
      {
        title: "3D Rendering & Visualization Basics",
        blurb:
          "For students interested in architecture or interior design careers, this module adds real value.",
        points: [
          "Applying materials and textures to 3D models",
          "Basic lighting setup for realistic visualization",
          "Camera views and rendering settings for producing presentation-quality outputs",
          "Exporting 3D models for use in presentations or further work in tools like 3ds Max",
        ],
      },
      {
        title: "Plotting, Printing & Sheet Layouts",
        blurb: "A drawing is only useful if it can be shared and printed correctly.",
        points: [
          "Model space vs. paper space — a concept many self-taught users struggle with",
          "Creating layouts and viewports for multi-scale printing",
          "Setting up title blocks and drawing templates for professional, standardized output",
          "Plot styles and printing settings for consistent, industry-standard drawing sheets",
        ],
      },
      {
        title: "Industry Standards & Professional Practices",
        blurb:
          "Beyond the software itself, Techcadd teaches students how drawings are actually used in professional settings.",
        points: [
          "Drawing standards and conventions used by engineering and architecture firms",
          "File naming, version control, and drawing organization for team projects",
          "Collaboration basics — working with drawings shared by architects, engineers, or clients",
          "Portfolio building — compiling your best project work into a presentable format for job interviews",
        ],
      },
    ],
    tools: [
      "AutoCAD (latest version)",
      "AutoCAD 3D",
      "DWG file format",
      "Plotting & PDF export",
      "Design Center",
    ],
    outcomes: ["Produce accurate, standards-compliant drawings", "Model parts in 3D", "Plot professional drawing sets"],
    roles: [
      "CAD Drafter",
      "Junior Design Engineer",
      "Architectural Assistant",
      "Interior Design Assistant",
      "Freelance CAD Designer",
    ],
  },
  {
    slug: "solidworks",
    title: "SolidWorks",
    category: "cad-design",
    duration: "2 Months",
    level: "Beginner → Advanced",
    blurb: "Parametric part modelling, assemblies, drawings and simulation.",
    overview:
      "Mechanical design in SolidWorks — from sketch-based features to large assemblies, motion studies and manufacturing drawings.",
    modules: [
      { title: "Part Design", points: ["Sketching & relations", "Features", "Patterns", "Configurations"] },
      { title: "Assemblies", points: ["Mates", "Sub-assemblies", "Interference detection", "Exploded views"] },
      { title: "Drawings", points: ["Views & sections", "GD&T", "BOM", "Detailing standards"] },
      { title: "Analysis", points: ["Motion study", "SimulationXpress", "Sheet metal", "Weldments"] },
    ],
    tools: ["SolidWorks", "eDrawings", "SimulationXpress"],
    outcomes: ["Model complex parametric parts", "Manage multi-part assemblies", "Produce manufacturing-ready drawings"],
    roles: ["Mechanical Design Engineer", "Product Designer", "CAD Engineer"],
  },
  {
    slug: "cpp-dsa",
    title: "C, C++ & Data Structures",
    category: "programming",
    duration: "1 – 2 Months",
    level: "Beginner → Advanced",
    blurb:
      "Syntax to pointers, OOP, dynamic memory, file handling and the STL — the foundation every other language builds on.",
    overview:
      "Techcadd's C/C++ training program is designed for students, engineering aspirants and job seekers across Mohali, Zirakpur and the greater Chandigarh tricity region who want to master programming from the ground up. This course takes you from basic syntax to advanced concepts like object-oriented programming, data structures, dynamic memory management, pointers and file handling — all through hands-on, practical learning. Our C/C++ classes in Mohali are led by experienced trainers who focus on real-world coding practice, not just theory. Whether you are a 12th-pass student exploring your first programming language, a BCA/B.Tech/MCA student strengthening your core concepts, or a working professional preparing for technical interviews, this program is structured to make you job-ready. With flexible batch timings, small class sizes and a curriculum aligned with current industry standards, Techcadd is quickly becoming a trusted name for programming training in Mohali.",
    modules: [
      {
        title: "Introduction to C/C++",
        points: [
          "Overview of C and C++, and how they differ",
          "Why C++ powers system-level and high-performance software",
          "Setting up Code::Blocks, Dev C++ and Visual Studio",
          "Writing and running your first programs",
        ],
      },
      {
        title: "C/C++ Basics",
        points: [
          "Variables and data types — int, char, float, double, bool",
          "Arithmetic, relational and logical operators",
          "if-else statements",
          "switch-case control flow",
        ],
      },
      {
        title: "Loops in C/C++",
        points: [
          "for and while loops",
          "do-while loops",
          "Nested loops",
          "Range-based for loops",
        ],
      },
      {
        title: "Functions",
        points: [
          "Defining and calling functions",
          "Parameters and return types",
          "Function overloading and inline functions",
          "Function scope and modular, reusable code",
        ],
      },
      {
        title: "Arrays and Vectors",
        points: [
          "One-dimensional arrays",
          "Multi-dimensional arrays",
          "Array initialization and manipulation",
          "Vectors and vector operations",
        ],
      },
      {
        title: "Strings in C++",
        points: [
          "String basics",
          "Built-in functions — length, copy, concatenate, compare",
          "String manipulation techniques",
          "The C++ String class",
        ],
      },
      {
        title: "Object-Oriented Programming (OOP)",
        points: [
          "Classes and objects",
          "Constructors and destructors",
          "Inheritance, polymorphism and encapsulation",
          "Operator overloading",
        ],
      },
      {
        title: "Pointers & Dynamic Memory Management",
        points: [
          "How pointers work",
          "Allocating memory dynamically",
          "Managing and freeing memory",
          "Precise control over system resources",
        ],
      },
      {
        title: "File Handling",
        points: [
          "Reading from files",
          "Writing to files",
          "File streams in C++",
          "Programs that work with real-world data",
        ],
      },
      {
        title: "STL, Templates & Exception Handling",
        points: [
          "The Standard Template Library",
          "Built-in data structures and algorithms",
          "Function and class templates",
          "Exception handling for robust programs",
        ],
      },
    ],
    tools: [
      "Code::Blocks",
      "Dev C++",
      "Visual Studio",
      "GCC / G++ compiler",
      "STL (Standard Template Library)",
      "Debugging tools",
    ],
    outcomes: [
      "Write, compile, debug and run real C and C++ programs in industry-standard IDEs",
      "Apply OOP properly — classes, inheritance, polymorphism, encapsulation and operator overloading",
      "Handle pointers and dynamic memory with the precision C++ demands",
      "Use the STL, templates and exception handling to write reusable, error-resistant code",
    ],
    roles: [
      "Software Developer",
      "System Programmer",
      "Embedded Systems Engineer",
      "Application Engineer",
      "Game Developer",
    ],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
/**
 * The six courses the home page leads with.
 *
 * Exported as slugs as well as records, because the home page now resolves
 * them against the CMS-merged catalogue rather than this array — the selection
 * is a layout decision (six cards, each with its own watermark) while the copy
 * inside them is the CMS's.
 */
export const featuredSlugs = [
  "artificial-intelligence",
  "mern-full-stack",
  "data-science",
  "digital-marketing",
  "cyber-security",
  "cloud-computing",
] as const;

export const featuredCourses = () =>
  courses.filter((c) => (featuredSlugs as readonly string[]).includes(c.slug));

export const trainingPrograms = [
  {
    duration: "45 Days",
    title: "Summer & Winter Industrial Training",
    blurb: "A fast, focused sprint on one technology with a working project and a certificate.",
    points: ["One core technology", "Guided mini project", "Training certificate", "Weekday or weekend batches"],
  },
  {
    duration: "6 Weeks",
    title: "University-Mandated Training",
    blurb: "Meets AICTE / university requirements with documentation your college accepts.",
    points: ["Syllabus-aligned modules", "Project report & viva prep", "Attendance records", "Verified certificate"],
  },
  {
    duration: "6 Months",
    title: "Industrial Training with Internship",
    blurb: "Full technology stack plus a live client-style project and placement drives.",
    points: ["Complete stack coverage", "Live project experience", "Internship letter", "Placement assistance"],
  },
  {
    duration: "9 Months",
    title: "Expert Track",
    blurb: "Our deepest programme — client-level projects, advanced modules and dedicated mentoring.",
    points: ["Two specialisations", "Client-level projects", "Dedicated mentor", "Priority placement support"],
  },
];

export const technologies = [
  "Python", "React", "Next.js", "Node.js", "MongoDB", "TensorFlow", "PyTorch", "AWS", "Docker",
  "Kubernetes", "Java", "Spring Boot", "MySQL", "PostgreSQL", "Power BI", "Tableau", "Figma",
  "Tailwind CSS", "Git", "Linux", "Kali", "Wireshark", "Burp Suite", "Google Ads", "GA4",
  "WordPress", "Shopify", "AutoCAD", "SolidWorks", "Revit", "3ds Max", "LangChain", "Hugging Face",
  "FastAPI", "Express", "TypeScript", "C++", "Terraform", "Jenkins", "Excel",
];

/**
 * The stack, grouped the way a student picks it: by what the tool is for. The
 * home-page board treats these as filters, not as fixed positions — the rings
 * are only a layout shell that whatever is on screen gets spread across.
 *
 * `mark` names a brand icon in `TechMark`. Anything without one carries
 * `short` + `color` instead and is drawn as a wordmark in the brand's colour;
 * a space in `short` is where the label is allowed to wrap.
 */
export type TechItem = {
  name: string;
  mark?: string;
  short?: string;
  color?: string;
};

export const techCategories: {
  key: string;
  label: string;
  dot: string;
  items: TechItem[];
}[] = [
  {
    key: "programming",
    label: "Programming",
    dot: "bg-accent-glow",
    items: [
      { name: "Python", mark: "python" },
      { name: "Java", mark: "java" },
      { name: "JavaScript", mark: "javascript" },
      { name: "TypeScript", mark: "typescript" },
      { name: "C++", mark: "cplusplus" },
      { name: "C", short: "C", color: "#5c6bc0" },
      { name: "C#", short: "C#", color: "#68217a" },
      { name: "PHP", short: "PHP", color: "#777bb4" },
    ],
  },
  {
    key: "frameworks",
    label: "Frameworks",
    dot: "bg-hero-glow",
    items: [
      { name: "React", mark: "react" },
      { name: "Next.js", mark: "nextjs" },
      { name: "Node.js", mark: "node" },
      { name: "Angular", mark: "angular" },
      { name: "Vue.js", mark: "vue" },
      { name: "Express", short: "express", color: "#111827" },
      { name: "Django", short: "Djan go", color: "#092e20" },
      { name: "Spring Boot", mark: "spring" },
      { name: "Laravel", short: "Lara vel", color: "#ff2d20" },
      { name: "Tailwind CSS", mark: "tailwind" },
    ],
  },
  {
    key: "ai-ml",
    label: "AI & ML",
    dot: "bg-up-soft",
    items: [
      { name: "TensorFlow", mark: "tensorflow" },
      { name: "PyTorch", mark: "pytorch" },
      { name: "scikit-learn", short: "scikit", color: "#f7931e" },
      { name: "pandas", mark: "pandas" },
      { name: "NumPy", mark: "numpy" },
      { name: "Keras", mark: "keras" },
      { name: "OpenCV", mark: "opencv" },
      { name: "LangChain", short: "Lang Chain", color: "#1c3c3c" },
      { name: "Hugging Face", short: "Hugging Face", color: "#d98200" },
      { name: "Jupyter", mark: "jupyter" },
    ],
  },
  {
    key: "cad-cam",
    label: "CAD / CAM",
    dot: "bg-accent-yellow",
    items: [
      { name: "AutoCAD", short: "Auto CAD", color: "#e51050" },
      { name: "SolidWorks", short: "Solid Works", color: "#d3232f" },
      { name: "Revit", short: "Revit", color: "#0696d7" },
      { name: "3ds Max", short: "3ds Max", color: "#1c8fc4" },
      { name: "CATIA", short: "CATIA", color: "#005386" },
      { name: "Creo", short: "Creo", color: "#2b9c8f" },
      { name: "Fusion 360", short: "Fusion 360", color: "#e07a00" },
      { name: "ANSYS", short: "ANSYS", color: "#c08a00" },
      { name: "STAAD Pro", short: "STAAD Pro", color: "#003087" },
    ],
  },
  {
    key: "databases",
    label: "Databases",
    dot: "bg-accent-400",
    items: [
      { name: "MySQL", short: "MySQL", color: "#00758f" },
      { name: "PostgreSQL", short: "Postgres", color: "#336791" },
      { name: "MongoDB", mark: "mongodb" },
      { name: "Redis", mark: "redis" },
      { name: "SQLite", mark: "sqlite" },
      { name: "Oracle", short: "Oracle", color: "#c74634" },
      { name: "Firebase", mark: "firebase" },
      { name: "SQL Server", short: "SQL Server", color: "#cc2927" },
    ],
  },
  {
    key: "devops",
    label: "DevOps",
    dot: "bg-brand-400",
    items: [
      { name: "Docker", mark: "docker" },
      { name: "Kubernetes", mark: "kubernetes" },
      { name: "Git", mark: "git" },
      { name: "GitHub", mark: "github" },
      { name: "Jenkins", short: "Jenkins", color: "#d33833" },
      { name: "Terraform", mark: "terraform" },
      { name: "Ansible", short: "Ansi ble", color: "#111827" },
      { name: "Linux", mark: "linux" },
      { name: "Nginx", mark: "nginx" },
    ],
  },
  {
    key: "cloud",
    label: "Cloud",
    dot: "bg-up-gold",
    items: [
      { name: "AWS", mark: "aws" },
      { name: "Microsoft Azure", mark: "azure" },
      { name: "Google Cloud", mark: "googlecloud" },
      { name: "Vercel", mark: "vercel" },
      { name: "Netlify", mark: "netlify" },
      { name: "Cloudflare", mark: "cloudflare" },
      { name: "DigitalOcean", mark: "digitalocean" },
    ],
  },
];

/** Decorative rings the board lays its nodes out on, innermost first. */
export const orbitRings = [
  { key: "r1", stroke: "#00d4ff" },
  { key: "r2", stroke: "#2f7dff" },
  { key: "r3", stroke: "#a9c4ff" },
  { key: "r4", stroke: "#ffd23f" },
];

export const faqs = [
  {
    q: "Do I need a technical background to join?",
    a: "No. Most of our beginner tracks — Python, Web Designing, Data Analytics, Digital Marketing — assume nothing. Your counsellor will place you in the right batch after a short conversation about your goals and current level.",
  },
  {
    q: "What does placement assistance actually include?",
    a: "Resume and LinkedIn rebuilds, mock technical and HR interviews, DSA and aptitude practice, and introductions to our hiring-partner network. Drives run continuously through the year, and support continues after your course ends until you are placed.",
  },
  {
    q: "Are classes online or at the Mohali centre?",
    a: "Both. You can attend at our Sector 75 campus in Mohali, join the same batch live online, or mix the two. Every session is recorded and stays available in your student portal.",
  },
  {
    q: "Can I do this alongside college or a job?",
    a: "Yes. We run early-morning, evening and weekend batches specifically for working professionals and students with college schedules. Batch timing is fixed when you enrol.",
  },
  {
    q: "Will I get a certificate that employers recognise?",
    a: "You receive an ISO-certified training certificate along with a project completion letter and, on the 6-month and 9-month tracks, an internship letter documenting your live project work.",
  },
  {
    q: "Is there an EMI or instalment option?",
    a: "Yes. Fees can be split across instalments over the duration of the course, and we have no-cost EMI options with partner providers. Talk to the admissions desk for the current plans.",
  },
];

export const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Full Stack Developer",
    company: "Placed at an IT firm in Mohali",
    quote:
      "I joined the 6-month MERN track straight after B.Tech with almost no practical experience. The live project work is what changed things — I had real code to talk about in interviews instead of just a syllabus.",
  },
  {
    name: "Simran Kaur",
    role: "Data Analyst",
    company: "Placed in Chandigarh IT Park",
    quote:
      "The trainers actually work in the field, so every session had context from real projects. The Power BI and SQL modules were exactly what my interview rounds tested.",
  },
  {
    name: "Arjun Mehta",
    role: "AI Engineer",
    company: "Product startup, Bengaluru",
    quote:
      "The Generative AI course was current in a way online tutorials are not. Building a full RAG pipeline and deploying it gave me something genuinely impressive for my portfolio.",
  },
  {
    name: "Neha Gupta",
    role: "Digital Marketing Executive",
    company: "Agency, Mohali",
    quote:
      "Running real ad budgets during the course was the difference. I walked into my first job already knowing how to read a campaign report and fix what was underperforming.",
  },
  {
    name: "Karan Singh",
    role: "Security Analyst",
    company: "Placed via campus drive",
    quote:
      "The cyber security lab setup let me break things safely and learn how attacks really work. Placement cell arranged three interviews within a month of finishing.",
  },
  {
    name: "Priya Verma",
    role: "Mechanical Design Engineer",
    company: "Manufacturing firm, Punjab",
    quote:
      "AutoCAD and SolidWorks were taught with actual production drawings, not textbook exercises. My employer noticed that my drawing sets followed proper standards from day one.",
  },
];

export const whyUs = [
  {
    title: "Trainers who still build",
    body: "Every instructor is a practising engineer or marketer. You learn current tooling and the judgement calls that come with it — not a syllabus written five years ago.",
    stat: "15+ yrs",
    statLabel: "average centre experience",
  },
  {
    title: "Live projects, not exercises",
    body: "From week three you work on project code with requirements, reviews and deadlines. That is what fills a portfolio and what interviewers ask about.",
    stat: "4+",
    statLabel: "portfolio projects per track",
  },
  {
    title: "Placement machinery that runs",
    body: "A dedicated cell handles resumes, mock interviews and a hiring-partner network across Mohali, Chandigarh and beyond. Support continues until you are placed.",
    stat: "450+",
    statLabel: "hiring partners",
  },
  {
    title: "Batches built around your life",
    body: "Morning, evening, weekend and online batches, all recorded. Students, working professionals and career-changers train in the same programme on their own schedule.",
    stat: "98%",
    statLabel: "course completion rate",
  },
];

export const process: {
  step: string;
  title: string;
  body: string;
  icon: string;
  when: string;
}[] = [
  {
    step: "01",
    title: "Free counselling",
    icon: "users",
    when: "Day 0",
    body: "Tell us your background and where you want to be. We map that to a specific track, batch and timeline — no generic brochure.",
  },
  {
    step: "02",
    icon: "code",
    when: "Weeks 1-8",
    title: "Learn by building",
    body: "Concepts in the morning, code in the afternoon. Each module ends in something that runs, gets reviewed and goes into your portfolio.",
  },
  {
    step: "03",
    icon: "rocket",
    when: "Weeks 9-12",
    title: "Live project & internship",
    body: "Join a project team with real requirements and deadlines, mentored by a working engineer, and earn an internship letter.",
  },
  {
    step: "04",
    icon: "briefcase",
    when: "Week 12+",
    title: "Interview & placement",
    body: "Resume rebuild, mock interviews, aptitude practice, then introductions to hiring partners and continuous placement drives.",
  },
];
