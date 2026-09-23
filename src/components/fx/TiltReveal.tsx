"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export default function TiltReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.15, 1]);
  return (
    <div ref={ref} style={{ perspective: 1400 }}>
      <motion.div style={reduce ? undefined : { rotateX, y, scale, opacity, transformOrigin: "50% 100%" }}>
        {children}
      </motion.div>
    </div>
  );
}
