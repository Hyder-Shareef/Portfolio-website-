"use client";

import React from "react";
import { Mic2, Users, Sparkles, Presentation, Terminal, Flame } from "lucide-react";
import { soundFx } from "@/lib/sound";

const facets = [
  {
    icon: <Presentation size={24} className="text-accent" />,
    title: "TECHNICAL DEMOS & ARCHITECTURE WALKS",
    badge: "PRECISION & CLARITY",
    description:
      "A firm believer that if you cannot explain a system in 60 seconds without slides, you haven't mastered its mechanics. Regularly delivering deep-dive live system architectures and code walkthroughs.",
  },
  {
    icon: <Mic2 size={24} className="text-accent-cyan" />,
    title: "STAND-UP COMEDY & TIMING",
    badge: "NARRATIVE & CHARISMA",
    description:
      "Bringing observational humor, rhythm, and storytelling from stand-up comedy to technical presentations. Breaking complex engineering tension with relatable, sharp narratives.",
  },
  {
    icon: <Users size={24} className="text-accent-green" />,
    title: "COMMUNITY LEADERSHIP",
    badge: "SKILLSYNTH & BEYOND",
    description:
      "Spearheading developer learning circles, hackathon prep groups, and hands-on workshops. Bridging the gap between raw student curiosity and production-grade engineering practices.",
  },
  {
    icon: <Flame size={24} className="text-accent" />,
    title: "HACKATHONS & RAPID PROTOTYPING",
    badge: "48-HOUR SPRINT RIGOR",
    description:
      "Thriving under high-pressure rapid synthesis sprints. Turning ambiguous problem statements into working full-stack prototypes, structured schemas, and functional AI agents overnight.",
  },
];

export default function BeyondTheScreen() {
  return (
    <section id="leadership" className="relative w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 md:px-14 bg-background hairline-top">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs text-text-muted hairline-bottom pb-4">
          <div className="flex items-center gap-3">
            <span className="text-accent font-bold">Nº005</span>
            <span className="text-text-primary uppercase tracking-widest font-semibold">
              / BEYOND THE SCREEN
            </span>
          </div>
          <div className="text-[11px] uppercase tracking-wider text-text-dim">
            COMMUNICATION · COMEDY · LEADERSHIP · DEMOS
          </div>
        </div>

        {/* Big Editorial Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="chapter-title text-text-primary uppercase tracking-tight">
              CODE IS HALF THE CRAFT. <br />
              <span className="text-stroke hover:text-accent transition-colors duration-300">
                COMMUNICATION IS THE MULTIPLIER.
              </span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-text-secondary leading-relaxed">
            Engineering exists in human ecosystems. The ability to articulate, inspire, pitch, and entertain elevates software from isolated scripts into transformative movements.
          </p>
        </div>

        {/* Facet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facets.map((facet, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundFx.hover()}
              className="group p-8 bg-surface border border-border hover:border-accent/50 rounded-2xl space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-surface-light border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                  {facet.icon}
                </div>
                <span className="font-mono text-[10px] text-accent font-bold px-2.5 py-1 bg-surface-light border border-border rounded-full tracking-widest">
                  {facet.badge}
                </span>
              </div>

              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-text-primary group-hover:text-accent transition-colors">
                {facet.title}
              </h3>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                {facet.description}
              </p>
            </div>
          ))}
        </div>

        {/* High-Impact Quote Banner */}
        <div className="p-8 sm:p-12 rounded-2xl bg-surface-light/40 border border-border flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="font-mono text-xs text-accent uppercase tracking-widest">
              // PHILOSOPHY IN ACTION
            </div>
            <p className="font-display font-bold text-xl sm:text-2xl text-text-primary leading-snug">
              &ldquo;Great technology should never hide behind opaque jargon. If you build it with rigor, you can share it with clarity.&rdquo;
            </p>
          </div>
          <div className="font-mono text-xs text-text-muted text-right relative z-10 shrink-0">
            <span className="block text-text-primary font-bold">MOHAMMED HYDER SHAREEF</span>
            <span className="block text-[11px] text-accent-cyan">IIT Jodhpur · Leapstart</span>
          </div>
        </div>
      </div>
    </section>
  );
}
