"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import {
  Code2,
  Database,
  Globe,
  Layout,
  Smartphone,
  Server,
  Cpu,
  Layers,
  Braces,
  FileCode,
  Palette,
  Wind,
  Flame,
  Box,
  Hexagon,
  CircleDot,
  Terminal,
  Coffee,
  Monitor,
  GitBranch,
  Cloud,
  FlameKindling,
} from "lucide-react";

// Nature theme color palette
const THEME_COLORS = {
  sky: "#87CEEB",       // sky-blue
  grass: "#7CB342",     // grass-green
  wood: "#8D6E63",      // earth-brown
  sun: "#FFD54F",       // sun-yellow
  leaf: "#66BB6A",      // leaf-green
  flower: "#F48FB1",    // flower-pink
};

// Cartridge label colors by category - strict theme adherence
const categoryColors: Record<
  string,
  { bg: string; border: string; text: string; glow: string; hex: string }
> = {
  web: {
    bg: "bg-[#87CEEB]",
    border: "border-[#5DADE2]",
    text: "text-[#1B4F72]",
    glow: "shadow-[#87CEEB]/50",
    hex: THEME_COLORS.sky,
  },
  mobile: {
    bg: "bg-[#F48FB1]",
    border: "border-[#EC407A]",
    text: "text-[#880E4F]",
    glow: "shadow-[#F48FB1]/50",
    hex: THEME_COLORS.flower,
  },
  "full-stack": {
    bg: "bg-[#8D6E63]",
    border: "border-[#6D4C41]",
    text: "text-[#3E2723]",
    glow: "shadow-[#8D6E63]/50",
    hex: THEME_COLORS.wood,
  },
  other: {
    bg: "bg-[#FFD54F]",
    border: "border-[#FFB74D]",
    text: "text-[#BF360C]",
    glow: "shadow-[#FFD54F]/50",
    hex: THEME_COLORS.sun,
  },
};

// Status badges - Nature theme colors
const statusBadges: Record<string, { label: string; bg: string; textColor: string }> = {
  live: { label: "NEW RELEASE", bg: "bg-[#7CB342]", textColor: "text-[#3E2723]" },
  "in-development": { label: "COMING SOON", bg: "bg-[#FFD54F]", textColor: "text-[#3E2723]" },
  archived: { label: "CLASSIC", bg: "bg-[#8D6E63]", textColor: "text-[#FFF8E7]" },
};

// Tech stack icon mapping to Lucide icons
const techIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Frontend
  "React": Code2,
  "Next.js": Globe,
  "Svelte": Flame,
  "Vue": Layers,
  "Angular": Hexagon,
  "TypeScript": FileCode,
  "JavaScript": Braces,
  "HTML": Layout,
  "CSS": Palette,
  "Tailwind CSS": Wind,
  "Bootstrap": Box,
  "Framer Motion": FlameKindling,
  "shadcn/ui": CircleDot,

  // Backend
  "Node.js": Server,
  "Laravel": Box,
  "PHP": Code2,
  "Python": Terminal,
  "MySQL": Database,
  "Supabase": Database,
  "Firebase": Flame,

  // Mobile
  "Flutter": Smartphone,
  "Dart": Terminal,
  "Android Studio": Monitor,

  // Languages & Tools
  "Java": Coffee,
  "Git": GitBranch,
  "GitHub": GitBranch,
  "Cloud": Cloud,
  "AWS": Cloud,
  "Vercel": Globe,
  "Docker": Box,
};

// Tech stack icons with Lucide icons
function TechIcon({ name }: { name: string }) {
  const IconComponent = techIconMap[name] || techIconMap[name.split(" ")[0]];

  if (IconComponent) {
    return (
      <div
        className="w-7 h-7 bg-[#5D4037] border-2 border-[#8D6E63] flex items-center justify-center shadow-inner"
        title={name}
      >
        <IconComponent className="w-4 h-4 text-[#FFF8E7]" />
      </div>
    );
  }

  // Fallback to first letter with pixel styling
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <div
      className="w-7 h-7 bg-[#5D4037] border-2 border-[#8D6E63] flex items-center justify-center shadow-inner"
      title={name}
    >
      <span
        className="text-[10px] text-[#FFF8E7] font-bold"
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
        <div key={i} className="w-1 h-full bg-[#8D6E63]/80" />
      ))}
    </div>
  );
}

// Pixel corner decoration
function PixelCorners({ color = "bg-[#8D6E63]" }: { color?: string }) {
  return (
    <>
      <div className={`absolute top-2 left-2 w-2 h-2 ${color}`} />
      <div className={`absolute top-2 right-2 w-2 h-2 ${color}`} />
      <div className={`absolute bottom-2 left-2 w-2 h-2 ${color}`} />
      <div className={`absolute bottom-2 right-2 w-2 h-2 ${color}`} />
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
  const hasImage = project.thumbnail && project.thumbnail.length > 0;

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
        <div className="absolute inset-0 translate-y-3 translate-x-2 bg-[#3E2723]/60" />

        {/* Cartridge Body */}
        <div className="relative bg-[#3E2723] border-4 border-[#8D6E63] overflow-hidden">
          {/* NES-style grip lines at top */}
          <div className="h-8 bg-[#5D4037] flex items-center justify-center border-b-4 border-[#8D6E63]">
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
                className={`absolute top-3 right-3 ${status.bg} px-2 py-1 shadow-lg`}
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

            {/* Screenshot / Image Area */}
            <div className="aspect-video bg-[#2D1B18] border-4 border-[#5D4037] flex items-center justify-center overflow-hidden relative">
              {/* Animated scanlines */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none z-10"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                }}
              />

              {hasImage ? (
                // Real image
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  onError={(e) => {
                    // Hide image on error, show placeholder
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                // Pixel art placeholder
                <>
                  {/* Checkerboard pixel pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, rgba(124,179,66,0.2) 25%, transparent 25%),
                        linear-gradient(-45deg, rgba(124,179,66,0.2) 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, rgba(124,179,66,0.2) 75%),
                        linear-gradient(-45deg, transparent 75%, rgba(124,179,66,0.2) 75%)
                      `,
                      backgroundSize: "8px 8px",
                      backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
                    }}
                  />

                  {/* Placeholder content */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    {/* Pixel art icon */}
                    <div className="grid grid-cols-4 gap-1">
                      {[...Array(16)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2.5 h-2.5"
                          style={{
                            backgroundColor: i % 3 === 0 ? colors.hex : "#5D4037",
                            opacity: i % 2 === 0 ? 1 : 0.6
                          }}
                          animate={{
                            opacity: [0.4, 1, 0.4],
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
                      className="text-[10px] text-[#8D6E63] uppercase"
                      style={{ fontFamily: "var(--font-pixel)" }}
                    >
                      NO SIGNAL
                    </span>
                  </div>
                </>
              )}

              {/* Corner pixels for authentic look */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-[#8D6E63] z-20" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#8D6E63] z-20" />
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-[#8D6E63] z-20" />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#8D6E63] z-20" />
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
                className="text-[10px] text-white/90 uppercase bg-black/20 px-2 py-0.5 border border-white/10"
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
          <div className="bg-[#3E2723] p-4">
            <div className="flex items-center justify-between">
              {/* Tech Stack Icons (Platform) */}
              <div className="flex gap-1.5 flex-wrap">
                {project.techStack.slice(0, 4).map((tech, i) => (
                  <TechIcon key={i} name={tech} />
                ))}
                {project.techStack.length > 4 && (
                  <div className="w-7 h-7 bg-[#5D4037] border-2 border-[#8D6E63] flex items-center justify-center">
                    <span
                      className="text-[7px] text-[#FFF8E7]"
                      style={{ fontFamily: "var(--font-pixel)" }}
                    >
                      +{project.techStack.length - 4}
                    </span>
                  </div>
                )}
              </div>

              {/* Play Button - Enhanced Pixel Arcade Style */}
              <motion.div
                className="relative group/btn"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, y: 1 }}
              >
                {/* 3D shadow */}
                <div
                  className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-none"
                  style={{ backgroundColor: "#558B2F" }}
                />
                {/* Button face */}
                <div
                  className="relative px-4 py-2.5 border-2 border-white/30"
                  style={{ backgroundColor: THEME_COLORS.grass }}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-pixel)", color: "#3E2723" }}
                  >
                    PLAY
                  </span>
                  {/* Corner pixels */}
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/40" />
                  <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white/40" />
                  <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-black/20" />
                  <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-black/20" />
                </div>
                {/* Hover glow */}
                <motion.div
                  className="absolute -inset-2 opacity-0 group-hover/btn:opacity-100 transition-opacity blur-md -z-10"
                  style={{ backgroundColor: THEME_COLORS.grass }}
                />
              </motion.div>
            </div>
          </div>

          {/* Grip lines at bottom */}
          <div className="h-6 bg-[#5D4037] flex items-center justify-center border-t-4 border-[#8D6E63]">
            <GripLines count={10} />
          </div>
        </div>

        {/* Hover Glow Effect - Enhanced */}
        <motion.div
          className={`absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}
          style={{ backgroundColor: colors.hex }}
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
