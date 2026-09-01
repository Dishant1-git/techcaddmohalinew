import Link from "next/link";
import { trainingPrograms } from "@/lib/courses";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

export default function Durations() {
  return (
    <section className="relative bg-subtle py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Training programmes"
          title="Pick the length that fits your year"
          subtitle="Summer training, a university requirement, or a full career switch — the same trainers and the same live-project method, scaled to your time."
        />

        <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trainingPrograms.map((p, i) => (
            <div
              key={p.duration}
              className={`card-hover group relative flex flex-col overflow-hidden rounded-3xl border p-8 ${
                i === 2
                  ? "border-transparent bg-hero-950 text-white"
                  : "border-line bg-white"
              }`}
            >
              {i === 2 && (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1c53d1_0%,transparent_65%)] opacity-80" />
                  <span className="absolute right-6 top-6 rounded-full bg-accent-yellow px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-hero-950">
                    Most popular
                  </span>
                </>
              )}

              <p
                className={`relative font-display text-4xl font-extrabold ${
                  i === 2 ? "text-white" : "text-up-accent"
                }`}
              >
                {p.duration}
              </p>
              <h3
                className={`relative mt-3 text-base font-bold leading-snug ${
                  i === 2 ? "text-white" : "text-up-ink"
                }`}
              >
                {p.title}
              </h3>
              <p
                className={`relative mt-3 text-sm leading-relaxed ${
                  i === 2 ? "text-up-soft/75" : "text-up-muted"
                }`}
              >
                {p.blurb}
              </p>

              <ul className="relative mt-6 space-y-2.5">
                {p.points.map((pt) => (
                  <li
                    key={pt}
                    className={`flex items-start gap-2.5 text-sm ${
                      i === 2 ? "text-up-soft/85" : "text-up-ink/80"
                    }`}
                  >
                    <Icon
                      name="check"
                      size={15}
                      strokeWidth={2.6}
                      className={`mt-0.5 shrink-0 ${i === 2 ? "text-accent-glow" : "text-up-accent"}`}
                    />
                    {pt}
                  </li>
                ))}
              </ul>

              <Link
                href="/training"
                className={`relative mt-8 inline-flex items-center gap-2 text-sm font-semibold ${
                  i === 2 ? "text-accent-glow" : "text-up-accent"
                }`}
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
