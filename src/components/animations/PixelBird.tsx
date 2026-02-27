"use client";

import { motion } from "framer-motion";
import React from "react";

interface PixelBirdProps {
  className?: string;
  direction?: "left" | "right";
  duration?: number;
  delay?: number;
  yPosition?: string;
  wingSpeed?: number;
}

export function PixelBird({
  className = "",
  direction = "right",
  duration = 15,
  delay = 0,
  yPosition = "20%",
  wingSpeed = 0.2,
}: PixelBirdProps) {
  const isRight = direction === "right";

  // Pixel bird pattern
  const birdPixels = [
    // Row 0: wing up
    { x: 1, y: 0, color: "#8D6E63" },
    { x: 2, y: 0, color: "#8D6E63" },
    // Row 1: body and wing
    { x: 0, y: 1, color: "#8D6E63" },
    { x: 1, y: 1, color: "#A1887F" },
    { x: 2, y: 1, color: "#8D6E63" },
    { x: 3, y: 1, color: "#8D6E63" },
    // Row 2: belly and beak
    { x: 1, y: 2, color: "#FFF8E7" },
    { x: 2, y: 2, color: "#FFF8E7" },
    { x: 3, y: 2, color: "#FFB74D" }, // beak
    // Row 3: tail
    { x: 2, y: 3, color: "#8D6E63" },
  ];

  const pixelSize = 4;
  const width = 4 * pixelSize;
  const height = 4 * pixelSize;

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width,
        height,
        top: yPosition,
      }}
      initial={{ x: isRight ? "-5vw" : "105vw" }}
      animate={{
        x: isRight ? ["0vw", "105vw"] : ["100vw", "-5vw"],
        y: [0, -10, 5, -8, 0],
      }}
      transition={{
        x: {
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        },
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <motion.div
        animate={{ scaleY: [1, 0.6, 1] }}
        transition={{
          duration: wingSpeed,
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
          style={{ transform: isRight ? "scaleX(1)" : "scaleX(-1)" }}
        >
          {birdPixels.map((pixel, index) => (
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

// Flock of birds component
interface BirdFlockProps {
  className?: string;
  count?: number;
  startY?: string;
}

export function BirdFlock({
  className = "",
  count = 5,
  startY = "15%",
}: BirdFlockProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const delay = i * 3;
        const duration = 12 + Math.random() * 8;
        const yOffset = parseInt(startY) + (Math.random() * 20 - 10);
        const direction = i % 2 === 0 ? "right" : "left";

        return (
          <PixelBird
            key={i}
            direction={direction as "left" | "right"}
            duration={duration}
            delay={delay}
            yPosition={`${yOffset}%`}
            wingSpeed={0.15 + Math.random() * 0.1}
          />
        );
      })}
    </div>
  );
}

// Static bird decoration
interface StaticBirdProps {
  className?: string;
  direction?: "left" | "right";
}

export function StaticBird({
  className = "",
  direction = "right",
}: StaticBirdProps) {
  const isRight = direction === "right";
  const pixelSize = 4;
  const width = 4 * pixelSize;
  const height = 4 * pixelSize;

  const birdPixels = [
    { x: 1, y: 0, color: "#8D6E63" },
    { x: 2, y: 0, color: "#8D6E63" },
    { x: 0, y: 1, color: "#8D6E63" },
    { x: 1, y: 1, color: "#A1887F" },
    { x: 2, y: 1, color: "#8D6E63" },
    { x: 3, y: 1, color: "#8D6E63" },
    { x: 1, y: 2, color: "#FFF8E7" },
    { x: 2, y: 2, color: "#FFF8E7" },
    { x: 3, y: 2, color: "#FFB74D" },
    { x: 2, y: 3, color: "#8D6E63" },
  ];

  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      style={{ width, height }}
      animate={{ y: [-2, 2, -2] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: isRight ? "scaleX(1)" : "scaleX(-1)",
          willChange: "transform",
        }}
      >
        {birdPixels.map((pixel, index) => (
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

export default PixelBird;
