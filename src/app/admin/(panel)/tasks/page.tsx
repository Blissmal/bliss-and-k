import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { addTodo, deleteTodo, toggleTodo } from "./actions";

const OFFSET = 3 * 3600e3; // EAT
const toEat = (d: Date) => new Date(d.getTime() + OFFSET);
const fmt = (d: Date) => d.toLocaleString("en-KE", { timeZone: "Africa/Nairobi", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
const key = (y: number, m: number) => `${y}-${String(m).padStart(2, "0")}`;

export default async function TasksPage({ searchParams }: { searchParams: Promise<{ m?: string }> }) {
  await requireAdmin();
  const { m } = await searchParams;
  const now = new Date();
  const today = toEat(now);
  const [y, mo] = /^\d{4}-\d{2}$/.test(m ?? "") ? m!.split("-").map(Number) : [today.getUTCFullYear(), today.getUTCMonth() + 1];

  const start = new Date(Date.UTC(y, mo - 1, 1) - OFFSET);
  const end = new Date(Date.UTC(y, mo, 1) - OFFSET);
  const [open, done, inMonth, projects] = await Promise.all([
    db.todo.findMany({ where: { done: false }, orderBy: { dueAt: { sort: "asc", nulls: "last" } }, include: { project: true } }),
    db.todo.findMany({ where: { done: true }, orderBy: { createdAt: "desc" }, take: 8 }),
    db.todo.findMany({ where: { dueAt: { gte: start, lt: end } }, orderBy: { dueAt: "asc" } }),
    db.project.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  const byDay = new Map<number, typeof inMonth>();
  for (const t of inMonth) {
    const d = toEat(t.dueAt!).getUTCDate();
    byDay.set(d, [...(byDay.get(d) ?? []), t]);
  }
  const days = new Date(Date.UTC(y, mo, 0)).getUTCDate();
  const lead = (new Date(Date.UTC(y, mo - 1, 1)).getUTCDay() + 6) % 7;
  const prev = mo === 1 ? key(y - 1, 12) : key(y, mo - 1);
  const next = mo === 12 ? key(y + 1, 1) : key(y, mo + 1);
  const isToday = (d: number) => today.getUTCFullYear() === y && today.getUTCMonth() + 1 === mo && today.getUTCDate() === d;

  return (
    <div className="mx-auto grid max-w-6xl gap-6 xl:grid-cols-[1fr_380px]">
      <section className="liquid-glass rounded-3xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">
            {new Date(Date.UTC(y, mo - 1, 1)).toLocaleString("en-KE", { month: "long", year: "numeric", timeZone: "UTC" })}
          </h1>
          <div className="flex gap-1">
            <Link href={`?m=${prev}`} aria-label="Previous month" className="rounded-full p-2 hover:bg-white/10"><ChevronLeft size={18} /></Link>
            <Link href={`?m=${next}`} aria-label="Next month" className="rounded-full p-2 hover:bg-white/10"><ChevronRight size={18} /></Link>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5 text-xs">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <div key={d} className="px-1 pb-1 text-white/45">{d}</div>)}
          {Array.from({ length: lead }, (_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: days }, (_, i) => {
            const d = i + 1, ts = byDay.get(d) ?? [];
            return (
              <div key={d} className={`min-h-20 rounded-xl p-1.5 ${isToday(d) ? "bg-amber-400/15 ring-1 ring-amber-300/50" : "bg-white/5"}`}>
                <div className="mb-1 font-medium text-white/70">{d}</div>
                {ts.slice(0, 2).map((t) => <div key={t.id} className={`truncate rounded-md px-1 ${t.done ? "text-white/35 line-through" : "bg-violet-400/25"}`}>{t.title}</div>)}
                {ts.length > 2 && <div className="px-1 text-white/45">+{ts.length - 2} more</div>}
              </div>
            );
          })}
        </div>
      </section>

      <div className="space-y-6">
        <form action={addTodo} className="liquid-glass space-y-3 rounded-3xl p-5">
          <h2 className="font-display text-lg font-bold">Add a task</h2>
          <input name="title" required placeholder="What needs doing?" className="field" />
          <label className="block text-xs text-white/55">Due (Kenya time)
            <input name="dueAt" type="datetime-local" className="field mt-1" />
          </label>
          <select name="remind" className="field" defaultValue="">
            <option value="">No email reminder</option>
            <option value="0">Remind me at the due time</option>
            <option value="60">Remind me 1 hour before</option>
            <option value="1440">Remind me 1 day before</option>
          </select>
          <select name="projectId" className="field" defaultValue="">
            <option value="">No project</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <button className="btn-amber rounded-full px-6 py-2.5 text-sm font-semibold text-[#1a0f2e]">Add task</button>
        </form>

        <section className="liquid-glass space-y-1.5 rounded-3xl p-5">
          <h2 className="font-display mb-2 text-lg font-bold">Open tasks</h2>
          {open.length === 0 && <p className="text-sm text-white/55">Nothing open. Add a task above.</p>}
          {[...open.map((t) => ({ t, isDone: false })), ...done.map((t) => ({ t: { ...t, project: null }, isDone: true }))].map(({ t, isDone }) => (
            <div key={t.id} className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 text-sm">
              <form action={toggleTodo}>
                <input type="hidden" name="id" value={t.id} />
                <input type="hidden" name="done" value={String(!isDone)} />
                <button aria-label={isDone ? "Reopen task" : "Mark done"} className={`grid h-5 w-5 place-items-center rounded-full border ${isDone ? "border-amber-300 bg-amber-300 text-black" : "border-white/30"}`}>
                  {isDone && <Check size={12} />}
                </button>
              </form>
              <div className="min-w-0 flex-1">
                <div className={`truncate ${isDone ? "text-white/40 line-through" : ""}`}>{t.title}</div>
                <div className={`text-xs ${!isDone && t.dueAt && t.dueAt < now ? "text-rose-300" : "text-white/45"}`}>
                  {[t.dueAt && fmt(t.dueAt), t.project?.name, t.remindAt && !t.remindedAt && !isDone ? "reminder set" : null].filter(Boolean).join(" · ") || "No due date"}
                </div>
              </div>
              <form action={deleteTodo}>
                <input type="hidden" name="id" value={t.id} />
                <button aria-label="Delete task" className="text-white/40 hover:text-rose-300"><Trash2 size={14} /></button>
              </form>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
