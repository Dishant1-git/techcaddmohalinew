import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RouteIndex from "@/components/courses/RouteIndex";
import CtaBanner from "@/components/home/CtaBanner";
import RelatedLinks from "@/components/ui/RelatedLinks";
import { coursesMenuCourses } from "@/lib/content/courses";
import { variants } from "@/lib/courseVariants";

/**
 * The Courses menu's own page — the segment above `/courses/course/<slug>`.
 *
 * `/courses` is the catalogue with its filters and search; this is the plain
 * list of what the Courses menu itself links to, so the segment resolves
 * rather than 404s and the menu has a page of its own to point at.
 */

const variant = variants.catalogue;

export const metadata: Metadata = {
  title: "All Courses in Mohali — IT, AI, Development & Design Training",
  description:
    "Every course in the techcadd Mohali catalogue — artificial intelligence, full-stack development, Python, data science, cyber security, cloud, digital marketing, AutoCAD and design — with live projects, internship and placement assistance.",
  alternates: { canonical: variant.basePath },
};

export default function CatalogueIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Courses", href: "/courses" }, { label: "All courses" }]}
        eyebrow={`${coursesMenuCourses.length} job-oriented tracks`}
        title="Every course we run, in one list"
        subtitle="The full catalogue behind the Courses menu. Use the explorer on the courses page if you would rather filter by field or search for a technology."
      >
        <div
          data-anim="up"
          data-anim-delay="0.25"
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-up-soft/70"
        >
          {[
            "Live projects on every track",
            "Weekday, weekend & online batches",
            "EMI options",
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
        groups={[{ courses: coursesMenuCourses }]}
        cta={{ label: "Filter and search the catalogue", href: "/courses" }}
      />

      <RelatedLinks route="/courses" />
      <CtaBanner />
    </>
  );
}
