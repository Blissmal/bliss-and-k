import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Assistant from "./Assistant";

export default async function AssistantPage() {
  await requireAdmin();
  const projects = await db.project.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } });
  return <Assistant projects={projects} />;
}
