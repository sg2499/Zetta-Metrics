"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

/**
 * Both icons are always rendered; CSS shows the right one from the page's
 * data-theme, so the button is correct from the very first frame.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Switch between light and dark mode"
      className={`theme-toggle flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${className}`}
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-raised)",
        color: "var(--text-secondary)",
      }}
    >
      <Sun size={17} className="theme-icon-sun" />
      <Moon size={17} className="theme-icon-moon" />
    </button>
  );
}
