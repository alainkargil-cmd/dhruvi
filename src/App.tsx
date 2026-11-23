import React from 'react';
import { useExperience } from './hooks/useExperienceStore';
import { IntroScene } from './scenes/IntroScene';
import { Main3DCanvas } from './scenes/Main3DCanvas';
import { StoryChapters } from './scenes/StoryChapters';
import { BirthdayCelebrationScene } from './scenes/BirthdayCelebrationScene';
import { FinalLetterScene } from './scenes/FinalLetterScene';
import { NavigationHUD } from './components/Navigation/NavigationHUD';
import { GiftModal } from './components/UI/GiftModal';
import { PhotoModal } from './components/UI/PhotoModal';
import { Gift, Cake, BookOpen, Compass } from 'lucide-react';

export default function App() {
  const {
    currentScene,
    quality,
    setQuality,
    isMuted,
    toggleMute,
    volume,
    updateVolume,
    openedGifts,
    openGift,
    activeGiftId,
    closeGiftModal,
    activePhotoModal,
    setActivePhotoModal,
    lampOn,
    setLampOn,
    secretDrawerOpen,
    setSecretDrawerOpen,
    secretBookOpen,
    setSecretBookOpen,
    globeRotation,
    setGlobeRotation,
    globeMessage,
    setGlobeMessage,
    candlesLit,
    candlesBlown,
    blowCandles,
    cakeCut,
    cutCake,
    sliceServed,
    serveCakeSlice,
    fireworksKey,
    triggerFireworks,
    replayCelebration,
    changeScene,
    openBook,
    birthdayConfig,
  } = useExperience();

  const is3DActive =
    currentScene === 'library' ||
    currentScene === 'gift-room' ||
    currentScene.startsWith('celebration');

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#150804] text-[#FAF6F0] font-sans select-none">
      {/* Cinematic Fantasy Vignette & Ambient Golden Atmospheric Glow */}
      <div className="pointer-events-none fixed inset-0 z-20 shadow-[inset_0_0_130px_rgba(0,0,0,0.85)]" />
      <div className="pointer-events-none fixed inset-0 z-20 bg-[radial-gradient(circle_at_50%_35%,transparent_35%,rgba(21,8,4,0.55)_100%)]" />
      {/* 1. Global Navigation HUD */}
      <NavigationHUD
        currentScene={currentScene}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        volume={volume}
        onChangeVolume={updateVolume}
        quality={quality}
        onChangeQuality={setQuality}
        onChangeScene={changeScene}
        globeMessage={globeMessage}
        onCloseGlobeMessage={() => setGlobeMessage(null)}
        secretDrawerOpen={secretDrawerOpen}
        onCloseSecretDrawer={() => setSecretDrawerOpen(false)}
        secretBookOpen={secretBookOpen}
        onCloseSecretBook={() => setSecretBookOpen(false)}
      />

      {/* 2. Scene: Mysterious Invitation (Chapter 1) */}
      {currentScene === 'invitation' && (
        <IntroScene onEnterLibrary={() => changeScene('library')} />
      )}

      {/* 3. Real 3D Environment (Library / Gift Room / Celebration) */}
      {is3DActive && (
        <Main3DCanvas
          currentScene={currentScene}
          quality={quality}
          lampOn={lampOn}
          onToggleLamp={() => setLampOn(!lampOn)}
          secretDrawerOpen={secretDrawerOpen}
          onToggleSecretDrawer={() => setSecretDrawerOpen(!secretDrawerOpen)}
          secretBookOpen={secretBookOpen}
          onToggleSecretBook={() => setSecretBookOpen(!secretBookOpen)}
          globeRotation={globeRotation}
          onSpinGlobe={() => {
            setGlobeRotation(globeRotation + Math.PI / 2);
            setGlobeMessage("Every rotation of the globe brings new horizons and journeys meant just for you.");
          }}
          onOpenBook={openBook}
          openedGifts={openedGifts}
          onOpenGift={openGift}
          candlesLit={candlesLit}
          cakeCut={cakeCut}
          sliceServed={sliceServed}
          onCutCake={cutCake}
          fireworksKey={fireworksKey}
        />
      )}

      {/* Bottom Scene Shortcuts when in 3D Library or Gift Room */}
      {currentScene === 'library' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => changeScene('gift-room')}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE494] to-[#E5C158] text-[#1D0C07] font-serif font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(229,193,88,0.7)] hover:scale-105 transition-all"
          >
            <Gift size={16} /> Enter The Magical Gift Room
          </button>
        </div>
      )}

      {currentScene === 'gift-room' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => changeScene('library')}
            className="px-4 py-2.5 rounded-full fantasy-glass text-[#F5D77F] hover:text-white text-xs font-serif uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
          >
            <Compass size={14} /> Back to Library
          </button>

          <button
            onClick={() => changeScene('celebration-cake')}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFE494] to-[#E5C158] text-[#1D0C07] font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(229,193,88,0.7)] hover:scale-105 transition-all"
          >
            <Cake size={16} /> Birthday Celebration
          </button>
        </div>
      )}

      {/* 4. Scene: Dedicated Story Chapters (Childhood, Solo, Friendship, Future) */}
      {(currentScene === 'chapter-childhood' ||
        currentScene === 'chapter-solo' ||
        currentScene === 'chapter-friendship' ||
        currentScene === 'chapter-future') && (
        <StoryChapters
          chapterId={currentScene}
          config={birthdayConfig}
          onOpenPhoto={(photo) => setActivePhotoModal(photo)}
          onReturnToLibrary={() => changeScene('library')}
          onNextChapter={(nextId) => changeScene(nextId as any)}
        />
      )}

      {/* 5. Scene: Birthday Celebration Overlay (Cake Ceremony, Reveal & Fireworks) */}
      {currentScene.startsWith('celebration') && (
        <BirthdayCelebrationScene
          currentSubStage={
            currentScene === 'celebration-cake'
              ? 'cake'
              : currentScene === 'celebration-reveal'
              ? 'reveal'
              : 'fireworks'
          }
          config={birthdayConfig}
          candlesLit={candlesLit}
          candlesBlown={candlesBlown}
          cakeCut={cakeCut}
          sliceServed={sliceServed}
          onBlowCandles={blowCandles}
          onCutCake={cutCake}
          onServeSlice={serveCakeSlice}
          onTriggerFireworks={triggerFireworks}
          onReplayFireworks={triggerFireworks}
          onOpenLetter={() => changeScene('final-letter')}
        />
      )}

      {/* 6. Scene: Final Birthday Letter */}
      {currentScene === 'final-letter' && (
        <FinalLetterScene
          config={birthdayConfig}
          onReturnToLibrary={() => changeScene('library')}
          onReplayCelebration={replayCelebration}
        />
      )}

      {/* 7. Gift Modal (Laughter Video, Memories Scrapbook, Wishes Galaxy, Mystery Group Photo) */}
      <GiftModal
        giftId={activeGiftId}
        config={birthdayConfig}
        onClose={closeGiftModal}
        onOpenPhoto={(photo) => setActivePhotoModal(photo)}
        onStartCelebration={() => changeScene('celebration-cake')}
      />

      {/* 8. Photo Modal for High-Fidelity Enlarged Portraits */}
      <PhotoModal
        photo={activePhotoModal}
        onClose={() => setActivePhotoModal(null)}
      />
    </div>
  );
}
