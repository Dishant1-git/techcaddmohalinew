import Link from "next/link";
import { categories } from "@/lib/courses";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

export default function Categories() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 grid-lines-light opacity-70" />

      <div className="container-x relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What you can learn"
            title={
              <>
                Six fields, one campus in <span className="text-up-accent">Mohali</span>
              </>
            }
            subtitle="Every track is taught by working professionals, built around live projects, and backed by the same placement cell."
          />
          <Link
            data-anim="fade"
            href="/courses"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-up-line px-6 py-3 text-sm font-semibold text-up-ink transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
          >
            Browse all courses
            <Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/courses?category=${cat.key}`}
              className="card-hover group relative overflow-hidden rounded-3xl border border-line bg-white p-8"
            >
              <div
                className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${cat.accent} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-25`}
              />

              <span
                className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${cat.accent} text-hero-950 shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}
              >
                <Icon name={cat.icon} size={26} strokeWidth={1.9} />
              </span>

              <h3 className="relative mt-6 text-xl font-bold text-up-ink transition-colors group-hover:text-up-accent">
                {cat.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-up-muted">{cat.blurb}</p>

              <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-up-accent">
                Explore track
                <Icon
                  name="arrowRight"
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
