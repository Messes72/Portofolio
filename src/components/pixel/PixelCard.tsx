"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface PixelCardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  showScanlines?: boolean;
  variant?: "default" | "primary" | "secondary" | "accent" | "highlight";
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
    default: "bg-[#240946] border-[#00F5FF]",
    primary: "bg-[#240946] border-[#FF006E]",
    secondary: "bg-[#240946] border-[#FFD60A]",
    accent: "bg-[#240946] border-[#9D4EDD]",
    highlight: "bg-[#240946] border-[#39FF14]",
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
            variant === "default" && "bg-[#1A0B2E] border-b-4 border-[#00F5FF]",
            variant === "primary" && "bg-[#1A0B2E] border-b-4 border-[#FF006E]",
            variant === "secondary" && "bg-[#1A0B2E] border-b-4 border-[#FFD60A]",
            variant === "accent" && "bg-[#1A0B2E] border-b-4 border-[#9D4EDD]",
            variant === "highlight" && "bg-[#1A0B2E] border-b-4 border-[#39FF14]"
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
