"use client";

import React, { useState } from "react";
import { Briefcase, GraduationCap, Award, CheckCircle2, ChevronRight, ShieldCheck, Terminal } from "lucide-react";
import { experiencesData, educationData, certificationsData } from "@/data/experience";
import { soundFx } from "@/lib/sound";

export default function ExperienceSection() {
  const [activeExpId, setActiveExpId] = useState(experiencesData[0].id);

  const currentExp = experiencesData.find((e) => e.id === activeExpId) || experiencesData[0];

  return (
    <section id="experience" className="relative w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 md:px-14 bg-background hairline-top">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs text-text-muted hairline-bottom pb-4">
          <div className="flex items-center gap-3">
            <span className="text-accent font-bold">Nº003</span>
            <span className="text-text-primary uppercase tracking-widest font-semibold">
              / EXPERIENCE & RIGOR
            </span>
          </div>
          <div className="text-[11px] uppercase tracking-wider text-text-dim">
            RESIDENCIES · AI LABS · CYBERSECURITY · COMMUNITY
          </div>
        </div>

        {/* Section Title */}
        <div className="space-y-4">
          <h2 className="chapter-title text-text-primary uppercase tracking-tight">
            TRACK RECORD & <br />
            <span className="text-stroke hover:text-accent-green transition-colors duration-300">
              PRACTICAL IMPACT
            </span>
          </h2>
          <p className="max-w-xl font-mono text-xs text-text-secondary leading-relaxed">
            Hands-on technical residencies, applied AI research, hands-on security modeling, and engineering community leadership.
          </p>
        </div>

        {/* Interactive Experience Timeline / Master-Detail layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Role Switcher */}
          <div className="lg:col-span-5 space-y-3">
            <div className="font-mono text-xs text-text-muted uppercase tracking-widest pb-2 border-b border-border">
              // SELECT ENGAGEMENT
            </div>
            {experiencesData.map((exp) => {
              const isActive = exp.id === activeExpId;
              return (
                <div
                  key={exp.id}
                  onClick={() => {
                    soundFx.click();
                    setActiveExpId(exp.id);
                  }}
                  onMouseEnter={() => soundFx.hover()}
                  data-cursor="VIEW"
                  className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-surface border-accent shadow-xl -translate-y-0.5"
                      : "bg-surface/40 border-border hover:border-text-muted hover:bg-surface"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-mono text-[10px] text-accent tracking-widest uppercase mb-1">
                        {exp.type}
                      </div>
                      <h3 className="font-display font-bold text-lg text-text-primary">
                        {exp.role}
                      </h3>
                      <p className="text-xs text-accent-cyan font-mono mt-0.5">
                        {exp.organization}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-text-muted shrink-0 ml-2">
                      {exp.period}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Role Deep Dive */}
          <div className="lg:col-span-7 bg-surface border border-border p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex flex-wrap justify-between items-baseline gap-2 border-b border-border pb-4">
              <div>
                <span className="font-mono text-xs text-accent font-semibold">{currentExp.type}</span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-text-primary mt-1">
                  {currentExp.role}
                </h3>
                <p className="text-sm font-semibold text-accent-cyan mt-0.5">
                  @{currentExp.organization} {currentExp.location ? `· ${currentExp.location}` : ""}
                </p>
              </div>
              <span className="font-mono text-xs text-text-muted px-3 py-1 bg-surface-light rounded border border-border">
                {currentExp.period}
              </span>
            </div>

            {/* Bullet Points */}
            <div className="space-y-3">
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider block">
                // RESPONSIBILITIES & DELIVERABLES
              </span>
              {currentExp.description.map((desc, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                  <CheckCircle2 size={16} className="text-accent-green shrink-0 mt-0.5" />
                  <span>{desc}</span>
                </div>
              ))}
            </div>

            {/* Skills applied */}
            <div className="pt-4 border-t border-border space-y-2">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                APPLIED CAPABILITIES & TOOLS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentExp.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs px-2.5 py-1 bg-surface-light border border-border rounded text-text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education & Certifications Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 hairline-top">
          {/* Education Matrix */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase tracking-widest">
              <GraduationCap size={16} className="text-accent" />
              <span>ACADEMIC FOUNDATION</span>
            </div>

            <div className="space-y-4">
              {educationData.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-surface border border-border rounded-xl space-y-3 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-display font-bold text-lg text-text-primary">
                      {edu.degree}
                    </h4>
                    <span className="font-mono text-[10px] text-accent-cyan px-2 py-0.5 bg-surface-light rounded border border-border">
                      {edu.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-accent">{edu.institution}</p>
                  <p className="font-mono text-[11px] text-text-muted">{edu.period}</p>
                  <div className="space-y-1.5 pt-2 border-t border-border/60">
                    {edu.highlights.map((hl, i) => (
                      <p key={i} className="text-xs text-text-secondary leading-relaxed">
                        • {hl}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Matrix */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase tracking-widest">
              <Award size={16} className="text-accent-cyan" />
              <span>VERIFIED CERTIFICATIONS & CREDENTIALS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificationsData.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-surface border border-border hover:border-accent-cyan/60 rounded-xl space-y-2 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[9px] text-text-muted uppercase tracking-wider mb-1">
                      <span>{cert.category}</span>
                      <ShieldCheck size={12} className="text-accent-green" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-text-primary">
                      {cert.title}
                    </h4>
                    <p className="font-mono text-xs text-accent-cyan mt-0.5">{cert.issuer}</p>
                  </div>
                  <div className="pt-2 border-t border-border font-mono text-[10px] text-text-dim flex justify-between">
                    <span>CODE:</span>
                    <span className="text-text-muted font-bold">{cert.badgeCode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
