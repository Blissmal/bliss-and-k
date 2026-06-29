"use client";

import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const variants = {
    up:    { initial: { opacity: 0, y: 32 },  animate: { opacity: 1, y: 0 } },
    left:  { initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 24 },  animate: { opacity: 1, x: 0 } },
    none:  { initial: { opacity: 0 },          animate: { opacity: 1 } },
  };

  const v = variants[direction];

  return (
    <motion.div
      className={className}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
