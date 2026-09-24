import { BrainCircuit, Check, Lock } from "lucide-react";

/**
 * Small, illustrative diagrams for the home page's platform bento tiles.
 * They depict how the system behaves (a scoring flow, shared building
 * blocks, an audit trail, a role/permission matrix) — schematic, not
 * screenshots, and they carry no data claims.
 */

const chipStyle = {
  borderColor: "var(--border-subtle)",
  background: "var(--bg-base)",
  color: "var(--text-secondary)",
} as const;

function AiFlow() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <div className="flex w-full max-w-md items-center justify-between gap-2">
        <div className="rounded-lg border px-3 py-2 text-xs font-medium" style={chipStyle}>
          Student attempt
        </div>
        <svg className="h-3 flex-1" preserveAspectRatio="none" viewBox="0 0 100 6" aria-hidden="true">
          <line x1="0" y1="3" x2="100" y2="3" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 4" className="flow-dash" />
        </svg>
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(150deg, var(--accent-strong), var(--accent))", boxShadow: "0 0 40px -6px var(--accent-glow)" }}>
          <BrainCircuit size={28} style={{ color: "var(--text-on-accent)" }} />
          <span className="absolute -inset-2 rounded-[1.2rem] border" style={{ borderColor: "var(--glow-primary)" }} />
        </div>
        <svg className="h-3 flex-1" preserveAspectRatio="none" viewBox="0 0 100 6" aria-hidden="true">
          <line x1="0" y1="3" x2="100" y2="3" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 4" className="flow-dash" />
        </svg>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium" style={chipStyle}>
            <span className="status-dot" style={{ background: "var(--status-live)" }} /> On track
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium" style={chipStyle}>
            <span className="status-dot" style={{ background: "var(--status-dev)" }} /> Foundation Repair
          </div>
        </div>
      </div>
    </div>
  );
}

function SharedBlocks() {
  const blocks = ["Roles", "Assignments", "Approvals", "Scoring", "Reports"];
  return (
    <div className="flex w-full max-w-sm flex-col">
      <div className="flex justify-center gap-2">
        {["MathPath", "School Enrichment"].map((p) => (
          <span key={p} className="rounded-md px-2.5 py-1 text-[0.7rem] font-semibold" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
            {p}
          </span>
        ))}
      </div>
      <svg className="h-5 w-full" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
        <line x1="20" y1="0" x2="50" y2="10" stroke="var(--accent)" strokeWidth="0.6" strokeDasharray="2 2" className="flow-dash" vectorEffect="non-scaling-stroke" />
        <line x1="65" y1="0" x2="50" y2="10" stroke="var(--accent)" strokeWidth="0.6" strokeDasharray="2 2" className="flow-dash" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="rounded-xl border p-2.5" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-base)" }}>
        <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
          Shared foundation
        </p>
        <div className="flex flex-wrap gap-1.5">
          {blocks.map((b) => (
            <span key={b} className="rounded-md border px-2 py-1 text-[0.68rem] font-medium" style={{ ...chipStyle, background: "var(--bg-raised)" }}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuditTrail() {
  const rows = [
    { event: "attempt.submitted", tag: "client" },
    { event: "scored · server rule", tag: "server" },
    { event: "status → passed", tag: "logged" },
  ];
  return (
    <div className="w-full max-w-sm space-y-1.5 rounded-xl border p-3 font-mono text-[0.68rem]" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-base)" }}>
      {rows.map((r, i) => (
        <div key={r.event} className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 truncate" style={{ color: "var(--text-secondary)" }}>
            <span style={{ color: "var(--text-muted)" }}>{String(i + 1).padStart(2, "0")}</span>
            {r.event}
          </span>
          <span style={{ color: i === 2 ? "var(--status-live)" : "var(--accent)" }}>{r.tag}</span>
        </div>
      ))}
    </div>
  );
}

function RoleMatrix() {
  const roles = [
    { role: "Admin", access: [true, true, true] },
    { role: "Teacher", access: [true, true, false] },
    { role: "Student", access: [true, false, false] },
  ];
  return (
    <div className="w-full max-w-sm rounded-xl border p-3" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-base)" }}>
      {roles.map((r) => (
        <div key={r.role} className="flex items-center justify-between py-1 text-[0.7rem]">
          <span className="font-medium" style={{ color: "var(--text-secondary)" }}>
            {r.role}
          </span>
          <span className="flex gap-1.5">
            {r.access.map((ok, i) => (
              <span
                key={i}
                className="flex h-5 w-5 items-center justify-center rounded"
                style={{ background: ok ? "var(--accent-soft)" : "transparent", border: ok ? "none" : "1px solid var(--border-subtle)" }}
              >
                {ok ? <Check size={11} style={{ color: "var(--accent)" }} /> : <Lock size={9} style={{ color: "var(--text-muted)" }} />}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

const VISUALS = [AiFlow, SharedBlocks, AuditTrail, RoleMatrix];

/** Every visual sits on the same fixed-height stage so text below lines up across a row. */
export default function PillarVisual({ index }: { index: number }) {
  const Visual = VISUALS[index] ?? AiFlow;
  return (
    <div
      className="dot-grid relative flex h-44 items-center justify-center overflow-hidden rounded-xl border px-4"
      style={{ borderColor: "var(--border-subtle)", background: "color-mix(in srgb, var(--bg-base) 55%, transparent)" }}
    >
      <Visual />
    </div>
  );
}
