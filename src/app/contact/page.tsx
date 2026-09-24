"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, Phone, Send } from "lucide-react";
import { LinkedinIcon } from "@/components/BrandIcons";
import { brand } from "@/lib/content";
import SectionGlow from "@/components/sections/SectionGlow";
import SectionHeader from "@/components/sections/SectionHeader";
import Reveal from "@/components/motion/Reveal";

const subjects = ["Product inquiry", "Partnership or investment", "Careers", "General inquiry"];

const nextSteps = [
  { title: "Your message reaches the founders", detail: "No ticket queue — it goes straight to the people who build the product." },
  { title: "We reply personally", detail: "With real answers to your questions, not a canned brochure." },
  { title: "If it's a fit, we map it together", detail: "A working session on how your process runs today and what the system would look like." },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: subjects[0], message: "" });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = [`Name: ${form.name}`, `Email: ${form.email}`, `Company: ${form.company || "Not provided"}`, "", form.message].join("\n");
    const mailto = `mailto:${brand.email}?subject=${encodeURIComponent(`Zetta Metrics — ${form.subject}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const contactLinks = [
    { icon: Mail, label: "Email", value: brand.email, href: `mailto:${brand.email}` },
    { icon: LinkedinIcon, label: "LinkedIn", value: "Shailesh Gupta", href: brand.linkedin },
    ...brand.phones.map((p) => ({ icon: Phone, label: "Phone", value: `+91 ${p}`, href: `tel:+91${p}` })),
  ];

  return (
    <div>
      <section className="relative overflow-hidden pt-40 pb-24 md:pt-48">
        <SectionGlow
          blobs={[
            { size: 520, top: "-10%", left: "-10%", color: "primary" },
            { size: 380, top: "20%", right: "-10%", color: "secondary", delay: 5 },
          ]}
        />
        <div className="container-custom">
          <SectionHeader
            as="h1"
            eyebrow="Contact"
            title={
              <>
                Let&apos;s talk about <span className="gradient-text">your workflow.</span>
              </>
            }
            description="Whether it's a product inquiry, a partnership, or investment — tell us what you need and we'll get back to you."
          />

          <div className="mt-14 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-8">
              <Reveal delay={0.06}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {contactLinks.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={`${label}-${value}`}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group surface-card hover-card flex items-center gap-4 p-5"
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: "linear-gradient(150deg, var(--accent-soft), transparent)", border: "1px solid var(--glass-border)", color: "var(--accent)" }}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
                          {label}
                        </p>
                        <p className="mt-0.5 truncate text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          {value}
                        </p>
                      </div>
                      <ArrowUpRight size={16} className="shrink-0 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" style={{ color: "var(--accent)" }} />
                    </a>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <p className="eyebrow mb-5">What happens next</p>
                  <ol className="relative space-y-6 border-l pl-6" style={{ borderColor: "var(--border-strong)" }}>
                    {nextSteps.map((s, i) => (
                      <li key={s.title} className="relative">
                        <span
                          className="absolute -left-[37px] flex h-6 w-6 items-center justify-center rounded-full font-display text-[0.7rem] font-extrabold"
                          style={{ background: "linear-gradient(150deg, var(--accent-strong), var(--accent))", color: "var(--text-on-accent)", boxShadow: "0 0 0 4px var(--bg-base)" }}
                        >
                          {i + 1}
                        </span>
                        <p className="font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>
                          {s.title}
                        </p>
                        <p className="text-pretty mt-1 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                          {s.detail}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <form onSubmit={submit} className="glass-panel space-y-5 p-7 sm:p-9">
                <div>
                  <h2 className="font-display text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    Send us a message
                  </h2>
                  <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                    Opens in your email app, ready to send.
                  </p>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Your name">
                    <input required className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" autoComplete="name" />
                  </Field>
                  <Field label="Email">
                    <input required type="email" className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" autoComplete="email" />
                  </Field>
                </div>

                <Field label="Company / organization">
                  <input className="field" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Optional" autoComplete="organization" />
                </Field>

                <fieldset>
                  <legend className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
                    What&apos;s this about?
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((s) => {
                      const selected = form.subject === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setForm({ ...form, subject: s })}
                          className="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                          style={{
                            borderColor: selected ? "var(--accent)" : "var(--border-subtle)",
                            background: selected ? "var(--accent-soft)" : "var(--bg-elevated)",
                            color: selected ? "var(--text-primary)" : "var(--text-secondary)",
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <Field label="Message">
                  <textarea required rows={5} className="field" style={{ resize: "vertical" }} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us a bit about what you need..." />
                </Field>

                <button type="submit" className="btn-primary w-full py-4 text-sm sm:w-auto sm:px-7">
                  Send message <Send size={15} />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
