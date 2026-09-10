import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RouteIndex from "@/components/courses/RouteIndex";
import CtaBanner from "@/components/home/CtaBanner";
import RelatedLinks from "@/components/ui/RelatedLinks";
import { certificateCourses } from "@/lib/content/certificatePrograms";
import { variants } from "@/lib/courseVariants";

/**
 * The Certificate Programs menu's own page — the segment above
 * `/courses/certificate-programs/<slug>`.
 *
 * One run rather than groups: the menu itself is one grid of cards, and
 * splitting it by category here would invent a hierarchy the menu does not
 * have.
 */

const variant = variants.certificate;

export const metadata: Metadata = {
  title: "Certificate Programs in Mohali — ISO-Certified IT Courses",
  description:
    "ISO-certified certificate programs at techcadd Mohali — cloud computing, MERN full stack, artificial intelligence, data science, cyber security, digital marketing and AutoCAD, each with a documented internship letter and placement support.",
  alternates: { canonical: variant.basePath },
};

export default function CertificateProgramsIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Courses", href: "/courses" }, { label: "Certificate Programs" }]}
        eyebrow={`${certificateCourses.length} certificate tracks`}
        title="Certificate programmes that come with the paperwork employers ask for"
        subtitle="An ISO-certified training certificate, a project completion certificate and a dated internship letter — issued against work you actually built, and verifiable by roll number."
      >
        <div
          data-anim="up"
          data-anim-delay="0.25"
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-up-soft/70"
        >
          {[
            "ISO-certified certification",
            "Documented internship letter",
            "Capstone project certificate",
            "Placement assistance",
          ].map((i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
              {i}
            </span>
          ))}
        </div>
      </PageHero>

      <RouteIndex
        basePath={variant.basePath}
        groups={[{ courses: certificateCourses }]}
        cta={{ label: "See every course we run", href: "/courses" }}
      />

      <RelatedLinks route="/courses" />
      <CtaBanner />
    </>
  );
}
