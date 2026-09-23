import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { brand, founders, companyPillars } from "@/lib/content";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import SectionGlow from "@/components/sections/SectionGlow";
import IconBadge from "@/components/sections/IconBadge";
import Reveal from "@/components/motion/Reveal";
import MagneticLink from "@/components/motion/MagneticLink";

export const metadata: Metadata = {
  title: "Company",
  description: "Zetta Metrics Technologies Private Limited — founders, mission, and platform approach.",
};

export default function CompanyPage() {
  return (
    <div className="pt-40 pb-24">
      <section className="relative overflow-hidden">
        <SectionGlow
          blobs={[
            { size: 480, top: "-22%", right: "-10%", color: "primary" },
            { size: 340, top: "10%", left: "-8%", color: "secondary", delay: 5 },
          ]}
        />
        <div className="container-custom">
          <Reveal>
            <div>
              <p className="eyebrow mb-4">Company</p>
              <h1 className="text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                We build reusable systems, then the products that need them.
              </h1>
              <p className="text-pretty mt-5 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                {brand.legalName}{" "}
                is an AI-native SaaS company, engineering systems for
                education today and for any institution or business whose
                manual process is ready to become software — each engagement
                built so the work compounds instead of resetting.
              </p>
            </div>
          </Reveal>

          {/* Mission / pillars recap */}
          <div className="mt-16 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {companyPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.06} className="h-full">
                <div className="hover-card surface-card flex h-full flex-col p-6">
                  <IconBadge icon={pillar.icon} />
                  <h3 className="mt-3 font-display text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                    {pillar.title}
                  </h3>
                  <p className="text-pretty mt-2 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>
                    {pillar.summary}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="container-custom">

        {/* Founders */}
        <div className="mt-20">
          <Reveal>
            <p className="eyebrow mb-4">Leadership</p>
            <h2 className="text-balance font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Founders & Directors
            </h2>
          </Reveal>
          <div className="mt-8 grid items-stretch gap-6 sm:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08} className="h-full">
              <div className="hover-card surface-card flex h-full flex-col p-7">
                {f.image ? (
                  <div
                    className="relative h-14 w-14 overflow-hidden rounded-full border-2"
                    style={{ borderColor: "var(--accent)" }}
                  >
                    <Image src={f.image} alt={f.name} fill sizes="56px" className="object-cover" />
                  </div>
                ) : (
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full font-display text-lg font-bold"
                    style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    {f.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
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
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="cta-panel hover-card mt-20 flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-balance font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Want to work with us?
              </h2>
              <p className="text-pretty mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                Whether it&apos;s about our products or a partnership, we&apos;d
                like to hear from you.
              </p>
            </div>
            <MagneticLink href="/contact" className="btn-primary shrink-0 whitespace-nowrap px-6 py-3.5 text-sm">
              Get in touch <ArrowRight size={16} />
            </MagneticLink>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
