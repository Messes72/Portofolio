"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PixelSunProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export function PixelSun({
  className,
  size = 120,
  animate = true,
}: PixelSunProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{ width: size * 1.5, height: size * 1.5 }}
    >
      {/* Rotating rays */}
      <motion.div
        className="absolute inset-0"
        animate={animate ? { rotate: 360 } : undefined}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg
          width={size * 1.5}
          height={size * 1.5}
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          {/* Sun rays */}
          <g fill="var(--sun-yellow)">
            {/* 8 rays */}
            <rect x="85" y="0" width="10" height="30" />
            <rect x="85" y="150" width="10" height="30" />
            <rect x="0" y="85" width="30" height="10" />
            <rect x="150" y="85" width="30" height="10" />
            <rect x="25" y="25" width="10" height="25" transform="rotate(-45 30 37)" />
            <rect x="140" y="25" width="10" height="25" transform="rotate(45 145 37)" />
            <rect x="25" y="130" width="10" height="25" transform="rotate(45 30 142)" />
            <rect x="140" y="130" width="10" height="25" transform="rotate(-45 145 142)" />
          </g>
        </svg>
      </motion.div>

      {/* Sun core */}
      <motion.div
        className="absolute"
        style={{
          top: size * 0.25,
          left: size * 0.25,
          width: size,
          height: size,
        }}
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow */}
          <rect x="10" y="10" width="80" height="80" fill="var(--sun-orange)" />
          <rect x="15" y="15" width="70" height="70" fill="var(--sun-yellow)" />
          <rect x="20" y="20" width="60" height="60" fill="var(--sun-light)" />

          {/* Face - simple pixels */}
          <rect x="30" y="35" width="8" height="8" fill="#8D6E63" />
          <rect x="62" y="35" width="8" height="8" fill="#8D6E63" />
          <rect x="40" y="55" width="20" height="5" fill="#8D6E63" />
        </svg>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: "radial-gradient(circle, rgba(255,213,79,0.4) 0%, transparent 70%)",
            transform: "scale(1.5)",
          }}
        />
      </motion.div>
    </div>
  );
}

export function PixelSunSmall({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("relative w-16 h-16", className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rays */}
        <g fill="var(--sun-yellow)">
          <rect x="28" y="0" width="8" height="12" />
          <rect x="28" y="52" width="8" height="12" />
          <rect x="0" y="28" width="12" height="8" />
          <rect x="52" y="28" width="12" height="8" />
        </g>
        {/* Core */}
        <rect x="16" y="16" width="32" height="32" fill="var(--sun-orange)" />
        <rect x="20" y="20" width="24" height="24" fill="var(--sun-yellow)" />
      </svg>
    </motion.div>
  );
}
