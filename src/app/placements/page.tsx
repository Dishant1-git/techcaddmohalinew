import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Placements & Career Support",
  description:
    "Placement assistance at techcadd Mohali — resume building, mock interviews, aptitude and DSA practice, and hiring drives with 450+ partner companies across Mohali and Chandigarh.",
};

const support = [
  {
    icon: "certificate",
    title: "Profile rebuild",
    body: "Resume, LinkedIn and GitHub rewritten around your project work — reviewed by the trainer who supervised it.",
  },
  {
    icon: "users",
    title: "Mock interviews",
    body: "Technical and HR rounds with written feedback. Repeated until the feedback stops changing.",
  },
  {
    icon: "target",
    title: "Aptitude & DSA drills",
    body: "Weekly practice sets and timed contests matched to the companies currently hiring from us.",
  },
  {
    icon: "briefcase",
    title: "Hiring drives",
    body: "Continuous drives with partner companies across the tricity, plus referrals into alumni networks.",
  },
];

const readiness = [
  { label: "Resume & portfolio ready", pct: 100 },
  { label: "Live project completed", pct: 96 },
  { label: "Mock interviews cleared", pct: 91 },
  { label: "Placed or interning", pct: 98 },
];

const sectors = [
  "IT services", "Product startups", "Digital agencies", "Fintech", "EdTech",
  "Manufacturing & CAD", "Cyber security firms", "Cloud consultancies", "E-commerce",
  "Analytics teams", "BPO / KPO tech", "Freelance & contract",
];

export default function PlacementsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Placements" }]}
        eyebrow="450+ hiring partners"
        title="Placement support that does not end at the certificate"
        subtitle="Our placement cell works with every student until they are placed — rebuilding profiles, running mock interviews, and putting candidates in front of companies hiring across Mohali, Chandigarh and Panchkula."
      >
        <div data-anim="up" data-anim-delay="0.25" className="mt-12 grid max-w-2xl grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4">
          {[
            { v: "98%", l: "Placement success" },
            { v: "450+", l: "Hiring partners" },
            { v: "12,450+", l: "Alumni network" },
            { v: "Year-round", l: "Hiring drives" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-2xl font-extrabold text-white">{s.v}</p>
              <p className="mt-1 text-xs text-up-soft/70">{s.l}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Support pillars */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="What the placement cell does"
            title="Four things, done repeatedly, for every student"
            subtitle="No lottery, no 'shortlisted candidates only'. Every enrolled student goes through the same pipeline."
          />

          <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 sm:grid-cols-2">
            {support.map((s) => (
              <div key={s.title} className="card-hover flex gap-5 rounded-3xl border border-line bg-white p-8">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-hero-600 to-hero-glow text-white shadow-lg shadow-hero-600/25">
                  <Icon name={s.icon} size={22} />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-up-ink">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Readiness bars */}
      <section className="bg-hero-950 py-24 text-white lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            tone="dark"
            eyebrow="Batch readiness"
            title="Where a typical batch stands at the finish line"
            subtitle="Measured across our 6-month and 9-month tracks for the last four completed batches at the Mohali centre."
          />

          <div data-anim="up" className="space-y-7 self-center">
            {readiness.map((r) => (
              <div key={r.label}>
                <div className="mb-2.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-up-soft">{r.label}</span>
                  <span className="font-display font-bold text-white">{r.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    data-progress={r.pct}
                    className="h-full rounded-full bg-gradient-to-r from-hero-glow to-accent-glow"
                    style={{ width: 0 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Where our students go"
            title="Sectors hiring from techcadd Mohali"
            subtitle="Our partner network spans the tricity IT corridor and extends to product companies in Bengaluru, Pune and Gurugram."
          />
          <div data-anim="up" data-anim-stagger className="mt-12 flex flex-wrap justify-center gap-3">
            {sectors.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line bg-white px-6 py-3 text-sm font-medium text-up-ink/80 transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
              >
                {s}
              </span>
            ))}
          </div>

          <p data-anim="fade" className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-up-muted">
            Placement assistance means active support — profile preparation, interview practice and
            introductions to hiring partners. It is not a guarantee of employment; outcomes depend on
            your performance in the programme and in interviews.
          </p>
        </div>
      </section>

      <Testimonials />
      <CtaBanner />
    </>
  );
}
