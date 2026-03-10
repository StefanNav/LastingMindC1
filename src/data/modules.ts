import type { Phase, Node, Module, PhaseId, NodeId, Section } from '@/types';

// Phase definitions
export const phases: Phase[] = [
  {
    id: 1,
    name: 'Foundation',
    description: 'Capture who you are — family, friends, career, education, favorites, values',
    nodes: ['family', 'friends', 'favorites', 'career', 'education', 'values'],
    unlockCondition: null,
  },
  {
    id: 2,
    name: 'Life Story',
    description: 'Tell your life chapters and wisdom',
    nodes: ['chapters', 'wisdom'],
    unlockCondition: 1,
  },
  {
    id: 3,
    name: 'Personal',
    description: 'Letters, voice messages, and your memoir',
    nodes: ['letters', 'voiceMessages', 'memoir'],
    unlockCondition: 2,
  },
  {
    id: 4,
    name: 'Keep Growing',
    description: 'Dive deeper, capture the present, connect with family, play again',
    nodes: ['diveDeeper', 'lifeUpdates', 'familyCorner', 'moreRounds'],
    unlockCondition: 3,
  },
];

// Node definitions with icons from Lucide
export const nodes: Record<NodeId, Node> = {
  family: {
    id: 'family',
    name: 'Family',
    phase: 1,
    icon: 'Users',
    color: 'var(--color-node-family)',
    modules: ['1.family.capture', '1.family.story'],
  },
  friends: {
    id: 'friends',
    name: 'Friends',
    phase: 1,
    icon: 'Heart',
    color: 'var(--color-node-friends)',
    modules: ['1.friends.capture', '1.friends.story'],
  },
  favorites: {
    id: 'favorites',
    name: 'Favorites',
    phase: 1,
    icon: 'Star',
    color: 'var(--color-node-favorites)',
    modules: ['1.favorites.spin'],
  },
  career: {
    id: 'career',
    name: 'Career',
    phase: 1,
    icon: 'Briefcase',
    color: 'var(--color-node-career)',
    modules: ['1.career.capture', '1.career.story'],
  },
  education: {
    id: 'education',
    name: 'Education',
    phase: 1,
    icon: 'GraduationCap',
    color: 'var(--color-node-education)',
    modules: ['1.education.capture', '1.education.story'],
  },
  values: {
    id: 'values',
    name: 'Core Values',
    phase: 1,
    icon: 'Compass',
    color: 'var(--color-node-values)',
    modules: ['1.values.roulette'],
  },
  chapters: {
    id: 'chapters',
    name: 'Life Chapters',
    phase: 2,
    icon: 'BookOpen',
    color: 'var(--color-node-chapters)',
    modules: ['2.chapters.define', '2.chapters.overview', '2.chapters.deeper'],
  },
  wisdom: {
    id: 'wisdom',
    name: 'Wisdom & Advice',
    phase: 2,
    icon: 'Lightbulb',
    color: 'var(--color-node-wisdom)',
    modules: ['2.wisdom.quick', '2.wisdom.lessons', '2.wisdom.keys'],
  },
  letters: {
    id: 'letters',
    name: 'Letters to Loved Ones',
    phase: 3,
    icon: 'Mail',
    color: 'var(--color-node-letters)',
    modules: ['3.letters.define', '3.letters.write'],
  },
  voiceMessages: {
    id: 'voiceMessages',
    name: 'Voice Messages',
    phase: 3,
    icon: 'MessageCircle',
    color: 'var(--color-node-voice)',
    modules: ['3.voice.record'],
  },
  memoir: {
    id: 'memoir',
    name: 'How I Hope to be Remembered',
    phase: 3,
    icon: 'FileText',
    color: 'var(--color-node-memoir)',
    modules: ['3.memoir.conversation', '3.memoir.edit'],
  },
  diveDeeper: {
    id: 'diveDeeper',
    name: 'Dive Deeper',
    phase: 4,
    icon: 'SearchCheck',
    color: 'var(--color-sage)',
    modules: ['4.diveDeeper.aiPrompts', '4.diveDeeper.revisit'],
  },
  lifeUpdates: {
    id: 'lifeUpdates',
    name: 'Life Updates',
    phase: 4,
    icon: 'CalendarHeart',
    color: 'var(--color-sage)',
    modules: ['4.lifeUpdates.monthlyCheckIn', '4.lifeUpdates.seasonal', '4.lifeUpdates.freeform'],
  },
  familyCorner: {
    id: 'familyCorner',
    name: 'Family Corner',
    phase: 4,
    icon: 'MessageCircleHeart',
    color: 'var(--color-sage)',
    modules: ['4.familyCorner.answerQuestions', '4.familyCorner.sendPrompt', '4.familyCorner.liveConversation'],
  },
  moreRounds: {
    id: 'moreRounds',
    name: 'More Rounds',
    phase: 4,
    icon: 'RefreshCw',
    color: 'var(--color-sage)',
    modules: ['4.moreRounds.newFavorites', '4.moreRounds.newWisdom', '4.moreRounds.newLetters'],
  },

  // Demo chapter nodes (defaults for Your Life Story section)
  chapterChildhood: {
    id: 'chapterChildhood',
    name: 'Childhood',
    phase: 2,
    icon: 'Baby',
    color: 'var(--color-amber-light)',
    modules: ['2.chapter.childhood'],
  },
  chapterSchool: {
    id: 'chapterSchool',
    name: 'Middle & High School',
    phase: 2,
    icon: 'School',
    color: 'var(--color-amber-light)',
    modules: ['2.chapter.school'],
  },
  chapterCollege: {
    id: 'chapterCollege',
    name: 'College Years',
    phase: 2,
    icon: 'GraduationCap',
    color: 'var(--color-amber-light)',
    modules: ['2.chapter.college'],
  },
  chapterEarlyCareer: {
    id: 'chapterEarlyCareer',
    name: 'Early Career',
    phase: 2,
    icon: 'Rocket',
    color: 'var(--color-amber-light)',
    modules: ['2.chapter.earlyCareer'],
  },
  chapterLaterLife: {
    id: 'chapterLaterLife',
    name: 'Later Life',
    phase: 2,
    icon: 'Sunset',
    color: 'var(--color-amber-light)',
    modules: ['2.chapter.laterLife'],
  },

  // Promoted wisdom nodes (each was a sub-module of the old wisdom node)
  wisdomQuick: {
    id: 'wisdomQuick',
    name: 'Quick Wisdom Round',
    phase: 2,
    icon: 'Zap',
    color: 'var(--color-node-wisdom)',
    modules: ['2.wisdom.quick'],
  },
  wisdomLessons: {
    id: 'wisdomLessons',
    name: 'Lessons Learned',
    phase: 2,
    icon: 'Lightbulb',
    color: 'var(--color-node-wisdom)',
    modules: ['2.wisdom.lessons'],
  },
  wisdomKeys: {
    id: 'wisdomKeys',
    name: 'Keys to Life',
    phase: 2,
    icon: 'Key',
    color: 'var(--color-node-wisdom)',
    modules: ['2.wisdom.keys'],
  },
};

// Module definitions
export const modules: Record<string, Module> = {
  // Phase 1: Family
  '1.family.capture': {
    id: '1.family.capture',
    nodeId: 'family',
    name: "Who's in Your Family",
    description: 'Tell us about the people closest to you',
    pattern: 'IP-01',
    isRequired: true,
  },
  '1.family.story': {
    id: '1.family.story',
    nodeId: 'family',
    name: 'Tell Us About Someone',
    description: 'Share a story about a family member',
    pattern: 'IP-05+IP-02',
    isRequired: false,
  },

  // Phase 1: Friends
  '1.friends.capture': {
    id: '1.friends.capture',
    nodeId: 'friends',
    name: 'Your Circle',
    description: 'Tell us about your friends through the years',
    pattern: 'IP-01',
    isRequired: true,
  },
  '1.friends.story': {
    id: '1.friends.story',
    nodeId: 'friends',
    name: 'A Friend Story',
    description: 'Share a story about a friend',
    pattern: 'IP-05+IP-02',
    isRequired: false,
  },

  // Phase 1: Favorites
  '1.favorites.spin': {
    id: '1.favorites.spin',
    nodeId: 'favorites',
    name: 'Spin the Wheel',
    description: 'Discover your favorites through a fun game',
    pattern: 'IP-03',
    isRequired: true,
  },

  // Phase 1: Career
  '1.career.capture': {
    id: '1.career.capture',
    nodeId: 'career',
    name: 'Your Career Journey',
    description: 'Walk through your professional life',
    pattern: 'IP-01',
    isRequired: true,
  },
  '1.career.story': {
    id: '1.career.story',
    nodeId: 'career',
    name: 'A Career Story',
    description: 'Share a meaningful moment from your career',
    pattern: 'IP-02',
    isRequired: false,
  },

  // Phase 1: Education
  '1.education.capture': {
    id: '1.education.capture',
    nodeId: 'education',
    name: 'Where You Learned',
    description: 'Tell us about your education',
    pattern: 'IP-01',
    isRequired: true,
  },
  '1.education.story': {
    id: '1.education.story',
    nodeId: 'education',
    name: 'A School Memory',
    description: 'Share a memory from your school days',
    pattern: 'IP-02',
    isRequired: false,
  },

  // Phase 1: Values
  '1.values.roulette': {
    id: '1.values.roulette',
    nodeId: 'values',
    name: 'What Matters Most',
    description: 'Explore your core values',
    pattern: 'IP-03',
    isRequired: true,
  },

  // Phase 2: Chapters
  '2.chapters.define': {
    id: '2.chapters.define',
    nodeId: 'chapters',
    name: 'Define Your Chapters',
    description: 'Organize your life into meaningful chapters',
    pattern: 'IP-04',
    isRequired: true,
  },
  '2.chapters.overview': {
    id: '2.chapters.overview',
    nodeId: 'chapters',
    name: 'Chapter Overview',
    description: 'Tell the story of each chapter',
    pattern: 'IP-02',
    isRequired: true,
  },
  '2.chapters.deeper': {
    id: '2.chapters.deeper',
    nodeId: 'chapters',
    name: 'Go Deeper',
    description: 'Answer AI-curated questions about your chapters',
    pattern: 'IP-06',
    isRequired: false,
  },

  // Phase 2: Wisdom
  '2.wisdom.quick': {
    id: '2.wisdom.quick',
    nodeId: 'wisdom',
    name: 'Quick Wisdom Round',
    description: 'Share quick wisdom on life topics',
    pattern: 'IP-03',
    isRequired: true,
  },
  '2.wisdom.lessons': {
    id: '2.wisdom.lessons',
    nodeId: 'wisdom',
    name: 'Lessons Learned',
    description: 'Reflect on lessons from your experiences',
    pattern: 'IP-03+IP-06',
    isRequired: false,
  },
  '2.wisdom.keys': {
    id: '2.wisdom.keys',
    nodeId: 'wisdom',
    name: 'Keys to Life',
    description: 'Share your most important life principles',
    pattern: 'IP-04+IP-02',
    isRequired: false,
  },

  // Phase 3: Letters
  '3.letters.define': {
    id: '3.letters.define',
    nodeId: 'letters',
    name: 'Who Do You Want to Write To',
    description: 'Choose recipients for your letters',
    pattern: 'IP-04',
    isRequired: true,
  },
  '3.letters.write': {
    id: '3.letters.write',
    nodeId: 'letters',
    name: 'Write Your Letters',
    description: 'Write heartfelt letters with AI assistance',
    pattern: 'IP-07',
    isRequired: true,
  },

  // Phase 3: Voice Messages
  '3.voice.record': {
    id: '3.voice.record',
    nodeId: 'voiceMessages',
    name: 'Leave a Message',
    description: 'Record voice messages for loved ones',
    pattern: 'IP-05+record',
    isRequired: true,
  },

  // Phase 3: Memoir
  '3.memoir.conversation': {
    id: '3.memoir.conversation',
    nodeId: 'memoir',
    name: 'The Conversation',
    description: 'A deep conversation about your legacy',
    pattern: 'IP-02',
    isRequired: true,
  },
  '3.memoir.edit': {
    id: '3.memoir.edit',
    nodeId: 'memoir',
    name: 'Edit & Refine',
    description: 'Polish your memoir with AI assistance',
    pattern: 'IP-07',
    isRequired: true,
  },

  // Demo chapter modules
  '2.chapter.childhood': {
    id: '2.chapter.childhood',
    nodeId: 'chapterChildhood',
    name: 'Your Childhood',
    description: 'Tell the story of your earliest years',
    pattern: 'IP-02',
    isRequired: true,
  },
  '2.chapter.school': {
    id: '2.chapter.school',
    nodeId: 'chapterSchool',
    name: 'School Days',
    description: 'Share memories from middle and high school',
    pattern: 'IP-02',
    isRequired: true,
  },
  '2.chapter.college': {
    id: '2.chapter.college',
    nodeId: 'chapterCollege',
    name: 'College Years',
    description: 'Revisit your college experience',
    pattern: 'IP-02',
    isRequired: true,
  },
  '2.chapter.earlyCareer': {
    id: '2.chapter.earlyCareer',
    nodeId: 'chapterEarlyCareer',
    name: 'Starting Out',
    description: 'Share how your career began',
    pattern: 'IP-02',
    isRequired: true,
  },
  '2.chapter.laterLife': {
    id: '2.chapter.laterLife',
    nodeId: 'chapterLaterLife',
    name: 'Later Chapters',
    description: 'Reflect on your more recent years',
    pattern: 'IP-02',
    isRequired: true,
  },

  // Phase 4: Keep Growing — Dive Deeper
  '4.diveDeeper.aiPrompts': {
    id: '4.diveDeeper.aiPrompts',
    nodeId: 'diveDeeper',
    name: 'AI-Suggested Prompts',
    description: 'AI finds gaps in your story and asks targeted questions',
    pattern: 'IP-06',
    isRequired: false,
  },
  '4.diveDeeper.revisit': {
    id: '4.diveDeeper.revisit',
    nodeId: 'diveDeeper',
    name: 'Revisit a Topic',
    description: 'Choose any previous node and get fresh questions',
    pattern: 'IP-06',
    isRequired: false,
  },

  // Phase 4: Keep Growing — Life Updates
  '4.lifeUpdates.monthlyCheckIn': {
    id: '4.lifeUpdates.monthlyCheckIn',
    nodeId: 'lifeUpdates',
    name: 'Monthly Check-In',
    description: "What's been on your mind this month?",
    pattern: 'IP-02',
    isRequired: false,
  },
  '4.lifeUpdates.seasonal': {
    id: '4.lifeUpdates.seasonal',
    nodeId: 'lifeUpdates',
    name: 'Seasonal Prompts',
    description: 'Holiday traditions, birthday reflections, anniversary prompts',
    pattern: 'IP-06',
    isRequired: false,
  },
  '4.lifeUpdates.freeform': {
    id: '4.lifeUpdates.freeform',
    nodeId: 'lifeUpdates',
    name: 'Freeform Journal',
    description: 'Just talk. AI files it into the right branch.',
    pattern: 'IP-10',
    isRequired: false,
  },

  // Phase 4: Keep Growing — Family Corner
  '4.familyCorner.answerQuestions': {
    id: '4.familyCorner.answerQuestions',
    nodeId: 'familyCorner',
    name: 'Answer Family Questions',
    description: 'Sarah asked: What was it like when I was born?',
    pattern: 'IP-09',
    isRequired: false,
  },
  '4.familyCorner.sendPrompt': {
    id: '4.familyCorner.sendPrompt',
    nodeId: 'familyCorner',
    name: 'Send a Prompt',
    description: 'Nudge a family member to send you a question',
    pattern: 'IP-09',
    isRequired: false,
  },
  '4.familyCorner.liveConversation': {
    id: '4.familyCorner.liveConversation',
    nodeId: 'familyCorner',
    name: 'Live Conversation',
    description: 'Capture a real-time conversation',
    pattern: 'IP-05+record',
    isRequired: false,
  },

  // Phase 4: Keep Growing — More Rounds
  '4.moreRounds.newFavorites': {
    id: '4.moreRounds.newFavorites',
    nodeId: 'moreRounds',
    name: 'New Favorites',
    description: 'Spin the wheel with fresh categories',
    pattern: 'IP-03',
    isRequired: false,
  },
  '4.moreRounds.newWisdom': {
    id: '4.moreRounds.newWisdom',
    nodeId: 'moreRounds',
    name: 'New Wisdom',
    description: 'Quick wisdom rounds with new prompts',
    pattern: 'IP-03',
    isRequired: false,
  },
  '4.moreRounds.newLetters': {
    id: '4.moreRounds.newLetters',
    nodeId: 'moreRounds',
    name: 'New Letters & Messages',
    description: 'Write more letters or record more voice messages',
    pattern: 'IP-07',
    isRequired: false,
  },
};

// Helper functions
export function getPhaseById(id: PhaseId): Phase | undefined {
  return phases.find((p) => p.id === id);
}

export function getNodeById(id: NodeId): Node | undefined {
  return nodes[id];
}

export function getModuleById(id: string): Module | undefined {
  return modules[id];
}

export function getNodesForPhase(phaseId: PhaseId): Node[] {
  const phase = getPhaseById(phaseId);
  if (!phase) return [];
  return phase.nodes.map((nodeId) => nodes[nodeId]).filter(Boolean);
}

export function getModulesForNode(nodeId: NodeId): Module[] {
  const node = nodes[nodeId];
  if (!node) return [];
  return node.modules.map((modId) => modules[modId]).filter(Boolean);
}

// Section definitions for horizontally paginated tap root
export const sections: Section[] = [
  {
    id: 0,
    title: 'Your Foundation',
    nodeIds: ['family', 'friends', 'favorites', 'career', 'education', 'values'],
    lockedMessage: null,
  },
  {
    id: 1,
    title: 'Your Life Story',
    nodeIds: ['chapterChildhood', 'chapterSchool', 'chapterCollege', 'chapterEarlyCareer', 'chapterLaterLife'],
    lockedMessage: 'Complete Your Foundation to unlock your life story. Once I know who matters most to you, we can start capturing the moments that shaped your life.',
  },
  {
    id: 2,
    title: 'Your Legacy',
    nodeIds: ['wisdom', 'letters', 'voiceMessages', 'memoir'],
    lockedMessage: 'Complete Your Foundation to unlock this section. Your legacy — wisdom, letters, voice messages, and how you hope to be remembered — will be shaped by everything you\'ve shared.',
  },
  {
    id: 3,
    title: 'Keep Growing',
    nodeIds: ['diveDeeper', 'lifeUpdates', 'familyCorner', 'moreRounds'],
    lockedMessage: 'Complete Your Legacy to unlock this section. Keep your story growing with new prompts, life updates, family questions, and more rounds.',
  },
];
