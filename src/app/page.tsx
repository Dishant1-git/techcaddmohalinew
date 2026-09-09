import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Categories from "@/components/home/Categories";
import AiSpotlight from "@/components/home/AiSpotlight";
import Capabilities from "@/components/home/Capabilities";
import AboutStrip from "@/components/home/AboutStrip";
import Durations from "@/components/home/Durations";
import Process from "@/components/home/Process";
import CategoryGrid from "@/components/home/CategoryGrid";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import TechOrbit from "@/components/home/TechOrbit";
import Faq from "@/components/home/Faq";
import CtaBanner from "@/components/home/CtaBanner";
import { getCourseCategories, getTestimonials } from "@/lib/cms/content";

export default async function Home() {
  // CategoryGrid derives its own cards from `src/lib/courses.ts`, so the only
  // CMS read this page still needs is the one behind the quotes marquee.
  const [testimonials, courseCategories] = await Promise.all([
    getTestimonials(),
    getCourseCategories(),
  ]);

  return (
    // Section order mirrors techcaddjalandhar.com's home page: AI first, then
    // the institute, how long it takes, how it works, what you can study, the
    // headline courses, proof, the stack, capabilities, questions, and the ask.
    <>
      <Hero />
      <StatsBar />
      <AiSpotlight />
      <AboutStrip />
      <Durations />
      <Process />
      <Categories items={courseCategories} />
      <CategoryGrid />
      <WhyUs />
      <Testimonials items={testimonials} />
      <TechOrbit />
      <Capabilities />
      <Faq />
      <CtaBanner />
    </>
  );
}
