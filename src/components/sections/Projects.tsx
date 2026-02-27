"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { getFeaturedProjects } from "@/lib/data";
import { Leaf, Flower } from "lucide-react";

const featuredProjects = getFeaturedProjects(4);

// Pixel decorative elements - nature style
function PixelDecoration({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-1 ${className}`}>
      <div className="w-2 h-2 bg-current" />
      <div className="w-2 h-2 bg-current" />
      <div className="w-2 h-2 bg-current" />
    </div>
  );
}

// Wood corner decoration
function WoodCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const baseClasses = "absolute w-4 h-4 border-4";
  const positionClasses = {
    tl: "-top-2 -left-2 border-r-0 border-b-0 border-[#8D6E63]",
    tr: "-top-2 -right-2 border-l-0 border-b-0 border-[#8D6E63]",
    bl: "-bottom-2 -left-2 border-r-0 border-t-0 border-[#8D6E63]",
    br: "-bottom-2 -right-2 border-l-0 border-t-0 border-[#8D6E63]",
  };

  return (
    <div
      className={`${baseClasses} ${positionClasses[position]}`}
      style={{ borderImage: "none" }}
    />
  );
}

// Floating leaf component
function FloatingLeaf({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <Leaf className="w-5 h-5 text-[#7CB342]/60" />
    </motion.div>
  );
}

// Floating flower component
function FloatingFlower({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <Flower className="w-4 h-4 text-[#F48FB1]/60" />
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden py-20 md:py-32"
      style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #B0E0E6 50%, #FFF8E7 100%)",
      }}
    >
      {/* Decorative grass foreground at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(124, 179, 66, 0.2) 100%)",
        }}
      />

      {/* Floating clouds */}
      <motion.div
        className="absolute top-16 left-10 opacity-40"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="60" height="30" viewBox="0 0 60 30" fill="white">
          <rect x="5" y="15" width="10" height="10" />
          <rect x="15" y="8" width="10" height="10" />
          <rect x="25" y="8" width="10" height="10" />
          <rect x="35" y="15" width="10" height="10" />
          <rect x="15" y="18" width="20" height="10" fill="white" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-32 right-16 opacity-30"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      >
        <svg width="50" height="25" viewBox="0 0 50 25" fill="white">
          <rect x="5" y="12" width="8" height="8" />
          <rect x="13" y="6" width="8" height="8" />
          <rect x="21" y="6" width="8" height="8" />
          <rect x="29" y="12" width="8" height="8" />
        </svg>
      </motion.div>

      {/* Floating decorations */}
      <FloatingLeaf delay={0} className="top-24 left-[15%]" />
      <FloatingLeaf delay={1.5} className="top-40 right-[20%]" />
      <FloatingLeaf delay={3} className="bottom-32 left-[10%]" />
      <FloatingFlower delay={0.5} className="top-36 left-[25%]" />
      <FloatingFlower delay={2} className="bottom-40 right-[15%]" />

      {/* Pixel decoration corners - nature colored */}
      <div className="absolute top-8 left-8 text-[#7CB342]/40">
        <div className="flex flex-col gap-1">
          <PixelDecoration />
          <PixelDecoration />
        </div>
      </div>
      <div className="absolute top-8 right-8 text-[#7CB342]/40">
        <div className="flex flex-col gap-1 items-end">
          <PixelDecoration />
          <PixelDecoration />
        </div>
      </div>
      <div className="absolute bottom-8 left-8 text-[#7CB342]/40">
        <div className="flex flex-col gap-1">
          <PixelDecoration />
          <PixelDecoration />
        </div>
      </div>
      <div className="absolute bottom-8 right-8 text-[#7CB342]/40">
        <div className="flex flex-col gap-1 items-end">
          <PixelDecoration />
          <PixelDecoration />
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Nature Treasure Collection Style */}
        <AnimatedSection className="mb-16 text-center">
          {/* Wood border container */}
          <div
            className="relative inline-block p-8"
            style={{
              backgroundColor: "rgba(255, 248, 231, 0.9)",
              boxShadow:
                "-4px 0 0 0 #8D6E63, 4px 0 0 0 #8D6E63, 0 -4px 0 0 #8D6E63, 0 4px 0 0 #8D6E63",
              margin: 4,
            }}
          >
            <WoodCorner position="tl" />
            <WoodCorner position="tr" />
            <WoodCorner position="bl" />
            <WoodCorner position="br" />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="mb-4 flex items-center justify-center gap-2"
            >
              <PixelDecoration className="text-[#7CB342]" />
              <span
                className="text-xs md:text-sm text-[#7CB342] uppercase tracking-widest font-vt323"
              >
                Discover Treasures
              </span>
              <PixelDecoration className="text-[#7CB342]" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl lg:text-4xl text-[#3E2723] uppercase tracking-tight font-pixel"
            >
              <span className="text-[#4FC3F7]">PROJECT</span>{" "}
              <span className="text-[#7CB342]">COLLECTION</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto mt-4 max-w-2xl text-lg md:text-xl text-[#6D4C41] font-vt323"
            >
              Adventures I have embarked on
            </motion.p>

            {/* Blinking cursor animation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 flex items-center justify-center gap-2"
            >
              <span
                className="text-sm text-[#8D6E63] uppercase font-vt323"
              >
                Scroll to explore
              </span>
              <motion.span
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  times: [0, 0.25, 0.75, 1],
                }}
                className="w-3 h-3 bg-[#7CB342]"
              />
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Projects Grid - Treasure Collection */}
        <AnimatedSection delay={0.2}>
          <ProjectGrid projects={featuredProjects} />
        </AnimatedSection>

        {/* View All Link - Wood Button Style */}
        <AnimatedSection delay={0.4} className="mt-16 text-center">
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              className="relative group"
            >
              {/* Wood button shadow */}
              <div
                className="absolute inset-0 translate-x-1 translate-y-1 rounded-none"
                style={{ backgroundColor: "#6D4C41" }}
              />
              {/* Button face */}
              <div
                className="relative px-8 py-4 border-4"
                style={{
                  background: "linear-gradient(to bottom, #7CB342, #558B2F)",
                  borderColor: "#8D6E63",
                }}
              >
                <span
                  className="text-sm md:text-base text-white uppercase tracking-widest block font-pixel"
                >
                  VIEW ALL PROJECTS
                </span>
                {/* Decorative pixels on button */}
                <div className="absolute top-1 left-1 w-1 h-1 bg-white/50" />
                <div className="absolute top-1 right-1 w-1 h-1 bg-white/50" />
                <div className="absolute bottom-1 left-1 w-1 h-1 bg-black/30" />
                <div className="absolute bottom-1 right-1 w-1 h-1 bg-black/30" />
              </div>
            </motion.button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
