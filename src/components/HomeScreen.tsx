"use client";

import { motion } from "framer-motion";
import PromptCarousel from "./PromptCarousel";
import MemoryTree from "./MemoryTree";
import TapRoot from "./navigation/TapRoot";
import Header from "./navigation/Header";
import { prompts, userProgress, nodeStates } from "@/lib/mockData";

export default function HomeScreen() {
  return (
    <div className="relative min-h-screen pb-20">
      {/* Header */}
      <Header streakDays={userProgress.streakDays} userName="Stefan" />

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

        {/* TapRoot Path */}
        <section className="pb-10">
          <TapRoot nodeStates={nodeStates} />
        </section>
      </main>
    </div>
  );
}
