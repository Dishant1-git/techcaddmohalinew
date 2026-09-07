import { whyUs } from "@/lib/courses";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

const included = [
  "Live project experience",
  "Internship letter",
  "ISO-certified certificate",
  "Interview & resume prep",
  "Recorded sessions for life",
];

export default function WhyUs() {
  return (
    <section
      id="why"
      className="relative scroll-mt-32 overflow-hidden bg-hero-950 py-24 text-white lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_25%,rgba(28,83,209,0.35),transparent_68%)]" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <SectionHeading
          align="center"
          tone="dark"
          eyebrow="Why techcadd Mohali"
          title="Four things that change the outcome"
          subtitle="Any institute can list a syllabus. These are the parts that decide whether you finish with a job."
        />

        <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 lg:grid-cols-2">
          {whyUs.map((w) => (
            <div
              key={w.title}
              className="card-hover glass-dark glass-sheen group relative overflow-hidden rounded-3xl p-8 lg:p-10"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-hero-glow/20 blur-xl transition-transform duration-700 group-hover:scale-[2.2]" />

              <div className="relative flex items-start gap-6">
                <div className="w-28 shrink-0 rounded-2xl bg-gradient-to-br from-hero-600 to-hero-glow px-3 py-3.5 text-center text-white shadow-lg shadow-hero-600/25">
                  <p className="font-display text-xl font-extrabold leading-none">{w.stat}</p>
                  <p className="mt-1 text-[0.55rem] font-medium uppercase leading-tight tracking-wider text-white/70">
                    {w.statLabel}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-up-soft/70">{w.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Included with every course */}
        <div
          data-anim="up"
          className="glass-dark relative mt-8 overflow-hidden rounded-3xl p-8 lg:p-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent-yellow">
                Included with every course
              </p>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-white">
                No add-ons, no separate fee
              </h3>
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {included.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-up-soft backdrop-blur-sm transition-colors hover:border-accent-glow/40 hover:text-white"
                >
                  <Icon name="check" size={13} strokeWidth={3} className="text-accent-glow" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
