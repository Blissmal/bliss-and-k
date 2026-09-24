import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import GlassLink from "@/components/fx/GlassLink";
import QuoteActions from "./QuoteActions";

const kes = (n: number) => new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(n);
const day = (d: Date) => d.toLocaleDateString("en-KE", { timeZone: "Africa/Nairobi", day: "numeric", month: "short", year: "numeric" });

export default async function QuotesPage() {
  await requireAdmin();
  const quotes = await db.quote.findMany({ orderBy: { createdAt: "desc" } });
  const sum = (s: string) => quotes.filter((q) => q.status === s).reduce((n, q) => n + q.total, 0);
  const tiles = [
    { label: "Awaiting reply", value: kes(sum("sent")), hot: true },
    { label: "Accepted", value: kes(sum("accepted")) },
    { label: "Drafts", value: String(quotes.filter((q) => q.status === "draft").length) },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-4">
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none tracking-[-0.04em]">Quotations</h1>
        <GlassLink href="/admin/quotes/new" variant="solid">New quotation</GlassLink>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {tiles.map((t) => (
          <div key={t.label} className={`rounded-[2rem] p-6 ${t.hot ? "btn-amber text-[#1a0f2e]" : "liquid-glass"}`}>
            <p className={`text-sm ${t.hot ? "text-[#1a0f2e]/70" : "text-white/65"}`}>{t.label}</p>
            <p className="mt-3 text-4xl font-extralight tracking-[-0.03em] lg:text-5xl">{t.value}</p>
          </div>
        ))}
      </div>
      <section className="liquid-glass rounded-[2rem] px-6">
        {quotes.length === 0 && <p className="py-8 text-white/60">No quotations yet. Create your first one.</p>}
        {quotes.map((q) => (
          <div key={q.id} className="grid items-center gap-3 border-t border-white/10 py-5 first:border-t-0 md:grid-cols-[8rem_1fr_7rem_9rem_auto]">
            <Link href={`/admin/quotes/${q.id}`} className="font-semibold text-amber-200 hover:text-white">{q.number}</Link>
            <div className="min-w-0"><p className="truncate font-medium">{q.client}</p><p className="truncate text-sm text-white/60">{q.title}</p></div>
            <span className="text-sm text-white/60">{day(q.createdAt)}</span>
            <span className="font-semibold">{kes(q.total)}</span>
            <QuoteActions id={q.id} status={q.status} />
          </div>
        ))}
      </section>
    </div>
  );
}
