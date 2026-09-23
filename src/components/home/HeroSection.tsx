import GlassLink from "@/components/fx/GlassLink";
import TiltCard from "@/components/fx/TiltCard";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-16 pt-32 lg:px-12">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="font-display text-[clamp(3.25rem,8.6vw,8.25rem)] font-bold leading-[0.9] tracking-[-0.04em]">
            We build what your business runs on.
          </h1>
          <p className="mt-8 max-w-lg text-xl font-light leading-relaxed text-white/75">
            Web apps, point-of-sale and online stores with M-Pesa built in. Designed and shipped in Kenya.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <GlassLink href="/contact" variant="solid">Get a quote</GlassLink>
            <GlassLink href="/services">See what we build</GlassLink>
          </div>
        </div>
        <div className="relative">
          <TiltCard />
          <span aria-hidden="true" className="orb-css -left-10 top-[70%] h-36 w-36 blur-[10px]" />
          <span aria-hidden="true" className="orb-css -right-6 -top-10 h-24 w-24 blur-[6px]" />
        </div>
      </div>
    </section>
  );
}
