import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sparkles, ArrowRight } from 'lucide-react';
import { MagicFeather } from '../objects/MagicFeather';
import { AtmosphericParticles } from '../effects/AtmosphericParticles';
import { birthdayConfig } from '../config/birthdayConfig';
import { soundManager } from '../utils/soundEffects';

interface IntroSceneProps {
  onEnterLibrary: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onEnterLibrary }) => {
  const [typedText, setTypedText] = useState('');
  const [bookOpening, setBookOpening] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const fullText = `${birthdayConfig.invitation.greeting}\n\n${birthdayConfig.invitation.body}`;

  // Handwriting typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setBookOpening(true);
          soundManager.playPageTurn();
          setTimeout(() => setShowButton(true), 1200);
        }, 600);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleEnter = () => {
    soundManager.startBGM();
    soundManager.playPageTurn();
    onEnterLibrary();
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#0F0503] overflow-hidden select-none">
      {/* 3D Canvas Background with Floating Magic Feather & Golden Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 1, 3]} color="#FFE494" intensity={2.2} />
          {/* Magic Golden Feather */}
          <MagicFeather position={[1.5, 0.4, 1.8]} scale={1.2} />
          <AtmosphericParticles count={150} color="#F5D77F" size={0.06} />
        </Canvas>
      </div>

      {/* Antique Table & Central Glowing Invitation Book */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative z-10 max-w-xl w-[90%] p-8 sm:p-12 rounded-3xl fantasy-glass border-2 border-[#E5C158]/40 shadow-[0_0_80px_rgba(229,193,88,0.2)] flex flex-col items-center text-center backdrop-blur-xl"
      >
        {/* Subtle Decorative Golden Emblem */}
        <div className="flex items-center gap-2 text-[#E5C158] mb-4">
          <Sparkles size={18} className="animate-pulse text-[#FFE494]" />
          <span className="text-xs font-serif tracking-[0.3em] uppercase">
            A Story Saved For You
          </span>
          <Sparkles size={18} className="animate-pulse text-[#FFE494]" />
        </div>

        {/* Handwritten Inscribed Letter */}
        <div className="min-h-[160px] flex items-center justify-center">
          <p className="font-script text-2xl sm:text-3xl text-[#FAF6F0] leading-relaxed whitespace-pre-line tracking-wide drop-shadow-md">
            {typedText}
          </p>
        </div>

        {/* Animated Light from Opened Pages */}
        <AnimatePresence>
          {bookOpening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="mt-6 flex flex-col items-center"
            >
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E5C158] to-transparent shadow-[0_0_15px_#FFE494] mb-3" />
              <span className="text-[11px] font-serif uppercase tracking-widest text-[#F5D77F]/80">
                The pages begin to turn...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* "ENTER THE LIBRARY" Interactive Button */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              onClick={handleEnter}
              className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE494] to-[#E5C158] text-[#1D0C07] font-serif font-bold text-sm sm:text-base tracking-widest uppercase flex items-center gap-3 shadow-[0_0_35px_rgba(229,193,88,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer z-30"
            >
              <span>{birthdayConfig.invitation.buttonText}</span>
              <ArrowRight size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
