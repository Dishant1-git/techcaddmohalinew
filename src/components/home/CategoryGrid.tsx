import Link from "next/link";
import { categories, categoryLabel, courses, coursesIn, type CategoryKey } from "@/lib/courses";
import Icon from "@/components/ui/Icon";

/**
 * The six course categories as a grid of glass cards.
 *
 * Everything on a card is derived from `categories` and the catalogue itself —
 * the count, the badge and the sample titles all come from `coursesIn`. Adding
 * a course to `src/lib/courses.ts` updates this section with it, and there is
 * no second hand-kept list to fall out of step with the first.
 */

/** Ghosted word behind each card, the way the reference watermarks its tiles. */
const WATERMARK: Record<CategoryKey, string> = {
  "ai-data": "AI",
  development: "DEV",
  "cyber-cloud": "CYBER",
  "digital-marketing": "GROWTH",
  "cad-design": "CAD",
  programming: "CODE",
};

const BADGE: Record<string, string> = {
  Hot: "bg-accent-yellow text-hero-950",
  New: "bg-brand-100 text-up-accent",
  Trending: "bg-accent-400/30 text-hero-800",
};

/**
 * The strongest badge worn by any course in the category, so the flag on a
 * category card is one a course underneath it actually carries. Ordered by
 * loudness — a category holding both a Hot and a New course shows Hot.
 */
function categoryBadge(key: CategoryKey) {
  const worn = new Set(coursesIn(key).map((c) => c.badge));
  return (["Hot", "Trending", "New"] as const).find((b) => worn.has(b));
}

export default function CategoryGrid() {
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
              Course categories
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
            Six fields, {courses.length} courses between them. Pick the work you want to be
            doing and the track follows — every one ends with a deployed project, a
            certificate and a placement file our hiring partners can actually read.
          </p>
        </div>

        {/* ------------------------------- The grid ------------------------------ */}
        <div
          data-anim="up"
          data-anim-stagger
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7"
        >
          {categories.map((cat) => {
            const inCategory = coursesIn(cat.key);
            const badge = categoryBadge(cat.key);

            return (
              <Link
                key={cat.key}
                href={`/courses?category=${cat.key}`}
                className="group relative flex min-h-[22rem] flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/50 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(255,255,255,0.4),0_28px_60px_-28px_rgba(11,26,77,0.4)] backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-500 hover:-translate-y-1.5"
              >
                {/* Accent bloom tinting the glass from inside */}
                <div
                  className={`pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${cat.accent} opacity-30 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-55`}
                />
                {/* Sheen down the top face, and a highlight that sweeps across on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-white/75 via-white/25 to-transparent" />
                <div className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] -translate-x-full rotate-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-1/2" />

                <span className="pointer-events-none absolute -top-3 left-4 select-none font-display text-[4.5rem] font-extrabold leading-none tracking-tighter text-up-ink/[0.07]">
                  {WATERMARK[cat.key]}
                </span>

                <div className="relative flex items-start justify-between gap-3">
                  <span className="rounded-full border border-white/60 bg-white/70 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-up-muted">
                    {categoryLabel[cat.key]}
                  </span>
                  {badge && (
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-wide ${BADGE[badge]}`}
                    >
                      {badge}
                    </span>
                  )}
                </div>

                <h3 className="relative mt-6 text-xl font-bold leading-snug text-up-ink transition-colors group-hover:text-up-accent">
                  {cat.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-up-muted">{cat.blurb}</p>

                {/* A category is only as concrete as the courses under it, so the
                    card names three rather than asking the reader to take the
                    field on trust. */}
                <ul className="relative mt-5 space-y-1.5">
                  {inCategory.slice(0, 3).map((c) => (
                    <li
                      key={c.slug}
                      className="flex items-center gap-2 text-[0.82rem] text-up-muted"
                    >
                      <span
                        aria-hidden
                        className="h-1 w-1 shrink-0 rounded-full bg-up-accent/60"
                      />
                      <span className="truncate">{c.title}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto flex items-end justify-between gap-4 pt-7">
                  <span className="leading-tight">
                    <span className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-up-muted/80">
                      In this field
                    </span>
                    <span className="mt-1 block text-sm font-bold text-up-ink">
                      {inCategory.length} {inCategory.length === 1 ? "course" : "courses"}
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
            );
          })}
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
