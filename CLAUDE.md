# Portfolio Website - Agent Team CLAUDE.md

## Project Overview
Portfolio website modern dan interaktif untuk Mario Claudius Hadinata menggunakan Next.js 15, TypeScript, Tailwind CSS, Framer Motion, dan GSAP.

## Team Structure
- **Project Planner**: Architecture dan coordination
- **Frontend Agent**: React/Next.js development
- **Animation Agent**: Framer Motion + GSAP animations
- **Data Agent**: Data structures dan content

## Git Workflow
- Atomic commits - satu commit per logical change
- Commit message format: `[Phase X.Y] Description`
- NO bulk commits - max 5-10 files per commit
- Setiap phase di-commit secara bertahap

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- GSAP + ScrollTrigger
- Lucide React

## Project Structure
```
src/
├── app/              # Next.js app router
├── components/       # React components
│   ├── sections/     # Page sections
│   ├── ui/          # shadcn components
│   ├── animations/  # Animation components
│   └── projects/    # Project components
├── lib/             # Utilities dan data
├── types/           # TypeScript types
└── public/          # Static assets
```

## Current Phase
Phase 2: Core Components - Hero, About, Skills sections with animations

## Worklog

### Phase 1.1: Git Initialization
- Initialized git repository
- Created CLAUDE.md
- Created README.md
- Commit: `6eddfef` [Phase 1.1] Initial project setup

### Phase 1.2-1.4: Project Foundation
- Next.js 15 + TypeScript initialized
- Tailwind CSS configured
- shadcn/ui initialized with components (Button, Card, Badge, Dialog, Switch, Dropdown, Sheet, Toggle)
- Base layout with Inter font
- Theme provider for dark mode
- Folder structure created
- Commits: `2c3618e`, `cee00ea`, `23c00e6`, `df8757e`, etc.

### Phase 1.5: Data Structures
- TypeScript interfaces (Project, Skill, SkillCategory, SkillsData)
- projects.json dengan 4 projects:
  1. Rumah Sakit Bantarangin (Svelte/Node.js)
  2. Portfolio Website (Next.js)
  3. E-Commerce Mobile App (Flutter)
  4. Laravel CMS (Laravel/PHP)
- skills.json dengan categories: Frontend, Backend, Mobile, Tools, Languages
- Data utilities (getProjectById, getProjectsByCategory, getFeaturedProjects, etc.)
- Commits: `0d7232f`, `ad43b79`, `724b964`, `bf50f1e`

## Phase 2 Tasks (Ready to Start)

### 2.1 Animation Components
- [ ] AnimatedSection wrapper component
- [ ] TextReveal component dengan stagger effect
- [ ] MagneticButton component

### 2.2 Hero Section
- [ ] Animated text reveal dengan stagger effect
- [ ] Floating geometric shapes background
- [ ] Gradient animation background

### 2.3 About Section
- [ ] Photo dengan subtle animation
- [ ] Brief bio dengan typewriter effect
- [ ] Skills visualization

### 2.4 Skills Section
- [ ] Categorized skills grid
- [ ] Animated skill bars
- [ ] Tech icons dengan hover effects

### 2.5 Contact Section
- [ ] Email link
- [ ] GitHub profile link
- [ ] Contact form (optional)

## Phase 3 Tasks (Pending)
- [ ] ProjectCard component dengan hover effects
- [ ] ProjectGrid component
- [ ] Projects section
- [ ] ProjectDetail page
- [ ] Page transitions

## Phase 4 Tasks (Pending)
- [ ] Dark/Light mode toggle
- [ ] Smooth scroll dengan Lenis/GSAP
- [ ] SEO optimization
- [ ] Responsive design refinement

## Phase 5 Tasks (Pending)
- [ ] Final testing
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Deploy to Vercel
