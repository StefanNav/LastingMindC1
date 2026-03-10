"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Users, Mic, X } from "lucide-react";

interface FeatureUnlock {
  id: string;
  name: string;
  headline: string;
  icon: React.ComponentType<{ className?: string }>;
  threshold: number;
  route: string;
}

const features: FeatureUnlock[] = [
  {
    id: "ai-chat",
    name: "AI Chat",
    headline: "Unlock AI Chat",
    icon: MessageCircle,
    threshold: 25,
    route: "/hub/ai-chat",
  },
  {
    id: "invite-audience",
    name: "Invite Audience",
    headline: "Unlock Invite Audience",
    icon: Users,
    threshold: 35,
    route: "/hub/invite",
  },
  {
    id: "voice-clone",
    name: "Voice Clone",
    headline: "Unlock Voice Clone",
    icon: Mic,
    threshold: 45,
    route: "/hub/voice-clone",
  },
];

interface FeatureUnlockIconsProps {
  totalEntries: number;
}

export default function FeatureUnlockIcons({ totalEntries }: FeatureUnlockIconsProps) {
  const router = useRouter();
  const [selectedFeature, setSelectedFeature] = useState<FeatureUnlock | null>(null);

  const handleTap = (feature: FeatureUnlock) => {
    setSelectedFeature(feature);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-6">
        {features.map((feature) => {
          const progress = Math.min(totalEntries / feature.threshold, 1);
          const isUnlocked = totalEntries >= feature.threshold;

          return (
            <FeatureIcon
              key={feature.id}
              feature={feature}
              progress={progress}
              isUnlocked={isUnlocked}
              onTap={() => handleTap(feature)}
            />
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <FeatureModal
            feature={selectedFeature}
            totalEntries={totalEntries}
            onClose={() => setSelectedFeature(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface FeatureIconProps {
  feature: FeatureUnlock;
  progress: number;
  isUnlocked: boolean;
  onTap: () => void;
}

function FeatureIcon({ feature, progress, isUnlocked, onTap }: FeatureIconProps) {
  const Icon = feature.icon;
  const size = 52;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filledLength = circumference * progress;

  return (
    <motion.button
      onClick={onTap}
      className="relative flex items-center justify-center"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Progress ring */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bark-muted)"
          strokeWidth={strokeWidth}
          opacity={0.15}
        />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isUnlocked ? "var(--sage-dark)" : "var(--sage)"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - filledLength }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />
      </svg>

      {/* Icon */}
      <div
        className={`w-[${size}px] h-[${size}px] flex items-center justify-center`}
        style={{ width: size, height: size }}
      >
        <Icon
          className={`w-5 h-5 transition-colors ${
            isUnlocked ? "text-sage-dark" : "text-bark-muted/50"
          }`}
        />
      </div>
    </motion.button>
  );
}

interface FeatureModalProps {
  feature: FeatureUnlock;
  totalEntries: number;
  onClose: () => void;
}

function FeatureModal({ feature, totalEntries, onClose }: FeatureModalProps) {
  const Icon = feature.icon;
  const progress = Math.min(totalEntries / feature.threshold, 1);
  const percentage = Math.round(progress * 100);
  const remaining = Math.max(feature.threshold - totalEntries, 0);

  const ringSize = 64;
  const ringStroke = 3.5;
  const ringRadius = (ringSize - ringStroke) / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringFilled = ringCircumference * progress;

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-bark/25 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-6 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-[300px] bg-warm-white rounded-2xl shadow-xl p-6 pointer-events-auto"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center hover:bg-bark-muted/10 transition-colors"
          >
            <X className="w-4 h-4 text-bark-muted" />
          </button>

          {/* Icon + ring */}
          <div className="flex justify-center mb-4">
            <div className="relative flex items-center justify-center">
              <svg
                width={ringSize}
                height={ringSize}
                className="absolute"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={ringRadius}
                  fill="none"
                  stroke="var(--bark-muted)"
                  strokeWidth={ringStroke}
                  opacity={0.15}
                />
                <motion.circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={ringRadius}
                  fill="none"
                  stroke="var(--sage)"
                  strokeWidth={ringStroke}
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  initial={{ strokeDashoffset: ringCircumference }}
                  animate={{ strokeDashoffset: ringCircumference - ringFilled }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>
              <div style={{ width: ringSize, height: ringSize }} className="flex items-center justify-center">
                <Icon className="w-6 h-6 text-bark-muted/50" />
              </div>
            </div>
          </div>

          {/* Headline */}
          <h3 className="font-display text-lg text-bark text-center mb-1">
            {feature.headline}
          </h3>

          {/* Percentage */}
          <p className="text-sm font-bold text-bark text-center mb-1">
            {percentage}% complete
          </p>

          {/* Remaining */}
          <p className="text-[13px] text-sage-dark/70 text-center mb-4">
            {remaining} more {remaining === 1 ? "entry" : "entries"} to unlock
          </p>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-bark-muted/10 mb-5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sage to-sage-dark"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          {/* CTA */}
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-sage-dark text-white text-sm font-semibold transition-colors hover:bg-sage-dark/90 active:scale-[0.98]"
          >
            Got it
          </button>
        </motion.div>
      </motion.div>
    </>
  );
}
