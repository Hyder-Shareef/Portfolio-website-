"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navigation/Navbar";
import FullscreenMenu from "@/components/navigation/FullscreenMenu";
import CommandPalette from "@/components/navigation/CommandPalette";
import Preloader from "@/components/sections/Preloader";
import HeroSection from "@/components/sections/HeroSection";
import IdentityMarquee from "@/components/sections/IdentityMarquee";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import BeyondTheScreen from "@/components/sections/BeyondTheScreen";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    // Listen for custom event triggered across components
    const handleOpenCmd = () => setIsCommandOpen(true);
    window.addEventListener("open-command-palette", handleOpenCmd);
    return () => window.removeEventListener("open-command-palette", handleOpenCmd);
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-text-primary overflow-hidden">
      {/* Bootloader Sequence */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Main App Bar */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenCommand={() => setIsCommandOpen(true)}
      />

      {/* Hero Chapter */}
      <HeroSection />

      {/* Kinetic Identity Marquee */}
      <IdentityMarquee />

      {/* About & IIT Jodhpur Chapter */}
      <AboutSection />

      {/* Selected Architectural Work & 3D Interactive Project Dossiers */}
      <ProjectsSection />

      {/* Experience & Professional Rigor */}
      <ExperienceSection />

      {/* Interactive 3D Skill Constellation Universe */}
      <SkillsSection />

      {/* Beyond The Screen: Public Demos, Stand-up Comedy & Leadership */}
      <BeyondTheScreen />

      {/* Transmission Terminal & Contact */}
      <ContactSection />

      {/* Editorial System Footer */}
      <Footer />

      {/* Fullscreen Chapter Navigation */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Command Palette (CMD + K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </main>
  );
}
