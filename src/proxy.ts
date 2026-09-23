import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !req.cookies.get("bk_admin")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
