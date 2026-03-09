"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-bark/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] bg-warm-white rounded-t-[1.5rem] shadow-xl overflow-hidden
                       lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:max-w-lg lg:w-full lg:rounded-[1.5rem] lg:bottom-8"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2 lg:hidden">
              <div className="w-10 h-1 rounded-full bg-bark-muted/30" />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-3 border-b border-bark-muted/10">
                <h3 className="font-display text-lg text-bark">{title}</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-bark-muted/10 transition-colors"
                >
                  <X className="w-5 h-5 text-bark-muted" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-4 overflow-y-auto max-h-[calc(85vh-80px)]">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Option item for the bottom sheet
interface SheetOptionProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
  disabled?: boolean;
}

export function SheetOption({ icon, title, description, onClick, disabled }: SheetOptionProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all
        ${disabled 
          ? 'opacity-50 cursor-not-allowed bg-bark-muted/5' 
          : 'hover:bg-sage-light/30 active:scale-[0.98] cursor-pointer'
        }
      `}
    >
      <div className="w-10 h-10 rounded-full bg-sage-light/50 flex items-center justify-center text-sage-dark">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-display text-base text-bark">{title}</p>
        {description && (
          <p className="text-sm text-bark-muted mt-0.5">{description}</p>
        )}
      </div>
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-bark-muted/50"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
}
