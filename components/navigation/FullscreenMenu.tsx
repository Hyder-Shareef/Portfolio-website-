"use client";

import React, { useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { soundFx } from "@/lib/sound";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { num: "00", title: "HOME", href: "#hero", tag: "DIGITAL CORE & ENTRY" },
  { num: "01", title: "ABOUT", href: "#about", tag: "FOUNDATIONS & PERSPECTIVE" },
  { num: "02", title: "SELECTED WORK", href: "#work", tag: "6 ARCHITECTURAL CASE STUDIES" },
  { num: "03", title: "EXPERIENCE", href: "#experience", tag: "RESIDENCIES & EDUCATION" },
  { num: "04", title: "CAPABILITIES", href: "#capabilities", tag: "3D SKILL CONSTELLATION" },
  { num: "05", title: "BEYOND SCREEN", href: "#leadership", tag: "PUBLIC DEMOS & SPEAKING" },
  { num: "06", title: "CONTACT", href: "#contact", tag: "DIRECT INQUIRY & CHANNELS" },
];

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-14 overflow-y-auto animate-in fade-in duration-300">
      {/* Background Kinetic Watermark Typography */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-5 select-none">
        <span className="font-display font-black text-[20vw] uppercase tracking-tighter text-white whitespace-nowrap">
          {hoveredIndex !== null ? menuItems[hoveredIndex].title : "HYDER SHAREEF"}
        </span>
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-center hairline-bottom pb-6">
        <div className="flex items-center gap-3">
          <span className="font-display font-black text-xl text-text-primary tracking-tight">
            HYDER®
          </span>
          <span className="font-mono text-xs text-text-muted">PORTFOLIO / 2026</span>
        </div>
        <button
          onClick={() => {
            soundFx.close();
            onClose();
          }}
          data-cursor="LINK"
          className="flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-accent px-4 py-2 rounded-full border border-border hover:border-accent transition-all"
        >
          <span>CLOSE</span>
          <X size={14} />
        </button>
      </div>

      {/* Chapter Menu List */}
      <nav className="relative z-10 my-auto py-8 space-y-2 max-w-5xl">
        {menuItems.map((item, idx) => (
          <a
            key={item.num}
            href={item.href}
            onClick={() => {
              soundFx.click();
              onClose();
            }}
            onMouseEnter={() => {
              soundFx.hover();
              setHoveredIndex(idx);
            }}
            onMouseLeave={() => setHoveredIndex(null)}
            data-cursor="VIEW"
            className="group flex flex-col md:flex-row md:items-baseline justify-between py-2.5 transition-all duration-200 border-b border-white/5 hover:border-accent/40"
          >
            <div className="flex items-baseline gap-4 md:gap-8">
              <span className="font-mono text-xs md:text-sm text-text-muted group-hover:text-accent transition-colors">
                {item.num}
              </span>
              <span className="font-display font-extrabold text-2xl sm:text-4xl md:text-6xl text-text-primary group-hover:text-accent group-hover:translate-x-3 transition-all duration-300">
                {item.title}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] md:text-xs text-text-muted group-hover:text-text-secondary pt-1 md:pt-0">
              <span>{item.tag}</span>
              <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:text-accent transition-opacity" />
            </div>
          </a>
        ))}
      </nav>

      {/* Bottom Metadata Bar */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 hairline-top font-mono text-xs text-text-muted">
        <div>
          <span className="block text-[10px] text-text-secondary uppercase">LOCATION</span>
          <span className="text-text-primary">{portfolioData.location}</span>
        </div>
        <div>
          <span className="block text-[10px] text-text-secondary uppercase">DIRECT CHANNEL</span>
          <a
            href={`mailto:${portfolioData.email}`}
            className="text-text-primary hover:text-accent transition-colors"
          >
            {portfolioData.email}
          </a>
        </div>
        <div className="flex justify-start md:justify-end items-center gap-4">
          <span className="text-accent-green flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            AVAILABLE TO BUILD
          </span>
        </div>
      </div>
    </div>
  );
}
