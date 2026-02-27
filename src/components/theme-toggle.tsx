"use client";

import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type ThemeMode = "system" | "dark" | "light";

interface ThemeOption {
  value: ThemeMode;
  label: string;
  icon: React.ElementType;
}

const themeOptions: ThemeOption[] = [
  { value: "light", label: "LIGHT", icon: Sun },
  { value: "dark", label: "DARK", icon: Moon },
  { value: "system", label: "AUTO", icon: Monitor },
];

// Pixel border using box-shadow technique - Nature theme
const pixelBorder = {
  boxShadow: `
    -3px 0 0 0 #7CB342,
     3px 0 0 0 #7CB342,
     0 -3px 0 0 #7CB342,
     0 3px 0 0 #7CB342,
    -3px -3px 0 0 #7CB342,
     3px -3px 0 0 #7CB342,
    -3px 3px 0 0 #7CB342,
     3px 3px 0 0 #7CB342
  `,
};

// Active/pressed pixel border (offset down)
const pixelBorderPressed = {
  boxShadow: `
    -3px 0 0 0 #7CB342,
     3px 0 0 0 #7CB342,
     0 -3px 0 0 #7CB342,
     0 0px 0 0 #7CB342,
    -3px -3px 0 0 #7CB342,
     3px -3px 0 0 #7CB342,
    -3px 0px 0 0 #7CB342,
     3px 0px 0 0 #7CB342
  `,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Handle hydration mismatch using layout effect
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex items-center">
        <div className="h-10 w-[120px] bg-muted" style={pixelBorder} />
      </div>
    );
  }

  const currentMode: ThemeMode = (theme as ThemeMode) || "system";

  const handleSelect = (mode: ThemeMode) => {
    setTheme(mode);
  };

  return (
    <div
      className="inline-flex bg-[#8D6E63] p-1"
      style={pixelBorder}
      role="group"
      aria-label="Theme selection"
    >
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const isSelected = currentMode === option.value;

        return (
          <PixelThemeButton
            key={option.value}
            option={option}
            isSelected={isSelected}
            onClick={() => handleSelect(option.value)}
            prefersReducedMotion={prefersReducedMotion}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="sr-only">{option.label}</span>
          </PixelThemeButton>
        );
      })}
    </div>
  );
}

interface PixelThemeButtonProps {
  option: ThemeOption;
  isSelected: boolean;
  onClick: () => void;
  prefersReducedMotion: boolean;
  children: React.ReactNode;
}

function PixelThemeButton({
  option,
  isSelected,
  onClick,
  prefersReducedMotion,
  children,
}: PixelThemeButtonProps) {
  // Base classes
  const baseClasses = cn(
    "relative flex items-center justify-center",
    "w-8 h-8",
    "font-pixel text-[8px] uppercase tracking-wider",
    "cursor-pointer select-none",
    "border-0 outline-none",
    "transition-colors duration-150"
  );

  // Dynamic colors based on selection
  const colorClasses = isSelected
    ? "bg-[#7CB342] text-black"
    : "bg-[#8D6E63] text-[#7CB342] hover:bg-[#6D4C41]";

  if (prefersReducedMotion) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(baseClasses, colorClasses)}
        aria-pressed={isSelected}
        aria-label={option.label}
        title={option.label}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(baseClasses, colorClasses, "will-change-transform")}
      aria-pressed={isSelected}
      aria-label={option.label}
      title={option.label}
      whileHover={{
        scale: isSelected ? 1 : 1.05,
      }}
      whileTap={{
        y: 2,
        scale: 0.95,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
    >
      {/* Selection indicator glow effect */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-[#7CB342]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            boxShadow: "0 0 8px 2px rgba(0, 245, 255, 0.5)",
          }}
        />
      )}

      {/* Icon container with z-index to appear above glow */}
      <motion.span
        className="relative z-10 flex items-center justify-center"
        animate={{
          y: isSelected ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {children}
      </motion.span>

      {/* Pixel indicator arrow above selected button */}
      {isSelected && (
        <motion.div
          className="absolute -top-1.5 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 2 }}
          transition={{ duration: 0.15 }}
        >
          <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#7CB342]" />
        </motion.div>
      )}
    </motion.button>
  );
}

export default ThemeToggle;
