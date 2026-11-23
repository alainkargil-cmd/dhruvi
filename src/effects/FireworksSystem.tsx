import React, { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundManager } from '../utils/soundEffects';

interface SkyShotRocket {
  x: number;
  y: number;
  z: number;
  targetY: number;
  vy: number;
  color: THREE.Color;
  type: 'sphere' | 'willow' | 'heart' | 'ring';
  count: number;
}

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
  isTrail?: boolean;
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
  const maxParticles = 5000;
  const particles = useRef<FireworkParticle[]>([]);
  const rockets = useRef<SkyShotRocket[]>([]);
  const startTime = useRef<number>(0);
  const nameSpawned = useRef<boolean>(false);
  const finaleSpawned = useRef<boolean>(false);

  // Position, Color, and Size Buffers for high-performance point cloud
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(maxParticles * 3);
    const col = new Float32Array(maxParticles * 3);
    const sz = new Float32Array(maxParticles);
    return [pos, col, sz];
  }, [maxParticles]);

  // Luxury SkyShot Palette
  const palette = useMemo(() => [
    new THREE.Color('#FFE494'), // Imperial Gold
    new THREE.Color('#FFD166'), // Sunset Amber
    new THREE.Color('#FF4D80'), // Vivid Rose
    new THREE.Color('#9B5DE5'), // Royal Lavender
    new THREE.Color('#00F5D4'), // Celestial Cyan
    new THREE.Color('#FFFFFF'), // Pure Diamond White
    new THREE.Color('#FF9F1C'), // Fiery Orange
  ], []);

  // Launch a realistic SkyShot rocket ascending from the ground
  const launchSkyShot = (
    startX: number,
    startZ: number,
    targetY: number,
    color: THREE.Color,
    type: 'sphere' | 'willow' | 'heart' | 'ring' = 'sphere',
    count: number = 200
  ) => {
    soundManager.playFireworkLaunch();
    rockets.current.push({
      x: startX,
      y: 0.2,
      z: startZ,
      targetY,
      vy: 12 + Math.random() * 4,
      color,
      type,
      count,
    });
  };

  // Detonate a SkyShot shell at apex into explosive stars
  const detonateSkyShot = (
    origin: [number, number, number],
    type: 'sphere' | 'willow' | 'heart' | 'ring',
    baseColor: THREE.Color,
    count: number
  ) => {
    soundManager.playFireworkExplosion();

    for (let i = 0; i < count; i++) {
      if (particles.current.length >= maxParticles) break;

      let vx = 0;
      let vy = 0;
      let vz = 0;
      const speed = type === 'willow' ? 2.5 + Math.random() * 2.5 : 4.0 + Math.random() * 4.5;

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
        const t = Math.random() * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const spread = (Math.random() - 0.5) * 0.35;
        vx = (hx / 16) * speed * 0.85;
        vy = (hy / 16) * speed * 0.85;
        vz = spread * speed;
      } else if (type === 'ring') {
        const angle = Math.random() * Math.PI * 2;
        const spread = (Math.random() - 0.5) * 0.3;
        vx = Math.cos(angle) * speed;
        vz = Math.sin(angle) * speed;
        vy = spread * speed;
      } else if (type === 'willow') {
        // Willow cascading brocade
        const angle = Math.random() * Math.PI * 2;
        const spread = Math.random() * 0.8;
        vx = Math.cos(angle) * spread * speed;
        vz = Math.sin(angle) * spread * speed;
        vy = (Math.random() * 0.6) * speed;
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
        maxLife: type === 'willow' ? 3.2 : 2.0 + Math.random() * 0.8,
        size: type === 'willow' ? 0.09 : 0.07,
        gravity: type === 'willow' ? 0.038 : 0.048,
        decay: 1.0 / (type === 'willow' ? 2.8 : 1.8),
      });
    }
  };

  // Launch SkyShot Constellation forming "D H R U V I" in glowing golden stars
  const launchNameSkyShot = () => {
    soundManager.playFireworkExplosion();
    const gold = new THREE.Color('#FFE494');
    const nameY = 8.6;
    const nameZ = -1.2;

    const letterD = [
      [-4.2, 0], [-4.2, 0.4], [-4.2, 0.8], [-4.2, 1.2], [-4.2, 1.6],
      [-3.9, 1.6], [-3.5, 1.4], [-3.3, 0.8], [-3.5, 0.2], [-3.9, 0]
    ];
    const letterH = [
      [-2.8, 0], [-2.8, 0.4], [-2.8, 0.8], [-2.8, 1.2], [-2.8, 1.6],
      [-2.0, 0], [-2.0, 0.4], [-2.0, 0.8], [-2.0, 1.2], [-2.0, 1.6],
      [-2.4, 0.8]
    ];
    const letterR = [
      [-1.5, 0], [-1.5, 0.4], [-1.5, 0.8], [-1.5, 1.2], [-1.5, 1.6],
      [-1.2, 1.6], [-0.9, 1.4], [-0.9, 1.0], [-1.2, 0.8],
      [-1.0, 0.4], [-0.8, 0]
    ];
    const letterU = [
      [-0.3, 1.6], [-0.3, 1.2], [-0.3, 0.6], [-0.1, 0.1], [0.2, 0],
      [0.5, 0.1], [0.7, 0.6], [0.7, 1.2], [0.7, 1.6]
    ];
    const letterV = [
      [1.2, 1.6], [1.4, 1.1], [1.6, 0.6], [1.8, 0.1],
      [2.0, 0.6], [2.2, 1.1], [2.4, 1.6]
    ];
    const letterI = [
      [2.9, 1.6], [3.2, 1.6], [3.5, 1.6],
      [3.2, 1.2], [3.2, 0.8], [3.2, 0.4],
      [2.9, 0], [3.2, 0], [3.5, 0]
    ];

    const allCoords = [...letterD, ...letterH, ...letterR, ...letterU, ...letterV, ...letterI];

    allCoords.forEach(([lx, ly]) => {
      for (let k = 0; k < 6; k++) {
        if (particles.current.length >= maxParticles) break;
        particles.current.push({
          x: lx,
          y: nameY + ly,
          z: nameZ + (Math.random() - 0.5) * 0.25,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          vz: (Math.random() - 0.5) * 0.12,
          color: gold.clone(),
          life: 1.0,
          maxLife: 4.2,
          size: 0.11,
          gravity: 0.004,
          decay: 0.22,
        });
      }
    });
  };

  // Reset & trigger on active or replayKey change
  useEffect(() => {
    if (active) {
      particles.current = [];
      rockets.current = [];
      startTime.current = 0;
      nameSpawned.current = false;
      finaleSpawned.current = false;
      // Immediate opening SkyShot rocket
      launchSkyShot(0, -2, 8.5, palette[0], 'willow', 240);
      launchSkyShot(-2.5, -1.5, 7.8, palette[2], 'heart', 200);
      launchSkyShot(2.5, -1.5, 7.8, palette[4], 'sphere', 200);
    }
  }, [active, replayKey, palette]);

  useFrame(({ clock }, delta) => {
    if (!active || !pointsRef.current) return;

    if (startTime.current === 0) {
      startTime.current = clock.getElapsedTime();
    }
    const elapsed = clock.getElapsedTime() - startTime.current;

    // =========================================================================
    // SKYSHOTS CHOREOGRAPHY TIMELINE
    // =========================================================================

    // Salvo 1 (1s - 5s): High-rising golden and amber SkyShots
    if (elapsed > 1 && elapsed < 5 && Math.random() < 0.05) {
      const rx = (Math.random() - 0.5) * 7;
      const rz = -2 + (Math.random() - 0.5) * 3;
      const targetY = 7.5 + Math.random() * 2.5;
      launchSkyShot(rx, rz, targetY, palette[Math.random() > 0.5 ? 0 : 1], 'willow', 180);
    }

    // Salvo 2 (5s - 9s): Vibrant multi-color peony SkyShots
    if (elapsed >= 5 && elapsed < 9 && Math.random() < 0.065) {
      const rx = (Math.random() - 0.5) * 8;
      const rz = -1.8 + (Math.random() - 0.5) * 4;
      const targetY = 7.0 + Math.random() * 3.0;
      const col = palette[Math.floor(Math.random() * palette.length)];
      launchSkyShot(rx, rz, targetY, col, 'sphere', 190);
    }

    // Salvo 3 (9s - 13s): Ring & Heart shape SkyShots
    if (elapsed >= 9 && elapsed < 13 && Math.random() < 0.06) {
      const rx = (Math.random() - 0.5) * 6;
      const rz = -1.5;
      const targetY = 8.0 + Math.random() * 2.0;
      const shapes: ('heart' | 'ring')[] = ['heart', 'ring'];
      launchSkyShot(rx, rz, targetY, palette[2], shapes[Math.floor(Math.random() * shapes.length)], 220);
    }

    // Salvo 4 (13s): DHRUVI Name Golden Constellation
    if (elapsed >= 13 && !nameSpawned.current) {
      nameSpawned.current = true;
      launchNameSkyShot();
    }

    // Salvo 5 (17s): Grand SkyShot Finale Salvo (7 rockets across the horizon)
    if (elapsed >= 17 && !finaleSpawned.current) {
      finaleSpawned.current = true;
      [-5, -3, -1, 0, 1, 3, 5].forEach((fx, idx) => {
        setTimeout(() => {
          launchSkyShot(fx, -2.5, 8.5 + (idx % 2) * 1.0, palette[idx % palette.length], 'willow', 240);
        }, idx * 180);
      });
    }

    // Auto-complete callback after 24s
    if (elapsed > 24 && onComplete) {
      onComplete();
    }

    // =========================================================================
    // UPDATE ROCKET TRAJECTORIES & EMIT ASCENT SPARKS
    // =========================================================================
    for (let r = rockets.current.length - 1; r >= 0; r--) {
      const rocket = rockets.current[r];
      rocket.y += rocket.vy * delta;

      // Rocket ascent spark trail
      if (particles.current.length < maxParticles) {
        particles.current.push({
          x: rocket.x + (Math.random() - 0.5) * 0.1,
          y: rocket.y - 0.15,
          z: rocket.z + (Math.random() - 0.5) * 0.1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -2.0 - Math.random() * 2.0,
          vz: (Math.random() - 0.5) * 0.5,
          color: new THREE.Color('#FFF4CC'),
          life: 0.6,
          maxLife: 0.6,
          size: 0.08,
          gravity: 0.02,
          decay: 2.2,
          isTrail: true,
        });
      }

      // Check if rocket reached apex target height
      if (rocket.y >= rocket.targetY) {
        detonateSkyShot([rocket.x, rocket.y, rocket.z], rocket.type, rocket.color, rocket.count);
        rockets.current.splice(r, 1);
      }
    }

    // =========================================================================
    // UPDATE EXPLOSION PARTICLES & GEOMETRY BUFFERS
    // =========================================================================
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

    // Zero out unused slots
    for (let i = activeCount; i < maxParticles; i++) {
      pArray[i * 3 + 1] = -999;
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
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
