import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamMarquee from "@/components/about/TeamMarquee";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Founder — Mr. Gourav Gupta",
  description:
    "Mr. Gourav Gupta, Founder & CEO of techcadd — his story, his vision for bridging academics and industry, and how it shapes every batch that runs at the institute.",
};

const badges = ["Visionary Entrepreneur", "Technology Educator", "Skill Development Advocate"];

const impactStats = [
  { value: "2016", suffix: "", label: "Year he founded techcadd" },
  { value: "15", suffix: "+", label: "Years of excellence" },
  { value: "12,450", suffix: "+", label: "Students trained" },
  { value: "450", suffix: "+", label: "Hiring partners" },
];

const credentials = [
  {
    title: "ISO Certified",
    body: "An externally audited quality-management process behind how the training is designed and delivered.",
  },
  {
    title: "MSME Registered",
    body: "Registered as a genuine, government-recognised training business under the Udyam scheme.",
  },
  {
    title: "Startup India Recognised",
    body: "DPIIT-recognised under the Government of India's Startup India initiative.",
  },
];

const pillars = [
  {
    variant: "emerging" as const,
    title: "Emerging Technologies",
    body: "Moving the catalogue beyond conventional computer education into AI, cloud, cyber security and automation.",
    span: "lg:col-span-3",
  },
  {
    variant: "practical" as const,
    title: "Practical Training",
    body: "Learning built on projects and hands-on work rather than theory alone.",
    span: "lg:col-span-3",
  },
  {
    variant: "industry" as const,
    title: "Industry Engagement",
    body: "Working with employers and institutions so what is taught tracks what is actually hired for.",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    variant: "career" as const,
    title: "Career Development",
    body: "Counselling, placement support and career pathways treated as part of the programme, not an afterthought.",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    variant: "innovation" as const,
    title: "Innovation",
    body: "Bringing new technology into the classroom early, while it is still emerging.",
    span: "sm:col-span-2 lg:col-span-2",
  },
];

type PillarVariant = (typeof pillars)[number]["variant"];

function PillarArt({ variant }: { variant: PillarVariant }) {
  const line = "var(--color-line)";
  const brand = "var(--color-brand-600)";
  switch (variant) {
    case "emerging":
      return (
        <svg viewBox="0 0 200 140" className="h-full w-full px-6 py-4" fill="none" aria-hidden="true">
          <g stroke={line} strokeWidth={3} strokeLinecap="round">
            <path d="M76 34V20M100 34V20M124 34V20" />
            <path d="M76 106v14M100 106v14M124 106v14" />
            <path d="M64 58H50M64 70H50M64 82H50" />
            <path d="M136 58h14M136 70h14M136 82h14" />
          </g>
          <rect x="64" y="34" width="72" height="72" rx="14" stroke={line} strokeWidth={3} />
          <rect x="82" y="52" width="36" height="36" rx="8" fill={brand} fillOpacity={0.12} stroke={brand} strokeWidth={2.5} />
          <path d="M164 24l3.5 9 9 3.5-9 3.5-3.5 9-3.5-9-9-3.5 9-3.5 3.5-9Z" fill={brand} fillOpacity={0.55} />
        </svg>
      );
    case "practical":
      return (
        <svg viewBox="0 0 200 140" className="h-full w-full px-6 py-4" fill="none" aria-hidden="true">
          <rect x="26" y="24" width="148" height="92" rx="10" stroke={line} strokeWidth={3} />
          <path d="M26 46h148" stroke={line} strokeWidth={3} />
          <g fill={line}>
            <circle cx="41" cy="35" r="3.5" />
            <circle cx="53" cy="35" r="3.5" />
            <circle cx="65" cy="35" r="3.5" />
          </g>
          <g fill={line}>
            <rect x="40" y="60" width="64" height="7" rx="3.5" />
            <rect x="40" y="74" width="96" height="7" rx="3.5" />
            <rect x="40" y="88" width="44" height="7" rx="3.5" />
          </g>
          <rect x="98" y="84" width="50" height="17" rx="8.5" fill={brand} />
        </svg>
      );
    case "industry":
      return (
        <svg viewBox="0 0 200 140" className="h-full w-full px-6 py-4" fill="none" aria-hidden="true">
          <g stroke={line} strokeWidth={2.5}>
            <path d="M100 70 54 44M100 70l46-26M100 70 54 96M100 70l46 26" />
          </g>
          <circle cx="100" cy="70" r="38" stroke={line} strokeWidth={2} strokeDasharray="4 7" />
          <circle cx="100" cy="70" r="20" fill={brand} fillOpacity={0.12} stroke={brand} strokeWidth={2.5} />
          <circle cx="100" cy="70" r="7" fill={brand} />
          <g fill="white" stroke={line} strokeWidth={2.5}>
            <circle cx="54" cy="44" r="11" />
            <circle cx="146" cy="44" r="11" />
            <circle cx="54" cy="96" r="11" />
            <circle cx="146" cy="96" r="11" />
          </g>
        </svg>
      );
    case "career":
      return (
        <svg viewBox="0 0 200 140" className="h-full w-full px-6 py-4" fill="none" aria-hidden="true">
          <path d="M32 112h136" stroke={line} strokeWidth={3} strokeLinecap="round" />
          <g fill={line}>
            <rect x="42" y="88" width="16" height="24" rx="4" />
            <rect x="68" y="76" width="16" height="36" rx="4" />
            <rect x="94" y="82" width="16" height="30" rx="4" />
          </g>
          <g fill={brand}>
            <rect x="120" y="60" width="16" height="52" rx="4" fillOpacity={0.5} />
            <rect x="146" y="42" width="16" height="70" rx="4" />
          </g>
          <path
            d="M50 78 76 66l26 6 26-22 26-18"
            stroke={brand}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="5 6"
          />
        </svg>
      );
    case "innovation":
      return (
        <svg viewBox="0 0 200 140" className="h-full w-full px-6 py-4" fill="none" aria-hidden="true">
          <g stroke={line} strokeWidth={3} strokeLinecap="round">
            <path d="M100 18v10M64 34l7 7M136 34l-7 7M46 70h10M144 70h10" />
          </g>
          <circle cx="100" cy="66" r="28" fill={brand} fillOpacity={0.1} stroke={brand} strokeWidth={2.5} />
          <path
            d="M92 62c0-6 4-10 8-10s8 4 8 10c0 4-3 6-4 10h-8c-1-4-4-6-4-10Z"
            stroke={brand}
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
          <g stroke={line} strokeWidth={3} strokeLinecap="round">
            <path d="M90 100h20M93 110h14" />
          </g>
        </svg>
      );
  }
}

const engagements = [
  {
    tag: "IKGPTU · 2025",
    title: "Pre-placement talk at I.K. Gujral Punjab Technical University",
    body: "IKGPTU identifies Mr. Gourav Gupta as Founder & CEO of techcadd, and hosted him for a pre-placement talk and interaction with students during techcadd's 2025 campus placement drive.",
  },
  {
    tag: "Workshops",
    title: "Technology workshops at educational institutions",
    body: "He has participated in technology-focused workshops and discussions covering Artificial Intelligence, robotics, cyber security and other emerging technologies.",
  },
];

const timeline = [
  {
    label: "Before 2016",
    title: "The gap he kept seeing",
    body: "Working alongside technical graduates, one pattern repeated: strong marks, complete syllabi, and no evidence. Students could describe a technology without ever having shipped anything with it, and interviewers in Jalandhar had learned to stop asking about coursework.",
  },
  {
    label: "2016",
    title: "techcadd opens in Jalandhar",
    body: "The institute started with a single principle carried over from that observation: a student should leave with work an employer can open and inspect. Live client briefs went into the syllabus from the beginning rather than being added as a capstone at the end.",
  },
  {
    label: "The model",
    title: "Practitioners in the classroom",
    body: "Trainers stayed on live delivery work instead of moving into full-time teaching, so the examples in class came from the current quarter. Small batches kept it possible for a trainer to look at every student's screen, which is what makes correction daily rather than occasional.",
  },
  {
    label: "Today",
    title: "A network across Punjab",
    body: "techcadd now runs across Jalandhar, Ludhiana, Hoshiarpur, Phagwara, Amritsar, Patiala, Bathinda and Mukerian, works with universities on industrial training and placement drives, and continues under Mr. Gourav Gupta as Founder and CEO.",
  },
];

export default function FounderPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Founder" }]} eyebrow="Founder" title="Mr. Gourav Gupta" subtitle="Founder & CEO, techcadd">
        <ul data-anim="up" data-anim-delay="0.2" className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-up-soft/80">
          {badges.map((b, i) => (
            <li key={b} className="inline-flex items-center gap-3">
              {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-accent-glow" />}
              {b}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* The Founder */}
      <section className="bg-subtle py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="The founder"
              title={
                <>
                  Making young people <span className="text-up-accent">capable and confident</span> with
                  technology.
                </>
              }
            />
            <div data-anim="up" data-anim-delay="0.1" className="mt-7 space-y-5 text-sm leading-relaxed text-up-muted lg:text-base">
              <p>
                Mr. Gourav Gupta founded techcadd in 2016 with a vision of making young people more
                capable and confident in using technology and building careers in the digital
                economy.
              </p>
              <p>
                Under his leadership, techcadd has expanded its focus beyond conventional computer
                education into emerging technologies, practical training, industry engagement,
                career development and innovation.
              </p>
            </div>
            <div className="mt-9 border-t border-line pt-6">
              <p className="font-display text-lg font-bold text-up-ink">Mr. Gourav Gupta</p>
              <p className="mt-1 text-sm text-up-muted">Founder &amp; CEO, techcadd</p>
            </div>
          </div>

          <figure
            data-anim="scale"
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-brand-50 to-subtle"
          >
            <Image
              src="/founder/gouravsir.jpg"
              alt="Mr. Gourav Gupta, Founder and CEO of techcadd"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top"
              priority
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-hero-950/80 via-hero-950/40 to-transparent p-6 pt-16 text-center">
              <p className="font-display text-base font-bold text-white">Mr. Gourav Gupta</p>
              <p className="mt-1 text-sm text-white/80">Founder &amp; CEO</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* By the numbers */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-accent">By the numbers</p>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-up-ink sm:text-3xl">
              What a decade of that method looks like
            </h2>
          </div>

          <div data-anim="up" data-anim-stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((s) => (
              <div key={s.label} className="card-hover rounded-2xl border border-line bg-white p-6 text-center">
                <p className="font-display text-3xl font-extrabold text-up-ink lg:text-4xl">
                  {s.value}
                  <span className="text-up-accent">{s.suffix}</span>
                </p>
                <p className="mt-1.5 text-sm text-up-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* His Vision */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-accent">His vision</p>
            <p className="mt-6 text-base text-up-muted lg:text-lg">His vision centres on one fundamental idea:</p>
            <blockquote
              data-anim="up"
              className="mt-5 font-display text-2xl font-extrabold leading-tight text-up-ink sm:text-3xl"
            >
              &ldquo;Bridge the gap between academics and industry through practical, future-ready
              skills.&rdquo;
            </blockquote>
            <span aria-hidden className="mx-auto mt-10 block h-0.5 w-24 rounded-full bg-gradient-to-r from-up-accent to-accent-glow" />
          </div>

          <div className="mt-16 text-center lg:mt-20">
            <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-up-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-up-accent" /> Leadership
            </p>
            <h3 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-extrabold leading-tight text-up-ink sm:text-3xl">
              Under his leadership
            </h3>
          </div>

          <ul data-anim="up" data-anim-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
            {pillars.map((p) => (
              <li key={p.title} className={`group ${p.span}`}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-subtle p-5 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-up-accent/40 group-hover:bg-white group-hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.32)] lg:p-6">
                  <div className="grid h-44 place-items-center overflow-hidden rounded-xl border border-line/70 bg-white transition-colors duration-500 group-hover:border-up-accent/25 group-hover:bg-brand-50/60 lg:h-48">
                    <div className="grid h-full w-full place-items-center transition-transform duration-500 group-hover:scale-[1.06]">
                      <PillarArt variant={p.variant} />
                    </div>
                  </div>
                  <h4 className="mt-6 font-display text-lg font-bold text-up-ink transition-colors duration-500 group-hover:text-up-accent">
                    {p.title}
                  </h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Engagement */}
      <section className="bg-subtle py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Engagement"
            title="Present where students are"
            subtitle="His involvement extends into technology awareness and industry-academia engagement, on campus and at technology events."
          />

          <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 lg:grid-cols-2">
            {engagements.map((e) => (
              <div key={e.title} className="rounded-2xl border border-line bg-white p-7 lg:p-9">
                <span className="inline-flex self-start rounded-full bg-brand-50 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-up-accent">
                  {e.tag}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold leading-snug text-up-ink">{e.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-up-muted">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* His Belief */}
      <section className="relative overflow-hidden bg-hero-950 py-24 text-white lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,#1c53d1_0%,transparent_60%)]" />
        <div className="absolute inset-0 grid-lines opacity-70" />
        <div className="container-x relative mx-auto max-w-3xl text-center">
          <p
            data-anim="fade"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-up-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" /> His Belief
          </p>

          <blockquote data-anim="up" className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-4xl">
            &ldquo;The future belongs to learners who continuously adapt, innovate and build.&rdquo;
          </blockquote>
          <p data-anim="up" data-anim-delay="0.1" className="mt-6 text-sm text-up-soft/70">
            Mr. Gourav Gupta, Founder &amp; CEO
          </p>
        </div>
      </section>

      {/* Our Founder Story */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our Founder Story"
            title="From one classroom in Jalandhar to a network across Punjab"
            subtitle="techcadd began with a single observation that has not changed since: students were finishing technical degrees without ever having built anything someone would pay for."
          />

          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="absolute bottom-2 left-[1.05rem] top-2 w-px bg-gradient-to-b from-up-accent via-up-line to-transparent" />
            <ol data-anim="up" data-anim-stagger className="space-y-9">
              {timeline.map((t) => (
                <li key={t.label} className="relative pl-12">
                  <span className="absolute left-0 top-0.5 grid h-[2.1rem] w-[2.1rem] place-items-center rounded-full border-2 border-white bg-brand-50 shadow-[0_0_0_1px_var(--color-up-line)]" />
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-up-accent">{t.label}</p>
                  <h3 className="mt-1.5 text-base font-bold text-up-ink">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-up-muted">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div data-anim="up" className="mx-auto mt-14 max-w-2xl rounded-3xl bg-subtle p-9 text-center">
            <p className="font-display text-lg font-bold leading-snug text-up-ink sm:text-xl">
              &ldquo;A certificate says you attended. A project someone can open says you can do the
              work. We built techcadd around the second.&rdquo;
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-up-muted">
              Mr. Gourav Gupta, Founder &amp; CEO
            </p>
          </div>
        </div>
      </section>

      {/* A Growing Legacy */}
      <section className="relative overflow-hidden bg-hero-950 py-24 text-white lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_80%_20%,#1c53d1_0%,transparent_60%)]" />
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div data-parallax="-40" className="glow-blob left-[8%] top-[10%] h-[300px] w-[300px] bg-accent-glow/20" />

        <div className="container-x relative mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-up-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow" /> 2016 – Today
          </p>
          <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight sm:text-4xl">A growing legacy</h2>
          <p className="mt-5 text-sm leading-relaxed text-up-soft/80 lg:text-base">
            From a vision to make technology education more accessible, to today&rsquo;s focus on AI,
            automation, cloud, cyber security and industry-ready skills, techcadd continues to evolve
            with the technology landscape.
          </p>
        </div>
      </section>

      {/* Recognised institution */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Recognised, not just self-described"
            title="Built on credentials you can check"
            subtitle="The institute he leads carries real, verifiable credentials, not just a claim on a homepage."
          />

          <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 sm:grid-cols-3">
            {credentials.map((c) => (
              <div key={c.title} className="rounded-2xl border border-line bg-subtle p-7 text-center">
                <h3 className="text-base font-bold text-up-ink">{c.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/accreditations-awards"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-up-accent"
            >
              See the full record
              <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <TeamMarquee />

      <CtaBanner />
    </>
  );
}
