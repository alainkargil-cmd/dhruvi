import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { soundManager } from '../utils/soundEffects';

interface LibraryArchitectureProps {
  lampOn: boolean;
  onToggleLamp: () => void;
  secretDrawerOpen: boolean;
  onToggleSecretDrawer: () => void;
  secretBookOpen: boolean;
  onToggleSecretBook: () => void;
  onSpinGlobe: () => void;
  globeRotation: number;
}

export const LibraryArchitecture: React.FC<LibraryArchitectureProps> = ({
  lampOn,
  onToggleLamp,
  secretDrawerOpen,
  onToggleSecretDrawer,
  secretBookOpen,
  onToggleSecretBook,
  onSpinGlobe,
  globeRotation,
}) => {
  const globeRef = useRef<THREE.Group>(null);
  const drawerRef = useRef<THREE.Group>(null);
  const lampLightRef = useRef<THREE.PointLight>(null);
  const [globeHover, setGlobeHover] = useState(false);
  const [drawerHover, setDrawerHover] = useState(false);
  const [lampHover, setLampHover] = useState(false);
  const [secretBookHover, setSecretBookHover] = useState(false);

  useFrame(() => {
    // Globe continuous or interactive rotation
    if (globeRef.current) {
      globeRef.current.rotation.y = THREE.MathUtils.lerp(
        globeRef.current.rotation.y,
        globeRotation,
        0.08
      );
    }
    // Drawer smooth sliding
    if (drawerRef.current) {
      const targetZ = secretDrawerOpen ? 0.35 : 0;
      drawerRef.current.position.z = THREE.MathUtils.lerp(
        drawerRef.current.position.z,
        targetZ,
        0.1
      );
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Grand Polished Honey Oak Parquet Floor */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial
          color="#D4B38C" // Light Warm Honey Oak Parquet
          roughness={0.25}
          metalness={0.15}
        />
      </mesh>

      {/* Decorative Floor Inlay Rings */}
      <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.8, 5.0, 48]} />
        <meshStandardMaterial
          color="#E5C158"
          metalness={0.85}
          roughness={0.2}
          emissive="#D4AF37"
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.8, 8.0, 48]} />
        <meshStandardMaterial
          color="#E5C158"
          metalness={0.85}
          roughness={0.2}
          emissive="#D4AF37"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* 2. Back Grand Bookshelf Wall (Light Neoclassical Ivory Woodwork) */}
      <group position={[0, 4.5, -6.5]}>
        {/* Main Bookshelf Frame */}
        <mesh>
          <boxGeometry args={[14, 9, 1.2]} />
          <meshStandardMaterial color="#EFE7DA" roughness={0.35} />
        </mesh>

        {/* Vertical Partition Pillars */}
        {[-5, -2.5, 0, 2.5, 5].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.65]}>
            <boxGeometry args={[0.3, 9.2, 0.2]} />
            <meshStandardMaterial
              color="#DECEBB"
              roughness={0.35}
              metalness={0.2}
            />
          </mesh>
        ))}

        {/* Horizontal Shelves */}
        {[-3, -1.5, 0, 1.5, 3].map((y, i) => (
          <mesh key={i} position={[0, y, 0.4]}>
            <boxGeometry args={[13.8, 0.15, 0.8]} />
            <meshStandardMaterial
              color="#E2D4C3"
              roughness={0.38}
            />
          </mesh>
        ))}

        {/* Books rows filling shelves */}
        {[-3, -1.5, 0, 1.5, 3].map((y, rowIdx) =>
          [-5, -3, -1, 1, 3, 5].map((sectionX, colIdx) => (
            <mesh
              key={`${rowIdx}-${colIdx}`}
              position={[sectionX + 0.8, y + 0.5, 0.4]}
            >
              <boxGeometry args={[1.5, 0.85, 0.6]} />
              <meshStandardMaterial
                color={
                  (rowIdx + colIdx) % 3 === 0
                    ? '#4E2A1E'
                    : (rowIdx + colIdx) % 3 === 1
                    ? '#58111A'
                    : '#26160F'
                }
                roughness={0.7}
              />
            </mesh>
          ))
        )}

        {/* The Hidden Glowing Book on shelf (Interactive) */}
        <group
          position={[0, 0.5, 0.65]}
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playPageTurn();
            onToggleSecretBook();
          }}
          onPointerOver={() => {
            setSecretBookHover(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setSecretBookHover(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <mesh>
            <boxGeometry args={[0.3, 0.9, 0.55]} />
            <meshStandardMaterial
              color="#FFE494"
              emissive="#E5C158"
              emissiveIntensity={secretBookHover ? 1.5 : 0.8}
            />
          </mesh>
          <pointLight color="#FFE494" distance={2} intensity={secretBookHover ? 2 : 1} />
        </group>
      </group>

      {/* 3. Left Bookshelf Wall with Arched Window (Light Ivory Woodwork) */}
      <group position={[-7.5, 4.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[13, 9, 1.2]} />
          <meshStandardMaterial color="#EFE7DA" roughness={0.35} />
        </mesh>
        {/* Arched Window in Center */}
        <mesh position={[0, 1.5, 0.62]}>
          <planeGeometry args={[3.2, 5]} />
          <meshStandardMaterial
            color="#FFF8EE"
            emissive="#FFEAB2"
            emissiveIntensity={0.8}
            roughness={0.15}
          />
        </mesh>
        {/* Window Mullions / Arches */}
        <mesh position={[0, 1.5, 0.65]}>
          <boxGeometry args={[0.1, 5, 0.05]} />
          <meshStandardMaterial color="#CBB8A2" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.5, 0.65]}>
          <boxGeometry args={[3.2, 0.1, 0.05]} />
          <meshStandardMaterial color="#CBB8A2" roughness={0.4} />
        </mesh>
      </group>

      {/* 4. Right Bookshelf Wall (Light Ivory Woodwork) */}
      <group position={[7.5, 4.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[13, 9, 1.2]} />
          <meshStandardMaterial color="#EFE7DA" roughness={0.35} />
        </mesh>
        {/* Books on right wall */}
        {[-2, 0, 2].map((y, i) => (
          <mesh key={i} position={[0, y, 0.4]}>
            <boxGeometry args={[11, 0.85, 0.6]} />
            <meshStandardMaterial color="#E0D2C0" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* 5. Antique Reading Desk (Warm Caramel Oak with Gold Accents) */}
      <group position={[2.8, 0, -1.8]}>
        {/* Desk Top */}
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[2.8, 0.12, 1.6]} />
          <meshStandardMaterial color="#C89D6D" roughness={0.25} metalness={0.1} />
        </mesh>
        {/* Desk Legs */}
        {[-1.2, 1.2].map((x, xi) =>
          [-0.65, 0.65].map((z, zi) => (
            <mesh key={`${xi}-${zi}`} position={[x, 0.7, z]}>
              <cylinderGeometry args={[0.07, 0.05, 1.35, 12]} />
              <meshStandardMaterial color="#B08354" roughness={0.35} />
            </mesh>
          ))
        )}

        {/* Secret Drawer (Interactive) */}
        <group
          ref={drawerRef}
          position={[-0.7, 1.2, 0.4]}
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playPageTurn();
            onToggleSecretDrawer();
          }}
          onPointerOver={() => {
            setDrawerHover(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setDrawerHover(false);
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Drawer Box */}
          <mesh>
            <boxGeometry args={[0.8, 0.22, 0.6]} />
            <meshStandardMaterial
              color={drawerHover ? '#4E2A1E' : '#2C1810'}
              roughness={0.4}
            />
          </mesh>
          {/* Brass Handle */}
          <mesh position={[0, 0, 0.32]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.04, 0.015, 8, 16]} />
            <meshStandardMaterial
              color="#E5C158"
              metalness={0.8}
              roughness={0.2}
              emissive="#FFE494"
              emissiveIntensity={drawerHover ? 0.8 : 0.2}
            />
          </mesh>
        </group>

        {/* Enchanted Banker's Lamp on Desk (Interactive) */}
        <group
          position={[0.8, 1.5, -0.3]}
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playGiftOpen();
            onToggleLamp();
          }}
          onPointerOver={() => {
            setLampHover(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setLampHover(false);
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Brass Stand */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.025, 0.1, 0.4, 12]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Emerald / Amber Shade */}
          <mesh position={[0, 0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.12, 0.35, 16, 1, false, 0, Math.PI]} />
            <meshStandardMaterial
              color={lampOn ? '#FFA733' : '#4E2A1E'}
              emissive={lampOn ? '#FFCC80' : '#000'}
              emissiveIntensity={lampOn ? 1.2 : 0}
              roughness={0.2}
            />
          </mesh>
          {/* Lamp Light */}
          <pointLight
            ref={lampLightRef}
            position={[0, 0.38, 0]}
            color="#FFCC80"
            distance={4}
            intensity={lampOn ? 2.8 : 0.1}
          />
        </group>

        {/* Interactive Brass Globe on Desk */}
        <group
          ref={globeRef}
          position={[-0.8, 1.5, -0.3]}
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playGiftOpen();
            onSpinGlobe();
          }}
          onPointerOver={() => {
            setGlobeHover(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setGlobeHover(false);
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Brass Stand */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.02, 0.1, 0.3, 12]} />
            <meshStandardMaterial color="#E5C158" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Brass Meridian Ring */}
          <mesh position={[0, 0.35, 0]} rotation={[0.4, 0, 0]}>
            <torusGeometry args={[0.22, 0.015, 8, 24]} />
            <meshStandardMaterial color="#E5C158" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Earth Sphere */}
          <mesh position={[0, 0.35, 0]}>
            <sphereGeometry args={[0.18, 24, 24]} />
            <meshStandardMaterial
              color={globeHover ? '#675A77' : '#3B2219'}
              roughness={0.4}
              metalness={0.2}
              emissive={globeHover ? '#FFE494' : '#000'}
              emissiveIntensity={globeHover ? 0.3 : 0}
            />
          </mesh>
        </group>
      </group>

      {/* 6. Grand Hanging Chandelier in Center */}
      <group position={[0, 7.2, 0]}>
        {/* Chain */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.6, 8]} />
          <meshStandardMaterial color="#B89738" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Chandelier Ring */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.8, 0.08, 12, 32]} />
          <meshStandardMaterial
            color="#E5C158"
            metalness={0.85}
            roughness={0.2}
            emissive="#D4AF37"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Hanging Crystal Prisms */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.8, -0.3, Math.sin(angle) * 1.8]}
            >
              <coneGeometry args={[0.08, 0.5, 6]} />
              <meshStandardMaterial
                color="#FFF"
                emissive="#FFE494"
                emissiveIntensity={0.4}
                roughness={0.1}
                metalness={0.8}
              />
            </mesh>
          );
        })}
        {/* Warm Chandelier Point Light */}
        <pointLight color="#FFE494" distance={18} intensity={3.4} />
      </group>

      {/* Warm Ambient Sunlight Stream from Left Window */}
      <directionalLight
        position={[-12, 10, -3]}
        color="#FFF2CC"
        intensity={2.2}
        castShadow
      />
      {/* Soft Warm Fill Light */}
      <directionalLight
        position={[10, 8, 6]}
        color="#FFDDBB"
        intensity={1.2}
      />
      {/* Luminous Ambient Light */}
      <ambientLight color="#FFF0DF" intensity={1.55} />
    </group>
  );
};
