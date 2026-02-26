"use client";

import { Project } from "@/types";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Placeholder for ProjectCard */}
            <div className="aspect-video bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">
                {project.title}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {project.tagline}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
