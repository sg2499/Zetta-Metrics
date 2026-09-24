import { BrainCircuit, Check, Lock, Sparkles } from "lucide-react";

/**
 * Illustrative, gently animated diagrams for the home page's platform bento
 * tiles: a scoring flow, shared building blocks lighting up in turn, an
 * audit trail writing itself, a role/permission matrix. Schematic only, no
 * data claims. All motion is CSS and stops for reduced-motion visitors.
 */

const chipStyle = {
  borderColor: "var(--border-subtle)",
  background: "var(--bg-base)",
  color: "var(--text-secondary)",
} as const;

function Connector() {
  return (
    <svg className="h-3 min-w-2 flex-1 sm:min-w-6" preserveAspectRatio="none" viewBox="0 0 100 6" aria-hidden="true">
      <line x1="0" y1="3" x2="100" y2="3" stroke="var(--border-strong)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1="0" y1="3" x2="100" y2="3" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 6" className="flow-dash" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function AiFlow() {
  return (
    <div className="flex w-full max-w-xl items-center justify-between gap-1 sm:gap-3">
      <div className="flex flex-col gap-2">
        {["Attempt", "Content", "Request"].map((x, i) => (
          <div key={x} className="seq-light rounded-lg border px-2 py-1.5 text-[0.68rem] font-medium sm:px-3 sm:py-2 sm:text-xs" style={{ ...chipStyle, animationDelay: `${i * 2}s` }}>
            {x}
          </div>
        ))}
      </div>
      <Connector />
      <div className="relative flex flex-col items-center gap-2">
        <div
          className="core-pulse relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl sm:h-20 sm:w-20"
          style={{ background: "linear-gradient(150deg, var(--accent-strong), var(--accent))" }}
        >
          <BrainCircuit className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: "var(--text-on-accent)" }} />
          <span className="core-ring absolute -inset-3 rounded-full" aria-hidden="true" />
        </div>
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
          AI layer
        </span>
      </div>
      <Connector />
      <div className="flex flex-col gap-2">
        {[
          { t: "Scored", c: "var(--status-live)" },
          { t: "Checked", c: "var(--accent)" },
          { t: "Routed", c: "var(--status-dev)" },
        ].map((o, i) => (
          <div key={o.t} className="seq-light flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-[0.68rem] font-medium sm:px-3 sm:py-2 sm:text-xs" style={{ ...chipStyle, animationDelay: `${i * 2 + 0.6}s` }}>
            <span className="status-dot" style={{ background: o.c }} /> {o.t}
          </div>
        ))}
      </div>
    </div>
  );
}

function SharedBlocks() {
  const blocks = ["Roles", "Assignments", "Approvals", "Scoring", "Reports", "Access"];
  return (
    <div className="flex w-full max-w-sm flex-col">
      <div className="flex justify-center gap-2">
        {["MathPath", "School Enrichment"].map((p) => (
          <span key={p} className="rounded-md px-2.5 py-1 text-[0.7rem] font-semibold" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
            {p}
          </span>
        ))}
      </div>
      <svg className="h-6 w-full" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
        <line x1="28" y1="0" x2="50" y2="10" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 4" className="flow-dash" vectorEffect="non-scaling-stroke" />
        <line x1="70" y1="0" x2="50" y2="10" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 4" className="flow-dash" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="rounded-xl border p-3" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-base)" }}>
        <p className="mb-2.5 flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
          <Sparkles size={11} style={{ color: "var(--accent)" }} /> Shared foundation
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {blocks.map((b, i) => (
            <span key={b} className="seq-light rounded-md border px-2 py-1.5 text-center text-[0.68rem] font-medium" style={{ ...chipStyle, background: "var(--bg-raised)", animationDelay: `${i}s` }}>
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
    { event: "timer.checked", tag: "server" },
    { event: "scored · server rule", tag: "server" },
    { event: "status → passed", tag: "logged" },
  ];
  return (
    <div className="w-full max-w-sm rounded-xl border font-mono text-[0.7rem]" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-base)" }}>
      <div className="flex items-center gap-1.5 border-b px-3 py-2" style={{ borderColor: "var(--border-subtle)" }}>
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[0.62rem]" style={{ color: "var(--text-muted)" }}>
          audit.log
        </span>
      </div>
      <div className="space-y-1.5 p-3">
        {rows.map((r, i) => (
          <div key={r.event} className="seq-type flex items-center justify-between gap-2" style={{ animationDelay: `${i * 0.45}s` }}>
            <span className="flex items-center gap-2 truncate" style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--text-muted)" }}>{String(i + 1).padStart(2, "0")}</span>
              {r.event}
            </span>
            <span style={{ color: i === rows.length - 1 ? "var(--status-live)" : "var(--accent)" }}>{r.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoleMatrix() {
  const cols = ["View", "Assign", "Govern"];
  const roles = [
    { role: "Admin", access: [true, true, true] },
    { role: "Teacher", access: [true, true, false] },
    { role: "Student", access: [true, false, false] },
  ];
  return (
    <div className="w-full max-w-md rounded-xl border p-4" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-base)" }}>
      <div className="mb-2 grid grid-cols-[1fr_repeat(3,3.25rem)] items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
        <span>Role</span>
        {cols.map((c) => (
          <span key={c} className="text-center">
            {c}
          </span>
        ))}
      </div>
      {roles.map((r, ri) => (
        <div key={r.role} className="seq-light grid grid-cols-[1fr_repeat(3,3.25rem)] items-center gap-2 rounded-lg border px-2 py-1.5 text-[0.72rem]" style={{ ...chipStyle, background: "transparent", borderColor: "transparent", animationDelay: `${ri * 2}s` }}>
          <span className="font-semibold">{r.role}</span>
          {r.access.map((ok, i) => (
            <span key={i} className="flex justify-center">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md"
                style={{ background: ok ? "var(--accent-soft)" : "transparent", border: ok ? "none" : "1px solid var(--border-subtle)" }}
              >
                {ok ? <Check size={12} style={{ color: "var(--accent)" }} /> : <Lock size={10} style={{ color: "var(--text-muted)" }} />}
              </span>
            </span>
          ))}
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
      className="dot-grid relative flex h-60 items-center justify-center overflow-hidden rounded-xl border px-4"
      style={{ borderColor: "var(--border-subtle)", background: "color-mix(in srgb, var(--bg-base) 55%, transparent)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 70% at 50% 50%, var(--accent-soft), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative flex w-full justify-center">
        <Visual />
      </div>
    </div>
  );
}
