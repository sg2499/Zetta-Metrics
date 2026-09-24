"use client";

export default function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-base) 0%, var(--bg-raised) 46%, var(--bg-base) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--grid-opacity, 0.06)",
          backgroundImage:
            "linear-gradient(var(--border-strong) 1px, transparent 1px), linear-gradient(90deg, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, transparent, black 12%, black 82%, transparent)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 8%, var(--accent-glow), transparent 30%), radial-gradient(circle at 78% 24%, var(--accent-soft), transparent 34%)",
          opacity: 0.9,
        }}
      />
      {/* Film grain — a near-imperceptible texture that keeps flat color
          fields from looking sterile/digital-flat. Normal blending on
          purpose: an "overlay" blend on this fixed, full-screen layer forced
          the browser to recomposite everything above it on every scroll
          frame, which made scrolling stutter. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: "calc(var(--grain-opacity, 0.05) * 0.6)",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
