"use client";

import { motion } from "framer-motion";
import React from "react";

interface PixelSwordInStoneProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

const sizes = {
  sm: { width: 80, height: 100 },
  md: { width: 120, height: 150 },
  lg: { width: 160, height: 200 },
};

export function PixelSwordInStone({
  className = "",
  size = "md",
  glow = true,
}: PixelSwordInStoneProps) {
  const { width, height } = sizes[size];
  const pixel = width / 12;

  return (
    <motion.div
      className={`relative pointer-events-none ${className}`}
      style={{ width, height }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(79,195,247,0.3) 0%, transparent 70%)",
            transform: "scale(1.5)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1.3, 1.5, 1.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stone base */}
        <rect x={pixel * 2} y={height - pixel * 4} width={pixel * 8} height={pixel} fill="#757575" />
        <rect x={pixel} y={height - pixel * 3} width={pixel * 10} height={pixel} fill="#9E9E9E" />
        <rect x={pixel * 1.5} y={height - pixel * 2} width={pixel * 9} height={pixel} fill="#BDBDBD" />
        <rect x={pixel * 2} y={height - pixel} width={pixel * 8} height={pixel} fill="#9E9E9E" />

        {/* Stone highlights */}
        <rect x={pixel * 2} y={height - pixel * 3} width={pixel} height={pixel} fill="#E0E0E0" />
        <rect x={pixel * 3} y={height - pixel * 2} width={pixel} height={pixel} fill="#E0E0E0" />
        <rect x={pixel * 8} y={height - pixel * 2} width={pixel} height={pixel} fill="#757575" />

        {/* Grass around stone */}
        <rect x={pixel} y={height - pixel * 4} width={pixel} height={pixel * 2} fill="#558B2F" />
        <rect x={pixel * 10} y={height - pixel * 4} width={pixel} height={pixel * 2} fill="#558B2F" />
        <rect x={0} y={height - pixel * 3} width={pixel} height={pixel * 2} fill="#7CB342" />
        <rect x={pixel * 11} y={height - pixel * 3} width={pixel} height={pixel * 2} fill="#7CB342" />

        {/* Sword blade */}
        <rect x={pixel * 5.5} y={pixel * 2} width={pixel} height={pixel * 8} fill="#E0E0E0" />
        <rect x={pixel * 5.5} y={pixel} width={pixel} height={pixel} fill="#BDBDBD" />
        <rect x={pixel * 5.5} y={0} width={pixel} height={pixel} fill="#9E9E9E" />

        {/* Sword edge highlight */}
        <rect x={pixel * 5.5} y={pixel * 3} width={pixel * 0.5} height={pixel * 6} fill="#FFFFFF" />

        {/* Sword guard */}
        <rect x={pixel * 4} y={pixel * 9} width={pixel * 4} height={pixel} fill="#FFD54F" />
        <rect x={pixel * 3.5} y={pixel * 10} width={pixel * 5} height={pixel} fill="#FFB74D" />

        {/* Guard details */}
        <rect x={pixel * 4.5} y={pixel * 9.5} width={pixel} height={pixel * 0.5} fill="#FF8F00" />
        <rect x={pixel * 6.5} y={pixel * 9.5} width={pixel} height={pixel * 0.5} fill="#FF8F00" />

        {/* Sword handle */}
        <rect x={pixel * 5.5} y={pixel * 11} width={pixel} height={pixel * 3} fill="#8D6E63" />
        <rect x={pixel * 5.5} y={pixel * 11.5} width={pixel} height={pixel * 0.5} fill="#A1887F" />
        <rect x={pixel * 5.5} y={pixel * 12.5} width={pixel} height={pixel * 0.5} fill="#A1887F" />

        {/* Sword pommel */}
        <rect x={pixel * 5} y={pixel * 14} width={pixel * 2} height={pixel} fill="#FFD54F" />
        <rect x={pixel * 5.5} y={pixel * 14.5} width={pixel} height={pixel * 0.5} fill="#FFB74D" />

        {/* Magic sparkle on sword */}
        <motion.rect
          x={pixel * 6}
          y={pixel * 3}
          width={pixel * 0.5}
          height={pixel * 0.5}
          fill="#4FC3F7"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <motion.rect
          x={pixel * 5}
          y={pixel * 5}
          width={pixel * 0.5}
          height={pixel * 0.5}
          fill="#4FC3F7"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.rect
          x={pixel * 6.5}
          y={pixel * 7}
          width={pixel * 0.5}
          height={pixel * 0.5}
          fill="#4FC3F7"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </svg>
    </motion.div>
  );
}

// Simple stone for background decoration
interface SimpleStoneProps {
  className?: string;
  size?: number;
}

export function SimpleStone({ className = "", size = 40 }: SimpleStoneProps) {
  const pixel = size / 8;

  return (
    <div className={`pointer-events-none ${className}`} style={{ width: size, height: size * 0.6 }}>
      <svg
        width={size}
        height={size * 0.6}
        viewBox={`0 0 ${size} ${size * 0.6}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x={pixel} y={0} width={pixel * 6} height={pixel} fill="#9E9E9E" />
        <rect x={0} y={pixel} width={size} height={pixel * 2} fill="#757575" />
        <rect x={pixel} y={pixel} width={pixel} height={pixel} fill="#BDBDBD" />
        <rect x={pixel * 5} y={pixel * 1.5} width={pixel} height={pixel} fill="#616161" />
      </svg>
    </div>
  );
}

export default PixelSwordInStone;
