import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { after12Course, after12RouteCourses } from "@/lib/content/after12";
import { ratingSummary } from "@/lib/coursePage";
import { after12Page } from "@/lib/after12Pages";
import { derivedAfter12Page } from "@/lib/after12Derived";
import { variants } from "@/lib/courseVariants";
import { site } from "@/lib/site";
import SectionRail from "@/components/courses/detail/SectionRail";
import PathwayHero from "@/components/courses/after12/PathwayHero";
import PathwayEnquiry from "@/components/courses/after12/PathwayEnquiry";
import { PathAdvisor, PathFaqs, PathReviews } from "@/components/courses/after12/PathwaySections";
import {
  WrittenApproach,
  WrittenCertificate,
  WrittenCurriculum,
  WrittenFit,
  WrittenLearn,
  WrittenOverview,
  WrittenPopular,
  WrittenProjects,
  WrittenScope,
  WrittenTools,
  WrittenWho,
  WrittenWhyNow,
  WrittenWhyUs,
  WrittenWorth,
} from "@/components/courses/after12/PathwayWritten";

/**
 * The After 12th menu's course pages, at `/courses/after12th/<slug>`.
 *
 * The pathway design: a route map through the programme rather than a
 * document. The menu's own list is the sibling `page.tsx`. See
 * `@/lib/courseVariants` for the four designs and the URLs they own.
 */

const variant = variants.pathway;

export function generateStaticParams() {
  return after12RouteCourses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = after12Course(slug);
  if (!course) return { title: "Course not found" };

  const page = after12Page(slug) ?? derivedAfter12Page(course);
  const title = page.hero.title;
  const description = page.hero.paragraphs[0];

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
  const course = after12Course(slug);
  if (!course) notFound();

  const rating = ratingSummary(course);

  const related = after12RouteCourses
    .filter((c) => c.category === course.category && c.slug !== course.slug)
    .slice(0, 3);
  const suggestions = related.length
    ? related
    : after12RouteCourses.filter((c) => c.slug !== course.slug).slice(0, 3);

  // A slug with a written brief renders it; every other slug renders the same
  // shape derived from its catalogue record, so the route has one layout
  // rather than a full page and a short fallback.
  const written = after12Page(slug) ?? derivedAfter12Page(course, suggestions);
  const faqs = written.faqs;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: written.hero.title,
      description: written.overview.paragraphs.join(" "),
      url: `${site.url}${variant.basePath}/${course.slug}`,
      provider: {
        "@type": "EducationalOrganization",
        name: site.legalName,
        url: site.url,
      },
      educationalLevel: course.level,
      teaches: written.tools.items.map((t) => t.name),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.average,
        reviewCount: String(rating.reviewCount),
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: ["Onsite", "Online"],
        courseWorkload:
          written.program.highlights.find((h) => h.label === "Duration")?.value ?? course.duration,
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

      <PathwayHero course={course} page={written} />

      {/* The rail is sticky within this wrapper, so it pins across the stages
          and releases before the footer blocks. */}
      <div className="relative">
        <SectionRail skin="pathway" sections={written.sections} />

        <WrittenOverview step={1} overview={written.overview} roles={course.roles} />
        <WrittenLearn step={2} learn={written.learn} />
        <WrittenCurriculum step={3} curriculum={written.curriculum} />
        <WrittenTools step={4} tools={written.tools} />
        <WrittenWho step={5} who={written.who} />
        <WrittenWorth step={6} worth={written.worth} />
        <WrittenWhyNow step={7} whyNow={written.whyNow} />

        {/* The page breaks here for a phone call before the credential. No
            step badge: the rail counts stages of the programme, and this is
            an interruption. */}
        <PathAdvisor advisor={written.advisor} />

        <WrittenCertificate step={8} certificate={written.certificate} />
        <WrittenScope step={9} takesYou={written.takesYou} />
        <WrittenProjects step={10} projects={written.projects} />
        <WrittenApproach step={11} approach={written.approach} projects={written.projects.items} />
        <WrittenWhyUs step={12} whyUs={written.whyUs} />
        <PathReviews course={course} step={13} />
        <PathFaqs faqs={faqs} step={14} title="Frequently Asked Questions" />
        <PathwayEnquiry
          course={course}
          step={15}
          title={written.enquiry.title}
          paragraphs={written.enquiry.paragraphs}
        />
      </div>

      <WrittenPopular popular={written.popular} />
      <WrittenFit fit={written.fit} />
    </>
  );
}
