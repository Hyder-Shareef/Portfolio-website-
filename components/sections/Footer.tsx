"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { soundFx } from "@/lib/sound";

export default function Footer() {
  const scrollToTop = () => {
    soundFx.action();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full py-12 sm:py-16 px-4 sm:px-8 md:px-14 bg-surface hairline-top text-text-muted select-none">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Top Metadata Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 font-mono text-xs hairline-bottom pb-6 sm:pb-8">
          <div className="space-y-1">
            <div className="font-display font-black text-lg text-text-primary">
              HYDER® <span className="text-accent">2026</span>
            </div>
            <p className="text-[11px] text-text-secondary">
              APPLIED AI & DATA SCIENCE · IIT JODHPUR
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              data-cursor="PLAY"
              className="flex items-center gap-2 text-text-primary hover:text-accent font-mono text-xs uppercase tracking-widest transition-colors group"
            >
              <span>BACK TO APEX</span>
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform text-accent" />
            </button>
          </div>
        </div>

        {/* Huge Bottom Monogram Typography */}
        <div className="py-4 sm:py-6">
          <h2 className="font-display font-black text-[10vw] md:text-[9vw] leading-none uppercase tracking-tighter text-white/5 hover:text-white/10 transition-colors duration-500">
            HYDER SHAREEF
          </h2>
        </div>

        {/* Bottom Legal & Colophon */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[11px] text-text-dim">
          <div>
            © {portfolioData.year} Mohammed Hyder Shareef. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>DESIGNED & ENGINEERED WITH NEXT.JS + THREE.JS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
