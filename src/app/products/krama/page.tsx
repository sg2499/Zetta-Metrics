import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, GraduationCap, ShieldCheck, Users, Building2, Boxes } from "lucide-react";
import { products } from "@/lib/content";
import KramaStair from "@/components/sections/KramaStair";
import KramaRoadmap from "@/components/sections/KramaRoadmap";
import KramaMarking from "@/components/sections/KramaMarking";
import ProductFacts from "@/components/sections/ProductFacts";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionGlow from "@/components/sections/SectionGlow";
import IconBadge from "@/components/sections/IconBadge";
import Reveal from "@/components/motion/Reveal";
import MagneticLink from "@/components/motion/MagneticLink";

const product = products.find((p) => p.slug === "krama")!;

export const metadata: Metadata = {
  title: "Krama",
  description: product.summary,
};

const roles = [
  {
    icon: GraduationCap,
    label: "Student",
    title: "Practice that's ready every day",
    points: ["A dashboard with a live next step", "Today's Practice, marked the moment you submit", "Results that show each option in words"],
  },
  {
    icon: Users,
    label: "Teacher",
    title: "Set it, then review what matters",
    points: ["Assign practice to chosen students of a section", "Per-question review and part marks, with a reason", "Attendance, grades and remarks each term"],
  },
  {
    icon: Building2,
    label: "School admin",
    title: "The school's own rules, in one place",
    points: ["Assessment schemes by class, subject and year", "Report cards issued from the published scheme", "Who teaches which section"],
  },
  {
    icon: Boxes,
    label: "Super admin",
    title: "Curriculum across every school",
    points: ["The Curriculum Studio and its review workflow", "Mapping published curriculum to each school", "Live figures across all schools"],
  },
];

export default function KramaPage() {
  return (
    <div className="krama-zone krama-page">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="krama-stars pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
        <SectionGlow
          blobs={[
            { size: 640, top: "-18%", left: "-12%", color: "secondary" },
            { size: 520, bottom: "-10%", right: "-10%", color: "primary", delay: 4 },
          ]}
        />
        <div className="container-custom relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
            <div>
              <Reveal immediate>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-3">
                    <Image src="/krama-mark.svg" alt="" width={52} height={52} className="rounded-2xl shadow-[0_10px_30px_-8px_rgba(249,171,43,0.5)]" priority />
                    <span className="font-serif-display text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Krama</span>
                  </span>
                  <span
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
                    style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", color: "var(--status-dev)" }}
                  >
                    <span className="status-dot pulse-dot" style={{ backgroundColor: "var(--status-dev)" }} />
                    In development · the core is built
                  </span>
                </div>
                <h1
                  className="font-serif-display mt-8 font-semibold leading-[1.02] tracking-[-0.025em]"
                  style={{ color: "var(--text-primary)", fontSize: "clamp(2.6rem, 6.4vw, 5rem)" }}
                >
                  Every chapter, practised <em className="gradient-text">until it sticks.</em>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 sm:text-lg sm:leading-8" style={{ color: "var(--text-secondary)" }}>
                  {product.summary}
                </p>
              </Reveal>
              <Reveal immediate delay={0.12}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <MagneticLink href="#built" className="btn-primary px-7 py-4 text-sm">
                    See what&apos;s built <ArrowRight size={16} />
                  </MagneticLink>
                  <MagneticLink href="/contact" className="btn-secondary px-7 py-4 text-sm">
                    Talk to us
                  </MagneticLink>
                </div>
                <p className="mt-5 flex items-center gap-2 text-xs leading-5" style={{ color: "var(--text-muted)" }}>
                  <ShieldCheck size={13} /> CBSE · ICSE · Classes 5–10 · A product of Zetta Metrics
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15} y={36}>
              <div className="krama-float" style={{ animation: "krama-float 7s ease-in-out infinite" }}>
                <p className="mb-5 text-center text-[0.68rem] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
                  The five-day chapter loop
                </p>
                <KramaStair />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="relative pb-8">
        <div className="container-custom">
          <ProductFacts slug="krama" />
        </div>
      </section>

      {/* What's built */}
      <section id="built" className="relative scroll-mt-24 overflow-hidden py-24">
        <SectionGlow
          blobs={[
            { size: 460, top: "0%", left: "-10%", color: "secondary" },
            { size: 380, bottom: "0%", right: "-8%", color: "primary", delay: 5 },
          ]}
        />
        <div className="container-custom">
          <SectionHeader
            eyebrow="What's already built"
            title={
              <>
                Not a plan. <span className="gradient-text">Working software.</span>
              </>
            }
            description="Krama is still being built, and the parts below already run end to end: from a school's first sign-in to a published chapter, a marked answer and a report card."
          />
          <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {product.highlights.map((h, i) => (
              <Reveal key={h.title} delay={(i % 4) * 0.06} className="h-full">
                <div className="surface-card hover-card flex h-full flex-col p-6">
                  <IconBadge icon={h.icon} />
                  <h3 className="mt-5 font-display text-lg font-bold leading-snug tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                    {h.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Answer → mark → report card */}
      <section className="band relative overflow-hidden py-24">
        <SectionGlow blobs={[{ size: 520, top: "10%", right: "-10%", color: "primary" }]} />
        <div className="container-custom">
          <SectionHeader
            eyebrow="From answer to report card"
            title={
              <>
                Marks a teacher can <span className="gradient-text">stand behind.</span>
              </>
            }
            description="Automatic where the answer is clear, human where judgement matters, and always on the school's own scheme."
          />
          <div className="mt-14">
            <KramaMarking />
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="relative overflow-hidden py-24">
        <SectionGlow blobs={[{ size: 460, top: "0%", left: "30%", color: "tertiary" }]} />
        <div className="container-custom">
          <SectionHeader
            eyebrow="Four workspaces"
            title={
              <>
                One platform. <span className="gradient-text">A place for every role.</span>
              </>
            }
            description="Each role signs in on its own page and sees only what its job needs."
          />
          <div className="mt-14 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
            {roles.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.07} className="h-full">
                <div className="surface-card hover-card flex h-full flex-col p-7">
                  <IconBadge icon={r.icon} />
                  <p className="mt-5 text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                    {r.label}
                  </p>
                  <h3 className="mt-1.5 font-serif-display text-xl font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                    {r.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {r.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                        <span className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="band relative overflow-hidden py-24">
        <SectionGlow blobs={[{ size: 480, bottom: "0%", left: "-8%", color: "secondary" }]} />
        <div className="container-custom">
          <SectionHeader
            eyebrow="Where it stands"
            title={
              <>
                Built stage by stage, <span className="gradient-text">one stage at a time.</span>
              </>
            }
            description="An honest view of the build: what is done, what is underway, and what comes next."
          />
          <div className="mt-14">
            <KramaRoadmap />
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
                <h2 className="section-title">Interested in Krama for your school?</h2>
                <p className="mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                  Krama is growing school by school. Tell us about your school and where you would like practice, marking and report cards to be easier.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <MagneticLink href="/contact" className="btn-primary whitespace-nowrap px-7 py-4 text-sm">
                  Talk to us <ArrowRight size={16} />
                </MagneticLink>
                <MagneticLink href="/products/mathpath" className="btn-secondary whitespace-nowrap px-7 py-4 text-sm">
                  See the MathPath Platform
                </MagneticLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
