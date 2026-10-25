import { Building2, MapPin } from "lucide-react";
import { brand } from "@/lib/content";

const label = "text-[0.68rem] font-bold uppercase tracking-[0.16em]";

/**
 * The company's registered particulars (as filed with the Ministry of
 * Corporate Affairs), set out as one tidy card: name, CIN and incorporation
 * date side by side, then the registered office as a proper address block.
 * Shared by the Company and Contact pages so both read identically.
 */
export default function CompanyDetails({ title = "Company details", className = "" }: { title?: string; className?: string }) {
  return (
    <div className={`surface-card overflow-hidden ${className}`}>
      <div className="px-6 py-5">
        <p className={`${label} flex items-center gap-2`} style={{ color: "var(--accent)" }}>
          <Building2 size={13} /> {title}
        </p>
        <p className="mt-2 font-display text-base font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
          {brand.legalName}
        </p>
      </div>

      <dl className="grid border-t sm:grid-cols-2" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="px-6 py-4">
          <dt className={label} style={{ color: "var(--text-muted)" }}>
            CIN
          </dt>
          <dd className="mt-1.5 font-mono text-[0.8rem] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
            {brand.cin}
          </dd>
        </div>
        <div className="border-t px-6 py-4 sm:border-l sm:border-t-0" style={{ borderColor: "var(--border-subtle)" }}>
          <dt className={label} style={{ color: "var(--text-muted)" }}>
            Incorporated
          </dt>
          <dd className="mt-1.5 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            {brand.incorporated}
          </dd>
        </div>
      </dl>

      <div className="border-t px-6 py-5" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="min-w-0">
          <p className={`${label} flex items-center gap-1.5`} style={{ color: "var(--text-muted)" }}>
            <MapPin size={12} /> Registered office
          </p>
          <address className="mt-2 text-sm not-italic leading-6" style={{ color: "var(--text-secondary)" }}>
            {brand.registeredOffice.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
      </div>
    </div>
  );
}
