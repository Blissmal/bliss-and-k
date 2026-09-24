"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteQuote, setQuoteStatus } from "./actions";

export default function QuoteActions({ id, status }: { id: string; status: string }) {
  const [pending, start] = useTransition();
  return (
    <div className="flex items-center gap-2">
      <select aria-label="Quotation status" defaultValue={status} disabled={pending} onChange={(e) => start(() => setQuoteStatus(id, e.target.value))} className="field !w-auto !py-1.5">
        {["draft", "sent", "accepted", "declined"].map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
      </select>
      <button aria-label="Delete quotation" disabled={pending} onClick={() => confirm("Delete this quotation?") && start(() => deleteQuote(id))} className="p-1 text-white/45 hover:text-rose-300">
        <Trash2 size={15} />
      </button>
    </div>
  );
}
