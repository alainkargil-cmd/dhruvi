import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, Utensils, RotateCcw, Mail, ArrowRight } from 'lucide-react';
import { BirthdayConfig } from '../config/birthdayConfig';

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

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col items-center justify-between p-4 sm:p-8 select-none">
      {/* Top Banner */}
      <div className="pointer-events-auto flex items-center gap-2 px-5 py-2 rounded-full fantasy-glass text-xs font-serif text-[#FAF6F0] shadow-lg mt-2">
        <Sparkles size={16} className="text-[#FFE494] animate-spin" />
        <span className="font-semibold tracking-widest uppercase">
          {currentSubStage === 'cake' ? 'The Birthday Ceremony' : 'The Grand Celebration'}
        </span>
      </div>

      {/* ================================================================ */}
      {/* STAGE 1: THE CAKE CEREMONY CONTROLS */}
      {/* ================================================================ */}
      {currentSubStage === 'cake' && (
        <div className="pointer-events-auto flex flex-col items-center text-center max-w-md w-full mb-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Make a wish and blow out the candles */}
            {!candlesBlown && (
              <motion.div
                key="blow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center p-6 rounded-2xl fantasy-glass border-2 border-[#E5C158]/50 shadow-2xl"
              >
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFE494] mb-2">
                  "{celebration.makeAWishText}"
                </h3>
                <p className="text-xs text-[#FAF6F0]/80 mb-5 max-w-xs">
                  Take a quiet moment, think of your biggest wish for the year ahead, and blow out the candles.
                </p>
                <button
                  onClick={onBlowCandles}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFE494] text-[#1D0C07] font-serif font-bold text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_30px_rgba(229,193,88,0.7)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Wind size={18} /> {celebration.blowButtonText}
                </button>
              </motion.div>
            )}

            {/* Step 2: Cut the birthday cake */}
            {candlesBlown && !cakeCut && (
              <motion.div
                key="cut"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center p-6 rounded-2xl fantasy-glass border-2 border-[#E5C158]/50 shadow-2xl"
              >
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF6F0] mb-2">
                  "May Your Wishes Come True!"
                </h3>
                <p className="text-xs text-[#FAF6F0]/80 mb-5 max-w-xs">
                  The candles have carried your wish to the stars. Now cut the first slice!
                </p>
                <button
                  onClick={onCutCake}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C88A85] to-[#FFE494] text-[#1D0C07] font-serif font-bold text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_30px_rgba(229,193,88,0.7)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Utensils size={18} /> Cut The Birthday Cake
                </button>
              </motion.div>
            )}

            {/* Step 3: Serve the first slice & trigger Grand Reveal */}
            {cakeCut && !sliceServed && (
              <motion.div
                key="serve"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center p-6 rounded-2xl fantasy-glass border-2 border-[#E5C158]/50 shadow-2xl"
              >
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFE494] mb-2">
                  "{celebration.cakeCutText}"
                </h3>
                <p className="text-xs text-[#FAF6F0]/80 mb-5 max-w-xs">
                  Here is the first delicious slice of your celebration!
                </p>
                <button
                  onClick={onServeSlice}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE494] to-[#E5C158] text-[#1D0C07] font-serif font-bold text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_30px_rgba(229,193,88,0.8)] hover:scale-105 active:scale-95 transition-all"
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
