import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Text3D, Html } from '@react-three/drei';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import fontData from 'public/assets/font.typeface.json';
import { Group, Mesh, Vector3 } from 'three';
import TetrahedronButton from './TetrahedronButton';
import { menuItems } from '../config/WatermelonMenuConfig';

function Menu() {
  const groupRef = useRef<Group>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Load the 3D font
  // Load the 3D font
  const fontLoader = new FontLoader();
const font = fontLoader.parse(fontData);
  const radius = 3; // Distance of menu items from center
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {menuItems.map((item, i) => {
        const angle = (i / menuItems.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const position = new Vector3(x, 0, z);

        return (
          <Text3D
            key={item.label}
            font={font}
            size={0.5}
            height={0.1}
            bevelSegments={5}
            position={position.toArray()}
            onClick={() => setActiveIndex(i)}
          >
            {item.label}
            <meshStandardMaterial color={i === activeIndex ? 'hotpink' : 'white'} />
          </Text3D>
        );
      })}
    </group>
  );
}

function EnvironmentWrapper() {
  const groundRef = useRef<Mesh>(null);
  const [showGround, setShowGround] = useState(false);

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight intensity={0.6} position={[5, 5, 5]} />
      {showGround && (
        <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      )}
    </>
  );
}

export default function WatermelonMenu3D() {
  return (
    <Canvas camera={{ position: [0, 2, 7], fov: 50 }} shadows>
      <Suspense fallback={<Html>Loading...</Html>}>
        <Menu />
        <EnvironmentWrapper />
        <Environment preset="city" background={false} blur={0.5} />
      </Suspense>
      <OrbitControls enablePan={false} />
      <TetrahedronButton />
    </Canvas>
  );
}
