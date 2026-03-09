"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import VoiceRecorder from "./VoiceRecorder";
import ValidationTable from "./ValidationTable";
import StoryCardComponent, { FutureQuestionPreview } from "./StoryCard";
import { transitions, animations } from "@/lib/animations";
import type {
  PromptStep,
  ValidationColumn,
  ValidationRow,
  StoryCard,
  NodeId,
} from "@/types";

// ── Capture mode props ──
interface CaptureProps {
  mode: "capture";
  prompts: PromptStep[];
  moduleId: string;
  nodeId: NodeId;
  validationColumns: ValidationColumn[];
  mockCapturedData: ValidationRow[];
  onComplete: (data: ValidationRow[]) => void;
  storyCard?: never;
  futureQuestion?: never;
  futureAnswer?: never;
}

// ── Story mode props ──
interface StoryProps {
  mode: "story";
  prompts: PromptStep[];
  moduleId: string;
  nodeId: NodeId;
  validationColumns?: never;
  mockCapturedData?: never;
  onComplete: (card: StoryCard) => void;
  storyCard: StoryCard;
  futureQuestion?: string;
  futureAnswer?: string;
}

type VoiceConversationProps = CaptureProps | StoryProps;

type ConversationPhase = "prompts" | "validation" | "storyResult" | "complete";

// Chat message in the thread
interface ChatMessage {
  id: string;
  role: "ai" | "user";
  text: string;
}

// Progress label logic
function getProgressLabel(step: number, total: number): string {
  const ratio = step / total;
  if (ratio >= 0.85) return "Wrapping up!";
  if (ratio >= 0.6) return "Almost there — just a couple more";
  return "Getting to know your family...";
}

export default function VoiceConversation(props: VoiceConversationProps) {
  const {
    mode,
    prompts,
    moduleId,
    nodeId,
    onComplete,
  } = props;

  const [phase, setPhase] = useState<ConversationPhase>("prompts");
  const [currentStep, setCurrentStep] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [waitingForUser, setWaitingForUser] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const totalSteps = prompts.length;
  const currentPrompt = prompts[currentStep] as PromptStep | undefined;

  // Seed first AI message on mount
  useEffect(() => {
    if (prompts.length > 0 && chatMessages.length === 0) {
      setChatMessages([
        { id: "ai-0", role: "ai", text: prompts[0].text },
      ]);
      setWaitingForUser(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, waitingForUser]);

  // Progress bar percentage (advances after each user response)
  const progressPercent = useMemo(() => {
    // The last prompt is a transition message, not a real user response
    const userResponses = chatMessages.filter((m) => m.role === "user").length;
    // Total user responses expected = totalSteps - 1 (last AI message transitions to validation)
    const expected = totalSteps - 1;
    return expected > 0 ? Math.min((userResponses / expected) * 100, 100) : 0;
  }, [chatMessages, totalSteps]);

  const progressLabel = useMemo(
    () => getProgressLabel(chatMessages.filter((m) => m.role === "user").length, totalSteps - 1),
    [chatMessages, totalSteps]
  );

  const handleRecordingSubmit = useCallback(
    (text: string) => {
      const nextStep = currentStep + 1;

      // Add user message
      setChatMessages((prev) => [
        ...prev,
        { id: `user-${currentStep}`, role: "user", text },
      ]);
      setWaitingForUser(false);

      // Check if there's a next AI prompt
      if (nextStep < totalSteps) {
        // Add next AI message after a brief delay for conversational feel
        setTimeout(() => {
          setChatMessages((prev) => [
            ...prev,
            { id: `ai-${nextStep}`, role: "ai", text: prompts[nextStep].text },
          ]);
          setCurrentStep(nextStep);

          // If the last prompt has no mockTranscription, it's the transition prompt
          const nextPrompt = prompts[nextStep];
          if (nextPrompt.mockTranscription === "" || nextPrompt.mockTranscription === undefined) {
            // This is the final AI message — transition to validation after a pause
            setTimeout(() => {
              if (mode === "capture") {
                setPhase("validation");
              } else {
                setPhase("storyResult");
              }
            }, 2000);
          } else {
            setWaitingForUser(true);
          }
        }, 600);
      } else {
        // No more prompts — transition
        setTimeout(() => {
          if (mode === "capture") {
            setPhase("validation");
          } else {
            setPhase("storyResult");
          }
        }, 800);
      }
    },
    [currentStep, totalSteps, prompts, mode]
  );

  const handleValidationConfirm = useCallback(
    (data: ValidationRow[]) => {
      setPhase("complete");
      if (mode === "capture") {
        (onComplete as CaptureProps["onComplete"])(data);
      }
    },
    [mode, onComplete]
  );

  const handleStoryDone = useCallback(() => {
    setPhase("complete");
    if (mode === "story") {
      (onComplete as StoryProps["onComplete"])(props.storyCard);
    }
  }, [mode, onComplete, props]);

  return (
    <div className="flex flex-col w-full h-full">
      <AnimatePresence mode="wait">
        {/* ── Chat Phase ── */}
        {phase === "prompts" && (
          <motion.div
            key="chat-phase"
            className="flex flex-col w-full"
            style={{ minHeight: "calc(100vh - 60px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Progress bar + label */}
            <div className="sticky top-[53px] z-40 bg-parchment/90 backdrop-blur-sm px-5 pt-3 pb-2">
              <div className="max-w-lg mx-auto">
                <motion.p
                  key={progressLabel}
                  className="text-xs font-medium text-sage-dark mb-1.5"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {progressLabel}
                </motion.p>
                <div className="w-full h-1 rounded-full bg-sage-light/40 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-sage-dark"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* Scrollable chat thread */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-5 pb-64"
            >
              <div className="max-w-lg mx-auto pt-4 space-y-4">
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={transitions.gentle}
                  >
                    {msg.role === "ai" ? (
                      /* AI bubble — left aligned */
                      <div className="flex items-start gap-2.5 max-w-[88%]">
                        <div className="w-8 h-8 rounded-full bg-sage-light/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MessageCircle className="w-4 h-4 text-sage-dark" />
                        </div>
                        <div className="bg-warm-white rounded-2xl rounded-tl-sm px-4 py-3 border border-bark-muted/8 shadow-sm">
                          <p className="text-[15px] text-bark leading-relaxed font-body">
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* User bubble — right aligned */
                      <div className="flex justify-end">
                        <div className="max-w-[82%] bg-sage-light/50 rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                          <p className="text-[15px] text-bark leading-relaxed font-body">
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Pinned bottom recording controls */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-parchment/95 backdrop-blur-md border-t border-bark-muted/8">
              <div className="max-w-lg mx-auto px-5 py-4">
                {waitingForUser && currentPrompt ? (
                  <VoiceRecorder
                    onSubmit={handleRecordingSubmit}
                    mockTranscription={currentPrompt.mockTranscription || ""}
                    placeholder="Tap the mic to respond..."
                    submitLabel="Continue"
                  />
                ) : (
                  <div className="flex items-center justify-center py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                      <span className="text-sm text-bark-muted">Listening...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Validation Phase (capture mode only) ── */}
        {phase === "validation" && mode === "capture" && (
          <motion.div
            key="validation"
            className="w-full max-w-lg mx-auto px-4 py-6"
            {...animations.fadeInUp}
            transition={transitions.gentle}
          >
            <ValidationTable
              data={props.mockCapturedData}
              columns={props.validationColumns}
              onConfirm={handleValidationConfirm}
            />
          </motion.div>
        )}

        {/* ── Story Result Phase (story mode only) ── */}
        {phase === "storyResult" && mode === "story" && (
          <motion.div
            key="story-result"
            className="w-full max-w-lg mx-auto px-4 py-6 space-y-5"
            {...animations.fadeInUp}
            transition={transitions.gentle}
          >
            <div className="text-center mb-2">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-light/50 text-sage-dark text-sm font-semibold mb-3"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, ...transitions.celebration }}
              >
                ✨ Story captured!
              </motion.div>
            </div>

            <StoryCardComponent card={props.storyCard} />

            {props.futureQuestion && props.futureAnswer && (
              <FutureQuestionPreview
                question={props.futureQuestion}
                aiResponse={props.futureAnswer}
              />
            )}

            <motion.button
              onClick={handleStoryDone}
              className="w-full mt-4 px-6 py-3.5 rounded-full bg-sage-dark text-white font-semibold shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...transitions.gentle }}
              whileTap={{ scale: 0.98 }}
            >
              Done
            </motion.button>
          </motion.div>
        )}

        {/* ── Complete Phase ── */}
        {phase === "complete" && (
          <motion.div
            key="complete"
            className="flex flex-col items-center py-12 px-4"
            {...animations.scaleIn}
            transition={transitions.celebration}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-sage-dark/10 flex items-center justify-center mb-4"
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="text-3xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              >
                🌱
              </motion.span>
            </motion.div>
            <h3 className="font-display text-2xl text-bark mb-2">
              Nice work!
            </h3>
            <p className="text-sm text-bark-muted text-center max-w-xs">
              Your responses have been saved. Your tree is growing.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
