"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const ICON_SIZE = 20;

  return (
    <button
      onClick={toggleTheme}
      className="text-muted-foreground hover:text-foreground transition-colors mx-2"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon size={ICON_SIZE} />
      ) : (
        <Sun size={ICON_SIZE} />
      )}
    </button>
  );
};

export { ThemeSwitcher };