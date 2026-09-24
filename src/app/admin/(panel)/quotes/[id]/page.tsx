import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import QuoteBuilder, { type SavedQuote } from "../QuoteBuilder";

export default async function EditQuotePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const q = await db.quote.findUnique({ where: { id } });
  if (!q) notFound();
  return (
    <QuoteBuilder
      initial={{ id: q.id, number: q.number, client: q.client, title: q.title, vat: q.vat, validDays: q.validDays, items: q.items as unknown as SavedQuote["items"], createdAt: q.createdAt }}
    />
  );
}
