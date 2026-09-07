import { testimonials } from "@/lib/courses";
import { site } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import TechMark from "@/components/ui/TechMark";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="glass glass-sheen relative mr-6 w-[21rem] shrink-0 rounded-3xl p-7 sm:w-[24rem]">
      {/* Stars on the left, source on the right: these are Google reviews, and
          a quote card that does not say where it came from is just a claim. */}
      <div className="relative flex items-center justify-between gap-3">
        <span className="flex items-center gap-1 text-accent-yellow">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon key={i} name="star" size={15} className="fill-accent-yellow" strokeWidth={0} />
          ))}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1">
          <TechMark name="google" size={13} />
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-up-muted">
            Google
          </span>
        </span>
      </div>
      <blockquote className="relative mt-4 text-sm leading-relaxed text-up-ink/85">
        “{t.quote}”
      </blockquote>
      <figcaption className="relative mt-6 flex items-center gap-3 border-t border-white/60 pt-5">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-hero-600 to-hero-glow font-display text-sm font-bold text-white">
          {t.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <span>
          <span className="block text-sm font-bold text-up-ink">{t.name}</span>
          <span className="block text-xs text-up-muted">
            {t.role} · {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const rowA = testimonials.slice(0, 3);
  const rowB = testimonials.slice(3);

  return (
    <section
      id="reviews"
      className="relative scroll-mt-32 overflow-hidden bg-gradient-to-b from-white via-subtle to-white py-24 lg:py-32"
    >
      {/* Colour under the marquee, so the quote cards' frost has something to
          refract instead of sitting on flat grey. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-blob left-[6%] top-[18%] h-[24rem] w-[24rem] bg-brand-300/45" />
        <div className="glow-blob right-[8%] bottom-[10%] h-[22rem] w-[22rem] bg-accent-400/35" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          align="center"
          eyebrow="Student stories"
          title={
            <>
              4.9 out of 5, across <span className="text-up-accent">556+ reviews</span>
            </>
          }
          subtitle="The batches change every few months. What students say about the trainers and the project work does not."
        />

        {/* Google Business Profile badge. Points at the Maps listing, which is
            where the rating actually lives — a rating you cannot go and check
            is worth very little. */}
        <div data-anim="up" data-anim-delay="0.15" className="mt-9 flex justify-center">
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="glass glass-sheen group relative inline-flex items-center gap-4 rounded-full py-2.5 pl-5 pr-3 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="relative flex items-center gap-2.5">
              <TechMark name="google" size={22} />
              <span className="leading-tight">
                <span className="block text-[0.86rem] font-bold text-up-ink">
                  Google Reviews
                </span>
                <span className="block text-[0.68rem] text-up-muted">
                  techcadd {site.city}
                </span>
              </span>
            </span>

            <span aria-hidden className="relative h-8 w-px bg-up-line/80" />

            <span className="relative flex items-center gap-2">
              <span className="font-display text-[1.1rem] font-extrabold leading-none text-up-ink">
                4.9
              </span>
              <span className="flex items-center gap-0.5 text-accent-yellow">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    size={13}
                    className="fill-accent-yellow"
                    strokeWidth={0}
                  />
                ))}
              </span>
            </span>

            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-up-ink text-white transition-colors group-hover:bg-up-accent">
              <Icon
                name="arrowUpRight"
                size={15}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </a>
        </div>
      </div>

      <div className="relative mt-14 space-y-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent sm:w-40" />

        <div className="group flex overflow-hidden">
          <div className="flex w-max [animation:marquee_50s_linear_infinite]">
            {[...rowA, ...rowA, ...rowA, ...rowA].map((t, i) => (
              <Card key={`a-${i}`} t={t} />
            ))}
          </div>
        </div>

        <div className="group flex overflow-hidden">
          <div className="flex w-max [animation:marquee_58s_linear_infinite_reverse]">
            {[...rowB, ...rowB, ...rowB, ...rowB].map((t, i) => (
              <Card key={`b-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
