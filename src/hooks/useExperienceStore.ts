import { useState, useEffect, useCallback } from 'react';
import { PhotoConfig, birthdayConfig } from '../config/birthdayConfig';
import { soundManager } from '../utils/soundEffects';

export type ExperienceScene = 
  | 'invitation'
  | 'library'
  | 'chapter-childhood'
  | 'chapter-solo'
  | 'chapter-friendship'
  | 'chapter-future'
  | 'gift-room'
  | 'celebration-cake'
  | 'celebration-reveal'
  | 'celebration-fireworks'
  | 'final-letter';

export type GraphicsQuality = 'high' | 'balanced' | 'performance';

export interface ExperienceState {
  currentScene: ExperienceScene;
  previousScene: ExperienceScene | null;
  quality: GraphicsQuality;
  isMuted: boolean;
  volume: number;
  openedBooks: string[];
  openedGifts: string[];
  activeGiftId: string | null;
  activePhotoModal: PhotoConfig | null;
  lampOn: boolean;
  secretDrawerOpen: boolean;
  secretBookOpen: boolean;
  globeRotation: number;
  globeMessage: string | null;
  candlesLit: boolean;
  candlesBlown: boolean;
  cakeCut: boolean;
  sliceServed: boolean;
  fireworksKey: number;
}

export function useExperience() {
  const [currentScene, setCurrentScene] = useState<ExperienceScene>('invitation');
  const [previousScene, setPreviousScene] = useState<ExperienceScene | null>(null);
  const [quality, setQuality] = useState<GraphicsQuality>('high');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [openedBooks, setOpenedBooks] = useState<string[]>([]);
  const [openedGifts, setOpenedGifts] = useState<string[]>([]);
  const [activeGiftId, setActiveGiftId] = useState<string | null>(null);
  const [activePhotoModal, setActivePhotoModal] = useState<PhotoConfig | null>(null);
  const [lampOn, setLampOn] = useState<boolean>(true);
  const [secretDrawerOpen, setSecretDrawerOpen] = useState<boolean>(false);
  const [secretBookOpen, setSecretBookOpen] = useState<boolean>(false);
  const [globeRotation, setGlobeRotation] = useState<number>(0);
  const [globeMessage, setGlobeMessage] = useState<string | null>(null);
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);
  const [cakeCut, setCakeCut] = useState<boolean>(false);
  const [sliceServed, setSliceServed] = useState<boolean>(false);
  const [fireworksKey, setFireworksKey] = useState<number>(0);

  // Auto-detect mobile to scale quality
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile) {
      setQuality('balanced');
    }
  }, []);

  const changeScene = useCallback((newScene: ExperienceScene) => {
    setPreviousScene(currentScene);
    setCurrentScene(newScene);

    // Audio cue on scene change
    if (newScene === 'library' && currentScene === 'invitation') {
      soundManager.startBGM();
      soundManager.playPageTurn();
    }
  }, [currentScene]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      soundManager.setMuted(next);
      return next;
    });
  }, []);

  const updateVolume = useCallback((val: number) => {
    setVolume(val);
    soundManager.setVolume(val);
  }, []);

  const openBook = useCallback((bookId: string) => {
    setOpenedBooks(prev => prev.includes(bookId) ? prev : [...prev, bookId]);
    soundManager.playPageTurn();
    if (bookId === 'little-beginning') changeScene('chapter-childhood');
    else if (bookId === 'becoming-dhruvi') changeScene('chapter-solo');
    else if (bookId === 'our-little-chaos') changeScene('chapter-friendship');
    else if (bookId === 'the-next-chapter') changeScene('chapter-future');
  }, [changeScene]);

  const openGift = useCallback((giftId: string) => {
    setOpenedGifts(prev => prev.includes(giftId) ? prev : [...prev, giftId]);
    setActiveGiftId(giftId);
    soundManager.playGiftOpen();
  }, []);

  const closeGiftModal = useCallback(() => {
    setActiveGiftId(null);
  }, []);

  const blowCandles = useCallback(() => {
    setCandlesBlown(true);
    setCandlesLit(false);
    soundManager.playCandleBlow();
  }, []);

  const cutCake = useCallback(() => {
    setCakeCut(true);
    soundManager.playCakeCut();
  }, []);

  const serveCakeSlice = useCallback(() => {
    setSliceServed(true);
    soundManager.playCakeCut();
    setTimeout(() => {
      changeScene('celebration-reveal');
    }, 1200);
  }, [changeScene]);

  const triggerFireworks = useCallback(() => {
    setFireworksKey(prev => prev + 1);
    changeScene('celebration-fireworks');
  }, [changeScene]);

  const replayCelebration = useCallback(() => {
    setCandlesLit(true);
    setCandlesBlown(false);
    setCakeCut(false);
    setSliceServed(false);
    setFireworksKey(prev => prev + 1);
    changeScene('celebration-cake');
  }, [changeScene]);

  return {
    currentScene,
    previousScene,
    quality,
    setQuality,
    isMuted,
    toggleMute,
    volume,
    updateVolume,
    openedBooks,
    openBook,
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
    birthdayConfig,
  };
}
