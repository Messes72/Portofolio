# Pixel Fantasy Redesign TODO

## Overview
Transform portfolio dari tema gelap/neon ke tema cerah 8-bit pixel fantasy.

### Reference Aesthetic
- Anime bedroom window morning light
- Fantasy sword in stone (grass hill, blue sky)
- Park bench with clear blue sky
- Medieval stone bridge over blue river
- White curtains billowing
- Nature, warmth, bright, peaceful

### New Color Palette
```
--sky-blue: #87CEEB        (primary background)
--sky-light: #B0E0E6       (lighter sky)
--grass-green: #7CB342      (primary accent)
--grass-light: #9CCC65      (lighter grass)
--grass-dark: #558B2F      (darker grass)
--earth-brown: #8D6E63      (borders/shadows)
--sun-yellow: #FFD54F       (highlights/accents)
--sun-orange: #FFB74D       (warm accents)
--cloud-white: #FFF8E7      (card backgrounds)
--cloud-cream: #FFF3E0      (alternate bg)
--water-blue: #4FC3F7       (secondary accent)
--stone-gray: #9E9E9E       (neutral)
--wood-brown: #A1887F       (natural elements)
--leaf-green: #66BB6A       (nature accents)
--flower-pink: #F48FB1      (pop accent)
```

---

## Phase 1: Design System & Assets

### Phase 1.1: Create Pixel Art Assets (SVG/CSS)
**Status:** Pending
**Assignee:** Animation Agent

- [ ] Create pixel cloud component (floating animation)
- [ ] Create pixel sun with rays (rotating animation)
- [ ] Create pixel grass/trees (parallax layers)
- [ ] Create pixel flowers (subtle sway animation)
- [ ] Create pixel birds (flying across screen)
- [ ] Create pixel butterfly/moth (hover animation)
- [ ] Create pixel wind lines (subtle movement)
- [ ] Create pixel sparkles/stars (twinkling)
- [ ] Create pixel sword-in-stone illustration (Hero focal point)
- [ ] Create pixel window frame (section borders)
- [ ] Create pixel fence/wood elements (decorative)
- [ ] Create pixel paper plane (message/send icon)

### Phase 1.2: Update Global Styles
**Status:** COMPLETED
**Assignee:** Frontend Agent

- [x] Update globals.css with new color palette
- [x] Update Tailwind config with fantasy colors
- [x] Create new gradient utilities (sky gradients)
- [x] Create pixel-border utilities with earth tones
- [x] Create shadow utilities (soft shadows, not neon glow)
- [x] Update font pairing (keep Press Start 2P, maybe add second body font)
- [x] Create CSS animations for floating elements
- [x] Create CSS animations for nature elements (sway, twinkle)

### Phase 1.3: Update Theme System
**Status:** Pending
**Assignee:** Frontend Agent

- [ ] Simplify theme (single bright theme, remove dark mode toggle or repurpose)
- [ ] Update theme provider for fantasy colors
- [ ] Update all shadcn components with new colors

---

## Phase 2: Section Redesigns

### Phase 2.1: Hero Section - "Fantasy Landscape"
**Status:** Pending
**Assignee:** Animation Agent + Frontend Agent

- [ ] Redesign to outdoor fantasy scene
- [ ] Layered parallax background:
  - Layer 1: Sky gradient (CSS)
  - Layer 2: Floating clouds (pixel SVG, slow drift)
  - Layer 3: Sun with rotating rays
  - Layer 4: Distant mountains/hills (CSS shapes)
  - Layer 5: Mid-ground trees (pixel art)
  - Layer 6: Grass foreground
- [ ] Center: "Adventure Awaits" / "Welcome Traveler" text
- [ ] Pixel sword in stone as main visual element
- [ ] Character sprite (simple 8-bit avatar) standing
- [ ] "START JOURNEY" CTA button with wood texture
- [ ] Floating pixel sparkles/particles
- [ ] Wind effect animation (subtle)

### Phase 2.2: About Section - "Character Profile"
**Status:** Pending
**Assignee:** Frontend Agent

- [ ] Redesign to RPG character sheet style but bright
- [ ] Window frame border (like looking through window)
- [ ] Character avatar in circular frame with leaf border
- [ ] Stats as "Adventurer Stats" with pixel bar charts
- [ ] "Quests Completed" = Education/Experience
- [ ] "Class" = Full-Stack Developer
- [ ] "Level" = Senior
- [ ] Floating pixel icons around section

### Phase 2.3: Skills Section - "Ability Tree"
**Status:** Pending
**Assignee:** Frontend Agent

- [ ] Redesign to skill tree visualization
- [ ] Branching paths like tree branches
- [ ] Skills as leaves/flowers on the tree
- [ ] Unlock animation on scroll
- [ ] Different categories = different branch colors
- [ ] Mastery level as leaf size/color intensity

### Phase 2.4: Projects Section - "Treasure Collection"
**Status:** Pending
**Assignee:** Frontend Agent + Animation Agent

- [ ] Change from cartridges to treasure chests OR
- [ ] Keep cartridges but with nature/fantasy labels
- [ ] Add shine/sparkle animation on hover
- [ ] Floating effect with shadow
- [ ] Category badges with nature icons

### Phase 2.5: Contact Section - "Message Scroll"
**Status:** Pending
**Assignee:** Frontend Agent

- [ ] Redesign to scroll/letter aesthetic
- [ ] Wood frame surrounding form
- [ ] Paper texture background
- [ ] Wax seal style submit button
- [ ] Paper plane animation on send
- [ ] Floating envelope icons

### Phase 2.6: Footer - "Rest Area"
**Status:** Pending
**Assignee:** Frontend Agent

- [ ] Redesign to campfire/rest area scene
- [ ] Sitting character sprite
- [ ] "Thank you for visiting" sign on wood post
- [ ] Continuing journey countdown
- [ ] Small pixel animals (birds, butterflies)

---

## Phase 3: Advanced Animations

### Phase 3.1: Scroll-Based Animations
**Status:** Pending
**Assignee:** Animation Agent

- [ ] Parallax layers for depth (mountains, clouds, trees)
- [ ] Reveal animations for sections
- [ ] Path drawing for skill tree branches
- [ ] Counter animations for stats

### Phase 3.2: Interactive Animations
**Status:** Pending
**Assignee:** Animation Agent

- [ ] Mouse parallax on hero (slight movement following cursor)
- [ ] Hover effects with pixel scale
- [ ] Click ripple effects
- [ ] Magnetic button enhancement

### Phase 3.3: Ambient Animations
**Status:** Pending
**Assignee:** Animation Agent

- [ ] Continuous cloud drift
- [ ] Sun ray rotation
- [ ] Grass/leaves swaying
- [ ] Bird flight patterns
- [ ] Butterfly random movement
- [ ] Sparkle twinkling
- [ ] Wind line animation

### Phase 3.4: Sprite Animations
**Status:** Pending
**Assignee:** Animation Agent

- [ ] Character idle animation (breathing)
- [ ] Character walk animation (if scroll triggered)
- [ ] Sword glow pulse
- [ ] Flower bloom animation on scroll

---

## Phase 4: Components Update

### Phase 4.1: UI Components
**Status:** Pending
**Assignee:** Frontend Agent

- [ ] PixelButton - wood texture style
- [ ] PixelCard - paper with wood frame
- [ ] PixelBadge - leaf/flower shape
- [ ] SectionHeader - wood sign style

### Phase 4.2: Navigation
**Status:** Pending
**Assignee:** Frontend Agent

- [ ] Header - floating wood plank style
- [ ] Navigation items - signpost style
- [ ] Mobile menu - scroll/wood panel

---

## Phase 5: Polish & Testing

### Phase 5.1: Responsive Design
**Status:** Pending
**Assignee:** Frontend Agent

- [ ] Mobile layout adjustments
- [ ] Tablet layout
- [ ] Reduce animations on mobile

### Phase 5.2: Performance
**Status:** Pending
**Assignee:** Frontend Agent

- [ ] Optimize SVG assets
- [ ] Lazy load below-fold content
- [ ] Test animation performance

### Phase 5.3: Build & Deploy
**Status:** Pending
**Assignee:** Frontend Agent

- [ ] Test build
- [ ] Fix any TypeScript errors
- [ ] Deploy update

---

## Current Phase Tracking

| Phase | Status | Progress |
|-------|--------|----------|
| 1.1 | Pending | 0% |
| 1.2 | Pending | 0% |
| 1.3 | Pending | 0% |
| 2.1 | Pending | 0% |
| 2.2 | Pending | 0% |
| 2.3 | Pending | 0% |
| 2.4 | Pending | 0% |
| 2.5 | Pending | 0% |
| 2.6 | Pending | 0% |
| 3.1 | Pending | 0% |
| 3.2 | Pending | 0% |
| 3.3 | Pending | 0% |
| 3.4 | Pending | 0% |
| 4.1 | Pending | 0% |
| 4.2 | Pending | 0% |
| 5.1 | Pending | 0% |
| 5.2 | Pending | 0% |
| 5.3 | Pending | 0% |

---

## Notes
- Keep atomic commits
- No co-author in commits
- Test each phase before moving to next
- Maintain 8-bit pixel aesthetic throughout
- Focus on smooth, meaningful animations
