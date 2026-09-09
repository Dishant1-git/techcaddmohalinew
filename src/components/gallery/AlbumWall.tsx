"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import Icon from "@/components/ui/Icon";
import type { GalleryPhoto } from "@/lib/cms/content";

/**
 * An album's photographs, as the drifting wall, with a viewer over it.
 *
 * Two problems this solves that the plain wall had. The tiles are cropped to
 * their masonry cell, so a portrait photograph showed as a slice of itself and
 * there was no way to see the rest of it; and a caption written in the CMS was
 * never rendered anywhere, which made an editor's work look like it had not
 * saved.
 *
 * Hovering a tile now fits the whole photograph inside its cell instead of
 * filling it — the picture completes itself in place — and clicking floats it
 * over the page at full size with its caption. Arrow keys move between
 * photographs, so the viewer is a way through the album rather than something
 * to open and close twenty-one times.
 */

/* -------------------------------------------------------------------------- *
 *                                 The viewer                                  *
 * -------------------------------------------------------------------------- */

function Lightbox({
  photos,
  index,
  onClose,
  onMove,
}: {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onMove: (next: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];
  const many = photos.length > 1;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      // Wrapping rather than stopping at the ends: an album is a loop to
      // browse, not a list to fall off.
      if (event.key === "ArrowRight" && many) onMove((index + 1) % photos.length);
      if (event.key === "ArrowLeft" && many) onMove((index - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [index, photos.length, many, onClose, onMove]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption || photo.alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-hero-950/92 p-4 backdrop-blur-sm sm:p-8"
    >
      {/* Controls sit above the image and must not close the dialog. */}
      <div
        className="mb-3 flex w-full max-w-5xl items-center justify-between gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-up-soft/70">
          {index + 1} / {photos.length}
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
        {many && (
          <button
            onClick={() => onMove((index - 1 + photos.length) % photos.length)}
            aria-label="Previous photo"
            className="absolute left-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-hero-950/70 text-white transition-colors hover:bg-white/20 sm:-left-4"
          >
            <Icon name="arrowRight" size={18} className="rotate-180" />
          </button>
        )}

        {/*
          `object-contain` inside a fixed box: the whole photograph, whatever
          its shape, with nothing cropped away — which is the entire point of
          opening it.
        */}
        <div className="relative h-[60vh] w-full sm:h-[70vh]">
          <Image
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-contain"
            priority
          />
        </div>

        {many && (
          <button
            onClick={() => onMove((index + 1) % photos.length)}
            aria-label="Next photo"
            className="absolute right-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-hero-950/70 text-white transition-colors hover:bg-white/20 sm:-right-4"
          >
            <Icon name="arrowRight" size={18} />
          </button>
        )}
      </div>

      <div
        className="mt-4 w-full max-w-5xl text-center"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="break-words text-sm text-white/90">{photo.caption || photo.alt}</p>
        {photo.href && (
          <a
            href={photo.href}
            target={/^https?:\/\//i.test(photo.href) ? "_blank" : undefined}
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-up-soft/80 transition-colors hover:text-white"
          >
            Read more
            <Icon name="arrowUpRight" size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- *
 *                                  The wall                                   *
 * -------------------------------------------------------------------------- */

export default function AlbumWall({ photos }: { photos: GalleryPhoto[] }) {
  const reduce = useReducedMotion();
  const wallRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 45, damping: 20, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 45, damping: 20, mass: 0.6 });

  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);

  const x = useTransform([springX, driftX], ([p, d]) => (p as number) + (d as number));
  const y = useTransform([springY, driftY], ([p, d]) => (p as number) + (d as number));

  useEffect(() => {
    if (reduce) return;
    const cx = animate(driftX, [0, 14, -10, 6, 0], {
      duration: 30,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const cy = animate(driftY, [0, -10, 8, -6, 0], {
      duration: 26,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => {
      cx.stop();
      cy.stop();
    };
  }, [reduce, driftX, driftY]);

  // The drift is a background effect; it must stop while a photo is open or
  // the page behind the viewer keeps moving in the corner of the eye.
  const close = useCallback(() => setOpen(null), []);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || open !== null) return;
    const rect = wallRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(((e.clientX - rect.left) / rect.width - 0.5) * 26);
    pointerY.set(((e.clientY - rect.top) / rect.height - 0.5) * 18);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={wallRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative"
    >
      <motion.div
        style={reduce ? undefined : { x, y }}
        className="grid auto-rows-[110px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[130px] sm:grid-cols-3 lg:auto-rows-[150px] lg:grid-cols-5 lg:gap-4"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`View ${photo.caption || photo.alt}`}
            className={`group relative overflow-hidden rounded-2xl bg-hero-950 ${photo.span} cursor-zoom-in text-left transition-transform duration-300 ease-out will-change-transform hover:z-10 hover:scale-[1.06] hover:shadow-2xl hover:shadow-hero-950/30`}
          >
            {/*
              Two copies of the same file, cross-faded on hover.

              The cropped one is the wall's composition — every cell filled,
              no gaps. The contained one is the whole photograph, letterboxed
              inside the same cell. Swapping `object-fit` on a single element
              cannot be transitioned, and animating it by class produced a jump;
              two stacked images fade cleanly. The browser fetches the file
              once, so the second copy costs layout, not bandwidth.
            */}
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 34vw, 50vw"
              className="object-cover transition-opacity duration-300 group-hover:opacity-0"
              priority={i < 4}
            />
            <Image
              src={photo.src}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 34vw, 50vw"
              className="scale-95 object-contain opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
            />

            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hero-950/80 via-hero-950/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />

            <span className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-1 text-xs font-semibold leading-snug text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="line-clamp-3">{photo.caption || photo.alt}</span>
            </span>

            <span className="pointer-events-none absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Icon name="search" size={13} className="text-up-ink" />
            </span>
          </button>
        ))}
      </motion.div>

      {open !== null && (
        <Lightbox photos={photos} index={open} onClose={close} onMove={setOpen} />
      )}
    </div>
  );
}
