"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface PixelCardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  showScanlines?: boolean;
  variant?: "default" | "primary" | "secondary";
}

export function PixelCard({
  children,
  header,
  className,
  showScanlines = false,
  variant = "default",
}: PixelCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const variantStyles = {
    default: "bg-[#1a1a2e] border-[#4a4a6a]",
    primary: "bg-[#2d1b4e] border-[#a855f7]",
    secondary: "bg-[#1e3a3a] border-[#22c55e]",
  };

  // 8-bit pixel border with inner highlight
  const pixelBorderStyle = {
    boxShadow: `
      inset -4px 0 0 0 rgba(255,255,255,0.1),
      inset 0 -4px 0 0 rgba(0,0,0,0.3),
      inset 4px 0 0 0 rgba(0,0,0,0.2),
      inset 0 4px 0 0 rgba(255,255,255,0.05),
      -4px 0 0 0 currentColor,
       4px 0 0 0 currentColor,
       0 -4px 0 0 currentColor,
       0 4px 0 0 currentColor
    `,
  };

  const cardContent = (
    <div
      className={cn(
        "relative overflow-hidden",
        variantStyles[variant],
        header ? "pt-0" : "p-6"
      )}
      style={pixelBorderStyle}
    >
      {header && (
        <div
          className={cn(
            "px-6 py-3 mb-4 -mx-6 -mt-0",
            variant === "default" && "bg-[#2a2a4a] border-b-4 border-[#4a4a6a]",
            variant === "primary" && "bg-[#4a2a7a] border-b-4 border-[#a855f7]",
            variant === "secondary" && "bg-[#2a5a4a] border-b-4 border-[#22c55e]"
          )}
        >
          {header}
        </div>
      )}

      {/* Scanlines overlay */}
      {showScanlines && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-30"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.3) 2px,
                rgba(0, 0, 0, 0.3) 4px
              )
            `,
          }}
        />
      )}

      <div className="relative z-20">{children}</div>
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative", className)}>
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.1 },
      }}
    >
      {cardContent}
    </motion.div>
  );
}

export default PixelCard;
