"use client";

import React, { useEffect, useState } from "react";
import { soundFx } from "@/lib/sound";

export default function EasterEggs() {
  const [showSystemHud, setShowSystemHud] = useState(false);
  const [hudMessage, setHudMessage] = useState<string | null>(null);

  useEffect(() => {
    let konamiIndex = 0;
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    let buffer = "";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in input / textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      // Check Konami Code
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          konamiIndex = 0;
          document.body.classList.toggle("wireframe-mode");
          soundFx.action();
          setHudMessage("WIREFRAME MODE TOGGLED");
          setTimeout(() => setHudMessage(null), 3000);
        }
      } else {
        konamiIndex = 0;
      }

      // Check 'H' key for System HUD
      if (e.key === "h" || e.key === "H") {
        setShowSystemHud((prev) => !prev);
        soundFx.click();
      }

      // Check buffer for `/skills`
      buffer += e.key;
      if (buffer.length > 10) buffer = buffer.slice(-10);
      if (buffer.endsWith("/skills")) {
        const evt = new CustomEvent("open-command-palette", { detail: { query: "skills" } });
        window.dispatchEvent(evt);
        soundFx.open();
        buffer = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Easter Egg Feedback Toast */}
      {hudMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-accent text-background px-4 py-2 font-mono text-xs font-bold tracking-widest uppercase shadow-2xl rounded">
          {hudMessage}
        </div>
      )}

      {/* System HUD Overlay (H Key) */}
      {showSystemHud && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setShowSystemHud(false)}
        >
          <div
            className="w-full max-w-lg bg-surface border border-border p-8 rounded-xl shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div className="font-mono text-xs text-accent tracking-widest uppercase">
                HYDER.SYSTEM // DIAGNOSTICS
              </div>
              <button
                onClick={() => setShowSystemHud(false)}
                className="font-mono text-xs text-text-muted hover:text-text-primary"
              >
                [ESC / CLOSE]
              </button>
            </div>
            <div className="space-y-4 font-mono text-xs text-text-secondary leading-relaxed">
              <p className="text-text-primary text-sm font-display font-semibold">
                &ldquo;BUILD. LEARN. EXPLAIN. LEAD. REPEAT.&rdquo;
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-text-muted block text-[10px]">OPERATING CORE</span>
                  <span>MOHAMMED HYDER SHAREEF</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">AFFILIATION</span>
                  <span>IIT JODHPUR (2029)</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">COORDINATES</span>
                  <span>HYDERABAD, INDIA</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">ENGINEERING MODE</span>
                  <span className="text-accent-cyan">ACTIVE (2026)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-border text-[11px] text-text-muted">
                Tip: Press <kbd className="text-text-primary bg-surface-light px-1.5 py-0.5 rounded">CMD+K</kbd> for Command Palette, or hold <kbd className="text-text-primary bg-surface-light px-1.5 py-0.5 rounded">SPACE</kbd> to Skim chapters.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
