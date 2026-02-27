"use client";

import { motion } from "framer-motion";
import React from "react";

interface PixelCloudProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  duration?: number;
  delay?: number;
  yOffset?: number;
}

const cloudSizes = {
  sm: { width: 80, height: 40, pixels: 4 },
  md: { width: 120, height: 60, pixels: 6 },
  lg: { width: 160, height: 80, pixels: 8 },
  xl: { width: 200, height: 100, pixels: 10 },
};

export function PixelCloud({
  className = "",
  size = "md",
  duration = 20,
  delay = 0,
  yOffset = 10,
}: PixelCloudProps) {
  const { width, height } = cloudSizes[size];

  // Pixel art cloud pattern (1 = cloud pixel)
  const cloudPattern = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
  ];

  const pixelSize = Math.floor(width / 7);
  const actualWidth = pixelSize * 7;
  const actualHeight = pixelSize * 6;

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ width: actualWidth, height: actualHeight }}
      initial={{ x: "-100%", opacity: 0 }}
      animate={{
        x: ["0%", "100vw"],
        y: [0, -yOffset, 0, yOffset, 0],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        x: {
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        },
        y: {
          duration: duration / 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        opacity: {
          duration: duration,
          repeat: Infinity,
          times: [0, 0.05, 0.95, 0.98, 1],
        },
      }}
    >
      <svg
        width={actualWidth}
        height={actualHeight}
        viewBox={`0 0 ${actualWidth} ${actualHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: "transform" }}
      >
        {cloudPattern.map((row, rowIndex) =>
          row.map((pixel, colIndex) => {
            if (pixel === 0) return null;
            return (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * pixelSize}
                y={rowIndex * pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill="#FFF8E7"
                fillOpacity={0.9}
              />
            );
          })
        )}
      </svg>
    </motion.div>
  );
}

// Static cloud variant for background decoration
interface StaticCloudProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  floatRange?: number;
  floatDuration?: number;
}

export function StaticCloud({
  className = "",
  size = "md",
  floatRange = 10,
  floatDuration = 4,
}: StaticCloudProps) {
  const { width } = cloudSizes[size];

  const cloudPattern = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
  ];

  const pixelSize = Math.floor(width / 7);
  const actualWidth = pixelSize * 7;
  const actualHeight = pixelSize * 6;

  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      style={{ width: actualWidth, height: actualHeight }}
      animate={{
        y: [-floatRange / 2, floatRange / 2, -floatRange / 2],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        width={actualWidth}
        height={actualHeight}
        viewBox={`0 0 ${actualWidth} ${actualHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: "transform" }}
      >
        {cloudPattern.map((row, rowIndex) =>
          row.map((pixel, colIndex) => {
            if (pixel === 0) return null;
            return (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * pixelSize}
                y={rowIndex * pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill="#FFF8E7"
                fillOpacity={0.85}
              />
            );
          })
        )}
      </svg>
    </motion.div>
  );
}

export default PixelCloud;
