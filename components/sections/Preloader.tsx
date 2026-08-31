"use client";

import React, { useState, useEffect } from "react";
import { soundFx } from "@/lib/sound";

interface PreloaderProps {
  onComplete: () => void;
}

const technicalLogs = [
  "INITIALIZING HYDER.SYSTEM / 2026...",
  "LOADING WEBGL GEOMETRY SHADERS...",
  "MAPPING RELATIONAL ENTITY GRAPH...",
  "SYNCHRONIZING APPLIED AI REPOSITORIES...",
  "CALIBRATING SENSOR TOPOLOGY...",
  "SYSTEM ONLINE & READY",
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          return 100;
        }
        const jump = Math.floor(Math.random() * 14) + 4;
        const next = Math.min(prev + jump, 100);

        if (next > 20 && next <= 40) setLogIndex(1);
        else if (next > 40 && next <= 65) setLogIndex(2);
        else if (next > 65 && next <= 85) setLogIndex(3);
        else if (next > 85 && next < 100) setLogIndex(4);
        else if (next === 100) setLogIndex(5);

        return next;
      });
    }, 65);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    soundFx.action();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#07080A] text-text-primary flex flex-col justify-between p-8 md:p-14 select-none">
      {/* Top Metadata */}
      <div className="flex justify-between items-center font-mono text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>HYDER.SYSTEM // BOOTLOADER</span>
        </div>
        <div>PORTFOLIO — 2026</div>
      </div>

      {/* Center Huge Percentage & Status */}
      <div className="space-y-4 my-auto max-w-4xl">
        <div className="font-mono text-xs text-accent-cyan tracking-widest uppercase">
          {technicalLogs[logIndex]}
        </div>
        <div className="font-display font-black text-7xl sm:text-9xl md:text-[14vw] leading-none tracking-tighter text-text-primary flex items-baseline gap-2">
          <span>{String(percent).padStart(2, "0")}</span>
          <span className="text-2xl sm:text-4xl text-accent font-mono">%</span>
        </div>

        {/* Loading progress bar */}
        <div className="w-full h-1 bg-surface-light overflow-hidden rounded-full">
          <div
            className="h-full bg-accent transition-all duration-150 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Bottom Button / Auto Enter */}
      <div className="flex justify-between items-end font-mono text-xs">
        <div className="text-text-muted">
          <span>COORDINATES: HYDERABAD, INDIA</span>
        </div>
        <button
          onClick={handleEnter}
          data-cursor="PLAY"
          className={`px-6 py-3 rounded-full font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
            isDone
              ? "bg-accent text-background hover:scale-105 shadow-xl animate-pulse"
              : "bg-surface text-text-muted border border-border hover:text-text-primary"
          }`}
        >
          <span>{isDone ? "ENTER SYSTEM →" : "SKIP INTRO"}</span>
        </button>
      </div>
    </div>
  );
}
