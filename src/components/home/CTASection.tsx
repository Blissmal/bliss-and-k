import GlassLink from "@/components/fx/GlassLink";

export default function CTASection() {
  return (
    <section className="relative z-10 px-6 pb-28 pt-10 lg:px-12">
      <div className="biz-card relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] p-10 md:p-20">
        <span aria-hidden="true" className="orb-css !z-0 -bottom-28 -right-20 h-80 w-80 blur-[4px]" />
        <div className="relative z-10">
          <h2 className="font-display max-w-4xl text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.045em]">
            Tell us what you need to build.
          </h2>
          <p className="mt-8 max-w-xl text-xl font-light leading-relaxed text-white/75">
            We reply within a few hours with a clear scope, an honest timeline and a transparent quote.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <GlassLink href="/contact" variant="solid">Start your project</GlassLink>
            <GlassLink href="tel:0743942007">Call 0743 942 007</GlassLink>
          </div>
          <p className="mt-6 text-sm text-white/55">Mon to Sat, 8am to 8pm EAT. We usually respond in 2 to 4 hours.</p>
        </div>
      </div>
    </section>
  );
}
