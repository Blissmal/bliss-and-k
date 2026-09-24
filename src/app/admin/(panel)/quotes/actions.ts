"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

type Item = { desc: string; qty: number; price: number };
type R<T> = { ok: true; data: T } | { ok: false; error: string };
const STATUSES = ["draft", "sent", "accepted", "declined"];

export async function saveQuote(input: { id?: string; client: string; title: string; vat: boolean; validDays: number; items: Item[] }): Promise<R<{ id: string }>> {
  await requireAdmin();
  const client = String(input.client).trim().slice(0, 120);
  const title = String(input.title).trim().slice(0, 160);
  if (!client || !title) return { ok: false, error: "Add a client name and a project title." };
  const items = input.items.slice(0, 30).map((i) => ({
    desc: String(i.desc).slice(0, 200),
    qty: Math.max(1, Math.round(Number(i.qty) || 1)),
    price: Math.max(0, Number(i.price) || 0),
  }));
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const data = {
    client, title, items,
    vat: !!input.vat,
    validDays: Math.min(365, Math.max(1, Math.round(Number(input.validDays) || 14))),
    total: Math.round(input.vat ? subtotal * 1.16 : subtotal),
  };
  try {
    if (input.id) {
      await db.quote.update({ where: { id: input.id }, data });
      revalidatePath("/admin/quotes");
      return { ok: true, data: { id: input.id } };
    }
    const existing = await db.quote.findMany({ select: { number: true } });
    const next = Math.max(0, ...existing.map((q) => Number(q.number.split("-")[2]) || 0)) + 1;
    const q = await db.quote.create({ data: { ...data, number: `BK-${new Date().getFullYear()}-${String(next).padStart(3, "0")}` } });
    revalidatePath("/admin/quotes");
    return { ok: true, data: { id: q.id } };
  } catch {
    return { ok: false, error: "Could not save the quotation. Try again." };
  }
}

export async function setQuoteStatus(id: string, status: string) {
  await requireAdmin();
  if (!STATUSES.includes(status)) return;
  await db.quote.update({ where: { id }, data: { status } });
  revalidatePath("/admin/quotes");
}

export async function deleteQuote(id: string) {
  await requireAdmin();
  await db.quote.delete({ where: { id } });
  revalidatePath("/admin/quotes");
}
