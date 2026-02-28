"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const pixelContainerVariants = cva(
  "relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-[#7CB342]",    // grass-green (default nature)
        accent: "border-[#F48FB1]",     // flower-pink
        highlight: "border-[#FFD54F]", // sun-yellow
        wood: "border-[#8D6E63]",       // earth-brown
        green: "border-[#7CB342]",      // grass-green
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface PixelContainerProps extends VariantProps<typeof pixelContainerVariants> {
  children: React.ReactNode;
  className?: string;
  showScanlines?: boolean;
  showGlow?: boolean;
  animate?: boolean;
}

export function PixelContainer({
  children,
  variant = "default",
  size = "md",
  className,
  showScanlines = false,
  showGlow = false,
  animate = true,
}: PixelContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  // Map variant to nature colors for glow and borders
  const variantColors = {
    default: "#7CB342",    // grass-green (default nature)
    accent: "#F48FB1",     // flower-pink
    highlight: "#FFD54F",  // sun-yellow
    wood: "#8D6E63",       // earth-brown
    green: "#7CB342",      // grass-green
  };

  const color = variantColors[variant || "default"];

  // Pixel border using box-shadow technique
  const pixelBorderStyle = {
    boxShadow: `
      inset -4px 0 0 0 rgba(255,255,255,0.05),
      inset 0 -4px 0 0 rgba(0,0,0,0.3),
      inset 4px 0 0 0 rgba(0,0,0,0.2),
      inset 0 4px 0 0 rgba(255,255,255,0.03),
      -4px 0 0 0 ${color},
       4px 0 0 0 ${color},
       0 -4px 0 0 ${color},
       0 4px 0 0 ${color}
    `,
  };

  const glowStyle = showGlow ? {
    boxShadow: `
      inset -4px 0 0 0 rgba(255,255,255,0.05),
      inset 0 -4px 0 0 rgba(0,0,0,0.3),
      inset 4px 0 0 0 rgba(0,0,0,0.2),
      inset 0 4px 0 0 rgba(255,255,255,0.03),
      -4px 0 0 0 ${color},
       4px 0 0 0 ${color},
       0 -4px 0 0 ${color},
       0 4px 0 0 ${color},
       0 0 20px ${color}40,
       0 0 40px ${color}20
    `,
  } : pixelBorderStyle;

  const containerContent = (
    <div
      className={cn(
        "bg-[#FFF8E7]",
        pixelContainerVariants({ variant, size }),
        className
      )}
      style={glowStyle}
    >
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

  if (!animate || prefersReducedMotion) {
    return containerContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.005,
        transition: { duration: 0.1 },
      }}
    >
      {containerContent}
    </motion.div>
  );
}

export default PixelContainer;
