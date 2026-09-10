import type { Course } from "@/lib/courses";
import type { CourseReview, LearnDetail, SectionCopy } from "@/lib/coursePage";

/**
 * The AI menu's ChatGPT & AI Tools page, at `/courses/ai/chatgpt-ai-tools`.
 *
 * This is one of the two courses whose record does not come from the catalogue
 * in `@/lib/courses`. It belongs to the AI menu alone — the Courses,
 * Certificate Programs and After 12th routes never serve this slug — so the
 * copy below appears on exactly one page.
 *
 * Everything here is the supplied copy, reproduced as written — including the
 * AI-Powered Marketing sections the brief carries for the "why choose", "what
 * you will learn", tools, reviews and FAQ parts of the page. That mix is the
 * source's own; nothing has been reconciled or rewritten. Where a section of
 * the detail page had no copy in that brief — the outcomes, the eligibility
 * checklist, the demand line and the comparison — it is composed from the same
 * brief rather than invented, so the page never states anything the copy does
 * not.
 *
 * One thing to act on before this page carries weight: the brief's own
 * "Important Note for Website Use" says the ten reviews below are sample
 * formats rather than verified testimonials, and should each be replaced with
 * feedback from a real Techcadd student before they stand as reviews.
 *
 * Types are imported with `import type` on purpose: `@/lib/coursePage` reads
 * the values below, so a value import here would close a runtime cycle.
 */

/* -------------------------------------------------------------------------- *
 *                              The course record                              *
 * -------------------------------------------------------------------------- */

export const chatgptAiToolsCourse: Course = {
  slug: "chatgpt-ai-tools",
  title: "ChatGPT & AI Tools",
  category: "ai-data",
  duration: "3 – 6 Months",
  level: "Beginner → Advanced",
  badge: "New",
  blurb:
    "From curious beginner to confident, job-ready AI user — ChatGPT and leading AI tools for content, research, presentations, data, marketing and workplace automation. No coding background required.",
  overview:
    "Looking to future-proof your career in the age of AI? The ChatGPT & AI Tools course in Mohali by Techcadd is designed to take you from a curious beginner to a confident, job-ready AI user — no coding background required. Whether you're a student, fresher, or working professional in Mohali, Chandigarh, or the wider Tricity region, this hands-on program teaches you how to use ChatGPT and leading AI tools like Midjourney, Canva AI, and Gemini for real-world tasks — content writing, resume building, presentations, data analysis, digital marketing, and workplace automation.\n\nAt Techcadd's Mohali centre, you'll learn through live projects, practical prompt engineering exercises, and expert-led sessions focused on productivity and career outcomes — not just theory. By the end of this AI tools training in Mohali, you'll walk away with a portfolio of real AI-powered work, a course completion certificate, and the confidence to apply AI skills across any career path.",

  /* The eight areas of "What You Will Learn", in the order the brief gives
     them. The prose behind each is in `chatgptAiToolsLearn` below rather than
     repeated here. */
  modules: [
    {
      title: "AI for Keyword & Market Research",
      blurb: "You will begin by understanding how AI can support marketing research.",
      points: [
        "Using AI to explore keywords",
        "Understanding markets and identifying audience interests",
        "Generating research directions and organising information faster",
        "Applying human judgement to verify information and select commercially relevant insights",
      ],
    },
    {
      title: "Content Production at Scale",
      blurb:
        "Content is a major part of digital marketing, and AI can significantly speed up the ideation and production process.",
      points: [
        "Content planning and topic ideation",
        "Content briefs",
        "Copywriting and editing",
        "Producing different content variations",
        "Strategy, originality, accuracy and quality stay the marketer's responsibility",
      ],
    },
    {
      title: "AI-Powered Ad Copy & Creative Generation",
      blurb: "The programme also introduces AI-assisted advertising workflows.",
      points: [
        "Advertising angles, headlines and descriptions",
        "Campaign concepts and creative ideas",
        "Connecting those ideas to Meta Ads and Google Ads execution",
      ],
    },
    {
      title: "Audience Analysis & Segmentation",
      blurb:
        "Good marketing is not about reaching everyone. It is about reaching the right audience with the right message.",
      points: [
        "Audience research and customer profiling",
        "Segmentation",
        "Identifying patterns in marketing data",
      ],
    },
    {
      title: "Automated Reporting & Insights",
      blurb:
        "Marketing generates large amounts of data. Knowing how to interpret that data is an important part of becoming a complete marketer.",
      points: [
        "AI-supported reporting and insight generation",
        "Looker Studio for automated reporting and dashboards",
        "Asking better questions of the numbers than “what happened?”",
      ],
    },
    {
      title: "Personalisation & Email Automation",
      blurb:
        "How AI and automation can support personalised marketing communication.",
      points: [
        "Personalisation workflows",
        "Email automation with Zapier in the supporting toolchain",
        "Connecting marketing actions so repetitive processes need less manual effort",
      ],
    },
    {
      title: "Measuring What AI Actually Improved",
      blurb:
        "Producing more content or launching campaigns faster does not automatically mean better marketing.",
      points: [
        "Efficiency and engagement",
        "Campaign performance and reporting quality",
        "Conversion-related improvements",
        "Use AI because it creates measurable value — not simply because it is available",
      ],
    },
    {
      title: "Live Project & Portfolio Development",
      blurb: "The learning does not stop with individual exercises.",
      points: [
        "AI-Powered Marketing Fundamentals Build",
        "Real-World Data Challenge",
        "Live Client Brief",
        "Portfolio Capstone",
        "Understand → Research → Build → Test → Improve → Present",
      ],
    },
  ],

  tools: [
    "ChatGPT",
    "Claude",
    "Canva",
    "Midjourney",
    "Gemini",
    "Meta Ads",
    "Google Ads",
    "Looker Studio",
    "Zapier",
  ],

  outcomes: [
    "A portfolio of real AI-powered work",
    "A course completion certificate",
    "An internship letter and internship-related support",
    "CV preparation and interview practice",
    "A fundamentals build, real-world data challenge, live client brief and portfolio capstone",
  ],

  /* The roles the brief names when it answers "what career options are
     available after learning AI-Powered Marketing?" */
  roles: [
    "Digital Marketing Executive",
    "AI Content Strategist",
    "Performance Marketing Executive",
    "Growth Marketing Executive",
    "Social Media Marketing Executive",
    "Marketing Automation Executive",
  ],
};

/* -------------------------------------------------------------------------- *
 *                                    SEO                                      *
 * -------------------------------------------------------------------------- */

export const chatgptAiToolsSeo = {
  title: "ChatGPT & AI Tools Course in Mohali | AI Training – Techcadd",
  description:
    "Techcadd's ChatGPT & AI Tools course in Mohali — hands-on training with ChatGPT, Midjourney, Canva AI and Gemini, live projects, a portfolio and a completion certificate. No coding background required.",
};

/* -------------------------------------------------------------------------- *
 *                             Section headings                                *
 * -------------------------------------------------------------------------- */

export const chatgptAiToolsSectionCopy: Partial<
  Record<"learn" | "why" | "who" | "tools" | "enquire", SectionCopy>
> = {
  learn: {
    title: "What You Will Learn in the AI-Powered Marketing Course in Mohali",
  },
  why: {
    title: "Why This Program",
    intro:
      "Choosing the right institute matters when you are investing time and money in a career-focused course. For students searching for an AI-Powered Marketing course in Mohali, the important question is not simply which institute has AI tools listed in its syllabus. The better question is: Will you actually learn how to use those tools to create, execute, measure, and improve marketing work?",
    note: "If you're in Mohali and want a practical, locally relevant, career-focused way to become genuinely competent with ChatGPT and AI tools — this is that program.",
  },
  who: {
    title: "Who Can Do This Course",
    intro:
      "The ChatGPT & AI Tools course in Mohali at Techcadd is built for one simple reason: everyone today needs to know how to work with AI, not be replaced by it. That's why this program is intentionally designed to welcome a wide range of learners — from complete beginners to working professionals — with zero coding prerequisites. If you can use a smartphone or a browser, you can start this course.",
    note: "In short: if you live or study in Mohali and want a practical, career-relevant AI skill without needing to learn to code, this course is built for you.",
  },
  tools: {
    title: "Tools You Will Learn",
    intro:
      "A major advantage of the programme is that students work with multiple tools across different stages of the marketing process.",
    note: "Techcadd states that students work hands-on with ChatGPT, Claude, Canva, Meta Ads, Google Ads, Looker Studio, and Zapier as part of the AI-Powered Marketing learning environment.",
  },
  enquire: {
    title: "Ready to Build Your AI-Powered Marketing Skills?",
    intro:
      "Turn your interest in Artificial Intelligence and marketing into practical, career-focused skills with Techcadd. Learn how AI can be used for content, advertising, audience research, analytics, automation, and modern marketing workflows. Whether you are a 12th-pass student, graduate, fresher, job seeker, freelancer, or aspiring marketer, this programme can help you develop skills that you can apply to real marketing projects.",
    facts: [
      { label: "Duration", value: "3 – 6 months, depending on the selected learning format" },
      { label: "Modes", value: "Classroom, weekend and 1-on-1 learning options" },
      { label: "Entry", value: "From 12th grade onward — no programming background required" },
      {
        label: "Tools",
        value: "ChatGPT, Claude, Canva, Meta Ads, Google Ads, Looker Studio and Zapier",
      },
      {
        label: "On completion",
        value: "A portfolio, certification, internship letter, CV preparation and interview practice",
      },
    ],
  },
};

/* -------------------------------------------------------------------------- *
 *                          What you will learn                                *
 * -------------------------------------------------------------------------- */

export const chatgptAiToolsLearn: LearnDetail = {
  intro:
    "The AI-Powered Marketing course in Mohali is designed around one practical idea: learn how Artificial Intelligence can become part of your everyday marketing workflow. Instead of treating AI as a collection of separate tools, the curriculum takes students through the complete process of researching, creating, targeting, measuring, automating, and improving marketing campaigns.",
  count: { value: "8", label: "areas, research to portfolio" },
  topics: [
    {
      title: "1. AI for Keyword & Market Research",
      body: [
        "You will begin by understanding how AI can support marketing research. This includes using AI to explore keywords, understand markets, identify audience interests, generate research directions, and organise information faster.",
        "Students learn to use AI as a research assistant while still applying human judgement to verify information and select commercially relevant insights.",
      ],
    },
    {
      title: "2. Content Production at Scale",
      body: [
        "Content is a major part of digital marketing, and AI can significantly speed up the ideation and production process.",
        "You will learn how to use AI for content planning, topic ideation, content briefs, copywriting, editing, and producing different content variations. The focus is on creating useful and audience-focused content rather than publishing generic AI-generated text.",
        "This helps students understand an important professional skill: AI can increase output, but the marketer remains responsible for strategy, originality, accuracy, and quality.",
      ],
    },
    {
      title: "3. AI-Powered Ad Copy & Creative Generation",
      body: [
        "The programme also introduces AI-assisted advertising workflows. You will learn how AI can help develop advertising angles, headlines, descriptions, campaign concepts, and creative ideas.",
        "The curriculum connects this learning with practical advertising platforms such as Meta Ads and Google Ads, allowing students to understand how AI-generated ideas can fit into real campaign execution.",
      ],
    },
    {
      title: "4. Audience Analysis & Segmentation",
      body: [
        "Good marketing is not about reaching everyone. It is about reaching the right audience with the right message.",
        "You will learn how AI can assist with audience research, customer profiling, segmentation, and identifying patterns in marketing data. These skills can help marketers create more relevant campaigns instead of relying on one generic message for every customer.",
        "For students searching for an AI marketing course in Mohali, this is particularly valuable because audience understanding is applicable across local businesses, agencies, e-commerce, education, real estate, hospitality, and other industries.",
      ],
    },
    {
      title: "5. Automated Reporting & Insights",
      body: [
        "Marketing generates large amounts of data. Knowing how to interpret that data is an important part of becoming a complete marketer.",
        "Students learn how AI can support reporting and insight generation while working with Looker Studio for automated reporting and dashboards.",
        "You learn to move beyond simply collecting numbers and start asking better questions:",
      ],
      points: [
        "What is performing well?",
        "Which audience is responding?",
        "Which campaign needs improvement?",
        "What changed after an optimisation?",
        "Did AI actually improve the marketing result?",
      ],
    },
    {
      title: "6. Personalisation & Email Automation",
      body: [
        "The course also covers how AI and automation can support personalised marketing communication.",
        "You will explore workflows involving personalisation and email automation, with Zapier used as part of the supporting automation toolchain.",
        "Students can understand how marketing actions can be connected so that repetitive processes require less manual effort. This introduces learners to the wider concept of marketing automation and scalable customer communication.",
      ],
    },
    {
      title: "7. Measuring What AI Actually Improved",
      body: [
        "An important part of the curriculum is learning to evaluate whether AI has genuinely improved marketing performance.",
        "Producing more content or launching campaigns faster does not automatically mean better marketing. You will learn to think about outcomes such as efficiency, engagement, campaign performance, reporting quality, and conversion-related improvements.",
        "This develops a valuable mindset for future digital marketers: use AI because it creates measurable value — not simply because it is available.",
      ],
    },
    {
      title: "8. Live Project & Portfolio Development",
      body: [
        "The learning does not stop with individual exercises. The programme includes a live client project and portfolio-focused capstone work.",
        "Techcadd's existing curriculum describes practical projects including an AI-Powered Marketing Fundamentals Build, Real-World Data Challenge, Live Client Brief, and Portfolio Capstone.",
        "Students therefore get the opportunity to move through a professional-style workflow: Understand → Research → Build → Test → Improve → Present. This can help a fresher develop something more useful than course notes: work that can be discussed and demonstrated during an interview.",
      ],
    },
  ],
  outro: [
    "The Overall Learning Outcome — by the end of the AI-Powered Marketing course in Mohali, the objective is not simply to know several AI tool names. You should understand how those tools fit into a complete marketing process: Research with AI → Create with AI → Target audiences → Run campaigns → Analyse data → Automate workflows → Measure results → Present your work.",
    "That combination of AI + digital marketing + advertising + analytics + automation + practical projects can give students a stronger foundation for exploring careers in digital marketing, performance marketing, content strategy, growth marketing, social media marketing, and AI-assisted marketing.",
    "For students, graduates, and job seekers in Mohali and the wider Chandigarh Tricity region, the key takeaway is simple: learn AI as a marketer, practise it on real marketing tasks, and build work that demonstrates what you can actually do.",
  ],
};

/* -------------------------------------------------------------------------- *
 *                               Why choose                                    *
 * -------------------------------------------------------------------------- */

/**
 * The brief answers this twice — six reasons for the programme, then six for
 * the institute and its learning environment. They render as one grid, the
 * programme's reasons first, the way the agentic-ai page already does it.
 */
export const chatgptAiToolsWhyChoose: { icon: string; title: string; body: string }[] = [
  {
    icon: "chart",
    title: "AI Is No Longer Optional — It's the New Baseline Skill",
    body: "In 2026, knowing how to use ChatGPT and AI tools isn't a bonus line on your resume anymore — it's fast becoming as essential as knowing MS Office once was. Companies across Mohali's IT parks, Chandigarh's corporate hubs, and the wider Tricity region are actively hiring for roles that expect candidates to already be comfortable with AI-assisted workflows. This program exists to close that gap quickly, practically, and affordably — right here in Mohali, without you needing to relocate to a metro city or pay premium fees for the same outcome.",
  },
  {
    icon: "terminal",
    title: "Built Around Real Skills, Not Just Theory",
    body: "A lot of “AI courses” online teach you what ChatGPT is. This program teaches you what to actually do with it. From day one, you're working on real, usable outputs — writing prompts that get better results, generating content for actual assignments or business use cases, building presentations, automating repetitive tasks, and using image and productivity AI tools alongside ChatGPT. By the time you finish, you won't just understand AI conceptually — you'll have a portfolio of practical work you can show in interviews, client pitches, or college submissions.",
  },
  {
    icon: "pin",
    title: "Designed for Mohali's Student and Professional Community",
    body: "This isn't a generic, one-size-fits-all curriculum copy-pasted for every city. The ChatGPT & AI Tools course in Mohali is shaped around the kind of opportunities available locally — IT companies, digital marketing agencies, BPOs, ed-tech startups, and small businesses across Mohali, Chandigarh, Zirakpur, and Kharar that are actively adopting AI tools into daily operations. That means the examples, projects, and use cases you work on are relevant to the jobs and businesses actually hiring in this region.",
  },
  {
    icon: "clock",
    title: "Flexible for Every Schedule",
    body: "Whether you're a 12th-pass student with free afternoons, a college student balancing lectures, or a working professional who can only attend evenings or weekends, this program is structured to fit your life — not the other way around. Weekday, weekend, and short-term batch options mean you don't have to choose between upskilling and your existing commitments.",
  },
  {
    icon: "briefcase",
    title: "A Genuine Career Accelerator",
    body: "This course is deliberately positioned as a career tool, not just a hobby class. Every module — from prompt engineering to AI-powered content and productivity tools — is tied back to a practical outcome: a stronger resume, faster work output, a more competitive job application, or a more efficient business process. For students, it's a head start before campus placements. For professionals, it's a fast way to stay relevant as job roles evolve around AI. For business owners, it's a direct way to cut costs and save time.",
  },
  {
    icon: "refresh",
    title: "Learn Once, Apply Everywhere",
    body: "AI tools evolve fast, but the underlying skill — knowing how to think in prompts, evaluate AI output critically, and integrate AI into your workflow — doesn't expire. This program focuses on building that transferable foundation, so as new tools emerge, you're equipped to pick them up quickly instead of starting from zero every time.",
  },
  {
    icon: "cube",
    title: "100% Practical, Project-Based Learning",
    body: "Students learn by building rather than simply listening to lectures. The programme is structured so that modules produce actual marketing assets and practical deliverables. You work with AI for keyword and market research, create content at scale, develop ad copy and creative concepts, analyse audiences, build reporting dashboards, and explore marketing automation. This approach helps students understand not only what a tool does, but also when and why a marketer should use it.",
  },
  {
    icon: "sparkles",
    title: "AI Tools Integrated Into the Marketing Workflow",
    body: "Techcadd does not treat Artificial Intelligence as a separate chapter added to a traditional marketing syllabus. AI is integrated throughout the learning process. Students work with tools including ChatGPT, Claude, Canva, Meta Ads, Google Ads, Looker Studio, and Zapier. These tools cover different stages of a modern marketing workflow — from research and creative production to paid campaigns, analytics, reporting, and automation. For a learner looking for an AI marketing course in Mohali, this integrated approach can be more useful than learning individual tools without understanding how they connect.",
  },
  {
    icon: "rocket",
    title: "Live Client Projects Under Trainer Guidance",
    body: "One of the strongest reasons to consider Techcadd is its focus on live client work. The programme states that students work on live client projects under trainer supervision rather than learning entirely through slides or simulated exercises. This gives students an opportunity to experience the practical decision-making involved in marketing: understanding a requirement, selecting the appropriate tools, producing an asset, reviewing performance, and improving the work. That experience can also give freshers something meaningful to discuss during interviews.",
  },
  {
    icon: "users",
    title: "Practitioner-Led Training",
    body: "Learning from someone who understands practical marketing workflows can make a major difference. Techcadd describes its trainers as practitioners who continue working on client projects through its services arm. For students, this means lessons can focus on current workflows, common mistakes, campaign decisions, and real marketing situations rather than relying only on outdated textbook examples.",
  },
  {
    icon: "checkCircle",
    title: "Small Batches and Doubt Support",
    body: "AI-powered marketing involves learning several interconnected concepts. Students may have questions about prompts, audience targeting, ad creatives, analytics, automation, or campaign decisions. Techcadd's programme highlights small batches, daily doubt clearing, and lab access, giving learners additional opportunities to practise and get feedback. This can be particularly helpful for beginners who are learning digital marketing and AI tools for the first time.",
  },
  {
    icon: "certificate",
    title: "Internship, Portfolio and Career Preparation",
    body: "The objective is not to finish the programme with notes alone. Techcadd's AI-Powered Marketing course includes a live project, portfolio development, an internship letter, certification, CV preparation, interview practice, and placement support. Students can therefore work towards building evidence of their skills alongside their academic qualifications. For a 12th-pass student, graduate, fresher, job seeker, freelancer, or career switcher in Mohali and the Chandigarh region, this practical combination can make the learning experience more career-oriented.",
  },
  {
    icon: "target",
    title: "A Career-Focused Learning Environment",
    body: "Techcadd's existing programme runs for 3–6 months, with classroom, weekend, and 1-on-1 learning options, and accepts students from 12th grade onward. The key advantage is the combination of AI + marketing fundamentals + practical projects + live work + portfolio development. Instead of learning AI tools in isolation, students are encouraged to understand how those tools fit into an end-to-end marketing process. For anyone comparing an AI-Powered Marketing course in Mohali, this is the standard worth looking for: not just a list of tools, but a learning environment where you can learn, build, receive feedback, and create work you can confidently explain.",
  },
];

/* -------------------------------------------------------------------------- *
 *                               Who can join                                  *
 * -------------------------------------------------------------------------- */

export const chatgptAiToolsAudience: { title: string; body: string; icon: string }[] = [
  {
    icon: "users",
    title: "School Students (After 10th/12th)",
    body: "If you've just finished school and you're figuring out your next step, this is one of the smartest early investments you can make. Students in Mohali, Kharar, Zirakpur, and Chandigarh joining after 12th use this course to build a modern skill that supports whatever stream they choose next — commerce, arts, science, or design. Learning ChatGPT and AI tools early gives you a head start in assignments, projects, competitive exam prep, and even college applications.",
  },
  {
    icon: "building",
    title: "College Students & Graduates",
    body: "Whether you're pursuing a B.Tech, BCA, BBA, or any other degree from a college in Mohali or the Tricity, AI fluency is no longer optional — it's expected. This course helps college students in Mohali use ChatGPT and AI tools for research, academic writing, presentations, coding assistance, and project work, while also building a resume-ready skill that recruiters actively look for during campus placements.",
  },
  {
    icon: "target",
    title: "Job Seekers & Freshers",
    body: "If you're actively job-hunting in Mohali's growing IT and BPO sector, AI tool proficiency can be the differentiator between your resume getting shortlisted or ignored. This course trains you to use AI for resume optimization, cover letters, interview preparation, LinkedIn profile building, and portfolio creation — practical skills that hiring managers notice immediately.",
  },
  {
    icon: "briefcase",
    title: "Working Professionals",
    body: "Professionals across HR, marketing, sales, content, customer support, and operations in Mohali and Chandigarh are using this course to work faster and smarter. If your job involves writing emails, reports, presentations, social media content, or data analysis, this AI tools training in Mohali teaches you to automate repetitive tasks and focus on higher-value work — a skill increasingly tied to appraisals and promotions.",
  },
  {
    icon: "chart",
    title: "Business Owners & Entrepreneurs",
    body: "Small business owners and startup founders in Mohali's growing entrepreneurial ecosystem join this course to cut costs on content creation, marketing, and customer communication. You'll learn to use ChatGPT and AI tools for social media planning, ad copy, business proposals, and customer service scripts — without hiring a full team.",
  },
  {
    icon: "megaphone",
    title: "Teachers, Freelancers & Content Creators",
    body: "Educators use AI tools to build lesson plans and study material faster. Freelancers and content creators use them to speed up writing, design, and video/audio content workflows. If you're based in Mohali and juggling multiple clients or classes, this course helps you reclaim hours every week.",
  },
  {
    icon: "sparkles",
    title: "Anyone Curious About AI",
    body: "You don't need a “tech” background. This course is written and taught in plain language, with real Mohali-based use cases, so absolute beginners walk in confused about AI and walk out confidently using it daily — for work, study, or personal projects.",
  },
];

/** The checklist beside those cards, drawn from the same section and the FAQs. */
export const chatgptAiToolsEligibility = [
  "Open from 12th grade onward — any stream, no entrance test",
  "Zero coding prerequisites: if you can use a smartphone or a browser, you can start",
  "No advanced technical or programming background required",
  "Open to college students, graduates, freshers, professionals, freelancers and entrepreneurs",
  "Weekday, weekend and short-term batch options, plus 1-on-1 learning",
];

/* -------------------------------------------------------------------------- *
 *                              Future scope                                   *
 * -------------------------------------------------------------------------- */

/** The line under the "where this course takes you" heading. */
export const chatgptAiToolsDemand =
  "Companies across Mohali's IT parks, Chandigarh's corporate hubs, and the wider Tricity region are actively hiring for roles that expect candidates to already be comfortable with AI-assisted workflows.";

/* -------------------------------------------------------------------------- *
 *                                 Compare                                     *
 * -------------------------------------------------------------------------- */

/**
 * This programme against the online AI courses a reader is comparing it with —
 * the distinction the brief draws itself in "Built Around Real Skills, Not
 * Just Theory" and "Live Client Projects Under Trainer Guidance".
 */
export const chatgptAiToolsComparison: {
  aspect: string;
  icon: string;
  us: string;
  them: string;
}[] = [
  {
    aspect: "What is taught",
    icon: "terminal",
    us: "What to actually do with ChatGPT — prompts that get better results, on real usable outputs.",
    them: "What ChatGPT is, explained again.",
  },
  {
    aspect: "How many tools",
    icon: "layers",
    us: "An integrated workflow — ChatGPT, Claude, Canva, Meta Ads, Google Ads, Looker Studio and Zapier.",
    them: "One platform, learned in isolation from the work it belongs to.",
  },
  {
    aspect: "Where you practise",
    icon: "rocket",
    us: "Live client projects under trainer supervision.",
    them: "Slides and simulated exercises.",
  },
  {
    aspect: "Who teaches",
    icon: "users",
    us: "Practitioners who keep working on client projects through Techcadd's services arm.",
    them: "Outdated textbook examples.",
  },
  {
    aspect: "When you get stuck",
    icon: "checkCircle",
    us: "Small batches, daily doubt clearing and lab access.",
    them: "A discussion forum, and a wait.",
  },
  {
    aspect: "What you finish with",
    icon: "certificate",
    us: "A portfolio, certification, an internship letter, CV preparation and interview practice.",
    them: "A completion badge and course notes.",
  },
];

/* -------------------------------------------------------------------------- *
 *                                   FAQs                                      *
 * -------------------------------------------------------------------------- */

export const chatgptAiToolsFaqs: { q: string; a: string }[] = [
  {
    q: "What is an AI-Powered Marketing course in Mohali?",
    a: "An AI-Powered Marketing course teaches students how to use Artificial Intelligence in practical marketing activities such as market research, content creation, advertising, audience targeting, analytics, reporting, personalisation, and automation. Techcadd's programme combines AI tools with practical marketing workflows and projects.",
  },
  {
    q: "Who can join the AI-Powered Marketing course at Techcadd?",
    a: "The programme is suitable for 12th-pass students, college students, graduates, freshers, job seekers, freelancers, entrepreneurs, and career switchers who want to develop practical AI-enabled marketing skills. An advanced technical or programming background is not required.",
  },
  {
    q: "Is programming required to learn AI-Powered Marketing?",
    a: "No. The course focuses on using AI for marketing, rather than developing AI models or writing complex machine-learning programs. Beginners can learn how AI tools can support research, content, advertising, analytics, and automation.",
  },
  {
    q: "What tools are taught in the AI-Powered Marketing course?",
    a: "The Techcadd curriculum includes practical exposure to ChatGPT, Claude, Canva, Meta Ads, Google Ads, Looker Studio, and Zapier. These tools are used across different stages of the marketing workflow.",
  },
  {
    q: "What will I learn in an AI marketing course in Mohali?",
    a: "You can learn AI-assisted keyword and market research, content production, advertising copy and creative generation, audience analysis and segmentation, automated reporting, personalisation, email automation, marketing workflows, and performance measurement.",
  },
  {
    q: "Does the course include practical projects?",
    a: "Yes. Techcadd's AI-Powered Marketing curriculum includes practical projects such as an AI-Powered Marketing Fundamentals Build, Real-World Data Challenge, Live Client Brief, and Portfolio Capstone. The programme is designed to help students apply concepts instead of relying only on theoretical learning.",
  },
  {
    q: "Can a fresher pursue AI-Powered Marketing after graduation?",
    a: "Yes. Graduates and freshers can use the course to develop practical marketing skills that complement their academic qualifications. It can help them explore areas such as digital marketing, content marketing, performance marketing, social media marketing, growth marketing, and marketing automation.",
  },
  {
    q: "Is an AI-Powered Marketing course useful for freelancing?",
    a: "Yes. AI can support freelancers with activities such as research, content ideation, copy development, creative planning, reporting, and repetitive workflow automation. However, successful freelancing also requires communication, marketing strategy, client management, quality control, and the ability to deliver measurable value.",
  },
  {
    q: "What career options are available after learning AI-Powered Marketing?",
    a: "Depending on your skills, portfolio, experience, and other qualifications, you can explore roles such as Digital Marketing Executive, AI Content Strategist, Performance Marketing Executive, Growth Marketing Executive, Social Media Marketing Executive, Marketing Automation Executive, or AI-assisted Marketing Specialist.",
  },
  {
    q: "Does Techcadd provide practical career support?",
    a: "Techcadd's programme includes portfolio development, certification, CV preparation, interview practice, internship-related support, and placement support as part of its career-oriented structure. Students should confirm the current terms and availability with the Mohali centre before enrolment.",
  },
  {
    q: "How long is the AI-Powered Marketing course?",
    a: "Techcadd's existing AI-Powered Marketing programme is structured as a 3–6 month programme, depending on the selected learning format. Current duration, batch schedule, and course availability should be confirmed directly with the Techcadd centre.",
  },
  {
    q: "Why should I choose an AI-Powered Marketing course instead of only learning traditional digital marketing?",
    a: "AI-powered marketing adds another layer to conventional marketing skills. Instead of only learning individual marketing channels, students can learn how AI can support research, content, advertising, analytics, personalisation, and automation. The strongest approach is to understand marketing fundamentals first and then use AI to improve efficiency, creativity, and decision-making.",
  },
  {
    q: "Can 12th-pass students join an AI marketing course in Mohali?",
    a: "Yes. Students who have completed 12th can explore the programme if they are interested in digital marketing, Artificial Intelligence, social media, advertising, content creation, or online business. Techcadd's existing programme states that learners can join from 12th grade onward.",
  },
  {
    q: "Is the course suitable for students from Chandigarh, Kharar, or Zirakpur?",
    a: "Yes. Students from the wider Mohali–Chandigarh Tricity region, including nearby areas such as Kharar and Zirakpur, can consider an AI-Powered Marketing programme based on their preferred centre, schedule, mode, and commute.",
  },
];

/* -------------------------------------------------------------------------- *
 *                                 Reviews                                     *
 * -------------------------------------------------------------------------- */

/**
 * The ten reviews from the brief, in its order and with its attributions.
 *
 * The brief's "Important Note for Website Use" applies and has not been
 * overridden here: these are sample review formats, not verified customer
 * testimonials. Before they stand as reviews on the live site, each should be
 * replaced with feedback collected from a real Techcadd student and, where
 * consented, carry the student's first name, batch, photograph or other
 * details.
 */
export const chatgptAiToolsReviews: CourseReview[] = [
  {
    name: "Student",
    role: "1. “A practical course for beginners”",
    company: "Mohali",
    quote:
      "“I was looking for an AI-powered marketing course in Mohali that was easy to understand as a beginner. The practical approach helped me understand how AI tools can actually be used for content, research and marketing tasks.”",
    rating: 5,
    initials: "ST",
  },
  {
    name: "College Student",
    role: "2. “Useful for building practical skills”",
    company: "Chandigarh Tricity",
    quote:
      "“As a college student from the Chandigarh region, I wanted to learn something beyond academics. The AI marketing concepts and practical assignments gave me a better understanding of how modern marketers use AI.”",
    rating: 5,
    initials: "CS",
  },
  {
    name: "Graduate",
    role: "3. “Good combination of AI and marketing”",
    company: "Mohali",
    quote:
      "“What I liked most was that the course was not only about AI tools. It connected AI with advertising, content, analytics and automation, which made the learning much more practical.”",
    rating: 5,
    initials: "GR",
  },
  {
    name: "Fresher",
    role: "4. “Helpful for a fresher”",
    company: "Mohali",
    quote:
      "“After graduation, I wanted to develop a skill that could help me enter digital marketing. Learning AI-assisted content creation, advertising and reporting gave me a clearer idea of the type of work marketers do.”",
    rating: 5,
    initials: "FR",
  },
  {
    name: "Student",
    role: "5. “The projects made a difference”",
    company: "Kharar",
    quote:
      "“The project-based learning was one of the most useful parts for me. Instead of only learning concepts, I got opportunities to apply them to actual marketing tasks and understand the complete workflow.”",
    rating: 5,
    initials: "ST",
  },
  {
    name: "Learner",
    role: "6. “Learned more than just ChatGPT”",
    company: "Zirakpur",
    quote:
      "“Before joining, I mainly knew about ChatGPT. During the programme, I understood how different tools can be used for different marketing activities, including creative work, advertising, reporting and automation.”",
    rating: 5,
    initials: "LR",
  },
  {
    name: "Graduate",
    role: "7. “Useful for career planning”",
    company: "Chandigarh",
    quote:
      "“I was confused about which direction to take after graduation. The course helped me understand different areas of digital marketing and how AI is becoming part of content, performance and growth marketing.”",
    rating: 5,
    initials: "GR",
  },
  {
    name: "Student",
    role: "8. “Easy-to-understand practical learning”",
    company: "Mohali",
    quote:
      "“The concepts were explained in a practical way, which made it easier for me to follow even though I did not have a technical background. I especially enjoyed working on AI-assisted marketing tasks.”",
    rating: 5,
    initials: "ST",
  },
  {
    name: "College Student",
    role: "9. “A good skill addition for students”",
    company: "Mohali",
    quote:
      "“I joined because I wanted an industry-oriented skill alongside my studies. The combination of AI, digital marketing, advertising and analytics made the course more relevant to what I wanted to learn.”",
    rating: 5,
    initials: "CS",
  },
  {
    name: "Learner",
    role: "10. “More confident about marketing tools”",
    company: "Chandigarh Tricity",
    quote:
      "“The course helped me become more comfortable with different marketing tools and workflows. I now have a better understanding of how research, content, ads, analytics and automation connect together.”",
    rating: 5,
    initials: "LR",
  },
];
