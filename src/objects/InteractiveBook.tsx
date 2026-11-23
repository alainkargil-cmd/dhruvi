import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { soundManager } from '../utils/soundEffects';

interface InteractiveBookProps {
  id: string;
  title: string;
  subtitle: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  goldAccent?: string;
  isOpen?: boolean;
  chapterNumber?: number;
  onOpen: () => void;
}

export const InteractiveBook: React.FC<InteractiveBookProps> = ({
  id,
  title,
  subtitle,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  color = '#3A1E14',
  goldAccent = '#E5C158',
  isOpen = false,
  chapterNumber,
  onOpen,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coverHingeRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const currentOpenAngle = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Gentle floating bob
    if (groupRef.current && !isOpen) {
      groupRef.current.position.y = position[1] + (hovered ? 0.2 : 0) + Math.sin(t * 1.6 + position[0]) * 0.08;
      groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.8) * 0.05;
    }

    // Smooth hinge animation for cover
    const targetAngle = isOpen ? -Math.PI * 0.85 : (hovered ? -0.2 : 0);
    currentOpenAngle.current = THREE.MathUtils.lerp(currentOpenAngle.current, targetAngle, 0.1);
    if (coverHingeRef.current) {
      coverHingeRef.current.rotation.y = currentOpenAngle.current;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundManager.playPageTurn();
    onOpen();
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={hovered ? scale * 1.08 : scale}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Back Cover & Spine Group */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[1.2, 0.04, 1.6]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Spine on Left */}
      <mesh position={[-0.6, 0.02, 0]}>
        <boxGeometry args={[0.08, 0.18, 1.62]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Gold Spine Ribs */}
      {[-0.5, -0.2, 0.1, 0.4].map((z, i) => (
        <mesh key={i} position={[-0.61, 0.02, z]}>
          <boxGeometry args={[0.085, 0.02, 0.08]} />
          <meshStandardMaterial
            color={goldAccent}
            metalness={0.8}
            roughness={0.2}
            emissive={goldAccent}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Pages Block */}
      <mesh position={[0.02, 0.02, 0]}>
        <boxGeometry args={[1.14, 0.12, 1.54]} />
        <meshStandardMaterial color="#FAF6F0" roughness={0.9} />
      </mesh>

      {/* Front Cover on Hinge at x = -0.58 */}
      <group ref={coverHingeRef} position={[-0.58, 0.09, 0]}>
        {/* The Front Cover Mesh offset to pivot from left spine */}
        <mesh position={[0.58, 0, 0]}>
          <boxGeometry args={[1.18, 0.04, 1.6]} />
          <meshStandardMaterial
            color={hovered ? '#4A2518' : color}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Ornate Gold Border & Filigree on Front Cover */}
        <mesh position={[0.58, 0.025, 0]}>
          <boxGeometry args={[1.05, 0.005, 1.45]} />
          <meshStandardMaterial
            color={goldAccent}
            metalness={0.8}
            roughness={0.2}
            emissive={goldAccent}
            emissiveIntensity={hovered ? 0.6 : 0.25}
          />
        </mesh>

        {/* Embossed Inner Title Plate */}
        <mesh position={[0.58, 0.03, 0]}>
          <boxGeometry args={[0.85, 0.005, 0.9]} />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
        </mesh>

        {/* 3D Gold Emblem on Cover */}
        <mesh position={[0.58, 0.035, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.01, 16]} />
          <meshStandardMaterial
            color={goldAccent}
            metalness={0.9}
            roughness={0.15}
            emissive={goldAccent}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Floating 3D Title Plate above book */}
      <Html
        position={[0, 0.7, 0]}
        center
        distanceFactor={6}
        className="pointer-events-none select-none transition-all duration-300"
      >
        <div className={`flex flex-col items-center px-4 py-2 rounded-lg text-center backdrop-blur-md border ${
          hovered 
            ? 'bg-[#2C1810]/90 border-[#E5C158] shadow-[0_0_20px_rgba(229,193,88,0.5)] scale-110' 
            : 'bg-[#1D0C07]/75 border-[#E5C158]/40'
        }`}>
          {chapterNumber && (
            <span className="text-[10px] tracking-widest text-[#E5C158] uppercase font-serif font-semibold">
              Chapter {chapterNumber}
            </span>
          )}
          <span className="text-sm font-serif font-bold text-[#FAF6F0] tracking-wide whitespace-nowrap">
            {title}
          </span>
          <span className="text-[11px] font-script text-[#E5C158] italic whitespace-nowrap">
            {subtitle}
          </span>
          <span className="text-[9px] text-[#FAF6F0]/60 mt-1 uppercase tracking-wider">
            Click to Open
          </span>
        </div>
      </Html>

      {/* Golden Aura Light */}
      <pointLight
        position={[0, 0.5, 0]}
        color={goldAccent}
        distance={2.5}
        intensity={hovered ? 2.5 : 0.8}
      />
    </group>
  );
};
