"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";

/** Pages reachable from the Resources nav menu already end on their own tool-specific
 * CTA (QuickCallbackBar + CtaBanner), so this generic strip would be a third, redundant one. */
const HIDDEN_ON = ["/tools/career-track", "/tools/training-matcher", "/tools/salary-estimator", "/blog"];

/** The slim strip most pages end on, just above the footer — one more nudge for anyone who scrolled past the main CTA. */
export default function MiniCtaBar() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  return (
    <section className="border-t border-line bg-white py-10">
      <div className="container-x flex flex-col items-center justify-between gap-5 sm:flex-row">
        <div>
          <h2 className="text-lg font-bold text-up-ink">Ready to start your career in tech?</h2>
          <p className="mt-1 text-sm text-up-muted">
            Book a free demo class and see the lab before you decide.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-hero-600 to-hero-glow px-6 py-3 text-sm font-bold text-white shadow-lg shadow-hero-600/25 transition-all hover:-translate-y-0.5"
          >
            Book Free Demo
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-up-line px-5 py-3 text-sm font-semibold text-up-ink transition-colors hover:border-up-accent hover:text-up-accent"
          >
            <Icon name="phone" size={14} />
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
