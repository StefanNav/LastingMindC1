"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, RotateCcw, Send, Keyboard, MicOff } from "lucide-react";
import { useRecording } from "@/hooks/useRecording";
import { transitions, animations } from "@/lib/animations";

interface VoiceRecorderProps {
  onSubmit: (text: string) => void;
  mockTranscription?: string;
  placeholder?: string;
  submitLabel?: string;
}

export default function VoiceRecorder({
  onSubmit,
  mockTranscription = "",
  placeholder = "Tap the mic to start recording...",
  submitLabel = "Continue",
}: VoiceRecorderProps) {
  const [isTextMode, setIsTextMode] = useState(false);
  const [textInput, setTextInput] = useState("");

  const {
    status,
    elapsedSeconds,
    transcription,
    startRecording,
    stopRecording,
    reRecord,
    submit,
    setTranscription,
    reset,
  } = useRecording({ mockTranscription, mockDelay: 800 });

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubmit = useCallback(() => {
    const text = isTextMode ? textInput : transcription;
    if (!text.trim()) return;
    submit();
    onSubmit(text.trim());
    // Reset for next prompt
    setTimeout(() => {
      reset();
      setTextInput("");
    }, 300);
  }, [isTextMode, textInput, transcription, submit, onSubmit, reset]);

  const toggleInputMode = useCallback(() => {
    setIsTextMode((prev) => !prev);
    reset();
    setTextInput("");
  }, [reset]);

  // Auto-stop recording after 8 seconds for demo feel
  useEffect(() => {
    if (status === "recording" && elapsedSeconds >= 8) {
      stopRecording();
    }
  }, [status, elapsedSeconds, stopRecording]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Mode toggle */}
      <div className="flex items-center justify-center mb-6">
        <button
          onClick={toggleInputMode}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-bark-muted hover:text-bark hover:bg-sage-light/30 transition-all"
        >
          {isTextMode ? (
            <>
              <Mic className="w-3.5 h-3.5" />
              Switch to Voice
            </>
          ) : (
            <>
              <Keyboard className="w-3.5 h-3.5" />
              Switch to Text
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isTextMode ? (
          /* ── Text Input Mode ── */
          <motion.div
            key="text-mode"
            className="w-full max-w-md"
            {...animations.fadeInUp}
            transition={transitions.gentle}
          >
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={placeholder}
              rows={4}
              className="w-full p-4 rounded-xl bg-warm-white border border-bark-muted/15 text-bark font-body text-base resize-none focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage/40 placeholder:text-bark-muted/50"
            />
            <motion.button
              onClick={handleSubmit}
              disabled={!textInput.trim()}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-sage-dark text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md active:scale-[0.98] transition-all"
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              {submitLabel}
            </motion.button>
          </motion.div>
        ) : (
          /* ── Voice Recording Mode ── */
          <motion.div
            key="voice-mode"
            className="flex flex-col items-center w-full max-w-md"
            {...animations.fadeInUp}
            transition={transitions.gentle}
          >
            {/* Waveform area */}
            <div className="relative w-full h-20 mb-6 flex items-center justify-center overflow-hidden rounded-xl bg-sage-light/20">
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.p
                    key="idle-hint"
                    className="text-sm text-bark-muted/60"
                    {...animations.crossfade}
                    transition={{ duration: 0.2 }}
                  >
                    {placeholder}
                  </motion.p>
                )}

                {status === "recording" && (
                  <motion.div
                    key="waveform"
                    className="flex items-center gap-[3px] h-full px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {Array.from({ length: 32 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[3px] rounded-full bg-sage-dark"
                        animate={{
                          height: [
                            8 + Math.random() * 12,
                            16 + Math.random() * 40,
                            8 + Math.random() * 12,
                          ],
                        }}
                        transition={{
                          duration: 0.4 + Math.random() * 0.4,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 0.03,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                {status === "reviewing" && (
                  <motion.div
                    key="reviewing"
                    className="flex items-center gap-[3px] h-full px-4"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 0.5 }}
                  >
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-[3px] rounded-full bg-sage-dark/50"
                        style={{ height: 8 + Math.random() * 30 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Timer (recording state) */}
            <AnimatePresence>
              {status === "recording" && (
                <motion.div
                  className="flex items-center gap-2 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm font-mono font-semibold text-bark-muted">
                    {formatTime(elapsedSeconds)}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Transcription preview (reviewing state) */}
            <AnimatePresence>
              {status === "reviewing" && (
                <motion.div
                  className="w-full mb-4 p-4 rounded-xl bg-warm-white border border-bark-muted/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={transitions.gentle}
                >
                  {transcription ? (
                    <p className="text-sm text-bark leading-relaxed italic">
                      &ldquo;{transcription}&rdquo;
                    </p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                      <span className="text-sm text-bark-muted">
                        Processing...
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {status === "idle" && (
                <motion.button
                  onClick={startRecording}
                  className="w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-full bg-sage-dark flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(58, 107, 42, 0.3)",
                      "0 0 0 12px rgba(58, 107, 42, 0)",
                      "0 0 0 0 rgba(58, 107, 42, 0.3)",
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity },
                  }}
                >
                  <Mic className="w-6 h-6 text-white" />
                </motion.button>
              )}

              {status === "recording" && (
                <motion.button
                  onClick={stopRecording}
                  className="w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-full bg-red-500 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={transitions.snappy}
                >
                  <Square className="w-6 h-6 text-white" fill="white" />
                </motion.button>
              )}

              {status === "reviewing" && (
                <>
                  <motion.button
                    onClick={reRecord}
                    className="w-12 h-12 rounded-full bg-bark-muted/10 flex items-center justify-center hover:bg-bark-muted/20 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, ...transitions.gentle }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-5 h-5 text-bark-muted" />
                  </motion.button>

                  <motion.button
                    onClick={handleSubmit}
                    disabled={!transcription}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-sage-dark text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition-all"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, ...transitions.gentle }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-4 h-4" />
                    {submitLabel}
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
