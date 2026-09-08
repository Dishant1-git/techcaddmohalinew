"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

type State = "idle" | "sending" | "done";

/**
 * Phone-only callback request. Kept as its own client component so the CTA
 * section around it stays a server component and its scroll-reveal attributes
 * keep working.
 */
export default function QuickEnquiry() {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = phone.trim();

    if (!/^[0-9+\s-]{10,15}$/.test(value)) {
      setError("Enter a valid mobile number.");
      return;
    }

    setError("");
    setState("sending");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: value, source: "Home CTA — callback request" }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not send that just now.");
      setState("done");
    } catch (err) {
      setState("idle");
      setError(err instanceof Error ? err.message : "Could not send that just now.");
    }
  }

  if (state === "done") {
    return (
      <p className="inline-flex items-center gap-2.5 rounded-full bg-brand-50 px-6 py-4 text-sm font-semibold text-up-accent">
        <Icon name="checkCircle" size={18} />
        Thanks — a counsellor will call you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className="mx-auto flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row">
        <label htmlFor="cta-phone" className="sr-only">
          Your mobile number
        </label>
        <input
          id="cta-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Your mobile number"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "cta-phone-error" : undefined}
          className="min-w-0 flex-1 rounded-full border border-up-line bg-white px-6 py-4 text-[0.95rem] text-up-ink outline-none transition-colors placeholder:text-up-muted/60 focus:border-up-accent"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="accent-fill shrink-0 rounded-full px-8 py-4 text-[0.9rem] font-bold transition-all hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Book Demo"}
        </button>
      </div>

      {error && (
        <p id="cta-phone-error" role="alert" className="mt-3 text-[0.8rem] font-medium text-hero-600">
          {error}
        </p>
      )}
    </form>
  );
}
