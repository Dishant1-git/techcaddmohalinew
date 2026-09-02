import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/courses";
import { courseFaqs, ratingSummary } from "@/lib/coursePage";
import { variants } from "@/lib/courseVariants";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import SectionRail from "@/components/courses/detail/SectionRail";
import CertificateHero from "@/components/courses/certificate/CertificateHero";
import { GuillocheDefs } from "@/components/courses/certificate/Motifs";
import CertificateEnquiry from "@/components/courses/certificate/CertificateEnquiry";
import {
  CertFaqs,
  CertLearn,
  CertModules,
  CertOverview,
  CertReviews,
  CertTools,
  CertWho,
  CertWhy,
} from "@/components/courses/certificate/CertificateSections";

/**
 * The Certificate Programs design.
 *
 * Same nine sections as `/courses/[slug]`, and the same course records — this
 * is the credential presentation of them, reached from the Certificate
 * Programs menu. See `@/lib/courseVariants` for why the three designs live at
 * three URLs rather than one.
 */

const variant = variants.certificate;

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

/**
 * A stable per-course reference, printed on the certificate and on the
 * application form. Derived from the slug so it never changes between renders
 * or builds — a reference that moved on every visit would be worthless.
 */
function referenceFor(slug: string) {
  let h = 5381;
  for (let i = 0; i < slug.length; i++) h = (h * 33 + slug.charCodeAt(i)) >>> 0;
  return `TC-${String(h % 100000).padStart(5, "0")}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Programme not found" };

  const title = variant.metaTitle(course);
  const description = `${course.blurb} ${course.duration} certificate programme at techcadd Mohali — ISO-certified credential, live project and placement assistance.`;

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

export default async function CertificateProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const rating = ratingSummary(course);
  const faqs = courseFaqs(course);
  const reference = referenceFor(course.slug);

  const related = courses
    .filter((c) => c.category === course.category && c.slug !== course.slug)
    .slice(0, 4);
  const suggestions = related.length
    ? related
    : courses.filter((c) => c.slug !== course.slug).slice(0, 4);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: variant.metaTitle(course),
      description: course.overview,
      url: `${site.url}${variant.basePath}/${course.slug}`,
      provider: {
        "@type": "EducationalOrganization",
        name: site.legalName,
        url: site.url,
      },
      educationalLevel: course.level,
      teaches: course.tools,
      educationalCredentialAwarded: "ISO-certified training certificate",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.average,
        reviewCount: String(rating.reviewCount),
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: ["Onsite", "Online"],
        courseWorkload: course.duration,
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

      {/* The guilloché geometry, emitted once for every <Guilloche/> below. */}
      <GuillocheDefs />

      <CertificateHero course={course} serial={reference} />

      {/* The rail is sticky within this wrapper, so it pins across the
          programme sections and releases before the footer blocks. */}
      <div className="relative">
        <SectionRail skin="certificate" />

        <CertOverview course={course} />
        <CertModules course={course} />
        <CertLearn course={course} />
        <CertWhy course={course} />
        <CertWho course={course} />
        <CertTools course={course} />
        <CertReviews course={course} />
        <CertFaqs faqs={faqs} />
        <CertificateEnquiry course={course} reference={reference} />
      </div>

      {/* ---- Other certificate programmes ---------------------------------- */}
      <section className="border-t border-up-line bg-white py-20 lg:py-24">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="text-[0.66rem] font-bold uppercase tracking-[0.26em] text-up-muted">
                  Related programmes
                </span>
                <span className="h-px w-16 bg-up-line" />
              </div>
              <h2 className="mt-4 font-display text-2xl font-extrabold text-up-ink sm:text-3xl">
                Other certificates in this field
              </h2>
            </div>
            <Link
              href="/training"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-up-accent"
            >
              All certificate programmes
              <Icon
                name="arrowRight"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-10 grid gap-px bg-up-line sm:grid-cols-2 lg:grid-cols-4">
            {suggestions.map((c) => (
              <Link
                key={c.slug}
                href={`${variant.basePath}/${c.slug}`}
                className="group flex flex-col bg-white p-7 transition-colors hover:bg-subtle"
              >
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-up-muted">
                  {c.duration}
                </span>
                <span className="mt-3 font-display text-lg font-extrabold leading-tight text-up-ink">
                  {c.title}
                </span>
                <span className="mt-3 flex-1 text-sm leading-relaxed text-up-muted">{c.blurb}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-up-accent">
                  View programme
                  <Icon
                    name="arrowRight"
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
