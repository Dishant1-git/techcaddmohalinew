"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

type Status = "idle" | "sending" | "sent" | "error";

/** A focused two-field version of the enquiry form, opened from a specific CTA (a track's syllabus button, a callback request) so the lead carries that context in `course`. */
export default function LeadRequestModal({
  title,
  course,
  onClose,
}: {
  title: string;
  course: string;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!String(data.name).trim() || !/^[0-9+\s-]{10,15}$/.test(String(data.phone))) {
      setStatus("error");
      setError("Please enter your name and a valid phone number.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, course, message: `Training Matcher: ${title}` }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please call or WhatsApp us instead.");
    }
  }

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-hero-950/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-2xl"
      >
        {status === "sent" ? (
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-up-accent">
              <Icon name="check" size={26} strokeWidth={2.6} />
            </span>
            <h3 className="mt-5 font-display text-xl font-extrabold text-up-ink">Request received</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-up-muted">
              A counsellor will call you within one working day with seat availability and the
              syllabus for {course}.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-up-ink px-6 py-3 text-sm font-semibold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-up-accent">{course}</p>
                <h3 className="mt-1.5 font-display text-lg font-extrabold text-up-ink">{title}</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-up-muted transition-colors hover:bg-subtle hover:text-up-ink"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <input
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-up-line bg-white px-4 py-3 text-sm text-up-ink outline-none transition-colors placeholder:text-up-muted/60 focus:border-up-accent"
              />
              <input
                name="phone"
                required
                inputMode="tel"
                placeholder="Phone / WhatsApp"
                className="w-full rounded-xl border border-up-line bg-white px-4 py-3 text-sm text-up-ink outline-none transition-colors placeholder:text-up-muted/60 focus:border-up-accent"
              />

              {status === "error" && (
                <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-hero-600 to-hero-glow px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-hero-600/25 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : "Send my syllabus & seat status"}
              </button>
              <p className="text-center text-xs text-up-muted">
                We use your details only to contact you about this request.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
