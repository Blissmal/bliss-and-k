import Link from "next/link";

interface Crumb { label: string; href?: string }

interface PageHeaderProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  crumbs?: Crumb[];
}

export default function PageHeader({ title, titleAccent, description, crumbs }: PageHeaderProps) {
  return (
    <section className="relative z-10 overflow-hidden px-6 pb-20 pt-40 lg:px-12">
      <span aria-hidden="true" className="orb-css !z-0 -right-20 top-20 hidden h-72 w-72 opacity-80 blur-[3px] md:block" />
      <div className="relative z-10 mx-auto max-w-7xl">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/30" aria-hidden="true">/</span>}
                {c.href ? (
                  <Link href={c.href} className="text-white/60 transition-colors hover:text-white">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display max-w-5xl text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.9] tracking-[-0.045em]">
          {[title, titleAccent].filter(Boolean).join(" ")}
        </h1>
        {description && (
          <p className="mt-8 max-w-xl border-l-2 border-amber-400 pl-5 text-xl font-light leading-relaxed text-white/80">{description}</p>
        )}
      </div>
    </section>
  );
}
