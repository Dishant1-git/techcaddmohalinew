import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import Logo, { LOGO_H, LOGO_SRC, LOGO_W } from "@/components/ui/Logo";

const columns = [
  {
    heading: "Courses",
    links: [
      { label: "Programming", href: "/courses?category=programming" },
      { label: "AI & Data", href: "/courses?category=ai-data" },
      { label: "Digital Marketing", href: "/courses?category=digital-marketing" },
      { label: "Cyber & Cloud", href: "/courses?category=cyber-cloud" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How We Work", href: "/about#values" },
      { label: "Our Founder", href: "/about#founder" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Placement Support", href: "/placements" },
      { label: "Student Reviews", href: "/about#reviews" },
      { label: "FAQs", href: "/courses#faqs" },
      { label: "Enquire Now", href: "/contact" },
    ],
  },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-subtle">
      {/* Oversized wordmark watermark, cropped by the footer's bottom edge. It
          is the logo artwork rather than set text, so the lettering matches the
          mark exactly instead of approximating its typeface. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-[24%] select-none px-4"
      >
        <Image
          src={LOGO_SRC}
          alt=""
          width={LOGO_W}
          height={LOGO_H}
          aria-hidden
          className="h-auto w-full opacity-[0.055]"
        />
      </span>

      <div className="container-x relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          {/* ------------------------------ Identity ----------------------------- */}
          <div>
            <Logo size="xl" />

            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-up-muted">
              An IT training institute in Mohali — AI, cloud, cyber security and full-stack
              engineering, taught with live projects by people who still build.
            </p>

            <a
              href={site.emailHref}
              className="mt-7 inline-block rounded-full bg-up-ink px-7 py-3.5 text-[0.95rem] font-bold text-white shadow-[0_16px_36px_-18px_rgba(11,26,77,0.9)] transition-all hover:-translate-y-0.5 hover:bg-hero-900"
            >
              {site.email}
            </a>

            <a
              href={site.phoneHref}
              className="mt-5 block text-[0.95rem] text-up-muted transition-colors hover:text-up-accent"
            >
              {site.phone}
            </a>
          </div>

          {/* -------------------------------- Links ------------------------------ */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-display text-[1.15rem] font-extrabold text-up-ink">
                {col.heading}
              </h3>
              <ul className="mt-6 space-y-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.95rem] text-up-muted transition-colors hover:text-up-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ------------------------------- Bottom bar ----------------------------- */}
        <div className="mt-16 border-t border-line pt-7">
          <p className="text-[0.88rem] text-up-muted">
            © {new Date().getFullYear()} {site.legalName}. Built in{" "}
            <Link href="/contact" className="font-medium text-up-bright hover:underline">
              {site.city}
            </Link>
            .
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            {legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.85rem] text-up-muted/80 transition-colors hover:text-up-accent"
              >
                {item.label}
              </Link>
            ))}
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-[0.85rem] text-up-muted/80 transition-colors hover:text-up-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
