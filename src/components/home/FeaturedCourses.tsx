import Link from "next/link";
import { featuredCourses } from "@/lib/courses";
import SectionHeading from "@/components/ui/SectionHeading";
import CourseCard from "@/components/ui/CourseCard";
import Icon from "@/components/ui/Icon";

export default function FeaturedCourses() {
  return (
    <section className="relative bg-subtle py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured courses"
            title="The tracks our students join most"
            subtitle="Each one ends with a deployed project, a certificate and a placement file our hiring partners can read."
          />
          <Link
            data-anim="fade"
            href="/courses"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-up-ink px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-up-accent"
          >
            All 16 courses
            <Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredCourses().map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
