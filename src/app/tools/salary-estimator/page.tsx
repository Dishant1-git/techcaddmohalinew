import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SalaryEstimator from "@/components/tools/SalaryEstimator";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Salary & Career Growth Estimator — Punjab, NCR & Remote",
  description:
    "Pick a tech, marketing, CAD or security role and see fresher and 2-year salary ranges across Punjab/Tricity, Delhi NCR and remote work — plus where graduates actually get hired. Free, instant, no form.",
};

const trustPoints = ["100% free — always", "Results shown instantly", "No spam, ever"];

export default function SalaryEstimatorPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Free Tools" }, { label: "Salary Estimator" }]}
        eyebrow="Free tool · No form required"
        title={
          <>
            Salary &amp; career <br className="hidden sm:block" />
            growth estimator.
          </>
        }
        subtitle="Pick a role to see fresher and 2-year salary ranges across Punjab/Tricity, Delhi NCR and remote work — and exactly where our graduates get hired."
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
            <SalaryEstimator />
          </div>
        </div>
      </section>

      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
