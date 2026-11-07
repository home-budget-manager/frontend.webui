"use client";
import { useEffect, useState } from "react";

import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeController() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <a
      onClick={() =>
        setTheme(current =>
          current === "light" ? "dark" : "light"
        )
      }
      aria-label="Zmień motyw"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </a>
  );
}
