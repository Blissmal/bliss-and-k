"use client";

import { useEffect, useRef } from "react";
import { Calendar, Users, Wrench, Zap } from "lucide-react";
import { STATS } from "@/lib/data";

const ICONS = [Zap, Users, Calendar, Wrench];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let revert: (() => void) | undefined;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        ref.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const suffix = el.dataset.suffix ?? "";
          const obj = { val: 0 };
          el.textContent = `0${suffix}`;
          gsap.to(obj, {
            val: Number(el.dataset.count ?? 0),
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
          });
        });
      }, ref);
      revert = () => ctx.revert();
    })();
    return () => revert?.();
  }, []);

  return (
    <section className="relative z-10 px-6 py-24 lg:px-12">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <div key={s.label} className="border-t border-white/25 pt-5">
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-200">
                  <Icon size={14} aria-hidden="true" /> {s.label}
                </p>
                <p className="mt-6 text-[clamp(4rem,8vw,7.5rem)] font-extralight leading-none tracking-[-0.04em]" data-count={s.value} data-suffix={s.suffix}>
                  {s.value}{s.suffix}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-14 max-w-xl border-l-2 border-amber-400 pl-5 text-xl font-light leading-relaxed text-white/80">
          Web apps, point-of-sale and online stores for Kenyan businesses, with M-Pesa built in.
        </p>
      </div>
    </section>
  );
}
