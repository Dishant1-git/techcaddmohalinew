"use client";

import { useState } from "react";
import Link from "next/link";
import {
  universities,
  branches,
  semesters,
  matchForSemester,
  liveProjectTracks,
  deliverables,
  partnerColleges,
} from "@/lib/trainingTracks";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import LeadRequestModal from "@/components/tools/LeadRequestModal";

const stepLabelBase = "text-xs font-bold uppercase tracking-[0.12em] text-up-muted";

export default function TrainingMatcher() {
  const [uni, setUni] = useState(universities[0]);
  const [branch, setBranch] = useState(branches[0].label);
  const [sem, setSem] = useState(5);
  const [request, setRequest] = useState<{ title: string; course: string } | null>(null);

  const match = matchForSemester(sem);

  return (
    <div className="mx-auto max-w-5xl">
      {request && (
        <LeadRequestModal
          title={request.title}
          course={request.course}
          onClose={() => setRequest(null)}
        />
      )}

      {/* Selector card */}
      <div
        data-anim="up"
        className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_30px_80px_-50px_rgba(11,26,77,0.4)] sm:p-8"
      >
        {/* Step 1 */}
        <p className={stepLabelBase}>1. Select your university / board</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {universities.map((u) => (
            <button
              key={u}
              onClick={() => setUni(u)}
              className={`flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                uni === u
                  ? "border-up-accent bg-brand-50 text-up-accent"
                  : "border-up-line text-up-ink/80 hover:border-up-accent/50"
              }`}
            >
              <span>{u}</span>
              {uni === u && <Icon name="check" size={14} strokeWidth={3} className="shrink-0" />}
            </button>
          ))}
        </div>

        {/* Step 2 */}
        <p className={`${stepLabelBase} mt-9`}>2. Select your engineering branch / stream</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {branches.map((b) => (
            <button
              key={b.label}
              onClick={() => setBranch(b.label)}
              className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                branch === b.label
                  ? "border-transparent bg-up-accent text-white"
                  : "border-up-line text-up-ink/80 hover:border-up-accent/50"
              }`}
            >
              <Icon name={b.icon} size={16} className="shrink-0" />
              <span>{b.label}</span>
            </button>
          ))}
        </div>

        {/* Step 3 */}
        <div className="mt-9 flex items-center justify-between">
          <p className={stepLabelBase}>3. Choose current semester</p>
          <p className="text-xs font-bold text-up-accent">Semester {sem}</p>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-8">
          {semesters.map((s) => (
            <button
              key={s}
              onClick={() => setSem(s)}
              className={`rounded-xl border py-3 text-sm font-bold transition-colors ${
                sem === s
                  ? "border-transparent bg-up-accent text-white"
                  : "border-up-line text-up-ink/80 hover:border-up-accent/50"
              }`}
            >
              Sem {s}
            </button>
          ))}
        </div>
      </div>

      {/* Match result */}
      <div
        data-anim="up"
        className="mt-6 flex flex-col gap-5 rounded-[1.75rem] border border-up-accent/25 bg-brand-50/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-up-accent shadow-sm">
              {match.tag}
            </span>
            <span className="text-xs font-semibold text-up-muted">Semester {sem} match</span>
          </div>
          <h3 className="mt-3 font-display text-xl font-extrabold text-up-ink sm:text-2xl">
            {match.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-up-muted">{match.blurb}</p>
        </div>
        <div className="shrink-0 rounded-2xl bg-white px-6 py-4 text-center shadow-sm">
          <p className="text-[0.65rem] font-bold uppercase tracking-wide text-up-muted">Batch status</p>
          <p className="mt-1 text-lg font-extrabold text-red-600">Only {match.seats} Seats Left</p>
        </div>
      </div>

      {/* Track grid */}
      <div className="mt-14">
        <h3 className="font-display text-2xl font-extrabold text-up-ink">
          Matched live project tracks for {branch}
        </h3>
        <p className="mt-1.5 text-sm text-up-muted">Curriculum verified for {uni}.</p>

        <div data-anim="up" data-anim-stagger className="mt-8 grid gap-6 lg:grid-cols-2">
          {liveProjectTracks.map((t) => (
            <div key={t.title} className="flex flex-col rounded-2xl border border-line bg-white p-7">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-up-accent">
                  {t.tag}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-up-muted">
                  <Icon name="clock" size={13} />
                  {t.weeks}
                </span>
              </div>

              <h4 className="mt-4 text-lg font-bold text-up-ink">{t.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-up-muted">{t.blurb}</p>

              <p className="mt-5 text-[0.7rem] font-bold uppercase tracking-wide text-up-muted">
                Tech stack &amp; tools
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {t.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-up-line px-2 py-1 text-[0.72rem] text-up-ink/75"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-[0.7rem] font-bold uppercase tracking-wide text-up-muted">
                Includes
              </p>
              <ul className="mt-2 space-y-1.5">
                {t.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-up-ink/80">
                    <Icon name="check" size={13} strokeWidth={3} className="mt-0.5 shrink-0 text-up-accent" />
                    {inc}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setRequest({ title: "Download syllabus & check seats", course: t.title })}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-up-accent py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Icon name="download" size={16} />
                Download Syllabus &amp; Seats
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance panel */}
      <div data-anim="up" className="mt-14 rounded-[1.75rem] border border-line bg-subtle p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-up-accent shadow-sm">
            <Icon name="certificate" size={20} />
          </span>
          <div>
            <h3 className="text-lg font-bold text-up-ink">University Compliance &amp; Project Deliverables</h3>
            <p className="mt-1.5 max-w-2xl text-sm text-up-muted">
              Every training track is structured to comply with PTU, GNDU, Punjabi University, MRSPTU
              and PSBTE evaluation requirements.
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {deliverables.map((d) => (
            <div key={d.title} className="flex gap-3 rounded-xl bg-white p-5">
              <Icon name="check" size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-up-accent" />
              <div>
                <p className="text-sm font-bold text-up-ink">{d.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-up-muted">{d.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-up-muted">
          Students from these colleges regularly train with us
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {partnerColleges.map((c) => (
            <span
              key={c}
              className="rounded-full border border-up-line bg-white px-3 py-1.5 text-xs text-up-muted"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Mini CTA */}
      <div
        data-anim="up"
        className="mt-8 flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-up-accent">
            <Icon name="star" size={13} />
            4.9 rating (556+ Google verified reviews)
          </p>
          <h4 className="mt-2 text-base font-bold text-up-ink">
            Need custom batch timing or a college letter?
          </h4>
          <p className="mt-1 max-w-lg text-sm text-up-muted">
            Our academic counsellors guide you through PTU/GNDU training synopsis submission, batch
            timings, and fast-track seat confirmation.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-up-line px-5 py-3 text-sm font-semibold text-up-ink transition-colors hover:border-up-accent hover:text-up-accent"
          >
            <Icon name="phone" size={15} />
            Call {site.phone}
          </a>
          <button
            onClick={() => setRequest({ title: "Request a free callback", course: "General enquiry" })}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-hero-600 to-hero-glow px-5 py-3 text-sm font-bold text-white shadow-lg shadow-hero-600/25 transition-all hover:-translate-y-0.5"
          >
            Request Free Callback
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-up-muted">
        Choosing a track for the first time?{" "}
        <Link href="/tools/career-track" className="font-semibold text-up-accent hover:underline">
          Take the Career Track quiz
        </Link>{" "}
        to find your field before matching a batch.
      </p>
    </div>
  );
}
