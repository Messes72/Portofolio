"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface GlitchTextProps {
  text: string;
  className?: string;
  variant?: "default" | "cyber" | "retro";
  size?: "sm" | "md" | "lg" | "xl";
  triggerOnHover?: boolean;
}

export function GlitchText({
  text,
  className,
  variant = "default",
  size = "md",
  triggerOnHover = true,
}: GlitchTextProps) {
  const prefersReducedMotion = useReducedMotion();

  const sizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-5xl",
  };

  const variantColors = {
    default: {
      primary: "#4FC3F7",    // water-blue
      secondary: "#F48FB1", // flower-pink
      shadow: "#3E2723",    // text-dark
    },
    cyber: {
      primary: "#7CB342",    // grass-green
      secondary: "#FFD54F", // sun-yellow
      shadow: "#3E2723",    // text-dark
    },
    retro: {
      primary: "#8D6E63",    // earth-brown
      secondary: "#4FC3F7",  // water-blue
      shadow: "#3E2723",    // text-dark
    },
  };

  const colors = variantColors[variant];

  // Simple text reveal for reduced motion
  if (prefersReducedMotion) {
    return (
      <span className={cn("font-bold tracking-wider", sizeClasses[size], className)}>
        {text}
      </span>
    );
  }

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  const letters = text.split("");

  return (
    <motion.span
      className={cn(
        "relative inline-block font-bold tracking-wider",
        sizeClasses[size],
        className
      )}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      {...(triggerOnHover && {
        whileHover: "hover",
      })}
    >
      {/* RGB Split layers */}
      <span className="sr-only">{text}</span>

      {/* Cyan layer (left offset) */}
      <motion.span
        className="absolute top-0 left-0 -ml-0.5 opacity-70 mix-blend-screen pointer-events-none"
        style={{ color: colors.primary }}
        animate={{
          x: [0, -2, 2, -1, 0],
          opacity: [0.7, 0.5, 0.8, 0.6, 0.7],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        {text}
      </motion.span>

      {/* Magenta layer (right offset) */}
      <motion.span
        className="absolute top-0 left-0 ml-0.5 opacity-70 mix-blend-screen pointer-events-none"
        style={{ color: colors.secondary }}
        animate={{
          x: [0, 2, -2, 1, 0],
          opacity: [0.7, 0.8, 0.5, 0.7, 0.7],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          times: [0, 0.25, 0.5, 0.75, 1],
          delay: 0.1,
        }}
      >
        {text}
      </motion.span>

      {/* Main text */}
      <motion.span
        className="relative z-10"
        style={{ color: colors.shadow }}
        variants={containerVariants}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
            style={{
              whiteSpace: letter === " " ? "pre" : "normal",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.span>

      {/* Glitch bar effect */}
      <motion.span
        className="absolute inset-0 overflow-hidden pointer-events-none"
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 3,
          times: [0, 0.5, 1],
        }}
      >
        <span
          className="absolute w-full h-1 bg-current"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            color: colors.primary,
          }}
        />
      </motion.span>
    </motion.span>
  );
}

export default GlitchText;
