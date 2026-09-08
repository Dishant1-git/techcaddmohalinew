import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import BranchNetwork from "@/components/contact/BranchNetwork";
import Faq from "@/components/home/Faq";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/site";
import RelatedLinks from "@/components/ui/RelatedLinks";

export const metadata: Metadata = {
  title: "Contact & Book a Free Demo",
  description:
    "Visit techcadd Mohali at Plot F-547, Industrial Area 8A, Sector 75, or call +91 98881 22255 to book a free demo class. Counselling, batch timings, fees, EMI options and directions to the campus.",
};

/** The Mohali campus, as embedded from Google Maps. */
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.751448551189!2d76.68957820000001!3d30.697268599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef4ac0a2ebbd%3A0x31b60594997d5d5b!2stechcadd!5e0!3m2!1sen!2sin!4v1788776499564!5m2!1sen!2sin";

const channels = [
  {
    icon: "phone",
    label: "Call the centre",
    value: site.phone,
    href: site.phoneHref,
    note: site.hours,
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: site.whatsapp,
    href: site.whatsappHref,
    note: "Usually replies within minutes",
  },
  {
    icon: "mail",
    label: "Email",
    value: site.email,
    href: site.emailHref,
    note: "For detailed queries & corporate training",
  },
  {
    icon: "pin",
    label: "Visit the campus",
    value: "Sector 75, Mohali",
    href: site.mapsUrl,
    note: `${site.address.line1}, ${site.address.line3}`,
  },
];

const visitSteps = [
  {
    icon: "users",
    title: "Free counselling",
    body: "Twenty minutes with a counsellor on what you have studied, what you want to do next, and which track actually gets you there — including the ones we would talk you out of.",
  },
  {
    icon: "monitor",
    title: "Campus tour & demo class",
    body: "Sit in on a live batch, see the labs, meet the trainer who would take your class. You judge the teaching before you pay for it, not after.",
  },
  {
    icon: "briefcase",
    title: "Fees, EMI & batch slot",
    body: "The full fee written down, EMI options explained, and a batch held in the slot that fits your week — morning, evening, weekend or live online.",
  },
];

const quickFacts = [
  { value: "1", suffix: " day", label: "Callback on every enquiry" },
  { value: "0", suffix: " fee", label: "For counselling or a demo class" },
  { value: "7", suffix: "", label: "techcadd centres across Punjab" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Admissions open"
        title="Talk to a counsellor at the Mohali centre"
        subtitle="Ask about batch timings, fees, EMI options or which track fits your background. A ten-minute call usually settles what an hour of browsing cannot."
      >
        <div data-anim="fade" data-anim-delay="0.3" className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={site.phoneHref}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-hero-900 shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
          >
            <Icon name="phone" size={16} />
            Call {site.phone}
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5"
          >
            <Icon name="whatsapp" size={16} />
            WhatsApp us
          </a>
          <a
            href="#enquiry"
            className="inline-flex items-center gap-2 text-sm font-semibold text-up-soft transition-colors hover:text-white"
          >
            Or fill the form
            <Icon name="chevronDown" size={15} />
          </a>
        </div>

        <div
          data-anim="up"
          data-anim-delay="0.4"
          data-anim-stagger
          className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3"
        >
          {quickFacts.map((f) => (
            <div key={f.label} className="rounded-2xl border border-white/12 bg-white/5 p-5">
              <p className="font-display text-2xl font-extrabold text-white">
                {f.value}
                <span className="text-accent-yellow">{f.suffix}</span>
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-up-soft/70">{f.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Channels */}
      <section className="relative z-10 -mt-12 lg:-mt-14">
        <div className="container-x">
          <div data-anim="up" data-anim-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="card-hover group rounded-3xl border border-line bg-white p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-up-accent transition-colors group-hover:bg-up-accent group-hover:text-white">
                  <Icon name={c.icon} size={21} />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-up-muted">
                  {c.label}
                </p>
                <p className="mt-1.5 text-base font-bold text-up-ink transition-colors group-hover:text-up-accent">
                  {c.value}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-up-muted">{c.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + map */}
      <section id="enquiry" className="scroll-mt-28 py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div data-anim="up">
            <ContactForm />
          </div>

          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div
              data-anim="right"
              className="group overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_80px_-60px_rgba(11,26,77,0.5)]"
            >
              <div className="relative">
                <iframe
                  title="techcadd Mohali centre on Google Maps"
                  src={MAP_EMBED}
                  className="h-[22rem] w-full border-0 grayscale-[0.25] transition-all duration-700 group-hover:grayscale-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-up-ink shadow-sm backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-up-accent" />
                  Mohali branch
                </span>
              </div>

              <div className="p-7">
                <h3 className="font-display text-lg font-extrabold text-up-ink">
                  techcadd Computer Education, Mohali
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-up-muted">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.line3}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-2 rounded-full bg-hero-950 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-hero-900"
                  >
                    Get directions
                    <Icon
                      name="arrowUpRight"
                      size={15}
                      className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </a>
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-up-accent hover:underline"
                  >
                    <Icon name="phone" size={14} />
                    Call before you visit
                  </a>
                </div>
              </div>
            </div>

            <div
              data-anim="right"
              data-anim-delay="0.1"
              className="relative overflow-hidden rounded-3xl bg-hero-950 p-8 text-white"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1c53d1_0%,transparent_65%)]" />
              <div className="relative">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent-yellow">
                  Centre hours
                </p>
                <p className="mt-3 font-display text-xl font-extrabold">{site.hours}</p>
                <p className="mt-2 text-sm text-up-soft/75">
                  Labs stay open for practice outside class hours. Sunday visits by appointment.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Free counselling", "Campus tour", "Demo class", "Fee & EMI details"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-up-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              data-anim="right"
              data-anim-delay="0.18"
              className="rounded-3xl border border-line bg-subtle p-7"
            >
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-up-accent">
                Already a student?
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-up-muted">
                For batch changes, certificates or placement support, call the centre directly — the
                front desk routes you to your trainer or the placement cell.
              </p>
              <Link
                href="/placements"
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-up-accent"
              >
                Placement support
                <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What a visit looks like */}
      <section className="relative overflow-hidden bg-subtle py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />
        <div
          data-parallax="-60"
          className="glow-blob right-[-4%] top-[18%] h-[320px] w-[320px] bg-brand-200/50"
        />

        <div className="container-x relative">
          <SectionHeading
            align="center"
            eyebrow="Before you enrol"
            title="What a campus visit looks like"
            subtitle="Nothing is charged and nothing is committed until you have seen a class run. Walk in during centre hours, or call ahead and we will keep a counsellor free."
          />

          <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {visitSteps.map((s, i) => (
              <div
                key={s.title}
                className="card-hover group relative overflow-hidden rounded-3xl border border-line bg-white p-8"
              >
                <span className="absolute right-6 top-6 font-display text-5xl font-extrabold text-brand-50 transition-colors group-hover:text-brand-100">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-up-accent transition-colors group-hover:bg-up-accent group-hover:text-white">
                  <Icon name={s.icon} size={21} />
                </span>
                <h3 className="relative mt-6 font-display text-lg font-extrabold text-up-ink">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-up-muted">{s.body}</p>
              </div>
            ))}
          </div>

          <div data-anim="fade" data-anim-delay="0.2" className="mt-12 text-center">
            <a
              href="#enquiry"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-hero-600 to-hero-glow px-8 py-4 text-sm font-bold text-white shadow-lg shadow-hero-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Book a free demo class
              <Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <BranchNetwork />

      <Faq />

      <RelatedLinks route="/contact" />
      <CtaBanner />
    </>
  );
}
