"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Mail, Phone, Send, XCircle } from "lucide-react";
import { LinkedinIcon } from "@/components/BrandIcons";
import { brand } from "@/lib/content";
import SectionGlow from "@/components/sections/SectionGlow";
import CompanyDetails from "@/components/sections/CompanyDetails";
import SectionHeader from "@/components/sections/SectionHeader";
import Reveal from "@/components/motion/Reveal";

const subjects = ["A process to automate", "Our products", "Partnership or investment", "Careers", "Something else"];

const nextSteps = [
  { title: "It reaches the founders", detail: "No ticket queue. Your message goes straight to the people who build the product." },
  { title: "We reply personally", detail: "With straight answers to your questions, not a brochure." },
  { title: "If it fits, we map it together", detail: "A working session on how the process runs today, and what the system should look like." },
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

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", subject: subjects[0], message: "" });
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
      setForm({ name: "", email: "", company: "", phone: "", subject: subjects[0], message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const iconBox = (Icon: React.ComponentType<{ size?: number }>) => (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
      style={{ background: "linear-gradient(150deg, var(--accent-soft), transparent)", border: "1px solid var(--glass-border)", color: "var(--accent)" }}
    >
      <Icon size={18} />
    </div>
  );
  const smallLabel = (text: string) => (
    <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
      {text}
    </p>
  );
  const linkCards = [
    { icon: Mail, label: "Email", value: brand.email, href: `mailto:${brand.email}` },
    { icon: LinkedinIcon, label: "LinkedIn", value: "Zetta Metrics", href: brand.linkedin },
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
                Tell us how the work runs <span className="gradient-text">today.</span>
              </>
            }
            description="A process you want automated, a question about our products, or a partnership. Tell us what you need and we'll get back to you personally."
          />

          <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal delay={0.08} className="h-full min-w-0">
              <div className="flex h-full flex-col gap-4">
                {linkCards.map(({ icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group surface-card hover-card flex flex-1 items-center gap-4 p-6"
                  >
                    {iconBox(icon)}
                    <div className="min-w-0 flex-1">
                      {smallLabel(label)}
                      <p className="mt-1 text-base font-semibold [overflow-wrap:anywhere]" style={{ color: "var(--text-primary)" }}>
                        {value}
                      </p>
                    </div>
                    <ArrowUpRight size={17} className="shrink-0 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" style={{ color: "var(--accent)" }} />
                  </a>
                ))}
                <div className="surface-card flex flex-1 items-center gap-4 p-6">
                  {iconBox(Phone)}
                  <div className="min-w-0 flex-1">
                    {smallLabel("Phone")}
                    <div className="mt-1 flex flex-col gap-0.5">
                      {brand.phones.map((p) => (
                        <a
                          key={p}
                          href={`tel:+91${p}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex w-fit items-center gap-1.5 text-base font-semibold transition-colors hover:text-[var(--accent)]"
                          style={{ color: "var(--text-primary)" }}
                        >
                          +91 {p}
                          <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "var(--accent)" }} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="h-full min-w-0">
              <form onSubmit={submit} className="glass-panel h-full space-y-5 p-7 sm:p-9">
                <div>
                  <h2 className="font-display text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    Send a message
                  </h2>
                  <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                    It goes straight to our inbox. A few lines are enough to start.
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

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Organisation">
                    <input className="field" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Optional" autoComplete="organization" />
                  </Field>
                  <Field label="Contact number">
                    <input type="tel" className="field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Optional" autoComplete="tel" />
                  </Field>
                </div>

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
                  <textarea required rows={5} className="field" style={{ resize: "vertical" }} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What does the process look like today, and what should change?" />
                </Field>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full py-4 text-sm disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-7"
                >
                  {status === "sending" ? (
                    <>
                      Sending <Loader2 size={15} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send message <Send size={15} />
                    </>
                  )}
                </button>

                {status === "sent" && (
                  <p className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--accent)" }}>
                    <CheckCircle2 size={16} /> Message sent. We&apos;ll be in touch soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-start gap-2 text-sm font-medium" style={{ color: "#e0554f" }}>
                    <XCircle size={16} className="mt-0.5 shrink-0" />
                    {errorMessage || "Something went wrong. Please try again, or email us directly at "}
                    {!errorMessage && (
                      <a href={`mailto:${brand.email}`} target="_blank" rel="noopener noreferrer" className="underline">
                        {brand.email}
                      </a>
                    )}
                  </p>
                )}
              </form>
            </Reveal>
          </div>

          <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-2">
            <Reveal delay={0.1} className="h-full min-w-0">
              <CompanyDetails title="Registered company" className="h-full" />
            </Reveal>
            <Reveal delay={0.1} className="h-full min-w-0">
              <div className="surface-card h-full p-7">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                  What happens next
                </p>
                <ol className="mt-6 space-y-6">
                  {nextSteps.map((st, i) => (
                    <li key={st.title} className="flex gap-4">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-xs font-extrabold"
                        style={{ background: "linear-gradient(150deg, var(--accent-strong), var(--accent))", color: "var(--text-on-accent)" }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>
                          {st.title}
                        </p>
                        <p className="mt-1 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                          {st.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
