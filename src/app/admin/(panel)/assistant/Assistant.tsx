"use client";

import { useState, useTransition } from "react";
import { Sparkles, X } from "lucide-react";
import { addPlannedTasks, planTasks, summariseWeek } from "./actions";

type Task = { title: string; dayOffset: number };

export default function Assistant({ projects }: { projects: { id: string; name: string }[] }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [brief, setBrief] = useState("");
  const [date, setDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notice, setNotice] = useState("");

  const run = (fn: () => Promise<void>) => {
    setError("");
    setNotice("");
    start(fn);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none tracking-[-0.04em]">Assistant</h1>
      {error && <p role="alert" className="rounded-xl bg-rose-500/15 px-4 py-2 text-sm text-rose-200">{error}</p>}

      <section className="liquid-glass space-y-3 rounded-[2rem] p-5">
        <h2 className="font-display text-lg font-bold">Weekly briefing</h2>
        <p className="text-sm text-white/55">Summarises overdue and upcoming tasks and suggests priorities.</p>
        <button disabled={pending} onClick={() => run(async () => { const r = await summariseWeek(); r.ok ? setSummary(r.data) : setError(r.error); })} className="btn-amber flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#1a0f2e] disabled:opacity-60">
          <Sparkles size={15} /> {pending ? "Working…" : "Summarise my week"}
        </button>
        {summary && <p className="whitespace-pre-wrap rounded-2xl bg-white/5 p-4 text-sm leading-relaxed">{summary}</p>}
      </section>

      <section className="liquid-glass space-y-3 rounded-[2rem] p-5">
        <h2 className="font-display text-lg font-bold">Plan a project</h2>
        <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={4} placeholder="Describe the project: scope, features, integrations, deadline." className="field" />
        <div className="flex flex-wrap gap-3">
          <label className="text-xs text-white/55">Start date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field mt-1" /></label>
          <label className="text-xs text-white/55">Project<select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="field mt-1"><option value="">No project</option>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
        </div>
        <button disabled={pending} onClick={() => run(async () => { const r = await planTasks(brief, date); r.ok ? setTasks(r.data) : setError(r.error); })} className="liquid-glass rounded-full px-5 py-2.5 text-sm font-medium disabled:opacity-60">
          {pending ? "Working…" : "Draft a plan"}
        </button>
        {tasks.length > 0 && (
          <div className="space-y-1.5">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 text-sm">
                <span className="w-14 shrink-0 text-xs text-white/45">Day {t.dayOffset}</span>
                <span className="min-w-0 flex-1 truncate">{t.title}</span>
                <button aria-label="Remove task" onClick={() => setTasks((xs) => xs.filter((_, j) => j !== i))} className="text-white/45 hover:text-rose-300"><X size={14} /></button>
              </div>
            ))}
            <button disabled={pending} onClick={() => run(async () => { const r = await addPlannedTasks(tasks, date, projectId); if (r.ok) { setNotice(`Added ${r.data} tasks to your calendar.`); setTasks([]); } else setError(r.error); })} className="btn-amber rounded-full px-5 py-2.5 text-sm font-semibold text-[#1a0f2e] disabled:opacity-60">
              Add {tasks.length} tasks
            </button>
          </div>
        )}
        {notice && <p className="text-sm text-amber-200">{notice}</p>}
      </section>
    </div>
  );
}
