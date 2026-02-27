"use client";

import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useState } from "react";

interface PixelButterflyProps {
  className?: string;
  startX?: number;
  startY?: number;
  color?: "pink" | "blue" | "purple" | "yellow";
  size?: "sm" | "md" | "lg";
}

const colorSchemes = {
  pink: { main: "#F48FB1", dark: "#EC407A", light: "#F8BBD9" },
  blue: { main: "#4FC3F7", dark: "#29B6F6", light: "#B3E5FC" },
  purple: { main: "#CE93D8", dark: "#AB47BC", light: "#E1BEE7" },
  yellow: { main: "#FFD54F", dark: "#FFB74D", light: "#FFECB3" },
};

const sizes = {
  sm: 3,
  md: 4,
  lg: 6,
};

export function PixelButterfly({
  className = "",
  startX = 100,
  startY = 100,
  color = "pink",
  size = "md",
}: PixelButterflyProps) {
  const colors = colorSchemes[color];
  const pixelSize = sizes[size];
  const width = 5 * pixelSize;
  const height = 5 * pixelSize;

  const [position, setPosition] = useState({ x: startX, y: startY });
  const controls = useAnimationControls();

  // Butterfly wing pattern
  const wingPixels = [
    // Left wing
    { x: 0, y: 0, color: colors.dark },
    { x: 1, y: 0, color: colors.main },
    { x: 0, y: 1, color: colors.main },
    { x: 1, y: 1, color: colors.light },
    { x: 0, y: 2, color: colors.dark },
    { x: 1, y: 2, color: colors.main },
    // Right wing
    { x: 3, y: 0, color: colors.main },
    { x: 4, y: 0, color: colors.dark },
    { x: 3, y: 1, color: colors.light },
    { x: 4, y: 1, color: colors.main },
    { x: 3, y: 2, color: colors.main },
    { x: 4, y: 2, color: colors.dark },
    // Body
    { x: 2, y: 0, color: "#5D4037" },
    { x: 2, y: 1, color: "#795548" },
    { x: 2, y: 2, color: "#5D4037" },
    { x: 2, y: 3, color: "#4E342E" },
  ];

  useEffect(() => {
    const animateButterfly = async () => {
      while (true) {
        // Generate random destination
        const newX = position.x + (Math.random() - 0.5) * 200;
        const newY = position.y + (Math.random() - 0.5) * 150;

        // Keep within reasonable bounds
        const boundedX = Math.max(50, Math.min(window.innerWidth - 50, newX));
        const boundedY = Math.max(50, Math.min(window.innerHeight - 50, newY));

        const duration = 2 + Math.random() * 2;

        await controls.start({
          x: boundedX,
          y: boundedY,
          transition: {
            duration,
            ease: "easeInOut",
          },
        });

        setPosition({ x: boundedX, y: boundedY });

        // Small pause between movements
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    };

    animateButterfly();
  }, [controls, position]);

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ width, height, left: startX, top: startY }}
      animate={controls}
      initial={{ x: startX, y: startY }}
    >
      {/* Wing flap animation */}
      <motion.div
        animate={{ scaleX: [1, 0.3, 1, 0.3, 1] }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "center",
          willChange: "transform",
        }}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {wingPixels.map((pixel, index) => (
            <rect
              key={index}
              x={pixel.x * pixelSize}
              y={pixel.y * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={pixel.color}
            />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
}

// Multiple butterflies component
interface ButterflySwarmProps {
  className?: string;
  count?: number;
}

export function ButterflySwarm({ className = "", count = 5 }: ButterflySwarmProps) {
  const colorOptions: Array<"pink" | "blue" | "purple" | "yellow"> = [
    "pink",
    "blue",
    "purple",
    "yellow",
  ];
  const sizeOptions: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const startX = Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000);
        const startY = Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800);
        const color = colorOptions[i % colorOptions.length];
        const size = sizeOptions[i % sizeOptions.length];

        return (
          <PixelButterfly
            key={i}
            startX={startX}
            startY={startY}
            color={color}
            size={size}
          />
        );
      })}
    </div>
  );
}

// Static butterfly for decoration
interface StaticButterflyProps {
  className?: string;
  color?: "pink" | "blue" | "purple" | "yellow";
  size?: "sm" | "md" | "lg";
}

export function StaticButterfly({
  className = "",
  color = "pink",
  size = "md",
}: StaticButterflyProps) {
  const colors = colorSchemes[color];
  const pixelSize = sizes[size];
  const width = 5 * pixelSize;
  const height = 5 * pixelSize;

  const wingPixels = [
    { x: 0, y: 0, color: colors.dark },
    { x: 1, y: 0, color: colors.main },
    { x: 0, y: 1, color: colors.main },
    { x: 1, y: 1, color: colors.light },
    { x: 0, y: 2, color: colors.dark },
    { x: 1, y: 2, color: colors.main },
    { x: 3, y: 0, color: colors.main },
    { x: 4, y: 0, color: colors.dark },
    { x: 3, y: 1, color: colors.light },
    { x: 4, y: 1, color: colors.main },
    { x: 3, y: 2, color: colors.main },
    { x: 4, y: 2, color: colors.dark },
    { x: 2, y: 0, color: "#5D4037" },
    { x: 2, y: 1, color: "#795548" },
    { x: 2, y: 2, color: "#5D4037" },
    { x: 2, y: 3, color: "#4E342E" },
  ];

  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      style={{ width, height, transformOrigin: "center", willChange: "transform" }}
      animate={{ scaleX: [1, 0.4, 1, 0.4, 1], y: [-2, 2, -2] }}
      transition={{
        scaleX: {
          duration: 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {wingPixels.map((pixel, index) => (
          <rect
            key={index}
            x={pixel.x * pixelSize}
            y={pixel.y * pixelSize}
            width={pixelSize}
            height={pixelSize}
            fill={pixel.color}
          />
        ))}
      </svg>
    </motion.div>
  );
}

export default PixelButterfly;
