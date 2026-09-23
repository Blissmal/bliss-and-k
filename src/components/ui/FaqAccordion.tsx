"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FaqItem { q: string; a: string }

export default function FaqAccordion({ items, accentColor = "#ff8a36" }: { items: FaqItem[]; accentColor?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="liquid-glass overflow-hidden rounded-2xl transition-colors duration-300"
            style={isOpen ? { borderColor: `${accentColor}80` } : undefined}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-semibold leading-snug">{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 text-xl font-light"
                style={{ color: isOpen ? accentColor : "rgba(255,255,255,0.45)" }}
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 leading-relaxed text-white/65">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
