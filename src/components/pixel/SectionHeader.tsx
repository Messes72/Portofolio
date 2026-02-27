"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const sectionHeaderVariants = cva(
  "relative flex flex-col items-center justify-center text-center mb-8 md:mb-12",
  {
    variants: {
      variant: {
        default: "",
        accent: "",
        highlight: "",
        purple: "",
        green: "",
      },
      size: {
        sm: "mb-6",
        md: "mb-8 md:mb-12",
        lg: "mb-10 md:mb-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface SectionHeaderProps extends VariantProps<typeof sectionHeaderVariants> {
  title: string;
  subtitle?: string;
  className?: string;
  icon?: React.ReactNode;
  showDecoration?: boolean;
  animate?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  variant = "default",
  size = "md",
  className,
  icon,
  showDecoration = true,
  animate = true,
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();

  // Map variant to pixel colors
  const variantColors = {
    default: {
      primary: "#00F5FF",
      text: "#F8F9FA",
    },
    accent: {
      primary: "#FF006E",
      text: "#F8F9FA",
    },
    highlight: {
      primary: "#FFD60A",
      text: "#F8F9FA",
    },
    purple: {
      primary: "#9D4EDD",
      text: "#F8F9FA",
    },
    green: {
      primary: "#39FF14",
      text: "#F8F9FA",
    },
  };

  const colors = variantColors[variant || "default"];

  // Pixel corner decorations
  const CornerDecoration = ({ position }: { position: "tl" | "tr" | "bl" | "br" }) => {
    const positions = {
      tl: "-top-2 -left-2",
      tr: "-top-2 -right-2",
      bl: "-bottom-2 -left-2",
      br: "-bottom-2 -right-2",
    };

    return (
      <div
        className={cn("absolute w-3 h-3", positions[position])}
        style={{ backgroundColor: colors.primary }}
      />
    );
  };

  const content = (
    <div className={cn(sectionHeaderVariants({ variant, size }), className)}>
      {/* Pixel bracket decorations */}
      {showDecoration && (
        <>
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-4 flex items-center gap-2"
            style={{ color: colors.primary }}
          >
            <span className="text-lg">◄</span>
            <div
              className="h-px w-12 md:w-20"
              style={{
                background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
              }}
            />
            {icon && (
              <span className="mx-2 text-lg">{icon}</span>
            )}
            <div
              className="h-px w-12 md:w-20"
              style={{
                background: `linear-gradient(to left, transparent, ${colors.primary}, transparent)`,
              }}
            />
            <span className="text-lg">▶</span>
          </div>
        </>
      )}

      {/* Title with pixel font */}
      <h2
        className="font-pixel text-xl md:text-2xl lg:text-3xl uppercase tracking-wider"
        style={{ color: colors.text }}
      >
        {title}
      </h2>

      {/* Subtitle with VT323 */}
      {subtitle && (
        <p
          className="font-vt323 text-lg md:text-xl mt-2 opacity-80"
          style={{ color: colors.primary }}
        >
          &gt; {subtitle} _
        </p>
      )}

      {/* Bottom decoration */}
      {showDecoration && (
        <div className="mt-4 flex items-center gap-2">
          <div
            className="h-1 w-8"
            style={{ backgroundColor: colors.primary }}
          />
          <div
            className="h-1 w-2"
            style={{ backgroundColor: colors.primary, opacity: 0.6 }}
          />
          <div
            className="h-1 w-2"
            style={{ backgroundColor: colors.primary, opacity: 0.4 }}
          />
        </div>
      )}
    </div>
  );

  if (!animate || prefersReducedMotion) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {content}
    </motion.div>
  );
}

export default SectionHeader;
