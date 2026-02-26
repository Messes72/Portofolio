"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch disabled className="cursor-not-allowed" />
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={`h-4 w-4 transition-colors duration-300 ${
          !isDark ? "text-amber-500" : "text-muted-foreground"
        }`}
      />
      <Switch
        checked={isDark}
        onCheckedChange={handleToggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className="data-[state=checked]:bg-slate-700"
      />
      <Moon
        className={`h-4 w-4 transition-colors duration-300 ${
          isDark ? "text-indigo-400" : "text-muted-foreground"
        }`}
      />
    </div>
  );
}
