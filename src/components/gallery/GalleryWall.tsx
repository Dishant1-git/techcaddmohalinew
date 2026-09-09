"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { galleryTiles as builtInTiles, type GalleryTile } from "@/lib/gallery";

/** `tiles` is the wall to render — the page passes the CMS-merged one. */
export default function GalleryWall({ tiles = builtInTiles }: { tiles?: GalleryTile[] }) {
  const reduce = useReducedMotion();
  const wallRef = useRef<HTMLDivElement>(null);

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
      duration: 22,
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

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = wallRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(relX * 26);
    pointerY.set(relY * 18);
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
        className="grid auto-rows-[110px] grid-cols-2 grid-flow-dense gap-3 sm:grid-cols-3 sm:auto-rows-[130px] lg:grid-cols-5 lg:auto-rows-[150px] lg:gap-4"
      >
        {tiles.map((tile, i) => {
          /*
            A tile with a link from the CMS becomes an anchor; the rest stay
            plain divs. Same classes either way, so the wall looks identical
            and only the cursor and keyboard behaviour differ — which is the
            honest signal that one of them goes somewhere.
          */
          const Tag = tile.href ? "a" : "div";
          const linkProps = tile.href
            ? {
                href: tile.href,
                // An absolute URL leaves the site; a path stays on it.
                ...(/^https?:\/\//i.test(tile.href)
                  ? { target: "_blank", rel: "noreferrer" }
                  : {}),
              }
            : {};

          return (
            <Tag
              key={tile.id}
              {...linkProps}
              className={`group relative block overflow-hidden rounded-2xl bg-hero-950 ${tile.span} ${
                tile.href ? "cursor-pointer" : "cursor-default"
              } transition-transform duration-300 ease-out will-change-transform hover:z-10 hover:scale-[1.06] hover:shadow-2xl hover:shadow-hero-950/30`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 34vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                priority={i < 4}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-hero-950/70 via-hero-950/0 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              <span className="absolute bottom-3 left-3 right-3 translate-y-1 text-xs font-semibold text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {/* The editor's caption when there is one, the alt text
                    otherwise — which is what the built-in photos have. */}
                {tile.caption || tile.alt}
                {tile.href && <span className="ml-1 opacity-80">&rarr;</span>}
              </span>
            </Tag>
          );
        })}
      </motion.div>
    </div>
  );
}
