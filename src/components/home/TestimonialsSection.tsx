import { TESTIMONIALS } from "@/lib/data";

export default function TestimonialsSection() {
  const [lead, ...rest] = TESTIMONIALS;
  return (
    <section className="relative z-10 px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display max-w-4xl text-[clamp(2.75rem,6.5vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em]">
          Trusted by businesses across Kenya.
        </h2>
        <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <figure className="mist flex flex-col justify-between rounded-[2rem] p-9 text-[#1a0f2e] md:p-12 lg:col-span-2 lg:row-span-2">
            <span aria-hidden="true" className="font-display text-9xl font-bold leading-[0.6] text-[#4932a0]">&ldquo;</span>
            <blockquote className="font-display mt-6 text-3xl font-medium leading-tight tracking-tight md:text-5xl">{lead.quote}</blockquote>
            <figcaption className="mt-10 text-sm"><b>{lead.name}</b> · {lead.role}</figcaption>
          </figure>
          {rest.map((t, i) => (
            <figure key={t.name} className={`${i === 0 ? "biz-card" : "liquid-glass"} flex flex-col justify-between rounded-[2rem] p-7`}>
              <blockquote className="leading-relaxed text-white/85">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm"><b>{t.name}</b> <span className="text-white/60">· {t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
