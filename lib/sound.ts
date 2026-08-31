// Web Audio API procedural sound engine - Zero external audio assets needed

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  if (soundEnabled && !audioCtx && typeof window !== "undefined") {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (soundEnabled) {
    playTone(520, 0.08, "sine", 0.05);
  }
  return soundEnabled;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = "sine", volume = 0.03) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Graceful fallback
  }
}

export const soundFx = {
  click: () => {
    playTone(800, 0.04, "triangle", 0.04);
  },
  hover: () => {
    playTone(320, 0.03, "sine", 0.015);
  },
  open: () => {
    if (!soundEnabled) return;
    playTone(440, 0.06, "sine", 0.03);
    setTimeout(() => playTone(660, 0.08, "sine", 0.03), 40);
  },
  close: () => {
    if (!soundEnabled) return;
    playTone(600, 0.05, "sine", 0.03);
    setTimeout(() => playTone(350, 0.07, "sine", 0.02), 40);
  },
  action: () => {
    playTone(980, 0.06, "sine", 0.03);
  },
  skim: () => {
    playTone(280 + Math.random() * 200, 0.02, "sawtooth", 0.01);
  },
};
