# LastingMind AI Context — Master Index

> **This file should be loaded at the START of every Claude Code session.**
> It tells you which context files exist and when to load them.

## Context Files

| File | Size | Load When |
|------|------|-----------|
| `PRODUCT.md` | ~4K | **ALWAYS** — product vision, phase structure, design principles, tech stack, current state |
| `PATTERNS.md` | ~8K | **When building any module** — the 10 reusable interaction patterns with component specs and reuse matrix |
| `ARCHITECTURE.md` | ~5K | **When writing code** — project structure, naming conventions, state management, animation standards |
| `DESIGN_TOKENS.md` | ~5K | **When styling anything** — colors, typography, spacing, shadows, component patterns, animation presets |
| `EPICS.md` | ~8K | **When starting a new epic** — build order, dependencies, acceptance criteria per epic |
| `MODULES.md` | ~8K | **When building a specific module** — AI prompts, mock data, flow details per module |

## Loading Strategy

### Starting a new session:
```
Always load: PRODUCT.md
```

### Building a new epic:
```
Load: PRODUCT.md + EPICS.md + ARCHITECTURE.md
Then load PATTERNS.md + DESIGN_TOKENS.md when you start coding
```

### Building a specific module:
```
Load: PRODUCT.md + PATTERNS.md + MODULES.md + DESIGN_TOKENS.md
Reference: ARCHITECTURE.md for file placement
```

### Fixing styling or visual issues:
```
Load: DESIGN_TOKENS.md + PRODUCT.md (design language section)
```

### Adding a new page or route:
```
Load: ARCHITECTURE.md (project structure + naming)
```

## Quick Reference: What Epic Am I On?

Check `src/data/modules.ts` for the current state of module definitions.
Check which routes exist in `src/app/` to see what's been built.
Check `ProgressContext` for what states are implemented.

## Key Reminders for Claude Code

1. **Reuse pattern components** — check PATTERNS.md reuse matrix before building anything new
2. **Mock everything** — no backend, no real audio, no real AI. All simulated with pre-written data
3. **Animations are required** — this is an investor demo. Every transition should use Framer Motion
4. **Fully responsive — not a phone wrapper on desktop** — mobile-first CSS, but on desktop (1024px+) the layout uses a sidebar tree + main content area. Content fills the viewport. See ARCHITECTURE.md responsive section for specifics.
5. **Extend, don't replace** — existing components (MemoryTree, PromptCarousel, TimelineLog) should be refactored into the new structure, not deleted
6. **Mid-fidelity first** — get flows working with placeholder visuals. Polish comes in a second pass
7. **Every module needs a route** — `/module/[moduleId]` pattern
8. **Every node needs a hub** — `/hub/[nodeId]` pattern
9. **Tree grows incrementally** — update growth state after every module completion
10. **The demo flow matters** — consider building a "demo mode" that auto-advances through the app with mock data for live presentations
