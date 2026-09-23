import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const due = await db.todo.findMany({
    where: { done: false, remindedAt: null, remindAt: { lte: new Date() } },
    include: { project: true },
    take: 25,
  });

  let sent = 0;
  for (const t of due) {
    const when = t.dueAt?.toLocaleString("en-KE", { timeZone: "Africa/Nairobi", dateStyle: "medium", timeStyle: "short" });
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.REMINDER_FROM,
        to: [process.env.ADMIN_EMAIL],
        subject: `Reminder: ${t.title}`,
        html: `<p><strong>${esc(t.title)}</strong></p><p>${when ? `Due ${when} (EAT)` : ""}${t.project ? ` · ${esc(t.project.name)}` : ""}</p>`,
      }),
    });
    if (res.ok) {
      await db.todo.update({ where: { id: t.id }, data: { remindedAt: new Date() } });
      sent++;
    }
  }
  return Response.json({ due: due.length, sent });
}
