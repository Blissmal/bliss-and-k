import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack web development, web apps, POS systems, e-commerce, SEO, API integration, and more — built by Bliss & K Developers in Kenya.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        badge="What we build"
        title="Our"
        titleAccent="services."
        description="From a simple business website to a complex multi-tenant SaaS platform — we scope, design, and ship it. Ten service areas, one reliable team."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="relative z-10 px-6 lg:px-12 pb-28">
        <div className="max-w-7xl mx-auto">
          {/* Services grid */}
          <div className="grid md:grid-cols-2 gap-5 mb-20">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <div
                    className="group relative rounded-2xl p-7 h-full hover:[--svc-border-color:var(--svc-hover-color)]"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid var(--svc-border-color, rgba(255,255,255,0.07))",
                      transition: "border-color 0.25s",
                      ["--svc-hover-color" as any]: `${svc.color}44`,
                    }}
                  >
                    <div className="flex items-start gap-5">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: svc.bg }}
                      >
                        <Icon className="w-6 h-6" style={{ color: svc.color }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h2
                          className="font-bold text-lg mb-2"
                          style={{ color: "rgba(255,255,255,0.95)" }}
                        >
                          {svc.title}
                        </h2>
                        <p
                          className="text-sm leading-relaxed mb-4"
                          style={{ color: "rgba(255,255,255,0.44)" }}
                        >
                          {svc.fullDesc}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {svc.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                              style={{
                                background: `${svc.color}12`,
                                color: svc.color,
                                border: `1px solid ${svc.color}22`,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all"
                          style={{ color: svc.color }}
                        >
                          Request a quote <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Custom project CTA */}
          <AnimatedSection>
            <div
              className="rounded-3xl p-10 text-center"
              style={{
                background: "rgba(60,80,224,0.06)",
                border: "1px solid rgba(60,80,224,0.18)",
              }}
            >
              <h2
                className="text-2xl font-black mb-3"
                style={{ color: "rgba(255,255,255,0.95)", letterSpacing: "-0.02em" }}
              >
                Need something custom?
              </h2>
              <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.42)" }}>
                If your project doesn't fit neatly into a category above, reach out anyway. We love unique challenges.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#3C50E0,#7C3AED)" }}
              >
                Discuss your project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
