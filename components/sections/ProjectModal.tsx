"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { X, Github, ExternalLink, CheckCircle2, Layers, Cpu, BookOpen, Sparkles } from "lucide-react";
import { ProjectItem } from "@/data/projects";
import { soundFx } from "@/lib/sound";

const HeaultScene = dynamic(() => import("@/components/canvas/HeaultScene"), { ssr: false });
const OmnisGlobe = dynamic(() => import("@/components/canvas/OmnisGlobe"), { ssr: false });
const IrisSecurity = dynamic(() => import("@/components/canvas/IrisSecurity"), { ssr: false });
const ArchonMesh = dynamic(() => import("@/components/canvas/ArchonMesh"), { ssr: false });

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "learnings">("overview");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundFx.close();
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const renderVisualCanvas = () => {
    switch (project.visualSceneType) {
      case "documents":
        return <HeaultScene />;
      case "globe":
        return <OmnisGlobe />;
      case "security":
        return <IrisSecurity />;
      case "agent":
        return <ArchonMesh />;
      case "library":
      case "database":
      default:
        return (
          <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-surface-light/40 rounded-xl border border-border p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
            <Cpu size={44} className="text-accent mb-3 animate-pulse" />
            <div className="font-mono text-xs text-accent uppercase tracking-widest mb-1">
              RELATIONAL SCHEMA & PIPELINE ENGINE
            </div>
            <div className="font-display font-bold text-xl text-text-primary mb-2">
              {project.title}
            </div>
            <div className="text-xs text-text-secondary max-w-sm leading-relaxed">
              Normalized PostgreSQL 16 schemas, transaction isolation levels, and atomic business logic routines.
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-background/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-8 overflow-y-auto animate-in fade-in duration-200"
      onClick={() => {
        soundFx.close();
        onClose();
      }}
    >
      <div
        className="w-full max-w-5xl bg-surface border border-border-light rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Navigation Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-border bg-surface-light/50">
          <div className="flex items-center gap-2 sm:gap-3 truncate">
            <span className="font-mono text-xs font-bold text-accent shrink-0">0{project.number}</span>
            <span className="h-3 w-px bg-border shrink-0" />
            <span className="font-mono text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider truncate">
              {project.category}
            </span>
          </div>
          <button
            onClick={() => {
              soundFx.close();
              onClose();
            }}
            data-cursor="LINK"
            className="flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-text-primary px-3 py-1 rounded-full border border-border hover:border-text-muted transition-all shrink-0 ml-2"
          >
            <span>CLOSE</span>
            <X size={14} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 sm:space-y-8">
          {/* Header Title & Subtitle */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-text-primary tracking-tight">
                {project.title}
              </h2>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.action()}
                    data-cursor="LINK"
                    className="flex items-center gap-2 font-mono text-xs bg-surface-light hover:bg-accent hover:text-background text-text-primary px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-border transition-all font-medium"
                  >
                    <Github size={14} />
                    <span>VIEW REPO</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.action()}
                    data-cursor="LINK"
                    className="flex items-center gap-2 font-mono text-xs bg-accent text-background px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:opacity-90 transition-opacity font-bold shadow-lg shadow-accent/20"
                  >
                    <ExternalLink size={14} />
                    <span>LIVE DEMO</span>
                  </a>
                )}
              </div>
            </div>
            <p className="font-mono text-xs sm:text-sm text-accent-cyan tracking-wide font-medium">{project.subtitle}</p>
          </div>

          {/* Interactive Visual Canvas Showcase */}
          <div className="w-full h-60 sm:h-72 md:h-84 rounded-xl overflow-hidden relative">
            {renderVisualCanvas()}
          </div>

          {/* Tab Selection */}
          <div className="flex border-b border-border font-mono text-xs overflow-x-auto scrollbar-none whitespace-nowrap gap-1">
            <button
              onClick={() => {
                soundFx.click();
                setActiveTab("overview");
              }}
              className={`pb-2.5 sm:pb-3 px-3 sm:px-4 border-b-2 font-semibold transition-all shrink-0 ${
                activeTab === "overview"
                  ? "border-accent text-accent"
                  : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              01 OVERVIEW & FEATURES
            </button>
            <button
              onClick={() => {
                soundFx.click();
                setActiveTab("architecture");
              }}
              className={`pb-2.5 sm:pb-3 px-3 sm:px-4 border-b-2 font-semibold transition-all shrink-0 ${
                activeTab === "architecture"
                  ? "border-accent text-accent"
                  : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              02 ARCHITECTURE
            </button>
            <button
              onClick={() => {
                soundFx.click();
                setActiveTab("learnings");
              }}
              className={`pb-2.5 sm:pb-3 px-3 sm:px-4 border-b-2 font-semibold transition-all shrink-0 ${
                activeTab === "learnings"
                  ? "border-accent text-accent"
                  : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              03 ENGINEERING LEARNINGS
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                    THE PROBLEM
                  </h4>
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed bg-surface-light/40 p-4 rounded-xl border border-border">
                    {project.problem}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-2">
                    TECHNICAL APPROACH
                  </h4>
                  <p className="text-text-primary text-xs sm:text-sm leading-relaxed bg-surface-light/40 p-4 rounded-xl border border-border">
                    {project.approach}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-text-muted uppercase tracking-wider mb-3">
                    KEY CAPABILITIES & SUBSYSTEMS
                  </h4>
                  <div className="space-y-2.5">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                        <CheckCircle2 size={16} className="text-accent-green shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar: Metadata & Tech Specs */}
              <div className="lg:col-span-5 space-y-6 bg-surface-light/30 p-6 rounded-xl border border-border h-fit">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    SYSTEM STATUS
                  </span>
                  <div className="font-mono text-xs text-accent-green font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                    {project.status}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    YEAR
                  </span>
                  <p className="font-mono text-xs text-text-primary">{project.year}</p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    CORE TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[11px] px-2.5 py-1 bg-surface border border-border rounded text-accent-cyan"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-2">
                SYSTEM PIPELINE & LAYER BREAKDOWN
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.architecture.map((arch, idx) => (
                  <div key={idx} className="p-4 bg-surface-light/40 border border-border rounded-xl flex items-start gap-3">
                    <Layers size={18} className="text-accent-cyan shrink-0 mt-0.5" />
                    <p className="font-mono text-xs text-text-primary leading-relaxed">{arch}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "learnings" && (
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-2">
                ENGINEERING INSIGHTS & TRADEOFFS
              </h4>
              <div className="space-y-3">
                {project.learnings.map((learning, idx) => (
                  <div key={idx} className="p-4 bg-surface-light/40 border border-border rounded-xl flex items-start gap-3">
                    <BookOpen size={18} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{learning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
