import Image from "next/image";
import Link from "next/link";
import { collage, pillars } from "@/lib/about";
import Icon from "@/components/ui/Icon";

/**
 * The home page's about section: vision and mission, with a collage alongside.
 *
 * The collage is absolutely positioned inside a fixed-aspect box, so the tiles
 * hold their arrangement and their overlaps at every width instead of reflowing
 * into a grid. Below lg it becomes a plain two-column grid, where a scattered
 * layout has no room to read.
 */
export default function AboutStrip() {
  return (
    <section
      id="vision"
      className="relative scroll-mt-32 overflow-hidden bg-hero-950 py-24 text-white lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_78%_45%,rgba(28,83,209,0.35),transparent_68%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_10%_15%,rgba(0,212,255,0.14),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-20">
        {/* ------------------------------- Copy ------------------------------- */}
        <div>
          <div className="space-y-14 lg:space-y-16">
            {pillars.map((pillar, i) => (
              <div key={pillar.title} data-anim="up" data-anim-delay={`${i * 0.12}`}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-up-soft/80 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-glow shadow-[0_0_10px_2px_rgba(0,212,255,0.7)]" />
                  {pillar.eyebrow}
                </span>

                <h2 className="mt-5 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-tight sm:text-[2.6rem]">
                  {pillar.title}
                </h2>

                <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-up-soft/65">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>

          <Link
            data-anim="fade"
            href="/about"
            className="group mt-12 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/5"
          >
            More about the institute
            <Icon
              name="arrowRight"
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ------------------------------ Collage ----------------------------- */}
        <div data-anim="right" className="relative mx-auto hidden aspect-[5/6] w-full max-w-md lg:block">
          {collage.map((tile, i) => (
            <figure
              key={tile.key}
              style={{
                left: `${tile.x}%`,
                top: `${tile.y}%`,
                width: `${tile.w}%`,
                height: `${tile.h}%`,
                // Smaller tiles sit over the tall one, as in the reference.
                zIndex: i === 0 ? 10 : 20,
              }}
              className="absolute overflow-hidden rounded-[1.5rem] border border-white/12 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)]"
            >
              {tile.photo ? (
                <Image
                  src={tile.photo.src}
                  alt={tile.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${tile.art}`} />
                  <div className="absolute inset-0 grid-lines opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-hero-950/85 via-hero-950/20 to-transparent" />
                </>
              )}

              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3.5">
                <Icon name={tile.icon} size={14} className="shrink-0 text-accent-glow" />
                <span className="truncate text-[0.68rem] font-semibold text-white">
                  {tile.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Scattered tiles need width to read; below lg they become a grid. */}
        <div data-anim="up" className="grid grid-cols-2 gap-4 lg:hidden">
          {collage.map((tile) => (
            <figure
              key={tile.key}
              className={`relative overflow-hidden rounded-2xl border border-white/12 ${
                tile.key === "campus" ? "col-span-2 aspect-[16/10]" : "aspect-square"
              }`}
            >
              {tile.photo ? (
                <Image
                  src={tile.photo.src}
                  alt={tile.photo.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              ) : (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${tile.art}`} />
                  <div className="absolute inset-0 grid-lines opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-hero-950/85 via-hero-950/20 to-transparent" />
                </>
              )}
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3">
                <Icon name={tile.icon} size={13} className="shrink-0 text-accent-glow" />
                <span className="truncate text-[0.66rem] font-semibold text-white">
                  {tile.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
