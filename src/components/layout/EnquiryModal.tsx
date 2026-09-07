"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { courses } from "@/lib/courses";
import { site } from "@/lib/site";
import { AUTO_DELAY_MS, AUTO_KEY, SENT_KEY, onOpenEnquiry } from "@/lib/enquiry";
import Icon from "@/components/ui/Icon";
import TechMark from "@/components/ui/TechMark";

type Status = "idle" | "sending" | "done";

const field =
  "w-full rounded-2xl border border-white/25 bg-white/12 px-5 py-3 text-[0.95rem] text-white outline-none transition-colors placeholder:text-white/60 focus:border-white/60 focus:bg-white/20";

/** Two single digits worth adding. Kept away from 0 and 1 so the sum is a real
 *  (if small) check rather than something a bot solves by guessing. */
const makeSum = (): [number, number] => [
  2 + Math.floor(Math.random() * 8),
  2 + Math.floor(Math.random() * 8),
];

export default function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  /**
   * Seeded lazily rather than in an effect. The server and the hydrating client
   * pick different numbers, but the modal renders null until it is opened — so
   * the value never reaches the server HTML and there is nothing to mismatch.
   */
  const [sum, setSum] = useState<[number, number]>(makeSum);

  const panel = useRef<HTMLDivElement>(null);
  const firstField = useRef<HTMLSelectElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const rollCaptcha = useCallback(() => setSum(makeSum()), []);

  /* ------------------------------- Triggers ------------------------------- */

  useEffect(() => onOpenEnquiry(() => setOpen(true)), []);

  useEffect(() => {
    // `?enquiry=1` or `#enquiry` opens it straight away and ignores the
    // once-only flag. That is the way to re-test the timed open after your
    // browser has already recorded it, and it makes the modal linkable from a
    // campaign. A forced open deliberately does not burn the flag.
    const forced =
      new URLSearchParams(window.location.search).get("enquiry") === "1" ||
      window.location.hash === "#enquiry";

    if (!forced) {
      // Once ever, and never to someone who already sent an enquiry.
      let already = true;
      try {
        already =
          localStorage.getItem(AUTO_KEY) === "1" || localStorage.getItem(SENT_KEY) === "1";
      } catch {
        // Private mode or blocked storage: skip the unprompted open rather than
        // risk showing it on every single page view.
      }
      if (already) return;
    }

    // setOpen lives in the timer callback, not the effect body — calling it
    // synchronously here would be a cascading render.
    const t = setTimeout(
      () => {
        if (!forced) {
          // Written before opening, so a reload mid-view cannot bring it back.
          try {
            localStorage.setItem(AUTO_KEY, "1");
          } catch {}
        }
        setOpen(true);
      },
      forced ? 0 : AUTO_DELAY_MS,
    );

    return () => clearTimeout(t);
  }, []);

  /* ------------------------- Dialog behaviour ----------------------------- */

  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    firstField.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;

      // Keep tabbing inside the dialog while it is up.
      const items = panel.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      restoreFocus.current?.focus?.();
    };
  }, [open]);

  /* -------------------------------- Submit -------------------------------- */

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const course = String(data.get("course") ?? "").trim();
    const answer = String(data.get("answer") ?? "").trim();

    if (!course) return setError("Please choose a course.");
    if (name.length < 2) return setError("Please enter your full name.");
    if (!/^[0-9]{10}$/.test(phone.replace(/\D/g, "")))
      return setError("Enter a 10-digit mobile number.");
    if (Number(answer) !== sum[0] + sum[1]) {
      setError("That security answer is not right.");
      rollCaptcha();
      return;
    }

    setError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, course, source: "Enquiry modal" }),
      });
      const body = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) throw new Error(body.error || "Could not send that just now.");
      try {
        localStorage.setItem(SENT_KEY, "1");
      } catch {}
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Could not send that just now.");
      rollCaptcha();
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute inset-0 h-full w-full cursor-default bg-hero-950/70 backdrop-blur-sm"
      />

      <div
        ref={panel}
        // Columns scroll independently rather than the whole grid, so a short
        // window can never leave Submit stranded below a cut edge.
        className="relative grid max-h-[94svh] w-full max-w-4xl overflow-hidden rounded-[1.75rem] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85)] md:grid-cols-2"
      >
        {/* ------------------------------ Left ------------------------------ */}
        <div className="no-scrollbar relative overflow-y-auto bg-hero-950 p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(28,83,209,0.4),transparent_65%)]" />
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

          <div className="relative">
            <h2 id="enquiry-title" className="font-display text-[1.6rem] font-extrabold leading-tight sm:text-[1.9rem]">
              <span className="animate-wave mr-2" aria-hidden>
                👋
              </span>
              Still exploring? Let us help
            </h2>

            <p className="mt-4 text-[0.92rem] leading-relaxed text-up-soft/70">
              Talk to a counsellor and we&apos;ll map the shortest route from where you are to
              the job you want.
            </p>

            <figure className="glass-dark relative mt-7 rounded-2xl p-5">
              <blockquote className="text-[0.95rem] leading-relaxed text-white">
                &ldquo;AI is the new electricity for modern computing.&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-accent-glow">
                  <Icon name="sparkles" size={18} />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-white">Jensen Huang</span>
                  <span className="block text-[0.78rem] text-up-soft/60">
                    CEO, NVIDIA Corporation
                  </span>
                </span>
              </figcaption>
            </figure>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-3.5">
              <span className="flex items-center gap-2.5">
                <TechMark name="google" size={20} />
                <span className="text-[0.9rem] font-bold text-up-ink">Google Verified</span>
                <Icon name="verified" size={16} className="text-up-bright" />
              </span>
              <span className="flex items-center gap-0.5 text-accent-yellow">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={14} className="fill-accent-yellow" strokeWidth={0} />
                ))}
              </span>
            </div>

            <p className="mt-5 text-[0.8rem] leading-relaxed text-up-soft/55">
              You can also share your requirements at{" "}
              <a href={site.emailHref} className="font-semibold text-white underline">
                {site.email}
              </a>
              , and our team will get back to you right away.
            </p>
          </div>
        </div>

        {/* ------------------------------ Right ----------------------------- */}
        <div className="no-scrollbar relative overflow-y-auto bg-gradient-to-br from-hero-800 via-hero-600 to-accent-500 p-6 sm:p-8">
          {status === "done" ? (
            <div className="flex h-full min-h-[22rem] flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-hero-600">
                <Icon name="checkCircle" size={32} />
              </span>
              <p className="mt-6 font-display text-2xl font-extrabold text-white">
                Thanks — we have your details.
              </p>
              <p className="mt-3 max-w-xs text-[0.92rem] text-white/75">
                A counsellor will call you shortly. If it is urgent, ring us on {site.phone}.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-8 rounded-full bg-white px-7 py-3 text-sm font-bold text-hero-800"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="relative">
              <p className="max-w-sm pr-12 font-display text-[1.2rem] font-extrabold leading-snug text-white sm:text-[1.4rem]">
                Tell us your goal. We&apos;ll map it to a track.
              </p>

              <div className="mt-5 space-y-2.5">
                <div className="relative">
                  <select
                    ref={firstField}
                    name="course"
                    defaultValue=""
                    aria-label="Course of interest"
                    className={`${field} appearance-none pr-12`}
                  >
                    <option value="" disabled>
                      Select Your Course of Interest*
                    </option>
                    {courses.map((c) => (
                      <option key={c.slug} value={c.title} className="text-up-ink">
                        {c.title}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="chevronDown"
                    size={18}
                    className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/70"
                  />
                </div>

                <input name="name" type="text" autoComplete="name" placeholder="Full Name*" className={field} />
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="Contact Number (10 Digits)*"
                  className={field}
                />

                <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                  <span className="text-[0.85rem] font-semibold text-white">
                    Security verification
                  </span>
                  <span className="rounded-full bg-white/20 px-3.5 py-1 font-mono text-[0.85rem] font-bold tracking-wider text-white">
                    {sum[0]} + {sum[1]} = ?
                  </span>
                  <button
                    type="button"
                    onClick={rollCaptcha}
                    aria-label="New security question"
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/20"
                  >
                    <Icon name="refresh" size={15} />
                  </button>
                </div>

                <input
                  name="answer"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="Answer"
                  className={field}
                />
              </div>

              <p className="mt-3.5 flex items-center gap-2.5 rounded-2xl bg-accent-glow px-5 py-3 text-[0.88rem] font-bold text-hero-950">
                <Icon name="checkCircle" size={17} className="shrink-0" />
                Expert response within 5 minutes.
              </p>

              {error && (
                <p role="alert" className="mt-2.5 text-[0.82rem] font-semibold text-accent-yellow">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-8 py-3 text-[0.92rem] font-bold text-hero-800 transition-all hover:-translate-y-0.5 hover:bg-white disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Submit"}
                <Icon
                  name="arrowRight"
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          )}
        </div>

        {/* Last child of the panel and explicitly stacked, so nothing inside a
            column can paint over it — the form is `relative` and would
            otherwise cover it and swallow the clicks. Outside the scrolling
            columns too, so it stays put if one of them scrolls. */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close enquiry form"
          className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <Icon name="close" size={18} />
        </button>
      </div>
    </div>
  );
}
