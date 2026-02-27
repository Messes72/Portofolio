"use client";

import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useState } from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type ThemeMode = "system" | "dark" | "light";

const themeOptions: { value: ThemeMode; label: string; icon: React.ElementType }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle hydration mismatch using layout effect
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-theme-toggle]")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

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

  // Determine current mode
  const currentMode: ThemeMode = (theme as ThemeMode) || "system";
  const currentOption = themeOptions.find((opt) => opt.value === currentMode) || themeOptions[2];
  const Icon = currentOption.icon;

  const handleSelect = (mode: ThemeMode) => {
    setTheme(mode);
    setIsOpen(false);
  };

  return (
    <div className="relative" data-theme-toggle>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
        aria-label={`Theme: ${currentOption.label}. Click to change.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Icon className="h-4 w-4 text-foreground" />
        <span className="text-xs font-medium text-muted-foreground min-w-[3rem] text-left">
          {currentOption.label}
        </span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-32 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50"
            role="listbox"
            aria-label="Theme options"
          >
            {themeOptions.map((option) => {
              const OptionIcon = option.icon;
              const isSelected = currentMode === option.value;
              return (
                <motion.button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                    isSelected
                      ? "bg-accent text-accent-foreground"
                      : "text-popover-foreground hover:bg-muted"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <OptionIcon className="h-4 w-4" />
                  <span className="flex-1 text-left">{option.label}</span>
                  {isSelected && <Check className="h-3 w-3" />}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
