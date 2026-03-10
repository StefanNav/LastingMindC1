"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { ProgressState, NodeId, ModuleId, PhaseId, NodeStateData } from "@/types";
import { nodeStates as initialNodeStates, userProgress } from "@/lib/mockData";
import { nodes, phases, getNodesForPhase } from "@/data/modules";

// Initial state from mock data
const initialProgressState: ProgressState = {
  completedModules: initialNodeStates
    .flatMap((ns) => ns.completedModules),
  currentPhase: 1,
  unlockedNodes: ['family', 'friends', 'favorites', 'career', 'education', 'values'],
  nodeStates: initialNodeStates.reduce((acc, ns) => {
    acc[ns.nodeId as NodeId] = ns as NodeStateData;
    return acc;
  }, {} as Record<NodeId, NodeStateData>),
  treeGrowth: userProgress.growthPercentage,
  streak: userProgress.streakDays,
  totalMemories: userProgress.memoriesRecorded,
};

interface ProgressContextValue {
  progress: ProgressState;
  getNodeState: (nodeId: NodeId) => NodeStateData | undefined;
  isNodeUnlocked: (nodeId: NodeId) => boolean;
  isPhaseUnlocked: (phaseId: PhaseId) => boolean;
  completeModule: (moduleId: ModuleId) => void;
  incrementStoryCount: (nodeId: NodeId) => void;
  setNodeState: (nodeId: NodeId, state: NodeStateData['state']) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

const STORAGE_KEY = 'lastingmind-progress';

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(initialProgressState);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
      } catch {
        // Invalid stored data, use initial state
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const getNodeState = useCallback((nodeId: NodeId): NodeStateData | undefined => {
    return progress.nodeStates[nodeId];
  }, [progress.nodeStates]);

  const isNodeUnlocked = useCallback((nodeId: NodeId): boolean => {
    return progress.unlockedNodes.includes(nodeId);
  }, [progress.unlockedNodes]);

  const isPhaseUnlocked = useCallback((phaseId: PhaseId): boolean => {
    const phase = phases.find((p) => p.id === phaseId);
    if (!phase) return false;
    if (phase.unlockCondition === null) return true;
    
    // Check if all nodes in the previous phase are complete
    const prevPhase = phases.find((p) => p.id === phase.unlockCondition);
    if (!prevPhase) return false;
    
    return prevPhase.nodes.every((nodeId) => {
      const state = progress.nodeStates[nodeId as NodeId];
      return state?.state === 'complete';
    });
  }, [progress.nodeStates]);

  const completeModule = useCallback((moduleId: ModuleId) => {
    setProgress((prev) => {
      if (prev.completedModules.includes(moduleId)) return prev;
      
      // Find which node this module belongs to
      const nodeId = Object.values(nodes).find((n) => 
        n.modules.includes(moduleId)
      )?.id;
      
      if (!nodeId) return prev;

      const newCompletedModules = [...prev.completedModules, moduleId];
      const nodeState = prev.nodeStates[nodeId];
      
      // Check if all required modules for this node are complete
      const node = nodes[nodeId];
      const allModulesComplete = node.modules.every((m) => 
        newCompletedModules.includes(m)
      );

      // Phase 4 (Keep Growing) nodes never transition to 'complete'
      const isKeepGrowingNode = node.phase === 4;
      const newState = isKeepGrowingNode
        ? 'active'
        : allModulesComplete ? 'complete' : 'active';

      const newNodeStates = {
        ...prev.nodeStates,
        [nodeId]: {
          ...nodeState,
          completedModules: [...nodeState.completedModules, moduleId],
          state: newState,
        },
      };

      // Calculate new tree growth
      const totalModules = Object.values(nodes).reduce((sum, n) => sum + n.modules.length, 0);
      const newTreeGrowth = Math.round((newCompletedModules.length / totalModules) * 100);

      return {
        ...prev,
        completedModules: newCompletedModules,
        nodeStates: newNodeStates,
        treeGrowth: newTreeGrowth,
        totalMemories: prev.totalMemories + 1,
      };
    });
  }, []);

  const incrementStoryCount = useCallback((nodeId: NodeId) => {
    setProgress((prev) => {
      const nodeState = prev.nodeStates[nodeId];
      if (!nodeState) return prev;

      return {
        ...prev,
        nodeStates: {
          ...prev.nodeStates,
          [nodeId]: {
            ...nodeState,
            storyCount: nodeState.storyCount + 1,
          },
        },
        totalMemories: prev.totalMemories + 1,
      };
    });
  }, []);

  const setNodeState = useCallback((nodeId: NodeId, state: NodeStateData['state']) => {
    setProgress((prev) => {
      const nodeState = prev.nodeStates[nodeId];
      if (!nodeState) return prev;

      return {
        ...prev,
        nodeStates: {
          ...prev.nodeStates,
          [nodeId]: {
            ...nodeState,
            state,
          },
        },
      };
    });
  }, []);

  const value: ProgressContextValue = {
    progress,
    getNodeState,
    isNodeUnlocked,
    isPhaseUnlocked,
    completeModule,
    incrementStoryCount,
    setNodeState,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
