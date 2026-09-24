import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { brand, founders, companyPillars } from "@/lib/content";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import SectionGlow from "@/components/sections/SectionGlow";
import SectionHeader from "@/components/sections/SectionHeader";
import IconBadge from "@/components/sections/IconBadge";
import Reveal from "@/components/motion/Reveal";
import MagneticLink from "@/components/motion/MagneticLink";
import ScrollLitText from "@/components/motion/ScrollLitText";

export const metadata: Metadata = {
  title: "Company",
  description: "Zetta Metrics Technologies Private Limited — founders, mission, and platform approach.",
};

const companyFacts = [
  { label: "Company", value: brand.legalName },
  { label: "Headquarters", value: "Kolkata, India" },
  { label: "Founded", value: "2026" },
  { label: "Focus", value: "Ed-Tech platforms & automation" },
];

// Dividers for the facts strip: stacked on mobile, 2×2 on tablet, 1×4 on desktop.
const FACT_BORDERS = [
  "",
  "border-t sm:border-t-0 sm:border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-t sm:border-l lg:border-t-0",
];

const socialBtn = "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]";

export default function CompanyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-16 md:pt-48">
        <SectionGlow
          blobs={[
            { size: 520, top: "-10%", right: "-10%", color: "primary" },
            { size: 380, top: "20%", left: "-8%", color: "secondary", delay: 5 },
          ]}
        />
        <div className="container-custom">
          <SectionHeader
            as="h1"
            eyebrow="Company"
            title={
              <>
                We build reusable systems, <span className="gradient-text">then the products that need them.</span>
              </>
            }
            description={`${brand.legalName} is an AI-native SaaS company specialising in Ed-Tech platforms and workflow automation: engineering systems for education today, and for any institution or business whose manual process is ready to become software — each engagement built so the work compounds instead of resetting.`}
          />

          <Reveal delay={0.1}>
            <dl className="surface-card mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {companyFacts.map((f, i) => (
                <div
                  key={f.label}
                  className={`p-6 ${FACT_BORDERS[i]}`}
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <dt className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
                    {f.label}
                  </dt>
                  <dd className="mt-2 font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="relative overflow-hidden py-28">
        <SectionGlow blobs={[{ size: 600, top: "-20%", left: "30%", color: "secondary" }]} />
        <div className="container-custom relative z-10">
          <Reveal>
            <p className="eyebrow mb-8 text-center">Our mission</p>
          </Reveal>
          <ScrollLitText
            className="text-center font-display text-[2rem] font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-5xl"
            style={{ color: "var(--text-primary)" }}
            segments={[
              { text: "Turn the manual processes institutions depend on into software that is" },
              { text: "intelligent, auditable, and built to last.", accent: true },
            ]}
          />
        </div>
      </section>

      {/* Principles */}
      <section className="relative overflow-hidden py-24">
        <SectionGlow blobs={[{ size: 440, bottom: "0%", right: "-10%", color: "primary" }]} />
        <div className="container-custom">
          <SectionHeader eyebrow="How we operate" title="Four principles we don't bend." />
          <div className="mt-14 grid items-stretch gap-5 md:grid-cols-2">
            {companyPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.06} className="h-full">
                <div className="surface-card hover-card flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <IconBadge icon={pillar.icon} />
                    <span className="font-display text-5xl font-extrabold tracking-[-0.05em]" style={{ color: "var(--border-strong)" }}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                    {pillar.summary}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative overflow-hidden py-24">
        <SectionGlow blobs={[{ size: 440, top: "0%", left: "-10%", color: "tertiary" }]} />
        <div className="container-custom">
          <SectionHeader eyebrow="Leadership" title="Founders & Directors." />
          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08} className="h-full">
                <div className="surface-card hover-card flex h-full flex-col p-8">
                  <div className="flex items-center gap-5">
                    {f.image ? (
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl" style={{ boxShadow: "0 0 0 2px var(--bg-raised), 0 0 0 4px var(--accent)" }}>
                        <Image src={f.image} alt={f.name} fill sizes="80px" className="object-cover" />
                      </div>
                    ) : (
                      <div
                        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-extrabold"
                        style={{ background: "linear-gradient(150deg, var(--accent-soft), transparent)", border: "1px solid var(--glass-border)", color: "var(--accent)" }}
                      >
                        {f.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
                        {f.name}
                      </h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--accent)" }}>
                        {f.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                    {f.bio}
                  </p>
                  {(f.linkedin || f.github) && (
                    <div className="mt-auto flex gap-2 pt-6">
                      {f.linkedin && (
                        <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className={socialBtn} style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }} aria-label={`${f.name} on LinkedIn`}>
                          <LinkedinIcon size={16} />
                        </a>
                      )}
                      {f.github && (
                        <a href={f.github} target="_blank" rel="noopener noreferrer" className={socialBtn} style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }} aria-label={`${f.name} on GitHub`}>
                          <GithubIcon size={16} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="container-custom">
          <Reveal>
            <div className="cta-panel relative flex flex-col items-start gap-8 overflow-hidden p-10 sm:p-14 md:flex-row md:items-center md:justify-between">
              <SectionGlow blobs={[{ size: 420, top: "-40%", right: "-5%", color: "primary" }]} />
              <div className="min-w-0 flex-1">
                <h2 className="section-title">Want to work with us?</h2>
                <p className="mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                  Whether it&apos;s about our products or a partnership, we&apos;d like to hear from you.
                </p>
              </div>
              <MagneticLink href="/contact" className="btn-primary shrink-0 whitespace-nowrap px-7 py-4 text-sm">
                Get in touch <ArrowRight size={16} />
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
