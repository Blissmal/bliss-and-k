"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS_ALL } from "@/lib/data";
import FaqAccordion from "@/components/ui/FaqAccordion";
import GlassLink from "@/components/fx/GlassLink";

export default function FaqPageClient() {
  const [tab, setTab] = useState(0);

  return (
    <section className="relative z-10 px-6 pb-28 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div role="tablist" className="liquid-glass mb-8 inline-flex flex-wrap gap-1 rounded-3xl p-1.5">
          {FAQS_ALL.map((c, i) => (
            <button
              key={c.category}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className="relative rounded-full px-5 py-2 text-sm font-medium"
            >
              {tab === i && (
                <motion.span
                  layoutId="faq-tab"
                  className="drop-bead absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span className={`relative z-10 ${tab === i ? "text-white" : "text-white/60"}`}>{c.category}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            <FaqAccordion items={FAQS_ALL[tab].items} />
          </motion.div>
        </AnimatePresence>

        <div className="biz-card mt-12 flex flex-col items-start justify-between gap-5 rounded-[2rem] p-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-xl font-bold">Didn&apos;t find your answer?</p>
            <p className="mt-1 text-sm text-white/60">WhatsApp or call. We respond within 2 to 4 hours.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <GlassLink href="tel:0743942007">0743 942 007</GlassLink>
            <GlassLink href="/contact" variant="solid">Send a message</GlassLink>
          </div>
        </div>
      </div>
    </section>
  );
}
