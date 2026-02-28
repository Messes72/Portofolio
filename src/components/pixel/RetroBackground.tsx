"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface RetroBackgroundProps {
  variant?: "stars" | "grid" | "both";
  className?: string;
  showScanlines?: boolean;
  starCount?: number;
  gridOpacity?: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function RetroBackground({
  variant = "both",
  className,
  showScanlines = true,
  starCount = 50,
  gridOpacity = 0.3,
}: RetroBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate stars only on client side to avoid hydration mismatch
    const generatedStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() > 0.8 ? 4 : Math.random() > 0.5 ? 3 : 2,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    }));
    setStars(generatedStars);
  }, [starCount]);

  // Memoize star elements to prevent unnecessary re-renders
  const starElements = useMemo(() => {
    if (!mounted || prefersReducedMotion) {
      return stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
        />
      ));
    }

    return stars.map((star) => (
      <motion.div
        key={star.id}
        className="absolute bg-white"
        style={{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: star.size,
          height: star.size,
          boxShadow: `
            -${star.size / 2}px 0 0 0 white,
            ${star.size / 2}px 0 0 0 white,
            0 -${star.size / 2}px 0 0 white,
            0 ${star.size / 2}px 0 0 white
          `,
        }}
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: star.duration,
          repeat: Infinity,
          delay: star.delay,
          ease: [1, 0, 1, 1],
        }}
      />
    ));
  }, [stars, mounted, prefersReducedMotion]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {/* Retro grid background */}
      {(variant === "grid" || variant === "both") && (
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to right, rgba(124, 179, 66, ${gridOpacity}) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(124, 179, 66, ${gridOpacity}) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Horizon line */}
          <div
            className="absolute left-0 right-0 h-px"
            style={{
              top: "50%",
              background: `linear-gradient(to right, transparent, rgba(124, 179, 66, 0.5), transparent)`,
            }}
          />
        </div>
      )}

      {/* Pixel stars */}
      {(variant === "stars" || variant === "both") && starElements}

      {/* Scanlines overlay */}
      {showScanlines && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.1) 2px,
                rgba(0, 0, 0, 0.1) 4px
              )
            `,
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* Retro vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 50%,
              rgba(0, 0, 0, 0.4) 100%
            )
          `,
        }}
      />
    </div>
  );
}

export default RetroBackground;
