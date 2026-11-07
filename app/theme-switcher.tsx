"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeController() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(current =>
          current === "light" ? "dark" : "light"
        )
      }
      aria-label="Zmień motyw"
    >
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
}
