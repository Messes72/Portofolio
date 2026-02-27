"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { getFeaturedProjects } from "@/lib/data";

const featuredProjects = getFeaturedProjects(4);

// Pixel decorative elements
function PixelDecoration({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-1 ${className}`}>
      <div className="w-2 h-2 bg-current" />
      <div className="w-2 h-2 bg-current" />
      <div className="w-2 h-2 bg-current" />
    </div>
  );
}

// Retro game corner decoration
function PixelCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const baseClasses = "absolute w-4 h-4 border-4 border-current";
  const positionClasses = {
    tl: "-top-2 -left-2 border-r-0 border-b-0",
    tr: "-top-2 -right-2 border-l-0 border-b-0",
    bl: "-bottom-2 -left-2 border-r-0 border-t-0",
    br: "-bottom-2 -right-2 border-l-0 border-t-0",
  };

  return (
    <div
      className={`${baseClasses} ${positionClasses[position]}`}
      style={{ borderImage: "none" }}
    />
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-slate-950 py-20 md:py-32"
    >
      {/* Pixel grid background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
        }}
      />

      {/* Retro scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      {/* Pixel decoration corners */}
      <div className="absolute top-8 left-8 text-primary/30">
        <div className="flex flex-col gap-1">
          <PixelDecoration />
          <PixelDecoration />
        </div>
      </div>
      <div className="absolute top-8 right-8 text-primary/30">
        <div className="flex flex-col gap-1 items-end">
          <PixelDecoration />
          <PixelDecoration />
        </div>
      </div>
      <div className="absolute bottom-8 left-8 text-primary/30">
        <div className="flex flex-col gap-1">
          <PixelDecoration />
          <PixelDecoration />
        </div>
      </div>
      <div className="absolute bottom-8 right-8 text-primary/30">
        <div className="flex flex-col gap-1 items-end">
          <PixelDecoration />
          <PixelDecoration />
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Game Cartridge Collection Style */}
        <AnimatedSection className="mb-16 text-center">
          {/* Pixel border container */}
          <div className="relative inline-block p-8">
            <PixelCorner position="tl" />
            <PixelCorner position="tr" />
            <PixelCorner position="bl" />
            <PixelCorner position="br" />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="mb-4 flex items-center justify-center gap-2"
            >
              <PixelDecoration className="text-[#FFD60A]" />
              <span
                className="text-xs md:text-sm text-[#FFD60A] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-vt323)" }}
              >
                SELECT GAME
              </span>
              <PixelDecoration className="text-[#FFD60A]" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl lg:text-4xl text-white uppercase tracking-tight"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              <span className="text-[#00F5FF]">CARTRIDGE</span>{" "}
              <span className="text-[#FF006E]">COLLECTION</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto mt-4 max-w-2xl text-lg md:text-xl text-[#a1a1aa]"
              style={{ fontFamily: "var(--font-vt323)" }}
            >
              Choose a project to play
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
                className="text-sm text-slate-500 uppercase"
                style={{ fontFamily: "var(--font-vt323)" }}
              >
                Press START to begin
              </span>
              <motion.span
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  times: [0, 0.25, 0.75, 1],
                }}
                className="w-3 h-3 bg-primary"
              />
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Projects Grid - Game Cartridges */}
        <AnimatedSection delay={0.2}>
          <ProjectGrid projects={featuredProjects} />
        </AnimatedSection>

        {/* View All Link - Arcade Button */}
        <AnimatedSection delay={0.4} className="mt-16 text-center">
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              className="relative group"
            >
              {/* Pixel button shadow */}
              <div className="absolute inset-0 translate-x-1 translate-y-1 bg-slate-800 rounded-none" />
              {/* Button face */}
              <div className="relative px-8 py-4 bg-gradient-to-b from-primary to-primary/80 border-4 border-primary-foreground/20">
                <span
                  className="text-sm md:text-base text-white uppercase tracking-widest block"
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  VIEW ALL GAMES
                </span>
                {/* Decorative pixels on button */}
                <div className="absolute top-1 left-1 w-1 h-1 bg-white/50" />
                <div className="absolute top-1 right-1 w-1 h-1 bg-white/50" />
                <div className="absolute bottom-1 left-1 w-1 h-1 bg-black/30" />
                <div className="absolute bottom-1 right-1 w-1 h-1 bg-black/30" />
              </div>
              {/* Hover glow effect */}
              <motion.div
                className="absolute -inset-2 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ zIndex: -1 }}
              />
            </motion.button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
