"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { FAQS_ALL } from "@/lib/data";
import FaqAccordion from "@/components/ui/FaqAccordion";

export default function FaqPageClient() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative z-10 px-6 lg:px-12 pb-28">
      <div className="max-w-3xl mx-auto">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FAQS_ALL.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                color: activeTab === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.42)",
              }}
            >
              {activeTab === i && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "rgba(60,80,224,0.13)",
                    border: "1px solid rgba(60,80,224,0.28)",
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative z-10">{cat.category}</span>
            </button>
          ))}
        </div>

        {/* FAQ content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <FaqAccordion items={FAQS_ALL[activeTab].items} />
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div>
            <p className="font-bold text-base mb-1" style={{ color: "rgba(255,255,255,0.92)" }}>
              Didn't find your answer?
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              WhatsApp or call — we respond within 2–4 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:0743942007"
              className="flex items-center justify-center gap-2 text-sm font-bold px-5 py-3 rounded-xl text-center transition-all hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Phone className="w-3.5 h-3.5" /> 0743 942 007
            </a>
            <Link
              href="/contact"
              className="text-sm font-bold px-5 py-3 rounded-xl text-white text-center transition-all hover:-translate-y-0.5 hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#3C50E0,#7C3AED)" }}
            >
              Send a message
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
