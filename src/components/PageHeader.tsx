import Link from "next/link";

interface Crumb { label: string; href?: string }

interface PageHeaderProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  crumbs?: Crumb[];
}

export default function PageHeader({ badge, title, titleAccent, description, crumbs }: PageHeaderProps) {
  return (
    <section className="relative pt-36 pb-20 px-6 overflow-hidden">
      {/* Decorative gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(60,80,224,0.4) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        {crumbs && crumbs.length > 0 && (
          <nav className="flex items-center gap-2 mb-6">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>}
                {c.href ? (
                  <Link
                    href={c.href}
                    className="text-xs transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        {badge && (
          <div className="mb-5">
            <span
              className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(60,80,224,0.12)",
                color: "#a5b4fc",
                border: "1px solid rgba(60,80,224,0.22)",
              }}
            >
              {badge}
            </span>
          </div>
        )}

        <h1
          className="font-black leading-[1.1] mb-4"
          style={{
            fontSize: "clamp(2.2rem,5vw,3.6rem)",
            color: "rgba(255,255,255,0.97)",
            letterSpacing: "-0.025em",
          }}
        >
          {title}{" "}
          {titleAccent && (
            <span className="text-gradient-blue">{titleAccent}</span>
          )}
        </h1>

        {description && (
          <p
            className="max-w-2xl text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
