import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import AlbumWall from "@/components/gallery/AlbumWall";
import AlbumGrid from "@/components/gallery/AlbumGrid";
import Icon from "@/components/ui/Icon";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";
import RelatedLinks from "@/components/ui/RelatedLinks";
import { getGalleryAlbum, getGalleryAlbums } from "@/lib/cms/content";
import { site } from "@/lib/site";

/**
 * One album: what it is, when it was, and its photographs.
 *
 * The drifting wall lives here rather than on the index, so it belongs to a
 * set of pictures that has a title and a description instead of being an
 * undifferentiated pile. Clicking any tile floats it full size — see
 * `AlbumWall`.
 */

export async function generateStaticParams() {
  const albums = await getGalleryAlbums();
  return albums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = await getGalleryAlbum(slug);
  if (!album) return { title: "Album not found" };

  const description =
    album.description || `${album.photos.length} photographs from techcadd Mohali.`;

  return {
    title: `${album.title} — Gallery`,
    description,
    alternates: { canonical: `/gallery/${album.slug}` },
    openGraph: {
      title: `${album.title} | techcadd Mohali`,
      description,
      url: `${site.url}/gallery/${album.slug}`,
      type: "article",
      images: album.cover ? [album.cover.src] : undefined,
    },
  };
}

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const albums = await getGalleryAlbums();
  const album = albums.find((item) => item.slug === slug);
  if (!album) notFound();

  const others = albums.filter((item) => item.slug !== album.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Gallery", href: "/gallery" }, { label: album.title }]}
        eyebrow="Album"
        title={album.title}
        subtitle={album.description}
      >
        <div
          data-anim="up"
          data-anim-delay="0.2"
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-up-soft/75"
        >
          <span className="inline-flex items-center gap-2">
            <Icon name="layers" size={15} className="text-accent-yellow" />
            {album.photos.length} {album.photos.length === 1 ? "photograph" : "photographs"}
          </span>
          {album.date && (
            <span className="inline-flex items-center gap-2">
              <Icon name="calendar" size={15} className="text-accent-yellow" />
              {formatDate(album.date)}
            </span>
          )}
          <span className="inline-flex items-center gap-2">
            <Icon name="search" size={15} className="text-accent-yellow" />
            Click any photo to open it full size
          </span>
        </div>
      </PageHero>

      <section className="py-16 lg:py-20">
        <div className="container-x">
          <AlbumWall photos={album.photos} />
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-line bg-subtle py-20 lg:py-24">
          <div className="container-x">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <h2
                data-anim="words"
                className="font-display text-2xl font-extrabold text-up-ink sm:text-3xl"
              >
                More albums
              </h2>
              <Link
                data-anim="fade"
                href="/gallery"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-up-accent"
              >
                All albums
                <Icon
                  name="arrowRight"
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="mt-10">
              <AlbumGrid albums={others} />
            </div>
          </div>
        </section>
      )}

      <RelatedLinks route="/gallery" />
      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
