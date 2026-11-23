import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, Compass } from 'lucide-react';
import { BirthdayConfig } from '../config/birthdayConfig';
import { soundManager } from '../utils/soundEffects';

interface FinalLetterSceneProps {
  config: BirthdayConfig;
  onReturnToLibrary: () => void;
  onReplayCelebration: () => void;
}

export const FinalLetterScene: React.FC<FinalLetterSceneProps> = ({
  config,
  onReturnToLibrary,
  onReplayCelebration,
}) => {
  const { finalLetter } = config;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 bg-[#150804]/95 backdrop-blur-2xl overflow-y-auto select-none">
      {/* Antique Parchment Letter Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative max-w-2xl w-full parchment-bg rounded-2xl p-6 sm:p-12 shadow-[0_0_60px_rgba(229,193,88,0.35)] border-4 border-[#B89738] text-[#2C1810] flex flex-col my-auto"
      >
        {/* Ornate Gold Corner Filigree */}
        <div className="absolute top-3 left-3 text-[#B89738] text-xl select-none">❧</div>
        <div className="absolute top-3 right-3 text-[#B89738] text-xl select-none">☙</div>
        <div className="absolute bottom-3 left-3 text-[#B89738] text-xl select-none">❧</div>
        <div className="absolute bottom-3 right-3 text-[#B89738] text-xl select-none">☙</div>

        {/* Golden Wax Seal Emblem at top center */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#58111A] border-2 border-[#E5C158] flex items-center justify-center text-[#FFE494] shadow-md">
            <span className="font-serif font-black text-xl">D</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#B89738] font-serif mt-2">
            The Library of Little Moments
          </span>
        </div>

        {/* Salutation */}
        <h3 className="font-script text-3xl sm:text-4xl text-[#3A1E14] mb-4">
          {finalLetter.salutation}
        </h3>

        {/* Letter Paragraphs */}
        <div className="flex flex-col gap-4 font-serif text-sm sm:text-base text-[#2C1810]/95 leading-relaxed italic">
          {finalLetter.paragraphs.map((para, i) => (
            <p key={i}>
              {para}
            </p>
          ))}
        </div>

        {/* Closing & Sign-off */}
        <div className="mt-6 pt-4 border-t border-[#B89738]/40 flex flex-col items-end">
          <p className="font-serif font-bold text-lg text-[#58111A]">
            {finalLetter.closing}
          </p>
          <p className="font-script text-2xl text-[#3A1E14] mt-1">
            {finalLetter.signOff}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-[#B89738]/40 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              soundManager.playPageTurn();
              onReturnToLibrary();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C1810] text-[#F5D77F] hover:bg-[#3B2219] text-xs font-serif tracking-wider uppercase transition-all shadow-md"
          >
            <Compass size={14} /> {finalLetter.returnButtonText}
          </button>

          <button
            onClick={() => {
              soundManager.playGiftOpen();
              onReplayCelebration();
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B89738] to-[#E5C158] text-[#1D0C07] font-serif font-bold text-xs tracking-wider uppercase transition-all shadow-lg hover:scale-105"
          >
            <RotateCcw size={14} /> {finalLetter.replayCelebrationText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
