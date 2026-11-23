import { useState, useEffect, useRef, useCallback } from 'react';

interface UseMicrophoneBlowProps {
  enabled: boolean;
  onBlow: () => void;
  threshold?: number;
}

export function useMicrophoneBlow({
  enabled,
  onBlow,
  threshold = 55,
}: UseMicrophoneBlowProps) {
  const [isListening, setIsListening] = useState(false);
  const [micPermission, setMicPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [blowLevel, setBlowLevel] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const blowDurationRef = useRef<number>(0);

  const startListening = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicPermission('denied');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      mediaStreamRef.current = stream;
      setMicPermission('granted');
      setIsListening(true);

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.3;
      source.connect(analyser);
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkBlow = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Blowing into a microphone creates intense low-frequency rumble & wide energy
        let lowEnergy = 0;
        const lowBins = Math.min(16, bufferLength);
        for (let i = 0; i < lowBins; i++) {
          lowEnergy += dataArray[i];
        }
        const avgLow = lowEnergy / lowBins;
        const normalized = Math.min(100, Math.round((avgLow / 255) * 125));

        setBlowLevel(normalized);

        if (normalized >= threshold) {
          blowDurationRef.current += 1;
          // Require at least ~4 consecutive frames of blow to avoid accidental clicks
          if (blowDurationRef.current >= 4) {
            onBlow();
            stopListening();
            return;
          }
        } else {
          blowDurationRef.current = Math.max(0, blowDurationRef.current - 1);
        }

        rafRef.current = requestAnimationFrame(checkBlow);
      };

      rafRef.current = requestAnimationFrame(checkBlow);
    } catch (err) {
      console.warn('Microphone permission not granted or unavailable:', err);
      setMicPermission('denied');
      setIsListening(false);
    }
  }, [threshold, onBlow]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setBlowLevel(0);
    blowDurationRef.current = 0;
  }, []);

  useEffect(() => {
    if (enabled && micPermission === 'prompt') {
      // Proactively request mic when ceremony begins
      startListening();
    } else if (!enabled && isListening) {
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [enabled, micPermission, isListening, startListening, stopListening]);

  return {
    isListening,
    micPermission,
    blowLevel,
    startListening,
    stopListening,
  };
}
