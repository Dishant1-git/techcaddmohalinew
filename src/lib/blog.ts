export type BlogCategory =
  | "Career Advice"
  | "Placements"
  | "AI & Data"
  | "Web Development"
  | "Digital Marketing"
  | "Cyber Security"
  | "CAD & Design";

export const categoryArt: Record<BlogCategory, string> = {
  "Career Advice": "from-brand-400 to-hero-900",
  Placements: "from-accent-yellow to-hero-glow",
  "AI & Data": "from-accent-glow to-hero-glow",
  "Web Development": "from-hero-glow to-brand-700",
  "Digital Marketing": "from-accent-yellow to-accent-500",
  "Cyber Security": "from-up-soft to-hero-600",
  "CAD & Design": "from-accent-400 to-hero-800",
};

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "45-days-vs-6-months-training",
    title: "45 Days vs 6 Months Training: Which One Actually Gets You Hired?",
    category: "Career Advice",
    excerpt:
      "A straight comparison of what each track covers, who it's built for, and when the shorter option is genuinely enough.",
    author: "Training Team",
    date: "2026-07-14",
    readTime: "6 min read",
    body: [
      "The honest answer is: it depends on what you're missing, not how much time you have. A 45-day track is built to teach one technology deeply enough to build a working project — it's a sprint, not a career change. A 6-month track rebuilds the whole stack from fundamentals to deployment, with a live client-style project and an internship letter attached.",
      "If you already have a related degree and just need one modern skill — say, a CS graduate picking up React — 45 days is usually plenty. You already understand programming logic; you're filling one gap. If you're switching fields entirely, or you're a fresher with no practical exposure, the compressed version leaves too many gaps that show up in interviews.",
      "The tell is usually in the portfolio. Recruiters can spot a 45-day project a mile off — it's competent but thin. A 6-month track produces something closer to what a junior developer ships in their first real job, because that's structurally what the programme is designed to simulate.",
      "Our counsellors map this against your actual background in the free consultation call, not a generic recommendation — it's the first thing we ask before suggesting a track.",
    ],
  },
  {
    slug: "learn-to-code-or-learn-to-prompt",
    title: "Should You Learn to Code or Learn to Prompt? A 2026 Reality Check",
    category: "Career Advice",
    excerpt:
      "AI tools write code faster than ever — here's what that actually changes about which skills are worth building.",
    author: "AI & Data Faculty",
    date: "2026-06-02",
    readTime: "7 min read",
    body: [
      "Every batch this year has asked some version of this question, and it's a fair one. AI coding assistants genuinely do write boilerplate faster than a junior developer. What they don't do is decide what to build, catch a subtle logic error in a payment flow, or debug a race condition that only shows up under load.",
      "The skill that's dropped in value is typing syntax from memory. The skill that's gone up in value is reading and reasoning about code someone — or something — else wrote, because that's now most of the job. Prompting is a real, useful skill on top of that, not a replacement for it.",
      "Practically: still learn to code properly. Learn data structures, learn how a request actually moves through a web app, learn to read a stack trace. Then learn to use AI tools well on top of that foundation — that combination is what's actually in demand, not either skill alone.",
      "Every track we teach — from Python to the Generative AI course — treats AI tools as part of the workflow, not a separate topic, for exactly this reason.",
    ],
  },
  {
    slug: "read-job-description-like-a-recruiter",
    title: "How to Read a Job Description Like a Recruiter",
    category: "Career Advice",
    excerpt:
      "Most postings list ten skills but test three. Here's how our placement cell decodes what actually matters.",
    author: "Placement Cell",
    date: "2026-05-20",
    readTime: "5 min read",
    body: [
      "A job description is written by three different people — HR, the hiring manager, and whoever copied last year's posting — stitched together. That's why you'll see 'expert in 12 technologies' for a fresher role. Almost nobody is tested on all twelve.",
      "Look for what's repeated across the responsibilities and the requirements section — that's usually the real must-have. A skill that appears once in a long bullet list, especially near the bottom, is often a nice-to-have that got added for search visibility.",
      "The requirements that come with a number attached ('2+ years', '500ms response time', 'handled 10k requests/day') tell you what the interview will actually probe. Vague adjectives ('strong communication', 'passionate about tech') rarely get tested directly — they get judged from how you talk about your projects.",
      "We walk through real postings from our hiring partners during placement prep, line by line, so this stops being guesswork by the time you're actually applying.",
    ],
  },
  {
    slug: "what-hiring-partners-ask-first-round",
    title: "What Our Hiring Partners Actually Ask in a First-Round Interview",
    category: "Placements",
    excerpt:
      "Patterns from 450+ partner companies — the questions that repeat across full-stack, data and marketing roles.",
    author: "Placement Cell",
    date: "2026-08-01",
    readTime: "6 min read",
    body: [
      "Across every technical role, the single most repeated first-round question is some version of 'walk me through a project you built' — not a trivia question, not a whiteboard puzzle. What separates candidates isn't the project's complexity; it's whether they can explain a decision they made and why they made it instead of memorising a script.",
      "For development roles, expect one question that tests whether you actually wrote the code yourself — a small bug to spot, or 'what would happen if this input were empty'. For data and marketing roles, expect a case-style question: given this dataset or this campaign result, what would you do next.",
      "Almost every partner also asks some form of 'tell me about a time something didn't work and what you did about it'. This is the one candidates prepare for least and it shows — have one real story ready, not a hypothetical.",
      "Our mock interview rounds are run by people who've sat on the other side of this table, using exactly this pattern, before you sit in front of a real panel.",
    ],
  },
  {
    slug: "zero-experience-to-offer-letter",
    title: "From Zero Experience to Offer Letter: Three Student Timelines",
    category: "Placements",
    excerpt:
      "Three real training-to-placement timelines, month by month, from students who started with no coding background.",
    author: "Placement Cell",
    date: "2026-04-18",
    readTime: "8 min read",
    body: [
      "Timeline one: a B.Com graduate with zero technical background joined the 6-month MERN track. Months one and two were entirely fundamentals — HTML, CSS, JavaScript — with no shortcuts. By month four she was contributing to the batch's live project. She had two interview calls in month six and an offer within three weeks of finishing.",
      "Timeline two: a mechanical engineering student joined AutoCAD straight after final semester, already comfortable with technical drawing from his coursework. Two months of focused SolidWorks training later, plus a portfolio of manufacturing-standard drawing sets, and he was placed with a Punjab auto-ancillary firm before his batchmates finished their degree formalities.",
      "Timeline three: a working professional in a non-technical role took the Digital Marketing course on evening batches over four months while keeping her day job. She ran real ad budgets during the course, built a documented case study, and moved into a marketing role at an agency two months after finishing — without ever quitting her job mid-training.",
      "The common thread isn't talent — it's that all three treated the live project phase as the actual job, not an assignment.",
    ],
  },
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs Fine-Tuning: What You Actually Need to Ship an AI Product",
    category: "AI & Data",
    excerpt:
      "Most teams reach for fine-tuning when a retrieval pipeline would have shipped faster and cheaper. Here's how to choose.",
    author: "AI & Data Faculty",
    date: "2026-07-29",
    readTime: "7 min read",
    body: [
      "Fine-tuning sounds like the 'serious' option, so it's often the default reach — but it's solving a narrower problem than most teams think. It changes how a model behaves or writes; it doesn't reliably teach it new facts, and it needs to be redone every time your underlying information changes.",
      "Retrieval-augmented generation solves the far more common problem: 'answer questions using our documents, correctly, with citations, and stay current when those documents change.' You update a vector index instead of retraining a model, which is both cheaper and faster to iterate on.",
      "The honest rule of thumb: reach for RAG first for anything knowledge-based. Reach for fine-tuning only when you need a specific tone, format or behaviour that prompting and retrieval genuinely can't get you — and even then, often only after RAG alone proves insufficient.",
      "This exact decision — and how to evaluate it rather than guess — is a full module in our Generative AI course, built around a retrieval assistant students ship themselves.",
    ],
  },
  {
    slug: "sql-underrated-data-science-skill",
    title: "SQL Is Still the Most Underrated Data Science Skill",
    category: "AI & Data",
    excerpt:
      "Before Pandas, before scikit-learn — the query language that decides whether your analysis is even asking the right question.",
    author: "AI & Data Faculty",
    date: "2026-03-11",
    readTime: "5 min read",
    body: [
      "Every new batch is eager to get to machine learning models, and every batch is surprised by how much of the actual job is SQL. Most companies don't hand you a clean CSV — they hand you database access and a vague business question, and getting from one to the other is a query problem before it's a modelling problem.",
      "A model trained on the wrong slice of data because of a bad join is worse than no model at all — it's confidently wrong. Window functions, correct joins, and knowing when to aggregate versus filter catch more real-world data errors than any amount of algorithm tuning.",
      "It's also the fastest way to look competent in an interview. A candidate who can write a clean, correct query live reads as more hireable than one who can recite the difference between bagging and boosting from memory.",
      "Every analytics and data track we run — Data Analytics, Data Science, and Data Analyst prep — puts SQL in week one for exactly this reason, not as an afterthought before the 'interesting' modules.",
    ],
  },
  {
    slug: "mern-2026-whats-changed",
    title: "MERN in 2026: What's Changed Since You Last Checked",
    category: "Web Development",
    excerpt:
      "Server components, the App Router, and a few libraries that quietly replaced what used to take a full stack to build.",
    author: "Training Team",
    date: "2026-08-15",
    readTime: "6 min read",
    body: [
      "If you learned React a few years ago and stopped, the biggest shift isn't a new library — it's where code runs. Server components let you fetch data and render markup on the server by default, with client-side interactivity opted into deliberately, instead of the other way around.",
      "Routing has moved from a single client-side router to a file-based system that understands layouts, loading states and errors as first-class concepts, which used to take a fair amount of boilerplate to hand-roll.",
      "On the backend side, the fundamentals — Express, MongoDB, REST design — haven't changed much, which is reassuring. What's changed is how much of the 'glue' code you used to write by hand is now handled by the framework, which means more of your time goes to the actual product logic.",
      "Our MERN Full Stack track is refreshed every cohort against exactly this kind of shift, so what you deploy in your final project reflects what teams are actually shipping with today.",
    ],
  },
  {
    slug: "why-your-portfolio-project-isnt-getting-callbacks",
    title: "Why Your Portfolio Project Isn't Getting Callbacks",
    category: "Web Development",
    excerpt:
      "It's rarely the tech stack. It's almost always one of these five things missing from the README.",
    author: "Placement Cell",
    date: "2026-02-24",
    readTime: "6 min read",
    body: [
      "It's almost never that a recruiter thinks your tech stack is wrong. It's usually that they can't quickly tell what the project does, why you built it, and what was hard about it — because that's all they're actually scanning for in the thirty seconds they spend on your GitHub link.",
      "The five gaps we see most often: no live deployed link (a screenshot is not the same as a working demo), a README that lists tech but not decisions, no mention of what you'd do differently now, commit history that's a single 'final commit', and no tests or error handling visible anywhere in the code.",
      "None of these take long to fix, and fixing them changes how the same project reads entirely. A deployed link with a two-paragraph 'why I built this and what I'd improve' section does more work than adding a fourth framework to the stack.",
      "We review every student's portfolio against this exact checklist before placement drives begin — it's a fifteen-minute fix that changes a real number of callbacks.",
    ],
  },
  {
    slug: "local-seo-punjab-businesses",
    title: "Local SEO for Punjab Businesses: What Actually Moves the Needle",
    category: "Digital Marketing",
    excerpt:
      "Google Business Profile fixes that outperform a month of blog posts, based on campaigns run in our own classroom labs.",
    author: "Digital Marketing Faculty",
    date: "2026-05-05",
    readTime: "5 min read",
    body: [
      "For a local business in Mohali or Chandigarh, the Google Business Profile usually matters more than the website's blog. It's what shows up in the map pack, and the map pack is where most 'near me' searches actually convert.",
      "The three fixes that consistently move rankings fastest: complete every field in the profile (not just name and address — categories, services, hours), get genuine reviews with the business replying to each one, and keep photos current, since Google visibly favours profiles that get regularly updated.",
      "A blog post targeting 'best plumber in Mohali' competes against every plumber's blog post. A well-optimised, actively maintained Business Profile competes in a much smaller, much more winnable field — the map pack for that exact search.",
      "Students in the Digital Marketing course run this playbook on real local business accounts as part of the course, not simulated data, so the results in front of you are what a client would actually see.",
    ],
  },
  {
    slug: "first-5000-ad-budget",
    title: "Running Your First ₹5,000 Ad Budget Without Wasting It",
    category: "Digital Marketing",
    excerpt:
      "A beginner's framework for testing creative, audience and budget before you scale spend on Meta or Google Ads.",
    author: "Digital Marketing Faculty",
    date: "2026-01-30",
    readTime: "6 min read",
    body: [
      "The most common first-campaign mistake is testing everything at once — three audiences, four creatives, two offers — and then having no idea which variable actually caused the result. With a small budget, you can't afford that noise.",
      "Split ₹5,000 into small, deliberate tests: run one audience against two creatives first, let it run long enough to be statistically meaningful even at that budget, then decide. Only change one variable between tests, or you're back to guessing.",
      "Track cost-per-result, not just impressions or clicks — clicks feel good and mean very little on their own. And set a hard stop-loss per test upfront, before you launch it, so a bad early result doesn't turn into a wasted budget out of sunk-cost thinking.",
      "This exact framework — with real budgets, not simulations — is how every Digital Marketing batch runs their paid ads module.",
    ],
  },
  {
    slug: "ethical-hacking-where-the-line-is",
    title: "Ethical Hacking Isn't Illegal — Here's Where the Line Actually Is",
    category: "Cyber Security",
    excerpt: "Scope, consent and documentation: the three things that separate a penetration test from a crime.",
    author: "Cyber Security Faculty",
    date: "2026-06-19",
    readTime: "5 min read",
    body: [
      "The legal difference between ethical hacking and a crime isn't the technique — the same tools, the same scans, the same exploits are used on both sides. The difference is whether you had written authorisation to do it, on that specific system, within a defined scope, before you started.",
      "A proper engagement starts with a scope document: which systems are in bounds, which are explicitly off-limits, what testing windows are allowed, and who to contact if something breaks. Testing anything outside that document — even accidentally, even on the same network — is where students get nervous, and rightly so.",
      "Documentation matters just as much as the testing itself. A penetration test that finds real vulnerabilities but produces no clear, actionable report has failed at the actual job, which is helping the client fix things, not just proving you could break in.",
      "Every exercise in our Cyber Security and Ethical Hacking courses runs on an isolated lab network with this exact discipline, so the habits — not just the tools — are what you walk away with.",
    ],
  },
  {
    slug: "autocad-vs-solidworks-mechanical-fresher",
    title: "AutoCAD vs SolidWorks: Which Should a Mechanical Fresher Learn First?",
    category: "CAD & Design",
    excerpt: "They solve different problems. Here's how to pick based on the industry you actually want to work in.",
    author: "CAD Faculty",
    date: "2026-08-22",
    readTime: "5 min read",
    body: [
      "AutoCAD is fundamentally a drafting tool — precise 2D drawings and documentation, plus 3D where needed. SolidWorks is a parametric modelling tool built around 3D part design, assemblies and simulation from the ground up. They overlap, but they're built for different jobs.",
      "If you're heading toward civil, architectural, or general drafting and documentation work, AutoCAD is the more direct route — it's still the industry standard for drawing sets and site layouts. If you're heading toward mechanical product design, machine parts or manufacturing, SolidWorks' parametric assemblies are closer to what you'll use daily.",
      "Most employers in Punjab's manufacturing and auto-ancillary sector expect at least working AutoCAD knowledge regardless of which one is your specialty, since drawing sets still get handed off in that format industry-wide.",
      "Students who aren't sure often start with AutoCAD's two-month track for the fundamentals, then move into SolidWorks once they've confirmed which direction their projects are actually pulling them.",
    ],
  },
];

export const blogCategories = Array.from(new Set(blogPosts.map((p) => p.category))) as BlogCategory[];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
