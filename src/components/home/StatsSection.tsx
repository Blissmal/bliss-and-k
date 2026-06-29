"use client";

import { useEffect, useRef } from "react";
import { Zap, Users, Calendar, Wrench } from "lucide-react";
import { STATS } from "@/lib/data";

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ref.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count ?? 0);
        const suffix = el.dataset.suffix ?? "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      });
    };

    init();
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-10 px-6 lg:px-12 py-14"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.018)",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: `${stat.color}18` }}
            >
              {(() => {
                const icons = [Zap, Users, Calendar, Wrench];
                const Icon = icons[i];
                return <Icon className="w-5 h-5" style={{ color: stat.color }} />;
              })()}
            </div>
            <div>
              <p
                className="text-3xl font-black mb-1"
                data-count={stat.value}
                data-suffix={stat.suffix}
                style={{ color: "rgba(255,255,255,0.95)", letterSpacing: "-0.02em" }}
              >
                0{stat.suffix}
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.34)" }}>
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
