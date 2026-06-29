"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative z-10 px-6 lg:px-12 py-28 section-divider">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Icon */}
          <div
            className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-8"
            style={{
              background: "linear-gradient(135deg,rgba(60,80,224,0.2),rgba(124,58,237,0.2))",
              border: "1px solid rgba(124,58,237,0.3)",
            }}
          >
            <Rocket className="w-8 h-8" style={{ color: "#a5b4fc" }} />
          </div>

          <h2
            className="text-4xl md:text-5xl font-black mb-5"
            style={{ color: "rgba(255,255,255,0.97)", letterSpacing: "-0.025em" }}
          >
            Ready to build?
          </h2>
          <p
            className="text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            Tell us what you need. We'll reply within a few hours with a clear scope, honest timeline, and transparent quote — no pressure, no corporate jargon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-92"
              style={{ background: "linear-gradient(135deg,#3C50E0,#7C3AED)" }}
            >
              Start your project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:0743942007"
              className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Phone className="w-4 h-4" /> Call 0743 942 007
            </a>
          </div>

          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            Mon – Sat · 8am – 8pm EAT · Typically respond in 2–4 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
