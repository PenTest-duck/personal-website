"use client";

import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();
  // Use lazy initializer to check if we're on the client side
  const [mounted] = useState(() => typeof window !== "undefined");

  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  if (!mounted || !theme) {
    return null;
  }

  return (
    <Toggle
      aria-label="Toggle theme"
      onPressedChange={toggleTheme}
      className="border-2"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Toggle>
  );
};

export default ThemeSwitch;
