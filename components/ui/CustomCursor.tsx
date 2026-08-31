"use client";

import React, { useEffect, useState } from "react";

export type CursorState = "DEFAULT" | "VIEW" | "OPEN" | "DRAG" | "EXPLORE" | "LINK" | "PLAY" | "SEND";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<CursorState>("DEFAULT");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / tablet / mobile device
    const checkTouch = () => {
      if (typeof window !== "undefined") {
        const isCoarse = window.matchMedia("(pointer: coarse)").matches;
        const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        const isMobileScreen = window.innerWidth < 1024;
        if (isCoarse || (hasTouch && isMobileScreen)) {
          setIsTouchDevice(true);
          return true;
        }
        setIsTouchDevice(false);
        return false;
      }
      return false;
    };

    if (checkTouch()) return;
    window.addEventListener("resize", checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setDotPos({ x: e.clientX, y: e.clientY });

      // Target element cursor data
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("[data-cursor]") as HTMLElement | null;
      if (interactive) {
        const state = interactive.getAttribute("data-cursor") as CursorState;
        setCursorState(state || "LINK");
      } else if (target?.closest("a, button, [role='button']")) {
        setCursorState("LINK");
      } else {
        setCursorState("DEFAULT");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animationFrameId: number;
    const smoothFollow = () => {
      setPos((prev) => ({
        x: prev.x + (dotPos.x - prev.x) * 0.22,
        y: prev.y + (dotPos.y - prev.y) * 0.22,
      }));
      animationFrameId = requestAnimationFrame(smoothFollow);
    };
    animationFrameId = requestAnimationFrame(smoothFollow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotPos]);

  if (isTouchDevice || !isVisible) return null;

  const isExpanded = cursorState !== "DEFAULT";

  return (
    <div className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300">
      {/* Center point */}
      <div
        className="fixed w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent pointer-events-none z-50 transition-transform duration-75"
        style={{ transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)` }}
      />

      {/* Smooth outer follower ring / bubble */}
      <div
        className={`fixed -ml-5 -mt-5 rounded-full pointer-events-none transition-all duration-200 flex items-center justify-center ${
          isExpanded
            ? "w-24 h-24 -ml-12 -mt-12 bg-text-primary text-background border-none shadow-2xl scale-100"
            : "w-10 h-10 border border-white/40 scale-100"
        }`}
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      >
        {isExpanded && (
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase animate-pulse">
            {cursorState}
          </span>
        )}
      </div>
    </div>
  );
}
