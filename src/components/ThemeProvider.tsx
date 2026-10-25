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
// A page link may carry the visitor's mode as "#zt-light" / "#zt-dark". This
// is how the choice travels between pages where storage is unavailable (for
// example inside an embedded preview); everywhere else storage is enough.
const HASH_PREFIX = "#zt-";

const isTheme = (t: unknown): t is Theme => t === "light" || t === "dark";

function recall(): Theme | null {
  try {
    const h = window.location.hash;
    if (h.startsWith(HASH_PREFIX) && isTheme(h.slice(HASH_PREFIX.length))) return h.slice(HASH_PREFIX.length) as Theme;
  } catch {}
  try {
    const t = window.localStorage.getItem(STORAGE_KEY);
    if (isTheme(t)) return t;
  } catch {}
  return null;
}

function remember(theme: Theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
}

declare global {
  interface Window {
    __zt?: Theme;
  }
}

const readAttr = (): Theme | null => {
  const a = document.documentElement.getAttribute("data-theme");
  return isTheme(a) ? a : null;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    // The inline script normally sets this before first paint; re-apply here
    // in case a host page rebuilt <html> after that script ran.
    const current = (isTheme(window.__zt) ? window.__zt : null) ?? readAttr() ?? recall() ?? "dark";
    window.__zt = current;
    document.documentElement.setAttribute("data-theme", current);
    remember(current);
    setThemeState(current);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    window.__zt = next;
    document.documentElement.setAttribute("data-theme", next);
    remember(next);
  };

  // Read the page itself, so the toggle is right even before state settles.
  const toggleTheme = () => setTheme((readAttr() ?? theme) === "dark" ? "light" : "dark");

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

// Runs before first paint on every page load: a mode carried by the link,
// else the saved choice, else dark (the site's default, whatever the OS prefers).
// It also keeps the mode on <html> while the page loads, in case a host page
// (an embedded preview) rebuilds the element after this script has run.
export const themeInitScript = `(function(){var t=null;try{var h=location.hash;if(h.indexOf('${HASH_PREFIX}')===0)t=h.slice(${HASH_PREFIX.length});}catch(e){}if(t!=='light'&&t!=='dark'){try{t=localStorage.getItem('${STORAGE_KEY}');}catch(e){}}if(t!=='light'&&t!=='dark')t='dark';window.__zt=t;var a=function(){var d=document.documentElement;if(d&&window.__zt&&d.getAttribute('data-theme')!==window.__zt)d.setAttribute('data-theme',window.__zt);};a();try{localStorage.setItem('${STORAGE_KEY}',t);}catch(e){}try{var o=new MutationObserver(a);o.observe(document,{childList:true,subtree:true,attributes:true,attributeFilter:['data-theme']});window.addEventListener('load',function(){setTimeout(function(){o.disconnect();},4000);});}catch(e){}})();`;

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
