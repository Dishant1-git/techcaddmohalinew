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
import { getCourses, getTestimonials } from "@/lib/cms/content";
import { featuredSlugs } from "@/lib/courses";

export default async function Home() {
  // One catalogue read serves both the featured strip and its "browse all"
  // count, so the home page makes a single CMS call rather than two.
  const [courses, testimonials] = await Promise.all([getCourses(), getTestimonials()]);
  const featured = featuredSlugs
    .map((slug) => courses.find((course) => course.slug === slug))
    .filter((course): course is (typeof courses)[number] => Boolean(course));

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
      <FeaturedCourses items={featured} total={courses.length} />
      <WhyUs />
      <Testimonials items={testimonials} />
      <TechOrbit />
      <Capabilities />
      <Faq />
      <CtaBanner />
    </>
  );
}
