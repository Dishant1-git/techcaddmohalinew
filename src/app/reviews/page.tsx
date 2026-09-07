import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ReviewsGrid from "@/components/reviews/ReviewsGrid";
import GoogleIcon from "@/components/reviews/GoogleIcon";
import Icon from "@/components/ui/Icon";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";
import { googleRating, studentsTrained } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Reviews — What Our Students Say",
  description:
    "Real Google reviews from techcadd Mohali students — on the trainers, the live projects, and the placement support, across Digital Marketing, AI, web development, cloud and more.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Reviews" }]}
        eyebrow="Reviews"
        title={
          <>
            In their words, <span className="text-white/45">not ours.</span>
          </>
        }
      >
        <div data-anim="up" data-anim-delay="0.2" className="mt-8 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white">
            <GoogleIcon size={16} />
            {googleRating.average}
            <span className="flex items-center gap-0.5 text-accent-yellow">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" size={12} className="fill-accent-yellow" strokeWidth={0} />
              ))}
            </span>
            <span className="font-normal text-up-soft/70">{googleRating.count}+ reviews</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white">
            {studentsTrained}
            <span className="font-normal text-up-soft/70">Students trained</span>
          </span>
        </div>
      </PageHero>

      <section className="py-16 lg:py-20">
        <div className="container-x">
          <ReviewsGrid />
        </div>
      </section>

      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
