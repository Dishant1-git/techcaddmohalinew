"use client";

import { useState } from "react";
import Link from "next/link";
import { salaryRoles, locations, scaledRange, barPercent, type Location } from "@/lib/salaryData";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import LeadRequestModal from "@/components/tools/LeadRequestModal";

export default function SalaryEstimator() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [location, setLocation] = useState<Location>(locations[0]);
  const [requestOpen, setRequestOpen] = useState(false);

  const role = salaryRoles[roleIndex];
  const fresher = scaledRange(role.fresher, location, "fresher");
  const after2 = scaledRange(role.after2, location, "after2");

  return (
    <div className="mx-auto max-w-4xl">
      {requestOpen && (
        <LeadRequestModal
          title={`Talk through ${role.article} ${role.title} career`}
          course={role.title}
          onClose={() => setRequestOpen(false)}
        />
      )}

      {/* Role picker */}
      <div data-anim="up" data-anim-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {salaryRoles.map((r, i) => (
          <button
            key={r.title}
            onClick={() => setRoleIndex(i)}
            className={`flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all ${
              i === roleIndex
                ? "border-up-accent bg-brand-50"
                : "border-up-line bg-white hover:-translate-y-0.5 hover:border-up-accent/50"
            }`}
          >
            <span
              className={`grid h-9 w-9 place-items-center rounded-lg ${
                i === roleIndex ? "bg-up-accent text-white" : "bg-brand-50 text-up-accent"
              }`}
            >
              <Icon name={r.icon} size={17} />
            </span>
            <span className="text-sm font-bold text-up-ink">{r.title}</span>
          </button>
        ))}
      </div>

      {/* Result panel */}
      <div data-anim="up" className="mt-6 rounded-[1.75rem] bg-hero-950 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-glow">
              {role.title}
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-up-soft/80">{role.blurb}</p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-1.5 rounded-full border border-white/15 bg-white/5 p-1.5">
            {locations.map((l) => (
              <button
                key={l}
                onClick={() => setLocation(l)}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                  location === l ? "bg-white text-hero-950" : "text-white/70 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-white/85">Fresher</span>
              <span className="font-bold text-white">{fresher.label}</span>
            </div>
            <div className="mt-2.5 h-2.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-up-soft transition-all duration-500"
                style={{ width: `${barPercent(role.fresher, location, "fresher")}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-white/85">After 2 Years</span>
              <span className="font-bold text-white">{after2.label}</span>
            </div>
            <div className="mt-2.5 h-2.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-accent-glow transition-all duration-500"
                style={{ width: `${barPercent(role.after2, location, "after2")}%` }}
              />
            </div>
          </div>
        </div>

        <p className="mt-7 text-xs leading-relaxed text-up-soft/50">
          Indicative ranges for entry-level {role.title} roles in {location}, compiled from
          public job-market listings. Actual offers vary by employer, skillset and interview
          performance.
        </p>
      </div>

      {/* Where they get hired */}
      <div data-anim="up" className="mt-6 rounded-[1.75rem] border border-line bg-white p-6 sm:p-8">
        <h3 className="text-lg font-bold text-up-ink">Where {role.title} graduates get hired</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {role.hiredAt.map((h) => (
            <div key={h} className="flex items-start gap-2.5 rounded-xl bg-subtle px-4 py-3.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-up-accent" />
              <span className="text-sm text-up-ink/80">{h}</span>
            </div>
          ))}
        </div>
        <Link
          href={role.courseHref}
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-up-accent px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          {role.courseLabel}
          <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Consultation CTA */}
      <div
        data-anim="up"
        className="mt-6 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-hero-900 via-panel to-hero-950 p-6 sm:p-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-accent-glow">
              <Icon name="phone" size={19} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-glow">
                Free consultation call
              </p>
              <h3 className="mt-1.5 text-lg font-bold text-white">
                Talk through {role.article} {role.title} career
              </h3>
              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-up-soft/70">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 font-semibold text-white/85">
                  <Icon name="check" size={12} strokeWidth={3} className="text-accent-glow" />
                  Google Verified
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon name="star" size={13} className="text-accent-yellow" />
                  4.9 · 556+ reviews
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-hero-950 transition-all hover:-translate-y-0.5"
            >
              Call Now — {site.phone}
            </a>
            <button
              onClick={() => setRequestOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5"
            >
              Request a Free Callback
            </button>
          </div>
        </div>

        <p className="mt-6 text-xs text-up-soft/50">
          Always free. No fee for the call, no obligation to enrol.
        </p>
      </div>

      <p className="mt-8 text-center text-sm text-up-muted">
        Not sure which role fits you?{" "}
        <Link href="/tools/career-track" className="font-semibold text-up-accent hover:underline">
          Take the Career Track quiz
        </Link>
        .
      </p>
    </div>
  );
}
