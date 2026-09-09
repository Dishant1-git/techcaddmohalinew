"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * A slim callback strip: one field, one button.
 *
 * Deliberately not a second closing CTA. Twelve pages render this above
 * <CtaBanner/>, so it must not repeat that block's eyebrow, headline or
 * assurances — it is the quick option for someone who would rather be called
 * than fill anything in, and the page's real close comes after it.
 */
export default function QuickCallbackBar() {
  const pathname = usePathname();
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
        body: JSON.stringify({
          name: "Callback request",
          phone,
          // The page it came from, not a fixed label: this bar is on a dozen
          // of them and the desk needs to know which.
          source: `Quick callback bar — ${pathname}`,
        }),
      });
      const payload = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !payload.ok) throw new Error(payload.error || "Request failed");
      setStatus("sent");
      setPhone("");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message !== "Request failed"
          ? err.message
          : "Something went wrong. Please call or WhatsApp us instead.",
      );
    }
  }

  return (
    <section className="border-y border-line bg-white py-10 lg:py-14">
      <div className="container-x">
        <div
          data-anim="up"
          className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
        >
          <div className="max-w-xl">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-up-accent">
              Quick callback
            </p>
            <h2 className="mt-2.5 font-display text-xl font-extrabold leading-snug text-up-ink sm:text-2xl">
              Would you rather we called you?
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-up-muted">
              Leave a number and a counsellor calls back within one working day — or reach us now
              on{" "}
              <a href={site.phoneHref} className="font-semibold text-up-accent hover:underline">
                {site.phone}
              </a>
              .
            </p>
          </div>

          <div className="lg:shrink-0">
            {status === "sent" ? (
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-5 py-3 text-sm font-semibold text-up-accent">
                <Icon name="check" size={16} strokeWidth={3} />
                Got it — we will call you within one working day.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="callback-phone" className="sr-only">
                  Your mobile number
                </label>
                <input
                  id="callback-phone"
                  type="tel"
                  inputMode="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your mobile number"
                  className="w-full rounded-full border border-up-line bg-white px-5 py-3.5 text-sm text-up-ink outline-none transition-colors placeholder:text-up-muted/60 focus:border-up-accent sm:w-64"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="shrink-0 rounded-full bg-up-ink px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Request a call"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-3 text-sm text-red-600 lg:text-right">{error}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
