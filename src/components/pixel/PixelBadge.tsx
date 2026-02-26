"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const pixelBadgeVariants = cva(
  "inline-flex items-center justify-center font-bold text-[10px] uppercase tracking-wider select-none",
  {
    variants: {
      variant: {
        pink: "bg-[#FF6B9D] text-white",
        cyan: "bg-[#00D9FF] text-black",
        yellow: "bg-[#FFD93D] text-black",
        purple: "bg-[#A855F7] text-white",
        green: "bg-[#22C55E] text-black",
        red: "bg-[#EF4444] text-white",
        blue: "bg-[#3B82F6] text-white",
        orange: "bg-[#F97316] text-black",
      },
      size: {
        sm: "px-2 py-0.5 text-[8px]",
        md: "px-3 py-1 text-[10px]",
        lg: "px-4 py-1.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "pink",
      size: "md",
    },
  }
);

export interface PixelBadgeProps extends VariantProps<typeof pixelBadgeVariants> {
  children: React.ReactNode;
  animate?: boolean;
  className?: string;
  id?: string;
}

export function PixelBadge({
  children,
  variant = "pink",
  size = "md",
  animate = true,
  className,
  id,
}: PixelBadgeProps) {
  const baseClasses = cn(
    pixelBadgeVariants({ variant, size }),
    "border-0",
    className
  );

  const pixelBorderStyle = {
    boxShadow: `
      -2px 0 0 0 black,
       2px 0 0 0 black,
       0 -2px 0 0 black,
       0 2px 0 0 black
    `,
  };

  if (!animate) {
    return (
      <span id={id} className={baseClasses} style={pixelBorderStyle}>
        {children}
      </span>
    );
  }

  return (
    <motion.span
      id={id}
      className={baseClasses}
      style={pixelBorderStyle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.1 },
      }}
    >
      {children}
    </motion.span>
  );
}

export default PixelBadge;
