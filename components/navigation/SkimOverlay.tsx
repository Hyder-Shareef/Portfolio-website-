"use client";

import React, { useState, useEffect } from "react";
import { soundFx } from "@/lib/sound";

const chapters = [
  { id: "hero", label: "00 / ENTRY" },
  { id: "about", label: "01 / ABOUT" },
  { id: "work", label: "02 / SELECTED WORK" },
  { id: "experience", label: "03 / EXPERIENCE" },
  { id: "capabilities", label: "04 / CAPABILITIES" },
  { id: "leadership", label: "05 / BEYOND THE SCREEN" },
  { id: "contact", label: "06 / CONTACT" },
];

export default function SkimOverlay() {
  const [isSkimming, setIsSkimming] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        !e.repeat &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsSkimming(true);
        document.body.classList.add("skim-active");
        soundFx.skim();

        interval = setInterval(() => {
          setActiveChapterIndex((prev) => {
            const next = (prev + 1) % chapters.length;
            soundFx.skim();
            return next;
          });
        }, 320);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (interval) clearInterval(interval);
        setIsSkimming(false);
        document.body.classList.remove("skim-active");

        // Jump to active chapter
        const target = chapters[activeChapterIndex];
        const el = document.getElementById(target.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [activeChapterIndex]);

  return (
    <>
      {/* Skim HUD Overlay */}
      {isSkimming && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-4 animate-pulse">
            HIGH-SPEED SKIM MODE // TRAVERSING
          </div>
          <div className="font-display font-black text-5xl md:text-8xl text-text-primary uppercase tracking-tighter">
            {chapters[activeChapterIndex].label}
          </div>
          <div className="mt-8 flex items-center gap-2 font-mono text-xs text-text-muted">
            <span>RELEASE SPACE TO ARRIVE</span>
          </div>
        </div>
      )}

      {/* Persistent Desktop Tip / Mobile Quick Index button at bottom right */}
      <div className="fixed bottom-5 left-6 z-30 hidden md:flex items-center gap-2 font-mono text-[10px] text-text-muted bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border">
        <kbd className="text-text-primary bg-surface-light px-1.5 py-0.5 rounded border border-border font-bold">
          SPACE
        </kbd>
        <span>HOLD TO SKIM</span>
      </div>
    </>
  );
}
