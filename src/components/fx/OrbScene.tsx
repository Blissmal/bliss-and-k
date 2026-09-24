"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group } from "three";

const GAP = 3.4;

/*
 * Redesigned floating objects — "Synaptic" style reference (see original-*.webp):
 * deep-violet chrome spheres with a bright specular streak, an iridescent
 * liquid-metal swirl inside, and thin glowing orbital rings on some orbs.
 */
const ORBS = [
  { r: 1.7, x: 2.4,  shell: "#2d1d55", swirl: "#6a4cff", ring: "#ff8a36", ringTilt: 0.5,  frost: false },
  { r: 0.55, x: -3.6, shell: "#372675", swirl: "#ffb070", ring: null,      ringTilt: 0,    frost: false },
  { r: 1.3, x: -2.8, shell: "#4f369c", swirl: "#ff6b8a", ring: "#ada0f5", ringTilt: -0.6, frost: true },
  { r: 1.5, x: 2.9,  shell: "#2d1d55", swirl: "#8b6dff", ring: "#ffb070", ringTilt: 0.9,  frost: false },
  { r: 0.9, x: -1.6, shell: "#402a87", swirl: "#ff8a36", ring: null,      ringTilt: 0,    frost: true },
  { r: 1.6, x: 2.2,  shell: "#312261", swirl: "#ff6b8a", ring: "#ffffff", ringTilt: -0.4, frost: false },
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
  const ring = useRef<Group>(null);
  useFrame((_, dt) => {
    if (reduce) return;
    if (g.current) g.current.rotation.y += dt * 0.25;
    if (ring.current) ring.current.rotation.z += dt * 0.15;
  });
  return (
    <Float speed={reduce ? 0 : 1.2} floatIntensity={0.8} rotationIntensity={0.3} position={[o.x, -i * GAP, i % 2 ? 0.5 : -0.5]}>
      <group ref={g}>
        {/* Chrome-liquid shell: darker tint so the white specular streak pops,
            iridescence for the oil-slick rainbow edge from the reference. */}
        <mesh scale={o.r}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial
            color={o.shell}
            metalness={0.35}
            transmission={0.85}
            thickness={1.6}
            ior={1.4}
            roughness={o.frost ? 0.35 : 0.05}
            iridescence={1}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[120, 480]}
            attenuationColor={o.shell}
            attenuationDistance={1.6}
            envMapIntensity={2.2}
            clearcoat={1}
            clearcoatRoughness={0.06}
          />
        </mesh>

        {/* Liquid-metal swirl core — chrome torus knot tinted per orb. */}
        <mesh scale={o.r * 0.55} position={[0.1 * o.r, -0.08 * o.r, 0]}>
          <torusKnotGeometry args={[1, 0.34, 256, 32]} />
          <meshPhysicalMaterial
            color={o.swirl}
            metalness={1}
            roughness={0.12}
            iridescence={0.8}
            iridescenceThicknessRange={[100, 400]}
            emissive={o.swirl}
            emissiveIntensity={0.25}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Thin glowing orbital ring (Synaptic ringed-sphere look). */}
        {o.ring && (
          <group ref={ring} rotation={[Math.PI / 2.4, 0, o.ringTilt]}>
            <mesh scale={o.r * 1.45}>
              <torusGeometry args={[1, 0.018, 16, 128]} />
              <meshBasicMaterial color={o.ring} />
            </mesh>
          </group>
        )}
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
        {/*
         * Studio rig matching the reference lighting:
         * hard white key light above for the chrome specular streak,
         * warm orange kicker left, violet fill right, magenta rim behind.
         */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={8} color="#ffffff" position={[0, 6, 2]} scale={[4, 2, 1]} />
          <Lightformer form="rect" intensity={5} color="#ff8a36" position={[-6, 1, 2]} scale={[5, 3, 1]} />
          <Lightformer form="rect" intensity={5} color="#6a4cff" position={[6, -1, 3]} scale={[6, 4, 1]} />
          <Lightformer form="rect" intensity={3} color="#ff6b8a" position={[0, -5, -2]} scale={[5, 2, 1]} />
          <Lightformer form="ring" intensity={4} color="#ffffff" position={[0, 5, -4]} scale={4} />
        </Environment>
        <Rig progress={progress} reduce={reduce} />
        {ORBS.map((_, i) => (
          <Orb key={i} i={i} reduce={reduce} />
        ))}
      </Canvas>
    </div>
  );
}
