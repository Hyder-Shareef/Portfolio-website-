"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HeaultDocuments() {
  const groupRef = useRef<THREE.Group>(null);
  const scanLaserRef = useRef<THREE.Mesh>(null);
  const doc1Ref = useRef<THREE.Mesh>(null);
  const doc2Ref = useRef<THREE.Mesh>(null);
  const doc3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = state.pointer.x * 0.3;
    const my = state.pointer.y * 0.3;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, t * 0.12 + mx, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.15 - my, 0.05);
    }

    // Scanning beam oscillation
    if (scanLaserRef.current) {
      scanLaserRef.current.position.y = Math.sin(t * 2) * 1.2;
    }

    // Gentle document hover float
    if (doc1Ref.current) doc1Ref.current.position.z = Math.sin(t * 1.5) * 0.1;
    if (doc2Ref.current) doc2Ref.current.position.z = 0.4 + Math.sin(t * 1.5 + 1) * 0.12;
    if (doc3Ref.current) doc3Ref.current.position.z = -0.4 + Math.sin(t * 1.5 + 2) * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base Document 1 */}
      <mesh ref={doc1Ref} position={[0, 0, 0]}>
        <planeGeometry args={[2.2, 3.0]} />
        <meshStandardMaterial
          color="#141720"
          roughness={0.4}
          metalness={0.8}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Foreground Translucent Layer 2 */}
      <mesh ref={doc2Ref} position={[0.2, 0.15, 0.4]} rotation={[0, 0.05, 0.02]}>
        <planeGeometry args={[2.0, 2.7]} />
        <meshStandardMaterial
          color="#00E5FF"
          wireframe={true}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Background Medical Chart Layer 3 */}
      <mesh ref={doc3Ref} position={[-0.2, -0.15, -0.4]} rotation={[0, -0.05, -0.02]}>
        <planeGeometry args={[2.1, 2.8]} />
        <meshStandardMaterial
          color="#FF4D00"
          wireframe={true}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Laser Scanning Beam */}
      <mesh ref={scanLaserRef} position={[0, 0, 0.55]}>
        <boxGeometry args={[2.6, 0.03, 0.05]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>

      {/* Extracted Data Nodes */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, (i - 1) * 0.7, 0.6]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={i === 1 ? "#FF4D00" : "#00E5FF"} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeaultScene() {
  return (
    <div className="w-full h-full min-h-[360px] relative rounded-xl overflow-hidden hairline-border bg-surface/50">
      <div className="absolute top-4 left-4 z-10 font-mono text-[11px] tracking-widest text-text-muted flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
        OCR INGESTION PIPELINE / ACTIVE
      </div>
      <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-4, 2, 3]} intensity={1} color="#00E5FF" />
        <pointLight position={[4, -2, -2]} intensity={0.8} color="#FF4D00" />
        <HeaultDocuments />
      </Canvas>
      <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] text-text-muted bg-background/80 px-2 py-1 border border-border">
        AZURE DOC INTELLIGENCE + LLM
      </div>
    </div>
  );
}
