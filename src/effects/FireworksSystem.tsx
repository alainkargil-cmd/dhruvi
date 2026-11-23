import React, { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundManager } from '../utils/soundEffects';

interface FireworkParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: THREE.Color;
  life: number;
  maxLife: number;
  size: number;
  gravity: number;
  decay: number;
}

interface FireworksSystemProps {
  active: boolean;
  onComplete?: () => void;
  replayKey?: number;
}

export const FireworksSystem: React.FC<FireworksSystemProps> = ({
  active,
  onComplete,
  replayKey = 0,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const maxParticles = 4000;
  const particles = useRef<FireworkParticle[]>([]);
  const startTime = useRef<number>(0);
  const phaseRef = useRef<number>(1);
  const nameSpawned = useRef<boolean>(false);
  const finaleSpawned = useRef<boolean>(false);

  // Position, Color, and Size Buffers
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(maxParticles * 3);
    const col = new Float32Array(maxParticles * 3);
    const sz = new Float32Array(maxParticles);
    return [pos, col, sz];
  }, [maxParticles]);

  // Color Palette from Spec
  const palette = useMemo(() => [
    new THREE.Color('#FFE494'), // Gold
    new THREE.Color('#F5D77F'), // Champagne Gold
    new THREE.Color('#E8B4B8'), // Rose Pink
    new THREE.Color('#9B8EA9'), // Lavender
    new THREE.Color('#FFFFFF'), // Warm White
    new THREE.Color('#88D49E'), // Soft Emerald
    new THREE.Color('#70A1FF'), // Soft Blue
  ], []);

  // Helper to spawn a shell burst
  const spawnBurst = (
    origin: [number, number, number],
    type: 'sphere' | 'heart' | 'ring' | 'star' | 'willow',
    baseColor: THREE.Color,
    count: number = 180
  ) => {
    soundManager.playFireworkExplosion();

    for (let i = 0; i < count; i++) {
      if (particles.current.length >= maxParticles) break;

      let vx = 0;
      let vy = 0;
      let vz = 0;
      const speed = 2.5 + Math.random() * 3.5;

      if (type === 'sphere') {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.cbrt(Math.random());
        const sinPhi = Math.sin(phi);
        vx = r * sinPhi * Math.cos(theta) * speed;
        vy = r * sinPhi * Math.sin(theta) * speed;
        vz = r * Math.cos(phi) * speed;
      } else if (type === 'heart') {
        // Parametric Heart Curve in 2D projected to 3D
        const t = Math.random() * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const spread = (Math.random() - 0.5) * 0.4;
        vx = (hx / 16) * speed * 0.8;
        vy = (hy / 16) * speed * 0.8;
        vz = spread * speed;
      } else if (type === 'ring') {
        const angle = Math.random() * Math.PI * 2;
        vx = Math.cos(angle) * speed;
        vz = Math.sin(angle) * speed;
        vy = (Math.random() - 0.5) * 0.5;
      } else if (type === 'willow') {
        const angle = Math.random() * Math.PI * 2;
        const spread = Math.random() * 0.8;
        vx = Math.cos(angle) * spread * speed;
        vz = Math.sin(angle) * spread * speed;
        vy = Math.random() * 1.5;
      }

      particles.current.push({
        x: origin[0],
        y: origin[1],
        z: origin[2],
        vx,
        vy,
        vz,
        color: baseColor.clone(),
        life: 1.0,
        maxLife: type === 'willow' ? 2.8 : 1.8 + Math.random() * 0.8,
        size: type === 'willow' ? 0.08 : 0.06,
        gravity: type === 'willow' ? 0.035 : 0.045,
        decay: 1.0 / (type === 'willow' ? 2.5 : 1.6),
      });
    }
  };

  // Helper to spawn DHRUVI Name in particles
  const spawnNameFireworks = () => {
    soundManager.playFireworkExplosion();
    const gold = new THREE.Color('#FFE494');
    const nameY = 8.5;
    const nameZ = -1.5;

    // Relative letter coordinates for D - H - R - U - V - I
    const letterD = [
      [-4.0, 0], [-4.0, 0.4], [-4.0, 0.8], [-4.0, 1.2], [-4.0, 1.6],
      [-3.8, 1.6], [-3.5, 1.4], [-3.3, 0.8], [-3.5, 0.2], [-3.8, 0]
    ];
    const letterH = [
      [-2.8, 0], [-2.8, 0.4], [-2.8, 0.8], [-2.8, 1.2], [-2.8, 1.6],
      [-2.1, 0], [-2.1, 0.4], [-2.1, 0.8], [-2.1, 1.2], [-2.1, 1.6],
      [-2.5, 0.8]
    ];
    const letterR = [
      [-1.6, 0], [-1.6, 0.4], [-1.6, 0.8], [-1.6, 1.2], [-1.6, 1.6],
      [-1.3, 1.6], [-1.0, 1.4], [-1.0, 1.0], [-1.3, 0.8],
      [-1.1, 0.4], [-0.9, 0]
    ];
    const letterU = [
      [-0.4, 1.6], [-0.4, 1.2], [-0.4, 0.6], [-0.2, 0.1], [0.1, 0],
      [0.4, 0.1], [0.6, 0.6], [0.6, 1.2], [0.6, 1.6]
    ];
    const letterV = [
      [1.1, 1.6], [1.3, 1.1], [1.5, 0.6], [1.7, 0.1],
      [1.9, 0.6], [2.1, 1.1], [2.3, 1.6]
    ];
    const letterI = [
      [2.8, 1.6], [3.1, 1.6], [3.4, 1.6],
      [3.1, 1.2], [3.1, 0.8], [3.1, 0.4],
      [2.8, 0], [3.1, 0], [3.4, 0]
    ];

    const allLetters = [...letterD, ...letterH, ...letterR, ...letterU, ...letterV, ...letterI];

    allLetters.forEach(([lx, ly]) => {
      // Spawn multiple dense particles per coordinate point
      for (let k = 0; k < 6; k++) {
        if (particles.current.length >= maxParticles) break;
        particles.current.push({
          x: lx,
          y: nameY + ly,
          z: nameZ + (Math.random() - 0.5) * 0.2,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          vz: (Math.random() - 0.5) * 0.15,
          color: gold.clone(),
          life: 1.0,
          maxLife: 3.5,
          size: 0.1,
          gravity: 0.005,
          decay: 0.25,
        });
      }
    });
  };

  // Reset or initialize when active or replayKey changes
  useEffect(() => {
    if (active) {
      particles.current = [];
      startTime.current = 0;
      phaseRef.current = 1;
      nameSpawned.current = false;
      finaleSpawned.current = false;
      soundManager.playFireworkLaunch();
    }
  }, [active, replayKey]);

  useFrame(({ clock }, delta) => {
    if (!active || !pointsRef.current) return;

    if (startTime.current === 0) {
      startTime.current = clock.getElapsedTime();
    }
    const elapsed = clock.getElapsedTime() - startTime.current;

    // --- Choreography Timeline ---
    // Phase 1 (0s - 4s): Initial golden celebratory bursts
    if (elapsed < 4 && Math.random() < 0.06) {
      const rx = (Math.random() - 0.5) * 8;
      const ry = 7 + Math.random() * 3;
      const rz = -2 + (Math.random() - 0.5) * 4;
      soundManager.playFireworkLaunch();
      spawnBurst([rx, ry, rz], 'sphere', palette[0], 120);
    }

    // Phase 2 (4s - 9s): Multi-color bursts (Pink, Lavender, Champagne Gold, White, Blue)
    if (elapsed >= 4 && elapsed < 9 && Math.random() < 0.08) {
      const rx = (Math.random() - 0.5) * 9;
      const ry = 6.5 + Math.random() * 3.5;
      const rz = -2 + (Math.random() - 0.5) * 5;
      const col = palette[Math.floor(Math.random() * palette.length)];
      soundManager.playFireworkLaunch();
      spawnBurst([rx, ry, rz], 'sphere', col, 140);
    }

    // Phase 3 (9s - 13s): Special shapes (Heart, Ring, Willow)
    if (elapsed >= 9 && elapsed < 13 && Math.random() < 0.07) {
      const rx = (Math.random() - 0.5) * 6;
      const ry = 7.5 + Math.random() * 2;
      const rz = -1.5;
      const types: ('heart' | 'ring' | 'willow')[] = ['heart', 'ring', 'willow'];
      const chosenType = types[Math.floor(Math.random() * types.length)];
      soundManager.playFireworkLaunch();
      spawnBurst([rx, ry, rz], chosenType, palette[Math.floor(Math.random() * 3)], 160);
    }

    // Phase 4 (13s): DHRUVI Name Formation
    if (elapsed >= 13 && !nameSpawned.current) {
      nameSpawned.current = true;
      spawnNameFireworks();
    }

    // Phase 5 (17s): Grand Finale Simultaneous Cascades
    if (elapsed >= 17 && !finaleSpawned.current) {
      finaleSpawned.current = true;
      [-4, 0, 4].forEach((fx) => {
        spawnBurst([fx, 8.5, -2], 'willow', palette[1], 250);
        spawnBurst([fx, 7.5, -1], 'heart', palette[2], 180);
      });
    }

    // Auto-complete callback after 22 seconds
    if (elapsed > 22 && onComplete) {
      onComplete();
    }

    // --- Update Particles Physics & Geometry Buffers ---
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const colAttr = pointsRef.current.geometry.attributes.color as THREE.BufferAttribute;
    const szAttr = pointsRef.current.geometry.attributes.size as THREE.BufferAttribute;

    const pArray = posAttr.array as Float32Array;
    const cArray = colAttr.array as Float32Array;
    const sArray = szAttr.array as Float32Array;

    let activeCount = 0;

    for (let i = particles.current.length - 1; i >= 0; i--) {
      const p = particles.current[i];
      p.life -= delta * p.decay;

      if (p.life <= 0) {
        particles.current.splice(i, 1);
        continue;
      }

      // Physics integration
      p.x += p.vx * delta * 60 * 0.018;
      p.y += p.vy * delta * 60 * 0.018;
      p.z += p.vz * delta * 60 * 0.018;
      p.vy -= p.gravity * delta * 60 * 0.35;

      // Air resistance
      p.vx *= 0.985;
      p.vz *= 0.985;

      const idx = activeCount;
      pArray[idx * 3] = p.x;
      pArray[idx * 3 + 1] = p.y;
      pArray[idx * 3 + 2] = p.z;

      cArray[idx * 3] = p.color.r * p.life;
      cArray[idx * 3 + 1] = p.color.g * p.life;
      cArray[idx * 3 + 2] = p.color.b * p.life;

      sArray[idx] = p.size * (0.3 + p.life * 0.7);
      activeCount++;
    }

    // Clear unused slots
    for (let i = activeCount; i < maxParticles; i++) {
      sArray[i] = 0;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    szAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={maxParticles}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={maxParticles}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={maxParticles}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
