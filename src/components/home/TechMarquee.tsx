import { technologies } from "@/lib/courses";

function Row({ items, reverse = false, speed }: { items: string[]; reverse?: boolean; speed: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="group flex overflow-hidden">
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="mr-3 shrink-0 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-up-soft/80 backdrop-blur-sm transition-colors hover:border-accent-glow/50 hover:text-white"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  const third = Math.ceil(technologies.length / 3);
  const rows = [
    technologies.slice(0, third),
    technologies.slice(third, third * 2),
    technologies.slice(third * 2),
  ];

  return (
    <section className="relative overflow-hidden bg-hero-950 py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,#123285_0%,transparent_70%)] opacity-60" />

      <div className="container-x relative mb-12 text-center">
        <p
          data-anim="fade"
          className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent-yellow"
        >
          The stack you will actually touch
        </p>
        <h2 data-anim="words" className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
          100+ technologies taught across our tracks
        </h2>
      </div>

      <div className="relative space-y-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-hero-950 to-transparent sm:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-hero-950 to-transparent sm:w-48" />
        {rows.map((r, i) => (
          <Row key={i} items={r} reverse={i === 1} speed={38 + i * 7} />
        ))}
      </div>
    </section>
  );
}
