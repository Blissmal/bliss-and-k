"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarDays, FileText, FolderKey, LayoutDashboard, Sparkles } from "lucide-react";

const NAV = [
  { href: "/admin/overview", label: "Overview", Icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects & keys", Icon: FolderKey },
  { href: "/admin/tasks", label: "Tasks & calendar", Icon: CalendarDays },
  { href: "/admin/assistant", label: "Assistant", Icon: Sparkles },
  { href: "/admin/quotes", label: "Quotations", Icon: FileText },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
      {NAV.map(({ href, label, Icon }) => {
        const on = path === href || path.startsWith(href + "/");
        return (
          <Link key={href} href={href} className="drop-water relative flex shrink-0 items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium">
            {on && (
              <motion.span layoutId="admin-drop" className="drop-bead absolute inset-0 rounded-2xl" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
            <Icon size={16} aria-hidden="true" className={`relative z-10 ${on ? "text-white" : "text-white/60"}`} />
            <span className={`drop-label relative z-10 whitespace-nowrap ${on ? "text-white" : "text-white/65"}`}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
