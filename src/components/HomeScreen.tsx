"use client";

import { motion } from "framer-motion";
import PromptCarousel from "./PromptCarousel";
import MemoryTree from "./MemoryTree";
import TimelineLog from "./TimelineLog";
import { prompts, memories, categories, userProgress } from "@/lib/mockData";

export default function HomeScreen() {
  return (
    <div className="relative min-h-screen pb-20">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md bg-parchment/80 border-b border-bark-muted/8"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sage-dark to-sage flex items-center justify-center shadow-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M12 22C12 22 4 16 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10C20 16 12 22 12 22Z"
                  fill="currentColor"
                  opacity="0.3"
                />
                <path
                  d="M12 2C12 2 12 8 12 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 8C14 6 16 6 17 7"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 11C10 9 8 9 7 10"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-display text-lg text-bark tracking-tight">
              Lasting Mind
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-glow/50 border border-amber-light/30">
              <span className="text-xs">🔥</span>
              <span className="text-xs font-bold text-amber">
                {userProgress.streakDays}
              </span>
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-light to-rose flex items-center justify-center text-white text-xs font-bold shadow-sm">
              S
            </div>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 max-w-2xl mx-auto">
        {/* Greeting */}
        <motion.section
          className="px-5 pt-5 pb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-sm text-bark-muted font-medium mb-0.5">
            Good evening, Stefan
          </p>
          <h1 className="font-display text-2xl text-bark leading-tight">
            What story will you tell today?
          </h1>
        </motion.section>

        {/* Prompt Carousel */}
        <motion.section
          className="pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <PromptCarousel prompts={prompts} />
        </motion.section>

        {/* Tree */}
        <section className="px-4 pb-10">
          <MemoryTree
            growthPercentage={userProgress.growthPercentage}
            memoriesCount={userProgress.memoriesRecorded}
          />
        </section>

        {/* Timeline */}
        <section className="pb-10">
          <TimelineLog memories={memories} categories={categories} />
        </section>
      </main>
    </div>
  );
}
