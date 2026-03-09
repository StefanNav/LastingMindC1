# Module Data Reference

> **When to load this file:** When building a SPECIFIC module. Contains the AI prompts, mock data, and flow details for each module. Load alongside PATTERNS.md for the component specs.

## Phase 1: Foundation Modules

### 1.family.capture — "Who's in Your Family"

**Pattern:** IP-01 (Voice Conversation — Capture)

**AI Prompt Sequence:**
```
1. "Let's start with the people closest to you. Do you have any children? Tell me their names."
2. "And your spouse or partner — what's their name?"
3. "What about your parents? Tell me about them."
4. "Do you have any siblings?"
5. "Any grandparents you'd like to include?"
6. "Is there anyone else important — aunts, uncles, cousins, close family friends who feel like family?"
7. [AI determines completeness] "It sounds like I've got a good picture of your family. Let me make sure I have everyone right."
```

**Mock Captured Data (for demo):**
```json
[
  { "name": "Sarah", "relationship": "Daughter", "stories": 0 },
  { "name": "Michael", "relationship": "Son", "stories": 0 },
  { "name": "Linda", "relationship": "Wife", "stories": 0 },
  { "name": "Robert", "relationship": "Father", "stories": 0 },
  { "name": "Margaret", "relationship": "Mother", "stories": 0 },
  { "name": "Tom", "relationship": "Brother", "stories": 0 },
  { "name": "Helen", "relationship": "Grandmother (maternal)", "stories": 0 }
]
```

**Validation Table Columns:** Name | Relationship | ✏️ Edit

**Success → Opens:** Family Hub at `/hub/family`

---

### 1.family.story — "Tell Us About Someone"

**Pattern:** IP-05 (Scroll-Wheel Picker) → IP-02 (Voice Conversation — Story)

**Picker Content:** All names from capture module

**AI Prompt Sequence (after picking "Margaret — Mother"):**
```
1. "Tell me a story about Margaret. Something that comes to mind when you think of her."
2. [After recording] "That's a beautiful memory. What do you think Margaret would say about that moment if she could hear you tell it?"
```

**Mock Story Card:**
```json
{
  "title": "Mom's Sunday Dinners",
  "person": "Margaret",
  "relationship": "Mother",
  "date": "March 2026",
  "quote": "She always said the secret ingredient was having everyone together.",
  "themes": ["family bond", "tradition", "love"],
  "category": "family"
}
```

**"Future Question" Preview:**
> 💬 "One day, your great-grandchild might ask: **'What was Grandma Margaret like?'**"
> 
> *Your AI would answer: "Your great-grandmother Margaret was the heart of the family. She was known for her Sunday dinners — she always said the secret ingredient was having everyone together. She had a warmth that made everyone feel at home..."*

---

### 1.friends.capture — "Your Circle"

**Pattern:** IP-01 (Voice Conversation — Capture)

**AI Prompt Sequence:**
```
1. "Let's talk about your friends. Think back to childhood — who were the friends you grew up with?"
2. "What about your teenage years and young adulthood? Any friends from that time who stand out?"
3. "And more recently — who are the friends in your life now?"
4. "Anyone else who's been important to you along the way?"
5. [Completeness check] "Great, let me make sure I've got everyone."
```

**Mock Captured Data:**
```json
[
  { "name": "Jimmy", "lifeStage": "Childhood", "stories": 0 },
  { "name": "David", "lifeStage": "Childhood", "stories": 0 },
  { "name": "Mark", "lifeStage": "College", "stories": 0 },
  { "name": "Rachel", "lifeStage": "College", "stories": 0 },
  { "name": "Steve", "lifeStage": "Adulthood", "stories": 0 },
  { "name": "Karen", "lifeStage": "Adulthood", "stories": 0 }
]
```

---

### 1.friends.story — "A Friend Story"

**Pattern:** IP-05 → IP-02

Same flow as family story but with friend names. Picker organized by life stage sections.

---

### 1.favorites.spin — "Spin the Wheel"

**Pattern:** IP-03 (variant="wheel")

**Category Pool (50+ — show 8-10 on wheel at a time, rotate after each answer):**
```
Round 1: Movies, Music, Food, Travel, Hobbies, Books, Sports Teams, Season
Round 2: Restaurants, Childhood Memories, Holidays, Animals, Morning Routines, Cars, Colors, Quotes
Round 3: TV Shows, Cuisines, Outdoor Activities, Life Lessons, Bands, Desserts, Vacation Types, Podcasts
[... continues with: Songs, Albums, Artists, Drinks, Coffee Orders, Cocktails, Cities, Countries,
 Shoes, Scents, Traditions, Board Games, Gadgets, Home Decor, Charities, Historical Figures, etc.]
```

**Mock Answers (for demo Trading Card):**
```json
{
  "Movies": "The Shawshank Redemption",
  "Music": "Jazz — especially Miles Davis",
  "Food": "My wife's lasagna",
  "Travel": "Tuscany, Italy",
  "Hobbies": "Woodworking",
  "Books": "To Kill a Mockingbird",
  "Sports Teams": "Chicago Cubs",
  "Season": "Fall",
  "Childhood Memory": "Building forts in the backyard",
  "Life Lesson": "Never go to bed angry"
}
```

**Trading Card Layout:**
```
┌─────────────────────────┐
│  [User Photo/Avatar]    │
│  ───────────────────    │
│  🎬 The Shawshank Redemption
│  🎵 Jazz — Miles Davis  │
│  🍝 Wife's lasagna      │
│  ✈️ Tuscany, Italy      │
│  🔨 Woodworking         │
│  📚 To Kill a Mockingbird
│  ⚾ Chicago Cubs        │
│  🍂 Fall                │
│  🏠 Building backyard forts
│  💡 Never go to bed angry
│  ───────────────────    │
│  [Name] · [Date]        │
└─────────────────────────┘
```

---

### 1.career.capture — "Your Career Journey"

**Pattern:** IP-01 (Voice Conversation — Capture)

**AI Prompt Sequence:**
```
1. "Let's walk through your career. What was your first real job?"
2. "What came after that? Walk me through the major steps."
3. "What about the job you held the longest? Tell me about that."
4. "Are you still working, or have you retired? Tell me about where things stand now."
5. [Completeness] "Let me make sure I've captured your career journey correctly."
```

**Mock Career Timeline:**
```json
[
  { "company": "Anderson Hardware", "role": "Stock Clerk", "years": "1972-1974" },
  { "company": "Midwest Manufacturing", "role": "Floor Manager", "years": "1974-1983" },
  { "company": "Midwest Manufacturing", "role": "Operations Director", "years": "1983-1998" },
  { "company": "Hartfield Consulting", "role": "Senior Consultant", "years": "1998-2010" },
  { "company": "Retired", "role": "", "years": "2010-present" }
]
```

---

### 1.career.story — "A Career Story"

**Pattern:** IP-02 (Voice Conversation — Story)

**Prompt Options (user picks one):**
```
• "What's a moment from your career that changed how you think?"
• "What's the best advice a boss or colleague ever gave you?"
• "Tell me about a time you almost gave up at work but didn't."
```

---

### 1.education.capture — "Where You Learned"

**Pattern:** IP-01 (simplified — fewer prompts)

**AI Prompt:** "Tell me about your education — where did you go to school, from elementary all the way through?"

**Mock Data:**
```json
[
  { "school": "Lincoln Elementary", "level": "Elementary", "years": "1960-1966" },
  { "school": "Roosevelt Junior High", "level": "Middle", "years": "1966-1969" },
  { "school": "Washington High School", "level": "High School", "years": "1969-1972" },
  { "school": "State University", "level": "College", "years": "1972-1976" }
]
```

---

### 1.education.story — "A School Memory"

**Pattern:** IP-02

**Prompt:** "What's your strongest memory from school? Or — what level of school impacted you the most?"

---

### 1.values.roulette — "What Matters Most"

**Pattern:** IP-03 (variant="cardFlip")

**Question Pool (30+ — answer 5 to complete):**
```
• "What does success mean to you?"
• "When do you feel most at peace?"
• "What principle would you never compromise on?"
• "What did your parents teach you that you still carry?"
• "What's more important — being right or being kind?"
• "What does courage look like to you?"
• "How do you define a good life?"
• "What's one thing every young person should know?"
• "What role has faith or spirituality played in your life?"
• "What's the hardest lesson you've had to learn?"
[... 20+ more]
```

**Values Cloud Output:** AI extracts 5-8 key value words from answers (e.g., "Family," "Integrity," "Patience," "Faith," "Hard Work," "Kindness")

---

## Phase 2 Modules

### 2.chapters.define — "Define Your Chapters"

**Pattern:** IP-04 (Guided Prompt Selection with drag-and-drop)

**AI-Suggested Chapters (based on Foundation data):**
```json
[
  { "title": "Growing Up in Springfield", "period": "1955-1972", "context": "Based on your childhood friends and early education" },
  { "title": "College Years", "period": "1972-1976", "context": "State University — where you met Linda" },
  { "title": "Starting a Career", "period": "1976-1983", "context": "From Anderson Hardware to Midwest Manufacturing" },
  { "title": "Building a Family", "period": "1980-1995", "context": "Marriage, Sarah, Michael — the heart of your story" },
  { "title": "Rising at Midwest", "period": "1983-1998", "context": "Your 24 years at the company that shaped you" },
  { "title": "The Consulting Years", "period": "1998-2010", "context": "A new chapter with Hartfield" },
  { "title": "Retirement & Reflection", "period": "2010-present", "context": "Life after work — grandchildren, woodworking, wisdom" }
]
```

---

### 2.chapters.overview.[N] — "Chapter Overview"

**Pattern:** IP-02 (Voice Conversation — Story)

**AI Prompt (for "Building a Family" chapter):**
```
1. "Let's talk about building your family. Take me back to that time — when did it start, and what was it like?"
2. [After response] "It sounds like Linda was a big part of this chapter. How did your relationship change when Sarah was born?"
3. [After response] "What's the feeling you remember most from that period?"
4. [Sensing completeness] "Thank you. I think I have a good sense of this chapter. Here's what I captured."
```

**Bullet-Point Success Output:**
```
• Married Linda in 1980 after 4 years together
• Sarah born in 1982, Michael in 1985
• Family life centered around Sunday dinners and summer camping trips
• Key theme: learning to balance career ambition with being present
• Margaret (mother) was a huge help during early parenting years
```

---

### 2.chapters.deeper.[N] — "Go Deeper"

**Pattern:** IP-06 (AI-Curated Questions)

**Questions for "Building a Family":**
```
1. "You mentioned summer camping trips — can you take me to one specific trip? What happened?"
2. "You said balancing career and family was a struggle. Was there a moment where you had to choose?"
3. "What role did Linda play in holding things together during the busy years?"
4. "You haven't talked much about Michael as a young kid — what was he like?"
5. "Looking back, what would you do differently during this chapter?"
```

**Full Chapter Success Output:**
```
Building a Family (1980-1995)

In 1980, after four years of dating, I married Linda — the woman who...
[AI-generated biographical paragraph combining overview + deeper answers,
written in third person, ~200 words, warm but honest tone]
```

---

### 2.wisdom.quick — "Quick Wisdom Round"

**Pattern:** IP-03 (variant="slot")

**Prompts:**
```
"Success is..." / "Love is..." / "A good life is..." / "Discipline is..." /
"Forgiveness means..." / "Family is..." / "Friendship is..." / "Courage is..." /
"Growing old is..." / "Money is..." / "Work is..." / "Happiness is..." /
"Regret is..." / "The hardest thing is..." / "I wish I'd known..."
```

---

### 2.wisdom.lessons — "Lessons Learned"

**Pattern:** IP-03 + IP-06 (dual-axis: theme × experience)

**Themes:** Resilience, Love, Leadership, Patience, Sacrifice, Joy, Loss, Growth
**Experiences:** Pulled from user's chapters (Childhood, College, Career, Family, etc.)

**Example question:** "What did building your family teach you about sacrifice?"

---

### 2.wisdom.keys — "Keys to Life"

**Pattern:** IP-04 (select) → IP-02 (conversation per key)

**AI-Suggested Keys:**
```
1. "Family comes first" — based on your values and family stories
2. "Hard work opens doors" — based on your career journey
3. "Never stop learning" — based on your education and curiosity
4. "Be present" — based on your reflections about balance
5. "Kindness is never wasted" — based on your core values
```

---

### 2.memories.define + 2.memories.tell — "Greatest Memories"

**Pattern:** IP-04 (select) → IP-02 (deep story per moment)

**AI-Suggested Moments:**
```
• "Your wedding day with Linda"
• "When Sarah was born"
• "The summer camping trip of '89"
• "Getting promoted to Operations Director"
• "Your retirement party"
```

---

## Phase 3 Modules

### 3.letters.define + 3.letters.write

**Pattern:** IP-04 (select recipients) → IP-07 (write with AI assist)

**AI-Suggested Recipients:**
```
• Sarah (Daughter) — "Tell her what you're proud of"
• Michael (Son) — "The advice you want him to have"
• Linda (Wife) — "What she means to you"
• Grandchildren — "What you hope they'll know about you"
```

### 3.voice.record — "Leave a Message"

**Pattern:** IP-05 (pick recipient) → simple record → title → save

**AI Suggestions:**
```
• "Tell Sarah how proud you are of the woman she's become"
• "Leave a message for Michael for a hard day"
• "Record something for your grandchildren to hear on their graduation day"
• "Leave a message for anyone who needs to hear your voice"
```

### 3.memoir.conversation + 3.memoir.edit

**Pattern:** IP-02 (capstone conversation) → IP-07 (edit and refine)

**AI Prompts for "The Conversation":**
```
1. "Of all the roles you've played — father, husband, friend, worker — which one mattered most to you?"
2. "What qualities do you hope people think of when they think of you?"
3. "What do you want your family to know about what really mattered to you?"
4. "If you could sit down with your grandchildren in 50 years, what would you tell them?"
5. "How do you hope to be remembered?"
```

**Memoir Output:**
```
How I Hope to Be Remembered
By [Name]

[AI-generated memoir, ~500-800 words, first person, drawing on ALL data
from the entire app journey. Warm, honest, authentic to the user's voice.
This is the emotional capstone of the product.]
```
