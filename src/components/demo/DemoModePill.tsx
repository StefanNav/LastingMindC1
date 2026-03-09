"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Sparkles } from "lucide-react";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { getFlowById } from "@/data/demoFlows";

export default function DemoModePill() {
  const { isActive, selectedFlow, openOverlay } = useDemoMode();

  const currentFlow = selectedFlow ? getFlowById(selectedFlow) : null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.button
          onClick={openOverlay}
          className="fixed bottom-6 left-6 z-[90] flex items-center gap-2 px-4 py-2.5 rounded-full bg-sage-dark text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {currentFlow ? currentFlow.name : 'Demo Mode'}
          </span>
          <ChevronUp className="w-4 h-4 opacity-70" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
