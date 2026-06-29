import Link from "next/link";
import { FAQS_HOME } from "@/lib/data";
import SectionBadge from "@/components/ui/SectionBadge";
import FaqAccordion from "@/components/ui/FaqAccordion";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FaqSection() {
  return (
    <section id="faq" className="relative z-10 px-6 lg:px-12 py-28 section-divider">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <SectionBadge>Common questions</SectionBadge>
            <h2
              className="text-4xl md:text-5xl font-black mt-4 mb-4"
              style={{ color: "rgba(255,255,255,0.97)", letterSpacing: "-0.025em" }}
            >
              Frequently asked questions
            </h2>
            <p className="text-base" style={{ color: "rgba(255,255,255,0.4)" }}>
              Still have questions?{" "}
              <Link
                href="/contact"
                className="font-semibold transition-colors hover:text-white"
                style={{ color: "#a5b4fc" }}
              >
                Talk to us directly.
              </Link>
            </p>
          </div>
        </AnimatedSection>

        <FaqAccordion items={FAQS_HOME} />

        {/* See all FAQs */}
        <AnimatedSection delay={0.3} className="text-center mt-8">
          <Link
            href="/faq"
            className="text-sm font-semibold transition-all hover:-translate-y-0.5 inline-flex items-center gap-1.5"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            See all FAQs →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
