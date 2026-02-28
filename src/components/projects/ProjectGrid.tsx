"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { GameCartridge } from "./GameCartridge";

interface ProjectGridProps {
  projects: Project[];
}

type FilterCategory = "All" | "Web" | "Mobile" | "Full-Stack" | "Live" | "Development";

const filters: FilterCategory[] = ["All", "Web", "Mobile", "Full-Stack", "Live", "Development"];

// Theme colors for filter buttons - Nature palette
const THEME_COLORS = {
  sky: "#87CEEB",       // sky-blue
  grass: "#7CB342",     // grass-green
  wood: "#8D6E63",      // earth-brown
  sun: "#FFD54F",       // sun-yellow
  leaf: "#66BB6A",      // leaf-green
  flower: "#F48FB1",    // flower-pink
};

// Pixel filter button component - Enhanced Arcade Style
function PixelFilterButton({
  filter,
  isActive,
  onClick,
}: {
  filter: string;
  isActive: boolean;
  onClick: () => void;
}) {
  // Get accent color based on filter
  const getAccentColor = () => {
    switch (filter) {
      case "Web": return THEME_COLORS.sky;
      case "Mobile": return THEME_COLORS.flower;
      case "Full-Stack": return THEME_COLORS.wood;
      case "Development": return THEME_COLORS.sun;
      case "Live": return THEME_COLORS.grass;
      default: return THEME_COLORS.leaf;
    }
  };

  const accentColor = getAccentColor();

  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.95, y: 2 }}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      className="relative"
    >
      {/* 3D Shadow layer */}
      <div
        className="absolute inset-0 translate-x-2 translate-y-2 rounded-none"
        style={{
          backgroundColor: isActive ? accentColor : "#5D4037",
          opacity: 0.5,
        }}
      />
      {/* Button face */}
      <div
        className="relative px-5 py-3 border-2 transition-all duration-200"
        style={{
          backgroundColor: isActive ? accentColor : "#8D6E63",
          borderColor: isActive ? "rgba(255,255,255,0.4)" : "#A1887F",
        }}
      >
        <span
          className="text-xs uppercase tracking-widest font-bold"
          style={{
            fontFamily: "var(--font-pixel)",
            color: isActive ? "#3E2723" : "#FFF8E7",
          }}
        >
          {filter}
        </span>
        {/* Corner pixels for active state */}
        {isActive && (
          <>
            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/50" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/50" />
            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-black/30" />
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-black/30" />
          </>
        )}
      </div>
      {/* Active indicator - blinking cursor */}
      {isActive && (
        <motion.div
          layoutId="activeFilter"
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2"
          style={{ backgroundColor: accentColor }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      {/* Hover glow */}
      {!isActive && (
        <motion.div
          className="absolute -inset-1 opacity-0 hover:opacity-30 transition-opacity blur-md -z-10 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      )}
    </motion.button>
  );
}

// Empty state - No Games Found
function EmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="text-center py-16"
    >
      <div className="inline-block relative">
        {/* 3D Shadow */}
        <div className="absolute inset-0 bg-[#5D4037] translate-x-3 translate-y-3" />
        {/* Border frame */}
        <div className="relative border-4 border-[#8D6E63] p-12 bg-[#FFF8E7]">
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-4 border-l-4 border-[#7CB342]" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-4 border-r-4 border-[#7CB342]" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-4 border-l-4 border-[#7CB342]" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-4 border-r-4 border-[#7CB342]" />

          <motion.p
            className="text-2xl md:text-3xl mb-4"
            style={{ fontFamily: "var(--font-pixel)", color: THEME_COLORS.sun }}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            NO GAMES FOUND
          </motion.p>
          <p
            className="text-[#6D4C41] text-xl mb-6"
            style={{ fontFamily: "var(--font-vt323)" }}
          >
            No cartridges in this category
          </p>
          <div className="flex items-center justify-center gap-3">
            <motion.span
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                times: [0, 0.25, 0.75, 1],
              }}
              className="w-3 h-3"
              style={{ backgroundColor: THEME_COLORS.grass }}
            />
            <span
              className="text-[#8D6E63] text-sm"
              style={{ fontFamily: "var(--font-vt323)" }}
            >
              Try another filter...
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => {
      switch (activeFilter) {
        case "Web":
          return project.category === "web";
        case "Mobile":
          return project.category === "mobile";
        case "Full-Stack":
          return project.category === "full-stack";
        case "Live":
          return project.status === "live";
        case "Development":
          return project.status === "in-development";
        default:
          return true;
      }
    });
  }, [projects, activeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filter Buttons - Game Menu Style */}
      <div
        className="flex flex-wrap justify-center gap-4 mb-12"
        role="tablist"
        aria-label="Filter cartridges by category"
      >
        {filters.map((filter) => (
          <PixelFilterButton
            key={filter}
            filter={filter}
            isActive={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          />
        ))}
      </div>

      {/* Cartridge Grid - Game Selection Screen */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            id="projects-grid"
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
            aria-live="polite"
            aria-atomic="true"
          >
            {filteredProjects.map((project, index) => (
              <GameCartridge
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative pixel elements */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2 text-[#8D6E63]">
          <div className="w-2 h-2 bg-current" />
          <div className="w-2 h-2 bg-current" />
          <div className="w-2 h-2 bg-current" />
          <span
            className="text-xs mx-4"
            style={{ fontFamily: "var(--font-vt323)" }}
          >
            END OF LIST
          </span>
          <div className="w-2 h-2 bg-current" />
          <div className="w-2 h-2 bg-current" />
          <div className="w-2 h-2 bg-current" />
        </div>
      </div>
    </div>
  );
}
