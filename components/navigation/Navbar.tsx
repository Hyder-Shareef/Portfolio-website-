"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Command } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { isSoundEnabled, toggleSound, soundFx } from "@/lib/sound";

interface NavbarProps {
  onOpenMenu: () => void;
  onOpenCommand: () => void;
}

export default function Navbar({ onOpenMenu, onOpenCommand }: NavbarProps) {
  const [soundOn, setSoundOn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const updated = toggleSound();
    setSoundOn(updated);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md hairline-bottom py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
        {/* Monogram Logo & Live Status */}
        <div className="flex items-center gap-4">
          <Link
            href="#hero"
            onClick={() => soundFx.click()}
            data-cursor="PLAY"
            className="group font-display font-black text-xl tracking-tight text-text-primary hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span>HYDER</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform" />
          </Link>

          <span className="hidden sm:inline-block h-3 w-px bg-border" />

          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-text-secondary tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span>{portfolioData.status}</span>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            data-cursor="LINK"
            className="flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-text-primary px-2.5 py-1 rounded-lg border border-border hover:border-text-muted transition-all bg-surface/30"
            title={soundOn ? "Mute Tactile Audio" : "Enable Tactile Audio"}
          >
            {soundOn ? <Volume2 size={13} className="text-accent" /> : <VolumeX size={13} />}
            <span className="hidden md:inline">{soundOn ? "SOUND ON" : "SOUND OFF"}</span>
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              soundFx.open();
              onOpenCommand();
            }}
            data-cursor="LINK"
            className="flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-text-primary px-2.5 py-1 rounded-lg border border-border hover:border-text-muted transition-all bg-surface/40"
            title="Open Command Palette (CMD+K)"
          >
            <Command size={12} className="text-accent-cyan" />
            <span className="hidden md:inline">CMD + K</span>
          </button>

          {/* Quick Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-xs tracking-wider text-text-secondary">
            <Link
              href="#about"
              onClick={() => soundFx.click()}
              className="hover:text-text-primary transition-colors"
            >
              ABOUT
            </Link>
            <Link
              href="#work"
              onClick={() => soundFx.click()}
              className="hover:text-text-primary transition-colors"
            >
              WORK
            </Link>
            <Link
              href="#experience"
              onClick={() => soundFx.click()}
              className="hover:text-text-primary transition-colors"
            >
              EXPERIENCE
            </Link>
            <Link
              href="#capabilities"
              onClick={() => soundFx.click()}
              className="hover:text-text-primary transition-colors"
            >
              SKILLS
            </Link>
            <Link
              href="#contact"
              onClick={() => soundFx.click()}
              className="hover:text-text-primary transition-colors"
            >
              CONTACT
            </Link>
          </nav>

          {/* Menu Button */}
          <button
            onClick={() => {
              soundFx.open();
              onOpenMenu();
            }}
            data-cursor="OPEN"
            className="font-mono text-xs tracking-widest text-text-primary bg-text-primary/10 hover:bg-accent hover:text-background px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 border border-border hover:border-accent font-semibold"
          >
            <span className="w-1.5 h-1.5 bg-accent group-hover:bg-background rounded-full" />
            <span>MENU</span>
          </button>
        </div>
      </div>
    </header>
  );
}
