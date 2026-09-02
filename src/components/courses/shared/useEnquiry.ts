"use client";

import { useCallback, useEffect, useState } from "react";
import type { Course } from "@/lib/courses";

export type EnquiryStatus = "idle" | "sending" | "sent" | "error";
export type Captcha = { svg: string; token: string };

/**
 * The enquiry form's behaviour, with no markup of its own.
 *
 * Each course-page design skins this differently, and the captcha handshake is
 * the part that must not be reimplemented three times: a challenge is
 * single-use, so it has to be replaced after every rejected submission, and
 * the token has to travel with the answer or the server cannot verify it.
 *
 * The course is closed over here rather than read from the form, so an enquiry
 * can never be attributed to a course the visitor was not reading — the
 * server re-derives it from this payload, not from the editable field.
 */
export function useEnquiry(course: Course, source: string) {
  const [status, setStatus] = useState<EnquiryStatus>("idle");
  const [error, setError] = useState("");

  const [captcha, setCaptcha] = useState<Captcha | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(true);

  /**
   * Bumping this re-runs the fetch below: on mount, on the refresh button, and
   * after every rejected submission.
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
      .then((next: Captcha) => {
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
          course: course.title,
          source,
          captchaToken: captcha?.token ?? "",
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(payload.error ?? "Something went wrong. Please try again.");
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

  return { status, error, captcha, captchaLoading, refreshCaptcha, onSubmit, reset };
}
