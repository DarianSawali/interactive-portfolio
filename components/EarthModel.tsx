"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { ThreeElements } from "@react-three/fiber";

type Props = ThreeElements["group"] & { scaleFactor?: number };

export default function EarthModel({ scaleFactor = 1, ...props }: Props) {
  const gltf = useGLTF("/models/earth.glb");

  const computedScale = useMemo(() => scaleFactor, [scaleFactor]);

  return (
    <group {...props} dispose={null}>
      <primitive object={gltf.scene} scale={computedScale} />
    </group>
  );
}

useGLTF.preload("/models/earth.glb");
