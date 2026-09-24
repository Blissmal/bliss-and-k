"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";

const GAP = 3.4;

/*
 * Floating objects v3 — water-droplet glass (Dribbble "Synaptic" look).
 *
 * Workaround: drei's MeshTransmissionMaterial renders the scene behind each
 * orb into a buffer and genuinely REFRACTS it — so the droplets bend and
 * swirl the colored backdrop like real water, instead of faking transmission
 * with env maps. `distortion` + `temporalDistortion` add the liquid wobble,
 * `chromaticAberration` gives the glass rainbow fringing.
 */
const ORBS = [
  { r: 1.7, x: 2.4,  shell: "#8b6dff", swirl: "#ff8a36", ring: "#ffb070", ringTilt: 0.5,  frost: false },
  { r: 0.55, x: -3.6, shell: "#a78bfa", swirl: "#ffb070", ring: null,     ringTilt: 0,    frost: false },
  { r: 1.3, x: -2.8, shell: "#7c3aed", swirl: "#ff6b8a", ring: "#c4b5fd", ringTilt: -0.6, frost: true },
  { r: 1.5, x: 2.9,  shell: "#6a4cff", swirl: "#8b6dff", ring: "#ffb070", ringTilt: 0.9,  frost: false },
  { r: 0.9, x: -1.6, shell: "#9d7bff", swirl: "#ff8a36", ring: null,     ringTilt: 0,    frost: true },
  { r: 1.6, x: 2.2,  shell: "#5b3df0", swirl: "#ff6b8a", ring: "#e9d5ff", ringTilt: -0.4, frost: false },
];

/* Animated violet/pink/orange gradient backdrop — this is the "content"
 * the droplets refract and swirl. Rendered on a big plane far behind. */
function Backdrop() {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const ctx = c.getContext("2d")!;
    const blobs: [string, number, number, number][] = [
      ["#3b1e8f", 256, 220, 340],
      ["#6a4cff", 120, 140, 220],
      ["#ff6b8a", 400, 120, 180],
      ["#ff8a36", 380, 380, 160],
      ["#8b6dff", 110, 390, 200],
      ["#1e1040", 256, 500, 260],
    ];
    for (const [color, x, y, r] of blobs) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 512, 512);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = Math.sin(t * 0.05) * 0.2;
    tex.offset.x = Math.sin(t * 0.03) * 0.08;
    tex.offset.y = Math.cos(t * 0.04) * 0.08;
  });
  return (
    <mesh ref={ref} position={[0, -GAP * 2.5, -9]}>
      <planeGeometry args={[40, 60]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

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
        {/* Water-droplet shell — real refraction of whatever is behind it. */}
        <mesh scale={o.r}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial
            transmission={1}
            thickness={o.r * 0.9}
            ior={1.35}
            roughness={o.frost ? 0.35 : 0.05}
            chromaticAberration={0.06}
            anisotropicBlur={o.frost ? 0.6 : 0.15}
            distortion={0.5}
            distortionScale={0.6}
            temporalDistortion={0.12}
            color={o.shell}
            attenuationColor={o.shell}
            attenuationDistance={2.2}
            envMapIntensity={1.2}
            resolution={512}
            samples={6}
          />
        </mesh>

        {/* Molten core — seen through the droplet, its edges get bent by the
            refraction so it reads as the swirl inside the water. */}
        <mesh scale={o.r * 0.55} position={[0.1 * o.r, -0.08 * o.r, 0]}>
          <torusKnotGeometry args={[1, 0.34, 256, 32]} />
          <meshStandardMaterial
            color={o.swirl}
            metalness={0.9}
            roughness={0.15}
            emissive={o.swirl}
            emissiveIntensity={1.6}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Thin orbital ring + soft halo. */}
        {o.ring && (
          <group ref={ring} rotation={[Math.PI / 2.4, 0, o.ringTilt]}>
            <mesh scale={o.r * 1.5}>
              <torusGeometry args={[1, 0.012, 16, 128]} />
              <meshBasicMaterial color={o.ring} transparent opacity={0.85} />
            </mesh>
            <mesh scale={o.r * 1.5}>
              <torusGeometry args={[1, 0.05, 16, 128]} />
              <meshBasicMaterial color={o.ring} transparent opacity={0.12} />
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
      {/* alpha:true again — the gradient Backdrop provides the content the
          droplets refract, so no opaque canvas background is needed. */}
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 32 }} gl={{ alpha: true, antialias: true }}>
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={6} color="#ffffff" position={[0, 6, 4]} scale={[5, 3, 1]} />
          <Lightformer form="rect" intensity={4} color="#8b6dff" position={[-6, 0, 2]} scale={[6, 4, 1]} />
          <Lightformer form="rect" intensity={4} color="#a78bfa" position={[6, -1, 3]} scale={[6, 4, 1]} />
          <Lightformer form="rect" intensity={3} color="#ff8a36" position={[-4, -5, 1]} scale={[4, 2, 1]} />
          <Lightformer form="ring" intensity={3} color="#e9d5ff" position={[0, 4, -4]} scale={4} />
        </Environment>
        <Backdrop />
        <Rig progress={progress} reduce={reduce} />
        {ORBS.map((_, i) => (
          <Orb key={i} i={i} reduce={reduce} />
        ))}
      </Canvas>
    </div>
  );
}
