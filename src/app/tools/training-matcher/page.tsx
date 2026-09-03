import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import TrainingMatcher from "@/components/tools/TrainingMatcher";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Training Matcher — Find Your 6 Weeks / 6 Months Track",
  description:
    "Select your university, engineering branch and semester to instantly find your approved industrial training track, check live seat availability, and request the official syllabus — free, no form.",
};

const trustPoints = [
  "Approved Certificates",
  "Synopsis & Report Support",
  "100% Practical Live Work",
];

export default function TrainingMatcherPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Free Tools" }, { label: "Training Matcher" }]}
        eyebrow="Free tool · Instant match"
        title={
          <>
            6 Weeks &amp; 6 Months <br className="hidden sm:block" />
            training matcher.
          </>
        }
        subtitle="Set your university, branch and semester — see your matched live project track and duration instantly, with seat availability and syllabus one click away."
      />

      <section className="border-b border-line py-12 lg:py-16">
        <div className="container-x">
          <div data-anim="up" className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-up-line bg-brand-50 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-up-accent">
              <Icon name="shield" size={13} />
              100% University Curriculum Aligned &amp; Approved
            </p>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-up-ink sm:text-4xl">
              6 Weeks &amp; 6 Months <span className="text-up-accent">Training Matcher</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-up-muted">
              Select your university, engineering branch and semester to instantly discover your
              approved live project track, verify seat availability, and download the official
              syllabus.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-up-muted">
              {trustPoints.map((p) => (
                <span key={p} className="inline-flex items-center gap-1.5">
                  <Icon name="check" size={14} strokeWidth={3} className="text-up-accent" />
                  {p}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5">
                <Icon name="star" size={13} className="text-accent-yellow" />
                4.9/5.0 (556+ Google Reviews)
              </span>
            </div>
          </div>

          <div className="mt-14">
            <TrainingMatcher />
          </div>
        </div>
      </section>

      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
