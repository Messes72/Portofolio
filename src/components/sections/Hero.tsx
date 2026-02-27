"use client";

import { motion } from "framer-motion";
import { Github, Mail, MapPin, ArrowDown } from "lucide-react";
import Link from "next/link";

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
        opacity: [0.2, 1, 0.2],
        scale: [1, 1.2, 1],
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

// Pixel Button Component
function PixelButton({
  children,
  href = "#about",
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
}) {
  const baseStyles =
    "relative inline-flex items-center gap-2 px-6 py-3 font-pixel text-sm tracking-wider transition-all duration-100";
  const variantStyles =
    variant === "primary"
      ? "bg-[#FF006E] text-white border-4 border-[#FF006E] hover:bg-[#FF1493] hover:border-[#FF1493]"
      : "bg-transparent text-[#00F5FF] border-4 border-[#00F5FF] hover:bg-[#00F5FF]/20";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1, ease: "linear" }}
    >
      <Link href={href} className={`${baseStyles} ${variantStyles} pixel-btn`}>
        {children}
      </Link>
    </motion.div>
  );
}

// Pixel Badge Component
function PixelBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "linear" as const, delay: 0.2 }}
      className="mb-8"
    >
      <span className="inline-flex items-center gap-2 px-4 py-2 font-vt323 text-lg text-[#00F5FF] border-2 border-[#00F5FF] bg-[#00F5FF]/10 crt-glow">
        <span className="w-2 h-2 bg-[#FF006E] animate-blink" />
        {children}
      </span>
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

// Main Hero Component
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0221] scanlines"
    >
      {/* Pixel Starfield Background */}
      <PixelStarfield />

      {/* Pixel Clouds */}
      <PixelCloud x="5%" y="20%" delay={0} duration={12} />
      <PixelCloud x="70%" y="30%" delay={3} duration={15} />
      <PixelCloud x="20%" y="70%" delay={6} duration={10} />
      <PixelCloud x="80%" y="60%" delay={2} duration={14} />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00F5FF 1px, transparent 1px),
            linear-gradient(to bottom, #00F5FF 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Pixel Badge */}
          <PixelBadge>PLAYER 1 READY</PixelBadge>

          {/* Main headline with glitch effect */}
          <h1 className="mb-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-wider mb-2 crt-glow"
            >
              <GlitchText text="MARIO CLAUDIUS" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="font-vt323 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#00F5FF] tracking-widest"
            >
              <GlitchText text="FULL-STACK DEVELOPER" className="crt-glow" />
            </motion.div>
          </h1>

          {/* Subheadline with typewriter effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.3 }}
            className="max-w-2xl mb-8"
          >
            <TypewriterText
              text="&gt; A passionate developer from Surabaya, Indonesia. Building modern web applications with React, Next.js, and TypeScript. Currently pursuing Informatics at Universitas Kristen Petra."
              className="font-vt323 text-lg sm:text-xl text-[#B8B8D1] text-center"
              delay={1.4}
            />
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.3, ease: "linear" }}
            className="flex flex-wrap items-center justify-center gap-6 mb-10 font-vt323 text-[#B8B8D1]"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#FFD60A]">LVL:</span>
              <span>SENIOR</span>
            </div>
            <span className="text-[#FF006E]">|</span>
            <div className="flex items-center gap-2">
              <span className="text-[#FFD60A]">EXP:</span>
              <span>3+ YEARS</span>
            </div>
            <span className="text-[#FF006E]">|</span>
            <div className="flex items-center gap-2">
              <span className="text-[#FFD60A]">GPA:</span>
              <span>3.38/4.00</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.3, ease: "linear" }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <PixelButton href="#about" variant="primary">
              <ArrowDown className="w-4 h-4" />
              PRESS START
            </PixelButton>

            {/* GitHub Link */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1, ease: "linear" }}
            >
              <Link
                href="https://github.com/Messes72"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 font-pixel text-sm text-[#00F5FF] hover:text-white transition-colors"
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
            className="mt-12 flex flex-wrap items-center justify-center gap-6 font-vt323 text-sm text-[#B8B8D1]"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#39FF14] animate-blink" />
              <span className="text-[#39FF14]">Open for opportunities</span>
            </div>
            <span className="text-[#FF006E]">*</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FFD60A]" />
              <span>Surabaya, Indonesia</span>
            </div>
            <span className="text-[#FF006E]">*</span>
            <a
              href="mailto:marioclaudius10@gmail.com"
              className="flex items-center gap-2 hover:text-[#00F5FF] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#FFD60A]" />
              <span>marioclaudius10@gmail.com</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D0221] to-transparent pointer-events-none" />
    </section>
  );
}
