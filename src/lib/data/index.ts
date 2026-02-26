import { Project, SkillsData } from '@/types';
import projectsData from './projects.json';
import skillsData from './skills.json';

// Export typed data
export const projects: Project[] = projectsData;
export const skills: SkillsData = skillsData;

// Helper functions
export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter((project) => project.category === category);
}

export function getFeaturedProjects(limit: number = 3): Project[] {
  return projects
    .filter((project) => project.status === 'live')
    .slice(0, limit);
}

export function getAllSkillCategories(): string[] {
  return Object.keys(skills);
}

export function getSkillsByCategory(category: keyof SkillsData) {
  return skills[category] || [];
}
