"use client";

import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, Lock, Play } from "lucide-react";
import NodeBubble from "./NodeBubble";
import { phases, nodes, modules as modulesData, getModulesForNode } from "@/data/modules";
import type { NodeId, PhaseId } from "@/types";
import type { NodeStateData, ModuleStat } from "@/lib/mockData";

interface TapRootProps {
  nodeStates: NodeStateData[];
}

export default function TapRoot({ nodeStates }: TapRootProps) {
  const router = useRouter();
  const [expandedNode, setExpandedNode] = useState<NodeId | null>(null);
  
  // Create a map for quick lookup
  const stateMap = nodeStates.reduce((acc, ns) => {
    acc[ns.nodeId] = ns;
    return acc;
  }, {} as Record<string, NodeStateData>);

  const handleNodeClick = (nodeId: NodeId, state: NodeStateData['state']) => {
    if (state === 'locked') return;
    
    // Toggle expand/collapse
    setExpandedNode((prev) => (prev === nodeId ? null : nodeId));
  };

  const handleModuleClick = (moduleId: string) => {
    router.push(`/module/${moduleId}`);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8 px-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-bark-muted/20 to-transparent" />
        <h2 className="font-display text-xl text-bark-light whitespace-nowrap">
          Your Journey
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-bark-muted/20 to-transparent" />
      </div>

      <div className="relative">
        {/* Central trunk line */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px]">
          <div className="w-full h-full bg-gradient-to-b from-sage-dark/50 via-sage/40 to-sage-light/30 rounded-full" />
        </div>

        <LayoutGroup>
          <div className="space-y-0">
            {phases.map((phase) => (
              <PhaseSection
                key={phase.id}
                phaseId={phase.id}
                phaseName={phase.name}
                nodeIds={phase.nodes as NodeId[]}
                stateMap={stateMap}
                expandedNode={expandedNode}
                onNodeClick={handleNodeClick}
                onModuleClick={handleModuleClick}
              />
            ))}
          </div>
        </LayoutGroup>

        {/* End cap */}
        <motion.div
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
            Keep growing your story
          </p>
        </motion.div>
      </div>
    </div>
  );
}

interface PhaseSectionProps {
  phaseId: PhaseId;
  phaseName: string;
  nodeIds: NodeId[];
  stateMap: Record<string, NodeStateData>;
  expandedNode: NodeId | null;
  onNodeClick: (nodeId: NodeId, state: NodeStateData['state']) => void;
  onModuleClick: (moduleId: string) => void;
}

function PhaseSection({ phaseId, phaseName, nodeIds, stateMap, expandedNode, onNodeClick, onModuleClick }: PhaseSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  
  // Check if phase is locked (all nodes locked)
  const isLocked = nodeIds.every((id) => stateMap[id]?.state === 'locked');

  return (
    <motion.div 
      ref={ref}
      className="relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Phase label */}
      <div className="flex items-center justify-center mb-4 mt-6">
        <div className={`
          px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase
          ${isLocked 
            ? 'bg-bark-muted/10 text-bark-muted/50' 
            : 'bg-sage-light/50 text-sage-dark'
          }
        `}>
          {typeof phaseId === 'number' ? `Phase ${phaseId}` : 'Ongoing'}: {phaseName}
        </div>
      </div>

      {/* Nodes */}
      <div className="space-y-5">
        {nodeIds.map((nodeId, index) => {
          const node = nodes[nodeId];
          const nodeState = stateMap[nodeId];
          const isLeft = index % 2 === 0;
          const isExpanded = expandedNode === nodeId;

          if (!node || !nodeState) return null;

          return (
            <div key={nodeId}>
              <NodeRow
                nodeId={nodeId}
                name={node.name}
                state={nodeState.state}
                storyCount={nodeState.storyCount}
                totalModules={node.modules.length}
                completedModules={nodeState.completedModules.length}
                color={node.color}
                isLeft={isLeft}
                isExpanded={isExpanded}
                index={index}
                onClick={() => onNodeClick(nodeId, nodeState.state)}
              />

              {/* Module branches */}
              <AnimatePresence>
                {isExpanded && nodeState.state !== 'locked' && (
                  <ModuleBranch
                    nodeId={nodeId}
                    isLeft={isLeft}
                    completedModules={nodeState.completedModules}
                    moduleStats={nodeState.moduleStats}
                    onModuleClick={onModuleClick}
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
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
  onClick: () => void;
}

function NodeRow({ nodeId, name, state, storyCount, totalModules, completedModules, color, isLeft, isExpanded, index, onClick }: NodeRowProps) {
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
            onClick={onClick}
          />
        </div>
      ) : (
        <div />
      )}
    </motion.div>
  );
}

interface ModuleBranchProps {
  nodeId: NodeId;
  isLeft: boolean;
  completedModules: string[];
  moduleStats?: Record<string, ModuleStat>;
  onModuleClick: (moduleId: string) => void;
}

function ModuleBranch({ nodeId, isLeft, completedModules, moduleStats, onModuleClick }: ModuleBranchProps) {
  const nodeModules = getModulesForNode(nodeId);

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
            const stat = moduleStats?.[mod.id];
            return (
              <ModuleCard
                key={mod.id}
                name={mod.name}
                description={mod.description}
                isComplete={isComplete}
                stat={stat}
                index={i}
                direction="left"
                onClick={() => onModuleClick(mod.id)}
              />
            );
          })}
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
            const stat = moduleStats?.[mod.id];
            return (
              <ModuleCard
                key={mod.id}
                name={mod.name}
                description={mod.description}
                isComplete={isComplete}
                stat={stat}
                index={i}
                direction="right"
                onClick={() => onModuleClick(mod.id)}
              />
            );
          })}
        </div>
      ) : (
        <div />
      )}
    </motion.div>
  );
}

interface ModuleCardProps {
  name: string;
  description: string;
  isComplete: boolean;
  stat?: ModuleStat;
  index: number;
  direction: 'left' | 'right';
  onClick: () => void;
}

function ModuleCard({ name, description, isComplete, stat, index, direction, onClick }: ModuleCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative z-10 flex flex-col gap-1.5 p-3 rounded-xl text-left w-[148px]
        transition-all shadow-sm
        ${isComplete
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
          ${isComplete ? 'bg-sage-dark' : 'bg-bark-muted/10'}
        `}>
          {isComplete 
            ? <Check className="w-3 h-3 text-white" strokeWidth={3} />
            : <Play className="w-2.5 h-2.5 text-bark-muted/50 ml-0.5" />
          }
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-bark-muted/30" />
      </div>

      {/* Title */}
      <p className={`text-[13px] font-semibold leading-snug ${isComplete ? 'text-sage-dark' : 'text-bark'}`}>
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
