import { HOW_STEPS } from "@/lib/data";
import GlassLink from "@/components/fx/GlassLink";

export default function HowSection() {
  return (
    <section id="how" className="relative z-10 px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display max-w-4xl text-[clamp(2.75rem,6.5vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em]">
          A clear process from first call to handover.
        </h2>
        <ol className="mt-14 border-t border-white/20">
          {HOW_STEPS.map((s) => (
            <li key={s.step} className="grid gap-4 border-b border-white/20 py-10 md:grid-cols-[14rem_1fr_1.2fr] md:gap-10">
              <span className="text-[clamp(5rem,10vw,9rem)] font-extralight leading-none tracking-[-0.05em] text-amber-200">{s.step}</span>
              <h3 className="font-display text-3xl font-bold tracking-tight">{s.title}</h3>
              <p className="text-lg font-light leading-relaxed text-white/70">{s.desc}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <GlassLink href="/contact" variant="solid">Book a discovery call</GlassLink>
        </div>
      </div>
    </section>
  );
}
