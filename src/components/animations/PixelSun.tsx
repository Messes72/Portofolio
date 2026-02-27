"use client";

import { motion } from "framer-motion";
import React from "react";

interface PixelSunProps {
  className?: string;
  size?: number;
  rayCount?: number;
  rotationDuration?: number;
  pulseDuration?: number;
}

export function PixelSun({
  className = "",
  size = 120,
  rayCount = 8,
  rotationDuration = 20,
  pulseDuration = 3,
}: PixelSunProps) {
  const center = size / 2;
  const sunRadius = size * 0.25;
  const rayLength = size * 0.35;
  const rayWidth = size * 0.06;

  // Generate rays
  const rays = Array.from({ length: rayCount }, (_, i) => {
    const angle = (i * 360) / rayCount;
    return angle;
  });

  return (
    <motion.div
      className={`relative pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Rotating rays container */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: rotationDuration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {rays.map((angle, index) = (
            <rect
              key={index}
              x={center - rayWidth / 2}
              y={center - sunRadius - rayLength}
              width={rayWidth}
              height={rayLength}
              fill="#FFD54F"
              transform={`rotate(${angle} ${center} ${center})`}
            />
          ))}
        </svg>
      </motion.div>

      {/* Sun core with pulse animation */}
      <motion.div
        className="absolute"
        style={{
          left: center - sunRadius,
          top: center - sunRadius,
          width: sunRadius * 2,
          height: sunRadius * 2,
        }}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(255, 213, 79, 0.4)",
            "0 0 40px rgba(255, 213, 79, 0.6)",
            "0 0 20px rgba(255, 213, 79, 0.4)",
          ],
        }}
        transition={{
          duration: pulseDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width={sunRadius * 2}
          height={sunRadius * 2}
          viewBox={`0 0 ${sunRadius * 2} ${sunRadius * 2}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sun face - pixel art style */}
          {/* Main circle */}
          <rect x={sunRadius * 0.5} y={0} width={sunRadius} height={sunRadius * 0.5} fill="#FFD54F" />
          <rect x={0} y={sunRadius * 0.5} width={sunRadius * 2} height={sunRadius} fill="#FFD54F" />
          <rect x={sunRadius * 0.5} y={sunRadius * 1.5} width={sunRadius} height={sunRadius * 0.5} fill="#FFD54F" />

          {/* Sun center highlight */}
          <rect
            x={sunRadius * 0.75}
            y={sunRadius * 0.75}
            width={sunRadius * 0.5}
            height={sunRadius * 0.5}
            fill="#FFE082"
          />

          {/* Eyes */}
          <rect
            x={sunRadius * 0.6}
            y={sunRadius * 0.8}
            width={sunRadius * 0.15}
            height={sunRadius * 0.2}
            fill="#8D6E63"
          />
          <rect
            x={sunRadius * 1.25}
            y={sunRadius * 0.8}
            width={sunRadius * 0.15}
            height={sunRadius * 0.2}
            fill="#8D6E63"
          />

          {/* Smile */}
          <rect
            x={sunRadius * 0.75}
            y={sunRadius * 1.2}
            width={sunRadius * 0.5}
            height={sunRadius * 0.1}
            fill="#8D6E63"
          />
          <rect
            x={sunRadius * 0.7}
            y={sunRadius * 1.1}
            width={sunRadius * 0.1}
            height={sunRadius * 0.1}
            fill="#8D6E63"
          />
          <rect
            x={sunRadius * 1.2}
            y={sunRadius * 1.1}
            width={sunRadius * 0.1}
            height={sunRadius * 0.1}
            fill="#8D6E63"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// Simplified sun variant for smaller decorations
interface SimpleSunProps {
  className?: string;
  size?: number;
}

export function SimpleSun({ className = "", size = 60 }: SimpleSunProps) {
  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: "transform" }}
      >
        {/* Simple pixel sun */}
        <rect x={size * 0.375} y={0} width={size * 0.25} height={size} fill="#FFD54F" />
        <rect x={0} y={size * 0.375} width={size} height={size * 0.25} fill="#FFD54F" />
        <rect x={size * 0.25} y={size * 0.25} width={size * 0.5} height={size * 0.5} fill="#FFE082" />
      </svg>
    </motion.div>
  );
}

export default PixelSun;
