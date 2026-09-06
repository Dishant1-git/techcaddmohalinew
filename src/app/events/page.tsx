import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import EventsGrid from "@/components/events/EventsGrid";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Events — Seminars, Workshops & Campus Sessions",
  description:
    "Seminars, workshops and hands-on sessions techcadd has run at its campus and at colleges across Punjab — most of them free, all of them taught by the people who run our courses.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Events" }]}
        eyebrow="Events"
        title={
          <>
            Seminars, workshops
            <br />
            <span className="text-white/45">and </span>the days we spend
            <br />
            teaching <span className="text-white/45">in public.</span>
          </>
        }
        subtitle="Hands-on sessions at our campus and at colleges across Punjab — most of them free, all of them taught by the people who run our courses."
      />

      <section className="py-16 lg:py-20">
        <div className="container-x">
          <EventsGrid />
        </div>
      </section>

      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
