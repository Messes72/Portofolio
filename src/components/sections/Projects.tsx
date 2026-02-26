"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { TextReveal } from "@/components/animations/TextReveal";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { getFeaturedProjects } from "@/lib/data";
import { Button } from "@/components/ui/button";

const featuredProjects = getFeaturedProjects(3);

export function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-muted/30 py-20 md:py-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block text-sm font-medium text-primary uppercase tracking-wider"
          >
            Portfolio
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            <TextReveal text="Featured Projects" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            Some of my recent work
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary"
          />
        </AnimatedSection>

        {/* Projects Grid */}
        <AnimatedSection delay={0.2}>
          <ProjectGrid projects={featuredProjects} />
        </AnimatedSection>

        {/* View All Link */}
        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <Link href="/projects">
            <Button variant="outline" size="lg" className="group">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
