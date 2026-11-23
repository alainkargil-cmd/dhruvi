import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MagicFeatherProps {
  position?: [number, number, number];
  scale?: number;
  interactive?: boolean;
  onClick?: () => void;
}

export const MagicFeather: React.FC<MagicFeatherProps> = ({
  position = [0, 0, 0],
  scale = 1,
  interactive = true,
  onClick,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const quillRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating and writing tilt
      groupRef.current.position.y = position[1] + Math.sin(t * 1.8) * 0.12;
      groupRef.current.position.x = position[0] + Math.cos(t * 1.2) * 0.08;
      groupRef.current.rotation.z = Math.sin(t * 2) * 0.1 - 0.2;
      groupRef.current.rotation.y = Math.cos(t * 1.5) * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 1.2 + Math.sin(t * 4) * 0.4;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        if (interactive && onClick) onClick();
      }}
      onPointerOver={() => {
        if (interactive) document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Quill Stem / Shaft */}
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.015, 0.005, 1.2, 12]} />
        <meshStandardMaterial
          color="#FFE494"
          metalness={0.8}
          roughness={0.2}
          emissive="#D4AF37"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Golden Feather Vane (Left) */}
      <mesh position={[-0.08, 0.1, 0]} rotation={[0, 0, 0.25]}>
        <planeGeometry args={[0.18, 0.9, 8, 8]} />
        <meshStandardMaterial
          color="#F5D77F"
          emissive="#E5C158"
          emissiveIntensity={0.4}
          side={THREE.DoubleSide}
          roughness={0.4}
          metalness={0.3}
          wireframe={false}
        />
      </mesh>

      {/* Golden Feather Vane (Right) */}
      <mesh position={[0.06, 0.05, 0]} rotation={[0, 0, 0.15]}>
        <planeGeometry args={[0.14, 0.8, 8, 8]} />
        <meshStandardMaterial
          color="#FFE494"
          emissive="#D4AF37"
          emissiveIntensity={0.4}
          side={THREE.DoubleSide}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Glowing Ink Nib Tip */}
      <mesh ref={quillRef} position={[0.12, -0.95, 0]}>
        <coneGeometry args={[0.025, 0.1, 8]} />
        <meshStandardMaterial
          color="#FFF"
          emissive="#FFE494"
          emissiveIntensity={1.8}
        />
      </mesh>

      {/* Golden Light from Nib */}
      <pointLight
        ref={glowRef}
        position={[0.12, -0.95, 0.1]}
        color="#F5D77F"
        distance={2}
        intensity={1.5}
      />
    </group>
  );
};
