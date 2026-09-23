const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const clip = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const name = clip(body?.name, 100);
  const message = clip(body?.message, 4000);
  if (!name || !message) return Response.json({ error: "Name and message are required" }, { status: 400 });

  const email = clip(body?.email, 200);
  const rows: [string, string][] = [
    ["Name", name], ["Email", email], ["Phone", clip(body?.phone, 40)],
    ["Service", clip(body?.service, 100)], ["Budget", clip(body?.budget, 100)],
  ];
  const html =
    rows.filter(([, v]) => v).map(([k, v]) => `<p><strong>${k}:</strong> ${esc(v)}</p>`).join("") +
    `<p style="white-space:pre-wrap">${esc(message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.REMINDER_FROM,
      to: [process.env.ADMIN_EMAIL],
      ...(/^\S+@\S+\.\S+$/.test(email) ? { reply_to: email } : {}),
      subject: `New enquiry from ${name}`,
      html,
    }),
  });
  return res.ok ? Response.json({ ok: true }) : Response.json({ error: "Could not send" }, { status: 502 });
}
