import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CourseExplorer from "@/components/courses/CourseExplorer";
import CtaBanner from "@/components/home/CtaBanner";
import Faq from "@/components/home/Faq";
import type { CategoryKey } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses — AI, Full Stack, Data, Cyber Security & CAD",
  description:
    "Explore all IT and professional courses at techcadd Mohali — artificial intelligence, full-stack development, data science, cyber security, cloud, digital marketing and CAD, with live projects and placement assistance.",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Courses" }]}
        eyebrow="16 job-oriented tracks"
        title={
          <>
            Courses built around what Mohali employers hire for
          </>
        }
        subtitle="Filter by field or search for a technology. Every track includes live projects, an internship option, interview preparation and placement support."
      >
        <div data-anim="up" data-anim-delay="0.25" className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-up-soft/70">
          {["Weekday, weekend & online batches", "EMI options", "Certificate + internship letter", "Free demo class"].map(
            (i) => (
              <span key={i} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
                {i}
              </span>
            ),
          )}
        </div>
      </PageHero>

      <CourseExplorer initialCategory={(category as CategoryKey) ?? "all"} />
      <Faq />
      <CtaBanner />
    </>
  );
}
