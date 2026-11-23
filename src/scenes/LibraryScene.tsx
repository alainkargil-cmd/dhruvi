import React, { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { LibraryArchitecture } from '../objects/LibraryArchitecture';
import { InteractiveBook } from '../objects/InteractiveBook';
import { FloatingBook } from '../objects/FloatingBook';
import { MagicalButterfly } from '../objects/MagicalButterfly';
import { MagicFeather } from '../objects/MagicFeather';
import { AtmosphericParticles } from '../effects/AtmosphericParticles';
import { birthdayConfig } from '../config/birthdayConfig';

interface LibrarySceneProps {
  lampOn: boolean;
  onToggleLamp: () => void;
  secretDrawerOpen: boolean;
  onToggleSecretDrawer: () => void;
  secretBookOpen: boolean;
  onToggleSecretBook: () => void;
  globeRotation: number;
  onSpinGlobe: () => void;
  onOpenBook: (bookId: string) => void;
}

export const LibraryScene: React.FC<LibrarySceneProps> = ({
  lampOn,
  onToggleLamp,
  secretDrawerOpen,
  onToggleSecretDrawer,
  secretBookOpen,
  onToggleSecretBook,
  globeRotation,
  onSpinGlobe,
  onOpenBook,
}) => {
  return (
    <>
      {/* Controlled Orbit Camera with Damping */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={12}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.05}
        dampingFactor={0.05}
      />

      {/* Main 3D Architecture */}
      <LibraryArchitecture
        lampOn={lampOn}
        onToggleLamp={onToggleLamp}
        secretDrawerOpen={secretDrawerOpen}
        onToggleSecretDrawer={onToggleSecretDrawer}
        secretBookOpen={secretBookOpen}
        onToggleSecretBook={onToggleSecretBook}
        globeRotation={globeRotation}
        onSpinGlobe={onSpinGlobe}
      />

      {/* The 4 Special Storybooks on Display Pedestals throughout the Library */}
      {/* Book 1: The Little Beginning (Left Desk Area) */}
      <InteractiveBook
        id="little-beginning"
        chapterNumber={1}
        title={birthdayConfig.chapters.childhood.title}
        subtitle={birthdayConfig.chapters.childhood.subtitle}
        position={[-3.2, 1.2, -1.2]}
        rotation={[0, 0.4, 0]}
        color="#3A1E14"
        goldAccent="#E5C158"
        onOpen={() => onOpenBook('little-beginning')}
      />

      {/* Book 2: Becoming Dhruvi (Center-Left Pedestal) */}
      <InteractiveBook
        id="becoming-dhruvi"
        chapterNumber={2}
        title={birthdayConfig.chapters.solo.title}
        subtitle={birthdayConfig.chapters.solo.subtitle}
        position={[-1.1, 1.2, -2.6]}
        rotation={[0, 0.15, 0]}
        color="#4E2A1E"
        goldAccent="#F5D77F"
        onOpen={() => onOpenBook('becoming-dhruvi')}
      />

      {/* Book 3: Our Little Chaos (Center-Right Pedestal) */}
      <InteractiveBook
        id="our-little-chaos"
        chapterNumber={3}
        title={birthdayConfig.chapters.friendship.title}
        subtitle={birthdayConfig.chapters.friendship.subtitle}
        position={[1.1, 1.2, -2.6]}
        rotation={[0, -0.15, 0]}
        color="#58111A"
        goldAccent="#E5C158"
        onOpen={() => onOpenBook('our-little-chaos')}
      />

      {/* Book 4: The Next Chapter (Right Desk Area) */}
      <InteractiveBook
        id="the-next-chapter"
        chapterNumber={4}
        title={birthdayConfig.chapters.future.title}
        subtitle={birthdayConfig.chapters.future.subtitle}
        position={[3.2, 1.2, -1.2]}
        rotation={[0, -0.4, 0]}
        color="#26160F"
        goldAccent="#FFE494"
        onOpen={() => onOpenBook('the-next-chapter')}
      />

      {/* Floating Books in the Library Air */}
      <FloatingBook position={[-2.2, 3.8, -0.8]} color="#4E2A1E" rotationSpeed={0.4} floatOffset={0} />
      <FloatingBook position={[2.5, 4.2, -0.5]} color="#58111A" rotationSpeed={0.5} floatOffset={1.5} />
      <FloatingBook position={[-3.8, 4.5, -2.5]} color="#26160F" rotationSpeed={0.3} floatOffset={2.8} />
      <FloatingBook position={[3.6, 3.6, -3.2]} color="#3B2219" rotationSpeed={0.6} floatOffset={3.4} />

      {/* Magical Butterflies */}
      <MagicalButterfly initialPosition={[-1.5, 2.5, -1.5]} color="#FFE494" radius={2.2} speed={1.2} />
      <MagicalButterfly initialPosition={[2.0, 3.2, -2.0]} color="#E8B4B8" radius={2.8} speed={0.9} />
      <MagicalButterfly initialPosition={[0, 4.0, -1.0]} color="#9B8EA9" radius={3.2} speed={1.4} />

      {/* Floating Magic Golden Feather */}
      <MagicFeather position={[0, 2.8, -1.8]} scale={0.9} />

      {/* Atmospheric Golden Dust Motes */}
      <AtmosphericParticles count={220} color="#FFE494" size={0.05} />
    </>
  );
};
