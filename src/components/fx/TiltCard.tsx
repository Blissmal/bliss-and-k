"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LogoIcon } from "@/components/ui/Logo";

export default function TiltCard() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 14 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 120, damping: 14 });

  return (
    <div
      style={{ perspective: 1200 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      <motion.div
        style={{ rotateX, rotateY, rotateZ: -6 }}
        className="biz-card relative flex aspect-[1.6/1] w-full flex-col justify-between rounded-[2rem] p-7 sm:p-9"
      >
        <div className="flex items-start justify-between text-sm text-white/80">
          <span>Software studio, Kenya</span>
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-2.5 w-2.5 rounded-full border border-white/80" />
            <i className="h-2.5 w-2.5 rounded-full bg-white" />
            <i className="h-2.5 w-2.5 rounded-full bg-white" />
          </span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <LogoIcon className="h-12 w-12 sm:h-14 sm:w-14" />
          <span className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Bliss &amp; K</span>
        </div>
        <div className="flex items-end justify-between text-xs text-white/75 sm:text-sm">
          <span>Innovative Technology, Reliable Solutions</span>
          <span className="font-semibold text-white">0743 942 007</span>
        </div>
      </motion.div>
    </div>
  );
}
