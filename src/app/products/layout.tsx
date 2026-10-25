import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "The MathPath Platform and Krama: two Ed-Tech platforms built by Zetta Metrics on one shared foundation.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
