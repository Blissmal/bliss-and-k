import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { addKey, addProject, deleteProject } from "./actions";
import KeyRow from "./KeyRow";

export default async function ProjectsPage() {
  await requireAdmin();
  const projects = await db.project.findMany({ orderBy: { createdAt: "desc" }, include: { keys: { orderBy: { createdAt: "asc" } } } });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Projects &amp; API keys</h1>

      <form action={addProject} className="liquid-glass grid gap-3 rounded-3xl p-5 sm:grid-cols-2">
        <input name="name" required placeholder="Project name" className="field" />
        <input name="client" placeholder="Client" className="field" />
        <input name="url" placeholder="Live URL" className="field" />
        <select name="status" className="field">
          <option value="live">Live</option>
          <option value="building">In development</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <button className="btn-amber rounded-full px-6 py-2.5 text-sm font-semibold text-[#1a0f2e] sm:col-span-2 sm:justify-self-start">Add project</button>
      </form>

      {projects.length === 0 && <p className="text-white/55">No projects yet. Add your first one above.</p>}

      {projects.map((p) => (
        <section key={p.id} className="liquid-glass space-y-3 rounded-3xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold">{p.name}</h2>
              <p className="text-sm text-white/55">
                {[p.client, p.status].filter(Boolean).join(" · ")}
                {p.url && <> · <a href={p.url} target="_blank" rel="noreferrer" className="underline decoration-white/30 hover:text-white">{p.url}</a></>}
              </p>
            </div>
            <form action={deleteProject}>
              <input type="hidden" name="id" value={p.id} />
              <button className="text-sm text-white/45 hover:text-rose-300">Delete project</button>
            </form>
          </div>
          {p.keys.map((k) => <KeyRow key={k.id} id={k.id} label={k.label} last4={k.last4} />)}
          <form action={addKey} className="flex flex-wrap gap-2">
            <input type="hidden" name="projectId" value={p.id} />
            <input name="label" required placeholder="Key label (e.g. Resend)" className="field !w-44" />
            <input name="secret" required type="password" autoComplete="off" placeholder="Key value" className="field !w-auto min-w-0 flex-1" />
            <button className="liquid-glass rounded-full px-5 py-2 text-sm font-medium">Save key</button>
          </form>
        </section>
      ))}
    </div>
  );
}
