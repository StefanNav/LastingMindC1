"use client";

import { motion, useInView, AnimatePresence, type PanInfo } from "framer-motion";
import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Lock, Play, Plus, Infinity, UserPlus, User } from "lucide-react";
import NodeBubble from "./NodeBubble";
import { nodes, getModulesForNode, sections } from "@/data/modules";
import { familyMockCapturedData } from "@/data/prompts/family";
import type { NodeId, SectionId } from "@/types";
import type { NodeStateData, ModuleStat } from "@/lib/mockData";

const PHASE_1_NODE_IDS: NodeId[] = ['family', 'friends', 'favorites', 'career', 'education', 'values'];
const KEEP_GROWING_NODE_IDS: NodeId[] = ['diveDeeper', 'lifeUpdates', 'familyCorner', 'moreRounds'];
const KEEP_GROWING_SECTION_ID: SectionId = 3;

const KEEP_GROWING_LABELS: Record<string, { subtitle: string; countLabel: string }> = {
  diveDeeper: { subtitle: 'Fill in the gaps', countLabel: 'entries' },
  lifeUpdates: { subtitle: 'Capture the present', countLabel: 'entries' },
  familyCorner: { subtitle: 'Your family drives your story', countLabel: 'questions answered' },
  moreRounds: { subtitle: 'Play again', countLabel: 'rounds played' },
};

const COMING_SOON_MODULES = ['4.familyCorner.liveConversation'];
const SWIPE_THRESHOLD = 50;

const sectionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

interface TapRootProps {
  nodeStates: NodeStateData[];
  onSectionChange?: () => void;
}

export default function TapRoot({ nodeStates, onSectionChange }: TapRootProps) {
  const router = useRouter();
  const [expandedNode, setExpandedNode] = useState<NodeId | null>(null);

  // Create a map for quick lookup
  const stateMap = useMemo(() => nodeStates.reduce((acc, ns) => {
    acc[ns.nodeId] = ns;
    return acc;
  }, {} as Record<string, NodeStateData>), [nodeStates]);

  // Determine if Phase 1 is complete (unlocks sections 1-3)
  const isPhase1Complete = useMemo(
    () => PHASE_1_NODE_IDS.every((id) => stateMap[id]?.state === 'complete'),
    [stateMap],
  );

  // Persist active section across navigation (survives router.back())
  const [[activeSection, direction], setSection] = useState<[SectionId, number]>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('taproot-section');
      if (stored !== null) {
        const parsed = Number(stored);
        if (parsed >= 0 && parsed < sections.length) return [parsed as SectionId, 0];
      }
    }
    return [0, 0];
  });

  useEffect(() => {
    sessionStorage.setItem('taproot-section', String(activeSection));
  }, [activeSection]);

  const goToSection = useCallback((newSection: SectionId, dir: number) => {
    setExpandedNode(null);
    setSection([newSection, dir]);
    onSectionChange?.();
  }, [onSectionChange]);

  const handlePrev = useCallback(() => {
    const prev = activeSection === 0 ? sections.length - 1 : activeSection - 1;
    goToSection(prev as SectionId, -1);
  }, [activeSection, goToSection]);

  const handleNext = useCallback(() => {
    const next = activeSection === sections.length - 1 ? 0 : activeSection + 1;
    goToSection(next as SectionId, 1);
  }, [activeSection, goToSection]);

  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && activeSection < sections.length - 1) {
      goToSection((activeSection + 1) as SectionId, 1);
    } else if (info.offset.x > SWIPE_THRESHOLD && activeSection > 0) {
      goToSection((activeSection - 1) as SectionId, -1);
    }
  }, [activeSection, goToSection]);

  const handleNodeClick = useCallback((nodeId: NodeId, state: NodeStateData['state']) => {
    if (state === 'locked') return;
    setExpandedNode((prev) => (prev === nodeId ? null : nodeId));
  }, []);

  const handleModuleClick = useCallback((moduleId: string) => {
    router.push(`/module/${moduleId}`);
  }, [router]);

  const currentSection = sections[activeSection];
  const isSectionLocked = activeSection > 0 && !isPhase1Complete;
  const isKeepGrowing = activeSection === KEEP_GROWING_SECTION_ID;

  return (
    <div className="w-full">
      {/* Section title with chevron arrows */}
      <div className="flex items-center justify-center gap-3 mb-2 px-4">
        <button
          onClick={handlePrev}
          className="p-1 rounded-full transition-colors hover:bg-bark-muted/10 text-bark-muted"
          aria-label="Previous section"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <motion.h2
          key={currentSection.title}
          className="font-display text-lg text-bark-light whitespace-nowrap select-none"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {currentSection.title}
        </motion.h2>

        <button
          onClick={handleNext}
          className="p-1 rounded-full transition-colors hover:bg-bark-muted/10 text-bark-muted"
          aria-label="Next section"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToSection(s.id, i > activeSection ? 1 : -1)}
            className="relative p-1"
            aria-label={`Go to ${s.title}`}
          >
            <motion.div
              className="rounded-full"
              animate={{
                width: i === activeSection ? 20 : 6,
                height: 6,
                backgroundColor: i === activeSection ? 'var(--sage-dark)' : 'var(--bark-muted)',
                opacity: i === activeSection ? 1 : 0.35,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </button>
        ))}
      </div>

      {/* Section content area with swipe */}
      <div className="relative overflow-hidden min-h-[320px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeSection}
            custom={direction}
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 350, damping: 35 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="w-full"
          >
            <div className="relative pt-4 pb-4">
              {/* Central trunk line */}
              <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px]">
                {isKeepGrowing ? (
                  <>
                    <div className="w-full h-[70%] rounded-full bg-gradient-to-b from-sage-dark/50 via-sage/40 to-sage-light/20" />
                    <div
                      className="w-full h-[30%]"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, var(--sage-light) 50%, transparent 50%)',
                        backgroundSize: '3px 10px',
                        opacity: 0.3,
                      }}
                    />
                  </>
                ) : (
                  <div className={`w-full h-full rounded-full ${
                    isSectionLocked
                      ? 'bg-gradient-to-b from-bark-muted/20 via-bark-muted/15 to-bark-muted/10'
                      : 'bg-gradient-to-b from-sage-dark/50 via-sage/40 to-sage-light/30'
                  }`} />
                )}
              </div>

              {/* Locked section message */}
              {isSectionLocked && currentSection.lockedMessage && (
                <motion.div
                  className="relative z-10 mx-auto mb-6 max-w-[280px] p-4 rounded-2xl bg-white/80 border border-dashed border-bark-muted/25 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Lock className="w-5 h-5 text-bark-muted/40 mx-auto mb-2" />
                  <p className="text-[13px] leading-relaxed text-bark-muted/70">
                    {currentSection.lockedMessage}
                  </p>
                </motion.div>
              )}

              {/* Nodes */}
              <div className="space-y-5">
                {currentSection.nodeIds.map((nodeId, index) => {
                  const node = nodes[nodeId];
                  const nodeState = stateMap[nodeId];
                  const isLeft = index % 2 === 0;
                  const isExpanded = expandedNode === nodeId;

                  if (!node || !nodeState) return null;

                  // Force locked state if section is locked
                  const effectiveState = isSectionLocked ? 'locked' : nodeState.state;

                  return (
                    <div key={nodeId}>
                      <NodeRow
                        nodeId={nodeId}
                        name={node.name}
                        state={effectiveState}
                        storyCount={nodeState.storyCount}
                        totalModules={node.modules.length}
                        completedModules={isSectionLocked ? 0 : nodeState.completedModules.length}
                        color={node.color}
                        isLeft={isLeft}
                        isExpanded={isExpanded}
                        index={index}
                        isKeepGrowing={isKeepGrowing && !isSectionLocked}
                        onClick={() => handleNodeClick(nodeId, effectiveState)}
                      />

                      {/* Module branches */}
                      <AnimatePresence>
                        {isExpanded && effectiveState !== 'locked' && (
                          <ModuleBranch
                            nodeId={nodeId}
                            isLeft={isLeft}
                            completedModules={nodeState.completedModules}
                            storyCount={nodeState.storyCount}
                            moduleStats={nodeState.moduleStats}
                            onModuleClick={handleModuleClick}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Keep Growing footer — fading dashed line + message */}
              {isKeepGrowing && !isSectionLocked && (
                <motion.div
                  className="relative z-10 flex flex-col items-center gap-2 pt-8 pb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-sage/40 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-sage/60" />
                  </div>
                  <p className="text-[11px] text-bark-muted/60 font-medium tracking-wide">
                    Keep growing your tree
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

interface NodeRowProps {
  nodeId: NodeId;
  name: string;
  state: NodeStateData['state'];
  storyCount: number;
  totalModules: number;
  completedModules: number;
  color: string;
  isLeft: boolean;
  isExpanded: boolean;
  index: number;
  isKeepGrowing?: boolean;
  onClick: () => void;
}

function NodeRow({ nodeId, name, state, storyCount, totalModules, completedModules, color, isLeft, isExpanded, index, isKeepGrowing = false, onClick }: NodeRowProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      layout
      className="relative grid grid-cols-[1fr_60px_1fr] items-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Left content */}
      {isLeft ? (
        <div className="flex justify-end pr-2">
          <NodeBubble
            nodeId={nodeId}
            name={name}
            state={state}
            storyCount={storyCount}
            totalModules={totalModules}
            completedModules={completedModules}
            color={color}
            isLeft={true}
            isExpanded={isExpanded}
            isKeepGrowing={isKeepGrowing}
            keepGrowingCountLabel={KEEP_GROWING_LABELS[nodeId]?.countLabel}
            onClick={onClick}
          />
        </div>
      ) : (
        <div />
      )}

      {/* Center node dot */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Horizontal connector line to node */}
        <motion.div
          className={`
            absolute top-1/2 -translate-y-1/2 h-[2px]
            ${state === 'locked' ? 'bg-bark-muted/20' : 'bg-sage-dark/40'}
            ${isLeft ? 'right-1/2 w-[calc(50%-2px)]' : 'left-1/2 w-[calc(50%-2px)]'}
          `}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          style={{ transformOrigin: isLeft ? 'right' : 'left' }}
          transition={{ duration: 0.3, delay: index * 0.08 + 0.1 }}
        />
        
        <motion.div
          className={`
            w-4 h-4 rounded-full border-[2.5px] z-10 shadow-sm
            ${state === 'complete' 
              ? 'border-sage-dark bg-sage-light' 
              : state === 'active'
              ? 'border-sage-dark bg-white'
              : state === 'suggested'
              ? 'border-sage bg-sage-light/50'
              : 'border-bark-muted/30 bg-parchment-dark/50'
            }
          `}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
            delay: index * 0.08 + 0.1,
          }}
        />
        
      </div>

      {/* Right content */}
      {!isLeft ? (
        <div className="flex justify-start pl-2">
          <NodeBubble
            nodeId={nodeId}
            name={name}
            state={state}
            storyCount={storyCount}
            totalModules={totalModules}
            completedModules={completedModules}
            color={color}
            isLeft={false}
            isExpanded={isExpanded}
            isKeepGrowing={isKeepGrowing}
            keepGrowingCountLabel={KEEP_GROWING_LABELS[nodeId]?.countLabel}
            onClick={onClick}
          />
        </div>
      ) : (
        <div />
      )}
    </motion.div>
  );
}

// Config for nodes that support "Tell another" storytelling shortcut
const tellAnotherConfig: Partial<Record<NodeId, { label: string; storyModuleId: string }>> = {
  friends: { label: '+ Tell another friend story', storyModuleId: '1.friends.story' },
  career: { label: '+ Tell another career story', storyModuleId: '1.career.story' },
  education: { label: '+ Tell another school memory', storyModuleId: '1.education.story' },
};

interface ModuleBranchProps {
  nodeId: NodeId;
  isLeft: boolean;
  completedModules: string[];
  storyCount: number;
  moduleStats?: Record<string, ModuleStat>;
  onModuleClick: (moduleId: string) => void;
}

function ModuleBranch({ nodeId, isLeft, completedModules, storyCount, moduleStats, onModuleClick }: ModuleBranchProps) {
  const nodeModules = getModulesForNode(nodeId);
  const tellAnother = tellAnotherConfig[nodeId];
  const showTellAnother = tellAnother && completedModules.includes(tellAnother.storyModuleId);
  const showFamilyAddMore = nodeId === 'family' && completedModules.includes('1.family.story');

  // Module cards are placed on the same side as the node, centered under the node card.
  // A vertical line runs from the node center down through the center of each module.
  return (
    <motion.div
      className="relative grid grid-cols-[1fr_60px_1fr] px-4 overflow-hidden"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Left module list */}
      {isLeft ? (
        <div className="relative flex flex-col items-center py-3 gap-3">
          {/* Vertical line through center of modules */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-sage-dark/25 rounded-full"
            style={{ height: '100%' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          />
          {nodeModules.map((mod, i) => {
            const isComplete = completedModules.includes(mod.id);
            const isComingSoon = COMING_SOON_MODULES.includes(mod.id);
            const stat = moduleStats?.[mod.id];
            return (
              <ModuleCard
                key={mod.id}
                name={mod.name}
                description={mod.description}
                isComplete={isComplete}
                isComingSoon={isComingSoon}
                stat={stat}
                index={i}
                direction="left"
                onClick={() => onModuleClick(mod.id)}
              />
            );
          })}
          {showFamilyAddMore && (
            <FamilyAddMoreSection
              storyCount={storyCount}
              index={nodeModules.length}
              direction="left"
            />
          )}
          {showTellAnother && (
            <TellAnotherCard
              label={tellAnother.label}
              storyCount={storyCount}
              index={nodeModules.length}
              direction="left"
              onClick={() => onModuleClick(tellAnother.storyModuleId)}
            />
          )}
        </div>
      ) : (
        <div />
      )}

      {/* Center — keeps the main trunk line continuous */}
      <div className="flex flex-col items-center" />

      {/* Right module list */}
      {!isLeft ? (
        <div className="relative flex flex-col items-center py-3 gap-3">
          {/* Vertical line through center of modules */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-sage-dark/25 rounded-full"
            style={{ height: '100%' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          />
          {nodeModules.map((mod, i) => {
            const isComplete = completedModules.includes(mod.id);
            const isComingSoon = COMING_SOON_MODULES.includes(mod.id);
            const stat = moduleStats?.[mod.id];
            return (
              <ModuleCard
                key={mod.id}
                name={mod.name}
                description={mod.description}
                isComplete={isComplete}
                isComingSoon={isComingSoon}
                stat={stat}
                index={i}
                direction="right"
                onClick={() => onModuleClick(mod.id)}
              />
            );
          })}
          {showFamilyAddMore && (
            <FamilyAddMoreSection
              storyCount={storyCount}
              index={nodeModules.length}
              direction="right"
            />
          )}
          {showTellAnother && (
            <TellAnotherCard
              label={tellAnother.label}
              storyCount={storyCount}
              index={nodeModules.length}
              direction="right"
              onClick={() => onModuleClick(tellAnother.storyModuleId)}
            />
          )}
        </div>
      ) : (
        <div />
      )}
    </motion.div>
  );
}

// ── Family "Add More" section ──
// Replaces TellAnotherCard for family node with 4 rich option cards.

interface FamilyAddMoreProps {
  storyCount: number;
  index: number;
  direction: 'left' | 'right';
}

// Mock entry counts per family member for carousel display
const FAMILY_MEMBER_ENTRIES: Record<string, number> = {
  Linda: 3,
  Margaret: 2,
  Sarah: 1,
  Michael: 1,
  Tom: 0,
  Robert: 0,
  Helen: 1,
};

function FamilyAddMoreSection({ storyCount, index, direction }: FamilyAddMoreProps) {
  const totalEntries = Object.values(FAMILY_MEMBER_ENTRIES).reduce((a, b) => a + b, 0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = useCallback((dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 72; // card width + gap
    carouselRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  return (
    <motion.div
      className="relative z-10 w-[148px] flex flex-col gap-1.5"
      initial={{ opacity: 0, x: direction === 'left' ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 + 0.1 }}
    >
      {/* Section header */}
      <div className="bg-white border border-bark-muted/10 rounded-lg px-3 py-1.5 mt-2 mb-0.5 text-center">
        <p className="text-[10px] font-semibold tracking-[0.05em] uppercase text-sage-dark/70">
          Family Members
        </p>
      </div>

      {/* Family member carousel */}
      <div
        ref={carouselRef}
        className="flex gap-1.5 overflow-x-auto pb-1 -mx-0.5 px-0.5 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {familyMockCapturedData.map((member) => {
          const entries = FAMILY_MEMBER_ENTRIES[String(member.name)] ?? 0;
          const hasEntries = entries > 0;
          return (
            <motion.button
              key={String(member.name)}
              className={`
                flex flex-col items-center gap-1 p-2 rounded-lg snap-start flex-shrink-0 w-[68px]
                transition-all cursor-pointer
                ${hasEntries
                  ? 'bg-white border border-bark-muted/10 hover:bg-sage-light/20'
                  : 'bg-white/60 border border-dashed border-bark-muted/20 hover:bg-white'}
              `}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className={`
                w-7 h-7 rounded-full flex items-center justify-center
                ${hasEntries ? 'bg-sage-light/50' : 'bg-bark-muted/8'}
              `}>
                <User className={`w-3.5 h-3.5 ${hasEntries ? 'text-sage-dark' : 'text-bark-muted/40'}`} />
              </div>
              <p className={`text-[11px] font-semibold leading-none ${hasEntries ? 'text-bark' : 'text-bark/70'}`}>
                {String(member.name)}
              </p>
              <p className={`text-[9px] leading-none ${hasEntries ? 'text-bark-muted/70' : 'text-bark-muted/60'}`}>
                {String(member.relationship)}
              </p>
              <span className={`text-[9px] leading-none font-semibold px-1.5 py-0.5 rounded-full ${hasEntries ? 'bg-[#d5e0d0] text-sage-dark' : 'bg-[#e8e4df] text-bark-muted'}`}>
                {entries} {entries === 1 ? 'entry' : 'entries'}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Carousel nav buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => scrollCarousel('left')}
          className="w-5 h-5 rounded-full flex items-center justify-center bg-white border border-bark-muted/15 hover:bg-sage-light/30 transition-colors"
        >
          <ChevronLeft className="w-3 h-3 text-bark-muted/50" />
        </button>
        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#d5e0d0] text-sage-dark">
          {familyMockCapturedData.length} members
        </span>
        <button
          onClick={() => scrollCarousel('right')}
          className="w-5 h-5 rounded-full flex items-center justify-center bg-white border border-bark-muted/15 hover:bg-sage-light/30 transition-colors"
        >
          <ChevronRight className="w-3 h-3 text-bark-muted/50" />
        </button>
      </div>

      {/* Add Family Member card — at bottom */}
      <motion.button
        className="
          flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left w-full
          bg-white border border-bark-muted/10
          hover:bg-sage-light/30 transition-all cursor-pointer
        "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-sage-light/40">
          <UserPlus className="w-3.5 h-3.5 text-sage-dark" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold leading-snug text-bark">Add Family Member</p>
          <p className="text-[9px] leading-snug text-bark-muted/60 mt-0.5">Someone you forgot?</p>
        </div>
        <ChevronRight className="w-3 h-3 text-bark-muted/25 flex-shrink-0" />
      </motion.button>

      {/* Counter */}
      <div className="text-center">
        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#d5e0d0] text-sage-dark">
          {totalEntries} entries total
        </span>
      </div>
    </motion.div>
  );
}

interface ModuleCardProps {
  name: string;
  description: string;
  isComplete: boolean;
  isComingSoon?: boolean;
  stat?: ModuleStat;
  index: number;
  direction: 'left' | 'right';
  onClick: () => void;
}

interface TellAnotherCardProps {
  label: string;
  storyCount: number;
  index: number;
  direction: 'left' | 'right';
  onClick: () => void;
}

function TellAnotherCard({ label, storyCount, index, direction, onClick }: TellAnotherCardProps) {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center gap-1.5 w-[148px]"
      initial={{ opacity: 0, x: direction === 'left' ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 + 0.1 }}
    >
      <motion.button
        onClick={onClick}
        className="
          flex items-center gap-2 p-3 rounded-xl text-left w-full
          border border-dashed border-sage/40
          bg-white hover:bg-sage-light/30 hover:border-sage/60
          transition-all cursor-pointer
        "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-sage/15">
          <Plus className="w-3 h-3 text-sage-dark/60" strokeWidth={2.5} />
        </div>
        <p className="text-[12px] font-medium leading-snug text-bark-muted/70">
          {label}
        </p>
      </motion.button>
      {storyCount > 0 && (
        <p className="text-[10px] text-bark-muted/50 font-medium">
          {storyCount} {storyCount === 1 ? 'story' : 'stories'} told
        </p>
      )}
    </motion.div>
  );
}

function ModuleCard({ name, description, isComplete, isComingSoon = false, stat, index, direction, onClick }: ModuleCardProps) {
  return (
    <motion.button
      onClick={isComingSoon ? undefined : onClick}
      className={`
        relative z-10 flex flex-col gap-1.5 p-3 rounded-xl text-left w-[148px]
        transition-all shadow-sm
        ${isComingSoon
          ? 'bg-parchment-dark/30 border border-dashed border-bark-muted/20 opacity-60 cursor-default'
          : isComplete
          ? 'bg-white border border-sage/30'
          : 'bg-white border border-bark-muted/15 hover:border-sage/40 hover:shadow-md'
        }
      `}
      initial={{ opacity: 0, x: direction === 'left' ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 + 0.1 }}
    >
      {/* Status row */}
      <div className="flex items-center justify-between w-full">
        <div className={`
          w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
          ${isComingSoon ? 'bg-bark-muted/15' : isComplete ? 'bg-sage-dark' : 'bg-bark-muted/10'}
        `}>
          {isComingSoon
            ? <Lock className="w-2.5 h-2.5 text-bark-muted/40" />
            : isComplete 
            ? <Check className="w-3 h-3 text-white" strokeWidth={3} />
            : <Play className="w-2.5 h-2.5 text-bark-muted/50 ml-0.5" />
          }
        </div>
        {isComingSoon ? (
          <span className="text-[9px] font-bold tracking-wide uppercase text-bark-muted/40">Coming Soon</span>
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-bark-muted/30" />
        )}
      </div>

      {/* Title */}
      <p className={`text-[13px] font-semibold leading-snug ${isComingSoon ? 'text-bark-muted/50' : isComplete ? 'text-sage-dark' : 'text-bark'}`}>
        {name}
      </p>

      {/* Description */}
      <p className="text-[11px] leading-snug text-bark-muted/70">
        {description}
      </p>

      {/* Module-specific stat */}
      {stat && (
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[10px] font-bold text-sage-dark">
            {stat.value}
          </span>
          <span className="text-[10px] text-bark-muted/60">
            {stat.label}
          </span>
        </div>
      )}
    </motion.button>
  );
}
