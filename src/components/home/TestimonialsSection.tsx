"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import SectionBadge from "@/components/ui/SectionBadge";

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-current" style={{ color: "#F59E0B" }} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative z-10 px-6 lg:px-12 py-28 section-divider">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <SectionBadge color="#fbbf24">What clients say</SectionBadge>
          <h2
            className="text-4xl md:text-5xl font-black mt-4"
            style={{ color: "rgba(255,255,255,0.97)", letterSpacing: "-0.025em" }}
          >
            Trusted by businesses{" "}
            <span className="text-gradient-orange">across Kenya.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-7 flex flex-col"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <StarRow />
              <p
                className="text-sm leading-relaxed flex-1 mb-6"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                  style={{ background: `${t.color}20`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.88)" }}>
                    {t.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.32)" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
