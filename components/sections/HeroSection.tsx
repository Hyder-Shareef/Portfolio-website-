"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { soundFx } from "@/lib/sound";

const DigitalCoreHero = dynamic(() => import("@/components/canvas/DigitalCoreHero"), {
  ssr: false,
});

const descriptors = [
  "APPLIED AI & DATA SCIENCE",
  "CYBERSECURITY & SYSTEMS",
  "RELATIONAL DATABASE ARCHITECTURE",
  "FULL STACK WEB DEVELOPMENT",
  "TECHNICAL STORYTELLING & DEMOS",
];

export default function HeroSection() {
  const [descIndex, setDescIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDescIndex((prev) => (prev + 1) % descriptors.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between p-4 sm:p-8 md:p-14 pt-20 sm:pt-24 md:pt-28 overflow-hidden select-none"
    >
      {/* 3D WebGL Digital Core Background */}
      <DigitalCoreHero />

      {/* Top Context Metadata */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-text-muted uppercase tracking-wider hairline-bottom pb-4">
        <div>
          <span className="text-text-primary font-semibold">Nº000 / ENTRY</span>
          <span className="block text-[10px] text-text-dim">DIGITAL OPERATING LAB</span>
        </div>
        <div className="hidden sm:block text-center">
          <span>{portfolioData.name}</span>
          <span className="block text-[10px] text-text-dim">{portfolioData.location}</span>
        </div>
        <div className="flex justify-start sm:justify-end items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span className="text-text-primary">PORTFOLIO — 2026</span>
        </div>
      </div>

      {/* Main Center Massive Headline */}
      <div className="relative z-10 my-auto py-10">
        <h1 className="hero-title text-text-primary tracking-tighter flex flex-col">
          <span className="hover:text-accent transition-colors duration-300">HYDER</span>
          <span className="text-stroke hover:text-accent-cyan transition-colors duration-300">
            SHAREEF
          </span>
        </h1>

        {/* Dynamic Rotating Descriptor */}
        <div className="mt-6 flex items-center gap-3 font-mono text-xs sm:text-sm md:text-base text-accent tracking-widest uppercase">
          <span className="w-4 h-px bg-accent" />
          <span className="transition-all duration-300 font-semibold">{descriptors[descIndex]}</span>
        </div>
      </div>

      {/* Bottom Scroll Prompt & Status Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 font-mono text-xs text-text-muted hairline-top pt-4">
        <div className="max-w-md text-[11px] leading-relaxed text-text-secondary">
          Student at IIT Jodhpur & Leapstart School of Technology exploring the intersection of machine intelligence, robust backend infrastructure, and computational craft.
        </div>

        <a
          href="#about"
          onClick={() => soundFx.click()}
          data-cursor="EXPLORE"
          className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors group"
        >
          <span className="tracking-widest uppercase text-xs">SCROLL TO ENTER</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform text-accent" />
        </a>
      </div>
    </section>
  );
}
