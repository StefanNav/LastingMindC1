# Epic Build Sequence — What to Build and When

> **When to load this file:** When starting a new epic. Gives you the build order, what each epic delivers, and acceptance criteria.

## Build Order & Dependencies

```
Epic 0: Core Shell ──────────────┐
Epic 1: Voice Infrastructure ────┤
                                 ├──→ Epic 2: Family ──→ Epic 3: Friends
                                 │                   ──→ Epic 4: Favorites
                                 │                   ──→ Epic 5: Career
                                 │                   ──→ Epic 6: Education
                                 │                   ──→ Epic 7: Values
                                 │
                                 └──→ Epic 8: Phase 1 Milestone ──→ Epic 9: Life Chapters
                                                                  ──→ Epic 10: Wisdom
                                                                  ──→ Epic 11: Greatest Memories
                                                                  ──→ Epic 12: Phase 2 Milestone
                                                                  ──→ Epic 13: Personal Legacy
                                                                  ──→ Epic 14: Phase 3 Milestone
                                                                  ──→ Epic 15: Ongoing
                                                                  ──→ Epic 16: Audience Experience
```

---

## Epic 0: Core App Shell & Navigation

**Goal:** Build the container everything lives in. After this epic, the home screen works and you can tap through node states.

### Stories to Build
| Story | What to Build | Acceptance |
|-------|--------------|------------|
| S-00.1 | Home screen with tap root path | Vertical scrollable path with nodes alternating L/R. Nodes show correct states (locked/suggested/active/complete). Tree illustration behind path. "Next Reflection" card at top. Header with streak + avatar. |
| S-00.2 | Node Hub / Scorecard | Tapping a complete node opens hub page. Shows placeholder captured data, story counts. Back navigation works. |
| S-00.3 | Bottom-Sheet Add More | "Add More" on hub triggers bottom sheet with options. Tapping option slides sheet right to placeholder module. Back gesture returns to options. |
| S-00.5 | Back navigation to previous phases | Quick-nav menu or scroll-to-phase works from any position in tap root. |

### Key Components to Create
- `TapRoot.tsx` — main path visualization (refactor from current home page)
- `NodeBubble.tsx` — individual node with state variants
- `BottomSheet.tsx` — reusable slide-over sheet
- `Header.tsx` — app header (likely refactor existing)

### Data to Set Up
- `modules.ts` — all module definitions with IDs, phases, nodes, lock conditions
- `ProgressContext.tsx` — progress state provider
- Extend `mockData.ts` with node/phase structure

### Notes
- The current home page has a PromptCarousel, MemoryTree, and TimelineLog. The tap root path should REPLACE the PromptCarousel as the primary navigation. The tree visualization stays but becomes the background/header of the tap root. The TimelineLog can move to the profile page or become part of node hubs.

---

## Epic 1: Voice & Recording Infrastructure

**Goal:** Build the reusable recording components that every module will use.

### Stories to Build
| Story | What to Build | Acceptance |
|-------|--------------|------------|
| S-01.1 | Voice recording interface | Full-screen recording view works. Waveform animates. Timer counts. Stop shows mock transcription. Record → review → submit flow complete. |
| S-01.2 | Text input fallback | Toggle between voice and text works everywhere recording appears. |

### Key Components to Create
- `VoiceRecorder.tsx` — the core recording UI (waveform, timer, controls)
- `VoiceConversation.tsx` — wraps VoiceRecorder with AI prompt sequencing (mode="capture" or "story")
- `StoryCard.tsx` — reusable story card output component
- `ValidationTable.tsx` — editable table for confirming captured data

### Notes
- For the prototype, recording is simulated: tap record → waveform animates for a few seconds → mock transcription appears. No actual audio capture needed for the demo.
- The waveform can be a simple CSS animation of bars or a canvas-drawn sine wave. Doesn't need real audio data.

---

## Epic 2: Phase 1 — Family Node

**Goal:** First complete module. This sets the pattern for all Foundation nodes.

### Stories to Build
| Story | What to Build | Acceptance |
|-------|--------------|------------|
| S-02.1 | Who's in Your Family (conversation capture) | AI prompts walk through relationship categories. Mock recording captures names. Validation table shows captured family. Confirm → Family Hub populates. |
| S-02.2 | Tell Us About Someone (story) | Scroll-wheel picker shows family names. Pick one → story prompt → record → AI follow-up → Story Card generated. "Future grandchild" preview shows. |

### Key Components to Create
- `PersonPicker.tsx` — scroll-wheel name selector
- Family-specific prompt data in `data/prompts/family.ts`
- Family Hub page at `/hub/family`

### Mock Data Needed
- 6-8 family member names + relationships (pre-filled after "capture")
- 2-3 pre-written story transcriptions
- AI follow-up questions for family stories

### Acceptance for the Full Node
- [ ] Tapping Family node on tap root enters the capture module
- [ ] AI conversation flows through relationship categories
- [ ] Validation table appears with captured names
- [ ] After confirm: Family Hub shows all members with story counts
- [ ] "Tell Us About Someone" module accessible from hub
- [ ] Scroll-wheel picker works with snap physics
- [ ] Story card generated after telling a story
- [ ] Family node on tap root shows "complete" state with story count
- [ ] Tree shows subtle growth after completion

---

## Epic 3: Phase 1 — Friends Node

**Goal:** Validate pattern reuse. Should be fast to build if Family is solid.

### Reuses from Epic 2
- `VoiceConversation` (mode="capture") — same component, different prompts
- `PersonPicker` — same component, different names
- `StoryCard` — same component
- `ValidationTable` — same component
- Hub pattern — same layout

### What's New
- Friends prompt data (`data/prompts/friends.ts`) — organized by life stage (childhood, young adult, adult)
- Friends Hub at `/hub/friends` — grid visual with colored avatars

---

## Epic 4: Phase 1 — Favorites Node

**Goal:** First gamified module. Build the Spin Wheel component.

### Stories to Build
| Story | What to Build | Acceptance |
|-------|--------------|------------|
| S-04.1 | Spin the Wheel | Wheel spins with physics. Lands on category. User records answer. Counter tracks progress (X/10). After 10: Personality Trading Card generated. |

### Key Components to Create
- `SpinWheel.tsx` (variant="wheel") — animated wheel with physics
- `PersonalityCard.tsx` — trading card deliverable

### Notes
- The wheel needs to feel satisfying. Invest in the spin physics (use Framer Motion with velocity/deceleration). Sound effect hooks even if not implemented yet.
- 50+ categories in the pool, 8-10 visible on wheel at a time, rotate after each answer.

---

## Epic 5: Phase 1 — Career Node

**Goal:** Reuse conversation + story patterns. Add timeline visualization.

### Reuses from Epic 2
- `VoiceConversation` (mode="capture") with career prompts
- `VoiceConversation` (mode="story") with career story prompts
- `StoryCard`, `ValidationTable`

### What's New
- Career Timeline visualization in hub (companies, roles, years on a vertical timeline)
- Career prompt data organized chronologically

---

## Epic 6: Phase 1 — Education Node

**Goal:** Simplified variant. Should be the fastest Foundation node to build.

### Notes
- Simpler than Career — could be a single open-ended question rather than full conversation
- Validation is a card, not a full table
- One story prompt for a school memory

---

## Epic 7: Phase 1 — Core Values Node

**Goal:** Second gamified mechanic. Build the card-flip variant of SpinWheel.

### Key Components to Create
- `SpinWheel.tsx` (variant="cardFlip") — different visual from Favorites wheel
- `ValuesCloud.tsx` — word cloud deliverable extracted from answers

---

## Epic 8: Phase 1 Milestone & Unlocks

**Goal:** First major celebration. Tree growth animation. Feature unlock flow.

### Stories to Build
| Story | What to Build | Acceptance |
|-------|--------------|------------|
| S-08.1 | Phase 1 Milestone celebration | Full-screen celebration. Tree grows sapling → young. Unlock cards appear. Phase 2 nodes fade in on tap root. |
| S-08.2 | Voice Clone setup (simplified) | Guided flow: read script → progress bar → "processing" confirmation. For prototype: show the flow, use mock result. |
| S-08.3 | Invite Audience Members | Add recipients manually. "Send invite" (mock). Audience Manager shows invite status. |

### Key Components to Create
- `MilestoneCelebration.tsx` (variant="phase")
- `TreeGrowth.tsx` — animation controller for tree stage transitions
- Voice Clone setup page
- Audience Manager page

### Notes
- The tree growth animation is a key investor moment. Even at mid-fidelity, it needs to feel meaningful. Use a placeholder SVG that transitions between growth stages.
- Voice Clone doesn't need to actually work — show the UX flow with a "processing" state at the end.

---

## Epic 9: Phase 2 — Life Chapters

**Goal:** Most complex epic. Drag-and-drop chapter definition that generates tap root nodes. Reusable chapter template.

### Stories to Build
| Story | What to Build | Acceptance |
|-------|--------------|------------|
| S-09.1 | Define Your Chapters | AI suggests 6-10 chapters. User can drag-reorder, edit, add, remove. Confirm → chapter nodes appear in tap root. |
| S-09.2 | Chapter Overview (per chapter) | AI conversation about the chapter. 3-5 exchanges. Success: bullet-point highlights. |
| S-09.3 | Chapter Go Deeper (per chapter) | AI-curated questions targeting gaps. 2+ answered. Success: full written chapter paragraph. |

### Key Components to Create
- `PromptSelector.tsx` — card grid with drag-and-drop reorder
- `CuratedQuestions.tsx` — gap-targeted question cards
- `ChapterPage.tsx` — chapter success screen (bullet → full paragraph upgrade)
- Dynamic tap root node generation from confirmed chapters

### Notes
- This is the hardest epic technically. The chapter definition flow that dynamically generates tap root nodes requires careful state management.
- For prototype: pre-generate 5-6 chapter nodes after the definition step. Don't need truly dynamic generation — just show the flow.

---

## Epic 10: Phase 2 — Wisdom & Advice

### Build three modules with increasing depth:
1. **Quick Wisdom Round** — `SpinWheel` (variant="slot"), `WisdomDeck.tsx` deliverable
2. **Lessons Learned** — dual-axis selection (theme × experience), `CuratedQuestions`
3. **Keys to Life** — `PromptSelector` to pick top 3-5, then `VoiceConversation` (mode="story") per key, `KeysToLife.tsx` hero deliverable

---

## Epic 11: Phase 2 — Greatest Memories (Gated)

### Notes
- Node appears locked until Life Chapters complete
- `PromptSelector` for defining moments
- `VoiceConversation` (mode="story") for deep conversations
- `HighlightReel.tsx` deliverable — collection of moment story cards

---

## Epic 12: Phase 2 Milestone

### Key Deliverables
- Tree grows to mature stage
- Full Biography preview (combine all chapter pages into one scrollable document)
- Chat with Self tutorial flow (guided steps showing how chat works)

---

## Epic 13: Phase 3 — Personal Legacy

### Three modules:
1. **Letters** — `PromptSelector` for recipients + `AIWritingAssist` for writing + permissions UI + timed delivery settings
2. **Voice Messages** — `PersonPicker` → simple record → title → save. Message gallery.
3. **How I Hope to Be Remembered** — Capstone `VoiceConversation` (mode="story") → `AIWritingAssist` for memoir editing → `MemoirPage.tsx` hero deliverable

---

## Epic 14: Phase 3 Milestone

- Tree reaches full maturity (flowers, fruit)
- Letters queued for delivery (mock)
- Transition to Ongoing mode

---

## Epic 15: Ongoing

### Different UI paradigm from tap root. Consider:
- Living home screen with rotating prompt cards
- Family question cards with notification badges
- "Just Talk" floating button
- Seasonal visual changes to tree
- Monthly check-in prompts

---

## Epic 16: Audience Member Experience

### Two views:
1. **Pre-Chat** — profile page with scorecards, story cards, personality card. "Ask a Question" button.
2. **Post-Chat** — full AI chat interface with creator's data. Voice clone playback. Letter/message access.

---

## Mid-Fidelity vs. High-Fidelity Checklist

### Mid-Fidelity (Build First)
- [ ] All routes and navigation working
- [ ] All interaction patterns functional with mock data
- [ ] Layout and spacing correct on mobile and desktop
- [ ] Framer Motion transitions between screens
- [ ] Simulated recording flow (waveform, timer, mock transcription)
- [ ] All deliverables generated (story cards, trading card, values cloud, etc.)
- [ ] Tree shows growth stages (placeholder SVG)
- [ ] Demo mode: can advance through all modules with pre-filled data

### High-Fidelity (Polish Later)
- [ ] Branded tree asset (from Blender/Spline/Rive) replaces placeholder SVG
- [ ] Real spin wheel physics with sound effects
- [ ] Particle effects for celebrations
- [ ] Haptic feedback integration
- [ ] Polished deliverable templates (printable PDF quality)
- [ ] Seasonal tree variations
- [ ] Micro-interaction sound design
- [ ] Loading states and skeleton screens
- [ ] Error states and edge cases
