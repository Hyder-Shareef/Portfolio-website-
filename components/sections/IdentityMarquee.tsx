"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";

export default function IdentityMarquee() {
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  return (
    <div
      className="relative w-full py-8 md:py-12 bg-surface overflow-hidden hairline-top hairline-bottom select-none cursor-ew-resize"
      onMouseEnter={() => setSpeedMultiplier(1.8)}
      onMouseLeave={() => setSpeedMultiplier(1)}
    >
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Row 1: Leftward scroll */}
      <div
        className="flex whitespace-nowrap animate-marquee-left"
        style={{ animationDuration: `${28 / speedMultiplier}s` }}
      >
        {[...portfolioData.identityWords, ...portfolioData.identityWords].map((word, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-4">
            <span className="font-display font-black text-3xl sm:text-5xl md:text-7xl uppercase text-text-primary/90 hover:text-accent transition-colors">
              {word}
            </span>
            <span className="font-mono text-sm text-accent">/</span>
          </div>
        ))}
      </div>

      {/* Row 2: Rightward scroll with alternate accent */}
      <div
        className="flex whitespace-nowrap animate-marquee-right mt-3 md:mt-5 opacity-40 hover:opacity-100 transition-opacity"
        style={{ animationDuration: `${32 / speedMultiplier}s` }}
      >
        {[...portfolioData.identityWords, ...portfolioData.identityWords].reverse().map((word, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-4">
            <span className="font-display font-black text-2xl sm:text-4xl md:text-5xl uppercase text-text-muted hover:text-accent-cyan transition-colors">
              {word}
            </span>
            <span className="font-mono text-xs text-accent-cyan">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
