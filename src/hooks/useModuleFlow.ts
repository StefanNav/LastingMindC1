"use client";

import { useState, useCallback } from "react";
import type { ModuleFlowState } from "@/types";

interface UseModuleFlowOptions {
  moduleId: string;
  totalSteps: number;
  onComplete?: (responses: string[]) => void;
}

export function useModuleFlow({ moduleId, totalSteps, onComplete }: UseModuleFlowOptions) {
  const [state, setState] = useState<ModuleFlowState>({
    moduleId,
    currentStep: 0,
    totalSteps,
    responses: [],
    isComplete: false,
  });

  const advance = useCallback((response?: string) => {
    setState((prev) => {
      const newResponses = response
        ? [...prev.responses, response]
        : prev.responses;

      const nextStep = prev.currentStep + 1;
      const isComplete = nextStep >= prev.totalSteps;

      if (isComplete && onComplete) {
        // Fire onComplete after state update via microtask
        queueMicrotask(() => onComplete(newResponses));
      }

      return {
        ...prev,
        currentStep: nextStep,
        responses: newResponses,
        isComplete,
      };
    });
  }, [onComplete]);

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep <= 0) return prev;
      return {
        ...prev,
        currentStep: prev.currentStep - 1,
        isComplete: false,
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      moduleId,
      currentStep: 0,
      totalSteps,
      responses: [],
      isComplete: false,
    });
  }, [moduleId, totalSteps]);

  return {
    ...state,
    advance,
    goBack,
    reset,
  };
}
