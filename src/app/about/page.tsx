import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import StatsBar from "@/components/home/StatsBar";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";
import HowWeWork from "@/components/about/HowWeWork";
import { site } from "@/lib/site";
import RelatedLinks from "@/components/ui/RelatedLinks";
import TeamWall from "@/components/about/TeamWall";

export const metadata: Metadata = {
  title: "About the Institute",
  description:
    "techcadd Mohali is a leading IT training institute in Mohali and Chandigarh — 15+ years of training, working-engineer trainers, live projects and a placement cell with 450+ hiring partners.",
};

const learningDomains = [
  {
    title: "Technology",
    skills: ["AI", "Machine Learning", "Data Science", "Cyber Security", "Cloud Computing", "DevOps"],
  },
  {
    title: "Development",
    skills: ["Python", "Full Stack", "MERN", "Web Development", "Mobile App Development"],
    highlight: true,
  },
  {
    title: "Digital & Creative",
    skills: ["Digital Marketing", "UI/UX", "Graphic Designing", "Video Editing", "Animation"],
  },
  {
    title: "Professional & Technical Skills",
    skills: ["Advanced Excel", "CAD/CAM", "Accounting", "Other career-focused programs"],
  },
];

const journey = [
  {
    year: "2016",
    title: "techcadd is founded",
    body: "Mr. Gourav Gupta starts techcadd in Jalandhar, to close the gap between academic learning and industry needs.",
  },
  {
    year: "2017",
    title: "Industrial training at scale",
    body: "Six-week, 45-day and six-month tracks become full programmes.",
  },
  {
    year: "2018",
    title: "A placement cell",
    body: "Hiring support becomes its own team rather than a trainer's side task.",
  },
  {
    year: "2019",
    title: "Colleges come on board",
    body: "Formal training partnerships begin with universities across Punjab.",
  },
  {
    year: "2020",
    title: "Teaching through lockdown",
    body: "Live online batches launch in weeks, and no cohort loses a term.",
  },
  {
    year: "2021",
    title: "Data on the syllabus",
    body: "Analytics and data science join the catalogue as full tracks.",
  },
  {
    year: "2022",
    title: "Cloud and DevOps",
    body: "AWS, Docker and CI pipelines are added to the developer paths.",
  },
  {
    year: "2023",
    title: "After-12th pathways",
    body: "Career tracks built for school leavers, not just graduates.",
  },
  {
    year: "2024",
    title: "AI on the syllabus",
    body: "Generative and agentic AI arrive, taught on real projects.",
  },
  {
    year: "2025",
    title: "Ten thousand alumni",
    body: "The trained-student count passes five figures across all tracks.",
  },
  {
    year: "2026",
    title: "Today and beyond",
    body: "New labs, new tracks, and the same rule: you learn it by building it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="Since 2007 · Mohali campus since 2023"
        title="A training centre that measures itself by where students end up"
        subtitle="techcadd Computer Education has spent close to two decades turning students, graduates and career-changers across Punjab into working engineers, analysts and marketers. The Mohali centre brings that method to the tricity."
      />

      <StatsBar />

      {/* Who we are */}
      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-accent">Who we are</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.12] text-up-ink sm:text-4xl lg:text-[2.75rem]">
              Empowering Skills. Enabling Careers.{" "}
              <span className="text-up-accent">Building the Future.</span>
            </h2>

            <div data-anim="up" data-anim-delay="0.1" className="mt-7 space-y-5 text-sm leading-relaxed text-up-muted lg:text-[15px]">
              <p>
                Founded in 2016 by{" "}
                <Link href="/about/founder" className="font-bold text-up-ink underline decoration-2 underline-offset-2">
                  Mr. Gourav Gupta
                </Link>
                , techcadd is an IT training and skill-development organization focused on bridging
                the gap between academic learning and evolving industry requirements. The
                organization combines practical exposure, emerging technologies, project-based
                learning and career-oriented training to help learners develop relevant skills and
                greater confidence for the professional world.
              </p>
              <p>
                From Artificial Intelligence, Data Science, Machine Learning, Cyber Security and
                Cloud Computing to Full Stack Development, MERN Stack, Python, Web Development,
                Mobile App Development, Digital Marketing, Graphic Designing, UI/UX, Animation,
                Video Editing, CAD/CAM and other technology-focused disciplines, techcadd provides
                learners with opportunities to explore diverse career pathways in the digital
                economy.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-sm font-bold text-up-ink">What we teach</p>
              <p className="mt-1.5 text-sm leading-relaxed text-up-muted">
                From Artificial Intelligence to CAD/CAM and other technology-focused disciplines, we
                teach skills for the evolving digital economy.
              </p>

              <div data-anim="up" data-anim-stagger className="mt-5 flex flex-wrap gap-2.5">
                {[
                  "Artificial Intelligence",
                  "Data Science",
                  "Machine Learning",
                  "Cyber Security",
                  "Cloud Computing",
                  "Full Stack Development",
                  "MERN Stack",
                  "Python",
                  "Web Development",
                  "Mobile App Development",
                  "Digital Marketing",
                  "Graphic Designing",
                  "UI/UX",
                  "Animation",
                  "Video Editing",
                  "CAD/CAM",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-up-ink/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-8 border-t border-line pt-6 text-sm text-up-muted">
              Headquartered in Jalandhar, Punjab.
            </p>
          </div>

          <div data-anim="up" data-anim-delay="0.15" className="grid grid-cols-2 gap-4">
            <figure className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl bg-subtle">
              <Image
                src="/about/team-alpine-college.jpeg"
                alt="The techcadd team with faculty at Alpine Girl's (AIIT) College"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-hero-950/80 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                Team techcadd
              </figcaption>
            </figure>
            <figure className="relative aspect-square overflow-hidden rounded-2xl bg-subtle">
              <Image
                src="/about/agentic-ai-workshop-lab.jpeg"
                alt="Workshop participants working through LangChain on their laptops"
                fill
                sizes="(min-width: 1024px) 22vw, 50vw"
                className="object-cover"
              />
            </figure>
            <figure className="relative aspect-square overflow-hidden rounded-2xl bg-subtle">
              <Image
                src="/about/agentic-ai-workshop-demo.jpeg"
                alt="A live demonstration on screen during the Agentic AI workshop"
                fill
                sizes="(min-width: 1024px) 22vw, 50vw"
                className="object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* More than training */}
      <section className="relative overflow-hidden bg-hero-950 py-24 text-white lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_10%_20%,#123285_0%,transparent_60%)]" />
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div data-parallax="-40" className="glow-blob right-[6%] top-[8%] h-[320px] w-[320px] bg-accent-glow/15" />

        <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-glow">More than training</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.6rem]">
              A skill-building ecosystem.
            </h2>
            <div data-anim="up" data-anim-delay="0.1" className="mt-7 space-y-5 text-sm leading-relaxed text-up-soft/80">
              <p>
                At techcadd, technology education is designed to go beyond textbooks and
                conventional classroom learning. The focus is on helping learners{" "}
                <span className="font-bold text-white">learn, implement and grow</span> by combining
                conceptual understanding with practical application.
              </p>
              <p>
                Students can work on assignments, projects, industrial training and
                internship-oriented learning experiences that help them understand how technology is
                applied in real-world environments. Publicly available information about techcadd
                also reflects recent practical workshops and training activities in areas such as
                mobile application development, cloud computing, AI/ML, DevOps and data-related
                skills.
              </p>
            </div>
          </div>

          <div data-anim="up" data-anim-delay="0.15" className="grid grid-cols-2 gap-4">
            <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
              <Image
                src="/about/alpine-trainer-addressing.jpeg"
                alt="A techcadd trainer addressing students in a classroom"
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover"
              />
            </figure>
            <figure className="relative mt-10 aspect-[3/4] overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
              <Image
                src="/about/alpine-student-questions.jpeg"
                alt="Students at an award ceremony during a techcadd campus visit"
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* What you can learn */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="What you can learn"
            title="Building skills across technology domains"
            subtitle="Whether a learner wants to code an application, analyse data, build an AI solution, secure a network, manage cloud infrastructure, design a digital experience, create visual content or grow a business online, techcadd provides multiple learning pathways."
          />

          <div data-anim="up" data-anim-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {learningDomains.map((d) => (
              <div
                key={d.title}
                className={`rounded-2xl border bg-white p-6 ${
                  d.highlight ? "border-up-accent/50 ring-1 ring-up-accent/20" : "border-line"
                }`}
              >
                <h3 className="text-base font-bold text-up-ink">{d.title}</h3>
                <span aria-hidden className="mt-2.5 block h-0.5 w-6 rounded-full bg-gradient-to-r from-up-accent to-accent-glow" />
                <ul className="mt-4 space-y-2">
                  {d.skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2 text-sm text-up-muted">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-up-accent" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our journey */}
      <section className="relative overflow-hidden bg-hero-950 py-24 text-white lg:py-32">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div
          aria-hidden
          className="absolute -left-1/4 -top-1/3 h-[140%] w-[70%] -rotate-12 bg-gradient-to-br from-brand-600/25 via-brand-700/10 to-transparent blur-[120px]"
        />
        <div
          aria-hidden
          className="absolute -bottom-1/3 -right-1/4 h-[120%] w-[55%] -rotate-12 bg-gradient-to-tl from-accent-glow/20 to-transparent blur-[120px]"
        />

        <div className="container-x relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-glow">Our journey</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">A decade of building careers</h2>
            <p className="mx-auto mt-4 text-sm leading-relaxed text-white/65 lg:text-base">
              What began in 2016 has evolved into a technology-focused training ecosystem with an
              expanding portfolio of courses and practical learning initiatives, and the focus keeps
              moving towards emerging areas such as Artificial Intelligence, automation, cloud
              technologies, cybersecurity, data and modern software development.
            </p>
          </div>

          <div className="relative mt-16">
            <span aria-hidden className="absolute inset-y-0 left-[7px] w-px bg-white/15 sm:left-1/2" />
            <ol data-anim="up" data-anim-stagger className="space-y-12 lg:space-y-14">
              {journey.map((item, i) => {
                const rightSide = i % 2 === 1;
                return (
                  <li
                    key={item.year}
                    className="relative pl-9 sm:grid sm:grid-cols-2 sm:items-center sm:gap-x-12 sm:pl-0"
                  >
                    <span
                      aria-hidden
                      className="absolute left-1 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-accent-glow ring-4 ring-accent-glow/25 sm:left-1/2 sm:-translate-x-1/2"
                    />
                    <span
                      aria-hidden
                      className={`absolute top-1/2 hidden h-px w-6 -translate-y-1/2 bg-white/15 sm:block ${
                        rightSide ? "left-1/2" : "right-1/2"
                      }`}
                    />
                    <div
                      className={`flex items-center gap-4 ${
                        rightSide ? "sm:col-start-2" : "sm:col-start-1 sm:flex-row-reverse sm:text-right"
                      }`}
                    >
                      <div className="w-14 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-white/5 text-center backdrop-blur-sm">
                        <div className="bg-up-accent py-0.5 font-mono text-[10px] tracking-widest text-white">
                          20
                        </div>
                        <div className="py-1.5 font-display text-xl font-bold leading-none text-white">
                          {item.year.slice(2)}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-sm font-bold lg:text-[15px]">
                          {item.year}: {item.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-white/60">{item.body}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Founder — target of the "Founder" item in the main navigation */}
      <section id="founder" className="scroll-mt-32 bg-subtle py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Leadership"
            title="The person behind techcadd"
            subtitle="One classroom in Jalandhar in 2016, now a multi-branch network across Punjab — including this campus in Mohali."
          />

          <div data-anim="up" className="mx-auto mt-14 max-w-4xl">
            <div className="rounded-[1.75rem] border border-line bg-white p-8 lg:p-12">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-hero-600 to-hero-glow font-display text-2xl font-extrabold text-white shadow-lg shadow-hero-600/25">
                  GG
                </span>
                <div className="text-center sm:text-left">
                  <h3 className="font-display text-2xl font-extrabold text-up-ink">
                    Mr. Gourav Gupta
                  </h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-up-accent">
                    Founder &amp; CEO, techcadd
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-up-muted">
                    He started techcadd in 2016 to give young people in Punjab technology skills and
                    the confidence to use them. The method has not changed since that first
                    classroom: practising engineers as trainers, project work instead of slide
                    decks, and a curriculum rewritten whenever the industry moves — which is how AI,
                    cloud and cyber security joined the syllabus.
                  </p>
                  <blockquote className="mt-6 border-l-2 border-up-accent pl-5 text-left font-display text-lg font-bold leading-snug text-up-ink">
                    “The future belongs to learners who continuously adapt, innovate and build.”
                  </blockquote>
                </div>
              </div>

              <div className="mt-9 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
                {[
                  { title: "Practitioner-led", body: "Every trainer still builds for a living." },
                  { title: "Industry-aligned", body: "Curriculum reviewed against live hiring briefs." },
                  { title: "Career-integrated", body: "Placement support is part of the course, not an add-on." },
                ].map((p) => (
                  <div key={p.title}>
                    <p className="text-sm font-bold text-up-ink">{p.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-up-muted">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowWeWork />

      {/* Campus */}
      <section id="campus" className="scroll-mt-32 py-24 lg:py-32">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div data-anim="left" className="relative overflow-hidden rounded-[1.75rem] bg-hero-950 p-10 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#1c53d1_0%,transparent_65%)]" />
              <div className="absolute inset-0 grid-lines opacity-60" />
              <div className="relative">
                <Icon name="pin" size={26} className="text-accent-glow" />
                <h3 className="mt-5 font-display text-2xl font-extrabold">The Mohali campus</h3>
                <p className="mt-4 text-sm leading-relaxed text-up-soft/80">
                  {site.address.line1}, {site.address.line2}, {site.address.line3}. Six lab rooms,
                  open six days a week, with practice machines available outside class hours.
                </p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  Open in Google Maps
                  <Icon name="arrowUpRight" size={16} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Facilities"
                title="Everything you need is on site"
                subtitle="Classrooms are labs. You are on a machine from the first session, not taking notes about one."
              />
              <div data-anim="up" data-anim-stagger className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "High-spec lab machines",
                  "Open practice hours",
                  "Recorded sessions portal",
                  "Interview prep rooms",
                  "Free Wi-Fi & workstations",
                  "Placement cell on campus",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-sm font-medium text-up-ink"
                  >
                    <Icon name="check" size={15} strokeWidth={3} className="shrink-0 text-up-accent" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder and the other About pages now stand on their own, so this is a
          way through to them rather than a second copy of their content. */}
      <section className="bg-subtle py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="More on the institute"
            title="Three things worth reading next"
            subtitle="Where we are headed, what the certificate is issued against, and the person who started it."
          />

          <div
            data-anim="up"
            data-anim-stagger
            className="mt-14 grid gap-6 sm:grid-cols-3"
          >
            {[
              {
                href: "/about/mission-vision",
                icon: "target",
                kicker: "Purpose",
                title: "Mission & Vision",
                body: "What we are aiming at, and the four things it commits us to daily.",
              },
              {
                href: "/about/accreditations",
                icon: "certificate",
                kicker: "Proof",
                title: "Accreditations & Awards",
                body: "ISO-certified training, documented letters, and a 450+ partner network.",
              },
              {
                href: "/about/founder",
                icon: "users",
                kicker: "Profile",
                title: "Our Founder",
                body: "Mr. Gourav Gupta on why techcadd started, and what has not changed since.",
              },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="card-hover group rounded-3xl border border-line bg-white p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-up-accent transition-colors group-hover:bg-up-accent group-hover:text-white">
                  <Icon name={c.icon} size={22} />
                </span>
                <p className="mt-6 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-up-muted/80">
                  {c.kicker}
                </p>
                <h3 className="mt-1.5 text-lg font-bold text-up-ink transition-colors group-hover:text-up-accent">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{c.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-up-accent">
                  Read more
                  <Icon
                    name="arrowRight"
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TeamWall />

      <WhyUs />
      <Testimonials />
      <RelatedLinks route="/about" />
      <CtaBanner />
    </>
  );
}
