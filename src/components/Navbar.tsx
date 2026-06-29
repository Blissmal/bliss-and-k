"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoIcon } from "@/components/ui/Logo";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
      style={{
        background: scrolled ? "rgba(10,12,20,0.93)" : "rgba(10,12,20,0.55)",
        backdropFilter: "blur(24px) saturate(1.8)",
        WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.35)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" onClick={close}>
          <div className="w-10 h-10 transition-transform duration-300 group-hover:scale-105 shrink-0">
            <LogoIcon className="w-full h-full" />
          </div>
          <div className="leading-tight">
            <div className="text-white font-bold text-[15px] leading-none">Bliss & K</div>
            <div
              className="text-[9px] uppercase tracking-[0.2em] leading-none mt-0.5"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Developers
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.label}
                href={l.href}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                style={{ color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)" }}
              >
                {active && (
                  <span
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "rgba(60,80,224,0.12)",
                      border: "1px solid rgba(60,80,224,0.22)",
                    }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:0743942007"
            className="text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-300 hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            0743 942 007
          </a>
          <Link
            href="/contact"
            className="text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#3C50E0,#7C3AED)" }}
          >
            Get a quote
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300"
          style={{
            background: menuOpen ? "rgba(60,80,224,0.15)" : "transparent",
            border: menuOpen ? "1px solid rgba(60,80,224,0.3)" : "1px solid transparent",
          }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-5 h-5" style={{ color: "#a5b4fc" }} />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="w-5 h-5" style={{ color: "rgba(255,255,255,0.6)" }} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div
              className="mt-4 rounded-2xl p-4 space-y-1"
              style={{
                background: "rgba(13,16,24,0.97)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {NAV_LINKS.map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      onClick={close}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        background: active ? "rgba(60,80,224,0.12)" : "transparent",
                        color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
                        border: active ? "1px solid rgba(60,80,224,0.2)" : "1px solid transparent",
                      }}
                    >
                      {l.label}
                      {active && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#3C50E0" }} />}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="h-px mx-2 my-2" style={{ background: "rgba(255,255,255,0.06)" }} />
              <Link
                href="/contact"
                onClick={close}
                className="block w-full text-center px-4 py-3.5 rounded-xl text-sm font-bold text-white transition-all"
                style={{ background: "linear-gradient(135deg,#3C50E0,#7C3AED)" }}
              >
                Get a free quote
              </Link>
              <a
                href="tel:0743942007"
                className="flex items-center justify-center gap-2 w-full text-center px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <Phone className="w-3.5 h-3.5" /> 0743 942 007
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
