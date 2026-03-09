"use client";

import { motion } from "framer-motion";
import { transitions } from "@/lib/animations";
import type { StoryCard as StoryCardType, NodeId } from "@/types";

// Category color map matching DESIGN_TOKENS
const categoryColors: Record<string, string> = {
  family: "#E8D5C4",
  friends: "#D4E8D4",
  favorites: "#F5E6CC",
  career: "#D4D8E8",
  education: "#E8D4E8",
  values: "#E8E4D4",
  chapters: "#D4E4E8",
  wisdom: "#E8DDD4",
  memories: "#F0E4D4",
  letters: "#D4E8E0",
  memoir: "#E8E0D4",
};

interface StoryCardProps {
  card: StoryCardType;
  index?: number;
  compact?: boolean;
}

export default function StoryCardComponent({
  card,
  index = 0,
  compact = false,
}: StoryCardProps) {
  const borderColor = categoryColors[card.category] || "#E8D5C4";

  return (
    <motion.div
      className={`
        bg-warm-white rounded-xl border border-bark-muted/8 shadow-md overflow-hidden
        ${compact ? "p-4" : "p-5"}
      `}
      style={{ borderLeft: `4px solid ${borderColor}` }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, ...transitions.cardReveal }}
    >
      {/* Title */}
      <h4 className={`font-display text-bark leading-snug mb-1 ${compact ? "text-lg" : "text-xl"}`}>
        {card.title}
      </h4>

      {/* Person & relationship */}
      {(card.person || card.relationship) && (
        <p className="text-sm text-bark-muted mb-2.5">
          {card.person}
          {card.relationship && (
            <span className="text-bark-muted/60"> · {card.relationship}</span>
          )}
        </p>
      )}

      {/* Quote */}
      {card.quote && (
        <p className={`italic text-bark leading-relaxed mb-3 ${compact ? "text-sm" : "text-base"}`}>
          &ldquo;{card.quote}&rdquo;
        </p>
      )}

      {/* Theme tags */}
      {card.themes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {card.themes.map((theme) => (
            <span
              key={theme}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
              style={{
                backgroundColor: `${borderColor}40`,
                color: "#3A2A1C",
              }}
            >
              {theme}
            </span>
          ))}
        </div>
      )}

      {/* Date */}
      <p className="text-xs text-bark-muted/60">{card.date}</p>
    </motion.div>
  );
}

// "Future question" preview that shows after a story is told
interface FutureQuestionPreviewProps {
  question: string;
  aiResponse: string;
}

export function FutureQuestionPreview({
  question,
  aiResponse,
}: FutureQuestionPreviewProps) {
  return (
    <motion.div
      className="bg-amber-light/20 rounded-xl p-5 border border-amber-light/40"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, ...transitions.gentle }}
    >
      <p className="text-sm font-semibold text-bark mb-2">
        💬 One day, your great-grandchild might ask:
      </p>
      <p className="font-display text-base text-bark mb-3">
        &ldquo;{question}&rdquo;
      </p>
      <div className="pl-3 border-l-2 border-amber/40">
        <p className="text-sm text-bark-muted italic leading-relaxed">
          Your AI would answer: &ldquo;{aiResponse}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}
