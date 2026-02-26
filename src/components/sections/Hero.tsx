"use client";

import { motion } from "framer-motion";
import { Github, ChevronDown, ArrowDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// TextReveal Component - animasi staggered text reveal
function TextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          className="mr-[0.25em] inline-block"
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// MagneticButton Component - button dengan magnetic hover effect
function MagneticButton({
  children,
  className = "",
  href = "#projects",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link href={href}>
        <Button
          size="lg"
          className={`relative overflow-hidden group ${className}`}
        >
          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </Button>
      </Link>
    </motion.div>
  );
}

// FloatingShape Component - bentuk geometris yang mengambang
function FloatingShape({
  type,
  size,
  color,
  className = "",
  delay = 0,
  duration = 6,
}: {
  type: "circle" | "square" | "triangle";
  size: number;
  color: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const floatAnimation = {
    y: [0, -20, 0],
    rotate: type === "square" ? [0, 180, 360] : [0, 10, -10, 0],
    scale: [1, 1.05, 1],
  };

  const renderShape = () => {
    switch (type) {
      case "circle":
        return (
          <div
            className={`rounded-full ${color}`}
            style={{ width: size, height: size }}
          />
        );
      case "square":
        return (
          <div
            className={`rounded-lg ${color}`}
            style={{ width: size, height: size }}
          />
        );
      case "triangle":
        return (
          <div
            className="w-0 h-0"
            style={{
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid`,
              borderBottomColor: "currentColor",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`absolute ${className} ${type === "triangle" ? "text-primary/20 dark:text-primary/30" : ""}`}
      animate={floatAnimation}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
      style={{ willChange: "transform" }}
    >
      {renderShape()}
    </motion.div>
  );
}

// AnimatedGradient Component - background gradient yang bergerak
function AnimatedGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary gradient orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 blur-3xl"
        animate={{
          x: ["-20%", "10%", "-20%"],
          y: ["-20%", "20%", "-20%"],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "10%", left: "10%", willChange: "transform" }}
      />

      {/* Secondary gradient orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-secondary/20 to-accent/20 blur-3xl"
        animate={{
          x: ["20%", "-10%", "20%"],
          y: ["20%", "-20%", "20%"],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "20%", right: "10%", willChange: "transform" }}
      />

      {/* Accent gradient orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent/15 to-primary/25 blur-3xl"
        animate={{
          x: ["-30%", "30%", "-30%"],
          y: ["30%", "-30%", "30%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "40%", right: "30%", willChange: "transform" }}
      />

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
}

// ScrollIndicator Component - indikator scroll ke bawah
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <span className="text-xs text-muted-foreground uppercase tracking-widest">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </motion.div>
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
      {/* Animated gradient background */}
      <AnimatedGradient />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingShape
          type="circle"
          size={120}
          color="bg-primary/10 dark:bg-primary/20"
          className="top-[15%] left-[10%]"
          delay={0}
          duration={8}
        />
        <FloatingShape
          type="square"
          size={80}
          color="bg-secondary/15 dark:bg-secondary/25"
          className="top-[25%] right-[15%]"
          delay={1}
          duration={10}
        />
        <FloatingShape
          type="triangle"
          size={60}
          color=""
          className="bottom-[30%] left-[20%]"
          delay={2}
          duration={7}
        />
        <FloatingShape
          type="circle"
          size={40}
          color="bg-accent/20 dark:bg-accent/30"
          className="top-[60%] right-[25%]"
          delay={0.5}
          duration={9}
        />
        <FloatingShape
          type="square"
          size={50}
          color="bg-primary/15 dark:bg-primary/25"
          className="bottom-[20%] right-[10%]"
          delay={1.5}
          duration={11}
        />
        <FloatingShape
          type="circle"
          size={30}
          color="bg-secondary/20 dark:bg-secondary/30"
          className="top-[40%] left-[5%]"
          delay={2.5}
          duration={6}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Name badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
              Hello, I&apos;m Mario
            </span>
          </motion.div>

          {/* Main headline with text reveal animation */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <TextReveal
              text="Full-Stack Developer"
              className="text-foreground"
              delay={0.3}
            />
            <br />
            <TextReveal
              text="crafting digital experiences"
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              delay={0.6}
            />
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            A passionate developer from Surabaya, Indonesia. I build modern
            web applications with React, Next.js, and TypeScript. Currently
            pursuing Informatics at Universitas Kristen Petra with a GPA of
            3.38/4.00.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <MagneticButton className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg shadow-primary/25">
              <ArrowDown className="w-5 h-5" />
              View My Work
            </MagneticButton>

            {/* Social links */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="https://github.com/Messes72"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-4 text-lg text-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Open for opportunities</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span>Based in Surabaya, Indonesia</span>
            <span className="hidden sm:inline">•</span>
            <a
              href="mailto:marioclaudius10@gmail.com"
              className="hover:text-primary transition-colors"
            >
              marioclaudius10@gmail.com
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
