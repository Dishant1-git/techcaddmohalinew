import Link from "next/link";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";

export default function CtaBanner() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="container-x">
        <div
          data-anim="scale"
          className="relative overflow-hidden rounded-[2rem] bg-hero-950 px-8 py-16 text-center lg:px-16 lg:py-20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,#1c53d1_0%,transparent_60%)]" />
          <div className="absolute inset-0 grid-lines opacity-70" />
          <div
            data-parallax="-40"
            className="glow-blob left-[10%] top-[-20%] h-[320px] w-[320px] bg-accent-glow/25"
          />
          <div
            data-parallax="50"
            className="glow-blob bottom-[-30%] right-[8%] h-[300px] w-[300px] bg-hero-glow/30"
          />

          <div className="relative mx-auto max-w-3xl">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent-yellow">
              Admissions open · Limited seats per batch
            </p>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              Your next batch starts within two weeks
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-up-soft/80">
              Book a free demo class at our Sector 75 campus, or ask a counsellor which track
              suits your background. No fee, no obligation.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-hero-900 shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Book a free demo
                <Icon name="arrowRight" size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5"
              >
                <Icon name="phone" size={16} /> {site.phone}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-up-soft/60">
              {["Free counselling", "EMI options available", "Morning · Evening · Weekend batches", "Online or on-campus"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Icon name="check" size={13} strokeWidth={3} className="text-accent-glow" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
