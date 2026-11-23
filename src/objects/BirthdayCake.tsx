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
  const flameMeshesRef = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Gentle slow rotation of the cake for 3D depth
    if (cakeGroupRef.current) {
      cakeGroupRef.current.rotation.y = Math.sin(t * 0.3) * 0.12;
    }

    // Realistic flickering flame animation
    flameLightsRef.current.forEach((light, i) => {
      if (light) {
        if (candlesLit) {
          light.intensity = 1.3 + Math.sin(t * 14 + i * 2.1) * 0.4 + Math.cos(t * 22 + i) * 0.2;
        } else {
          light.intensity = THREE.MathUtils.lerp(light.intensity, 0, 0.12);
        }
      }
    });

    flameMeshesRef.current.forEach((mesh, i) => {
      if (mesh) {
        if (candlesLit) {
          const flickerScale = 1.0 + Math.sin(t * 16 + i * 1.8) * 0.18;
          mesh.scale.set(flickerScale, flickerScale * (1.0 + Math.cos(t * 12 + i) * 0.2), flickerScale);
          mesh.position.y = 0.2 + Math.sin(t * 10 + i) * 0.01;
        } else {
          mesh.scale.lerp(new THREE.Vector3(0, 0, 0), 0.15);
        }
      }
    });

    // Realistic smooth cake slice sliding out when cut
    if (sliceRef.current) {
      const targetSliceZ = sliceServed ? 1.5 : (cakeCut ? 0.65 : 0);
      const targetSliceY = sliceServed ? 0.15 : 0;
      sliceRef.current.position.z = THREE.MathUtils.lerp(sliceRef.current.position.z, targetSliceZ, 0.08);
      sliceRef.current.position.y = THREE.MathUtils.lerp(sliceRef.current.position.y, targetSliceY, 0.08);
    }

    // Knife cutting animation: plunges down through the cake and resets
    if (knifeRef.current) {
      if (cakeCut) {
        // Knife slides down to cut and rests alongside the plate
        knifeRef.current.position.y = THREE.MathUtils.lerp(knifeRef.current.position.y, 0.35, 0.12);
        knifeRef.current.position.z = THREE.MathUtils.lerp(knifeRef.current.position.z, 0.85, 0.12);
        knifeRef.current.rotation.x = THREE.MathUtils.lerp(knifeRef.current.rotation.x, 0.1, 0.1);
        knifeRef.current.rotation.z = THREE.MathUtils.lerp(knifeRef.current.rotation.z, 0.4, 0.1);
      } else {
        // Knife hovers ready above the cake
        knifeRef.current.position.y = 1.6 + Math.sin(t * 2) * 0.05;
        knifeRef.current.position.z = 0.5;
        knifeRef.current.rotation.x = 0.35;
        knifeRef.current.rotation.z = 0.75;
      }
    }
  });

  // Candle positions distributed symmetrically across top tier
  const candlePositions: [number, number, number][] = [
    [0, 1.45, 0],
    [0.4, 1.45, 0],
    [-0.4, 1.45, 0],
    [0, 1.45, 0.4],
    [0, 1.45, -0.4],
    [0.28, 1.45, 0.28],
    [-0.28, 1.45, -0.28],
  ];

  return (
    <group ref={cakeGroupRef} position={[0, -0.3, 0]}>
      {/* ========================================================================= */}
      {/* 1. LUXURY GOLDEN DISPLAY PEDESTAL / CAKE STAND */}
      {/* ========================================================================= */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <cylinderGeometry args={[1.65, 1.75, 0.12, 48]} />
        <meshStandardMaterial
          color="#E5C158"
          metalness={0.9}
          roughness={0.18}
          emissive="#D4AF37"
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Pedestal Stem */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.42, 0.75, 0.68, 32]} />
        <meshStandardMaterial color="#B89738" metalness={0.85} roughness={0.22} />
      </mesh>
      {/* Pedestal Fluted Base */}
      <mesh position={[0, -0.92, 0]}>
        <cylinderGeometry args={[1.35, 1.45, 0.12, 48]} />
        <meshStandardMaterial color="#E5C158" metalness={0.9} roughness={0.18} />
      </mesh>

      {/* ========================================================================= */}
      {/* 2. BASE TIER (Tier 1) - RICH FRENCH VANILLA BEAN FROSTING */}
      {/* ========================================================================= */}
      {/* If cake is cut, render the main tier with a 45-degree wedge cutout */}
      <mesh position={[0, 0.35, 0]} receiveShadow castShadow>
        <cylinderGeometry
          args={[
            1.42,
            1.42,
            0.75,
            48,
            1,
            false,
            cakeCut ? Math.PI / 8 : 0,
            cakeCut ? Math.PI * 2 - Math.PI / 4 : Math.PI * 2
          ]}
        />
        <meshStandardMaterial
          color="#FFFDF9" // Soft Velvet Vanilla Cream
          roughness={0.32}
          metalness={0.04}
        />
      </mesh>

      {/* Inside Exposed Sponge Layers if Cut */}
      {cakeCut && (
        <group position={[0, 0.35, 0]}>
          {/* Left inner cut face */}
          <mesh rotation={[0, Math.PI / 8, 0]}>
            <planeGeometry args={[1.42, 0.74]} />
            <meshStandardMaterial color="#F5E4B5" roughness={0.7} />
          </mesh>
          {/* Right inner cut face */}
          <mesh rotation={[0, -Math.PI / 8, 0]}>
            <planeGeometry args={[1.42, 0.74]} />
            <meshStandardMaterial color="#F5E4B5" roughness={0.7} />
          </mesh>
          {/* Strawberry cream jam layer in between */}
          <mesh rotation={[0, Math.PI / 8, 0]} position={[0, 0, 0.001]}>
            <planeGeometry args={[1.4, 0.08]} />
            <meshStandardMaterial color="#E06D7B" roughness={0.4} />
          </mesh>
        </group>
      )}

      {/* Base Tier Gold Pearl Border Ring */}
      <mesh position={[0, 0.02, 0]}>
        <torusGeometry args={[1.44, 0.04, 16, 48]} />
        <meshStandardMaterial color="#E5C158" metalness={0.88} roughness={0.15} />
      </mesh>

      {/* Base Tier Piped Cream Swirls / Pearls around top perimeter */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        // Don't render pearls in the cut wedge area if cake is cut
        if (cakeCut && (angle < Math.PI / 8 || angle > Math.PI * 2 - Math.PI / 8)) return null;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.38, 0.73, Math.sin(angle) * 1.38]}
          >
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#FFF9EE" roughness={0.25} />
          </mesh>
        );
      })}

      {/* ========================================================================= */}
      {/* 3. TOP TIER (Tier 2) - BLUSH ROSE & STRAWBERRY CREAM */}
      {/* ========================================================================= */}
      <mesh position={[0, 1.05, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.95, 0.95, 0.65, 40]} />
        <meshStandardMaterial
          color="#FCEAE8" // Luscious Strawberry Milk Cream
          roughness={0.28}
          metalness={0.04}
        />
      </mesh>

      {/* Tier 2 Middle Gold Inlay Ribbon */}
      <mesh position={[0, 0.74, 0]}>
        <torusGeometry args={[0.97, 0.035, 16, 40]} />
        <meshStandardMaterial color="#E5C158" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Tier 2 Top Piped Rosettes */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.92, 1.38, Math.sin(angle) * 0.92]}
          >
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#FFF5EB" roughness={0.25} />
          </mesh>
        );
      })}

      {/* Fresh Realistic Strawberries around Top Tier */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2 + 0.2;
        return (
          <group
            key={`berry-${i}`}
            position={[Math.cos(angle) * 0.7, 1.4, Math.sin(angle) * 0.7]}
            rotation={[0.1, angle, 0]}
          >
            {/* Strawberry Berry Body */}
            <mesh position={[0, 0.06, 0]}>
              <coneGeometry args={[0.07, 0.14, 12]} />
              <meshStandardMaterial
                color="#D3122A" // Vibrant ripe strawberry red
                roughness={0.2}
                metalness={0.1}
              />
            </mesh>
            {/* Green Calyx Leaves */}
            <mesh position={[0, 0.13, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.08, 0.03, 5]} />
              <meshStandardMaterial color="#2E7D32" roughness={0.5} />
            </mesh>
          </group>
        );
      })}

      {/* Golden Acrylic Cake Topper Plaque: "Happy Birthday Dhruvi" */}
      <group position={[0, 1.7, 0]}>
        {/* Topper Prongs */}
        <mesh position={[-0.2, -0.15, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.3, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0.2, -0.15, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.3, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Topper Heart Crest with Monogram */}
        <mesh position={[0, 0.08, 0]}>
          <torusGeometry args={[0.26, 0.035, 16, 32]} />
          <meshStandardMaterial
            color="#FFE494"
            metalness={0.92}
            roughness={0.1}
            emissive="#D4AF37"
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.015, 32]} />
          <meshStandardMaterial
            color="#FFFDF7"
            roughness={0.2}
            emissive="#FFE494"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 4. REALISTIC CAKE SLICE WEDGE (Slides out smoothly when cut) */}
      {/* ========================================================================= */}
      {cakeCut && (
        <group
          ref={sliceRef}
          onClick={(e) => {
            e.stopPropagation();
            if (onSliceClick) onSliceClick();
          }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        >
          {/* 45-degree Cylinder Sector Slice Wedge */}
          <group position={[0, 0.35, 0]}>
            <mesh receiveShadow castShadow>
              <cylinderGeometry
                args={[1.42, 1.42, 0.75, 24, 1, false, -Math.PI / 8, Math.PI / 4]}
              />
              <meshStandardMaterial
                color="#FFFDF9"
                roughness={0.32}
              />
            </mesh>
            {/* Sponge inside faces */}
            <mesh rotation={[0, -Math.PI / 8, 0]} position={[0, 0, 0]}>
              <planeGeometry args={[1.42, 0.74]} />
              <meshStandardMaterial color="#F5E4B5" roughness={0.7} />
            </mesh>
            <mesh rotation={[0, Math.PI / 8, 0]} position={[0, 0, 0]}>
              <planeGeometry args={[1.42, 0.74]} />
              <meshStandardMaterial color="#F5E4B5" roughness={0.7} />
            </mesh>
            {/* Strawberry Jam Layer inside the slice */}
            <mesh rotation={[0, 0, 0]} position={[0, 0, 0.001]}>
              <planeGeometry args={[1.4, 0.08]} />
              <meshStandardMaterial color="#E06D7B" roughness={0.4} />
            </mesh>
          </group>

          {/* Strawberry on top of the slice */}
          <group position={[0, 0.78, 0.8]} rotation={[0.1, 0, 0]}>
            <mesh position={[0, 0.06, 0]}>
              <coneGeometry args={[0.07, 0.14, 12]} />
              <meshStandardMaterial color="#D3122A" roughness={0.2} metalness={0.1} />
            </mesh>
            <mesh position={[0, 0.13, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.08, 0.03, 5]} />
              <meshStandardMaterial color="#2E7D32" roughness={0.5} />
            </mesh>
          </group>

          {/* Golden Porcelain Dessert Serving Plate */}
          <mesh position={[0, -0.01, 0.75]}>
            <cylinderGeometry args={[0.68, 0.75, 0.04, 32]} />
            <meshStandardMaterial
              color="#FFFDF7"
              roughness={0.15}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[0, 0.015, 0.75]}>
            <torusGeometry args={[0.72, 0.02, 16, 32]} />
            <meshStandardMaterial color="#E5C158" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>
      )}

      {/* ========================================================================= */}
      {/* 5. SPIRAL BIRTHDAY CANDLES & ANIMATED TEARDROP FLAMES */}
      {/* ========================================================================= */}
      {candlePositions.map(([cx, cy, cz], idx) => (
        <group key={`candle-${idx}`} position={[cx, cy, cz]}>
          {/* Candle Body with Golden Spiral Texture Accent */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.028, 0.028, 0.28, 16]} />
            <meshStandardMaterial
              color="#FFE494"
              metalness={0.4}
              roughness={0.25}
            />
          </mesh>
          {/* Candle Wick */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.04, 8]} />
            <meshStandardMaterial color="#1E0D06" />
          </mesh>

          {/* Flickering Teardrop Flame */}
          {candlesLit && (
            <mesh
              ref={(el) => { if (el) flameMeshesRef.current[idx] = el; }}
              position={[0, 0.21, 0]}
            >
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial
                color="#FFAA33"
                emissive="#FFE082"
                emissiveIntensity={2.8}
              />
            </mesh>
          )}

          {/* Flame Point Light */}
          <pointLight
            ref={(el) => { if (el) flameLightsRef.current[idx] = el; }}
            position={[0, 0.24, 0]}
            color="#FFB300"
            distance={2.0}
            intensity={candlesLit ? 1.5 : 0}
          />

          {/* Extinguished Smoke Wisps */}
          {!candlesLit && (
            <mesh position={[0, 0.25, 0]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="#C5BDB5" transparent opacity={0.3} />
            </mesh>
          )}
        </group>
      ))}

      {/* ========================================================================= */}
      {/* 6. ORNATE GOLDEN PASTRY KNIFE */}
      {/* ========================================================================= */}
      <group
        ref={knifeRef}
        position={[0.85, 1.6, 0.5]}
        rotation={[0.3, 0.4, 0.75]}
      >
        {/* Mirror-Polished Stainless Steel Blade */}
        <mesh position={[0, -0.45, 0]}>
          <boxGeometry args={[0.09, 0.9, 0.012]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.96}
            roughness={0.08}
          />
        </mesh>
        {/* Ornate Gold Handle */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.038, 0.045, 0.4, 16]} />
          <meshStandardMaterial
            color="#E5C158"
            metalness={0.88}
            roughness={0.18}
          />
        </mesh>
        {/* Pommel */}
        <mesh position={[0, 0.43, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>
    </group>
  );
};
