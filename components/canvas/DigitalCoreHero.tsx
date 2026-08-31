"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DigitalCore() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const coreIcoRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate particle cloud around core
  const [particlePositions, particleColors] = useMemo(() => {
    const count = 360;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const baseColor = new THREE.Color("#FF4D00");
    const cyanColor = new THREE.Color("#00E5FF");
    const whiteColor = new THREE.Color("#FFFFFF");

    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mix = Math.random();
      const col = mix < 0.25 ? baseColor : mix < 0.5 ? cyanColor : whiteColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.4;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, t * 0.15 + mouseX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, t * 0.08 - mouseY, 0.05);
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.2;
      outerRingRef.current.rotation.y = t * 0.3;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -t * 0.4;
      innerRingRef.current.rotation.z = t * 0.25;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.z = t * 0.35;
      midRingRef.current.rotation.x = -t * 0.18;
    }
    if (coreIcoRef.current) {
      coreIcoRef.current.rotation.y = t * 0.5;
      coreIcoRef.current.rotation.x = t * 0.25;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -t * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Icosahedron Core */}
      <mesh ref={coreIcoRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#16181F"
          emissive="#FF4D00"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.9}
          wireframe={true}
        />
      </mesh>

      {/* Inner Dense Solid Facet */}
      <mesh>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#0B0C0E"
          emissive="#00E5FF"
          emissiveIntensity={0.25}
          roughness={0.3}
          metalness={0.95}
        />
      </mesh>

      {/* Middle Torus Ring */}
      <mesh ref={midRingRef}>
        <torusGeometry args={[2.0, 0.02, 16, 100]} />
        <meshStandardMaterial color="#FF4D00" emissive="#FF4D00" emissiveIntensity={0.6} />
      </mesh>

      {/* Outer Torus Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.8, 0.015, 16, 120]} />
        <meshStandardMaterial color="#EDEDE8" emissive="#EDEDE8" emissiveIntensity={0.4} />
      </mesh>

      {/* Cross Diagonal Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[3.4, 0.012, 16, 120]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.5} />
      </mesh>

      {/* Surrounding Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleColors.length / 3}
            array={particleColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.035} vertexColors transparent opacity={0.75} sizeAttenuation={true} />
      </points>
    </group>
  );
}

export default function DigitalCoreHero() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none opacity-80 z-0">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#FFFFFF" />
        <pointLight position={[-8, -8, -5]} intensity={0.8} color="#FF4D00" />
        <pointLight position={[5, -5, 5]} intensity={0.6} color="#00E5FF" />
        <DigitalCore />
      </Canvas>
    </div>
  );
}
