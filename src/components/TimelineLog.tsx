"use client";

import { motion, AnimatePresence, useInView, LayoutGroup } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import type { Memory, CategoryMeta } from "@/lib/mockData";

interface TimelineLogProps {
  memories: Memory[];
  categories: CategoryMeta[];
}

export default function TimelineLog({ memories, categories }: TimelineLogProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const memoriesByCategory = useMemo(() => {
    const grouped: Record<string, Memory[]> = {};
    for (const mem of memories) {
      if (!grouped[mem.category]) grouped[mem.category] = [];
      grouped[mem.category].push(mem);
    }
    return grouped;
  }, [memories]);

  const handleToggle = (categoryName: string) => {
    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8 px-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-bark-muted/20 to-transparent" />
        <h2 className="font-display text-xl text-bark-light whitespace-nowrap">
          Your Memories
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-bark-muted/20 to-transparent" />
      </div>

      <LayoutGroup>
        <div className="relative">
          {/* Central vine line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]">
            <div className="w-full h-full bg-gradient-to-b from-sage-dark/40 via-sage/30 to-sage-light/20 rounded-full" />
          </div>

          <div className="space-y-5">
            {categories.map((cat, index) => {
              const catMemories = memoriesByCategory[cat.name] || [];
              const isExpanded = expandedCategory === cat.name;
              const isLeft = index % 2 === 0;

              return (
                <CategoryNode
                  key={cat.id}
                  category={cat}
                  memories={catMemories}
                  index={index}
                  isLeft={isLeft}
                  isExpanded={isExpanded}
                  onToggle={() => handleToggle(cat.name)}
                />
              );
            })}
          </div>

          <motion.div
            layout
            className="relative mt-8 flex flex-col items-center gap-2 py-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-sage/40 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sage">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </div>
            <p className="text-xs text-bark-muted font-medium tracking-wide">
              Keep growing your tree
            </p>
          </motion.div>
        </div>
      </LayoutGroup>
    </div>
  );
}

function CategoryNode({
  category,
  memories,
  index,
  isLeft,
  isExpanded,
  onToggle,
}: {
  category: CategoryMeta;
  memories: Memory[];
  index: number;
  isLeft: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isEmpty = memories.length === 0;
  const isSuggested = !!(category.suggested && isEmpty);

  return (
    <motion.div ref={ref} layout className="relative">
      {/* Category row */}
      <motion.div
        layout
        className="relative grid grid-cols-[1fr_40px_1fr] items-start"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {/* Left content */}
        {isLeft ? (
          <div className="flex justify-end pr-2">
            <CategoryCard
              category={category}
              count={memories.length}
              isExpanded={isExpanded}
              isEmpty={isEmpty}
              isSuggested={isSuggested}
              alignRight
              onToggle={onToggle}
            />
          </div>
        ) : (
          <div />
        )}

        {/* Center node */}
        <div className="flex flex-col items-center justify-start pt-4">
          <motion.div
            className={`w-4 h-4 rounded-full border-[2.5px] z-10 shadow-sm transition-colors duration-300 ${
              isExpanded
                ? "border-sage-dark bg-sage-light scale-110"
                : isSuggested
                ? "border-bark-muted/30 bg-parchment-dark/50"
                : "border-sage-dark bg-parchment"
            }`}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: isExpanded ? 1.15 : 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
              delay: index * 0.1 + 0.2,
            }}
          />
          {/* Connector line to category card */}
          <motion.div
            className={`absolute top-[22px] h-[1.5px] ${
              isSuggested ? "bg-bark-muted/15" : "bg-sage-dark/25"
            } ${
              isLeft
                ? "right-[calc(50%+8px)] w-[calc(50%-28px)]"
                : "left-[calc(50%+8px)] w-[calc(50%-28px)]"
            }`}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            style={{ transformOrigin: isLeft ? "right" : "left" }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          />
        </div>

        {/* Right content */}
        {!isLeft ? (
          <div className="flex justify-start pl-2">
            <CategoryCard
              category={category}
              count={memories.length}
              isExpanded={isExpanded}
              isEmpty={isEmpty}
              isSuggested={isSuggested}
              alignRight={false}
              onToggle={onToggle}
            />
          </div>
        ) : (
          <div />
        )}
      </motion.div>

      {/* Expanded entries */}
      <AnimatePresence>
        {isExpanded && memories.length > 0 && (
          <motion.div
            key={`entries-${category.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-3">
              {memories.map((memory, i) => (
                <EntryRow
                  key={memory.id}
                  memory={memory}
                  index={i}
                  isLeft={isLeft}
                  categoryColor={category.color}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CategoryCard({
  category,
  count,
  isExpanded,
  isEmpty,
  isSuggested,
  alignRight,
  onToggle,
}: {
  category: CategoryMeta;
  count: number;
  isExpanded: boolean;
  isEmpty: boolean;
  isSuggested: boolean;
  alignRight: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      layout
      onClick={isEmpty ? undefined : onToggle}
      className={`relative max-w-[180px] px-5 py-3.5 rounded-2xl transition-all duration-300 ${
        alignRight ? "text-right" : "text-left"
      } ${
        isSuggested
          ? "bg-parchment-dark/40 border border-dashed border-bark-muted/20 opacity-55 cursor-default"
          : isEmpty
          ? "bg-white/40 border border-dashed border-bark-muted/15 opacity-50 cursor-default"
          : isExpanded
          ? "bg-white/80 border border-sage-dark/25 shadow-[0_0_24px_rgba(58,107,42,0.1)] cursor-pointer"
          : "bg-white/65 border border-bark-muted/12 shadow-[0_2px_12px_rgba(58,42,28,0.04)] hover:shadow-[0_4px_20px_rgba(58,42,28,0.08)] cursor-pointer"
      }`}
      whileTap={!isEmpty ? { scale: 0.97 } : undefined}
    >
      <div
        className={`flex items-center gap-2 mb-1 ${
          alignRight ? "justify-end" : "justify-start"
        }`}
      >
        <span className="text-lg">{category.emoji}</span>
      </div>

      <h3
        className={`font-display text-base leading-tight mb-0.5 transition-colors duration-300 ${
          isExpanded ? "text-sage-dark" : isSuggested ? "text-bark-muted/60" : "text-bark"
        }`}
      >
        {category.name}
      </h3>

      <p
        className={`text-[10px] font-semibold tracking-[0.15em] uppercase ${
          isSuggested
            ? "text-bark-muted/40"
            : isEmpty
            ? "text-bark-muted/40"
            : "text-bark-muted/60"
        }`}
      >
        {isSuggested ? "Suggested" : count === 0 ? "No stories yet" : `${count} ${count === 1 ? "story" : "stories"}`}
      </p>

      {!isEmpty && (
        <motion.div
          className={`absolute top-3 ${alignRight ? "left-3" : "right-3"}`}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-colors duration-300 ${
              isExpanded ? "text-sage-dark" : "text-bark-muted/40"
            }`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}

function EntryRow({
  memory,
  index,
  isLeft,
  categoryColor,
}: {
  memory: Memory;
  index: number;
  isLeft: boolean;
  categoryColor: string;
}) {
  return (
    <motion.div
      className="relative grid grid-cols-[1fr_40px_1fr] items-start"
      initial={{ opacity: 0, scale: 0.85, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -4 }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 28,
        delay: index * 0.06,
      }}
    >
      {/* Left content */}
      {isLeft ? (
        <div className="flex justify-end pr-2">
          <EntryCard memory={memory} alignRight categoryColor={categoryColor} />
        </div>
      ) : (
        <div />
      )}

      {/* Center node — smaller sub-branch dot */}
      <div className="flex flex-col items-center justify-start pt-2.5">
        <motion.div
          className="w-2.5 h-2.5 rounded-full border-[2px] border-sage/50 bg-parchment z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
            delay: index * 0.06 + 0.1,
          }}
        />
        {/* Sub-branch connector */}
        <motion.div
          className={`absolute top-[16px] h-[1px] bg-sage/25 ${
            isLeft
              ? "right-[calc(50%+5px)] w-[calc(50%-23px)]"
              : "left-[calc(50%+5px)] w-[calc(50%-23px)]"
          }`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ transformOrigin: isLeft ? "right" : "left" }}
          transition={{ duration: 0.3, delay: index * 0.06 + 0.15 }}
        />
      </div>

      {/* Right content */}
      {!isLeft ? (
        <div className="flex justify-start pl-2">
          <EntryCard memory={memory} alignRight={false} categoryColor={categoryColor} />
        </div>
      ) : (
        <div />
      )}
    </motion.div>
  );
}

function EntryCard({
  memory,
  alignRight,
  categoryColor,
}: {
  memory: Memory;
  alignRight: boolean;
  categoryColor: string;
}) {
  return (
    <div
      className={`group max-w-[160px] p-3 rounded-xl bg-white/50 border border-bark-muted/8 shadow-[0_1px_8px_rgba(58,42,28,0.03)] hover:shadow-[0_2px_14px_rgba(58,42,28,0.06)] transition-shadow duration-300 cursor-pointer ${
        alignRight ? "text-right" : "text-left"
      }`}
    >
      <div
        className={`flex items-center gap-1.5 mb-1 ${
          alignRight ? "justify-end" : "justify-start"
        }`}
      >
        <span className="text-sm">{memory.emoji}</span>
        <div
          className="w-1.5 h-1.5 rounded-full opacity-60"
          style={{ backgroundColor: categoryColor }}
        />
      </div>

      <h4 className="font-display text-[13px] leading-tight text-bark mb-0.5 group-hover:text-sage-dark transition-colors">
        {memory.title}
      </h4>

      <p className="text-[10px] leading-relaxed text-bark-light/70 line-clamp-1 mb-1.5">
        {memory.excerpt}
      </p>

      <time className="text-[9px] text-bark-muted/50 font-medium">
        {memory.date}
      </time>
    </div>
  );
}
