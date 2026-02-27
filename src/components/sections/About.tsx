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
} from "lucide-react";

// RPG Stats configuration
const rpgStats = [
  { name: "STR", label: "Hardworking", value: 85, color: "bg-[#FF006E]", icon: Swords },
  { name: "INT", label: "Communication", value: 78, color: "bg-[#00F5FF]", icon: Brain },
  { name: "CHA", label: "Team Player", value: 82, color: "bg-[#9D4EDD]", icon: Users },
  { name: "XP", label: "Eager to Learn", value: 92, color: "bg-[#39FF14]", icon: Star },
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

// Pixel border style component
const PixelBorder = ({ children, className = "", color = "cyan" }: { children: React.ReactNode; className?: string; color?: "cyan" | "purple" | "gold" }) => {
  const colorMap = {
    cyan: "border-[#00F5FF] shadow-[4px_4px_0px_0px_rgba(0,245,255,0.5)]",
    purple: "border-[#9D4EDD] shadow-[4px_4px_0px_0px_rgba(157,78,221,0.5)]",
    gold: "border-[#FFD60A] shadow-[4px_4px_0px_0px_rgba(255,214,10,0.5)]",
  };

  return (
    <div className={`border-4 ${colorMap[color]} ${className}`}>
      {children}
    </div>
  );
};

// Pixel progress bar component
const PixelBar = ({ value, max = 100, color = "bg-green-500", height = "h-4" }: { value: number; max?: number; color?: string; height?: string }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`relative ${height} w-full border-2 border-foreground/20 bg-muted`}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className={`h-full ${color}`}
        style={{
          boxShadow: `inset -2px -2px 0px 0px rgba(0,0,0,0.3), inset 2px 2px 0px 0px rgba(255,255,255,0.3)`,
        }}
      />
    </div>
  );
};

// Stat Item with counting animation
const StatItem = ({ stat, index }: { stat: typeof rpgStats[0]; index: number }) => {
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
        <div className={`flex h-10 w-10 items-center justify-center border-2 border-foreground/20 ${stat.color.replace('bg-', 'bg-')}/20`}>
          <Icon className={`h-5 w-5 ${stat.color.replace('bg-', 'text-')}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm tracking-wider text-foreground">{stat.name}</span>
            <span className="font-mono text-lg font-bold text-[#FFD60A]">{displayValue}</span>
          </div>
          <span className="text-xs text-muted-foreground">{stat.label}</span>
        </div>
      </div>
      <PixelBar value={displayValue} color={stat.color} height="h-3" />
    </motion.div>
  );
};

// Quest Item
const QuestItem = ({ quest, index }: { quest: typeof quests[0]; index: number }) => {
  const Icon = quest.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
      className="relative border-2 border-foreground/10 bg-card p-4 hover:border-primary/50 transition-colors"
    >
      {/* Quest complete badge */}
      <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center bg-[#FFD60A] border-2 border-foreground">
        <Trophy className="h-3 w-3 text-black" />
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-primary/50 bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-foreground text-sm">{quest.title}</h4>
          <p className="text-xs text-[#FFD60A] font-medium">{quest.subtitle}</p>
          <p className="text-xs text-muted-foreground mt-1">{quest.details}</p>
        </div>
      </div>
    </motion.div>
  );
};

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
      className="relative w-full overflow-hidden bg-background py-20 md:py-32"
    >
      {/* Pixel grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 4px,
          currentColor 4px,
          currentColor 5px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 4px,
          currentColor 4px,
          currentColor 5px
        )`,
      }} />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Game Style */}
        <AnimatedSection className="mb-12">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 border-4 border-cyan-400 bg-card px-6 py-3 shadow-[4px_4px_0px_0px_rgba(34,211,238,0.5)]"
            >
              <Crown className="h-6 w-6 text-[#FFD60A]" />
              <h2 className="text-2xl font-bold tracking-wider text-foreground uppercase">
                Player Profile
              </h2>
              <Crown className="h-6 w-6 text-[#FFD60A]" />
            </motion.div>
            <p className="mt-4 text-sm text-muted-foreground uppercase tracking-widest">
              Press START to view stats
            </p>
          </div>
        </AnimatedSection>

        {/* RPG Character Screen Layout */}
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
            <PixelBorder color="gold" className="relative">
              <div className="bg-card p-4">
                {/* Player Label */}
                <div className="mb-4 flex items-center justify-between border-b-2 border-foreground/10 pb-2">
                  <span className="text-xs font-bold text-[#00F5FF] tracking-wider">PLAYER 1</span>
                  <div className="flex items-center gap-1">
                    <Gem className="h-4 w-4 text-purple-500" />
                    <span className="text-xs text-muted-foreground">READY</span>
                  </div>
                </div>

                {/* Avatar Display */}
                <motion.div
                  style={{ y: avatarY }}
                  className="relative aspect-square overflow-hidden border-4 border-foreground/20 bg-gradient-to-br from-muted to-muted/50"
                >
                  {/* Pixel character placeholder */}
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    {/* Simple pixel art style avatar using divs */}
                    <div className="relative">
                      {/* Head */}
                      <div className="w-16 h-16 bg-primary border-4 border-foreground relative">
                        {/* Eyes */}
                        <div className="absolute top-4 left-2 w-3 h-3 bg-foreground" />
                        <div className="absolute top-4 right-2 w-3 h-3 bg-foreground" />
                        {/* Smile */}
                        <div className="absolute bottom-3 left-4 w-6 h-2 bg-foreground" />
                      </div>
                      {/* Body */}
                      <div className="w-20 h-12 bg-secondary border-4 border-foreground -ml-2 mt-0" />
                      {/* Arms */}
                      <div className="absolute top-16 -left-4 w-4 h-10 bg-primary border-4 border-foreground" />
                      <div className="absolute top-16 -right-4 w-4 h-10 bg-primary border-4 border-foreground" />
                    </div>
                    <p className="mt-6 text-xs text-muted-foreground font-mono">LV. 5 DEVELOPER</p>
                  </div>

                  {/* Scanlines effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(0,0,0,0.3) 2px,
                      rgba(0,0,0,0.3) 4px
                    )`,
                  }} />
                </motion.div>

                {/* HP/MP Bars */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#FF006E] w-8">HP</span>
                    <PixelBar value={100} max={100} color="bg-gradient-to-r from-[#FF006E] to-[#FF4D9E]" height="h-4" />
                    <span className="text-xs font-mono text-[#FF006E]">100/100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#00F5FF] w-8">MP</span>
                    <PixelBar value={85} max={100} color="bg-gradient-to-r from-[#00F5FF] to-[#4DFFFF]" height="h-4" />
                    <span className="text-xs font-mono text-[#00F5FF]">85/100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#39FF14] w-8">XP</span>
                    <PixelBar value={65} max={100} color="bg-gradient-to-r from-[#39FF14] to-[#7FFF4D]" height="h-4" />
                    <span className="text-xs font-mono text-[#39FF14]">65%</span>
                  </div>
                </div>
              </div>
            </PixelBorder>

            {/* Character Info Card */}
            <PixelBorder color="purple" className="bg-card">
              <div className="p-4">
                <h3 className="text-xs font-bold text-[#9D4EDD] mb-4 uppercase tracking-wider border-b-2 border-foreground/10 pb-2">
                  Character Data
                </h3>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NAME:</span>
                    <span className="font-bold text-foreground">MARIO CLAUDIUS HADINATA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CLASS:</span>
                    <span className="font-bold text-[#FFD60A]">FULL-STACK DEV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LEVEL:</span>
                    <span className="font-bold text-[#00F5FF]">LV. 5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LOCATION:</span>
                    <span className="font-bold text-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-primary" />
                      SURABAYA, ID
                    </span>
                  </div>
                </div>
              </div>
            </PixelBorder>
          </motion.div>

          {/* Right Column - Stats & Quests */}
          <div className="space-y-6">
            {/* Stats Panel */}
            <PixelBorder color="cyan" className="bg-card">
              <div className="p-4">
                <h3 className="text-xs font-bold text-[#00F5FF] mb-6 uppercase tracking-wider border-b-2 border-foreground/10 pb-2">
                  Base Stats
                </h3>
                <div className="space-y-5">
                  {rpgStats.map((stat, index) => (
                    <StatItem key={stat.name} stat={stat} index={index} />
                  ))}
                </div>
              </div>
            </PixelBorder>

            {/* Quests Completed Panel */}
            <PixelBorder color="gold" className="bg-card">
              <div className="p-4">
                <h3 className="text-xs font-bold text-[#FFD60A] mb-4 uppercase tracking-wider border-b-2 border-foreground/10 pb-2 flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Quests Completed
                </h3>
                <div className="space-y-4">
                  {quests.map((quest, index) => (
                    <QuestItem key={quest.id} quest={quest} index={index} />
                  ))}
                </div>
              </div>
            </PixelBorder>

            {/* Bio Description */}
            <PixelBorder color="purple" className="bg-card">
              <div className="p-4">
                <h3 className="text-xs font-bold text-[#9D4EDD] mb-3 uppercase tracking-wider border-b-2 border-foreground/10 pb-2">
                  Character Bio
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A passionate Full-Stack Developer currently grinding through Informatics at
                  Universitas Kristen Petra. Recently completed the Internship Quest at{" "}
                  <span className="text-foreground font-semibold">PT Cross Network Indonesia</span>,
                  where I built Hospital Management systems using Svelte & Tailwind CSS.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  Always looking for new side quests to level up my skills!
                </p>
              </div>
            </PixelBorder>
          </div>
        </div>

        {/* Bottom decoration - decorative pixels */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex justify-center gap-2"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="w-3 h-3 bg-primary/50"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
