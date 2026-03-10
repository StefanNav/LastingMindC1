"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Heart, 
  Star, 
  Briefcase, 
  GraduationCap, 
  Compass,
  BookOpen,
  Lightbulb,
  Mail,
  MessageCircle,
  FileText,
  SearchCheck,
  CalendarHeart,
  MessageCircleHeart,
  RefreshCw,
  Lock,
  Check,
  ChevronDown,
  ChevronUp,
  Baby,
  School,
  Rocket,
  Sunset,
  Zap,
  Key,
} from "lucide-react";
import type { NodeId } from "@/types";

type NodeState = 'locked' | 'suggested' | 'active' | 'complete';

interface NodeBubbleProps {
  nodeId: NodeId;
  name: string;
  state: NodeState;
  storyCount: number;
  totalModules: number;
  completedModules: number;
  color: string;
  isLeft: boolean;
  isExpanded?: boolean;
  isKeepGrowing?: boolean;
  keepGrowingCountLabel?: string;
  onClick?: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Heart,
  Star,
  Briefcase,
  GraduationCap,
  Compass,
  BookOpen,
  Lightbulb,
  Mail,
  MessageCircle,
  FileText,
  SearchCheck,
  CalendarHeart,
  MessageCircleHeart,
  RefreshCw,
  Baby,
  School,
  Rocket,
  Sunset,
  Zap,
  Key,
};

const nodeIconMap: Record<NodeId, string> = {
  family: 'Users',
  friends: 'Heart',
  favorites: 'Star',
  career: 'Briefcase',
  education: 'GraduationCap',
  values: 'Compass',
  chapters: 'BookOpen',
  wisdom: 'Lightbulb',
  letters: 'Mail',
  voiceMessages: 'MessageCircle',
  memoir: 'FileText',
  diveDeeper: 'SearchCheck',
  lifeUpdates: 'CalendarHeart',
  familyCorner: 'MessageCircleHeart',
  moreRounds: 'RefreshCw',
  chapterChildhood: 'Baby',
  chapterSchool: 'School',
  chapterCollege: 'GraduationCap',
  chapterEarlyCareer: 'Rocket',
  chapterLaterLife: 'Sunset',
  wisdomQuick: 'Zap',
  wisdomLessons: 'Lightbulb',
  wisdomKeys: 'Key',
};

export default function NodeBubble({
  nodeId,
  name,
  state,
  storyCount,
  totalModules,
  completedModules,
  color,
  isLeft,
  isExpanded = false,
  isKeepGrowing = false,
  keepGrowingCountLabel = 'entries',
  onClick,
}: NodeBubbleProps) {
  const iconName = nodeIconMap[nodeId];
  const IconComponent = iconMap[iconName] || Star;

  const isClickable = state !== 'locked';
  
  // Calculate border segments for progress indicator
  const segmentCount = totalModules || 1;
  const completedCount = completedModules || 0;
  
  // State-based styles
  const stateStyles = {
    locked: {
      bg: 'bg-white',
      text: 'text-bark-muted/50',
      iconBg: 'bg-bark-muted/8',
      iconColor: 'text-bark-muted/40',
      statusColor: 'text-bark-muted/40',
    },
    suggested: {
      bg: 'bg-white',
      text: 'text-sage-dark',
      iconBg: 'bg-sage/20',
      iconColor: 'text-sage-dark',
      statusColor: 'text-sage-dark/60',
    },
    active: {
      bg: 'bg-white',
      text: 'text-bark',
      iconBg: 'bg-sage-light/50',
      iconColor: 'text-sage-dark',
      statusColor: 'text-amber',
    },
    complete: {
      bg: 'bg-white',
      text: 'text-bark',
      iconBg: 'bg-sage-dark/10',
      iconColor: 'text-sage-dark',
      statusColor: 'text-sage-dark/70',
    },
  };

  const styles = stateStyles[state];

  // SVG dimensions for the segmented border
  const width = 180;
  const height = 72;
  const borderRadius = 16;
  const strokeWidth = 2.5;
  
  // Calculate perimeter of rounded rectangle
  const straightWidth = width - 2 * borderRadius;
  const straightHeight = height - 2 * borderRadius;
  const cornerArc = (Math.PI * borderRadius) / 2;
  const perimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
  
  // Calculate segment sizes with gaps
  const gapSize = 6;
  const totalGaps = segmentCount * gapSize;
  const availablePerimeter = perimeter - totalGaps;
  const segmentSize = availablePerimeter / segmentCount;

  // Status label
  const statusLabel = isKeepGrowing
    ? `${storyCount} ${keepGrowingCountLabel}`
    : state === 'complete'
    ? `${completedCount}/${segmentCount} complete`
    : state === 'active'
    ? `${completedCount}/${segmentCount} in progress`
    : state === 'suggested'
    ? 'Tap to begin'
    : 'Locked';

  return (
    <motion.button
      onClick={isClickable ? onClick : undefined}
      disabled={!isClickable}
      className={`
        relative flex flex-col gap-1.5 p-3.5 rounded-2xl w-[152px]
        transition-all duration-300
        ${styles.bg}
        ${state === 'locked' ? 'border border-dashed border-bark-muted/20' : ''}
        ${isExpanded ? 'shadow-lg ring-2 ring-sage-dark/30' : 'shadow-sm'}
        ${isClickable ? 'cursor-pointer hover:shadow-md active:scale-[0.98]' : 'cursor-not-allowed'}
      `}
      whileHover={isClickable ? { scale: 1.02 } : undefined}
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Segmented progress border - only show for non-locked states */}
      {state !== 'locked' && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          {Array.from({ length: segmentCount }).map((_, i) => {
            const isCompleted = i < completedCount;
            const dashOffset = -(i * (segmentSize + gapSize));
            
            return (
              <rect
                key={i}
                x={strokeWidth / 2}
                y={strokeWidth / 2}
                width={width - strokeWidth}
                height={height - strokeWidth}
                rx={borderRadius - strokeWidth / 2}
                ry={borderRadius - strokeWidth / 2}
                fill="none"
                stroke={isCompleted ? '#3A6B2A' : '#3A6B2A30'}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segmentSize} ${perimeter - segmentSize}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      )}

      {/* Top row: icon + name */}
      <div className="flex items-start gap-2 w-full">
        <div className={`
          w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0
          ${styles.iconBg}
        `}>
          {state === 'locked' ? (
            <Lock className={`w-4 h-4 ${styles.iconColor}`} />
          ) : (
            <IconComponent className={`w-4.5 h-4.5 ${styles.iconColor}`} />
          )}
        </div>
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className={`font-display text-[15px] leading-tight ${styles.text}`}>
            {name}
          </span>
          <span className={`text-[10px] font-semibold tracking-wide ${styles.statusColor}`}>
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Expand indicator for clickable nodes */}
      {isClickable && (
        <div className="flex items-center justify-center w-full pt-0.5">
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-sage-dark/50" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-sage-dark/50" />
          )}
        </div>
      )}

      {/* Complete indicator */}
      {state === 'complete' && (
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-sage-dark flex items-center justify-center shadow-sm">
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </div>
      )}

      {/* Suggested pulse animation */}
      {state === 'suggested' && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-sage"
          animate={{ 
            scale: [1, 1.04, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
}
