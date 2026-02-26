# PORTFOLIO WEBSITE - Claude Agent Team Prompt

Copy dan paste seluruh prompt di bawah ini ke Claude Agent Team:

---

## 🎯 PROJECT OVERVIEW

Saya ingin membangun sebuah **Portfolio Website** yang modern dan interaktif untuk menampilkan project-project yang telah saya buat. Website ini harus memiliki animasi yang memukau, preview dari project yang sudah deploy di Vercel, dan dokumentasi yang menarik.

---

## 👤 DEVELOPER PROFILE (untuk About Section)

**Nama:** Mario Claudius Hadinata  
**Email:** marioclaudius10@gmail.com  
**GitHub:** https://github.com/Messes72  
**Location:** Surabaya, Indonesia

**Education:** Informatika, Universitas Kristen Petra (Expected Graduation: 2026)  
**GPA:** 3.38/4.00

**Tech Stack:**
- Frontend: React, Svelte, HTML/CSS, Tailwind CSS
- Backend: Node.js, PHP, Laravel, Supabase
- Mobile: Flutter, Android Studio, Firebase
- Languages: JavaScript, PHP, Python (Beginner), Java (Intermediate)
- Tools: Figma, Git, Laragon, XAMPP

**Experience:**
- Internship at PT Cross Network Indonesia (Jan 2025 - Jun 2025)
- Project: Aplikasi Website dan Mobile Rumah Sakit Bantarangin
- Tech used: Svelte, Tailwind CSS

**Soft Skills:** Hardworking, Team Player, Good Communication, Eager to Learn

---

## 🔧 TECH STACK REQUIREMENTS

### Must Use (Non-Negotiable):
- **Framework:** Next.js 15 dengan App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animation:** Framer Motion + GSAP dengan ScrollTrigger
- **Icons:** Lucide React
- **Deployment:** Vercel

### Data Management:
- Project data disimpan dalam static JSON files
- Documentation dalam MDX files

---

## 📋 KEY FEATURES

### 1. Hero Section
- Animated text reveal dengan stagger effect
- Floating geometric shapes di background
- Gradient animation yang smooth
- Particle atau aurora-like animated background
- Strong headline: "Full-Stack Developer crafting digital experiences"

### 2. About Section
- Photo dengan subtle animation
- Brief bio dari CV (relevan dan concise)
- Skills visualization (animated skill bars atau tech icons grid)
- Typewriter effect pada tagline

### 3. Skills Section
- Categorized skills (Frontend, Backend, Mobile, Tools)
- Interactive hover effects
- Animated skill proficiency indicators
- Tech stack icons dengan tooltips

### 4. Projects Section
- Grid layout dengan responsive design
- Project cards dengan:
  - Screenshot/preview image
  - Project title
  - One-line description
  - Tech stack badges
  - Status indicator (Live/Development)
- Hover effects: scale, shadow, color shift
- Magnetic cursor effect
- Click → navigate to project detail page

### 5. Project Detail Page
- Full documentation untuk setiap project
- Sections: Overview, Features, Tech Stack, Screenshots, Demo Link
- Code snippets dengan syntax highlighting
- Image gallery dengan zoom/lightbox
- Back navigation ke portfolio
- Links: Live Demo, GitHub Repository

### 6. Contact Section
- Email link
- GitHub profile link
- LinkedIn (jika ada)
- Simple contact form (optional)

### 7. Global Features
- Dark/Light mode toggle
- Smooth scrolling dengan Lenis atau similar
- Responsive design (mobile-first)
- SEO optimization
- Page transitions

---

## 🎨 ANIMATION SPECIFICATIONS

### Animation Libraries:
```typescript
// Framer Motion untuk React-native animations
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

// GSAP untuk complex scroll animations
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

### Per-Section Animations:

**Hero:**
```typescript
// Text reveal dengan stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

// Floating shapes dengan parallax
// Gradient animation pada background
```

**About:**
```typescript
// Scroll-triggered fade in dari kiri
// Photo zoom on scroll
// Skills bar animation saat visible
```

**Projects:**
```typescript
// Cards slide in dari bawah dengan stagger
// Hover: scale(1.02), shadow enhancement
// Magnetic cursor effect on hover
```

---

## 📸 PROJECT PREVIEW STRATEGY

### Screenshot Generation Options:
1. **Manual Screenshots** (Recommended untuk awal) - High quality, full control
2. **Screenshot API** (Optional) - Thum.io atau Miniature.io untuk automation
3. **Video/GIF Demo** (Untuk projects dengan interactions)

### Screenshot Specifications:
- Desktop: 1920x1080 atau 1280x720
- Mobile: 375x818 (untuk optional mobile preview)
- Format: WebP untuk optimization, PNG fallback
- Location: `/public/images/projects/`

---

## 📁 FILE STRUCTURE

```
src/
├── app/
│   ├── page.tsx                    # Home page (single-page sections)
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles + Tailwind
│   └── projects/
│       └── [slug]/
│           └── page.tsx            # Project detail page
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── ui/                         # shadcn/ui components
│   ├── animations/
│   │   ├── AnimatedSection.tsx     # Wrapper untuk scroll animations
│   │   ├── MagneticButton.tsx
│   │   ├── TextReveal.tsx
│   │   └── ParallaxImage.tsx
│   └── projects/
│       ├── ProjectCard.tsx
│       ├── ProjectGrid.tsx
│       └── ProjectDetail.tsx
├── lib/
│   ├── data/
│   │   ├── projects.json           # Project data
│   │   └── skills.json             # Skills data
│   └── utils.ts
├── types/
│   └── index.ts                    # TypeScript interfaces
└── public/
    ├── images/
    │   ├── profile.jpg
    │   └── projects/
    │       ├── project-1/
    │       │   ├── thumbnail.webp
    │       │   ├── screenshot-1.webp
    │       │   └── screenshot-2.webp
    │       └── ...
    └── favicon.ico
```

---

## 📊 DATA STRUCTURES

### Project Data (`projects.json`):
```json
[
  {
    "id": "project-slug",
    "title": "Project Name",
    "tagline": "One line description",
    "description": "Full description for detail page",
    "thumbnail": "/images/projects/project-slug/thumbnail.webp",
    "screenshots": [
      "/images/projects/project-slug/screenshot-1.webp",
      "/images/projects/project-slug/screenshot-2.webp"
    ],
    "demoUrl": "https://project.vercel.app",
    "githubUrl": "https://github.com/Messes72/project",
    "techStack": ["React", "Node.js", "PostgreSQL"],
    "features": [
      "Feature 1 description",
      "Feature 2 description"
    ],
    "highlights": [
      "Key achievement 1",
      "Key achievement 2"
    ],
    "status": "live",
    "startDate": "2024-01",
    "endDate": "2024-03",
    "category": "web"
  }
]
```

### Skills Data (`skills.json`):
```json
{
  "frontend": [
    { "name": "React", "level": 80, "icon": "react" },
    { "name": "Tailwind CSS", "level": 85, "icon": "tailwind" }
  ],
  "backend": [
    { "name": "Node.js", "level": 70, "icon": "nodejs" },
    { "name": "Laravel", "level": 75, "icon": "laravel" }
  ],
  "mobile": [
    { "name": "Flutter", "level": 60, "icon": "flutter" }
  ],
  "tools": [
    { "name": "Git", "level": 80, "icon": "git" },
    { "name": "Figma", "level": 70, "icon": "figma" }
  ]
}
```

---

## 🔗 CONTEXT7 MCP INSTRUCTIONS

**CRITICAL:** Setiap agent WAJIB menggunakan Context7 MCP untuk mendapatkan dokumentasi teknologi terbaru sebelum implementasi.

### Cara Menggunakan Context7 MCP:

```
1. Sebelum implementasi fitur apapun, query Context7 MCP untuk:
   - Latest Next.js 15 documentation dan best practices
   - Framer Motion terbaru examples dan API
   - GSAP ScrollTrigger latest syntax
   - shadcn/ui component documentation
   - Tailwind CSS v4 updates (jika ada)

2. Query format:
   "Use Context7 MCP to get latest documentation for [technology]"
   "Check Context7 for Next.js 15 App Router best practices"
   "Get Context7 docs for Framer Motion scroll animations"

3. Spesific queries yang HARUS dilakukan:
   - Next.js 15 App Router patterns
   - Framer Motion useScroll dan useTransform hooks
   - GSAP ScrollTrigger setup
   - shadcn/ui installation dan component usage
   - Tailwind CSS animation utilities
   - TypeScript best practices untuk React
```

---

## 📝 TASK BREAKDOWN

### PHASE 1: Foundation (Sequential)
| Task ID | Agent | Task | Dependencies |
|---------|-------|------|--------------|
| 1.1 | Project Planner | Setup Next.js 15 project dengan TypeScript | - |
| 1.2 | Project Planner | Configure Tailwind CSS dan folder structure | 1.1 |
| 1.3 | Frontend Agent | Install dan configure shadcn/ui | 1.2 |
| 1.4 | Frontend Agent | Create base layout dengan Header/Footer | 1.3 |
| 1.5 | Data Agent | Create projects.json dan skills.json | 1.2 |

### PHASE 2: Core Components (Mixed Parallel)
| Task ID | Agent | Task | Dependencies |
|---------|-------|------|--------------|
| 2.1-a | Animation Agent | Create AnimatedSection wrapper component | 1.3 |
| 2.1-b | Animation Agent | Create TextReveal component | 1.3 |
| 2.1-c | Animation Agent | Create MagneticButton component | 1.3 |
| 2.2 | Frontend Agent | Build Hero section dengan animations | 2.1-a, 2.1-b |
| 2.3 | Frontend Agent | Build About section | 2.1-a |
| 2.4 | Frontend Agent | Build Skills section dengan animated bars | 2.1-a |
| 2.5 | Frontend Agent | Build Contact section | 1.4 |

### PHASE 3: Projects Gallery (Sequential + Parallel)
| Task ID | Agent | Task | Dependencies |
|---------|-------|------|--------------|
| 3.1 | Animation Agent | Create ProjectCard component dengan hover effects | 2.1-a |
| 3.2 | Frontend Agent | Create ProjectGrid component | 3.1 |
| 3.3 | Frontend Agent | Build Projects section | 3.2, 1.5 |
| 3.4 | Frontend Agent | Create ProjectDetail page | 3.3 |
| 3.5 | Animation Agent | Add page transitions | 3.4 |

### PHASE 4: Polish & Features
| Task ID | Agent | Task | Dependencies |
|---------|-------|------|--------------|
| 4.1 | Frontend Agent | Implement dark/light mode toggle | All Phase 3 |
| 4.2 | Animation Agent | Add smooth scroll dengan Lenis/GSAP | 4.1 |
| 4.3 | Frontend Agent | SEO optimization (meta tags, OpenGraph) | 4.1 |
| 4.4 | Frontend Agent | Responsive design refinement | 4.1 |
| 4.5 | Animation Agent | Add micro-interactions throughout | 4.4 |

### PHASE 5: Final Polish
| Task ID | Agent | Task | Dependencies |
|---------|-------|------|--------------|
| 5.1 | All Agents | Test semua animations dan interactions | Phase 4 |
| 5.2 | Frontend Agent | Performance optimization | 5.1 |
| 5.3 | Frontend Agent | Accessibility audit | 5.1 |
| 5.4 | Project Planner | Final review dan documentation | 5.3 |

---

## 🤖 AGENT SPECIALIZATIONS

### 1. Project Planner Agent
**Role:** Architecture, planning, dan coordination  
**Capabilities:**
- System architecture decisions
- Task breakdown dan assignment
- Code review dan quality assurance
- Documentation

### 2. Frontend Agent
**Role:** React/Next.js development  
**Capabilities:**
- React components dengan TypeScript
- Next.js App Router patterns
- Tailwind CSS styling
- shadcn/ui integration
- Responsive design

### 3. Animation Agent
**Role:** Animation implementation  
**Capabilities:**
- Framer Motion animations
- GSAP ScrollTrigger setup
- Micro-interactions
- Performance optimization untuk animations

### 4. Data Agent
**Role:** Data structure dan content  
**Capabilities:**
- JSON data structure design
- TypeScript interfaces
- Content organization

---

## 📐 DESIGN GUIDELINES

### Color Palette:
```css
/* Light Mode */
--background: #ffffff
--foreground: #0a0a0a
--primary: #3b82f6 (blue-500)
--secondary: #6366f1 (indigo-500)
--accent: #f97316 (orange-500)
--muted: #f4f4f5 (zinc-100)

/* Dark Mode */
--background: #0a0a0a
--foreground: #fafafa
--primary: #60a5fa (blue-400)
--secondary: #818cf8 (indigo-400)
--accent: #fb923c (orange-400)
--muted: #18181b (zinc-900)
```

### Typography:
```css
/* Headings */
font-family: 'Inter', sans-serif;
font-weight: 700;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400;

/* Code */
font-family: 'JetBrains Mono', monospace;
```

### Spacing:
- Section padding: py-20 md:py-32
- Container max-width: max-w-6xl atau max-w-7xl
- Card gap: gap-6 md:gap-8

---

## ✅ SUCCESS CRITERIA

1. **Performance:**
   - Lighthouse score > 90 untuk semua metrics
   - First Contentful Paint < 1.5s
   - Largest Contentful Paint < 2.5s

2. **Animations:**
   - Smooth 60fps pada semua animations
   - Proper reduced-motion support
   - No jank atau stuttering

3. **Responsiveness:**
   - Perfect display pada 320px - 2560px
   - Touch-friendly pada mobile devices
   - Proper navigation untuk semua breakpoints

4. **Accessibility:**
   - Proper semantic HTML
   - ARIA labels untuk interactive elements
   - Keyboard navigation support
   - Screen reader friendly

5. **SEO:**
   - Proper meta tags
   - OpenGraph dan Twitter cards
   - Sitemap dan robots.txt
   - Structured data (JSON-LD)

---

## 🚀 EXECUTION INSTRUCTIONS

1. **START dengan Task 1.1** - Project Planner Agent untuk setup project

2. **CONTEXT7 MCP WAJIB** digunakan sebelum setiap implementasi:
   ```
   "Check Context7 MCP for latest Next.js 15 documentation"
   "Get Context7 docs for Framer Motion animations"
   "Use Context7 to verify shadcn/ui installation steps"
   ```

3. **READ WORKLOG** sebelum memulai setiap task

4. **UPDATE WORKLOG** setelah menyelesaikan task dengan format:
   ```
   ---
   Task ID: [ID]
   Agent: [Agent Name]
   Task: [Description]
   
   Work Log:
   - [Actions taken]
   - [Context7 MCP queries made]
   
   Stage Summary:
   - [Results]
   - [Files created/modified]
   ```

5. **VERIFY DEPENDENCIES** sebelum spawn agent untuk task baru

6. **TEST INTEGRATION** setelah setiap phase selesai

---

## 📦 ENVIRONMENT VARIABLES

```env
# .env.local (jika diperlukan)
NEXT_PUBLIC_SITE_URL=https://your-portfolio.vercel.app
NEXT_PUBLIC_GITHUB_URL=https://github.com/Messes72
```

---

## 🎯 FINAL OUTPUT EXPECTATIONS

- Fully functional portfolio website
- Minimum 3 project cards dengan detail pages
- All animations working smoothly
- Dark/light mode functional
- Mobile responsive
- SEO optimized
- Deployed to Vercel

---

**MULAI DEVELOPMENT DENGAN TASK 1.1 - PROJECT PLANNER AGENT**

**INGAT: SELALU GUNAKAN CONTEXT7 MCP UNTUK DOKUMENTASI TERBARU!**
