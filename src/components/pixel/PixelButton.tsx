"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const pixelButtonVariants = cva(
  "relative inline-flex items-center justify-center font-bold uppercase tracking-wider transition-colors cursor-pointer select-none",
  {
    variants: {
      variant: {
        pink: "bg-[#F48FB1] text-white",        // flower-pink
        cyan: "bg-[#4FC3F7] text-white",        // water-blue
        yellow: "bg-[#FFD54F] text-[#3E2723]",   // sun-yellow
        purple: "bg-[#9D4EDD] text-white",      // keep purple as accent
        green: "bg-[#7CB342] text-white",      // grass-green
        nature: "bg-[#7CB342] text-white",      // alias for grass-green
        earth: "bg-[#8D6E63] text-white",       // earth-brown
        sky: "bg-[#87CEEB] text-[#3E2723]",     // sky-blue
      },
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "pink",
      size: "md",
    },
  }
);

export interface PixelButtonProps extends VariantProps<typeof pixelButtonVariants> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function PixelButton({
  children,
  variant = "pink",
  size = "md",
  className,
  onClick,
  disabled,
  type = "button",
}: PixelButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const baseClasses = cn(
    pixelButtonVariants({ variant, size }),
    "border-0 outline-none",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  // 8-bit pixel border using box-shadow technique
  const pixelBorder = {
    boxShadow: `
      -4px 0 0 0 black,
       4px 0 0 0 black,
       0 -4px 0 0 black,
       0 4px 0 0 black,
      -4px -4px 0 0 black,
       4px -4px 0 0 black,
      -4px 4px 0 0 black,
       4px 4px 0 0 black
    `,
  };

  if (prefersReducedMotion) {
    return (
      <button
        type={type}
        className={baseClasses}
        style={pixelBorder}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      className={cn(baseClasses, "will-change-transform")}
      style={pixelBorder}
      onClick={onClick}
      disabled={disabled}
      whileHover={{
        scale: disabled ? 1 : 1.02,
      }}
      whileTap={{
        y: disabled ? 0 : 4,
        boxShadow: disabled ? pixelBorder.boxShadow : `
          -4px 0 0 0 black,
           4px 0 0 0 black,
           0 -4px 0 0 black,
           0 0px 0 0 black,
          -4px -4px 0 0 black,
           4px -4px 0 0 black,
          -4px 0px 0 0 black,
           4px 0px 0 0 black
        `,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        restDelta: 0.001,
      }}
    >
      <motion.span className="relative z-10">
        {children}
      </motion.span>
    </motion.button>
  );
}

export default PixelButton;
