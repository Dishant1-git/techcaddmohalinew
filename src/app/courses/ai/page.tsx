import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RouteIndex from "@/components/courses/RouteIndex";
import CtaBanner from "@/components/home/CtaBanner";
import RelatedLinks from "@/components/ui/RelatedLinks";
import { aiCourses } from "@/lib/content/ai";
import { variants } from "@/lib/courseVariants";

/**
 * The AI menu's own page — the segment above `/courses/ai/<slug>`.
 *
 * One run rather than groups: the AI panel in `@/lib/site` is one column, and
 * splitting it by category here would invent a hierarchy the menu does not
 * have.
 */

const variant = variants.ai;

export const metadata: Metadata = {
  title: "AI Courses in Mohali — Generative AI, Agentic AI, ML & Data",
  description:
    "Artificial intelligence courses at techcadd Mohali — generative AI, agentic AI, prompt engineering, machine learning, deep learning, RAG, Python and data science, taught on live projects with placement assistance.",
  alternates: { canonical: variant.basePath },
};

export default function AiIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Courses", href: "/courses" }, { label: "AI" }]}
        eyebrow={`${aiCourses.length} AI tracks`}
        title="AI courses for people who want to build with it, not just talk about it"
        subtitle="From prompt engineering to agentic systems and production ML — every track is taught on real tooling, with a project you deploy and defend at the end of it."
      >
        <div
          data-anim="up"
          data-anim-delay="0.25"
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-up-soft/70"
        >
          {[
            "Live projects on real models",
            "Weekday, weekend & online batches",
            "Portfolio + internship letter",
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
        groups={[{ courses: aiCourses }]}
        cta={{ label: "See every course we run", href: "/courses" }}
      />

      <RelatedLinks route="/courses" />
      <CtaBanner />
    </>
  );
}
