import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative z-10 min-h-[80vh] flex items-center justify-center px-6 text-center">
      <div>
        <p
          className="text-[10rem] font-black leading-none mb-2 opacity-5 select-none"
          style={{ color: "white" }}
        >
          404
        </p>
        <div className="-mt-16 relative z-10">
          <span
            className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(60,80,224,0.12)",
              color: "#a5b4fc",
              border: "1px solid rgba(60,80,224,0.22)",
            }}
          >
            Page not found
          </span>
          <h1
            className="text-4xl font-black mb-4"
            style={{ color: "rgba(255,255,255,0.95)", letterSpacing: "-0.025em" }}
          >
            This page doesn't exist.
          </h1>
          <p className="text-base mb-8 max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
            The page you're looking for may have moved or never existed in the first place.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#3C50E0,#7C3AED)" }}
            >
              Go home <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
