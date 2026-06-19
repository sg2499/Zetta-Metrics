"use client";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "linear-gradient(115deg, rgba(2,6,23,1) 0%, rgba(8,20,38,0.94) 38%, rgba(3,37,55,0.82) 72%, rgba(2,6,23,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, transparent, black 16%, black 68%, transparent)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,182,212,0.08), transparent 28%), linear-gradient(90deg, transparent, rgba(59,130,246,0.08), transparent)",
        }}
      />
      <div className="noise-overlay" />
    </div>
  );
}
