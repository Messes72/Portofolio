"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PixelGrassProps {
  className?: string;
  height?: number;
  sway?: boolean;
}

export function PixelGrass({ className, height = 60, sway = true }: PixelGrassProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      style={{ height }}
      animate={sway ? { skewX: [-2, 2, -2] } : undefined}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        width="40"
        height={height}
        viewBox={`0 0 40 ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Grass blades */}
        <g fill="var(--grass-green)">
          {/* Left blade */}
          <rect x="4" y={height * 0.4} width="6" height={height * 0.6} />
          <rect x="6" y={height * 0.2} width="4" height={height * 0.3} />
          <rect x="8" y="0" width="2" height={height * 0.25} />

          {/* Middle blade */}
          <rect x="17" y={height * 0.3} width="6" height={height * 0.7} />
          <rect x="19" y={height * 0.1} width="4" height={height * 0.25} />
          <rect x="20" y="0" width="2" height={height * 0.15} />

          {/* Right blade */}
          <rect x="30" y={height * 0.5} width="6" height={height * 0.5} />
          <rect x="32" y={height * 0.3} width="4" height={height * 0.25} />
          <rect x="34" y={height * 0.1} width="2" height={height * 0.25} />
        </g>

        {/* Lighter highlights */}
        <g fill="var(--grass-light)">
          <rect x="6" y={height * 0.6} width="2" height={height * 0.3} />
          <rect x="19" y={height * 0.5} width="2" height={height * 0.4} />
          <rect x="32" y={height * 0.7} width="2" height={height * 0.2} />
        </g>
      </svg>
    </motion.div>
  );
}

interface PixelGrassRowProps {
  className?: string;
  bladeCount?: number;
}

export function PixelGrassRow({ className, bladeCount = 20 }: PixelGrassRowProps) {
  return (
    <div className={cn("flex items-end justify-between", className)}>
      {Array.from({ length: bladeCount }).map((_, i) => (
        <PixelGrass
          key={i}
          height={40 + Math.random() * 40}
          sway={i % 3 === 0}
        />
      ))}
    </div>
  );
}
