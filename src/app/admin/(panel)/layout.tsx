import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarDays, FileText, FolderKey, LogOut, Sparkles } from "lucide-react";
import { COOKIE, requireAdmin } from "@/lib/auth";

async function signOut() {
  "use server";
  (await cookies()).delete(COOKIE);
  redirect("/admin/login");
}

const NAV = [
  { href: "/admin/projects", label: "Projects & keys", Icon: FolderKey },
  { href: "/admin/tasks", label: "Tasks & calendar", Icon: CalendarDays },
  { href: "/admin/assistant", label: "Assistant", Icon: Sparkles },
  { href: "/admin/quotes", label: "Quotations", Icon: FileText },
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="relative z-10 flex min-h-screen">
      <aside className="liquid-glass sticky top-4 m-4 flex h-[calc(100vh-2rem)] w-60 shrink-0 flex-col gap-1 rounded-3xl p-4 print:hidden max-md:hidden">
        <div className="font-display mb-4 px-3 text-lg font-bold">Bliss &amp; K admin</div>
        {NAV.map(({ href, label, Icon }) => (
          <Link key={href} href={href} className="drop-water flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white">
            <Icon size={16} />
            <span className="drop-label inline-block">{label}</span>
          </Link>
        ))}
        <form action={signOut} className="mt-auto">
          <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/55 hover:bg-white/10 hover:text-white">
            <LogOut size={16} /> Sign out
          </button>
        </form>
      </aside>
      <main className="min-w-0 flex-1 p-4 md:py-4 md:pr-6 print:p-0">{children}</main>
    </div>
  );
}
