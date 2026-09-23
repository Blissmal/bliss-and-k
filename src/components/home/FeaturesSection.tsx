import Link from "next/link";
import { SERVICES } from "@/lib/data";

const SPAN = ["lg:col-span-2 lg:row-span-2", "", "", "lg:col-span-2", "", "", "", "", "lg:col-span-2", "lg:col-span-2"];
const TONE: Record<number, string> = { 0: "btn-amber text-[#1a0f2e]", 3: "biz-card", 5: "mist text-[#1a0f2e]" };

export default function FeaturesSection() {
  return (
    <section id="services" className="relative z-10 px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display max-w-3xl text-[clamp(2.75rem,6.5vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            Everything your business needs online.
          </h2>
          <p className="max-w-sm text-lg font-light leading-relaxed text-white/70">
            From a landing page to a multi-tenant SaaS, we scope, design and ship it.
          </p>
        </div>
        <div className="mt-14 grid auto-rows-[minmax(230px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const light = i === 0 || i === 5;
            const big = i === 0;
            return (
              <Link
                key={s.title}
                href="/services"
                className={`flex flex-col justify-between rounded-[2rem] p-7 transition-transform duration-500 hover:-translate-y-1 ${SPAN[i]} ${TONE[i] ?? "liquid-glass"}`}
              >
                <Icon className={`${big ? "h-10 w-10" : "h-7 w-7"} ${light ? "text-[#4932a0]" : "text-amber-200"}`} aria-hidden="true" />
                <div>
                  <h3 className={`font-display font-bold tracking-tight ${big ? "text-4xl" : "text-xl"}`}>{s.title}</h3>
                  <p className={`mt-3 leading-relaxed ${light ? "text-[#1a0f2e]/70" : "text-white/65"} ${big ? "text-lg" : "text-sm"}`}>
                    {big ? s.fullDesc : s.shortDesc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
