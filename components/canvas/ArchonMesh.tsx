"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AgentSwarm() {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);

  const agents = [
    { name: "PLANNER", pos: [0, 1.4, 0], color: "#00E5FF" },
    { name: "EXECUTOR", pos: [1.3, -0.6, 0.7], color: "#FF4D00" },
    { name: "CRITIC", pos: [-1.3, -0.6, 0.7], color: "#22C55E" },
    { name: "SANDBOX VERIFIER", pos: [0, -0.8, -1.2], color: "#A855F7" },
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = state.pointer.x * 0.3;
    const my = state.pointer.y * 0.3;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2 + mx;
      groupRef.current.rotation.x = 0.15 - my;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Consensus Core Octahedron */}
      <mesh>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#161822"
          emissive="#00E5FF"
          emissiveIntensity={0.4}
          wireframe={true}
        />
      </mesh>

      {/* Orbiting Agent Cluster Nodes */}
      {agents.map((agent, i) => (
        <group key={i} position={agent.pos as [number, number, number]}>
          <mesh>
            <dodecahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial
              color={agent.color}
              emissive={agent.color}
              emissiveIntensity={0.8}
            />
          </mesh>
          {/* Node halo ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.3, 0.34, 24]} />
            <meshBasicMaterial color={agent.color} transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* Swarm Communication Wireframe Tetrahedron */}
      <mesh>
        <tetrahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color="#374151" wireframe={true} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function ArchonMesh() {
  return (
    <div className="w-full h-full min-h-[360px] relative rounded-xl overflow-hidden hairline-border bg-surface/50">
      <div className="absolute top-4 left-4 z-10 font-mono text-[11px] tracking-widest text-text-muted flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
        MULTI-AGENT CONSENSUS SWARM
      </div>
      <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={1.2} />
        <pointLight position={[0, 1.4, 2]} intensity={1} color="#00E5FF" />
        <pointLight position={[1.3, -0.6, 2]} intensity={1} color="#FF4D00" />
        <AgentSwarm />
      </Canvas>
      <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] text-text-muted bg-background/80 px-2 py-1 border border-border">
        STATE GRAPH + RECURSIVE VERIFICATION
      </div>
    </div>
  );
}
