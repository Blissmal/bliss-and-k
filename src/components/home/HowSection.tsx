"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageSquare, Cpu, Rocket } from "lucide-react";
import { HOW_STEPS } from "@/lib/data";
import SectionBadge from "@/components/ui/SectionBadge";

export default function HowSection() {
  return (
    <section id="how" className="relative z-10 px-6 lg:px-12 py-28 section-divider">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionBadge color="#c4b5fd">How we work</SectionBadge>
          <h2
            className="text-4xl md:text-5xl font-black mt-4 mb-5"
            style={{ color: "rgba(255,255,255,0.97)", letterSpacing: "-0.025em" }}
          >
            Simple process,{" "}
            <span className="text-gradient-blue">no surprises.</span>
          </h2>
          <p className="max-w-lg mx-auto text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
            We've refined our process to be clear, collaborative, and efficient — for both sides.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(60,80,224,0.4), transparent)",
            }}
          />

          {HOW_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl p-7 text-center"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Step number circle */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10"
                style={{
                  background: `${step.color}15`,
                  border: `1px solid ${step.color}30`,
                }}
              >
                {(() => {
                  const icons = [MessageSquare, Cpu, Rocket];
                  const Icon = icons[i];
                  return <Icon className="w-6 h-6" style={{ color: step.color }} />;
                })()}
              </div>

              {/* Step number badge */}
              <span
                className="absolute top-5 right-5 text-[11px] font-black tracking-widest"
                style={{ color: `${step.color}60` }}
              >
                {step.step}
              </span>

              <h3
                className="font-bold text-lg mb-3"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#3C50E0,#7C3AED)" }}
          >
            Book a discovery call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
