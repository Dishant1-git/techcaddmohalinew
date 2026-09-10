"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { galleryWallTiles, type GalleryWallTile } from "@/lib/gallery-wall";

/**
 * The gallery wall — three rows of photographs drifting in alternating
 * directions, any of which opens full size.
 *
 * Each row holds its tiles twice and the track is animated by exactly half its
 * own width, so the second copy has arrived where the first began by the time
 * the loop restarts and the seam is never visible. The duplicate is
 * `aria-hidden` and out of the tab order — a screen reader and a keyboard
 * should meet every photograph once, not twice.
 *
 * The rows pause on hover (in CSS) so a moving photograph can still be aimed
 * at, and stop entirely under `prefers-reduced-motion`.
 */

/* -------------------------------------------------------------------------- *
 *                                 The viewer                                  *
 * -------------------------------------------------------------------------- */

function Lightbox({
  tiles,
  index,
  onClose,
  onMove,
}: {
  tiles: GalleryWallTile[];
  index: number;
  onClose: () => void;
  onMove: (next: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const tile = tiles[index];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      // Wrapping rather than stopping at the ends: the wall is a loop to
      // browse, not a list to fall off.
      if (event.key === "ArrowRight") onMove((index + 1) % tiles.length);
      if (event.key === "ArrowLeft") onMove((index - 1 + tiles.length) % tiles.length);
    };
    document.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [index, tiles.length, onClose, onMove]);

  if (!tile) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tile.title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-hero-950/92 p-4 backdrop-blur-sm sm:p-8"
    >
      {/* Controls sit above the image and must not close the dialog. */}
      <div
        className="mb-3 flex w-full max-w-5xl items-center justify-between gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-up-soft/70">
          {index + 1} / {tiles.length}
        </p>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <Icon name="close" size={18} />
        </button>
      </div>

      <div
        className="relative flex w-full max-w-5xl flex-1 items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={() => onMove((index - 1 + tiles.length) % tiles.length)}
          aria-label="Previous photo"
          className="absolute left-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-hero-950/70 text-white transition-colors hover:bg-white/20 sm:-left-4"
        >
          <Icon name="arrowRight" size={18} className="rotate-180" />
        </button>

        {/*
          `object-contain` inside a fixed box: the whole photograph, whatever
          its shape, with nothing cropped away — which is the point of opening
          one off a wall that crops them all.
        */}
        <div className="relative h-[60vh] w-full sm:h-[70vh]">
          <Image
            key={tile.image}
            src={tile.image}
            alt={tile.title}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-contain"
            priority
          />
        </div>

        <button
          onClick={() => onMove((index + 1) % tiles.length)}
          aria-label="Next photo"
          className="absolute right-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-hero-950/70 text-white transition-colors hover:bg-white/20 sm:-right-4"
        >
          <Icon name="arrowRight" size={18} />
        </button>
      </div>

      <p
        className="mt-4 w-full max-w-5xl break-words text-center text-sm text-white/90"
        onClick={(event) => event.stopPropagation()}
      >
        {tile.title}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- *
 *                                  The rows                                   *
 * -------------------------------------------------------------------------- */

/**
 * Three rows of equal length. The index wraps, so a set of photographs that
 * does not divide by three still fills every row instead of leaving the last
 * one short — the wall reads as a wall, not as a list that ran out.
 */
function rowsOf(tiles: GalleryWallTile[]): GalleryWallTile[][] {
  if (!tiles.length) return [];

  const perRow = Math.max(4, Math.ceil(tiles.length / 3));

  return [0, 1, 2].map((row) =>
    Array.from({ length: perRow }, (_, i) => tiles[(row * perRow + i) % tiles.length]),
  );
}

/** Different speeds per row, so the three never line up into one block. */
const DURATIONS = ["56s", "76s", "64s"];

export default function GalleryMarquee({ tiles = galleryWallTiles }: { tiles?: GalleryWallTile[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  if (!tiles.length) return null;

  const rows = rowsOf(tiles);

  return (
    <>
      <div className="space-y-4 lg:space-y-5">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="marquee-fade overflow-hidden">
            <ul
              className={`flex w-max ${rowIndex % 2 === 1 ? "marquee-left" : "marquee-right"}`}
              style={{ "--marquee-duration": DURATIONS[rowIndex % DURATIONS.length] } as React.CSSProperties}
            >
              {[false, true].map((clone) => (
                <li key={String(clone)} className="flex" aria-hidden={clone || undefined}>
                  {row.map((tile, i) => (
                    <button
                      key={`${tile.image}-${i}`}
                      type="button"
                      tabIndex={clone ? -1 : 0}
                      onClick={() => setOpen(tiles.indexOf(tile))}
                      aria-label={`Open ${tile.title} in the gallery viewer`}
                      className="group relative mr-4 h-[130px] w-[200px] shrink-0 overflow-hidden rounded-xl border border-line bg-hero-950 transition-shadow duration-500 hover:shadow-[0_22px_50px_-24px_rgba(11,26,77,0.45)] sm:h-[160px] sm:w-[250px] lg:mr-5 lg:h-[190px] lg:w-[300px]"
                    >
                      <Image
                        src={tile.image}
                        alt={clone ? "" : tile.title}
                        fill
                        sizes="(min-width: 1024px) 300px, (min-width: 640px) 250px, 200px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {open !== null && (
        <Lightbox tiles={tiles} index={open} onClose={close} onMove={setOpen} />
      )}
    </>
  );
}
