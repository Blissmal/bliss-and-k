"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
// Times are entered in Kenyan time (EAT, UTC+3, no daylight saving).
const eat = (v: string) => (v ? new Date(`${v}:00+03:00`) : null);
const refresh = () => revalidatePath("/admin/tasks");

export async function addTodo(fd: FormData) {
  await requireAdmin();
  const title = str(fd, "title");
  if (!title) return;
  const dueAt = eat(str(fd, "dueAt"));
  const before = str(fd, "remind");
  const remindAt = dueAt && before !== "" ? new Date(dueAt.getTime() - Number(before) * 60000) : null;
  await db.todo.create({ data: { title, dueAt, remindAt, projectId: str(fd, "projectId") || null } });
  refresh();
}

export async function toggleTodo(fd: FormData) {
  await requireAdmin();
  await db.todo.update({ where: { id: str(fd, "id") }, data: { done: str(fd, "done") === "true" } });
  refresh();
}

export async function deleteTodo(fd: FormData) {
  await requireAdmin();
  await db.todo.delete({ where: { id: str(fd, "id") } });
  refresh();
}
