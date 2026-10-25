"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "zetta-theme";
// Backup carrier for the choice: the tab's window.name survives page loads in
// the same tab even where storage is unavailable (private modes, sandboxed
// previews), so the chosen mode still follows the visitor between pages.
const NAME_PREFIX = "zetta-theme:";

function recall(): Theme | null {
  let t: string | null = null;
  try {
    t = window.localStorage.getItem(STORAGE_KEY);
  } catch {}
  if (t !== "light" && t !== "dark") {
    try {
      if (window.name.startsWith(NAME_PREFIX)) t = window.name.slice(NAME_PREFIX.length);
    } catch {}
  }
  return t === "light" || t === "dark" ? t : null;
}

function remember(theme: Theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
  try {
    if (!window.name || window.name.startsWith(NAME_PREFIX)) window.name = NAME_PREFIX + theme;
  } catch {}
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    // The inline script normally sets this before paint; re-apply here in case
    // a host page rebuilt <html> after that script ran (embedded previews).
    const attr = document.documentElement.getAttribute("data-theme");
    const current: Theme = attr === "light" || attr === "dark" ? attr : (recall() ?? "dark");
    document.documentElement.setAttribute("data-theme", current);
    setThemeState(current);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    remember(next);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Runs before first paint on every page load: the visitor's saved choice if
// there is one, otherwise dark (the site's default, whatever the OS prefers).
export const themeInitScript = `(function(){var t=null;try{t=localStorage.getItem('${STORAGE_KEY}');}catch(e){}if(t!=='light'&&t!=='dark'){try{var n=window.name||'';if(n.indexOf('${NAME_PREFIX}')===0)t=n.slice(${NAME_PREFIX.length});}catch(e){}}if(t!=='light'&&t!=='dark')t='dark';document.documentElement.setAttribute('data-theme',t);})();`;

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
