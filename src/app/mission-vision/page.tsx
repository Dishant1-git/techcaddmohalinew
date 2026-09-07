import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Mission & Vision",
  description:
    "techcadd's mission and vision — bridging education with industry, building a national and international network of centres, and preparing learners for real-world technology careers.",
};

const pillars = [
  {
    tier: "primary",
    icon: "globe",
    title: "Make Technology Accessible",
    body: "Develop skills that align with real-world, in-demand technology, so no learner is taught against a syllabus industry has already moved past.",
  },
  {
    tier: "secondary",
    icon: "target",
    title: "Prioritize Practical Learning",
    body: "Go beyond theory through projects, hands-on training, and real-world exposure.",
  },
  {
    tier: "primary",
    icon: "briefcase",
    title: "Build Industry-Ready Talent",
    body: "Train learners on the exact stack employers are hiring for, with trainers who still build for a living.",
  },
  {
    tier: "secondary",
    icon: "refresh",
    title: "Encourage Continuous Upskilling",
    body: "Help learners adapt to emerging technologies and continuously upgrade their capabilities.",
  },
  {
    tier: "primary",
    icon: "users",
    title: "Ecosystem",
    body: "Build a wider network through centres and collaborations, so advanced technology education reaches every learner.",
  },
];

export default function MissionVisionPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Mission & Vision" }]}
        eyebrow="Mission & Vision"
        title={
          <>
            <span className="text-white/45">Where we are </span>going,
            <span className="text-white/45"> and</span>
            <br />
            what we are building towards.
          </>
        }
      />

      {/* Mission */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our Mission"
            title="Bridging Education with Industry"
            subtitle="Our mission is to build a strong training ecosystem where learners can access advanced technology, practical exposure, and industry-relevant skills that prepare them for real-world opportunities."
          />

          <div className="relative mt-20">
            <span aria-hidden className="absolute inset-x-0 top-6 hidden h-px bg-line lg:block" />
            <div
              data-anim="up"
              data-anim-stagger
              className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6"
            >
              {pillars.map((p) => (
                <div key={p.title} className="text-center lg:text-left">
                  <span
                    className={`relative z-10 grid place-items-center rounded-full text-white ${
                      p.tier === "primary"
                        ? "mx-auto h-12 w-12 bg-hero-950 lg:mx-0"
                        : "mx-auto h-10 w-10 bg-up-accent lg:mx-0"
                    }`}
                  >
                    <Icon name={p.icon} size={p.tier === "primary" ? 20 : 17} />
                  </span>
                  <h3 className="mt-5 text-sm font-bold text-up-ink">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-up-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-16 max-w-2xl text-center text-xs leading-relaxed text-up-muted">
            This direction is consistent with techcadd&rsquo;s publicly stated mission of developing a
            national and international network through franchise centres and providing qualitative
            advanced technology with practical exposure to improve employability.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our Vision"
            title="A globally trusted name in technology education"
            subtitle="We want every learner who walks into a techcadd centre to walk out job-ready — and every employer who hires from us to know exactly what that means."
          />
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-up-muted">
            Our publicly stated vision is to help make India a hub of well-trained engineers and
            technical professionals, and to establish a globally trusted name in software and
            services.
          </p>
        </div>
      </section>

      {/* Future */}
      <section className="bg-subtle py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our Future"
            title="Growing the network, one centre at a time"
            subtitle="More franchise centres across more cities, the same practical-first method in every one of them — and a curriculum that keeps rewriting itself as the industry moves, so a techcadd certificate means the same thing wherever it was earned."
          />
        </div>
      </section>

      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
