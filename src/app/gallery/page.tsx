import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import AlbumGrid from "@/components/gallery/AlbumGrid";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";
import RelatedLinks from "@/components/ui/RelatedLinks";
import { getGalleryAlbums } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Gallery — Life at techcadd",
  description:
    "Inside the classrooms, labs and live projects at techcadd Mohali — seminars, workshops, placement drives and the everyday work of training students.",
};

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();
  const photoCount = albums.reduce((total, album) => total + album.photos.length, 0);

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
        subtitle="Open an album to see the photographs from that day, full size."
      >
        <div
          data-anim="up"
          data-anim-delay="0.2"
          className="mt-8 flex flex-wrap items-center gap-4 text-sm text-up-soft/70"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
            {albums.length} {albums.length === 1 ? "album" : "albums"}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
            {photoCount} photographs
          </span>
        </div>
      </PageHero>

      <section className="py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Life at techcadd" title="Our Gallery" tone="light" />
          <div className="mt-10">
            <AlbumGrid albums={albums} />
          </div>
        </div>
      </section>

      <RelatedLinks route="/gallery" />
      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
