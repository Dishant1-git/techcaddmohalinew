import Link from "next/link";
import { site } from "@/lib/site";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";

const columns = [
  {
    heading: "Courses",
    links: [
      { label: "Artificial Intelligence", href: "/courses/artificial-intelligence" },
      { label: "Generative AI", href: "/courses/generative-ai" },
      { label: "MERN Full Stack", href: "/courses/mern-full-stack" },
      { label: "Data Science", href: "/courses/data-science" },
      { label: "Cyber Security", href: "/courses/cyber-security" },
      { label: "Digital Marketing", href: "/courses/digital-marketing" },
    ],
  },
  {
    heading: "Programs",
    links: [
      { label: "45 Days Training", href: "/training" },
      { label: "6 Weeks Training", href: "/training" },
      { label: "6 Months Industrial Training", href: "/training" },
      { label: "9 Months Expert Track", href: "/training" },
      { label: "Internship Programme", href: "/training" },
      { label: "After 12th Courses", href: "/courses" },
    ],
  },
  {
    heading: "Institute",
    links: [
      { label: "About techcadd Mohali", href: "/about" },
      { label: "Placements", href: "/placements" },
      { label: "All Courses", href: "/courses" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-hero-950 text-white">
      <div className="glow-blob left-[-10%] top-0 h-[420px] w-[420px] bg-hero-600/25" />
      <div className="glow-blob bottom-[-20%] right-[-5%] h-[380px] w-[380px] bg-accent-glow/15" />
      <div className="absolute inset-0 grid-lines opacity-60" />

      <div className="container-x relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-up-soft/75">
              {site.legalName}, Mohali — training students and professionals in AI, software,
              cyber security, marketing and CAD with live projects, working trainers and
              genuine placement support.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-up-soft/80 transition-colors hover:text-white"
              >
                <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-accent-glow" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}, {site.address.line3}
                </span>
              </a>
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 text-up-soft/80 transition-colors hover:text-white"
              >
                <Icon name="phone" size={17} className="shrink-0 text-accent-glow" />
                {site.phone}
              </a>
              <a
                href={site.emailHref}
                className="flex items-center gap-3 text-up-soft/80 transition-colors hover:text-white"
              >
                <Icon name="mail" size={17} className="shrink-0 text-accent-glow" />
                {site.email}
              </a>
              <p className="flex items-center gap-3 text-up-soft/80">
                <Icon name="clock" size={17} className="shrink-0 text-accent-glow" />
                {site.hours}
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-accent-yellow">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-up-soft/75 transition-colors hover:text-white"
                    >
                      <span className="h-px w-0 bg-accent-glow transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-up-soft/60">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved. Built in Mohali, Punjab.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-up-soft/80 transition-all hover:-translate-y-0.5 hover:border-accent-glow/50 hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-up-soft/60">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
