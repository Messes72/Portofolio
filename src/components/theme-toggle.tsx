"use client";

import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Theme cycle: system -> dark -> light -> system
const themeCycle = ["system", "dark", "light"] as const;
type ThemeMode = (typeof themeCycle)[number];

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch using layout effect
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <div className="h-5 w-9 rounded-full bg-muted" />
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  // Determine current mode (normalize to system, dark, or light)
  const currentMode: ThemeMode = (theme as ThemeMode) || "system";

  // Get effective theme (for system mode, use system preference)
  const effectiveTheme = currentMode === "system" ? systemTheme : currentMode;
  const isDark = effectiveTheme === "dark";

  // Cycle to next theme
  const handleToggle = () => {
    const currentIndex = themeCycle.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % themeCycle.length;
    setTheme(themeCycle[nextIndex]);
  };

  // Get label for current mode
  const getModeLabel = () => {
    switch (currentMode) {
      case "system":
        return "System";
      case "dark":
        return "Dark";
      case "light":
        return "Light";
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Sun icon - active in light mode */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentMode === "light" ? "sun-active" : "sun-inactive"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <Sun
            className={`h-4 w-4 transition-colors ${
              currentMode === "light" ? "text-amber-500" : "text-muted-foreground"
            }`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={handleToggle}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="relative flex items-center justify-center h-6 w-14 rounded-full bg-muted hover:bg-muted/80 transition-colors"
        aria-label={`Theme: ${getModeLabel()}. Click to change.`}
      >
        {/* Track indicator */}
        <motion.div
          className="absolute h-5 w-5 rounded-full bg-primary shadow-md"
          animate={{
            x: currentMode === "system" ? -14 : currentMode === "dark" ? 0 : 14,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />

        {/* Icons inside track */}
        <div className="relative z-10 flex items-center justify-between w-full px-1">
          <Monitor className="h-3 w-3 text-muted-foreground" />
          <Moon className="h-3 w-3 text-muted-foreground" />
          <Sun className="h-3 w-3 text-muted-foreground" />
        </div>
      </motion.button>

      {/* Moon icon - active in dark mode */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentMode === "dark" ? "moon-active" : "moon-inactive"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <Moon
            className={`h-4 w-4 transition-colors ${
              currentMode === "dark" ? "text-indigo-400" : "text-muted-foreground"
            }`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Current mode label */}
      <motion.span
        key={getModeLabel()}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.15 }}
        className="text-xs font-medium text-muted-foreground min-w-[3rem]"
      >
        {getModeLabel()}
      </motion.span>
    </div>
  );
}