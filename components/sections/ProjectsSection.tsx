"use client";

import React, { useState } from "react";
import { ArrowUpRight, Github, Filter } from "lucide-react";
import { projectsData, ProjectItem } from "@/data/projects";
import { soundFx } from "@/lib/sound";
import ProjectModal from "./ProjectModal";

const filterCategories = [
  "ALL",
  "HealthTech / Applied AI",
  "Data Visualization / Geospatial",
  "Cybersecurity / AI Systems",
  "Autonomous AI / Distributed Systems",
  "Full Stack / Enterprise Systems",
  "DBMS / Relational Architecture",
];

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filteredProjects = projectsData.filter((p) => {
    if (selectedFilter === "ALL") return true;
    return p.category === selectedFilter;
  });

  return (
    <section id="work" className="relative w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 md:px-14 bg-background hairline-top">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs text-text-muted hairline-bottom pb-4">
          <div className="flex items-center gap-3">
            <span className="text-accent font-bold">02</span>
            <span className="text-text-primary uppercase tracking-widest font-semibold">
              / SELECTED WORK
            </span>
          </div>
          <div className="text-[11px] uppercase tracking-wider text-text-dim">
            6 PRODUCTION PLATFORMS & ARCHITECTURAL CASE STUDIES
          </div>
        </div>

        {/* Big Editorial Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="chapter-title text-text-primary uppercase tracking-tight">
              ENGINEERED FOR <br />
              <span className="text-stroke hover:text-accent transition-colors duration-300">
                SCALE & INTEGRITY
              </span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-text-secondary leading-relaxed">
            Real-world platforms spanning health OCR extraction, 3D geospatial telemetry, automated network security anomaly detection, and ACID relational engines.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted mr-2 shrink-0">
            <Filter size={13} className="text-accent" />
            <span>FILTER:</span>
          </div>
          {filterCategories.map((cat) => {
            const count =
              cat === "ALL"
                ? projectsData.length
                : projectsData.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFx.click();
                  setSelectedFilter(cat);
                }}
                data-cursor="LINK"
                className={`font-mono text-xs px-3.5 py-1.5 rounded-full shrink-0 transition-all border ${
                  selectedFilter === cat
                    ? "bg-accent text-background border-accent font-bold shadow-lg"
                    : "bg-surface text-text-secondary border-border hover:border-text-muted hover:text-text-primary"
                }`}
              >
                {cat === "ALL" ? `ALL (0${count})` : `${cat.split(" / ")[0]} (0${count})`}
              </button>
            );
          })}
        </div>

        {/* Project Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                soundFx.open();
                setActiveProject(project);
              }}
              onMouseEnter={() => soundFx.hover()}
              data-cursor="VIEW"
              className="group relative bg-surface border border-border hover:border-accent/60 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
            >
              {/* Top Card Info */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-text-muted mb-4 border-b border-border pb-3">
                  <span className="font-bold text-accent">0{project.number}</span>
                  <span className="text-[10px] uppercase tracking-wider text-text-dim truncate max-w-[140px]">
                    {project.category.split(" / ")[0]}
                  </span>
                  <span className="text-[10px] text-text-secondary font-mono">{project.year}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-2xl text-text-primary group-hover:text-accent transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight
                      size={18}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-accent"
                    />
                  </h3>
                  <p className="font-mono text-xs text-accent-cyan font-medium">{project.subtitle}</p>
                </div>

                <p className="mt-4 text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Bottom Tech Badges & Actions */}
              <div className="mt-6 pt-4 border-t border-border space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] px-2 py-0.5 bg-surface-light border border-border rounded text-text-muted group-hover:text-text-secondary transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="font-mono text-[10px] px-1.5 py-0.5 text-text-muted font-mono">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[11px] text-accent font-semibold flex items-center gap-1 group-hover:underline">
                    EXPLORE DOSSIER →
                  </span>

                  {project.github && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.action();
                        window.open(project.github, "_blank");
                      }}
                      data-cursor="LINK"
                      title="Open GitHub Source"
                      className="p-1.5 rounded-lg bg-surface-light text-text-muted hover:text-text-primary hover:bg-accent/20 transition-all border border-border"
                    >
                      <Github size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
