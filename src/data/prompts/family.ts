import type { PromptStep, ValidationColumn, ValidationRow, StoryCard } from "@/types";

// ── Family Capture Flow (IP-01) ──
// AI prompts walk through relationship categories to capture family members.

export const familyCapturePrompts: PromptStep[] = [
  {
    role: "ai",
    text: "I'd love to hear about the people who matter most in your life. Who comes to mind first?",
    mockTranscription:
      "Well, my wife Linda — we've been married 44 years this June. She's my best friend.",
  },
  {
    role: "ai",
    text: "Linda — 44 years, that's a beautiful thing. Tell me, do you two have children?",
    mockTranscription:
      "Yes, I have two kids — Sarah and Michael. Sarah is my oldest, she's 38 now. Michael is 35.",
  },
  {
    role: "ai",
    text: "Sarah and Michael — I can tell they mean the world to you. What about your parents? Would you like to include them?",
    mockTranscription:
      "My parents are Robert and Margaret. Dad passed about ten years ago, but Mom is still going strong at 87.",
  },
  {
    role: "ai",
    text: "Robert and Margaret — thank you for sharing that. It sounds like they both played a big role in your life. Do you have any siblings?",
    mockTranscription:
      "I have a brother, Tom. He's two years younger than me. We grew up doing everything together.",
  },
  {
    role: "ai",
    text: "Tom sounds like he was a big part of growing up. Any grandparents you'd like to include?",
    mockTranscription:
      "My grandmother Helen on my mother's side. She was a big part of my childhood.",
  },
  {
    role: "ai",
    text: "Helen sounds like someone special. Is there anyone else who feels like family? Sometimes it's an aunt, a cousin, or a close friend who's always been there.",
    mockTranscription:
      "I think that covers the main people. Those are the ones who really shaped my life.",
  },
  {
    role: "ai",
    text: "What a wonderful family, Stefan. Let me put everyone together so you can make sure I got it right.",
    mockTranscription: "",
  },
];

export const familyCaptureColumns: ValidationColumn[] = [
  { key: "name", label: "Name", editable: true },
  { key: "relationship", label: "Relationship", editable: true },
];

export const familyMockCapturedData: ValidationRow[] = [
  { name: "Sarah", relationship: "Daughter" },
  { name: "Michael", relationship: "Son" },
  { name: "Linda", relationship: "Wife" },
  { name: "Robert", relationship: "Father" },
  { name: "Margaret", relationship: "Mother" },
  { name: "Tom", relationship: "Brother" },
  { name: "Helen", relationship: "Grandmother (maternal)" },
];

// ── Family Story Flow (IP-02) ──
// User picks a person then tells a story about them.

export const familyStoryPrompts: PromptStep[] = [
  {
    role: "ai",
    text: "Tell me a story about Margaret. Something that comes to mind when you think of her.",
    mockTranscription:
      "Every Sunday, Mom would make this huge dinner. The whole family would come. She always said the secret ingredient was having everyone together. The house smelled like garlic and fresh bread. Those are some of my favorite memories.",
  },
  {
    role: "ai",
    text: "That's a beautiful memory. What do you think Margaret would say about that moment if she could hear you tell it?",
    mockTranscription:
      "She'd probably laugh and say I'm being too sentimental. But then she'd tear up a little. That's just how she is — tough on the outside, all heart on the inside.",
  },
];

export const familyMockStoryCard: StoryCard = {
  id: "story-family-001",
  title: "Mom's Sunday Dinners",
  person: "Margaret",
  relationship: "Mother",
  date: "March 2026",
  quote:
    "She always said the secret ingredient was having everyone together.",
  themes: ["family bond", "tradition", "love"],
  category: "family",
  moduleId: "1.family.story",
};

export const familyFutureQuestion =
  "What was Grandma Margaret like?";

export const familyFutureAnswer =
  "Your great-grandmother Margaret was the heart of the family. She was known for her Sunday dinners — she always said the secret ingredient was having everyone together. She had a warmth that made everyone feel at home, even though she liked to pretend she was tough. Her kitchen was where the family gathered, and those meals were some of the most treasured memories of everyone who knew her.";
