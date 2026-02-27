"use client";

import { motion } from "framer-motion";
import React from "react";

interface PixelGrassProps {
  className?: string;
  height?: number;
  density?: "sparse" | "normal" | "dense";
  windStrength?: "light" | "medium" | "strong";
}

const densityCounts = {
  sparse: 5,
  normal: 8,
  dense: 12,
};

const windDurations = {
  light: 4,
  medium: 2.5,
  strong: 1.5,
};

export function PixelGrass({
  className = "",
  height = 60,
  density = "normal",
  windStrength = "medium",
}: PixelGrassProps) {
  const grassCount = densityCounts[density];
  const duration = windDurations[windStrength];

  // Generate grass blades
  const grassBlades = Array.from({ length: grassCount }, (_, i) => ({
    x: (i / (grassCount - 1)) * 100,
    height: height * (0.6 + Math.random() * 0.4),
    delay: i * 0.1,
    swayAmount: 3 + Math.random() * 4,
  }));

  return (
    <div
      className={`relative pointer-events-none overflow-hidden ${className}`}
      style={{ height: height + 10 }}
    >
      {grassBlades.map((grass, index) => (
        <motion.div
          key={index}
          className="absolute bottom-0"
          style={{
            left: `${grass.x}%`,
            height: grass.height,
            width: 4,
            transformOrigin: "bottom center",
          }}
          animate={{
            rotate: [-grass.swayAmount, grass.swayAmount, -grass.swayAmount],
          }}
          transition={{
            duration: duration + Math.random(),
            repeat: Infinity,
            ease: "easeInOut",
            delay: grass.delay,
          }}
        >
          <svg
            width="8"
            height={grass.height}
            viewBox={`0 0 8 ${grass.height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ willChange: "transform" }}
          >
            {/* Grass blade - pixel style */}
            <rect x="2" y={grass.height - 8} width="4" height="8" fill="#558B2F" />
            <rect x="2" y={grass.height - 16} width="4" height="8" fill="#66BB6A" />
            <rect x="2" y={grass.height - 24} width="4" height="8" fill="#7CB342" />
            {grass.height > 40 && (
              <rect x="2" y={grass.height - 32} width="4" height="8" fill="#9CCC65" />
            )}
            {grass.height > 50 && (
              <rect x="2" y={grass.height - 40} width="4" height="8" fill="#AED581" />
            )}
            {/* Tip */}
            <rect x="3" y={0} width="2" height={Math.min(8, grass.height - 32)} fill="#C5E1A5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// Pixel tree component
interface PixelTreeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  sway?: boolean;
}

const treeSizes = {
  sm: { width: 40, height: 80, trunk: 8 },
  md: { width: 60, height: 120, trunk: 12 },
  lg: { width: 80, height: 160, trunk: 16 },
};

export function PixelTree({
  className = "",
  size = "md",
  sway = true,
}: PixelTreeProps) {
  const { width, height, trunk } = treeSizes[size];
  const pixelSize = width / 10;

  return (
    <motion.div
      className={`relative pointer-events-none ${className}`}
      style={{ width, height }}
      animate={
        sway
          ? {
              rotate: [-1, 1, -1],
            }
          : {}
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Tree trunk */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: trunk,
          height: height * 0.25,
          backgroundColor: "#8D6E63",
        }}
      />

      {/* Tree foliage - pixel art */}
      <svg
        width={width}
        height={height * 0.8}
        viewBox={`0 0 ${width} ${height * 0.8}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        {/* Layer 1 - bottom */}
        <rect x={pixelSize} y={height * 0.5} width={pixelSize * 8} height={pixelSize * 2} fill="#558B2F" />
        <rect x={0} y={height * 0.55} width={pixelSize * 10} height={pixelSize * 2} fill="#66BB6A" />

        {/* Layer 2 - middle */}
        <rect x={pixelSize * 1.5} y={height * 0.3} width={pixelSize * 7} height={pixelSize * 2} fill="#7CB342" />
        <rect x={pixelSize} y={height * 0.35} width={pixelSize * 8} height={pixelSize * 2} fill="#9CCC65" />

        {/* Layer 3 - top */}
        <rect x={pixelSize * 2} y={height * 0.1} width={pixelSize * 6} height={pixelSize * 2} fill="#8BC34A" />
        <rect x={pixelSize * 2.5} y={0} width={pixelSize * 5} height={pixelSize * 2} fill="#AED581" />

        {/* Highlights */}
        <rect x={pixelSize * 3} y={height * 0.15} width={pixelSize} height={pixelSize} fill="#C5E1A5" />
        <rect x={pixelSize * 6} y={height * 0.4} width={pixelSize} height={pixelSize} fill="#C5E1A5" />
        <rect x={pixelSize * 2} y={height * 0.6} width={pixelSize} height={pixelSize} fill="#C5E1A5" />
      </svg>
    </motion.div>
  );
}

// Decorative grass patch
interface GrassPatchProps {
  className?: string;
  width?: number;
}

export function GrassPatch({ className = "", width = 200 }: GrassPatchProps) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ width }}>
      <svg
        width={width}
        height="30"
        viewBox={`0 0 ${width} 30`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: Math.floor(width / 10) }, (_, i) => (
          <g key={i}>
            <rect
              x={i * 10 + 2}
              y={20 - Math.random() * 10}
              width="3"
              height={10 + Math.random() * 10}
              fill={Math.random() > 0.5 ? "#7CB342" : "#558B2F"}
            />
            <rect
              x={i * 10 + 5}
              y={22 - Math.random() * 8}
              width="3"
              height={8 + Math.random() * 8}
              fill={Math.random() > 0.5 ? "#9CCC65" : "#66BB6A"}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default PixelGrass;
