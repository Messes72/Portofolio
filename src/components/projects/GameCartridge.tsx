"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/types";

// Cartridge label colors by category
const categoryColors: Record<
  string,
  { bg: string; border: string; text: string; glow: string }
> = {
  web: {
    bg: "bg-cyan-500",
    border: "border-cyan-400",
    text: "text-cyan-900",
    glow: "shadow-cyan-500/50",
  },
  mobile: {
    bg: "bg-pink-500",
    border: "border-pink-400",
    text: "text-pink-900",
    glow: "shadow-pink-500/50",
  },
  "full-stack": {
    bg: "bg-purple-500",
    border: "border-purple-400",
    text: "text-purple-900",
    glow: "shadow-purple-500/50",
  },
  other: {
    bg: "bg-yellow-500",
    border: "border-yellow-400",
    text: "text-yellow-900",
    glow: "shadow-yellow-500/50",
  },
};

// Status badges - Arcade style
const statusBadges: Record<string, { label: string; color: string; textColor: string }> = {
  live: { label: "NEW RELEASE", color: "bg-green-500", textColor: "text-green-900" },
  "in-development": { label: "COMING SOON", color: "bg-yellow-400", textColor: "text-yellow-900" },
  archived: { label: "CLASSIC", color: "bg-slate-500", textColor: "text-slate-100" },
};

// Tech stack icons (simplified pixel representations)
function TechIcon({ name }: { name: string }) {
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <div
      className="w-6 h-6 bg-slate-700 border-2 border-slate-600 flex items-center justify-center shadow-inner"
      title={name}
    >
      <span
        className="text-[8px] text-white font-bold"
        style={{ fontFamily: "var(--font-pixel)" }}
      >
        {firstLetter}
      </span>
    </div>
  );
}

// Grip lines component - NES style
function GripLines({ count = 12 }: { count?: number }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="w-1 h-full bg-slate-600/80" />
      ))}
    </div>
  );
}

// Pixel corner decoration
function PixelCorners() {
  return (
    <>
      <div className="absolute top-2 left-2 w-2 h-2 bg-slate-600" />
      <div className="absolute top-2 right-2 w-2 h-2 bg-slate-600" />
      <div className="absolute bottom-2 left-2 w-2 h-2 bg-slate-600" />
      <div className="absolute bottom-2 right-2 w-2 h-2 bg-slate-600" />
    </>
  );
}

interface GameCartridgeProps {
  project: Project;
  index: number;
}

export function GameCartridge({ project, index }: GameCartridgeProps) {
  const colors = categoryColors[project.category] || categoryColors.other;
  const status = statusBadges[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      whileHover={{ y: -12, transition: { duration: 0.2, ease: "easeOut" } }}
      className="relative group cursor-pointer"
    >
      <Link href={`/projects/${project.id}`}>
        {/* Cartridge Shadow */}
        <div className="absolute inset-0 translate-y-3 translate-x-2 bg-black/60" />

        {/* Cartridge Body */}
        <div className="relative bg-slate-800 border-4 border-slate-600 overflow-hidden">
          {/* NES-style grip lines at top */}
          <div className="h-8 bg-slate-700 flex items-center justify-center border-b-4 border-slate-600">
            <GripLines count={14} />
          </div>

          {/* Cartridge Label */}
          <div className={`relative p-4 ${colors.bg} border-b-4 border-slate-600`}>
            <PixelCorners />

            {/* Status Badge */}
            {status && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.3 }}
                className={`absolute top-3 right-3 ${status.color} px-2 py-1 shadow-lg`}
                style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)" }}
              >
                <span
                  className={`text-[8px] ${status.textColor} font-bold uppercase tracking-wider`}
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  {status.label}
                </span>
              </motion.div>
            )}

            {/* Pixel Art Screenshot Placeholder */}
            <div className="aspect-video bg-slate-900 border-4 border-slate-800 flex items-center justify-center overflow-hidden relative">
              {/* Animated scanlines */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                }}
              />

              {/* Checkerboard pixel pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)
                  `,
                  backgroundSize: "8px 8px",
                  backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
                }}
              />

              {/* Placeholder text */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-slate-700"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
                <span
                  className="text-[10px] text-slate-500 uppercase mt-2"
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  NO IMAGE
                </span>
              </div>

              {/* Corner pixels for authentic look */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-slate-700" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-slate-700" />
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-slate-700" />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-slate-700" />
            </div>

            {/* Game Title */}
            <h3
              className="mt-4 text-xs md:text-sm text-white uppercase tracking-tight truncate leading-tight"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              {project.title}
            </h3>

            {/* Genre Tags */}
            <div className="flex items-center gap-2 mt-3">
              <span
                className="text-[10px] text-white/90 uppercase bg-black/20 px-2 py-0.5"
                style={{ fontFamily: "var(--font-vt323)" }}
              >
                {project.category}
              </span>
              <span
                className="text-[10px] text-white/60"
                style={{ fontFamily: "var(--font-vt323)" }}
              >
                • {project.techStack.length} players
              </span>
            </div>
          </div>

          {/* Cartridge Bottom - Platform Icons & Play Button */}
          <div className="bg-slate-800 p-4">
            <div className="flex items-center justify-between">
              {/* Tech Stack Icons (Platform) */}
              <div className="flex gap-1.5 flex-wrap">
                {project.techStack.slice(0, 4).map((tech, i) => (
                  <TechIcon key={i} name={tech} />
                ))}
                {project.techStack.length > 4 && (
                  <div className="w-6 h-6 bg-slate-700 border-2 border-slate-600 flex items-center justify-center">
                    <span
                      className="text-[6px] text-white"
                      style={{ fontFamily: "var(--font-pixel)" }}
                    >
                      +{project.techStack.length - 4}
                    </span>
                  </div>
                )}
              </div>

              {/* Play Button - Arcade Style */}
              <motion.div
                className="relative group/btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-green-700 translate-x-1 translate-y-1" />
                <div className="relative px-3 py-2 bg-green-500 border-2 border-green-400">
                  <span
                    className="text-[10px] text-white font-bold uppercase"
                    style={{ fontFamily: "var(--font-pixel)" }}
                  >
                    PLAY
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Grip lines at bottom */}
          <div className="h-6 bg-slate-700 flex items-center justify-center border-t-4 border-slate-600">
            <GripLines count={10} />
          </div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className={`absolute -inset-2 ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}
        />

        {/* Selected indicator - corner arrows */}
        <motion.div
          className="absolute -top-2 -left-2 text-white opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
        >
          <span
            className="text-lg"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            ▶
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
