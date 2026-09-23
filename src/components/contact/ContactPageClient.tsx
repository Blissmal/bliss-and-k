"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { SERVICES } from "@/lib/data";

const BUDGETS = ["Below KES 20,000", "KES 20,000 – 50,000", "KES 50,000 – 100,000", "KES 100,000 – 250,000", "KES 250,000+", "Flexible / Not sure"];
const EMPTY = { name: "", email: "", phone: "", service: "", budget: "", message: "" };
const FIELD = "mt-1.5 w-full rounded-2xl border border-[#4932a0]/20 bg-white px-4 py-3 text-[#1a0f2e] outline-none focus:border-[#ff8a36] focus:ring-4 focus:ring-[#ff8a36]/20";

export default function ContactPageClient() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });
  const valid = form.name.trim() !== "" && form.message.trim() !== "";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("We couldn't send your message. Please call or WhatsApp 0743 942 007.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative z-10 px-6 pb-28 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[2fr_3fr]">
        <aside className="biz-card flex flex-col justify-between gap-12 rounded-[2.5rem] p-9 md:p-12">
          <div>
            <p className="text-white/70">Call or WhatsApp</p>
            <a href="tel:0743942007" className="font-display mt-2 block text-4xl font-bold tracking-tight hover:text-amber-200 md:text-5xl">0743 942 007</a>
            <p className="mt-6 text-white/70">Email</p>
            <p className="mt-1 break-all font-semibold">blisskdevelopers@gmail.com</p>
          </div>
          <div className="space-y-3 text-white/80">
            <p className="flex justify-between border-b border-white/15 pb-3"><span>Monday to Saturday</span><span>8am to 8pm EAT</span></p>
            <p className="flex justify-between border-b border-white/15 pb-3"><span>Sunday</span><span>By appointment</span></p>
            <p className="pt-1 text-sm text-white/65">We usually reply in 2 to 4 hours, and we&apos;re happy to sign an NDA before you share sensitive details.</p>
          </div>
        </aside>

        <div className="mist rounded-[2.5rem] p-8 text-[#1a0f2e] md:p-12">
          {sent ? (
            <div role="status" className="py-16 text-center">
              <span className="btn-amber mx-auto grid h-16 w-16 place-items-center rounded-full"><Check aria-hidden="true" /></span>
              <h2 className="font-display mt-6 text-3xl font-bold">Message received</h2>
              <p className="mx-auto mt-3 max-w-sm text-[#1a0f2e]/70">We&apos;ll review your project and reply within a few hours.</p>
              <button onClick={() => { setSent(false); setForm(EMPTY); }} className="mt-6 font-semibold text-[#4932a0] underline underline-offset-4">Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:col-span-2">Tell us about your project</h2>
              <label className="text-sm font-medium">Your name<input required value={form.name} onChange={set("name")} className={FIELD} /></label>
              <label className="text-sm font-medium">Email<input type="email" value={form.email} onChange={set("email")} className={FIELD} /></label>
              <label className="text-sm font-medium">Phone or WhatsApp<input type="tel" value={form.phone} onChange={set("phone")} className={FIELD} /></label>
              <label className="text-sm font-medium">Service
                <select value={form.service} onChange={set("service")} className={FIELD}>
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                  <option value="Other">Other / Not sure yet</option>
                </select>
              </label>
              <label className="text-sm font-medium sm:col-span-2">Budget
                <select value={form.budget} onChange={set("budget")} className={FIELD}>
                  <option value="">Select a range</option>
                  {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </label>
              <label className="text-sm font-medium sm:col-span-2">Project details<textarea required rows={5} value={form.message} onChange={set("message")} className={FIELD} /></label>
              {error && <p role="alert" className="text-sm font-medium text-rose-700 sm:col-span-2">{error}</p>}
              <button disabled={!valid || loading} className="btn-amber rounded-full px-8 py-4 font-semibold text-[#1a0f2e] disabled:opacity-50 sm:col-span-2 sm:justify-self-start">
                {loading ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
