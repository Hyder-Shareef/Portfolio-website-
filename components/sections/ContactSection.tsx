"use client";

import React, { useState, useEffect } from "react";
import { Send, Copy, Check, Github, Linkedin, Mail, Clock, MapPin, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { soundFx } from "@/lib/sound";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionStatus, setTransmissionStatus] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  // Live Hyderabad IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(now.toLocaleTimeString("en-GB", options) + " IST");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    soundFx.action();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.action();
    setIsTransmitting(true);
    setTransmissionStatus("Preparing direct message...");

    setTimeout(() => {
      setTransmissionStatus("Opening email client...");
      setIsTransmitting(false);

      // Trigger mailto link for seamless local mail client dispatch
      const mailtoLink = `mailto:${portfolioData.email}?subject=Project Collaboration / Inquiry from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(
        `Hi Hyder,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;
      window.location.href = mailtoLink;

      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setTransmissionStatus(null), 4000);
    }, 600);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 md:px-14 bg-background hairline-top">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs text-text-muted hairline-bottom pb-4">
          <div className="flex items-center gap-3">
            <span className="text-accent font-bold">06</span>
            <span className="text-text-primary uppercase tracking-widest font-semibold">
              / GET IN TOUCH
            </span>
          </div>
          <div className="text-[11px] uppercase tracking-wider text-text-dim">
            COLLABORATION · OPPORTUNITIES · HYDERABAD
          </div>
        </div>

        {/* Big Editorial Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="chapter-title text-text-primary uppercase tracking-tight">
              LET&apos;S BUILD SOMETHING <br />
              <span className="text-stroke hover:text-accent transition-colors duration-300">
                EXTRAORDINARY.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-text-secondary leading-relaxed">
            Whether you&apos;re discussing applied AI research, full-stack architectural builds, cybersecurity initiatives, or speaking engagements—let&apos;s connect.
          </p>
        </div>

        {/* Split Grid: Left Quick Channels / Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Direct Channel Badges & Telemetry */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Copy Email Card */}
            <div className="p-6 bg-surface border border-border rounded-2xl space-y-4">
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest block font-semibold">
                DIRECT INBOX
              </span>
              <div className="flex items-center justify-between gap-2 p-3.5 bg-surface-light rounded-xl border border-border">
                <span className="font-mono text-xs sm:text-sm text-text-primary truncate font-medium">
                  {portfolioData.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  data-cursor="LINK"
                  className="flex items-center gap-1.5 font-mono text-xs px-3.5 py-1.5 bg-accent text-background rounded-lg hover:opacity-90 transition-opacity font-bold shrink-0"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
              </div>
            </div>

            {/* Coordinates & Local Time */}
            <div className="p-6 bg-surface border border-border rounded-2xl space-y-4 font-mono text-xs">
              <span className="text-text-muted uppercase tracking-widest block font-semibold">
                LOCATION & AVAILABILITY
              </span>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-text-secondary">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-accent" />
                    <span>LOCATION</span>
                  </div>
                  <span className="text-text-primary font-medium">{portfolioData.location}</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-accent-cyan" />
                    <span>LOCAL TIME</span>
                  </div>
                  <span className="text-accent-cyan font-bold">{currentTime || "SYNCING..."}</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-accent-green" />
                    <span>STATUS</span>
                  </div>
                  <span className="text-accent-green font-bold">{portfolioData.status}</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-6 bg-surface border border-border rounded-2xl space-y-4">
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest block font-semibold">
                SOCIAL & CODE PROFILES
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={portfolioData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.action()}
                  data-cursor="LINK"
                  className="flex items-center gap-2 font-mono text-xs px-4 py-2.5 bg-surface-light hover:bg-accent hover:text-background text-text-primary rounded-xl border border-border transition-all font-medium"
                >
                  <Github size={15} />
                  <span>GITHUB</span>
                </a>
                <a
                  href={portfolioData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.action()}
                  data-cursor="LINK"
                  className="flex items-center gap-2 font-mono text-xs px-4 py-2.5 bg-surface-light hover:bg-accent hover:text-background text-text-primary rounded-xl border border-border transition-all font-medium"
                >
                  <Linkedin size={15} />
                  <span>LINKEDIN</span>
                </a>
                <a
                  href={`mailto:${portfolioData.email}`}
                  onClick={() => soundFx.action()}
                  data-cursor="LINK"
                  className="flex items-center gap-2 font-mono text-xs px-4 py-2.5 bg-surface-light hover:bg-accent hover:text-background text-text-primary rounded-xl border border-border transition-all font-medium"
                >
                  <Mail size={15} />
                  <span>EMAIL</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-surface border border-border p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-accent" />
                <span className="text-text-primary font-bold">SEND A DIRECT INQUIRY</span>
              </div>
              <span className="text-[10px] text-text-muted">FAST RESPONSE</span>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                  01 // YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Turing"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface-light border border-border focus:border-accent rounded-xl p-3 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                  02 // RETURN EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-light border border-border focus:border-accent rounded-xl p-3 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                  03 // MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your project, speaking event, research inquiry or idea..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-surface-light border border-border focus:border-accent rounded-xl p-3 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none transition-colors resize-none"
                />
              </div>

              {transmissionStatus && (
                <div className="font-mono text-xs text-accent-cyan p-3 bg-surface-light rounded-lg border border-border animate-pulse">
                  &gt; {transmissionStatus}
                </div>
              )}

              <button
                type="submit"
                disabled={isTransmitting}
                data-cursor="SEND"
                className="w-full py-3.5 bg-accent hover:opacity-90 text-background font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send size={14} />
                <span>{isTransmitting ? "SENDING..." : "SEND MESSAGE"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
