import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Compass, Sliders, BookOpen, Gift, Cake, ChevronRight, X } from 'lucide-react';
import { ExperienceScene, GraphicsQuality } from '../../hooks/useExperienceStore';

interface NavigationHUDProps {
  currentScene: ExperienceScene;
  isMuted: boolean;
  onToggleMute: () => void;
  volume: number;
  onChangeVolume: (val: number) => void;
  quality: GraphicsQuality;
  onChangeQuality: (q: GraphicsQuality) => void;
  onChangeScene: (scene: ExperienceScene) => void;
  globeMessage: string | null;
  onCloseGlobeMessage: () => void;
  secretDrawerOpen: boolean;
  onCloseSecretDrawer: () => void;
  secretBookOpen: boolean;
  onCloseSecretBook: () => void;
}

export const NavigationHUD: React.FC<NavigationHUDProps> = ({
  currentScene,
  isMuted,
  onToggleMute,
  volume,
  onChangeVolume,
  quality,
  onChangeQuality,
  onChangeScene,
  globeMessage,
  onCloseGlobeMessage,
  secretDrawerOpen,
  onCloseSecretDrawer,
  secretBookOpen,
  onCloseSecretBook,
}) => {
  const [mapOpen, setMapOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [showHint, setShowHint] = useState(true);

  // Don't show full HUD during the introductory invitation screen
  if (currentScene === 'invitation') return null;

  const chapters: { id: ExperienceScene; label: string; icon: React.ReactNode }[] = [
    { id: 'library', label: 'Grand Library', icon: <Compass size={14} /> },
    { id: 'chapter-childhood', label: '1. Little Beginning', icon: <BookOpen size={14} /> },
    { id: 'chapter-solo', label: '2. Becoming Dhruvi', icon: <BookOpen size={14} /> },
    { id: 'chapter-friendship', label: '3. Our Little Chaos', icon: <BookOpen size={14} /> },
    { id: 'chapter-future', label: '4. The Next Chapter', icon: <BookOpen size={14} /> },
    { id: 'gift-room', label: 'Magical Gift Room', icon: <Gift size={14} /> },
    { id: 'celebration-cake', label: 'Birthday Cake', icon: <Cake size={14} /> },
    { id: 'celebration-fireworks', label: 'Fireworks Finale', icon: <Sparkles size={14} /> },
    { id: 'final-letter', label: 'Birthday Letter', icon: <BookOpen size={14} /> },
  ];

  const getSceneInstructions = (scene: ExperienceScene): { action: string; text: string } => {
    switch (scene) {
      case 'library':
        return {
          action: "Explore The Grand Library",
          text: "✦ Click & drag to rotate view. Touch any glowing book, floating book, banker's lamp, globe, or desk drawer to discover secrets!"
        };
      case 'chapter-childhood':
        return {
          action: "Chapter I: The Little Beginning",
          text: "✦ Click the golden antique frame to enlarge Dhruvi's childhood memory."
        };
      case 'chapter-solo':
        return {
          action: "Chapter II: Becoming Dhruvi",
          text: "✦ Click any of the 3 portraits to view in full detail. Tap 'Next' to continue."
        };
      case 'chapter-friendship':
        return {
          action: "Chapter III: Our Little Chaos",
          text: "✦ Click any Polaroid photograph to open. Enjoy the shared moments and laughter!"
        };
      case 'chapter-future':
        return {
          action: "Chapter IV: The Next Chapter",
          text: "✦ Read the wishes for the journey ahead, then tap 'Enter The Magical Gift Room'."
        };
      case 'gift-room':
        return {
          action: "Magical Gift Room",
          text: "✦ Click on each of the 4 gift boxes to open their presents in any order!"
        };
      case 'celebration-cake':
        return {
          action: "Birthday Cake Ceremony",
          text: "🌬️ Blow into your microphone in real life (or tap the button) to extinguish the candles, then cut the first slice!"
        };
      case 'celebration-reveal':
      case 'celebration-fireworks':
        return {
          action: "Fireworks Celebration",
          text: "✦ Watch the sky as constellations and her name ignite in golden fireworks!"
        };
      case 'final-letter':
        return {
          action: "Final Birthday Letter",
          text: "✦ Read the personal letter saved for Dhruvi. Replay the celebration whenever you wish."
        };
      default:
        return { action: "Guide", text: "✦ Touch and interact with the environment." };
    }
  };

  const instruction = getSceneInstructions(currentScene);

  return (
    <>
      {/* Top Bar Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-3 sm:p-5 pointer-events-none">
        {/* Brand Pill */}
        <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full fantasy-glass text-xs font-serif tracking-wider text-[#FAF6F0] shadow-lg">
          <Sparkles size={14} className="text-[#E5C158]" />
          <span className="hidden sm:inline font-semibold">The Library of Little Moments</span>
          <span className="text-[#E5C158] font-bold">✦ Dhruvi</span>
        </div>

        {/* Right Action Icons */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Instruction Toggle */}
          <button
            onClick={() => setShowHint(!showHint)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full fantasy-glass text-xs font-serif transition-all shadow-md ${
              showHint ? 'text-[#FFE494] border-[#E5C158]' : 'text-[#F5D77F]'
            }`}
            title="Toggle Instructions"
          >
            <span className="text-xs">💡</span>
            <span className="hidden md:inline">How To Play</span>
          </button>

          {/* Chapter Guide / Map Button */}
          <button
            onClick={() => setMapOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full fantasy-glass text-xs font-serif text-[#F5D77F] hover:text-white transition-all shadow-md"
            title="Explore Chapters"
          >
            <Compass size={15} />
            <span className="hidden md:inline">Chapters</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="w-9 h-9 rounded-full fantasy-glass text-[#F5D77F] hover:text-white flex items-center justify-center transition-all shadow-md"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Settings / Quality Switcher */}
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="w-9 h-9 rounded-full fantasy-glass text-[#F5D77F] hover:text-white flex items-center justify-center transition-all shadow-md"
            title="Settings & Quality"
          >
            <Sliders size={16} />
          </button>
        </div>
      </header>

      {/* Persistent Animated Instruction Banner */}
      {showHint && (
        <div className="fixed top-14 sm:top-16 left-1/2 -translate-x-1/2 z-30 max-w-xl w-[92%] sm:w-auto px-4 py-2 rounded-full fantasy-glass border border-[#E5C158]/50 text-center shadow-[0_4px_25px_rgba(0,0,0,0.6)] pointer-events-auto flex items-center justify-center gap-2 animate-pulse-slow">
          <span className="w-2 h-2 rounded-full bg-[#FFE494] shadow-[0_0_8px_#FFE494] shrink-0" />
          <p className="text-[11px] sm:text-xs font-serif text-[#FAF6F0] leading-snug">
            <span className="text-[#FFE494] font-bold uppercase tracking-wider mr-1.5">
              [{instruction.action}]:
            </span>
            {instruction.text}
          </p>
        </div>
      )}

      {/* Settings Dropdown */}
      {settingsOpen && (
        <div className="fixed top-16 right-5 z-40 w-64 p-4 rounded-xl fantasy-glass shadow-2xl flex flex-col gap-3 text-xs">
          <div className="flex items-center justify-between border-b border-[#E5C158]/30 pb-2">
            <span className="font-serif font-bold text-[#FAF6F0]">Experience Settings</span>
            <button onClick={() => setSettingsOpen(false)} className="text-[#FAF6F0]/60 hover:text-white">
              <X size={14} />
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex flex-col gap-1">
            <span className="text-[#FAF6F0]/80">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
              className="accent-[#E5C158] cursor-pointer"
            />
          </div>

          {/* Graphics Quality */}
          <div className="flex flex-col gap-1">
            <span className="text-[#FAF6F0]/80">Graphics Quality</span>
            <div className="grid grid-cols-3 gap-1 mt-1">
              {(['performance', 'balanced', 'high'] as GraphicsQuality[]).map((q) => (
                <button
                  key={q}
                  onClick={() => onChangeQuality(q)}
                  className={`py-1 rounded text-[10px] uppercase tracking-wider font-semibold capitalize border ${
                    quality === q
                      ? 'bg-[#E5C158] text-[#1D0C07] border-[#E5C158]'
                      : 'border-[#E5C158]/30 text-[#FAF6F0]/70 hover:bg-[#2C1810]'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chapter Map Modal */}
      {mapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-md w-full fantasy-glass rounded-2xl p-6 shadow-2xl border border-[#E5C158]/50">
            <div className="flex items-center justify-between border-b border-[#E5C158]/40 pb-3 mb-4">
              <h4 className="font-serif font-bold text-[#F5D77F] text-base">
                The Library Chronicle
              </h4>
              <button
                onClick={() => setMapOpen(false)}
                className="text-[#FAF6F0]/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    onChangeScene(ch.id);
                    setMapOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    currentScene === ch.id
                      ? 'bg-[#E5C158]/20 border-[#E5C158] text-[#FFE494] font-semibold'
                      : 'border-[#E5C158]/20 text-[#FAF6F0]/80 hover:bg-[#2C1810] hover:border-[#E5C158]/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#E5C158]">{ch.icon}</span>
                    <span className="text-xs font-serif">{ch.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-[#FAF6F0]/40" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Secret Drawer Note Modal */}
      {secretDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative max-w-sm w-full parchment-bg rounded-xl p-6 shadow-2xl border-2 border-[#B89738] text-[#2C1810]">
            <button
              onClick={onCloseSecretDrawer}
              className="absolute top-3 right-3 text-[#2C1810]/60 hover:text-[#2C1810]"
            >
              <X size={18} />
            </button>
            <h5 className="font-serif font-bold text-sm tracking-widest uppercase text-[#58111A] mb-3">
              ✦ Handwritten Note From The Drawer ✦
            </h5>
            <p className="font-script text-xl leading-relaxed">
              "Some little moments shine quietly, like bookmarks placed between the pages of our favourite days. Happy Birthday, Dhruvi!"
            </p>
          </div>
        </div>
      )}

      {/* Interactive Hidden Book Secret Modal */}
      {secretBookOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative max-w-sm w-full parchment-bg rounded-xl p-6 shadow-2xl border-2 border-[#E5C158] text-[#2C1810]">
            <button
              onClick={onCloseSecretBook}
              className="absolute top-3 right-3 text-[#2C1810]/60 hover:text-[#2C1810]"
            >
              <X size={18} />
            </button>
            <h5 className="font-serif font-bold text-sm tracking-widest uppercase text-[#B89738] mb-3">
              ✦ The Glowing Grimoire ✦
            </h5>
            <p className="font-serif text-sm leading-relaxed italic">
              "To the person who turns everyday conversations into stories worth remembering. May your library never run out of wonder."
            </p>
          </div>
        </div>
      )}

      {/* Interactive Globe Revealed Note Modal */}
      {globeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative max-w-sm w-full fantasy-glass rounded-xl p-6 shadow-2xl border border-[#E5C158] text-[#FAF6F0] text-center">
            <button
              onClick={onCloseGlobeMessage}
              className="absolute top-3 right-3 text-[#FAF6F0]/60 hover:text-white"
            >
              <X size={18} />
            </button>
            <span className="text-2xl mb-2 block">🌍</span>
            <h5 className="font-serif font-bold text-sm tracking-widest uppercase text-[#E5C158] mb-2">
              The Celestial Globe
            </h5>
            <p className="font-serif text-sm leading-relaxed text-[#FAF6F0]/90 italic">
              "{globeMessage}"
            </p>
          </div>
        </div>
      )}
    </>
  );
};
