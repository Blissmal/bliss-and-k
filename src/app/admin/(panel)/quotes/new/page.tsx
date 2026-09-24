import { requireAdmin } from "@/lib/auth";
import QuoteBuilder from "../QuoteBuilder";

export default async function NewQuotePage() {
  await requireAdmin();
  return <QuoteBuilder />;
}
