"use client";

import { motion } from "framer-motion";
import React from "react";

interface PixelSparkleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "yellow" | "white" | "pink" | "blue";
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}

const sparkleColors = {
  yellow: "#FFD54F",
  white: "#FFF8E7",
  pink: "#F48FB1",
  blue: "#4FC3F7",
};

const sparkleSizes = {
  sm: 12,
  md: 16,
  lg: 24,
};

export function PixelSparkle({
  className = "",
  size = "md",
  color = "yellow",
  delay = 0,
  duration = 2,
}: PixelSparkleProps) {
  const sparkleColor = sparkleColors[color];
  const pixelSize = sparkleSizes[size] / 4;
  const totalSize = pixelSize * 5;

  // Cross/plus shape sparkle pattern
  const sparklePattern = [
    { x: 2, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
    { x: 2, y: 4 },
  ];

  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      style={{ width: totalSize, height: totalSize }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.8, 1, 0],
        scale: [0, 1, 1.2, 1, 0],
        rotate: [0, 45, 90],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <svg
        width={totalSize}
        height={totalSize}
        viewBox={`0 0 ${totalSize} ${totalSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: "transform, opacity" }}
      >
        {sparklePattern.map((pos, index) => (
          <rect
            key={index}
            x={pos.x * pixelSize}
            y={pos.y * pixelSize}
            width={pixelSize}
            height={pixelSize}
            fill={sparkleColor}
          />
        ))}
      </svg>
    </motion.div>
  );
}

// Group of sparkles
interface SparkleGroupProps {
  className?: string;
  count?: number;
  colors?: Array<"yellow" | "white" | "pink" | "blue">;
}

export function SparkleGroup({
  className = "",
  count = 5,
  colors = ["yellow", "white", "pink"],
}: SparkleGroupProps) {
  const sizeOptions: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const left = `${10 + Math.random() * 80}%`;
        const top = `${10 + Math.random() * 80}%`;
        const size = sizeOptions[i % sizeOptions.length];
        const color = colors[i % colors.length];
        const delay = i * 0.3;
        const duration = 1.5 + Math.random();

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left, top }}
          >
            <PixelSparkle
              size={size}
              color={color}
              delay={delay}
              duration={duration}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// Animated sparkles that appear and float
interface FloatingSparklesProps {
  className?: string;
  count?: number;
}

export function FloatingSparkles({
  className = "",
  count = 8,
}: FloatingSparklesProps) {
  const colors: Array<"yellow" | "white" | "pink" | "blue"> = [
    "yellow",
    "white",
    "pink",
    "blue",
  ];
  const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const color = colors[i % colors.length];
        const size = sizes[i % sizes.length];
        const delay = Math.random() * 2;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          >
            <PixelSparkle
              size={size}
              color={color}
              delay={0}
              duration={1}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// Star sparkle - 4-pointed star shape
interface StarSparkleProps {
  className?: string;
  size?: number;
  color?: string;
  twinkle?: boolean;
}

export function StarSparkle({
  className = "",
  size = 20,
  color = "#FFD54F",
  twinkle = true,
}: StarSparkleProps) {
  const pixelSize = size / 5;

  const starPattern = [
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 2, y: 3 },
    { x: 2, y: 4 },
  ];

  if (twinkle) {
    return (
      <motion.div
        className={`pointer-events-none ${className}`}
        style={{ width: size, height: size }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ willChange: "opacity, transform" }}
        >
          {starPattern.map((pos, index) => (
            <rect
              key={index}
              x={pos.x * pixelSize}
              y={pos.y * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={color}
            />
          ))}
        </svg>
      </motion.div>
    );
  }

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {starPattern.map((pos, index) => (
          <rect
            key={index}
            x={pos.x * pixelSize}
            y={pos.y * pixelSize}
            width={pixelSize}
            height={pixelSize}
            fill={color}
          />
        ))}
      </svg>
    </div>
  );
}

export default PixelSparkle;
