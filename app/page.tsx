import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { ServiceArea } from "@/components/sections/service-area";
import { Faq } from "@/components/sections/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Pricing />
      <ServiceArea />
      <Faq />
    </>
  );
}
