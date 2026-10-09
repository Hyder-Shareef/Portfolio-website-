"use client";

import React from "react";
import { ArrowUpRight, GraduationCap, MapPin, Mail, Sparkles, BookOpen, Layers } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { soundFx } from "@/lib/sound";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 md:px-14 bg-background hairline-top"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Chapter Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs text-text-muted hairline-bottom pb-4">
          <div className="flex items-center gap-3">
            <span className="text-accent font-bold">01</span>
            <span className="text-text-primary uppercase tracking-widest font-semibold">/ ABOUT & PERSPECTIVE</span>
          </div>
          <div className="text-[11px] uppercase tracking-wider text-text-dim">
            ENGINEERING CRAFT · ARCHITECTURAL RIGOR · HUMAN STORYTELLING
          </div>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Huge Editorial Statement & Principles */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <h2 className="chapter-title text-text-primary tracking-tight font-extrabold uppercase leading-[1.05]">
              {portfolioData.editorialStatement}
            </h2>

            <p className="text-text-secondary text-sm sm:text-base md:text-lg font-normal leading-relaxed">
              {portfolioData.subStatement}
            </p>

            {/* Core Principles */}
            <div className="pt-6 sm:pt-8 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-widest">
                <Layers size={14} />
                <span>CORE ENGINEERING PRINCIPLES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {portfolioData.principles.map((p) => (
                  <div key={p.num} className="p-5 bg-surface rounded-xl border border-border hover:border-border-active transition-colors space-y-2">
                    <span className="font-mono text-xs text-accent-cyan font-bold">{p.num}</span>
                    <h3 className="font-display text-sm font-bold text-text-primary tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Profile At A Glance */}
          <div className="lg:col-span-5 space-y-6 bg-surface border border-border p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center justify-between font-mono text-xs text-text-muted uppercase tracking-widest pb-3 border-b border-border">
              <span>PROFILE AT A GLANCE</span>
              <span className="w-2 h-2 rounded-full bg-accent-green" />
            </div>

            {/* Academic Base */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-[10px] text-accent uppercase tracking-widest">
                <GraduationCap size={13} />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <p className="text-sm font-semibold text-text-primary">
                B.S. in Applied AI & Data Science
              </p>
              <p className="text-xs text-accent-cyan font-medium">
                Indian Institute of Technology Jodhpur (2029)
              </p>
              <p className="text-xs text-text-secondary">
                Leapstart School of Technology — Applied CS & Distributed Systems
              </p>
            </div>

            {/* Current Focus */}
            <div className="space-y-2 pt-3 border-t border-border">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest block">
                CURRENT TECHNICAL FOCUS
              </span>
              <p className="text-xs text-text-secondary leading-relaxed">
                Relational schema design (PostgreSQL 16), vector retrieval pipelines, network anomaly modeling, and interactive WebGL experiences.
              </p>
            </div>

            {/* Multidisciplinary Dimensions */}
            <div className="space-y-2.5 pt-3 border-t border-border">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest block">
                AREAS OF PASSION
              </span>
              <div className="flex flex-wrap gap-1.5">
                {portfolioData.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs px-2.5 py-1 bg-surface-light border border-border rounded text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Quick Channels */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-text-muted">
                <MapPin size={13} className="text-accent" />
                <span>{portfolioData.location}</span>
              </div>

              <a
                href={`mailto:${portfolioData.email}`}
                onClick={() => soundFx.click()}
                className="text-accent hover:underline font-semibold flex items-center gap-1"
              >
                <span>{portfolioData.email}</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
