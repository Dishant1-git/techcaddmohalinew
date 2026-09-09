import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/courses";
import { courseFaqs, ratingSummary } from "@/lib/coursePage";
import { after12Page } from "@/lib/after12Pages";
import { variants } from "@/lib/courseVariants";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import SectionRail from "@/components/courses/detail/SectionRail";
import PathwayHero from "@/components/courses/after12/PathwayHero";
import PathwayEnquiry from "@/components/courses/after12/PathwayEnquiry";
import {
  PathFaqs,
  PathLearn,
  PathModules,
  PathOverview,
  PathReviews,
  PathTools,
  PathWho,
  PathWhy,
} from "@/components/courses/after12/PathwaySections";
import {
  WrittenApproach,
  WrittenCurriculum,
  WrittenFit,
  WrittenLearn,
  WrittenOverview,
  WrittenPopular,
  WrittenProgram,
  WrittenProjects,
  WrittenScope,
  WrittenTools,
  WrittenWho,
  WrittenWhyNow,
  WrittenWhyUs,
  WrittenWorth,
} from "@/components/courses/after12/PathwayWritten";

/**
 * The After 12th design.
 *
 * Same nine sections and the same course records as `/courses/[slug]` — this
 * is the route-map presentation of them, written for school-leavers and
 * reached from the After 12th menu. See `@/lib/courseVariants`.
 */

const variant = variants.pathway;

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

  const written = after12Page(slug);
  const title = written ? written.hero.title : variant.metaTitle(course);
  const description = written
    ? written.hero.paragraphs[0]
    : `${course.blurb} A ${course.duration ? `${course.duration.toLowerCase()} ` : ""}job-oriented course after 12th at techcadd Mohali — live projects, internship and placement assistance.`;

  return {
    title,
    description,
    alternates: { canonical: `${variant.basePath}/${course.slug}` },
    openGraph: {
      title: `${title} | techcadd Mohali`,
      description,
      url: `${site.url}${variant.basePath}/${course.slug}`,
      type: "article",
    },
  };
}

export default async function After12thCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const written = after12Page(slug);
  const rating = ratingSummary(course);
  const faqs = written ? written.faqs : courseFaqs(course);

  const related = courses
    .filter((c) => c.category === course.category && c.slug !== course.slug)
    .slice(0, 3);
  const suggestions = related.length
    ? related
    : courses.filter((c) => c.slug !== course.slug).slice(0, 3);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: written ? written.hero.title : variant.metaTitle(course),
      description: written ? written.overview.paragraphs.join(" ") : course.overview,
      url: `${site.url}${variant.basePath}/${course.slug}`,
      provider: {
        "@type": "EducationalOrganization",
        name: site.legalName,
        url: site.url,
      },
      educationalLevel: course.level,
      teaches: written ? written.tools.items.map((t) => t.name) : course.tools,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.average,
        reviewCount: String(rating.reviewCount),
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: ["Onsite", "Online"],
        courseWorkload:
          written?.program.highlights.find((h) => h.label === "Duration")?.value ??
          course.duration,
        location: {
          "@type": "Place",
          name: `${site.legalName}, ${site.city}`,
          address: `${site.address.line1}, ${site.address.line2}, ${site.address.line3}`,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PathwayHero
        course={course}
        written={
          written && {
            badge: written.hero.badge,
            title: written.hero.title,
            paragraphs: written.hero.paragraphs,
            highlights: written.program.highlights,
          }
        }
      />

      {/* The rail is sticky within this wrapper, so it pins across the stages
          and releases before the footer blocks. */}
      {written ? (
        <>
          <WrittenProgram program={written.program} />

          <div className="relative">
            <SectionRail skin="pathway" sections={written.sections} />

            <WrittenOverview step={1} overview={written.overview} roles={course.roles} />
            <WrittenLearn step={2} learn={written.learn} />
            <WrittenCurriculum step={3} curriculum={written.curriculum} />
            <WrittenTools step={4} tools={written.tools} />
            <WrittenWho step={5} who={written.who} />
            <WrittenWorth step={6} worth={written.worth} />
            <WrittenWhyNow step={7} whyNow={written.whyNow} />
            <WrittenScope step={8} takesYou={written.takesYou} />
            <WrittenProjects step={9} projects={written.projects} />
            <WrittenApproach step={10} approach={written.approach} />
            <WrittenWhyUs step={11} whyUs={written.whyUs} />
            <PathReviews course={course} step={12} />
            <PathFaqs faqs={faqs} step={13} title="Frequently Asked Questions" />
            <PathwayEnquiry
              course={course}
              step={14}
              title={written.enquiry.title}
              paragraphs={written.enquiry.paragraphs}
            />
          </div>

          <WrittenPopular popular={written.popular} />
          <WrittenFit fit={written.fit} />
        </>
      ) : (
        <div className="relative">
          <SectionRail skin="pathway" />

          <PathOverview course={course} />
          <PathModules course={course} />
          <PathLearn course={course} />
          <PathWhy course={course} />
          <PathWho course={course} />
          <PathTools course={course} />
          <PathReviews course={course} />
          <PathFaqs faqs={faqs} />
          <PathwayEnquiry course={course} />
        </div>
      )}

      {/* ---- Other routes after 12th ---------------------------------------
          A written page closes on its own "Popular courses" block instead. */}
      {!written && (
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 grid-lines-light opacity-60" />

        <div className="container-x relative">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-up-accent">
                Other routes
              </span>
              <h2 className="mt-3 font-display text-2xl font-extrabold text-up-ink sm:text-3xl">
                Not sure? Compare these
              </h2>
            </div>
            <Link
              href="/courses"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-up-accent"
            >
              All courses after 12th
              <Icon
                name="arrowRight"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {suggestions.map((c) => (
              <Link
                key={c.slug}
                href={`${variant.basePath}/${c.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-subtle p-7 transition-all hover:-translate-y-1 hover:border-up-accent/40 hover:bg-white"
              >
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-up-muted">
                  {c.duration ? `${c.duration} · ` : ""}
                  {c.level}
                </span>
                <span className="mt-3 font-display text-lg font-extrabold leading-tight text-up-ink">
                  {c.title}
                </span>
                <span className="mt-3 flex-1 text-sm leading-relaxed text-up-muted">{c.blurb}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-up-accent">
                  See the route
                  <Icon
                    name="arrowRight"
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-yellow to-accent-glow transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}
