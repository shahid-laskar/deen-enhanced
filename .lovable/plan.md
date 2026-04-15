

# Plan: Rebuild Deen App Dashboard with Modern Geometric Design

## What you have now

Your existing deen-frontend (branch `deen/v2`) is a React + Vite + React Router app with:
- 15+ pages (Dashboard, Prayer, Quran, Habits, Journal, Tasks, Female, AI Guide, Settings, Meal, Workout, Children, Qibla, Community, Waqf, Wellness, Gamification)
- Emerald/gold/parchment color palette with Playfair Display + DM Sans + Amiri fonts
- Sidebar + bottom nav layout, dark mode, Zustand state, TanStack Query

**Key limitation**: This Lovable project uses TanStack Start (not React Router), so I cannot directly port your code. I will rebuild the dashboard and core layout from scratch in this project, using your existing features and structure as the blueprint but with a significantly elevated "Modern Geometric" design.

## What I will build (Phase 1 — Dashboard Home)

### 1. Design System — Modern Geometric Islamic Theme
- Earthy warm palette: amber/brown primary, cream backgrounds, sage green accents
- Clean geometric patterns (SVG-based Islamic tessellations as subtle backgrounds)
- Inter font for body, a refined display font for headings, Amiri for Arabic
- Structured grid layouts with consistent 8px spacing system
- Glassmorphism cards with soft shadows and geometric border accents
- Dark mode with deep warm tones

### 2. App Layout Shell
- **Desktop**: Collapsible sidebar with geometric header accent, nav icons + labels
- **Mobile**: Bottom tab navigation (5 key tabs), clean top bar with app branding
- Smooth page transitions

### 3. Dashboard Home Page
- **Islamic date header** with greeting, Hijri date, geometric decorative element
- **Prayer hero widget** — next prayer name + countdown timer with geometric progress ring, mini prayer status dots (5 prayers)
- **Daily verse card** — Arabic ayah (Amiri font) + English translation, geometric border
- **Quick actions grid** — 4 action tiles (Dhikr, Quran, Journal, Habits) with icons and geometric backgrounds
- **Habits summary card** — today's habits with completion status
- **Navigation cards** — links to Quran, Qibla, Wellness, Waqf with descriptions

### 4. Routes Created
- `/` — Dashboard home (replaces placeholder)
- Layout in `__root.tsx` with sidebar/bottom nav

## Technical Details

**Files to create/modify:**
- `src/styles.css` — new color tokens (amber, cream, sage, warm grays) + geometric pattern CSS
- `src/routes/__root.tsx` — app shell with sidebar + bottom nav + fonts
- `src/routes/index.tsx` — full dashboard page with all widgets
- `src/components/layout/Sidebar.tsx` — desktop sidebar navigation
- `src/components/layout/BottomNav.tsx` — mobile bottom navigation
- `src/components/dashboard/PrayerHero.tsx` — prayer countdown widget
- `src/components/dashboard/QuickActions.tsx` — action grid
- `src/components/dashboard/DailyVerse.tsx` — ayah card
- `src/components/dashboard/HabitsSummary.tsx` — habits overview
- `src/components/dashboard/IslamicHeader.tsx` — greeting + date header

**No backend dependency**: All data will be static/mock for now (prayer times calculated client-side using the `adhan` library pattern, static verse). Backend integration can come later.

**Packages needed**: `lucide-react` (already available), `date-fns` (will add)

