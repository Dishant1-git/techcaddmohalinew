import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import type { GalleryAlbum } from "@/lib/cms/content";

/**
 * The gallery index — one card per album.
 *
 * The wall of every photograph used to be the whole page, which meant an album
 * created in the CMS had nowhere to put its title, description or date, and a
 * visitor had no way to tell a graduation ceremony from a Tuesday in the lab.
 * The wall still exists; it now lives inside an album, where the words that
 * belong to those photographs can sit beside them.
 */

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export default function AlbumGrid({ albums }: { albums: GalleryAlbum[] }) {
  if (!albums.length) return null;

  return (
    <div data-anim="up" data-anim-stagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {albums.map((album) => (
        <Link
          key={album.slug}
          href={`/gallery/${album.slug}`}
          className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow duration-300 hover:shadow-[0_28px_70px_-35px_rgba(11,26,77,0.45)]"
        >
          <span className="relative block aspect-[4/3] overflow-hidden bg-hero-950">
            {album.cover ? (
              <Image
                src={album.cover.src}
                alt={album.cover.alt}
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
            ) : (
              <span className="absolute inset-0 bg-gradient-to-br from-hero-800 to-hero-950" />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-hero-950/70 via-hero-950/5 to-transparent" />

            {/* The count is the promise the card makes — how much is behind it. */}
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wide text-up-ink">
              <Icon name="layers" size={12} />
              {album.photos.length} {album.photos.length === 1 ? "photo" : "photos"}
            </span>
          </span>

          <span className="flex flex-1 flex-col p-6">
            {album.date && (
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-up-accent">
                {formatDate(album.date)}
              </span>
            )}

            <span className="mt-2 break-words font-display text-lg font-bold leading-snug text-up-ink transition-colors group-hover:text-up-accent">
              {album.title}
            </span>

            {album.description && (
              <span className="mt-2 line-clamp-3 flex-1 break-words text-sm leading-relaxed text-up-muted">
                {album.description}
              </span>
            )}

            <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-xs font-semibold text-up-accent">
              View album
              <Icon
                name="arrowRight"
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
