import Link from "next/link";
import { categoryLabel, type Course } from "@/lib/courses";
import Icon from "@/components/ui/Icon";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="card-hover group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white"
    >
      <div className="relative overflow-hidden bg-hero-950 px-7 py-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#1c53d1_0%,transparent_65%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-accent-glow/20 blur-2xl transition-transform duration-700 group-hover:scale-150" />

        <div className="relative flex items-start justify-between gap-3">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-up-soft backdrop-blur-sm">
            {categoryLabel[course.category]}
          </span>
          {course.badge && (
            <span className="rounded-full bg-accent-yellow px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-hero-950">
              {course.badge}
            </span>
          )}
        </div>

        <h3 className="relative mt-6 font-display text-xl font-bold leading-snug text-white">
          {course.title}
        </h3>
        <p className="relative mt-2 text-xs text-up-soft/70">
          {course.duration} · {course.level}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="text-sm leading-relaxed text-up-muted">{course.blurb}</p>

        <ul className="mt-5 space-y-2">
          {course.outcomes.slice(0, 3).map((o) => (
            <li key={o} className="flex items-start gap-2.5 text-sm text-up-ink/80">
              <Icon name="check" size={15} className="mt-0.5 shrink-0 text-up-accent" strokeWidth={2.6} />
              {o}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between pt-7">
          <span className="flex flex-wrap gap-1.5">
            {course.tools.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-md bg-subtle px-2 py-1 text-[0.65rem] font-medium text-up-muted"
              >
                {t}
              </span>
            ))}
          </span>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-up-accent transition-all duration-300 group-hover:bg-up-accent group-hover:text-white">
            <Icon name="arrowUpRight" size={17} strokeWidth={2.2} />
          </span>
        </div>
      </div>
    </Link>
  );
}
