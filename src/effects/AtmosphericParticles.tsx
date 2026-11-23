import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphericParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  area?: [number, number, number];
}

export const AtmosphericParticles: React.FC<AtmosphericParticlesProps> = ({
  count = 180,
  color = '#FFE494',
  size = 0.05,
  area = [18, 12, 18],
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * area[0];
      pos[i * 3 + 1] = Math.random() * area[1];
      pos[i * 3 + 2] = (Math.random() - 0.5) * area[2];

      spd[i * 3] = (Math.random() - 0.5) * 0.005;
      spd[i * 3 + 1] = 0.002 + Math.random() * 0.006;
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, spd];
  }, [count, area]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += speeds[i * 3 + 1];
      array[i * 3] += speeds[i * 3];
      array[i * 3 + 2] += speeds[i * 3 + 2];

      // Wrap around boundaries
      if (array[i * 3 + 1] > area[1]) {
        array[i * 3 + 1] = 0;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
