import Link from "next/link";
import { ArrowRight, GraduationCap, Workflow } from "lucide-react";
import { companyStats, platformPillars, products } from "@/lib/content";
import ProductCard from "@/components/sections/ProductCard";
import ShiftFilm from "@/components/sections/ShiftFilm";
import HeroScene from "@/components/three/HeroScene";
import AutomationExplorer from "@/components/sections/AutomationExplorer";
import ScrollStory from "@/components/sections/ScrollStory";
import PillarVisual from "@/components/sections/PillarVisual";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionGlow from "@/components/sections/SectionGlow";
import IconBadge from "@/components/sections/IconBadge";
import Reveal from "@/components/motion/Reveal";
import MagneticLink from "@/components/motion/MagneticLink";
import AnimatedStat from "@/components/motion/AnimatedStat";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import ScrollLitText from "@/components/motion/ScrollLitText";

// Bento placement: [wide][narrow] / [narrow][wide], a checkerboard rhythm.
const bentoSpan = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2"];

export default function Home() {
  return (
    <div>
      {/* Hero: the message on the left, the studio-lit 3D "Z" on the right */}
      <section className="relative overflow-hidden pt-24 pb-10 md:pt-28 lg:pb-16">
        <SectionGlow
          blobs={[
            { size: 620, top: "-20%", left: "-12%", color: "primary" },
            { size: 560, top: "0%", right: "-10%", color: "secondary", delay: 4 },
          ]}
        />
        <div className="container-custom relative z-10">
          <div className="grid items-center gap-6 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-4">
            <div>
              <Reveal immediate>
                <Link href="/products" className="announce-pill">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider"
                    style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    Live
                  </span>
                  MathPath Platform · Krama in development
                  <ArrowRight size={14} className="mr-1.5" />
                </Link>
              </Reveal>
              <h1
                className="mt-7 font-display font-extrabold leading-[1] tracking-[-0.045em]"
                style={{ color: "var(--text-primary)", fontSize: "clamp(2.7rem, min(5.2vw, 9vh), 4.9rem)" }}
              >
                <HeadlineReveal delay={0.1} segments={[{ text: "The work you run by hand," }, { text: "rebuilt as software.", gradient: true }]} />
              </h1>
              <Reveal immediate delay={0.35}>
                <p className="mt-6 max-w-xl leading-[1.65]" style={{ color: "var(--text-secondary)", fontSize: "clamp(1.02rem, 2.5vh, 1.2rem)" }}>
                  Zetta Metrics builds Ed-Tech platforms and workflow software for institutions that still run on spreadsheets, paper and follow-ups. One already runs an entire abacus program, from the first practice sheet to the fee desk.
                </p>
              </Reveal>
              <Reveal immediate delay={0.45}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <MagneticLink href="/contact" className="btn-primary px-7 py-4 text-sm">
                    Talk to us <ArrowRight size={16} />
                  </MagneticLink>
                  <MagneticLink href="/products" className="btn-secondary px-7 py-4 text-sm">
                    Explore our products
                  </MagneticLink>
                </div>
              </Reveal>
              <Reveal immediate delay={0.55}>
                <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                    What we build
                  </span>
                  {[
                    { icon: GraduationCap, label: "Ed-Tech platforms" },
                    { icon: Workflow, label: "Workflow automation" },
                  ].map(({ icon: Icon, label }) => (
                    <span key={label} className="focus-chip">
                      <Icon size={14} strokeWidth={2.2} style={{ color: "var(--accent)" }} />
                      {label}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="relative h-[360px] sm:h-[440px] lg:h-[min(640px,calc(100vh-9rem))]">
              <HeroScene />
            </div>
          </div>
        </div>
      </section>

      {/* Company stats */}
      <section className="relative pb-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-5 lg:grid-cols-4">
            {companyStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07} className="h-full">
                <div className="surface-card hover-card flex h-full flex-col p-5 sm:p-7">
                  <IconBadge icon={s.icon} />
                  <p className="mt-6 font-display text-4xl sm:mt-8 sm:text-5xl font-extrabold tracking-[-0.045em]" style={{ color: "var(--text-primary)" }}>
                    {s.animate ? <AnimatedStat value={s.value} /> : s.value}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-6" style={{ color: "var(--text-secondary)" }}>
                    {s.label}
                  </p>
                  <div className="mt-auto pt-6">
                    <div className="h-px w-full" style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The shift: a short film, sized to fit one screen */}
      <section className="relative py-16 sm:py-20">
        <div className="container-custom">
          <Reveal y={30}>
            <ShiftFilm />
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="relative overflow-hidden py-24">
        <SectionGlow
          blobs={[
            { size: 480, top: "0%", right: "-10%", color: "tertiary" },
            { size: 360, bottom: "0%", left: "-6%", color: "primary", delay: 6 },
          ]}
        />
        <div className="container-custom">
          <SectionHeader
            eyebrow="Products"
            title={
              <>
                Two platforms. <span className="gradient-text">One foundation.</span>
              </>
            }
            description="The MathPath Platform is live, running an abacus program from daily practice to the Annual Competition and the fees behind it. Krama, for CBSE and ICSE schools, is being built on the same foundation, and its core already works."
          />
          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.08} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we automate */}
      <section className="band relative overflow-hidden py-24">
        <SectionGlow
          blobs={[
            { size: 480, top: "0%", right: "-10%", color: "primary" },
            { size: 380, bottom: "0%", left: "-8%", color: "secondary", delay: 4 },
          ]}
        />
        <div className="container-custom">
          <SectionHeader
            eyebrow="What we automate"
            title={
              <>
                If it runs on spreadsheets and reminders, <span className="gradient-text">it can run on software.</span>
              </>
            }
            description="The same building blocks, applied to whatever your team still does by hand. Pick one to see the before and after."
          />
          <div className="mt-14">
            <AutomationExplorer />
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="relative overflow-hidden py-28">
        <SectionGlow blobs={[{ size: 680, top: "-10%", left: "25%", color: "secondary" }]} />
        <div className="container-custom relative z-10">
          <Reveal>
            <p className="eyebrow mb-10 text-center">Our position</p>
          </Reveal>
          <ScrollLitText
            className="text-center font-display text-[2.1rem] font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-5xl lg:text-[4rem]"
            style={{ color: "var(--text-primary)" }}
            segments={[
              { text: "We don't build dashboards that sit on top of how you work. We build the system you" },
              { text: "actually run on.", accent: true },
            ]}
          />
        </div>
      </section>

      {/* Principles bento */}
      <section className="relative overflow-hidden py-20">
        <SectionGlow
          blobs={[
            { size: 460, top: "0%", left: "-10%", color: "primary" },
            { size: 380, bottom: "0%", right: "-8%", color: "tertiary", delay: 4 },
          ]}
        />
        <div className="container-custom">
          <SectionHeader
            eyebrow="The foundation"
            title={
              <>
                Four rules. <span className="gradient-text">Every build.</span>
              </>
            }
            description="Every product we ship stands on the same engineered foundation, so each one starts further ahead than the last."
          />
          <div className="mt-14 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
            {platformPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.06} className={`h-full ${bentoSpan[i]}`}>
                <div className="surface-card hover-card flex h-full flex-col p-6 sm:p-7">
                  <PillarVisual index={i} />
                  <div className="mt-6 flex items-start gap-4">
                    <IconBadge icon={pillar.icon} />
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                        {pillar.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we build: pinned scroll story */}
      <section className="relative py-20 pin:py-0">
        <SectionGlow blobs={[{ size: 520, top: "20%", right: "-10%", color: "primary" }]} />
        <ScrollStory />
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden pt-8 pb-20">
        <div className="container-custom">
          <Reveal>
            <div className="cta-panel relative overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-24">
              <SectionGlow
                blobs={[
                  { size: 480, top: "-40%", left: "-10%", color: "primary" },
                  { size: 420, bottom: "-50%", right: "-8%", color: "secondary", delay: 3 },
                ]}
              />
              <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" style={{ maskImage: "radial-gradient(ellipse at center, black, transparent 70%)" }} aria-hidden="true" />
              <div className="relative">
                <h2 className="section-title">Still running a core process on spreadsheets and follow-ups?</h2>
                <p className="mt-5 text-base leading-7 sm:text-lg" style={{ color: "var(--text-secondary)" }}>
                  Tell us how it works today. We&apos;ll tell you plainly whether it&apos;s a fit for what we build, and what it would take.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <MagneticLink href="/contact" className="btn-primary px-7 py-4 text-sm">
                    Talk to us <ArrowRight size={16} />
                  </MagneticLink>
                  <MagneticLink href="/company" className="btn-secondary px-7 py-4 text-sm">
                    About Zetta Metrics
                  </MagneticLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
