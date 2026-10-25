"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Lets the footer sit inside the Krama page's palette when that page is open. */
export default function FooterShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const krama = pathname.startsWith("/products/krama");
  return <div className={krama ? "krama-zone krama-page" : undefined}>{children}</div>;
}
