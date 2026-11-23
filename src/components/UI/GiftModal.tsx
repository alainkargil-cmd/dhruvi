import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RotateCcw, Sparkles, Star, Heart, ArrowRight } from 'lucide-react';
import { BirthdayConfig, PhotoConfig } from '../../config/birthdayConfig';
import { soundManager } from '../../utils/soundEffects';

interface GiftModalProps {
  giftId: string | null;
  config: BirthdayConfig;
  onClose: () => void;
  onOpenPhoto: (photo: PhotoConfig) => void;
  onStartCelebration: () => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({
  giftId,
  config,
  onClose,
  onOpenPhoto,
  onStartCelebration,
}) => {
  const [videoRevealed, setVideoRevealed] = useState(false);
  const [scrapbookPage, setScrapbookPage] = useState(0);
  const [selectedWishIndex, setSelectedWishIndex] = useState<number | null>(null);
  const [videoError, setVideoError] = useState(false);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  if (!giftId) return null;

  const videoList = config.gifts.laughter.videos && config.gifts.laughter.videos.length > 0
    ? config.gifts.laughter.videos
    : [{ url: config.gifts.laughter.videoUrl, title: "Funny Memory", caption: config.gifts.laughter.afterText }];

  const currentVideo = videoList[currentVideoIndex] || videoList[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full bg-[#1D0C07] border border-[#E5C158]/50 rounded-2xl p-5 sm:p-8 shadow-[0_0_50px_rgba(229,193,88,0.3)] flex flex-col items-center max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#2C1810] border border-[#E5C158]/60 text-[#F5D77F] hover:text-white hover:bg-[#3B2219] flex items-center justify-center transition-all shadow-md z-20"
          >
            <X size={18} />
          </button>

          {/* ============================================================== */}
          {/* GIFT 1: THE GIFT OF LAUGHTER (SEQUENTIAL VIDEO PLAYBACK) */}
          {/* ============================================================== */}
          {giftId === 'gift-laughter' && (
            <div className="w-full flex flex-col items-center text-center">
              <span className="text-xs font-serif uppercase tracking-widest text-[#E8B4B8] mb-1">
                {config.gifts.laughter.title}
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#FAF6F0] mb-2">
                "{config.gifts.laughter.subtitle}"
              </h3>

              {!videoRevealed ? (
                <div className="my-6 p-6 rounded-xl bg-[#2C1810]/80 border border-[#E8B4B8]/40 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#E8B4B8]/20 flex items-center justify-center text-3xl mb-4 animate-bounce">
                    🤫
                  </div>
                  <p className="text-base text-[#F5D77F] font-semibold mb-2">
                    {config.gifts.laughter.warningText}
                  </p>
                  <p className="text-xs text-[#FAF6F0]/70 max-w-sm mb-6">
                    A strictly unverified, highly affectionate recorded memory sequence of pure fun.
                  </p>
                  <button
                    onClick={() => {
                      soundManager.playGiftOpen();
                      setVideoRevealed(true);
                    }}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C88A85] to-[#E8B4B8] text-[#1D0C07] font-semibold text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(232,180,184,0.5)] hover:scale-105 transition-all"
                  >
                    <Play size={16} fill="currentColor" />
                    {config.gifts.laughter.buttonText}
                  </button>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center mt-2">
                  {/* Playlist Header & Indicator if multiple videos */}
                  {videoList.length > 1 && (
                    <div className="flex items-center justify-between w-full mb-3 px-2">
                      <span className="text-xs font-serif text-[#F5D77F] font-semibold flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[#FFE494]" />
                        {currentVideo.title || `Memory Part ${currentVideoIndex + 1}`}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {videoList.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setVideoError(false);
                              setCurrentVideoIndex(idx);
                            }}
                            className={`w-7 h-7 rounded-full text-xs font-bold transition-all border ${
                              currentVideoIndex === idx
                                ? 'bg-[#E5C158] text-[#1D0C07] border-[#FFE494] shadow-[0_0_10px_#FFE494]'
                                : 'bg-[#2C1810] text-[#FAF6F0]/70 border-[#E5C158]/30 hover:border-[#E5C158]'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Video Player Container */}
                  <div className="relative w-full aspect-video max-h-[50vh] rounded-xl overflow-hidden border-2 border-[#E5C158] bg-[#150804] shadow-2xl flex items-center justify-center">
                    {!videoError ? (
                      <video
                        key={currentVideo.url}
                        src={currentVideo.url}
                        controls
                        autoPlay
                        onEnded={() => {
                          // Automatic sequence: advance to next video if available
                          if (currentVideoIndex < videoList.length - 1) {
                            setTimeout(() => {
                              setCurrentVideoIndex((prev) => prev + 1);
                            }, 500);
                          }
                        }}
                        className="w-full h-full object-contain"
                        onError={() => setVideoError(true)}
                      />
                    ) : (
                      // Interactive playful funny-filter fallback simulation
                      <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#2C1810] to-[#150804] p-6 text-center">
                        <div className="text-5xl animate-bounce mb-3">
                          {currentVideoIndex === 0 ? '✨🥸✨' : '🤪🎉✨'}
                        </div>
                        <p className="text-sm font-serif text-[#F5D77F] font-bold mb-1">
                          [{currentVideo.title || `Video Part ${currentVideoIndex + 1}`}]
                        </p>
                        <p className="text-xs text-[#FAF6F0]/80 max-w-md">
                          Place video at <code className="text-[#FFE494]">{currentVideo.url}</code>
                        </p>
                        {videoList.length > 1 && (
                          <button
                            onClick={() => {
                              setVideoError(false);
                              setCurrentVideoIndex((prev) => (prev + 1) % videoList.length);
                            }}
                            className="mt-3 px-4 py-1.5 rounded-full bg-[#3B2219] border border-[#E5C158] text-[#F5D77F] text-xs hover:bg-[#4E2A1E] transition-all"
                          >
                            Switch to {currentVideoIndex === 0 ? 'Video 2' : 'Video 1'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Captions and Navigation Controls */}
                  <div className="flex items-center justify-between w-full mt-3">
                    <button
                      disabled={currentVideoIndex === 0}
                      onClick={() => {
                        setVideoError(false);
                        setCurrentVideoIndex((prev) => Math.max(0, prev - 1));
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-serif border ${
                        currentVideoIndex === 0
                          ? 'opacity-30 border-transparent cursor-not-allowed'
                          : 'bg-[#2C1810] border-[#E5C158]/40 text-[#F5D77F] hover:bg-[#3B2219]'
                      }`}
                    >
                      ← Previous Video
                    </button>

                    <p className="text-xs font-script text-[#F5D77F] text-base px-2">
                      "{currentVideo.caption || config.gifts.laughter.afterText}"
                    </p>

                    <button
                      disabled={currentVideoIndex >= videoList.length - 1}
                      onClick={() => {
                        setVideoError(false);
                        setCurrentVideoIndex((prev) => Math.min(videoList.length - 1, prev + 1));
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-serif border ${
                        currentVideoIndex >= videoList.length - 1
                          ? 'opacity-30 border-transparent cursor-not-allowed'
                          : 'bg-[#2C1810] border-[#E5C158]/40 text-[#F5D77F] hover:bg-[#3B2219]'
                      }`}
                    >
                      Next Video →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* GIFT 2: THE GIFT OF MEMORIES (SCRAPBOOK) */}
          {/* ============================================================== */}
          {giftId === 'gift-memories' && (
            <div className="w-full flex flex-col items-center text-center">
              <span className="text-xs font-serif uppercase tracking-widest text-[#9B8EA9] mb-1">
                {config.gifts.memories.title}
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#FAF6F0] mb-2">
                "{config.gifts.memories.subtitle}"
              </h3>

              {/* Scrapbook Container */}
              <div className="w-full my-4 p-5 rounded-2xl bg-[#26160F] border border-[#E5C158]/40 shadow-inner flex flex-col items-center">
                {scrapbookPage === 0 ? (
                  <div
                    onClick={() => onOpenPhoto(config.chapters.friendship.photos[0])}
                    className="group cursor-pointer flex flex-col items-center bg-[#FAF6F0] text-[#1D0C07] p-3 rounded-lg shadow-xl -rotate-2 hover:rotate-0 transition-transform duration-300 max-w-sm"
                  >
                    <img
                      src={config.chapters.friendship.photos[0].url}
                      alt="Friendship Moment 1"
                      className="w-full h-56 object-cover rounded border border-neutral-300"
                    />
                    <p className="mt-2 font-script text-lg text-[#3B2219]">
                      {config.chapters.friendship.photos[0].caption}
                    </p>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
                      Click to Enlarge
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => onOpenPhoto(config.chapters.friendship.photos[1])}
                    className="group cursor-pointer flex flex-col items-center bg-[#FAF6F0] text-[#1D0C07] p-3 rounded-lg shadow-xl rotate-2 hover:rotate-0 transition-transform duration-300 max-w-sm"
                  >
                    <img
                      src={config.chapters.friendship.photos[1].url}
                      alt="Friendship Moment 2"
                      className="w-full h-56 object-cover rounded border border-neutral-300"
                    />
                    <p className="mt-2 font-script text-lg text-[#3B2219]">
                      {config.chapters.friendship.photos[1].caption}
                    </p>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
                      Click to Enlarge
                    </span>
                  </div>
                )}

                {/* Page Flip Controls */}
                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={() => {
                      soundManager.playPageTurn();
                      setScrapbookPage((prev) => (prev === 0 ? 1 : 0));
                    }}
                    className="px-4 py-2 rounded-full bg-[#3B2219] border border-[#E5C158]/50 text-[#F5D77F] text-xs uppercase tracking-wider hover:bg-[#4E2A1E] transition-all flex items-center gap-2"
                  >
                    <RotateCcw size={14} /> Turn Page ({scrapbookPage + 1}/2)
                  </button>
                </div>
              </div>

              <p className="text-xs font-serif text-[#FAF6F0]/80 italic mt-2">
                "{config.gifts.memories.message}"
              </p>
            </div>
          )}

          {/* ============================================================== */}
          {/* GIFT 3: THE GIFT OF A THOUSAND WISHES */}
          {/* ============================================================== */}
          {giftId === 'gift-wishes' && (
            <div className="w-full flex flex-col items-center text-center">
              <span className="text-xs font-serif uppercase tracking-widest text-[#E5C158] mb-1">
                {config.gifts.wishes.title}
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#FAF6F0] mb-2">
                "{config.gifts.wishes.subtitle}"
              </h3>
              <p className="text-xs text-[#FAF6F0]/70 mb-5">
                Touch each celestial star to unlock a special wish written for you.
              </p>

              {/* Interactive Stars Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-6">
                {config.gifts.wishes.items.map((wish, index) => {
                  const isSelected = selectedWishIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        soundManager.playGiftOpen();
                        setSelectedWishIndex(index);
                      }}
                      className={`p-3 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center min-h-[90px] ${
                        isSelected
                          ? 'bg-[#E5C158]/20 border-[#E5C158] shadow-[0_0_20px_rgba(229,193,88,0.4)] scale-105'
                          : 'bg-[#2C1810]/70 border-[#E5C158]/30 hover:border-[#E5C158]/70 hover:bg-[#3B2219]'
                      }`}
                    >
                      <Star
                        size={20}
                        className={`mb-2 transition-transform duration-300 ${
                          isSelected
                            ? 'text-[#FFE494] fill-[#FFE494] scale-125 animate-pulse'
                            : 'text-[#D4AF37]'
                        }`}
                      />
                      <span className="text-[11px] font-serif text-[#FAF6F0]/80">
                        Star #{index + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Revealed Wish Card */}
              {selectedWishIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-[#2C1810] via-[#3B2219] to-[#2C1810] border border-[#E5C158] shadow-lg flex items-center justify-center text-center"
                >
                  <Sparkles size={18} className="text-[#FFE494] mr-2 shrink-0 animate-spin" />
                  <p className="text-sm sm:text-base font-serif italic text-[#FFE494] leading-relaxed">
                    "{config.gifts.wishes.items[selectedWishIndex]}"
                  </p>
                  <Sparkles size={18} className="text-[#FFE494] ml-2 shrink-0 animate-spin" />
                </motion.div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* GIFT 4: THE MYSTERY GIFT (HIDDEN GROUP PHOTOGRAPH) */}
          {/* ============================================================== */}
          {giftId === 'gift-mystery' && (
            <div className="w-full flex flex-col items-center text-center">
              <span className="text-xs font-serif uppercase tracking-widest text-[#E5C158] mb-1">
                {config.gifts.mystery.title}
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#FAF6F0] mb-2">
                "{config.gifts.mystery.subtitle}"
              </h3>

              {/* Hidden Photo Revealed in Royal Golden Frame */}
              <div
                onClick={() => onOpenPhoto(config.gifts.mystery.photo)}
                className="cursor-pointer group relative my-4 max-w-md w-full rounded-2xl overflow-hidden border-2 border-[#E5C158] shadow-[0_0_35px_rgba(229,193,88,0.4)] bg-[#150804] p-3 transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={config.gifts.mystery.photo.url}
                    alt="Mystery Group Photograph"
                    className="w-full max-h-72 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-3">
                    <span className="text-xs font-serif text-[#FFE494] uppercase tracking-widest flex items-center gap-1">
                      <Sparkles size={12} /> Click to Enlarge Full View
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm font-serif text-[#FAF6F0] italic max-w-md mb-3 leading-relaxed">
                "{config.gifts.mystery.message}"
              </p>

              <div className="mt-4 pt-4 border-t border-[#E5C158]/30 w-full flex flex-col items-center">
                <p className="text-xs font-script text-[#E5C158] text-lg mb-3">
                  {config.gifts.mystery.closingHint}
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onStartCelebration();
                  }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFE494] text-[#1D0C07] font-bold text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(229,193,88,0.6)] hover:scale-105 transition-all"
                >
                  Enter Birthday Celebration <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
