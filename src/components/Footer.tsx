import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { LinkedinIcon } from "@/components/BrandIcons";
import { brand, products } from "@/lib/content";
import SectionGlow from "@/components/sections/SectionGlow";

const footerLinks = {
  Company: [
    { label: "Home", href: "/" },
    { label: "Company", href: "/company" },
    { label: "Contact", href: "/contact" },
  ],
  Products: [{ label: "All products", href: "/products" }, ...products.map((p) => ({ label: p.name, href: p.href }))],
};

const socials = [
  { icon: LinkedinIcon, href: brand.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${brand.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 mt-12 overflow-hidden border-t"
      style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-raised)" }}
    >
      <SectionGlow blobs={[{ size: 520, bottom: "-30%", left: "4%", color: "primary" }, { size: 380, top: "-30%", right: "6%", color: "secondary", delay: 5 }]} />
      <div className="container-custom pt-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="inline-block" aria-label="Zetta Metrics home">
              <Image src="/logo-wordmark.png" alt="Zetta Metrics" width={1307} height={461} quality={100} className="h-14 w-auto rounded-md sm:h-16" />
            </Link>
            <p className="mt-4 text-[0.68rem] font-semibold uppercase leading-none" style={{ color: "var(--text-muted)", letterSpacing: "0.28em" }}>
              Engineering outcomes that matter
            </p>
            <p className="mt-5 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
              {brand.shortPositioning}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="footer-heading">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="footer-heading">
              Get in touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${brand.email}`} className="group inline-flex items-center gap-1.5 break-all text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]">
                  {brand.email}
                  <ArrowUpRight size={13} className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              {brand.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:+91${phone}`} className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]">
                    <Phone size={13} style={{ color: "var(--accent)" }} />
                    +91 {phone}
                    <ArrowUpRight size={13} className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row" style={{ borderColor: "var(--border-subtle)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} {brand.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="status-dot pulse-dot" style={{ backgroundColor: "var(--accent)" }} />
            {brand.location}
          </div>
        </div>
      </div>

      <div className="pointer-events-none mt-6 flex justify-center overflow-hidden" aria-hidden="true">
        <span className="footer-wordmark translate-y-[18%]">Zetta Metrics</span>
      </div>
    </footer>
  );
}
