"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import skillsData from "@/lib/data/skills.json";
import {
  Sword,
  Shield,
  Zap,
  Backpack,
  Brain,
  Star,
  Code2,
  Layout,
  Palette,
  Terminal,
  Database,
  Server,
  Smartphone,
  Flame,
  Box,
  GitBranch,
  Figma,
  Coffee,
  FileCode,
  Waves,
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  key: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  skills: Skill[];
  color: string;
  borderColor: string;
  glowColor: string;
}

// Map skill names to display names
const getSkillDisplayName = (iconName: string): string => {
  const nameMap: Record<string, string> = {
    react: "REACT",
    svelte: "SVELTE",
    htmlcss: "HTML/CSS",
    tailwind: "TAILWIND",
    javascript: "JAVASCRIPT",
    nodejs: "NODE.JS",
    php: "PHP",
    laravel: "LARAVEL",
    python: "PYTHON",
    flutter: "FLUTTER",
    android: "ANDROID",
    firebase: "FIREBASE",
    git: "GIT",
    figma: "FIGMA",
    supabase: "SUPABASE",
    laragon: "LARAGON",
    xampp: "XAMPP",
    java: "JAVA",
  };
  return nameMap[iconName] || iconName.toUpperCase();
};

// Map skill names to icons
const getSkillIcon = (iconName: string): React.ElementType => {
  const iconMap: Record<string, React.ElementType> = {
    react: Code2,
    svelte: Waves,
    htmlcss: Layout,
    tailwind: Palette,
    javascript: Terminal,
    nodejs: Server,
    php: FileCode,
    laravel: Box,
    python: Coffee,
    flutter: Smartphone,
    android: Smartphone,
    firebase: Flame,
    git: GitBranch,
    figma: Figma,
    supabase: Database,
    laragon: Server,
    xampp: Server,
    java: Coffee,
  };
  return iconMap[iconName] || Code2;
};

// Convert percentage to RPG level (1-5)
const getSkillLevel = (level: number): number => {
  if (level >= 90) return 5;
  if (level >= 70) return 4;
  if (level >= 50) return 3;
  if (level >= 30) return 2;
  return 1;
};

// Get mastery title based on level
const getMasteryTitle = (level: number): string => {
  if (level >= 90) return "MASTER";
  if (level >= 70) return "EXPERT";
  if (level >= 50) return "ADEPT";
  return "NOVICE";
};

// Category color schemes - Fantasy nature palette
const categoryColors: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  frontend: { bg: "#4FC3F7", border: "#4FC3F7", glow: "rgba(79, 195, 247, 0.3)", text: "text-[#4FC3F7]" },
  backend: { bg: "#8D6E63", border: "#8D6E63", glow: "rgba(141, 110, 99, 0.3)", text: "text-[#8D6E63]" },
  mobile: { bg: "#F48FB1", border: "#F48FB1", glow: "rgba(244, 143, 177, 0.3)", text: "text-[#F48FB1]" },
  tools: { bg: "#FFD54F", border: "#FFD54F", glow: "rgba(255, 213, 79, 0.3)", text: "text-[#FFD54F]" },
  languages: { bg: "#7CB342", border: "#7CB342", glow: "rgba(124, 179, 66, 0.3)", text: "text-[#7CB342]" },
};

// Pixel XP Bar Component with segmented display
function PixelXPBar({ level, categoryKey, delay = 0 }: { level: number; categoryKey: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const rpgLevel = getSkillLevel(level);
  const colors = categoryColors[categoryKey];

  // Calculate filled segments (10 segments total)
  const filledSegments = Math.ceil((level / 100) * 10);

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay }}
    >
      {/* XP Bar Container */}
      <div className="flex-1 flex gap-[2px] h-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <motion.div
            key={index}
            className="flex-1 border border-[#8D6E63]/20"
            style={{
              backgroundColor: index < filledSegments && isInView ? colors.bg : "transparent",
              borderColor: index < filledSegments && isInView ? colors.border : "#8D6E63",
              boxShadow: index < filledSegments && isInView ? `0 0 4px ${colors.glow}` : "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.1,
              delay: delay + (index * 0.05),
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Level Badge */}
      <motion.div
        className="px-1.5 py-0.5 text-[10px] font-bold border border-[#8D6E63]/50 bg-[#FFF8E7]"
        style={{
          color: colors.border,
          fontFamily: "monospace",
          letterSpacing: "0.05em"
        }}
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.5 }}
      >
        Lv.{rpgLevel}
      </motion.div>
    </motion.div>
  );
}

// Skill Item Component
function SkillItem({ skill, categoryKey, delay = 0 }: { skill: Skill; categoryKey: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const colors = categoryColors[categoryKey];
  const masteryTitle = getMasteryTitle(skill.level);

  // Get first letter of skill name for icon
  const skillLetter = skill.name.charAt(0).toUpperCase();

  return (
    <motion.div
      ref={ref}
      className="relative p-3 border border-[#8D6E63]/20 bg-[#FFF8E7] hover:border-[#8D6E63]/40 transition-colors cursor-pointer group"
      style={{
        imageRendering: "pixelated",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={isHovered ? { opacity: 0.1 } : { opacity: 0 }}
        style={{ backgroundColor: colors.bg }}
      />

      {/* Skill Header with Icon */}
      <div className="flex items-center gap-2 mb-2">
        {/* Skill Icon */}
        <div
          className="w-6 h-6 flex items-center justify-center border text-[10px] font-bold"
          style={{
            borderColor: isHovered ? colors.border : "#8D6E63",
            color: isHovered ? colors.border : "#6D4C41",
            backgroundColor: "rgba(255,248,231,0.5)",
            fontFamily: "monospace",
            transition: "all 0.2s"
          }}
        >
          {skillLetter}
        </div>
        <span
          className="text-xs font-bold tracking-wider uppercase flex-1"
          style={{
            color: isHovered ? colors.border : "#3E2723",
            fontFamily: "monospace",
            transition: "color 0.2s"
          }}
        >
          {getSkillDisplayName(skill.icon)}
        </span>
        <span
          className="text-[10px] px-1.5 py-0.5 border"
          style={{
            color: colors.border,
            borderColor: colors.border,
            fontFamily: "monospace"
          }}
        >
          {masteryTitle}
        </span>
      </div>

      {/* XP Bar */}
      <PixelXPBar level={skill.level} categoryKey={categoryKey} delay={delay + 0.1} />

      {/* Tooltip */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 px-2 py-1 text-[10px] whitespace-nowrap pointer-events-none"
        style={{
          backgroundColor: "#FFF8E7",
          border: `1px solid ${colors.border}`,
          color: colors.border,
          fontFamily: "monospace",
        }}
        initial={{ opacity: 0, y: 5 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
        transition={{ duration: 0.15 }}
      >
        XP: {skill.level}/100
        {/* Pixel Arrow */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
          style={{ backgroundColor: "#FFF8E7", borderRight: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}` }}
        />
      </motion.div>
    </motion.div>
  );
}

// Category Card Component
function CategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = category.icon;
  const colors = categoryColors[category.key];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Category Card Container */}
      <div
        className="h-full border-2 p-4 bg-[#FFF8E7]"
        style={{
          borderColor: colors.border,
          boxShadow: `0 0 20px ${colors.glow}, inset 0 0 20px rgba(0,0,0,0.1)`
        }}
      >
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#8D6E63]/20">
          <div
            className="p-2 border"
            style={{
              borderColor: colors.border,
              backgroundColor: "rgba(124, 179, 66, 0.1)"
            }}
          >
            <Icon className="w-5 h-5" style={{ color: colors.border }} />
          </div>
          <div>
            <h3
              className="text-sm font-bold tracking-widest uppercase"
              style={{
                color: colors.border,
                fontFamily: "monospace",
                letterSpacing: "0.1em",
                textShadow: `0 0 10px ${colors.glow}`
              }}
            >
              {category.title}
            </h3>
            <p
              className="text-[10px] uppercase tracking-wider"
              style={{ color: "#6D4C41", fontFamily: "monospace" }}
            >
              {category.subtitle}
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="space-y-2">
          {category.skills.map((skill, skillIndex) => (
            <SkillItem
              key={skill.name}
              skill={skill}
              categoryKey={category.key}
              delay={index * 0.1 + skillIndex * 0.08}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Pixel Star Rating Component
function PixelStars({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <Star
          key={i}
          className="w-3 h-3"
          fill={i < count ? color : "transparent"}
          stroke={color}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

// Main Skills Section
export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories: SkillCategory[] = [
    {
      key: "frontend",
      title: "OFFENSIVE",
      subtitle: "Combat Skills",
      icon: Sword,
      skills: skillsData.frontend,
      color: categoryColors.frontend.bg,
      borderColor: categoryColors.frontend.border,
      glowColor: categoryColors.frontend.glow,
    },
    {
      key: "backend",
      title: "DEFENSIVE",
      subtitle: "Support Skills",
      icon: Shield,
      skills: skillsData.backend,
      color: categoryColors.backend.bg,
      borderColor: categoryColors.backend.border,
      glowColor: categoryColors.backend.glow,
    },
    {
      key: "mobile",
      title: "MOBILITY",
      subtitle: "Movement Skills",
      icon: Zap,
      skills: skillsData.mobile,
      color: categoryColors.mobile.bg,
      borderColor: categoryColors.mobile.border,
      glowColor: categoryColors.mobile.glow,
    },
    {
      key: "tools",
      title: "UTILITY",
      subtitle: "Tools & Items",
      icon: Backpack,
      skills: skillsData.tools,
      color: categoryColors.tools.bg,
      borderColor: categoryColors.tools.border,
      glowColor: categoryColors.tools.glow,
    },
    {
      key: "languages",
      title: "KNOWLEDGE",
      subtitle: "Intellect Skills",
      icon: Brain,
      skills: skillsData.languages,
      color: categoryColors.languages.bg,
      borderColor: categoryColors.languages.border,
      glowColor: categoryColors.languages.glow,
    },
  ];

  // Legend data - Fantasy Theme Palette
  const legendItems = [
    { title: "MASTER", level: "90%+", stars: 4, color: "#7CB342" },
    { title: "EXPERT", level: "70-89%", stars: 3, color: "#4FC3F7" },
    { title: "ADEPT", level: "50-69%", stars: 2, color: "#FFD54F" },
    { title: "NOVICE", level: "<50%", stars: 1, color: "#8D6E63" },
  ];

  return (
    <section
      id="skills"
      className="py-20 md:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #B0E0E6 50%, #FFF8E7 100%)",
      }}
    >
      {/* Decorative grass pattern */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(124, 179, 66, 0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #7CB342 1px, transparent 1px),
            linear-gradient(to bottom, #7CB342 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Pixel Decorative Border Top */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#7CB342]" />
              <div className="w-16 h-0.5 bg-[#7CB342]" />
              <div className="w-3 h-3 border-2 border-[#7CB342]" />
              <div className="w-16 h-0.5 bg-[#7CB342]" />
              <div className="w-2 h-2 bg-[#7CB342]" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-4"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#6D4C41] font-vt323">
              Character Stats
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#3E2723] mb-4 tracking-wider font-pixel"
            style={{
              letterSpacing: "0.15em",
            }}
          >
            ABILITIES
          </motion.h2>

          {/* Menu Style Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm text-[#6D4C41] max-w-md mx-auto"
            style={{ fontFamily: "monospace" }}
          >
            &gt; Select your skill to view details_
          </motion.p>

          {/* Pixel Decorative Border Bottom */}
          <motion.div
            className="flex justify-center mt-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400" />
              <div className="w-24 h-0.5 bg-cyan-400" />
              <div className="w-2 h-2 bg-cyan-400" />
            </div>
          </motion.div>
        </motion.div>

        {/* Skill Mastery Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div
            className="max-w-3xl mx-auto border border-[#8D6E63]/30 p-4 bg-[#FFF8E7]/80"
            style={{ fontFamily: "monospace" }}
          >
            <div className="text-center mb-3">
              <span className="text-xs tracking-widest uppercase text-[#8D6E63]">Skill Mastery Levels</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {legendItems.map((item) => (
                <div key={item.title} className="flex items-center gap-2 justify-center">
                  <PixelStars count={item.stars} color={item.color} />
                  <div className="text-xs">
                    <span style={{ color: item.color }} className="font-bold">{item.title}</span>
                    <span className="text-[#6D4C41] ml-1">({item.level})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Grid - Like Inventory Screen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.key}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cyan-400"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
