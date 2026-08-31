"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Sparkles, Network, ArrowRight, Layers, Cpu, Database, Shield, Wrench } from "lucide-react";
import { skillsGraph, skillCategories, SkillNode } from "@/data/skills";
import { soundFx } from "@/lib/sound";

const SkillUniverse = dynamic(() => import("@/components/canvas/SkillUniverse"), {
  ssr: false,
});

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeNode, setActiveNode] = useState<SkillNode | null>(skillsGraph[0]);

  const filteredSkills = skillsGraph.filter(
    (s) => selectedCategory === "ALL" || s.category === selectedCategory
  );

  return (
    <section id="capabilities" className="relative w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 md:px-14 bg-background hairline-top">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs text-text-muted hairline-bottom pb-4">
          <div className="flex items-center gap-3">
            <span className="text-accent font-bold">Nº004</span>
            <span className="text-text-primary uppercase tracking-widest font-semibold">
              / CAPABILITIES & SYSTEM GRAPH
            </span>
          </div>
          <div className="text-[11px] uppercase tracking-wider text-text-dim">
            3D CONSTELLATION · RELATIONAL INTERSECTION · FULL STACK
          </div>
        </div>

        {/* Headline & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="chapter-title text-text-primary uppercase tracking-tight">
              KNOWLEDGE GRAPH & <br />
              <span className="text-stroke hover:text-accent-cyan transition-colors duration-300">
                TECHNICAL SPECTRUM
              </span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-text-secondary leading-relaxed">
            Drag, rotate, and interact with the 3D orbital constellation. Each node maps interconnected computational competencies across AI, databases, and systems.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.click();
                setSelectedCategory(cat);
              }}
              data-cursor="LINK"
              className={`font-mono text-xs px-4 py-1.5 rounded-full shrink-0 transition-all border ${
                selectedCategory === cat
                  ? "bg-accent text-background border-accent font-bold shadow-lg"
                  : "bg-surface text-text-secondary border-border hover:border-text-muted hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D WebGL Constellation + Active Node HUD Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Interactive Canvas */}
          <div className="lg:col-span-8 relative">
            <SkillUniverse
              selectedCategory={selectedCategory}
              onSelectNode={(node) => {
                if (node) {
                  soundFx.action();
                  setActiveNode(node);
                }
              }}
              activeNodeId={activeNode?.id || null}
            />
            <div className="absolute top-4 left-4 font-mono text-[10px] text-text-muted bg-background/80 px-2.5 py-1 rounded border border-border">
              DRAG TO ROTATE // CLICK NODE TO INSPECT
            </div>
          </div>

          {/* Active Node Detail Dossier */}
          <div className="lg:col-span-4 bg-surface border border-border p-6 sm:p-7 rounded-2xl space-y-6 h-fit">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="font-mono text-xs text-accent uppercase tracking-widest">
                // NODE TELEMETRY
              </span>
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: activeNode?.color || "#FF4D00" }}
              />
            </div>

            {activeNode ? (
              <div className="space-y-5">
                <div>
                  <h3 className="font-display font-extrabold text-3xl text-text-primary">
                    {activeNode.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs text-accent-cyan">{activeNode.category}</span>
                    <span className="text-text-muted">•</span>
                    <span className="font-mono text-xs text-text-secondary">{activeNode.level}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    GRAPH INTERCONNECTIONS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeNode.connections.map((cId) => {
                      const target = skillsGraph.find((s) => s.id === cId);
                      return (
                        <button
                          key={cId}
                          onClick={() => {
                            if (target) {
                              soundFx.click();
                              setActiveNode(target);
                            }
                          }}
                          data-cursor="LINK"
                          className="font-mono text-xs px-2.5 py-1 bg-surface-light hover:bg-accent hover:text-background border border-border rounded text-text-primary transition-colors"
                        >
                          → {target?.name || cId}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="font-mono text-xs text-text-muted">
                Click any sphere in the 3D universe to inspect its connection graph.
              </div>
            )}
          </div>
        </div>

        {/* Categorized Skills Grid Overview */}
        <div className="space-y-4 pt-8 hairline-top">
          <div className="font-mono text-xs text-accent uppercase tracking-widest">
            // COMPLETE CAPABILITY MATRIX ({filteredSkills.length} NODES)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => {
                  soundFx.click();
                  setActiveNode(skill);
                }}
                data-cursor="LINK"
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  activeNode?.id === skill.id
                    ? "bg-surface border-accent shadow-md scale-105"
                    : "bg-surface/50 border-border hover:border-text-muted hover:bg-surface"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: skill.color }}
                  />
                  <span className="font-display font-bold text-sm text-text-primary truncate">
                    {skill.name}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-text-muted uppercase">
                  {skill.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
