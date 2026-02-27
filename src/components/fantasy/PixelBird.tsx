"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PixelBirdProps {
  className?: string;
  delay?: number;
  duration?: number;
  color?: "blue" | "brown" | "yellow";
}

const colors = {
  blue: { body: "#4FC3F7", wing: "#29B6F6", beak: "#FFB74D" },
  brown: { body: "#8D6E63", wing: "#6D4C41", beak: "#FFB74D" },
  yellow: { body: "#FFD54F", wing: "#FFC107", beak: "#FF8F00" },
};

export function PixelBird({
  className,
  delay = 0,
  duration = 20,
  color = "blue",
}: PixelBirdProps) {
  const palette = colors[color];

  return (
    <motion.div
      className={cn("absolute pointer-events-none", className)}
      initial={{ x: "-100px", y: 0 }}
      animate={{
        x: ["-100px", "25vw", "50vw", "75vw", "calc(100vw + 100px)"],
        y: [0, -30, 0, -20, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    >
      <motion.svg
        width="40"
        height="30"
        viewBox="0 0 40 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Body */}
        <rect x="10" y="10" width="20" height="12" fill={palette.body} />
        <rect x="8" y="12" width="4" height="8" fill={palette.body} />
        <rect x="28" y="12" width="4" height="8" fill={palette.body} />

        {/* Head */}
        <rect x="28" y="6" width="10" height="10" fill={palette.body} />

        {/* Beak */}
        <rect x="36" y="8" width="4" height="4" fill={palette.beak} />

        {/* Eye */}
        <rect x="32" y="8" width="2" height="2" fill="#3E2723" />

        {/* Wing (animated) */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <rect x="12" y="8" width="14" height="6" fill={palette.wing} />
        </motion.g>

        {/* Tail */}
        <rect x="4" y="14" width="6" height="4" fill={palette.wing} />
      </motion.svg>
    </motion.div>
  );
}

export function PixelBirds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <PixelBird className="top-[20%]" delay={0} duration={25} color="blue" />
      <PixelBird className="top-[35%]" delay={8} duration={30} color="yellow" />
      <PixelBird className="top-[15%]" delay={15} duration={22} color="brown" />
      <PixelBird className="top-[40%]" delay={20} duration={28} color="blue" />
    </div>
  );
}
