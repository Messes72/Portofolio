"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-10 h-10">
        <div className="w-5 h-5 animate-pulse bg-muted rounded" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={`h-4 w-4 transition-colors duration-200 ${
          isDark ? "text-muted-foreground" : "text-foreground"
        }`}
      />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle theme"
        className="data-[state=checked]:bg-primary"
      />
      <Moon
        className={`h-4 w-4 transition-colors duration-200 ${
          isDark ? "text-foreground" : "text-muted-foreground"
        }`}
      />
    </div>
  );
}
