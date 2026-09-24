"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Printer, Save, Sparkles, Trash2 } from "lucide-react";
import { saveQuote } from "./actions";
import { draftQuote } from "../assistant/actions";

type Item = { desc: string; qty: number; price: number };
const kes = (n: number) => new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(n);

export type SavedQuote = { id: string; number: string; client: string; title: string; vat: boolean; validDays: number; items: Item[]; createdAt: Date };

export default function QuoteBuilder({ initial }: { initial?: SavedQuote }) {
  const [client, setClient] = useState(initial?.client ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [vat, setVat] = useState(initial?.vat ?? true);
  const [days, setDays] = useState(initial?.validDays ?? 14);
  const [items, setItems] = useState<Item[]>(initial?.items ?? [{ desc: "", qty: 1, price: 0 }]);
  const [brief, setBrief] = useState("");
  const [err, setErr] = useState("");
  const [pending, start] = useTransition();
  const router = useRouter();
  const [note, setNote] = useState("");
  const [meta, setMeta] = useState<{ no: string; date: Date } | null>(null);

  useEffect(() => {
    setMeta({ no: initial?.number ?? "Unsaved draft", date: initial ? new Date(initial.createdAt) : new Date() });
  }, [initial]);

  const set = (i: number, patch: Partial<Item>) => setItems((xs) => xs.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const subtotal = items.reduce((s, x) => s + x.qty * x.price, 0);
  const tax = vat ? Math.round(subtotal * 0.16) : 0;
  const fmt = (d: Date) => d.toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" });
  const expires = meta && new Date(meta.date.getTime() + days * 86400000);

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <div className="liquid-glass h-fit space-y-3 rounded-[2rem] p-5 print:hidden">
        <Link href="/admin/quotes" className="text-sm text-white/60 hover:text-white">← All quotations</Link>
        <h1 className="font-display text-2xl font-bold">{initial ? initial.number : "New quotation"}</h1>
        <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={3} placeholder="Paste a client brief to draft the line items" className="field" />
        <button disabled={pending} onClick={() => { setErr(""); start(async () => { const r = await draftQuote(brief); if (r.ok) { setClient(r.data.client); setTitle(r.data.title); setItems(r.data.items); } else setErr(r.error); }); }} className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium disabled:opacity-60"><Sparkles size={14} /> {pending ? "Drafting…" : "Draft with AI"}</button>
        {err && <p role="alert" className="text-sm text-rose-300">{err}</p>}
        <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Client name" className="field" />
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project title" className="field" />
        {items.map((x, i) => (
          <div key={i} className="space-y-2 rounded-2xl bg-white/5 p-3">
            <input value={x.desc} onChange={(e) => set(i, { desc: e.target.value })} placeholder="Description" className="field" />
            <div className="flex gap-2">
              <input type="number" min={1} value={x.qty} onChange={(e) => set(i, { qty: Number(e.target.value) })} aria-label="Quantity" className="field !w-20" />
              <input type="number" min={0} value={x.price} onChange={(e) => set(i, { price: Number(e.target.value) })} aria-label="Unit price in KES" className="field" />
              <button onClick={() => setItems((xs) => xs.filter((_, j) => j !== i))} aria-label="Remove line" className="px-1 text-white/50 hover:text-rose-300"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        <button onClick={() => setItems((xs) => [...xs, { desc: "", qty: 1, price: 0 }])} className="flex items-center gap-2 text-sm text-white/70 hover:text-white"><Plus size={15} /> Add line</button>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={vat} onChange={(e) => setVat(e.target.checked)} /> Add 16% VAT</label>
        <label className="flex items-center gap-2 text-sm">Valid for <input type="number" min={1} value={days} onChange={(e) => setDays(Number(e.target.value))} className="field !w-20" /> days</label>
        <button disabled={pending || !client.trim() || !title.trim()} onClick={() => { setErr(""); setNote(""); start(async () => { const r = await saveQuote({ id: initial?.id, client, title, vat, validDays: days, items }); if (!r.ok) { setErr(r.error); return; } setNote("Saved."); if (initial) router.refresh(); else router.replace(`/admin/quotes/${r.data.id}`); }); }} className="btn-amber flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#1a0f2e] disabled:opacity-50"><Save size={15} /> {pending ? "Working…" : "Save quotation"}</button>
        {note && <p role="status" className="text-sm text-amber-200">{note}</p>}
        <button onClick={() => window.print()} className="liquid-glass flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"><Printer size={15} /> Print or save as PDF</button>
      </div>

      <article className="rounded-[2rem] bg-white p-6 text-neutral-900 sm:p-10 print:rounded-none print:p-0">
        <header className="flex justify-between border-b border-neutral-200 pb-6">
          <div>
            <div className="font-display text-2xl font-bold">Bliss &amp; K Developers</div>
            <div className="text-sm text-neutral-500">0743 942 007</div>
          </div>
          <div className="text-right text-sm text-neutral-500">
            <div className="font-semibold text-neutral-900">Quotation {meta?.no}</div>
            <div>{meta && fmt(meta.date)}</div>
            <div>Valid until {expires && fmt(expires)}</div>
          </div>
        </header>
        <div className="py-6">
          <div className="text-sm text-neutral-500">Prepared for</div>
          <div className="text-lg font-semibold">{client || "Client name"}</div>
          <div className="text-neutral-600">{title || "Project title"}</div>
        </div>
        <div className="overflow-x-auto"><table className="w-full min-w-[28rem] text-sm">
          <thead><tr className="border-b border-neutral-200 text-left text-neutral-500"><th className="py-2 font-medium">Description</th><th className="font-medium">Qty</th><th className="text-right font-medium">Unit</th><th className="text-right font-medium">Amount</th></tr></thead>
          <tbody>
            {items.map((x, i) => (
              <tr key={i} className="border-b border-neutral-100"><td className="py-2">{x.desc || "—"}</td><td>{x.qty}</td><td className="text-right">{kes(x.price)}</td><td className="text-right">{kes(x.qty * x.price)}</td></tr>
            ))}
          </tbody>
        </table></div>
        <dl className="ml-auto mt-6 w-64 space-y-1 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{kes(subtotal)}</dd></div>
          {vat && <div className="flex justify-between"><dt>VAT 16%</dt><dd>{kes(tax)}</dd></div>}
          <div className="flex justify-between border-t border-neutral-300 pt-2 text-base font-bold"><dt>Total</dt><dd>{kes(subtotal + tax)}</dd></div>
        </dl>
      </article>
    </div>
  );
}
