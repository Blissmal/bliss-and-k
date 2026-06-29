"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Phone, Code2, Globe, Zap, Shield } from "lucide-react";

const TRUST_ITEMS = [
  "No lock-in contracts",
  "M-Pesa built in",
  "30-day code warranty",
  "Full source ownership",
];

// Floating stat pill
function StatPill({
  icon,
  value,
  label,
  color,
  className,
  delay,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute flex items-center gap-2.5 px-4 py-3 rounded-2xl ${className}`}
      style={{
        background: "rgba(10,12,20,0.82)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${color}44`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.35)`,
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ background: `${color}20` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold" style={{ color }}>
          {value}
        </p>
        <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
          {label}
        </p>
      </div>
    </motion.div>
  );
}

// Browser mockup showing a site being built
function BrowserMockup() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-30 blur-3xl"
        style={{ background: "linear-gradient(135deg, #3C50E0, #7C3AED)" }}
      />

      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "#0d1117",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Chrome bar */}
        <div
          className="flex items-center gap-3 px-5 py-3.5"
          style={{ background: "#161b22", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
          </div>
          <div
            className="flex-1 max-w-xs mx-auto h-5 rounded-md flex items-center justify-center gap-1.5 px-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: "#22AD5C", opacity: 0.7 }} />
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.22)" }}>
              blissandk.dev
            </span>
          </div>
        </div>

        {/* Site content mockup */}
        <div className="p-5 space-y-4">
          {/* Fake navbar */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-md"
                style={{ background: "linear-gradient(135deg,#3C50E0,#7C3AED)" }}
              />
              <div className="w-14 h-2 rounded" style={{ background: "rgba(255,255,255,0.18)" }} />
            </div>
            <div className="flex items-center gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-1.5 rounded" style={{ background: "rgba(255,255,255,0.07)" }} />
              ))}
              <div className="w-16 h-5 rounded-lg" style={{ background: "#3C50E0" }} />
            </div>
          </div>

          {/* Hero text blocks */}
          <div className="space-y-2 py-2">
            <div className="w-3/4 h-4 rounded-md" style={{ background: "rgba(255,255,255,0.14)" }} />
            <div
              className="w-full h-4 rounded-md"
              style={{
                background: "linear-gradient(90deg, rgba(60,80,224,0.6) 0%, rgba(124,58,237,0.35) 100%)",
              }}
            />
            <div className="w-1/2 h-2.5 rounded mt-2" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="w-2/3 h-2.5 rounded" style={{ background: "rgba(255,255,255,0.04)" }} />
          </div>

          {/* CTA row */}
          <div className="flex gap-2">
            <div
              className="h-7 w-24 rounded-lg flex items-center justify-center"
              style={{ background: "#3C50E0" }}
            >
              <div className="w-8 h-1.5 rounded" style={{ background: "rgba(255,255,255,0.5)" }} />
            </div>
            <div
              className="h-7 w-20 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            {[
              { c: "#3C50E0", label: "Web Dev" },
              { c: "#7C3AED", label: "Apps" },
              { c: "#22AD5C", label: "E-Comm" },
            ].map(({ c, label }, i) => (
              <div
                key={i}
                className="p-3 rounded-xl space-y-2"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="w-7 h-7 rounded-lg" style={{ background: `${c}22` }}>
                  <div className="w-3.5 h-3.5 m-1.5 rounded" style={{ background: c, opacity: 0.8 }} />
                </div>
                <div className="h-1.5 rounded" style={{ background: "rgba(255,255,255,0.12)", width: "70%" }} />
                <div className="h-1 rounded" style={{ background: "rgba(255,255,255,0.05)", width: "85%" }} />
                <div className="h-1 rounded" style={{ background: "rgba(255,255,255,0.04)", width: "60%" }} />
              </div>
            ))}
          </div>

          {/* Typing indicator */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg w-fit"
            style={{ background: "rgba(60,80,224,0.1)", border: "1px solid rgba(60,80,224,0.2)" }}
          >
            <Code2 className="w-3 h-3" style={{ color: "#a5b4fc" }} />
            <span className="text-[10px] font-mono" style={{ color: "rgba(165,180,252,0.7)" }}>
              Building your vision...
            </span>
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1 h-3 rounded-sm"
              style={{ background: "#a5b4fc" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  // GSAP hero reveal
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const { default: gsap } = await import("gsap");

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-badge",
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          ".hero-word",
          { y: 90, opacity: 0, skewY: 3 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.9, stagger: 0.06 },
          "-=0.35"
        )
        .fromTo(
          ".hero-sub",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.45"
        )
        .fromTo(
          ".hero-cta",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".hero-trust",
          { opacity: 0 },
          { opacity: 1, duration: 0.4, stagger: 0.05 },
          "-=0.2"
        );

      cleanup = () => tl.kill();
    };

    init();
    return () => cleanup?.();
  }, []);

  const line1 = ["Innovative", "Technology,"];
  const line2 = ["Reliable", "Solutions."];

  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 px-6 overflow-hidden z-10">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: Copy ── */}
          <div className="relative">
            {/* Badge */}
            <div className="hero-badge mb-7 opacity-0">
              <span
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full"
                style={{
                  background: "rgba(34,173,92,0.1)",
                  color: "#4ade80",
                  border: "1px solid rgba(34,173,92,0.25)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#22AD5C", boxShadow: "0 0 8px #22AD5C" }}
                />
                Available for new projects · Kenya
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-black leading-[1.08] mb-7"
              style={{ letterSpacing: "-0.025em", overflow: "hidden" }}
            >
              {/* Line 1 */}
              <div className="overflow-hidden">
                <div className="flex flex-wrap gap-x-4">
                  {line1.map((word, i) => (
                    <span
                      key={i}
                      className="hero-word inline-block opacity-0"
                      style={{
                        fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                        color: "rgba(255,255,255,0.97)",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
              {/* Line 2 — gradient */}
              <div className="overflow-hidden mt-1">
                <div className="flex flex-wrap gap-x-4">
                  {line2.map((word, i) => (
                    <span
                      key={i}
                      className="hero-word inline-block opacity-0 text-gradient-blue"
                      style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)" }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </h1>

            {/* Sub */}
            <p
              className="hero-sub opacity-0 text-lg leading-relaxed mb-9 max-w-lg"
              style={{ color: "rgba(255,255,255,0.44)" }}
            >
              We build high-quality digital products — from business websites to full-scale web apps, POS systems, and M-Pesa e-commerce platforms — for Kenyan businesses and beyond.
            </p>

            {/* CTAs */}
            <div className="hero-cta opacity-0 flex flex-col sm:flex-row gap-4 mb-9">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#3C50E0,#7C3AED)" }}
              >
                Start a project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                View our services
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-5">
              {TRUST_ITEMS.map((t) => (
                <span
                  key={t}
                  className="hero-trust opacity-0 flex items-center gap-1.5 text-xs"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  <Check className="w-3.5 h-3.5" style={{ color: "#22AD5C" }} />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Visual ── */}
          <div className="relative hidden lg:block h-[520px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-[440px]">
                <BrowserMockup />
              </div>
            </div>

            {/* Floating stat pills */}
            <StatPill
              icon={<Zap className="w-3.5 h-3.5" style={{ color: "#3C50E0" }} />}
              value="50+"
              label="Projects shipped"
              color="#3C50E0"
              className="top-[6%] left-[-2%]"
              delay={1.0}
            />
            <StatPill
              icon={<Shield className="w-3.5 h-3.5" style={{ color: "#22AD5C" }} />}
              value="M-Pesa"
              label="Native integration"
              color="#22AD5C"
              className="top-[46%] right-[-4%]"
              delay={1.15}
            />
            <StatPill
              icon={<Globe className="w-3.5 h-3.5" style={{ color: "#7C3AED" }} />}
              value="3+ yrs"
              label="Active agency"
              color="#7C3AED"
              className="bottom-[10%] left-[2%]"
              delay={1.3}
            />

            {/* Decorative dots */}
            <div className="absolute top-[22%] right-[10%] w-3 h-3 rounded-full" style={{ background: "rgba(60,80,224,0.3)" }} />
            <div className="absolute bottom-[28%] right-[20%] w-2 h-2 rounded-full" style={{ background: "rgba(124,58,237,0.4)" }} />
            <div className="absolute top-[62%] left-[28%] w-4 h-4 rounded-full" style={{ background: "rgba(249,115,22,0.2)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
