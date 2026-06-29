"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, Globe, Clock, Check, ArrowRight, Lock, ChevronDown } from "lucide-react";
import { SERVICES } from "@/lib/data";

export default function ContactPageClient() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", budget: "", message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const valid = form.name.trim().length > 0 && form.message.trim().length > 0;

  const handleSubmit = async () => {
    if (!valid) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
  };

  return (
    <section className="relative z-10 px-6 lg:px-12 pb-28">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Left: info ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Contact details */}
            <div
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h3 className="font-bold text-sm mb-5" style={{ color: "rgba(255,255,255,0.85)" }}>
                Contact details
              </h3>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: "Phone / WhatsApp", value: "0743 942 007", href: "tel:0743942007", color: "#3C50E0" },
                  { icon: Mail,  label: "Email",             value: "blisskdevelopers@gmail.com",  href: null,             color: "#3C50E0" },
                  { icon: Globe, label: "Website",            value: "blissandk.dev (coming soon)", href: null, color: "#22AD5C" },
                ].map(({ icon: Icon, label, value, href, color }, i) => (
                  <div key={i} className="flex gap-3.5 items-start">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${color}18` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.28)" }}>
                        {label}
                      </p>
                      {href ? (
                        <a href={href} className="text-sm font-semibold hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.82)" }}>
                          {value}
                        </a>
                      ) : (
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <Clock className="w-4 h-4" style={{ color: "#a5b4fc" }} />
                <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.82)" }}>Business hours</span>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "rgba(255,255,255,0.38)" }}>Monday – Saturday</span>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>8am – 8pm EAT</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "rgba(255,255,255,0.38)" }}>Sunday</span>
                  <span style={{ color: "rgba(255,255,255,0.38)" }}>By appointment</span>
                </div>
              </div>
              <div
                className="mt-4 px-3.5 py-2.5 rounded-xl flex items-center gap-2"
                style={{ background: "rgba(34,173,92,0.08)", border: "1px solid rgba(34,173,92,0.2)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "#22AD5C", boxShadow: "0 0 6px #22AD5C" }}
                />
                <p className="text-xs font-medium" style={{ color: "#4ade80" }}>
                  Typically respond in 2–4 hours
                </p>
              </div>
            </div>

            {/* NDA note */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)" }}
            >
              <div className="flex gap-2.5 items-start text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                <Lock className="w-3.5 h-3.5 mt-0.5 text-indigo-400 shrink-0" />
                <p>
                  <span className="font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Confidentiality guaranteed.
                  </span>{" "}
                  We're happy to sign an NDA before discussing sensitive details. Just ask.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl p-8"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center py-10"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(34,173,92,0.12)", border: "1px solid rgba(34,173,92,0.3)" }}
                  >
                    <Check className="w-8 h-8" style={{ color: "#22AD5C" }} />
                  </div>
                  <h3 className="font-bold text-xl mb-3" style={{ color: "rgba(255,255,255,0.95)" }}>
                    Message received!
                  </h3>
                  <p className="text-sm leading-relaxed mb-6 max-w-xs mx-auto" style={{ color: "rgba(255,255,255,0.42)" }}>
                    We'll review your project and reply within a few hours. You can also reach us directly on{" "}
                    <a href="tel:0743942007" className="font-semibold" style={{ color: "#a5b4fc" }}>
                      0743 942 007
                    </a>.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
                    }}
                    className="text-xs transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    ← Send another message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-bold text-lg mb-7" style={{ color: "rgba(255,255,255,0.9)" }}>
                    Tell us about your project
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[11px] font-semibold text-white/45 mb-2 uppercase tracking-widest">Your name *</label>
                      <input
                        type="text"
                        placeholder="Wanjiku Kamau"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/10 focus:border-[#3C50E0]/60 focus:bg-[#3C50E0]/5 rounded-xl px-4 py-3 text-sm text-white/90 outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-white/45 mb-2 uppercase tracking-widest">Email</label>
                        <input
                          type="email"
                          placeholder="hello@company.co.ke"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-white/[0.04] border border-white/10 focus:border-[#3C50E0]/60 focus:bg-[#3C50E0]/5 rounded-xl px-4 py-3 text-sm text-white/90 outline-none transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-white/45 mb-2 uppercase tracking-widest">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          placeholder="0712 345 678"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-white/[0.04] border border-white/10 focus:border-[#3C50E0]/60 focus:bg-[#3C50E0]/5 rounded-xl px-4 py-3 text-sm text-white/90 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-white/45 mb-2 uppercase tracking-widest">Service needed</label>
                        <div className="relative">
                          <select
                            value={form.service}
                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                            className="w-full bg-white/[0.04] border border-white/10 focus:border-[#3C50E0]/60 focus:bg-[#3C50E0]/5 rounded-xl px-4 py-3 text-sm text-white/90 outline-none transition-all duration-200 appearance-none cursor-pointer"
                          >
                            <option value="" style={{ background: "#0a0c14" }}>Select a service…</option>
                            {SERVICES.map((s) => (
                              <option key={s.title} value={s.title} style={{ background: "#0a0c14" }}>
                                {s.title}
                              </option>
                            ))}
                            <option value="Other" style={{ background: "#0a0c14" }}>Other / Not sure yet</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-white/45 mb-2 uppercase tracking-widest">Budget range</label>
                        <div className="relative">
                          <select
                            value={form.budget}
                            onChange={(e) => setForm({ ...form, budget: e.target.value })}
                            className="w-full bg-white/[0.04] border border-white/10 focus:border-[#3C50E0]/60 focus:bg-[#3C50E0]/5 rounded-xl px-4 py-3 text-sm text-white/90 outline-none transition-all duration-200 appearance-none cursor-pointer"
                          >
                            <option value="" style={{ background: "#0a0c14" }}>Select range…</option>
                            {[
                              "Below KES 20,000",
                              "KES 20,000 – 50,000",
                              "KES 50,000 – 100,000",
                              "KES 100,000 – 250,000",
                              "KES 250,000+",
                              "Flexible / Not sure",
                            ].map((b) => (
                              <option key={b} value={b} style={{ background: "#0a0c14" }}>{b}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-white/45 mb-2 uppercase tracking-widest">Project details *</label>
                      <textarea
                        placeholder="Describe what you need — goals, features, timeline, any technical requirements…"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        className="w-full bg-white/[0.04] border border-white/10 focus:border-[#3C50E0]/60 focus:bg-[#3C50E0]/5 rounded-xl px-4 py-3 text-sm text-white/90 outline-none transition-all duration-200 resize-vertical"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={!valid || loading}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                      style={{
                        background: valid
                          ? "linear-gradient(135deg,#3C50E0,#7C3AED)"
                          : "rgba(255,255,255,0.07)",
                      }}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending…
                        </span>
                      ) : (
                        <>
                          Send message
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.28)" }}>
                      Or WhatsApp:{" "}
                      <a href="tel:0743942007" className="font-semibold hover:text-white transition-colors" style={{ color: "#a5b4fc" }}>
                        0743 942 007
                      </a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
