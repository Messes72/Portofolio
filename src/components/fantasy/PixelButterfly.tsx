"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PixelButterflyProps {
  className?: string;
  delay?: number;
  color?: "pink" | "blue" | "purple" | "orange";
}

const colors = {
  pink: { wing: "#F48FB1", wingDark: "#EC407A", body: "#3E2723" },
  blue: { wing: "#81D4FA", wingDark: "#29B6F6", body: "#3E2723" },
  purple: { wing: "#CE93D8", wingDark: "#AB47BC", body: "#3E2723" },
  orange: { wing: "#FFCC80", wingDark: "#FFA726", body: "#3E2723" },
};

export function PixelButterfly({
  className,
  delay = 0,
  color = "pink",
}: PixelButterflyProps) {
  const palette = colors[color];

  // Random flutter path
  const pathX = [0, 50, -30, 80, 20, 100];
  const pathY = [0, -40, -20, -60, -30, -50];

  return (
    <motion.div
      className={cn("absolute pointer-events-none", className)}
      animate={{
        x: pathX,
        y: pathY,
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left wing */}
        <motion.g
          animate={{ rotate: [-10, 10, -10] }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "16px 16px" }}
        >
          <rect x="2" y="8" width="10" height="12" fill={palette.wing} />
          <rect x="4" y="6" width="6" height="4" fill={palette.wingDark} />
          <rect x="6" y="4" width="4" height="4" fill={palette.wing} />
        </motion.g>

        {/* Right wing */}
        <motion.g
          animate={{ rotate: [10, -10, 10] }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "16px 16px" }}
        >
          <rect x="20" y="8" width="10" height="12" fill={palette.wing} />
          <rect x="22" y="6" width="6" height="4" fill={palette.wingDark} />
          <rect x="22" y="4" width="4" height="4" fill={palette.wing} />
        </motion.g>

        {/* Body */}
        <rect x="14" y="8" width="4" height="16" fill={palette.body} />

        {/* Antennae */}
        <rect x="13" y="4" width="2" height="4" fill={palette.body} />
        <rect x="17" y="4" width="2" height="4" fill={palette.body} />
      </svg>
    </motion.div>
  );
}

export function PixelButterflies() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <PixelButterfly className="top-[60%] left-[10%]" delay={0} color="pink" />
      <PixelButterfly className="top-[70%] left-[30%]" delay={3} color="blue" />
      <PixelButterfly className="top-[55%] left-[60%]" delay={6} color="purple" />
      <PixelButterfly className="top-[75%] left-[80%]" delay={9} color="orange" />
      <PixelButterfly className="top-[65%] left-[45%]" delay={12} color="pink" />
    </div>
  );
}
