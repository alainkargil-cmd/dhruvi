// Web Audio API Sound Synthesizer & Audio Player
// Provides fallback synthesized sound effects and dreamy ambient music
// so the experience works flawlessly even before external MP3s are provided.

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.6;
  private bgmPlaying: boolean = false;
  private bgmInterval: number | null = null;
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.bgmPlaying) {
      this.stopBGM();
    } else if (!muted && !this.bgmPlaying) {
      this.startBGM();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  // Play synthesized or real audio file
  private tryPlayFile(path: string, fallback: () => void) {
    if (this.isMuted) return;
    this.initContext();

    let audio = this.audioCache.get(path);
    if (!audio) {
      audio = new Audio(path);
      audio.volume = this.volume;
      this.audioCache.set(path, audio);
    }

    audio.currentTime = 0;
    audio.play().catch(() => {
      // If file not found or blocked, use synthesizer fallback
      fallback();
    });
  }

  // --- Sound Effects Synthesizers ---

  public playPageTurn() {
    this.tryPlayFile('./assets/audio/page-turn.mp3', () => {
      if (this.isMuted) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // White noise buffer for paper rustle
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.25);
      filter.Q.value = 3;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
    });
  }

  public playGiftOpen() {
    this.tryPlayFile('./assets/audio/gift-open.mp3', () => {
      if (this.isMuted) return;
      this.initContext();
      if (!this.ctx) return;

      // Magical chime glissando
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.001, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(this.volume * 0.25, now + idx * 0.05 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.85);
      });
    });
  }

  public playCandleBlow() {
    this.tryPlayFile('./assets/audio/candle-blow.mp3', () => {
      if (this.isMuted) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Soft gentle breath whoosh
      const bufferSize = this.ctx.sampleRate * 0.6;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.6);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
    });
  }

  public playCakeCut() {
    this.tryPlayFile('./assets/audio/cake-cut.mp3', () => {
      if (this.isMuted) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Sweet bell chime + gentle slice
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.4);

      gain.gain.setValueAtTime(this.volume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    });
  }

  public playFireworkLaunch() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.45);

    gain.gain.setValueAtTime(this.volume * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  public playFireworkExplosion() {
    this.tryPlayFile('./assets/audio/fireworks.mp3', () => {
      if (this.isMuted) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Low boom
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.6);

      oscGain.gain.setValueAtTime(this.volume * 0.5, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);

      // Sparkle crackles
      for (let i = 0; i < 4; i++) {
        const delay = 0.1 + Math.random() * 0.35;
        const popOsc = this.ctx.createOscillator();
        const popGain = this.ctx.createGain();
        popOsc.type = 'triangle';
        popOsc.frequency.setValueAtTime(600 + Math.random() * 800, now + delay);

        popGain.gain.setValueAtTime(this.volume * 0.15, now + delay);
        popGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.08);

        popOsc.connect(popGain);
        popGain.connect(this.ctx.destination);

        popOsc.start(now + delay);
        popOsc.stop(now + delay + 0.09);
      }
    });
  }

  // Dreamy ambient music generator using Pentatonic celestial arpeggios
  public startBGM() {
    if (this.bgmPlaying || this.isMuted) return;
    this.initContext();
    this.bgmPlaying = true;

    // Try playing background-music.mp3 first
    const bgmAudio = new Audio('./assets/audio/background-music.mp3');
    bgmAudio.loop = true;
    bgmAudio.volume = this.volume * 0.5;

    bgmAudio.play().then(() => {
      this.audioCache.set('bgm', bgmAudio);
    }).catch(() => {
      // Synthesize ambient celestial music
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C major pentatonic
      let noteIdx = 0;

      const playDreamyChord = () => {
        if (!this.bgmPlaying || !this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;
        const root = scale[noteIdx % scale.length];
        const fifth = root * 1.5;
        const octave = root * 2;

        [root, fifth, octave].forEach((f, i) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.15);

          gain.gain.setValueAtTime(0.001, now + i * 0.15);
          gain.gain.linearRampToValueAtTime(this.volume * 0.08, now + i * 0.15 + 0.6);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.15 + 3.2);

          osc.connect(gain);
          gain.connect(this.ctx!.destination);

          osc.start(now + i * 0.15);
          osc.stop(now + i * 0.15 + 3.3);
        });

        noteIdx = (noteIdx + 1 + Math.floor(Math.random() * 2)) % scale.length;
      };

      playDreamyChord();
      this.bgmInterval = window.setInterval(playDreamyChord, 2200);
    });
  }

  public stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    const bgm = this.audioCache.get('bgm');
    if (bgm) {
      bgm.pause();
    }
  }
}

export const soundManager = new SoundManager();
