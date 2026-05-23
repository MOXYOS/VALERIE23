"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function PremiumPlaceholderShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 64]} />
        <MeshDistortMaterial 
          color="#D8C1A0" 
          emissive="#2A1B0B"
          emissiveIntensity={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.2}
          distort={0.3}
          speed={1.5}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export function ThreeViewer() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#FAF8F5" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#C6A77B" />
        
        {/* Soft elegant placeholder */}
        <PremiumPlaceholderShape />

        {/* Controls for 360 viewer */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.2}
        />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
