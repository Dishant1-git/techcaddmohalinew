import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import StatsBar from "@/components/home/StatsBar";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Institute",
  description:
    "techcadd Mohali is a leading IT training institute in Mohali and Chandigarh — 15+ years of training, working-engineer trainers, live projects and a placement cell with 450+ hiring partners.",
};

const timeline = [
  {
    year: "2007",
    title: "techcadd opens in Jalandhar",
    body: "A single classroom teaching CAD and core programming to engineering students across Punjab.",
  },
  {
    year: "2013",
    title: "Software & IT tracks added",
    body: "Web development, Java and networking programmes launch as the regional IT industry grows.",
  },
  {
    year: "2018",
    title: "Placement cell formalised",
    body: "A dedicated team takes over resumes, mock interviews and hiring-partner relationships.",
  },
  {
    year: "2021",
    title: "Data & cloud curriculum",
    body: "Data science, analytics, cloud and DevOps tracks are built with practising engineers.",
  },
  {
    year: "2023",
    title: "Mohali centre opens",
    body: "The Sector 75 campus brings the full curriculum to the Chandigarh tricity.",
  },
  {
    year: "2026",
    title: "AI-first curriculum",
    body: "Generative AI, RAG and agentic workflows are folded into every track, not sold separately.",
  },
];

const values = [
  {
    icon: "target",
    title: "Outcome over syllabus",
    body: "A course is only finished when you can build the thing, explain it, and pass the interview about it.",
  },
  {
    icon: "users",
    title: "Small batches, real attention",
    body: "12–18 students per batch so a trainer notices when someone is stuck instead of moving on.",
  },
  {
    icon: "bolt",
    title: "Current, not archived",
    body: "Curriculum is reviewed every quarter against live job descriptions from our hiring partners.",
  },
  {
    icon: "certificate",
    title: "Honest guidance",
    body: "If a track is wrong for you, our counsellors say so. We would rather lose an admission than a reputation.",
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

      {/* Story */}
      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Built by trainers, not by a marketing team"
              subtitle="techcadd started as one classroom in Jalandhar teaching CAD to engineering students. What kept it growing was not advertising — it was students telling the next batch that the projects were real and the trainers stayed until they understood."
            />
            <div data-anim="up" data-anim-delay="0.15" className="mt-8 space-y-4 text-sm leading-relaxed text-up-muted">
              <p>
                That model has not changed. Every centre — including Mohali — runs the same way:
                small batches, practising engineers as trainers, a project pipeline instead of a
                slide deck, and a placement cell that treats every unplaced student as unfinished
                work.
              </p>
              <p>
                Today the group has trained over 12,000 students across Punjab and works with more
                than 450 hiring partners. The Mohali campus at Sector 75 runs the full curriculum —
                AI, full-stack, data, cyber security, cloud, digital marketing and CAD — for the
                Mohali, Chandigarh and Panchkula job market.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute bottom-2 left-[1.05rem] top-2 w-px bg-gradient-to-b from-up-accent via-up-line to-transparent" />
            <ol data-anim="up" data-anim-stagger className="space-y-8">
              {timeline.map((t) => (
                <li key={t.year} className="relative pl-12">
                  <span className="absolute left-0 top-0.5 grid h-[2.1rem] w-[2.1rem] place-items-center rounded-full border-2 border-white bg-brand-50 text-[0.62rem] font-extrabold text-up-accent shadow-[0_0_0_1px_var(--color-up-line)]">
                    {t.year.slice(2)}
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-up-accent">{t.year}</p>
                  <h3 className="mt-1.5 text-base font-bold text-up-ink">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-up-muted">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-subtle py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="How we work"
            title="Four rules we do not bend"
            subtitle="They sound obvious. Keeping them when a batch is full and a deadline is close is the actual work."
          />
          <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card-hover rounded-3xl border border-line bg-white p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-hero-600 to-hero-glow text-white shadow-lg shadow-hero-600/25">
                  <Icon name={v.icon} size={22} />
                </span>
                <h3 className="mt-5 text-base font-bold text-up-ink">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus */}
      <section className="py-24 lg:py-32">
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

      <WhyUs />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
