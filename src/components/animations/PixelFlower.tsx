"use client";

import { motion } from "framer-motion";
import React from "react";

interface PixelFlowerProps {
  className?: string;
  type?: "daisy" | "tulip" | "rose" | "lavender";
  size?: "sm" | "md" | "lg";
  delay?: number;
  sway?: boolean;
}

const flowerColors = {
  daisy: { center: "#FFD54F", petal: "#FFF8E7", stem: "#7CB342" },
  tulip: { center: "#8D6E63", petal: "#F48FB1", stem: "#558B2F" },
  rose: { center: "#5D4037", petal: "#EC407A", stem: "#558B2F" },
  lavender: { center: "#9C27B0", petal: "#CE93D8", stem: "#7CB342" },
};

const flowerSizes = {
  sm: { pixel: 3, height: 30 },
  md: { pixel: 4, height: 40 },
  lg: { pixel: 6, height: 60 },
};

export function PixelFlower({
  className = "",
  type = "daisy",
  size = "md",
  delay = 0,
  sway = true,
}: PixelFlowerProps) {
  const colors = flowerColors[type];
  const { pixel, height } = flowerSizes[size];
  const width = pixel * 7;

  // Bloom animation variants
  const bloomVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.34, 1.56, 0.64, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className={`relative pointer-events-none ${className}`}
      style={{ width, height }}
      variants={bloomVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Swaying container */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformOrigin: "bottom center" }}
        animate={
          sway
            ? {
                rotate: [-2, 2, -2],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.5,
        }}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ willChange: "transform" }}
        >
          {/* Stem */}
          <rect
            x={pixel * 3}
            y={pixel * 4}
            width={pixel}
            height={height - pixel * 4}
            fill={colors.stem}
          />

          {/* Leaves */}
          <rect x={pixel * 2} y={pixel * 6} width={pixel} height={pixel} fill={colors.stem} />
          <rect x={pixel * 1} y={pixel * 6} width={pixel} height={pixel} fill={colors.stem} />
          <rect x={pixel * 4} y={pixel * 7} width={pixel} height={pixel} fill={colors.stem} />
          <rect x={pixel * 5} y={pixel * 7} width={pixel} height={pixel} fill={colors.stem} />

          {/* Flower petals - 5 petals */}
          {/* Top petal */}
          <rect x={pixel * 3} y={0} width={pixel} height={pixel * 2} fill={colors.petal} />
          <rect x={pixel * 2} y={pixel} width={pixel * 3} height={pixel} fill={colors.petal} />

          {/* Left petals */}
          <rect x={0} y={pixel * 2} width={pixel * 2} height={pixel} fill={colors.petal} />
          <rect x={pixel} y={pixel} width={pixel} height={pixel * 3} fill={colors.petal} />

          {/* Right petals */}
          <rect x={pixel * 5} y={pixel * 2} width={pixel * 2} height={pixel} fill={colors.petal} />
          <rect x={pixel * 5} y={pixel} width={pixel} height={pixel * 3} fill={colors.petal} />

          {/* Bottom petal */}
          <rect x={pixel * 3} y={pixel * 3} width={pixel} height={pixel} fill={colors.petal} />
          <rect x={pixel * 2} y={pixel * 2} width={pixel * 3} height={pixel} fill={colors.petal} />

          {/* Center */}
          <rect x={pixel * 2} y={pixel * 1.5} width={pixel * 3} height={pixel * 1.5} fill={colors.center} />
          <rect x={pixel * 2.5} y={pixel * 1} width={pixel * 2} height={pixel * 2.5} fill={colors.center} />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// Flower field component
interface FlowerFieldProps {
  className?: string;
  count?: number;
}

export function FlowerField({ className = "", count = 8 }: FlowerFieldProps) {
  const types: Array<"daisy" | "tulip" | "rose" | "lavender"> = [
    "daisy",
    "tulip",
    "rose",
    "lavender",
  ];
  const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

  return (
    <div className={`flex items-end gap-4 pointer-events-none ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const type = types[i % types.length];
        const size = sizes[i % sizes.length];
        const delay = i * 0.15;

        return (
          <PixelFlower
            key={i}
            type={type}
            size={size}
            delay={delay}
            sway={true}
          />
        );
      })}
    </div>
  );
}

// Flower cluster for decoration
interface FlowerClusterProps {
  className?: string;
}

export function FlowerCluster({ className = "" }: FlowerClusterProps) {
  return (
    <div className={`relative pointer-events-none ${className}`} style={{ width: 100, height: 60 }}>
      <PixelFlower
        type="daisy"
        size="md"
        delay={0}
        className="absolute bottom-0 left-0"
      />
      <PixelFlower
        type="tulip"
        size="sm"
        delay={0.2}
        className="absolute bottom-0 left-8"
      />
      <PixelFlower
        type="lavender"
        size="lg"
        delay={0.4}
        className="absolute bottom-0 left-14"
      />
      <PixelFlower
        type="rose"
        size="sm"
        delay={0.1}
        className="absolute bottom-0 left-24"
      />
    </div>
  );
}

export default PixelFlower;
