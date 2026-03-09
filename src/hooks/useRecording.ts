"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { RecordingStatus } from "@/types";

interface UseRecordingOptions {
  mockTranscription?: string;
  mockDelay?: number; // ms before mock transcription appears
}

interface UseRecordingReturn {
  status: RecordingStatus;
  elapsedSeconds: number;
  transcription: string;
  startRecording: () => void;
  stopRecording: () => void;
  reRecord: () => void;
  submit: () => void;
  setTranscription: (text: string) => void;
  reset: () => void;
}

export function useRecording(options: UseRecordingOptions = {}): UseRecordingReturn {
  const { mockTranscription = "", mockDelay = 1500 } = options;

  const [status, setStatus] = useState<RecordingStatus>("idle");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [transcription, setTranscription] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mockTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer tick
  useEffect(() => {
    if (status === "recording") {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  // Cleanup mock timer on unmount
  useEffect(() => {
    return () => {
      if (mockTimerRef.current) clearTimeout(mockTimerRef.current);
    };
  }, []);

  const startRecording = useCallback(() => {
    setStatus("recording");
    setElapsedSeconds(0);
    setTranscription("");
  }, []);

  const stopRecording = useCallback(() => {
    setStatus("reviewing");
    // Simulate transcription appearing after a delay
    if (mockTranscription) {
      mockTimerRef.current = setTimeout(() => {
        setTranscription(mockTranscription);
      }, mockDelay);
    }
  }, [mockTranscription, mockDelay]);

  const reRecord = useCallback(() => {
    setStatus("idle");
    setElapsedSeconds(0);
    setTranscription("");
    if (mockTimerRef.current) {
      clearTimeout(mockTimerRef.current);
      mockTimerRef.current = null;
    }
  }, []);

  const submit = useCallback(() => {
    setStatus("submitted");
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setElapsedSeconds(0);
    setTranscription("");
    if (timerRef.current) clearInterval(timerRef.current);
    if (mockTimerRef.current) clearTimeout(mockTimerRef.current);
  }, []);

  return {
    status,
    elapsedSeconds,
    transcription,
    startRecording,
    stopRecording,
    reRecord,
    submit,
    setTranscription,
    reset,
  };
}
