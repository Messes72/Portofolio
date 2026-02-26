// Project Types
export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail: string;
  screenshots: string[];
  demoUrl: string;
  githubUrl: string;
  techStack: string[];
  features: string[];
  highlights: string[];
  status: 'live' | 'in-development' | 'archived';
  startDate: string;
  endDate: string;
  category: 'web' | 'mobile' | 'full-stack' | 'other';
}

// Skill Types
export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  mobile: Skill[];
  tools: Skill[];
  languages: Skill[];
}
