"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/data";
import SectionBadge from "@/components/ui/SectionBadge";
import { InnovateSloganSVG } from "@/components/ui/Logo";

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!ref.current) return;

      gsap.fromTo(
        ref.current.querySelectorAll(".feat-card"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    };
    init();
  }, []);

  return (
    <section id="services" className="relative z-10 px-6 lg:px-12 py-28 section-divider">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionBadge>What we build</SectionBadge>
          <h2
            className="text-4xl md:text-5xl font-black mt-4 mb-5"
            style={{ color: "rgba(255,255,255,0.97)", letterSpacing: "-0.025em" }}
          >
            Everything your business needs{" "}
            <span className="text-gradient-blue">online.</span>
          </h2>
          <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
            From a simple landing page to a full multi-tenant SaaS — we scope, design, and ship it.
          </p>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={i}
                className="feat-card opacity-0 group relative rounded-2xl p-6 cursor-default"
                whileHover={{
                  y: -4,
                  transition: { duration: 0.22, ease: "easeOut" },
                }}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ border: `1px solid ${svc.color}44` }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: svc.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: svc.color }} />
                </div>

                <h3
                  className="font-bold text-base mb-2.5"
                  style={{ color: "rgba(255,255,255,0.92)" }}
                >
                  {svc.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {svc.shortDesc}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {svc.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${svc.color}12`,
                        color: svc.color,
                        border: `1px solid ${svc.color}25`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Styled Slogan from Business Card */}
        <div className="flex justify-center mt-16 mb-6">
          <InnovateSloganSVG className="w-full max-w-[420px]" />
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ color: "#a5b4fc" }}
          >
            See full service details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
