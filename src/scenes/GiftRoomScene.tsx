import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { GiftBox } from '../objects/GiftBox';
import { MagicalButterfly } from '../objects/MagicalButterfly';
import { AtmosphericParticles } from '../effects/AtmosphericParticles';
import { birthdayConfig } from '../config/birthdayConfig';

interface GiftRoomSceneProps {
  openedGifts: string[];
  onOpenGift: (giftId: string) => void;
}

export const GiftRoomScene: React.FC<GiftRoomSceneProps> = ({
  openedGifts,
  onOpenGift,
}) => {
  const { gifts } = birthdayConfig;

  return (
    <>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={11}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.05}
        dampingFactor={0.05}
        autoRotate={true}
        autoRotateSpeed={0.35}
      />

      {/* Gift Room Decorated Floor */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#1D0C07" roughness={0.35} metalness={0.2} />
      </mesh>

      {/* Decorative Golden Inlay */}
      <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.8, 4.0, 48]} />
        <meshStandardMaterial color="#E5C158" metalness={0.8} roughness={0.2} emissive="#D4AF37" emissiveIntensity={0.3} />
      </mesh>

      {/* 4 Elegant Pedestals for the 4 Gift Boxes */}
      {/* Gift 1: Laughter (Left-Front) */}
      <group position={[-2.8, 0, 0.5]}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.7, 0.8, 0.9, 24]} />
          <meshStandardMaterial color="#2C1810" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.92, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.06, 24]} />
          <meshStandardMaterial color="#E5C158" metalness={0.85} roughness={0.2} />
        </mesh>
        <GiftBox
          id={gifts.laughter.id}
          title={gifts.laughter.title}
          subtitle={gifts.laughter.subtitle}
          position={[0, 1.45, 0]}
          boxColor={gifts.laughter.boxColor}
          ribbonColor={gifts.laughter.ribbonColor}
          glowColor="#FFE494"
          isOpen={openedGifts.includes(gifts.laughter.id)}
          onOpen={() => onOpenGift(gifts.laughter.id)}
        />
      </group>

      {/* Gift 2: Memories (Left-Back) */}
      <group position={[-1.1, 0, -2.2]}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.7, 0.8, 0.9, 24]} />
          <meshStandardMaterial color="#2C1810" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.92, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.06, 24]} />
          <meshStandardMaterial color="#E5C158" metalness={0.85} roughness={0.2} />
        </mesh>
        <GiftBox
          id={gifts.memories.id}
          title={gifts.memories.title}
          subtitle={gifts.memories.subtitle}
          position={[0, 1.45, 0]}
          boxColor={gifts.memories.boxColor}
          ribbonColor={gifts.memories.ribbonColor}
          glowColor="#E8B4B8"
          isOpen={openedGifts.includes(gifts.memories.id)}
          onOpen={() => onOpenGift(gifts.memories.id)}
        />
      </group>

      {/* Gift 3: Wishes (Right-Back) */}
      <group position={[1.1, 0, -2.2]}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.7, 0.8, 0.9, 24]} />
          <meshStandardMaterial color="#2C1810" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.92, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.06, 24]} />
          <meshStandardMaterial color="#E5C158" metalness={0.85} roughness={0.2} />
        </mesh>
        <GiftBox
          id={gifts.wishes.id}
          title={gifts.wishes.title}
          subtitle={gifts.wishes.subtitle}
          position={[0, 1.45, 0]}
          boxColor={gifts.wishes.boxColor}
          ribbonColor={gifts.wishes.ribbonColor}
          glowColor="#FFE494"
          isOpen={openedGifts.includes(gifts.wishes.id)}
          onOpen={() => onOpenGift(gifts.wishes.id)}
        />
      </group>

      {/* Gift 4: The Mystery Gift (Right-Front) */}
      <group position={[2.8, 0, 0.5]}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.7, 0.8, 0.9, 24]} />
          <meshStandardMaterial color="#2C1810" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.92, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.06, 24]} />
          <meshStandardMaterial color="#E5C158" metalness={0.85} roughness={0.2} />
        </mesh>
        <GiftBox
          id={gifts.mystery.id}
          title={gifts.mystery.title}
          subtitle={gifts.mystery.subtitle}
          position={[0, 1.45, 0]}
          boxColor={gifts.mystery.boxColor}
          ribbonColor={gifts.mystery.ribbonColor}
          hasWaxSeal={true}
          glowColor="#E5C158"
          isOpen={openedGifts.includes(gifts.mystery.id)}
          onOpen={() => onOpenGift(gifts.mystery.id)}
        />
      </group>

      {/* Chandelier & Ambient Lights */}
      <pointLight position={[0, 6, 0]} color="#FFE494" distance={14} intensity={2.4} />
      <ambientLight color="#2C1810" intensity={0.9} />

      {/* Floating Butterflies & Golden Sparkles */}
      <MagicalButterfly initialPosition={[0, 3, 0]} color="#F5D77F" radius={3} speed={1.1} />
      <MagicalButterfly initialPosition={[-2, 3.5, -1]} color="#E8B4B8" radius={2.5} speed={1.3} />
      <AtmosphericParticles count={200} color="#F5D77F" size={0.06} />
    </>
  );
};
