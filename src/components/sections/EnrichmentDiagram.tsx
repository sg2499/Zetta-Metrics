import { ArrowRight, Building2, Boxes, Lock, Repeat, ShieldCheck } from "lucide-react";

/**
 * A schematic of how School Enrichment fits together — school structure,
 * Curriculum Studio, the five-day learning loop, and the protection that
 * wraps all of it. Built only from what the product actually does; it is
 * an explanatory diagram, not a mock screenshot.
 */

const chip = "rounded-md border px-2.5 py-1.5 text-[0.7rem] font-medium";
const chipStyle = { borderColor: "var(--border-subtle)", background: "var(--bg-base)", color: "var(--text-secondary)" } as const;

function StageHeader({ n, icon: Icon, title }: { n: string; icon: typeof Building2; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{ background: "linear-gradient(150deg, var(--accent-strong), var(--accent))", color: "var(--text-on-accent)" }}
      >
        <Icon size={16} />
      </span>
      <div>
        <p className="font-mono text-[0.62rem] font-semibold" style={{ color: "var(--accent)" }}>
          {n}
        </p>
        <p className="font-display text-sm font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
          {title}
        </p>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex items-center justify-center py-1 lg:py-0" aria-hidden="true">
      <ArrowRight size={16} className="rotate-90 lg:rotate-0" style={{ color: "var(--accent)" }} />
    </div>
  );
}

export default function EnrichmentDiagram() {
  return (
    <div className="product-frame">
      <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-elevated)" }}>
        <span className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
          How the platform fits together
        </span>
        <span className="hidden items-center gap-1.5 text-xs font-medium sm:flex" style={{ color: "var(--text-muted)" }}>
          <ShieldCheck size={13} style={{ color: "var(--accent)" }} /> Protected end to end
        </span>
      </div>

      <div className="dot-grid p-5 sm:p-8">
        <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1.3fr] lg:gap-4">
          {/* 1. School structure */}
          <div className="surface-card p-5">
            <StageHeader n="01" icon={Building2} title="School structure" />
            <div className="flex flex-col items-center gap-2">
              <span className={chip} style={{ ...chipStyle, borderColor: "var(--glow-primary)", color: "var(--text-primary)" }}>
                Super Admin
              </span>
              <span className="h-3 w-px" style={{ background: "var(--border-strong)" }} />
              <span className={chip} style={chipStyle}>
                School
              </span>
              <span className="h-3 w-px" style={{ background: "var(--border-strong)" }} />
              <div className="flex flex-wrap justify-center gap-1.5">
                {["Admin", "Teacher", "Student"].map((r) => (
                  <span key={r} className={chip} style={chipStyle}>
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Connector />

          {/* 2. Curriculum Studio */}
          <div className="surface-card p-5">
            <StageHeader n="02" icon={Boxes} title="Curriculum Studio" />
            <div className="space-y-1.5">
              {[
                { label: "Excel import", tone: "var(--text-secondary)" },
                { label: "Structural checks", tone: "var(--text-secondary)" },
                { label: "Math-pattern checks", tone: "var(--text-secondary)" },
                { label: "Approved & published", tone: "var(--status-live)" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-[0.7rem] font-medium" style={{ ...chipStyle, color: s.tone }}>
                  <span className="font-mono text-[0.6rem]" style={{ color: "var(--text-muted)" }}>
                    {i + 1}
                  </span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          <Connector />

          {/* 3. Five-day learning loop */}
          <div className="surface-card p-5">
            <StageHeader n="03" icon={Repeat} title="Five-day learning loop" />
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((d) => (
                <span
                  key={d}
                  className="flex h-9 items-center justify-center rounded-md border text-[0.68rem] font-bold"
                  style={{ borderColor: "var(--glow-primary)", background: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  D{d}
                </span>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {["Assign", "Attempt", "Auto-mark"].map((s) => (
                <span key={s} className={`${chip} text-center`} style={chipStyle}>
                  {s}
                </span>
              ))}
            </div>
            <div
              className="mt-3 flex items-center gap-2 rounded-md border border-dashed px-2.5 py-1.5 text-[0.7rem] font-medium"
              style={{ borderColor: "var(--status-dev)", color: "var(--status-dev)" }}
            >
              <span className="status-dot" style={{ background: "var(--status-dev)" }} />
              Foundation Repair — for students who need it
            </div>
          </div>
        </div>

        {/* 4. Protection wraps everything */}
        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-3"
          style={{ borderColor: "var(--glow-primary)" }}
        >
          <span className="mr-1 flex items-center gap-1.5 font-mono text-[0.62rem] font-semibold" style={{ color: "var(--accent)" }}>
            04 <Lock size={12} />
          </span>
          {["Role-scoped access", "Session hygiene", "Data export & privacy"].map((p) => (
            <span key={p} className={chip} style={chipStyle}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
