"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Briefcase,
  MapPin,
  Mail,
  Github,
  Award,
  Code2,
} from "lucide-react";

const softSkills = [
  { name: "Hardworking", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { name: "Team Player", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
  { name: "Good Communication", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  { name: "Eager to Learn", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

const photoVariants = {
  hidden: { opacity: 0, scale: 0.9, x: -50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });

  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  const photoY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const { displayText, startTyping } = useTypewriter({
    text: "Hardworking • Team Player • Eager to Learn",
    speed: 80,
    delay: 500,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      startTyping();
    }, 1000);
    return () => clearTimeout(timer);
  }, [startTyping]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden bg-background py-20 md:py-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Photo Section */}
          <motion.div
            ref={photoRef}
            variants={photoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative mx-auto max-w-md lg:max-w-none"
          >
            <motion.div
              style={{ scale: photoScale, y: photoY }}
              className="relative aspect-square overflow-hidden rounded-3xl border-2 border-border/50 bg-muted shadow-2xl"
            >
              {/* Placeholder for profile photo */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      className="h-12 w-12 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">Profile Photo</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-card p-4 shadow-xl dark:bg-card/90"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">6+</p>
                  <p className="text-xs text-muted-foreground">Months Experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {/* Name & Role */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                Mario Claudius Hadinata
              </h3>
              <p className="mt-1 text-lg text-muted-foreground">
                Full Stack Developer
              </p>
            </motion.div>

            {/* Typewriter Tagline */}
            <motion.div
              variants={itemVariants}
              className="min-h-[1.75rem]"
            >
              <p className="text-primary font-medium">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block h-5 w-0.5 bg-primary ml-1"
                />
              </p>
            </motion.div>

            {/* Location & Contact */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                Surabaya, Indonesia
              </span>
              <a
                href="mailto:marioclaudius10@gmail.com"
                className="flex items-center gap-1.5 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                marioclaudius10@gmail.com
              </a>
              <a
                href="https://github.com/Messes72"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-primary"
              >
                <Github className="h-4 w-4" />
                Messes72
              </a>
            </motion.div>

            {/* Bio Description */}
            <motion.div variants={itemVariants} className="space-y-4 text-muted-foreground">
              <p>
                A passionate Informatics student at Universitas Kristen Petra with a strong
                foundation in web development. Currently maintaining a GPA of{" "}
                <span className="font-semibold text-foreground">3.38/4.00</span>{" "}
                and expected to graduate in 2026.
              </p>
              <p>
                Recently completed a 6-month internship at{" "}
                <span className="font-semibold text-foreground">PT Cross Network Indonesia</span>{" "}
                (Jan - Jun 2025), where I contributed to developing a Hospital Management
                Application using <span className="text-primary">Svelte</span> and{" "}
                <span className="text-primary">Tailwind CSS</span>.
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Universitas Kristen Petra</p>
                <p className="text-sm text-muted-foreground">Informatika</p>
                <p className="text-xs text-muted-foreground">Expected Graduation: 2026 • GPA: 3.38/4.00</p>
              </div>
            </motion.div>

            {/* Experience Highlight */}
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                <Code2 className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">PT Cross Network Indonesia</p>
                <p className="text-sm text-muted-foreground">Internship (Jan - Jun 2025)</p>
                <p className="text-xs text-muted-foreground">
                  Built Hospital Management App with Svelte + Tailwind
                </p>
              </div>
            </motion.div>

            {/* Soft Skills */}
            <motion.div variants={itemVariants}>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Soft Skills</p>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="outline"
                    className={`${skill.color} px-3 py-1.5 text-xs font-medium transition-all hover:scale-105`}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
