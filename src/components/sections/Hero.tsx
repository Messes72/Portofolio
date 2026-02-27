"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Mail, MapPin, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import {
  PixelClouds,
  PixelSun,
  PixelBirds,
  PixelButterflies,
  PixelSparkles,
} from "@/components/animations";

// Fantasy Nature Background
function FantasyBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Sky gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, var(--sky-blue) 0%, var(--sky-light) 40%, var(--cloud-white) 100%)",
        }}
      />

      {/* Distant mountains */}
      <motion.div
        className="absolute bottom-[30%] left-0 right-0 h-40"
        style={{ y: y1 }}
      >
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 200 L0 120 C150 80, 300 60, 480 100 C660 140, 800 40, 960 80 C1120 120, 1280 60, 1440 100 L1440 200 Z"
            fill="var(--sky-dark)"
            opacity="0.3"
          />
          <path
            d="M0 200 L0 140 C200 100, 400 80, 600 120 C800 160, 1000 60, 1200 100 C1350 130, 1400 110, 1440 120 L1440 200 Z"
            fill="var(--sky-dark)"
            opacity="0.2"
          />
        </svg>
      </motion.div>

      {/* Midground hills */}
      <motion.div
        className="absolute bottom-[20%] left-0 right-0 h-32"
        style={{ y: y2 }}
      >
        <svg
          viewBox="0 0 1440 160"
          fill="none"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 160 L0 80 C180 40, 360 20, 540 60 C720 100, 900 40, 1080 80 C1260 120, 1350 60, 1440 80 L1440 160 Z"
            fill="var(--grass-light)"
          />
        </svg>
      </motion.div>

      {/* Foreground grass */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{ y: y3 }}
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120 L0 40 C200 20, 400 0, 600 40 C800 80, 1000 20, 1200 50 C1320 70, 1380 40, 1440 50 L1440 120 Z"
            fill="var(--grass-green)"
          />
          {/* Grass blades detail */}
          <path
            d="M0 120 L0 60 L10 30 L20 60 L30 20 L40 60 L50 35 L60 60 L70 25 L80 60 L90 40 L100 60 L110 30 L120 60"
            stroke="var(--grass-dark)"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </motion.div>

      {/* Nature decorations */}
      <PixelClouds />
      <PixelBirds />
      <PixelButterflies />
      <PixelSparkles />
    </div>
  );
}

// Retro Grid Floor Effect
function RetroGridFloor() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none opacity-20"
      style={{
        background: `
          linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 245, 255, 0.03) 50%,
            rgba(0, 245, 255, 0.1) 100%
          )
        `,
      }}
      aria-hidden="true"
    >
      {/* Horizontal grid lines */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(0, 245, 255, 0.3) 40px
            )
          `,
        }}
      />
      {/* Perspective grid lines */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              90deg,
              transparent 48%,
              rgba(0, 245, 255, 0.2) 49%,
              rgba(0, 245, 255, 0.2) 51%,
              transparent 52%
            ),
            linear-gradient(
              80deg,
              transparent 48%,
              rgba(0, 245, 255, 0.15) 49%,
              rgba(0, 245, 255, 0.15) 51%,
              transparent 52%
            ),
            linear-gradient(
              100deg,
              transparent 48%,
              rgba(0, 245, 255, 0.15) 49%,
              rgba(0, 245, 255, 0.15) 51%,
              transparent 52%
            )
          `,
        }}
      />
    </div>
  );
}

// Pixel Star Component - Individual twinkling star
function PixelStar({
  x,
  y,
  size,
  delay,
}: {
  x: string;
  y: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute bg-white"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        imageRendering: "pixelated",
      }}
      animate={{
        opacity: [0.4, 1, 0.4],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      aria-hidden="true"
    />
  );
}

// Pixel Cloud Component - Floating pixel cloud
function PixelCloud({
  x,
  y,
  delay,
  duration,
}: {
  x: string;
  y: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute opacity-20"
      style={{
        left: x,
        top: y,
        imageRendering: "pixelated",
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear" as const,
      }}
      aria-hidden="true"
    >
      {/* Simple pixel cloud shape */}
      <svg
        width="80"
        height="40"
        viewBox="0 0 80 40"
        fill="none"
        className="text-[#9D4EDD]"
      >
        <rect x="10" y="20" width="10" height="10" fill="currentColor" />
        <rect x="20" y="10" width="10" height="10" fill="currentColor" />
        <rect x="30" y="10" width="10" height="10" fill="currentColor" />
        <rect x="40" y="10" width="10" height="10" fill="currentColor" />
        <rect x="50" y="20" width="10" height="10" fill="currentColor" />
        <rect x="20" y="20" width="30" height="10" fill="currentColor" />
        <rect x="60" y="20" width="10" height="10" fill="currentColor" />
      </svg>
    </motion.div>
  );
}

// Pixel Starfield Background
function PixelStarfield() {
  // Generate fixed positions for stars to avoid hydration mismatch
  const stars = [
    { x: "5%", y: "10%", size: 2, delay: 0 },
    { x: "15%", y: "25%", size: 3, delay: 0.3 },
    { x: "25%", y: "8%", size: 2, delay: 0.7 },
    { x: "35%", y: "35%", size: 4, delay: 0.2 },
    { x: "45%", y: "15%", size: 2, delay: 0.5 },
    { x: "55%", y: "30%", size: 3, delay: 0.9 },
    { x: "65%", y: "12%", size: 2, delay: 0.4 },
    { x: "75%", y: "40%", size: 3, delay: 0.6 },
    { x: "85%", y: "20%", size: 2, delay: 0.8 },
    { x: "95%", y: "35%", size: 4, delay: 0.1 },
    { x: "10%", y: "50%", size: 2, delay: 0.3 },
    { x: "20%", y: "65%", size: 3, delay: 0.7 },
    { x: "30%", y: "55%", size: 2, delay: 0.5 },
    { x: "40%", y: "75%", size: 4, delay: 0.2 },
    { x: "50%", y: "60%", size: 2, delay: 0.9 },
    { x: "60%", y: "70%", size: 3, delay: 0.4 },
    { x: "70%", y: "50%", size: 2, delay: 0.6 },
    { x: "80%", y: "65%", size: 3, delay: 0.1 },
    { x: "90%", y: "80%", size: 2, delay: 0.8 },
    { x: "5%", y: "85%", size: 4, delay: 0.3 },
    { x: "15%", y: "90%", size: 2, delay: 0.5 },
    { x: "25%", y: "80%", size: 3, delay: 0.7 },
    { x: "35%", y: "95%", size: 2, delay: 0.2 },
    { x: "45%", y: "85%", size: 4, delay: 0.9 },
    { x: "55%", y: "90%", size: 2, delay: 0.4 },
    { x: "65%", y: "85%", size: 3, delay: 0.6 },
    { x: "75%", y: "95%", size: 2, delay: 0.1 },
    { x: "85%", y: "90%", size: 4, delay: 0.8 },
    { x: "95%", y: "70%", size: 2, delay: 0.3 },
    { x: "12%", y: "45%", size: 3, delay: 0.5 },
    { x: "22%", y: "38%", size: 2, delay: 0.7 },
    { x: "32%", y: "48%", size: 4, delay: 0.2 },
    { x: "42%", y: "28%", size: 2, delay: 0.9 },
    { x: "52%", y: "42%", size: 3, delay: 0.4 },
    { x: "62%", y: "58%", size: 2, delay: 0.6 },
    { x: "72%", y: "35%", size: 4, delay: 0.1 },
    { x: "82%", y: "45%", size: 2, delay: 0.8 },
    { x: "92%", y: "55%", size: 3, delay: 0.3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((star, index) => (
        <PixelStar
          key={index}
          x={star.x}
          y={star.y}
          size={star.size}
          delay={star.delay}
        />
      ))}
    </div>
  );
}

// Glitch Text Component
function GlitchText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 text-[#FF006E] opacity-70"
        animate={{
          x: [-2, 2, -2, 0],
          y: [1, -1, 1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear" as const,
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-[#00F5FF] opacity-70"
        animate={{
          x: [2, -2, 2, 0],
          y: [-1, 1, -1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3.5,
          ease: "linear" as const,
          delay: 0.1,
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </div>
  );
}

// Enhanced Pixel Button Component - Arcade Style
function PixelButton({
  children,
  href = "#about",
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";
  const bgColor = isPrimary ? "#FF006E" : "transparent";
  const borderColor = isPrimary ? "#FF006E" : "#00F5FF";
  const textColor = isPrimary ? "white" : "#00F5FF";
  const shadowColor = isPrimary ? "#990044" : "#00F5FF40";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.1, ease: "linear" }}
    >
      <Link
        href={href}
        className="relative inline-flex items-center gap-3 px-8 py-4 font-pixel text-sm tracking-wider"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          boxShadow: `
            -4px 0 0 0 ${borderColor},
            4px 0 0 0 ${borderColor},
            0 -4px 0 0 ${borderColor},
            0 4px 0 0 ${borderColor},
            0 8px 0 0 ${shadowColor},
            4px 8px 0 0 ${shadowColor},
            -4px 8px 0 0 ${shadowColor},
            inset -4px -4px 0 0 rgba(0, 0, 0, 0.2),
            inset 4px 4px 0 0 rgba(255, 255, 255, 0.2)
          `,
          margin: "0 4px",
          marginBottom: 8,
          imageRendering: "pixelated",
        }}
      >
        {children}
      </Link>
    </motion.div>
  );
}

// Pixel Badge Component - Arcade Style with Stronger Blink
function PixelBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "linear" as const, delay: 0.2 }}
      className="mb-8"
    >
      <motion.span
        className="inline-flex items-center gap-3 px-5 py-3 font-pixel text-sm text-[#0D0221] bg-[#00F5FF] crt-glow"
        style={{
          boxShadow: `
            -4px 0 0 0 #00F5FF,
            4px 0 0 0 #00F5FF,
            0 -4px 0 0 #00F5FF,
            0 4px 0 0 #00F5FF,
            -4px -4px 0 0 #FFD60A,
            4px -4px 0 0 #FFD60A,
            -4px 4px 0 0 #FFD60A,
            4px 4px 0 0 #FFD60A,
            inset -4px -4px 0 0 rgba(0, 0, 0, 0.2),
            inset 4px 4px 0 0 rgba(255, 255, 255, 0.3)
          `,
          margin: 4,
        }}
        animate={{
          opacity: [1, 1, 0.3, 1, 1, 0.3, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.4, 0.5, 0.6, 0.9, 0.95, 1],
        }}
      >
        <motion.span
          className="w-3 h-3 bg-[#FF006E]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {children}
      </motion.span>
    </motion.div>
  );
}

// Typewriter Text Component
function TypewriterText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.1 }}
      className={`relative ${className}`}
    >
      <motion.span
        className="inline-block overflow-hidden whitespace-nowrap"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          duration: 2,
          delay: delay + 0.2,
          ease: "linear" as const,
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="inline-block w-2 h-[1em] bg-current ml-1 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "linear" as const,
        }}
      />
    </motion.div>
  );
}

// Scroll Indicator Component
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.3, ease: "linear" }}
      aria-hidden="true"
    >
      <span className="font-vt323 text-sm text-[#B8B8D1] uppercase tracking-widest">
        PRESS START
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="text-[#00F5FF]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="mx-auto"
        >
          <rect x="6" y="0" width="4" height="4" />
          <rect x="4" y="4" width="8" height="4" />
          <rect x="2" y="8" width="12" height="4" />
          <rect x="0" y="12" width="16" height="4" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// Wood texture button for fantasy theme
function WoodButton({
  children,
  href = "#about",
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.1, ease: "linear" }}
    >
      <Link
        href={href}
        className={`relative inline-flex items-center gap-3 px-8 py-4 font-pixel text-sm tracking-wider ${
          isPrimary ? "text-white" : "text-[#8D6E63]"
        }`}
        style={{
          backgroundColor: isPrimary ? "#7CB342" : "transparent",
          boxShadow: isPrimary
            ? "-4px 0 0 0 #558B2F, 4px 0 0 0 #558B2F, 0 -4px 0 0 #558B2F, 0 4px 0 0 #558B2F, 0 8px 0 0 #3E2723, inset -4px -4px 0 0 rgba(0, 0, 0, 0.2), inset 4px 4px 0 0 rgba(255, 255, 255, 0.2)"
            : "-4px 0 0 0 #8D6E63, 4px 0 0 0 #8D6E63, 0 -4px 0 0 #8D6E63, 0 4px 0 0 #8D6E63, 0 8px 0 0 #3E2723",
          margin: "0 4px",
          marginBottom: 8,
          imageRendering: "pixelated",
        }}
      >
        {children}
      </Link>
    </motion.div>
  );
}

// Fantasy Badge
function FantasyBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "linear" as const, delay: 0.2 }}
      className="mb-8"
    >
      <span
        className="inline-flex items-center gap-3 px-5 py-3 font-pixel text-sm"
        style={{
          backgroundColor: "#FFD54F",
          color: "#3E2723",
          boxShadow:
            "-4px 0 0 0 #FFB74D, 4px 0 0 0 #FFB74D, 0 -4px 0 0 #FFB74D, 0 4px 0 0 #FFB74D, -4px -4px 0 0 #8D6E63, 4px -4px 0 0 #8D6E63, -4px 4px 0 0 #8D6E63, 4px 4px 0 0 #8D6E63, inset -4px -4px 0 0 rgba(0, 0, 0, 0.1), inset 4px 4px 0 0 rgba(255, 255, 255, 0.3)",
          margin: 4,
        }}
      >
        <span className="w-3 h-3 bg-[#7CB342] animate-blink" />
        {children}
      </span>
    </motion.div>
  );
}

// Main Hero Component
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fantasy Nature Background */}
      <FantasyBackground />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Main container with cloud style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative p-8 sm:p-12"
            style={{
              backgroundColor: "rgba(255, 248, 231, 0.95)",
              boxShadow:
                "-4px 0 0 0 #8D6E63, 4px 0 0 0 #8D6E63, 0 -4px 0 0 #8D6E63, 0 4px 0 0 #8D6E63, -8px 0 0 0 #A1887F, 8px 0 0 0 #A1887F, 0 -8px 0 0 #A1887F, 0 8px 0 0 #A1887F, 0 12px 20px rgba(0,0,0,0.1), inset -4px -4px 0 0 rgba(0, 0, 0, 0.05), inset 4px 4px 0 0 rgba(255, 255, 255, 0.5)",
              margin: 12,
            }}
          >
            {/* Corner decorations - leaves */}
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#7CB342]" />
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#7CB342]" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#7CB342]" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#7CB342]" />

            {/* Fantasy Badge */}
            <FantasyBadge>ADVENTURE AWAITS</FantasyBadge>

            {/* Main headline */}
            <h1 className="mb-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2"
                style={{ color: "#3E2723" }}
              >
                MARIO CLAUDIUS
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="font-vt323 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest"
                style={{ color: "#7CB342" }}
              >
                FULL-STACK DEVELOPER
              </motion.div>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
              className="max-w-2xl mb-8 font-vt323 text-lg sm:text-xl text-[#6D4C41] text-center"
            >
              A passionate developer from Surabaya, Indonesia. Building modern web applications with React, Next.js, and TypeScript.
            </motion.p>

            {/* Stats Row - Nature themed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.3, ease: "linear" }}
              className="mb-10"
            >
              <div
                className="inline-flex flex-wrap items-center justify-center gap-2 px-6 py-4 font-vt323 text-lg"
                style={{
                  backgroundColor: "#FFF8E7",
                  boxShadow:
                    "-4px 0 0 0 #7CB342, 4px 0 0 0 #7CB342, 0 -4px 0 0 #7CB342, 0 4px 0 0 #7CB342, inset -4px -4px 0 0 rgba(0, 0, 0, 0.05), inset 4px 4px 0 0 rgba(255, 255, 255, 0.5)",
                }}
              >
                <div className="flex items-center gap-2 px-3">
                  <span className="text-[#7CB342] font-pixel text-sm">LVL</span>
                  <span className="text-[#8D6E63]">:</span>
                  <span className="text-[#3E2723] font-pixel">SENIOR</span>
                </div>

                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-[#FFD54F]" />
                  <div className="w-1 h-1 bg-[#FFD54F]" />
                  <div className="w-1 h-1 bg-[#FFD54F]" />
                </div>

                <div className="flex items-center gap-2 px-3">
                  <span className="text-[#7CB342] font-pixel text-sm">EXP</span>
                  <span className="text-[#8D6E63]">:</span>
                  <span className="text-[#3E2723] font-pixel">3+ YEARS</span>
                </div>

                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-[#FFD54F]" />
                  <div className="w-1 h-1 bg-[#FFD54F]" />
                  <div className="w-1 h-1 bg-[#FFD54F]" />
                </div>

                <div className="flex items-center gap-2 px-3">
                  <span className="text-[#7CB342] font-pixel text-sm">GPA</span>
                  <span className="text-[#8D6E63]">:</span>
                  <span className="text-[#3E2723] font-pixel">3.38/4.00</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.3, ease: "linear" }}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <WoodButton href="#about" variant="primary">
                <ArrowDown className="w-4 h-4" />
                START JOURNEY
              </WoodButton>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1, ease: "linear" }}
              >
                <Link
                  href="https://github.com/Messes72"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 font-pixel text-sm text-[#8D6E63] hover:text-[#7CB342] transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.3 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 font-vt323 text-sm text-[#6D4C41]"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#7CB342] animate-blink" />
                <span className="text-[#7CB342]">Open for opportunities</span>
              </div>
              <span className="text-[#FFD54F]">*</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8D6E63]" />
                <span>Surabaya, Indonesia</span>
              </div>
              <span className="text-[#FFD54F]">*</span>
              <a
                href="mailto:marioclaudius10@gmail.com"
                className="flex items-center gap-2 hover:text-[#7CB342] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#8D6E63]" />
                <span>marioclaudius10@gmail.com</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.3, ease: "linear" }}
        aria-hidden="true"
      >
        <span className="font-vt323 text-sm uppercase tracking-widest" style={{ color: "#6D4C41" }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ color: "#7CB342" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="6" y="0" width="4" height="4" />
            <rect x="4" y="4" width="8" height="4" />
            <rect x="2" y="8" width="12" height="4" />
            <rect x="0" y="12" width="16" height="4" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
