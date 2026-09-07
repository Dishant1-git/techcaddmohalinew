import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import QuickEnquiry from "@/components/home/QuickEnquiry";

const ASSURANCES = ["Free career counselling", "No registration fee", "Placement support included"];

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-subtle py-24 lg:py-32">
      {/* Faint outlined rings, echoing the reference's decorative circles */}
      <div className="pointer-events-none absolute right-[6%] top-1/2 h-16 w-16 -translate-y-1/2 rounded-full border border-up-line" />
      <div className="pointer-events-none absolute left-[7%] top-[22%] h-10 w-10 rounded-full border border-up-line" />

      <div className="container-x relative text-center">
        <p
          data-anim="fade"
          className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-up-bright"
        >
          Ready to get started?
        </p>

        <h2
          data-anim="up"
          data-anim-delay="0.08"
          className="mx-auto mt-5 max-w-2xl font-display text-[2.4rem] font-extrabold leading-[1.06] tracking-tight text-up-ink sm:text-5xl lg:text-[3.6rem]"
        >
          Start building your career today.
        </h2>

        <p
          data-anim="up"
          data-anim-delay="0.16"
          className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-up-muted"
        >
          Talk to a counsellor today. One call is usually enough to know which track fits your
          degree, your schedule and the job you want.
        </p>

        <div data-anim="up" data-anim-delay="0.24" className="mt-10 flex justify-center">
          <QuickEnquiry />
        </div>

        <a
          data-anim="up"
          data-anim-delay="0.3"
          href={site.phoneHref}
          className="group mt-8 inline-flex items-center gap-3.5 rounded-full bg-hero-600 py-3 pl-3 pr-7 text-left text-white shadow-[0_18px_45px_-16px_rgba(28,83,209,0.85)] transition-all hover:-translate-y-0.5 hover:bg-hero-glow"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20">
            <Icon name="phone" size={19} />
          </span>
          <span className="leading-tight">
            <span className="block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/70">
              Call now
            </span>
            <span className="block text-[1.05rem] font-extrabold">{site.phone}</span>
          </span>
        </a>

        <ul
          data-anim="fade"
          data-anim-delay="0.36"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.88rem] text-up-muted"
        >
          {ASSURANCES.map((item, i) => (
            <li key={item} className="flex items-center">
              {/* Divider between items rather than after the last one */}
              {i > 0 && <span aria-hidden className="mr-6 hidden h-4 w-px bg-up-line sm:block" />}
              <span className="inline-flex items-center gap-2">
                <Icon name="checkCircle" size={16} className="shrink-0 text-up-bright" />
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
