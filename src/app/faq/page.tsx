import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FaqAccordion from "@/components/faq/FaqAccordion";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "FAQs — Admissions, Fees, Batches & Placement",
  description:
    "Straight answers on admissions, batches, fees, certification and placement for every techcadd course — organised by track so you can find yours fast.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "FAQs" }]}
        eyebrow="FAQs"
        title={
          <>
            Questions <span className="text-white/45">we are asked,</span>
            <br />
            and <span className="text-white/45">straight</span> answers.
          </>
        }
        subtitle="Admissions, batches, fees, placement and certification — organised by course. If something is not covered here, a call usually settles it in minutes."
      />

      <section className="py-16 lg:py-20">
        <div className="container-x">
          <FaqAccordion />
        </div>
      </section>

      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
