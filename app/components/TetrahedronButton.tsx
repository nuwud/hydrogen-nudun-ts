/* eslint-disable @typescript-eslint/no-namespace */
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: any;
    }
  }
}


export default function TetrahedronButton({ onClick }: { onClick?: () => void }) {
  const meshRef = useRef<Mesh>(null);
  const { scene } = useGLTF('/assets/tetrahedron.glb');

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group position={[2.7, -1.8, 3]} onClick={onClick}>
      <primitive ref={meshRef} object={scene} scale={[0.2, 0.2, 0.2]} />
    </group>
  );
}

useGLTF.preload('/assets/tetrahedron.glb');

/* eslint-enable @typescript-eslint/no-namespace */