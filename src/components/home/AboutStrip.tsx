import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

const highlights = [
  { icon: "users", label: "Small batches", value: "12–18 students" },
  { icon: "briefcase", label: "Trainers", value: "Working engineers" },
  { icon: "certificate", label: "Certification", value: "ISO certified" },
  { icon: "bolt", label: "Labs open", value: "6 days a week" },
];

export default function AboutStrip() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Visual */}
          <div className="relative">
            <div
              data-anim="left"
              className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-hero-900 via-hero-800 to-hero-600 p-10 pb-20 text-white sm:pb-24"
            >
              <div className="absolute inset-0 grid-lines opacity-60" />
              <div className="glow-blob right-[-20%] top-[-10%] h-64 w-64 bg-accent-glow/25" />

              <p className="relative font-display text-[5rem] font-extrabold leading-none text-white/95">
                15<span className="text-accent-yellow">+</span>
              </p>
              <p className="relative mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-up-soft">
                Years of training in Punjab
              </p>
              <p className="relative mt-6 max-w-sm text-sm leading-relaxed text-up-soft/80">
                techcadd has been training students since 2007. The Mohali centre brings that
                method to the Chandigarh tricity — the same trainers, the same live-project
                approach, the same placement network.
              </p>

              <div className="relative mt-8 grid grid-cols-2 gap-4">
                {highlights.map((h) => (
                  <div
                    key={h.label}
                    className="rounded-xl border border-white/12 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <Icon name={h.icon} size={18} className="text-accent-glow" />
                    <p className="mt-2.5 text-sm font-bold text-white">{h.value}</p>
                    <p className="text-[0.68rem] text-up-soft/70">{h.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              data-anim="scale"
              data-anim-delay="0.2"
              className="absolute -bottom-7 right-6 hidden w-56 rounded-2xl border border-line bg-white p-5 shadow-[0_24px_60px_-24px_rgba(11,26,77,0.45)] sm:block lg:-right-6"
            >
              <div className="flex items-center gap-1 text-accent-yellow">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={14} className="fill-accent-yellow" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-2 font-display text-2xl font-extrabold text-up-ink">4.9 / 5</p>
              <p className="text-xs text-up-muted">556+ verified Google reviews</p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <SectionHeading
              eyebrow="About techcadd Mohali"
              title="Two decades of turning students into engineers"
              subtitle="We are a training centre, not a content library. Every batch is taught in person or live, capped small enough that a trainer knows where each student is stuck, and structured so the work you produce is the work you show in interviews."
            />

            <div className="mt-8 space-y-5">
              {[
                {
                  t: "Built around the tricity job market",
                  b: "Our curriculum tracks what companies in Mohali, Chandigarh and Panchkula are hiring for — then adds the fundamentals those interviews test.",
                },
                {
                  t: "A trainer who stays with your batch",
                  b: "No rotating faculty. The engineer who teaches your first module reviews your capstone project and prepares you for interviews.",
                },
                {
                  t: "Support that continues after the course",
                  b: "Placement help does not stop at the certificate. Alumni come back for interview prep, referrals and refresher sessions.",
                },
              ].map((item) => (
                <div key={item.t} data-anim="up" className="flex gap-4">
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-up-accent">
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  <div>
                    <p className="font-semibold text-up-ink">{item.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-up-muted">{item.b}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              data-anim="fade"
              href="/about"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-up-line px-6 py-3 text-sm font-semibold text-up-ink transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
            >
              More about the institute
              <Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
