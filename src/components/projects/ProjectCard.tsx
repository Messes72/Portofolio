"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

const statusConfig = {
  live: {
    label: "Live",
    dotColor: "bg-green-500",
    textColor: "text-green-600 dark:text-green-400",
  },
  "in-development": {
    label: "Development",
    dotColor: "bg-amber-500",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  archived: {
    label: "Archived",
    dotColor: "bg-gray-500",
    textColor: "text-gray-600 dark:text-gray-400",
  },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.05);
    y.set(distanceY * 0.05);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const status = statusConfig[project.status];
  const visibleTechStack = project.techStack.slice(0, 4);

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link href={`/projects/${project.id}`} className="block group">
        <Card
          className="h-full overflow-hidden border border-border bg-card transition-all duration-300
            hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
        >
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 ease-out
                group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full
                  bg-background/90 backdrop-blur-sm border border-border/50
                  ${status.textColor}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${status.dotColor} animate-pulse`}
                />
                <span className="text-xs font-medium">{status.label}</span>
              </div>
            </div>
            {/* Overlay on hover */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>

          <CardHeader className="pb-2">
            <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {project.tagline}
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5">
              {visibleTechStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs font-normal bg-secondary/50 hover:bg-secondary/80 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 4 && (
                <Badge
                  variant="outline"
                  className="text-xs font-normal border-dashed"
                >
                  +{project.techStack.length - 4}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
