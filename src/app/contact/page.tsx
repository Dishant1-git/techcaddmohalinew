import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import Faq from "@/components/home/Faq";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Book a Free Demo",
  description:
    "Visit techcadd Mohali at Sector 75, Industrial Area 8A, or call +91 98881 22255 to book a free demo class. Counselling, batch timings, fees and EMI options.",
};

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

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Admissions open"
        title="Talk to a counsellor at the Mohali centre"
        subtitle="Ask about batch timings, fees, EMI options or which track fits your background. A ten-minute call usually settles what an hour of browsing cannot."
      />

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
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div data-anim="up">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div data-anim="right" className="overflow-hidden rounded-3xl border border-line bg-white">
              <iframe
                title="techcadd Mohali location map"
                src="https://www.google.com/maps?q=Industrial%20Area%208A%20Sector%2075%20Mohali%20Punjab%20160055&output=embed"
                className="h-[22rem] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-7">
                <h3 className="text-lg font-bold text-up-ink">techcadd Computer Education, Mohali</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-up-muted">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.line3}
                </p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-up-accent"
                >
                  Get directions
                  <Icon name="arrowUpRight" size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
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
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
