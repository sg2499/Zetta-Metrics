"use client";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050914]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #050914 0%, #071120 46%, #050914 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.075]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, transparent, black 12%, black 82%, transparent)",
        }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 22% 8%, rgba(14,165,233,0.14), transparent 30%), radial-gradient(circle at 78% 24%, rgba(59,130,246,0.11), transparent 34%), linear-gradient(90deg, rgba(6,182,212,0.05), transparent 42%, rgba(59,130,246,0.05))",
        }}
      />
      <div className="noise-overlay" />
    </div>
  );
}
