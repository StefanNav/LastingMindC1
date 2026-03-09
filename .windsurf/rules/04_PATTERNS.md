# Interaction Patterns — Reusable Component Library

> **When to load this file:** When building ANY module. These patterns are the building blocks every module assembles from. Design and build these as reusable components.

## Pattern Index

| ID | Name | Used By | Component Priority |
|----|------|---------|-------------------|
| IP-01 | Voice Conversation (Capture) | Family, Friends, Career, Education | Build first |
| IP-02 | Voice Conversation (Story) | All story modules, chapters, memoir | Build first |
| IP-03 | Gamified Spin / Roulette | Favorites, Values, Wisdom, Lessons | Build second |
| IP-04 | Guided Prompt Selection | Define Chapters, Define Moments, Letters, Keys to Life | Build second |
| IP-05 | Scroll-Wheel Picker + Story | Family Story, Friend Story, Voice Messages | Build second |
| IP-06 | AI-Curated Questions | Go Deeper, Lessons, AI Prompts (Ongoing) | Build third |
| IP-07 | Write / Edit with AI Assist | Letters, Memoir editing | Build third |
| IP-08 | Milestone Celebration | Phase completions, node completions | Build second |
| IP-09 | Family Question Response | Ongoing — family questions | Build fourth |
| IP-10 | Open Journal | Freeform Journal, Monthly Check-In | Build fourth |

---

## IP-01: Voice Conversation (Capture)

**Purpose:** AI-led conversational interview to capture structured data (names, places, dates, roles).

**Component: `<VoiceConversation mode="capture" />`**

### UI Elements
- Full-screen recording view
- AI prompt text displayed above record button (large, readable)
- Large center record button with mic icon
- Real-time waveform visualization during recording
- Timer showing recording duration
- Pause / resume controls (secondary)
- Stop → transcription preview with edit affordance
- Re-record option
- Submit / continue button
- Progress indicator (subtle — e.g., dots or a soft bar, NOT a rigid "3/7 questions")
- **End state:** Validation table for reviewing captured data

### AI Behavior (Simulated for Prototype)
- Display pre-written AI prompts in sequence
- After user "records" (simulate with tap-to-advance or timer), show next AI prompt
- AI prompts should feel conversational: "Tell me about your children" → "Anyone else you're close with?" → "What about your parents?"
- End with validation table showing captured entries
- **For prototype:** Use mock transcription data that appears after recording

### Validation Table
- Table rows: Name | Relationship/Role | Edit button
- "Looks good" / "Add someone I missed" actions at bottom
- Editable inline — tap a name to correct spelling

### Transitions
- Entry: slide up from node tap
- Between prompts: gentle crossfade
- To validation table: slide up with summary animation
- Exit to success: celebration micro-animation → node hub

### Where It's Used
- Who's in Your Family (family members by relationship)
- Your Circle (friends by life stage)
- Your Career Journey (jobs chronologically)
- Where You Learned (schools — simplified variant)

---

## IP-02: Voice Conversation (Story / Reflective)

**Purpose:** AI-guided reflective conversation to capture stories and deeper meaning. Unlike IP-01, this is about narrative richness, not data capture.

**Component: `<VoiceConversation mode="story" />`**

### UI Elements
- Same recording interface as IP-01
- AI prompt is more open-ended and emotional: "Tell us a story about [Name]"
- After first recording: AI follow-up question appears (1-2 follow-ups max)
- Session summary showing time spent and themes extracted
- **End state:** Story Card preview

### Key Differences from IP-01
- No validation table at end
- Follow-up questions are based on what the user said (simulated with pre-written variants)
- Shorter session target: 3-5 exchanges, 5-10 minutes
- Success output is a Story Card, not a data table
- More emotional framing in AI prompts

### Story Card Output
- Title (AI-generated or user-provided)
- Date
- Key quote pulled from user's words (1 sentence)
- Associated person/topic
- Theme tags (e.g., "resilience," "family bond," "humor")
- Category color bar
- Shareable

### Where It's Used
- Tell Us About Someone (Family)
- A Friend Story
- A Career Story
- A School Memory
- Life Chapter Overview (per chapter)
- Life Chapter Go Deeper (per chapter)
- Greatest Memory Stories
- How I Hope to Be Remembered (capstone)
- Keys to Life conversations

---

## IP-03: Gamified Spin / Roulette

**Purpose:** Randomized prompt selection with satisfying physics. Fast, fun, low-pressure.

**Component: `<SpinWheel variant="wheel|cardFlip|slot" />`**

### Visual Variants (use different variants per module to maintain freshness)
1. **Wheel** (Favorites) — circular wheel with category labels, spin physics, pointer at top
2. **Card Flip** (Core Values) — deck of cards, tap to flip and reveal question
3. **Slot Machine** (Quick Wisdom) — vertical slot reel, snaps to a prompt

### UI Elements
- Animated randomizer centered on screen
- Category/prompt label revealed with satisfying animation
- Sound effect cue (design for it even if not implemented yet — leave hook)
- Haptic feedback marker (vibration on mobile)
- Record button appears after reveal
- Short response area (voice or text)
- Progress counter: "3/10 answered"
- "Choose your own" small link at bottom
- After each answer: answered prompt visually "collected" (shrinks into a card/chip)

### Timing
- Spin animation: ~1.5-2 seconds
- Response: 30-90 seconds suggested (no hard limit)
- Total module: ~5-8 minutes for 10 answers

### Success Outputs (varies by module)
- **Favorites:** Personality Trading Card
- **Core Values:** Values Word Cloud
- **Quick Wisdom:** Wisdom Card Deck
- **Lessons Learned:** Lessons Summary

### Where It's Used
- Spin the Wheel (Favorites) — wheel variant
- What Matters Most (Core Values) — card flip variant
- Quick Wisdom Round — slot variant
- Lessons Learned — slot or card flip variant
- More Rounds (Ongoing) — reuses all variants

---

## IP-04: Guided Prompt Selection

**Purpose:** User picks from AI-generated options. More intentional than the randomizer — user has agency.

**Component: `<PromptSelector />`**

### UI Elements
- Card grid or swipeable card row
- Each card: prompt text + brief context + optional icon
- Select/deselect toggle on each card
- Selected cards have a check or highlight state
- "Suggest more" button — loads additional AI-generated options
- "Add your own" text input at bottom
- Drag-and-drop reordering (for Define Your Chapters)
- Confirm button: "These are my chapters" / "Start with these"

### Where It's Used
- Define Your Chapters (drag-and-drop reorder + add/remove)
- Define Your Moments (Greatest Memories — select 3+)
- Who Do You Want to Write To (Letters — select recipients)
- Keys to Life (select top lessons to explore)

---

## IP-05: Scroll-Wheel Picker + Story

**Purpose:** Select a person from a scroll-wheel UI, then tell a story about them.

**Component: `<PersonPicker />` → transitions to `<VoiceConversation mode="story" />`**

### UI Elements
- Date-picker style vertical scroll wheel showing names
- Names scroll with snap-to-center physics
- Haptic feedback on each snap
- "Surprise me" button at bottom (selects randomly with shuffle animation)
- Selected name confirmed with zoom/highlight animation
- Transitions to IP-02 (Voice Conversation — Story) with the selected name as context

### Where It's Used
- Tell Us About Someone (Family — pick a family member)
- A Friend Story (pick a friend)
- Voice Messages — Leave a Message (pick a recipient)
- Any future "pick a person" flow

---

## IP-06: AI-Curated Questions

**Purpose:** AI generates specific questions based on gaps in the user's data.

**Component: `<CuratedQuestions />`**

### UI Elements
- Single question card displayed prominently
- Context line above: "Based on your chapter about college..."
- Record/type response area
- "Skip this one" → next question with slide animation
- "Different question" → AI regenerates (with loading shimmer)
- Progress: "2/5 answered"

### Where It's Used
- Go Deeper (Life Chapters — per chapter)
- Lessons Learned (personalized questions)
- AI Go Deeper Prompts (Ongoing)
- Seasonal Prompts (Ongoing)

---

## IP-07: Write / Edit with AI Assist

**Purpose:** Collaborative writing/editing with AI brainstorming and polishing.

**Component: `<AIWritingAssist />`**

### UI Elements
- Full-screen writing area (distraction-free)
- Voice dictation toggle (mic icon → transcribes to text)
- AI suggestions panel: slide-in from right or inline highlights
- Accept / reject per suggestion
- "Help me start" button → AI brainstorm mode
- Preview mode: "See it as [recipient] will see it"
- Save draft / Mark complete

### Where It's Used
- Write Your Letters
- Edit & Refine (Memoir)
- Keys to Life refinement (optional)

---

## IP-08: Milestone Celebration

**Purpose:** Major celebration when completing a phase or node.

**Component: `<MilestoneCelebration variant="node|phase" />`**

### Node Completion (smaller)
- Brief confetti or particle burst
- Node icon animates (bounce + glow)
- Story count updates
- Quick "Nice work!" message
- Auto-dismisses in 2-3 seconds

### Phase Completion (major)
- Full-screen takeover
- Tree growth animation (sapling → young → mature → flowering)
- Sound effects + haptic
- Emotional message: "Your LastingMind now knows who you are"
- Feature unlock cards (Voice Clone, Invite Family, etc.)
- "Continue" or "Take a break" choice

### Where It's Used
- Every node completion (small variant)
- Phase 1 Milestone (major — unlocks Voice Clone + Invite)
- Phase 2 Milestone (major — unlocks Biography + Chat Tutorial)
- Phase 3 Milestone (major — unlocks Letters delivery + full tree)

---

## IP-09: Family Question Response

**Purpose:** Answer a question from a family member. Direct human-to-human prompt.

**Component: `<FamilyQuestionCard />`**

### UI Elements
- Prompt card: avatar of who asked, their name, the question
- "Sarah asked: What was it like when I was born?"
- Record button (voice-first)
- Text fallback
- "Answer later" → saves to queue
- After answering: "Response sent to Sarah" confirmation
- Notification badge on home screen when new questions arrive

### Where It's Used
- Family-Submitted Questions (Ongoing)
- Pre-Ongoing question storage (questions queued before phase unlocks)

---

## IP-10: Open Journal

**Purpose:** Freeform voice or text entry. No structure, no prompts.

**Component: `<FreeformJournal />`**

### UI Elements
- Minimal UI: just a record button and/or text area
- Optional date stamp
- No AI prompting during entry
- After submission: AI classification card ("We added this to your Family branch. Does that feel right?")
- Confirm / override classification
- Entry appears in journal timeline

### Where It's Used
- Freeform Journal (Ongoing)
- Monthly Check-In (Ongoing — with monthly cadence prompt)
- "Just Talk" quick access from home screen

---

## Component Reuse Matrix

This shows which base components each module needs:

| Module | Voice Record | Spin/Roulette | Prompt Select | Scroll Picker | Curated Qs | AI Write | Celebration | Story Card | Validation Table |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Who's in Your Family | ✓ | | | | | | ✓ | | ✓ |
| Tell Us About Someone | ✓ | | | ✓ | | | ✓ | ✓ | |
| Your Circle | ✓ | | | | | | ✓ | | ✓ |
| A Friend Story | ✓ | | | ✓ | | | ✓ | ✓ | |
| Spin the Wheel | ✓ | ✓ | | | | | ✓ | | |
| Career Journey | ✓ | | | | | | ✓ | | ✓ |
| A Career Story | ✓ | | | | | | ✓ | ✓ | |
| Where You Learned | ✓ | | | | | | ✓ | | ✓ |
| A School Memory | ✓ | | | | | | ✓ | ✓ | |
| What Matters Most | ✓ | ✓ | | | | | ✓ | | |
| Define Chapters | | | ✓ | | | | | | |
| Chapter Overview | ✓ | | | | | | ✓ | ✓ | |
| Chapter Go Deeper | ✓ | | | | ✓ | | ✓ | ✓ | |
| Quick Wisdom | ✓ | ✓ | | | | | ✓ | | |
| Lessons Learned | ✓ | ✓ | | | ✓ | | ✓ | | |
| Keys to Life | ✓ | | ✓ | | | | ✓ | | |
| Define Moments | | | ✓ | | | | | | |
| Tell Each Story | ✓ | | | | | | ✓ | ✓ | |
| Letters — Recipients | | | ✓ | | | | | | |
| Write Letters | ✓ | | | | | ✓ | ✓ | | |
| Voice Messages | ✓ | | | ✓ | | | ✓ | | |
| The Conversation (Memoir) | ✓ | | | | | | ✓ | | |
| Edit & Refine (Memoir) | | | | | | ✓ | ✓ | | |
| Family Questions | ✓ | | | | | | | | |
| Freeform Journal | ✓ | | | | | | | | |
