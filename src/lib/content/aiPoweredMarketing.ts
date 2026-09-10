import type { Course } from "@/lib/courses";
import type { CourseReview, LearnDetail, SectionCopy } from "@/lib/coursePage";

/**
 * The AI menu's AI-Powered Marketing page, at
 * `/courses/ai/ai-powered-marketing`.
 *
 * This is one of the two courses whose record does not come from the catalogue
 * in `@/lib/courses`. It belongs to the AI menu alone: the Courses menu keeps
 * its own Digital Marketing page at `/courses/course/digital-marketing`, and
 * the Certificate Programs and After 12th routes never serve this slug, so the
 * copy below appears on exactly one page.
 *
 * Everything here is the supplied copy, reproduced as written — including the
 * ChatGPT & AI Tools sections the brief carries for the "why choose", "what
 * you will learn", reviews and FAQ parts of the page. That mix is the source's
 * own; nothing has been reconciled or rewritten. Where a section of the detail
 * page had no copy in that brief — the module list, the outcomes, the roles,
 * the eligibility checklist, the demand line and the comparison — it is
 * composed from the same brief rather than invented, so the page never states
 * anything the copy does not. The brief gives no fixed length, so the record
 * carries no duration and every surface that would print one falls back to the
 * batch wording.
 *
 * Types are imported with `import type` on purpose: `@/lib/coursePage` reads
 * the values below, so a value import here would close a runtime cycle.
 */

/* -------------------------------------------------------------------------- *
 *                              The course record                              *
 * -------------------------------------------------------------------------- */

export const aiPoweredMarketingCourse: Course = {
  slug: "ai-powered-marketing",
  title: "AI-Powered Marketing",
  category: "digital-marketing",
  level: "Beginner → Advanced",
  badge: "Trending",
  blurb:
    "Run real campaigns with AI in the loop — keyword and market research, content at scale, ad copy and creative, audience analysis, automated reporting and email automation.",
  overview:
    "Techcadd's AI-Powered Marketing course in Mohali is built for students, graduates, and working professionals who want to run real marketing campaigns with AI in the loop — not just talk about it. Starting with AI-driven keyword and market research, you move into content production at scale, ad copy and creative generation, audience analysis and segmentation, and automated reporting using Looker Studio. Later modules cover personalisation and email automation through Zapier, plus how to actually measure what AI improved in a campaign — because faster output that doesn't convert isn't progress.\n\nAll practical work happens on live Meta Ads and Google Ads accounts under trainer supervision, using industry tools like ChatGPT, Claude, and Canva. Students in Mohali, Zirakpur, Kharar, and the wider Tricity region get hands-on training designed around how digital marketing agencies actually work in 2026.\n\nBy the end of this AI-Powered Marketing course in Mohali, you'll have a documented portfolio of AI-assisted campaigns, a certificate, an internship letter, and placement-ready interview preparation for Digital Marketer, AI Content Strategist, and Performance Marketer roles.",

  /* The programme sequence named in the overview, one module per stage. The
     prose for the AI-tool areas is in `aiPoweredMarketingLearn` below. */
  modules: [
    {
      title: "AI for Keyword & Market Research",
      blurb: "Where every campaign in this programme starts.",
      points: [
        "AI-driven keyword research",
        "Market research and competitor reading",
        "Turning research into a campaign direction",
      ],
    },
    {
      title: "Content Production at Scale",
      blurb: "Producing more without producing worse.",
      points: [
        "Content planning and topic ideation",
        "Drafting and editing with AI in the loop",
        "Keeping originality, accuracy and quality your responsibility",
      ],
    },
    {
      title: "Ad Copy & Creative Generation",
      blurb: "The copy and creative that carry a paid campaign.",
      points: [
        "Ad copy variations for testing",
        "Creative concepts with Canva and AI assistance",
        "Matching message to placement and audience",
      ],
    },
    {
      title: "Audience Analysis & Segmentation",
      blurb: "Who the campaign is actually for.",
      points: [
        "Audience research and segmentation",
        "Reading behaviour and intent",
        "Building segments a campaign can target",
      ],
    },
    {
      title: "Automated Reporting with Looker Studio",
      blurb: "Reporting that builds itself once you have set it up properly.",
      points: [
        "Automated reporting using Looker Studio",
        "The metrics that matter for a campaign",
        "Reporting to a client rather than to yourself",
      ],
    },
    {
      title: "Personalisation & Email Automation",
      blurb: "Reaching the same list differently, without doing it by hand.",
      points: [
        "Personalisation across a customer journey",
        "Email automation through Zapier",
        "Workflows that trigger from real behaviour",
      ],
    },
    {
      title: "Measuring What AI Actually Improved",
      blurb:
        "Because faster output that doesn't convert isn't progress — the closing discipline of the programme.",
      points: [
        "Measuring what AI improved in a campaign",
        "Live Meta Ads and Google Ads work under trainer supervision",
        "A documented portfolio of AI-assisted campaigns",
      ],
    },
  ],

  tools: [
    "ChatGPT",
    "Claude",
    "Perplexity",
    "Canva AI",
    "Notion AI",
    "Zapier",
    "Make",
    "Excel",
    "Meta Ads",
    "Google Ads",
    "Looker Studio",
  ],

  outcomes: [
    "A documented portfolio of AI-assisted campaigns",
    "A certificate",
    "An internship letter",
    "Placement-ready interview preparation",
    "A fundamentals build, real-world data challenge, live client brief and portfolio capstone",
  ],

  roles: ["Digital Marketer", "AI Content Strategist", "Performance Marketer", "Growth Executive"],
};

/* -------------------------------------------------------------------------- *
 *                                    SEO                                      *
 * -------------------------------------------------------------------------- */

export const aiPoweredMarketingSeo = {
  title: "AI-Powered Marketing Course in Mohali | ChatGPT & AI Tools – Techcadd",
  description:
    "Techcadd's AI-Powered Marketing course in Mohali — live Meta Ads and Google Ads work with ChatGPT, Claude and Canva, a documented portfolio, certificate and internship letter.",
};

/* -------------------------------------------------------------------------- *
 *                             Section headings                                *
 * -------------------------------------------------------------------------- */

export const aiPoweredMarketingSectionCopy: Partial<
  Record<"learn" | "why" | "who" | "tools" | "enquire", SectionCopy>
> = {
  learn: {
    title: "What You Will Learn & Tools Covered",
    intro:
      "A ChatGPT & AI Tools course in Mohali can give students a practical starting point for understanding how artificial intelligence is being used across modern workplaces. The focus is not simply on learning individual AI platforms, but on understanding how to combine AI tools with everyday professional tasks.",
  },
  why: {
    title: "Why the AI-Powered Marketing Course Is Worth Your Year",
    intro:
      "Choosing the right ChatGPT & AI Tools course in Mohali is not just about finding a place that teaches ChatGPT. The real value comes from learning how to use AI tools productively, applying them to real tasks, building practical projects, and developing skills that can support your academic and professional growth.",
    note: "The goal is not simply to finish another course. It is to leave with practical AI skills that you can continue developing as technology and your career evolve.",
  },
  who: {
    title: "Who Can Join the AI-Powered Marketing Course in Mohali?",
    intro:
      "Techcadd's AI-Powered Marketing course in Mohali is designed for a wide mix of learners, and that's intentional — real marketing teams are made up of people from very different starting points, and this batch reflects that. What actually matters isn't your background on day one; it's whether you show up consistently and finish what each module asks you to build. Here's who this program is built for:",
    note: "Students from Mohali, Zirakpur, Kharar, Landran, Panchkula, and the greater Chandigarh Tricity region join this program at every one of these starting points — and the mixed batch format is designed to work for all of them.",
  },
  tools: {
    title: "Tools You Can Explore",
    note: "Learning multiple tools helps students understand that different AI platforms have different strengths.",
  },
  enquire: {
    title: "Ready to Build Your AI Skills?",
    intro:
      "Learn ChatGPT and practical AI tools with Techcadd in Mohali. Whether you are a 12th-pass student, graduate, college student or job seeker, this programme can help you understand how modern AI tools are used for productivity, content creation, research, design, automation and other real-world tasks.",
    facts: [
      {
        label: "Batches",
        value: "Weekday, evening, weekend and 1-on-1 timings — instead of one fixed slot",
      },
      { label: "Starts from", value: "Zero — the program assumes no prior knowledge" },
      {
        label: "Practical work",
        value: "Live Meta Ads and Google Ads accounts under trainer supervision",
      },
      {
        label: "On completion",
        value:
          "A documented portfolio of AI-assisted campaigns, a certificate and an internship letter",
      },
      {
        label: "Fresher salary",
        value:
          "Typically ₹18,000–₹32,000 a month in the local market, moving up with real experience",
      },
    ],
  },
};

/* -------------------------------------------------------------------------- *
 *                        What you will learn & tools                          *
 * -------------------------------------------------------------------------- */

export const aiPoweredMarketingLearn: LearnDetail = {
  intro:
    "Students begin with the fundamentals of Generative AI and AI productivity. You learn what modern AI tools can do, where they are useful, how to write effective prompts and how to review AI-generated information before using it.",
  count: { value: "7", label: "areas, plus tools and projects" },
  topics: [
    {
      title: "1. Generative AI & Prompting",
      body: [
        "You learn the fundamentals of Generative AI and how prompt quality affects AI output. Practical prompting techniques can help you create clearer instructions, improve responses and build repeatable workflows.",
        "Students can practise prompts for:",
      ],
      points: [
        "Content generation",
        "Research",
        "Summarisation",
        "Brainstorming",
        "Presentations",
        "Professional communication",
        "Learning and study assistance",
        "Business tasks",
      ],
    },
    {
      title: "2. ChatGPT for Productivity",
      body: [
        "ChatGPT can be used for much more than basic question-answering. Students learn practical applications such as generating ideas, organising information, creating drafts, summarising material and assisting with everyday professional tasks.",
        "You also learn how to refine AI responses instead of accepting the first output automatically.",
      ],
    },
    {
      title: "3. AI Research & Information Discovery",
      body: [
        "Research is another important area of AI application. Tools such as Perplexity can help learners explore topics, gather information and structure research more efficiently.",
        "Students learn how AI-assisted research can support assignments, presentations, content projects and business research while developing the habit of checking information and sources.",
      ],
    },
    {
      title: "4. AI-Assisted Content Creation",
      body: [
        "AI is increasingly used in content workflows. Students can explore how ChatGPT and other AI tools can support:",
      ],
      points: [
        "Blog ideas",
        "Social media content",
        "Captions",
        "Content outlines",
        "Marketing copy",
        "Video concepts",
        "Email drafts",
        "Creative brainstorming",
      ],
    },
    {
      title: "5. AI for Design & Visual Content",
      body: [
        "The programme also introduces AI-powered creative tools such as Canva AI. Students can explore how AI can support visual content creation, presentations, social media designs and other digital assets.",
        "This is particularly useful for learners interested in digital marketing, social media, content creation and freelancing.",
      ],
    },
    {
      title: "6. AI for Notes, Organisation & Productivity",
      body: [
        "Tools such as Notion AI can help organise information, documentation, notes and workflows. Students learn how AI can assist with structuring information and reducing repetitive work.",
        "This can be useful for both students managing academic work and professionals managing projects.",
      ],
    },
    {
      title: "7. AI-Powered Automation",
      body: [
        "One of the more advanced parts of the learning journey is understanding automation.",
        "Platforms such as Zapier and Make can connect different applications and automate repetitive processes. Students get exposure to the concept of building workflows where one action can trigger another automatically.",
        "For example, a workflow could involve collecting information, processing it with an AI tool and sending the resulting information to another application.",
      ],
    },
  ],
  outro: [
    "Real-World Projects & Portfolio Development — the practical component is especially important. Students can apply their learning through structured projects, including data-related challenges, real-world briefs and portfolio-oriented work.",
    "Rather than simply writing “ChatGPT” on a resume, the objective is to understand how to demonstrate what you can actually do with AI.",
  ],
};

/* -------------------------------------------------------------------------- *
 *                               Why choose                                    *
 * -------------------------------------------------------------------------- */

/**
 * The brief answers this three times over — the case for the programme, then
 * "Why Choose Techcadd for a ChatGPT & AI Tools Course in Mohali?", then "Why
 * Choose Techcadd". All three render as one grid, in the order the brief gives
 * them, the way the agentic-ai page already does it.
 */
export const aiPoweredMarketingWhyChoose: { icon: string; title: string; body: string }[] = [
  {
    icon: "chart",
    title: "The Demand Is Real, and It's Local",
    body: "Marketing agencies and businesses across Mohali, Zirakpur, Kharar, and the wider Chandigarh Tricity region now expect marketers to produce more, faster, using AI — and the ones who can actually do it are getting paid better for it. That gap between “knows AI exists” and “can run a live campaign with it” is exactly what this program closes. There's genuine local demand, real budgets being spent on AI-powered marketing, and very few trained people in the region to hand that work to. Mohali's growing IT Park, Aerocity, and Sector 66–68 corporate corridor mean this demand isn't theoretical — it's sitting a few kilometres from wherever you're reading this.",
  },
  {
    icon: "rocket",
    title: "The Method: Supervision on Real Work, Not Tutorials",
    body: "What separates this course from a stack of free YouTube playlists is simple: supervision on real client work. From the second half of the program, you're building on live Meta Ads and Google Ads accounts with a trainer reviewing your decisions — decisions that have real consequences, which you then correct the following week. That feedback loop is the actual skill being taught. No employer in Mohali is going to take your word for it without work they can inspect, and that's precisely what you'll have.",
  },
  {
    icon: "briefcase",
    title: "Be Realistic About the Money",
    body: "A fresher who finishes this course with a working, documented portfolio typically starts around ₹18,000–₹32,000 a month in the local market, moving up quickly with real experience. Roles open up as Digital Marketer, AI Content Strategist, Performance Marketer, and Growth Executive. The ceiling is high — but it's earned through demonstrable work, not a certificate alone. Nobody in Mohali is paying a beginner well just because they attended a course.",
  },
  {
    icon: "clock",
    title: "The Alternative Is Expensive Too — Just in Time",
    body: "Most people try the alternative first: free videos, a cheap online course, months of drifting between tutorials, and knowledge they can't actually demonstrate in an interview. A structured, in-person AI-Powered Marketing course in Mohali — with live projects, a mentor who corrects your mistakes, a documented internship letter, and a placement cell that genuinely calls employers — is the difference between understanding the subject and being hired to do it.",
  },
  {
    icon: "pin",
    title: "Built for Students Across the Region",
    body: "Students reach Techcadd's Mohali centre from Sector 70, Phase 7, Phase 9, Aerocity, and the IT Park corridor, with weekend learners commuting in from Zirakpur, Kharar, Landran, and Panchkula. Whether you've just finished 12th, are completing a degree at a local college, or are switching careers entirely, this program starts from zero — which is exactly why weekday, evening, weekend, and 1-on-1 batch timings all exist, instead of one fixed slot that only works for some students.",
  },
  {
    icon: "terminal",
    title: "Practical, Career-Focused AI Learning",
    body: "At Techcadd, the focus is on using AI rather than simply learning definitions. The course structure covers practical workflows involving ChatGPT, Claude, Perplexity, Canva AI, Notion AI, Zapier, Make and other modern AI tools. Students learn how these tools can support content creation, research, productivity, data analysis, design and automation. For students in Mohali, Chandigarh, Kharar and nearby areas, this practical approach can help bridge the gap between classroom knowledge and the skills increasingly expected in internships, freelance work and entry-level jobs.",
  },
  {
    icon: "sparkles",
    title: "Learn More Than Just Prompting",
    body: "Many beginners associate AI training only with writing prompts. Techcadd's approach goes further. Students learn how to create useful workflows, analyse information, verify AI-generated output and connect different tools to complete repetitive tasks. The curriculum is organised around foundations, core skills, applied work and a live project, rather than presenting a long list of disconnected AI tools. This matters because knowing what to ask AI is only one part of becoming effective with AI. Students also need to understand when to use a tool, how to evaluate its response and how to turn the output into something useful.",
  },
  {
    icon: "cube",
    title: "Hands-On Projects Instead of Only Theory",
    body: "A strong ChatGPT & AI Tools training in Mohali should give students opportunities to practise. Techcadd's course follows a project-oriented model where learners work on practical tasks and build portfolio-worthy work. The course structure includes a fundamentals build, real-world data challenge, live client brief and portfolio capstone. These projects bring together tools such as ChatGPT, Claude, Canva AI and Notion AI, followed by automation using platforms such as Zapier and Make. For a student preparing for internships or interviews, having something practical to demonstrate can be more useful than simply listing “ChatGPT” on a resume.",
  },
  {
    icon: "users",
    title: "Suitable for Students Starting From Zero",
    body: "You do not need to be an AI engineer to begin learning AI tools. The programme is designed for learners from different backgrounds, including students after 12th, graduates, final-year students, working professionals, freelancers and business owners. This makes the course particularly relevant for 12th-pass students, college students and graduates in Mohali who want to add an emerging technology skill without immediately committing to advanced programming or machine learning.",
  },
  {
    icon: "certificate",
    title: "Career Preparation Alongside Technical Skills",
    body: "Learning AI tools can become much more valuable when combined with career preparation. Techcadd's programme includes portfolio development, CV support and interview preparation alongside practical training. It also provides certification and an internship letter connected with the programme's practical work. For students searching for ChatGPT & AI Tools training in Mohali, this creates a more complete learning journey: learn → practise → build → present → prepare for opportunities.",
  },
  {
    icon: "layers",
    title: "Learn a Broader AI Tool Ecosystem",
    body: "AI changes quickly. Instead of depending on a single platform, students are exposed to a wider ecosystem including ChatGPT, Claude, Perplexity, Canva AI, Notion AI, Zapier and Excel. That broader exposure can help students understand how different AI tools fit different tasks — from research and writing to design, spreadsheets, documentation and automation.",
  },
  {
    icon: "refresh",
    title: "A Learning Path That Can Grow With You",
    body: "For someone beginning in Mohali, ChatGPT and AI tools can be an entry point into the wider AI ecosystem. After building confidence with AI productivity tools, learners can explore areas such as Prompt Engineering, Generative AI, AI-powered marketing, data analytics or more advanced AI development. Techcadd's broader AI learning ecosystem includes pathways covering Generative AI, Prompt Engineering, ChatGPT & AI Tools, Agentic AI and AI-powered applications.",
  },
  {
    icon: "bolt",
    title: "Practical Learning for Real-World Use",
    body: "Techcadd focuses on practical AI learning rather than purely theoretical concepts. Students can learn how tools such as ChatGPT and other AI platforms can be applied to everyday professional tasks, including research, content creation, presentations, productivity, data handling, design and automation. This practical approach is especially useful for 12th-pass students, graduates, college students and job seekers in Mohali who want to understand how AI can fit into different career paths.",
  },
  {
    icon: "code",
    title: "Learn an AI Toolkit, Not Just One Tool",
    body: "AI is much bigger than ChatGPT alone. A good AI tools programme should help learners understand how different platforms solve different problems. The course covers an ecosystem of tools and applications, including ChatGPT, Claude, Perplexity, Canva AI, Notion AI, Zapier, Make and Excel, helping students understand practical AI workflows rather than relying on a single platform. This broader exposure can help learners become more adaptable as AI technology continues to evolve.",
  },
  {
    icon: "monitor",
    title: "Project-Based Approach",
    body: "One of the biggest advantages of practical AI training is the opportunity to turn learning into demonstrable work. Instead of only watching demonstrations, students can work through practical activities and projects that replicate real-world requirements. Techcadd's programme includes structured project work such as a fundamentals project, data challenge, live client brief and portfolio capstone. This gives students opportunities to combine multiple AI tools and demonstrate what they can actually accomplish.",
  },
  {
    icon: "globe",
    title: "Designed for Different Learning Backgrounds",
    body: "You do not have to be an advanced programmer to start learning AI tools. ChatGPT and AI productivity tools can be useful across many academic and professional backgrounds. Students from commerce, arts, science, management, computer applications and other streams can explore AI applications relevant to their interests. Graduates and job seekers can also use the skills to improve productivity and strengthen their digital profile.",
  },
  {
    icon: "target",
    title: "Career-Oriented Learning",
    body: "AI skills can complement existing knowledge. A student interested in digital marketing can explore AI-powered content and research. Someone interested in data can use AI to support spreadsheet and analysis workflows. A designer can explore AI-assisted creative tools, while a business student can use AI for research, presentations and productivity. Techcadd's learning approach also incorporates portfolio development, CV support, interview preparation and certification, helping students connect their training with career preparation.",
  },
  {
    icon: "checkCircle",
    title: "Build Skills That Can Evolve",
    body: "AI tools are changing rapidly, so learning one platform is not enough. Students need to develop the ability to explore new tools, create effective prompts, evaluate AI responses and build useful workflows. Techcadd provides a foundation from which learners can continue exploring areas such as Generative AI, Prompt Engineering, AI-powered marketing, automation and other emerging AI applications.",
  },
];

/* -------------------------------------------------------------------------- *
 *                               Who can join                                  *
 * -------------------------------------------------------------------------- */

export const aiPoweredMarketingAudience: { title: string; body: string; icon: string }[] = [
  {
    icon: "users",
    title: "Students After 12th (Any Stream)",
    body: "If you've just finished school in Mohali, Kharar, or Zirakpur and are unsure whether commerce, arts, or science leads anywhere useful, this course doesn't assume prior knowledge. You start from the fundamentals of AI-powered marketing and build up. Many students run this course alongside a college degree using weekday or weekend batch timings, making it a practical add-on rather than a full-time commitment.",
  },
  {
    icon: "certificate",
    title: "Graduates and Final-Year Students",
    body: "Whether you're finishing a BA, BBA, B.Com, BCA, or B.Tech from a college in Mohali or the Tricity region, this is one of the shortest routes from a degree to a paycheck. Instead of walking into placement season with just a mark sheet, you walk in with a documented portfolio of AI-assisted marketing campaigns you can actually explain in an interview.",
  },
  {
    icon: "briefcase",
    title: "Working Professionals Looking to Upskill",
    body: "Marketing has changed faster than most job descriptions have caught up with. If you're already working — in sales, content, customer support, or even a non-marketing role — and want to move into a digital marketing or AI marketing career, the weekend batch is built for you. Career switchers typically become interview-ready within a few months without quitting their current job.",
  },
  {
    icon: "megaphone",
    title: "Business Owners and Freelancers in Mohali",
    body: "If you run a business or freelance in Mohali, Sector 70, Aerocity, or the IT Park corridor, this course helps you stop outsourcing work you can't evaluate. You'll learn to run and judge AI-assisted ad campaigns, content, and reporting yourself — and freelancers gain the skills to bill clients well beyond Punjab, since AI-powered marketing work isn't limited by location.",
  },
  {
    icon: "refresh",
    title: "Career Restarters",
    body: "A gap on your resume matters far less than work you can point to. Whether you took time off for family, health, or any other reason, this course starts from zero and finishes with a real portfolio and a documented internship letter — exactly what an interviewer wants to see after a break.",
  },
  {
    icon: "monitor",
    title: "Self-Taught Learners Stuck at “Almost”",
    body: "If YouTube tutorials and free courses have left you with notes but nothing you can actually show, what changes here is structure: a trainer who reviews your weekly output, a deadline attached to every module, and live client work instead of simulated exercises.",
  },
];

/** The checklist beside those cards, drawn from the same section and the FAQs. */
export const aiPoweredMarketingEligibility = [
  "Open to any stream after 12th — commerce, arts or science",
  "No prior marketing knowledge assumed; the program starts from zero",
  "No coding required — the AI tools taught here are learned without programming",
  "Open to graduates, working professionals, business owners, freelancers and career restarters",
  "Weekday, evening, weekend and 1-on-1 timings, so a degree or a job need not stop you",
];

/* -------------------------------------------------------------------------- *
 *                              Future scope                                   *
 * -------------------------------------------------------------------------- */

/** The line under the "where this course takes you" heading. */
export const aiPoweredMarketingDemand =
  "Marketing agencies and businesses across Mohali, Zirakpur, Kharar, and the wider Chandigarh Tricity region now expect marketers to produce more, faster, using AI — and the ones who can actually do it are getting paid better for it.";

/* -------------------------------------------------------------------------- *
 *                                 Compare                                     *
 * -------------------------------------------------------------------------- */

/**
 * The structured programme against what most people try first — the choice the
 * brief frames itself, in the columns this section renders.
 */
export const aiPoweredMarketingComparison: {
  aspect: string;
  icon: string;
  us: string;
  them: string;
}[] = [
  {
    aspect: "Where you practise",
    icon: "rocket",
    us: "Live Meta Ads and Google Ads accounts under trainer supervision.",
    them: "Simulated exercises, or nothing at all.",
  },
  {
    aspect: "Feedback",
    icon: "users",
    us: "A trainer reviews your weekly output and you correct it the following week.",
    them: "Free videos, and no one to tell you what went wrong.",
  },
  {
    aspect: "Structure",
    icon: "layers",
    us: "A deadline attached to every module, from fundamentals through to a portfolio capstone.",
    them: "Months of drifting between tutorials.",
  },
  {
    aspect: "What you can show",
    icon: "cube",
    us: "A documented portfolio of AI-assisted campaigns you can explain in an interview.",
    them: "Notes, and knowledge you cannot demonstrate.",
  },
  {
    aspect: "On completion",
    icon: "certificate",
    us: "A certificate, a documented internship letter and interview preparation.",
    them: "A completion badge nobody asks to see.",
  },
  {
    aspect: "Afterwards",
    icon: "briefcase",
    us: "A placement cell that genuinely calls employers across Mohali and the Tricity.",
    them: "You, alone, applying cold.",
  },
];

/* -------------------------------------------------------------------------- *
 *                                   FAQs                                      *
 * -------------------------------------------------------------------------- */

export const aiPoweredMarketingFaqs: { q: string; a: string }[] = [
  {
    q: "What is a ChatGPT & AI Tools course in Mohali?",
    a: "A ChatGPT & AI Tools course teaches students how to use ChatGPT and other modern AI platforms for prompting, research, content creation, productivity, design, data-related tasks and automation. It is suitable for beginners who want practical AI skills.",
  },
  {
    q: "Who can join a ChatGPT & AI Tools course?",
    a: "The course can be suitable for 12th-pass students, college students, graduates, job seekers, freelancers, working professionals and business owners. You generally do not need advanced programming knowledge to begin learning AI productivity tools.",
  },
  {
    q: "Do I need coding knowledge to learn ChatGPT and AI tools?",
    a: "No. Basic AI tools such as ChatGPT, Claude, Perplexity, Canva AI and Notion AI can be learned without advanced coding. The focus is on understanding AI applications, writing effective prompts and creating practical workflows.",
  },
  {
    q: "What will I learn in a ChatGPT & AI Tools course?",
    a: "Students can learn Generative AI fundamentals, prompt engineering, AI-assisted content creation, research, productivity, visual content creation, data-related workflows and automation. Practical projects can help learners apply these concepts.",
  },
  {
    q: "Which AI tools are covered in the course?",
    a: "The learning ecosystem includes tools such as ChatGPT, Claude, Perplexity, Canva AI, Notion AI, Zapier, Make and Excel. The exact tools and features may evolve as AI platforms are updated.",
  },
  {
    q: "Is ChatGPT training useful for students?",
    a: "Yes. Students can use AI tools for brainstorming, research, summarising information, creating study material, presentations, organising tasks and improving productivity. Learning responsible AI usage is important because AI-generated information should always be reviewed and verified.",
  },
  {
    q: "Can graduates learn AI tools for career development?",
    a: "Yes. Graduates can use AI skills alongside their existing qualification. Depending on their background, AI tools can support areas such as digital marketing, content creation, research, business operations, productivity and automation.",
  },
  {
    q: "Can I use AI skills for freelancing?",
    a: "AI tools can support several freelance services, including content assistance, research, social media work, presentation creation, design support and workflow automation. However, successful freelancing also requires communication, quality control, creativity and client-management skills.",
  },
  {
    q: "What is the difference between learning ChatGPT and learning AI tools?",
    a: "Learning ChatGPT focuses primarily on one AI platform. A broader ChatGPT & AI Tools course introduces students to multiple platforms and shows how different tools can be combined for practical tasks, productivity and automation.",
  },
  {
    q: "Will I work on practical projects during the course?",
    a: "A practical programme should include hands-on activities and projects so students can apply what they learn. Project-based learning can help learners develop work samples that demonstrate their ability to use AI tools rather than simply listing AI skills on a resume.",
  },
  {
    q: "Is an AI tools course useful for non-technical students?",
    a: "Yes. AI productivity tools can be applied across many fields, including commerce, management, marketing, education, design and general business operations. Non-technical students can start with no-code AI applications and gradually explore more advanced areas.",
  },
  {
    q: "Why choose Techcadd for ChatGPT & AI Tools training in Mohali?",
    a: "Techcadd focuses on practical AI applications, multiple AI tools, project-based learning and career-oriented development. For students in Mohali and the Chandigarh Tricity region, this provides an opportunity to learn AI tools in a structured training environment while building practical skills.",
  },
];

/* -------------------------------------------------------------------------- *
 *                                 Reviews                                     *
 * -------------------------------------------------------------------------- */

/**
 * The ten reviews from the brief, attributed the way they were given — by the
 * kind of learner and the locality, not by a name the brief does not supply —
 * and each recorded at the five stars it carries.
 *
 * The brief's own local-review note applies: on the live site these should be
 * genuine student feedback, ideally naming the course experience, the learning
 * outcome, the project completed and the locality where permission was given,
 * rather than generic five-star testimonials.
 */
export const aiPoweredMarketingReviews: CourseReview[] = [
  {
    name: "Student",
    role: "1. Practical AI Learning",
    company: "Mohali",
    quote:
      "“I joined the ChatGPT & AI Tools course to understand how AI is actually used in work. The practical activities helped me understand prompting, research and productivity much better than just watching online tutorials.”",
    rating: 5,
    initials: "ST",
  },
  {
    name: "Student",
    role: "2. Helpful for Beginners",
    company: "Chandigarh Tricity",
    quote:
      "“I had almost no technical knowledge of AI before starting. The concepts were explained step by step, and I was able to start using ChatGPT and other AI tools confidently.”",
    rating: 5,
    initials: "ST",
  },
  {
    name: "College Student",
    role: "3. Useful for College Students",
    company: "Mohali",
    quote:
      "“As a college student, I wanted to learn something that could improve my productivity and future career options. The AI tools and project-based learning were the most useful parts for me.”",
    rating: 5,
    initials: "CS",
  },
  {
    name: "Graduate",
    role: "4. Beyond ChatGPT",
    company: "Mohali",
    quote:
      "“Initially, I thought the course would only teach ChatGPT. I was surprised to learn about different AI tools for research, design, productivity and automation. It gave me a much broader understanding of AI.”",
    rating: 5,
    initials: "GR",
  },
  {
    name: "Job Seeker",
    role: "5. Career-Oriented Approach",
    company: "Kharar",
    quote:
      "“What I liked most was the career-focused approach. We were not only learning tools but also discussing how AI skills can be used in different jobs, freelancing and digital work.”",
    rating: 5,
    initials: "JS",
  },
  {
    name: "Digital Marketing Learner",
    role: "6. AI for Content Creation",
    company: "Mohali",
    quote:
      "“I was interested in digital marketing, so learning how AI can help with content ideas, research and social media work was very useful. The practical exercises made the concepts easier to remember.”",
    rating: 5,
    initials: "DM",
  },
  {
    name: "Graduate",
    role: "7. Project Experience",
    company: "Chandigarh",
    quote:
      "“The project work helped me understand how different AI tools can be combined for an actual task. It was much more useful than simply collecting certificates from online courses.”",
    rating: 5,
    initials: "GR",
  },
  {
    name: "12th-Pass Student",
    role: "8. Easy-to-Understand Training",
    company: "Mohali",
    quote:
      "“The trainers explained AI concepts in a simple way and encouraged us to experiment with different prompts and tools. It was a comfortable learning experience even though I was completely new to AI.”",
    rating: 5,
    initials: "12",
  },
  {
    name: "Working Professional",
    role: "9. Useful for Professional Growth",
    company: "Mohali",
    quote:
      "“I wanted to learn AI because so many companies are using it now. The course helped me understand practical applications instead of just learning AI terminology.”",
    rating: 5,
    initials: "WP",
  },
  {
    name: "Student",
    role: "10. Good Starting Point for AI",
    company: "Chandigarh Tricity",
    quote:
      "“For someone starting their AI journey, this course provides a good foundation. I learned about prompting, AI productivity, research, creative tools and automation, and now I have a clearer idea of what I want to learn next.”",
    rating: 5,
    initials: "ST",
  },
];
