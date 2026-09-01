import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabel, courses, getCourse } from "@/lib/courses";
import { site } from "@/lib/site";
import PageHero from "@/components/ui/PageHero";
import CourseCard from "@/components/ui/CourseCard";
import Curriculum from "@/components/courses/Curriculum";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course not found" };
  return {
    title: `${course.title} Course in Mohali`,
    description: `${course.blurb} ${course.duration} programme at techcadd Mohali with live projects, internship and placement assistance.`,
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const related = courses.filter((c) => c.category === course.category && c.slug !== course.slug).slice(0, 3);
  const fallback = courses.filter((c) => c.slug !== course.slug).slice(0, 3);
  const suggestions = related.length ? related : fallback;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Courses", href: "/courses" }, { label: course.title }]}
        eyebrow={`${categoryLabel[course.category]} · ${course.duration}`}
        title={<>{course.title} course in Mohali</>}
        subtitle={course.blurb}
      >
        <div data-anim="up" data-anim-delay="0.25" className="mt-10 flex flex-wrap gap-3">
          {[
            { icon: "clock", label: course.duration },
            { icon: "target", label: course.level },
            { icon: "certificate", label: "Certificate + internship letter" },
            { icon: "briefcase", label: "Placement assistance" },
          ].map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-up-soft backdrop-blur-sm"
            >
              <Icon name={c.icon} size={14} className="text-accent-glow" />
              {c.label}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* Main column */}
          <div>
            <div data-anim="up">
              <h2 className="font-display text-2xl font-extrabold text-up-ink sm:text-3xl">
                What this course covers
              </h2>
              <p className="mt-4 text-base leading-relaxed text-up-muted">{course.overview}</p>
            </div>

            <div className="mt-12">
              <h2 data-anim="up" className="font-display text-2xl font-extrabold text-up-ink sm:text-3xl">
                Curriculum
              </h2>
              <p data-anim="up" className="mb-7 mt-3 text-sm text-up-muted">
                Four modules, each ending in something you build, review and keep in your portfolio.
              </p>
              <Curriculum modules={course.modules} />
            </div>

            <div className="mt-12" data-anim="up">
              <h2 className="font-display text-2xl font-extrabold text-up-ink sm:text-3xl">
                Tools &amp; technologies
              </h2>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {course.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-medium text-up-ink/80 transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div data-anim="up" className="rounded-3xl border border-line bg-subtle p-7">
                <h3 className="text-lg font-bold text-up-ink">What you walk away with</h3>
                <ul className="mt-5 space-y-3">
                  {course.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-sm text-up-ink/80">
                      <Icon name="check" size={15} strokeWidth={3} className="mt-0.5 shrink-0 text-up-accent" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-anim="up" data-anim-delay="0.1" className="rounded-3xl border border-line bg-subtle p-7">
                <h3 className="text-lg font-bold text-up-ink">Roles this leads to</h3>
                <ul className="mt-5 space-y-3">
                  {course.roles.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-up-ink/80">
                      <Icon name="arrowRight" size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-up-accent" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sticky enquiry card */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div
              data-anim="right"
              className="relative overflow-hidden rounded-3xl border border-line bg-hero-950 p-8 text-white"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1c53d1_0%,transparent_65%)]" />
              <div className="absolute inset-0 grid-lines opacity-50" />

              <div className="relative">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent-yellow">
                  Next batch
                </p>
                <p className="mt-2 font-display text-2xl font-extrabold">Starting in 2 weeks</p>
                <p className="mt-2 text-sm text-up-soft/75">
                  Morning, evening and weekend slots. Online seats available for the same batch.
                </p>

                <dl className="mt-7 space-y-3.5 border-t border-white/10 pt-6 text-sm">
                  {[
                    ["Duration", course.duration],
                    ["Level", course.level],
                    ["Mode", "Classroom / Live online"],
                    ["Certification", "ISO certified"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4">
                      <dt className="text-up-soft/60">{k}</dt>
                      <dd className="text-right font-semibold text-white">{v}</dd>
                    </div>
                  ))}
                </dl>

                <Link
                  href="/contact"
                  className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-glow to-hero-glow py-3.5 text-sm font-bold text-hero-950 transition-transform hover:-translate-y-0.5"
                >
                  Book a free demo class
                  <Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={site.phoneHref}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  <Icon name="phone" size={15} /> {site.phone}
                </a>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  <Icon name="whatsapp" size={15} /> Ask on WhatsApp
                </a>

                <p className="mt-5 text-center text-[0.68rem] text-up-soft/50">
                  Fee details shared on call · EMI options available
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-subtle py-20 lg:py-24">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 data-anim="words" className="font-display text-2xl font-extrabold text-up-ink sm:text-3xl">
                Students also consider
              </h2>
              <div data-underline className="mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-up-accent to-transparent" />
            </div>
            <Link
              data-anim="fade"
              href="/courses"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-up-accent"
            >
              View all courses
              <Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div data-anim="up" data-anim-stagger className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {suggestions.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
