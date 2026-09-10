import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { certificateCourse, certificateRouteCourses } from "@/lib/content/certificatePrograms";
import { certificateWritten } from "@/lib/certificateWritten";
import { courseFaqs, ratingSummary } from "@/lib/coursePage";
import { variants } from "@/lib/courseVariants";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import SectionRail from "@/components/courses/detail/SectionRail";
import CertificateHero from "@/components/courses/certificate/CertificateHero";
import { GuillocheDefs } from "@/components/courses/certificate/Motifs";
import CertificateEnquiry from "@/components/courses/certificate/CertificateEnquiry";
import CertificateTracks from "@/components/courses/certificate/CertificateTracks";
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
import {
  CertCertification,
  CertClosing,
  CertInstitute,
  CertModes,
  CertProjects,
  CertScope,
} from "@/components/courses/certificate/CertificateWritten";

/**
 * The Certificate Programs design, at `/courses/certificate-programs/<slug>`.
 *
 * Same sections as the catalogue route, and the same course records — this is
 * the credential presentation of them, reached from the Certificate Programs
 * menu. The menu's own list is the sibling `page.tsx`. See
 * `@/lib/courseVariants` for why the four designs live at four URLs rather
 * than one.
 */

const variant = variants.certificate;

export function generateStaticParams() {
  return certificateRouteCourses.map((c) => ({ slug: c.slug }));
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
  const course = certificateCourse(slug);
  if (!course) return { title: "Programme not found" };

  // A programme written to its own brief titles itself; the rest take the
  // variant's derived title.
  const written = certificateWritten(course);
  const title = written?.hero.title ?? variant.metaTitle(course);
  const description =
    written?.hero.lead ??
    `${course.blurb}${course.duration ? ` ${course.duration}` : ""} certificate programme at techcadd Mohali — ISO-certified credential, live project and placement assistance.`;

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
  const course = certificateCourse(slug);
  if (!course) notFound();

  const rating = ratingSummary(course);
  const faqs = courseFaqs(course);
  const reference = referenceFor(course.slug);

  // A programme written to its own brief states its own headings and renders
  // the extra sections that brief has copy for. Every other programme derives
  // the eight numbered sections and renders none of them.
  const written = certificateWritten(course);
  const head = (id: string) => written?.headings[id];

  const related = certificateRouteCourses
    .filter((c) => c.category === course.category && c.slug !== course.slug)
    .slice(0, 4);
  const suggestions = related.length
    ? related
    : certificateRouteCourses.filter((c) => c.slug !== course.slug).slice(0, 4);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: written?.hero.title ?? variant.metaTitle(course),
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
        ...(course.duration ? { courseWorkload: course.duration } : {}),
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
      // The written page asks and answers its future-scope section as questions
      // too, so they belong in the same block rather than being invisible to
      // search because they render under their own heading.
      mainEntity: [...faqs, ...(written?.scope ?? [])].map((f) => ({
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

      <CertificateHero course={course} serial={reference} written={written?.hero} />

      {/* Length first: which of 3 / 6 / 9 months you take is the question that
          comes up before the syllabus does. Outside the rail wrapper below, so
          it stays clear of the numbered sections the course designs share. */}
      <CertificateTracks course={course} heading={head("tracks")} />

      {/* The rail is sticky within this wrapper, so it pins across the
          programme sections and releases before the footer blocks. */}
      <div className="relative">
        <SectionRail skin="certificate" sections={written?.sections} />

        <CertOverview course={course} heading={head("overview")} />
        <CertModules course={course} heading={head("modules")} />
        <CertLearn course={course} heading={head("learn")} />
        <CertWhy course={course} heading={head("why")} />
        <CertWho course={course} heading={head("who")} />
        <CertTools course={course} heading={head("tools")} />

        {/* Written-only sections. The brief has copy for each; a derived
            programme has none, and renders nothing here. */}
        {written && (
          <>
            <CertCertification items={written.certification} heading={head("certification")} />
            <CertScope items={written.scope} heading={head("scope")} />
            <CertProjects items={written.projects} heading={head("projects")} />
            <CertInstitute
              items={written.institute}
              comparison={written.comparison}
              heading={head("institute")}
            />
            <CertModes items={written.modes} heading={head("modes")} />
          </>
        )}

        <CertReviews course={course} heading={head("reviews")} />
        <CertFaqs faqs={faqs} heading={head("faqs")} />
        <CertificateEnquiry
          course={course}
          reference={reference}
          index={written ? String(written.sections.length).padStart(2, "0") : undefined}
        />
      </div>

      {written && <CertClosing closing={written.closing} />}

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
                  {c.duration ?? "Flexible batches"}
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
