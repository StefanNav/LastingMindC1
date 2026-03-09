# LastingMind 2.0 — Product Context

> **When to load this file:** ALWAYS. This is the foundational context for every task.

## What Is LastingMind?

LastingMind is a legacy-building app that guides users through capturing their life stories, wisdom, and personal messages for their loved ones. It uses AI-guided conversations, gamified interactions, and a growing tree metaphor to make the process feel rewarding rather than burdensome.

The app has three user types:
1. **Legacy Creator** — the person recording their life (primary user)
2. **Audience Member** — family/friends who view and interact with the creator's legacy
3. **AI** — the conversational partner that guides, captures, and eventually represents the creator

## Core Problem

Users understand LastingMind's value during sales but lose motivation inside the app. The current version lacks clear direction, has confusing terminology, and doesn't create habits. LM 2.0 solves this with a path-based, phase-gated experience inspired by Duolingo.

## The Three Pillars

1. **Habit-Forming** — Users want to return (streaks, gamification, family engagement loop)
2. **Instructional** — Users always know what to do next (path-based navigation, one clear CTA)
3. **Rewarding** — Users see the value of their effort (deliverables, tree growth, family reactions)

## Phase Structure

The app is organized into sequential phases. Each phase unlocks after the previous is complete:

| Phase | Name | Purpose | Unlocks When |
|-------|------|---------|--------------|
| 1 | Foundation | Capture who you are — family, friends, career, education, favorites, values | App start |
| 2 | Life Story | Tell your life chapters, wisdom, and greatest memories | Phase 1 complete |
| 3 | Personal | Letters, voice messages, and your memoir | Phase 2 complete |
| Ongoing | Keep Growing | Family questions, AI prompts, journal, seasonal content | Phase 3 complete |

## The Tree Metaphor

The tree is the central visual and emotional metaphor:
- **Roots** = Phase 1 (Foundation) — who you are
- **Trunk** = Phase 2 (Life Story) — your narrative
- **Branches & Leaves** = Phase 3 (Personal) — what you leave behind
- **Flowers & Fruit** = Ongoing — continuous growth

The tree grows incrementally throughout each phase (not just at milestones). Adding a family member = new leaf. Telling a story = branch thickens. Completing a phase = major growth stage.

## Key Design Principles

1. **Voice-first everywhere** — Recording speech is the primary input on both mobile and web. Text is always available as a fallback but never the default.
2. **Never feel like a form** — Conversations, not fields. Validation tables appear at the end, not as the primary input method.
3. **Every module has a deliverable** — Story cards, personality trading cards, values clouds, biography chapters, wisdom decks. Users always walk away with something tangible.
4. **The path is suggested, not the only route** — Structured phases for most users, but freeform journal available for those who want to just talk.
5. **Family drives retention** — The strongest re-engagement mechanism is a daughter asking a question, not a push notification.

## Navigation Model

- **Tap Root** — Vertical scrollable path on the home screen showing all nodes. Nodes alternate left/right of a center trunk line. The tree illustration sits behind/above the path.
- **Node States** — Locked (faded, dashed border), Suggested (pulsing), Active (solid with icon), Complete (solid with story count and green indicator)
- **Node Hub / Scorecard** — Tapping a completed node opens its hub showing all captured data, story counts, and Add More options
- **Bottom-Sheet Slide-Over** — Tapping "Add More" on any node slides up a sheet with specific options. Tapping an option slides the sheet right to reveal the module flow.

## Tech Stack (Current Build)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Animations | Framer Motion |
| PWA | next-pwa |
| Fonts | DM Serif Display, Nunito |
| State | Mock data (no backend yet) |

## Design Language

- Warm, organic color palette: sage greens, parchment, bark browns, amber accents
- Nature-inspired metaphors throughout
- Soft animations with spring physics (Framer Motion)
- DM Serif Display for headings (warm, editorial), Nunito for body (friendly, readable)
- Premium but approachable — not clinical, not childish
- **Fully responsive:** mobile-first CSS but the desktop layout is a FULL experience (sidebar tree + main content area), not a phone screen centered on a wide monitor. The app should feel native to the viewport.

## Current Build State

The home page is built with:
- Prompt Carousel (swipeable cards with memory prompts)
- Memory Tree visualization (animated SVG, grows with `growthPercentage`)
- Timeline Log (chronological memory display, filterable)
- User progress tracking (streak counter, memory count)
- Mock data only — no backend, no actual recording

## Prototype Goal

This prototype is for **investor demos**. It needs to:
- Demonstrate the full user journey across all phases
- Show key interaction patterns working (voice recording UI, spin wheel, story cards, etc.)
- Feel polished enough to be credible but not production-ready
- Use mock data and simulated AI responses throughout
- Be built epic-by-epic, mid-fidelity first, then elevated to high-fidelity with branded assets
