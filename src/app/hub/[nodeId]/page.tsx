"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronLeft,
  Plus,
  Users,
  Heart,
  Star,
  Briefcase,
  GraduationCap,
  Compass,
  BookOpen,
  Lightbulb,
  Mail,
  MessageCircle,
  FileText,
  Mic,
  Check,
  SearchCheck,
  CalendarHeart,
  MessageCircleHeart,
  RefreshCw,
} from "lucide-react";
import { nodes, getModulesForNode } from "@/data/modules";
import { useProgress } from "@/contexts/ProgressContext";
import BottomSheet, { SheetOption } from "@/components/navigation/BottomSheet";
import StoryCardComponent from "@/components/core/StoryCard";
import { transitions } from "@/lib/animations";
import type { NodeId, StoryCard } from "@/types";

// Mock data imports for pre-populated hubs
import {
  familyMockCapturedData,
  familyMockStoryCard,
} from "@/data/prompts/family";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Heart,
  Star,
  Briefcase,
  GraduationCap,
  Compass,
  BookOpen,
  Lightbulb,
  Mail,
  MessageCircle,
  FileText,
  SearchCheck,
  CalendarHeart,
  MessageCircleHeart,
  RefreshCw,
};

// Pre-built mock story cards per node for demo display
const mockStoryCards: Record<string, StoryCard[]> = {
  family: [familyMockStoryCard],
  friends: [
    {
      id: "story-friends-001",
      title: "The Road Trip with Jimmy",
      person: "Jimmy",
      relationship: "Childhood Friend",
      date: "March 2026",
      quote: "We drove all night and watched the sunrise from the hood of his truck.",
      themes: ["adventure", "friendship", "youth"],
      category: "friends",
      moduleId: "1.friends.story",
    },
  ],
  favorites: [],
  career: [
    {
      id: "story-career-001",
      title: "The Promotion That Changed Everything",
      person: undefined,
      relationship: undefined,
      date: "March 2026",
      quote: "My boss said I was the hardest worker he'd ever seen. That meant more than the title.",
      themes: ["hard work", "recognition", "growth"],
      category: "career",
      moduleId: "1.career.story",
    },
  ],
};

// Mock captured data per node for display
const mockCapturedDisplay: Record<string, { label: string; items: { primary: string; secondary: string }[] }> = {
  family: {
    label: "Family Members",
    items: familyMockCapturedData.map((row) => ({
      primary: row.name,
      secondary: row.relationship,
    })),
  },
  friends: {
    label: "Friends",
    items: [
      { primary: "Jimmy", secondary: "Childhood" },
      { primary: "David", secondary: "Childhood" },
      { primary: "Mark", secondary: "College" },
      { primary: "Rachel", secondary: "College" },
      { primary: "Steve", secondary: "Adulthood" },
      { primary: "Karen", secondary: "Adulthood" },
    ],
  },
  career: {
    label: "Career Timeline",
    items: [
      { primary: "Anderson Hardware", secondary: "Stock Clerk · 1972–1974" },
      { primary: "Midwest Manufacturing", secondary: "Floor Manager · 1974–1983" },
      { primary: "Midwest Manufacturing", secondary: "Operations Director · 1983–1998" },
      { primary: "Hartfield Consulting", secondary: "Senior Consultant · 1998–2010" },
      { primary: "Retired", secondary: "2010–present" },
    ],
  },
  education: {
    label: "Education",
    items: [
      { primary: "Lincoln Elementary", secondary: "Elementary · 1960–1966" },
      { primary: "Roosevelt Junior High", secondary: "Middle · 1966–1969" },
      { primary: "Washington High School", secondary: "High School · 1969–1972" },
      { primary: "State University", secondary: "College · 1972–1976" },
    ],
  },
};

export default function HubPage() {
  const params = useParams();
  const router = useRouter();
  const nodeId = params.nodeId as NodeId;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { getNodeState } = useProgress();

  const node = nodes[nodeId];
  const nodeState = getNodeState(nodeId);
  const nodeModules = getModulesForNode(nodeId);

  if (!node || !nodeState) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment">
        <p className="text-bark-muted">Node not found</p>
      </div>
    );
  }

  const IconComponent = iconMap[node.icon] || Star;
  const capturedData = mockCapturedDisplay[nodeId];
  const storyCards = mockStoryCards[nodeId] || [];

  // Only show captured data if capture module is complete
  const hasCaptureComplete = nodeState.completedModules.some((m) =>
    m.endsWith(".capture")
  );

  // Only show story cards if story module is complete
  const hasStoryComplete = nodeState.completedModules.some(
    (m) => m.endsWith(".story") || m.endsWith(".spin") || m.endsWith(".roulette")
  );

  const handleModuleClick = (moduleId: string) => {
    setIsSheetOpen(false);
    router.push(`/module/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-parchment pb-24">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md bg-parchment/80 border-b border-bark-muted/8"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={transitions.default}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between px-5 py-3.5">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-bark-muted hover:text-bark transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </button>

          <h1 className="font-display text-lg text-bark">{node.name}</h1>

          <div className="w-16" />
        </div>
      </motion.header>

      <main className="max-w-2xl mx-auto px-5 py-8">
        {/* Hero section */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: `${node.color}40` }}
          >
            <IconComponent className="w-10 h-10 text-sage-dark" />
          </div>
          <h2 className="font-display text-2xl text-bark mb-2">
            {node.name} Hub
          </h2>
          <p className="text-bark-muted">
            {nodeState.storyCount}{" "}
            {nodeState.storyCount === 1 ? "story" : "stories"} captured
          </p>
        </motion.div>

        {/* Stats / Scorecard */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-warm-white rounded-xl p-4 border border-bark-muted/10 shadow-sm">
            <p className="text-3xl font-display text-sage-dark mb-1">
              {nodeState.completedModules.length}
            </p>
            <p className="text-sm text-bark-muted">Modules Complete</p>
          </div>
          <div className="bg-warm-white rounded-xl p-4 border border-bark-muted/10 shadow-sm">
            <p className="text-3xl font-display text-sage-dark mb-1">
              {nodeState.storyCount}
            </p>
            <p className="text-sm text-bark-muted">Stories Told</p>
          </div>
        </motion.div>

        {/* Captured Data */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="font-display text-lg text-bark mb-4">
            {capturedData?.label || "Captured Data"}
          </h3>

          {hasCaptureComplete && capturedData ? (
            <div className="bg-warm-white rounded-xl border border-bark-muted/10 overflow-hidden shadow-sm">
              {capturedData.items.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 border-b border-bark-muted/5 last:border-b-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.04 }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: `${node.color}30`,
                      color: "#3A2A1C",
                    }}
                  >
                    {item.primary.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-bark truncate">
                      {item.primary}
                    </p>
                    <p className="text-xs text-bark-muted">{item.secondary}</p>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-sage-dark/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-sage-dark" strokeWidth={3} />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-warm-white rounded-xl p-5 border border-bark-muted/10 text-center shadow-sm">
              <p className="text-bark-muted text-sm">
                Complete the capture module to see your{" "}
                {node.name.toLowerCase()} data here.
              </p>
              {nodeModules.find((m) => m.id.endsWith(".capture")) && (
                <button
                  onClick={() => {
                    const captureModule = nodeModules.find((m) =>
                      m.id.endsWith(".capture")
                    );
                    if (captureModule) router.push(`/module/${captureModule.id}`);
                  }}
                  className="mt-3 px-4 py-2 rounded-full bg-sage-dark text-white text-sm font-semibold hover:shadow-md transition-all"
                >
                  Start Capture
                </button>
              )}
            </div>
          )}
        </motion.section>

        {/* Story Cards */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="font-display text-lg text-bark mb-4">Your Stories</h3>
          {hasStoryComplete && storyCards.length > 0 ? (
            <div className="space-y-4">
              {storyCards.map((card, i) => (
                <StoryCardComponent key={card.id} card={card} index={i} />
              ))}
            </div>
          ) : nodeState.storyCount > 0 ? (
            <div className="space-y-3">
              {Array.from({
                length: Math.min(nodeState.storyCount, 3),
              }).map((_, i) => (
                <div
                  key={i}
                  className="bg-warm-white rounded-xl p-4 border-l-4 border border-bark-muted/10 shadow-sm"
                  style={{ borderLeftColor: node.color }}
                >
                  <p className="font-display text-bark mb-1">Story {i + 1}</p>
                  <p className="text-sm text-bark-muted italic">
                    A captured memory...
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-warm-white rounded-xl p-5 border border-bark-muted/10 text-center shadow-sm">
              <p className="text-bark-muted text-sm">
                No stories yet. Tell one below!
              </p>
            </div>
          )}
        </motion.section>

        {/* Module progress list */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="font-display text-lg text-bark mb-4">Modules</h3>
          <div className="space-y-2">
            {nodeModules.map((mod) => {
              const isComplete = nodeState.completedModules.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => router.push(`/module/${mod.id}`)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-warm-white border border-bark-muted/10 shadow-sm hover:shadow-md active:scale-[0.99] transition-all text-left"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isComplete ? "bg-sage-dark" : "bg-bark-muted/10"
                    }`}
                  >
                    {isComplete ? (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    ) : (
                      <Mic className="w-4 h-4 text-bark-muted/50" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        isComplete ? "text-sage-dark" : "text-bark"
                      }`}
                    >
                      {mod.name}
                    </p>
                    <p className="text-xs text-bark-muted">
                      {isComplete ? "Completed" : mod.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.section>
      </main>

      {/* Add More floating button */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button
          onClick={() => setIsSheetOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-sage-dark text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-5 h-5" />
          Add More
        </button>
      </motion.div>

      {/* Bottom Sheet */}
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={`Add to ${node.name}`}
      >
        <div className="space-y-2">
          {nodeModules.map((mod) => {
            const isComplete = nodeState.completedModules.includes(mod.id);
            return (
              <SheetOption
                key={mod.id}
                icon={
                  isComplete ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )
                }
                title={mod.name}
                description={isComplete ? "Completed ✓" : mod.description}
                onClick={() => handleModuleClick(mod.id)}
                disabled={false}
              />
            );
          })}
        </div>
      </BottomSheet>
    </div>
  );
}
