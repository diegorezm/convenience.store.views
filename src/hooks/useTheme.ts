import { useState } from "react";

type Theme = "dark" | "light"
const storageKey = "theme"

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(storageKey) || "light";
      if (["dark", "light"].includes(storedTheme)) {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(storedTheme)
        return storedTheme as Theme;
      }
      return "light"
    }
    return "dark"
  })

  const persistTheme = (theme: Theme) => {
    setTheme(theme)
    localStorage.setItem(storageKey, theme);
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }

  return { theme, setTheme, persistTheme }
}
