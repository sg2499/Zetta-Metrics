"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/company", label: "Company" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Transparent and full-width at the top of the page; once the visitor
 * scrolls, it condenses into a floating glass pill. The active link gets a
 * sliding highlight.
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const condensed = scrolled || mobileOpen;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-300 sm:px-4" style={{ paddingTop: condensed ? 12 : 0 }}>
        <div
          className="mx-auto flex items-center justify-between gap-4 border transition-all duration-300 ease-out"
          style={{
            maxWidth: condensed ? 1120 : 1240,
            height: condensed ? 64 : 84,
            paddingInline: condensed ? 14 : 24,
            borderRadius: condensed ? 18 : 0,
            borderColor: condensed ? "var(--glass-border)" : "transparent",
            background: condensed ? "var(--bg-overlay)" : "transparent",
            backdropFilter: condensed ? "blur(20px) saturate(160%)" : "none",
            WebkitBackdropFilter: condensed ? "blur(20px) saturate(160%)" : "none",
            boxShadow: condensed ? "var(--shadow-lifted)" : "none",
          }}
        >
          <Link href="/" className="group flex min-w-fit items-center gap-2.5" aria-label="Zetta Metrics home">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10" style={{ backgroundColor: "#060a0b" }}>
              <Image src="/logo-mark.png" alt="" fill sizes="36px" className="object-cover" loading="eager" />
            </div>
            <span className="font-display text-lg font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Zetta<span className="gradient-text">Metrics</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="relative rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-[var(--text-primary)]"
                  style={{ color: active ? "var(--text-primary)" : "var(--text-secondary)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--accent-soft)", boxShadow: "inset 0 0 0 1px var(--glow-primary)" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 md:flex">
            <ThemeToggle />
            <Link href="/contact" className="btn-primary px-4 py-2.5 text-sm">
              Talk to us <ArrowRight size={14} />
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
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 top-[84px] z-40 rounded-2xl border p-3 backdrop-blur-xl sm:inset-x-4 md:hidden"
            style={{ borderColor: "var(--glass-border)", backgroundColor: "var(--bg-overlay)", boxShadow: "var(--shadow-lifted)" }}
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-semibold transition-colors"
                    style={{
                      backgroundColor: active ? "var(--accent-soft)" : "transparent",
                      color: active ? "var(--text-primary)" : "var(--text-secondary)",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-2 w-full py-3.5 text-sm">
                Talk to us <ArrowRight size={14} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
