"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Course } from "@/lib/courses";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/courses/detail/SectionTitle";
import { EASE, Reveal } from "@/components/courses/detail/Motion";

type Status = "idle" | "sending" | "sent" | "error";

const fieldBase =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-up-soft/40 focus:border-accent-glow/70 focus:bg-white/[0.09] focus:ring-2 focus:ring-accent-glow/20";

const labelBase =
  "mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-up-soft/70";

/**
 * Course enquiry form.
 *
 * The course name is not a dropdown — it is filled from the page the visitor is
 * reading and sent read-only, so an enquiry can never be attributed to the
 * wrong track. The captcha is issued and verified by the server
 * (`/api/captcha` → `/api/course-enquiry`); the answer never reaches the
 * browser, so passing it is not a matter of reading a JS variable.
 */
export default function EnquiryForm({ course }: { course: Course }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const reduce = useReducedMotion();

  const [captcha, setCaptcha] = useState<{ svg: string; token: string } | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(true);

  /**
   * Bumping this re-runs the fetch below. A challenge is single-use, so it is
   * incremented on mount, on the refresh button, and after every rejected
   * submission.
   */
  const [nonce, setNonce] = useState(0);

  const refreshCaptcha = useCallback(() => {
    setCaptchaLoading(true);
    setNonce((n) => n + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/captcha", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("captcha unavailable"))))
      .then((next: { svg: string; token: string }) => {
        setCaptcha(next);
        setCaptchaLoading(false);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setCaptcha(null);
        setCaptchaLoading(false);
      });

    return () => controller.abort();
  }, [nonce]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/course-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          // Always the course of the page being read, never a user-editable value.
          course: course.title,
          source: `course:${course.slug}`,
          captchaToken: captcha?.token ?? "",
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(payload.error ?? "Something went wrong. Please try again.");
        // A used or rejected challenge is spent — always hand out a fresh one.
        refreshCaptcha();
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("We could not reach the server. Please call or WhatsApp us instead.");
      refreshCaptcha();
    }
  }

  function reset() {
    setStatus("idle");
    setError("");
    refreshCaptcha();
  }

  return (
    <section
      id="enquire"
      className="relative scroll-mt-36 overflow-hidden bg-hero-950 py-20 text-white lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_10%,#123285_0%,transparent_60%),radial-gradient(ellipse_55%_55%_at_88%_75%,#1c53d1_0%,transparent_55%)]" />
      <div className="absolute inset-0 grid-lines opacity-60" />
      <motion.div
        aria-hidden
        className="glow-blob left-[-4%] top-[15%] h-[340px] w-[340px] bg-accent-glow/20"
        animate={reduce ? undefined : { scale: [1, 1.14, 1], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* ---- Left rail ------------------------------------------------ */}
          <div className="lg:sticky lg:top-40 lg:self-start">
            <SectionTitle
              tone="dark"
              eyebrow="Enquire"
              title="Ask about this course"
              subtitle={`Send a quick enquiry about ${course.title} and a counsellor from the Mohali centre will get back to you — usually the same working day.`}
            />

            <Reveal delay={0.15} className="mt-10 space-y-3">
              {[
                { icon: "phone", label: site.phone, href: site.phoneHref, sub: "Call the admissions desk" },
                {
                  icon: "whatsapp",
                  label: site.whatsapp,
                  href: site.whatsappHref,
                  sub: "WhatsApp for a quick reply",
                },
                { icon: "mail", label: site.email, href: site.emailHref, sub: "Email us your questions" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent-glow/40 hover:bg-white/[0.07]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/8 text-accent-glow transition-transform group-hover:scale-110">
                    <Icon name={c.icon} size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-white">{c.label}</span>
                    <span className="mt-0.5 block text-xs text-up-soft/55">{c.sub}</span>
                  </span>
                </a>
              ))}
            </Reveal>

            <Reveal delay={0.25} className="mt-6 rounded-2xl border border-white/12 bg-white/[0.04] p-5">
              <p className="flex items-start gap-3 text-xs leading-relaxed text-up-soft/60">
                <Icon name="shield" size={15} className="mt-0.5 shrink-0 text-accent-glow" />
                Your details are used only to contact you about this enquiry — never sold, never
                added to a marketing list.
              </p>
            </Reveal>
          </div>

          {/* ---- Form ------------------------------------------------------ */}
          <Reveal direction="right" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.045] p-8 backdrop-blur-md lg:p-10">
              <span className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-glow to-transparent" />

              <AnimatePresence mode="wait" initial={false}>
                {status === "sent" ? (
                  /* ---- Confirmation ------------------------------------ */
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
                      className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-accent-glow to-hero-glow text-hero-950"
                    >
                      {!reduce && (
                        <motion.span
                          className="absolute inset-0 rounded-full bg-accent-glow/40"
                          animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                      <Icon name="check" size={34} strokeWidth={3} className="relative" />
                    </motion.span>

                    <h3 className="mt-7 font-display text-2xl font-extrabold text-white sm:text-3xl">
                      Thank you — your enquiry is in
                    </h3>
                    <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-up-soft/75">
                      We have received your enquiry about{" "}
                      <strong className="font-semibold text-white">{course.title}</strong>. A
                      counsellor from the Mohali centre will contact you within one working day
                      with batch dates, fees and the demo class schedule.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={site.whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-glow to-hero-glow px-6 py-3 text-sm font-bold text-hero-950 transition-transform hover:-translate-y-0.5"
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
                  /* ---- Fields ------------------------------------------ */
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <h3 className="font-display text-2xl font-extrabold text-white">
                      Enquire about {course.title}
                    </h3>
                    <p className="mt-2 text-sm text-up-soft/65">
                      Four fields. No fee, no obligation — just a call back with the details.
                    </p>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="ce-name" className={labelBase}>
                          Full name *
                        </label>
                        <input
                          id="ce-name"
                          name="name"
                          required
                          autoComplete="name"
                          placeholder="Your name"
                          className={fieldBase}
                        />
                      </div>

                      {/* Course — filled from the page, sent read-only. */}
                      <div className="sm:col-span-2">
                        <label htmlFor="ce-course" className={labelBase}>
                          Course
                        </label>
                        <div className="relative">
                          <input
                            id="ce-course"
                            name="course"
                            readOnly
                            value={course.title}
                            aria-describedby="ce-course-note"
                            className={`${fieldBase} cursor-default border-accent-glow/25 bg-accent-glow/[0.07] pr-32 font-semibold text-accent-glow focus:border-accent-glow/40`}
                          />
                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-accent-glow/30 bg-hero-950/60 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-accent-glow">
                            Auto-filled
                          </span>
                        </div>
                        <p id="ce-course-note" className="mt-2 text-[0.7rem] text-up-soft/45">
                          Taken from the course page you are on — {course.duration} ·{" "}
                          {course.level}.
                        </p>
                      </div>

                      <div className="sm:col-span-1">
                        <label htmlFor="ce-email" className={labelBase}>
                          Email *
                        </label>
                        <input
                          id="ce-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="you@example.com"
                          className={fieldBase}
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <label htmlFor="ce-phone" className={labelBase}>
                          Phone / WhatsApp
                        </label>
                        <input
                          id="ce-phone"
                          name="phone"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="98881 22255 (optional)"
                          className={fieldBase}
                        />
                      </div>

                      {/* ---- Captcha ------------------------------------ */}
                      <div className="sm:col-span-2">
                        <label htmlFor="ce-captcha" className={labelBase}>
                          Security check *
                        </label>
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] p-2">
                            <div
                              className="grid h-16 w-[190px] place-items-center overflow-hidden rounded-lg bg-subtle"
                              aria-hidden={!captcha}
                            >
                              {captcha ? (
                                <span
                                  className="[&>svg]:block"
                                  // Server-generated SVG from our own captcha route — no user
                                  // input is interpolated into it.
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
                              className="grid h-9 w-9 place-items-center rounded-lg text-up-soft/70 transition-colors hover:bg-white/10 hover:text-accent-glow"
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
                            id="ce-captcha"
                            name="captcha"
                            required
                            autoComplete="off"
                            spellCheck={false}
                            maxLength={8}
                            placeholder="Type the code"
                            className={`${fieldBase} min-w-[9rem] flex-1 uppercase tracking-[0.3em]`}
                          />
                        </div>
                        <p className="mt-2 text-[0.7rem] text-up-soft/45">
                          Not case sensitive. Tap the icon for a new code.
                        </p>
                      </div>

                      {/* Honeypot — hidden from people, checked on the server. */}
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="ce-website">Website</label>
                        <input id="ce-website" name="website" tabIndex={-1} autoComplete="off" />
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
                          <span className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
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
                      className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-hero-950 shadow-lg transition-shadow hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "sending" ? "Sending…" : "Send my enquiry"}
                      {status !== "sending" && (
                        <Icon
                          name="arrowRight"
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      )}
                    </motion.button>

                    <p className="mt-4 text-center text-xs text-up-soft/45">
                      By sending this you agree to be contacted about {course.title}.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
