import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RouteIndex from "@/components/courses/RouteIndex";
import CtaBanner from "@/components/home/CtaBanner";
import RelatedLinks from "@/components/ui/RelatedLinks";
import {
  after12Course,
  after12SixMonthSlugs,
  after12ThreeMonthSlugs,
} from "@/lib/content/after12";
import type { Course } from "@/lib/courses";
import { variants } from "@/lib/courseVariants";

/**
 * The After 12th menu's own page — the segment above
 * `/courses/after12th/<slug>`.
 *
 * Two groups rather than one run: the menu itself splits by programme length,
 * and that split is the first question a school leaver actually asks.
 */

const variant = variants.pathway;

export const metadata: Metadata = {
  title: "Courses After 12th in Mohali — 3 & 6 Month Job-Oriented Programmes",
  description:
    "Job-oriented courses after 12th at techcadd Mohali — cloud computing, AI, full-stack development, data science, cyber security, digital marketing and CAD. Any stream, no coding background needed, with live projects and placement assistance.",
  alternates: { canonical: variant.basePath },
};

const bySlug = (slugs: string[]) =>
  slugs.map((slug) => after12Course(slug)).filter((c): c is Course => Boolean(c));

export default function After12thIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Courses", href: "/courses" }, { label: "After 12th" }]}
        eyebrow="Straight from school"
        title="Courses after 12th, built for a first job rather than a first degree"
        subtitle="Any stream, no coding background assumed. Every programme below starts at the fundamentals and finishes on a project you can show in an interview."
      >
        <div
          data-anim="up"
          data-anim-delay="0.25"
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-up-soft/70"
        >
          {[
            "12th pass, any stream",
            "Weekday, weekend & online batches",
            "Certificate + internship letter",
            "Free demo class",
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
        groups={[
          {
            label: "3-month programmes",
            note: "One skill, taught practically, finished inside a term — the quickest route from school to something you can be hired for.",
            courses: bySlug(after12ThreeMonthSlugs),
          },
          {
            label: "6-month programmes",
            note: "The longer tracks: more depth, more project work, and the specialisations employers advertise by name.",
            courses: bySlug(after12SixMonthSlugs),
          },
        ]}
        cta={{ label: "See every course we run", href: "/courses" }}
      />

      <RelatedLinks route="/courses" />
      <CtaBanner />
    </>
  );
}
