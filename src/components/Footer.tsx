import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { brand, products } from "@/lib/content";

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
  { icon: GithubIcon, href: brand.github, label: "GitHub" },
  { icon: LinkedinIcon, href: brand.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${brand.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 mt-20 border-t"
      style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-raised)" }}
    >
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="mb-5 block">
              <Image
                src="/logo-lockup.png"
                alt="Zetta Metrics — Engineering outcomes that matter"
                width={1365}
                height={495}
                className="h-11 w-auto rounded-md"
              />
            </Link>
            <p className="max-w-sm text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
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
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
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
