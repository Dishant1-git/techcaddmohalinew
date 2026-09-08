import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryWall from "@/components/gallery/GalleryWall";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";
import RelatedLinks from "@/components/ui/RelatedLinks";

export const metadata: Metadata = {
  title: "Gallery — Life at techcadd",
  description:
    "Inside the classrooms, labs and live projects at techcadd — seminars, workshops, placement drives and the everyday work of training students in Jalandhar and across Punjab.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Gallery" }]}
        eyebrow="Gallery"
        title={
          <>
            Inside the classrooms,
            <br />
            labs <span className="text-white/45">and</span> live projects.
          </>
        }
        subtitle="Hover a tile to bring it forward. The wall drifts on its own, and follows your pointer."
      />

      <section className="py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Life at techcadd" title="Our Gallery" tone="light" />
          <div className="mt-10">
            <GalleryWall />
          </div>
        </div>
      </section>

      <RelatedLinks route="/gallery" />
      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
