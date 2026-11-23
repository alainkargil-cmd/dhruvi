import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BirthdayCakeProps {
  candlesLit: boolean;
  cakeCut: boolean;
  sliceServed: boolean;
  onSliceClick?: () => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({
  candlesLit,
  cakeCut,
  sliceServed,
  onSliceClick,
}) => {
  const cakeGroupRef = useRef<THREE.Group>(null);
  const sliceRef = useRef<THREE.Group>(null);
  const knifeRef = useRef<THREE.Group>(null);
  const flameLightsRef = useRef<THREE.PointLight[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Gentle rotation of the whole cake
    if (cakeGroupRef.current) {
      cakeGroupRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    }

    // Candle flame flickering
    flameLightsRef.current.forEach((light, i) => {
      if (light) {
        if (candlesLit) {
          light.intensity = 1.2 + Math.sin(t * 12 + i * 2) * 0.4;
        } else {
          light.intensity = THREE.MathUtils.lerp(light.intensity, 0, 0.1);
        }
      }
    });

    // Animate slice sliding outward when cut or served
    if (sliceRef.current) {
      const targetSliceZ = sliceServed ? 1.4 : (cakeCut ? 0.45 : 0);
      const targetSliceY = sliceServed ? 0.2 : 0;
      sliceRef.current.position.z = THREE.MathUtils.lerp(sliceRef.current.position.z, targetSliceZ, 0.08);
      sliceRef.current.position.y = THREE.MathUtils.lerp(sliceRef.current.position.y, targetSliceY, 0.08);
    }

    // Knife slicing movement
    if (knifeRef.current) {
      if (cakeCut && !sliceServed) {
        knifeRef.current.position.y = THREE.MathUtils.lerp(knifeRef.current.position.y, 0.6, 0.1);
        knifeRef.current.rotation.x = THREE.MathUtils.lerp(knifeRef.current.rotation.x, 0.3, 0.1);
      } else {
        knifeRef.current.position.y = THREE.MathUtils.lerp(knifeRef.current.position.y, 1.8, 0.1);
      }
    }
  });

  // Candle positions on top tier
  const candlePositions: [number, number, number][] = [
    [0, 1.35, 0],
    [0.35, 1.35, 0],
    [-0.35, 1.35, 0],
    [0, 1.35, 0.35],
    [0, 1.35, -0.35],
    [0.25, 1.35, 0.25],
    [-0.25, 1.35, -0.25],
  ];

  return (
    <group ref={cakeGroupRef} position={[0, -0.2, 0]}>
      {/* Ornate Golden Cake Stand / Pedestal */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.1, 32]} />
        <meshStandardMaterial
          color="#E5C158"
          metalness={0.85}
          roughness={0.2}
          emissive="#D4AF37"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Pedestal Stem */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.7, 0.6, 24]} />
        <meshStandardMaterial
          color="#B89738"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
      {/* Pedestal Base */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[1.2, 1.3, 0.1, 32]} />
        <meshStandardMaterial
          color="#E5C158"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Main Cake (Minus Cut Slice if cut) */}
      {/* Tier 1 (Bottom Tier) */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.7, 32]} />
        <meshStandardMaterial
          color="#FAF6F0" // Warm Ivory Frosting
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>
      {/* Tier 1 Bottom Gold Border Ring */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[1.32, 0.04, 12, 32]} />
        <meshStandardMaterial
          color="#E5C158"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Tier 2 (Top Tier) */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.6, 32]} />
        <meshStandardMaterial
          color="#FCEEEB" // Pastel Rose-Ivory Frosting
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>
      {/* Tier 2 Bottom Gold Border Ring */}
      <mesh position={[0, 0.68, 0]}>
        <torusGeometry args={[0.87, 0.035, 12, 32]} />
        <meshStandardMaterial
          color="#E5C158"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Gold Decorative Pearls around top rim */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.82, 1.25, Math.sin(angle) * 0.82]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              color="#FFE494"
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
        );
      })}

      {/* Cut Slice Group (Slides forward when cut) */}
      <group
        ref={sliceRef}
        onClick={(e) => {
          e.stopPropagation();
          if (onSliceClick) onSliceClick();
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        {/* Slice Wedge Visual Accent */}
        <mesh position={[0, 0.35, 0.6]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.45, 0.68, 0.5]} />
          <meshStandardMaterial
            color="#FAF6F0"
            roughness={0.5}
            emissive={cakeCut ? '#FFE494' : '#000'}
            emissiveIntensity={cakeCut ? 0.2 : 0}
          />
        </mesh>
        {/* Golden serving plate for slice */}
        {cakeCut && (
          <mesh position={[0, -0.02, 0.6]}>
            <cylinderGeometry args={[0.4, 0.45, 0.03, 24]} />
            <meshStandardMaterial
              color="#E5C158"
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
        )}
      </group>

      {/* Candles and Flames */}
      {candlePositions.map(([cx, cy, cz], idx) => (
        <group key={idx} position={[cx, cy, cz]}>
          {/* Candle Body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.24, 12]} />
            <meshStandardMaterial
              color="#FFE494"
              metalness={0.3}
              roughness={0.3}
            />
          </mesh>

          {/* Candle Wick */}
          <mesh position={[0, 0.13, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.04, 6]} />
            <meshStandardMaterial color="#2C1810" />
          </mesh>

          {/* Flame (visible when candlesLit is true) */}
          {candlesLit && (
            <mesh position={[0, 0.18, 0]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial
                color="#FFA733"
                emissive="#FFE494"
                emissiveIntensity={2.5}
              />
            </mesh>
          )}

          {/* Flame Point Light */}
          <pointLight
            ref={(el) => {
              if (el) flameLightsRef.current[idx] = el;
            }}
            position={[0, 0.22, 0]}
            color="#FFA733"
            distance={1.5}
            intensity={candlesLit ? 1.4 : 0}
          />

          {/* Subtle rising smoke puff if extinguished */}
          {!candlesLit && (
            <mesh position={[0, 0.24, 0]}>
              <sphereGeometry args={[0.02, 6, 6]} />
              <meshStandardMaterial
                color="#A89F91"
                transparent
                opacity={0.35}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Golden Cake Knife */}
      <group
        ref={knifeRef}
        position={[0.7, 1.4, 0.4]}
        rotation={[0.2, 0.5, 0.8]}
      >
        {/* Knife Blade */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.08, 0.8, 0.01]} />
          <meshStandardMaterial
            color="#FAF6F0"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        {/* Knife Handle (Embossed Gold) */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.035, 0.04, 0.35, 12]} />
          <meshStandardMaterial
            color="#E5C158"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};
