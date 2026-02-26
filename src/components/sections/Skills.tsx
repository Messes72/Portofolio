"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import skillsData from "@/lib/data/skills.json";
import {
  Code2,
  Server,
  Smartphone,
  Wrench,
  Languages,
  type LucideIcon,
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  key: string;
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

// Map skill icons to Lucide icons or use emoji fallbacks
const getSkillIcon = (iconName: string): string => {
  const iconMap: Record<string, string> = {
    react: "React",
    svelte: "Svelte",
    htmlcss: "HTML/CSS",
    tailwind: "Tailwind",
    javascript: "JS",
    nodejs: "Node.js",
    php: "PHP",
    laravel: "Laravel",
    python: "Python",
    flutter: "Flutter",
    android: "Android",
    firebase: "Firebase",
    git: "Git",
    figma: "Figma",
    supabase: "Supabase",
    laragon: "Laragon",
    xampp: "XAMPP",
    java: "Java",
  };
  return iconMap[iconName] || iconName;
};

// Get color based on skill level
const getSkillLevelColor = (level: number): string => {
  if (level >= 80) return "bg-blue-500"; // Expert
  if (level >= 60) return "bg-indigo-500"; // Proficient
  if (level >= 40) return "bg-amber-500"; // Intermediate
  return "bg-gray-400"; // Beginner
};

const getSkillLevelText = (level: number): string => {
  if (level >= 80) return "Expert";
  if (level >= 60) return "Proficient";
  if (level >= 40) return "Intermediate";
  return "Beginner";
};

const getSkillLevelTextColor = (level: number): string => {
  if (level >= 80) return "text-blue-600 dark:text-blue-400";
  if (level >= 60) return "text-indigo-600 dark:text-indigo-400";
  if (level >= 40) return "text-amber-600 dark:text-amber-400";
  return "text-gray-500 dark:text-gray-400";
};

// Skill Bar Component with animation
function SkillBar({ skill, delay = 0 }: { skill: Skill; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const progressColor = getSkillLevelColor(skill.level);
  const levelText = getSkillLevelText(skill.level);
  const textColor = getSkillLevelTextColor(skill.level);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold ${textColor} transition-all duration-300`}
            whileHover={{ scale: 1.1 }}
            animate={isHovered ? { scale: 1.1, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" } : {}}
          >
            {getSkillIcon(skill.icon)}
          </motion.span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {skill.name}
          </span>
        </div>
        <span className={`text-sm font-medium ${textColor}`}>{skill.level}%</span>
      </div>

      {/* Progress Bar Container */}
      <div
        className="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency: ${skill.level}%`}
      >
        <motion.div
          className={`h-full ${progressColor} rounded-full`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        />
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs rounded-lg whitespace-nowrap shadow-lg pointer-events-none"
      >
        <span className="font-medium">{levelText}</span>
        <span className="mx-1.5 text-zinc-400">|</span>
        <span>{skill.level}% Proficiency</span>
        {/* Arrow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45" />
      </motion.div>
    </motion.div>
  );
}

// Skill Category Card
function SkillCategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="h-full border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            </div>
            <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {category.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          {category.skills.map((skill, skillIndex) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              delay={index * 0.1 + skillIndex * 0.1}
            />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Main Skills Section
export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories: SkillCategory[] = [
    {
      key: "frontend",
      title: "Frontend",
      icon: Code2,
      skills: skillsData.frontend,
    },
    {
      key: "backend",
      title: "Backend",
      icon: Server,
      skills: skillsData.backend,
    },
    {
      key: "mobile",
      title: "Mobile",
      icon: Smartphone,
      skills: skillsData.mobile,
    },
    {
      key: "tools",
      title: "Tools",
      icon: Wrench,
      skills: skillsData.tools,
    },
    {
      key: "languages",
      title: "Languages",
      icon: Languages,
      skills: skillsData.languages,
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 md:py-32 bg-zinc-50 dark:bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-800 rounded-full"
          >
            What I Know
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Skills & Technologies
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Expert (80%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Proficient (60-79%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Intermediate (40-59%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Beginner (&lt;40%)</span>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <SkillCategoryCard
              key={category.key}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
