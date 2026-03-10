// Node states for the TapRoot path
export type NodeState = 'locked' | 'suggested' | 'active' | 'complete';

// Phase identifiers
export type PhaseId = 1 | 2 | 3 | 4;

// Node identifiers matching ARCHITECTURE.md
export type NodeId = 
  | 'family' 
  | 'friends' 
  | 'favorites' 
  | 'career' 
  | 'education' 
  | 'values'
  | 'chapters' 
  | 'wisdom' 
  | 'letters' 
  | 'voiceMessages' 
  | 'memoir'
  | 'diveDeeper'
  | 'lifeUpdates'
  | 'familyCorner'
  | 'moreRounds'
  | 'chapterChildhood'
  | 'chapterSchool'
  | 'chapterCollege'
  | 'chapterEarlyCareer'
  | 'chapterLaterLife'
  | 'wisdomQuick'
  | 'wisdomLessons'
  | 'wisdomKeys';

// Section identifiers for horizontally paginated tap root
export type SectionId = 0 | 1 | 2 | 3;

export interface Section {
  id: SectionId;
  title: string;
  nodeIds: NodeId[];
  lockedMessage: string | null;
}

// Module ID format: Phase.Node.Module (e.g., "1.family.capture")
export type ModuleId = string;

// A phase containing multiple nodes
export interface Phase {
  id: PhaseId;
  name: string;
  description: string;
  nodes: NodeId[];
  unlockCondition: PhaseId | null; // null = unlocked by default
}

// A node on the TapRoot path
export interface Node {
  id: NodeId;
  name: string;
  phase: PhaseId;
  icon: string; // Lucide icon name
  color: string; // CSS color token
  modules: ModuleId[];
}

// A module within a node
export interface Module {
  id: ModuleId;
  nodeId: NodeId;
  name: string;
  description: string;
  pattern: string; // IP-01, IP-02, etc.
  isRequired: boolean;
}

// Node state data (runtime state)
export interface NodeStateData {
  nodeId: NodeId;
  state: NodeState;
  storyCount: number;
  completedModules: ModuleId[];
  lastActivity?: string; // ISO date
}

// Progress state for ProgressContext
export interface ProgressState {
  completedModules: ModuleId[];
  currentPhase: PhaseId;
  unlockedNodes: NodeId[];
  nodeStates: Record<NodeId, NodeStateData>;
  treeGrowth: number; // 0-100
  streak: number;
  totalMemories: number;
}

// Captured data types per module
export interface CapturedPerson {
  name: string;
  relationship: string;
  stories: number;
}

export interface CapturedCareer {
  company: string;
  role: string;
  years: string;
}

export interface CapturedEducation {
  school: string;
  level: string;
  years: string;
}

export interface CapturedData {
  moduleId: ModuleId;
  type: 'people' | 'career' | 'education' | 'favorites' | 'values' | 'chapters';
  data: CapturedPerson[] | CapturedCareer[] | CapturedEducation[] | Record<string, string>;
  capturedAt: string; // ISO date
}

// Story card output from story modules
export interface StoryCard {
  id: string;
  title: string;
  person?: string;
  relationship?: string;
  date: string;
  quote: string;
  themes: string[];
  category: NodeId;
  moduleId: ModuleId;
}

// Recording state machine
export type RecordingStatus = 'idle' | 'recording' | 'reviewing' | 'submitted';

// Voice conversation modes
export type ConversationMode = 'capture' | 'story';

// A single AI prompt step in a conversation flow
export interface PromptStep {
  role: 'ai';
  text: string;
  mockTranscription?: string;
}

// Module flow state (used by useModuleFlow hook)
export interface ModuleFlowState {
  moduleId: string;
  currentStep: number;
  totalSteps: number;
  responses: string[];
  isComplete: boolean;
}

// Validation table column definition
export interface ValidationColumn {
  key: string;
  label: string;
  editable?: boolean;
}

// Generic row for validation table
export type ValidationRow = Record<string, string>;

// Captured data store — keyed by moduleId
export type CapturedDataStore = Record<string, CapturedData>;
