import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";
import { founder } from "@/lib/about";

export const metadata: Metadata = {
  title: "Our Founder",
  description:
    "Mr. Gourav Gupta founded techcadd in 2016 to give young people in Punjab technology skills and the confidence to use them — practising engineers as trainers, project work over slide decks.",
};

const milestones = [
  { year: "2016", body: "techcadd opens with one classroom in Jalandhar." },
  { year: "2018", body: "A dedicated placement cell takes over resumes, mock interviews and partners." },
  { year: "2021", body: "Data, cloud and DevOps tracks are built with practising engineers." },
  { year: "2023", body: "The Sector 75 campus brings the full curriculum to the tricity." },
  { year: "2026", body: "AI is folded into every track rather than sold as a separate course." },
];

export default function FounderPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Founder" }]}
        eyebrow="Leadership"
        title="The person behind techcadd"
        subtitle="One classroom in Jalandhar in 2016, now a multi-branch network across Punjab — including this campus in Mohali."
      />

      {/* Profile */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <div data-anim="up" className="mx-auto max-w-4xl">
            <div className="rounded-[1.75rem] border border-line bg-white p-8 lg:p-12">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-hero-600 to-hero-glow font-display text-2xl font-extrabold text-white shadow-lg shadow-hero-600/25">
                  {founder.initials}
                </span>
                <div className="text-center sm:text-left">
                  <h2 className="font-display text-2xl font-extrabold text-up-ink">
                    {founder.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-up-accent">
                    {founder.role}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-up-muted">{founder.bio}</p>
                  <blockquote className="mt-6 border-l-2 border-up-accent pl-5 text-left font-display text-lg font-bold leading-snug text-up-ink">
                    &ldquo;{founder.quote}&rdquo;
                  </blockquote>
                </div>
              </div>

              <div className="mt-9 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
                {founder.principles.map((p) => (
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

      {/* What he built */}
      <section className="bg-subtle py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="The through-line"
            title="Ten years, one method"
            subtitle="The syllabus has been rewritten many times. How it is taught has not."
          />

          <ol
            data-anim="up"
            data-anim-stagger
            className="mx-auto mt-14 max-w-3xl space-y-4"
          >
            {milestones.map((m) => (
              <li
                key={m.year}
                className="flex items-start gap-5 rounded-2xl border border-line bg-white p-6"
              >
                <span className="shrink-0 font-display text-lg font-extrabold text-up-accent">
                  {m.year}
                </span>
                <p className="text-sm leading-relaxed text-up-muted">{m.body}</p>
              </li>
            ))}
          </ol>

          <div data-anim="fade" className="mt-12 flex justify-center">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-up-line px-6 py-3 text-sm font-semibold text-up-ink transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
            >
              The full story of the institute
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
