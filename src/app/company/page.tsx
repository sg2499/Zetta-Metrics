import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brand, founders, platformPillars } from "@/lib/content";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

export const metadata: Metadata = {
  title: "Company",
  description: "Zetta Metrics Technologies Private Limited — founders, mission, and platform approach.",
};

export default function CompanyPage() {
  return (
    <div className="pt-40 pb-24">
      <div className="container-custom">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Company</p>
          <h1 className="text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
            We build the platform first, then the product.
          </h1>
          <p className="text-pretty mt-5 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
            {brand.legalName} is an AI-native automation company. We don&apos;t{" "}
            take one-off projects and rebuild from zero each time — every
            product we ship extends the same underlying platform, so the work
            compounds instead of resetting.
          </p>
        </div>

        {/* Mission / pillars recap */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {platformPillars.map((pillar) => (
            <div key={pillar.title} className="surface-card p-6">
              <pillar.icon size={20} style={{ color: "var(--accent)" }} />
              <h3 className="mt-3 font-display text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                {pillar.title}
              </h3>
              <p className="text-pretty mt-2 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>
                {pillar.summary}
              </p>
            </div>
          ))}
        </div>

        {/* Founders */}
        <div className="mt-20">
          <p className="eyebrow mb-4">Leadership</p>
          <h2 className="text-balance font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Founders & Directors
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {founders.map((f) => (
              <div key={f.name} className="surface-card p-7">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full font-display text-lg font-bold"
                  style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  {f.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {f.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--accent)" }}>
                  {f.role}
                </p>
                <p className="text-pretty mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  {f.bio}
                </p>
                {(f.linkedin || f.github) && (
                  <div className="mt-5 flex gap-2">
                    {f.linkedin && (
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border"
                        style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
                        aria-label={`${f.name} on LinkedIn`}
                      >
                        <LinkedinIcon size={15} />
                      </a>
                    )}
                    {f.github && (
                      <a
                        href={f.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border"
                        style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
                        aria-label={`${f.name} on GitHub`}
                      >
                        <GithubIcon size={15} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card mt-20 flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-balance font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Want to work with us?
            </h2>
            <p className="text-pretty mt-3 max-w-xl text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
              Whether it&apos;s about our products or a partnership, we&apos;d
              like to hear from you.
            </p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0 px-6 py-3.5 text-sm">
            Get in touch <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
