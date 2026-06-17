"use client";

import Link from "next/link";
import { ExternalLink, Zap, Mail, BookOpen } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

const FOOTER_LINKS = {
  "Navigation": [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Studio", href: "/studio" },
  ],
  "Work": [
    { label: "Blog", href: "/blog" },
    { label: "ShaileshGPT", href: "/chat" },
    { label: "Contact", href: "/contact" },
    { label: "MathPath", href: "/studio#mathpath" },
  ],
};

const SOCIALS = [
  { icon: GithubIcon, href: "https://github.com/sg2499", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com/in/shailesh-gupta-7b7278188", label: "LinkedIn" },
  { icon: BookOpen, href: "https://prismatic-metrics.blogspot.com", label: "Blog" },
  { icon: Mail, href: "/contact", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-24">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 opacity-80" />
                <Zap className="relative w-4 h-4 text-white m-2" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                Zetta<span className="gradient-text">Metrics</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Turning data into intelligence. Intelligence into products. Building world-class AI solutions, EdTech platforms, and intelligent applications from IIT Roorkee.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/30 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} ZettaMetrics. Designed & Built by{" "}
            <span className="text-slate-300">Shailesh Gupta</span>
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
