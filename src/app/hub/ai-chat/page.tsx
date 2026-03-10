"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AIChatPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-parchment">
      <div className="max-w-2xl mx-auto px-5 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-bark-muted hover:text-bark transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <motion.div
          className="flex flex-col items-center text-center pt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-sage-light/50 flex items-center justify-center mb-4">
            <MessageCircle className="w-7 h-7 text-sage-dark" />
          </div>
          <h1 className="font-display text-2xl text-bark mb-2">AI Chat</h1>
          <p className="text-bark-muted text-sm max-w-[280px]">
            Chat with your AI companion about your memories and life story. This feature is coming soon.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
