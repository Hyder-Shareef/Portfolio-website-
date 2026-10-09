"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { soundFx } from "@/lib/sound";

const DigitalCoreHero = dynamic(() => import("@/components/canvas/DigitalCoreHero"), {
  ssr: false,
});

const descriptors = [
  "APPLIED AI & MACHINE LEARNING",
  "DISTRIBUTED SYSTEMS & NETWORKS",
  "RELATIONAL DATABASE ARCHITECTURE",
  "FULL STACK WEB ENGINEERING",
  "TECHNICAL STORYTELLING & LIVE DEMOS",
];

export default function HeroSection() {
  const [descIndex, setDescIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDescIndex((prev) => (prev + 1) % descriptors.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleOpenCommand = () => {
    soundFx.open();
    const evt = new CustomEvent("open-command-palette");
    window.dispatchEvent(evt);
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between p-4 sm:p-8 md:p-14 pt-24 sm:pt-28 md:pt-32 overflow-hidden select-none"
    >
      {/* 3D WebGL Digital Core Background Canvas */}
      <DigitalCoreHero />

      {/* Top Context Metadata Bar */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs text-text-muted uppercase tracking-wider hairline-bottom pb-4">
        <div>
          <span className="text-text-primary font-semibold">PORTFOLIO — 2026</span>
          <span className="block text-[10px] text-text-dim">APPLIED AI & SYSTEMS</span>
        </div>
        <div className="hidden sm:block text-center">
          <span className="text-text-primary">{portfolioData.name}</span>
          <span className="block text-[10px] text-text-dim">IIT JODHPUR · LEAPSTART</span>
        </div>
        <div className="flex justify-end items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          <span className="text-text-primary text-[11px]">{portfolioData.location}</span>
        </div>
      </div>

      {/* Main Center Massive Editorial Headline */}
      <div className="relative z-10 my-auto py-8 sm:py-12 max-w-5xl">
        <h1 className="hero-title text-text-primary tracking-tighter flex flex-col">
          <span className="hover:text-accent transition-colors duration-300">
            HYDER
          </span>
          <span className="text-stroke hover:text-accent-cyan transition-colors duration-300">
            SHAREEF
          </span>
        </h1>

        {/* Dynamic Rotating Descriptor */}
        <div className="mt-6 flex items-center gap-3 font-mono text-xs sm:text-sm md:text-base text-accent tracking-widest uppercase">
          <span className="w-4 h-px bg-accent" />
          <span className="transition-all duration-300 font-semibold">{descriptors[descIndex]}</span>
        </div>

        <p className="mt-6 max-w-2xl font-mono text-xs sm:text-sm text-text-secondary leading-relaxed">
          Student at IIT Jodhpur & Leapstart School of Technology engineering machine intelligence, resilient database architectures, secure networks, and computational craft.
        </p>

        {/* Primary Call To Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs">
          <a
            href="#work"
            onClick={() => soundFx.click()}
            data-cursor="VIEW"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent text-background font-bold uppercase tracking-wider hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
          >
            <span>Explore Selected Work</span>
            <ArrowDown size={14} />
          </a>

          <a
            href="#contact"
            onClick={() => soundFx.click()}
            data-cursor="LINK"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-surface hover:bg-surface-light border border-border hover:border-text-muted text-text-primary font-semibold uppercase tracking-wider transition-all"
          >
            <Mail size={14} className="text-accent" />
            <span>Get In Touch</span>
          </a>

          <button
            onClick={handleOpenCommand}
            data-cursor="LINK"
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-3.5 rounded-xl bg-surface/50 hover:bg-surface border border-border text-text-muted hover:text-text-secondary transition-colors"
            title="Press CMD + K"
          >
            <Terminal size={13} className="text-accent-cyan" />
            <span>Press <kbd className="text-text-primary bg-surface-light px-1.5 py-0.5 rounded border border-border">CMD+K</kbd></span>
          </button>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 font-mono text-xs text-text-muted hairline-top pt-4">
        <div className="max-w-md text-[11px] leading-relaxed text-text-secondary">
          Bridging technical rigor in systems and database design with charisma and communication craft.
        </div>

        <a
          href="#about"
          onClick={() => soundFx.click()}
          data-cursor="EXPLORE"
          className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors group"
        >
          <span className="tracking-widest uppercase text-xs">DISCOVER BACKGROUND</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform text-accent" />
        </a>
      </div>
    </section>
  );
}
