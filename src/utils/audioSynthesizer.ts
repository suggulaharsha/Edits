// Web Audio API Synthesizer for instant, realistic SFX auditioning in browser
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSfxSound(type: 'whoosh' | 'impact' | 'cash' | 'glitch' | 'subdrop' | 'camera' | 'click' | 'anime'): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    switch (type) {
      case 'whoosh': {
        // Filtered white noise with exponential sweep
        const bufferSize = ctx.sampleRate * 0.45;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(3, now);
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.2);
        filter.frequency.exponentialRampToValueAtTime(150, now + 0.45);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.8, now + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + 0.45);
        break;
      }

      case 'impact': {
        // Deep sub punch + short burst
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.6);

        gain.gain.setValueAtTime(1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        // Click transient
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(800, now);
        osc2.frequency.exponentialRampToValueAtTime(60, now + 0.08);
        gain2.gain.setValueAtTime(0.6, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc.start(now);
        osc2.start(now);
        osc.stop(now + 0.65);
        osc2.stop(now + 0.09);
        break;
      }

      case 'subdrop': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(95, now);
        osc.frequency.exponentialRampToValueAtTime(24, now + 1.2);

        gain.gain.setValueAtTime(0.8, now);
        gain.gain.linearRampToValueAtTime(0.9, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.3);
        break;
      }

      case 'cash': {
        // Two high bell dings like a cash register chime
        const playBell = (freq: number, startDelay: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + startDelay);

          gain.gain.setValueAtTime(0.4, now + startDelay);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + startDelay + 0.5);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + startDelay);
          osc.stop(now + startDelay + 0.5);
        };

        playBell(1580, 0);
        playBell(2100, 0.09);
        break;
      }

      case 'camera': {
        // Mechanical shutter click-clack
        const click = (delay: number, pitch: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(pitch, now + delay);
          gain.gain.setValueAtTime(0.4, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.03);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.04);
        };

        click(0, 1200);
        click(0.04, 600);
        break;
      }

      case 'click': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, now);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case 'glitch': {
        // Rapid frequency stepped burst
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.setValueAtTime(180, now + 0.04);
        osc.frequency.setValueAtTime(890, now + 0.08);
        osc.frequency.setValueAtTime(120, now + 0.12);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
        break;
      }

      case 'anime': {
        // High shonen ping/chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1760, now); // A6
        osc.frequency.exponentialRampToValueAtTime(3520, now + 0.25); // A7

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
        break;
      }
    }
  } catch (e) {
    console.warn('Audio play prevented or unsupported:', e);
  }
}
