import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamMarquee from "@/components/about/TeamMarquee";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Founder — Mr. Gourav Gupta",
  description:
    "Mr. Gourav Gupta, Founder & CEO of techcadd — his story, his vision for bridging academics and industry, and how it shapes every batch that runs at the institute.",
};

const badges = ["Visionary Entrepreneur", "Technology Educator", "Skill Development Advocate"];

const pillars = [
  {
    icon: "cloud",
    title: "Emerging Technologies",
    body: "Moving the catalogue beyond conventional computer education into AI, cloud, cyber security and automation.",
  },
  {
    icon: "code",
    title: "Practical Training",
    body: "Learning built on projects and hands-on work rather than theory alone.",
  },
  {
    icon: "users",
    title: "Industry Engagement",
    body: "Working with employers and institutions so what is taught tracks what is actually hired for.",
  },
  {
    icon: "briefcase",
    title: "Career Development",
    body: "Counselling, placement support and career pathways treated as part of the programme, not an afterthought.",
  },
  {
    icon: "sparkles",
    title: "Innovation",
    body: "Bringing new technology into the classroom early, while it is still emerging.",
  },
];

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

          <div data-anim="up" data-anim-stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((p) => (
              <div key={p.title} className="card-hover rounded-2xl border border-line bg-white p-6 text-center">
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-up-accent text-white">
                  <Icon name={p.icon} size={20} />
                </span>
                <h4 className="mt-4 text-sm font-bold text-up-ink">{p.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-up-muted">{p.body}</p>
              </div>
            ))}
          </div>
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

      <TeamMarquee />

      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
