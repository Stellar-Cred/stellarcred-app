"use client";

import { useEffect, useState } from "react";
import { getScoreColor, getScoreTier } from "@stellarcred/sdk";
import { TierBadge } from "./TierBadge";

const RADIUS = 70;
const STROKE_WIDTH = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScoreMeter({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const tier = getScoreTier(score);
  const color = getScoreColor(score);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimatedScore(score));
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const progress = Math.min(Math.max(animatedScore, 0), 1000) / 1000;
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-[180px] w-[180px] items-center justify-center">
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          className="-rotate-90"
        >
          <circle
            cx="90"
            cy="90"
            r={RADIUS}
            fill="none"
            stroke="#1E293B"
            strokeWidth={STROKE_WIDTH}
          />
          <circle
            cx="90"
            cy="90"
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">
            {animatedScore}
          </span>
          <span className="text-sm text-slate-400">/ 1000</span>
        </div>
      </div>
      <TierBadge tier={tier} />
    </div>
  );
}
