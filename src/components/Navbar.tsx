"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { href: "/studio", label: "Services" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050914]/92 backdrop-blur-xl">
        <div className="container-custom flex h-20 items-center justify-between gap-4">
          <Link href="/" className="group flex min-w-fit items-center gap-3">
            <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_14px_45px_rgba(6,182,212,0.18)]">
              <Zap className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Zetta<span className="gradient-text">Metrics</span>
            </span>
          </Link>

          <nav
            className="hidden items-center rounded-lg border border-white/10 bg-white/[0.045] p-1 shadow-inner shadow-black/20 md:flex"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "relative rounded-md px-4 py-2.5 text-sm font-semibold transition-colors",
                    isActive
                      ? "text-slate-950"
                      : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-tab"
                      className="absolute inset-0 rounded-md bg-white shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/contact" className="btn-primary px-4 py-2.5 text-sm">
              Start a project
            </Link>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] text-slate-300 transition-colors hover:text-white md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-20 z-40 border-b border-white/10 bg-[#050914]/96 px-6 py-4 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "rounded-md px-4 py-3 text-sm font-semibold transition-colors",
                    pathname === link.href
                      ? "bg-white text-slate-950"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-2 w-full py-3">
                Start a project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
