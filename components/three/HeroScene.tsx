"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type ProgressRef = { current: { value: number } };

const PANE_COUNT_DESKTOP = 14;
const PANE_COUNT_MOBILE = 8;

function Pane({
  position,
  rotation,
  scale,
  speed,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <planeGeometry args={[1.4, 2.1, 24, 24]} />
        <MeshDistortMaterial
          color="#C9A24B"
          transparent
          opacity={0.14}
          roughness={0.15}
          metalness={0.6}
          distort={0.18}
          speed={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function Scene({ progressRef, mobile }: { progressRef: ProgressRef; mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);

  const count = mobile ? PANE_COUNT_MOBILE : PANE_COUNT_DESKTOP;

  const panes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.4 + (i % 3) * 0.9;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(i * 1.7) * 1.6,
          Math.sin(angle) * radius - 1,
        ] as [number, number, number],
        rotation: [i * 0.3, i * 0.5, i * 0.2] as [number, number, number],
        scale: 0.55 + (i % 4) * 0.18,
        speed: 0.6 + (i % 5) * 0.25,
      };
    });
  }, [count]);

  useFrame((state, delta) => {
    const progress = progressRef.current.value;
    if (group.current) {
      group.current.rotation.y += delta * 0.05;
      group.current.position.z = THREE.MathUtils.lerp(0, -6, progress);
      group.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.82, progress));
    }
    const camZ = THREE.MathUtils.lerp(6.2, 9.5, progress);
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      camZ,
      0.06
    );
    state.camera.lookAt(0, 0, 0);
    if (light.current) {
      light.current.intensity = THREE.MathUtils.lerp(18, 4, progress);
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight ref={light} position={[3, 2, 4]} intensity={18} color="#C9A24B" />
      <pointLight position={[-4, -2, -3]} intensity={4} color="#4A3A1A" />
      <Environment preset="city" />
      <group ref={group}>
        {panes.map((p, i) => (
          <Pane key={i} {...p} />
        ))}
      </group>
    </>
  );
}

export default function HeroScene({
  progressRef,
  mobile = false,
}: {
  progressRef: ProgressRef;
  mobile?: boolean;
}) {
  return (
    <Canvas
      dpr={mobile ? [1, 1.4] : [1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      className="!absolute inset-0"
    >
      <Scene progressRef={progressRef} mobile={mobile} />
    </Canvas>
  );
}
