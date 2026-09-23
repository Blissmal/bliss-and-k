import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { LogoIcon } from "@/components/ui/Logo";

const FOOTER_LINKS = {
  Services: SERVICES.slice(0, 5).map((s) => ({ label: s.title, href: "/services" })),
  Company: [
    { label: "About us", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden px-6 pt-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex w-fit items-center gap-2.5" aria-label="Bliss & K Developers home">
              <LogoIcon className="h-10 w-10" />
              <span className="font-display text-lg font-bold">Bliss &amp; K Developers</span>
            </Link>
            <p className="mt-5 max-w-xs font-light leading-relaxed text-white/70">
              Innovative Technology, Reliable Solutions. We build the digital infrastructure that helps Kenyan businesses grow.
            </p>
            <a href="tel:0743942007" className="mt-5 inline-block text-lg font-semibold hover:text-amber-200">0743 942 007</a>
          </div>
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <nav key={group} aria-label={group}>
              <h2 className="mb-4 font-semibold text-amber-200">{group}</h2>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="drop-water text-white/70 hover:text-white">
                      <span className="drop-label inline-block">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-6 text-sm text-white/55">
          <p>© {new Date().getFullYear()} Bliss &amp; K Developers. All rights reserved.</p>
          <a href="https://portfolio.blissmal.store" target="_blank" rel="noopener noreferrer" className="hover:text-white">Lead developer portfolio</a>
        </div>
      </div>
      <p aria-hidden="true" className="font-display pointer-events-none mt-6 select-none whitespace-nowrap bg-gradient-to-b from-white/30 to-transparent bg-clip-text text-center text-[18vw] font-bold leading-[0.8] tracking-[-0.06em] text-transparent">
        Bliss &amp; K
      </p>
    </footer>
  );
}
