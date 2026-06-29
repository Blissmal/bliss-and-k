import Link from "next/link";
import { Phone, Mail, ExternalLink } from "lucide-react";
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
    <footer
      className="relative z-10 px-6 lg:px-12 pt-20 pb-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group mb-5 w-fit">
              <div className="w-10 h-10 transition-transform duration-300 group-hover:scale-105 shrink-0">
                <LogoIcon className="w-full h-full" />
              </div>
              <div className="leading-tight">
                <div className="text-white font-bold text-[15px]">Bliss & K</div>
                <div className="text-[9px] uppercase tracking-[0.2em] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Developers</div>
              </div>
            </Link>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
              Innovative Technology, Reliable Solutions. We build the digital infrastructure that helps Kenyan businesses grow.
            </p>

            <div className="space-y-3">
              <a
                href="tel:0743942007"
                className="flex items-center gap-3 text-sm group w-fit"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(60,80,224,0.15)" }}>
                  <Phone className="w-3.5 h-3.5" style={{ color: "#a5b4fc" }} />
                </div>
                <span className="group-hover:text-white transition-colors">0743 942 007</span>
              </a>
              <div className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.28)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>Email coming soon</span>
              </div>
              <a
                href="https://portfolio.blissmal.store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm group w-fit"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(124,58,237,0.15)" }}>
                  <ExternalLink className="w-3.5 h-3.5" style={{ color: "#c4b5fd" }} />
                </div>
                <span className="group-hover:text-white transition-colors">portfolio.blissmal.store</span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: "rgba(255,255,255,0.38)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div
          className="rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "rgba(60,80,224,0.07)",
            border: "1px solid rgba(60,80,224,0.18)",
          }}
        >
          <div>
            <p className="font-bold text-lg mb-1" style={{ color: "rgba(255,255,255,0.9)" }}>
              Ready to start your project?
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Get a free quote — we typically respond within 2–4 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 text-sm font-bold px-6 py-3 rounded-xl text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#3C50E0,#7C3AED)" }}
          >
            Get a free quote
          </Link>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Bliss & K Developers. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            Built by{" "}
            <a
              href="https://portfolio.blissmal.store"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              style={{ color: "rgba(165,180,252,0.7)" }}
            >
              Blissmal
            </a>
            {" "}· Made in Kenya{" "}
            <svg className="w-4 h-2.5 inline-block rounded-sm shadow-sm ml-1 relative -top-0.5" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Black stripe */}
              <rect width="9" height="1.8" fill="black" />
              {/* White top outline */}
              <rect y="1.8" width="9" height="0.3" fill="white" />
              {/* Red stripe */}
              <rect y="2.1" width="9" height="1.8" fill="#DA121A" />
              {/* White bottom outline */}
              <rect y="3.9" width="9" height="0.3" fill="white" />
              {/* Green stripe */}
              <rect y="4.2" width="9" height="1.8" fill="#00AC47" />
              {/* Maasai shield */}
              <g transform="translate(3.7, 0.9)">
                <path d="M 0.8,0 C 0.8,0.8 1,1.5 1.2,2.1 C 1,2.7 0.8,3.4 0.8,4.2 C 0.8,3.4 0.6,2.7 0.4,2.1 C 0.6,1.5 0.8,0.8 0.8,0" fill="#DA121A" stroke="white" strokeWidth="0.15" />
                <line x1="0.8" y1="0.5" x2="0.8" y2="3.7" stroke="white" strokeWidth="0.2" />
                <circle cx="0.4" cy="2.1" r="0.18" fill="black" />
                <circle cx="1.2" cy="2.1" r="0.18" fill="black" />
              </g>
            </svg>
          </p>
        </div>
      </div>
    </footer>
  );
}
