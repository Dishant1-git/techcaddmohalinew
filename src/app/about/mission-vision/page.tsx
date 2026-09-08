import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";
import { pillars } from "@/lib/about";

export const metadata: Metadata = {
  title: "Mission & Vision",
  description:
    "What techcadd Mohali is aiming at and how we get there — small batches, practising engineers, live projects and placement support that continues until you are hired.",
};

const commitments = [
  {
    icon: "users",
    title: "Batches small enough to notice you",
    body: "12–18 students, so a trainer sees where you are stuck instead of moving on with the room.",
  },
  {
    icon: "code",
    title: "Projects with real requirements",
    body: "From week three you work to a brief, a review and a deadline — the work that fills a portfolio.",
  },
  {
    icon: "bolt",
    title: "A curriculum that keeps moving",
    body: "Reviewed every quarter against live job descriptions from the hiring partners we place into.",
  },
  {
    icon: "briefcase",
    title: "Support that outlasts the course",
    body: "Resume rebuilds, mock interviews and introductions continue after your certificate, until you are placed.",
  },
];

export default function MissionVisionPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Mission & Vision" }]}
        eyebrow="Why we exist"
        title="Where we are going, and how we get there"
        subtitle="Two statements that decide everything else — what we teach, how large a batch gets, and when we consider a student finished."
      />

      {/* Vision and mission */}
      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-12">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              data-anim="up"
              data-anim-delay={`${i * 0.1}`}
              className="relative overflow-hidden rounded-[1.75rem] border border-line bg-white p-8 lg:p-10"
            >
              <span className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-50" />
              <p className="relative text-[0.68rem] font-bold uppercase tracking-[0.2em] text-up-bright">
                {pillar.eyebrow}
              </p>
              <h2 className="relative mt-4 font-display text-[1.9rem] font-extrabold tracking-tight text-up-ink">
                {pillar.title}
              </h2>
              <p className="relative mt-4 text-[0.98rem] leading-relaxed text-up-muted">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What that commits us to */}
      <section className="bg-subtle py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="What it commits us to"
            title="Four things that follow from it"
            subtitle="A mission is only worth writing down if it changes what you actually do. These are the parts of the institute it decides."
          />

          <div
            data-anim="up"
            data-anim-stagger
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {commitments.map((c) => (
              <div
                key={c.title}
                className="card-hover rounded-3xl border border-line bg-white p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-hero-600 to-hero-glow text-white shadow-lg shadow-hero-600/25">
                  <Icon name={c.icon} size={22} />
                </span>
                <h3 className="mt-5 text-base font-bold text-up-ink">{c.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{c.body}</p>
              </div>
            ))}
          </div>

          <div data-anim="fade" className="mt-12 flex justify-center">
            <Link
              href="/about/accreditations"
              className="group inline-flex items-center gap-2 rounded-full border border-up-line px-6 py-3 text-sm font-semibold text-up-ink transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
            >
              See our accreditations
              <Icon
                name="arrowRight"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
