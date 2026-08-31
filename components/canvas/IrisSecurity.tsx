"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SecurityTopology() {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  const { nodeCoords, lineSegments } = useMemo(() => {
    const coords = [
      new THREE.Vector3(0, 0, 0),       // Central SOC Gateway
      new THREE.Vector3(-1.2, 0.8, 0.3),  // Subnet A
      new THREE.Vector3(1.3, 0.7, -0.2),  // Subnet B
      new THREE.Vector3(-1.4, -0.9, -0.1),// Subnet C
      new THREE.Vector3(1.1, -0.8, 0.4),  // Subnet D (Compromised/Threat node)
      new THREE.Vector3(-0.2, 1.4, -0.3), // Firewall Ingress
      new THREE.Vector3(0.3, -1.5, 0.2),  // Database Cluster
      new THREE.Vector3(-1.9, 0.1, 0.5),  // Edge Endpoint 1
      new THREE.Vector3(1.8, 0.2, -0.4),  // Edge Endpoint 2
    ];

    const lines: THREE.Vector3[][] = [
      [coords[0], coords[1]],
      [coords[0], coords[2]],
      [coords[0], coords[3]],
      [coords[0], coords[4]],
      [coords[0], coords[5]],
      [coords[0], coords[6]],
      [coords[1], coords[7]],
      [coords[2], coords[8]],
      [coords[1], coords[5]],
      [coords[3], coords[6]],
      [coords[4], coords[6]],
    ];

    return { nodeCoords: coords, lineSegments: lines };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = state.pointer.x * 0.3;
    const my = state.pointer.y * 0.3;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18 + mx;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1 - my;
    }

    if (pulseRingRef.current) {
      const scale = 1 + (t % 1.8) * 1.5;
      pulseRingRef.current.scale.set(scale, scale, scale);
      const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
      if (mat) mat.opacity = Math.max(0, 1 - (t % 1.8) / 1.8);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Threat Isolation Pulse */}
      <mesh ref={pulseRingRef} position={[1.1, -0.8, 0.4]}>
        <ringGeometry args={[0.2, 0.25, 32]} />
        <meshBasicMaterial color="#FF4D00" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Network Nodes */}
      {nodeCoords.map((pos, idx) => {
        const isThreat = idx === 4;
        const isCenter = idx === 0;
        return (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[isCenter ? 0.18 : isThreat ? 0.14 : 0.1, 16, 16]} />
            <meshStandardMaterial
              color={isThreat ? "#FF4D00" : isCenter ? "#00E5FF" : "#EDEDE8"}
              emissive={isThreat ? "#FF4D00" : isCenter ? "#00E5FF" : "#1A1B20"}
              emissiveIntensity={isThreat ? 0.9 : 0.6}
            />
          </mesh>
        );
      })}

      {/* Connection Links */}
      {lineSegments.map((pts, idx) => {
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const isThreatLink = idx === 3 || idx === 10;
        return (
          <primitive
            key={idx}
            object={
              new THREE.Line(
                geo,
                new THREE.LineBasicMaterial({
                  color: isThreatLink ? "#FF4D00" : "#4A5568",
                  transparent: true,
                  opacity: isThreatLink ? 0.9 : 0.4,
                  linewidth: 1,
                })
              )
            }
          />
        );
      })}
    </group>
  );
}

export default function IrisSecurity() {
  return (
    <div className="w-full h-full min-h-[360px] relative rounded-xl overflow-hidden hairline-border bg-surface/50">
      <div className="absolute top-4 left-4 z-10 font-mono text-[11px] tracking-widest text-text-muted flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
        AI INTRUSION ISOLATION TOPOLOGY
      </div>
      <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={1.2} />
        <pointLight position={[1.1, -0.8, 1]} intensity={1.2} color="#FF4D00" />
        <SecurityTopology />
      </Canvas>
      <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] text-text-muted bg-background/80 px-2 py-1 border border-border">
        PACKET ANOMALY / AUTO QUARANTINE
      </div>
    </div>
  );
}
