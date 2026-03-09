"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useRef, useCallback } from "react";
import { useDemoMode } from "@/contexts/DemoModeContext";

interface HeaderProps {
  streakDays: number;
  userName?: string;
}

export default function Header({ streakDays, userName = "S" }: HeaderProps) {
  const { toggleDemoMode } = useDemoMode();
  const tapCountRef = useRef(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoTap = useCallback(() => {
    tapCountRef.current += 1;

    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    if (tapCountRef.current >= 3) {
      tapCountRef.current = 0;
      toggleDemoMode();
    } else {
      tapTimeoutRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 500);
    }
  }, [toggleDemoMode]);

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-md bg-parchment/80 border-b border-bark-muted/8"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between px-5 py-3.5 lg:max-w-none lg:px-8">
        <button 
          onClick={handleLogoTap}
          className="flex items-center gap-2.5 select-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sage-dark to-sage flex items-center justify-center shadow-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M12 22C12 22 4 16 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10C20 16 12 22 12 22Z"
                fill="currentColor"
                opacity="0.3"
              />
              <path
                d="M12 2C12 2 12 8 12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 8C14 6 16 6 17 7"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M12 11C10 9 8 9 7 10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-display text-lg text-bark tracking-tight">
            Lasting Mind
          </span>
        </button>

        <div className="flex items-center gap-3">
          {/* Streak badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-glow/50 border border-amber-light/30">
            <Flame className="w-3.5 h-3.5 text-amber" />
            <span className="text-xs font-bold text-amber">
              {streakDays}
            </span>
          </div>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-light to-rose flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
