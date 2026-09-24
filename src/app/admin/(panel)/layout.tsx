import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { COOKIE, requireAdmin } from "@/lib/auth";
import { LogoIcon } from "@/components/ui/Logo";
import AdminNav from "@/components/admin/AdminNav";

async function signOut() {
  "use server";
  (await cookies()).delete(COOKIE);
  redirect("/admin/login");
}

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="relative z-10 flex min-h-screen flex-col gap-4 p-4 md:flex-row">
      <aside className="biz-card flex shrink-0 flex-col gap-5 rounded-[2rem] p-4 print:hidden md:sticky md:top-4 md:h-[calc(100vh-2rem)] md:w-64">
        <Link href="/admin/overview" className="flex items-center gap-2.5 px-2 pt-1">
          <LogoIcon className="h-8 w-8" />
          <span className="font-display font-bold">Bliss &amp; K admin</span>
        </Link>
        <AdminNav />
        <form action={signOut} className="md:mt-auto">
          <button className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm text-white/60 hover:bg-white/10 hover:text-white">
            <LogOut size={16} aria-hidden="true" /> Sign out
          </button>
        </form>
      </aside>
      <main className="min-w-0 flex-1 md:py-2 md:pr-2 print:p-0">{children}</main>
    </div>
  );
}
