import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import GoogleIcon from "@/components/reviews/GoogleIcon";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";
import { googleRating } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Accreditations & Awards",
  description:
    "The record behind techcadd's certificate — ISO certification, MSME registration and Startup India recognition, and where each one can be verified.",
};

const reasons = [
  {
    icon: "certificate",
    title: "ISO certified",
    body: "An externally audited quality-management process behind the training itself — not just the certificate you receive at the end of it.",
  },
  {
    icon: "building",
    title: "MSME registered",
    body: "Registered as a genuine, government-recognised training business, not an unregistered coaching operation.",
  },
  {
    icon: "rocket",
    title: "Startup India recognised",
    body: "Recognised under the Government of India's Startup India initiative for building a scalable training and placement model.",
  },
];

const credentials = [
  {
    icon: "certificate",
    title: "ISO Certification",
    body: "Certifies the quality-management system behind how techcadd designs, delivers and reviews its training programmes.",
    authority: "Issued by an accredited ISO certification body",
  },
  {
    icon: "building",
    title: "MSME (Udyam) Registration",
    body: "Registers techcadd as a Micro, Small & Medium Enterprise under the Government of India's Udyam registration scheme.",
    authority: "Issued by the Ministry of MSME, Government of India",
  },
  {
    icon: "rocket",
    title: "Startup India Recognition",
    body: "DPIIT recognition under the Startup India initiative, awarded to businesses building an innovative, scalable model.",
    authority: "Issued by DPIIT, Ministry of Commerce & Industry",
  },
];

export default function AccreditationsAwardsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Accreditations & Awards" }]}
        eyebrow="Accreditations & Awards"
        title={
          <>
            Recognised for the training,
            <br />
            <span className="text-white/45">not just for saying so.</span>
          </>
        }
        subtitle="techcadd's ISO certification, its MSME registration and its Startup India recognition — the record behind the certificate."
      />

      {/* Why it matters */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Why it matters"
            title="A certificate is only as good as what backs it"
            subtitle="Plenty of institutes print a certificate. Fewer are willing to be checked against the same government registries and certification bodies that everyone else can look up."
          />

          <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 sm:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title} className="card-hover rounded-3xl border border-line bg-white p-7 text-center">
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-up-accent text-white">
                  <Icon name={r.icon} size={20} />
                </span>
                <h3 className="mt-5 text-base font-bold text-up-ink">{r.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-subtle py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our Certifications"
            title="Three credentials, three separate issuing authorities"
          />

          <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {credentials.map((c) => (
              <div key={c.title} className="flex flex-col rounded-3xl border border-line bg-white p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-hero-600 to-hero-glow text-white shadow-lg shadow-hero-600/25">
                  <Icon name={c.icon} size={22} />
                </span>
                <h3 className="mt-6 text-lg font-bold text-up-ink">{c.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-up-muted">{c.body}</p>
                <p className="mt-6 border-t border-line pt-4 text-xs font-semibold text-up-accent">
                  {c.authority}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-up-muted">
            These credentials are drawn from techcadd&rsquo;s own registrations and published profiles,
            and can be checked against the issuing authority named on each card.
          </p>
        </div>
      </section>

      {/* Google reviews */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-md rounded-3xl border border-line bg-subtle p-9 text-center">
            <GoogleIcon size={28} />
            <p className="mt-4 flex items-center justify-center gap-2 font-display text-2xl font-extrabold text-up-ink">
              {googleRating.average}
              <span className="flex items-center gap-0.5 text-accent-yellow">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={16} className="fill-accent-yellow" strokeWidth={0} />
                ))}
              </span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-up-muted">
              From 750+ verified reviews on Google — not collected on this site, checkable on the
              profile they came from.
            </p>
            <Link
              href="/reviews"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-up-accent px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Read the reviews
            </Link>
          </div>
        </div>
      </section>

      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
