"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Sparkles } from "lucide-react";
import { useDemoMode, type DemoFlowId } from "@/contexts/DemoModeContext";
import { demoFlows, type DemoFlow } from "@/data/demoFlows";

export default function DemoFlowSelector() {
  const { isOverlayOpen, closeOverlay, selectFlow, selectedFlow } = useDemoMode();

  const handleSelectFlow = (flowId: DemoFlowId) => {
    selectFlow(flowId);
  };

  // Group flows by their group property
  const onboardingFlows = demoFlows.filter((f) => f.group === 'onboarding');
  const phase1Flows = demoFlows.filter((f) => f.group === 'phase1');
  const phase2Flows = demoFlows.filter((f) => f.group === 'phase2');
  const phase3Flows = demoFlows.filter((f) => f.group === 'phase3');

  return (
    <AnimatePresence>
      {isOverlayOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-bark/60 backdrop-blur-md"
            onClick={closeOverlay}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 w-full max-w-lg max-h-[85vh] mx-4 bg-warm-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-bark-muted/10 bg-sage-light/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sage-dark" />
                <h2 className="font-display text-xl text-bark">Demo Mode</h2>
              </div>
              <button
                onClick={closeOverlay}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-bark-muted/10 transition-colors"
              >
                <X className="w-5 h-5 text-bark-muted" />
              </button>
            </div>

            {/* Flow list */}
            <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-4 space-y-6">
              <p className="text-sm text-bark-muted px-2">
                Select a user flow to simulate different states of the app for testing and demos.
              </p>

              {/* Onboarding */}
              <FlowGroup title="Onboarding" flows={onboardingFlows} selectedFlow={selectedFlow} onSelect={handleSelectFlow} />

              {/* Divider */}
              <div className="h-px bg-bark-muted/20" />

              {/* Phase 1 */}
              <FlowGroup title="Phase 1: Foundation" flows={phase1Flows} selectedFlow={selectedFlow} onSelect={handleSelectFlow} />

              {/* Divider */}
              <div className="h-px bg-bark-muted/20" />

              {/* Phase 2 */}
              <FlowGroup title="Phase 2: Life Story" flows={phase2Flows} selectedFlow={selectedFlow} onSelect={handleSelectFlow} />

              {/* Divider */}
              <div className="h-px bg-bark-muted/20" />

              {/* Phase 3 */}
              <FlowGroup title="Phase 3: Personal" flows={phase3Flows} selectedFlow={selectedFlow} onSelect={handleSelectFlow} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface FlowGroupProps {
  title: string;
  flows: DemoFlow[];
  selectedFlow: DemoFlowId | null;
  onSelect: (flowId: DemoFlowId) => void;
}

function FlowGroup({ title, flows, selectedFlow, onSelect }: FlowGroupProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-bark-muted uppercase tracking-wider px-2">
        {title}
      </h3>
      <div className="space-y-2">
        {flows.map((flow) => (
          <FlowCard
            key={flow.id}
            flow={flow}
            isSelected={selectedFlow === flow.id}
            onSelect={() => onSelect(flow.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface FlowCardProps {
  flow: DemoFlow;
  isSelected: boolean;
  onSelect: () => void;
}

function FlowCard({ flow, isSelected, onSelect }: FlowCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full text-left p-4 rounded-xl border-2 transition-all
        ${isSelected 
          ? 'border-sage-dark bg-sage-light/40 shadow-md' 
          : 'border-bark-muted/15 bg-white/60 hover:border-sage/40 hover:bg-sage-light/20'
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display text-base text-bark">{flow.name}</span>
            {isSelected && (
              <span className="px-2 py-0.5 rounded-full bg-sage-dark text-white text-[10px] font-semibold uppercase">
                Active
              </span>
            )}
          </div>
          <p className="text-sm text-bark-muted mb-2">{flow.description}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-bark-muted/10 text-bark-muted font-medium">
              {flow.phase}
            </span>
            <span className="text-bark-muted/60">•</span>
            <span className="text-bark-muted/80">{flow.stateInfo}</span>
          </div>
        </div>
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
          ${isSelected ? 'bg-sage-dark text-white' : 'bg-bark-muted/10 text-bark-muted'}
        `}>
          <Play className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
}
