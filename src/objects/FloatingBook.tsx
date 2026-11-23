import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingBookProps {
  position: [number, number, number];
  color?: string;
  goldTrim?: boolean;
  scale?: number;
  rotationSpeed?: number;
  floatOffset?: number;
  title?: string;
  onClick?: () => void;
}

export const FloatingBook: React.FC<FloatingBookProps> = ({
  position,
  color = '#4A2518',
  goldTrim = true,
  scale = 0.8,
  rotationSpeed = 0.5,
  floatOffset = 0,
  title,
  onClick,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + floatOffset;
    if (groupRef.current) {
      // Smooth floating oscillation
      const hoverBoost = hovered ? 0.3 : 0;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.15 + hoverBoost;
      groupRef.current.rotation.y = position[0] * 0.2 + Math.sin(t * rotationSpeed) * 0.3;
      groupRef.current.rotation.x = Math.sin(t * 1.2) * 0.08;
      groupRef.current.rotation.z = Math.cos(t * 1.1) * 0.06;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={hovered ? scale * 1.15 : scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      {/* Book Cover (Front & Back) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 0.95, 0.14]} />
        <meshStandardMaterial
          color={hovered ? '#E5C158' : color}
          roughness={0.4}
          metalness={0.2}
          emissive={hovered ? '#D4AF37' : '#000'}
          emissiveIntensity={hovered ? 0.4 : 0}
        />
      </mesh>

      {/* Pages block */}
      <mesh position={[0.03, 0, 0]}>
        <boxGeometry args={[0.64, 0.9, 0.12]} />
        <meshStandardMaterial color="#FAF6F0" roughness={0.8} />
      </mesh>

      {/* Gold Trim Corner accents */}
      {goldTrim && (
        <mesh position={[-0.32, 0, 0]}>
          <boxGeometry args={[0.08, 0.96, 0.15]} />
          <meshStandardMaterial
            color="#E5C158"
            metalness={0.8}
            roughness={0.2}
            emissive="#FFE494"
            emissiveIntensity={0.2}
          />
        </mesh>
      )}

      {/* Soft Glow when hovered */}
      {hovered && (
        <pointLight color="#FFE494" distance={2} intensity={1.5} />
      )}
    </group>
  );
};
