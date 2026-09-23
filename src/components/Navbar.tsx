"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/company", label: "Company" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
        style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-overlay)" }}
      >
        <div className="container-custom flex h-20 items-center justify-between gap-4">
          <Link href="/" className="group flex min-w-fit items-center gap-2.5">
            <div
              className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg"
              style={{ backgroundColor: "#060a0b" }}
            >
              <Image src="/logo-mark.png" alt="Zetta Metrics" fill className="object-cover" priority />
            </div>
            <span className="text-balance font-display text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Zetta<span className="gradient-text">Metrics</span>
            </span>
          </Link>

          <nav
            className="hidden items-center rounded-lg border p-1 md:flex"
            style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-raised)" }}
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "relative rounded-md px-4 py-2.5 text-sm font-semibold transition-colors"
                  )}
                  style={{ color: isActive ? "var(--text-on-accent)" : "var(--text-secondary)" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-tab"
                      className="absolute inset-0 rounded-md"
                      style={{ backgroundColor: "var(--accent)" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link href="/contact" className="btn-primary px-4 py-2.5 text-sm">
              Talk to us
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors"
              style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-raised)", color: "var(--text-secondary)" }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-20 z-40 border-b px-6 py-4 backdrop-blur-xl md:hidden"
            style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-overlay)" }}
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-4 py-3 text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: pathname.startsWith(link.href) ? "var(--accent)" : "transparent",
                    color: pathname.startsWith(link.href) ? "var(--text-on-accent)" : "var(--text-secondary)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-2 w-full py-3">
                Talk to us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
