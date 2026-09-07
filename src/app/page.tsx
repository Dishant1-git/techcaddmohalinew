import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Categories from "@/components/home/Categories";
import AiSpotlight from "@/components/home/AiSpotlight";
import Capabilities from "@/components/home/Capabilities";
import AboutStrip from "@/components/home/AboutStrip";
import Durations from "@/components/home/Durations";
import Process from "@/components/home/Process";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import TechOrbit from "@/components/home/TechOrbit";
import Faq from "@/components/home/Faq";
import CtaBanner from "@/components/home/CtaBanner";

export default function Home() {
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
      <Categories />
      <FeaturedCourses />
      <WhyUs />
      <Testimonials />
      <TechOrbit />
      <Capabilities />
      <Faq />
      <CtaBanner />
    </>
  );
}
