import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MagicalButterflyProps {
  initialPosition?: [number, number, number];
  color?: string;
  glowColor?: string;
  speed?: number;
  radius?: number;
  scale?: number;
  onClick?: () => void;
}

export const MagicalButterfly: React.FC<MagicalButterflyProps> = ({
  initialPosition = [0, 2, 0],
  color = '#FFE494',
  glowColor = '#E5C158',
  speed = 1.2,
  radius = 2.5,
  scale = 0.45,
  onClick,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);
  const [clicked, setClicked] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (groupRef.current) {
      // Orbiting flight trajectory
      const x = initialPosition[0] + Math.cos(t) * radius;
      const z = initialPosition[2] + Math.sin(t) * radius;
      const y = initialPosition[1] + Math.sin(t * 2.5) * 0.4;

      groupRef.current.position.set(x, y, z);
      // Face flight direction
      groupRef.current.rotation.y = -t + Math.PI / 2;
      groupRef.current.rotation.x = Math.sin(t * 3) * 0.15;
    }

    // Wing flapping
    const flapSpeed = clicked ? 28 : 16;
    const flap = Math.sin(clock.getElapsedTime() * flapSpeed) * 0.7;
    if (leftWingRef.current) {
      leftWingRef.current.rotation.y = flap;
    }
    if (rightWingRef.current) {
      rightWingRef.current.rotation.y = -flap;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
    if (onClick) onClick();
  };

  return (
    <group
      ref={groupRef}
      scale={scale}
      onClick={handleClick}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Butterfly Body */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.04, 0.35, 6, 8]} />
        <meshStandardMaterial color="#2C1810" roughness={0.5} />
      </mesh>

      {/* Left Forewing */}
      <mesh
        ref={leftWingRef}
        position={[-0.04, 0.05, 0]}
        rotation={[0, 0, 0.1]}
      >
        <planeGeometry args={[0.5, 0.6, 2, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={glowColor}
          emissiveIntensity={clicked ? 1.5 : 0.6}
          side={THREE.DoubleSide}
          transparent
          opacity={0.88}
          roughness={0.3}
        />
      </mesh>

      {/* Right Forewing */}
      <mesh
        ref={rightWingRef}
        position={[0.04, 0.05, 0]}
        rotation={[0, 0, -0.1]}
      >
        <planeGeometry args={[0.5, 0.6, 2, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={glowColor}
          emissiveIntensity={clicked ? 1.5 : 0.6}
          side={THREE.DoubleSide}
          transparent
          opacity={0.88}
          roughness={0.3}
        />
      </mesh>

      {/* Glowing point light */}
      <pointLight
        color={glowColor}
        distance={1.5}
        intensity={clicked ? 2 : 0.8}
      />
    </group>
  );
};
