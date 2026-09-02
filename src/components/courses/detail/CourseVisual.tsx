"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { Course } from "@/lib/courses";
import { categoryArt, courseImage, ratingSummary } from "@/lib/coursePage";
import Icon from "@/components/ui/Icon";
import { EASE } from "@/components/courses/detail/Motion";
import CourseCircuit from "@/components/courses/detail/CourseCircuit";

/**
 * The image beside the course overview.
 *
 * Renders a photograph when one is registered for the slug in
 * `courseImages`, and otherwise composes artwork from the course's own
 * category gradient — the same treatment the navbar's feature cards use, so a
 * course with no photo yet still looks finished rather than empty.
 *
 * Two credential cards are anchored to the frame's corners. They carry real
 * information (accreditation, rating) rather than decoration, which is what
 * keeps the panel reading as part of the page instead of a stock image.
 */
export default function CourseVisual({ course }: { course: Course }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const photo = courseImage(course);
  const art = categoryArt(course);
  const rating = ratingSummary(course);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lift = useSpring(useTransform(scrollYProgress, [0, 1], [26, -26]), {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: EASE }}
      style={reduce ? undefined : { y: lift }}
      className="relative"
    >
      <figure className="relative overflow-hidden rounded-[1.75rem] border border-line bg-hero-950 shadow-[0_40px_90px_-50px_rgba(11,26,77,0.55)]">
        <div className="relative aspect-[5/4] w-full lg:aspect-[4/5]">
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              priority={false}
            />
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${art.gradient} opacity-25`} />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_20%,rgba(6,14,43,0.55)_0%,rgba(6,14,43,0.92)_100%)]" />
              <div className="absolute inset-0 grid-lines opacity-70" />

              {/* The programme drawn as a live circuit — modules feeding the
                  qualification, with the stack it teaches in orbit. */}
              <CourseCircuit course={course} />
            </>
          )}

          {/* Scrim, so the caption stays legible over a photo or the artwork. */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-hero-950 via-hero-950/70 to-transparent" />

          <div className="absolute left-6 top-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-hero-950/50 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow" />
              {art.label}
            </span>
          </div>

          <figcaption className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
            <p className="font-display text-xl font-extrabold leading-tight text-white lg:text-2xl">
              {course.title}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-up-soft/75">
              <span>{course.duration}</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>{course.level}</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>Mohali &amp; live online</span>
            </p>
          </figcaption>
        </div>
      </figure>

      {/* ---- Credential cards -------------------------------------------- */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18, x: 18 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
        className="absolute -right-3 top-8 rounded-2xl border border-line bg-white px-4 py-3 shadow-[0_20px_40px_-24px_rgba(11,26,77,0.45)] lg:-right-6"
      >
        <div className="flex items-center gap-2.5">
          <Icon name="star" size={15} className="fill-accent-yellow text-accent-yellow" />
          <div>
            <p className="font-display text-sm font-extrabold leading-none text-up-ink">
              {rating.average} / 5
            </p>
            <p className="mt-1 text-[0.65rem] text-up-muted">{rating.reviewCount} reviews</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18, x: -18 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        className="absolute -left-3 bottom-8 rounded-2xl border border-line bg-white px-4 py-3 shadow-[0_20px_40px_-24px_rgba(11,26,77,0.45)] lg:-left-6"
      >
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-up-accent">
            <Icon name="certificate" size={16} />
          </span>
          <div>
            <p className="text-sm font-bold leading-none text-up-ink">ISO certified</p>
            <p className="mt-1 text-[0.65rem] text-up-muted">Certificate + internship letter</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
