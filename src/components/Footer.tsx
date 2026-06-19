"use client";

import Link from "next/link";
import { BookOpen, Mail, Zap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { brand } from "@/lib/content";

const footerLinks = {
  Company: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/studio" },
    { label: "Work", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "MathPath", href: "/studio#mathpath" },
    { label: "AI Concierge", href: "/chat" },
    { label: "Insights", href: "/blog" },
  ],
};

const socials = [
  { icon: GithubIcon, href: brand.github, label: "GitHub" },
  { icon: LinkedinIcon, href: brand.linkedin, label: "LinkedIn" },
  { icon: BookOpen, href: brand.blog, label: "Blog" },
  { icon: Mail, href: `mailto:${brand.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/5">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 opacity-80" />
                <Zap className="relative m-2 h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight">
                Zetta<span className="gradient-text">Metrics</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-7 text-slate-400">
              {brand.positioning}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] text-slate-400 transition-colors hover:border-cyan-400/25 hover:text-white"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} ZettaMetrics. Designed and built by{" "}
            <span className="text-slate-300">Shailesh Gupta</span>.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            Building from India for clients worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}
