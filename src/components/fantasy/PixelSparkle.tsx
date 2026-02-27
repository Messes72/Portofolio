"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PixelSparkleProps {
  className?: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
  color?: "yellow" | "white" | "pink" | "blue";
}

const colors = {
  yellow: "#FFD54F",
  white: "#FFFFFF",
  pink: "#F48FB1",
  blue: "#4FC3F7",
};

const sizes = {
  sm: 12,
  md: 16,
  lg: 24,
};

export function PixelSparkle({
  className,
  delay = 0,
  size = "md",
  color = "yellow",
}: PixelSparkleProps) {
  const fillColor = colors[color];
  const pixelSize = sizes[size];

  return (
    <motion.div
      className={cn("absolute pointer-events-none", className)}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 4-point star */}
        <rect x="7" y="0" width="2" height="4" fill={fillColor} />
        <rect x="7" y="12" width="2" height="4" fill={fillColor} />
        <rect x="0" y="7" width="4" height="2" fill={fillColor} />
        <rect x="12" y="7" width="4" height="2" fill={fillColor} />
        {/* Center */}
        <rect x="6" y="6" width="4" height="4" fill={fillColor} />
      </svg>
    </motion.div>
  );
}

interface PixelSparklesProps {
  className?: string;
  count?: number;
}

export function PixelSparkles({ className, count = 10 }: PixelSparklesProps) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    size: ["sm", "md", "lg"][Math.floor(Math.random() * 3)] as "sm" | "md" | "lg",
    color: ["yellow", "white", "pink", "blue"][Math.floor(Math.random() * 4)] as
      | "yellow"
      | "white"
      | "pink"
      | "blue",
  }));

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {sparkles.map((sparkle) => (
        <PixelSparkle
          key={sparkle.id}
          className="absolute"
          style={{
            top: sparkle.top,
            left: sparkle.left,
          } as React.CSSProperties}
          delay={sparkle.delay}
          size={sparkle.size}
          color={sparkle.color}
        />
      ))}
    </div>
  );
}
