import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { soundManager } from '../utils/soundEffects';

interface GiftBoxProps {
  id: string;
  title: string;
  subtitle: string;
  position: [number, number, number];
  scale?: number;
  boxColor: string;
  ribbonColor: string;
  glowColor?: string;
  hasWaxSeal?: boolean;
  isOpen?: boolean;
  onOpen: () => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({
  id,
  title,
  subtitle,
  position,
  scale = 1,
  boxColor,
  ribbonColor,
  glowColor = '#FFE494',
  hasWaxSeal = false,
  isOpen = false,
  onOpen,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const lidGroupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const currentLidLift = useRef(0);
  const currentLidAngle = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Gentle bobbing on pedestal
    if (groupRef.current && !isOpen) {
      groupRef.current.position.y = position[1] + (hovered ? 0.2 : 0) + Math.sin(t * 1.8 + position[0]) * 0.05;
      groupRef.current.rotation.y = Math.sin(t * 0.7) * 0.08;
    }

    // Lid opening animation
    const targetLift = isOpen ? 0.7 : (hovered ? 0.1 : 0);
    const targetAngle = isOpen ? -0.7 : 0;
    currentLidLift.current = THREE.MathUtils.lerp(currentLidLift.current, targetLift, 0.1);
    currentLidAngle.current = THREE.MathUtils.lerp(currentLidAngle.current, targetAngle, 0.1);

    if (lidGroupRef.current) {
      lidGroupRef.current.position.y = 0.5 + currentLidLift.current;
      lidGroupRef.current.rotation.x = currentLidAngle.current;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundManager.playGiftOpen();
    onOpen();
  };

  return (
    <group
      ref={groupRef}
      position={position}
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
      {/* Box Base (Container) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.9, 1]} />
        <meshStandardMaterial
          color={boxColor}
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>

      {/* Base Vertical Ribbon X */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.02, 0.91, 0.18]} />
        <meshStandardMaterial
          color={ribbonColor}
          metalness={0.7}
          roughness={0.25}
          emissive={ribbonColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Base Vertical Ribbon Z */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.18, 0.91, 1.02]} />
        <meshStandardMaterial
          color={ribbonColor}
          metalness={0.7}
          roughness={0.25}
          emissive={ribbonColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Box Lid on Hinged Lift Group */}
      <group ref={lidGroupRef} position={[0, 0.5, 0]}>
        {/* Lid Top Mesh */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[1.08, 0.14, 1.08]} />
          <meshStandardMaterial
            color={boxColor}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Lid Ribbon X */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[1.1, 0.15, 0.2]} />
          <meshStandardMaterial
            color={ribbonColor}
            metalness={0.75}
            roughness={0.2}
            emissive={ribbonColor}
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Lid Ribbon Z */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.2, 0.15, 1.1]} />
          <meshStandardMaterial
            color={ribbonColor}
            metalness={0.75}
            roughness={0.2}
            emissive={ribbonColor}
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* 3D Bow Knot (Sphere) */}
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={ribbonColor}
            metalness={0.8}
            roughness={0.2}
            emissive={ribbonColor}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Bow Loop Left */}
        <mesh position={[-0.15, 0.22, 0]} rotation={[0, 0, 0.6]}>
          <torusGeometry args={[0.12, 0.045, 8, 20]} />
          <meshStandardMaterial
            color={ribbonColor}
            metalness={0.8}
            roughness={0.2}
            emissive={ribbonColor}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Bow Loop Right */}
        <mesh position={[0.15, 0.22, 0]} rotation={[0, 0, -0.6]}>
          <torusGeometry args={[0.12, 0.045, 8, 20]} />
          <meshStandardMaterial
            color={ribbonColor}
            metalness={0.8}
            roughness={0.2}
            emissive={ribbonColor}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Wax Seal for Mystery Gift */}
        {hasWaxSeal && (
          <mesh position={[0, 0.14, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
            <meshStandardMaterial
              color="#A51D24"
              roughness={0.5}
              metalness={0.3}
              emissive="#721117"
              emissiveIntensity={0.4}
            />
          </mesh>
        )}
      </group>

      {/* Interior Glowing Light inside box */}
      <pointLight
        position={[0, 0.2, 0]}
        color={glowColor}
        distance={2.5}
        intensity={isOpen ? 3.5 : (hovered ? 2 : 0.6)}
      />

      {/* Floating 3D Title Tooltip */}
      <Html
        position={[0, 1.2, 0]}
        center
        distanceFactor={6}
        className="pointer-events-none select-none transition-all duration-300"
      >
        <div className={`flex flex-col items-center px-4 py-2 rounded-lg text-center backdrop-blur-md border ${
          hovered 
            ? 'bg-[#2C1810]/95 border-[#E5C158] shadow-[0_0_20px_rgba(229,193,88,0.6)] scale-110' 
            : 'bg-[#1D0C07]/80 border-[#E5C158]/40'
        }`}>
          <span className="text-xs font-serif font-bold text-[#FAF6F0] tracking-wide whitespace-nowrap">
            {title}
          </span>
          <span className="text-[11px] font-script text-[#E5C158] italic whitespace-nowrap">
            {subtitle}
          </span>
          <span className="text-[9px] text-[#FAF6F0]/70 mt-1 uppercase tracking-wider">
            {isOpen ? 'Click to Revisit' : 'Click to Open'}
          </span>
        </div>
      </Html>
    </group>
  );
};
