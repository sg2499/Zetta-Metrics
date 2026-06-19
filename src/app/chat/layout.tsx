import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Concierge",
  description:
    "Preview the ZettaMetrics AI concierge and future ShaileshGPT-powered RAG assistant experience.",
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
