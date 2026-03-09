"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type DemoFlowId = 
  | '00-onboarding'
  | '01a-phase1-25'
  | '01b-phase1-50'
  | '01c-phase1-75'
  | '02a-phase2-setup'
  | '02b-phase2-25'
  | '02c-phase2-75'
  | '03-phase3-setup';

interface DemoModeContextValue {
  isActive: boolean;
  selectedFlow: DemoFlowId | null;
  isOverlayOpen: boolean;
  activateDemoMode: () => void;
  deactivateDemoMode: () => void;
  toggleDemoMode: () => void;
  selectFlow: (flowId: DemoFlowId) => void;
  openOverlay: () => void;
  closeOverlay: () => void;
}

const DemoModeContext = createContext<DemoModeContextValue | null>(null);

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<DemoFlowId | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const activateDemoMode = useCallback(() => {
    setIsActive(true);
  }, []);

  const deactivateDemoMode = useCallback(() => {
    setIsActive(false);
    setSelectedFlow(null);
    setIsOverlayOpen(false);
  }, []);

  const toggleDemoMode = useCallback(() => {
    setIsActive((prev) => {
      if (prev) {
        setSelectedFlow(null);
        setIsOverlayOpen(false);
      }
      return !prev;
    });
  }, []);

  const selectFlow = useCallback((flowId: DemoFlowId) => {
    setSelectedFlow(flowId);
    setIsOverlayOpen(false);
  }, []);

  const openOverlay = useCallback(() => {
    setIsOverlayOpen(true);
  }, []);

  const closeOverlay = useCallback(() => {
    setIsOverlayOpen(false);
  }, []);

  const value: DemoModeContextValue = {
    isActive,
    selectedFlow,
    isOverlayOpen,
    activateDemoMode,
    deactivateDemoMode,
    toggleDemoMode,
    selectFlow,
    openOverlay,
    closeOverlay,
  };

  return (
    <DemoModeContext.Provider value={value}>
      {children}
    </DemoModeContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return context;
}
