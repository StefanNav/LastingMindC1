# Design Tokens & Visual Language

> **When to load this file:** When styling components or making visual decisions. Keeps the look consistent across epics.

## Typography

### Font Stack
```css
--font-heading: 'DM Serif Display', serif;   /* Headings, node labels, card titles */
--font-body: 'Nunito', sans-serif;            /* Body text, prompts, descriptions */
```

### Scale
```css
--text-xs: 0.75rem;      /* 12px — metadata, timestamps */
--text-sm: 0.875rem;     /* 14px — secondary text, labels */
--text-base: 1rem;       /* 16px — body text, prompts */
--text-lg: 1.125rem;     /* 18px — emphasized text */
--text-xl: 1.25rem;      /* 20px — card titles, node labels */
--text-2xl: 1.5rem;      /* 24px — section headers */
--text-3xl: 1.875rem;    /* 30px — page titles */
--text-4xl: 2.25rem;     /* 36px — hero text, milestone messages */
```

### Usage Rules
- **DM Serif Display:** Node labels, card titles, milestone messages, deliverable headings. Warm and editorial — gives weight to important content.
- **Nunito:** Everything else. Friendly, readable, approachable. Use weight 400 for body, 600 for emphasis, 700 for buttons.
- Never use system fonts or fallback sans-serif for visible text.

## Color Palette

### Core Colors
```css
/* Backgrounds */
--color-parchment: #FAF6F1;        /* App background, default surface */
--color-warm-white: #FFFDF9;       /* Card backgrounds, elevated surfaces */
--color-cream: #F5F0E8;            /* Subtle section dividers */

/* Greens (Primary) */
--color-sage: #8BA888;             /* Primary interactive elements */
--color-sage-light: #E8F0EC;       /* Suggested state, hover backgrounds */
--color-sage-dark: #2D4A3E;        /* Headers, CTAs, complete state */

/* Browns (Tree / Organic) */
--color-bark: #6B4E3D;             /* Tree trunk, strong accents */
--color-bark-light: #A88B6B;       /* Subtle organic accents */

/* Amber (Reward / Highlight) */
--color-amber: #D4A574;            /* Milestones, celebrations, progress */
--color-amber-light: #F5E6CC;      /* Warm highlight backgrounds */
--color-gold: #C4933F;             /* Premium deliverables, hero moments */
```

### Node / Category Colors
```css
--color-node-family: #E8D5C4;      /* Warm beige */
--color-node-friends: #D4E8D4;     /* Light sage */
--color-node-favorites: #F5E6CC;   /* Soft gold */
--color-node-career: #D4D8E8;      /* Soft blue */
--color-node-education: #E8D4E8;   /* Soft purple */
--color-node-values: #E8E4D4;      /* Warm neutral */
--color-node-chapters: #D4E4E8;    /* Soft teal */
--color-node-wisdom: #E8DDD4;      /* Warm taupe */
--color-node-memories: #F0E4D4;    /* Soft peach */
--color-node-letters: #D4E8E0;     /* Mint */
--color-node-memoir: #E8E0D4;      /* Cream */
```

### State Colors
```css
--color-locked: #D4D0CC;           /* Faded gray, 50% opacity */
--color-suggested: #E8F0EC;        /* Light sage with pulse animation */
--color-active: #8BA888;           /* Full sage */
--color-complete: #2D4A3E;         /* Dark sage with green dot */
--color-error: #D4574A;            /* Red — minimal use */
```

## Spacing

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Spacing Rules
- **Card padding:** `--space-5` (20px)
- **Between cards/items:** `--space-4` (16px)
- **Section gaps:** `--space-8` (32px)
- **Page padding (mobile):** `--space-5` (20px) horizontal
- **Page padding (tablet):** `--space-8` (32px) horizontal
- **Page padding (desktop):** `--space-12` (48px) horizontal, or handled by sidebar + main content grid
- **Max content width (text-heavy modules):** 700px — but inside a main content area, not as the entire page width
- **Max content width (interactive modules):** no hard cap — let spin wheels, grids, and dashboards use available space

## Border Radius

```css
--radius-sm: 0.5rem;    /* 8px — buttons, inputs */
--radius-md: 0.75rem;   /* 12px — cards, sheets */
--radius-lg: 1rem;       /* 16px — large cards, modals */
--radius-xl: 1.5rem;    /* 24px — bottom sheet, node bubbles */
--radius-full: 9999px;  /* Pill shapes, record button */
```

## Shadows

```css
/* Soft, warm shadows — no harsh black */
--shadow-sm: 0 1px 3px rgba(107, 78, 61, 0.08);
--shadow-md: 0 4px 12px rgba(107, 78, 61, 0.10);
--shadow-lg: 0 8px 24px rgba(107, 78, 61, 0.12);
--shadow-xl: 0 16px 48px rgba(107, 78, 61, 0.15);
```

### Shadow Rules
- Cards at rest: `--shadow-sm`
- Cards on hover/active: `--shadow-md`
- Bottom sheet: `--shadow-lg`
- Full-screen overlays: `--shadow-xl`
- Shadows use bark-brown base (`rgba(107, 78, 61, ...)`) not black — keeps the warm tone

## Component Patterns

### Cards
```
Background: var(--color-warm-white)
Border: 1px solid rgba(107, 78, 61, 0.08)  (very subtle)
Border-radius: var(--radius-md)
Padding: var(--space-5)
Shadow: var(--shadow-sm)
```

### Node Bubbles (on Tap Root)
```
Shape: Rounded pill (radius-xl)
Size: ~140px × 60px
Background: white (complete), warm-white (active), transparent (locked)
Border: 2px solid (state color)
Font: DM Serif Display, text-lg
Position: Alternating left/right of center trunk line
Connection: Thin line from center trunk to node
```

### Record Button
```
Shape: Circle (radius-full)
Size: 64px × 64px (mobile), 72px × 72px (desktop)
Background: var(--color-sage-dark)
Icon: Mic (white, 24px)
Active state: scale(0.95), background changes to red-ish (#D4574A)
Pulse animation when ready to record
```

### Bottom Sheet
```
Background: var(--color-warm-white)
Border-radius: var(--radius-xl) var(--radius-xl) 0 0  (top corners only)
Shadow: var(--shadow-xl)
Handle: 40px × 4px pill, centered, --color-locked
Max height: 85vh
Padding: var(--space-6)
```

### Story Card
```
Background: var(--color-warm-white)
Border-left: 4px solid (category color)
Border-radius: var(--radius-md)
Padding: var(--space-5)
Shadow: var(--shadow-md)

Layout:
  Title (DM Serif Display, text-xl)
  Person + Relationship (Nunito, text-sm, muted)
  Quote in italics (Nunito, text-base)
  Theme tags (pills, category color background)
  Date (text-xs, muted)
```

## Animation Tokens

### Framer Motion Presets
```typescript
export const transitions = {
  // Standard transitions
  default: { type: "spring", stiffness: 300, damping: 30 },
  gentle: { type: "spring", stiffness: 200, damping: 25 },
  snappy: { type: "spring", stiffness: 400, damping: 35 },
  slow: { type: "spring", stiffness: 100, damping: 20 },
  
  // Specific uses
  pageEnter: { type: "spring", stiffness: 300, damping: 30, delay: 0.1 },
  bottomSheet: { type: "spring", stiffness: 350, damping: 30 },
  cardReveal: { type: "spring", stiffness: 200, damping: 20 },
  treGrowth: { type: "spring", stiffness: 80, damping: 15, duration: 2 },
  celebration: { type: "spring", stiffness: 150, damping: 12 },
};

export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  slideUp: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
  pulse: {
    animate: { 
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 2 }
    },
  },
};
```

## Iconography

Use **Lucide React** icons throughout. Key icons:

| Context | Icon | Usage |
|---------|------|-------|
| Record | `Mic` | Recording button |
| Stop | `Square` | Stop recording |
| Play | `Play` | Playback |
| Family | `Users` | Family node |
| Friends | `Heart` | Friends node |
| Career | `Briefcase` | Career node |
| Education | `GraduationCap` | Education node |
| Values | `Compass` | Core Values node |
| Favorites | `Star` | Favorites node |
| Chapters | `BookOpen` | Life Chapters |
| Wisdom | `Lightbulb` | Wisdom node |
| Memories | `Camera` | Greatest Memories |
| Letters | `Mail` | Letters node |
| Voice | `MessageCircle` | Voice Messages |
| Memoir | `FileText` | Memoir node |
| Lock | `Lock` | Locked node |
| Check | `Check` | Complete state |
| Add | `Plus` | Add more |
| Back | `ChevronLeft` | Navigation back |
| Menu | `Menu` | Quick nav |
| Streak | `Flame` | Streak counter |

## Do's and Don'ts

### Do
- Use warm browns for shadows (not black or gray)
- Use DM Serif Display for any text that should feel "important"
- Use generous padding — nothing should feel cramped
- Use category colors consistently per node
- Add subtle border or shadow to distinguish cards from background
- Make interactive elements obviously tappable (min 44px touch target)

### Don't
- Use pure black (#000000) anywhere — darkest should be --color-sage-dark
- Use pure white (#FFFFFF) for backgrounds — use parchment or warm-white
- Use sharp corners on cards or containers (always at least radius-sm)
- Use blue for links or interactive elements — use sage green
- Use system fonts in visible UI
- Make text smaller than 12px (--text-xs)
- Use more than 2 font weights in a single component
