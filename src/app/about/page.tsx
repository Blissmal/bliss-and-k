import type { Metadata } from "next";
import { ExternalLink, Eye, Code2, ShieldCheck, MapPin } from "lucide-react";
import { TEAM } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/home/CTASection";
import { BuildingDigitalSolutionsSVG } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet the team behind Bliss & K Developers — Bethuel Maluti (lead developer) and K (business lead). Kenya-based, client-focused.",
};

const VALUES = [
  { icon: Eye, title: "Transparency first", desc: "No hidden fees. No moving goalposts. You get a full scope, a fixed quote, and honest progress updates at every stage." },
  { icon: Code2, title: "Clean code, always", desc: "We write maintainable, well-documented code you (or any future developer) can build on without starting from scratch." },
  { icon: ShieldCheck, title: "Full ownership", desc: "You own everything we build — all source code, design files, and databases. No subscriptions, no lock-ins, no royalties." },
  { icon: MapPin, title: "Built for Kenya", desc: "We understand the local market — M-Pesa integrations, local hosting, Swahili-friendly UX, and Kenya-specific compliance." },
];
const CARD = ["mist text-[#1a0f2e]", "biz-card"];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Building digital solutions"
        titleAccent="for a better tomorrow."
        description="Bliss & K Developers is a two-person software agency in Kenya — one builds, one sells, and together we ship."
        crumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
      />
      <section className="relative z-10 px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <p className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-light leading-[1.15] tracking-tight">
                Bliss &amp; K Developers was founded on a simple belief: businesses of all sizes deserve high-quality digital tools, without enterprise price tags.
              </p>
              <div className="mt-8 grid gap-6 text-lg font-light leading-relaxed text-white/70 md:grid-cols-2">
                <p>We combine deep technical expertise with a genuine understanding of the Kenyan market. Every project is scoped clearly, delivered on time, and handed over with full documentation. No surprises.</p>
                <p>Whether you need a two-page business website or a full multi-tenant SaaS with M-Pesa payments and an admin dashboard, we&apos;ve built it, and we can build it for you.</p>
              </div>
            </div>
            <div className="liquid-glass flex items-center justify-center rounded-[2rem] p-8">
              <BuildingDigitalSolutionsSVG className="w-full max-w-[240px]" />
            </div>
          </div>

          <div className="mt-20 grid gap-4 md:grid-cols-2">
            {TEAM.map((m, i) => {
              const light = i === 0;
              return (
                <article key={m.name} className={`flex flex-col justify-between gap-10 rounded-[2.5rem] p-9 md:p-12 ${CARD[i % 2]}`}>
                  <span className="text-[clamp(6rem,12vw,10rem)] font-extralight leading-none tracking-[-0.06em] opacity-70">{m.initials}</span>
                  <div>
                    <h2 className="font-display text-3xl font-bold tracking-tight">{m.name}</h2>
                    <p className={`mt-1 font-semibold ${light ? "text-[#4932a0]" : "text-amber-200"}`}>{m.role}</p>
                    <p className={`mt-4 leading-relaxed ${light ? "text-[#1a0f2e]/75" : "text-white/75"}`}>{m.desc}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {m.tags.map((t) => (
                        <li key={t} className={`rounded-full border px-3 py-1 text-xs ${light ? "border-black/20" : "border-white/25"}`}>{t}</li>
                      ))}
                    </ul>
                    <a
                      href={m.href}
                      target={m.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`mt-5 inline-flex items-center gap-1.5 font-semibold underline underline-offset-4 ${light ? "text-[#4932a0]" : "text-amber-200"}`}
                    >
                      {m.handle} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="border-t border-white/25 pt-5">
                <v.icon className="h-6 w-6 text-amber-200" aria-hidden="true" />
                <h3 className="font-display mt-5 text-2xl font-bold tracking-tight">{v.title}</h3>
                <p className="mt-3 font-light leading-relaxed text-white/70">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
