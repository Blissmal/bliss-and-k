"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function HideOnAdmin({ children }: { children: ReactNode }) {
  return usePathname().startsWith("/admin") ? null : <>{children}</>;
}
