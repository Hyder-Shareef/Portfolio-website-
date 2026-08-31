"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PlanetarySphere() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Generate AQI & telemetry nodes on sphere surface
  const [nodePositions, arcPointsList] = useMemo(() => {
    const radius = 1.6;
    const count = 40;
    const positions = new Float32Array(count * 3);

    const generatedCoords: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const lat = (Math.random() - 0.5) * Math.PI;
      const lon = Math.random() * Math.PI * 2;
      const x = radius * Math.cos(lat) * Math.cos(lon);
      const y = radius * Math.sin(lat);
      const z = radius * Math.cos(lat) * Math.sin(lon);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      generatedCoords.push(new THREE.Vector3(x, y, z));
    }

    // Generate 6 flight trajectory arcs between nodes
    const arcs: THREE.Vector3[][] = [];
    for (let i = 0; i < 6; i++) {
      const start = generatedCoords[i * 5];
      const end = generatedCoords[i * 5 + 3];
      if (start && end) {
        const mid = start.clone().add(end).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(radius * 1.35); // arc height
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        arcs.push(curve.getPoints(24));
      }
    }

    return [positions, arcs];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = state.pointer.x * 0.4;
    const my = state.pointer.y * 0.4;

    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y = t * 0.15 + mx;
      globeGroupRef.current.rotation.x = 0.2 + my * 0.5;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* Core Planet Sphere */}
      <mesh>
        <sphereGeometry args={[1.58, 32, 32]} />
        <meshStandardMaterial
          color="#0C1017"
          roughness={0.8}
          metalness={0.3}
          wireframe={true}
        />
      </mesh>

      {/* Outer Atmosphere Glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.65, 32, 32]} />
        <meshStandardMaterial
          color="#00E5FF"
          transparent
          opacity={0.12}
          wireframe={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Latitudinal Orbital Ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.9, 0.01, 16, 80]} />
        <meshBasicMaterial color="#FF4D00" transparent opacity={0.4} />
      </mesh>

      {/* Sensor / AQI Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#00E5FF" sizeAttenuation={true} />
      </points>

      {/* Flight Trajectory Bezier Arcs */}
      {arcPointsList.map((pts, idx) => {
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <primitive key={idx} object={new THREE.Line(lineGeo, new THREE.LineBasicMaterial({
            color: idx % 2 === 0 ? "#FF4D00" : "#00E5FF",
            transparent: true,
            opacity: 0.6,
          }))} />
        );
      })}
    </group>
  );
}

export default function OmnisGlobe() {
  return (
    <div className="w-full h-full min-h-[360px] relative rounded-xl overflow-hidden hairline-border bg-surface/50">
      <div className="absolute top-4 left-4 z-10 font-mono text-[11px] tracking-widest text-text-muted flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
        LIVE GLOBAL TELEMETRY / AQI + TRAFFIC
      </div>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} />
        <pointLight position={[-4, -3, -2]} intensity={0.8} color="#FF4D00" />
        <PlanetarySphere />
      </Canvas>
      <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] text-text-muted bg-background/80 px-2 py-1 border border-border">
        GEOJSON + SPATIAL WEBSOCKETS
      </div>
    </div>
  );
}
