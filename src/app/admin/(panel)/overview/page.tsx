import { db } from "@/lib/db";
import GlassLink from "@/components/fx/GlassLink";

const fmt = (d: Date) => d.toLocaleString("en-KE", { timeZone: "Africa/Nairobi", weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
const STATUS: Record<string, string> = { live: "Live", building: "In development", maintenance: "Maintenance" };

export default async function OverviewPage() {
  const now = new Date();
  const [projects, open] = await Promise.all([
    db.project.findMany({ orderBy: { createdAt: "desc" }, include: { keys: true } }),
    db.todo.findMany({ where: { done: false }, orderBy: { dueAt: { sort: "asc", nulls: "last" } }, include: { project: true } }),
  ]);
  const overdue = open.filter((t) => t.dueAt && t.dueAt < now).length;
  const week = open.filter((t) => t.dueAt && t.dueAt >= now && t.dueAt.getTime() <= now.getTime() + 7 * 864e5).length;
  const hour = Number(new Intl.DateTimeFormat("en-KE", { timeZone: "Africa/Nairobi", hour: "numeric", hour12: false }).format(now)) % 24;
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const tiles = [
    { label: "Projects", value: projects.length },
    { label: "API keys stored", value: projects.reduce((n, p) => n + p.keys.length, 0) },
    { label: "Due in 7 days", value: week },
    { label: "Overdue", value: overdue, hot: true },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <header className="pb-6">
        <p className="text-white/60">{now.toLocaleDateString("en-KE", { timeZone: "Africa/Nairobi", dateStyle: "full" })}</p>
        <h1 className="font-display mt-2 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none tracking-[-0.04em]">
          {greeting}, {process.env.ADMIN_NAME ?? "there"}.
        </h1>
        <div className="mt-6 flex flex-wrap gap-3">
          <GlassLink href="/admin/assistant" variant="solid">Ask the assistant</GlassLink>
          <GlassLink href="/admin/tasks">Add a task</GlassLink>
          <GlassLink href="/admin/quotes">Draft a quotation</GlassLink>
          <GlassLink href="/admin/projects">Add a project</GlassLink>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className={`rounded-[2rem] p-6 ${t.hot ? "btn-amber text-[#1a0f2e]" : "liquid-glass"}`}>
            <p className={`text-sm ${t.hot ? "text-[#1a0f2e]/70" : "text-white/65"}`}>{t.label}</p>
            <p className="mt-4 text-7xl font-extralight leading-none tracking-[-0.05em]">{t.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <section className="liquid-glass rounded-[2rem] p-6">
          <h2 className="font-display text-2xl font-bold tracking-tight">Up next</h2>
          <ul className="mt-4 divide-y divide-white/10">
            {open.slice(0, 7).map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-4 py-3">
                <span className="min-w-0 truncate">{t.title}</span>
                <span className={`shrink-0 text-sm ${t.dueAt && t.dueAt < now ? "text-rose-300" : "text-white/60"}`}>{t.dueAt ? fmt(t.dueAt) : "No due date"}</span>
              </li>
            ))}
            {open.length === 0 && <li className="py-3 text-white/60">Nothing open. Add a task to get started.</li>}
          </ul>
        </section>
        <section className="mist rounded-[2rem] p-6 text-[#1a0f2e]">
          <h2 className="font-display text-2xl font-bold tracking-tight">Projects</h2>
          <ul className="mt-4 divide-y divide-black/10">
            {projects.slice(0, 7).map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                <span className="min-w-0"><span className="block truncate font-medium">{p.name}</span><span className="text-sm text-[#1a0f2e]/60">{STATUS[p.status] ?? p.status}</span></span>
                <span className="shrink-0 text-sm text-[#4932a0]">{p.keys.length} {p.keys.length === 1 ? "key" : "keys"}</span>
              </li>
            ))}
            {projects.length === 0 && <li className="py-3 text-[#1a0f2e]/60">No projects yet.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
