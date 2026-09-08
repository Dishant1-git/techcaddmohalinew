import Link from "next/link";
import { categoryLabel, courses, featuredCourses } from "@/lib/courses";
import Icon from "@/components/ui/Icon";

/** Ghosted word behind each card, the way the reference watermarks its tiles. */
const WATERMARK: Record<string, string> = {
  "artificial-intelligence": "AI",
  "mern-full-stack": "MERN",
  "data-science": "DATA",
  "digital-marketing": "GROWTH",
  "cyber-security": "CYBER",
  "cloud-computing": "CLOUD",
};

const BADGE: Record<string, string> = {
  Hot: "bg-accent-yellow text-hero-950",
  New: "bg-brand-100 text-up-accent",
  Trending: "bg-accent-400/30 text-hero-800",
};

export default function FeaturedCourses() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-subtle to-white py-24 lg:py-32">
      {/* Frosted panels need something behind them to tint. On flat white the
          glass would read as plain grey, so the grid sits over soft colour. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-blob left-[4%] top-[14%] h-[26rem] w-[26rem] bg-brand-300/50" />
        <div className="glow-blob right-[6%] top-[6%] h-[22rem] w-[22rem] bg-accent-400/40" />
        <div className="glow-blob bottom-[6%] left-[34%] h-[24rem] w-[24rem] bg-hero-glow/25" />
        <div className="glow-blob bottom-[16%] right-[3%] h-[20rem] w-[20rem] bg-accent-yellow/30" />
      </div>
      <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

      <div className="container-x relative">
        {/* Heading left, body copy right — the reference's split header */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div data-anim="up">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-up-bright">
              Featured courses
            </p>
            <h2 className="mt-4 font-display text-[2.2rem] font-extrabold leading-[1.08] tracking-tight text-up-ink sm:text-4xl lg:text-[2.9rem]">
              Find your perfect
              <br />
              <span className="text-up-accent">course track</span>
            </h2>
          </div>

          <p
            data-anim="up"
            data-anim-delay="0.1"
            className="text-[0.97rem] leading-relaxed text-up-muted lg:pb-2"
          >
            The tracks our students join most. Each one ends with a deployed project, a
            certificate and a placement file our hiring partners can actually read — not a
            syllabus you sat through.
          </p>
        </div>

        {/* ------------------------------- The grid ------------------------------ */}
        <div
          data-anim="up"
          data-anim-stagger
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7"
        >
          {featuredCourses().map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group relative flex min-h-[20rem] flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/50 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(255,255,255,0.4),0_28px_60px_-28px_rgba(11,26,77,0.4)] backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-500 hover:-translate-y-1.5"
            >
              {/* Accent bloom tinting the glass from inside */}
              <div className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-gradient-to-br from-hero-glow to-accent-glow opacity-30 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-55" />
              {/* Sheen down the top face, and a highlight that sweeps across on hover */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-white/75 via-white/25 to-transparent" />
              <div className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] -translate-x-full rotate-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-1/2" />

              <span className="pointer-events-none absolute -top-3 left-4 select-none font-display text-[4.5rem] font-extrabold leading-none tracking-tighter text-up-ink/[0.07]">
                {WATERMARK[course.slug] ?? ""}
              </span>

              <div className="relative flex items-start justify-between gap-3">
                <span className="rounded-full border border-white/60 bg-white/70 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-up-muted">
                  {categoryLabel[course.category]}
                </span>
                {course.badge && (
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-wide ${
                      BADGE[course.badge] ?? BADGE.New
                    }`}
                  >
                    {course.badge}
                  </span>
                )}
              </div>

              <h3 className="relative mt-6 text-xl font-bold leading-snug text-up-ink transition-colors group-hover:text-up-accent">
                {course.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-up-muted">{course.blurb}</p>

              <div className="relative mt-auto flex items-end justify-between gap-4 pt-7">
                <span className="leading-tight">
                  <span className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-up-muted/80">
                    {course.level}
                  </span>
                  <span className="mt-1 block text-sm font-bold text-up-ink">
                    {course.duration}
                  </span>
                </span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/60 bg-up-ink text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_22px_-10px_rgba(11,26,77,0.7)] transition-all duration-300 group-hover:bg-up-accent">
                  <Icon
                    name="arrowUpRight"
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div data-anim="fade" className="mt-14 flex justify-center">
          <Link
            href="/courses"
            className="accent-fill group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[0.9rem] font-bold transition-all hover:-translate-y-0.5"
          >
            Browse all {courses.length} courses
            <Icon
              name="arrowRight"
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
