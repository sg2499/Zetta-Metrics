import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Zetta Metrics about our products or a partnership.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
