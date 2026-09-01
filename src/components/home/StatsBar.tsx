import { stats } from "@/lib/site";
import Icon from "@/components/ui/Icon";

const icons = ["users", "briefcase", "target", "certificate"];

export default function StatsBar() {
  return (
    <section className="relative z-10 -mt-14 lg:-mt-16">
      <div className="container-x">
        <div
          data-anim="up"
          data-anim-stagger
          className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_80px_-40px_rgba(11,26,77,0.4)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="group relative border-line px-7 py-8 transition-colors hover:bg-subtle sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-hero-600 to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-up-accent transition-colors group-hover:bg-up-accent group-hover:text-white">
                <Icon name={icons[i]} size={21} />
              </span>
              <p className="font-display text-3xl font-extrabold text-up-ink lg:text-4xl">
                <span data-count={s.value}>0</span>
                <span className="text-up-accent">{s.suffix}</span>
              </p>
              <p className="mt-1.5 text-sm text-up-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
