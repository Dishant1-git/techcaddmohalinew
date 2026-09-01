"use client";

import { useState } from "react";
import { courses } from "@/lib/courses";
import Icon from "@/components/ui/Icon";

type Status = "idle" | "sending" | "sent" | "error";

const fieldBase =
  "w-full rounded-xl border border-up-line bg-white px-4 py-3 text-sm text-up-ink outline-none transition-colors placeholder:text-up-muted/60 focus:border-up-accent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

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
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please call or WhatsApp us instead.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-line bg-white p-10 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-up-accent">
          <Icon name="check" size={30} strokeWidth={2.6} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-up-ink">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-up-muted">
          A counsellor from the Mohali centre will call you within one working day. If it is
          urgent, WhatsApp us and we will reply straight away.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-7 rounded-full border border-up-line px-6 py-3 text-sm font-semibold text-up-ink transition-colors hover:border-up-accent hover:text-up-accent"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-line bg-white p-8 shadow-[0_30px_80px_-50px_rgba(11,26,77,0.4)] lg:p-10"
    >
      <h3 className="font-display text-2xl font-extrabold text-up-ink">Book a free demo class</h3>
      <p className="mt-2 text-sm text-up-muted">
        Tell us a little about yourself. No fee, no obligation — a counsellor will call you back.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-up-muted">
            Full name *
          </label>
          <input id="name" name="name" required placeholder="Your name" className={fieldBase} />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-up-muted">
            Phone / WhatsApp *
          </label>
          <input
            id="phone"
            name="phone"
            required
            inputMode="tel"
            placeholder="98881 22255"
            className={fieldBase}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-up-muted">
            Email
          </label>
          <input id="email" name="email" type="email" placeholder="you@example.com" className={fieldBase} />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="course" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-up-muted">
            Course of interest
          </label>
          <select id="course" name="course" defaultValue="" className={fieldBase}>
            <option value="">Not sure yet</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="mode" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-up-muted">
            Preferred batch
          </label>
          <select id="mode" name="mode" defaultValue="Morning" className={fieldBase}>
            {["Morning", "Afternoon", "Evening", "Weekend", "Live online"].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-up-muted">
            Anything we should know?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Your background, what you want to do next, questions about fees…"
            className={`${fieldBase} resize-none`}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-hero-600 to-hero-glow px-8 py-4 text-sm font-bold text-white shadow-lg shadow-hero-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Request a call back"}
        {status !== "sending" && (
          <Icon name="arrowRight" size={17} className="transition-transform group-hover:translate-x-1" />
        )}
      </button>

      <p className="mt-4 text-center text-xs text-up-muted">
        We use your details only to contact you about this enquiry.
      </p>
    </form>
  );
}
