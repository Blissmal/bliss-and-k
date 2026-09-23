/* eslint-disable @typescript-eslint/no-explicit-any */
// In-memory stand-in for the Prisma client, seeded from data/sample.json.
// Supports only the query shapes the admin uses. Changes reset when the dev server restarts.
import seed from "../../data/sample.json";

type Row = Record<string, any>;
type Tables = Record<"project" | "apiKey" | "todo", Row[]>;
type Args = { where?: Row; orderBy?: any; take?: number; include?: Row; select?: Row; data?: Row };

const HOUR = 3600e3;
const REL: Record<string, Record<string, [string, "one" | "many", string]>> = {
  project: { keys: ["apiKey", "many", "projectId"], todos: ["todo", "many", "projectId"] },
  todo: { project: ["project", "one", "projectId"] },
  apiKey: { project: ["project", "one", "projectId"] },
};
const DEFAULTS: Record<string, Row> = {
  project: { client: null, url: null, status: "live" },
  apiKey: {},
  todo: { done: false, dueAt: null, remindAt: null, remindedAt: null, projectId: null },
};

function load(): Tables {
  const now = Date.now();
  const t = structuredClone(seed) as any;
  t.project.forEach((r: Row, i: number) => Object.assign(r, { client: null, url: null, ...r, createdAt: new Date(now - (i + 5) * 24 * HOUR) }));
  t.apiKey.forEach((r: Row) => (r.createdAt = new Date(now - 3 * 24 * HOUR)));
  t.todo.forEach((r: Row, i: number) => {
    const at = (k: string) => (r[k] == null ? null : new Date(now + r[k] * HOUR));
    Object.assign(r, { dueAt: at("dueOffsetHours"), remindAt: at("remindOffsetHours"), remindedAt: null, createdAt: new Date(now - (i + 1) * HOUR) });
    delete r.dueOffsetHours;
    delete r.remindOffsetHours;
    r.done ??= false;
    r.projectId ??= null;
  });
  return t;
}

const g = globalThis as unknown as { __sample?: Tables };
const tables = () => (g.__sample ??= load());
const val = (v: any) => (v instanceof Date ? v.getTime() : v);

function match(row: Row, where: Row = {}): boolean {
  return Object.entries(where).every(([k, w]) => {
    if (k === "OR") return (w as Row[]).some((c) => match(row, c));
    const v = row[k];
    if (w && typeof w === "object" && !(w instanceof Date)) {
      return Object.entries(w).every(([op, x]: [string, any]) => {
        if (v == null) return op === "equals" && x == null;
        const a = val(v), b = val(x);
        return op === "lte" ? a <= b : op === "lt" ? a < b : op === "gte" ? a >= b : op === "gt" ? a > b : op === "not" ? a !== b : a === b;
      });
    }
    return (v ?? null) === (w ?? null);
  });
}

function sort(rows: Row[], orderBy: any) {
  const specs = ([] as any[]).concat(orderBy ?? []).flatMap((o) => Object.entries(o));
  return [...rows].sort((r1, r2) => {
    for (const [k, d] of specs) {
      const dir = typeof d === "string" ? d : (d as { sort: string }).sort;
      const nulls = typeof d === "string" ? "last" : (d as { nulls?: "first" | "last" }).nulls ?? "last";
      const a = r1[k], b = r2[k];
      if (a == null || b == null) {
        if (a == b) continue;
        return (a == null ? 1 : -1) * (nulls === "last" ? 1 : -1);
      }
      const c = typeof a === "string" ? a.localeCompare(b) : val(a) - val(b);
      if (c) return dir === "desc" ? -c : c;
    }
    return 0;
  });
}

function shape(name: string, row: Row, args: Args): Row {
  let out: Row = { ...row };
  for (const [rel, opts] of Object.entries(args.include ?? {})) {
    const [table, kind, fk] = REL[name][rel];
    out[rel] =
      kind === "one"
        ? tables()[table as keyof Tables].find((r) => r.id === row[fk]) ?? null
        : many(table, { where: { [fk]: row.id }, ...(opts === true ? {} : (opts as Args)) });
  }
  if (args.select) out = Object.fromEntries(Object.keys(args.select).filter((k) => args.select![k]).map((k) => [k, out[k]]));
  return out;
}

function many(name: string, args: Args = {}): Row[] {
  let rows = sort(tables()[name as keyof Tables].filter((r) => match(r, args.where)), args.orderBy);
  if (args.take) rows = rows.slice(0, args.take);
  return rows.map((r) => shape(name, r, args));
}

const uid = () => `s_${Math.random().toString(36).slice(2, 10)}`;

function model(name: keyof Tables) {
  const add = (data: Row) => {
    const row = { ...DEFAULTS[name], ...data, id: uid(), createdAt: new Date() };
    tables()[name].push(row);
    return row;
  };
  const find = (where?: Row) => tables()[name].find((r) => match(r, where));
  return {
    findMany: async (args?: Args) => many(name, args),
    findUnique: async (args: Args) => {
      const r = find(args.where);
      return r ? shape(name, r, args) : null;
    },
    create: async ({ data }: Args) => add(data!),
    createMany: async ({ data }: { data: Row[] }) => (data.forEach(add), { count: data.length }),
    update: async ({ where, data }: Args) => {
      const r = find(where);
      if (!r) throw new Error("Record not found");
      return Object.assign(r, data);
    },
    delete: async ({ where }: Args) => {
      const t = tables();
      const r = find(where);
      if (!r) throw new Error("Record not found");
      t[name] = t[name].filter((x) => x !== r);
      if (name === "project") {
        t.apiKey = t.apiKey.filter((k) => k.projectId !== r.id);
        t.todo.forEach((x) => { if (x.projectId === r.id) x.projectId = null; });
      }
      return r;
    },
  };
}

export const sampleDb = { project: model("project"), apiKey: model("apiKey"), todo: model("todo") };
