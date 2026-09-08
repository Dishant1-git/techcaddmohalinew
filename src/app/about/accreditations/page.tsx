import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";
import { credentials } from "@/lib/about";
import { site } from "@/lib/site";
import RelatedLinks from "@/components/ui/RelatedLinks";

export const metadata: Metadata = {
  title: "Accreditations & Awards",
  description:
    "The certifications, letters and recognitions behind techcadd Mohali — ISO-certified training, documented internship letters, university-compliant programmes and a 450+ hiring-partner network.",
};

const paperwork = [
  {
    title: "Course completion certificate",
    body: "Issued for every programme, naming the track, its duration and the project you built.",
  },
  {
    title: "Internship letter",
    body: "On the six- and nine-month tracks, documenting the live project work rather than attendance.",
  },
  {
    title: "Project report & viva prep",
    body: "For university-mandated training, in the format your college submits.",
  },
  {
    title: "Placement file",
    body: "A rebuilt resume and portfolio our hiring partners can read before they interview you.",
  },
];

export default function AccreditationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Accreditations & Awards" }]}
        eyebrow="Credentials"
        title="What stands behind the certificate"
        subtitle="A certificate is only worth the process behind it. Here is what ours is issued against, and the paperwork you leave with."
      />

      {/* Credentials */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Recognition"
            title="Certified, documented, and checkable"
            subtitle="Everything below is something you can verify — on our Google profile, in the letters we issue, or by asking the hiring partners we place into."
          />

          <div
            data-anim="up"
            data-anim-stagger
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {credentials.map((c) => (
              <div
                key={c.title}
                className="card-hover group relative overflow-hidden rounded-3xl border border-line bg-white p-8"
              >
                <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-50 transition-transform duration-700 group-hover:scale-[2.2]" />
                <span className="relative grid h-13 w-13 place-items-center rounded-2xl bg-brand-50 p-3.5 text-up-accent">
                  <Icon name={c.icon} size={24} />
                </span>
                <h3 className="relative mt-6 text-lg font-bold text-up-ink">{c.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-up-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paperwork you leave with */}
      <section className="bg-subtle py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="What you leave with"
              title="Four documents, none of them an add-on"
              subtitle="All of it is included in the programme fee. Nothing here is sold separately."
            />

            <a
              data-anim="fade"
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-up-line px-6 py-3 text-sm font-semibold text-up-ink transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
            >
              Read our Google reviews
              <Icon
                name="arrowUpRight"
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <div data-anim="up" data-anim-stagger className="space-y-4">
            {paperwork.map((p, i) => (
              <div
                key={p.title}
                className="flex gap-5 rounded-2xl border border-line bg-white p-6"
              >
                <span className="font-display text-2xl font-extrabold leading-none text-up-line">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-semibold text-up-ink">{p.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-up-muted">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x flex justify-center">
          <Link
            href="/about/founder"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-up-accent hover:underline"
          >
            Meet the founder
            <Icon
              name="arrowRight"
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      <RelatedLinks route="/about/accreditations" />
      <CtaBanner />
    </>
  );
}
