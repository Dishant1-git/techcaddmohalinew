import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Find My Career Track — Free IT & CAD Career Quiz",
  description:
    "Four quick questions to find the right IT or CAD track for you — development, AI & data, cyber & cloud, digital marketing, CAD design or core programming — with a matching course and a 90-day roadmap. Free, instant, no form.",
};

const trustPoints = ["100% free — always", "Results shown instantly", "No spam, ever"];

export default function CareerTrackPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Free Tools" }, { label: "Career Track" }]}
        eyebrow="Free tool · 4 questions · PDF roadmap"
        title={
          <>
            <span className="text-white/45">Find my IT / CAD</span> career track.
          </>
        }
        subtitle="Four questions, then a 90-day plan you can actually follow: the course that fits, the job titles to apply for, and what to build first. Download it as a PDF. No form, no email, no catch."
      />

      <section className="border-b border-line py-12 lg:py-16">
        <div className="container-x">
          <div
            data-anim="up"
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-up-muted"
          >
            {trustPoints.map((p) => (
              <span key={p} className="inline-flex items-center gap-2">
                <Icon name="check" size={15} strokeWidth={3} className="text-up-accent" />
                {p}
              </span>
            ))}
          </div>

          <div className="mt-14">
            <CareerTrackQuiz />
          </div>
        </div>
      </section>

      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
