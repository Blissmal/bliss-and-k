import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE = "bk_admin";

const same = (a: string, b: string) => {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};
const token = () => createHmac("sha256", process.env.SESSION_SECRET ?? "").update("bk-admin").digest("hex");

export async function isAdmin() {
  const v = (await cookies()).get(COOKIE)?.value;
  return !!process.env.SESSION_SECRET && !!v && same(v, token());
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function login(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !process.env.SESSION_SECRET || !same(password, expected)) return false;
  (await cookies()).set(COOKIE, token(), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7,
  });
  return true;
}
