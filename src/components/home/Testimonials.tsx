import { testimonials } from "@/lib/courses";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="glass glass-sheen relative mr-6 w-[21rem] shrink-0 rounded-3xl p-7 sm:w-[24rem]">
      <div className="relative flex items-center gap-1 text-accent-yellow">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" size={15} className="fill-accent-yellow" strokeWidth={0} />
        ))}
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
