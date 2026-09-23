import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowSection from "@/components/home/HowSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import TiltReveal from "@/components/fx/TiltReveal";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Bliss & K Developers | Innovative Technology, Reliable Solutions",
  description:
    "Premium software development agency in Kenya. Web development, web apps, POS systems, e-commerce with M-Pesa built in. Based in Kenya, serving clients worldwide.",
  alternates: { canonical: "https://blissandk.dev" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <TiltReveal><FeaturesSection /></TiltReveal>
      <TiltReveal><HowSection /></TiltReveal>
      <TiltReveal><TestimonialsSection /></TiltReveal>
      <TiltReveal><FaqSection /></TiltReveal>
      <CTASection />
    </>
  );
}
