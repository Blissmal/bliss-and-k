import { FAQS_HOME } from "@/lib/data";
import FaqAccordion from "@/components/ui/FaqAccordion";
import GlassLink from "@/components/fx/GlassLink";

export default function FaqSection() {
  return (
    <section id="faq" className="relative z-10 px-6 py-28 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[5fr_7fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="font-display text-[clamp(2.75rem,6.5vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            Questions we hear most.
          </h2>
          <p className="mt-5 max-w-md text-lg font-light leading-relaxed text-white/70">
            Pricing, M-Pesa, timelines and ownership. Anything else, ask us directly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GlassLink href="/contact">Talk to us</GlassLink>
            <GlassLink href="/faq">See all FAQs</GlassLink>
          </div>
        </div>
        <FaqAccordion items={FAQS_HOME} />
      </div>
    </section>
  );
}
