"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "character" | "word";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
} as const;

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
} as const;

export function TextReveal({
  text,
  className = "",
  delay = 0,
  splitBy = "character",
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const items = splitBy === "character" ? text.split("") : text.split(" ");

  // If user prefers reduced motion, render text without animation
  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const containerWithDelay = {
    ...containerVariants,
    visible: {
      ...containerVariants.visible,
      transition: {
        ...containerVariants.visible.transition,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerWithDelay}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block"
          style={{ whiteSpace: item === " " ? "pre" : "normal" }}
        >
          {item === " " ? "\u00A0" : item}
          {splitBy === "word" && index < items.length - 1 && (
            <span></span>
          )}
        </motion.span>
      ))}
    </motion.span>
  );
}
