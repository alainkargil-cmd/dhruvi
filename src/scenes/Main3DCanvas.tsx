import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ExperienceScene, GraphicsQuality } from '../hooks/useExperienceStore';
import { LibraryScene } from './LibraryScene';
import { GiftRoomScene } from './GiftRoomScene';
import { BirthdayCake } from '../objects/BirthdayCake';
import { FireworksSystem } from '../effects/FireworksSystem';
import { AtmosphericParticles } from '../effects/AtmosphericParticles';

interface Main3DCanvasProps {
  currentScene: ExperienceScene;
  quality: GraphicsQuality;
  lampOn: boolean;
  onToggleLamp: () => void;
  secretDrawerOpen: boolean;
  onToggleSecretDrawer: () => void;
  secretBookOpen: boolean;
  onToggleSecretBook: () => void;
  globeRotation: number;
  onSpinGlobe: () => void;
  onOpenBook: (bookId: string) => void;
  openedGifts: string[];
  onOpenGift: (giftId: string) => void;
  candlesLit: boolean;
  cakeCut: boolean;
  sliceServed: boolean;
  onCutCake: () => void;
  fireworksKey: number;
}

export const Main3DCanvas: React.FC<Main3DCanvasProps> = ({
  currentScene,
  quality,
  lampOn,
  onToggleLamp,
  secretDrawerOpen,
  onToggleSecretDrawer,
  secretBookOpen,
  onToggleSecretBook,
  globeRotation,
  onSpinGlobe,
  onOpenBook,
  openedGifts,
  onOpenGift,
  candlesLit,
  cakeCut,
  sliceServed,
  onCutCake,
  fireworksKey,
}) => {
  // Determine pixel ratio based on quality setting
  const dpr = quality === 'high' ? [1, 2] : quality === 'balanced' ? [1, 1.5] : [1, 1];

  // Camera settings per scene
  const cameraPosition: [number, number, number] =
    currentScene === 'gift-room'
      ? [0, 3.8, 6.8]
      : currentScene.startsWith('celebration')
      ? [0, 2.5, 4.5]
      : [0, 3.2, 7.5];

  const isCelebration = currentScene.startsWith('celebration');
  const showFireworks = currentScene === 'celebration-fireworks' || currentScene === 'celebration-reveal';

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        dpr={dpr as [number, number]}
        gl={{ antialias: quality !== 'performance', powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          {/* ========================================================== */}
          {/* 1. SCENE: THE GRAND ENCHANTED LIBRARY */}
          {/* ========================================================== */}
          {currentScene === 'library' && (
            <LibraryScene
              lampOn={lampOn}
              onToggleLamp={onToggleLamp}
              secretDrawerOpen={secretDrawerOpen}
              onToggleSecretDrawer={onToggleSecretDrawer}
              secretBookOpen={secretBookOpen}
              onToggleSecretBook={onToggleSecretBook}
              globeRotation={globeRotation}
              onSpinGlobe={onSpinGlobe}
              onOpenBook={onOpenBook}
            />
          )}

          {/* ========================================================== */}
          {/* 2. SCENE: THE MAGICAL GIFT ROOM */}
          {/* ========================================================== */}
          {currentScene === 'gift-room' && (
            <GiftRoomScene
              openedGifts={openedGifts}
              onOpenGift={onOpenGift}
            />
          )}

          {/* ========================================================== */}
          {/* 3. SCENE: THE BIRTHDAY CELEBRATION (CAKE & FIREWORKS) */}
          {/* ========================================================== */}
          {isCelebration && (
            <>
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={3.2}
                maxDistance={8}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2.1}
                dampingFactor={0.05}
                autoRotate={true}
                autoRotateSpeed={0.25}
              />

              {/* Celebration Environment Lighting */}
              <ambientLight color="#3A1E14" intensity={1.1} />
              <directionalLight position={[0, 8, 4]} color="#FFE494" intensity={2.0} />

              {/* The 3D Birthday Cake */}
              <BirthdayCake
                candlesLit={candlesLit}
                cakeCut={cakeCut}
                sliceServed={sliceServed}
                onSliceClick={onCutCake}
              />

              {/* Custom 3D Virtual Fireworks System */}
              <FireworksSystem
                active={showFireworks}
                replayKey={fireworksKey}
              />

              {/* Golden celebration particles */}
              <AtmosphericParticles count={180} color="#FFE494" size={0.06} />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
