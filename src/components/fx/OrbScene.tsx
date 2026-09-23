"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group } from "three";

const GAP = 3.4;
const ORBS = [
  { r: 1.7, x: 2.4, core: "#ff8a36", shell: "#8b6dff", frost: false },
  { r: 0.55, x: -3.6, core: "#ffb070", shell: "#ada0f5", frost: false },
  { r: 1.3, x: -2.8, core: "#6a4cff", shell: "#ffb070", frost: true },
  { r: 1.5, x: 2.9, core: "#ff6b8a", shell: "#8b6dff", frost: false },
  { r: 0.9, x: -1.6, core: "#ff8a36", shell: "#ada0f5", frost: true },
  { r: 1.6, x: 2.2, core: "#6a4cff", shell: "#ffb070", frost: false },
];

function Rig({ progress, reduce }: { progress: React.MutableRefObject<number>; reduce: boolean }) {
  useFrame((state, dt) => {
    const targetY = -progress.current * (ORBS.length - 1) * GAP;
    const k = 1 - Math.pow(0.001, dt);
    state.camera.position.y += (targetY - state.camera.position.y) * k;
    if (!reduce) {
      state.camera.position.x += (state.pointer.x * 0.5 - state.camera.position.x) * k;
    }
    state.camera.lookAt(state.camera.position.x * 0.2, state.camera.position.y, 0);
  });
  return null;
}

function Orb({ i, reduce }: { i: number; reduce: boolean }) {
  const o = ORBS[i];
  const g = useRef<Group>(null);
  useFrame((_, dt) => {
    if (g.current && !reduce) g.current.rotation.y += dt * 0.25;
  });
  return (
    <Float speed={reduce ? 0 : 1.2} floatIntensity={0.8} rotationIntensity={0.3} position={[o.x, -i * GAP, i % 2 ? 0.5 : -0.5]}>
      <group ref={g}>
        <mesh scale={o.r}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial
            color={o.shell}
            transmission={1}
            thickness={1.4}
            ior={1.35}
            roughness={o.frost ? 0.55 : 0.04}
            iridescence={1}
            attenuationColor={o.shell}
            attenuationDistance={2.5}
            envMapIntensity={1.6}
          />
        </mesh>
        <mesh scale={o.r * 0.6} position={[0.12 * o.r, -0.1 * o.r, 0]}>
          <torusKnotGeometry args={[1, 0.38, 128, 16]} />
          <meshBasicMaterial color={o.core} />
        </mesh>
      </group>
    </Float>
  );
}

export default function OrbScene() {
  const progress = useRef(0);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      document.documentElement.style.setProperty("--p", progress.current.toFixed(3));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 32 }} gl={{ alpha: true, antialias: true }}>
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={5} color="#ffb070" position={[-5, 2, 2]} scale={[6, 3, 1]} />
          <Lightformer form="rect" intensity={4} color="#8b6dff" position={[5, -2, 3]} scale={[6, 4, 1]} />
          <Lightformer form="ring" intensity={3} color="#ffffff" position={[0, 5, -3]} scale={4} />
        </Environment>
        <Rig progress={progress} reduce={reduce} />
        {ORBS.map((_, i) => (
          <Orb key={i} i={i} reduce={reduce} />
        ))}
      </Canvas>
    </div>
  );
}
