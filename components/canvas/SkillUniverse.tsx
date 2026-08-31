"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { skillsGraph, SkillNode } from "@/data/skills";

interface ConstellationProps {
  selectedCategory: string;
  onSelectNode: (node: SkillNode | null) => void;
  activeNodeId: string | null;
}

function ConstellationMesh({ selectedCategory, onSelectNode, activeNodeId }: ConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Position nodes in spherical/ellipsoid coordinates
  const { nodeData, connectionLines } = useMemo(() => {
    const total = skillsGraph.length;
    const positions: { node: SkillNode; pos: THREE.Vector3 }[] = [];

    skillsGraph.forEach((node, i) => {
      // Golden spiral distribution on sphere
      const phi = Math.acos(-1 + (2 * i) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      const radius = 2.4;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions.push({ node, pos: new THREE.Vector3(x, y, z) });
    });

    // Compute lines between connected nodes
    const lines: { start: THREE.Vector3; end: THREE.Vector3; id1: string; id2: string }[] = [];
    positions.forEach((p1) => {
      p1.node.connections.forEach((targetId) => {
        const p2 = positions.find((p) => p.node.id === targetId);
        if (p2 && p1.node.id < p2.node.id) {
          lines.push({
            start: p1.pos,
            end: p2.pos,
            id1: p1.node.id,
            id2: p2.node.id,
          });
        }
      });
    });

    return { nodeData: positions, connectionLines: lines };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = state.pointer.x * 0.3;
    const my = state.pointer.y * 0.3;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08 + mx;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1 - my;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central glow aura */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#FF4D00" transparent opacity={0.06} />
      </mesh>

      {/* Nodes */}
      {nodeData.map(({ node, pos }) => {
        const isMatched = selectedCategory === "ALL" || node.category === selectedCategory;
        const isHovered = hoveredId === node.id;
        const isSelected = activeNodeId === node.id;

        const size = isHovered || isSelected ? 0.16 : 0.09;
        const opacity = isMatched ? (isHovered || isSelected ? 1 : 0.85) : 0.2;

        return (
          <group
            key={node.id}
            position={pos}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredId(node.id);
            }}
            onPointerOut={() => setHoveredId(null)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(node);
            }}
          >
            <mesh>
              <sphereGeometry args={[size, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isHovered || isSelected ? 1.2 : 0.5}
                transparent
                opacity={opacity}
              />
            </mesh>
            {(isHovered || isSelected) && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.2, 0.24, 24]} />
                <meshBasicMaterial color={node.color} side={THREE.DoubleSide} transparent opacity={0.8} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Connection Edges */}
      {connectionLines.map((line, idx) => {
        const isConnectedToHovered =
          hoveredId === line.id1 || hoveredId === line.id2 || activeNodeId === line.id1 || activeNodeId === line.id2;
        const geo = new THREE.BufferGeometry().setFromPoints([line.start, line.end]);

        return (
          <primitive
            key={idx}
            object={
              new THREE.Line(
                geo,
                new THREE.LineBasicMaterial({
                  color: isConnectedToHovered ? "#00E5FF" : "#2B303C",
                  transparent: true,
                  opacity: isConnectedToHovered ? 0.9 : 0.35,
                  linewidth: isConnectedToHovered ? 2 : 1,
                })
              )
            }
          />
        );
      })}
    </group>
  );
}

export default function SkillUniverse({
  selectedCategory,
  onSelectNode,
  activeNodeId,
}: {
  selectedCategory: string;
  onSelectNode: (node: SkillNode | null) => void;
  activeNodeId: string | null;
}) {
  return (
    <div className="w-full h-[340px] sm:h-[460px] md:h-[580px] relative rounded-2xl overflow-hidden hairline-border bg-surface/30">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 6, 6]} intensity={1.2} />
        <pointLight position={[-4, -4, -4]} intensity={0.8} color="#FF4D00" />
        <pointLight position={[4, -4, 4]} intensity={0.8} color="#00E5FF" />
        <ConstellationMesh
          selectedCategory={selectedCategory}
          onSelectNode={onSelectNode}
          activeNodeId={activeNodeId}
        />
      </Canvas>
    </div>
  );
}
