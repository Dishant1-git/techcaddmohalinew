import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabel } from "@/lib/courses";
import { aiCourse, aiCourses, aiRouteCourses } from "@/lib/content/ai";
import { variants } from "@/lib/courseVariants";
import { courseFaqs, courseSeoFor, ratingSummary, sectionCopy } from "@/lib/coursePage";
import { site } from "@/lib/site";
import CourseCard from "@/components/ui/CourseCard";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";
import RelatedLinks from "@/components/ui/RelatedLinks";
import { relatedForCourse } from "@/lib/related";

import CourseHero from "@/components/courses/detail/CourseHero";
import SectionRail from "@/components/courses/detail/SectionRail";
import BatchStrip from "@/components/courses/detail/BatchStrip";
import Overview from "@/components/courses/detail/Overview";
import Modules from "@/components/courses/detail/Modules";
import LearnPoints from "@/components/courses/detail/LearnPoints";
import WhyChoose from "@/components/courses/detail/WhyChoose";
import WhoCanJoin from "@/components/courses/detail/WhoCanJoin";
import Tools from "@/components/courses/detail/Tools";
import Certification from "@/components/courses/detail/Certification";
import FutureScope from "@/components/courses/detail/FutureScope";
import Compare from "@/components/courses/detail/Compare";
import Reviews from "@/components/courses/detail/Reviews";
import CourseFaqs from "@/components/courses/detail/CourseFaqs";
import EnquiryForm from "@/components/courses/detail/EnquiryForm";

/**
 * The AI menu's course pages, at `/courses/ai/<slug>`.
 *
 * The same design and the same sections as the catalogue route — hero,
 * overview, modules, skills, why-choose, audience, tools, certification,
 * future scope, the comparison, reviews, FAQs and an enquiry form — rendered
 * for the courses the AI panel in `@/lib/site` lists. Some of those belong to
 * this menu alone: their records are not in the catalogue but in
 * `@/lib/content/ai`, so no other menu can grow a page for them.
 *
 * The menu's own list is the sibling `page.tsx`.
 *
 * The sections animate with Framer Motion rather than the site-wide GSAP
 * `data-anim` system, which is why nothing here carries those attributes.
 */

const variant = variants.ai;

export function generateStaticParams() {
  return aiRouteCourses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = aiCourse(slug);
  if (!course) return { title: "Course not found" };

  // A page written to its own keyword brief supplies its own tag and
  // description; every other course keeps the derived pair.
  const seo = courseSeoFor(course);
  const title = seo?.title ?? `${course.title} Course in Mohali`;
  const description =
    seo?.description ??
    `${course.blurb}${course.duration ? ` ${course.duration}` : ""} programme at techcadd Mohali with live projects, internship and placement assistance.`;

  return {
    // A written title is the complete tag the page was briefed with, down to
    // its own brand suffix — the layout template must not append a second one.
    title: seo ? { absolute: seo.title } : title,
    description,
    alternates: { canonical: `${variant.basePath}/${course.slug}` },
    openGraph: {
      title: seo ? title : `${title} | techcadd Mohali`,
      description,
      url: `${site.url}${variant.basePath}/${course.slug}`,
      type: "article",
    },
  };
}

export default async function AiCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = aiCourse(slug);
  if (!course) notFound();

  const related = aiCourses.filter((c) => c.category === course.category && c.slug !== course.slug);
  const fallback = aiCourses.filter((c) => c.slug !== course.slug);
  const suggestions = (related.length ? related : fallback).slice(0, 3);

  const rating = ratingSummary(course);
  const faqs = courseFaqs(course);

  /* ---- Structured data ---------------------------------------------------- *
   * A Course entity plus the FAQ list, so the syllabus and the questions on
   * this page are eligible for rich results rather than being invisible markup.
   */
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      // The page's own H1 where it has one, so a course taught from another
      // centre is not published to search as a Mohali course.
      name: sectionCopy(course, "hero")?.title ?? `${course.title} Course in Mohali`,
      description: course.overview,
      url: `${site.url}${variant.basePath}/${course.slug}`,
      provider: {
        "@type": "EducationalOrganization",
        name: site.legalName,
        url: site.url,
      },
      educationalLevel: course.level,
      teaches: course.tools,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.average,
        reviewCount: String(rating.reviewCount),
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: ["Onsite", "Online"],
        // Omitted rather than emitted empty for a course that advertises no
        // fixed length — a blank courseWorkload is a schema warning.
        ...(course.duration ? { courseWorkload: course.duration } : {}),
        // A course taught from another centre says so, and stops short of the
        // Mohali street address rather than asserting one it does not have.
        location: course.campus
          ? { "@type": "Place", name: `${site.legalName}, ${course.campus}` }
          : {
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

      <CourseHero
        course={course}
        categoryLabel={
          course.duration
            ? `${categoryLabel[course.category]} · ${course.duration}`
            : categoryLabel[course.category]
        }
        rating={rating}
      />

      <BatchStrip course={course} />

      {/* The rail is sticky within this wrapper, so it pins across the course
          sections and releases once they end — it must not follow the reader
          into the related-courses and CTA blocks below. */}
      <div className="relative">
        <SectionRail />

        <Overview course={course} />
        <Modules course={course} />
        <LearnPoints course={course} />
        <WhyChoose course={course} />
        <WhoCanJoin course={course} />
        <Tools course={course} />
        <Certification course={course} />
        <FutureScope course={course} />
        <Compare course={course} />
        <Reviews course={course} />
        <CourseFaqs course={course} />
        <EnquiryForm course={course} />
      </div>

      {/* ---- Related courses ------------------------------------------------ */}
      <section className="bg-subtle py-20 lg:py-24">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                data-anim="words"
                className="font-display text-2xl font-extrabold text-up-ink sm:text-3xl"
              >
                Students also consider
              </h2>
              <div
                data-underline
                className="mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-up-accent to-transparent"
              />
            </div>
            <Link
              data-anim="fade"
              href="/courses"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-up-accent"
            >
              View all courses
              <Icon
                name="arrowRight"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div
            data-anim="up"
            data-anim-stagger
            className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {suggestions.map((c) => (
              <CourseCard key={c.slug} course={c} basePath={variant.basePath} />
            ))}
          </div>
        </div>
      </section>

      {/* "Students also consider" above covers other courses; this reaches the
          pages a reader needs once they have stopped comparing subjects. */}
      <RelatedLinks
        links={relatedForCourse(course)}
        eyebrow="Beyond the syllabus"
        title="Before you decide"
      />

      <CtaBanner />
    </>
  );
}
