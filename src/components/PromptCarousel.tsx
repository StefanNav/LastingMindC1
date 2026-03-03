"use client";

import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import type { Prompt } from "@/lib/mockData";

interface PromptCarouselProps {
  prompts: Prompt[];
}

const swipeThreshold = 50;

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 320 : -320,
    opacity: 0,
    scale: 0.92,
    rotateY: direction > 0 ? 8 : -8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 320 : -320,
    opacity: 0,
    scale: 0.92,
    rotateY: direction < 0 ? 8 : -8,
  }),
};

export default function PromptCarousel({ prompts }: PromptCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const idx = ((page % prompts.length) + prompts.length) % prompts.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -swipeThreshold) {
      paginate(1);
    } else if (info.offset.x > swipeThreshold) {
      paginate(-1);
    }
  };

  const prompt = prompts[idx];

  return (
    <div className="w-full">
      <div className="relative h-[220px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 350, damping: 35 },
              opacity: { duration: 0.25 },
              scale: { duration: 0.3 },
              rotateY: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="absolute inset-x-4 cursor-grab active:cursor-grabbing"
            style={{ perspective: 800 }}
          >
            <div
              className="relative rounded-2xl p-6 shadow-sm border overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${prompt.color}18, ${prompt.color}08)`,
                borderColor: `${prompt.color}30`,
              }}
            >
              {/* Decorative corner accent */}
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-[0.07] rounded-bl-full"
                style={{ background: prompt.color }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{prompt.emoji}</span>
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: `${prompt.color}CC` }}
                  >
                    {prompt.category}
                  </span>
                </div>

                <h3 className="font-display text-xl leading-snug text-bark mb-5">
                  {prompt.question}
                </h3>

                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: `linear-gradient(135deg, ${prompt.color}, ${prompt.color}DD)` }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 18.5a6.5 6.5 0 0 0 6.5-6.5V6a6.5 6.5 0 0 0-13 0v6a6.5 6.5 0 0 0 6.5 6.5Z" />
                    <path d="M12 18.5V22" />
                    <path d="M8 22h8" />
                  </svg>
                  Record Memory
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {prompts.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > idx ? 1 : -1])}
            className="relative p-1"
            aria-label={`Go to prompt ${i + 1}`}
          >
            <motion.div
              className="rounded-full"
              animate={{
                width: i === idx ? 20 : 6,
                height: 6,
                backgroundColor: i === idx ? "var(--sage-dark)" : "var(--bark-muted)",
                opacity: i === idx ? 1 : 0.35,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
