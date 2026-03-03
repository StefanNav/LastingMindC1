"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface MemoryTreeProps {
  growthPercentage: number;
  memoriesCount: number;
}

export default function MemoryTree({
  growthPercentage,
  memoriesCount,
}: MemoryTreeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const g = growthPercentage / 100;

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 400 500"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="groundGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B5D1A5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#B5D1A5" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B6A4B" />
            <stop offset="100%" stopColor="#5A3A1B" />
          </linearGradient>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8EFF5" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FBF7F0" stopOpacity="0" />
          </linearGradient>
          <filter id="leafShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="1" dy="2" result="shadow" />
            <feFlood floodColor="#3A2A1C" floodOpacity="0.08" />
            <feComposite in2="shadow" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sky wash */}
        <rect x="0" y="0" width="400" height="300" fill="url(#skyGrad)" />

        {/* Ground */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <ellipse cx="200" cy="470" rx="180" ry="40" fill="url(#groundGlow)" />
          <ellipse cx="200" cy="475" rx="140" ry="25" fill="#C8D8B0" opacity="0.4" />
          <ellipse cx="200" cy="478" rx="100" ry="16" fill="#A8BE94" opacity="0.3" />
          {/* Small grass tufts */}
          <path d="M120,470 Q122,455 125,470" stroke="#7A9E6B" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M130,472 Q133,458 136,472" stroke="#8BAF7B" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M265,468 Q268,454 271,468" stroke="#7A9E6B" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M275,471 Q277,460 280,471" stroke="#6B8E5B" strokeWidth="1.2" fill="none" opacity="0.4" />
        </motion.g>

        {/* Trunk */}
        <motion.path
          d="M200,475 C199,460 197,430 198,400 C199,370 201,340 200,310 C199,280 200,250 200,220 C200,195 200,175 200,155"
          stroke="url(#trunkGrad)"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: Math.min(g * 1.5, 1) } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        {/* Trunk highlight */}
        <motion.path
          d="M203,475 C202,458 201,430 202,400 C202,370 203,340 202,310 C201,280 202,250 202,220 C202,195 202,175 202,155"
          stroke="#A88A6A"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: Math.min(g * 1.5, 1) } : {}}
          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        />

        {/* Roots */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: g > 0.1 ? 0.4 : 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <path d="M200,475 C185,480 160,485 140,482" stroke="#6B4A2B" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M200,475 C215,480 245,488 270,484" stroke="#6B4A2B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M200,475 C190,482 170,492 155,490" stroke="#6B4A2B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* Branch Layer 1 - Lower branches (visible at >15% growth) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: g > 0.15 ? 1 : 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.path
            d="M200,380 C185,370 160,358 130,345"
            stroke="#6B4A2B"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: g > 0.15 ? 1 : 0 } : {}}
            transition={{ duration: 1.5, delay: 1.2 }}
          />
          <motion.path
            d="M200,360 C218,348 250,335 285,325"
            stroke="#6B4A2B"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: g > 0.15 ? 1 : 0 } : {}}
            transition={{ duration: 1.5, delay: 1.4 }}
          />
        </motion.g>

        {/* Branch Layer 2 - Mid branches (visible at >30% growth) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: g > 0.3 ? 1 : 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.path
            d="M200,310 C178,295 145,275 108,262"
            stroke="#6B4A2B"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: g > 0.3 ? 1 : 0 } : {}}
            transition={{ duration: 1.2, delay: 1.6 }}
          />
          <motion.path
            d="M200,290 C225,275 262,260 305,248"
            stroke="#6B4A2B"
            strokeWidth="5.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: g > 0.3 ? 1 : 0 } : {}}
            transition={{ duration: 1.2, delay: 1.8 }}
          />
        </motion.g>

        {/* Branch Layer 3 - Upper branches (visible at >45% growth) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: g > 0.45 ? 1 : 0 } : {}}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.path
            d="M200,250 C180,235 150,215 118,198"
            stroke="#6B4A2B"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: g > 0.45 ? 1 : 0 } : {}}
            transition={{ duration: 1, delay: 2.1 }}
          />
          <motion.path
            d="M200,230 C222,215 258,198 295,185"
            stroke="#6B4A2B"
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: g > 0.45 ? 1 : 0 } : {}}
            transition={{ duration: 1, delay: 2.3 }}
          />
          {/* Top extension */}
          <motion.path
            d="M200,200 C199,178 198,155 200,130"
            stroke="#6B4A2B"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: g > 0.45 ? 1 : 0 } : {}}
            transition={{ duration: 1, delay: 2.5 }}
          />
        </motion.g>

        {/* Sub-branches (visible at >55% growth) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: g > 0.55 ? 0.7 : 0 } : {}}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <path d="M155,355 C145,345 130,340 115,338" stroke="#7A5A3B" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M145,350 C140,338 132,325 120,318" stroke="#7A5A3B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M260,335 C270,325 285,320 300,318" stroke="#7A5A3B" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M135,270 C125,262 108,255 92,252" stroke="#7A5A3B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M275,255 C285,248 300,242 318,240" stroke="#7A5A3B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M155,210 C142,200 125,192 108,188" stroke="#7A5A3B" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M265,195 C278,188 295,182 312,178" stroke="#7A5A3B" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M200,155 C192,140 180,125 170,115" stroke="#7A5A3B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M200,145 C210,130 225,118 238,110" stroke="#7A5A3B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* Leaf Clusters (visible at >40% growth) */}
        <motion.g
          filter="url(#leafShadow)"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            isInView
              ? { opacity: g > 0.4 ? 1 : 0, scale: g > 0.4 ? 1 : 0.6 }
              : {}
          }
          transition={{ duration: 1.5, delay: 2.8, type: "spring", stiffness: 50 }}
        >
          {/* Left lower cluster */}
          <LeafCluster cx={125} cy={340} size={1} hue={0} />
          <LeafCluster cx={108} cy={332} size={0.8} hue={1} />
          <LeafCluster cx={118} cy={315} size={0.7} hue={2} />

          {/* Right lower cluster */}
          <LeafCluster cx={290} cy={320} size={1} hue={1} />
          <LeafCluster cx={305} cy={312} size={0.85} hue={0} />
          <LeafCluster cx={295} cy={298} size={0.7} hue={2} />
        </motion.g>

        {/* More Leaf Clusters (visible at >55% growth) */}
        <motion.g
          filter="url(#leafShadow)"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            isInView
              ? { opacity: g > 0.55 ? 1 : 0, scale: g > 0.55 ? 1 : 0.6 }
              : {}
          }
          transition={{ duration: 1.5, delay: 3.2, type: "spring", stiffness: 50 }}
        >
          {/* Left mid cluster */}
          <LeafCluster cx={102} cy={258} size={1.1} hue={2} />
          <LeafCluster cx={88} cy={248} size={0.9} hue={0} />
          <LeafCluster cx={95} cy={235} size={0.75} hue={1} />

          {/* Right mid cluster */}
          <LeafCluster cx={310} cy={244} size={1.05} hue={0} />
          <LeafCluster cx={325} cy={235} size={0.85} hue={2} />
          <LeafCluster cx={315} cy={222} size={0.7} hue={1} />
        </motion.g>

        {/* Upper Leaf Clusters (visible at >65% growth) */}
        <motion.g
          filter="url(#leafShadow)"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            isInView
              ? { opacity: g > 0.65 ? 1 : 0, scale: g > 0.65 ? 1 : 0.6 }
              : {}
          }
          transition={{ duration: 1.5, delay: 3.5, type: "spring", stiffness: 50 }}
        >
          {/* Left upper cluster */}
          <LeafCluster cx={112} cy={192} size={1} hue={1} />
          <LeafCluster cx={98} cy={182} size={0.85} hue={2} />
          <LeafCluster cx={105} cy={170} size={0.7} hue={0} />

          {/* Right upper cluster */}
          <LeafCluster cx={300} cy={180} size={1} hue={2} />
          <LeafCluster cx={318} cy={172} size={0.8} hue={0} />
          <LeafCluster cx={308} cy={160} size={0.7} hue={1} />

          {/* Top cluster */}
          <LeafCluster cx={168} cy={112} size={0.9} hue={0} />
          <LeafCluster cx={200} cy={100} size={1.1} hue={1} />
          <LeafCluster cx={235} cy={108} size={0.95} hue={2} />
          <LeafCluster cx={200} cy={88} size={0.75} hue={0} />
        </motion.g>

        {/* Canopy fill (visible at >70% growth) */}
        <motion.g
          filter="url(#leafShadow)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView
              ? { opacity: g > 0.7 ? 0.7 : 0, scale: g > 0.7 ? 1 : 0.8 }
              : {}
          }
          transition={{ duration: 1.5, delay: 3.8, type: "spring", stiffness: 40 }}
        >
          <LeafCluster cx={155} cy={280} size={0.65} hue={1} />
          <LeafCluster cx={250} cy={270} size={0.7} hue={0} />
          <LeafCluster cx={175} cy={200} size={0.6} hue={2} />
          <LeafCluster cx={230} cy={190} size={0.65} hue={1} />
          <LeafCluster cx={180} cy={148} size={0.6} hue={0} />
          <LeafCluster cx={220} cy={140} size={0.6} hue={2} />
          <LeafCluster cx={150} cy={155} size={0.55} hue={1} />
          <LeafCluster cx={252} cy={148} size={0.55} hue={0} />
        </motion.g>

        {/* Flowers / Fruit (visible at >80% growth) */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isInView
              ? { opacity: g > 0.8 ? 1 : 0, scale: g > 0.8 ? 1 : 0 }
              : {}
          }
          transition={{ duration: 1, delay: 4.2, type: "spring", stiffness: 80 }}
        >
          <Flower cx={130} cy={335} />
          <Flower cx={295} cy={315} />
          <Flower cx={95} cy={245} />
          <Flower cx={320} cy={232} />
          <Flower cx={105} cy={180} />
          <Flower cx={310} cy={168} />
          <Flower cx={175} cy={105} />
          <Flower cx={225} cy={98} />
        </motion.g>

        {/* Golden fruit (visible at >90% growth) */}
        <motion.g
          filter="url(#glow)"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isInView
              ? { opacity: g > 0.9 ? 1 : 0, scale: g > 0.9 ? 1 : 0 }
              : {}
          }
          transition={{ duration: 1, delay: 4.5, type: "spring", stiffness: 100 }}
        >
          <circle cx="118" cy="320" r="5" fill="#E8C87A" />
          <circle cx="300" cy="300" r="5.5" fill="#E8C87A" />
          <circle cx="92" cy="240" r="4.5" fill="#E8C87A" />
          <circle cx="200" cy="90" r="5" fill="#E8C87A" />
          <circle cx="118" cy="320" r="2.5" fill="#F5E4B8" />
          <circle cx="300" cy="300" r="2.8" fill="#F5E4B8" />
          <circle cx="92" cy="240" r="2.2" fill="#F5E4B8" />
          <circle cx="200" cy="90" r="2.5" fill="#F5E4B8" />
        </motion.g>
      </svg>

      {/* Progress label beneath the tree */}
      <motion.div
        className="text-center mt-2 space-y-1"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <p className="font-display text-lg text-bark-light tracking-wide">
          Your Story Tree
        </p>
        <div className="flex items-center justify-center gap-3 text-sm text-bark-muted">
          <span>{memoriesCount} memories</span>
          <span className="w-1 h-1 rounded-full bg-bark-muted" />
          <span>{growthPercentage}% grown</span>
        </div>
        <div className="mx-auto mt-2 w-48 h-1.5 rounded-full bg-parchment-dark overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sage-dark to-sage"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${growthPercentage}%` } : {}}
            transition={{ duration: 2, delay: 2, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

const LEAF_COLORS = [
  ["#7A9E6B", "#6B8E5B", "#8BAF7B"],
  ["#8BAF7B", "#7A9E6B", "#A5C48B"],
  ["#6B8E5B", "#5A7A4A", "#7A9E6B"],
];

function LeafCluster({
  cx,
  cy,
  size,
  hue,
}: {
  cx: number;
  cy: number;
  size: number;
  hue: number;
}) {
  const colors = LEAF_COLORS[hue % LEAF_COLORS.length];
  const r = 18 * size;

  return (
    <g>
      <ellipse cx={cx - r * 0.4} cy={cy + r * 0.2} rx={r} ry={r * 0.85} fill={colors[0]} opacity="0.75" />
      <ellipse cx={cx + r * 0.35} cy={cy - r * 0.15} rx={r * 0.9} ry={r * 0.8} fill={colors[1]} opacity="0.7" />
      <ellipse cx={cx} cy={cy - r * 0.3} rx={r * 0.85} ry={r * 0.75} fill={colors[2]} opacity="0.65" />
      <ellipse cx={cx - r * 0.1} cy={cy} rx={r * 0.6} ry={r * 0.55} fill="#B5D1A5" opacity="0.35" />
    </g>
  );
}

function Flower({ cx, cy }: { cx: number; cy: number }) {
  const petalR = 3.5;
  const offsets = [
    [0, -petalR],
    [petalR * 0.95, -petalR * 0.31],
    [petalR * 0.59, petalR * 0.81],
    [-petalR * 0.59, petalR * 0.81],
    [-petalR * 0.95, -petalR * 0.31],
  ];
  return (
    <g>
      {offsets.map(([dx, dy], i) => (
        <circle
          key={i}
          cx={cx + dx}
          cy={cy + dy}
          r={2.8}
          fill="#E8B5A0"
          opacity="0.8"
        />
      ))}
      <circle cx={cx} cy={cy} r={2} fill="#E8C87A" />
    </g>
  );
}
