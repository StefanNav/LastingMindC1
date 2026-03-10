export interface Prompt {
  id: string;
  category: string;
  question: string;
  emoji: string;
  color: string;
}

export interface Memory {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  emoji: string;
}

export interface CategoryMeta {
  id: string;
  name: string;
  emoji: string;
  color: string;
  suggested?: boolean;
}

export interface UserProgress {
  memoriesRecorded: number;
  totalPrompts: number;
  streakDays: number;
  growthPercentage: number;
}

// Per-module stats for display (e.g. "5 family members", "3 entries")
export interface ModuleStat {
  label: string;
  value: number;
}

// Node state data for TapRoot
export interface NodeStateData {
  nodeId: string;
  state: 'locked' | 'suggested' | 'active' | 'complete';
  storyCount: number;
  completedModules: string[];
  moduleStats?: Record<string, ModuleStat>;
}

export const prompts: Prompt[] = [
  {
    id: "p1",
    category: "Childhood",
    question: "What was your favorite game or toy growing up?",
    emoji: "🧸",
    color: "#E8C87A",
  },
  {
    id: "p2",
    category: "Family",
    question: "Describe a family tradition that meant the most to you.",
    emoji: "🏡",
    color: "#B5D1A5",
  },
  {
    id: "p3",
    category: "Love",
    question: "Tell the story of when you first fell in love.",
    emoji: "💌",
    color: "#E8B5A0",
  },
  {
    id: "p4",
    category: "Adventures",
    question: "What was the most spontaneous thing you ever did?",
    emoji: "🗺️",
    color: "#A5C4D1",
  },
  {
    id: "p5",
    category: "Wisdom",
    question: "What life lesson took you the longest to learn?",
    emoji: "🪶",
    color: "#D1C4A5",
  },
  {
    id: "p6",
    category: "Career",
    question: "Describe the moment you knew what you wanted to do with your life.",
    emoji: "💼",
    color: "#C4A5D1",
  },
  {
    id: "p7",
    category: "Milestones",
    question: "What accomplishment are you most proud of?",
    emoji: "🏆",
    color: "#E8D87A",
  },
  {
    id: "p8",
    category: "Daily Life",
    question: "Describe your perfect ordinary day.",
    emoji: "☀️",
    color: "#F0D9A5",
  },
];

export const categories: CategoryMeta[] = [
  { id: "family", name: "Family", emoji: "🏡", color: "#B5D1A5" },
  { id: "childhood", name: "Childhood", emoji: "🧸", color: "#E8C87A" },
  { id: "love", name: "Love", emoji: "💌", color: "#E8B5A0" },
  { id: "adventures", name: "Adventures", emoji: "🗺️", color: "#A5C4D1" },
  { id: "wisdom", name: "Wisdom", emoji: "🪶", color: "#D1C4A5" },
  { id: "career", name: "Career", emoji: "💼", color: "#C4A5D1", suggested: true },
  { id: "milestones", name: "Milestones", emoji: "🏆", color: "#E8D87A" },
  { id: "daily-life", name: "Daily Life", emoji: "☀️", color: "#F0D9A5", suggested: true },
];

export const memories: Memory[] = [
  // Family (4 entries)
  {
    id: "m2",
    title: "Grandma's Sunday Kitchen",
    excerpt:
      "Every Sunday, the house filled with the scent of cinnamon and baking bread. She never measured anything — just a pinch of this, a handful of that...",
    date: "February 28, 2024",
    category: "Family",
    emoji: "🍞",
  },
  {
    id: "m9",
    title: "Dad's Workshop",
    excerpt:
      "The sawdust hung in the air like golden snow. He'd let me hold the flashlight and I'd feel like the most important person in the world...",
    date: "February 20, 2024",
    category: "Family",
    emoji: "🪚",
  },
  {
    id: "m10",
    title: "Family Road Trips",
    excerpt:
      "Five of us crammed into the station wagon, fighting over the radio. Mom always packed too many sandwiches and Dad sang off-key the whole way...",
    date: "February 5, 2024",
    category: "Family",
    emoji: "🚗",
  },
  {
    id: "m11",
    title: "Letters from Mom",
    excerpt:
      "She wrote me one every week during college. I pretended it was embarrassing, but I kept every single one in a shoebox under my bed...",
    date: "January 30, 2024",
    category: "Family",
    emoji: "✉️",
  },

  // Childhood (3 entries)
  {
    id: "m1",
    title: "My First Day at School",
    excerpt:
      "The bell rang and I clutched my oversized backpack, standing at the gate while Mom waved. Everything smelled like fresh paint and crayons...",
    date: "March 15, 2024",
    category: "Childhood",
    emoji: "🎒",
  },
  {
    id: "m12",
    title: "The Treehouse Summer",
    excerpt:
      "We built it from scrap wood and stolen nails. It leaned dangerously to the left but we didn't care — it was ours, a kingdom in the oaks...",
    date: "March 2, 2024",
    category: "Childhood",
    emoji: "🌳",
  },
  {
    id: "m13",
    title: "Catching Fireflies",
    excerpt:
      "The jar glowed in my hands like a tiny lantern. We'd count them, make wishes, then let them go — watching the yard light up again...",
    date: "February 14, 2024",
    category: "Childhood",
    emoji: "✨",
  },

  // Love (3 entries)
  {
    id: "m3",
    title: "Our Wedding Day",
    excerpt:
      "The sun broke through the clouds just as we said our vows. I remember looking out at all those faces and thinking — this is it, this is everything...",
    date: "February 10, 2024",
    category: "Love",
    emoji: "💍",
  },
  {
    id: "m14",
    title: "The First Date",
    excerpt:
      "We sat at that tiny Italian place until they turned the lights off. Three hours felt like thirty minutes. I knew walking home that night...",
    date: "January 28, 2024",
    category: "Love",
    emoji: "🍝",
  },
  {
    id: "m15",
    title: "Dancing in the Kitchen",
    excerpt:
      "No music, just the hum of the refrigerator. She grabbed my hand while the pasta boiled over and we swayed anyway, laughing at nothing...",
    date: "January 15, 2024",
    category: "Love",
    emoji: "💃",
  },

  // Adventures (3 entries)
  {
    id: "m4",
    title: "Road Trip Through Big Sur",
    excerpt:
      "We had no plan, just a full tank and the Pacific stretching out to the horizon. That night we slept under more stars than I'd ever seen...",
    date: "January 25, 2024",
    category: "Adventures",
    emoji: "🌊",
  },
  {
    id: "m16",
    title: "Lost in Tokyo",
    excerpt:
      "The map was useless and my phone was dead. I wandered into a tiny ramen shop where nobody spoke English and had the best meal of my life...",
    date: "January 10, 2024",
    category: "Adventures",
    emoji: "🍜",
  },
  {
    id: "m17",
    title: "Sunrise at Machu Picchu",
    excerpt:
      "We hiked through the dark, headlamps bobbing. Then the fog lifted and there it was — ancient and impossible, floating above the clouds...",
    date: "December 22, 2023",
    category: "Adventures",
    emoji: "🏔️",
  },

  // Wisdom (2 entries)
  {
    id: "m6",
    title: "Learning to Let Go",
    excerpt:
      "It took me thirty years to understand that holding on wasn't strength. Sometimes the bravest thing you do is open your hands...",
    date: "December 30, 2023",
    category: "Wisdom",
    emoji: "🕊️",
  },
  {
    id: "m18",
    title: "What Grandpa Told Me",
    excerpt:
      "He said the secret to a good life was simple: show up, pay attention, and be kind. I didn't understand until I was forty...",
    date: "December 8, 2023",
    category: "Wisdom",
    emoji: "🪴",
  },

  // Milestones (2 entries)
  {
    id: "m5",
    title: "The Day I Became a Parent",
    excerpt:
      "Nothing prepares you for that first cry. The room went quiet, then erupted. I held this tiny person and the whole world shifted on its axis...",
    date: "January 12, 2024",
    category: "Milestones",
    emoji: "👶",
  },
  {
    id: "m19",
    title: "Graduation Day",
    excerpt:
      "The cap didn't fit and the gown was too long. But when they called my name, I saw Dad in the third row, tears streaming, clapping hardest of all...",
    date: "November 20, 2023",
    category: "Milestones",
    emoji: "🎓",
  },
];

export const userProgress: UserProgress = {
  memoriesRecorded: 17,
  totalPrompts: 50,
  streakDays: 12,
  growthPercentage: 65,
};

// Node states for TapRoot - demo data showing progress through Phase 1
export const nodeStates: NodeStateData[] = [
  // Phase 1 - Foundation
  {
    nodeId: 'family',
    state: 'complete',
    storyCount: 4,
    completedModules: ['1.family.capture', '1.family.story'],
    moduleStats: {
      '1.family.capture': { label: 'family members', value: 5 },
      '1.family.story': { label: 'entries', value: 3 },
    },
  },
  {
    nodeId: 'friends',
    state: 'complete',
    storyCount: 3,
    completedModules: ['1.friends.capture', '1.friends.story'],
  },
  {
    nodeId: 'favorites',
    state: 'complete',
    storyCount: 10,
    completedModules: ['1.favorites.spin'],
  },
  {
    nodeId: 'career',
    state: 'active',
    storyCount: 1,
    completedModules: ['1.career.capture'],
  },
  {
    nodeId: 'education',
    state: 'suggested',
    storyCount: 0,
    completedModules: [],
  },
  {
    nodeId: 'values',
    state: 'suggested',
    storyCount: 0,
    completedModules: [],
  },
  // Phase 2 - Life Story (all locked for now)
  {
    nodeId: 'chapters',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  {
    nodeId: 'wisdom',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  {
    nodeId: 'memories',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  // Phase 3 - Personal (all locked)
  {
    nodeId: 'letters',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  {
    nodeId: 'voiceMessages',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  {
    nodeId: 'memoir',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  // Demo chapter nodes (locked until Phase 1 complete)
  {
    nodeId: 'chapterChildhood',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  {
    nodeId: 'chapterSchool',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  {
    nodeId: 'chapterCollege',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  {
    nodeId: 'chapterEarlyCareer',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  {
    nodeId: 'chapterLaterLife',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  // Promoted wisdom nodes (locked until Phase 1 complete)
  {
    nodeId: 'wisdomQuick',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  {
    nodeId: 'wisdomLessons',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
  {
    nodeId: 'wisdomKeys',
    state: 'locked',
    storyCount: 0,
    completedModules: [],
  },
];
