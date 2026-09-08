import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { branches, headOffice } from "@/lib/branches";
import { site } from "@/lib/site";

/**
 * The other techcadd centres, shown under the Mohali contact details.
 * Mohali is this site; every other centre links through to its own page.
 */
export default function BranchNetwork() {
  return (
    <section id="branches" className="relative scroll-mt-28 overflow-hidden bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-70" />
      <div
        data-parallax="-50"
        className="glow-blob left-[-6%] top-[12%] h-[340px] w-[340px] bg-brand-200/40"
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Across Punjab"
          title="Other techcadd centres"
          subtitle="Mohali is one of seven techcadd campuses. Same syllabus, same project requirement, same certificate — pick whichever centre is closest to you."
        />

        <div
          data-anim="up"
          data-anim-stagger
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* This campus */}
          <div className="relative overflow-hidden rounded-3xl border border-up-accent/25 bg-subtle p-7 shadow-[0_30px_70px_-50px_rgba(11,26,77,0.35)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-up-accent to-accent-glow" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-up-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-up-accent" />
              You are here
            </span>
            <h3 className="mt-4 font-display text-xl font-extrabold text-up-ink">techcadd Mohali</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-up-muted">
              {site.address.line1}, {site.address.line2}.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Mohali", "Chandigarh", "Kharar", "Zirakpur"].map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-up-line bg-white px-2.5 py-1 text-[0.68rem] font-medium text-up-muted"
                >
                  {a}
                </span>
              ))}
            </div>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-up-accent"
            >
              Open in Maps
              <Icon
                name="arrowUpRight"
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {branches.map((b) => (
            <Link
              key={b.slug}
              href={`/branches/${b.slug}`}
              className="card-hover group relative overflow-hidden rounded-3xl border border-line bg-subtle p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-up-accent transition-colors group-hover:bg-up-accent group-hover:text-white">
                  <Icon name="building" size={19} />
                </span>
                {b.isHeadOffice && (
                  <span className="rounded-full border border-accent-yellow/40 bg-accent-yellow/10 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.13em] text-up-ink">
                    Head office
                  </span>
                )}
              </div>

              <h3 className="mt-5 font-display text-xl font-extrabold text-up-ink transition-colors group-hover:text-up-accent">
                techcadd {b.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-up-muted">{b.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {b.areasServed.slice(0, 4).map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-up-line bg-white px-2.5 py-1 text-[0.68rem] font-medium text-up-muted"
                  >
                    {a}
                  </span>
                ))}
              </div>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-up-accent">
                Visit centre page
                <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        {/* Head office strip */}
        <div
          data-anim="up"
          data-anim-delay="0.1"
          className="mt-8 flex flex-col gap-5 rounded-3xl border border-line bg-subtle p-7 sm:flex-row sm:items-center sm:justify-between lg:p-9"
        >
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-up-accent">
              Head office — Jalandhar
            </p>
            <p className="mt-2 text-sm leading-relaxed text-up-muted">
              {headOffice.address.line1}, {headOffice.address.line2}, {headOffice.address.line3}.
              Counsellors here handle enquiries for every centre.
            </p>
          </div>
          <a
            href={headOffice.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-up-line px-6 py-3 text-sm font-semibold text-up-ink transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
          >
            Directions to head office
            <Icon
              name="arrowUpRight"
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
