# Architecture & Code Conventions

> **When to load this file:** When writing code for any component or page. Ensures consistency across epics.

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, PWA meta)
│   ├── page.tsx                  # Home screen (tap root)
│   ├── module/
│   │   └── [moduleId]/
│   │       └── page.tsx          # Dynamic module pages
│   ├── hub/
│   │   └── [nodeId]/
│   │       └── page.tsx          # Node hub / scorecard pages
│   ├── profile/
│   │   └── page.tsx              # Consolidated profile page
│   ├── milestone/
│   │   └── [phase]/
│   │       └── page.tsx          # Milestone celebration pages
│   └── audience/                 # Audience member views (separate layout)
│       ├── layout.tsx
│       ├── profile/
│       └── chat/
│
├── components/
│   ├── core/                     # Interaction Pattern components (IP-01 through IP-10)
│   │   ├── VoiceRecorder.tsx     # Shared recording UI (used by IP-01, IP-02, IP-09, IP-10)
│   │   ├── VoiceConversation.tsx # IP-01 + IP-02 (mode="capture" | "story")
│   │   ├── SpinWheel.tsx         # IP-03 (variant="wheel" | "cardFlip" | "slot")
│   │   ├── PromptSelector.tsx    # IP-04
│   │   ├── PersonPicker.tsx      # IP-05
│   │   ├── CuratedQuestions.tsx  # IP-06
│   │   ├── AIWritingAssist.tsx   # IP-07
│   │   ├── MilestoneCelebration.tsx # IP-08
│   │   ├── FamilyQuestionCard.tsx   # IP-09
│   │   ├── FreeformJournal.tsx      # IP-10
│   │   ├── ValidationTable.tsx      # Shared end-state for IP-01
│   │   └── StoryCard.tsx            # Shared success output for IP-02
│   │
│   ├── navigation/
│   │   ├── TapRoot.tsx           # Main vertical path navigation
│   │   ├── NodeBubble.tsx        # Individual node on the path
│   │   ├── BottomSheet.tsx       # Slide-over Add More sheet
│   │   ├── Header.tsx            # App header (streak, avatar)
│   │   └── QuickNav.tsx          # Jump-to-phase navigation
│   │
│   ├── tree/
│   │   ├── MemoryTree.tsx        # Tree SVG visualization (ALREADY EXISTS)
│   │   └── TreeGrowth.tsx        # Growth animation controller
│   │
│   ├── deliverables/
│   │   ├── PersonalityCard.tsx   # Trading card (Favorites output)
│   │   ├── ValuesCloud.tsx       # Word cloud (Core Values output)
│   │   ├── WisdomDeck.tsx        # Card deck (Wisdom output)
│   │   ├── ChapterPage.tsx       # Biography chapter (Life Chapters output)
│   │   ├── HighlightReel.tsx     # Moment cards (Greatest Memories output)
│   │   ├── KeysToLife.tsx        # Premium visual (Keys to Life output)
│   │   └── MemoirPage.tsx        # Finished memoir (Phase 3 output)
│   │
│   └── shared/
│       ├── PromptCarousel.tsx    # (ALREADY EXISTS)
│       ├── TimelineLog.tsx       # (ALREADY EXISTS)
│       └── SessionBreak.tsx      # Pacing nudge overlay
│
├── data/
│   ├── mockData.ts               # (ALREADY EXISTS) — extend, don't replace
│   ├── modules.ts                # Module definitions (id, phase, node, patterns, prompts)
│   ├── prompts/                  # Pre-written AI prompts per module
│   │   ├── family.ts
│   │   ├── friends.ts
│   │   ├── favorites.ts
│   │   ├── career.ts
│   │   ├── education.ts
│   │   ├── values.ts
│   │   ├── chapters.ts
│   │   ├── wisdom.ts
│   │   ├── memories.ts
│   │   ├── letters.ts
│   │   └── memoir.ts
│   └── mockResponses.ts          # Simulated user responses for demo flow
│
├── hooks/
│   ├── useProgress.ts            # Track user progress through phases/modules
│   ├── useRecording.ts           # Voice recording state management
│   ├── useModuleFlow.ts          # Module step progression
│   └── useTreeGrowth.ts          # Tree growth state
│
├── types/
│   └── index.ts                  # All TypeScript types
│
└── lib/
    ├── constants.ts              # Phase/node/module IDs, colors, config
    └── utils.ts                  # Shared utilities
```

## Naming Conventions

### Files & Components
- Components: PascalCase (`VoiceConversation.tsx`)
- Hooks: camelCase with `use` prefix (`useModuleFlow.ts`)
- Data/utils: camelCase (`mockData.ts`)
- Constants: UPPER_SNAKE_CASE for values, camelCase for objects

### Module IDs
Use a consistent ID format throughout:
```
Phase.Node.Module

Examples:
- "1.family.capture"      → Who's in Your Family
- "1.family.story"        → Tell Us About Someone
- "1.friends.capture"     → Your Circle
- "1.favorites.spin"      → Spin the Wheel
- "2.chapters.define"     → Define Your Chapters
- "2.chapters.overview.1" → Chapter 1 Overview
- "2.wisdom.quick"        → Quick Wisdom Round
- "3.letters.define"      → Who Do You Want to Write To
- "3.memoir.conversation"  → The Conversation
- "ongoing.journal"       → Freeform Journal
```

### Node IDs
```
family, friends, favorites, career, education, values,
chapters, wisdom, memories,
letters, voiceMessages, memoir,
ongoing
```

## State Management

### For Prototype (No Backend)
Use React Context + localStorage for persistence across sessions:

```typescript
// contexts/ProgressContext.tsx
interface ProgressState {
  completedModules: string[];       // Module IDs
  currentPhase: 1 | 2 | 3 | 'ongoing';
  unlockedNodes: string[];          // Node IDs
  capturedData: Record<string, CapturedData>;  // Per-module captured data
  treeGrowth: number;              // 0-100
  streak: number;
  totalMemories: number;
}
```

### Module Flow State
Each module manages its own step-through state:

```typescript
// hooks/useModuleFlow.ts
interface ModuleFlowState {
  moduleId: string;
  currentStep: number;
  totalSteps: number;
  responses: ModuleResponse[];
  isComplete: boolean;
}
```

## Animation Standards

### Framer Motion Defaults
```typescript
// Standard spring for most transitions
const defaultSpring = { type: "spring", stiffness: 300, damping: 30 };

// Gentle spring for content reveals
const gentleSpring = { type: "spring", stiffness: 200, damping: 25 };

// Snappy spring for UI elements (buttons, cards)
const snappySpring = { type: "spring", stiffness: 400, damping: 35 };

// Slow spring for tree growth
const treeSpring = { type: "spring", stiffness: 100, damping: 20, duration: 1.5 };
```

### Page Transitions
- Module entry: slide up from bottom (y: 100% → 0)
- Module exit: slide down (y: 0 → 100%)
- Between steps within a module: crossfade (opacity 0 → 1) with slight y shift
- Hub entry: slide up from node position
- Bottom sheet: slide up from bottom with spring

### Micro-interactions
- Record button: scale pulse on press (1 → 0.95 → 1)
- Waveform: real-time bars or sine wave during recording
- Spin wheel: physics-based deceleration
- Card flip: rotateY 0 → 180
- Story card: fade in + scale (0.9 → 1)
- Celebration: confetti particle system (use a lightweight library or CSS animation)

## Color Tokens

```typescript
// lib/constants.ts
export const colors = {
  // Core palette (already established)
  parchment: '#FAF6F1',      // Background
  sage: '#8BA888',            // Primary green
  sageDark: '#2D4A3E',       // Dark green (headers, CTAs)
  bark: '#6B4E3D',           // Brown (tree, accents)
  amber: '#D4A574',          // Gold/amber (highlights, milestones)
  warmWhite: '#FFFDF9',      // Card backgrounds
  
  // Category colors (for nodes and prompts)
  family: '#E8D5C4',         // Warm beige
  friends: '#D4E8D4',        // Light sage
  favorites: '#F5E6CC',      // Soft gold
  career: '#D4D8E8',         // Soft blue
  education: '#E8D4E8',      // Soft purple
  values: '#E8E4D4',         // Warm neutral
  chapters: '#D4E4E8',       // Soft teal
  wisdom: '#E8DDD4',         // Warm taupe
  memories: '#F0E4D4',       // Soft peach
  letters: '#D4E8E0',        // Mint
  memoir: '#E8E0D4',         // Cream
  
  // UI states
  locked: '#D4D0CC',         // Faded gray
  suggested: '#E8F0EC',      // Light sage (pulsing)
  active: '#8BA888',         // Full sage
  complete: '#2D4A3E',       // Dark sage
};
```

## Responsive Approach

**Philosophy:** Mobile-first CSS (write base styles for small screens, layer on complexity at breakpoints), but the desktop experience is a FULL layout — not a phone screen centered on a wide monitor. The app should feel native to whatever viewport it's on.

### Breakpoints
```
sm: 640px    (large phones, landscape)
md: 768px    (tablets)
lg: 1024px   (small laptops, tablets landscape)
xl: 1280px   (desktops)
```

### Layout Strategy by Viewport

**Mobile (< 768px)**
- Single column, full-width
- Tap root: vertical path, center trunk, nodes alternate L/R within the column
- Tree illustration: compact, top of screen above tap root
- Modules: full-screen overlay pages
- Bottom sheet: full-width, slides up from bottom
- Voice recording: full-screen takeover
- Navigation: tap root IS the home screen, no sidebar

**Tablet (768px – 1023px)**
- Still single column but wider content area with more generous padding
- Tap root: nodes are larger, more breathing room
- Tree illustration: taller, more detail visible
- Modules: still full-screen but with more padding
- Bottom sheet: centered, max-width ~500px, rounded corners all around

**Desktop (1024px+)**
- **Two-column or sidebar layout:**
  - Left/sidebar area: tree visualization (persistent, always visible, grows in real-time)
  - Main area: tap root path OR active module content
  - When a module is open, it fills the main content area (not a tiny centered card)
- Tap root: can show more nodes at once, wider node bubbles, richer hover states
- Modules: fill the main content area with comfortable max-width (~700px for text-heavy content, wider for interactive elements like the spin wheel)
- Bottom sheet: becomes a side panel or modal dialog, not a sheet
- Voice recording: inline panel within the main area (not a full-screen takeover)
- Node Hub: can show more data at once, possibly a grid layout for story cards
- Story cards: can display in a 2-column grid
- Deliverables (biography, memoir): generous reading width with premium typography

**Key Rule:** At desktop widths, content should FILL the viewport appropriately. No max-width container that makes a 1440px monitor look like a phone emulator. The tree should be large and prominent. The tap root should use the space. Modules should breathe.

### Component-Specific Responsive Behavior

| Component | Mobile | Desktop |
|-----------|--------|---------|
| Home Screen | Tap root (full screen) | Sidebar tree + tap root main area |
| Tap Root | Vertical, narrow trunk | Vertical, wider, more node detail |
| Node Bubbles | ~140px × 60px | ~200px × 70px, hover states |
| Tree | Compact header illustration | Large persistent sidebar visual |
| Voice Recording | Full-screen overlay | Inline panel in main content area |
| Bottom Sheet (Add More) | Full-width slide-up | Centered modal or side panel |
| Story Cards | Single column, full width | 2-column grid |
| Validation Table | Scrollable, compact | Full table with more columns visible |
| Spin Wheel | Full screen, touch-driven | Centered in content area, click-driven |
| Module Pages | Full screen with back nav | Content in main area, sidebar tree stays |
| Profile Page | Single column scroll | Multi-column dashboard layout |
| Deliverables | Scrollable document | Side-by-side preview + controls |

## Prototype-Specific Notes

### Simulating Voice Recording
Since there's no backend, simulate recording:
1. Show recording UI with animated waveform
2. After X seconds (or user tap), show a pre-written mock transcription
3. Advance to next step with mock data

### Simulating AI Responses
Pre-write all AI prompts and responses in the `data/prompts/` files:
```typescript
// data/prompts/family.ts
export const familyCaptureFlow = [
  { role: 'ai', text: "Let's start with the people closest to you. Tell me about your children — do you have any kids?" },
  { role: 'ai', text: "That's wonderful. And your spouse or partner — what's their name?" },
  { role: 'ai', text: "What about your parents? Are they still around?" },
  // ... etc
];
```

### Demo Mode
Consider a "demo mode" toggle that auto-advances through modules with pre-filled data, useful for investor presentations where you don't want to manually tap through every step.

## Key Rules for AI Assistant

1. **Always reuse pattern components** — never build a one-off recording interface when `VoiceRecorder` exists
2. **Extend mockData.ts, don't replace it** — the existing data structure should grow, not restart
3. **Every module must have a route** — `/module/[moduleId]` with proper back navigation
4. **Every node must have a hub** — `/hub/[nodeId]` showing captured data
5. **Animations are not optional** — this is an investor demo. Polish matters.
6. **Mobile-first CSS, full desktop layout** — base styles for small screens, but desktop is NOT a phone in a wrapper. The app fills the viewport with a sidebar tree + main content area on wide screens. The demo could be shown on a phone or projected — both need to look intentional.
7. **Mid-fidelity first** — get the layout, flow, and interactions right. Use placeholder SVGs for the tree. Branded assets come later.
