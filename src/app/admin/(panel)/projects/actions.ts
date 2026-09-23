"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { decrypt, encrypt } from "@/lib/crypto";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const refresh = () => revalidatePath("/admin/projects");

export async function addProject(fd: FormData) {
  await requireAdmin();
  const name = str(fd, "name");
  if (!name) return;
  await db.project.create({
    data: { name, client: str(fd, "client") || null, url: str(fd, "url") || null, status: str(fd, "status") || "live" },
  });
  refresh();
}

export async function deleteProject(fd: FormData) {
  await requireAdmin();
  await db.project.delete({ where: { id: str(fd, "id") } });
  refresh();
}

export async function addKey(fd: FormData) {
  await requireAdmin();
  const secret = str(fd, "secret");
  const label = str(fd, "label");
  if (!secret || !label) return;
  await db.apiKey.create({
    data: { projectId: str(fd, "projectId"), label, secret: encrypt(secret), last4: secret.slice(-4) },
  });
  refresh();
}

export async function deleteKey(fd: FormData) {
  await requireAdmin();
  await db.apiKey.delete({ where: { id: str(fd, "id") } });
  refresh();
}

export async function revealKey(id: string) {
  await requireAdmin();
  const k = await db.apiKey.findUnique({ where: { id } });
  return k ? decrypt(k.secret) : null;
}
