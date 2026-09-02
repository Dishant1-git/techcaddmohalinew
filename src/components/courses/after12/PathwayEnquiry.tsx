"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Course } from "@/lib/courses";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import { EASE } from "@/components/courses/detail/Motion";
import { useEnquiry } from "@/components/courses/shared/useEnquiry";
import { GradientMesh, StepBadge } from "@/components/courses/after12/Motifs";

/**
 * The After-12th enquiry.
 *
 * Shares `useEnquiry` with the other two designs, so the captcha handshake
 * exists once; only the skin differs. Framed as the last stage of the route
 * rather than a form, which is why it is numbered 09 like every stage above.
 */

const field =
  "w-full rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-up-soft/40 hover:border-white/25 focus:border-accent-yellow/70 focus:bg-white/[0.1] focus:ring-2 focus:ring-accent-yellow/25";

const label = "mb-2 block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-up-soft/65";

export default function PathwayEnquiry({ course }: { course: Course }) {
  const reduce = useReducedMotion();
  const { status, error, captcha, captchaLoading, refreshCaptcha, onSubmit, reset } = useEnquiry(
    course,
    `after-12th:${course.slug}`,
  );

  return (
    <section
      id="enquire"
      className="relative scroll-mt-36 overflow-hidden bg-hero-950 py-20 text-white lg:py-28"
    >
      <GradientMesh />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* ---- Left ---------------------------------------------------- */}
          <div>
            <StepBadge n={9} label="Final stage" />

            <h2 className="mt-6 font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.9rem]">
              Start your journey
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-up-soft/70">
              Send your details and a counsellor from the Mohali centre will call you back — usually
              the same working day — with batch dates, fees and the free demo class schedule.
            </p>

            <div className="mt-9 space-y-3">
              {[
                {
                  icon: "phone",
                  label: site.phone,
                  href: site.phoneHref,
                  sub: "Call the admissions desk",
                },
                {
                  icon: "whatsapp",
                  label: site.whatsapp,
                  href: site.whatsappHref,
                  sub: "WhatsApp for a quick reply",
                },
                {
                  icon: "mail",
                  label: site.email,
                  href: site.emailHref,
                  sub: "Email us your questions",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent-yellow/40 hover:bg-white/[0.07]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950 transition-transform group-hover:scale-110">
                    <Icon name={c.icon} size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-white">{c.label}</span>
                    <span className="mt-0.5 block text-xs text-up-soft/55">{c.sub}</span>
                  </span>
                </a>
              ))}
            </div>

            <p className="mt-6 flex items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.04] p-5 text-xs leading-relaxed text-up-soft/60">
              <Icon name="shield" size={15} className="mt-0.5 shrink-0 text-accent-yellow" />
              Your details are used only to contact you about this enquiry — never sold, never added
              to a marketing list.
            </p>
          </div>

          {/* ---- Form ---------------------------------------------------- */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.05] p-8 backdrop-blur-md lg:p-10"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-yellow via-accent-glow to-hero-glow" />

            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="py-6 text-center"
                >
                  <motion.span
                    initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.1 }}
                    className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-accent-yellow to-accent-glow text-hero-950"
                  >
                    {!reduce && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-accent-yellow/40"
                        animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <Icon name="check" size={34} strokeWidth={3} className="relative" />
                  </motion.span>

                  <h3 className="mt-7 font-display text-2xl font-extrabold sm:text-3xl">
                    You&rsquo;re on the route
                  </h3>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-up-soft/75">
                    We have your enquiry about{" "}
                    <strong className="font-semibold text-white">{course.title}</strong>. A
                    counsellor will call you within one working day with batch dates, fees and the
                    demo class schedule.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={site.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-yellow to-accent-glow px-6 py-3 text-sm font-extrabold text-hero-950 transition-transform hover:-translate-y-0.5"
                    >
                      <Icon name="whatsapp" size={16} /> Chat now instead
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                    >
                      Send another enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display text-2xl font-extrabold">
                    Enquire about {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-up-soft/65">
                    Four fields. No fee, no obligation — just a call back with the details.
                  </p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="pw-name" className={label}>
                        Full name *
                      </label>
                      <input
                        id="pw-name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className={field}
                      />
                    </div>

                    {/* Course — filled from the page, sent read-only. */}
                    <div className="sm:col-span-2">
                      <label htmlFor="pw-course" className={label}>
                        Course
                      </label>
                      <div className="relative">
                        <input
                          id="pw-course"
                          name="course"
                          readOnly
                          value={course.title}
                          aria-describedby="pw-course-note"
                          className={`${field} cursor-default border-accent-yellow/35 bg-accent-yellow/[0.08] pr-28 font-bold text-accent-yellow`}
                        />
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-accent-yellow px-2.5 py-1 text-[0.58rem] font-extrabold uppercase tracking-wider text-hero-950">
                          Auto-filled
                        </span>
                      </div>
                      <p id="pw-course-note" className="mt-2 text-[0.7rem] text-up-soft/45">
                        Taken from the page you are on — {course.duration} · {course.level}.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="pw-email" className={label}>
                        Email *
                      </label>
                      <input
                        id="pw-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={field}
                      />
                    </div>

                    <div>
                      <label htmlFor="pw-phone" className={label}>
                        Phone / WhatsApp
                      </label>
                      <input
                        id="pw-phone"
                        name="phone"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="98881 22255 (optional)"
                        className={field}
                      />
                    </div>

                    {/* ---- Captcha ------------------------------------- */}
                    <div className="sm:col-span-2">
                      <label htmlFor="pw-captcha" className={label}>
                        Security check *
                      </label>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] p-2">
                          <div className="grid h-16 w-[190px] place-items-center overflow-hidden rounded-xl bg-subtle">
                            {captcha ? (
                              <span
                                className="[&>svg]:block"
                                // Server-generated SVG from our own captcha route —
                                // no user input is interpolated into it.
                                dangerouslySetInnerHTML={{ __html: captcha.svg }}
                              />
                            ) : (
                              <span className="text-xs text-up-muted">
                                {captchaLoading ? "Loading…" : "Unavailable"}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={refreshCaptcha}
                            aria-label="Get a new security code"
                            className="grid h-9 w-9 place-items-center rounded-xl text-up-soft/70 transition-colors hover:bg-white/10 hover:text-accent-yellow"
                          >
                            <motion.span
                              animate={captchaLoading && !reduce ? { rotate: 360 } : { rotate: 0 }}
                              transition={
                                captchaLoading
                                  ? { duration: 0.9, repeat: Infinity, ease: "linear" }
                                  : { duration: 0.3 }
                              }
                              className="block"
                            >
                              <Icon name="bolt" size={16} />
                            </motion.span>
                          </button>
                        </div>

                        <input
                          id="pw-captcha"
                          name="captcha"
                          required
                          autoComplete="off"
                          spellCheck={false}
                          maxLength={8}
                          placeholder="Type the code"
                          className={`${field} min-w-[9rem] flex-1 uppercase tracking-[0.3em]`}
                        />
                      </div>
                      <p className="mt-2 text-[0.7rem] text-up-soft/45">
                        Not case sensitive. Tap the icon for a new code.
                      </p>
                    </div>

                    {/* Honeypot — hidden from people, checked on the server. */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="pw-website">Website</label>
                      <input id="pw-website" name="website" tabIndex={-1} autoComplete="off" />
                    </div>
                  </div>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        role="alert"
                        className="overflow-hidden"
                      >
                        <span className="flex items-start gap-2.5 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                          <Icon name="close" size={15} className="mt-0.5 shrink-0" />
                          {error}
                        </span>
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={reduce || status === "sending" ? undefined : { y: -2 }}
                    whileTap={reduce ? undefined : { scale: 0.985 }}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-yellow to-accent-glow px-8 py-4 text-sm font-extrabold text-hero-950 shadow-[0_0_36px_-10px_rgba(0,212,255,0.9)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "sending" ? "Sending…" : "Start my journey"}
                    {status !== "sending" && <Icon name="arrowRight" size={17} />}
                  </motion.button>

                  <p className="mt-4 text-center text-xs text-up-soft/45">
                    By sending this you agree to be contacted about {course.title}.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
