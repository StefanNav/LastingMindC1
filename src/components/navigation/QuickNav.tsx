"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { phases } from "@/data/modules";
import type { PhaseId } from "@/types";

interface QuickNavProps {
  currentPhase: PhaseId;
  onPhaseSelect: (phaseId: PhaseId) => void;
}

export default function QuickNav({ currentPhase, onPhaseSelect }: QuickNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (phaseId: PhaseId) => {
    onPhaseSelect(phaseId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 border border-bark-muted/15 shadow-sm hover:shadow-md transition-all"
      >
        {isOpen ? (
          <X className="w-4 h-4 text-bark-muted" />
        ) : (
          <Menu className="w-4 h-4 text-bark-muted" />
        )}
        <span className="text-sm font-medium text-bark">Jump to Phase</span>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-bark-muted/10 overflow-hidden z-30"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {phases.map((phase) => {
              const isActive = phase.id === currentPhase;
              const isLocked = phase.unlockCondition !== null && phase.unlockCondition > currentPhase;

              return (
                <button
                  key={phase.id}
                  onClick={() => !isLocked && handleSelect(phase.id)}
                  disabled={isLocked}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 text-left transition-colors
                    ${isActive 
                      ? 'bg-sage-light/50' 
                      : isLocked 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-sage-light/30'
                    }
                  `}
                >
                  <div>
                    <p className={`text-sm font-medium ${isActive ? 'text-sage-dark' : 'text-bark'}`}>
                      {typeof phase.id === 'number' ? `Phase ${phase.id}` : 'Ongoing'}
                    </p>
                    <p className="text-xs text-bark-muted">{phase.name}</p>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-sage-dark" />
                  )}
                  {!isActive && !isLocked && (
                    <ChevronRight className="w-4 h-4 text-bark-muted/50" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
