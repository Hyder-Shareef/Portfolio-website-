"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, CornerDownLeft, Volume2, Palette, Shield, Sparkles, Copy, Check, Linkedin, Github } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { toggleSound, soundFx } from "@/lib/sound";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  category: "NAVIGATION" | "PROJECTS" | "ACTIONS" | "EASTER EGGS";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-work",
      category: "NAVIGATION",
      title: "Go to Selected Work",
      subtitle: "02 / HEAULT · OMNIS · IRIS · ARCHON",
      icon: <Sparkles size={14} className="text-accent" />,
      action: () => {
        window.location.hash = "work";
        onClose();
      },
    },
    {
      id: "nav-about",
      category: "NAVIGATION",
      title: "Go to About & Identity",
      subtitle: "01 / IIT JODHPUR · LEAPSTART",
      icon: <ArrowRight size={14} className="text-accent-cyan" />,
      action: () => {
        window.location.hash = "about";
        onClose();
      },
    },
    {
      id: "nav-exp",
      category: "NAVIGATION",
      title: "Go to Experience Timeline",
      subtitle: "03 / LEAPSTART · SKILLSYNTH · 0XSHUNYA",
      icon: <ArrowRight size={14} className="text-accent-green" />,
      action: () => {
        window.location.hash = "experience";
        onClose();
      },
    },
    {
      id: "nav-skills",
      category: "NAVIGATION",
      title: "Go to Skill Constellation",
      subtitle: "04 / 3D GRAPH · AI · DATABASES · SECURITY",
      icon: <Sparkles size={14} className="text-accent" />,
      action: () => {
        window.location.hash = "capabilities";
        onClose();
      },
    },
    {
      id: "nav-contact",
      category: "NAVIGATION",
      title: "Go to Contact",
      subtitle: "06 / DIRECT EMAIL & CHANNELS",
      icon: <CornerDownLeft size={14} className="text-text-primary" />,
      action: () => {
        window.location.hash = "contact";
        onClose();
      },
    },

    // Projects
    {
      id: "proj-heault",
      category: "PROJECTS",
      title: "Case Study: HEAULT",
      subtitle: "Health Records & OCR Document Synthesizer",
      icon: <Sparkles size={14} className="text-accent" />,
      action: () => {
        window.location.hash = "work";
        onClose();
      },
    },
    {
      id: "proj-omnis",
      category: "PROJECTS",
      title: "Case Study: OMNIS",
      subtitle: "Global Telemetry & AQI Orbital Sphere",
      icon: <Sparkles size={14} className="text-accent-cyan" />,
      action: () => {
        window.location.hash = "work";
        onClose();
      },
    },
    {
      id: "proj-iris",
      category: "PROJECTS",
      title: "Case Study: PROJECTIRIS",
      subtitle: "AI Threat Detection & Network Topology",
      icon: <Shield size={14} className="text-accent" />,
      action: () => {
        window.location.hash = "work";
        onClose();
      },
    },
    {
      id: "proj-archon",
      category: "PROJECTS",
      title: "Case Study: ARCHON",
      subtitle: "Autonomous Multi-Agent AI Framework",
      icon: <Sparkles size={14} className="text-accent-cyan" />,
      action: () => {
        window.location.hash = "work";
        onClose();
      },
    },

    // Actions
    {
      id: "act-open-linkedin",
      category: "ACTIONS",
      title: "Open LinkedIn Profile",
      subtitle: "mohammed-hyder-shareef-61116a361",
      icon: <Linkedin size={14} className="text-accent-cyan" />,
      action: () => {
        window.open(portfolioData.linkedin, "_blank");
        soundFx.action();
        onClose();
      },
    },
    {
      id: "act-open-github",
      category: "ACTIONS",
      title: "Open GitHub Profile",
      subtitle: portfolioData.github,
      icon: <Github size={14} className="text-text-primary" />,
      action: () => {
        window.open(portfolioData.github, "_blank");
        soundFx.action();
        onClose();
      },
    },
    {
      id: "act-copy-email",
      category: "ACTIONS",
      title: "Copy Hyder's Email",
      subtitle: portfolioData.email,
      icon: copied ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />,
      action: () => {
        navigator.clipboard.writeText(portfolioData.email);
        setCopied(true);
        soundFx.action();
        setTimeout(() => {
          setCopied(false);
          onClose();
        }, 1200);
      },
    },
    {
      id: "act-toggle-sound",
      category: "ACTIONS",
      title: "Toggle Synthesized Audio",
      subtitle: "Web Audio procedural feedback",
      icon: <Volume2 size={14} className="text-accent-cyan" />,
      action: () => {
        toggleSound();
        onClose();
      },
    },
    {
      id: "act-blueprint",
      category: "EASTER EGGS",
      title: "Toggle Blueprint Mode",
      subtitle: "Experimental CAD schematic visual style",
      icon: <Palette size={14} className="text-accent-cyan" />,
      action: () => {
        document.body.classList.toggle("blueprint-mode");
        soundFx.action();
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle?.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          soundFx.open();
          const evt = new CustomEvent("open-command-palette");
          window.dispatchEvent(evt);
        }
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [isOpen, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      soundFx.hover();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      soundFx.hover();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-3 sm:px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto sm:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-surface-light/40">
          <Search size={16} className="text-text-muted" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search sections..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-text-primary text-sm font-mono placeholder:text-text-muted focus:outline-none"
          />
          <kbd className="font-mono text-[10px] text-text-muted bg-surface px-2 py-0.5 rounded border border-border">
            ESC
          </kbd>
        </div>

        {/* Command Items List */}
        <div className="max-h-[60vh] sm:max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center font-mono text-xs text-text-muted">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    soundFx.click();
                    cmd.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? "bg-text-primary/10 border-l-2 border-accent" : "hover:bg-surface-light"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-surface-light border border-border">
                      {cmd.icon}
                    </div>
                    <div>
                      <div className="font-mono text-xs font-semibold text-text-primary">
                        {cmd.title}
                      </div>
                      {cmd.subtitle && (
                        <div className="font-mono text-[10px] text-text-muted">
                          {cmd.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-wider bg-surface px-1.5 py-0.5 rounded border border-border">
                    {cmd.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-border bg-surface-light/20 flex justify-between items-center font-mono text-[10px] text-text-muted">
          <span>Use ↑↓ to navigate</span>
          <span>Press ↵ to select</span>
        </div>
      </div>
    </div>
  );
}
