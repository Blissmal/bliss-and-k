"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoIcon } from "@/components/ui/Logo";
import GlassLink from "@/components/fx/GlassLink";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const active = LINKS.find((l) => pathname === l.href || pathname.startsWith(l.href + "/"))?.href ?? null;
  const target = hovered ?? active;

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="relative w-full max-w-4xl">
        <div className="liquid-glass rounded-full flex items-center justify-between pl-4 pr-2 py-2">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5" aria-label="Bliss & K Developers home">
            <LogoIcon className="w-8 h-8" />
            <span className="font-display font-bold text-[15px] tracking-tight">Bliss &amp; K</span>
          </Link>

          <nav className="hidden md:flex items-center" onMouseLeave={() => setHovered(null)}>
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                onFocus={() => setHovered(l.href)}
                onBlur={() => setHovered(null)}
                className="drop-water relative rounded-full px-4 py-2 text-sm font-medium"
              >
                {target === l.href && (
                  <motion.span
                    layoutId="nav-drop"
                    className="drop-bead absolute inset-0 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 26, mass: 0.8 }}
                  />
                )}
                <span className={`drop-label relative z-10 inline-block transition-colors ${target === l.href ? "text-white" : "text-white/60"}`}>
                  {l.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <GlassLink href="/contact" variant="solid" className="!py-2.5">Get a quote</GlassLink>
          </div>

          <button
            className="md:hidden grid h-10 w-10 place-items-center rounded-full"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              className="liquid-glass absolute left-0 right-0 top-full mt-2 rounded-3xl p-3 md:hidden"
            >
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base font-medium hover:bg-white/10">
                  {l.label}
                </Link>
              ))}
              <GlassLink href="/contact" variant="solid" className="mt-2 w-full">Get a quote</GlassLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
