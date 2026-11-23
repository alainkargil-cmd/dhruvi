import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { BirthdayConfig, PhotoConfig } from '../config/birthdayConfig';
import { soundManager } from '../utils/soundEffects';

interface StoryChaptersProps {
  chapterId: 'chapter-childhood' | 'chapter-solo' | 'chapter-friendship' | 'chapter-future';
  config: BirthdayConfig;
  onOpenPhoto: (photo: PhotoConfig) => void;
  onReturnToLibrary: () => void;
  onNextChapter: (nextChapterId: string) => void;
}

export const StoryChapters: React.FC<StoryChaptersProps> = ({
  chapterId,
  config,
  onOpenPhoto,
  onReturnToLibrary,
  onNextChapter,
}) => {
  const { childhood, solo, friendship, future } = config.chapters;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-br from-[#27121E]/95 via-[#351829]/95 to-[#200E19]/95 backdrop-blur-xl overflow-y-auto select-none">
      {/* Top Header Navigation */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 z-20">
        <button
          onClick={onReturnToLibrary}
          className="flex items-center gap-2 px-4 py-2 rounded-full fantasy-glass text-xs font-serif text-[#F5D77F] hover:text-white transition-all shadow-md"
        >
          <ArrowLeft size={14} /> Return to Library
        </button>
        <span className="text-xs uppercase tracking-widest text-[#E5C158] font-serif">
          The Chronicles of Dhruvi
        </span>
      </div>

      {/* ================================================================= */}
      {/* CHAPTER 1: THE LITTLE BEGINNING (Childhood) */}
      {/* ================================================================= */}
      {chapterId === 'chapter-childhood' && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl w-full flex flex-col items-center text-center my-auto"
        >
          <span className="text-xs font-serif tracking-widest uppercase text-[#FFE494] mb-2 flex items-center gap-1.5">
            <Sparkles size={14} /> Chapter I ✦ {childhood.theme}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF6F0] mb-2 tracking-wide">
            {childhood.title}
          </h2>
          <p className="font-script text-xl text-[#F5D77F] italic mb-6">
            "{childhood.subtitle}"
          </p>

          {/* Golden Frame with Childhood Photo */}
          <div
            onClick={() => onOpenPhoto(childhood.photo)}
            className="cursor-pointer group relative p-4 sm:p-5 rounded-2xl bg-[#351829] border-2 border-[#E5C158] shadow-[0_0_50px_rgba(229,193,88,0.4)] transition-transform duration-300 hover:scale-[1.02] max-w-xl w-full"
          >
            <div className="relative rounded-xl overflow-hidden bg-black/30 p-1 flex items-center justify-center">
              <img
                src={childhood.photo.url}
                alt="Dhruvi Childhood Memory"
                className="w-full max-h-[460px] object-contain rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                <span className="text-xs font-serif text-[#FFE494] uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-[#E5C158]/50">
                  ✦ Click to View High-Res Fullscreen ✦
                </span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm font-serif text-[#FAF6F0]/90 max-w-md italic leading-relaxed">
            "{childhood.caption}"
          </p>

          <button
            onClick={() => onNextChapter('chapter-solo')}
            className="mt-8 px-6 py-3 rounded-full bg-[#3B2219] border border-[#E5C158] text-[#F5D77F] hover:bg-[#4E2A1E] text-xs font-serif tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg hover:scale-105"
          >
            Next: Chapter II — Becoming Dhruvi <ArrowRight size={14} />
          </button>
        </motion.div>
      )}

      {/* ================================================================= */}
      {/* CHAPTER 2: BECOMING DHRUVI (Portrait Gallery) */}
      {/* ================================================================= */}
      {chapterId === 'chapter-solo' && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl w-full flex flex-col items-center text-center my-auto"
        >
          <span className="text-xs font-serif tracking-widest uppercase text-[#9B8EA9] mb-2 flex items-center gap-1.5">
            <Sparkles size={14} /> Chapter II ✦ {solo.theme}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF6F0] mb-2 tracking-wide">
            {solo.title}
          </h2>
          <p className="font-script text-xl text-[#F5D77F] italic mb-6">
            "{solo.subtitle}"
          </p>

          {/* 3 Solo Portraits: Central Large Portrait with Left and Right Floating Frames */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full my-4 items-center">
            {/* Left Photo */}
            <div
              onClick={() => onOpenPhoto(solo.photos[1])}
              className="cursor-pointer group p-3.5 sm:p-4 rounded-2xl bg-[#351829] border border-[#E5C158]/60 shadow-xl hover:scale-105 transition-all flex flex-col items-center"
            >
              <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-black/25 flex items-center justify-center p-1">
                <img
                  src={solo.photos[1].url}
                  alt="Dhruvi Solo 2"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <p className="mt-2.5 text-xs font-serif text-[#F5D77F] italic">
                "{solo.photos[1].caption}"
              </p>
            </div>

            {/* Central Main Portrait */}
            <div
              onClick={() => onOpenPhoto(solo.photos[0])}
              className="cursor-pointer group p-4 sm:p-5 rounded-2xl bg-[#441E34] border-2 border-[#E5C158] shadow-[0_0_40px_rgba(229,193,88,0.45)] hover:scale-105 transition-all md:-translate-y-2 flex flex-col items-center"
            >
              <div className="w-full h-88 sm:h-[420px] rounded-xl overflow-hidden bg-black/25 flex items-center justify-center p-1">
                <img
                  src={solo.photos[0].url}
                  alt="Dhruvi Solo 1"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <p className="mt-3 text-sm font-serif font-semibold text-[#FFE494]">
                "{solo.photos[0].caption}"
              </p>
            </div>

            {/* Right Photo */}
            <div
              onClick={() => onOpenPhoto(solo.photos[2])}
              className="cursor-pointer group p-3.5 sm:p-4 rounded-2xl bg-[#351829] border border-[#E5C158]/60 shadow-xl hover:scale-105 transition-all flex flex-col items-center"
            >
              <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-black/25 flex items-center justify-center p-1">
                <img
                  src={solo.photos[2].url}
                  alt="Dhruvi Solo 3"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <p className="mt-2.5 text-xs font-serif text-[#F5D77F] italic">
                "{solo.photos[2].caption}"
              </p>
            </div>
          </div>

          <p className="mt-4 text-base font-serif text-[#FFE494] italic font-semibold">
            "{solo.quote}"
          </p>

          <button
            onClick={() => onNextChapter('chapter-friendship')}
            className="mt-6 px-6 py-3 rounded-full bg-[#3B2219] border border-[#E5C158] text-[#F5D77F] hover:bg-[#4E2A1E] text-xs font-serif tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg hover:scale-105"
          >
            Next: Chapter III — Our Little Chaos <ArrowRight size={14} />
          </button>
        </motion.div>
      )}

      {/* ================================================================= */}
      {/* CHAPTER 3: OUR LITTLE CHAOS (Friendship) */}
      {/* ================================================================= */}
      {chapterId === 'chapter-friendship' && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl w-full flex flex-col items-center text-center my-auto"
        >
          <span className="text-xs font-serif tracking-widest uppercase text-[#C88A85] mb-2 flex items-center gap-1.5">
            <Sparkles size={14} /> Chapter III ✦ {friendship.theme}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF6F0] mb-2 tracking-wide">
            {friendship.title}
          </h2>
          <p className="font-script text-xl text-[#F5D77F] italic mb-6">
            "{friendship.subtitle}"
          </p>

          {/* Hanging Photos & Scrapbook Wall */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full my-4">
            {friendship.photos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => onOpenPhoto(photo)}
                className={`cursor-pointer group p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] text-[#1D0C07] shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center ${
                  idx === 0 ? '-rotate-1.5' : idx === 1 ? 'rotate-1' : '-rotate-1'
                }`}
              >
                <div className="w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-amber-50/70 border border-neutral-200 flex items-center justify-center p-1">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <p className="mt-3 font-script text-xl text-[#3B2219]">
                  "{photo.caption}"
                </p>
                <span className="text-[10px] uppercase tracking-widest text-[#B89738] font-serif mt-1">
                  ✦ Click for High-Res View ✦
                </span>
              </div>
            ))}
          </div>

          {/* Playful Friendship Quotes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full my-6">
            {friendship.messages.map((msg, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#2C1810]/80 border border-[#E5C158]/30 text-xs font-serif text-[#F5D77F] italic flex items-center justify-center shadow-md"
              >
                "{msg}"
              </div>
            ))}
          </div>

          <button
            onClick={() => onNextChapter('chapter-future')}
            className="mt-4 px-6 py-3 rounded-full bg-[#3B2219] border border-[#E5C158] text-[#F5D77F] hover:bg-[#4E2A1E] text-xs font-serif tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg hover:scale-105"
          >
            Next: Chapter IV — The Next Chapter <ArrowRight size={14} />
          </button>
        </motion.div>
      )}

      {/* ================================================================= */}
      {/* CHAPTER 4: THE NEXT CHAPTER (The Future) */}
      {/* ================================================================= */}
      {chapterId === 'chapter-future' && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl w-full flex flex-col items-center text-center my-auto"
        >
          <span className="text-xs font-serif tracking-widest uppercase text-[#FFE494] mb-2 flex items-center gap-1.5">
            <Sparkles size={14} /> Chapter IV ✦ {future.theme}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF6F0] mb-2 tracking-wide">
            {future.title}
          </h2>
          <p className="font-script text-xl text-[#F5D77F] italic mb-6">
            "{future.subtitle}"
          </p>

          <div className="p-6 sm:p-8 rounded-2xl fantasy-glass border-2 border-[#E5C158]/50 shadow-[0_0_50px_rgba(229,193,88,0.25)] text-left mb-6">
            <p className="font-serif text-sm sm:text-base text-[#FAF6F0] leading-relaxed whitespace-pre-line italic">
              {future.message}
            </p>
            <p className="mt-4 font-script text-2xl text-[#FFE494] text-right">
              "{future.closing}"
            </p>
          </div>

          {/* Transition toward Magical Gift Room */}
          <button
            onClick={() => onNextChapter('gift-room')}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE494] to-[#E5C158] text-[#1D0C07] font-serif font-bold text-sm tracking-widest uppercase flex items-center gap-2 shadow-[0_0_30px_rgba(229,193,88,0.6)] hover:scale-105 transition-all"
          >
            Enter The Magical Gift Room <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
};
