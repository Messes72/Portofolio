"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import {
  Swords,
  Users,
  Brain,
  Star,
  MapPin,
  Trophy,
  Scroll,
  Shield,
  Crown,
  Gem,
  Flower,
  Leaf,
} from "lucide-react";

// Fantasy Stats configuration - nature themed colors
const fantasyStats = [
  { name: "STR", label: "Hardworking", value: 85, color: "bg-[#7CB342]", icon: Swords },
  { name: "INT", label: "Communication", value: 78, color: "bg-[#4FC3F7]", icon: Brain },
  { name: "CHA", label: "Team Player", value: 82, color: "bg-[#F48FB1]", icon: Users },
  { name: "XP", label: "Eager to Learn", value: 92, color: "bg-[#FFD54F]", icon: Star },
];

// Quests (Education & Experience)
const quests = [
  {
    id: 1,
    title: "Universitas Kristen Petra",
    subtitle: "Informatika Degree",
    details: "GPA: 3.38/4.00 | Graduating 2026",
    icon: Scroll,
    type: "education",
    completed: true,
  },
  {
    id: 2,
    title: "PT Cross Network Indonesia",
    subtitle: "Internship Quest",
    details: "Jan - Jun 2025 | Hospital Management App",
    icon: Shield,
    type: "experience",
    completed: true,
  },
];

// Wood border style component for fantasy theme
const WoodBorder = ({ children, className = "", variant = "oak" }: { children: React.ReactNode; className?: string; variant?: "oak" | "birch" | "dark" }) => {
  const variantMap = {
    oak: {
      outer: "#8D6E63",
      inner: "#A1887F",
      shadow: "rgba(141, 110, 99, 0.3)",
    },
    birch: {
      outer: "#A1887F",
      inner: "#BCAAA4",
      shadow: "rgba(161, 136, 127, 0.3)",
    },
    dark: {
      outer: "#6D4C41",
      inner: "#8D6E63",
      shadow: "rgba(109, 76, 65, 0.3)",
    },
  };

  const colors = variantMap[variant];

  return (
    <div
      className={`relative ${className}`}
      style={{
        boxShadow: `
          -4px 0 0 0 ${colors.outer},
          4px 0 0 0 ${colors.outer},
          0 -4px 0 0 ${colors.outer},
          0 4px 0 0 ${colors.outer},
          -8px 0 0 0 ${colors.inner},
          8px 0 0 0 ${colors.inner},
          0 -8px 0 0 ${colors.inner},
          0 8px 0 0 ${colors.inner},
          0 12px 20px ${colors.shadow},
          inset -4px -4px 0 0 rgba(0, 0, 0, 0.1),
          inset 4px 4px 0 0 rgba(255, 255, 255, 0.3)
        `,
        margin: 8,
      }}
    >
      {children}
    </div>
  );
};

// Leaf progress bar component
const LeafBar = ({ value, max = 100, color = "bg-[#7CB342]", height = "h-4" }: { value: number; max?: number; color?: string; height?: string }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`relative ${height} w-full border-2 border-[#8D6E63]/30 bg-[#FFF8E7]`}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className={`h-full ${color}`}
        style={{
          boxShadow: `inset -2px -2px 0px 0px rgba(0,0,0,0.2), inset 2px 2px 0px 0px rgba(255,255,255,0.3)`,
        }}
      />
    </div>
  );
};

// Stat Item with counting animation - Fantasy themed
const StatItem = ({ stat, index }: { stat: typeof fantasyStats[0]; index: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = stat.value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setDisplayValue(stat.value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group"
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex h-10 w-10 items-center justify-center border-2 border-[#8D6E63]/30"
          style={{ backgroundColor: "rgba(124, 179, 66, 0.1)" }}
        >
          <Icon className="h-5 w-5 text-[#7CB342]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm tracking-wider text-[#3E2723]">{stat.name}</span>
            <span className="font-mono text-lg font-bold text-[#7CB342]">{displayValue}</span>
          </div>
          <span className="text-xs text-[#6D4C41]">{stat.label}</span>
        </div>
      </div>
      <LeafBar value={displayValue} color={stat.color} height="h-3" />
    </motion.div>
  );
};

// Quest Item - Fantasy themed
const QuestItem = ({ quest, index }: { quest: typeof quests[0]; index: number }) => {
  const Icon = quest.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
      className="relative border-2 border-[#8D6E63]/20 bg-[#FFF8E7] p-4 hover:border-[#7CB342]/50 transition-colors"
    >
      {/* Quest complete badge */}
      <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center bg-[#FFD54F] border-2 border-[#8D6E63]">
        <Trophy className="h-3 w-3 text-[#3E2723]" />
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#7CB342]/50 bg-[#7CB342]/10">
          <Icon className="h-6 w-6 text-[#7CB342]" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-[#3E2723] text-sm">{quest.title}</h4>
          <p className="text-xs text-[#7CB342] font-medium">{quest.subtitle}</p>
          <p className="text-xs text-[#6D4C41] mt-1">{quest.details}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Flower decoration component
function FlowerDecoration({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="4" fill="#FFD54F" />
        <circle cx="16" cy="8" r="4" fill="#F48FB1" />
        <circle cx="24" cy="16" r="4" fill="#F48FB1" />
        <circle cx="16" cy="24" r="4" fill="#F48FB1" />
        <circle cx="8" cy="16" r="4" fill="#F48FB1" />
      </svg>
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: avatarRef,
    offset: ["start end", "end start"],
  });

  const avatarY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden py-20 md:py-32"
      style={{
        background: "linear-gradient(180deg, #FFF8E7 0%, #B0E0E6 50%, #87CEEB 100%)",
      }}
    >
      {/* Decorative flowers */}
      <FlowerDecoration className="top-20 left-[10%]" />
      <FlowerDecoration className="top-40 right-[15%]" />
      <FlowerDecoration className="bottom-40 left-[5%]" />
      <FlowerDecoration className="top-60 right-[8%]" />

      {/* Decorative leaves */}
      <motion.div
        className="absolute top-32 left-[20%] text-[#7CB342]"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Leaf className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute bottom-60 right-[25%] text-[#66BB6A]"
        animate={{ y: [0, -8, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Leaf className="w-6 h-6" />
      </motion.div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Fantasy Style */}
        <AnimatedSection className="mb-12">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3"
              style={{
                backgroundColor: "#FFF8E7",
                boxShadow:
                  "-4px 0 0 0 #8D6E63, 4px 0 0 0 #8D6E63, 0 -4px 0 0 #8D6E63, 0 4px 0 0 #8D6E63, -8px 0 0 0 #A1887F, 8px 0 0 0 #A1887F, 0 12px 20px rgba(0,0,0,0.1)",
                margin: 8,
              }}
            >
              <Crown className="h-6 w-6 text-[#FFD54F]" />
              <h2 className="text-2xl font-pixel font-bold tracking-wider text-[#3E2723] uppercase">
                Adventurer Profile
              </h2>
              <Crown className="h-6 w-6 text-[#FFD54F]" />
            </motion.div>
            <p className="mt-4 text-sm text-[#6D4C41] uppercase tracking-widest font-vt323">
              Discover the journey
            </p>
          </div>
        </AnimatedSection>

        {/* Fantasy Character Screen Layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Avatar & Basic Info */}
          <motion.div
            ref={avatarRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Player Avatar Frame */}
            <WoodBorder variant="oak">
              <div className="bg-[#FFF8E7] p-4">
                {/* Player Label */}
                <div className="mb-4 flex items-center justify-between border-b-2 border-[#8D6E63]/20 pb-2">
                  <span className="text-xs font-bold font-pixel text-[#7CB342] tracking-wider">PLAYER 1</span>
                  <div className="flex items-center gap-1">
                    <Gem className="h-4 w-4 text-[#4FC3F7]" />
                    <span className="text-xs text-[#6D4C41]">READY</span>
                  </div>
                </div>

                {/* Avatar Display */}
                <motion.div
                  style={{
                    y: avatarY,
                    background: "linear-gradient(135deg, #B0E0E6 0%, #87CEEB 100%)",
                  }}
                  className="relative aspect-square overflow-hidden border-4 border-[#8D6E63]/30"
                >
                  {/* Fantasy character placeholder */}
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    {/* Simple pixel art style adventurer */}
                    <div className="relative">
                      {/* Head with leaf crown */}
                      <div className="w-16 h-16 bg-[#F5CBA7] border-4 border-[#8D6E63] relative">
                        {/* Leaf crown */}
                        <div className="absolute -top-2 left-2 w-4 h-4 bg-[#7CB342]" />
                        <div className="absolute -top-3 left-6 w-4 h-4 bg-[#66BB6A]" />
                        <div className="absolute -top-2 left-10 w-4 h-4 bg-[#7CB342]" />
                        {/* Eyes */}
                        <div className="absolute top-5 left-3 w-3 h-3 bg-[#3E2723]" />
                        <div className="absolute top-5 right-3 w-3 h-3 bg-[#3E2723]" />
                        {/* Smile */}
                        <div className="absolute bottom-4 left-5 w-5 h-2 bg-[#3E2723]" />
                      </div>
                      {/* Body - green tunic */}
                      <div className="w-20 h-14 bg-[#7CB342] border-4 border-[#8D6E63] -ml-2 mt-0" />
                      {/* Belt */}
                      <div className="absolute top-16 left-0 w-16 h-3 bg-[#8D6E63]" />
                      {/* Arms */}
                      <div className="absolute top-14 -left-4 w-4 h-10 bg-[#F5CBA7] border-4 border-[#8D6E63]" />
                      <div className="absolute top-14 -right-4 w-4 h-10 bg-[#F5CBA7] border-4 border-[#8D6E63]" />
                    </div>
                    <p className="mt-4 text-xs text-[#6D4C41] font-vt323">LV. 5 ADVENTURER</p>
                  </div>

                  {/* Subtle grass pattern overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 4px,
                        #7CB342 4px,
                        #7CB342 5px
                      )`,
                    }}
                  />
                </motion.div>

                {/* HP/MP/XP Bars - Nature themed */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-pixel text-[#7CB342] w-8">HP</span>
                    <LeafBar value={100} max={100} color="bg-[#7CB342]" height="h-4" />
                    <span className="text-xs font-mono text-[#7CB342]">100/100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-pixel text-[#4FC3F7] w-8">MP</span>
                    <LeafBar value={85} max={100} color="bg-[#4FC3F7]" height="h-4" />
                    <span className="text-xs font-mono text-[#4FC3F7]">85/100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-pixel text-[#FFD54F] w-8">XP</span>
                    <LeafBar value={65} max={100} color="bg-[#FFD54F]" height="h-4" />
                    <span className="text-xs font-mono text-[#FFD54F]">65%</span>
                  </div>
                </div>
              </div>
            </WoodBorder>

            {/* Character Info Card */}
            <WoodBorder variant="birch">
              <div className="bg-[#FFF8E7] p-4">
                <h3 className="text-xs font-bold font-pixel text-[#8D6E63] mb-4 uppercase tracking-wider border-b-2 border-[#8D6E63]/20 pb-2">
                  Adventurer Data
                </h3>
                <div className="space-y-3 font-vt323 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6D4C41]">NAME:</span>
                    <span className="font-bold text-[#3E2723]">MARIO CLAUDIUS HADINATA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6D4C41]">CLASS:</span>
                    <span className="font-bold text-[#7CB342]">FULL-STACK DEV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6D4C41]">LEVEL:</span>
                    <span className="font-bold text-[#4FC3F7]">LV. 5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6D4C41]">LOCATION:</span>
                    <span className="font-bold text-[#3E2723] flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-[#7CB342]" />
                      SURABAYA, ID
                    </span>
                  </div>
                </div>
              </div>
            </WoodBorder>
          </motion.div>

          {/* Right Column - Stats & Quests */}
          <div className="space-y-6">
            {/* Stats Panel */}
            <WoodBorder variant="oak">
              <div className="bg-[#FFF8E7] p-4">
                <h3 className="text-xs font-bold font-pixel text-[#7CB342] mb-6 uppercase tracking-wider border-b-2 border-[#8D6E63]/20 pb-2">
                  Base Stats
                </h3>
                <div className="space-y-5">
                  {fantasyStats.map((stat, index) => (
                    <StatItem key={stat.name} stat={stat} index={index} />
                  ))}
                </div>
              </div>
            </WoodBorder>

            {/* Quests Completed Panel */}
            <WoodBorder variant="dark">
              <div className="bg-[#FFF8E7] p-4">
                <h3 className="text-xs font-bold font-pixel text-[#FFD54F] mb-4 uppercase tracking-wider border-b-2 border-[#8D6E63]/20 pb-2 flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Quests Completed
                </h3>
                <div className="space-y-4">
                  {quests.map((quest, index) => (
                    <QuestItem key={quest.id} quest={quest} index={index} />
                  ))}
                </div>
              </div>
            </WoodBorder>

            {/* Bio Description */}
            <WoodBorder variant="birch">
              <div className="bg-[#FFF8E7] p-4">
                <h3 className="text-xs font-bold font-pixel text-[#4FC3F7] mb-3 uppercase tracking-wider border-b-2 border-[#8D6E63]/20 pb-2">
                  Adventure Log
                </h3>
                <p className="text-sm text-[#6D4C41] leading-relaxed font-vt323">
                  A passionate Full-Stack Developer currently exploring the realms of Informatics at
                  Universitas Kristen Petra. Recently completed the Internship Quest at{" "}
                  <span className="text-[#3E2723] font-bold">PT Cross Network Indonesia</span>,
                  where I crafted Hospital Management systems using Svelte & Tailwind CSS.
                </p>
                <p className="text-sm text-[#6D4C41] leading-relaxed mt-3 font-vt323">
                  Always seeking new adventures to level up my skills and discover new technologies!
                </p>
              </div>
            </WoodBorder>
          </div>
        </div>

        {/* Bottom decoration - floating leaves */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex justify-center gap-4"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Leaf
                className="w-6 h-6"
                style={{
                  color: ["#7CB342", "#66BB6A", "#9CCC65", "#4FC3F7", "#F48FB1"][i],
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
