import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack web development, web apps, POS systems, e-commerce, SEO, API integration, and more — built by Bliss & K Developers in Kenya.",
};

const TONES = [
  { cls: "btn-amber", light: true },
  { cls: "biz-card", light: false },
  { cls: "mist", light: true },
  { cls: "liquid-glass", light: false },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Ten services,"
        titleAccent="one reliable team."
        description="From a simple business website to a multi-tenant SaaS platform, we scope, design and ship it."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <section className="relative z-10 px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {SERVICES.map((s, i) => {
            const t = TONES[i % TONES.length];
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                style={{ top: `calc(6.5rem + ${i * 1.25}rem)` }}
                className={`sticky mb-6 grid min-h-[22rem] gap-8 rounded-[2.5rem] p-8 md:grid-cols-2 md:p-12 ${t.cls} ${t.light ? "text-[#1a0f2e]" : ""}`}
              >
                <div className="flex flex-col justify-between gap-8">
                  <Icon className={`h-12 w-12 ${t.light ? "text-[#4932a0]" : "text-amber-200"}`} aria-hidden="true" />
                  <h2 className="font-display text-4xl font-bold leading-none tracking-[-0.03em] md:text-6xl">{s.title}</h2>
                </div>
                <div className="flex flex-col justify-between gap-6">
                  <p className={`text-lg leading-relaxed ${t.light ? "text-[#1a0f2e]/75" : "text-white/75"}`}>{s.fullDesc}</p>
                  <div>
                    <ul className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <li key={tag} className={`rounded-full border px-3 py-1 text-xs ${t.light ? "border-black/20" : "border-white/25"}`}>{tag}</li>
                      ))}
                    </ul>
                    <Link href="/contact" className={`mt-5 inline-block font-semibold underline decoration-2 underline-offset-4 ${t.light ? "text-[#4932a0]" : "text-amber-200"}`}>
                      Request a quote
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <CTASection />
    </>
  );
}
