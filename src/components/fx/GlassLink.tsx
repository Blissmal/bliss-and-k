"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

type Props = { href: string; children: ReactNode; variant?: "solid" | "glass"; className?: string };

export default function GlassLink({ href, children, variant = "glass", className = "" }: Props) {
  const track = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const ripple = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const s = document.createElement("span");
    s.className = "drop-ripple";
    s.style.left = `${e.clientX - r.left}px`;
    s.style.top = `${e.clientY - r.top}px`;
    el.appendChild(s);
    setTimeout(() => s.remove(), 700);
  };
  return (
    <Link
      href={href}
      onMouseMove={track}
      onClick={ripple}
      className={`drop drop-water inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold overflow-hidden transition-transform duration-300 hover:-translate-y-0.5 active:scale-95 ${
        variant === "solid" ? "btn-amber text-[#1a0f2e]" : "liquid-glass text-white"
      } ${className}`}
    >
      <span className="drop-label relative inline-block">{children}</span>
    </Link>
  );
}
