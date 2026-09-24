import MagneticLink from "@/components/motion/MagneticLink";
import SectionGlow from "@/components/sections/SectionGlow";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center overflow-hidden py-24">
      <SectionGlow
        blobs={[
          { size: 520, top: "-15%", left: "50%", color: "primary" },
          { size: 320, bottom: "-20%", right: "-8%", color: "secondary", delay: 4 },
        ]}
      />
      <div className="container-custom relative z-10 text-center">
        <p className="eyebrow mb-4">Error 404</p>
        <h1
          className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl"
          style={{ color: "var(--text-primary)" }}
        >
          This page didn&apos;t <span className="gradient-text">make the cut</span>.
        </h1>
        <p
          className="mt-5 text-base leading-7"
          style={{ color: "var(--text-secondary)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
          to something that does.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <MagneticLink href="/" className="btn-primary px-6 py-3.5 text-sm">
            Back to home
          </MagneticLink>
          <MagneticLink href="/contact" className="btn-secondary px-6 py-3.5 text-sm">
            Contact us
          </MagneticLink>
        </div>
      </div>
    </div>
  );
}
