"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FaqItem { q: string; a: string }

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`overflow-hidden rounded-[2rem] transition-colors duration-500 ${isOpen ? "mist text-[#1a0f2e]" : "liquid-glass"}`}>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left">
              <span className="font-display text-xl font-semibold tracking-tight md:text-2xl">{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl ${isOpen ? "btn-amber text-[#1a0f2e]" : "border border-white/30"}`}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                  <p className="px-7 pb-7 text-lg leading-relaxed text-[#1a0f2e]/75">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
