"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { modules, nodes } from "@/data/modules";
import { useProgress } from "@/contexts/ProgressContext";
import VoiceConversation from "@/components/core/VoiceConversation";
import { transitions } from "@/lib/animations";
import type { NodeId, ValidationRow, StoryCard } from "@/types";

// Prompt data imports
import {
  familyCapturePrompts,
  familyCaptureColumns,
  familyMockCapturedData,
  familyStoryPrompts,
  familyMockStoryCard,
  familyFutureQuestion,
  familyFutureAnswer,
} from "@/data/prompts/family";

// ── Prompt data registry keyed by moduleId ──
// Other modules will be added as their prompt data is created.
const modulePromptData: Record<string, {
  mode: "capture" | "story";
  prompts: { role: "ai"; text: string; mockTranscription?: string }[];
  // capture-specific
  validationColumns?: { key: string; label: string; editable?: boolean }[];
  mockCapturedData?: Record<string, string>[];
  // story-specific
  storyCard?: StoryCard;
  futureQuestion?: string;
  futureAnswer?: string;
}> = {
  "1.family.capture": {
    mode: "capture",
    prompts: familyCapturePrompts,
    validationColumns: familyCaptureColumns,
    mockCapturedData: familyMockCapturedData,
  },
  "1.family.story": {
    mode: "story",
    prompts: familyStoryPrompts,
    storyCard: familyMockStoryCard,
    futureQuestion: familyFutureQuestion,
    futureAnswer: familyFutureAnswer,
  },
};

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  const { completeModule, incrementStoryCount } = useProgress();

  const mod = modules[moduleId];

  if (!mod) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment">
        <p className="text-bark-muted">Module not found</p>
      </div>
    );
  }

  const node = nodes[mod.nodeId];
  const promptData = modulePromptData[moduleId];

  // Determine if we can render a full voice conversation or a placeholder
  const hasVoiceConversation =
    promptData && (mod.pattern.startsWith("IP-01") || mod.pattern.startsWith("IP-02") || mod.pattern.startsWith("IP-05"));

  const handleCaptureComplete = useCallback(
    (data: ValidationRow[]) => {
      completeModule(moduleId);
      // Navigate to hub after a brief celebration
      setTimeout(() => {
        router.push(`/hub/${mod.nodeId}`);
      }, 1800);
    },
    [completeModule, moduleId, mod.nodeId, router]
  );

  const handleStoryComplete = useCallback(
    (card: StoryCard) => {
      completeModule(moduleId);
      incrementStoryCount(mod.nodeId as NodeId);
      setTimeout(() => {
        router.push(`/hub/${mod.nodeId}`);
      }, 1800);
    },
    [completeModule, incrementStoryCount, moduleId, mod.nodeId, router]
  );

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md bg-parchment/80 border-b border-bark-muted/8"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={transitions.default}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between px-5 py-3.5">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-bark-muted hover:text-bark transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <h1 className="font-display text-lg text-bark">{mod.name}</h1>

          <div className="w-16" />
        </div>
      </motion.header>

      <main className="max-w-2xl mx-auto py-8">
        {hasVoiceConversation && promptData ? (
          /* ── Voice Conversation (capture or story) ── */
          promptData.mode === "capture" ? (
            <VoiceConversation
              mode="capture"
              prompts={promptData.prompts}
              moduleId={moduleId}
              nodeId={mod.nodeId as NodeId}
              validationColumns={promptData.validationColumns!}
              mockCapturedData={promptData.mockCapturedData!}
              onComplete={handleCaptureComplete}
            />
          ) : (
            <VoiceConversation
              mode="story"
              prompts={promptData.prompts}
              moduleId={moduleId}
              nodeId={mod.nodeId as NodeId}
              storyCard={promptData.storyCard!}
              futureQuestion={promptData.futureQuestion}
              futureAnswer={promptData.futureAnswer}
              onComplete={handleStoryComplete}
            />
          )
        ) : (
          /* ── Placeholder for patterns not yet implemented ── */
          <PlaceholderModule
            moduleName={mod.name}
            description={mod.description}
            pattern={mod.pattern}
            nodeName={node?.name || ""}
            onBack={() => router.back()}
          />
        )}
      </main>
    </div>
  );
}

// Placeholder for modules whose pattern components haven't been built yet
function PlaceholderModule({
  moduleName,
  description,
  pattern,
  nodeName,
  onBack,
}: {
  moduleName: string;
  description: string;
  pattern: string;
  nodeName: string;
  onBack: () => void;
}) {
  return (
    <div className="px-5">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-sage-light/50">
          <span className="text-2xl">🔧</span>
        </div>
        <h2 className="font-display text-2xl text-bark mb-2">{moduleName}</h2>
        <p className="text-bark-muted mb-1">{description}</p>
        <p className="text-xs text-bark-muted/60">
          Pattern: {pattern} · {nodeName}
        </p>
      </motion.div>

      <motion.div
        className="bg-warm-white rounded-2xl p-8 border border-bark-muted/10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="font-display text-xl text-bark mb-3">
          Coming Soon
        </h3>
        <p className="text-bark-muted mb-6 max-w-sm mx-auto">
          The {pattern} interaction pattern for this module is planned for a future epic.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-full bg-sage-dark text-white font-semibold hover:shadow-md transition-all"
        >
          Go Back
        </button>
      </motion.div>
    </div>
  );
}
