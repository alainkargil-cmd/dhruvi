import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { PhotoConfig } from '../../config/birthdayConfig';

interface PhotoModalProps {
  photo: PhotoConfig | null;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.88, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.88, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full bg-[#1D0C07] border border-[#E5C158]/50 rounded-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(229,193,88,0.25)] flex flex-col items-center"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#2C1810] border border-[#E5C158] text-[#F5D77F] hover:text-white hover:bg-[#3B2219] flex items-center justify-center transition-all shadow-lg z-10"
          >
            <X size={20} />
          </button>

          {/* Ornate Frame Header */}
          <div className="flex items-center gap-2 mb-3 text-[#E5C158]">
            <Sparkles size={16} className="animate-spin text-[#FFE494]" />
            <span className="text-xs tracking-widest uppercase font-serif">
              The Library of Little Moments
            </span>
            <Sparkles size={16} className="animate-spin text-[#FFE494]" />
          </div>

          {/* Image Container */}
          <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-[#150804] border border-[#E5C158]/30 p-2 shadow-inner">
            <img
              src={photo.url}
              alt={photo.caption}
              className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg transition-transform duration-300 hover:scale-[1.02]"
              onError={(e) => {
                // Fallback to stylized SVG placeholder if file is not found
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"><rect width="100%" height="100%" fill="%232C1810"/><text x="50%" y="50%" font-family="serif" font-size="28" fill="%23E5C158" text-anchor="middle">✦ ${encodeURIComponent(photo.caption || 'Cherished Memory')} ✦</text></svg>`;
              }}
            />
          </div>

          {/* Caption */}
          <p className="mt-4 text-center font-serif text-[#FAF6F0] text-sm sm:text-base leading-relaxed max-w-lg italic">
            "{photo.caption}"
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
