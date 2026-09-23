"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { ask, parseJson } from "@/lib/ai";

type R<T> = { ok: true; data: T } | { ok: false; error: string };
const fail = (e: unknown): { ok: false; error: string } => ({ ok: false, error: e instanceof Error ? e.message : "Something went wrong" });
const when = (d: Date | null) => (d ? d.toLocaleString("en-KE", { timeZone: "Africa/Nairobi", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) : "no due date");
const ROLE = "You are the operations assistant for Bliss & K Developers, a Kenyan web development agency.";

export async function summariseWeek(): Promise<R<string>> {
  await requireAdmin();
  try {
    const now = new Date();
    const weekAhead = new Date(now.getTime() + 7 * 864e5);
    const [open, done, projects] = await Promise.all([
      db.todo.findMany({ where: { done: false, OR: [{ dueAt: null }, { dueAt: { lte: weekAhead } }] }, include: { project: true }, orderBy: { dueAt: "asc" }, take: 60 }),
      db.todo.findMany({ where: { done: true }, orderBy: { createdAt: "desc" }, take: 15 }),
      db.project.findMany({ select: { name: true, status: true } }),
    ]);
    const line = (t: (typeof open)[number]) => `- ${t.dueAt && t.dueAt < now ? "[OVERDUE] " : ""}${t.title} (${when(t.dueAt)}${t.project ? `, ${t.project.name}` : ""})`;
    const text = await ask(
      `${ROLE} Write a short weekly briefing: what is overdue, what is due in the next 7 days, and 2 to 3 suggested priorities. Plain text, no markdown, under 200 words. Use only the data given. Times are Kenya time.`,
      `Now: ${when(now)}\n\nOpen tasks:\n${open.map(line).join("\n") || "none"}\n\nRecently completed:\n${done.map((t) => `- ${t.title}`).join("\n") || "none"}\n\nProjects:\n${projects.map((p) => `- ${p.name} (${p.status})`).join("\n") || "none"}`,
      700,
    );
    return { ok: true, data: text };
  } catch (e) {
    return fail(e);
  }
}

export async function planTasks(brief: string, start: string): Promise<R<{ title: string; dayOffset: number }[]>> {
  await requireAdmin();
  try {
    if (!brief.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(start)) throw new Error("Add a project brief and a start date.");
    const out = parseJson<{ tasks: { title: unknown; dayOffset: unknown }[] }>(
      await ask(
        `${ROLE} Break the project into 6 to 12 concrete tasks in delivery order. Reply with JSON only: {"tasks":[{"title":string,"dayOffset":integer}]}. dayOffset is days after the start date, from 0 to 90.`,
        `Start date: ${start}\n\nProject brief:\n${brief.slice(0, 4000)}`,
        1200,
      ),
    );
    const tasks = out.tasks
      .filter((t) => typeof t.title === "string" && t.title.trim())
      .slice(0, 12)
      .map((t) => ({ title: String(t.title).trim().slice(0, 140), dayOffset: Math.min(90, Math.max(0, Math.round(Number(t.dayOffset) || 0))) }));
    return { ok: true, data: tasks };
  } catch (e) {
    return fail(e);
  }
}

export async function addPlannedTasks(tasks: { title: string; dayOffset: number }[], start: string, projectId: string): Promise<R<number>> {
  await requireAdmin();
  try {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || tasks.length === 0 || tasks.length > 25) throw new Error("Nothing to add.");
    const base = new Date(`${start}T17:00:00+03:00`).getTime();
    await db.todo.createMany({
      data: tasks.map((t) => ({
        title: String(t.title).trim().slice(0, 140),
        dueAt: new Date(base + Math.min(90, Math.max(0, Number(t.dayOffset) || 0)) * 864e5),
        projectId: projectId || null,
      })),
    });
    revalidatePath("/admin/tasks");
    return { ok: true, data: tasks.length };
  } catch (e) {
    return fail(e);
  }
}

export async function draftQuote(brief: string): Promise<R<{ client: string; title: string; items: { desc: string; qty: number; price: number }[] }>> {
  await requireAdmin();
  try {
    if (!brief.trim()) throw new Error("Paste a client brief first.");
    const out = parseJson<{ client?: string; title?: string; items?: { desc: unknown; qty: unknown; price: unknown }[] }>(
      await ask(
        `${ROLE} Turn the client brief into quotation line items. Reply with JSON only: {"client":string,"title":string,"items":[{"desc":string,"qty":integer,"price":number}]}. Prices are in KES. Never invent prices: use a price only if the brief states an amount, otherwise use 0.`,
        brief.slice(0, 4000),
        1000,
      ),
    );
    const items = (out.items ?? []).slice(0, 15).map((i) => ({
      desc: String(i.desc ?? "").slice(0, 160),
      qty: Math.max(1, Math.round(Number(i.qty) || 1)),
      price: Math.max(0, Number(i.price) || 0),
    }));
    return { ok: true, data: { client: String(out.client ?? ""), title: String(out.title ?? ""), items: items.length ? items : [{ desc: "", qty: 1, price: 0 }] } };
  } catch (e) {
    return fail(e);
  }
}
