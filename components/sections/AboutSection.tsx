"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { educationData } from "@/data/experience";

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
            <span className="text-accent font-bold">Nº001</span>
            <span className="text-text-primary uppercase tracking-widest font-semibold">/ ABOUT</span>
          </div>
          <div className="text-[11px] uppercase tracking-wider text-text-dim">
            IDENTITY × COMPUTATIONAL FOUNDATION
          </div>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Huge Editorial Statement */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <h2 className="chapter-title text-text-primary tracking-tight font-extrabold uppercase leading-[1.02]">
              {portfolioData.editorialStatement}
            </h2>

            <p className="text-text-secondary text-sm sm:text-lg md:text-xl font-normal leading-relaxed">
              {portfolioData.subStatement}
            </p>

            {/* Core Principles */}
            <div className="pt-6 sm:pt-8 space-y-4 sm:space-y-6">
              <div className="font-mono text-xs text-accent uppercase tracking-widest">
                // CORE PRINCIPLES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {portfolioData.principles.map((p) => (
                  <div key={p.num} className="p-4 bg-surface rounded-lg border border-border space-y-2">
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

          {/* Right Column: Compact Editorial Metadata */}
          <div className="lg:col-span-5 space-y-8 bg-surface/60 border border-border p-6 sm:p-8 rounded-2xl">
            <div className="font-mono text-xs text-text-muted uppercase tracking-widest pb-2 border-b border-border">
              PROFILE & ACADEMIC DOSSIER
            </div>

            {/* Location */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                LOCATION
              </span>
              <p className="text-sm font-medium text-text-primary">{portfolioData.location}</p>
            </div>

            {/* Education */}
            <div className="space-y-4 pt-2">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                EDUCATION & RIGOR
              </span>
              {educationData.map((edu, i) => (
                <div key={i} className="space-y-1 pl-3 border-l-2 border-accent">
                  <p className="text-sm font-semibold text-text-primary">{edu.degree}</p>
                  <p className="text-xs text-accent-cyan">{edu.institution}</p>
                  <p className="font-mono text-[11px] text-text-muted">{edu.period}</p>
                </div>
              ))}
            </div>

            {/* Interests & Dimensions */}
            <div className="space-y-2 pt-2">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                INTERESTS & MULTIDISCIPLINARY VECTOR
              </span>
              <div className="flex flex-wrap gap-1.5">
                {portfolioData.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs px-2.5 py-1 bg-surface-light border border-border rounded text-text-secondary"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact quick ping */}
            <div className="pt-4 border-t border-border flex justify-between items-center font-mono text-xs">
              <span className="text-text-muted">DIRECT</span>
              <a
                href={`mailto:${portfolioData.email}`}
                className="text-accent hover:underline font-semibold"
              >
                {portfolioData.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
