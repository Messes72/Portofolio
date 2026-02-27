"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { GameCartridge } from "./GameCartridge";

interface ProjectGridProps {
  projects: Project[];
}

type FilterCategory = "All" | "Web" | "Mobile" | "Live" | "Development";

const filters: FilterCategory[] = ["All", "Web", "Mobile", "Live", "Development"];

// Pixel filter button component - Arcade Style
function PixelFilterButton({
  filter,
  isActive,
  onClick,
}: {
  filter: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      className="relative"
    >
      {/* Shadow layer */}
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-slate-900" />
      {/* Button face */}
      <div
        className={`relative px-4 py-2.5 border-2 transition-all duration-200 ${
          isActive
            ? "bg-primary border-primary-foreground/40 shadow-inner"
            : "bg-slate-700 border-slate-600 hover:bg-slate-600"
        }`}
      >
        <span
          className={`text-xs uppercase tracking-widest ${
            isActive ? "text-white" : "text-slate-300"
          }`}
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          {filter}
        </span>
        {/* Corner pixels */}
        {isActive && (
          <>
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/50" />
            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white/50" />
            <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-black/30" />
            <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-black/30" />
          </>
        )}
      </div>
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeFilter"
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

// Empty state - Game Over Screen
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
        {/* Border */}
        <div className="absolute inset-0 bg-slate-800 translate-x-2 translate-y-2" />
        <div className="relative border-4 border-slate-600 p-10 bg-slate-900">
          <motion.p
            className="text-red-500 text-2xl md:text-3xl mb-4"
            style={{ fontFamily: "var(--font-pixel)" }}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            GAME OVER
          </motion.p>
          <p
            className="text-slate-400 text-xl mb-6"
            style={{ fontFamily: "var(--font-vt323)" }}
          >
            No cartridges found in this category
          </p>
          <div className="flex items-center justify-center gap-2">
            <motion.span
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                times: [0, 0.25, 0.75, 1],
              }}
              className="w-3 h-3 bg-white"
            />
            <span
              className="text-slate-500 text-sm"
              style={{ fontFamily: "var(--font-vt323)" }}
            >
              Press any key to continue...
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
        className="flex flex-wrap justify-center gap-3 mb-12"
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
        <div className="flex items-center gap-2 text-slate-600">
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
