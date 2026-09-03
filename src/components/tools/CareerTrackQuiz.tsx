"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { categories, getCourse, type CategoryKey } from "@/lib/courses";
import Icon from "@/components/ui/Icon";

type Option = { title: string; desc: string; category: CategoryKey };
type Question = { label: string; question: string; sub: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    label: "Interest",
    question: "Which of these would you happily do for a whole afternoon?",
    sub: "Pick the one you would not have to force yourself through.",
    options: [
      {
        title: "Build a working app or website",
        desc: "Writing code, watching a screen come alive, fixing what breaks.",
        category: "development",
      },
      {
        title: "Draw and model a real object",
        desc: "Dimensions, sections, assemblies — a part that could be manufactured.",
        category: "cad-design",
      },
      {
        title: "Grow a page's traffic and enquiries",
        desc: "Keywords, ad copy, analytics, and the numbers moving week on week.",
        category: "digital-marketing",
      },
      {
        title: "Set up servers and keep them running",
        desc: "Linux, deployments, backups, and being the one who fixes it at 2am.",
        category: "cyber-cloud",
      },
    ],
  },
  {
    label: "Background",
    question: "Which subject pulled you in at school or college?",
    sub: "Whatever came easiest, not what you think sounds impressive.",
    options: [
      {
        title: "Maths, statistics or physics",
        desc: "You'd rather find the pattern than memorise the formula.",
        category: "ai-data",
      },
      {
        title: "Computer science or coding classes",
        desc: "Loops and logic made more sense to you than most subjects.",
        category: "programming",
      },
      {
        title: "Art or technical drawing",
        desc: "You think in shapes, layouts and how things fit together.",
        category: "cad-design",
      },
      {
        title: "Business, economics or communication",
        desc: "You notice what makes people click, buy or reply.",
        category: "digital-marketing",
      },
    ],
  },
  {
    label: "Reward",
    question: "What would make a work day feel like a win?",
    sub: "Pick the outcome you would actually feel proud of.",
    options: [
      {
        title: "Cracking a bug nobody else could find",
        desc: "The satisfaction of a stack trace finally making sense.",
        category: "programming",
      },
      {
        title: "Spotting the pattern in a messy dataset",
        desc: "Turning a spreadsheet nobody wanted to touch into an answer.",
        category: "ai-data",
      },
      {
        title: "Catching a threat before it becomes a breach",
        desc: "Being the reason nothing went wrong today.",
        category: "cyber-cloud",
      },
      {
        title: "A campaign report with the numbers trending up",
        desc: "Proof that what you built actually worked.",
        category: "digital-marketing",
      },
    ],
  },
  {
    label: "Goal",
    question: "What's the plan for the next 6–12 months?",
    sub: "Where you want to be standing this time next year.",
    options: [
      {
        title: "Ship real software and land a developer role",
        desc: "Portfolio projects, a GitHub that looks lived-in, interview-ready code.",
        category: "development",
      },
      {
        title: "Get fluent in AI and data tools",
        desc: "Move from curious about AI to actually building with it.",
        category: "ai-data",
      },
      {
        title: "Move into cloud, networking or security",
        desc: "Certifications and hands-on labs, not just theory.",
        category: "cyber-cloud",
      },
      {
        title: "Get hands-on with CAD for a design role",
        desc: "Drawings and models that meet a real production standard.",
        category: "cad-design",
      },
    ],
  },
];

const PRIMARY_COURSE: Record<CategoryKey, string> = {
  development: "mern-full-stack",
  "cad-design": "autocad",
  "digital-marketing": "digital-marketing",
  "cyber-cloud": "cyber-security",
  "ai-data": "artificial-intelligence",
  programming: "python-programming",
};

const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function CareerTrackQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(CategoryKey | null)[]>([null, null, null, null]);
  const [pending, setPending] = useState<number | null>(null);

  const done = step >= QUESTIONS.length;

  const result = useMemo(() => {
    if (!done) return null;
    const tally = new Map<CategoryKey, number>();
    for (const a of answers) {
      if (!a) continue;
      tally.set(a, (tally.get(a) ?? 0) + 1);
    }
    let winner: CategoryKey = categories[0].key;
    let best = -1;
    for (const c of categories) {
      const score = tally.get(c.key) ?? 0;
      if (score > best) {
        best = score;
        winner = c.key;
      }
    }
    const category = categories.find((c) => c.key === winner)!;
    const course = getCourse(PRIMARY_COURSE[winner])!;
    return { category, course };
  }, [answers, done]);

  const choose = (index: number, category: CategoryKey) => {
    if (pending !== null) return;
    setPending(index);
    setTimeout(() => {
      setAnswers((prev) => {
        const next = [...prev];
        next[step] = category;
        return next;
      });
      setStep((s) => s + 1);
      setPending(null);
    }, 240);
  };

  const goBack = () => {
    if (step === 0) return;
    setStep((s) => s - 1);
  };

  const retake = () => {
    setAnswers([null, null, null, null]);
    setStep(0);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #career-roadmap, #career-roadmap * { visibility: visible; }
          #career-roadmap { position: absolute; inset: 0; margin: 0; box-shadow: none; border: none; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Step indicator */}
      <div data-anim="up" className="mb-8 flex items-center justify-center">
        {QUESTIONS.map((q, i) => (
          <div key={q.label} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors ${
                  i < step
                    ? "bg-up-accent text-white"
                    : i === step && !done
                      ? "bg-up-accent text-white"
                      : "border border-up-line bg-white text-up-muted"
                }`}
              >
                {i < step ? <Icon name="check" size={15} strokeWidth={3} /> : i + 1}
              </span>
              <span
                className={`text-xs font-medium ${
                  i <= step && !done ? "text-up-ink" : "text-up-muted"
                }`}
              >
                {q.label}
              </span>
            </div>
            {i < QUESTIONS.length - 1 && (
              <span
                className={`mx-2 mb-5 h-px w-10 sm:w-16 ${i < step ? "bg-up-accent" : "bg-up-line"}`}
              />
            )}
          </div>
        ))}
      </div>

      <div
        id="career-roadmap"
        className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_30px_80px_-50px_rgba(11,26,77,0.4)] sm:p-10"
      >
        {!done ? (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-accent">
              Question {step + 1} of {QUESTIONS.length}
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold leading-snug text-up-ink sm:text-3xl">
              {QUESTIONS[step].question}
            </h2>
            <p className="mt-2 text-sm text-up-muted">{QUESTIONS[step].sub}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {QUESTIONS[step].options.map((opt, i) => (
                <button
                  key={opt.title}
                  onClick={() => choose(i, opt.category)}
                  className={`group flex items-start gap-3 rounded-2xl border p-5 text-left transition-all ${
                    pending === i
                      ? "border-up-accent bg-brand-50"
                      : "border-up-line bg-white hover:-translate-y-0.5 hover:border-up-accent hover:bg-brand-50/60"
                  }`}
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-up-line text-[0.65rem] font-bold text-up-muted transition-colors group-hover:border-up-accent group-hover:text-up-accent">
                    {OPTION_LETTERS[i]}
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-bold text-up-ink">{opt.title}</span>
                    <span className="mt-1 block text-[0.82rem] leading-relaxed text-up-muted">
                      {opt.desc}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={goBack}
                className="no-print mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-up-muted transition-colors hover:text-up-accent"
              >
                <Icon name="arrowRight" size={14} className="rotate-180" />
                Back
              </button>
            )}
          </>
        ) : (
          result && (
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-accent">
                Your best-fit track
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white ${result.category.accent}`}
                >
                  <Icon name={result.category.icon} size={22} />
                </span>
                <h2 className="font-display text-2xl font-extrabold leading-snug text-up-ink sm:text-3xl">
                  {result.category.title}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-up-muted">{result.category.blurb}</p>

              <div className="mt-8 rounded-2xl border border-line bg-subtle p-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-up-muted">
                  Recommended course
                </p>
                <h3 className="mt-2 text-lg font-bold text-up-ink">{result.course.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-up-muted">{result.course.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-up-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="clock" size={13} className="text-up-accent" />
                    {result.course.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="briefcase" size={13} className="text-up-accent" />
                    {result.course.roles.slice(0, 2).join(" · ")}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-up-muted">
                  Your 90-day roadmap
                </p>
                <ul className="mt-4 space-y-4">
                  {[
                    {
                      title: "Free counselling call",
                      body: `Confirm ${result.course.title} is the right fit and lock a batch that matches your schedule.`,
                    },
                    {
                      title: `Start ${result.course.title}`,
                      body: `${result.course.duration} of live, project-based classes with a working trainer.`,
                    },
                    {
                      title: "Portfolio piece + placement support",
                      body: "Finish with a project you can show in interviews and introductions to our hiring partners.",
                    },
                  ].map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-bold text-up-accent">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-up-ink">{s.title}</span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-up-muted">
                          {s.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="no-print mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-hero-600 to-hero-glow px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-hero-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Talk to a counsellor
                  <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={`/courses?category=${result.category.key}`}
                  className="inline-flex items-center gap-2 rounded-full border border-up-line px-6 py-3.5 text-sm font-semibold text-up-ink transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
                >
                  See matching courses
                </Link>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-full border border-up-line px-6 py-3.5 text-sm font-semibold text-up-ink transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
                >
                  <Icon name="download" size={16} />
                  Download as PDF
                </button>
              </div>

              <button
                onClick={retake}
                className="no-print mt-6 text-sm font-semibold text-up-muted transition-colors hover:text-up-accent"
              >
                Retake the quiz
              </button>

              <p className="no-print mt-8 border-t border-line pt-6 text-sm text-up-muted">
                Need this for university-mandated training?{" "}
                <Link href="/tools/training-matcher" className="font-semibold text-up-accent hover:underline">
                  Match your semester to a live project track
                </Link>
                .
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
