"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import EarthModel from "./EarthModel";

function quadBezier(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, t: number) {
  const p0 = a.clone().multiplyScalar((1 - t) * (1 - t));
  const p1 = b.clone().multiplyScalar(2 * (1 - t) * t);
  const p2 = c.clone().multiplyScalar(t * t);
  return p0.add(p1).add(p2);
}


const ORB_PATH = {
  start: { x: 0.17, y: 0.00, z: -0.40 }, 
  ctrl:  { x: 0.10, y: 0.38, z: -1.40 }, 
  end:   { x:-0.6, y: 0.6, z: -2.80 },
  scale: { baseVh: 1, startMul: 1, endMul: 0.20 },
  spin:  { extraY: 1.2 * Math.PI, extraX: 0.3 },
  drag:  { x: 0.005, y: 0.005 },
};

export default function EarthScene({ progress, pinMode }: { progress: number; pinMode: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)} 
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      className="!bg-transparent"
      onPointerMove={(e) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        pointer.current = { x: nx, y: ny };
      }}
    >
      <Suspense fallback={null}>

        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={1.1} />
        <Environment preset="city" />

        <StarsParallax progress={progress} pointer={pointer} />

        <EarthRig progress={progress} pinMode={pinMode} pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}

function StarsParallax({
  progress,
  pointer,
}: {
  progress: number;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.x = pointer.current.y * 0.05 + progress * 0.05;
    group.current.rotation.y = pointer.current.x * 0.06;
    group.current.position.z = -1 - progress * 0.5; 
  });

  return (
    <group ref={group}>
      <Stars
        radius={100}   
        depth={50}   
        count={4000}  
        factor={3}   
        saturation={0}
        fade
        speed={0.1} 
      />
    </group>
  );
}

function EarthRig({
  progress,
  pinMode,
  pointer,
}: {
  progress: number;
  pinMode: boolean;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null!);
  const { viewport } = useThree();
  const p = THREE.MathUtils.clamp(progress, 0, 1);

  const wx = (f: number) => viewport.width * f;
  const wy = (f: number) => viewport.height * f;

  const { start, ctrl, end, startScale, endScale } = useMemo(() => {
    const base = THREE.MathUtils.clamp(viewport.height * ORB_PATH.scale.baseVh, 0.9, 1.8);
    return {
      start: new THREE.Vector3(wx(ORB_PATH.start.x), wy(ORB_PATH.start.y), ORB_PATH.start.z),
      ctrl:  new THREE.Vector3(wx(ORB_PATH.ctrl.x),  wy(ORB_PATH.ctrl.y),  ORB_PATH.ctrl.z),
      end:   new THREE.Vector3(wx(ORB_PATH.end.x),   wy(ORB_PATH.end.y),   ORB_PATH.end.z),
      startScale: base * ORB_PATH.scale.startMul,
      endScale:   base * ORB_PATH.scale.endMul,
    };
  }, [viewport.width, viewport.height]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const speed = p < 1 ? 0.25 : 0.18; 
    group.current.rotation.y += delta * speed;
  });

  const pos   = quadBezier(start, ctrl, end, p);
  const scale = THREE.MathUtils.lerp(startScale, endScale, p);

  const spinY = p * ORB_PATH.spin.extraY;
  const spinX = p * ORB_PATH.spin.extraX;

  const dragging = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  function onPointerDown(e: any) {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }
  function onPointerUp(e: any) {
    dragging.current = false;
    last.current = null;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  }
  function onPointerMove(e: any) {
    if (!dragging.current || !group.current || !last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    group.current.rotation.y += dx * ORB_PATH.drag.x;
    group.current.rotation.x += dy * ORB_PATH.drag.y;
  }

  return (
    <group
      ref={group}
      position={pinMode ? end : pos}
      scale={pinMode ? endScale : scale}
      rotation={pinMode ? undefined : [spinX, spinY, 0]}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerUp}
      onPointerMove={onPointerMove}
    >
      <EarthModel />
    </group>
  );
}
