"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, Mail, Send } from "lucide-react";
import { brand, serviceLines } from "@/lib/content";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

const subjects = [
  "AI assistant / RAG build",
  "AI MVP development",
  "EdTech platform build",
  "Data science consulting",
  "Partnership or collaboration",
  "General inquiry",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: subjects[0],
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "drafted">("idle");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || "Not provided"}`,
      `Budget/timeline: ${form.budget || "Not provided"}`,
      "",
      form.message,
    ].join("\n");
    const mailto = `mailto:${brand.email}?subject=${encodeURIComponent(
      `ZettaMetrics inquiry - ${form.subject}`
    )}&body=${encodeURIComponent(body)}`;
    setStatus("drafted");
    window.location.href = mailto;
  };

  return (
    <div className="site-page">
      <div className="container-custom">
        <section className="page-hero max-w-3xl">
          <p className="eyebrow">Contact</p>
          <h1 className="page-title">Bring the problem. We will shape the product path.</h1>
          <p className="page-copy">
            Share what you want to build, who it is for, and what business outcome
            you need. A focused project note is enough to start the conversation.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-4">
            {[
              [GithubIcon, "GitHub", "github.com/sg2499", brand.github],
              [LinkedinIcon, "LinkedIn", "Shailesh Gupta", brand.linkedin],
              [BookOpen, "Writing", "Prismatic Metrics", brand.blog],
              [Mail, "Email", brand.email, `mailto:${brand.email}`],
            ].map(([Icon, label, value, href]) => {
              const Component = Icon as typeof BookOpen;
              return (
                <a
                  key={label as string}
                  href={href as string}
                  target={(href as string).startsWith("http") ? "_blank" : undefined}
                  rel={(href as string).startsWith("http") ? "noopener noreferrer" : undefined}
                  className="premium-card flex items-center gap-4 p-5"
                >
                  <div className="rounded-lg border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-200">
                    <Component size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{label as string}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{value as string}</p>
                  </div>
                </a>
              );
            })}

            <div className="premium-card">
              <p className="eyebrow">Best fit</p>
              <div className="space-y-3">
                {serviceLines.map((service) => (
                  <div key={service.title} className="flex items-center gap-3 text-sm text-slate-300">
                    <ArrowRight size={14} className="text-cyan-300" />
                    {service.title}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <form onSubmit={submit} className="premium-card space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Your name">
                <input
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="form-field"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="form-field"
                  placeholder="you@company.com"
                />
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Company or project">
                <input
                  value={form.company}
                  onChange={(event) => setForm({ ...form, company: event.target.value })}
                  className="form-field"
                  placeholder="Company, startup, or idea"
                />
              </Field>
              <Field label="Budget / timeline">
                <input
                  value={form.budget}
                  onChange={(event) => setForm({ ...form, budget: event.target.value })}
                  className="form-field"
                  placeholder="Example: 4 weeks, MVP budget"
                />
              </Field>
            </div>

            <Field label="What do you need?">
              <select
                value={form.subject}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
                className="form-field bg-[#061022]"
              >
                {subjects.map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </select>
            </Field>

            <Field label="Project context">
              <textarea
                required
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                rows={7}
                className="form-field resize-none"
                placeholder="Tell me about the users, problem, workflow, data, deadline, and what success looks like."
              />
            </Field>

            {status === "drafted" && (
              <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/8 p-4 text-sm text-cyan-100">
                Your email client should be opening with the project details. Send the draft to complete the inquiry.
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              Open email draft <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
