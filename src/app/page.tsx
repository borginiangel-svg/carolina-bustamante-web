import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <FeaturedProperties />
      <Testimonials />
    </>
  );
}