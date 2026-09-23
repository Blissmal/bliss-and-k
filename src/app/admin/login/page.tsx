import { redirect } from "next/navigation";
import { login } from "@/lib/auth";

async function signIn(fd: FormData) {
  "use server";
  redirect((await login(String(fd.get("password") ?? ""))) ? "/admin/projects" : "/admin/login?error=1");
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="relative z-10 grid min-h-screen place-items-center px-4">
      <form action={signIn} className="liquid-glass w-full max-w-sm space-y-4 rounded-3xl p-8">
        <h1 className="font-display text-2xl font-bold">Admin sign in</h1>
        <input name="password" type="password" required autoFocus placeholder="Password" className="field" />
        {error && <p className="text-sm text-rose-300">Wrong password. Try again.</p>}
        <button className="btn-amber w-full rounded-full px-6 py-3 text-sm font-semibold text-[#1a0f2e]">Sign in</button>
      </form>
    </div>
  );
}
