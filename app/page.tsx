"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navigation/Navbar";
import FullscreenMenu from "@/components/navigation/FullscreenMenu";
import CommandPalette from "@/components/navigation/CommandPalette";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    // Listen for custom event triggered across components
    const handleOpenCmd = () => setIsCommandOpen(true);
    window.addEventListener("open-command-palette", handleOpenCmd);
    return () => window.removeEventListener("open-command-palette", handleOpenCmd);
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-text-primary overflow-hidden selection:bg-accent selection:text-background">
      {/* Main App Bar */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenCommand={() => setIsCommandOpen(true)}
      />

      {/* Hero Section with High-Impact CTA */}
      <HeroSection />

      {/* Kinetic Identity Marquee */}
      <IdentityMarquee />

      {/* About & Narrative Foundations */}
      <AboutSection />

      {/* Selected Architectural Work & Interactive Project Dossiers */}
      <ProjectsSection />

      {/* Experience, Practical Rigor & Academic Foundation */}
      <ExperienceSection />

      {/* Interactive 3D Skill Constellation & Matrix */}
      <SkillsSection />

      {/* Beyond The Screen: Public Demos, Stand-up Comedy & Leadership */}
      <BeyondTheScreen />

      {/* Direct Contact & Collaboration Terminal */}
      <ContactSection />

      {/* Editorial System Footer */}
      <Footer />

      {/* Fullscreen Navigation Modal */}
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
