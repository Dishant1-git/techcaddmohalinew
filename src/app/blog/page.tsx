import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import BlogGrid from "@/components/blog/BlogGrid";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Blog — Course Guides, Hiring Trends & Career Advice",
  description:
    "Course guides, hiring trends and career advice from the techcadd Mohali trainers and placement team — what employers actually ask for, across development, AI, marketing, security and CAD.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Blog" }]}
        eyebrow="Blog"
        title={
          <>
            <span className="text-white/45">Notes from the </span>classroom
            <br />
            <span className="text-white/45">and the </span>codebase.
          </>
        }
        subtitle="Course guides, hiring trends and career advice, written by the trainers and placement team who see what employers actually ask for."
      />

      <section className="py-16 lg:py-20">
        <div className="container-x">
          <BlogGrid />
        </div>
      </section>

      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
