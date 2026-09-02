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
    <>
      <Hero />
      <StatsBar />
      <Categories />
      <AiSpotlight />
      <Capabilities />
      <AboutStrip />
      <Durations />
      <Process />
      <FeaturedCourses />
      <WhyUs />
      <Testimonials />
      <TechOrbit />
      <Faq />
      <CtaBanner />
    </>
  );
}
