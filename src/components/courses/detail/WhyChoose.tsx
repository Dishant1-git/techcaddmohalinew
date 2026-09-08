"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import type { Course } from "@/lib/courses";
import { sectionCopy, whyChoose } from "@/lib/coursePage";
import { stats } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/courses/detail/Motion";
import SpotlightCard from "@/components/courses/detail/SpotlightCard";
import HudCorners from "@/components/courses/detail/HudCorners";
import CountUp from "@/components/courses/detail/CountUp";

/**
 * Why choose techcadd for this course — the dark section that breaks up the
 * run of light ones.
 *
 * An editorial split: the argument, the proof row and the demo-class call sit
 * in a column that pins, while the reasons run past it on the right threaded
 * onto a progress rail. Reading is the interaction — the rail fills with the
 * scroll, the card in the middle of the viewport lights up and its icon takes
 * the brand gradient, and the step counter in the pinned column follows it.
 * Nothing is clamped or scaled to fit a screen, so the section works with
 * however many reasons a course carries.
 *
 * Every effect here is opacity, colour or transform only — no layout property
 * is animated, so the whole section stays on the compositor. Under
 * `prefers-reduced-motion` the entrances, the parallax and the counter's
 * transition are dropped; the rail and the active card resolve to static.
 */

/** The short proof row under the heading. */
const PROOF = [
  "Trainers from the industry",
  "Live projects from week three",
  "ISO-certified certification",
  "Placement support until you are hired",
];

/**
 * The reasons arrive one after another, each de-blurring as it rises.
 *
 * The blur is what separates this from a plain fade: it reads as the card
 * coming into focus rather than simply appearing, and it costs nothing extra
 * because opacity, transform and filter are all composited.
 */
const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

const reasonVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

/* -------------------------------------------------------------------------- *
 *                                One reason                                   *
 * -------------------------------------------------------------------------- */

function Reason({
  item,
  index,
  onEnter,
}: {
  item: { icon: string; title: string; body: string };
  index: number;
  onEnter: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // The reading band: the middle tenth of the viewport. A card is "active"
  // only while it is the one being read, which is what keeps exactly one card
  // lit at a time rather than every card that happens to be on screen.
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (active) onEnter(index);
  }, [active, index, onEnter]);

  return (
    <motion.div ref={ref} variants={reduce ? undefined : reasonVariants}>
      <SpotlightCard
        tone="dark"
        lift={4}
        radius={16}
        className={`group relative h-full rounded-2xl border p-6 text-accent-glow backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-700 sm:p-7 ${
          active
            ? "border-accent-glow/45 bg-white/[0.085] shadow-[0_30px_70px_-40px_rgba(0,212,255,0.55)]"
            : "border-white/12 bg-white/[0.045] hover:border-accent-glow/30"
        }`}
      >
        <HudCorners onGroupHover className="text-accent-glow/35" inset="0.6rem" />

        {/* The top-edge hairline, lit while the card is the one being read. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-accent-glow to-transparent transition-opacity duration-700 ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* The rail node. It sits on the track drawn by the list, so it needs
            no measuring — it is positioned from the card's own left edge. */}
        <span
          aria-hidden
          className="absolute left-[-2.5rem] top-9 hidden -translate-x-1/2 lg:block"
        >
          <span
            className={`block h-2.5 w-2.5 rounded-full border transition-all duration-700 ${
              active
                ? "scale-125 border-accent-glow bg-accent-glow shadow-[0_0_0_5px_rgba(0,212,255,0.16)]"
                : "border-white/25 bg-hero-950"
            }`}
          />
        </span>

        <div className="flex items-start gap-5">
          <span
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-all duration-700 sm:h-14 sm:w-14 ${
              active
                ? "bg-gradient-to-br from-hero-600 to-hero-glow text-white shadow-lg shadow-hero-600/30"
                : "bg-white/8 text-accent-glow group-hover:bg-white/12"
            }`}
          >
            <Icon name={item.icon} size={22} />
          </span>

          <div className="min-w-0 flex-1">
            <h3
              className={`font-display text-lg font-bold leading-snug transition-colors duration-700 sm:text-xl ${
                active ? "text-white" : "text-white/85"
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`mt-2.5 text-sm leading-relaxed transition-colors duration-700 sm:text-[0.95rem] ${
                active ? "text-up-soft/85" : "text-up-soft/60"
              }`}
            >
              {item.body}
            </p>
          </div>

          {/* The index, as a watermark — it numbers the list without taking a
              column of its own on a narrow card. */}
          <span
            aria-hidden
            className={`hidden font-display text-2xl font-extrabold leading-none transition-colors duration-700 sm:block ${
              active ? "text-accent-glow/45" : "text-white/10"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- *
 *                                 The section                                 *
 * -------------------------------------------------------------------------- */

export default function WhyChoose({ course }: { course: Course }) {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const reasons = whyChoose(course);
  const copy = sectionCopy(course, "why");

  const [active, setActive] = useState(0);
  // Stable, so the effect inside each card fires on visibility alone and not
  // because the parent handed it a new function on every render.
  const onEnter = useCallback((i: number) => setActive(i), []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobA = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const blobB = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  // The rail fills against the list itself, measured to the same band the
  // cards report from, so the fill and the lit card agree.
  const { scrollYProgress: listProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 65%"],
  });
  const fill = useSpring(listProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section
      ref={ref}
      id="why"
      // No `overflow-hidden` here, deliberately: any overflow other than
      // visible makes this element a scroll container, and the sticky column
      // inside would then pin to the section instead of the viewport — which
      // is to say, not pin at all. The decoration is clipped by its own
      // wrapper below instead.
      className="relative scroll-mt-36 bg-hero-950 py-20 text-white lg:py-28"
    >
      {/* ---- Ambient field ----------------------------------------------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_0%,#123285_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_85%_80%,#1c53d1_0%,transparent_55%)]" />
        <div className="absolute inset-0 grid-lines opacity-60" />
        <motion.div
          className="glow-blob left-[-5%] top-[10%] h-[340px] w-[340px] bg-accent-glow/20"
          style={reduce ? undefined : { y: blobA }}
        />
        <motion.div
          className="glow-blob bottom-[-10%] right-[2%] h-[320px] w-[320px] bg-hero-glow/25"
          style={reduce ? undefined : { y: blobB }}
        />
      </div>

      <div className="container-x relative">
        <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-20">
          {/* ---- The argument. Pins while the reasons scroll past. -------- */}
          <div className="lg:sticky lg:top-44">
            <SectionTitle
              tone="dark"
              eyebrow="Why choose us"
              title={
                copy?.title ??
                "Graduate with a portfolio and interview preparation employers can verify."
              }
              subtitle={
                copy?.intro ??
                `Every ${course.title} batch is taught by working professionals, builds on live projects from the third week, and hands over to a placement team that keeps working until you are hired.`
              }
            />

            <Reveal delay={0.15}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {PROOF.map((t) => (
                  <li
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-xs font-semibold tracking-wide text-up-soft/80 backdrop-blur-sm transition-colors duration-500 hover:border-accent-glow/35 hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent-glow" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* ---- Step counter ------------------------------------------ */}
            <Reveal delay={0.2}>
              <div className="mt-10 hidden lg:block">
                <div className="flex items-baseline gap-2 font-display leading-none">
                  {reduce ? (
                    <span className="text-4xl font-extrabold text-white">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                  ) : (
                    <span className="relative block h-9 w-[1.6em] overflow-hidden">
                      <AnimatePresence initial={false}>
                        <motion.span
                          key={active}
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: "0%", opacity: 1 }}
                          exit={{ y: "-100%", opacity: 0 }}
                          transition={{ duration: 0.42, ease: EASE }}
                          className="absolute inset-0 text-4xl font-extrabold text-white"
                        >
                          {String(active + 1).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  )}
                  <span className="text-lg font-bold text-up-soft/35">
                    / {String(reasons.length).padStart(2, "0")}
                  </span>
                </div>

              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-9 rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-white/20">
                <p className="text-sm leading-relaxed text-up-soft/70">
                  {copy?.note ?? (
                    <>
                      {reasons.length} reasons the {course.title} track produces people who get
                      hired, rather than people who finished a syllabus.
                    </>
                  )}
                </p>
                <Link
                  href="/contact"
                  className="group relative mt-5 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent-glow to-hero-glow px-7 py-3.5 text-sm font-bold text-hero-950 shadow-lg shadow-accent-glow/20 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {/* A light sweep across the button on hover. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span className="relative">Book a free demo class</span>
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ---- The reasons, threaded onto the rail ---------------------- */}
          <div ref={listRef} className="relative lg:pl-10">
            {/* The track, and the fill that follows the scroll down it. */}
            <span
              aria-hidden
              className="absolute inset-y-2 left-0 hidden w-px bg-white/10 lg:block"
            />
            <motion.span
              aria-hidden
              style={reduce ? { transform: "scaleY(1)" } : { scaleY: fill }}
              className="absolute inset-y-2 left-0 hidden w-px origin-top bg-gradient-to-b from-accent-glow via-hero-glow to-accent-glow lg:block"
            />

            <motion.div
              className="space-y-4"
              variants={reduce ? undefined : listVariants}
              initial={reduce ? undefined : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true, amount: 0.04 }}
            >
              {reasons.map((r, i) => (
                <Reason key={r.title} item={r} index={i} onEnter={onEnter} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ---- Institute numbers ------------------------------------------ */}
        <Stagger
          className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          amount={0.3}
        >
          {stats.map((s) => (
            <StaggerItem
              key={s.label}
              className="group bg-hero-950/80 px-6 py-8 text-center backdrop-blur-sm transition-colors duration-500 hover:bg-hero-950/40"
            >
              <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                <CountUp to={s.value} />
                <span className="text-accent-glow">{s.suffix}</span>
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-up-soft/55 transition-colors duration-500 group-hover:text-up-soft/80">
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
