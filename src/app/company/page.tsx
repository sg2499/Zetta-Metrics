import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  description: "Zetta Metrics Technologies Private Limited: who we are, how we work, and what we have built.",
};

const companyFacts = [
  { label: "Entity", value: brand.legalName },
  { label: "CIN", value: brand.cin },
  { label: "Incorporated", value: brand.incorporated },
  { label: "Registered office", value: brand.registeredOffice.join(", ") },
  { label: "Focus", value: "Ed-Tech platforms and workflow software" },
];

const milestones = [
  { mark: "2026", title: "Incorporated in Kolkata", detail: "Incorporated on 10 August 2026, with one conviction: the processes institutions depend on deserve real software, not another spreadsheet.", href: "/contact", cta: "Work with us" },
  { mark: "Live", title: "The MathPath Platform", detail: "Runs MathPath's abacus program end to end: practice, assessments, the Annual Competition, ranks, rewards and fees.", href: "/products/mathpath", cta: "See the platform" },
  { mark: "Next", title: "Krama", detail: "A learning platform for CBSE and ICSE schools, Classes 5–10. In development, with its core already working.", href: "/products/krama", cta: "See what's built" },
];

const socialBtn = "flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]";

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
          <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            <Reveal immediate>
              <p className="eyebrow mb-5">Company</p>
              <h1 className="font-display text-[2.9rem] font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[4.6rem]" style={{ color: "var(--text-primary)" }}>
                We build the systems institutions <span className="gradient-text">run on.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 sm:text-lg" style={{ color: "var(--text-secondary)" }}>
                {brand.legalName} builds Ed-Tech platforms and workflow software. We start from how the work runs today, engineer it as reusable building blocks, and ship it to real users, so every product starts further ahead than the last.
              </p>
            </Reveal>
            <Reveal immediate delay={0.1}>
              <dl className="surface-card divide-y" style={{ borderColor: "var(--border-subtle)" }}>
                {companyFacts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-6 px-6 py-4" style={{ borderColor: "var(--border-subtle)" }}>
                    <dt className="shrink-0 text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
                      {f.label}
                    </dt>
                    <dd className={`text-right font-display text-sm font-bold leading-6 ${f.label === "CIN" ? "font-mono tracking-tight" : ""}`} style={{ color: "var(--text-primary)" }}>
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* So far */}
      <section className="relative overflow-hidden py-16">
        <div className="container-custom">
          <div className="grid gap-5 md:grid-cols-3">
            {milestones.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.07} className="h-full">
                <Link href={m.href} className="group surface-card hover-card flex h-full flex-col p-7">
                  <span className="font-serif-display text-5xl font-semibold italic" style={{ color: "var(--accent)" }}>
                    {m.mark}
                  </span>
                  <h2 className="mt-5 font-display text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {m.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                    {m.detail}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold" style={{ color: "var(--accent)" }}>
                    {m.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
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
          <SectionHeader eyebrow="How we work" title={<>Four principles <span className="gradient-text">we don&apos;t bend.</span></>} />
          <div className="mt-14 grid items-stretch gap-5 md:grid-cols-2">
            {companyPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.06} className="h-full">
                <div className="surface-card hover-card flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <IconBadge icon={pillar.icon} />
                    <span className="font-serif-display text-5xl font-semibold italic" style={{ color: "var(--border-strong)" }}>
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
          <SectionHeader eyebrow="Leadership" title={<>The people <span className="gradient-text">behind it.</span></>} />
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
                        <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className={socialBtn} aria-label={`${f.name} on LinkedIn`}>
                          <LinkedinIcon size={16} />
                        </a>
                      )}
                      {f.github && (
                        <a href={f.github} target="_blank" rel="noopener noreferrer" className={socialBtn} aria-label={`${f.name} on GitHub`}>
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
                <h2 className="section-title">Have a process that should run itself?</h2>
                <p className="mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                  Tell us how it works today. Product questions and partnerships are welcome too.
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
