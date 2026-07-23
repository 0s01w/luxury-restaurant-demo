// Web Audio API Synthesizer for Fine Dining Ambient Lounge Soundscape & UI Chimes

let audioCtx: AudioContext | null = null;
let ambientOsc1: OscillatorNode | null = null;
let ambientOsc2: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
let isAmbientPlaying = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a warm, subtle UI interaction chime
 */
export function playUiChime(pitch: 'low' | 'mid' | 'high' | 'gold' = 'mid') {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freqs = {
      low: 261.63, // C4
      mid: 440.0,  // A4
      high: 880.0, // A5
      gold: 587.33, // D5
    };

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freqs[pitch], ctx.currentTime);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {
    // Graceful fallback if audio is disabled
  }
}

/**
 * Toggles ambient fine-dining lounge harmonic swell
 */
export function toggleAmbientSoundscape(): boolean {
  try {
    const ctx = getAudioContext();

    if (isAmbientPlaying) {
      if (ambientGain) {
        ambientGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
        setTimeout(() => {
          ambientOsc1?.stop();
          ambientOsc2?.stop();
          ambientOsc1?.disconnect();
          ambientOsc2?.disconnect();
          ambientGain?.disconnect();
          ambientOsc1 = null;
          ambientOsc2 = null;
          ambientGain = null;
        }, 1600);
      }
      isAmbientPlaying = false;
      return false;
    } else {
      // Create lush 2026 ambient lounge harmony (D minor 9 warm pad sound)
      ambientOsc1 = ctx.createOscillator();
      ambientOsc2 = ctx.createOscillator();
      ambientGain = ctx.createGain();

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      ambientOsc1.type = 'sine';
      ambientOsc1.frequency.setValueAtTime(146.83, ctx.currentTime); // D3

      ambientOsc2.type = 'sine';
      ambientOsc2.frequency.setValueAtTime(220.0, ctx.currentTime); // A3

      ambientGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      ambientGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2.0);

      ambientOsc1.connect(filter);
      ambientOsc2.connect(filter);
      filter.connect(ambientGain);
      ambientGain.connect(ctx.destination);

      ambientOsc1.start();
      ambientOsc2.start();

      isAmbientPlaying = true;
      playUiChime('gold');
      return true;
    }
  } catch (e) {
    return false;
  }
}

export function isAmbientActive(): boolean {
  return isAmbientPlaying;
}
