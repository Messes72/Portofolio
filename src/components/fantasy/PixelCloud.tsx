"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PixelCloudProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "white" | "cream" | "light";
  animate?: boolean;
  delay?: number;
}

const sizes = {
  sm: { width: 80, height: 40 },
  md: { width: 120, height: 60 },
  lg: { width: 180, height: 90 },
  xl: { width: 240, height: 120 },
};

const colors = {
  white: "#FFFFFF",
  cream: "#FFF8E7",
  light: "#F5F5F5",
};

export function PixelCloud({
  className,
  size = "md",
  variant = "white",
  animate = true,
  delay = 0,
}: PixelCloudProps) {
  const { width, height } = sizes[size];
  const fillColor = colors[variant];

  const cloudVariants = {
    initial: { x: 0, y: 0 },
    animate: {
      x: [0, 30, 60, 30, 0],
      y: [0, -8, 0, 8, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
  };

  const driftVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "100vw",
      transition: {
        duration: 80,
        repeat: Infinity,
        ease: "linear" as const,
        delay,
      },
    },
  };

  const Wrapper = animate ? motion.div : "div";
  const wrapperProps = animate
    ? { initial: "initial", animate: "animate", variants: driftVariants }
    : {};

  return (
    <Wrapper
      className={cn("absolute pointer-events-none", className)}
      {...wrapperProps}
    >
      <motion.svg
        width={width}
        height={height}
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
        animate={animate ? { y: [0, -5, 0], x: [0, 10, 0] } : undefined}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      >
        {/* Cloud shape - pixel art style */}
        <g fill={fillColor}>
          {/* Bottom row */}
          <rect x="10" y="40" width="10" height="10" />
          <rect x="20" y="40" width="10" height="10" />
          <rect x="30" y="40" width="10" height="10" />
          <rect x="40" y="40" width="10" height="10" />
          <rect x="50" y="40" width="10" height="10" />
          <rect x="60" y="40" width="10" height="10" />
          <rect x="70" y="40" width="10" height="10" />
          <rect x="80" y="40" width="10" height="10" />
          <rect x="90" y="40" width="10" height="10" />

          {/* Middle row */}
          <rect x="0" y="30" width="10" height="10" />
          <rect x="10" y="30" width="10" height="10" />
          <rect x="20" y="30" width="10" height="10" />
          <rect x="30" y="30" width="10" height="10" />
          <rect x="40" y="30" width="10" height="10" />
          <rect x="50" y="30" width="10" height="10" />
          <rect x="60" y="30" width="10" height="10" />
          <rect x="70" y="30" width="10" height="10" />
          <rect x="80" y="30" width="10" height="10" />
          <rect x="90" y="30" width="10" height="10" />
          <rect x="100" y="30" width="10" height="10" />

          {/* Upper middle */}
          <rect x="10" y="20" width="10" height="10" />
          <rect x="20" y="20" width="10" height="10" />
          <rect x="30" y="20" width="10" height="10" />
          <rect x="40" y="20" width="10" height="10" />
          <rect x="50" y="20" width="10" height="10" />
          <rect x="60" y="20" width="10" height="10" />
          <rect x="70" y="20" width="10" height="10" />
          <rect x="80" y="20" width="10" height="10" />
          <rect x="90" y="20" width="10" height="10" />

          {/* Top bumps */}
          <rect x="20" y="10" width="10" height="10" />
          <rect x="30" y="10" width="10" height="10" />
          <rect x="40" y="10" width="10" height="10" />
          <rect x="50" y="10" width="10" height="10" />
          <rect x="60" y="10" width="10" height="10" />
          <rect x="70" y="10" width="10" height="10" />
          <rect x="80" y="10" width="10" height="10" />

          {/* Highest bumps */}
          <rect x="30" y="0" width="10" height="10" />
          <rect x="40" y="0" width="10" height="10" />
          <rect x="50" y="0" width="10" height="10" />
          <rect x="60" y="0" width="10" height="10" />
          <rect x="70" y="0" width="10" height="10" />
        </g>

        {/* Subtle shadow */}
        <g fill="rgba(0,0,0,0.1)">
          <rect x="20" y="50" width="10" height="5" />
          <rect x="40" y="50" width="10" height="5" />
          <rect x="60" y="50" width="10" height="5" />
          <rect x="80" y="50" width="10" height="5" />
        </g>
      </motion.svg>
    </Wrapper>
  );
}

export function PixelClouds({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <PixelCloud
        className="top-[10%]"
        size="lg"
        variant="white"
        delay={0}
      />
      <PixelCloud
        className="top-[25%]"
        size="md"
        variant="cream"
        delay={5}
      />
      <PixelCloud
        className="top-[15%]"
        size="sm"
        variant="light"
        delay={10}
      />
      <PixelCloud
        className="top-[35%]"
        size="xl"
        variant="white"
        delay={15}
      />
      <PixelCloud
        className="top-[5%]"
        size="sm"
        variant="cream"
        delay={20}
      />
    </div>
  );
}
