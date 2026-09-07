import Link from "next/link";
import { trainingPrograms } from "@/lib/courses";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

export default function Durations() {
  return (
    <section
      id="durations"
      className="relative scroll-mt-32 overflow-hidden bg-hero-950 py-24 text-white lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(28,83,209,0.35),transparent_68%)]" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <SectionHeading
          align="center"
          tone="dark"
          eyebrow="Training programmes"
          title="Pick the length that fits your year"
          subtitle="Summer training, a university requirement, or a full career switch — the same trainers and the same live-project method, scaled to your time."
        />

        <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trainingPrograms.map((p, i) => (
            <div
              key={p.duration}
              // On a dark ground the popular card can no longer be "the dark
              // one" — it earns its emphasis from a lit gradient instead.
              className={`card-hover glass-sheen group relative flex flex-col overflow-hidden rounded-3xl p-8 ${
                i === 2
                  ? "border border-accent-glow/40 bg-gradient-to-br from-hero-800 via-hero-600 to-hero-glow"
                  : "glass-dark"
              }`}
            >
              {i === 2 && (
                <span className="absolute right-6 top-6 z-10 rounded-full bg-accent-yellow px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-hero-950">
                  Most popular
                </span>
              )}

              <p
                className={`relative font-display text-4xl font-extrabold ${
                  i === 2 ? "text-white" : "text-accent-glow"
                }`}
              >
                {p.duration}
              </p>
              <h3 className="relative mt-3 text-base font-bold leading-snug text-white">
                {p.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-up-soft/70">{p.blurb}</p>

              <ul className="relative mt-6 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-up-soft/85">
                    <Icon
                      name="check"
                      size={15}
                      strokeWidth={2.6}
                      className="mt-0.5 shrink-0 text-accent-glow"
                    />
                    {pt}
                  </li>
                ))}
              </ul>

              <Link
                href="/training"
                className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent-glow"
              >
                Programme details
                <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
