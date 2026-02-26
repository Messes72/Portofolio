"use client";

import { useState, useMemo } from "react";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";

interface ProjectGridProps {
  projects: Project[];
}

type FilterCategory = "All" | "Web" | "Mobile" | "Live" | "Development";

const filters: FilterCategory[] = ["All", "Web", "Mobile", "Live", "Development"];

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
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className="min-w-[80px]"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No projects found in this category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
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
      )}
    </div>
  );
}
