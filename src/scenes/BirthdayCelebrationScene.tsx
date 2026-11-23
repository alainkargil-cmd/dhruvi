import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, Utensils, RotateCcw, Mail, ArrowRight, Mic, MicOff } from 'lucide-react';
import { BirthdayConfig } from '../config/birthdayConfig';
import { useMicrophoneBlow } from '../hooks/useMicrophoneBlow';

interface BirthdayCelebrationSceneProps {
  currentSubStage: 'cake' | 'reveal' | 'fireworks';
  config: BirthdayConfig;
  candlesLit: boolean;
  candlesBlown: boolean;
  cakeCut: boolean;
  sliceServed: boolean;
  onBlowCandles: () => void;
  onCutCake: () => void;
  onServeSlice: () => void;
  onTriggerFireworks: () => void;
  onReplayFireworks: () => void;
  onOpenLetter: () => void;
}

export const BirthdayCelebrationScene: React.FC<BirthdayCelebrationSceneProps> = ({
  currentSubStage,
  config,
  candlesLit,
  candlesBlown,
  cakeCut,
  sliceServed,
  onBlowCandles,
  onCutCake,
  onServeSlice,
  onTriggerFireworks,
  onReplayFireworks,
  onOpenLetter,
}) => {
  const { celebration } = config;

  // Real-life microphone candle blowing hook
  const { isListening, micPermission, blowLevel, startListening } = useMicrophoneBlow({
    enabled: currentSubStage === 'cake' && !candlesBlown,
    onBlow: onBlowCandles,
    threshold: 50,
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col items-center justify-between p-4 sm:p-8 select-none">
      {/* Top Banner */}
      <div className="pointer-events-auto flex items-center gap-2 px-5 py-2 rounded-full fantasy-glass text-xs font-serif text-[#FAF6F0] shadow-lg mt-2">
        <Sparkles size={16} className="text-[#FFE494] animate-spin" />
        <span className="font-semibold tracking-widest uppercase">
          {currentSubStage === 'cake' ? 'The Birthday Cake Ceremony' : 'The Grand Celebration Finale'}
        </span>
      </div>

      {/* ================================================================ */}
      {/* STAGE 1: THE CAKE CEREMONY CONTROLS */}
      {/* ================================================================ */}
      {currentSubStage === 'cake' && (
        <div className="pointer-events-auto flex flex-col items-center text-center max-w-lg w-full mb-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Make a wish and blow out the candles */}
            {!candlesBlown && (
              <motion.div
                key="blow"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                className="relative flex flex-col items-center p-6 sm:p-8 rounded-3xl fantasy-glass border-2 border-[#E5C158] shadow-[0_0_60px_rgba(229,193,88,0.4)] w-full"
              >
                {/* Instruction Header */}
                <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#E5C158] font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#FFE494]" /> Step 1: Make Your Wish
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFE494] mb-2 drop-shadow-md">
                  "{celebration.makeAWishText}"
                </h3>

                {/* Real-life Blowing Instruction Highlight */}
                <div className="my-4 p-4 rounded-2xl bg-[#2C1810]/90 border border-[#E5C158]/50 shadow-inner flex flex-col items-center w-full">
                  <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#F5D77F] mb-1">
                    <Wind size={18} className="text-[#FFE494] animate-pulse" />
                    <span>BLOW IN REAL LIFE!</span>
                  </div>
                  <p className="text-xs text-[#FAF6F0]/90 leading-relaxed max-w-xs mb-3">
                    Blow gently into your microphone in real life to blow out the candles, or tap the button below.
                  </p>

                  {/* Mic Listening Status & Live Blow Level Meter */}
                  <div className="w-full max-w-xs flex flex-col items-center gap-1.5">
                    <div className="flex items-center justify-between w-full text-[10px] text-[#FAF6F0]/70 font-mono">
                      <span className="flex items-center gap-1">
                        {isListening ? (
                          <Mic size={12} className="text-emerald-400 animate-pulse" />
                        ) : (
                          <MicOff size={12} className="text-amber-400" />
                        )}
                        {isListening ? 'Mic active — Blow now!' : 'Microphone standby'}
                      </span>
                      <span>{blowLevel}%</span>
                    </div>

                    {/* Wind Intensity Bar */}
                    <div className="w-full h-2.5 rounded-full bg-[#150804] border border-[#E5C158]/40 overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE494] to-[#FFF] transition-all duration-75 shadow-[0_0_10px_#FFE494]"
                        style={{ width: `${Math.min(100, blowLevel)}%` }}
                      />
                    </div>

                    {!isListening && micPermission !== 'denied' && (
                      <button
                        onClick={startListening}
                        className="mt-1 text-[10px] text-[#FFE494] underline hover:text-white"
                      >
                        Enable microphone detection
                      </button>
                    )}
                  </div>
                </div>

                {/* Button Fallback */}
                <button
                  onClick={onBlowCandles}
                  className="mt-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE494] to-[#E5C158] text-[#1D0C07] font-serif font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_30px_rgba(229,193,88,0.7)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Wind size={18} /> {celebration.blowButtonText}
                </button>
              </motion.div>
            )}

            {/* Step 2: Cut the birthday cake */}
            {candlesBlown && !cakeCut && (
              <motion.div
                key="cut"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                className="flex flex-col items-center p-6 sm:p-8 rounded-3xl fantasy-glass border-2 border-[#E5C158] shadow-[0_0_60px_rgba(229,193,88,0.4)] w-full"
              >
                <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#E5C158] font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#FFE494]" /> Step 2: The First Slice
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF6F0] mb-2 drop-shadow-md">
                  "May Your Wishes Come True!"
                </h3>
                <p className="text-xs text-[#FAF6F0]/90 mb-5 max-w-sm leading-relaxed">
                  The candles are out! Touch and drag the golden knife across the cake, or press the button to cut the first slice.
                </p>
                <button
                  onClick={onCutCake}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C88A85] to-[#FFE494] text-[#1D0C07] font-serif font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_30px_rgba(229,193,88,0.7)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Utensils size={18} /> Cut The Birthday Cake
                </button>
              </motion.div>
            )}

            {/* Step 3: Serve the first slice & trigger Grand Reveal */}
            {cakeCut && !sliceServed && (
              <motion.div
                key="serve"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                className="flex flex-col items-center p-6 sm:p-8 rounded-3xl fantasy-glass border-2 border-[#E5C158] shadow-[0_0_60px_rgba(229,193,88,0.4)] w-full"
              >
                <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#E5C158] font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#FFE494]" /> Step 3: Serve & Celebrate
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFE494] mb-2 drop-shadow-md">
                  "{celebration.cakeCutText}"
                </h3>
                <p className="text-xs text-[#FAF6F0]/90 mb-5 max-w-sm leading-relaxed">
                  The first slice is ready on its golden plate! Tap below to unlock the grand celebration finale.
                </p>
                <button
                  onClick={onServeSlice}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE494] to-[#E5C158] text-[#1D0C07] font-serif font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_35px_rgba(229,193,88,0.8)] hover:scale-105 active:scale-95 transition-all"
                >
                  {celebration.serveSliceText} <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ================================================================ */}
      {/* STAGE 2 & 3: GRAND REVEAL & VIRTUAL FIREWORKS FINALE */}
      {/* ================================================================ */}
      {(currentSubStage === 'reveal' || currentSubStage === 'fireworks') && (
        <div className="pointer-events-auto flex flex-col items-center text-center max-w-2xl w-full my-auto z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="p-8 sm:p-12 rounded-3xl fantasy-glass border-2 border-[#E5C158] shadow-[0_0_80px_rgba(229,193,88,0.5)] flex flex-col items-center"
          >
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-wider gold-gradient-text drop-shadow-[0_0_30px_rgba(229,193,88,0.8)] mb-4">
              {celebration.headline}
            </h1>

            {/* Subtitle */}
            <p className="font-script text-2xl sm:text-3xl text-[#FFE494] mb-4">
              "{celebration.subtitle}"
            </p>

            {/* Secondary Text */}
            <p className="font-serif text-sm sm:text-base text-[#FAF6F0]/90 max-w-lg leading-relaxed italic mb-8">
              {celebration.secondaryText}
            </p>

            {/* Action Buttons: Replay Fireworks & Final Letter */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onReplayFireworks}
                className="px-6 py-3 rounded-full bg-[#3B2219] border border-[#E5C158] text-[#F5D77F] hover:bg-[#4E2A1E] text-xs font-serif tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg hover:scale-105"
              >
                <RotateCcw size={16} /> {celebration.fireworksReplayText}
              </button>

              <button
                onClick={onOpenLetter}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE494] to-[#E5C158] text-[#1D0C07] font-serif font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_30px_rgba(229,193,88,0.8)] hover:scale-105 transition-all"
              >
                <Mail size={16} /> Read Your Final Birthday Letter
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
