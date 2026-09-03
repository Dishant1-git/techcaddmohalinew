"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";

type Status = "idle" | "sending" | "sent" | "error";

export default function QuickCallbackBar() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!/^[0-9+\s-]{10,15}$/.test(phone)) {
      setStatus("error");
      setError("Enter a valid phone number.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Career Track tool visitor", phone }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setPhone("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please call or WhatsApp us instead.");
    }
  }

  return (
    <section className="bg-subtle py-20 lg:py-24">
      <div className="container-x">
        <div data-anim="up" className="mx-auto max-w-2xl text-center">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-up-accent">
            Ready to get started?
          </p>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-up-ink sm:text-5xl">
            Start building your career today.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-up-muted">
            Talk to a counsellor today. One call is usually enough to know which track fits your
            degree, your schedule and the job you want.
          </p>

          {status === "sent" ? (
            <p className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-100 px-6 py-3.5 text-sm font-semibold text-up-accent">
              <Icon name="check" size={16} strokeWidth={3} />
              Got it — a counsellor will call you within one working day.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="tel"
                inputMode="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your mobile number"
                className="w-full rounded-full border border-up-line bg-white px-6 py-4 text-sm text-up-ink outline-none transition-colors placeholder:text-up-muted/60 focus:border-up-accent sm:w-72"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="shrink-0 rounded-full bg-up-ink px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : "Book Demo"}
              </button>
            </form>
          )}

          {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <a
            href={site.phoneHref}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-up-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-up-accent/25 transition-all hover:-translate-y-0.5"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
              <Icon name="phone" size={13} />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-white/70">
                Call now
              </span>
              {site.phone}
            </span>
          </a>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-up-muted">
            {["Free career counselling", "No registration fee", "Placement support included"].map(
              (item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Icon name="check" size={13} strokeWidth={3} className="text-up-accent" />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
