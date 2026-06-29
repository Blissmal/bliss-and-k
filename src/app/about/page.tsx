import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Eye, Code2, ShieldCheck, MapPin } from "lucide-react";
import { TEAM } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BuildingDigitalSolutionsSVG } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet the team behind Bliss & K Developers — Bethuel Maluti (lead developer) and K (business lead). Kenya-based, client-focused.",
};

const VALUES = [
  {
    icon: Eye,
    title: "Transparency first",
    desc: "No hidden fees. No moving goalposts. You get a full scope, a fixed quote, and honest progress updates at every stage.",
    color: "#3C50E0",
  },
  {
    icon: Code2,
    title: "Clean code, always",
    desc: "We write maintainable, well-documented code you (or any future developer) can build on without starting from scratch.",
    color: "#7C3AED",
  },
  {
    icon: ShieldCheck,
    title: "Full ownership",
    desc: "You own everything we build — all source code, design files, and databases. No subscriptions, no lock-ins, no royalties.",
    color: "#22AD5C",
  },
  {
    icon: MapPin,
    title: "Built for Kenya",
    desc: "We understand the local market — M-Pesa integrations, local hosting, Swahili-friendly UX, and Kenya-specific compliance.",
    color: "#F97316",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="Who we are"
        title="Building digital solutions"
        titleAccent="for a better tomorrow."
        description="Bliss & K Developers is a two-person software agency in Kenya — one builds, one sells, and together we ship."
        crumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
      />

      <section className="relative z-10 px-6 lg:px-12 pb-28">
        <div className="max-w-5xl mx-auto">

          {/* Story */}
          <AnimatedSection className="mb-16">
            <div
              className="rounded-2xl p-8 md:p-10 grid md:grid-cols-3 gap-8 items-center"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="md:col-span-2">
                <span
                  className="text-[11px] font-bold uppercase tracking-widest mb-5 block"
                  style={{ color: "#a5b4fc" }}
                >
                  Our story
                </span>
                <p
                  className="text-lg leading-relaxed mb-5"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  Bliss & K Developers was founded on a simple belief:{" "}
                  <span style={{ color: "rgba(255,255,255,0.95)" }}>
                    businesses of all sizes deserve high-quality digital tools — without enterprise price tags.
                  </span>
                </p>
                <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
                  We combine deep technical expertise with a genuine understanding of the Kenyan market. Every project is scoped clearly, delivered on time, and handed over with full documentation. No surprises.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Whether you need a two-page business website or a full multi-tenant SaaS with M-Pesa payments and an admin dashboard — we've built it, and we can build it for you.
                </p>
              </div>
              <div
                className="flex items-center justify-center p-6 rounded-xl h-full border"
                style={{
                  background: "rgba(10,12,20,0.4)",
                  borderColor: "rgba(255,255,255,0.04)",
                }}
              >
                <BuildingDigitalSolutionsSVG className="w-full max-w-[220px]" />
              </div>
            </div>
          </AnimatedSection>

          {/* Team */}
          <AnimatedSection className="mb-16">
            <h2
              className="text-2xl font-black mb-8"
              style={{ color: "rgba(255,255,255,0.95)", letterSpacing: "-0.02em" }}
            >
              The team
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {TEAM.map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-7"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Avatar + name */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shrink-0"
                      style={{ background: m.bg, color: m.color }}
                    >
                      {m.initials}
                    </div>
                    <div>
                      <p className="font-bold text-base" style={{ color: "rgba(255,255,255,0.95)" }}>
                        {m.name}
                      </p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: m.color }}>
                        {m.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {m.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          background: `${m.color}12`,
                          color: m.color,
                          border: `1px solid ${m.color}22`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={m.href}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                    style={{ color: m.color }}
                  >
                    {m.handle}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Values */}
          <AnimatedSection className="mb-16">
            <h2
              className="text-2xl font-black mb-8"
              style={{ color: "rgba(255,255,255,0.95)", letterSpacing: "-0.02em" }}
            >
              Our values
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {VALUES.map((v, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-6 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${v.color}15` }}
                  >
                    <v.icon className="w-5 h-5" style={{ color: v.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-2" style={{ color: "rgba(255,255,255,0.92)" }}>
                      {v.title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection>
            <div
              className="rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{
                background: "rgba(60,80,224,0.06)",
                border: "1px solid rgba(60,80,224,0.18)",
              }}
            >
              <div>
                <p className="font-bold text-lg mb-1" style={{ color: "rgba(255,255,255,0.92)" }}>
                  Want to work with us?
                </p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.42)" }}>
                  Let's have a quick discovery call — no commitment required.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#3C50E0,#7C3AED)" }}
              >
                Get in touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </>
  );
}
