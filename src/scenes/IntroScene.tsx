import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sparkles, ArrowRight, Heart, Feather, FastForward } from 'lucide-react';
import { MagicFeather } from '../objects/MagicFeather';
import { AtmosphericParticles } from '../effects/AtmosphericParticles';
import { birthdayConfig } from '../config/birthdayConfig';
import { soundManager } from '../utils/soundEffects';

interface IntroSceneProps {
  onEnterLibrary: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onEnterLibrary }) => {
  // Envelope states: 'sealed' | 'opening' | 'opened'
  const [envelopeState, setEnvelopeState] = useState<'sealed' | 'opening' | 'opened'>('sealed');
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  const messageGreeting = "Dearest Dhruvi,";
  const messageBody = `Some stories are written in ancient books, but the most beautiful ones are lived in shared laughter, gentle smiles, and moments that stay with us forever.

Tonight, this magical library has opened its doors just for you — to celebrate your journey, your radiance, and every little chapter that makes you so truly special.

Happy Birthday, Dhruvi! ✨`;

  const fullLetterContent = `${messageGreeting}\n\n${messageBody}`;

  // Handle unsealing the envelope
  const handleUnseal = () => {
    if (envelopeState !== 'sealed') return;
    soundManager.playSparkle();
    setEnvelopeState('opening');

    setTimeout(() => {
      soundManager.playPageTurn();
      setEnvelopeState('opened');
    }, 700);
  };

  // Typewriter effect once the letter has emerged from the envelope
  useEffect(() => {
    if (envelopeState !== 'opened') return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullLetterContent.length) {
        setTypedText(fullLetterContent.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTypingComplete(true);
        setTimeout(() => setShowContinueButton(true), 400);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [envelopeState, fullLetterContent]);

  // Skip typing shortcut
  const handleSkipTyping = () => {
    setTypedText(fullLetterContent);
    setTypingComplete(true);
    setShowContinueButton(true);
  };

  const handleEnter = () => {
    soundManager.startBGM();
    soundManager.playPageTurn();
    onEnterLibrary();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#533144] via-[#663D54] to-[#48283B] overflow-hidden select-none">
      {/* 3D Canvas Background with Floating Magic Feather & Golden Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={1.5} color="#FFF8ED" />
          <pointLight position={[0, 2, 3]} color="#FFE8A3" intensity={3.5} />
          <directionalLight position={[-3, 4, 2]} color="#FFC488" intensity={1.8} />
          {/* Magic Golden Feather */}
          <MagicFeather position={[2.2, 0.6, 1.2]} scale={1.35} />
          <AtmosphericParticles count={220} color="#F5D77F" size={0.07} />
        </Canvas>
      </div>

      {/* Atmospheric Warm Golden Lighting Accents */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(255,228,148,0.18)_0%,transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,182,193,0.12)_0%,transparent_50%)]" />

      {/* Main Interactive Container */}
      <div className="relative z-20 w-full max-w-2xl px-4 sm:px-6 flex flex-col items-center justify-center">

        {/* ========================================================================= */}
        {/* PHASE 1 & 2: THE SEALED VINTAGE ENVELOPE (Before opening or while opening) */}
        {/* ========================================================================= */}
        {envelopeState !== 'opened' && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-full flex flex-col items-center"
          >
            {/* Top Prompt Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-amber-500/10 border border-[#E5C158]/40 shadow-[0_0_20px_rgba(229,193,88,0.2)] text-[#F5D77F]"
            >
              <Sparkles size={16} className="text-[#FFE494] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs sm:text-sm font-serif tracking-[0.25em] uppercase text-[#FFE494]">
                A Special Delivery For Dhruvi
              </span>
              <Sparkles size={16} className="text-[#FFE494] animate-spin" style={{ animationDuration: '6s' }} />
            </motion.div>

            {/* The 3D Envelope */}
            <div
              onClick={handleUnseal}
              className="relative w-full max-w-[460px] aspect-[1.45/1] rounded-2xl cursor-pointer group transition-transform duration-500 hover:scale-[1.02] shadow-[0_20px_60px_rgba(0,0,0,0.65),0_0_40px_rgba(229,193,88,0.25)]"
              style={{ perspective: 1000 }}
            >
              {/* Envelope Body (Antique Ivory / Champagne with Gold Border) */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FAF5EC] via-[#F4EDE0] to-[#E9DFCE] border-2 border-[#D4AF37] overflow-hidden p-6 shadow-inner">
                {/* Subtle Guilloche / Filigree Watermark Corner Ornaments */}
                <div className="absolute top-2 left-2 text-[#D4AF37]/40 font-serif text-lg select-none">✦</div>
                <div className="absolute top-2 right-2 text-[#D4AF37]/40 font-serif text-lg select-none">✦</div>
                <div className="absolute bottom-2 left-2 text-[#D4AF37]/40 font-serif text-lg select-none">✦</div>
                <div className="absolute bottom-2 right-2 text-[#D4AF37]/40 font-serif text-lg select-none">✦</div>

                {/* Vintage Postage Stamp (Top-Right) */}
                <div className="absolute top-4 right-4 w-14 h-16 sm:w-16 sm:h-20 rounded border-2 border-dashed border-[#B89738] bg-[#FDF9F2] p-1 shadow-sm flex flex-col items-center justify-between text-[#8B6B23]">
                  <span className="text-[8px] uppercase tracking-wider font-bold">AIR MAIL</span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D4AF37] flex items-center justify-center bg-amber-50">
                    <Heart size={14} className="text-[#B71C1C] fill-[#B71C1C]" />
                  </div>
                  <span className="text-[7px] tracking-tight font-serif uppercase">DHRUVI ✦ 2026</span>
                </div>

                {/* Handwritten Address on Envelope Face */}
                <div className="h-full flex flex-col justify-center items-start pl-4 sm:pl-6 text-[#2D160E]">
                  <span className="text-xs uppercase font-serif tracking-[0.2em] text-[#8B6B23] mb-1">
                    Confidential & Personal
                  </span>
                  <h1 className="font-script text-3xl sm:text-4xl text-[#1E0C06] font-bold tracking-wide drop-shadow-sm">
                    To: Dearest Dhruvi
                  </h1>
                  <p className="text-xs sm:text-sm font-serif italic text-[#6B4B32] mt-1">
                    An enchanted world awaits inside...
                  </p>
                </div>
              </div>

              {/* Envelope Flap (Triangle that folds open) */}
              <motion.div
                animate={{
                  rotateX: envelopeState === 'opening' ? -175 : 0,
                }}
                transition={{ duration: 0.65, ease: 'easeInOut' }}
                style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                className="absolute top-0 left-0 right-0 h-[58%] z-20 pointer-events-none"
              >
                {/* Triangular flap SVG */}
                <svg
                  viewBox="0 0 460 170"
                  className="w-full h-full drop-shadow-md overflow-visible"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="0,0 460,0 230,165"
                    fill="#F2E8D7"
                    stroke="#D4AF37"
                    strokeWidth="2"
                  />
                  {/* Subtle inner highlight */}
                  <polygon
                    points="12,4 448,4 230,155"
                    fill="none"
                    stroke="#FFE494"
                    strokeWidth="1"
                    strokeOpacity="0.6"
                  />
                </svg>
              </motion.div>

              {/* Royal Wax Seal in the Center */}
              <motion.div
                animate={
                  envelopeState === 'opening'
                    ? { scale: 0, opacity: 0 }
                    : { scale: [1, 1.05, 1], filter: ['drop-shadow(0 0 10px rgba(229,193,88,0.5))', 'drop-shadow(0 0 25px rgba(229,193,88,0.9))', 'drop-shadow(0 0 10px rgba(229,193,88,0.5))'] }
                }
                transition={
                  envelopeState === 'opening'
                    ? { duration: 0.3 }
                    : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
                }
                className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#A81822] via-[#8B1019] to-[#600A0F] border-2 border-[#FFE494] flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.5)] cursor-pointer group-hover:scale-110 transition-transform"
              >
                {/* Monogram Seal 'D' */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-[#FFE494]/60 flex items-center justify-center bg-black/10">
                  <span className="font-serif font-black text-2xl sm:text-3xl text-[#FFE494] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    D
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Click Prompt with Pulsing Gold Arrow */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="mt-6 flex flex-col items-center gap-1.5 cursor-pointer"
              onClick={handleUnseal}
            >
              <div className="flex items-center gap-2 text-[#FFE494] font-serif text-sm sm:text-base tracking-wider uppercase drop-shadow-[0_0_12px_rgba(255,228,148,0.7)]">
                <Sparkles size={16} /> Tap the wax seal to open <Sparkles size={16} />
              </div>
              <span className="text-[11px] text-[#E5C158]/70 font-sans tracking-wide">
                (A personalized handwritten letter awaits you)
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 3 & 4: THE LETTER SLIDES OUT & WRITES A BEAUTIFUL MESSAGE */}
        {/* ========================================================================= */}
        {envelopeState === 'opened' && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="w-full flex flex-col items-center"
          >
            {/* The Parchment Letter */}
            <div className="relative w-full max-w-xl p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#FDF9F2] via-[#F7EFE1] to-[#EFE2CE] text-[#2C1810] border-2 border-[#D4AF37] shadow-[0_25px_80px_rgba(0,0,0,0.75),0_0_50px_rgba(229,193,88,0.35)] backdrop-blur-xl">
              
              {/* Skip Typing Button in top corner */}
              {!typingComplete && (
                <button
                  onClick={handleSkipTyping}
                  className="absolute top-4 right-4 text-[10px] sm:text-xs font-serif uppercase tracking-widest text-[#8B6B23] hover:text-[#2C1810] flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#D4AF37]/50 hover:bg-amber-100 transition-colors"
                >
                  <FastForward size={12} /> Show All
                </button>
              )}

              {/* Decorative Header Crest */}
              <div className="flex flex-col items-center mb-6">
                <div className="flex items-center gap-2 text-[#8B6B23] mb-1">
                  <Sparkles size={15} className="text-[#D4AF37]" />
                  <span className="text-[11px] font-serif uppercase tracking-[0.3em] font-semibold">
                    The Chronicles of Dhruvi
                  </span>
                  <Sparkles size={15} className="text-[#D4AF37]" />
                </div>
                <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              </div>

              {/* Handwritten Inscribed Letter Body */}
              <div className="min-h-[220px] sm:min-h-[250px] flex flex-col justify-start">
                <p className="font-script text-2xl sm:text-3xl text-[#1E0C06] leading-relaxed whitespace-pre-line tracking-wide drop-shadow-sm">
                  {typedText}
                  {/* Glowing Quill / Pen Cursor Indicator */}
                  {!typingComplete && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block ml-1 text-[#B89738]"
                    >
                      <Feather size={20} className="inline-block -mt-2 rotate-45 text-[#B89738]" />
                    </motion.span>
                  )}
                </p>
              </div>

              {/* Gold Filigree Divider */}
              <div className="mt-6 pt-4 border-t border-[#D4AF37]/40 flex items-center justify-between text-[#8B6B23] text-xs font-serif">
                <span>✦ Chapter 0: The Invitation</span>
                <span>November 23 ✦</span>
              </div>
            </div>

            {/* PHASE 5: CONTINUE BUTTON */}
            <AnimatePresence>
              {showContinueButton && (
                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="mt-8 flex flex-col items-center"
                >
                  <button
                    onClick={handleEnter}
                    className="px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE494] to-[#E5C158] text-[#1D0C07] font-serif font-bold text-sm sm:text-base tracking-[0.2em] uppercase flex items-center gap-3 shadow-[0_0_35px_rgba(229,193,88,0.85)] hover:scale-105 active:scale-95 transition-all cursor-pointer z-30"
                  >
                    <span>{birthdayConfig.invitation.buttonText}</span>
                    <ArrowRight size={18} />
                  </button>
                  <span className="mt-2 text-xs text-[#FFE494]/80 font-serif tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles size={12} /> Explore 4 Chapters • Gift Room • Cake & Fireworks
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
};
