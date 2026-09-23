"use client";

import { useEffect, useState } from "react";
import { Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { deleteKey, revealKey } from "./actions";

export default function KeyRow({ id, label, last4 }: { id: string; label: string; last4: string }) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (!value) return;
    const t = setTimeout(() => setValue(null), 15000);
    return () => clearTimeout(t);
  }, [value]);

  const toggle = async () => setValue(value ? null : await revealKey(id));

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 text-sm">
      <span className="w-32 shrink-0 truncate font-medium">{label}</span>
      <code className="min-w-0 flex-1 truncate text-white/70">{value ?? `••••••••${last4}`}</code>
      <button onClick={toggle} aria-label={value ? "Hide key" : "Reveal key"} className="text-white/60 hover:text-white">
        {value ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
      <button
        onClick={async () => navigator.clipboard.writeText(value ?? (await revealKey(id)) ?? "")}
        aria-label="Copy key"
        className="text-white/60 hover:text-white"
      >
        <Copy size={15} />
      </button>
      <form action={deleteKey}>
        <input type="hidden" name="id" value={id} />
        <button aria-label="Delete key" className="text-white/60 hover:text-rose-300"><Trash2 size={15} /></button>
      </form>
    </div>
  );
}
