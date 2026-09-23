import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { LinkedinIcon } from "@/components/BrandIcons";
import { brand, products } from "@/lib/content";
import SectionGlow from "@/components/sections/SectionGlow";

const footerLinks = {
  Company: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Company", href: "/company" },
    { label: "Contact", href: "/contact" },
  ],
  Products: products.map((p) => ({ label: p.name, href: p.href })),
};

const socials = [
  { icon: LinkedinIcon, href: brand.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${brand.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 mt-20 overflow-hidden border-t"
      style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-raised)" }}
    >
      <SectionGlow blobs={[{ size: 440, bottom: "-24%", left: "8%", color: "primary" }]} />
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 block">
              <Image
                src="/logo-wordmark.png"
                alt="Zetta Metrics"
                width={1307}
                height={461}
                quality={100}
                className="h-16 w-auto sm:h-20"
              />
            </Link>
            <p
              className="mb-6 text-[0.65rem] font-medium uppercase leading-none"
              style={{ color: "var(--text-muted)", letterSpacing: "0.28em" }}
            >
              Engineering outcomes that matter
            </p>
            <p className="text-pretty text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
              {brand.positioning}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
                  style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              {brand.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:+91${phone}`}
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Phone size={14} style={{ color: "var(--accent)" }} />
                  +91 {phone}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm transition-colors" style={{ color: "var(--text-secondary)" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} {brand.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="status-dot" style={{ backgroundColor: "var(--accent)" }} />
            {brand.location}
          </div>
        </div>
      </div>
    </footer>
  );
}
