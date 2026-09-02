"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Course } from "@/lib/courses";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import { EASE } from "@/components/courses/detail/Motion";
import { useEnquiry } from "@/components/courses/shared/useEnquiry";
import { Guilloche, Seal, SecurityBorder } from "@/components/courses/certificate/Motifs";

/**
 * Registration for the credential design.
 *
 * Same behaviour as the catalogue page's form — it shares `useEnquiry`, so the
 * captcha handshake exists in exactly one place — but presented as an
 * application form on headed paper: ruled fields, a reference number, and the
 * seal against the panel edge.
 */

const field =
  "w-full border-0 border-b border-up-line bg-transparent px-0 py-2.5 text-sm text-up-ink outline-none transition-colors placeholder:text-up-muted/45 focus:border-up-ink";

const label = "mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-up-muted";

export default function CertificateEnquiry({
  course,
  reference,
}: {
  course: Course;
  reference: string;
}) {
  const reduce = useReducedMotion();
  const { status, error, captcha, captchaLoading, refreshCaptcha, onSubmit, reset } = useEnquiry(
    course,
    `certificate:${course.slug}`,
  );

  return (
    <section id="enquire" className="relative scroll-mt-36 overflow-hidden bg-subtle py-20 lg:py-28">
      <Guilloche className="pointer-events-none absolute -left-40 bottom-0 h-[32rem] w-[32rem] text-up-accent/12" />

      <div className="container-x relative">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ---- Left: the formal address block ------------------------- */}
          <div>
            <div className="flex items-center gap-4">
              <span className="font-display text-[0.7rem] font-bold tracking-[0.2em] text-up-accent">
                09
              </span>
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.26em] text-up-muted">
                Registration
              </span>
              <span className="h-px flex-1 bg-up-line" />
            </div>

            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.14] text-up-ink sm:text-4xl">
              Apply for this certificate
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-up-muted">
              Submit the form and an admissions counsellor from the Mohali centre will confirm
              batch dates, fees and your place — usually the same working day.
            </p>

            <dl className="mt-9 space-y-3 border-t border-up-line pt-7 text-sm">
              {[
                { icon: "phone", label: site.phone, href: site.phoneHref, k: "Telephone" },
                { icon: "whatsapp", label: site.whatsapp, href: site.whatsappHref, k: "WhatsApp" },
                { icon: "mail", label: site.email, href: site.emailHref, k: "Email" },
              ].map((c) => (
                <a
                  key={c.k}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-baseline justify-between gap-4 border-b border-dotted border-up-line pb-3"
                >
                  <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-up-muted">
                    {c.k}
                  </dt>
                  <dd className="inline-flex items-center gap-2 font-semibold text-up-ink transition-colors group-hover:text-up-accent">
                    <Icon name={c.icon} size={14} />
                    {c.label}
                  </dd>
                </a>
              ))}
            </dl>

            <p className="mt-7 flex items-start gap-3 text-xs leading-relaxed text-up-muted">
              <Icon name="shield" size={14} className="mt-0.5 shrink-0 text-up-accent" />
              Your details are used only to contact you about this application — never sold, never
              added to a marketing list.
            </p>
          </div>

          {/* ---- Right: the form on headed paper ------------------------ */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative border border-up-line bg-white p-8 shadow-[0_40px_90px_-60px_rgba(11,26,77,0.5)] sm:p-10"
          >
            <SecurityBorder className="text-up-accent" />

            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative py-6 text-center"
                >
                  <div className="flex justify-center">
                    <Seal size={116} />
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-extrabold text-up-ink sm:text-3xl">
                    Application received
                  </h3>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-up-muted">
                    Your application for the{" "}
                    <strong className="font-semibold text-up-ink">{course.title}</strong> certificate
                    programme has been recorded under reference{" "}
                    <span className="font-semibold tabular-nums text-up-ink">{reference}</span>. A
                    counsellor will contact you within one working day.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={site.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-up-ink bg-up-ink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-transparent hover:text-up-ink"
                    >
                      <Icon name="whatsapp" size={15} /> Chat now instead
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="border-b border-up-line px-1 py-2 text-sm font-semibold text-up-ink transition-colors hover:border-up-accent hover:text-up-accent"
                    >
                      Submit another application
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
                  className="relative"
                >
                  <div className="flex items-start justify-between gap-6 border-b border-up-line pb-5">
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.28em] text-up-muted">
                        {site.legalName}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-extrabold text-up-ink">
                        Application for admission
                      </h3>
                    </div>
                    <p className="shrink-0 text-right text-[0.6rem] uppercase tracking-[0.14em] text-up-muted">
                      Ref
                      <span className="mt-0.5 block font-bold tabular-nums text-up-ink">
                        {reference}
                      </span>
                    </p>
                  </div>

                  <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="ct-name" className={label}>
                        Full name of applicant *
                      </label>
                      <input
                        id="ct-name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="As it should appear on the certificate"
                        className={field}
                      />
                    </div>

                    {/* Programme — taken from the page, sent read-only. */}
                    <div className="sm:col-span-2">
                      <label htmlFor="ct-course" className={label}>
                        Programme applied for
                      </label>
                      <div className="relative">
                        <input
                          id="ct-course"
                          name="course"
                          readOnly
                          value={course.title}
                          aria-describedby="ct-course-note"
                          className={`${field} cursor-default border-up-ink font-bold text-up-ink`}
                        />
                        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 border border-up-gold bg-up-gold/15 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-up-ink">
                          Entered
                        </span>
                      </div>
                      <p id="ct-course-note" className="mt-2 text-[0.66rem] text-up-muted/70">
                        Taken from the programme page you are reading — {course.duration} ·{" "}
                        {course.level}.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="ct-email" className={label}>
                        Email *
                      </label>
                      <input
                        id="ct-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={field}
                      />
                    </div>

                    <div>
                      <label htmlFor="ct-phone" className={label}>
                        Telephone
                      </label>
                      <input
                        id="ct-phone"
                        name="phone"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="98881 22255 (optional)"
                        className={field}
                      />
                    </div>

                    {/* ---- Verification ------------------------------- */}
                    <div className="sm:col-span-2">
                      <label htmlFor="ct-captcha" className={label}>
                        Verification *
                      </label>
                      <div className="flex flex-wrap items-end gap-4">
                        <div className="flex items-center gap-2 border border-up-line bg-subtle p-2">
                          <div className="grid h-16 w-[190px] place-items-center overflow-hidden bg-white">
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
                            aria-label="Get a new verification code"
                            className="grid h-9 w-9 place-items-center text-up-muted transition-colors hover:text-up-accent"
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
                          id="ct-captcha"
                          name="captcha"
                          required
                          autoComplete="off"
                          spellCheck={false}
                          maxLength={8}
                          placeholder="Enter the code"
                          className={`${field} min-w-[9rem] flex-1 uppercase tracking-[0.3em]`}
                        />
                      </div>
                      <p className="mt-2 text-[0.66rem] text-up-muted/70">
                        Not case sensitive. Use the icon for a new code.
                      </p>
                    </div>

                    {/* Honeypot — hidden from people, checked on the server. */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="ct-website">Website</label>
                      <input id="ct-website" name="website" tabIndex={-1} autoComplete="off" />
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
                        <span className="flex items-start gap-2.5 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                          <Icon name="close" size={15} className="mt-0.5 shrink-0" />
                          {error}
                        </span>
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group mt-9 inline-flex w-full items-center justify-center gap-2 border-2 border-up-ink bg-up-ink px-8 py-4 text-sm font-bold tracking-wide text-white transition-colors hover:bg-transparent hover:text-up-ink disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "sending" ? "Submitting…" : "Submit application"}
                    {status !== "sending" && (
                      <Icon
                        name="arrowRight"
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    )}
                  </button>

                  <p className="mt-4 text-center text-[0.66rem] text-up-muted/70">
                    By submitting you agree to be contacted about {course.title}.
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
