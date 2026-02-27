"use client";

import { motion } from "framer-motion";

interface PixelCloudProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export function PixelCloud({
  className = "",
  size = "md",
  delay = 0,
  duration = 20,
  style,
}: PixelCloudProps) {
  const sizes = {
    sm: { width: 80, height: 40 },
    md: { width: 120, height: 60 },
    lg: { width: 180, height: 80 },
  };

  const { width, height } = sizes[size];

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ x: "-100%", opacity: 0.8 }}
      animate={{
        x: ["0%", "100vw"],
        y: [0, -10, 5, -5, 0],
      }}
      transition={{
        x: {
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{ width, height }}
    >
      <svg
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ imageRendering: "pixelated" }}
      >
        {/* Cloud pixels */}
        <rect x="20" y="20" width="20" height="20" fill="var(--cloud-white)" />
        <rect x="40" y="10" width="20" height="20" fill="var(--cloud-white)" />
        <rect x="60" y="10" width="20" height="20" fill="var(--cloud-white)" />
        <rect x="80" y="20" width="20" height="20" fill="var(--cloud-white)" />
        <rect x="40" y="30" width="40" height="20" fill="var(--cloud-white)" />
        <rect x="10" y="30" width="20" height="20" fill="var(--cloud-cream)" />
        <rect x="90" y="30" width="20" height="20" fill="var(--cloud-cream)" />
        {/* Cloud highlight */}
        <rect x="45" y="15" width="10" height="5" fill="var(--cloud-pure)" opacity="0.8" />
        <rect x="65" y="15" width="10" height="5" fill="var(--cloud-pure)" opacity="0.8" />
      </svg>
    </motion.div>
  );
}

export function PixelClouds({ count = 3 }: { count?: number }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: count }).map((_, i) => (
        <PixelCloud
          key={i}
          size={["sm", "md", "lg"][i % 3] as "sm" | "md" | "lg"}
          delay={i * 8}
          duration={25 + i * 10}
          className={`top-${20 + i * 15}`}
          style={{ top: `${10 + i * 20}%` }}
        />
      ))}
    </div>
  );
}
