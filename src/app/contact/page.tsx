"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { brand } from "@/lib/content";

const subjects = [
  "MathPath — product inquiry",
  "School Enrichment — product inquiry",
  "Partnership or investment",
  "Careers",
  "General inquiry",
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: "0.6rem",
  border: "1px solid var(--border-subtle)",
  backgroundColor: "var(--bg-elevated)",
  color: "var(--text-primary)",
  padding: "0.7rem 0.9rem",
  fontSize: "0.875rem",
  outline: "none",
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: subjects[0],
    message: "",
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || "Not provided"}`,
      "",
      form.message,
    ].join("\n");
    const mailto = `mailto:${brand.email}?subject=${encodeURIComponent(
      `Zetta Metrics — ${form.subject}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const contactLinks = [
    { icon: Mail, label: "Email", value: brand.email, href: `mailto:${brand.email}` },
    { icon: LinkedinIcon, label: "LinkedIn", value: "Shailesh Gupta", href: brand.linkedin },
    { icon: GithubIcon, label: "GitHub", value: "github.com/sg2499", href: brand.github },
  ];

  return (
    <div className="pt-40 pb-24">
      <div className="container-custom">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
            Let&apos;s talk.
          </h1>
          <p className="text-pretty mt-5 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
            Whether it&apos;s about MathPath, School Enrichment, a partnership,
            or investment — tell us what you need and we&apos;ll get back to you.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-3">
            {contactLinks.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="surface-card flex items-center gap-4 p-5"
              >
                <div
                  className="rounded-lg p-2.5"
                  style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
                  <p className="mt-0.5 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{value}</p>
                </div>
              </a>
            ))}
          </aside>

          <form onSubmit={submit} className="surface-card space-y-5 p-7">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Your name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={fieldStyle}
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={fieldStyle}
                  placeholder="you@company.com"
                />
              </Field>
            </div>

            <Field label="Company / organization">
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                style={fieldStyle}
                placeholder="Optional"
              />
            </Field>

            <Field label="What's this about?">
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                style={fieldStyle}
              >
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Message">
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...fieldStyle, resize: "vertical" }}
                placeholder="Tell us a bit about what you need..."
              />
            </Field>

            <button type="submit" className="btn-primary w-full py-3.5 text-sm sm:w-auto sm:px-6">
              Send message <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
